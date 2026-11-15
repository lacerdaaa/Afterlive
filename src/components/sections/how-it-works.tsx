"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { MARK_DRAW, NeonMark } from "@/components/motion/neon-mark";
import { Waveform, waveformDuration } from "@/components/motion/waveform";
import { Section } from "@/components/ui/section";
import { steps } from "@/content/landing";
import { GLOW_FADE, PEAK_STAGGER, REVEAL_DURATION } from "@/lib/motion/tokens";
import { makeWaveform } from "@/lib/waveform";

const PEAKS = [3, 7, 10];
const HEIGHTS = makeWaveform({ count: 13, peaks: PEAKS, seed: 4 });
const MARKER_TIMES = ["01:24:31", "03:02:10", "04:47:55"];

const CLIPS = [
  { time: "01:24:31", length: "0:38", caption: "o carro voou do viaduto", viral: true },
  { time: "03:02:10", length: "0:52", caption: "cinco estrelas em 40s", viral: false },
  { time: "04:47:55", length: "0:41", caption: "o chat previu tudo", viral: false },
];

// Sequence inside this section: title underline → waveform → clip markers → vertical cards.
const WAVE_AT = MARK_DRAW + 0.3;
const MARKERS_AT = WAVE_AT + waveformDuration(PEAKS.length);
const CARDS_AT = MARKERS_AT + PEAKS.length * PEAK_STAGGER + GLOW_FADE;

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const t = (transition: object) => (reduce ? { duration: 0 } : transition);
  const state = inView ? "on" : "off";

  return (
    <Section
      id="como-funciona"
      timecode="00:01:12"
      eyebrow="Como funciona"
      title={
        <>
          Você fecha a live. A gente <NeonMark>garimpa</NeonMark>.
        </>
      }
    >
      <m.ol ref={ref} className="grid gap-6 md:grid-cols-3" initial="off" animate={state}>
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4 rounded-md border border-line-700 bg-surface-800 p-6">
            <p className="font-mono text-timecode text-neon-cyan">0{i + 1}</p>
            <h3 className="text-body-lg font-bold text-ink">{step.title}</h3>
            <p className="text-body text-ink-muted">{step.body}</p>
            <div className="mt-auto pt-4">
              {i === 0 && <ConnectVisual />}
              {i === 1 && (
                <div aria-hidden className="flex flex-col gap-2">
                  <Waveform
                    heights={HEIGHTS}
                    peaks={PEAKS}
                    peakColor="pink"
                    play={inView}
                    delay={WAVE_AT}
                    className="h-[calc(var(--spacing-10)*2)]"
                  />
                  {/* Timeline: same slots as the bars so markers sit under their peak. */}
                  <div className="flex justify-center gap-2 border-t border-line-700 pt-2">
                    {HEIGHTS.map((_, bar) => (
                      <span key={bar} className="flex w-bar shrink-0 justify-center">
                        {PEAKS.includes(bar) && (
                          <m.span
                            className="h-4 w-bar rounded-sm bg-sunset"
                            variants={{ off: { opacity: 0, scaleY: 0 }, on: { opacity: 1, scaleY: 1 } }}
                            transition={t({ delay: MARKERS_AT + PEAKS.indexOf(bar) * PEAK_STAGGER, duration: GLOW_FADE })}
                          />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {i === 2 && (
                <ul aria-label="Exemplos de cortes" className="grid grid-cols-3 gap-2">
                  {CLIPS.map((clip, c) => (
                    <m.li
                      key={clip.time}
                      className="flex aspect-clip flex-col justify-between rounded-sm border border-line-700 bg-bg-900 p-2"
                      variants={{ off: { opacity: 0, y: 16 }, on: { opacity: 1, y: 0 } }}
                      transition={t({ delay: CARDS_AT + c * PEAK_STAGGER * 2, duration: REVEAL_DURATION })}
                    >
                      <span className="font-mono text-timecode text-ink-muted">{clip.length}</span>
                      <span className="flex flex-col gap-1">
                        {clip.viral && (
                          <span className="self-start rounded-sm bg-sunset px-1 font-mono text-timecode text-bg-900">
                            viral
                          </span>
                        )}
                        <span className="text-small text-ink">{clip.caption}</span>
                      </span>
                    </m.li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </m.ol>
      <p className="sr-only">Marcadores de clipe em {MARKER_TIMES.join(", ")}.</p>
    </Section>
  );
}

function ConnectVisual() {
  return (
    <div className="flex flex-col gap-2">
      <ul aria-label="Plataformas" className="flex flex-wrap gap-2">
        {["Twitch", "Kick", "YouTube"].map((p) => (
          <li key={p} className="rounded-pill border border-line-700 px-4 py-1 text-small text-ink">
            {p}
          </li>
        ))}
      </ul>
      <p className="font-mono text-timecode text-ink-muted">
        VOD <span className="text-ink">06:12:48</span> · na fila
      </p>
    </div>
  );
}
