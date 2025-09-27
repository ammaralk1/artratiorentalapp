import { apiRequest, ApiError } from './apiClient.js';

const DEFAULT_PREFERENCES = Object.freeze({
  language: 'ar',
  theme: 'light',
  dashboardTab: null,
  dashboardSubTab: null,
  projectsTab: null,
  projectsSubTab: null,
});

let cachedPreferences = null;
let pendingRequest = null;
const listeners = new Set();

function normalizePreferences(raw = {}) {
  const language = raw.language === 'en' ? 'en' : 'ar';
  const theme = raw.theme === 'dark' ? 'dark' : 'light';
  const dashboardTab = typeof raw.dashboardTab === 'string' ? sanitizeTab(raw.dashboardTab) : null;
  const dashboardSubTab = typeof raw.dashboardSubTab === 'string' ? sanitizeTab(raw.dashboardSubTab) : null;
  const projectsTab = typeof raw.projectsTab === 'string' ? sanitizeTab(raw.projectsTab) : null;
  const projectsSubTab = typeof raw.projectsSubTab === 'string' ? sanitizeTab(raw.projectsSubTab) : null;
  return {
    language,
    theme,
    dashboardTab,
    dashboardSubTab,
    projectsTab,
    projectsSubTab,
  };
}

function sanitizeTab(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return null;
  return /^[a-z0-9\-]+$/i.test(trimmed) ? trimmed : null;
}

function notifyListeners() {
  const snapshot = getCachedPreferences();
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      console.error('⚠️ [preferencesService] listener failed', error);
    }
  });
}

function setPreferences(preferences) {
  cachedPreferences = normalizePreferences(preferences);
  notifyListeners();
}

export function getCachedPreferences() {
  return cachedPreferences ? { ...cachedPreferences } : null;
}

export function subscribePreferences(listener) {
  if (typeof listener !== 'function') return () => {};
  listeners.add(listener);
  if (cachedPreferences) {
    try {
      listener(getCachedPreferences());
    } catch (error) {
      console.error('⚠️ [preferencesService] listener failed', error);
    }
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getPreferences({ refresh = false } = {}) {
  if (!refresh && cachedPreferences) {
    return Promise.resolve(getCachedPreferences());
  }

  if (!pendingRequest) {
    pendingRequest = apiRequest('/preferences/')
      .then((response) => {
        const data = response?.data ?? DEFAULT_PREFERENCES;
        setPreferences(data);
        return getCachedPreferences();
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 401) {
          cachedPreferences = null;
        } else {
          console.warn('⚠️ [preferencesService] Failed to load preferences', error);
          setPreferences(DEFAULT_PREFERENCES);
        }
        throw error;
      })
      .finally(() => {
        pendingRequest = null;
      });
  }

  return pendingRequest;
}

export async function updatePreferences(preferencePatch = {}) {
  const body = {};

  if (preferencePatch.language !== undefined) {
    body.language = preferencePatch.language;
  }

  if (preferencePatch.theme !== undefined) {
    body.theme = preferencePatch.theme;
  }

  if (preferencePatch.dashboardTab !== undefined) {
    body.dashboardTab = preferencePatch.dashboardTab;
  }

  if (preferencePatch.dashboardSubTab !== undefined) {
    body.dashboardSubTab = preferencePatch.dashboardSubTab;
  }

  if (preferencePatch.projectsTab !== undefined) {
    body.projectsTab = preferencePatch.projectsTab;
  }

  if (preferencePatch.projectsSubTab !== undefined) {
    body.projectsSubTab = preferencePatch.projectsSubTab;
  }

  if (Object.keys(body).length === 0) {
    return getCachedPreferences();
  }

  const response = await apiRequest('/preferences/', {
    method: 'PATCH',
    body,
  });

  setPreferences(response?.data ?? DEFAULT_PREFERENCES);
  return getCachedPreferences();
}
