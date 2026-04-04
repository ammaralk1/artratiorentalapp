# Brand Application Pass 2 Plan

## Goal
- Extend brand application beyond the first primitive batch without redesigning layouts or introducing page-by-page styling drift.
- Keep the app readable, operational, and safe on the restored real local dataset.

## Safest Next Targets

### 1. Shared panel/card shells
- Targets:
  - `glass-card`
  - `card-surface`
  - `box`
  - `management-form-box`
  - dashboard greeting panel shell
- Why they are safe:
  - these are already shared structural wrappers
  - they are styling-only surfaces with no behavioral logic
  - they are already token-ready after Phase 7 cleanup

### 2. Shared tab shell and state accents
- Targets:
  - `tab-buttons`
  - `tab-button`
  - `tab-button.active`
  - `sub-tab-buttons`
  - `sub-tab-button.active`
  - repeated dashboard/home/projects tab-button hover/active states
- Why they are safe:
  - tab behavior is JS-owned; this pass changes only visual state styling
  - these controls are shared across the main back-office workspaces

## What Should Change
- Introduce semantic tokens for:
  - shared shell background
  - shared shell border
  - shared shell shadow
  - shared tab shell background
  - shared tab hover background/border/shadow
  - shared tab active background/border/shadow/foreground
- Route shared shells and tab states through those tokens.
- Keep the visual direction close to the current UI, but replace the generic blue drift with the Art Ratio panel/slate/sage palette where those surfaces are already shared.

## What Should Remain Unchanged
- Layout structure.
- Markup hierarchy.
- Page-specific one-off surfaces.
- Global status colors.
- Generic button families outside the already isolated shared primitives.
- Sidebar/public-template styling.

## Expected Visual Benefit
- Shared shells should feel more cohesive and branded instead of partly blue and partly neutral.
- Tab controls across home/dashboard/projects should look more intentionally related to the brand palette.
- The UI should feel more consistent without becoming visually louder.

## Contrast / Readability Considerations
- Active tabs must keep clear foreground contrast.
- Hover states should remain subtle enough for dense operational use.
- Shell backgrounds should stay light and readable in light mode, and deep/controlled in dark mode.
- This pass avoids recoloring dense data tables or content text blocks.

## Runtime-Risk Considerations With Real Local Data
- Styling changes touch the exact pages that were previously used as runtime checkpoints:
  - login
  - home
  - dashboard
  - projects
- Even though this is visual-only work, the real local restored dataset will still be rechecked after the batch to make sure no shared-surface markup or class assumptions were disturbed.

## Smallest Safe Brand Batch
1. Add panel-shell semantic tokens in [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css).
2. Add shared tab-state semantic tokens in [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css).
3. Apply those tokens to:
   - `glass-card`
   - `card-surface`
   - `box`
   - `tab-buttons`
   - `tab-button`
   - `tab-button.active`
   - `sub-tab-buttons`
   - `sub-tab-button.active`
4. Re-validate on isolated real local backup data before continuing.
