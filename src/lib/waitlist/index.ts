import "server-only";
import path from "node:path";
import { createSlidingWindowLimiter } from "@/lib/rate-limit/sliding-window";
import { FileWaitlistRepository } from "./file-repository";
import type { JoinDeps } from "./join";
import { MemoryWaitlistRepository } from "./memory-repository";
import type { WaitlistRepository } from "./repository";
import { resolveStoreKind } from "./store";

export const RATE_LIMIT = { limit: 5, windowMs: 10 * 60_000 } as const;

function createRepository(): WaitlistRepository {
  return resolveStoreKind(process.env) === "file"
    ? new FileWaitlistRepository(path.join(process.cwd(), ".data", "waitlist.json"))
    : new MemoryWaitlistRepository();
}

// Module-level singletons: one per server instance.
let deps: JoinDeps | undefined;

export function getJoinDeps(): JoinDeps {
  deps ??= {
    repository: createRepository(),
    limiter: createSlidingWindowLimiter(RATE_LIMIT),
    now: () => new Date(),
    logError: (error) => console.error("[waitlist]", error),
  };
  return deps;
}
