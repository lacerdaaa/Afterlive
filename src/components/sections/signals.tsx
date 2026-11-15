"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { AudioLines, MessageSquareText, Star } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { MARK_DRAW, NeonMark } from "@/components/motion/neon-mark";
import { Waveform, waveformDuration } from "@/components/motion/waveform";
import { Section } from "@/components/ui/section";
import { signals } from "@/content/landing";
import { GLOW_FADE, PEAK_STAGGER } from "@/lib/motion/tokens";
import { makeWaveform } from "@/lib/waveform";

const AUDIO_PEAKS = [6];
const AUDIO = makeWaveform({ count: 11, peaks: AUDIO_PEAKS, seed: 11 });
const LINE_STEP = 0.25;

// Sequence: underline → chat lines → audio waveform → stars, one card at a time.
const CHAT_AT = MARK_DRAW + 0.2;
const AUDIO_AT = CHAT_AT + signals.chat.messages.length * LINE_STEP + 0.3;
const STARS_AT = AUDIO_AT + waveformDuration(AUDIO_PEAKS.length);

function SignalCard({ icon, title, body, children }: { icon: ReactNode; title: string; body: string; children: ReactNode }) {
  return (
    <li className="flex flex-col gap-4 rounded-md border border-line-700 bg-surface-800 p-6">
      <span className="flex items-center gap-2 text-neon-cyan">
        {icon}
        <h3 className="text-body-lg font-bold text-ink">{title}</h3>
      </span>
      <p className="text-body text-ink-muted">{body}</p>
      <div aria-hidden className="mt-auto rounded-sm border border-line-700 bg-bg-900 p-4">
        {children}
      </div>
    </li>
  );
}

export function Signals() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const t = (delay: number) => (reduce ? { duration: 0 } : { delay, duration: GLOW_FADE });

  return (
    <Section
      id="sinais"
      timecode="00:02:45"
      eyebrow="Sinais que a IA lê"
      title={
        <>
          O <NeonMark>chat</NeonMark> sabe antes de você.
        </>
      }
      intro="IA de FPS procura kill feed. Mundo aberto não tem. O Afterlive presta atenção no que a sua live realmente reage: o chat, a sua voz e a tela do jogo."
    >
      <m.ul ref={ref} className="grid gap-6 md:grid-cols-3" initial="off" animate={inView ? "on" : "off"}>
        <SignalCard icon={<MessageSquareText className="size-6" strokeWidth={2} />} {...signals.chat}>
          <ul className="flex flex-col gap-1">
            {signals.chat.messages.map((msg, i) => (
              <m.li
                key={i}
                className="flex gap-2 text-small"
                variants={{ off: { opacity: 0, y: 8 }, on: { opacity: 1, y: 0 } }}
                transition={t(CHAT_AT + i * LINE_STEP)}
              >
                <span className="font-mono text-timecode text-ink-muted">{msg.time}</span>
                <span className="truncate text-ink">{msg.text}</span>
              </m.li>
            ))}
          </ul>
          <m.p
            className="mt-2 font-mono text-timecode text-neon-cyan"
            variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
            transition={t(CHAT_AT + signals.chat.messages.length * LINE_STEP)}
          >
            {signals.chat.rate}
          </m.p>
        </SignalCard>

        <SignalCard icon={<AudioLines className="size-6" strokeWidth={2} />} {...signals.audio}>
          <Waveform heights={AUDIO} peaks={AUDIO_PEAKS} peakColor="pink" play={inView} delay={AUDIO_AT} className="h-16" />
        </SignalCard>

        <SignalCard icon={<Star className="size-6" strokeWidth={2} />} {...signals.hud}>
          <div className="relative flex h-16 items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((s) => (
              <span key={s} className="relative size-6">
                <Star className="absolute inset-0 size-6 text-ink-muted" strokeWidth={2} />
                {s < 4 && (
                  <m.span
                    className="absolute inset-0"
                    variants={{ off: { opacity: 0, scale: 0.6 }, on: { opacity: 1, scale: 1 } }}
                    transition={t(STARS_AT + s * PEAK_STAGGER * 2)}
                  >
                    <Star className="size-6 fill-neon-cyan text-neon-cyan" strokeWidth={2} />
                  </m.span>
                )}
              </span>
            ))}
          </div>
        </SignalCard>
      </m.ul>
      <p className="mt-6 font-display text-heading text-ink">{signals.together}</p>
    </Section>
  );
}
