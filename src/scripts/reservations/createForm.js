import { loadData } from '../storage.js';
import { setCachedCustomers } from './state.js';
import { getEquipmentBookingMode } from './state.js';
import { state } from './create/state.js';
import { restoreCreateReservationDraft } from './create/draft.js';
import {
  ensureCustomerChoices,
  ensureReservationCustomersLoaded,
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
import { setupReservationQuickCustomerCreate } from './create/quickCustomer.js';
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

function hydrateCreateReservationReferenceData() {
  const { customers, projects } = loadData();
  setCachedCustomers(customers || []);
  setCachedProjects(projects || []);
  return { customers, projects };
}

function setupCreateReservationSelectors({ projects } = {}) {
  ensureCustomerChoices();
  void ensureReservationCustomersLoaded().then(() => {
    ensureCustomerChoices();
  });
  setupCustomerAutocomplete();
  setupReservationQuickCustomerCreate();
  populateProjectSelect({ projectsList: projects });
  setupProjectSelection();
}

function setupCreateReservationEquipmentAndPackages() {
  populateEquipmentDescriptionLists();
  populatePackageSelect();
  setupEquipmentDescriptionInputs();
  setupEquipmentSelectionIntegration();
  setupEquipmentModeControls();
}

function setupCreateReservationInteractions() {
  setupReservationTimeSync();
  setupSummaryEvents();
  setupReservationButtons();
  setupBarcodeInput();
  setupFormSubmit();
}

function renderCreateReservationSurface() {
  renderDraftReservationSummary();
  renderReservationItems();
}

function bootCreateReservationSurface({ projects, restoreDraft = false } = {}) {
  setupCreateReservationSelectors({ projects });
  setupCreateReservationEquipmentAndPackages();
  if (restoreDraft) {
    restoreCreateReservationDraft();
    applyPendingProjectContext();
  }
  renderCreateReservationSurface();
}

function refreshCreateReservationLanguageSurface() {
  ensureCustomerChoices();
  ensureProjectChoices({ projectsList: getCachedProjects() });
  setupCustomerAutocomplete();
  setupProjectSelection();
  renderDraftReservationSummary();
}

function ensureCreateReservationUnloadPersistence() {
  try {
    if (typeof window !== 'undefined' && !window.__reservationDraftUnloadBound) {
      window.addEventListener('beforeunload', () => {
        try { persistCreateReservationDraft(); } catch (_) { /* ignore */ }
      });
      window.__reservationDraftUnloadBound = true;
    }
  } catch (_) { /* ignore */ }
}

export function initCreateReservationForm({ onAfterSubmit } = {}) {
  state.afterSubmitCallback = typeof onAfterSubmit === 'function' ? onAfterSubmit : null;

  state.createDraftRestoreInProgress = true; // suppress draft writes during init
  const { projects } = hydrateCreateReservationReferenceData();
  setupCreateReservationInteractions();
  bootCreateReservationSurface({ projects, restoreDraft: true });
  ensureCreateReservationUnloadPersistence();

  state.createDraftRestoreInProgress = false;
}

export function refreshCreateReservationForm() {
  const { projects } = hydrateCreateReservationReferenceData();
  bootCreateReservationSurface({ projects, restoreDraft: false });
  void ensureReservationCustomersLoaded().then(() => {
    ensureCustomerChoices();
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('language:changed', refreshCreateReservationLanguageSurface);
  document.addEventListener('language:translationsReady', refreshCreateReservationLanguageSurface);

  document.addEventListener('equipment:changed', () => {
    populateEquipmentDescriptionLists();
  });

  document.addEventListener('customers:changed', () => {
    const { customers } = loadData();
    setCachedCustomers(customers || []);
    ensureCustomerChoices();
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
