> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Dark Controls Audit

Scope:
- `src/styles/core.css`
- `src/styles/app.css`

Out of scope:
- semantic/status styling
- export/template CSS
- broad cleanup
- design-language unification

## Executive Summary

The shared dark control system is currently split across two layers:

- `src/styles/core.css` owns the shared baseline dark control system
- `src/styles/app.css` owns the active runtime presentation for generic controls, enhanced-select, management-form variants, modal runtime behavior, and page-scoped control overrides

This split is currently functional but architecturally layered. The main reason `app.css` wins is not usually higher specificity. It wins because:

- it is imported after `core.css`
- it redefines overlapping generic controls using app tokens
- it introduces page-scoped and component-scoped control behavior not present in `core.css`

The current system is acceptable as a temporary architecture, but it has real ownership conflict in the global control layer. Future migration must happen in bounded batches, not global deduplication.

## Current Ownership Map

### Baseline owned correctly by `core.css`

`core.css` correctly owns the shared baseline dark control system:

- generic controls
  - `input`
  - `select`
  - `textarea`
  - `.form-control`
  - `.form-select`
- generic dark label and placeholder behavior
- generic dark focus behavior
- generic dark autofill behavior
- shared flatpickr dark owner block
- shared button primitives such as:
  - `.btn-secondary`
  - `.btn-outline-secondary`
  - `.btn-soft-*`
  - `.form-check-input`

Representative selectors:

- [core.css#L2423](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2423)
  `:is(html.dark-mode, body.dark-mode) input, select, textarea`
- [core.css#L2437](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2437)
  `:is(html.dark-mode, body.dark-mode) input::placeholder, textarea::placeholder`
- [core.css#L2442](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2442)
  `:is(html.dark-mode, body.dark-mode) input:focus, select:focus, textarea:focus`
- [core.css#L2466](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2466)
  `:is(html.dark-mode, body.dark-mode) .form-control, .form-select, textarea`
- [core.css#L2475](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2475)
  `:is(html.dark-mode, body.dark-mode) .form-control:focus, .form-select:focus, textarea:focus`

Classification:
- keep

### Runtime override correctly owned by `app.css`

`app.css` correctly owns the active runtime control presentation where the app intentionally diverges from the shared baseline:

- app-wide select styling
  - custom arrow SVG
  - custom hover/focus shadow
  - RTL arrow positioning
- enhanced-select runtime controls
  - trigger
  - trigger arrow
  - menu
  - option hover
  - selected option state
- management-form-specific controls
- page-scoped customer/technician control systems
- modal runtime form-label/text styling
- some app-level autofill handling

Representative selectors:

- [app.css#L4937](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4937)
  `:where(html.dark, body.dark) .form-select, select.form-select`
- [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949)
  `:where(html.dark, body.dark) .enhanced-select__trigger`
- [app.css#L4973](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4973)
  `:where(html.dark, body.dark) .enhanced-select__menu`
- [app.css#L4996](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4996)
  `:where(html.dark, body.dark) .form-select:hover, :focus, :focus-visible`
- [app.css#L991](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L991)
  `:where(html.dark, body.dark) .management-form .form-control, .form-select, textarea`
- [app.css#L5078](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5078)
  `:where(html.dark, body.dark) .customer-page .form-control, ...`

Classification:
- keep

### Ownership conflict

The main shared dark control conflict is between:

- `core.css` generic dark controls at [core.css#L2423](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2423) through [core.css#L2477](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2477)
- `app.css` global runtime controls at [app.css#L4928](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4928) through [app.css#L5035](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5035)

Conflict characteristics:

- both files style the same broad control families
- `core.css` uses `.dark-mode`
- `app.css` uses `.dark`
- `app.css` wins by import order for active runtime pages
- both layers style:
  - backgrounds
  - borders
  - placeholder colors
  - focus states
  - autofill behavior

Classification:
- duplicate ownership conflict

### Legacy tolerated override

These should remain tolerated for now:

- `app.css` global control layer overriding `core.css` baseline
- page-scoped customer/technician control overrides
- management-form-specific control overrides
- `app.css` autofill handling where it extends shared behavior
- flatpickr compatibility/value differences already narrowed in `core.css`

Classification:
- legacy override

### Candidate for later migration

Later migration candidates should be treated as bounded batches only:

- global generic controls in `app.css`
- enhanced-select runtime system
- page-scoped customer/technician controls
- shared modal form-label/runtime text styling

Classification:
- candidate for later migration

### Unknown / needs manual review

- any global `.dark` control selectors in `app.css` that overlap with shared core controls but also affect utility wrappers or plugin-generated markup
- any remaining select/autofill/flatpickr interaction where runtime differences are subtle and browser-dependent

Classification:
- unknown / needs manual review

## Selector Families Involved

### In `core.css`

- `:is(html.dark-mode, body.dark-mode) ...`
- `:is(html.dark-mode, body.dark-mode, html.dark, body.dark) ...` for flatpickr/shared utility ownership
- small number of mixed utility alias families in plugin styling

### In `app.css`

- `:where(html.dark, body.dark) ...`
- `:is(html.dark-mode, body.dark-mode) ...` in a few narrower areas
- combined compatibility selectors in some modal/close-button blocks

## Conflict Analysis

### Why `app.css` is currently winning

1. Import order
- `app.css` imports `core.css` first, then continues with its own rules later.
- For broad generic control selectors, later `app.css` rules win without needing higher specificity.

2. Broader runtime scope
- `app.css` applies a generic dark runtime layer to:
  - `.form-select`
  - `input:not(...)`
  - `select`
  - `textarea`
  - placeholders/options
- This effectively restyles the active runtime control surface.

3. Duplicated state styling
- both files define:
  - base dark fill
  - focus border/ring
  - placeholder coloring
- values are not identical, so the later layer meaningfully changes behavior.

4. Component/page leakage into shared controls
- page-scoped blocks such as `.customer-page` are valid owners
- but they sit near generic global control rules in the same file, which makes the control layer harder to reason about

## Representative Selector Inventory

### Shared baseline in `core.css`

- [core.css#L2423](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2423)
  `:is(html.dark-mode, body.dark-mode) input, select, textarea`
- [core.css#L2437](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2437)
  `:is(html.dark-mode, body.dark-mode) input::placeholder, textarea::placeholder`
- [core.css#L2442](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2442)
  `:is(html.dark-mode, body.dark-mode) input:focus, select:focus, textarea:focus`
- [core.css#L2451](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2451)
  `:is(html.dark-mode, body.dark-mode) input:-webkit-autofill...`
- [core.css#L2466](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2466)
  `:is(html.dark-mode, body.dark-mode) .form-control, .form-select, textarea`
- [core.css#L2475](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L2475)
  `:is(html.dark-mode, body.dark-mode) .form-control:focus, .form-select:focus, textarea:focus`

### Active runtime layer in `app.css`

- [app.css#L4928](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4928)
  disabled generic controls
- [app.css#L4937](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4937)
  `.form-select, select.form-select`
- [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949)
  `.enhanced-select__trigger`
- [app.css#L4960](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4960)
  `.enhanced-select__trigger:hover, :focus-visible`
- [app.css#L4973](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4973)
  `.enhanced-select__menu`
- [app.css#L4996](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4996)
  `.form-select:hover, :focus, :focus-visible`
- [app.css#L5014](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5014)
  `input:not(...), select, textarea`
- [app.css#L5022](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5022)
  `input::placeholder, textarea::placeholder, select option`
- [app.css#L5028](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5028)
  `.form-control:focus, input.flatpickr-input:focus, .form-select:focus, textarea:focus`

### Page-scoped runtime owners

- [app.css#L5078](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5078)
  `.customer-page` control fill/border/text
- [app.css#L5090](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5090)
  `.customer-page` focus states
- [app.css#L991](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L991)
  management-form controls

## Tolerated Temporary Overrides

These are acceptable temporary behaviors and should stay as-is for now:

- `core.css` generic control baseline overridden by later `app.css` generic control runtime layer
- `app.css` custom select arrow and select shadow system
- `app.css` enhanced-select trigger/menu/option system
- `app.css` management-form control overrides
- page-scoped customer/technician control overrides
- app-level placeholder/option coloring where it matches active runtime presentation

Reason:
- these are active runtime owners, not just dead duplicates
- removing them without a subsystem migration would change live UI behavior

## Risky Patterns

- broad generic controls defined in both files
- mixed selector families:
  - `:is(html.dark-mode, body.dark-mode)`
  - `:where(html.dark, body.dark)`
- generic control states duplicated in both files
- global app rules and page-scoped rules living close together in `app.css`
- browser-sensitive autofill/select/flatpickr interactions

## What Should Stay As-Is For Now

- `core.css` shared baseline dark controls
- `app.css` global select and enhanced-select runtime rules
- `app.css` management-form dark controls
- `app.css` customer-page control overrides
- any modal or page-scoped control cluster adjacent to this system

## What Can Move Later In Bounded Batches

### Batch 1
Scope:
- `app.css` global generic control block only
- [app.css#L4928](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4928) through [app.css#L5035](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5035)

Goal:
- split true runtime ownership from values that belong in the shared baseline

### Batch 2
Scope:
- `app.css` enhanced-select only

Goal:
- decide whether enhanced-select should stay app-owned permanently or move later to a dedicated component stylesheet

### Batch 3
Scope:
- `app.css` management-form controls only

Goal:
- document whether those are permanent app-owned overrides or can be rehomed later

### Batch 4
Scope:
- `app.css` customer/technician page control system only

Goal:
- keep as page-scoped ownership unless a later page-local extraction is desired

## Recommended Future Migration Sequence

1. Keep `core.css` as shared control baseline owner
2. Keep `app.css` as active runtime owner for selects and enhanced-select
3. Audit the generic control block in `app.css` for value-level overlap only
4. Do not migrate customer/technician controls until the generic control layer is clearer
5. Keep semantic/status/design work out of this sequence

## SAFE_OPTIONAL_EDITS

No immediate optional edits are recommended from this audit.

Reason:
- the low-risk duplicate cleanups in the generic dark control block were already reduced
- what remains is mostly intentional runtime ownership or higher-risk architecture overlap

