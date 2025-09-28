import { getPreferences, updatePreferences, subscribePreferences, getCachedPreferences } from './preferencesService.js';

const DEFAULT_LANGUAGE = 'ar';
const RTL_LANGUAGE = 'ar';
const LANGUAGE_LOADING_CLASS = 'language-loading';
const LANGUAGE_READY_CLASS = 'language-ready';

const ATTRIBUTE_SUFFIXES = ['Placeholder', 'Title', 'AriaLabel', 'AriaDescription', 'Value'];

const translations = {
  ar: Object.create(null),
  en: Object.create(null)
};

let currentLanguage = DEFAULT_LANGUAGE;
let initialised = false;
let initialisationPromise = null;

function normalizeLanguage(value) {
  return value === 'en' ? 'en' : 'ar';
}

function ensureLanguagePreference() {
  if (!initialisationPromise) {
    const cached = getCachedPreferences();
    if (cached?.language) {
      const cachedLanguage = normalizeLanguage(cached.language);
      setLanguageInternal(cachedLanguage, { persist: false, dispatch: false });
    }

    initialisationPromise = getPreferences()
      .then((prefs) => {
        const prefLanguage = normalizeLanguage(prefs?.language ?? DEFAULT_LANGUAGE);
        setLanguageInternal(prefLanguage, { persist: false });
        initialised = true;
        return prefLanguage;
      })
      .catch((error) => {
        console.warn('⚠️ تعذر تحميل تفضيل اللغة من الخادم', error);
        setLanguageInternal(DEFAULT_LANGUAGE, { persist: false });
        initialised = true;
        return DEFAULT_LANGUAGE;
      });
  }
  return initialisationPromise;
}

function cacheOriginalContent(element) {
  if (element.dataset.i18nCached === 'true') return;

  const isHtml = element.dataset.i18nHtml === 'true';
  if (isHtml) {
    if (element.dataset.arHtml === undefined) {
      element.dataset.arHtml = element.innerHTML;
    }
  } else if (element.dataset.ar === undefined) {
    element.dataset.ar = element.textContent;
  }

  ATTRIBUTE_SUFFIXES.forEach((suffix) => {
    const attrName = suffix.charAt(0).toLowerCase() + suffix.slice(1);
    const attrValue = element.getAttribute(attrName);
    if (attrValue != null && element.dataset[`ar${suffix}`] === undefined) {
      element.dataset[`ar${suffix}`] = attrValue;
    }
  });

  element.dataset.i18nCached = 'true';
}

function mergeTranslations(language, entries) {
  if (!entries) return;
  const store = translations[language] ?? (translations[language] = Object.create(null));
  Object.entries(entries).forEach(([key, value]) => {
    if (typeof key !== 'string') return;
    store[key] = value;
  });
}

function getDictionaryValue(language, key) {
  if (!key) return undefined;
  const store = translations[language];
  return store ? store[key] : undefined;
}

function applyElementTranslation(element, language) {
  cacheOriginalContent(element);

  const isHtml = element.dataset.i18nHtml === 'true';
  const key = element.dataset.i18nKey;
  const dictionaryValue = getDictionaryValue(language, key);

  if (dictionaryValue !== undefined) {
    if (isHtml) {
      element.innerHTML = dictionaryValue;
    } else {
      element.textContent = dictionaryValue;
    }
  } else if (language === 'en') {
    if (isHtml) {
      if (element.dataset.enHtml !== undefined) {
        element.innerHTML = element.dataset.enHtml;
      }
    } else if (element.dataset.en !== undefined) {
      element.textContent = element.dataset.en;
    }
  } else {
    if (isHtml) {
      element.innerHTML = element.dataset.arHtml ?? element.innerHTML;
    } else {
      element.textContent = element.dataset.ar ?? element.textContent;
    }
  }

  ATTRIBUTE_SUFFIXES.forEach((suffix) => {
    const attrName = suffix.charAt(0).toLowerCase() + suffix.slice(1);
    const attrKey = element.dataset[`i18n${suffix}Key`];
    const dictValue = getDictionaryValue(language, attrKey);
    if (dictValue !== undefined) {
      element.setAttribute(attrName, dictValue);
      return;
    }

    const datasetKey = language === 'en' ? `en${suffix}` : `ar${suffix}`;
    const value = element.dataset[datasetKey];
    if (value !== undefined) {
      element.setAttribute(attrName, value);
    }
  });
}

function applyTranslations(language) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => applyElementTranslation(el, language));
}

function updateDocumentDirection(language) {
  const htmlEl = document.documentElement;
  const bodyEl = document.body;
  const dir = language === RTL_LANGUAGE ? 'rtl' : 'ltr';
  htmlEl.setAttribute('lang', language);
  htmlEl.setAttribute('dir', dir);
  if (bodyEl) {
    bodyEl.setAttribute('dir', dir);
    bodyEl.dataset.lang = language;
  }
}

function markLanguageReady() {
  const htmlEl = document.documentElement;
  if (!htmlEl) return;
  if (htmlEl.classList.contains(LANGUAGE_READY_CLASS)) {
    return;
  }
  htmlEl.classList.remove(LANGUAGE_LOADING_CLASS);
  htmlEl.classList.add(LANGUAGE_READY_CLASS);
}

function updateLanguageButtons(language) {
  document.querySelectorAll('.language-toggle-btn').forEach((btn) => {
    const labelAr = btn.dataset.labelAr || '🇸🇦 العربية';
    const labelEn = btn.dataset.labelEn || '🇬🇧 English';
    btn.textContent = language === 'en' ? labelAr : labelEn;
    btn.setAttribute('aria-pressed', language === 'en' ? 'true' : 'false');
  });
}

function setLanguageInternal(language, { persist = false, dispatch = true } = {}) {
  const normalized = normalizeLanguage(language);
  if (currentLanguage === normalized && initialised && !persist) {
    return;
  }
  currentLanguage = normalized;
  initialised = true;
  updateDocumentDirection(normalized);
  applyTranslations(normalized);
  updateLanguageButtons(normalized);
  markLanguageReady();
  if (dispatch) {
    document.dispatchEvent(new CustomEvent('language:changed', { detail: { language: normalized } }));
  }
  if (persist) {
    updatePreferences({ language: normalized }).catch((error) => {
      console.warn('⚠️ تعذر حفظ تفضيل اللغة في الخادم', error);
    });
  }
}

function toggleLanguage() {
  const next = currentLanguage === 'ar' ? 'en' : 'ar';
  setLanguage(next);
}

function bindLanguageToggleButtons() {
  const toggleButtons = document.querySelectorAll('.language-toggle-btn');
  toggleButtons.forEach((button) => {
    if (button.dataset.listenerAttached) return;
    button.addEventListener('click', () => {
      toggleLanguage();
    });
    button.dataset.listenerAttached = 'true';
  });
  updateLanguageButtons(currentLanguage);
}

export function registerTranslations(entries = {}) {
  mergeTranslations('ar', entries.ar);
  mergeTranslations('en', entries.en);
  const activeLanguage = getCurrentLanguage();
  applyTranslations(activeLanguage);
  document.dispatchEvent(new CustomEvent('language:translationsReady', { detail: { language: activeLanguage } }));
}

export function t(key, fallback = '') {
  if (!key) return fallback;
  const activeLanguage = currentLanguage || DEFAULT_LANGUAGE;
  const store = translations[activeLanguage];
  if (store && store[key] !== undefined) {
    return store[key];
  }

  const alternateLanguage = activeLanguage === 'en' ? 'ar' : 'en';
  const alternateStore = translations[alternateLanguage];
  if (alternateStore && alternateStore[key] !== undefined) {
    return alternateStore[key];
  }

  return fallback;
}

export function setLanguage(language) {
  const normalized = normalizeLanguage(language);
  setLanguageInternal(normalized, { persist: true });
}

export function initLanguageToggle() {
  ensureLanguagePreference()
    .catch(() => DEFAULT_LANGUAGE)
    .finally(() => {
      bindLanguageToggleButtons();
    });
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function isArabic() {
  return currentLanguage === 'ar';
}

function bootstrapLanguage() {
  ensureLanguagePreference().catch(() => DEFAULT_LANGUAGE);
  bindLanguageToggleButtons();
}

subscribePreferences((prefs) => {
  if (!prefs) return;
  if (prefs.language && normalizeLanguage(prefs.language) !== currentLanguage) {
    setLanguageInternal(prefs.language, { persist: false });
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapLanguage, { once: true });
} else {
  bootstrapLanguage();
}
