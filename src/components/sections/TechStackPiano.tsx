"use client";

import { useCallback, useMemo, useRef } from "react";
import { buildPianoLayout } from "@/lib/pianoLayout";
import { primeAudio } from "@/lib/audioEngine";
import { PianoKey, type PianoKeyHandle } from "@/components/sections/PianoKey";
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

  return (
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

      {/* engraved plate */}
      <div className="mb-3 flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-white/20 uppercase select-none sm:mb-5 sm:text-[10px]">
        <span>Anurag Kumar</span>
        <span>Stack, No. I</span>
      </div>

      {/* recessed well the keybed sits in */}
      <div
        className="relative overflow-x-auto overflow-y-hidden rounded-md bg-black/40 p-2 shadow-[inset_0_14px_28px_-8px_rgba(0,0,0,0.9),inset_0_-2px_0_rgba(255,255,255,0.03)] sm:p-3"
        style={{ perspective: "2000px" }}
      >
        <div
          className="relative mx-auto flex h-40 min-w-[560px] justify-center gap-[3px] px-2 sm:h-56 sm:min-w-[720px] md:h-72 md:gap-[4px] lg:h-80"
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
              variant="white"
              shortcut={key.shortcut}
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
  );
}
