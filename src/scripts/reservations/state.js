import { loadData } from '../storage.js';
import { normalizeNumbers } from '../utils.js';
import {
  findPackageById,
  findPackagesContainingBarcode,
  summarizePackageItems,
  normalizePackageId as normalizePackageIdentifier,
} from '../reservationsPackages.js';

let selectedItems = [];
let cachedCustomers = [];
let cachedEquipment = [];
let cachedPackages = [];
let equipmentBookingMode = 'single';

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

export function getCachedPackages() {
  return cachedPackages;
}

export function setCachedPackages(packages) {
  cachedPackages = Array.isArray(packages) ? packages : [];
}

export function getEquipmentBookingMode() {
  return equipmentBookingMode === 'package' ? 'package' : 'single';
}

export function setEquipmentBookingMode(mode) {
  equipmentBookingMode = mode === 'package' ? 'package' : 'single';
}

export function resetCachedData() {
  cachedCustomers = [];
  cachedEquipment = [];
  cachedPackages = [];
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

const MAX_DATE_MS = 8640000000000000;

function parseDateFlexible(input) {
  if (!input && input !== 0) return null;

  if (input instanceof Date) {
    const timestamp = input.getTime();
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  if (typeof input === 'number') {
    if (!Number.isFinite(input)) return null;
    const date = new Date(input);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  let raw = String(input ?? '').trim();
  if (!raw) return null;

  if (/^\d+$/.test(raw)) {
    const numeric = Number(raw);
    if (Number.isFinite(numeric)) {
      const byNumber = new Date(numeric);
      if (!Number.isNaN(byNumber.getTime())) {
        return byNumber;
      }
    }
  }

  if (!raw.includes('T') && raw.includes(' ')) {
    const firstSpace = raw.indexOf(' ');
    raw = `${raw.slice(0, firstSpace)}T${raw.slice(firstSpace + 1).trimStart()}`;
  } else if (raw.includes(' ')) {
    raw = raw.replace(' ', 'T');
  }

  const direct = new Date(raw);
  if (!Number.isNaN(direct.getTime())) {
    return direct;
  }

  if (!raw.endsWith('Z') && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(raw)) {
    const utc = new Date(`${raw}Z`);
    if (!Number.isNaN(utc.getTime())) {
      return utc;
    }
  }

  return null;
}

export function hasEquipmentConflict(barcode, startIso, endIso, ignoreReservationId = null) {
  if (!barcode || !startIso || !endIso) return false;

  const start = parseDateFlexible(startIso);
  const end = parseDateFlexible(endIso);
  if (!start || !end) return false;
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
    if (!reservation) {
      return false;
    }

    if (shouldIgnoreReservationByIdentifiers(reservation, ignoreIdentifiers)) {
      return false;
    }

    if (!reservation.start || !reservation.end) return false;

    // Exclude cancelled reservations from conflict checks
    const statusValue = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (statusValue === 'cancelled' || statusValue === 'canceled') return false;

    const resStart = parseDateFlexible(reservation.start);
    const resEnd = parseDateFlexible(reservation.end);
    if (!resStart || !resEnd) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    return doesReservationContainBarcode(reservation, normalizedCode);
  });

  if (reservationConflict) {
    return true;
  }

  return maintenance.some((ticket) => {
    if (!isMaintenanceTicketBlocking(ticket)) {
      return false;
    }

    const ticketBarcodes = resolveMaintenanceTicketBarcodes(ticket, equipmentIndex);
    if (!ticketBarcodes.has(normalizedCode)) {
      return false;
    }

    const { start: maintenanceStart, end: maintenanceEnd } = resolveMaintenanceInterval(ticket);

    if (!maintenanceStart && !maintenanceEnd) {
      return true;
    }

    const effectiveStart = maintenanceStart ?? new Date(0);
    const effectiveEnd = maintenanceEnd ?? new Date(MAX_DATE_MS);

    return effectiveStart < end && effectiveEnd > start;
  });
}

export function hasPackageConflict(packageId, startIso, endIso, ignoreReservationId = null) {
  const normalizedId = normalizePackageIdentifier(packageId);
  if (!normalizedId || !startIso || !endIso) return false;

  const start = parseDateFlexible(startIso);
  const end = parseDateFlexible(endIso);
  if (!start || !end) return false;
  if (start >= end) return false;

  const snapshot = loadData() || {};
  const reservations = Array.isArray(snapshot.reservations) ? snapshot.reservations : [];
  const ignoreIdentifiers = buildReservationIdentifierSet(ignoreReservationId);

  return reservations.some((reservation) => {
    if (!reservation?.start || !reservation?.end) return false;
    if (shouldIgnoreReservationByIdentifiers(reservation, ignoreIdentifiers)) {
      return false;
    }
    const statusValue = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (statusValue === 'cancelled' || statusValue === 'canceled') return false;

    const resStart = parseDateFlexible(reservation.start);
    const resEnd = parseDateFlexible(reservation.end);
    if (!resStart || !resEnd) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    return doesReservationContainPackage(reservation, normalizedId);
  });
}

export function getBlockingPackagesForEquipment(barcode, startIso, endIso, ignoreReservationId = null) {
  const normalizedCode = normalizeBarcodeValue(barcode);
  if (!normalizedCode || !startIso || !endIso) return [];

  const matchingPackages = findPackagesContainingBarcode(normalizedCode);
  if (!matchingPackages.length) {
    return [];
  }

  return matchingPackages.filter((pkg) =>
    hasPackageConflict(pkg.id, startIso, endIso, ignoreReservationId)
  );
}

function collectReservationItemCollections(reservation) {
  const collections = [];
  if (!reservation || typeof reservation !== 'object') {
    return collections;
  }

  const candidateKeys = [
    'items',
    'equipment',
    'packages',
    'packageItems',
    'package_items',
    'reservedItems',
    'reserved_items',
  ];

  candidateKeys.forEach((key) => {
    const value = reservation[key];
    if (Array.isArray(value) && value.length) {
      collections.push(value);
    }
  });

  return collections;
}

function doesReservationContainBarcode(reservation, normalizedBarcode) {
  if (!normalizedBarcode) {
    return false;
  }

  if (!reservation || typeof reservation !== 'object') {
    return false;
  }

  const reservationBarcode = normalizeBarcodeValue(reservation?.barcode);
  if (reservationBarcode && reservationBarcode === normalizedBarcode) {
    return true;
  }

  const collections = collectReservationItemCollections(reservation);

  for (const collection of collections) {
    for (const item of collection) {
      const barcodes = resolveReservationItemBarcodes(item);
      if (barcodes.has(normalizedBarcode)) {
        return true;
      }
    }
  }

  return false;
}

function doesReservationContainPackage(reservation, normalizedPackageId) {
  if (!normalizedPackageId) {
    return false;
  }

  if (!reservation || typeof reservation !== 'object') {
    return false;
  }

  const directCandidates = [
    reservation.packageId,
    reservation.package_id,
    reservation.bundleId,
    reservation.bundle_id,
    reservation.packageCode,
    reservation.package_code,
  ];

  for (const candidate of directCandidates) {
    if (!candidate && candidate !== 0) continue;
    const normalized = normalizePackageIdentifier(candidate);
    if (normalized && normalized === normalizedPackageId) {
      return true;
    }
  }

  const topLevelPackages = reservation.packages;
  if (Array.isArray(topLevelPackages)) {
    for (const entry of topLevelPackages) {
      const normalized = normalizePackageIdentifier(entry);
      if (normalized && normalized === normalizedPackageId) {
        return true;
      }
    }
  }

  const collections = collectReservationItemCollections(reservation);

  for (const collection of collections) {
    for (const item of collection) {
      const packageIds = resolveReservationItemPackageIds(item);
      if (packageIds.has(normalizedPackageId)) {
        return true;
      }
    }
  }

  return false;
}

function resolveReservationItemBarcodes(item) {
  const barcodes = new Set();

  if (!item && item !== 0) {
    return barcodes;
  }

  if (typeof item === 'string' || typeof item === 'number') {
    const normalized = normalizeBarcodeValue(item);
    if (normalized) {
      barcodes.add(normalized);
    }
    return barcodes;
  }

  if (typeof item !== 'object') {
    return barcodes;
  }

  const directBarcode = normalizeBarcodeValue(
    item.barcode
      ?? item.equipmentBarcode
      ?? item.code
      ?? item.serial
      ?? item.serialNumber
      ?? item.serial_number
  );

  if (directBarcode) {
    barcodes.add(directBarcode);
  }

  const nestedKeys = ['packageItems', 'package_items', 'items', 'equipment', 'bundleItems', 'bundle_items'];
  nestedKeys.forEach((key) => {
    const value = item[key];
    if (!Array.isArray(value)) return;
    value.forEach((nested) => {
      if (nested == null) return;
      if (typeof nested === 'string' || typeof nested === 'number') {
        const normalized = normalizeBarcodeValue(nested);
        if (normalized) {
          barcodes.add(normalized);
        }
        return;
      }
      if (typeof nested === 'object') {
        const nestedBarcode = normalizeBarcodeValue(
          nested.barcode
            ?? nested.equipmentBarcode
            ?? nested.code
            ?? nested.serial
            ?? nested.serialNumber
            ?? nested.serial_number
        );
        if (nestedBarcode) {
          barcodes.add(nestedBarcode);
        }
      }
    });
  });

  const packageIds = resolveReservationItemPackageIds(item);
  if (packageIds.size) {
    packageIds.forEach((packageId) => {
      const packageDefinition = findPackageById(packageId);
      if (!packageDefinition) {
        return;
      }
      const packageItems = summarizePackageItems(packageDefinition);
      packageItems.forEach((packageItem) => {
        const normalized = packageItem.normalizedBarcode
          ?? normalizeBarcodeValue(packageItem.barcode);
        if (normalized) {
          barcodes.add(normalized);
        }
      });
    });
  }

  return barcodes;
}

function resolveReservationItemPackageIds(item) {
  const packageIds = new Set();

  if (!item && item !== 0) {
    return packageIds;
  }

  if (typeof item === 'string' || typeof item === 'number') {
    return packageIds;
  }

  if (typeof item !== 'object') {
    return packageIds;
  }

  const directCandidates = [
    item.packageId,
    item.package_id,
    item.packageCode,
    item.package_code,
    item.bundleId,
    item.bundle_id,
  ];

  if (item.type === 'package' || item.kind === 'package' || item.category === 'package') {
    directCandidates.push(item.id, item.code, item.uuid);
  }

  directCandidates.forEach((candidate) => {
    const normalized = normalizePackageIdentifier(candidate);
    if (normalized) {
      packageIds.add(normalized);
    }
  });

  if (item.package && typeof item.package === 'object') {
    const nested = resolveReservationItemPackageIds(item.package);
    nested.forEach((value) => packageIds.add(value));
  }

  if (Array.isArray(item.packages)) {
    item.packages.forEach((candidate) => {
      const normalized = normalizePackageIdentifier(candidate);
      if (normalized) {
        packageIds.add(normalized);
      }
    });
  }

  return packageIds;
}

function isMaintenanceTicketBlocking(ticket) {
  const statusCandidates = [
    ticket?.statusRaw,
    ticket?.status_raw,
    ticket?.status,
    ticket?.statusLabel,
    ticket?.status_label,
  ];

  if (hasMaintenanceTicketResolved(ticket)) {
    return false;
  }

  for (const candidate of statusCandidates) {
    const normalized = normalizeMaintenanceStatus(candidate);

    if (!normalized) {
      continue;
    }

    if (normalized === 'completed' || normalized === 'cancelled' || normalized === 'closed') {
      return false;
    }

    if (normalized === 'open' || normalized === 'in_progress') {
      return true;
    }
  }

  return true;
}

function normalizeMaintenanceStatus(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');

  if (!normalized) {
    return '';
  }

  if (
    normalized === 'completed' ||
    normalized === 'done' ||
    normalized === 'finished' ||
    normalized === 'resolved' ||
    normalized === 'closed' ||
    normalized === 'مكتمل' ||
    normalized === 'مغلق'
  ) {
    return 'completed';
  }

  if (normalized === 'cancelled' || normalized === 'canceled' || normalized === 'ملغي') {
    return 'cancelled';
  }

  if (
    normalized === 'in_progress' ||
    normalized === 'in-progress' ||
    normalized === 'قيد_التنفيذ' ||
    normalized === 'جاري_العمل' ||
    normalized === 'inprogress'
  ) {
    return 'in_progress';
  }

  if (
    normalized === 'open' ||
    normalized === 'قيد_الصيانة' ||
    normalized === 'قيد_الانتظار' ||
    normalized === 'pending' ||
    normalized === 'scheduled' ||
    normalized === 'active'
  ) {
    return 'open';
  }

  if (
    normalized.includes('progress') ||
    normalized.includes('ongoing') ||
    normalized.includes('تنفيذ')
  ) {
    return 'in_progress';
  }

  if (
    normalized.includes('close') ||
    normalized.includes('complete') ||
    normalized.includes('finish') ||
    normalized.includes('resolve')
  ) {
    return 'completed';
  }

  if (normalized.includes('cancel')) {
    return 'cancelled';
  }

  return 'open';
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
    ticket?.startDate,
    ticket?.start_date,
    ticket?.reportedAt,
    ticket?.reported_at,
    ticket?.createdAt,
    ticket?.created_at,
  ]);

  const end = parseFirstValidDate([
    ticket?.resolvedAt,
    ticket?.resolved_at,
    ticket?.closedAt,
    ticket?.closed_at,
    ticket?.completedAt,
    ticket?.completed_at,
    ticket?.finishedAt,
    ticket?.finished_at,
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

function hasMaintenanceTicketResolved(ticket) {
  return Boolean(
    parseFirstValidDate([
      ticket?.resolvedAt,
      ticket?.resolved_at,
      ticket?.closedAt,
      ticket?.closed_at,
      ticket?.completedAt,
      ticket?.completed_at,
      ticket?.finishedAt,
      ticket?.finished_at,
      ticket?.endAt,
      ticket?.end_at,
      ticket?.endDate,
      ticket?.end_date,
      ticket?.expectedCompletionAt,
      ticket?.expected_completion_at,
      ticket?.dueAt,
      ticket?.due_at,
    ])
  );
}

function parseFirstValidDate(candidates = []) {
  for (const candidate of candidates) {
    const parsed = parseDateFlexible(candidate);
    if (parsed) {
      return parsed;
    }
  }
  return null;
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

    const statusValue = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (statusValue === 'cancelled' || statusValue === 'canceled') return false;

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    const overlaps = resStart < end && resEnd > start;
    if (!overlaps) return false;

    const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    return assigned.some((assignedId) => String(assignedId) === normalizedId);
  });
}

export function getTechnicianConflictingReservationCodes(technicianId, startIso, endIso, ignoreReservationId = null) {
  if (!technicianId || !startIso || !endIso) return [];

  const start = parseDateFlexible(startIso);
  const end = parseDateFlexible(endIso);
  if (!start || !end || start >= end) return [];

  const { reservations = [] } = loadData();
  const normalizedId = String(technicianId);
  const ignoreIdentifiers = buildReservationIdentifierSet(ignoreReservationId);

  const codes = [];

  reservations.forEach((reservation) => {
    if (!reservation?.start || !reservation?.end) return;
    if (shouldIgnoreReservationByIdentifiers(reservation, ignoreIdentifiers)) return;

    const statusValue = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (statusValue === 'cancelled' || statusValue === 'canceled') return;

    const resStart = parseDateFlexible(reservation.start);
    const resEnd = parseDateFlexible(reservation.end);
    if (!resStart || !resEnd) return;
    if (!(resStart < end && resEnd > start)) return;

    const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    if (!assigned.some((assignedId) => String(assignedId) === normalizedId)) return;

    const code = reservation.reservationCode || reservation.reservation_code || null;
    if (code) {
      codes.push(String(code));
    } else if (reservation.id != null || reservation.reservationId != null) {
      const rid = reservation.id ?? reservation.reservationId;
      codes.push(`#${String(rid)}`);
    }
  });

  // Unique preserve order
  return Array.from(new Set(codes));
}

export function resetState() {
  selectedItems = [];
  resetCachedData();
  equipmentBookingMode = 'single';
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
