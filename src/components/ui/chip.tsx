import type { ReactNode } from "react";

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill border border-line-700 px-4 py-1 text-small text-ink-muted ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
