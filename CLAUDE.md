# CLAUDE.md

## Project
Back-office production management app (Art Ratio).

## Stack
- PHP backend
- Vanilla JavaScript frontend
- Vite build pipeline
- CSS organized across shared and page-specific stylesheets

## Primary goal
Improve and unify the UI without breaking existing behavior, workflows, permissions, or data flow.

## Working rules
- Preserve application behavior unless explicitly asked to change it.
- Prefer presentation-layer refactors over business-logic rewrites.
- Do not change routes, API contracts, permission logic, validation rules, or side effects unless necessary for the requested task.
- When changing UI, favor shared reusable patterns over page-specific hacks.
- Keep edits minimal, reversible, and scoped to the task.

## Styling rules
- Use token-driven CSS via `--bo-color-*` custom properties in shared style files.
- No ad hoc color literals on shared surfaces.
- No arbitrary one-off gradients, glows, or border colors on common components.
- Shared components should use consistent surface, border, radius, spacing, and interaction rules.
- Prefer extending existing tokens before adding new page-specific values.
- Preserve semantic colors only where they communicate status or meaning.

## UI migration guidance
- Optimize for consistency first, then page polish.
- Define or reuse shared component rules before patching individual pages.
- Prefer fixing root component styles over scattering overrides across many files.
- When updating a page, keep structure and interactions intact unless the task explicitly includes UX restructuring.
- Reduce visual inconsistency across cards, tabs, modals, forms, tables, and navigation.

## File safety
- Do not modify `Arino - Template/` files — with one critical exception below.
- Do not change production configs, secrets, environment settings, or deployment files unless explicitly requested.
- Do not alter print styles or dead load paths unless the task specifically targets them.

## Equipment Requests Portal — CRITICAL bootstrap rules

The portal lives at `Arino - Template/equipment-requests-portal.html` with its own JS and CSS.
It is a separate, actively-used subsystem. Do NOT migrate it into `src/pages/`.

**Three constants in `Arino - Template/assets/js/equipment-requests-portal.js` must never regress:**

1. `LOCAL_API_BASE` — must be `'/backend/api'` (same-origin).
   - Never change it back to an absolute `http://127.0.0.1:PORT/api` URL.
   - Why: an absolute URL bypasses the Vite dev proxy; the `SameSite=Strict` session cookie
     is not sent on cross-origin requests, so auth always fails on localhost.

2. `LOGIN_PAGE_URL` — must resolve to the back-office login page, not a path inside `Arino - Template/`.
   - Current value: `/src/pages/login.html` on localhost, `../login.html` on production.
   - Why: a bare `'login.html'` resolves to `/Arino - Template/login.html` which does not exist;
     the browser then falls back to `/Arino - Template/index.html` — the marketing template.
     That is the "redirecting to template index" bug.

3. `HOME_PAGE_URL` — same rule as LOGIN_PAGE_URL. Must use `/src/pages/home.html` on localhost.

If you ever touch `equipment-requests-portal.js` for any reason, verify these three constants
are correct before finishing.

## CSS expectations
- Check whether a style belongs in tokens, shared core styles, app shell styles, or page-specific styles before editing.
- Avoid duplicate fixes across multiple CSS files when a shared rule can solve the issue.
- Prefer component-level consistency over file-by-file color replacement.
- Keep dark mode and existing semantic states intact unless explicitly redesigning them.

## Code change expectations
- Explain risky changes before making them.
- Call out when a proposed change affects shared UI patterns.
- For multi-file UI work, group changes by component or surface type, not just by filename.
- Preserve accessibility basics such as focus visibility, contrast, and usable form states.

## When unsure
- Ask whether the task is visual cleanup, design-system cleanup, or functional UX change.
- Default to the least disruptive implementation that improves consistency.
