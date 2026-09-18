import type { SwatchColor } from "@/lib/style-data";

export type ArchetypeForPrompt = {
  name: string;
  tags: string;
  desc: string;
  silhouettes: string;
  fabrics: string;
  jewelry: string;
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
 * Takes the archetype's own silhouette/fabric/jewelry (lens-biased), not
 * the person's single overall Style Direction — reusing the same text for
 * all 4 archetypes made every generated outfit look like the same dress
 * regardless of occasion (found via real image-gen testing).
 *
 * `allColors` must cover every category (signature/base/statement/accents)
 * an archetype's swatches can draw from — a lookup against signature colors
 * alone silently fell back to raw hex strings for base/accent swatches.
 */
export function buildOutfitPrompt(archetype: ArchetypeForPrompt, allColors: SwatchColor[]): string {
  const colorNames = archetype.swatches.map((hex) => hexToName(hex, allColors)).join(", ");

  return [
    `Full-body fashion editorial photograph of a woman wearing a "${archetype.name}" outfit.`,
    `Style mood: ${archetype.tags.toLowerCase()}. ${archetype.desc}`,
    `Silhouette: ${archetype.silhouettes}.`,
    `Fabric: ${archetype.fabrics}.`,
    `Jewelry: ${archetype.jewelry}.`,
    `Color palette: ${colorNames}.`,
    `Editorial fashion photography, soft studio lighting, neutral seamless background, high-fashion magazine quality, full body shot, sharp focus, vertical portrait orientation, 4:5 aspect ratio.`,
  ].join(" ");
}
