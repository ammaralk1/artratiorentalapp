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
  resetMockPreferences,
  getMockPreferences,
  flushAsync
} = ensurePreferencesMock();

const updatePreferencesMockAccessor = () => ensurePreferencesMock().updatePreferencesMock;

const setReadyState = (value) => {
  Object.defineProperty(document, 'readyState', {
    configurable: true,
    value
  });
};

const setupDom = () => {
  document.body.innerHTML = `
    <button class="language-toggle-btn"
      data-label-ar="🇸🇦 العربية"
      data-label-en="🇬🇧 English"></button>
    <div id="welcome" data-i18n data-i18n-key="welcome">placeholder</div>
  `;
  document.documentElement.removeAttribute('lang');
  document.documentElement.removeAttribute('dir');
  document.body.removeAttribute('dir');
  delete document.body.dataset.lang;
};

const loadLanguageModule = async () => {
  vi.resetModules();
  resetMockPreferences();
  setupDom();
  setReadyState('complete');
  const module = await import('../../src/scripts/language.js');
  await flushAsync();
  return module;
};

describe('language module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('lang');
    document.documentElement.removeAttribute('dir');
    document.body.removeAttribute('dir');
    delete document.body.dataset.lang;
    resetMockPreferences();
    getMockPreferences.mockClear();
    const updateMock = updatePreferencesMockAccessor();
    updateMock?.mockClear?.();
  });

  it('registerTranslations merges dictionaries and applies active language', async () => {
    const module = await loadLanguageModule();
    const changedSpy = vi.fn();
    document.addEventListener('language:changed', changedSpy);

    module.registerTranslations({
      ar: { welcome: 'مرحبا' },
      en: { welcome: 'Hello' }
    });

    await flushAsync();

    expect(document.getElementById('welcome').textContent).toBe('مرحبا');
    expect(changedSpy).not.toHaveBeenCalled();

    module.setLanguage('en');
    await flushAsync();
    expect(changedSpy).toHaveBeenCalled();
    expect(document.getElementById('welcome').textContent).toBe('Hello');
  });

  it('t returns translated values with fallback to alternate language', async () => {
    const module = await loadLanguageModule();
    module.registerTranslations({
      ar: { welcome: 'مرحبا', onlyAr: 'مرحبا فقط' },
      en: { welcome: 'Hello' }
    });

    module.setLanguage('en');
    await flushAsync();
    expect(module.t('welcome')).toBe('Hello');
    expect(module.t('onlyAr', 'default')).toBe('مرحبا فقط');
    expect(module.t('missing', 'default')).toBe('default');
  });

  it('setLanguage updates DOM direction, button label, and persists preference', async () => {
    const module = await loadLanguageModule();
    const changedSpy = vi.fn();
    document.addEventListener('language:changed', changedSpy);

    module.setLanguage('en');
    await flushAsync();

    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    expect(document.body.getAttribute('dir')).toBe('ltr');
    expect(document.body.dataset.lang).toBe('en');
    const updateMock = updatePreferencesMockAccessor();
    expect(updateMock).toHaveBeenCalledWith({ language: 'en' });
    expect(getMockPreferences().language).toBe('en');

    const button = document.querySelector('.language-toggle-btn');
    expect(button.textContent).toBe('🇸🇦 العربية');
    expect(button.getAttribute('aria-pressed')).toBe('true');

    const lastCall = changedSpy.mock.calls.at(-1);
    expect(lastCall?.[0]?.detail?.language).toBe('en');
  });

  it('initLanguageToggle attaches single listener and toggles language on click', async () => {
    const module = await loadLanguageModule();
    const button = document.querySelector('.language-toggle-btn');

    expect(button.dataset.listenerAttached).toBe('true');
    expect(module.getCurrentLanguage()).toBe('ar');
    expect(module.isArabic()).toBe(true);

    button.click();
    await flushAsync();
    expect(module.getCurrentLanguage()).toBe('en');
    expect(module.isArabic()).toBe(false);

    const addListenerSpy = vi.spyOn(button, 'addEventListener');
    module.initLanguageToggle();
    expect(addListenerSpy).not.toHaveBeenCalled();
  });
});
