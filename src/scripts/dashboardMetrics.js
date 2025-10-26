import { loadData } from './storage.js';

const METRIC_IDS = {
  projects: ['stat-projects', 'sidebar-stat-projects'],
  reservations: ['stat-reservations', 'sidebar-stat-reservations'],
  equipment: ['stat-equipment', 'sidebar-stat-equipment'],
  technicians: ['stat-technicians', 'sidebar-stat-technicians']
};

let updateScheduled = false;

const EASTERN_ARABIC_ZERO = 0x0660;
const PERSIAN_ZERO = 0x06f0;

function normalizeNumericValue(value) {
  if (value == null) return 0;

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const stringValue = String(value)
    .trim()
    .replace(/[\s,_]/g, '')
    .replace(/[\u0660-\u0669]/g, (digit) => String(digit.charCodeAt(0) - EASTERN_ARABIC_ZERO))
    .replace(/[\u06f0-\u06f9]/g, (digit) => String(digit.charCodeAt(0) - PERSIAN_ZERO))
    .replace(/[^0-9.+-]/g, '');

  const parsed = Number(stringValue);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value) {
  try {
    const numericValue = normalizeNumericValue(value);
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(numericValue);
  } catch (error) {
    return String(value ?? 0);
  }
}

function setTextContent(id, value) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = formatNumber(value);
}

function getArrayLengthSafely(getter) {
  try {
    const value = typeof getter === 'function' ? getter() : null;
    return Array.isArray(value) ? value.length : 0;
  } catch (_) {
    return 0;
  }
}

function updateMetrics() {
  updateScheduled = false;
  const totalProjects = getArrayLengthSafely(() => loadData()?.projects);
  const totalReservations = getArrayLengthSafely(() => loadData()?.reservations);
  const totalEquipment = getArrayLengthSafely(() => loadData()?.equipment);
  const totalTechnicians = getArrayLengthSafely(() => loadData()?.technicians);

  METRIC_IDS.projects.forEach((id) => setTextContent(id, totalProjects));
  METRIC_IDS.reservations.forEach((id) => setTextContent(id, totalReservations));
  METRIC_IDS.equipment.forEach((id) => setTextContent(id, totalEquipment));
  METRIC_IDS.technicians.forEach((id) => setTextContent(id, totalTechnicians));
}

function scheduleUpdate() {
  if (updateScheduled) return;
  updateScheduled = true;
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(updateMetrics);
  } else {
    setTimeout(updateMetrics, 16);
  }
}

export function initDashboardMetrics() {
  const observedEvents = [
    'reservations:changed',
    'reservations:updated',
    'projects:changed',
    'equipment:changed',
    'technicians:changed',
    'customers:changed',
    // maintenance service dispatches 'maintenance:updated'
    'maintenance:updated',
    'language:changed'
  ];

  observedEvents.forEach((eventName) => {
    document.addEventListener(eventName, scheduleUpdate, { passive: true });
  });

  scheduleUpdate();
}
