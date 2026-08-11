import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Piano } from "@/components/sections/Piano";

export function TechStack() {
  return (
    <section id="stack" className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="03" label="Stack" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-medium tracking-tight text-fg sm:text-4xl md:mt-8 md:text-5xl">
            Tools I build with.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 md:mt-12">
            <Piano />
          </div>
        </Reveal>

        <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
          Every key plays. Try one.
        </p>
      </Container>
    </section>
  );
}
