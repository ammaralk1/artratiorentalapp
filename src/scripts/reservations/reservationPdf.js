import { loadData, saveData } from '../storage.js';
import { getReservationsState, refreshReservationsFromApi } from '../reservationsService.js';
import { apiRequest } from '../apiClient.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { getTechnicianPositionsCache, findPositionByName } from '../technicianPositions.js';
import { t, setLanguage, getCurrentLanguage } from '../language.js';
import { normalizeNumbers, formatDateTime, showToast, showToastWithAction } from '../utils.js';
import {
  calculateReservationDays,
  calculateReservationTotal,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
  calculateDraftFinancialBreakdown
} from '../reservationsSummary.js';
import { resolveReservationProjectState, buildReservationDisplayGroups, sanitizePriceValue, parsePriceValue } from '../reservationsShared.js';
import { findPackageById, getPackagesSnapshot } from '../reservationsPackages.js';
import { PROJECT_TAX_RATE } from '../projects/constants.js';
import quotePdfStyles from '../../styles/quotePdf.css?raw';
// Font URLs (served from public/fonts) resolved by Vite for reliable loading in preview/export windows
import taj400Url from '/assets/Tajawal-400.ttf?url';
import taj500Url from '/assets/Tajawal-500.ttf?url';
import taj700Url from '/assets/Tajawal-700.ttf?url';
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
  project: 'projects.quote.togglePrefs.v1',
  reservationChecklist: 'reservations.checklist.togglePrefs.v1'
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
  { id: 'notes', labelKey: 'reservations.quote.sections.notes', fallback: 'ملاحظات الحجز', defaultSelected: true },
  // جعل بيانات الدفع اختيارية من خلال المعاينة
  { id: 'payment', labelKey: 'reservations.quote.sections.payment', fallback: 'بيانات الدفع', defaultSelected: false }
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
    render: (item) => {
      if (item?.isPackage) {
        const code = item?.packageCodeResolved || item?.barcode || '';
        return escapeHtml(code || '-');
      }
      return escapeHtml(item?.barcode || '-');
    }
  },
  {
    id: 'description',
    labelKey: 'reservations.details.table.headers.description',
    fallback: 'الوصف',
    render: (item) => {
      const text = String(item?.desc || item?.description || '-');
      return `<div class="quote-cell quote-cell--desc">${escapeHtml(text)}</div>`;
    }
  },
  {
    id: 'quantity',
    labelKey: 'reservations.details.table.headers.quantity',
    fallback: 'الكمية',
    render: (item) => escapeHtml(normalizeNumbers(String(item?.qty || 1)))
  },
  {
    id: 'unitPrice',
    labelKey: 'reservations.quote.columns.unitPrice',
    fallback: 'لكل يوم',
    render: (item) => escapeHtml(normalizeNumbers((Number(item?.unitPriceValue || 0)).toFixed(2)))
  },
  {
    id: 'price',
    labelKey: 'reservations.quote.columns.total',
    fallback: 'المجموع',
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
    id: 'position',
    labelKey: 'reservations.details.crew.position',
    fallback: 'المنصب',
    render: (assignment) => {
      const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
      const labelEn = assignment?.positionLabelEn
        ?? assignment?.position_label_en
        ?? assignment?.position_name_en
        ?? assignment?.positionLabelAlt
        ?? assignment?.position_label_alt
        ?? assignment?.role;
      const labelAr = assignment?.positionLabel
        ?? assignment?.position_name
        ?? assignment?.role
        ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
      const chosen = langNow === 'en' && labelEn ? labelEn : labelAr;
      return escapeHtml(normalizeNumbers(String(chosen)));
    }
  },
  {
    id: 'unitPrice',
    labelKey: 'reservations.quote.columns.unitPrice',
    fallback: 'لكل يوم',
    render: (assignment) => {
      const value = Number.isFinite(Number(assignment?.positionClientPrice))
        ? Number(assignment.positionClientPrice)
        : 0;
      return escapeHtml(`${normalizeNumbers(value.toFixed(2))} ${t('reservations.create.summary.currency', 'SR')}`);
    }
  },
  {
    id: 'price',
    labelKey: 'reservations.quote.columns.total',
    fallback: 'المجموع',
    render: (assignment) => {
      const value = Number.isFinite(Number(assignment?.positionClientPrice))
        ? Number(assignment.positionClientPrice)
        : 0;
      return escapeHtml(`${normalizeNumbers(value.toFixed(2))} ${t('reservations.create.summary.currency', 'SR')}`);
    }
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
    // خيارات الملخص المالي المعروضة في قسم الحجز
    { id: 'discountAmount', labelKey: 'reservations.details.labels.discount', fallback: 'الخصم' },
    { id: 'subtotalBeforeTax', labelKey: 'reservations.details.labels.subtotalBeforeTax', fallback: 'الإجمالي قبل الضريبة' },
    { id: 'taxAmount', labelKey: 'reservations.details.labels.tax', fallback: 'الضريبة' },
    { id: 'finalTotal', labelKey: 'reservations.details.labels.total', fallback: 'الإجمالي النهائي' }
  ],
  payment: [
    { id: 'beneficiary', labelKey: 'reservations.quote.labels.beneficiary', fallback: 'اسم المستفيد' },
    { id: 'bank', labelKey: 'reservations.quote.labels.bank', fallback: 'اسم البنك' },
    { id: 'account', labelKey: 'reservations.quote.labels.account', fallback: 'رقم الحساب' },
    { id: 'iban', labelKey: 'reservations.quote.labels.iban', fallback: 'رقم الآيبان' }
  ],
  // Items (equipment) section: add subtotal toggle
  items: [
    ...QUOTE_ITEMS_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'equipmentSubtotal', labelKey: 'reservations.details.labels.equipmentTotal', fallback: 'إجمالي المعدات' }
  ],
  crew: [
    ...QUOTE_CREW_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'quantity', labelKey: 'reservations.details.table.headers.quantity', fallback: 'الكمية' },
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'crewSubtotal', labelKey: 'reservations.details.labels.crewTotal', fallback: 'إجمالي الفريق' }
  ]
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
    // In project PDF, show sale price column label
    fallback: 'السعر',
    render: (expense) => {
      const value = Number.isFinite(Number(expense?.salePrice ?? expense?.sale_price))
        ? Number(expense?.salePrice ?? expense?.sale_price)
        : Number(expense?.amount ?? 0) || 0;
      return escapeHtml(formatCurrencyValue(value, t('reservations.create.summary.currency', 'SR')));
    }
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
  { id: 'projectExpenses', labelKey: 'projects.quote.sections.expenses', fallback: 'الخدمات الإنتاجية', defaultSelected: true },
  { id: 'projectCrew', labelKey: 'projects.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true },
  { id: 'financialSummary', labelKey: 'projects.quote.sections.financial', fallback: 'الملخص المالي', defaultSelected: true },
  { id: 'projectEquipment', labelKey: 'projects.quote.sections.equipment', fallback: 'المعدات', defaultSelected: true },
  { id: 'projectNotes', labelKey: 'projects.quote.sections.notes', fallback: 'ملاحظات المشروع', defaultSelected: true },
  // خيار إظهار/إخفاء بيانات الدفع في معاينة المشروع
  { id: 'payment', labelKey: 'reservations.quote.sections.payment', fallback: 'بيانات الدفع', defaultSelected: false }
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
    { id: 'reservationsTotal', labelKey: 'projects.details.reservationsTotal', fallback: 'إجمالي الحجوزات' },
    { id: 'discountAmount', labelKey: 'projects.details.summary.discount', fallback: 'الخصم' },
    { id: 'taxAmount', labelKey: 'projects.details.summary.combinedTax', fallback: 'الضريبة' },
    { id: 'overallTotal', labelKey: 'projects.details.summary.overallTotal', fallback: 'الإجمالي الكلي' },
    // removed: projectSubtotal, expensesTotal, paidAmount, remainingAmount from toggles per request
  ],
  payment: QUOTE_FIELD_DEFS.payment,
  projectExpenses: [
    ...PROJECT_EXPENSES_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'expensesSubtotal', labelKey: 'projects.details.expensesTotal', fallback: 'إجمالي الخدمات الإنتاجية' }
  ],
  projectCrew: [
    // Use reservation-style crew columns (position/unit/price), plus quantity + days, and subtotal toggle
    ...QUOTE_CREW_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'quantity', labelKey: 'reservations.details.table.headers.quantity', fallback: 'الكمية' },
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'crewSubtotal', labelKey: 'reservations.details.labels.crewTotal', fallback: 'إجمالي الفريق' }
  ],
  projectEquipment: [
    // Use reservation-style items columns (code/desc/unit/qty/price), plus days, and subtotal toggle
    ...QUOTE_ITEMS_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'equipmentSubtotal', labelKey: 'reservations.details.labels.equipmentTotal', fallback: 'إجمالي المعدات' }
  ],
  projectNotes: []
};

const QUOTE_CONFIG_CACHE = new Map();

function getQuoteConfig(context = 'reservation') {
  if (QUOTE_CONFIG_CACHE.has(context)) {
    return QUOTE_CONFIG_CACHE.get(context);
  }
  const sectionDefs = (context === 'project')
    ? PROJECT_QUOTE_SECTION_DEFS
    : (context === 'reservationChecklist')
      ? [
          // Checklist context: include basic info + either items or crew
          { id: 'customerInfo', labelKey: 'reservations.quote.sections.customer', fallback: 'بيانات العميل', defaultSelected: true },
          { id: 'reservationInfo', labelKey: 'reservations.quote.sections.reservation', fallback: 'تفاصيل الحجز', defaultSelected: true },
          { id: 'projectInfo', labelKey: 'reservations.quote.sections.project', fallback: 'بيانات المشروع', defaultSelected: true },
          { id: 'notes', labelKey: 'reservations.quote.sections.notes', fallback: 'ملاحظات الحجز', defaultSelected: true },
          { id: 'items', labelKey: 'reservations.quote.sections.items', fallback: 'قائمة المعدات', defaultSelected: true },
          { id: 'crew', labelKey: 'reservations.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true }
        ]
      : QUOTE_SECTION_DEFS;
  const fieldDefs = (context === 'project')
    ? PROJECT_QUOTE_FIELD_DEFS
    : (context === 'reservationChecklist')
      ? {
          customerInfo: QUOTE_FIELD_DEFS.customerInfo,
          reservationInfo: QUOTE_FIELD_DEFS.reservationInfo,
          projectInfo: QUOTE_FIELD_DEFS.projectInfo,
          notes: [],
          items: QUOTE_FIELD_DEFS.items,
          crew: QUOTE_FIELD_DEFS.crew
        }
      : QUOTE_FIELD_DEFS;
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
const PDF_FONT_FACE = `
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 400; font-display: swap; src: url(${JSON.stringify(taj400Url)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 500; font-display: swap; src: url(${JSON.stringify(taj500Url)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 600; font-display: swap; src: url(${JSON.stringify(taj700Url)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 700; font-display: swap; src: url(${JSON.stringify(taj700Url)}) format('truetype'); }
`;

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

// Format numbers with thousands separators and 2 decimals, localized to our digits via normalizeNumbers
function formatMoney(value) {
  const num = Number(value);
  const safe = Number.isFinite(num) ? num : 0;
  try {
    const hasFraction = Math.abs(safe % 1) > 1e-9;
    return normalizeNumbers(safe.toLocaleString('en-US', {
      minimumFractionDigits: hasFraction ? 2 : 0,
      maximumFractionDigits: 2
    }));
  } catch (_) {
    if (Number.isInteger(safe)) return normalizeNumbers(String(safe));
    return normalizeNumbers(safe.toFixed(2));
  }
}

// Live preview updates when reservation data changes while the modal is open
let quoteLiveListenersAttached = false;
let reservationsChangedHandlerRef = null;

function attachQuoteLiveListeners() {
  if (quoteLiveListenersAttached) return;
  reservationsChangedHandlerRef = async function onReservationsChanged() {
    try {
      if (!activeQuoteState || !quoteModalRefs?.modal?.classList.contains('show')) return;
      const context = activeQuoteState.context || 'reservation';
      if (context !== 'reservation') return;
      const current = activeQuoteState.reservation;
      if (!current) return;
      const candidates = [
        current.id,
        current.reservationId,
        current.reservation_id,
        current.reservationCode,
        current.reservation_code
      ].map((v) => (v == null ? '' : String(v))).filter((v) => v.length > 0);
      if (!candidates.length) return;
      const list = getReservationsState();
      const updated = (Array.isArray(list) ? list : []).find((entry) => {
        const ids = [
          entry?.id,
          entry?.reservationId,
          entry?.reservation_id,
          entry?.reservationCode,
          entry?.reservation_code
        ].map((v) => (v == null ? '' : String(v))).filter((v) => v.length > 0);
        return ids.some((id) => candidates.includes(id));
      });
      if (!updated) return;

      // Recompute crew assignments and totals
      const crewAssignments = collectReservationCrewAssignments(updated);
      const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(updated, crewAssignments, activeQuoteState.project);
      activeQuoteState.reservation = updated;
      activeQuoteState.crewAssignments = crewAssignments;
      activeQuoteState.totals = totals;
      activeQuoteState.totalsDisplay = totalsDisplay;
      activeQuoteState.rentalDays = rentalDays;
      updateQuoteMeta();
      renderQuotePreview();
    } catch (err) {
      // non-fatal
      console.warn('[reservationPdf] live update failed', err);
    }
  };
  document.addEventListener('reservations:changed', reservationsChangedHandlerRef);
  quoteLiveListenersAttached = true;
}

function detachQuoteLiveListeners() {
  if (!quoteLiveListenersAttached) return;
  try { document.removeEventListener('reservations:changed', reservationsChangedHandlerRef); } catch (_) {}
  reservationsChangedHandlerRef = null;
  quoteLiveListenersAttached = false;
}
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
const BLOCK_DRAG_STORAGE_KEY = 'quoteBlockOffsets';
const BLOCK_DRAG_LIMIT_PX = 1800;
const INFO_ALIGN_STORAGE_KEY = 'quoteInfoAlignments';
const INFO_ALIGN_TARGETS = [
  'customer',
  'reservation',
  'project',
  'projectCustomer',
  'projectDetails',
];
const INFO_ALIGN_DEFAULTS = {
  customer: 'left',
  reservation: 'left',
  project: 'left',
  projectCustomer: 'right',
  projectDetails: 'right',
};
const INFO_ALIGN_CONTEXT_DEFAULTS = {
  project: {
    customer: 'right',
    reservation: 'left',
    project: 'left',
    projectCustomer: 'right',
    projectDetails: 'right',
  },
  reservationChecklist: {
    customer: 'left',
    reservation: 'left',
    project: 'left',
    projectCustomer: 'right',
    projectDetails: 'right',
  },
};
let blockDragMode = false;
let blockDragDirty = false;
let initializedInfoAlignments = false;
const DEFAULT_BLOCK_OFFSETS = {
  project: {
    'project-title': { x: -182.78680419921875, y: -5.0181427001953125 },
    'project-content': { x: -140.1977996826172, y: -4.7384796142578125 },
  },
};

const QUOTE_LAYOUT_DATA_ATTRS = {
  blockOffsets: 'data-block-offsets',
  infoAlignments: 'data-info-alignments',
  context: 'data-quote-source-context',
};

function encodeLayoutDataset(value) {
  try {
    return encodeURIComponent(JSON.stringify(value));
  } catch (_) {
    return '';
  }
}

function parseLayoutDatasetAttr(node, attr) {
  if (!node) return null;
  const raw = node.getAttribute(attr);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch (_) {
    return null;
  }
}

function buildRootLayoutAttributes(layoutState = {}) {
  const attrs = [];
  const contextName = layoutState.context || getBlockDragContext(layoutState);
  if (contextName) {
    attrs.push(`${QUOTE_LAYOUT_DATA_ATTRS.context}="${escapeHtml(String(contextName))}"`);
  }
  if (layoutState.blockOffsets && Object.keys(layoutState.blockOffsets).length) {
    const encodedOffsets = encodeLayoutDataset(layoutState.blockOffsets);
    if (encodedOffsets) {
      attrs.push(`${QUOTE_LAYOUT_DATA_ATTRS.blockOffsets}="${encodedOffsets}"`);
    }
  }
  if (layoutState.infoAlignments && Object.keys(layoutState.infoAlignments).length) {
    const encodedAlign = encodeLayoutDataset(layoutState.infoAlignments);
    if (encodedAlign) {
      attrs.push(`${QUOTE_LAYOUT_DATA_ATTRS.infoAlignments}="${encodedAlign}"`);
    }
  }
  return attrs.length ? ` ${attrs.join(' ')}` : '';
}

let renderLayoutStateOverride = null;

function resolveActiveLayoutState(preferred) {
  if (preferred && typeof preferred === 'object') return preferred;
  if (renderLayoutStateOverride) return renderLayoutStateOverride;
  if (activeQuoteState) return activeQuoteState;
  return null;
}

function getBlockDragContext(state = null) {
  const source = resolveActiveLayoutState(state);
  return source?.context || 'reservation';
}

function loadStoredBlockOffsets(contextName = 'reservation') {
  try {
    const raw = JSON.parse(localStorage.getItem(BLOCK_DRAG_STORAGE_KEY) || '{}');
    const entry = raw?.[contextName];
    if (entry && typeof entry === 'object') {
      return JSON.parse(JSON.stringify(entry));
    }
  } catch (_) {
    /* ignore */
  }
  return {};
}

function persistStoredBlockOffsets(contextName, offsets = {}) {
  try {
    const raw = JSON.parse(localStorage.getItem(BLOCK_DRAG_STORAGE_KEY) || '{}');
    if (offsets && Object.keys(offsets).length > 0) {
      raw[contextName] = offsets;
    } else {
      delete raw[contextName];
    }
    localStorage.setItem(BLOCK_DRAG_STORAGE_KEY, JSON.stringify(raw));
  } catch (_) {
    /* ignore */
  }
}

function initializeQuoteBlockOffsets(state) {
  if (!state) return;
  const contextName = getBlockDragContext(state);
  const stored = loadStoredBlockOffsets(contextName);
  state.blockOffsets = {
    ...(DEFAULT_BLOCK_OFFSETS[contextName] || {}),
    ...stored,
  };
  blockDragDirty = false;
  blockDragMode = false;
  updateBlockDragButtons();
}

function applyQuoteBlockOffsets(root, offsets = {}) {
  if (!root) return;
  const blocks = root.querySelectorAll('[data-drag-key]');
  blocks.forEach((block) => {
    const key = block.dataset.dragKey;
    const value = offsets?.[key];
    const x = Number(value?.x) || 0;
    const y = Number(value?.y) || 0;
    if (x || y) {
      block.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      block.style.transform = '';
    }
    block.dataset.dragX = String(x);
    block.dataset.dragY = String(y);
  });
}

function syncBlockDragModeToPreview(doc) {
  try {
    const root = doc?.getElementById('quotation-pdf-root');
    if (!root) return;
    root.dataset.blockDragMode = blockDragMode ? 'on' : 'off';
  } catch (_) {}
}

function updateBlockDragButtons() {
  const toggleBtn = quoteModalRefs?.blockDragToggle;
  if (toggleBtn) {
    const label = blockDragMode
      ? t('reservations.quote.drag.disable', '🔒 إنهاء وضع التحريك')
      : t('reservations.quote.drag.enable', '🎯 وضع تحريك البلوكات');
    toggleBtn.setAttribute('aria-label', label);
    toggleBtn.setAttribute('title', label);
    toggleBtn.classList.toggle('is-active', blockDragMode);
  }
  const saveBtn = quoteModalRefs?.blockDragSave;
  if (saveBtn) {
    saveBtn.disabled = !blockDragDirty;
  }
}

function setBlockDragMode(enabled) {
  blockDragMode = Boolean(enabled);
  updateBlockDragButtons();
  try {
    syncBlockDragModeToPreview(quoteModalRefs?.previewFrame?.contentDocument);
  } catch (_) {}
}

function markBlockOffsetsDirty(value = true) {
  blockDragDirty = Boolean(value);
  updateBlockDragButtons();
}

function persistCurrentBlockOffsets() {
  if (!activeQuoteState) return;
  const contextName = getBlockDragContext(activeQuoteState);
  const offsets = activeQuoteState.blockOffsets || {};
  persistStoredBlockOffsets(contextName, offsets);
  markBlockOffsetsDirty(false);
  showToast(t('reservations.quote.drag.saved', '✅ تم حفظ مواضع البلوكات.'));
}

function resetStoredBlockOffsets() {
  if (!activeQuoteState) return;
  const contextName = getBlockDragContext(activeQuoteState);
  activeQuoteState.blockOffsets = { ...(DEFAULT_BLOCK_OFFSETS[contextName] || {}) };
  persistStoredBlockOffsets(contextName, activeQuoteState.blockOffsets);
  markBlockOffsetsDirty(false);
  renderQuotePreview();
  showToast(t('reservations.quote.drag.reset', '↺ تمت إعادة مواضع البلوكات للوضع الافتراضي.'));
}

function clampDragOffset(value) {
  return Math.min(Math.max(value, -BLOCK_DRAG_LIMIT_PX), BLOCK_DRAG_LIMIT_PX);
}

function loadInfoAlignmentPrefs(contextName = 'reservation') {
  try {
    const raw = JSON.parse(localStorage.getItem(INFO_ALIGN_STORAGE_KEY) || '{}');
    const entry = raw?.[contextName];
    if (entry && typeof entry === 'object') {
      return { ...entry };
    }
  } catch (_) {
    /* ignore */
  }
  return null;
}

function persistInfoAlignmentPrefs(contextName, alignments = {}) {
  try {
    const raw = JSON.parse(localStorage.getItem(INFO_ALIGN_STORAGE_KEY) || '{}');
    raw[contextName] = alignments;
    localStorage.setItem(INFO_ALIGN_STORAGE_KEY, JSON.stringify(raw));
  } catch (_) {
    /* ignore */
  }
}

function initializeInfoAlignments(state) {
  if (!state || initializedInfoAlignments) return;
  const contextName = getBlockDragContext(state);
  const stored = loadInfoAlignmentPrefs(contextName);
  state.infoAlignments = {
    ...INFO_ALIGN_DEFAULTS,
    ...(INFO_ALIGN_CONTEXT_DEFAULTS[contextName] || {}),
    ...(stored || {}),
  };
  initializedInfoAlignments = true;
}

function getInfoAlignment(state, key) {
  const source = resolveActiveLayoutState(state);
  const alignments = source?.infoAlignments;
  if (alignments && Object.prototype.hasOwnProperty.call(alignments, key)) {
    return alignments[key];
  }
  const contextName = getBlockDragContext(source);
  if (INFO_ALIGN_CONTEXT_DEFAULTS[contextName]?.[key]) {
    return INFO_ALIGN_CONTEXT_DEFAULTS[contextName][key];
  }
  return INFO_ALIGN_DEFAULTS[key] || 'right';
}

function buildInfoPlainClass(state, key) {
  const align = getInfoAlignment(state, key);
  return `info-plain info-plain--align-${align}`;
}

function applyInfoAlignment(target, alignment) {
  if (!activeQuoteState) return;
  const normalizedTarget = INFO_ALIGN_TARGETS.includes(target) ? target : 'customer';
  const normalizedAlignment = ['left', 'center', 'right'].includes(alignment) ? alignment : 'right';
  if (!activeQuoteState.infoAlignments) {
    activeQuoteState.infoAlignments = { ...INFO_ALIGN_DEFAULTS };
  }
  activeQuoteState.infoAlignments[normalizedTarget] = normalizedAlignment;
  const contextName = getBlockDragContext(activeQuoteState);
  persistInfoAlignmentPrefs(contextName, activeQuoteState.infoAlignments);
  renderQuotePreview();
  updateInfoAlignmentControls();
}

function updateInfoAlignmentControls() {
  if (!quoteModalRefs?.alignTarget) return;
  const target = quoteModalRefs.alignTarget.value || 'customer';
  const current = getInfoAlignment(activeQuoteState, target);
  (quoteModalRefs.alignButtons || []).forEach((button) => {
    const value = button.dataset.alignValue;
    if (!value) return;
    button.classList.toggle('is-active', value === current);
  });
}

async function exportCurrentLayoutSettings() {
  try {
    if (!activeQuoteState) return;
    const context = getBlockDragContext(activeQuoteState);
    const offsetsRaw = JSON.parse(localStorage.getItem(BLOCK_DRAG_STORAGE_KEY) || '{}');
    const alignRaw = JSON.parse(localStorage.getItem(INFO_ALIGN_STORAGE_KEY) || '{}');
    const payload = {
      context,
      blockOffsets: activeQuoteState.blockOffsets || offsetsRaw[context] || {},
      infoAlignments: activeQuoteState.infoAlignments || alignRaw[context] || {},
    };
    const serialized = JSON.stringify(payload, null, 2);
    let copied = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(serialized);
        copied = true;
      } catch (_) {
        copied = false;
      }
    }
    if (!copied) {
      window.prompt(t('reservations.quote.align.copyPrompt', 'انسخ الإعدادات التالية'), serialized);
    } else {
      showToast(t('reservations.quote.align.copied', '✅ تم نسخ الإعدادات إلى الحافظة'));
    }
  } catch (error) {
    console.error('[quote align export] failed', error);
    showToast(t('reservations.quote.align.copyFailed', '⚠️ تعذر نسخ الإعدادات، الرجاء المحاولة لاحقاً'), 'error');
  }
}

function setupPreviewBlockDrag(doc) {
  try {
    const root = doc?.getElementById('quotation-pdf-root');
    if (!root) return;
    const blocks = Array.from(root.querySelectorAll('[data-drag-key]'));
    blocks.forEach((block) => {
      if (block.dataset.blockDragHandleAttached === 'true') return;
      block.style.position = block.style.position || 'relative';
      block.style.touchAction = 'none';
      const handle = doc.createElement('button');
      handle.type = 'button';
      handle.className = 'quote-block-drag-handle';
      handle.setAttribute('data-block-handle', block.dataset.dragKey || '');
      handle.setAttribute('aria-label', t('reservations.quote.drag.handle', 'اسحب لتحريك هذا القسم'));
      handle.innerHTML = '<span aria-hidden="true">⠿</span>';
      const startDrag = (event) => {
        if (root.dataset.blockDragMode !== 'on') return;
        beginBlockDrag(event, block);
      };
      handle.addEventListener('pointerdown', startDrag);
      block.prepend(handle);
      block.dataset.blockDragHandleAttached = 'true';
    });
    syncBlockDragModeToPreview(doc);
  } catch (_) {
    /* ignore drag init errors */
  }
}

function beginBlockDrag(event, block) {
  if (!block || !activeQuoteState) return;
  event.preventDefault();
  event.stopPropagation();
  const doc = block.ownerDocument || document;
  const pointerId = event.pointerId;
  block.setPointerCapture?.(pointerId);
  const startX = event.clientX;
  const startY = event.clientY;
  const baseX = Number(block.dataset.dragX || 0);
  const baseY = Number(block.dataset.dragY || 0);
  let currentX = baseX;
  let currentY = baseY;
  const key = block.dataset.dragKey;
  const onPointerMove = (moveEvent) => {
    moveEvent.preventDefault();
    const deltaX = (moveEvent.clientX - startX);
    const deltaY = (moveEvent.clientY - startY);
    currentX = clampDragOffset(baseX + deltaX);
    currentY = clampDragOffset(baseY + deltaY);
    block.style.transform = `translate(${currentX}px, ${currentY}px)`;
    block.dataset.dragTempX = String(currentX);
    block.dataset.dragTempY = String(currentY);
  };
  const onPointerUp = () => {
    doc.removeEventListener('pointermove', onPointerMove);
    doc.removeEventListener('pointerup', onPointerUp);
    block.releasePointerCapture?.(pointerId);
    const finalX = Number(block.dataset.dragTempX ?? baseX);
    const finalY = Number(block.dataset.dragTempY ?? baseY);
    block.dataset.dragX = String(finalX);
    block.dataset.dragY = String(finalY);
    block.dataset.dragTempX = '';
    block.dataset.dragTempY = '';
    if (!activeQuoteState.blockOffsets) {
      activeQuoteState.blockOffsets = {};
    }
    if (Math.abs(finalX) <= 0.5 && Math.abs(finalY) <= 0.5) {
      delete activeQuoteState.blockOffsets[key];
    } else {
      activeQuoteState.blockOffsets[key] = { x: finalX, y: finalY };
    }
    markBlockOffsetsDirty(true);
  };
  doc.addEventListener('pointermove', onPointerMove);
  doc.addEventListener('pointerup', onPointerUp);
}

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

// Normalize display names to improve matching (Arabic/English, diacritics, whitespace)
function normalizePackageNameForMatch(value) {
  try {
    const str = String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      // Remove Arabic diacritics and general marks
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim();
    return str;
  } catch (_) {
    return String(value || '').trim().toLowerCase();
  }
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
  try {
    const active = modalEl.ownerDocument?.activeElement;
    if (active && modalEl.contains(active)) {
      try { active.blur(); } catch (_) {}
      try { modalEl.ownerDocument?.body?.focus({ preventScroll: true }); } catch (_) {}
    }
  } catch (_) {}
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
  try { detachQuoteLiveListeners(); } catch (_) {}
}

function showQuoteModalElement(modalEl) {
  if (!modalEl) return;
  if (hasBootstrapModalSupport()) {
    const instance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    try {
      const onHidden = () => {
        try {
          const active = document.activeElement;
          if (active && modalEl.contains(active)) {
            try { active.blur(); } catch (_) {}
            try { document.body?.focus({ preventScroll: true }); } catch (_) {}
          }
        } catch (_) {}
        try { detachQuoteLiveListeners(); } catch (_) {}
        try { modalEl.removeEventListener('hidden.bs.modal', onHidden); } catch (_) {}
      };
      modalEl.addEventListener('hidden.bs.modal', onHidden, { once: true });
      // In some cases focus is still inside during the hide transition; blur earlier as well
      modalEl.addEventListener('hide.bs.modal', () => {
        try {
          const active = document.activeElement;
          if (active && modalEl.contains(active)) {
            try { active.blur(); } catch (_) {}
          }
        } catch (_) {}
      });
    } catch (_) {}
    instance.show();
    return;
  }
  showModalFallback(modalEl);
}

function notifyQuoteAssetFailure() {
  if (quoteAssetWarningShown) return;
  quoteAssetWarningShown = true;
  const guideLabel = t('reservations.quote.toast.viewGuide', '📘 عرض دليل الحل السريع');
  const retryLabel = t('reservations.quote.toast.retry', 'إعادة المحاولة');
  const message = t('reservations.quote.toast.assetsFailed', '⚠️ تعذر تحميل بعض الصور ضمن عرض سعر.');

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

function getSequenceNameForContext(context = 'reservation') {
  return context === 'project' ? 'quote_project' : 'quote_reservation';
}

async function reserveNextQuoteSequence(context = 'reservation') {
  const name = getSequenceNameForContext(context);
  try {
    // Reserve atomically on the server to ensure global uniqueness across users
    const payload = await apiRequest(`/sequence/?name=${encodeURIComponent(name)}`, { method: 'POST' });
    const value = Number(payload?.value);
    const sequence = Number.isFinite(value) && value > 0 ? value : 1;
    return { sequence, quoteNumber: formatQuoteNumber(sequence, context) };
  } catch (error) {
    // Fallback to local sequence if server is unavailable
    console.warn('⚠️ [reservations/pdf] sequence reservation failed, falling back to local', error);
    const stored = window.localStorage?.getItem?.(QUOTE_SEQUENCE_STORAGE_KEY);
    const last = Number.isFinite(parseInt(stored ?? '', 10)) ? parseInt(stored ?? '', 10) : 0;
    const sequence = last + 1;
    return { sequence, quoteNumber: formatQuoteNumber(sequence, context) };
  }
}

async function peekServerQuoteSequence(context = 'reservation') {
  const name = getSequenceNameForContext(context);
  try {
    const payload = await apiRequest(`/sequence/?name=${encodeURIComponent(name)}`, { method: 'GET' });
    const current = Number(payload?.value);
    const next = Number.isFinite(current) && current >= 0 ? (current + 1) : 1;
    return { sequence: next, quoteNumber: formatQuoteNumber(next, context) };
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] sequence peek failed, falling back to 1', error);
    return { sequence: 1, quoteNumber: formatQuoteNumber(1, context) };
  }
}

function getTogglePrefsStorageKey(context = 'reservation') {
  return QUOTE_TOGGLE_PREFS_STORAGE_KEYS[context] || QUOTE_TOGGLE_PREFS_STORAGE_KEYS.reservation;
}

function clearLegacyQuotePreferences() {
  try {
    // Keep user toggle preferences; only clear old local sequence persistence
    window.localStorage?.removeItem?.(QUOTE_SEQUENCE_STORAGE_KEY);
  } catch (_) { /* ignore */ }
}

function readQuoteTogglePreferences(context = 'reservation') {
  try {
    clearLegacyQuotePreferences();
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

function collectReservationCrewAssignments(reservation) {
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

  const rawAssignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
    ? reservation.crewAssignments
    : (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length
        ? reservation.techniciansDetails
        : (reservation.technicians || []).map((id) => ({ technicianId: id })));

  return rawAssignments.map((assignment, index) => {
    const technicianRecord = assignment?.technicianId != null
      ? techniciansMap.get(String(assignment.technicianId))
      : null;

    let positionLabel = assignment.positionLabel
      ?? assignment.position_name
      ?? assignment.position_label
      ?? assignment.role
      ?? assignment.position
      ?? technicianRecord?.role
      ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
    if (!positionLabel || positionLabel.trim() === '') {
      positionLabel = assignment.positionLabelAr
        ?? assignment.position_label_ar
        ?? assignment.positionLabelEn
        ?? assignment.position_label_en
        ?? assignment.position_name_ar
        ?? assignment.position_name_en
        ?? technicianRecord?.role
        ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
    }

    // Try to resolve a nicer label using the positions cache (id or key/name lookup)
    try {
      const positions = typeof getTechnicianPositionsCache === 'function' ? (getTechnicianPositionsCache() || []) : [];
      let resolved = null;
      if (assignment?.positionId != null) {
        resolved = positions.find((p) => String(p?.id) === String(assignment.positionId)) || null;
      }
      if (!resolved) {
        const key = assignment.positionKey
          ?? assignment.position_key
          ?? assignment.positionName
          ?? assignment.position_name
          ?? assignment.position
          ?? '';
        if (key) {
          resolved = typeof findPositionByName === 'function' ? (findPositionByName(key) || null) : null;
          if (!resolved && positions.length) {
            const lower = String(key).trim().toLowerCase();
            resolved = positions.find((p) => [p.name, p.labelAr, p.labelEn]
              .filter(Boolean)
              .map((v) => String(v).toLowerCase())
              .includes(lower)) || null;
          }
        }
      }
      if (resolved) {
        const better = resolved.labelAr || resolved.labelEn || resolved.name || '';
        if (better && better.trim()) {
          positionLabel = better;
        }
      }
    } catch (_err) {
      // non-fatal; keep existing fallback
    }
    const positionCost = sanitizePriceValue(parsePriceValue(
      assignment.positionCost
        ?? assignment.position_cost
        ?? assignment.cost
        ?? assignment.daily_wage
        ?? assignment.dailyWage
        ?? technicianRecord?.dailyWage
        ?? technicianRecord?.wage
        ?? 0
    ));
    const positionClientPrice = sanitizePriceValue(parsePriceValue(
      assignment.positionClientPrice
        ?? assignment.position_client_price
        ?? assignment.client_price
        ?? assignment.clientPrice
        ?? assignment.daily_total
        ?? assignment.dailyTotal
        ?? assignment.total
        ?? technicianRecord?.dailyTotal
        ?? technicianRecord?.total
        ?? technicianRecord?.total_wage
        ?? 0
    ));

    return {
      assignmentId: assignment.assignmentId ?? assignment.assignment_id ?? `crew-${index}`,
      positionId: assignment.positionId ?? assignment.position_id ?? null,
      positionLabel,
      positionLabelAlt: assignment.positionLabelAlt ?? assignment.position_label_alt ?? '',
      positionCost,
      positionClientPrice,
      technicianId: assignment.technicianId != null
        ? String(assignment.technicianId)
        : (technicianRecord?.id != null ? String(technicianRecord.id) : null),
      technicianName: assignment.technicianName
        ?? assignment.technician_name
        ?? technicianRecord?.name
        ?? null,
      technicianRole: assignment.technicianRole
        ?? technicianRecord?.role
        ?? null,
    };
  });
}

function collectReservationFinancials(reservation, crewAssignments, project) {
  const { projectLinked } = resolveReservationProjectState(reservation, project);
  const rentalDays = calculateReservationDays(reservation.start, reservation.end);
  const discountRaw = reservation.discount ?? reservation.discountValue ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountTypeRaw = reservation.discountType ?? reservation.discount_type ?? 'percent';
  const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';
  const applyTaxFlag = projectLinked ? false : Boolean(reservation.applyTax ?? reservation.apply_tax ?? reservation.taxApplied);

  const rawSharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share
    ?? null;
  const normalizedSharePercent = rawSharePercent != null
    ? parsePriceValue(rawSharePercent)
    : Number.NaN;
  const shareEnabledFlag = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied
    ?? reservation.company_share_applied;
  const companySharePercentInput = (shareEnabledFlag === true && Number.isFinite(normalizedSharePercent) && normalizedSharePercent > 0)
    ? normalizedSharePercent
    : null;

  const technicianIds = Array.isArray(crewAssignments)
    ? crewAssignments.map((assignment) => assignment?.technicianId).filter(Boolean)
    : [];

  const breakdown = calculateDraftFinancialBreakdown({
    items: Array.isArray(reservation.items) ? reservation.items : [],
    technicianIds,
    crewAssignments: Array.isArray(crewAssignments) ? crewAssignments : [],
    discount: discountValue,
    discountType,
    applyTax: applyTaxFlag,
    start: reservation.start,
    end: reservation.end,
    companySharePercent: companySharePercentInput,
    // Use full reservation object for grouping (packages, per-day pricing)
    groupingSource: reservation,
  });

  const storedCostCandidate = parsePriceValue(reservation.cost ?? reservation.total ?? reservation.finalTotal);
  const hasStoredCost = Number.isFinite(storedCostCandidate);
  const finalTotalOverride = projectLinked
    ? breakdown.finalTotal
    : (hasStoredCost ? sanitizePriceValue(storedCostCandidate) : breakdown.finalTotal);

  const totals = {
    equipmentTotal: breakdown.equipmentTotal,
    equipmentCostTotal: breakdown.equipmentCostTotal,
    crewTotal: breakdown.crewTotal,
    crewCostTotal: breakdown.crewCostTotal,
    discountAmount: breakdown.discountAmount,
    subtotalAfterDiscount: breakdown.subtotalAfterDiscount,
    taxableAmount: breakdown.taxableAmount,
    taxAmount: breakdown.taxAmount,
    finalTotal: finalTotalOverride,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    netProfit: breakdown.netProfit,
  };

  const totalsDisplay = {
    equipmentTotal: formatMoney(breakdown.equipmentTotal),
    equipmentCostTotal: formatMoney(breakdown.equipmentCostTotal),
    crewTotal: formatMoney(breakdown.crewTotal),
    discountAmount: formatMoney(breakdown.discountAmount),
    subtotalAfterDiscount: formatMoney(breakdown.subtotalAfterDiscount),
    taxableAmount: formatMoney(breakdown.taxableAmount),
    taxAmount: formatMoney(breakdown.taxAmount),
    finalTotal: formatMoney(finalTotalOverride),
    companySharePercent: normalizeNumbers((Number.isFinite(breakdown.companySharePercent) ? breakdown.companySharePercent : 0).toFixed(2)),
    companyShareAmount: formatMoney(breakdown.companyShareAmount),
    netProfit: normalizeNumbers(breakdown.netProfit.toFixed(2)),
  };

  return {
    totals,
    totalsDisplay,
    rentalDays: breakdown.rentalDays,
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
  // Prefer per-item sale prices when available so subtotal matches row values.
  if (Array.isArray(project?.expenses)) {
    const hasAnySale = project.expenses.some((exp) => Number.isFinite(Number(exp?.salePrice ?? exp?.sale_price)));
    if (hasAnySale) {
      return project.expenses.reduce((sum, exp) => sum + (Number(exp?.salePrice ?? exp?.sale_price) || 0), 0);
    }
  }

  // Next prefer explicit services client price total if provided by backend/UI
  const servicesClient = Number(project?.servicesClientPrice ?? project?.services_client_price);
  if (Number.isFinite(servicesClient) && servicesClient >= 0) {
    return servicesClient;
  }

  // Fallbacks: stored expensesTotal or sum of raw amounts (costs)
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
  const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
  const techniciansOrAssignments = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    techniciansOrAssignments,
    { start: reservation.start, end: reservation.end, companySharePercent: 0 }
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
  const number = Number(value);
  return `${formatMoney(number)} ${currencyLabel}`;
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
  const snapshot = loadData() || {};
  const customers = Array.isArray(snapshot.customers) ? snapshot.customers : [];
  const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
  const storedTechnicians = Array.isArray(snapshot.technicians) ? snapshot.technicians : [];
  // Prefer live state reservations; fallback to snapshot
  let reservations = [];
  try {
    const stateReservations = getReservationsState?.() || [];
    reservations = Array.isArray(stateReservations) && stateReservations.length ? stateReservations : (snapshot.reservations || []);
  } catch (_) {
    reservations = snapshot.reservations || [];
  }

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
    ? reservations.filter((reservation) => {
        const pid = reservation?.projectId ?? reservation?.project_id ?? null;
        return pid != null && String(pid) === projectIdValue;
      })
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

  // Aggregate equipment + crew totals across reservations using the same
  // financial breakdown used in details, then combine with project
  // production services (expenses). Discount and company share are applied
  // at the project level as requested.
  let reservationsEquipmentSum = 0;
  let reservationsCrewSum = 0;
  try {
    reservationsForProject.forEach((reservation) => {
      const bd = calculateDraftFinancialBreakdown({
        items: Array.isArray(reservation.items) ? reservation.items : [],
        technicianIds: Array.isArray(reservation.technicians) ? reservation.technicians : [],
        crewAssignments: Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [],
        discount: Number(reservation.discount ?? 0) || 0,
        discountType: reservation.discountType || 'percent',
        applyTax: false, // tax handled at project level
        start: reservation.start,
        end: reservation.end,
        groupingSource: reservation,
        companySharePercent: 0, // company share handled at project level
      });
      reservationsEquipmentSum += Number(bd.equipmentTotal || 0);
      reservationsCrewSum += Number(bd.crewTotal || 0);
    });
  } catch (_) { /* fallback handled below */ }

  const expensesTotalForProject = getProjectExpensesTotal(resolvedProject);
  const baseSumAll = Number(reservationsEquipmentSum + reservationsCrewSum + expensesTotalForProject);

  // Build equipment items using the same reservation grouping logic (packages, codes, etc.)
  const equipmentItems = [];
  try {
    reservationsForProject.forEach((reservation) => {
      const { groups } = buildReservationDisplayGroups(reservation);
      groups.forEach((group) => {
        const count = Number(group?.count ?? group?.quantity ?? 1) || 1;
        const rawUnitPrice = Number(group?.unitPrice);
        let unitPrice = Number.isFinite(rawUnitPrice) ? rawUnitPrice : 0;
        if (!unitPrice || unitPrice <= 0) {
          const totalCandidate = Number(group?.totalPrice);
          if (Number.isFinite(totalCandidate) && count > 0) {
            unitPrice = Number((totalCandidate / count).toFixed(2));
          }
        }
        if (!Number.isFinite(unitPrice)) unitPrice = 0;

        const isPackage = group?.type === 'package' || (Array.isArray(group?.items) && group.items.some((it) => it?.type === 'package'));
        const fallbackBarcode = Array.isArray(group?.barcodes) && group.barcodes.length
          ? group.barcodes[0]
          : (Array.isArray(group?.items) && group.items.length ? group.items[0]?.barcode : null);

        let packageCode = group?.packageDisplayCode
          ?? group?.package_code
          ?? group?.code
          ?? group?.packageCode
          ?? (Array.isArray(group?.items) && group.items.length
              ? (group.items[0]?.package_code
                ?? group.items[0]?.code
                ?? group.items[0]?.packageCode)
              : null);

        const isWeakCode = (value) => {
          const s = (value == null ? '' : String(value)).trim();
          if (!s) return true;
          if (/^pkg-/i.test(s)) return true;
          if (/^\d+$/.test(s) && s.length <= 4) return true;
          return false;
        };

        if (!packageCode || isWeakCode(packageCode)) {
          const pkgId = group?.packageId
            ?? group?.package_id
            ?? (Array.isArray(group?.items) && group.items.length ? (group.items[0]?.packageId ?? group.items[0]?.package_id) : null);
          if (pkgId) {
            try {
              const def = findPackageById(pkgId);
              if (def && def.package_code) packageCode = def.package_code;
            } catch (_) {}
          }
        }

        if (!packageCode || isWeakCode(packageCode)) {
          try {
            const targetName = normalizePackageNameForMatch(group?.description || '');
            if (targetName) {
              const list = getPackagesSnapshot();
              let match = list.find((p) => normalizePackageNameForMatch(p?.name || p?.title || p?.label || '') === targetName);
              if (!match) {
                match = list.find((p) => {
                  const n = normalizePackageNameForMatch(p?.name || p?.title || p?.label || '');
                  return n.includes(targetName) || targetName.includes(n);
                });
              }
              if (match && match.package_code) packageCode = match.package_code;
            }
          } catch (_) {}
        }

        const rawBarcode = isPackage ? (packageCode ?? fallbackBarcode ?? '') : (group?.barcode ?? fallbackBarcode ?? '');
        const barcode = rawBarcode != null ? String(rawBarcode) : '';

        const safeTotal = Number.isFinite(Number(group?.totalPrice))
          ? Number(group.totalPrice)
          : Number((unitPrice * count).toFixed(2));
        equipmentItems.push({
          ...group,
          isPackage,
          desc: group?.description,
          barcode,
          packageCodeResolved: packageCode || '',
          qty: count,
          // In the table, the "price" column represents unit price, not row total
          price: unitPrice,
          totalPrice: sanitizePriceValue(safeTotal),
          unitPriceValue: unitPrice,
        });
      });
    });
  } catch (_) {
    // Fallback silently
  }

  // Keep summarized equipment for optional sections
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
      if (Number.isFinite(computedCost)) existing.totalCost += computedCost;
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
    const assignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
      ? reservation.crewAssignments
      : (Array.isArray(reservation.technicians)
          ? reservation.technicians.map((id) => ({ technicianId: id }))
          : []);
    assignments.forEach((entry) => registerTechnician(entry));
  });

  const projectCrew = Array.from(crewMap.values());

  const expenses = Array.isArray(resolvedProject.expenses)
    ? resolvedProject.expenses.map((expense) => {
        // Use sale price for display (fallback to amount if sale price not present)
        const amount = Number(expense?.salePrice ?? expense?.sale_price ?? expense?.amount) || 0;
        return {
          label: expense?.label || expense?.name || '-',
          amount,
          displayAmount: formatCurrencyValue(amount, currencyLabel),
          note: expense?.note || expense?.description || ''
        };
      })
    : [];

  // Project-level discount/share/tax applied to (equipment + crew + services)
  const applyTaxFlag = resolvedProject?.applyTax === true || resolvedProject?.applyTax === 'true';
  const discountVal = Number.parseFloat(resolvedProject?.discount ?? resolvedProject?.discountValue ?? 0) || 0;
  const discountKind = (resolvedProject?.discountType === 'amount') ? 'amount' : 'percent';
  let discountAmountAll = discountKind === 'amount'
    ? discountVal
    : baseSumAll * (discountVal / 100);
  if (!Number.isFinite(discountAmountAll) || discountAmountAll < 0) discountAmountAll = 0;
  if (discountAmountAll > baseSumAll) discountAmountAll = baseSumAll;

  const subtotalAfterDiscountAll = Math.max(0, baseSumAll - discountAmountAll);

  const shareEnabled = resolvedProject?.companyShareEnabled === true
    || resolvedProject?.company_share_enabled === true
    || resolvedProject?.companyShareApplied === true
    || resolvedProject?.company_share_applied === true;
  const sharePercentRaw = Number.parseFloat(
    resolvedProject?.companySharePercent
      ?? resolvedProject?.company_share_percent
      ?? resolvedProject?.companyShare
      ?? resolvedProject?.company_share
      ?? 0
  ) || 0;
  const sharePercent = shareEnabled && sharePercentRaw > 0 ? sharePercentRaw : 0;
  const companyShareAmountAll = sharePercent > 0
    ? Number((subtotalAfterDiscountAll * (sharePercent / 100)).toFixed(2))
    : 0;
  const preTaxTotalAll = Number((subtotalAfterDiscountAll + companyShareAmountAll).toFixed(2));

  const combinedTaxAmount = applyTaxFlag
    ? Number((preTaxTotalAll * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((preTaxTotalAll + combinedTaxAmount).toFixed(2));

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
    // Keep legacy fields but repurpose according to requested presentation
    projectSubtotal: formatCurrencyValue(preTaxTotalAll, currencyLabel),
    expensesTotal: formatCurrencyValue(expensesTotalForProject, currencyLabel),
    reservationsTotal: formatCurrencyValue(preTaxTotalAll, currencyLabel), // used as "pre-tax total"
    discountAmount: formatCurrencyValue(discountAmountAll, currencyLabel),
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
    equipmentItems,
    crewAssignments: reservationsForProject.flatMap((reservation) => collectReservationCrewAssignments(reservation)),
    totals: {
      equipmentEstimate: reservationsEquipmentSum, // informative
      expensesTotal: expensesTotalForProject,
      baseSubtotal: baseSumAll,
      discountAmount: discountAmountAll,
      subtotalAfterDiscount: subtotalAfterDiscountAll,
      companyShareAmount: companyShareAmountAll,
      subtotal: preTaxTotalAll,
      applyTax: applyTaxFlag,
      taxAmount: combinedTaxAmount,
      totalWithTax: overallTotal
    },
    totalsDisplay,
    projectTotals: {
      combinedTaxAmount,
      overallTotal,
      reservationsTotal: preTaxTotalAll,
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
  terms = DEFAULT_TERMS,
  rootAttributes = ''
}) {
  // Project quotes never use checklist mode; keep explicit boolean to avoid NameError
  const isChecklist = false;
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

  const wrapSectionWithDragHandles = (key, titleHtml, bodyHtml) => {
    const titleKey = `${key}-title`;
    const bodyKey = `${key}-content`;
    return `
      <div class="quote-section__head" data-drag-key="${escapeHtml(titleKey)}">
        ${titleHtml}
      </div>
      <div class="quote-section__body" data-drag-key="${escapeHtml(bodyKey)}">
        ${bodyHtml}
      </div>
    `;
  };

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

const projectCustomerInfoClass = buildInfoPlainClass(activeQuoteState, 'projectCustomer');

  const customerSectionMarkup = includeSection('customerInfo')
    ? `<section class="quote-section quote-section--plain quote-section--customer">
        ${wrapSectionWithDragHandles(
          'customer',
          `<h3 class="quote-section__title">${escapeHtml(t('projects.quote.sections.customer', 'بيانات العميل'))}</h3>`,
          customerFieldItems.length ? `<div class="${projectCustomerInfoClass}">${customerFieldItems.join('')}</div>` : noFieldsMessage
        )}
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

const projectDetailsInfoClass = buildInfoPlainClass(activeQuoteState, 'projectDetails');

  const projectSectionMarkup = includeSection('projectInfo')
    ? `<section class="quote-section quote-section--plain quote-section--project">
        ${wrapSectionWithDragHandles(
          'project',
          `<h3 class="quote-section__title">${escapeHtml(t('projects.quote.sections.project', 'بيانات المشروع'))}</h3>`,
          projectFieldItems.length ? `<div class="${projectDetailsInfoClass}">${projectFieldItems.join('')}</div>` : noFieldsMessage
        )}
      </section>`
    : '';

  // Use reservation-style crew columns (positions + client price) for projects
  const projectCrewColumnsBase = QUOTE_CREW_COLUMN_DEFS.filter((column) => isFieldEnabled('projectCrew', column.id));
  const crewAssignments = Array.isArray(activeQuoteState?.crewAssignments) ? activeQuoteState.crewAssignments : [];
  const groupProjectCrew = true; // always group by position for projects
  const projectCrewKeyOf = (a) => {
    const baseKey = (a && a.positionId != null)
      ? `id:${String(a.positionId)}`
      : (() => {
          const raw = (a?.positionLabel || a?.position_name || a?.position || '').trim().toLowerCase();
          return raw ? `label:${raw}` : '';
        })();
    const price = Number.isFinite(Number(a?.positionClientPrice)) ? Number(a.positionClientPrice) : 0;
    const priceKey = price > 0 ? `|p:${price.toFixed(2)}` : '';
    return `${baseKey}${priceKey}`;
  };
  const projectCrewCounts = (() => {
    const map = new Map();
    crewAssignments.forEach((a) => {
      const key = projectCrewKeyOf(a);
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  })();
  const projectCrewColumns = (() => {
    const cols = [];
    projectCrewColumnsBase.forEach((col) => {
      if (col.id === 'position') {
        cols.push({
          ...col,
          render: (assignment) => {
            const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
            let labelEn = assignment?.positionLabelEn
              ?? assignment?.position_label_en
              ?? assignment?.position_name_en
              ?? assignment?.positionLabelAlt
              ?? assignment?.position_label_alt
              ?? assignment?.role;
            if (!labelEn && langNow === 'en') {
              try {
                const positions = (typeof getTechnicianPositionsCache === 'function') ? getTechnicianPositionsCache() : [];
                let resolved = null;
                if (assignment?.positionId != null) {
                  resolved = positions.find((p) => String(p.id) === String(assignment.positionId)) || null;
                }
                if (!resolved) {
                  const key = assignment?.positionKey
                    ?? assignment?.position_key
                    ?? assignment?.positionName
                    ?? assignment?.position_name
                    ?? assignment?.position
                    ?? '';
                  if (key) {
                    const lk = String(key).toLowerCase();
                    resolved = positions.find((p) => String(p.name).toLowerCase() === lk) || null;
                  }
                }
                if (resolved) {
                  labelEn = resolved.labelEn ?? resolved.label_en ?? resolved.name_en ?? labelEn;
                }
              } catch (_) { /* non-fatal */ }
            }
            const labelAr = assignment?.positionLabel
              ?? assignment?.position_name
              ?? assignment?.role
              ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
            const baseLabel = (langNow === 'en' && labelEn) ? labelEn : labelAr;
            if (groupProjectCrew) {
              return escapeHtml(normalizeNumbers(String(baseLabel)));
            }
            const key = projectCrewKeyOf(assignment);
            const count = key ? (projectCrewCounts.get(key) || 0) : 0;
            const suffix = count > 1 ? ` × ${normalizeNumbers(String(count))}` : '';
            return escapeHtml(normalizeNumbers(String(baseLabel)) + suffix);
          }
        });
        // Quantity column (toggleable)
        if (isFieldEnabled('projectCrew','quantity')) {
          cols.push({
            id: 'quantity',
            labelKey: 'reservations.details.table.headers.quantity',
            fallback: 'الكمية',
            render: (assignment) => escapeHtml(normalizeNumbers(String(Math.max(1, Number(assignment?.__count || 1)))))
          });
        }
      } else if (col.id === 'price') {
        if (groupProjectCrew) {
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const qty = Math.max(1, Number(assignment?.__count || 1));
              const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
              const total = unit * qty * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        } else {
          // Non-grouped price per assignment for all days
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
              const total = unit * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        }
      } else if (col.id === 'unitPrice') {
        // Per-day unit price
        cols.push({
          ...col,
          render: (assignment) => {
            const unit = Number.isFinite(Number(assignment?.positionClientPrice))
              ? Number(assignment.positionClientPrice)
              : 0;
            return escapeHtml(`${formatMoney(unit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    // Days column (toggleable)
    if (isFieldEnabled('projectCrew','days')) {
      const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder to: rowNumber, position, unitPrice, quantity, days, price, then others
    const map = new Map(cols.map((c) => [c.id, c]));
    const seen = new Set();
    const out = [];
    const pushIf = (id) => { const c = map.get(id); if (c && !seen.has(id)) { out.push(c); seen.add(id);} };
    pushIf('rowNumber');
    pushIf('position');
    pushIf('unitPrice');
    pushIf('quantity');
    pushIf('days');
    pushIf('price');
    cols.forEach((c) => { if (!seen.has(c.id)) { out.push(c); seen.add(c.id);} });
    return out;
  })();
  const projectCrewSource = groupProjectCrew
    ? (() => {
        const map = new Map();
        crewAssignments.forEach((a) => {
          const key = projectCrewKeyOf(a);
          if (!key) return;
          const existing = map.get(key);
          if (existing) {
            existing.__count += 1;
          } else {
            map.set(key, { ...a, __count: 1 });
          }
        });
        return Array.from(map.values());
      })()
    : crewAssignments;
  const projectCrewSubtotalDisplay = (() => {
    try {
      const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
      const sum = (projectCrewSource || []).reduce((acc, a) => {
        const unit = Number.isFinite(Number(a?.positionClientPrice)) ? Number(a.positionClientPrice) : 0;
        const qty = Math.max(1, Number(a?.__count || 1));
        return acc + (unit * qty * days);
      }, 0);
      return formatMoney(sum);
    } catch (_) { return '0.00'; }
  })();
  const crewSectionMarkup = includeSection('projectCrew')
    ? (projectCrewColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.crew', 'طاقم العمل'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${projectCrewColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectCrewSource.length
                ? projectCrewSource.map((assignment, index) => `<tr>${projectCrewColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(assignment, index)}</div></td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(projectCrewColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.crew.empty', 'لا يوجد طاقم فني مرتبط.'))}</td></tr>`}
              </tbody>
            </table>
            ${isFieldEnabled('projectCrew','crewSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${projectCrewSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.crew', 'طاقم العمل'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const financialInlineItems = [];
  // ترتيب جديد: الخصم → الإجمالي قبل الضريبة → الضريبة
  if (isFieldEnabled('financialSummary', 'discountAmount')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.discount', 'قيمة الخصم'), totalsDisplay.discountAmount || formatCurrencyValue(0, currencyLabel)));
  }
  const preTaxLabel = t('projects.details.summary.preTaxTotal', 'الإجمالي قبل الضريبة');
  if (isFieldEnabled('financialSummary', 'reservationsTotal')) {
    financialInlineItems.push(renderTotalsItem(preTaxLabel, totalsDisplay.reservationsTotal || formatCurrencyValue(0, currencyLabel)));
  }
  if (isFieldEnabled('financialSummary', 'taxAmount')) {
    financialInlineItems.push(renderTotalsItem(t('projects.details.summary.combinedTax', 'قيمة الضريبة'), totalsDisplay.taxAmount || formatCurrencyValue(0, currencyLabel)));
  }

  const financialFinalItems = [];
  if (isFieldEnabled('financialSummary', 'overallTotal')) {
    financialFinalItems.push(renderTotalsItem(t('projects.details.summary.overallTotal', 'الإجمالي الكلي'), totalsDisplay.overallTotal || formatCurrencyValue(0, currencyLabel), { variant: 'final' }));
  }
  // removed: paidAmount and remainingAmount from rendering per request

  const financialSectionMarkup = includeSection('financialSummary')
    ? (() => {
        if (!financialInlineItems.length && !financialFinalItems.length) {
          return `<section class="quote-section quote-section--financial">${noFieldsMessage}</section>`;
        }
        return `<section class="quote-section quote-section--financial">
          ${wrapSectionWithDragHandles(
            'projectFinancial',
            `<h3>${escapeHtml(t('projects.quote.sections.financial', 'الملخص المالي'))}</h3>`,
            `<div class="totals-block">
              ${financialInlineItems.length ? `<div class="totals-inline">${financialInlineItems.join('')}</div>` : ''}
              ${financialFinalItems.length ? `<div class="totals-final">${financialFinalItems.join('')}</div>` : ''}
            </div>`
          )}
        </section>`;
      })()
    : '';

  const expensesColumns = PROJECT_EXPENSES_COLUMN_DEFS.filter((column) => isFieldEnabled('projectExpenses', column.id));
  const expensesSectionMarkup = includeSection('projectExpenses')
    ? (expensesColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.expenses', 'الخدمات الإنتاجية'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${expensesColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectExpenses.length
                ? projectExpenses.map((expense, index) => `<tr>${expensesColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(expense, index)}</div></td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(expensesColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.expenses.empty', 'لا توجد متطلبات مسجلة.'))}</td></tr>`}
              </tbody>
            </table>
            ${isFieldEnabled('projectExpenses','expensesSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('projects.details.expensesTotal', 'إجمالي الخدمات الإنتاجية'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(totalsDisplay.expensesTotal || formatCurrencyValue(0, currencyLabel))}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.expenses', 'الخدمات الإنتاجية'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  // Use reservation-style items table for project equipment (code/desc/qty/price with package codes)
  const itemColumnsBaseProject = QUOTE_ITEMS_COLUMN_DEFS.filter((column) => isFieldEnabled('projectEquipment', column.id));
  const itemColumns = (() => {
    let cols = [];
    itemColumnsBaseProject.forEach((col) => {
      if (col.id === 'price') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            const qty = Number.isFinite(Number(item?.qty)) ? Math.max(1, Number(item.qty)) : 1;
            const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
            const total = unit * qty * days;
            return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else if (col.id === 'unitPrice') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            return escapeHtml(`${formatMoney(unit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    if (isFieldEnabled('projectEquipment','days')) {
      const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder tail: unitPrice -> quantity -> days -> price
    const map = new Map(cols.map((c) => [c.id, c]));
    const keep = cols.filter((c) => !['unitPrice','quantity','days','price'].includes(c.id));
    const tail = ['unitPrice','quantity','days','price'].map((id) => map.get(id)).filter(Boolean);
    cols = [...keep, ...tail];
    return cols;
  })();
  const equipmentItems = Array.isArray(activeQuoteState?.equipmentItems) ? activeQuoteState.equipmentItems : [];
  const equipmentSubtotalDisplay = (() => {
    try {
      const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
      const sum = (equipmentItems || []).reduce((acc, it) => {
        const unit = Number.isFinite(Number(it?.unitPriceValue)) ? Number(it.unitPriceValue) : 0;
        const qty = Number.isFinite(Number(it?.qty)) ? Math.max(1, Number(it.qty)) : 1;
        return acc + (unit * qty * days);
      }, 0);
      return formatMoney(sum);
    } catch (_) { return '0.00'; }
  })();
  const equipmentSectionMarkup = includeSection('projectEquipment')
    ? (itemColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.equipment', 'المعدات'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${itemColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${equipmentItems.length
                ? equipmentItems.map((item, index) => `<tr>${itemColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(item, index)}</div></td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(itemColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.equipment.empty', 'لا توجد معدات مرتبطة حالياً.'))}</td></tr>`}
              </tbody>
            </table>
            ${isFieldEnabled('projectEquipment','equipmentSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${equipmentSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
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
    // In RTL context with row-reverse, the first child appears on the far left.
    // Place Project first (left) and Customer second (right).
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

  let footerBlocks = [];
  if (!isChecklist) {
    footerBlocks = [
      ...(includeSection('payment') ? [withBlockAttributes(paymentSectionMarkup, { blockType: 'payment' })] : []),
      withBlockAttributes(termsSectionMarkup, { blockType: 'footer' })
    ];
  } else {
    // Checklist: terms replaced by optional free-text notes from sidebar input
    const userNotes = String(options?.checklistNotes || '').trim();
    if (userNotes.length > 0) {
      const checklistNotesSection = `<section class="quote-section">
        <h3>ملاحظات</h3>
        <div class="quote-notes">${escapeHtml(userNotes)}</div>
      </section>`;
      footerBlocks = [withBlockAttributes(checklistNotesSection)];
    }
  }

  const orderedBlocks = [
    ...ensureBlocks(primaryBlocks, 'projects.quote.placeholder.primary'),
    ...tableBlocks,
    ...ensureBlocks(summaryBlocks, 'projects.quote.placeholder.summary'),
    ...footerBlocks
  ];

  const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';

  const headerTemplateHtml = `
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${escapeHtml(QUOTE_COMPANY_INFO.logoUrl)}" alt="${escapeHtml(QUOTE_COMPANY_INFO.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(t('projects.quote.title', 'عرض سعر'))}</h1>
        <p class="quote-company-name">${escapeHtml(t('quote.companyName', QUOTE_COMPANY_INFO.companyName))}</p>
        <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
        <p class="quote-company-license">${escapeHtml(t('reservations.quote.labels.mediaLicense', 'ترخيص إعلامي'))}: 159460</p>
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
    <div id="quotation-pdf-root" dir="rtl" data-lang="${escapeHtml(lang)}"${rootAttributes}>
      <style>${PDF_FONT_FACE}${QUOTE_PDF_STYLES}</style>
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

function buildQuotationHtml(options = {}) {
  const layoutState = {
    context: options?.context || getBlockDragContext(),
    blockOffsets: options?.blockOffsets || activeQuoteState?.blockOffsets || null,
    infoAlignments: options?.infoAlignments || activeQuoteState?.infoAlignments || null,
  };
  const rootAttributes = buildRootLayoutAttributes(layoutState);
  const previousLayoutState = renderLayoutStateOverride;
  renderLayoutStateOverride = layoutState;

  try {
    if (options?.context === 'project') {
      return buildProjectQuotationHtml({ ...options, rootAttributes });
    }

    const {
      reservation,
      customer,
      project,
      crewAssignments,
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
  const langCurrent = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
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
    const sep = langCurrent === 'en' ? ': ' : ' / ';
    return `<div class="info-plain__item">${escapeHtml(label)}<span class="info-plain__slash">${sep}</span><strong class="info-plain__value">${escapeHtml(value)}</strong></div>`;
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

  const wrapSectionWithDragHandles = (key, titleHtml, bodyHtml) => {
    const titleKey = `${key}-title`;
    const bodyKey = `${key}-content`;
    return `
      <div class="quote-section__head" data-drag-key="${escapeHtml(titleKey)}">
        ${titleHtml}
      </div>
      <div class="quote-section__body" data-drag-key="${escapeHtml(bodyKey)}">
        ${bodyHtml}
      </div>
    `;
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

  const customerInfoClass = buildInfoPlainClass(activeQuoteState, 'customer');

  const customerSectionMarkup = includeSection('customerInfo')
    ? (customerFieldItems.length
        ? `<section class="quote-section quote-section--plain quote-section--customer">
            ${wrapSectionWithDragHandles(
              'customer',
              `<h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.customer', 'بيانات العميل'))}</h3>`,
              `<div class="${customerInfoClass}">${customerFieldItems.join('')}</div>`
            )}
          </section>`
        : '')
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

  const reservationInfoClass = buildInfoPlainClass(activeQuoteState, 'reservation');

  const reservationSectionMarkup = includeSection('reservationInfo')
    ? (reservationFieldItems.length
        ? `<section class="quote-section quote-section--plain quote-section--reservation">
            ${wrapSectionWithDragHandles(
              'reservation',
              `<h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.reservation', 'تفاصيل الحجز'))}</h3>`,
              `<div class="${reservationInfoClass}">${reservationFieldItems.join('')}</div>`
            )}
          </section>`
        : '')
    : '';

  const projectFieldItems = [];
  if (isFieldEnabled('projectInfo', 'projectTitle')) {
    projectFieldItems.push(renderPlainItem(t('reservations.details.labels.project', 'المشروع'), projectTitle));
  }
  if (isFieldEnabled('projectInfo', 'projectCode')) {
    projectFieldItems.push(renderPlainItem(t('reservations.details.labels.code', 'الرمز'), projectCode || '-'));
  }

  const projectInfoClass = buildInfoPlainClass(activeQuoteState, 'project');

  const projectSectionMarkup = includeSection('projectInfo')
    ? (projectFieldItems.length
        ? `<section class="quote-section quote-section--plain quote-section--project">
            ${wrapSectionWithDragHandles(
              'project',
              `<h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.project', 'بيانات المشروع'))}</h3>`,
              `<div class="${projectInfoClass}">${projectFieldItems.join('')}</div>`
            )}
          </section>`
        : '')
    : '';

  const financialInlineItems = [];
  // الترتيب المطلوب: الخصم → الإجمالي قبل الضريبة → الضريبة (حسب التoggles)
  if (isFieldEnabled('financialSummary', 'discountAmount')) {
    financialInlineItems.push(
      renderTotalsItem(
        t('reservations.details.labels.discount', 'قيمة الخصم'),
        `${totalsDisplay.discountAmount} ${currencyLabel}`
      )
    );
  }
  if (isFieldEnabled('financialSummary', 'subtotalBeforeTax')) {
    financialInlineItems.push(
      renderTotalsItem(
        t('reservations.details.labels.subtotalBeforeTax', 'الإجمالي قبل الضريبة'),
        `${totalsDisplay.taxableAmount} ${currencyLabel}`
      )
    );
  }
  if (isFieldEnabled('financialSummary', 'taxAmount')) {
    financialInlineItems.push(
      renderTotalsItem(
        t('reservations.details.labels.tax', 'قيمة الضريبة'),
        `${totalsDisplay.taxAmount} ${currencyLabel}`
      )
    );
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
          ${wrapSectionWithDragHandles(
            'financial',
            `<h3 class="quote-section__title">${escapeHtml(t('reservations.details.labels.summary', 'الملخص المالي'))}</h3>`,
            `<div class="totals-block">
              ${financialInlineItems.length ? `<div class="totals-inline">${financialInlineItems.join('')}</div>` : ''}
              ${financialFinalHtml}
            </div>`
          )}
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

    // Resolve the real package code (fallback to definition by id/name when missing or weak)
    let packageCode = group?.packageDisplayCode
      ?? group?.package_code
      ?? group?.code
      ?? group?.packageCode
      ?? (Array.isArray(group?.items) && group.items.length
        ? (group.items[0]?.package_code
          ?? group.items[0]?.code
          ?? group.items[0]?.packageCode)
        : null);

    const isWeakCode = (value) => {
      const s = (value == null ? '' : String(value)).trim();
      if (!s) return true;
      if (/^pkg-/i.test(s)) return true;
      if (/^\d+$/.test(s) && s.length <= 4) return true; // ids like 3,4
      return false;
    };

    if (!packageCode || isWeakCode(packageCode)) {
      const pkgId = group?.packageId
        ?? group?.package_id
        ?? (Array.isArray(group?.items) && group.items.length ? (group.items[0]?.packageId ?? group.items[0]?.package_id) : null);
      if (pkgId) {
        try {
          const def = findPackageById(pkgId);
          if (def && def.package_code) {
            packageCode = def.package_code;
          }
        } catch (_) {
          // ignore lookup errors
        }
      }
    }

    if (!packageCode || isWeakCode(packageCode)) {
      // Final fallback: match by package name from packages snapshot (normalize names to be tolerant)
      try {
        const targetName = normalizePackageNameForMatch(group?.description || '');
        if (targetName) {
          const list = getPackagesSnapshot();
          // Exact normalized match first
          let match = list.find((p) => normalizePackageNameForMatch(p?.name || p?.title || p?.label || '') === targetName);
          // If not found, try contains-either-way to cope with small differences
          if (!match) {
            match = list.find((p) => {
              const n = normalizePackageNameForMatch(p?.name || p?.title || p?.label || '');
              return n.includes(targetName) || targetName.includes(n);
            });
          }
          if (match && match.package_code) {
            packageCode = match.package_code;
          }
        }
      } catch (_) {
        // ignore
      }
    }

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
      packageCodeResolved: packageCode || '',
      qty: count,
      price: totalPrice,
      totalPrice,
      unitPriceValue: unitPrice,
    };
  });

  const itemColumnsBase = QUOTE_ITEMS_COLUMN_DEFS.filter((column) => isFieldEnabled('items', column.id));
  const itemColumns = (() => {
    let cols = [];
    itemColumnsBase.forEach((col) => {
      if (col.id === 'price') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            const qty = Number.isFinite(Number(item?.qty)) ? Math.max(1, Number(item.qty)) : 1;
            const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
            const total = unit * qty * days;
            return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else if (col.id === 'unitPrice') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            return escapeHtml(`${formatMoney(unit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
    if (isFieldEnabled('items','days')) {
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder tail: unitPrice -> quantity -> (days?) -> price
    const map = new Map(cols.map((c) => [c.id, c]));
    const keep = cols.filter((c) => !['unitPrice','quantity','days','price'].includes(c.id));
    const tailOrder = ['unitPrice','quantity'];
    if (map.has('days')) tailOrder.push('days');
    tailOrder.push('price');
    const tail = tailOrder.map((id) => map.get(id)).filter(Boolean);
    cols = [...keep, ...tail];
    return cols;
  })();
  const hasItemColumns = itemColumns.length > 0;
  const itemTableHeader = hasItemColumns
    ? itemColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const hasItems = quoteItems.length > 0;
  const itemsBodyRows = hasItems
    ? quoteItems.map((item, index) => `<tr>${itemColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(item, index)}</div></td>`).join('')}</tr>`).join('')
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
            ${isFieldEnabled('items','equipmentSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${totalsDisplay.equipmentTotal} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const crewColumnsBase = QUOTE_CREW_COLUMN_DEFS.filter((column) => isFieldEnabled('crew', column.id));
  const groupCrew = true; // Always group crew by position in reservation quotes
  const hasCrewColumns = crewColumnsBase.length > 0;
  const crewSourceRaw = Array.isArray(crewAssignments) ? crewAssignments : [];
  const crewKeyOf = (a) => {
    const baseKey = (a && a.positionId != null)
      ? `id:${String(a.positionId)}`
      : (() => {
          const raw = (a?.positionLabel || a?.position_name || a?.position || '').trim().toLowerCase();
          return raw ? `label:${raw}` : '';
        })();
    const price = Number.isFinite(Number(a?.positionClientPrice)) ? Number(a.positionClientPrice) : 0;
    const priceKey = price > 0 ? `|p:${price.toFixed(2)}` : '';
    return `${baseKey}${priceKey}`;
  };
  const crewCounts = (() => {
    const map = new Map();
    crewSourceRaw.forEach((a) => {
      const key = crewKeyOf(a);
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  })();
  const crewColumns = (() => {
    let cols = [];
    let quantityColumn = null;
    crewColumnsBase.forEach((col) => {
      if (col.id === 'position') {
        cols.push({
          ...col,
          render: (assignment) => {
            const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
            let labelEn = assignment?.positionLabelEn
              ?? assignment?.position_label_en
              ?? assignment?.position_name_en
              ?? assignment?.positionLabelAlt
              ?? assignment?.position_label_alt
              ?? assignment?.role;
            if (!labelEn && langNow === 'en') {
              try {
                const positions = (typeof getTechnicianPositionsCache === 'function') ? getTechnicianPositionsCache() : [];
                let resolved = null;
                if (assignment?.positionId != null) {
                  resolved = positions.find((p) => String(p.id) === String(assignment.positionId)) || null;
                }
                if (!resolved) {
                  const key = assignment?.positionKey
                    ?? assignment?.position_key
                    ?? assignment?.positionName
                    ?? assignment?.position_name
                    ?? assignment?.position
                    ?? '';
                  if (key) {
                    const lk = String(key).toLowerCase();
                    resolved = positions.find((p) => String(p.name).toLowerCase() === lk) || null;
                  }
                }
                if (resolved) {
                  labelEn = resolved.labelEn ?? resolved.label_en ?? resolved.name_en ?? labelEn;
                }
              } catch (_) { /* non-fatal */ }
            }
            const labelAr = assignment?.positionLabel
              ?? assignment?.position_name
              ?? assignment?.role
              ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
            const baseLabel = (langNow === 'en' && labelEn) ? labelEn : labelAr;
            if (groupCrew) {
              return escapeHtml(normalizeNumbers(String(baseLabel)));
            }
            const key = crewKeyOf(assignment);
            const count = key ? (crewCounts.get(key) || 0) : 0;
            const suffix = count > 1 ? ` × ${normalizeNumbers(String(count))}` : '';
            return escapeHtml(normalizeNumbers(String(baseLabel)) + suffix);
          }
        });
        // Prepare quantity column (optional via toggle)
        if (isFieldEnabled('crew','quantity')) {
          quantityColumn = {
            id: 'quantity',
            labelKey: 'reservations.details.table.headers.quantity',
            fallback: 'الكمية',
            render: (assignment) => {
              const qty = Number(assignment?.__count || 1);
              return escapeHtml(normalizeNumbers(String(Math.max(1, qty))));
            }
          };
        }
      } else if (col.id === 'price') {
        // When grouping by position, show client price multiplied by quantity
        if (groupCrew) {
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const qty = Math.max(1, Number(assignment?.__count || 1));
              const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
              const total = unit * qty * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        } else {
          // Non-grouped price per assignment for all days
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
              const total = unit * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        }
      } else if (col.id === 'unitPrice') {
        // Show per-day unit price
        cols.push({
          ...col,
          render: (assignment) => {
            const unit = Number.isFinite(Number(assignment?.positionClientPrice))
              ? Number(assignment.positionClientPrice)
              : 0;
            return escapeHtml(`${formatMoney(unit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    // Ensure quantity column is present only if allowed
    if (quantityColumn) {
      cols.push(quantityColumn);
    }
    // Optional days column via toggle
    if (isFieldEnabled('crew','days')) {
      const days = Math.max(1, Number(activeQuoteState?.rentalDays || 1));
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder to: rowNumber, position, unitPrice, quantity, days, price, then others
    const map = new Map(cols.map((c) => [c.id, c]));
    const seen = new Set();
    const out = [];
    const pushIf = (id) => { const c = map.get(id); if (c && !seen.has(id)) { out.push(c); seen.add(id);} };
    pushIf('rowNumber');
    pushIf('position');
    pushIf('unitPrice');
    pushIf('quantity');
    pushIf('days');
    pushIf('price');
    cols.forEach((c) => { if (!seen.has(c.id)) { out.push(c); seen.add(c.id);} });
    cols = out;
    return cols;
  })();
  const crewHeader = hasCrewColumns
    ? crewColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const crewSource = groupCrew
    ? (() => {
        const map = new Map();
        crewSourceRaw.forEach((a) => {
          const key = crewKeyOf(a);
          if (!key) return;
          const existing = map.get(key);
          if (existing) {
            existing.__count += 1;
          } else {
            map.set(key, { ...a, __count: 1 });
          }
        });
        return Array.from(map.values());
      })()
    : crewSourceRaw;
  const crewBodyRows = crewSource.length
    ? crewSource.map((assignment, index) => `<tr>${crewColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(assignment, index)}</div></td>`).join('')}</tr>`).join('')
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
            ${isFieldEnabled('crew','crewSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${totalsDisplay.crewTotal} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
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
    const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
    const leftFirst = langNow === 'en'
      ? `${reservationSectionMarkup}${customerSectionMarkup}`
      : `${customerSectionMarkup}${reservationSectionMarkup}`;
    primaryBlocks.push(withBlockAttributes(
      `<div class="quote-section-row">${leftFirst}</div>`,
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
    try {
      const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
      const emptySection = '<section class="quote-section quote-section--empty"></section>';
      // Place Project info on the far right under Customer info for AR as well
      const rowHtml = (langNow === 'en')
        ? `<div class="quote-section-row">${emptySection}${projectSectionMarkup}</div>`
        : `<div class="quote-section-row">${emptySection}${projectSectionMarkup}</div>`;
      primaryBlocks.push(withBlockAttributes(rowHtml, { blockType: 'group' }));
    } catch (_) {
      primaryBlocks.push(withBlockAttributes(projectSectionMarkup));
    }
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

  let footerBlocks = [];
  if ((options?.context || 'reservation') !== 'reservationChecklist') {
    footerBlocks = [
      ...(includeSection('payment') ? [withBlockAttributes(paymentSectionMarkup, { blockType: 'payment' })] : []),
      withBlockAttributes(termsSectionMarkup, { blockType: 'footer' })
    ];
  } else {
    const userNotes = String(options?.checklistNotes || '').trim();
    const notesTitle = String(options?.checklistNotesTitle || '').trim() || t('reservations.checklist.controls.notes.sectionTitleDefault', 'ملاحظات');
    if (userNotes.length > 0) {
      const checklistNotesSection = `<section class="quote-section">
        <h3>${escapeHtml(notesTitle)}</h3>
        <div class="quote-notes">${escapeHtml(userNotes)}</div>
      </section>`;
      footerBlocks = [withBlockAttributes(checklistNotesSection)];
    }
  }

  const orderedBlocks = [
    ...(options?.context === 'reservationChecklist' ? primaryBlocks : ensureBlocks(primaryBlocks, 'reservations.quote.placeholder.page1')),
    ...tableBlocks,
    ...(options?.context === 'reservationChecklist' ? summaryBlocks : ensureBlocks(summaryBlocks, 'reservations.quote.placeholder.page2')),
    ...footerBlocks
  ];

  const isChecklist = (options?.context === 'reservationChecklist');
  const checklistTitle = (options?.checklistType === 'crew')
    ? 'قائمة الفريق الفني'
    : (options?.checklistType === 'both' ? 'قائمة المعدات والطاقم الفني' : 'قائمة المعدات');
  const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
  const enChecklistTitle = (options?.checklistType === 'crew')
    ? 'Crew List'
    : (options?.checklistType === 'both' ? 'Equipment & Crew List' : 'Equipment List');
  const headerTitle = isChecklist ? (lang === 'en' ? enChecklistTitle : checklistTitle) : t('reservations.quote.title', 'عرض سعر');
  const headerMetaHtml = isChecklist
    ? (
      `<div class="quote-header__meta" ${lang === 'en' ? 'dir="ltr"' : ''}>
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('reservations.quote.labels.date', 'التاريخ'))}</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>`
    )
    : (
      `<div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${escapeHtml(quoteNumber)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>`
    );

  const showLogo = !isChecklist || !options?.hideLogo;
  const showCompany = !isChecklist || !options?.hideCompany;
  const headerTemplateHtml = `
    <header class="quote-header" data-quote-header-template style="${Number.isFinite(Number(options?.headerOffset)) ? `margin-top:${Number(options.headerOffset)}px;` : ''}">
      <div class="quote-header__logo">
        ${showLogo ? `<img class=\"quote-logo\" src=\"${escapeHtml(QUOTE_COMPANY_INFO.logoUrl)}\" alt=\"${escapeHtml(QUOTE_COMPANY_INFO.companyName)}\" crossorigin=\"anonymous\"/>` : `<span class=\"quote-logo quote-logo--placeholder\" aria-hidden=\"true\"></span>`}
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(headerTitle)}</h1>
        ${showCompany ? `
          <p class="quote-company-name">${escapeHtml(t('quote.companyName', QUOTE_COMPANY_INFO.companyName))}</p>
          <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
          <p class="quote-company-license">${escapeHtml(t('reservations.quote.labels.mediaLicense', 'ترخيص إعلامي'))}: 159460</p>
        ` : ''}
      </div>
      ${headerMetaHtml}
    </header>
  `.trim();

  const rootDir = (isChecklist && lang === 'en') ? 'ltr' : 'rtl';
    return `
      <div id="quotation-pdf-root" dir="${escapeHtml(rootDir)}" data-lang="${escapeHtml(lang)}"${rootAttributes}>
        <style>${PDF_FONT_FACE}${QUOTE_PDF_STYLES}</style>
        <div class="quote-document" data-quote-document>
          <div class="quote-preview-pages" data-quote-pages></div>
          <div class="quote-content-source" data-quote-source>
            ${headerTemplateHtml}
            ${orderedBlocks.join('')}
          </div>
        </div>
      </div>
    `;
  } finally {
    renderLayoutStateOverride = previousLayoutState;
  }
}

async function ensurePackagesAvailable() {
  try {
    const snapshot = loadData();
    const existing = Array.isArray(snapshot?.packages) ? snapshot.packages : [];
    if (existing.length > 0) return;
    const response = await apiRequest('/packages/?all=1');
    const data = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
    if (data.length) {
      saveData({ packages: data });
      document.dispatchEvent?.(new CustomEvent('packages:changed', { detail: { packages: data } }));
    }
  } catch (_) {
    // ignore network errors; fallback to whatever is in cache
  }
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
  const datasetContext = root.getAttribute(QUOTE_LAYOUT_DATA_ATTRS.context) || null;
  const datasetOffsets = parseLayoutDatasetAttr(root, QUOTE_LAYOUT_DATA_ATTRS.blockOffsets);
  const datasetAlignments = parseLayoutDatasetAttr(root, QUOTE_LAYOUT_DATA_ATTRS.infoAlignments);
  const previousLayoutOverride = renderLayoutStateOverride;
  const layoutOverrideActive = datasetContext || datasetOffsets || datasetAlignments;
  if (layoutOverrideActive) {
    renderLayoutStateOverride = {
      context: datasetContext || null,
      blockOffsets: datasetOffsets || null,
      infoAlignments: datasetAlignments || null,
    };
  }

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

    // Append trailing subtotal (or other post-table summary) if present
    try {
      const subtotal = node.querySelector(':scope > .quote-table-subtotal');
      if (subtotal) {
        placeBlock(subtotal);
      }
    } catch (_) {}
  };

  try {
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
    const hasOffsets = (value) => value && typeof value === 'object' && Object.keys(value).length > 0;
    const fallbackContextSource = activeQuoteState || (datasetContext ? { context: datasetContext } : null);
    const defaultOffsets = DEFAULT_BLOCK_OFFSETS[getBlockDragContext(fallbackContextSource)] || {};
    const effectiveOffsets = hasOffsets(datasetOffsets)
      ? datasetOffsets
      : (hasOffsets(activeQuoteState?.blockOffsets) ? activeQuoteState.blockOffsets : defaultOffsets);
    try {
      applyQuoteBlockOffsets(root, effectiveOffsets);
    } catch (_) {
      /* non-fatal */
    }
  } finally {
    if (layoutOverrideActive) {
      renderLayoutStateOverride = previousLayoutOverride;
    }
  }

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

// Small helper to wait for next paint or a fixed delay
function sleep(ms = 0) {
  if (ms <= 0) {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pagesOverflow(root) {
  if (!root) return false;
  const pages = Array.from(root.querySelectorAll('.quote-page'));
  return pages.some((page) => ((page.scrollHeight - page.clientHeight) > PAGE_OVERFLOW_TOLERANCE_PX));
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

  refreshAlignmentOptions();
  const context = activeQuoteState.context || 'reservation';
  const html = buildQuotationHtml({
    context,
    reservation: activeQuoteState.reservation,
    customer: activeQuoteState.customer,
    project: activeQuoteState.project,
    crewAssignments: activeQuoteState.crewAssignments,
    totals: activeQuoteState.totals,
    totalsDisplay: activeQuoteState.totalsDisplay,
    rentalDays: activeQuoteState.rentalDays,
    currencyLabel: activeQuoteState.currencyLabel,
    sections: activeQuoteState.sections,
    fieldSelections: activeQuoteState.fields,
    quoteNumber: activeQuoteState.quoteNumber,
    quoteDate: activeQuoteState.quoteDateLabel,
    terms: activeQuoteState.terms,
    checklistType: activeQuoteState.checklistType,
    checklistNotes: activeQuoteState.checklistNotes,
    checklistNotesTitle: activeQuoteState.checklistNotesTitle,
    hideLogo: Boolean(activeQuoteState.hideLogo),
    hideCompany: Boolean(activeQuoteState.hideCompany),
    headerOffset: Number(activeQuoteState.headerOffset || 0),
    projectCrew: activeQuoteState.projectCrew,
    projectExpenses: activeQuoteState.projectExpenses,
    projectEquipment: activeQuoteState.projectEquipment,
    projectInfo: activeQuoteState.projectInfo,
    clientInfo: activeQuoteState.clientInfo,
    paymentSummary: activeQuoteState.paymentSummary,
    projectTotals: activeQuoteState.projectTotals,
    blockOffsets: activeQuoteState.blockOffsets,
    infoAlignments: activeQuoteState.infoAlignments
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
          // Re-validate after fonts/images stabilize to avoid single-page glitch
          await sleep(120);
          if (pagesOverflow(pdfRoot)) {
            await layoutQuoteDocument(pdfRoot, { context: 'preview' });
          }
          enforceQuoteTextColor(pdfRoot);
        }
      } catch (error) {
        console.error('[reservations/pdf] failed to layout preview document', error);
      }
      const pages = Array.from(doc?.querySelectorAll?.('.quote-page') || []);

      // Enable dragging the header down when hideCompany is active in checklist mode (preview only)
      try {
        const isChecklist = (activeQuoteState?.context === 'reservationChecklist');
        if (isChecklist && activeQuoteState?.hideCompany) {
          const header = doc.querySelector('.quote-header');
          if (header && !header.dataset.dragReady) {
            header.style.cursor = 'grab';
            let dragging = false;
            let startY = 0;
            let startOffset = Number(activeQuoteState.headerOffset || 0);
            const onDown = (e) => {
              dragging = true;
              startY = e.clientY || e.touches?.[0]?.clientY || 0;
              startOffset = Number(activeQuoteState.headerOffset || 0);
              header.style.cursor = 'grabbing';
              doc.addEventListener('mousemove', onMove);
              doc.addEventListener('mouseup', onUp, { once: true });
              doc.addEventListener('touchmove', onMove, { passive: false });
              doc.addEventListener('touchend', onUp, { once: true });
            };
            const onMove = (e) => {
              if (!dragging) return;
              const y = e.clientY || e.touches?.[0]?.clientY || 0;
              const delta = y - startY;
              const next = Math.max(0, Math.min(240, startOffset + delta));
              header.style.marginTop = `${next}px`;
              activeQuoteState.headerOffset = next;
              e.preventDefault?.();
            };
            const onUp = () => {
              dragging = false;
              header.style.cursor = 'grab';
              doc.removeEventListener('mousemove', onMove);
              doc.removeEventListener('touchmove', onMove);
            };
            header.addEventListener('mousedown', onDown);
            header.addEventListener('touchstart', onDown, { passive: true });
            header.dataset.dragReady = 'true';
        }
      }
    } catch (_) { /* non-fatal */ }
      setupPreviewBlockDrag(doc);
      syncBlockDragModeToPreview(doc);
      updateInfoAlignmentControls();
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
          <h5 class="modal-title" id="reservationQuoteModalLabel">${escapeHtml(t('reservations.quote.previewTitle', 'معاينة عرض سعر'))}</h5>
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
  previewFrame.setAttribute('title', t('reservations.quote.previewTitle', 'معاينة عرض سعر'));
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
  const dragControls = document.createElement('div');
  dragControls.className = 'quote-preview-zoom-controls quote-preview-drag-controls';
  dragControls.innerHTML = `
    <button type="button" class="quote-preview-zoom-btn" data-block-drag-toggle title="${escapeHtml(t('reservations.quote.drag.enable', 'وضع تحريك البلوكات'))}" aria-label="${escapeHtml(t('reservations.quote.drag.enable', 'وضع تحريك البلوكات'))}">
      <span aria-hidden="true">↕️</span>
    </button>
    <button type="button" class="quote-preview-zoom-btn" data-block-drag-save disabled title="${escapeHtml(t('reservations.quote.drag.save', 'تثبيت المواضع'))}" aria-label="${escapeHtml(t('reservations.quote.drag.save', 'تثبيت المواضع'))}">
      <span aria-hidden="true">💾</span>
    </button>
    <button type="button" class="quote-preview-zoom-btn" data-block-drag-reset title="${escapeHtml(t('reservations.quote.drag.resetBtn', 'تصفير المواضع'))}" aria-label="${escapeHtml(t('reservations.quote.drag.resetBtn', 'تصفير المواضع'))}">
      <span aria-hidden="true">⟲</span>
    </button>
  `;
  const alignControls = document.createElement('div');
  alignControls.className = 'quote-preview-zoom-controls quote-preview-align-controls';
  const alignCustomerLabel = escapeHtml(t('reservations.quote.align.customer', 'بيانات العميل'));
  const alignReservationLabel = escapeHtml(t('reservations.quote.align.reservation', 'تفاصيل الحجز'));
  const alignProjectLabel = escapeHtml(t('reservations.quote.align.project', 'بيانات المشروع'));
  alignControls.innerHTML = `
    <select class="quote-preview-align-select" data-align-target>
      <option value="customer">${alignCustomerLabel}</option>
      <option value="reservation">${alignReservationLabel}</option>
      <option value="project">${alignProjectLabel}</option>
    </select>
    <div class="quote-preview-align-buttons">
      <button type="button" class="quote-preview-zoom-btn" data-align-value="left" title="${escapeHtml(t('reservations.quote.align.left', 'محاذاة يسار'))}">⬅️</button>
      <button type="button" class="quote-preview-zoom-btn" data-align-value="center" title="${escapeHtml(t('reservations.quote.align.center', 'محاذاة وسط'))}">↔️</button>
      <button type="button" class="quote-preview-zoom-btn" data-align-value="right" title="${escapeHtml(t('reservations.quote.align.right', 'محاذاة يمين'))}">➡️</button>
    </div>
    <button type="button" class="quote-preview-zoom-btn" data-layout-export title="${escapeHtml(t('reservations.quote.align.export', 'نسخ الإعدادات الحالية'))}">📋</button>
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
  headerActions.appendChild(dragControls);
  headerActions.appendChild(alignControls);

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
    userAdjustedZoom: false,
    blockDragToggle: dragControls.querySelector('[data-block-drag-toggle]'),
    blockDragSave: dragControls.querySelector('[data-block-drag-save]'),
    blockDragReset: dragControls.querySelector('[data-block-drag-reset]'),
    alignTarget: alignControls.querySelector('[data-align-target]'),
    alignButtons: Array.from(alignControls.querySelectorAll('[data-align-value]')),
    layoutExportBtn: alignControls.querySelector('[data-layout-export]')
  };

  const zoomOutBtn = zoomControls.querySelector('[data-zoom-out]');
  const zoomInBtn = zoomControls.querySelector('[data-zoom-in]');
  const zoomResetBtn = zoomControls.querySelector('[data-zoom-reset]');

  zoomOutBtn?.addEventListener('click', () => adjustPreviewZoom(-0.1));
  zoomInBtn?.addEventListener('click', () => adjustPreviewZoom(0.1));
  zoomResetBtn?.addEventListener('click', () => setPreviewZoom(1, { markManual: true }));
  quoteModalRefs.blockDragToggle?.addEventListener('click', () => setBlockDragMode(!blockDragMode));
  quoteModalRefs.blockDragSave?.addEventListener('click', persistCurrentBlockOffsets);
  quoteModalRefs.blockDragReset?.addEventListener('click', resetStoredBlockOffsets);
  quoteModalRefs.alignTarget?.addEventListener('change', () => updateInfoAlignmentControls());
  (quoteModalRefs.alignButtons || []).forEach((button) => {
    button.addEventListener('click', () => {
      const target = quoteModalRefs.alignTarget?.value || 'customer';
      const value = button.dataset.alignValue || 'right';
      applyInfoAlignment(target, value);
    });
  });
  quoteModalRefs.layoutExportBtn?.addEventListener('click', exportCurrentLayoutSettings);
  updateBlockDragButtons();
  refreshAlignmentOptions();

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
  if ((activeQuoteState.context || 'reservation') === 'reservationChecklist') {
    meta.innerHTML = `
      <div class="quote-meta-card">
        <div><span>${escapeHtml(t('reservations.quote.labels.dateGregorian', 'التاريخ الميلادي'))}</span><strong>${escapeHtml(activeQuoteState.quoteDateLabel)}</strong></div>
      </div>
    `;
  } else {
    meta.innerHTML = `
      <div class="quote-meta-card">
        <div><span>${escapeHtml(t('reservations.quote.labels.number', 'رقم عرض سعر'))}</span><strong>${escapeHtml(activeQuoteState.quoteNumber)}</strong></div>
        <div><span>${escapeHtml(t('reservations.quote.labels.dateGregorian', 'التاريخ الميلادي'))}</span><strong>${escapeHtml(activeQuoteState.quoteDateLabel)}</strong></div>
      </div>
    `;
  }
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
    // Do not reserve server-side sequences; we use digits-only from reservation/project identifiers for both contexts.
    // Keeping this block disabled preserves deterministic quote numbers and avoids server dependency.
    const html = buildQuotationHtml({
      context,
      reservation: activeQuoteState.reservation,
      customer: activeQuoteState.customer,
      project: activeQuoteState.project,
      crewAssignments: activeQuoteState.crewAssignments,
      totals: activeQuoteState.totals,
      totalsDisplay: activeQuoteState.totalsDisplay,
      rentalDays: activeQuoteState.rentalDays,
      currencyLabel: activeQuoteState.currencyLabel,
      sections: activeQuoteState.sections,
      fieldSelections: activeQuoteState.fields,
      quoteNumber: activeQuoteState.quoteNumber,
      quoteDate: activeQuoteState.quoteDateLabel,
      terms: activeQuoteState.terms,
      checklistType: activeQuoteState.checklistType,
      checklistNotes: activeQuoteState.checklistNotes,
      checklistNotesTitle: activeQuoteState.checklistNotesTitle,
      hideLogo: Boolean(activeQuoteState.hideLogo),
      hideCompany: Boolean(activeQuoteState.hideCompany),
      headerOffset: Number(activeQuoteState.headerOffset || 0),
      projectCrew: activeQuoteState.projectCrew,
      projectExpenses: activeQuoteState.projectExpenses,
    projectEquipment: activeQuoteState.projectEquipment,
    projectInfo: activeQuoteState.projectInfo,
    clientInfo: activeQuoteState.clientInfo,
    paymentSummary: activeQuoteState.paymentSummary,
    projectTotals: activeQuoteState.projectTotals,
    blockOffsets: activeQuoteState.blockOffsets,
    infoAlignments: activeQuoteState.infoAlignments
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
      // Respect language-specific direction for export as in preview
      try {
        const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : (pdfRoot.getAttribute('data-lang') || 'ar');
        const isChecklist = (activeQuoteState?.context === 'reservationChecklist');
        const rootDir = (isChecklist && langNow === 'en') ? 'ltr' : 'rtl';
        pdfRoot.setAttribute('dir', rootDir);
        pdfRoot.style.direction = rootDir;
        // Ensure CSS language-specific rules (e.g., table LTR) apply during export
        pdfRoot.setAttribute('data-lang', langNow);
        // Let CSS handle text alignment per language; avoid forcing it here
        pdfRoot.style.textAlign = '';
      } catch (_) {
        /* fallback: do not override direction */
      }
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
      // Re-validate after assets stabilize to ensure correct pagination
      await sleep(120);
      if (pagesOverflow(pdfRoot)) {
        await layoutQuoteDocument(pdfRoot, { context: 'export' });
      }
      await waitForQuoteAssets(pdfRoot);
      enforceQuoteTextColor(pdfRoot);
      logPdfDebug('layout complete for export document');
    } catch (layoutError) {
      handlePdfError(layoutError, 'layoutQuoteDocument', { suppressToast: true });
    }
    }

    const filename = (context === 'reservationChecklist')
      ? (() => {
          const id = activeQuoteState?.reservation?.reservationCode || activeQuoteState?.reservation?.reservationId || activeQuoteState?.reservation?.id || 'res';
          const kind = (activeQuoteState?.checklistType === 'crew') ? 'crew' : (activeQuoteState?.checklistType === 'both' ? 'equipment-crew' : 'equipment');
          return `checklist-${String(id)}-${kind}.pdf`;
        })()
      : `quotation-${activeQuoteState.quoteNumber}.pdf`;
    await renderQuotePagesAsPdf(pdfRoot, {
      filename,
      safariWindowRef: safariDownloadWindow,
      mobileWindowRef: mobileDownloadWindow
    });

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

  // Inject checklist-specific controls and labels when needed
  if (activeQuoteState?.context === 'reservationChecklist') {
    try {
      const titleEl = refs.modal.querySelector('#reservationQuoteModalLabel');
      const sidebar = refs.modal.querySelector('.quote-preview-sidebar');
      const termsEditor = refs.modal.querySelector('[data-quote-terms-editor]');
      if (termsEditor) termsEditor.style.display = 'none';

      // Build controls container once
      let controls = sidebar.querySelector('[data-checklist-controls]');
      if (!controls) {
        controls = document.createElement('div');
        controls.setAttribute('data-checklist-controls', '');
        const itemsLabel = escapeHtml(t('reservations.checklist.controls.items', 'قائمة المعدات'));
        const crewLabel = escapeHtml(t('reservations.checklist.controls.crew', 'قائمة الفريق الفني'));
        const bothLabel = escapeHtml(t('reservations.checklist.controls.both', 'قائمة المعدات والطاقم الفني'));
        const hideLogoLabel = escapeHtml(t('reservations.checklist.controls.hideLogo', 'إخفاء الشعار'));
        const hideCompanyLabel = escapeHtml(t('reservations.checklist.controls.hideCompany', 'إخفاء اسم الشركة'));
        const notesTitle = escapeHtml(t('reservations.checklist.controls.notes.title', 'ملاحظات اللستة (اختياري)'));
        const notesPlaceholder = escapeHtml(t('reservations.checklist.controls.notes.placeholder', 'اكتب أي ملاحظات خاصة بهذه اللستة'));
        const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
        const langBtnLabel = lang === 'en'
          ? escapeHtml(t('language.toggle.labelAr', '🇸🇦 العربية'))
          : escapeHtml(t('language.toggle.labelEn', '🇬🇧 English'));

        controls.innerHTML = `
          <div class="quote-meta-card" style="margin-bottom:10px">
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <label style="display:flex;align-items:center;gap:6px">
                <input type="radio" name="checklist-type" value="items" checked>
                <span data-i18n data-i18n-key="reservations.checklist.controls.items">${itemsLabel}</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px">
                <input type="radio" name="checklist-type" value="crew">
                <span data-i18n data-i18n-key="reservations.checklist.controls.crew">${crewLabel}</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px">
                <input type="radio" name="checklist-type" value="both">
                <span data-i18n data-i18n-key="reservations.checklist.controls.both">${bothLabel}</span>
              </label>
            </div>
          </div>
          <div class="quote-meta-card" style="margin-bottom:10px">
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button type="button" class="btn btn-sm btn-light" data-checklist-lang>${langBtnLabel}</button>
              <label style="display:flex;align-items:center;gap:6px">
                <input type="checkbox" data-checklist-hide-logo>
                <span data-i18n data-i18n-key="reservations.checklist.controls.hideLogo">${hideLogoLabel}</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px">
                <input type="checkbox" data-checklist-hide-company>
                <span data-i18n data-i18n-key="reservations.checklist.controls.hideCompany">${hideCompanyLabel}</span>
              </label>
            </div>
          </div>
          <div class="quote-terms-editor" data-checklist-notes>
            <label class="quote-terms-editor__label" for="checklist-notes-title-input" data-i18n data-i18n-key="reservations.checklist.controls.notes.titleLabel">${escapeHtml(t('reservations.checklist.controls.notes.titleLabel', 'عنوان الملاحظات'))}</label>
            <input id="checklist-notes-title-input" class="quote-terms-editor__input" type="text" value="${escapeHtml(t('reservations.checklist.controls.notes.sectionTitleDefault', 'ملاحظات'))}" data-i18n-value-key="reservations.checklist.controls.notes.sectionTitleDefault">
            <label class="quote-terms-editor__label" for="checklist-notes-input" data-i18n data-i18n-key="reservations.checklist.controls.notes.title">${notesTitle}</label>
            <textarea id="checklist-notes-input" class="quote-terms-editor__textarea" rows="4" data-i18n-placeholder-key="reservations.checklist.controls.notes.placeholder" placeholder="${notesPlaceholder}"></textarea>
          </div>
        `;
        sidebar.prepend(controls);

        // Events
        const radios = controls.querySelectorAll('input[name="checklist-type"]');
        radios.forEach((radio) => {
          radio.addEventListener('change', () => {
            const value = controls.querySelector('input[name="checklist-type"]:checked')?.value || 'items';
            activeQuoteState.checklistType = (value === 'crew' || value === 'both') ? value : 'items';
            // Keep base sections, toggle items/crew based on selection
            const base = new Set(['customerInfo','reservationInfo','projectInfo','notes']);
            if (activeQuoteState.checklistType === 'crew') {
              base.add('crew');
            } else if (activeQuoteState.checklistType === 'both') {
              base.add('items'); base.add('crew');
            } else {
              base.add('items');
            }
            activeQuoteState.sections = base;
            // Update modal title to reflect selection
            if (titleEl) {
              const langNow = getCurrentLanguage?.() || 'ar';
              const labelAr = activeQuoteState.checklistType === 'crew' ? 'قائمة الفريق الفني' : (activeQuoteState.checklistType === 'both' ? 'قائمة المعدات والطاقم الفني' : 'قائمة المعدات');
              const labelEn = activeQuoteState.checklistType === 'crew' ? 'Crew List' : (activeQuoteState.checklistType === 'both' ? 'Equipment & Crew List' : 'Equipment List');
              titleEl.textContent = langNow === 'en' ? labelEn : labelAr;
            }
            renderQuoteToggles();
            updateQuoteMeta();
            renderQuotePreview();
          });
        });

        const notesInput = controls.querySelector('#checklist-notes-input');
        const notesTitleInput = controls.querySelector('#checklist-notes-title-input');
        const syncNotesDirection = () => {
          try {
            const langNow = getCurrentLanguage?.() || 'ar';
            const dir = langNow === 'en' ? 'ltr' : 'rtl';
            const align = langNow === 'en' ? 'left' : 'right';
            if (notesInput) { notesInput.setAttribute('dir', dir); notesInput.style.textAlign = align; }
            if (notesTitleInput) { notesTitleInput.setAttribute('dir', dir); notesTitleInput.style.textAlign = align; }
          } catch(_) {}
        };
        // Initial sync
        syncNotesDirection();
        // Also respond to global language changes (outside the quick toggle)
        try {
          const onLangChanged = () => syncNotesDirection();
          document.addEventListener('language:changed', onLangChanged);
          // Store to remove later if needed
          controls._onLangChanged = onLangChanged;
        } catch(_) {}
        notesInput.addEventListener('input', (e) => {
          activeQuoteState.checklistNotes = String(e.target.value || '');
          renderQuotePreview();
        });
        notesTitleInput.addEventListener('input', (e) => {
          activeQuoteState.checklistNotesTitle = String(e.target.value || '');
          renderQuotePreview();
        });

        // Language toggle
        const langBtn = controls.querySelector('[data-checklist-lang]');
        if (langBtn) {
          const syncLabel = () => {
            const lang = getCurrentLanguage?.() || 'ar';
            langBtn.textContent = lang === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية';
          };
          syncLabel();
          langBtn.addEventListener('click', () => {
            const lang = getCurrentLanguage?.() || 'ar';
            const next = lang === 'ar' ? 'en' : 'ar';
            try { setLanguage?.(next); } catch(_) {}
            syncLabel();
            // Ensure notes input direction matches chosen language
            syncNotesDirection();
            // update title to current language
            if (titleEl) {
              const langNow = getCurrentLanguage?.() || 'ar';
              const type = activeQuoteState.checklistType;
              const labelAr = type === 'crew' ? 'قائمة الفريق الفني' : (type === 'both' ? 'قائمة المعدات والطاقم الفني' : 'قائمة المعدات');
              const labelEn = type === 'crew' ? 'Crew List' : (type === 'both' ? 'Equipment & Crew List' : 'Equipment List');
              titleEl.textContent = langNow === 'en' ? labelEn : labelAr;
            }
            renderQuoteToggles();
            updateQuoteMeta();
            renderQuotePreview();
          });
        }

        // Header branding visibility
        const hideLogoCb = controls.querySelector('[data-checklist-hide-logo]');
        const hideCompanyCb = controls.querySelector('[data-checklist-hide-company]');
        const syncBranding = () => {
          if (hideLogoCb) hideLogoCb.checked = Boolean(activeQuoteState.hideLogo);
          if (hideCompanyCb) hideCompanyCb.checked = Boolean(activeQuoteState.hideCompany);
        };
        syncBranding();
        hideLogoCb?.addEventListener('change', (e) => {
          activeQuoteState.hideLogo = Boolean(e.target.checked);
          renderQuotePreview();
        });
        hideCompanyCb?.addEventListener('change', (e) => {
          activeQuoteState.hideCompany = Boolean(e.target.checked);
          renderQuotePreview();
        });
      }

      if (titleEl) {
        titleEl.textContent = activeQuoteState.checklistType === 'crew' ? 'قائمة الفريق الفني' : 'قائمة المعدات';
      }
      // Update preview frame title for a11y
      try { refs.previewFrame?.setAttribute('title', 'معاينة اللستة'); } catch(_) {}
    } catch (_) { /* non-fatal */ }
  }

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

  // Ensure packages are available for package_code lookups in PDF
  await ensurePackagesAvailable();

  const crewAssignments = collectReservationCrewAssignments(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, crewAssignments, project);
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  // Derive quote number from the reservation itself (digits only, no prefixes)
  const deriveReservationQuoteNumber = (res) => {
    if (!res) return '1';
    const codeCandidates = [
      res.reservationCode,
      res.reservation_code,
      res.reservationId,
      res.reservation_id,
      res.id
    ];
    const first = codeCandidates.find((v) => v != null && String(v).trim() !== '');
    const normalized = normalizeNumbers(String(first ?? '1'));
    const digitsOnly = normalized.replace(/\D+/g, '');
    return digitsOnly || normalized || '1';
  };
  const quoteNumber = deriveReservationQuoteNumber(reservation);
  const sequence = Number.parseInt(quoteNumber, 10) || 1;
  const now = new Date();
  const baseTerms = resolveTermsFromForms();

  activeQuoteState = {
    context: 'reservation',
    reservation,
    customer,
    project,
    crewAssignments,
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
    // Show reservation-based quote number in preview; no server reservation needed
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };
  initializedInfoAlignments = false;

  applyQuoteTogglePreferences(activeQuoteState);
  initializeQuoteBlockOffsets(activeQuoteState);
  initializeInfoAlignments(activeQuoteState);
  openQuoteModal();
  // Attach live update listeners once per session
  try { attachQuoteLiveListeners(); } catch (_) {}
}

// Open the same preview/export modal but limited to equipment and crew lists
export async function exportReservationChecklistPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  await ensurePackagesAvailable();

  const crewAssignments = collectReservationCrewAssignments(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, crewAssignments, project);
  const currencyLabel = t('reservations.create.summary.currency', 'SR');

  // In checklist mode, we don't need a unique quote sequence, but keep date/number for consistency
  const now = new Date();

  activeQuoteState = {
    context: 'reservationChecklist',
    reservation,
    customer,
    project,
    crewAssignments,
    totals,
    totalsDisplay,
    rentalDays,
    currencyLabel,
    checklistType: 'items',
    checklistNotes: '',
    projectCrew: [],
    projectExpenses: [],
    projectEquipment: [],
    // Start with info + items only (crew hidden initially)
    sections: new Set(['customerInfo','reservationInfo','projectInfo','notes','items']),
    sectionExpansions: buildDefaultSectionExpansions('reservationChecklist'),
    fields: buildDefaultFieldSelections('reservationChecklist'),
    // Checklist: no default terms; controlled by custom notes input instead
    terms: [],
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };
  initializedInfoAlignments = false;

  applyQuoteTogglePreferences(activeQuoteState);
  initializeQuoteBlockOffsets(activeQuoteState);
  initializeInfoAlignments(activeQuoteState);
  openQuoteModal();
  try { attachQuoteLiveListeners(); } catch (_) {}
}

export async function exportProjectPdf({ project }) {
  if (!project) {
    showToast(t('projects.toast.notFound', '⚠️ تعذر العثور على بيانات المشروع'));
    return;
  }

  // Ensure packages are available so package codes resolve like reservation PDF
  await ensurePackagesAvailable();

  let projectData = collectProjectQuoteData(project);
  const { project: resolvedProject } = projectData;
  if (!resolvedProject) {
    showToast(t('projects.toast.notFound', '⚠️ تعذر العثور على بيانات المشروع'));
    return;
  }

  // If equipment items are empty, try to refresh reservations from API (in case state is stale)
  try {
    const hasNoEquipmentItems = !Array.isArray(projectData.equipmentItems) || projectData.equipmentItems.length === 0;
    if (hasNoEquipmentItems && resolvedProject?.id != null) {
      await refreshReservationsFromApi({ project_id: resolvedProject.id });
      projectData = collectProjectQuoteData(resolvedProject);
    }
  } catch (error) {
    // Non-fatal: proceed with whatever data we have
    console.warn('[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state', error);
  }

  // Derive quote number from the project itself (digits only, no prefixes)
  const deriveProjectQuoteNumber = (proj) => {
    if (!proj) return '1';
    const candidates = [
      proj.projectCode,
      proj.project_code,
      proj.code,
      proj.id
    ];
    const first = candidates.find((v) => v != null && String(v).trim() !== '');
    const normalized = normalizeNumbers(String(first ?? '1'));
    const digitsOnly = normalized.replace(/\D+/g, '');
    return digitsOnly || normalized || '1';
  };
  const quoteNumber = deriveProjectQuoteNumber(resolvedProject);
  const sequence = Number.parseInt(quoteNumber, 10) || 1;
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
    // Unified lists that match reservation PDF rendering
    equipmentItems: projectData.equipmentItems || [],
    crewAssignments: projectData.crewAssignments || [],
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
  initializedInfoAlignments = false;

  applyQuoteTogglePreferences(activeQuoteState);
  initializeQuoteBlockOffsets(activeQuoteState);
  initializeInfoAlignments(activeQuoteState);
  openQuoteModal();
  try { attachQuoteLiveListeners(); } catch (_) {}
}
function getAlignmentOptionsForContext(context = 'reservation') {
  if (context === 'project') {
    return [
      { value: 'projectCustomer', label: t('projects.quote.sections.customer', 'بيانات العميل')} ,
      { value: 'projectDetails', label: t('projects.quote.sections.project', 'بيانات المشروع') },
    ];
  }
  return [
    { value: 'customer', label: t('reservations.quote.sections.customer', 'بيانات العميل') },
    { value: 'reservation', label: t('reservations.quote.sections.reservation', 'تفاصيل الحجز') },
    { value: 'project', label: t('reservations.quote.sections.project', 'بيانات المشروع') },
  ];
}

function refreshAlignmentOptions() {
  if (!quoteModalRefs?.alignTarget) return;
  const context = activeQuoteState?.context || 'reservation';
  const options = getAlignmentOptionsForContext(context);
  const select = quoteModalRefs.alignTarget;
  const previous = select.value;
  select.innerHTML = options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('');
  if (options.some((option) => option.value === previous)) {
    select.value = previous;
  } else {
    select.value = options[0]?.value || '';
  }
  updateInfoAlignmentControls();
}
