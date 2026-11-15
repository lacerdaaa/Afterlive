"use client";

import { DrawStrokes, type Stroke } from "@/components/motion/draw-strokes";

// Neon-sign palm: one trunk and six fronds, each a single stroke. Lines only, no game assets.
const PALM: Stroke[] = [
  { d: "M58 318 C64 250 70 170 86 84" },
  { d: "M86 84 C62 58 32 60 8 92" },
  { d: "M86 84 C70 44 44 32 16 40" },
  { d: "M86 84 C92 50 104 28 126 16" },
  { d: "M86 84 C110 54 138 52 156 70" },
  { d: "M86 84 C112 78 138 96 148 128" },
  { d: "M86 84 C74 96 62 112 58 136" },
  { d: "M63 270 L74 266 M66 226 L77 222 M70 182 L81 178 M76 138 L86 134" },
];

const MIRRORED: Stroke[] = PALM.map((s) => ({ ...s, transform: "translate(164 0) scale(-1 1)" }));

type Props = {
  play: boolean;
  delay?: number;
  duration?: number;
  mirrored?: boolean;
  className?: string;
};

export const PALM_DRAW = 1;

export function Palm({ play, delay = 0, duration = PALM_DRAW, mirrored = false, className }: Props) {
  return (
    <DrawStrokes
      strokes={mirrored ? MIRRORED : PALM}
      viewBox="0 0 164 320"
      play={play}
      delay={delay}
      duration={duration}
      glow="cyan"
      className={`text-neon-cyan ${className ?? ""}`}
    />
  );
}
