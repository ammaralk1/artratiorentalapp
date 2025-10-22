import { loadData } from '../storage.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { normalizeNumbers, formatDateTime, showToast, showToastWithAction } from '../utils.js';
import {
  calculateReservationDays,
  calculateReservationTotal,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus
} from '../reservationsSummary.js';
import { resolveReservationProjectState, buildReservationDisplayGroups, sanitizePriceValue } from '../reservationsShared.js';
import { PROJECT_TAX_RATE } from '../projects/constants.js';
import quotePdfStyles from '../../styles/quotePdf.css?raw';
import {
  normalizeColorValue,
  patchHtml2CanvasColorParsing,
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  scrubUnsupportedColorFunctions
} from '../canvasColorUtils.js';

const QUOTE_SEQUENCE_STORAGE_KEY = 'reservations.quote.sequence';
const QUOTE_TOGGLE_PREFS_STORAGE_KEYS = {
  reservation: 'reservations.quote.togglePrefs.v1',
  project: 'projects.quote.togglePrefs.v1'
};
const QUOTE_TROUBLESHOOT_URL = 'https://help.artratio.sa/guide/quote-preview';

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

const DEFAULT_TERMS = [...QUOTE_TERMS];
const PROJECT_QUOTE_TERMS = [
  'يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.',
  'يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.',
  'يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.',
  'العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.',
  'تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.',
  'يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم.'
];

function normalizeTermsInput(value) {
  if (!value) return [...DEFAULT_TERMS];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function resolveTermsFromForms() {
  const creationInput = document.getElementById('reservation-terms');
  if (creationInput && creationInput.value.trim().length > 0) {
    const normalized = normalizeTermsInput(creationInput.value);
    if (normalized.length) return normalized;
  }

  const editInput = document.getElementById('edit-res-terms');
  if (editInput && editInput.value.trim().length > 0) {
    const normalized = normalizeTermsInput(editInput.value);
    if (normalized.length) return normalized;
  }

  const defaultText = DEFAULT_TERMS.join('\n');
  if (creationInput && creationInput.value.trim().length === 0) {
    creationInput.value = defaultText;
  }
  if (editInput && editInput.value.trim().length === 0) {
    editInput.value = defaultText;
  }

  return [...DEFAULT_TERMS];
}

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

const PROJECT_CREW_COLUMN_DEFS = [
  {
    id: 'rowNumber',
    labelKey: null,
    fallback: '#',
    render: (_tech, index) => escapeHtml(normalizeNumbers(String(index + 1)))
  },
  {
    id: 'name',
    labelKey: null,
    fallback: 'الاسم',
    render: (tech) => escapeHtml(tech?.name || tech?.full_name || tech?.fullName || '-')
  },
  {
    id: 'role',
    labelKey: null,
    fallback: 'الدور',
    render: (tech) => escapeHtml(tech?.role || tech?.title || t('reservations.details.technicians.roleUnknown', 'غير محدد'))
  },
  {
    id: 'phone',
    labelKey: null,
    fallback: 'الهاتف',
    render: (tech) => escapeHtml(tech?.phone || tech?.mobile || t('reservations.details.technicians.phoneUnknown', 'غير متوفر'))
  }
];

const PROJECT_EXPENSES_COLUMN_DEFS = [
  {
    id: 'rowNumber',
    labelKey: null,
    fallback: '#',
    render: (_expense, index) => escapeHtml(normalizeNumbers(String(index + 1)))
  },
  {
    id: 'label',
    labelKey: null,
    fallback: 'البند',
    render: (expense) => escapeHtml(expense?.label || '-')
  },
  {
    id: 'amount',
    labelKey: null,
    fallback: 'المبلغ',
    render: (expense) => escapeHtml(expense?.displayAmount || '—')
  },
  {
    id: 'note',
    labelKey: null,
    fallback: 'ملاحظات',
    render: (expense) => escapeHtml(expense?.note || '-')
  }
];

const PROJECT_EQUIPMENT_COLUMN_DEFS = [
  {
    id: 'rowNumber',
    labelKey: null,
    fallback: '#',
    render: (_item, index) => escapeHtml(normalizeNumbers(String(index + 1)))
  },
  {
    id: 'description',
    labelKey: null,
    fallback: 'الوصف',
    render: (item) => escapeHtml(item?.description || '-')
  },
  {
    id: 'totalQuantity',
    labelKey: null,
    fallback: 'إجمالي الكمية',
    render: (item) => escapeHtml(normalizeNumbers(String(item?.totalQuantity || 0)))
  },
  {
    id: 'reservationsCount',
    labelKey: null,
    fallback: 'عدد الحجوزات',
    render: (item) => escapeHtml(normalizeNumbers(String(item?.reservationsCount || 0)))
  },
  {
    id: 'totalCost',
    labelKey: null,
    fallback: 'التكلفة التقديرية',
    render: (item) => escapeHtml(item?.displayCost || '—')
  }
];

const PROJECT_QUOTE_SECTION_DEFS = [
  { id: 'customerInfo', labelKey: 'projects.quote.sections.customer', fallback: 'بيانات العميل', defaultSelected: true },
  { id: 'projectInfo', labelKey: 'projects.quote.sections.project', fallback: 'بيانات المشروع', defaultSelected: true },
  { id: 'projectExpenses', labelKey: 'projects.quote.sections.expenses', fallback: 'متطلبات المشروع', defaultSelected: true },
  { id: 'projectCrew', labelKey: 'projects.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true },
  { id: 'financialSummary', labelKey: 'projects.quote.sections.financial', fallback: 'الملخص المالي', defaultSelected: true },
  { id: 'projectEquipment', labelKey: 'projects.quote.sections.equipment', fallback: 'المعدات', defaultSelected: true },
  { id: 'projectNotes', labelKey: 'projects.quote.sections.notes', fallback: 'ملاحظات المشروع', defaultSelected: true }
];

const PROJECT_QUOTE_FIELD_DEFS = {
  customerInfo: QUOTE_FIELD_DEFS.customerInfo,
  projectInfo: [
    { id: 'projectTitle', labelKey: 'projects.details.overview.heading', fallback: 'معلومات المشروع' },
    { id: 'projectCode', labelKey: 'projects.details.labels.code', fallback: 'رقم المشروع' },
    { id: 'projectType', labelKey: 'projects.details.type', fallback: 'نوع المشروع' },
    { id: 'projectStart', labelKey: 'projects.details.start', fallback: 'بداية المشروع' },
    { id: 'projectEnd', labelKey: 'projects.details.end', fallback: 'نهاية المشروع' },
    { id: 'projectDuration', labelKey: 'projects.details.duration', fallback: 'مدة المشروع' },
    { id: 'projectStatus', labelKey: 'projects.details.status', fallback: 'حالة المشروع' }
  ],
  financialSummary: [
    { id: 'projectSubtotal', labelKey: 'projects.details.summary.projectSubtotal', fallback: 'إجمالي المشروع' },
    { id: 'expensesTotal', labelKey: 'projects.details.expensesTotal', fallback: 'إجمالي المصاريف' },
    { id: 'reservationsTotal', labelKey: 'projects.details.reservationsTotal', fallback: 'إجمالي الحجوزات' },
    { id: 'discountAmount', labelKey: 'projects.details.summary.discount', fallback: 'الخصم' },
    { id: 'taxAmount', labelKey: 'projects.details.summary.combinedTax', fallback: 'الضريبة' },
    { id: 'overallTotal', labelKey: 'projects.details.summary.overallTotal', fallback: 'الإجمالي الكلي' },
    { id: 'paidAmount', labelKey: 'projects.details.summary.paidAmount', fallback: 'المدفوع' },
    { id: 'remainingAmount', labelKey: 'projects.details.summary.remainingAmount', fallback: 'المتبقي للدفع' }
  ],
  payment: QUOTE_FIELD_DEFS.payment,
  projectExpenses: PROJECT_EXPENSES_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
  projectCrew: PROJECT_CREW_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
  projectEquipment: PROJECT_EQUIPMENT_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
  projectNotes: []
};

const QUOTE_CONFIG_CACHE = new Map();

function getQuoteConfig(context = 'reservation') {
  if (QUOTE_CONFIG_CACHE.has(context)) {
    return QUOTE_CONFIG_CACHE.get(context);
  }
  const sectionDefs = context === 'project' ? PROJECT_QUOTE_SECTION_DEFS : QUOTE_SECTION_DEFS;
  const fieldDefs = context === 'project' ? PROJECT_QUOTE_FIELD_DEFS : QUOTE_FIELD_DEFS;
  const sectionIdSet = new Set(sectionDefs.map(({ id }) => id));
  const fieldIdMap = Object.fromEntries(
    Object.entries(fieldDefs).map(([sectionId, fields = []]) => [
      sectionId,
      new Set(fields.map((field) => field.id))
    ])
  );
  const config = { sectionDefs, fieldDefs, sectionIdSet, fieldIdMap };
  QUOTE_CONFIG_CACHE.set(context, config);
  return config;
}

function getQuoteSectionDefs(context = 'reservation') {
  return getQuoteConfig(context).sectionDefs;
}

function getQuoteFieldDefs(context = 'reservation') {
  return getQuoteConfig(context).fieldDefs;
}

function getQuoteSectionIdSet(context = 'reservation') {
  return getQuoteConfig(context).sectionIdSet;
}

function getQuoteFieldIdMap(context = 'reservation') {
  return getQuoteConfig(context).fieldIdMap;
}

function getQuoteStatusMessage(type) {
  switch (type) {
    case 'export':
      return t('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...');
    case 'render':
    default:
      return t('reservations.quote.status.rendering', 'جاري تحديث المعاينة...');
  }
}

const HTML2PDF_SRC = 'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';
const HTML2CANVAS_SRC = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
const JSPDF_SRC = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';

const QUOTE_PDF_STYLES = quotePdfStyles.trim();

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
let quoteAssetWarningShown = false;

function showQuotePreviewStatus(type = 'render', {
  message,
  actionLabel,
  onAction,
  showSpinner = type !== 'error'
} = {}) {
  if (!quoteModalRefs?.statusIndicator || !quoteModalRefs?.statusText) return;
  quoteModalRefs.statusKind = type;

  const textValue = message || getQuoteStatusMessage(type);
  quoteModalRefs.statusText.textContent = textValue;

  if (quoteModalRefs.statusSpinner) {
    quoteModalRefs.statusSpinner.hidden = !showSpinner;
  }

  if (quoteModalRefs.statusAction) {
    quoteModalRefs.statusAction.hidden = true;
    quoteModalRefs.statusAction.onclick = null;
    if (actionLabel && typeof onAction === 'function') {
      quoteModalRefs.statusAction.textContent = actionLabel;
      quoteModalRefs.statusAction.hidden = false;
      quoteModalRefs.statusAction.onclick = (event) => {
        event.preventDefault();
        onAction();
      };
    }
  }

  quoteModalRefs.statusIndicator.hidden = false;
  requestAnimationFrame(() => {
    quoteModalRefs.statusIndicator.classList.add('is-visible');
  });
}

function hideQuotePreviewStatus(type) {
  if (!quoteModalRefs?.statusIndicator || !quoteModalRefs?.statusText) return;
  if (type && quoteModalRefs.statusKind && quoteModalRefs.statusKind !== type) {
    return;
  }
  quoteModalRefs.statusKind = null;
  quoteModalRefs.statusIndicator.classList.remove('is-visible');
  setTimeout(() => {
    if (!quoteModalRefs?.statusIndicator) return;
    quoteModalRefs.statusIndicator.hidden = true;
    if (quoteModalRefs.statusAction) {
      quoteModalRefs.statusAction.hidden = true;
      quoteModalRefs.statusAction.onclick = null;
    }
    if (quoteModalRefs.statusSpinner) {
      quoteModalRefs.statusSpinner.hidden = false;
    }
  }, 220);
}

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

function notifyQuoteAssetFailure() {
  if (quoteAssetWarningShown) return;
  quoteAssetWarningShown = true;
  const guideLabel = t('reservations.quote.toast.viewGuide', '📘 عرض دليل الحل السريع');
  const retryLabel = t('reservations.quote.toast.retry', 'إعادة المحاولة');
  const message = t('reservations.quote.toast.assetsFailed', '⚠️ تعذر تحميل بعض الصور ضمن عرض السعر.');

  const canRetry = Boolean(quoteModalRefs?.modal?.classList.contains('show'));
  const retryHandler = () => {
    if (quoteModalRefs?.modal?.classList.contains('show')) {
      showQuotePreviewStatus('render');
      quoteAssetWarningShown = false;
      renderQuotePreview();
    }
  };

  showToastWithAction({
    message,
    duration: 9000,
    actionLabel: canRetry ? retryLabel : undefined,
    onAction: canRetry ? retryHandler : undefined,
    linkLabel: guideLabel,
    linkHref: QUOTE_TROUBLESHOOT_URL
  });

  if (canRetry) {
    showQuotePreviewStatus('error', {
      message,
      actionLabel: retryLabel,
      onAction: retryHandler,
      showSpinner: false
    });
  }
}

function buildDefaultFieldSelections(context = 'reservation') {
  const selections = {};
  const fieldDefs = getQuoteFieldDefs(context);
  Object.entries(fieldDefs).forEach(([sectionId, fields = []]) => {
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

function buildDefaultSectionExpansions(context = 'reservation') {
  return Object.fromEntries(getQuoteSectionDefs(context).map(({ id }) => [id, false]));
}

function ensureSectionExpansionState(state, sectionId) {
  if (!state.sectionExpansions) {
    state.sectionExpansions = buildDefaultSectionExpansions(state.context || 'reservation');
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
  const platform = navigator.platform || '';
  const maxTouchPoints = Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : 0;
  const isIosPlatform = IOS_SAFARI_REGEX.test(ua) || IOS_SAFARI_REGEX.test(platform);
  const isTouchMac = /Macintosh/i.test(ua) && maxTouchPoints > 1;
  const isSafariUa = SAFARI_USER_AGENT_REGEX.test(ua) && !IOS_SAFARI_EXCLUDED_BROWSERS_REGEX.test(ua);
  return isSafariUa && (isIosPlatform || isTouchMac);
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

const ARABIC_RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

function isProbablyArabic(value = '') {
  return ARABIC_RTL_REGEX.test(value);
}

function patchCanvasTextDirection() {
  const C2DProto = window.CanvasRenderingContext2D?.prototype;
  if (!C2DProto || C2DProto.__artRatioDirectionPatched) return;

  const patchMethod = (methodName) => {
    const original = C2DProto[methodName];
    if (typeof original !== 'function') return;

    C2DProto[methodName] = function patchedCanvasTextMethod(text, ...args) {
      if (typeof text !== 'string' || !isProbablyArabic(text)) {
        return original.call(this, text, ...args);
      }

      let originalDirection;
      let directionSupported = false;

      try {
        if ('direction' in this) {
          originalDirection = this.direction;
          if (originalDirection !== 'rtl') {
            this.direction = 'rtl';
          }
          directionSupported = true;
        }
      } catch (error) {
        // Ignore failures when the property is read-only or unsupported.
      }

      try {
        if (!directionSupported) {
          const canvasElement = this.canvas;
          if (canvasElement && canvasElement.style?.direction !== 'rtl') {
            canvasElement.__artRatioOriginalDirection = canvasElement.style.direction;
            canvasElement.style.direction = 'rtl';
          }
        }
        return original.call(this, text, ...args);
      } finally {
        if (directionSupported && originalDirection !== undefined && originalDirection !== 'rtl') {
          try {
            this.direction = originalDirection;
          } catch (restoreError) {
            // Ignore restore failures
          }
        } else if (!directionSupported) {
          const canvasElement = this.canvas;
          if (canvasElement && canvasElement.__artRatioOriginalDirection !== undefined) {
            canvasElement.style.direction = canvasElement.__artRatioOriginalDirection;
            delete canvasElement.__artRatioOriginalDirection;
          }
        }
      }
    };
  };

  patchMethod('fillText');
  patchMethod('strokeText');

  C2DProto.__artRatioDirectionPatched = true;
}

function scrubCloneColors(doc) {
  if (!doc) return;
  scrubUnsupportedColorFunctions(doc);
  scrubUnsupportedColorFunctions(doc?.documentElement);
  scrubUnsupportedColorFunctions(doc?.body);
  const view = doc?.defaultView || window;
  sanitizeComputedColorFunctions(doc?.documentElement || doc, view);
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

function createNoteCanvasRenderer(note, { pixelRatio = 1 } = {}) {
  if (!note) return null;
  const doc = note.ownerDocument || document;
  const view = doc.defaultView || window;
  const styles = view.getComputedStyle?.(note);
  if (!styles) return null;

  const parsePx = (value, fallback = 0) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const paddingTop = parsePx(styles.paddingTop);
  const paddingBottom = parsePx(styles.paddingBottom);
  const paddingRight = parsePx(styles.paddingRight);
  const paddingLeft = parsePx(styles.paddingLeft);
  const borderRadius = parsePx(styles.borderRadius);
  const fontSize = parsePx(styles.fontSize, 14);
  const lineHeight = (() => {
    const lh = styles.lineHeight;
    if (!lh || lh === 'normal') return fontSize * 1.6;
    const parsed = parsePx(lh, fontSize * 1.6);
    return parsed > 0 ? parsed : fontSize * 1.6;
  })();

  const maxWidth = Math.max(note.clientWidth || 0, note.scrollWidth || 0, parsePx(styles.width, 0));
  if (maxWidth <= 0) return null;

  const contentWidth = Math.max(1, maxWidth - paddingLeft - paddingRight);
  const textContent = note.textContent || '';
  const paragraphs = textContent.split(/\r?\n/);

  const canvas = doc.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const fontStyle = styles.fontStyle || 'normal';
  const fontVariant = styles.fontVariant || 'normal';
  const fontWeight = styles.fontWeight || '400';
  const fontFamily = styles.fontFamily || 'sans-serif';
  const fontStretch = styles.fontStretch || 'normal';

  const buildLine = (segments) => segments.join(' ');

  const lines = [];
  const measureTextWidth = (text) => ctx.measureText(text).width;

  ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize}px ${fontFamily}`;

  paragraphs.forEach((paragraph) => {
    const trimmed = paragraph.trim();
    if (trimmed.length === 0) {
      lines.push('');
      return;
    }

    const words = trimmed.split(/\s+/);
    let currentSegments = [];

    words.forEach((word, index) => {
      const sanitizedWord = word.trim();
      if (!sanitizedWord) return;
      const tentative = buildLine(currentSegments.concat(sanitizedWord));
      const width = measureTextWidth(tentative);
      if (width <= contentWidth || currentSegments.length === 0) {
        currentSegments.push(sanitizedWord);
        return;
      }

      lines.push(buildLine(currentSegments));
      currentSegments = [sanitizedWord];
    });

    if (currentSegments.length) {
      lines.push(buildLine(currentSegments));
    }
  });

  if (!lines.length) {
    lines.push('');
  }

  const totalHeight = paddingTop + paddingBottom + (lines.length * lineHeight);
  const scaledWidth = Math.ceil(Math.max(1, maxWidth) * pixelRatio);
  const scaledHeight = Math.ceil(Math.max(1, totalHeight) * pixelRatio);
  canvas.width = scaledWidth;
  canvas.height = scaledHeight;
  canvas.style.width = `${Math.max(1, maxWidth)}px`;
  canvas.style.height = `${Math.max(1, totalHeight)}px`;

  ctx.scale(pixelRatio, pixelRatio);

  const backgroundColor = styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)'
    ? styles.backgroundColor
    : '#ffffff';

  if (borderRadius > 0) {
    ctx.save();
    ctx.beginPath();
    const width = Math.max(1, maxWidth);
    const height = Math.max(1, totalHeight);
    const radius = Math.min(borderRadius, width / 2, height / 2);
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();
  }

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, Math.max(1, maxWidth), Math.max(1, totalHeight));

  ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = styles.color || '#000000';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'right';

  if ('direction' in ctx) {
    try {
      ctx.direction = 'rtl';
    } catch (error) {
      // Ignore failures, Safari < 15 may throw
    }
  }

  const paintX = Math.max(0, maxWidth - paddingRight);
  let paintY = paddingTop;

  lines.forEach((line) => {
    const renderLine = line.length ? line : ' ';
    ctx.fillText(renderLine, paintX, paintY, contentWidth);
    paintY += lineHeight;
  });

  const img = doc.createElement('img');
  let dataUrl;
  try {
    dataUrl = canvas.toDataURL('image/png');
  } catch (error) {
    logPdfWarn('note canvas toDataURL failed', error);
    return null;
  }
  img.src = dataUrl;
  img.alt = textContent;
  img.style.width = `${Math.max(1, maxWidth)}px`;
  img.style.height = `${Math.max(1, totalHeight)}px`;
  img.style.display = 'block';
  img.setAttribute('data-quote-note-image', 'true');

  return {
    image: img,
    canvas,
    totalHeight,
    width: maxWidth
  };
}

function rasterizeQuoteNotes(root, { pixelRatio = 1 } = {}) {
  if (!root) return;
  if (!isMobileSafariBrowser()) return;
  const notes = Array.from(root.querySelectorAll?.('.quote-notes') || []);
  notes.forEach((note) => {
    if (!note || note.dataset.quoteNoteRasterized === 'true') return;
    if (!isProbablyArabic(note.textContent || '')) return;
    let rendered;
    try {
      rendered = createNoteCanvasRenderer(note, { pixelRatio });
    } catch (error) {
      logPdfWarn('failed to rasterize note content', error);
      rendered = null;
    }
    if (!rendered) return;
    note.dataset.quoteNoteRasterized = 'true';
    note.innerHTML = '';
    note.appendChild(rendered.image);
  });
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
    const defaultMessage = t('reservations.quote.errors.exportFailed', '⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.');
    const message = toastMessage || defaultMessage;
    const guideLabel = t('reservations.quote.toast.viewGuide', '📘 عرض دليل الحل السريع');
    const retryLabel = t('reservations.quote.toast.retry', 'إعادة المحاولة');
    const canRetry = ['exportQuoteAsPdf', 'renderQuotePreview', 'layoutQuoteDocument', 'pageCapture'].includes(context);

    const retryHandler = () => {
      if (context === 'exportQuoteAsPdf') {
        showQuotePreviewStatus('export');
        exportQuoteAsPdf();
      } else {
        showQuotePreviewStatus('render');
        quoteAssetWarningShown = false;
        renderQuotePreview();
      }
    };

    showToastWithAction({
      message,
      duration: 9000,
      actionLabel: canRetry ? retryLabel : undefined,
      onAction: canRetry ? retryHandler : undefined,
      linkLabel: guideLabel,
      linkHref: QUOTE_TROUBLESHOOT_URL
    });

    if (quoteModalRefs?.modal?.classList.contains('show')) {
      showQuotePreviewStatus('error', {
        message,
        actionLabel: canRetry ? retryLabel : undefined,
        onAction: canRetry ? retryHandler : undefined,
        showSpinner: false
      });
    }

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
  patchCanvasTextDirection();
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveQuotePrefix(context = 'reservation') {
  return context === 'project' ? 'QP' : 'Q';
}

function formatQuoteNumber(sequence, context = 'reservation') {
  const seq = Number(sequence);
  const prefix = resolveQuotePrefix(context);
  if (!Number.isFinite(seq) || seq <= 0) return `${prefix}-0001`;
  return `${prefix}-${String(seq).padStart(4, '0')}`;
}

function readQuoteSequence() {
  const stored = window.localStorage?.getItem?.(QUOTE_SEQUENCE_STORAGE_KEY);
  const parsed = parseInt(stored ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function peekNextQuoteSequence(context = 'reservation') {
  const last = readQuoteSequence();
  const sequence = last + 1;
  return {
    sequence,
    quoteNumber: formatQuoteNumber(sequence, context)
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

function getTogglePrefsStorageKey(context = 'reservation') {
  return QUOTE_TOGGLE_PREFS_STORAGE_KEYS[context] || QUOTE_TOGGLE_PREFS_STORAGE_KEYS.reservation;
}

function readQuoteTogglePreferences(context = 'reservation') {
  try {
    const storageKey = getTogglePrefsStorageKey(context);
    const stored = window.localStorage?.getItem?.(storageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] failed to read toggle preferences', error);
    return null;
  }
}

function writeQuoteTogglePreferences(preferences, context = 'reservation') {
  try {
    const storageKey = getTogglePrefsStorageKey(context);
    if (!preferences) {
      window.localStorage?.removeItem?.(storageKey);
      return;
    }
    window.localStorage?.setItem?.(storageKey, JSON.stringify(preferences));
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] failed to persist toggle preferences', error);
  }
}

function collectSelectionIds(selection) {
  if (!selection) return { ids: null, emptyExplicitly: false };
  if (selection instanceof Set) {
    return { ids: Array.from(selection), emptyExplicitly: selection.size === 0 };
  }
  if (Array.isArray(selection)) {
    return { ids: selection.slice(), emptyExplicitly: selection.length === 0 };
  }
  if (typeof selection === 'object') {
    const entries = Object.entries(selection).filter(([, enabled]) => Boolean(enabled));
    return { ids: entries.map(([id]) => id), emptyExplicitly: entries.length === 0 };
  }
  return { ids: null, emptyExplicitly: false };
}

function serializeQuoteToggleState(state, context = 'reservation') {
  if (!state) return null;
  const sectionIdSet = getQuoteSectionIdSet(context);
  const fieldIdMap = getQuoteFieldIdMap(context);
  const sectionIds = Array.from(state.sections instanceof Set ? state.sections : new Set(state.sections || []))
    .filter((id) => sectionIdSet.has(id));

  const fieldsPayload = {};
  const selections = state.fields || {};
  Object.entries(fieldIdMap).forEach(([sectionId, validIds]) => {
    const selection = selections[sectionId];
    if (selection == null) return;
    const { ids, emptyExplicitly } = collectSelectionIds(selection);
    if (!ids && !emptyExplicitly) return;
    const normalized = Array.isArray(ids) ? ids.filter((id) => validIds.has(id)) : [];
    if (normalized.length > 0 || emptyExplicitly) {
      fieldsPayload[sectionId] = normalized;
    }
  });

  return {
    version: 1,
    sections: sectionIds,
    fields: fieldsPayload
  };
}

function persistQuoteTogglePreferences(state) {
  if (!state) return;
  const context = state.context || 'reservation';
  const snapshot = serializeQuoteToggleState(state, context);
  if (!snapshot) return;
  writeQuoteTogglePreferences(snapshot, context);
}

function applyQuoteTogglePreferences(state) {
  if (!state) return;
  const context = state.context || 'reservation';
  const preferences = readQuoteTogglePreferences(context);
  if (!preferences) return;

  const sectionIdSet = getQuoteSectionIdSet(context);
  const storedSections = Array.isArray(preferences.sections) ? preferences.sections.filter((id) => sectionIdSet.has(id)) : [];
  if (storedSections.length) {
    state.sections = new Set(storedSections);
  }

  if (preferences.fields && typeof preferences.fields === 'object') {
    const nextSelections = cloneFieldSelections(state.fields || buildDefaultFieldSelections(context));
    const fieldIdMap = getQuoteFieldIdMap(context);
    Object.entries(preferences.fields).forEach(([sectionId, storedIds]) => {
      const validIds = fieldIdMap[sectionId];
      if (!validIds) return;
      const normalized = Array.isArray(storedIds) ? storedIds.filter((id) => validIds.has(id)) : [];
      nextSelections[sectionId] = new Set(normalized);
    });
    state.fields = nextSelections;
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
  const { groups: displayGroups } = buildReservationDisplayGroups(reservation);
  const equipmentDailyTotal = displayGroups.reduce((sum, group) => {
    const representative = (Array.isArray(group?.items) && group.items.length) ? group.items[0] : {};
    const quantity = Number(group?.count ?? group?.quantity ?? representative?.qty ?? 1) || 1;

    const candidatePrices = [
      representative?.price,
      representative?.unit_price,
      representative?.unitPrice,
      group?.unitPrice
    ];

    let unitPrice = candidatePrices.reduce((value, candidate) => {
      if (Number.isFinite(value) && value > 0) return value;
      const parsed = Number(candidate);
      return Number.isFinite(parsed) ? parsed : value;
    }, NaN);

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      const totalCandidate = Number(group?.totalPrice ?? representative?.total ?? representative?.total_price);
      if (Number.isFinite(totalCandidate) && quantity > 0) {
        unitPrice = Number((totalCandidate / quantity).toFixed(2));
      }
    }

    if (!Number.isFinite(unitPrice)) {
      unitPrice = 0;
    }

    unitPrice = sanitizePriceValue(unitPrice);

    const safeUnitPrice = sanitizePriceValue(unitPrice);

    return sum + (safeUnitPrice * quantity);
  }, 0);
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
  const revenueAfterDiscount = Math.max(0, (equipmentTotal + crewTotal) - discountAmount);
  const netProfit = Math.max(0, revenueAfterDiscount - crewCostTotal);

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

function parsePaymentNumber(value) {
  if (value == null || value === '') return null;
  const normalized = Number.parseFloat(normalizeNumbers(String(value)));
  return Number.isFinite(normalized) ? normalized : null;
}

function resolveRecordedAt(value) {
  if (!value) return new Date().toISOString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}

function normalizePaymentHistoryEntryForView(entry) {
  if (!entry || typeof entry !== 'object') return null;

  const typeRaw = entry.type ?? entry.payment_type ?? entry.paymentType ?? null;
  let type = typeof typeRaw === 'string' ? typeRaw.trim().toLowerCase() : null;
  if (type !== 'percent') {
    type = 'amount';
  }

  const amount = parsePaymentNumber(entry.amount ?? (type === 'amount' ? entry.value : null));
  const percentage = parsePaymentNumber(entry.percentage ?? (type === 'percent' ? entry.value : null));
  const value = type === 'percent'
    ? (percentage != null ? percentage : null)
    : (amount != null ? amount : null);
  const note = entry.note ?? entry.memo ?? null;
  const recordedAt = resolveRecordedAt(entry.recordedAt ?? entry.recorded_at ?? entry.date ?? entry.created_at ?? null);

  if (type === 'amount' && amount == null) {
    return null;
  }

  if (type === 'percent' && percentage == null) {
    return null;
  }

  return {
    type,
    amount: amount != null ? amount : null,
    percentage: percentage != null ? percentage : null,
    value,
    note,
    recordedAt
  };
}

function normalizeProjectPaymentHistoryForView(project = {}) {
  const rawHistory = Array.isArray(project.paymentHistory)
    ? project.paymentHistory
    : Array.isArray(project.payment_history)
      ? project.payment_history
      : [];

  const normalized = rawHistory
    .map(normalizePaymentHistoryEntryForView)
    .filter(Boolean);

  if (normalized.length > 0) {
    return normalized;
  }

  const basePercent = parsePaymentNumber(project.paidPercent ?? project.paid_percent);
  const baseAmount = parsePaymentNumber(project.paidAmount ?? project.paid_amount);
  const recordedAtRaw = project.updatedAt
    ?? project.updated_at
    ?? project.createdAt
    ?? project.created_at
    ?? null;
  const recordedAt = resolveRecordedAt(recordedAtRaw);

  if (basePercent != null && basePercent > 0) {
    return [
      {
        type: 'percent',
        amount: baseAmount != null && baseAmount > 0 ? baseAmount : null,
        percentage: basePercent,
        value: basePercent,
        note: null,
        recordedAt
      }
    ];
  }

  if (baseAmount != null && baseAmount > 0) {
    return [
      {
        type: 'amount',
        amount: baseAmount,
        percentage: null,
        value: baseAmount,
        note: null,
        recordedAt
      }
    ];
  }

  return [];
}

function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social'
  }[type] || 'projects.form.types.unknown';
  return t(key, type);
}

function determineProjectStatusFromDates(project) {
  const now = new Date();
  const start = project?.start ? new Date(project.start) : null;
  const end = project?.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }

  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }

  return 'ongoing';
}

function getProjectExpensesTotal(project) {
  if (typeof project?.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project?.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense?.amount) || 0), 0);
  }
  return 0;
}

function resolveProjectTotalsForPdf(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const expensesTotal = getProjectExpensesTotal(project);
  const baseSubtotal = equipmentEstimate + expensesTotal;
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';

  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  let discountAmount = discountType === 'amount'
    ? discountValue
    : baseSubtotal * (discountValue / 100);
  if (!Number.isFinite(discountAmount) || discountAmount < 0) {
    discountAmount = 0;
  }
  if (discountAmount > baseSubtotal) {
    discountAmount = baseSubtotal;
  }

  const subtotalAfterDiscount = Math.max(0, baseSubtotal - discountAmount);

  const companyShareEnabled = project?.companyShareEnabled === true
    || project?.companyShareEnabled === 'true'
    || project?.company_share_enabled === true
    || project?.company_share_enabled === 'true';
  const rawSharePercent = Number.parseFloat(
    project?.companySharePercent
      ?? project?.company_share_percent
      ?? project?.companyShare
      ?? project?.company_share
      ?? 0
  ) || 0;
  const sharePercent = companyShareEnabled && applyTax && rawSharePercent > 0 ? rawSharePercent : 0;
  const companyShareAmount = sharePercent > 0
    ? Number((subtotalAfterDiscount * (sharePercent / 100)).toFixed(2))
    : 0;

  const subtotal = subtotalAfterDiscount + companyShareAmount;

  let taxAmount = applyTax ? subtotal * PROJECT_TAX_RATE : 0;
  if (!Number.isFinite(taxAmount) || taxAmount < 0) {
    taxAmount = 0;
  }
  taxAmount = Number(taxAmount.toFixed(2));

  let totalWithTax = applyTax ? Number(project?.totalWithTax) : subtotal;
  if (applyTax) {
    if (!Number.isFinite(totalWithTax) || totalWithTax <= 0) {
      totalWithTax = Number((subtotal + taxAmount).toFixed(2));
    }
  } else {
    totalWithTax = subtotal;
  }

  return {
    equipmentEstimate,
    expensesTotal,
    baseSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    companyShareAmount,
    subtotal,
    applyTax,
    taxAmount,
    totalWithTax
  };
}

function resolveReservationNetTotalForProject(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    technicianIds,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

function combineProjectDateRange(start, end) {
  if (!start) return '—';
  const startText = formatDateTime(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTime(end)}`;
}

function formatCurrencyValue(value, currencyLabel = 'SR', fractionDigits = 2) {
  const number = Number(value) || 0;
  const digits = Number.isInteger(fractionDigits) ? fractionDigits : 2;
  return `${normalizeNumbers(number.toFixed(digits))} ${currencyLabel}`;
}

function formatPercentageValue(value, fractionDigits = 2) {
  if (!Number.isFinite(Number(value))) {
    return '0%';
  }
  const digits = Number.isInteger(fractionDigits) ? fractionDigits : 2;
  return `${normalizeNumbers(Number(value).toFixed(digits))}%`;
}

function calculateProjectDurationDays(project) {
  if (!project?.start) return null;
  if (!project?.end) return 1;
  const days = calculateReservationDays(project.start, project.end);
  return Number.isFinite(days) ? days : 1;
}

function formatProjectDurationLabel(days) {
  if (!Number.isFinite(days)) return 'غير محدد';
  if (days <= 1) return 'يوم واحد';
  return `${normalizeNumbers(String(Math.round(days)))} أيام`;
}

function collectProjectQuoteData(project) {
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const { customers = [], reservations = [], projects = [], technicians: storedTechnicians = [] } = loadData();

  const resolvedProject = project?.id != null
    ? projects.find((entry) => String(entry.id) === String(project.id)) || project
    : project || null;

  const fallback = {
    projectStatusLabel: t('projects.status.ongoing', 'قيد التنفيذ'),
    paymentStatusLabel: t('projects.paymentStatus.unpaid', 'غير مدفوع')
  };

  if (!resolvedProject) {
    return {
      project: null,
      customer: null,
      clientInfo: {
        name: '-',
        company: '-',
        phone: '-',
        email: '-'
      },
      projectInfo: {
        title: '-',
        code: '-',
        typeLabel: '-',
        startDisplay: '-',
        endDisplay: '-',
        durationLabel: '-',
        statusLabel: fallback.projectStatusLabel
      },
      expenses: [],
      equipment: [],
      reservations: [],
      totals: {
        equipmentEstimate: 0,
        expensesTotal: 0,
        baseSubtotal: 0,
        discountAmount: 0,
        subtotalAfterDiscount: 0,
        companyShareAmount: 0,
        subtotal: 0,
        applyTax: false,
        taxAmount: 0,
        totalWithTax: 0
      },
      totalsDisplay: {
        projectSubtotal: formatCurrencyValue(0, currencyLabel),
        expensesTotal: formatCurrencyValue(0, currencyLabel),
        reservationsTotal: formatCurrencyValue(0, currencyLabel),
        discountAmount: formatCurrencyValue(0, currencyLabel),
        taxAmount: formatCurrencyValue(0, currencyLabel),
        overallTotal: formatCurrencyValue(0, currencyLabel),
        paidAmount: formatCurrencyValue(0, currencyLabel),
        remainingAmount: formatCurrencyValue(0, currencyLabel)
      },
      projectTotals: {
        combinedTaxAmount: 0,
        overallTotal: 0,
        reservationsTotal: 0,
        paidAmount: 0,
        paidPercent: 0,
        remainingAmount: 0,
        paymentStatus: 'unpaid'
      },
      paymentSummary: {
        status: 'unpaid',
        statusLabel: fallback.paymentStatusLabel,
        paidAmount: 0,
        paidPercent: 0,
        remainingAmount: 0,
        paidAmountDisplay: formatCurrencyValue(0, currencyLabel),
        remainingAmountDisplay: formatCurrencyValue(0, currencyLabel),
        paidPercentDisplay: formatPercentageValue(0)
      },
      notes: '',
      currencyLabel,
      projectStatus: 'ongoing',
      projectStatusLabel: fallback.projectStatusLabel,
      projectDurationDays: null,
      projectDurationLabel: 'غير محدد',
      paymentHistory: []
    };
  }

  const clientId = resolvedProject.clientId
    ?? resolvedProject.customerId
    ?? resolvedProject.client_id
    ?? resolvedProject.customer_id
    ?? null;
  const customer = clientId != null
    ? customers.find((entry) => String(entry.id) === String(clientId)) || null
    : null;

  const clientName = customer?.customerName
    ?? customer?.name
    ?? resolvedProject.clientName
    ?? resolvedProject.customerName
    ?? t('projects.fallback.unknownClient', 'عميل غير معروف');

  const projectCompany = (resolvedProject.clientCompany || customer?.companyName || customer?.company || '').trim();

  const clientPhoneRaw = customer?.phone
    ?? customer?.customerPhone
    ?? resolvedProject.clientPhone
    ?? resolvedProject.customerPhone
    ?? '';
  const clientPhone = clientPhoneRaw
    ? normalizeNumbers(String(clientPhoneRaw).trim())
    : t('projects.details.client.noPhone', 'لا يوجد رقم متاح');

  const clientEmailRaw = customer?.email
    ?? resolvedProject.clientEmail
    ?? resolvedProject.customerEmail
    ?? '';
  const clientEmail = clientEmailRaw
    ? String(clientEmailRaw).trim()
    : t('projects.details.client.noEmail', 'لا يوجد بريد متاح');

  const projectCodeRaw = resolvedProject.projectCode || `PRJ-${normalizeNumbers(String(resolvedProject.id ?? ''))}`;
  const projectCodeDisplay = normalizeNumbers(String(projectCodeRaw));
  const projectTitle = (resolvedProject.title || '').trim() || t('projects.fallback.untitled', 'مشروع بدون عنوان');
  const typeLabel = getProjectTypeLabel(resolvedProject.type);
  const startDisplay = resolvedProject.start ? formatDateTime(resolvedProject.start) : '—';
  const endDisplay = resolvedProject.end ? formatDateTime(resolvedProject.end) : '—';
  const durationDays = calculateProjectDurationDays(resolvedProject);
  const durationLabel = durationDays != null ? formatProjectDurationLabel(durationDays) : 'غير محدد';
  const projectStatus = determineProjectStatusFromDates(resolvedProject);
  const statusFallbackMap = {
    upcoming: 'قادم',
    ongoing: 'قيد التنفيذ',
    completed: 'مكتمل'
  };
  const projectStatusLabel = t(`projects.status.${projectStatus}`, statusFallbackMap[projectStatus] || projectStatus);

  const projectIdValue = resolvedProject.id != null ? String(resolvedProject.id) : null;
  const reservationsForProject = projectIdValue
    ? reservations.filter((reservation) => String(reservation.projectId) === projectIdValue)
    : [];

  const reservationsWithMeta = reservationsForProject
    .map((reservation) => {
      const reservationId = reservation.reservationId || reservation.id || '';
      const statusRaw = reservation.status || reservation.state || 'pending';
      const statusKey = String(statusRaw).toLowerCase();
      const statusLabel = t(`reservations.status.${statusKey}`, statusKey);
      const total = resolveReservationNetTotalForProject(reservation);
      const startTimestamp = reservation.start ? new Date(reservation.start).getTime() : 0;
      return {
        reservationId: normalizeNumbers(String(reservationId || '-')),
        status: statusKey,
        statusLabel,
        total,
        totalLabel: formatCurrencyValue(total, currencyLabel),
        dateRange: combineProjectDateRange(reservation.start, reservation.end),
        startTimestamp: Number.isNaN(startTimestamp) ? 0 : startTimestamp
      };
    })
    .sort((a, b) => b.startTimestamp - a.startTimestamp)
    .map(({ startTimestamp, ...rest }) => rest);

  const reservationsTotal = reservationsWithMeta.reduce((sum, entry) => sum + (Number(entry.total) || 0), 0);

  const equipmentMap = new Map();
  reservationsForProject.forEach((reservation) => {
    const items = Array.isArray(reservation.items) ? reservation.items : [];
    const rentalDays = calculateReservationDays(reservation.start, reservation.end);
    const reservationLabel = reservation.reservationId || reservation.id || '';
    items.forEach((item, index) => {
      if (!item) return;
      const keyCandidate = item.barcode || item.code || item.id || item.desc || item.description || `item-${index}`;
      const key = String(keyCandidate || `item-${index}`);
      const existing = equipmentMap.get(key) || {
        description: item.desc || item.description || item.name || item.barcode || `#${normalizeNumbers(String(index + 1))}`,
        totalQuantity: 0,
        reservationsCount: 0,
        reservationIds: new Set(),
        totalCost: 0
      };
      const qty = Number(item.qty) || 1;
      const unitPrice = Number(item.price) || 0;
      existing.totalQuantity += qty;
      existing.reservationIds.add(String(reservationLabel));
      const computedCost = unitPrice * qty * Math.max(1, rentalDays);
      if (Number.isFinite(computedCost)) {
        existing.totalCost += computedCost;
      }
      equipmentMap.set(key, existing);
    });
  });

  const equipment = Array.from(equipmentMap.values()).map((entry) => ({
    description: entry.description,
    totalQuantity: entry.totalQuantity,
    reservationsCount: entry.reservationIds.size,
    displayCost: formatCurrencyValue(entry.totalCost, currencyLabel)
  }));

  const techniciansMap = new Map((storedTechnicians || []).filter(Boolean).map((tech) => [String(tech.id), tech]));
  const crewMap = new Map();

  const registerTechnician = (entry) => {
    if (!entry) return;
    let identifier = null;
    if (typeof entry === 'object') {
      identifier = entry.id ?? entry.technicianId ?? entry.technician_id ?? entry.userId ?? entry.user_id ?? null;
    } else if (typeof entry === 'string' || typeof entry === 'number') {
      identifier = entry;
    }

    const normalizedId = identifier != null ? String(identifier) : null;
    const base = normalizedId && techniciansMap.has(normalizedId)
      ? techniciansMap.get(normalizedId)
      : (typeof entry === 'object' ? entry : null);

    const name = base?.name || base?.full_name || base?.fullName || base?.displayName || (typeof entry === 'string' ? entry : null);
    const role = base?.role || base?.title || null;
    const phone = base?.phone || base?.mobile || base?.contact || null;

    if (!name && !normalizedId) {
      return;
    }

    const key = normalizedId || name;
    if (crewMap.has(key)) return;

    crewMap.set(key, {
      id: normalizedId,
      name: name || '-',
      role: role || null,
      phone: phone || null
    });
  };

  if (Array.isArray(resolvedProject?.technicians)) {
    resolvedProject.technicians.forEach((entry) => registerTechnician(entry));
  }

  reservationsForProject.forEach((reservation) => {
    const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    technicianIds.forEach((techId) => registerTechnician(techId));
  });

  const projectCrew = Array.from(crewMap.values());

  const expenses = Array.isArray(resolvedProject.expenses)
    ? resolvedProject.expenses.map((expense) => {
        const amount = Number(expense?.amount) || 0;
        return {
          label: expense?.label || expense?.name || '-',
          amount,
          displayAmount: formatCurrencyValue(amount, currencyLabel),
          note: expense?.note || expense?.description || ''
        };
      })
    : [];

  const projectTotals = resolveProjectTotalsForPdf(resolvedProject);
  const combinedTaxAmount = projectTotals.applyTax
    ? Number(((projectTotals.subtotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotals.subtotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const paymentHistory = normalizeProjectPaymentHistoryForView(resolvedProject);
  const basePaidAmount = parsePaymentNumber(resolvedProject.paidAmount ?? resolvedProject.paid_amount) || 0;
  const basePaidPercent = parsePaymentNumber(resolvedProject.paidPercent ?? resolvedProject.paid_percent) || 0;
  const paymentProgress = calculatePaymentProgress({
    totalAmount: overallTotal,
    paidAmount: basePaidAmount,
    paidPercent: basePaidPercent,
    history: paymentHistory
  });
  const manualStatusRaw = typeof resolvedProject.paymentStatus === 'string'
    ? resolvedProject.paymentStatus.toLowerCase()
    : '';
  const paymentStatus = determinePaymentStatus({
    manualStatus: manualStatusRaw,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: overallTotal
  });
  const paymentStatusFallback = {
    paid: 'مدفوع',
    partial: 'مدفوع جزئياً',
    unpaid: 'غير مدفوع'
  };
  const paymentStatusLabel = t(`projects.paymentStatus.${paymentStatus}`, paymentStatusFallback[paymentStatus] || paymentStatus);

  const paidAmount = Number(paymentProgress.paidAmount || 0);
  const paidPercent = Number(paymentProgress.paidPercent || 0);
  const remainingAmount = Math.max(0, Number((overallTotal - paidAmount).toFixed(2)));

  const totalsDisplay = {
    projectSubtotal: formatCurrencyValue(projectTotals.subtotal, currencyLabel),
    expensesTotal: formatCurrencyValue(projectTotals.expensesTotal, currencyLabel),
    reservationsTotal: formatCurrencyValue(reservationsTotal, currencyLabel),
    discountAmount: formatCurrencyValue(projectTotals.discountAmount, currencyLabel),
    taxAmount: formatCurrencyValue(combinedTaxAmount, currencyLabel),
    overallTotal: formatCurrencyValue(overallTotal, currencyLabel),
    paidAmount: formatCurrencyValue(paidAmount, currencyLabel),
    remainingAmount: formatCurrencyValue(remainingAmount, currencyLabel)
  };

  const paymentSummary = {
    status: paymentStatus,
    statusLabel: paymentStatusLabel,
    paidAmount,
    paidPercent,
    remainingAmount,
    paidAmountDisplay: formatCurrencyValue(paidAmount, currencyLabel),
    remainingAmountDisplay: formatCurrencyValue(remainingAmount, currencyLabel),
    paidPercentDisplay: formatPercentageValue(paidPercent)
  };

  const notes = (resolvedProject.description || '').trim();

  const clientCompanyDisplay = projectCompany || '—';

  return {
    project: resolvedProject,
    customer,
    clientInfo: {
      name: clientName,
      company: clientCompanyDisplay,
      phone: clientPhone,
      email: clientEmail
    },
    projectInfo: {
      title: projectTitle,
      code: projectCodeDisplay,
      typeLabel,
      startDisplay,
      endDisplay,
      durationLabel,
      statusLabel: projectStatusLabel
    },
    expenses,
    equipment,
    crew: projectCrew,
    totals: projectTotals,
    totalsDisplay,
    projectTotals: {
      combinedTaxAmount,
      overallTotal,
      reservationsTotal,
      paidAmount,
      paidPercent,
      remainingAmount,
      paymentStatus
    },
    paymentSummary,
    notes,
    currencyLabel,
    projectStatus,
    projectStatusLabel,
    projectDurationDays: durationDays,
    projectDurationLabel: durationLabel,
    paymentHistory
  };
}

function buildProjectQuotationHtml({
  project,
  clientInfo = {},
  projectInfo = {},
  projectCrew = [],
  projectExpenses = [],
  projectEquipment = [],
  totalsDisplay = {},
  projectTotals = {},
  paymentSummary = {},
  currencyLabel = 'SR',
  sections,
  fieldSelections = {},
  quoteNumber,
  quoteDate,
  terms = DEFAULT_TERMS
}) {
  const fieldsSelection = cloneFieldSelections(fieldSelections);
  const isFieldEnabled = (sectionId, fieldId) => isFieldEnabledInSelections(fieldsSelection, sectionId, fieldId);
  const includeSection = (id) => sections?.has?.(id);
  const noFieldsMessage = `<div class="quote-placeholder">${escapeHtml(t('reservations.quote.placeholder.noFields', 'لم يتم اختيار أي معلومات للعرض في هذا القسم.'))}</div>`;

  const renderPlainItem = (label, value) => (
    `<div class="info-plain__item">
      <span class="info-plain__label">${escapeHtml(label)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${escapeHtml(value)}</span>
    </div>`
  );

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

  const renderPaymentRow = (label, value) => (
    `<div class="payment-row">
      <span class="payment-row__label">${escapeHtml(label)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${escapeHtml(value)}</span>
    </div>`
  );

  const customerFieldItems = [];
  if (isFieldEnabled('customerInfo', 'customerName')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.client', 'العميل'), clientInfo.name || '-'));
  }
  if (isFieldEnabled('customerInfo', 'customerCompany')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.company', 'شركة العميل'), clientInfo.company || '—'));
  }
  if (isFieldEnabled('customerInfo', 'customerPhone')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.labels.clientPhone', 'رقم العميل'), clientInfo.phone || '-'));
  }
  if (isFieldEnabled('customerInfo', 'customerEmail')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.labels.clientEmail', 'البريد الإلكتروني'), clientInfo.email || '-'));
  }

  const customerSectionMarkup = includeSection('customerInfo')
    ? `<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${escapeHtml(t('projects.quote.sections.customer', 'بيانات العميل'))}</h3>
        ${customerFieldItems.length ? `<div class="info-plain">${customerFieldItems.join('')}</div>` : noFieldsMessage}
      </section>`
    : '';

  const projectFieldItems = [];
  if (isFieldEnabled('projectInfo', 'projectType')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.type', 'نوع المشروع'), projectInfo.typeLabel || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectTitle')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.projectTitle', 'اسم المشروع'), projectInfo.title || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectCode')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.labels.code', 'رقم المشروع'), projectInfo.code || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectStart')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.start', 'بداية المشروع'), projectInfo.startDisplay || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectEnd')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.end', 'نهاية المشروع'), projectInfo.endDisplay || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectDuration')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.duration', 'مدة المشروع'), projectInfo.durationLabel || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectStatus')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.status', 'حالة المشروع'), projectInfo.statusLabel || '-'));
  }

  const projectSectionMarkup = includeSection('projectInfo')
    ? `<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${escapeHtml(t('projects.quote.sections.project', 'بيانات المشروع'))}</h3>
        ${projectFieldItems.length ? `<div class="info-plain">${projectFieldItems.join('')}</div>` : noFieldsMessage}
      </section>`
    : '';

  const crewColumns = PROJECT_CREW_COLUMN_DEFS.filter((column) => isFieldEnabled('projectCrew', column.id));
const crewSectionMarkup = includeSection('projectCrew')
    ? (crewColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.crew', 'طاقم العمل'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${crewColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectCrew.length
                ? projectCrew.map((tech, index) => `<tr>${crewColumns.map((column) => `<td>${column.render(tech, index)}</td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(crewColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.crew.empty', 'لا يوجد طاقم فني مرتبط.'))}</td></tr>`}
              </tbody>
            </table>
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.crew', 'طاقم العمل'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const financialInlineItems = [];
  if (isFieldEnabled('financialSummary', 'projectSubtotal')) {
    financialInlineItems.push(renderTotalsItem(t('projects.details.summary.projectSubtotal', 'إجمالي المشروع'), totalsDisplay.projectSubtotal || `${formatCurrencyValue(0, currencyLabel)}`));
  }
  if (isFieldEnabled('financialSummary', 'expensesTotal')) {
    financialInlineItems.push(renderTotalsItem(t('projects.details.expensesTotal', 'إجمالي متطلبات المشروع'), totalsDisplay.expensesTotal || formatCurrencyValue(0, currencyLabel)));
  }
  if (isFieldEnabled('financialSummary', 'reservationsTotal')) {
    financialInlineItems.push(renderTotalsItem(t('projects.details.reservationsTotal', 'إجمالي الحجوزات'), totalsDisplay.reservationsTotal || formatCurrencyValue(0, currencyLabel)));
  }
  if (isFieldEnabled('financialSummary', 'discountAmount')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.discount', 'الخصم'), totalsDisplay.discountAmount || formatCurrencyValue(0, currencyLabel)));
  }
  if (isFieldEnabled('financialSummary', 'taxAmount')) {
    financialInlineItems.push(renderTotalsItem(t('projects.details.summary.combinedTax', 'إجمالي الضريبة'), totalsDisplay.taxAmount || formatCurrencyValue(0, currencyLabel)));
  }

  const financialFinalItems = [];
  if (isFieldEnabled('financialSummary', 'overallTotal')) {
    financialFinalItems.push(renderTotalsItem(t('projects.details.summary.overallTotal', 'الإجمالي الكلي'), totalsDisplay.overallTotal || formatCurrencyValue(0, currencyLabel), { variant: 'final' }));
  }
  if (isFieldEnabled('financialSummary', 'paidAmount')) {
    financialFinalItems.push(renderTotalsItem(t('projects.details.summary.paidAmount', 'إجمالي المدفوع'), totalsDisplay.paidAmount || formatCurrencyValue(0, currencyLabel), { variant: 'final' }));
  }
  if (isFieldEnabled('financialSummary', 'remainingAmount')) {
    financialFinalItems.push(renderTotalsItem(t('projects.details.summary.remainingAmount', 'المتبقي للدفع'), totalsDisplay.remainingAmount || formatCurrencyValue(0, currencyLabel), { variant: 'final' }));
  }

  const financialSectionMarkup = includeSection('financialSummary')
    ? (() => {
        if (!financialInlineItems.length && !financialFinalItems.length) {
          return `<section class="quote-section quote-section--financial">${noFieldsMessage}</section>`;
        }
        return `<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${escapeHtml(t('projects.quote.sections.financial', 'الملخص المالي'))}</h3>
            ${financialInlineItems.length ? `<div class="totals-inline">${financialInlineItems.join('')}</div>` : ''}
            ${financialFinalItems.length ? `<div class="totals-final">${financialFinalItems.join('')}</div>` : ''}
          </div>
        </section>`;
      })()
    : '';

  const expensesColumns = PROJECT_EXPENSES_COLUMN_DEFS.filter((column) => isFieldEnabled('projectExpenses', column.id));
  const expensesSectionMarkup = includeSection('projectExpenses')
    ? (expensesColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.expenses', 'متطلبات المشروع'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${expensesColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectExpenses.length
                ? projectExpenses.map((expense, index) => `<tr>${expensesColumns.map((column) => `<td>${column.render(expense, index)}</td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(expensesColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.expenses.empty', 'لا توجد متطلبات مسجلة.'))}</td></tr>`}
              </tbody>
            </table>
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.expenses', 'متطلبات المشروع'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const equipmentColumns = PROJECT_EQUIPMENT_COLUMN_DEFS.filter((column) => isFieldEnabled('projectEquipment', column.id));
  const equipmentSectionMarkup = includeSection('projectEquipment')
    ? (equipmentColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.equipment', 'المعدات'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${equipmentColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectEquipment.length
                ? projectEquipment.map((item, index) => `<tr>${equipmentColumns.map((column) => `<td>${column.render(item, index)}</td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(equipmentColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.equipment.empty', 'لا توجد معدات مرتبطة حالياً.'))}</td></tr>`}
              </tbody>
            </table>
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.equipment', 'المعدات'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const notesValue = (project?.description || '').trim() || '';
  const notesSectionMarkup = includeSection('projectNotes')
    ? `<section class="quote-section">
        <h3>${escapeHtml(t('projects.quote.sections.notes', 'ملاحظات المشروع'))}</h3>
        <div class="quote-notes">${notesValue ? escapeHtml(notesValue) : escapeHtml(t('projects.fallback.noDescription', 'لا يوجد وصف للمشروع.'))}</div>
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

  const termsList = Array.isArray(terms) && terms.length ? terms : DEFAULT_TERMS;

  const termsSectionMarkup = `<footer class="quote-footer">
        <h4>${escapeHtml(t('reservations.quote.labels.terms', 'الشروط العامة'))}</h4>
        <ul>${termsList.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
      </footer>`;

  const primaryBlocks = [];
  const primarySections = [];
  if (projectSectionMarkup) {
    primarySections.push({ key: 'project', html: projectSectionMarkup });
  }
  if (customerSectionMarkup) {
    primarySections.push({ key: 'customer', html: customerSectionMarkup });
  }

  if (primarySections.length > 1) {
    const projectEntry = primarySections.find((entry) => entry.key === 'project');
    const customerEntry = primarySections.find((entry) => entry.key === 'customer');
    const ordered = [];
    if (projectEntry?.html) ordered.push(projectEntry.html);
    if (customerEntry?.html) ordered.push(customerEntry.html);

    primaryBlocks.push(withBlockAttributes(
      `<div class="quote-section-row quote-section-row--primary">${ordered.join('')}</div>`,
      { blockType: 'group' }
    ));
  } else if (primarySections.length === 1) {
    primaryBlocks.push(withBlockAttributes(primarySections[0].html));
  }

  const tableBlocks = [];
  if (crewSectionMarkup) {
    tableBlocks.push(withBlockAttributes(crewSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="project-crew"' }));
  }
  if (expensesSectionMarkup) {
    tableBlocks.push(withBlockAttributes(expensesSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="project-expenses"' }));
  }
  if (equipmentSectionMarkup) {
    tableBlocks.push(withBlockAttributes(equipmentSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="project-equipment"' }));
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
    ...ensureBlocks(primaryBlocks, 'projects.quote.placeholder.primary'),
    ...tableBlocks,
    ...ensureBlocks(summaryBlocks, 'projects.quote.placeholder.summary'),
    ...footerBlocks
  ];

  const headerTemplateHtml = `
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${escapeHtml(QUOTE_COMPANY_INFO.logoUrl)}" alt="${escapeHtml(QUOTE_COMPANY_INFO.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(t('projects.quote.title', 'عرض سعر'))}</h1>
        <p class="quote-company-name">${escapeHtml(QUOTE_COMPANY_INFO.companyName)}</p>
        <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('reservations.details.labels.reservationId', 'رقم العرض'))}</span>
          <strong>${escapeHtml(quoteNumber)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('projects.quote.labels.date', 'التاريخ'))}</span>
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

function buildQuotationHtml(options) {
  if (options?.context === 'project') {
    return buildProjectQuotationHtml(options);
  }

  const {
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
    quoteDate,
    terms = DEFAULT_TERMS
  } = options;
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
  const termsList = Array.isArray(terms) && terms.length ? terms : DEFAULT_TERMS;

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
  const financialFinalItems = [];
  if (showFinalTotal) {
    financialFinalItems.push(renderTotalsItem(t('reservations.details.labels.total', 'الإجمالي النهائي'), `${totalsDisplay.finalTotal} ${currencyLabel}`, { variant: 'final' }));
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

  const { groups: reservationDisplayGroups } = buildReservationDisplayGroups(reservation);
  const quoteItems = reservationDisplayGroups.map((group) => {
    const count = Number(group?.count ?? group?.quantity ?? 1) || 1;
    const rawUnitPrice = Number(group?.unitPrice);
    let unitPrice = Number.isFinite(rawUnitPrice) ? rawUnitPrice : 0;
    if (!unitPrice || unitPrice <= 0) {
      const totalCandidate = Number(group?.totalPrice);
      if (Number.isFinite(totalCandidate) && count > 0) {
        unitPrice = Number((totalCandidate / count).toFixed(2));
      }
    }
    if (!Number.isFinite(unitPrice)) {
      unitPrice = 0;
    }

    const isPackage = group?.type === 'package'
      || (Array.isArray(group?.items) && group.items.some((item) => item?.type === 'package'));

    const fallbackBarcode = Array.isArray(group?.barcodes) && group.barcodes.length
      ? group.barcodes[0]
      : (Array.isArray(group?.items) && group.items.length ? group.items[0]?.barcode : null);

    const packageCode = group?.packageDisplayCode
      ?? group?.package_code
      ?? group?.packageCode
      ?? group?.packageId
      ?? group?.package_id
      ?? group?.code
      ?? group?.barcode
      ?? (Array.isArray(group?.items) && group.items.length
        ? group.items[0]?.package_code
          ?? group.items[0]?.packageCode
          ?? group.items[0]?.packageId
          ?? group.items[0]?.package_id
          ?? group.items[0]?.code
          ?? group.items[0]?.barcode
        : null);

    const rawBarcode = isPackage
      ? (packageCode ?? fallbackBarcode ?? '')
      : (group?.barcode ?? fallbackBarcode ?? '');
    const barcode = rawBarcode != null ? String(rawBarcode) : '';

    let totalPrice = Number.isFinite(Number(group?.totalPrice))
      ? Number(group.totalPrice)
      : Number((unitPrice * count).toFixed(2));

    totalPrice = sanitizePriceValue(totalPrice);

    return {
      ...group,
      isPackage,
      desc: group?.description,
      barcode,
      qty: count,
      price: totalPrice,
      totalPrice,
      unitPriceValue: unitPrice,
    };
  });

  const itemColumns = QUOTE_ITEMS_COLUMN_DEFS.filter((column) => isFieldEnabled('items', column.id));
  const hasItemColumns = itemColumns.length > 0;
  const itemTableHeader = hasItemColumns
    ? itemColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const hasItems = quoteItems.length > 0;
  const itemsBodyRows = hasItems
    ? quoteItems.map((item, index) => `<tr>${itemColumns.map((column) => `<td>${column.render(item, index)}</td>`).join('')}</tr>`).join('')
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
        <ul>${termsList.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
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
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
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
  if (image.complete) {
    return image.naturalHeight === 0
      ? Promise.reject(new Error(`image failed to load: ${image.src || 'unknown'}`))
      : Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const handleLoad = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error(`image failed to load: ${image.src || 'unknown'}`));
    };
    const cleanup = () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
    image.addEventListener('load', handleLoad, { once: true });
    image.addEventListener('error', handleError, { once: true });
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
      notifyQuoteAssetFailure();
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

  if (!isPreview) {
    const view = doc.defaultView || window;
    const basePixelRatio = Math.min(3, Math.max(1, view.devicePixelRatio || 1));
    const notePixelRatio = isMobileSafariBrowser() ? Math.min(2, basePixelRatio) : basePixelRatio;
    filteredPages.forEach((page) => rasterizeQuoteNotes(page, { pixelRatio: notePixelRatio }));
  }

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

  const ownerDocument = root.ownerDocument || document;
  const styleDirection = ownerDocument?.defaultView?.getComputedStyle?.(root)?.direction;
  const directionHints = [
    root.getAttribute?.('dir'),
    root.style?.direction,
    styleDirection,
    ownerDocument?.documentElement?.getAttribute?.('dir')
  ];
  const isRtlDocument = directionHints.some((dir) => typeof dir === 'string' && dir.toLowerCase().startsWith('rtl'));

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
    // html2canvas letter-level rendering breaks Arabic ligatures on iOS Safari; fall back to native shaping when RTL.
    letterRendering: !isRtlDocument,
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

  const needsBlobDelivery = safariMode || mobileSafari;

  if (needsBlobDelivery) {
    const blob = pdf.output('blob');

    if (mobileSafari) {
      const blobUrl = URL.createObjectURL(blob);
      hideQuotePreviewStatus();
      try {
        window.location.assign(blobUrl);
      } catch (assignError) {
        logPdfWarn('mobile safari blob navigation failed', assignError);
      } finally {
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      }
    } else {
      const blobUrl = URL.createObjectURL(blob);

      const resolveTargetWindow = () => {
        if (safariMode && safariWindowRef && !safariWindowRef.closed) {
          return safariWindowRef;
        }
        if (mobileWindowRef && !mobileWindowRef.closed) {
          return mobileWindowRef;
        }
        return null;
      };

      const deliverToWindow = (targetWindow, url) => {
        hideQuotePreviewStatus();
        if (!targetWindow) {
          window.location.assign(url);
          return;
        }
        try {
          targetWindow.location.replace(url);
          targetWindow.focus?.();
        } catch (navigationError) {
          logPdfWarn('direct blob navigation failed', navigationError);
          try {
            targetWindow.document.open();
            targetWindow.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${escapeHtml(t('reservations.quote.actions.export', 'تنزيل PDF'))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${url}" title="PDF preview"></iframe></body></html>`);
            targetWindow.document.close();
          } catch (iframeError) {
            logPdfWarn('iframe blob delivery failed', iframeError);
            window.location.assign(url);
          }
        }
      };

      const targetWindow = resolveTargetWindow();
      deliverToWindow(targetWindow, blobUrl);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    }
  } else {
    hideQuotePreviewStatus();
    const blobUrl = pdf.output('bloburl');
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
      link.remove();
    }, 2000);
  }
}


function renderQuotePreview() {
  if (!activeQuoteState || !quoteModalRefs) return;
  const { previewFrame } = quoteModalRefs;
  if (!previewFrame) return;

  const context = activeQuoteState.context || 'reservation';
  const html = buildQuotationHtml({
    context,
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
    quoteDate: activeQuoteState.quoteDateLabel,
    terms: activeQuoteState.terms,
    projectCrew: activeQuoteState.projectCrew,
    projectExpenses: activeQuoteState.projectExpenses,
    projectEquipment: activeQuoteState.projectEquipment,
    projectInfo: activeQuoteState.projectInfo,
    clientInfo: activeQuoteState.clientInfo,
    paymentSummary: activeQuoteState.paymentSummary,
    projectTotals: activeQuoteState.projectTotals
  });

  showQuotePreviewStatus('render');
  previewFrame.srcdoc = `<!DOCTYPE html>${html}`;
  previewFrame.addEventListener('load', async () => {
    try {
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
    } finally {
      hideQuotePreviewStatus();
    }
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
  persistQuoteTogglePreferences(activeQuoteState);
  renderQuoteToggles();
  renderQuotePreview();
}

function handleFieldToggleChange(event) {
  if (!activeQuoteState) return;
  const checkbox = event.currentTarget;
  const sectionId = checkbox?.dataset?.sectionId;
  const fieldId = checkbox?.dataset?.fieldId;
  if (!sectionId || !fieldId) return;
  const context = activeQuoteState.context || 'reservation';
  const selections = activeQuoteState.fields || (activeQuoteState.fields = buildDefaultFieldSelections(context));
  const set = getFieldSelectionSet(selections, sectionId);
  if (checkbox.checked) {
    set.add(fieldId);
  } else {
    set.delete(fieldId);
  }
  persistQuoteTogglePreferences(activeQuoteState);
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
  const context = activeQuoteState.context || 'reservation';
  const expansions = ensureSectionExpansionState(activeQuoteState);
  const sectionDefs = getQuoteSectionDefs(context);
  const fieldDefs = getQuoteFieldDefs(context);
  const items = sectionDefs.map(({ id, labelKey, fallback }) => {
    const sectionLabel = t(labelKey, fallback);
    const sectionChecked = activeQuoteState.sections.has(id);
    const fields = fieldDefs[id] || [];
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
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${escapeHtml(t('reservations.quote.termsEditor.title', 'الشروط العامة (قابلة للتعديل)'))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${escapeHtml(t('reservations.quote.termsEditor.placeholder', 'اكتب كل شرط في سطر مستقل'))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${escapeHtml(t('reservations.quote.termsEditor.reset', 'استعادة الشروط الافتراضية'))}</button>
              </div>
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
  const termsInput = modal.querySelector('[data-quote-terms-input]');
  const termsReset = modal.querySelector('[data-quote-terms-reset]');
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
  const statusIndicator = document.createElement('div');
  statusIndicator.className = 'quote-preview-status';
  statusIndicator.setAttribute('role', 'status');
  statusIndicator.setAttribute('aria-live', 'polite');
  statusIndicator.hidden = true;
  statusIndicator.innerHTML = `
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${escapeHtml(getQuoteStatusMessage('render'))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `;
  preview.appendChild(statusIndicator);
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
    previewScroll,
    previewFrameWrapper: frameWrapper,
    zoomControls,
    zoomValue: zoomControls.querySelector('[data-zoom-value]'),
    previewFrame,
    meta,
    downloadBtn,
    statusIndicator,
    statusText: statusIndicator.querySelector('[data-quote-status-text]'),
    statusSpinner: statusIndicator.querySelector('[data-quote-status-spinner]'),
    statusAction: statusIndicator.querySelector('[data-quote-status-action]'),
    termsInput,
    termsReset,
    statusKind: null,
    userAdjustedZoom: false
  };

  const zoomOutBtn = zoomControls.querySelector('[data-zoom-out]');
  const zoomInBtn = zoomControls.querySelector('[data-zoom-in]');
  const zoomResetBtn = zoomControls.querySelector('[data-zoom-reset]');

  zoomOutBtn?.addEventListener('click', () => adjustPreviewZoom(-0.1));
  zoomInBtn?.addEventListener('click', () => adjustPreviewZoom(0.1));
  zoomResetBtn?.addEventListener('click', () => setPreviewZoom(1, { markManual: true }));

  if (termsInput) {
    termsInput.addEventListener('input', handleQuoteTermsInput);
  }

  if (termsReset) {
    termsReset.addEventListener('click', handleQuoteTermsReset);
  }

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

function updateQuoteTermsEditor() {
  if (!quoteModalRefs?.termsInput) return;
  const termsValue = (activeQuoteState?.terms && activeQuoteState.terms.length ? activeQuoteState.terms : DEFAULT_TERMS).join('\n');
  if (quoteModalRefs.termsInput.value !== termsValue) {
    quoteModalRefs.termsInput.value = termsValue;
  }
}

function handleQuoteTermsInput(event) {
  if (!activeQuoteState) return;
  const nextTerms = normalizeTermsInput(event?.target?.value ?? '');
  if (nextTerms.length) {
    activeQuoteState.terms = nextTerms;
    const creationInput = document.getElementById('reservation-terms');
    if (creationInput) {
      creationInput.value = event.target.value;
    }
    const editInput = document.getElementById('edit-res-terms');
    if (editInput) {
      editInput.value = event.target.value;
    }
  } else {
    activeQuoteState.terms = [...DEFAULT_TERMS];
    updateQuoteTermsEditor();
    const defaultText = DEFAULT_TERMS.join('\n');
    const creationInput = document.getElementById('reservation-terms');
    if (creationInput) {
      creationInput.value = defaultText;
    }
    const editInput = document.getElementById('edit-res-terms');
    if (editInput) {
      editInput.value = defaultText;
    }
  }
  renderQuotePreview();
}

function handleQuoteTermsReset(event) {
  event?.preventDefault?.();
  if (!activeQuoteState) return;
  activeQuoteState.terms = [...DEFAULT_TERMS];
  const creationInput = document.getElementById('reservation-terms');
  if (creationInput) {
    creationInput.value = DEFAULT_TERMS.join('\n');
  }
  const editInput = document.getElementById('edit-res-terms');
  if (editInput) {
    editInput.value = DEFAULT_TERMS.join('\n');
  }
  updateQuoteTermsEditor();
  renderQuotePreview();
}

async function exportQuoteAsPdf() {
  if (!activeQuoteState) return;
  showQuotePreviewStatus('export');
  const mobileViewport = isMobileViewport();
  const safariPopupRequired = !mobileViewport && isIosSafari();
  const mobileSafari = isMobileSafariBrowser();
  const mobileDownloadWindow = null;
  const safariDownloadWindow = (!mobileSafari && safariPopupRequired) ? window.open('', '_blank') : null;

  const primeDownloadWindow = (win) => {
    if (!win) return;
    try {
      win.document.open();
      win.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${escapeHtml(t('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...'))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${escapeHtml(t('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...'))}</h1><p>${escapeHtml(t('reservations.quote.status.exportingHint', 'قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار...'))}</p></div></body></html>`);
      win.document.close();
    } catch (error) {
      logPdfWarn('failed to prime download window', error);
    }
  };

  primeDownloadWindow(safariDownloadWindow);

  let container = null;
  const browserLimitMessage = t('reservations.quote.errors.browserLimit', 'تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.');

  try {
    await ensureHtml2Pdf();
    logPdfDebug('html2pdf ensured');

    const context = activeQuoteState.context || 'reservation';
    const html = buildQuotationHtml({
      context,
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
      quoteDate: activeQuoteState.quoteDateLabel,
      terms: activeQuoteState.terms,
      projectCrew: activeQuoteState.projectCrew,
      projectExpenses: activeQuoteState.projectExpenses,
      projectEquipment: activeQuoteState.projectEquipment,
      projectInfo: activeQuoteState.projectInfo,
      clientInfo: activeQuoteState.clientInfo,
      paymentSummary: activeQuoteState.paymentSummary,
      projectTotals: activeQuoteState.projectTotals
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
    hideQuotePreviewStatus();
  }
}

function openQuoteModal() {
  const refs = ensureQuoteModal();
  if (!refs?.modal) return;

  quoteAssetWarningShown = false;
  previewZoom = 1;
  if (quoteModalRefs) {
    quoteModalRefs.userAdjustedZoom = false;
  }
  setPreviewZoom(previewZoom, { silent: true });

  renderQuoteToggles();
  updateQuoteMeta();
  updateQuoteTermsEditor();
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
  const { sequence, quoteNumber } = peekNextQuoteSequence('reservation');
  const now = new Date();
  const baseTerms = resolveTermsFromForms();

  activeQuoteState = {
    context: 'reservation',
    reservation,
    customer,
    project,
    technicians,
    totals,
    totalsDisplay,
    rentalDays,
    currencyLabel,
    projectCrew: [],
    projectExpenses: [],
    projectEquipment: [],
    sections: new Set(getQuoteSectionDefs('reservation').filter((section) => section.defaultSelected).map((section) => section.id)),
    sectionExpansions: buildDefaultSectionExpansions('reservation'),
    fields: buildDefaultFieldSelections('reservation'),
    terms: baseTerms,
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };

  applyQuoteTogglePreferences(activeQuoteState);
  openQuoteModal();
}

export async function exportProjectPdf({ project }) {
  if (!project) {
    showToast(t('projects.toast.notFound', '⚠️ تعذر العثور على بيانات المشروع'));
    return;
  }

  const projectData = collectProjectQuoteData(project);
  const { project: resolvedProject } = projectData;
  if (!resolvedProject) {
    showToast(t('projects.toast.notFound', '⚠️ تعذر العثور على بيانات المشروع'));
    return;
  }

  const { sequence, quoteNumber } = peekNextQuoteSequence('project');
  const now = new Date();
  const baseTerms = [...PROJECT_QUOTE_TERMS];

  activeQuoteState = {
    context: 'project',
    reservation: null,
    customer: projectData.customer,
    project: resolvedProject,
    technicians: projectData.crew || [],
    clientInfo: projectData.clientInfo,
    projectInfo: projectData.projectInfo,
    projectCrew: projectData.crew,
    projectExpenses: projectData.expenses,
    projectEquipment: projectData.equipment,
    totals: projectData.totals,
    projectTotals: projectData.projectTotals,
    totalsDisplay: projectData.totalsDisplay,
    rentalDays: projectData.projectDurationDays,
    currencyLabel: projectData.currencyLabel,
    sections: new Set(getQuoteSectionDefs('project').filter((section) => section.defaultSelected).map((section) => section.id)),
    sectionExpansions: buildDefaultSectionExpansions('project'),
    fields: buildDefaultFieldSelections('project'),
    terms: baseTerms,
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false,
    paymentSummary: projectData.paymentSummary,
    projectNotes: projectData.notes,
    paymentHistory: projectData.paymentHistory
  };

  applyQuoteTogglePreferences(activeQuoteState);
  openQuoteModal();
}
