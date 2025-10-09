import '../styles/app.css';

import { login } from './auth.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { initLanguageToggle } from './language.js';

window.__ART_RATIO_SKIP_PREF_FETCH__ = true;

applyStoredTheme({ skipRemote: true });
initThemeToggle();
initLanguageToggle();

const form = document.getElementById('login-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    await login(username, password);
  });
} else {
  console.warn('[login-page] #login-form not found');
}
