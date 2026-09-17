/** Color dimensions (product_brief.md §7 core dimensions), each roughly -1..+1. */
export type ColorAttributes = {
  depth: number; // light (-1) .. deep (+1)
  temperature: number; // cool (-1) .. warm (+1)
  saturation: number; // muted (-1) .. clear (+1)
  contrast: number; // soft (-1) .. high-contrast (+1)
  energy: number; // grounded (-1) .. dynamic (+1)
};

/** Style dimensions (product_brief.md §11 possible style dimensions), each roughly -1..+1. */
export type StyleAttributes = {
  decorative: number; // minimal (-1) .. decorative (+1)
  fluid: number; // structured (-1) .. fluid (+1)
  experimental: number; // classic (-1) .. experimental (+1)
  casual: number; // refined (-1) .. casual (+1)
  sensual: number; // reserved (-1) .. sensual (+1)
  glamorous: number; // natural (-1) .. glamorous (+1)
  trendDriven: number; // timeless (-1) .. trend-driven (+1)
};
