"use client";

import { track } from "@vercel/analytics";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { joinWaitlistAction } from "@/app/actions/join-waitlist";
import { PrimaryButton } from "@/components/ui/button";
import type { JoinState } from "@/lib/waitlist/join";

const INITIAL: JoinState = { status: "idle" };

export function WaitlistForm({ source }: { source: "hero" | "final" }) {
  const [state, action, pending] = useActionState(joinWaitlistAction, INITIAL);
  const id = useId();
  const successRef = useRef<HTMLParagraphElement>(null);
  const error = state.status === "error" ? state.message : null;

  useEffect(() => {
    if (state.status !== "success") return;
    track("waitlist_join", { source });
    successRef.current?.focus();
  }, [state, source]);

  return (
    <div className="w-full max-w-copy">
      {state.status !== "success" && (
        <form action={action} noValidate className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="sr-only">
            Seu e-mail
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="seu@email.com"
              required
              defaultValue={state.status === "error" ? state.email : undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={`${id}-msg ${id}-note`}
              className="min-w-0 flex-1 rounded-sm border border-ink-muted bg-surface-800 px-4 py-4 text-body text-ink placeholder:text-ink-muted aria-invalid:border-danger"
            />
            {/* Honeypot: invisible to people and assistive tech, tempting for bots. */}
            <div aria-hidden className="sr-only">
              <label>
                Site
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <PrimaryButton type="submit" disabled={pending}>
              {pending ? "Entrando..." : "Entrar na lista"}
              {!pending && <ArrowRight aria-hidden className="size-4" strokeWidth={2} />}
            </PrimaryButton>
          </div>
        </form>
      )}

      <div id={`${id}-msg`} role="status" aria-live="polite" className="mt-2">
        {error && <p className="text-small text-danger">{error}</p>}
        {state.status === "success" && (
          <p
            ref={successRef}
            tabIndex={-1}
            className="flex items-start gap-2 rounded-md border border-line-700 bg-surface-800 p-4 text-body text-ink"
          >
            <Check aria-hidden className="mt-1 size-4 shrink-0 text-neon-cyan" strokeWidth={2} />
            <span>
              <strong className="font-bold">Tá dentro.</strong> A gente te avisa quando abrir as primeiras vagas.
            </span>
          </p>
        )}
      </div>

      {state.status !== "success" && (
        <p id={`${id}-note`} className="mt-2 text-small text-ink-muted">
          Só usamos seu e-mail pra avisar quando abrir. Nada de spam.{" "}
          <Link href="/privacidade" className="underline underline-offset-4 hover:text-ink">
            Privacidade
          </Link>
        </p>
      )}
    </div>
  );
}
