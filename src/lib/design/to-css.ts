import type { DesignTokens } from "./types";

// Tailwind namespaces wiped so a class can only exist if a token defines it.
const RESET_NAMESPACES = ["color", "spacing", "radius", "shadow", "font", "text", "container", "aspect"];

const kebab = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Split a CSS list on commas that are not inside parentheses. */
function splitTopLevel(value: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of value) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

export function shadowToDropShadow(value: string): string {
  return splitTopLevel(value)
    .map((s) => `drop-shadow(${s})`)
    .join(" ");
}

/** '"Unbounded", "Arial Black"' → 'var(--ff-unbounded), "Arial Black"' (next/font owns the first face). */
function familyToCss(stack: string): string {
  const [first, ...rest] = splitTopLevel(stack);
  const face = (first ?? "").replace(/["']/g, "");
  return [`var(--ff-${kebab(face)})`, ...rest].join(", ");
}

function layoutVar(name: string): { theme: boolean; prop: string } {
  if (name.startsWith("container-") || name.startsWith("aspect-")) return { theme: true, prop: `--${name}` };
  return { theme: false, prop: `--layout-${name}` };
}

export function tokensToCss(tokens: DesignTokens, source: string): string {
  const theme: string[] = RESET_NAMESPACES.map((ns) => `--${ns}-*: initial;`);
  const root: string[] = [];

  theme.push("", "/* color */");
  for (const t of tokens.color.tokens) theme.push(`--color-${t.name}: ${t.value};`);

  theme.push("", "/* spacing: space-N → p-N, gap-N, … */");
  for (const t of tokens.spacing.tokens) theme.push(`--spacing-${t.name.replace(/^space-/, "")}: ${t.value};`);

  theme.push("", "/* radius */");
  for (const t of tokens.radius.tokens) theme.push(`--${t.name}: ${t.value};`);

  theme.push("", "/* type */");
  for (const [key, stack] of Object.entries(tokens.type.families)) theme.push(`--font-${key}: ${familyToCss(stack)};`);
  for (const group of tokens.type.groups) {
    for (const s of group.styles) {
      theme.push(
        `--text-${s.name}: ${s.fontSize};`,
        `--text-${s.name}--line-height: ${s.lineHeight};`,
        `--text-${s.name}--font-weight: ${s.fontWeight};`,
      );
    }
  }

  theme.push("", "/* shadow */");
  for (const t of tokens.shadow.tokens) {
    theme.push(`--shadow-${t.name}: ${t.value};`);
    root.push(`--filter-${t.name}: ${shadowToDropShadow(t.value)};`);
  }

  theme.push("", "/* layout */");
  for (const t of tokens.layout.tokens) {
    const { theme: inTheme, prop } = layoutVar(t.name);
    (inTheme ? theme : root).push(`${prop}: ${t.value};`);
  }

  const indent = (lines: string[]) => lines.map((l) => (l ? `  ${l}` : "")).join("\n");
  return [
    `/* ${tokens.name} — generated from ${source}. Do not edit. */`,
    "",
    `@theme {\n${indent(theme)}\n}`,
    "",
    `:root {\n${indent(root)}\n}`,
    "",
  ].join("\n");
}
