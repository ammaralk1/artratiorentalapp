> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Quote Preview/Editor QA

## Executive summary

This checklist verifies the dark-mode visual unification for the reservations quote preview/editor action cluster in [reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css), with emphasis on action hierarchy, local surface consistency, and spillover safety.

Primary verification targets:

- the quote preview sidebar and terms editor surface
- utility actions such as reset and preview status actions
- quote header controls injected by [reservationPdf.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/reservationPdf.js)
- the quote preview modal footer buttons
- confirmation that unrelated modal footer buttons and unrelated reservations controls did not pick up quote-only styling

## Highest-risk checks

1. Quote preview modal footer at [reservationPdf.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/reservationPdf.js)
   Check the close/export hierarchy, hover/focus/active/disabled states, and confirm the scoped `.quote-preview-modal .modal-footer` overrides are winning cleanly.

2. Quote header controls injected by [reservationPdf.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/reservationPdf.js)
   Check the dropdown toggle, dropdown menu, zoom controls, active zoom state, disabled zoom state, and alignment select because these were previously some of the bluest controls in the cluster.

3. Quote sidebar/editor surface at [reservationPdf.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/reservationPdf.js)
   Check that the sidebar and terms editor now sit visually with nearby reservations surfaces instead of reading like a separate blue panel.

4. Spillover comparison against unrelated modal footers
   Compare at least one non-quote modal footer on the dashboard and one project-details modal footer from [projectDetails.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/projectDetails.js) to confirm no generic `btn-light` / `btn-primary` drift occurred.

## Screen/state checklist

### Quote sidebar surface

- Open the reservation quote preview/editor UI in dark mode.
- Check `.quote-preview-sidebar` for:
  - background consistency with nearby reservations panels
  - border contrast that feels calm rather than blue-accented
  - shadow depth that does not feel like a separate floating theme
- Fail if the sidebar still reads as a visibly cooler blue/navy panel than the surrounding reservations shell.

### Terms editor textarea

- Check `.quote-terms-editor__textarea` in default state.
- Verify:
  - dark surface fill matches the unified reservations control language
  - border color is calm and readable
  - placeholder/empty-state readability is intact
- Focus the textarea and verify:
  - focus ring is visible
  - focus border does not flash to a bright blue treatment
  - text entry readability remains strong

### Utility actions

- Check `.quote-terms-reset` in default, hover, and focus-visible states.
- Verify it reads as a restrained utility action, not a bright CTA.
- Check `.quote-preview-status-action` in default, hover, and focus-visible states.
- Verify it feels consistent with the reset action and nearby reservations utility actions.
- Fail if either action still feels significantly bluer or glow-heavier than the rest of the reservations UI.

### Header controls

- Open the quote controls dropdown and check `.quote-controls-dropdown__toggle` in default, hover, and focus-visible states.
- Verify:
  - toggle surface is calm and aligned with the olive/slate dark system
  - no legacy bright blue border/glow remains
- Check `.quote-controls-dropdown__menu` for:
  - coherent dark surface
  - readable border separation
  - no detached blue panel look

### Zoom controls

- Check `.quote-preview-zoom-controls` and `.quote-preview-zoom-btn` for:
  - default state
  - hover
  - focus-visible
  - `is-active`
  - disabled
- Verify the active zoom state is clearly distinguishable without looking like a different product theme.
- Verify disabled buttons feel intentionally muted, not broken or low-contrast.

### Alignment select

- Check `.quote-preview-align-select` for:
  - dark surface consistency
  - text readability
  - border consistency with nearby controls
  - dropdown arrow alignment in RTL and LTR

### Modal footer

- Check `.quote-preview-modal .modal-footer .btn-light` and `.btn-primary`.
- Verify:
  - primary vs secondary hierarchy is obvious
  - close button feels secondary but still readable
  - export/download button feels primary without reverting to old blue-heavy styling
- Test:
  - default
  - hover
  - focus-visible
  - active on `.btn-primary`
  - disabled on `.btn-primary` if the flow exposes it
- Fail if the close button becomes too weak, the primary button becomes too loud, or both actions feel too visually similar.

### Dark / RTL / responsive

- Dark mode:
  - verify every changed control remains consistent with nearby reservations controls and surfaces
- RTL:
  - check dropdown toggle text alignment
  - check select alignment
  - check footer button ordering/spacing
  - check zoom controls still align cleanly
- Responsive / narrow widths:
  - verify the quote sidebar/editor and header controls do not create awkward overflow
  - verify modal footer buttons remain legible and properly grouped
  - verify zoom controls and alignment controls do not collapse into uneven spacing

## Spillover review

### Unrelated modal footer buttons

- Open at least one non-quote modal on the dashboard from [dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html).
- Compare its footer buttons against the quote preview modal footer.
- Confirm that generic modal footers did not inherit quote-only styling.

### Project-details modal buttons

- Open a project-details modal flow backed by [projectDetails.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/projectDetails.js).
- Check that `.modal-action-btn*` or other project-specific footer buttons remain visually unchanged.
- This is mainly a sanity check that the quote footer overrides stayed scoped to `.quote-preview-modal .modal-footer`.

### Unrelated reservations controls

- Compare the quote cluster against nearby reservations notes, billing, and reservation actions.
- Confirm the quote controls now feel consistent with those areas without changing their appearance unexpectedly.

## Pass/fail criteria

### Safe as-is

- Quote sidebar/editor actions now read as part of the olive/slate reservations system.
- Utility actions are calmer and more coherent.
- Header controls and dropdowns no longer feel blue-heavy.
- Modal footer shows a clear primary vs secondary hierarchy.
- No visible spillover appears on unrelated modal footers or unrelated reservations controls.

### Needs tiny stabilization patch

- A single state is off, such as:
  - one hover/focus state is still too blue
  - one active/disabled state is inconsistent
  - one RTL alignment issue appears
  - one responsive spacing issue appears
- In that case, patch only the exact failing quote-specific selector/state.

### Needs later reservations quote-only follow-up

- The cluster is broadly improved but still shows a local mismatch that would require a small second quote-only pass, such as:
  - header control grouping still feeling uneven
  - dropdown menu surface needing minor tone adjustment
  - modal footer balance needing slight secondary-button strengthening
- Do not broaden beyond the quote subsystem if this happens.
