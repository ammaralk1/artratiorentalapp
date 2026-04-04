import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — must be declared before any dynamic imports
// ---------------------------------------------------------------------------

const normalizeNumbersMock = vi.fn();
const formatDateTimeMock = vi.fn();
const calculateReservationDaysMock = vi.fn();

// We expose a mutable state object so tests can control activeQuoteState
const mockState = { activeQuoteState: null };

vi.mock('../../../src/scripts/reservations/pdf/state.js', () => ({
  state: mockState,
}));

vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: normalizeNumbersMock,
  formatDateTime: formatDateTimeMock,
}));

vi.mock('../../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
  getCurrentLanguage: vi.fn(() => 'ar'),
}));

vi.mock('../../../src/scripts/reservationsSummary.js', () => ({
  DEFAULT_COMPANY_SHARE_PERCENT: 15,
  calculateReservationDays: calculateReservationDaysMock,
  calculateReservationTotal: vi.fn(() => 0),
  calculatePaymentProgress: vi.fn(() => ({ paidAmount: 0, paidPercent: 0 })),
  determinePaymentStatus: vi.fn(() => 'unpaid'),
  calculateDraftFinancialBreakdown: vi.fn(() => ({
    equipmentTotal: 0,
    crewTotal: 0,
    discountAmount: 0,
    subtotalAfterDiscount: 0,
    taxAmount: 0,
    finalTotal: 0,
    companyShareAmount: 0,
    netProfit: 0,
    rentalDays: 1,
  })),
}));

vi.mock('../../../src/scripts/projects/constants.js', () => ({
  PROJECT_TAX_RATE: 0.15,
}));

vi.mock('../../../src/scripts/reservations/pdf/constants.js', () => ({
  QUOTE_COMPANY_INFO: {},
  QUOTE_SECTION_DEFS: [],
  PROJECT_QUOTE_SECTION_DEFS: [],
}));

// reservationsShared is imported by financial.js — provide a real-enough parsePriceValue
vi.mock('../../../src/scripts/reservationsShared.js', () => ({
  parsePriceValue: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : Number.NaN;
  }),
  sanitizePriceValue: vi.fn((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? Number(n.toFixed(2)) : 0;
  }),
  normalizeText: vi.fn((v) => String(v ?? '').trim().toLowerCase()),
  groupReservationItems: vi.fn(() => []),
  resolveReservationItemGroupKey: vi.fn(() => ''),
  resolveEquipmentIdentifier: vi.fn(() => null),
  buildReservationDisplayGroups: vi.fn(() => []),
}));

vi.mock('../../../src/scripts/reservationsPackages.js', () => ({
  resolvePackageItems: vi.fn(() => []),
  normalizePackageId: vi.fn((v) => String(v ?? '').trim().toLowerCase()),
  getPackagesSnapshot: vi.fn(() => []),
  findPackageById: vi.fn(() => null),
  getPackageDisplayName: vi.fn(() => ''),
}));

beforeEach(() => {
  vi.resetModules();
  mockState.activeQuoteState = null;
  normalizeNumbersMock.mockReset().mockImplementation((v) => String(v ?? ''));
  formatDateTimeMock.mockReset().mockImplementation((v) => String(v ?? ''));
  calculateReservationDaysMock.mockReset().mockImplementation((start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 1;
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff >= 1 ? diff : 1;
  });
});

// ---------------------------------------------------------------------------
// formatMoney
// ---------------------------------------------------------------------------

describe('formatMoney', () => {
  it('formats a whole integer with no decimals', async () => {
    const { formatMoney } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatMoney(1000);
    // normalizeNumbers is identity mock; toLocaleString produces "1,000"
    expect(typeof result).toBe('string');
    expect(result).toContain('1');
  });

  it('formats zero as "0"', async () => {
    const { formatMoney } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatMoney(0);
    expect(result).toBe('0');
  });

  it('returns "0" for null input', async () => {
    const { formatMoney } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatMoney(null);
    expect(result).toBe('0');
  });

  it('returns "0" for undefined input', async () => {
    const { formatMoney } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatMoney(undefined);
    expect(result).toBe('0');
  });

  it('handles decimal values with 2 fraction digits', async () => {
    const { formatMoney } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatMoney(3.5);
    // Should include fractional part since 3.5 % 1 > 1e-9
    expect(result).toContain('3');
    expect(result).toContain('50');
  });
});

// ---------------------------------------------------------------------------
// formatCurrencyValue
// ---------------------------------------------------------------------------

describe('formatCurrencyValue', () => {
  it('appends default currency label SR', async () => {
    const { formatCurrencyValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatCurrencyValue(500);
    expect(result).toContain('SR');
  });

  it('uses provided currency label', async () => {
    const { formatCurrencyValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatCurrencyValue(100, 'USD');
    expect(result).toContain('USD');
  });

  it('returns "0 SR" for zero', async () => {
    const { formatCurrencyValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatCurrencyValue(0);
    expect(result).toBe('0 SR');
  });

  it('handles null gracefully (treats as 0)', async () => {
    const { formatCurrencyValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatCurrencyValue(null);
    expect(result).toBe('0 SR');
  });
});

// ---------------------------------------------------------------------------
// formatPercentageValue
// ---------------------------------------------------------------------------

describe('formatPercentageValue', () => {
  it('returns "0.00%" for null input (null coerces to 0, a finite number)', async () => {
    const { formatPercentageValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(formatPercentageValue(null)).toBe('0.00%');
  });

  it('returns "0%" for undefined (undefined is not finite)', async () => {
    const { formatPercentageValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(formatPercentageValue(undefined)).toBe('0%');
  });

  it('returns "0%" for NaN string', async () => {
    const { formatPercentageValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(formatPercentageValue('abc')).toBe('0%');
  });

  it('formats a valid percentage with 2 decimal places', async () => {
    const { formatPercentageValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = formatPercentageValue(15);
    expect(result).toBe('15.00%');
  });

  it('formats zero correctly', async () => {
    const { formatPercentageValue } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(formatPercentageValue(0)).toBe('0.00%');
  });
});

// ---------------------------------------------------------------------------
// isCompanyShareEnabledForState
// ---------------------------------------------------------------------------

describe('isCompanyShareEnabledForState', () => {
  it('returns false when activeQuoteState is null', async () => {
    const { isCompanyShareEnabledForState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = null;
    expect(isCompanyShareEnabledForState()).toBe(false);
  });

  it('returns true when reservation.companyShareEnabled is true', async () => {
    const { isCompanyShareEnabledForState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: { companyShareEnabled: true }, totals: {} };
    expect(isCompanyShareEnabledForState()).toBe(true);
  });

  it('returns true when reservation.company_share_enabled is "true" (string)', async () => {
    const { isCompanyShareEnabledForState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: { company_share_enabled: 'true' }, totals: {} };
    expect(isCompanyShareEnabledForState()).toBe(true);
  });

  it('returns false when no share flag is set', async () => {
    const { isCompanyShareEnabledForState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: {}, totals: {} };
    expect(isCompanyShareEnabledForState()).toBe(false);
  });

  it('returns true for project context when project.companyShareEnabled is true', async () => {
    const { isCompanyShareEnabledForState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = {
      context: 'project',
      project: { companyShareEnabled: true },
      projectTotals: {},
    };
    expect(isCompanyShareEnabledForState()).toBe(true);
  });

  it('returns true via totals.companyShareAmount > 0', async () => {
    const { isCompanyShareEnabledForState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: {}, totals: { companyShareAmount: 50 } };
    expect(isCompanyShareEnabledForState()).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// isTaxEnabledForShare
// ---------------------------------------------------------------------------

describe('isTaxEnabledForShare', () => {
  it('returns false when activeQuoteState is null', async () => {
    const { isTaxEnabledForShare } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = null;
    expect(isTaxEnabledForShare()).toBe(false);
  });

  it('returns true when reservation.applyTax is true', async () => {
    const { isTaxEnabledForShare } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: { applyTax: true }, totals: {} };
    expect(isTaxEnabledForShare()).toBe(true);
  });

  it('returns true when totals.taxAmount > 0', async () => {
    const { isTaxEnabledForShare } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: {}, totals: { taxAmount: 75 } };
    expect(isTaxEnabledForShare()).toBe(true);
  });

  it('returns false when neither applyTax nor taxAmount is set', async () => {
    const { isTaxEnabledForShare } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: {}, totals: {} };
    expect(isTaxEnabledForShare()).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// resolveCompanySharePercentFromState
// ---------------------------------------------------------------------------

describe('resolveCompanySharePercentFromState', () => {
  it('returns null when activeQuoteState is null', async () => {
    const { resolveCompanySharePercentFromState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = null;
    expect(resolveCompanySharePercentFromState()).toBeNull();
  });

  it('returns companySharePercent from reservation', async () => {
    const { resolveCompanySharePercentFromState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = {
      reservation: { companySharePercent: 20 },
      totals: {},
    };
    expect(resolveCompanySharePercentFromState()).toBe(20);
  });

  it('returns null when all sources are zero or absent', async () => {
    const { resolveCompanySharePercentFromState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = { reservation: {}, totals: {} };
    expect(resolveCompanySharePercentFromState()).toBeNull();
  });

  it('falls back to totals.companySharePercent', async () => {
    const { resolveCompanySharePercentFromState } = await import('../../../src/scripts/reservations/pdf/financial.js');
    mockState.activeQuoteState = {
      reservation: {},
      totals: { companySharePercent: 10 },
    };
    expect(resolveCompanySharePercentFromState()).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// getProjectExpensesTotal
// ---------------------------------------------------------------------------

describe('getProjectExpensesTotal', () => {
  it('returns 0 for null/undefined project', async () => {
    const { getProjectExpensesTotal } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(getProjectExpensesTotal(null)).toBe(0);
    expect(getProjectExpensesTotal(undefined)).toBe(0);
  });

  it('sums salePrice values when any expense has salePrice', async () => {
    const { getProjectExpensesTotal } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const project = {
      expenses: [
        { salePrice: 100 },
        { salePrice: 200 },
      ],
    };
    expect(getProjectExpensesTotal(project)).toBe(300);
  });

  it('falls back to servicesClientPrice when expenses have no salePrice', async () => {
    const { getProjectExpensesTotal } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const project = { servicesClientPrice: 500 };
    expect(getProjectExpensesTotal(project)).toBe(500);
  });

  it('uses expensesTotal number property as fallback', async () => {
    const { getProjectExpensesTotal } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const project = { expensesTotal: 750 };
    expect(getProjectExpensesTotal(project)).toBe(750);
  });

  it('sums raw expense.amount values as last resort', async () => {
    const { getProjectExpensesTotal } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const project = {
      expenses: [{ amount: 50 }, { amount: 30 }],
    };
    expect(getProjectExpensesTotal(project)).toBe(80);
  });

  it('returns 0 for project with no expenses or totals', async () => {
    const { getProjectExpensesTotal } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(getProjectExpensesTotal({})).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// calculateProjectDurationDays
// ---------------------------------------------------------------------------

describe('calculateProjectDurationDays', () => {
  it('returns null when project has no start date', async () => {
    const { calculateProjectDurationDays } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(calculateProjectDurationDays({})).toBeNull();
    expect(calculateProjectDurationDays(null)).toBeNull();
  });

  it('returns 1 when project has start but no end date', async () => {
    const { calculateProjectDurationDays } = await import('../../../src/scripts/reservations/pdf/financial.js');
    expect(calculateProjectDurationDays({ start: '2024-01-01' })).toBe(1);
  });

  it('returns calculated days for valid start and end', async () => {
    calculateReservationDaysMock.mockReturnValue(3);
    const { calculateProjectDurationDays } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = calculateProjectDurationDays({ start: '2024-01-01', end: '2024-01-04' });
    expect(result).toBe(3);
  });

  it('returns 1 when calculateReservationDays returns non-finite', async () => {
    calculateReservationDaysMock.mockReturnValue(NaN);
    const { calculateProjectDurationDays } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = calculateProjectDurationDays({ start: '2024-01-01', end: 'invalid' });
    expect(result).toBe(1);
  });

  it('returns 1 when calculateReservationDays returns Infinity', async () => {
    calculateReservationDaysMock.mockReturnValue(Infinity);
    const { calculateProjectDurationDays } = await import('../../../src/scripts/reservations/pdf/financial.js');
    const result = calculateProjectDurationDays({ start: '2024-01-01', end: '2024-12-31' });
    expect(result).toBe(1);
  });
});
