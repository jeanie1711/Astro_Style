import AppTopBar from "@/components/AppTopBar";
import type { StyleResult } from "@/lib/style-data";

type Props = {
  onBack: () => void;
  onNext: () => void;
  result: StyleResult;
};

export default function StyleDirection({ onBack, onNext, result }: Props) {
  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={7} onBack={onBack} />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-col gap-4 overflow-auto px-5.5 pt-1.5 pb-6">
        <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink">Your Style Direction</h2>
        <p className="font-serif text-[19px] font-medium text-oxblood italic">
          &ldquo;{result.styleStatement}&rdquo;
        </p>
        <div className="mt-1.5 flex flex-col gap-3">
          {result.styleDirection.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between py-3 ${
                i < result.styleDirection.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-xs font-semibold tracking-[.08em] text-mushroom">{row.label}</span>
              <span className="text-right text-[13px] text-ink">{row.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onNext}
          className="mt-1 rounded-full bg-ink py-4 text-sm font-semibold text-ivory"
        >
          See My Outfits
        </button>
      </div>
    </div>
  );
}
