import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { migrateOldData } from './storage.js';
import { applyLocalDashboardFixture, isLocalDashboardFixtureEnabled } from './devFixtures.js';
import { initDashboardShell } from './dashboardShell.js';
import { bootTechniciansModule } from './technicians.js';
import './translations/technician.js';

applyStoredTheme();
migrateOldData();
applyLocalDashboardFixture();

function revealPage() {
  document.body?.classList.remove('auth-pending');
}

async function initCrewPage() {
  const user = await checkAuth();
  if (!user) return;

  initDashboardShell();
  initThemeToggle();
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  bootTechniciansModule({
    loadData: !isLocalDashboardFixtureEnabled(),
    showToastOnError: !isLocalDashboardFixtureEnabled(),
  });
  revealPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCrewPage().catch((error) => {
      console.error('❌ Failed to initialise crew page', error);
      revealPage();
    });
  }, { once: true });
} else {
  initCrewPage().catch((error) => {
    console.error('❌ Failed to initialise crew page', error);
    revealPage();
  });
}
