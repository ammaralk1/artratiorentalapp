import { loadData } from '../storage.js';
import { normalizeNumbers } from '../utils.js';
import { categorizeMaintenanceStatus } from '../maintenanceService.js';

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
  if (start >= end) return false;

  const normalizedCode = normalizeBarcodeValue(barcode);
  if (!normalizedCode) return false;

  const snapshot = loadData() || {};
  const reservations = Array.isArray(snapshot.reservations) ? snapshot.reservations : [];
  const maintenance = Array.isArray(snapshot.maintenance) ? snapshot.maintenance : [];
  const equipmentList = Array.isArray(snapshot.equipment) ? snapshot.equipment : [];
  const equipmentIndex = buildEquipmentIndexById(equipmentList);
  const ignoreIdentifiers = buildReservationIdentifierSet(ignoreReservationId);

  const reservationConflict = reservations.some((reservation) => {
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

  if (reservationConflict) {
    return true;
  }

  return maintenance.some((ticket) =>
    doesMaintenanceTicketConflict(ticket, normalizedCode, start, end, equipmentIndex)
  );
}

function doesMaintenanceTicketConflict(ticket, normalizedBarcode, windowStart, windowEnd, equipmentIndex) {
  if (!ticket) return false;
  if (!isMaintenanceTicketBlocking(ticket)) return false;

  const ticketBarcodes = resolveMaintenanceTicketBarcodes(ticket, equipmentIndex);
  if (!ticketBarcodes.has(normalizedBarcode)) return false;

  const { start, end } = resolveMaintenanceInterval(ticket);
  const effectiveStart = start ?? new Date(0);

  if (effectiveStart >= windowEnd) {
    return false;
  }

  if (end && end <= windowStart) {
    return false;
  }

  return true;
}

function isMaintenanceTicketBlocking(ticket) {
  const statusCandidates = [
    ticket?.statusRaw,
    ticket?.status,
    ticket?.status_label,
    ticket?.statusLabel,
  ];

  for (const candidate of statusCandidates) {
    const category = categorizeMaintenanceStatus(candidate);
    const normalized = String(category || candidate || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');
    if (!normalized) continue;

    if (
      normalized === 'completed' ||
      normalized === 'cancelled' ||
      normalized === 'closed' ||
      normalized === 'resolved' ||
      normalized === 'done' ||
      normalized === 'finished'
    ) {
      return false;
    }

    if (
      normalized === 'open' ||
      normalized === 'in_progress' ||
      normalized === 'in-progress' ||
      normalized === 'inprogress' ||
      normalized === 'pending' ||
      normalized === 'scheduled' ||
      normalized === 'active'
    ) {
      return true;
    }

    if (
      normalized.includes('complete') ||
      normalized.includes('close') ||
      normalized.includes('cancel') ||
      normalized.includes('finish') ||
      normalized.includes('resolve')
    ) {
      return false;
    }

    if (
      normalized.includes('progress') ||
      normalized.includes('open') ||
      normalized.includes('ongoing')
    ) {
      return true;
    }
  }

  return true;
}

function resolveMaintenanceTicketBarcodes(ticket, equipmentIndex) {
  const barcodes = new Set();

  const directCandidates = [
    ticket?.equipmentBarcode,
    ticket?.equipment_barcode,
    ticket?.barcode,
  ];

  directCandidates.forEach((value) => {
    const normalized = normalizeBarcodeValue(value);
    if (normalized) {
      barcodes.add(normalized);
    }
  });

  const equipmentObject = ticket?.equipment && typeof ticket.equipment === 'object' ? ticket.equipment : null;
  if (equipmentObject) {
    const equipmentBarcode = normalizeBarcodeValue(
      equipmentObject.barcode ??
        equipmentObject.equipmentBarcode ??
        equipmentObject.code ??
        equipmentObject.serial ??
        equipmentObject.serialNumber ??
        equipmentObject.serial_number
    );
    if (equipmentBarcode) {
      barcodes.add(equipmentBarcode);
    }
  }

  const equipmentIdCandidates = [
    ticket?.equipmentId,
    ticket?.equipment_id,
    equipmentObject?.id,
    equipmentObject?.equipmentId,
    equipmentObject?.equipment_id,
  ];

  equipmentIdCandidates
    .map((value) => (value != null ? String(value) : ''))
    .filter(Boolean)
    .forEach((key) => {
      const record = equipmentIndex.get(key);
      if (!record) return;
      const recordBarcode = normalizeBarcodeValue(
        record?.barcode ??
          record?.equipmentBarcode ??
          record?.code ??
          record?.serial ??
          record?.serialNumber ??
          record?.serial_number
      );
      if (recordBarcode) {
        barcodes.add(recordBarcode);
      }
    });

  return barcodes;
}

function resolveMaintenanceInterval(ticket) {
  const start = parseFirstValidDate([
    ticket?.scheduledAt,
    ticket?.scheduled_at,
    ticket?.startAt,
    ticket?.start_at,
    ticket?.reportedAt,
    ticket?.reported_at,
    ticket?.createdAt,
    ticket?.created_at,
    ticket?.startDate,
    ticket?.start_date,
  ]);

  const end = parseFirstValidDate([
    ticket?.resolvedAt,
    ticket?.resolved_at,
    ticket?.closedAt,
    ticket?.closed_at,
    ticket?.completedAt,
    ticket?.completed_at,
    ticket?.endAt,
    ticket?.end_at,
    ticket?.endDate,
    ticket?.end_date,
    ticket?.expectedCompletionAt,
    ticket?.expected_completion_at,
    ticket?.dueAt,
    ticket?.due_at,
  ]);

  return { start, end };
}

function parseFirstValidDate(candidates = []) {
  for (const candidate of candidates) {
    const parsed = parseDateSafe(candidate);
    if (parsed) {
      return parsed;
    }
  }
  return null;
}

function parseDateSafe(value) {
  if (!value) return null;
  if (value instanceof Date) {
    const timestamp = value.getTime();
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function buildEquipmentIndexById(list) {
  const index = new Map();
  if (!Array.isArray(list)) {
    return index;
  }

  list.forEach((item) => {
    if (!item || typeof item !== 'object') return;

    const idCandidates = [
      item?.id,
      item?.ID,
      item?.equipment_id,
      item?.equipmentId,
      item?.item_id,
      item?.itemId,
      item?.uuid,
      item?.UUID,
    ];

    idCandidates
      .map((value) => (value != null ? String(value) : ''))
      .filter(Boolean)
      .forEach((key) => {
        if (!index.has(key)) {
          index.set(key, item);
        }
      });
  });

  return index;
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
