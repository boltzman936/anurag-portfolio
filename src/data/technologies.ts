export interface Technology {
  name: string;
  /** simpleicons.org slug, used for the logo image */
  slug: string;
  /** brand color, used muted at rest and brighter on hover/press */
  color: string;
}

/**
 * Curated, not exhaustive — this list becomes piano keys, and a
 * piano with 20 keys crammed with logos stops reading as a piano.
 */
export const technologies: Technology[] = [
  { name: "HTML", slug: "html5", color: "#E34F26" },
  { name: "CSS", slug: "css", color: "#1572B6" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#111111" },
  { name: "Node.js", slug: "nodedotjs", color: "#339933" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "Git", slug: "git", color: "#F05032" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "Figma", slug: "figma", color: "#F24E1E" },
];
