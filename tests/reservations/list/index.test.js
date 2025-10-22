import { describe, it, expect, beforeEach, vi } from 'vitest';

const normalizeTextMock = vi.fn();
const isReservationCompletedMock = vi.fn();
const tMock = vi.fn();
const normalizeNumbersMock = vi.fn();
const formatDateTimeMock = vi.fn();
const loadDataMock = vi.fn();
const resolveItemImageMock = vi.fn();
const calculateReservationDaysMock = vi.fn();
const calculateDraftFinancialBreakdownMock = vi.fn();

vi.mock('../../../src/scripts/reservationsShared.js', async () => {
  const actual = await vi.importActual('../../../src/scripts/reservationsShared.js');
  return {
    ...actual,
    normalizeText: normalizeTextMock,
    isReservationCompleted: isReservationCompletedMock
  };
});

vi.mock('../../../src/scripts/language.js', () => ({
  t: tMock
}));

vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: normalizeNumbersMock,
  formatDateTime: formatDateTimeMock
}));

vi.mock('../../../src/scripts/storage.js', () => ({
  loadData: loadDataMock
}));

vi.mock('../../../src/scripts/reservationsEquipment.js', () => ({
  resolveItemImage: resolveItemImageMock
}));

vi.mock('../../../src/scripts/reservationsSummary.js', () => ({
  calculateReservationDays: calculateReservationDaysMock,
  calculateDraftFinancialBreakdown: calculateDraftFinancialBreakdownMock,
}));

describe('reservations/list helpers', () => {
  beforeEach(() => {
    vi.resetModules();
    normalizeTextMock.mockImplementation((value) => String(value || '').toLowerCase());
    isReservationCompletedMock.mockImplementation((reservation) => reservation.done === true);
    tMock.mockImplementation((key, fallback) => fallback ?? key);
    normalizeNumbersMock.mockImplementation((value) => `N(${value})`);
    formatDateTimeMock.mockImplementation((value) => `FMT(${value})`);
    loadDataMock.mockReturnValue({ technicians: [] });
    resolveItemImageMock.mockImplementation(() => 'img.png');
    calculateReservationDaysMock.mockReturnValue(2);
    calculateDraftFinancialBreakdownMock.mockReset().mockReturnValue({
      rentalDays: 2,
      equipmentTotal: 300,
      crewTotal: 0,
      crewCostTotal: 0,
      discountAmount: 30,
      subtotalAfterDiscount: 270,
      taxableAmount: 310.5,
      taxAmount: 40.5,
      finalTotal: 310.5,
      companySharePercent: 0,
      companyShareAmount: 0,
      netProfit: 280,
    });
  });

  it('filterReservationEntries applies filters and sorting', async () => {
    const { filterReservationEntries } = await import('../../../src/scripts/reservations/list/index.js');

    const reservations = [
      { id: 10, reservationId: 'RSV-10', customerId: 1, technicians: ['t1'], confirmed: true, createdAt: '2024-04-02T07:00:00Z', start: '2024-04-02T08:00:00Z', items: [{ barcode: 'A1', desc: 'Camera' }], notes: 'Outdoor shoot', projectId: 1 },
      { id: 2, reservationId: 'RSV-2', customerId: 2, technicians: ['t2'], confirmed: false, createdAt: '2024-04-03T09:00:00Z', start: '2024-05-01T10:00:00Z', items: [{ barcode: 'B1', desc: 'Lights' }], notes: 'Studio', projectId: 2 },
      { id: 33, reservationId: 'RSV-30', customerId: 1, technicians: ['t1', 't3'], confirmed: true, createdAt: '2024-04-01T12:00:00Z', start: '2024-06-05T13:00:00Z', items: [{ barcode: 'C1', desc: 'Drone' }], notes: 'Event', projectId: 3, done: true }
    ];

    const customersMap = new Map([
      ['1', { id: 1, customerName: 'Alice' }],
      ['2', { id: 2, customerName: 'Bob' }]
    ]);

    const techniciansMap = new Map([
      ['t1', { id: 't1', name: 'Lead Tech' }],
      ['t2', { id: 't2', name: 'Assistant' }],
      ['t3', { id: 't3', name: 'Support' }]
    ]);

    const projectsMap = new Map([
      ['1', { id: 1, title: 'Project Alpha', status: 'pending' }],
      ['3', { id: 3, title: 'Project Gamma', status: 'confirmed' }]
    ]);

    const filters = {
      searchTerm: 'drone',
      status: 'confirmed',
      technicianId: 't3',
      startDate: '2024-06-01',
      endDate: '2024-06-10'
    };

    const result = filterReservationEntries({ reservations, filters, customersMap, techniciansMap, projectsMap });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ reservation: { id: 33 }, index: 2 });

    const sorted = filterReservationEntries({ reservations, filters: {}, customersMap, techniciansMap, projectsMap });
    expect(sorted.map((entry) => entry.reservation.reservationId)).toEqual(['RSV-30', 'RSV-10', 'RSV-2']);
  });

  it('buildReservationTilesHtml reflects reservation state and formatting', async () => {
    const { buildReservationTilesHtml } = await import('../../../src/scripts/reservations/list/index.js');

    const entries = [
      { reservation: { reservationId: 'RSV10', customerId: 1, technicians: ['t1'], items: [{}, {}], notes: 'Pay later', start: '2024-04-01T12:00:00Z', end: '2024-04-02T12:00:00Z', cost: 2500, applyTax: true }, index: 5 },
      { reservation: { reservationId: 'RSV11', customerId: 2, technicians: ['t2'], confirmed: true, paid: true, items: [], notes: '', start: '2024-04-05T09:00:00Z', end: '2024-04-05T18:00:00Z', cost: 1000, done: true, projectId: 99 }, index: 7 }
    ];

    const customersMap = new Map([
      ['1', { customerName: 'Alice' }],
      ['2', { customerName: 'Bob' }]
    ]);

    const techniciansMap = new Map([
      ['t1', { name: 'Lead' }],
      ['t2', { name: 'Assist' }]
    ]);

    const projectsMap = new Map();

    const html = buildReservationTilesHtml({ entries, customersMap, techniciansMap, projectsMap });

    expect(html).toContain('data-reservation-index="5" data-action="confirm"');
    expect(html).not.toContain('data-reservation-index="7" data-action="confirm"');
    expect(html).toContain('tile-completed');
    expect(formatDateTimeMock).toHaveBeenCalledWith('2024-04-01T12:00:00Z');
  });

  it('buildReservationDetailsHtml composes detailed view with project link', async () => {
    loadDataMock.mockReturnValue({ technicians: [{ id: 't1', name: 'Lead', wage: 200 }] });
    const { buildReservationDetailsHtml } = await import('../../../src/scripts/reservations/list/index.js');

    const reservation = {
      reservationId: 'RSV99',
      customerId: 1,
      technicians: ['t1'],
      items: [{ barcode: 'X1', qty: 2, price: 150 }],
      notes: 'Important client',
      start: '2024-07-01T10:00:00Z',
      end: '2024-07-03T18:00:00Z',
      discount: '10',
      discountType: 'percent',
      applyTax: true,
      projectId: 55
    };

    const customer = { customerName: 'Client', phone: '555-123' };
    const techniciansList = [{ id: 't1', name: 'Lead', phone: '123', role: 'Cinematographer' }];
    const project = { id: 55, title: 'Big Project' };

    const html = buildReservationDetailsHtml(reservation, customer, techniciansList, 0, project);

    expect(html).toContain('data-action="open-project"');
    expect(html).toContain('reservation-modal-actions');
    expect(html).toContain('summary-details-row');
    expect(normalizeNumbersMock).toHaveBeenCalled();
    expect(resolveItemImageMock).toHaveBeenCalled();
  });
});
