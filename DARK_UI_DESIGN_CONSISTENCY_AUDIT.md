# Dark UI Design Consistency Audit

Scope:
- `src/styles/core.css`
- `src/styles/app.css`
- `src/styles/reservations.css`
- active runtime dark UI only

Out of scope:
- semantic/status redesign
- export/template CSS
- broad cleanup/refactor

## Executive Summary

The dark UI currently uses more than one visual language at the same time.

The core token system in `src/styles/core.css` is coherent and mostly olive/forest/slate:
- deep green-black page and shell backgrounds
- moss/olive borders and focus rings
- softened teal/steel highlights inside tabs and panels

But several visible runtime control systems in `src/styles/app.css` and `src/styles/reservations.css` still lean blue/navy/indigo:
- page headers
- suggestions/autocomplete surfaces
- reservation form textareas and billing controls
- some filter bars, action buttons, and financial areas

So the current issue is not “dark mode is broken.” The issue is that surfaces and controls sometimes feel like different products:
- surfaces say “botanical/olive”
- controls often say “midnight SaaS blue”

The best path is not a token cleanup pass. It is a design-direction decision.

## Current Visual Systems

### System A: Tokenized olive / forest / slate baseline

Primary owner:
- `src/styles/core.css`

Representative tokens:
- [core.css#L131](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L131)
  `--bo-color-content-bg`
- [core.css#L127](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L127)
  `--bo-color-shell-bg`
- [core.css#L165](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L165)
  `--bo-color-control-bg`
- [core.css#L168](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L168)
  `--bo-color-control-hover-bg`
- [core.css#L169](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L169)
  `--bo-color-control-focus-border`
- [core.css#L148](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L148)
  `--bo-color-tab-hover-bg`
- [core.css#L151](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L151)
  `--bo-color-tab-active-bg`

Visual character:
- dark olive-black shells
- soft green-gray borders
- restrained blended gradients
- focus rings that feel moss/stone rather than neon

This system feels intentional and is the strongest coherent base in the repo.

### System B: midnight navy / indigo runtime controls

Primary owners:
- `src/styles/app.css`
- `src/styles/reservations.css`

Representative examples:
- [app.css#L44](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L44)
  `html.dark, body.dark` page gradient
- [app.css#L4333](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4333)
  language/theme toggle buttons
- [app.css#L4933](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4933)
  customer page header gradient
- [app.css#L5111](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5111)
  suggestions list background/border/shadow
- [app.css#L5123](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5123)
  suggestion hover state
- [reservations.css#L64](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L64)
  reservations search input dark style
- [reservations.css#L3616](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3616)
  reservation notes textarea dark gradient
- [reservations.css#L3695](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3695)
  reservation terms textarea dark gradient
- [reservations.css#L4054](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4054)
  reservation billing input dark style

Visual character:
- midnight blue overlays
- brighter indigo borders and focus glows
- stronger SaaS-style blue hovers
- cooler shadows and punchier contrast

This system is visually strong, but it competes with the olive token baseline.

### System C: accent-heavy local special cases

Primary owners:
- `src/styles/reservations.css`
- some page-scoped areas in `src/styles/app.css`

Representative examples:
- [reservations.css#L3452](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3452)
  reservation primary buttons
- [reservations.css#L4015](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4015)
  payment-status select variants
- [reservations.css#L4740](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4740)
  modal action button gradients
- [app.css#L4997](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4997)
  customer nav hover gradient
- [app.css#L5046](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5046)
  customer details outline buttons

Visual character:
- louder gradients
- bigger glows/shadows
- more explicit accent coloring
- more visual “eventfulness” than the surrounding shells

This system is useful for special emphasis, but it currently spills into too many routine controls.

## Main Inconsistencies

### 1. Color system mismatch

Where it shows:
- `core.css` dark shells and controls are olive/slate-led
- `app.css` page gradients and headers are often blue/navy-led
- `reservations.css` inputs, textareas, and billing controls often use deep navy/indigo blocks

Most visible examples:
- [core.css#L127](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L127) vs [app.css#L44](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L44)
- [core.css#L165](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L165) vs [reservations.css#L3616](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3616)
- [app.css#L4850](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4850) customer surfaces aligned to core tokens, but [app.css#L4941](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4941) customer header shifts to a separate blue header language

Effect:
- background and shell feel earthy and muted
- controls and overlays feel colder and more synthetic

### 2. Over-accented controls

Where it shows:
- reservations primary buttons and modal actions
- payment-status selects
- some customer-page hover treatments
- theme/language/header controls

Representative selectors:
- [reservations.css#L3452](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3452)
- [reservations.css#L4015](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4015)
- [reservations.css#L4740](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4740)
- [app.css#L4333](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4333)

Effect:
- too many controls compete for attention
- emphasis stops feeling meaningful

### 3. Inconsistent hover / focus treatment

Tokenized baseline:
- `core.css` uses softer token-based hover and focus treatments
- example: [core.css#L168](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L168)

Runtime drift:
- reservations and page-specific controls often use brighter blue glows and heavier hover shadows
- examples:
  [reservations.css#L3596](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3596)
  [reservations.css#L4042](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4042)
  [app.css#L5123](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5123)

Effect:
- some controls feel calm and integrated
- others feel bright, floating, and high-energy

### 4. Inconsistent gradients / glows

Coherent token gradients:
- shell/content/tab/action gradients in `core.css`

Drifted local gradients:
- customer header
- suggestions list
- reservation notes/terms textareas
- reservation summary box
- modal action buttons

Representative selectors:
- [app.css#L4941](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4941)
- [app.css#L5111](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5111)
- [reservations.css#L3616](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3616)
- [reservations.css#L3695](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3695)
- [reservations.css#L3760](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3760)
- [reservations.css#L4740](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4740)

Effect:
- gradients sometimes read like one product theme
- other gradients read like another product theme

### 5. Page-specific visual drift

Customer/technician pages are the clearest example:
- base surfaces already reuse core content tokens via [app.css#L4850](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4850)
- but customer header/nav/financial hover states still skew blue
- technician financial areas inherit the same drift

Suggestions/autocomplete also drift:
- [app.css#L5111](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5111)
- [app.css#L5123](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5123)

Effect:
- some pages feel closer to the new tokenized system
- some visible interactive clusters still feel like older blue-first design language

## Design Direction Options

### Option 1: Olive-led unification with restrained cool-blue accents

Approach:
- keep `core.css` token system as the dominant visual language
- surfaces, routine controls, menus, and textareas all align to olive/slate shells and control tokens
- reserve blue only for:
  - data/status contexts
  - selected/highlight states
  - high-value interactive emphasis

What changes later:
- reduce blue/navy gradients in routine controls
- soften blue hover glows into token-driven hover states
- rework customer header and suggestions to feel like extensions of `bo-color-shell/content/control`

Pros:
- aligns with the strongest existing token system
- lowers visual noise
- makes emphasis more meaningful
- creates the most coherent product identity

Cons:
- some currently “punchy” controls will feel calmer

### Option 2: Midnight slate unification with olive as secondary accent

Approach:
- shift the whole dark runtime toward a blue-black/slate core
- keep olive only as a secondary accent for highlights and badges

What changes later:
- dark page/shell tokens would need to move bluer
- content/control tokens in `core.css` would need redesign to match runtime controls

Pros:
- matches many current local controls already in `app.css` and `reservations.css`
- feels more conventionally “dark SaaS”

Cons:
- pushes against the new token system rather than using it
- would require deeper retheming of `core.css`
- higher blast radius

### Option 3: Dual-theme approach by subsystem

Approach:
- keep olive/slate for shell/surfaces
- intentionally keep blue/navy for controls and overlays
- document the split as a design language rather than treating it as drift

Pros:
- low design churn
- preserves current energy in controls

Cons:
- still risks feeling like two products
- harder to make look intentional across all pages
- requires stronger rules to avoid drift getting worse

## Preferred Direction

### Preferred: Option 1

Use the existing olive-led token system as the main dark visual language, and treat blue as a controlled secondary accent rather than the default control language.

Why this is the best fit for this repo:
- `core.css` already has the most coherent dark design system
- customer-page surfaces already partially align to it through token reuse
- the current mismatch is mostly caused by local blue-heavy control clusters, not by the core system itself
- this path reduces inconsistency without requiring a full re-theme

Practical meaning of that direction:
- routine controls should look like they belong to `--bo-color-control-*`
- routine surfaces and overlays should look like they belong to `--bo-color-shell-*` or `--bo-color-content-*`
- blue should remain available, but mainly for:
  - selected states
  - data emphasis
  - focused/high-priority interaction moments
- gradients and glows should become rarer and more intentional

## Recommended First Design Targets Later

If this preferred direction is chosen, the safest first design-consistency targets would be:

1. Suggestions/autocomplete dark styling in `src/styles/app.css`
- [app.css#L5111](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5111)
- [app.css#L5123](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5123)

Why:
- small visible surface
- low semantic risk
- currently one of the clearest blue/navy mismatches

2. Customer header/nav dark styling in `src/styles/app.css`
- [app.css#L4941](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4941)
- [app.css#L4997](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4997)

Why:
- highly visible
- currently drifts away from customer surface tokens already defined just above

3. Reservation notes/terms textareas and billing inputs in `src/styles/reservations.css`
- [reservations.css#L3616](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3616)
- [reservations.css#L3695](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L3695)
- [reservations.css#L4054](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L4054)

Why:
- they are prominent
- they currently read as a different product language from surrounding dark shells

## What Should Stay Deferred

- semantic/status colors and payment-state meaning systems
- badge/chip redesign
- full customer/technician financial theme redesign
- broad token rewrites in `core.css`
- any project-wide action-color redesign without an approved direction
