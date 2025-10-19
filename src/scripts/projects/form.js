import { t, getCurrentLanguage } from '../language.js';
import { loadData } from '../storage.js';
import {
  buildProjectPayload,
  createProjectApi,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi
} from '../projectsService.js';
import { getReservationsState, refreshReservationsFromApi, updateReservationApi } from '../reservationsService.js';
import {
  generateProjectCode,
  normalizeNumbers,
  showToast
} from '../utils.js';
import { notifyPermissionDenied, userCanManageDestructiveActions } from '../auth.js';
import { state, dom, resetSelections } from './state.js';
import { PROJECT_TAX_RATE } from './constants.js';
import {
  clearProjectCustomerSuggestions,
  resolveProjectCustomer,
  setProjectClientCompany
} from './data.js';
import { clearProjectDateInputs } from './dom.js';
import {
  escapeHtml,
  formatCurrency,
  getEmptyText
} from './formatting.js';
import {
  renderProjects,
  renderFocusCards,
  updateSummary,
  resolveReservationNetTotal
} from './view.js';
import {
  handleProjectReservationSync,
  removeProject
} from './actions.js';
import { updatePreferences } from '../preferencesService.js';

let isProjectSubmitInProgress = false;
const PROJECT_FORM_DRAFT_STORAGE_KEY = 'projects:create:draft';
const DEFAULT_LINKED_RESERVATION_RETURN_URL = 'projects.html#projects-section';

export function bindFormEvents() {
  if (dom.form && !dom.form.dataset.listenerAttached) {
    dom.form.addEventListener('submit', handleSubmitProject);
    dom.form.dataset.listenerAttached = 'true';
  }

  if (dom.form && !dom.form.dataset.resetListenerAttached) {
    dom.form.addEventListener('reset', () => {
      if (dom.client) {
        dom.client.dataset.customerId = '';
      }
      clearProjectCustomerSuggestions();
      clearProjectDateInputs();
      if (dom.type) {
        dom.type.value = '';
      }
      setProjectClientCompany(null);
      clearProjectFormDraft();
      resetProjectFormState();
    });
    dom.form.dataset.resetListenerAttached = 'true';
  }

  if (dom.search && !dom.search.dataset.listenerAttached) {
    dom.search.addEventListener('input', () => {
      state.filters.search = normalizeNumbers(dom.search.value || '').trim().toLowerCase();
      renderProjects();
    });
    dom.search.dataset.listenerAttached = 'true';
  }
}

export function resetProjectFormState() {
  resetSelections();
  state.editingProjectId = null;
  if (dom.form) {
    delete dom.form.dataset.editingId;
    dom.form.dataset.mode = 'create';
  }
  renderSelections();
  if (dom.expenseLabel) dom.expenseLabel.value = '';
  if (dom.expenseAmount) dom.expenseAmount.value = '';
  if (dom.taxCheckbox) dom.taxCheckbox.checked = false;
  if (dom.paymentStatus) dom.paymentStatus.value = 'unpaid';
  refreshProjectSubmitButton();
  renderLinkedReservationDraftSummary();
}

export function bindSelectionEvents() {
  if (dom.addTechnicianBtn && dom.addTechnicianBtn.dataset.listenerAttached !== 'true') {
    dom.addTechnicianBtn.addEventListener('click', handleAddTechnician);
    dom.addTechnicianBtn.dataset.listenerAttached = 'true';
  }

  if (dom.addEquipmentBtn && dom.addEquipmentBtn.dataset.listenerAttached !== 'true') {
    dom.addEquipmentBtn.addEventListener('click', handleAddEquipment);
    dom.addEquipmentBtn.dataset.listenerAttached = 'true';
  }
}

export function bindSelectionRemovalEvents() {
  attachRemovalListener(dom.technicianList, (target) => {
    if (target.matches('[data-action="remove-technician"]')) {
      const id = target.dataset.id;
      state.selectedTechnicians = state.selectedTechnicians.filter((techId) => techId !== id);
      renderTechnicianChips();
    }
  });

  attachRemovalListener(dom.equipmentList, (target) => {
    if (target.matches('[data-action="remove-equipment"]')) {
      const barcode = target.dataset.id;
      state.selectedEquipment = state.selectedEquipment.filter((item) => item.barcode !== barcode);
      renderEquipmentChips();
    }
  });

  attachRemovalListener(dom.expenseList, (target) => {
    if (target.matches('[data-action="remove-expense"]')) {
      const expenseId = target.dataset.id;
      state.expenses = state.expenses.filter((item) => String(item.id) !== String(expenseId));
      renderExpenseList();
      updateSummary();
    }
  });
}

export function bindExpenseEvents() {
  if (dom.addExpenseBtn && dom.addExpenseBtn.dataset.listenerAttached !== 'true') {
    dom.addExpenseBtn.addEventListener('click', handleAddExpense);
    dom.addExpenseBtn.dataset.listenerAttached = 'true';
  }

  if (dom.expenseAmount && dom.expenseAmount.dataset.normalizeAttached !== 'true') {
    dom.expenseAmount.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      const cursorPosition = input.selectionStart;
      const normalized = normalizeNumbers(input.value || '');
      input.value = normalized;
      if (cursorPosition != null) {
        const newPos = Math.min(normalized.length, cursorPosition);
        input.setSelectionRange(newPos, newPos);
      }
    });
    dom.expenseAmount.dataset.normalizeAttached = 'true';
  }
}

function attachRemovalListener(container, handler) {
  if (!container || container.dataset.listenerAttached === 'true') return;
  container.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    handler(target);
  });
  container.dataset.listenerAttached = 'true';
}

export function bindTableEvents({ onViewDetails }) {
  if (!dom.projectsTableBody || dom.projectsTableBody.dataset.listenerAttached === 'true') return;

  dom.projectsTableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-action="view-details"]')) {
      const projectId = target.dataset.id;
      onViewDetails?.(projectId);
      return;
    }

    if (target.matches('[data-action="delete-project"]')) {
      if (!userCanManageDestructiveActions()) {
        notifyPermissionDenied();
        return;
      }
      const projectId = target.dataset.id;
      removeProject(projectId);
    }
  });

  dom.projectsTableBody.dataset.listenerAttached = 'true';
}

export function handleCustomersChanged() {
  const { customers } = loadData();
  state.customers = Array.isArray(customers) ? customers : [];
  renderSelections();
  renderProjects();
  renderFocusCards();
}

export function handleTechniciansUpdated() {
  const { technicians } = loadData();
  state.technicians = Array.isArray(technicians) ? technicians : [];
  renderSelections();
  renderProjects();
  renderFocusCards();
}

export function handleReservationsChanged(openProjectDetails) {
  const { reservations } = loadData();
  state.reservations = Array.isArray(reservations) ? reservations : [];
  renderProjects();

  const isModalOpen = dom.detailsModalEl && dom.detailsModalEl.classList.contains('show');
  const currentProjectId = dom.detailsBody?.dataset.projectId;
  if (isModalOpen && currentProjectId) {
    const projectExists = state.projects.find((project) => String(project.id) === String(currentProjectId));
    if (projectExists) {
      openProjectDetails?.(currentProjectId);
    }
  }
}

function handleAddTechnician() {
  const value = dom.technicianSelect?.value;
  if (!value) {
    showToast(t('projects.toast.selectTechnician', '⚠️ يرجى اختيار عضو الطاقم'));
    return;
  }

  if (state.selectedTechnicians.includes(value)) {
    showToast(t('projects.toast.technicianAlreadyAdded', '⚠️ العضو مضاف بالفعل'));
    return;
  }

  state.selectedTechnicians.push(value);
  renderSelections();
  showToast(t('projects.toast.technicianAdded', '✅ تمت إضافة عضو الطاقم'));
}

function handleAddEquipment() {
  const barcode = dom.equipmentSelect?.value;
  if (!barcode) {
    showToast(t('projects.toast.selectEquipment', '⚠️ يرجى اختيار المعدة'));
    return;
  }

  const qty = Math.max(1, parseInt(dom.equipmentQty?.value || '1', 10) || 1);
  const existing = state.selectedEquipment.find((item) => item.barcode === barcode);

  if (existing) {
    existing.qty += qty;
  } else {
    state.selectedEquipment.push({ barcode, qty });
  }

  renderSelections();
  showToast(t('projects.toast.equipmentAdded', '✅ تمت إضافة المعدة للمشروع'));
}

function handleAddExpense() {
  const label = (dom.expenseLabel?.value || '').trim();
  const normalizedAmount = normalizeNumbers(dom.expenseAmount?.value || '0');
  const amount = Number(normalizedAmount);

  if (!label) {
    showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
    return;
  }

  if (!Number.isFinite(amount) || amount < 0) {
    showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
    return;
  }

  state.expenses.push({
    id: Date.now(),
    label,
    amount
  });

  if (dom.expenseLabel) dom.expenseLabel.value = '';
  if (dom.expenseAmount) dom.expenseAmount.value = normalizeNumbers(String(normalizedAmount));

  renderSelections();
  updateSummary();
}

export function renderSelections() {
  renderTechnicianChips();
  renderEquipmentChips();
  renderExpenseList();
  refreshProjectSubmitButton();
}

function renderTechnicianChips() {
  if (!dom.technicianList) return;
  renderChipList(dom.technicianList, state.selectedTechnicians, (id) => {
    const technician = state.technicians.find((tech) => String(tech.id) === String(id));
    const name = technician?.name || t('projects.fallback.technicianName', 'عضو بدون اسم');
    return `
      <span class="chip">
        ${escapeHtml(name)}
        <button type="button" class="chip__remove" data-action="remove-technician" data-id="${escapeHtml(String(id))}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">✖</button>
      </span>
    `;
  });
}

function renderEquipmentChips() {
  if (!dom.equipmentList) return;
  renderChipList(dom.equipmentList, state.selectedEquipment, (item) => {
    const equipment = state.equipment.find((eq) => String(eq.barcode || '') === String(item.barcode));
    const name = equipment?.desc || equipment?.description || equipment?.name || t('projects.fallback.unknownEquipment', 'معدة');
    const qty = normalizeNumbers(String(item.qty || 1));
    return `
      <span class="chip">
        ${escapeHtml(name)} (x${qty})
        <button type="button" class="chip__remove" data-action="remove-equipment" data-id="${escapeHtml(String(item.barcode))}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">✖</button>
      </span>
    `;
  });
}

function renderExpenseList() {
  if (!dom.expenseList) return;
  renderChipList(dom.expenseList, state.expenses, (expense) => {
    return `
      <div class="expense-item">
        <span>${escapeHtml(expense.label)}</span>
        <span>${formatCurrency(expense.amount)}</span>
        <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${escapeHtml(String(expense.id))}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">✖</button>
      </div>
    `;
  });
}

function renderChipList(container, items, templateFn) {
  if (!container) return;
  if (!items || items.length === 0) {
    const emptyText = escapeHtml(getEmptyText(container));
    container.innerHTML = `<span class="text-muted">${emptyText}</span>`;
    return;
  }

  container.innerHTML = items.map((item) => templateFn(item)).join('');
}

export function refreshProjectSubmitButton() {
  if (!dom.submitBtn) return;
  const isEditing = Boolean(state.editingProjectId);
  const labelKey = isEditing ? 'projects.form.buttons.update' : 'projects.form.buttons.save';
  const fallback = isEditing ? '🔁 تحديث المشروع' : '🆕 إنشاء المشروع';
  dom.submitBtn.textContent = t(labelKey, fallback);
}

function calculateExpensesTotal() {
  return state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
}

function normalizeEquipmentKey(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function resolveSelectedEquipmentForApi() {
  if (!Array.isArray(state.selectedEquipment) || state.selectedEquipment.length === 0) {
    return { items: [], missing: [] };
  }

  const equipmentIndex = new Map(
    (state.equipment || []).map((item) => [normalizeEquipmentKey(item?.barcode), item])
  );

  const missing = [];
  const items = [];

  state.selectedEquipment.forEach((selection) => {
    const key = normalizeEquipmentKey(selection?.barcode);
    if (!key) {
      missing.push(selection?.barcode || '');
      return;
    }
    const equipmentItem = equipmentIndex.get(key);
    if (!equipmentItem || equipmentItem.id == null) {
      missing.push(selection?.barcode || key);
      return;
    }

    const quantity = Number.parseInt(String(selection?.qty ?? 0), 10);
    items.push({
      equipmentId: equipmentItem.id,
      qty: Number.isInteger(quantity) && quantity > 0 ? quantity : 1,
    });
  });

  return { items, missing };
}

export function mapProjectEquipmentToApi(project) {
  if (!project || !Array.isArray(project.equipment)) return [];
  return project.equipment
    .map((item) => {
      const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? null;
      const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 0), 10);
      if (!equipmentId) return null;
      return {
        equipmentId,
        qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
      };
    })
    .filter(Boolean);
}

export function calculateEquipmentEstimate() {
  return state.selectedEquipment.reduce((sum, item) => {
    const equipment = state.equipment.find((eq) => String(eq.barcode || '') === String(item.barcode));
    const price = Number(equipment?.price || equipment?.daily_rate || equipment?.dailyRate || 0);
    return sum + price * (item.qty || 1);
  }, 0);
}

async function handleSubmitProject(event) {
  event.preventDefault();
  if (isProjectSubmitInProgress) return;

  const title = dom.title?.value.trim();
  const projectType = dom.type?.value || '';
  const clientInput = dom.client?.value?.trim() || '';
  const selectedClientId = dom.client?.dataset?.customerId || '';
  const startDateValue = dom.startDate?.value?.trim() || '';
  const startTimeValue = dom.startTime?.value?.trim() || '';

  if (!title || !projectType || !startDateValue) {
    showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
    return;
  }

  const customer = resolveProjectCustomer(clientInput, selectedClientId);
  if (!customer) {
    showToast(t('projects.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    dom.client?.focus();
    return;
  }

  const clientId = String(customer.id);
  if (dom.client) {
    dom.client.dataset.customerId = clientId;
    dom.client.value = customer.customerName || customer.name || dom.client.value;
  }
  setProjectClientCompany(customer);

  const endDateValue = dom.endDate?.value?.trim() || '';
  const endTimeValue = dom.endTime?.value?.trim() || '';

  const startIso = combineDateTime(startDateValue, startTimeValue);
  const endIso = endDateValue ? combineDateTime(endDateValue, endTimeValue) : '';

  const startDate = new Date(startIso);
  const endDate = endIso ? new Date(endIso) : null;
  if (endDate && startDate > endDate) {
    showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
    return;
  }

  if (dom.expenseAmount) {
    dom.expenseAmount.value = normalizeNumbers(dom.expenseAmount.value || '');
  }

  const expensesTotal = calculateExpensesTotal();
  const equipmentEstimate = calculateEquipmentEstimate();
  const applyTax = dom.taxCheckbox?.checked === true;
  const selectedPaymentStatus = dom.paymentStatus?.value || 'unpaid';
  const paymentStatus = selectedPaymentStatus === 'paid' ? 'paid' : 'unpaid';
  const subtotal = equipmentEstimate + expensesTotal;
  const taxAmount = applyTax ? Number((subtotal * PROJECT_TAX_RATE).toFixed(2)) : 0;
  const totalWithTax = Number((subtotal + taxAmount).toFixed(2));

  const { items: equipmentForApi, missing } = resolveSelectedEquipmentForApi();
  if (missing.length) {
    showToast(t('projects.toast.equipmentMissing', '⚠️ بعض المعدات المحددة غير موجودة في النظام، يرجى تحديث قائمة المعدات'), 'error');
    return;
  }

  const isEditing = Boolean(state.editingProjectId);
  const existingProject = isEditing
    ? state.projects.find((proj) => String(proj.id) === String(state.editingProjectId))
    : null;

  if (isEditing && !existingProject) {
    showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
    return;
  }

  const companyValue = customer.companyName || customer.company || '';
  const descriptionValue = dom.description?.value.trim() || '';

  const payload = buildProjectPayload({
    projectCode: existingProject?.projectCode || (!isEditing ? generateProjectCode() : null),
    title,
    type: projectType,
    clientId,
    clientCompany: companyValue,
    description: descriptionValue,
    start: startIso,
    end: endIso || null,
    applyTax,
    paymentStatus,
    equipmentEstimate,
    expenses: state.expenses.map((expense) => ({
      id: expense.id,
      label: expense.label,
      amount: expense.amount,
    })),
    taxAmount,
    totalWithTax,
    confirmed: existingProject?.confirmed ?? false,
    technicians: state.selectedTechnicians,
    equipment: equipmentForApi,
  });

  isProjectSubmitInProgress = true;

  try {
    let projectIdentifier = existingProject?.projectId ?? existingProject?.id ?? null;

    if (isEditing) {
      const updated = await updateProjectApi(projectIdentifier ?? state.editingProjectId, payload);
      projectIdentifier = updated?.projectId ?? updated?.id ?? projectIdentifier;
      await handleProjectReservationSync(projectIdentifier, paymentStatus);
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
    } else {
      const created = await createProjectApi(payload);
      projectIdentifier = created?.projectId ?? created?.id ?? null;
      await handleProjectReservationSync(projectIdentifier, paymentStatus);
      showToast(t('projects.toast.saved', '✅ تم حفظ المشروع بنجاح'));
    }

    const pendingLinkedReservations = await linkDraftReservationsToProject(projectIdentifier);
    if (!pendingLinkedReservations) {
      clearProjectFormDraft();
    }

    state.editingProjectId = null;
    dom.form.reset();
    resetProjectFormState();
    clearProjectDateInputs();
    clearProjectCustomerSuggestions();
    if (dom.client) {
      dom.client.dataset.customerId = '';
    }
    if (dom.type) {
      dom.type.value = '';
    }

    state.projects = getProjectsState();
    state.reservations = getReservationsState();
    renderProjects();
    updateSummary();
    document.dispatchEvent(new CustomEvent('projects:changed'));
  } catch (error) {
    console.error('❌ [projects] handleSubmitProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.saveFailed', 'تعذر حفظ المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  } finally {
    isProjectSubmitInProgress = false;
  }
}

function combineDateTime(dateValue, timeValue) {
  if (!dateValue) return '';
  const normalizedTime = (timeValue && /\d{1,2}:\d{2}/.test(timeValue)) ? timeValue : '00:00';
  const [hours = '00', minutes = '00'] = normalizedTime.split(':');
  const safeHours = hours.padStart(2, '0');
  const safeMinutes = minutes.padStart(2, '0');
  return `${dateValue}T${safeHours}:${safeMinutes}`;
}

function loadProjectFormDraft() {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;
  const raw = window.sessionStorage.getItem(PROJECT_FORM_DRAFT_STORAGE_KEY);
  if (!raw) return null;
  try {
    const draft = JSON.parse(raw);
    return draft && typeof draft === 'object' ? draft : null;
  } catch (error) {
    console.warn('⚠️ [projects] Failed to parse project form draft', error);
    return null;
  }
}

function saveProjectFormDraft(draft) {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(PROJECT_FORM_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn('⚠️ [projects] Unable to persist project form draft', error);
  }
}

function clearProjectFormDraft() {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  window.sessionStorage.removeItem(PROJECT_FORM_DRAFT_STORAGE_KEY);
  renderLinkedReservationDraftSummary();
}

function captureProjectFormDraft() {
  const existingDraft = loadProjectFormDraft() || {};
  return {
    ...existingDraft,
    type: dom.type?.value || '',
    title: dom.title?.value || '',
    client: dom.client?.value || '',
    customerId: dom.client?.dataset.customerId || '',
    clientCompany: dom.clientCompany?.value || '',
    paymentStatus: dom.paymentStatus?.value || 'unpaid',
    taxChecked: dom.taxCheckbox?.checked === true,
    startDate: dom.startDate?.value || '',
    startTime: dom.startTime?.value || '',
    endDate: dom.endDate?.value || '',
    endTime: dom.endTime?.value || '',
    description: dom.description?.value || '',
    expenses: Array.isArray(state.expenses) ? state.expenses.map((expense) => ({ ...expense })) : [],
    technicians: Array.isArray(state.selectedTechnicians) ? [...state.selectedTechnicians] : [],
    equipment: Array.isArray(state.selectedEquipment)
      ? state.selectedEquipment.map((item) => ({ ...item }))
      : [],
    linkedReservationIds: Array.isArray(existingDraft.linkedReservationIds)
      ? [...existingDraft.linkedReservationIds]
      : [],
    savedAt: Date.now()
  };
}

export function restoreProjectFormDraft() {
  const draft = loadProjectFormDraft();
  if (!draft) {
    renderLinkedReservationDraftSummary();
    return false;
  }

  if (dom.type) dom.type.value = draft.type || '';
  if (dom.title) dom.title.value = draft.title || '';
  if (dom.client) {
    dom.client.value = draft.client || '';
    dom.client.dataset.customerId = draft.customerId || '';
  }
  if (dom.clientCompany) dom.clientCompany.value = draft.clientCompany || '';
  if (dom.paymentStatus && draft.paymentStatus) dom.paymentStatus.value = draft.paymentStatus;
  if (dom.taxCheckbox) dom.taxCheckbox.checked = draft.taxChecked === true;
  if (dom.startDate) dom.startDate.value = draft.startDate || '';
  if (dom.startTime) dom.startTime.value = draft.startTime || '';
  if (dom.endDate) dom.endDate.value = draft.endDate || '';
  if (dom.endTime) dom.endTime.value = draft.endTime || '';
  if (dom.description) dom.description.value = draft.description || '';

  state.expenses = Array.isArray(draft.expenses) ? draft.expenses.map((expense) => ({ ...expense })) : [];
  state.selectedTechnicians = Array.isArray(draft.technicians) ? [...draft.technicians] : [];
  state.selectedEquipment = Array.isArray(draft.equipment)
    ? draft.equipment.map((item) => ({ ...item }))
    : [];

  renderLinkedReservationDraftSummary();
  return true;
}

export function bindLinkedReservationButton() {
  if (!dom.linkedReservationBtn || dom.linkedReservationBtn.dataset.listenerAttached === 'true') return;
  dom.linkedReservationBtn.addEventListener('click', handleLinkedReservationButtonClick);
  dom.linkedReservationBtn.dataset.listenerAttached = 'true';
}

function handleLinkedReservationButtonClick(event) {
  event.preventDefault();

  const draft = captureProjectFormDraft();

  const hasClient = (draft.customerId && draft.customerId !== '') || (draft.client && draft.client.trim());
  if (!hasClient) {
    showToast(t('projects.form.linkedReservation.missingClient', '⚠️ يرجى اختيار العميل قبل إنشاء الحجز'));
    return;
  }

  const hasStart = draft.startDate && draft.startTime;
  const hasEnd = draft.endDate && draft.endTime;
  if (!hasStart || !hasEnd) {
    showToast(t('projects.form.linkedReservation.missingSchedule', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إنشاء الحجز'));
    return;
  }

  saveProjectFormDraft(draft);

  const context = buildLinkedReservationContext(draft);
  let encodedContext = '';
  try {
    encodedContext = encodeURIComponent(JSON.stringify(context));
  } catch (error) {
    console.warn('⚠️ [projects] Unable to encode reservation context', error);
  }

  updatePreferences({
    dashboardTab: 'reservations-tab',
    dashboardSubTab: 'create-tab'
  }).catch((error) => {
    console.warn('⚠️ [projects] Failed to persist dashboard preference before redirect', error);
  });

  const search = encodedContext ? `?reservationProjectContext=${encodedContext}` : '';
  window.location.href = `dashboard.html${search}#reservations`;
}

function buildLinkedReservationContext(draft) {
  const start = combineDateTime(draft.startDate, draft.startTime) || null;
  const end = combineDateTime(draft.endDate, draft.endTime) || null;
  return {
    fromProjectForm: true,
    draftStorageKey: PROJECT_FORM_DRAFT_STORAGE_KEY,
    returnUrl: DEFAULT_LINKED_RESERVATION_RETURN_URL,
    start,
    end,
    customerId: draft.customerId || null,
    customerName: draft.client || '',
    clientCompany: draft.clientCompany || '',
    projectTitle: draft.title || '',
    projectType: draft.type || '',
    description: draft.description || ''
  };
}

async function linkDraftReservationsToProject(projectId) {
  if (!projectId) return;
  const draft = loadProjectFormDraft();
  const reservationIds = Array.isArray(draft?.linkedReservationIds) ? draft.linkedReservationIds : [];
  if (!reservationIds.length) return;

  const pending = [];
  let linkedAny = false;

  for (const rawId of reservationIds) {
    const reservationId = rawId != null ? String(rawId) : '';
    if (!reservationId) continue;
    try {
      await updateReservationApi(reservationId, { project_id: projectId });
      linkedAny = true;
    } catch (error) {
      console.error('❌ [projects] Failed to link reservation to project', reservationId, error);
      pending.push(reservationId);
    }
  }

  if (linkedAny) {
    try {
      await refreshReservationsFromApi();
      state.reservations = getReservationsState();
      document.dispatchEvent(new CustomEvent('reservations:changed'));
    } catch (error) {
      console.warn('⚠️ [projects] Failed to refresh reservations after linking', error);
    }
  }

  const draftData = { linkedReservationIds: pending, savedAt: Date.now() };
  saveProjectFormDraft(draftData);
  if (pending.length) {
    showToast(t('projects.toast.linkReservationFailed', '⚠️ تعذر ربط بعض الحجوزات بالمشروع، يرجى التحقق يدويًا'), 'error');
  }

  renderLinkedReservationDraftSummary();
  return pending.length;
}

function buildReservationLookup() {
  const index = new Map();

  const register = (reservation) => {
    if (!reservation) return;
    const keys = [reservation.id, reservation.reservationId, reservation.reservation_id, reservation.reservation_code]
      .map((key) => (key != null ? String(key) : ''))
      .filter(Boolean);
    keys.forEach((key) => {
      if (!index.has(key)) {
        index.set(key, reservation);
      }
    });
  };

  if (Array.isArray(state.reservations)) {
    state.reservations.forEach(register);
  }

  const snapshot = loadData();
  if (Array.isArray(snapshot?.reservations)) {
    snapshot.reservations.forEach(register);
  }

  return index;
}

function resolveTechnicianDisplayName(entry) {
  if (!entry || typeof entry !== 'object') return '';
  const candidates = [
    entry.name,
    entry.full_name,
    entry.fullName,
    entry.technician_name,
    entry.technicianName,
    entry.label,
    entry.displayName
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
  }

  return '';
}

function getCrewNamesFromReservation(reservation) {
  if (!reservation) return [];

  const names = new Set();
  const technicianDetails = Array.isArray(reservation.techniciansDetails) ? reservation.techniciansDetails : [];
  technicianDetails.forEach((entry) => {
    const name = resolveTechnicianDisplayName(entry);
    if (name) {
      names.add(name);
    }
  });

  const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
  if (technicianIds.length) {
    const technicians = Array.isArray(state.technicians) ? state.technicians : [];
    technicianIds.forEach((id) => {
      const technician = technicians.find((tech) => String(tech?.id) === String(id));
      const name = technician?.name || technician?.full_name || '';
      if (name) {
        names.add(String(name).trim());
      }
    });
  }

  return Array.from(names);
}

function renderLinkedReservationDraftSummary() {
  const summaryEl = document.getElementById('project-linked-reservation-summary');
  if (!summaryEl) return;

  const draft = loadProjectFormDraft();
  const button = dom.linkedReservationBtn;
  const ids = Array.isArray(draft?.linkedReservationIds)
    ? Array.from(new Set(draft.linkedReservationIds.map((value) => String(value)).filter(Boolean)))
    : [];

  if (!ids.length) {
    summaryEl.dataset.state = 'empty';
    summaryEl.innerHTML = `<p class="project-linked-reservation__summary-empty">${escapeHtml(t('projects.form.linkedReservation.empty', 'لم يتم إنشاء حجوزات مرتبطة بعد.'))}</p>`;
    if (button) {
      button.disabled = false;
      button.classList.remove('btn-disabled');
      button.removeAttribute('aria-disabled');
      button.title = '';
    }
    return;
  }

  const lookup = buildReservationLookup();
  const listItems = ids.map((id) => {
    const reservation = lookup.get(id);
    if (!reservation) {
      return `
        <li class="project-linked-reservation__summary-item">
          <div class="project-linked-reservation__summary-item-title">#${escapeHtml(normalizeNumbers(id))}</div>
          <div class="project-linked-reservation__summary-item-meta">
            <span>${escapeHtml(t('projects.form.linkedReservation.pendingItem', 'تم إنشاء حجز جديد وسيتم ربطه بعد حفظ المشروع.'))}</span>
          </div>
        </li>`;
    }

    const code = reservation.reservation_code || reservation.reservationId || reservation.id || id;
    const codeText = `#${normalizeNumbers(String(code))}`;
    const items = Array.isArray(reservation.items) ? reservation.items : [];
    const equipmentCount = items.reduce((sum, item) => sum + (Number(item?.qty) || 0), 0) || items.length || 0;
    const crewNames = getCrewNamesFromReservation(reservation);
    const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    const crewCount = technicianIds.length || crewNames.length || 0;
    const totalValue = resolveReservationNetTotal(reservation);
    const metaParts = [];

    const equipmentLabel = t('projects.form.linkedReservation.meta.equipment', 'عدد المعدات: {count}')
      .replace('{count}', normalizeNumbers(String(equipmentCount)));
    metaParts.push(equipmentLabel);

    const crewLabel = t('projects.form.linkedReservation.meta.crew', 'عدد الفريق: {count}')
      .replace('{count}', normalizeNumbers(String(crewCount)));
    metaParts.push(crewLabel);

    if (crewNames.length) {
      const separator = typeof getCurrentLanguage === 'function' && getCurrentLanguage() === 'en' ? ', ' : '، ';
      const namesLabel = t('projects.form.linkedReservation.meta.crewNames', 'أسماء الفريق: {names}')
        .replace('{names}', crewNames.join(separator));
      metaParts.push(namesLabel);
    }

    if (Number.isFinite(totalValue)) {
      const totalLabel = t('projects.form.linkedReservation.meta.total', 'إجمالي الحجز: {amount}')
        .replace('{amount}', formatCurrency(totalValue));
      metaParts.push(totalLabel);
    }

    return `
      <li class="project-linked-reservation__summary-item">
        <div class="project-linked-reservation__summary-item-title">${escapeHtml(codeText)}</div>
        <div class="project-linked-reservation__summary-item-meta">
          ${metaParts.map((part) => `<span>${escapeHtml(part)}</span>`).join('')}
        </div>
      </li>`;
  }).join('');

  summaryEl.dataset.state = 'has-linked';
  summaryEl.innerHTML = `<ul class="project-linked-reservation__summary-list">${listItems}</ul>`;

  if (button) {
    button.disabled = true;
    button.classList.add('btn-disabled');
    button.setAttribute('aria-disabled', 'true');
    button.title = t('projects.form.linkedReservation.buttonDisabled', 'تم إنشاء حجز مرتبط لهذا المشروع. يمكنك تعديل الحجز بعد حفظ المشروع.');
  }
}
