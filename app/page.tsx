import Link from "next/link";
import { MOCK_RESULT } from "@/lib/style-data";
import { StyleBoardCard, PalettePosterCard } from "@/components/ShareableCards";

const steps = [
  {
    n: "01",
    title: "Share your birth details",
    body: "Date, exact time, and place — the inputs your chart is calculated from.",
  },
  {
    n: "02",
    title: "We translate your chart",
    body: "Sun, Venus and Rising blend into a color-and-mood profile — not a single zodiac cliché.",
  },
  {
    n: "03",
    title: "Get your style board",
    body: "A signature palette and 3–4 outfit directions you can actually wear.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-14 bg-cream px-4 py-16 sm:px-5 sm:py-20">
      {/* Hero */}
      <section className="flex w-full max-w-260 flex-col items-center gap-7 text-center">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-brushed-gold [animation:twinkle_2.4s_ease-in-out_infinite]" />
          <span className="text-[11px] font-semibold tracking-[.22em] text-espresso uppercase">
            Astrology Meets Style
          </span>
          <div className="h-2 w-2 rounded-full bg-brushed-gold [animation:twinkle_2.4s_ease-in-out_infinite_0.6s]" />
        </div>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] font-medium text-ink sm:text-6xl">
          Your birth chart, translated into color and style.
        </h1>
        <p className="max-w-lg text-[17px] leading-relaxed text-espresso">
          Enter your birth details and get a personal color palette, style direction, and outfit
          board built from your Sun, Venus, and Rising.
        </p>
        <Link
          href="/app"
          className="mt-2 rounded-full bg-ink px-8.5 py-4.5 text-sm font-semibold tracking-[.04em] text-ivory"
        >
          Find My Palette
        </Link>
        <p className="mt-1.5 font-serif text-[13px] text-taupe italic">
          Astrology-inspired guidance — not a substitute for personal color analysis.
        </p>

        <div className="mt-9 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="rounded-2xl bg-ivory p-7 text-left">
              <span className="text-[11px] font-semibold tracking-[.14em] text-brushed-gold">
                {step.n}
              </span>
              <h3 className="mt-2.5 mb-1.5 font-serif text-lg font-medium text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-espresso">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shareable results preview */}
      <section className="flex w-full flex-col items-center gap-7">
        <span className="text-[11px] font-semibold tracking-[.18em] text-mushroom uppercase">
          Shareable results
        </span>
        <StyleBoardCard result={MOCK_RESULT} />
        <PalettePosterCard result={MOCK_RESULT} />
      </section>
    </div>
  );
}
