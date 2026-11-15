import { describe, expect, it } from "vitest";
import { shadowToDropShadow, tokensToCss } from "./to-css";
import type { DesignTokens } from "./types";

const fixture: DesignTokens = {
  name: "Test",
  color: { themes: [{ id: "dark", name: "Dark" }], tokens: [{ name: "neon-pink", value: "#FF3EA5" }] },
  type: {
    families: { display: '"Unbounded", "Arial Black", sans-serif', mono: '"JetBrains Mono", monospace' },
    groups: [
      { name: "Display", family: "display", styles: [{ name: "heading", fontSize: "28px", lineHeight: "34px", fontWeight: 600 }] },
    ],
  },
  spacing: { tokens: [{ name: "space-4", value: "16px" }] },
  radius: { tokens: [{ name: "radius-md", value: "12px" }] },
  shadow: { tokens: [{ name: "glow-pink", value: "0 0 8px rgba(255, 62, 165, 0.65), 0 0 24px rgba(255, 62, 165, 0.35)" }] },
  layout: {
    tokens: [
      { name: "container-content", value: "1120px" },
      { name: "aspect-clip", value: "0.5625" },
      { name: "bar-width", value: "12px" },
    ],
  },
};

const css = tokensToCss(fixture, "tokens.json");

describe("tokensToCss", () => {
  it("marks the file as generated", () => {
    expect(css.startsWith("/* Test — generated from tokens.json. Do not edit. */")).toBe(true);
  });

  it("resets Tailwind defaults so only tokens produce utilities", () => {
    for (const ns of ["color", "spacing", "radius", "shadow", "font", "text", "container", "aspect"]) {
      expect(css).toContain(`--${ns}-*: initial;`);
    }
  });

  it("maps colors, spacing and radius into the theme", () => {
    expect(css).toContain("--color-neon-pink: #FF3EA5;");
    expect(css).toContain("--spacing-4: 16px;");
    expect(css).toContain("--radius-md: 12px;");
  });

  it("maps font families onto next/font variables, keeping fallbacks", () => {
    expect(css).toContain('--font-display: var(--ff-unbounded), "Arial Black", sans-serif;');
    expect(css).toContain("--font-mono: var(--ff-jetbrains-mono), monospace;");
  });

  it("maps text styles with line height and weight", () => {
    expect(css).toContain("--text-heading: 28px;");
    expect(css).toContain("--text-heading--line-height: 34px;");
    expect(css).toContain("--text-heading--font-weight: 600;");
  });

  it("exposes shadows as box-shadow and as an SVG-friendly filter", () => {
    expect(css).toContain("--shadow-glow-pink: 0 0 8px rgba(255, 62, 165, 0.65), 0 0 24px rgba(255, 62, 165, 0.35);");
    expect(css).toContain(
      "--filter-glow-pink: drop-shadow(0 0 8px rgba(255, 62, 165, 0.65)) drop-shadow(0 0 24px rgba(255, 62, 165, 0.35));",
    );
  });

  it("routes layout tokens by prefix", () => {
    expect(css).toContain("--container-content: 1120px;");
    expect(css).toContain("--aspect-clip: 0.5625;");
    expect(css).toContain("--layout-bar-width: 12px;");
  });
});

describe("shadowToDropShadow", () => {
  it("only splits on top-level commas", () => {
    expect(shadowToDropShadow("0 0 4px rgb(1, 2, 3)")).toBe("drop-shadow(0 0 4px rgb(1, 2, 3))");
  });
});
