"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { playNote } from "@/lib/audioEngine";
import { cn } from "@/lib/utils";

export interface PianoKeyHandle {
  trigger: () => void;
}

interface PianoKeyProps {
  id: string;
  midi: number;
  label?: string;
  variant: "white" | "black";
  shortcut?: string;
}

const WHITE_THICKNESS = 20;
const BLACK_THICKNESS = 16;

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
}

export const PianoKey = forwardRef<PianoKeyHandle, PianoKeyProps>(function PianoKey(
  { id, midi, label, variant, shortcut },
  ref,
) {
  const [pressed, setPressed] = useState(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const press = () => {
    setPressed(true);
    playNote(midi);
  };
  const release = () => setPressed(false);

  // programmatic trigger for parent-orchestrated glide/drag play
  useImperativeHandle(ref, () => ({
    trigger: () => {
      press();
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
      releaseTimer.current = setTimeout(release, 110);
    },
  }));

  useEffect(() => {
    return () => {
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    };
  }, []);

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

  const directHandlers = {
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
        data-piano-key="black" data-key-id={id}
        style={{
          touchAction: "none",
          transformStyle: "preserve-3d",
          transform: pressed
            ? "translateZ(10px)"
            : "translateZ(24px)",
          transition: "transform 90ms cubic-bezier(.2,.7,.3,1)",
        }}
        {...directHandlers}
        className="block h-[56%] w-full will-change-transform"
      >
        {/* top surface */}
        <span
          className="absolute inset-0 rounded-[3px]"
          style={{
            transform: `translateZ(${BLACK_THICKNESS}px)`,
            background: pressed
              ? "linear-gradient(160deg, #1c1c1c 0%, #050505 70%)"
              : "linear-gradient(160deg, #3a3a3a 0%, #131313 55%, #030303 100%)",
          }}
        >
          <span
            className="absolute inset-x-[20%] top-[10%] h-[2px] rounded-full bg-white/25"
            aria-hidden="true"
          />
        </span>

        {/* front face — thin physical edge */}
        <span
          className="absolute inset-x-0 bottom-0 rounded-b-[3px]"
          style={{
            height: BLACK_THICKNESS,
            transformOrigin: "top",
            transform: `rotateX(-90deg) translateZ(${BLACK_THICKNESS}px)`,
            background: "linear-gradient(180deg, #0e0e0e, #000)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
          }}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      data-piano-key="white" data-key-id={id}
      style={{
        touchAction: "none",
        transformStyle: "preserve-3d",
        transform: pressed ? "translateZ(-6px)" : "translateZ(0)",
        transition: "transform 90ms cubic-bezier(.2,.7,.3,1)",
      }}
      {...directHandlers}
      className="group relative min-w-[46px] flex-1 will-change-transform sm:min-w-[60px]"
    >
      {/* top surface — carries the label in its lower/front region */}
      <span
        className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[2px] border-r border-black/10 pb-[10%]"
        style={{
          transform: `translateZ(${WHITE_THICKNESS}px)`,
          background: pressed
            ? "linear-gradient(175deg, #e2e0dc 0%, #d3d0ca 100%)"
            : "linear-gradient(175deg, #fdfcfa 0%, #f4f2ee 55%, #e5e2dc 100%)",
        }}
      >
        {/* soft diagonal sheen */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "linear-gradient(118deg, transparent 30%, rgba(255,255,255,0.9) 45%, transparent 58%)",
          }}
        />
        {/* ambient occlusion where the black keys hang above */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-black/[0.09] to-transparent"
          aria-hidden="true"
        />

        {label && (
          <span className="pointer-events-none relative z-10 px-1.5 text-center font-mono text-[9.5px] leading-[1.2] font-semibold tracking-tight text-[#1a1a1a]/80 uppercase sm:text-[11px] md:text-[12px]">
            {label}
          </span>
        )}
      </span>

      {/* front face — physical edge thickness, no text */}
      <span
        className="absolute inset-x-0 bottom-0 border-x border-b border-black/10"
        style={{
          height: WHITE_THICKNESS,
          transformOrigin: "top",
          transform: `rotateX(-90deg) translateZ(${WHITE_THICKNESS}px)`,
          background: pressed
            ? "linear-gradient(180deg, #c9c6c0, #b7b4ad)"
            : "linear-gradient(180deg, #ece9e3, #cfccc5)",
        }}
      />

      {/* right seam — visible separation between neighboring keys */}
      <span
        className="absolute top-0 right-0 h-full"
        style={{
          width: WHITE_THICKNESS,
          transformOrigin: "left",
          transform: `rotateY(90deg) translateZ(${WHITE_THICKNESS}px)`,
          background: "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.32))",
        }}
      />

      {/* pressed accent under the label */}
      <span
        className={cn(
          "pointer-events-none absolute inset-x-[32%] bottom-[6%] h-[2px] rounded-full bg-[#1a1a1a] transition-opacity duration-150",
          pressed ? "opacity-40" : "opacity-0",
        )}
        style={{ transform: `translateZ(${WHITE_THICKNESS + 1}px)` }}
        aria-hidden="true"
      />
    </button>
  );
});
