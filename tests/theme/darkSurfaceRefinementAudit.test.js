import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dark surface refinement audit', () => {
  it('keeps the shared dark token contract on the softer tonal-depth values', () => {
    const coreCss = readSource('src/styles/core.css');

    expect(coreCss).toContain('--bo-color-page-bg-solid: #070d08;');
    expect(coreCss).toContain('--bo-color-page-bg: #070d08;');
    expect(coreCss).toContain('--bo-color-shell-bg: rgba(18, 28, 23, 0.9);');
    expect(coreCss).toContain('--bo-color-shell-border: rgba(147, 168, 137, 0.1);');
    expect(coreCss).toContain('--bo-color-content-bg: rgba(21, 31, 25, 0.94);');
    expect(coreCss).toContain('--bo-color-content-border: rgba(147, 168, 137, 0.12);');
    expect(coreCss).toContain('--bo-color-control-border: rgba(133, 150, 142, 0.24);');
    expect(coreCss).toContain('--bo-color-tab-active-bg: rgba(70, 104, 70, 0.9);');
  });

  it('keeps the login auth surface on the approved restrained cinematic contract', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('--auth-surface: #1f3024;');
    expect(appCss).toContain('--auth-surface-elevated: #26392c;');
    expect(appCss).toContain('--auth-accent: #3e563e;');
    expect(appCss).toContain('--auth-support: #93a889;');
    expect(appCss).toContain('--auth-data: #7993a0;');
    expect(appCss).toContain("background: #0f1510;");
    expect(appCss).toContain("background: rgba(11, 16, 12, 0.92);");
    expect(appCss).toContain("background: #0f1510;");
    expect(appCss).toContain("background: #4a6448;");
    expect(appCss).toContain('0 0 0 1px rgba(147, 168, 137, 0.28),');
    expect(appCss).toContain('0 0 0 3px rgba(62, 86, 62, 0.18);');
  });
});
