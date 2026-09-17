const HUE_FAMILIES: Array<{ max: number; name: string }> = [
  { max: 30, name: "Red" },
  { max: 60, name: "Amber" },
  { max: 90, name: "Gold" },
  { max: 120, name: "Olive" },
  { max: 150, name: "Emerald" },
  { max: 180, name: "Jade" },
  { max: 210, name: "Teal" },
  { max: 240, name: "Azure" },
  { max: 270, name: "Indigo" },
  { max: 300, name: "Violet" },
  { max: 330, name: "Magenta" },
  { max: 360, name: "Rose" },
];

function hueFamily(h: number): string {
  const hue = ((h % 360) + 360) % 360;
  return HUE_FAMILIES.find((f) => hue <= f.max)?.name ?? "Rose";
}

function lightnessWord(l: number): string | null {
  if (l < 20) return "Deep";
  if (l < 35) return "Rich";
  if (l > 85) return "Ghost";
  if (l > 65) return "Pale";
  return null;
}

function saturationWord(s: number): string {
  // A color at ~26% saturation still reads as a clear, recognizable hue, not
  // grayed-out — "Muted"/"Dusty" should be reserved for genuinely low chroma.
  if (s < 12) return "Dusty";
  if (s < 22) return "Muted";
  if (s < 45) return "Soft";
  if (s < 70) return "Clear";
  return "Bold";
}

/** Procedurally names a generated HSL color, e.g. "Deep Rose", "Pale Azure". */
export function nameForHsl(h: number, s: number, l: number): string {
  const modifier = lightnessWord(l) ?? saturationWord(s);
  return `${modifier} ${hueFamily(h)}`;
}
