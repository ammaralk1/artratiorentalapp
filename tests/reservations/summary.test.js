import { describe, it, expect, beforeEach, vi } from 'vitest';

const normalizeNumbersMock = vi.fn();
const tMock = vi.fn();
const getSelectedTechniciansMock = vi.fn();
const getEditingTechniciansMock = vi.fn();
const loadDataMock = vi.fn();

vi.mock('../../src/scripts/utils.js', () => ({ normalizeNumbers: normalizeNumbersMock }));
vi.mock('../../src/scripts/language.js', () => ({ t: tMock }));
vi.mock('../../src/scripts/reservationsTechnicians.js', () => ({
  getSelectedTechnicians: getSelectedTechniciansMock,
  getEditingTechnicians: getEditingTechniciansMock
}));
vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));

beforeEach(() => {
  vi.resetModules();
  normalizeNumbersMock.mockReset().mockImplementation((value) => `N(${value})`);
  tMock.mockReset().mockImplementation((key, fallback) => fallback ?? key);
  getSelectedTechniciansMock.mockReset().mockReturnValue([]);
  getEditingTechniciansMock.mockReset().mockReturnValue([]);
  loadDataMock.mockReset().mockReturnValue({ technicians: [] });
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

    // Equipment: 50 * 2 = 100 per day, 2 days -> 200
    // Crew: 100 per day * 2 days -> 200
    // Subtotal = 400
    // Discount 10% -> 360
    // Company share 10% -> 396
    // Tax 15% -> 455.4
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
