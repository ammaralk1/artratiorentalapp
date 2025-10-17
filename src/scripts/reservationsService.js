import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculateDraftFinancialBreakdown,
  calculatePaymentProgress,
  determinePaymentStatus,
} from './reservationsSummary.js';

const initialReservationsData = loadData() || {};
let reservationsState = (initialReservationsData.reservations || []).map(mapLegacyReservation);

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
  const payload = response?.data;

  let rawItems = [];
  if (Array.isArray(payload)) {
    rawItems = payload;
  } else if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.items)) {
      rawItems = payload.items;
    } else if (Array.isArray(payload.results)) {
      rawItems = payload.results;
    } else if (Array.isArray(payload.data)) {
      rawItems = payload.data;
    } else if (Array.isArray(payload.records)) {
      rawItems = payload.records;
    }
  }

  const data = rawItems.map(mapReservationFromApi);
  return setReservationsState(data);
}

export async function createReservationApi(payload) {
  const response = await apiRequest('/reservations/', {
    method: 'POST',
    body: payload,
  });
  const created = mapReservationFromApi(response?.data ?? {});
  if (!Number.isFinite(created.companySharePercent) && payload?.company_share_percent != null) {
    created.companySharePercent = Number(payload.company_share_percent) || 0;
  }
  if ((!Array.isArray(created.paymentHistory) || created.paymentHistory.length === 0) && Array.isArray(payload?.payment_history)) {
    const fallbackHistory = normalizePaymentHistoryCollection(payload.payment_history);
    if (fallbackHistory.length) {
      created.paymentHistory = fallbackHistory;
    }
  }
  if (created.companySharePercent > 0 && (!Number.isFinite(created.companyShareAmount) || created.companyShareAmount <= 0)) {
    const breakdown = calculateDraftFinancialBreakdown({
      items: created.items || [],
      technicianIds: created.technicians || [],
      discount: created.discount,
      discountType: created.discountType,
      applyTax: created.applyTax,
      start: created.start,
      end: created.end,
      companySharePercent: created.companySharePercent
    });
    created.companyShareAmount = breakdown.companyShareAmount;
    created.cost = breakdown.finalTotal;
    created.totalAmount = breakdown.finalTotal;
  }
  created.companyShareEnabled = payload?.company_share_enabled ? true : created.companySharePercent > 0;
  setReservationsState([...reservationsState, created]);
  return created;
}

export async function updateReservationApi(id, payload) {
  const response = await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapReservationFromApi(response?.data ?? {});
  if (!Number.isFinite(updated.companySharePercent) && payload?.company_share_percent != null) {
    updated.companySharePercent = Number(payload.company_share_percent) || 0;
  }
  if ((!Array.isArray(updated.paymentHistory) || updated.paymentHistory.length === 0) && Array.isArray(payload?.payment_history)) {
    const fallbackHistory = normalizePaymentHistoryCollection(payload.payment_history);
    if (fallbackHistory.length) {
      updated.paymentHistory = fallbackHistory;
    }
  }
  if (updated.companySharePercent > 0 && (!Number.isFinite(updated.companyShareAmount) || updated.companyShareAmount <= 0)) {
    const breakdown = calculateDraftFinancialBreakdown({
      items: updated.items || [],
      technicianIds: updated.technicians || [],
      discount: updated.discount,
      discountType: updated.discountType,
      applyTax: updated.applyTax,
      start: updated.start,
      end: updated.end,
      companySharePercent: updated.companySharePercent
    });
    updated.companyShareAmount = breakdown.companyShareAmount;
    updated.cost = breakdown.finalTotal;
    updated.totalAmount = breakdown.finalTotal;
  }
  updated.companyShareEnabled = payload?.company_share_enabled ? true : updated.companySharePercent > 0;
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
    company_share_percent: raw.company_share_percent ?? raw.companySharePercent ?? raw.company_share ?? raw.companyShare,
    company_share_enabled: raw.company_share_enabled ?? raw.companyShareEnabled ?? raw.company_share_applied ?? raw.companyShareApplied,
    company_share_amount: raw.company_share_amount ?? raw.companyShareAmount,
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

  let totalAmount = toNumber(raw.total_amount ?? raw.totalAmount ?? raw.cost ?? 0);
  const discount = toNumber(raw.discount ?? 0);
  const discountType = raw.discount_type ?? raw.discountType ?? 'percent';
  const normalizedDiscountType = ['percent', 'amount'].includes(discountType) ? discountType : 'percent';
  const applyTax = Boolean(raw.apply_tax ?? raw.applyTax ?? false);
  let paidStatus = normalisePaidStatus(raw.paid_status ?? raw.paidStatus ?? (raw.paid === true || raw.paid === 'paid' ? 'paid' : 'unpaid')) ?? 'unpaid';
  const confirmed = raw.confirmed != null
    ? Boolean(raw.confirmed)
    : ['confirmed', 'in_progress', 'completed'].includes(String(raw.status ?? '').toLowerCase());

  const rawCompanySharePercent = raw.company_share_percent
    ?? raw.companySharePercent
    ?? raw.company_share
    ?? raw.companyShare
    ?? null;
  const parsedCompanySharePercent = rawCompanySharePercent != null
    ? Number.parseFloat(normalizeNumbers(String(rawCompanySharePercent).replace('%', '').trim()))
    : NaN;
  const shareEnabledRaw = raw.company_share_enabled
    ?? raw.companyShareEnabled
    ?? raw.company_share_applied
    ?? raw.companyShareApplied
    ?? null;
  let companyShareEnabled = shareEnabledRaw != null
    ? (shareEnabledRaw === true || shareEnabledRaw === 1 || shareEnabledRaw === '1' || String(shareEnabledRaw).toLowerCase() === 'true')
    : Number.isFinite(parsedCompanySharePercent) && parsedCompanySharePercent > 0;
  let companySharePercent = companyShareEnabled && Number.isFinite(parsedCompanySharePercent)
    ? Number(parsedCompanySharePercent)
    : 0;
  const companyShareAmountRaw = raw.company_share_amount ?? raw.companyShareAmount;
  let companyShareAmount = Number.isFinite(Number(companyShareAmountRaw))
    ? Number(companyShareAmountRaw)
    : NaN;
  if (applyTax && companySharePercent <= 0) {
    companySharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
    companyShareEnabled = true;
  }

  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds,
    discount,
    discountType: normalizedDiscountType,
    applyTax,
    start,
    end,
    companySharePercent: companySharePercent > 0 ? companySharePercent : null
  });

  if (!Number.isFinite(totalAmount) || totalAmount <= 0 || applyTax) {
    totalAmount = breakdown.finalTotal;
  }

  if (!Number.isFinite(companyShareAmount) || companyShareAmount < 0) {
    companyShareAmount = breakdown.companyShareAmount;
  }
  companyShareAmount = Number.isFinite(companyShareAmount)
    ? Number(companyShareAmount.toFixed(2))
    : 0;

  if (!companyShareEnabled && companySharePercent > 0) {
    companyShareEnabled = true;
  }

  const candidateHistories = [
    raw.payment_history,
    raw.paymentHistory,
    raw.payments,
    raw.payment_records,
    raw.paymentRecords,
    raw.payment_logs,
    raw.paymentLogs,
    raw.paymenthistory,
    raw.paymentHistoryList,
    raw.payment,
  ];

  const rawHistory = extractPaymentHistoryFromCandidates(candidateHistories);
  const paymentHistory = normalizePaymentHistoryCollection(rawHistory);

  const paymentProgress = calculatePaymentProgress({
    totalAmount,
    progressType: raw.payment_progress_type ?? raw.paymentProgressType ?? null,
    progressValue: raw.payment_progress_value ?? raw.paymentProgressValue ?? null,
    paidAmount: raw.paid_amount ?? raw.paidAmount ?? null,
    paidPercent: raw.paid_percentage ?? raw.paidPercentage ?? null,
    history: paymentHistory,
  });
  paidStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount,
  });
  const paid = paidStatus === 'paid';

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
    discountType: normalizedDiscountType,
    applyTax,
    paid,
    paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    paymentHistory,
    payment_history: paymentHistory,
    totalAmount,
    cost: totalAmount,
    projectId: raw.project_id ?? raw.projectId ?? null,
    items,
    technicians: technicianIds,
    techniciansDetails: technicianEntries.map((entry) => (typeof entry === 'object' ? entry : { id: Number(entry) || entry })),
    startDatetime: start,
    endDatetime: end,
    customerPhone: raw.customer_phone ?? raw.customerPhone ?? null,
    companySharePercent,
    companyShareAmount,
    companyShareEnabled,
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
  companySharePercent,
  companyShareEnabled,
  paidAmount,
  paidPercentage,
  paymentProgressType,
  paymentProgressValue,
  paymentHistory,
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
    paid_amount: Number.isFinite(paidAmount) ? toNumber(paidAmount) : 0,
    paid_percentage: Number.isFinite(paidPercentage) ? Number(paidPercentage.toFixed(2)) : 0,
    payment_progress_type: paymentProgressType ?? null,
    payment_progress_value: Number.isFinite(paymentProgressValue)
      ? Number(paymentProgressValue.toFixed(2))
      : null,
    payment_history: Array.isArray(paymentHistory)
      ? paymentHistory.map((entry) => ({
          type: normalizePaymentType(entry?.type ?? entry?.payment_type ?? entry?.method ?? entry?.paymentMethod),
          value: entry?.value != null ? toNumber(entry.value) : null,
          amount: entry?.amount != null ? toNumber(entry.amount) : (entry?.payment_amount != null ? toNumber(entry.payment_amount) : null),
          percentage: entry?.percentage != null
            ? Number(entry.percentage)
            : (entry?.payment_percentage != null ? Number(entry.payment_percentage) : null),
          note: entry?.note ?? entry?.notes ?? entry?.comment ?? entry?.payment_note ?? null,
          recorded_at: entry?.recordedAt
            ?? entry?.recorded_at
            ?? entry?.createdAt
            ?? entry?.created_at
            ?? entry?.payment_date
            ?? entry?.date
            ?? new Date().toISOString(),
        }))
      : [],
    payments: Array.isArray(paymentHistory)
      ? paymentHistory.map((entry) => ({
          type: normalizePaymentType(entry?.type ?? entry?.payment_type ?? entry?.method ?? entry?.paymentMethod),
          value: entry?.value != null ? toNumber(entry.value) : null,
          amount: entry?.amount != null ? toNumber(entry.amount) : (entry?.payment_amount != null ? toNumber(entry.payment_amount) : null),
          percentage: entry?.percentage != null
            ? Number(entry.percentage)
            : (entry?.payment_percentage != null ? Number(entry.payment_percentage) : null),
          note: entry?.note ?? entry?.notes ?? entry?.comment ?? entry?.payment_note ?? null,
          recorded_at: entry?.recordedAt
            ?? entry?.recorded_at
            ?? entry?.createdAt
            ?? entry?.created_at
            ?? entry?.payment_date
            ?? entry?.date
            ?? new Date().toISOString(),
        }))
      : [],
    confirmed: confirmed === undefined ? null : Boolean(confirmed),
    items: Array.isArray(items)
      ? items.map((item) => ({
          equipment_id: item.equipmentId ?? item.equipment_id ?? item.id,
          quantity: toPositiveInt(item.qty ?? item.quantity ?? 1),
          unit_price: toNumber(item.price ?? item.unit_price ?? 0),
          notes: item.notes ?? null,
        }))
      : [],
    company_share_percent: companyShareEnabled && Number.isFinite(companySharePercent)
      ? Number(companySharePercent)
      : null,
    company_share_enabled: companyShareEnabled ? 1 : 0,
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

function normalizePaymentHistoryCollection(source) {
  const collection = extractPaymentHistorySource(source);
  if (!Array.isArray(collection) || collection.length === 0) {
    return [];
  }

  return collection
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }

      const rawType = entry.type
        ?? entry.payment_type
        ?? entry.paymentType
        ?? entry.method
        ?? entry.paymentMethod
        ?? entry.kind
        ?? null;
      const type = normalizePaymentType(rawType);

      const valueCandidate = entry.value
        ?? entry.payment_value
        ?? entry.paymentValue
        ?? entry.amount
        ?? entry.payment_amount
        ?? entry.percentage
        ?? entry.payment_percentage
        ?? null;

      const valueRaw = valueCandidate != null ? Number.parseFloat(normalizeNumbers(String(valueCandidate))) : null;
      const amountRaw = entry.amount != null
        ? Number.parseFloat(normalizeNumbers(String(entry.amount)))
        : (entry.payment_amount != null ? Number.parseFloat(normalizeNumbers(String(entry.payment_amount))) : null);
      const percentRaw = entry.percentage != null
        ? Number.parseFloat(normalizeNumbers(String(entry.percentage)))
        : (entry.payment_percentage != null ? Number.parseFloat(normalizeNumbers(String(entry.payment_percentage))) : null);

      const resolvedAmount = Number.isFinite(amountRaw)
        ? amountRaw
        : (type === 'amount' && Number.isFinite(valueRaw) ? valueRaw : null);

      const resolvedPercent = Number.isFinite(percentRaw)
        ? percentRaw
        : (type === 'percent' && Number.isFinite(valueRaw) ? valueRaw : null);

      const resolvedType = type
        ?? (resolvedAmount != null ? 'amount' : (resolvedPercent != null ? 'percent' : null));

      const resolvedValue = resolvedType === 'amount'
        ? resolvedAmount
        : resolvedType === 'percent'
          ? resolvedPercent
          : Number.isFinite(valueRaw) ? valueRaw : null;

      const note = entry.note ?? entry.notes ?? entry.comment ?? entry.payment_note ?? null;
      const recordedAt = entry.recordedAt
        ?? entry.recorded_at
        ?? entry.payment_date
        ?? entry.date
        ?? entry.createdAt
        ?? entry.created_at
        ?? null;

      return {
        type: resolvedType,
        value: resolvedValue,
        amount: resolvedAmount,
        percentage: resolvedPercent,
        note,
        recordedAt,
      };
    })
    .filter((entry) => entry && entry.type);
}

function normalizePaymentType(value) {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (['amount', 'fixed', 'cash', 'value', 'money', 'sar', 'riyals'].includes(normalized)) {
    return 'amount';
  }
  if (['percent', 'percentage', 'ratio'].includes(normalized)) {
    return 'percent';
  }
  return null;
}

function extractPaymentHistorySource(source) {
  if (Array.isArray(source)) {
    return source;
  }

  if (source && typeof source === 'object') {
    const directArrayKeys = [
      'data',
      'items',
      'records',
      'history',
      'list',
      'entries',
      'payment_history',
      'paymentHistory',
      'payment_records',
      'paymentRecords',
      'payments',
      'payment',
    ];

    for (const key of directArrayKeys) {
      if (Array.isArray(source[key])) {
        return source[key];
      }
    }

    const candidates = [
      source.data,
      source.items,
      source.records,
      source.history,
      source.list,
      source.entries,
      source.payment_history,
      source.paymentHistory,
      source.payment_records,
      source.paymentRecords,
      source.payments,
      source.payment,
    ];
    const nested = candidates.find((entry) => Array.isArray(entry));
    if (Array.isArray(nested)) {
      return nested;
    }

    const valueArray = Object.values(source);
    if (valueArray.length && valueArray.every((value) => value && typeof value === 'object')) {
      const maybeArray = valueArray.map((value) => value);
      if (maybeArray.every((value) => !Array.isArray(value))) {
        return maybeArray;
      }
    }

    const singleEntryKeys = [
      'amount',
      'payment_amount',
      'value',
      'payment_value',
      'percentage',
      'payment_percentage',
      'type',
      'payment_type',
      'method',
      'paymentMethod',
    ];
    if (singleEntryKeys.some((key) => key in source)) {
      return [source];
    }
  }

  if (typeof source === 'string') {
    try {
      const parsed = JSON.parse(source);
      return extractPaymentHistorySource(parsed);
    } catch (error) {
      return [];
    }
  }

  return [];
}

function extractPaymentHistoryFromCandidates(candidates = []) {
  if (!Array.isArray(candidates)) return [];
  for (const candidate of candidates) {
    const extracted = extractPaymentHistorySource(candidate);
    if (Array.isArray(extracted) && extracted.length) {
      return extracted;
    }
  }
  return [];
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
