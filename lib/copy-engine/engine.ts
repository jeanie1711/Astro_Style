import type { ColorAttributes, StyleAttributes } from "@/lib/interpretation/types";
import {
  COLOR_ESSENCE_WORDS,
  STYLE_ESSENCE_WORDS,
  COLOR_STATEMENT_FRAGMENTS,
  STYLE_STATEMENT_FRAGMENTS,
} from "./word-banks";

type Entry = { value: number; essenceWord: string; statementFragment: string };

/**
 * The Copy/Essence Engine: the only layer that reads both the Color and
 * Style attribute vectors together (12 dimensions total) to produce the
 * whole-person headline — essence words (screen 3's first reveal) and the
 * style statement (screen 6's italic line). Everything else in Color/Style
 * Engine only sees its own 5 or 7 dimensions.
 */
export function generateEssence(
  color: ColorAttributes,
  style: StyleAttributes
): { essenceWords: string[]; styleStatement: string } {
  const entries: Entry[] = [
    ...(Object.keys(color) as Array<keyof ColorAttributes>).map((dim) => {
      const value = color[dim];
      const pole = value >= 0 ? "pos" : "neg";
      return {
        value,
        essenceWord: COLOR_ESSENCE_WORDS[dim][pole],
        statementFragment: COLOR_STATEMENT_FRAGMENTS[dim][pole],
      };
    }),
    ...(Object.keys(style) as Array<keyof StyleAttributes>).map((dim) => {
      const value = style[dim];
      const pole = value >= 0 ? "pos" : "neg";
      return {
        value,
        essenceWord: STYLE_ESSENCE_WORDS[dim][pole],
        statementFragment: STYLE_STATEMENT_FRAGMENTS[dim][pole],
      };
    }),
  ];

  const top3 = [...entries].sort((a, b) => Math.abs(b.value) - Math.abs(a.value)).slice(0, 3);

  return {
    essenceWords: top3.map((e) => `${e.essenceWord}.`),
    styleStatement: top3.map((e) => `${e.statementFragment}.`).join(" "),
  };
}
