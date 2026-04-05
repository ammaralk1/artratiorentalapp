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
      title: 'Closed Edit',
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
      search: 'closed',
      statuses: ['completed'],
      payment: 'paid',
      confirmed: 'closed',
      range: 'all',
    }, new Date('2026-04-05T00:00:00Z'));

    expect(result.map((project) => project.id)).toEqual([2]);
  });

  it('filters by custom and relative ranges', () => {
    expect(isWithinCustomRange(new Date('2026-04-10T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-15T00:00:00Z'))).toBe(true);
    expect(isWithinCustomRange(new Date('2026-04-20T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-15T00:00:00Z'))).toBe(false);

    expect(isWithinRelativeRange(new Date('2026-04-03T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-05T00:00:00Z'))).toBe(true);
    expect(isWithinRelativeRange(new Date('2026-03-01T00:00:00Z'), new Date('2026-04-01T00:00:00Z'), new Date('2026-04-05T00:00:00Z'))).toBe(false);
  });

  it('supports custom range filtering from filterProjectsForReports', () => {
    const result = filterProjectsForReports(projects, {
      statuses: ['upcoming', 'completed'],
      payment: 'all',
      confirmed: 'all',
      range: 'custom',
      startDate: '2026-03-15',
      endDate: '2026-04-05',
    }, new Date('2026-04-05T00:00:00Z'));

    expect(result.map((project) => project.id)).toEqual([1]);
  });
});
