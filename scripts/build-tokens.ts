// Regenerates src/styles/tokens.css from the design system. Run: pnpm tokens
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tokensToCss } from "../src/lib/design/to-css.ts";
import type { DesignTokens } from "../src/lib/design/types.ts";

export const SOURCE = "docs/design-system/tokens.json";
export const OUTPUT = "src/styles/tokens.css";

const tokens = JSON.parse(readFileSync(SOURCE, "utf8")) as DesignTokens;
mkdirSync("src/styles", { recursive: true });
writeFileSync(OUTPUT, tokensToCss(tokens, SOURCE));
console.log(`wrote ${OUTPUT}`);
