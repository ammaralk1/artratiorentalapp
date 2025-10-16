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
  const raw = String(value).trim();
  if (!raw) return { date: '', time: '' };

  let normalized = raw;
  if (normalized.includes(' ') && !normalized.includes('T')) {
    normalized = normalized.replace(' ', 'T');
  }

  const [rawDate = '', rawTime = ''] = normalized.split('T');
  const date = rawDate ? rawDate.slice(0, 10) : '';
  const timeMatch = rawTime.match(/(\d{1,2}:\d{2})/);
  let time = '';
  if (timeMatch) {
    const [hours = '00', minutes = '00'] = timeMatch[0].split(':');
    time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  return { date, time };
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
  const ignoreIdentifiers = buildReservationIdentifierSet(ignoreReservationId);

  return reservations.some((reservation) => {
    if (!reservation || !Array.isArray(reservation.items) || reservation.items.length === 0) {
      return false;
    }

    if (shouldIgnoreReservationByIdentifiers(reservation, ignoreIdentifiers)) {
      return false;
    }

    if (!reservation.start || !reservation.end) return false;

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    return reservation.items.some((item) => normalizeBarcodeValue(item?.barcode) === normalizedCode);
  });
}

export function hasTechnicianConflict(technicianId, startIso, endIso, ignoreReservationId = null) {
  if (!technicianId || !startIso || !endIso) return false;

  const start = new Date(startIso);
  const end = new Date(endIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const { reservations = [] } = loadData();
  const normalizedId = String(technicianId);
  const ignoreIdentifiers = buildReservationIdentifierSet(ignoreReservationId);

  return reservations.some((reservation) => {
    if (!reservation?.start || !reservation?.end) return false;

    if (shouldIgnoreReservationByIdentifiers(reservation, ignoreIdentifiers)) {
      return false;
    }

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    return assigned.some((assignedId) => String(assignedId) === normalizedId);
  });
}

export function resetState() {
  selectedItems = [];
  resetCachedData();
}

function buildReservationIdentifierSet(source) {
  return collectNormalizedIdentifiers(source, new Set());
}

function shouldIgnoreReservationByIdentifiers(reservation, ignoreIdentifiers) {
  if (!ignoreIdentifiers || ignoreIdentifiers.size === 0) {
    return false;
  }

  const reservationIdentifiers = collectNormalizedIdentifiers(
    [
      reservation?.id,
      reservation?.reservationId,
      reservation?.reservation_id,
      reservation?.reservationCode,
      reservation?.reservation_code,
      reservation?.uuid,
      reservation?.UUID,
      reservation?._id,
    ],
    new Set()
  );

  for (const identifier of reservationIdentifiers) {
    if (ignoreIdentifiers.has(identifier)) {
      return true;
    }
  }

  return false;
}

function collectNormalizedIdentifiers(source, accumulator) {
  if (source == null) {
    return accumulator;
  }

  if (source instanceof Set) {
    source.forEach((value) => collectNormalizedIdentifiers(value, accumulator));
    return accumulator;
  }

  if (Array.isArray(source)) {
    source.forEach((value) => collectNormalizedIdentifiers(value, accumulator));
    return accumulator;
  }

  if (typeof source === 'object') {
    const candidateKeys = [
      'id',
      'reservationId',
      'reservation_id',
      'reservationCode',
      'reservation_code',
      'uuid',
      'UUID',
      '_id',
    ];

    let matchedKey = false;
    candidateKeys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        matchedKey = true;
        collectNormalizedIdentifiers(source[key], accumulator);
      }
    });

    if (!matchedKey) {
      Object.values(source).forEach((value) => collectNormalizedIdentifiers(value, accumulator));
    }

    return accumulator;
  }

  const rawValue = normalizeNumbers(String(source ?? '')).trim();
  if (!rawValue) {
    return accumulator;
  }

  const variants = [rawValue, rawValue.toLowerCase(), rawValue.toUpperCase()];
  const digits = rawValue.replace(/\D+/g, '');

  if (digits) {
    variants.push(digits);
    const numeric = Number.parseInt(digits, 10);
    if (!Number.isNaN(numeric)) {
      variants.push(String(numeric));
    }
  }

  variants.forEach((value) => {
    if (value) {
      accumulator.add(value);
    }
  });

  return accumulator;
}
