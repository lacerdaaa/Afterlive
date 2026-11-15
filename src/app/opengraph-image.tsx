import { ImageResponse } from "next/og";
import { WORDMARK, WORDMARK_VIEWBOX } from "@/components/brand/wordmark-paths";
import { color, layoutPx } from "@/lib/design/tokens";
import { makeWaveform } from "@/lib/waveform";

export const alt = "Afterlive: sua live vira corte";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PEAKS = [14, 18, 25];
const BARS = makeWaveform({ count: 36, peaks: PEAKS, seed: 19 });

// Static share card built from the same wordmark paths and color tokens as the page.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: color("bg-900"),
        }}
      >
        <svg width={760} height={176} viewBox={WORDMARK_VIEWBOX}>
          {WORDMARK.strokes.map((s, i) => (
            <path
              key={i}
              d={s.d}
              transform={`translate(${s.x} 0)`}
              fill="none"
              stroke={color("neon-pink")}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 140 }}>
          {BARS.map((h, i) => (
            <div
              key={i}
              style={{
                width: layoutPx("bar-width"),
                height: `${h * 100}%`,
                borderRadius: layoutPx("bar-width") / 2,
                background: PEAKS.includes(i) ? color("sunset") : color("neon-cyan"),
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: color("ink") }}>Sua live vira corte enquanto você dorme.</div>
      </div>
    ),
    size,
  );
}
