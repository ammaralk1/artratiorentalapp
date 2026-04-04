# Brand Alignment Audit

## Goal
- Correct the visually unbalanced state after the first two brand passes.
- Reduce residual old-blue dominance through shared tokens and shared primitives only.

## What Still Looked Old-Themed
- Shared tab shells had already moved toward the Art Ratio palette, but several active and hover states still carried old-blue emphasis through hard-coded shared rules.
- Large shared shells still read closer to the old template because the page background and the base `.box` surface remained blue-biased.
- Some secondary chrome elements were still visually disconnected from the new token family:
  - `sidebar-link-active`
  - `dashboard-greeting-panel`
  - `dashboard-greeting-toggle`
  - `sidebar-brand-logo`
  - `tab-scroll-btn`
  - dark-mode tab/side icon colors
  - `badge-soft`

## Where Blue Dominance Was Too Strong
- `src/styles/core.css`
  - page background on `html` and `body`
  - base `.box` border/background/shadow
- `src/styles/app.css`
  - `sidebar-link-active`
  - `dashboard-greeting-panel`
  - `dashboard-greeting-toggle` and its open/hover states
  - dark-mode `tab-buttons-vertical .tab-button svg`
  - `sidebar-brand-logo`
  - `tab-scroll-btn`
  - `badge-soft`
- `dist/css/sidebar.css`
  - fallback scroll thumb colors
  - dark-mode sidebar tab icon color
- `src/scripts/ui/injectSidebarStyles.js`
  - fallback sidebar active-link and dark sidebar-link visuals

## Tab / Surface Mismatch Summary
- The shared tab containers already used green/slate token styling, but the state system was still inconsistent:
  - some tabs used the new brand shell background
  - some active/hover states still used electric blue or indigo-family gradients
- Shared shells were also mismatched:
  - outer wrappers showed limited brand adoption
  - panels such as the dashboard greeting panel still read as legacy blue glass surfaces
  - page-level base chrome made the whole UI feel more blue than the shared token layer intended

## Safest Adjustments To Apply First
1. Rebalance the shared shell and tab tokens in `src/styles/core.css`.
2. Replace the remaining old-blue shared state rules in `src/styles/app.css`.
3. Align fallback shared chrome in `dist/css/sidebar.css` and `src/scripts/ui/injectSidebarStyles.js` so runtime fallback does not drift from the main token layer.

## Contrast / Readability Considerations
- Keep body text on dark neutral text values rather than pushing green into copy.
- Keep active tabs clearly emphasized with strong contrast and white text.
- Use green/slate as surface hierarchy, border, and state color rather than bright glow.
- Preserve operational status colors; this pass is not a status-color redesign.

## Runtime-Risk Notes
- The app should be rechecked against the isolated real local backup data after the batch because `home`, `dashboard`, and `projects` all depend on shared shells and tab chrome.
- Manual browser verification is ideal, but headless runtime verification is still useful for confirming persisted computed styles after refresh.
