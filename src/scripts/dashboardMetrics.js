import { loadData } from './storage.js';

const METRIC_IDS = {
  projects: ['stat-projects', 'sidebar-stat-projects'],
  reservations: ['stat-reservations', 'sidebar-stat-reservations'],
  equipment: ['stat-equipment', 'sidebar-stat-equipment'],
  technicians: ['stat-technicians', 'sidebar-stat-technicians']
};

let updateScheduled = false;

function formatNumber(value) {
  try {
    const lang = document.documentElement?.lang || 'ar';
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value ?? 0);
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

function updateMetrics() {
  updateScheduled = false;
  const data = loadData();

  const totalProjects = Array.isArray(data.projects) ? data.projects.length : 0;
  const totalReservations = Array.isArray(data.reservations) ? data.reservations.length : 0;
  const totalEquipment = Array.isArray(data.equipment) ? data.equipment.length : 0;
  const totalTechnicians = Array.isArray(data.technicians) ? data.technicians.length : 0;

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
    'projects:changed',
    'equipment:changed',
    'technicians:changed',
    'customers:changed',
    'maintenance:changed',
    'language:changed'
  ];

  observedEvents.forEach((eventName) => {
    document.addEventListener(eventName, scheduleUpdate, { passive: true });
  });

  scheduleUpdate();
}
