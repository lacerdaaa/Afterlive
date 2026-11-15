# Decisões da landing (waitlist)

Registro do que foi decidido antes de codar. Atualize aqui quando algo mudar.

## Marca e design system
- Nome do produto: **Afterlive** (o brand book usa "Neoncut" como provisório).
- Wordmark: path SVG de traço único desenhado à mão, letras geométricas.
  Componente isolado, trocável pelo logo real. Nome real em `<h1>` visualmente oculto.
- Borda de input: `ink-muted` (7.3:1 sobre `surface-800`). `line-700` só em hairline decorativa.
- Hero: `display-lg` no mobile, `display-xl` a partir de `md`.
- Medidas de layout (container, 9:16, barra da waveform) entram como grupo `layout`
  no design system e no `tokens.json`.
- Tempos de motion vêm do README e ficam centralizados em `src/lib/motion/tokens.ts`.

## Conteúdo
- Números da seção Problema: estimativas, marcadas na página como tal e com TODO no código.
- Planos com valores em R$ (placeholder) e selo "em breve".
- Plataformas: Twitch, Kick e YouTube.
- Jogos: GTA 6 no lançamento; outros mundos abertos no roadmap, sem data.
- Copy atemporal: sem countdown, sem data de lançamento.

## Waitlist
- Coleta só e-mail.
- LGPD: frase abaixo do botão + rota `/privacidade`.
- Rate limit: 5 tentativas por 10 min por IP, mais honeypot.
- E-mail repetido retorna sucesso (não revela quem já está na lista).
- Sucesso: confirmação inline no lugar do form.
- Persistência: `WaitlistRepository`; arquivo em dev, memória em produção até o provider real.
  Limitação: na Vercel a memória é por instância e se perde. Trocar antes de divulgar.

## Infra
- pnpm, Vercel Analytics (evento de inscrição), metadata + OG image via `next/og`, sitemap, robots.
