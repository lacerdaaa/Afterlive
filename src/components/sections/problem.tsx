"use client";

import { animate, m, useInView, useReducedMotion } from "motion/react";
import { Check, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MARK_DRAW, NeonMark } from "@/components/motion/neon-mark";
import { Section } from "@/components/ui/section";
import { problem } from "@/content/landing";
import { PEAK_STAGGER, REVEAL_DURATION } from "@/lib/motion/tokens";

const COUNT_DURATION = 1.6;

function formatHours(minutes: number) {
  const h = Math.floor(minutes / 60);
  const mm = String(Math.floor(minutes % 60)).padStart(2, "0");
  return `${h}h${mm}`;
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [minutes, setMinutes] = useState(0);
  const total = problem.manual.totalMinutes;

  // Sequence: title underline → hours tick up on the manual side → the Afterlive side lights up.
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setMinutes(total);
      return;
    }
    const controls = animate(0, total, {
      delay: MARK_DRAW,
      duration: COUNT_DURATION,
      ease: "easeOut",
      onUpdate: (v) => setMinutes(v),
    });
    return () => controls.stop();
  }, [inView, reduce, total]);

  const afterlivedAt = MARK_DRAW + COUNT_DURATION;
  const t = (delay: number) => (reduce ? { duration: 0 } : { delay, duration: REVEAL_DURATION });

  return (
    <Section
      id="problema"
      timecode="00:00:00"
      eyebrow="O problema"
      title={
        <>
          Live de 6h. Edição de <NeonMark>8h</NeonMark>. A conta não fecha.
        </>
      }
      intro="Ou você edita, ou você faz live. E quem não posta corte some do feed."
    >
      <div ref={ref} className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-md border border-line-700 bg-surface-800 p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-body-lg font-bold text-ink">{problem.manual.label}</h3>
            <Clock aria-hidden className="size-6 text-ink-muted" strokeWidth={2} />
          </div>
          <ul className="flex flex-col gap-2">
            {problem.manual.tasks.map((item) => (
              <li key={item.task} className="flex items-baseline justify-between gap-4 border-b border-line-700 pb-2">
                <span className="text-body text-ink-muted">{item.task}</span>
                <span className="shrink-0 font-mono text-timecode text-ink">{item.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <p className="font-display text-display-lg text-ink tabular-nums" aria-hidden>
              {formatHours(minutes)}
            </p>
            <p className="sr-only">{formatHours(total)} de edição por live.</p>
            <p className="text-body text-ink-muted">{problem.manual.verdict}</p>
          </div>
        </div>

        <m.div
          className="flex flex-col gap-6 rounded-md border border-neon-pink bg-surface-800 p-6"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: inView ? 1 : 0.4 }}
          transition={t(afterlivedAt)}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-body-lg font-bold text-ink">{problem.afterlive.label}</h3>
            <Check aria-hidden className="size-6 text-neon-cyan" strokeWidth={2} />
          </div>
          <ol className="flex flex-col gap-4">
            {problem.afterlive.timeline.map((item, i) => (
              <m.li
                key={item.time}
                className="flex items-baseline gap-4"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={t(afterlivedAt + i * PEAK_STAGGER * 3)}
              >
                <span className={`font-mono text-timecode ${i === 2 ? "text-sunset" : "text-neon-cyan"}`}>{item.time}</span>
                <span className="text-body text-ink">{item.text}</span>
              </m.li>
            ))}
          </ol>
          <div className="mt-auto">
            <p className="font-display text-display-lg text-neon-pink">0h</p>
            <p className="text-body text-ink-muted">{problem.afterlive.verdict}</p>
          </div>
        </m.div>
      </div>
      <p className="mt-4 max-w-prose text-small text-ink-muted">{problem.footnote}</p>
    </Section>
  );
}
