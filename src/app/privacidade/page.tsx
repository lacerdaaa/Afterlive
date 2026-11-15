import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como o Afterlive trata o e-mail da lista de espera.",
};

// TODO(juridico): revisar com advogado antes de coletar dados além do e-mail.
export default function PrivacyPage() {
  return (
    <main className="mx-auto flex w-full max-w-copy flex-col gap-6 px-6 py-16">
      <Link href="/" className="text-small text-ink-muted underline underline-offset-4 hover:text-ink">
        Voltar
      </Link>
      <h1 className="font-display text-heading md:text-display-lg">Privacidade</h1>
      <p className="text-body-lg text-ink-muted">Versão curta: a gente só guarda seu e-mail, e só pra te avisar.</p>

      <h2 className="text-body-lg font-bold">O que coletamos</h2>
      <p className="text-ink-muted">
        O e-mail que você coloca no formulário da lista de espera. Nada mais. Pra medir a conversão da página usamos
        Vercel Analytics, que não usa cookie e não identifica você.
      </p>

      <h2 className="text-body-lg font-bold">Pra que usamos</h2>
      <p className="text-ink-muted">
        Pra avisar quando o Afterlive abrir e mandar novidades do lançamento. Não vendemos, não alugamos e não
        repassamos seu e-mail.
      </p>

      <h2 className="text-body-lg font-bold">Seus direitos (LGPD)</h2>
      <p className="text-ink-muted">
        Você pode pedir pra ver, corrigir ou apagar seu e-mail da lista a qualquer momento, e todo e-mail que
        mandarmos terá um link pra sair.
      </p>
    </main>
  );
}
