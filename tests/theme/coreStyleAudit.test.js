import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CORE_CSS_PATH = resolve(process.cwd(), 'src/styles/core.css');

describe('theme core style audit', () => {
  it('does not contain malformed dark-mode selector tokens', () => {
    const source = readFileSync(CORE_CSS_PATH, 'utf8');

    expect(source).not.toContain('html-dark-mode');
    expect(source).not.toContain('body-dark-mode');
  });
});
