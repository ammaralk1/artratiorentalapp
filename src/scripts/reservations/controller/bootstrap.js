import { loadData } from '../../storage.js';
import { reconcileTechnicianSelections } from '../../reservationsTechnicians.js';
import { ensureProjectsLoaded } from '../../projectsService.js';
import { refreshCreateReservationForm } from '../createForm.js';

export function loadReservationForm() {
  return ensureProjectsLoaded().catch((error) => {
    console.warn('⚠️ [reservations/controller] Failed to refresh projects before loading form', error);
  }).finally(() => {
    const { technicians } = loadData() || {};
    reconcileTechnicianSelections(technicians || []);
    refreshCreateReservationForm();
  });
}
