# templatesTab.js Split Plan

Target file: `src/scripts/projects/templatesTab.js`  
Current size: 3,787 lines  
Goal: reduce the entry point to orchestration only, preserve behavior, and add direct tests around the highest-risk flows.

## Why This File Is Next

`templatesTab.js` still mixes six responsibilities:

- preview construction and rerendering
- saved-template API CRUD
- local/remote autosave
- print/PDF + tuner UI
- editing/table interactions
- page/tab lifecycle wiring

That is the biggest remaining frontend regression surface.

## Recommended Module Boundaries

Create a new directory:

- `src/scripts/projects/templatesTab/`

Recommended modules:

1. `state.ts`
- Own all module-level mutable state now scattered at the top of `templatesTab.js`
- Includes zoom state, listener refs, timers, edit-state flags, language, autosave ids/timers

2. `context.ts`
- Selected project/reservation helpers
- context key builders
- read/write small localStorage preferences
- company/logo constants and URL normalization helpers

3. `preview.ts`
- `renderTemplatesPreview()`
- preview DOM replacement
- `ensureEditableWrappers()`
- callsheet structure enforcement hooks
- final post-render steps like pagination/toolbar/debug overlay

4. `zoom.ts`
- zoom preference reads/writes
- fit/manual mode
- zoom UI creation and resize binding

5. `autosave.ts`
- local autosave snapshot read/write
- remote autosave id management
- debounced server autosave
- HTML sanitization before save/export

6. `saved-templates.ts`
- `saveTemplateSnapshot()`
- `fetchSavedTemplatesForCurrent()`
- `populateSavedTemplates()`
- `loadSnapshotById()`
- rename/delete/export/import helpers

7. `print.ts`
- `printTemplatesPdf()`
- print preview overlay
- PDF tuner state/UI helpers
- page-specific export preference helpers

8. `editing.ts`
- table input handling
- IME composition handling
- focus/mousedown handlers
- expense subtotal recomputation
- expense code renumbering
- crew/callsheet table normalization

9. `toolbar.ts`
- selection font/bold/shading helpers
- cell toolbar integration points that are still local to templates tab behavior

10. `lifecycle.ts`
- `initTemplatesTab()`
- `destroyTemplatesTab()`
- repopulation scheduling
- document/tab event registration
- wire-up between the modules above

11. `index.js` or `index.ts`
- tiny public entry point re-exporting `initTemplatesTab` and `destroyTemplatesTab`

## Order Of Extraction

Use this sequence to keep risk low:

1. Extract `state`
- Lowest behavioral risk
- Gives every later module a clean dependency surface

2. Extract `context` and `zoom`
- Mostly pure/small helpers
- Reduces noise in the main file quickly

3. Extract `autosave` and `saved-templates`
- Strong internal cohesion
- API/storage concerns separate cleanly from rendering

4. Extract `print`
- Self-contained and already partially delegated to `src/scripts/templates/print.js`

5. Extract `editing`
- Higher risk because of DOM events, composition events, and subtotal timing

6. Extract `preview`
- After state/editing/print pieces are isolated, render orchestration becomes manageable

7. Reduce `initTemplatesTab()` into `lifecycle`
- Final step once every dependency has a stable module

## Dependency Rules

- Keep shared mutable state in one exported `state` object.
- Prefer setter injection if two modules need each other.
- Do not move existing pure builders out of `src/scripts/templates/`; reuse them.
- Keep DOM selectors centralized where possible to reduce string drift.
- Avoid introducing new global hooks except where the current behavior already depends on them.

## TypeScript Recommendation

Preferred path:

- New modules under `src/scripts/projects/templatesTab/` should be `.ts`
- Keep the existing top-level `templatesTab.js` as the temporary compatibility entry point until the split is complete

Why:

- This follows `CLAUDE.md`
- The new modules are a good narrow boundary for Phase G without forcing a whole-file rewrite first

If this becomes too expensive during extraction, fallback is acceptable:

- complete the split in `.js`
- convert the new directory to `.ts` immediately after behavior is stable

## Minimum Tests To Add During The Split

Add a new test area:

- `tests/projects/templatesTab/`

Recommended first tests:

1. `context.test.js`
- selected project/reservation resolution
- context key generation
- localStorage preference round-trips

2. `autosave.test.js`
- HTML snapshot sanitization
- remote autosave id reuse/creation behavior
- debounced autosave scheduling

3. `saved-templates.test.js`
- payload shaping for save/copy/import/export
- load/restore from returned API data

4. `preview.test.js`
- empty-state rendering when no project is selected
- correct builder path for `callsheet` vs `expenses`
- preserve/replace preview root correctly

5. `editing.test.js`
- subtotal recomputation from edited cells
- IME composition guard behavior
- focus and mouse handlers do not throw on nested editables

Start with pure/helper tests first if time is tight. The critical point is to stop leaving templates behavior completely untested.

## Definition Of Done

- `src/scripts/projects/templatesTab.js` becomes a thin orchestration entry point or compatibility shim
- high-risk logic is moved into named modules with clear ownership
- `npx vitest run` stays green
- `npx tsc --noEmit` stays clean
- at least one direct templates-focused test suite exists
- no user-visible behavior regressions in:
  - preview render
  - save/copy/load/import/export
  - print/PDF
  - expense editing and totals
  - tab re-entry / repopulation
