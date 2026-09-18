// Static mock of what the Astrology + Color + Style engines (product_brief.md §21 A-D)
// will eventually compute from real birth data. Shape is designed so the real
// engines can slot in later without changing any screen component.

export type SwatchColor = {
  name: string;
  hex: string;
  meaning?: string;
};

export type Archetype = {
  id: string;
  name: string;
  tags: string;
  desc: string;
  imageLabel: string;
  swatches: string[];
  locked: boolean;
  // Present once a real chart is computed — the Style Engine's per-lens
  // silhouette/fabric/jewelry, used to build that archetype's image prompt.
  silhouettes?: string;
  fabrics?: string;
  jewelry?: string;
};

export type PlacementExplanation = {
  label: string;
  color: string;
  text: string;
};

export type StyleDirectionRow = {
  label: string;
  value: string;
};

export type StyleResult = {
  profileLine: string; // "Scorpio Sun · Sagittarius Venus · Taurus Rising"
  essenceWords: string[]; // ["Deep.", "Polished.", "Fresh."]
  styleStatement: string; // "Quietly sensual. Polished. Free-spirited."
  signaturePalette: SwatchColor[];
  baseColors: SwatchColor[];
  statementColors: SwatchColor[];
  freshAccents: SwatchColor[];
  metals: SwatchColor[];
  whyTheseColors: PlacementExplanation[];
  styleDirection: StyleDirectionRow[];
  archetypes: Archetype[];
};

export const MOCK_RESULT: StyleResult = {
  profileLine: "Scorpio Sun · Sagittarius Venus · Taurus Rising",
  essenceWords: ["Deep.", "Polished.", "Fresh."],
  styleStatement: "Quietly sensual. Polished. Free-spirited.",

  signaturePalette: [
    { name: "Deep Black", hex: "#171717", meaning: "Grounding intensity, quiet power" },
    { name: "Charcoal", hex: "#36363A", meaning: "A refined edge without harshness" },
    { name: "Espresso Brown", hex: "#4B342B", meaning: "Earthy warmth, tactile luxury" },
    { name: "Soft Ivory", hex: "#F6F1E8", meaning: "A clean, confident foundation" },
    { name: "Taupe Beige", hex: "#B8A899", meaning: "Natural refinement" },
    { name: "Oxblood", hex: "#5C1F28", meaning: "Sensual depth, magnetic pull" },
    { name: "Deep Emerald", hex: "#0F5C4D", meaning: "Rich mystery, understated bold" },
    { name: "Cobalt Blue", hex: "#2457D6", meaning: "A spark of free-spirited energy" },
  ],
  baseColors: [
    { name: "Warm Cream", hex: "#EFE4D2" },
    { name: "Mushroom Taupe", hex: "#9A8C82" },
    { name: "Midnight Navy", hex: "#1E2C46" },
  ],
  statementColors: [
    { name: "Burgundy Wine", hex: "#6E2436" },
    { name: "Plum Noir", hex: "#5B3A57" },
    { name: "Petrol Teal", hex: "#1F5A63" },
  ],
  freshAccents: [
    { name: "Sky Blue", hex: "#AFCBEF" },
    { name: "Soft Coral", hex: "#E56B5D" },
    { name: "Clear Sage", hex: "#A9BFA8" },
    { name: "Dustless Blush", hex: "#E9CFCB" },
  ],
  metals: [
    { name: "Champagne Gold", hex: "#D6B36A" },
    { name: "Brushed Gold", hex: "#C6A15B" },
    { name: "Soft Silver", hex: "#C9CCD3" },
  ],

  whyTheseColors: [
    {
      label: "SCORPIO SUN",
      color: "#5C1F28",
      text: "Adds depth, contrast, and a sensual, magnetic intensity — pulling your palette toward darker statement colors.",
    },
    {
      label: "TAURUS RISING",
      color: "#0F5C4D",
      text: "Brings refinement, natural luxury and rich, tactile neutrals — quality over trend.",
    },
    {
      label: "SAGITTARIUS VENUS",
      color: "#2457D6",
      text: "Introduces freshness, clearer color and freer, less rigid accents.",
    },
  ],

  styleDirection: [
    { label: "SILHOUETTES", value: "Fluid tailoring, wide leg, cowl neck" },
    { label: "FABRICS", value: "Silk, wool crepe, brushed cotton" },
    { label: "JEWELRY", value: "Fine gold, minimal layering" },
    { label: "CONTRAST", value: "Medium–high, deliberate" },
  ],

  archetypes: [
    {
      id: "modern-chic",
      name: "Modern Chic",
      tags: "Confident · Refined · Timeless",
      desc: "A polished everyday look that feels effortless and powerful.",
      imageLabel: "outfit photo — modern chic",
      swatches: ["#171717", "#36363A", "#4B342B", "#F6F1E8", "#B8A899"],
      locked: false,
    },
    {
      id: "effortless-explorer",
      name: "Effortless Explorer",
      tags: "Free-Spirited · Modern · Versatile",
      desc: "Relaxed and ready for whatever the day (or next destination) brings.",
      imageLabel: "outfit photo — effortless explorer",
      swatches: ["#F6F1E8", "#9A8C82", "#4B342B", "#0F5C4D", "#EFE4D2"],
      locked: false,
    },
    {
      id: "evening-allure",
      name: "Evening Allure",
      tags: "Sultry · Elegant · Unforgettable",
      desc: "For nights out, or whenever you want to feel magnetic.",
      imageLabel: "outfit photo — evening allure",
      swatches: ["#5C1F28", "#171717", "#36363A", "#F6F1E8", "#D6B36A"],
      locked: true,
    },
    {
      id: "smart-casual",
      name: "Smart Casual",
      tags: "Youthful · Creative · Put-Together",
      desc: "Easy and versatile — work, coffee dates, or weekend wandering.",
      imageLabel: "outfit photo — smart casual",
      swatches: ["#E9CFCB", "#AFCBEF", "#F6F1E8", "#B8A899", "#9A8C82"],
      locked: true,
    },
  ],
};

export type BirthDetails = {
  date: string;
  time: string;
  place: string;
};

export const EMPTY_BIRTH_DETAILS: BirthDetails = { date: "", time: "", place: "" };
