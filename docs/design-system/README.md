# Neoncut — design system

Neoncut é uma ferramenta de clipping com IA para streamers de GTA 6: ela pega a VOD, acha os picos (chat, áudio, HUD) e entrega cortes verticais prontos. A identidade junta duas ideias: **Neon Vice**, linhas de neon que se desenham e depois acendem, e **Waveform**, a forma de onda da live, cujos picos viram clipes. "Neoncut" é um nome provisório e pode ser trocado.

## Voz

- Direta, de streamer pra streamer. Frases curtas, PT-BR, gíria leve ("corte", "live", "VOD").
- Faça: lidere pelo resultado ("Sua live de 6h vira 20 cortes enquanto você dorme").
- Não faça: superlativos vazios ("revolucionário"), emoji em título, CAIXA ALTA em parágrafo.
- Números concretos sempre que houver: tempo de processamento, quantidade de cortes, views.

## Fundamentos visuais

- **Escuro sempre.** Um tema só (Dark): o neon precisa de fundo escuro. A página fica em `bg-900`, cards e o player em `surface-800`, e as bordas são hairlines de 1px em `line-700`. Nada de sombra cinza: profundidade vem de borda e de glow.
- **Cores com papéis fixos.** `neon-pink` é a marca e o CTA primário (no máximo um por dobra). `neon-cyan` é a waveform e o foco. `sunset` só marca clipe e "viral". `danger` só aparece em erro. Texto sobre pink é `on-pink`, nunca branco.
- **Tipografia.** `display` (Unbounded, larga e de pôster) só em títulos de `heading` pra cima. Corpo em `sans` (Manrope). Timecodes, contadores e durações em `mono` (JetBrains Mono, estilo `timecode`), sempre no formato `01:24:37`. As três famílias vêm do Google Fonts.
- **Grid e ritmo.** Gutter de `space-6`. Entre blocos de uma seção, `space-10`. Entre seções, `space-16`.
- **Formas.** Cards e botões com `radius-md`. As barras da waveform têm 12px de largura com `radius-sm`, o que as deixa como pílulas. Chips com `radius-pill`.
- **Contraste.** `ink` e `ink-muted` passam de 4.5:1 sobre `bg-900` e `surface-800`. `neon-pink` como texto passa sobre `bg-900`; sobre `surface-800`, use pink só a partir de 18px.

## Motion: o traço que se desenha

O efeito assinatura da marca. As regras:

1. **Desenha, depois acende.** O path começa com `pathLength: 0` (ou `stroke-dashoffset` cheio) e anima até 1 em 1.2–1.8s, com `easeInOut`. Quando o traço termina, aplique `glow-pink`/`glow-cyan` com fade de 300ms. O glow nunca aparece antes do traço completo.
2. **Use fonte de traço único** (single-line/Hershey) para palavras escritas à mão. Fontes normais têm contorno, e o efeito desenha a borda da letra duas vezes. Para o logo, converta em path no Figma e simplifique.
3. **Um desenho por vez.** No máximo um elemento desenhando na viewport. Na sequência do hero: logo → waveform → picos acendendo em `sunset` um a um (stagger de 80ms).
4. **Dispara uma vez.** Na entrada da viewport (`whileInView`, `once: true`). Nunca em loop.
5. **Respeite `prefers-reduced-motion`.** Mostre o estado final direto, já com glow.
6. **Stroke** de 2–3px, `stroke-linecap: round`, `fill: none`.

Implementação sugerida: Next.js + Motion (`motion/react`, animando `pathLength`) ou GSAP DrawSVG para timelines mais longas.

## Waveform (motivo)

A waveform é o desenho que explica o produto: barras verticais em `neon-cyan` com alturas variadas, gap de `space-2` e espelhadas no eixo central. Os picos escolhidos pela IA viram `neon-pink`, e o marcador do clipe na timeline abaixo fica em `sunset`. Use a waveform no hero e na seção "como funciona". Nada de usá-la como textura de fundo.

## Iconografia

Ainda não há logo nem set de ícones. Até existir um logo, escreva "Neoncut" em `display` 700. Para ícones, use Lucide com stroke de 2px em `currentColor`, combinando com o traço do neon.

## Propriedade intelectual

A vibe lembra Vice City, mas **nada da Rockstar entra aqui**: nem logo, nem a fonte "Pricedown", nem key art, nem screenshots oficiais em material de marketing sem licença. Use as cores e as linhas, não os assets.
