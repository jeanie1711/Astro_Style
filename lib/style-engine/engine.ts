import type { StyleAttributes } from "@/lib/interpretation/types";
import { LENSES, applyLens } from "./lenses";
import { contrastText } from "./contrast-text";
import {
  TAG_WORDS,
  DESC_TEMPLATES,
  SILHOUETTE_HINTS,
  FABRIC_HINTS,
  JEWELRY_HINTS,
  topDims,
  poleWord,
  capitalize,
} from "./phrase-banks";
import type { GeneratedStyleBoard } from "./types";

const ALL_DIMS: Array<keyof StyleAttributes> = [
  "decorative",
  "fluid",
  "experimental",
  "casual",
  "sensual",
  "glamorous",
  "trendDriven",
];

function buildPhrase(vector: StyleAttributes, bank: Partial<Record<keyof StyleAttributes, unknown>>): string {
  const keys = Object.keys(bank) as Array<keyof StyleAttributes>;
  const dims = topDims(vector, keys, 2);
  const words = dims
    .map((d) => poleWord(bank as Record<keyof StyleAttributes, { pos: string; neg: string }>, d, vector[d]))
    .filter(Boolean);
  return capitalize(words.join(", "));
}

/**
 * The leading dim (both the first tag word and the desc) is drawn excluding
 * whatever already led an earlier archetype in this same board. Without
 * this, a chart with one or two very extreme dimensions (e.g. fluid=0.8)
 * had that dimension win "most dominant" for almost every lens, so 3+ of
 * the 4 archetype cards read as near-duplicates. The 2nd/3rd tag words can
 * still repeat across cards — only the headline is forced to vary.
 */
function buildArchetypeText(vector: StyleAttributes, usedLeadDims: Set<keyof StyleAttributes>) {
  const [leadDim] = topDims(vector, ALL_DIMS, 1, usedLeadDims);
  usedLeadDims.add(leadDim);

  const restDims = topDims(vector, ALL_DIMS, 2, new Set([leadDim]));
  const tags = [leadDim, ...restDims].map((d) => poleWord(TAG_WORDS, d, vector[d])).join(" · ");
  const desc = vector[leadDim] >= 0 ? DESC_TEMPLATES[leadDim].pos : DESC_TEMPLATES[leadDim].neg;

  return { tags, desc };
}

/**
 * The Style Engine (product_brief.md §21D): assembles style text directly
 * from the Interpretation Engine's style vector using small phrase banks,
 * instead of nearest-matching a fixed set of pre-written profiles — no
 * database to run out of, continuously responsive to the exact chart, the
 * same rationale that won the Color Engine's A/B test. Needed one fix after
 * testing: the 4 occasion lenses blend toward a target vector (not just an
 * additive nudge) and the archetype loop forces the leading descriptor to
 * vary card-to-card, so an extreme chart doesn't produce near-duplicate
 * archetypes.
 */
export function generateStyleBoard(style: StyleAttributes, colorContrast: number): GeneratedStyleBoard {
  const direction = {
    silhouettes: buildPhrase(style, SILHOUETTE_HINTS),
    fabrics: buildPhrase(style, FABRIC_HINTS),
    jewelry: buildPhrase(style, JEWELRY_HINTS),
    contrast: contrastText(colorContrast),
  };

  const usedLeadDims = new Set<keyof StyleAttributes>();
  const archetypes = LENSES.map((lens) => {
    const biased = applyLens(style, lens);
    const { tags, desc } = buildArchetypeText(biased, usedLeadDims);
    return {
      name: lens.name,
      tags,
      desc,
      // Per-lens, not the overall `direction` above — otherwise every
      // archetype's image prompt shared the same silhouette/fabric/jewelry
      // text and all 4 generated as near-identical outfits regardless of
      // occasion (found via real image-gen testing).
      silhouettes: buildPhrase(biased, SILHOUETTE_HINTS),
      fabrics: buildPhrase(biased, FABRIC_HINTS),
      jewelry: buildPhrase(biased, JEWELRY_HINTS),
    };
  });

  return { direction, archetypes };
}
