const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof SIGNS)[number];

export type ZodiacPosition = {
  sign: ZodiacSign;
  /** Degrees into the sign, 0-30 */
  degree: number;
  /** Absolute tropical ecliptic longitude, 0-360 */
  longitude: number;
};

/** Normalizes an angle in degrees to the [0, 360) range. */
export function normalizeDegrees(deg: number): number {
  const d = deg % 360;
  return d < 0 ? d + 360 : d;
}

/** Converts a tropical ecliptic longitude (0-360) into a zodiac sign + degree-in-sign. */
export function longitudeToZodiac(longitude: number): ZodiacPosition {
  const lon = normalizeDegrees(longitude);
  const signIndex = Math.floor(lon / 30);
  return {
    sign: SIGNS[signIndex],
    degree: lon - signIndex * 30,
    longitude: lon,
  };
}
