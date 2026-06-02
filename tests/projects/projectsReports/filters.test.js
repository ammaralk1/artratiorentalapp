import { describe, expect, it } from 'vitest';
import { vi } from 'vitest';

vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((value) => String(value)),
}));

vi.mock('../../../src/scripts/language.js', () => ({
  getCurrentLanguage: vi.fn(() => 'en'),
}));

import {
  filterProjectsForReports,
  isWithinCustomRange,
  isWithinRelativeRange,
  matchesSearch,
} from '../../../src/scripts/projectsReports/filters.ts';

describe('projectsReports/filters', () => {
  const projects = [
    {
      id: 1,
      title: 'Launch Film',
      projectCode: 'PRJ-1',
      clientName: 'Milk Network',
      clientCompany: 'Milk',
      type: 'commercial',
      description: 'Hero film',
      status: 'upcoming',
      confirmed: true,
      cancelled: false,
      start: new Date('2026-04-01T10:00:00Z'),
      overallTotal: 1000,
      raw: { paymentHistory: [] },
    },
    {
      id: 2,
      title: 'Closed Unconfirmed Edit',
      projectCode: 'PRJ-2',
      clientName: 'Other',
      clientCompany: '',
      type: 'post',
      description: '',
      status: 'completed',
      confirmed: false,
      cancelled: false,
      start: new Date('2026-03-01T10:00:00Z'),
      overallTotal: 1000,
      raw: {
        status: 'completed',
        paymentHistory: [{ type: 'amount', value: 1000 }],
      },
    },
    {
      id: 4,
      title: 'Closed Confirmed Edit',
      projectCode: 'PRJ-4',
      clientName: 'Studio',
      clientCompany: '',
      type: 'post',
      description: '',
      status: 'completed',
      confirmed: true,
      cancelled: false,
      start: new Date('2026-03-02T10:00:00Z'),
      overallTotal: 1500,
      raw: {
        status: 'completed',
        paymentHistory: [{ type: 'amount', value: 1500 }],
      },
    },
    {
      id: 5,
      title: 'Pending Confirmed Shoot',
      projectCode: 'PRJ-5',
      clientName: 'Pending Client',
      clientCompany: '',
      type: 'commercial',
      description: '',
      status: 'pending',
      confirmed: true,
      cancelled: false,
      start: new Date('2026-04-02T10:00:00Z'),
      overallTotal: 900,
      raw: { status: 'pending' },
    },
    {
      id: 3,
      title: 'Cancelled Shoot',
      projectCode: 'PRJ-3',
      status: 'cancelled',
      confirmed: true,
      cancelled: true,
      start: new Date('2026-04-01T10:00:00Z'),
      overallTotal: 1000,
      raw: {},
    },
  ];

  it('matches search terms across project and client fields', () => {
    expect(matchesSearch(projects[0], 'milk')).toBe(true);
    expect(matchesSearch(projects[0], 'hero')).toBe(true);
    expect(matchesSearch(projects[0], 'missing')).toBe(false);
  });

  it('filters projects using status, payment, cancellation, and confirmation rules', () => {
    const result = filterProjectsForReports(projects, {
      search: 'edit',
      statuses: ['completed'],
      payment: 'paid',
      confirmed: 'closed',
      range: 'all',
    }, new Date('2026-04-05T00:00:00Z'));

    expect(result.map((project) => project.id)).toEqual([4]);
  });

  it('filters by custom and relative ranges', () => {
    expect(isWithinCustomRange(new Date('2026-04-10T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-15T00:00:00Z'))).toBe(true);
    expect(isWithinCustomRange(new Date('2026-04-20T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-15T00:00:00Z'))).toBe(false);

    expect(isWithinRelativeRange(new Date('2026-04-03T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-05T00:00:00Z'))).toBe(true);
    expect(isWithinRelativeRange(new Date('2026-03-01T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-05T00:00:00Z'))).toBe(false);
  });

  it('supports custom range filtering from filterProjectsForReports', () => {
    const result = filterProjectsForReports(projects, {
      statuses: ['upcoming', 'completed', 'pending'],
      payment: 'all',
      confirmed: 'all',
      range: 'custom',
      startDate: '2026-03-01',
      endDate: '2026-04-05',
    }, new Date('2026-04-05T00:00:00Z'));

    expect(result.map((project) => project.id)).toEqual([1, 4, 5]);
  });
});
