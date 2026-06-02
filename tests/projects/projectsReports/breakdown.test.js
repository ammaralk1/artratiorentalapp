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
  calculateOverheadInclusiveAmounts: vi.fn(({
    baseSubtotal = 0,
    discountValue = 0,
    discountType = 'percent',
    companySharePercent = 0,
  } = {}) => {
    const sharePercent = Number(companySharePercent) > 0 ? Number(companySharePercent) : 0;
    const clientSubtotalBeforeDiscount = Number(baseSubtotal || 0) * (1 + (sharePercent / 100));
    const discountAmount = discountType === 'amount'
      ? Number(discountValue || 0)
      : clientSubtotalBeforeDiscount * (Number(discountValue || 0) / 100);
    const taxableAmount = Math.max(0, clientSubtotalBeforeDiscount - discountAmount);
    const companyShareAmount = sharePercent > 0
      ? taxableAmount * (sharePercent / (100 + sharePercent))
      : 0;
    return {
      rawBaseSubtotal: Number(baseSubtotal || 0),
      clientSubtotalBeforeDiscount,
      discountAmount,
      subtotalAfterDiscount: taxableAmount - companyShareAmount,
      companyShareAmount,
      taxableAmount,
      companySharePercent: sharePercent,
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
    expect(summary.discountAmount).toBe(178.5);
    expect(summary.baseAfterDiscount).toBe(1606.5);
    expect(summary.companyShareAmount).toBeCloseTo(80.33, 2);
    expect(summary.taxAmount).toBeCloseTo(240.97, 2);
    expect(summary.finalTotal).toBeCloseTo(1847.47, 2);
    expect(summary.applyTax).toBe(true);
    expect(summary.sharePercent).toBe(5);
  });

  it('uses direct equipment estimate only when the project has no linked reservation', () => {
    const standalone = computeProjectCommercialTotals({
      equipmentEstimate: 1000,
      servicesClientPrice: 250,
      expensesTotal: 100,
    }, [], 0.15);

    const linked = computeProjectCommercialTotals({
      equipmentEstimate: 1000,
      servicesClientPrice: 0,
      expensesTotal: 0,
    }, [
      {
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 250, crewTotal: 900, crewCostTotal: 400 }],
      },
    ], 0.15);

    expect(standalone.projectEquipmentRevenue).toBe(1000);
    expect(standalone.finalTotal).toBe(1250);
    expect(linked.projectEquipmentRevenue).toBe(0);
    expect(linked.finalTotal).toBe(1900);
  });

  it('accepts techniciansDetails as synced reservation crew assignments', () => {
    const totals = aggregateReservationDraftTotals([
      {
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 250, crewTotal: 900, crewCostTotal: 400 }],
        techniciansDetails: [{ technicianId: 10 }],
      },
    ]);

    expect(totals.crew).toBe(900);
    expect(totals.crewCost).toBe(400);
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
    expect(breakdown.companyShareTotal).toBeCloseTo(198, 2);
    expect(breakdown.taxTotal).toBeCloseTo(297, 2);
    expect(breakdown.outstandingTotal).toBeCloseTo(1277, 2);
    expect(breakdown.discountTotal).toBe(0);
    expect(breakdown.crewTotal).toBe(500);
    expect(breakdown.crewCostTotal).toBe(175);
    expect(breakdown.equipmentTotalCombined).toBe(1400);
    expect(breakdown.equipmentCostTotalCombined).toBe(350);
    expect(breakdown.projectExpensesTotal).toBe(150);
    expect(breakdown.servicesRevenueTotal).toBe(500);
    expect(breakdown.netProfit).toBe(1707);
    expect(breakdown.profitMarginPercent).toBeCloseTo(66.16, 2);
  });

  it('excludes internal overhead from project report profit after discount', () => {
    const projects = [
      {
        id: 84,
        servicesClientPrice: 1000,
        expensesTotal: 100,
        discount: 10,
        discountType: 'percent',
        applyTax: true,
        companyShareEnabled: true,
        companySharePercent: 10,
      },
    ];
    const reservations = [
      {
        id: 231,
        projectId: 84,
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 100, crewTotal: 1000, crewCostTotal: 100 }],
      },
    ];

    const breakdown = computeProjectsRevenueBreakdown(projects, reservations, 0.15);

    expect(breakdown.grossRevenue).toBeCloseTo(3415.5, 2);
    expect(breakdown.companyShareTotal).toBeCloseTo(297, 2);
    expect(breakdown.taxTotal).toBeCloseTo(445.5, 2);
    expect(breakdown.projectExpensesTotal).toBe(100);
    expect(breakdown.equipmentCostTotalCombined).toBe(100);
    expect(breakdown.crewCostTotal).toBe(100);
    expect(breakdown.netProfit).toBe(2373);
    expect(breakdown.profitMarginPercent).toBeCloseTo(79.9, 2);
  });

  it('does not double count direct equipment estimate in project report totals when linked reservation owns revenue', () => {
    const breakdown = computeProjectsRevenueBreakdown([
      {
        id: 82,
        equipmentEstimate: 1000,
        servicesClientPrice: 0,
        expensesTotal: 0,
      },
    ], [
      {
        id: 228,
        projectId: 82,
        items: [{ equipmentTotal: 1000, equipmentCostTotal: 250, crewTotal: 900, crewCostTotal: 400 }],
      },
    ], 0.15);

    expect(breakdown.grossRevenue).toBe(1900);
    expect(breakdown.equipmentTotalCombined).toBe(1000);
    expect(breakdown.crewTotal).toBe(900);
    expect(breakdown.projectExpensesTotal).toBe(0);
  });
});
