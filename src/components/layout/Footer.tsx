import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

const links = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "X", href: site.social.x },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center gap-4 text-center font-mono text-[11px] tracking-[0.1em] text-muted uppercase sm:flex-row sm:justify-between sm:text-left">
        <span>{site.shortName}</span>
        <span>© {new Date().getFullYear()} · Built with Next.js</span>
        <ul className="flex gap-5">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-hover"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
