"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { highlightTechs } from "@/lib/pianoHighlightBus";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** briefly highlights matching piano keys when a project scrolls into view — visual only, no audio */
function useTechHighlight(technologies: string[]) {
  const ref = useRef<HTMLElement>(null);
  const lastFired = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const now = Date.now();
        if (entry.isIntersecting && now - lastFired.current > 3000) {
          lastFired.current = now;
          highlightTechs(technologies);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-muted">
            {project.number}
          </span>
          <span className="font-mono text-xs text-muted">
            {project.year}
          </span>
        </div>

        <h3 className="mt-2 text-2xl font-medium tracking-tight text-fg sm:text-3xl md:text-4xl">
          {project.title}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary md:text-base">
          {project.description}
        </p>

        <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-muted">
          {project.technologies.join(" · ")}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-6 font-mono text-xs tracking-[0.1em] uppercase">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-fg transition-colors hover:text-hover"
          >
            GitHub
            <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
              ↗
            </span>
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-fg transition-colors hover:text-hover"
          >
            Live
            <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
              ↗
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

function Visual({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative"
    >
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectVisual number={project.number} />
      </motion.div>
    </motion.div>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  const highlightRef = useTechHighlight(project.technologies);

  if (project.layout === "split") {
    return (
      <Reveal>
        <article
          ref={highlightRef}
          className="grid grid-cols-1 items-center gap-6 py-10 md:grid-cols-2 md:gap-10 md:py-14"
        >
          <Visual project={project} />
          <Meta project={project} />
        </article>
      </Reveal>
    );
  }

  if (project.layout === "offset") {
    return (
      <Reveal>
        <article
          ref={highlightRef}
          className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-6 md:py-14"
        >
          <div className="md:col-span-5 md:col-start-1">
            <Meta project={project} />
          </div>
          <div className="md:col-span-6 md:col-start-7 md:mt-6">
            <Visual project={project} />
          </div>
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <article
        ref={highlightRef}
        className={cn(
          "flex flex-col gap-6 py-10 md:py-14",
          project.draft && "opacity-90",
        )}
      >
        <Visual project={project} />
        <div className="md:max-w-2xl">
          <Meta project={project} />
        </div>
      </article>
    </Reveal>
  );
}
