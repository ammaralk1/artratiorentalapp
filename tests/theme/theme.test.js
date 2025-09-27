import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPreferencesMock } from '../helpers/preferencesMock.js';

let preferencesMockInstance;

const ensurePreferencesMock = () => {
  if (!preferencesMockInstance) {
    preferencesMockInstance = createPreferencesMock();
  }
  return preferencesMockInstance;
};

vi.mock('../../src/scripts/preferencesService.js', () => ensurePreferencesMock().factory());

const {
  setMockPreferences,
  resetMockPreferences,
  getMockPreferences,
  flushAsync
} = ensurePreferencesMock();

const updatePreferencesMockAccessor = () => ensurePreferencesMock().updatePreferencesMock;

const setupDom = () => {
  document.body.innerHTML = `
    <button class="theme-toggle-btn"></button>
    <button class="theme-toggle-btn"></button>
  `;
  document.documentElement.className = 'theme-loading';
  document.body.className = 'theme-loading';
};

const loadThemeModule = async (prefsPatch = null) => {
  vi.resetModules();
  resetMockPreferences();
  if (prefsPatch) {
    setMockPreferences(prefsPatch);
  }
  setupDom();
  const module = await import('../../src/scripts/theme.js');
  await flushAsync();
  return module;
};

describe('theme module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(Intl, 'DateTimeFormat');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    document.body.className = '';
    resetMockPreferences();
    setMockPreferences.mockClear();
    getMockPreferences.mockClear();
    const updateMock = updatePreferencesMockAccessor();
    updateMock?.mockClear?.();
  });

  it('applyTheme toggles classes and persists preference', async () => {
    const module = await loadThemeModule();

    module.applyTheme('dark');
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    await flushAsync();
    const updateMock = updatePreferencesMockAccessor();
    expect(updateMock).toHaveBeenCalledWith({ theme: 'dark' });
    expect(getMockPreferences().theme).toBe('dark');

    module.applyTheme('light');
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    await flushAsync();
    expect(getMockPreferences().theme).toBe('light');
  });

  it('applyStoredTheme honors stored preference and updates buttons', async () => {
    const module = await loadThemeModule({ theme: 'dark' });

    module.applyStoredTheme();
    await flushAsync();

    expect(module.getCurrentTheme()).toBe('dark');
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      expect(btn.getAttribute('aria-pressed')).toBe('true');
      expect(btn.textContent).toMatch(/الوضع العادي|toLight|☀️/);
    });
  });

  it('initThemeToggle binds click handlers once and toggles theme', async () => {
    const module = await loadThemeModule();

    module.initThemeToggle();
    const buttons = document.querySelectorAll('.theme-toggle-btn');

    buttons.forEach((btn) => {
      expect(btn.getAttribute('type')).toBe('button');
      expect(btn.getAttribute('aria-pressed')).toBe('false');
    });

    buttons[0].click();
    await flushAsync();
    expect(module.getCurrentTheme()).toBe('dark');
    buttons.forEach((btn) => {
      expect(btn.getAttribute('aria-pressed')).toBe('true');
    });

    const spy = vi.spyOn(buttons[0], 'addEventListener');
    module.initThemeToggle();
    expect(spy).not.toHaveBeenCalled();
  });

  it('responds to language change by refreshing toggle labels', async () => {
    const module = await loadThemeModule();

    module.applyTheme('dark');
    await flushAsync();
    document.dispatchEvent(new CustomEvent('language:changed'));

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      expect(btn.getAttribute('aria-pressed')).toBe('true');
    });
  });
});
