import { cn } from "@/lib/utils";

export function ProjectVisual({
  number,
  className,
}: {
  number: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden border border-border bg-[#0a0a0a]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.3]"
        viewBox="0 0 400 250"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`diag-${number}`} width="18" height="18" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="18" stroke="#242424" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="250" fill={`url(#diag-${number})`} />
      </svg>
      <span className="absolute right-5 bottom-4 font-mono text-6xl leading-none font-medium text-fg/[0.06] select-none sm:text-8xl">
        {number}
      </span>
    </div>
  );
}
