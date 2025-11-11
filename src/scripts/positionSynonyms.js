// Position synonyms (Arabic/English) to broaden matching across datasets
// We export an expandPositionQuery(name) that returns additional strings to try

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '') // strip Arabic diacritics
    .replace(/[\.\-_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Define synonym groups. Keys are arbitrary role ids; values are arrays of synonyms.
const GROUPS = {
  producer: [
    'producer', 'prod', 'line producer', 'executive producer', 'associate producer',
    'منتج', 'المنتج', 'منتج منفذ', 'منتج مشارك', 'منتج خطي'
  ],
  director: [
    'director', 'film director', 'مخرج', 'المخرج'
  ],
  dop: [
    'dop', 'd o p', 'director of photography', 'cinematographer', 'مدير تصوير', 'مدير التصوير', 'مدير تصوير سينمائي'
  ],
  camera_operator: [
    'camera operator', 'camera-op', 'cameraman', 'videographer', 'مشغل كاميرا', 'المصور', 'مصور فيديو'
  ],
  first_ac: [
    '1st ac', 'first ac', 'first assistant camera', 'focus puller', 'fo puller', 'focus-puller',
    'مساعد مصور اول', 'مساعد مصور أول', 'ساحب فوكس'
  ],
  second_ac: [
    '2nd ac', 'second ac', 'second assistant camera', 'clapper loader', 'loader',
    'مساعد مصور ثاني', 'الكلاپر', 'لوودر', 'لودر'
  ],
  gaffer: [
    'gaffer', 'chief lighting technician', 'مدير اضاءة', 'مدير إضاءة', 'كبير فنيي الاضاءة', 'كبير فنيي الإضاءة'
  ],
  best_boy_electric: [
    'best boy electric', 'assistant gaffer', 'best boy', 'مساعد جافر', 'نائب مدير الاضاءة', 'نائب مدير الإضاءة'
  ],
  electrician: [
    'electrician', 'spark', 'sparks', 'فني كهرباء', 'سبارك'
  ],
  key_grip: [
    'key grip', 'chief grip', 'رئيس جرب', 'رئيس الجرب', 'كبير الفنيين الميكانيكيين'
  ],
  best_boy_grip: [
    'best boy grip', 'assistant key grip', 'نائب رئيس الجرب', 'مساعد كاي جرب'
  ],
  grip: [
    'grip', 'grips', 'rigger', 'rigging', 'ميكانيكي', 'ريجر'
  ],
  sound_mixer: [
    'production sound mixer', 'sound mixer', 'mixer', 'مهندس صوت', 'ميكسر صوت'
  ],
  boom_operator: [
    'boom operator', 'boom op', 'boom', 'حامل البوم', 'فني مايك', 'بووم'
  ],
  sound_assistant: [
    'sound assistant', 'assistant sound', 'فني صوت مساعد'
  ],
  script_supervisor: [
    'script supervisor', 'continuity', 'script', 'سكربت', 'مسجل السيناريو', 'كونتينويتي'
  ],
  location_manager: [
    'location manager', 'لوكيشن مانجر', 'مدير مواقع', 'مسؤول مواقع', 'مدير اللوكيشن'
  ],
  first_ad: [
    '1st assistant director', 'first assistant director', '1st ad', '1 ad', 'assistant director',
    'مساعد مخرج', 'مساعد مخرج اول', 'مساعد مخرج أول'
  ],
  second_ad: [
    '2nd assistant director', 'second assistant director', '2nd ad', 'second ad',
    'مساعد مخرج ثاني'
  ],
  production_manager: [
    'production manager', 'pm', 'مدير انتاج', 'مدير إنتاج'
  ],
  production_coordinator: [
    'production coordinator', 'pc', 'منسق انتاج', 'منسق إنتاج'
  ],
  production_assistant: [
    'production assistant', 'pa', 'runner', 'production runner', 'مساعد انتاج', 'مساعد إنتاج', 'عداء'
  ],
  art_director: [
    'art director', 'مدير فني', 'آرت دايركتور'
  ],
  production_designer: [
    'production designer', 'مصمم الانتاج', 'مصمم الإنتاج', 'مصمم الديكور'
  ],
  props_master: [
    'props master', 'property master', 'رئيس الاكسسوار', 'رئيس الإكسسوار', 'مسؤول الاكسسوارات', 'مسؤول الإكسسوارات'
  ],
  set_dresser: [
    'set dresser', 'dressing', 'مجهز ديكور', 'فني ديكور'
  ],
  wardrobe: [
    'wardrobe', 'costume designer', 'مصمم ازياء', 'مصمم أزياء', 'مسؤول ملابس'
  ],
  makeup_artist: [
    'makeup artist', 'makeup', 'mua', 'خبير تجميل', 'ماكيير', 'مكياج'
  ],
  hair_stylist: [
    'hair stylist', 'hair', 'مصفف شعر'
  ],
  colorist: [
    'colorist', 'grading', 'grader', 'تلوين', 'مصحح الوان', 'مصحح ألوان', 'جريدينج', 'جريدينغ'
  ],
  editor: [
    'editor', 'video editor', 'مونتير', 'محرر فيديو'
  ],
  vfx: [
    'vfx', 'visual effects', 'مؤثرات بصرية'
  ],
  dit: [
    'dit', 'digital imaging technician', 'فني صورة رقمي', 'دي اي تي', 'دي آي تي'
  ],
  data_wrangler: [
    'data wrangler', 'data manager', 'loader data', 'نسخ بيانات', 'مسؤول بيانات'
  ],
  steadicam_operator: [
    'steadicam operator', 'steadicam', 'steadycam', 'مشغل ستييديكام', 'مشغل ستيكديام', 'مشغل ستيديكام'
  ],
  gimbal_operator: [
    'gimbal operator', 'gimbal', 'ronin operator', 'ronin', 'مشغل جيمبال', 'مشغل رونين'
  ],
  drone_operator: [
    'drone operator', 'drone op', 'uav pilot', 'drone pilot', 'مشغل درون', 'طيار درون', 'طيار مسيرة'
  ],
  photographer: [
    'photographer', 'stills photographer', 'still photographer', 'مصوّر فوتوغرافي', 'مصور فوتوغرافي', 'فوتوغرافر'
  ],
  bts_photographer: [
    'bts photographer', 'behind the scenes photographer', 'bts', 'مصور كواليس'
  ],
  teleprompter: [
    'teleprompter operator', 'teleprompter', 'prompt operator', 'مشغل تليبرومبتر', 'مشغل تلقين'
  ],
  driver: [
    'driver', 'سائق'
  ],
  lighting_technician: [
    'lighting technician', 'lighting tech', 'electric', 'فني اضاءة', 'فني إضاءة'
  ],
};

// Build alias -> set of equivalents
const ALIASES = (() => {
  const m = new Map();
  Object.values(GROUPS).forEach((list) => {
    const norms = Array.from(new Set(list.map(norm)));
    norms.forEach((a) => {
      const set = new Set(norms);
      set.delete(a);
      m.set(a, set);
    });
  });
  return m;
})();

export function expandPositionQuery(name) {
  const key = norm(name);
  if (!key) return [];
  const set = ALIASES.get(key);
  return set ? Array.from(set) : [];
}

export default { expandPositionQuery };

