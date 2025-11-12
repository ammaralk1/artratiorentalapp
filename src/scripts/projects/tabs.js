import { dom, state } from './state.js';
import {
  PROJECT_MAIN_TAB_PREFERENCE_KEY,
  PROJECT_SUB_TAB_PREFERENCE_KEY,
  PROJECT_SUB_TAB_ALIASES
} from './constants.js';
import {
  getCachedPreferences,
  getPreferences,
  subscribePreferences,
  updatePreferences
} from '../preferencesService.js';
import { renderProjects, renderFocusCards, updateSummary } from './view.js';
import { refreshProjectsFromApi } from '../projectsService.js';

let unsubscribeProjectPreferences = null;

export function persistActiveMainTab(tabId) {
  if (!tabId) return;
  if (getStoredActiveMainTab() === tabId) return;
  updatePreferences({ [PROJECT_MAIN_TAB_PREFERENCE_KEY]: tabId }).catch((error) => {
    console.warn('⚠️ [projects] Failed to persist projects main tab preference', error);
  });
}

export function getStoredActiveMainTab() {
  const prefs = getCachedPreferences();
  return prefs?.[PROJECT_MAIN_TAB_PREFERENCE_KEY] || '';
}

export function persistActiveSubTab(tabId) {
  if (!tabId) return;
  if (getStoredActiveSubTab() === tabId) return;
  updatePreferences({ [PROJECT_SUB_TAB_PREFERENCE_KEY]: tabId }).catch((error) => {
    console.warn('⚠️ [projects] Failed to persist projects sub-tab preference', error);
  });
}

export function getStoredActiveSubTab() {
  const prefs = getCachedPreferences();
  return prefs?.[PROJECT_SUB_TAB_PREFERENCE_KEY] || '';
}

export function resolveSubTabFromValue(value) {
  if (!value) return '';
  const normalized = value.trim();
  if (!normalized) return '';
  if (Object.values(PROJECT_SUB_TAB_ALIASES).includes(normalized)) {
    return normalized;
  }
  return PROJECT_SUB_TAB_ALIASES[normalized] || '';
}

export function getUrlRequestedSubTab() {
  if (typeof window === 'undefined') return '';
  try {
    const params = new URLSearchParams(window.location.search || '');
    const requested = params.get('subTab');
    if (requested) {
      const resolved = resolveSubTabFromValue(requested);
      if (resolved) return resolved;
    }
  } catch (error) {
    /* ignore */
  }
  return '';
}

export function activateTab(targetId, triggerButton) {
  if (!targetId || !dom.tabPanes || !dom.tabButtons) return;

  dom.tabButtons.forEach((btn) => {
    const isActive = btn === triggerButton;
    btn.classList.toggle('active', isActive);
    if (btn.classList.contains('tab-button')) {
      btn.classList.toggle('tab-active', isActive);
    }
  });

  dom.tabPanes.forEach((pane) => {
    if (pane.dataset.tabPane === targetId) {
      pane.classList.remove('d-none');
    } else {
      pane.classList.add('d-none');
    }
  });

  if (triggerButton) {
    persistActiveMainTab(targetId);
  }
}

export function initTabNavigation() {
  if (!dom.tabButtons || !dom.tabButtons.length) return;

  dom.tabButtons.forEach((button) => {
    if (button.dataset.tabListenerAttached === 'true') return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = button.dataset.tabTarget;
      if (!targetId) return;

      activateTab(targetId, button);

      if (targetId === 'projects-section') {
        state.filters.search = '';
        if (dom.search) {
          dom.search.value = '';
        }
        renderProjects();
        renderFocusCards();
        updateSummary();
      }
    });

    button.dataset.tabListenerAttached = 'true';
  });

  const preferredMainTab = getStoredActiveMainTab();
  const requestedTab = preferredMainTab && dom.tabButtons.find((btn) => btn.dataset.tabTarget === preferredMainTab);
  if (requestedTab) {
    requestedTab.click();
  }
}

export async function activateProjectSubTab(targetId, triggerButton) {
  if (!targetId || !dom.projectSubTabButtons || !dom.projectSubTabPanes) return;

  dom.projectSubTabButtons.forEach((btn) => {
    const isActive = btn === triggerButton;
    btn.classList.toggle('active', isActive);
    if (btn.classList.contains('tab')) {
      btn.classList.toggle('tab-active', isActive);
    }
  });

  dom.projectSubTabPanes.forEach((pane) => {
    if (pane.dataset.projectSubtab === targetId) {
      pane.classList.remove('d-none');
    } else {
      pane.classList.add('d-none');
    }
  });

  // When switching to "مشاريعي" (projects list), ensure content renders fresh
  if (targetId === 'projects-list-tab') {
    try {
      if (!Array.isArray(state.projects) || state.projects.length === 0) {
        await refreshProjectsFromApi();
      }
      renderProjects();
      renderFocusCards();
      updateSummary();
    } catch (error) {
      console.warn('[projects] Failed to render list after sub-tab switch', error);
    }
  }
}

export function initProjectSubTabs() {
  if (!dom.projectSubTabButtons || !dom.projectSubTabButtons.length) return;

  dom.projectSubTabButtons.forEach((button) => {
    if (button.dataset.tabListenerAttached === 'true') return;

    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const targetId = button.dataset.projectSubtabTarget;
      if (!targetId) return;

      await activateProjectSubTab(targetId, button);
      persistActiveSubTab(targetId);
    });

    button.dataset.tabListenerAttached = 'true';
  });

  restoreProjectSubTab();
}

export function restoreProjectSubTab() {
  const urlRequested = getUrlRequestedSubTab();
  const preferredSub = urlRequested || getStoredActiveSubTab();
  if (!preferredSub) return;

  const fallbackButton = dom.projectSubTabButtons?.[0];
  const targetButton = dom.projectSubTabButtons?.find((btn) => btn.dataset.projectSubtabTarget === preferredSub) || fallbackButton;
  const targetId = targetButton?.dataset.projectSubtabTarget;
  if (targetId) {
    if (preferredSub !== getStoredActiveSubTab()) {
      persistActiveSubTab(targetId);
    }
    activateProjectSubTab(targetId, targetButton);
  }
}

export function isProjectsSectionActive() {
  if (!dom.tabButtons) return false;
  const activeButton = dom.tabButtons.find((btn) => btn.classList.contains('active'));
  return activeButton?.dataset.tabTarget === 'projects-section';
}

export function applyStoredProjectPreferences(prefs = {}) {
  if (!prefs) return;

  if (dom.tabButtons && dom.tabButtons.length) {
    const activeButton = dom.tabButtons.find((btn) => btn.classList.contains('active'));
    const activeId = activeButton?.dataset.tabTarget || '';
    const preferredId = prefs[PROJECT_MAIN_TAB_PREFERENCE_KEY];
    if (preferredId && preferredId !== activeId) {
      const button = dom.tabButtons.find((btn) => btn.dataset.tabTarget === preferredId);
      if (button) {
        activateTab(preferredId, button);
      }
    }
  }

  if (dom.projectSubTabButtons && dom.projectSubTabButtons.length && isProjectsSectionActive()) {
    const activeSubButton = dom.projectSubTabButtons.find((btn) => btn.classList.contains('active'));
    const activeSubId = activeSubButton?.dataset.projectSubtabTarget || '';
    const preferredSubId = prefs[PROJECT_SUB_TAB_PREFERENCE_KEY];
    if (preferredSubId && preferredSubId !== activeSubId) {
      const button = dom.projectSubTabButtons.find((btn) => btn.dataset.projectSubtabTarget === preferredSubId);
      if (button) {
        activateProjectSubTab(preferredSubId, button);
      }
    }
  }
}

export function initProjectPreferencesSync() {
  if (!unsubscribeProjectPreferences) {
    unsubscribeProjectPreferences = subscribePreferences((prefs) => {
      applyStoredProjectPreferences(prefs);
    });
  }
  getPreferences()
    .then((prefs) => {
      applyStoredProjectPreferences(prefs);
    })
    .catch((error) => {
      console.warn('⚠️ [projects] Failed to synchronise project preferences', error);
    });
}

export function tearDownProjectPreferencesSync() {
  if (typeof unsubscribeProjectPreferences === 'function') {
    unsubscribeProjectPreferences();
    unsubscribeProjectPreferences = null;
  }
}
