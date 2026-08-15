"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildPianoLayout } from "@/lib/pianoLayout";
import { primeAudio } from "@/lib/audioEngine";
import { STORY_SEQUENCE, JAM_SEQUENCE, type SequenceStep } from "@/lib/pianoSequences";
import { subscribeHighlight } from "@/lib/pianoHighlightBus";
import { PianoKey, type PianoKeyHandle } from "@/components/sections/PianoKey";
import { SpotifyNowPlaying } from "@/components/sections/SpotifyNowPlaying";
import { technologies } from "@/data/technologies";

/** max screen-px gap between hit-test samples while dragging — keeps fast swipes from skipping keys */
const SAMPLE_STEP = 10;

export function TechStackPiano() {
  const { whiteKeys, blackKeys } = useMemo(
    () => buildPianoLayout(technologies),
    [],
  );
  const n = whiteKeys.length;

  const keyRefs = useRef<Map<string, PianoKeyHandle>>(new Map());
  const isDown = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastKeyId = useRef<string | null>(null);
  const sequenceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [playingSequence, setPlayingSequence] = useState<"story" | "jam" | null>(null);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());

  // project-section connection — visual only, never plays audio
  useEffect(() => {
    let clearTimer: ReturnType<typeof setTimeout> | null = null;
    const unsubscribe = subscribeHighlight((techNames) => {
      const wanted = new Set(techNames.map((t) => t.toLowerCase()));
      const ids = new Set(
        whiteKeys.filter((k) => wanted.has(k.label.toLowerCase())).map((k) => k.id),
      );
      setHighlighted(ids);
      if (clearTimer) clearTimeout(clearTimer);
      clearTimer = setTimeout(() => setHighlighted(new Set()), 2200);
    });
    return () => {
      unsubscribe();
      if (clearTimer) clearTimeout(clearTimer);
    };
  }, [whiteKeys]);

  const triggerAt = useCallback((id: string | null) => {
    if (!id || id === lastKeyId.current) return;
    lastKeyId.current = id;
    keyRefs.current.get(id)?.trigger();
  }, []);

  const keyIdAtPoint = useCallback((x: number, y: number) => {
    const el = document.elementFromPoint(x, y);
    const key = el instanceof Element ? el.closest("[data-key-id]") : null;
    return key?.getAttribute("data-key-id") ?? null;
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      primeAudio();
      isDown.current = true;
      try {
        (e.target as Element).setPointerCapture?.(e.pointerId);
      } catch {
        // no active pointer to capture — safe to ignore, hit-testing doesn't depend on it
      }
      lastPos.current = { x: e.clientX, y: e.clientY };
      triggerAt(keyIdAtPoint(e.clientX, e.clientY));
    },
    [keyIdAtPoint, triggerAt],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDown.current) return;
      const from = lastPos.current ?? { x: e.clientX, y: e.clientY };
      const to = { x: e.clientX, y: e.clientY };
      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.ceil(dist / SAMPLE_STEP));

      for (let i = 1; i <= steps; i++) {
        const x = from.x + ((to.x - from.x) * i) / steps;
        const y = from.y + ((to.y - from.y) * i) / steps;
        triggerAt(keyIdAtPoint(x, y));
      }
      lastPos.current = to;
    },
    [keyIdAtPoint, triggerAt],
  );

  const endGesture = useCallback(() => {
    isDown.current = false;
    lastPos.current = null;
    lastKeyId.current = null;
  }, []);

  // plays a predefined sequence through the SAME per-key trigger() used by
  // click/keyboard/glide — no separate audio path
  const playSequence = useCallback(
    (steps: SequenceStep[], name: "story" | "jam") => {
      sequenceTimers.current.forEach(clearTimeout);
      sequenceTimers.current = [];
      setPlayingSequence(name);
      primeAudio();

      steps.forEach((step) => {
        const key = whiteKeys[step.index];
        if (!key) return;
        const t = setTimeout(() => keyRefs.current.get(key.id)?.trigger(), step.delay);
        sequenceTimers.current.push(t);
      });

      const total = steps[steps.length - 1]?.delay ?? 0;
      const doneTimer = setTimeout(() => setPlayingSequence(null), total + 300);
      sequenceTimers.current.push(doneTimer);
    },
    [whiteKeys],
  );

  useEffect(() => {
    return () => sequenceTimers.current.forEach(clearTimeout);
  }, []);

  return (
    <div>
      <div
        className="relative rounded-xl border border-[#1c1c1c] bg-gradient-to-b from-[#111111] to-[#040404] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5 md:p-7"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endGesture}
        onPointerCancel={endGesture}
        onPointerLeave={endGesture}
      >
        {/* upper edge highlight — light catching the chassis rim */}
        <div
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden="true"
        />

        {/* engraved plate + sequence controls */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
          <div className="font-mono text-[9px] tracking-[0.25em] text-white/20 uppercase select-none sm:text-[10px]">
            <span>Anurag Kumar</span>
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="hidden sm:inline">Stack, No. I</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => playSequence(STORY_SEQUENCE, "story")}
              disabled={playingSequence !== null}
              className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] text-white/70 uppercase transition-colors hover:border-white/40 hover:text-white disabled:opacity-40 sm:text-[10px]"
            >
              {playingSequence === "story" ? "Playing…" : "Play My Story"}
            </button>
            <button
              type="button"
              onClick={() => playSequence(JAM_SEQUENCE, "jam")}
              disabled={playingSequence !== null}
              className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] text-white/70 uppercase transition-colors hover:border-white/40 hover:text-white disabled:opacity-40 sm:text-[10px]"
            >
              {playingSequence === "jam" ? "Playing…" : "Tech Jam"}
            </button>
          </div>
        </div>

        {/* recessed well the keybed sits in */}
        <div
          className="relative overflow-x-auto overflow-y-hidden rounded-md bg-black/40 p-2 shadow-[inset_0_14px_28px_-8px_rgba(0,0,0,0.9),inset_0_-2px_0_rgba(255,255,255,0.03)] sm:p-3"
          style={{ perspective: "2000px" }}
        >
          <div
            className="relative flex h-48 w-max min-w-full items-stretch justify-start gap-[3px] px-2 sm:h-64 md:h-80 md:gap-[4px] lg:h-[22rem]"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(24deg)",
              transformOrigin: "bottom",
            }}
          >
            {whiteKeys.map((key) => (
              <PianoKey
                key={key.id}
                ref={(el) => {
                  if (el) keyRefs.current.set(key.id, el);
                  else keyRefs.current.delete(key.id);
                }}
                id={key.id}
                midi={key.midi}
                label={key.label}
                slug={key.slug}
                color={key.color}
                variant="white"
                shortcut={key.shortcut}
                highlighted={highlighted.has(key.id)}
              />
            ))}

            {blackKeys.map((key) => (
              <div
                key={key.id}
                className="absolute top-0 z-10 h-full"
                style={{
                  left: `${((key.whiteIndex + 1) / n) * 100}%`,
                  width: `${(0.58 / n) * 100}%`,
                  transform: "translateX(-50%)",
                  transformStyle: "preserve-3d",
                }}
              >
                <PianoKey id={key.id} midi={key.midi} variant="black" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SpotifyNowPlaying />
    </div>
  );
}
