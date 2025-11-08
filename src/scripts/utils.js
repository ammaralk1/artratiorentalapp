import { loadData } from './storage.js';
import { getCurrentLanguage } from './language.js';

// ===== أدوات مساعدة =====

function ensureToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  // Normalise any pre-existing container (e.g. defined in HTML)
  try {
    container.classList.remove('toast-container', 'fixed', 'bottom-6', 'start-6', 'z-50');
  } catch (_) { /* ignore */ }
  // If the container exists but is not a direct child of <body>, move it to avoid being hidden by parent styles
  try {
    if (container.parentElement && container.parentElement !== document.body) {
      document.body.appendChild(container);
    }
  } catch (_) { /* ignore */ }
  container.style.position = 'fixed';
  container.style.top = '20px';
  container.style.bottom = 'auto';
  container.style.left = '50%';
  container.style.right = 'auto';
  container.style.transform = 'translateX(-50%)';
  // Ensure toast is above any modal/backdrop
  // Extremely high z-index to always be above modals/backdrops/tooltips
  container.style.zIndex = '2147483647';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.width = 'min(92vw, 380px)';
  container.style.pointerEvents = 'none';
  return container;
}

function applyToastBaseStyles(toast) {
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '10px 18px';
  toast.style.marginTop = '10px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.32)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  toast.style.fontSize = '0.875rem';
  toast.style.lineHeight = '1.4';
  toast.style.pointerEvents = 'auto';
  toast.style.backdropFilter = 'blur(4px)';
  toast.style.position = 'relative';
  toast.style.zIndex = '2147483647';
}

function fadeInToast(toast) {
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });
}

function scheduleToastRemoval(toast, duration) {
  let timeoutId = null;
  const hide = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 320);
  };

  // duration === -1 => persistent until user clicks anywhere on the page
  if (duration === -1) {
    const onAnyClick = () => {
      try { document.removeEventListener('click', onAnyClick, { capture: true }); } catch (_) { /* noop */ }
      hide();
    };
    // Defer attaching to avoid catching the same click that triggered the toast
    // and to prevent immediate dismissal from programmatic focus/clicks.
    setTimeout(() => {
      try { document.addEventListener('click', onAnyClick, { once: true, capture: true }); } catch (_) { /* noop */ }
    }, 500);
    return { hide, timeoutId };
  }

  timeoutId = setTimeout(hide, Math.max(0, duration));
  return { hide, timeoutId };
}

/**
 * Flexible toast helper.
 * Usage examples:
 *  - showToast('Saved');
 *  - showToast('Saved', 5000);
 *  - showToast('Saved', 'success');
 *  - showToast('Saved', 'error', 6000);
 */
export function showToast(message, typeOrDuration = 3000, maybeDuration) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;

  // Determine type and duration from flexible args
  const allowedTypes = new Set(['success', 'error', 'info', 'warning']);
  let type = 'info';
  let duration = 3000;

  if (typeof typeOrDuration === 'number' && Number.isFinite(typeOrDuration)) {
    duration = Math.max(0, typeOrDuration);
  } else if (typeof typeOrDuration === 'string' && allowedTypes.has(typeOrDuration)) {
    type = typeOrDuration;
    if (typeof maybeDuration === 'number' && Number.isFinite(maybeDuration)) {
      duration = Math.max(0, maybeDuration);
    } else {
      // Make warning toasts persistent by default unless a duration is explicitly provided
      if (type === 'warning') {
        duration = -1;
      }
    }
  } else {
    // Fallback: keep defaults
  }

  applyToastBaseStyles(toast);

  // Apply type styles
  const typeStyles = {
    success: { bg: '#14532d', border: 'rgba(34,197,94,0.35)', glow: 'rgba(34,197,94,0.35)' },
    error:   { bg: '#7f1d1d', border: 'rgba(239,68,68,0.35)', glow: 'rgba(239,68,68,0.35)' },
    info:    { bg: '#1e3a8a', border: 'rgba(59,130,246,0.35)', glow: 'rgba(59,130,246,0.35)' },
    warning: { bg: '#7c2d12', border: 'rgba(245,158,11,0.35)', glow: 'rgba(245,158,11,0.35)' },
  };
  const { bg, border, glow } = typeStyles[type] || typeStyles.info;
  toast.style.background = bg;
  toast.style.border = `1px solid ${border}`;
  toast.style.boxShadow = `0 8px 24px rgba(15, 23, 42, 0.32), 0 0 0 4px ${glow}`;

  container.appendChild(toast);
  fadeInToast(toast);
  const { hide } = scheduleToastRemoval(toast, duration);
  toast.addEventListener('click', hide);
}

export function showToastWithAction({
  message,
  duration = 6000,
  actionLabel,
  onAction,
  linkLabel,
  linkHref
} = {}) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  applyToastBaseStyles(toast);

  const content = document.createElement('div');
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.gap = '8px';

  const text = document.createElement('span');
  text.textContent = message;
  content.appendChild(text);

  const actionRow = document.createElement('div');
  actionRow.style.display = 'flex';
  actionRow.style.flexWrap = 'wrap';
  actionRow.style.gap = '8px';

  let hasAction = false;
  let hideToastCallback = () => {};

  if (linkLabel && linkHref) {
    const link = document.createElement('a');
    link.href = linkHref;
    link.textContent = linkLabel;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.color = '#bfdbfe';
    link.style.textDecoration = 'underline';
    link.style.fontWeight = '500';
    link.style.pointerEvents = 'auto';
    actionRow.appendChild(link);
    hasAction = true;
  }

  if (actionLabel && typeof onAction === 'function') {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = actionLabel;
    button.style.border = '1px solid rgba(255,255,255,0.4)';
    button.style.background = 'rgba(15, 23, 42, 0.2)';
    button.style.color = '#fff';
    button.style.borderRadius = '999px';
    button.style.padding = '6px 14px';
    button.style.fontSize = '0.78rem';
    button.style.cursor = 'pointer';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        onAction();
      } catch (error) {
        console.error('⚠️ [toast] action callback failed', error);
      } finally {
        hideToastCallback();
      }
    });
    actionRow.appendChild(button);
    hasAction = true;
  }

  if (hasAction) {
    content.appendChild(actionRow);
  }

  toast.appendChild(content);
  container.appendChild(toast);
  fadeInToast(toast);
  const { hide } = scheduleToastRemoval(toast, duration);
  hideToastCallback = hide;
  toast.addEventListener('click', hide);
}

const RESERVATION_PREFIX = 'RSV';
const PROJECT_PREFIX = 'PRJ';
const DEFAULT_CODE_PAD = 4;

const generatorState = (() => {
  try {
    const root = typeof globalThis !== 'undefined' ? globalThis : window;
    root.__APP_SEQUENCE_STATE__ = root.__APP_SEQUENCE_STATE__ || {
      reservation: 0,
      project: 0,
    };
    return root.__APP_SEQUENCE_STATE__;
  } catch (error) {
    return { reservation: 0, project: 0 };
  }
})();

function getLastReservationSequence() {
  return Number.isFinite(generatorState.reservation) ? generatorState.reservation : 0;
}

function setLastReservationSequence(value) {
  generatorState.reservation = Math.max(0, Number.parseInt(value, 10) || 0);
}

function getLastProjectSequence() {
  return Number.isFinite(generatorState.project) ? generatorState.project : 0;
}

function setLastProjectSequence(value) {
  generatorState.project = Math.max(0, Number.parseInt(value, 10) || 0);
}

function getDataSnapshot() {
  try {
    const snapshot = loadData();
    return {
      reservations: Array.isArray(snapshot?.reservations) ? snapshot.reservations : [],
      projects: Array.isArray(snapshot?.projects) ? snapshot.projects : [],
    };
  } catch (error) {
    console.warn('⚠️ [utils] Failed to load data snapshot for code generation', error);
    return { reservations: [], projects: [] };
  }
}

function normalizeSequenceCandidate(value, prefix) {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') {
    return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
  }

  const raw = String(value).trim();
  if (!raw) return 0;

  const normalizedPrefix = `${prefix.toUpperCase()}-`;
  const upperRaw = raw.toUpperCase();
  let digits = raw;

  if (upperRaw.startsWith(normalizedPrefix)) {
    digits = raw.slice(normalizedPrefix.length);
  }

  const match = digits.match(/(\d+)$/);
  if (match) {
    const parsed = Number.parseInt(match[1], 10);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }

  const fallback = Number.parseInt(raw, 10);
  return Number.isFinite(fallback) ? Math.max(0, fallback) : 0;
}

function collectCandidates(rawValue) {
  if (Array.isArray(rawValue)) return rawValue;
  return [rawValue];
}

function resolveMaxSequence(items, prefix, extractor) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  return items.reduce((max, item) => {
    const rawCandidates = extractor(item);
    const candidates = collectCandidates(rawCandidates);
    const candidateMax = candidates.reduce((innerMax, candidate) => {
      const sequence = normalizeSequenceCandidate(candidate, prefix);
      return sequence > innerMax ? sequence : innerMax;
    }, 0);
    return candidateMax > max ? candidateMax : max;
  }, 0);
}

function formatSequentialCode(prefix, sequence) {
  const safeSequence = Math.max(0, Number.parseInt(sequence, 10) || 0);
  return `${prefix}-${String(safeSequence).padStart(DEFAULT_CODE_PAD, '0')}`;
}

export function generateReservationId() {
  const { reservations } = getDataSnapshot();
  const maxFromData = resolveMaxSequence(reservations, RESERVATION_PREFIX, (reservation) => [
    reservation?.reservationCode,
    reservation?.reservation_code,
    reservation?.reservationId,
    reservation?.reservation_id,
    reservation?.id
  ]);
  const nextSequence = Math.max(maxFromData, getLastReservationSequence()) + 1;
  setLastReservationSequence(nextSequence);
  return formatSequentialCode(RESERVATION_PREFIX, nextSequence);
}

export function generateProjectCode() {
  const { projects } = getDataSnapshot();
  const maxFromData = resolveMaxSequence(projects, PROJECT_PREFIX, (project) => [
    project?.projectCode,
    project?.project_code,
    project?.code,
    project?.id
  ]);
  const nextSequence = Math.max(maxFromData, getLastProjectSequence()) + 1;
  setLastProjectSequence(nextSequence);
  return formatSequentialCode(PROJECT_PREFIX, nextSequence);
}

export function formatDateTime(dateStr, overrides = {}) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "-";

  const activeLanguage = document?.documentElement?.getAttribute('lang')
    || (typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : null)
    || 'ar';
  const isArabic = String(activeLanguage).toLowerCase().startsWith('ar');
  const locale = isArabic ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';

  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: true,
    calendar: 'gregory',
    ...overrides
  });

  const parts = formatter.formatToParts(date);
  const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';

  const formatted = parts
    .map((part) => {
      if (part.type === 'dayPeriod') {
        return meridiem;
      }
      return part.value;
    })
    .join('')
    .replace(/\u200f/g, ''); // remove RTL marks if present

  return normalizeNumbers(formatted);
}

export function normalizeNumbers(str) {
  if (str === null || str === undefined) return "";
  
  // حوّل أي رقم إلى نص
  str = String(str);

  const arabicNumbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
  const persianNumbers = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  const englishNumbers = ["0","1","2","3","4","5","6","7","8","9"];

  return Array.from(str).map((ch) => {
    const arabicIndex = arabicNumbers.indexOf(ch);
    if (arabicIndex > -1) {
      return englishNumbers[arabicIndex];
    }
    const persianIndex = persianNumbers.indexOf(ch);
    if (persianIndex > -1) {
      return englishNumbers[persianIndex];
    }
    return ch;
  }).join('');
}
