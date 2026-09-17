export type StyleDirectionText = {
  silhouettes: string;
  fabrics: string;
  jewelry: string;
  contrast: string;
};

export type GeneratedArchetype = {
  name: string;
  tags: string;
  desc: string;
};

export type GeneratedStyleBoard = {
  direction: StyleDirectionText;
  archetypes: GeneratedArchetype[];
};
