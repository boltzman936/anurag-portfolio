import type { Technology } from "@/data/technologies";

export interface PianoKeyData {
  midi: number;
  label: string;
  /** index among white keys only, used for horizontal positioning */
  whiteIndex: number;
  /** computer-keyboard key that triggers this piano key, white keys only */
  shortcut?: string;
}

const WHITE_STEPS = [0, 2, 4, 5, 7, 9, 11]; // C D E F G A B, within an octave
const HAS_BLACK_AFTER = [true, true, false, true, true, true, false]; // no black after E or B

/** One shortcut per white key, left to right — discoverable, no two-key chords. */
const SHORTCUTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];

/**
 * Lays out one white key per technology (in order) starting at C4,
 * plus the black keys a real keyboard would have between them.
 */
export function buildPianoLayout(technologies: Technology[]) {
  const baseMidi = 60; // C4
  const whiteKeys: PianoKeyData[] = [];
  const blackKeys: PianoKeyData[] = [];

  technologies.forEach((tech, i) => {
    const octave = Math.floor(i / 7);
    const stepIndex = i % 7;
    const midi = baseMidi + octave * 12 + WHITE_STEPS[stepIndex];
    whiteKeys.push({ midi, label: tech.name, whiteIndex: i, shortcut: SHORTCUTS[i] });

    const isLastKey = i === technologies.length - 1;
    if (!isLastKey && HAS_BLACK_AFTER[stepIndex]) {
      blackKeys.push({ midi: midi + 1, label: "", whiteIndex: i });
    }
  });

  return { whiteKeys, blackKeys };
}
