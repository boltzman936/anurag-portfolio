export type ProjectLayout = "full" | "split" | "offset";

export interface Project {
  number: string;
  title: string;
  year: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  layout: ProjectLayout;
  /** true while the entry is a placeholder waiting for real content */
  draft?: boolean;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "SANCTURM",
    year: "2026",
    description:
      "A resource hub for a college's CSE branches — notes, lab manuals, previous year questions, notices and platform-wide updates. Access is gated by a student / CR / admin permission model enforced entirely through Postgres Row-Level Security, not application code.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    github: "https://github.com/boltzman936/sancturm",
    live: "https://sancturm.vercel.app",
    layout: "full",
  },
  {
    number: "02",
    title: "AVON TRADER",
    year: "2025",
    description:
      "A marketing site for Avon Trader, an HVAC contractor delivering heating, ventilation, air conditioning, refrigeration and maintenance solutions for commercial, industrial and residential projects across Lucknow — built to read as a decade-old engineering firm, not a template.",
    technologies: ["HTML", "CSS", "JavaScript"],
    layout: "split",
  },
];
