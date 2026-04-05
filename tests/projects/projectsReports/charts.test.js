import { describe, expect, it, vi } from 'vitest';

import {
  buildClientsChartOptions,
  buildExpenseChartOptions,
  buildStatusChartOptions,
  buildTimelineChartOptions,
  renderApexChart,
} from '../../../src/scripts/projectsReports/charts.ts';

describe('projectsReports/charts', () => {
  const deps = {
    t: (key, fallback) => fallback || key,
    formatCompactNumber: (value) => `fmt:${value}`,
    getChartLocale: () => 'en-US',
  };

  it('builds status chart options with translated labels and counts', () => {
    const options = buildStatusChartOptions([
      { status: 'upcoming' },
      { status: 'completed' },
      { status: 'completed' },
    ], deps);

    expect(options.labels).toEqual(['upcoming', 'ongoing', 'completed']);
    expect(options.series).toEqual([1, 0, 2]);
    expect(options.tooltip.y.formatter(1200)).toBe('fmt:1200');
  });

  it('builds timeline, expense, and clients chart options from project aggregates', () => {
    const projects = [
      { start: new Date('2026-01-10T00:00:00Z'), overallTotal: 1000, title: 'Alpha', projectCode: 'A', expensesTotal: 200, clientName: 'Milk' },
      { start: new Date('2026-02-10T00:00:00Z'), overallTotal: 2500, title: 'Beta', projectCode: 'B', expensesTotal: 700, clientCompany: 'Ratio' },
      { start: new Date('2026-02-15T00:00:00Z'), overallTotal: 500, title: 'Gamma', projectCode: 'C', expensesTotal: 100, clientName: 'Milk' },
    ];

    const timeline = buildTimelineChartOptions(projects, deps);
    expect(timeline.series[0].data).toEqual([1000, 3000]);
    expect(timeline.xaxis.categories).toHaveLength(2);

    const expenses = buildExpenseChartOptions(projects, deps);
    expect(expenses.series[0].data).toEqual([2500, 1000, 500]);
    expect(expenses.series[1].data).toEqual([700, 200, 100]);

    const clients = buildClientsChartOptions(projects, deps);
    expect(clients.series[0].data).toEqual([2500, 1500]);
    expect(clients.xaxis.categories).toEqual(['Ratio', 'Milk']);
  });

  it('destroys the previous chart instance and renders the new one', async () => {
    const destroy = vi.fn();
    const render = vi.fn(async () => undefined);
    const chartStore = {
      status: { destroy },
    };
    const created = [];
    const ChartLib = vi.fn(function ChartLib(element, options) {
      created.push({ element, options });
      this.render = render;
    });
    const element = document.createElement('div');

    renderApexChart({
      ChartLib,
      charts: chartStore,
      key: 'status',
      element,
      options: { series: [1, 2, 3] },
    });

    expect(destroy).toHaveBeenCalledTimes(1);
    expect(element.innerHTML).toBe('');
    expect(created).toHaveLength(1);
    expect(created[0].options.series).toEqual([1, 2, 3]);
    expect(render).toHaveBeenCalledTimes(1);
  });
});
