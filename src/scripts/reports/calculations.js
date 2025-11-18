import { normalizeText, resolveReservationProjectState, isReservationCompleted, parsePriceValue, sanitizePriceValue } from '../reservationsShared.js';
import { DEFAULT_COMPANY_SHARE_PERCENT, calculateDraftFinancialBreakdown } from '../reservationsSummary.js';
import { normalizeNumbers } from '../utils.js';
import reportsState from './state.js';
import { translate, formatDateInput, getMonthLabel } from './formatters.js';

const STATUS_MAP = new Map([
  ['confirmed', 'confirmed'],
  ['مؤكد', 'confirmed'],
  ['مؤكدة', 'confirmed'],
  ['approved', 'confirmed'],
  ['pending', 'pending'],
  ['قيد التأكيد', 'pending'],
  ['غير مؤكد', 'pending'],
  ['in-progress', 'pending'],
  ['awaiting', 'pending'],
  ['completed', 'completed'],
  ['منتهي', 'completed'],
  ['منتهية', 'completed'],
  ['مغلق', 'completed'],
  ['مغلقة', 'completed'],
  ['done', 'completed'],
  ['finished', 'completed'],
  ['cancelled', 'cancelled'],
  ['ملغي', 'cancelled'],
  ['ملغية', 'cancelled'],
  ['ملغى', 'cancelled'],
  ['canceled', 'cancelled'],
]);

const PAYMENT_MAP = new Map([
  ['paid', true],
  ['مدفوع', true],
  ['مدفوعة', true],
  ['تم الدفع', true],
  ['completed', true],
  ['unpaid', false],
  ['غير مدفوع', false],
  ['غير مدفوعة', false],
  ['pending', false],
  ['قيد الدفع', false],
]);

export const REPORT_MS_PER_DAY = 24 * 60 * 60 * 1000;

// ------------------------------
// Memoization helpers (lightweight)
// ------------------------------
const __memo = {
  metrics: new Map(),
  trend: new Map(),
  status: new Map(),
  payment: new Map(),
  topCustomers: new Map(),
  topEquipment: new Map(),
  equipmentCost: new Map(),
};

function listSignature(list) {
  const len = Array.isArray(list) ? list.length : 0;
  if (len === 0) return '0|';
  const first = list[0] || {};
  const last = list[len - 1] || {};
  const a = `${first.id ?? first.reservationId ?? ''}-${first.start ?? ''}`;
  const b = `${last.id ?? last.reservationId ?? ''}-${last.start ?? ''}`;
  const locale = reportsState.formatters?.cachedLocale || 'ar';
  return `${len}|${a}|${b}|${locale}`;
}

function memoGet(cache, key) {
  return cache.get(key);
}

function memoSet(cache, key, value) {
  cache.set(key, value);
  if (cache.size > 64) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  return value;
}

export function normalizeSearchText(value) {
  return normalizeNumbers(String(value || '')).toLowerCase().trim();
}

export function normalizeBarcode(value) {
  return (value || '').toString().trim();
}

export function calculateReservationDaysForReports(start, end) {
  if (!start || !end) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 1;
  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) return 1;
  return Math.max(1, Math.ceil(diffMs / REPORT_MS_PER_DAY));
}

export function getTechnicianRecordById(id) {
  if (!id) return null;
  if (!reportsState.techniciansIndex) {
    reportsState.techniciansIndex = new Map((reportsState.data.technicians || []).map((tech) => [String(tech.id), tech]));
  }
  return reportsState.techniciansIndex.get(String(id)) || null;
}

export function resolveTechnicianDailyRateForReports(technician = {}) {
  const candidates = [
    technician.dailyWage,
    technician.daily_rate,
    technician.dailyRate,
    technician.wage,
    technician.rate,
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const parsed = Number.parseFloat(normalizeNumbers(String(value)));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return 0;
}

export function resolveTechnicianTotalRateForReports(technician = {}) {
  const candidates = [
    technician.dailyTotal,
    technician.daily_total,
    technician.totalRate,
    technician.total,
    technician.total_wage,
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const parsed = Number.parseFloat(normalizeNumbers(String(value)));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return resolveTechnicianDailyRateForReports(technician);
}

export function computeReservationFinancials(reservation) {
  if (!reservation) {
    return {
      rentalDays: 1,
      equipmentTotal: 0,
      equipmentCostTotal: 0,
      crewTotal: 0,
      crewCostTotal: 0,
      discountAmount: 0,
      subtotalAfterDiscount: 0,
      taxableAmount: 0,
      taxAmount: 0,
      finalTotal: 0,
      companySharePercent: 0,
      companyShareAmount: 0,
      netProfit: 0,
    };
  }

  if (reservation.__financials) {
    return reservation.__financials;
  }

  const rentalDays = calculateReservationDaysForReports(reservation.start, reservation.end);
  const discountValue = Number(reservation.discount ?? reservation.discountValue ?? 0) || 0;
  const discountTypeRaw = reservation.discountType || reservation.discount_type || 'percent';
  const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';
  const applyTaxFlag = reservation.applyTax === true
    || reservation.apply_tax === true
    || reservation.apply_tax === 1
    || reservation.apply_tax === '1';

  const rawCompanySharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share
    ?? null;
  const normalizedCompanyShare = rawCompanySharePercent != null
    ? parsePriceValue(rawCompanySharePercent)
    : Number.NaN;
  const shareEnabledRaw = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied
    ?? reservation.company_share_applied
    ?? null;
  const companySharePercentInput = (shareEnabledRaw === true && Number.isFinite(normalizedCompanyShare) && normalizedCompanyShare > 0)
    ? normalizedCompanyShare
    : null;

  const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
  const technicianIds = crewAssignments.length
    ? crewAssignments.map((assignment) => assignment?.technicianId).filter(Boolean)
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);

  const breakdown = calculateDraftFinancialBreakdown({
    items: Array.isArray(reservation.items) ? reservation.items : [],
    technicianIds,
    crewAssignments,
    discount: discountValue,
    discountType,
    applyTax: applyTaxFlag,
    start: reservation.start,
    end: reservation.end,
    companySharePercent: companySharePercentInput,
  });

  const storedCost = Number(reservation.cost);
  let finalTotal = breakdown.finalTotal;
  let taxAmount = breakdown.taxAmount;
  if (Number.isFinite(storedCost) && storedCost > 0) {
    finalTotal = sanitizePriceValue(storedCost);
    if (applyTaxFlag) {
      const adjustedTax = finalTotal - breakdown.taxableAmount;
      if (Number.isFinite(adjustedTax) && adjustedTax >= 0) {
        taxAmount = sanitizePriceValue(adjustedTax);
      }
    }
  }

  const normalized = {
    rentalDays: breakdown.rentalDays,
    equipmentTotal: breakdown.equipmentTotal,
    equipmentCostTotal: breakdown.equipmentCostTotal,
    crewTotal: breakdown.crewTotal,
    crewCostTotal: breakdown.crewCostTotal,
    discountAmount: breakdown.discountAmount,
    subtotalAfterDiscount: breakdown.subtotalAfterDiscount,
    taxableAmount: breakdown.taxableAmount,
    taxAmount,
    finalTotal,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    netProfit: breakdown.netProfit,
    companyShareEnabled: breakdown.companySharePercent > 0,
  };

  reservation.__financials = normalized;
  return normalized;
}

export function getProjectForReservation(reservation) {
  if (!reservation?.projectId) return null;
  return reportsState.data.projectsMap.get(String(reservation.projectId)) || null;
}

export function normalizeStatusValue(value = '') {
  const key = String(value).toLowerCase().trim();
  if (!key) return '';
  return STATUS_MAP.get(key) || key;
}

export function isReservationPaid(reservation) {
  const paymentFields = [
    reservation?.paymentStatus,
    reservation?.payment_status,
    reservation?.payment,
    reservation?.paymentState,
    reservation?.payment_state,
  ];

  for (const field of paymentFields) {
    const key = String(field || '').toLowerCase().trim();
    if (!key) continue;
    if (PAYMENT_MAP.has(key)) {
      return PAYMENT_MAP.get(key);
    }
  }

  return reservation?.paid === true || reservation?.paid === 'true';
}

export function computeReportStatus(reservation) {
  const project = getProjectForReservation(reservation);
  const projectState = resolveReservationProjectState(reservation, project);
  const projectStatus = normalizeStatusValue(projectState.projectStatus);

  let statusValue = normalizeStatusValue(
    reservation?.status
      ?? reservation?.reservationStatus
      ?? reservation?.reservation_status
      ?? reservation?.state
      ?? ''
  );

  if (projectState.projectLinked && projectStatus && statusValue !== 'cancelled') {
    statusValue = projectStatus;
  }

  // Keep explicit cancelled state; only fallback when status is missing
  if (!statusValue) {
    statusValue = projectState.effectiveConfirmed ? 'confirmed' : 'pending';
  }

  if (statusValue !== 'cancelled' && (isReservationCompleted(reservation) || projectStatus === 'completed')) {
    statusValue = 'completed';
  }

  let confirmed = projectState.effectiveConfirmed
    || statusValue === 'confirmed'
    || statusValue === 'completed';

  // If reservation is cancelled, do NOT mark as confirmed and do NOT override label
  if (statusValue === 'cancelled') {
    confirmed = false;
  }

  if (confirmed && statusValue !== 'completed' && statusValue !== 'cancelled') {
    statusValue = 'confirmed';
  }

  const paid = isReservationPaid(reservation);
  const paidStatus = reservation?.paidStatus
    ?? reservation?.paid_status
    ?? (paid ? 'paid' : 'unpaid');

  return {
    statusValue,
    confirmed,
    paid,
    paidStatus,
  };
}

export function getReservationStatusValue(reservation) {
  return computeReportStatus(reservation).statusValue;
}

export function calculateMetrics(reservations) {
  const total = reservations.length;
  let confirmed = 0;
  let completed = 0;
  let cancelled = 0;
  let paidCount = 0;
  let unpaidCount = 0; // includes unpaid and partially-paid (non-cancelled)
  let revenue = 0;
  let companyShareTotal = 0;
  let taxTotal = 0;
  let crewTotal = 0;
  let crewCostTotal = 0;
  let equipmentTotal = 0;
  let equipmentCostTotal = 0;
  let netProfit = 0;
  let outstandingTotal = 0;

  reservations.forEach((reservation) => {
    const { statusValue, confirmed: isConfirmed, paid, paidStatus } = computeReportStatus(reservation);
    if (statusValue === 'completed') {
      completed += 1;
    }
    if (statusValue === 'cancelled') {
      cancelled += 1;
    }
    if (isConfirmed) {
      confirmed += 1;
    }
    if (paid && statusValue !== 'cancelled') {
      paidCount += 1;
    }
    if (statusValue !== 'cancelled' && paidStatus !== 'paid') {
      unpaidCount += 1;
    }

    // لا تُحسب الحجوزات الملغية ضمن الإيرادات أو الضرائب أو نسب/تكاليف الطاقم
    if (statusValue !== 'cancelled') {
      const financials = computeReservationFinancials(reservation);
      revenue += financials.finalTotal;
      companyShareTotal += financials.companyShareAmount;
      taxTotal += financials.taxAmount;
      crewTotal += financials.crewTotal;
      crewCostTotal += financials.crewCostTotal ?? 0;
      equipmentTotal += financials.equipmentTotal ?? 0;
      equipmentCostTotal += financials.equipmentCostTotal ?? 0;
      netProfit += financials.netProfit;
      // اجمع المبلغ غير المدفوع (المستحق) عند توفره
      const outstanding = computeOutstandingAmount(reservation);
      if (Number.isFinite(outstanding) && outstanding > 0) {
        outstandingTotal += outstanding;
      }
    }
  });

  const average = total ? revenue / total : 0;

  return {
    total,
    confirmed,
    completed,
    cancelled,
    activeTotal: Math.max(0, total - cancelled),
    paidCount,
    unpaidCount,
    outstandingTotal,
    revenue,
    average,
    companyShareTotal,
    taxTotal,
    crewTotal,
    crewCostTotal,
    equipmentTotal,
    equipmentCostTotal,
    netProfit,
  };
}

export function resolveRange({ range, start, end }) {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  // Treat explicit start/end as custom range even if dropdown is elsewhere
  if (range === 'custom' || start || end) {
    const startDate = start ? new Date(`${start}T00:00:00`) : null;
    const endDate = end ? new Date(`${end}T23:59:59`) : null;
    return {
      startDate: isValidDate(startDate) ? startDate : null,
      endDate: isValidDate(endDate) ? endDate : null,
    };
  }

  let endDate = new Date(now);
  let startDate = null;

  switch (range) {
    case 'thisWeek': {
      const startOfWeek = new Date(now);
      const day = startOfWeek.getDay();
      const diff = ((day - 6) + 7) % 7;
      startOfWeek.setDate(startOfWeek.getDate() - diff);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      startDate = startOfWeek;
      endDate = endOfWeek;
      break;
    }
    case 'thisMonth': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    }
    case 'thisQuarter': {
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      endDate = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    }
    case 'thisYear': {
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 12, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    }
    case 'all':
    default:
      startDate = null;
      endDate = null;
      break;
  }

  if (startDate) {
    startDate.setHours(0, 0, 0, 0);
  }

  return { startDate, endDate };
}

export function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

export function calculateMaintenanceExpenses(maintenanceTickets, filters) {
  const { startDate, endDate } = resolveRange(filters);
  let total = 0;
  const items = [];

  (maintenanceTickets || []).forEach((ticket) => {
    if (!ticket) return;
    const rawCost = typeof ticket.repairCost === 'number'
      ? ticket.repairCost
      : Number.parseFloat(normalizeNumbers(String(ticket.repairCost ?? '')));
    if (!Number.isFinite(rawCost) || rawCost <= 0) {
      return;
    }

    const statusValue = String(ticket.statusRaw ?? ticket.status ?? '').toLowerCase();
    const isClosed = statusValue === 'closed'
      || statusValue === 'completed'
      || statusValue === 'cancelled';
    if (!isClosed) {
      return;
    }

    const resolvedAtRaw = ticket.resolvedAt ?? ticket.resolved_at ?? null;
    const reportedAtRaw = ticket.reportedAt ?? ticket.reported_at ?? null;
    const createdAtRaw = ticket.createdAt ?? ticket.created_at ?? null;

    const resolvedAt = resolvedAtRaw ? new Date(resolvedAtRaw) : null;
    const fallbackDate = reportedAtRaw ? new Date(reportedAtRaw) : (createdAtRaw ? new Date(createdAtRaw) : null);
    const pivotDate = resolvedAt && !Number.isNaN(resolvedAt.getTime()) ? resolvedAt
      : (fallbackDate && !Number.isNaN(fallbackDate.getTime()) ? fallbackDate : null);

    if (pivotDate) {
      if (startDate && pivotDate < startDate) return;
      if (endDate && pivotDate > endDate) return;
    }

    const normalizedCost = Math.round(rawCost * 100) / 100;
    total += normalizedCost;
    items.push({ id: ticket.id, cost: normalizedCost, date: pivotDate });
  });

  return {
    total,
    items,
  };
}

export function applyMaintenanceExpenses(metrics, maintenanceExpense) {
  const expense = Number.isFinite(maintenanceExpense) ? maintenanceExpense : 0;
  return {
    ...metrics,
    maintenanceExpense: expense,
    netProfit: (metrics.netProfit || 0) - expense,
  };
}

export function calculateMonthlyTrend(reservations) {
  const key = `trend:${listSignature(reservations)}`;
  const cached = memoGet(__memo.trend, key);
  if (cached) return cached;

  const now = new Date();
  const result = [];

  // Determine months span from filtered reservations; clamp between 6 and 12 months
  const starts = (reservations || [])
    .map((r) => (r?.start ? new Date(r.start) : null))
    .filter((d) => d && !Number.isNaN(d.getTime()));

  let monthsSpan = 6;
  let endAnchor = new Date(now.getFullYear(), now.getMonth(), 1);
  if (starts.length) {
    const min = new Date(Math.min(...starts.map((d) => d.getTime())));
    const max = new Date(Math.max(...starts.map((d) => d.getTime())));
    const startAnchor = new Date(min.getFullYear(), min.getMonth(), 1);
    endAnchor = new Date(max.getFullYear(), max.getMonth(), 1);
    const years = endAnchor.getFullYear() - startAnchor.getFullYear();
    const months = endAnchor.getMonth() - startAnchor.getMonth();
    const diff = years * 12 + months;
    monthsSpan = Math.min(12, Math.max(6, diff + 1));
  }

  for (let i = monthsSpan - 1; i >= 0; i -= 1) {
    const date = new Date(endAnchor.getFullYear(), endAnchor.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthReservations = reservations
      .filter((res) => {
        const start = res?.start ? new Date(res.start) : null;
        return start && start.getFullYear() === year && start.getMonth() === month;
      })
      .filter((res) => computeReportStatus(res).statusValue !== 'cancelled'); // exclude cancelled from trend

    const count = monthReservations.length;
    let revenue = 0;
    let netProfitTotal = 0;
    let companyShareTotal = 0;

    monthReservations.forEach((reservation) => {
      const financials = computeReservationFinancials(reservation);
      revenue += financials.finalTotal;
      netProfitTotal += financials.netProfit;
      companyShareTotal += financials.companyShareAmount;
    });

    const label = getMonthLabel(date);
    const periodStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const periodEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    result.push({
      label,
      count,
      revenue,
      netProfit: netProfitTotal,
      companyShare: companyShareTotal,
      periodStart,
      periodEnd,
      startInput: formatDateInput(periodStart),
      endInput: formatDateInput(periodEnd),
    });
  }

  // --- Enrich with MoM/YoY and Moving Average (3 months) ---
  try {
    // Build a month-key revenue map from provided reservations for YoY reference
    const monthRevenueMap = new Map(); // key: YYYY-MM => revenue
    (reservations || []).forEach((res) => {
      if (computeReportStatus(res).statusValue === 'cancelled') return;
      const start = res?.start ? new Date(res.start) : null;
      if (!start || Number.isNaN(start.getTime())) return;
      const keyYm = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`;
      const fin = computeReservationFinancials(res);
      const cur = monthRevenueMap.get(keyYm) || 0;
      monthRevenueMap.set(keyYm, cur + (Number(fin.finalTotal) || 0));
    });

    // Pre-calc moving average over this result window (revenue)
    const revSeries = result.map((r) => Number(r.revenue || 0));
    const movingAvg = result.map((_r, idx) => {
      if (idx < 2) return null; // require 3 points
      const sum = revSeries[idx] + revSeries[idx - 1] + revSeries[idx - 2];
      return sum / 3;
    });

    result.forEach((row, idx) => {
      // MoM change (revenue)
      const prev = idx > 0 ? Number(result[idx - 1]?.revenue || 0) : null;
      let momChange = null;
      if (prev != null && Number.isFinite(prev) && prev > 0) {
        momChange = ((Number(row.revenue || 0) - prev) / prev) * 100;
      }

      // YoY change (revenue) using monthRevenueMap if available
      const d = row.periodStart instanceof Date ? row.periodStart : null;
      let yoyChange = null;
      if (d && !Number.isNaN(d.getTime())) {
        const lastYearKey = `${d.getFullYear() - 1}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const ref = monthRevenueMap.get(lastYearKey);
        if (Number.isFinite(ref) && ref > 0) {
          yoyChange = ((Number(row.revenue || 0) - ref) / ref) * 100;
        }
      }

      row.momChange = momChange;
      row.yoyChange = yoyChange;
      row.movingAvgRevenue = movingAvg[idx];
    });
  } catch (_) {
    // ignore enrichment errors; return base result
  }

  return memoSet(__memo.trend, key, result);
}

export function calculateMonthlyStatusStack(reservations) {
  const now = new Date();
  const starts = (reservations || [])
    .map((r) => (r?.start ? new Date(r.start) : null))
    .filter((d) => d && !Number.isNaN(d.getTime()));
  let monthsSpan = 6;
  let endAnchor = new Date(now.getFullYear(), now.getMonth(), 1);
  if (starts.length) {
    const min = new Date(Math.min(...starts.map((d) => d.getTime())));
    const max = new Date(Math.max(...starts.map((d) => d.getTime())));
    const startAnchor = new Date(min.getFullYear(), min.getMonth(), 1);
    endAnchor = new Date(max.getFullYear(), max.getMonth(), 1);
    const years = endAnchor.getFullYear() - startAnchor.getFullYear();
    const months = endAnchor.getMonth() - startAnchor.getMonth();
    const diff = years * 12 + months;
    monthsSpan = Math.min(12, Math.max(6, diff + 1));
  }
  const rows = [];
  for (let i = monthsSpan - 1; i >= 0; i -= 1) {
    const date = new Date(endAnchor.getFullYear(), endAnchor.getMonth() - i, 1);
    const y = date.getFullYear();
    const m = date.getMonth();
    let confirmed = 0;
    let cancelled = 0;
    (reservations || []).forEach((res) => {
      const start = res?.start ? new Date(res.start) : null;
      if (!start || start.getFullYear() !== y || start.getMonth() !== m) return;
      const { statusValue, confirmed: conf } = computeReportStatus(res);
      if (statusValue === 'cancelled') {
        cancelled += 1;
      } else if (conf || statusValue === 'confirmed' || statusValue === 'completed') {
        confirmed += 1;
      }
    });
    rows.push({ label: getMonthLabel(date), confirmed, cancelled });
  }
  return rows;
}

export function calculateStatusBreakdown(reservations) {
  const key = `status:${listSignature(reservations)}`;
  const cached = memoGet(__memo.status, key);
  if (cached) return cached;
  const counts = {
    confirmed: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  };

  (reservations || []).forEach((reservation) => {
    const { statusValue, confirmed } = computeReportStatus(reservation);
    if (statusValue === 'completed') {
      counts.completed += 1;
    } else if (statusValue === 'cancelled') {
      counts.cancelled += 1;
    } else if (statusValue === 'confirmed' || confirmed) {
      counts.confirmed += 1;
    } else {
      counts.pending += 1;
    }
  });

  const total = Math.max(1, (reservations || []).length);
  const confirmedCount = counts.confirmed;
  const pending = counts.pending;
  const completed = counts.completed;
  const cancelled = counts.cancelled;

  const out = [
    {
      label: translate('reservations.reports.status.confirmedLabel', 'مؤكدة', 'Confirmed'),
      value: confirmedCount,
      percent: Math.round((confirmedCount / total) * 100) || 0,
      rawCount: confirmedCount,
      className: 'status-confirmed',
      filterKey: 'confirmed',
    },
    {
      label: translate('reservations.reports.status.pendingLabel', 'قيد التأكيد', 'Pending confirmation'),
      value: pending,
      percent: Math.round((pending / total) * 100) || 0,
      rawCount: pending,
      className: 'status-pending',
      filterKey: 'pending',
    },
    {
      label: translate('reservations.reports.status.completedLabel', 'مغلقة', 'Closed'),
      value: completed,
      percent: Math.round((completed / total) * 100) || 0,
      rawCount: completed,
      className: 'status-completed',
      filterKey: 'completed',
    },
    {
      label: translate('reservations.reports.status.cancelledLabel', 'ملغاة', 'Cancelled'),
      value: cancelled,
      percent: Math.round((cancelled / total) * 100) || 0,
      rawCount: cancelled,
      className: 'status-cancelled',
      filterKey: 'cancelled',
    },
  ];
  return memoSet(__memo.status, key, out);
}

export function calculatePaymentBreakdown(reservations) {
  const key = `payment:${listSignature(reservations)}`;
  const cached = memoGet(__memo.payment, key);
  if (cached) return cached;
  const total = reservations.length || 1;
  let paid = 0; let partial = 0; let unpaid = 0;
  (reservations || []).forEach((reservation) => {
    const { paidStatus } = computeReportStatus(reservation);
    if (paidStatus === 'paid') paid += 1;
    else if (paidStatus === 'partial') partial += 1;
    else unpaid += 1;
  });

  const out = [
    {
      label: translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid'),
      value: paid,
      percent: Math.round((paid / total) * 100) || 0,
      rawCount: paid,
      className: 'status-paid',
      filterKey: 'paid',
    },
    {
      label: translate('reservations.reports.payment.partialLabel', 'مدفوعة جزئياً', 'Partially paid'),
      value: partial,
      percent: Math.round((partial / total) * 100) || 0,
      rawCount: partial,
      className: 'status-partial',
      filterKey: 'partial',
    },
    {
      label: translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid'),
      value: unpaid,
      percent: Math.round((unpaid / total) * 100) || 0,
      rawCount: unpaid,
      className: 'status-unpaid',
      filterKey: 'unpaid',
    },
  ];
  return memoSet(__memo.payment, key, out);
}

export function calculateTopCustomers(reservations, customers) {
  const key = `topCustomers:${listSignature(reservations)}`;
  const cached = memoGet(__memo.topCustomers, key);
  if (cached) return cached;
  const totals = new Map();
  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));

  reservations.forEach((res) => {
    const { statusValue } = computeReportStatus(res);
    // استبعاد الحجوزات الملغاة من أفضل العملاء
    if (statusValue === 'cancelled') return;
    const key = String(res?.customerId ?? 'unknown');
    const entry = totals.get(key) || { count: 0, revenue: 0 };
    const financials = computeReservationFinancials(res);
    entry.count += 1;
    entry.revenue += financials.finalTotal;
    totals.set(key, entry);
  });

  const out = Array.from(totals.entries())
    .map(([id, data]) => {
      const customer = customerMap.get(id);
      return {
        name: customer?.customerName
          || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer'),
        count: data.count,
        revenue: data.revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  return memoSet(__memo.topCustomers, key, out);
}

export function calculateTopEquipment(reservations, equipment) {
  const key = `topEquipment:${listSignature(reservations)}`;
  const cached = memoGet(__memo.topEquipment, key);
  if (cached) return cached;
  const totals = new Map();
  const equipmentMap = new Map((equipment || []).map((item) => [normalizeBarcode(item?.barcode), item]));
  const unknownLabel = translate('reservations.reports.topEquipment.unknown', 'معدة بدون اسم', 'Unnamed equipment');

  reservations.forEach((res) => {
    (res?.items || []).forEach((item) => {
      const barcode = normalizeBarcode(item?.barcode);
      const equipmentRecord = barcode ? equipmentMap.get(barcode) : null;
      const rawName = item?.desc
        || item?.description
        || item?.name
        || equipmentRecord?.desc
        || equipmentRecord?.description
        || equipmentRecord?.name
        || '';
      const displayName = rawName && rawName.trim() ? rawName : unknownLabel;
      const key = normalizeText(displayName) || 'unknown';
      const quantity = Number(item?.qty) || 1;
      const unitPrice = Number(item?.price) || 0;
      const revenue = quantity * unitPrice;

      const entry = totals.get(key) || { name: displayName, count: 0, revenue: 0 };
      entry.name = displayName;
      entry.count += quantity;
      entry.revenue += revenue;
      totals.set(key, entry);
    });
  });

  const out = Array.from(totals.values())
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return b.revenue - a.revenue;
    })
    .slice(0, 5);
  return memoSet(__memo.topEquipment, key, out);
}

export function calculateEquipmentCostReport(reservations) {
  const key = `equipmentCost:${listSignature(reservations)}`;
  const cached = memoGet(__memo.equipmentCost, key);
  if (cached) return cached;

  const totals = new Map();
  const fallbackName = translate('reservations.reports.topEquipment.unknown', 'معدة بدون اسم', 'Unnamed equipment');

  (reservations || []).forEach((res) => {
    const { statusValue } = computeReportStatus(res);
    if (statusValue === 'cancelled') return;
    const days = Math.max(1, calculateReservationDaysForReports(res?.start, res?.end));
    const items = Array.isArray(res?.items) ? res.items : [];
    items.forEach((item) => {
      const rawName = item?.desc || item?.description || item?.name || '';
      const name = rawName && rawName.trim() ? rawName : fallbackName;
      const keyName = normalizeText(name) || name;
      const qty = Number(item?.qty ?? item?.quantity ?? 1) || 1;
      const unitPrice = parsePriceValue(item?.price ?? item?.unit_price ?? item?.unitPrice ?? 0);
      const unitCost = parsePriceValue(item?.unitCost ?? item?.unit_cost ?? item?.cost ?? 0);
      const billable = sanitizePriceValue(qty * unitPrice * days);
      const cost = sanitizePriceValue(qty * unitCost * days);

      const entry = totals.get(keyName) || { name, quantity: 0, billable: 0, cost: 0 };
      entry.name = name;
      entry.quantity += qty;
      entry.billable += billable;
      entry.cost += cost;
      totals.set(keyName, entry);
    });
  });

  const rows = Array.from(totals.values())
    .map((row) => ({
      ...row,
      net: sanitizePriceValue(row.billable - row.cost),
    }))
    .sort((a, b) => {
      if (b.cost !== a.cost) return b.cost - a.cost;
      if (b.billable !== a.billable) return b.billable - a.billable;
      return (b.quantity || 0) - (a.quantity || 0);
    })
    .slice(0, 10);

  return memoSet(__memo.equipmentCost, key, rows);
}

// Allow other modules to clear memo when data/language changes
export function clearReportsMemo() {
  Object.values(__memo).forEach((m) => m.clear());
}

function matchesSearchTerm(reservation, searchTerm, customerMap, equipmentMap, technicianMap) {
  const parts = [];

  const reservationCode = reservation?.reservationId || reservation?.id;
  if (reservationCode) parts.push(reservationCode);

  if (reservation?.notes) parts.push(reservation.notes);

  const { statusValue, paid, paidStatus } = computeReportStatus(reservation);
  if (statusValue) parts.push(statusValue);

  const paymentStatus = reservation?.paymentStatus || reservation?.payment_status;
  if (paymentStatus) parts.push(paymentStatus);
  if (reservation?.paid != null) {
    parts.push(reservation.paid ? 'paid' : 'unpaid');
  }

  if (paidStatus) {
    parts.push(paidStatus);
  }

  const customer = customerMap.get(String(reservation?.customerId));
  if (customer) {
    parts.push(customer.customerName, customer.company_name || customer.companyName, customer.contact_person || '');
  }

  const project = getProjectForReservation(reservation);
  if (project) {
    parts.push(project.title, project.code, project.status);
  }

  parts.push(paymentLabelText(paidStatus));

  (reservation?.items || []).forEach((item) => {
    if (item?.desc) parts.push(item.desc);
    if (item?.barcode) parts.push(item.barcode);
    const equipmentRecord = equipmentMap.get(normalizeBarcode(item?.barcode));
    if (equipmentRecord) {
      parts.push(equipmentRecord.desc, equipmentRecord.description, equipmentRecord.name);
    }
  });

  (reservation?.technicians || []).forEach((technicianId) => {
    const technician = technicianMap.get(String(technicianId));
    if (technician) {
      parts.push(technician.name, technician.role, technician.department);
    }
  });

  const haystack = normalizeSearchText(parts.filter(Boolean).join(' '));
  return haystack.includes(searchTerm);
}

export function filterReservations(reservations, filters, customers, equipment, technicians) {
  const { startDate, endDate } = resolveRange(filters);
  const searchTerm = normalizeSearchText(filters.search);
  const hasSearch = Boolean(searchTerm);

  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const equipmentMap = new Map((equipment || []).map((item) => [normalizeBarcode(item?.barcode), item]));
  const technicianMap = new Map((technicians || []).map((tech) => [String(tech.id), tech]));

  return (reservations || []).filter((reservation) => {
    // استبعاد الحجوزات المرتبطة بمشاريع من تقارير الحجوزات
    if (reservation && reservation.projectId != null && String(reservation.projectId).trim() !== '') {
      return false;
    }

    const start = reservation?.start ? new Date(reservation.start) : null;
    if (!start || Number.isNaN(start.getTime())) return false;
    let end = reservation?.end ? new Date(reservation.end) : start;
    if (Number.isNaN(end.getTime())) end = start;

    // Overlap logic: include if (start <= endDate) and (end >= startDate)
    if (startDate && end < startDate) return false;
    if (endDate && start > endDate) return false;

    const { statusValue, confirmed, paid, paidStatus } = computeReportStatus(reservation);

    // منطق التقارير: عرض الحجوزات المؤكدة أو المكتملة فقط؛ استبعاد الكل ما عدا ذلك
    const eligibleForReports = statusValue === 'confirmed' || statusValue === 'completed';
    if (!eligibleForReports) return false;

    if (filters.status === 'confirmed' && !(statusValue === 'confirmed' || statusValue === 'completed' || confirmed)) return false;
    if (filters.status === 'pending' && statusValue !== 'pending') return false;
    if (filters.status === 'completed' && statusValue !== 'completed') return false;
    if (filters.status === 'cancelled' && statusValue !== 'cancelled') return false;

    if (filters.payment === 'paid' && !paid) return false;
    if (filters.payment === 'unpaid' && paid) return false;
    if (filters.payment === 'partial' && paidStatus !== 'partial') return false;

    if (filters.share && filters.share !== 'all') {
      const financials = computeReservationFinancials(reservation);
      const hasCompanyShare = financials.companySharePercent > 0;
      if (filters.share === 'with' && !hasCompanyShare) return false;
      if (filters.share === 'without' && hasCompanyShare) return false;
    }

    if (hasSearch && !matchesSearchTerm(reservation, searchTerm, customerMap, equipmentMap, technicianMap)) {
      return false;
    }

    return true;
  });
}

export function paymentLabelText(paymentStatus) {
  const normalized = String(paymentStatus ?? '').toLowerCase();
  if (normalized === 'paid') {
    return translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid');
  }
  if (normalized === 'partial') {
    return translate('reservations.reports.payment.partialLabel', 'مدفوعة جزئياً', 'Partially paid');
  }
  return translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid');
}

export function isReservationConfirmed(reservation) {
  return computeReportStatus(reservation).confirmed;
}

// ------------------------------
// Crew work aggregation (per technician)
// ------------------------------
export function calculateCrewWorkReport(reservations, technicians) {
  const techMap = new Map((technicians || []).map((t) => [String(t.id), t]));
  const byTech = new Map();

  (reservations || []).forEach((res) => {
    const { statusValue } = computeReportStatus(res);
    if (statusValue === 'cancelled') return; // ignore cancelled work
    const days = calculateReservationDaysForReports(res.start, res.end);
    const crewAssignments = Array.isArray(res.crewAssignments) ? res.crewAssignments : [];

    if (crewAssignments.length) {
      crewAssignments.forEach((a) => {
        const techId = a?.technicianId != null ? String(a.technicianId) : null;
        if (!techId) return;
        const tech = techMap.get(techId) || getTechnicianRecordById(techId) || {};
        const perDayBillable = Number.isFinite(Number(a?.positionClientPrice)) && Number(a.positionClientPrice) > 0
          ? Number(a.positionClientPrice)
          : resolveTechnicianTotalRateForReports(tech);
        const perDayCost = Number.isFinite(Number(a?.positionCost)) && Number(a.positionCost) > 0
          ? Number(a.positionCost)
          : resolveTechnicianDailyRateForReports(tech);
        const billable = perDayBillable * days;
        const cost = perDayCost * days;
        const rec = byTech.get(techId) || { id: techId, name: tech?.name || String(techId), days: 0, billable: 0, cost: 0 };
        rec.days += days;
        rec.billable += billable;
        rec.cost += cost;
        byTech.set(techId, rec);
      });
      return;
    }

    // Fallback: technicians listed without rich assignments
    const techIds = Array.isArray(res.technicians) ? res.technicians.map((x) => String(x)) : [];
    techIds.forEach((techId) => {
      const tech = techMap.get(techId) || getTechnicianRecordById(techId) || {};
      const perDayBillable = resolveTechnicianTotalRateForReports(tech);
      const perDayCost = resolveTechnicianDailyRateForReports(tech);
      const billable = perDayBillable * days;
      const cost = perDayCost * days;
      const rec = byTech.get(techId) || { id: techId, name: tech?.name || String(techId), days: 0, billable: 0, cost: 0 };
      rec.days += days;
      rec.billable += billable;
      rec.cost += cost;
      byTech.set(techId, rec);
    });
  });

  const rows = Array.from(byTech.values()).map((r) => ({
    ...r,
    net: r.billable - r.cost,
  })).sort((a, b) => b.net - a.net);
  return rows;
}

function getPaidAmountFromHistory(history = []) {
  if (!Array.isArray(history) || !history.length) return 0;
  // Sum explicit amounts; ignore percentages here
  let sum = 0;
  history.forEach((entry) => {
    const amount = Number(entry?.amount);
    if (Number.isFinite(amount) && amount > 0) sum += amount;
  });
  return sum;
}

export function computeOutstandingAmount(reservation) {
  const fin = computeReservationFinancials(reservation);
  const total = Number(fin.finalTotal || 0);
  let paid = Number(reservation?.paidAmount);
  if (!Number.isFinite(paid) || paid <= 0) {
    const historyPaid = getPaidAmountFromHistory(reservation?.paymentHistory || reservation?.payment_history || []);
    if (Number.isFinite(historyPaid) && historyPaid > 0) paid = historyPaid;
  }
  if ((!Number.isFinite(paid) || paid <= 0) && Number.isFinite(Number(reservation?.paidPercent))) {
    const pct = Number(reservation.paidPercent);
    if (pct > 0 && pct <= 100) paid = (pct / 100) * total;
  }
  if (!Number.isFinite(paid)) paid = 0;
  const outstanding = Math.max(0, Math.round((total - paid) * 100) / 100);
  return outstanding;
}

export function calculateTopOutstanding(reservations, customers, limit = 5) {
  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const rows = [];
  (reservations || []).forEach((res) => {
    const { paidStatus, statusValue } = computeReportStatus(res);
    if (statusValue === 'cancelled') return; // لا تُدرج الملغية في أعلى المستحقات
    if (paidStatus !== 'unpaid' && paidStatus !== 'partial') return;
    const outstanding = computeOutstandingAmount(res);
    if (!Number.isFinite(outstanding) || outstanding <= 0) return;
    const customer = customerMap.get(String(res.customerId));
    rows.push({
      id: res.id || res.reservationId || '',
      code: res.reservationCode || res.reservationId || res.id || '',
      customer: customer?.customerName || res.customerName || '',
      outstanding,
      paidStatus,
    });
  });
  return rows.sort((a, b) => b.outstanding - a.outstanding).slice(0, limit);
}

export function calculatePaymentForecast(reservations, { horizonDays = 90 } = {}) {
  const now = new Date();
  const horizon = new Date(now.getTime() + horizonDays * REPORT_MS_PER_DAY);
  const buckets = new Map();
  (reservations || []).forEach((res) => {
    const { statusValue, paidStatus } = computeReportStatus(res);
    if (statusValue === 'cancelled') return;
    if (paidStatus === 'paid') return;
    const outstanding = computeOutstandingAmount(res);
    if (!Number.isFinite(outstanding) || outstanding <= 0) return;
    const start = res?.start ? new Date(res.start) : null;
    const end = res?.end ? new Date(res.end) : start;
    let due = end && !Number.isNaN(end.getTime()) ? end : start;
    if (!due || Number.isNaN(due.getTime())) due = new Date(now.getTime() + 7 * REPORT_MS_PER_DAY);
    if (due < now || due > horizon) return;
    const key = formatDateInput(new Date(due.getFullYear(), due.getMonth(), due.getDate()));
    const cur = buckets.get(key) || { date: key, amount: 0, count: 0 };
    cur.amount += outstanding;
    cur.count += 1;
    buckets.set(key, cur);
  });
  return Array.from(buckets.values()).sort((a, b) => (a.date < b.date ? -1 : 1));
}
