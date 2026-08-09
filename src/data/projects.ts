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
    github: "https://github.com/anuragkumar",
    live: "https://sancturm.example.com",
    layout: "full",
  },
  {
    number: "02",
    title: "ADD PROJECT NAME",
    year: "2025",
    description:
      "Replace with a short, specific description of what this project does, who it's for, and the one decision that made it hard.",
    technologies: ["Next.js", "TypeScript"],
    github: "https://github.com/anuragkumar",
    layout: "split",
    draft: true,
  },
  {
    number: "03",
    title: "ADD PROJECT NAME",
    year: "2025",
    description:
      "Replace with a short, specific description of what this project does, who it's for, and the one decision that made it hard.",
    technologies: ["Python", "React"],
    github: "https://github.com/anuragkumar",
    layout: "offset",
    draft: true,
  },
  {
    number: "04",
    title: "ADD PROJECT NAME",
    year: "2024",
    description:
      "Replace with a short, specific description of what this project does, who it's for, and the one decision that made it hard.",
    technologies: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/anuragkumar",
    layout: "full",
    draft: true,
  },
];
