import type { AddResult, WaitlistEntry, WaitlistRepository } from "./repository";

export class MemoryWaitlistRepository implements WaitlistRepository {
  private readonly entries = new Map<string, WaitlistEntry>();

  async add(email: string, now: Date): Promise<AddResult> {
    if (this.entries.has(email)) return { status: "duplicate" };
    this.entries.set(email, { email, createdAt: now });
    return { status: "created" };
  }

  async has(email: string): Promise<boolean> {
    return this.entries.has(email);
  }

  async count(): Promise<number> {
    return this.entries.size;
  }
}
