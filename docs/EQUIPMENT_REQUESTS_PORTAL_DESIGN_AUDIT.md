> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Equipment Requests Portal Design Audit

## Executive summary

The Equipment Requests portal is now technically stabilized, but it remains visually outside the active back-office design language.

It still uses an older blue-led ERP visual system:

- blue/navy shell and panels
- blue-accent brand chip
- bright white forced table header
- blue hover/active request row treatment
- blue utility action/button styling

This does not mean it should be migrated immediately into the main app. It means it should be tracked as a separate `legacy portal visual alignment` follow-up.

Recommended position on the roadmap:

- main active-bundle roadmap remains closed
- portal gets its own bounded visual alignment track

Recommended next bounded batch:

- `Equipment Requests portal shell and table-surface unification`

That is the highest-value first step because it would reduce the strongest visual mismatch without changing behavior or trying to redesign the whole subsystem at once.

## Current subsystem visual map

### Files owning the portal look

- [`Arino - Template/equipment-requests-portal.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html)
- [`Arino - Template/assets/css/equipment-requests-portal.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/css/equipment-requests-portal.css)

### Main UI clusters on the page

1. Shell and topbar
   - `body`
   - `.erp-shell`
   - `.erp-header`
   - `.erp-brand-link`
   - `.erp-brand-link__logo`

2. Main layout surfaces
   - `.erp-requests-panel`
   - `.erp-details-panel`
   - `.erp-card`
   - `.erp-empty-state`

3. Filters and form controls
   - `.erp-filters`
   - `input, select, textarea`

4. Requests list and details tables
   - `.erp-table`
   - `.erp-table--requests-head-white`
   - row hover / active states

5. Actions
   - `.erp-btn`
   - `.erp-btn-primary`
   - `.erp-btn-secondary`
   - `.erp-btn-success`
   - `.erp-btn-warning`
   - `.erp-btn-danger`
   - `.erp-btn-retry-email`

6. Message log and alerts
   - `.erp-message-log`
   - `.erp-email-failures`
   - `.erp-toast`

7. Status chips / item tags
   - `.erp-status`
   - `.erp-status--pending`
   - `.erp-status--confirmed`
   - `.erp-status--cancelled`
   - `.erp-item-tag--*`

## Current visual system

### Portal-local token set

The portal defines its own dark palette:

- `--erp-bg: #0d1320`
- `--erp-surface: #141c2c`
- `--erp-surface-2: #1b2438`
- `--erp-border: #2b3650`
- `--erp-text: #eef3ff`
- `--erp-muted: #a9b5d0`
- `--erp-primary: #4f8cff`

This is a coherent mini-system, but it is the older blue/indigo system, not the active olive/slate one.

### Comparison to active back-office language

The current active back-office dark system in [`src/styles/core.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css) is olive/slate-led:

- shell and content surfaces use green/olive/slate gradients
- control surfaces use muted olive/slate borders and fills
- action emphasis is calmer and more restrained
- table headers and cards no longer use strong blue/navy defaults

The portal does not participate in that system.

## Main inconsistencies

### 1. Shell mismatch

Portal shell:

- `body` uses `radial-gradient(circle at top right, #1a2740 0%, var(--erp-bg) 45%)`
- `.erp-header`, `.erp-requests-panel`, `.erp-details-panel` use navy surfaces

Main app shell:

- olive/forest/slate gradients
- softer mixed green/slate borders
- calmer shell shadows

This is the most immediate “different product” signal.

### 2. Table/header mismatch

The requests list table is especially detached:

- row hover/active states are bright blue-based
- the special class `.erp-table--requests-head-white` forces an extra-bright white header

That makes the table feel visually louder than the rest of the screen and unlike the standardized table surfaces in the active app.

### 3. Action mismatch

The portal action system is old-style functional but visually uneven:

- `.erp-btn-primary` is blue
- `.erp-btn-secondary` is a separate steel/navy fill
- retry mail action is blue outline-ish
- warning/success/danger are direct local semantic colors

The result is usable, but more “utility admin panel” than the olive/slate action hierarchy now used elsewhere.

### 4. Empty-state and card mismatch

The empty state and cards are structurally fine, but their visual treatment is older:

- `.erp-card` uses a harder navy inset-like surface
- `.erp-empty-state` is plain dashed navy-border placeholder
- message log entries use near-black overlays rather than the newer muted content surfaces

### 5. Brand-link accent mismatch

The logo chip in `.erp-brand-link__logo` uses a blue border and blue translucent fill.

It is small, but it reinforces the older blue identity immediately in the header.

## Classification of portal visual work

### Worth fixing now

These are the highest-value portal design items:

1. Shell / panel / card surface unification
2. Requests table header + row state unification
3. Utility action/button calming

These three would materially reduce the “legacy page” feeling without requiring migration.

### Worth fixing later

These are lower priority but still useful:

1. Empty-state refinement
2. Message log / toast visual alignment
3. Brand-link logo chip accent cleanup

### Acceptable as-is for now

These can stay until a later pass:

1. Semantic status chip colors
2. Item-status availability colors
3. Success / warning / danger meaning colors

They have semantic meaning and should not be folded into generic aesthetic cleanup casually.

### Blocked by semantic/status work

Do not treat these as generic style cleanup first:

- `.erp-status--pending`
- `.erp-status--confirmed`
- `.erp-status--cancelled`
- `.erp-item-tag--pending`
- `.erp-item-tag--available`
- `.erp-item-tag--unavailable`

These belong to semantic/status ownership rather than simple surface alignment.

## Recommended visual direction

The portal should align to the same olive/slate dark language already used in the active back-office UI, but without pretending it is now part of the main `src/styles` architecture.

That means:

- calmer green/slate shell and content surfaces
- reduced blue/navy dominance
- more restrained hover/active treatment
- stronger grouping through muted content surfaces instead of darker indigo blocks
- keep semantic colors where they represent actual request status meaning

## Recommended follow-up roadmap

### Track name

`Legacy portal visual alignment`

### Sequence

1. Audit
   - complete with this document

2. First bounded batch
   - `Equipment Requests portal shell and table-surface unification`

3. Second bounded batch
   - `Equipment Requests portal action and utility control unification`

4. QA/stabilization
   - visual QA for local + production assumptions

### Recommended next bounded batch

`Equipment Requests portal shell and table-surface unification`

Scope:

- `body`
- `.erp-header`
- `.erp-requests-panel`
- `.erp-details-panel`
- `.erp-card`
- `.erp-empty-state`
- `.erp-table`
- `.erp-table--requests-head-white`
- requests-row hover / active states

Why this should come first:

- biggest visible mismatch today
- affects the whole screen’s first impression
- can be done without changing auth/bootstrap logic
- does not require touching semantic/status ownership yet

## What not to do yet

- do not migrate the portal into `src/pages`
- do not try to merge it into `core.css` / `app.css`
- do not redesign semantic status colors first
- do not broaden into template-wide cleanup

## Conclusion

The Equipment Requests portal absolutely belongs back on the roadmap, but as a separate legacy visual alignment track.

It is:

- technically stabilized
- still visibly legacy
- actively used
- worth one or two bounded design passes

The best next step is a tightly scoped shell + table-surface unification batch, not migration and not broad redesign.
