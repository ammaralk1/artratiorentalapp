import { t } from '../language.js';
import { showToast } from '../utils.js';
import { loadData } from '../storage.js';
import {
  deleteProjectApi,
  getProjectsState,
  isApiError as isProjectApiError,
  refreshProjectsFromApi,
  closeProjectApi,
  updateProjectApi
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

function normalizeScheduleTimestamp(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value).trim();
  }
  return date.toISOString();
}

function getReservationScheduleValue(reservation = {}, field) {
  if (field === 'start') {
    return reservation.start ?? reservation.start_datetime ?? reservation.startDatetime ?? '';
  }
  return reservation.end ?? reservation.end_datetime ?? reservation.endDatetime ?? '';
}

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

/**
 * Update start/end date-time for all reservations linked to a project.
 * - Skips reservations with status 'completed' or 'cancelled'.
 * - Only sends fields that are present to avoid backend validation issues.
 */
export async function updateLinkedReservationsSchedule(projectId, { start = null, end = null } = {}) {
  if (!projectId) return false;

  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
  if (!targets.length) return false;

  let changed = false;
  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    const statusRaw = String(reservation.status || '').toLowerCase();
    if (statusRaw === 'completed' || statusRaw === 'cancelled' || statusRaw === 'canceled') {
      continue;
    }

    const updates = {};
    if (start && normalizeScheduleTimestamp(getReservationScheduleValue(reservation, 'start')) !== normalizeScheduleTimestamp(start)) {
      updates.start_datetime = start;
    }
    if (end && normalizeScheduleTimestamp(getReservationScheduleValue(reservation, 'end')) !== normalizeScheduleTimestamp(end)) {
      updates.end_datetime = end;
    }
    if (Object.keys(updates).length === 0) continue;

    try {
      await updateReservationApi(reservationId, updates);
      changed = true;
    } catch (e) {
      console.warn('[projects] failed to update linked reservation schedule', reservationId, e);
    }
  }

  if (changed) {
    state.reservations = getReservationsState();
    try { document.dispatchEvent(new CustomEvent('reservations:changed')); } catch (_) {}
  }
  return changed;
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

export async function updateLinkedReservationsUnconfirmation(projectId) {
  if (!projectId) return false;

  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));

  if (!targets.length) {
    return false;
  }

  let changed = false;

  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    const statusRaw = String(reservation.status || '').toLowerCase();
    if (statusRaw === 'completed' || statusRaw === 'cancelled' || statusRaw === 'canceled') {
      continue;
    }
    const alreadyPending = (reservation.confirmed === false || reservation.confirmed === 'false') && (statusRaw === 'pending' || statusRaw === '');
    if (alreadyPending) continue;
    await updateReservationApi(reservationId, {
      confirmed: false,
      status: 'pending'
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

export async function updateLinkedReservationsReopenFromCancelled(projectId, options = {}) {
  if (!projectId) return false;
  const { status, confirmed } = options;
  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
  if (!targets.length) return false;

  const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : '';
  const statusToSet = (() => {
    if (normalizedStatus === 'completed' || normalizedStatus === 'closed') return 'completed';
    if (normalizedStatus === 'ongoing' || normalizedStatus === 'in_progress' || normalizedStatus === 'in-progress') {
      return confirmed ? 'in_progress' : 'pending';
    }
    if (normalizedStatus === 'upcoming') return confirmed ? 'confirmed' : 'pending';
    return confirmed ? 'confirmed' : 'pending';
  })();

  let changed = false;
  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    const statusRaw = String(reservation.status || '').toLowerCase();
    if (statusRaw !== 'cancelled' && statusRaw !== 'canceled') continue;
    try {
      await updateReservationApi(reservationId, {
        status: statusToSet,
        cancelled: false,
        confirmed: confirmed === undefined ? false : Boolean(confirmed)
      });
      changed = true;
    } catch (e) {
      console.warn('[projects] failed to reopen cancelled reservation', reservationId, e);
    }
  }
  if (changed) {
    state.reservations = getReservationsState();
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
  return changed;
}

export async function updateLinkedReservationsClosed(projectId) {
  if (!projectId) return false;
  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
  if (!targets.length) return false;
  let changed = false;
  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    try {
      await updateReservationApi(reservationId, { status: 'completed', confirmed: true });
      changed = true;
    } catch (e) {
      console.warn('[projects] failed to close linked reservation', reservationId, e);
    }
  }
  if (changed) {
    state.reservations = getReservationsState();
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
  return changed;
}

export async function updateLinkedReservationsReopened(projectId) {
  if (!projectId) return false;
  const reservations = getReservationsState();
  const targets = reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
  if (!targets.length) return false;
  let changed = false;
  for (const reservation of targets) {
    const reservationId = reservation.id ?? reservation.reservationId;
    if (!reservationId) continue;
    try {
      // Reopen to confirmed (unless cancelled), do not override schedule
      const statusRaw = String(reservation.status || '').toLowerCase();
      if (statusRaw === 'cancelled' || statusRaw === 'canceled') continue;
      const alreadyConfirmed = reservation.confirmed === true || reservation.confirmed === 'true';
      const alreadyOpenConfirmedStatus = ['confirmed', 'in_progress', 'in-progress', 'ongoing'].includes(statusRaw);
      if (alreadyConfirmed && alreadyOpenConfirmedStatus) continue;
      await updateReservationApi(reservationId, { status: 'confirmed', confirmed: true });
      changed = true;
    } catch (e) {
      console.warn('[projects] failed to reopen linked reservation', reservationId, e);
    }
  }
  if (changed) {
    state.reservations = getReservationsState();
    document.dispatchEvent(new CustomEvent('reservations:changed'));
  }
  return changed;
}

/**
 * Mirror project status/confirmation to linked reservations.
 */
export async function syncLinkedReservationsWithProject(project) {
  if (!project) return false;
  const projectId = project.projectId ?? project.id;
  if (!projectId) return false;

  const statusRaw = String(project.status || '').toLowerCase();
  const isCancelled = statusRaw === 'cancelled' || statusRaw === 'canceled';
  const isClosed = statusRaw === 'completed' || statusRaw === 'closed';
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';

  if (isCancelled) {
    return updateLinkedReservationsCancelled(projectId);
  }

  if (isClosed) {
    return updateLinkedReservationsClosed(projectId);
  }

  if (isConfirmed) {
    // For ongoing/upcoming confirmed projects, ensure reservations are confirmed/reopened
    const reopened = await updateLinkedReservationsReopened(projectId);
    if (!reopened) {
      return updateLinkedReservationsConfirmation(projectId);
    }
    return reopened;
  }

  // Not confirmed: push reservations back to pending/unconfirmed
  return updateLinkedReservationsUnconfirmation(projectId);
}

/**
 * Auto-close projects whose end time has passed and are not yet marked completed/cancelled.
 * Adds an auto-close note and mirrors the close to linked reservations.
 */
export async function autoCloseExpiredProjects() {
  const projects = getProjectsState();
  if (!Array.isArray(projects) || projects.length === 0) return false;

  const now = new Date();
  let changed = false;
  let closedCount = 0;
  let cancelledCount = 0;

  for (const project of projects) {
    try {
      const statusRaw = String(project?.status || '').toLowerCase();
      if (statusRaw === 'completed' || statusRaw === 'closed' || statusRaw === 'cancelled' || statusRaw === 'canceled') {
        continue;
      }
      const end = project?.end ? new Date(project.end) : null;
      if (!end || Number.isNaN(end.getTime())) continue;
      if (end >= now) continue;

      const isConfirmed = project.confirmed === true || project.confirmed === 'true';

      if (!isConfirmed) {
        // لم يتم تأكيد المشروع قبل انتهاء الوقت: اعتبره ملغى
        const updated = await updateProjectApi(project.projectId ?? project.id, { status: 'cancelled', cancelled: true, confirmed: false });
        const pid = updated?.projectId ?? updated?.id ?? project.id;
        await updateLinkedReservationsCancelled(pid);
        changed = true;
        cancelledCount += 1;
        continue;
      }

      // Close confirmed projects and mirror to reservations
      const note = t('projects.autoClose.note', 'إغلاق تلقائي لانتهاء وقت المشروع');
      const updated = await closeProjectApi(project.projectId ?? project.id, note);
      const pid = updated?.projectId ?? updated?.id ?? project.id;
      await updateLinkedReservationsClosed(pid);
      changed = true;
      closedCount += 1;
    } catch (e) {
      console.warn('[projects] autoCloseExpiredProjects failed for', project?.id, e);
    }
  }

  if (changed) {
    try { await refreshProjectsFromApi(); } catch (_) {}
    try { await refreshReservationsFromApi(); } catch (_) {}
    try { document.dispatchEvent(new CustomEvent('projects:changed')); } catch (_) {}
    try { document.dispatchEvent(new CustomEvent('reservations:changed')); } catch (_) {}
    try {
      const parts = [];
      if (closedCount > 0) {
        parts.push(t('projects.toast.autoClosed', 'تم إغلاق {count} مشروع لانتهاء الوقت').replace('{count}', String(closedCount)));
      }
      if (cancelledCount > 0) {
        const cancelMsg = t('projects.toast.autoCancelled', 'تم إلغاء {count} مشروع لانتهاء الوقت بدون تأكيد').replace('{count}', String(cancelledCount));
        parts.push(cancelMsg);
      }
      const msg = parts.join(' • ');
      showToast(msg);
    } catch (_) { /* optional toast */ }
  }
  return changed;
}
