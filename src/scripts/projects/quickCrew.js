import { t } from '../language.js';
import { normalizeNumbers, showToast } from '../utils.js';
import { createTechnicianPosition } from '../technicianPositions.js';
import {
  buildTechnicianPayload,
  createTechnicianApi,
  refreshTechniciansFromApi,
} from '../techniciansService.js';
import { addDraftAssignmentFromPosition } from '../reservationsTechnicians.js';

function getBootstrapModal(element) {
  if (!element || typeof window === 'undefined' || !window.bootstrap?.Modal) {
    return null;
  }
  return window.bootstrap.Modal.getOrCreateInstance(element);
}

export function toQuickCrewMoney(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '0')));
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function createProjectQuickPosition({
  labelAr = '',
  labelEn = '',
  cost = 0,
  clientPrice = 0,
} = {}) {
  const arabicLabel = String(labelAr || '').trim();
  const englishLabel = String(labelEn || '').trim();
  const name = englishLabel || arabicLabel;

  if (!name) {
    throw new Error(t('projects.quickCrew.position.toast.missingName', 'يرجى إدخال اسم المنصب'));
  }

  return createTechnicianPosition({
    name,
    labelAr: arabicLabel || name,
    labelEn: englishLabel || name,
    cost: toQuickCrewMoney(cost),
    clientPrice: toQuickCrewMoney(clientPrice),
  });
}

export async function createProjectQuickTechnician({
  name = '',
  phone = '',
  email = '',
  role = '',
  department = '',
} = {}) {
  const fullName = String(name || '').trim();
  if (!fullName) {
    throw new Error(t('projects.quickCrew.technician.toast.missingName', 'يرجى إدخال اسم عضو الفريق'));
  }

  const payload = buildTechnicianPayload({
    name: fullName,
    phone: normalizeNumbers(String(phone || '').trim()),
    email: String(email || '').trim() || null,
    role: String(role || '').trim(),
    department: String(department || '').trim() || null,
    dailyWage: 0,
    dailyTotal: null,
    status: 'available',
    active: true,
  });

  const created = await createTechnicianApi(payload);
  let technicians = [];
  try {
    technicians = await refreshTechniciansFromApi();
  } catch (_) {
    // createTechnicianApi already updates the local technician cache.
    technicians = [];
  }

  return {
    created,
    technicians: Array.isArray(technicians) ? technicians : [],
  };
}

function setButtonSaving(button, isSaving, idleLabel, savingLabel) {
  if (!button) return;
  button.disabled = isSaving;
  button.textContent = isSaving ? savingLabel : idleLabel;
}

function getPositionElements() {
  return {
    openButton: document.getElementById('open-project-position-create'),
    modal: document.getElementById('projectQuickPositionModal'),
    form: document.getElementById('project-quick-position-form'),
    saveButton: document.getElementById('project-quick-position-save'),
    nameAr: document.getElementById('project-quick-position-name-ar'),
    nameEn: document.getElementById('project-quick-position-name-en'),
    cost: document.getElementById('project-quick-position-cost'),
    clientPrice: document.getElementById('project-quick-position-client-price'),
  };
}

function getTechnicianElements() {
  return {
    openButton: document.getElementById('open-project-technician-create'),
    modal: document.getElementById('projectQuickTechnicianModal'),
    form: document.getElementById('project-quick-technician-form'),
    saveButton: document.getElementById('project-quick-technician-save'),
    name: document.getElementById('project-quick-technician-name'),
    phone: document.getElementById('project-quick-technician-phone'),
    email: document.getElementById('project-quick-technician-email'),
    role: document.getElementById('project-quick-technician-role'),
    department: document.getElementById('project-quick-technician-department'),
  };
}

function attachModalBodyState(modal) {
  if (!modal || modal.dataset.quickCrewModalStateAttached === 'true') return;
  modal.addEventListener('shown.bs.modal', () => {
    document.body.classList.add('reservation-modal-open');
  });
  modal.addEventListener('hidden.bs.modal', () => {
    const hasOpenProjectModal = Boolean(document.querySelector('.project-shell-modal.show'));
    if (!hasOpenProjectModal) {
      document.body.classList.remove('reservation-modal-open');
    }
  });
  modal.dataset.quickCrewModalStateAttached = 'true';
}

function setupQuickPositionCreate() {
  const elements = getPositionElements();
  if (!elements.openButton || !elements.modal || !elements.form) return;
  if (elements.form.dataset.quickPositionAttached === 'true') return;

  elements.openButton.addEventListener('click', () => {
    elements.form.reset();
    getBootstrapModal(elements.modal)?.show();
    window.setTimeout(() => elements.nameAr?.focus(), 160);
  });

  attachModalBodyState(elements.modal);

  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const current = getPositionElements();
    const idleLabel = t('projects.quickCrew.position.save', 'حفظ وإضافة المنصب');
    const savingLabel = t('projects.quickCrew.position.saving', 'جارٍ الحفظ...');
    setButtonSaving(current.saveButton, true, idleLabel, savingLabel);
    try {
      const created = await createProjectQuickPosition({
        labelAr: current.nameAr?.value,
        labelEn: current.nameEn?.value,
        cost: current.cost?.value,
        clientPrice: current.clientPrice?.value,
      });
      addDraftAssignmentFromPosition(created);
      getBootstrapModal(current.modal)?.hide();
      current.form.reset();
      showToast(t('projects.quickCrew.position.toast.created', 'تمت إضافة المنصب إلى المشروع الحالي'), 'success');
    } catch (error) {
      showToast(error?.message || t('projects.quickCrew.position.toast.failed', 'تعذر إضافة المنصب'), 'error');
    } finally {
      setButtonSaving(current.saveButton, false, idleLabel, savingLabel);
    }
  });

  elements.form.dataset.quickPositionAttached = 'true';
}

function setupQuickTechnicianCreate() {
  const elements = getTechnicianElements();
  if (!elements.openButton || !elements.modal || !elements.form) return;
  if (elements.form.dataset.quickTechnicianAttached === 'true') return;

  elements.openButton.addEventListener('click', () => {
    elements.form.reset();
    getBootstrapModal(elements.modal)?.show();
    window.setTimeout(() => elements.name?.focus(), 160);
  });

  attachModalBodyState(elements.modal);

  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const current = getTechnicianElements();
    const idleLabel = t('projects.quickCrew.technician.save', 'حفظ عضو الفريق');
    const savingLabel = t('projects.quickCrew.technician.saving', 'جارٍ الحفظ...');
    setButtonSaving(current.saveButton, true, idleLabel, savingLabel);
    try {
      await createProjectQuickTechnician({
        name: current.name?.value,
        phone: current.phone?.value,
        email: current.email?.value,
        role: current.role?.value,
        department: current.department?.value,
      });
      getBootstrapModal(current.modal)?.hide();
      current.form.reset();
      showToast(t('projects.quickCrew.technician.toast.created', 'تمت إضافة عضو الفريق وأصبح متاحًا للاختيار'), 'success');
    } catch (error) {
      showToast(error?.message || t('projects.quickCrew.technician.toast.failed', 'تعذر إضافة عضو الفريق'), 'error');
    } finally {
      setButtonSaving(current.saveButton, false, idleLabel, savingLabel);
    }
  });

  elements.form.dataset.quickTechnicianAttached = 'true';
}

export function setupProjectQuickCrewCreate() {
  if (typeof document === 'undefined') return;
  setupQuickPositionCreate();
  setupQuickTechnicianCreate();
}
