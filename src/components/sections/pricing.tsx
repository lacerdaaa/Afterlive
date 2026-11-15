import { Check } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { plans, pricingNote } from "@/content/landing";

export function Pricing() {
  return (
    <Section id="planos" timecode="00:04:20" eyebrow="Planos" title="Começa grátis. Paga quando virar rotina.">
      <ul className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <li
            key={plan.name}
            className={`flex flex-col gap-4 rounded-md border bg-surface-800 p-6 ${plan.featured ? "border-neon-pink" : "border-line-700"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-body-lg font-bold text-ink">{plan.name}</h3>
              <Chip>em breve</Chip>
            </div>
            <p className="flex items-baseline gap-1">
              <span className="font-display text-heading text-ink">{plan.price}</span>
              <span className="text-small text-ink-muted">{plan.period}</span>
            </p>
            <p className="text-body text-ink-muted">{plan.pitch}</p>
            <ul className="flex flex-col gap-2 border-t border-line-700 pt-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-body text-ink">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-neon-cyan" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-small text-ink-muted">
        {pricingNote}{" "}
        <a href="#lista" className="text-ink underline underline-offset-4">
          Entra na lista pra ser avisado.
        </a>
      </p>
    </Section>
  );
}
