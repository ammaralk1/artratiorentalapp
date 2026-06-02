import { state } from './state.js';
import {
  QUOTE_SECTION_DEFS,
  PROJECT_QUOTE_SECTION_DEFS,
} from './constants.js';
import { escapeHtml, normalizePackageNameForMatch } from './utils.js';
import { formatCurrencyValue } from './financial.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { getCurrentLanguage, t } from '../../language.js';

export const QUOTE_ITEMS_COLUMN_DEFS = [
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
    fallback: 'سعر الوحدة',
    render: (item) => escapeHtml(normalizeNumbers((Number(item?.unitPriceValue || 0)).toFixed(2)))
  },
  {
    id: 'price',
    labelKey: 'reservations.quote.columns.total',
    fallback: 'المجموع',
    render: (item) => escapeHtml(normalizeNumbers((Number(item?.price || 0)).toFixed(2)))
  }
];

export const QUOTE_CREW_COLUMN_DEFS = [
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
    fallback: 'سعر الوحدة',
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

export const QUOTE_FIELD_DEFS = {
  customerInfo: [
    { id: 'customerName', labelKey: 'reservations.details.labels.customer', fallback: 'العميل' },
    { id: 'customerCompany', labelKey: 'reservations.details.labels.company', fallback: 'الشركة' },
    { id: 'customerPhone', labelKey: 'reservations.details.labels.phone', fallback: 'الهاتف' },
    { id: 'customerEmail', labelKey: 'reservations.details.labels.email', fallback: 'البريد' }
  ],
  reservationInfo: [
    { id: 'reservationStart', labelKey: 'reservations.details.labels.start', fallback: 'بداية الحجز' },
    { id: 'reservationEnd', labelKey: 'reservations.details.labels.end', fallback: 'نهاية الحجز' },
    { id: 'reservationDuration', labelKey: 'reservations.details.labels.duration', fallback: 'عدد الأيام' }
  ],
  projectInfo: [
    { id: 'projectTitle', labelKey: 'projects.details.labels.projectTitle', fallback: 'اسم المشروع' }
  ],
  financialSummary: [
    // خيارات الملخص المالي المعروضة في قسم الحجز
    { id: 'discountAmount', labelKey: 'reservations.details.labels.discount', fallback: 'الخصم' },
    { id: 'subtotalBeforeTax', labelKey: 'reservations.quote.labels.total', fallback: 'المجموع' },
    { id: 'taxAmount', labelKey: 'reservations.details.labels.tax', fallback: 'الضريبة' },
    { id: 'companyShareAmount', labelKey: 'projects.details.summary.companyOverhead', fallback: 'المصاريف التشغيلية' },
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
    { id: 'equipmentSubtotal', labelKey: 'reservations.quote.totals.equipment', fallback: 'إجمالي المعدات' }
  ],
  crew: [
    ...QUOTE_CREW_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'quantity', labelKey: 'reservations.details.table.headers.quantity', fallback: 'الكمية' },
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'crewSubtotal', labelKey: 'reservations.quote.totals.crew', fallback: 'إجمالي طاقم العمل' }
  ]
};

export const PROJECT_CREW_COLUMN_DEFS = [
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

export const PROJECT_EXPENSES_COLUMN_DEFS = [
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
    id: 'days',
    labelKey: 'reservations.details.table.headers.days',
    fallback: 'الأيام',
    render: (expense) => {
      const days = Number(expense?.days ?? expense?.service_days ?? expense?.serviceDays ?? 1);
      const safeDays = Number.isFinite(days) && days > 0 ? days : 1;
      return escapeHtml(normalizeNumbers(String(safeDays)));
    }
  },
  {
    id: 'note',
    labelKey: null,
    fallback: 'ملاحظات',
    render: (expense) => escapeHtml(expense?.note || '-')
  }
];

export const PROJECT_EQUIPMENT_COLUMN_DEFS = [
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

export const PROJECT_QUOTE_FIELD_DEFS = {
  customerInfo: QUOTE_FIELD_DEFS.customerInfo,
  projectInfo: [
    { id: 'projectTitle', labelKey: 'projects.details.labels.projectTitle', fallback: 'اسم المشروع' },
    { id: 'projectType', labelKey: 'projects.details.type', fallback: 'نوع المشروع' },
    { id: 'projectStart', labelKey: 'projects.details.start', fallback: 'بداية المشروع' },
    { id: 'projectEnd', labelKey: 'projects.details.end', fallback: 'نهاية المشروع' },
    { id: 'projectDuration', labelKey: 'projects.details.duration', fallback: 'مدة المشروع' },
    { id: 'projectStatus', labelKey: 'projects.details.status', fallback: 'حالة المشروع' }
  ],
  financialSummary: [
    { id: 'reservationsTotal', labelKey: 'reservations.quote.labels.total', fallback: 'المجموع' },
    { id: 'discountAmount', labelKey: 'projects.details.summary.discount', fallback: 'الخصم' },
    { id: 'companyShareAmount', labelKey: 'projects.details.summary.companyOverhead', fallback: 'المصاريف التشغيلية' },
    { id: 'taxAmount', labelKey: 'projects.details.summary.combinedTax', fallback: 'الضريبة' },
    { id: 'overallTotal', labelKey: 'projects.details.summary.overallTotal', fallback: 'الإجمالي الكلي' },
    // removed: projectSubtotal, expensesTotal, paidAmount, remainingAmount from toggles per request
  ],
  payment: QUOTE_FIELD_DEFS.payment,
  projectExpenses: [
    ...PROJECT_EXPENSES_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'total', labelKey: 'reservations.quote.columns.total', fallback: 'المجموع' },
    { id: 'productionServicesSubtotal', labelKey: 'reservations.quote.totals.productionServices', fallback: 'إجمالي الخدمات الإنتاجية' }
  ],
  projectCrew: [
    // Use reservation-style crew columns (position/unit/price), plus quantity + days, and subtotal toggle
    ...QUOTE_CREW_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'quantity', labelKey: 'reservations.details.table.headers.quantity', fallback: 'الكمية' },
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'crewSubtotal', labelKey: 'reservations.quote.totals.crew', fallback: 'إجمالي طاقم العمل' }
  ],
  projectEquipment: [
    // Use reservation-style items columns (code/desc/unit/qty/price), plus days, and subtotal toggle
    ...QUOTE_ITEMS_COLUMN_DEFS.map(({ id, labelKey, fallback }) => ({ id, labelKey, fallback })),
    { id: 'days', labelKey: 'reservations.details.table.headers.days', fallback: 'الأيام' },
    { id: 'equipmentSubtotal', labelKey: 'reservations.quote.totals.equipment', fallback: 'إجمالي المعدات' }
  ],
  projectNotes: []
};

export const QUOTE_CONFIG_CACHE = new Map();

export function getQuoteConfig(context = 'reservation') {
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

export function getQuoteSectionDefs(context = 'reservation') {
  return getQuoteConfig(context).sectionDefs;
}

export function getQuoteFieldDefs(context = 'reservation') {
  return getQuoteConfig(context).fieldDefs;
}

export function getQuoteSectionIdSet(context = 'reservation') {
  return getQuoteConfig(context).sectionIdSet;
}

export function getQuoteFieldIdMap(context = 'reservation') {
  return getQuoteConfig(context).fieldIdMap;
}

export function getQuoteStatusMessage(type) {
  switch (type) {
    case 'export':
      return t('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...');
    case 'render':
    default:
      return t('reservations.quote.status.rendering', 'جاري تحديث المعاينة...');
  }
}

export function buildDefaultFieldSelections(context = 'reservation') {
  const selections = {};
  const fieldDefs = getQuoteFieldDefs(context);
  Object.entries(fieldDefs).forEach(([sectionId, fields = []]) => {
    selections[sectionId] = new Set(fields.filter((field) => field?.default !== false).map((field) => field.id));
  });
  return selections;
}

export function cloneFieldSelections(originalSelections = {}) {
  const clone = {};
  Object.entries(originalSelections).forEach(([sectionId, set]) => {
    clone[sectionId] = new Set(Array.from(set || []));
  });
  return clone;
}

export function getFieldSelectionSet(selections = {}, sectionId) {
  if (!sectionId) return undefined;
  if (!selections[sectionId]) {
    selections[sectionId] = new Set();
  }
  return selections[sectionId];
}

export function isFieldEnabledInSelections(selections = {}, sectionId, fieldId) {
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

export function buildDefaultSectionExpansions(context = 'reservation') {
  return Object.fromEntries(getQuoteSectionDefs(context).map(({ id }) => [id, false]));
}

export function ensureSectionExpansionState(stateObj, sectionId) {
  if (!stateObj.sectionExpansions) {
    stateObj.sectionExpansions = buildDefaultSectionExpansions(stateObj.context || 'reservation');
  }
  if (sectionId && typeof stateObj.sectionExpansions[sectionId] !== 'boolean') {
    stateObj.sectionExpansions[sectionId] = false;
  }
  return stateObj.sectionExpansions;
}

export function isSectionExpanded(stateObj, sectionId) {
  const expansions = ensureSectionExpansionState(stateObj, sectionId);
  return expansions?.[sectionId] !== false;
}
