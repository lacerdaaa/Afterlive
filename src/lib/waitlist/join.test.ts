import { describe, expect, it, vi } from "vitest";
import { createSlidingWindowLimiter } from "@/lib/rate-limit/sliding-window";
import { clientIpFrom, joinWaitlist, type JoinDeps } from "./join";
import { MemoryWaitlistRepository } from "./memory-repository";
import type { WaitlistRepository } from "./repository";

const NOW = new Date("2026-11-15T12:00:00Z");

function deps(overrides: Partial<JoinDeps> = {}): JoinDeps {
  return {
    repository: new MemoryWaitlistRepository(),
    limiter: createSlidingWindowLimiter({ limit: 5, windowMs: 600_000, now: () => NOW.getTime() }),
    now: () => NOW,
    logError: () => {},
    ...overrides,
  };
}

describe("joinWaitlist", () => {
  it("stores a valid email and returns success", async () => {
    const d = deps();
    const result = await joinWaitlist(d, { email: "Eu@Exemplo.com" }, "1.1.1.1");
    expect(result).toEqual({ status: "success" });
    expect(await d.repository.has("eu@exemplo.com")).toBe(true);
  });

  it("returns success for an email already on the list", async () => {
    const d = deps();
    await joinWaitlist(d, { email: "eu@exemplo.com" }, "1.1.1.1");
    expect(await joinWaitlist(d, { email: "eu@exemplo.com" }, "1.1.1.1")).toEqual({ status: "success" });
  });

  it("returns the validation message for a bad email", async () => {
    const result = await joinWaitlist(deps(), { email: "nope" }, "1.1.1.1");
    expect(result).toEqual({ status: "error", message: "Esse e-mail não parece certo. Confere aí." });
  });

  it("pretends success for honeypot hits but stores nothing", async () => {
    const d = deps();
    const result = await joinWaitlist(d, { email: "bot@x.co", website: "spam" }, "1.1.1.1");
    expect(result).toEqual({ status: "success" });
    expect(await d.repository.count()).toBe(0);
  });

  it("blocks after the rate limit with a retry hint", async () => {
    const d = deps({
      limiter: createSlidingWindowLimiter({ limit: 1, windowMs: 600_000, now: () => NOW.getTime() }),
    });
    await joinWaitlist(d, { email: "a@b.co" }, "1.1.1.1");
    const result = await joinWaitlist(d, { email: "c@d.co" }, "1.1.1.1");
    expect(result).toEqual({
      status: "error",
      message: "Muitas tentativas seguidas. Tenta de novo em 10 min.",
    });
  });

  it("returns a generic error and logs when storage fails", async () => {
    const logError = vi.fn();
    const broken: WaitlistRepository = {
      add: () => Promise.reject(new Error("disk full")),
      has: async () => false,
      count: async () => 0,
    };
    const result = await joinWaitlist(deps({ repository: broken, logError }), { email: "a@b.co" }, "ip");
    expect(result).toEqual({ status: "error", message: "Deu ruim do nosso lado. Tenta de novo em instantes." });
    expect(logError).toHaveBeenCalledOnce();
  });
});

describe("clientIpFrom", () => {
  it("uses the first x-forwarded-for address", () => {
    expect(clientIpFrom(new Headers({ "x-forwarded-for": "9.9.9.9, 10.0.0.1" }))).toBe("9.9.9.9");
  });

  it("falls back to x-real-ip", () => {
    expect(clientIpFrom(new Headers({ "x-real-ip": "8.8.8.8" }))).toBe("8.8.8.8");
  });

  it("falls back to a shared bucket when no header is present", () => {
    expect(clientIpFrom(new Headers())).toBe("unknown");
  });
});
