import { normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { getSelectedTechnicians, getEditingTechnicians } from './reservationsTechnicians.js';
import { loadData } from './storage.js';

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
    const number = Number(value);
    if (Number.isFinite(number)) {
      return number;
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
    const number = Number(value);
    if (Number.isFinite(number)) {
      return number;
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
    if (!technician) return acc;
    const costRate = resolveTechnicianCostRate(technician);
    const totalRate = resolveTechnicianTotalRate(technician);
    return {
      costPerDay: acc.costPerDay + (Number.isFinite(costRate) ? costRate : 0),
      totalPerDay: acc.totalPerDay + (Number.isFinite(totalRate) ? totalRate : 0)
    };
  }, { costPerDay: 0, totalPerDay: 0 });
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

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
  discount = 0,
  discountType = 'percent',
  applyTax = false,
  start = null,
  end = null,
  companySharePercent = null
} = {}) {
  const rentalDays = calculateReservationDays(start, end);
  const equipmentDailyTotal = (items || []).reduce(
    (sum, item) => sum + ((Number(item?.qty) || 1) * (Number(item?.price) || 0)),
    0
  );
  const equipmentTotal = equipmentDailyTotal * rentalDays;
  const { costPerDay, totalPerDay } = calculateTechnicianDayRates(technicianIds);
  const crewTotal = totalPerDay * rentalDays;
  const crewCostTotal = costPerDay * rentalDays;

  const discountBase = equipmentTotal + crewTotal;
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

  let normalizedSharePercent = Number.isFinite(companySharePercent)
    ? Number(companySharePercent)
    : null;
  if (applyTax && (!Number.isFinite(normalizedSharePercent) || normalizedSharePercent <= 0)) {
    normalizedSharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
  }
  const sharePercent = normalizedSharePercent && normalizedSharePercent > 0
    ? normalizedSharePercent
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

  const netProfit = Math.max(0, equipmentTotal + crewTotal - crewCostTotal);

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
  technicianIds = [],
  { start = null, end = null, companySharePercent = null } = {}
) {
  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds,
    discount,
    discountType,
    applyTax,
    start,
    end,
    companySharePercent
  });
  return breakdown.finalTotal;
}

export function buildSummaryHtml({
  total,
  itemsCount,
  rentalDays,
  techniciansCount,
  applyTax,
  paidStatus,
  companySharePercent = null,
  companyShareAmount = null,
  taxAmount = null,
  netProfit = null,
  totalKey = 'reservations.summary.total'
}) {
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const totalDisplay = normalizeNumbers(String(total));
  const itemsCountDisplay = normalizeNumbers(String(itemsCount));
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays ?? 1));
  const crewCountDisplay = normalizeNumbers(String(techniciansCount));
  const paidText = paidStatus === 'paid'
    ? t('reservations.create.paymentStatus.paid', 'مدفوع')
    : t('reservations.create.paymentStatus.unpaid', 'غير مدفوع');

  const itemsLabel = t('reservations.summary.itemsLabel', '📦 عدد المعدات');
  const daysLabel = t('reservations.summary.durationLabel', '⏱️ عدد الأيام');
  const crewLabel = t('reservations.summary.crewLabel', '😎 عدد الفريق');
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
  start,
  end,
  companySharePercent = null,
}) {
  const technicianIds = getSelectedTechnicians();
  const techniciansCount = technicianIds.length;
  const sharePercent = Number.isFinite(companySharePercent) ? Number(companySharePercent) : null;
  const breakdown = calculateDraftFinancialBreakdown({
    items: selectedItems,
    technicianIds,
    discount,
    discountType,
    applyTax,
    start,
    end,
    companySharePercent: sharePercent
  });
  const summaryHtml = buildSummaryHtml({
    total: breakdown.finalTotal,
    itemsCount: selectedItems.length,
    rentalDays: breakdown.rentalDays,
    techniciansCount,
    applyTax,
    paidStatus,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    taxAmount: breakdown.taxAmount,
    netProfit: breakdown.netProfit
  });

  setSummaryHtml(summaryHtml);
}

export function renderEditSummary({
  items,
  discount,
  discountType,
  applyTax,
  paidStatus,
  start,
  end,
  companySharePercent = null,
}) {
  const technicianIds = getEditingTechnicians();
  const techniciansCount = technicianIds.length;
  const sharePercent = Number.isFinite(companySharePercent) ? Number(companySharePercent) : null;
  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds,
    discount,
    discountType,
    applyTax,
    start,
    end,
    companySharePercent: sharePercent
  });
  return buildSummaryHtml({
    total: breakdown.finalTotal,
    itemsCount: items.length,
    rentalDays: breakdown.rentalDays,
    techniciansCount,
    applyTax,
    paidStatus,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    taxAmount: breakdown.taxAmount,
    netProfit: breakdown.netProfit,
    totalKey: 'reservations.summary.totalAfterEdit'
  });
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
