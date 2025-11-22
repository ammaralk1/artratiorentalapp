import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData } from './storage.js';
import { checkAuth } from './auth.js';
import { registerReservationGlobals, getReservationsEditContext, setupEditReservationModalEvents } from './reservations/controller.js';
import { initDashboardShell } from './dashboardShell.js';
import { initProjectsPage } from './projects/app.js';

applyStoredTheme();
migrateOldData();
checkAuth();
registerReservationGlobals();
setupEditReservationModalEvents(getReservationsEditContext());

initProjectsPage();

document.addEventListener('DOMContentLoaded', () => {
  initDashboardShell();
  initThemeToggle();
});
