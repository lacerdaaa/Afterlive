import { describe, expect, it } from "vitest";
import { makeWaveform } from "./waveform";

describe("makeWaveform", () => {
  const wave = makeWaveform({ count: 40, peaks: [12, 20, 27], seed: 7 });

  it("returns one height per bar, between 0 and 1", () => {
    expect(wave).toHaveLength(40);
    for (const h of wave) {
      expect(h).toBeGreaterThan(0);
      expect(h).toBeLessThanOrEqual(1);
    }
  });

  it("is deterministic for a seed (no SSR/client mismatch)", () => {
    expect(makeWaveform({ count: 40, peaks: [12, 20, 27], seed: 7 })).toEqual(wave);
  });

  it("makes every peak the tallest bar in its neighbourhood", () => {
    for (const p of [12, 20, 27]) {
      const neighbours = wave.slice(p - 3, p + 4).filter((_, i) => i !== 3);
      expect(Math.max(...neighbours)).toBeLessThan(wave[p]!);
    }
  });

  it("keeps peaks at full height", () => {
    expect(wave[20]).toBe(1);
  });
});
