import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { migrateOldData } from './storage.js';
import { applyLocalDashboardFixture } from './devFixtures.js';
import { initDashboardShell } from './dashboardShell.js';
import { initProjectsReportsModule } from './projectsReports.js';
import './translations/projects.js';

applyStoredTheme();
migrateOldData();
applyLocalDashboardFixture();

function revealPage() {
  document.body?.classList.remove('auth-pending');
}

async function initProjectReportsPage() {
  const user = await checkAuth();
  if (!user) return;

  initDashboardShell();
  initThemeToggle();
  document.getElementById('logout-btn')?.addEventListener('click', logout);

  try {
    await initProjectsReportsModule();
  } catch (error) {
    console.error('❌ [projectReportsPage] Failed to initialise project reports', error);
  } finally {
    revealPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initProjectReportsPage().catch((error) => {
      console.error('❌ Failed to initialise project reports page', error);
      revealPage();
    });
  }, { once: true });
} else {
  initProjectReportsPage().catch((error) => {
    console.error('❌ Failed to initialise project reports page', error);
    revealPage();
  });
}
