# Project Roadmap Status

Last updated: 2026-05-28

This file summarizes which roadmap/master-plan documents are active, closed, or historical. It does not replace the UI source of truth.

Audit evidence: `docs/PROJECT_DOCUMENT_AUDIT_2026_05_13.md`

## Active Source Of Truth

| Area | Status | Source |
| --- | --- | --- |
| UI redesign / UI stabilization / design system | Closed, maintenance mode | `docs/UI_REDESIGN_MASTER_PLAN.md` |
| Product workflow / information architecture | Partially implemented, active roadmap | `docs/UX_WORKFLOW_REARCHITECTURE_PLAN.md` |
| Project-wide non-design backlog | This file | `docs/PROJECT_ROADMAP_STATUS.md` |

## UI And Design Documents

Status: closed / historical for active roadmap planning.

The UI redesign and stabilization program is complete: `100%` complete / `0%` tracked UI redesign work remaining. The follow-up document audit on 2026-05-13 confirmed the full theme audit passed at `44 / 44` files and `156 / 156` tests, and `npm run build:assets` passed.

Rendered visual smoke screenshots were also captured for the major roadmap surfaces under `test-results/roadmap-audit-2026-05-13/`: `projects.png`, `customer.png`, `technician.png`, and `equipment-requests.png`.

All old UI/design/stabilization plans, audits, and phase reports are now supporting references only. They have been marked with a historical status banner. Future UI work should be opened only as a concrete regression or new scoped product request, and it must update `docs/UI_REDESIGN_MASTER_PLAN.md`.

Covered historical UI/design document groups:

- `docs/UI_UX_STABILIZATION_PLAN_2026_04.md`
- `docs/TAILWIND_V4_PLAN.md`
- `docs/BRAND_*`
- `docs/CSS_OWNERSHIP_AUDIT.md`
- `docs/DARK_*`
- `docs/ENHANCED_SELECT_*`
- `docs/EQUIPMENT_REQUESTS_PORTAL_*`
- `docs/FINAL_*`
- `docs/PHASE_5_*`, `docs/PHASE_6_*`, `docs/PHASE_7_*`
- `docs/REPORTS_*`, `docs/RESERVATION_ACTIONS_QA.md`, `docs/QUOTE_PREVIEW_EDITOR_QA.md`
- `docs/UI_COLOR_TOKEN_AUDIT.md`
- `docs/STYLE_REVERSION_*`

## Active Or Potential Non-Design Work

| Area | Status | What Remains | Source |
| --- | --- | --- | --- |
| Product workflow re-architecture | Complete for current release scope; Batch 7 deferred | Home/Start, booking management, and the project creation/edit workflow are implemented and visually approved locally. Direct project equipment/package/crew assignment is implemented; project-linked reservations are read-only from the reservations side; local old package-child duplication repair was applied. Project Reports have been moved out of the Projects workspace into Admin Tools at `src/pages/project-reports.html`, and Templates are intentionally staying inside Projects because they are project document/user tools. Batch 4 extraction is implemented locally for Clients and Crew (`src/pages/clients.html`, `src/pages/crew.html`). Batch 5 extraction is validated locally for Equipment and Maintenance (`src/pages/equipment.html`, `src/pages/maintenance.html`). Batch 6 route rename is implemented locally with `src/pages/operations.html` as the canonical Operations route and `src/pages/dashboard.html` retained as a temporary compatibility alias/redirect. Batch 7 workflow API aggregation is parked as a later enhancement, not active release work. | `docs/UX_WORKFLOW_REARCHITECTURE_PLAN.md` |
| Production/release readiness | Open, production execution checklist ready | First release/data-migration plan exists, and the first local audit is recorded. Local release-packaging blockers have been fixed: GitHub deploy now installs Composer dependencies, uploads `backend/config.php` through the dedicated FTPS step, excludes `backend/config.php` from the plain FTP rclone sync, and `npm audit` reports `0 vulnerabilities`. Staging/clone rehearsal tooling is also prepared: CLI migration tools accept `--config`, `backend/tools/schema_report.php` can report schema/migration status read-only, and `npm run release:rehearsal` runs the report/status/dry-run sequence. Disposable Docker rehearsal passed locally after baselining the seeded test schema: `31 applied`, `0 pending`, and `6 / 6` integration tests passed. A local backup clone from `mysql-backup-art_ratio_rental_app-20260528_020000.sql.gz` was restored and rehearsed: initial tracking showed `31 pending` because `schema_migrations` was empty, the clone was baselined to `31 applied / 0 pending`, and legacy password audit found no legacy hashes. Guarded production commands now exist for backup/read-only rehearsal and baseline, and the execution checklist is documented. Remaining prerequisite before production migration: provide production config outside git, run the dry-run, then execute the approved production window. | `PRODUCTION_LOCK.md`, `ENVIRONMENT_PLAN.md`, `docs/PRODUCTION_RELEASE_AND_DATA_MIGRATION_PLAN.md`, `docs/RELEASE_READINESS_AUDIT_2026_05_28.md`, `docs/STAGING_MIGRATION_REHEARSAL_RUNBOOK_2026_05_28.md`, `docs/STAGING_CLONE_REHEARSAL_REPORT_2026_05_28.md`, `docs/PRODUCTION_MIGRATION_EXECUTION_CHECKLIST_2026_05_28.md` |
| Staging environment | Open dependency | Repo-side staging templates exist, but no actual staging host or secret store is configured. | `STAGING_SETUP.md` |
| Controlled backend schema debt | Open backlog | Ancillary runtime schema self-healing remains outside the core reservation/project paths. Cleanup order is now documented. | `CONTROLLED_DEBT_REGISTER.md`, `docs/BACKEND_SCHEMA_HARDENING_PLAN.md` |
| Legacy password hardening | Transition path implemented | Added `security.allow_legacy_password_login` and `backend/tools/audit_legacy_password_hashes.php`. Still need to run the audit on production, reset affected users, then disable legacy login in production config. | `backend/bootstrap/auth.php`, `backend/tools/audit_legacy_password_hashes.php`, `docs/PRODUCTION_RELEASE_AND_DATA_MIGRATION_PLAN.md` |
| Equipment requests build entry | Completed | `src/pages/equipment-requests.html` is now listed in `vite.config.js` build inputs and `npm run build:assets` emits `dist/src/pages/equipment-requests.html`. | `vite.config.js`, `docs/PRODUCTION_RELEASE_AND_DATA_MIGRATION_PLAN.md` |
| Tooling maintenance | Open for warning cleanup | Dependency freshness and audit vulnerability cleanup are complete. Remaining backlog is now explicit: jsdom auth/preferences relative-URL warnings, jsdom navigation warning noise from auth redirects, and Vite bundle chunk-size warnings. | `CONTROLLED_DEBT_REGISTER.md`, `vitest.config.js`, `tests/setupTests.js`, `vite.config.js` |
| Quote PDF V2 cleanup | Closed | Fixed-layout Quote PDF V2 is the default renderer for reservation quotations, project quotations, and reservation checklist PDFs. It includes quote-local Arabic/English switching, scoped CSS, V2 data/i18n/template modules, checklist-controlled sections, category subtotals, overhead-in-line project pricing, manual quote date editing, and long-quote pagination/page-break hardening for tables, notes, and terms. Legacy quotation V1 builder/layout code and drag/alignment controls have been removed from the quotation flow. | `src/scripts/reservations/pdf/v2/`, `src/styles/quotePdfV2.css`, `tests/reservations/pdf/v2.test.js`, `src/scripts/reservations/pdf/state.js` |
| Optional JS modularization | Backlog, not active | Remaining optional monolith split targets include `src/scripts/reservationsEdit.js`, `src/scripts/projects/form.js`, and `src/scripts/reservations/editForm.js`. | `docs/HANDOVER_2026_04.md` |
| TypeScript migration | Ongoing policy | Foundation exists; new `src/scripts/` files should prefer TypeScript, and existing JS should convert only when touched for real work. | `CLAUDE.md`, `docs/HANDOVER_2026_04.md` |
| Backup/import and real-data validation | Mostly completed reports | No active roadmap unless a new restore/import or production-data validation pass is requested. | `docs/BACKUP_IMPORT_REPORT.md`, `docs/REAL_DATA_VALIDATION_REPORT.md`, `docs/RESERVATIONS_COLLATION_FIX_REPORT.md` |
| Core safety baseline | Completed with controlled exceptions | Core reservation/project safety work is complete; exceptions live in the controlled debt register. | `docs/PHASE_4_EXIT_REPORT.md`, `docs/SAFETY_FIXES_REPORT.md`, `docs/TEST_BASELINE_REPORT.md` |

## Recommended Next Non-Design Order

1. Prepare a safe staging/backup clone target, then compare schema and rehearse migrations there only.
2. Confirm the first GitHub deploy workflow run installs Composer dependencies successfully before using it for an approved production release.
3. Keep `dashboard.html` as a temporary compatibility alias until production has been stable.
4. If release readiness is the next goal: follow `docs/PRODUCTION_RELEASE_AND_DATA_MIGRATION_PLAN.md` and `docs/RELEASE_READINESS_AUDIT_2026_05_28.md`.
5. Keep Batch 7 API aggregation as a later enhancement unless production usage shows real slow workflow loads or repeated availability/conflict round trips.
6. If internal cleanup is the next goal: start from `docs/BACKEND_SCHEMA_HARDENING_PLAN.md`, not from old UI docs.
7. Run `php backend/tools/audit_legacy_password_hashes.php` against production config during the release-prep window, reset affected users, then set `security.allow_legacy_password_login` to `false` in production config.
8. Treat Quote PDF V2 as closed unless a new visual regression is reported. If PDF work resumes, keep it scoped to real-data visual QA refinements or the separate reports-PDF style cleanup.
9. Clean the test/build warning backlog when the next maintenance window opens: centralize auth/preferences mocks for jsdom tests, reduce import-time auth side effects where practical, inspect bundle composition, then split PDF/export vendors and global CSS ownership.
10. Treat optional JS modularization and TypeScript conversion as backlog unless a concrete feature or bug touches those files.

## Rules For Future Status Questions

- For UI/design status, answer from `docs/UI_REDESIGN_MASTER_PLAN.md`.
- For product workflow/navigation status, answer from `docs/UX_WORKFLOW_REARCHITECTURE_PLAN.md`.
- For non-design roadmap status, answer from this file first, then inspect the referenced source document.
- Do not reopen historical UI/design docs as active plans.
- If a referenced document conflicts with this file about whether UI/design work remains, `docs/UI_REDESIGN_MASTER_PLAN.md` wins.
