import { z } from "zod";

export const EMAIL_MAX_LENGTH = 254;

const MESSAGES = {
  empty: "Coloca seu e-mail aí.",
  invalid: "Esse e-mail não parece certo. Confere aí.",
} as const;

const waitlistSchema = z.object({
  email: z
    .string({ invalid_type_error: MESSAGES.invalid, required_error: MESSAGES.empty })
    .trim()
    .toLowerCase()
    .min(1, MESSAGES.empty)
    .max(EMAIL_MAX_LENGTH, MESSAGES.invalid)
    .email(MESSAGES.invalid),
  // Honeypot: hidden from people, filled by naive bots.
  website: z.string().optional().default(""),
});

export type WaitlistInput = { email: string };

export type ParseResult =
  | { ok: true; data: WaitlistInput }
  | { ok: false; reason: "invalid"; message: string }
  | { ok: false; reason: "spam" };

export function parseWaitlistInput(raw: unknown): ParseResult {
  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? MESSAGES.invalid;
    return { ok: false, reason: "invalid", message };
  }
  if (parsed.data.website.trim() !== "") {
    return { ok: false, reason: "spam" };
  }
  return { ok: true, data: { email: parsed.data.email } };
}
