import { describe, it, expect } from 'vitest';

import {
  calculateMaintenanceExpenses,
  applyMaintenanceExpenses,
  calculateStatusBreakdown,
  calculatePaymentBreakdown,
} from '../../src/scripts/reports/calculations.js';

describe('reports: maintenance and breakdowns', () => {
  describe('calculateMaintenanceExpenses', () => {
    const baseFilters = { range: 'custom', start: '2025-01-01', end: '2025-01-31' };

    it('sums only closed/completed/cancelled within date range', () => {
      const tickets = [
        { id: '1', repairCost: '100.50', status: 'closed', resolved_at: '2025-01-10' },
        { id: '2', repairCost: '200', status: 'completed', resolved_at: '2025-01-20' },
        { id: '3', repairCost: '50', status: 'open', resolved_at: '2025-01-15' },
        { id: '4', repairCost: '75.25', status: 'cancelled', resolved_at: '2024-12-31' },
        { id: '5', repairCost: '150.75', status: 'completed', resolved_at: '2025-02-01' },
      ];
      const out = calculateMaintenanceExpenses(tickets, baseFilters);
      expect(out.total).toBeCloseTo(300.5, 2); // 100.5 + 200
      expect(out.items.length).toBe(2);
    });
  });

  describe('applyMaintenanceExpenses', () => {
    it('subtracts expense from netProfit and attaches maintenanceExpense', () => {
      const metrics = {
        total: 10,
        confirmed: 6,
        completed: 4,
        revenue: 10000,
        netProfit: 3000,
      };
      const out = applyMaintenanceExpenses(metrics, 700.25);
      expect(out.maintenanceExpense).toBeCloseTo(700.25, 2);
      expect(out.netProfit).toBeCloseTo(2299.75, 2);
    });
  });

  describe('status/payment breakdowns', () => {
    it('computes status breakdown counts and percents', () => {
      const reservations = [
        { id: '1', start: '2025-01-10', status: 'confirmed' },
        { id: '2', start: '2025-01-11', status: 'completed' },
        { id: '3', start: '2025-01-12', status: 'pending' },
      ];
      const out = calculateStatusBreakdown(reservations);
      const confirmed = out.find((x) => x.filterKey === 'confirmed');
      const completed = out.find((x) => x.filterKey === 'completed');
      const pending = out.find((x) => x.filterKey === 'pending');
      expect(confirmed.rawCount + completed.rawCount + pending.rawCount).toBe(3);
      const sum = confirmed.percent + completed.percent + pending.percent;
      // Allow small rounding variance from integer rounding
      expect(sum).toBeGreaterThanOrEqual(99);
      expect(sum).toBeLessThanOrEqual(101);
    });

    it('computes payment breakdown counts and percents', () => {
      const reservations = [
        { id: '1', start: '2025-01-10', paid: true },
        { id: '2', start: '2025-01-11', paid: false },
        { id: '3', start: '2025-01-12', paid: true },
      ];
      const out = calculatePaymentBreakdown(reservations);
      const paid = out.find((x) => x.filterKey === 'paid');
      const unpaid = out.find((x) => x.filterKey === 'unpaid');
      expect(paid.rawCount).toBe(2);
      expect(unpaid.rawCount).toBe(1);
      expect(paid.percent + unpaid.percent).toBe(100);
    });
  });
});
