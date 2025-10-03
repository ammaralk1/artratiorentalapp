import { t } from '../language.js';
import { loadData } from '../storage.js';
import {
  buildProjectPayload,
  createProjectApi,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi
} from '../projectsService.js';
import { getReservationsState } from '../reservationsService.js';
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
  updateSummary
} from './view.js';
import {
  handleProjectReservationSync,
  removeProject
} from './actions.js';

let isProjectSubmitInProgress = false;

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
