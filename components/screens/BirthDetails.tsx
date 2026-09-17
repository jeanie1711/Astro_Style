"use client";

import { useEffect, useRef, useState } from "react";
import AppTopBar from "@/components/AppTopBar";
import type { BirthDetails as BirthDetailsData } from "@/lib/style-data";
import type { GeocodeResult } from "@/lib/astrology/geocode";

type Props = {
  onBack: () => void;
  onNext: () => void;
  details: BirthDetailsData;
  onChange: (details: BirthDetailsData) => void;
  error?: string | null;
};

const inputClass =
  "rounded-xl border border-border bg-white px-4 py-3.5 text-[15px] text-ink outline-none focus:border-espresso";
const labelClass = "text-[11px] font-semibold tracking-[.1em] text-mushroom uppercase";

export default function BirthDetails({ onBack, onNext, details, onChange, error }: Props) {
  const canContinue = details.date.trim() && details.time.trim() && details.place.trim();

  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suppressNextSearch, setSuppressNextSearch] = useState(false);

  useEffect(() => {
    if (suppressNextSearch) {
      setSuppressNextSearch(false);
      return;
    }
    const query = details.place.trim();
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/geocode-search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.results ?? []))
        .catch(() => setSuggestions([]));
    }, 350);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details.place]);

  function selectSuggestion(result: GeocodeResult) {
    setSuppressNextSearch(true);
    setShowSuggestions(false);
    setSuggestions([]);
    onChange({ ...details, place: result.displayName });
  }

  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={1} onBack={onBack} />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-col gap-5.5 overflow-auto px-6.5 pt-2 pb-6.5">
        <h2 className="mt-1.5 font-serif text-[26px] font-medium text-ink">When were you born?</h2>
        <p className="text-[13px] leading-relaxed text-espresso">
          Exact time shifts your Rising sign — the placement that shapes your outward style the most.
        </p>
        {error && (
          <p className="rounded-xl bg-oxblood/10 px-4 py-3 text-[13px] leading-relaxed text-oxblood">
            {error}
          </p>
        )}
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Date of birth</span>
          <input
            type="date"
            className={inputClass}
            value={details.date}
            onChange={(e) => onChange({ ...details, date: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Exact birth time</span>
          <input
            type="time"
            className={inputClass}
            value={details.time}
            onChange={(e) => onChange({ ...details, time: e.target.value })}
          />
        </label>
        <label className="relative flex flex-col gap-2">
          <span className={labelClass}>Birthplace</span>
          <input
            type="text"
            placeholder="City, Country"
            className={inputClass}
            value={details.place}
            onChange={(e) => {
              onChange({ ...details, place: e.target.value });
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full z-10 mt-1 flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-lg">
              {suggestions.map((s) => (
                <li key={`${s.latitude},${s.longitude}`}>
                  <button
                    type="button"
                    onMouseDown={() => selectSuggestion(s)}
                    className="w-full px-4 py-3 text-left text-[13px] text-ink hover:bg-cream"
                  >
                    {s.displayName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="mt-1.5 rounded-full bg-ink py-4 text-sm font-semibold text-ivory disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
