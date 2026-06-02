> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Final Content Polish Report

## Goal

Close the four deferred visual leftovers from the Pass 2 brand content surface alignment, without
redesigning anything or touching any unchanged workflow, markup structure, or public template.

---

## Items Fixed

### 1. Calendar Toolbar — All Three Button States

**File:** `src/styles/calendar.css`, lines 265–292

All three button states (inactive, hover, active) and their dark-mode variant were in the
indigo/purple family (`rgba(99, 102, 241, ...)`, `rgba(79, 70, 229, ...)`) — entirely separate
from the brand palette used by every other tab surface.

**Changes:**

| State       | Property      | Before                                                          | After                              |
|-------------|---------------|-----------------------------------------------------------------|------------------------------------|
| Inactive    | `border`      | `rgba(99, 102, 241, 0.28)` — indigo                            | `var(--bo-color-tab-shell-border)` |
| Inactive    | `background`  | `rgba(248, 250, 255, 0.65)` — blue-washed white                | `var(--bo-color-tab-shell-bg)`     |
| Inactive    | `color`       | `rgba(30, 41, 59, 0.78)` — hardcoded dark                      | `var(--bo-color-tab-text)`         |
| Hover       | `background`  | `rgba(99, 102, 241, 0.12)` — indigo tint                       | `var(--bo-color-tab-hover-bg)`     |
| Hover       | `color`       | `rgba(49, 46, 129, 0.95)` — indigo dark                        | `var(--bo-color-tab-text)`         |
| Hover       | `border-color`| `rgba(79, 70, 229, 0.45)` — indigo                             | `var(--bo-color-tab-hover-border)` |
| Active      | `background`  | `linear-gradient(135deg, rgba(99, 102, 241, 0.9), ...)` — indigo/purple | `var(--bo-color-tab-active-bg)`    |
| Active      | `border-color`| `rgba(76, 110, 245, 0.65)` — old blue                          | `var(--bo-color-tab-active-border)`|
| Active      | `color`       | `#f8fafc` — hardcoded white                                     | `var(--bo-color-tab-active-fg)`    |
| Active      | `box-shadow`  | `0 18px 36px rgba(79, 70, 229, 0.28)` — purple glow            | `var(--bo-color-tab-active-shadow)`|
| Dark inactive| `background` | `rgba(15, 23, 42, 0.78)` — deep navy (hardcoded)               | `var(--bo-color-tab-shell-bg)`     |
| Dark inactive| `border-color`| `rgba(99, 102, 241, 0.35)` — indigo                            | `var(--bo-color-tab-shell-border)` |
| Dark inactive| `color`      | `rgba(226, 232, 240, 0.86)` — hardcoded light                  | `var(--bo-color-tab-text)`         |

`!important` flags preserved throughout (required to override FullCalendar's own `!important`
defaults).

---

### 2. `project-focus-card--confirmed` Shadow

**File:** `src/styles/core.css`, line 855

The confirmed-status card modifier applied an elevated shadow using the old-blue family. The
card base was already corrected in Pass 2 but this status-modifier rule remained.

```css
/* Before */
.project-focus-card--confirmed {
  box-shadow: 0 16px 34px rgba(76, 110, 245, 0.18);
}

/* After */
.project-focus-card--confirmed {
  box-shadow: var(--bo-color-content-shadow-elevated);
}
```

Visual intent preserved: confirmed cards still receive an elevated shadow distinguishing them
from unconfirmed cards. Color is now brand-aligned.

---

### 3. `projects-table-empty-row` Light and Dark Mode

**File:** `src/styles/core.css`, lines 1390–1400

The empty-state row for the projects table had a faint old-blue tint in light mode and an old
navy background with a blue dashed border in dark mode.

```css
/* Before */
.projects-table-empty-row td {
  background-color: rgba(76, 110, 245, 0.04);
}
:is(html.dark-mode, body.dark-mode) .projects-table-empty-row td {
  background-color: rgba(24, 33, 59, 0.82);
  border: 1px dashed rgba(59, 130, 246, 0.4);
}

/* After */
.projects-table-empty-row td {
  background-color: var(--bo-color-accent-soft);
}
:is(html.dark-mode, body.dark-mode) .projects-table-empty-row td {
  background-color: var(--bo-color-content-muted-bg);
  border: 1px dashed var(--bo-color-content-border);
}
```

The dashed border style is preserved. Only the color is corrected.

---

## Items Documented as Debt (Not Modified)

### `index.css` — Dead Load Path

`src/pages/users.html` loads `app.css`, not `index.css`. Confirmed by direct inspection of the
page's stylesheet link tags. `index.css` is not referenced by any live page in the application.

The blue-biased table/navbar/modal styles in `index.css` have **zero visual impact** in any
rendered page. No modification was made. A future separate cleanup task can remove or archive
the file entirely.

---

## What Remained Unchanged

- No workflows changed.
- No markup structure changed.
- `Arino - Template/` untouched.
- No production data or production config changed.
- Operational status color systems preserved (green available, red busy, amber warning).
- `.project-row-highlight` transient animation deferred (interactive/semantic, not brand surface).
- `.project-reservations-chip` blue accent chip deferred (intentional semantic accent element).
- FullCalendar native nav buttons (prev/next/today) not modified — they use `.fc-button`, not
  `.calendar-toolbar__button`.

---

## Verification

- `npm run backoffice:local:smoke` — **passed**
  - 31 customers, 25 reservations, 315 equipment, 8 technicians, 24 projects on real local backup data
- `npm run test:reservations` — **passed** (118 tests, 6 skipped integration tests due to missing env)
  - includes tabs, reservations, equipment pagination, technicians pagination, storage tests

---

## Stage Completion Assessment

**Items fixed:** 3 of 4 deferred items (calendar toolbar, confirmed card shadow, empty row tint)

**Items resolved as debt (no fix needed):** 1 of 4 (`index.css` — confirmed dead load path)

**Brand alignment stage status: COMPLETE.**

The UI now reads as one visual family across:
- outer shell (page background, sidebar, box wrappers)
- navigation/tabs (main tabs, sub-tabs, calendar toolbar buttons)
- inner content (cards, forms, tables, modals, maintenance surfaces)
- status/confirmed state modifiers on shared card components

Blue/indigo is no longer the dominant visual language in any shared surface category across any
tab level or content tier.

---

## Next Phase

The brand alignment corrective stage is complete. Remaining known cosmetic items that were
explicitly out of scope for this entire stage:

- `.project-row-highlight` — transient row selection animation; interactive/UX component, not brand surface
- `.project-reservations-chip` — intentional blue semantic accent; may warrant a separate design decision
- `index.css` removal — housekeeping/debt, separate cleanup task
- Calendar native nav buttons (prev/next/today) — separate FC component; may be reviewed in a dedicated calendar polish pass
