import { getCurrentLanguage, t } from '../language.js';
import { normalizeNumbers } from '../utils.js';
import { dom } from './state.js';

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatCurrency(value) {
  const number = Number(value) || 0;
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(number));
  const currencyLabel = lang === 'ar' ? 'ر.س' : 'SAR';
  return `${normalizeNumbers(formatted)} ${currencyLabel}`;
}

export function formatDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const hours = String(hours12).padStart(2, '0');
  const formatted = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  return normalizeNumbers(formatted);
}

export function formatProjectsCount(count) {
  const lang = getCurrentLanguage();
  const normalized = normalizeNumbers(String(count));
  if (lang === 'en') {
    const suffix = count === 1 ? 'project' : 'projects';
    return `${normalized} ${suffix}`;
  }
  return `${normalized} مشروع`;
}

export function setTableCount(count) {
  if (!dom.tableCount) return;
  dom.tableCount.dataset.count = String(count);
  dom.tableCount.textContent = formatProjectsCount(count);
}

export function getEmptyText(container) {
  if (!container) return '';
  const key = container.dataset.emptyKey;
  const fallback = container.dataset.empty || '';
  return key ? t(key, fallback) : fallback;
}
