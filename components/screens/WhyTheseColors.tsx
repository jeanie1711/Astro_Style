import AppTopBar from "@/components/AppTopBar";
import type { StyleResult } from "@/lib/style-data";

type Props = {
  onBack: () => void;
  onNext: () => void;
  result: StyleResult;
};

export default function WhyTheseColors({ onBack, onNext, result }: Props) {
  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={6} onBack={onBack} />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-col gap-4.5 overflow-auto px-5.5 pt-1.5 pb-6">
        <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink">Why These Colors</h2>
        {result.whyTheseColors.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5 rounded-2xl bg-white p-4">
            <span
              className="text-xs font-semibold tracking-[.06em]"
              style={{ color: item.color }}
            >
              {item.label}
            </span>
            <p className="text-[13.5px] leading-relaxed text-ink">{item.text}</p>
          </div>
        ))}
        <button
          onClick={onNext}
          className="mt-1 rounded-full bg-ink py-4 text-sm font-semibold text-ivory"
        >
          See Style Direction
        </button>
      </div>
    </div>
  );
}
