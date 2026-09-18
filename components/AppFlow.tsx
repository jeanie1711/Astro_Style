"use client";

import { useRef, useState } from "react";
import type { ImageState } from "@/lib/image-engine/types";
import { EMPTY_BIRTH_DETAILS, MOCK_RESULT, type BirthDetails as BirthDetailsData, type StyleResult } from "@/lib/style-data";
import { formatProfileLine, type NatalChart } from "@/lib/astrology/natal-chart";
import { interpretColorAttributes, interpretStyleAttributes } from "@/lib/interpretation/interpret";
import { generatePalette } from "@/lib/color-engine/engine";
import { recommendMetals } from "@/lib/color-engine/metals";
import { generateStyleBoard } from "@/lib/style-engine/engine";
import { generateEssence } from "@/lib/copy-engine/engine";
import { generateWhyTheseColors } from "@/lib/copy-engine/why-these-colors";
import Landing from "@/components/screens/Landing";
import BirthDetails from "@/components/screens/BirthDetails";
import Calculating from "@/components/screens/Calculating";
import EssenceReveal from "@/components/screens/EssenceReveal";
import SignaturePalette from "@/components/screens/SignaturePalette";
import WhyTheseColors from "@/components/screens/WhyTheseColors";
import StyleDirection from "@/components/screens/StyleDirection";
import OutfitBoard from "@/components/screens/OutfitBoard";
import Paywall from "@/components/screens/Paywall";
import SaveShare from "@/components/screens/SaveShare";

const SCREEN_COUNT = 10;

export default function AppFlow() {
  const [screen, setScreen] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [birthDetails, setBirthDetails] = useState<BirthDetailsData>(EMPTY_BIRTH_DETAILS);
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  // Lives here, not inside OutfitBoard, so it survives OutfitBoard
  // unmounting when the user goes to the Paywall and back — otherwise
  // returning from an unlock re-triggered (and re-billed) generation for
  // cards that had already finished.
  const [outfitImages, setOutfitImages] = useState<Record<string, ImageState>>({});
  const startedOutfitIds = useRef(new Set<string>());

  const goTo = (n: number) => setScreen(Math.max(0, Math.min(SCREEN_COUNT - 1, n)));

  // Real Astrology + Interpretation + Color + Style + Copy/Essence engines
  // feed every piece of the result once a chart is computed.
  const profileLine = natalChart ? formatProfileLine(natalChart) : MOCK_RESULT.profileLine;

  const result: StyleResult = (() => {
    if (!natalChart) return MOCK_RESULT;
    const colorAttributes = interpretColorAttributes(natalChart);
    const styleAttributes = interpretStyleAttributes(natalChart);
    const palette = generatePalette(colorAttributes);
    const board = generateStyleBoard(styleAttributes, colorAttributes.contrast);
    const essence = generateEssence(colorAttributes, styleAttributes);
    const metals = recommendMetals(colorAttributes);
    const metalNames = metals.map((m) => m.name.toLowerCase()).join(" or ");

    return {
      ...MOCK_RESULT,
      essenceWords: essence.essenceWords,
      styleStatement: essence.styleStatement,
      whyTheseColors: generateWhyTheseColors(natalChart, palette.signature),
      signaturePalette: palette.signature,
      baseColors: palette.base,
      statementColors: palette.statement,
      freshAccents: palette.accents,
      metals,
      styleDirection: [
        { label: "SILHOUETTES", value: board.direction.silhouettes },
        { label: "FABRICS", value: board.direction.fabrics },
        { label: "JEWELRY", value: `${board.direction.jewelry} — in ${metalNames}` },
        { label: "CONTRAST", value: board.direction.contrast },
      ],
      archetypes: MOCK_RESULT.archetypes.map((a, i) => ({
        ...a,
        tags: board.archetypes[i].tags,
        desc: board.archetypes[i].desc,
        silhouettes: board.archetypes[i].silhouettes,
        fabrics: board.archetypes[i].fabrics,
        jewelry: board.archetypes[i].jewelry,
        swatches: [
          palette.signature[i % palette.signature.length].hex,
          palette.signature[(i + 2) % palette.signature.length].hex,
          palette.signature[(i + 4) % palette.signature.length].hex,
          palette.base[i % palette.base.length].hex,
          palette.accents[i % palette.accents.length].hex,
        ],
      })),
    };
  })();

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-ivory shadow-xl">
      {screen === 0 && <Landing onNext={() => goTo(1)} />}
      {screen === 1 && (
        <BirthDetails
          onBack={() => goTo(0)}
          onNext={() => {
            setCalcError(null);
            goTo(2);
          }}
          details={birthDetails}
          onChange={setBirthDetails}
          error={calcError}
        />
      )}
      {screen === 2 && (
        <Calculating
          details={birthDetails}
          onSuccess={(chart) => {
            setNatalChart(chart);
            goTo(3);
          }}
          onError={(message) => {
            setCalcError(message);
            goTo(1);
          }}
        />
      )}
      {screen === 3 && (
        <EssenceReveal onBack={() => goTo(1)} onNext={() => goTo(4)} result={result} profileLine={profileLine} />
      )}
      {screen === 4 && <SignaturePalette onBack={() => goTo(3)} onNext={() => goTo(5)} result={result} />}
      {screen === 5 && <WhyTheseColors onBack={() => goTo(4)} onNext={() => goTo(6)} result={result} />}
      {screen === 6 && <StyleDirection onBack={() => goTo(5)} onNext={() => goTo(7)} result={result} />}
      {screen === 7 && (
        <OutfitBoard
          onBack={() => goTo(6)}
          onNext={() => goTo(unlocked ? 9 : 8)}
          result={result}
          unlocked={unlocked}
          images={outfitImages}
          setImages={setOutfitImages}
          startedIds={startedOutfitIds}
        />
      )}
      {screen === 8 && (
        <Paywall
          onBack={() => goTo(7)}
          onUnlock={() => {
            // Back to the board (not straight to Save/Share) so the newly
            // unlocked cards actually mount and generate their images —
            // OutfitBoard's fetch effect only runs while it's mounted, and
            // jumping past it meant the paid-for unlock never showed anything.
            setUnlocked(true);
            goTo(7);
          }}
          onSkip={() => goTo(9)}
        />
      )}
      {screen === 9 && <SaveShare onBack={() => goTo(7)} onRestart={() => goTo(1)} />}
    </div>
  );
}
