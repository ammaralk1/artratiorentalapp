import { calculateDraftFinancialBreakdown } from '../reservationsSummary.js';
import { calculateProjectLineFinancials } from '../projects/financials.js';
import {
  getProjectExpenses,
  getProjectServicesRevenue,
  getReservationsForProject,
  type ProjectLike,
  type ReservationLike,
} from './financials';

export interface ReservationRevenueTotals {
  equipment: number;
  equipmentCost: number;
  crew: number;
  crewCost: number;
}

export interface ProjectCommercialTotals {
  reservations: ReservationLike[];
  agg: ReservationRevenueTotals;
  projectEquipmentRevenue: number;
  servicesRevenue: number;
  projectExpenses: number;
  grossBeforeDiscount: number;
  discountAmount: number;
  baseAfterDiscount: number;
  applyTax: boolean;
  sharePercent: number;
  companyShareAmount: number;
  taxAmount: number;
  finalTotal: number;
}

interface ProjectCommercialLike extends ProjectLike {
  discount?: unknown;
  discountType?: unknown;
  applyTax?: unknown;
  apply_tax?: unknown;
  companyShareEnabled?: unknown;
  companySharePercent?: unknown;
  company_share_percent?: unknown;
  raw?: Record<string, unknown> | null;
}

interface ReservationCommercialLike extends ReservationLike {
  items?: unknown[] | null;
  crewAssignments?: unknown[] | null;
  techniciansDetails?: unknown[] | null;
  technicians?: unknown[] | null;
  discount?: unknown;
  discountType?: unknown;
  start?: unknown;
  end?: unknown;
}

interface PaymentRawLike extends Record<string, unknown> {
  paymentHistory?: Array<Record<string, unknown>>;
  payments?: Array<Record<string, unknown>>;
  paidAmount?: unknown;
  paid_amount?: unknown;
  paidPercent?: unknown;
  paid_percentage?: unknown;
}

function isTruthyFlag(value: unknown): boolean {
  if (value === true || value === 1 || value === '1') return true;
  return typeof value === 'string' && value.toLowerCase() === 'true';
}

export function aggregateReservationDraftTotals(
  reservations: ReservationCommercialLike[] | null | undefined,
): ReservationRevenueTotals {
  return (Array.isArray(reservations) ? reservations : []).reduce<ReservationRevenueTotals>((acc, reservation) => {
    const items = Array.isArray(reservation.items) ? reservation.items : [];
    const crewAssignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
      ? reservation.crewAssignments
      : (Array.isArray(reservation.techniciansDetails) ? reservation.techniciansDetails : []);
    const techniciansOrAssignments = crewAssignments.length
      ? crewAssignments
      : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
    const useAssignments = Array.isArray(techniciansOrAssignments)
      && techniciansOrAssignments.length
      && typeof techniciansOrAssignments[0] === 'object';
    const useTechnicianIds = Array.isArray(techniciansOrAssignments)
      && techniciansOrAssignments.length
      && typeof techniciansOrAssignments[0] !== 'object';
    const breakdown = calculateDraftFinancialBreakdown({
      items,
      technicianIds: (useTechnicianIds ? techniciansOrAssignments : []) as unknown[],
      crewAssignments: (useAssignments ? techniciansOrAssignments : []) as unknown[],
      discount: reservation.discount ?? 0,
      discountType: reservation.discountType || 'percent',
      applyTax: false,
      start: reservation.start,
      end: reservation.end,
    } as any) as Record<string, unknown>;

    acc.equipment += Number(breakdown.equipmentTotal || 0);
    acc.equipmentCost += Number(breakdown.equipmentCostTotal || 0);
    acc.crew += Number(breakdown.crewTotal || 0);
    acc.crewCost += Number(breakdown.crewCostTotal || 0);
    return acc;
  }, { equipment: 0, equipmentCost: 0, crew: 0, crewCost: 0 });
}

export function computeProjectCommercialTotals(
  project: ProjectCommercialLike,
  reservations: ReservationCommercialLike[] | null | undefined,
  taxRate: number,
): ProjectCommercialTotals {
  const linkedReservations = Array.isArray(reservations) ? reservations : [];
  const agg = aggregateReservationDraftTotals(linkedReservations);
  const projectEquipmentRevenue = linkedReservations.length
    ? 0
    : Number(project?.raw?.equipmentEstimate ?? project?.equipmentEstimate ?? 0) || 0;
  const servicesRevenue = getProjectServicesRevenue(project);
  const projectExpenses = Number(getProjectExpenses(project) || 0);
  const grossBeforeDiscount = projectEquipmentRevenue + agg.equipment + agg.crew + servicesRevenue;
  let applyTax = (() => {
    const value = (project?.applyTax !== undefined)
      ? project.applyTax
      : (project?.apply_tax ?? project?.raw?.apply_tax ?? project?.raw?.applyTax);
    return isTruthyFlag(value);
  })();
  const shareEnabled = (() => {
    const value = (project?.companyShareEnabled !== undefined)
      ? project.companyShareEnabled
      : (project?.raw?.company_share_enabled ?? project?.raw?.companyShareEnabled);
    return isTruthyFlag(value);
  })();
  const rawSharePercent = (() => {
    const value = (
      project?.raw?.company_share_percent
      ?? project?.raw?.companySharePercent
      ?? project?.companySharePercent
      ?? project?.company_share_percent
      ?? 0
    );
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  })();

  if (shareEnabled && rawSharePercent > 0) applyTax = true;
  const sharePercent = (shareEnabled && applyTax) ? rawSharePercent : 0;
  const discountVal = Number(project?.raw?.discount ?? project?.discount ?? 0) || 0;
  const discountType = (project?.raw?.discount_type ?? project?.discountType) === 'amount' ? 'amount' : 'percent';
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: projectEquipmentRevenue + agg.equipment,
    crewRevenue: agg.crew,
    servicesRevenue,
    equipmentCost: agg.equipmentCost,
    crewCost: agg.crewCost,
    servicesCost: projectExpenses,
    discountValue: discountVal,
    discountType,
    applyTax,
    companyShareEnabled: shareEnabled,
    companySharePercent: sharePercent,
    taxRate,
  });
  const discountAmount = clientAmounts.discountAmount;
  const baseAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;
  const taxAmount = clientAmounts.taxAmount;
  const finalTotal = clientAmounts.totalWithTax;

  return {
    reservations: linkedReservations,
    agg,
    projectEquipmentRevenue,
    servicesRevenue,
    projectExpenses,
    grossBeforeDiscount,
    discountAmount,
    baseAfterDiscount,
    applyTax,
    sharePercent,
    companyShareAmount,
    taxAmount,
    finalTotal,
  };
}

export function resolveProjectPaidAmount(project: ProjectCommercialLike, finalTotal: number): number {
  const raw = (project.raw || project) as PaymentRawLike;
  let paid = 0;
  const add = (value: unknown): void => {
    const number = Number(value);
    if (Number.isFinite(number) && number > 0) paid += number;
  };

  let usedExplicitHistory = false;
  try {
    const history = Array.isArray(raw.paymentHistory)
      ? raw.paymentHistory
      : (Array.isArray(raw.payments) ? raw.payments : []);
    if (Array.isArray(history) && history.length) {
      usedExplicitHistory = true;
      history.forEach((entry) => {
        const type = String(entry?.type || '').toLowerCase();
        const value = Number(entry?.value ?? entry?.amount ?? entry?.percentage ?? 0) || 0;
        if (type === 'percent' || type === 'percentage') {
          add((value / 100) * finalTotal);
        } else {
          add(value);
        }
      });
    }
  } catch {
    usedExplicitHistory = false;
  }

  if (!usedExplicitHistory) {
    add(raw?.paidAmount ?? raw?.paid_amount);
    const paidPercent = Number(raw?.paidPercent ?? raw?.paid_percentage);
    if (paidPercent > 0) add((paidPercent / 100) * finalTotal);
  }

  return Math.min(finalTotal, paid);
}

export function computeProjectsRevenueBreakdown(
  projects: ProjectCommercialLike[],
  reservations: ReservationCommercialLike[] | null | undefined,
  taxRate: number,
) {
  let grossRevenue = 0;
  let taxTotal = 0;
  let companyShareTotal = 0;
  let projectExpensesTotal = 0;
  let servicesRevenueTotal = 0;
  let outstandingTotal = 0;
  let netProfitTotal = 0;
  let discountTotal = 0;
  let equipmentTotalCombined = 0;
  let equipmentCostTotalCombined = 0;
  let crewTotal = 0;
  let crewCostTotal = 0;

  projects.forEach((project) => {
    const linkedReservations = getReservationsForProject(reservations, project.id);
    const summary = computeProjectCommercialTotals(project, linkedReservations, taxRate);

    equipmentTotalCombined += summary.agg.equipment + summary.projectEquipmentRevenue;
    equipmentCostTotalCombined += summary.agg.equipmentCost;
    crewTotal += summary.agg.crew;
    crewCostTotal += summary.agg.crewCost;
    grossRevenue += summary.finalTotal;
    taxTotal += summary.taxAmount;
    companyShareTotal += summary.companyShareAmount;
    projectExpensesTotal += summary.projectExpenses;
    servicesRevenueTotal += summary.servicesRevenue;
    discountTotal += Number(summary.discountAmount || 0);

    const perProjectNet = Number((
      summary.baseAfterDiscount
      - summary.companyShareAmount
      - summary.projectExpenses
      - (summary.agg.crewCost || 0)
      - (summary.agg.equipmentCost || 0)
    ).toFixed(2));
    netProfitTotal += perProjectNet;

    const paid = resolveProjectPaidAmount(project, summary.finalTotal);
    outstandingTotal += Math.max(0, summary.finalTotal - paid);
  });

  const revenueExTax = Math.max(0, grossRevenue - taxTotal);
  const netProfit = netProfitTotal;
  const profitMarginPercent = revenueExTax > 0 ? (netProfit / revenueExTax) * 100 : 0;

  return {
    grossRevenue,
    companyShareTotal,
    taxTotal,
    crewTotal,
    crewCostTotal,
    equipmentTotalCombined,
    equipmentCostTotalCombined,
    projectExpensesTotal,
    servicesRevenueTotal,
    outstandingTotal,
    netProfit,
    revenueExTax,
    profitMarginPercent,
    discountTotal,
  };
}
