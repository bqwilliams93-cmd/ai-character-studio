# Design Brief

## Direction

Playful Pop — vibrant, character-focused gallery app with emphasis on beautiful card design and smooth interactions.

## Tone

Friendly and confident with contemporary flair — approachable entertainment aesthetic prioritizing visual delight over minimalism.

## Differentiation

Smooth card hover elevation (scale + shadow), fast gallery load with immediate interactivity, and vivid magenta primary accent used sparingly for CTAs and active states.

## Color Palette

| Token      | OKLCH         | Role                              |
| ---------- | ------------- | --------------------------------- |
| background | 0.98 0.005 280 | Light off-white base              |
| foreground | 0.18 0.02 280 | Deep blue-gray text               |
| card       | 1.0 0.0 0    | Pure white card surfaces          |
| primary    | 0.55 0.24 305 | Vivid magenta — CTAs & highlights |
| accent     | 0.7 0.18 195  | Teal complement for depth         |
| secondary  | 0.58 0.14 25  | Warm coral — section variety      |
| muted      | 0.94 0.02 280 | Subtle backgrounds                |

## Typography

- Display: Bricolage Grotesque — headings, hero text
- Body: Plus Jakarta Sans — paragraphs, UI labels, character bio
- Scale: hero `text-5xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold tracking-tight`, label `text-sm font-semibold`, body `text-base md:text-lg`

## Elevation & Depth

Cards elevate on hover with combined scale (1.02) and shadow progression (subtle→elevated). No full-page gradients; depth achieved through shadow hierarchy and card layering.

## Structural Zones

| Zone    | Background         | Border        | Notes                                   |
| ------- | ------------------ | -------------- | --------------------------------------- |
| Header  | bg-card shadow-sm  | border-b       | Minimal header with app title           |
| Content | bg-background      | —              | Spacious grid of character cards        |
| Gallery | bg-muted/5         | —              | Alternating rows with subtle tint      |
| Footer  | bg-muted/40        | border-t       | Muted background with action link       |

## Spacing & Rhythm

Section gaps use `gap-8 md:gap-12` for rhythm; character cards within grid `gap-4 md:gap-6`; micro-spacing on text with `tracking-tight` for headlines and standard tracking for body.

## Component Patterns

- Buttons: `btn-primary` (magenta, rounded-full, hover opacity-90), `btn-secondary` (coral, rounded-full, hover opacity-90)
- Cards: `character-card` (rounded-lg, white, subtle border, elevates on hover with scale-105 + shadow-elevated)
- Badges: accent color text on muted background, rounded-full, small font

## Motion

- Entrance: card slides in with fade-up stagger (200ms per card) on gallery load
- Hover: character card scales to 1.02 and elevates shadow with 300ms smooth transition
- Decorative: fade-in on section titles, slide-up on cards below fold

## Constraints

- Gallery must be clickable within 2 seconds of page load
- Character card images: use consistent aspect ratio (4:5 or square with avatar badge)
- No bouncy animations; all easing uses cubic-bezier(0.4, 0, 0.2, 1) for refinement
- Magenta primary accent used only on primary CTAs and active/selected states

## Signature Detail

Smooth character card hover elevation combines scale transform and shadow progression, creating depth without visual confusion — the standout interaction that makes the gallery feel polished and premium.
