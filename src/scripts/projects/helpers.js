import { formatDateTime } from './formatting.js';
import { DEFAULT_COMPANY_SHARE_PERCENT } from '../reservationsSummary.js';
import { normalizeNumbers } from '../utils.js';

function projectFlagEnabled(...values) {
  return values.some((value) => {
    if (value === true || value === 1) return true;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      return normalized === 'true' || normalized === '1' || normalized === 'yes';
    }
    return false;
  });
}

function parseProjectNumber(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function resolveProjectOverheadSettings(project, { applyTaxRaw = false } = {}) {
  const rawSharePercent = parseProjectNumber(
    project?.companySharePercent
      ?? project?.company_share_percent
      ?? project?.companyShare
      ?? project?.company_share
      ?? 0
  );
  const storedShareAmount = parseProjectNumber(
    project?.companyShareAmount
      ?? project?.company_share_amount
      ?? 0
  );
  const enabled = projectFlagEnabled(
    project?.companyShareEnabled,
    project?.company_share_enabled,
    project?.companyShareApplied,
    project?.company_share_applied
  ) || rawSharePercent > 0 || storedShareAmount > 0;
  const sharePercent = enabled
    ? (rawSharePercent > 0 ? rawSharePercent : DEFAULT_COMPANY_SHARE_PERCENT)
    : 0;
  const applyTax = Boolean(applyTaxRaw) || (enabled && sharePercent > 0);

  return {
    enabled,
    applyTax,
    sharePercent: enabled && applyTax && sharePercent > 0 ? sharePercent : 0,
  };
}

function normalizeIsoLike(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString();
  let s = String(value).trim();
  if (!s) return '';
  // Safari-friendly: convert "YYYY-MM-DD HH:mm" to "YYYY-MM-DDTHH:mm"
  if (s.includes(' ') && !s.includes('T')) {
    s = s.replace(' ', 'T');
  }
  return s;
}

export function getProjectStartTimestamp(project) {
  if (!project?.start) return Number.NaN;
  const normalized = normalizeIsoLike(project.start);
  const timestamp = new Date(normalized).getTime();
  return Number.isFinite(timestamp) ? timestamp : Number.NaN;
}

export function getProjectCreatedTimestamp(project) {
  if (project?.createdAt) {
    const normalized = normalizeIsoLike(project.createdAt);
    const created = new Date(normalized).getTime();
    if (Number.isFinite(created)) return created;
  }
  const startTime = getProjectStartTimestamp(project);
  if (Number.isFinite(startTime)) return startTime;
  return Number.NEGATIVE_INFINITY;
}

export function combineProjectDateTime(dateValue, timeValue) {
  if (!dateValue) return '';
  const normalizedTime = (timeValue && /\d{1,2}:\d{2}/.test(timeValue)) ? timeValue : '00:00';
  const [hours = '00', minutes = '00'] = normalizedTime.split(':');
  const safeHours = hours.padStart(2, '0');
  const safeMinutes = minutes.padStart(2, '0');
  return `${dateValue}T${safeHours}:${safeMinutes}`;
}

export function truncateText(value, maxLength) {
  const text = String(value || '');
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}

export function buildProjectsPageWindow(currentPage, totalPages) {
  const safeTotal = Math.max(1, Number(totalPages) || 1);
  const safeCurrent = Math.min(Math.max(1, Number(currentPage) || 1), safeTotal);

  if (safeTotal <= 3) {
    return Array.from({ length: safeTotal }, (_, index) => index + 1);
  }

  const windowStart = Math.min(safeCurrent, safeTotal - 1);
  const windowEnd = Math.min(safeTotal - 1, windowStart + 1);
  const pages = [windowStart];

  if (windowEnd !== windowStart) {
    pages.push(windowEnd);
  }

  if (pages[pages.length - 1] !== safeTotal) {
    pages.push(safeTotal);
  }

  return pages;
}

export function formatDateRange(start, end) {
  if (!start) return '—';
  const startText = formatDateTime(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTime(end)}`;
}

export function splitDateTimeParts(value) {
  if (!value || typeof value !== 'string') {
    return { date: '', time: '' };
  }
  let normalized = value.trim();
  if (!normalized) {
    return { date: '', time: '' };
  }

  if (normalized.includes(' ')) {
    normalized = normalized.replace(' ', 'T');
  }

  if (!normalized.includes('T')) {
    return { date: normalized, time: '' };
  }

  const [date, time = ''] = normalized.split('T');
  return { date, time };
}

export function setDateInputValue(input, value) {
  if (!input) return;
  const { date } = splitDateTimeParts(value);
  if (input._flatpickr) {
    input._flatpickr.setDate(date || null, true);
  } else {
    input.value = date || '';
  }
}

export function setTimeInputValue(input, value) {
  if (!input) return;
  const { time } = splitDateTimeParts(value);
  if (input._flatpickr) {
    input._flatpickr.setDate(time || null, true);
  } else {
    input.value = time || '';
  }
}
