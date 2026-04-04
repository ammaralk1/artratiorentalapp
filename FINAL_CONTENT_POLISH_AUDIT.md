# Final Content Polish Audit

## Context

Pass 2 (BRAND_CONTENT_SURFACE_PASS_REPORT.md) brought the core inner content layer into full brand
alignment. Four items were explicitly deferred at the end of that pass as lower-impact or
specialized surfaces. This document audits those four items and determines the exact fix for each.

---

## Deferred Items

### 1. Calendar Toolbar — `fc-button-active` and sibling states

**File:** `src/styles/calendar.css`, lines 265–292

**What exists now:**

| State       | Property      | Current value                                                          |
|-------------|---------------|------------------------------------------------------------------------|
| Inactive    | `border`      | `1px solid rgba(99, 102, 241, 0.28)` — indigo family                  |
| Inactive    | `background`  | `rgba(248, 250, 255, 0.65)` — blue-washed white                       |
| Hover       | `background`  | `rgba(99, 102, 241, 0.12)` — indigo tint                              |
| Hover       | `color`       | `rgba(49, 46, 129, 0.95)` — indigo dark                               |
| Hover       | `border-color`| `rgba(79, 70, 229, 0.45)` — indigo                                    |
| Active      | `background`  | `linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(79, 70, 229, 0.92))` — indigo/purple gradient |
| Active      | `border-color`| `rgba(76, 110, 245, 0.65)` — blue                                     |
| Active      | `color`       | `#f8fafc` — white                                                      |
| Active      | `box-shadow`  | `0 18px 36px rgba(79, 70, 229, 0.28)` — purple glow                   |
| Dark inactive| `background` | `rgba(15, 23, 42, 0.78)` — deep navy                                  |
| Dark inactive| `border-color`| `rgba(99, 102, 241, 0.35)` — indigo                                   |

**Why it's wrong:** All three states (inactive, hover, active) use the indigo/purple family
(`rgba(99, 102, 241, ...)`, `rgba(79, 70, 229, ...)`, `rgba(76, 110, 245, ...)`) which was the
old-blue brand language. The rest of the tab system uses `--bo-color-tab-*` tokens (deep green
active, slate hover, muted shell inactive).

**Fix scope:** All three states. Fixing only the active state while leaving hover and inactive
as indigo would create a three-way mismatch (blue inactive → blue hover → green active). All
states must move together.

**Caveat:** These rules use `!important` throughout because they override FullCalendar's own
`!important`-decorated defaults. The `!important` flags must be preserved.

**Fix plan:**
- Inactive `border` → `var(--bo-color-tab-shell-border)`
- Inactive `background` → `var(--bo-color-tab-shell-bg)`
- Inactive `color` → `var(--bo-color-tab-text)`
- Hover `background` → `var(--bo-color-tab-hover-bg)`
- Hover `color` → `var(--bo-color-text-primary)` (or `var(--bo-color-tab-text)`)
- Hover `border-color` → `var(--bo-color-tab-hover-border)`
- Active `background` → `var(--bo-color-tab-active-bg)`
- Active `border-color` → `var(--bo-color-tab-active-border)`
- Active `color` → `var(--bo-color-tab-active-fg)`
- Active `box-shadow` → `var(--bo-color-tab-active-shadow)`
- Dark inactive `background` → `var(--bo-color-tab-shell-bg)` (already dark-mode responsive via token)
- Dark inactive `border-color` → `var(--bo-color-tab-shell-border)`

---

### 2. `index.css` Users-Page Tables and Modals

**File:** `src/styles/index.css`

**Status: DEAD LOAD PATH — no fix needed.**

Confirmed by reading `src/pages/users.html`: the page loads `app.css` and `core.css`, not
`index.css`. `index.css` is not referenced by any live page in the application.

The blue-biased table/navbar/modal styles in `index.css` have zero visual impact on any page
rendered in production or local. This file is legacy structural debt.

**Decision:** Document as dead-path debt. Do not modify. A future cleanup task (separate from
brand alignment) can remove or archive `index.css` entirely.

---

### 3. `project-focus-card--confirmed` Shadow

**File:** `src/styles/core.css`, line 855

**What exists now:**
```css
.project-focus-card--confirmed {
  box-shadow: 0 16px 34px rgba(76, 110, 245, 0.18);
}
```

**Why it's wrong:** This is a confirmed-status modifier that applies a blue glow shadow to the
card. The card base shadow was already moved to `--bo-color-content-shadow` in Pass 2. The
confirmed-status shadow override still fires old-blue (`rgba(76, 110, 245, 0.18)`), causing
confirmed cards to visually break out of the brand system with a blue shadow.

**Note on semantic intent:** The `.project-focus-card--confirmed` class likely intends to
visually highlight confirmed projects. This intent is preserved — the shadow is not removed,
only the color is corrected to use `--bo-color-content-shadow-elevated` which provides the same
elevated depth effect in the brand palette.

**Fix plan:**
```css
.project-focus-card--confirmed {
  box-shadow: var(--bo-color-content-shadow-elevated);
}
```

---

### 4. `projects-table-empty-row` Light Tint and Dark-Mode Border

**File:** `src/styles/core.css`, lines 1390–1400

**What exists now:**
```css
.projects-table-empty-row td {
  background-color: rgba(76, 110, 245, 0.04);   /* blue tint */
  border-radius: var(--radius-md);
  font-weight: 500;
}

:is(html.dark-mode, body.dark-mode) .projects-table-empty-row td {
  background-color: rgba(24, 33, 59, 0.82);     /* old navy */
  color: rgba(226, 232, 240, 0.86) !important;
  border: 1px dashed rgba(59, 130, 246, 0.4);   /* blue dashed border */
}
```

**Why it's wrong:**
- Light mode: `rgba(76, 110, 245, 0.04)` is a very faint old-blue tint. At 4% opacity it's barely
  perceptible but still incorrect. `--bo-color-accent-soft` or `transparent` is appropriate here.
- Dark mode: `rgba(24, 33, 59, 0.82)` is the old-navy family. The dashed `rgba(59, 130, 246, 0.4)`
  border is a blue that directly conflicts with the brand palette.

**Fix plan:**
- Light `background-color` → `var(--bo-color-accent-soft)` — provides a very subtle tinted
  background in the brand palette; preserves the visual distinction for the empty state row
- Dark `background-color` → `var(--bo-color-content-muted-bg)` — brand-aligned muted surface
- Dark `border` → `1px dashed var(--bo-color-content-border)` — preserves dashed style, brand color

---

## Priority Order

1. **Calendar toolbar** — visible on every calendar view, all three button states in indigo family. Highest-impact remaining item.
2. **Confirmed card shadow** — visible whenever a project is marked confirmed. Moderate impact.
3. **Empty row tint** — edge case (only visible when projects table is empty). Low impact. Fix is trivial.
4. **`index.css`** — zero visual impact. Document only.

---

## What Is NOT Targeted

- `.project-row-highlight` (lines 1385–1388) — this is a transient highlight animation (blue glow on row select). Semantic/interactive, not brand surface. Deferred.
- `.project-reservations-chip` (lines 1402+) — semantic accent chip using blue. Intentional accent element. Not in scope for this pass.
- `fc-button-group` nav buttons (prev/next/today) — FullCalendar built-in navigation; no `.calendar-toolbar__button` class. Not in scope unless reviewed separately.
- `index.css` — confirmed dead load path, document only.
