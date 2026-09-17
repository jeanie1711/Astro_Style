import { geocodePlace } from "@/lib/astrology/geocode";
import { resolveTimezone, toUtcInstant } from "@/lib/astrology/timezone";
import { computeNatalChart } from "@/lib/astrology/natal-chart";

type RequestBody = {
  date?: string; // "YYYY-MM-DD"
  time?: string; // "HH:mm"
  place?: string; // "City, Country"
};

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;
  const { date, time, place } = body;

  if (!date || !time || !place) {
    return Response.json(
      { error: "Date, time, and birthplace are all required." },
      { status: 400 }
    );
  }

  let geocode;
  try {
    geocode = await geocodePlace(place);
  } catch {
    return Response.json(
      { error: "Couldn't look up that birthplace right now. Please try again." },
      { status: 502 }
    );
  }

  if (!geocode) {
    return Response.json(
      { error: `Couldn't find "${place}". Try "City, Country".` },
      { status: 404 }
    );
  }

  const timezone = resolveTimezone(geocode.latitude, geocode.longitude);

  let utcDate;
  try {
    utcDate = toUtcInstant(date, time, timezone);
  } catch {
    return Response.json({ error: "That date/time couldn't be parsed." }, { status: 400 });
  }

  const chart = computeNatalChart(utcDate, geocode.latitude, geocode.longitude);

  return Response.json({
    chart,
    resolved: {
      place: geocode.displayName,
      latitude: geocode.latitude,
      longitude: geocode.longitude,
      timezone,
      utcInstant: utcDate.toISOString(),
    },
  });
}
