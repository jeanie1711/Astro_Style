import type { ZodiacSign } from "@/lib/astrology/zodiac";

export type Element = "Fire" | "Earth" | "Air" | "Water";
export type Modality = "Cardinal" | "Fixed" | "Mutable";

const ELEMENT_BY_SIGN: Record<ZodiacSign, Element> = {
  Aries: "Fire",
  Leo: "Fire",
  Sagittarius: "Fire",
  Taurus: "Earth",
  Virgo: "Earth",
  Capricorn: "Earth",
  Gemini: "Air",
  Libra: "Air",
  Aquarius: "Air",
  Cancer: "Water",
  Scorpio: "Water",
  Pisces: "Water",
};

const MODALITY_BY_SIGN: Record<ZodiacSign, Modality> = {
  Aries: "Cardinal",
  Cancer: "Cardinal",
  Libra: "Cardinal",
  Capricorn: "Cardinal",
  Taurus: "Fixed",
  Leo: "Fixed",
  Scorpio: "Fixed",
  Aquarius: "Fixed",
  Gemini: "Mutable",
  Virgo: "Mutable",
  Sagittarius: "Mutable",
  Pisces: "Mutable",
};

export function elementOf(sign: ZodiacSign): Element {
  return ELEMENT_BY_SIGN[sign];
}

export function modalityOf(sign: ZodiacSign): Modality {
  return MODALITY_BY_SIGN[sign];
}
