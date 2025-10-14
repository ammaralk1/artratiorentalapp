import { loadData } from './storage.js';
import { getCurrentLanguage } from './language.js';

// ===== أدوات مساعدة =====

export function showToast(message, duration = 3000) {
  // 🔄 إذا ما فيه container للتوست، ننشئ واحد
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.top = "20px";            // المسافة من الأعلى
    container.style.left = "50%";            // منتصف الصفحة
    container.style.transform = "translateX(-50%)"; // ضبط التوسيط
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  // ستايل افتراضي للتوست
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.marginTop = "10px";
  toast.style.borderRadius = "6px";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";

  container.appendChild(toast);

  // تشغيل الحركة
  setTimeout(() => toast.style.opacity = "1", 10);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
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
