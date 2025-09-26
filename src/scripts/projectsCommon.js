import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData } from './storage.js';
import { checkAuth, logout } from './auth.js';

applyStoredTheme();
migrateOldData();
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }
});
