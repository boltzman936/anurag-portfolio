import { buildPianoLayout } from "@/lib/pianoLayout";
import { PianoKey } from "@/components/sections/PianoKey";
import { technologies } from "@/data/technologies";

export function Piano() {
  const { whiteKeys, blackKeys } = buildPianoLayout(technologies);
  const n = whiteKeys.length;

  return (
    <div
      className="relative overflow-x-auto border border-border bg-[#0a0a0a] p-3 sm:p-4"
      role="group"
      aria-label="Tech stack piano — press a key to play it"
    >
      <div className="relative flex h-36 min-w-[640px] sm:h-44 md:h-52">
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
