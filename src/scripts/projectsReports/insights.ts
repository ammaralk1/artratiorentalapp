export interface InsightsProjectLike {
  id?: unknown;
  clientId?: unknown;
  clientName?: unknown;
  clientCompany?: unknown;
  type?: unknown;
  start?: Date | string | null;
  createdAt?: Date | string | null;
  overallTotal?: unknown;
  unpaidValue?: unknown;
  technicians?: Array<unknown> | null;
  techniciansDetails?: Array<Record<string, unknown>> | null;
}

export interface AttentionSummaryLike {
  severity: 'healthy' | 'warning' | 'critical';
}

export interface ComparisonWindow {
  start: Date;
  end: Date;
}

export type ComparisonMode = 'none' | 'month' | 'year';

function toFiniteNumber(value: unknown): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function clampMonthDay(year: number, monthIndex: number, day: number): Date {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  return new Date(year, monthIndex, Math.min(day, lastDay), 23, 59, 59, 999);
}

function normalizeClientKey(project: InsightsProjectLike): string {
  const clientId = String(project.clientId ?? '').trim();
  if (clientId) return `id:${clientId}`;
  const clientName = String(project.clientName ?? '').trim().toLowerCase();
  const clientCompany = String(project.clientCompany ?? '').trim().toLowerCase();
  if (clientName || clientCompany) return `name:${clientName}::${clientCompany}`;
  return '';
}

function resolveProjectTimestamp(project: InsightsProjectLike): number {
  const candidates = [project.start, project.createdAt];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const parsed = candidate instanceof Date ? candidate : new Date(String(candidate));
    const time = parsed.getTime();
    if (!Number.isNaN(time)) return time;
  }
  return Number.POSITIVE_INFINITY;
}

export function computeCollectionSummary(projects: InsightsProjectLike[]) {
  const totals = projects.reduce((accumulator, project) => {
    const invoiced = Math.max(0, toFiniteNumber(project.overallTotal));
    const outstanding = Math.max(0, toFiniteNumber(project.unpaidValue));
    const collected = Math.max(0, invoiced - outstanding);
    accumulator.invoiced += invoiced;
    accumulator.outstanding += outstanding;
    accumulator.collected += collected;
    return accumulator;
  }, {
    invoiced: 0,
    outstanding: 0,
    collected: 0,
  });

  return {
    ...totals,
    collectionRate: totals.invoiced > 0 ? (totals.collected / totals.invoiced) * 100 : 0,
  };
}

export function computeAverageProjectValue(projects: InsightsProjectLike[]): number {
  if (!Array.isArray(projects) || projects.length === 0) return 0;
  const total = projects.reduce((sum, project) => sum + Math.max(0, toFiniteNumber(project.overallTotal)), 0);
  return total / projects.length;
}

export function computeProjectTypeBreakdown(projects: InsightsProjectLike[]) {
  const buckets = new Map<string, { label: string; count: number; revenue: number }>();

  projects.forEach((project) => {
    const label = String(project.type ?? '').trim() || 'Unclassified';
    const current = buckets.get(label) || { label, count: 0, revenue: 0 };
    current.count += 1;
    current.revenue += Math.max(0, toFiniteNumber(project.overallTotal));
    buckets.set(label, current);
  });

  const totalRevenue = Array.from(buckets.values()).reduce((sum, bucket) => sum + bucket.revenue, 0);
  return Array.from(buckets.values())
    .sort((left, right) => right.revenue - left.revenue || right.count - left.count || left.label.localeCompare(right.label, 'ar'))
    .map((bucket) => ({
      ...bucket,
      sharePercent: totalRevenue > 0 ? (bucket.revenue / totalRevenue) * 100 : 0,
    }));
}

export function computeRepeatClientRevenueShare(
  selectedProjects: InsightsProjectLike[],
  allProjects: InsightsProjectLike[],
) {
  const history = [...allProjects]
    .map((project) => ({
      key: normalizeClientKey(project),
      timestamp: resolveProjectTimestamp(project),
      project,
    }))
    .filter((entry) => entry.key);

  const earliestByClient = new Map<string, number>();
  history.forEach((entry) => {
    const current = earliestByClient.get(entry.key);
    if (current == null || entry.timestamp < current) {
      earliestByClient.set(entry.key, entry.timestamp);
    }
  });

  let repeatRevenue = 0;
  let newRevenue = 0;

  selectedProjects.forEach((project) => {
    const key = normalizeClientKey(project);
    const revenue = Math.max(0, toFiniteNumber(project.overallTotal));
    if (!key) {
      newRevenue += revenue;
      return;
    }
    const firstTimestamp = earliestByClient.get(key);
    const projectTimestamp = resolveProjectTimestamp(project);
    if (firstTimestamp != null && Number.isFinite(projectTimestamp) && projectTimestamp > firstTimestamp) {
      repeatRevenue += revenue;
      return;
    }
    newRevenue += revenue;
  });

  const totalRevenue = repeatRevenue + newRevenue;
  return {
    repeatRevenue,
    newRevenue,
    repeatRevenueShare: totalRevenue > 0 ? (repeatRevenue / totalRevenue) * 100 : 0,
  };
}

export function computeAssignedTeamSummary(projects: InsightsProjectLike[]) {
  const uniqueMembers = new Set<string>();
  let assignments = 0;

  projects.forEach((project) => {
    const details = Array.isArray(project.techniciansDetails) ? project.techniciansDetails : [];
    const identifiers = Array.isArray(project.technicians) ? project.technicians : [];
    if (details.length) {
      details.forEach((detail) => {
        const identifier = String(detail?.id ?? detail?.technician_id ?? detail?.technicianId ?? '').trim();
        if (!identifier) return;
        uniqueMembers.add(identifier);
        assignments += 1;
      });
      return;
    }
    identifiers.forEach((value) => {
      const identifier = String(value ?? '').trim();
      if (!identifier) return;
      uniqueMembers.add(identifier);
      assignments += 1;
    });
  });

  return {
    uniqueMembers: uniqueMembers.size,
    assignments,
  };
}

export function computeActionableProjectsSummary<T extends InsightsProjectLike>(
  projects: T[],
  assessAttention: (project: T) => AttentionSummaryLike,
) {
  return projects.reduce((summary, project) => {
    const assessment = assessAttention(project);
    if (assessment.severity === 'healthy') return summary;
    summary.actionCount += 1;
    summary.actionRevenue += Math.max(0, toFiniteNumber(project.overallTotal));
    if (assessment.severity === 'critical') {
      summary.criticalCount += 1;
    } else {
      summary.warningCount += 1;
    }
    return summary;
  }, {
    actionCount: 0,
    actionRevenue: 0,
    criticalCount: 0,
    warningCount: 0,
  });
}

export function computeMetricDelta(currentValue: number, previousValue: number) {
  const current = toFiniteNumber(currentValue);
  const previous = toFiniteNumber(previousValue);
  const diff = current - previous;
  const percent = previous !== 0 ? (diff / previous) * 100 : null;
  return {
    diff,
    percent,
    direction: diff === 0 ? 'flat' : (diff > 0 ? 'up' : 'down'),
  };
}

export function buildComparisonWindows(
  mode: ComparisonMode,
  now: Date = new Date(),
): { current: ComparisonWindow | null; previous: ComparisonWindow | null } {
  if (mode === 'none') {
    return { current: null, previous: null };
  }

  if (mode === 'month') {
    const currentStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const currentEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    const previousEnd = clampMonthDay(previousStart.getFullYear(), previousStart.getMonth(), now.getDate());
    return {
      current: { start: currentStart, end: currentEnd },
      previous: { start: previousStart, end: previousEnd },
    };
  }

  const currentStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  const currentEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const previousStart = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
  const previousEnd = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), 23, 59, 59, 999);
  return {
    current: { start: currentStart, end: currentEnd },
    previous: { start: previousStart, end: previousEnd },
  };
}

export function formatInputDate(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
