import { describe, expect, it } from 'vitest';

import {
  buildComparisonWindows,
  computeActionableProjectsSummary,
  computeAssignedTeamSummary,
  computeAverageProjectValue,
  computeCollectionSummary,
  computeMetricDelta,
  computeProjectTypeBreakdown,
  computeRepeatClientRevenueShare,
} from '../../../src/scripts/projectsReports/insights.ts';

describe('projectsReports/insights', () => {
  it('computes collection, averages, type breakdown, and repeat client share', () => {
    const projects = [
      {
        id: 1,
        clientId: '10',
        start: new Date('2026-01-01T00:00:00Z'),
        overallTotal: 1000,
        unpaidValue: 200,
        type: 'Video',
      },
      {
        id: 2,
        clientId: '10',
        start: new Date('2026-02-01T00:00:00Z'),
        overallTotal: 1500,
        unpaidValue: 0,
        type: 'Video',
      },
      {
        id: 3,
        clientId: '20',
        start: new Date('2026-03-01T00:00:00Z'),
        overallTotal: 500,
        unpaidValue: 500,
        type: 'Editing',
      },
    ];

    const collection = computeCollectionSummary(projects);
    expect(collection.invoiced).toBe(3000);
    expect(collection.collected).toBe(2300);
    expect(collection.collectionRate).toBeCloseTo(76.666, 2);

    expect(computeAverageProjectValue(projects)).toBe(1000);

    const typeBreakdown = computeProjectTypeBreakdown(projects);
    expect(typeBreakdown[0]).toMatchObject({ label: 'Video', count: 2, revenue: 2500 });

    const repeatShare = computeRepeatClientRevenueShare(projects.slice(1), projects);
    expect(repeatShare.repeatRevenue).toBe(1500);
    expect(repeatShare.newRevenue).toBe(500);
  });

  it('computes team, action summaries, deltas, and comparison windows', () => {
    const team = computeAssignedTeamSummary([
      { technicians: ['1', '2'] },
      { techniciansDetails: [{ id: '2' }, { id: '3' }] },
    ]);
    expect(team.uniqueMembers).toBe(3);
    expect(team.assignments).toBe(4);

    const actionable = computeActionableProjectsSummary([
      { overallTotal: 1000, severity: 'critical' },
      { overallTotal: 500, severity: 'warning' },
      { overallTotal: 700, severity: 'healthy' },
    ], (project) => ({ severity: project.severity }));
    expect(actionable).toEqual({
      actionCount: 2,
      actionRevenue: 1500,
      criticalCount: 1,
      warningCount: 1,
    });

    expect(computeMetricDelta(120, 100)).toMatchObject({ diff: 20, direction: 'up' });

    const month = buildComparisonWindows('month', new Date('2026-04-22T12:00:00Z'));
    expect(month.current?.start.getFullYear()).toBe(2026);
    expect(month.current?.start.getMonth()).toBe(3);
    expect(month.current?.start.getDate()).toBe(1);
    expect(month.previous?.start.getFullYear()).toBe(2026);
    expect(month.previous?.start.getMonth()).toBe(2);
    expect(month.previous?.start.getDate()).toBe(1);

    const year = buildComparisonWindows('year', new Date('2026-04-22T12:00:00Z'));
    expect(year.current?.start.getFullYear()).toBe(2026);
    expect(year.current?.start.getMonth()).toBe(0);
    expect(year.current?.start.getDate()).toBe(1);
    expect(year.previous?.start.getFullYear()).toBe(2025);
    expect(year.previous?.start.getMonth()).toBe(0);
    expect(year.previous?.start.getDate()).toBe(1);
  });
});
