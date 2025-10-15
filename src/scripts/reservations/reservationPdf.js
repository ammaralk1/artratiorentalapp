import { loadData } from '../storage.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { normalizeNumbers, formatDateTime, showToast } from '../utils.js';
import { calculateReservationDays, DEFAULT_COMPANY_SHARE_PERCENT } from '../reservationsSummary.js';
import { resolveReservationProjectState } from '../reservationsShared.js';
import quotePdfStyles from '../../styles/quotePdf.css?raw';

const QUOTE_SEQUENCE_STORAGE_KEY = 'reservations.quote.sequence';

const QUOTE_COMPANY_INFO = {
  logoUrl: 'https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png',
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
    { id: 'companyShare', labelKey: 'reservations.details.labels.companyShare', fallback: '🏦 نسبة الشركة' },
    { id: 'netProfit', labelKey: 'reservations.details.labels.netProfit', fallback: 'صافي الربح' },
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

const SVG_DATA_URI_REGEX = /^data:image\/svg\+xml/i;
const SVG_EXTENSION_REGEX = /\.svg($|[?#])/i;
const SVG_FALLBACK_DIMENSION = 512;
const TRANSPARENT_PIXEL_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=';

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
const IOS_SAFARI_REGEX = /(iphone|ipad|ipod)/i;
const IOS_SAFARI_EXCLUDED_BROWSERS_REGEX = /(crios|fxios|edgios|opios)/i;
const PAGE_SEGMENT_MAX_HEIGHT_PX = Math.round((A4_HEIGHT_MM / MM_PER_INCH) * CSS_DPI);
const PDF_LOG_PREFIX = '[reservations/pdf]';

let quoteModalRefs = null;
let activeQuoteState = null;
let previewZoom = 1;
let ensureJsPdfPromise = null;
let ensureHtml2CanvasPromise = null;
let manualQuoteBackdrop = null;
let manualQuoteEscapeHandler = null;

function hasBootstrapModalSupport() {
  return Boolean(window?.bootstrap?.Modal);
}

function showModalFallback(modalEl) {
  if (!modalEl) return;
  if (modalEl.classList.contains('show')) return;
  modalEl.classList.add('show');
  modalEl.style.display = 'block';
  modalEl.removeAttribute('aria-hidden');
  modalEl.setAttribute('aria-modal', 'true');
  if (!modalEl.getAttribute('role')) {
    modalEl.setAttribute('role', 'dialog');
  }
  document.body.classList.add('modal-open');

  if (!manualQuoteBackdrop) {
    manualQuoteBackdrop = document.createElement('div');
    manualQuoteBackdrop.className = 'modal-backdrop fade show';
    manualQuoteBackdrop.dataset.quotePdfFallbackBackdrop = 'true';
    document.body.appendChild(manualQuoteBackdrop);
  }

  if (!manualQuoteEscapeHandler) {
    manualQuoteEscapeHandler = (event) => {
      if (event.key === 'Escape') {
        hideModalFallback(modalEl);
      }
    };
    document.addEventListener('keydown', manualQuoteEscapeHandler);
  }

  try {
    modalEl.focus({ preventScroll: true });
  } catch (_focusError) {
    // ignore focus issues on older browsers
  }
}

function hideModalFallback(modalEl) {
  if (!modalEl || !modalEl.classList.contains('show')) return;
  modalEl.classList.remove('show');
  modalEl.style.display = 'none';
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.removeAttribute('aria-modal');
  document.body.classList.remove('modal-open');

  if (manualQuoteBackdrop) {
    manualQuoteBackdrop.remove();
    manualQuoteBackdrop = null;
  }

  if (manualQuoteEscapeHandler) {
    document.removeEventListener('keydown', manualQuoteEscapeHandler);
    manualQuoteEscapeHandler = null;
  }
}

function showQuoteModalElement(modalEl) {
  if (!modalEl) return;
  if (hasBootstrapModalSupport()) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    return;
  }
  showModalFallback(modalEl);
}

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

function buildDefaultSectionExpansions() {
  return Object.fromEntries(QUOTE_SECTION_DEFS.map(({ id }) => [id, false]));
}

function ensureSectionExpansionState(state, sectionId) {
  if (!state.sectionExpansions) {
    state.sectionExpansions = buildDefaultSectionExpansions();
  }
  if (sectionId && typeof state.sectionExpansions[sectionId] !== 'boolean') {
    state.sectionExpansions[sectionId] = false;
  }
  return state.sectionExpansions;
}

function isSectionExpanded(state, sectionId) {
  const expansions = ensureSectionExpansionState(state, sectionId);
  return expansions?.[sectionId] !== false;
}

function isMobileViewport() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(max-width: 768px)').matches;
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

function isMobileSafariBrowser() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return IOS_SAFARI_REGEX.test(ua) && SAFARI_USER_AGENT_REGEX.test(ua) && !IOS_SAFARI_EXCLUDED_BROWSERS_REGEX.test(ua);
}

function logPdfDebug(message, ...args) {
  try {
    console.log(`${PDF_LOG_PREFIX} ${message}`, ...args);
  } catch (error) {
    // Ignore logging failures
  }
}

function logPdfWarn(message, ...args) {
  try {
    console.warn(`${PDF_LOG_PREFIX} ${message}`, ...args);
  } catch (error) {
    // Ignore logging failures
  }
}

function logPdfError(message, error, ...args) {
  try {
    if (error) {
      console.error(`${PDF_LOG_PREFIX} ${message}`, error, ...args);
    } else {
      console.error(`${PDF_LOG_PREFIX} ${message}`, ...args);
    }
  } catch (loggingError) {
    // Ignore logging failures
  }
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

function parseSvgDimension(value, fallback = SVG_FALLBACK_DIMENSION) {
  if (typeof value !== 'string' && typeof value !== 'number') return fallback;
  const numeric = parseFloat(String(value).replace(/[^0-9.+-]/g, ''));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
}

function resolveSvgElementDimensions(svgElement) {
  if (!svgElement) {
    return { width: SVG_FALLBACK_DIMENSION, height: SVG_FALLBACK_DIMENSION };
  }

  const widthAttr = svgElement.getAttribute?.('width');
  const heightAttr = svgElement.getAttribute?.('height');
  let width = widthAttr ? parseSvgDimension(widthAttr, 0) : 0;
  let height = heightAttr ? parseSvgDimension(heightAttr, 0) : 0;

  if (width > 0 && height > 0) {
    return { width, height };
  }

  const viewBox = svgElement.getAttribute?.('viewBox');
  if (viewBox) {
    const parts = viewBox.trim().split(/[\s,]+/).map((part) => parseFloat(part || '0'));
    if (parts.length >= 4) {
      const [, , vbWidth, vbHeight] = parts;
      width = width || (Number.isFinite(vbWidth) && vbWidth > 0 ? vbWidth : 0);
      height = height || (Number.isFinite(vbHeight) && vbHeight > 0 ? vbHeight : 0);
    }
  }

  return {
    width: width || SVG_FALLBACK_DIMENSION,
    height: height || SVG_FALLBACK_DIMENSION
  };
}

function isSvgImageSource(src = '') {
  if (typeof src !== 'string') return false;
  return SVG_DATA_URI_REGEX.test(src) || SVG_EXTENSION_REGEX.test(src);
}

function decodeSvgDataUri(dataUri = '') {
  const commaIndex = dataUri.indexOf(',');
  if (commaIndex === -1) return '';
  const metadata = dataUri.slice(0, commaIndex);
  const payload = dataUri.slice(commaIndex + 1);
  try {
    if (/;base64/i.test(metadata)) {
      return typeof atob === 'function' ? atob(payload) : '';
    }
    return decodeURIComponent(payload);
  } catch (error) {
    console.warn('[reservations/pdf] failed to decode SVG data URI', error);
    return '';
  }
}

function loadImageElement(src, { crossOrigin } = {}) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }
    image.onload = () => resolve(image);
    image.onerror = (event) => {
      const message = event?.message || `Unable to load image from ${src}`;
      reject(new Error(message));
    };
    image.src = src;
  });
}

async function rasterizeSvgContent(svgMarkup, dimensions = {}) {
  if (!svgMarkup) return null;
  const doc = document;
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const image = await loadImageElement(url);
    const canvas = doc.createElement('canvas');
    const width = Math.max(dimensions.width || image.naturalWidth || image.width || 0, 1);
    const height = Math.max(dimensions.height || image.naturalHeight || image.height || width, 1);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.warn('[reservations/pdf] failed to rasterize SVG content', error);
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function fetchSvgMarkup(src) {
  if (!src) return null;
  if (SVG_DATA_URI_REGEX.test(src)) {
    return decodeSvgDataUri(src);
  }

  try {
    const response = await fetch(src, {
      mode: 'cors',
      credentials: 'omit',
      cache: 'default'
    });
    if (!response.ok) {
      console.warn('[reservations/pdf] failed to fetch SVG image', src, response.status);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.warn('[reservations/pdf] error fetching SVG image', src, error);
    return null;
  }
}

async function convertSvgImageElement(img) {
  if (!img) return false;
  const src = img.getAttribute?.('src') || '';
  if (!isSvgImageSource(src)) return false;
  const svgMarkup = await fetchSvgMarkup(src);
  if (!svgMarkup) {
    img.dataset.svgRasterization = 'failed';
    img.setAttribute('src', TRANSPARENT_PIXEL_DATA_URL);
    return false;
  }
  const dataUrl = await rasterizeSvgContent(svgMarkup);
  if (!dataUrl) {
    img.dataset.svgRasterization = 'failed';
    img.setAttribute('src', TRANSPARENT_PIXEL_DATA_URL);
    return false;
  }
  img.dataset.svgOriginalSrc = src;
  img.setAttribute('src', dataUrl);
  img.setAttribute('data-rasterized', 'true');
  return true;
}

async function convertInlineSvgElement(svgElement) {
  if (!svgElement || svgElement.tagName?.toLowerCase() !== 'svg') return false;
  const serializer = new XMLSerializer();
  const markup = serializer.serializeToString(svgElement);
  const dimensions = resolveSvgElementDimensions(svgElement);
  const dataUrl = await rasterizeSvgContent(markup, dimensions);
  const doc = svgElement.ownerDocument || document;
  const replacement = doc.createElement('img');
  replacement.setAttribute('src', dataUrl || TRANSPARENT_PIXEL_DATA_URL);
  replacement.setAttribute('alt', svgElement.getAttribute('aria-label') || svgElement.getAttribute('title') || '');
  replacement.setAttribute('data-svg-replaced', 'true');
  if (svgElement.hasAttribute('class')) {
    replacement.setAttribute('class', svgElement.getAttribute('class'));
  }
  if (svgElement.hasAttribute('style')) {
    replacement.setAttribute('style', svgElement.getAttribute('style'));
  }
  const widthAttr = svgElement.getAttribute('width');
  const heightAttr = svgElement.getAttribute('height');
  if (widthAttr) replacement.setAttribute('width', widthAttr);
  if (heightAttr) replacement.setAttribute('height', heightAttr);

  svgElement.parentNode?.replaceChild(replacement, svgElement);
  return Boolean(dataUrl);
}

async function rasterizeQuoteImages(root) {
  if (!root) return;
  const images = Array.from(root.querySelectorAll?.('img') || []);
  const inlinedSvgs = Array.from(root.querySelectorAll?.('svg') || []);

  const tasks = [];
  images.forEach((img) => {
    if (isSvgImageSource(img.getAttribute?.('src'))) {
      tasks.push(convertSvgImageElement(img));
    }
  });

  inlinedSvgs.forEach((svg) => {
    tasks.push(convertInlineSvgElement(svg));
  });

  if (tasks.length) {
    await Promise.allSettled(tasks);
  }
}

async function capturePageSegments(page, html2canvasFn, {
  baseOptions = {},
  segmentHeightPx = PAGE_SEGMENT_MAX_HEIGHT_PX
} = {}) {
  if (!page || typeof html2canvasFn !== 'function') return [];

  const doc = page.ownerDocument || document;
  const view = doc.defaultView || window;
  const totalHeight = Math.ceil(page.scrollHeight || page.offsetHeight || PAGE_SEGMENT_MAX_HEIGHT_PX);
  const totalWidth = Math.ceil(page.scrollWidth || page.offsetWidth || A4_WIDTH_PX);
  const effectiveSegmentHeight = Math.max(1, Math.min(segmentHeightPx, PAGE_SEGMENT_MAX_HEIGHT_PX));
  const segments = [];

  for (let offset = 0; offset < totalHeight; offset += effectiveSegmentHeight) {
    const sliceHeight = Math.min(effectiveSegmentHeight, totalHeight - offset);
    const segmentContainer = doc.createElement('div');
    segmentContainer.style.position = 'fixed';
    segmentContainer.style.left = '-10000px';
    segmentContainer.style.top = '0';
    segmentContainer.style.width = `${totalWidth}px`;
    segmentContainer.style.height = `${sliceHeight}px`;
    segmentContainer.style.overflow = 'hidden';
    segmentContainer.style.pointerEvents = 'none';
    segmentContainer.style.backgroundColor = '#ffffff';
    segmentContainer.style.opacity = '1';
    segmentContainer.style.zIndex = '-1';

    const clone = page.cloneNode(true);
    clone.style.width = `${totalWidth}px`;
    clone.style.transform = `translateY(-${offset}px)`;
    clone.style.transformOrigin = 'top left';
    clone.style.margin = '0';
    clone.style.position = 'relative';
    segmentContainer.appendChild(clone);
    doc.body.appendChild(segmentContainer);

    try {
      await waitForQuoteAssets(segmentContainer);
      const canvas = await html2canvasFn(segmentContainer, {
        ...baseOptions,
        height: sliceHeight,
        windowHeight: sliceHeight,
        width: totalWidth,
        windowWidth: totalWidth,
        scrollX: 0,
        scrollY: 0
      });
      segments.push({ canvas, sliceHeight });
      logPdfDebug(`captured segment`, { offset, sliceHeight });
    } finally {
      segmentContainer.parentNode?.removeChild(segmentContainer);
      await new Promise((resolve) => view.requestAnimationFrame(resolve));
    }
  }

  return segments;
}

function handlePdfError(error, context = 'export', { toastMessage, suppressToast = false } = {}) {
  logPdfError(`${context} failed`, error);
  const alreadyNotified = Boolean(error && error.__artRatioPdfNotified);
  if (!suppressToast && !alreadyNotified) {
    const message = toastMessage || t('reservations.quote.errors.exportFailed', '⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.');
    showToast(message);
    if (error && typeof error === 'object') {
      try {
        Object.defineProperty(error, '__artRatioPdfNotified', {
          value: true,
          writable: false,
          enumerable: false,
          configurable: true
        });
      } catch (defineError) {
        // Ignore decorate failure
      }
    }
  }
}

function cleanupPdfArtifacts({ container, safariWindowRef, mobileWindowRef } = {}) {
  try {
    if (mobileWindowRef && !mobileWindowRef.closed) {
      mobileWindowRef.close();
    }
  } catch (error) {
    logPdfWarn('failed to close mobile window', error);
  }

  try {
    if (safariWindowRef && !safariWindowRef.closed) {
      safariWindowRef.close();
    }
  } catch (error) {
    logPdfWarn('failed to close safari window', error);
  }

  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
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
  if (window.html2pdf && !window.html2pdf.__artRatioConfigured) {
    const defaults = window.html2pdf.defaultOptions || window.html2pdf.defaultOpt || {};
    const html2canvasDefaults = { ...(defaults.html2canvas || {}) };
    html2canvasDefaults.useCORS = true;
    html2canvasDefaults.allowTaint = false;
    html2canvasDefaults.logging = true;

    const jsPdfDefaults = { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true, ...(defaults.jsPDF || {}) };

    const mergedDefaults = {
      image: { type: 'jpeg', quality: 0.95, ...(defaults.image || {}) },
      margin: defaults.margin ?? [0, 0, 0, 0],
      filename: defaults.filename || 'document.pdf',
      html2canvas: html2canvasDefaults,
      jsPDF: jsPdfDefaults
    };

    window.html2pdf.defaultOptions = mergedDefaults;
    window.html2pdf.defaultOpt = mergedDefaults;
    window.html2pdf.__artRatioConfigured = true;
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

function resolveTechnicianTotalRate(technician = {}) {
  const candidates = [
    technician.dailyTotal,
    technician.daily_total,
    technician.totalRate,
    technician.total,
    technician.total_wage
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const parsed = parseFloat(normalizeNumbers(String(value)));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return resolveTechnicianDailyRate(technician);
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
  const crewCostDailyTotal = technicians.reduce((sum, tech) => sum + resolveTechnicianDailyRate(tech), 0);
  const crewTotalDaily = technicians.reduce((sum, tech) => sum + resolveTechnicianTotalRate(tech), 0);
  const crewCostTotal = crewCostDailyTotal * rentalDays;
  const crewTotal = crewTotalDaily * rentalDays;
  const discountBase = equipmentTotal + crewTotal;
  const discountValue = parseFloat(reservation.discount) || 0;
  const discountAmount = reservation.discountType === 'amount'
    ? discountValue
    : discountBase * (discountValue / 100);
  const subtotalAfterDiscount = Math.max(0, discountBase - discountAmount);
  const applyTaxFlag = projectLinked ? false : reservation.applyTax;
  const storedCost = Number(reservation.cost);
  const hasStoredCost = Number.isFinite(storedCost);

  const rawCompanySharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share
    ?? null;
  const parsedCompanySharePercent = rawCompanySharePercent != null
    ? parseFloat(normalizeNumbers(String(rawCompanySharePercent).replace('%', '').trim()))
    : NaN;
  const shareEnabledRaw = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied
    ?? reservation.company_share_applied
    ?? null;
  const companyShareEnabled = shareEnabledRaw != null
    ? (shareEnabledRaw === true || shareEnabledRaw === 1 || shareEnabledRaw === '1' || String(shareEnabledRaw).toLowerCase() === 'true')
    : (Number.isFinite(parsedCompanySharePercent) && parsedCompanySharePercent > 0);
  let companySharePercent = companyShareEnabled && Number.isFinite(parsedCompanySharePercent)
    ? Number(parsedCompanySharePercent)
    : 0;
  if (applyTaxFlag && companySharePercent <= 0) {
    companySharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
  }
  let companyShareAmount = companySharePercent > 0
    ? Math.max(0, subtotalAfterDiscount * (companySharePercent / 100))
    : 0;
  companyShareAmount = Number(companyShareAmount.toFixed(2));

  const taxableAmount = subtotalAfterDiscount + companyShareAmount;
  let taxAmount = applyTaxFlag ? taxableAmount * 0.15 : 0;
  if (!Number.isFinite(taxAmount) || taxAmount < 0) {
    taxAmount = 0;
  }
  taxAmount = Number(taxAmount.toFixed(2));

  const computedTotal = taxableAmount + taxAmount;
  const finalTotalComputed = Number.isFinite(computedTotal)
    ? Number(computedTotal.toFixed(2))
    : 0;
  const finalTotal = projectLinked
    ? finalTotalComputed
    : (hasStoredCost ? storedCost : finalTotalComputed);
  const netProfit = Math.max(0, crewTotal - crewCostTotal);

  const totals = {
    equipmentTotal,
    crewTotal,
    crewCostTotal,
    discountAmount,
    subtotalAfterDiscount,
    taxableAmount,
    taxAmount,
    finalTotal,
    companySharePercent,
    companyShareAmount,
    netProfit
  };

  const totalsDisplay = {
    equipmentTotal: normalizeNumbers(equipmentTotal.toFixed(2)),
    crewTotal: normalizeNumbers(crewTotal.toFixed(2)),
    discountAmount: normalizeNumbers(discountAmount.toFixed(2)),
    subtotalAfterDiscount: normalizeNumbers(subtotalAfterDiscount.toFixed(2)),
    taxableAmount: normalizeNumbers(taxableAmount.toFixed(2)),
    taxAmount: normalizeNumbers(taxAmount.toFixed(2)),
    finalTotal: normalizeNumbers(finalTotal.toFixed(2)),
    companySharePercent: normalizeNumbers(companySharePercent.toFixed(2)),
    companyShareAmount: normalizeNumbers(companyShareAmount.toFixed(2)),
    netProfit: normalizeNumbers(netProfit.toFixed(2))
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
  totals,
  totalsDisplay,
  rentalDays,
  currencyLabel,
  sections,
  fieldSelections = {},
  quoteNumber,
  quoteDate
}) {
  const {
    companySharePercent = 0,
    companyShareAmount = 0,
    netProfit = 0
  } = totals || {};

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
  if (companySharePercent > 0 && isFieldEnabled('financialSummary', 'companyShare')) {
    const sharePercentDisplay = totalsDisplay.companySharePercent ?? normalizeNumbers(companySharePercent.toFixed(2));
    const shareAmountDisplay = totalsDisplay.companyShareAmount ?? normalizeNumbers(companyShareAmount.toFixed(2));
    const shareValue = `${sharePercentDisplay}% (${shareAmountDisplay} ${currencyLabel})`;
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.companyShare', '🏦 نسبة الشركة'), shareValue));
  }

  const showFinalTotal = isFieldEnabled('financialSummary', 'finalTotal');
  const showNetProfit = isFieldEnabled('financialSummary', 'netProfit')
    && Number.isFinite(netProfit)
    && Math.abs((netProfit ?? 0) - (totals?.finalTotal ?? 0)) > 0.009;
  const financialFinalItems = [];
  if (showFinalTotal) {
    financialFinalItems.push(renderTotalsItem(t('reservations.details.labels.total', 'الإجمالي النهائي'), `${totalsDisplay.finalTotal} ${currencyLabel}`, { variant: 'final' }));
  }
  if (showNetProfit) {
    financialFinalItems.push(renderTotalsItem(t('reservations.details.labels.netProfit', '💵 صافي الربح'), `${totalsDisplay.netProfit} ${currencyLabel}`, { variant: 'final' }));
  }
  const financialFinalHtml = financialFinalItems.length
    ? `<div class="totals-final">${financialFinalItems.join('')}</div>`
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
  const fontPromise = doc.fonts?.ready ? doc.fonts.ready : Promise.resolve();
  const imagePromises = images.map((img) => waitForImage(img));
  const assetPromises = [fontPromise, ...imagePromises].map((promise) => (
    promise.catch((error) => {
      logPdfWarn('asset load failed', error);
      return null;
    })
  ));

  await Promise.all(assetPromises);
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

  await rasterizeQuoteImages(sourceContainer);
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

function enforceQuoteTextColor(root, color = '#000000') {
  if (!root) return;
  const nodes = root.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div');
  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.style.setProperty('color', color, 'important');
  });
}

async function renderQuotePagesAsPdf(root, { filename, safariWindowRef = null, mobileWindowRef = null }) {
  if (!root) return;
  const pages = Array.from(root.querySelectorAll('.quote-page'));
  if (!pages.length) {
    throw new Error('لا توجد صفحات لتصديرها.');
  }

  const [JsPdfConstructor, html2canvasFn] = await Promise.all([
    ensureJsPdf(),
    ensureHtml2Canvas()
  ]);

  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const mobileViewport = isMobileViewport();
  const safariMode = isIosSafari();
  const mobileSafari = isMobileSafariBrowser();

  let captureScale;
  if (mobileSafari) {
    captureScale = 1.5;
  } else if (safariMode) {
    captureScale = Math.min(1.7, Math.max(1.2, devicePixelRatio * 1.1));
  } else if (mobileViewport) {
    captureScale = Math.min(1.8, Math.max(1.25, devicePixelRatio * 1.2));
  } else {
    captureScale = Math.min(2.0, Math.max(1.6, devicePixelRatio * 1.4));
  }

  const jpegQuality = mobileSafari ? 0.9 : safariMode ? 0.9 : mobileViewport ? 0.92 : 0.95;
  const pdf = new JsPdfConstructor({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
  const html2canvasBaseOptions = {
    scale: captureScale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    letterRendering: true,
    removeContainer: false,
    logging: true
  };

  let pdfPageIndex = 0;
  const browserLimitMessage = t('reservations.quote.errors.browserLimit', 'تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.');

  try {
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      const page = pages[pageIndex];
      await rasterizeQuoteImages(page);
      await waitForQuoteAssets(page);

      const doc = page.ownerDocument || document;
      const captureWrapper = doc.createElement('div');
      Object.assign(captureWrapper.style, {
        position: 'fixed',
        top: '0',
        left: '-12000px',
        pointerEvents: 'none',
        zIndex: '-1',
        backgroundColor: '#ffffff'
      });

      const pageClone = page.cloneNode(true);
      pageClone.style.width = `${A4_WIDTH_PX}px`;
      pageClone.style.maxWidth = `${A4_WIDTH_PX}px`;
      pageClone.style.minWidth = `${A4_WIDTH_PX}px`;
      pageClone.style.height = `${A4_HEIGHT_PX}px`;
      pageClone.style.maxHeight = `${A4_HEIGHT_PX}px`;
      pageClone.style.minHeight = `${A4_HEIGHT_PX}px`;
      pageClone.style.position = 'relative';
      pageClone.style.background = '#ffffff';
      enforceQuoteTextColor(pageClone);
      captureWrapper.appendChild(pageClone);
      doc.body.appendChild(captureWrapper);

      let canvas;
      try {
        await waitForQuoteAssets(pageClone);
        canvas = await html2canvasFn(pageClone, {
          ...html2canvasBaseOptions,
          scale: captureScale,
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0
        });
      } catch (captureError) {
        handlePdfError(captureError, 'pageCapture', { toastMessage: browserLimitMessage });
        throw captureError;
      } finally {
        captureWrapper.parentNode?.removeChild(captureWrapper);
      }

      if (!canvas) {
        continue;
      }

      const canvasWidth = canvas.width || 1;
      const canvasHeight = canvas.height || 1;
      const aspectRatio = canvasHeight / canvasWidth;
      let targetWidthMm = A4_WIDTH_MM;
      let targetHeightMm = targetWidthMm * aspectRatio;
      let horizontalOffsetMm = 0;

      if (targetHeightMm > A4_HEIGHT_MM) {
        const scaleFactor = A4_HEIGHT_MM / targetHeightMm;
        targetHeightMm = A4_HEIGHT_MM;
        targetWidthMm = targetWidthMm * scaleFactor;
        horizontalOffsetMm = Math.max(0, (A4_WIDTH_MM - targetWidthMm) / 2);
      }

      const imageData = canvas.toDataURL('image/jpeg', jpegQuality);

      if (pdfPageIndex > 0) {
        pdf.addPage();
      }

      pdf.addImage(imageData, 'JPEG', horizontalOffsetMm, 0, targetWidthMm, targetHeightMm, `page-${pdfPageIndex + 1}`, 'FAST');
      pdfPageIndex += 1;

      // Yield to keep UI responsive, important for mobile devices
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
    }
  } catch (error) {
    cleanupPdfArtifacts({ safariWindowRef, mobileWindowRef });
    throw error;
  }

  if (pdfPageIndex === 0) {
    cleanupPdfArtifacts({ safariWindowRef, mobileWindowRef });
    throw new Error('PDF generation produced no pages.');
  }

  const needsBlobDelivery = safariMode || (mobileWindowRef && !mobileWindowRef.closed);

  if (needsBlobDelivery) {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    if (safariMode) {
      if (safariWindowRef && !safariWindowRef.closed) {
        safariWindowRef.location.href = blobUrl;
        safariWindowRef.focus?.();
      } else {
        window.open(blobUrl, '_blank');
      }
    } else if (mobileWindowRef && !mobileWindowRef.closed) {
      mobileWindowRef.location.href = blobUrl;
      mobileWindowRef.focus?.();
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
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
    totals: activeQuoteState.totals,
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
        enforceQuoteTextColor(pdfRoot);
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

    if (quoteModalRefs?.previewFrameWrapper && !quoteModalRefs?.userAdjustedZoom) {
      const availableWidth = quoteModalRefs.previewFrameWrapper.clientWidth - 24;
      if (availableWidth > 0 && availableWidth < baseWidth) {
        previewZoom = Math.max(availableWidth / baseWidth, 0.3);
      } else {
        previewZoom = 1;
      }
    }

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

function handleSectionExpansionToggle(event) {
  if (!activeQuoteState) return;
  const details = event.currentTarget;
  const sectionId = details?.dataset?.sectionId;
  if (!sectionId) return;
  ensureSectionExpansionState(activeQuoteState, sectionId);
  activeQuoteState.sectionExpansions[sectionId] = details.open;
}

function renderQuoteToggles() {
  if (!quoteModalRefs?.toggles || !activeQuoteState) return;
  const { toggles } = quoteModalRefs;
  const selections = activeQuoteState.fields || {};
  const expansions = ensureSectionExpansionState(activeQuoteState);
  const items = QUOTE_SECTION_DEFS.map(({ id, labelKey, fallback }) => {
    const sectionLabel = t(labelKey, fallback);
    const sectionChecked = activeQuoteState.sections.has(id);
    const fields = QUOTE_FIELD_DEFS[id] || [];
    const sectionExpanded = isSectionExpanded(activeQuoteState, id);
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
      <details class="quote-toggle-group" data-section-group data-section-id="${id}" ${sectionExpanded ? 'open' : ''}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${id}" ${sectionChecked ? 'checked' : ''}>
            <span>${escapeHtml(sectionLabel)}</span>
          </label>
          ${fields.length ? '<span class="quote-toggle-caret" aria-hidden="true"></span>' : ''}
        </summary>
        ${fieldList}
      </details>
    `;
  }).join('');

  toggles.innerHTML = items;
  toggles.querySelectorAll('input[data-section-toggle]').forEach((input) => {
    input.addEventListener('change', handleToggleChange);
  });
  toggles.querySelectorAll('input[data-field-toggle]').forEach((input) => {
    input.addEventListener('change', handleFieldToggleChange);
  });
  toggles.querySelectorAll('details[data-section-group]').forEach((details) => {
    details.addEventListener('toggle', handleSectionExpansionToggle);
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
  modal.style.display = 'none';
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
  const dismissButtons = Array.from(modal.querySelectorAll('[data-bs-dismiss="modal"]'));

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
  const previewScroll = document.createElement('div');
  previewScroll.className = 'quote-preview-scroll';
  previewScroll.appendChild(frameWrapper);
  preview.appendChild(previewScroll);
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

  const handleFallbackDismiss = () => {
    if (!hasBootstrapModalSupport()) {
      hideModalFallback(modal);
    }
  };

  dismissButtons.forEach((button) => {
    button?.addEventListener('click', handleFallbackDismiss);
  });
  if (headerCloseButton && !dismissButtons.includes(headerCloseButton)) {
    headerCloseButton.addEventListener('click', handleFallbackDismiss);
  }

  modal.addEventListener('click', (event) => {
    if (hasBootstrapModalSupport()) return;
    if (event.target === modal) {
      hideModalFallback(modal);
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
    downloadBtn,
    userAdjustedZoom: false
  };

  const zoomOutBtn = zoomControls.querySelector('[data-zoom-out]');
  const zoomInBtn = zoomControls.querySelector('[data-zoom-in]');
  const zoomResetBtn = zoomControls.querySelector('[data-zoom-reset]');

  zoomOutBtn?.addEventListener('click', () => adjustPreviewZoom(-0.1));
  zoomInBtn?.addEventListener('click', () => adjustPreviewZoom(0.1));
  zoomResetBtn?.addEventListener('click', () => setPreviewZoom(1, { markManual: true }));

  setPreviewZoom(previewZoom);

  return quoteModalRefs;
}

function setPreviewZoom(value, { silent = false, markManual = false } = {}) {
  previewZoom = Math.min(Math.max(value, 0.25), 2.2);
  if (markManual && quoteModalRefs) {
    quoteModalRefs.userAdjustedZoom = true;
  }
  applyPreviewZoom(previewZoom);
  if (!silent && quoteModalRefs?.zoomValue) {
    quoteModalRefs.zoomValue.textContent = `${Math.round(previewZoom * 100)}%`;
  }
}

function adjustPreviewZoom(delta) {
  setPreviewZoom(previewZoom + delta, { markManual: true });
}

function applyPreviewZoom(value) {
  if (!quoteModalRefs?.previewFrame || !quoteModalRefs.previewFrameWrapper) return;
  const frame = quoteModalRefs.previewFrame;
  const wrapper = quoteModalRefs.previewFrameWrapper;
  const baseWidth = Number(frame.dataset.baseWidth) || 794;
  const baseHeight = Number(frame.dataset.baseHeight) || frame.contentDocument?.body?.scrollHeight || 1123;
  frame.style.transform = `scale(${value})`;
  frame.style.transformOrigin = 'top center';
  if (isMobileViewport()) {
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '100%';
    wrapper.style.minWidth = '0';
  } else {
    wrapper.style.width = `${baseWidth}px`;
    wrapper.style.maxWidth = `${baseWidth}px`;
    wrapper.style.minWidth = `${baseWidth}px`;
  }
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
  const mobileViewport = isMobileViewport();
  const safariPopupRequired = !mobileViewport && isIosSafari();
  const mobileDownloadWindow = mobileViewport ? window.open('', '_blank') : null;
  const safariDownloadWindow = safariPopupRequired
    ? window.open('data:text/html;charset=utf-8,' + encodeURIComponent(''), '_blank')
    : null;

  let container = null;
  const browserLimitMessage = t('reservations.quote.errors.browserLimit', 'تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.');

  try {
    await ensureHtml2Pdf();
    logPdfDebug('html2pdf ensured');

    const html = buildQuotationHtml({
      reservation: activeQuoteState.reservation,
      customer: activeQuoteState.customer,
      project: activeQuoteState.project,
    technicians: activeQuoteState.technicians,
    totals: activeQuoteState.totals,
    totalsDisplay: activeQuoteState.totalsDisplay,
      rentalDays: activeQuoteState.rentalDays,
      currencyLabel: activeQuoteState.currencyLabel,
      sections: activeQuoteState.sections,
      fieldSelections: activeQuoteState.fields,
      quoteNumber: activeQuoteState.quoteNumber,
      quoteDate: activeQuoteState.quoteDateLabel
    });

    container = document.createElement('div');
    container.innerHTML = html;
    Object.assign(container.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      zIndex: '-1'
    });
    document.body.appendChild(container);

    scrubUnsupportedColorFunctions(container);
    sanitizeComputedColorFunctions(container);
    enforceLegacyColorFallback(container);
    logPdfDebug('export container prepared');

    const pdfRoot = container.firstElementChild;

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
      await waitForQuoteAssets(pdfRoot);
      enforceQuoteTextColor(pdfRoot);
      logPdfDebug('layout complete for export document');
    } catch (layoutError) {
      handlePdfError(layoutError, 'layoutQuoteDocument', { suppressToast: true });
    }
    }

    const filename = `quotation-${activeQuoteState.quoteNumber}.pdf`;
    await renderQuotePagesAsPdf(pdfRoot, {
      filename,
      safariWindowRef: safariDownloadWindow,
      mobileWindowRef: mobileDownloadWindow
    });

    if (!activeQuoteState.sequenceCommitted) {
      commitQuoteSequence(activeQuoteState.quoteSequence);
      activeQuoteState.sequenceCommitted = true;
    }
  } catch (error) {
    cleanupPdfArtifacts({
      container,
      safariWindowRef: safariDownloadWindow,
      mobileWindowRef: mobileDownloadWindow
    });
    container = null;
    handlePdfError(error, 'exportQuoteAsPdf', { toastMessage: browserLimitMessage });
  } finally {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}

function openQuoteModal() {
  const refs = ensureQuoteModal();
  if (!refs?.modal) return;

  previewZoom = 1;
  if (quoteModalRefs) {
    quoteModalRefs.userAdjustedZoom = false;
  }
  setPreviewZoom(previewZoom, { silent: true });

  renderQuoteToggles();
  updateQuoteMeta();
  renderQuotePreview();

  showQuoteModalElement(refs.modal);
}

export async function exportReservationPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  const technicians = collectAssignedTechnicians(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, technicians, project);
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
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
    sectionExpansions: buildDefaultSectionExpansions(),
    fields: buildDefaultFieldSelections(),
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };

  openQuoteModal();
}
