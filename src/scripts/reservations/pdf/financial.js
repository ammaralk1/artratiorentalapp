import { state } from './state.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { t } from '../../language.js';
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculateReservationDays,
  calculateReservationTotal,
  calculatePaymentProgress,
  determinePaymentStatus,
  calculateDraftFinancialBreakdown,
  calculateOverheadInclusiveAmounts,
} from '../../reservationsSummary.js';
import { PROJECT_TAX_RATE } from '../../projects/constants.js';
import { resolveProjectOverheadSettings } from '../../projects/helpers.js';
import { calculateProjectLineFinancials } from '../../projects/financials.js';
import { parsePriceValue } from '../../reservationsShared.js';

// Format numbers with thousands separators and 2 decimals, localized to our digits via normalizeNumbers
export function formatMoney(value) {
  const num = Number(value);
  const safe = Number.isFinite(num) ? num : 0;
  try {
    const hasFraction = Math.abs(safe % 1) > 1e-9;
    return normalizeNumbers(safe.toLocaleString('en-US', {
      minimumFractionDigits: hasFraction ? 2 : 0,
      maximumFractionDigits: 2
    }));
  } catch (_) {
    if (Number.isInteger(safe)) return normalizeNumbers(String(safe));
    return normalizeNumbers(safe.toFixed(2));
  }
}

export function formatCurrencyValue(value, currencyLabel = 'SR', fractionDigits = 2) {
  const number = Number(value);
  return `${formatMoney(number)} ${currencyLabel}`;
}

export function formatPercentageValue(value, fractionDigits = 2) {
  if (!Number.isFinite(Number(value))) {
    return '0%';
  }
  const digits = Number.isInteger(fractionDigits) ? fractionDigits : 2;
  return `${normalizeNumbers(Number(value).toFixed(digits))}%`;
}

export function isCompanyShareEnabledForState() {
  if (!state.activeQuoteState) return false;
  const context = state.activeQuoteState.context || 'reservation';
  if (context === 'project') {
    const project = state.activeQuoteState.project || {};
    if ([
      project.companyShareEnabled,
      project.company_share_enabled,
      project.companyShareApplied,
      project.company_share_applied,
    ].some((value) => value === true || value === 'true')) {
      return true;
    }
    const totals = state.activeQuoteState.projectTotals || {};
    if (Number.isFinite(Number(totals.companyShareAmount)) && Number(totals.companyShareAmount) > 0) {
      return true;
    }
    return false;
  }
  const reservation = state.activeQuoteState.reservation || {};
  if ([
    reservation.companyShareEnabled,
    reservation.company_share_enabled,
    reservation.companyShareApplied,
    reservation.company_share_applied,
  ].some((value) => value === true || value === 'true')) {
    return true;
  }
  const totals = state.activeQuoteState.totals || {};
  return Number.isFinite(Number(totals.companyShareAmount)) && Number(totals.companyShareAmount) > 0;
}

export function isTaxEnabledForShare() {
  if (!state.activeQuoteState) return false;
  const context = state.activeQuoteState.context || 'reservation';
  if (context === 'project') {
    const project = state.activeQuoteState.project || {};
    if ([project.applyTax, project.apply_tax].some((value) => value === true || value === 'true')) {
      return true;
    }
    const totals = state.activeQuoteState.projectTotals || {};
    if ([totals.applyTax].some((value) => value === true || value === 'true')) {
      return true;
    }
    return Number.isFinite(Number(totals.taxAmount)) && Number(totals.taxAmount) > 0;
  }
  const reservation = state.activeQuoteState.reservation || {};
  if ([
    reservation.applyTax,
    reservation.apply_tax,
    reservation.taxApplied,
    reservation.tax_applied,
  ].some((value) => value === true || value === 'true')) {
    return true;
  }
  const totals = state.activeQuoteState.totals || {};
  return Number.isFinite(Number(totals.taxAmount)) && Number(totals.taxAmount) > 0;
}

export function shouldDisplayCompanyShareOnItems() {
  return isCompanyShareEnabledForState() && isTaxEnabledForShare();
}

export function resolveCompanySharePercentFromState() {
  if (!state.activeQuoteState) return null;
  const context = state.activeQuoteState.context || 'reservation';
  const sources = context === 'project'
    ? [
        state.activeQuoteState.project?.companySharePercent,
        state.activeQuoteState.project?.company_share_percent,
        state.activeQuoteState.project?.companyShare,
        state.activeQuoteState.project?.company_share,
        state.activeQuoteState.projectTotals?.companySharePercent,
        state.activeQuoteState.projectTotals?.projectSharePercent,
      ]
    : [
        state.activeQuoteState.reservation?.companySharePercent,
        state.activeQuoteState.reservation?.company_share_percent,
        state.activeQuoteState.reservation?.companyShare,
        state.activeQuoteState.reservation?.company_share,
        state.activeQuoteState.totals?.companySharePercent,
      ];
  for (let i = 0; i < sources.length; i += 1) {
    const value = sources[i];
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) {
      return numeric;
    }
  }
  return null;
}

export function getActiveCompanySharePercent() {
  if (!isCompanyShareEnabledForState()) {
    return 0;
  }
  const resolved = resolveCompanySharePercentFromState();
  if (Number.isFinite(resolved) && resolved > 0) {
    return resolved;
  }
  return DEFAULT_COMPANY_SHARE_PERCENT;
}

export function getCompanyShareMultiplier() {
  if (!shouldDisplayCompanyShareOnItems()) {
    return 1;
  }
  const percent = getActiveCompanySharePercent();
  if (!(percent > 0)) {
    return 1;
  }
  return 1 + (percent / 100);
}

export function applyCompanyShareToUnitAmount(value) {
  const base = Number(value);
  if (!Number.isFinite(base) || base <= 0) {
    return base;
  }
  const multiplier = getCompanyShareMultiplier();
  if (multiplier === 1) {
    return base;
  }
  return Number((base * multiplier).toFixed(2));
}

export function parsePaymentNumber(value) {
  if (value == null || value === '') return null;
  const normalized = Number.parseFloat(normalizeNumbers(String(value)));
  return Number.isFinite(normalized) ? normalized : null;
}

export function resolveRecordedAt(value) {
  if (!value) return new Date().toISOString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}

export function normalizePaymentHistoryEntryForView(entry) {
  if (!entry || typeof entry !== 'object') return null;

  const typeRaw = entry.type ?? entry.payment_type ?? entry.paymentType ?? null;
  let type = typeof typeRaw === 'string' ? typeRaw.trim().toLowerCase() : null;
  if (type !== 'percent') {
    type = 'amount';
  }

  const amount = parsePaymentNumber(entry.amount ?? (type === 'amount' ? entry.value : null));
  const percentage = parsePaymentNumber(entry.percentage ?? (type === 'percent' ? entry.value : null));
  const value = type === 'percent'
    ? (percentage != null ? percentage : null)
    : (amount != null ? amount : null);
  const note = entry.note ?? entry.memo ?? null;
  const recordedAt = resolveRecordedAt(entry.recordedAt ?? entry.recorded_at ?? entry.date ?? entry.created_at ?? null);

  if (type === 'amount' && amount == null) {
    return null;
  }

  if (type === 'percent' && percentage == null) {
    return null;
  }

  return {
    type,
    amount: amount != null ? amount : null,
    percentage: percentage != null ? percentage : null,
    value,
    note,
    recordedAt
  };
}

export function normalizeProjectPaymentHistoryForView(project = {}) {
  const rawHistory = Array.isArray(project.paymentHistory)
    ? project.paymentHistory
    : Array.isArray(project.payment_history)
      ? project.payment_history
      : [];

  const normalized = rawHistory
    .map(normalizePaymentHistoryEntryForView)
    .filter(Boolean);

  if (normalized.length > 0) {
    return normalized;
  }

  const basePercent = parsePaymentNumber(project.paidPercent ?? project.paid_percent);
  const baseAmount = parsePaymentNumber(project.paidAmount ?? project.paid_amount);
  const recordedAtRaw = project.updatedAt
    ?? project.updated_at
    ?? project.createdAt
    ?? project.created_at
    ?? null;
  const recordedAt = resolveRecordedAt(recordedAtRaw);

  if (basePercent != null && basePercent > 0) {
    return [
      {
        type: 'percent',
        amount: baseAmount != null && baseAmount > 0 ? baseAmount : null,
        percentage: basePercent,
        value: basePercent,
        note: null,
        recordedAt
      }
    ];
  }

  if (baseAmount != null && baseAmount > 0) {
    return [
      {
        type: 'amount',
        amount: baseAmount,
        percentage: null,
        value: baseAmount,
        note: null,
        recordedAt
      }
    ];
  }

  return [];
}

export function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social'
  }[type] || 'projects.form.types.unknown';
  return t(key, type);
}

export function determineProjectStatusFromDates(project) {
  const now = new Date();
  const start = project?.start ? new Date(project.start) : null;
  const end = project?.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }

  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }

  return 'ongoing';
}

export function getProjectExpensesTotal(project) {
  // Prefer per-item sale prices when available so subtotal matches row values.
  if (Array.isArray(project?.expenses)) {
    const hasAnySale = project.expenses.some((exp) => Number.isFinite(Number(exp?.salePrice ?? exp?.sale_price)));
    if (hasAnySale) {
      return project.expenses.reduce((sum, exp) => {
        const unitPrice = Number(exp?.salePrice ?? exp?.sale_price) || 0;
        const rawDays = Number(exp?.days ?? exp?.service_days ?? exp?.serviceDays ?? 1);
        const days = Number.isFinite(rawDays) && rawDays > 0 ? rawDays : 1;
        return sum + (unitPrice * days);
      }, 0);
    }
  }

  // Next prefer explicit services client price total if provided by backend/UI
  const servicesClient = Number(project?.servicesClientPrice ?? project?.services_client_price);
  if (Number.isFinite(servicesClient) && servicesClient >= 0) {
    return servicesClient;
  }

  // Fallbacks: stored expensesTotal or sum of raw amounts (costs)
  if (typeof project?.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project?.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense?.amount) || 0), 0);
  }
  return 0;
}

export function resolveProjectTotalsForPdf(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const expensesTotal = getProjectExpensesTotal(project);
  const servicesClientPrice = Number(project?.servicesClientPrice ?? project?.services_client_price ?? expensesTotal) || 0;
  const { applyTax, sharePercent } = resolveProjectOverheadSettings(project, {
    applyTaxRaw: project?.applyTax === true || project?.applyTax === 'true',
  });
  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: equipmentEstimate,
    servicesRevenue: servicesClientPrice,
    servicesCost: expensesTotal,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled: sharePercent > 0,
    companySharePercent: sharePercent,
  });

  const discountAmount = clientAmounts.discountAmount;
  const subtotalAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;
  const subtotal = clientAmounts.taxableAmount;

  return {
    equipmentEstimate,
    expensesTotal,
    baseSubtotal: clientAmounts.baseSubtotal,
    clientSubtotalBeforeDiscount: clientAmounts.clientSubtotalBeforeDiscount,
    discountAmount,
    subtotalAfterDiscount,
    companyShareAmount,
    subtotal,
    applyTax,
    taxAmount: clientAmounts.taxAmount,
    totalWithTax: clientAmounts.totalWithTax
  };
}

export function resolveReservationNetTotalForProject(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
  const techniciansOrAssignments = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    techniciansOrAssignments,
    { start: reservation.start, end: reservation.end, companySharePercent: 0 }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

export function combineProjectDateRange(start, end) {
  if (!start) return '—';
  const startText = formatDateTime(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTime(end)}`;
}

export function calculateProjectDurationDays(project) {
  if (!project?.start) return null;
  if (!project?.end) return 1;
  const days = calculateReservationDays(project.start, project.end);
  return Number.isFinite(days) ? days : 1;
}

export function formatProjectDurationLabel(days) {
  if (!Number.isFinite(days)) return 'غير محدد';
  if (days <= 1) return 'يوم واحد';
  return `${normalizeNumbers(String(Math.round(days)))} أيام`;
}
