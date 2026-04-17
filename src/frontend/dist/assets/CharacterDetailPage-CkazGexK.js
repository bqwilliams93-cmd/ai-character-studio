import { c as createLucideIcon, u as useNavigate, b as useParams, j as jsxRuntimeExports, S as Sparkles, d as Skeleton, L as Link } from "./index-BCi01w1u.js";
import { c as useCharacter, m as motion, A as AvatarDisplay, b as PERSONALITY_LABELS, P as PERSONALITY_EMOJIS, d as AVATAR_STYLE_COLORS, e as AVATAR_STYLE_LABELS, B as Badge } from "./useCharacters-BH-xoOrb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function CharacterDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/character/$id" });
  const characterId = BigInt(id);
  const { data: character, isLoading, isError } = useCharacter(characterId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/" }),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth text-sm font-medium group",
        "data-ocid": "character_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-0.5 transition-smooth" }),
          "Back to Gallery"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterDetailSkeleton, {}) : isError || !character ? /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterErrorState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border border-border shadow-card overflow-hidden",
              "data-ocid": "character_detail.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/5 rounded-tl-full scale-150 -translate-x-1/4 -translate-y-1/2 blur-2xl" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 sm:px-8 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-8 -mt-12", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center md:items-start gap-4 md:w-64 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ring-4 ring-card rounded-2xl shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AvatarDisplay,
                      {
                        name: character.name,
                        avatarStyle: character.avatarStyle,
                        size: "xl"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-left min-w-0 w-full", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight", children: character.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-semibold", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: PERSONALITY_EMOJIS[character.personalityType] ?? "✨" }),
                          PERSONALITY_LABELS[character.personalityType] ?? String(character.personalityType)
                        ] }),
                        (() => {
                          const s = AVATAR_STYLE_COLORS[character.avatarStyle] ?? {
                            bg: "bg-muted",
                            text: "text-muted-foreground",
                            border: "border-border"
                          };
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-xs font-semibold px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`,
                              "data-ocid": "character_detail.avatar_style_badge",
                              children: AVATAR_STYLE_LABELS[character.avatarStyle] ?? String(character.avatarStyle)
                            }
                          );
                        })()
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                          new Date(
                            Number(character.createdAt / BigInt(1e6))
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })
                        ] }),
                        character.isPreseeded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "text-[10px] rounded-full",
                            children: "Official"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-primary hidden md:inline-flex w-full justify-center mt-2",
                        onClick: () => navigate({ to: "/create" }),
                        "data-ocid": "character_detail.create_button",
                        children: "Create Your Own"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-2 space-y-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "character_detail.about_section", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                        "About"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-base leading-relaxed", children: character.personalityDescription })
                    ] }),
                    character.backgroundSnippet && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "character_detail.background_section", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                        "Background"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "relative text-foreground text-sm leading-relaxed italic bg-muted/50 rounded-xl px-5 py-4 border border-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "absolute left-3 top-2 text-2xl text-primary/30 leading-none select-none",
                            "aria-hidden": "true",
                            children: '"'
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pl-3", children: character.backgroundSnippet }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "absolute right-3 bottom-1 text-2xl text-primary/30 leading-none select-none",
                            "aria-hidden": "true",
                            children: '"'
                          }
                        )
                      ] })
                    ] }),
                    character.traits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "character_detail.traits_section", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
                        "Traits"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex flex-wrap gap-2",
                          "data-ocid": "character_detail.traits_list",
                          children: character.traits.map((trait, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "rounded-full px-3 py-1 text-xs font-semibold",
                              "data-ocid": `character_detail.trait.${i + 1}`,
                              children: trait
                            },
                            trait
                          ))
                        }
                      )
                    ] })
                  ] })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn-primary",
              onClick: () => navigate({ to: "/create" }),
              "data-ocid": "character_detail.create_button_mobile",
              children: "Create Your Own Character"
            }
          ) })
        ]
      }
    ) })
  ] });
}
function CharacterDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl border border-border shadow-card overflow-hidden",
      "data-ocid": "character_detail.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 sm:px-8 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-8 -mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center md:items-start gap-4 md:w-64 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-32 h-32 rounded-2xl ring-4 ring-card" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pt-4 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-14" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
function CharacterErrorState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center py-24 gap-5 text-center",
      "data-ocid": "character_detail.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🔍" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: "Character not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "This character may have been removed or the link is incorrect." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "btn-primary",
            "data-ocid": "character_detail.go_back_button",
            children: "Back to Gallery"
          }
        )
      ]
    }
  );
}
export {
  CharacterDetailPage
};
