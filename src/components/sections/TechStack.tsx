import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Bubble } from "@/components/sections/Bubble";
import { technologies } from "@/data/technologies";

export function TechStack() {
  return (
    <section id="stack" className="border-t border-border py-28 md:py-40">
      <Container>
        <Reveal>
          <SectionLabel index="03" label="Stack" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-10 max-w-2xl text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl md:mt-16 md:text-6xl">
            Tools I build with.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-14 overflow-hidden border border-border bg-[#0a0a0a] px-5 py-10 sm:px-8 sm:py-12 md:mt-20 md:px-12 md:py-16"
            role="group"
            aria-label="Technology stack — press a bubble to pop it"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                background:
                  "radial-gradient(circle at 15% 10%, #fff, transparent 40%)",
              }}
              aria-hidden="true"
            />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-start md:gap-5">
              {technologies.map((tech) => (
                <Bubble key={tech.name} name={tech.name} />
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
          Every bubble pops. Try one.
        </p>
      </Container>
    </section>
  );
}
