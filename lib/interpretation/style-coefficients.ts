import type { StyleAttributes } from "./types";
import type { Element, Modality } from "./elements";

// Hand-authored for style specifically — deliberately not derived from the
// color coefficients (see color-coefficients.ts), so two people who share a
// color mood can still land on different silhouettes, and vice versa.
export const STYLE_BY_ELEMENT: Record<Element, StyleAttributes> = {
  Fire: {
    decorative: 0.3,
    fluid: -0.3,
    experimental: 0.6,
    casual: -0.1,
    sensual: 0.2,
    glamorous: 0.4,
    trendDriven: 0.3,
  },
  Earth: {
    decorative: -0.4,
    fluid: -0.2,
    experimental: -0.5,
    casual: 0.3,
    sensual: -0.1,
    glamorous: -0.5,
    trendDriven: -0.6,
  },
  Air: {
    decorative: 0.3,
    fluid: 0.1,
    experimental: 0.3,
    casual: 0.2,
    sensual: -0.3,
    glamorous: 0,
    trendDriven: 0.4,
  },
  Water: {
    decorative: 0.1,
    fluid: 0.7,
    experimental: 0,
    casual: -0.2,
    sensual: 0.6,
    glamorous: 0.3,
    trendDriven: -0.1,
  },
};

export const STYLE_BY_MODALITY: Record<Modality, StyleAttributes> = {
  Cardinal: {
    decorative: 0.2,
    fluid: -0.3,
    experimental: 0.3,
    casual: -0.3,
    sensual: 0.1,
    glamorous: 0.2,
    trendDriven: 0.1,
  },
  Fixed: {
    decorative: 0,
    fluid: -0.1,
    experimental: -0.3,
    casual: -0.2,
    sensual: 0.2,
    glamorous: 0.1,
    trendDriven: -0.5,
  },
  Mutable: {
    decorative: 0.1,
    fluid: 0.4,
    experimental: 0.2,
    casual: 0.3,
    sensual: -0.1,
    glamorous: -0.1,
    trendDriven: 0.2,
  },
};
