# Art Ratio V2 — Session Handover (April 2026)

> **Status Update (2026-05-13):** This handover is historical for UI/design planning. Phase B UI/design claims are superseded by `docs/UI_REDESIGN_MASTER_PLAN.md` and `docs/PROJECT_DOCUMENT_AUDIT_2026_05_13.md`: the UI redesign is closed at `100%` complete / `0%` tracked redesign work remaining, Tailwind v4 / DaisyUI v5 is implemented, `npx vitest run tests/theme` passes, and `npm run build:assets` passes. Non-design backlog items from this handover, especially optional JS modularization and incremental TypeScript migration, remain tracked in `docs/PROJECT_ROADMAP_STATUS.md`.

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
| B | CSS token / brand finish | ✅ Superseded/closed for UI planning — Tailwind v4 / DaisyUI v5 implemented; see `docs/UI_REDESIGN_MASTER_PLAN.md` and `docs/PROJECT_DOCUMENT_AUDIT_2026_05_13.md` |
| C | DB migration tracking | ✅ Done |
| D | JS test coverage | ✅ Done |
| E | JS refactoring (monolith splits) | ⚠️ Paused in a good state — `templatesTab.js` and `projectsReports.js` have been modularized; remaining hotspots are reservation/project edit surfaces |
| F | PHP service layer (SQL → repositories) | ✅ Done |
| G | TypeScript migration | ✅ Foundation set — incremental going forward |

Important: the older `memory/...` references mentioned in previous notes are not present in this checkout. Use `FULL_AUDIT_2026_04.md` plus this file as the current source of truth.

---

## Verified On This Checkout

```bash
npx vitest run        # 900 passing, 6 skipped
php vendor/bin/phpunit # 101 passing, 207 assertions
npx tsc --noEmit      # clean
```

Notes:
- JS integration tests are still skipped without the Docker/integration env (`INTEGRATION_API_BASE_URL`, credentials).
- Current worktree is clean except for untracked `vendor/`, which has been intentionally left out of refactor commits.

Recent local-dev fixes on this branch:

- Vite proxy default restored to `127.0.0.1:8000/api`
- local browser auth flow now prefers same-origin `/backend/api` instead of mixing `localhost` and `127.0.0.1`
- backend router now accepts both `/api/foo` and `/api/foo/`, which fixed multiple local `404 Not found` responses

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
- Tailwind is still wired in the v3 style:
  - `src/styles/app.css` and `src/styles/auth.css` still use `@tailwind base/components/utilities`
  - `tailwind.config.js` still owns theme and daisyUI configuration
  - `postcss.config.js` still registers `tailwindcss` instead of `@tailwindcss/postcss`
- Minor hard-coded chart colors still exist outside the CSS audit scope, for example in `src/scripts/projectsReports/charts.ts`

Recommendation:

- Do the Tailwind v3 → v4 upgrade on its own branch next
- Fold remaining chart/UI color literals into the same cleanup pass so Phase B can actually close
- Use `TAILWIND_V4_PLAN.md` as the migration checklist for this repo

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

## Local Dev Notes

- Normal browser dev flow:
  - run PHP API on `127.0.0.1:8000`
  - run Vite on `localhost:5173`
  - let Vite proxy `/backend/api/...` to the PHP backend
- Do not force `VITE_API_BASE_URL` to `http://127.0.0.1:8000/api` when browsing the app on `localhost:5173`; that creates a `localhost` vs `127.0.0.1` session/cookie split and can look like "login succeeds then redirects back to login".
- If you intentionally run the frontend on `127.0.0.1` too, `npm run backoffice:local:dev` is still valid.
- Router behavior now tolerates both slash forms:
  - `/api/projects`
  - `/api/projects/`
  This matters because several frontend service modules currently call collection endpoints with a trailing slash.

---

## Phase D — JS Test Coverage ✅ Done

Current verified counts on this checkout:

- 906 total
- 900 passing
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

Recent additions closed a major prior gap:

- direct tests now cover `src/scripts/projects/templatesTab/`
- `templatesTab` coverage includes context, zoom, autosave, saved templates, preview, PDF, IO, controller, expenses, crew, formatting, and snapshot behavior

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

`src/scripts/projects/templatesTab.js` → `src/scripts/projects/templatesTab/`

- `autosave.ts`
- `context.ts`
- `controller.ts`
- `crew.ts`
- `expenses.ts`
- `formatting.ts`
- `io.ts`
- `pdf.ts`
- `preview.ts`
- `saved-templates.ts`
- `snapshot.ts`
- `state.ts`
- `zoom.ts`

`src/scripts/projectsReports.js` → `src/scripts/projectsReports/`

- `breakdown.ts`
- `charts.ts`
- `controls.ts`
- `export.ts`
- `filters.ts`
- `financials.ts`
- `formatting.ts`
- `table.ts`

### Remaining high-priority refactor targets

- `src/scripts/reservationsEdit.js`
- `src/scripts/projects/form.js`
- `src/scripts/reservations/editForm.js`

Why these matter:

- they are still behavior-heavy orchestration surfaces
- they sit on user-facing flows with a lot of DOM and state coupling
- they are the next places where incremental modularization buys maintainability without reopening already-stabilized template work

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

- Recent Phase E work now uses a mixed approach:
  - equipment / maintenance / project details remain modularized in `.js`
  - `templatesTab` modules were introduced as `.ts`

That gives a practical migration path:

- use new extractions as the TypeScript boundary where feasible
- avoid opportunistic churn in already-stable `.js` entry layers unless they are being actively refactored

---

## What Is Actually Left

| Phase | Item | Effort |
|-------|------|--------|
| B | Tailwind v3 → v4 upgrade for DaisyUI v5 compatibility | ~1–2 days plus regression testing |
| B | Clean remaining hard-coded brand colors in JS/chart surfaces | <0.5 day |
| E | Optional next monolith split (`reservationsEdit.js`, `projects/form.js`, `reservations/editForm.js`) | ~1–3 days each |
| G | Incremental TypeScript migration | ongoing |

---

## Immediate Recommendation

1. Stop frontend refactors here unless a product bug forces another split.
2. Move to Phase B next on its own branch:
   - Tailwind v3 → v4 upgrade
   - DaisyUI v5 CSS-plugin/theme migration
   - remaining chart/UI color cleanup
3. Leave the remaining monolith splits as backlog, not the active priority.

Reason:

- `templatesTab` has already been split and committed (`03d17314`).
- `projectsReports` has already been split and committed (`777c37b9`).
- Tests and typecheck are green on this checkout.
- The next repo-wide risk is styling/build compatibility, not module boundaries.

---

## Next File To Open

Use this plan for the next session:

- `HANDOVER_2026_04.md` for current status
- `TEMPLATES_TAB_SPLIT_PLAN.md` as historical reference for how the templates split was executed
- `TAILWIND_V4_PLAN.md` for the next active branch/workstream

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
