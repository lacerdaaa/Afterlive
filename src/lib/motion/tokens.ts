// Motion timings from docs/design-system/README.md ("Motion: o traço que se desenha").
// The design system has no motion tokens family, so they live here, in one place.

/** Stroke draw: 1.2–1.8s, easeInOut. */
export const DRAW_DURATION = 1.6;
/** Glow fades in after the stroke completes, never before. */
export const GLOW_FADE = 0.3;
/** Peaks light up one by one. */
export const PEAK_STAGGER = 0.08;
export const EASE_DRAW = "easeInOut" as const;
/** Shorter fades for content reveals (not drawings). */
export const REVEAL_DURATION = 0.4;
