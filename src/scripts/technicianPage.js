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

const technicianTabButtons = Array.from(document.querySelectorAll('[data-technician-tab]'));
const technicianTabPanels = new Map(
  Array.from(document.querySelectorAll('[data-technician-tab-panel]')).map((panel) => [panel.getAttribute('data-technician-tab-panel'), panel])
);

let activeTechnicianTab = 'reservations';
let technicianState = null;

initThemeToggle();

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
  renderTechnicianDetails(technician);
  renderTechnicianReservations(technicianId);
  renderTechnicianProjects(technicianId);
}

syncTechniciansStatuses();
loadTechnicianDetails();

const handleTechniciansUpdated = () => {
  if (!technicianId) return;
  syncTechniciansStatuses();
  const updated = getTechnicianById(technicianId);
  if (!updated) {
    return;
  }
  technicianState = updated;
  renderTechnicianDetails(updated);
};

window.addEventListener('technicians:updated', handleTechniciansUpdated);
