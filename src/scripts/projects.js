import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData } from './storage.js';
import { checkAuth } from './auth.js';
import { registerReservationGlobals, getReservationsEditContext, setupEditReservationModalEvents } from './reservations/controller.js';
import { initTechnicianSelection } from './reservationsTechnicians.js';
import mountReservationModalsIfNeeded from './reservations/modals.js';
import { initDashboardShell } from './dashboardShell.js';
import { initProjectsPage } from './projects/app.js';

mountReservationModalsIfNeeded();
applyStoredTheme();
migrateOldData();
checkAuth();
registerReservationGlobals();
const initProjectsReservationModal = () => {
  try {
    const editContext = getReservationsEditContext();
    setupEditReservationModalEvents(editContext);
    initTechnicianSelection({
      onEditChange: editContext.updateEditReservationSummary
    });
  } catch (error) {
    console.warn('⚠️ [projects] Failed to initialize reservation edit modal', error);
  }
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectsReservationModal, { once: true });
} else {
  initProjectsReservationModal();
}

initProjectsPage();

document.addEventListener('DOMContentLoaded', () => {
  initDashboardShell();
  initThemeToggle();
});
