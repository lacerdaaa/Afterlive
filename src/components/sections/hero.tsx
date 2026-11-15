"use client";

import { Wordmark } from "@/components/brand/wordmark";
import { Waveform } from "@/components/motion/waveform";
import { Chip } from "@/components/ui/chip";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { DRAW_DURATION, GLOW_FADE } from "@/lib/motion/tokens";
import { makeWaveform } from "@/lib/waveform";

const PEAKS = [17, 21, 24, 30];
const HEIGHTS = makeWaveform({ count: 48, peaks: PEAKS, seed: 19 });

// One drawing at a time: logo draws → glow → waveform sweeps → glow → peaks light.
const LOGO_DELAY = 0.2;
const WAVE_DELAY = LOGO_DELAY + DRAW_DURATION + GLOW_FADE + 0.2;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-10 md:pt-16">
      <div className="mx-auto flex w-full max-w-content flex-col items-center px-6 text-center">
        <Chip>Feito pras lives de GTA 6</Chip>

        <Wordmark delay={LOGO_DELAY} className="mt-6 w-full max-w-prose md:mt-10" />
      </div>

      <Waveform
        heights={HEIGHTS}
        peaks={PEAKS}
        peakColor="sunset"
        play
        delay={WAVE_DELAY}
        className="mx-auto mt-6 h-[calc(var(--spacing-10)*2)] md:mt-10 md:h-[calc(var(--spacing-16)*2)] w-full max-w-content"
      />

      <div className="mx-auto flex w-full max-w-content flex-col items-center px-6 text-center">
        <h1 id="hero-title" className="mt-6 max-w-prose font-display md:mt-10 text-heading text-balance md:text-display-lg">
          Sua live de 6h vira 20 cortes enquanto você dorme.
        </h1>
        <p className="mt-4 max-w-prose text-body-lg md:mt-6 text-pretty text-ink-muted">
          A IA assiste a VOD, lê o chat, ouve suas reações e acha os picos. Você acorda com cortes 9:16 legendados em
          PT-BR, prontos pra TikTok, Shorts e Reels.
        </p>
        <div id="lista" className="mt-6 flex w-full scroll-mt-16 md:mt-10 justify-center">
          <WaitlistForm source="hero" />
        </div>
      </div>
    </section>
  );
}
