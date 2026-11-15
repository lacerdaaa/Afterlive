import { ChevronDown } from "lucide-react";
import { Section } from "@/components/ui/section";
import { faq } from "@/content/landing";

export function Faq() {
  return (
    <Section id="faq" timecode="00:05:58" eyebrow="Perguntas" title="O que todo streamer pergunta.">
      <div className="flex max-w-prose flex-col border-t border-line-700">
        {faq.map((item) => (
          <details key={item.q} className="group border-b border-line-700">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-body-lg text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                aria-hidden
                className="size-6 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                strokeWidth={2}
              />
            </summary>
            <p className="pb-4 text-body text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
