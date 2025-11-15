import { t, getCurrentLanguage } from '../language.js';
import { normalizeNumbers } from '../utils.js';
import reportsState from './state.js';

export function translate(key, arFallback, enFallback = arFallback) {
  const language = getCurrentLanguage();
  const fallback = language === 'en' ? (enFallback ?? arFallback) : arFallback;
  return t(key, fallback);
}

export function resetFormatters() {
  reportsState.formatters.cachedLocale = null;
  reportsState.formatters.numberFormatter = null;
}

export function getActiveLocale() {
  const lang = (getCurrentLanguage() || 'ar').toLowerCase();
  return lang.startsWith('ar') ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
}

export function getFormatters() {
  const language = getCurrentLanguage();
  if (
    language !== reportsState.formatters.cachedLocale
    || !reportsState.formatters.numberFormatter
    || !reportsState.formatters.currencyFormatter
  ) {
    reportsState.formatters.cachedLocale = language;
    const locale = getActiveLocale();
    reportsState.formatters.numberFormatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    });
    reportsState.formatters.currencyFormatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return {
    numberFormatter: reportsState.formatters.numberFormatter,
    currencyFormatter: reportsState.formatters.currencyFormatter,
  };
}

export function formatNumber(value) {
  const { numberFormatter } = getFormatters();
  const formatted = numberFormatter.format(Math.round(value || 0));
  return normalizeNumbers(formatted);
}

export function formatCurrency(value) {
  const { currencyFormatter } = getFormatters();
  const number = Number.isFinite(Number(value)) ? Number(value) : 0;
  const formatted = currencyFormatter.format(number);
  return `${normalizeNumbers(formatted)} SR`;
}

export function formatDateInput(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateTime(value) {
  if (!value) return t('common.placeholder.empty', '—');
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return t('common.placeholder.empty', '—');
  const formatter = new Intl.DateTimeFormat(getActiveLocale(), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return normalizeNumbers(formatter.format(date));
}

export function getMonthLabel(date) {
  const formatter = new Intl.DateTimeFormat(getActiveLocale(), { month: 'short' });
  return formatter.format(date);
}

export default {
  translate,
  resetFormatters,
  getActiveLocale,
  getFormatters,
  formatNumber,
  formatCurrency,
  formatDateInput,
  formatDateTime,
  getMonthLabel,
};
