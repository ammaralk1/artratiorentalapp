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
  updateReservationApi
} from '../reservationsService.js';
import { resolveReservationProjectState } from '../reservationsShared.js';
import { state } from './state.js';
import { renderProjects, renderFocusCards, updateSummary } from './view.js';

export async function removeProject(projectId) {
  const index = state.projects.findIndex((project) => String(project.id) === String(projectId));
  if (index === -1) return;
  if (!window.confirm(t('projects.confirm.delete', 'هل أنت متأكد من حذف هذا المشروع؟'))) return;

  try {
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
    showToast(t('projects.toast.deleted', '🗑️ تم حذف المشروع'));
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

  const shouldBePaid = paymentStatus === 'paid';
  const desiredStatusValue = shouldBePaid ? 'paid' : 'unpaid';
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
