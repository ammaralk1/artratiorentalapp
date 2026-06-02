# Project Document Audit - 2026-05-13

## Scope

This audit reconciles active roadmap/master-plan claims across the project docs before treating `docs/UI_REDESIGN_MASTER_PLAN.md` as the closed UI source of truth.

Important correction: the first consolidation pass marked design docs historical based on the master-plan closeout and green tests, but it did not complete a document-by-document evidence audit first. This file records the follow-up audit evidence and the real remaining work.

## Commands Run

- `rg` inventory across `docs/*.md` and root markdown files for active-sounding roadmap language.
- `npx vitest run tests/theme`
- `npm run build:assets`
- Chrome rendered screenshots against the running local Vite server:
  - `test-results/roadmap-audit-2026-05-13/projects.png`
  - `test-results/roadmap-audit-2026-05-13/customer.png`
  - `test-results/roadmap-audit-2026-05-13/technician.png`
  - `test-results/roadmap-audit-2026-05-13/equipment-requests.png`

## UI / Design Status

Status: closed for active roadmap planning, maintenance mode only.

Evidence:

- `npx vitest run tests/theme` passed `44 / 44` files and `156 / 156` tests.
- `npm run build:assets` passed.
- Tailwind/DaisyUI migration is implemented in source:
  - `package.json` uses `tailwindcss ^4.1.12`, `@tailwindcss/vite ^4.1.12`, and `daisyui ^5.1.26`.
  - `vite.config.js` imports and uses `@tailwindcss/vite`.
  - `src/styles/app.css` imports `src/styles/tailwind-theme.css`.
  - `src/styles/tailwind-theme.css` uses `@import "tailwindcss"` and `@plugin "daisyui"`.
- Major UI surfaces rendered in Chrome screenshots:
  - projects page with fixture data
  - customer detail page
  - technician detail page
  - equipment requests page

Notes:

- Older UI docs still contain historical `remaining`, `next`, and `risk` language by design. Their top banner now makes those notes historical only.
- `docs/UI_REDESIGN_MASTER_PLAN.md` now explicitly says older progress-log `Next Exact Task`, `Still Risky`, and `Blocked` lines are historical snapshots superseded by the current phase and latest closeout entries.
- Dark-mode evidence is currently automated, not screenshot-based, because the available Chrome headless path did not reliably accept the app session-theme override. The dedicated dark/theme tests passed and are the current dark-mode verification evidence.

## Stale UI Claims Reconciled

| Document / Area | Old Claim Found | Current Audit Result |
| --- | --- | --- |
| `docs/HANDOVER_2026_04.md` Phase B | Tailwind v4 / DaisyUI v5 pending | Stale. Source is on Tailwind v4/DaisyUI v5 and build passes. |
| `docs/FULL_AUDIT_2026_04.md` CSS debt | Remaining `#4c6ef5` token debt | Stale for active UI planning. Current theme suite passes; old CSS notes are historical unless a new regression is opened. |
| `docs/TAILWIND_V4_PLAN.md` | Migration plan still reads as future work | Stale. Migration is implemented and verified by build/theme tests. |
| `docs/DARK_*`, `docs/FINAL_DARK_UI_RESIDUE_AUDIT.md` | Remaining dark selector/surface drift | Closed for active roadmap status by current `tests/theme` run. |
| `docs/EQUIPMENT_REQUESTS_PORTAL_*` | Older standalone portal audit/action plan | Superseded for UI planning by current `src/pages/equipment-requests.html` surface and rendered screenshot. See open build-entry note below. |

## Real Remaining Work

These items are not design-redesign work. They remain real project roadmap work.

| Area | Status | Evidence / Why It Remains |
| --- | --- | --- |
| Production/release readiness | Open | `PRODUCTION_LOCK.md` and `ENVIRONMENT_PLAN.md` still intentionally require explicit release, rollback, and verification planning. |
| Staging environment | Open dependency | `STAGING_SETUP.md` says repo templates exist, but no actual staging host, secret store, staging DB, storage path, or deployment target is configured. |
| Ancillary runtime schema self-healing | Open backend architecture debt | `CONTROLLED_DEBT_REGISTER.md` lists it, and source search confirms request-time `CREATE TABLE` / `ALTER TABLE` paths still exist in ancillary APIs such as contact, feedback, equipment requests, equipment cart, project templates, packages, sequence, blog comments, telegram, notifications, and analytics. |
| Legacy password compatibility path | Open security hardening item | `backend/bootstrap/auth.php` still accepts plain-text and MD5 legacy matches, then upgrades to bcrypt. This is intentional compatibility, but `docs/FULL_AUDIT_2026_04.md` correctly says affected accounts should be identified and force-reset. |
| JS modularization | Backlog, not active | Large JS files still exist: `src/scripts/reservationsEdit.js` 1977 lines, `src/scripts/projects/form.js` 1490 lines, `src/scripts/reservations/editForm.js` 1520 lines, `src/scripts/projects/templatesTab.js` 1232 lines, and `src/scripts/projectsReports.js` 2365 lines. This is maintainability backlog, not a release blocker by itself. |
| TypeScript migration | Ongoing policy | TS foundation exists, but most legacy scripts are still JS. Continue converting only when touched for real work. |
| Dependency/tooling warnings | Open maintenance | `tests/theme` and build still emit Baseline/Browserslist freshness warnings. Build also emits known dynamic/static import chunk warnings and large chunk warnings. |
| Equipment requests build entry | Completed | User confirmed it must ship in production. `vite.config.js` now lists `equipmentRequests: resolve(__dirname, 'src/pages/equipment-requests.html')`, and `npm run build:assets` emits `dist/src/pages/equipment-requests.html`. |

## Current Source Of Truth

- UI/design: `docs/UI_REDESIGN_MASTER_PLAN.md`
- Project-wide roadmap status: `docs/PROJECT_ROADMAP_STATUS.md`
- Detailed evidence for this audit: this file

## Recommended Next Work Order

1. If preparing for release, start with `docs/PRODUCTION_RELEASE_AND_DATA_MIGRATION_PLAN.md`: production MySQL data remains authoritative, and local test data must not overwrite production.
2. Rehearse schema migrations against a production backup or staging clone before touching live production.
3. If continuing internal cleanup, start with ancillary runtime schema self-healing from `CONTROLLED_DEBT_REGISTER.md`.
4. Treat legacy password compatibility as security hardening: identify affected users and plan forced reset/removal of the plain/MD5 login path.
5. Leave JS modularization and TypeScript conversion as backlog unless a feature or bug touches those files.
