import { vi } from 'vitest';

const BASE_DEFAULTS = Object.freeze({
  language: 'ar',
  theme: 'light',
  dashboardTab: null,
  dashboardSubTab: null,
  projectsTab: null,
  projectsSubTab: null
});

export function createPreferencesMock() {
  const preferenceListeners = new Set();
  let preferencesState = { ...BASE_DEFAULTS };

  const snapshot = () => ({ ...preferencesState });

  const setMockPreferences = vi.fn((patch = {}) => {
    preferencesState = { ...preferencesState, ...patch };
  });

  const resetMockPreferences = vi.fn(() => {
    preferencesState = { ...BASE_DEFAULTS };
    preferenceListeners.clear();
  });

  const getMockPreferences = vi.fn(() => snapshot());

  const flushAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

  const notifyListeners = () => {
    const current = snapshot();
    preferenceListeners.forEach((listener) => {
      try {
        listener(current);
      } catch (error) {
        console.error('⚠️ [preferencesMock] listener failed', error);
      }
    });
  };

  const mocks = {
    getPreferences: null,
    getCachedPreferences: null,
    updatePreferences: null,
    subscribePreferences: null
  };

  const factory = () => {
    mocks.getPreferences = vi.fn(() => Promise.resolve(snapshot()));
    mocks.getCachedPreferences = vi.fn(() => snapshot());
    mocks.updatePreferences = vi.fn(async (patch = {}) => {
      preferencesState = { ...preferencesState, ...patch };
      notifyListeners();
      return snapshot();
    });
    mocks.subscribePreferences = vi.fn((listener) => {
      if (typeof listener !== 'function') return () => {};
      preferenceListeners.add(listener);
      try {
        listener(snapshot());
      } catch (error) {
        console.error('⚠️ [preferencesMock] subscribe listener failed', error);
      }
      return () => {
        preferenceListeners.delete(listener);
      };
    });

    return {
      getPreferences: mocks.getPreferences,
      getCachedPreferences: mocks.getCachedPreferences,
      updatePreferences: mocks.updatePreferences,
      subscribePreferences: mocks.subscribePreferences,
      __setMockPreferences: setMockPreferences,
      __resetMockPreferences: resetMockPreferences,
      __getMockPreferences: getMockPreferences
    };
  };

  return {
    preferenceListeners,
    setMockPreferences,
    resetMockPreferences,
    getMockPreferences,
    flushAsync,
    notifyListeners,
    factory,
    get mocks() {
      return { ...mocks };
    },
    get updatePreferencesMock() {
      return mocks.updatePreferences;
    },
    get getPreferencesMock() {
      return mocks.getPreferences;
    },
    get getCachedPreferencesMock() {
      return mocks.getCachedPreferences;
    },
    get subscribePreferencesMock() {
      return mocks.subscribePreferences;
    }
  };
}
