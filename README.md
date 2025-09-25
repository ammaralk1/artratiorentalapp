# Art Ratio App V2

هذا المشروع تم إعادة ترتيبه لاستخدام بيئة بناء حديثة تعتمد على **Vite** مع بنية مصادر أوضح لتسهيل التطوير المستقبلي.

## المتطلبات

- Node.js 18 أو أحدث
- npm 9 أو أحدث

## خطوات البدء

```bash
npm install
npm run dev
```

- الأمر `npm run dev` يشغل خادم Vite المحلي على `http://localhost:5173` ويفتح لوحة التحكم (`src/pages/dashboard.html`).
- استخدم `npm run build` لإنشاء ملفات الإنتاج داخل مجلد `dist/`، ثم `npm run preview` لاختبار الخرج.

## هيكل المجلدات

```
src/
  main.js             # نقطة الدخول الرئيسية للتطبيق
  pages/              # ملفات HTML لكل صفحة (لوحة التحكم، تسجيل الدخول، العملاء، الفنيين)
  scripts/            # الوحدات المنطقية والتراجم
    reservationsUI.js           # منسق حجوزات رئيسي يربط أجزاء الصفحة
    reservationsEquipment.js    # دوال مساعدة للتعامل مع معدات الحجز
    reservationsTechnicians.js  # وحدة مستقلة لإدارة اختيار الطاقم
    reservationsSummary.js      # حساب وعرض ملخصات الحجوزات
    reservationsFilters.js      # منطق فلاتر الحجوزات ونطاقات التواريخ
    reservationsList.js         # تصفية الحجوزات وبناء واجهة القائمة والتفاصيل
    reservationsShared.js       # دوال مشتركة (تنسيق النص، حالة الحجز)
  styles/
    index.css         # ملف التجميع الرئيسي
    core.css          # المتغيرات الأساسية والمكونات المشتركة
    reservations.css  # أنماط واجهة الحجوزات والطاقم
    reports.css       # أنماط لوحة التقارير
    maintenance.css   # أنماط إدارة الصيانة
    tabs.css          # أنماط التبويبات والتبويبات الفرعية
    calendar.css      # أنماط عرض التقويم ونوافذ التفاصيل
    forms.css         # أنماط نماذج الإدارة والقوائم
public/               # ملفات ثابتة اختيارية (غير مستخدمة حالياً)
vite.config.js        # إعدادات Vite مع نقاط دخول متعددة
package.json          # تعريف الحزم وأوامر npm
```

### تنظيم منطق الحجوزات (Reservation Modules)

بعد التفكيك الأخير تم توزيع مسؤوليات الحجوزات على ثلاث وحدات مترابطة داخل `src/scripts/reservations/`:

- `reservations/controller.js` يتعامل مع طبقة التحكم (تحميل البيانات من التخزين، تنفيذ إجراءات الحذف/التأكيد، تجهيز سياق التعديل، وتسجيل الدوال على `window` عند الحاجة للتكامل مع HTML الحالي).
- `reservations/events.js` مسؤول عن تهيئة واجهة الحجوزات عند `DOMContentLoaded`؛ يقوم بربط فلاتر البحث، تهيئة Flatpickr، توصيل اختيار الفنيين، واستدعاء `controller.registerReservationGlobals()` و `controller.loadReservationForm()`.
- `reservations/formUtils.js` يجمع الأدوات المشتركة بين استمارات الإنشاء والتعديل (إضافة المعدات بالوصف، ضبط قيم Flatpickr، توليد قوائم الوصف).

يتكامل هذا التنظيم مع نقطة الدخول `src/main.js` التي تستدعي `applyStoredTheme()` ثم `initApp()`؛ وأثناء تهيئة التطبيق يتم استدعاء `setupReservationEvents()` من `reservations/events.js` عبر وحدة التصدير `reservationsUI.js`، مما يضمن تفعيل جميع الوحدات السابقة بالترتيب الصحيح دون الحاجة للاعتماد المباشر على ملف ضخم واحد.

> ملاحظة: الأنماط أصبحت موزعة حالياً على ملفات `core.css` (الأساسيات)، `reservations.css`، `reports.css`، و`maintenance.css` لتسهيل الصيانة. يمكن إضافة ملفات متخصصة جديدة داخل `styles/` عند ظهور أقسام أو مكونات إضافية.

## النشر

1. نفّذ `npm run build` لإنتاج ملفات الإنتاج داخل `dist/`.
2. ارفع محتويات `dist/` إلى خادم الاستضافة أو استعمل تكامل CI/CD لدفع التغييرات تلقائياً عند الدمج في الفرع الرئيسي.

### GitHub Pages

- تم ضبط `vite.config.js` على `base: '/artratiorentalapp/'` حتى تعمل الروابط بشكل صحيح عند التشغيل من المسار الفرعي.
- لنشر نسخة محدثة على GitHub Pages استخدم:

  ```bash
  npm run deploy
  ```

  الأمر يشغّل بناء الإنتاج (`predeploy`) ثم يدفع مجلد `dist/` تلقائياً إلى فرع `gh-pages` باستخدام حزمة `gh-pages`.
- بعد أول تشغيل، تأكد داخل إعدادات المستودع (Settings → Pages) من اختيار الفرع `gh-pages` والمجلد الجذري `/` كمصدر للنشر.
- سيتم تحديث الرابط العام `https://ammaralk1.github.io/artratiorentalapp/` خلال دقائق من كل عملية نشر.

## حساب الدخول الافتراضي

- تتم مقارنة بيانات تسجيل الدخول عبر قيم مشفّرة محفوظة في `src/scripts/config/authConfig.js`، ولا يتم تخزين اسم المستخدم أو كلمة المرور بصيغتهما الصريحة داخل الكود.
- لتحديث القيم، استعمل أي مولد SHA-256 (مثل Node.js):

  ```bash
  node -e "const crypto=require('crypto');console.log(crypto.createHash('sha256').update('NEW_USER').digest('hex'))"
  node -e "const crypto=require('crypto');console.log(crypto.createHash('sha256').update('NEW_PASS').digest('hex'))"
  ```

  ثم حدّث الحقول في `authConfig.js` بالهاش الناتج.
- تنبيه: التطبيق يعمل بالكامل على المتصفح، لذلك يمكن للمستخدم المتقدم الوصول إلى هذه القيم من خلال أدوات المطوّر. للحصول على أمان فعلي يفضّل نقل التحقق إلى خادم أو خدمة مصادقة خارجية.

## خطوات تالية مقترحة

- نقل أي عناصر واجهة جديدة إلى ملفات أنماط متخصصة للحفاظ على فصل المسؤوليات داخل `styles/`.
- اعتماد آلية قوالب (EJS أو Nunjucks) لتجميع أقسام لوحة التحكم الكبيرة.
- إضافة اختبارات وحدات للوظائف الحرجة في مجلد `src/scripts`.
