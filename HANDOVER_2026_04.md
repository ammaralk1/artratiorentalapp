# Art Ratio V2 — Session Handover (April 2026)

## Project Overview

Back-office production management app (Art Ratio). PHP backend, vanilla JS frontend, Vite build pipeline.
Primary goal: improve and unify the UI without breaking existing behavior, workflows, permissions, or data flow.

Current branch: `phase-0-environment-control`

Repo reality check date: 2026-04-05

---

## Current Status Summary

| Phase | Description | Status |
|-------|-------------|--------|
| A | Security hardening | ✅ Done |
| B | CSS token / brand finish | ⚠️ Partial — Tailwind v4 upgrade still pending; minor brand-color debt remains outside CSS |
| C | DB migration tracking | ✅ Done |
| D | JS test coverage | ✅ Done |
| E | JS refactoring (monolith splits) | ⚠️ Partial — `templatesTab.js` is the main remaining target |
| F | PHP service layer (SQL → repositories) | ✅ Done |
| G | TypeScript migration | ✅ Foundation set — incremental going forward |

Important: the older `memory/...` references mentioned in previous notes are not present in this checkout. Use `FULL_AUDIT_2026_04.md` plus this file as the current source of truth.

---

## Verified On This Checkout

```bash
npx vitest run        # 823 passing, 6 skipped
php vendor/bin/phpunit # 101 passing, 207 assertions
npx tsc --noEmit      # clean
```

Notes:
- JS integration tests are still skipped without the Docker/integration env (`INTEGRATION_API_BASE_URL`, credentials).
- The worktree is currently dirty with in-progress Phase E refactors; see "Immediate Recommendation" below before starting another broad change.

---

## Phase A — Security Hardening ✅ Done

Commit: `a7f5c67e`

Resolved:

- Exception detail stripped from API 500 responses; internals go to `error_log()` only
- `health.php` requires auth and no longer leaks DB error details
- Telegram webhook `secret_token` is mandatory
- Session cookie `SameSite` moved from `Lax` to `Strict`
- `X-Forwarded-For` is only trusted from configured proxies
- Rate limiting added to public form endpoints

---

## Phase B — CSS / UI Finish ⚠️ Partial

Completed:

- The specific 5 CSS literals called out in the older audit were replaced

Still open:

- DaisyUI v5 / Tailwind v3 mismatch remains:
  - `daisyui@^5.1.26`
  - `tailwindcss@^3.4.14`
- Minor hard-coded brand blue still exists outside the CSS audit scope, for example in `src/scripts/projectsReports.js`

Recommendation:

- Do the Tailwind v3 → v4 upgrade on its own branch after `templatesTab.js` is stabilized
- Fold remaining chart/UI color literals into the same cleanup pass so Phase B can actually close

---

## Phase C — DB Migration Tracking ✅ Done

Commit: `9e8c13b7`

Migration runner: `backend/tools/migrate.php`

```bash
php backend/tools/migrate.php --status
php backend/tools/migrate.php
php backend/tools/migrate.php --dry-run
php backend/tools/migrate.php --baseline
```

Implemented:

- `schema_migrations` table tracking
- Alphabetical execution from `backend/sql/`
- Baseline/force safety guard for existing databases
- Naming convention: `YYYYMMDD_description.sql`

Seed data stays separate:

- `backend/seeds/dev_sample_data.sql` is local-dev only and not a tracked migration

---

## Phase D — JS Test Coverage ✅ Done

Current verified counts on this checkout:

- 829 total
- 823 passing
- 6 skipped

Covered areas include:

- `tests/apiClient/`
- `tests/auth/`
- `tests/customers/`
- `tests/equipment/`
- `tests/maintenance/`
- `tests/projects/`
- `tests/technicians/`
- `tests/reservations/service/`
- `tests/reservations/pdf/`
- `tests/reservations/`
- `tests/reports/`

Remaining test gap of note:

- No direct tests for `src/scripts/projects/templatesTab.js`

---

## Phase E — JS Refactoring ⚠️ Partial

### Completed splits

`src/scripts/reservations/reservationPdf.js` → `src/scripts/reservations/pdf/`

`src/scripts/reservations/createForm.js` → `src/scripts/reservations/create/`

`src/scripts/reservationsService.js` → `src/scripts/reservations/service/`

`src/scripts/maintenance.js` → `src/scripts/maintenance/`

- `actions.js`
- `api.js`
- `close-modal.js`
- `equipment-selector.js`
- `render.js`
- `report-modal.js`
- `state.js`
- `utils.js`

`src/scripts/equipment.js` → `src/scripts/equipment/`

- `api.js`
- `barcode.js`
- `events.js`
- `excel.js`
- `modal.js`
- `normalize.js`
- `render.js`
- `selection.js`
- `state.js`
- `variants.js`

`src/scripts/projects/projectDetails.js` → `src/scripts/projects/projectDetails/`

- `display.js`
- `edit.js`
- `payment.js`
- `view.js`

### Remaining high-priority refactor target

`src/scripts/projects/templatesTab.js` — 3,787 lines

This is now the main remaining Phase E target.

Why it matters:

- It still owns preview rendering, print/PDF flow, autosave, saved-template CRUD, table editing, zoom, language toggle, and repopulation lifecycle in one file
- It is the largest remaining behavior-heavy frontend file
- It has no direct tests

### Important patterns already established in recent splits

Shared mutable state:

```js
export const state = { ... };
```

Circular dependency handling:

- Use setter injection instead of direct circular imports

Module placement rule:

- If a helper is only used by one module, keep it in that module instead of forcing a shared bidirectional dependency

---

## Phase F — PHP Service Layer ✅ Done

Commits: `bb7a8f04`, `25fbd6fc`

Implemented:

- Repository layer under `backend/repositories/`
- Shared `BaseRepository`
- Repository-backed write paths for customers, equipment, projects, reservations, technicians
- `Router.php` and `AuthMiddleware.php`

Verified:

- `tests/php/repositories/` — 101 passing, 207 assertions

---

## Phase G — TypeScript Foundation ✅ Set

Commit: `4b02f9ae`

Implemented:

- `typescript@^6`
- `tsconfig.json`
- `strict: true` for `.ts`
- `allowJs: true`
- `checkJs: false`

Rule from `CLAUDE.md`:

- New `src/scripts/` files should be `.ts`
- Existing `.js` files convert when touched for real work

Practical note:

- Recent Phase E splits added new `.js` modules, so either:
  - continue the split in `.js` for consistency and convert later as one contained follow-up, or
  - convert the new `templatesTab` modules to `.ts` as part of the split and use that as the clean re-entry point for Phase G

The second option is cleaner if scope is controlled.

---

## What Is Actually Left

| Phase | Item | Effort |
|-------|------|--------|
| E | Stabilize and finish `templatesTab.js` split | ~2–4 days |
| B | Tailwind v3 → v4 upgrade for DaisyUI v5 compatibility | ~1 day plus regression testing |
| B | Clean remaining hard-coded brand colors in JS/chart surfaces | <0.5 day |
| G | Incremental TypeScript migration | ongoing |

---

## Immediate Recommendation

1. Stabilize and commit the current dirty Phase E work first.
2. Split `src/scripts/projects/templatesTab.js` next.
3. Add direct tests around templates behavior during that split.
4. Only after that, do Tailwind v4 / DaisyUI alignment on its own branch.

Reason:

- The repo already contains uncommitted module splits for equipment, maintenance, and project details.
- Tests are green now.
- Starting the Tailwind upgrade before the `templatesTab.js` split would stack two large UI regression surfaces at once.

---

## Next File To Open

Use this plan for the next session:

- `TEMPLATES_TAB_SPLIT_PLAN.md`

---

## Running Tests

```bash
# JS tests
npx vitest run

# PHP tests
php vendor/bin/phpunit

# TypeScript type check
npx tsc --noEmit

# Migration status (requires config.php)
php backend/tools/migrate.php --status
```
