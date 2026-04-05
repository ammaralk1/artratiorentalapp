import { normalizeNumbers } from '../utils.js';
import { computeReservationFinancials } from '../reports/calculations.js';

export interface ProjectLike {
  id?: unknown;
  start?: Date | string | null;
  end?: Date | string | null;
  confirmed?: boolean | string | null;
  cancelled?: boolean | string | null;
  status?: unknown;
  equipmentEstimate?: unknown;
  expensesTotal?: unknown;
  expenses?: Array<Record<string, unknown>> | null;
  servicesClientPrice?: unknown;
  services_client_price?: unknown;
  overallTotal?: unknown;
  raw?: Record<string, unknown> | null;
}

export interface ReservationLike {
  projectId?: unknown;
  project_id?: unknown;
  id?: unknown;
  [key: string]: unknown;
}

interface ProjectRawLike extends Record<string, unknown> {
  status?: unknown;
  project_status?: unknown;
  projectStatus?: unknown;
  state?: unknown;
  project_state?: unknown;
  projectState?: unknown;
  status_label?: unknown;
  statusLabel?: unknown;
  closed?: unknown;
  isClosed?: unknown;
  is_closed?: unknown;
  closed_at?: unknown;
  closedAt?: unknown;
  paymentHistory?: Array<Record<string, unknown>>;
  payments?: Array<Record<string, unknown>>;
  paidAmount?: unknown;
  paid_amount?: unknown;
  paidPercent?: unknown;
  paid_percentage?: unknown;
  equipmentEstimate?: unknown;
  servicesClientPrice?: unknown;
  services_client_price?: unknown;
  expenses?: Array<Record<string, unknown>>;
}

const CLOSED_STATUS_KEYWORDS = new Set([
  'completed',
  'closed',
  'done',
  'finished',
  'resolved',
  'مغلق',
  'مكتمل',
  'منتهي',
  'منتهية',
]);

export function normalizeStatusValue(value: unknown): string {
  if (value == null) return '';
  return String(value).trim().toLowerCase();
}

export function getReservationsForProject<T extends ReservationLike = ReservationLike>(
  reservations: T[] | null | undefined,
  projectId: unknown,
): T[] {
  if (!Array.isArray(reservations)) return [];
  return reservations.filter((reservation) => String(reservation?.projectId ?? reservation?.project_id ?? '') === String(projectId));
}

export function isProjectClosed(project: ProjectLike | null | undefined): boolean {
  if (!project) return false;

  const raw = (project.raw || project) as ProjectRawLike;
  const candidates = [
    raw?.status,
    raw?.project_status,
    raw?.projectStatus,
    raw?.state,
    raw?.project_state,
    raw?.projectState,
    raw?.status_label,
    raw?.statusLabel,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeStatusValue(candidate);
    if (!normalized) continue;
    if (CLOSED_STATUS_KEYWORDS.has(normalized) || normalized.includes('closed')) {
      return true;
    }
  }

  const flags = [raw?.closed, raw?.isClosed, raw?.is_closed, raw?.closed_at, raw?.closedAt];
  return flags.some((flag) => {
    if (flag == null) return false;
    if (flag === true) return true;
    if (typeof flag === 'number') return flag === 1;
    const normalized = normalizeStatusValue(flag);
    return normalized === 'true' || normalized === 'yes';
  });
}

export function isProjectEligibleForReports(project: ProjectLike | null | undefined): boolean {
  if (!project || Boolean(project.cancelled)) return false;
  if (project.confirmed === true) return true;
  return isProjectClosed(project);
}

export function getProjectExpenses(project: ProjectLike | null | undefined): number {
  if (!project) return 0;

  if (typeof project.expensesTotal === 'number') {
    return Number(project.expensesTotal) || 0;
  }

  if (Array.isArray(project.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  }

  return 0;
}

export function getProjectServicesRevenue(project: ProjectLike | null | undefined): number {
  const direct = Number(
    project?.servicesClientPrice
      ?? project?.services_client_price
      ?? project?.raw?.servicesClientPrice
      ?? project?.raw?.services_client_price
      ?? 0,
  ) || 0;

  if (direct > 0) return direct;

  const expenses = Array.isArray(project?.expenses)
    ? project.expenses
    : (Array.isArray(project?.raw?.expenses) ? project.raw.expenses as Array<Record<string, unknown>> : []);

  if (!expenses.length) return 0;

  const parseNum = (value: unknown): number => {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    if (value == null || value === '') return 0;
    const cleaned = normalizeNumbers(String(value)).replace(/[^\d.+-]/g, '');
    const parsed = Number.parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return expenses.reduce((sum, expense) => sum + parseNum(expense?.salePrice ?? expense?.sale_price ?? 0), 0);
}

export function determineProjectStatus(project: ProjectLike): 'upcoming' | 'ongoing' | 'completed' {
  const now = new Date();
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }
  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }
  return 'ongoing';
}

export function resolveProjectPaymentState(project: ProjectLike | null | undefined): 'paid' | 'partial' | 'unpaid' {
  try {
    const raw = ((project?.raw || project || {}) as ProjectRawLike);
    const finalTotal = Number(project?.overallTotal || 0) || 0;
    let paid = 0;
    const add = (value: unknown): void => {
      const number = Number(value);
      if (Number.isFinite(number) && number > 0) paid += number;
    };

    const history = Array.isArray(raw.paymentHistory)
      ? raw.paymentHistory
      : (Array.isArray(raw.payments) ? raw.payments : []);

    if (Array.isArray(history) && history.length) {
      history.forEach((entry) => {
        const type = String(entry?.type || '').toLowerCase();
        const value = Number(entry?.value ?? entry?.amount ?? entry?.percentage ?? 0) || 0;
        if (type === 'percent' || type === 'percentage') {
          add((value / 100) * finalTotal);
        } else {
          add(value);
        }
      });
    } else {
      add(raw?.paidAmount ?? raw?.paid_amount);
      const paidPercent = Number(raw?.paidPercent ?? raw?.paid_percentage);
      if (paidPercent > 0) {
        add((paidPercent / 100) * finalTotal);
      }
    }

    const epsilon = 0.01;
    if (finalTotal <= 0) return paid > 0 ? 'partial' : 'unpaid';

    const outstanding = Math.max(0, finalTotal - paid);
    if (outstanding <= epsilon) return 'paid';
    return paid > 0 ? 'partial' : 'unpaid';
  } catch {
    return 'unpaid';
  }
}

export function computeProjectMetrics(project: ProjectLike, reservations: ReservationLike[]): {
  resFinal: number;
  resTax: number;
  resNetRevenue: number;
  equipmentEstimate: number;
  servicesRevenue: number;
  projectExpenses: number;
  netProfit: number;
  marginPercent: number;
} {
  let resFinal = 0;
  let resTax = 0;
  let resNetRevenue = 0;

  reservations.forEach((reservation) => {
    const financials = computeReservationFinancials(reservation);
    const finalTotal = Number(financials.finalTotal || 0);
    const taxAmount = Number(financials.taxAmount || 0);
    resFinal += finalTotal;
    resTax += taxAmount;
    resNetRevenue += (finalTotal - taxAmount);
  });

  const equipmentEstimate = Number(project?.raw?.equipmentEstimate ?? project?.equipmentEstimate ?? 0) || 0;
  const servicesRevenue = Number(project?.raw?.servicesClientPrice ?? project?.servicesClientPrice ?? 0) || 0;
  const projectExpenses = Number(project?.expensesTotal ?? 0) || 0;
  const revenueExTax = resNetRevenue + equipmentEstimate + servicesRevenue;
  const netProfit = resNetRevenue + (servicesRevenue - projectExpenses);
  const marginPercent = revenueExTax > 0 ? (netProfit / revenueExTax) * 100 : 0;

  return {
    resFinal,
    resTax,
    resNetRevenue,
    equipmentEstimate,
    servicesRevenue,
    projectExpenses,
    netProfit,
    marginPercent,
  };
}
