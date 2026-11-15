"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { RotateCcw, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeonMark } from "@/components/motion/neon-mark";
import { Section } from "@/components/ui/section";
import { demo } from "@/content/landing";
import { demoFrame } from "@/lib/demo-frame";

const BEAT_MS = 420;
const START_AFTER_MS = 900; // lets the title underline finish first: one drawing at a time
const VISIBLE_CHAT = 7;

export function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const last = demo.words.length - 1;
  const [step, setStep] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(last);
      return;
    }
    setStep(-1);
    const timers = demo.words.map((_, i) =>
      window.setTimeout(() => setStep(i), (run === 0 ? START_AFTER_MS : 200) + i * BEAT_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce, run, last]);

  const frame = demoFrame(demo, step);
  const chat = frame.chat.slice(-VISIBLE_CHAT);

  return (
    <Section
      id="demo"
      timecode={demo.clip.at}
      eyebrow="Demo"
      title={
        <>
          Isso aqui saiu de uma live de <NeonMark color="pink">6h</NeonMark>.
        </>
      }
      intro="O chat pediu, a IA ouviu. Corte achado, reenquadrado e legendado sem você abrir o editor."
    >
      <div ref={ref} className="grid items-start gap-6 md:grid-cols-2">
        {/* Phone */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-[calc(var(--spacing-16)*4.5)] rounded-md border border-line-700 bg-surface-800 p-2">
            <div aria-hidden className="relative aspect-clip overflow-hidden rounded-sm bg-bg-900">
              <Scene />

              <div className="absolute inset-x-0 top-0 flex flex-col gap-2 p-4">
                <div className="h-1 overflow-hidden rounded-pill bg-line-700">
                  <m.div
                    className="h-full origin-left bg-neon-pink"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: frame.progress }}
                    transition={reduce ? { duration: 0 } : { duration: BEAT_MS / 1000, ease: "linear" }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-small text-ink">{demo.channel}</span>
                  <span className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        className={`size-4 ${s < frame.stars ? "fill-ink text-ink" : "text-ink-muted"}`}
                        strokeWidth={2}
                      />
                    ))}
                  </span>
                </div>
              </div>

              <p className="absolute inset-x-0 bottom-16 flex flex-wrap justify-center gap-1 px-4 text-center text-heading font-bold">
                {frame.line.map((word, i) => (
                  <span
                    key={`${step}-${word}-${i}`}
                    className={`rounded-sm px-1 ${i === frame.active ? "bg-neon-pink text-on-pink" : "text-ink"}`}
                  >
                    {word}
                  </span>
                ))}
              </p>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="rounded-sm bg-surface-800 px-2 font-mono text-timecode text-ink-muted">
                  corte {demo.clip.index}/{demo.clip.total}
                </span>
                <span className="font-mono text-timecode text-ink-muted">{demo.clip.length}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            disabled={!frame.done || !!reduce}
            className="inline-flex items-center gap-2 rounded-md border border-ink-muted px-4 py-2 text-small text-ink transition-opacity hover:border-ink disabled:opacity-0"
          >
            <RotateCcw aria-hidden className="size-4" strokeWidth={2} />
            Ver de novo
          </button>
        </div>

        {/* Chat + VOD */}
        <div aria-hidden className="flex flex-col gap-4">
          <div className="rounded-md border border-line-700 bg-surface-800 p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-body font-bold text-ink">Chat da live</span>
              <span className="font-mono text-timecode text-neon-cyan">{frame.rate} msg/min</span>
            </div>
            <ul className="mt-4 flex h-[calc(var(--spacing-16)*3)] flex-col justify-end gap-1 overflow-hidden">
              <AnimatePresence initial={false}>
                {chat.map((msg) => (
                  <m.li
                    key={`${msg.user}-${msg.text}`}
                    layout={false}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 text-small"
                  >
                    <span className="shrink-0 font-bold text-neon-cyan">{msg.user}</span>
                    <span className="truncate text-ink">{msg.text}</span>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <div className="rounded-md border border-line-700 bg-surface-800 p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-body font-bold text-ink">VOD</span>
              <span className="font-mono text-timecode text-ink-muted">{demo.vod}</span>
            </div>
            <div className="relative mt-6 mb-10 h-1 rounded-pill bg-line-700">
              {demo.markers.map((left, i) => (
                <span
                  key={left}
                  className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-pill ${
                    i === 0 ? "h-4 w-1 bg-neon-pink" : "h-2 w-1 bg-sunset"
                  }`}
                  style={{ left: `${left}%` }}
                />
              ))}
              <span
                className="absolute top-full mt-2 -translate-x-1/2 font-mono text-timecode text-neon-pink"
                style={{ left: `${demo.markers[0]}%` }}
              >
                {demo.clip.at}
              </span>
            </div>
            <p className="text-small text-ink-muted">
              <span className="text-ink">{demo.clip.total} cortes</span> marcados nessa live. Esse é o primeiro.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-small text-ink-muted">{demo.disclaimer}</p>
      <p className="sr-only">
        Exemplo de corte vertical de {demo.clip.length} com legenda em PT-BR: “{demo.words.join(" ").toLowerCase()}”,
        enquanto o chat chega a {demo.rate.peak} mensagens por minuto.
      </p>
    </Section>
  );
}

/** Abstract night road drawn in lines only: no game footage, no game assets. */
function Scene() {
  return (
    <svg viewBox="0 0 180 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <g fill="none" strokeLinecap="round" className="text-line-700" stroke="currentColor" strokeWidth={1.5}>
        <path d="M0 150 H180" />
        <path d="M-40 320 L86 150 M220 320 L94 150" />
        <path d="M0 190 H180 M0 240 H180 M0 300 H180" opacity={0.5} />
      </g>
      <path
        d="M90 320 V300 M90 280 V262 M90 244 V230 M90 214 V204 M90 192 V185 M90 175 V170"
        stroke="currentColor"
        className="text-ink-muted"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <g fill="none" stroke="currentColor" className="text-neon-cyan" strokeWidth={1.5} strokeLinecap="round" opacity={0.6}>
        <path d="M24 150 C26 128 28 112 32 96 M32 96 C24 88 14 90 8 98 M32 96 C28 84 20 80 12 82 M32 96 C36 84 44 80 52 84 M32 96 C40 94 48 100 50 110" />
        <path d="M156 150 C154 128 152 112 148 96 M148 96 C156 88 166 90 172 98 M148 96 C152 84 160 80 168 82 M148 96 C144 84 136 80 128 84 M148 96 C140 94 132 100 130 110" />
      </g>
    </svg>
  );
}
