export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterMs: number };

export type RateLimiter = {
  hit(key: string): RateLimitResult;
  size(): number;
};

type Options = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

/**
 * In-memory sliding-window log. Good enough for a waitlist form; on Vercel
 * each instance keeps its own counts, so swap for a shared store if abuse shows up.
 */
export function createSlidingWindowLimiter({ limit, windowMs, now = Date.now }: Options): RateLimiter {
  const hits = new Map<string, number[]>();
  let lastSweep = now();

  const live = (timestamps: number[], t: number) => timestamps.filter((ts) => ts > t - windowMs);

  function sweep(t: number) {
    if (t - lastSweep < windowMs) return;
    lastSweep = t;
    for (const [key, timestamps] of hits) {
      const kept = live(timestamps, t);
      if (kept.length === 0) hits.delete(key);
      else hits.set(key, kept);
    }
  }

  return {
    hit(key) {
      const t = now();
      sweep(t);
      const recent = live(hits.get(key) ?? [], t);

      if (recent.length >= limit) {
        hits.set(key, recent);
        const oldest = recent[0] ?? t;
        return { allowed: false, retryAfterMs: oldest + windowMs - t };
      }

      recent.push(t);
      hits.set(key, recent);
      return { allowed: true, remaining: limit - recent.length };
    },
    size: () => hits.size,
  };
}
