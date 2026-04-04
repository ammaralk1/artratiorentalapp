import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../src/scripts/reservationsSummary.js', () => ({
  DEFAULT_COMPANY_SHARE_PERCENT: 10,
  calculateDraftFinancialBreakdown: vi.fn(() => ({
    rentalDays: 1,
    equipmentTotal: 0,
    equipmentCostTotal: 0,
    crewTotal: 0,
    crewCostTotal: 0,
    discountAmount: 0,
    subtotalAfterDiscount: 0,
    taxableAmount: 0,
    taxAmount: 0,
    finalTotal: 0,
    companySharePercent: 0,
    companyShareAmount: 0,
    netProfit: 0,
  })),
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
  getCurrentLanguage: vi.fn(() => 'en'),
}));

vi.mock('../../src/scripts/reports/formatters.js', () => ({
  translate: vi.fn((key, ar, en) => en ?? ar ?? key),
  formatDateInput: vi.fn((value) => {
    const candidate = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(candidate.getTime())) return '';
    const year = candidate.getFullYear();
    const month = String(candidate.getMonth() + 1).padStart(2, '0');
    const day = String(candidate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }),
  getMonthLabel: vi.fn((date) => {
    const candidate = date instanceof Date ? date : new Date(date);
    return Number.isNaN(candidate.getTime()) ? '' : candidate.toISOString().slice(0, 7);
  }),
}));

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
      expect(metrics.total).toBe(1);
      expect(metrics.confirmed).toBe(1);
      expect(metrics.completed).toBe(0);
      expect(metrics.paidCount).toBe(1);
      expect(metrics.revenue).toBeCloseTo(1000, 5);
      expect(metrics.companyShareTotal).toBeCloseTo(100, 5);
      expect(metrics.taxTotal).toBeCloseTo(150, 5);
      expect(metrics.crewTotal).toBeCloseTo(400, 5);
      expect(metrics.crewCostTotal).toBeCloseTo(200, 5);
      expect(metrics.netProfit).toBeCloseTo(650, 5);
      expect(metrics.average).toBeCloseTo(1000, 5);
    });
  });

  describe('filterReservations', () => {
    const baseFilters = { range: 'all', status: 'all', payment: 'all', share: 'all', search: '', start: null, end: null };
    const customers = [];
    const equipment = [];
    const technicians = [];

    it('excludes reservations linked to projects', () => {
      const input = [
        { id: '1', start: '2025-01-10T00:00:00', projectId: '10', status: 'confirmed' },
        { id: '2', start: '2025-01-11T00:00:00', status: 'confirmed' },
        { id: '3', start: '2025-01-12T00:00:00', status: 'completed' },
      ];
      const out = calculations.filterReservations(input, baseFilters, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['2']);
    });

    it('filters by payment status (paid/unpaid)', () => {
      const input = [
        { id: '1', start: '2025-01-10T00:00:00', paid: true, status: 'confirmed' },
        { id: '2', start: '2025-01-11T00:00:00', paid: false, status: 'confirmed' },
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
      expect(out).toEqual([]);
    });

    it('filters by custom date range', () => {
      const input = [
        { id: '1', start: '2025-01-01T13:00:00', status: 'confirmed' },
        { id: '2', start: '2025-01-15T13:00:00', status: 'completed' },
        { id: '3', start: '2025-02-01T13:00:00', status: 'confirmed' },
      ];
      const filters = { ...baseFilters, range: 'custom', start: '2025-01-01', end: '2025-01-15' };
      const out = calculations.filterReservations(input, filters, customers, equipment, technicians);
      expect(out.map((r) => r.id)).toEqual(['1']);
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
