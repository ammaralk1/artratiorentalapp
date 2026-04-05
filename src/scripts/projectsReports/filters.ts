import {
  isProjectClosed,
  isProjectEligibleForReports,
  resolveProjectPaymentState,
  type ProjectLike,
} from './financials';
import { normalizeText } from './formatting';

export interface ReportsFilters {
  search?: string;
  statuses?: string[];
  payment?: string;
  confirmed?: string;
  range?: string;
  startDate?: string;
  endDate?: string;
}

export function isStatusAllowed(project: ProjectLike, statuses: string[] = []): boolean {
  return statuses.includes(String(project.status || ''));
}

export function isPaymentAllowed(project: ProjectLike, payment: string = 'all'): boolean {
  if (payment === 'all') return true;
  return resolveProjectPaymentState(project) === payment;
}

export function isConfirmedAllowed(project: ProjectLike, confirmed: string = 'all'): boolean {
  if (!confirmed || confirmed === 'all' || confirmed === 'no') return true;
  const isConfirmed = project?.confirmed === true;
  if (confirmed === 'yes') return isConfirmed;
  if (confirmed === 'closed') return isProjectClosed(project);
  return true;
}

export function matchesSearch(project: ProjectLike & {
  title?: unknown;
  projectCode?: unknown;
  clientName?: unknown;
  clientCompany?: unknown;
  type?: unknown;
  description?: unknown;
}, searchTerm: string): boolean {
  if (!searchTerm) return true;
  const haystack = normalizeText([
    project.title,
    project.projectCode,
    project.clientName,
    project.clientCompany,
    project.type,
    project.description,
  ].filter(Boolean).join(' '));

  return haystack.includes(searchTerm);
}

export function isWithinRelativeRange(start: unknown, rangeStart: Date | null, now: Date): boolean {
  if (!start) return false;
  const date = start instanceof Date ? start : new Date(String(start));
  if (Number.isNaN(date.getTime())) return false;
  if (!rangeStart) return true;
  return date >= rangeStart && date <= now;
}

export function isWithinCustomRange(start: unknown, customStart: Date | null, customEnd: Date | null): boolean {
  if (!customStart && !customEnd) return true;
  if (!start) return false;
  const date = start instanceof Date ? start : new Date(String(start));
  if (Number.isNaN(date.getTime())) return false;

  const time = date.getTime();
  if (customStart && !Number.isNaN(customStart.getTime()) && time < customStart.getTime()) {
    return false;
  }
  if (customEnd && !Number.isNaN(customEnd.getTime()) && time > customEnd.getTime()) {
    return false;
  }
  return true;
}

export function filterProjectsForReports<T extends ProjectLike & {
  start?: unknown;
  cancelled?: unknown;
}>(projects: T[], filters: ReportsFilters, now: Date = new Date()): T[] {
  const {
    search = '',
    statuses = ['upcoming', 'ongoing', 'completed'],
    payment = 'all',
    confirmed = 'all',
    range = 'all',
    startDate = '',
    endDate = '',
  } = filters || {};

  const searchTerm = normalizeText(search);
  const rangeDays = Number(range);

  if (range === 'custom') {
    const rangeStart = startDate ? new Date(startDate) : null;
    const rangeEnd = endDate ? new Date(endDate) : null;
    return projects.filter((project) => {
      const statusValue = String(project?.status || '').toLowerCase();
      if (project?.cancelled === true || statusValue === 'cancelled' || statusValue === 'canceled') return false;
      if (!isProjectEligibleForReports(project)) return false;
      if (!isStatusAllowed(project, statuses)) return false;
      if (!isPaymentAllowed(project, payment)) return false;
      if (!matchesSearch(project as never, searchTerm)) return false;
      if (!isConfirmedAllowed(project, confirmed)) return false;
      return isWithinCustomRange(project.start, rangeStart, rangeEnd);
    });
  }

  let rangeStart: Date | null = null;
  if (range !== 'all' && Number.isFinite(rangeDays)) {
    rangeStart = new Date(now);
    rangeStart.setDate(now.getDate() - rangeDays);
  }

  return projects.filter((project) => {
    const statusValue = String(project?.status || '').toLowerCase();
    if (project?.cancelled === true || statusValue === 'cancelled' || statusValue === 'canceled') return false;
    if (!isProjectEligibleForReports(project)) return false;
    if (!isStatusAllowed(project, statuses)) return false;
    if (!isPaymentAllowed(project, payment)) return false;
    if (!matchesSearch(project as never, searchTerm)) return false;
    if (!isConfirmedAllowed(project, confirmed)) return false;
    if (range === 'all') return true;
    return isWithinRelativeRange(project.start, rangeStart, now);
  });
}
