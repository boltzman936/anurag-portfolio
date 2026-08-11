import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="05" label="Experience" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-10 max-w-2xl text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl md:mt-16 md:text-6xl">
            Where I&apos;ve worked.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-border md:mt-20">
          {experience.map((item, i) => (
            <Reveal key={item.role + item.year} delay={0.05 * i}>
              <div className="grid grid-cols-1 gap-2 border-b border-border py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6 md:py-10">
                <span className="font-mono text-sm text-muted sm:col-span-2">
                  {item.year}
                </span>
                <span className="text-lg font-medium tracking-tight text-fg sm:col-span-4 sm:text-xl">
                  {item.role}
                </span>
                <span className="font-mono text-xs tracking-[0.1em] text-secondary uppercase sm:col-span-2">
                  {item.place}
                </span>
                <p className="text-sm leading-relaxed text-secondary sm:col-span-4">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
