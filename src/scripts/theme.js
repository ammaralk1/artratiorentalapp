import { t } from './language.js';
import { getPreferences, updatePreferences, subscribePreferences, getCachedPreferences } from './preferencesService.js';

const DARK_CLASS = 'dark-mode';
const boundButtons = new WeakSet();
const THEME_LOADING_CLASS = 'theme-loading';
let themeInitialized = false;

function markThemeReady() {
  document.documentElement.classList.remove(THEME_LOADING_CLASS);
  const body = document.body;
  if (body) body.classList.remove(THEME_LOADING_CLASS);
}

export function applyTheme(theme) {
  applyThemeInternal(theme, { persist: true });
}

function applyThemeInternal(theme, { persist = true } = {}) {
  const root = document.documentElement;
  const body = document.body;
  if (theme === 'dark') {
    root.classList.add(DARK_CLASS);
    if (body) body.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
    if (body) body.classList.remove(DARK_CLASS);
  }
  updateAllToggleButtons(theme);

  if (persist) {
    updatePreferences({ theme }).catch((error) => {
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

function updateToggleButton(button, theme) {
  if (!button) return;
  const isDark = theme === 'dark';
  const label = isDark
    ? t('theme.toggle.toLight', '☀️ الوضع العادي')
    : t('theme.toggle.toDark', '🌙 الوضع الليلي');
  button.textContent = label;
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('title', isDark
    ? t('theme.toggle.titleLight', 'التبديل إلى الوضع العادي')
    : t('theme.toggle.titleDark', 'التبديل إلى الوضع الليلي'));
  button.setAttribute('aria-label', isDark
    ? t('theme.toggle.ariaLight', 'الوضع العادي مفعل')
    : t('theme.toggle.ariaDark', 'الوضع الليلي مفعل'));
}

function updateAllToggleButtons(theme) {
  document.querySelectorAll('.theme-toggle-btn').forEach((btn) => updateToggleButton(btn, theme));
  markThemeReady();
}

export function initThemeToggle() {
  const buttons = document.querySelectorAll('.theme-toggle-btn');
  updateAllToggleButtons(getCurrentTheme());

  buttons.forEach((btn) => {
    if (!btn) return;
    if (!btn.getAttribute('type')) {
      btn.setAttribute('type', 'button');
    }
    if (boundButtons.has(btn)) return;
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      toggleTheme();
    });
    boundButtons.add(btn);
  });
}

export function applyStoredTheme() {
  const cached = getCachedPreferences();
  const initialTheme = cached?.theme === 'dark'
    ? 'dark'
    : cached?.theme === 'light'
      ? 'light'
      : getSystemPreferredTheme();
  applyThemeInternal(initialTheme, { persist: false });
  loadThemePreference();
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

function loadThemePreference() {
  if (themeInitialized) {
    return;
  }
  themeInitialized = true;

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
