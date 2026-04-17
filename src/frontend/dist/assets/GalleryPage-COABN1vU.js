import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, G as GallerySkeleton, E as ErrorState, a as EmptyState } from "./index-BCi01w1u.js";
import { I as Input, A as AnimatePresence, C as CharacterCard } from "./input-DJuH5nDy.js";
import { u as useCharacters, a as useTraits, m as motion, P as PERSONALITY_EMOJIS, B as Badge, b as PERSONALITY_LABELS } from "./useCharacters-BH-xoOrb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const PERSONALITY_FILTERS = [
  { value: "all", label: "All" },
  {
    value: "playful",
    label: `${PERSONALITY_EMOJIS.playful} Playful`
  },
  {
    value: "adventurous",
    label: `${PERSONALITY_EMOJIS.adventurous} Adventurous`
  },
  {
    value: "mysterious",
    label: `${PERSONALITY_EMOJIS.mysterious} Mysterious`
  },
  {
    value: "creative",
    label: `${PERSONALITY_EMOJIS.creative} Creative`
  },
  {
    value: "analytical",
    label: `${PERSONALITY_EMOJIS.analytical} Analytical`
  },
  {
    value: "empathetic",
    label: `${PERSONALITY_EMOJIS.empathetic} Empathetic`
  },
  {
    value: "introverted",
    label: `${PERSONALITY_EMOJIS.introverted} Introverted`
  },
  {
    value: "extroverted",
    label: `${PERSONALITY_EMOJIS.extroverted} Extroverted`
  }
];
function readUrlParams() {
  const sp = new URLSearchParams(window.location.search);
  return {
    q: sp.get("q") ?? "",
    personality: sp.get("personality") ?? "",
    trait: sp.get("trait") ?? ""
  };
}
function syncUrl(q, personality, trait) {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (personality && personality !== "all") sp.set("personality", personality);
  if (trait) sp.set("trait", trait);
  const search = sp.toString();
  const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
  window.history.replaceState(null, "", url);
}
function useGalleryFilters() {
  const init = readUrlParams();
  const [localSearch, setLocalSearch] = reactExports.useState(init.q);
  const [localPersonality, setLocalPersonality] = reactExports.useState(init.personality || "all");
  const [localTrait, setLocalTrait] = reactExports.useState(init.trait);
  const setSearch = reactExports.useCallback(
    (val) => {
      setLocalSearch(val);
      syncUrl(val, localPersonality, localTrait);
    },
    [localPersonality, localTrait]
  );
  const setPersonality = reactExports.useCallback(
    (val) => {
      setLocalPersonality(val);
      syncUrl(localSearch, val, localTrait);
    },
    [localSearch, localTrait]
  );
  const setTrait = reactExports.useCallback(
    (val) => {
      const next = localTrait === val ? "" : val;
      setLocalTrait(next);
      syncUrl(localSearch, localPersonality, next);
    },
    [localSearch, localPersonality, localTrait]
  );
  const clearAll = reactExports.useCallback(() => {
    setLocalSearch("");
    setLocalPersonality("all");
    setLocalTrait("");
    syncUrl("", "all", "");
  }, []);
  const hasFilters = localSearch !== "" || localPersonality !== "all" || localTrait !== "";
  return {
    search: localSearch,
    personality: localPersonality,
    trait: localTrait,
    setSearch,
    setPersonality,
    setTrait,
    clearAll,
    hasFilters
  };
}
function GalleryPage() {
  const navigate = useNavigate();
  const {
    search,
    personality,
    trait,
    setSearch,
    setPersonality,
    setTrait,
    clearAll,
    hasFilters
  } = useGalleryFilters();
  const deferredSearch = reactExports.useDeferredValue(search);
  const filter = reactExports.useMemo(
    () => ({
      searchQuery: deferredSearch || void 0,
      personalityType: personality !== "all" ? personality : void 0,
      trait: trait || void 0
    }),
    [deferredSearch, personality, trait]
  );
  const {
    data: characters,
    isLoading,
    isError,
    refetch
  } = useCharacters(filter);
  const { data: allTraits } = useTraits();
  const [showAllTraits, setShowAllTraits] = reactExports.useState(false);
  const visibleTraits = reactExports.useMemo(() => {
    if (!allTraits) return [];
    return showAllTraits ? allTraits : allTraits.slice(0, 12);
  }, [allTraits, showAllTraits]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-to-b from-muted/60 to-background pt-10 pb-8 px-4 sm:px-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45 },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-3 py-1 text-xs font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✨" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Character Studio" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "hero-title", children: [
              "Explore a Universe",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "of AI Characters" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed max-w-md", children: "Discover and interact with a vibrant collection of AI personas — from playful adventurers to mysterious sages." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "btn-primary",
                onClick: () => navigate({ to: "/create" }),
                "data-ocid": "hero.create_button",
                children: "Create Your Character"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "hidden lg:block",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-characters.dim_1200x500.jpg",
              alt: "AI Characters showcase",
              className: "rounded-2xl shadow-elevated w-full object-cover max-h-60",
              loading: "eager"
            }
          )
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-8 px-4 sm:px-6",
        "data-ocid": "gallery.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center",
              "data-ocid": "gallery.filter_bar",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Search by name or keyword…",
                      className: "pl-9 pr-9 rounded-full border-input bg-card",
                      value: search,
                      onChange: (e) => setSearch(e.target.value),
                      "data-ocid": "gallery.search_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "button",
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.8 },
                      transition: { duration: 0.15 },
                      onClick: () => setSearch(""),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Clear search",
                      "data-ocid": "gallery.clear_search_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    initial: { opacity: 0, x: 8 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 8 },
                    transition: { duration: 0.2 },
                    onClick: clearAll,
                    className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1.5 transition-smooth hover:border-primary/40",
                    "data-ocid": "gallery.clear_filters_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                      "Clear filters"
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 flex-wrap",
                "data-ocid": "gallery.personality_filters",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mr-1" }),
                  PERSONALITY_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPersonality(f.value),
                      "data-ocid": `gallery.personality.${f.value}`,
                      className: "transition-smooth",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: personality === f.value ? "default" : "outline",
                          className: "cursor-pointer text-xs py-1 px-3 hover:bg-primary/10 transition-smooth rounded-full",
                          children: f.label
                        }
                      )
                    },
                    f.value
                  ))
                ]
              }
            ),
            visibleTraits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 flex-wrap",
                "data-ocid": "gallery.trait_filters",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs text-muted-foreground w-5 flex-shrink-0",
                      "aria-hidden": true
                    }
                  ),
                  visibleTraits.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTrait(t),
                      "data-ocid": `gallery.trait.${t.toLowerCase().replace(/\s+/g, "-")}`,
                      className: "transition-smooth",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: trait === t ? "secondary" : "outline",
                          className: `cursor-pointer text-[11px] py-0.5 px-2.5 transition-smooth rounded-full ${trait === t ? "bg-accent/20 text-accent-foreground border-accent/40" : "hover:bg-accent/10 hover:border-accent/30"}`,
                          children: t
                        }
                      )
                    },
                    t
                  )),
                  allTraits && allTraits.length > 12 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowAllTraits((prev) => !prev),
                      className: "text-[11px] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline",
                      "data-ocid": "gallery.show_more_traits_button",
                      children: showAllTraits ? "Show fewer" : `+${allTraits.length - 12} more`
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.2 },
              className: "flex items-center gap-2 text-xs text-muted-foreground",
              "data-ocid": "gallery.active_filters",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Filtering by:" }),
                search && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium", children: [
                  '"',
                  search,
                  '"',
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSearch(""),
                      "aria-label": "Remove search filter",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
                    }
                  )
                ] }),
                personality !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium", children: [
                  PERSONALITY_LABELS[personality],
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPersonality("all"),
                      "aria-label": "Remove personality filter",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
                    }
                  )
                ] }),
                trait && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 bg-accent/15 text-accent-foreground rounded-full px-2 py-0.5 font-medium", children: [
                  trait,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTrait(trait),
                      "aria-label": "Remove trait filter",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
                    }
                  )
                ] })
              ]
            }
          ) }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySkeleton, { count: 10 }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => refetch() }) : !characters || characters.length === 0 ? hasFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: "🔍",
              title: "No characters match",
              description: "Try adjusting your search or filters to discover more characters."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onCreateClick: () => navigate({ to: "/create" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
              "data-ocid": "gallery.list",
              children: characters.map((character, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CharacterCard,
                {
                  character,
                  index,
                  onClick: () => navigate({
                    to: "/character/$id",
                    params: { id: character.id.toString() }
                  })
                },
                character.id.toString()
              ))
            }
          ),
          !isLoading && !isError && characters && characters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
            characters.length,
            " character",
            characters.length !== 1 ? "s" : "",
            " ",
            "found"
          ] })
        ] })
      }
    )
  ] });
}
export {
  GalleryPage
};
