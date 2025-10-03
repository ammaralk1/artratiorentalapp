import { formatDateTime } from './formatting.js';

export function getProjectStartTimestamp(project) {
  if (!project?.start) return Number.NaN;
  const timestamp = new Date(project.start).getTime();
  return Number.isFinite(timestamp) ? timestamp : Number.NaN;
}

export function getProjectCreatedTimestamp(project) {
  if (project?.createdAt) {
    const created = new Date(project.createdAt).getTime();
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
