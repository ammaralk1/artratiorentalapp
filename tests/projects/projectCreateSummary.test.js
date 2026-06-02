import { describe, expect, it, vi } from 'vitest';

const { refreshReservationsFromApiMock, getReservationsStateMock } = vi.hoisted(() => ({
  refreshReservationsFromApiMock: vi.fn(),
  getReservationsStateMock: vi.fn(() => []),
}));

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: () => ({ projects: [], reservations: [] }),
}));

vi.mock('../../src/scripts/auth.js', () => ({
  userCanManageDestructiveActions: () => true,
  getCurrentUserRole: () => 'admin',
  notifyPermissionDenied: () => {},
}));

vi.mock('../../src/scripts/reservationsService.js', () => ({
  refreshReservationsFromApi: refreshReservationsFromApiMock,
  getReservationsState: getReservationsStateMock,
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: (_key, fallback) => fallback,
}));

vi.mock('../../src/scripts/ui/enhancedSelect.js', () => ({
  refreshEnhancedSelect: () => {},
}));

vi.mock('../../src/scripts/reservationsTechnicians.js', () => ({
  resetSelectedTechnicians: () => {},
  setSelectedTechnicians: () => {},
}));

vi.mock('../../src/scripts/projects/view.js', () => ({
  renderProjects: () => {},
  renderFocusCards: () => {},
  updateSummary: () => {},
}));

vi.mock('../../src/scripts/projects/actions.js', () => ({
  handleProjectReservationSync: () => {},
  removeProject: () => {},
}));

vi.mock('../../src/scripts/projects/equipment.js', () => ({
  renderProjectEquipmentSelection: () => {},
}));

import {
  calculateProjectCreateSummary,
  calculateProjectFinancials,
  refreshProjectManagedReservationState,
} from '../../src/scripts/projects/form.js';
import { state } from '../../src/scripts/projects/state.js';

describe('project create summary', () => {
  it('includes equipment, crew, services, discount, operating overhead, and VAT in the live total', () => {
    const summary = calculateProjectCreateSummary({
      equipment: [{ barcode: 'A1', qty: 2, price: 100, cost: 40 }],
      crewAssignments: [
        { technicianId: '7', positionClientPrice: 300, positionCost: 120 },
      ],
      expenses: [{ amount: 50, salePrice: 90 }],
      servicesClientPrice: 90,
      startDate: '2026-05-20',
      endDate: '2026-05-21',
      discountValue: 10,
      discountType: 'percent',
      applyTax: true,
      companyShareEnabled: true,
      companySharePercent: 10,
    });

    expect(summary.days).toBe(2);
    expect(summary.equipmentQuantity).toBe(2);
    expect(summary.equipmentRevenue).toBe(200);
    expect(summary.equipmentCost).toBe(80);
    expect(summary.crewRevenue).toBe(600);
    expect(summary.crewCost).toBe(240);
    expect(summary.servicesRevenue).toBe(90);
    expect(summary.servicesCost).toBe(50);
    expect(summary.baseSubtotal).toBe(890);
    expect(summary.discountAmount).toBe(97.9);
    expect(summary.clientNetBeforeVat).toBe(881.1);
    expect(summary.companyShareAmount).toBe(88.11);
    expect(summary.overheadAmount).toBe(88.11);
    expect(summary.taxAmount).toBe(132.16);
    expect(summary.totalWithTax).toBe(1013.26);
    expect(summary.internalCost).toBe(370);
    expect(summary.directCostTotal).toBe(370);
    expect(summary.marginBeforeTax).toBeCloseTo(422.99, 2);
    expect(summary.profit).toBeCloseTo(422.99, 2);
  });

  it('multiplies production service cost and sale by optional service days', () => {
    const summary = calculateProjectCreateSummary({
      expenses: [
        { amount: 50, salePrice: 90, days: 2 },
        { amount: 25, salePrice: 40 },
      ],
      servicesClientPrice: 130,
    });

    expect(summary.servicesRevenue).toBe(220);
    expect(summary.servicesCost).toBe(125);
    expect(summary.baseSubtotal).toBe(220);
    expect(summary.internalCost).toBe(125);
  });

  it('applies fixed amount discounts against the overhead-inclusive project total', () => {
    const summary = calculateProjectCreateSummary({
      equipment: [{ barcode: 'A1', qty: 1, price: 10000, cost: 3000 }],
      discountValue: 1000,
      discountType: 'amount',
      applyTax: true,
      companyShareEnabled: true,
      companySharePercent: 10,
    });

    expect(summary.baseSubtotal).toBe(10000);
    expect(summary.discountAmount).toBe(1000);
    expect(summary.clientNetBeforeVat).toBe(10000);
    expect(summary.companyShareAmount).toBe(1000);
    expect(summary.overheadAmount).toBe(1000);
    expect(summary.taxAmount).toBe(1500);
    expect(summary.totalWithTax).toBe(11500);
    expect(summary.marginBeforeTax).toBe(6000);
    expect(summary.profit).toBe(6000);
  });

  it('applies operating overhead per item while excluding overhead and VAT from profit', () => {
    const summary = calculateProjectCreateSummary({
      equipment: [{ barcode: 'EQ1', qty: 1, price: 1000, cost: 0 }],
      crewAssignments: [
        { technicianId: '11', positionClientPrice: 10000, positionCost: 1000 },
      ],
      expenses: [{ amount: 100, salePrice: 1000, days: 1 }],
      servicesClientPrice: 1000,
      startDate: '2026-05-20',
      endDate: '2026-05-20',
      applyTax: true,
      companyShareEnabled: true,
      companySharePercent: 10,
    });

    expect(summary.baseSubtotal).toBe(12000);
    expect(summary.clientSubtotalBeforeDiscount).toBe(13200);
    expect(summary.companyShareAmount).toBe(1320);
    expect(summary.overheadAmount).toBe(1320);
    expect(summary.taxAmount).toBe(1980);
    expect(summary.totalWithTax).toBe(15180);
    expect(summary.internalCost).toBe(1100);
    expect(summary.marginBeforeTax).toBe(10780);
  });

  it('matches PRJ-0084 internal financial logic after discount and overhead allocation', () => {
    const summary = calculateProjectCreateSummary({
      equipment: [{ barcode: 'EQ84', qty: 1, price: 1000, cost: 100 }],
      crewAssignments: [
        { technicianId: '11', positionClientPrice: 1000, positionCost: 100 },
      ],
      expenses: [{ amount: 100, salePrice: 1000, days: 1 }],
      startDate: '2026-05-30',
      endDate: '2026-05-30',
      discountValue: 10,
      discountType: 'percent',
      applyTax: true,
      companyShareEnabled: true,
      companySharePercent: 10,
    });

    expect(summary.baseSubtotal).toBe(3000);
    expect(summary.clientSubtotalBeforeDiscount).toBe(3300);
    expect(summary.discountAmount).toBe(330);
    expect(summary.clientNetBeforeVat).toBe(2970);
    expect(summary.taxableAmount).toBe(2970);
    expect(summary.companyShareAmount).toBe(297);
    expect(summary.overheadAmount).toBe(297);
    expect(summary.directCostTotal).toBe(300);
    expect(summary.profit).toBe(2373);
    expect(summary.marginBeforeTax).toBe(2373);
    expect(summary.taxAmount).toBe(445.5);
    expect(summary.totalWithTax).toBe(3415.5);
  });

  it('keeps legacy financial calls compatible when crew is omitted', () => {
    const finance = calculateProjectFinancials({
      equipmentEstimate: 100,
      servicesClientPrice: 50,
      discountValue: 0,
      applyTax: false,
    });

    expect(finance.baseSubtotal).toBe(150);
    expect(finance.totalWithTax).toBe(150);
  });

  it('refreshes linked operational reservations after project managed reservation sync', async () => {
    const syncedReservation = {
      id: '200',
      projectId: '99',
      customerId: '15',
      crewAssignments: [{ technicianId: '7', positionName: 'DOP' }],
    };
    refreshReservationsFromApiMock.mockResolvedValueOnce([syncedReservation]);
    getReservationsStateMock.mockReturnValueOnce([syncedReservation]);

    const result = await refreshProjectManagedReservationState();

    expect(refreshReservationsFromApiMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([syncedReservation]);
    expect(state.reservations).toEqual([syncedReservation]);
  });
});
