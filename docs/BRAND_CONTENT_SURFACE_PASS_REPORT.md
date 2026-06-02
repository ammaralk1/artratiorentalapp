> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Brand Content Surface Pass Report — Pass 2

## Goal
Bring the remaining old-blue inner content surfaces into the same visual family as the updated
shell/navigation/tab layer. Following on from the first content-surface pass that addressed summary
cards, customer/technician tables, shared form controls, and dark-mode detail overrides, this pass
targeted the remaining deep inner content surfaces.

---

## What Changed

### `src/styles/tabs.css`

**Sub-tab system (dashboard subtabbar, reservations subtabs, technician subtabs)**
- Inactive state: moved border, background, and box-shadow onto `--bo-color-tab-shell-*` tokens
- Hover state: moved onto `--bo-color-tab-hover-*` tokens
- **Active state**: replaced bright electric blue gradient (`rgba(76, 110, 245, 0.82)`) with `--bo-color-tab-active-bg/border/shadow/fg` — now matches the main tab active system
- All dark-mode variants aligned with the same token set
- The `.tabs` container wrapper: moved border, background, and shadow onto tab-shell tokens (both light and dark)
- Tab text color: moved onto `--bo-color-tab-text`

**Positions table (technician crew positions)**
- Table wrapper: moved border onto `--bo-color-content-border`, background onto `--bo-color-content-muted-bg`, shadow onto `--bo-color-content-shadow`
- Table header: moved onto `--bo-color-table-head-*` tokens (background, border, text)
- Row hover: moved from `rgba(76, 110, 245, 0.08)` to `--bo-color-table-row-edit-bg`
- Dark-mode wrapper and rows: moved onto same table/content tokens

**Generic dark-mode tab hover/active fallback**
- Replaced hardcoded `rgba(59, 130, 246, ...)` hover glow and `#2563eb` blue active gradient with `--bo-color-tab-hover-*` and `--bo-color-tab-active-*` tokens

**Crew-position-add-btn shadows**
- Moved from `rgba(76, 110, 245, ...)` shadows to `--bo-color-action-shadow` and `--bo-color-action-shadow-hover`
- Dark-mode variant and modal specificity rule also updated
- Focus outline moved to `--bo-color-control-focus-border`

**Non-tab sub-tab buttons**
- Inactive: moved onto `--bo-color-tab-shell-*` (border, background, shadow)
- Hover: moved onto `--bo-color-tab-hover-*`
- Active: moved onto `--bo-color-tab-active-*`

**Scrollbar thumbs**
- Replaced `rgba(76, 110, 245, 0.25/0.35)` with `rgba(142, 167, 181, 0.30/0.36)` — slate family

---

### `src/styles/forms.css`

**Management form box** (`.management-form-box`, `.customer-form-box`, `.add-technicians-box`)
- Light: background moved to `--bo-color-content-muted-bg`, border to `--bo-color-content-border`, shadow to `--bo-color-content-shadow`
- Dark: replaced old navy `rgba(24, 33, 59, 0.92)` and `rgba(59, 130, 246, 0.18)` border with `--bo-color-content-bg` and `--bo-color-content-border`

**Management form icon**
- Light: replaced `rgba(76, 110, 245, 0.16)` gradient with `--bo-color-panel-highlight-bg`; color: `--bo-color-heading-accent`
- Dark: moved to `--bo-color-panel-highlight-bg` / `--bo-color-panel-highlight-icon-fg`

**Management search bar focus**
- `.management-search-bar .form-control:focus`: moved to `--bo-color-control-focus-border` and `--bo-color-control-focus-ring`
- Dark-mode control: moved to control tokens

**Customer search input**
- `#customers-tab #search-customer-input`: moved border, background, shadow, focus, and dark-mode onto control tokens

**Notes textarea** (`.management-form-grid .form-field-notes textarea`)
- Replaced blue border/background/shadow with `--bo-color-control-*` tokens
- Placeholder: moved from `rgba(76, 110, 245, 0.7)` to `--bo-color-control-placeholder`
- Dark-mode variant aligned

**Suggestion item hover**
- Replaced `rgba(76, 110, 245, 0.18)` hover with `--bo-color-tab-hover-bg`

**Project linked-reservation summary item**
- Moved border and background onto `--bo-color-content-border` / `--bo-color-content-muted-bg`

---

### `src/styles/maintenance.css`

**Priority field and status filter focus states**
- Moved from `rgba(76, 110, 245, 0.55)` to `--bo-color-control-focus-border` / `--bo-color-control-focus-ring`

**Status filter controls**
- Moved background from blue-tinted gradient to `--bo-color-control-bg`; border and shadow to control tokens
- Dark-mode variant aligned

**Issue textarea**
- Replaced blue border, blue-tinted background, blue placeholder, and blue focus with `--bo-color-control-*` tokens throughout
- Dark-mode variant aligned

**Equipment search focus** (dark-mode)
- Moved focus border and ring to `--bo-color-control-focus-border` / `--bo-color-control-focus-ring`

**Maintenance table**
- Moved border from `rgba(76, 110, 245, 0.12)` to `--bo-color-content-border`

**Selected info panel**
- Background: moved to `--bo-color-content-muted-bg`; border to `--bo-color-content-border`; color to `--bo-color-text-muted`; shadow to `--bo-color-content-shadow`

**Selected info media thumbnail**
- Background: moved from `rgba(76, 110, 245, 0.08)` to `--bo-color-accent-soft`

**Maintenance summary box**
- Background: moved to `--bo-color-content-muted-bg`; border and shadow aligned
- Dark-mode variant aligned

**Maintenance summary items**
- Moved from `rgba(76, 110, 245, 0.12)` blue background to `--bo-color-accent-soft`; border to `--bo-color-content-muted-border`
- Dark-mode variant aligned

**Close modal**
- Modal wrapper: moved border to `--bo-color-content-border`; background to `--bo-color-surface`; shadow to `--bo-color-shell-shadow-elevated`
- Header: background moved to `--bo-color-panel-highlight-bg`; border to `--bo-color-panel-highlight-border`
- Header icon: moved to `--bo-color-panel-highlight-icon-bg` / `--bo-color-panel-highlight-icon-fg`; shadow to `--bo-color-action-shadow`
- Dismiss button hover: moved from blue to `--bo-color-control-focus-border` and `--bo-color-accent`
- Ticket card: moved to content surface tokens
- Ticket icon: moved to `--bo-color-panel-highlight-bg` / `--bo-color-heading-accent`
- Textarea: moved border, background, shadow, focus to `--bo-color-control-*`

**Report modal**
- Border: moved to `--bo-color-shell-border`; background to `--bo-color-shell-bg`; shadow to `--bo-color-shell-shadow-elevated`

**Report modal summary**
- Moved from `rgba(76, 110, 245, 0.08)` blue background to `--bo-color-content-muted-bg`; border and shadow aligned

---

### `src/styles/app.css`

**Equipment details field**
- Moved border from `rgba(76, 110, 245, 0.25)` to `--bo-color-content-border`
- Background: moved to `--bo-color-content-muted-bg`; shadow to `--bo-color-content-shadow`
- Dark-mode variant aligned
- `.form-control` inside details field: moved border and background to control tokens
- Edit-mode `.form-control`: moved to `--bo-color-control-focus-border` for active state

**Technician badge** (default state, not status variants)
- Replaced full old blue (`rgba(76, 110, 245, 0.82)`) with `--bo-color-action-bg/border/shadow/fg` tokens
- Non-status fallback variant moved to outline action tokens
- Dark-mode variant aligned

**Customer nav tab hover**
- Replaced old blue shadow inset/glow with `--bo-color-tab-hover-border` and `--bo-color-tab-hover-shadow`

**btn-close and modal-close-btn hover**
- Replaced `rgba(76, 110, 245, 0.5)` border, `rgba(37, 99, 235, 0.95)` color, and blue outline with:
  - `--bo-color-control-focus-border`
  - `--bo-color-surface`
  - `--bo-color-accent`
  - `--bo-color-content-shadow`

---

### `src/styles/core.css`

**Projects table**
- `thead th`: moved background from `rgba(76, 110, 245, 0.06)` and border from `rgba(76, 110, 245, 0.15)` to `--bo-color-table-head-*` tokens
- Row hover: moved from `rgba(76, 110, 245, 0.08)` to `--bo-color-table-row-edit-bg`
- Dark-mode thead: replaced old navy (`rgba(24, 33, 59, 0.9)`) with `--bo-color-table-head-bg/border/fg` tokens
- Dark-mode tbody row: replaced navy and blue border/hover with `--bo-color-table-row-*` tokens
- Dark-mode td/th borders aligned

**Project focus card** (project view card grid)
- Base card: border moved from `rgba(76, 110, 245, 0.1)` to `--bo-color-content-border`; background to `--bo-color-content-muted-bg`; shadow to `--bo-color-content-shadow`
- Hover shadow: moved from blue glow to `--bo-color-content-shadow-elevated`
- Card accent overlay: moved from blue gradient to `--bo-color-panel-highlight-bg`
- Meta-tag chip: moved from `rgba(76, 110, 245, 0.1)` to `--bo-color-accent-soft` and `--bo-color-heading-accent`
- Dark-mode: replaced old navy background and blue border/accent with content/panel tokens

---

## What Visual Mismatch It Solved

- **Sub-tab active state**: The biggest single mismatch is now resolved. Previously the sub-tab active state fired electric blue while the main tab system used deep green/slate. Both tab levels now use the same `--bo-color-tab-active-*` gradient.
- **Management form boxes**: No longer show old-navy dark backgrounds or blue-tinted light backgrounds inside an otherwise green/slate-aligned shell.
- **All focus rings**: No longer fire electric blue. Now use the muted steel-slate `--bo-color-control-focus-border` and `--bo-color-control-focus-ring`.
- **Project cards and table**: The projects view cards and table headers no longer read as a separate old-blue subsystem; they now use the same content/table token family as the rest of the UI.
- **Maintenance surfaces**: Issue textarea, summary tiles, close modal, and report modal no longer visually break out of the brand system with blue-tinted backgrounds and focus states.
- **Equipment detail fields**: No longer show old blue borders in the inline edit surface.
- **Technician badge (default)**: No longer renders as a bright blue pill; now uses the branded deep green action token.

---

## What Remained Unchanged

- No workflows changed.
- No markup structure was broadly rewritten.
- No public website or template files changed (`Arino - Template/` untouched).
- No production data or production config changed.
- Operational status color systems were preserved (green available, red busy, amber warning, success/danger badges).
- Calendar toolbar active state was not changed (specialized `fc-button-active` business component).
- `index.css` (users-page) was not touched in this pass (lower-priority load path).
- Print/export stylesheets remain unchanged.

---

## Verification

- `npm run backoffice:local:smoke` — **passed**
  - returns 31 customers, 25 reservations, 315 equipment, 8 technicians, 24 projects on real local backup data
- `npm run test:reservations` — **passed** (118 tests, 6 skipped integration tests due to missing env)
- `npx vitest run tests/tabs/tabs.test.js` — **passed** (7 tests)
- Manual human browser verification was not executed in this terminal pass.

---

## Cohesion Judgment

Shell/content cohesion has materially improved across the largest remaining gap areas.

The UI now reads as one visual family across:
- outer shell (page background, sidebar, box wrappers)
- navigation/tabs (main tabs and sub-tabs)
- inner content (cards, forms, tables, modals, maintenance surfaces)

Blue is no longer the dominant visual language in any major shared surface category.

**A third corrective pass may still be useful later for:**
- Calendar toolbar active state (`fc-button-active`) — specialized, not shared
- `index.css` users-page tables and logs (lower-priority path)
- `.projects-table-empty-row` slight blue tint (cosmetic, not impactful)
- `.project-focus-card--confirmed` shadow that still references old blue (status semantic, deferred)
