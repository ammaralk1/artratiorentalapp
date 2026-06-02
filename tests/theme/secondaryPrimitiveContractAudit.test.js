import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MASTER_PLAN_PATH = resolve(process.cwd(), 'docs/UI_REDESIGN_MASTER_PLAN.md');
const CORE_CSS_PATH = resolve(process.cwd(), 'src/styles/core.css');
const APP_CSS_PATH = resolve(process.cwd(), 'src/styles/app.css');

const UNIFIED_DARK_SELECTOR =
  ':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])';

const readSource = (path) => readFileSync(path, 'utf8');

describe('secondary primitive contract audit', () => {
  it('documents the shared table, modal, tabs, and badge contracts in the master plan', () => {
    const source = readSource(MASTER_PLAN_PATH);

    expect(source).toContain('`Table` contract');
    expect(source).toContain('`Modal` contract');
    expect(source).toContain('`Tabs` contract');
    expect(source).toContain('`Badge` contract');
    expect(source).toContain('The second bridge implementation now exists in the shared style layer');
  });

  it('keeps shared modal and badge foundations in the central style layers', () => {
    const source = readSource(CORE_CSS_PATH);

    expect(source).toContain('.ui-modal__content,');
    expect(source).toContain('.modal-content {');
    expect(source).toContain('.ui-modal__header,');
    expect(source).toContain('.modal-header {');
    expect(source).toContain('.ui-modal__body,');
    expect(source).toContain('.modal-body {');
    expect(source).toContain('.ui-modal__footer,');
    expect(source).toContain('.modal-footer {');
    expect(source).toContain('.ui-badge,');
    expect(source).toContain('.badge {');
    expect(source).toContain('display: inline-flex;');
    expect(source).toContain('justify-content: center;');
  });

  it('keeps shared table, tabs, and badge variants tied to the app style layer', () => {
    const source = readSource(APP_CSS_PATH);

    expect(source).toContain('.ui-tabs,');
    expect(source).toContain('.tab-buttons {');
    expect(source).toContain('.ui-tab,');
    expect(source).toContain('.tab-button {');
    expect(source).toContain(".ui-tab[aria-selected='true'],");
    expect(source).toContain('.ui-table-shell:not(.technician-table-wrapper),');
    expect(source).toContain('.table-responsive:not(.technician-table-wrapper) {');
    expect(source).toContain('.ui-table,');
    expect(source).toContain('.table {');
    expect(source).toContain('.ui-table thead th,');
    expect(source).toContain('.ui-table tbody td,');
    expect(source).toContain('.ui-badge--soft,');
    expect(source).toContain('.badge-soft {');
    expect(source).toContain('.ui-badge--outline,');
    expect(source).toContain('.badge-outline {');
    expect(source).toContain(`${UNIFIED_DARK_SELECTOR} .ui-badge`);
    expect(source).toContain(`${UNIFIED_DARK_SELECTOR} .ui-tabs--vertical`);
  });
});
