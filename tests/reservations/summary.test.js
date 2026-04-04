import { describe, it, expect, beforeEach, vi } from 'vitest';

const normalizeNumbersMock = vi.fn();
const tMock = vi.fn();
const getSelectedTechniciansMock = vi.fn();
const getEditingTechniciansMock = vi.fn();
const getSelectedCrewAssignmentsMock = vi.fn();
const getEditingCrewAssignmentsMock = vi.fn();
const loadDataMock = vi.fn();

// Mocks for reservationsShared (needed by calculateDraftFinancialBreakdown)
const buildReservationDisplayGroupsMock = vi.fn();
const computePackagePricingMock = vi.fn();
const sanitizePriceValueMock = vi.fn();
const parsePriceValueMock = vi.fn();

vi.mock('../../src/scripts/utils.js', () => ({ normalizeNumbers: normalizeNumbersMock }));
vi.mock('../../src/scripts/language.js', () => ({ t: tMock, getCurrentLanguage: () => 'ar' }));
vi.mock('../../src/scripts/reservationsTechnicians.js', () => ({
  getSelectedTechnicians: getSelectedTechniciansMock,
  getEditingTechnicians: getEditingTechniciansMock,
  getSelectedCrewAssignments: getSelectedCrewAssignmentsMock,
  getEditingCrewAssignments: getEditingCrewAssignmentsMock,
}));
vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/reservationsShared.js', () => ({
  buildReservationDisplayGroups: buildReservationDisplayGroupsMock,
  computePackagePricing: computePackagePricingMock,
  sanitizePriceValue: sanitizePriceValueMock,
  parsePriceValue: parsePriceValueMock,
}));

beforeEach(() => {
  vi.resetModules();
  normalizeNumbersMock.mockReset().mockImplementation((value) => `N(${value})`);
  tMock.mockReset().mockImplementation((key, fallback) => fallback ?? key);
  getSelectedTechniciansMock.mockReset().mockReturnValue([]);
  getEditingTechniciansMock.mockReset().mockReturnValue([]);
  getSelectedCrewAssignmentsMock.mockReset().mockReturnValue([]);
  getEditingCrewAssignmentsMock.mockReset().mockReturnValue([]);
  loadDataMock.mockReset().mockReturnValue({ technicians: [] });
  // Default shared mock implementations
  buildReservationDisplayGroupsMock.mockReset().mockReturnValue({ groups: [] });
  computePackagePricingMock.mockReset().mockReturnValue({ total: 0, costTotal: 0 });
  // sanitizePriceValue: round to 2 decimals, clamp negatives to 0
  sanitizePriceValueMock.mockReset().mockImplementation((v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return 0;
    return Number(n.toFixed(2));
  });
  // parsePriceValue: parse numeric values
  parsePriceValueMock.mockReset().mockImplementation((v) => {
    if (v == null || v === '') return Number.NaN;
    const n = Number(v);
    return Number.isFinite(n) ? n : Number.NaN;
  });
});

describe('reservationsSummary', () => {
  it('calculateReservationDays handles invalid input', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays(null, null)).toBe(1);
    expect(calculateReservationDays('2024-01-01', 'invalid')).toBe(1);
    expect(calculateReservationDays('2024-01-02T00:00:00Z', '2024-01-01T00:00:00Z')).toBe(1);
    expect(calculateReservationDays('2024-01-01T00:00:00Z', '2024-01-03T00:00:00Z')).toBe(2);
  });

  it('calculateReservationTotal sums equipment and crew with discount/tax', async () => {
    // Equipment: qty=2, unitPrice=50 per day, 2 days → 200
    // Crew: 100/day * 2 days → 200, Subtotal=400
    // Discount 10% → 360, Company share 10% → 396, Tax 15% → 455.4
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 2, unitPrice: 50, unitCost: 0, items: [{ price: 50, qty: 2 }] }],
    });
    const { calculateReservationTotal } = await import('../../src/scripts/reservationsSummary.js');
    loadDataMock.mockReturnValue({ technicians: [{ id: 't1', dailyWage: 100 }] });

    const total = calculateReservationTotal(
      [{ price: 50, qty: 2 }],
      10,
      'percent',
      true,
      ['t1'],
      { start: '2024-02-01T00:00:00Z', end: '2024-02-03T00:00:00Z' }
    );

    expect(total).toBeCloseTo(455.4, 2);
  });

  it('buildSummaryHtml constructs localized summary', async () => {
    const { buildSummaryHtml } = await import('../../src/scripts/reservationsSummary.js');
    const html = buildSummaryHtml({
      total: 500,
      itemsCount: 3,
      rentalDays: 5,
      techniciansCount: 2,
      applyTax: true,
      paidStatus: 'paid'
    });

    expect(html).toContain('N(500)');
    expect(html).toContain('N(3)');
    expect(html).toContain('N(5)');
    expect(html).toContain('N(2)');
    expect(html).toContain('🧾 الضريبة');
    expect(html).toContain('شامل 15%');
    expect(html).toContain('مدفوع');
  });

  it('renderDraftSummary updates DOM with selected technicians', async () => {
    const { renderDraftSummary } = await import('../../src/scripts/reservationsSummary.js');
    getSelectedTechniciansMock.mockReturnValue(['t1', 't2']);
    loadDataMock.mockReturnValue({ technicians: [{ id: 't1', dailyWage: 50 }, { id: 't2', dailyWage: 75 }] });

    const preview = document.createElement('div');
    preview.id = 'reservation-preview';
    document.body.appendChild(preview);

    renderDraftSummary({
      selectedItems: [{ price: 100, qty: 1 }],
      discount: 0,
      discountType: 'percent',
      applyTax: false,
      paidStatus: 'unpaid',
      start: '2024-05-01T00:00:00Z',
      end: '2024-05-02T00:00:00Z'
    });

    expect(preview.innerHTML).toContain('N(1)');
    expect(preview.innerHTML).toContain('N(2)');
  });

  it('renderEditSummary returns HTML with edit-specific key', async () => {
    const { renderEditSummary } = await import('../../src/scripts/reservationsSummary.js');
    getEditingTechniciansMock.mockReturnValue(['t1']);
    loadDataMock.mockReturnValue({ technicians: [{ id: 't1', dailyWage: 60 }] });

    const html = renderEditSummary({
      items: [{ price: 80, qty: 2 }],
      discount: 20,
      discountType: 'amount',
      applyTax: false,
      paidStatus: 'paid',
      start: '2024-06-01T00:00:00Z',
      end: '2024-06-03T00:00:00Z'
    });

    expect(html).toContain('N(2)');
    expect(tMock).toHaveBeenCalledWith('reservations.summary.totalLabelAfterEdit', expect.any(String));
  });
});

// ─── calculateReservationDays ─────────────────────────────────────────────────

describe('calculateReservationDays', () => {
  it('returns 2 for a valid 2-day range', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('2024-01-01T00:00:00Z', '2024-01-03T00:00:00Z')).toBe(2);
  });

  it('returns 1 for a single-day range (same start and end)', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    // Same timestamp → diffMs = 0 → falls into <= 0 branch → 1
    expect(calculateReservationDays('2024-03-15T00:00:00Z', '2024-03-15T00:00:00Z')).toBe(1);
  });

  it('returns 1 when start is after end', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('2024-06-10T00:00:00Z', '2024-06-05T00:00:00Z')).toBe(1);
  });

  it('returns 1 when start is null', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays(null, '2024-01-03T00:00:00Z')).toBe(1);
  });

  it('returns 1 when end is null', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('2024-01-01T00:00:00Z', null)).toBe(1);
  });

  it('returns 1 when both arguments are empty strings', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('', '')).toBe(1);
  });

  it('returns 1 when start is an invalid date string', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('not-a-date', '2024-01-03T00:00:00Z')).toBe(1);
  });

  it('returns 1 when end is an invalid date string', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('2024-01-01T00:00:00Z', 'not-a-date')).toBe(1);
  });

  it('returns 7 for a weekly range', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    expect(calculateReservationDays('2024-01-01T00:00:00Z', '2024-01-08T00:00:00Z')).toBe(7);
  });

  it('ceils fractional days (partial day counts as full day)', async () => {
    const { calculateReservationDays } = await import('../../src/scripts/reservationsSummary.js');
    // 1.5 days → ceil → 2
    expect(calculateReservationDays('2024-01-01T00:00:00Z', '2024-01-02T12:00:00Z')).toBe(2);
  });
});

// ─── calculatePaymentProgress ─────────────────────────────────────────────────

describe('calculatePaymentProgress', () => {
  it('returns zeros for empty/default input', async () => {
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({});
    expect(result.paidAmount).toBe(0);
    expect(result.paidPercent).toBe(0);
  });

  it('progressType percent with progressValue 50 and totalAmount 1000 → paidAmount 500', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      progressType: 'percent',
      progressValue: 50,
    });
    expect(result.paidAmount).toBe(500);
    expect(result.paidPercent).toBe(50);
  });

  it('progressType amount with progressValue 300 and totalAmount 1000 → paidAmount 300', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      progressType: 'amount',
      progressValue: 300,
    });
    expect(result.paidAmount).toBe(300);
    expect(result.paidPercent).toBeCloseTo(30, 1);
  });

  it('null progressValue falls back to 0', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      progressType: 'percent',
      progressValue: null,
    });
    expect(result.paidAmount).toBe(0);
    expect(result.paidPercent).toBe(0);
  });

  it('history entries with type amount are summed into paidAmount', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      history: [
        { type: 'amount', amount: 200 },
        { type: 'amount', amount: 150 },
      ],
    });
    expect(result.paidAmount).toBe(350);
  });

  it('history entries with type percent are converted to amount', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      history: [
        { type: 'percent', percentage: 25 },
      ],
    });
    expect(result.paidAmount).toBe(250);
    expect(result.paidPercent).toBe(25);
  });

  it('paidAmount is clamped to totalAmount (never exceeds total)', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 500,
      progressType: 'amount',
      progressValue: 700,
    });
    expect(result.paidAmount).toBe(500);
  });

  it('paidPercent is clamped to 100', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      progressType: 'percent',
      progressValue: 150,
    });
    expect(result.paidPercent).toBe(100);
  });

  it('returns shape with paidAmount, paidPercent, paymentProgressType, paymentProgressValue', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({ totalAmount: 200, progressType: 'amount', progressValue: 100 });
    expect(result).toHaveProperty('paidAmount');
    expect(result).toHaveProperty('paidPercent');
    expect(result).toHaveProperty('paymentProgressType');
    expect(result).toHaveProperty('paymentProgressValue');
  });

  it('multiple history amount entries accumulate correctly', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({
      totalAmount: 1000,
      history: [
        { type: 'amount', amount: 100 },
        { type: 'amount', amount: 100 },
        { type: 'amount', amount: 100 },
      ],
    });
    expect(result.paidAmount).toBe(300);
    expect(result.paidPercent).toBeCloseTo(30, 1);
  });

  it('empty history array produces 0 paid', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { calculatePaymentProgress } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculatePaymentProgress({ totalAmount: 500, history: [] });
    expect(result.paidAmount).toBe(0);
    expect(result.paidPercent).toBe(0);
  });
});

// ─── determinePaymentStatus ───────────────────────────────────────────────────

describe('determinePaymentStatus', () => {
  it('returns paid when manualStatus is "paid"', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'paid', paidAmount: 0, paidPercent: 0, totalAmount: 100 });
    expect(status).toBe('paid');
  });

  it('returns paid when paidPercent is 100', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'unpaid', paidAmount: 0, paidPercent: 100, totalAmount: 100 });
    expect(status).toBe('paid');
  });

  it('returns paid when paidAmount >= totalAmount', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'unpaid', paidAmount: 100, paidPercent: 0, totalAmount: 100 });
    expect(status).toBe('paid');
  });

  it('returns partial when paidPercent is between 1 and 99', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'unpaid', paidAmount: 50, paidPercent: 50, totalAmount: 100 });
    expect(status).toBe('partial');
  });

  it('returns unpaid when paidAmount and paidPercent are both 0', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'unpaid', paidAmount: 0, paidPercent: 0, totalAmount: 100 });
    expect(status).toBe('unpaid');
  });

  it('manualStatus "paid" overrides zero paidAmount → still returns paid', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    // The source normalizes "paid" and short-circuits → 'paid'
    const status = determinePaymentStatus({ manualStatus: 'paid', paidAmount: 0, paidPercent: 0, totalAmount: 500 });
    expect(status).toBe('paid');
  });

  it('manualStatus "partial" returns partial even when paidAmount is 0', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'partial', paidAmount: 0, paidPercent: 0, totalAmount: 500 });
    expect(status).toBe('partial');
  });

  it('accepts Arabic "مدفوع" as paid manualStatus', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'مدفوع', paidAmount: 0, paidPercent: 0, totalAmount: 100 });
    expect(status).toBe('paid');
  });

  it('accepts Arabic "مدفوع جزئياً" as partial manualStatus', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus({ manualStatus: 'مدفوع جزئياً', paidAmount: 0, paidPercent: 0, totalAmount: 100 });
    expect(status).toBe('partial');
  });

  it('defaults to unpaid when no arguments given', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    const status = determinePaymentStatus();
    expect(status).toBe('unpaid');
  });

  it('returns paid when paidAmount just meets total within tolerance', async () => {
    normalizeNumbersMock.mockImplementation((v) => String(v));
    const { determinePaymentStatus } = await import('../../src/scripts/reservationsSummary.js');
    // tolerance is 0.01 → 99.995 >= 100 - 0.01
    const status = determinePaymentStatus({ manualStatus: 'unpaid', paidAmount: 99.995, paidPercent: 0, totalAmount: 100 });
    expect(status).toBe('paid');
  });
});

// ─── calculateDraftFinancialBreakdown ─────────────────────────────────────────

describe('calculateDraftFinancialBreakdown', () => {
  it('empty items → equipmentTotal: 0', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({ groups: [] });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({ items: [] });
    expect(result.equipmentTotal).toBe(0);
  });

  it('returns all expected keys in the result shape', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({ groups: [] });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({});
    expect(result).toHaveProperty('rentalDays');
    expect(result).toHaveProperty('equipmentTotal');
    expect(result).toHaveProperty('equipmentCostTotal');
    expect(result).toHaveProperty('crewTotal');
    expect(result).toHaveProperty('crewCostTotal');
    expect(result).toHaveProperty('discountAmount');
    expect(result).toHaveProperty('subtotalAfterDiscount');
    expect(result).toHaveProperty('taxableAmount');
    expect(result).toHaveProperty('taxAmount');
    expect(result).toHaveProperty('finalTotal');
    expect(result).toHaveProperty('companySharePercent');
    expect(result).toHaveProperty('companyShareAmount');
    expect(result).toHaveProperty('netProfit');
  });

  it('single item group with unitPrice 100, quantity 1, 1 day → equipmentTotal 100', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 100, unitCost: 0, items: [{ price: 100 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({ items: [{ price: 100, qty: 1 }] });
    expect(result.equipmentTotal).toBe(100);
  });

  it('single item group, 2 rental days → equipmentTotal doubles', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 100, unitCost: 0, items: [{ price: 100 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 100, qty: 1 }],
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-03T00:00:00Z',
    });
    expect(result.equipmentTotal).toBe(200);
    expect(result.rentalDays).toBe(2);
  });

  it('discount type percent reduces the total correctly', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 200, unitCost: 0, items: [{ price: 200 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 200, qty: 1 }],
      discount: 10,
      discountType: 'percent',
    });
    expect(result.discountAmount).toBe(20);
    expect(result.subtotalAfterDiscount).toBe(180);
  });

  it('discount type amount deducts flat amount', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 200, unitCost: 0, items: [{ price: 200 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 200, qty: 1 }],
      discount: 50,
      discountType: 'amount',
    });
    expect(result.discountAmount).toBe(50);
    expect(result.subtotalAfterDiscount).toBe(150);
  });

  it('applyTax: true → taxAmount is 15% of taxableAmount', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 100, unitCost: 0, items: [{ price: 100 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 100, qty: 1 }],
      applyTax: true,
    });
    expect(result.taxAmount).toBeGreaterThan(0);
    // taxableAmount = subtotalAfterDiscount + companyShareAmount
    expect(result.taxAmount).toBeCloseTo(result.taxableAmount * 0.15, 2);
  });

  it('applyTax: false → taxAmount is 0', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 100, unitCost: 0, items: [{ price: 100 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 100, qty: 1 }],
      applyTax: false,
    });
    expect(result.taxAmount).toBe(0);
  });

  it('companySharePercent set → companyShareAmount > 0', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 200, unitCost: 0, items: [{ price: 200 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 200, qty: 1 }],
      companySharePercent: 10,
    });
    expect(result.companyShareAmount).toBeGreaterThan(0);
    expect(result.companyShareAmount).toBeCloseTo(20, 1); // 10% of 200
  });

  it('companySharePercent null → companyShareAmount is 0', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 200, unitCost: 0, items: [{ price: 200 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 200, qty: 1 }],
      companySharePercent: null,
    });
    expect(result.companyShareAmount).toBe(0);
  });

  it('crewAssignments contribute to crewTotal', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({ groups: [] });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const assignments = [
      { technicianId: 't1', positionCost: 50, positionClientPrice: 100 },
    ];
    const result = calculateDraftFinancialBreakdown({
      items: [],
      crewAssignments: assignments,
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-02T00:00:00Z',
    });
    expect(result.crewTotal).toBe(100); // 100/day * 1 day
    expect(result.crewCostTotal).toBe(50); // 50/day * 1 day
  });

  it('discount cannot exceed the discountBase (clamped)', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({
      groups: [{ type: 'equipment', quantity: 1, unitPrice: 100, unitCost: 0, items: [{ price: 100 }] }],
    });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [{ price: 100, qty: 1 }],
      discount: 9999,
      discountType: 'amount',
    });
    expect(result.discountAmount).toBe(100); // clamped to base
    expect(result.subtotalAfterDiscount).toBe(0);
    expect(result.finalTotal).toBe(0);
  });

  it('finalTotal is always >= 0', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({ groups: [] });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({
      items: [],
      discount: 999,
      discountType: 'amount',
    });
    expect(result.finalTotal).toBeGreaterThanOrEqual(0);
  });

  it('rentalDays defaults to 1 when start/end are null', async () => {
    buildReservationDisplayGroupsMock.mockReturnValue({ groups: [] });
    const { calculateDraftFinancialBreakdown } = await import('../../src/scripts/reservationsSummary.js');
    const result = calculateDraftFinancialBreakdown({ items: [] });
    expect(result.rentalDays).toBe(1);
  });
});
