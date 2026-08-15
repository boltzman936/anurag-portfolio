/**
 * Predefined note sequences for "Play My Story" and "Tech Jam".
 * Indices refer to positions in the 12-key white-key row (0 = HTML
 * ... 11 = Figma). Plays back through the existing per-key trigger()
 * — no new audio engine, just timed calls into the one that exists.
 */
export interface SequenceStep {
  index: number;
  delay: number;
}

function toSteps(indices: number[], gapMs: number): SequenceStep[] {
  return indices.map((index, i) => ({ index, delay: i * gapMs }));
}

// Scale up, a small flourish at the top, then resolve home — roughly 14s at 850ms/note.
const STORY_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 7, 9, 11, 11, 9, 7, 4, 0];
export const STORY_SEQUENCE = toSteps(STORY_INDICES, 850);

// A short, punchy riff — a few seconds, distinct character from the story.
const JAM_INDICES = [4, 7, 4, 9, 7, 4, 0];
export const JAM_SEQUENCE = toSteps(JAM_INDICES, 340);
