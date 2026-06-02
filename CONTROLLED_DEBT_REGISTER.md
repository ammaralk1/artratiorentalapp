# Controlled Debt Register

## Purpose

Track the Phase 4 items that are no longer hidden failures but are intentionally deferred because they are lower risk than the completed core safety fixes.

## Items

| Item | Type | Scope | Impact | Why Deferred | Recommended Timing |
| --- | --- | --- | --- | --- | --- |
| Ancillary runtime schema self-healing still exists outside the core reservation/project hot paths | architecture debt | `backend/api/analytics/index.php`, `backend/api/contact/index.php`, `backend/api/feedback/index.php`, `backend/api/equipment-requests/index.php`, `backend/api/equipment-cart/index.php`, `backend/api/project-templates/index.php`, `backend/api/packages/index.php`, `backend/api/sequence/index.php`, `backend/api/blog-comments/index.php`, `backend/api/telegram/*.php`, `backend/api/notifications/*.php` | medium | Phase 4 prioritized the highest-risk operational flows first; these endpoints are secondary or shared/public-adjacent and were explicitly isolated instead of silently ignored | before production release of a broader backend hardening batch |
| jsdom network fallback warnings in reservation technician tests | test debt | `tests/reservations/technicians.test.js`, `src/scripts/techniciansService.js`, `src/scripts/reservationsTechnicians.js` | low | tests are green; warnings come from fallback API refresh paths hitting `127.0.0.1:8000` under jsdom | early Phase 5 |
| jsdom network/relative-URL warnings in reservation renderer/detail tests | test debt | `tests/reservations/renderers.test.js`, `src/scripts/technicianPositions.js`, `src/scripts/reservationsService.js` | low-medium | tests are green; the remaining warnings reflect unmocked fetch boundaries rather than broken behavior | early Phase 5 |
| jsdom auth/preferences relative-URL warnings | test debt | `tests/setupTests.js`, `src/scripts/auth.js`, `src/scripts/preferencesService.js`, page modules that import auth/theme/language at top level | low-medium | tests are green; warnings come from page-level side effects calling `/backend/api/auth/` and `/backend/api/preferences/` under jsdom without backend/proxy mocks, plus jsdom navigation warnings when auth redirects to `login.html` | test-harness cleanup pass before broad release QA |
| Vite bundle chunk-size warning | tooling/performance debt | `vite.config.js`, PDF/export modules, `src/scripts/auth.js`, global CSS entry ownership | medium | build passes; warning reflects large vendor/CSS bundles, especially one broad `vendor` chunk and global `app.css` being pulled through auth-dependent pages | next performance/code-splitting cleanup pass |
| Dependency freshness warnings from Baseline/Browserslist data age | tooling debt | frontend test/build toolchain | low | not a runtime bug; only adds noise to command output | next dependency maintenance pass |

## Notes

- No currently failing tests remain in the tracked Phase 4 baseline.
- The items above do not block Phase 5 structural stabilization.
- The ancillary runtime schema mutation debt does block a full-repo claim that all request paths are schema-mutation-free.
- The auth/preferences warning cleanup should be phased: first centralize jsdom API/auth/preference mocks for tests that do not exercise those modules directly, then remove import-time page side effects where practical.
- The Vite chunk cleanup should be phased: first inspect bundle composition with the analyzer, then split PDF/export vendors and move global CSS ownership out of `auth.js`; raising `chunkSizeWarningLimit` should be a last resort, not the fix.
