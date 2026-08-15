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
  slug?: string;
  color?: string;
  variant: "white" | "black";
  shortcut?: string;
  highlighted?: boolean;
}

const WHITE_THICKNESS = 20;
const BLACK_THICKNESS = 16;

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
}

function TechLogo({ slug, color, className }: { slug: string; color: string; className?: string }) {
  if (slug === "figma") {
    // Simple Icons only ships Figma as flat monochrome — the real mark is
    // multicolor, and that's specifically what's being asked for here.
    return (
      <svg viewBox="0 0 38 57" className={className} aria-hidden="true">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
    />
  );
}

export const PianoKey = forwardRef<PianoKeyHandle, PianoKeyProps>(function PianoKey(
  { id, midi, label, slug, color, variant, shortcut, highlighted },
  ref,
) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const press = () => {
    setPressed(true);
    playNote(midi);
  };
  const release = () => setPressed(false);

  // programmatic trigger for parent-orchestrated glide/drag play and sequences
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
  const active = pressed || hovered;

  const directHandlers = {
    onPointerDown: press,
    onPointerUp: release,
    onPointerCancel: release,
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => {
      setHovered(false);
      if (pressed) release();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        press();
      }
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") release();
    },
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (variant === "black") {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        data-piano-key="black"
        data-key-id={id}
        style={{
          touchAction: "none",
          transformStyle: "preserve-3d",
          transform: pressed
            ? "translateZ(10px)"
            : hovered
              ? "translateZ(26px)"
              : "translateZ(24px)",
          transition: "transform 90ms cubic-bezier(.2,.7,.3,1)",
        }}
        {...directHandlers}
        className="block h-[54%] w-full will-change-transform"
      >
        {/* top surface */}
        <span
          className="absolute inset-0 rounded-[3px]"
          style={{
            transform: `translateZ(${BLACK_THICKNESS}px)`,
            background: pressed
              ? "linear-gradient(160deg, #1c1c1c 0%, #050505 70%)"
              : "linear-gradient(160deg, #3f3f3f 0%, #141414 55%, #030303 100%)",
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
      data-piano-key="white"
      data-key-id={id}
      style={{
        touchAction: "none",
        transformStyle: "preserve-3d",
        transform: pressed ? "translateZ(-6px)" : hovered ? "translateZ(3px)" : "translateZ(0)",
        transition: "transform 90ms cubic-bezier(.2,.7,.3,1)",
      }}
      {...directHandlers}
      className="group relative min-w-[52px] flex-1 will-change-transform sm:min-w-[68px] md:min-w-[80px]"
    >
      {/* top surface — carries the logo + name in its lower/front region */}
      <span
        className="absolute inset-0 flex flex-col items-center justify-end gap-1.5 overflow-hidden rounded-[2px] border-r border-black/10 pb-[12%] sm:gap-2"
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
          className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/[0.09] to-transparent"
          aria-hidden="true"
        />

        {/* brand-color wash, muted at rest, brighter on hover/press */}
        {color && (
          <span
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at 50% 78%, ${color}33, transparent 65%)`,
              opacity: active ? 1 : 0.45,
            }}
            aria-hidden="true"
          />
        )}

        {slug && color && (
          <TechLogo
            slug={slug}
            color={color}
            className={cn(
              "relative z-10 h-[16px] w-[16px] shrink-0 object-contain transition-all duration-200 sm:h-[20px] sm:w-[20px] md:h-[26px] md:w-[26px]",
              active ? "opacity-100 saturate-100" : "opacity-55 saturate-[0.35]",
            )}
          />
        )}

        {label && (
          <span
            className={cn(
              "pointer-events-none relative z-10 w-full min-w-0 px-1 text-center leading-[1.15] font-semibold tracking-tight break-words text-[#161616] transition-colors duration-200",
              "text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px]",
              active ? "text-opacity-100" : "text-opacity-75",
            )}
            style={{ color: active ? "#111111" : "#3a3a3a" }}
          >
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

      {/* pressed accent under the label, tinted by brand color */}
      <span
        className="pointer-events-none absolute inset-x-[28%] bottom-[7%] h-[2px] rounded-full transition-opacity duration-150"
        style={{
          transform: `translateZ(${WHITE_THICKNESS + 1}px)`,
          background: color ?? "#1a1a1a",
          opacity: pressed ? 0.8 : 0,
        }}
        aria-hidden="true"
      />

      {/* project-connection highlight ring — visual only, never plays audio */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[2px] transition-opacity duration-500"
        style={{
          transform: `translateZ(${WHITE_THICKNESS + 1}px)`,
          boxShadow: `inset 0 0 0 2px ${color ?? "#ffffff"}`,
          opacity: highlighted ? 0.65 : 0,
        }}
        aria-hidden="true"
      />
    </button>
  );
});
