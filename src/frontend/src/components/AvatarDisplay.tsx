import { AvatarStyle } from "../types/character";

const AVATAR_GRADIENTS: Record<string, string> = {
  [AvatarStyle.anime]: "from-purple-400 to-violet-500",
  [AvatarStyle.realistic]: "from-blue-400 to-cyan-500",
  [AvatarStyle.illustrated]: "from-emerald-400 to-teal-500",
  [AvatarStyle.pixelArt]: "from-orange-400 to-amber-500",
  [AvatarStyle.watercolor]: "from-pink-400 to-rose-500",
};

const AVATAR_PATTERNS: Record<string, string> = {
  [AvatarStyle.anime]: "⭐",
  [AvatarStyle.realistic]: "👤",
  [AvatarStyle.illustrated]: "🎨",
  [AvatarStyle.pixelArt]: "🕹️",
  [AvatarStyle.watercolor]: "🌸",
};

interface AvatarDisplayProps {
  name: string;
  avatarStyle: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "w-10 h-10 text-sm",
  md: "w-16 h-16 text-xl",
  lg: "w-24 h-24 text-3xl",
  xl: "w-32 h-32 text-4xl",
};

export function AvatarDisplay({
  name,
  avatarStyle,
  size = "md",
  className = "",
}: AvatarDisplayProps) {
  const gradient =
    AVATAR_GRADIENTS[avatarStyle] ?? "from-muted to-muted-foreground/20";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={`bg-gradient-to-br ${gradient} ${SIZE_CLASSES[size]} rounded-2xl flex items-center justify-center font-display font-bold text-white shadow-inner select-none flex-shrink-0 ${className}`}
      aria-label={`${name} avatar`}
    >
      {initials || AVATAR_PATTERNS[avatarStyle] || "?"}
    </div>
  );
}
