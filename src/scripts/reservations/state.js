import { loadData } from '../storage.js';
import { normalizeNumbers } from '../utils.js';

let selectedItems = [];
let cachedCustomers = [];
let cachedEquipment = [];

export function getSelectedItems() {
  return selectedItems;
}

export function setSelectedItems(items) {
  selectedItems = Array.isArray(items) ? items : [];
}

export function addSelectedItem(item) {
  selectedItems = [...selectedItems, item];
}

export function removeSelectedItem(index) {
  if (Number.isInteger(index) && index >= 0) {
    selectedItems = selectedItems.filter((_, idx) => idx !== index);
  }
}

export function getCachedCustomers() {
  return cachedCustomers;
}

export function setCachedCustomers(customers) {
  cachedCustomers = Array.isArray(customers) ? customers : [];
}

export function getCachedEquipment() {
  return cachedEquipment;
}

export function setCachedEquipment(equipment) {
  cachedEquipment = Array.isArray(equipment) ? equipment : [];
}

export function resetCachedData() {
  cachedCustomers = [];
  cachedEquipment = [];
}

export function splitDateTime(value) {
  if (!value) return { date: '', time: '' };
  const [date = '', time = ''] = value.split('T');
  const trimmedTime = time ? time.slice(0, 5) : '';
  return { date, time: trimmedTime };
}

export function combineDateTime(date, time) {
  if (!date) return '';
  const safeTime = time && time.length ? time : '00:00';
  return `${date}T${safeTime}`;
}

export function normalizeBarcodeValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function hasEquipmentConflict(barcode, startIso, endIso, ignoreReservationId = null) {
  if (!barcode || !startIso || !endIso) return false;

  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const { reservations = [] } = loadData();
  const normalizedCode = normalizeBarcodeValue(barcode);

  return reservations.some(reservation => {
    if (!reservation || !reservation.items || reservation.items.length === 0) return false;

    if (
      ignoreReservationId &&
      (String(reservation.id) === String(ignoreReservationId) ||
        String(reservation.reservationId) === String(ignoreReservationId))
    ) {
      return false;
    }

    if (!reservation.start || !reservation.end) return false;

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    return reservation.items.some(item => normalizeBarcodeValue(item?.barcode) === normalizedCode);
  });
}

export function hasTechnicianConflict(technicianId, startIso, endIso, ignoreReservationId = null) {
  if (!technicianId || !startIso || !endIso) return false;

  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const { reservations = [] } = loadData();
  const normalizedId = String(technicianId);

  return reservations.some(reservation => {
    if (!reservation?.start || !reservation?.end) return false;

    if (
      ignoreReservationId &&
      (String(reservation.id) === String(ignoreReservationId) ||
        String(reservation.reservationId) === String(ignoreReservationId))
    ) {
      return false;
    }

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    return assigned.some(assignedId => String(assignedId) === normalizedId);
  });
}

export function resetState() {
  selectedItems = [];
  resetCachedData();
}
