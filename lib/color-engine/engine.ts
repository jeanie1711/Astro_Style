import { hslToHex } from "./hsl";
import { nameForHsl } from "./naming";
import type { ColorAttributes } from "@/lib/interpretation/types";
import type { GeneratedPalette } from "./types";
import type { SwatchColor } from "@/lib/style-data";

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

const FLOOR_L = 8;
const CEILING_L = 92;

/**
 * Scales an offset toward whatever headroom is actually available between
 * `l0` and the floor/ceiling, instead of letting `l0 + offset` clip at the
 * boundary. Fixes the Approach B bug where a high-depth chart (l0 near the
 * floor) sent several offsets to the same clamped floor value, producing
 * near-duplicate near-black colors. Preserves sign/order — still darker for
 * negative offsets — just compresses the magnitude when room is tight.
 */
function scaleOffsetToHeadroom(l0: number, offset: number, maxMagnitude: number): number {
  const room = offset < 0 ? l0 - FLOOR_L : CEILING_L - l0;
  const scale = Math.min(1, room / maxMagnitude);
  return offset * scale;
}

/**
 * Headroom keeps an offset from clipping, but a very deep chart (l0 far
 * below 50) still had a "+30" offset jump most of the way back up to
 * mid-lightness — plenty of literal room, but it broke the palette's own
 * mood (one bright outlier in an otherwise deep, moody set). Offsets that
 * pull *against* the chart's own lean (lighter for a dark-leaning l0, or
 * darker for a light-leaning one) get additionally damped by how extreme
 * that lean is; offsets that reinforce the lean are untouched.
 */
function moodConsistentOffset(l0: number, offset: number, maxMagnitude: number): number {
  const headroomScaled = scaleOffsetToHeadroom(l0, offset, maxMagnitude);
  const leansDark = l0 < 50;
  const againstTheGrain = leansDark ? headroomScaled > 0 : headroomScaled < 0;
  if (!againstTheGrain) return headroomScaled;
  const extremity = Math.abs(l0 - 50) / 50;
  return headroomScaled * (1 - extremity * 0.5);
}

/**
 * Saturation naturally has to taper near L=0/100 to stay in-gamut (this is
 * why LCH/HSLuv behave this way) — plain HSL doesn't enforce that, so a
 * pale, highly-saturated chip can read as an unnaturally "neon" outlier
 * next to darker, less saturated neighbors. Taper saturation up to 40% as L
 * approaches either extreme.
 */
function perceptualSaturation(s: number, l: number): number {
  const extremity = clamp(Math.abs(l - 50) / 50, 0, 1);
  return s * (1 - extremity * 0.4);
}

function swatch(h: number, s: number, l: number): SwatchColor {
  const sAdjusted = perceptualSaturation(s, l);
  const sClamped = clamp(sAdjusted, 4, 96);
  const lClamped = clamp(l, 6, 94);
  const hex = hslToHex({ h, s: sClamped, l: lClamped });
  return { name: nameForHsl(h, sClamped, lClamped), hex };
}

/**
 * The Color Engine (product_brief.md §21C): generates a palette directly in
 * HSL from the Interpretation Engine's attribute vector, using color-harmony
 * rules so hue relationships between colors are guaranteed by construction.
 * Chosen over a curated-database nearest-match after an A/B comparison —
 * this approach stays continuously faithful to the exact chart (no
 * quantizing to a fixed color list), at the cost of needing this tuning:
 * headroom-adaptive lightness offsets (no near-duplicate colors at extreme
 * depth), mood-consistent damping (no outlier swatch jumping back toward
 * mid-lightness against the chart's own dark/light lean), and perceptual
 * saturation tapering (no "neon" outlier right at extreme lightness).
 */
export function generatePalette(target: ColorAttributes): GeneratedPalette {
  const seedHue = 30 - target.temperature * 180;

  const avgIntensity = (target.energy + target.contrast) / 2;
  const hues =
    avgIntensity > 0.15
      ? [seedHue, seedHue + 120, seedHue + 240]
      : avgIntensity < -0.15
        ? [seedHue - 25, seedHue, seedHue + 25]
        : [seedHue, seedHue + 180];

  const l0 = clamp(50 - target.depth * 32, 8, 92);
  const s0 = clamp(38 + target.saturation * 35, 5, 95);

  const signatureOffsets = [30, 16, 4, -8, -20, -30];
  const signature: SwatchColor[] = [
    swatch(hues[0], 10, 12),
    swatch(hues[0], 8, 90),
    ...signatureOffsets.map((offset, i) =>
      swatch(
        hues[i % hues.length] + ((i * 7) % 15) - 7,
        s0 + (i % 2 ? -6 : 6),
        l0 + moodConsistentOffset(l0, offset, 30)
      )
    ),
  ];

  const base: SwatchColor[] = [
    swatch(hues[0], s0 - 20, l0 + moodConsistentOffset(l0, 22, 30)),
    swatch(hues[0] + 10, s0 - 15, l0 + moodConsistentOffset(l0, 2, 30)),
    swatch(hues[hues.length - 1], s0 - 5, l0 + moodConsistentOffset(l0, -28, 30)),
  ];

  const statement: SwatchColor[] = [0, 1, 2].map((i) =>
    swatch(
      hues[i % hues.length] + Math.floor(i / hues.length) * 40 + 5,
      s0 + 25,
      l0 + moodConsistentOffset(l0, -18, 30)
    )
  );

  const accentHueBase = seedHue + 150;
  const accents: SwatchColor[] = [0, 1, 2, 3].map((i) =>
    swatch(accentHueBase + i * 40, 55 + target.saturation * 20, 70 + target.energy * 10)
  );

  return { signature, base, statement, accents };
}
