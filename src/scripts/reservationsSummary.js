import { normalizeNumbers } from './utils.js';
import { t } from './language.js';
import {
  getSelectedCrewAssignments,
  getEditingCrewAssignments,
  getSelectedTechnicians,
  getEditingTechnicians,
} from './reservationsTechnicians.js';
import { loadData } from './storage.js';
import { sanitizePriceValue, parsePriceValue, buildReservationDisplayGroups } from './reservationsShared.js';

export const DEFAULT_COMPANY_SHARE_PERCENT = 10;

function resolveTechnicianCostRate(tech = {}) {
  const candidates = [
    tech.dailyWage,
    tech.daily_rate,
    tech.dailyRate,
    tech.wage,
    tech.rate
  ];

  for (const value of candidates) {
    const number = parsePriceValue(value);
    if (Number.isFinite(number)) {
      return sanitizePriceValue(number);
    }
  }

  return 0;
}

function resolveTechnicianTotalRate(tech = {}) {
  const candidates = [
    tech.dailyTotal,
    tech.daily_total,
    tech.totalRate,
    tech.total,
    tech.total_wage,
    tech.totalRatePerDay,
  ];

  for (const value of candidates) {
    if (value == null || value === '') continue;
    const number = parsePriceValue(value);
    if (Number.isFinite(number)) {
      return sanitizePriceValue(number);
    }
  }

  return resolveTechnicianCostRate(tech);
}

function calculateTechnicianDayRates(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return {
      costPerDay: 0,
      totalPerDay: 0
    };
  }

  const { technicians = [] } = loadData();
  if (!Array.isArray(technicians) || technicians.length === 0) {
    return {
      costPerDay: 0,
      totalPerDay: 0
    };
  }

  const technicianMap = new Map(
    technicians
      .filter((tech) => tech && (tech.id != null || tech.ID != null))
      .map((tech) => [String(tech.id ?? tech.ID), tech])
  );

  return ids.reduce((acc, technicianId) => {
    const technician = technicianMap.get(String(technicianId));
    if (!technician) {
      return acc;
    }
    const costRate = resolveTechnicianCostRate(technician);
    const totalRate = resolveTechnicianTotalRate(technician);
    return {
      costPerDay: acc.costPerDay + (Number.isFinite(costRate) ? costRate : 0),
      totalPerDay: acc.totalPerDay + (Number.isFinite(totalRate) ? totalRate : 0)
    };
  }, { costPerDay: 0, totalPerDay: 0 });
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const PAYMENT_COMPLETION_TOLERANCE = 0.01;

function parseNumericValue(value) {
  if (value == null || value === '') return null;
  const normalized = normalizeNumbers(String(value)).replace('%', '').trim();
  if (!normalized) return null;
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function clampNumber(value, { min = 0, max = Number.POSITIVE_INFINITY, precision = 2 } = {}) {
  let result = Number.isFinite(value) ? value : 0;
  if (result < min) result = min;
  if (result > max) result = max;
  if (precision != null) {
    const factor = 10 ** precision;
    result = Math.round(result * factor) / factor;
  }
  return result;
}

function normalizePaidStatusValue(status) {
  if (status == null) return 'unpaid';
  const normalized = String(status).trim().toLowerCase();
  switch (normalized) {
    case 'paid':
    case 'مدفوع':
      return 'paid';
    case 'partial':
    case 'partial_paid':
    case 'مدفوع جزئياً':
      return 'partial';
    default:
      return 'unpaid';
  }
}

export function calculatePaymentProgress({
  totalAmount = 0,
  progressType = null,
  progressValue = null,
  paidAmount = null,
  paidPercent = null,
  history = [],
} = {}) {
  const total = Number.isFinite(Number(totalAmount)) ? Number(totalAmount) : 0;
  const normalizedType = progressType === 'amount'
    ? 'amount'
    : progressType === 'percent'
      ? 'percent'
      : null;

  let amount = parseNumericValue(paidAmount);
  let percent = parseNumericValue(paidPercent);
  const value = parseNumericValue(progressValue);

  let historyAmount = 0;
  let historyPercent = 0;

  if (Array.isArray(history) && history.length) {
    history.forEach((entry) => {
      if (!entry) return;
      const type = entry.type === 'amount' || entry.type === 'percent' ? entry.type : null;
      const normalizedValue = parseNumericValue(entry.value);
      const normalizedAmount = parseNumericValue(entry.amount);
      const normalizedPercent = parseNumericValue(entry.percentage);

      if (type === 'amount') {
        const resolved = normalizedAmount != null ? normalizedAmount : normalizedValue;
        if (resolved != null) {
          historyAmount += resolved;
          if (total > 0) {
            historyPercent += (resolved / total) * 100;
          }
        }
      } else if (type === 'percent') {
        const resolved = normalizedPercent != null ? normalizedPercent : normalizedValue;
        if (resolved != null) {
          historyPercent += resolved;
          if (total > 0) {
            historyAmount += (resolved / 100) * total;
          }
        }
      } else {
        if (normalizedAmount != null) {
          historyAmount += normalizedAmount;
          if (total > 0) {
            historyPercent += (normalizedAmount / total) * 100;
          }
        }
        if (normalizedPercent != null) {
          historyPercent += normalizedPercent;
          if (total > 0) {
            historyAmount += (normalizedPercent / 100) * total;
          }
        }
      }
  });
}

function calculateCrewDailyTotalsFromAssignments(assignments = []) {
  if (!Array.isArray(assignments) || assignments.length === 0) {
    return {
      costPerDay: 0,
      totalPerDay: 0
    };
  }

  return assignments.reduce((acc, assignment) => {
    const positionCost = parsePriceValue(
      assignment?.positionCost
      ?? assignment?.position_cost
      ?? assignment?.cost
      ?? assignment?.dailyWage
      ?? assignment?.daily_wage
      ?? 0
    );
    const clientPrice = parsePriceValue(
      assignment?.positionClientPrice
      ?? assignment?.position_client_price
      ?? assignment?.clientPrice
      ?? assignment?.dailyTotal
      ?? assignment?.daily_total
      ?? assignment?.total
      ?? 0
    );

    const costPerDay = Number.isFinite(positionCost) ? positionCost : 0;
    const totalPerDay = Number.isFinite(clientPrice) ? clientPrice : 0;

    return {
      costPerDay: acc.costPerDay + costPerDay,
      totalPerDay: acc.totalPerDay + totalPerDay,
    };
  }, { costPerDay: 0, totalPerDay: 0 });
}

if (typeof globalThis !== 'undefined' && !globalThis.calculateCrewDailyTotalsFromAssignments) {
  globalThis.calculateCrewDailyTotalsFromAssignments = calculateCrewDailyTotalsFromAssignments;
}

  if (normalizedType === 'amount' && value != null) {
    amount = value;
  } else if (normalizedType === 'percent' && value != null) {
    percent = value;
  } else if (normalizedType === null && value != null) {
    // When type not specified, infer from existing paid fields.
    if (percent != null) {
      percent = value;
    } else {
      amount = value;
    }
  }

  if ((amount == null || amount <= 0) && percent != null && percent > 0 && total > 0) {
    amount = total * (percent / 100);
  }

  if ((percent == null || percent <= 0) && amount != null && amount > 0 && total > 0) {
    percent = (amount / total) * 100;
  }

  const baseAmount = amount ?? 0;
  const basePercent = percent ?? 0;
  amount = baseAmount + historyAmount;
  percent = basePercent + historyPercent;

  amount = clampNumber(amount ?? 0, { min: 0, max: total > 0 ? total : Number.POSITIVE_INFINITY, precision: 2 });
  percent = clampNumber(percent ?? 0, { min: 0, max: 100, precision: 2 });

  let effectiveType = normalizedType;
  if (!effectiveType) {
    if (amount > 0 && total > 0) {
      effectiveType = 'amount';
    } else if (percent > 0) {
      effectiveType = 'percent';
    }
  }

  const effectiveValue = effectiveType === 'amount'
    ? amount
    : effectiveType === 'percent'
      ? percent
      : null;

  return {
    paidAmount: amount,
    paidPercent: percent,
    paymentProgressType: effectiveType,
    paymentProgressValue: effectiveValue,
  };
}

export function determinePaymentStatus({
  manualStatus = 'unpaid',
  paidAmount = 0,
  paidPercent = 0,
  totalAmount = 0,
} = {}) {
  const normalizedManual = normalizePaidStatusValue(manualStatus);
  const total = Number.isFinite(Number(totalAmount)) ? Number(totalAmount) : 0;
  const amount = Number.isFinite(Number(paidAmount)) ? Number(paidAmount) : 0;
  const percent = Number.isFinite(Number(paidPercent)) ? Number(paidPercent) : 0;

  if (normalizedManual === 'paid') {
    return 'paid';
  }

  const fullyPaidByAmount = total > 0 && amount >= total - PAYMENT_COMPLETION_TOLERANCE;
  const fullyPaidByPercent = percent >= 100 - (PAYMENT_COMPLETION_TOLERANCE * 100);
  if (fullyPaidByAmount || fullyPaidByPercent) {
    return 'paid';
  }

  const hasPartialPayment = amount > PAYMENT_COMPLETION_TOLERANCE || percent > PAYMENT_COMPLETION_TOLERANCE;

  if (normalizedManual === 'partial') {
    return 'partial';
  }

  if (hasPartialPayment) {
    return 'partial';
  }

  return 'unpaid';
}

export function calculateReservationDays(start, end) {
  if (!start || !end) return 1;

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return 1;
  }

  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) return 1;

  const diffDays = diffMs / MS_PER_DAY;
  return Math.max(1, Math.ceil(diffDays));
}

export function calculateDraftFinancialBreakdown({
  items = [],
  technicianIds = [],
  crewAssignments = [],
  discount = 0,
  discountType = 'percent',
  applyTax = false,
  start = null,
  end = null,
  companySharePercent = null
} = {}) {
  const rentalDays = calculateReservationDays(start, end);
  // Optional override to treat all equipment as fixed (no day multiplier)
  let overrideNoDays = false;
  try {
    if (typeof window !== 'undefined' && window.location) {
      const url = new URL(window.location.href);
      const v = (url.searchParams.get('noDays') || url.searchParams.get('pricing') || '').toLowerCase();
      overrideNoDays = v === '1' || v === 'true' || v === 'fixed' || v === 'nodays';
    }
  } catch (_) { /* ignore */ }
  // Use the same grouping logic used in UI/PDF to avoid double counting
  const { groups } = buildReservationDisplayGroups({ items: Array.isArray(items) ? items : [] });
  let equipmentDailyTotal = 0; // مجموع يومي يُضرب بعدد الأيام
  let equipmentFixedTotal = 0; // مجموع ثابت لا يتأثر بعدد الأيام (للحِزم)
  (Array.isArray(groups) ? groups : []).forEach((group) => {
    const qty = Number.isFinite(Number(group?.quantity)) ? Number(group.quantity) : 0;
    const unit = Number.isFinite(Number(group?.unitPrice)) ? Number(group.unitPrice) : 0;
    if (overrideNoDays || (group?.type || '').toLowerCase() === 'package') {
      equipmentFixedTotal += (qty * unit);
    } else {
      equipmentDailyTotal += (qty * unit);
    }
  });
  const equipmentTotal = sanitizePriceValue((equipmentDailyTotal * rentalDays) + equipmentFixedTotal);
  const assignments = Array.isArray(crewAssignments) ? crewAssignments : [];
  const normalizedTechnicianIds = assignments.length
    ? assignments.map((assignment) => assignment?.technicianId).filter(Boolean)
    : (Array.isArray(technicianIds) ? technicianIds : []);

  // Compute crew daily totals directly to avoid any runtime scope issues
  const { costPerDay, totalPerDay } = assignments.length
    ? assignments.reduce((acc, assignment) => {
        const positionCost = parsePriceValue(
          assignment?.positionCost
          ?? assignment?.position_cost
          ?? assignment?.cost
          ?? assignment?.dailyWage
          ?? assignment?.daily_wage
          ?? 0
        );
        const clientPrice = parsePriceValue(
          assignment?.positionClientPrice
          ?? assignment?.position_client_price
          ?? assignment?.clientPrice
          ?? assignment?.dailyTotal
          ?? assignment?.daily_total
          ?? assignment?.total
          ?? 0
        );
        const cpd = Number.isFinite(positionCost) ? positionCost : 0;
        const tpd = Number.isFinite(clientPrice) ? clientPrice : 0;
        return { costPerDay: acc.costPerDay + cpd, totalPerDay: acc.totalPerDay + tpd };
      }, { costPerDay: 0, totalPerDay: 0 })
    : calculateTechnicianDayRates(normalizedTechnicianIds);
  const crewTotal = sanitizePriceValue(totalPerDay * rentalDays);
  const crewCostTotal = sanitizePriceValue(costPerDay * rentalDays);

  const discountBase = sanitizePriceValue(equipmentTotal + crewTotal);
  const discountValue = Number(discount) || 0;
  let discountAmount = discountType === 'amount'
    ? discountValue
    : discountBase * (discountValue / 100);

  if (!Number.isFinite(discountAmount) || discountAmount < 0) {
    discountAmount = 0;
  }
  if (discountAmount > discountBase) {
    discountAmount = discountBase;
  }

  const subtotalAfterDiscount = Math.max(0, discountBase - discountAmount);

  // Use company share only when an explicit positive value is provided
  const sharePercent = Number.isFinite(companySharePercent) && Number(companySharePercent) > 0
    ? Number(companySharePercent)
    : 0;
  const companyShareAmount = sharePercent > 0
    ? Math.max(0, subtotalAfterDiscount * (sharePercent / 100))
    : 0;

  const taxableAmount = subtotalAfterDiscount + companyShareAmount;
  let taxAmount = applyTax ? taxableAmount * 0.15 : 0;
  if (!Number.isFinite(taxAmount) || taxAmount < 0) {
    taxAmount = 0;
  }
  taxAmount = Number(taxAmount.toFixed(2));

  const interimTotal = taxableAmount + taxAmount;
  const finalTotal = Math.max(0, Number(interimTotal.toFixed(2)));

  const netProfit = Math.max(0, Math.max(0, equipmentTotal + crewTotal - discountAmount) - crewCostTotal);

  return {
    rentalDays,
    equipmentTotal,
    crewTotal,
    crewCostTotal,
    discountAmount,
    subtotalAfterDiscount,
    taxableAmount,
    taxAmount,
    finalTotal,
    companySharePercent: sharePercent,
    companyShareAmount,
    netProfit
  };
}

export function calculateReservationTotal(
  items = [],
  discount = 0,
  discountType = 'percent',
  applyTax = false,
  crewOrTechnicians = [],
  { start = null, end = null, companySharePercent = null } = {}
) {
  const isAssignmentObject = (value) => value && typeof value === 'object' && (
    value.positionId !== undefined
    || value.position_id !== undefined
    || value.positionLabel !== undefined
    || value.position_name !== undefined
    || value.positionClientPrice !== undefined
  );

  const assignments = Array.isArray(crewOrTechnicians) && crewOrTechnicians.some(isAssignmentObject)
    ? crewOrTechnicians
    : [];

  const technicianIds = assignments.length
    ? assignments.map((assignment) => assignment?.technicianId).filter(Boolean)
    : (Array.isArray(crewOrTechnicians) ? crewOrTechnicians : []);

  // For this aggregate helper, when companySharePercent is not provided,
  // apply the default share to match business expectation and tests.
  const effectiveShare = (companySharePercent == null)
    ? DEFAULT_COMPANY_SHARE_PERCENT
    : companySharePercent;

  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds,
    crewAssignments: assignments,
    discount,
    discountType,
    applyTax,
    start,
    end,
    companySharePercent: effectiveShare
  });
  return breakdown.finalTotal;
}

export function buildSummaryHtml({
  total,
  itemsCount,
  rentalDays,
  techniciansCount,
  applyTax,
  paymentStatus,
  paidAmount = 0,
  paidPercent = 0,
  companySharePercent = null,
  companyShareAmount = null,
  taxAmount = null,
  netProfit = null,
  totalKey = 'reservations.summary.total',
  equipmentTotal = null,
  crewTotal = null
}) {
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const totalDisplay = normalizeNumbers(String(total));
  const itemsCountDisplay = normalizeNumbers(String(itemsCount));
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays ?? 1));
  const crewCountDisplay = normalizeNumbers(String(techniciansCount));
  const normalizedStatus = normalizePaidStatusValue(paymentStatus);
  const statusFallback = normalizedStatus === 'paid'
    ? 'مدفوع'
    : normalizedStatus === 'partial'
      ? 'مدفوع جزئياً'
      : 'غير مدفوع';
  const paidText = t(`reservations.create.paymentStatus.${normalizedStatus}`, statusFallback);

  const paidAmountNumber = Number.isFinite(Number(paidAmount)) ? Math.max(0, Number(paidAmount)) : 0;
  const paidPercentNumber = Number.isFinite(Number(paidPercent)) ? Math.max(0, Number(paidPercent)) : 0;
  const hasPaymentProgress = paidAmountNumber > PAYMENT_COMPLETION_TOLERANCE || paidPercentNumber > PAYMENT_COMPLETION_TOLERANCE;
  const paymentProgressLabel = t('reservations.summary.paymentProgressLabel', '💰 الدفعة المستلمة');
  const paidAmountDisplay = normalizeNumbers(paidAmountNumber.toFixed(2));
  const paidPercentDisplay = normalizeNumbers(paidPercentNumber.toFixed(paidPercentNumber % 1 ? 2 : 0));

  const itemsLabel = t('reservations.summary.itemsLabel', '📦 عدد المعدات');
  const daysLabel = t('reservations.summary.durationLabel', '⏱️ عدد الأيام');
  const crewLabel = t('reservations.summary.crewLabel', '😎 عدد الفريق');
  const equipmentTotalLabel = t('reservations.details.labels.itemsTotal', '💼 إجمالي المعدات');
  const crewTotalLabel = t('reservations.details.labels.crewTotal', '😎 إجمالي الفريق');
  const taxLabelShort = t('reservations.summary.taxLabelShort', '🧾 الضريبة');
  const paymentLabel = t('reservations.summary.paymentLabelShort', '💳 حالة الدفع');
  const totalLabel = t(totalKey.replace('.total', '.totalLabel'), '💰 التكلفة الإجمالية');
  const companyShareLabel = t('reservations.summary.companyShareLabel', '🏦 نسبة الشركة');
  const netProfitLabel = t('reservations.details.labels.netProfit', '💵 صافي الربح');
  const netProfitValue = Number.isFinite(netProfit) ? Math.max(0, Number(netProfit)) : null;

  const summaryRows = [
    { label: itemsLabel, value: itemsCountDisplay },
    { label: daysLabel, value: rentalDaysDisplay },
    { label: crewLabel, value: crewCountDisplay },
  ];

  const equipmentTotalNumber = Number.isFinite(Number(equipmentTotal))
    ? Math.max(0, Number(equipmentTotal))
    : null;
  if (equipmentTotalNumber != null) {
    summaryRows.push({
      label: equipmentTotalLabel,
      value: `${normalizeNumbers(equipmentTotalNumber.toFixed(2))} ${currencyLabel}`
    });
  }

  const crewTotalNumber = Number.isFinite(Number(crewTotal))
    ? Math.max(0, Number(crewTotal))
    : null;
  if (crewTotalNumber != null) {
    summaryRows.push({
      label: crewTotalLabel,
      value: `${normalizeNumbers(crewTotalNumber.toFixed(2))} ${currencyLabel}`
    });
  }

  if (applyTax) {
    let taxValue = t('reservations.summary.taxIncludedValue', 'شامل 15%');
    if (Number.isFinite(taxAmount) && taxAmount > 0) {
      const taxDisplay = normalizeNumbers(Number(taxAmount).toFixed(2));
      taxValue = `${taxDisplay} ${currencyLabel}`;
    }
    summaryRows.push({ label: taxLabelShort, value: taxValue });
  }

  const sharePercent = Number.isFinite(companySharePercent)
    ? Number(companySharePercent)
    : null;

  if (sharePercent !== null && sharePercent > 0) {
    const shareAmount = Number.isFinite(companyShareAmount)
      ? Number(companyShareAmount)
      : total * (sharePercent / 100);
    const sharePercentDisplay = normalizeNumbers(String(sharePercent));
    const shareAmountDisplay = normalizeNumbers(
      Number.isFinite(shareAmount) ? shareAmount.toFixed(2) : '0'
    );
    const shareValue = `${sharePercentDisplay}% (${shareAmountDisplay} ${currencyLabel})`;
    summaryRows.push({ label: companyShareLabel, value: shareValue });
  }

  if (netProfitValue !== null && Math.abs(netProfitValue - Number(total)) > 0.009) {
    const netDisplay = normalizeNumbers(netProfitValue.toFixed(2));
    summaryRows.push({ label: netProfitLabel, value: `${netDisplay} ${currencyLabel}` });
  }

  summaryRows.push({ label: paymentLabel, value: paidText });

  if (hasPaymentProgress) {
    summaryRows.push({ label: paymentProgressLabel, value: `${paidAmountDisplay} ${currencyLabel} (${paidPercentDisplay}%)` });
  }

  const totalValue = `${totalDisplay} ${currencyLabel}`;

  return `
    <div class="reservation-summary-container">
      <div class="reservation-summary-box">
        ${summaryRows.map(({ label, value }) => `
          <div class="reservation-summary-line">
            <span class="reservation-summary-label">${label}</span>
            ${value ? `<span class="reservation-summary-value">${value}</span>` : ''}
          </div>
        `).join('')}
        <div class="reservation-summary-line reservation-summary-total">
          <span class="reservation-summary-label">${totalLabel}</span>
          <span class="reservation-summary-value">${totalValue}</span>
        </div>
      </div>
    </div>
  `;
}

export function renderDraftSummary({
  selectedItems,
  discount,
  discountType,
  applyTax,
  paidStatus,
  paymentProgressType = null,
  paymentProgressValue = null,
  start,
  end,
  companySharePercent = null,
  paymentHistory = [],
}) {
  const crewAssignments = getSelectedCrewAssignments();
  const selectedTechnicians = typeof getSelectedTechnicians === 'function'
    ? getSelectedTechnicians() ?? []
    : [];
  const fallbackTechnicians = Array.isArray(selectedTechnicians)
    ? selectedTechnicians.map(String)
    : [];
  const technicianIds = crewAssignments.length
    ? crewAssignments.map((assignment) => assignment?.technicianId).filter(Boolean).map(String)
    : fallbackTechnicians;
  const techniciansCount = crewAssignments.length || technicianIds.length;
  const sharePercent = Number.isFinite(companySharePercent) ? Number(companySharePercent) : null;
  const breakdown = calculateDraftFinancialBreakdown({
    items: selectedItems,
    technicianIds,
    crewAssignments,
    discount,
    discountType,
    applyTax,
    start,
    end,
    companySharePercent: sharePercent
  });
  const paymentProgress = calculatePaymentProgress({
    totalAmount: breakdown.finalTotal,
    progressType: paymentProgressType,
    progressValue: paymentProgressValue,
    history: paymentHistory,
  });
  const paymentStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: breakdown.finalTotal,
  });

  const summaryHtml = buildSummaryHtml({
    total: breakdown.finalTotal,
    itemsCount: selectedItems.length,
    rentalDays: breakdown.rentalDays,
    techniciansCount,
    applyTax,
    paymentStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    taxAmount: breakdown.taxAmount,
    netProfit: breakdown.netProfit,
    equipmentTotal: breakdown.equipmentTotal,
    crewTotal: breakdown.crewTotal
  });

  const summaryData = {
    paymentStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    total: breakdown.finalTotal,
  };

  renderDraftSummary.lastResult = summaryData;
  setSummaryHtml(summaryHtml);

  return summaryHtml;
}

export function renderEditSummary({
  items,
  discount,
  discountType,
  applyTax,
  paidStatus,
  paymentProgressType = null,
  paymentProgressValue = null,
  start,
  end,
  companySharePercent = null,
  paymentHistory = [],
}) {
  const crewAssignments = getEditingCrewAssignments();
  const selectedEditTechnicians = typeof getEditingTechnicians === 'function'
    ? getEditingTechnicians() ?? []
    : [];
  const fallbackTechnicians = Array.isArray(selectedEditTechnicians)
    ? selectedEditTechnicians.map(String)
    : [];
  const technicianIds = crewAssignments.length
    ? crewAssignments.map((assignment) => assignment?.technicianId).filter(Boolean).map(String)
    : fallbackTechnicians;
  const techniciansCount = crewAssignments.length || technicianIds.length;
  const sharePercent = Number.isFinite(companySharePercent) ? Number(companySharePercent) : null;
  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds,
    crewAssignments,
    discount,
    discountType,
    applyTax,
    start,
    end,
    companySharePercent: sharePercent
  });
  const paymentProgress = calculatePaymentProgress({
    totalAmount: breakdown.finalTotal,
    progressType: paymentProgressType,
    progressValue: paymentProgressValue,
    history: paymentHistory,
  });
  const paymentStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: breakdown.finalTotal,
  });

  const html = buildSummaryHtml({
    total: breakdown.finalTotal,
    itemsCount: items.length,
    rentalDays: breakdown.rentalDays,
    techniciansCount,
    applyTax,
    paymentStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    taxAmount: breakdown.taxAmount,
    netProfit: breakdown.netProfit,
    totalKey: 'reservations.summary.totalAfterEdit',
    equipmentTotal: breakdown.equipmentTotal,
    crewTotal: breakdown.crewTotal
  });

  const summaryData = {
    html,
    paymentStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    total: breakdown.finalTotal,
  };

  renderEditSummary.lastResult = summaryData;
  return html;
}

function setSummaryHtml(html) {
  const previewTop = document.getElementById('reservation-preview');
  if (previewTop) {
    previewTop.innerHTML = html;
    toggleSummaryHostClass(previewTop, html);
  }

  const previewBottom = document.getElementById('reservation-preview-bottom');
  if (previewBottom) {
    previewBottom.innerHTML = html;
    toggleSummaryHostClass(previewBottom, html);
  }
}

function toggleSummaryHostClass(element, html) {
  const hasSummary = typeof html === 'string' && html.trim().length > 0;
  element.classList.toggle('reservation-summary-host', hasSummary);
}
