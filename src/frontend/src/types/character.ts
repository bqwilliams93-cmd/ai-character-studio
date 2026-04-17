export { AvatarStyle, PersonalityType } from "../backend";
export type {
  Character,
  CharacterFilter,
  CharacterId,
  CreateCharacterRequest,
  Trait,
} from "../backend";

export const AVATAR_STYLE_LABELS: Record<string, string> = {
  anime: "Anime",
  realistic: "Realistic",
  illustrated: "Illustrated",
  pixelArt: "Pixel Art",
  watercolor: "Watercolor",
};

export const AVATAR_STYLE_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  anime: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  realistic: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  illustrated: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  pixelArt: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  watercolor: {
    bg: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-200",
  },
};

export const AVATAR_STYLE_BG: Record<string, string> = {
  anime: "bg-purple-400",
  realistic: "bg-blue-400",
  illustrated: "bg-emerald-400",
  pixelArt: "bg-orange-400",
  watercolor: "bg-pink-400",
};

export const PERSONALITY_LABELS: Record<string, string> = {
  introverted: "Introverted",
  extroverted: "Extroverted",
  analytical: "Analytical",
  creative: "Creative",
  empathetic: "Empathetic",
  adventurous: "Adventurous",
  mysterious: "Mysterious",
  playful: "Playful",
};

export const PERSONALITY_EMOJIS: Record<string, string> = {
  introverted: "🌙",
  extroverted: "☀️",
  analytical: "🔬",
  creative: "🎨",
  empathetic: "💙",
  adventurous: "⚡",
  mysterious: "🔮",
  playful: "✨",
};
