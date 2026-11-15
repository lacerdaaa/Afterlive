import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

/**
 * Primary CTA: neon-pink fill, on-pink text (never white). Max one per fold.
 * Hover/focus lights glow-pink by fading a pre-rendered shadow layer (opacity only).
 */
export function PrimaryButton({ children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-neon-pink px-6 py-4 font-sans text-body font-bold text-on-pink transition-transform duration-150 active:scale-98 disabled:cursor-wait disabled:opacity-70 ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md opacity-0 shadow-glow-pink transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
