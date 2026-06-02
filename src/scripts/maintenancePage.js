import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { migrateOldData } from './storage.js';
import { applyLocalDashboardFixture } from './devFixtures.js';
import { initDashboardShell } from './dashboardShell.js';
import { initEnhancedSelects } from './ui/enhancedSelect.js';
import { initModalA11yFocusGuards } from './ui/modalAccessibility.js';

applyStoredTheme();
migrateOldData();
applyLocalDashboardFixture();

function revealPage() {
  document.body?.classList.remove('auth-pending');
}

async function initMaintenancePage() {
  const user = await checkAuth();
  if (!user) return;

  initDashboardShell();
  initThemeToggle();
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  initEnhancedSelects();
  try { initModalA11yFocusGuards(); } catch (_) {}

  const { initMaintenance } = await import('./maintenance.js');
  initMaintenance();
  revealPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMaintenancePage().catch((error) => {
      console.error('❌ Failed to initialise maintenance page', error);
      revealPage();
    });
  }, { once: true });
} else {
  initMaintenancePage().catch((error) => {
    console.error('❌ Failed to initialise maintenance page', error);
    revealPage();
  });
}
