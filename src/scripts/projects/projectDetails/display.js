import { t } from '../../language.js';
import { normalizeNumbers } from '../../utils.js';
import { escapeHtml, formatCurrency, formatDateTime } from '../formatting.js';
import { calculateReservationTotal } from '../../reservationsSummary.js';
import { applyProjectItemOverhead } from '../financials.js';

function resolveServiceDays(expense = {}) {
  const parsed = Number.parseInt(String(expense?.service_days ?? expense?.days ?? 1), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function getExpenseLineCost(expense = {}) {
  return (Number(expense?.amount) || 0) * resolveServiceDays(expense);
}

function getExpenseLineSale(expense = {}) {
  return (Number(expense?.sale_price ?? expense?.salePrice) || 0) * resolveServiceDays(expense);
}

// ── Date/time helpers ─────────────────────────────────────────────────────────

function splitDateAndTime(formatted) {
  if (!formatted || formatted === '—') {
    return { date: '—', time: '' };
  }

  const parts = formatted.split(' ').filter(Boolean);
  const date = parts.shift() || '—';
  const time = parts.join(' ');
  return { date, time };
}

export function resolveProjectScheduleItem(kind, value) {
  if (!value) return null;

  const { date, time } = splitDateAndTime(formatDateTime(value));
  const isStart = kind === 'start';
  const icon = isStart ? '⏱️' : '⌛';
  const label = isStart
    ? t('projects.details.labels.start', 'بداية المشروع')
    : t('projects.details.labels.end', 'نهاية المشروع');

  return {
    icon,
    label,
    value: date,
    meta: time
  };
}

// ── Type label ────────────────────────────────────────────────────────────────

export function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social',
    event: 'projects.form.types.event',
    conference: 'projects.form.types.conference'
  }[type] || 'projects.form.types.unknown';
  return t(key, type);
}

export function buildProjectTypeOptionsMarkup(selectedType) {
  const typeOptions = ['commercial', 'coverage', 'photography', 'social', 'event', 'conference'];
  return typeOptions
    .map((type) => {
      const label = getProjectTypeLabel(type);
      const selectedAttr = type === selectedType ? 'selected' : '';
      return `<option value="${escapeHtml(type)}" ${selectedAttr}>${escapeHtml(label)}</option>`;
    })
    .join('');
}

// ── Reservation net total ─────────────────────────────────────────────────────

export function resolveReservationNetTotal(reservation) {
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
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

// ── View-mode expenses table ──────────────────────────────────────────────────

export function buildProjectViewExpensesMarkup(expenses = [], overheadOptions = {}) {
  const hasItems = Array.isArray(expenses) && expenses.length > 0;
  if (!hasItems) {
    const empty = escapeHtml(t('projects.expenses.table.empty', 'ستظهر المصاريف المسجلة هنا فور إضافتها.'));
    return `
      <div class="project-services-table-shell">
        <div class="users-table-wrapper overflow-x-auto project-services-table-wrapper project-modal-table-wrapper">
          <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table">
            <thead class="table-light">
              <tr>
                <th>${escapeHtml(t('projects.expenses.table.headers.service', 'الخدمة'))}</th>
                <th>${escapeHtml(t('projects.expenses.table.headers.cost', 'التكلفة (SR)'))}</th>
                <th>${escapeHtml(t('projects.expenses.table.headers.sale', 'سعر البيع (SR)'))}</th>
                <th>${escapeHtml(t('projects.expenses.table.headers.days', 'الأيام'))}</th>
                <th>${escapeHtml(t('projects.expenses.table.headers.note', 'ملاحظات'))}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colspan="5" class="text-center text-muted">${empty}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  const rows = expenses.map((expense) => {
    const label = escapeHtml(expense?.label || '');
    const days = resolveServiceDays(expense);
    const amount = formatCurrency(getExpenseLineCost(expense));
    const sale = formatCurrency(applyProjectItemOverhead(getExpenseLineSale(expense), overheadOptions));
    const note = expense?.note != null ? String(expense.note) : (expense?.notes != null ? String(expense.notes) : '');
    return `
      <tr>
        <td>${label}</td>
        <td>${escapeHtml(amount)}</td>
        <td>${escapeHtml(sale)}</td>
        <td>${escapeHtml(normalizeNumbers(String(days)))}</td>
        <td>${escapeHtml(note || t('common.placeholder.empty', '—'))}</td>
      </tr>`;
  }).join('');

  return `
    <div class="project-services-table-shell">
      <div class="users-table-wrapper overflow-x-auto project-services-table-wrapper project-modal-table-wrapper">
        <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table">
          <thead class="table-light">
            <tr>
              <th>${escapeHtml(t('projects.expenses.table.headers.service', 'الخدمة'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.cost', 'التكلفة (SR)'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.sale', 'سعر البيع (SR)'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.days', 'الأيام'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.note', 'ملاحظات'))}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Edit-mode expenses table (with inline edit + remove) ─────────────────────

export function buildProjectEditExpensesMarkup(expenses = []) {
  const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
  const thService = escapeHtml(t('projects.expenses.table.headers.service', 'الخدمة'));
  const thCost = escapeHtml(t('projects.expenses.table.headers.cost', 'التكلفة (SR)'));
  const thSale = escapeHtml(t('projects.expenses.table.headers.sale', 'سعر البيع (SR)'));
  const thDays = escapeHtml(t('projects.expenses.table.headers.days', 'الأيام'));
  const thNote = escapeHtml(t('projects.expenses.table.headers.note', 'ملاحظات'));
  const thActions = escapeHtml(t('projects.expenses.table.headers.actions', 'الإجراءات'));

  if (!Array.isArray(expenses) || expenses.length === 0) {
    const emptyText = escapeHtml(t('projects.selected.emptyExpenses', 'لم يتم تسجيل أي مصروف'));
    return `
      <div class="users-table-wrapper overflow-x-auto project-services-table-wrapper project-modal-table-wrapper project-edit-expenses-table-wrapper">
        <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table project-edit-expenses-table">
          <thead class="table-light">
            <tr>
              <th>${thService}</th>
              <th>${thCost}</th>
              <th>${thSale}</th>
              <th>${thDays}</th>
              <th>${thNote}</th>
              <th>${thActions}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="6" class="text-center text-muted">${emptyText}</td></tr>
          </tbody>
        </table>
      </div>`;
  }

  const rows = expenses.map((expense) => {
    const id = escapeHtml(String(expense?.id || ''));
    const label = escapeHtml(String(expense?.label || ''));
    const days = resolveServiceDays(expense);
    const amountDisplay = escapeHtml(formatCurrency(getExpenseLineCost(expense)));
    const saleDisplay = escapeHtml(formatCurrency(getExpenseLineSale(expense)));
    const note = escapeHtml(String((expense?.note ?? expense?.notes) || ''));
    return `
      <tr>
        <td>${label}</td>
        <td>${amountDisplay}</td>
        <td>${saleDisplay}</td>
        <td>${escapeHtml(normalizeNumbers(String(days)))}</td>
        <td>${note || escapeHtml(t('common.placeholder.empty', '—'))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${id}" aria-label="${removeLabel}">✖</button>
        </td>
      </tr>
    `;
  }).join('');

  const saleTotal = expenses.reduce((sum, e) => sum + getExpenseLineSale(e), 0);
  const saleTotalDisplay = escapeHtml(formatCurrency(saleTotal));
  const totalLabel = escapeHtml(t('projects.expenses.table.totalSale', 'مجموع سعر البيع'));

  return `
    <div class="project-services-table-shell">
      <div class="users-table-wrapper overflow-x-auto project-services-table-wrapper project-modal-table-wrapper project-edit-expenses-table-wrapper">
        <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table project-edit-expenses-table">
          <thead class="table-light">
            <tr>
              <th>${thService}</th>
              <th>${thCost}</th>
              <th>${thSale}</th>
              <th>${thDays}</th>
              <th>${thNote}</th>
              <th>${thActions}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="project-services-total-bar" aria-label="${totalLabel}">
        <span class="project-services-total-bar__label">${totalLabel}</span>
        <strong class="project-services-total-bar__value">${saleTotalDisplay}</strong>
      </div>
    </div>
  `;
}
