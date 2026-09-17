import tzlookup from "tz-lookup";
import { DateTime } from "luxon";

/** Resolves the IANA timezone (e.g. "Asia/Ho_Chi_Minh") for a coordinate. */
export function resolveTimezone(latitude: number, longitude: number): string {
  return tzlookup(latitude, longitude);
}

/**
 * Combines a local date ("YYYY-MM-DD"), local time ("HH:mm"), and IANA timezone
 * into the corresponding UTC instant, correctly accounting for the historical
 * DST/offset rules in effect on that date (via the IANA tz database).
 */
export function toUtcInstant(date: string, time: string, timezone: string): Date {
  const dt = DateTime.fromISO(`${date}T${time}`, { zone: timezone });
  if (!dt.isValid) {
    throw new Error(`Invalid date/time/timezone combination: ${dt.invalidReason}`);
  }
  return dt.toUTC().toJSDate();
}
