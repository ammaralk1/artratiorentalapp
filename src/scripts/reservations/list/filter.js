import { normalizeText, isReservationCompleted, resolveReservationProjectState } from '../../reservationsShared.js';

function parseIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  const timestamp = date.getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

function extractNumericIdentifier(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  const raw = String(value).trim();
  if (!raw) return null;
  const matches = raw.match(/(\d+)/g);
  if (!matches || matches.length === 0) return null;
  const lastMatch = matches[matches.length - 1];
  const parsed = Number.parseInt(lastMatch, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function resolveReservationSequence(reservation) {
  const candidates = [
    reservation?.reservationId,
    reservation?.reservation_id,
    reservation?.id,
  ];
  for (const candidate of candidates) {
    const numeric = extractNumericIdentifier(candidate);
    if (numeric !== null) {
      return numeric;
    }
  }
  return null;
}

function resolveReservationSortKey(reservation, fallbackIndex = 0) {
  const sequence = resolveReservationSequence(reservation);
  if (sequence != null) return sequence;

  const created = parseIsoDate(reservation.createdAt ?? reservation.created_at);
  if (created != null) return created;

  const updated = parseIsoDate(reservation.updatedAt ?? reservation.updated_at);
  if (updated != null) return updated;

  const start = parseIsoDate(reservation.start);
  if (start != null) return start;

  const end = parseIsoDate(reservation.end);
  if (end != null) return end;

  const numericId = Number(reservation.id ?? reservation.reservationId);
  if (Number.isFinite(numericId)) return numericId;

  return Number.isFinite(fallbackIndex) ? fallbackIndex : 0;
}

export function filterReservationEntries({ reservations = [], filters = {}, customersMap, techniciansMap, projectsMap }) {
  const entries = reservations.map((reservation, index) => ({ reservation, index }));

  const searchTerm = filters.searchTerm || '';
  const searchReservationIdTerm = filters.searchReservationId || '';
  const searchCustomerNameTerm = filters.searchCustomerName || '';
  const searchProjectTerm = filters.searchProjectId || '';
  const startDate = filters.startDate || '';
  const endDate = filters.endDate || '';
  const statusFilter = filters.status || '';
  const customerIdFilter = Object.prototype.hasOwnProperty.call(filters, 'customerId') ? filters.customerId : null;
  const technicianIdFilter = Object.prototype.hasOwnProperty.call(filters, 'technicianId') ? filters.technicianId : null;

  const startDateObj = startDate ? new Date(`${startDate}T00:00:00`) : null;
  const endDateObj = endDate ? new Date(`${endDate}T23:59:59`) : null;

  const filtered = entries.filter(({ reservation }) => {
    const customer = customersMap.get(String(reservation.customerId));
    const project = projectsMap?.get?.(String(reservation.projectId));
    const reservationStart = reservation.start ? new Date(reservation.start) : null;
    const completed = isReservationCompleted(reservation);
    const { effectiveConfirmed } = resolveReservationProjectState(reservation, project);

    if (customerIdFilter != null && String(reservation.customerId) !== String(customerIdFilter)) {
      return false;
    }

    if (technicianIdFilter != null) {
      const assignedIds = Array.isArray(reservation.technicians)
        ? reservation.technicians.map((id) => String(id))
        : [];
      if (!assignedIds.includes(String(technicianIdFilter))) {
        return false;
      }
    }

    if (statusFilter === 'confirmed' && !effectiveConfirmed) return false;
    if (statusFilter === 'pending' && effectiveConfirmed) return false;
    if (statusFilter === 'completed' && !completed) return false;
    if (statusFilter === 'cancelled') {
      const rawStatus = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
      if (!['cancelled', 'canceled'].includes(rawStatus)) return false;
    }

    if (startDateObj && reservationStart && reservationStart < startDateObj) return false;
    if (endDateObj && reservationStart && reservationStart > endDateObj) return false;

    if (searchReservationIdTerm) {
      const reservationIdCandidates = [
        reservation.reservationId,
        reservation.id,
        reservation.reservation_id,
        reservation.reservationCode,
        reservation.reservation_code,
        reservation.code,
        reservation.reference,
        reservation.referenceNumber,
        reservation.reference_number
      ];
      const reservationIdText = normalizeText(
        reservationIdCandidates
          .filter((value) => value !== null && value !== undefined && value !== '')
          .map(String)
          .join(' ')
      ).replace(/\s+/g, '');
      const reservationIdSearch = searchReservationIdTerm.replace(/\s+/g, '');
      if (!reservationIdText.includes(reservationIdSearch)) return false;
    }

    if (searchCustomerNameTerm) {
      const customerNameText = normalizeText(customer?.customerName || '');
      if (!customerNameText.includes(searchCustomerNameTerm)) return false;
    }

    if (searchProjectTerm) {
      const projectCandidates = [
        reservation.projectId,
        reservation.project_id,
        reservation.projectID,
        project?.id,
        project?.projectCode,
        project?.project_code
      ];
      const projectText = normalizeText(
        projectCandidates
          .filter((value) => value !== null && value !== undefined && value !== '')
          .map(String)
          .join(' ')
      ).replace(/\s+/g, '');
      const projectSearch = searchProjectTerm.replace(/\s+/g, '');
      if (!projectText.includes(projectSearch)) return false;
    }

    if (!searchTerm) return true;

    const itemsText = reservation.items?.map?.((item) => `${item.barcode} ${item.desc}`).join(' ') || '';
    const techniciansText = (reservation.technicians || [])
      .map((id) => techniciansMap.get(String(id))?.name)
      .filter(Boolean)
      .join(' ');

    const haystack = normalizeText([
      reservation.reservationId,
      customer?.customerName,
      reservation.notes,
      itemsText,
      techniciansText,
      project?.title
    ].filter(Boolean).join(' '));

    return haystack.includes(searchTerm);
  });

  filtered.sort((a, b) => {
    const aKey = resolveReservationSortKey(a.reservation, a.index);
    const bKey = resolveReservationSortKey(b.reservation, b.index);
    if (aKey !== bKey) {
      return bKey - aKey;
    }
    return b.index - a.index;
  });

  return filtered;
}
