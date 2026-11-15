import { describe, expect, it } from "vitest";
import { resolveStoreKind } from "./store";

describe("resolveStoreKind", () => {
  it("uses the file store in development by default", () => {
    expect(resolveStoreKind({ NODE_ENV: "development" })).toBe("file");
  });

  it("uses memory in production by default (read-only filesystem on Vercel)", () => {
    expect(resolveStoreKind({ NODE_ENV: "production" })).toBe("memory");
  });

  it("honors an explicit WAITLIST_STORE", () => {
    expect(resolveStoreKind({ NODE_ENV: "production", WAITLIST_STORE: "file" })).toBe("file");
    expect(resolveStoreKind({ NODE_ENV: "development", WAITLIST_STORE: "memory" })).toBe("memory");
  });

  it("rejects an unknown WAITLIST_STORE", () => {
    expect(() => resolveStoreKind({ WAITLIST_STORE: "supabase" })).toThrow(/WAITLIST_STORE/);
  });
});
