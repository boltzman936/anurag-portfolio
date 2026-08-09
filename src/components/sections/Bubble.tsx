"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { playPop } from "@/lib/popSound";

export function Bubble({ name }: { name: string }) {
  const [pressed, setPressed] = useState(false);
  const reduceMotion = useReducedMotion();

  const press = () => {
    setPressed(true);
    playPop();
  };
  const release = () => setPressed(false);

  return (
    <motion.button
      type="button"
      aria-label={`${name} — press to pop`}
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
      className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full md:h-20 md:w-20 lg:h-24 lg:w-24"
      style={{
        background:
          "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 42%, rgba(0,0,0,0.55) 100%)",
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.18), inset 0 -8px 14px rgba(0,0,0,0.55), 0 1px 0 rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      animate={
        reduceMotion
          ? undefined
          : { scale: pressed ? 0.9 : 1, scaleY: pressed ? 0.82 : 1 }
      }
      transition={
        pressed
          ? { duration: 0.12, ease: "easeOut" }
          : { type: "spring", stiffness: 420, damping: 13, mass: 0.6 }
      }
    >
      <motion.span
        aria-hidden="true"
        className="absolute top-[18%] left-[22%] h-2.5 w-4 -rotate-[24deg] rounded-full bg-white blur-[2.5px]"
        animate={{ opacity: pressed ? 0.12 : 0.32 }}
        transition={{ duration: 0.15 }}
      />
      <span className="pointer-events-none px-2 text-center font-mono text-[9px] leading-tight tracking-tight text-secondary select-none md:text-[10px]">
        {name}
      </span>
    </motion.button>
  );
}
