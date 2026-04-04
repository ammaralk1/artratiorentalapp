import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── localStorage mock ─────────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    _store: () => store,
    _reset: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });
Object.defineProperty(globalThis, 'window', {
  value: { localStorage: localStorageMock },
  writable: true,
  configurable: true,
});

// ── Module mocks ──────────────────────────────────────────────────────────────
vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v ?? '')),
}));

vi.mock('../../../src/scripts/reservationsPackages.js', () => ({
  findPackageById: vi.fn(() => null),
  normalizePackageId: vi.fn((v) => String(v || '')),
  resolvePackageItems: vi.fn(() => []),
  getPackagesSnapshot: vi.fn(() => []),
  getPackageDisplayName: vi.fn(() => ''),
  resolvePackagePrice: vi.fn(() => 0),
}));

vi.mock('../../../src/scripts/reservations/service/utils.js', () => ({
  sanitizePriceValue: vi.fn((v) => Number(v) || 0),
  normalizePackageIdentifier: vi.fn((v) => String(v || '')),
  normalizeBarcodeValueLoose: vi.fn((v) => String(v || '').toLowerCase()),
  debugLogPackages: vi.fn(),
  toNumber: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
  }),
  toPositiveInt: vi.fn((v) => {
    const n = Math.round(Number(v) || 1);
    return n > 0 ? n : 1;
  }),
  resolveEquipmentIdValue: vi.fn((v) => (v != null ? String(v) : null)),
  normalizeReservationItemType: vi.fn((v) => (v ? String(v).toLowerCase().trim() : '')),
}));

vi.mock('../../../src/scripts/reservations/service/packages.js', () => ({
  convertReservationPackageEntry: vi.fn((pkg) => pkg ?? null),
  normalizeReservationPackageItemsFromEntry: vi.fn(() => []),
}));

vi.mock('../../../src/scripts/reservations/service/mapping.js', () => ({
  normalizeCrewAssignmentEntry: vi.fn((entry) => entry ?? null),
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────
import {
  getPackagesSnapshot,
  resolvePackageItems,
  getPackageDisplayName,
  resolvePackagePrice,
} from '../../../src/scripts/reservationsPackages.js';

import {
  hasRichCrewData,
  inferPackagesFromItems,
  getCachedReservationCrew,
  getCachedReservationPackages,
  getCachedReservationItemCosts,
  syncReservationItemCostCache,
  persistReservationItemCostsToCache,
} from '../../../src/scripts/reservations/service/cache.js';

// ── Setup ─────────────────────────────────────────────────────────────────────
beforeEach(() => {
  localStorageMock._reset();
  vi.clearAllMocks();
  // Default: no packages snapshot
  getPackagesSnapshot.mockReturnValue([]);
});

// ── hasRichCrewData ───────────────────────────────────────────────────────────
describe('hasRichCrewData', () => {
  it('returns false for empty array', () => {
    expect(hasRichCrewData([])).toBe(false);
  });

  it('returns false for null', () => {
    expect(hasRichCrewData(null)).toBe(false);
  });

  it('returns true when an assignment has a non-empty positionLabel', () => {
    const assignments = [{ positionLabel: 'Camera Operator', positionCost: 0, positionClientPrice: 0 }];
    expect(hasRichCrewData(assignments)).toBe(true);
  });

  it('returns true when an assignment has positionId set', () => {
    const assignments = [{ positionId: 5, positionLabel: '', positionCost: 0, positionClientPrice: 0 }];
    expect(hasRichCrewData(assignments)).toBe(true);
  });

  it('returns true when an assignment has positionClientPrice set', () => {
    const assignments = [{ positionLabel: '', positionClientPrice: 200, positionCost: 0 }];
    expect(hasRichCrewData(assignments)).toBe(true);
  });

  it('returns false when assignments only have blank/missing label, id, and price', () => {
    const assignments = [{ technicianId: 3, positionLabel: '', positionCost: 0, positionClientPrice: 0 }];
    // positionCost 0 is still isFinite — so hasRichCrewData should return true via hasCost
    // Actually Number.isFinite(0) is true, so this returns true.
    // Let's use an assignment where all fields produce false.
    const noRich = [{ technicianId: 7 }];
    // positionLabel undefined → ''.trim() → '' → hasLabel false
    // positionId undefined, positionKey undefined → hasKey false
    // positionClientPrice undefined → Number(undefined) = NaN → isFinite false
    // positionCost undefined → same → false
    expect(hasRichCrewData(noRich)).toBe(false);
  });
});

// ── inferPackagesFromItems ────────────────────────────────────────────────────
describe('inferPackagesFromItems', () => {
  it('returns [] for empty array', () => {
    expect(inferPackagesFromItems([])).toEqual([]);
  });

  it('returns [] when packages snapshot is empty', () => {
    getPackagesSnapshot.mockReturnValue([]);
    const items = [{ equipmentId: 1, qty: 2 }];
    expect(inferPackagesFromItems(items)).toEqual([]);
  });

  it('returns [] for non-array input (null)', () => {
    expect(inferPackagesFromItems(null)).toEqual([]);
  });

  it('returns [] when no package definition matches available items', () => {
    getPackagesSnapshot.mockReturnValue([
      { id: 'pkgA', items: [{ equipmentId: 99, qty: 1 }] },
    ]);
    // resolvePackageItems returns [] by default, so req.size === 0 → skip
    const items = [{ equipmentId: 1, qty: 5 }];
    expect(inferPackagesFromItems(items)).toEqual([]);
  });

  it('returns grouped package entries when resolvePackageItems has resolvable ids', () => {
    resolvePackageItems.mockReturnValue([{ equipmentId: 1, qty: 1 }]);
    getPackageDisplayName.mockReturnValue('Lighting Kit');
    resolvePackagePrice.mockReturnValue(500);
    getPackagesSnapshot.mockReturnValue([{ id: 'pkgA', code: 'LIGHTING' }]);

    const items = [{ equipmentId: 1, qty: 2 }];
    const result = inferPackagesFromItems(items);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('package_code');
    expect(result[0]).toHaveProperty('quantity');
  });
});

// ── getCachedReservationCrew ──────────────────────────────────────────────────
describe('getCachedReservationCrew', () => {
  it('returns [] for a missing cache entry (CREW_CACHE_ENABLED is false)', () => {
    // CREW_CACHE_ENABLED = false → always returns []
    expect(getCachedReservationCrew('reservation-1')).toEqual([]);
  });

  it('returns [] for null reservationId', () => {
    expect(getCachedReservationCrew(null)).toEqual([]);
  });

  it('returns [] for undefined reservationId', () => {
    expect(getCachedReservationCrew(undefined)).toEqual([]);
  });
});

// ── getCachedReservationPackages ──────────────────────────────────────────────
describe('getCachedReservationPackages', () => {
  it('returns [] when no cache entry exists for reservationId', () => {
    expect(getCachedReservationPackages('r-missing')).toEqual([]);
  });

  it('returns [] for null reservationId', () => {
    expect(getCachedReservationPackages(null)).toEqual([]);
  });

  it('returns [] for undefined reservationId', () => {
    expect(getCachedReservationPackages(undefined)).toEqual([]);
  });
});

// ── getCachedReservationItemCosts ─────────────────────────────────────────────
describe('getCachedReservationItemCosts', () => {
  it('returns [] when no cache entry exists', () => {
    expect(getCachedReservationItemCosts('r-99')).toEqual([]);
  });

  it('returns [] for null reservationId', () => {
    expect(getCachedReservationItemCosts(null)).toEqual([]);
  });

  it('returns [] for undefined reservationId', () => {
    expect(getCachedReservationItemCosts(undefined)).toEqual([]);
  });

  it('returns stored items after persistReservationItemCostsToCache', () => {
    persistReservationItemCostsToCache('r-10', [
      { equipment_id: 5, cost: 100, price: 150 },
    ]);
    const result = getCachedReservationItemCosts('r-10');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('equipmentId', 5);
  });
});

// ── syncReservationItemCostCache ──────────────────────────────────────────────
describe('syncReservationItemCostCache', () => {
  it('does not throw for empty reservations array', () => {
    expect(() => syncReservationItemCostCache([])).not.toThrow();
  });

  it('removes stale cache entries not present in the reservation list', () => {
    // Seed two cache entries
    persistReservationItemCostsToCache('stale-1', [{ equipment_id: 1, cost: 50, price: 80 }]);
    persistReservationItemCostsToCache('keep-2', [{ equipment_id: 2, cost: 60, price: 90 }]);

    // Sync keeping only keep-2
    syncReservationItemCostCache([{ id: 'keep-2' }]);

    expect(getCachedReservationItemCosts('stale-1')).toEqual([]);
    expect(getCachedReservationItemCosts('keep-2').length).toBeGreaterThan(0);
  });
});
