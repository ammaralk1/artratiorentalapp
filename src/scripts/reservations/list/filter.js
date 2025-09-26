import { normalizeText, isReservationCompleted } from '../../reservationsShared.js';

export function filterReservationEntries({ reservations = [], filters = {}, customersMap, techniciansMap, projectsMap }) {
  const entries = reservations.map((reservation, index) => ({ reservation, index }));

  const searchTerm = filters.searchTerm || '';
  const searchReservationIdTerm = filters.searchReservationId || '';
  const searchCustomerNameTerm = filters.searchCustomerName || '';
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
    const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
    const completed = isReservationCompleted(reservation);

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

    if (statusFilter === 'confirmed' && !confirmed) return false;
    if (statusFilter === 'pending' && confirmed) return false;
    if (statusFilter === 'completed' && !completed) return false;

    if (startDateObj && reservationStart && reservationStart < startDateObj) return false;
    if (endDateObj && reservationStart && reservationStart > endDateObj) return false;

    if (searchReservationIdTerm) {
      const reservationIdText = normalizeText(
        [reservation.reservationId, reservation.id]
          .filter(Boolean)
          .map(String)
          .join(' ')
      );
      if (!reservationIdText.includes(searchReservationIdTerm)) return false;
    }

    if (searchCustomerNameTerm) {
      const customerNameText = normalizeText(customer?.customerName || '');
      if (!customerNameText.includes(searchCustomerNameTerm)) return false;
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
    const aCompleted = isReservationCompleted(a.reservation);
    const bCompleted = isReservationCompleted(b.reservation);
    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }

    const aStart = a.reservation.start ? new Date(a.reservation.start).getTime() : 0;
    const bStart = b.reservation.start ? new Date(b.reservation.start).getTime() : 0;
    return bStart - aStart;
  });

  return filtered;
}
