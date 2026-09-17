import { searchPlaces } from "@/lib/astrology/geocode";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) {
    return Response.json({ results: [] });
  }

  try {
    const results = await searchPlaces(query);
    return Response.json({ results });
  } catch {
    return Response.json({ results: [] });
  }
}
