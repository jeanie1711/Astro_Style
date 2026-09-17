import AppTopBar from "@/components/AppTopBar";
import type { StyleResult } from "@/lib/style-data";

type Props = {
  onBack: () => void;
  onNext: () => void;
  result: StyleResult;
};

export default function SignaturePalette({ onBack, onNext, result }: Props) {
  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={5} onBack={onBack} />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-col gap-4 overflow-auto px-5.5 pt-1.5 pb-6">
        <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink">Your Signature Palette</h2>
        <p className="mb-1 text-[13px] leading-relaxed text-espresso">
          Eight colors that define your overall energy.
        </p>
        {result.signaturePalette.map((c) => (
          <div key={c.hex} className="flex items-center gap-3.5 border-b border-border py-2.5">
            <div className="h-11 w-11 flex-shrink-0 rounded" style={{ background: c.hex }} />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2">
                <span className="text-sm font-semibold text-ink">{c.name}</span>
                <span className="font-mono text-xs text-mushroom">{c.hex}</span>
              </div>
              {c.meaning && <p className="mt-0.5 text-[12.5px] leading-snug text-espresso">{c.meaning}</p>}
            </div>
          </div>
        ))}
        <button
          onClick={onNext}
          className="mt-2 rounded-full bg-ink py-4 text-sm font-semibold text-ivory"
        >
          Why These Colors
        </button>
      </div>
    </div>
  );
}
