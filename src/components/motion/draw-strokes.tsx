"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE_DRAW, GLOW_FADE } from "@/lib/motion/tokens";

export type Stroke = { d: string; transform?: string };

type Props = {
  strokes: Stroke[];
  viewBox: string;
  play: boolean;
  /** Seconds before the first stroke starts. */
  delay?: number;
  /** Total seconds to draw every stroke, one after another. */
  duration: number;
  glow: "pink" | "cyan";
  strokeWidth?: number;
  className?: string;
  preserveAspectRatio?: string;
};

const GLOW_CLASS = { pink: "glow-filter-pink", cyan: "glow-filter-cyan" } as const;

/** Seconds from `delay` until the glow is fully lit. */
export function drawTotal(duration: number) {
  return duration + GLOW_FADE;
}

/**
 * The signature effect (README, motion): strokes draw one after another,
 * then the glow fades in. Only pathLength and opacity animate.
 */
export function DrawStrokes({
  strokes,
  viewBox,
  play,
  delay = 0,
  duration,
  glow,
  strokeWidth = 3,
  className,
  preserveAspectRatio,
}: Props) {
  const reduce = useReducedMotion();
  const per = duration / strokes.length;
  const t = (transition: object) => (reduce ? { duration: 0 } : transition);
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  return (
    <m.svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={`overflow-visible ${className ?? ""}`}
      initial="off"
      animate={play ? "on" : "off"}
    >
      <m.g
        className={GLOW_CLASS[glow]}
        variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
        transition={t({ delay: delay + duration, duration: GLOW_FADE })}
      >
        {strokes.map((s, i) => (
          <path key={i} d={s.d} transform={s.transform} {...common} />
        ))}
      </m.g>
      {strokes.map((s, i) => (
        <m.path
          key={i}
          d={s.d}
          transform={s.transform}
          {...common}
          variants={{ off: { pathLength: 0, opacity: 0 }, on: { pathLength: 1, opacity: 1 } }}
          transition={t({
            pathLength: { delay: delay + i * per, duration: per, ease: EASE_DRAW },
            opacity: { delay: delay + i * per, duration: 0.01 },
          })}
        />
      ))}
    </m.svg>
  );
}
