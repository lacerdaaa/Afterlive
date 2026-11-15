"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { Palm, PALM_DRAW } from "@/components/brand/palm";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section aria-labelledby="final-title" className="mx-auto w-full max-w-content px-6">
      <div
        ref={ref}
        className="relative flex flex-col items-center gap-6 overflow-hidden rounded-md border border-line-700 bg-surface-800 px-6 py-16 text-center"
      >
        {/* Palms frame the last call, drawn one after the other. */}
        <Palm
          play={inView}
          className="pointer-events-none absolute bottom-0 left-0 h-[calc(var(--spacing-16)*3)] -translate-x-1/2 md:h-[calc(var(--spacing-16)*5)] md:-translate-x-1/4"
        />
        <Palm
          play={inView}
          mirrored
          delay={PALM_DRAW}
          className="pointer-events-none absolute right-0 bottom-0 h-[calc(var(--spacing-16)*3)] translate-x-1/2 md:h-[calc(var(--spacing-16)*5)] md:translate-x-1/4"
        />

        <p className="relative font-mono text-timecode text-ink-muted">
          <span className="text-neon-cyan">06:00:00</span> · fim da live
        </p>
        <h2 id="final-title" className="relative max-w-copy font-display text-heading text-balance md:text-display-lg">
          Sua próxima live já sai cortada.
        </h2>
        <p className="relative max-w-copy text-body-lg text-ink-muted">
          Entra na lista. A gente abre em ondas, e quem chega primeiro entra primeiro.
        </p>
        <div className="relative flex w-full justify-center">
          <WaitlistForm source="final" />
        </div>
      </div>
    </section>
  );
}
