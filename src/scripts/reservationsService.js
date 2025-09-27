import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';

let reservationsState = (loadData().reservations || []).map(mapLegacyReservation);

export function getReservationsState() {
  return reservationsState;
}

export function setReservationsState(reservations) {
  reservationsState = Array.isArray(reservations)
    ? reservations.map(toInternalReservation)
    : [];
  saveData({ reservations: reservationsState });
  return reservationsState;
}

export async function refreshReservationsFromApi(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  const response = await apiRequest(`/reservations/${query ? `?${query}` : ''}`);
  const data = Array.isArray(response?.data) ? response.data.map(mapReservationFromApi) : [];
  return setReservationsState(data);
}

export async function createReservationApi(payload) {
  const response = await apiRequest('/reservations/', {
    method: 'POST',
    body: payload,
  });
  const created = mapReservationFromApi(response?.data ?? {});
  setReservationsState([...reservationsState, created]);
  return created;
}

export async function updateReservationApi(id, payload) {
  const response = await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapReservationFromApi(response?.data ?? {});
  const next = reservationsState.map((reservation) =>
    String(reservation.id) === String(id) ? updated : reservation
  );
  setReservationsState(next);
  return updated;
}

export async function deleteReservationApi(id) {
  await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  const next = reservationsState.filter((reservation) => String(reservation.id) !== String(id));
  setReservationsState(next);
}

export async function confirmReservationApi(id) {
  return updateReservationApi(id, { status: 'confirmed', confirmed: true });
}

export function mapReservationFromApi(raw = {}) {
  return toInternalReservation({
    id: raw.id,
    reservationId: raw.reservation_code ?? raw.reservationId,
    reservation_code: raw.reservation_code,
    customer_id: raw.customer_id,
    customerId: raw.customer_id,
    customer_name: raw.customer_name,
    customerName: raw.customer_name,
    title: raw.title,
    start: raw.start_datetime,
    end: raw.end_datetime,
    start_datetime: raw.start_datetime,
    end_datetime: raw.end_datetime,
    status: raw.status,
    confirmed: raw.confirmed,
    location: raw.location,
    notes: raw.notes,
    total_amount: raw.total_amount,
    project_id: raw.project_id,
    discount: raw.discount,
    discount_type: raw.discount_type,
    apply_tax: raw.apply_tax,
    paid_status: raw.paid_status,
    items: raw.items,
    technicians: raw.technicians,
  });
}

export function mapLegacyReservation(raw = {}) {
  return toInternalReservation(raw);
}

export function toInternalReservation(raw = {}) {
  const idValue = raw.id ?? raw.reservation_id ?? raw.reservationId ?? null;
  const reservationCode = raw.reservation_code ?? raw.reservationCode ?? raw.reservationId ?? (idValue != null ? `RSV-${idValue}` : null);

  const items = Array.isArray(raw.items)
    ? raw.items.map(mapReservationItem)
    : [];

  const technicianEntries = Array.isArray(raw.technicians) ? raw.technicians : [];
  const technicianIds = technicianEntries.map((entry) => {
    if (entry == null) return null;
    if (typeof entry === 'object') {
      return String(entry.id ?? entry.technician_id ?? entry.technicianId ?? entry.ID ?? '');
    }
    return String(entry);
  }).filter((value) => value && value !== '');

  const start = raw.start ?? raw.start_datetime ?? '';
  const end = raw.end ?? raw.end_datetime ?? '';

  const totalAmount = toNumber(raw.total_amount ?? raw.totalAmount ?? raw.cost ?? 0);
  const discount = toNumber(raw.discount ?? 0);
  const discountType = raw.discount_type ?? raw.discountType ?? 'percent';
  const applyTax = Boolean(raw.apply_tax ?? raw.applyTax ?? false);
  const paidStatus = normalisePaidStatus(raw.paid_status ?? raw.paidStatus ?? (raw.paid === true || raw.paid === 'paid' ? 'paid' : 'unpaid')) ?? 'unpaid';
  const confirmed = raw.confirmed != null
    ? Boolean(raw.confirmed)
    : ['confirmed', 'in_progress', 'completed'].includes(String(raw.status ?? '').toLowerCase());

  return {
    id: idValue != null ? String(idValue) : '',
    reservationId: reservationCode ?? (idValue != null ? String(idValue) : ''),
    reservationCode: reservationCode ?? null,
    customerId: raw.customer_id ?? raw.customerId ?? raw.customer?.id ?? null,
    customerName: raw.customer_name ?? raw.customerName ?? raw.customer?.full_name ?? raw.customer?.customerName ?? '',
    title: raw.title ?? raw.name ?? '',
    start,
    end,
    status: normalizeStatusValue(raw.status ?? (confirmed ? 'confirmed' : 'pending')),
    confirmed,
    location: raw.location ?? '',
    notes: raw.notes ?? '',
    discount,
    discountType: ['percent', 'amount'].includes(discountType) ? discountType : 'percent',
    applyTax,
    paid: paidStatus === 'paid',
    paidStatus,
    totalAmount,
    cost: totalAmount,
    projectId: raw.project_id ?? raw.projectId ?? null,
    items,
    technicians: technicianIds,
    techniciansDetails: technicianEntries.map((entry) => (typeof entry === 'object' ? entry : { id: Number(entry) || entry })),
    startDatetime: start,
    endDatetime: end,
    customerPhone: raw.customer_phone ?? raw.customerPhone ?? null,
  };
}

export function mapReservationItem(item = {}) {
  const equipmentId = item.equipment_id ?? item.equipmentId ?? item.id ?? item.item_id ?? null;
  const quantity = toPositiveInt(item.quantity ?? item.qty ?? 1);
  const unitPrice = toNumber(item.unit_price ?? item.price ?? 0);

  return {
    id: equipmentId != null ? String(equipmentId) : '',
    equipmentId,
    barcode: normalizeNumbers(String(item.barcode ?? item.code ?? '')),
    desc: item.description ?? item.desc ?? item.name ?? '',
    qty: quantity,
    price: unitPrice,
    notes: item.notes ?? null,
    image: item.image ?? item.image_url ?? null,
  };
}

export function buildReservationPayload({
  reservationCode,
  customerId,
  start,
  end,
  status,
  title,
  location,
  notes,
  projectId,
  totalAmount,
  discount,
  discountType,
  applyTax,
  paidStatus,
  confirmed,
  items,
  technicians,
}) {
  return {
    reservation_code: reservationCode ?? null,
    customer_id: customerId,
    start_datetime: start,
    end_datetime: end,
    status: status ?? 'pending',
    title: title ?? null,
    location: location ?? null,
    notes: notes ?? null,
    project_id: projectId || null,
    total_amount: totalAmount ?? 0,
    discount: discount ?? 0,
    discount_type: discountType ?? 'percent',
    apply_tax: applyTax ? 1 : 0,
    paid_status: paidStatus ?? 'unpaid',
    confirmed: confirmed === undefined ? null : Boolean(confirmed),
    items: Array.isArray(items)
      ? items.map((item) => ({
          equipment_id: item.equipmentId ?? item.equipment_id ?? item.id,
          quantity: toPositiveInt(item.qty ?? item.quantity ?? 1),
          unit_price: toNumber(item.price ?? item.unit_price ?? 0),
          notes: item.notes ?? null,
        }))
      : [],
    technicians: Array.isArray(technicians)
      ? technicians.map((tech) => {
          if (typeof tech === 'object' && tech !== null) {
            return {
              id: tech.id ?? tech.technician_id ?? tech.technicianId ?? tech.ID,
              role: tech.role ?? null,
              notes: tech.notes ?? null,
            };
          }
          return Number.isNaN(Number(tech)) ? String(tech) : Number(tech);
        })
      : [],
  };
}

function toNumber(value) {
  const num = Number(normalizeNumbers(String(value ?? '0')));
  return Number.isFinite(num) ? Number(num.toFixed(2)) : 0;
}

function toPositiveInt(value) {
  const num = Number.parseInt(normalizeNumbers(String(value ?? '1')), 10);
  if (!Number.isFinite(num) || num <= 0) return 1;
  return num;
}

function normalizeStatusValue(status) {
  const normalized = String(status ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'pending':
    case 'معلق':
    case 'قيد الانتظار':
      return 'pending';
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
    default:
      return 'pending';
  }
}

function normalisePaidStatus(status) {
  if (status == null) return null;
  const normalized = String(status).trim().toLowerCase();
  switch (normalized) {
    case 'paid':
    case 'مدفوع':
      return 'paid';
    case 'partial':
    case 'مدفوع جزئياً':
    case 'partial_paid':
      return 'partial';
    case 'unpaid':
    case 'غير مدفوع':
    case 'not_paid':
    default:
      return 'unpaid';
  }
}

export function isApiError(error) {
  return error instanceof ApiError;
}

