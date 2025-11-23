import { showToast } from './utils.js';
import { syncEquipmentStatuses, renderEquipment } from './equipment.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from './auth.js';
import {
  getReservationsState,
  deleteReservationApi,
  confirmReservationApi,
  closeReservationApi,
  refreshReservationsFromApi,
  isApiError,
  updateReservationApi,
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

export async function closeReservation(index, notes = '', { onAfterChange, reservationId: reservationIdOverride } = {}) {
  const reservations = getReservationsState();
  let reservation = reservations[index];
  const targetId = reservationIdOverride != null ? String(reservationIdOverride) : null;
  if (!reservation && targetId) {
    reservation = reservations.find((entry) => {
      const entryId = entry?.id ?? entry?.reservationId ?? entry?.reservation_id;
      return entryId != null && String(entryId) === targetId;
    });
  }
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  const reservationId = reservation.id || reservation.reservationId;
  if (!reservationId) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  // If already closed/completed by status, give a helpful toast
  const status = String(reservation.status || '').toLowerCase();
  if (status === 'completed') {
    showToast(t('reservations.toast.alreadyClosed', '✅ هذا الحجز مغلق مسبقاً'));
    return false;
  }

  try {
    // Always prefix closing note when provided for reliable undo
    let finalNotes = reservation.notes ? String(reservation.notes).trim() : '';
    const inputNote = (notes || '').trim();
    if (inputNote) {
      const prefix = t('reservations.closeModal.notePrefix', 'ملاحظة إغلاق');
      finalNotes = finalNotes ? `${finalNotes}\n${prefix}: ${inputNote}` : `${prefix}: ${inputNote}`;
    }

    const updated = await closeReservationApi(reservationId, finalNotes);
    runSharedRefresh();
    onAfterChange?.({ type: 'closed', reservation: updated });
    showToast(t('reservations.toast.closed', '✅ تم إغلاق الحجز'));
    return true;
  } catch (error) {
    console.error('❌ [reservationsActions] closeReservation failed', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.closeFailed', 'تعذر إغلاق الحجز، حاول مرة أخرى');
    showToast(message, 'error');
    return false;
  }
}

function stripLastClosingNote(originalNotes = '') {
  const text = String(originalNotes || '');
  if (!text.trim()) return '';
  const markers = [
    'ملاحظة إغلاق',
    'Close note'
  ];
  let lastIdx = -1;
  let marker = '';
  for (const m of markers) {
    const idx = text.lastIndexOf(m);
    if (idx > lastIdx) { lastIdx = idx; marker = m; }
  }
  if (lastIdx === -1) {
    // No explicit prefix — treat full notes as close-only and clear
    return '';
  }
  // Remove the trailing newline before the marker if present
  const pre = text.slice(0, lastIdx);
  return pre.replace(/\n$/, '');
}

export async function reopenReservation(index, { onAfterChange } = {}) {
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
    const cleanedNotes = stripLastClosingNote(reservation.notes || '');
    const updated = await updateReservationApi(reservationId, { status: 'confirmed', confirmed: true, notes: cleanedNotes });
    runSharedRefresh();
    onAfterChange?.({ type: 'reopened', reservation: updated });
    showToast(t('reservations.toast.reopened', '↩️ تم إلغاء الإغلاق')); 
    return true;
  } catch (error) {
    console.error('❌ [reservationsActions] reopenReservation failed', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.reopenFailed', 'تعذر إلغاء الإغلاق، حاول مرة أخرى');
    showToast(message, 'error');
    return false;
  }
}
