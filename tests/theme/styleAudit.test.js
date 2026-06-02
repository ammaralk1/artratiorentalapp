import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const STYLE_PATHS = [
  'src/styles/app.css',
  'src/styles/calendar.css',
  'src/styles/forms.css',
  'src/styles/maintenance.css',
  'src/styles/reservations.css',
  'src/styles/tabs.css',
  'src/styles/reports.css',
];

const STRICT_SELECTOR_PATHS = [
  'src/styles/app.css',
  'src/styles/calendar.css',
  'src/styles/forms.css',
  'src/styles/maintenance.css',
  'src/styles/reservations.css',
  'src/styles/tabs.css',
  'src/styles/reports.css',
];

const readStyle = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('theme style audit', () => {
  it('does not use Tailwind v3 @screen directives in shared source styles', () => {
    STYLE_PATHS.forEach((path) => {
      expect(readStyle(path)).not.toMatch(/@screen\b/);
    });
  });

  it('uses the unified dark-theme selector set in shared source styles', () => {
    const legacyDarkSelectorPatterns = [
      /:is\(html\.dark-mode, body\.dark-mode\)/,
      /:where\(html\.dark-mode, body\.dark-mode\)/,
      /:is\(html\.dark-mode, body\.dark-mode, html\.dark, body\.dark\)/,
      /:where\(html\.dark-mode, body\.dark-mode, html\.dark, body\.dark\)/,
      /:where\(html\.dark, body\.dark, html\.dark-mode, body\.dark-mode\)/,
      /:where\(html\.dark, body\.dark\)/,
      /:is\(html\.dark, body\.dark\)/,
      /(^|,\s*)html\.dark-mode\s+\./m,
      /(^|,\s*)body\.dark-mode\s+\./m,
    ];

    STRICT_SELECTOR_PATHS.forEach((path) => {
      const source = readStyle(path);
      legacyDarkSelectorPatterns.forEach((pattern) => {
        expect(source).not.toMatch(pattern);
      });
    });
  });
});
