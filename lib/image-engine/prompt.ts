import type { SwatchColor, StyleDirectionRow } from "@/lib/style-data";

export type ArchetypeForPrompt = {
  name: string;
  tags: string;
  desc: string;
  swatches: string[]; // hex values
};

function hexToName(hex: string, allColors: SwatchColor[]): string {
  return allColors.find((c) => c.hex.toLowerCase() === hex.toLowerCase())?.name ?? hex;
}

/**
 * Builds a text-to-image prompt for one outfit card from the actual
 * computed result (product_brief.md §21E: "generated from structured data
 * rather than free-form text"), not hand-written per archetype.
 *
 * `allColors` must cover every category (signature/base/statement/accents)
 * an archetype's swatches can draw from — a lookup against signature colors
 * alone silently fell back to raw hex strings for base/accent swatches.
 */
export function buildOutfitPrompt(
  archetype: ArchetypeForPrompt,
  styleDirection: StyleDirectionRow[],
  allColors: SwatchColor[]
): string {
  const silhouettes = styleDirection.find((r) => r.label === "SILHOUETTES")?.value ?? "";
  const fabrics = styleDirection.find((r) => r.label === "FABRICS")?.value ?? "";
  const jewelry = styleDirection.find((r) => r.label === "JEWELRY")?.value ?? "";

  const colorNames = archetype.swatches.map((hex) => hexToName(hex, allColors)).join(", ");

  return [
    `Full-body fashion editorial photograph of a woman wearing a "${archetype.name}" outfit.`,
    `Style mood: ${archetype.tags.toLowerCase()}. ${archetype.desc}`,
    `Silhouette: ${silhouettes}.`,
    `Fabric: ${fabrics}.`,
    `Jewelry: ${jewelry}.`,
    `Color palette: ${colorNames}.`,
    `Editorial fashion photography, soft studio lighting, neutral seamless background, high-fashion magazine quality, full body shot, sharp focus.`,
  ].join(" ");
}
