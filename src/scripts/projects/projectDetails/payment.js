import { t } from '../../language.js';
import { normalizeNumbers } from '../../utils.js';
import { escapeHtml, formatCurrency, formatDateTime } from '../formatting.js';

// ── Number / date helpers ─────────────────────────────────────────────────────

export function parsePaymentNumber(value) {
  if (value == null || value === '') return null;
  const normalized = normalizeNumbers(String(value)).replace(/%/g, '').trim();
  if (!normalized) return null;
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolveRecordedAt(raw) {
  if (!raw) {
    return new Date().toISOString();
  }
  const candidate = new Date(raw);
  if (Number.isNaN(candidate.getTime())) {
    return new Date().toISOString();
  }
  return candidate.toISOString();
}

// ── Normalizers ───────────────────────────────────────────────────────────────

export function normalizePaymentHistoryEntryForView(entry) {
  if (!entry || typeof entry !== 'object') return null;

  const typeRaw = entry.type ?? entry.payment_type ?? entry.paymentType ?? null;
  let type = typeof typeRaw === 'string' ? typeRaw.toLowerCase().trim() : null;
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
    note: note && String(note).trim().length ? String(note).trim() : null,
    recordedAt,
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
        recordedAt,
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
        recordedAt,
      }
    ];
  }

  return [];
}

// ── View-mode markup ──────────────────────────────────────────────────────────

export function buildProjectPaymentHistoryMarkup(paymentHistory = [], { total = null } = {}) {
  const methodHeader = escapeHtml(t('reservations.paymentHistory.headers.method', 'نوع الدفعة'));
  const amountHeader = escapeHtml(t('reservations.paymentHistory.headers.amount', 'المبلغ'));
  const percentHeader = escapeHtml(t('reservations.paymentHistory.headers.percent', 'النسبة'));
  const dateHeader = escapeHtml(t('reservations.paymentHistory.headers.date', 'التاريخ'));
  const noteHeader = escapeHtml(t('reservations.paymentHistory.headers.note', 'ملاحظات'));

  if (!Array.isArray(paymentHistory) || paymentHistory.length === 0) {
    const emptyText = escapeHtml(t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة'));
    return `
      <div class="users-table-wrapper overflow-x-auto project-modal-table-wrapper reservation-payment-history-table-shell">
        <table class="ui-table users-table surface-table table table-sm table-hover align-middle reservation-payment-history-table">
          <thead class="table-light">
            <tr>
              <th>${methodHeader}</th>
              <th>${amountHeader}</th>
              <th>${percentHeader}</th>
              <th>${dateHeader}</th>
              <th>${noteHeader}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="5" class="text-center text-muted">${emptyText}</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  const rows = paymentHistory.map((entry) => {
    const typeLabel = entry?.type === 'percent'
      ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
      : entry?.type === 'amount'
        ? t('reservations.paymentHistory.type.amount', 'دفعة مالية')
        : t('reservations.paymentHistory.type.unknown', 'دفعة');
    const percentVal = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
      ? Number(entry.percentage)
      : null;
    const computedFromPercent = (percentVal != null && Number.isFinite(Number(total)) && Number(total) > 0)
      ? Math.round((Number(total) * (percentVal / 100)) * 100) / 100
      : null;
    // For percent entries, always show the amount computed from the total for consistency
    const amountVal = (entry?.type === 'percent' && computedFromPercent != null)
      ? computedFromPercent
      : (Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0 ? Number(entry.amount) : null);
    const amountDisplay = amountVal != null
      ? escapeHtml(formatCurrency(amountVal))
      : '—';
    const percentDisplay = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
      ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
      : '—';
    const dateDisplay = entry?.recordedAt
      ? normalizeNumbers(formatDateTime(entry.recordedAt))
      : '—';
    const noteDisplay = entry?.note
      ? escapeHtml(normalizeNumbers(entry.note))
      : '—';
    return `
      <tr>
        <td>${escapeHtml(typeLabel)}</td>
        <td>${amountDisplay}</td>
        <td>${percentDisplay}</td>
        <td>${dateDisplay}</td>
        <td>${noteDisplay}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="users-table-wrapper overflow-x-auto project-modal-table-wrapper reservation-payment-history-table-shell">
      <table class="ui-table users-table surface-table table table-sm table-hover align-middle reservation-payment-history-table">
        <thead class="table-light">
          <tr>
            <th>${methodHeader}</th>
            <th>${amountHeader}</th>
            <th>${percentHeader}</th>
            <th>${dateHeader}</th>
            <th>${noteHeader}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ── Edit-mode markup (with delete buttons) ────────────────────────────────────

export function buildProjectEditPaymentHistoryMarkup(payments = [], { total = null } = {}) {
  const methodHeader = escapeHtml(t('reservations.paymentHistory.headers.method', 'نوع الدفعة'));
  const amountHeader = escapeHtml(t('reservations.paymentHistory.headers.amount', 'المبلغ'));
  const percentHeader = escapeHtml(t('reservations.paymentHistory.headers.percent', 'النسبة'));
  const dateHeader = escapeHtml(t('reservations.paymentHistory.headers.date', 'التاريخ'));
  const noteHeader = escapeHtml(t('reservations.paymentHistory.headers.note', 'ملاحظات'));
  const actionsHeader = escapeHtml(t('projects.expenses.table.headers.actions', 'الإجراءات'));

  if (!Array.isArray(payments) || payments.length === 0) {
    const emptyText = escapeHtml(t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة'));
    return `
      <div class="users-table-wrapper overflow-x-auto project-modal-table-wrapper reservation-payment-history-table-shell">
        <table class="ui-table users-table surface-table table table-sm table-hover align-middle reservation-payment-history-table">
          <thead class="table-light">
            <tr>
              <th>${methodHeader}</th>
              <th>${amountHeader}</th>
              <th>${percentHeader}</th>
              <th>${dateHeader}</th>
              <th>${noteHeader}</th>
              <th>${actionsHeader}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="6" class="text-center text-muted">${emptyText}</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  const rows = payments.map((payment, index) => {
    const typeLabel = payment?.type === 'percent'
      ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
      : t('reservations.paymentHistory.type.amount', 'دفعة مالية');
    const percentVal = Number.isFinite(Number(payment?.percentage)) && Number(payment.percentage) > 0
      ? Number(payment.percentage)
      : null;
    const computedFromPercent = (percentVal != null && Number.isFinite(Number(total)) && Number(total) > 0)
      ? Math.round((Number(total) * (percentVal / 100)) * 100) / 100
      : null;
    const amountVal = (payment?.type === 'percent' && computedFromPercent != null)
      ? computedFromPercent
      : (Number.isFinite(Number(payment?.amount)) && Number(payment.amount) > 0 ? Number(payment.amount) : null);
    const amountDisplay = amountVal != null
      ? escapeHtml(formatCurrency(amountVal))
      : '—';
    const percentDisplay = Number.isFinite(Number(payment?.percentage)) && Number(payment.percentage) > 0
      ? `${normalizeNumbers(Number(payment.percentage).toFixed(2))}%`
      : '—';
    const dateDisplay = payment?.recordedAt
      ? normalizeNumbers(formatDateTime(payment.recordedAt))
      : '—';
    const noteDisplay = payment?.note ? escapeHtml(normalizeNumbers(payment.note)) : '';
    const removeLabel = escapeHtml(t('reservations.paymentHistory.actions.delete', 'حذف الدفعة'));

    return `
      <tr>
        <td>${escapeHtml(typeLabel)}</td>
        <td>${amountDisplay}</td>
        <td>${percentDisplay}</td>
        <td>${dateDisplay}</td>
        <td>${noteDisplay}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${index}" aria-label="${removeLabel}">🗑️</button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="users-table-wrapper overflow-x-auto project-modal-table-wrapper reservation-payment-history-table-shell">
      <table class="ui-table users-table surface-table table table-sm table-hover align-middle reservation-payment-history-table">
        <thead class="table-light">
          <tr>
            <th>${methodHeader}</th>
            <th>${amountHeader}</th>
            <th>${percentHeader}</th>
            <th>${dateHeader}</th>
            <th>${noteHeader}</th>
            <th>${actionsHeader}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}
