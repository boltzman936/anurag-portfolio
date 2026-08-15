/**
 * Polyphonic piano voice engine.
 *
 * One shared AudioContext, one shared master bus (gain + limiter).
 * Every playNote() call builds its own independent oscillator graph
 * and connects straight to that bus — nothing is queued, nothing is
 * awaited, nothing is shared between voices, so notes freely overlap.
 * Each voice disconnects itself the moment it ends.
 */

let ctx: AudioContext | null = null;
let masterBus: GainNode | null = null;

function getEngine() {
  if (typeof window === "undefined") return null;

  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new Ctor();

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 20;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.15;
    compressor.connect(ctx.destination);

    masterBus = ctx.createGain();
    masterBus.gain.value = 0.9;
    masterBus.connect(compressor);
  }

  if (ctx.state !== "running") void ctx.resume();
  return { ctx, masterBus: masterBus! };
}

/** Call on the very first user gesture to unlock audio (iOS/Safari). */
export function primeAudio() {
  getEngine();
}

export function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Fires one independent piano-like voice. Safe to call as fast and
 * as often as input arrives — every call is a brand new, disposable
 * node graph, so overlapping notes never block or cut each other off.
 */
export function playNote(midi: number) {
  const engine = getEngine();
  if (!engine) return;
  const { ctx: audio, masterBus: bus } = engine;

  const now = audio.currentTime;
  const freq = midiToFreq(midi);

  const voice = audio.createGain();
  voice.gain.setValueAtTime(0.0001, now);
  voice.gain.linearRampToValueAtTime(0.85, now + 0.004);
  voice.gain.exponentialRampToValueAtTime(0.08, now + 0.35);
  voice.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(6000, now);
  filter.frequency.exponentialRampToValueAtTime(900, now + 1.0);
  filter.Q.value = 0.35;

  voice.connect(filter).connect(bus);

  const partials: [number, number, OscillatorType][] = [
    [1, 1, "triangle"],
    [2, 0.32, "sine"],
    [3, 0.14, "sine"],
    [4.01, 0.06, "sine"],
  ];

  const oscillators = partials.map(([mult, level, type], i) => {
    const osc = audio.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq * mult, now);
    osc.detune.setValueAtTime(i === 0 ? 0 : (Math.random() - 0.5) * 5, now);

    const gain = audio.createGain();
    gain.gain.value = level;

    osc.connect(gain).connect(voice);
    osc.start(now);
    osc.stop(now + 1.15);
    return { osc, gain };
  });

  // hammer transient — a very short filtered noise burst
  const bufferSize = Math.max(1, Math.floor(audio.sampleRate * 0.012));
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = audio.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(0.05, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
  noise.connect(noiseGain).connect(bus);
  noise.start(now);
  noise.stop(now + 0.02);

  // explicit cleanup — disconnect every node once its voice has ended
  const last = oscillators[oscillators.length - 1].osc;
  last.onended = () => {
    oscillators.forEach(({ osc, gain }) => {
      osc.disconnect();
      gain.disconnect();
    });
    filter.disconnect();
    voice.disconnect();
  };
  noise.onended = () => {
    noise.disconnect();
    noiseGain.disconnect();
  };
}
