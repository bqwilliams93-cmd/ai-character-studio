import { useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import {
  EmptyState,
  ErrorState,
  GallerySkeleton,
} from "../components/LoadingSkeleton";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { useCharacters, useTraits } from "../hooks/useCharacters";
import { PERSONALITY_EMOJIS, PERSONALITY_LABELS } from "../types/character";
import type { PersonalityType } from "../types/character";

// Personality filter options
const PERSONALITY_FILTERS: Array<{
  value: PersonalityType | "all";
  label: string;
}> = [
  { value: "all", label: "All" },
  {
    value: "playful" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.playful} Playful`,
  },
  {
    value: "adventurous" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.adventurous} Adventurous`,
  },
  {
    value: "mysterious" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.mysterious} Mysterious`,
  },
  {
    value: "creative" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.creative} Creative`,
  },
  {
    value: "analytical" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.analytical} Analytical`,
  },
  {
    value: "empathetic" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.empathetic} Empathetic`,
  },
  {
    value: "introverted" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.introverted} Introverted`,
  },
  {
    value: "extroverted" as PersonalityType,
    label: `${PERSONALITY_EMOJIS.extroverted} Extroverted`,
  },
];

/** Read initial filter values from the URL search string */
function readUrlParams(): { q: string; personality: string; trait: string } {
  const sp = new URLSearchParams(window.location.search);
  return {
    q: sp.get("q") ?? "",
    personality: sp.get("personality") ?? "",
    trait: sp.get("trait") ?? "",
  };
}

/** Persist filter state to URL without navigating (history.replaceState) */
function syncUrl(q: string, personality: string, trait: string) {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (personality && personality !== "all") sp.set("personality", personality);
  if (trait) sp.set("trait", trait);
  const search = sp.toString();
  const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
  window.history.replaceState(null, "", url);
}

// Manage filter state locally and sync to URL search params
function useGalleryFilters() {
  const init = readUrlParams();

  const [localSearch, setLocalSearch] = useState<string>(init.q);
  const [localPersonality, setLocalPersonality] = useState<
    PersonalityType | "all"
  >((init.personality as PersonalityType) || "all");
  const [localTrait, setLocalTrait] = useState<string>(init.trait);

  const setSearch = useCallback(
    (val: string) => {
      setLocalSearch(val);
      syncUrl(val, localPersonality, localTrait);
    },
    [localPersonality, localTrait],
  );

  const setPersonality = useCallback(
    (val: PersonalityType | "all") => {
      setLocalPersonality(val);
      syncUrl(localSearch, val, localTrait);
    },
    [localSearch, localTrait],
  );

  const setTrait = useCallback(
    (val: string) => {
      const next = localTrait === val ? "" : val;
      setLocalTrait(next);
      syncUrl(localSearch, localPersonality, next);
    },
    [localSearch, localPersonality, localTrait],
  );

  const clearAll = useCallback(() => {
    setLocalSearch("");
    setLocalPersonality("all");
    setLocalTrait("");
    syncUrl("", "all", "");
  }, []);

  const hasFilters =
    localSearch !== "" || localPersonality !== "all" || localTrait !== "";

  return {
    search: localSearch,
    personality: localPersonality,
    trait: localTrait,
    setSearch,
    setPersonality,
    setTrait,
    clearAll,
    hasFilters,
  };
}

export function GalleryPage() {
  const navigate = useNavigate();
  const {
    search,
    personality,
    trait,
    setSearch,
    setPersonality,
    setTrait,
    clearAll,
    hasFilters,
  } = useGalleryFilters();

  // Debounce search for the query to avoid hammering actor
  const deferredSearch = useDeferredValue(search);

  const filter = useMemo(
    () => ({
      searchQuery: deferredSearch || undefined,
      personalityType: personality !== "all" ? personality : undefined,
      trait: trait || undefined,
    }),
    [deferredSearch, personality, trait],
  );

  const {
    data: characters,
    isLoading,
    isError,
    refetch,
  } = useCharacters(filter);
  const { data: allTraits } = useTraits();

  // Show up to 12 trait chips; show more button if needed
  const [showAllTraits, setShowAllTraits] = useState(false);
  const visibleTraits = useMemo(() => {
    if (!allTraits) return [];
    return showAllTraits ? allTraits : allTraits.slice(0, 12);
  }, [allTraits, showAllTraits]);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-muted/60 to-background pt-10 pb-8 px-4 sm:px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                <span>✨</span>
                <span>AI Character Studio</span>
              </div>
              <h1 className="hero-title">
                Explore a Universe{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  of AI Characters
                </span>
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                Discover and interact with a vibrant collection of AI personas —
                from playful adventurers to mysterious sages.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate({ to: "/create" })}
                data-ocid="hero.create_button"
              >
                Create Your Character
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:block"
            >
              <img
                src="/assets/generated/hero-characters.dim_1200x500.jpg"
                alt="AI Characters showcase"
                className="rounded-2xl shadow-elevated w-full object-cover max-h-60"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section
        className="bg-background py-8 px-4 sm:px-6"
        data-ocid="gallery.section"
      >
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Search bar row */}
          <div
            className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
            data-ocid="gallery.filter_bar"
          >
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by name or keyword…"
                className="pl-9 pr-9 rounded-full border-input bg-card"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="gallery.search_input"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                    data-ocid="gallery.clear_search_button"
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Clear all filters button */}
            <AnimatePresence>
              {hasFilters && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1.5 transition-smooth hover:border-primary/40"
                  data-ocid="gallery.clear_filters_button"
                >
                  <X className="w-3 h-3" />
                  Clear filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Personality filter chips */}
          <div className="space-y-2">
            <div
              className="flex items-center gap-1.5 flex-wrap"
              data-ocid="gallery.personality_filters"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mr-1" />
              {PERSONALITY_FILTERS.map((f) => (
                <button
                  type="button"
                  key={f.value}
                  onClick={() => setPersonality(f.value)}
                  data-ocid={`gallery.personality.${f.value}`}
                  className="transition-smooth"
                >
                  <Badge
                    variant={personality === f.value ? "default" : "outline"}
                    className="cursor-pointer text-xs py-1 px-3 hover:bg-primary/10 transition-smooth rounded-full"
                  >
                    {f.label}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Trait filter chips */}
            {visibleTraits.length > 0 && (
              <div
                className="flex items-center gap-1.5 flex-wrap"
                data-ocid="gallery.trait_filters"
              >
                <span
                  className="text-xs text-muted-foreground w-5 flex-shrink-0"
                  aria-hidden
                />
                {visibleTraits.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTrait(t)}
                    data-ocid={`gallery.trait.${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="transition-smooth"
                  >
                    <Badge
                      variant={trait === t ? "secondary" : "outline"}
                      className={`cursor-pointer text-[11px] py-0.5 px-2.5 transition-smooth rounded-full ${
                        trait === t
                          ? "bg-accent/20 text-accent-foreground border-accent/40"
                          : "hover:bg-accent/10 hover:border-accent/30"
                      }`}
                    >
                      {t}
                    </Badge>
                  </button>
                ))}
                {allTraits && allTraits.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTraits((prev) => !prev)}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                    data-ocid="gallery.show_more_traits_button"
                  >
                    {showAllTraits
                      ? "Show fewer"
                      : `+${allTraits.length - 12} more`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active filter summary */}
          <AnimatePresence>
            {hasFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
                data-ocid="gallery.active_filters"
              >
                <span>Filtering by:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">
                    "{search}"
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Remove search filter"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {personality !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">
                    {PERSONALITY_LABELS[personality]}
                    <button
                      type="button"
                      onClick={() => setPersonality("all")}
                      aria-label="Remove personality filter"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {trait && (
                  <span className="inline-flex items-center gap-1 bg-accent/15 text-accent-foreground rounded-full px-2 py-0.5 font-medium">
                    {trait}
                    <button
                      type="button"
                      onClick={() => setTrait(trait)}
                      aria-label="Remove trait filter"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          {isLoading ? (
            <GallerySkeleton count={10} />
          ) : isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : !characters || characters.length === 0 ? (
            hasFilters ? (
              <EmptyState
                icon="🔍"
                title="No characters match"
                description="Try adjusting your search or filters to discover more characters."
              />
            ) : (
              <EmptyState onCreateClick={() => navigate({ to: "/create" })} />
            )
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              data-ocid="gallery.list"
            >
              {characters.map((character, index) => (
                <CharacterCard
                  key={character.id.toString()}
                  character={character}
                  index={index}
                  onClick={() =>
                    navigate({
                      to: "/character/$id",
                      params: { id: character.id.toString() },
                    })
                  }
                />
              ))}
            </motion.div>
          )}

          {/* Result count */}
          {!isLoading && !isError && characters && characters.length > 0 && (
            <p className="text-xs text-muted-foreground text-right">
              {characters.length} character{characters.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
