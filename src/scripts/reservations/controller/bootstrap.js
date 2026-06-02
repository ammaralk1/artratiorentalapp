import { loadData } from '../../storage.js';
import { reconcileTechnicianSelections } from '../../reservationsTechnicians.js';
import { ensureProjectsLoaded } from '../../projectsService.js';
import { ensureEquipmentCatalogLoaded } from '../../reservationsEquipment.js';
import { refreshCreateReservationForm } from '../createForm.js';

export function loadReservationForm() {
  return Promise.allSettled([
    ensureProjectsLoaded(),
    ensureEquipmentCatalogLoaded(),
  ]).then(([projectsResult, equipmentResult]) => {
    if (projectsResult.status === 'rejected') {
      console.warn('⚠️ [reservations/controller] Failed to refresh projects before loading form', projectsResult.reason);
    }
    if (equipmentResult.status === 'rejected') {
      console.warn('⚠️ [reservations/controller] Failed to refresh equipment before loading form', equipmentResult.reason);
    }
    const { technicians } = loadData() || {};
    reconcileTechnicianSelections(technicians || []);
    refreshCreateReservationForm();
  });
}
