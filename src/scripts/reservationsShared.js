import { normalizeNumbers } from './utils.js';

export function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

export function isReservationCompleted(reservation) {
  if (!reservation?.end) return false;
  const end = new Date(reservation.end);
  if (Number.isNaN(end.getTime())) return false;
  const now = new Date();
  return end < now;
}

export function normalizeProjectStatus(value = '') {
  const normalized = String(value ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'confirmed':
    case 'مؤكد':
      return 'confirmed';
    case 'in_progress':
    case 'in-progress':
    case 'قيد التنفيذ':
    case 'جاري':
      return 'in_progress';
    case 'completed':
    case 'مكتمل':
      return 'completed';
    case 'cancelled':
    case 'ملغي':
      return 'cancelled';
    case 'pending':
    case 'draft':
    case 'قيد الانتظار':
    case 'بانتظار التأكيد':
    case 'معلق':
    default:
      return 'pending';
  }
}

export function resolveReservationProjectState(reservation = {}, project = null) {
  const reservationConfirmed = reservation?.confirmed === true || reservation?.confirmed === 'true';
  const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
  const projectLinked = projectId != null && projectId !== '' && projectId !== 'null';
  const projectStatus = projectLinked ? normalizeProjectStatus(project?.status ?? project?.status_label ?? project?.statusLabel ?? '') : null;
  const projectConfirmed = projectLinked
    && (project?.confirmed === true || ['confirmed', 'in_progress', 'completed'].includes(projectStatus));
  const effectiveConfirmed = projectLinked ? projectConfirmed : reservationConfirmed;

  return {
    reservationConfirmed,
    projectLinked,
    projectStatus,
    projectConfirmed,
    effectiveConfirmed,
  };
}
