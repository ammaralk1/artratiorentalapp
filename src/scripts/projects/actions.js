import { t } from '../language.js';
import { showToast } from '../utils.js';
import { loadData } from '../storage.js';
import {
  deleteProjectApi,
  getProjectsState,
  isApiError as isProjectApiError,
  refreshProjectsFromApi
} from '../projectsService.js';
import {
  getReservationsState,
  refreshReservationsFromApi,
  updateReservationApi,
  deleteReservationApi
} from '../reservationsService.js';
import { resolveReservationProjectState } from '../reservationsShared.js';
import { state } from './state.js';
import { renderProjects, renderFocusCards, updateSummary } from './view.js';

export async function removeProject(projectId) {
  const index = state.projects.findIndex((project) => String(project.id) === String(projectId));
  if (index === -1) return;
  // احسب عدد الحجوزات المرتبطة بالمشروع لإظهار تحذير أوضح قبل الحذف
  let linkedCount = 0;
  try {
    const currentReservations = getReservationsState();
    linkedCount = (currentReservations || []).filter((r) => String(r.projectId) === String(projectId)).length;
  } catch (_) { /* ignore */ }

  const cascadeMsg = linkedCount > 0
    ? t('projects.confirm.deleteCascade', `⚠️ سيتم حذف المشروع وجميع الحجوزات المرتبطة به (${linkedCount}). هل أنت متأكد؟`)
    : t('projects.confirm.delete', 'هل أنت متأكد من حذف هذا المشروع؟');

  if (!window.confirm(cascadeMsg)) return;

  try {
    // احذف الحجوزات المرتبطة أولاً (إن وجدت) ثم احذف المشروع
    try {
      const currentReservations = getReservationsState();
      const linked = (currentReservations || []).filter((r) => String(r.projectId) === String(projectId));
      for (const res of linked) {
        const resId = res.id ?? res.reservationId ?? res.reservation_code;
        if (!resId) continue;
        try { await deleteReservationApi(resId); } catch (e) { console.warn('⚠️ failed to delete linked reservation', resId, e); }
      }
    } catch (e) { /* ignore */ }

    await deleteProjectApi(projectId);
    await refreshProjectsFromApi();
    await refreshReservationsFromApi();

    state.projects = getProjectsState();
    state.reservations = getReservationsState();

    renderProjects();
    updateSummary();
    renderFocusCards();

    document.dispatchEvent(new CustomEvent('projects:changed'));
    document.dispatchEvent(new CustomEvent('reservations:changed'));
    showToast(t('projects.toast.deleted', '🗑️ تم حذف المشروع والحجوزات المرتبطة به'));
  } catch (error) {
    console.error('❌ [projects] removeProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.deleteFailed', 'تعذر حذف المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

export async function updateLinkedReservationsPaymentStatus(projectId, paymentStatus) {
  if (!projectId) return false;

  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));

  if (!targets.length) {
    return false;
  }

  const normalizedStatus = typeof paymentStatus === 'string' ? paymentStatus.toLowerCase() : 'unpaid';
  const shouldBePaid = normalizedStatus === 'paid';
  const desiredStatusValue = shouldBePaid
    ? 'paid'
    : normalizedStatus === 'partial'
      ? 'partial'
      : 'unpaid';
  let changed = false;

  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;

    const currentPaidNormalized = reservation.paid === true || reservation.paid === 'paid';
    const currentStatusValue = reservation.paidStatus || reservation.paymentStatus || (currentPaidNormalized ? 'paid' : 'unpaid');

    if (currentPaidNormalized === shouldBePaid && currentStatusValue === desiredStatusValue) {
      continue;
    }

    await updateReservationApi(reservationId, {
      paid_status: desiredStatusValue,
      paid: shouldBePaid,
    });
    changed = true;
  }

  if (changed) {
    state.reservations = getReservationsState();
  }

  return changed;
}

export async function updateLinkedReservationsConfirmation(projectId) {
  if (!projectId) return false;

  const reservations = getReservationsState();
  const project = state.projects.find((entry) => String(entry.id) === String(projectId))
    || (loadData().projects || []).find?.((entry) => String(entry.id) === String(projectId))
    || null;
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));

  if (!targets.length) {
    return false;
  }

  let changed = false;

  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    const stateMeta = resolveReservationProjectState({ ...reservation, projectId }, project);
    if (stateMeta.effectiveConfirmed) {
      continue;
    }
    const statusUpdate = project?.status ?? stateMeta.projectStatus ?? 'confirmed';
    await updateReservationApi(reservationId, {
      confirmed: true,
      status: statusUpdate
    });
    changed = true;
  }

  if (changed) {
    state.reservations = getReservationsState();
  }

  return changed;
}

export async function handleProjectReservationSync(projectId, paymentStatus) {
  if (!projectId) return false;
  const reservationsUpdated = await updateLinkedReservationsPaymentStatus(projectId, paymentStatus);
  if (reservationsUpdated) {
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
  return reservationsUpdated;
}

export async function updateLinkedReservationsCancelled(projectId) {
  if (!projectId) return false;
  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
  if (!targets.length) return false;
  let changed = false;
  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    try {
      await updateReservationApi(reservationId, { status: 'cancelled', cancelled: true });
      changed = true;
    } catch (e) {
      console.warn('[projects] failed to cancel linked reservation', reservationId, e);
    }
  }
  if (changed) {
    state.reservations = getReservationsState();
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
  return changed;
}
