import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData } from './storage.js';
import { checkAuth } from './auth.js';
import { setReservationsUIHandlers } from './reservations/uiBridge.js';
import { initDashboardShell } from './dashboardShell.js';
import { initProjectsPage } from './projects/app.js';

applyStoredTheme();
migrateOldData();
checkAuth();

const loadProjectsReservationsModule = (() => {
  let modulePromise = null;
  let globalsRegistered = false;
  return () => {
    if (!modulePromise) {
      modulePromise = import('./reservationsUI.js')
        .then((module) => {
          if (!globalsRegistered && typeof module.registerReservationGlobals === 'function') {
            try {
              module.registerReservationGlobals();
              globalsRegistered = true;
            } catch (error) {
              console.warn('⚠️ [projects] Failed to register reservation globals', error);
            }
          }
          return module;
        });
    }
    return modulePromise;
  };
})();

function invokeProjectsReservationHandler(handlerName, ...args) {
  loadProjectsReservationsModule()
    .then((module) => {
      const handler = module?.[handlerName];
      if (typeof handler === 'function') {
        handler(...args);
      } else {
        console.warn(`⚠️ [projects] Reservation handler "${handlerName}" is unavailable`);
      }
    })
    .catch((error) => {
      console.error(`❌ [projects] Failed to execute reservation handler "${handlerName}"`, error);
    });
}

setReservationsUIHandlers({
  showReservationDetails(index) {
    invokeProjectsReservationHandler('showReservationDetails', index);
  },
  openReservationEditor(index, payload = {}) {
    invokeProjectsReservationHandler('openReservationEditor', index, payload?.reservation ?? null);
  },
  confirmReservation(index, event) {
    invokeProjectsReservationHandler('confirmReservation', index, event);
  },
  deleteReservation(index) {
    invokeProjectsReservationHandler('deleteReservation', index);
  },
  reopenReservation(index) {
    invokeProjectsReservationHandler('reopenReservation', index);
  }
});

initProjectsPage();

document.addEventListener('DOMContentLoaded', () => {
  initDashboardShell();
  initThemeToggle();
});
