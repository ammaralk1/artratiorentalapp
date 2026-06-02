import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mocks ─────────────────────────────────────────────────────────────────────
vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v ?? '')),
}));
vi.mock('../../../src/scripts/reservationsShared.js', () => ({
  parsePriceValue: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }),
}));
vi.mock('../../../src/scripts/reservationsSummary.js', () => ({
  DEFAULT_COMPANY_SHARE_PERCENT: 15,
  calculateDraftFinancialBreakdown: vi.fn(() => ({
    equipmentTotal: 0, crewTotal: 0, discountAmount: 0,
    subtotalAfterDiscount: 0, taxAmount: 0, finalTotal: 0,
    companyShareAmount: 0, netProfit: 0, rentalDays: 1,
  })),
  calculatePaymentProgress: vi.fn(() => ({ paidAmount: 0, paidPercent: 0 })),
  determinePaymentStatus: vi.fn(() => 'unpaid'),
}));
vi.mock('../../../src/scripts/reservationsPackages.js', () => ({
  findPackageById: vi.fn(() => null),
  resolvePackageItems: vi.fn(() => []),
}));
vi.mock('../../../src/scripts/reservations/service/utils.js', () => ({
  sanitizePriceValue: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
  }),
  toNumber: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
  }),
  toPositiveInt: vi.fn((v) => {
    const n = Math.round(Number(v) || 1);
    return n > 0 ? n : 1;
  }),
  normalizeReservationItemType: vi.fn((v) => (v ? String(v).toLowerCase().trim() : '')),
  normalizePackageIdentifier: vi.fn((v) => (v != null ? String(v).trim() : '')),
  resolveEquipmentIdValue: vi.fn((v) => (v != null ? String(v) : null)),
  debugLogPackages: vi.fn(),
  normalizeStatusValue: vi.fn((v) => (v ? String(v).toLowerCase().trim() : 'pending')),
  normalisePaidStatus: vi.fn((v) => {
    const s = String(v || '').toLowerCase();
    if (['paid', 'partial', 'unpaid'].includes(s)) return s;
    return 'unpaid';
  }),
}));
vi.mock('../../../src/scripts/reservations/service/cache.js', () => ({
  getCachedReservationPackages: vi.fn(() => []),
  getCachedReservationItemCosts: vi.fn(() => ({})),
  getCachedReservationCrew: vi.fn(() => []),
  persistReservationPackagesToCache: vi.fn(),
  inferPackagesFromItems: vi.fn(() => []),
  hasRichCrewData: vi.fn(() => false),
}));
vi.mock('../../../src/scripts/reservations/service/payment.js', () => ({
  normalizePaymentHistoryCollection: vi.fn(() => []),
  extractPaymentHistoryFromCandidates: vi.fn(() => []),
  normalizePaymentType: vi.fn((v) => String(v || 'unpaid')),
}));
vi.mock('../../../src/scripts/reservations/service/packages.js', () => ({
  mergePackageCollections: vi.fn((a, b) => [...(a || []), ...(b || [])]),
  dedupePackages: vi.fn((a) => a || []),
  mapReservationPackagesFromSource: vi.fn(() => []),
  normalizeReservationPackageItemsFromEntry: vi.fn(() => []),
  derivePackageUnitPrice: vi.fn(() => 0),
  resolvePackageMergeKey: vi.fn(() => ''),
  mergePackageRecords: vi.fn((a, b) => ({ ...a, ...b })),
  derivePackageMergeKey: vi.fn(() => ''),
  normalizeItemsWithPackages: vi.fn((items) => ({ items: items || [], packages: [] })),
}));

// ── Import after mocks ────────────────────────────────────────────────────────
const { normalizeCrewAssignmentEntry, mapReservationItem, toInternalReservation, mapLegacyReservation, mapReservationFromApi, setMappingStateGetter } =
  await import('../../../src/scripts/reservations/service/mapping.js');

beforeEach(() => {
  setMappingStateGetter(() => []);
});

// ── normalizeCrewAssignmentEntry ──────────────────────────────────────────────
describe('normalizeCrewAssignmentEntry', () => {
  it('returns null for null input', () => {
    expect(normalizeCrewAssignmentEntry(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(normalizeCrewAssignmentEntry(undefined)).toBeNull();
  });

  it('handles primitive string input as technicianId', () => {
    const result = normalizeCrewAssignmentEntry('tech-99', 0);
    expect(result.technicianId).toBe('tech-99');
    expect(result.positionLabel).toBe('');
    expect(result.positionCost).toBe(0);
  });

  it('handles primitive number input as technicianId', () => {
    const result = normalizeCrewAssignmentEntry(42, 2);
    expect(result.technicianId).toBe('42');
    expect(result.assignmentId).toBe('crew-2-42');
  });

  it('maps snake_case fields to camelCase', () => {
    const entry = {
      assignment_id: 'asgn-1',
      technician_id: 'tech-1',
      technician_name: 'Ahmed',
      position_name: 'Director',
      position_cost: 500,
      position_client_price: 800,
    };
    const result = normalizeCrewAssignmentEntry(entry);
    expect(result.assignmentId).toBe('asgn-1');
    expect(result.technicianId).toBe('tech-1');
    expect(result.technicianName).toBe('Ahmed');
    expect(result.positionLabel).toBe('Director');
  });

  it('maps camelCase fields', () => {
    const entry = {
      technicianId: 'tech-2',
      technicianName: 'Sara',
      positionName: 'DP',
      positionCost: 300,
    };
    const result = normalizeCrewAssignmentEntry(entry);
    expect(result.technicianId).toBe('tech-2');
    expect(result.technicianName).toBe('Sara');
  });

  it('returns empty string for missing positionLabel', () => {
    const result = normalizeCrewAssignmentEntry({ technicianId: 'x' });
    expect(result.positionLabel).toBe('');
  });

  it('includes notes field', () => {
    const result = normalizeCrewAssignmentEntry({ technicianId: 't1', notes: 'on time' });
    expect(result.notes).toBe('on time');
  });

  it('has null notes when not provided', () => {
    const result = normalizeCrewAssignmentEntry({ technicianId: 't1' });
    expect(result.notes).toBeNull();
  });

  it('includes phone field from technician_phone', () => {
    const result = normalizeCrewAssignmentEntry({ technicianId: 't1', technician_phone: '0501234567' });
    expect(result.technicianPhone).toBe('0501234567');
  });
});

// ── mapReservationItem ────────────────────────────────────────────────────────
describe('mapReservationItem', () => {
  it('returns default shape for null input', () => {
    const result = mapReservationItem(null);
    expect(result.barcode).toBe('');
    expect(result.qty).toBe(1);
    expect(result.price).toBe(0);
    expect(result.cost).toBe(0);
  });

  it('returns default shape for non-object input', () => {
    const result = mapReservationItem('not-an-object');
    expect(result.qty).toBe(1);
    expect(result.price).toBe(0);
  });

  it('maps unit_price to price', () => {
    const result = mapReservationItem({ unit_price: 250, barcode: '123' });
    expect(result.price).toBe(250);
  });

  it('maps unit_cost to cost', () => {
    const result = mapReservationItem({ unit_cost: 150 });
    expect(result.cost).toBe(150);
  });

  it('maps description field to desc', () => {
    const result = mapReservationItem({ description: 'Camera A7S' });
    expect(result.desc).toBe('Camera A7S');
  });

  it('maps qty field', () => {
    const result = mapReservationItem({ qty: 3 });
    expect(result.qty).toBe(3);
  });

  it('maps quantity field', () => {
    const result = mapReservationItem({ quantity: 5 });
    expect(result.qty).toBe(5);
  });

  it('uses count as quantity fallback', () => {
    const result = mapReservationItem({ count: 2 });
    expect(result.qty).toBe(2);
  });

  it('maps image field', () => {
    const result = mapReservationItem({ image: 'https://example.com/img.jpg' });
    expect(result.image).toBe('https://example.com/img.jpg');
  });

  it('maps image_url as fallback image', () => {
    const result = mapReservationItem({ image_url: 'https://example.com/img2.jpg' });
    expect(result.image).toBe('https://example.com/img2.jpg');
  });

  it('maps notes field', () => {
    const result = mapReservationItem({ notes: 'fragile' });
    expect(result.notes).toBe('fragile');
  });

  it('has null notes when absent', () => {
    const result = mapReservationItem({ barcode: '123' });
    expect(result.notes).toBeNull();
  });

  it('maps equipment_id to equipmentId', () => {
    const result = mapReservationItem({ equipment_id: 42 });
    expect(result.equipmentId).toBe(42);
  });
});

// ── mapReservationFromApi ──────────────────────────────────────────────────────
describe('mapReservationFromApi', () => {
  it('keeps fresh server prices when an existing reservation has older prices', () => {
    setMappingStateGetter(() => [
      {
        id: '10',
        items: [
          {
            equipmentId: 5,
            unit_price: 3010,
            price: 3010,
            unit_cost: 0,
            cost: 0,
          },
        ],
      },
    ]);

    const result = mapReservationFromApi({
      id: '10',
      total_amount: 1000,
      items: [
        {
          equipment_id: 5,
          quantity: 1,
          unit_price: 1000,
          unit_cost: 0,
        },
      ],
    });

    expect(result.items[0].price).toBe(1000);
  });
});

// ── toInternalReservation ─────────────────────────────────────────────────────
describe('toInternalReservation', () => {
  it('returns object with id from raw.id', () => {
    const result = toInternalReservation({ id: '99' });
    expect(result.id).toBe('99');
  });

  it('returns object with id from reservation_id fallback', () => {
    const result = toInternalReservation({ reservation_id: '55' });
    expect(result.id).toBe('55');
  });

  it('maps items array through mapReservationItem', () => {
    const result = toInternalReservation({ id: '1', items: [{ barcode: 'B001', unit_price: 100 }] });
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].barcode).toBe('B001');
  });

  it('returns empty items array when items absent', () => {
    const result = toInternalReservation({ id: '1' });
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items).toHaveLength(0);
  });

  it('maps start field', () => {
    const result = toInternalReservation({ id: '1', start: '2026-04-01T09:00' });
    expect(result.start).toBe('2026-04-01T09:00');
  });

  it('maps end field', () => {
    const result = toInternalReservation({ id: '1', end: '2026-04-03T18:00' });
    expect(result.end).toBe('2026-04-03T18:00');
  });

  it('maps discount field', () => {
    const result = toInternalReservation({ id: '1', discount: 10 });
    expect(result.discount).toBeDefined();
  });

  it('maps notes field', () => {
    const result = toInternalReservation({ id: '1', notes: 'careful handling' });
    expect(result.notes).toBe('careful handling');
  });

  it('handles empty input gracefully', () => {
    const result = toInternalReservation({});
    expect(result).toBeTypeOf('object');
    expect(Array.isArray(result.items)).toBe(true);
  });

  it('returns object with empty string id for missing id fields', () => {
    const result = toInternalReservation({ notes: 'no-id' });
    expect(result.id).toBe('');
  });
});

// ── mapLegacyReservation ──────────────────────────────────────────────────────
describe('mapLegacyReservation', () => {
  it('is an alias for toInternalReservation', () => {
    const raw = { id: '77', notes: 'legacy', items: [] };
    const result = mapLegacyReservation(raw);
    expect(result.id).toBe('77');
    expect(result.notes).toBe('legacy');
  });

  it('handles empty input', () => {
    const result = mapLegacyReservation({});
    expect(result).toBeTypeOf('object');
  });
});
