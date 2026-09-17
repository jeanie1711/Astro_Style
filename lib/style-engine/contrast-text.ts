/** Shared by both Style Engine approaches — contrast is a Color Engine attribute, not part of the A/B split. */
export function contrastText(colorContrast: number): string {
  if (colorContrast > 0.3) return "High, deliberate";
  if (colorContrast > -0.1) return "Medium, considered";
  return "Soft, blended";
}
