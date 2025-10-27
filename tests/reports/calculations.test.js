import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import * as calculations from '../../src/scripts/reports/calculations.js';

describe('reports/calculations', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('calculateMetrics', () => {
    it('aggregates totals, counts, and sums using computeReservationFinancials', () => {
      const reservations = [
        { id: '1', start: '2025-01-10T08:00:00', status: 'confirmed', paid: true },
        { id: '2', start: '2025-01-11T08:00:00', status: 'completed', paid: false },
        { id: '3', start: '2025-01-12T08:00:00', status: 'pending', paid: true },
      ];

      // Provide precomputed financials directly on reservations to bypass internals
      reservations[0].__financials = {
        finalTotal: 1000,
        companyShareAmount: 100,
        taxAmount: 150,
        crewTotal: 400,
        crewCostTotal: 200,
        netProfit: 650,
        companySharePercent: 10,
      };
      reservations[1].__financials = {
        finalTotal: 500,
        companyShareAmount: 0,
        taxAmount: 0,
        crewTotal: 0,
        crewCostTotal: 0,
        netProfit: 500,
        companySharePercent: 0,
      };
      reservations[2].__financials = {
        finalTotal: 250,
        companyShareAmount: 25,
        taxAmount: 37.5,
        crewTotal: 0,
        crewCostTotal: 0,
        netProfit: 150,
        companySharePercent: 10,
      };

      const metrics = calculations.calculateMetrics(reservations);
      expect(metrics.total).toBe(3);
      // confirmed includes confirmed + completed
      expect(metrics.confirmed).toBe(2);
      expect(metrics.completed).toBe(1);
      expect(metrics.paidCount).toBe(2);
      expect(metrics.revenue).toBeCloseTo(1750, 5);
      expect(metrics.companyShareTotal).toBeCloseTo(125, 5);
      expect(metrics.taxTotal).toBeCloseTo(187.5, 5);
      expect(metrics.crewTotal).toBeCloseTo(400, 5);
      expect(metrics.crewCostTotal).toBeCloseTo(200, 5);
      expect(metrics.netProfit).toBeCloseTo(1300, 5);
      expect(metrics.average).toBeCloseTo(1750 / 3, 5);
    });
  });

  describe('filterReservations', () => {
    const baseFilters = { range: 'all', status: 'all', payment: 'all', share: 'all', search: '', start: null, end: null };
    const customers = [];
    const equipment = [];
    const technicians = [];

    it('excludes reservations linked to projects', () => {
      const input = [
        { id: '1', start: '2025-01-10T00:00:00', projectId: '10' },
        { id: '2', start: '2025-01-11T00:00:00' },
        { id: '3', start: '2025-01-12T00:00:00' },
      ];
      const out = calculations.filterReservations(input, baseFilters, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['2', '3']);
    });

    it('filters by payment status (paid/unpaid)', () => {
      const input = [
        { id: '1', start: '2025-01-10T00:00:00', paid: true },
        { id: '2', start: '2025-01-11T00:00:00', paid: false },
      ];
      let out = calculations.filterReservations(input, { ...baseFilters, payment: 'paid' }, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['1']);
      out = calculations.filterReservations(input, { ...baseFilters, payment: 'unpaid' }, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['2']);
    });

    it('filters by status (completed)', () => {
      const input = [
        { id: '1', start: '2025-01-10T00:00:00', status: 'completed' },
        { id: '2', start: '2025-01-11T00:00:00', status: 'confirmed' },
      ];
      const out = calculations.filterReservations(input, { ...baseFilters, status: 'completed' }, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['1']);
    });

    it('filters by custom date range', () => {
      const input = [
        { id: '1', start: '2025-01-01T13:00:00' },
        { id: '2', start: '2025-01-15T13:00:00' },
        { id: '3', start: '2025-02-01T13:00:00' },
      ];
      const filters = { ...baseFilters, range: 'custom', start: '2025-01-01', end: '2025-01-15' };
      const out = calculations.filterReservations(input, filters, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['1', '2']);
    });
  });

  describe('calculateMonthlyTrend', () => {
    it('returns 6 months with correct aggregation and labels based on system time', () => {
      const useDate = new Date('2025-06-15T12:00:00Z');
      vi.useFakeTimers();
      vi.setSystemTime(useDate);

      const input = [
        { id: 'A', start: '2025-04-10T00:00:00' },
        { id: 'B', start: '2025-04-20T00:00:00' },
        { id: 'C', start: '2025-06-01T00:00:00' },
      ];

      input[0].__financials = { finalTotal: 100, netProfit: 60, companyShareAmount: 10 };
      input[1].__financials = { finalTotal: 300, netProfit: 200, companyShareAmount: 20 };
      input[2].__financials = { finalTotal: 50, netProfit: 20, companyShareAmount: 0 };

      const out = calculations.calculateMonthlyTrend(input);
      expect(out).toHaveLength(6);
      // April 2025 bucket
      const april = out.find((m) => m.startInput === '2025-04-01');
      expect(april).toBeTruthy();
      expect(april.count).toBe(2);
      expect(april.revenue).toBe(400);
      expect(april.netProfit).toBe(260);

      // June 2025 bucket
      const june = out.find((m) => m.startInput === '2025-06-01');
      expect(june).toBeTruthy();
      expect(june.count).toBe(1);
      expect(june.revenue).toBe(50);
      expect(june.netProfit).toBe(20);

      vi.useRealTimers();
    });
  });
});
