import { describe, expect, it } from 'vitest';

import {
  buildSortTitle,
  getNextSortState,
  renderProjectsTable,
  sortProjects,
} from '../../../src/scripts/projectsReports/table.ts';

describe('projectsReports/table', () => {
  const deps = {
    t: (key, fallback) => fallback || key,
    escapeHtml: (value) => String(value),
    formatCurrency: (value) => `SAR ${Number(value || 0)}`,
    formatPercent: (value) => `${Number(value || 0).toFixed(1)}%`,
    formatNumber: (value) => String(value),
    formatProjectPeriod: (start, end) => `${start || '—'} -> ${end || '—'}`,
    computeMetrics: (project) => project.__metrics || {},
    resolveProjectPaymentState: (project) => project.__paymentState || 'unpaid',
  };

  const projects = [
    {
      id: 1,
      title: 'Beta',
      projectCode: 'PRJ-2',
      clientName: 'Milk',
      status: 'ongoing',
      start: '2026-04-02',
      end: '2026-04-03',
      overallTotal: 1200,
      paymentStatus: 'partial',
      __paymentState: 'partial',
      __metrics: { marginPercent: 35.2, resFinal: 1000, netProfit: 300 },
      raw: {},
    },
    {
      id: 2,
      title: 'Alpha',
      projectCode: 'PRJ-1',
      clientName: 'Ratio',
      status: 'completed',
      start: '2026-04-01',
      end: '2026-04-02',
      overallTotal: 2400,
      paymentStatus: 'paid',
      __paymentState: 'paid',
      __metrics: { marginPercent: 58.9, resFinal: 2000, netProfit: 900 },
      raw: {},
    },
  ];

  it('computes next sort state and translated titles', () => {
    expect(getNextSortState({ key: 'value', dir: 'desc' }, 'project')).toEqual({ key: 'project', dir: 'asc' });
    expect(getNextSortState({ key: 'value', dir: 'desc' }, 'value')).toEqual({ key: 'value', dir: 'asc' });
    expect(getNextSortState({ key: 'project', dir: 'asc' }, 'project')).toEqual({ key: 'project', dir: 'desc' });
    expect(buildSortTitle('margin', null, { t: deps.t })).toContain('قابل للفرز');
    expect(buildSortTitle('margin', 'asc', { t: deps.t })).toContain('ترتيب تصاعدي');
  });

  it('sorts projects by configured key and direction', () => {
    expect(sortProjects(projects, { key: 'project', dir: 'asc' }, { computeMetrics: deps.computeMetrics }).map((project) => project.id)).toEqual([2, 1]);
    expect(sortProjects(projects, { key: 'value', dir: 'desc' }, { computeMetrics: deps.computeMetrics }).map((project) => project.id)).toEqual([2, 1]);
    expect(sortProjects(projects, { key: 'margin', dir: 'asc' }, { computeMetrics: deps.computeMetrics }).map((project) => project.id)).toEqual([1, 2]);
  });

  it('renders table rows, meta text, and debug rows', () => {
    const rendered = renderProjectsTable({
      projects,
      totalProjects: 5,
      sortState: { key: 'project', dir: 'asc' },
      isDebug: true,
      deps,
    });

    expect(rendered.isEmpty).toBe(false);
    expect(rendered.rowsHtml).toContain('Alpha');
    expect(rendered.rowsHtml).toContain('reservation-chip status-chip status-paid');
    expect(rendered.rowsHtml).toContain('reports-debug-row');
    expect(rendered.metaText).toBe('Showing 2 of 5 projects');
  });

  it('returns an empty table state when there are no projects', () => {
    expect(renderProjectsTable({
      projects: [],
      totalProjects: 0,
      sortState: { key: 'value', dir: 'desc' },
      deps,
    })).toEqual({
      isEmpty: true,
      rowsHtml: '',
      metaText: '',
    });
  });
});
