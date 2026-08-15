/**
 * Minimal pub/sub connecting the Projects section to the piano.
 * Visual-only — never triggers audio. Projects and the piano are
 * separate section components, so this is the least-heavy way to
 * connect them without lifting state into a shared ancestor.
 */
type Listener = (technologies: string[]) => void;

const listeners = new Set<Listener>();

export function highlightTechs(technologies: string[]) {
  listeners.forEach((fn) => fn(technologies));
}

export function subscribeHighlight(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
