import type { StyleResult } from "@/lib/style-data";

export function StyleBoardCard({ result }: { result: StyleResult }) {
  return (
    <div className="w-full max-w-260 rounded-md bg-ivory p-6 sm:p-11">
      <div className="mb-6.5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="mb-2 font-serif text-3xl leading-[1.15] font-medium text-ink sm:text-4xl">
            Your Style, Aligned
          </h2>
          <p className="font-serif text-base font-medium text-espresso italic">{result.profileLine}</p>
          <p className="mt-1.5 text-[13px] tracking-[.02em] text-mushroom">{result.styleStatement}</p>
        </div>
        <div className="text-right text-[10px] leading-[1.9] font-semibold tracking-[.14em] text-mushroom">
          SAME YOU
          <br />
          MORE POSSIBILITIES
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {result.archetypes.map((a) => (
          <div key={a.id} className="flex min-w-0 flex-col gap-2.5">
            <span className="text-xs font-semibold tracking-[.08em] text-mushroom">{a.tags}</span>
            <h3 className="font-serif text-xl font-medium text-ink">{a.name}</h3>
            <div className="flex aspect-[3/4] w-full items-center justify-center rounded bg-cream px-2 text-center text-[11px] text-mushroom">
              {a.imageLabel}
            </div>
            <div className="flex gap-1.5">
              {a.swatches.map((hex, i) => (
                <div key={i} className="h-5 w-5 rounded-full border border-black/10" style={{ background: hex }} />
              ))}
            </div>
            <p className="text-[12.5px] leading-snug text-espresso">{a.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-7.5 border-t border-border pt-4.5 text-center text-[11px] font-semibold tracking-[.16em] text-mushroom uppercase">
        Astrology Meets Style · Same You. More Possibilities.
      </div>
    </div>
  );
}

export function PalettePosterCard({ result }: { result: StyleResult }) {
  return (
    <div className="w-full max-w-260 rounded-md bg-ivory p-6 sm:p-11">
      <div className="mb-7.5 text-center">
        <span className="text-[10px] font-semibold tracking-[.24em] text-mushroom uppercase">
          Astrology Meets Style
        </span>
        <h2 className="mt-2.5 mb-1.5 font-serif text-2xl leading-[1.15] font-medium text-ink sm:text-[38px]">
          Your Personal Color Palette
        </h2>
        <p className="font-serif text-[15px] font-medium text-espresso italic">{result.profileLine}</p>
        <p className="mt-2 text-[11px] font-semibold tracking-[.18em] text-mushroom">
          {result.essenceWords.join(" ").replace(/\./g, "").toUpperCase().split(" ").join(" · ")}
        </p>
      </div>

      <p className="mb-3 text-xs font-semibold tracking-[.1em] text-ink uppercase">Signature 8</p>
      <div className="mb-7 grid grid-cols-4 gap-3 sm:grid-cols-8">
        {result.signaturePalette.map((c) => (
          <div key={c.hex} className="flex min-w-0 flex-col gap-2">
            <div className="aspect-square w-full rounded-md" style={{ background: c.hex }} />
            <span className="text-xs font-semibold text-ink">{c.name}</span>
            <span className="font-mono text-[10px] text-mushroom">{c.hex}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <p className="mb-2.5 text-xs font-semibold tracking-[.1em] text-ink uppercase">Base Colors</p>
          <div className="flex gap-2.5">
            {result.baseColors.map((c) => (
              <div key={c.hex} className="flex flex-1 flex-col gap-1.5">
                <div className="aspect-square w-full rounded-md" style={{ background: c.hex }} />
                <span className="text-[11px] font-medium text-ink">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-xs font-semibold tracking-[.1em] text-ink uppercase">Statement Colors</p>
          <div className="flex gap-2.5">
            {result.statementColors.map((c) => (
              <div key={c.hex} className="flex flex-1 flex-col gap-1.5">
                <div className="aspect-square w-full rounded-md" style={{ background: c.hex }} />
                <span className="text-[11px] font-medium text-ink">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-xs font-semibold tracking-[.1em] text-ink uppercase">Fresh Accents</p>
          <div className="flex gap-2">
            {result.freshAccents.map((c) => (
              <div key={c.hex} className="flex flex-1 flex-col gap-1.5">
                <div className="aspect-square w-full rounded-md" style={{ background: c.hex }} />
                <span className="text-[10.5px] font-medium text-ink">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-7 border-t border-border pt-4.5 text-center text-[11px] font-semibold tracking-[.16em] text-mushroom uppercase">
        Same Energy. A Brighter You.
      </div>
    </div>
  );
}
