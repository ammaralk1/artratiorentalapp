import { AUTH_EVENTS } from '../auth.js';
import { ensureReservationsLoaded } from '../reservationsActions.js';
import { refreshProjectsFromApi } from '../projectsService.js';
import { ensureEquipmentCatalogLoaded } from '../reservationsEquipment.js';
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
  bindExpenseEvents,
  bindTableEvents,
  handleCustomersChanged,
  handleTechniciansUpdated,
  handleReservationsChanged,
  renderSelections,
  refreshProjectSubmitButton,
  restoreProjectFormDraft,
  syncCreateProjectSelectTranslations
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
import {
  isLocalBypassAuthEnabled
} from '../fixtureRuntime.js';
import { setupProjectQuickCustomerCreate } from './quickCustomer.js';
import { setupProjectQuickCrewCreate } from './quickCrew.js';
import { setupProjectEquipmentControls } from './equipment.js';
import {
  getSelectedCrewAssignments,
  initTechnicianSelection
} from '../reservationsTechnicians.js';

let projectsPageInitialised = false;
let projectsPageBindingsInitialised = false;

function mountInlineProjectCreateSection() {
  if (typeof document === 'undefined') return null;
  const mount = document.getElementById('project-create-inline-mount');
  const createSection = document.getElementById('create-project-tab');
  if (!mount || !createSection) return createSection || null;

  if (createSection.parentElement !== mount) {
    mount.appendChild(createSection);
  }

  createSection.removeAttribute('hidden');
  createSection.removeAttribute('aria-hidden');
  createSection.style.display = '';
  return createSection;
}

function focusFirstProjectCreateField(createSection) {
  if (!createSection || typeof window === 'undefined') return;
  const titleField = createSection.querySelector('#project-title');
  const candidates = [
    titleField,
    ...Array.from(createSection.querySelectorAll('[required], input, select, textarea, button'))
  ].filter(Boolean);
  const firstField = candidates.find((candidate) => {
    if (!(candidate instanceof HTMLElement)) return false;
    if (candidate.disabled || candidate.tabIndex < 0) return false;
    const rect = candidate.getBoundingClientRect();
    const style = window.getComputedStyle(candidate);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  });
  if (!firstField || typeof firstField.focus !== 'function') return;

  const focusOffset = Math.min(160, Math.max(96, Math.round(window.innerHeight * 0.16)));
  const scrollElement = document.scrollingElement || document.documentElement;
  const currentScrollTop = window.scrollY || scrollElement.scrollTop || 0;
  const targetTop = firstField.getBoundingClientRect().top + currentScrollTop - focusOffset;
  try {
    firstField.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
  } catch (_) {
    // fall back to explicit scroll below
  }
  window.setTimeout(() => {
    try {
      firstField.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' });
    } catch (_) {
      // ignore scrollIntoView fallback failures
    }
  }, 180);
  try {
    window.scrollTo({ top: Math.max(targetTop, 0), left: 0, behavior: 'auto' });
  } catch (_) {
    try {
      scrollElement.scrollTop = Math.max(targetTop, 0);
    } catch (error) {
      // ignore scroll fallback failures
    }
  }

  try {
    firstField.focus({ preventScroll: true });
  } catch (_) {
    firstField.focus();
  }

  firstField.classList.add('reservation-field-focus-pulse');
  try {
    document.scrollingElement.scrollLeft = 0;
  } catch (_) {
    // ignore scroll container differences in RTL browsers
  }
  window.setTimeout(() => {
    firstField.classList.remove('reservation-field-focus-pulse');
  }, 1800);
}

function scrollToProjectCreateSection(targetSelector = '#create-project-tab') {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const createSection = mountInlineProjectCreateSection();
  const target = document.querySelector(targetSelector) || createSection;
  if (!target) return;

  const panel = target.closest('details') || document.getElementById('projects-create-panel');
  if (panel && !panel.open) {
    panel.open = true;
  }

  const focus = () => focusFirstProjectCreateField(createSection);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(focus);
  });
  window.setTimeout(focus, 120);
  window.setTimeout(focus, 320);
}

function initProjectInlineCreatePanel() {
  const createSection = mountInlineProjectCreateSection();
  const panel = document.getElementById('projects-create-panel');
  if (panel) {
    panel.open = false;
  }
  if (createSection) {
    createSection.removeAttribute('hidden');
    createSection.removeAttribute('aria-hidden');
  }

  document.querySelectorAll('[data-project-create-scroll-target]').forEach((button) => {
    if (button.dataset.projectCreateListenerAttached === 'true') return;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToProjectCreateSection(button.getAttribute('data-project-create-scroll-target') || '#create-project-tab');
    });
    button.dataset.projectCreateListenerAttached = 'true';
  });

  if (!document.__artRatioProjectCreateCompletedListenerAttached) {
    document.addEventListener('projects:create:completed', () => {
      const createPanel = document.getElementById('projects-create-panel');
      if (createPanel) {
        createPanel.open = false;
      }
      const listTabButton = document.querySelector('.sub-tab-button[data-project-subtab-target="projects-list-tab"]');
      if (listTabButton) {
        void activateProjectSubTab('projects-list-tab', listTabButton);
        persistActiveSubTab('projects-list-tab');
      }
      window.requestAnimationFrame(() => {
        document.getElementById('project-focus-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      });
    });
    document.__artRatioProjectCreateCompletedListenerAttached = true;
  }
}

function renderProjectsPageContent() {
  renderSelections();
  renderProjects();
  updateSummary();
  renderFocusCards();
}

function renderProjectsAndFocusCards() {
  renderProjects();
  renderFocusCards();
}

function refreshProjectsPageSurface() {
  loadAllData();
  populateSelects();
  restoreProjectFormDraft();
  renderProjectsPageContent();
}

async function activateDefaultProjectsListTabIfNeeded() {
  const hasExplicitPreference = Boolean(getStoredActiveSubTab());
  const hasUrlRequested = Boolean(getUrlRequestedSubTab());
  const listButton = document.querySelector('.sub-tab-button[data-project-subtab-target="projects-list-tab"]');
  if (!hasExplicitPreference && !hasUrlRequested && Array.isArray(state.projects) && state.projects.length > 0 && listButton) {
    await activateProjectSubTab('projects-list-tab', listButton);
    persistActiveSubTab('projects-list-tab');
  }
}

export function initProjectsPage() {
  if (projectsPageInitialised) {
    return;
  }

  projectsPageInitialised = true;

  initProjectPreferencesSync();
  capturePendingProjectRequest();
  cacheDom();
  refreshProjectSubmitButton();
  initProjectDatePickers();
  initTabNavigation();
  initProjectSubTabs();
  initProjectInlineCreatePanel();
  setupProjectQuickCustomerCreate();
  setupProjectQuickCrewCreate();
  setupProjectEquipmentControls();
  initTechnicianSelection({
    onDraftChange: () => {
      state.selectedTechnicians = getSelectedCrewAssignments();
      renderSelections();
    }
  });
  initTemplatesTab();
  bindLogout();

  bindFormEvents();
  bindExpenseEvents();
  bindTableEvents({ onViewDetails: openProjectDetails });
  bindFocusCards({ onOpenProject: openProjectDetails });

  refreshProjectClientField();
  syncCreateProjectSelectTranslations();

  initialiseProjectsData();
}

export function initProjectsPageBindings() {
  if (projectsPageBindingsInitialised) {
    return;
  }

  projectsPageBindingsInitialised = true;
  document.addEventListener('language:changed', handleLanguageUpdate);
  document.addEventListener('language:translationsReady', handleLanguageUpdate);
  document.addEventListener('customers:changed', handleCustomersChangedWrapper);
  document.addEventListener('technicians:updated', handleTechniciansUpdatedWrapper);
  document.addEventListener('reservations:changed', () => handleReservationsChanged(openProjectDetails));
  document.addEventListener('equipment:changed', () => {
    loadAllData();
    renderSelections();
  });
  document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
    renderProjectsPageContent();
  });

  // Keep projects list/cards in sync with any state updates from the service
  try {
    document.addEventListener('projects:changed', () => {
      loadAllData();
      renderProjectsPageContent();
    }, { passive: true });
  } catch (_) { /* ignore */ }
}

async function initialiseProjectsData() {
  if (isLocalBypassAuthEnabled()) {
    refreshProjectsPageSurface();
    openPendingProjectDetailIfReady();
    return;
  }

  try {
    await Promise.all([
      ensureReservationsLoaded({ suppressError: true }),
      ensureEquipmentCatalogLoaded(),
      refreshProjectsFromApi(),
    ]);
    // Auto-close projects whose time has ended
    try { await autoCloseExpiredProjects(); } catch (_) {}
  } catch (error) {
    console.error('❌ [projects] Failed to initialise projects data', error);
    const message = error?.message || t('projects.toast.fetchFailed', 'تعذر تحميل بيانات المشاريع، حاول لاحقًا');
    showToast(message, 'error');
  } finally {
    refreshProjectsPageSurface();
    openPendingProjectDetailIfReady();

    // Prefer showing "مشاريعي" (projects list) by default when projects exist
    try {
      await activateDefaultProjectsListTabIfNeeded();
    } catch (e) {
      // non-fatal: keep current tab if any issue occurs
    }
  }
}

function handleLanguageUpdate() {
  populateSelects();
  syncCreateProjectSelectTranslations();
  renderProjectsPageContent();
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
