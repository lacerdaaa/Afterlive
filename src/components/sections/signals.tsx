import { AudioLines, MessageSquareText, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { signals } from "@/content/landing";
import { makeWaveform } from "@/lib/waveform";

const AUDIO = makeWaveform({ count: 11, peaks: [6], seed: 11 });

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
  return (
    <Section
      id="sinais"
      timecode="00:02:45"
      eyebrow="Sinais que a IA lê"
      title="Chat, áudio e a tela do jogo."
      intro="IA de FPS procura kill feed. Mundo aberto não tem. O Afterlive olha pra onde a sua live realmente reage."
    >
      <ul className="grid gap-6 md:grid-cols-3">
        <SignalCard icon={<MessageSquareText className="size-6" strokeWidth={2} />} {...signals.chat}>
          <ul className="flex flex-col gap-1">
            {signals.chat.messages.map((m, i) => (
              <li key={i} className="flex gap-2 text-small">
                <span className="font-mono text-timecode text-ink-muted">{m.time}</span>
                <span className="truncate text-ink">{m.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-mono text-timecode text-neon-cyan">{signals.chat.rate}</p>
        </SignalCard>

        <SignalCard icon={<AudioLines className="size-6" strokeWidth={2} />} {...signals.audio}>
          <div className="flex h-16 items-center justify-center gap-2 overflow-hidden">
            {AUDIO.map((h, i) => (
              <span
                key={i}
                className={`w-bar shrink-0 rounded-sm ${i === 6 ? "bg-neon-pink" : "bg-neon-cyan"}`}
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        </SignalCard>

        <SignalCard icon={<Star className="size-6" strokeWidth={2} />} {...signals.hud}>
          <div className="flex h-16 items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star
                key={s}
                className={`size-6 ${s < 4 ? "fill-neon-cyan text-neon-cyan" : "text-ink-muted"}`}
                strokeWidth={2}
              />
            ))}
          </div>
        </SignalCard>
      </ul>
      <p className="mt-6 text-body-lg font-bold text-ink">{signals.together}</p>
    </Section>
  );
}
