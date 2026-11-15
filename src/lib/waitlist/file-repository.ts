import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AddResult, WaitlistRepository } from "./repository";

type StoredEntry = { email: string; createdAt: string };

/**
 * Dev-only JSON file storage. Writes are serialized through a promise chain
 * and land via write-then-rename so a crash never leaves a half-written file.
 */
export class FileWaitlistRepository implements WaitlistRepository {
  private queue: Promise<unknown> = Promise.resolve();

  constructor(private readonly filePath: string) {}

  add(email: string, now: Date): Promise<AddResult> {
    return this.serialize(async () => {
      const entries = await this.read();
      if (entries.some((e) => e.email === email)) return { status: "duplicate" } as const;
      entries.push({ email, createdAt: now.toISOString() });
      await this.write(entries);
      return { status: "created" } as const;
    });
  }

  async has(email: string): Promise<boolean> {
    await this.queue;
    return (await this.read()).some((e) => e.email === email);
  }

  async count(): Promise<number> {
    await this.queue;
    return (await this.read()).length;
  }

  private serialize<T>(task: () => Promise<T>): Promise<T> {
    const run = this.queue.then(task, task);
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async read(): Promise<StoredEntry[]> {
    try {
      return JSON.parse(await readFile(this.filePath, "utf8")) as StoredEntry[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
  }

  private async write(entries: StoredEntry[]): Promise<void> {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.${process.pid}.tmp`;
    await writeFile(tmp, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
    await rename(tmp, this.filePath);
  }
}
