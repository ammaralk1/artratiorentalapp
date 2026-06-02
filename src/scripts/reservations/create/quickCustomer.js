import { t } from '../../language.js';
import { loadData } from '../../storage.js';
import { showToast } from '../../utils.js';
import {
  collectQuickCustomerPayload,
  createQuickCustomer,
  getQuickCustomerDisplayName,
  mergeQuickCustomerIntoList,
  normalizeQuickCustomerRecord,
} from '../../quickCustomer.js';
import { setCachedCustomers } from '../state.js';
import {
  ensureCustomerChoices,
} from './customer-project.js';
import { persistCreateReservationDraft } from './draft.js';
import { renderDraftReservationSummary } from './packages-items.js';

function getQuickCustomerElements() {
  return {
    openButton: document.getElementById('open-reservation-customer-create'),
    modal: document.getElementById('reservationQuickCustomerModal'),
    form: document.getElementById('reservation-quick-customer-form'),
    saveButton: document.getElementById('reservation-quick-customer-save'),
    nameInput: document.getElementById('reservation-quick-customer-name'),
    phoneInput: document.getElementById('reservation-quick-customer-phone'),
    emailInput: document.getElementById('reservation-quick-customer-email'),
    companyInput: document.getElementById('reservation-quick-customer-company'),
    taxInput: document.getElementById('reservation-quick-customer-tax-id'),
    addressInput: document.getElementById('reservation-quick-customer-address'),
    notesInput: document.getElementById('reservation-quick-customer-notes'),
    customerInput: document.getElementById('res-customer-input'),
    customerHidden: document.getElementById('res-customer'),
  };
}

function getBootstrapModal(element) {
  if (!element || typeof window === 'undefined' || !window.bootstrap?.Modal) {
    return null;
  }
  return window.bootstrap.Modal.getOrCreateInstance(element);
}

function refreshReservationCustomerCache(createdCustomer) {
  const normalizedCustomer = normalizeQuickCustomerRecord(createdCustomer);
  const { customers = [] } = loadData();
  const { customers: nextCustomers } = mergeQuickCustomerIntoList(customers, normalizedCustomer);
  const createdId = normalizedCustomer?.id != null ? String(normalizedCustomer.id) : '';

  setCachedCustomers(nextCustomers);
  ensureCustomerChoices({ selectedValue: createdId });
  return normalizedCustomer;
}

function applyCreatedCustomerToReservation(createdCustomer) {
  const { customerInput, customerHidden } = getQuickCustomerElements();
  if (!createdCustomer || !customerInput || !customerHidden) return;

  const normalizedCustomer = refreshReservationCustomerCache(createdCustomer);
  const customerId = normalizedCustomer.id != null ? String(normalizedCustomer.id) : '';
  const label = getQuickCustomerDisplayName(normalizedCustomer);

  customerHidden.value = customerId;
  customerInput.value = label;
  customerInput.dataset.selectedId = customerId;
  customerInput.dispatchEvent(new Event('input', { bubbles: true }));
  customerInput.dispatchEvent(new Event('change', { bubbles: true }));

  renderDraftReservationSummary();
  try { persistCreateReservationDraft(); } catch (_) { /* ignore draft persistence errors */ }
}

function setSavingState(elements, isSaving) {
  if (!elements.saveButton) return;
  elements.saveButton.disabled = isSaving;
  elements.saveButton.textContent = isSaving
    ? t('reservations.quickCustomer.actions.saving', 'جارٍ الحفظ...')
    : t('reservations.quickCustomer.actions.save', 'حفظ واختيار العميل');
}

function resetQuickCustomerForm(elements) {
  elements.form?.reset();
  if (elements.nameInput && elements.customerInput?.value.trim()) {
    elements.nameInput.value = elements.customerInput.value.trim();
  }
}

export function setupReservationQuickCustomerCreate() {
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
    const hasOpenReservationModal = Boolean(document.querySelector('.reservation-shell-modal.show'));
    if (!hasOpenReservationModal) {
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
      applyCreatedCustomerToReservation(createdCustomer);
      getBootstrapModal(currentElements.modal)?.hide();
      currentElements.form?.reset();
      showToast(t('reservations.quickCustomer.toast.created', 'تمت إضافة العميل واختياره في الحجز الحالي'));
    } catch (error) {
      const message = error?.message || t('reservations.quickCustomer.toast.failed', 'تعذر إضافة العميل من الحجز الحالي');
      showToast(message, 'error');
    } finally {
      setSavingState(currentElements, false);
    }
  });

  elements.form.dataset.quickCustomerAttached = 'true';
}
