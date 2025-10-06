import { normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { getSelectedTechnicians, getEditingTechnicians } from './reservationsTechnicians.js';
import { loadData } from './storage.js';

function resolveTechnicianRate(tech = {}) {
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

function calculateTechniciansCost(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return 0;
  }

  const { technicians = [] } = loadData();
  if (!Array.isArray(technicians) || technicians.length === 0) {
    return 0;
  }

  const technicianMap = new Map(
    technicians
      .filter((tech) => tech && (tech.id != null || tech.ID != null))
      .map((tech) => [String(tech.id ?? tech.ID), tech])
  );

  return ids.reduce((sum, technicianId) => {
    const technician = technicianMap.get(String(technicianId));
    if (!technician) return sum;
    return sum + resolveTechnicianRate(technician);
  }, 0);
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

export function calculateReservationTotal(
  items = [],
  discount = 0,
  discountType = 'percent',
  applyTax = false,
  technicianIds = [],
  { start = null, end = null } = {}
) {
  const rentalDays = calculateReservationDays(start, end);

  const equipmentSubtotal = items.reduce(
    (sum, item) => sum + (item.qty || 1) * (item.price || 0),
    0
  ) * rentalDays;

  const techniciansCostPerDay = calculateTechniciansCost(technicianIds);
  let total = equipmentSubtotal + (techniciansCostPerDay * rentalDays);

  if (discount) {
    if (discountType === 'percent') {
      total -= total * (discount / 100);
    } else if (discountType === 'amount') {
      total -= discount;
    }
  }

  if (applyTax) total += total * 0.15;

  return Math.max(0, Math.round(total));
}

export function buildSummaryHtml({
  total,
  itemsCount,
  rentalDays,
  techniciansCount,
  applyTax,
  paidStatus,
  totalKey = 'reservations.summary.total'
}) {
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
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

  const taxValue = applyTax
    ? t('reservations.summary.taxIncludedValue', 'شامل 15%')
    : t('reservations.summary.taxExcludedValue', 'غير شامل');

  const summaryRows = [
    { label: itemsLabel, value: itemsCountDisplay },
    { label: daysLabel, value: rentalDaysDisplay },
    { label: crewLabel, value: crewCountDisplay },
    { label: taxLabelShort, value: taxValue },
    { label: paymentLabel, value: paidText },
  ];

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

export function renderDraftSummary({ selectedItems, discount, discountType, applyTax, paidStatus, start, end }) {
  const technicianIds = getSelectedTechnicians();
  const techniciansCount = technicianIds.length;
  const rentalDays = calculateReservationDays(start, end);
  const total = calculateReservationTotal(selectedItems, discount, discountType, applyTax, technicianIds, { start, end });
  const summaryHtml = buildSummaryHtml({
    total,
    itemsCount: selectedItems.length,
    rentalDays,
    techniciansCount,
    applyTax,
    paidStatus
  });

  setSummaryHtml(summaryHtml);
}

export function renderEditSummary({ items, discount, discountType, applyTax, paidStatus, start, end }) {
  const technicianIds = getEditingTechnicians();
  const techniciansCount = technicianIds.length;
  const rentalDays = calculateReservationDays(start, end);
  const total = calculateReservationTotal(items, discount, discountType, applyTax, technicianIds, { start, end });
  return buildSummaryHtml({
    total,
    itemsCount: items.length,
    rentalDays,
    techniciansCount,
    applyTax,
    paidStatus,
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
