"use client";

import { useRef, useState } from "react";
import { buildPianoLayout } from "@/lib/pianoLayout";
import { PianoKey } from "@/components/sections/PianoKey";
import { technologies } from "@/data/technologies";

export function TechStackPiano() {
  const { whiteKeys, blackKeys } = buildPianoLayout(technologies);
  const n = whiteKeys.length;
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlay = (label: string) => {
    setNowPlaying(label);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setNowPlaying(null), 1600);
  };

  return (
    <div>
      {/* chassis */}
      <div className="relative overflow-x-auto rounded-lg border border-border bg-gradient-to-b from-[#0d0d0d] to-[#050505] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:p-6 md:p-8">
        {/* top trim highlight, like light catching a metal edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden="true"
        />

        {/* engraved brand plate */}
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-fg/25 uppercase select-none sm:mb-6">
          <span>Anurag Kumar</span>
          <span>Model I · Stack Series</span>
        </div>

        {/* the keybed, recessed and tilted in real 3D */}
        <div
          className="relative"
          style={{ perspective: "1600px" }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 -top-1 h-4 rounded-t-md bg-black/60 blur-sm"
            aria-hidden="true"
          />
          <div
            className="relative flex h-48 min-w-[680px] sm:h-64 md:h-80 lg:h-[22rem]"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(10deg)",
              transformOrigin: "bottom",
            }}
          >
            {whiteKeys.map((key) => (
              <PianoKey
                key={key.midi}
                midi={key.midi}
                label={key.label}
                variant="white"
                shortcut={key.shortcut}
                onPlay={handlePlay}
              />
            ))}

            {blackKeys.map((key) => (
              <div
                key={key.midi}
                className="absolute top-0 z-10 h-full"
                style={{
                  left: `${((key.whiteIndex + 1) / n) * 100}%`,
                  width: `${(0.6 / n) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <PianoKey midi={key.midi} variant="black" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex h-4 items-center justify-center font-mono text-[11px] tracking-[0.15em] text-secondary uppercase">
        <span
          className={`transition-opacity duration-300 ${nowPlaying ? "opacity-100" : "opacity-0"}`}
        >
          Now playing — {nowPlaying}
        </span>
      </div>
    </div>
  );
}
