import type { ReactNode } from "react";

type Props = {
  id: string;
  /** Timecode label in mono, e.g. "00:12:40". */
  timecode: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({ id, timecode, eyebrow, title, intro, children }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="mx-auto w-full max-w-content scroll-mt-10 px-6">
      <header className="flex max-w-prose flex-col gap-4">
        <p className="font-mono text-timecode text-ink-muted">
          <span className="text-neon-cyan">{timecode}</span> · {eyebrow}
        </p>
        <h2 id={headingId} className="font-display text-heading text-balance md:text-display-lg">
          {title}
        </h2>
        {intro && <p className="text-body-lg text-ink-muted">{intro}</p>}
      </header>
      <div className="mt-10">{children}</div>
    </section>
  );
}
