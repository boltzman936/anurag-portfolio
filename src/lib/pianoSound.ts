let ctx: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Synthesized piano note: a struck fundamental plus a few quiet
 * harmonics through a filter that closes over time, with the fast
 * attack and long exponential decay of a real hammer-struck string.
 * No sample file — generated on the fly with the Web Audio API.
 */
export function playNote(midi: number) {
  const audio = getContext();
  if (!audio) return;

  const now = audio.currentTime;
  const freq = midiToFreq(midi);

  const master = audio.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.5, now + 0.006);
  master.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(5200, now);
  filter.frequency.exponentialRampToValueAtTime(600, now + 2.2);
  filter.Q.value = 0.4;

  master.connect(filter).connect(audio.destination);

  const partials: [number, number, OscillatorType][] = [
    [1, 0.9, "triangle"],
    [2, 0.35, "sine"],
    [3, 0.12, "sine"],
    [4, 0.05, "sine"],
  ];

  partials.forEach(([mult, level, type], i) => {
    const osc = audio.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq * mult, now);

    const gain = audio.createGain();
    gain.gain.value = level;

    osc.connect(gain).connect(master);
    osc.detune.setValueAtTime(i === 0 ? 0 : (Math.random() - 0.5) * 6, now);
    osc.start(now);
    osc.stop(now + 2.5);
  });

  // faint hammer transient
  const bufferSize = Math.floor(audio.sampleRate * 0.015);
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = audio.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(0.06, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
  noise.connect(noiseGain).connect(audio.destination);
  noise.start(now);
  noise.stop(now + 0.02);
}
