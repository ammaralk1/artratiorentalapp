import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const UNIFIED_DARK_SELECTOR = ':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])';
const DARK_TOKEN_OWNER = ':root:where(.dark, .dark-mode, [data-theme="dark"]),';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dark selector contract audit', () => {
  it('uses the unified dark selector in the shared app shell styles', () => {
    const source = readSource('src/styles/app.css');

    expect(source).toContain(UNIFIED_DARK_SELECTOR);
    expect(source).not.toMatch(/html\.dark,\s*\n\s*body\.dark\s*\{/);
    expect(source).not.toMatch(/html\.dark \.page-grid,\s*\n\s*body\.dark \.page-grid\s*\{/);
  });

  it('uses the unified dark selector in enhanced select styles', () => {
    const source = readSource('src/styles/enhanced-select.css');

    expect(source).toContain(UNIFIED_DARK_SELECTOR);
    expect(source).not.toContain(':where(html.dark, body.dark) .enhanced-select__trigger');
    expect(source).not.toContain(':where(html.dark, body.dark) .enhanced-select__menu');
  });

  it('uses the unified dark selector in the global foundation rules of core styles', () => {
    const source = readSource('src/styles/core.css');

    expect(source).toContain(DARK_TOKEN_OWNER);
    expect(source).toContain('body:where(.dark, .dark-mode, [data-theme="dark"]) {');
    expect(source).toContain(`${UNIFIED_DARK_SELECTOR} h1,`);
    expect(source).not.toContain(':is(html.dark-mode, body.dark-mode) {');
    expect(source).not.toContain('html.dark-mode body {');
    expect(source).not.toContain('html.dark-mode .home-navbar {');
  });
});
