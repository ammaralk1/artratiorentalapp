import { showToast } from './utils.js';
import { syncEquipmentStatuses, renderEquipment } from './equipment.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from './auth.js';
import {
  getReservationsState,
  deleteReservationApi,
  confirmReservationApi,
  refreshReservationsFromApi,
  isApiError,
} from './reservationsService.js';
import { resolveReservationProjectState } from './reservationsShared.js';

function runSharedRefresh() {
  const run = () => {
    syncEquipmentStatuses();
    renderEquipment();
    syncTechniciansStatuses();
  };

  if (typeof window !== 'undefined') {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: 200 });
      return;
    }
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(run);
      return;
    }
  }

  run();
}

let hasFetchedReservations = false;
let lastReservationsFetchSignature = null;

function normalizeFetchParams(params) {
  if (!params || typeof params !== 'object') {
    return '';
  }

  const entries = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => [key, String(value)]);

  if (entries.length === 0) {
    return '';
  }

  return JSON.stringify(entries.sort(([a], [b]) => a.localeCompare(b)));
}

export async function ensureReservationsLoaded(options = {}) {
  const { suppressError = true, params = null, force = false } = options ?? {};
  const signature = normalizeFetchParams(params);

  if (!force && hasFetchedReservations && getReservationsState().length > 0 && signature === lastReservationsFetchSignature) {
    return getReservationsState();
  }

  try {
    const data = await refreshReservationsFromApi(params || {});
    hasFetchedReservations = true;
    lastReservationsFetchSignature = signature;
    return data;
  } catch (error) {
    console.error('❌ [reservationsActions] Failed to load reservations from API', error);
    if (!suppressError) {
      throw error;
    }
    return getReservationsState();
  }
}

export function resetReservationsFetchState() {
  hasFetchedReservations = false;
  lastReservationsFetchSignature = null;
}

export async function deleteReservation(index, { onAfterChange } = {}) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return false;
  }
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

  const { projectLinked } = resolveReservationProjectState(reservation);
  if (projectLinked) {
    showToast(
      t(
        'reservations.toast.confirmBlockedByProject',
        '⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا'
      ),
      'info'
    );
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
