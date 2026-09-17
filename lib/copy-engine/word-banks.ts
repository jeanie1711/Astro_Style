import type { ColorAttributes } from "@/lib/interpretation/types";
import type { StyleAttributes } from "@/lib/interpretation/types";

type Pole = { pos: string; neg: string };

export const COLOR_ESSENCE_WORDS: Record<keyof ColorAttributes, Pole> = {
  depth: { pos: "Deep", neg: "Light" },
  temperature: { pos: "Warm", neg: "Cool" },
  saturation: { pos: "Vivid", neg: "Muted" },
  contrast: { pos: "Bold", neg: "Soft" },
  energy: { pos: "Dynamic", neg: "Grounded" },
};

export const STYLE_ESSENCE_WORDS: Record<keyof StyleAttributes, Pole> = {
  decorative: { pos: "Ornate", neg: "Minimal" },
  fluid: { pos: "Fluid", neg: "Structured" },
  experimental: { pos: "Daring", neg: "Timeless" },
  casual: { pos: "Easy", neg: "Refined" },
  sensual: { pos: "Sensual", neg: "Reserved" },
  glamorous: { pos: "Glamorous", neg: "Natural" },
  trendDriven: { pos: "Current", neg: "Enduring" },
};

export const COLOR_STATEMENT_FRAGMENTS: Record<keyof ColorAttributes, Pole> = {
  depth: { pos: "Deeply intense", neg: "Effortlessly light" },
  temperature: { pos: "Warmly inviting", neg: "Coolly composed" },
  saturation: { pos: "Vividly alive", neg: "Softly muted" },
  contrast: { pos: "Boldly defined", neg: "Gently blended" },
  energy: { pos: "Restlessly dynamic", neg: "Calmly grounded" },
};

export const STYLE_STATEMENT_FRAGMENTS: Record<keyof StyleAttributes, Pole> = {
  decorative: { pos: "Richly layered", neg: "Purely minimal" },
  fluid: { pos: "Fluid and free", neg: "Precisely structured" },
  experimental: { pos: "Playfully daring", neg: "Classically timeless" },
  casual: { pos: "Easy-going", neg: "Quietly refined" },
  sensual: { pos: "Quietly sensual", neg: "Thoughtfully reserved" },
  glamorous: { pos: "Subtly glamorous", neg: "Naturally understated" },
  trendDriven: { pos: "Ahead of the curve", neg: "Built to last" },
};
