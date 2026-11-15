import { Section } from "@/components/ui/section";
import { problem } from "@/content/landing";

export function Problem() {
  return (
    <Section
      id="problema"
      timecode="00:00:00"
      eyebrow="O problema"
      title="Uma live de 6h vira 8h de edição."
      intro="Ou você edita, ou você faz live. E quem não posta corte some do feed."
    >
      <div className="grid gap-2 md:grid-cols-4">
        {problem.equation.map((item, i) => (
          <div key={item.value} className="flex flex-col gap-1 rounded-md border border-line-700 bg-surface-800 p-6">
            <p className="font-display text-heading text-ink">
              {i > 0 && (
                <span aria-hidden className="text-ink-muted">
                  {i === 1 ? "→ " : "× "}
                </span>
              )}
              {item.value}
            </p>
            <p className="text-small text-ink-muted">{item.label}</p>
          </div>
        ))}
        <div className="flex flex-col gap-1 rounded-md border border-neon-pink bg-bg-900 p-6">
          <p className="font-display text-heading text-neon-pink">
            <span aria-hidden>= </span>
            {problem.result.value}
          </p>
          <p className="text-small text-ink">{problem.result.label}</p>
        </div>
      </div>
      <p className="mt-4 max-w-prose text-small text-ink-muted">{problem.footnote}</p>
    </Section>
  );
}
