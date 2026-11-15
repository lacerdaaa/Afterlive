"use client";

import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import { DrawStrokes } from "./draw-strokes";

export const MARK_DRAW = 0.7;

/** Hand-drawn neon underline under a word in a title. Draws once when it enters the viewport. */
export function NeonMark({ children, color = "cyan" }: { children: ReactNode; color?: "cyan" | "pink" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <DrawStrokes
        strokes={[{ d: "M3 11 C40 5 80 4 120 7 S180 12 197 5" }]}
        viewBox="0 0 200 16"
        preserveAspectRatio="none"
        play={inView}
        duration={MARK_DRAW}
        glow={color}
        className={`pointer-events-none absolute inset-x-0 -bottom-1 h-2 w-full ${color === "cyan" ? "text-neon-cyan" : "text-neon-pink"}`}
      />
    </span>
  );
}
