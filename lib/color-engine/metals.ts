import type { ColorAttributes } from "@/lib/interpretation/types";
import type { SwatchColor } from "@/lib/style-data";

const CHAMPAGNE_GOLD: SwatchColor = { name: "Champagne Gold", hex: "#D6B36A" };
const BRUSHED_GOLD: SwatchColor = { name: "Brushed Gold", hex: "#C6A15B" };
const SOFT_SILVER: SwatchColor = { name: "Soft Silver", hex: "#C9CCD3" };

/**
 * product_brief.md §10 "Best Metals" — a small fixed set (gold vs silver
 * undertone), not a generated color, so this is picked from `temperature`
 * rather than run through the Color Engine's HSL formula.
 */
export function recommendMetals(color: ColorAttributes): SwatchColor[] {
  if (color.temperature > 0.15) return [CHAMPAGNE_GOLD, BRUSHED_GOLD];
  if (color.temperature < -0.15) return [SOFT_SILVER];
  return [BRUSHED_GOLD, SOFT_SILVER];
}
