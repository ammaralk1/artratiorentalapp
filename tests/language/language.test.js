import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

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
  localStorage.clear();
  setupDom();
  setReadyState('complete');
  return await import('../../src/scripts/language.js');
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
  });

  it('registerTranslations merges dictionaries and applies active language', async () => {
    const module = await loadLanguageModule();
    const changedSpy = vi.fn();
    document.addEventListener('language:changed', changedSpy);

    module.registerTranslations({
      ar: { welcome: 'مرحبا' },
      en: { welcome: 'Hello' }
    });

    expect(document.getElementById('welcome').textContent).toBe('مرحبا');
    expect(changedSpy).toHaveBeenCalled();

    module.setLanguage('en');
    expect(document.getElementById('welcome').textContent).toBe('Hello');
  });

  it('t returns translated values with fallback to alternate language', async () => {
    const module = await loadLanguageModule();
    module.registerTranslations({
      ar: { welcome: 'مرحبا', onlyAr: 'مرحبا فقط' },
      en: { welcome: 'Hello' }
    });

    module.setLanguage('en');
    expect(module.t('welcome')).toBe('Hello');
    expect(module.t('onlyAr', 'default')).toBe('مرحبا فقط');
    expect(module.t('missing', 'default')).toBe('default');
  });

  it('setLanguage updates DOM direction, button label, and persists preference', async () => {
    const module = await loadLanguageModule();
    const changedSpy = vi.fn();
    document.addEventListener('language:changed', changedSpy);

    module.setLanguage('en');

    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    expect(document.body.getAttribute('dir')).toBe('ltr');
    expect(document.body.dataset.lang).toBe('en');
    expect(localStorage.getItem('app-language')).toBe('en');

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
    const initialLanguage = module.getCurrentLanguage();
    expect(initialLanguage).toBe('ar');
    expect(module.isArabic()).toBe(true);

    button.click();
    expect(module.getCurrentLanguage()).toBe('en');
    expect(module.isArabic()).toBe(false);

    const addListenerSpy = vi.spyOn(button, 'addEventListener');
    module.initLanguageToggle();
    expect(addListenerSpy).not.toHaveBeenCalled();
  });
});
