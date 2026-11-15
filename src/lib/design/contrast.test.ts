import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";
import { color, type ColorName } from "./tokens";

describe("contrastRatio", () => {
  it("matches known WCAG values", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
    expect(contrastRatio("#777777", "#FFFFFF")).toBeCloseTo(4.48, 2);
  });
});

// Pairs the page actually uses (README "Contraste" + docs/decisions.md).
const TEXT_PAIRS: [ColorName, ColorName][] = [
  ["ink", "bg-900"], ["ink", "surface-800"],
  ["ink-muted", "bg-900"], ["ink-muted", "surface-800"],
  ["neon-pink", "bg-900"],
  ["on-pink", "neon-pink"],
  ["neon-cyan", "bg-900"], ["sunset", "bg-900"], ["sunset", "surface-800"],
  ["danger", "bg-900"], ["danger", "surface-800"],
];

// Non-text UI: control borders, focus ring, icons need 3:1.
const UI_PAIRS: [ColorName, ColorName][] = [
  ["ink-muted", "surface-800"], // input border
  ["neon-cyan", "bg-900"], ["neon-cyan", "surface-800"], // focus ring
];

describe("design token contrast", () => {
  it.each(TEXT_PAIRS)("%s on %s is at least 4.5:1", (fg, bg) => {
    expect(contrastRatio(color(fg), color(bg))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(UI_PAIRS)("%s on %s is at least 3:1", (fg, bg) => {
    expect(contrastRatio(color(fg), color(bg))).toBeGreaterThanOrEqual(3);
  });
});
