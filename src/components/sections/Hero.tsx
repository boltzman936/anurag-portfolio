"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <Container className="grid grid-cols-1 gap-14 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-8">
          <motion.p
            {...fadeUp(0)}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-secondary uppercase md:mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg" />
            </span>
            Available for selected work
          </motion.p>

          <h1 className="font-sans text-[15vw] leading-[0.9] font-medium tracking-[-0.03em] text-fg sm:text-[13vw] md:text-[7.4vw] lg:text-[6.6vw]">
            <motion.span {...fadeUp(0.08)} className="block overflow-hidden">
              Anurag
            </motion.span>
            <motion.span {...fadeUp(0.16)} className="block overflow-hidden text-muted">
              Kumar
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.26)}
            className="mt-8 font-mono text-xs tracking-[0.2em] text-secondary uppercase md:mt-10"
          >
            {site.role}
          </motion.p>

          <motion.p
            {...fadeUp(0.32)}
            className="mt-6 max-w-lg text-lg leading-relaxed text-secondary md:mt-8 md:text-xl"
          >
            I build digital products, interfaces and systems that actually
            ship — full-stack, from database to deployment, with AI woven in
            where it earns its place.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 flex items-center gap-6 font-mono text-[11px] tracking-[0.15em] text-muted uppercase md:mt-14"
          >
            <span>{site.location}</span>
            <span className="h-px w-6 bg-border" />
            <span>{site.education}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="md:col-span-4"
        >
          <PhotoFrame className="max-w-xs md:ml-auto md:max-w-none" />
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
          Scroll
        </span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-border"
        />
      </motion.div>
    </section>
  );
}
