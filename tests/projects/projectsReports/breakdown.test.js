import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/scripts/reservationsSummary.js', () => ({
  calculateDraftFinancialBreakdown: vi.fn(({ items = [] }) => {
    const source = items[0] || {};
    return {
      equipmentTotal: Number(source.equipmentTotal || 0),
      equipmentCostTotal: Number(source.equipmentCostTotal || 0),
      crewTotal: Number(source.crewTotal || 0),
      crewCostTotal: Number(source.crewCostTotal || 0),
    };
  }),
}));

vi.mock('../../../src/scripts/projectsReports/financials.ts', () => ({
  getProjectExpenses: vi.fn((project) => Number(project.expensesTotal || 0)),
  getProjectServicesRevenue: vi.fn((project) => Number(project.servicesClientPrice || 0)),
  getReservationsForProject: vi.fn((reservations, projectId) => (
    Array.isArray(reservations)
      ? reservations.filter((reservation) => String(reservation.projectId ?? reservation.project_id ?? '') === String(projectId))
      : []
  )),
}));

import {
  aggregateReservationDraftTotals,
  computeProjectCommercialTotals,
  computeProjectsRevenueBreakdown,
  resolveProjectPaidAmount,
} from '../../../src/scripts/projectsReports/breakdown.ts';

describe('projectsReports/breakdown', () => {
  it('aggregates reservation equipment and crew totals from draft financial breakdowns', () => {
    const totals = aggregateReservationDraftTotals([
      {
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 300, crewTotal: 400, crewCostTotal: 150 }],
        technicians: [1],
      },
      {
        items: [{ equipmentTotal: 500, equipmentCostTotal: 125, crewTotal: 200, crewCostTotal: 50 }],
        crewAssignments: [{ id: 9 }],
      },
    ]);

    expect(totals).toEqual({
      equipment: 1500,
      equipmentCost: 425,
      crew: 600,
      crewCost: 200,
    });
  });

  it('computes shared project commercial totals with discount, share, and tax rules', () => {
    const summary = computeProjectCommercialTotals({
      servicesClientPrice: 300,
      expensesTotal: 90,
      discount: 10,
      raw: {
        discount_type: 'percent',
        company_share_enabled: true,
        company_share_percent: 5,
      },
    }, [
      {
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 250, crewTotal: 400, crewCostTotal: 100 }],
      },
    ], 0.15);

    expect(summary.agg.equipment).toBe(1000);
    expect(summary.agg.crew).toBe(400);
    expect(summary.discountAmount).toBe(170);
    expect(summary.baseAfterDiscount).toBe(1530);
    expect(summary.companyShareAmount).toBe(76.5);
    expect(summary.taxAmount).toBeCloseTo(240.97, 2);
    expect(summary.finalTotal).toBeCloseTo(1847.47, 2);
    expect(summary.applyTax).toBe(true);
    expect(summary.sharePercent).toBe(5);
  });

  it('resolves paid amounts from history and caps them to the project final total', () => {
    expect(resolveProjectPaidAmount({
      raw: {
        paymentHistory: [
          { type: 'amount', value: 300 },
          { type: 'percent', value: 50 },
        ],
      },
    }, 1000)).toBe(800);

    expect(resolveProjectPaidAmount({
      raw: { paid_percentage: 200 },
    }, 900)).toBe(900);
  });

  it('computes revenue breakdown totals across projects using linked reservations', () => {
    const projects = [
      {
        id: 1,
        servicesClientPrice: 500,
        expensesTotal: 100,
        raw: {
          company_share_enabled: true,
          company_share_percent: 10,
          paymentHistory: [{ type: 'amount', value: 1000 }],
        },
      },
      {
        id: 2,
        servicesClientPrice: 0,
        expensesTotal: 50,
        raw: {
          paid_percentage: 100,
        },
      },
    ];
    const reservations = [
      {
        id: 11,
        projectId: 1,
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 250, crewTotal: 300, crewCostTotal: 100 }],
      },
      {
        id: 12,
        projectId: 2,
        items: [{ equipmentTotal: 400, equipmentCostTotal: 100, crewTotal: 200, crewCostTotal: 75 }],
      },
    ];

    const breakdown = computeProjectsRevenueBreakdown(projects, reservations, 0.15);

    expect(breakdown.grossRevenue).toBeCloseTo(2877, 2);
    expect(breakdown.companyShareTotal).toBeCloseTo(180, 2);
    expect(breakdown.taxTotal).toBeCloseTo(297, 2);
    expect(breakdown.outstandingTotal).toBeCloseTo(1277, 2);
    expect(breakdown.discountTotal).toBe(0);
    expect(breakdown.crewTotal).toBe(500);
    expect(breakdown.crewCostTotal).toBe(175);
    expect(breakdown.equipmentTotalCombined).toBe(1400);
    expect(breakdown.equipmentCostTotalCombined).toBe(350);
    expect(breakdown.projectExpensesTotal).toBe(150);
    expect(breakdown.servicesRevenueTotal).toBe(500);
    expect(breakdown.netProfit).toBe(1725);
    expect(breakdown.profitMarginPercent).toBeCloseTo(66.86, 2);
  });
});
