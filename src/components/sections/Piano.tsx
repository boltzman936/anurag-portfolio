import { buildPianoLayout } from "@/lib/pianoLayout";
import { PianoKey } from "@/components/sections/PianoKey";
import { technologies } from "@/data/technologies";

export function Piano() {
  const { whiteKeys, blackKeys } = buildPianoLayout(technologies);
  const n = whiteKeys.length;

  return (
    <div
      className="relative overflow-x-auto border border-border bg-[#0a0a0a] p-4 sm:p-6 md:p-8"
      style={{ perspective: "1400px" }}
      role="group"
      aria-label="Tech stack piano — press a key to play it"
    >
      <div className="relative flex h-56 min-w-[760px] sm:h-64 md:h-80">
        {whiteKeys.map((key) => (
          <PianoKey key={key.midi} midi={key.midi} label={key.label} variant="white" />
        ))}

        {blackKeys.map((key) => (
          <div
            key={key.midi}
            className="absolute top-0 z-10 h-full"
            style={{
              left: `${((key.whiteIndex + 1) / n) * 100}%`,
              width: `${(0.62 / n) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <PianoKey midi={key.midi} variant="black" />
          </div>
        ))}
      </div>
    </div>
  );
}
