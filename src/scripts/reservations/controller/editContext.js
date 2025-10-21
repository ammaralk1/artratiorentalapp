import {
  renderEditReservationItems,
  addEquipmentToEditingReservation,
  addEquipmentToEditingByDescription,
  updateEditReservationSummary
} from '../editForm.js';
import {
  addEquipmentByDescription,
  setFlatpickrValue,
  populateEquipmentDescriptionLists
} from '../formUtils.js';
import {
  hasEquipmentConflict,
  hasTechnicianConflict,
  splitDateTime,
  combineDateTime
} from '../state.js';

let renderReservationsHook = null;
let handleReservationsMutationHook = null;

function getBootstrapModalInstance(modalElement) {
  if (!modalElement) return null;

  if (window?.bootstrap?.Modal) {
    return window.bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  if (typeof bootstrap !== 'undefined' && bootstrap?.Modal) {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  return null;
}

export function configureEditContextHooks({ renderReservations, handleReservationsMutation }) {
  renderReservationsHook = typeof renderReservations === 'function' ? renderReservations : null;
  handleReservationsMutationHook = typeof handleReservationsMutation === 'function' ? handleReservationsMutation : null;
}

export function getReservationsEditContext() {
  if (!renderReservationsHook || !handleReservationsMutationHook) {
    throw new Error('[reservations/editContext] Hooks not configured');
  }

  return {
    populateEquipmentDescriptionLists,
    setFlatpickrValue,
    splitDateTime,
    renderEditItems: renderEditReservationItems,
    updateEditReservationSummary,
    addEquipmentByDescription,
    addEquipmentToEditingReservation,
    addEquipmentToEditingByDescription,
    combineDateTime,
    hasEquipmentConflict,
    hasTechnicianConflict,
    renderReservations: renderReservationsHook,
    handleReservationsMutation: handleReservationsMutationHook,
    ensureModal: getBootstrapModalInstance
  };
}
