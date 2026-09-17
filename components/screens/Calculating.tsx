"use client";

import { useEffect } from "react";
import type { BirthDetails } from "@/lib/style-data";
import type { NatalChart } from "@/lib/astrology/natal-chart";

const MIN_DISPLAY_MS = 1800;

type Props = {
  details: BirthDetails;
  onSuccess: (chart: NatalChart) => void;
  onError: (message: string) => void;
};

export default function Calculating({ details, onSuccess, onError }: Props) {
  useEffect(() => {
    let cancelled = false;
    const started = Date.now();

    (async () => {
      try {
        const res = await fetch("/api/natal-chart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        });
        const data = await res.json();

        const elapsed = Date.now() - started;
        if (elapsed < MIN_DISPLAY_MS) {
          await new Promise((r) => setTimeout(r, MIN_DISPLAY_MS - elapsed));
        }
        if (cancelled) return;

        if (!res.ok) {
          onError(data.error ?? "Something went wrong calculating your chart.");
          return;
        }
        onSuccess(data.chart as NatalChart);
      } catch {
        if (!cancelled) onError("Couldn't reach the astrology engine. Check your connection and try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-ink px-9 text-center">
      <div
        className="h-14 w-14 rounded-full border-2 border-espresso"
        style={{
          borderTopColor: "var(--color-gold)",
          animation: "spin-ring 1.1s linear infinite",
        }}
      />
      <p className="font-serif text-[19px] font-medium text-ivory italic">
        Translating your chart into color...
      </p>
      <p className="text-xs tracking-[.06em] text-mushroom">Sun · Venus · Rising</p>
    </div>
  );
}
