> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Brand Content Surface Audit

## Goal
- Correct the remaining split between the updated shell/tab layer and the older blue-heavy inner content layer.
- This audit supersedes and extends the previous content-surface audit, now that the first content-surface pass has been completed.

---

## What Was Fixed in the Previous Content Surface Pass
- Shared summary cards → brand content-surface tokens
- Customer/technician table wrappers, headers, row states → shared table tokens
- Shared form controls (`.form-control`, `.form-select`, `.enhanced-select*`) → shared control tokens
- Dark-mode customer/detail content overrides → retokenized

---

## Content Surfaces That Still Look Old-Themed (Current Pass)

### `src/styles/tabs.css` — High Priority

**Sub-tab state system** (affects dashboard subtabbar, reservations subtabs, technician subtabs):
- Inactive state border: `rgba(76, 110, 245, 0.22)` — electric blue
- Inactive state background: `rgba(236, 242, 255, 0.9)` — blue-tinted
- Inactive hover box-shadow: `rgba(76, 110, 245, 0.18)` — blue glow
- **Active state: `background: linear-gradient(140deg, rgba(76, 110, 245, 0.82), rgba(93, 139, 255, 0.78))`** — full electric blue gradient (most visible mismatch)
- Dark active state: `rgba(59, 130, 246, ...)` — still blue

**Positions table** (technician positions on dashboard/technician detail page):
- Table wrapper: `rgba(76, 110, 245, 0.12)` border, `rgba(76, 110, 245, 0.08)` tinted background
- Table header: blue-family gradient (`rgba(226, 232, 255, ...)`)
- Row hover: `rgba(76, 110, 245, 0.08)`
- Dark wrapper: `rgba(59, 130, 246, 0.24)` border

**Crew position add button** (used in technician crew assignment):
- Hover/active/focus shadows all use `rgba(76, 110, 245, ...)` glow

**Non-tab `.sub-tab-button`** (used on some pages as link-style tabs):
- Border: `rgba(76, 110, 245, 0.2)`, blue-tinted background
- Active: `var(--clr-primary)` (still `#4c6ef5`)

**Scrollbar thumbs** in tab scroll containers: `rgba(76, 110, 245, 0.25/0.35)`

### `src/styles/forms.css` — High Priority

- `.management-form-box` / `.customer-form-box` / `.add-technicians-box`:
  - Light: border `rgba(76, 110, 245, 0.12)`, background `rgba(248, 250, 255, 0.9)` — blue-tinted
  - Dark: background `rgba(24, 33, 59, 0.92)` — old navy blue, border `rgba(59, 130, 246, 0.18)`
- `.management-form-icon`:
  - Light: `rgba(76, 110, 245, 0.16)` gradient background
  - Dark: `rgba(76, 110, 245, 0.32)` blue
- `.suggestion-item:hover`: `rgba(76, 110, 245, 0.18)` background
- `.management-search-bar .form-control:focus` and `#customers-tab #search-customer-input:focus`: blue focus ring
- `management-form-grid textarea` (`form-field-notes`):
  - Border: `rgba(76, 110, 245, 0.18)`
  - Background: blue-tinted gradient
  - Placeholder: `rgba(76, 110, 245, 0.7)` — bright blue placeholder text
  - Focus: blue border and shadow

### `src/styles/maintenance.css` — Medium Priority

- `.maintenance-form-grid #maintenance-priority:focus` — blue focus ring
- `.maintenance-status-filter .form-select:focus` — blue focus ring
- `.maintenance-issue-textarea`:
  - Border: `rgba(76, 110, 245, 0.2)` — blue
  - Background: blue-tinted gradient
  - Placeholder: `rgba(76, 110, 245, 0.6)` — blue placeholder
  - Focus: blue border and blue glow
- `#maintenance-equipment-search:focus` — blue focus
- `.maintenance-suggestions` — `rgba(76, 110, 245, 0.16)` border
- `.maintenance-selected-item` — `rgba(76, 110, 245, 0.08)` background
- `.maintenance-summary__item` — dark-mode: `rgba(59, 130, 246, 0.18)` background
- `.maintenance-breakdown-box` — blue-tinted light background

### `src/styles/app.css` — Medium Priority

- `.projects-table thead th`: `rgba(76, 110, 245, 0.06)` background, `rgba(76, 110, 245, 0.15)` border
- `.projects-table tbody tr:hover`: `rgba(76, 110, 245, 0.08)`
- `.project-focus-card` border: `rgba(76, 110, 245, 0.1)`
- `.equipment-details-field`: blue borders (`rgba(76, 110, 245, 0.25/0.45)`)
- `.technician-badge`: entirely old blue (`rgba(76, 110, 245, 0.82)`)
- `.customer-page .customer-primary-nav .tab-button:hover`: old blue box-shadow
- `.btn-close:hover` / `.modal-close-btn:hover`: blue border/color/outline

---

## Biggest Shell / Content Mismatch

**Rank 1 — Sub-tab active state**
The main tab bar now uses `linear-gradient(135deg, #1d2d22 0%, #2d4335 62%, #5e7278 100%)` for its active state (deep green/slate family). But the sub-tab bar immediately below it still fires a bright electric blue gradient `rgba(76, 110, 245, 0.82)` when active. This is the single most visible shell/content mismatch: two tab systems on the same page using visually opposite active-state palettes.

**Rank 2 — Management form boxes**
The outer shell surfaces (sidebar, page background, box wrapper) now use the evergreen/slate token family. But the inner form containers (`.management-form-box`) still show a blue-navy dark background and blue-tinted light background, creating a visible disconnect when the user opens a form inside an already-aligned tab shell.

**Rank 3 — Maintenance and form focus states**
All focus states in the maintenance and forms layers still fire bright electric blue rings (`rgba(76, 110, 245, ...)`) instead of the muted steel-slate focus defined in `--bo-color-control-focus-border` and `--bo-color-control-focus-ring`.

---

## What Is Already Token-Ready
- `glass-card`, `box`, `card-surface` → all on `--bo-color-shell-*`
- `tab-buttons`, `sub-tab-buttons` → main tab system on `--bo-color-tab-*`
- `summary-card` → `--bo-color-content-*`
- Customer/technician table wrappers and headers → `--bo-color-table-*`
- Shared form controls (`.form-control`, `.form-select`) → `--bo-color-control-*`
- Management header/icon accent → `--bo-color-panel-highlight-*`

## What Must Be Corrected First
1. Sub-tab active/inactive state system (`tabs.css`) — highest visual contrast with shell
2. Positions table wrapper and header (`tabs.css`)
3. Management form box background and border (`forms.css`)
4. Management form icon background (`forms.css`)
5. All remaining old-blue focus rings in `forms.css` and `maintenance.css`
6. Old-blue inner table hover and card border in `app.css`

## What Is Intentionally Not Treated in This Pass
- Status-color badge systems (operational: success/warning/danger)
- Calendar toolbar active state (specialized: `fc-button-active`)
- Print/export stylesheets (`reportsA4.css`, `quotePdf.css`, `templatesA4.css`)
- `index.css` users-page (lower-priority load path, lower visibility)
- Broad `.btn-primary` replacement across every module

## Readability / Usability Guardrails
- Preserve operational status colors (green/amber/red)
- Keep table headers clearly differentiated from rows
- Keep focus states visible without reverting to bright electric blue
- Avoid heavy glow on dense data surfaces
- Maintain text contrast: dark neutral body text throughout
