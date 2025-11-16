import '../styles/app.css';
import { getTechnicianById, syncTechniciansStatuses } from './technicians.js';
import { refreshTechniciansFromApi } from './techniciansService.js';
import { renderTechnicianReservations, renderTechnicianProjects, normalizeTechnicianAssignments } from './technicianDetails.js';
import { setReservationsUIHandlers } from './reservations/uiBridge.js';
import { normalizeNumbers, showToast } from './utils.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState } from './reservationsService.js';
import { calculateReservationDays } from './reservationsSummary.js';
import { listTechnicianPayouts, createTechnicianPayout, deleteTechnicianPayout } from './technicianPayoutsService.js';

applyStoredTheme();
checkAuth();
initDashboardShell();

const urlParams = new URLSearchParams(window.location.search);
const technicianId = urlParams.get('id');
const container = document.getElementById('technician-details');

const heroNameEl = document.getElementById('technician-hero-name');
const heroStatusEl = document.getElementById('technician-hero-status');
const heroRoleEl = document.getElementById('technician-hero-role');
const heroPositionEl = document.getElementById('technician-hero-position');
const greetingNameEl = document.getElementById('dashboard-greeting-technician-name');
const greetingRoleEl = document.getElementById('dashboard-greeting-technician-role');
const greetingStatusEl = document.getElementById('dashboard-greeting-technician-status');
const greetingRoleBadgeEl = document.getElementById('dashboard-greeting-technician-role-badge');

const sidebarProjectsEl = document.getElementById('sidebar-stat-projects');
const sidebarReservationsEl = document.getElementById('sidebar-stat-reservations');
const sidebarEquipmentEl = document.getElementById('sidebar-stat-equipment');
const sidebarTechniciansEl = document.getElementById('sidebar-stat-technicians');

const financialSummaryEls = {
  total: document.getElementById('technician-financial-total'),
  totalDesc: document.getElementById('technician-financial-total-desc'),
  paid: document.getElementById('technician-financial-paid'),
  paidDesc: document.getElementById('technician-financial-paid-desc'),
  outstanding: document.getElementById('technician-financial-outstanding'),
  outstandingDesc: document.getElementById('technician-financial-outstanding-desc'),
};

const financialModalEl = document.getElementById('technician-financial-modal');
const financialModalOpenBtn = document.getElementById('technician-financial-open');
const financialModalTotalEl = document.getElementById('technician-financial-modal-total');
const financialModalPaidEl = document.getElementById('technician-financial-modal-paid');
const financialModalOutstandingEl = document.getElementById('technician-financial-modal-outstanding');
const financialModalEmptyEl = document.getElementById('technician-financial-modal-empty');
const financialModalTableWrapper = document.getElementById('technician-financial-modal-table-wrapper');
const financialModalRowsEl = document.getElementById('technician-financial-modal-rows');
const financialModalCloseButtons = Array.from(document.querySelectorAll('[data-financial-modal-close]'));
const financialPayoutForm = document.getElementById('technician-payout-form');
const financialPayoutAmountInput = document.getElementById('technician-payout-amount');
const financialPayoutDateInput = document.getElementById('technician-payout-date');
const financialPayoutNoteInput = document.getElementById('technician-payout-note');
const financialPayoutListEl = document.getElementById('technician-payouts-list');
const financialPayoutEmptyEl = document.getElementById('technician-payouts-empty');
const payoutConfirmModalEl = document.getElementById('technician-payout-confirm-modal');
const payoutConfirmYesBtn = document.getElementById('technician-payout-confirm-yes');
const payoutConfirmCloseButtons = Array.from(document.querySelectorAll('[data-payout-confirm-close]'));

const technicianTabButtons = Array.from(document.querySelectorAll('[data-technician-tab]'));
const technicianTabPanels = new Map(
  Array.from(document.querySelectorAll('[data-technician-tab-panel]')).map((panel) => [panel.getAttribute('data-technician-tab-panel'), panel])
);

let activeTechnicianTab = 'reservations';
let technicianState = null;
let technicianFinancialState = {
  totals: { total: 0, paid: 0, outstanding: 0 },
  metrics: { assignments: 0, payoutsCount: 0, outstandingAmount: 0 },
  breakdown: [],
  payouts: [],
};

let technicianPayoutsState = [];
let pendingPayoutRemovalId = null;

initThemeToggle();

function getActiveLanguage() {
  return document.documentElement.getAttribute('lang') || 'ar';
}

function formatNumberLocalized(value) {
  const number = Number(value) || 0;
  const lang = getActiveLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US';
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(number);
  } catch (error) {
    return normalizeNumbers(String(number)) || '0';
  }
}

function updateSidebarStats({ projects = 0, reservations = 0, equipment = 0, technicians = 0 } = {}) {
  if (sidebarProjectsEl) sidebarProjectsEl.textContent = formatNumberLocalized(projects);
  if (sidebarReservationsEl) sidebarReservationsEl.textContent = formatNumberLocalized(reservations);
  if (sidebarEquipmentEl) sidebarEquipmentEl.textContent = formatNumberLocalized(equipment);
  if (sidebarTechniciansEl) sidebarTechniciansEl.textContent = formatNumberLocalized(technicians);
}

function resolveReservationItemQuantity(item) {
  if (!item || typeof item !== 'object') return 0;
  const candidates = [item.quantity, item.qty, item.count];
  for (const candidate of candidates) {
    if (candidate == null || candidate === '') continue;
    const parsed = Number(normalizeNumbers(String(candidate)));
    if (Number.isFinite(parsed)) {
      if (parsed > 0) {
        return parsed;
      }
      return 0;
    }
  }
  return 1;
}

function computeTechnicianSidebarStats(reservations, technicianId) {
  if (!Array.isArray(reservations) || !reservations.length) {
    return {
      projects: 0,
      reservations: 0,
      equipment: 0,
      technicians: technicianId ? 1 : 0
    };
  }

  const projectsSet = new Set();
  const collaboratorIds = new Set();
  if (technicianId) {
    collaboratorIds.add(String(technicianId));
  }

  let equipmentCount = 0;

  reservations.forEach((reservation) => {
    if (!reservation) return;
    if (reservation.projectId != null) {
      projectsSet.add(String(reservation.projectId));
    }

    const technicianIds = normalizeTechnicianAssignments(reservation.technicians);
    technicianIds.forEach((id) => collaboratorIds.add(id));

    if (Array.isArray(reservation.items)) {
      reservation.items.forEach((item) => {
        equipmentCount += resolveReservationItemQuantity(item);
      });
    }
  });

  return {
    projects: projectsSet.size,
    reservations: reservations.length,
    equipment: equipmentCount,
    technicians: collaboratorIds.size || (technicianId ? 1 : 0)
  };
}

function formatCurrency(value) {
  const amount = Number(value) || 0;
  const lang = getActiveLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  try {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  const currencyLabel = 'SR';
    return `${normalizeNumbers(formatted)} ${currencyLabel}`;
  } catch (error) {
    const fallback = Math.round(amount);
  const currencyLabel = 'SR';
    return `${normalizeNumbers(String(fallback))} ${currencyLabel}`;
  }
}

function formatDateLocalized(value) {
  if (!value) return t('common.placeholder.empty', '—');
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return t('common.placeholder.empty', '—');
  }
  const lang = getActiveLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  } catch (error) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


function resolveTechnicianCostRate(technician = {}) {
  const candidates = [
    technician.dailyWage,
    technician.daily_rate,
    technician.dailyRate,
    technician.rate,
    technician.wage,
  ];

  for (const value of candidates) {
    if (value == null || value === '') continue;
    const number = Number(normalizeNumbers(String(value)));
    if (Number.isFinite(number)) {
      return number;
    }
  }
  return 0;
}

function buildPaymentStatusBadge(status) {
  const normalized = typeof status === 'string' ? status.toLowerCase() : 'unpaid';
  let key = 'technicianFinancial.status.unpaid';
  let badgeClass = 'technician-payment-badge technician-payment-badge--unpaid';
  if (normalized === 'paid') {
    key = 'technicianFinancial.status.paid';
    badgeClass = 'technician-payment-badge technician-payment-badge--paid';
  } else if (normalized === 'partial') {
    key = 'technicianFinancial.status.partial';
    badgeClass = 'technician-payment-badge technician-payment-badge--partial';
  }
  return `<span class="${badgeClass}" data-i18n data-i18n-key="${key}">${t(key, key)}</span>`;
}

function renderFinancialSummary(state) {
  const { totals, metrics } = state;
  const assignmentsCount = Number(metrics.assignments ?? 0);
  const payoutsCount = Number(metrics.payoutsCount ?? 0);
  const assignmentsText = t('technicianFinancial.stats.totalDesc', 'مرتبطة بـ {count} مهام')
    .replace('{count}', normalizeNumbers(String(assignmentsCount)));
  const paidText = t('technicianFinancial.stats.paidDesc', '{count} دفعات مسجلة')
    .replace('{count}', normalizeNumbers(String(payoutsCount)));
  const outstandingTemplate = t('technicianFinancial.stats.outstandingDesc', 'المتبقي {amount}');
  const outstandingText = totals.outstanding > 0
    ? outstandingTemplate.replace('{amount}', formatCurrency(totals.outstanding))
    : t('common.placeholder.empty', '—');

  if (financialSummaryEls.total) financialSummaryEls.total.textContent = formatCurrency(totals.total);
  if (financialSummaryEls.totalDesc) financialSummaryEls.totalDesc.textContent = assignmentsCount > 0 ? assignmentsText : t('common.placeholder.empty', '—');
  if (financialSummaryEls.paid) financialSummaryEls.paid.textContent = formatCurrency(totals.paid);
  if (financialSummaryEls.paidDesc) financialSummaryEls.paidDesc.textContent = payoutsCount > 0 ? paidText : t('common.placeholder.empty', '—');
  if (financialSummaryEls.outstanding) financialSummaryEls.outstanding.textContent = formatCurrency(totals.outstanding);
  if (financialSummaryEls.outstandingDesc) financialSummaryEls.outstandingDesc.textContent = outstandingText;
}

function renderFinancialModal(state) {
  const { totals, breakdown, payouts } = state;
  if (financialModalTotalEl) financialModalTotalEl.textContent = formatCurrency(totals.total);
  if (financialModalPaidEl) financialModalPaidEl.textContent = formatCurrency(totals.paid);
  if (financialModalOutstandingEl) financialModalOutstandingEl.textContent = formatCurrency(totals.outstanding);

  if (!financialModalRowsEl || !financialModalTableWrapper || !financialModalEmptyEl) {
    return;
  }

  if (!breakdown.length) {
    financialModalRowsEl.innerHTML = '';
    financialModalTableWrapper.classList.add('hidden');
    financialModalEmptyEl.classList.remove('hidden');
  } else {
    financialModalEmptyEl.classList.add('hidden');
    financialModalTableWrapper.classList.remove('hidden');

    const rows = breakdown.map((entry) => {
      const period = entry.period || '—';
      const outstanding = entry.outstandingAmount > 0
        ? formatCurrency(entry.outstandingAmount)
        : `<span class="text-success">${t('technicianFinancial.list.settled', 'لا يوجد')}</span>`;
      return `
        <tr>
          <td>
            <div class="font-semibold text-base-content">${escapeHtml(entry.label)}</div>
            <div class="text-xs text-base-content/60">${escapeHtml(entry.reference)}</div>
          </td>
          <td class="whitespace-nowrap">${escapeHtml(period)}</td>
          <td>${formatCurrency(entry.dueAmount)}</td>
          <td>${buildPaymentStatusBadge(entry.paidStatus)}</td>
          <td>${outstanding}</td>
        </tr>
      `;
    }).join('');

    financialModalRowsEl.innerHTML = rows;
  }

  renderFinancialPayouts(payouts);
}

function renderFinancialPayouts(payouts = []) {
  if (!financialPayoutListEl || !financialPayoutEmptyEl) {
    return;
  }

  if (!Array.isArray(payouts) || payouts.length === 0) {
    financialPayoutListEl.innerHTML = '';
    financialPayoutEmptyEl.classList.remove('hidden');
    return;
  }

  const items = payouts.map((entry) => {
    const amountFormatted = formatCurrency(entry.amount || 0);
    const dateFormatted = formatDateLocalized(entry.paidAt || entry.createdAt);
    const noteHtml = entry.note
      ? `<p class="technician-payout-note text-sm text-base-content/70">${escapeHtml(entry.note)}</p>`
      : '';
    const deleteLabel = t('actions.delete', '🗑️ حذف');

    return `
      <li class="technician-payout-item">
        <div class="technician-payout-item-body">
          <div class="technician-payout-item-head">
            <span class="technician-payout-amount">${amountFormatted}</span>
            <span class="technician-payout-date">${escapeHtml(dateFormatted)}</span>
          </div>
          ${noteHtml}
        </div>
        <button type="button" class="btn btn-outline btn-sm technician-payout-remove" data-payout-remove="${escapeHtml(entry.id)}" data-i18n data-i18n-key="actions.delete">${deleteLabel}</button>
      </li>
    `;
  }).join('');

  financialPayoutListEl.innerHTML = items;
  financialPayoutEmptyEl.classList.add('hidden');
}

function formatDateInputValue(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return date.toISOString().slice(0, 10);
}

function parseDateInputValue(value) {
  if (!value) {
    return new Date();
  }
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }
  return parsed;
}

function sanitizeAmountInput(rawValue) {
  const normalized = normalizeNumbers(String(rawValue ?? ''));
  if (!normalized) return '';
  const withDecimal = normalized
    .replace(/[٬،]/g, '')
    .replace(/[٫,]/g, '.');
  const cleaned = withDecimal.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  const integerPart = parts[0] || '';
  const decimalPart = parts.length > 1 ? parts.slice(1).join('') : '';
  const trimmedInteger = integerPart.replace(/^0+(\d)/, '$1');
  const finalInteger = trimmedInteger.length ? trimmedInteger : (decimalPart ? '0' : '');
  const finalDecimal = decimalPart ? decimalPart.replace(/\D/g, '').slice(0, 2) : '';
  return finalDecimal ? `${finalInteger}.${finalDecimal}` : finalInteger;
}

function handlePayoutFormSubmit(event) {
  event.preventDefault();
  if (!technicianId) {
    showToast(t('technicianFinancial.payouts.toast.invalidTechnician', '⚠️ لا يمكن تحديد عضو الطاقم حالياً.'));
    return;
  }

  const amountRaw = financialPayoutAmountInput?.value ?? '';
  const amount = Number.parseFloat(normalizeNumbers(String(amountRaw)));
  if (!Number.isFinite(amount) || amount <= 0) {
    showToast(t('technicianFinancial.payouts.toast.invalidAmount', '⚠️ أدخل قيمة صحيحة للمبلغ.'));
    financialPayoutAmountInput?.focus();
    return;
  }

  const note = financialPayoutNoteInput?.value?.trim() || '';
  const paidDate = parseDateInputValue(financialPayoutDateInput?.value || null);
  const submitButton = financialPayoutForm?.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
  }

  createTechnicianPayout({
    technicianId,
    amount: Number(amount.toFixed(2)),
    note,
    paidAt: paidDate.toISOString(),
  }).then((entry) => {
    showToast(t('technicianFinancial.payouts.toast.added', '✅ تم تسجيل الدفعة.'));
    financialPayoutForm?.reset();
    if (financialPayoutDateInput) {
      financialPayoutDateInput.value = formatDateInputValue(entry?.paidAt || new Date());
    }
    if (technicianState) {
      refreshTechnicianFinancialSummary(technicianState);
    }
  }).catch((error) => {
    console.error('❌ [technician-page] Failed to create technician payout', error);
    const message = error?.message || t('technicianFinancial.payouts.toast.failed', '⚠️ تعذر تسجيل الدفعة، حاول مرة أخرى.');
    showToast(message);
  }).finally(() => {
    if (submitButton) {
      submitButton.disabled = false;
    }
  });
}

function handlePayoutRemoval(payoutId) {
  if (!payoutId) return;
  openPayoutConfirmModal(payoutId);
}

function openFinancialModal() {
  if (!financialModalEl) return;
  financialModalEl.classList.remove('hidden');
  financialModalEl.classList.add('show');
  financialModalEl.classList.add('modal-open');
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('overflow-hidden');
  if (financialPayoutDateInput && !financialPayoutDateInput.value) {
    financialPayoutDateInput.value = formatDateInputValue(new Date());
  }
}

function closeFinancialModal() {
  if (!financialModalEl) return;
  financialModalEl.classList.remove('show');
  financialModalEl.classList.remove('modal-open');
  financialModalEl.classList.add('hidden');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('overflow-hidden');
}

function openPayoutConfirmModal(payoutId) {
  if (!payoutConfirmModalEl) return;
  pendingPayoutRemovalId = payoutId || null;
  payoutConfirmModalEl.classList.remove('hidden');
  payoutConfirmModalEl.classList.add('show', 'modal-open');
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('overflow-hidden');
}

function closePayoutConfirmModal() {
  if (!payoutConfirmModalEl) return;
  payoutConfirmModalEl.classList.remove('show', 'modal-open');
  payoutConfirmModalEl.classList.add('hidden');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('overflow-hidden');
  pendingPayoutRemovalId = null;
  if (payoutConfirmYesBtn) {
    payoutConfirmYesBtn.disabled = false;
  }
}

function getTechnicianEditButtons() {
  return Array.from(document.querySelectorAll('[data-technician-edit]'));
}

function handleTechnicianEditClick(event) {
  event.preventDefault();
  if (!technicianState) {
    return;
  }

  try {
    document.dispatchEvent(new CustomEvent('technician:prefill', {
      detail: { ...technicianState }
    }));
  } catch (error) {
    console.error('⚠️ [technician-page] Failed to prefill technician edit modal', error);
  }

  const modalEl = document.getElementById('editTechnicianModal');
  if (!modalEl || !window.bootstrap?.Modal) {
    return;
  }

  const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
  modalInstance.show();
}

function attachTechnicianEditListeners() {
  getTechnicianEditButtons().forEach((button) => {
    if (!button || button.dataset.listenerAttached) return;
    button.addEventListener('click', handleTechnicianEditClick);
    button.dataset.listenerAttached = 'true';
  });
}

async function refreshTechnicianFinancialSummary(technician) {
  const initialState = {
    totals: { total: 0, paid: 0, outstanding: 0 },
    metrics: { assignments: 0, payoutsCount: 0, outstandingAmount: 0 },
    breakdown: [],
    payouts: [],
  };

  technicianFinancialState = initialState;
  renderFinancialSummary(technicianFinancialState);
  renderFinancialModal(technicianFinancialState);
  updateSidebarStats();

  if (!technicianId || !technician) {
    return;
  }

  try {
    await ensureReservationsLoaded({ suppressError: true });
  } catch (error) {
    console.error('⚠️ [technician-page] Failed to load reservations for financial summary', error);
  }

  const reservations = getReservationsState();
  const normalizedId = String(technicianId);

  try {
    const payoutsResponse = await listTechnicianPayouts(normalizedId);
    technicianPayoutsState = Array.isArray(payoutsResponse) ? payoutsResponse : [];
  } catch (error) {
    console.error('⚠️ [technician-page] Failed to load technician payouts from API', error);
    technicianPayoutsState = [];
  }
  const relevantReservations = reservations.filter((reservation) => {
    if (!reservation) return false;
    const rawStatus = String(reservation.status || '').toLowerCase();
    if (rawStatus === 'cancelled' || rawStatus === 'canceled' || rawStatus === 'ملغي' || rawStatus === 'ملغى' || rawStatus === 'ملغية') {
      return false;
    }
    const technicianIds = Array.isArray(reservation.technicians)
      ? reservation.technicians.map((id) => String(id))
      : [];
    return technicianIds.includes(normalizedId);
  });

  const sidebarStats = computeTechnicianSidebarStats(relevantReservations, normalizedId);
  updateSidebarStats(sidebarStats);
  // Persist filtered stats for other scripts (fallbacks) to reuse if needed
  try {
    window.__TECHNICIAN_STATS__ = sidebarStats;
  } catch (_) {}

  const breakdown = relevantReservations.map((reservation, index) => {
    const detailsEntry = Array.isArray(reservation.techniciansDetails)
      ? reservation.techniciansDetails.find((entry) => {
          const entryId = entry?.id ?? entry?.technician_id ?? entry?.technicianId ?? entry?.ID;
          return entryId != null && String(entryId) === normalizedId;
        })
      : null;

    const rate = resolveTechnicianCostRate(detailsEntry) || resolveTechnicianCostRate(technician);
    const days = Math.max(1, calculateReservationDays(reservation.start, reservation.end));
    const dueAmount = Math.max(0, Math.round(rate * days));

    const fallbackLabel = t('technicianFinancial.list.reservationFallback', 'حجز رقم {id}')
      .replace('{id}', normalizeNumbers(String(reservation.reservationId || reservation.id || '?')));
    const label = reservation.title && reservation.title.trim().length
      ? reservation.title.trim()
      : fallbackLabel;

    const referenceParts = [];
    if (reservation.reservationId || reservation.id) {
      const refId = reservation.reservationId || reservation.id;
      referenceParts.push(`#${normalizeNumbers(String(refId))}`);
    }
    if (reservation.projectId) {
      referenceParts.push(
        t('technicianFinancial.list.projectReference', 'مشروع #{id}')
          .replace('{id}', normalizeNumbers(String(reservation.projectId)))
      );
    }
    if (reservation.status) {
      const statusKey = `reservations.status.${reservation.status}`;
      referenceParts.push(t(statusKey, reservation.status));
    }

    const periodStart = formatDateLocalized(reservation.start);
    const periodEnd = formatDateLocalized(reservation.end);
    const period = periodStart === periodEnd
      ? periodStart
      : `${periodStart} – ${periodEnd}`;

    const sortKey = (() => {
      const dateOrder = reservation.start || reservation.startDatetime || reservation.createdAt || reservation.created_at;
      const parsed = dateOrder ? new Date(dateOrder).getTime() : NaN;
      if (Number.isNaN(parsed)) {
        return index;
      }
      return parsed;
    })();

    return {
      label,
      reference: referenceParts.join(' • ') || '—',
      period,
      dueAmount,
      paidAmount: 0,
      outstandingAmount: dueAmount,
      paidStatus: 'unpaid',
      sortKey,
      originalIndex: index,
    };
  });

  const payouts = technicianPayoutsState.map((entry) => ({
    ...entry,
    amount: Number(entry.amount) || 0,
  }));
  let remainingPayout = payouts.reduce((acc, entry) => acc + entry.amount, 0);
  const sortedForAllocation = [...breakdown]
    .sort((a, b) => {
      if (a.sortKey === b.sortKey) {
        return a.originalIndex - b.originalIndex;
      }
      return a.sortKey - b.sortKey;
    })
    .map((entry) => {
      const result = { ...entry };
      const due = Number(entry.dueAmount) || 0;
      const applied = Math.min(due, Math.max(0, Number(remainingPayout.toFixed(2))));
      if (applied > 0) {
        remainingPayout = Number((remainingPayout - applied).toFixed(2));
      }
      result.paidAmount = Number(applied.toFixed(2));
      const outstanding = Math.max(0, Number((due - applied).toFixed(2)));
      result.outstandingAmount = outstanding;
      if (outstanding <= 0.009) {
        result.paidStatus = 'paid';
        result.outstandingAmount = 0;
      } else if (applied > 0) {
        result.paidStatus = 'partial';
      } else {
        result.paidStatus = 'unpaid';
      }
      return result;
    });

  // Restore original order for display
  const processedBreakdown = sortedForAllocation
    .sort((a, b) => a.originalIndex - b.originalIndex)
    .map(({ sortKey, originalIndex, ...rest }) => rest);

  const totalsDue = processedBreakdown.reduce((acc, entry) => acc + entry.dueAmount, 0);
  const payoutsTotal = payouts.reduce((acc, entry) => acc + (Number(entry.amount) || 0), 0);
  const outstanding = Math.max(0, Number((totalsDue - payoutsTotal).toFixed(2)));

  const totals = {
    total: Math.max(0, Number(totalsDue.toFixed(2))),
    paid: Math.max(0, Number(payoutsTotal.toFixed(2))),
    outstanding,
  };

  const metrics = {
    assignments: processedBreakdown.length,
    payoutsCount: payouts.length,
    outstandingAmount: outstanding,
  };

  technicianFinancialState = { totals, metrics, breakdown: processedBreakdown, payouts };
  renderFinancialSummary(technicianFinancialState);
  renderFinancialModal(technicianFinancialState);
}

function setHeroBadge(element, icon, value, { hideWhenEmpty = false } = {}) {
  if (!element) return;
  const stringValue = value == null ? '' : String(value).trim();
  const hasValue = stringValue.length > 0;
  element.textContent = hasValue ? `${icon} ${stringValue}` : `${icon} ${t('common.placeholder.empty', '—')}`;
  if (hideWhenEmpty) {
    element.classList.toggle('hidden', !hasValue);
  } else if (!hasValue) {
    element.classList.remove('hidden');
  }
}

function setStatusBadge(status) {
  const targets = [heroStatusEl, greetingStatusEl].filter(Boolean);
  if (!targets.length) {
    return;
  }

  const normalized = typeof status === 'string' ? status.toLowerCase() : '';

  if (!normalized) {
    targets.forEach((element) => {
      element.className = 'technician-badge hidden';
      element.textContent = t('common.placeholder.empty', '—');
    });
    return;
  }

  const isBusy = normalized === 'busy';
  const badgeClasses = ['technician-badge'];
  badgeClasses.push(isBusy ? 'technician-badge--status-busy' : 'technician-badge--status-available');

  const key = isBusy ? 'technicians.status.busy' : 'technicians.status.available';
  const fallback = isBusy ? '⛔ مشغول' : '✅ متاح';

  targets.forEach((element) => {
    element.className = badgeClasses.join(' ');
    element.classList.remove('hidden');
    element.setAttribute('data-i18n', '');
    element.setAttribute('data-i18n-key', key);
    element.textContent = t(key, fallback);
  });

  // Toggle current position badge in hero (only when busy)
  if (heroPositionEl) {
    if (isBusy) {
      const label = getCurrentPositionLabelForTechnician(technicianId);
      const text = label && String(label).trim().length ? label : '';
      setHeroBadge(heroPositionEl, '🏷️', text, { hideWhenEmpty: true });
    } else {
      setHeroBadge(heroPositionEl, '🏷️', '', { hideWhenEmpty: true });
    }
  }
}

function getCurrentPositionLabelForTechnician(id) {
  try {
    const reservations = getReservationsState();
    if (!Array.isArray(reservations) || reservations.length === 0) return '';
    const normalizedId = id != null ? String(id) : null;
    if (!normalizedId) return '';
    const now = new Date();

    // Find an active reservation for this technician
    const active = reservations.find((res) => {
      if (!res || (!res.start && !res.startDatetime && !res.start_datetime)) return false;
      const ids = normalizeTechnicianAssignments(res.technicians);
      if (!Array.isArray(ids) || !ids.includes(normalizedId)) return false;
      const start = res.start ?? res.startDatetime ?? res.start_datetime;
      const end = res.end ?? res.endDatetime ?? res.end_datetime;
      if (!start || !end) return false;
      const s = new Date(start);
      const e = new Date(end);
      if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return false;
      return s <= now && now < e;
    });

    if (!active) return '';

    // Try to resolve a position label from crew assignments or techniciansDetails
    const detailsList = Array.isArray(active.crewAssignments) && active.crewAssignments.length
      ? active.crewAssignments
      : (Array.isArray(active.techniciansDetails) ? active.techniciansDetails : []);

    const entry = detailsList.find((item) => {
      const entryId = item?.id ?? item?.technicianId ?? item?.technician_id;
      return entryId != null && String(entryId) === normalizedId;
    });

    if (!entry) return '';

    const label = entry.positionLabel
      ?? entry.position_name
      ?? entry.position_label
      ?? entry.positionKey
      ?? entry.position;

    return label || '';
  } catch (_) {
    return '';
  }
}

function setHeroData(technician) {
  if (!technician) {
    setHeroBadge(heroNameEl, '😎', t('common.placeholder.empty', '—'));
  setHeroBadge(heroRoleEl, '🎯', '', { hideWhenEmpty: true });
    if (greetingNameEl) greetingNameEl.textContent = t('common.placeholder.empty', '—');
    if (greetingRoleEl) greetingRoleEl.textContent = t('common.placeholder.empty', '—');
    setHeroBadge(greetingRoleBadgeEl, '🎯', '', { hideWhenEmpty: true });
    setStatusBadge(null);
    return;
  }

  setHeroBadge(heroNameEl, '😎', technician.name || t('common.placeholder.empty', '—'));
  setHeroBadge(heroRoleEl, '🎯', technician.role || '', { hideWhenEmpty: true });
  if (greetingNameEl) {
    greetingNameEl.textContent = technician.name || t('common.placeholder.empty', '—');
  }
  if (greetingRoleEl) {
    const roleText = technician.role ? technician.role : '';
    if (roleText) {
      greetingRoleEl.textContent = `🎯 ${roleText}`;
    } else {
      const fallbackRole = t('technicianDetails.fallback.role', 'غير محدد');
      greetingRoleEl.textContent = `🎯 ${fallbackRole}`;
    }
  }
  setHeroBadge(greetingRoleBadgeEl, '🎯', technician.role || '', { hideWhenEmpty: true });
  setStatusBadge(technician.status || technician.baseStatus || 'available');
}

function setEditButtonsDisabled(state) {
  getTechnicianEditButtons().forEach((button) => {
    button.disabled = Boolean(state);
  });
}

function setActiveTechnicianTab(tab) {
  if (!tab) return;
  activeTechnicianTab = tab;
  technicianTabButtons.forEach((button) => {
    if (!button) return;
    const isActive = button.getAttribute('data-technician-tab') === tab;
    button.classList.toggle('tab-active', isActive);
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  technicianTabPanels.forEach((panel, key) => {
    if (!panel) return;
    panel.classList.toggle('hidden', key !== tab);
  });

  if (tab === 'projects' && technicianId) {
    renderTechnicianProjects(technicianId);
  }
  if (tab === 'reservations' && technicianId) {
    renderTechnicianReservations(technicianId);
  }
}

function initTechnicianTabs() {
  if (!technicianTabButtons.length) {
    return;
  }
  technicianTabButtons.forEach((button) => {
    if (!button || button.dataset.listenerAttached) return;
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-technician-tab');
      if (!tab) return;
      setActiveTechnicianTab(tab);
    });
    button.dataset.listenerAttached = 'true';
  });

  document.querySelectorAll('[data-technician-tab-trigger]').forEach((trigger) => {
    if (!trigger || trigger.dataset.listenerAttached) return;
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const tab = trigger.getAttribute('data-technician-tab-trigger');
      if (!tab) return;
      setActiveTechnicianTab(tab);
    });
    trigger.dataset.listenerAttached = 'true';
  });

  setActiveTechnicianTab(activeTechnicianTab);
}

setHeroData(null);
setEditButtonsDisabled(true);
initTechnicianTabs();
attachTechnicianEditListeners();

if (financialModalOpenBtn && !financialModalOpenBtn.dataset.listenerAttached) {
  financialModalOpenBtn.addEventListener('click', () => {
    renderFinancialModal(technicianFinancialState);
    openFinancialModal();
  });
  financialModalOpenBtn.dataset.listenerAttached = 'true';
}

financialModalCloseButtons.forEach((button) => {
  if (!button || button.dataset.listenerAttached) return;
  button.addEventListener('click', () => {
    closeFinancialModal();
  });
  button.dataset.listenerAttached = 'true';
});

if (financialPayoutForm && !financialPayoutForm.dataset.listenerAttached) {
  financialPayoutForm.addEventListener('submit', handlePayoutFormSubmit);
  financialPayoutForm.dataset.listenerAttached = 'true';
}

if (financialPayoutListEl && !financialPayoutListEl.dataset.listenerAttached) {
  financialPayoutListEl.addEventListener('click', (event) => {
    const target = event.target.closest('[data-payout-remove]');
    if (!target) return;
    const payoutId = target.getAttribute('data-payout-remove');
    handlePayoutRemoval(payoutId);
  });
  financialPayoutListEl.dataset.listenerAttached = 'true';
}

if (financialPayoutAmountInput && !financialPayoutAmountInput.dataset.normalizerAttached) {
  const normalizeInput = () => {
    const sanitized = sanitizeAmountInput(financialPayoutAmountInput.value);
    if (sanitized !== financialPayoutAmountInput.value) {
      const cursor = sanitized.length;
      financialPayoutAmountInput.value = sanitized;
      if (financialPayoutAmountInput.setSelectionRange) {
        financialPayoutAmountInput.setSelectionRange(cursor, cursor);
      }
    }
  };
  financialPayoutAmountInput.addEventListener('input', normalizeInput);
  financialPayoutAmountInput.addEventListener('blur', () => {
    normalizeInput();
    if (financialPayoutAmountInput.value) {
      const numberValue = Number.parseFloat(financialPayoutAmountInput.value);
      if (Number.isFinite(numberValue)) {
        financialPayoutAmountInput.value = numberValue.toFixed(2);
      }
    }
  });
  financialPayoutAmountInput.dataset.normalizerAttached = 'true';
}

payoutConfirmCloseButtons.forEach((button) => {
  if (!button || button.dataset.listenerAttached) return;
  button.addEventListener('click', closePayoutConfirmModal);
  button.dataset.listenerAttached = 'true';
});

if (payoutConfirmYesBtn && !payoutConfirmYesBtn.dataset.listenerAttached) {
  payoutConfirmYesBtn.addEventListener('click', () => {
    if (!pendingPayoutRemovalId) {
      closePayoutConfirmModal();
      return;
    }
    payoutConfirmYesBtn.disabled = true;
    deleteTechnicianPayout(pendingPayoutRemovalId).then(() => {
      showToast(t('technicianFinancial.payouts.toast.removed', '🗑️ تم حذف الدفعة.'));
      closePayoutConfirmModal();
      if (technicianState) {
        refreshTechnicianFinancialSummary(technicianState);
      }
    }).catch((error) => {
      console.error('❌ [technician-page] Failed to remove technician payout', error);
      const message = error?.message || t('technicianFinancial.payouts.toast.failed', '⚠️ تعذر تسجيل الدفعة، حاول مرة أخرى.');
      showToast(message);
      payoutConfirmYesBtn.disabled = false;
    });
  });
  payoutConfirmYesBtn.dataset.listenerAttached = 'true';
}
if (financialModalEl && !financialModalEl.dataset.listenerAttached) {
  financialModalEl.addEventListener('click', (event) => {
    if (event.target === financialModalEl) {
      closeFinancialModal();
    }
  });
  financialModalEl.dataset.listenerAttached = 'true';
}


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && financialModalEl && financialModalEl.classList.contains('modal-open')) {
    closeFinancialModal();
  }
});

// تعيين معالج كسول لتفاصيل الحجز لتجنّب سحب وحدة الحجوزات في التحميل الأولي
setReservationsUIHandlers({
  showReservationDetails(index) {
    import('./reservationsUI.js')
      .then((m) => {
        try { m.showReservationDetails?.(index); } catch (e) { console.error('❌ showReservationDetails failed', e); }
      })
      .catch((e) => console.error('❌ Failed to load reservations UI module', e));
  }
});

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
  logoutBtn.addEventListener('click', () => logout());
  logoutBtn.dataset.listenerAttached = 'true';
}

function formatWageValue(wage) {
  const wageNumber = Number(wage ?? 0);
  if (!Number.isFinite(wageNumber)) {
    return '0';
  }

  return wageNumber.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatDailyBadgeValue(amount) {
  const numeric = Number(amount ?? 0);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return '';
  }
  const perDayLabel = t('technicians.badge.perDay', '/اليوم');
  return `${formatCurrency(numeric)} ${perDayLabel}`;
}

function formatTechnicianTotalValue(amount) {
  const numeric = Number(amount ?? 0);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return '';
  }
  return formatCurrency(numeric);
}

function renderTechnicianDetails(technician) {
  if (!container) {
    return;
  }

  setHeroData(technician);

  if (!technician) {
    container.innerHTML = `<p class="text-base-content/60" data-i18n data-i18n-key="technicianDetails.errors.notFound">${t('technicianDetails.errors.notFound', '⚠️ لم يتم العثور على عضو الطاقم المطلوب.')}</p>`;
    setEditButtonsDisabled(true);
    return;
  }

  const phoneValue = technician.phone
    ? normalizeNumbers(technician.phone)
    : `<span data-i18n data-i18n-key="reservations.details.technicians.phoneUnknown">${t('reservations.details.technicians.phoneUnknown', 'غير متوفر')}</span>`;

  const emailValue = technician.email
    ? technician.email
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.email">${t('technicianDetails.fallback.email', '—')}</span>`;

  const roleValue = technician.role
    ? technician.role
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.role">${t('technicianDetails.fallback.role', 'غير محدد')}</span>`;

  const departmentValue = technician.department
    ? technician.department
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.department">${t('technicianDetails.fallback.department', '—')}</span>`;

  const notesValue = technician.notes
    ? technician.notes
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.notes">${t('technicianDetails.fallback.notes', '—')}</span>`;

  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const currencySpan = `<span data-i18n data-i18n-key="reservations.create.summary.currency">${currencyLabel}</span>`;
  const wageBadge = formatDailyBadgeValue(technician.dailyWage) || `${formatWageValue(technician.dailyWage)} ${currencySpan}`;
  const totalBadge = formatTechnicianTotalValue(technician.dailyTotal);
  const wageValue = wageBadge;
  const totalValue = totalBadge || formatTechnicianTotalValue(technician.dailyWage) || wageBadge;

  console.debug('[technician] amounts', {
    id: technician.id,
    dailyWage: technician.dailyWage,
    dailyTotal: technician.dailyTotal,
    wageValue,
    totalValue
  });

  const detailItems = [
    { key: 'technicianDetails.fields.role', value: roleValue },
    { key: 'technicianDetails.fields.department', value: departmentValue },
    { key: 'technicianDetails.fields.phone', value: phoneValue },
    { key: 'technicianDetails.fields.email', value: emailValue },
    { key: 'technicianDetails.fields.notes', value: notesValue },
  ];

  const detailCards = detailItems.map(({ key, value }) => `
    <article class="rounded-2xl border border-base-200 bg-base-100/90 p-4 shadow-sm">
      <span class="text-sm font-medium text-base-content/70" data-i18n data-i18n-key="${key}">${t(key)}</span>
      <p class="mt-2 text-lg font-semibold text-base-content">${value}</p>
    </article>
  `).join('');

  container.innerHTML = detailCards;

  attachTechnicianEditListeners();
  setEditButtonsDisabled(false);
  setActiveTechnicianTab(activeTechnicianTab);
}

async function loadTechnicianDetails() {
  if (!container) {
    return;
  }

  if (!technicianId) {
    setHeroData(null);
    updateSidebarStats();
    setEditButtonsDisabled(true);
    technicianState = null;
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.missingId">${t('technicianDetails.errors.missingId', '⚠️ لا يوجد معرف عضو طاقم في الرابط.')}</p>`;
    return;
  }

  container.innerHTML = `<p class="text-muted" data-i18n data-i18n-key="technicianDetails.status.loading">${t('technicianDetails.status.loading', '⏳ جارٍ تحميل بيانات عضو الطاقم...')}</p>`;
  setEditButtonsDisabled(true);
  setHeroData(null);

  let technician = null;
  let apiError = null;

  try {
    await refreshTechniciansFromApi();
    syncTechniciansStatuses();
  } catch (error) {
    apiError = error;
    console.error('❌ [technician-details] Failed to refresh technician from API', error);
  }

  technician = getTechnicianById(technicianId);

  if (!technician) {
    if (apiError) {
      container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.loadFailed">${t('technicianDetails.errors.loadFailed', '❌ تعذر تحميل بيانات عضو الطاقم. حاول مرة أخرى لاحقًا.')}</p>`;
    } else {
      container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.notFound">${t('technicianDetails.errors.notFound', '⚠️ لم يتم العثور على عضو الطاقم المطلوب.')}</p>`;
    }
    setHeroData(null);
    updateSidebarStats();
    technicianState = null;
    return;
  }

  if (!technician) {
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.notFound">${t('technicianDetails.errors.notFound', '⚠️ لم يتم العثور على عضو الطاقم المطلوب.')}</p>`;
    setHeroData(null);
    updateSidebarStats();
    technicianState = null;
    return;
  }

  technicianState = technician;
  await refreshTechnicianFinancialSummary(technician);
  renderTechnicianDetails(technician);
  renderTechnicianReservations(technicianId);
  renderTechnicianProjects(technicianId);
}

syncTechniciansStatuses();
loadTechnicianDetails();

const handleTechniciansUpdated = async () => {
  if (!technicianId) return;
  syncTechniciansStatuses();
  const updated = getTechnicianById(technicianId);
  if (!updated) {
    return;
  }
  technicianState = updated;
  await refreshTechnicianFinancialSummary(updated);
  renderTechnicianDetails(updated);
};

window.addEventListener('technicians:updated', handleTechniciansUpdated);

const handleReservationsUpdated = () => {
  if (!technicianId || !technicianState) return;
  refreshTechnicianFinancialSummary(technicianState);
};

document.addEventListener('reservations:changed', handleReservationsUpdated, { passive: true });
