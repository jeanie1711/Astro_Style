export type GeocodeResult = {
  latitude: number;
  longitude: number;
  displayName: string;
};

/**
 * Server-side only — Nominatim's usage policy requires a descriptive
 * User-Agent and caps at ~1 req/sec, so this must not be called directly
 * from the browser.
 */
async function nominatimSearch(query: string, limit: number): Promise<GeocodeResult[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url, {
    headers: {
      "User-Agent": "AstroStyleApp/0.1 (birth-chart color/style prototype)",
      "Accept-Language": "en",
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding request failed (${res.status})`);
  }

  const results = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;

  return results.map((r) => ({
    latitude: parseFloat(r.lat),
    longitude: parseFloat(r.lon),
    displayName: r.display_name,
  }));
}

/** Resolves a free-text birthplace ("City, Country") to coordinates — used at chart-calculation time. */
export async function geocodePlace(place: string): Promise<GeocodeResult | null> {
  const [first] = await nominatimSearch(place, 1);
  return first ?? null;
}

/** Returns up to 5 place matches for a partial query — used for the birthplace autocomplete. */
export async function searchPlaces(query: string): Promise<GeocodeResult[]> {
  return nominatimSearch(query, 5);
}
