// All landing copy in one place (PT-BR, streamer pra streamer).

// TODO(dados-reais): estimativas da equipe. Trocar por números medidos com os primeiros streamers.
export const problem = {
  equation: [
    { value: "6h", label: "de live" },
    { value: "20", label: "momentos que viram corte" },
    { value: "25 min", label: "por corte: achar, cortar, reenquadrar e legendar" },
  ],
  result: { value: "8h+", label: "de edição. Mais que a própria live." },
  footnote:
    "Estimativa: 20 cortes por live de 6h e uns 25 min de edição manual por corte. Vamos trocar por dados reais dos primeiros streamers.",
};

export const steps = [
  {
    title: "Conecta a conta",
    body: "Liga sua Twitch, Kick ou YouTube uma vez. Quando a live acaba, a VOD entra na fila sozinha.",
  },
  {
    title: "A IA acha os picos",
    body: "Ela cruza chat, áudio e o HUD do jogo pra marcar os momentos que a sua comunidade mais reagiu.",
  },
  {
    title: "Cortes prontos",
    body: "Você recebe os cortes em 9:16, reenquadrados e com legenda em PT-BR. É revisar e postar.",
  },
] as const;

export const signals = {
  chat: {
    title: "Chat",
    body: "Velocidade e intensidade do chat: spike de mensagem, emote repetido, KKKKK em massa. Se o chat explodiu, alguma coisa aconteceu.",
    messages: [
      { time: "01:24:31", text: "KKKKKKKKKKKKK" },
      { time: "01:24:32", text: "NÃO ACREDITO" },
      { time: "01:24:32", text: "clipa isso" },
    ],
    rate: "412 msg/min",
  },
  audio: {
    title: "Áudio",
    body: "Grito, risada, aquele silêncio antes do caos. A IA ouve sua reação, não só o som do jogo.",
  },
  hud: {
    title: "HUD do jogo",
    body: "Estrelas de procurado subindo, perseguição, tela de derrota. Visão computacional lê o que está na tela, onde não existe kill feed.",
  },
  together: "Quando os três batem juntos, é corte.",
};

export const plans = [
  {
    name: "Free",
    price: "R$ 0",
    period: "pra sempre",
    pitch: "Pra testar na sua próxima live.",
    features: ["3 cortes por live", "Legenda em PT-BR", "720p com marca d'água"],
    featured: false,
  },
  {
    name: "Pro",
    price: "R$ 39",
    period: "/mês",
    pitch: "Pra quem faz live toda semana.",
    features: ["30 cortes por live", "1080p sem marca d'água", "Legenda editável", "Twitch, Kick e YouTube"],
    featured: true,
  },
  {
    name: "Creator",
    price: "R$ 99",
    period: "/mês",
    pitch: "Pra quem vive de corte.",
    features: ["Cortes ilimitados", "Várias contas e canais", "Fila prioritária", "Exporta pra editor"],
    featured: false,
  },
] as const;

export const pricingNote = "Valores de referência. Podem mudar até a abertura.";

export const faq = [
  {
    q: "Quais plataformas funcionam?",
    a: "Twitch, Kick e YouTube. Você conecta a conta uma vez e cada VOD nova entra na fila sozinha.",
  },
  {
    q: "Funciona com quais jogos?",
    a: "Começamos pelo GTA 6, porque é onde a IA feita pra jogo de tiro mais falha: não tem kill feed. Outros jogos de mundo aberto entram depois, com o mesmo cuidado.",
  },
  {
    q: "A legenda sai em que idioma?",
    a: "Em PT-BR, com gíria e tudo. A legenda vem editável, caso a IA erre o nome de alguém do chat.",
  },
  {
    q: "O que vocês fazem com a minha VOD?",
    a: "A VOD é usada só pra gerar os seus cortes. Ela não é publicada, vendida nem usada pra treinar modelo de terceiros, e você pode apagar tudo quando quiser.",
  },
  {
    q: "Quanto vai custar?",
    a: "Vai ter plano grátis. Os planos pagos acima são valores de referência e podem mudar até a abertura.",
  },
  {
    q: "Quando abre?",
    a: "Em ondas, começando por quem está na lista. Entra com seu e-mail e a gente avisa quando for a sua vez.",
  },
] as const;
