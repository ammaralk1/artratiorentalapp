import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');
const DARK_SELECTOR = ':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])';

describe('shared shell surface ownership audit', () => {
  it('keeps the root canvas separate from the page surface so overscroll uses the theme canvas globally', () => {
    const coreCss = readSource('src/styles/core.css');
    const appCss = readSource('src/styles/app.css');

    expect(coreCss).toContain('--bo-color-canvas-bg: #e7ece3;');
    expect(coreCss).toContain('--bo-color-canvas-bg: #070d08;');
    expect(coreCss).toContain(':root:where(.dark, .dark-mode, [data-theme="dark"]),');
    expect(coreCss).toContain('html {');
    expect(coreCss).toContain('background: var(--bo-color-canvas-bg);');
    expect(coreCss).toContain('body {');
    expect(coreCss).toContain('background-color: var(--bo-color-canvas-bg);');
    expect(coreCss).toContain('min-height: 100dvh;');
    expect(coreCss).toContain('body::before {');
    expect(coreCss).toContain('position: fixed;');
    expect(coreCss).toContain('inset: 0;');
    expect(coreCss).toContain('background: var(--bo-color-canvas-bg);');
    expect(coreCss).toContain('color-scheme: dark;');
    expect(appCss).toContain('.page-shell {');
    expect(appCss).toContain('background: transparent;');
    expect(appCss).toContain('background-color: transparent;');
  });

  it('keeps page-grid transparent so the app background is owned by the root page surface', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('.page-grid {');
    expect(appCss).toContain('background: transparent;');
    expect(appCss).toContain('background-color: transparent;');
  });

  it('keeps the shared dashboard header from painting a full-width shell strip', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('.dashboard-header {');
    expect(appCss).toContain('padding-top: 0.75rem;');
    expect(appCss).toContain('border-bottom: 0;');
    expect(appCss).toContain('box-shadow: none;');
    expect(appCss).toContain('backdrop-filter: none;');
    expect(appCss).toContain('.dashboard-header-nav {');
    expect(appCss).toContain('background: var(--dashboard-topbar-shell-bg);');
    expect(appCss).toContain('border: 1px solid var(--dashboard-topbar-shell-border);');
    expect(appCss).toContain('--dashboard-topbar-panel-bg: #f1f4ee;');
    expect(appCss).toContain(`${DARK_SELECTOR} .page-shell {`);
    expect(appCss).toContain('--dashboard-topbar-panel-bg: rgba(22, 29, 23, 0.98);');
  });

  it('keeps shell-critical top-bar geometry outside the cascade layer so Bootstrap pages match home', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('.dashboard-header .dashboard-greeting-toggle {');
    expect(appCss).toContain('border-radius: 1rem;');
    expect(appCss).toContain('.dashboard-header .language-toggle-btn {');
    expect(appCss).toContain('font-size: clamp(0.75rem, 2vw, 0.92rem);');
    expect(appCss).toContain('grid-template-columns: minmax(0, 1fr) auto;');
    expect(appCss).toContain('margin-inline: 0;');
  });

  it('keeps generic table wrappers structural so inner table shells remain the visual owner', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('.table-wrapper {');
    expect(appCss).toContain('background: transparent;');
    expect(appCss).toContain('border: 0;');
    expect(appCss).toContain('box-shadow: none;');
  });
});
