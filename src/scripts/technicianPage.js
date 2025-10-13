import '../styles/app.css';
import { getTechnicianById, syncTechniciansStatuses } from './technicians.js';
import { refreshTechniciansFromApi } from './techniciansService.js';
import { renderTechnicianReservations, renderTechnicianProjects } from './technicianDetails.js';
import { showReservationDetails } from './reservationsUI.js';
import { normalizeNumbers } from './utils.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState } from './reservationsService.js';
import { calculateReservationDays } from './reservationsSummary.js';

applyStoredTheme();
checkAuth();
initDashboardShell();

const urlParams = new URLSearchParams(window.location.search);
const technicianId = urlParams.get('id');
const container = document.getElementById('technician-details');

const heroNameEl = document.getElementById('technician-hero-name');
const heroStatusEl = document.getElementById('technician-hero-status');
const heroRoleEl = document.getElementById('technician-hero-role');
const heroPhoneEl = document.getElementById('technician-hero-phone');
const heroDepartmentEl = document.getElementById('technician-hero-department');

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

const technicianTabButtons = Array.from(document.querySelectorAll('[data-technician-tab]'));
const technicianTabPanels = new Map(
  Array.from(document.querySelectorAll('[data-technician-tab-panel]')).map((panel) => [panel.getAttribute('data-technician-tab-panel'), panel])
);

let activeTechnicianTab = 'reservations';
let technicianState = null;
let technicianFinancialState = {
  totals: { total: 0, paid: 0, outstanding: 0 },
  metrics: { assignments: 0, paidCount: 0, outstandingCount: 0 },
  breakdown: [],
};

initThemeToggle();

function getActiveLanguage() {
  return document.documentElement.getAttribute('lang') || 'ar';
}

function formatCurrency(value) {
  const amount = Number(value) || 0;
  const lang = getActiveLanguage();
  const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
  try {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
    const currencyLabel = lang === 'ar' ? 'ر.س' : 'SAR';
    return `${normalizeNumbers(formatted)} ${currencyLabel}`;
  } catch (error) {
    const fallback = Math.round(amount);
    const currencyLabel = lang === 'ar' ? 'ر.س' : 'SAR';
    return `${normalizeNumbers(String(fallback))} ${currencyLabel}`;
  }
}

function formatDateLocalized(value) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  const lang = getActiveLanguage();
  const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  } catch (error) {
    return date.toLocaleDateString();
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

function resolveTechnicianRate(technician = {}) {
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
  let badgeClass = 'badge badge-outline badge-warning';
  if (normalized === 'paid') {
    key = 'technicianFinancial.status.paid';
    badgeClass = 'badge badge-success';
  } else if (normalized === 'partial') {
    key = 'technicianFinancial.status.partial';
    badgeClass = 'badge badge-info';
  }
  return `<span class="${badgeClass}">${t(key, key)}</span>`;
}

function renderFinancialSummary(state) {
  const { totals, metrics } = state;
  const assignmentsText = t('technicianFinancial.stats.totalDesc', 'مرتبطة بـ {count} مهام')
    .replace('{count}', normalizeNumbers(String(metrics.assignments)));
  const paidText = t('technicianFinancial.stats.paidDesc', 'مدفوعة بالكامل في {count} حالات')
    .replace('{count}', normalizeNumbers(String(metrics.paidCount)));
  const outstandingText = t('technicianFinancial.stats.outstandingDesc', 'بحاجة متابعة في {count} حجوزات')
    .replace('{count}', normalizeNumbers(String(metrics.outstandingCount)));

  if (financialSummaryEls.total) financialSummaryEls.total.textContent = formatCurrency(totals.total);
  if (financialSummaryEls.totalDesc) financialSummaryEls.totalDesc.textContent = metrics.assignments > 0 ? assignmentsText : '—';
  if (financialSummaryEls.paid) financialSummaryEls.paid.textContent = formatCurrency(totals.paid);
  if (financialSummaryEls.paidDesc) financialSummaryEls.paidDesc.textContent = metrics.paidCount > 0 ? paidText : '—';
  if (financialSummaryEls.outstanding) financialSummaryEls.outstanding.textContent = formatCurrency(totals.outstanding);
  if (financialSummaryEls.outstandingDesc) financialSummaryEls.outstandingDesc.textContent = metrics.outstandingCount > 0 ? outstandingText : '—';
}

function renderFinancialModal(state) {
  const { totals, breakdown } = state;
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
    return;
  }

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
  financialModalTableWrapper.classList.remove('hidden');
  financialModalEmptyEl.classList.add('hidden');
}

function openFinancialModal() {
  if (!financialModalEl) return;
  if (typeof financialModalEl.showModal === 'function') {
    if (!financialModalEl.open) {
      financialModalEl.showModal();
    }
  } else {
    financialModalEl.classList.add('modal-open');
  }
}

function closeFinancialModal() {
  if (!financialModalEl) return;
  if (typeof financialModalEl.close === 'function') {
    financialModalEl.close();
  }
  financialModalEl.classList.remove('modal-open');
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
    metrics: { assignments: 0, paidCount: 0, outstandingCount: 0 },
    breakdown: [],
  };

  technicianFinancialState = initialState;
  renderFinancialSummary(technicianFinancialState);
  renderFinancialModal(technicianFinancialState);

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
  const relevantReservations = reservations.filter((reservation) => {
    if (!reservation) return false;
    if (String(reservation.status || '').toLowerCase() === 'cancelled') {
      return false;
    }
    const technicianIds = Array.isArray(reservation.technicians)
      ? reservation.technicians.map((id) => String(id))
      : [];
    return technicianIds.includes(normalizedId);
  });

  const breakdown = relevantReservations.map((reservation) => {
    const detailsEntry = Array.isArray(reservation.techniciansDetails)
      ? reservation.techniciansDetails.find((entry) => {
          const entryId = entry?.id ?? entry?.technician_id ?? entry?.technicianId ?? entry?.ID;
          return entryId != null && String(entryId) === normalizedId;
        })
      : null;

    const rate = resolveTechnicianRate(detailsEntry) || resolveTechnicianRate(technician);
    const days = Math.max(1, calculateReservationDays(reservation.start, reservation.end));
    const dueAmount = Math.max(0, Math.round(rate * days));
    const paidStatus = reservation.paidStatus || 'unpaid';
    const paidAmount = paidStatus === 'paid' ? dueAmount : 0;
    const outstandingAmount = Math.max(0, dueAmount - paidAmount);

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

    return {
      label,
      reference: referenceParts.join(' • ') || '—',
      period,
      dueAmount,
      paidAmount,
      outstandingAmount,
      paidStatus,
    };
  });

  const totals = breakdown.reduce((acc, entry) => {
    acc.total += entry.dueAmount;
    acc.paid += entry.paidAmount;
    acc.outstanding += entry.outstandingAmount;
    return acc;
  }, { total: 0, paid: 0, outstanding: 0 });

  const metrics = {
    assignments: breakdown.length,
    paidCount: breakdown.filter((entry) => entry.paidStatus === 'paid').length,
    outstandingCount: breakdown.filter((entry) => entry.outstandingAmount > 0).length,
  };

  technicianFinancialState = { totals, metrics, breakdown };
  renderFinancialSummary(technicianFinancialState);
  renderFinancialModal(technicianFinancialState);
}

function setHeroBadge(element, icon, value, { hideWhenEmpty = false } = {}) {
  if (!element) return;
  const stringValue = value == null ? '' : String(value).trim();
  const hasValue = stringValue.length > 0;
  element.textContent = hasValue ? `${icon} ${stringValue}` : `${icon} —`;
  if (hideWhenEmpty) {
    element.classList.toggle('hidden', !hasValue);
  } else if (!hasValue) {
    element.classList.remove('hidden');
  }
}

function setStatusBadge(status) {
  if (!heroStatusEl) return;
  const normalized = typeof status === 'string' ? status.toLowerCase() : '';

  if (!normalized) {
    heroStatusEl.className = 'badge badge-outline hidden';
    heroStatusEl.textContent = '—';
    return;
  }

  const isBusy = normalized === 'busy';
  const badgeClasses = ['badge', 'px-3', 'py-2', 'text-sm', 'font-semibold'];
  if (isBusy) {
    badgeClasses.push('badge-warning');
  } else {
    badgeClasses.push('badge-success');
  }

  heroStatusEl.className = badgeClasses.join(' ');
  heroStatusEl.classList.remove('hidden');

  const key = isBusy ? 'technicians.status.busy' : 'technicians.status.available';
  const fallback = isBusy ? 'مشغول' : 'متاح';
  heroStatusEl.setAttribute('data-i18n', '');
  heroStatusEl.setAttribute('data-i18n-key', key);
  heroStatusEl.textContent = t(key, fallback);
}

function setHeroData(technician) {
  if (!technician) {
    setHeroBadge(heroNameEl, '😎', '—');
    setHeroBadge(heroRoleEl, '🎯', '', { hideWhenEmpty: true });
    setHeroBadge(heroPhoneEl, '📞', '', { hideWhenEmpty: true });
    setHeroBadge(heroDepartmentEl, '🏢', '', { hideWhenEmpty: true });
    setStatusBadge(null);
    return;
  }

  setHeroBadge(heroNameEl, '😎', technician.name || '—');
  setHeroBadge(heroRoleEl, '🎯', technician.role || '', { hideWhenEmpty: true });
  setHeroBadge(heroPhoneEl, '📞', technician.phone ? normalizeNumbers(technician.phone) : '', { hideWhenEmpty: true });
  setHeroBadge(heroDepartmentEl, '🏢', technician.department || '', { hideWhenEmpty: true });
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

if (financialModalEl && !financialModalEl.dataset.listenerAttached) {
  financialModalEl.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeFinancialModal();
  });
  financialModalEl.dataset.listenerAttached = 'true';
}

window.showReservationDetails = showReservationDetails;

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

  const roleValue = technician.role
    ? technician.role
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.role">${t('technicianDetails.fallback.role', 'غير محدد')}</span>`;

  const departmentValue = technician.department
    ? technician.department
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.department">${t('technicianDetails.fallback.department', '—')}</span>`;

  const notesValue = technician.notes
    ? technician.notes
    : `<span data-i18n data-i18n-key="technicianDetails.fallback.notes">${t('technicianDetails.fallback.notes', '—')}</span>`;

  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const currencySpan = `<span data-i18n data-i18n-key="reservations.create.summary.currency">${currencyLabel}</span>`;
  const wageValue = `${formatWageValue(technician.dailyWage)} ${currencySpan}`;

  const baseStatus = technician.baseStatus || technician.status || 'available';
  const baseStatusKey = baseStatus === 'busy'
    ? 'technicians.status.busy'
    : 'technicians.status.available';
  const baseStatusBadge = `<span class="badge ${baseStatus === 'busy' ? 'badge-warning' : 'badge-success'}" data-i18n data-i18n-key="${baseStatusKey}">${t(baseStatusKey)}</span>`;

  const detailItems = [
    { key: 'technicianDetails.fields.role', value: roleValue },
    { key: 'technicianDetails.fields.department', value: departmentValue },
    { key: 'technicianDetails.fields.phone', value: phoneValue },
    { key: 'technicianDetails.fields.wage', value: wageValue },
    { key: 'technicianDetails.fields.baseStatus', value: baseStatusBadge },
    { key: 'technicianDetails.fields.notes', value: notesValue },
  ];

  const detailCards = detailItems.map(({ key, value }) => `
    <article class="rounded-2xl border border-base-200 bg-base-100/90 p-4 shadow-sm">
      <span class="text-sm font-medium text-base-content/70" data-i18n data-i18n-key="${key}">${t(key)}</span>
      <p class="mt-2 text-lg font-semibold text-base-content">${value}</p>
    </article>
  `).join('');

  const editButtonLabel = t('technicianDetails.actions.edit', '✏️ تعديل عضو الطاقم');

  container.innerHTML = `
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      ${detailCards}
    </div>
    <div class="mt-6 flex flex-wrap items-center gap-2">
      <button type="button" class="btn btn-warning" id="edit-technician-btn" data-technician-edit data-i18n data-i18n-key="technicianDetails.actions.edit">${editButtonLabel}</button>
    </div>
  `;

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
    setEditButtonsDisabled(true);
    technicianState = null;
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.missingId">${t('technicianDetails.errors.missingId', '⚠️ لا يوجد معرف عضو طاقم في الرابط.')}</p>`;
    return;
  }

  container.innerHTML = `<p class="text-muted" data-i18n data-i18n-key="technicianDetails.status.loading">${t('technicianDetails.status.loading', '⏳ جارٍ تحميل بيانات عضو الطاقم...')}</p>`;
  setEditButtonsDisabled(true);
  setHeroData(null);

  let technician = getTechnicianById(technicianId);

  if (!technician) {
    try {
      await refreshTechniciansFromApi();
    } catch (error) {
      console.error('❌ [technician-details] Failed to load technician from API', error);
      container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.loadFailed">${t('technicianDetails.errors.loadFailed', '❌ تعذر تحميل بيانات عضو الطاقم. حاول مرة أخرى لاحقًا.')}</p>`;
      setHeroData(null);
      technicianState = null;
      return;
    }

    technician = getTechnicianById(technicianId);
  }

  if (!technician) {
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.notFound">${t('technicianDetails.errors.notFound', '⚠️ لم يتم العثور على عضو الطاقم المطلوب.')}</p>`;
    setHeroData(null);
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
