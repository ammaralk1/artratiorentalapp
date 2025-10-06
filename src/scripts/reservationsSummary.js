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
  const taxLabel = applyTax
    ? t('reservations.summary.taxIncluded', 'شامل الضريبة 15%')
    : t('reservations.summary.taxExcluded', 'غير شامل الضريبة');
  const paidText = paidStatus === 'paid'
    ? t('reservations.create.paymentStatus.paid', 'مدفوع')
    : t('reservations.create.paymentStatus.unpaid', 'غير مدفوع');

  const totalLine = t(totalKey, '💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>')
    .replace('{total}', totalDisplay)
    .replace('{currency}', currencyLabel);
  const itemsLine = t('reservations.summary.itemsCount', '📦 عدد المعدات: {count}')
    .replace('{count}', itemsCountDisplay);
  const durationLine = t('reservations.summary.duration', '⏱️ عدد الأيام: {count}')
    .replace('{count}', rentalDaysDisplay);
  const crewLine = t('reservations.summary.crewCount', '😎 عدد الفريق: {count}')
    .replace('{count}', crewCountDisplay);
  const paymentLine = t('reservations.summary.paymentLabel', '💳 حالة الدفع: {status}')
    .replace('{status}', paidText);

  return `
    <div class="reservation-summary-box alert alert-info">
      <div class="reservation-summary-line">${itemsLine}</div>
      <div class="reservation-summary-line">${durationLine}</div>
      <div class="reservation-summary-line">${crewLine}</div>
      <div class="reservation-summary-line">${taxLabel}</div>
      <div class="reservation-summary-line">${paymentLine}</div>
      <div class="reservation-summary-line reservation-summary-total">${totalLine}</div>
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
  if (previewTop) previewTop.innerHTML = html;

  const previewBottom = document.getElementById('reservation-preview-bottom');
  if (previewBottom) previewBottom.innerHTML = html;
}
