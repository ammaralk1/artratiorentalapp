import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock normalizeNumbers used by payment.js (via ../../utils.js relative to service/payment.js)
vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v ?? '')),
}));

// Mock sanitizePriceValue from local utils.js (not needed by payment.js directly,
// but mock to keep the import chain clean)
vi.mock('../../../src/scripts/reservations/service/utils.js', () => ({
  sanitizePriceValue: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Number(n.toFixed(2)) : 0;
  }),
}));

import { normalizeNumbers } from '../../../src/scripts/utils.js';

import {
  normalizePaymentType,
  normalizePaymentHistoryCollection,
  extractPaymentHistorySource,
  extractPaymentHistoryFromCandidates,
} from '../../../src/scripts/reservations/service/payment.js';

beforeEach(() => {
  vi.clearAllMocks();
  normalizeNumbers.mockImplementation((v) => String(v ?? ''));
});

// ─── normalizePaymentType ─────────────────────────────────────────────────────

describe('normalizePaymentType', () => {
  it('returns null for null', () => {
    expect(normalizePaymentType(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(normalizePaymentType(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(normalizePaymentType('')).toBeNull();
  });

  it('returns "amount" for "amount"', () => {
    expect(normalizePaymentType('amount')).toBe('amount');
  });

  it('returns "amount" for "fixed" alias', () => {
    expect(normalizePaymentType('fixed')).toBe('amount');
  });

  it('returns "amount" for "cash" alias', () => {
    expect(normalizePaymentType('cash')).toBe('amount');
  });

  it('returns "amount" for "SAR" (case insensitive)', () => {
    expect(normalizePaymentType('SAR')).toBe('amount');
  });

  it('returns "percent" for "percent"', () => {
    expect(normalizePaymentType('percent')).toBe('percent');
  });

  it('returns "percent" for "percentage" alias', () => {
    expect(normalizePaymentType('percentage')).toBe('percent');
  });

  it('returns "percent" for "ratio" alias', () => {
    expect(normalizePaymentType('ratio')).toBe('percent');
  });

  it('returns null for an unrecognised type', () => {
    expect(normalizePaymentType('bitcoin')).toBeNull();
  });

  it('is case insensitive', () => {
    expect(normalizePaymentType('AMOUNT')).toBe('amount');
  });
});

// ─── extractPaymentHistorySource ─────────────────────────────────────────────

describe('extractPaymentHistorySource', () => {
  it('returns the array directly when source is already an array', () => {
    const arr = [{ type: 'amount', value: 100 }];
    expect(extractPaymentHistorySource(arr)).toBe(arr);
  });

  it('returns empty array for null', () => {
    expect(extractPaymentHistorySource(null)).toEqual([]);
  });

  it('returns empty array for undefined', () => {
    expect(extractPaymentHistorySource(undefined)).toEqual([]);
  });

  it('returns empty array for a number', () => {
    expect(extractPaymentHistorySource(42)).toEqual([]);
  });

  it('extracts from "data" key in an object', () => {
    const src = { data: [{ type: 'amount' }] };
    expect(extractPaymentHistorySource(src)).toBe(src.data);
  });

  it('extracts from "payments" key in an object', () => {
    const src = { payments: [{ type: 'percent' }] };
    expect(extractPaymentHistorySource(src)).toBe(src.payments);
  });

  it('wraps a single-entry object that has a recognised field key', () => {
    const src = { amount: 200, type: 'amount' };
    const result = extractPaymentHistorySource(src);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain(src);
  });

  it('parses a valid JSON string and recurses', () => {
    const arr = [{ type: 'amount', value: 50 }];
    const result = extractPaymentHistorySource(JSON.stringify(arr));
    expect(result).toEqual(arr);
  });

  it('returns empty array for an invalid JSON string', () => {
    expect(extractPaymentHistorySource('{ invalid json ]')).toEqual([]);
  });

  it('extracts from "history" key in an object', () => {
    const src = { history: [{ type: 'percent', value: 20 }] };
    expect(extractPaymentHistorySource(src)).toBe(src.history);
  });
});

// ─── extractPaymentHistoryFromCandidates ─────────────────────────────────────

describe('extractPaymentHistoryFromCandidates', () => {
  it('returns empty array for empty candidates list', () => {
    expect(extractPaymentHistoryFromCandidates([])).toEqual([]);
  });

  it('returns empty array for non-array argument', () => {
    expect(extractPaymentHistoryFromCandidates(null)).toEqual([]);
  });

  it('returns the first non-empty array found', () => {
    const first = [{ type: 'amount', value: 100 }];
    const result = extractPaymentHistoryFromCandidates([null, first, [{ type: 'percent' }]]);
    expect(result).toEqual(first);
  });

  it('skips null and undefined candidates', () => {
    const valid = [{ type: 'percent', value: 10 }];
    expect(extractPaymentHistoryFromCandidates([null, undefined, valid])).toEqual(valid);
  });

  it('returns empty array when all candidates yield empty results', () => {
    expect(extractPaymentHistoryFromCandidates([null, undefined, {}])).toEqual([]);
  });
});

// ─── normalizePaymentHistoryCollection ───────────────────────────────────────

describe('normalizePaymentHistoryCollection', () => {
  it('returns empty array for null source', () => {
    expect(normalizePaymentHistoryCollection(null)).toEqual([]);
  });

  it('returns empty array for undefined source', () => {
    expect(normalizePaymentHistoryCollection(undefined)).toEqual([]);
  });

  it('returns empty array for an empty array source', () => {
    expect(normalizePaymentHistoryCollection([])).toEqual([]);
  });

  it('filters out entries without a resolved type', () => {
    const result = normalizePaymentHistoryCollection([{ note: 'no type here' }]);
    expect(result).toEqual([]);
  });

  it('normalizes an entry with "type" and "amount" fields', () => {
    normalizeNumbers.mockReturnValue('150');
    const source = [{ type: 'amount', amount: 150 }];
    const result = normalizePaymentHistoryCollection(source);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('amount');
    expect(result[0].amount).toBe(150);
  });

  it('reads payment_type alias for type', () => {
    normalizeNumbers.mockReturnValue('50');
    const source = [{ payment_type: 'percent', percentage: 50 }];
    const result = normalizePaymentHistoryCollection(source);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('percent');
  });

  it('maps note aliases (notes, comment, payment_note)', () => {
    normalizeNumbers.mockReturnValue('100');
    const source = [{ type: 'amount', amount: 100, notes: 'test note' }];
    const result = normalizePaymentHistoryCollection(source);
    expect(result[0].note).toBe('test note');
  });

  it('maps recordedAt aliases (recorded_at, payment_date, date)', () => {
    normalizeNumbers.mockReturnValue('100');
    const source = [{ type: 'amount', amount: 100, payment_date: '2024-01-01' }];
    const result = normalizePaymentHistoryCollection(source);
    expect(result[0].recordedAt).toBe('2024-01-01');
  });

  it('filters out null and primitive entries, keeps valid object entries', () => {
    normalizeNumbers.mockReturnValue('10');
    const source = [null, 'string', 42, { type: 'amount', amount: 10 }];
    const result = normalizePaymentHistoryCollection(source);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('amount');
  });
});
