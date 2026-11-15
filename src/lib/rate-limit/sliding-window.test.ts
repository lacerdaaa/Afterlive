import { describe, expect, it } from "vitest";
import { createSlidingWindowLimiter } from "./sliding-window";

const MIN = 60_000;

function setup(limit = 5, windowMs = 10 * MIN) {
  let now = 0;
  const limiter = createSlidingWindowLimiter({ limit, windowMs, now: () => now });
  return { limiter, advance: (ms: number) => (now += ms) };
}

describe("createSlidingWindowLimiter", () => {
  it("allows up to the limit and reports remaining attempts", () => {
    const { limiter } = setup(3);
    expect(limiter.hit("ip")).toEqual({ allowed: true, remaining: 2 });
    expect(limiter.hit("ip")).toEqual({ allowed: true, remaining: 1 });
    expect(limiter.hit("ip")).toEqual({ allowed: true, remaining: 0 });
  });

  it("blocks past the limit and says when to retry", () => {
    const { limiter, advance } = setup(2, 10 * MIN);
    limiter.hit("ip");
    advance(1 * MIN);
    limiter.hit("ip");
    advance(1 * MIN);
    expect(limiter.hit("ip")).toEqual({ allowed: false, retryAfterMs: 8 * MIN });
  });

  it("does not count blocked attempts against the window", () => {
    const { limiter, advance } = setup(1, 10 * MIN);
    limiter.hit("ip");
    advance(5 * MIN);
    limiter.hit("ip");
    advance(5 * MIN);
    expect(limiter.hit("ip").allowed).toBe(true);
  });

  it("frees attempts as old hits slide out of the window", () => {
    const { limiter, advance } = setup(2, 10 * MIN);
    limiter.hit("ip");
    advance(6 * MIN);
    limiter.hit("ip");
    advance(4 * MIN);
    expect(limiter.hit("ip")).toEqual({ allowed: true, remaining: 0 });
    expect(limiter.hit("ip").allowed).toBe(false);
  });

  it("tracks keys independently", () => {
    const { limiter } = setup(1);
    limiter.hit("a");
    expect(limiter.hit("a").allowed).toBe(false);
    expect(limiter.hit("b").allowed).toBe(true);
  });

  it("forgets idle keys so memory stays bounded", () => {
    const { limiter, advance } = setup(1, 10 * MIN);
    limiter.hit("a");
    limiter.hit("b");
    advance(10 * MIN);
    limiter.hit("c");
    expect(limiter.size()).toBe(1);
  });
});
