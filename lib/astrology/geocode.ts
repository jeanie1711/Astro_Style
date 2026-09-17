export type GeocodeResult = {
  latitude: number;
  longitude: number;
  displayName: string;
};

/**
 * Resolves a free-text birthplace ("City, Country") to coordinates using
 * OpenStreetMap's Nominatim (free, no API key). Server-side only — Nominatim's
 * usage policy requires a descriptive User-Agent and caps at ~1 req/sec, so
 * this must not be called directly from the browser.
 */
export async function geocodePlace(place: string): Promise<GeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", place);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");

  const res = await fetch(url, {
    headers: {
      "User-Agent": "AstroStyleApp/0.1 (birth-chart color/style prototype)",
      "Accept-Language": "en",
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding request failed (${res.status})`);
  }

  const results = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;

  if (results.length === 0) return null;

  const [first] = results;
  return {
    latitude: parseFloat(first.lat),
    longitude: parseFloat(first.lon),
    displayName: first.display_name,
  };
}
