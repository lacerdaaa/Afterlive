import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-content border-t border-line-700 px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-heading text-ink">Afterlive</p>
        <nav aria-label="Rodapé" className="flex gap-6 text-small text-ink-muted">
          <Link href="/privacidade" className="hover:text-ink">
            Privacidade
          </Link>
          <a href="#faq" className="hover:text-ink">
            Perguntas
          </a>
        </nav>
      </div>
      <p className="mt-6 text-small text-ink-muted">
        © 2026 Afterlive. Não somos afiliados à Rockstar Games nem à Take-Two Interactive. Grand Theft Auto e GTA são
        marcas dos seus donos.
      </p>
    </footer>
  );
}
