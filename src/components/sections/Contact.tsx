import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const socials = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "X", href: site.social.x },
  { label: "Email", href: `mailto:${site.email}` },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-16 md:py-28">
      <Container>
        <Reveal>
          <SectionLabel index="06" label="Contact" />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-10 font-mono text-xs tracking-[0.2em] text-secondary uppercase md:mt-16">
            Have an idea?
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 text-[13vw] leading-[0.95] font-medium tracking-[-0.03em] text-fg sm:text-7xl md:text-8xl lg:text-9xl">
            Let&apos;s build
            <br />
            something
            <br />
            useful.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col justify-between gap-10 border-t border-border pt-10 md:mt-20 md:flex-row md:items-end">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-xl text-fg transition-colors hover:text-hover sm:text-2xl"
            >
              Start a conversation
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>

            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-[0.1em] uppercase">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.label === "Email" ? undefined : "_blank"}
                    rel={s.label === "Email" ? undefined : "noreferrer"}
                    className="group inline-flex items-center gap-1.5 text-secondary transition-colors hover:text-hover"
                  >
                    {s.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
