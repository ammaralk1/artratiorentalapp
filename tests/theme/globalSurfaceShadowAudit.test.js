import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('global surface shadow audit', () => {
  it('keeps the light-theme shared surface and control shadows on the reduced global contract', () => {
    const coreCss = readSource('src/styles/core.css');

    expect(coreCss).toContain('--shadow-xs: 0 1px 2px rgba(23, 31, 27, 0.06);');
    expect(coreCss).toContain('--shadow-sm: 0 2px 6px rgba(23, 31, 27, 0.06);');
    expect(coreCss).toContain('--shadow-md: 0 8px 18px rgba(23, 31, 27, 0.1);');
    expect(coreCss).toContain('--bo-color-shell-shadow: 0 12px 28px rgba(23, 31, 27, 0.05);');
    expect(coreCss).toContain('--bo-color-shell-shadow-elevated: 0 16px 34px rgba(23, 31, 27, 0.08);');
    expect(coreCss).toContain('--bo-color-content-shadow: 0 8px 20px rgba(23, 31, 27, 0.045);');
    expect(coreCss).toContain('--bo-color-content-shadow-elevated: 0 12px 24px rgba(23, 31, 27, 0.07);');
    expect(coreCss).toContain('--bo-color-tab-shell-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.42), 0 8px 18px rgba(23, 31, 27, 0.05);');
    expect(coreCss).toContain('--bo-color-tab-hover-shadow: 0 10px 20px rgba(23, 31, 27, 0.07);');
    expect(coreCss).toContain('--bo-color-tab-active-shadow: 0 12px 24px rgba(31, 48, 34, 0.12);');
    expect(coreCss).toContain('--bo-color-action-shadow: none;');
    expect(coreCss).toContain('--bo-color-action-shadow-hover: none;');
    expect(coreCss).toContain('--bo-color-control-shadow: 0 14px 28px rgba(23, 31, 27, 0.08);');
    expect(coreCss).toContain('--bo-primitive-button-shadow: none;');
    expect(coreCss).toContain('--bo-primitive-button-shadow-hover: none;');
  });

  it('keeps the dark-theme shared surface and control shadows on the reduced global contract', () => {
    const coreCss = readSource('src/styles/core.css');

    expect(coreCss).toContain('--bo-color-shell-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);');
    expect(coreCss).toContain('--bo-color-shell-shadow-elevated: 0 14px 28px rgba(0, 0, 0, 0.22);');
    expect(coreCss).toContain('--bo-color-content-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);');
    expect(coreCss).toContain('--bo-color-content-shadow-elevated: 0 12px 24px rgba(0, 0, 0, 0.2);');
    expect(coreCss).toContain('--bo-color-tab-shell-shadow: 0 6px 14px rgba(0, 0, 0, 0.14);');
    expect(coreCss).toContain('--bo-color-tab-hover-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);');
    expect(coreCss).toContain('--bo-color-tab-active-shadow: 0 10px 18px rgba(0, 0, 0, 0.18);');
    expect(coreCss).toContain('--bo-color-action-shadow: none;');
    expect(coreCss).toContain('--bo-color-action-shadow-hover: none;');
    expect(coreCss).toContain('--bo-color-control-shadow: 0 16px 30px rgba(3, 10, 8, 0.34);');
    expect(coreCss).toContain('--bo-primitive-button-shadow: none;');
    expect(coreCss).toContain('--bo-primitive-button-shadow-hover: none;');
  });

  it('keeps shared cards, buttons, and controls routed through the centralized shadow tokens', () => {
    const appCss = readSource('src/styles/app.css');
    const coreCss = readSource('src/styles/core.css');

    expect(appCss).toContain('box-shadow: var(--bo-color-shell-shadow);');
    expect(appCss).toContain('box-shadow: var(--bo-color-content-shadow);');
    expect(appCss).toContain('box-shadow: var(--bo-color-control-shadow);');
    expect(coreCss).toContain('--bo-primitive-button-shadow: none;');
    expect(coreCss).toContain('--bo-primitive-button-shadow-hover: none;');
  });
});
