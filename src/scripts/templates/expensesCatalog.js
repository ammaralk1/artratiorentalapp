export const EXPENSE_TEMPLATE_GROUPS = [
  {
    key: 'creative',
    titleEn: 'CREATIVE LEAD',
    titleAr: 'الإبداع والقيادة',
    totalLabelEn: 'Total Creative Lead',
    totalLabelAr: 'مجموع الإبداع والقيادة',
    categories: [
      {
        code: '01-00',
        labelEn: 'ABOVE THE LINE',
        labelAr: 'المصاريف الإبداعية الرئيسية',
        notes: 'Producer, Director, Writer, Main Cast',
        keywords: [
          'producer', 'executive producer', 'director', 'writer', 'screenwriter', 'creative director',
          'talent', 'cast', 'actor', 'actress', 'model',
          'منتج', 'مخرج', 'كاتب', 'موهبة', 'ممثل', 'ممثلة', 'موديل',
        ],
      },
    ],
  },
  {
    key: 'crew',
    titleEn: 'PRODUCTION DEPARTMENTS',
    titleAr: 'أقسام التنفيذ',
    totalLabelEn: 'Total Production Departments',
    totalLabelAr: 'مجموع أقسام التنفيذ',
    categories: [
      {
        code: '02-00',
        labelEn: 'PRODUCTION CREW',
        labelAr: 'فريق الإنتاج',
        notes: 'Production manager, coordinator, assistants',
        keywords: [
          'production manager', 'line producer', 'production coordinator', 'coordinator', 'production assistant',
          'assistant director', 'unit manager', 'floor manager', 'runner', 'production',
          'مدير انتاج', 'مدير إنتاج', 'منسق انتاج', 'منسق إنتاج', 'مساعد انتاج', 'مساعد إنتاج', 'مساعد مخرج', 'إنتاج',
        ],
      },
      {
        code: '03-00',
        labelEn: 'CAMERA DEPARTMENT',
        labelAr: 'قسم الكاميرا',
        notes: 'DoP, camera operator, ACs, DIT',
        keywords: [
          'dop', 'director of photography', 'camera', 'camera operator', 'focus puller', '1st ac', '2nd ac',
          'assistant camera', 'dit', 'video assist', 'steadicam', 'lens',
          'مدير تصوير', 'كاميرا', 'كميرا', 'فوكس', 'فوكس بولر', 'مساعد كاميرا', 'مساعد كميرا', 'ديت', 'عدسة',
        ],
      },
      {
        code: '04-00',
        labelEn: 'LIGHTING DEPARTMENT',
        labelAr: 'قسم الإضاءة',
        notes: 'Gaffer, lighting crew',
        keywords: [
          'gaffer', 'lighting', 'light', 'electric', 'spark', 'best boy electric',
          'إضاءة', 'اضاءة', 'جافر', 'كهرباء',
        ],
      },
      {
        code: '05-00',
        labelEn: 'GRIP DEPARTMENT',
        labelAr: 'قسم الجريب',
        notes: 'Key grip, rigging, dolly, crane',
        keywords: [
          'grip', 'key grip', 'best boy grip', 'rigging', 'rigger', 'dolly', 'crane', 'jib',
          'جريب', 'غريب', 'ريغ', 'ريغينغ', 'دولي', 'كرين', 'جيب',
        ],
      },
      {
        code: '06-00',
        labelEn: 'SOUND DEPARTMENT',
        labelAr: 'قسم الصوت',
        notes: 'Sound mixer, boom operator',
        keywords: [
          'sound', 'sound mixer', 'boom', 'audio', 'recordist', 'sound design',
          'صوت', 'مهندس صوت', 'بووم', 'أوديو', 'تسجيل صوت',
        ],
      },
      {
        code: '07-00',
        labelEn: 'ART DEPARTMENT',
        labelAr: 'قسم الآرت',
        notes: 'Set design, props, decoration',
        keywords: [
          'art', 'art director', 'set design', 'set dresser', 'props', 'prop', 'decoration', 'decor', 'scenic',
          'آرت', 'ارت', 'ديكور', 'ديكورات', 'اكسسوار', 'إكسسوار', 'بروب', 'لوكيشن دريس',
        ],
      },
      {
        code: '08-00',
        labelEn: 'WARDROBE & MAKEUP',
        labelAr: 'الملابس والمكياج',
        notes: 'Styling, grooming, wardrobe',
        keywords: [
          'wardrobe', 'makeup', 'stylist', 'styling', 'hair', 'grooming', 'costume',
          'ملابس', 'مكياج', 'ستايلست', 'ستايلينغ', 'شعر', 'كوافير', 'أزياء',
        ],
      },
    ],
  },
  {
    key: 'operations',
    titleEn: 'OPERATIONS & SUPPORT',
    titleAr: 'التشغيل والدعم',
    totalLabelEn: 'Total Operations & Support',
    totalLabelAr: 'مجموع التشغيل والدعم',
    categories: [
      {
        code: '09-00',
        labelEn: 'EQUIPMENT RENTAL',
        labelAr: 'تأجير المعدات',
        notes: 'Camera, lenses, lights, grip, sound',
        keywords: [
          'equipment rental', 'equipment', 'camera rental', 'lens rental', 'light rental',
          'grip rental', 'sound rental', 'gear rental', 'drone rental',
          'تأجير معدات', 'تاجير معدات', 'معدات', 'تأجير كاميرا', 'تاجير كاميرا', 'تأجير عدسة', 'تاجير عدسة',
        ],
      },
      {
        code: '10-00',
        labelEn: 'LOCATIONS',
        labelAr: 'المواقع',
        notes: 'Studio, location fees, permits',
        keywords: [
          'location', 'locations', 'studio', 'studio rental', 'permit', 'permits', 'location fee', 'site fee',
          'موقع', 'مواقع', 'استديو', 'استوديو', 'تصريح', 'تصاريح', 'رسوم موقع',
        ],
      },
      {
        code: '11-00',
        labelEn: 'LOGISTICS',
        labelAr: 'اللوجستيات',
        notes: 'Transportation, fuel, parking',
        keywords: [
          'logistics', 'transport', 'transportation', 'driver', 'fuel', 'parking', 'courier', 'shipping',
          'truck', 'van', 'hotel', 'accommodation', 'purchase', 'purchases', 'consumable', 'consumables',
          'لوجستيات', 'نقل', 'مواصلات', 'سائق', 'وقود', 'بنزين', 'مواقف', 'شحن', 'فندق', 'سكن', 'مشتريات',
        ],
      },
      {
        code: '12-00',
        labelEn: 'CATERING',
        labelAr: 'الضيافة والوجبات',
        notes: 'Meals, water, coffee',
        keywords: [
          'catering', 'meal', 'meals', 'food', 'water', 'coffee', 'craft service',
          'ضيافة', 'وجبات', 'وجبة', 'طعام', 'ماء', 'موية', 'قهوة',
        ],
      },
      {
        code: '13-00',
        labelEn: 'PROTECTION / INSURANCE',
        labelAr: 'الحماية والتأمين',
        notes: 'Insurance, security, safety',
        keywords: [
          'insurance', 'security', 'safety', 'protection', 'medic', 'hse',
          'تأمين', 'امن', 'أمن', 'سلامة', 'حماية', 'اسعاف', 'إسعاف',
        ],
      },
    ],
  },
  {
    key: 'post',
    titleEn: 'POST & RESERVE',
    titleAr: 'ما بعد التنفيذ والاحتياطي',
    totalLabelEn: 'Total Post & Reserve',
    totalLabelAr: 'مجموع ما بعد التنفيذ والاحتياطي',
    categories: [
      {
        code: '14-00',
        labelEn: 'POST-PRODUCTION',
        labelAr: 'ما بعد الإنتاج',
        notes: 'Edit, color, sound, VFX',
        keywords: [
          'post', 'post production', 'edit', 'editing', 'editor', 'color', 'grading', 'vfx', 'motion graphics',
          'voice over', 'mix', 'mastering',
          'مونتاج', 'تحرير', 'محرر', 'تصحيح ألوان', 'تلوين', 'في اف اكس', 'فويس اوفر', 'فويس أوفر', 'مكساج',
        ],
      },
      {
        code: '15-00',
        labelEn: 'CONTINGENCY',
        labelAr: 'احتياطي',
        notes: 'Usually 5–15%',
        keywords: [
          'contingency', 'reserve', 'buffer',
          'احتياطي', 'هامش', 'مخصص طوارئ',
        ],
      },
    ],
  },
];

export const EXPENSE_TEMPLATE_CATEGORIES = EXPENSE_TEMPLATE_GROUPS.flatMap((group) =>
  group.categories.map((category) => ({
    ...category,
    groupKey: group.key,
    groupTitleEn: group.titleEn,
    groupTitleAr: group.titleAr,
    groupTotalLabelEn: group.totalLabelEn,
    groupTotalLabelAr: group.totalLabelAr,
  })),
);

export const EXPENSE_TEMPLATE_SUBGROUP_CODES = EXPENSE_TEMPLATE_CATEGORIES.map((category) => category.code);

function normalizeLookupText(value = '') {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[._/-]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function categoryMatches(label, category) {
  const normalized = normalizeLookupText(label);
  return category.keywords.some((keyword) => normalized.includes(normalizeLookupText(keyword)));
}

export function classifyExpenseTemplateCategory(label, fallbackCode = '02-00') {
  const match = EXPENSE_TEMPLATE_CATEGORIES.find((category) => categoryMatches(label, category));
  return match?.code || fallbackCode;
}

export function getExpenseTemplateCategoryByCode(code) {
  return EXPENSE_TEMPLATE_CATEGORIES.find((category) => category.code === code) || null;
}
