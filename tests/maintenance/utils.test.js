import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/scripts/utils.js', async () => vi.importActual('../../src/scripts/utils.js'));

import {
  formatDateDDMMYY,
  normalizeBarcodeValue,
  normalizeText,
  normalizeSearchValue,
  escapeHtml,
  toSqlDatetime,
  buildEquipmentSearchValue,
  parseEquipmentSearchInput,
  normalizeEquipmentStatus,
  resolveRepairCostFromInput,
} from '../../src/scripts/maintenance/utils.js';

// ─────────────────────────────────────────────────────────────────────────────
// formatDateDDMMYY
// ─────────────────────────────────────────────────────────────────────────────

describe('formatDateDDMMYY', () => {
  it('formats ISO string to DD/MM/YY', () => {
    expect(formatDateDDMMYY('2024-01-05T00:00:00Z')).toMatch(/05\/01\/24/);
  });

  it('returns null for empty string', () => {
    expect(formatDateDDMMYY('')).toBeNull();
  });

  it('returns null for null', () => {
    expect(formatDateDDMMYY(null)).toBeNull();
  });

  it('returns null for invalid date string', () => {
    expect(formatDateDDMMYY('not-a-date')).toBeNull();
  });

  it('accepts a Date object', () => {
    const date = new Date(2024, 5, 9); // June 9 2024
    expect(formatDateDDMMYY(date)).toBe('09/06/24');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// normalizeBarcodeValue
// ─────────────────────────────────────────────────────────────────────────────

describe('normalizeBarcodeValue', () => {
  it('lowercases and trims', () => {
    expect(normalizeBarcodeValue('  ABC123  ')).toBe('abc123');
  });

  it('handles null/undefined gracefully', () => {
    expect(normalizeBarcodeValue(null)).toBe('');
    expect(normalizeBarcodeValue(undefined)).toBe('');
  });

  it('handles numeric barcode', () => {
    expect(normalizeBarcodeValue(12345)).toBe('12345');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// normalizeText
// ─────────────────────────────────────────────────────────────────────────────

describe('normalizeText', () => {
  it('trims and lowercases', () => {
    expect(normalizeText('  Camera  ')).toBe('camera');
  });

  it('returns empty string for empty input', () => {
    expect(normalizeText('')).toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// normalizeSearchValue
// ─────────────────────────────────────────────────────────────────────────────

describe('normalizeSearchValue', () => {
  it('lowercases and trims', () => {
    expect(normalizeSearchValue('  LENS  ')).toBe('lens');
  });

  it('returns empty string for null', () => {
    expect(normalizeSearchValue(null)).toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// escapeHtml
// ─────────────────────────────────────────────────────────────────────────────

describe('escapeHtml', () => {
  it('escapes & < > " and single quote', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
    expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
    expect(escapeHtml("it's")).toBe('it&#39;s');
  });

  it('returns empty string for undefined', () => {
    expect(escapeHtml(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(escapeHtml('')).toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// toSqlDatetime
// ─────────────────────────────────────────────────────────────────────────────

describe('toSqlDatetime', () => {
  it('formats Date to YYYY-MM-DD HH:MM:SS', () => {
    const d = new Date(2024, 0, 5, 14, 30, 0); // Jan 5 2024 14:30:00 local
    expect(toSqlDatetime(d)).toMatch(/^2024-01-05 14:30:00$/);
  });

  it('parses ISO string input', () => {
    const result = toSqlDatetime('2024-06-01T00:00:00');
    expect(result).toMatch(/^2024-06-01/);
  });

  it('returns null for invalid date', () => {
    expect(toSqlDatetime('bad')).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// buildEquipmentSearchValue
// ─────────────────────────────────────────────────────────────────────────────

describe('buildEquipmentSearchValue', () => {
  it('returns "desc | barcode" when barcode present', () => {
    expect(buildEquipmentSearchValue({ desc: 'Camera', displayBarcode: 'BC001' })).toBe('Camera | BC001');
  });

  it('returns just desc when barcode is empty', () => {
    expect(buildEquipmentSearchValue({ desc: 'Camera', displayBarcode: '' })).toBe('Camera');
  });

  it('falls back to barcode field if displayBarcode missing', () => {
    expect(buildEquipmentSearchValue({ desc: 'Lens', barcode: 'LN99' })).toBe('Lens | LN99');
  });

  it('returns desc only when option is empty', () => {
    expect(buildEquipmentSearchValue({ desc: 'Mic' })).toBe('Mic');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// parseEquipmentSearchInput
// ─────────────────────────────────────────────────────────────────────────────

describe('parseEquipmentSearchInput', () => {
  it('splits on | separator', () => {
    const result = parseEquipmentSearchInput('Camera | BC001');
    expect(result.description).toBe('Camera');
    expect(result.barcode).toBe('BC001');
  });

  it('returns empty strings for blank input', () => {
    const result = parseEquipmentSearchInput('');
    expect(result.description).toBe('');
    expect(result.barcode).toBe('');
  });

  it('returns description only when no separator', () => {
    const result = parseEquipmentSearchInput('Camera');
    expect(result.description).toBe('Camera');
    expect(result.barcode).toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// normalizeEquipmentStatus
// ─────────────────────────────────────────────────────────────────────────────

describe('normalizeEquipmentStatus', () => {
  it.each([
    ['maintenance', 'maintenance'],
    ['صيانة', 'maintenance'],
    ['reserved', 'reserved'],
    ['محجوز', 'reserved'],
    ['retired', 'retired'],
    ['متوقف', 'retired'],
    ['خارج الخدمة', 'retired'],
    ['available', 'available'],
    ['', 'available'],
    [null, 'available'],
    [undefined, 'available'],
  ])('"%s" → "%s"', (input, expected) => {
    expect(normalizeEquipmentStatus(input)).toBe(expected);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// resolveRepairCostFromInput
// ─────────────────────────────────────────────────────────────────────────────

describe('resolveRepairCostFromInput', () => {
  it('empty string with no previous → provided: false, value: null', () => {
    const result = resolveRepairCostFromInput('', null);
    expect(result.provided).toBe(false);
    expect(result.value).toBeNull();
    expect(result.error).toBeNull();
  });

  it('empty string with previous value → provided: true, value: null (cleared)', () => {
    const result = resolveRepairCostFromInput('', 100);
    expect(result.provided).toBe(true);
    expect(result.value).toBeNull();
    expect(result.error).toBeNull();
  });

  it('valid integer string → value as float', () => {
    const result = resolveRepairCostFromInput('150', null);
    expect(result.error).toBeNull();
    expect(result.value).toBe(150);
  });

  it('decimal with dot → parsed correctly', () => {
    const result = resolveRepairCostFromInput('99.99', null);
    expect(result.value).toBe(99.99);
  });

  it('decimal with comma → treated as decimal separator', () => {
    const result = resolveRepairCostFromInput('99,50', null);
    expect(result.value).toBeCloseTo(99.5);
  });

  it('negative number → error: invalid', () => {
    const result = resolveRepairCostFromInput('-50', null);
    expect(result.error).toBe('invalid');
    expect(result.value).toBeNull();
  });

  it('non-numeric string → error: invalid', () => {
    const result = resolveRepairCostFromInput('abc', null);
    expect(result.error).toBe('invalid');
  });

  it('zero is a valid cost', () => {
    const result = resolveRepairCostFromInput('0', null);
    expect(result.value).toBe(0);
    expect(result.error).toBeNull();
  });
});
