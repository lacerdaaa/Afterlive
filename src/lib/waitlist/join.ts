import type { RateLimiter } from "@/lib/rate-limit/sliding-window";
import type { WaitlistRepository } from "./repository";
import { parseWaitlistInput } from "./schema";

export type JoinState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; email?: string };

export type JoinDeps = {
  repository: WaitlistRepository;
  limiter: RateLimiter;
  now: () => Date;
  logError: (error: unknown) => void;
};

const SERVER_ERROR = "Deu ruim do nosso lado. Tenta de novo em instantes.";

function rateLimitMessage(retryAfterMs: number) {
  const minutes = Math.max(1, Math.ceil(retryAfterMs / 60_000));
  return `Muitas tentativas seguidas. Tenta de novo em ${minutes} min.`;
}

export async function joinWaitlist(deps: JoinDeps, raw: unknown, clientKey: string): Promise<JoinState> {
  const limit = deps.limiter.hit(clientKey);
  if (!limit.allowed) return { status: "error", message: rateLimitMessage(limit.retryAfterMs) };

  const parsed = parseWaitlistInput(raw);
  if (!parsed.ok) {
    // Bots get the same answer as people so the honeypot stays invisible.
    return parsed.reason === "spam" ? { status: "success" } : { status: "error", message: parsed.message };
  }

  try {
    // Duplicates also return success: the page never reveals who is on the list.
    await deps.repository.add(parsed.data.email, deps.now());
    return { status: "success" };
  } catch (error) {
    deps.logError(error);
    return { status: "error", message: SERVER_ERROR };
  }
}

export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
