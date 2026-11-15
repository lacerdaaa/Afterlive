"use client";

import { motion, useReducedMotion } from "motion/react";
import { DRAW_DURATION, EASE_DRAW, GLOW_FADE } from "@/lib/motion/tokens";
import { WORDMARK, WORDMARK_VIEWBOX } from "./wordmark-paths";

type Props = {
  /** Seconds before the stroke starts drawing. */
  delay?: number;
  className?: string;
};

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/**
 * The name drawn in neon-pink, then lit with glow-pink once the stroke completes.
 * Strokes draw one after another so a single line travels across the word.
 */
export function Wordmark({ delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  const per = DRAW_DURATION / WORDMARK.strokes.length;

  const paths = (animated: boolean) =>
    WORDMARK.strokes.map((s, i) => (
      <motion.path
        key={i}
        d={s.d}
        transform={`translate(${s.x} 0)`}
        {...STROKE}
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={
          reduce
            ? { duration: 0 }
            : {
                pathLength: { delay: delay + i * per, duration: per * 1.6, ease: EASE_DRAW },
                opacity: { delay: delay + i * per, duration: 0.01 },
              }
        }
      />
    ));

  return (
    <svg viewBox={WORDMARK_VIEWBOX} role="img" aria-label="Afterlive" className={`overflow-visible text-neon-pink ${className ?? ""}`}>
      {/* Glow layer: static filter, only its opacity animates. */}
      <motion.g
        className="glow-filter-pink"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { delay: delay + DRAW_DURATION + per * 0.6, duration: GLOW_FADE }}
      >
        {paths(false)}
      </motion.g>
      <g>{paths(true)}</g>
    </svg>
  );
}
