import { getTechnicianById, syncTechniciansStatuses } from './technicians.js';
import { refreshTechniciansFromApi } from './techniciansService.js';
import { renderTechnicianReservations, renderTechnicianProjects } from './technicianDetails.js';
import { showReservationDetails } from './reservationsUI.js';
import { normalizeNumbers } from './utils.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { t } from './language.js';

applyStoredTheme();
checkAuth();

const urlParams = new URLSearchParams(window.location.search);
const technicianId = urlParams.get('id');
const container = document.getElementById('technician-details');

window.showReservationDetails = showReservationDetails;
initThemeToggle();

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

  const nameDisplay = technician.name || t('technicianDetails.fallback.name', '—');
  const statusKey = technician.status === 'busy'
    ? 'technicians.status.busy'
    : 'technicians.status.available';
  const statusClass = technician.status === 'busy' ? 'bg-danger' : 'bg-success';
  const statusBadge = `
    <span class="badge ${statusClass}" data-i18n data-i18n-key="${statusKey}">
      ${t(statusKey)}
    </span>
  `;

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
  const baseStatusValue = `<span data-i18n data-i18n-key="${baseStatusKey}">${t(baseStatusKey)}</span>`;
  const editButtonLabel = t('technicianDetails.actions.edit', '✏️ تعديل عضو الطاقم');

  const detailRows = [
    { key: 'technicianDetails.fields.role', value: roleValue },
    { key: 'technicianDetails.fields.department', value: departmentValue },
    { key: 'technicianDetails.fields.phone', value: phoneValue },
    { key: 'technicianDetails.fields.wage', value: wageValue },
    { key: 'technicianDetails.fields.baseStatus', value: baseStatusValue },
    { key: 'technicianDetails.fields.notes', value: notesValue },
  ].map(({ key, value }) => `
    <p class="technician-detail-row">
      <strong data-i18n data-i18n-key="${key}">${t(key)}</strong>
      <span>${value}</span>
    </p>
  `).join('');

  container.innerHTML = `
    <div class="technician-details">
      <div class="d-flex align-items-center gap-2 technician-header">
        <h3 class="mb-0 technician-name">${nameDisplay}</h3>
        ${statusBadge}
      </div>
      <div class="technician-details-body">
        ${detailRows}
      </div>
      <div class="d-flex justify-content-start mt-3 gap-2">
        <button type="button" class="btn btn-warning" id="edit-technician-btn" data-i18n data-i18n-key="technicianDetails.actions.edit">${editButtonLabel}</button>
      </div>
    </div>
  `;
}

async function loadTechnicianDetails() {
  if (!container) {
    return;
  }

  if (!technicianId) {
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.missingId">${t('technicianDetails.errors.missingId', '⚠️ لا يوجد معرف عضو طاقم في الرابط.')}</p>`;
    return;
  }

  container.innerHTML = `<p class="text-muted" data-i18n data-i18n-key="technicianDetails.status.loading">${t('technicianDetails.status.loading', '⏳ جارٍ تحميل بيانات عضو الطاقم...')}</p>`;

  let technician = getTechnicianById(technicianId);

  if (!technician) {
    try {
      await refreshTechniciansFromApi();
    } catch (error) {
      console.error('❌ [technician-details] Failed to load technician from API', error);
      container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.loadFailed">${t('technicianDetails.errors.loadFailed', '❌ تعذر تحميل بيانات عضو الطاقم. حاول مرة أخرى لاحقًا.')}</p>`;
      return;
    }

    technician = getTechnicianById(technicianId);
  }

  if (!technician) {
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.notFound">${t('technicianDetails.errors.notFound', '⚠️ لم يتم العثور على عضو الطاقم المطلوب.')}</p>`;
    return;
  }

  renderTechnicianDetails(technician);
  renderTechnicianReservations({ technician });
  renderTechnicianProjects({ technician });
}

syncTechniciansStatuses();
loadTechnicianDetails();
