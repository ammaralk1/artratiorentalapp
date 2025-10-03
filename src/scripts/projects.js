import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData } from './storage.js';
import { checkAuth } from './auth.js';
import { registerReservationGlobals } from './reservations/controller.js';
import { initProjectsPage } from './projects/app.js';

applyStoredTheme();
migrateOldData();
checkAuth();
registerReservationGlobals();

initProjectsPage();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
});
