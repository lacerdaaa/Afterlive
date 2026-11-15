import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afterlive",
  description: "Cortes verticais da sua live, prontos pra postar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
