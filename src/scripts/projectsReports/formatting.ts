import { getCurrentLanguage } from '../language.js';
import { normalizeNumbers } from '../utils.js';

export function normalizeText(value: unknown): string {
  if (!value) return '';
  return normalizeNumbers(String(value)).toLowerCase().trim();
}

export function formatDateOnly(value: unknown, language: string = getCurrentLanguage()): string {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return '—';

  const locale = language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return normalizeNumbers(formatter.format(date));
}

export function formatProjectPeriod(start: unknown, end: unknown, language: string = getCurrentLanguage()): string {
  if (!start && !end) return '—';
  const startLabel = start ? formatDateOnly(start, language) : '—';
  const endLabel = end ? formatDateOnly(end, language) : '—';
  if (!end) return startLabel;
  return `${startLabel} → ${endLabel}`;
}

export function formatCurrency(value: unknown, language: string = getCurrentLanguage()): string {
  const number = Number(value) || 0;
  const locale = language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(number));

  return `${normalizeNumbers(formatted)} SR`;
}

export function formatNumber(value: unknown, language: string = getCurrentLanguage()): string {
  const locale = language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  return normalizeNumbers(new Intl.NumberFormat(locale).format(Number(value) || 0));
}

export function formatPercent(value: unknown, language: string = getCurrentLanguage()): string {
  const locale = language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  const number = Number.isFinite(Number(value)) ? Number(value) : 0;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(number);

  // Wrap in Unicode First Strong Isolate (U+2068...U+2069) to prevent the RTL
  // bidi algorithm from reordering the decimal point or % sign when this
  // percentage string is embedded inside Arabic text.
  return `\u2068${normalizeNumbers(formatted)}%\u2069`;
}

export function formatCompactNumber(value: unknown, language: string = getCurrentLanguage()): string {
  const locale = language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  return normalizeNumbers(
    new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'short' }).format(Number(value) || 0),
  );
}

export function getChartLocale(language: string = getCurrentLanguage()): string {
  return language === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
}

export function escapeHtml(value: unknown = ''): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
