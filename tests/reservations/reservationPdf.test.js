import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Mocks ──────────────────────────────────────────────────────────────────
const loadDataMock = vi.fn();
const saveDataMock = vi.fn();
const getReservationsStateMock = vi.fn();
const refreshReservationsFromApiMock = vi.fn();
const apiRequestMock = vi.fn();
const syncTechniciansStatusesMock = vi.fn();
const getTechnicianPositionsCacheMock = vi.fn();
const findPositionByNameMock = vi.fn();
const tMock = vi.fn((key, fallback) => fallback ?? key);
const normalizeNumbersMock = vi.fn((v) => String(v ?? ''));
const formatDateTimeMock = vi.fn((v) => String(v ?? ''));
const showToastMock = vi.fn();
const showToastWithActionMock = vi.fn();
const getCurrentLanguageMock = vi.fn(() => 'ar');
const setLanguageMock = vi.fn();
const calculateReservationDaysMock = vi.fn(() => 1);
const calculateReservationTotalMock = vi.fn(() => 0);
const calculateDraftFinancialBreakdownMock = vi.fn(() => ({
  equipmentTotal: 0, equipmentCostTotal: 0, crewTotal: 0, crewCostTotal: 0,
  discountAmount: 0, subtotalAfterDiscount: 0, taxableAmount: 0, taxAmount: 0,
  finalTotal: 0, companySharePercent: 0, companyShareAmount: 0, netProfit: 0,
  rentalDays: 1,
}));
const calculatePaymentProgressMock = vi.fn(() => ({ paidAmount: 0, paidPercent: 0, remainingAmount: 0 }));
const determinePaymentStatusMock = vi.fn(() => 'unpaid');
const resolveReservationProjectStateMock = vi.fn(() => ({ projectLinked: false }));
const buildReservationDisplayGroupsMock = vi.fn(() => []);
const sanitizePriceValueMock = vi.fn((v) => Number(v) || 0);
const parsePriceValueMock = vi.fn((v) => Number(v) || 0);
const findPackageByIdMock = vi.fn(() => null);
const getPackagesSnapshotMock = vi.fn(() => []);
const normalizeColorValueMock = vi.fn((v) => v);
const patchHtml2CanvasColorParsingMock = vi.fn();
const sanitizeComputedColorFunctionsMock = vi.fn();
const enforceLegacyColorFallbackMock = vi.fn();
const scrubUnsupportedColorFunctionsMock = vi.fn();
const openQuoteModalMock = vi.fn();

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: loadDataMock,
  saveData: saveDataMock,
}));
vi.mock('../../src/scripts/reservationsService.js', () => ({
  getReservationsState: getReservationsStateMock,
  refreshReservationsFromApi: refreshReservationsFromApiMock,
}));
vi.mock('../../src/scripts/apiClient.js', () => ({ apiRequest: apiRequestMock }));
vi.mock('../../src/scripts/technicians.js', () => ({
  syncTechniciansStatuses: syncTechniciansStatusesMock,
}));
vi.mock('../../src/scripts/technicianPositions.js', () => ({
  getTechnicianPositionsCache: getTechnicianPositionsCacheMock,
  findPositionByName: findPositionByNameMock,
}));
vi.mock('../../src/scripts/language.js', () => ({
  t: tMock,
  setLanguage: setLanguageMock,
  getCurrentLanguage: getCurrentLanguageMock,
}));
vi.mock('../../src/scripts/utils.js', () => ({
  normalizeNumbers: normalizeNumbersMock,
  formatDateTime: formatDateTimeMock,
  showToast: showToastMock,
  showToastWithAction: showToastWithActionMock,
}));
vi.mock('../../src/scripts/reservationsSummary.js', () => ({
  calculateReservationDays: calculateReservationDaysMock,
  calculateReservationTotal: calculateReservationTotalMock,
  DEFAULT_COMPANY_SHARE_PERCENT: 15,
  calculatePaymentProgress: calculatePaymentProgressMock,
  determinePaymentStatus: determinePaymentStatusMock,
  calculateDraftFinancialBreakdown: calculateDraftFinancialBreakdownMock,
}));
vi.mock('../../src/scripts/reservationsShared.js', () => ({
  resolveReservationProjectState: resolveReservationProjectStateMock,
  buildReservationDisplayGroups: buildReservationDisplayGroupsMock,
  sanitizePriceValue: sanitizePriceValueMock,
  parsePriceValue: parsePriceValueMock,
}));
vi.mock('../../src/scripts/reservationsPackages.js', () => ({
  findPackageById: findPackageByIdMock,
  getPackagesSnapshot: getPackagesSnapshotMock,
}));
vi.mock('../../src/scripts/projects/constants.js', () => ({ PROJECT_TAX_RATE: 0.15 }));
vi.mock('../../src/scripts/canvasColorUtils.js', () => ({
  normalizeColorValue: normalizeColorValueMock,
  patchHtml2CanvasColorParsing: patchHtml2CanvasColorParsingMock,
  sanitizeComputedColorFunctions: sanitizeComputedColorFunctionsMock,
  enforceLegacyColorFallback: enforceLegacyColorFallbackMock,
  scrubUnsupportedColorFunctions: scrubUnsupportedColorFunctionsMock,
}));

// Vite asset imports — return stable stub strings
vi.mock('../../src/styles/quotePdf.css?raw', () => ({ default: '/* stub */' }));
vi.mock('../../src/assets/AR-Logo-v3.5-curved-WH.png?url', () => ({
  default: 'data:image/png;base64,stub',
}));
vi.mock('/assets/Tajawal-400.ttf?url', () => ({ default: 'stub-400.ttf' }));
vi.mock('/assets/Tajawal-500.ttf?url', () => ({ default: 'stub-500.ttf' }));
vi.mock('/assets/Tajawal-700.ttf?url', () => ({ default: 'stub-700.ttf' }));

// ── Helpers ──────────────────────────────────────────────────────────────────
function makeReservation(overrides = {}) {
  return {
    id: '42',
    reservationCode: 'R-0042',
    start: '2026-04-01',
    end: '2026-04-03',
    items: [],
    technicians: [],
    crewAssignments: [],
    discount: 0,
    discountType: 'percent',
    applyTax: false,
    cost: 500,
    ...overrides,
  };
}

function makeProject(overrides = {}) {
  return {
    id: '10',
    projectCode: 'PRJ-010',
    title: 'Test Project',
    type: 'commercial',
    start: '2026-04-01',
    end: '2026-04-05',
    expenses: [],
    ...overrides,
  };
}

function makeCustomer(overrides = {}) {
  return { id: '1', customerName: 'Ahmed', phone: '0501234567', ...overrides };
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('reservationPdf public API', () => {
  beforeEach(() => {
    vi.resetModules();
    showToastMock.mockReset();
    showToastWithActionMock.mockReset();
    openQuoteModalMock.mockReset();
    loadDataMock.mockReturnValue({
      reservations: [], customers: [], technicians: [], projects: [], equipment: [], packages: [],
    });
    getReservationsStateMock.mockReturnValue([]);
    syncTechniciansStatusesMock.mockReturnValue([]);
    getTechnicianPositionsCacheMock.mockReturnValue([]);
    apiRequestMock.mockResolvedValue({ data: [] });
    refreshReservationsFromApiMock.mockResolvedValue([]);
  });

  describe('exportReservationPdf', () => {
    it('exports from reservationPdf.js entry point', async () => {
      const mod = await import('../../src/scripts/reservations/reservationPdf.js');
      expect(typeof mod.exportReservationPdf).toBe('function');
      expect(typeof mod.exportReservationChecklistPdf).toBe('function');
      expect(typeof mod.exportProjectPdf).toBe('function');
    });

    it('shows toast and returns when reservation is null', async () => {
      const { exportReservationPdf } = await import('../../src/scripts/reservations/reservationPdf.js');
      await exportReservationPdf({ reservation: null });
      expect(showToastMock).toHaveBeenCalledWith(
        expect.stringContaining('تعذر'),
      );
    });

    it('is an async function', async () => {
      const { exportReservationPdf } = await import('../../src/scripts/reservations/reservationPdf.js');
      expect(exportReservationPdf).toBeInstanceOf(Function);
      // null-guard path returns cleanly without touching DOM
      const result = exportReservationPdf({ reservation: null });
      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });

  describe('exportReservationChecklistPdf', () => {
    it('shows toast and returns when reservation is null', async () => {
      const { exportReservationChecklistPdf } = await import(
        '../../src/scripts/reservations/reservationPdf.js'
      );
      await exportReservationChecklistPdf({ reservation: null });
      expect(showToastMock).toHaveBeenCalledWith(
        expect.stringContaining('تعذر'),
      );
    });

    it('is an async function', async () => {
      const { exportReservationChecklistPdf } = await import(
        '../../src/scripts/reservations/reservationPdf.js'
      );
      expect(exportReservationChecklistPdf).toBeInstanceOf(Function);
      const result = exportReservationChecklistPdf({ reservation: null });
      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });

  describe('exportProjectPdf', () => {
    it('shows toast and returns when project is null', async () => {
      const { exportProjectPdf } = await import(
        '../../src/scripts/reservations/reservationPdf.js'
      );
      await exportProjectPdf({ project: null });
      expect(showToastMock).toHaveBeenCalledWith(
        expect.stringContaining('تعذر'),
      );
    });

    it('is an async function', async () => {
      const { exportProjectPdf } = await import(
        '../../src/scripts/reservations/reservationPdf.js'
      );
      expect(exportProjectPdf).toBeInstanceOf(Function);
      const result = exportProjectPdf({ project: null });
      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });
});
