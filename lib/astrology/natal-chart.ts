import * as Astronomy from "astronomy-engine";
import { longitudeToZodiac, normalizeDegrees, type ZodiacPosition } from "./zodiac";

export type NatalChart = {
  sun: ZodiacPosition;
  venus: ZodiacPosition;
  rising: ZodiacPosition;
};

/**
 * Computes tropical (Western) Sun, Venus, and Ascendant/Rising positions for
 * a given UTC instant and birth location. This is the Astrology Engine from
 * product_brief.md §21A — it only produces raw chart placements. Turning
 * these into color/style attributes is the separate Interpretation + Color
 * Engine (§21B/C), not implemented here.
 */
export function computeNatalChart(utcDate: Date, latitude: number, longitude: number): NatalChart {
  const time = Astronomy.MakeTime(utcDate);

  // Sun: apparent geocentric ecliptic-of-date longitude.
  const sunLon = Astronomy.SunPosition(time).elon;

  // Venus: geocentric J2000 equatorial vector (light-time + aberration corrected),
  // converted to true ecliptic-of-date longitude.
  const venusVector = Astronomy.GeoVector(Astronomy.Body.Venus, time, true);
  const venusLon = Astronomy.Ecliptic(venusVector).elon;

  // Ascendant: the ecliptic longitude rising on the eastern horizon.
  // RAMC = local sidereal time, in degrees.
  const gastHours = Astronomy.SiderealTime(time);
  const ramc = normalizeDegrees(gastHours * 15 + longitude);

  // True obliquity of the ecliptic at this date (matches the ecliptic-of-date
  // frame used above for Sun/Venus).
  const obliquity = Astronomy.e_tilt(time).tobl;

  const rad = Math.PI / 180;
  const ramcRad = ramc * rad;
  const oblRad = obliquity * rad;
  const latRad = latitude * rad;

  // Standard Ascendant formula (Meeus): the ecliptic/horizon intersection
  // point on the eastern horizon, derived from the ecliptic-plane and
  // horizon-plane normals. Verified against the equatorial (φ=0, ε=0) case
  // where it reduces to RAMC + 90°.
  const ascRad = Math.atan2(
    Math.cos(ramcRad),
    -(Math.sin(oblRad) * Math.tan(latRad) + Math.cos(oblRad) * Math.sin(ramcRad))
  );
  const ascendantLon = normalizeDegrees(ascRad / rad);

  return {
    sun: longitudeToZodiac(sunLon),
    venus: longitudeToZodiac(venusLon),
    rising: longitudeToZodiac(ascendantLon),
  };
}

export function formatProfileLine(chart: NatalChart): string {
  return `${chart.sun.sign} Sun · ${chart.venus.sign} Venus · ${chart.rising.sign} Rising`;
}
