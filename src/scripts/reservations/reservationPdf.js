import { loadData } from '../storage.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { normalizeNumbers, formatDateTime, showToast } from '../utils.js';
import { calculateReservationDays } from '../reservationsSummary.js';
import { resolveReservationProjectState } from '../reservationsShared.js';
import quotePdfStyles from '../../styles/quotePdf.css?raw';

const QUOTE_SEQUENCE_STORAGE_KEY = 'reservations.quote.sequence';

const QUOTE_COMPANY_INFO = {
  logoUrl: 'https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png',
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  commercialRegistry: '4030485240',
  beneficiaryName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  bankName: 'مصرف الراجحي',
  accountNumber: '٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦',
  iban: 'SA1680000358608016065706',
  approvalNote: 'الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام.'
};

const QUOTE_TERMS = [
  'يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.',
  'يمنع استخدام المعدات في أنشطة غير قانونية.',
  'يتحمل المستأجر مسؤولية أي تلف أو فقدان.',
  'يجب إعادة المعدات في حالتها الأصلية.',
  'يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة.'
];

const QUOTE_SECTION_DEFS = [
  { id: 'customerInfo', labelKey: 'reservations.quote.sections.customer', fallback: 'بيانات العميل', defaultSelected: true },
  { id: 'reservationInfo', labelKey: 'reservations.quote.sections.reservation', fallback: 'تفاصيل الحجز', defaultSelected: true },
  { id: 'projectInfo', labelKey: 'reservations.quote.sections.project', fallback: 'بيانات المشروع', defaultSelected: true },
  { id: 'financialSummary', labelKey: 'reservations.quote.sections.financial', fallback: 'الملخص المالي', defaultSelected: true },
  { id: 'items', labelKey: 'reservations.quote.sections.items', fallback: 'قائمة المعدات', defaultSelected: true },
  { id: 'crew', labelKey: 'reservations.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true },
  { id: 'notes', labelKey: 'reservations.quote.sections.notes', fallback: 'ملاحظات الحجز', defaultSelected: true }
];

const QUOTE_ITEMS_COLUMN_DEFS = [
  {
    id: 'rowNumber',
    labelKey: null,
    fallback: '#',
    render: (_item, index) => escapeHtml(normalizeNumbers(String(index + 1)))
  },
  {
    id: 'code',
    labelKey: 'reservations.details.table.headers.code',
    fallback: 'الكود',
    render: (item) => escapeHtml(item?.barcode || '-')
  },
  {
    id: 'description',
    labelKey: 'reservations.details.table.headers.description',
    fallback: 'الوصف',
    render: (item) => escapeHtml(item?.desc || item?.description || '-')
  },
  {
    id: 'quantity',
    labelKey: 'reservations.details.table.headers.quantity',
    fallback: 'الكمية',
    render: (item) => escapeHtml(normalizeNumbers(String(item?.qty || 1)))
  },
  {
    id: 'price',
    labelKey: 'reservations.details.table.headers.price',
    fallback: 'السعر',
    render: (item) => escapeHtml(normalizeNumbers((Number(item?.price || 0)).toFixed(2)))
  }
];

const QUOTE_CREW_COLUMN_DEFS = [
  {
    id: 'rowNumber',
    labelKey: null,
    fallback: '#',
    render: (_tech, index) => escapeHtml(normalizeNumbers(String(index + 1)))
  },
  {
    id: 'name',
    labelKey: 'reservations.details.technicians.name',
    fallback: 'الاسم',
    render: (tech) => escapeHtml(tech?.name || tech?.full_name || '-')
  },
  {
    id: 'role',
    labelKey: 'reservations.details.technicians.role',
    fallback: 'الدور',
    render: (tech) => escapeHtml(tech?.role || t('reservations.details.technicians.roleUnknown', 'غير محدد'))
  },
  {
    id: 'phone',
    labelKey: 'reservations.details.technicians.phone',
    fallback: 'الهاتف',
    render: (tech) => escapeHtml(tech?.phone || t('reservations.details.technicians.phoneUnknown', 'غير متوفر'))
  }
];

const QUOTE_FIELD_DEFS = {
  customerInfo: [
    { id: 'customerName', labelKey: 'reservations.details.labels.customer', fallback: 'العميل' },
    { id: 'customerCompany', labelKey: 'reservations.details.labels.company', fallback: 'الشركة' },
    { id: 'customerPhone', labelKey: 'reservations.details.labels.phone', fallback: 'الهاتف' },
    { id: 'customerEmail', labelKey: 'reservations.details.labels.email', fallback: 'البريد' }
  ],
  reservationInfo: [
    { id: 'reservationId', labelKey: 'reservations.details.labels.reservationId', fallback: 'رقم الحجز' },
    { id: 'reservationStart', labelKey: 'reservations.details.labels.start', fallback: 'بداية الحجز' },
    { id: 'reservationEnd', labelKey: 'reservations.details.labels.end', fallback: 'نهاية الحجز' },
    { id: 'reservationDuration', labelKey: 'reservations.details.labels.duration', fallback: 'عدد الأيام' }
  ],
  projectInfo: [
    { id: 'projectTitle', labelKey: 'reservations.details.labels.project', fallback: 'المشروع' },
    { id: 'projectCode', labelKey: 'reservations.details.labels.code', fallback: 'الرمز' }
  ],
  financialSummary: [
    { id: 'equipmentTotal', labelKey: 'reservations.details.labels.equipmentTotal', fallback: 'إجمالي المعدات' },
    { id: 'crewTotal', labelKey: 'reservations.details.labels.crewTotal', fallback: 'إجمالي الفريق' },
    { id: 'discountAmount', labelKey: 'reservations.details.labels.discount', fallback: 'الخصم' },
    { id: 'taxAmount', labelKey: 'reservations.details.labels.tax', fallback: 'الضريبة' },
    { id: 'finalTotal', labelKey: 'reservations.details.labels.total', fallback: 'الإجمالي النهائي' }
  ],
  payment: [
    { id: 'beneficiary', labelKey: 'reservations.quote.labels.beneficiary', fallback: 'اسم المستفيد' },
    { id: 'bank', labelKey: 'reservations.quote.labels.bank', fallback: 'اسم البنك' },
    { id: 'account', labelKey: 'reservations.quote.labels.account', fallback: 'رقم الحساب' },
    { id: 'iban', labelKey: 'reservations.quote.labels.iban', fallback: 'رقم الآيبان' }
  ],
  items: QUOTE_ITEMS_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
  crew: QUOTE_CREW_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback }))
};

const HTML2PDF_SRC = 'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';
const HTML2CANVAS_SRC = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
const JSPDF_SRC = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';

const QUOTE_PDF_STYLES = quotePdfStyles.trim();

const COLOR_FUNCTION_REGEX = /color\([^)]*\)/gi;
const MODERN_COLOR_REGEX = /(color\(|color-mix\()/i;
const colorCanvas = document.createElement('canvas');
const colorCtx = colorCanvas.getContext('2d');

// Render A4 pages at their physical size in the preview (96 DPI assumption).
const CSS_DPI = 96;
const MM_PER_INCH = 25.4;
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = Math.round((A4_WIDTH_MM / MM_PER_INCH) * CSS_DPI);
const A4_HEIGHT_PX = Math.round((A4_HEIGHT_MM / MM_PER_INCH) * CSS_DPI);
const PAGE_OVERFLOW_TOLERANCE_PX = 2;
const SAFARI_USER_AGENT_REGEX = /safari/i;
const IOS_PLATFORM_REGEX = /(iphone|ipad|ipod)/i;

let quoteModalRefs = null;
let activeQuoteState = null;
let previewZoom = 1;
let ensureJsPdfPromise = null;
let ensureHtml2CanvasPromise = null;

function buildDefaultFieldSelections() {
  const selections = {};
  Object.entries(QUOTE_FIELD_DEFS).forEach(([sectionId, fields = []]) => {
    selections[sectionId] = new Set(fields.filter((field) => field?.default !== false).map((field) => field.id));
  });
  return selections;
}

function cloneFieldSelections(originalSelections = {}) {
  const clone = {};
  Object.entries(originalSelections).forEach(([sectionId, set]) => {
    clone[sectionId] = new Set(Array.from(set || []));
  });
  return clone;
}

function getFieldSelectionSet(selections = {}, sectionId) {
  if (!sectionId) return undefined;
  if (!selections[sectionId]) {
    selections[sectionId] = new Set();
  }
  return selections[sectionId];
}

function isFieldEnabledInSelections(selections = {}, sectionId, fieldId) {
  const set = selections?.[sectionId];
  if (!set) return true;
  if (set instanceof Set) {
    return set.has(fieldId);
  }
  if (Array.isArray(set)) {
    return set.includes(fieldId);
  }
  return Boolean(set?.[fieldId]);
}

function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.platform || '';
  return IOS_PLATFORM_REGEX.test(ua);
}

function isSafariBrowser() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isSafari = SAFARI_USER_AGENT_REGEX.test(ua);
  const isChrome = ua.includes('Chrome') || ua.includes('CriOS') || ua.includes('Chromium');
  const isEdge = ua.includes('Edg');
  return isSafari && !isChrome && !isEdge;
}

function isIosSafari() {
  return isIosDevice() && isSafariBrowser();
}

function withBlockAttributes(markup, { blockType = 'section', extraAttributes = '' } = {}) {
  if (!markup) return '';
  const extra = extraAttributes ? ` ${extraAttributes.trim()}` : '';
  return markup.replace(/^(<\w+)/, `$1 data-quote-block data-block-type="${blockType}"${extra}`);
}

function buildPlaceholderBlock(messageKey, fallback = 'لا توجد بيانات للعرض.') {
  const message = escapeHtml(t(messageKey, fallback));
  return withBlockAttributes(
    `<section class="quote-section quote-placeholder">${message}</section>`,
    { blockType: 'placeholder' }
  );
}

function ensureBlocks(blocks, placeholderKey) {
  return Array.isArray(blocks) && blocks.length
    ? blocks
    : [buildPlaceholderBlock(placeholderKey)];
}

function normalizeColorValue(rawValue, fallback = '#000') {
  if (!colorCtx || !rawValue) return fallback;
  try {
    colorCtx.fillStyle = '#000';
    colorCtx.fillStyle = rawValue;
    return colorCtx.fillStyle || fallback;
  } catch (error) {
    return fallback;
  }
}

function patchHtml2CanvasColorParsing() {
  const html2canvas = window.html2canvas;
  if (!html2canvas?.Color || html2canvas.Color.__artRatioPatched) return;

  const originalFromString = html2canvas.Color.fromString.bind(html2canvas.Color);

  html2canvas.Color.fromString = (value) => {
    try {
      return originalFromString(value);
    } catch (error) {
      if (typeof value === 'string' && value.trim().toLowerCase().startsWith('color(')) {
        console.warn('[quote/pdf] html2canvas color fallback', value);
        const fallback = normalizeColorValue(value) || '#000';
        try {
          return originalFromString(fallback);
        } catch (secondError) {
          return originalFromString('#000');
        }
      }
      throw error;
    }
  };

  html2canvas.Color.__artRatioPatched = true;
}

function scrubUnsupportedColorFunctions(root) {
  if (!root) return;

  const replaceColorFunctions = (value = '') => (
    typeof value === 'string' && value.includes('color(')
      ? value.replace(COLOR_FUNCTION_REGEX, '#000')
      : value
  );

  root.querySelectorAll?.('style')?.forEach?.((styleNode) => {
    const text = styleNode.textContent;
    if (typeof text === 'string' && text.includes('color(')) {
      styleNode.textContent = replaceColorFunctions(text);
    }
  });

  root.querySelectorAll?.('[style]')?.forEach?.((element) => {
    const styleAttr = element.getAttribute('style');
    if (typeof styleAttr === 'string' && styleAttr.includes('color(')) {
      element.setAttribute('style', replaceColorFunctions(styleAttr));
    }
  });
}

function scrubCloneColors(doc) {
  if (!doc) return;
  scrubUnsupportedColorFunctions(doc);
  scrubUnsupportedColorFunctions(doc?.documentElement);
  scrubUnsupportedColorFunctions(doc?.body);
  const view = doc?.defaultView || window;
  sanitizeComputedColorFunctions(doc?.documentElement || doc, view);
}

const COLOR_PROPERTIES = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'outlineColor',
  'fill',
  'stroke'
];

function sanitizeComputedColorFunctions(root, view = window) {
  if (!root || !view || typeof view.getComputedStyle !== 'function') return;
  const elements = root.querySelectorAll('*');
  elements.forEach((element) => {
    const computed = view.getComputedStyle(element);
    if (!computed) return;

    COLOR_PROPERTIES.forEach((prop) => {
      const value = computed[prop];
      if (value && MODERN_COLOR_REGEX.test(value)) {
        const hyphenProp = prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
        const defaultFallback = prop === 'backgroundColor' ? '#ffffff' : computed.color || '#000000';
        const fallback = normalizeColorValue(value, defaultFallback);
        element.style.setProperty(hyphenProp, fallback, 'important');
      }
    });

    const backgroundImage = computed.backgroundImage;
    if (backgroundImage && MODERN_COLOR_REGEX.test(backgroundImage)) {
      const fallbackBackground = normalizeColorValue(computed.backgroundColor || '#ffffff', '#ffffff');
      element.style.setProperty('background-image', 'none', 'important');
      element.style.setProperty('background-color', fallbackBackground, 'important');
    }
  });
}

function enforceLegacyColorFallback(root, view = window) {
  if (!root || !view || typeof view.getComputedStyle !== 'function') return;
  root.querySelectorAll('*').forEach((element) => {
    const styles = view.getComputedStyle(element);
    if (!styles) return;

    ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'].forEach((prop) => {
      const value = styles[prop];
      if (value && MODERN_COLOR_REGEX.test(value)) {
        const hyphenProp = prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
        const fallback = prop === 'backgroundColor' ? '#ffffff' : '#000000';
        element.style.setProperty(hyphenProp, fallback, 'important');
      }
    });

    const bgImage = styles.backgroundImage;
    if (bgImage && MODERN_COLOR_REGEX.test(bgImage)) {
      element.style.setProperty('background-image', 'none', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
    }
  });
}

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (error) => reject(error));
      if (existing.readyState === 'complete') {
        resolve();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}

function resolveJsPdfConstructor() {
  const candidates = [
    window.jspdf?.jsPDF,
    typeof window.jspdf === 'function' ? window.jspdf : null,
    window.jsPDF?.jsPDF,
    typeof window.jsPDF === 'function' ? window.jsPDF : null
  ].filter((candidate) => typeof candidate === 'function');
  return candidates.length ? candidates[0] : null;
}

function resolveHtml2Canvas() {
  return typeof window.html2canvas === 'function' ? window.html2canvas : null;
}

async function ensureHtml2Canvas() {
  const existing = resolveHtml2Canvas();
  if (existing) return existing;

  if (!ensureHtml2CanvasPromise) {
    ensureHtml2CanvasPromise = loadExternalScript(HTML2CANVAS_SRC)
      .catch((error) => {
        ensureHtml2CanvasPromise = null;
        throw error;
      })
      .then(() => {
        const fn = resolveHtml2Canvas();
        if (!fn) {
          ensureHtml2CanvasPromise = null;
          throw new Error('تعذر تحميل مكتبة html2canvas المطلوبة.');
        }
        return fn;
      });
  }

  return ensureHtml2CanvasPromise;
}

async function ensureJsPdf() {
  const existing = resolveJsPdfConstructor();
  if (existing) return existing;

  if (!ensureJsPdfPromise) {
    ensureJsPdfPromise = loadExternalScript(JSPDF_SRC)
      .catch((error) => {
        ensureJsPdfPromise = null;
        throw error;
      })
      .then(() => {
        const ctor = resolveJsPdfConstructor();
        if (!ctor) {
          ensureJsPdfPromise = null;
          throw new Error('تعذر تحميل مكتبة jsPDF المطلوبة.');
        }
        return ctor;
      });
  }

  return ensureJsPdfPromise;
}

async function ensureHtml2Pdf() {
  if (!window.html2pdf) {
    await loadExternalScript(HTML2PDF_SRC);
  }
  patchHtml2CanvasColorParsing();
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatQuoteNumber(sequence) {
  const seq = Number(sequence);
  if (!Number.isFinite(seq) || seq <= 0) return 'Q-0001';
  return `Q-${String(seq).padStart(4, '0')}`;
}

function readQuoteSequence() {
  const stored = window.localStorage?.getItem?.(QUOTE_SEQUENCE_STORAGE_KEY);
  const parsed = parseInt(stored ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function peekNextQuoteSequence() {
  const last = readQuoteSequence();
  const sequence = last + 1;
  return {
    sequence,
    quoteNumber: formatQuoteNumber(sequence)
  };
}

function commitQuoteSequence(sequence) {
  try {
    const value = Number(sequence);
    if (!Number.isFinite(value) || value <= 0) return;
    window.localStorage?.setItem?.(QUOTE_SEQUENCE_STORAGE_KEY, String(value));
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] failed to persist quote sequence', error);
  }
}

function formatQuoteDate(date = new Date()) {
  try {
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return date.toISOString().slice(0, 10);
  }
}

function resolveTechnicianDailyRate(technician = {}) {
  const candidates = [
    technician.dailyWage,
    technician.daily_rate,
    technician.dailyRate,
    technician.wage,
    technician.rate
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const parsed = parseFloat(normalizeNumbers(String(value)));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function collectAssignedTechnicians(reservation) {
  const syncedTechnicians = syncTechniciansStatuses() || [];
  const { technicians: storedTechnicians = [] } = loadData();
  const technicianSource = []
    .concat(Array.isArray(syncedTechnicians) ? syncedTechnicians : [])
    .concat(Array.isArray(storedTechnicians) ? storedTechnicians : []);

  const techniciansMap = new Map();
  technicianSource.forEach((tech) => {
    if (!tech || tech.id == null) return;
    const key = String(tech.id);
    const existing = techniciansMap.get(key) || {};
    techniciansMap.set(key, { ...existing, ...tech });
  });

  return (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);
}

function collectReservationFinancials(reservation, technicians, project) {
  const { projectLinked } = resolveReservationProjectState(reservation, project);
  const rentalDays = calculateReservationDays(reservation.start, reservation.end);
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const equipmentDailyTotal = items.reduce((sum, item) => sum + ((Number(item?.qty) || 1) * (Number(item?.price) || 0)), 0);
  const equipmentTotal = equipmentDailyTotal * rentalDays;
  const crewDailyTotal = technicians.reduce((sum, tech) => sum + resolveTechnicianDailyRate(tech), 0);
  const crewTotal = crewDailyTotal * rentalDays;
  const discountBase = equipmentTotal + crewTotal;
  const discountValue = parseFloat(reservation.discount) || 0;
  const discountAmount = reservation.discountType === 'amount'
    ? discountValue
    : discountBase * (discountValue / 100);
  const taxableAmount = Math.max(0, discountBase - discountAmount);
  const applyTaxFlag = projectLinked ? false : reservation.applyTax;
  const taxAmount = applyTaxFlag ? taxableAmount * 0.15 : 0;
  const storedCost = Number(reservation.cost);
  const hasStoredCost = Number.isFinite(storedCost);
  const computedTotal = taxableAmount + taxAmount;
  const finalTotal = projectLinked ? Math.round(computedTotal) : (hasStoredCost ? storedCost : Math.round(computedTotal));

  const totals = {
    equipmentTotal,
    crewTotal,
    discountAmount,
    taxAmount,
    finalTotal: finalTotal ?? 0
  };

  const totalsDisplay = {
    equipmentTotal: normalizeNumbers(equipmentTotal.toFixed(2)),
    crewTotal: normalizeNumbers(crewTotal.toFixed(2)),
    discountAmount: normalizeNumbers(discountAmount.toFixed(2)),
    taxAmount: normalizeNumbers(taxAmount.toFixed(2)),
    finalTotal: normalizeNumbers((finalTotal ?? 0).toFixed(2))
  };

  return {
    totals,
    totalsDisplay,
    rentalDays
  };
}

function buildQuotationHtml({
  reservation,
  customer,
  project,
  technicians,
  totalsDisplay,
  rentalDays,
  currencyLabel,
  sections,
  fieldSelections = {},
  quoteNumber,
  quoteDate
}) {
  const reservationId = normalizeNumbers(String(reservation?.reservationId ?? reservation?.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const customerName = customer?.customerName || customer?.full_name || customer?.name || '-';
  const customerPhone = customer?.phone || '-';
  const customerEmail = customer?.email || '-';
  const customerCompany = customer?.company || customer?.company_name || '-';
  const customerPhoneDisplay = normalizeNumbers(customerPhone);
  const projectTitle = project?.title || project?.name || t('reservations.details.project.none', 'غير مرتبط بمشروع');
  const projectCode = project?.code || project?.projectCode || '';
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays));
  const notes = reservation?.notes || '';

  const fieldsSelection = cloneFieldSelections(fieldSelections);
  const isFieldEnabled = (sectionId, fieldId) => isFieldEnabledInSelections(fieldsSelection, sectionId, fieldId);
  const includeSection = (id) => sections?.has?.(id);
  const noFieldsMessage = `<div class="quote-placeholder">${escapeHtml(t('reservations.quote.placeholder.noFields', 'لم يتم اختيار أي معلومات للعرض في هذا القسم.'))}</div>`;

  const renderPlainItem = (label, value) => {
    return `<div class="info-plain__item">${escapeHtml(label)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${escapeHtml(value)}</strong></div>`;
  };

  const renderTotalsItem = (label, value, { variant = 'inline' } = {}) => {
    if (variant === 'final') {
      return `<div class="totals-item totals-item--final">
        <span class="totals-item__label">${escapeHtml(label)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${escapeHtml(value)}</span>
      </div>`;
    }

    return `<span class="totals-inline__item">
      <span class="totals-inline__label">${escapeHtml(label)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${escapeHtml(value)}</span>
    </span>`;
  };

  const renderPaymentRow = (label, value) => {
    return `<div class="payment-row">
      <span class="payment-row__label">${escapeHtml(label)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${escapeHtml(value)}</span>
    </div>`;
  };

  const customerFieldItems = [];
  if (isFieldEnabled('customerInfo', 'customerName')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.customer', 'العميل'), customerName));
  }
  if (isFieldEnabled('customerInfo', 'customerCompany')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.company', 'الشركة'), customerCompany));
  }
  if (isFieldEnabled('customerInfo', 'customerPhone')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.phone', 'الهاتف'), customerPhoneDisplay));
  }
  if (isFieldEnabled('customerInfo', 'customerEmail')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.email', 'البريد'), customerEmail));
  }

  const customerSectionMarkup = includeSection('customerInfo')
    ? `<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.customer', 'بيانات العميل'))}</h3>
        ${customerFieldItems.length ? `<div class="info-plain">${customerFieldItems.join('')}</div>` : noFieldsMessage}
      </section>`
    : '';

  const reservationFieldItems = [];
  if (isFieldEnabled('reservationInfo', 'reservationId')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.reservationId', 'رقم الحجز'), reservationId || '-'));
  }
  if (isFieldEnabled('reservationInfo', 'reservationStart')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.start', 'بداية الحجز'), startDisplay));
  }
  if (isFieldEnabled('reservationInfo', 'reservationEnd')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.end', 'نهاية الحجز'), endDisplay));
  }
  if (isFieldEnabled('reservationInfo', 'reservationDuration')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.duration', 'عدد الأيام'), rentalDaysDisplay));
  }

  const reservationSectionMarkup = includeSection('reservationInfo')
    ? `<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.reservation', 'تفاصيل الحجز'))}</h3>
        ${reservationFieldItems.length ? `<div class="info-plain">${reservationFieldItems.join('')}</div>` : noFieldsMessage}
      </section>`
    : '';

  const projectFieldItems = [];
  if (isFieldEnabled('projectInfo', 'projectTitle')) {
    projectFieldItems.push(renderPlainItem(t('reservations.details.labels.project', 'المشروع'), projectTitle));
  }
  if (isFieldEnabled('projectInfo', 'projectCode')) {
    projectFieldItems.push(renderPlainItem(t('reservations.details.labels.code', 'الرمز'), projectCode || '-'));
  }

  const projectSectionMarkup = includeSection('projectInfo')
    ? `<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.project', 'بيانات المشروع'))}</h3>
        ${projectFieldItems.length ? `<div class="info-plain">${projectFieldItems.join('')}</div>` : noFieldsMessage}
      </section>`
    : '';

  const financialInlineItems = [];
  if (isFieldEnabled('financialSummary', 'equipmentTotal')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'), `${totalsDisplay.equipmentTotal} ${currencyLabel}`));
  }
  if (isFieldEnabled('financialSummary', 'crewTotal')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'), `${totalsDisplay.crewTotal} ${currencyLabel}`));
  }
  if (isFieldEnabled('financialSummary', 'discountAmount')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.discount', 'الخصم'), `${totalsDisplay.discountAmount} ${currencyLabel}`));
  }
  if (isFieldEnabled('financialSummary', 'taxAmount')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.tax', 'الضريبة'), `${totalsDisplay.taxAmount} ${currencyLabel}`));
  }

  const showFinalTotal = isFieldEnabled('financialSummary', 'finalTotal');
  const financialFinalHtml = showFinalTotal
    ? `<div class="totals-final">${renderTotalsItem(t('reservations.details.labels.total', 'الإجمالي النهائي'), `${totalsDisplay.finalTotal} ${currencyLabel}`, { variant: 'final' })}</div>`
    : '';

  const financialSectionMarkup = includeSection('financialSummary')
    ? (() => {
        if (!financialInlineItems.length && !showFinalTotal) {
          return `<section class="quote-section quote-section--financial">${noFieldsMessage}</section>`;
        }
        return `<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${escapeHtml(t('reservations.details.labels.summary', 'الملخص المالي'))}</h3>
            ${financialInlineItems.length ? `<div class="totals-inline">${financialInlineItems.join('')}</div>` : ''}
            ${financialFinalHtml}
          </div>
        </section>`;
      })()
    : '';

  const itemColumns = QUOTE_ITEMS_COLUMN_DEFS.filter((column) => isFieldEnabled('items', column.id));
  const hasItemColumns = itemColumns.length > 0;
  const itemTableHeader = hasItemColumns
    ? itemColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const hasItems = Array.isArray(reservation.items) && reservation.items.length > 0;
  const itemsBodyRows = hasItems
    ? reservation.items.map((item, index) => `<tr>${itemColumns.map((column) => `<td>${column.render(item, index)}</td>`).join('')}</tr>`).join('')
    : `<tr><td colspan="${Math.max(itemColumns.length, 1)}" class="empty">${escapeHtml(t('reservations.details.noItems', '📦 لا توجد معدات ضمن هذا الحجز حالياً.'))}</td></tr>`;

  const itemsSectionMarkup = includeSection('items')
    ? (hasItemColumns
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${itemTableHeader}</tr>
              </thead>
              <tbody>${itemsBodyRows}</tbody>
            </table>
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const crewColumns = QUOTE_CREW_COLUMN_DEFS.filter((column) => isFieldEnabled('crew', column.id));
  const hasCrewColumns = crewColumns.length > 0;
  const crewHeader = hasCrewColumns
    ? crewColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const crewBodyRows = technicians.length
    ? technicians.map((tech, index) => `<tr>${crewColumns.map((column) => `<td>${column.render(tech, index)}</td>`).join('')}</tr>`).join('')
    : `<tr><td colspan="${Math.max(crewColumns.length, 1)}" class="empty">${escapeHtml(t('reservations.details.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.'))}</td></tr>`;

  const crewSectionMarkup = includeSection('crew')
    ? (hasCrewColumns
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.technicians.title', 'طاقم العمل'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${crewHeader}</tr>
              </thead>
              <tbody>${crewBodyRows}</tbody>
            </table>
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.technicians.title', 'طاقم العمل'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const notesSectionMarkup = includeSection('notes')
    ? `<section class="quote-section">
        <h3>${escapeHtml(t('reservations.details.labels.notes', 'ملاحظات الحجز'))}</h3>
        <div class="quote-notes">${notes ? escapeHtml(notes) : escapeHtml(t('reservations.quote.emptyNotes', 'لا توجد ملاحظات إضافية.'))}</div>
      </section>`
    : '';

  const paymentRows = [];
  if (isFieldEnabled('payment', 'beneficiary')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.beneficiary', 'اسم المستفيد'), QUOTE_COMPANY_INFO.beneficiaryName));
  }
  if (isFieldEnabled('payment', 'bank')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.bank', 'اسم البنك'), QUOTE_COMPANY_INFO.bankName));
  }
  if (isFieldEnabled('payment', 'account')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.account', 'رقم الحساب'), normalizeNumbers(QUOTE_COMPANY_INFO.accountNumber)));
  }
  if (isFieldEnabled('payment', 'iban')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.iban', 'رقم الآيبان'), normalizeNumbers(QUOTE_COMPANY_INFO.iban)));
  }

  const paymentSectionMarkup = `<section class="quote-section">
      <div class="payment-block">
        <h3>${escapeHtml(t('reservations.quote.sections.payment', 'بيانات الدفع'))}</h3>
        <div class="payment-rows">${paymentRows.length ? paymentRows.join('') : noFieldsMessage}</div>
      </div>
      <p class="quote-approval-note">${escapeHtml(QUOTE_COMPANY_INFO.approvalNote)}</p>
    </section>`;


  const termsSectionMarkup = `<footer class="quote-footer">
        <h4>${escapeHtml(t('reservations.quote.labels.terms', 'الشروط العامة'))}</h4>
        <ul>${QUOTE_TERMS.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
      </footer>`;

  const primaryBlocks = [];

  if (customerSectionMarkup && reservationSectionMarkup) {
    primaryBlocks.push(withBlockAttributes(
      `<div class="quote-section-row">${customerSectionMarkup}${reservationSectionMarkup}</div>`,
      { blockType: 'group' }
    ));
  } else {
    if (reservationSectionMarkup) {
      primaryBlocks.push(withBlockAttributes(reservationSectionMarkup));
    }
    if (customerSectionMarkup) {
      primaryBlocks.push(withBlockAttributes(customerSectionMarkup));
    }
  }

  if (projectSectionMarkup) {
    primaryBlocks.push(withBlockAttributes(projectSectionMarkup));
  }

  const tableBlocks = [];
  if (itemsSectionMarkup) {
    tableBlocks.push(withBlockAttributes(itemsSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="items"' }));
  }
  if (crewSectionMarkup) {
    tableBlocks.push(withBlockAttributes(crewSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="crew"' }));
  }

  const summaryBlocks = [];
  if (financialSectionMarkup) {
    summaryBlocks.push(withBlockAttributes(financialSectionMarkup, { blockType: 'summary' }));
  }
  if (notesSectionMarkup) {
    summaryBlocks.push(withBlockAttributes(notesSectionMarkup));
  }

  const footerBlocks = [
    withBlockAttributes(paymentSectionMarkup, { blockType: 'payment' }),
    withBlockAttributes(termsSectionMarkup, { blockType: 'footer' })
  ];

  const orderedBlocks = [
    ...ensureBlocks(primaryBlocks, 'reservations.quote.placeholder.page1'),
    ...tableBlocks,
    ...ensureBlocks(summaryBlocks, 'reservations.quote.placeholder.page2'),
    ...footerBlocks
  ];

  const headerTemplateHtml = `
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${escapeHtml(QUOTE_COMPANY_INFO.logoUrl)}" alt="${escapeHtml(QUOTE_COMPANY_INFO.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(t('reservations.quote.title', 'عرض السعر'))}</h1>
        <p class="quote-company-name">${escapeHtml(QUOTE_COMPANY_INFO.companyName)}</p>
        <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${escapeHtml(quoteNumber)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>
    </header>
  `.trim();

  return `
    <div id="quotation-pdf-root" dir="rtl">
      <style>${QUOTE_PDF_STYLES}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${headerTemplateHtml}
          ${orderedBlocks.join('')}
        </div>
      </div>
    </div>
  `;
}

function waitForImage(image) {
  if (!image) return Promise.resolve();
  if (image.complete && image.naturalHeight !== 0) return Promise.resolve();
  return new Promise((resolve) => {
    const finalize = () => resolve();
    image.addEventListener('load', finalize, { once: true });
    image.addEventListener('error', finalize, { once: true });
  });
}

async function waitForQuoteAssets(root) {
  if (!root) return;
  const doc = root.ownerDocument || document;
  const view = doc.defaultView || window;
  const images = Array.from(root.querySelectorAll?.('img') || []);
  const fontPromise = doc.fonts?.ready ? doc.fonts.ready.catch(() => {}) : Promise.resolve();
  await Promise.allSettled([
    fontPromise,
    ...images.map((img) => waitForImage(img))
  ]);
  await new Promise((resolve) => view.requestAnimationFrame(() => resolve()));
}

async function layoutQuoteDocument(root, { context = 'preview' } = {}) {
  if (!root) return;
  const isPreview = context === 'preview';
  const doc = root.ownerDocument || document;
  root.setAttribute('data-quote-render-context', context);
  const pagesContainer = root.querySelector('[data-quote-pages]');
  const sourceContainer = root.querySelector('[data-quote-source]');
  const headerTemplate = sourceContainer?.querySelector('[data-quote-header-template]');
  if (!pagesContainer || !sourceContainer || !headerTemplate) return;

  pagesContainer.style.display = 'block';
  pagesContainer.style.margin = '0';
  pagesContainer.style.padding = '0';
  pagesContainer.style.gap = '0px';
  pagesContainer.style.rowGap = '0px';
  pagesContainer.style.columnGap = '0px';
  pagesContainer.style.alignItems = 'stretch';
  pagesContainer.style.justifyContent = 'flex-start';

  await waitForQuoteAssets(sourceContainer);

  pagesContainer.innerHTML = '';

  const blockNodes = Array.from(sourceContainer.querySelectorAll(':scope > [data-quote-block]'));

  let currentPage = null;
  let currentBody = null;

  const applyPageBaseStyles = (page) => {
    page.style.margin = '0 auto';
    page.style.breakInside = 'avoid';
    page.style.pageBreakInside = 'avoid';
    page.style.pageBreakAfter = 'auto';
    page.style.breakAfter = 'auto';
  };

  const createPage = () => {
    const page = doc.createElement('div');
    const isFirstPage = pagesContainer.childElementCount === 0;
    page.className = 'quote-page';
    page.dataset.pageIndex = String(pagesContainer.childElementCount);
    if (isFirstPage) {
      page.classList.add('quote-page--primary');
      const headerClone = headerTemplate.cloneNode(true);
      headerClone.removeAttribute('data-quote-header-template');
      page.appendChild(headerClone);
    } else {
      page.classList.add('quote-page--continuation');
    }
    const body = doc.createElement('main');
    body.className = 'quote-body';
    page.appendChild(body);
    pagesContainer.appendChild(page);
    applyPageBaseStyles(page);
    currentPage = page;
    currentBody = body;
  };

  const ensureActivePage = () => {
    if (!currentPage || !currentBody || !currentBody.isConnected) {
      createPage();
    }
  };

  const removeCurrentPageIfEmpty = () => {
    if (!currentPage || !currentBody) return;
    if (currentBody.childElementCount > 0) return;
    const pageToRemove = currentPage;
    currentPage = null;
    currentBody = null;
    if (pageToRemove.parentNode) {
      pageToRemove.parentNode.removeChild(pageToRemove);
    }
  };

  const moveToNextPage = () => {
    currentPage = null;
    currentBody = null;
  };

  const isOverflowing = () => {
    if (!currentPage) return false;
    return (currentPage.scrollHeight - currentPage.clientHeight) > PAGE_OVERFLOW_TOLERANCE_PX;
  };

  const appendBlock = (node, { allowOverflow = false } = {}) => {
    ensureActivePage();
    currentBody.appendChild(node);
    if (isOverflowing() && !allowOverflow) {
      currentBody.removeChild(node);
      removeCurrentPageIfEmpty();
      return false;
    }
    return true;
  };

  const placeBlock = (node) => {
    const clone = node.cloneNode(true);
    clone.removeAttribute?.('data-quote-block');
    clone.removeAttribute?.('data-block-type');
    clone.removeAttribute?.('data-table-id');
    if (appendBlock(clone)) return;
    moveToNextPage();
    if (appendBlock(clone)) return;
    appendBlock(clone, { allowOverflow: true });
  };

  const paginateTableBlock = (node) => {
    const table = node.querySelector('table');
    if (!table) {
      placeBlock(node);
      return;
    }

    const heading = node.querySelector('h3');
    const tableHead = table.querySelector('thead');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    if (!rows.length) {
      placeBlock(node);
      return;
    }

    let fragment = null;
    let renderedRowCount = 0;

    const createFragment = (isContinuation = false) => {
      const section = node.cloneNode(false);
      section.removeAttribute('data-quote-block');
      section.removeAttribute('data-block-type');
      section.removeAttribute('data-table-id');
      section.classList.add('quote-section--table-fragment');
      if (isContinuation) {
        section.classList.add('quote-section--table-fragment--continued');
      }
      const headingClone = heading ? heading.cloneNode(true) : null;
      if (headingClone) {
        section.appendChild(headingClone);
      }
      const tableClone = table.cloneNode(false);
      tableClone.classList.add('quote-table--fragment');
      if (tableHead) {
        tableClone.appendChild(tableHead.cloneNode(true));
      }
      const body = doc.createElement('tbody');
      tableClone.appendChild(body);
      section.appendChild(tableClone);
      return { section, body };
    };

    const ensureFragment = (isContinuation = false) => {
      if (fragment) return fragment;
      fragment = createFragment(isContinuation);
      if (!appendBlock(fragment.section)) {
        moveToNextPage();
        if (!appendBlock(fragment.section)) {
          appendBlock(fragment.section, { allowOverflow: true });
        }
      }
      return fragment;
    };

    rows.forEach((row) => {
      ensureFragment(renderedRowCount > 0);
      const rowClone = row.cloneNode(true);
      fragment.body.appendChild(rowClone);
      if (isOverflowing()) {
        fragment.body.removeChild(rowClone);
        if (!fragment.body.childElementCount) {
          currentBody.removeChild(fragment.section);
          fragment = null;
          removeCurrentPageIfEmpty();
        }
        moveToNextPage();
        fragment = null;
        ensureFragment(renderedRowCount > 0);
        fragment.body.appendChild(rowClone);
        if (isOverflowing()) {
          fragment.section.classList.add('quote-section--table-fragment--overflow');
          renderedRowCount += 1;
          return;
        }
      }
      renderedRowCount += 1;
    });

    fragment = null;
  };

  if (!blockNodes.length) {
    return;
  }

  blockNodes.forEach((blockNode) => {
    const type = blockNode.getAttribute('data-block-type');
    if (type === 'table') {
      paginateTableBlock(blockNode);
    } else {
      placeBlock(blockNode);
    }
  });

  const pages = Array.from(pagesContainer.children);
  const filteredPages = [];
  pages.forEach((page, index) => {
    const body = page.querySelector('.quote-body');
    if (index !== 0 && (!body || body.childElementCount === 0)) {
      page.remove();
      return;
    }
    filteredPages.push(page);
  });

  filteredPages.forEach((page, index) => {
    const isFirst = index === 0;
    page.style.pageBreakAfter = 'auto';
    page.style.breakAfter = 'auto';
    page.style.pageBreakBefore = isFirst ? 'auto' : 'always';
    page.style.breakBefore = isFirst ? 'auto' : 'page';
    if (!isPreview) {
      page.style.boxShadow = 'none';
    } else {
      page.style.boxShadow = '';
    }
  });

  const lastPage = filteredPages[filteredPages.length - 1] || null;
  currentPage = lastPage;
  currentBody = lastPage?.querySelector('.quote-body') || null;

  await waitForQuoteAssets(pagesContainer);

  if (isPreview) {
    pagesContainer.style.display = 'flex';
    pagesContainer.style.flexDirection = 'column';
    pagesContainer.style.alignItems = 'center';
    pagesContainer.style.justifyContent = 'flex-start';
    pagesContainer.style.rowGap = '18px';
    pagesContainer.style.columnGap = '0px';
    pagesContainer.style.gap = '18px';
  }
}

async function renderQuotePagesAsPdf(root, { filename, safariWindowRef = null }) {
  if (!root) return;
  const pages = Array.from(root.querySelectorAll('.quote-page'));
  if (!pages.length) {
    throw new Error('لا توجد صفحات لتصديرها.');
  }

  const [JsPdfConstructor, html2canvasFn] = await Promise.all([
    ensureJsPdf(),
    ensureHtml2Canvas()
  ]);

  const safariMode = isIosSafari();
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const captureScale = safariMode ? Math.min(1.2, Math.max(1, devicePixelRatio)) : Math.min(1.6, Math.max(1.2, devicePixelRatio));
  const pdf = new JsPdfConstructor({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index];
    await waitForQuoteAssets(page);
    const canvas = await html2canvasFn(page, {
      scale: captureScale,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: '#ffffff',
      letterRendering: true,
      removeContainer: safariMode
    });
    const imageData = canvas.toDataURL('image/jpeg', safariMode ? 0.82 : 0.9);
    if (index > 0) {
      pdf.addPage();
    }
    pdf.addImage(imageData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, `page-${index + 1}`, 'FAST');

    // Yield to keep UI responsive, important for mobile devices
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
  }

  if (safariMode) {
    const blobUrl = pdf.output('bloburl');
    if (safariWindowRef && !safariWindowRef.closed) {
      safariWindowRef.location.href = blobUrl;
    } else {
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = filename;
      tempLink.rel = 'noopener';
      tempLink.target = '_blank';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
  } else {
    pdf.save(filename);
  }
}


function renderQuotePreview() {
  if (!activeQuoteState || !quoteModalRefs) return;
  const { previewFrame } = quoteModalRefs;
  if (!previewFrame) return;

  const html = buildQuotationHtml({
    reservation: activeQuoteState.reservation,
    customer: activeQuoteState.customer,
    project: activeQuoteState.project,
    technicians: activeQuoteState.technicians,
    totalsDisplay: activeQuoteState.totalsDisplay,
    rentalDays: activeQuoteState.rentalDays,
    currencyLabel: activeQuoteState.currencyLabel,
    sections: activeQuoteState.sections,
    fieldSelections: activeQuoteState.fields,
    quoteNumber: activeQuoteState.quoteNumber,
    quoteDate: activeQuoteState.quoteDateLabel
  });

  previewFrame.srcdoc = `<!DOCTYPE html>${html}`;
  previewFrame.addEventListener('load', async () => {
    const doc = previewFrame.contentDocument;
    const view = doc?.defaultView || window;
    const rootNode = doc?.documentElement || doc;
    if (rootNode) {
      scrubUnsupportedColorFunctions(rootNode);
      sanitizeComputedColorFunctions(rootNode, view);
      enforceLegacyColorFallback(rootNode, view);
    }
    const pdfRoot = doc?.getElementById('quotation-pdf-root');
    try {
      if (pdfRoot) {
        await layoutQuoteDocument(pdfRoot, { context: 'preview' });
      }
    } catch (error) {
      console.error('[reservations/pdf] failed to layout preview document', error);
    }
    const pages = Array.from(doc?.querySelectorAll?.('.quote-page') || []);
    const pagesContainer = doc?.querySelector('.quote-preview-pages');
    const baseWidth = A4_WIDTH_PX;

    let pageGap = 18;
    if (pagesContainer && doc?.defaultView) {
      const styles = doc.defaultView.getComputedStyle(pagesContainer);
      const gapCandidate = parseFloat(styles.rowGap || styles.gap || `${pageGap}`);
      if (Number.isFinite(gapCandidate) && gapCandidate >= 0) {
        pageGap = gapCandidate;
      }
    }

    const singlePageHeight = A4_HEIGHT_PX;
    const totalHeight = pages.length
      ? (pages.length * singlePageHeight) + Math.max(0, (pages.length - 1) * pageGap)
      : singlePageHeight;

    previewFrame.dataset.baseWidth = String(baseWidth);
    previewFrame.dataset.baseHeight = String(totalHeight);
    previewFrame.style.width = `${baseWidth}px`;
    previewFrame.style.minWidth = `${baseWidth}px`;
    previewFrame.style.height = `${totalHeight}px`;
    previewFrame.style.minHeight = `${totalHeight}px`;
    applyPreviewZoom(previewZoom);
  }, { once: true });
}

function handleToggleChange(event) {
  if (!activeQuoteState) return;
  const checkbox = event.currentTarget;
  const sectionId = checkbox?.dataset?.sectionId;
  if (!sectionId) return;
  if (checkbox.checked) {
    activeQuoteState.sections.add(sectionId);
  } else {
    activeQuoteState.sections.delete(sectionId);
  }
  renderQuoteToggles();
  renderQuotePreview();
}

function handleFieldToggleChange(event) {
  if (!activeQuoteState) return;
  const checkbox = event.currentTarget;
  const sectionId = checkbox?.dataset?.sectionId;
  const fieldId = checkbox?.dataset?.fieldId;
  if (!sectionId || !fieldId) return;
  const selections = activeQuoteState.fields || (activeQuoteState.fields = buildDefaultFieldSelections());
  const set = getFieldSelectionSet(selections, sectionId);
  if (checkbox.checked) {
    set.add(fieldId);
  } else {
    set.delete(fieldId);
  }
  renderQuotePreview();
}

function renderQuoteToggles() {
  if (!quoteModalRefs?.toggles || !activeQuoteState) return;
  const { toggles } = quoteModalRefs;
  const selections = activeQuoteState.fields || {};
  const items = QUOTE_SECTION_DEFS.map(({ id, labelKey, fallback }) => {
    const sectionLabel = t(labelKey, fallback);
    const sectionChecked = activeQuoteState.sections.has(id);
    const fields = QUOTE_FIELD_DEFS[id] || [];
    const fieldList = fields.length
      ? `<div class="quote-toggle-sublist">
          ${fields.map((field) => {
            const fieldChecked = isFieldEnabledInSelections(selections, id, field.id);
            const disabledAttr = sectionChecked ? '' : 'disabled';
            const fieldLabel = field.labelKey ? t(field.labelKey, field.fallback) : field.fallback;
            return `
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${id}" data-field-id="${field.id}" ${fieldChecked ? 'checked' : ''} ${disabledAttr}>
                <span>${escapeHtml(fieldLabel)}</span>
              </label>
            `;
          }).join('')}
        </div>`
      : '';
    return `
      <div class="quote-toggle-group">
        <label class="quote-toggle quote-toggle--section">
          <input type="checkbox" data-section-toggle data-section-id="${id}" ${sectionChecked ? 'checked' : ''}>
          <span>${escapeHtml(sectionLabel)}</span>
        </label>
        ${fieldList}
      </div>
    `;
  }).join('');

  toggles.innerHTML = items;
  toggles.querySelectorAll('input[data-section-toggle]').forEach((input) => {
    input.addEventListener('change', handleToggleChange);
  });
  toggles.querySelectorAll('input[data-field-toggle]').forEach((input) => {
    input.addEventListener('change', handleFieldToggleChange);
  });
}

function ensureQuoteModal() {
  if (quoteModalRefs?.modal) return quoteModalRefs;

  const modal = document.createElement('div');
  modal.id = 'reservationQuoteModal';
  modal.className = 'modal fade quote-preview-modal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'reservationQuoteModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${escapeHtml(t('reservations.quote.previewTitle', 'معاينة عرض السعر'))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${escapeHtml(t('reservations.quote.toggleHeading', 'حدد المعلومات المراد تصديرها'))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${escapeHtml(t('reservations.quote.actions.close', 'إغلاق'))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${escapeHtml(t('reservations.quote.actions.export', '📄 تنزيل PDF'))}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const toggles = modal.querySelector('[data-quote-toggles]');
  const preview = modal.querySelector('[data-quote-preview]');
  const meta = modal.querySelector('[data-quote-meta]');
  const downloadBtn = modal.querySelector('[data-quote-download]');
  const modalHeader = modal.querySelector('.modal-header');
  const headerCloseButton = modalHeader?.querySelector('.btn-close');

  const headerActions = document.createElement('div');
  headerActions.className = 'quote-preview-header-actions';
  if (modalHeader) {
    modalHeader.insertBefore(headerActions, headerCloseButton || null);
  }

  const previewFrame = document.createElement('iframe');
  previewFrame.className = 'quote-preview-frame';
  previewFrame.setAttribute('title', t('reservations.quote.previewTitle', 'معاينة عرض السعر'));
  previewFrame.setAttribute('loading', 'lazy');
  previewFrame.setAttribute('frameborder', '0');
  const zoomControls = document.createElement('div');
  zoomControls.className = 'quote-preview-zoom-controls';
  zoomControls.innerHTML = `
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${escapeHtml(t('reservations.quote.zoom.out', 'تصغير'))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${escapeHtml(t('reservations.quote.zoom.in', 'تكبير'))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${escapeHtml(t('reservations.quote.zoom.reset', 'إعادة الضبط'))}">1:1</button>
  `;

  const frameWrapper = document.createElement('div');
  frameWrapper.className = 'quote-preview-frame-wrapper';
  frameWrapper.appendChild(previewFrame);

  preview.innerHTML = '';
  preview.appendChild(frameWrapper);
  headerActions.appendChild(zoomControls);

  downloadBtn?.addEventListener('click', async () => {
    if (!activeQuoteState) return;
    downloadBtn.disabled = true;
    try {
      await exportQuoteAsPdf();
    } finally {
      downloadBtn.disabled = false;
    }
  });

  quoteModalRefs = {
    modal,
    toggles,
    preview,
    previewFrameWrapper: frameWrapper,
    zoomControls,
    zoomValue: zoomControls.querySelector('[data-zoom-value]'),
    previewFrame,
    meta,
    downloadBtn
  };

  const zoomOutBtn = zoomControls.querySelector('[data-zoom-out]');
  const zoomInBtn = zoomControls.querySelector('[data-zoom-in]');
  const zoomResetBtn = zoomControls.querySelector('[data-zoom-reset]');

  zoomOutBtn?.addEventListener('click', () => adjustPreviewZoom(-0.1));
  zoomInBtn?.addEventListener('click', () => adjustPreviewZoom(0.1));
  zoomResetBtn?.addEventListener('click', () => setPreviewZoom(1));

  setPreviewZoom(previewZoom);

  return quoteModalRefs;
}

function setPreviewZoom(value) {
  previewZoom = Math.min(Math.max(value, 0.2), 2);
  applyPreviewZoom(previewZoom);
  if (quoteModalRefs?.zoomValue) {
    quoteModalRefs.zoomValue.textContent = `${Math.round(previewZoom * 100)}%`;
  }
}

function adjustPreviewZoom(delta) {
  setPreviewZoom(previewZoom + delta);
}

function applyPreviewZoom(value) {
  if (!quoteModalRefs?.previewFrame || !quoteModalRefs.previewFrameWrapper) return;
  const frame = quoteModalRefs.previewFrame;
  const wrapper = quoteModalRefs.previewFrameWrapper;
  const baseWidth = Number(frame.dataset.baseWidth) || 794;
  const baseHeight = Number(frame.dataset.baseHeight) || frame.contentDocument?.body?.scrollHeight || 1123;
  frame.style.transform = `scale(${value})`;
  frame.style.transformOrigin = 'top center';
  wrapper.style.width = `${baseWidth}px`;
  wrapper.style.maxWidth = `${baseWidth}px`;
  wrapper.style.minWidth = `${baseWidth}px`;
  wrapper.style.minHeight = `${baseHeight}px`;
  wrapper.style.height = `${baseHeight}px`;
}

function updateQuoteMeta() {
  if (!quoteModalRefs?.meta || !activeQuoteState) return;
  const { meta } = quoteModalRefs;
  meta.innerHTML = `
    <div class="quote-meta-card">
      <div><span>${escapeHtml(t('reservations.quote.labels.number', 'رقم عرض السعر'))}</span><strong>${escapeHtml(activeQuoteState.quoteNumber)}</strong></div>
      <div><span>${escapeHtml(t('reservations.quote.labels.dateGregorian', 'التاريخ الميلادي'))}</span><strong>${escapeHtml(activeQuoteState.quoteDateLabel)}</strong></div>
    </div>
  `;
}

async function exportQuoteAsPdf() {
  if (!activeQuoteState) return;
  await ensureHtml2Pdf();

  const html = buildQuotationHtml({
    reservation: activeQuoteState.reservation,
    customer: activeQuoteState.customer,
    project: activeQuoteState.project,
    technicians: activeQuoteState.technicians,
    totalsDisplay: activeQuoteState.totalsDisplay,
    rentalDays: activeQuoteState.rentalDays,
    currencyLabel: activeQuoteState.currencyLabel,
    sections: activeQuoteState.sections,
    fieldSelections: activeQuoteState.fields,
    quoteNumber: activeQuoteState.quoteNumber,
    quoteDate: activeQuoteState.quoteDateLabel
  });

  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.top = '-10000px';
  container.style.left = '0';
  container.style.zIndex = '-1';
  document.body.appendChild(container);

  scrubUnsupportedColorFunctions(container);
  sanitizeComputedColorFunctions(container);
  enforceLegacyColorFallback(container);

  const pdfRoot = container.firstElementChild;

  const safariDownloadWindow = isIosSafari() ? window.open('', '_blank') : null;
  if (pdfRoot) {
    pdfRoot.setAttribute('dir', 'rtl');
    pdfRoot.style.direction = 'rtl';
    pdfRoot.style.textAlign = 'right';
    pdfRoot.setAttribute('data-theme', 'light');
    pdfRoot.classList.remove('dark', 'dark-mode');
    pdfRoot.style.margin = '0';
    pdfRoot.style.padding = '0';
    pdfRoot.style.width = '210mm';
    pdfRoot.style.maxWidth = '210mm';
    pdfRoot.style.marginLeft = 'auto';
    pdfRoot.style.marginRight = 'auto';
    pdfRoot.scrollTop = 0;
    pdfRoot.scrollLeft = 0;
    try {
      await layoutQuoteDocument(pdfRoot, { context: 'export' });
    } catch (error) {
      console.error('[reservations/pdf] failed to layout export document', error);
    }
  }

  try {
    const filename = `quotation-${activeQuoteState.quoteNumber}.pdf`;
    await renderQuotePagesAsPdf(pdfRoot, { filename, safariWindowRef: safariDownloadWindow });
    if (!activeQuoteState.sequenceCommitted) {
      commitQuoteSequence(activeQuoteState.quoteSequence);
      activeQuoteState.sequenceCommitted = true;
    }
  } finally {
    document.body.removeChild(container);
  }
}

function openQuoteModal() {
  const refs = ensureQuoteModal();
  if (!refs?.modal) return;

  setPreviewZoom(1);

  renderQuoteToggles();
  updateQuoteMeta();
  renderQuotePreview();

  if (window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(refs.modal).show();
  }
}

export async function exportReservationPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  const technicians = collectAssignedTechnicians(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, technicians, project);
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const { sequence, quoteNumber } = peekNextQuoteSequence();
  const now = new Date();

  activeQuoteState = {
    reservation,
    customer,
    project,
    technicians,
    totals,
    totalsDisplay,
    rentalDays,
    currencyLabel,
    sections: new Set(QUOTE_SECTION_DEFS.filter((section) => section.defaultSelected).map((section) => section.id)),
    fields: buildDefaultFieldSelections(),
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };

  openQuoteModal();
}
