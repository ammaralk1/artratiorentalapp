import { apiRequest, ApiError } from './apiClient.js';

const DEFAULT_PREFERENCES = Object.freeze({
  language: 'ar',
  theme: 'light',
});

let cachedPreferences = null;
let pendingRequest = null;
const listeners = new Set();

function normalizePreferences(raw = {}) {
  const language = raw.language === 'en' ? 'en' : 'ar';
  const theme = raw.theme === 'dark' ? 'dark' : 'light';
  return {
    language,
    theme,
  };
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
