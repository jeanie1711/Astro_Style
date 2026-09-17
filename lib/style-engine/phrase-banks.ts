import type { StyleAttributes } from "@/lib/interpretation/types";

type Pole = { pos: string; neg: string };
type Dim = keyof StyleAttributes;

export const TAG_WORDS: Record<Dim, Pole> = {
  decorative: { pos: "Decorative", neg: "Minimal" },
  fluid: { pos: "Fluid", neg: "Structured" },
  experimental: { pos: "Experimental", neg: "Classic" },
  casual: { pos: "Casual", neg: "Refined" },
  sensual: { pos: "Sensual", neg: "Reserved" },
  glamorous: { pos: "Glamorous", neg: "Natural" },
  trendDriven: { pos: "Trend-Forward", neg: "Timeless" },
};

export const DESC_TEMPLATES: Record<Dim, Pole> = {
  decorative: { pos: "Layered with detail that rewards a closer look.", neg: "Pared back to exactly what's needed, nothing more." },
  fluid: { pos: "Cut to move — soft, unstructured, alive.", neg: "Held by its own structure — precise and intentional." },
  experimental: { pos: "Unafraid of an unexpected proportion.", neg: "Anchored in shapes that never go out of style." },
  casual: { pos: "Easy enough for a Tuesday, considered enough to notice.", neg: "Polished by default, never off-duty." },
  sensual: { pos: "Cut close enough to feel, not just see.", neg: "Confident in what it doesn't reveal." },
  glamorous: { pos: "A little shine, worn like it's nothing.", neg: "Beauty that skips the polish entirely." },
  trendDriven: { pos: "Reads the room before everyone else does.", neg: "Built to still make sense in ten years." },
};

export const SILHOUETTE_HINTS: Partial<Record<Dim, Pole>> = {
  fluid: { pos: "fluid draping", neg: "structured tailoring" },
  decorative: { pos: "voluminous layering", neg: "clean, spare lines" },
  experimental: { pos: "asymmetric proportions", neg: "timeless silhouettes" },
  sensual: { pos: "body-conscious cuts", neg: "covered, relaxed shapes" },
};

export const FABRIC_HINTS: Partial<Record<Dim, Pole>> = {
  casual: { pos: "washed cotton, denim", neg: "fine wool, silk" },
  glamorous: { pos: "satin, velvet sheen", neg: "raw, matte textures" },
  fluid: { pos: "liquid jersey, silk", neg: "crisp poplin, structured crepe" },
};

export const JEWELRY_HINTS: Partial<Record<Dim, Pole>> = {
  decorative: { pos: "stacked, layered pieces", neg: "a single quiet piece" },
  glamorous: { pos: "statement metals and stones", neg: "raw stone, hammered texture" },
  sensual: { pos: "delicate chains at the skin", neg: "structured, substantial pieces" },
};

export function topDims(vector: StyleAttributes, keys: Dim[], n: number, exclude?: Set<Dim>): Dim[] {
  const pool = exclude ? keys.filter((k) => !exclude.has(k)) : keys;
  const ranked = [...(pool.length > 0 ? pool : keys)].sort(
    (a, b) => Math.abs(vector[b]) - Math.abs(vector[a])
  );
  return ranked.slice(0, n);
}

export function poleWord(bank: Record<Dim, Pole> | Partial<Record<Dim, Pole>>, dim: Dim, value: number): string {
  const pole = bank[dim];
  if (!pole) return "";
  return value >= 0 ? pole.pos : pole.neg;
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
