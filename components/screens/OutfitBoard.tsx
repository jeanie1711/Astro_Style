"use client";

import { useEffect, useRef, useState } from "react";
import AppTopBar from "@/components/AppTopBar";
import type { StyleResult, SwatchColor } from "@/lib/style-data";

type Props = {
  onBack: () => void;
  onNext: () => void;
  result: StyleResult;
  unlocked: boolean;
};

type ImageState = { status: "idle" | "loading" | "done" | "error"; dataUrl?: string };

export default function OutfitBoard({ onBack, onNext, result, unlocked }: Props) {
  const [images, setImages] = useState<Record<string, ImageState>>({});
  // Tracks which archetype ids have already had a fetch *started*, mutated
  // synchronously (unlike state) so it can't go stale. React 18 StrictMode
  // double-invokes effects in dev, and `result` is rebuilt fresh on every
  // AppFlow render — both re-ran this effect with a stale `images` closure
  // still showing {}, so the `images[a.id] !== undefined` guard alone let a
  // real, billed Gemini call fire twice per card.
  const startedIds = useRef(new Set<string>());

  const allColors: SwatchColor[] = [
    ...result.signaturePalette,
    ...result.baseColors,
    ...result.statementColors,
    ...result.freshAccents,
  ];

  useEffect(() => {
    result.archetypes.forEach((a) => {
      const isLocked = a.locked && !unlocked;
      if (isLocked || startedIds.current.has(a.id) || !a.silhouettes) return;
      startedIds.current.add(a.id);

      setImages((prev) => ({ ...prev, [a.id]: { status: "loading" } }));

      fetch("/api/generate-outfit-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          archetype: {
            name: a.name,
            tags: a.tags,
            desc: a.desc,
            silhouettes: a.silhouettes,
            fabrics: a.fabrics,
            jewelry: a.jewelry,
            swatches: a.swatches,
          },
          allColors,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setImages((prev) => ({
            ...prev,
            [a.id]: data.dataUrl ? { status: "done", dataUrl: data.dataUrl } : { status: "error" },
          }));
        })
        .catch(() => setImages((prev) => ({ ...prev, [a.id]: { status: "error" } })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.archetypes, unlocked]);

  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={8} onBack={onBack} />
      <div className="animate-[fadeUp_0.5s_ease_both] flex flex-col gap-5 overflow-auto px-5.5 pt-1.5 pb-6">
        <h2 className="mt-1.5 font-serif text-2xl font-medium text-ink">Your Style Board</h2>
        {result.archetypes.map((a) => {
          const isLocked = a.locked && !unlocked;
          const image = images[a.id];
          return (
            <div key={a.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[4/5] w-full bg-cream">
                {image?.status === "done" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image.dataUrl} alt={a.imageLabel} className="h-full w-full object-cover" />
                ) : image?.status === "loading" ? (
                  <div className="flex h-full w-full items-center justify-center text-xs text-mushroom">
                    Generating your outfit…
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-mushroom">
                    {image?.status === "error" ? "Couldn't generate this image." : a.imageLabel}
                  </div>
                )}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/55 backdrop-blur-[2px]">
                    <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-ivory/90 text-[15px]">
                      🔒
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-0.5 font-serif text-lg font-medium text-ink">{a.name}</h3>
                <span className="text-[10px] font-semibold tracking-[.1em] text-mushroom uppercase">
                  {a.tags}
                </span>
                <p className="mt-2 mb-2.5 text-[13px] leading-relaxed text-espresso">{a.desc}</p>
                <div className="flex gap-1.5">
                  {a.swatches.map((hex, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 rounded-full border border-black/10"
                      style={{ background: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <button
          onClick={onNext}
          className="mt-0.5 rounded-full bg-ink py-4 text-sm font-semibold text-ivory"
        >
          Unlock Full Board
        </button>
      </div>
    </div>
  );
}
