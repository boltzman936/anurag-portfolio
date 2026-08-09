const WEEKS = 52;
const DAYS = 7;

/** deterministic pseudo-random in [0, 1), stable across builds */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.37) * 43758.5453;
  return x - Math.floor(x);
}

export function getContributionWeeks(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const days: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const seed = w * DAYS + d;
      const r = seededRandom(seed);
      const weekend = d === 0 || d === 6;
      const level =
        r > (weekend ? 0.72 : 0.55)
          ? Math.min(4, Math.floor(r * 5))
          : 0;
      days.push(level);
    }
    weeks.push(days);
  }
  return weeks;
}
