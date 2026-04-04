import { normalizeNumbers } from '../../utils.js';
import { sanitizePriceValue } from './utils.js';

export function normalizePaymentHistoryCollection(source) {
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

export function normalizePaymentType(value) {
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

export function extractPaymentHistorySource(source) {
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

export function extractPaymentHistoryFromCandidates(candidates = []) {
  if (!Array.isArray(candidates)) return [];
  for (const candidate of candidates) {
    const extracted = extractPaymentHistorySource(candidate);
    if (Array.isArray(extracted) && extracted.length) {
      return extracted;
    }
  }
  return [];
}
