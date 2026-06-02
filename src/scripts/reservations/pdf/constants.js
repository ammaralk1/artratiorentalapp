import quoteLogoUrl from '../../../assets/ART-RATIO-LGWG.png?url';
// Font URLs (served from public/fonts) resolved by Vite for reliable loading in preview/export windows
import taj400Url from '/assets/Tajawal-400.ttf?url';
import taj500Url from '/assets/Tajawal-500.ttf?url';
import taj700Url from '/assets/Tajawal-700.ttf?url';

export const QUOTE_SEQUENCE_STORAGE_KEY = 'reservations.quote.sequence';
export const QUOTE_TOGGLE_PREFS_STORAGE_KEYS = {
  reservation: 'reservations.quote.togglePrefs.v1',
  project: 'projects.quote.togglePrefs.v1',
  reservationChecklist: 'reservations.checklist.togglePrefs.v1'
};
export const QUOTE_TROUBLESHOOT_URL = 'https://help.artratio.sa/guide/quote-preview';
export const LEGACY_SIRV_BASE = 'https://art-ratio.sirv.com';
export const CLOUDFLARE_ASSETS_BASE = 'https://assets.art-ratio.com';

export function normalizeCloudflareAssetUrl(value = '') {
  const url = String(value || '').trim();
  if (!url) return '';
  if (url.startsWith(LEGACY_SIRV_BASE)) {
    return `${CLOUDFLARE_ASSETS_BASE}${url.slice(LEGACY_SIRV_BASE.length)}`;
  }
  return url;
}

export function resolveQuoteLogoUrl(value = '') {
  const normalized = normalizeCloudflareAssetUrl(value);
  if (normalized === 'https://assets.art-ratio.com/AR-Logo-v3.5-curved.png') {
    return QUOTE_DEFAULT_LOGO_URL;
  }
  if (normalized === 'https://assets.art-ratio.com/AR%20Logo%20v3.5%20curved%20WH.png') {
    return QUOTE_DEFAULT_LOGO_URL;
  }
  return normalized || QUOTE_DEFAULT_LOGO_URL;
}

export const QUOTE_DEFAULT_LOGO_URL = quoteLogoUrl;

export const QUOTE_COMPANY_INFO = {
  logoUrl: QUOTE_DEFAULT_LOGO_URL,
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  commercialRegistry: '4030485240',
  beneficiaryName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  bankName: 'مصرف الراجحي',
  accountNumber: '358000010006086065706',
  iban: 'SA1680000358608016065706',
  approvalNote: 'الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام.'
};

export const QUOTE_TERMS = [
  'يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.',
  'يمنع استخدام المعدات في أنشطة غير قانونية.',
  'يتحمل المستأجر مسؤولية أي تلف أو فقدان.',
  'يجب إعادة المعدات في حالتها الأصلية.',
  'يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة.'
];

export const DEFAULT_TERMS = [...QUOTE_TERMS];
export const PROJECT_QUOTE_TERMS = [
  'يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.',
  'يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.',
  'يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.',
  'العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.',
  'تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.',
  'يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم.'
];

export const QUOTE_SECTION_DEFS = [
  { id: 'customerInfo', labelKey: 'reservations.quote.sections.customer', fallback: 'بيانات العميل', defaultSelected: true },
  { id: 'reservationInfo', labelKey: 'reservations.quote.sections.reservation', fallback: 'تفاصيل الحجز', defaultSelected: true },
  { id: 'projectInfo', labelKey: 'reservations.quote.sections.project', fallback: 'بيانات المشروع', defaultSelected: true },
  { id: 'items', labelKey: 'reservations.quote.sections.items', fallback: 'قائمة المعدات', defaultSelected: true },
  { id: 'crew', labelKey: 'reservations.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true },
  { id: 'financialSummary', labelKey: 'reservations.quote.sections.financial', fallback: 'الملخص المالي', defaultSelected: true },
  { id: 'notes', labelKey: 'reservations.quote.sections.notes', fallback: 'ملاحظات الحجز', defaultSelected: true },
  // جعل بيانات الدفع اختيارية من خلال المعاينة
  { id: 'payment', labelKey: 'reservations.quote.sections.payment', fallback: 'بيانات الدفع', defaultSelected: false }
];

export const PROJECT_QUOTE_SECTION_DEFS = [
  { id: 'customerInfo', labelKey: 'projects.quote.sections.customer', fallback: 'بيانات العميل', defaultSelected: true },
  { id: 'projectInfo', labelKey: 'projects.quote.sections.project', fallback: 'بيانات المشروع', defaultSelected: true },
  { id: 'projectExpenses', labelKey: 'projects.quote.sections.expenses', fallback: 'الخدمات الإنتاجية', defaultSelected: true },
  { id: 'projectEquipment', labelKey: 'projects.quote.sections.equipment', fallback: 'المعدات', defaultSelected: true },
  { id: 'projectCrew', labelKey: 'projects.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true },
  { id: 'financialSummary', labelKey: 'projects.quote.sections.financial', fallback: 'الملخص المالي', defaultSelected: true },
  { id: 'projectNotes', labelKey: 'projects.quote.sections.notes', fallback: 'ملاحظات المشروع', defaultSelected: true },
  // خيار إظهار/إخفاء بيانات الدفع في معاينة المشروع
  { id: 'payment', labelKey: 'reservations.quote.sections.payment', fallback: 'بيانات الدفع', defaultSelected: false }
];

export const HTML2PDF_SRC = 'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';
export const HTML2CANVAS_SRC = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
export const JSPDF_SRC = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';

export const PDF_FONT_FACE = `
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 400; font-display: swap; src: url(${JSON.stringify(taj400Url)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 500; font-display: swap; src: url(${JSON.stringify(taj500Url)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 600; font-display: swap; src: url(${JSON.stringify(taj700Url)}) format('truetype'); }
@font-face { font-family: 'Tajawal'; font-style: normal; font-weight: 700; font-display: swap; src: url(${JSON.stringify(taj700Url)}) format('truetype'); }
`;

export const SVG_DATA_URI_REGEX = /^data:image\/svg\+xml/i;
export const SVG_EXTENSION_REGEX = /\.svg($|[?#])/i;
export const SVG_FALLBACK_DIMENSION = 512;
export const TRANSPARENT_PIXEL_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=';

// Render A4 pages at their physical size in the preview (96 DPI assumption).
export const CSS_DPI = 96;
export const MM_PER_INCH = 25.4;
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;
export const A4_WIDTH_PX = Math.round((A4_WIDTH_MM / MM_PER_INCH) * CSS_DPI);
export const A4_HEIGHT_PX = Math.round((A4_HEIGHT_MM / MM_PER_INCH) * CSS_DPI);

export const SAFARI_USER_AGENT_REGEX = /safari/i;
export const IOS_PLATFORM_REGEX = /(iphone|ipad|ipod)/i;
export const IOS_SAFARI_REGEX = /(iphone|ipad|ipod)/i;
export const IOS_SAFARI_EXCLUDED_BROWSERS_REGEX = /(crios|fxios|edgios|opios)/i;
export const PAGE_SEGMENT_MAX_HEIGHT_PX = Math.round((A4_HEIGHT_MM / MM_PER_INCH) * CSS_DPI);
export const PDF_LOG_PREFIX = '[reservations/pdf]';

export const ARABIC_RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
