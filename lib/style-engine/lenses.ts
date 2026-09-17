import type { StyleAttributes } from "@/lib/interpretation/types";

/**
 * The 4 outfit "slots" are a fixed occasion structure (product_brief.md
 * §12's own pattern: 3-4 style expressions that "stay within the same
 * personalized palette"). Each lens blends the person's own style vector
 * toward a target vector for that occasion.
 *
 * Blending (not a small additive nudge) is deliberate: a chart with an
 * extreme base dimension (e.g. fluid=0.8) swamped a small +/-0.2 nudge, so
 * 3 of 4 archetypes came out with identical dominant-dimension text. A
 * weighted blend guarantees each lens's identity shows up while the base
 * chart still keeps the majority of the vote.
 */
export type Lens = {
  id: string;
  name: string;
  target: StyleAttributes;
};

export const LENSES: Lens[] = [
  {
    id: "modern-chic",
    name: "Modern Chic",
    target: { decorative: -0.3, fluid: -0.4, experimental: -0.3, casual: -0.4, sensual: -0.1, glamorous: 0.1, trendDriven: -0.2 },
  },
  {
    id: "effortless-explorer",
    name: "Effortless Explorer",
    target: { decorative: -0.1, fluid: 0.3, experimental: 0.1, casual: 0.5, sensual: -0.1, glamorous: -0.2, trendDriven: 0.1 },
  },
  {
    id: "evening-allure",
    name: "Evening Allure",
    target: { decorative: 0.3, fluid: 0.4, experimental: 0.1, casual: -0.4, sensual: 0.6, glamorous: 0.6, trendDriven: 0 },
  },
  {
    id: "smart-casual",
    name: "Smart Casual",
    target: { decorative: 0.2, fluid: 0, experimental: 0.2, casual: 0.4, sensual: 0, glamorous: 0.1, trendDriven: 0.3 },
  },
];

const BASE_WEIGHT = 0.45;

export function applyLens(base: StyleAttributes, lens: Lens): StyleAttributes {
  const result = {} as StyleAttributes;
  for (const key of Object.keys(base) as Array<keyof StyleAttributes>) {
    result[key] = base[key] * BASE_WEIGHT + lens.target[key] * (1 - BASE_WEIGHT);
  }
  return result;
}
