"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between gap-8">
      <div>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-muted">
            {project.number}
          </span>
          <span className="font-mono text-xs text-muted">
            {project.year}
          </span>
        </div>

        <h3 className="mt-3 text-3xl font-medium tracking-tight text-fg sm:text-4xl md:text-[2.75rem]">
          {project.title}
        </h3>

        <p className="mt-5 max-w-md text-base leading-relaxed text-secondary">
          {project.description}
        </p>

        <p className="mt-6 font-mono text-[11px] tracking-[0.1em] text-muted">
          {project.technologies.join(" · ")}
        </p>
      </div>

      <div className="flex items-center gap-6 font-mono text-xs tracking-[0.1em] uppercase">
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
  if (project.layout === "split") {
    return (
      <Reveal>
        <article className="grid grid-cols-1 items-stretch gap-8 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <Visual project={project} />
          <Meta project={project} />
        </article>
      </Reveal>
    );
  }

  if (project.layout === "offset") {
    return (
      <Reveal>
        <article className="grid grid-cols-1 gap-8 py-20 md:grid-cols-12 md:gap-6 md:py-28">
          <div className="md:col-span-5 md:col-start-1">
            <Meta project={project} />
          </div>
          <div className="md:col-span-6 md:col-start-7 md:mt-16">
            <Visual project={project} />
          </div>
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <article
        className={cn(
          "flex flex-col gap-10 py-20 md:py-28",
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
