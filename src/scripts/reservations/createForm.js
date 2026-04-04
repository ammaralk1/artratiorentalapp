import { loadData } from '../storage.js';
import { setCachedCustomers } from './state.js';
import { getEquipmentBookingMode } from './state.js';
import { state } from './create/state.js';
import { restoreCreateReservationDraft } from './create/draft.js';
import {
  ensureCustomerChoices,
  ensureProjectChoices,
  getCachedProjects,
  setCachedProjects,
  populateProjectSelect,
  setupCustomerAutocomplete,
  setupProjectSelection,
  applyPendingProjectContext,
} from './create/customer-project.js';
import {
  populateEquipmentDescriptionLists,
  addDraftEquipmentByDescription,
  findEquipmentByDescription,
  hasExactEquipmentDescription,
  buildEquipmentConflictToastMessage,
  getEquipmentUnavailableMessage,
  setupEquipmentDescriptionInputs,
  setupEquipmentSelectionIntegration,
  setupEquipmentModeControls,
  applyEquipmentModeUi,
} from './create/equipment.js';
import {
  populatePackageSelect,
  buildReservationPackageEntry,
  renderReservationItems,
  renderDraftReservationSummary,
  setupSummaryEvents,
  setupReservationTimeSync,
} from './create/packages-items.js';
import {
  setupReservationButtons,
  setupBarcodeInput,
  setupFormSubmit,
} from './create/submit.js';
import {
  persistCreateReservationDraft,
  RESERVATION_FORM_DRAFT_STORAGE_KEY,
} from './create/draft.js';
import {
  updatePaymentStatusAppearance,
  getCompanySharePercent,
  ensureCompanyShareEnabled,
} from './create/customer-project.js';

export {
  buildEquipmentConflictToastMessage,
  getEquipmentUnavailableMessage,
  updatePaymentStatusAppearance,
  getCompanySharePercent,
  ensureCompanyShareEnabled,
  findEquipmentByDescription,
  hasExactEquipmentDescription,
  buildReservationPackageEntry,
  persistCreateReservationDraft,
  populateEquipmentDescriptionLists,
  addDraftEquipmentByDescription,
  renderDraftReservationSummary,
  renderReservationItems,
};

export function initCreateReservationForm({ onAfterSubmit } = {}) {
  state.afterSubmitCallback = typeof onAfterSubmit === 'function' ? onAfterSubmit : null;

  state.createDraftRestoreInProgress = true; // suppress draft writes during init
  const { customers, projects } = loadData();
  setCachedCustomers(customers || []);
  ensureCustomerChoices();
  setupCustomerAutocomplete();

  setCachedProjects(projects || []);
  populateProjectSelect({ projectsList: projects });
  setupProjectSelection();

  populateEquipmentDescriptionLists();
  populatePackageSelect();
  setupEquipmentDescriptionInputs();
  setupEquipmentSelectionIntegration();
  setupEquipmentModeControls();
  setupReservationTimeSync();
  setupSummaryEvents();
  setupReservationButtons();
  setupBarcodeInput();
  setupFormSubmit();
  // Restore saved draft before applying any project context overrides
  restoreCreateReservationDraft();
  applyPendingProjectContext();
  renderDraftReservationSummary();
  renderReservationItems();

  // Ensure we persist on page unload even if inputs are focused
  try {
    if (typeof window !== 'undefined' && !window.__reservationDraftUnloadBound) {
      window.addEventListener('beforeunload', () => {
        try { persistCreateReservationDraft(); } catch (_) { /* ignore */ }
      });
      window.__reservationDraftUnloadBound = true;
    }
  } catch (_) { /* ignore */ }

  state.createDraftRestoreInProgress = false;
}

export function refreshCreateReservationForm() {
  populateEquipmentDescriptionLists();
  populatePackageSelect();
  populateProjectSelect();
  ensureCustomerChoices();
  setupCustomerAutocomplete();
  setupProjectSelection();
  setupEquipmentSelectionIntegration();
  setupEquipmentModeControls();
  renderReservationItems();
  renderDraftReservationSummary();
}

if (typeof document !== 'undefined') {
  const handleLanguageRefresh = () => {
    ensureCustomerChoices();
    ensureProjectChoices({ projectsList: getCachedProjects() });
    setupCustomerAutocomplete();
    setupProjectSelection();
    renderDraftReservationSummary();
  };
  document.addEventListener('language:changed', handleLanguageRefresh);
  document.addEventListener('language:translationsReady', handleLanguageRefresh);

  document.addEventListener('equipment:changed', () => {
    populateEquipmentDescriptionLists();
  });

  document.addEventListener('packages:changed', () => {
    populatePackageSelect();
    if (getEquipmentBookingMode() === 'package') {
      applyEquipmentModeUi('package');
    }
  });
}

if (typeof window !== 'undefined') {
  window.getCompanySharePercent = getCompanySharePercent;
}
