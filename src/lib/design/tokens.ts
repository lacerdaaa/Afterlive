import raw from "../../../docs/design-system/tokens.json";
import type { DesignTokens } from "./types";

export const tokens = raw as DesignTokens;

export type ColorName =
  | "bg-900" | "surface-800" | "line-700" | "ink" | "ink-muted"
  | "neon-pink" | "on-pink" | "neon-cyan" | "sunset" | "danger";

/** Raw token value, for places CSS variables can't reach (OG image, SVG attributes). */
export function color(name: ColorName): string {
  const token = tokens.color.tokens.find((t) => t.name === name);
  if (!token) throw new Error(`Unknown color token "${name}"`);
  return token.value;
}

export function layoutPx(name: "bar-width" | "container-content" | "container-prose"): number {
  const token = tokens.layout.tokens.find((t) => t.name === name);
  if (!token) throw new Error(`Unknown layout token "${name}"`);
  return Number.parseFloat(token.value);
}
