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

function resolveDateValue(value) {
  if (!value) return null;
  const str = String(value).trim();
  if (!str) return null;
  const normalized = str.includes(' ') ? str.replace(' ', 'T') : str;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function resolveReservationDates(reservation) {
  const startCandidates = [
    reservation?.start,
    reservation?.startDatetime,
    reservation?.start_datetime,
    reservation?.start_date,
    reservation?.startDate,
  ];
  const endCandidates = [
    reservation?.end,
    reservation?.endDatetime,
    reservation?.end_datetime,
    reservation?.end_date,
    reservation?.endDate,
  ];
  let start = null;
  for (const candidate of startCandidates) {
    start = resolveDateValue(candidate);
    if (start) break;
  }
  let end = null;
  for (const candidate of endCandidates) {
    end = resolveDateValue(candidate);
    if (end) break;
  }
  if (!end && start) {
    end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  }
  return { start, end };
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

export async function autoCloseExpiredStandaloneReservations() {
  const reservations = getReservationsState();
  if (!Array.isArray(reservations) || reservations.length === 0) return false;

  const now = new Date();
  let changed = false;
  let closedCount = 0;

  for (const reservation of reservations) {
    const projectLinked = reservation?.projectId != null && reservation.projectId !== '' && reservation.projectId !== 'null';
    if (projectLinked) continue;

    const statusRaw = String(reservation?.status || '').toLowerCase();
    if (['cancelled', 'canceled', 'completed', 'closed'].includes(statusRaw)) continue;

    const reservationId = reservation?.id || reservation?.reservationId;
    if (!reservationId) continue;

    const { start, end } = resolveReservationDates(reservation);
    if (!start || !end) continue;
    if (end > now) continue;

    try {
      const isConfirmed = reservation?.confirmed === true || reservation?.confirmed === 'true' || statusRaw === 'confirmed';
      if (isConfirmed) {
        await closeReservationApi(reservationId, reservation?.notes || null);
        closedCount += 1;
      } else {
        await updateReservationApi(reservationId, { status: 'cancelled', cancelled: true, confirmed: false });
      }
      changed = true;
    } catch (error) {
      console.warn('⚠️ [reservations] auto-close standalone failed for', reservationId, error);
    }
  }

  if (changed) {
    try { await refreshReservationsFromApi(); } catch (_) {}
    try { document.dispatchEvent(new CustomEvent('reservations:changed')); } catch (_) {}
    try { runSharedRefresh(); } catch (_) {}
  }

  return closedCount > 0;
}
