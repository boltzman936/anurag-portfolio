import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  label,
  light,
}: {
  index: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase",
        light ? "text-bg/60" : "text-secondary",
      )}
    >
      <span>{index}</span>
      <span className={cn("h-px w-8", light ? "bg-bg/30" : "bg-border")} />
      <span>{label}</span>
    </div>
  );
}
