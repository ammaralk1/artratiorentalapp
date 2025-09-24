import { t } from './language.js';

const THEME_KEY = 'app-theme';
const DARK_CLASS = 'dark-mode';

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch (error) {
    console.warn('⚠️ تعذر قراءة تفضيل السمة من localStorage', error);
  }
  return null;
}

function getPreferredTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.warn('⚠️ تعذر حفظ تفضيل السمة في localStorage', error);
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;
  const body = document.body;
  if (theme === 'dark') {
    root.classList.add(DARK_CLASS);
    if (body) body.classList.add(DARK_CLASS);
  } else {
    root.classList.remove(DARK_CLASS);
    if (body) body.classList.remove(DARK_CLASS);
  }
  persistTheme(theme);
}

export function getCurrentTheme() {
  const body = document.body;
  if (body && body.classList.contains(DARK_CLASS)) return 'dark';
  return document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
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
}

export function initThemeToggle(buttonId = 'theme-toggle') {
  const initialTheme = getCurrentTheme();
  updateAllToggleButtons(initialTheme);

  const buttons = Array.from(document.querySelectorAll('.theme-toggle-btn'));
  const primaryButton = document.getElementById(buttonId);

  if (primaryButton && !buttons.includes(primaryButton)) {
    buttons.unshift(primaryButton);
  }

  buttons.forEach((btn) => {
    if (!btn || btn.dataset.listenerAttached) return;
    btn.addEventListener('click', () => {
      const newTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      updateAllToggleButtons(newTheme);
    });
    btn.dataset.listenerAttached = 'true';
  });
}

export function applyStoredTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  updateAllToggleButtons(theme);
}

document.addEventListener('language:changed', () => {
  updateAllToggleButtons(getCurrentTheme());
});
