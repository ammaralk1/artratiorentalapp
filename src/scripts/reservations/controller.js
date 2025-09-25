import { loadData } from '../storage.js';
import { t } from '../language.js';
import {
  initCreateReservationForm,
  refreshCreateReservationForm,
  renderDraftReservationSummary
} from './createForm.js';
import { reconcileTechnicianSelections } from '../reservationsTechnicians.js';
import {
  renderReservationsList,
  renderReservationDetails
} from './renderers.js';
import {
  confirmReservation as confirmReservationAction,
  deleteReservation as deleteReservationAction
} from '../reservationsActions.js';
import {
  editReservation,
  setupEditReservationModalEvents
} from '../reservationsEdit.js';
import {
  renderEditReservationItems,
  addEquipmentToEditingReservation,
  addEquipmentToEditingByDescription,
  removeEditReservationItem,
  updateEditReservationSummary
} from './editForm.js';
import {
  hasEquipmentConflict,
  hasTechnicianConflict,
  splitDateTime,
  combineDateTime
} from './state.js';
import {
  addEquipmentByDescription,
  setFlatpickrValue,
  populateEquipmentDescriptionLists
} from './formUtils.js';

export function loadReservationForm() {
  const { technicians } = loadData();
  reconcileTechnicianSelections(technicians || []);
  refreshCreateReservationForm();
}

export function handleReservationsMutation() {
  refreshCreateReservationForm();
  renderReservations();

  if (typeof window.refreshCustomerReservationsViews === 'function') {
    window.refreshCustomerReservationsViews();
  }
  if (typeof window.refreshTechnicianReservationsViews === 'function') {
    window.refreshTechnicianReservationsViews();
  }
}

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

export function getReservationsEditContext() {
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
    renderReservations,
    handleReservationsMutation,
    ensureModal: getBootstrapModalInstance
  };
}

export function renderReservations(containerId = 'reservations-list', filters = null) {
  renderReservationsList({
    containerId,
    filters,
    onShowDetails: showReservationDetails,
    onConfirmReservation: confirmReservation
  });
}

export function showReservationDetails(index) {
  return renderReservationDetails(index, {
    getEditContext: getReservationsEditContext,
    onEdit: (reservationIndex, { reservation }) => {
      openReservationEditor(reservationIndex, reservation);
    },
    onDelete: deleteReservation
  });
}

export function deleteReservation(index) {
  const confirmed = window.confirm(
    t('reservations.toast.deleteConfirm', '⚠️ هل أنت متأكد من حذف هذا الحجز؟')
  );
  if (!confirmed) return false;

  return deleteReservationAction(index, { onAfterChange: handleReservationsMutation });
}

export function confirmReservation(index) {
  return confirmReservationAction(index, { onAfterChange: handleReservationsMutation });
}

export function openReservationEditor(index, reservation = null) {
  if (document.getElementById('reservation-form')) {
    editReservation(index, getReservationsEditContext());
    return;
  }

  if (document.getElementById('editReservationModal')) {
    editReservation(index, getReservationsEditContext());
    return;
  }

  if (reservation?.id || reservation?.reservationId) {
    const fallbackId = reservation.id ?? reservation.reservationId;
    localStorage.setItem('pendingReservationEditId', String(fallbackId));
  } else {
    localStorage.setItem('pendingReservationEditId', String(index));
  }

  window.location.href = 'dashboard.html#reservations';
}

export function registerReservationGlobals() {
  if (typeof window === 'undefined') return;

  window.showReservationDetails = showReservationDetails;
  window.deleteReservation = deleteReservation;
  window.confirmReservation = confirmReservation;
  window.editReservation = openReservationEditor;
  window.removeEditReservationItem = removeEditReservationItem;
}

export {
  initCreateReservationForm,
  setupEditReservationModalEvents,
  updateEditReservationSummary,
  renderDraftReservationSummary
};
