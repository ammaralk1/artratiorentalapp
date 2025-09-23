import { normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { getSelectedTechnicians, getEditingTechnicians } from './reservationsTechnicians.js';

export function calculateReservationTotal(items = [], discount = 0, discountType = 'percent', applyTax = false) {
  let total = items.reduce((sum, item) => sum + (item.qty || 1) * (item.price || 0), 0);

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
  techniciansCount,
  applyTax,
  paidStatus,
  totalKey = 'reservations.summary.total'
}) {
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const totalDisplay = normalizeNumbers(String(total));
  const itemsCountDisplay = normalizeNumbers(String(itemsCount));
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
  const crewLine = t('reservations.summary.crewCount', '😎 عدد الفريق: {count}')
    .replace('{count}', crewCountDisplay);
  const paymentLine = t('reservations.summary.paymentLabel', '💳 حالة الدفع: {status}')
    .replace('{status}', paidText);

  return `
    <div class="alert alert-info">
      ${totalLine}<br>
      ${itemsLine}<br>
      ${crewLine}<br>
      ${taxLabel}<br>
      ${paymentLine}
    </div>
  `;
}

export function renderDraftSummary({ selectedItems, discount, discountType, applyTax, paidStatus }) {
  const techniciansCount = getSelectedTechnicians().length;
  const total = calculateReservationTotal(selectedItems, discount, discountType, applyTax);
  const summaryHtml = buildSummaryHtml({
    total,
    itemsCount: selectedItems.length,
    techniciansCount,
    applyTax,
    paidStatus
  });

  setSummaryHtml(summaryHtml);
}

export function renderEditSummary({ items, discount, discountType, applyTax, paidStatus }) {
  const techniciansCount = getEditingTechnicians().length;
  const total = calculateReservationTotal(items, discount, discountType, applyTax);
  return buildSummaryHtml({
    total,
    itemsCount: items.length,
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
