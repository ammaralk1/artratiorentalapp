# Brand Application Token Map

## Goal
- Apply the Art Ratio brand to the back-office UI through the semantic token layer that was prepared in Phase 7.
- Keep the app operationally readable and familiar while improving visual alignment and polish.

## Current Semantic Token Structure
- Low-level base tokens still exist in [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css):
  - `--clr-*`
  - radius/shadow primitives
- Back-office semantic aliases also exist in [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css):
  - `--bo-color-*`
  - `--bo-radius-*`
  - `--bo-shadow-*`
- Shared primitives already consume those aliases in [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css):
  - management surfaces
  - helper/support text
  - heading stacks
  - empty states
  - list pagination

## Brand Mapping Proposal

### Source palette
- Brand reference was taken from [backend/services/brand_email.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/services/brand_email.php):
  - panel: `#1f3022`
  - slate: `#8EA7B5`
  - sage: `#9AAA91`
  - surface: `#FFFFFF`
  - body text: `#1f2937`

### Chosen semantic mapping
- Primary:
  - `#1f3022`
  - role:
    - branded action surfaces
    - emphasized section headings
    - management accents
- Secondary:
  - `#8EA7B5`
  - role:
    - border guidance
    - info/support framing
    - cooler balancing tone for pagination/support shells
- Accent:
  - `#9AAA91`
  - role:
    - soft fills
    - helper/panel wash
    - empty-state tinting
- Surface:
  - `#FFFFFF`
  - role:
    - base content surfaces
- Text:
  - `#1f2937`
  - role:
    - primary readable text
- Muted text:
  - `#5f7182`
  - role:
    - support copy
    - summaries
    - empty-state description
- Border:
  - `rgba(142, 167, 181, 0.28)`
  - role:
    - shared surface framing
    - low-contrast separators
- Success:
  - keep existing operational green
- Warning:
  - keep existing operational amber
- Danger:
  - keep existing operational red
- Info:
  - use slate family rather than introducing a new unrelated hue

## Rationale
- The first pass uses brand color mostly on shared primitives rather than all raw `.btn-primary` usage.
- That keeps operational interaction patterns stable while still making the UI visibly more “Art Ratio” than generic blue SaaS chrome.
- Shared surfaces now carry the brand consistently:
  - management headers
  - pagination shells
  - empty states
  - section headers
  - primary workflow buttons that already rely on shared styling hooks

## Pass 2 Token Expansion
- Added/expanded semantic coverage for:
  - shared shell background
  - shared shell border
  - shared shell shadow
  - shared tab shell background
  - shared tab hover state
  - shared tab active state
- These tokens now support branding on:
  - `glass-card`
  - `card-surface`
  - `box`
  - shared tab containers
  - dashboard/home/projects tab states

## Typography Opportunities
- No font-family change was introduced in this pass.
- `Tajawal` remains the UI font because it already fits the bilingual back-office context.
- Safe later opportunities:
  - slightly stronger heading-weight hierarchy through shared heading primitives
  - tighter small-label and helper-copy rhythm through tokenized sizing, not page-local utility edits

## Readability / Contrast Notes
- Body text remains anchored to dark neutral text rather than sage/slate to preserve legibility.
- Status colors were left operational, not brand-recolored.
- Dark mode uses darker evergreen/slate accents only inside semantic primitives, not through a full dark-theme recolor.
- The first pass deliberately avoids recoloring the whole layout background or every generic button class.

## Safest First Application Targets
1. Management surfaces:
   - `management-form-header`
   - `management-form-icon`
   - management form primary actions
2. Shared support/info surfaces:
   - `section-support-text`
   - `surface-support-text`
   - `surface-empty-state`
3. Shared navigation/list helper surfaces:
   - `list-pagination`
4. Shared section emphasis:
   - `tab-section-title`
5. Shared CTA buttons already isolated by primitive:
   - `primary-action-btn`

## Intentionally Deferred
- Global `.btn-primary` replacement across every module.
- Broad recoloring of tab shells, sidebars, or full-page backgrounds.
- Print/export-specific stylesheets.
- Any changes to the public template in `Arino - Template/`.

## Pass 2 Scope Decision
- Included:
  - shared panel/card shells
  - shared tab containers and active/hover states
- Still deferred:
  - sidebar-specific tab surfaces
  - page-local table wrappers
  - broader background and chrome restyling

## Corrective Alignment Rebalance
- A later corrective pass rebalanced the semantic shell and tab tokens after runtime visual review showed that:
  - some shared shells still read too blue
  - some active/hover tab states still felt like the old theme
- The corrective rebalance adjusted:
  - page background tokens
  - shell background/border/shadow tokens
  - tab shell background/border/shadow tokens
  - tab hover and active tokens
- The intent of that rebalance was:
  - less electric-blue dominance
  - more premium evergreen/slate hierarchy
  - stronger consistency across `home`, `dashboard`, and `projects`
