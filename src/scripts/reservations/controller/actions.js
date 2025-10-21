import { t } from '../../language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from '../../auth.js';
import {
  confirmReservation as confirmReservationAction,
  deleteReservation as deleteReservationAction
} from '../../reservationsActions.js';
import { updatePreferences } from '../../preferencesService.js';
import { editReservation } from '../../reservationsEdit.js';
import { renderReservationsList, renderReservationDetails } from '../renderers.js';
import { refreshCreateReservationForm } from '../createForm.js';
import { setReservationsUIHandlers } from '../uiBridge.js';
import { configureEditContextHooks, getReservationsEditContext } from './editContext.js';

export function handleReservationsMutation(detail = null) {
  refreshCreateReservationForm();
  renderReservations();

  if (typeof window.refreshCustomerReservationsViews === 'function') {
    window.refreshCustomerReservationsViews();
  }
  if (typeof window.refreshTechnicianReservationsViews === 'function') {
    window.refreshTechnicianReservationsViews();
  }

  const eventInit = detail != null ? { detail } : {};
  document.dispatchEvent(new CustomEvent('reservations:changed', eventInit));
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
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return false;
  }
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
    try {
      localStorage.removeItem('pendingReservationEditId');
      localStorage.removeItem('pendingReservationEditIndex');
    } catch (storageError) {
      console.warn('⚠️ [reservations/controller] Unable to clear pending edit id (inline form)', storageError);
    }
    editReservation(index, getReservationsEditContext());
    return;
  }

  if (document.getElementById('editReservationModal')) {
    try {
      localStorage.removeItem('pendingReservationEditId');
      localStorage.removeItem('pendingReservationEditIndex');
    } catch (storageError) {
      console.warn('⚠️ [reservations/controller] Unable to clear pending edit id (modal)', storageError);
    }
    editReservation(index, getReservationsEditContext());
    return;
  }

  const params = new URLSearchParams();

  if (reservation?.id || reservation?.reservationId) {
    const fallbackId = reservation.id ?? reservation.reservationId;
    params.set('reservationEditId', String(fallbackId));
    try {
      localStorage.setItem('pendingReservationEditId', String(fallbackId));
      localStorage.removeItem('pendingReservationEditIndex');
    } catch (storageError) {
      console.warn('⚠️ [reservations/controller] Unable to persist pending edit id', storageError);
    }
  } else {
    params.set('reservationEditIndex', String(index));
    try {
      localStorage.setItem('pendingReservationEditIndex', String(index));
      localStorage.removeItem('pendingReservationEditId');
    } catch (storageError) {
      console.warn('⚠️ [reservations/controller] Unable to persist pending edit index', storageError);
    }
  }

  updatePreferences({
    dashboardTab: 'reservations-tab',
    dashboardSubTab: 'my-reservations-tab',
  }).catch((error) => {
    console.warn('⚠️ [reservations/controller] Failed to persist tab preference', error);
  });

  const search = params.toString();
  const target = search ? `dashboard.html?${search}#reservations` : 'dashboard.html#reservations';
  window.location.href = target;
}

export function registerReservationGlobals() {
  setReservationsUIHandlers({
    showReservationDetails,
    deleteReservation,
    confirmReservation,
    openReservationEditor,
  });
}

configureEditContextHooks({
  renderReservations,
  handleReservationsMutation,
});
