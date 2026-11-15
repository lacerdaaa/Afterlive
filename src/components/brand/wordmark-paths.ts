// Hand-drawn single-stroke "afterlive". Grid: x-height 32→64, ascender from 8.
// Each entry is one continuous stroke so the draw effect never traces an outline twice
// (README, motion rule 2). Replace with the real logo once it exists.

type Glyph = { width: number; strokes: string[] };

const GLYPHS: Record<string, Glyph> = {
  a: { width: 32, strokes: ["M32 48 A16 16 0 1 1 0 48 A16 16 0 1 1 32 48", "M32 32 V64"] },
  f: { width: 22, strokes: ["M22 10 C14 6 10 10 10 18 V64", "M0 32 H22"] },
  t: { width: 20, strokes: ["M8 14 V56 Q8 64 18 64", "M0 32 H20"] },
  e: { width: 32, strokes: ["M0 48 H32 A16 16 0 1 0 27.3 59.3"] },
  r: { width: 22, strokes: ["M2 32 V64", "M2 48 C2 38 8 32 20 32"] },
  l: { width: 10, strokes: ["M3 8 V57 Q3 64 10 64"] },
  i: { width: 6, strokes: ["M3 20 V20.5", "M3 32 V64"] },
  v: { width: 30, strokes: ["M0 32 L15 64 L30 32"] },
};

const GAP = 10;
const WORD = "afterlive";

export type WordmarkStroke = { d: string; x: number };

function build() {
  const strokes: WordmarkStroke[] = [];
  let x = 0;
  for (const char of WORD) {
    const glyph = GLYPHS[char];
    if (!glyph) throw new Error(`No glyph for "${char}"`);
    for (const d of glyph.strokes) strokes.push({ d, x });
    x += glyph.width + GAP;
  }
  return { strokes, width: x - GAP };
}

export const WORDMARK = build();
/** Padding keeps round caps and glow inside the viewBox. */
export const WORDMARK_VIEWBOX = `-6 2 ${WORDMARK.width + 12} 68`;
