import { describe, expect, it } from "vitest";
import { parseWaitlistInput } from "./schema";

describe("parseWaitlistInput", () => {
  it("accepts a valid email and normalizes it", () => {
    const result = parseWaitlistInput({ email: "  Streamer@Exemplo.COM ", website: "" });
    expect(result).toEqual({ ok: true, data: { email: "streamer@exemplo.com" } });
  });

  it("rejects an empty email with a PT-BR message", () => {
    const result = parseWaitlistInput({ email: "   ", website: "" });
    expect(result).toEqual({ ok: false, reason: "invalid", message: "Coloca seu e-mail aí." });
  });

  it("rejects a malformed email", () => {
    const result = parseWaitlistInput({ email: "streamer@", website: "" });
    expect(result).toEqual({
      ok: false,
      reason: "invalid",
      message: "Esse e-mail não parece certo. Confere aí.",
    });
  });

  it("rejects emails longer than 254 characters", () => {
    const email = `${"a".repeat(250)}@x.co`;
    const result = parseWaitlistInput({ email, website: "" });
    expect(result.ok).toBe(false);
  });

  it("flags a filled honeypot as spam", () => {
    const result = parseWaitlistInput({ email: "bot@exemplo.com", website: "http://spam" });
    expect(result).toEqual({ ok: false, reason: "spam" });
  });

  it("treats a missing honeypot field as empty", () => {
    const result = parseWaitlistInput({ email: "a@b.co" });
    expect(result.ok).toBe(true);
  });

  it("rejects non-string input", () => {
    const result = parseWaitlistInput({ email: 42 });
    expect(result.ok).toBe(false);
  });
});
