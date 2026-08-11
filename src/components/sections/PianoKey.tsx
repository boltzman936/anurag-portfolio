"use client";

import { useEffect, useState } from "react";
import { playNote } from "@/lib/pianoSound";
import { cn } from "@/lib/utils";

interface PianoKeyProps {
  midi: number;
  label?: string;
  variant: "white" | "black";
  shortcut?: string;
  onPlay?: (label: string) => void;
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable
  );
}

export function PianoKey({ midi, label, variant, shortcut, onPlay }: PianoKeyProps) {
  const [pressed, setPressed] = useState(false);

  const press = () => {
    setPressed(true);
    playNote(midi);
    if (label) onPlay?.(label);
  };
  const release = () => setPressed(false);

  // computer-keyboard playability, independent of DOM focus
  useEffect(() => {
    if (!shortcut) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.repeat) return;
      if (e.key === shortcut) {
        e.preventDefault();
        press();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === shortcut) release();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortcut, midi]);

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
        style={{
          touchAction: "manipulation",
          transform: pressed
            ? "translateZ(9px) translateY(10px)"
            : "translateZ(20px) translateY(-2px)",
        }}
        {...handlers}
        className={cn(
          "block h-[56%] w-full rounded-b-[5px] border border-black transition-transform duration-100 ease-out will-change-transform",
          pressed
            ? "bg-gradient-to-b from-[#2e2e2e] to-[#050505] shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-[#3d3d3d] via-[#151515] to-[#020202] shadow-[0_10px_14px_-2px_rgba(0,0,0,0.85)]",
        )}
      >
        <span
          className="pointer-events-none absolute inset-x-[18%] top-[12%] h-[3px] rounded-full bg-white/20"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-b-[5px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      style={{
        touchAction: "manipulation",
        transform: pressed ? "translateZ(-4px) translateY(6px)" : "translateZ(0)",
      }}
      {...handlers}
      className={cn(
        "group relative flex min-w-[52px] flex-1 flex-col overflow-hidden border-r border-[#c4c4c4] transition-transform duration-100 ease-out will-change-transform last:border-r-0",
      )}
    >
      {/* ivory top surface */}
      <span
        className={cn(
          "flex-1 bg-gradient-to-b transition-colors duration-100",
          pressed
            ? "from-[#dcdcdc] via-[#d2d2d2] to-[#c4c4c4]"
            : "from-white via-[#fbfbfb] to-[#e6e6e6]",
        )}
        aria-hidden="true"
      >
        {/* soft diagonal sheen */}
        <span
          className="block h-full w-full opacity-[0.35]"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.8) 48%, transparent 62%)",
          }}
        />
      </span>

      {/* seam shadow separating top surface from front face */}
      <span
        className="pointer-events-none absolute inset-x-0 h-2 bg-gradient-to-b from-black/15 to-transparent"
        style={{ top: "78%" }}
        aria-hidden="true"
      />

      {/* dark front face — carries the label, never touched by black keys */}
      <span
        className={cn(
          "flex h-[22%] flex-col items-center justify-center gap-0.5 bg-gradient-to-b transition-colors duration-100",
          pressed ? "from-[#0a0a0a] to-black" : "from-[#1c1c1c] to-[#020202]",
        )}
      >
        {label && (
          <span className="pointer-events-none px-1 text-center font-mono text-[9px] leading-[1.15] font-semibold tracking-tight text-white/85 uppercase sm:text-[10px] md:text-[11px]">
            {label}
          </span>
        )}
      </span>

      {/* pressed-state accent line under the label */}
      <span
        className={cn(
          "pointer-events-none absolute inset-x-[30%] bottom-0 h-[2px] bg-white transition-opacity duration-150",
          pressed ? "opacity-70" : "opacity-0",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
