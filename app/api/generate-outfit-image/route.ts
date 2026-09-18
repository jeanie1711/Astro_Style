import { buildOutfitPrompt, type ArchetypeForPrompt } from "@/lib/image-engine/prompt";
import { generateOutfitImage } from "@/lib/image-engine/generate";
import type { SwatchColor } from "@/lib/style-data";

type RequestBody = {
  archetype?: ArchetypeForPrompt;
  allColors?: SwatchColor[];
};

export async function POST(request: Request) {
  const { archetype, allColors } = (await request.json()) as RequestBody;

  if (!archetype || !allColors) {
    return Response.json({ error: "archetype and allColors are required." }, { status: 400 });
  }

  const prompt = buildOutfitPrompt(archetype, allColors);
  const result = await generateOutfitImage(prompt);

  if ("error" in result) {
    return Response.json({ error: result.error, prompt }, { status: 502 });
  }

  return Response.json({ dataUrl: result.dataUrl, prompt });
}
