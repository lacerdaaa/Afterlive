import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { FileWaitlistRepository } from "./file-repository";
import { describeWaitlistRepository } from "./repository.contract";

const dirs: string[] = [];

async function tempFile() {
  const dir = await mkdtemp(path.join(tmpdir(), "afterlive-waitlist-"));
  dirs.push(dir);
  return path.join(dir, "nested", "waitlist.json");
}

afterEach(async () => {
  await Promise.all(dirs.splice(0).map((d) => rm(d, { recursive: true, force: true })));
});

describeWaitlistRepository("FileWaitlistRepository", async () => new FileWaitlistRepository(await tempFile()));

describe("FileWaitlistRepository persistence", () => {
  it("survives a new instance on the same file", async () => {
    const file = await tempFile();
    await new FileWaitlistRepository(file).add("a@b.co", new Date("2026-11-15T12:00:00Z"));
    const reopened = new FileWaitlistRepository(file);
    expect(await reopened.has("a@b.co")).toBe(true);
    expect(await reopened.count()).toBe(1);
  });

  it("writes entries as JSON with ISO dates", async () => {
    const file = await tempFile();
    await new FileWaitlistRepository(file).add("a@b.co", new Date("2026-11-15T12:00:00Z"));
    const stored = JSON.parse(await readFile(file, "utf8"));
    expect(stored).toEqual([{ email: "a@b.co", createdAt: "2026-11-15T12:00:00.000Z" }]);
  });
});
