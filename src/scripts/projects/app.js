import { AUTH_EVENTS } from '../auth.js';
import { ensureReservationsLoaded } from '../reservationsActions.js';
import { refreshProjectsFromApi } from '../projectsService.js';
import { showToast } from '../utils.js';
import { t } from '../language.js';
import { cacheDom, initProjectDatePickers, bindLogout } from './dom.js';
import {
  initProjectPreferencesSync,
  initProjectSubTabs,
  initTabNavigation
} from './tabs.js';
import {
  loadAllData,
  populateSelects,
  refreshProjectClientField
} from './data.js';
import {
  bindFormEvents,
  bindSelectionEvents,
  bindSelectionRemovalEvents,
  bindExpenseEvents,
  bindTableEvents,
  handleCustomersChanged,
  handleTechniciansUpdated,
  handleReservationsChanged,
  bindLinkedReservationButton,
  renderSelections,
  refreshProjectSubmitButton,
  restoreProjectFormDraft
} from './form.js';
import {
  openProjectDetails,
  bindFocusCards
} from './projectDetails.js';
import {
  capturePendingProjectRequest,
  openPendingProjectDetailIfReady
} from './pending.js';
import {
  renderProjects,
  renderFocusCards,
  updateSummary
} from './view.js';

export function initProjectsPage() {
  document.addEventListener('DOMContentLoaded', () => {
    initProjectPreferencesSync();
    capturePendingProjectRequest();
    cacheDom();
    refreshProjectSubmitButton();
    initProjectDatePickers();
    initTabNavigation();
    initProjectSubTabs();
    bindLogout();

    bindFormEvents();
    bindSelectionEvents();
    bindSelectionRemovalEvents();
    bindExpenseEvents();
    bindLinkedReservationButton();
    bindTableEvents({ onViewDetails: openProjectDetails });
    bindFocusCards({ onOpenProject: openProjectDetails });

    refreshProjectClientField();

    initialiseProjectsData();
  });

  document.addEventListener('language:changed', handleLanguageUpdate);
  document.addEventListener('language:translationsReady', handleLanguageUpdate);
  document.addEventListener('customers:changed', handleCustomersChangedWrapper);
  document.addEventListener('technicians:updated', handleTechniciansUpdatedWrapper);
  document.addEventListener('reservations:changed', () => handleReservationsChanged(openProjectDetails));
  document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
    renderProjects();
  });
}

async function initialiseProjectsData() {
  try {
    await ensureReservationsLoaded({ suppressError: true });
    await refreshProjectsFromApi();
  } catch (error) {
    console.error('❌ [projects] Failed to initialise projects data', error);
    const message = error?.message || t('projects.toast.fetchFailed', 'تعذر تحميل بيانات المشاريع، حاول لاحقًا');
    showToast(message, 'error');
  } finally {
    loadAllData();
    populateSelects();
    restoreProjectFormDraft();
    renderSelections();
    renderProjects();
    updateSummary();
    renderFocusCards();
    openPendingProjectDetailIfReady();
  }
}

function handleLanguageUpdate() {
  populateSelects();
  renderSelections();
  renderProjects();
  updateSummary();
  renderFocusCards();
  refreshProjectSubmitButton();
}

function handleCustomersChangedWrapper() {
  handleCustomersChanged();
  populateSelects();
}

function handleTechniciansUpdatedWrapper() {
  handleTechniciansUpdated();
  populateSelects();
}
