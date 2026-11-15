import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { tokensToCss } from "./to-css";
import { tokens } from "./tokens";

it("src/styles/tokens.css is in sync with tokens.json (run `pnpm tokens`)", () => {
  const onDisk = readFileSync("src/styles/tokens.css", "utf8");
  expect(onDisk).toBe(tokensToCss(tokens, "docs/design-system/tokens.json"));
});
