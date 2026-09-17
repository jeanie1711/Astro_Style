import AppTopBar from "@/components/AppTopBar";
import type { StyleResult } from "@/lib/style-data";

type Props = {
  onBack: () => void;
  onNext: () => void;
  result: StyleResult;
  unlocked: boolean;
};

export default function OutfitBoard({ onBack, onNext, result, unlocked }: Props) {
  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={8} onBack={onBack} />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-col gap-5 overflow-auto px-5.5 pt-1.5 pb-6">
        <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink">Your Style Board</h2>
        {result.archetypes.map((a) => {
          const isLocked = a.locked && !unlocked;
          return (
            <div key={a.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[4/5] w-full bg-cream">
                <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-mushroom">
                  {a.imageLabel}
                </div>
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/55 backdrop-blur-[2px]">
                    <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-ivory/90 text-[15px]">
                      🔒
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-0.5 font-serif text-lg font-medium text-ink">{a.name}</h3>
                <span className="text-[10px] font-semibold tracking-[.1em] text-mushroom uppercase">
                  {a.tags}
                </span>
                <p className="mt-2 mb-2.5 text-[13px] leading-relaxed text-espresso">{a.desc}</p>
                <div className="flex gap-1.5">
                  {a.swatches.map((hex, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 rounded-full border border-black/10"
                      style={{ background: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <button
          onClick={onNext}
          className="mt-0.5 rounded-full bg-ink py-4 text-sm font-semibold text-ivory"
        >
          Unlock Full Board
        </button>
      </div>
    </div>
  );
}
