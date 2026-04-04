import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks must be declared before any dynamic imports
const normalizeNumbersMock = vi.fn();

vi.mock('../../src/scripts/utils.js', () => ({
  normalizeNumbers: normalizeNumbersMock,
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
}));

vi.mock('../../src/scripts/reservationsPackages.js', () => ({
  resolvePackageItems: vi.fn(() => []),
  normalizePackageId: vi.fn((v) => String(v ?? '').trim().toLowerCase()),
  getPackagesSnapshot: vi.fn(() => []),
  findPackageById: vi.fn(() => null),
  getPackageDisplayName: vi.fn(() => ''),
}));

beforeEach(() => {
  vi.resetModules();
  // Identity transform: returns the value as-is (string)
  normalizeNumbersMock.mockReset().mockImplementation((v) => String(v ?? ''));
});

// ---------------------------------------------------------------------------
// parsePriceValue
// ---------------------------------------------------------------------------

describe('parsePriceValue', () => {
  it('returns the number unchanged for a plain finite number', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(parsePriceValue(42)).toBe(42);
    expect(parsePriceValue(3.14)).toBe(3.14);
  });

  it('returns NaN for null', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(Number.isNaN(parsePriceValue(null))).toBe(true);
  });

  it('returns NaN for undefined', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(Number.isNaN(parsePriceValue(undefined))).toBe(true);
  });

  it('returns NaN for empty string', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(Number.isNaN(parsePriceValue(''))).toBe(true);
  });

  it('parses a plain numeric string', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(parsePriceValue('100')).toBe(100);
    expect(parsePriceValue('3.50')).toBe(3.5);
  });

  it('parses a negative numeric string', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(parsePriceValue('-50')).toBe(-50);
  });

  it('returns 1 for boolean true and 0 for boolean false', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(parsePriceValue(true)).toBe(1);
    expect(parsePriceValue(false)).toBe(0);
  });

  it('returns NaN for Infinity', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(Number.isNaN(parsePriceValue(Infinity))).toBe(true);
  });

  it('strips currency labels and parses remaining digits', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    // "SR" label stripped → "500"
    expect(parsePriceValue('500SR')).toBe(500);
  });

  it('handles comma as decimal separator (European style: "1,5")', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    // single comma with non-3-digit fraction → treat as decimal
    expect(parsePriceValue('1,5')).toBe(1.5);
  });

  it('handles thousands comma "1,000" as integer 1000', async () => {
    const { parsePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(parsePriceValue('1,000')).toBe(1000);
  });
});

// ---------------------------------------------------------------------------
// sanitizePriceValue
// ---------------------------------------------------------------------------

describe('sanitizePriceValue', () => {
  it('returns 0 for null', async () => {
    const { sanitizePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(sanitizePriceValue(null)).toBe(0);
  });

  it('returns 0 for undefined', async () => {
    const { sanitizePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(sanitizePriceValue(undefined)).toBe(0);
  });

  it('returns 0 for empty string', async () => {
    const { sanitizePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(sanitizePriceValue('')).toBe(0);
  });

  it('rounds to 2 decimal places', async () => {
    const { sanitizePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(sanitizePriceValue(3.14159)).toBe(3.14);
  });

  it('returns the number as-is for a whole number', async () => {
    const { sanitizePriceValue } = await import('../../src/scripts/reservationsShared.js');
    expect(sanitizePriceValue(100)).toBe(100);
  });
});

// ---------------------------------------------------------------------------
// normalizeText
// ---------------------------------------------------------------------------

describe('normalizeText', () => {
  it('returns lowercase trimmed string', async () => {
    const { normalizeText } = await import('../../src/scripts/reservationsShared.js');
    // normalizeNumbers is identity mock, so value passes through
    expect(normalizeText('  Hello World  ')).toBe('hello world');
  });

  it('returns empty string for empty input', async () => {
    const { normalizeText } = await import('../../src/scripts/reservationsShared.js');
    expect(normalizeText('')).toBe('');
  });

  it('returns empty string when called with no argument (default param)', async () => {
    const { normalizeText } = await import('../../src/scripts/reservationsShared.js');
    expect(normalizeText()).toBe('');
  });

  it('converts to lowercase', async () => {
    const { normalizeText } = await import('../../src/scripts/reservationsShared.js');
    expect(normalizeText('ABC')).toBe('abc');
  });

  it('handles numeric input by coercing to string', async () => {
    const { normalizeText } = await import('../../src/scripts/reservationsShared.js');
    expect(normalizeText(42)).toBe('42');
  });
});

// ---------------------------------------------------------------------------
// resolveReservationItemGroupKey
// ---------------------------------------------------------------------------

describe('resolveReservationItemGroupKey', () => {
  it('derives key from desc and price', async () => {
    const { resolveReservationItemGroupKey } = await import('../../src/scripts/reservationsShared.js');
    const key = resolveReservationItemGroupKey({ desc: 'Camera', price: 100 });
    expect(key).toBe('camera::100.00');
  });

  it('falls back to description field', async () => {
    const { resolveReservationItemGroupKey } = await import('../../src/scripts/reservationsShared.js');
    const key = resolveReservationItemGroupKey({ description: 'Lens', price: 50 });
    expect(key).toBe('lens::50.00');
  });

  it('falls back to name field when desc and description absent', async () => {
    const { resolveReservationItemGroupKey } = await import('../../src/scripts/reservationsShared.js');
    const key = resolveReservationItemGroupKey({ name: 'Tripod', price: 20 });
    expect(key).toBe('tripod::20.00');
  });

  it('returns key with zero price when price is absent', async () => {
    const { resolveReservationItemGroupKey } = await import('../../src/scripts/reservationsShared.js');
    const key = resolveReservationItemGroupKey({ desc: 'Item' });
    expect(key).toBe('item::0.00');
  });

  it('returns empty key (::0.00) for empty object', async () => {
    const { resolveReservationItemGroupKey } = await import('../../src/scripts/reservationsShared.js');
    const key = resolveReservationItemGroupKey({});
    expect(key).toBe('::0.00');
  });
});

// ---------------------------------------------------------------------------
// groupReservationItems
// ---------------------------------------------------------------------------

describe('groupReservationItems', () => {
  it('returns empty array for empty input', async () => {
    const { groupReservationItems } = await import('../../src/scripts/reservationsShared.js');
    expect(groupReservationItems([])).toEqual([]);
  });

  it('groups duplicate items by description+price key', async () => {
    const { groupReservationItems } = await import('../../src/scripts/reservationsShared.js');
    const items = [
      { desc: 'Camera', price: 100 },
      { desc: 'Camera', price: 100 },
    ];
    const result = groupReservationItems(items);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it('keeps distinct items in separate groups', async () => {
    const { groupReservationItems } = await import('../../src/scripts/reservationsShared.js');
    const items = [
      { desc: 'Camera', price: 100 },
      { desc: 'Lens', price: 50 },
    ];
    const result = groupReservationItems(items);
    expect(result).toHaveLength(2);
  });

  it('accumulates totalPrice across grouped items', async () => {
    const { groupReservationItems } = await import('../../src/scripts/reservationsShared.js');
    const items = [
      { desc: 'Camera', price: 100 },
      { desc: 'Camera', price: 100 },
    ];
    const result = groupReservationItems(items);
    expect(result[0].totalPrice).toBe(200);
  });

  it('collects barcodes from items in the group', async () => {
    const { groupReservationItems } = await import('../../src/scripts/reservationsShared.js');
    const items = [
      { desc: 'Camera', price: 100, barcode: 'BC001' },
      { desc: 'Camera', price: 100, barcode: 'BC002' },
    ];
    const result = groupReservationItems(items);
    expect(result[0].barcodes).toEqual(['BC001', 'BC002']);
  });

  it('returns count as alias for quantity', async () => {
    const { groupReservationItems } = await import('../../src/scripts/reservationsShared.js');
    const items = [{ desc: 'Camera', price: 100 }, { desc: 'Camera', price: 100 }];
    const result = groupReservationItems(items);
    expect(result[0].count).toBe(result[0].quantity);
  });
});

// ---------------------------------------------------------------------------
// resolveEquipmentIdentifier
// ---------------------------------------------------------------------------

describe('resolveEquipmentIdentifier', () => {
  it('returns id as string when present', async () => {
    const { resolveEquipmentIdentifier } = await import('../../src/scripts/reservationsShared.js');
    expect(resolveEquipmentIdentifier({ id: 42 })).toBe('42');
  });

  it('falls back to equipment_id', async () => {
    const { resolveEquipmentIdentifier } = await import('../../src/scripts/reservationsShared.js');
    expect(resolveEquipmentIdentifier({ equipment_id: 'EQ-99' })).toBe('EQ-99');
  });

  it('falls back to equipmentId camelCase', async () => {
    const { resolveEquipmentIdentifier } = await import('../../src/scripts/reservationsShared.js');
    expect(resolveEquipmentIdentifier({ equipmentId: 'EQ-55' })).toBe('EQ-55');
  });

  it('returns null when no identifier field is present', async () => {
    const { resolveEquipmentIdentifier } = await import('../../src/scripts/reservationsShared.js');
    expect(resolveEquipmentIdentifier({})).toBeNull();
  });

  it('returns null for empty object (default param)', async () => {
    const { resolveEquipmentIdentifier } = await import('../../src/scripts/reservationsShared.js');
    expect(resolveEquipmentIdentifier()).toBeNull();
  });

  it('skips null/undefined/empty-string candidates', async () => {
    const { resolveEquipmentIdentifier } = await import('../../src/scripts/reservationsShared.js');
    expect(resolveEquipmentIdentifier({ id: null, equipment_id: '', equipmentId: 'FOUND' })).toBe('FOUND');
  });
});
