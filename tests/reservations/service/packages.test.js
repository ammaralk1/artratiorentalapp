import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v ?? '')),
}));

vi.mock('../../../src/scripts/reservationsShared.js', () => ({
  parsePriceValue: vi.fn((v) => Number(v) || 0),
}));

vi.mock('../../../src/scripts/reservationsPackages.js', () => ({
  findPackageById: vi.fn(() => null),
  normalizePackageId: vi.fn((v) => String(v || '')),
  resolvePackageItems: vi.fn(() => []),
  getPackagesSnapshot: vi.fn(() => []),
  getPackageDisplayName: vi.fn((p) => p?.name || ''),
  resolvePackagePrice: vi.fn(() => 0),
}));

vi.mock('../../../src/scripts/reservationsSummary.js', () => ({
  DEFAULT_COMPANY_SHARE_PERCENT: 15,
  calculateDraftFinancialBreakdown: vi.fn(() => ({})),
  calculatePaymentProgress: vi.fn(() => ({})),
  determinePaymentStatus: vi.fn(() => 'unpaid'),
}));

vi.mock('../../../src/scripts/reservations/service/utils.js', () => ({
  sanitizePriceValue: vi.fn((v) => Number(v) || 0),
  toNumber: vi.fn((v) => Number(v) || 0),
  toPositiveInt: vi.fn((v) => Math.max(1, Math.round(Number(v) || 1))),
  normalizePackageIdentifier: vi.fn((v) => String(v || '')),
  normalizeBarcodeValueLoose: vi.fn((v) => String(v || '').trim()),
  normalizeReservationItemType: vi.fn((v) => String(v || '')),
  debugLogPackages: vi.fn(),
}));

vi.mock('../../../src/scripts/reservations/service/cache.js', () => ({
  getCachedReservationPackages: vi.fn(() => []),
}));

// ─── Import mocks for resetting ──────────────────────────────────────────────
import { normalizeNumbers } from '../../../src/scripts/utils.js';
import { parsePriceValue } from '../../../src/scripts/reservationsShared.js';
import {
  findPackageById,
  normalizePackageId,
  resolvePackageItems,
  getPackagesSnapshot,
  getPackageDisplayName,
  resolvePackagePrice,
} from '../../../src/scripts/reservationsPackages.js';
import {
  sanitizePriceValue,
  toNumber,
  toPositiveInt,
  normalizePackageIdentifier,
  normalizeBarcodeValueLoose,
  normalizeReservationItemType,
  debugLogPackages,
} from '../../../src/scripts/reservations/service/utils.js';
import { getCachedReservationPackages } from '../../../src/scripts/reservations/service/cache.js';

// ─── Subjects under test ─────────────────────────────────────────────────────
import {
  dedupePackages,
  derivePackageMergeKey,
  mergePackageItemCollections,
  mergePackageCollections,
  normalizePackageItemRecord,
  mergePackageRecords,
  resolvePackageMergeKey,
} from '../../../src/scripts/reservations/service/packages.js';

// ─── Default mock implementations ────────────────────────────────────────────
beforeEach(() => {
  vi.clearAllMocks();

  normalizeNumbers.mockImplementation((v) => String(v ?? ''));
  parsePriceValue.mockImplementation((v) => Number(v) || 0);
  findPackageById.mockImplementation(() => null);
  normalizePackageId.mockImplementation((v) => String(v || ''));
  resolvePackageItems.mockImplementation(() => []);
  getPackagesSnapshot.mockImplementation(() => []);
  getPackageDisplayName.mockImplementation((p) => p?.name || '');
  resolvePackagePrice.mockImplementation(() => 0);

  sanitizePriceValue.mockImplementation((v) => Number(v) || 0);
  toNumber.mockImplementation((v) => Number(v) || 0);
  toPositiveInt.mockImplementation((v) => Math.max(1, Math.round(Number(v) || 1)));
  normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
  normalizeBarcodeValueLoose.mockImplementation((v) => String(v || '').trim());
  normalizeReservationItemType.mockImplementation((v) => String(v || ''));
  debugLogPackages.mockImplementation(() => {});
  getCachedReservationPackages.mockImplementation(() => []);
});

// ═══════════════════════════════════════════════════════════════════════════════
// dedupePackages
// ═══════════════════════════════════════════════════════════════════════════════

describe('dedupePackages', () => {
  it('returns empty array for empty input', () => {
    expect(dedupePackages([])).toEqual([]);
  });

  it('returns empty array for null input', () => {
    expect(dedupePackages(null)).toEqual([]);
  });

  it('returns empty array for undefined input', () => {
    expect(dedupePackages(undefined)).toEqual([]);
  });

  it('returns empty array for non-array input', () => {
    expect(dedupePackages('not-an-array')).toEqual([]);
  });

  it('preserves single package unchanged', () => {
    const pkg = { packageId: 'pkg-1', name: 'Camera Kit' };
    normalizePackageIdentifier.mockReturnValue('pkg-1');
    const result = dedupePackages([pkg]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(pkg);
  });

  it('removes duplicate packages by packageId, keeps one entry', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const pkg1 = { packageId: 'pkg-1', name: 'Camera', unit_cost: 100 };
    const pkg2 = { packageId: 'pkg-1', name: 'Camera Duplicate', unit_cost: 50 };
    parsePriceValue.mockReturnValue(0);
    const result = dedupePackages([pkg1, pkg2]);
    expect(result).toHaveLength(1);
  });

  it('keeps both packages when packageIds differ', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const pkg1 = { packageId: 'pkg-1', name: 'Camera' };
    const pkg2 = { packageId: 'pkg-2', name: 'Lights' };
    const result = dedupePackages([pkg1, pkg2]);
    expect(result).toHaveLength(2);
  });

  it('prefers incoming when incoming cost is higher', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    parsePriceValue
      .mockReturnValueOnce(50)   // existingCost
      .mockReturnValueOnce(100); // incomingCost
    const pkg1 = { packageId: 'pkg-1', unit_cost: 50 };
    const pkg2 = { packageId: 'pkg-1', unit_cost: 100 };
    const result = dedupePackages([pkg1, pkg2]);
    expect(result).toHaveLength(1);
    expect(result[0].unit_cost).toBe(100);
  });

  it('prefers existing when existing cost is higher', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    parsePriceValue
      .mockReturnValueOnce(200)  // existingCost
      .mockReturnValueOnce(50);  // incomingCost
    const pkg1 = { packageId: 'pkg-1', unit_cost: 200, name: 'existing' };
    const pkg2 = { packageId: 'pkg-1', unit_cost: 50, name: 'incoming' };
    const result = dedupePackages([pkg1, pkg2]);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('existing');
  });

  it('skips null and non-object entries in the array', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const pkg = { packageId: 'pkg-1' };
    const result = dedupePackages([null, pkg, undefined, 'bad']);
    expect(result).toHaveLength(1);
  });

  it('handles three packages where two share the same key', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    parsePriceValue.mockReturnValue(0);
    const pkgs = [
      { packageId: 'a', name: 'A' },
      { packageId: 'b', name: 'B' },
      { packageId: 'a', name: 'A-dup' },
    ];
    const result = dedupePackages(pkgs);
    expect(result).toHaveLength(2);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// derivePackageMergeKey
// ═══════════════════════════════════════════════════════════════════════════════

describe('derivePackageMergeKey', () => {
  it('returns null for empty object when no fields resolve', () => {
    normalizePackageIdentifier.mockReturnValue('');
    normalizeNumbers.mockReturnValue('');
    const result = derivePackageMergeKey({});
    expect(result).toBeNull();
  });

  it('returns normalized packageId when present', () => {
    normalizePackageIdentifier.mockReturnValue('pkg-123');
    const result = derivePackageMergeKey({ packageId: 'pkg-123' });
    expect(result).toBe('pkg-123');
  });

  it('returns normalized package_id when packageId is absent', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const result = derivePackageMergeKey({ package_id: 'pkg-456' });
    expect(result).toBe('pkg-456');
  });

  it('falls back to package_code/barcode when id fields are empty', () => {
    normalizePackageIdentifier.mockReturnValue('');
    normalizeNumbers.mockImplementation((v) => String(v ?? ''));
    const result = derivePackageMergeKey({ package_code: 'CODE-99' });
    expect(result).toBe('code-99');
  });

  it('handles missing all fields gracefully — returns null', () => {
    normalizePackageIdentifier.mockReturnValue('');
    normalizeNumbers.mockReturnValue('');
    const result = derivePackageMergeKey({ unrelated: 'field' });
    expect(result).toBeNull();
  });

  it('prefers id-based key over code-based key', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const result = derivePackageMergeKey({ id: 'id-key', package_code: 'code-key' });
    expect(result).toBe('id-key');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// mergePackageItemCollections
// ═══════════════════════════════════════════════════════════════════════════════

describe('mergePackageItemCollections', () => {
  it('returns empty array when both inputs are empty', () => {
    expect(mergePackageItemCollections([], [])).toEqual([]);
  });

  it('returns primary items when secondary is empty', () => {
    const primary = [{ normalizedBarcode: 'cam-1', qty: 2, quantity: 2, equipmentId: null }];
    const result = mergePackageItemCollections(primary, []);
    expect(result).toHaveLength(1);
    expect(result[0].normalizedBarcode).toBe('cam-1');
  });

  it('returns secondary items when primary is empty', () => {
    const secondary = [{ normalizedBarcode: 'light-1', qty: 1, quantity: 1, equipmentId: null }];
    const result = mergePackageItemCollections([], secondary);
    expect(result).toHaveLength(1);
    expect(result[0].normalizedBarcode).toBe('light-1');
  });

  it('primary items win — are inserted first, secondary deduped against them', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const primary = [{ normalizedBarcode: 'cam-1', qty: 2, quantity: 2, price: 100, unit_price: 100, equipmentId: null }];
    const secondary = [{ normalizedBarcode: 'cam-1', qty: 3, quantity: 3, price: 50, unit_price: 50, equipmentId: null }];
    const result = mergePackageItemCollections(primary, secondary);
    // cam-1 appears in both, should be merged into one entry
    expect(result).toHaveLength(1);
    // qty accumulates because both share the same key
    expect(result[0].qty).toBe(5);
  });

  it('accumulates qty when same key appears in primary and secondary', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const primary = [{ normalizedBarcode: 'bc-1', qty: 3, quantity: 3, equipmentId: null }];
    const secondary = [{ normalizedBarcode: 'bc-1', qty: 2, quantity: 2, equipmentId: null }];
    const result = mergePackageItemCollections(primary, secondary);
    expect(result[0].qty).toBe(5);
    expect(result[0].quantity).toBe(5);
  });

  it('combines unique items from both collections', () => {
    const primary = [{ normalizedBarcode: 'a', qty: 1, quantity: 1, equipmentId: null }];
    const secondary = [{ normalizedBarcode: 'b', qty: 1, quantity: 1, equipmentId: null }];
    const result = mergePackageItemCollections(primary, secondary);
    expect(result).toHaveLength(2);
  });

  it('skips null items silently', () => {
    const primary = [null, { normalizedBarcode: 'a', qty: 1, quantity: 1, equipmentId: null }];
    const result = mergePackageItemCollections(primary, []);
    expect(result).toHaveLength(1);
  });

  it('skips items without a usable key', () => {
    const primary = [{ desc: 'no-key', qty: 1, quantity: 1, normalizedBarcode: '', equipmentId: null }];
    const result = mergePackageItemCollections(primary, []);
    expect(result).toHaveLength(0);
  });

  it('falls back to equipmentId-based key when normalizedBarcode is absent', () => {
    const primary = [{ normalizedBarcode: '', equipmentId: 'eq-7', qty: 1, quantity: 1 }];
    const secondary = [{ normalizedBarcode: '', equipmentId: 'eq-7', qty: 2, quantity: 2 }];
    const result = mergePackageItemCollections(primary, secondary);
    expect(result).toHaveLength(1);
    expect(result[0].qty).toBe(3);
  });

  it('inherits desc from secondary when primary desc is empty', () => {
    const primary = [{ normalizedBarcode: 'a', qty: 1, quantity: 1, desc: '', equipmentId: null }];
    const secondary = [{ normalizedBarcode: 'a', qty: 1, quantity: 1, desc: 'Camera', equipmentId: null }];
    const result = mergePackageItemCollections(primary, secondary);
    expect(result[0].desc).toBe('Camera');
  });

  it('returns a new array — does not mutate primary input', () => {
    const primary = [{ normalizedBarcode: 'a', qty: 1, quantity: 1, equipmentId: null }];
    const originalLength = primary.length;
    const result = mergePackageItemCollections(primary, []);
    expect(result).not.toBe(primary);
    expect(primary).toHaveLength(originalLength);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// mergePackageCollections
// ═══════════════════════════════════════════════════════════════════════════════

describe('mergePackageCollections', () => {
  it('returns empty array when both inputs are empty', () => {
    getPackagesSnapshot.mockReturnValue([]);
    expect(mergePackageCollections([], [])).toEqual([]);
  });

  it('returns primary packages when secondary is empty', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const primary = [{ packageId: 'p1', name: 'Kit A' }];
    const result = mergePackageCollections(primary, []);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Kit A');
  });

  it('returns secondary packages when primary is empty', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const secondary = [{ packageId: 's1', name: 'Kit B' }];
    const result = mergePackageCollections([], secondary);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Kit B');
  });

  it('combines non-overlapping packages from both collections', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const primary = [{ packageId: 'p1' }];
    const secondary = [{ packageId: 'p2' }];
    const result = mergePackageCollections(primary, secondary);
    expect(result).toHaveLength(2);
  });

  it('merges packages with the same key — primary data wins for existing fields', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    toNumber.mockImplementation((v) => Number(v) || 0);
    const primary = [{ packageId: 'p1', name: 'Primary Name', unit_price: 500, unit_cost: 0 }];
    const secondary = [{ packageId: 'p1', name: 'Secondary Name', unit_price: 0, unit_cost: 200 }];
    const result = mergePackageCollections(primary, secondary);
    expect(result).toHaveLength(1);
    // name should stay as primary
    expect(result[0].name).toBe('Primary Name');
  });

  it('returns a new array — immutable output', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const primary = [{ packageId: 'p1' }];
    const result = mergePackageCollections(primary, []);
    expect(result).not.toBe(primary);
  });

  it('handles non-array primary gracefully', () => {
    getPackagesSnapshot.mockReturnValue([]);
    const result = mergePackageCollections(null, []);
    expect(Array.isArray(result)).toBe(true);
  });

  it('handles non-array secondary gracefully', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const primary = [{ packageId: 'p1' }];
    const result = mergePackageCollections(primary, null);
    expect(result).toHaveLength(1);
  });

  it('skips null or non-object entries inside collections', () => {
    getPackagesSnapshot.mockReturnValue([]);
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const primary = [null, { packageId: 'p1' }, undefined];
    const result = mergePackageCollections(primary, []);
    expect(result).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// normalizePackageItemRecord
// ═══════════════════════════════════════════════════════════════════════════════

describe('normalizePackageItemRecord', () => {
  it('returns default record for null input', () => {
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const result = normalizePackageItemRecord(null);
    expect(result.qty).toBe(1);
    expect(result.price).toBe(0);
    expect(result.equipmentId).toBeNull();
  });

  it('returns default record for non-object primitive input', () => {
    normalizeNumbers.mockReturnValue('42');
    normalizeBarcodeValueLoose.mockReturnValue('42');
    const result = normalizePackageItemRecord(42);
    expect(result.barcode).toBe('42');
    expect(result.qty).toBe(1);
  });

  it('resolves equipmentId from item.equipmentId', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { equipmentId: 'eq-99' };
    const result = normalizePackageItemRecord(item);
    expect(result.equipmentId).toBe('eq-99');
    expect(result.equipment_id).toBe('eq-99');
  });

  it('resolves equipmentId from item.equipment_id when equipmentId absent', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { equipment_id: 'eq-55' };
    const result = normalizePackageItemRecord(item);
    expect(result.equipmentId).toBe('eq-55');
  });

  it('applies packageQuantity divisor to compute qtyPerPackage', () => {
    toPositiveInt.mockImplementation((v) => Math.max(1, Math.round(Number(v) || 1)));
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    // quantity=4, packageQuantity=2 → divided=2 → qtyPerPackage=2
    const item = { quantity: 4 };
    const result = normalizePackageItemRecord(item, 2);
    expect(result.qtyPerPackage).toBe(2);
    expect(result.totalQuantity).toBe(4);
  });

  it('uses explicit qtyPerPackage when present, ignoring packageQuantity', () => {
    toPositiveInt.mockImplementation((v) => Math.max(1, Math.round(Number(v) || 1)));
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { quantity: 10, qtyPerPackage: 3 };
    const result = normalizePackageItemRecord(item, 5);
    expect(result.qtyPerPackage).toBe(3);
  });

  it('normalizes unit_price from item.price when unit_price absent', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockImplementation((v) => Number(v) || 0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { price: 250 };
    const result = normalizePackageItemRecord(item);
    expect(result.price).toBe(250);
    expect(result.unit_price).toBe(250);
  });

  it('normalizes cost fields from item.rental_cost', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockImplementation((v) => Number(v) || 0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { rental_cost: 80 };
    const result = normalizePackageItemRecord(item);
    expect(result.cost).toBe(80);
    expect(result.rental_cost).toBe(80);
    expect(result.purchase_price).toBe(80);
  });

  it('normalizes barcode from item.barcode', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockImplementation((v) => String(v ?? ''));
    normalizeBarcodeValueLoose.mockImplementation((v) => String(v || '').trim());
    const item = { barcode: 'BARCODE-123' };
    const result = normalizePackageItemRecord(item);
    expect(result.barcode).toBe('BARCODE-123');
  });

  it('falls back barcode to item.code when item.barcode is absent', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockImplementation((v) => String(v ?? ''));
    normalizeBarcodeValueLoose.mockImplementation((v) => String(v || '').trim());
    const item = { code: 'SN-9900' };
    const result = normalizePackageItemRecord(item);
    expect(result.barcode).toBe('SN-9900');
  });

  it('normalizes desc from item.description', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { description: 'Gimbal stabilizer' };
    const result = normalizePackageItemRecord(item);
    expect(result.desc).toBe('Gimbal stabilizer');
  });

  it('defaults desc to empty string when no description field', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const result = normalizePackageItemRecord({});
    expect(result.desc).toBe('');
  });

  it('sets image from item.image_url when item.image absent', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const item = { image_url: '/photos/cam.jpg' };
    const result = normalizePackageItemRecord(item);
    expect(result.image).toBe('/photos/cam.jpg');
  });

  it('image defaults to null when absent', () => {
    toPositiveInt.mockReturnValue(1);
    toNumber.mockReturnValue(0);
    normalizeNumbers.mockReturnValue('');
    normalizeBarcodeValueLoose.mockReturnValue('');
    const result = normalizePackageItemRecord({});
    expect(result.image).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// mergePackageRecords
// ═══════════════════════════════════════════════════════════════════════════════

describe('mergePackageRecords', () => {
  it('returns incoming when base is null', () => {
    const incoming = { packageId: 'p1', name: 'Camera' };
    expect(mergePackageRecords(null, incoming)).toBe(incoming);
  });

  it('returns base when incoming is null', () => {
    const base = { packageId: 'p1', name: 'Camera' };
    expect(mergePackageRecords(base, null)).toBe(base);
  });

  it('returns a new object — does not mutate base', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { packageId: 'p1', name: 'Camera', unit_price: 100, unit_cost: 0 };
    const incoming = { packageId: 'p1', name: 'Camera Incoming', unit_price: 0, unit_cost: 0 };
    const result = mergePackageRecords(base, incoming);
    expect(result).not.toBe(base);
  });

  it('base name wins when base name is already set', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { name: 'Primary', unit_price: 0, unit_cost: 0, packageItems: [] };
    const incoming = { name: 'Secondary', unit_price: 0, unit_cost: 0, packageItems: [] };
    const result = mergePackageRecords(base, incoming);
    expect(result.name).toBe('Primary');
  });

  it('incoming name fills base when base name is empty', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { name: '', unit_price: 0, unit_cost: 0, packageItems: [] };
    const incoming = { name: 'Filled Name', unit_price: 0, unit_cost: 0, packageItems: [] };
    const result = mergePackageRecords(base, incoming);
    expect(result.name).toBe('Filled Name');
  });

  it('incoming unit_price fills base when base unit_price is 0', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { unit_price: 0, unit_cost: 0, packageItems: [] };
    const incoming = { unit_price: 300, unitPrice: 300, price: 300, unit_cost: 0, packageItems: [] };
    const result = mergePackageRecords(base, incoming);
    expect(result.unit_price).toBe(300);
    expect(result.price).toBe(300);
  });

  it('base unit_price is preserved when it is already non-zero', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { unit_price: 500, unit_cost: 0, packageItems: [] };
    const incoming = { unit_price: 200, unit_cost: 0, packageItems: [] };
    const result = mergePackageRecords(base, incoming);
    expect(result.unit_price).toBe(500);
  });

  it('incoming packageItems fills base when base packageItems is empty', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const baseItems = [];
    const incomingItems = [{ normalizedBarcode: 'cam', qty: 1 }];
    const base = { unit_price: 0, unit_cost: 0, packageItems: baseItems };
    const incoming = { unit_price: 0, unit_cost: 0, packageItems: incomingItems };
    const result = mergePackageRecords(base, incoming);
    expect(result.packageItems).toEqual(incomingItems);
  });

  it('items alias is kept in sync with packageItems', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { unit_price: 0, unit_cost: 0, packageItems: [] };
    const incoming = { unit_price: 0, unit_cost: 0, packageItems: [{ normalizedBarcode: 'x', qty: 1 }] };
    const result = mergePackageRecords(base, incoming);
    expect(result.items).toEqual(result.packageItems);
  });

  it('incoming cost fills base when base cost is 0', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const base = { unit_price: 0, unit_cost: 0, cost: 0, packageItems: [] };
    const incoming = { unit_price: 0, unit_cost: 150, cost: 150, packageItems: [] };
    const result = mergePackageRecords(base, incoming);
    expect(result.unit_cost).toBe(150);
    expect(result.cost).toBe(150);
  });

  it('merges overlapping packageItems collections via mergePackageItemCollections', () => {
    toNumber.mockImplementation((v) => Number(v) || 0);
    const baseItem = { normalizedBarcode: 'cam', qty: 2, quantity: 2, equipmentId: null };
    const incomingItem = { normalizedBarcode: 'light', qty: 1, quantity: 1, equipmentId: null };
    const base = { unit_price: 0, unit_cost: 0, packageItems: [baseItem] };
    const incoming = { unit_price: 0, unit_cost: 0, packageItems: [incomingItem] };
    const result = mergePackageRecords(base, incoming);
    expect(result.packageItems).toHaveLength(2);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// resolvePackageMergeKey
// ═══════════════════════════════════════════════════════════════════════════════

describe('resolvePackageMergeKey', () => {
  it('returns null for null input', () => {
    expect(resolvePackageMergeKey(null)).toBeNull();
  });

  it('returns null for non-object input', () => {
    expect(resolvePackageMergeKey('string')).toBeNull();
  });

  it('returns null for empty object with no usable fields', () => {
    normalizePackageIdentifier.mockReturnValue('');
    expect(resolvePackageMergeKey({})).toBeNull();
  });

  it('returns code-based key from entry.package_code', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const result = resolvePackageMergeKey({ package_code: 'CODE-1' });
    expect(result).toBe('CODE-1');
  });

  it('returns code-based key from entry.barcode', () => {
    normalizePackageIdentifier.mockImplementation((v) => {
      if (v === 'CODE-1') return '';
      return String(v || '');
    });
    const result = resolvePackageMergeKey({ barcode: 'BC-99' });
    expect(result).toBe('BC-99');
  });

  it('falls back to id-based key (packageId) when code fields are empty', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const result = resolvePackageMergeKey({ packageId: 'ID-42' });
    expect(result).toBe('ID-42');
  });

  it('uses codeToIdMap to translate code to canonical id', () => {
    normalizePackageIdentifier.mockImplementation((v) => String(v || ''));
    const codeToIdMap = new Map([['code-mapped', 'canonical-id']]);
    const result = resolvePackageMergeKey({ package_code: 'code-mapped' }, codeToIdMap);
    expect(result).toBe('canonical-id');
  });
});
