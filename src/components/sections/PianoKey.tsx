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

  const handlers = {
    onPointerDown: press,
    onPointerUp: release,
    onPointerCancel: release,
    onPointerLeave: () => pressed && release(),
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        press();
      }
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") release();
    },
  };

  if (variant === "black") {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        {...handlers}
        className={cn(
          "block h-[60%] w-full rounded-b-[4px] border border-black transition-[transform,box-shadow] duration-100 ease-out",
          pressed
            ? "translate-y-[3px] bg-gradient-to-b from-[#333] to-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
            : "bg-gradient-to-b from-[#3a3a3a] via-[#161616] to-[#050505] shadow-[0_6px_10px_rgba(0,0,0,0.75)]",
        )}
      >
        <span
          className="absolute inset-x-[15%] top-[10%] h-[3px] rounded-full bg-white/25"
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      {...handlers}
      className={cn(
        "relative flex min-w-[46px] flex-1 flex-col border-r border-[#c9c9c9] transition-[transform,box-shadow] duration-100 ease-out last:border-r-0",
        pressed
          ? "translate-y-[4px] shadow-[inset_0_6px_10px_rgba(0,0,0,0.35)]"
          : "shadow-[0_8px_10px_rgba(0,0,0,0.45)]",
      )}
    >
      <span
        className={cn(
          "flex-1 bg-gradient-to-b",
          pressed ? "from-[#d8d8d8] to-[#c8c8c8]" : "from-white via-white to-[#e9e9e9]",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "flex h-[18%] items-center justify-center bg-gradient-to-b transition-colors",
          pressed ? "from-[#0c0c0c] to-[#000]" : "from-[#232323] to-[#0a0a0a]",
        )}
      >
        {label && (
          <span className="pointer-events-none px-1 text-center font-mono text-[9px] leading-tight font-medium tracking-tight text-white/75 uppercase sm:text-[10px] md:text-[11px]">
            {label}
          </span>
        )}
      </span>
    </button>
  );
}
