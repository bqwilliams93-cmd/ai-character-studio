import { motion } from "motion/react";
import {
  AVATAR_STYLE_COLORS,
  AVATAR_STYLE_LABELS,
  PERSONALITY_EMOJIS,
  PERSONALITY_LABELS,
} from "../types/character";
import type { Character } from "../types/character";
import { AvatarDisplay } from "./AvatarDisplay";
import { Badge } from "./ui/badge";

interface CharacterCardProps {
  character: Character;
  index?: number;
  onClick?: () => void;
}

export function CharacterCard({
  character,
  index = 0,
  onClick,
}: CharacterCardProps) {
  const styleColors = AVATAR_STYLE_COLORS[character.avatarStyle] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
  };
  const personalityEmoji =
    PERSONALITY_EMOJIS[character.personalityType] ?? "✨";
  const personalityLabel =
    PERSONALITY_LABELS[character.personalityType] ?? character.personalityType;
  const styleLabel =
    AVATAR_STYLE_LABELS[character.avatarStyle] ?? character.avatarStyle;
  const displayTraits = character.traits.slice(0, 3);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="character-card cursor-pointer group text-left w-full"
      onClick={onClick}
      data-ocid={`character.item.${index + 1}`}
      aria-label={`View ${character.name} details`}
    >
      {/* Avatar section */}
      <div className="relative p-5 pb-3 flex flex-col items-center gap-3">
        <div className="absolute inset-x-0 top-0 h-20 rounded-t-lg bg-gradient-to-b from-muted/60 to-transparent" />
        <AvatarDisplay
          name={character.name}
          avatarStyle={character.avatarStyle}
          size="lg"
          className="relative z-10 shadow-elevated group-hover:shadow-xl transition-smooth"
        />
        <div className="relative z-10 text-center min-w-0 w-full">
          <h3 className="font-display font-bold text-base leading-tight text-foreground truncate">
            {character.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {character.personalityDescription}
          </p>
        </div>
      </div>

      {/* Meta section */}
      <div className="px-4 pb-4 space-y-2">
        {/* Personality */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
            <span>{personalityEmoji}</span>
            <span>{personalityLabel}</span>
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styleColors.bg} ${styleColors.text} ${styleColors.border}`}
          >
            {styleLabel}
          </span>
        </div>

        {/* Trait tags */}
        {displayTraits.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {displayTraits.map((trait) => (
              <Badge
                key={trait}
                variant="secondary"
                className="text-[10px] px-2 py-0 h-5 rounded-full font-medium"
              >
                {trait}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}
