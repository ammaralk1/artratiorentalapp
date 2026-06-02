import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/scripts/language.js', () => ({
  getCurrentLanguage: vi.fn(() => 'en'),
}));

import {
  escapeHtml,
  formatCompactNumber,
  formatCurrency,
  formatDateOnly,
  formatPercent,
  formatProjectPeriod,
  normalizeText,
} from '../../../src/scripts/projectsReports/formatting.ts';

describe('projectsReports/formatting', () => {
  it('normalizes searchable text and escapes HTML', () => {
    expect(normalizeText('  Milk Network  ')).toBe('milk network');
    expect(escapeHtml('<b>Art & Ratio</b>')).toBe('&lt;b&gt;Art &amp; Ratio&lt;/b&gt;');
  });

  it('formats dates, periods, money, and percentages', () => {
    expect(formatDateOnly('2026-04-05T10:30:00Z', 'en')).toMatch(/04\/05\/2026|4\/5\/2026|05\/04\/2026/);
    expect(formatProjectPeriod('2026-04-05T10:30:00Z', '2026-04-06T10:30:00Z', 'en')).toContain('→');
    expect(formatCurrency(1530, 'en')).toBe('1,530 SR');
    expect(formatPercent(12.34, 'en')).toBe('\u206812.3%\u2069');
  });

  it('formats compact values for charts', () => {
    const value = formatCompactNumber(12500, 'en');
    expect(typeof value).toBe('string');
    expect(value.length).toBeGreaterThan(0);
  });
});
