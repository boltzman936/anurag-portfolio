import { Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TechStackPiano } from "@/components/sections/TechStackPiano";

export function TechStack() {
  return (
    <section id="stack" className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="03" label="Stack" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 flex max-w-2xl items-center gap-4 text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl md:mt-8 md:text-6xl">
            <Layers
              className="h-8 w-8 shrink-0 text-fg sm:h-10 sm:w-10 md:h-12 md:w-12"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Tools I build with.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 max-w-md text-sm text-secondary md:text-base">
            Every key represents something I build with.
            <br />
            Play it yourself.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 md:mt-12">
            <TechStackPiano />
          </div>
        </Reveal>

        <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
          Every key plays — click, tap, or press 1–9, 0, - =.
        </p>
      </Container>
    </section>
  );
}
