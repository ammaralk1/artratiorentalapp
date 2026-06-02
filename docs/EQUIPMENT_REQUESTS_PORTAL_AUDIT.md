> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Equipment Requests Portal Audit

## Executive summary

The Equipment Requests portal is a real, actively used back-office subsystem, but it is not part of the main `src/pages` back-office bundle. It currently lives under [`Arino - Template/equipment-requests-portal.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html) with its own standalone CSS and JS.

That makes it a `legacy-kept subsystem`, not an orphaned page.

It should be tracked separately from the completed CSS cleanup and dark UI consistency roadmap because:

- back-office manager links now point into it
- it has its own API-base resolution logic
- it has its own auth/session checks
- it has isolated styling outside `core.css` / `app.css` / `reservations.css`
- it already required a page-level local-dev stabilization

Recommendation:

- keep it in place for now
- treat it as a separate follow-up track
- do not migrate it into the main app yet
- do one bounded stabilization batch next, focused on environment/bootstrap correctness rather than redesign

## Current ownership

### Route/page owner

- [`Arino - Template/equipment-requests-portal.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html)

This is the actual page used for equipment request management.

### Behavior owner

- [`Arino - Template/assets/js/equipment-requests-portal.js`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/js/equipment-requests-portal.js)

This file owns:

- API base resolution
- auth/session checks
- list/details loading
- status update actions
- item-status updates
- message sending and retry behavior

### Styling owner

- [`Arino - Template/assets/css/equipment-requests-portal.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/css/equipment-requests-portal.css)

This is a standalone visual system with its own tokens such as:

- `--erp-bg`
- `--erp-surface`
- `--erp-primary`
- `--erp-border`

It does not inherit from the main back-office CSS architecture.

### Backend owner

- [`backend/api/equipment-requests/admin.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/equipment-requests/admin.php)
- [`backend/api/auth/index.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/auth/index.php)

The portal depends on the same backend auth/session system as the active back-office app, but it reaches it through its own JS.

## Route and navigation map

### Current back-office entry points

The manager-only Equipment Requests links now point to:

- `/Arino%20-%20Template/equipment-requests-portal.html`

Current entry files:

- [`src/pages/home.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/home.html)
- [`src/pages/contact-inquiries.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/contact-inquiries.html)
- [`src/pages/feedback-submissions.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/feedback-submissions.html)
- [`src/pages/site-analytics.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/site-analytics.html)

### Actual route expectation

The portal page physically exists only under:

- [`Arino - Template/equipment-requests-portal.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html)

There is no root-level `equipment-requests-portal.html` file in the repo.

### Why route handling is fragile today

The app currently mixes two serving models:

- back-office pages served from the main app/dev bundle
- template-side pages served from `Arino - Template/`

That means Equipment Requests navigation is crossing subsystem boundaries instead of staying inside one owned route family.

### Local fallback risk

[`scripts/serve-website-local.mjs`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/scripts/serve-website-local.mjs) falls back page-like unknown routes to `index.html`, which explains why a wrong portal path can appear to land on the template home/index rather than a 404 page.

## API/auth findings

### API endpoints used by the portal

From [`equipment-requests-portal.js`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/js/equipment-requests-portal.js):

- `AUTH_API = ${API_BASE}/auth/`
- `REQUESTS_API = ${API_BASE}/equipment-requests/admin.php`

### Auth assumptions

The portal assumes:

- cookie-backed authenticated session
- `GET /auth/` returns the current user
- role must be `admin` or `manager`
- unauthenticated users are redirected to `login.html`
- authenticated but unauthorized users are redirected to `home.html`

That behavior comes from:

- [`backend/api/auth/index.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/auth/index.php)
- [`backend/api/equipment-requests/admin.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/equipment-requests/admin.php)

### Current API-base resolution behavior

The portal has its own API-base resolution logic:

1. use `window.APP_API_BASE` if present
2. on localhost/127.0.0.1, use `http://127.0.0.1:8080/api`
3. on production hosts, use `https://api.art-ratio.com/backend/api`
4. otherwise fall back to `/backend/api`

It also now has a page-level local bootstrap in [`equipment-requests-portal.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html) that sets:

- `window.APP_API_BASE = 'http://127.0.0.1:8080/api'`

for local hosts before loading the portal script.

### Why this matters

This portal does not use the main app API client in [`src/scripts/apiClient.js`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/apiClient.js), so it does not inherit the main app’s local/dev configuration behavior automatically.

That is the main operational gap that surfaced.

## Environment assumptions

### Local/dev assumptions

The stable local backend described in [`LOCAL_SETUP.md`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/LOCAL_SETUP.md) is:

- frontend: `http://127.0.0.1:5173`
- backend API: `http://127.0.0.1:8080/api`

The portal originally assumed same-origin `/backend/api` on localhost, which is wrong when reached from the Vite/dev host.

### Production assumptions

Production behavior assumes:

- page host under `art-ratio.com` family
- API host at `https://api.art-ratio.com/backend/api`
- shared cookie/session behavior compatible with those hosts

### Cross-subsystem assumption

The portal assumes the user can jump from back-office pages into a template-side page without any route shell, bundle bootstrap, or shared runtime handoff.

That works, but it is brittle.

## Styling/design consistency notes

### Styling ownership

The portal uses:

- standalone HTML structure
- standalone CSS file
- standalone ERP-like class system such as `.erp-shell`, `.erp-card`, `.erp-btn`

It does not use:

- [`src/styles/core.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)
- [`src/styles/app.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
- [`src/styles/reservations.css`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)

### Visual language

The page is visibly older and blue-led:

- `--erp-primary: #4f8cff`
- blue hover rows
- blue-dark shell gradients
- white-forced request table headers
- local toast/action/button colors independent of the olive/slate back-office system

### Design consistency status

This portal is outside the completed dark UI consistency work.

That is acceptable for now because it is a separate subsystem, but it is visually drifted from the active back-office bundle.

## Risks

### Hardcoded environment assumptions

Risk: high

- local/dev API behavior depends on portal-specific bootstrapping
- production API behavior is hardcoded in the page script
- environment logic is duplicated instead of shared

### Template-side isolation

Risk: high

- the page lives outside `src/pages`
- it is not part of the main back-office CSS/JS ownership map
- fixes can be missed because it sits outside the primary bundle

### Duplicated auth/API logic

Risk: medium-high

- custom `apiRequest`
- custom API base resolution
- custom auth redirect handling

This duplicates concerns already solved in the main app.

### Navigation boundary mismatch

Risk: medium

- back-office manager cards link into a template-side page
- wrong path handling can fall back into template home/index

### Visual drift

Risk: medium

- users experience a jump from olive/slate back-office UI to older blue-dark portal styling

### Asset/version fragility

Risk: low-medium

- the page relies on manual cache-busting query strings
- stale asset behavior already surfaced during local verification

## Immediate stabilization needs

These are the concrete near-term needs, without migration:

1. Keep the portal route explicit and documented
   - use the real page path
   - avoid root-level guessed aliases

2. Keep local API bootstrap explicit
   - preserve `window.APP_API_BASE` bootstrap in the page
   - preserve localhost `8080/api` fallback in the page script

3. Document this page as out-of-bundle but supported
   - it should not be treated as dead template residue

4. Add a tiny smoke check later
   - portal opens
   - auth status call works
   - admin requests list loads

## Later migration options

### Option A: Legacy-kept, stabilized

Recommended default for now.

Keep the page where it is, but:

- document ownership
- stabilize route and environment behavior
- only do bug-fix maintenance

Pros:

- lowest blast radius
- no routing or CSS migration risk

Cons:

- continued visual and architectural drift

### Option B: Shared-runtime hardening without migration

Later option.

Keep page under `Arino - Template`, but reduce duplication by:

- centralizing API-base bootstrap
- reducing custom auth/environment logic

Pros:

- lowers environment fragility

Cons:

- still leaves route and styling isolation in place

### Option C: Migrate into main back-office bundle

Not recommended now.

Would involve:

- new page under `src/pages`
- main app ownership for CSS/JS/auth bootstrap
- route normalization

Pros:

- long-term architecture improvement

Cons:

- much larger blast radius
- not justified as the next step

## Recommended follow-up roadmap

### Classification

- current status: `legacy-kept subsystem`
- immediate priority: `stabilize, document, smoke-test`
- migration priority: `later, optional`

### Recommended next bounded batch

`Equipment Requests portal local/prod bootstrap hardening`

Scope:

- audit the exact route serving assumptions for local and production
- make sure the portal has one canonical API-base bootstrap path
- add a tiny repo-specific smoke checklist or script for:
  - page load
  - auth status
  - requests list fetch

Why this is next:

- it addresses the real fragility that already caused a regression
- it is lower risk than any migration
- it makes this subsystem maintainable without reopening the whole roadmap

### What should not happen next

- no immediate migration into `src/pages`
- no broad redesign of the portal
- no attempt to fold it into the completed dark UI roadmap right now
- no broad auth client refactor just for this page

## Conclusion

The Equipment Requests portal should now be tracked as a separate follow-up track.

It is:

- actively used
- back-office linked
- backend-backed
- operationally important
- outside the main cleaned app surface

That makes it worth explicit ownership and stabilization, but not worth immediate migration.
