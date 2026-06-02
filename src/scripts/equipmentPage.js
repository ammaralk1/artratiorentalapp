import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { migrateOldData } from './storage.js';
import { applyLocalDashboardFixture, isLocalDashboardFixtureEnabled } from './devFixtures.js';
import { initDashboardShell } from './dashboardShell.js';
import { initEnhancedSelects } from './ui/enhancedSelect.js';
import { initBackToTopForEquipment } from './ui/backToTop.js';
import { initModalA11yFocusGuards } from './ui/modalAccessibility.js';

applyStoredTheme();
migrateOldData();
applyLocalDashboardFixture();

function revealPage() {
  document.body?.classList.remove('auth-pending');
}

async function initEquipmentPage() {
  const user = await checkAuth();
  if (!user) return;

  initDashboardShell();
  initThemeToggle();
  document.getElementById('logout-btn')?.addEventListener('click', logout);
  initBackToTopForEquipment();
  initEnhancedSelects();
  try { initModalA11yFocusGuards(); } catch (_) {}

  const [{ initEquipmentModule }, { initEquipmentPackages }] = await Promise.all([
    import('./equipment.js'),
    import('./equipmentPackagesManager.js'),
  ]);

  initEquipmentModule({
    loadData: !isLocalDashboardFixtureEnabled(),
    showToastOnError: !isLocalDashboardFixtureEnabled(),
  });
  initEquipmentPackages();
  revealPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initEquipmentPage().catch((error) => {
      console.error('❌ Failed to initialise equipment page', error);
      revealPage();
    });
  }, { once: true });
} else {
  initEquipmentPage().catch((error) => {
    console.error('❌ Failed to initialise equipment page', error);
    revealPage();
  });
}
