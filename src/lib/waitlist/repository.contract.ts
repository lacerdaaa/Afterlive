import { describe, expect, it } from "vitest";
import type { WaitlistRepository } from "./repository";

const NOW = new Date("2026-11-15T12:00:00Z");

/** Shared behavior every WaitlistRepository must satisfy. */
export function describeWaitlistRepository(
  name: string,
  makeRepository: () => Promise<WaitlistRepository> | WaitlistRepository,
) {
  describe(`${name} (WaitlistRepository contract)`, () => {
    it("starts empty", async () => {
      const repo = await makeRepository();
      expect(await repo.count()).toBe(0);
      expect(await repo.has("a@b.co")).toBe(false);
    });

    it("stores a new email", async () => {
      const repo = await makeRepository();
      expect(await repo.add("a@b.co", NOW)).toEqual({ status: "created" });
      expect(await repo.has("a@b.co")).toBe(true);
      expect(await repo.count()).toBe(1);
    });

    it("reports duplicates without storing twice", async () => {
      const repo = await makeRepository();
      await repo.add("a@b.co", NOW);
      expect(await repo.add("a@b.co", NOW)).toEqual({ status: "duplicate" });
      expect(await repo.count()).toBe(1);
    });

    it("keeps different emails apart", async () => {
      const repo = await makeRepository();
      await repo.add("a@b.co", NOW);
      await repo.add("c@d.co", NOW);
      expect(await repo.count()).toBe(2);
    });

    it("handles concurrent adds of the same email", async () => {
      const repo = await makeRepository();
      const results = await Promise.all([repo.add("a@b.co", NOW), repo.add("a@b.co", NOW)]);
      expect(results.filter((r) => r.status === "created")).toHaveLength(1);
      expect(await repo.count()).toBe(1);
    });
  });
}
