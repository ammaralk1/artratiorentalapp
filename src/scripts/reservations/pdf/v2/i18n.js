export const QUOTE_V2_LANGUAGES = ['ar', 'en'];

const dictionaries = {
  ar: {
    quoteTitle: 'عرض سعر',
    equipmentChecklistTitle: 'قائمة المعدات',
    crewChecklistTitle: 'قائمة الفريق الفني',
    combinedChecklistTitle: 'قائمة المعدات والطاقم الفني',
    projectNumber: 'رقم المشروع',
    reservationNumber: 'رقم الحجز',
    date: 'التاريخ',
    clientInfo: 'بيانات العميل',
    projectInfo: 'بيانات المشروع',
    reservationInfo: 'تفاصيل الحجز',
    equipment: 'المعدات',
    crew: 'طاقم العمل',
    productionServices: 'الخدمات الإنتاجية',
    equipmentTotal: 'إجمالي المعدات',
    crewTotal: 'إجمالي طاقم العمل',
    productionServicesTotal: 'إجمالي الخدمات الإنتاجية',
    financialSummary: 'الملخص المالي',
    paymentDetails: 'بيانات الدفع',
    terms: 'الشروط العامة',
    approvalNote: 'الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام.',
    client: 'العميل',
    company: 'شركة العميل',
    phone: 'رقم العميل',
    email: 'البريد الإلكتروني',
    projectType: 'نوع المشروع',
    projectTitle: 'اسم المشروع',
    projectCode: 'رقم المشروع',
    start: 'البداية',
    end: 'النهاية',
    duration: 'المدة',
    status: 'الحالة',
    code: 'الكود',
    description: 'الوصف',
    quantity: 'الكمية',
    days: 'الأيام',
    unitPrice: 'سعر الوحدة',
    price: 'السعر',
    total: 'المجموع',
    position: 'المنصب',
    service: 'الخدمة',
    notes: 'ملاحظات',
    projectNotes: 'ملاحظات المشروع',
    reservationNotes: 'ملاحظات الحجز',
    subtotalBeforeTax: 'الإجمالي قبل الضريبة',
    tax: 'إجمالي الضريبة (15%)',
    grandTotal: 'الإجمالي الكلي',
    discount: 'الخصم',
    overhead: 'المصاريف التشغيلية',
    beneficiary: 'اسم المستفيد',
    bank: 'اسم البنك',
    account: 'رقم الحساب',
    iban: 'رقم الآيبان',
    noData: 'لا توجد بيانات للعرض.',
  },
  en: {
    quoteTitle: 'Quotation',
    equipmentChecklistTitle: 'Equipment List',
    crewChecklistTitle: 'Crew List',
    combinedChecklistTitle: 'Equipment & Crew List',
    projectNumber: 'Project No.',
    reservationNumber: 'Reservation No.',
    date: 'Date',
    clientInfo: 'Client Information',
    projectInfo: 'Project Information',
    reservationInfo: 'Reservation Details',
    equipment: 'Equipment',
    crew: 'Crew',
    productionServices: 'Production Services',
    equipmentTotal: 'Equipment Total',
    crewTotal: 'Crew Total',
    productionServicesTotal: 'Production Services Total',
    financialSummary: 'Financial Summary',
    paymentDetails: 'Payment Details',
    terms: 'General Terms',
    approvalNote: 'Approval of this quotation is considered acceptance of all terms and conditions.',
    client: 'Client',
    company: 'Client Company',
    phone: 'Client Phone',
    email: 'Email',
    projectType: 'Project Type',
    projectTitle: 'Project Name',
    projectCode: 'Project No.',
    start: 'Start',
    end: 'End',
    duration: 'Duration',
    status: 'Status',
    code: 'Code',
    description: 'Description',
    quantity: 'Quantity',
    days: 'Days',
    unitPrice: 'Unit Price',
    price: 'Price',
    total: 'Total',
    position: 'Position',
    service: 'Service',
    notes: 'Notes',
    projectNotes: 'Project Notes',
    reservationNotes: 'Reservation Notes',
    subtotalBeforeTax: 'Total Before VAT',
    tax: 'VAT Total (15%)',
    grandTotal: 'Grand Total',
    discount: 'Discount',
    overhead: 'Operating Overhead',
    beneficiary: 'Beneficiary Name',
    bank: 'Bank Name',
    account: 'Account No.',
    iban: 'IBAN',
    noData: 'No data to display.',
  },
};

export const quoteV2Terms = {
  reservation: {
    ar: [
      'يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.',
      'يمنع استخدام المعدات في أنشطة غير قانونية.',
      'يتحمل المستأجر مسؤولية أي تلف أو فقدان.',
      'يجب إعادة المعدات في حالتها الأصلية.',
      'يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة.',
    ],
    en: [
      'A working day is 12 hours. An additional half day is charged after 20 hours, followed by a full day after that.',
      'Equipment may not be used for illegal activities.',
      'The renter is responsible for any damage or loss.',
      'Equipment must be returned in its original condition.',
      'Cancellation fees apply if cancellation is not reported at least 24 hours in advance.',
    ],
  },
  project: {
    ar: [
      'يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.',
      'يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.',
      'يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.',
      'العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.',
      'تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.',
      'يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير.',
    ],
    en: [
      '50% of the project value is due upon quotation approval, and the remaining 50% is due before final delivery.',
      'The client receives usage rights for the final version, while raw materials remain archived by the company unless otherwise agreed.',
      'A production timeline will be agreed upon. Additional changes outside the agreed scope are subject to extra fees.',
      'The client is responsible for providing required filming permits for selected locations. Permit-related delays may affect delivery dates.',
      'Final project materials are archived for 12 months, during which the client may request additional copies.',
      'The client is responsible for providing a safe working environment for the crew and equipment on location.',
    ],
  },
};

export function normalizeQuoteV2Language(value) {
  return value === 'en' ? 'en' : 'ar';
}

export function getQuoteV2Direction(language) {
  return normalizeQuoteV2Language(language) === 'en' ? 'ltr' : 'rtl';
}

export function quoteV2Text(language, key) {
  const lang = normalizeQuoteV2Language(language);
  return dictionaries[lang]?.[key] ?? dictionaries.ar[key] ?? key;
}

export function getQuoteV2DefaultTerms(context, language) {
  const contextKey = context === 'project' ? 'project' : 'reservation';
  const lang = normalizeQuoteV2Language(language);
  return [...(quoteV2Terms[contextKey]?.[lang] || quoteV2Terms[contextKey]?.ar || [])];
}
