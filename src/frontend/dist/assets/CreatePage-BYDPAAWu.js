import { j as jsxRuntimeExports, e as cn, r as reactExports, u as useNavigate, f as ue } from "./index-BCi01w1u.js";
import { S as Slot, f as cva, g as createSlot, h as useCreateCharacter, a as useTraits, i as AvatarStyle, j as PersonalityType, m as motion, A as AvatarDisplay, e as AVATAR_STYLE_LABELS, d as AVATAR_STYLE_COLORS, B as Badge, P as PERSONALITY_EMOJIS, b as PERSONALITY_LABELS, k as AVATAR_STYLE_BG } from "./useCharacters-BH-xoOrb.js";
import { A as AnimatePresence, I as Input, C as CharacterCard } from "./input-DJuH5nDy.js";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const AVATAR_STYLES = Object.values(AvatarStyle);
const PERSONALITY_TYPES = Object.values(PersonalityType);
const STEP_LABELS = ["Basic Info", "Personality", "Preview & Save"];
const DEFAULT_TRAITS = [
  "Curious",
  "Brave",
  "Witty",
  "Kind",
  "Mysterious",
  "Creative",
  "Energetic",
  "Calm",
  "Bold",
  "Gentle",
  "Sarcastic",
  "Loyal"
];
function StyleCircle({ style }) {
  var _a;
  const bg = AVATAR_STYLE_BG[style] ?? "bg-muted";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `w-9 h-9 rounded-full ${bg} flex items-center justify-center shadow-sm flex-shrink-0`,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white/90 select-none", children: ((_a = AVATAR_STYLE_LABELS[style]) == null ? void 0 : _a[0]) ?? "?" })
    }
  );
}
function StepProgress({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "create.progress", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0", children: STEP_LABELS.map((label, i) => {
    const done = i < current;
    const active = i === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center flex-1 last:flex-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `create.step.${i + 1}`,
                className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-smooth ${done ? "bg-primary border-primary text-primary-foreground" : active ? "bg-card border-primary text-primary shadow-md" : "bg-muted border-border text-muted-foreground"}`,
                children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M2 7l3.5 3.5L12 3.5",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                ) : i + 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-semibold whitespace-nowrap hidden sm:block ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`,
                children: label
              }
            )
          ] }),
          i < STEP_LABELS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex-1 h-0.5 mx-1 mb-5 rounded-full transition-smooth ${done ? "bg-primary" : "bg-border"}`
            }
          )
        ]
      },
      label
    );
  }) }) });
}
function Step1({
  name,
  setName,
  avatarStyle,
  setAvatarStyle,
  nameError
}) {
  var _a, _b, _c;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.3 },
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.85, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.25 },
            className: "flex flex-col items-center gap-2 px-8 py-5 bg-card rounded-2xl border border-border shadow-md",
            "data-ocid": "create.avatar_preview",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarDisplay,
                {
                  name: name || "?",
                  avatarStyle,
                  size: "xl"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: name || "Your character" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${((_a = AVATAR_STYLE_COLORS[avatarStyle]) == null ? void 0 : _a.bg) ?? "bg-muted"} ${((_b = AVATAR_STYLE_COLORS[avatarStyle]) == null ? void 0 : _b.text) ?? "text-muted-foreground"} ${((_c = AVATAR_STYLE_COLORS[avatarStyle]) == null ? void 0 : _c.border) ?? "border-border"}`,
                  children: AVATAR_STYLE_LABELS[avatarStyle]
                }
              )
            ]
          },
          avatarStyle
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
            "Character Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              placeholder: "e.g. Luna Starweaver",
              value: name,
              onChange: (e) => setName(e.target.value),
              maxLength: 60,
              "data-ocid": "create.name_input",
              className: nameError ? "border-destructive focus-visible:ring-destructive" : "",
              "aria-describedby": nameError ? "name-error" : void 0
            }
          ),
          nameError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              id: "name-error",
              className: "text-xs text-destructive",
              "data-ocid": "create.name_field_error",
              children: nameError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Avatar Style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
              "data-ocid": "create.avatar_style_select",
              "aria-label": "Avatar style",
              children: AVATAR_STYLES.map((style) => {
                var _a2;
                const isSelected = avatarStyle === style;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-pressed": isSelected,
                    onClick: () => setAvatarStyle(style),
                    "data-ocid": `create.avatar_style.${style}`,
                    className: `flex items-center gap-2.5 p-3 rounded-xl border-2 transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/40 hover:bg-primary/[0.03]"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StyleCircle, { style }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-xs text-foreground leading-tight", children: AVATAR_STYLE_LABELS[style] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `text-[10px] font-medium ${((_a2 = AVATAR_STYLE_COLORS[style]) == null ? void 0 : _a2.text) ?? "text-muted-foreground"}`,
                            children: style
                          }
                        )
                      ] }),
                      isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          width: "8",
                          height: "8",
                          viewBox: "0 0 8 8",
                          fill: "none",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M1 4l2 2 4-4",
                              stroke: "white",
                              strokeWidth: "1.5",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        }
                      ) })
                    ]
                  },
                  style
                );
              })
            }
          )
        ] })
      ]
    },
    "step1"
  );
}
function Step2({
  personalityType,
  setPersonalityType,
  personalityDescription,
  setPersonalityDescription,
  backgroundSnippet,
  setBackgroundSnippet,
  selectedTraits,
  toggleTrait,
  traitOptions,
  traitError
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.3 },
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Personality Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2",
              "data-ocid": "create.personality_select",
              "aria-label": "Personality type",
              children: PERSONALITY_TYPES.map((pt) => {
                const active = personalityType === pt;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-pressed": active,
                    onClick: () => setPersonalityType(pt),
                    "data-ocid": `create.personality.${pt}`,
                    className: "transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: active ? "default" : "outline",
                        className: "cursor-pointer text-xs py-1.5 px-3 rounded-full gap-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: PERSONALITY_EMOJIS[pt] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: PERSONALITY_LABELS[pt] })
                        ]
                      }
                    )
                  },
                  pt
                );
              })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Personality Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              placeholder: "Describe how your character thinks, feels, and interacts with the world…",
              value: personalityDescription,
              onChange: (e) => setPersonalityDescription(e.target.value),
              rows: 3,
              maxLength: 400,
              "data-ocid": "create.description_textarea"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
            personalityDescription.length,
            "/400"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "background", children: [
            "Background Story",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "background",
              placeholder: "A brief backstory or origin snippet…",
              value: backgroundSnippet,
              onChange: (e) => setBackgroundSnippet(e.target.value),
              rows: 2,
              maxLength: 300,
              "data-ocid": "create.background_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Traits ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
              "(select at least 1, up to 6 — ",
              selectedTraits.length,
              " selected)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
              "data-ocid": "create.traits_select",
              children: traitOptions.map((trait, idx) => {
                const checked = selectedTraits.includes(trait);
                const maxed = selectedTraits.length >= 6 && !checked;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    "data-ocid": `create.trait.${idx + 1}`,
                    className: `flex items-center gap-2 p-2.5 rounded-lg border transition-smooth cursor-pointer select-none ${checked ? "border-primary bg-primary/5" : maxed ? "border-border bg-muted/30 opacity-50 cursor-not-allowed" : "border-border bg-card hover:border-primary/40"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked,
                          onChange: () => !maxed && toggleTrait(trait),
                          disabled: maxed,
                          className: "accent-primary w-3.5 h-3.5 flex-shrink-0",
                          "aria-label": trait
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: trait })
                    ]
                  },
                  trait
                );
              })
            }
          ),
          traitError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "create.trait_field_error",
              children: traitError
            }
          )
        ] })
      ]
    },
    "step2"
  );
}
function Step3({
  previewCharacter,
  isPending,
  onSave
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.3 },
      className: "space-y-6",
      "data-ocid": "create.preview_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Your character is ready!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Here's how they'll appear in the gallery." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CharacterCard, { character: previewCharacter, index: 0 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl border border-border p-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Name", value: previewCharacter.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Row,
            {
              label: "Style",
              value: AVATAR_STYLE_LABELS[previewCharacter.avatarStyle] ?? previewCharacter.avatarStyle
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Row,
            {
              label: "Personality",
              value: `${PERSONALITY_EMOJIS[previewCharacter.personalityType] ?? ""} ${PERSONALITY_LABELS[previewCharacter.personalityType] ?? previewCharacter.personalityType}`
            }
          ),
          previewCharacter.personalityDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Row,
            {
              label: "Description",
              value: previewCharacter.personalityDescription
            }
          ),
          previewCharacter.backgroundSnippet && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Background", value: previewCharacter.backgroundSnippet }),
          previewCharacter.traits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground min-w-[80px] flex-shrink-0", children: "Traits" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: previewCharacter.traits.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-2 py-0 h-5 rounded-full",
                children: t
              },
              t
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: onSave,
            disabled: isPending,
            className: "w-full",
            "data-ocid": "create.save_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }),
              "Saving…"
            ] }) : "Save Character ✨"
          }
        )
      ]
    },
    "step3"
  );
}
function Row({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground min-w-[80px] flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground break-words min-w-0", children: value })
  ] });
}
function CreatePage() {
  const navigate = useNavigate();
  const { mutateAsync: createCharacter, isPending } = useCreateCharacter();
  const { data: availableTraits = [] } = useTraits();
  const [step, setStep] = reactExports.useState(0);
  const [name, setName] = reactExports.useState("");
  const [avatarStyle, setAvatarStyle] = reactExports.useState(
    AvatarStyle.illustrated
  );
  const [nameError, setNameError] = reactExports.useState("");
  const [personalityType, setPersonalityType] = reactExports.useState(
    PersonalityType.playful
  );
  const [personalityDescription, setPersonalityDescription] = reactExports.useState("");
  const [backgroundSnippet, setBackgroundSnippet] = reactExports.useState("");
  const [selectedTraits, setSelectedTraits] = reactExports.useState([]);
  const [traitError, setTraitError] = reactExports.useState("");
  const traitOptions = availableTraits.length > 0 ? availableTraits : DEFAULT_TRAITS;
  function toggleTrait(trait) {
    setSelectedTraits(
      (prev) => prev.includes(trait) ? prev.filter((t) => t !== trait) : prev.length < 6 ? [...prev, trait] : prev
    );
  }
  function goNext() {
    if (step === 0) {
      if (!name.trim()) {
        setNameError("Character name is required.");
        return;
      }
      setNameError("");
      setStep(1);
    } else if (step === 1) {
      if (selectedTraits.length === 0) {
        setTraitError("Please select at least one trait.");
        return;
      }
      setTraitError("");
      setStep(2);
    }
  }
  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }
  const previewCharacter = {
    id: BigInt(0),
    name: name.trim() || "?",
    avatarStyle,
    personalityType,
    personalityDescription,
    backgroundSnippet,
    traits: selectedTraits,
    createdAt: BigInt(Date.now()),
    isPreseeded: false
  };
  async function handleSave() {
    const req = {
      name: name.trim(),
      avatarStyle,
      personalityType,
      personalityDescription: personalityDescription.trim(),
      backgroundSnippet: backgroundSnippet.trim(),
      traits: selectedTraits
    };
    try {
      const character = await createCharacter(req);
      ue.success(`${character.name} has been created! 🎉`);
      navigate({ to: "/" });
    } catch {
      ue.error("Failed to create character. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title", children: "Create Your Character" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Design a unique AI persona with a personality all its own." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepProgress, { current: step }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary uppercase tracking-widest", children: [
          "Step ",
          step + 1,
          " — ",
          STEP_LABELS[step]
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-md p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", initial: false, children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step1,
            {
              name,
              setName: (v) => {
                setName(v);
                if (v.trim()) setNameError("");
              },
              avatarStyle,
              setAvatarStyle,
              nameError
            }
          ),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step2,
            {
              personalityType,
              setPersonalityType,
              personalityDescription,
              setPersonalityDescription,
              backgroundSnippet,
              setBackgroundSnippet,
              selectedTraits,
              toggleTrait,
              traitOptions,
              traitError
            }
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step3,
            {
              previewCharacter,
              isPending,
              onSave: handleSave
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              className: "flex-none",
              "data-ocid": "create.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          step > 0 && step < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: goBack,
              "data-ocid": "create.back_button",
              children: "← Back"
            }
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: goBack,
              "data-ocid": "create.back_button",
              children: "← Edit"
            }
          ),
          step < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: goNext,
              "data-ocid": "create.next_button",
              children: "Next →"
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  CreatePage
};
