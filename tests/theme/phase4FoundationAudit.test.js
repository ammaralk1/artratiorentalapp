import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TAILWIND_THEME_PATH = resolve(process.cwd(), 'src/styles/tailwind-theme.css');
const CORE_CSS_PATH = resolve(process.cwd(), 'src/styles/core.css');
const APP_CSS_PATH = resolve(process.cwd(), 'src/styles/app.css');
const MASTER_PLAN_PATH = resolve(process.cwd(), 'docs/UI_REDESIGN_MASTER_PLAN.md');

const read = (path) => readFileSync(path, 'utf8');

describe('phase 4 foundation audit', () => {
  it('locks the corrected semantic palette and missing token categories in tailwind theme', () => {
    const source = read(TAILWIND_THEME_PATH);

    expect(source).toContain('--color-primary: #567E56;');
    expect(source).toContain('--color-secondary: #8BA3B0;');
    expect(source).toContain('--color-accent: #93A889;');
    expect(source).toContain('--color-card-border: #2a4030;');
    expect(source).toContain('--space-md: 16px;');
    expect(source).toContain('--radius-lg: 12px;');
    expect(source).toContain('--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.4);');
    expect(source).toContain('--transition-base: 150ms ease-out;');
    expect(source).toContain('--focus-ring-color: #93A889;');
    expect(source).toContain('--text-base: 16px;');
    expect(source).not.toContain('--color-primary: #4f46e5;');
    expect(source).not.toContain('--color-primary: #3f5df5;');
    expect(source).not.toContain('--color-secondary: #0ea5e9;');
    expect(source).not.toContain('--color-secondary: #60a5fa;');
  });

  it('links the bridge layer to the corrected palette and the new shared primitives', () => {
    const coreSource = read(CORE_CSS_PATH);
    const appSource = read(APP_CSS_PATH);

    expect(coreSource).toContain('--bo-brand-primary: var(--color-primary, #567E56);');
    expect(coreSource).toContain('--bo-brand-secondary: var(--color-secondary, #8BA3B0);');
    expect(coreSource).toContain('--bo-brand-border: var(--color-card-border, #cfd8cf);');
    expect(coreSource).toContain('--bo-primitive-card-border: var(--color-card-border, var(--bo-color-content-border));');
    expect(coreSource).toContain('outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #93A889);');

    expect(appSource).toContain('.ui-stat-card,');
    expect(appSource).toContain('.compact-kpi-card {');
    expect(appSource).toContain('.ui-empty-state,');
    expect(appSource).toContain('.surface-empty-state {');
    expect(appSource).toContain('.ui-empty-state__title {');
    expect(appSource).toContain('.ui-empty-state__body {');
  });

  it('records the foundation-correction pass in the master plan before compact-family work continues', () => {
    const source = read(MASTER_PLAN_PATH);

    expect(source).toContain('Phase 4 Audit-Correction Foundation Pass');
    expect(source).toContain('The Phase 4 audit-foundation blocker is cleared');
    expect(source).toContain('`ui-stat-card`');
    expect(source).toContain('`ui-empty-state`');
    expect(source).toContain('`#567E56`');
    expect(source).toContain('`#8BA3B0`');
  });
});
