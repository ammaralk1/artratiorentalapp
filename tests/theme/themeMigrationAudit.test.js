import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const STYLES_DIR = resolve(process.cwd(), 'src/styles');
const UNIFIED_DARK_SELECTOR =
  ':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])';
const CLEANED_SELECTOR_PATHS = [
  'src/styles/app.css',
  'src/styles/core.css',
  'src/styles/reports.css',
  'src/styles/reservations.css',
  'src/styles/templatesA4.css',
  'src/styles/forms.css',
  'src/styles/maintenance.css',
  'src/styles/tabs.css',
];

const readStyle = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

const listStylePaths = () =>
  readdirSync(STYLES_DIR)
    .filter((fileName) => fileName.endsWith('.css'))
    .map((fileName) => `src/styles/${fileName}`)
    .sort();

const countMatches = (source, pattern) => [...source.matchAll(pattern)].length;

describe('theme migration audit', () => {
  it('keeps semantic and bridge token ownership centralized', () => {
    const semanticOwner = readStyle('src/styles/tailwind-theme.css');
    const bridgeOwner = readStyle('src/styles/core.css');
    const stylePaths = listStylePaths();

    expect(semanticOwner).toContain('--color-primary:');
    expect(semanticOwner).toContain('--color-base-100:');
    expect(bridgeOwner).toContain('--bo-color-action:');
    expect(bridgeOwner).toContain('--clr-text:');

    const colorDefinitionOwners = stylePaths.filter((path) => /^\s*--color-[\w-]+\s*:/m.test(readStyle(path)));
    const boDefinitionOwners = stylePaths.filter((path) => /^\s*--bo-[\w-]+\s*:/m.test(readStyle(path)));
    const clrDefinitionOwners = stylePaths.filter((path) => /^\s*--clr-[\w-]+\s*:/m.test(readStyle(path)));

    expect(colorDefinitionOwners).toEqual(['src/styles/tailwind-theme.css']);
    expect(boDefinitionOwners).toEqual(['src/styles/app.css', 'src/styles/core.css']);
    expect(clrDefinitionOwners).toEqual(['src/styles/core.css']);
  });

  it('tracks remaining legacy dark-selector debt by file until migration is complete', () => {
    const expectedLegacyCounts = {};

    const debtFiles = listStylePaths().filter((path) => {
      const source = readStyle(path);

      return (
        source.includes(':is(html.dark-mode') ||
        source.includes(':where(html.dark-mode') ||
        /:is\(\s*html\.dark-mode,\s*body\.dark-mode/gs.test(source) ||
        /:where\(\s*html\.dark-mode,\s*body\.dark-mode/gs.test(source)
      );
    });

    Object.entries(expectedLegacyCounts).forEach(([path, expected]) => {
      const source = readStyle(path);

      expect(countMatches(source, /:is\(\s*html\.dark-mode,\s*body\.dark-mode/gs)).toBe(expected.legacyIs);
      expect(countMatches(source, /:where\(\s*html\.dark-mode,\s*body\.dark-mode/gs)).toBe(expected.legacyWhere);
    });

    expect(debtFiles).toEqual([]);
    expect(readStyle('src/styles/calendar.css')).not.toMatch(/:is\(\s*html\.dark-mode,\s*body\.dark-mode/gs);
    expect(readStyle('src/styles/calendar.css')).not.toMatch(/:where\(\s*html\.dark-mode,\s*body\.dark-mode/gs);
  });

  it('keeps the low-risk feature styles on the unified dark-selector contract', () => {
    CLEANED_SELECTOR_PATHS.forEach((path) => {
      const source = readStyle(path);

      expect(source).toContain(UNIFIED_DARK_SELECTOR);
      expect(source).not.toMatch(/:is\(\s*html\.dark-mode,\s*body\.dark-mode/gs);
      expect(source).not.toMatch(/:where\(\s*html\.dark-mode,\s*body\.dark-mode/gs);
    });
  });
});
