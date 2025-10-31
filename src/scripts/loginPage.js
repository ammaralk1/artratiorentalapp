import '../styles/app.css';

import { login } from './auth.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { initLanguageToggle, t } from './language.js';
import './translations/common.js';

function initLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) {
    return; // Not on login page; avoid side effects and logs
  }

  window.__ART_RATIO_SKIP_PREF_FETCH__ = true;
  applyStoredTheme({ skipRemote: true });
  initThemeToggle();
  initLanguageToggle();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const passwordToggleButton = document.querySelector('[data-action="toggle-password"]');
  const passwordToggleLabel = passwordToggleButton?.querySelector('[data-role=\"password-toggle-label\"]') || null;
  const showPasswordIcon = passwordToggleButton?.querySelector('[data-icon=\"show\"]') || null;
  const hidePasswordIcon = passwordToggleButton?.querySelector('[data-icon=\"hide\"]') || null;

  async function attemptCredentialAutofill() {
    if (!usernameInput || !passwordInput) return;
  try {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') return;
    if (!('credentials' in navigator) || typeof navigator.credentials.get !== 'function') return;
    if (!window.isSecureContext) return;

    const credential = await navigator.credentials.get({
      password: true,
      mediation: 'optional',
    });

    if (credential && credential.type === 'password') {
      if (!usernameInput.value && credential.id) {
        usernameInput.value = credential.id;
      }
      if (!passwordInput.value && credential.password) {
        passwordInput.value = credential.password;
      }
    }
  } catch (error) {
    console.warn('⚠️ [login-page] Failed to retrieve stored credentials', error);
  }
  }

  function updatePasswordToggleState(isVisible) {
    if (!passwordToggleButton || !passwordInput) return;

  if (showPasswordIcon) {
    showPasswordIcon.classList.toggle('hidden', isVisible);
  }
  if (hidePasswordIcon) {
    hidePasswordIcon.classList.toggle('hidden', !isVisible);
  }

  passwordToggleButton.setAttribute('aria-pressed', String(isVisible));
  const labelKey = isVisible ? 'login.form.password.toggleHide' : 'login.form.password.toggleShow';
  const fallback = isVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور';
  const labelText = t(labelKey, fallback);

  passwordToggleButton.setAttribute('aria-label', labelText);
  if (passwordToggleLabel) {
    passwordToggleLabel.textContent = labelText;
  }
  }

  if (passwordToggleButton && passwordInput) {
    updatePasswordToggleState(passwordInput.type === 'text');

  passwordToggleButton.addEventListener('click', () => {
    const willShow = passwordInput.type === 'password';
    passwordInput.type = willShow ? 'text' : 'password';
    updatePasswordToggleState(willShow);
    passwordInput.focus({ preventScroll: true });
    try {
      const { length } = passwordInput.value;
      passwordInput.setSelectionRange(length, length);
    } catch (error) {
      // Ignore browsers that do not support setSelectionRange on the current input type.
    }
  });

  document.addEventListener('language:changed', () => {
    updatePasswordToggleState(passwordInput.type === 'text');
  });
  }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      await login(username, password, { form });
    });
  }

  attemptCredentialAutofill();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoginPage, { once: true });
} else {
  initLoginPage();
}
