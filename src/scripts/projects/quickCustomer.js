import { t } from '../language.js';
import { loadData, saveData } from '../storage.js';
import { showToast } from '../utils.js';
import {
  collectQuickCustomerPayload,
  createQuickCustomer,
  getQuickCustomerDisplayName,
  mergeQuickCustomerIntoList,
  normalizeQuickCustomerRecord,
} from '../quickCustomer.js';
import { dom, state } from './state.js';
import {
  clearProjectCustomerSuggestions,
  refreshProjectClientField,
  setProjectClientCompany,
} from './data.js';

function getQuickCustomerElements() {
  return {
    openButton: document.getElementById('open-project-customer-create'),
    modal: document.getElementById('projectQuickCustomerModal'),
    form: document.getElementById('project-quick-customer-form'),
    saveButton: document.getElementById('project-quick-customer-save'),
    nameInput: document.getElementById('project-quick-customer-name'),
    phoneInput: document.getElementById('project-quick-customer-phone'),
    emailInput: document.getElementById('project-quick-customer-email'),
    companyInput: document.getElementById('project-quick-customer-company'),
    taxInput: document.getElementById('project-quick-customer-tax-id'),
    addressInput: document.getElementById('project-quick-customer-address'),
    notesInput: document.getElementById('project-quick-customer-notes'),
  };
}

function getBootstrapModal(element) {
  if (!element || typeof window === 'undefined' || !window.bootstrap?.Modal) {
    return null;
  }
  return window.bootstrap.Modal.getOrCreateInstance(element);
}

function refreshProjectCustomerCache(createdCustomer) {
  const normalizedCustomer = normalizeQuickCustomerRecord(createdCustomer);
  const { customers = [] } = loadData();
  const { customers: nextList } = mergeQuickCustomerIntoList(customers, normalizedCustomer);

  state.customers = nextList;
  saveData({ customers: nextList });
  refreshProjectClientField();
  return normalizedCustomer;
}

function applyCreatedCustomerToProject(createdCustomer) {
  if (!createdCustomer || !dom.client) return;

  const normalizedCustomer = refreshProjectCustomerCache(createdCustomer);
  const customerId = normalizedCustomer.id ? String(normalizedCustomer.id) : '';
  const label = getQuickCustomerDisplayName(normalizedCustomer);

  dom.client.value = label;
  dom.client.dataset.customerId = customerId;
  setProjectClientCompany(normalizedCustomer);
  clearProjectCustomerSuggestions();
  dom.client.dispatchEvent(new Event('change', { bubbles: true }));
}

function setSavingState(elements, isSaving) {
  if (!elements.saveButton) return;
  elements.saveButton.disabled = isSaving;
  elements.saveButton.textContent = isSaving
    ? t('projects.quickCustomer.actions.saving', 'جارٍ الحفظ...')
    : t('projects.quickCustomer.actions.save', 'حفظ واختيار العميل');
}

function resetQuickCustomerForm(elements) {
  elements.form?.reset();
  if (elements.nameInput && dom.client?.value.trim()) {
    elements.nameInput.value = dom.client.value.trim();
  }
}

export function setupProjectQuickCustomerCreate() {
  if (typeof document === 'undefined') return;

  const elements = getQuickCustomerElements();
  if (!elements.openButton || !elements.modal || !elements.form) return;
  if (elements.form.dataset.quickCustomerAttached === 'true') return;

  elements.openButton.addEventListener('click', () => {
    resetQuickCustomerForm(elements);
    getBootstrapModal(elements.modal)?.show();
    window.setTimeout(() => elements.nameInput?.focus(), 160);
  });

  elements.modal.addEventListener('shown.bs.modal', () => {
    document.body.classList.add('reservation-modal-open');
  });

  elements.modal.addEventListener('hidden.bs.modal', () => {
    const hasOpenProjectModal = Boolean(document.querySelector('.project-shell-modal.show'));
    if (!hasOpenProjectModal) {
      document.body.classList.remove('reservation-modal-open');
    }
  });

  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const currentElements = getQuickCustomerElements();
    let payload;
    try {
      payload = collectQuickCustomerPayload(currentElements);
    } catch (error) {
      showToast(error?.message || t('customers.toast.missingFields', 'يرجى تعبئة الاسم ورقم الهاتف'), 'error');
      return;
    }

    setSavingState(currentElements, true);
    try {
      const createdCustomer = await createQuickCustomer(payload);
      applyCreatedCustomerToProject(createdCustomer);
      getBootstrapModal(currentElements.modal)?.hide();
      currentElements.form?.reset();
      showToast(t('projects.quickCustomer.toast.created', 'تمت إضافة العميل واختياره في المشروع الحالي'));
    } catch (error) {
      const message = error?.message || t('projects.quickCustomer.toast.failed', 'تعذر إضافة العميل من المشروع الحالي');
      showToast(message, 'error');
    } finally {
      setSavingState(currentElements, false);
    }
  });

  elements.form.dataset.quickCustomerAttached = 'true';
}
