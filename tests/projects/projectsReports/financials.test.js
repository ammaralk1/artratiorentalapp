import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/scripts/reports/calculations.js', () => ({
  computeReservationFinancials: vi.fn((reservation) => reservation.__financials || {}),
}));

vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((value) => String(value)),
}));

import {
  computeProjectMetrics,
  determineProjectStatus,
  getProjectExpenses,
  getProjectServicesRevenue,
  getReservationsForProject,
  isProjectClosed,
  isProjectEligibleForReports,
  resolveProjectPaymentState,
} from '../../../src/scripts/projectsReports/financials.ts';

describe('projectsReports/financials', () => {
  it('detects closed and eligible projects from status and confirmation state', () => {
    expect(isProjectClosed({ status: 'completed' })).toBe(true);
    expect(isProjectClosed({ raw: { closed: true } })).toBe(true);
    expect(isProjectEligibleForReports({ confirmed: true, cancelled: false })).toBe(true);
    expect(isProjectEligibleForReports({ confirmed: false, status: 'ongoing', cancelled: false })).toBe(false);
    expect(isProjectEligibleForReports({ confirmed: true, cancelled: true })).toBe(false);
  });

  it('resolves project expenses and falls back to sale prices when direct services revenue is absent', () => {
    expect(getProjectExpenses({
      expenses: [{ amount: 100 }, { amount: 55.5 }],
    })).toBeCloseTo(155.5, 5);

    expect(getProjectServicesRevenue({
      expenses: [{ sale_price: '1,200' }, { salePrice: 300 }],
    })).toBe(1500);

    expect(getProjectServicesRevenue({
      servicesClientPrice: 800,
      expenses: [{ sale_price: 9999 }],
    })).toBe(800);
  });

  it('filters reservations for a project and computes per-project metrics from reservation financials', () => {
    const reservations = [
      { id: 1, projectId: 5, __financials: { finalTotal: 1000, taxAmount: 150 } },
      { id: 2, project_id: 5, __financials: { finalTotal: 500, taxAmount: 0 } },
      { id: 3, projectId: 8, __financials: { finalTotal: 999, taxAmount: 999 } },
    ];

    const linked = getReservationsForProject(reservations, 5);
    expect(linked).toHaveLength(2);

    const metrics = computeProjectMetrics({
      raw: { equipmentEstimate: 200, servicesClientPrice: 300 },
      expensesTotal: 100,
    }, linked);

    expect(metrics.resFinal).toBe(1500);
    expect(metrics.resTax).toBe(150);
    expect(metrics.resNetRevenue).toBe(1350);
    expect(metrics.netProfit).toBe(1550);
    expect(metrics.marginPercent).toBeCloseTo(83.7837, 3);
  });

  it('derives payment state from payment history or paid percentages', () => {
    expect(resolveProjectPaymentState({
      overallTotal: 1000,
      raw: {
        paymentHistory: [
          { type: 'amount', value: 250 },
          { type: 'percent', value: 50 },
        ],
      },
    })).toBe('partial');

    expect(resolveProjectPaymentState({
      overallTotal: 1000,
      raw: { paid_percentage: 100 },
    })).toBe('paid');

    expect(resolveProjectPaymentState({
      overallTotal: 1000,
      raw: {},
    })).toBe('unpaid');
  });

  it('classifies project status from start and end dates', () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    expect(determineProjectStatus({ start: tomorrow, end: tomorrow })).toBe('upcoming');
    expect(determineProjectStatus({ start: yesterday, end: yesterday })).toBe('completed');
    expect(determineProjectStatus({ start: yesterday, end: tomorrow })).toBe('ongoing');
  });
});
