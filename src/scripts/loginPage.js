import '../styles/app.css';

import { login } from './auth.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { initLanguageToggle, t } from './language.js';
import './translations/common.js';

window.__ART_RATIO_SKIP_PREF_FETCH__ = true;

applyStoredTheme({ skipRemote: true });
initThemeToggle();
initLanguageToggle();

const REMEMBER_STORAGE_KEY = '__ART_RATIO_REMEMBER_CREDENTIALS__';

const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberInput = document.getElementById('remember-me');
const passwordToggleButton = document.querySelector('[data-action="toggle-password"]');

function readStoredCredentials() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const raw = window.localStorage.getItem(REMEMBER_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    return {
      remember: Boolean(parsed.remember),
      username: typeof parsed.username === 'string' ? parsed.username : '',
      password: typeof parsed.password === 'string' ? parsed.password : '',
    };
  } catch (error) {
    console.warn('⚠️ [login-page] Failed to read remembered credentials', error);
    return null;
  }
}

function persistRememberedCredentials({ username, password }) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    const payload = JSON.stringify({ remember: true, username, password });
    window.localStorage.setItem(REMEMBER_STORAGE_KEY, payload);
  } catch (error) {
    console.warn('⚠️ [login-page] Failed to persist remembered credentials', error);
  }
}

function clearRememberedCredentials() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    window.localStorage.removeItem(REMEMBER_STORAGE_KEY);
  } catch (error) {
    console.warn('⚠️ [login-page] Failed to clear remembered credentials', error);
  }
}

function hydrateRememberedCredentials() {
  const stored = readStoredCredentials();
  if (!stored || !stored.remember) {
    return;
  }

  if (usernameInput && stored.username) {
    usernameInput.value = stored.username;
  }
  if (passwordInput && stored.password) {
    passwordInput.value = stored.password;
  }
  if (rememberInput) {
    rememberInput.checked = true;
  }
}

function updatePasswordToggleState(isVisible) {
  if (!passwordToggleButton) return;

  const showText = passwordToggleButton.querySelector('[data-state="show"]');
  const hideText = passwordToggleButton.querySelector('[data-state="hide"]');

  if (showText) {
    showText.classList.toggle('hidden', isVisible);
  }
  if (hideText) {
    hideText.classList.toggle('hidden', !isVisible);
  }

  passwordToggleButton.setAttribute('aria-pressed', String(isVisible));
  const labelKey = isVisible ? 'login.form.password.toggleHide' : 'login.form.password.toggleShow';
  const fallback = isVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور';
  passwordToggleButton.setAttribute('aria-label', t(labelKey, fallback));
}

hydrateRememberedCredentials();

if (passwordToggleButton && passwordInput) {
  updatePasswordToggleState(passwordInput.type === 'text');

  passwordToggleButton.addEventListener('click', () => {
    const willShow = passwordInput.type === 'password';
    passwordInput.type = willShow ? 'text' : 'password';
    updatePasswordToggleState(willShow);
    passwordInput.focus();
    try {
      const length = passwordInput.value.length;
      passwordInput.setSelectionRange(length, length);
    } catch (error) {
      // Ignore browsers that do not support setSelectionRange on the current input type.
    }
  });

  document.addEventListener('language:changed', () => {
    updatePasswordToggleState(passwordInput.type === 'text');
  });
}

if (rememberInput) {
  rememberInput.addEventListener('change', () => {
    if (!rememberInput.checked) {
      clearRememberedCredentials();
    }
  });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';
    const remember = rememberInput ? rememberInput.checked : false;

    const success = await login(username, password);

    if (rememberInput) {
      if (remember && success) {
        persistRememberedCredentials({ username, password });
      } else if (!remember) {
        clearRememberedCredentials();
      }
    }
  });
} else {
  console.warn('[login-page] #login-form not found');
}
