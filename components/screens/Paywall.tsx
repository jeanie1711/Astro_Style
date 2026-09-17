import AppTopBar from "@/components/AppTopBar";

type Props = {
  onBack: () => void;
  onUnlock: () => void;
  onSkip: () => void;
};

export default function Paywall({ onBack, onUnlock, onSkip }: Props) {
  return (
    <div className="flex h-full flex-col bg-ink">
      <AppTopBar step={9} onBack={onBack} dark />
      <div className="flex flex-1 flex-col gap-5 overflow-auto px-6.5 pt-2.5 pb-7">
        <div className="mt-1.5 flex flex-col gap-2 text-center">
          <span className="text-[10px] font-semibold tracking-[.2em] text-gold uppercase">
            Unlock Your Full Result
          </span>
          <h2 className="font-serif text-[26px] font-medium text-ivory">
            See your complete style board
          </h2>
        </div>
        <div className="flex flex-col gap-2.5 rounded-2xl bg-dark-card p-4">
          <span className="text-[11px] font-semibold tracking-[.08em] text-mushroom">FREE</span>
          <p className="text-[13px] leading-relaxed text-border">
            Style essence · 3 signature colors · 1 style direction
          </p>
        </div>
        <div className="flex flex-col gap-2.5 rounded-2xl border border-gold bg-gold-card p-4">
          <span className="text-[11px] font-semibold tracking-[.08em] text-gold">FULL RESULT</span>
          <p className="text-[13px] leading-relaxed text-ivory">
            Full 8-color palette · complete astrology explanation · all 4 outfit directions ·
            high-res downloadable style board
          </p>
        </div>
        <button
          onClick={onUnlock}
          className="mt-auto rounded-full bg-gold py-4.5 text-sm font-semibold text-ink"
        >
          Unlock for $6.99
        </button>
        <button onClick={onSkip} className="py-1 text-xs text-mushroom">
          Maybe later
        </button>
      </div>
    </div>
  );
}
