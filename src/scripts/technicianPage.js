import '../styles/app.css';
import { getTechnicianById, syncTechniciansStatuses } from './technicians.js';
import {
  getTechniciansState,
  setTechniciansState,
  refreshTechniciansFromApi,
  updateTechnicianApi,
  buildTechnicianPayload,
  isApiError,
} from './techniciansService.js';
import { renderTechnicianReservations, renderTechnicianProjects, normalizeTechnicianAssignments } from './technicianDetails.js';
import { normalizeNumbers, showToast } from './utils.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, refreshReservationsFromApi } from './reservationsService.js';
import { calculateReservationDays } from './reservationsSummary.js';
import { isReservationCompleted, resolveReservationProjectState } from './reservationsShared.js';
import { listTechnicianPayouts, createTechnicianPayout, deleteTechnicianPayout } from './technicianPayoutsService.js';
import { loadData } from './storage.js';
import { getProjectsState, refreshProjectsFromApi } from './projectsService.js';
import { refreshEquipmentFromApi } from './equipment.js';
import { initDashboardMetrics } from './dashboardMetrics.js';
import { apiRequest } from './apiClient.js';
import { registerReservationGlobals, getReservationsEditContext, setupEditReservationModalEvents } from './reservations/controller.js';
import mountReservationModalsIfNeeded from './reservations/modals.js';
import {
  applyLocalDetailsFixture,
  createLocalFixturePayout,
  deleteLocalFixturePayout,
  getLocalFixturePayouts
} from './devFixtures.js';
import { initDetailResponsiveLayout } from './detailResponsiveLayout.js';

mountReservationModalsIfNeeded();
applyStoredTheme();
initDashboardShell();
initDetailResponsiveLayout();
registerReservationGlobals();
const detailsFixtureActive = applyLocalDetailsFixture();

function revealPage() {
  document.body.classList.remove('auth-pending');
}

Promise.resolve(checkAuth({ redirect: false, retries: 1, retryDelay: 250 }))
  .then((user) => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    revealPage();
  })
  .catch(() => {
    revealPage();
  });

const initTechnicianReservationModal = () => {
  try {
    setupEditReservationModalEvents(getReservationsEditContext());
  } catch (error) {
    console.warn('⚠️ [technicianPage] Failed to initialize reservation edit modal', error);
  }
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTechnicianReservationModal, { once: true });
} else {
  initTechnicianReservationModal();
}

const urlParams = new URLSearchParams(window.location.search);
const technicianId = urlParams.get('id');
const container = document.getElementById('technician-details');

const heroNameEl = document.getElementById('technician-hero-name');
const heroStatusEl = document.getElementById('technician-hero-status');
const heroRoleEl = document.getElementById('technician-hero-role');
const heroPositionEl = document.getElementById('technician-hero-position');
const greetingNameEl = document.getElementById('dashboard-greeting-technician-name');
const greetingRoleEl = document.getElementById('dashboard-greeting-technician-role');

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
const technicianEditSaveBtn = document.getElementById('save-technician-changes');

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

function normalizeTechnicianPhoneValue(value = '') {
  return normalizeNumbers(String(value)).replace(/[^0-9+]/g, '');
}

function normalizeTechnicianMoneyValue(value = '') {
  const normalized = normalizeNumbers(String(value)).replace(/[^0-9.]/g, '');
  if (!normalized.includes('.')) return normalized;
  const [integerPart, ...rest] = normalized.split('.');
  const decimalPart = rest.join('').replace(/\D/g, '').slice(0, 2);
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

function sanitizeTechnicianNumericInput(element, normalizer) {
  if (!element || element.dataset.normalizerAttached) return;
  element.addEventListener('input', () => {
    const normalized = normalizer(element.value);
    if (element.value !== normalized) {
      element.value = normalized;
      const cursor = normalized.length;
      element.setSelectionRange?.(cursor, cursor);
    }
  });
  element.dataset.normalizerAttached = 'true';
}

function getTechnicianEditFields() {
  return {
    id: document.getElementById('edit-technician-id'),
    name: document.getElementById('edit-technician-name'),
    phone: document.getElementById('edit-technician-phone'),
    email: document.getElementById('edit-technician-email'),
    role: document.getElementById('edit-technician-role'),
    department: document.getElementById('edit-technician-department'),
    wage: document.getElementById('edit-technician-wage'),
    total: document.getElementById('edit-technician-total'),
    status: document.getElementById('edit-technician-status'),
    notes: document.getElementById('edit-technician-notes'),
  };
}

function populateTechnicianEditModal(technician) {
  const fields = getTechnicianEditFields();
  if (!fields.id || !fields.name || !fields.phone || !fields.role || !fields.status) {
    return;
  }

  fields.id.value = technician?.id || '';
  fields.name.value = technician?.name || '';
  fields.phone.value = normalizeTechnicianPhoneValue(technician?.phone || '');
  if (fields.email) fields.email.value = technician?.email || '';
  fields.role.value = technician?.role || '';
  if (fields.department) fields.department.value = technician?.department || '';
  if (fields.wage) fields.wage.value = normalizeTechnicianMoneyValue(technician?.dailyWage ?? '');
  if (fields.total) fields.total.value = normalizeTechnicianMoneyValue(technician?.dailyTotal ?? '');
  fields.status.value = technician?.baseStatus || technician?.status || 'available';
  if (fields.notes) fields.notes.value = technician?.notes || '';

  sanitizeTechnicianNumericInput(fields.phone, normalizeTechnicianPhoneValue);
  sanitizeTechnicianNumericInput(fields.wage, normalizeTechnicianMoneyValue);
  sanitizeTechnicianNumericInput(fields.total, normalizeTechnicianMoneyValue);
}

function collectTechnicianEditModalPayload() {
  const fields = getTechnicianEditFields();
  if (!fields.id || !fields.name || !fields.phone || !fields.role || !fields.status) {
    return null;
  }

  const id = fields.id.value.trim();
  const name = fields.name.value.trim();
  const phone = normalizeTechnicianPhoneValue(fields.phone.value.trim());
  const email = fields.email?.value.trim() || '';
  const role = fields.role.value.trim();
  const department = fields.department?.value.trim() || '';
  const wageRaw = normalizeTechnicianMoneyValue(fields.wage?.value.trim() || '');
  const totalRaw = normalizeTechnicianMoneyValue(fields.total?.value.trim() || '');
  const status = fields.status.value || 'available';
  const notes = fields.notes?.value.trim() || '';

  fields.phone.value = phone;
  if (fields.wage) fields.wage.value = wageRaw;
  if (fields.total) fields.total.value = totalRaw;

  if (!id) {
    showToast(t('technicians.toast.unidentified', '⚠️ تعذر تحديد عضو الطاقم المطلوب'));
    return null;
  }
  if (!name) {
    showToast(t('technicians.toast.missingName', '⚠️ يرجى إدخال اسم عضو الطاقم'));
    fields.name.focus();
    return null;
  }
  if (!phone) {
    showToast(t('technicians.toast.missingPhone', '⚠️ يرجى إدخال رقم التواصل'));
    fields.phone.focus();
    return null;
  }
  if (!role) {
    showToast(t('technicians.toast.missingRole', '⚠️ يرجى إدخال الوظيفة'));
    fields.role.focus();
    return null;
  }

  const dailyWage = wageRaw === '' ? 0 : Number.parseFloat(wageRaw);
  const dailyTotal = totalRaw === '' ? null : Number.parseFloat(totalRaw);
  if (Number.isNaN(dailyWage) || dailyWage < 0) {
    showToast(t('technicians.toast.invalidWage', '⚠️ أدخل قيمة صحيحة للأجر اليومي'));
    fields.wage?.focus();
    return null;
  }
  if (dailyTotal != null && (Number.isNaN(dailyTotal) || dailyTotal < 0)) {
    showToast(t('technicians.toast.invalidTotal', '⚠️ أدخل قيمة صحيحة للتكلفة الإجمالية'));
    fields.total?.focus();
    return null;
  }

  return {
    id,
    name,
    phone,
    email,
    role,
    department,
    dailyWage,
    dailyTotal,
    status,
    notes,
  };
}

async function handleTechnicianEditSave() {
  const payload = collectTechnicianEditModalPayload();
  if (!payload) return;

  if (technicianEditSaveBtn) {
    technicianEditSaveBtn.disabled = true;
  }

  const apiPayload = buildTechnicianPayload({
    name: payload.name,
    phone: payload.phone,
    email: payload.email || null,
    role: payload.role,
    department: payload.department,
    dailyWage: payload.dailyWage,
    dailyTotal: payload.dailyTotal,
    status: payload.status,
    notes: payload.notes,
    active: true,
  });

  try {
    let updated;
    if (detailsFixtureActive) {
      const current = Array.isArray(getTechniciansState()) ? getTechniciansState() : [];
      updated = {
        ...(current.find((item) => String(item.id) === String(payload.id)) || {}),
        ...payload,
        baseStatus: payload.status,
        status: payload.status,
        active: true,
      };
      setTechniciansState(
        current.map((item) => (String(item.id) === String(payload.id) ? updated : item))
      );
    } else {
      updated = await updateTechnicianApi(payload.id, apiPayload);
    }

    technicianState = updated;
    await refreshTechnicianFinancialSummary(updated);
    renderTechnicianDetails(updated);
    showToast(t('technicians.toast.updateSuccess', '💾 تم حفظ بيانات عضو الطاقم'));

    const modalEl = document.getElementById('editTechnicianModal');
    if (modalEl && window.bootstrap?.Modal) {
      window.bootstrap.Modal.getInstance(modalEl)?.hide();
    }
  } catch (error) {
    console.error('❌ [technician-page] Failed to save technician modal', error);
    const message = isApiError(error)
      ? error.message
      : t('technicians.toast.updateFailed', 'تعذر حفظ بيانات عضو الطاقم');
    showToast(message, 'error');
  } finally {
    if (technicianEditSaveBtn) {
      technicianEditSaveBtn.disabled = false;
    }
  }
}

function normalizeSidebarSummary(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const toInt = (value) => {
    const parsed = Number.parseInt(String(value ?? '0'), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  return {
    projects: toInt(raw?.projects?.total),
    reservations: toInt(raw?.reservations?.total),
    equipment: toInt(raw?.equipment?.total),
    technicians: toInt(raw?.technicians?.total),
  };
}

function getGlobalSidebarStats() {
  const snapshot = loadData();
  return {
    projects: Array.isArray(snapshot.projects) ? snapshot.projects.length : 0,
    reservations: Array.isArray(snapshot.reservations) ? snapshot.reservations.length : 0,
    equipment: Array.isArray(snapshot.equipment) ? snapshot.equipment.length : 0,
    technicians: Array.isArray(snapshot.technicians) ? snapshot.technicians.length : 0,
  };
}

function ensureSidebarStatElement(id, labelKey, labelFallback) {
  let el = document.getElementById(id);
  if (el) return el;

  let sidebar = document.getElementById('dashboard-sidebar');
  if (!sidebar) {
    sidebar = document.createElement('aside');
    sidebar.id = 'dashboard-sidebar';
    sidebar.className = 'sidebar-shell sidebar-drawer';
    (document.body || document.documentElement).prepend(sidebar);
  }

  let statsPanel = sidebar.querySelector('.sidebar-panel--stats');
  if (!statsPanel) {
    statsPanel = document.createElement('div');
    statsPanel.className = 'sidebar-panel sidebar-panel--stats';
    statsPanel.innerHTML = `
      <h3 class="sidebar-heading">${t?.('dashboard.sidebar.statsHeading', 'ملخص اليوم')}</h3>
      <div class="sidebar-stats" role="list"></div>
    `;
    sidebar.prepend(statsPanel);
  }

  let list = statsPanel.querySelector('.sidebar-stats');
  if (!list) {
    list = document.createElement('div');
    list.className = 'sidebar-stats';
    list.setAttribute('role', 'list');
    statsPanel.appendChild(list);
  }

  const row = document.createElement('div');
  row.className = 'sidebar-stats-row';
  row.setAttribute('role', 'listitem');
  const label = t?.(labelKey, labelFallback) ?? labelFallback ?? '';
  row.innerHTML = `<span>${label}</span><span id="${id}" class="badge-soft">0</span>`;
  list.appendChild(row);
  el = row.querySelector(`#${id}`);
  return el;
}

function updateSidebarStats(overrides = {}) {
  const base = getGlobalSidebarStats();
  const stats = {
    projects: overrides.projects ?? base.projects,
    reservations: overrides.reservations ?? base.reservations,
    equipment: overrides.equipment ?? base.equipment,
    technicians: overrides.technicians ?? base.technicians,
  };

  const statNodes = {
    projects: sidebarProjectsEl || ensureSidebarStatElement('sidebar-stat-projects', 'dashboard.metrics.projects.label', 'المشاريع'),
    reservations: sidebarReservationsEl || ensureSidebarStatElement('sidebar-stat-reservations', 'dashboard.metrics.reservations.label', 'الحجوزات'),
    equipment: sidebarEquipmentEl || ensureSidebarStatElement('sidebar-stat-equipment', 'dashboard.metrics.equipment.label', 'المعدات'),
    technicians: sidebarTechniciansEl || ensureSidebarStatElement('sidebar-stat-technicians', 'dashboard.metrics.technicians.label', 'طاقم العمل'),
  };

  if (statNodes.projects) statNodes.projects.textContent = formatNumberLocalized(stats.projects);
  if (statNodes.reservations) statNodes.reservations.textContent = formatNumberLocalized(stats.reservations);
  if (statNodes.equipment) statNodes.equipment.textContent = formatNumberLocalized(stats.equipment);
  if (statNodes.technicians) statNodes.technicians.textContent = formatNumberLocalized(stats.technicians);
  try { window.__TECHNICIAN_STATS__ = { ...stats }; } catch (_) {}
}

function resolveTechnicianScopedReservations() {
  if (!technicianId) return [];
  const reservations = getReservationsState();
  const projectsState = getProjectsState();
  const projectsMap = new Map(
    Array.isArray(projectsState)
      ? projectsState.map((project) => [String(project?.id ?? project?.projectId ?? ''), project])
      : []
  );
  const normalizedId = String(technicianId);
  if (!Array.isArray(reservations)) return [];
  return reservations.filter((reservation) => {
    if (!isReservationEligibleForFinancialSummary(reservation, projectsMap)) return false;
    const technicianIds = Array.isArray(reservation.technicians)
      ? reservation.technicians.map((id) => String(id))
      : [];
    return technicianIds.includes(normalizedId);
  });
}

function applyTechnicianSidebarStats() {
  const relevantReservations = resolveTechnicianScopedReservations();
  const sidebarStats = computeTechnicianSidebarStats(relevantReservations, technicianId ? String(technicianId) : null);
  updateSidebarStats(sidebarStats);
  return sidebarStats;
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

// Collect technician ids from any reservation-related arrays
function resolveReservationTechnicianIds(reservation) {
  if (!reservation) return [];
  const ids = new Set();
  const collect = (list) => {
    normalizeTechnicianAssignments(list).forEach((id) => ids.add(id));
  };
  collect(reservation.technicians);
  collect(reservation.crewAssignments);
  collect(reservation.techniciansDetails);
  return Array.from(ids);
}

// Resolve project id/name for references in the financial modal
let projectLookupCache = null;
function getProjectLookup() {
  if (projectLookupCache) return projectLookupCache;
  const snapshot = loadData();
  const map = new Map();
  if (snapshot && Array.isArray(snapshot.projects)) {
    snapshot.projects.forEach((project) => {
      const key = project?.id != null ? String(project.id) : (project?.projectId != null ? String(project.projectId) : null);
      if (key) {
        map.set(key, project);
      }
    });
  }
  projectLookupCache = map;
  return projectLookupCache;
}

function resolveReservationProjectInfo(reservation) {
  if (!reservation) return null;
  const rawId = reservation.projectId ?? reservation.project_id ?? reservation.project?.id ?? reservation.project?.projectId;
  const id = rawId != null ? String(rawId) : null;
  const directName = reservation.projectTitle
    || reservation.project_title
    || reservation.projectName
    || reservation.project_name
    || reservation.project?.title
    || reservation.project?.name;
  if (directName && id) {
    return { id, name: directName };
  }
  if (directName) {
    return { id: null, name: directName };
  }
  if (id) {
    const lookup = getProjectLookup();
    const project = lookup.get(id);
    const name = project?.title || project?.name || project?.projectTitle || project?.project_name;
    if (name) {
      return { id, name };
    }
    return { id, name: null };
  }
  return null;
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

    const technicianIds = resolveReservationTechnicianIds(reservation);
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

async function hydrateSidebarSummary() {
  if (detailsFixtureActive) {
    updateSidebarStats();
    return;
  }

  try {
    const response = await apiRequest('/summary/');
    const summary = normalizeSidebarSummary(response?.data ?? null);
    if (summary) {
      updateSidebarStats(summary);
      return;
    }
  } catch (_) {
    // ignore and fallback to full fetch
  }

  try {
    await Promise.allSettled([
      refreshProjectsFromApi(),
      refreshReservationsFromApi(),
      refreshTechniciansFromApi(),
      refreshEquipmentFromApi({ showToastOnError: false }),
    ]);
  } catch (_) {
    // Soft-fail; sidebar will keep existing numbers
  }
  updateSidebarStats();
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
    technician.positionCost,
    technician.position_cost,
    technician.cost,
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
  let badgeClass = 'reservation-chip status-chip status-unpaid';
  if (normalized === 'paid') {
    key = 'technicianFinancial.status.paid';
    badgeClass = 'reservation-chip status-chip status-paid';
  } else if (normalized === 'partial') {
    key = 'technicianFinancial.status.partial';
    badgeClass = 'reservation-chip status-chip status-partial';
  }
  return `<span class="${badgeClass}" data-i18n data-i18n-key="${key}">${t(key, key)}</span>`;
}

function resolveFinancialWorkStatusMeta(status) {
  const normalized = String(status || '').trim().toLowerCase();
  if (!normalized) {
    return { key: '', fallback: '', modifier: 'default' };
  }

  if (['completed', 'closed', 'مغلق', 'مغلقة', 'مكتمل', 'مكتملة', 'منتهي', 'منتهية'].includes(normalized)) {
    return { key: 'technicianFinancial.list.workStatus.completed', fallback: 'مغلق', modifier: 'completed' };
  }
  if (['confirmed', 'مؤكد', 'مؤكدة'].includes(normalized)) {
    return { key: 'technicianFinancial.list.workStatus.confirmed', fallback: 'مؤكد', modifier: 'confirmed' };
  }
  if (['pending', 'غير مؤكد', 'قيد التأكيد'].includes(normalized)) {
    return { key: 'technicianFinancial.list.workStatus.pending', fallback: 'غير مؤكد', modifier: 'pending' };
  }
  if (['cancelled', 'canceled', 'ملغي', 'ملغى', 'ملغية'].includes(normalized)) {
    return { key: 'technicianFinancial.list.workStatus.cancelled', fallback: 'ملغي', modifier: 'cancelled' };
  }
  if (['in_progress', 'ongoing', 'قيد التنفيذ', 'جاري'].includes(normalized)) {
    return { key: 'technicianFinancial.list.workStatus.ongoing', fallback: 'قيد التنفيذ', modifier: 'ongoing' };
  }

  return { key: '', fallback: String(status), modifier: 'default' };
}

function resolveFinancialWorkStatusLabel(status) {
  const meta = resolveFinancialWorkStatusMeta(status);
  if (!meta.fallback) return '';
  return meta.key ? t(meta.key, meta.fallback) : meta.fallback;
}

function buildFinancialWorkStatusBadge(status) {
  const meta = resolveFinancialWorkStatusMeta(status);
  const modifierClassMap = {
    confirmed: 'status-confirmed',
    pending: 'status-pending',
    completed: 'status-completed',
    cancelled: 'status-cancelled',
    ongoing: 'status-ongoing',
    default: 'status-info',
  };
  const statusClass = modifierClassMap[meta.modifier] || 'status-info';
  if (!meta.fallback) {
    return `<span class="reservation-chip status-chip ${statusClass}">${t('common.placeholder.empty', '—')}</span>`;
  }
  const label = meta.key ? t(meta.key, meta.fallback) : meta.fallback;
  const dataAttr = meta.key ? ` data-i18n data-i18n-key="${meta.key}"` : '';
  return `<span class="reservation-chip status-chip ${statusClass}"${dataAttr}>${escapeHtml(label)}</span>`;
}

function resolvePayoutNoteText(entry = {}) {
  const noteKey = entry?.noteKey ?? entry?.note_key ?? '';
  const noteText = entry?.note ?? '';
  if (noteKey) {
    return t(noteKey, noteText);
  }
  return noteText;
}

function isReservationEligibleForFinancialSummary(reservation, projectsMap = null) {
  if (!reservation) return false;

  const rawStatus = String(reservation.status || '').trim().toLowerCase();
  if (['cancelled', 'canceled', 'ملغي', 'ملغى', 'ملغية'].includes(rawStatus)) {
    return false;
  }

  const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
  const project = projectId != null && projectsMap?.get
    ? projectsMap.get(String(projectId))
    : null;
  const { effectiveConfirmed, projectLinked, projectStatus } = resolveReservationProjectState(reservation, project);
  if (!effectiveConfirmed) {
    return false;
  }

  const effectiveStatus = String(projectLinked && projectStatus ? projectStatus : rawStatus).trim().toLowerCase();

  if (isReservationCompleted(reservation) || effectiveStatus === 'completed') {
    return true;
  }

  return ['confirmed', 'مؤكد', 'مؤكدة'].includes(effectiveStatus);
}

function renderFinancialSummary(state) {
  const { totals, metrics } = state;
  const assignmentsCount = Number(metrics.assignments ?? 0);
  const payoutsCount = Number(metrics.payoutsCount ?? 0);
  const assignmentsText = t('technicianFinancial.stats.totalDesc', 'Across {count} assignments')
    .replace('{count}', normalizeNumbers(String(assignmentsCount)));
  const paidText = t('technicianFinancial.stats.paidDesc', '{count} payouts recorded')
    .replace('{count}', normalizeNumbers(String(payoutsCount)));
  const outstandingTemplate = t('technicianFinancial.stats.outstandingDesc', 'Outstanding {amount}');
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
    financialModalTableWrapper.hidden = true;
    financialModalEmptyEl.hidden = false;
  } else {
    financialModalEmptyEl.hidden = true;
    financialModalTableWrapper.hidden = false;

    const rows = breakdown.map((entry) => {
      const period = entry.period || '—';
      const outstanding = entry.outstandingAmount > 0
        ? formatCurrency(entry.outstandingAmount)
        : `<span class="text-success">${t('technicianFinancial.list.settled', 'None')}</span>`;
      return `
        <tr class="technician-financial-table__row">
          <td class="technician-financial-table__cell technician-financial-table__cell--reservation">
            <div class="technician-financial-table__primary">${escapeHtml(entry.label)}</div>
            <div class="technician-financial-table__secondary">${escapeHtml(entry.reference)}</div>
          </td>
          <td class="technician-financial-table__cell technician-financial-table__cell--period whitespace-nowrap">${escapeHtml(period)}</td>
          <td class="technician-financial-table__cell technician-financial-table__cell--work-status">${buildFinancialWorkStatusBadge(entry.workStatus)}</td>
          <td class="technician-financial-table__cell technician-financial-table__cell--amount">${formatCurrency(entry.dueAmount)}</td>
          <td class="technician-financial-table__cell technician-financial-table__cell--payment-status">${buildPaymentStatusBadge(entry.paidStatus)}</td>
          <td class="technician-financial-table__cell technician-financial-table__cell--outstanding">${outstanding}</td>
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
    financialPayoutEmptyEl.hidden = false;
    return;
  }

  const items = payouts.map((entry) => {
    const amountFormatted = formatCurrency(entry.amount || 0);
    const dateFormatted = formatDateLocalized(entry.paidAt || entry.createdAt);
    const noteText = resolvePayoutNoteText(entry);
    const noteHtml = noteText
      ? `<p class="technician-payout-note text-sm text-base-content/70">${escapeHtml(noteText)}</p>`
      : '';
    const deleteLabel = t('actions.delete', '🗑️ Delete');

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
  financialPayoutEmptyEl.hidden = true;
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
    showToast(t('technicianFinancial.payouts.toast.invalidTechnician', '⚠️ Unable to determine the crew member right now.'));
    return;
  }

  const amountRaw = financialPayoutAmountInput?.value ?? '';
  const amount = Number.parseFloat(normalizeNumbers(String(amountRaw)));
  if (!Number.isFinite(amount) || amount <= 0) {
    showToast(t('technicianFinancial.payouts.toast.invalidAmount', '⚠️ Enter a valid payout amount.'));
    financialPayoutAmountInput?.focus();
    return;
  }

  const note = financialPayoutNoteInput?.value?.trim() || '';
  const paidDate = parseDateInputValue(financialPayoutDateInput?.value || null);
  const submitButton = financialPayoutForm?.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
  }

  const createPayout = detailsFixtureActive ? createLocalFixturePayout : createTechnicianPayout;

  createPayout({
    technicianId,
    amount: Number(amount.toFixed(2)),
    note,
    paidAt: paidDate.toISOString(),
  }).then((entry) => {
    showToast(t('technicianFinancial.payouts.toast.added', '✅ Payout logged successfully.'));
    financialPayoutForm?.reset();
    if (financialPayoutDateInput) {
      financialPayoutDateInput.value = formatDateInputValue(entry?.paidAt || new Date());
    }
    if (technicianState) {
      refreshTechnicianFinancialSummary(technicianState);
    }
  }).catch((error) => {
    console.error('❌ [technician-page] Failed to create technician payout', error);
    const message = error?.message || t('technicianFinancial.payouts.toast.failed', '⚠️ Unable to record the payout. Please try again.');
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

  populateTechnicianEditModal(technicianState);

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
    if (!detailsFixtureActive) {
      await ensureReservationsLoaded({ suppressError: true });
    }
  } catch (error) {
    console.error('⚠️ [technician-page] Failed to load reservations for financial summary', error);
  }

  const reservations = getReservationsState();
  const projectsState = getProjectsState();
  const projectsMap = new Map(
    Array.isArray(projectsState)
      ? projectsState.map((project) => [String(project?.id ?? project?.projectId ?? ''), project])
      : []
  );
  const normalizedId = String(technicianId);

  try {
    const payoutsResponse = detailsFixtureActive
      ? getLocalFixturePayouts(normalizedId)
      : await listTechnicianPayouts(normalizedId);
    technicianPayoutsState = Array.isArray(payoutsResponse) ? payoutsResponse : [];
  } catch (error) {
    console.error('⚠️ [technician-page] Failed to load technician payouts from API', error);
    technicianPayoutsState = [];
  }
  const relevantReservations = reservations.filter((reservation) => {
    if (!isReservationEligibleForFinancialSummary(reservation, projectsMap)) return false;
    const technicianIds = resolveReservationTechnicianIds(reservation);
    return technicianIds.includes(normalizedId);
  });

  const sidebarStats = computeTechnicianSidebarStats(relevantReservations, normalizedId);
  updateSidebarStats(sidebarStats);

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

    const fallbackLabel = t('technicianFinancial.list.reservationFallback', 'Reservation #{id}')
      .replace('{id}', normalizeNumbers(String(reservation.reservationId || reservation.id || '?')));
    const label = reservation.title && reservation.title.trim().length
      ? reservation.title.trim()
      : fallbackLabel;

    const referenceParts = [];
    const projectInfo = resolveReservationProjectInfo(reservation);
    if (projectInfo?.id) {
      const projectIdDisplay = normalizeNumbers(String(projectInfo.id));
      if (projectInfo.name) {
        const template = t('technicianFinancial.list.projectReferenceWithName', 'Project #{id} • {name}');
        referenceParts.push(
          template
            .replace('{id}', projectIdDisplay)
            .replace('{name}', String(projectInfo.name))
        );
      } else {
        referenceParts.push(
          t('technicianFinancial.list.projectReference', 'Project #{id}')
            .replace('{id}', projectIdDisplay)
        );
      }
    } else if (projectInfo?.name) {
      const template = t('technicianFinancial.list.projectReferenceNameOnly', 'Project: {name}');
      referenceParts.push(template.replace('{name}', String(projectInfo.name)));
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
      workStatus: reservation.status || '',
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
    element.hidden = !hasValue;
  } else if (!hasValue) {
    element.hidden = false;
  }
}

function setStatusBadge(status) {
  const targets = [heroStatusEl].filter(Boolean);
  if (!targets.length) {
    return;
  }

  const normalized = typeof status === 'string' ? status.toLowerCase() : '';

  if (!normalized) {
    targets.forEach((element) => {
      element.className = 'technician-badge';
      element.hidden = true;
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
    element.hidden = false;
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
      const ids = resolveReservationTechnicianIds(res);
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
    setStatusBadge(null);
    return;
  }

  setHeroBadge(heroNameEl, '😎', technician.name || t('common.placeholder.empty', '—'));
  setHeroBadge(heroRoleEl, '🎯', technician.role || '', { hideWhenEmpty: true });
  if (greetingNameEl) {
    greetingNameEl.textContent = technician.name || t('common.placeholder.empty', '—');
  }
  if (greetingRoleEl) {
    const infoParts = [];
    const roleText = typeof technician.role === 'string' ? technician.role.trim() : '';
    const phoneText = technician.phone ? normalizeNumbers(technician.phone) : '';
    const departmentText = typeof technician.department === 'string' ? technician.department.trim() : '';

    if (roleText) infoParts.push(roleText);
    if (phoneText) infoParts.push(`📞 ${phoneText}`);
    if (departmentText) infoParts.push(`🧩 ${departmentText}`);

    greetingRoleEl.textContent = infoParts.length
      ? infoParts.join(' • ')
      : t('technicianDetails.fallback.role', 'Not specified');
  }
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
    panel.hidden = key !== tab;
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

  setActiveTechnicianTab(activeTechnicianTab);
}

setHeroData(null);
setEditButtonsDisabled(true);
initTechnicianTabs();
attachTechnicianEditListeners();

if (technicianEditSaveBtn && !technicianEditSaveBtn.dataset.listenerAttached) {
  technicianEditSaveBtn.addEventListener('click', () => {
    handleTechnicianEditSave().catch((error) => {
      console.error('❌ [technician-page] edit modal save failed', error);
    });
  });
  technicianEditSaveBtn.dataset.listenerAttached = 'true';
}

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
    const removePayout = detailsFixtureActive ? deleteLocalFixturePayout : deleteTechnicianPayout;
    removePayout(pendingPayoutRemovalId).then(() => {
      showToast(t('technicianFinancial.payouts.toast.removed', '🗑️ Payout removed.'));
      closePayoutConfirmModal();
      if (technicianState) {
        refreshTechnicianFinancialSummary(technicianState);
      }
    }).catch((error) => {
      console.error('❌ [technician-page] Failed to remove technician payout', error);
      const message = error?.message || t('technicianFinancial.payouts.toast.failed', '⚠️ Unable to record the payout. Please try again.');
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
    <article class="rounded-2xl border border-base-200 bg-base-100/90 p-4 shadow-xs">
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
    if (!detailsFixtureActive) {
      await refreshTechniciansFromApi();
      syncTechniciansStatuses();
    }
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

['projects:changed', 'reservations:changed', 'equipment:changed', 'technicians:changed'].forEach((eventName) => {
  document.addEventListener(eventName, () => {
    if (technicianId) {
      applyTechnicianSidebarStats();
    } else {
      updateSidebarStats();
    }
  }, { passive: true });
});

initDashboardMetrics();
hydrateSidebarSummary();

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
document.addEventListener('projects:changed', handleReservationsUpdated, { passive: true });
