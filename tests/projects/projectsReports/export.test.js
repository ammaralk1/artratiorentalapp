import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback || key),
}));

vi.mock('../../../src/scripts/projectsReports/formatting.ts', () => ({
  formatProjectPeriod: vi.fn((start, end) => `${start || '—'} -> ${end || '—'}`),
}));

vi.mock('../../../src/scripts/projectsReports/financials.ts', () => ({
  getReservationsForProject: vi.fn((reservations, projectId) => (
    Array.isArray(reservations)
      ? reservations.filter((reservation) => String(reservation.projectId ?? reservation.project_id ?? '') === String(projectId))
      : []
  )),
  resolveProjectPaymentState: vi.fn((project) => project.__paymentState || 'unpaid'),
}));

vi.mock('../../../src/scripts/projectsReports/breakdown.ts', () => ({
  computeProjectCommercialTotals: vi.fn((project) => project.__commercial),
  resolveProjectPaidAmount: vi.fn((project) => project.__paidAmount || 0),
}));

vi.mock('../../../src/scripts/reports/external.js', () => ({
  ensureXlsx: vi.fn(async () => null),
}));

vi.mock('../../../src/scripts/templates/excelExport.js', () => ({
  ensureXlsxStyled: vi.fn(async () => null),
}));

import {
  buildProjectsBreakdownSheet,
  buildProjectsExportRows,
} from '../../../src/scripts/projectsReports/export.ts';

describe('projectsReports/export', () => {
  it('builds export rows from shared project commercial totals', () => {
    const rows = buildProjectsExportRows([
      {
        id: 7,
        projectCode: 'PRJ-7',
        title: 'Launch Film',
        clientName: 'Milk Network',
        clientCompany: 'Milk',
        status: 'completed',
        start: '2026-04-01',
        end: '2026-04-02',
        overallTotal: 2000,
        raw: {
          paymentHistory: [{ type: 'amount', value: 1200 }],
          equipmentEstimate: 800,
        },
        __paymentState: 'partial',
        __paidAmount: 1200,
        __commercial: {
          agg: { equipment: 900, equipmentCost: 250, crew: 300, crewCost: 100 },
          servicesRevenue: 400,
          projectExpenses: 150,
          discountAmount: 100,
          baseAfterDiscount: 1500,
        },
      },
    ], [{ id: 1, projectId: 7 }], 0.15);

    expect(rows).toEqual([[
      'PRJ-7',
      'Launch Film',
      'Milk Network (Milk)',
      'completed',
      '2026-04-01 -> 2026-04-02',
      2000,
      100,
      0,
      800,
      400,
      150,
      1100,
      1000,
      66.7,
      'partial',
      1200,
      800,
      60,
      60,
      1,
    ]]);
  });

  it('keeps linked reservation revenue from being doubled by direct equipment estimate', () => {
    const rows = buildProjectsExportRows([
      {
        id: 82,
        projectCode: 'PRJ-82',
        title: 'Managed Project',
        clientName: 'Client',
        status: 'upcoming',
        raw: {
          equipmentEstimate: 1000,
          paymentHistory: [],
        },
        __commercial: {
          agg: { equipment: 1000, equipmentCost: 250, crew: 900, crewCost: 400 },
          servicesRevenue: 0,
          projectExpenses: 0,
          discountAmount: 0,
          taxAmount: 0,
          baseAfterDiscount: 1900,
          finalTotal: 1900,
        },
      },
    ], [{ id: 228, projectId: 82 }], 0.15);

    expect(rows[0][5]).toBe(1900);
    expect(rows[0][8]).toBe(1000);
    expect(rows[0][11]).toBe(1900);
    expect(rows[0][12]).toBe(1250);
  });

  it('builds the detailed breakdown sheet structure', () => {
    const XLSX = {
      utils: {
        encode_cell: ({ r, c }) => `${String.fromCharCode(65 + c)}${r + 1}`,
      },
    };

    const sheet = buildProjectsBreakdownSheet(XLSX, [{
      id: 3,
      projectCode: 'PRJ-3',
      title: 'Studio Shoot',
      __commercial: {
        agg: { equipment: 500, equipmentCost: 120, crew: 200, crewCost: 80 },
        servicesRevenue: 100,
        projectExpenses: 50,
        discountAmount: 40,
        baseAfterDiscount: 760,
      },
    }], [], 0.15);

    expect(sheet['A1'].v).toContain('Studio Shoot');
    expect(sheet['A2'].v).toBe('البند');
    expect(sheet['B3'].v).toBe(500);
    expect(sheet['F5'].v).toBeCloseTo(67.1, 1);
    expect(sheet['!ref']).toBe('A1:F5');
  });
});
