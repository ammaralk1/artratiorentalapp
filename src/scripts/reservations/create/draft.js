import { state } from './state.js';
import {
  getSelectedItems,
  combineDateTime,
  setSelectedItems,
} from '../state.js';
import { getSelectedTechnicians, setSelectedTechnicians, getSelectedCrewAssignments } from '../../reservationsTechnicians.js';
import {
  getCustomerElements,
  getProjectElements,
  getCompanySharePercent,
  ensureCustomerChoices,
  resolveCustomerByLabel,
  ensureProjectChoices,
  setDateTimeInputs,
  updateCreateProjectTaxState,
} from './customer-project.js';
import { renderReservationItems, renderDraftReservationSummary } from './packages-items.js';
import { updatePaymentStatusAppearance } from './customer-project.js';

// ===== Draft persistence (keep form on refresh) =====
export const RESERVATION_FORM_DRAFT_STORAGE_KEY = 'reservations:create:draft';

function getDraftStorage() {
  // Prefer sessionStorage, but if unavailable, fall back to localStorage
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) return window.sessionStorage;
  } catch (_) { /* ignore */ }
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch (_) { /* ignore */ }
  return null;
}

function getSecondaryStorage() {
  // Secondary store to maximize resilience across reloads
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch (_) { /* ignore */ }
  return null;
}

function collectCreateReservationDraft() {
  if (typeof document === 'undefined') return null;
  const storage = getDraftStorage();
  if (!storage) return null;

  try {
    const { input: customerInput, hidden: customerHidden } = getCustomerElements();
    const { input: projectInput, hidden: projectHidden } = getProjectElements();

    const startDate = document.getElementById('res-start')?.value || '';
    const endDate = document.getElementById('res-end')?.value || '';
    const startTime = document.getElementById('res-start-time')?.value || '';
    const endTime = document.getElementById('res-end-time')?.value || '';
    const notes = document.getElementById('res-notes')?.value || '';
    const discountRaw = document.getElementById('res-discount')?.value || '';
    const discountType = document.getElementById('res-discount-type')?.value || 'percent';
    const taxEnabled = Boolean(document.getElementById('res-tax')?.checked);
    const shareCheckbox = document.getElementById('res-company-share');
    const companyShareEnabled = Boolean(shareCheckbox?.checked);
    const companySharePercent = companyShareEnabled ? getCompanySharePercent('res-company-share') : null;
    const paymentStatus = document.getElementById('res-payment-status')?.value || 'unpaid';
    const paymentProgressType = document.getElementById('res-payment-progress-type')?.value || 'percent';
    const paymentProgressValue = document.getElementById('res-payment-progress-value')?.value || '';

    const draft = {
      startDate,
      endDate,
      startTime,
      endTime,
      customerId: customerHidden?.value || '',
      customerLabel: customerInput?.value || '',
      projectId: projectHidden?.value || '',
      projectLabel: projectInput?.value || '',
      notes,
      discount: String(discountRaw || ''),
      discountType,
      taxEnabled,
      companyShareEnabled,
      companySharePercent,
      paymentStatus,
      paymentProgressType,
      paymentProgressValue: String(paymentProgressValue || ''),
      items: getSelectedItems() || [],
      technicianIds: getSelectedTechnicians() || [],
      crewAssignments: getSelectedCrewAssignments() || [],
    };
    return draft;
  } catch (_) {
    return null;
  }
}

export function persistCreateReservationDraft() {
  if (state.createDraftRestoreInProgress) return; // avoid overwriting saved draft during init/restore
  const storage = getDraftStorage();
  const secondary = getSecondaryStorage();
  if (!storage && !secondary) return;
  const draft = collectCreateReservationDraft();
  if (!draft) return;
  // Avoid clobbering a richer draft with an empty one triggered by early events
  try {
    const readExisting = () => {
      const rawPrimary = storage ? storage.getItem(RESERVATION_FORM_DRAFT_STORAGE_KEY) : null;
      const rawSecondary = !rawPrimary && secondary ? secondary.getItem(RESERVATION_FORM_DRAFT_STORAGE_KEY) : null;
      const raw = rawPrimary || rawSecondary;
      return raw ? JSON.parse(raw) : null;
    };
    const existing = readExisting();
    const isMeaningful = (d) => {
      if (!d) return false;
      const hasItems = Array.isArray(d.items) && d.items.length > 0;
      const hasCrew = Array.isArray(d.technicianIds) && d.technicianIds.length > 0;
      const hasDates = Boolean(d.startDate || d.endDate || d.startTime || d.endTime);
      const hasCustomer = Boolean(d.customerId || d.customerLabel);
      return hasItems || hasCrew || hasDates || hasCustomer;
    };
    if (isMeaningful(existing) && !isMeaningful(draft)) {
      return; // keep existing richer draft
    }
  } catch (_) { /* ignore */ }
  try {
    const payload = JSON.stringify(draft);
    if (storage) storage.setItem(RESERVATION_FORM_DRAFT_STORAGE_KEY, payload);
    if (secondary && secondary !== storage) secondary.setItem(RESERVATION_FORM_DRAFT_STORAGE_KEY, payload);
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Unable to persist create draft', error);
  }
}

export function clearCreateReservationDraft() {
  const storage = getDraftStorage();
  const secondary = getSecondaryStorage();
  if (!storage && !secondary) return;
  try {
    if (storage) storage.removeItem(RESERVATION_FORM_DRAFT_STORAGE_KEY);
    if (secondary && secondary !== storage) secondary.removeItem(RESERVATION_FORM_DRAFT_STORAGE_KEY);
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Unable to clear create draft', error);
  }
}

export function restoreCreateReservationDraft() {
  const storage = getDraftStorage();
  const secondary = getSecondaryStorage();
  if (!storage && !secondary) return;
  state.createDraftRestoreInProgress = true;
  let draft = null;
  try {
    const rawPrimary = storage ? storage.getItem(RESERVATION_FORM_DRAFT_STORAGE_KEY) : null;
    const rawSecondary = !rawPrimary && secondary ? secondary.getItem(RESERVATION_FORM_DRAFT_STORAGE_KEY) : null;
    const raw = rawPrimary || rawSecondary;
    draft = raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Unable to read create draft', error);
    state.createDraftRestoreInProgress = false;
    return;
  }
  if (!draft) {
    state.createDraftRestoreInProgress = false;
    return;
  }

  try {
    // Date/time
    if (draft.startDate || draft.startTime) {
      const startIso = combineDateTime(draft.startDate || '', draft.startTime || '');
      setDateTimeInputs('res-start', 'res-start-time', startIso);
    }
    if (draft.endDate || draft.endTime) {
      const endIso = combineDateTime(draft.endDate || '', draft.endTime || '');
      setDateTimeInputs('res-end', 'res-end-time', endIso);
    }

    // Customer
    if (draft.customerId) {
      ensureCustomerChoices({ selectedValue: String(draft.customerId) });
      const { input, hidden } = getCustomerElements();
      if (input) input.dataset.selectedId = String(draft.customerId);
    } else if (draft.customerLabel) {
      ensureCustomerChoices({ selectedValue: '', resetInput: true });
      const { input, hidden } = getCustomerElements();
      if (input) input.value = draft.customerLabel;
      if (hidden) hidden.value = '';
      // Try to resolve label to an existing customer id
      try {
        const entry = resolveCustomerByLabel(draft.customerLabel, { allowPartial: true });
        if (entry) {
          hidden.value = String(entry.id);
          input.value = entry.label;
          input.dataset.selectedId = String(entry.id);
        }
      } catch (_) { /* ignore */ }
    }

    // Project
    if (draft.projectId) {
      ensureProjectChoices({ selectedValue: String(draft.projectId) });
    } else if (draft.projectLabel) {
      ensureProjectChoices({ selectedValue: '', resetInput: true });
      const { input, hidden } = getProjectElements();
      if (input) input.value = draft.projectLabel;
      if (hidden) hidden.value = '';
    }

    // Notes / billing / payment
    if (document.getElementById('res-notes')) document.getElementById('res-notes').value = draft.notes || '';
    if (document.getElementById('res-discount')) document.getElementById('res-discount').value = draft.discount || '';
    if (document.getElementById('res-discount-type')) document.getElementById('res-discount-type').value = draft.discountType || 'percent';

    const taxCheckbox = document.getElementById('res-tax');
    if (taxCheckbox) taxCheckbox.checked = Boolean(draft.taxEnabled);

    const shareCheckbox = document.getElementById('res-company-share');
    if (shareCheckbox) {
      shareCheckbox.checked = Boolean(draft.companyShareEnabled);
      if (draft.companySharePercent != null) {
        shareCheckbox.dataset.companyShare = String(draft.companySharePercent);
      }
    }

    const paymentSelect = document.getElementById('res-payment-status');
    if (paymentSelect) {
      paymentSelect.value = draft.paymentStatus || paymentSelect.value || 'unpaid';
      updatePaymentStatusAppearance(paymentSelect, paymentSelect.value);
    }
    if (document.getElementById('res-payment-progress-type')) {
      document.getElementById('res-payment-progress-type').value = draft.paymentProgressType || 'percent';
    }
    if (document.getElementById('res-payment-progress-value')) {
      document.getElementById('res-payment-progress-value').value = draft.paymentProgressValue || '';
    }

    // Items
    if (Array.isArray(draft.items)) {
      setSelectedItems(draft.items);
      renderReservationItems();
    }

    // Technicians (prefer full assignments; fallback to ids)
    if (Array.isArray(draft.crewAssignments) && draft.crewAssignments.length) {
      try { setSelectedTechnicians(draft.crewAssignments); } catch (_) { /* ignore */ }
    } else if (Array.isArray(draft.technicianIds) && draft.technicianIds.length) {
      try { setSelectedTechnicians(draft.technicianIds); } catch (_) { /* ignore */ }
    }

    updateCreateProjectTaxState();
    // Fire events to refresh any dependent UI (e.g., crew picker availability)
    try {
      ['res-customer','res-customer-input','res-start','res-end','res-start-time','res-end-time']
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .forEach((el) => {
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        });
    } catch (_) { /* ignore */ }

    renderDraftReservationSummary();
  } catch (error) {
    console.warn('⚠️ [reservations/createForm] Failed to restore create draft', error);
  } finally {
    state.createDraftRestoreInProgress = false;
  }
}
