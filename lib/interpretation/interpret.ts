import type { NatalChart } from "@/lib/astrology/natal-chart";
import type { ZodiacSign } from "@/lib/astrology/zodiac";
import { elementOf, modalityOf } from "./elements";
import { COLOR_BY_ELEMENT, COLOR_BY_MODALITY } from "./color-coefficients";
import { STYLE_BY_ELEMENT, STYLE_BY_MODALITY } from "./style-coefficients";
import type { ColorAttributes, StyleAttributes } from "./types";

function signColorAttributes(sign: ZodiacSign): ColorAttributes {
  const e = COLOR_BY_ELEMENT[elementOf(sign)];
  const m = COLOR_BY_MODALITY[modalityOf(sign)];
  return {
    depth: e.depth + m.depth,
    temperature: e.temperature + m.temperature,
    saturation: e.saturation + m.saturation,
    contrast: e.contrast + m.contrast,
    energy: e.energy + m.energy,
  };
}

function signStyleAttributes(sign: ZodiacSign): StyleAttributes {
  const e = STYLE_BY_ELEMENT[elementOf(sign)];
  const m = STYLE_BY_MODALITY[modalityOf(sign)];
  return {
    decorative: e.decorative + m.decorative,
    fluid: e.fluid + m.fluid,
    experimental: e.experimental + m.experimental,
    casual: e.casual + m.casual,
    sensual: e.sensual + m.sensual,
    glamorous: e.glamorous + m.glamorous,
    trendDriven: e.trendDriven + m.trendDriven,
  };
}

function blend<T extends Record<string, number>>(a: T, b: T, c: T, weights: [number, number, number]): T {
  const [wa, wb, wc] = weights;
  const result = {} as T;
  for (const key of Object.keys(a) as Array<keyof T>) {
    result[key] = (a[key] * wa + b[key] * wb + c[key] * wc) as T[keyof T];
  }
  return result;
}

// product_brief.md §8: Venus leads color (taste/aesthetics), Rising leads
// style (outward presentation) — the two weight sets differ on purpose, one
// more reason color and style won't just mirror each other.
const COLOR_WEIGHTS: [number, number, number] = [0.25, 0.4, 0.35]; // sun, venus, rising
const STYLE_WEIGHTS: [number, number, number] = [0.25, 0.35, 0.4]; // sun, venus, rising

export function interpretColorAttributes(chart: NatalChart): ColorAttributes {
  return blend(
    signColorAttributes(chart.sun.sign),
    signColorAttributes(chart.venus.sign),
    signColorAttributes(chart.rising.sign),
    COLOR_WEIGHTS
  );
}

export function interpretStyleAttributes(chart: NatalChart): StyleAttributes {
  return blend(
    signStyleAttributes(chart.sun.sign),
    signStyleAttributes(chart.venus.sign),
    signStyleAttributes(chart.rising.sign),
    STYLE_WEIGHTS
  );
}
