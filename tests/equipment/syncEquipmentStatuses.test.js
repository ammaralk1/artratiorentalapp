import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Hoist mocks ───────────────────────────────────────────────────────────────

const storageMocks = vi.hoisted(() => ({
  loadData: vi.fn(),
  saveData: vi.fn(),
}));

vi.mock('../../src/scripts/storage.js', () => storageMocks);
vi.mock('../../src/styles/app.css', () => ({}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
}));

vi.mock('../../src/scripts/apiClient.js', () => ({
  apiRequest: vi.fn(),
  ApiError: class ApiError extends Error {
    constructor(message, opts = {}) {
      super(message);
      this.name = 'ApiError';
      this.status = opts.status ?? null;
      this.payload = opts.payload ?? null;
    }
  },
}));

vi.mock('../../src/scripts/auth.js', () => ({
  userCanManageDestructiveActions: vi.fn(() => false),
  notifyPermissionDenied: vi.fn(),
  AUTH_EVENTS: { USER_UPDATED: 'auth:user-updated' },
}));

vi.mock('../../src/scripts/ui/enhancedSelect.js', () => ({
  refreshEnhancedSelect: vi.fn(),
}));

vi.mock('../../src/scripts/reservations/equipmentSelection.js', () => ({
  isEquipmentSelectionActive: vi.fn(() => false),
  getActiveEquipmentSelection: vi.fn(() => null),
  requestAddEquipmentToSelection: vi.fn(),
  clearEquipmentSelection: vi.fn(),
  EQUIPMENT_SELECTION_EVENTS: { CHANGED: 'equipment-selection:changed' },
}));

vi.mock('../../src/scripts/reservations/state.js', () => ({
  hasEquipmentConflict: vi.fn(() => false),
  normalizeBarcodeValue: vi.fn((v) => String(v ?? '').trim()),
}));

vi.mock('../../src/scripts/reservationsEquipment.js', () => ({
  isEquipmentAvailable: vi.fn(() => true),
  normalizeAssetUrl: vi.fn((v) => String(v ?? '')),
}));

vi.mock('../../src/scripts/equipmentPagination.js', () => ({
  DEFAULT_EQUIPMENT_PAGE_SIZE: 20,
  buildEquipmentPageNumbers: vi.fn(() => []),
  getEquipmentPaginationState: vi.fn(() => ({
    currentPage: 1,
    totalPages: 1,
    rangeStart: 1,
    rangeEnd: 0,
  })),
}));

// Keep real normalizeNumbers from utils, mock only showToast
vi.mock('../../src/scripts/utils.js', async () => {
  const actual = await vi.importActual('../../src/scripts/utils.js');
  return { ...actual, showToast: vi.fn() };
});

// ── Import after mocks ────────────────────────────────────────────────────────

import { syncEquipmentStatuses } from '../../src/scripts/equipment.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeEquipment(overrides = {}) {
  return {
    id: '1',
    barcode: 'EQ-001',
    status: 'available',
    category: '',
    description: 'Camera',
    quantity: 1,
    unit_price: 0,
    ...overrides,
  };
}

function makeReservation({ barcodes = [], start, end, status = 'confirmed' } = {}) {
  const now = new Date();
  const defaultStart = start ?? new Date(now.getTime() - 3600 * 1000).toISOString();
  const defaultEnd   = end   ?? new Date(now.getTime() + 3600 * 1000).toISOString();
  return {
    id: 'R1',
    status,
    start: defaultStart,
    end: defaultEnd,
    items: barcodes.map((b) => ({ barcode: b })),
  };
}

function makeTicket(barcode, status = 'open') {
  return { id: 'M1', equipmentBarcode: barcode, status };
}

function setupData({ equipment = [], reservations = [], maintenance = [] } = {}) {
  storageMocks.loadData.mockReturnValue({ equipment, reservations, maintenance });
}

// ── Tests ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  storageMocks.loadData.mockReturnValue({ equipment: [], reservations: [], maintenance: [] });
  storageMocks.saveData.mockReset();
});

describe('syncEquipmentStatuses — empty data', () => {
  it('returns empty array when no equipment', () => {
    setupData({ equipment: [] });
    expect(syncEquipmentStatuses()).toEqual([]);
  });

  it('returns empty array when equipment is null/missing', () => {
    storageMocks.loadData.mockReturnValue({});
    expect(syncEquipmentStatuses()).toEqual([]);
  });
});

describe('syncEquipmentStatuses — available status', () => {
  it('marks equipment as available when no maintenance or reservations', () => {
    setupData({ equipment: [makeEquipment({ status: 'available' })] });
    const result = syncEquipmentStatuses();
    expect(result[0]).toMatchObject({ status: 'available' });
  });

  it('keeps equipment as available when reservation is in the past', () => {
    const past = new Date(Date.now() - 7200 * 1000).toISOString();
    const pastEnd = new Date(Date.now() - 3600 * 1000).toISOString();
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [makeReservation({ barcodes: ['EQ-001'], start: past, end: pastEnd })],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });

  it('keeps equipment as available when reservation is in the future', () => {
    const futureStart = new Date(Date.now() + 3600 * 1000).toISOString();
    const futureEnd = new Date(Date.now() + 7200 * 1000).toISOString();
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [makeReservation({ barcodes: ['EQ-001'], start: futureStart, end: futureEnd })],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });
});

describe('syncEquipmentStatuses — maintenance', () => {
  it('marks equipment as maintenance when open ticket matches barcode', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001', status: 'available' })],
      maintenance: [makeTicket('EQ-001', 'open')],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('maintenance');
  });

  it('does NOT mark equipment as maintenance for closed/resolved tickets', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001', status: 'maintenance' })],
      maintenance: [makeTicket('EQ-001', 'closed')],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });

  it('handles Arabic barcode normalization for maintenance matching', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-٠٠١', status: 'available' })],
      maintenance: [makeTicket('EQ-001', 'open')],
    });
    // Barcode 'EQ-٠٠١' normalizes to 'EQ-001' so should match
    const result = syncEquipmentStatuses();
    // normalizeNumbers converts Arabic to Western digits
    expect(result[0].status).toBe('maintenance');
  });

  it('maintenance takes priority over active reservation', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001', status: 'available' })],
      reservations: [makeReservation({ barcodes: ['EQ-001'] })],
      maintenance: [makeTicket('EQ-001', 'open')],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('maintenance');
  });
});

describe('syncEquipmentStatuses — reserved', () => {
  it('marks equipment as reserved when active reservation covers it', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [makeReservation({ barcodes: ['EQ-001'] })],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('reserved');
  });

  it('does NOT mark as reserved for cancelled reservations', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [makeReservation({ barcodes: ['EQ-001'], status: 'cancelled' })],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });

  it('does NOT mark as reserved for canceled (US spelling) reservations', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [makeReservation({ barcodes: ['EQ-001'], status: 'canceled' })],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });

  it('marks equipment as reserved only when its barcode is in items', () => {
    setupData({
      equipment: [
        makeEquipment({ id: '1', barcode: 'EQ-001' }),
        makeEquipment({ id: '2', barcode: 'EQ-002' }),
      ],
      reservations: [makeReservation({ barcodes: ['EQ-001'] })],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('reserved');
    expect(result[1].status).toBe('available');
  });

  it('handles reservation with invalid dates gracefully', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [{ id: 'R1', status: 'confirmed', start: 'invalid', end: 'invalid', items: [{ barcode: 'EQ-001' }] }],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });

  it('handles reservation missing start/end gracefully', () => {
    setupData({
      equipment: [makeEquipment({ barcode: 'EQ-001' })],
      reservations: [{ id: 'R1', items: [{ barcode: 'EQ-001' }] }],
    });
    const result = syncEquipmentStatuses();
    expect(result[0].status).toBe('available');
  });
});

describe('syncEquipmentStatuses — multiple items', () => {
  it('independently assigns status to each piece of equipment', () => {
    setupData({
      equipment: [
        makeEquipment({ id: '1', barcode: 'EQ-001' }),
        makeEquipment({ id: '2', barcode: 'EQ-002' }),
        makeEquipment({ id: '3', barcode: 'EQ-003' }),
      ],
      reservations: [makeReservation({ barcodes: ['EQ-002'] })],
      maintenance: [makeTicket('EQ-003', 'open')],
    });
    const result = syncEquipmentStatuses();
    const byBarcode = Object.fromEntries(result.map((e) => [e.barcode, e.status]));
    expect(byBarcode['EQ-001']).toBe('available');
    expect(byBarcode['EQ-002']).toBe('reserved');
    expect(byBarcode['EQ-003']).toBe('maintenance');
  });
});

describe('syncEquipmentStatuses — saveData side effect', () => {
  it('calls saveData after syncing', () => {
    setupData({ equipment: [makeEquipment()] });
    syncEquipmentStatuses();
    expect(storageMocks.saveData).toHaveBeenCalled();
  });
});
