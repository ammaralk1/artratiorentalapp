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
  ['done', 'completed'],
  ['finished', 'completed'],
  ['cancelled', 'cancelled'],
  ['ملغي', 'cancelled'],
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

  if (projectState.projectLinked && projectStatus) {
    statusValue = projectStatus;
  }

  if (!statusValue || statusValue === 'cancelled') {
    statusValue = projectState.effectiveConfirmed ? 'confirmed' : 'pending';
  }

  if (isReservationCompleted(reservation) || projectStatus === 'completed') {
    statusValue = 'completed';
  }

  const confirmed = projectState.effectiveConfirmed
    || statusValue === 'confirmed'
    || statusValue === 'completed';

  if (confirmed && statusValue !== 'completed') {
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
  let paidCount = 0;
  let revenue = 0;
  let companyShareTotal = 0;
  let taxTotal = 0;
  let crewTotal = 0;
  let crewCostTotal = 0;
  let netProfit = 0;

  reservations.forEach((reservation) => {
    const { statusValue, confirmed: isConfirmed, paid } = computeReportStatus(reservation);
    if (statusValue === 'completed') {
      completed += 1;
    }
    if (isConfirmed) {
      confirmed += 1;
    }
    if (paid) {
      paidCount += 1;
    }

    const financials = computeReservationFinancials(reservation);
    revenue += financials.finalTotal;
    companyShareTotal += financials.companyShareAmount;
    taxTotal += financials.taxAmount;
    crewTotal += financials.crewTotal;
    crewCostTotal += financials.crewCostTotal ?? 0;
    netProfit += financials.netProfit;
  });

  const average = total ? revenue / total : 0;

  return {
    total,
    confirmed,
    completed,
    paidCount,
    revenue,
    average,
    companyShareTotal,
    taxTotal,
    crewTotal,
    crewCostTotal,
    netProfit,
  };
}

export function resolveRange({ range, start, end }) {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  if (range === 'custom') {
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
    case 'last30': {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 29);
      break;
    }
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
  const now = new Date();
  const result = [];

  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthReservations = reservations.filter((res) => {
      const start = res?.start ? new Date(res.start) : null;
      return start && start.getFullYear() === year && start.getMonth() === month;
    });

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

  return result;
}

export function calculateStatusBreakdown(reservations) {
  const counts = {
    confirmed: 0,
    pending: 0,
    completed: 0,
  };

  (reservations || []).forEach((reservation) => {
    const { statusValue, confirmed } = computeReportStatus(reservation);
    if (statusValue === 'completed') {
      counts.completed += 1;
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

  return [
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
      label: translate('reservations.reports.status.completedLabel', 'منتهية', 'Completed'),
      value: completed,
      percent: Math.round((completed / total) * 100) || 0,
      rawCount: completed,
      className: 'status-completed',
      filterKey: 'completed',
    },
  ];
}

export function calculatePaymentBreakdown(reservations) {
  const total = reservations.length || 1;
  const paid = reservations.filter((reservation) => computeReportStatus(reservation).paid).length;
  const unpaid = reservations.length - paid;

  return [
    {
      label: translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid'),
      value: paid,
      percent: Math.round((paid / total) * 100) || 0,
      rawCount: paid,
      className: 'status-paid',
      filterKey: 'paid',
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
}

export function calculateTopCustomers(reservations, customers) {
  const totals = new Map();
  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));

  reservations.forEach((res) => {
    const key = String(res?.customerId ?? 'unknown');
    const entry = totals.get(key) || { count: 0, revenue: 0 };
    const financials = computeReservationFinancials(res);
    entry.count += 1;
    entry.revenue += financials.finalTotal;
    totals.set(key, entry);
  });

  return Array.from(totals.entries())
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
}

export function calculateTopEquipment(reservations, equipment) {
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

  return Array.from(totals.values())
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return b.revenue - a.revenue;
    })
    .slice(0, 5);
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

    if (startDate && start < startDate) return false;
    if (endDate && start > endDate) return false;

    const { statusValue, confirmed, paid } = computeReportStatus(reservation);

    if (filters.status === 'confirmed' && !(statusValue === 'confirmed' || statusValue === 'completed' || confirmed)) return false;
    if (filters.status === 'pending' && statusValue !== 'pending') return false;
    if (filters.status === 'completed' && statusValue !== 'completed') return false;

    if (filters.payment === 'paid' && !paid) return false;
    if (filters.payment === 'unpaid' && paid) return false;

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
