"use client";

import { Palm, PALM_DRAW } from "@/components/brand/palm";
import { Wordmark } from "@/components/brand/wordmark";
import { Waveform } from "@/components/motion/waveform";
import { Chip } from "@/components/ui/chip";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { DRAW_DURATION, GLOW_FADE } from "@/lib/motion/tokens";
import { makeWaveform } from "@/lib/waveform";

const PEAKS = [17, 21, 24, 30];
const HEIGHTS = makeWaveform({ count: 48, peaks: PEAKS, seed: 19 });

// One drawing at a time: logo → glow → left palm → right palm → glow → waveform → peaks.
const LOGO_DELAY = 0.2;
const PALM_LEFT = LOGO_DELAY + DRAW_DURATION + GLOW_FADE;
const PALM_RIGHT = PALM_LEFT + PALM_DRAW;
const WAVE_DELAY = PALM_RIGHT + PALM_DRAW + GLOW_FADE;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-10 md:pt-16">
      <div className="relative">
        {/* Palms stand on the waveform's center line, behind it. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto max-w-content md:bottom-16">
          <Palm
            play
            delay={PALM_LEFT}
            className="absolute bottom-0 left-0 h-[calc(var(--spacing-16)*3)] -translate-x-1/2 md:h-[calc(var(--spacing-16)*5)] md:translate-x-0"
          />
          <Palm
            play
            mirrored
            delay={PALM_RIGHT}
            className="absolute right-0 bottom-0 h-[calc(var(--spacing-16)*3)] translate-x-1/2 md:h-[calc(var(--spacing-16)*5)] md:translate-x-0"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-content flex-col items-center px-10 text-center md:px-6">
          <Chip>Feito pras lives de GTA 6</Chip>
          <Wordmark delay={LOGO_DELAY} className="mt-6 w-full max-w-copy md:mt-10" />
        </div>

        <Waveform
          heights={HEIGHTS}
          peaks={PEAKS}
          peakColor="sunset"
          play
          delay={WAVE_DELAY}
          className="relative mx-auto mt-6 h-[calc(var(--spacing-10)*2)] w-full max-w-content md:mt-10 md:h-[calc(var(--spacing-16)*2)]"
        />
      </div>

      <div className="mx-auto flex w-full max-w-content flex-col items-center px-6 text-center">
        <h1 id="hero-title" className="mt-6 max-w-copy font-display text-heading text-balance md:mt-10 md:text-display-lg">
          Sua live de 6h vira 20 cortes enquanto você dorme.
        </h1>
        <p className="mt-4 max-w-copy text-body-lg text-pretty text-ink-muted md:mt-6">
          Você fecha a live e vai dormir. A IA assiste tudo, lê o chat e acha onde você gritou. De manhã tem corte
          9:16 legendado em PT-BR esperando, pronto pro TikTok, Shorts e Reels.
        </p>
        <div id="lista" className="mt-6 flex w-full scroll-mt-16 justify-center md:mt-10">
          <WaitlistForm source="hero" />
        </div>
      </div>
    </section>
  );
}
