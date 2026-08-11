import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { getContributionWeeks } from "@/data/activity";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const levelOpacity = ["bg-fg/[0.06]", "bg-fg/20", "bg-fg/40", "bg-fg/60", "bg-fg/90"];

const stats = [
  { label: "Commits", value: site.activity.commits },
  { label: "Repositories", value: site.activity.repositories },
  { label: "Projects", value: site.activity.projects },
];

export function Activity() {
  const weeks = getContributionWeeks();

  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="04" label="Activity" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-10 max-w-2xl text-4xl leading-[1.08] font-medium tracking-tight text-fg sm:text-5xl md:mt-16 md:text-6xl">
            Building consistently.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-3 gap-6 border-y border-border py-8 sm:max-w-md md:mt-20">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl text-fg sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="no-scrollbar mt-12 overflow-x-auto pb-2">
            <div className="flex w-max gap-[5px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[5px]">
                  {week.map((level, di) => (
                    <span
                      key={di}
                      className={cn(
                        "h-[16px] w-[16px] rounded-[3px] border border-border/60 md:h-[18px] md:w-[18px]",
                        levelOpacity[level],
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-muted uppercase">
            <span>Less</span>
            {levelOpacity.map((c, i) => (
              <span
                key={i}
                className={cn("h-[16px] w-[16px] rounded-[3px] border border-border/60", c)}
              />
            ))}
            <span>More</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
