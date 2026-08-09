import { cn } from "@/lib/utils";

/**
 * Stand-in for the real profile photograph. Renders as a bordered,
 * editorial crop-mark frame rather than a fake photo. Swap the
 * commented <Image> below in for the real file when available.
 */
export function PhotoFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden border border-border bg-[#0b0b0b]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#242424" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#grid)" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[13px] tracking-[0.3em] text-muted uppercase">
          AK
        </span>
      </div>

      {/* corner crop marks */}
      <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-secondary/60" aria-hidden="true" />
      <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-secondary/60" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-secondary/60" aria-hidden="true" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-secondary/60" aria-hidden="true" />

      {/*
        Replace this component's contents with:
        <Image src="/profile.jpg" alt="Anurag Kumar" fill className="object-cover" priority />
      */}
    </div>
  );
}
