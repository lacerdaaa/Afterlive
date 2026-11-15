"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { DRAW_DURATION, EASE_DRAW } from "@/lib/motion/tokens";

/** A neon border that draws itself around its parent (which must be `relative`). */
export function DrawFrame({ delay = 0 }: { delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  return (
    <svg ref={ref} aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible text-neon-pink">
      <m.rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        style={{ rx: "var(--radius-md)" }}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={
          reduce
            ? { duration: 0 }
            : { pathLength: { delay, duration: DRAW_DURATION, ease: EASE_DRAW }, opacity: { delay, duration: 0.01 } }
        }
      />
    </svg>
  );
}
