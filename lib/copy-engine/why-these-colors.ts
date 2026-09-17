import type { NatalChart } from "@/lib/astrology/natal-chart";
import { elementOf, modalityOf } from "@/lib/interpretation/elements";
import type { ZodiacPosition } from "@/lib/astrology/zodiac";
import type { SwatchColor, PlacementExplanation } from "@/lib/style-data";
import { ELEMENT_FRAGMENT, MODALITY_FRAGMENT, ROLE_LEAD, ROLE_EMPHASIS, ROLE_NAME, type Role } from "./placement-fragments";

function explainPlacement(position: ZodiacPosition, role: Role, accentColor: string): PlacementExplanation {
  const element = elementOf(position.sign);
  const modality = modalityOf(position.sign);
  const text = `Your ${position.sign} ${ROLE_NAME[role]} ${ROLE_LEAD[role]} ${ELEMENT_FRAGMENT[element]} ${MODALITY_FRAGMENT[modality]} — ${ROLE_EMPHASIS[role]}.`;

  return {
    label: `${position.sign.toUpperCase()} ${ROLE_NAME[role].toUpperCase()}`,
    color: accentColor,
    text,
  };
}

/**
 * Generates the "Why These Colors" explanation cards straight from the same
 * element+modality lookup the Interpretation Engine uses — 7 fragments
 * (4 elements + 3 modalities) cover all 12 signs, instead of hand-writing
 * text for 36 sign x role combinations.
 */
export function generateWhyTheseColors(chart: NatalChart, signaturePalette: SwatchColor[]): PlacementExplanation[] {
  // Indices 0/1 are the palette's near-black/near-ivory anchors (color-engine's
  // engine.ts) — as label accent colors they'd be visually indistinguishable
  // from the card's own near-black text. Indices 3-5 are the moderate-offset
  // "colored" entries, reliably chromatic regardless of how deep or light the
  // overall chart is.
  const accent = (i: number) => signaturePalette[i % signaturePalette.length]?.hex ?? "#171717";
  return [
    explainPlacement(chart.sun, "sun", accent(3)),
    explainPlacement(chart.rising, "rising", accent(4)),
    explainPlacement(chart.venus, "venus", accent(5)),
  ];
}
