import { t } from './language.js';
import { getPreferences, updatePreferences, subscribePreferences, getCachedPreferences } from './preferencesService.js';

const DARK_CLASS = 'dark-mode';
const boundButtons = new WeakSet();
const THEME_LOADING_CLASS = 'theme-loading';
const THEME_SESSION_KEY = 'art-ratio:session-theme';
let themeInitialized = false;

function getToggleElements() {
  return Array.from(document.querySelectorAll('[data-theme-toggle], .theme-toggle-btn'));
}

function normaliseTheme(theme) {
  return theme === 'dark' ? 'dark' : 'light';
}

function storeSessionTheme(theme) {
  try {
    window.sessionStorage?.setItem(THEME_SESSION_KEY, normaliseTheme(theme));
  } catch (error) {
    // ignore storage issues (private mode, disabled storage, etc.)
  }
}

function readSessionTheme() {
  try {
    const stored = window.sessionStorage?.getItem(THEME_SESSION_KEY);
    return stored === 'dark' ? 'dark' : stored === 'light' ? 'light' : null;
  } catch (error) {
    return null;
  }
}

function markThemeReady() {
  document.documentElement.classList.remove(THEME_LOADING_CLASS);
  const body = document.body;
  if (body) body.classList.remove(THEME_LOADING_CLASS);
}

export function applyTheme(theme) {
  applyThemeInternal(theme, { persist: true });
}

function applyThemeInternal(theme, { persist = true } = {}) {
  const normalizedTheme = normaliseTheme(theme);
  const root = document.documentElement;
  const body = document.body;
  if (normalizedTheme === 'dark') {
    root.classList.add(DARK_CLASS, 'dark');
    if (body) body.classList.add(DARK_CLASS, 'dark');
  } else {
    root.classList.remove(DARK_CLASS, 'dark');
    if (body) body.classList.remove(DARK_CLASS, 'dark');
  }
  const dataThemeValue = normalizedTheme === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-theme', dataThemeValue);
  if (body) {
    body.setAttribute('data-theme', dataThemeValue);
  }
  storeSessionTheme(normalizedTheme);
  updateAllToggleButtons(normalizedTheme);

  try {
    document.dispatchEvent(new CustomEvent('theme:changed', {
      detail: { theme: normalizedTheme }
    }));
  } catch (error) {
    console.warn('⚠️ [theme.js] Failed to dispatch theme change event', error);
  }

  if (persist) {
    updatePreferences({ theme: normalizedTheme }).catch((error) => {
      console.warn('⚠️ تعذر حفظ تفضيل السمة في الخادم', error);
    });
  }
}

export function getCurrentTheme() {
  const body = document.body;
  if (body && body.classList.contains(DARK_CLASS)) return 'dark';
  return document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
}

function toggleTheme() {
  const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  applyThemeInternal(newTheme, { persist: true });
}

function updateToggleElement(element, theme) {
  if (!element) return;
  const isDark = theme === 'dark';
  const labelLight = t('theme.toggle.toLight', '☀️ الوضع العادي');
  const labelDark = t('theme.toggle.toDark', '🌙 الوضع الليلي');
  const ariaLight = t('theme.toggle.ariaLight', 'الوضع العادي مفعل');
  const ariaDark = t('theme.toggle.ariaDark', 'الوضع الليلي مفعل');
  const titleLight = t('theme.toggle.titleLight', 'التبديل إلى الوضع العادي');
  const titleDark = t('theme.toggle.titleDark', 'التبديل إلى الوضع الليلي');

  if (element.matches('[data-theme-toggle]')) {
    const input = element.matches('input') ? element : element.querySelector('input[type="checkbox"]');
    const currentLabel = isDark ? labelLight : labelDark;
    const currentAria = isDark ? ariaLight : ariaDark;
    const currentTitle = isDark ? titleLight : titleDark;
    if (input) {
      input.checked = isDark;
      input.setAttribute('aria-label', currentLabel);
      input.setAttribute('aria-checked', String(isDark));
    }
    element.setAttribute('title', currentTitle);
    element.setAttribute('aria-label', currentAria);
    element.setAttribute('data-theme-state', isDark ? 'dark' : 'light');
    const srOnlyLabel = element.querySelector('[data-theme-label]');
    if (srOnlyLabel) {
      srOnlyLabel.textContent = currentLabel;
    }
  } else {
    element.textContent = isDark ? labelLight : labelDark;
    element.setAttribute('aria-pressed', String(isDark));
    element.setAttribute('title', isDark ? titleLight : titleDark);
    element.setAttribute('aria-label', isDark ? ariaLight : ariaDark);
  }
}

function updateAllToggleButtons(theme) {
  getToggleElements().forEach((element) => updateToggleElement(element, theme));
  markThemeReady();
}

export function initThemeToggle() {
  const toggles = getToggleElements();
  updateAllToggleButtons(getCurrentTheme());

  toggles.forEach((toggle) => {
    if (!toggle || boundButtons.has(toggle)) return;

    if (toggle.matches('[data-theme-toggle]')) {
      const input = toggle.matches('input') ? toggle : toggle.querySelector('input[type="checkbox"]');
      const handler = () => {
        toggleTheme();
      };
      if (input && !boundButtons.has(input)) {
        input.addEventListener('change', handler);
        boundButtons.add(input);
      } else if (!input) {
        toggle.addEventListener('click', (event) => {
          event.preventDefault();
          toggleTheme();
        });
      }
    } else {
      if (!toggle.getAttribute('type')) {
        toggle.setAttribute('type', 'button');
      }
      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        toggleTheme();
      });
    }

    boundButtons.add(toggle);
  });
}

export function applyStoredTheme({ skipRemote = false } = {}) {
  const cached = getCachedPreferences();
  const cachedTheme = cached?.theme === 'dark'
    ? 'dark'
    : cached?.theme === 'light'
      ? 'light'
      : null;
  const sessionTheme = cachedTheme || readSessionTheme();
  const initialTheme = sessionTheme || getSystemPreferredTheme();

  applyThemeInternal(initialTheme, { persist: false });
  loadThemePreference({ skipRemote });
}

function getSystemPreferredTheme() {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    // ignore
  }
  return 'light';
}

function loadThemePreference({ skipRemote = false } = {}) {
  if (themeInitialized) {
    return;
  }
  themeInitialized = true;

  if (skipRemote) {
    return;
  }

  getPreferences()
    .then((prefs) => {
      const prefTheme = prefs?.theme === 'dark' ? 'dark' : prefs?.theme === 'light' ? 'light' : null;
      if (prefTheme) {
        applyThemeInternal(prefTheme, { persist: false });
      }
    })
    .catch((error) => {
      console.warn('⚠️ تعذر تحميل تفضيل السمة من الخادم', error);
    });
}

document.addEventListener('language:changed', () => {
  updateAllToggleButtons(getCurrentTheme());
  initThemeToggle();
});

subscribePreferences((prefs) => {
  const prefTheme = prefs?.theme === 'dark' ? 'dark' : prefs?.theme === 'light' ? 'light' : null;
  if (prefTheme && prefTheme !== getCurrentTheme()) {
    applyThemeInternal(prefTheme, { persist: false });
  }
});
