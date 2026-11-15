"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_DRAW, GLOW_FADE, PEAK_STAGGER } from "@/lib/motion/tokens";

export const WAVE_SWEEP = 1.2;
const BAR_GROW = 0.35;

/** Seconds from `delay` until the last peak has lit. */
export function waveformDuration(peakCount: number) {
  return WAVE_SWEEP + GLOW_FADE + peakCount * PEAK_STAGGER + GLOW_FADE;
}

type Props = {
  heights: number[];
  peaks: number[];
  /** Hero peaks light in sunset; "como funciona" peaks turn neon-pink (README, Waveform). */
  peakColor: "sunset" | "pink";
  /** false keeps the waveform hidden until a parent sequence says go. */
  play: boolean;
  delay?: number;
  className?: string;
};

/**
 * Bars in neon-cyan, mirrored on the center axis, sweeping in left to right.
 * Then glow-cyan fades in and the chosen peaks light up one by one.
 * Only transform and opacity animate.
 */
export function Waveform({ heights, peaks, peakColor, play, delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  const step = heights.length > 1 ? (WAVE_SWEEP - BAR_GROW) / (heights.length - 1) : 0;
  const glowAt = delay + WAVE_SWEEP;
  const peakAt = (k: number) => glowAt + GLOW_FADE + k * PEAK_STAGGER;
  const t = (transition: object) => (reduce ? { duration: 0 } : transition);
  const state = play ? "on" : "off";
  const peakBg = peakColor === "sunset" ? "bg-sunset" : "bg-neon-pink";

  const row = (glow: boolean) =>
    heights.map((h, i) => {
      const peakIndex = peaks.indexOf(i);
      return (
        <motion.div
          key={i}
          className={`relative w-bar shrink-0 rounded-sm bg-neon-cyan ${glow ? "shadow-glow-cyan" : ""}`}
          style={{ height: `${h * 100}%`, originY: 0.5 }}
          variants={glow ? undefined : { off: { scaleY: 0 }, on: { scaleY: 1 } }}
          transition={t({ delay: delay + i * step, duration: BAR_GROW, ease: EASE_DRAW })}
        >
          {!glow && peakIndex >= 0 && (
            <motion.span
              aria-hidden
              className={`absolute inset-0 rounded-sm ${peakBg}`}
              variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
              transition={t({ delay: peakAt(peakIndex), duration: GLOW_FADE })}
            />
          )}
        </motion.div>
      );
    });

  return (
    <motion.div aria-hidden className={`relative ${className ?? ""}`} initial="off" animate={state}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-2 overflow-hidden"
        variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
        transition={t({ delay: glowAt, duration: GLOW_FADE })}
      >
        {row(true)}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center gap-2 overflow-hidden">{row(false)}</div>
    </motion.div>
  );
}
