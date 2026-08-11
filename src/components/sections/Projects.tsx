import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectItem } from "@/components/sections/ProjectItem";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="work" className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="02" label="Selected Work" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-3xl leading-[1.08] font-medium tracking-tight text-fg sm:text-4xl md:mt-8 md:text-5xl">
            Things I&apos;ve built
            <br />
            and shipped.
          </h2>
        </Reveal>

        <div className="mt-2 divide-y divide-border md:mt-4">
          {projects.map((project) => (
            <ProjectItem key={project.number} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
