import { showToast } from './utils.js';
import { syncEquipmentStatuses } from './equipment.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';
import {
  getReservationsState,
  deleteReservationApi,
  confirmReservationApi,
  refreshReservationsFromApi,
  isApiError,
} from './reservationsService.js';

function runSharedRefresh() {
  syncEquipmentStatuses();
  syncTechniciansStatuses();
}

let hasFetchedReservations = false;

export async function ensureReservationsLoaded(options = {}) {
  const { suppressError = true, params = null } = options ?? {};

  if (hasFetchedReservations && getReservationsState().length > 0) {
    return getReservationsState();
  }

  try {
    const data = await refreshReservationsFromApi(params || {});
    hasFetchedReservations = true;
    return data;
  } catch (error) {
    console.error('❌ [reservationsActions] Failed to load reservations from API', error);
    if (!suppressError) {
      throw error;
    }
    return getReservationsState();
  }
}

export async function deleteReservation(index, { onAfterChange } = {}) {
  const reservations = getReservationsState();
  const target = reservations[index];

  if (!target) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  const reservationId = target.id || target.reservationId;
  if (!reservationId) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  try {
    await deleteReservationApi(reservationId);
    runSharedRefresh();
    onAfterChange?.({ type: 'deleted', reservation: target });
    showToast(t('reservations.toast.deleted', '🗑️ تم حذف الحجز'));
    return true;
  } catch (error) {
    console.error('❌ [reservationsActions] deleteReservation failed', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.deleteFailed', 'تعذر حذف الحجز، حاول مرة أخرى');
    showToast(message, 'error');
    return false;
  }
}

export async function confirmReservation(index, { onAfterChange } = {}) {
  const reservations = getReservationsState();
  const reservation = reservations[index];
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  const reservationId = reservation.id || reservation.reservationId;
  if (!reservationId) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  try {
    const updated = await confirmReservationApi(reservationId);

    runSharedRefresh();
    onAfterChange?.({ type: 'confirmed', reservation: updated });
    showToast(t('reservations.toast.confirmed', '✅ تم تأكيد الحجز'));
    return true;
  } catch (error) {
    console.error('❌ [reservationsActions] confirmReservation failed', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.confirmFailed', 'تعذر تأكيد الحجز، حاول مرة أخرى');
    showToast(message, 'error');
    return false;
  }
}
