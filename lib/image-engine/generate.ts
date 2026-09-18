const MODEL = "gemini-3.1-flash-image";

export type GeneratedImage = { dataUrl: string } | { error: string };

/**
 * Calls Gemini's image generation model (product_brief.md §21E). Server-side
 * only — needs GEMINI_API_KEY, which must never reach the browser.
 */
export async function generateOutfitImage(prompt: string): Promise<GeneratedImage> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { error: "GEMINI_API_KEY is not configured." };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return { error: data?.error?.message ?? `Image generation failed (${res.status}).` };
  }

  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: { inlineData?: { data: string; mimeType: string } }) => p.inlineData);

  if (!imagePart) {
    return { error: "No image returned by the model." };
  }

  const { mimeType, data: base64 } = imagePart.inlineData;
  return { dataUrl: `data:${mimeType};base64,${base64}` };
}
