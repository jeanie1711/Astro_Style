import AppTopBar from "@/components/AppTopBar";
import type { StyleResult } from "@/lib/style-data";

type Props = {
  onBack: () => void;
  onNext: () => void;
  result: StyleResult;
  profileLine: string;
};

export default function EssenceReveal({ onBack, onNext, result, profileLine }: Props) {
  return (
    <div className="flex h-full flex-col bg-ink">
      <AppTopBar step={4} onBack={onBack} dark />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-1 flex-col items-center justify-center gap-4.5 px-7.5 text-center">
        <span className="text-[10px] font-semibold tracking-[.22em] text-mushroom uppercase">
          Your style essence
        </span>
        <h1 className="font-serif text-[44px] leading-[1.1] font-medium text-ivory">
          {result.essenceWords.map((word) => (
            <span key={word}>
              {word}
              <br />
            </span>
          ))}
        </h1>
        <p className="mt-1.5 text-[13px] text-taupe">{profileLine}</p>
        <button
          onClick={onNext}
          className="mt-3.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink"
        >
          See My Palette
        </button>
      </div>
    </div>
  );
}
