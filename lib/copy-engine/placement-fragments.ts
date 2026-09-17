import type { Element, Modality } from "@/lib/interpretation/elements";

export type Role = "sun" | "venus" | "rising";

/** What the element contributes to color/mood character. */
export const ELEMENT_FRAGMENT: Record<Element, string> = {
  Fire: "warmth, vivid energy, and bold clarity",
  Earth: "richness, tactile depth, and grounded neutrals",
  Air: "lightness, crisp contrast, and airy freshness",
  Water: "depth, cool intensity, and a quiet, magnetic pull",
};

/** What the modality contributes to how that character is carried. */
export const MODALITY_FRAGMENT: Record<Modality, string> = {
  Cardinal: "with bold, decisive edges",
  Fixed: "with steady, enduring presence",
  Mutable: "with fluid, adaptable ease",
};

export const ROLE_LEAD: Record<Role, string> = {
  sun: "adds",
  venus: "brings",
  rising: "introduces",
};

/** Distinguishes placements that happen to share a sign (same element+modality). */
export const ROLE_EMPHASIS: Record<Role, string> = {
  sun: "at the core of who you are",
  venus: "in what you're drawn to and love to wear",
  rising: "in how the world first reads you",
};

export const ROLE_NAME: Record<Role, string> = {
  sun: "Sun",
  venus: "Venus",
  rising: "Rising",
};
