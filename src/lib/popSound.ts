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

/**
 * Synthesized bubble-wrap pop: a pitch-dropping tone for the "thock"
 * of the air pocket plus a short filtered noise burst for the plastic
 * snap. No audio file — generated on the fly with the Web Audio API.
 */
export function playPop() {
  const audio = getContext();
  if (!audio) return;

  const now = audio.currentTime;

  // low pitch-dropping "thock"
  const osc = audio.createOscillator();
  const oscGain = audio.createGain();
  osc.type = "sine";
  const baseFreq = 170 + Math.random() * 40;
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.35, now + 0.07);
  oscGain.gain.setValueAtTime(0.0001, now);
  oscGain.gain.exponentialRampToValueAtTime(0.5, now + 0.006);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  osc.connect(oscGain).connect(audio.destination);

  // filtered noise burst for the plastic "snap"
  const bufferSize = Math.floor(audio.sampleRate * 0.04);
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = audio.createBufferSource();
  noise.buffer = buffer;

  const bandpass = audio.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 1400 + Math.random() * 600;
  bandpass.Q.value = 0.8;

  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(0.35, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  noise.connect(bandpass).connect(noiseGain).connect(audio.destination);

  osc.start(now);
  osc.stop(now + 0.1);
  noise.start(now);
  noise.stop(now + 0.05);
}
