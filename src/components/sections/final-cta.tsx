import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="mx-auto w-full max-w-content px-6">
      <div className="flex flex-col items-center gap-6 rounded-md border border-line-700 bg-surface-800 px-6 py-16 text-center">
        <p className="font-mono text-timecode text-ink-muted">
          <span className="text-neon-cyan">06:00:00</span> · fim da live
        </p>
        <h2 id="final-title" className="max-w-prose font-display text-heading text-balance md:text-display-lg">
          Sua próxima live já pode virar corte.
        </h2>
        <p className="max-w-prose text-body-lg text-ink-muted">
          Entra na lista. A gente abre em ondas e quem chegou primeiro entra primeiro.
        </p>
        <WaitlistForm source="final" />
      </div>
    </section>
  );
}
