import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import { color } from "@/lib/design/tokens";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["600", "700"], variable: "--ff-unbounded", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--ff-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--ff-jetbrains-mono", display: "swap" });

const description =
  "A IA assiste sua VOD, lê o chat, ouve suas reações e entrega cortes verticais com legenda em PT-BR, prontos pra TikTok, Shorts e Reels.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "Afterlive: sua live vira corte", template: "%s · Afterlive" },
  description,
  openGraph: { type: "website", locale: "pt_BR", siteName: "Afterlive", title: "Afterlive: sua live vira corte", description },
  twitter: { card: "summary_large_image", title: "Afterlive: sua live vira corte", description },
};

export const viewport: Viewport = { themeColor: color("bg-900"), colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
