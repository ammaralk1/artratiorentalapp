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
