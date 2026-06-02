> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# UI Color Token Audit

## Executive summary

The active back-office UI already has a meaningful token foundation, but it is only partially authoritative.

Current state:

- [`core.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css) owns the real cross-app token system for surfaces, text, borders, controls, actions, tables, and dark-mode shells.
- [`reports.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css) adds a smaller subsystem token layer on top of `core.css`.
- [`app.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css) and especially [`reservations.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css) still contain many hardcoded blue/navy/indigo values and one-off rgba stacks.

So the system is not “missing tokens.” The real problem is:

- token usage is incomplete
- some legacy blue-heavy clusters still bypass the token layer
- semantic/status colors are mixed with non-semantic accent values
- shadow/glow values are only partly normalized

This is a good place to stop and audit before any broad replacement work.

## Current token/color inventory

### 1. Core global tokens in `core.css`

The strongest current system lives in [`core.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css).

#### Surface tokens

- `--bo-color-page-bg-solid`
- `--bo-color-page-bg`
- `--bo-color-surface`
- `--bo-color-surface-muted`
- `--bo-color-shell-bg`
- `--bo-color-shell-border`
- `--bo-color-content-bg`
- `--bo-color-content-border`
- `--bo-color-content-muted-bg`
- `--bo-color-content-muted-border`
- `--bo-color-empty-bg`
- `--bo-color-empty-border`

These already define the olive/slate shell language for light and dark themes.

#### Text tokens

- `--clr-text`
- `--clr-muted`
- `--bo-color-text-primary`
- `--bo-color-text-muted`
- `--bo-color-heading-accent`
- `--bo-color-tab-text`
- `--bo-color-tab-active-fg`
- `--bo-color-action-fg`
- `--bo-color-table-head-fg`

#### Border tokens

- `--bo-color-border-soft`
- `--bo-color-border-strong`
- `--bo-color-support-border`
- `--bo-color-panel-highlight-border`
- `--bo-color-action-border`
- `--bo-color-action-outline-border`
- `--bo-color-control-border`
- `--bo-color-table-head-border`
- `--bo-color-table-row-border`

#### Control tokens

- `--bo-color-control-bg`
- `--bo-color-control-hover-bg`
- `--bo-color-control-focus-border`
- `--bo-color-control-focus-ring`
- `--bo-color-control-placeholder`
- `--bo-color-control-disabled-bg`

#### Accent/action tokens

- `--bo-color-accent`
- `--bo-color-accent-soft`
- `--bo-color-accent-text`
- `--bo-color-action`
- `--bo-color-action-soft`
- `--bo-color-action-bg`
- `--bo-color-action-bg-hover`
- `--bo-color-action-bg-active`
- `--bo-color-action-outline-bg`
- `--bo-color-action-outline-fg`
- `--bo-color-tab-hover-bg`
- `--bo-color-tab-hover-border`
- `--bo-color-tab-active-bg`

#### Shadow/glow tokens

- `--shadow-xs`
- `--shadow-sm`
- `--shadow-md`
- `--bo-color-shell-shadow`
- `--bo-color-shell-shadow-elevated`
- `--bo-color-content-shadow`
- `--bo-color-content-shadow-elevated`
- `--bo-color-tab-shell-shadow`
- `--bo-color-tab-hover-shadow`
- `--bo-color-tab-active-shadow`
- `--bo-color-action-shadow`
- `--bo-color-action-shadow-hover`
- `--bo-color-control-shadow`

#### Base semantic tokens

- `--clr-success`
- `--clr-danger`
- `--clr-warning`
- `--bo-brand-info`

These exist, but semantic/status ownership is still intentionally deferred.

### 2. Reports subsystem tokens in `reports.css`

[`reports.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css) has a secondary subsystem token layer:

- `--reports-surface`
- `--reports-surface-soft`
- `--reports-surface-contrast`
- `--reports-border`
- `--reports-border-strong`
- `--reports-text`
- `--reports-muted`
- `--reports-accent`
- `--reports-accent-rgb`
- `--reports-success`
- `--reports-warning`
- `--reports-error`
- `--reports-shadow`

This is useful, but it is partly hybrid:

- some values reference `core.css` tokens
- some fallback values still preserve older blue defaults

### 3. Hardcoded colors still active in `app.css`, `reservations.css`, `reports.css`

Most common hardcoded hex usage from the current active files includes:

- `#f8fafc`
- `#1f2937`
- `#1f2d52`
- `#1d4ed8`
- `#2563eb`
- `#e2e8f0`
- `#f1f5f9`
- `#93c5fd`

Most common hardcoded rgba stacks include:

- `rgba(76, 110, 245, ...)`
- `rgba(93, 133, 255, ...)`
- `rgba(37, 55, 88, ...)`
- `rgba(24, 33, 59, ...)`
- `rgba(226, 232, 240, ...)`
- `rgba(148, 163, 184, ...)`
- `rgba(59, 130, 246, ...)`

These are the clearest signs of residual blue/navy subsystem drift.

## Hardcoded color drift

### 1. Surface drift

The strongest mismatch is between tokenized olive/slate surfaces and residual blue/navy local surfaces.

Main drift patterns:

- [`app.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
  still contains deep blue page-grid and dark-shell gradients near the top of the file
- [`reservations.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)
  still contains many blue-gradient inputs, chips, pagination surfaces, and panel backgrounds
- [`reports.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css)
  is more tokenized now, but still carries blue-oriented fallback accent values

### 2. Text drift

Text is less fragmented than surfaces, but there is still repeated hardcoding:

- `#f8fafc`
- `#f1f5f9`
- `#e2e8f0`
- `#1f2d52`
- `#1f2937`

Many of these should ultimately collapse into:

- primary text
- muted text
- inverted/on-accent text

### 3. Border drift

Many border colors are still one-off blues instead of tokenized control/content borders:

- `rgba(148, 163, 255, ...)`
- `rgba(93, 133, 255, ...)`
- `rgba(37, 99, 235, ...)`

These create the “older blue product” effect even after surface cleanup.

### 4. Control drift

Reservations is the biggest remaining source of hardcoded control color drift:

- blue-gradient search and filter fields
- blue focus rings and shadows
- blue utility outlines
- repeated navy panel/control combinations

This area is the clearest future migration candidate, but only in bounded batches.

### 5. Accent drift

Accent usage currently mixes three jobs:

- brand accent
- actionable emphasis
- semantic/status meaning

This causes overlap between:

- olive/green brand-ish tones
- blue interactive tones
- yellow/red/green semantic tones

### 6. Shadow/glow drift

Shadows are only partly normalized.

Good:

- `core.css` has a solid shadow token system

Remaining drift:

- local blue glows
- local dark navy shadows
- one-off control shadows in reservations/app

## Proposed token structure

The active UI does not need a brand-new token system. It needs a clearer structure built on the existing `core.css` foundation.

### Recommended token families

#### A. Surface tokens

Keep and expand around:

- `--bo-color-page-bg-*`
- `--bo-color-shell-*`
- `--bo-color-content-*`
- `--bo-color-content-muted-*`
- `--bo-color-empty-*`

Recommended future additions only if needed:

- `--bo-color-surface-raised-bg`
- `--bo-color-surface-raised-border`
- `--bo-color-surface-inset-bg`

#### B. Text tokens

Normalize around:

- `--bo-color-text-primary`
- `--bo-color-text-muted`

Recommended future additions:

- `--bo-color-text-inverse`
- `--bo-color-text-soft`
- `--bo-color-text-emphasis`

#### C. Border tokens

Normalize around:

- `--bo-color-border-soft`
- `--bo-color-border-strong`
- `--bo-color-content-border`
- `--bo-color-control-border`

Recommended future additions:

- `--bo-color-border-accent-soft`
- `--bo-color-border-focus`

#### D. Control tokens

Keep current core family as the real shared owner:

- `--bo-color-control-bg`
- `--bo-color-control-hover-bg`
- `--bo-color-control-focus-border`
- `--bo-color-control-focus-ring`
- `--bo-color-control-placeholder`
- `--bo-color-control-disabled-bg`

Recommended future additions:

- `--bo-color-control-readonly-bg`
- `--bo-color-control-invalid-border`

#### E. Accent/action tokens

Separate interactive emphasis from semantic meaning:

- keep:
  - `--bo-color-action-*`
  - `--bo-color-tab-*`
  - `--bo-color-accent-*`

Recommended future split:

- `action` = buttons, interactive emphasis
- `accent` = brand/decorative emphasis
- `info/highlight` = informational emphasis only if truly needed

#### F. Semantic/status tokens

Explicitly blocked for now.

These should remain deferred:

- success
- warning
- danger
- status badges
- payment state
- reservation state

#### G. Shadow/glow tokens

Current global shadow tokens are good enough to become the standard owner.

Recommended future grouping:

- `--bo-shadow-surface`
- `--bo-shadow-surface-elevated`
- `--bo-shadow-control`
- `--bo-shadow-focus`
- `--bo-shadow-action`

Right now some of those are represented indirectly through mixed `--shadow-*` and `--bo-color-*shadow*` names.

## Migration priorities

### Safe future migration candidates

These are worth doing later in bounded batches:

1. Reservations hardcoded control blues
   - search/filter/pagination/control clusters
   - repeated `rgba(76, 110, 245, ...)`, `rgba(93, 133, 255, ...)`, `#1f2d52`

2. App-level residual blue action and surface one-offs
   - especially local dark overlays, detached deep-blue shells, and one-off utility states

3. Reports token cleanup
   - remove blue fallback defaults where reports tokens already exist and can safely defer to core token families

4. Text/border normalization
   - replace repeated `#f8fafc`, `#e2e8f0`, `#f1f5f9`, `rgba(148, 163, 184, ...)` where a shared text/border token already exists

### Blocked semantic/status colors

Do not fold these into generic token cleanup yet:

- payment status colors
- reservation status colors
- maintenance status colors
- badges/chips with semantic meaning
- financial/warning/error emphasis beyond structural UI shells

These are intentionally deferred because they need semantic ownership decisions, not just token substitution.

### Acceptable one-off accents

These can remain for now:

- chart/data accents in reports
- tightly scoped visual emphasis tied to a specific reporting or interaction context
- a small number of contextual highlights where semantic meaning or strong emphasis is intentional

The key rule is that one-off accents should not become the default surface/control language.

## Recommended next step

This audit does not justify a broad color replacement pass.

Best next bounded batch, if you want one:

`Reservations hardcoded blue control residue audit`

Scope:

- inventory the remaining repeated hardcoded blue/navy values in [`reservations.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)
- group them by control cluster
- decide which ones can later migrate to existing `core.css` control/surface tokens without touching semantic/status styling

If you do not want another audit right now, stopping here is also reasonable. The token foundation is already clear enough for future bounded work.
