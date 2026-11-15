type Options = { count: number; peaks: number[]; seed: number };

/** Small deterministic PRNG (mulberry32) so server and client render the same bars. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Bar heights (0–1] for the waveform motif: a quiet live with a few reaction peaks.
 * Bars near a peak swell toward it, but the peak itself stays the tallest.
 */
export function makeWaveform({ count, peaks, seed }: Options): number[] {
  const random = rng(seed);
  return Array.from({ length: count }, (_, i) => {
    if (peaks.includes(i)) return 1;
    const distance = Math.min(...peaks.map((p) => Math.abs(p - i)), Number.POSITIVE_INFINITY);
    const swell = distance <= 3 ? 0.35 * (1 - distance / 4) : 0;
    const base = 0.18 + random() * 0.32;
    return Math.min(0.85, Number((base + swell).toFixed(3)));
  });
}
