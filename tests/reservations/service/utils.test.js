import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock parsePriceValue from reservationsShared.js
vi.mock('../../../src/scripts/reservationsShared.js', () => ({
  parsePriceValue: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  }),
}));

// Mock normalizeNumbers from utils.js
vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v ?? '')),
}));

// Mock normalizePackageId from reservationsPackages.js
vi.mock('../../../src/scripts/reservationsPackages.js', () => ({
  normalizePackageId: vi.fn((v) => String(v ?? '').trim().toLowerCase()),
}));

import { parsePriceValue } from '../../../src/scripts/reservationsShared.js';
import { normalizeNumbers } from '../../../src/scripts/utils.js';
import { normalizePackageId } from '../../../src/scripts/reservationsPackages.js';

import {
  sanitizePriceValue,
  toNumber,
  toPositiveInt,
  normalizeStatusValue,
  normalisePaidStatus,
  normalizeReservationItemType,
  normalizeBarcodeValueLoose,
  normalizePackageIdentifier,
} from '../../../src/scripts/reservations/service/utils.js';

beforeEach(() => {
  vi.clearAllMocks();
  // Restore default parsePriceValue behaviour
  parsePriceValue.mockImplementation((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  });
  normalizeNumbers.mockImplementation((v) => String(v ?? ''));
  normalizePackageId.mockImplementation((v) => String(v ?? '').trim().toLowerCase());
});

// ─── sanitizePriceValue ────────────────────────────────────────────────────────

describe('sanitizePriceValue', () => {
  it('returns 0 for NaN input', () => {
    expect(sanitizePriceValue(NaN)).toBe(0);
  });

  it('returns 0 for undefined', () => {
    expect(sanitizePriceValue(undefined)).toBe(0);
  });

  it('returns 0 for null', () => {
    expect(sanitizePriceValue(null)).toBe(0);
  });

  it('returns 0 for non-numeric string', () => {
    expect(sanitizePriceValue('abc')).toBe(0);
  });

  it('returns 0 for Infinity', () => {
    expect(sanitizePriceValue(Infinity)).toBe(0);
  });

  it('returns 0 for negative Infinity', () => {
    expect(sanitizePriceValue(-Infinity)).toBe(0);
  });

  it('returns a normal number rounded to 2 decimal places', () => {
    expect(sanitizePriceValue(42.55)).toBe(42.55);
  });

  it('returns 0 for 0', () => {
    expect(sanitizePriceValue(0)).toBe(0);
  });

  it('shrinks a large value by dividing by 10 until <= 100000', () => {
    // 1_000_000 → 100_000 after one iteration → 10000.00
    const result = sanitizePriceValue(1_000_000);
    expect(result).toBeLessThanOrEqual(100_000);
  });

  it('handles negative numbers correctly', () => {
    expect(sanitizePriceValue(-50.5)).toBe(-50.5);
  });

  it('handles numeric strings', () => {
    expect(sanitizePriceValue('99.99')).toBe(99.99);
  });

  it('stops shrinking after 8 iterations for astronomically large values', () => {
    // 10^17 requires more than 8 divisions to go below 100_000
    // after 8 iterations: 10^17 / 10^8 = 10^9 which is still > 100_000
    const result = sanitizePriceValue(1e17);
    expect(Number.isFinite(result)).toBe(true);
  });
});

// ─── toNumber ─────────────────────────────────────────────────────────────────

describe('toNumber', () => {
  it('returns 0 when parsePriceValue returns NaN', () => {
    parsePriceValue.mockReturnValue(NaN);
    expect(toNumber('abc')).toBe(0);
  });

  it('returns 0 when parsePriceValue returns Infinity', () => {
    parsePriceValue.mockReturnValue(Infinity);
    expect(toNumber(Infinity)).toBe(0);
  });

  it('returns a finite number rounded to 2 decimal places', () => {
    parsePriceValue.mockReturnValue(3.14159);
    expect(toNumber(3.14159)).toBe(3.14);
  });

  it('returns 0 for 0', () => {
    parsePriceValue.mockReturnValue(0);
    expect(toNumber(0)).toBe(0);
  });

  it('returns negative value rounded to 2 dp', () => {
    parsePriceValue.mockReturnValue(-7.777);
    expect(toNumber(-7.777)).toBe(-7.78);
  });
});

// ─── toPositiveInt ────────────────────────────────────────────────────────────

describe('toPositiveInt', () => {
  it('returns default fallback of 1 when parsePriceValue returns NaN', () => {
    parsePriceValue.mockReturnValue(NaN);
    expect(toPositiveInt('abc')).toBe(1);
  });

  it('returns fallback for zero', () => {
    parsePriceValue.mockReturnValue(0);
    expect(toPositiveInt(0)).toBe(1);
  });

  it('returns fallback for negative values', () => {
    parsePriceValue.mockReturnValue(-5);
    expect(toPositiveInt(-5)).toBe(1);
  });

  it('returns rounded positive integer', () => {
    parsePriceValue.mockReturnValue(4.6);
    expect(toPositiveInt(4.6)).toBe(5);
  });

  it('returns fallback when value exceeds max', () => {
    parsePriceValue.mockReturnValue(2_000_000);
    expect(toPositiveInt(2_000_000)).toBe(1);
  });

  it('respects a custom fallback option', () => {
    parsePriceValue.mockReturnValue(-1);
    expect(toPositiveInt(-1, { fallback: 99 })).toBe(99);
  });

  it('respects a custom max option', () => {
    parsePriceValue.mockReturnValue(500);
    expect(toPositiveInt(500, { max: 100 })).toBe(1);
  });

  it('accepts value exactly equal to max', () => {
    parsePriceValue.mockReturnValue(1_000_000);
    expect(toPositiveInt(1_000_000)).toBe(1_000_000);
  });
});

// ─── normalizeStatusValue ─────────────────────────────────────────────────────

describe('normalizeStatusValue', () => {
  it('returns pending for "pending"', () => {
    expect(normalizeStatusValue('pending')).toBe('pending');
  });

  it('returns confirmed for "confirmed"', () => {
    expect(normalizeStatusValue('confirmed')).toBe('confirmed');
  });

  it('returns in_progress for "in_progress"', () => {
    expect(normalizeStatusValue('in_progress')).toBe('in_progress');
  });

  it('returns in_progress for "in-progress" alias', () => {
    expect(normalizeStatusValue('in-progress')).toBe('in_progress');
  });

  it('returns completed for "completed"', () => {
    expect(normalizeStatusValue('completed')).toBe('completed');
  });

  it('returns cancelled for "cancelled"', () => {
    expect(normalizeStatusValue('cancelled')).toBe('cancelled');
  });

  it('returns cancelled for "canceled" alias', () => {
    expect(normalizeStatusValue('canceled')).toBe('cancelled');
  });

  it('returns pending for unknown status', () => {
    expect(normalizeStatusValue('unknown-status')).toBe('pending');
  });

  it('returns pending for null', () => {
    expect(normalizeStatusValue(null)).toBe('pending');
  });

  it('returns pending for undefined', () => {
    expect(normalizeStatusValue(undefined)).toBe('pending');
  });

  it('normalizes Arabic pending alias', () => {
    expect(normalizeStatusValue('معلق')).toBe('pending');
  });

  it('normalizes Arabic confirmed alias', () => {
    expect(normalizeStatusValue('مؤكد')).toBe('confirmed');
  });

  it('handles extra whitespace around status string', () => {
    expect(normalizeStatusValue('  completed  ')).toBe('completed');
  });

  it('is case insensitive', () => {
    expect(normalizeStatusValue('CONFIRMED')).toBe('confirmed');
  });
});

// ─── normalisePaidStatus ──────────────────────────────────────────────────────

describe('normalisePaidStatus', () => {
  it('returns null for null input', () => {
    expect(normalisePaidStatus(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(normalisePaidStatus(undefined)).toBeNull();
  });

  it('returns "paid" for "paid"', () => {
    expect(normalisePaidStatus('paid')).toBe('paid');
  });

  it('returns "partial" for "partial"', () => {
    expect(normalisePaidStatus('partial')).toBe('partial');
  });

  it('returns "partial" for "partial_paid" alias', () => {
    expect(normalisePaidStatus('partial_paid')).toBe('partial');
  });

  it('returns "unpaid" for "unpaid"', () => {
    expect(normalisePaidStatus('unpaid')).toBe('unpaid');
  });

  it('returns "unpaid" for "not_paid" alias', () => {
    expect(normalisePaidStatus('not_paid')).toBe('unpaid');
  });

  it('returns "unpaid" for unknown status string', () => {
    expect(normalisePaidStatus('something_else')).toBe('unpaid');
  });

  it('is case insensitive', () => {
    expect(normalisePaidStatus('PAID')).toBe('paid');
  });
});

// ─── normalizeReservationItemType ─────────────────────────────────────────────

describe('normalizeReservationItemType', () => {
  it('returns empty string for null', () => {
    expect(normalizeReservationItemType(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(normalizeReservationItemType(undefined)).toBe('');
  });

  it('returns "package" for "package"', () => {
    expect(normalizeReservationItemType('package')).toBe('package');
  });

  it('returns "package" for "bundle" alias', () => {
    expect(normalizeReservationItemType('bundle')).toBe('package');
  });

  it('returns "package" for "pack" alias', () => {
    expect(normalizeReservationItemType('pack')).toBe('package');
  });

  it('returns lowercased value for other types', () => {
    expect(normalizeReservationItemType('Equipment')).toBe('equipment');
  });

  it('trims whitespace from input', () => {
    expect(normalizeReservationItemType('  package  ')).toBe('package');
  });
});

// ─── normalizeBarcodeValueLoose ───────────────────────────────────────────────

describe('normalizeBarcodeValueLoose', () => {
  it('returns empty string for null', () => {
    normalizeNumbers.mockReturnValue('');
    expect(normalizeBarcodeValueLoose(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    normalizeNumbers.mockReturnValue('');
    expect(normalizeBarcodeValueLoose(undefined)).toBe('');
  });

  it('passes string value through normalizeNumbers and lowercases', () => {
    normalizeNumbers.mockReturnValue('ABC123');
    const result = normalizeBarcodeValueLoose('ABC123');
    expect(result).toBe('abc123');
  });

  it('trims whitespace from the normalized result', () => {
    normalizeNumbers.mockReturnValue('  barcode  ');
    const result = normalizeBarcodeValueLoose('  barcode  ');
    expect(result).toBe('barcode');
  });

  it('converts numeric value to string before normalizing', () => {
    normalizeNumbers.mockReturnValue('42');
    const result = normalizeBarcodeValueLoose(42);
    expect(normalizeNumbers).toHaveBeenCalledWith('42');
    expect(result).toBe('42');
  });
});

// ─── normalizePackageIdentifier ───────────────────────────────────────────────

describe('normalizePackageIdentifier', () => {
  it('returns empty string for null', () => {
    expect(normalizePackageIdentifier(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(normalizePackageIdentifier(undefined)).toBe('');
  });

  it('strips the "package::" prefix before passing to normalizePackageId', () => {
    normalizePackageId.mockReturnValue('my-pkg');
    normalizePackageIdentifier('package::my-pkg');
    expect(normalizePackageId).toHaveBeenCalledWith('my-pkg');
  });

  it('strips "Package::" prefix case insensitively', () => {
    normalizePackageId.mockReturnValue('my-pkg');
    normalizePackageIdentifier('PACKAGE::my-pkg');
    expect(normalizePackageId).toHaveBeenCalledWith('my-pkg');
  });

  it('passes value without prefix directly to normalizePackageId', () => {
    normalizePackageId.mockReturnValue('plain');
    const result = normalizePackageIdentifier('plain');
    expect(normalizePackageId).toHaveBeenCalledWith('plain');
    expect(result).toBe('plain');
  });

  it('returns the result from normalizePackageId', () => {
    normalizePackageId.mockReturnValue('normalized-pkg-id');
    const result = normalizePackageIdentifier('package::some-id');
    expect(result).toBe('normalized-pkg-id');
  });
});
