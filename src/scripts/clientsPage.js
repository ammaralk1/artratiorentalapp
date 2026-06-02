import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { migrateOldData } from './storage.js';
import { applyLocalDashboardFixture, isLocalDashboardFixtureEnabled } from './devFixtures.js';
import { initDashboardShell } from './dashboardShell.js';
import { bootCustomersModule } from './customers.js';
import './translations/customer.js';

applyStoredTheme();
migrateOldData();
applyLocalDashboardFixture();

function revealPage() {
  document.body?.classList.remove('auth-pending');
}

async function initClientsPage() {
  const user = await checkAuth();
  if (!user) return;

  initDashboardShell();
  initThemeToggle();
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  bootCustomersModule({
    loadData: !isLocalDashboardFixtureEnabled(),
    reloadFromStorage: isLocalDashboardFixtureEnabled(),
    showToastOnError: !isLocalDashboardFixtureEnabled(),
  });
  revealPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initClientsPage().catch((error) => {
      console.error('❌ Failed to initialise clients page', error);
      revealPage();
    });
  }, { once: true });
} else {
  initClientsPage().catch((error) => {
    console.error('❌ Failed to initialise clients page', error);
    revealPage();
  });
}
