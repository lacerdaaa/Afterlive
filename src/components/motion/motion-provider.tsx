"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/** Loads only the DOM animation features we use; `strict` forbids the heavy `motion.*` components. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
