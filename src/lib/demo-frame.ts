type ChatMessage = { user: string; text: string };

export type DemoScript = {
  words: readonly string[];
  starsAt: readonly number[];
  calmChat: readonly ChatMessage[];
  chat: readonly (ChatMessage & { at: number })[];
  rate: { calm: number; peak: number };
};

export const WORDS_PER_LINE = 3;

/** Everything the demo shows at a given caption beat (-1 = not started). */
export function demoFrame(script: DemoScript, step: number) {
  const last = script.words.length - 1;
  const beat = Math.min(step, last);
  const lineStart = Math.max(0, Math.floor(beat / WORDS_PER_LINE) * WORDS_PER_LINE);
  const ratio = beat < 0 ? 0 : beat / last;

  return {
    line: script.words.slice(lineStart, lineStart + WORDS_PER_LINE),
    active: beat < 0 ? -1 : beat - lineStart,
    stars: script.starsAt.filter((at) => beat >= at).length,
    chat: [...script.calmChat, ...script.chat.filter((m) => beat >= m.at)],
    rate: Math.round(script.rate.calm + (script.rate.peak - script.rate.calm) * ratio),
    progress: beat < 0 ? 0 : (beat + 1) / script.words.length,
    done: beat >= last,
  };
}
