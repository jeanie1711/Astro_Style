import type { SwatchColor } from "@/lib/style-data";

export type GeneratedPalette = {
  signature: SwatchColor[];
  base: SwatchColor[];
  statement: SwatchColor[];
  accents: SwatchColor[];
};
