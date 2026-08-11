"use client";

import { useState } from "react";
import { playNote } from "@/lib/pianoSound";
import { cn } from "@/lib/utils";

interface PianoKeyProps {
  midi: number;
  label?: string;
  variant: "white" | "black";
}

export function PianoKey({ midi, label, variant }: PianoKeyProps) {
  const [pressed, setPressed] = useState(false);

  const press = () => {
    setPressed(true);
    playNote(midi);
  };
  const release = () => setPressed(false);

  const ariaLabel = label ? `${label} — play` : "Play note";

  if (variant === "black") {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        onPointerDown={press}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={() => pressed && release()}
        onKeyDown={(e) => {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault();
            press();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") release();
        }}
        className={cn(
          "block h-[58%] w-full rounded-b-[3px] border border-black/80 shadow-[0_3px_4px_rgba(0,0,0,0.6)] transition-transform duration-75",
          pressed ? "translate-y-[3px] bg-[#2a2a2a]" : "bg-[#151515]",
        )}
      >
        <span
          className="absolute inset-x-0 top-1 h-1 rounded-full bg-white/10"
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={() => pressed && release()}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          press();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") release();
      }}
      className={cn(
        "relative flex min-w-[42px] flex-1 flex-col justify-end border-r border-[#d8d8d8] pb-2 transition-transform duration-75 last:border-r-0 sm:pb-4",
        pressed ? "translate-y-[3px] bg-[#dcdcdc]" : "bg-white",
      )}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/10 to-transparent"
        aria-hidden="true"
      />
      {label && (
        <span className="pointer-events-none px-1 text-center font-mono text-[8px] leading-tight tracking-tight text-black/60 uppercase sm:text-[9px]">
          {label}
        </span>
      )}
    </button>
  );
}
