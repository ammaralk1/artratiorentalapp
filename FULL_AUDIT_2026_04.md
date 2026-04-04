# Art Ratio Back-Office — Full Application Audit
**Date:** April 2026  
**Branch:** phase-0-environment-control  
**Stack:** PHP + Vanilla JS + Vite + CSS (no framework)

---

## EXECUTIVE SUMMARY

The application is in **good overall shape** for a production back-office. Auth, session handling, and RBAC are properly implemented. The main risks are in code maintainability (massive JS files, low test coverage, no DB migration tracking) and minor production information-leakage issues. CSS token debt is nearly resolved. There are no critical security vulnerabilities.

**Overall Scores:**
| Area | Score | Trend |
|------|-------|-------|
| Security | 7/10 | Solid foundation, minor leakage issues |
| Code Quality | 5/10 | Oversized files, low coverage |
| UI/CSS | 8/10 | Token system mature, 5 literals remain |
| Architecture | 5/10 | Works well, hard to scale without changes |
| Test Coverage | 4/10 | Reservations well-tested, most of app uncovered |

---

## 1. SECURITY AUDIT

### What's Working Well
- `session_regenerate_id(true)` on login — prevents session fixation
- Rate limiting with IP + username tracking (5 attempts / 15 min)
- bcrypt hashing with automatic upgrade from legacy MD5/plain
- Prepared statements with named parameters throughout — no SQL injection found
- Role-based access control (`requireAuthenticated` / `requireRole`) on all protected routes
- CORS origin allowlist enforced before any response
- Session cookies: `httponly=true`, `samesite=Lax`, `secure=true` on HTTPS
- Telegram debug/diagnostics endpoints require `admin` role

### Findings

#### MEDIUM — Exception details leaked to client in all API endpoints
**Files:** All ~30 `backend/api/*/index.php` files  
**Pattern:** Every file catches `Throwable` and responds with `'details' => $exception->getMessage()`  
**Risk:** Exposes SQL error messages, file paths, stack hints to any client.  
**Fix:** Remove `details` key from 500 responses in production. Log via `error_log()` only.
```php
// CURRENT (leaks internals)
respondError('Unexpected server error', 500, ['details' => $exception->getMessage()]);

// FIX
error_log('API error: ' . $exception->getMessage());
respondError('Unexpected server error', 500);
```

#### MEDIUM — `health.php` publicly accessible and leaks DB errors
**File:** `backend/api/health.php`  
**Risk:** Anyone can call `/backend/api/health.php` to confirm if DB is up and read DB connection error messages.  
**Fix:** Add basic auth or restrict to internal traffic only; strip `details` from error response.

#### MEDIUM — Telegram webhook secret is optional
**File:** `backend/api/telegram/webhook.php:18`  
**Pattern:** `if (!empty($cfg['secret_token'])) { ... verify ... }`  
**Risk:** If `secret_token` is not configured, any internet request can trigger webhook processing and inject data into `telegram_messages` table.  
**Fix:** Treat missing `secret_token` as "all requests rejected" in production. Document as required config.

#### LOW — No CSRF protection
No CSRF tokens are implemented. `SameSite=Lax` provides partial protection (blocks cross-site POST from iframes) but not against top-level navigation attacks.  
**Fix:** For a back-office app, upgrade to `SameSite=Strict`. Optionally add a CSRF token to state-changing requests.

#### LOW — X-Forwarded-For IP spoofing
**File:** `backend/bootstrap/auth.php:11-19`  
`HTTP_X_FORWARDED_FOR` is trusted without validating it came from a known proxy. Attackers can set arbitrary IP values to bypass rate limiting.  
**Fix:** Only trust `X-Forwarded-For` if the request comes from a known reverse proxy IP.

#### LOW — Legacy plain-text password path still active
**File:** `backend/bootstrap/auth.php:116-126`  
Users with plain-text or MD5 passwords in the DB can still authenticate. These accounts should be identified and force-reset on next login.  
**Fix:** Log a warning when a legacy credential matches; add an admin tool to audit accounts still on legacy hash.

#### INFO — Public endpoints have no rate limiting
`contact/index.php`, `feedback/index.php`, `equipment-requests/index.php`, `blog-comments/index.php` — all public, no throttling. Vulnerable to form spam flooding.  
**Fix:** Add simple IP-based rate limiting (reuse the existing `login_attempts` pattern or a similar table).

---

## 2. CODE QUALITY AUDIT (JS Frontend)

### What's Working Well
- `apiClient.js` is solid: in-flight deduplication, abort signals, backoff, error typing
- `reservations/` sub-directory shows intentional modularization (state, controller, events, etc.)
- `projects/` sub-directory shows the same modular approach
- `reservationsService.js` has extensive error handling (315 try/catch hits)
- Vitest test suite: 118 tests all passing

### File Size Problems (exceeds 800-line rule)

| File | Lines | Status |
|------|-------|--------|
| `reservations/reservationPdf.js` | 7,069 | Critical — break into renderer modules |
| `projects/templatesTab.js` | 3,787 | Critical |
| `reservations/createForm.js` | 3,662 | Critical |
| `reservationsService.js` | 3,282 | Critical |
| `projects/projectDetails.js` | 2,556 | Critical |
| `equipment.js` | 2,365 | Critical |
| `translations/dashboard.js` | 2,305 | Acceptable (data file) |
| `projectsReports.js` | 2,051 | Critical |
| `reservationsEdit.js` | 1,824 | High |
| `reservations/editForm.js` | 1,578 | High |
| `projects/form.js` | 1,555 | High |
| `maintenance.js` | 1,508 | High |
| + 10 more 1,000+ line files | — | Medium |

### Test Coverage Gaps — Untested Modules

Major modules with **zero** test coverage:
- `equipment.js` (2,365 lines — core feature)
- `maintenance.js` (1,508 lines)
- `customerPage.js` (1,492 lines)
- `customerDetails.js` (1,461 lines)
- `technicians.js` (1,456 lines)
- `technicianPage.js` (1,402 lines)
- `notifications.js` (1,379 lines)
- `home.js` (large)
- `projects/form.js` (1,555 lines)
- `projects/projectDetails.js` (2,556 lines)
- `projects/templatesTab.js` (3,787 lines)
- `dashboardMetrics.js`
- `auth.js`
- `apiClient.js` (no tests for the core HTTP client!)

### Architecture Issues

1. **Inconsistent modularization**: `projects/` and `reservations/` are modularized, but `equipment.js`, `maintenance.js`, `customers.js`, `technicians.js` remain as flat monolith files. No clear standard.

2. **Raw `fetch()` calls outside apiClient** (minor — all are for assets/blobs, not API calls):
   - `reservationPdf.js:1779` — fetches image for PDF canvas
   - `reports/presenters/a4Unified.js:812` — fetches logo URL for PDF
   - `reports/external.js:67` — loads vendor script

3. **projectsService.js error handling**: Only 2 catch blocks for an entire service file. If any fetch fails, the error likely propagates uncaught to the UI.

---

## 3. CSS / UI AUDIT

### What's Working Well
- `--bo-color-*` token system is fully established in `core.css`
- `--clr-primary` legacy token is **completely removed** from all main CSS files ✓
- Previous brand passes have brought token debt from 505 to just **5 literal instances**
- Dark mode uses consistent `:is(html.dark-mode, body.dark-mode)` selector pattern in `core.css`

### Remaining CSS Debt

**5 old-blue hex literals remain** (down from 505):

| File | Line | Context |
|------|------|---------|
| `reports.css:1093` | `.reports-kpi-card[data-kpi="totalValue"] .reports-kpi-value` | color: #4c6ef5 !important |
| `reports.css:1103` | `.reports-kpi-card[data-kpi="projects"] .reports-kpi-value` | color: #4c6ef5 !important |
| `reservations.css:4623-4624` | background-color + border-color on one rule | #4c6ef5 |
| `core.css:3085` | `linear-gradient(135deg, #4c6ef5, #5a8dff)` | gradient definition |

These 5 instances are the entire remaining CSS token debt. A single 30-minute pass finishes it.

### Dependency Issue

**DaisyUI v5 + Tailwind v3 mismatch:**
- `package.json`: `tailwindcss: ^3.4.14`, `daisyui: ^5.1.26`
- DaisyUI v5 requires Tailwind v4 as a peer dependency
- Using DaisyUI v5 with Tailwind v3 is unsupported — some component styles may not render correctly
- **Fix options**: Either downgrade DaisyUI to v4 (stable with Tailwind v3) or upgrade to Tailwind v4

---

## 4. ARCHITECTURE & EXPANDABILITY AUDIT

### What's Working Well
- Clean bootstrap layer: `bootstrap/auth.php`, `bootstrap/environment.php`, `bootstrap/config.php` — solid separation of concerns
- Consistent API entry point pattern across all endpoints
- Services layer (`services/email.php`, `services/telegram.php`, etc.) for cross-cutting concerns
- Config is a PHP array (not env vars) — easy to validate, no parsing issues

### Risks to Expansion

#### HIGH — No database migration tracking
- **31 SQL files** in `backend/sql/` applied manually with no tracking
- No way to know which migrations have been applied to staging vs production
- New team members or new deployments will miss migrations
- **Fix**: Adopt a lightweight migration runner (e.g., Phinx, or a simple custom tracker table)

#### HIGH — Integration tests not running in CI
- 6 integration tests are always skipped (`INTEGRATION_API_BASE_URL` env not set)
- These cover auth login/logout, reservation CRUD — the most critical flows
- **Fix**: Wire Docker integration stack into CI pipeline or configure env in staging

#### MEDIUM — Monolithic API files with inline SQL
- `projects/index.php`, `reservations/index.php`: all CRUD, validation, SQL in one file (1,000+ lines each)
- No repository layer — adding a new filter or field requires surgery on a large file
- **Fix**: Extract domain service classes; move SQL into query builder or repository functions

#### MEDIUM — No formal routing layer
- PHP files are direct endpoints — routing happens at the web server level
- Auth is enforced per-endpoint (consistent now, but each new endpoint must remember to call `requireAuthenticated()`)
- **Risk**: A new endpoint added without auth call is silently public
- **Fix**: Add a lightweight router or middleware chain that enforces auth by default

#### MEDIUM — JS has no type system
- Vanilla JS, no TypeScript
- Large state objects (`reservationState`, `projectState`) have no schema
- API response shapes are undocumented
- **Fix**: At minimum, add JSDoc types to state modules and service return values; consider TypeScript migration for new modules

#### LOW — Frontend has no lazy loading
- `vite.config.js` has no manual code splitting
- All page JS is bundled per-page entry point but large shared modules are eagerly imported
- **Fix**: Use dynamic `import()` for heavy features like PDF generation and reports

---

## 5. PRIORITIZED MASTER PLAN

### Phase A — Security Hardening (1–2 days, do first)
1. Strip `$exception->getMessage()` from all 500 responses — replace with `error_log()` only
2. Add auth or IP restriction to `health.php`
3. Make Telegram `secret_token` mandatory in production docs
4. Upgrade session cookie to `SameSite=Strict`
5. Add rate limiting to public form endpoints (contact, feedback, equipment-requests)

### Phase B — CSS Finish Line (1 session, <30 min)
1. Replace 5 remaining `#4c6ef5` literals with `var(--bo-color-accent)` or appropriate token
2. Resolve DaisyUI v5 / Tailwind v3 mismatch (downgrade DaisyUI to ^4 or upgrade Tailwind to v4)

### Phase C — DB Migration Tracking (1 day)
1. Install Phinx or implement a simple `migrations` table
2. Mark all 31 existing SQL files as "applied" baseline
3. All future schema changes go through migration runner

### Phase D — Test Coverage Expansion (2–3 days)
Priority order:
1. `apiClient.js` — the central HTTP layer, no tests
2. `equipment.js` — core feature, no tests
3. `auth.js` — authentication, no tests
4. `maintenance.js` — critical workflow, no tests
5. `projectsService.js` — error handling gaps
6. Wire integration test Docker stack into dev environment

### Phase E — JS Module Refactoring (1–2 weeks, phased)
Break apart the 5 largest files. Apply the same pattern already used in `projects/`:
1. `reservationPdf.js` (7,069) → split into `renderers/`, `generators/`, `exporters/`
2. `equipment.js` (2,365) → `equipment/state.js`, `equipment/list.js`, `equipment/maintenance.js`
3. `maintenance.js` (1,508) → `maintenance/state.js`, `maintenance/ui.js`
4. Fix `projectsService.js` error handling

### Phase F — Backend Service Layer (2–3 weeks)
1. Extract query functions from API endpoint files into domain services
2. Add lightweight PHP router with default auth middleware
3. Document API contracts (at minimum, comment return shapes)

### Phase G — TypeScript Migration (phased, ongoing)
1. Start with new modules — all new files in TypeScript
2. Migrate service files first (`apiClient`, `reservationsService`, `projectsService`)
3. Add JSDoc types to existing state modules as a bridge step

---

## WHAT TO DO NEXT (First 3 Actions)

1. **This session**: Fix exception leakage — remove `$exception->getMessage()` from the 500 error catch blocks across all API files. This is the highest-impact security fix with zero feature risk.

2. **Next session**: Finish CSS — 5 literal replacements to close out the entire token debt.

3. **After that**: Set up DB migration tracking (Phinx or custom) before any new schema changes are made.
