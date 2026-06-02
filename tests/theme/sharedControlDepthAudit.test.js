import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('shared control depth audit', () => {
  it('keeps shared header controls on the green-toned shadow contract instead of the older navy cast', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('box-shadow: var(--bo-color-shell-shadow);');
    expect(appCss).toContain('box-shadow: var(--bo-color-shell-shadow-elevated);');
    expect(appCss).toContain('box-shadow: var(--bo-color-action-shadow);');
    expect(appCss).not.toContain('box-shadow: 0 28px 55px #040916a6;');
  });
});
