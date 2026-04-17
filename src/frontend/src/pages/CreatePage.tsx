import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AvatarDisplay } from "../components/AvatarDisplay";
import { CharacterCard } from "../components/CharacterCard";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useCreateCharacter, useTraits } from "../hooks/useCharacters";
import {
  AVATAR_STYLE_BG,
  AVATAR_STYLE_COLORS,
  AVATAR_STYLE_LABELS,
  AvatarStyle,
  PERSONALITY_EMOJIS,
  PERSONALITY_LABELS,
  PersonalityType,
} from "../types/character";
import type { Character, CreateCharacterRequest } from "../types/character";

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
  "Loyal",
];

// Decorative colored circle for avatar style tiles
function StyleCircle({ style }: { style: AvatarStyle }) {
  const bg = AVATAR_STYLE_BG[style] ?? "bg-muted";
  return (
    <div
      className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shadow-sm flex-shrink-0`}
      aria-hidden="true"
    >
      <span className="text-sm font-bold text-white/90 select-none">
        {AVATAR_STYLE_LABELS[style]?.[0] ?? "?"}
      </span>
    </div>
  );
}

// Progress bar with step labels
function StepProgress({ current }: { current: number }) {
  return (
    <div className="space-y-3" data-ocid="create.progress">
      <div className="flex items-center gap-0">
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div
              key={label}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  data-ocid={`create.step.${i + 1}`}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-smooth ${
                    done
                      ? "bg-primary border-primary text-primary-foreground"
                      : active
                        ? "bg-card border-primary text-primary shadow-md"
                        : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7l3.5 3.5L12 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold whitespace-nowrap hidden sm:block ${
                    active
                      ? "text-primary"
                      : done
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 mb-5 rounded-full transition-smooth ${
                    done ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Step 1: Basic Info
function Step1({
  name,
  setName,
  avatarStyle,
  setAvatarStyle,
  nameError,
}: {
  name: string;
  setName: (v: string) => void;
  avatarStyle: AvatarStyle;
  setAvatarStyle: (s: AvatarStyle) => void;
  nameError: string;
}) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Live mini preview */}
      <div className="flex justify-center">
        <motion.div
          key={avatarStyle}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-2 px-8 py-5 bg-card rounded-2xl border border-border shadow-md"
          data-ocid="create.avatar_preview"
        >
          <AvatarDisplay
            name={name || "?"}
            avatarStyle={avatarStyle}
            size="xl"
          />
          <span className="font-display font-bold text-sm text-foreground">
            {name || "Your character"}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${AVATAR_STYLE_COLORS[avatarStyle]?.bg ?? "bg-muted"} ${AVATAR_STYLE_COLORS[avatarStyle]?.text ?? "text-muted-foreground"} ${AVATAR_STYLE_COLORS[avatarStyle]?.border ?? "border-border"}`}
          >
            {AVATAR_STYLE_LABELS[avatarStyle]}
          </span>
        </motion.div>
      </div>

      {/* Name input */}
      <div className="space-y-1.5">
        <Label htmlFor="name">
          Character Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="e.g. Luna Starweaver"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          data-ocid="create.name_input"
          className={
            nameError ? "border-destructive focus-visible:ring-destructive" : ""
          }
          aria-describedby={nameError ? "name-error" : undefined}
        />
        {nameError && (
          <p
            id="name-error"
            className="text-xs text-destructive"
            data-ocid="create.name_field_error"
          >
            {nameError}
          </p>
        )}
      </div>

      {/* Avatar style tiles */}
      <div className="space-y-2">
        <Label>Avatar Style</Label>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          data-ocid="create.avatar_style_select"
          aria-label="Avatar style"
        >
          {AVATAR_STYLES.map((style) => {
            const isSelected = avatarStyle === style;
            return (
              <button
                type="button"
                key={style}
                aria-pressed={isSelected}
                onClick={() => setAvatarStyle(style)}
                data-ocid={`create.avatar_style.${style}`}
                className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-smooth text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/40 hover:bg-primary/[0.03]"
                }`}
              >
                <StyleCircle style={style} />
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-foreground leading-tight">
                    {AVATAR_STYLE_LABELS[style]}
                  </div>
                  <div
                    className={`text-[10px] font-medium ${AVATAR_STYLE_COLORS[style]?.text ?? "text-muted-foreground"}`}
                  >
                    {style}
                  </div>
                </div>
                {isSelected && (
                  <div className="ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 4l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Step 2: Personality
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
  traitError,
}: {
  personalityType: PersonalityType;
  setPersonalityType: (p: PersonalityType) => void;
  personalityDescription: string;
  setPersonalityDescription: (v: string) => void;
  backgroundSnippet: string;
  setBackgroundSnippet: (v: string) => void;
  selectedTraits: string[];
  toggleTrait: (t: string) => void;
  traitOptions: string[];
  traitError: string;
}) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Personality type */}
      <div className="space-y-2">
        <Label>Personality Type</Label>
        <div
          className="flex flex-wrap gap-2"
          data-ocid="create.personality_select"
          aria-label="Personality type"
        >
          {PERSONALITY_TYPES.map((pt) => {
            const active = personalityType === pt;
            return (
              <button
                type="button"
                key={pt}
                aria-pressed={active}
                onClick={() => setPersonalityType(pt)}
                data-ocid={`create.personality.${pt}`}
                className="transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
              >
                <Badge
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer text-xs py-1.5 px-3 rounded-full gap-1"
                >
                  <span>{PERSONALITY_EMOJIS[pt]}</span>
                  <span>{PERSONALITY_LABELS[pt]}</span>
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Personality description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Personality Description</Label>
        <Textarea
          id="description"
          placeholder="Describe how your character thinks, feels, and interacts with the world…"
          value={personalityDescription}
          onChange={(e) => setPersonalityDescription(e.target.value)}
          rows={3}
          maxLength={400}
          data-ocid="create.description_textarea"
        />
        <p className="text-xs text-muted-foreground text-right">
          {personalityDescription.length}/400
        </p>
      </div>

      {/* Background */}
      <div className="space-y-1.5">
        <Label htmlFor="background">
          Background Story{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="background"
          placeholder="A brief backstory or origin snippet…"
          value={backgroundSnippet}
          onChange={(e) => setBackgroundSnippet(e.target.value)}
          rows={2}
          maxLength={300}
          data-ocid="create.background_textarea"
        />
      </div>

      {/* Trait checkboxes */}
      <div className="space-y-2">
        <Label>
          Traits <span className="text-destructive">*</span>{" "}
          <span className="text-muted-foreground font-normal">
            (select at least 1, up to 6 — {selectedTraits.length} selected)
          </span>
        </Label>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          data-ocid="create.traits_select"
        >
          {traitOptions.map((trait, idx) => {
            const checked = selectedTraits.includes(trait);
            const maxed = selectedTraits.length >= 6 && !checked;
            return (
              <label
                key={trait}
                data-ocid={`create.trait.${idx + 1}`}
                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-smooth cursor-pointer select-none ${
                  checked
                    ? "border-primary bg-primary/5"
                    : maxed
                      ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                      : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => !maxed && toggleTrait(trait)}
                  disabled={maxed}
                  className="accent-primary w-3.5 h-3.5 flex-shrink-0"
                  aria-label={trait}
                />
                <span className="text-xs font-medium text-foreground">
                  {trait}
                </span>
              </label>
            );
          })}
        </div>
        {traitError && (
          <p
            className="text-xs text-destructive"
            data-ocid="create.trait_field_error"
          >
            {traitError}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Step 3: Preview & Save
function Step3({
  previewCharacter,
  isPending,
  onSave,
}: {
  previewCharacter: Character;
  isPending: boolean;
  onSave: () => void;
}) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
      data-ocid="create.preview_section"
    >
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Your character is ready!
        </p>
        <p className="text-xs text-muted-foreground">
          Here's how they'll appear in the gallery.
        </p>
      </div>

      {/* Full card preview */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <CharacterCard character={previewCharacter} index={0} />
        </div>
      </div>

      {/* Detail table */}
      <div className="bg-muted/40 rounded-xl border border-border p-4 space-y-3 text-sm">
        <Row label="Name" value={previewCharacter.name} />
        <Row
          label="Style"
          value={
            AVATAR_STYLE_LABELS[previewCharacter.avatarStyle] ??
            previewCharacter.avatarStyle
          }
        />
        <Row
          label="Personality"
          value={`${PERSONALITY_EMOJIS[previewCharacter.personalityType] ?? ""} ${PERSONALITY_LABELS[previewCharacter.personalityType] ?? previewCharacter.personalityType}`}
        />
        {previewCharacter.personalityDescription && (
          <Row
            label="Description"
            value={previewCharacter.personalityDescription}
          />
        )}
        {previewCharacter.backgroundSnippet && (
          <Row label="Background" value={previewCharacter.backgroundSnippet} />
        )}
        {previewCharacter.traits.length > 0 && (
          <div className="flex items-start gap-3">
            <span className="text-muted-foreground min-w-[80px] flex-shrink-0">
              Traits
            </span>
            <div className="flex flex-wrap gap-1">
              {previewCharacter.traits.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="text-[10px] px-2 py-0 h-5 rounded-full"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        type="button"
        onClick={onSave}
        disabled={isPending}
        className="w-full"
        data-ocid="create.save_button"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
            Saving…
          </span>
        ) : (
          "Save Character ✨"
        )}
      </Button>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground min-w-[80px] flex-shrink-0">
        {label}
      </span>
      <span className="text-foreground break-words min-w-0">{value}</span>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────
export function CreatePage() {
  const navigate = useNavigate();
  const { mutateAsync: createCharacter, isPending } = useCreateCharacter();
  const { data: availableTraits = [] } = useTraits();

  const [step, setStep] = useState(0);

  // Step 1 state
  const [name, setName] = useState("");
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>(
    AvatarStyle.illustrated,
  );
  const [nameError, setNameError] = useState("");

  // Step 2 state
  const [personalityType, setPersonalityType] = useState<PersonalityType>(
    PersonalityType.playful,
  );
  const [personalityDescription, setPersonalityDescription] = useState("");
  const [backgroundSnippet, setBackgroundSnippet] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [traitError, setTraitError] = useState("");

  const traitOptions =
    availableTraits.length > 0 ? availableTraits : DEFAULT_TRAITS;

  function toggleTrait(trait: string) {
    setSelectedTraits((prev) =>
      prev.includes(trait)
        ? prev.filter((t) => t !== trait)
        : prev.length < 6
          ? [...prev, trait]
          : prev,
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

  // Build preview character for step 3
  const previewCharacter: Character = {
    id: BigInt(0),
    name: name.trim() || "?",
    avatarStyle,
    personalityType,
    personalityDescription,
    backgroundSnippet,
    traits: selectedTraits,
    createdAt: BigInt(Date.now()),
    isPreseeded: false,
  };

  async function handleSave() {
    const req: CreateCharacterRequest = {
      name: name.trim(),
      avatarStyle,
      personalityType,
      personalityDescription: personalityDescription.trim(),
      backgroundSnippet: backgroundSnippet.trim(),
      traits: selectedTraits,
    };
    try {
      const character = await createCharacter(req);
      toast.success(`${character.name} has been created! 🎉`);
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to create character. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="section-title">Create Your Character</h1>
            <p className="text-muted-foreground text-sm">
              Design a unique AI persona with a personality all its own.
            </p>
          </div>

          {/* Progress */}
          <StepProgress current={step} />

          {/* Step label (mobile) */}
          <div className="sm:hidden text-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Step {step + 1} — {STEP_LABELS[step]}
            </span>
          </div>

          {/* Step content */}
          <div className="bg-card rounded-2xl border border-border shadow-md p-6">
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <Step1
                  name={name}
                  setName={(v) => {
                    setName(v);
                    if (v.trim()) setNameError("");
                  }}
                  avatarStyle={avatarStyle}
                  setAvatarStyle={setAvatarStyle}
                  nameError={nameError}
                />
              )}
              {step === 1 && (
                <Step2
                  personalityType={personalityType}
                  setPersonalityType={setPersonalityType}
                  personalityDescription={personalityDescription}
                  setPersonalityDescription={setPersonalityDescription}
                  backgroundSnippet={backgroundSnippet}
                  setBackgroundSnippet={setBackgroundSnippet}
                  selectedTraits={selectedTraits}
                  toggleTrait={toggleTrait}
                  traitOptions={traitOptions}
                  traitError={traitError}
                />
              )}
              {step === 2 && (
                <Step3
                  previewCharacter={previewCharacter}
                  isPending={isPending}
                  onSave={handleSave}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              className="flex-none"
              data-ocid="create.cancel_button"
            >
              Cancel
            </Button>
            <div className="flex-1" />
            {step > 0 && step < 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                data-ocid="create.back_button"
              >
                ← Back
              </Button>
            )}
            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                data-ocid="create.back_button"
              >
                ← Edit
              </Button>
            )}
            {step < 2 && (
              <Button
                type="button"
                onClick={goNext}
                data-ocid="create.next_button"
              >
                Next →
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
