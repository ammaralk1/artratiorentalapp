# Phase 7 Shared Surface Map

## Repeated Pattern List

### Section headers
- Common structure:
  - `.tab-section-header`
  - `.tab-section-title`
  - a supporting paragraph directly under the title
- Current issue:
  - the support paragraph is often styled inline with utility classes such as `text-base text-base-content/70 mb-0`
  - the visual intent is repeated, but the hook is not shared

### Helper/support text blocks
- Repeated patterns found in:
  - projects workflow guidance paragraphs
  - dashboard workspace hint
  - contact inquiries workflow subtitle
  - feedback submissions workflow subtitle
  - technician financial helper text
- Current issue:
  - same muted-support-text role appears in multiple places with different utility combinations and no shared semantic hook

### Management form / panel surfaces
- Common structure:
  - `.management-form-box`
  - `.management-form-header`
  - `.management-form-icon`
  - `.management-form-header-text`
  - `.management-form-hint`
- Current issue:
  - the underlying visual treatment is shared, but the highlight surface still uses hard-coded RGBA values rather than semantic back-office aliases
  - this makes later brand application harder because surface colors and borders are not yet routed through the semantic token layer

### Card-like wrappers for short guidance
- Repeated patterns:
  - `glass-card` wrappers containing only one explanatory paragraph
- Current issue:
  - visually consistent enough today, but the text inside still depends on utility classes rather than a named explanatory-copy primitive

## Inconsistency Summary

- Section support text is visually similar but not expressed through a reusable semantic class.
- Small explanatory text uses a mix of:
  - `text-sm text-base-content/70`
  - `text-base text-base-content/70`
  - `management-form-hint`
  - plain `text-muted`
- Management-form headers are shared structurally but not yet fully tokenized.
- This creates avoidable drift when later brand values need to be applied consistently.

## Low-Risk Consolidation Opportunities

1. Add a shared `.section-support-text` primitive for subtitle text below section headers.
2. Add a shared `.surface-support-text` primitive for explanatory/support copy inside cards, workflow panels, and compact supporting contexts.
3. Route management-form header surface colors and borders through semantic back-office alias tokens instead of hard-coded RGBA values.
4. Keep current layout and markup intact apart from swapping repeated utility text classes to the new shared hooks where clearly safe.

## Brand-Readiness Opportunities

- Semantic support-text hooks make it possible to apply a future typography/brand pass centrally.
- Semantic panel-highlight tokens make it possible to change accent/soft-surface treatment later without editing every form shell.
- Consolidating helper text roles now reduces the risk of a future brand pass becoming a scattered utility-class rewrite.

## Recommended Smallest Safe Cleanup Order

1. Introduce semantic alias tokens for highlighted management surfaces.
2. Add shared support-text primitives in `app.css`.
3. Apply those primitives only to the clearest repeated surfaces:
  - section header support paragraphs
  - dashboard workspace hint
  - workflow subtitle text on feedback/contact pages
  - technician payout helper
4. Leave broader card/panel standardization for the next cleanup pass.
