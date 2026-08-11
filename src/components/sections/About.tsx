import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const details = [
  { label: "Based in", value: "India" },
  { label: "Studying", value: "CSE · AI/ML" },
  { label: "Currently", value: "Building Sancturm" },
  { label: "Availability", value: "Open to selected projects" },
];

export function About() {
  return (
    <section id="about" className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="01" label="About" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7" delay={0.05}>
            <h2 className="text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl md:text-6xl">
              I build things
              <br />
              that are meant
              <br />
              to be used.
            </h2>
          </Reveal>

          <div className="flex flex-col justify-between gap-10 md:col-span-5">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-secondary md:text-lg">
                <p>
                  I&apos;m {site.name}, a full-stack developer focused on
                  turning ideas into products people actually open twice.
                </p>
                <p>
                  I work across frontend, backend and AI — from interface to
                  deployment — and learn most of what I know by shipping,
                  not by watching tutorials.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-fg uppercase"
              >
                More about me
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <dl className="mt-20 grid grid-cols-2 gap-y-8 border-t border-border pt-10 sm:grid-cols-4 md:mt-28">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {d.label}
                </dt>
                <dd className="mt-2 text-sm text-fg md:text-base">{d.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
