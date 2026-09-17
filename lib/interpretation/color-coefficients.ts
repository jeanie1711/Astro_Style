import type { ColorAttributes } from "./types";
import type { Element, Modality } from "./elements";

// Hand-authored for color specifically — deliberately not derived from the
// style coefficients, so a person's palette and their outfit silhouettes can
// diverge instead of mechanically mirroring each other.
export const COLOR_BY_ELEMENT: Record<Element, ColorAttributes> = {
  Fire: { depth: -0.1, temperature: 0.8, saturation: 0.5, contrast: 0.3, energy: 0.6 },
  Earth: { depth: 0.5, temperature: 0.3, saturation: -0.4, contrast: -0.2, energy: -0.6 },
  Air: { depth: -0.6, temperature: -0.3, saturation: 0.2, contrast: 0.4, energy: 0.3 },
  Water: { depth: 0.7, temperature: -0.5, saturation: -0.2, contrast: 0.5, energy: -0.5 },
};

export const COLOR_BY_MODALITY: Record<Modality, ColorAttributes> = {
  Cardinal: { depth: 0, temperature: 0.1, saturation: 0.1, contrast: 0.4, energy: 0.3 },
  Fixed: { depth: 0.2, temperature: 0, saturation: -0.1, contrast: 0.2, energy: -0.1 },
  Mutable: { depth: -0.2, temperature: 0, saturation: 0.3, contrast: -0.1, energy: 0.2 },
};
