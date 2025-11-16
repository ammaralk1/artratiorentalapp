import { AUTH_EVENTS } from '../auth.js';
import { ensureReservationsLoaded } from '../reservationsActions.js';
import { refreshProjectsFromApi } from '../projectsService.js';
import { showToast } from '../utils.js';
import { t } from '../language.js';
import { cacheDom, initProjectDatePickers, bindLogout } from './dom.js';
import {
  initProjectPreferencesSync,
  initProjectSubTabs,
  initTabNavigation,
  activateProjectSubTab,
  persistActiveSubTab,
  getStoredActiveSubTab,
  getUrlRequestedSubTab
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
import { initTemplatesTab } from './templatesTab.js';
import {
  renderProjects,
  renderFocusCards,
  updateSummary
} from './view.js';
import { state } from './state.js';
import { autoCloseExpiredProjects } from './actions.js';

export function initProjectsPage() {
  document.addEventListener('DOMContentLoaded', () => {
    initProjectPreferencesSync();
    capturePendingProjectRequest();
    cacheDom();
    refreshProjectSubmitButton();
    initProjectDatePickers();
    initTabNavigation();
    initProjectSubTabs();
    initTemplatesTab();
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
    renderFocusCards();
  });

  // Keep projects list/cards in sync with any state updates from the service
  try {
    document.addEventListener('projects:changed', () => {
      loadAllData();
      renderSelections();
      renderProjects();
      updateSummary();
      renderFocusCards();
    }, { passive: true });
  } catch (_) { /* ignore */ }
}

async function initialiseProjectsData() {
  try {
    await ensureReservationsLoaded({ suppressError: true });
    await refreshProjectsFromApi();
    // Auto-close projects whose time has ended
    try { await autoCloseExpiredProjects(); } catch (_) {}
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

    // Prefer showing "مشاريعي" (projects list) by default when projects exist
    try {
      const hasExplicitPreference = Boolean(getStoredActiveSubTab());
      const hasUrlRequested = Boolean(getUrlRequestedSubTab());
      const listButton = document.querySelector('.sub-tab-button[data-project-subtab-target="projects-list-tab"]');
      if (!hasExplicitPreference && !hasUrlRequested && Array.isArray(state.projects) && state.projects.length > 0 && listButton) {
        await activateProjectSubTab('projects-list-tab', listButton);
        persistActiveSubTab('projects-list-tab');
      }
    } catch (e) {
      // non-fatal: keep current tab if any issue occurs
    }
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
