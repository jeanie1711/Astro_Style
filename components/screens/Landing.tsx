export default function Landing({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-[fadeUp_0.5s_ease_both] flex h-full flex-col items-center justify-center gap-5.5 bg-cream px-9 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold">
        <div className="h-2 w-2 rounded-full bg-gold" />
      </div>
      <span className="text-[10px] font-semibold tracking-[.24em] text-espresso uppercase">
        Astrology Meets Style
      </span>
      <h1 className="font-serif text-4xl leading-[1.15] font-medium text-ink">
        Your birth chart, translated into color and style.
      </h1>
      <p className="max-w-70 text-sm leading-relaxed text-espresso">
        Not skin-tone analysis — your energy, in color and clothes.
      </p>
      <button
        onClick={onNext}
        className="mt-2.5 rounded-full bg-ink px-8 py-4 text-sm font-semibold tracking-[.03em] text-ivory"
      >
        Find My Palette
      </button>
    </div>
  );
}
