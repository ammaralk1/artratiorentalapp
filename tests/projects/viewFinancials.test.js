import { describe, expect, it, vi } from 'vitest';

vi.mock('../../src/scripts/auth.js', () => ({
  userCanManageDestructiveActions: () => true,
  checkAuth: () => true,
  logout: () => {},
  AUTH_EVENTS: {
    USER_UPDATED: 'auth:user-updated',
  },
}));

import {
  resolveProjectCommercialDisplayTotals,
  resolveProjectReservationCrewCount,
  resolveReservationNetTotal,
  resolveProjectTotals,
} from '../../src/scripts/projects/view.js';

describe('projects/view commercial display totals', () => {
  it('treats linked reservations as part of the project total and cost surface', () => {
    const project = {
      id: '69',
      equipmentEstimate: 0,
      expensesTotal: 0,
      totalWithTax: 0,
      applyTax: true,
    };

    const reservation = {
      id: '215',
      projectId: '69',
      total_amount: 15120,
      start: '2026-03-31 10:00:00',
      end: '2026-03-31 17:00:00',
      items: [],
      crewAssignments: [
        {
          technicianId: '1',
          positionCost: 6100,
          positionClientPrice: 11200,
        },
      ],
    };

    const totals = resolveProjectCommercialDisplayTotals(project, [reservation]);

    expect(totals.displayTotalWithTax).toBe(15120);
    expect(totals.displayExpensesTotal).toBe(6100);
    expect(totals.reservationRevenue).toBe(15120);
    expect(totals.reservationCostTotal).toBe(6100);
  });

  it('preserves direct project totals when there are no linked reservations', () => {
    const project = {
      id: '71',
      expensesTotal: 200,
      totalWithTax: 4000,
      applyTax: false,
    };

    const totals = resolveProjectCommercialDisplayTotals(project, []);

    expect(totals.displayTotalWithTax).toBe(4000);
    expect(totals.displayExpensesTotal).toBe(200);
    expect(totals.reservationRevenue).toBe(0);
    expect(totals.reservationCostTotal).toBe(0);
  });

  it('keeps old projects overhead-inclusive when a share percent exists without a saved VAT flag', () => {
    const project = {
      id: 'legacy-overhead',
      equipmentEstimate: 1000,
      expensesTotal: 0,
      servicesClientPrice: 0,
      applyTax: false,
      companySharePercent: 10,
      companyShareAmount: 100,
      discount: 0,
      discountType: 'percent',
    };

    const baseTotals = resolveProjectTotals(project);
    const displayTotals = resolveProjectCommercialDisplayTotals(project, []);

    expect(baseTotals.applyTax).toBe(true);
    expect(baseTotals.companyShareAmount).toBeCloseTo(110, 2);
    expect(baseTotals.totalWithTax).toBe(1265);
    expect(displayTotals.displayTotalWithTax).toBe(1265);
  });

  it('uses client net before VAT and reservation equipment costs for project financial display', () => {
    const project = {
      id: '84',
      equipmentEstimate: 1000,
      expensesTotal: 100,
      servicesClientPrice: 1000,
      applyTax: true,
      companyShareEnabled: true,
      companySharePercent: 10,
      discount: 10,
      discountType: 'percent',
    };

    const reservation = {
      id: '231',
      projectId: '84',
      total_amount: 3415.5,
      start: '2026-05-30 09:00:00',
      end: '2026-05-30 21:00:00',
      items: [
        { equipmentId: '6818', quantity: 1, unit_price: 1000, unit_cost: 100 },
      ],
      crewAssignments: [
        { technicianId: '11', positionClientPrice: 1000, positionCost: 100 },
      ],
    };

    const totals = resolveProjectCommercialDisplayTotals(project, [reservation]);

    expect(totals.clientNetBeforeVat).toBe(2970);
    expect(totals.subtotalAfterDiscount).toBe(2970);
    expect(totals.companyShareAmount).toBe(297);
    expect(totals.taxAmount).toBe(445.5);
    expect(totals.totalWithTax).toBe(3415.5);
    expect(totals.marginBeforeTax).toBe(2373);
    expect(totals.reservationCostTotal).toBe(200);
    expect(totals.displayExpensesTotal).toBe(300);
  });

  it('does not double count stored project totals when linked reservations own the revenue', () => {
    const project = {
      id: '72',
      totalWithTax: 4000,
      expensesTotal: 200,
      applyTax: false,
    };

    const reservation = {
      id: '300',
      projectId: '72',
      total_amount: 1500,
      items: [],
    };

    const totals = resolveProjectCommercialDisplayTotals(project, [reservation]);

    expect(totals.displayTotalWithTax).toBe(1500);
    expect(totals.displayExpensesTotal).toBe(200);
    expect(totals.reservationRevenue).toBe(1500);
  });

  it('does not add direct equipment estimate again when a managed reservation is linked', () => {
    const project = {
      id: '82',
      equipmentEstimate: 1000,
      expensesTotal: 0,
      totalWithTax: 1900,
      applyTax: false,
    };

    const reservation = {
      id: '228',
      projectId: '82',
      total_amount: 1900,
      items: [
        { equipmentId: '7135', quantity: 1, unit_price: 1000, unit_cost: 250 },
      ],
      crewAssignments: [
        { technicianId: '10', positionClientPrice: 900, positionCost: 400 },
      ],
    };

    const totals = resolveProjectCommercialDisplayTotals(project, [reservation]);

    expect(totals.displayTotalWithTax).toBe(1900);
    expect(totals.displayExpensesTotal).toBe(650);
  });

  it('counts synced reservation crew details when crewAssignments is not present', () => {
    const reservation = {
      id: '301',
      techniciansDetails: [
        { technicianId: '10', name: 'Mahmoud', positionClientPrice: 900, positionCost: 400 },
      ],
      technicians: [],
      items: [],
      applyTax: false,
    };

    expect(resolveProjectReservationCrewCount(reservation)).toBe(1);
    expect(resolveReservationNetTotal(reservation)).toBe(900);
  });
});
