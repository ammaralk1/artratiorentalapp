import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MASTER_PLAN_PATH = resolve(process.cwd(), 'docs/UI_REDESIGN_MASTER_PLAN.md');
const CORE_CSS_PATH = resolve(process.cwd(), 'src/styles/core.css');
const APP_CSS_PATH = resolve(process.cwd(), 'src/styles/app.css');
const RESERVATIONS_CSS_PATH = resolve(process.cwd(), 'src/styles/reservations.css');
const ENHANCED_SELECT_CSS_PATH = resolve(process.cwd(), 'src/styles/enhanced-select.css');

const UNIFIED_DARK_SELECTOR =
  ':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])';

const readSource = (path) => readFileSync(path, 'utf8');

describe('primitive contract audit', () => {
  it('documents the first primitive contract in the master plan', () => {
    const source = readSource(MASTER_PLAN_PATH);

    expect(source).toContain('### Primitive Contract Snapshot');
    expect(source).toContain('`Button` contract');
    expect(source).toContain('`primary`, `secondary`, `outline`, `ghost`, and `danger`');
    expect(source).toContain('Legacy bridge mapping for existing markup is:');
    expect(source).toContain('`Input` and `Textarea` contract');
    expect(source).toContain('`Select` contract');
    expect(source).toContain('`Card` contract');
    expect(source).toContain('`StatCard` contract');
    expect(source).toContain('`EmptyState` contract');
    expect(source).toContain('`#567E56`');
    expect(source).toContain('`#8BA3B0`');
    expect(source).toContain('`ui-stat-card`');
    expect(source).toContain('`ui-empty-state`');
    expect(source).toContain('Before any page migration starts, every new primitive implementation must be backed by a shared audit');
  });

  it('keeps shared button and card foundations in the central style layers', () => {
    const source = readSource(CORE_CSS_PATH);

    expect(source).toContain('.ui-button,');
    expect(source).toContain('.btn {');
    expect(source).toContain('border-radius: var(--bo-primitive-button-radius);');
    expect(source).toContain('gap: var(--bo-primitive-button-gap);');
    expect(source).toContain('transition: var(--transition);');
    expect(source).toContain('-webkit-tap-highlight-color: transparent;');
    expect(source).toContain('.ui-button--primary,');
    expect(source).toContain('.btn-primary {');
    expect(source).toContain('background: var(--bo-color-action-bg);');
    expect(source).toContain('.btn-primary:active,');
    expect(source).toContain('background: var(--bo-color-action-bg-active);');
    expect(source).toContain('.btn-secondary {');
    expect(source).toContain('.ui-button--outline,');
    expect(source).toContain('.btn-outline-secondary {');
    expect(source).toContain('.ui-button--ghost,');
    expect(source).toContain('.btn-ghost {');
    expect(source).toContain('.ui-button--danger,');
    expect(source).toContain('.btn-danger {');
    expect(source).toContain(".ui-button:disabled,");
    expect(source).toContain(".btn:disabled,");
    expect(source).toContain(`${UNIFIED_DARK_SELECTOR} .ui-button--outline`);
    expect(source).toContain('.ui-card,');
    expect(source).toContain('.card {');
    expect(source).toContain('border: 1px solid var(--bo-primitive-card-border);');
    expect(source).toContain('background-color: var(--bo-primitive-card-bg);');
    expect(source).toContain('box-shadow: var(--bo-primitive-card-shadow);');
  });

  it('keeps shared field and select foundations tied to the control token family', () => {
    const appSource = readSource(APP_CSS_PATH);
    const coreSource = readSource(CORE_CSS_PATH);
    const reservationsSource = readSource(RESERVATIONS_CSS_PATH);
    const enhancedSelectSource = readSource(ENHANCED_SELECT_CSS_PATH);

    expect(appSource).toContain('.ui-input,');
    expect(appSource).toContain('.ui-textarea,');
    expect(appSource).toContain('.form-control,');
    expect(appSource).toContain('.form-textarea {');
    expect(appSource).toContain('background: var(--bo-color-control-bg);');
    expect(appSource).toContain('background-color: var(--bo-color-control-bg);');
    expect(appSource).toContain('border-color: var(--bo-color-control-border);');
    expect(appSource).toContain('color: var(--bo-color-text-primary);');
    expect(appSource).toContain('outline: 3px solid var(--bo-color-control-focus-ring);');
    expect(appSource).toContain('color-scheme: dark;');
    expect(appSource).toContain('.ui-select,');
    expect(appSource).toContain('min-height: var(--bo-primitive-control-min-height);');
    expect(appSource).toContain('.form-control:focus::placeholder,');
    expect(appSource).toContain('color: transparent;');
    expect(appSource).toContain('-webkit-text-fill-color: transparent;');
    expect(appSource).toContain('.form-control:disabled,');
    expect(appSource).toContain('.ui-input:disabled,');
    expect(appSource).toContain('.ui-select:disabled,');
    expect(appSource).toContain('background: var(--bo-color-control-disabled-bg);');
    expect(appSource).toContain(":where(html[dir='rtl']) .ui-select");
    expect(appSource).toContain(":where(html[dir='rtl']) .form-select");
    expect(appSource).toContain(`${UNIFIED_DARK_SELECTOR} .ui-select`);
    expect(appSource).toContain(`${UNIFIED_DARK_SELECTOR} .form-select`);
    expect(coreSource).toContain('border: 1px solid var(--bo-color-control-border);');
    expect(coreSource).toContain('background: var(--bo-color-control-bg);');
    expect(coreSource).toContain('outline: 3px solid var(--bo-color-control-focus-ring);');
    expect(coreSource).not.toContain('background-color: #1f2a44;');
    expect(coreSource).not.toContain('border-color: rgba(93, 133, 255, 0.75);');
    expect(coreSource).not.toContain('box-shadow: 0 0 0 4px rgba(76, 110, 245, 0.28);');
    expect(reservationsSource).toContain('.quote-terms-editor__textarea {');
    expect(reservationsSource).toContain('.reservation-notes__textarea {');
    expect(reservationsSource).toContain('.reservation-terms__textarea {');
    expect(reservationsSource).toContain('border: 1px solid var(--bo-color-control-border);');
    expect(reservationsSource).toContain('background: var(--bo-color-control-bg);');
    expect(reservationsSource).toContain('outline: 2px solid var(--bo-color-control-focus-ring);');
    expect(reservationsSource).not.toContain('border: 1px solid rgba(76, 110, 245, 0.2);');
    expect(reservationsSource).not.toContain('border: 1px solid rgba(76, 110, 245, 0.24);');
    expect(reservationsSource).not.toContain('box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.14);');

    expect(enhancedSelectSource).toContain('.ui-select-trigger,');
    expect(enhancedSelectSource).toContain('.enhanced-select__trigger {');
    expect(enhancedSelectSource).toContain('min-height: 3.1rem;');
    expect(enhancedSelectSource).toContain('border: 1px solid var(--bo-color-control-border);');
    expect(enhancedSelectSource).toContain('outline: 3px solid var(--bo-color-control-focus-ring);');
    expect(enhancedSelectSource).toContain(":where(html[dir='rtl']) .ui-select-trigger");
    expect(enhancedSelectSource).toContain(":where(html[dir='rtl']) .enhanced-select__trigger");
    expect(enhancedSelectSource).toContain(`${UNIFIED_DARK_SELECTOR} .ui-select-trigger`);
    expect(enhancedSelectSource).toContain(`${UNIFIED_DARK_SELECTOR} .enhanced-select__trigger`);
  });
});
