> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Equipment Requests Portal Actions Audit

## Executive summary

After the shell and table-surface unification, the biggest remaining visual drift in the Equipment Requests portal is now the action system.

The page still uses an older utility-admin button language:

- blue primary message action
- steel/navy secondary utility buttons
- blue retry-email utility action
- direct semantic fill buttons for status changes

That means the page surface now feels closer to the olive/slate back-office UI, but the actions still feel like the older blue ERP subsystem.

Recommended next bounded batch:

- `Equipment Requests portal action and utility control unification`

This should be scoped to the portal only and should focus on:

- topbar utility actions
- filter apply action
- message send action
- retry-email utility action
- hover/focus/disabled treatment

It should explicitly avoid redesigning semantic status colors in this pass.

## Current action map

### 1. Topbar utility actions

Markup:

- `#erp-refresh-btn` with `.erp-btn .erp-btn-secondary`
- `#erp-logout-btn` with `.erp-btn .erp-btn-danger`

Current role classification:

- refresh: `secondary utility`
- logout: `destructive utility`

### 2. Filters action

Markup:

- `#erp-apply-filter-btn` with `.erp-btn .erp-btn-secondary`

Current role classification:

- apply filter: `secondary utility`

### 3. Request status action cluster

Markup:

- `[data-set-status='pending']` with `.erp-btn .erp-btn-warning`
- `[data-set-status='confirmed']` with `.erp-btn .erp-btn-success`
- `[data-set-status='cancelled']` with `.erp-btn .erp-btn-danger`

Current role classification:

- pending: `semantic status action`
- confirmed: `semantic status action`
- cancelled: `destructive semantic action`

These should remain largely outside the next visual batch because they are semantic/status-linked.

### 4. Message form action

Markup:

- submit button in `#erp-message-form` with `.erp-btn .erp-btn-primary`

Current role classification:

- send message: `primary action`

### 5. Retry-email utility action

Rendered from JS:

- `.erp-btn-retry-email`

Current role classification:

- retry failed email: `utility/outline-like action`

### 6. Local state behavior

Interactive state coverage is minimal and mostly implicit:

- `.erp-btn:disabled`
- `.erp-btn-retry-email:disabled`

There are no dedicated:

- hover states
- focus-visible states
- active states

for the main button family.

That is one reason the action system feels less refined than the active back-office UI.

## Current visual drift

### 1. Primary action drift

`.erp-btn-primary` still uses:

- `background: var(--erp-primary)`

with:

- `--erp-primary: #4f8cff`

That keeps the main send-message action blue-led rather than aligned with the olive/slate action system used elsewhere.

### 2. Secondary utility drift

`.erp-btn-secondary` still uses:

- `background: #3a4560`

This reads as a steel/navy utility color, not part of the calmer action/tab-outline language of the main app.

### 3. Retry-email action drift

`.erp-btn-retry-email` still uses:

- `background: rgba(79, 140, 255, 0.18)`
- `border: 1px solid rgba(79, 140, 255, 0.55)`
- `color: #dce9ff`

This is one of the clearest leftover blue utility controls on the page.

### 4. Missing hover/focus hierarchy

The current portal button system mostly relies on base fills only.

Compared to the active back-office UI, it lacks:

- restrained hover elevation
- focus-visible ring clarity
- active-state hierarchy
- better differentiation between primary and utility actions

### 5. Semantic actions should not be normalized yet

The status action cluster:

- warning
- success
- danger

is visually louder, but that is partly because those buttons encode request state meaning.

That makes them a poor target for the first action-unification pass.

## Recommended classification

### Fix in the next bounded batch

These are worth changing now:

1. `.erp-btn-primary`
   - move toward olive/slate primary action treatment

2. `.erp-btn-secondary`
   - move toward calmer utility/outline-compatible dark action treatment

3. `.erp-btn-retry-email`
   - move away from blue highlight styling

4. shared `.erp-btn` interaction states
   - add hover/focus-visible/disabled refinement for the portal button family

### Keep semantic meaning, but defer bigger changes

These should mostly stay as-is in the next batch:

1. `.erp-btn-success`
2. `.erp-btn-warning`
3. `.erp-btn-danger`

Possible minor refinement later:

- calm their border/shadow treatment
- keep their semantic hue intact

But not in the first action batch.

### Acceptable for now

These do not need separate attention yet:

- `.erp-btn-link`
- generic disabled opacity behavior

## Recommended next bounded batch

### Batch name

`Equipment Requests portal action and utility control unification`

### Scope

Change only:

- `.erp-btn`
- `.erp-btn-primary`
- `.erp-btn-secondary`
- `.erp-btn-retry-email`
- shared hover/focus-visible/active/disabled treatment for those local controls

Touch only the portal CSS file:

- [`Arino - Template/assets/css/equipment-requests-portal.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/css/equipment-requests-portal.css)

### Explicitly do not touch in that batch

- `.erp-btn-success`
- `.erp-btn-warning`
- `.erp-btn-danger`
- `.erp-status--*`
- `.erp-item-tag--*`
- auth/bootstrap logic
- page layout

### Success criteria

- send message becomes the clear primary action in the olive/slate language
- refresh/apply/retry controls feel calmer and more consistent
- destructive and semantic actions remain understandable
- no workflow behavior changes

## QA focus after that batch

If the next implementation batch is applied, QA should focus on:

1. topbar buttons
2. filter apply button
3. send message button
4. retry-email button
5. hover/focus/disabled clarity
6. preserving semantic distinction for status buttons
