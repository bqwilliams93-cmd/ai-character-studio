import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Sparkles, Tag, User } from "lucide-react";
import { motion } from "motion/react";
import { AvatarDisplay } from "../components/AvatarDisplay";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { useCharacter } from "../hooks/useCharacters";
import {
  AVATAR_STYLE_COLORS,
  AVATAR_STYLE_LABELS,
  PERSONALITY_EMOJIS,
  PERSONALITY_LABELS,
} from "../types/character";

export function CharacterDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/character/$id" });
  const characterId = BigInt(id);
  const { data: character, isLoading, isError } = useCharacter(characterId);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <div className="bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm font-medium group"
            data-ocid="character_detail.back_button"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-smooth" />
            Back to Gallery
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {isLoading ? (
          <CharacterDetailSkeleton />
        ) : isError || !character ? (
          <CharacterErrorState />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Two-column hero ── */}
            <div
              className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
              data-ocid="character_detail.card"
            >
              {/* Decorative header band */}
              <div className="h-24 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 rounded-tl-full scale-150 -translate-x-1/4 -translate-y-1/2 blur-2xl" />
              </div>

              {/* Content grid: pulls avatar up into the decorative band */}
              <div className="px-6 sm:px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-8 -mt-12">
                  {/* ── Left column: Avatar + identity ── */}
                  <div className="flex flex-col items-center md:items-start gap-4 md:w-64 flex-shrink-0">
                    <div className="ring-4 ring-card rounded-2xl shadow-elevated">
                      <AvatarDisplay
                        name={character.name}
                        avatarStyle={character.avatarStyle}
                        size="xl"
                      />
                    </div>

                    {/* Name */}
                    <div className="text-center md:text-left min-w-0 w-full">
                      <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                        {character.name}
                      </h1>

                      {/* Personality type pill */}
                      <div className="mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-semibold">
                          <span aria-hidden="true">
                            {PERSONALITY_EMOJIS[character.personalityType] ??
                              "✨"}
                          </span>
                          {PERSONALITY_LABELS[character.personalityType] ??
                            String(character.personalityType)}
                        </span>

                        {/* Avatar style secondary badge */}
                        {(() => {
                          const s = AVATAR_STYLE_COLORS[
                            character.avatarStyle
                          ] ?? {
                            bg: "bg-muted",
                            text: "text-muted-foreground",
                            border: "border-border",
                          };
                          return (
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}
                              data-ocid="character_detail.avatar_style_badge"
                            >
                              {AVATAR_STYLE_LABELS[character.avatarStyle] ??
                                String(character.avatarStyle)}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Official / created meta */}
                      <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(
                            Number(character.createdAt / BigInt(1_000_000)),
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {character.isPreseeded && (
                          <Badge
                            variant="outline"
                            className="text-[10px] rounded-full"
                          >
                            Official
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Desktop CTA */}
                    <button
                      type="button"
                      className="btn-primary hidden md:inline-flex w-full justify-center mt-2"
                      onClick={() => navigate({ to: "/create" })}
                      data-ocid="character_detail.create_button"
                    >
                      Create Your Own
                    </button>
                  </div>

                  {/* ── Right column: Details ── */}
                  <div className="flex-1 min-w-0 pt-2 space-y-6">
                    {/* About / personality description */}
                    <section data-ocid="character_detail.about_section">
                      <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                        <User className="w-3.5 h-3.5" />
                        About
                      </h2>
                      <p className="text-foreground text-base leading-relaxed">
                        {character.personalityDescription}
                      </p>
                    </section>

                    {/* Background snippet */}
                    {character.backgroundSnippet && (
                      <section data-ocid="character_detail.background_section">
                        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          Background
                        </h2>
                        <blockquote className="relative text-foreground text-sm leading-relaxed italic bg-muted/50 rounded-xl px-5 py-4 border border-border">
                          <span
                            className="absolute left-3 top-2 text-2xl text-primary/30 leading-none select-none"
                            aria-hidden="true"
                          >
                            "
                          </span>
                          <span className="pl-3">
                            {character.backgroundSnippet}
                          </span>
                          <span
                            className="absolute right-3 bottom-1 text-2xl text-primary/30 leading-none select-none"
                            aria-hidden="true"
                          >
                            "
                          </span>
                        </blockquote>
                      </section>
                    )}

                    {/* Traits */}
                    {character.traits.length > 0 && (
                      <section data-ocid="character_detail.traits_section">
                        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                          <Tag className="w-3.5 h-3.5" />
                          Traits
                        </h2>
                        <div
                          className="flex flex-wrap gap-2"
                          data-ocid="character_detail.traits_list"
                        >
                          {character.traits.map((trait, i) => (
                            <Badge
                              key={trait}
                              variant="secondary"
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                              data-ocid={`character_detail.trait.${i + 1}`}
                            >
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 flex justify-center md:hidden">
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate({ to: "/create" })}
                data-ocid="character_detail.create_button_mobile"
              >
                Create Your Own Character
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CharacterDetailSkeleton() {
  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
      data-ocid="character_detail.loading_state"
    >
      {/* Decorative band */}
      <div className="h-24 bg-muted/60" />
      <div className="px-6 sm:px-8 pb-8">
        <div className="flex flex-col md:flex-row gap-8 -mt-12">
          {/* Left skeleton */}
          <div className="flex flex-col items-center md:items-start gap-4 md:w-64 flex-shrink-0">
            <Skeleton className="w-32 h-32 rounded-2xl ring-4 ring-card" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
          </div>
          {/* Right skeleton */}
          <div className="flex-1 pt-4 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacterErrorState() {
  return (
    <div
      className="flex flex-col items-center py-24 gap-5 text-center"
      data-ocid="character_detail.error_state"
    >
      <div className="text-6xl">🔍</div>
      <div className="space-y-1">
        <h2 className="font-display font-semibold text-xl text-foreground">
          Character not found
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          This character may have been removed or the link is incorrect.
        </p>
      </div>
      <Link
        to="/"
        className="btn-primary"
        data-ocid="character_detail.go_back_button"
      >
        Back to Gallery
      </Link>
    </div>
  );
}
