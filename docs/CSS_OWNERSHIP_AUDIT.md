> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# CSS Ownership Audit

Scope:
- Active runtime CSS only
- Primary files:
  - `src/styles/core.css`
  - `src/styles/app.css`
- Explicitly out of scope:
  - `src/styles/templatesA4.css`
  - `src/styles/reportsA4.css`
  - `src/styles/quotePdf.css`
- Deferred by design:
  - semantic/status styling
  - accent-heavy styling
  - gradients, glows, badges, legends, chips

## Purpose

This document defines long-term CSS ownership between `core.css` and `app.css` after the safe cleanup/token migration pass. It is an architecture plan, not a broad cleanup instruction.

The main risk at this stage is:
- `core.css` still owns the shared dark baseline
- `app.css` still contains late runtime overrides that win by import order

That means future work must be planned by subsystem, not by search-and-replace.

## Import And Precedence Rules

`src/styles/app.css` imports shared sheets in this order:

1. `core.css`
2. `maintenance.css`
3. `reservations.css`
4. `tabs.css`
5. `reports.css`
6. `calendar.css`
7. `forms.css`

Then `app.css` continues with its own rules.

Practical precedence:
- Later rules in `app.css` win over `core.css` when selector specificity is comparable.
- `:is(...)` and `:where(...)` are not interchangeable.
- `:where(...)` has zero specificity.
- `:is(...)` carries the specificity of its most specific argument.
- Broad `.dark` to `.dark-mode` conversion is unsafe because it can change both coverage and precedence.

## Ownership Model

### What `core.css` Owns

`core.css` should remain the source-of-truth for:

- shared design tokens
  - light and dark token blocks
  - content/control/table surface tokens
- generic shared dark baseline
  - body/page-level token application
  - shared typography and muted text
- shared primitive controls
  - generic `input`, `select`, `textarea`
  - generic `.form-control`, `.form-select`
  - shared focus, placeholder, and autofill behavior
- shared primitive surfaces
  - generic `.card`
  - generic `table`
  - generic `.modal-content` baseline
- Bootstrap-style dark table ownership
  - `.table`
  - `.table-dark`
  - `.table-striped`
  - `.table-bordered`
- shared plugin/utility styling
  - flatpickr base and dark theme
  - theme toggle and shared utility controls
- project-level shared component system already living in `core.css`
  - project focus cards
  - project details surfaces
  - project tables

Classification:
- keep:
  - token blocks
  - shared dark baseline
  - shared form/control baseline
  - shared table baseline
  - flatpickr primary owner block
- move later:
  - old page-specific dark rules that still look historical inside `core.css`
- duplicate ownership conflict:
  - shared controls when `app.css` restyles them globally
  - shared modal/table surfaces when `app.css` adds late app-level dark handling
- legacy override:
  - malformed or mixed flatpickr alias selectors that were kept only because they still affected live `.dark` paths
- unknown / needs audit:
  - any remaining `.dark` plus `.dark-mode` mixed utility blocks outside the flatpickr area

### What `app.css` Owns

`app.css` should remain the source-of-truth for:

- app shell and dashboard runtime surfaces
  - page grid
  - dashboard shell
  - sidebar
  - greeting and summary surfaces
- app-specific late global control behavior
  - custom select arrow treatment
  - enhanced-select component
  - app-level focus/hover treatment for controls
- global modal runtime theme
  - Bootstrap modal dark ownership already consolidated here
- page-scoped runtime overrides
  - `.customer-page`
  - `.technician-page`
  - management-form-specific behavior
- app-specific modal/table wrappers
  - technician financial modal wrappers and transparency rules
- app runtime helpers and drawer/navigation behavior

Classification:
- keep:
  - dashboard/app shell surfaces
  - modal runtime ownership
  - enhanced-select runtime ownership
  - customer/technician page overrides
  - management-form-specific overrides
- move later:
  - only if a later subsystem audit proves a rule belongs in a page stylesheet instead of the app shell
- duplicate ownership conflict:
  - global generic control layer overlapping `core.css`
  - some generic surfaces that restyle shared `.card`, `.box`, `.table-responsive`
- legacy override:
  - small duplicate dark control selectors already partly reduced in prior batches
  - some combined dark compatibility selectors around technician modal controls/close buttons
- unknown / needs audit:
  - remaining global control and modal clusters where app-level ownership may be broader than necessary

## Ownership Map By Subsystem

### 1. App Shell / Dashboard Surfaces

Primary owner:
- `src/styles/app.css`

Why:
- these are app-shell concerns, not shared primitives
- dark runtime behavior is intentionally app-specific

Status:
- keep

Risk:
- high if touched broadly
- many rules use `:where(html.dark, body.dark)` and rely on import order rather than specificity

### 2. Global Forms And Controls

Primary owner:
- baseline in `src/styles/core.css`
- late runtime overrides in `src/styles/app.css`

Why:
- `core.css` defines the shared baseline
- `app.css` re-skins generic controls with app tokens and custom select behavior

Status:
- duplicate ownership conflict

Notes:
- this overlap is intentional enough that it should not be collapsed blindly
- recent cleanup already removed proven internal duplicates inside `app.css`

Risk:
- high
- shared baseline and app runtime behavior are currently layered, not cleanly separated

### 3. Customer / Technician Page Overrides

Primary owner:
- `src/styles/app.css`

Why:
- they are explicit page-scoped runtime systems
- they intentionally replace shared surfaces with page-scoped tokens and variables

Status:
- keep

Risk:
- high
- these blocks mix surfaces, controls, stats, tabs, and financial presentation

### 4. Shared Modal Primitives

Primary owner:
- shared modal baseline in `src/styles/core.css`
- runtime dark modal ownership in `src/styles/app.css`

Status:
- duplicate ownership conflict, but tolerated

Interpretation:
- `core.css` owns generic modal primitive defaults
- `app.css` owns the actual active dark modal theme in the runtime bundle

Risk:
- medium-high
- modal close-button and technician modal blocks include compatibility-heavy selectors

### 5. Shared Utility / Plugin Styling

Primary owner:
- `src/styles/core.css`

Examples:
- flatpickr base and dark theme

Status:
- keep

Legacy/alias residue:
- a few later flatpickr compatibility aliases existed and were partially cleaned
- most remaining flatpickr cleanup candidates are now exhausted or need value decisions, not selector cleanup

Risk:
- medium
- plugin styling is shared and can affect many pages at once

### 6. Table-Related Late Overrides

Primary owner:
- shared Bootstrap-style dark table ownership in `src/styles/core.css`
- app/page-specific table wrappers in `src/styles/app.css`

Status:
- split ownership

Interpretation:
- `core.css` owns shared `.table`
- `app.css` owns specific runtime wrappers and page-scoped table presentation

Risk:
- high if mixed together in the same batch

## Tolerated Temporary Override Patterns

The following patterns are acceptable for now:

- `core.css` owns shared baseline, `app.css` overrides later for runtime-specific visuals
- `app.css` page-scoped selectors override generic shared primitives
- modal-specific and customer/technician-specific dark rules in `app.css`
- flatpickr owner block in `core.css` with a very small number of remaining compatibility/value differences only if still proven live

These patterns should be tolerated until a subsystem-specific migration plan exists.

## High-Risk Selector Families

Do not broad-normalize these without subsystem audit:

- `:where(html.dark, body.dark) ...` in `app.css`
- mixed `:is(html.dark-mode, body.dark-mode)` and `:where(html.dark, body.dark)` across the same subsystem
- combined selectors mixing:
  - `.dark`
  - `.dark-mode`
  - `[data-theme="dark"]`
- global control selectors
  - `.form-control`
  - `.form-select`
  - `input`, `select`, `textarea`
- shared modal selectors
  - `.modal-content`
  - `.modal-header`
  - `.modal-footer`
  - `.btn-close`
- shared surface selectors
  - `.card`
  - `.box`
  - `.table-responsive`

Reason:
- these selectors carry real cascade weight
- changing them can alter active runtime behavior without changing a single declaration

## Ownership Conflicts

### Conflict A: Shared Controls

Files:
- `src/styles/core.css`
- `src/styles/app.css`

Conflict:
- `core.css` owns the dark control baseline
- `app.css` later redefines generic runtime controls using the app token set

Current decision:
- keep both for now
- only remove proven duplicate subsets inside `app.css`

### Conflict B: Modal Layering

Files:
- `src/styles/core.css`
- `src/styles/app.css`

Conflict:
- modal primitives exist in `core.css`
- active dark modal runtime theme lives in `app.css`

Current decision:
- app runtime modal ownership stays in `app.css`
- no broad modal consolidation yet

### Conflict C: Generic Surfaces vs Page Scopes

Files:
- `src/styles/core.css`
- `src/styles/app.css`

Conflict:
- shared surfaces exist in `core.css`
- customer/technician/app-shell surfaces override them in `app.css`

Current decision:
- treat page scopes as authoritative within those scoped contexts

## Later Migration Candidates

These are candidates for future bounded batches, not immediate cleanup:

### Batch Candidate 1

Scope:
- `src/styles/app.css`
- global control layer only

Goal:
- split true app-wide control overrides from duplicated generic rules

Risk:
- medium-high

### Batch Candidate 2

Scope:
- `src/styles/app.css`
- technician financial modal only

Goal:
- classify transparency/table wrapper rules into:
  - real owner
  - compatibility alias
  - removable residue

Risk:
- medium-high

### Batch Candidate 3

Scope:
- `src/styles/core.css`
- remaining flatpickr compatibility/value differences only

Goal:
- finish plugin ownership cleanup without touching app-wide controls

Risk:
- medium

### Batch Candidate 4

Scope:
- `src/styles/app.css`
- modal close-button compatibility selectors only

Goal:
- decide whether combined dark compatibility selectors can be reduced later

Risk:
- medium

## What Should Not Be Touched Yet

- broad `.dark` to `.dark-mode` conversion
- broad `:where(...)` to `:is(...)` conversion
- semantic/status systems
- customer/technician page-scoped dark presentation
- app shell/dashboard surface ownership
- any design consistency work mixed into an ownership batch

## Current Recommendations

1. Treat `core.css` as the long-term owner of:
   - tokens
   - shared primitives
   - shared flatpickr
   - shared table baseline

2. Treat `app.css` as the long-term owner of:
   - app shell
   - runtime modal theme
   - page-scoped dark overrides
   - enhanced-select runtime behavior

3. Do not attempt a broad cleanup pass now.

4. Future changes should happen in bounded subsystem batches, with each batch answering one ownership question only.

## Current Overall State

- Safe cleanup: essentially complete
- Architecture review: active
- Remaining work: mostly ownership planning plus optional design consistency work

