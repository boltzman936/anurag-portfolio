import Image from "next/image";
import { cn } from "@/lib/utils";

export function PhotoFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden border border-border bg-[#0b0b0b]",
        className,
      )}
    >
      <Image
        src="/anurag.jpg"
        alt="Anurag Kumar"
        fill
        sizes="(min-width: 768px) 33vw, 90vw"
        priority
        className="object-cover grayscale contrast-[1.05]"
      />

      {/* corner crop marks */}
      <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-fg/50" aria-hidden="true" />
      <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-fg/50" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-fg/50" aria-hidden="true" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-fg/50" aria-hidden="true" />
    </div>
  );
}
