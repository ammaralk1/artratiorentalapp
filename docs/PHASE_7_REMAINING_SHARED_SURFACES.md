> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 7 Remaining Shared Surfaces

## Remaining Repeated Surfaces

### Heading / intro stacks inside panels and cards
- Repeated pattern:
  - heading
  - muted explanatory/support paragraph
  - wrapper usually written as `div` or `header` with local spacing utilities
- Seen across:
  - home
  - users
  - site analytics
  - contact inquiries
  - feedback submissions
  - detail/workflow side panels
- Current issue:
  - the content role is shared, but the wrapper still depends on repeated page-local utility combinations instead of a named primitive

### Dashed empty-state / placeholder panels
- Repeated pattern:
  - rounded dashed border
  - centered muted text
  - padding varies slightly by location
- Seen across:
  - contact inquiries
  - feedback submissions
  - site analytics
  - technician detail
- Current issue:
  - same empty-state role is implemented repeatedly through page-local utility classes

### Guidance-only `glass-card` blocks
- Repeated pattern:
  - `glass-card`
  - one heading stack or one explanatory paragraph
- Current issue:
  - the surfaces are visually close, but supporting structure still lacks one shared shell for heading stacks and empty-state content

## Lowest-Risk Remaining Consolidation Opportunities

1. Add a shared heading-stack primitive for repeated small section/panel intros.
2. Add a shared empty-state primitive for dashed placeholder surfaces while preserving existing padding and placement.
3. Leave broader `glass-card` family refactoring for later because it would affect more layout surfaces at once.

## Brand-Readiness Opportunity

- Once heading stacks and empty states use shared hooks, a later brand-application pass can:
  - update supporting text rhythm
  - change muted-support hierarchy
  - restyle empty-state surfaces
  centrally instead of page by page.

## Smallest Safe Cleanup Choice For Pass 3

- Introduce:
  - `.surface-heading-stack`
  - `.surface-empty-state`
- Apply them only to the clearest repeated surfaces in the internal back-office pages.

## Brand Application Readiness Judgment

- The system is close to a safe brand-application starting point after this pass, provided the cleanup stays at the primitive layer and does not attempt a broad re-theme yet.
- One later brand-application phase can now reasonably target semantic tokens and shared primitives instead of scattered utility text and placeholder shells.
