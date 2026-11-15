export type WaitlistEntry = {
  email: string;
  createdAt: Date;
};

export type AddResult = { status: "created" } | { status: "duplicate" };

/**
 * Storage boundary for the waitlist. Dev uses memory/file implementations;
 * the real provider (Supabase or Resend) plugs in here later.
 * Implementations receive already-normalized emails.
 */
export interface WaitlistRepository {
  add(email: string, now: Date): Promise<AddResult>;
  has(email: string): Promise<boolean>;
  count(): Promise<number>;
}
