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
const SKIP_PREF_KEY = '__ART_RATIO_SKIP_PREF_FETCH__';
const LOCAL_STORAGE_KEY = '__ART_RATIO_PREFERENCES__';

function shouldSkipRemotePreferences() {
  try {
    if (typeof window === 'undefined') return false;
    return Boolean(window[SKIP_PREF_KEY]);
  } catch (error) {
    return false;
  }
}

export function clearSkipRemotePreferencesFlag() {
  try {
    if (typeof window !== 'undefined') {
      delete window[SKIP_PREF_KEY];
    }
  } catch (error) {
    // ignore access issues
  }
}

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

function loadPreferencesFromStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return normalizePreferences(parsed);
  } catch (error) {
    console.warn('⚠️ [preferencesService] Failed to read cached preferences', error);
    return null;
  }
}

function savePreferencesToStorage(preferences) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('⚠️ [preferencesService] Failed to persist preferences', error);
  }
}

const storedPreferences = loadPreferencesFromStorage();
if (storedPreferences) {
  cachedPreferences = storedPreferences;
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
  const base = cachedPreferences ? { ...cachedPreferences } : { ...DEFAULT_PREFERENCES };
  const merged = { ...base, ...preferences };
  cachedPreferences = normalizePreferences(merged);
  savePreferencesToStorage(cachedPreferences);
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
  if (shouldSkipRemotePreferences()) {
    const snapshot = getCachedPreferences() || { ...DEFAULT_PREFERENCES };
    return Promise.resolve(snapshot);
  }

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
          return DEFAULT_PREFERENCES;
        }

        console.warn('⚠️ [preferencesService] Failed to load preferences', error);
        setPreferences(DEFAULT_PREFERENCES);
        return DEFAULT_PREFERENCES;
      })
      .finally(() => {
        pendingRequest = null;
      });
  }

  return pendingRequest;
}

function getNormalizedPreferencesSnapshot(source = null) {
  if (!source) {
    const cached = getCachedPreferences();
    if (cached) {
      return normalizePreferences(cached);
    }
    return normalizePreferences(DEFAULT_PREFERENCES);
  }
  return normalizePreferences(source);
}

export async function updatePreferences(preferencePatch = {}) {
  if (shouldSkipRemotePreferences()) {
    setPreferences(preferencePatch);
    return getCachedPreferences() || { ...DEFAULT_PREFERENCES };
  }

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

  const previous = getNormalizedPreferencesSnapshot();
  const mergedCandidate = {
    ...previous,
    ...preferencePatch,
  };
  const normalizedCandidate = normalizePreferences(mergedCandidate);

  const diff = {};
  const remoteDiff = {};
  const fields = ['language', 'theme', 'dashboardTab', 'dashboardSubTab', 'projectsTab', 'projectsSubTab'];
  fields.forEach((key) => {
    if (preferencePatch[key] === undefined) {
      return;
    }
    const nextValue = normalizedCandidate[key];
    const previousValue = previous[key];
    if (nextValue !== previousValue) {
      diff[key] = nextValue;
      if (key === 'language' || key === 'theme') {
        remoteDiff[key] = nextValue;
      }
    }
  });

  const hasLocalChanges = Object.keys(diff).length > 0;
  const hasRemoteChanges = Object.keys(remoteDiff).length > 0;

  if (!hasRemoteChanges && !hasLocalChanges) {
    return getCachedPreferences();
  }

  if (!hasRemoteChanges && hasLocalChanges) {
    setPreferences(normalizedCandidate);
    return getCachedPreferences();
  }

  try {
    const response = await apiRequest('/preferences/', {
      method: 'PATCH',
      body: remoteDiff,
    });

    setPreferences(response?.data ?? DEFAULT_PREFERENCES);
    if (hasLocalChanges) {
      setPreferences({ ...getCachedPreferences(), ...diff });
    }
    return getCachedPreferences();
  } catch (error) {
    if (error instanceof ApiError && error.status === 422) {
      console.warn('⚠️ [preferencesService] Server rejected preference update (no changes).');
      setPreferences(normalizedCandidate);
      return getCachedPreferences();
    }
    throw error;
  }
}
