import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-[92vw] max-w-(--container-content) md:w-full md:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
