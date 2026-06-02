# UI Redesign Master Plan
## الخطة الرئيسية لإعادة تصميم الواجهة وتسليم العمل بين أعضاء الفريق

## 1. Title + Purpose
## ١. العنوان والغرض

**Purpose:** This file is the single source of truth for the Art Ratio UI/UX redesign program. Any engineer or agent should be able to open this file and immediately understand the current phase, locked decisions, progress, blockers, and next exact task.
**الهدف:** هذا الملف هو المرجع الوحيد المعتمد لإعادة تصميم واجهة وتجربة المستخدم في Art Ratio، ويجب أن يوضح لأي عضو في الفريق المرحلة الحالية والقرارات المثبتة والتقدم والعوائق والخطوة التالية بدقة.

---

## 2. How To Use This File
## ٢. طريقة استخدام هذا الملف

- Read this file before starting any UI-related work.
- اقرأ هذا الملف قبل البدء بأي عمل متعلق بالواجهة.
- Treat this file as the live operating document for the redesign track.
- اعتبر هذا الملف وثيقة تشغيل حيّة لمسار إعادة التصميم.
- Update this file in the same PR/session as any UI-related change.
- حدّث هذا الملف في نفس الـ PR أو نفس جلسة العمل مع أي تعديل متعلق بالواجهة.
- Append progress updates; do not rewrite history unless correcting a factual mistake.
- أضف تحديثات التقدم بشكل تراكمي، ولا تعِد كتابة السجل السابق إلا لتصحيح معلومة خاطئة.
- Progress Log entries are historical snapshots. If an older entry says `Next Exact Task`, `Still Risky`, or `Blocked`, it is superseded by the `Current Active Phase`, `Next Recommended Tasks`, and the latest closeout/audit entries above it.
- تُعد إدخالات سجل التقدم لقطات تاريخية. إذا ذكر إدخال قديم `Next Exact Task` أو `Still Risky` أو `Blocked`، فيتم تجاوزه بواسطة `Current Active Phase` و`Next Recommended Tasks` وأحدث إدخالات الإغلاق/التدقيق أعلاه.
- Keep checklist/task labels in English for consistency; add Arabic clarification where helpful.
- اجعل عناوين المهام والقوائم بالإنجليزية للحفاظ على الاتساق، مع إضافة توضيح عربي عند الحاجة.
- Only one redesign phase may be `In Progress` at a time.
- لا يجوز أن تكون أكثر من مرحلة واحدة بحالة `In Progress` في نفس الوقت.
- If you finish work, update `Current Active Phase`, add a `Progress Log` entry, and refresh `Next Recommended Tasks`.
- عند إنهاء العمل، حدّث قسم `Current Active Phase` وأضف سجلًا جديدًا في `Progress Log` وحدّث `Next Recommended Tasks`.

---

## 3. Non-Negotiable Rules
## ٣. القواعد غير القابلة للتفاوض

- This file is the single source of truth for the UI redesign.
- هذا الملف هو المرجع الوحيد المعتمد لإعادة تصميم الواجهة.
- Every UI-related edit must update this file before handoff or merge.
- كل تعديل متعلق بالواجهة يجب أن يصاحبه تحديث لهذا الملف قبل التسليم أو الدمج.
- No feature behavior may be changed unless this file explicitly records the reason, impact, and verification plan.
- لا يجوز تغيير سلوك أي ميزة إلا إذا تم توثيق السبب والتأثير وخطة التحقق هنا بشكل صريح.
- No contributor may start a new redesign surface unless `Current Active Phase` is updated first.
- لا يجوز لأي مساهم بدء سطح تصميم جديد قبل تحديث قسم `Current Active Phase`.
- Only one phase may be marked `In Progress` at a time.
- لا يجوز وضع أكثر من مرحلة واحدة بحالة `In Progress` في نفس الوقت.
- Every completed task must record touched surfaces, key files/modules, tests run, visual checks run, and remaining risks.
- كل مهمة مكتملة يجب أن توثق الأسطح المتأثرة والملفات أو الوحدات الرئيسية والاختبارات المنفذة والفحوصات البصرية والمخاطر المتبقية.
- Every handoff must update owner, date, completed work, current status, blockers, and next exact task.
- كل عملية تسليم يجب أن تحدّث اسم المالك والتاريخ والعمل المنجز والحالة الحالية والعوائق والخطوة التالية الدقيقة.
- Keep old docs as references only; do not split active planning across multiple new markdown files.
- أبقِ المستندات القديمة كمراجع فقط، ولا تقسّم التخطيط النشط على عدة ملفات Markdown جديدة.
- Preserve runtime contracts during UI refactor: selectors, DOM IDs, modal targets, translation hooks, auth flow, and data-loading behavior.
- يجب الحفاظ على عقود التشغيل الحالية أثناء إعادة تنظيم الواجهة: الـ selectors و DOM IDs وأهداف الـ modals وخطافات الترجمة وتدفق المصادقة وسلوك تحميل البيانات.
- High-risk surfaces must not be redesigned before shell, tokens, and primitives are stable.
- لا يجوز إعادة تصميم الأسطح عالية الخطورة قبل استقرار الـ shell والـ tokens والـ primitives.
- Dark theme is the primary operating mode for this redesign track; every UI migration must be reviewed in dark mode before handoff or merge.
- الوضع الداكن هو وضع التشغيل الأساسي لهذا المسار؛ ويجب مراجعة كل ترحيل في الواجهة ضمن الوضع الداكن قبل التسليم أو الدمج.
- Every visually approved page must immediately enter the mandatory 3-level cleanup and extraction workflow recorded in this master plan; approval alone is not the end of the page rollout step.
- كل صفحة تحصل على اعتماد بصري يجب أن تدخل فورًا في سير العمل الإلزامي ذي المستويات الثلاثة للتنظيف والاستخراج والمثبت في هذه الخطة؛ ولا يُعد الاعتماد البصري نهاية خطوة الترحيل الخاصة بالصفحة.
- Level 1 page cleanup is mandatory before moving to the next approved page; do not leave permanent page-local override buildup behind.
- تنظيف الصفحة في المستوى الأول إلزامي قبل الانتقال إلى الصفحة المعتمدة التالية؛ ولا يجوز ترك تراكم دائم من الـ overrides المحلية الخاصة بالصفحات.
- Level 2 shared extraction may happen only after enough approved pages prove a repeated pattern; do not globalize one-page pilot rules prematurely.
- لا يجوز تنفيذ الاستخراج المشترك في المستوى الثاني إلا بعد أن تثبت صفحات معتمدة كافية وجود نمط متكرر؛ ولا يجوز تعميم قواعد تجريبية تخص صفحة واحدة بشكل مبكر.
- Level 3 global cleanup is a later milestone activity, not an after-every-page task.
- التنظيف العالمي في المستوى الثالث هو نشاط لمرحلة لاحقة وليس مهمة تُنفذ بعد كل صفحة.
- Cleanup passes must preserve the approved rendered output unless this file explicitly records that a visual change was requested.
- يجب أن تحافظ تمريرات التنظيف على الناتج البصري المعتمد ما لم يسجل هذا الملف صراحةً أن تغييرًا بصريًا قد طُلِب.
- Each approved page must have its visual approval status, Level 1 cleanup status, Level 2 extraction candidacy, and approved shared-candidate patterns recorded in this file.
- يجب أن يُسجل في هذا الملف لكل صفحة معتمدة: حالة الاعتماد البصري، وحالة تنظيف المستوى الأول، وقابلية الاستخراج في المستوى الثاني، وأي أنماط أصبحت مرشحة مشتركة معتمدة.
- Each new page rollout must state which rules are temporary page-local pilot rules, which are candidates for later shared extraction, and which are truly page-specific.
- يجب أن يوضح كل ترحيل جديد لصفحة واحدة: ما هي القواعد المحلية المؤقتة التجريبية، وما هي القواعد المرشحة لاستخراج مشترك لاحقًا، وما هي القواعد الخاصة بالصفحة فعلًا.
- Light mode and dark mode must always be treated as two explicitly controlled visual systems, never as side effects of each other.
- يجب دائمًا التعامل مع الوضع الفاتح والوضع الداكن كنظامين بصريين مضبوطين بشكل صريح، وليس كنتائج جانبية أحدهما للآخر.
- Theme styling must be implemented in the CSS owner only (`app.css` or the proper stylesheet owner); HTML may provide structure, semantic hooks, and class targeting only.
- يجب تنفيذ تنسيق الثيم داخل مالك CSS فقط (`app.css` أو المالك الصحيح للأنماط)؛ أما HTML فمهمته تقتصر على البنية وخطافات الدلالة والاستهداف عبر الأصناف.
- Implementing theme logic inside page HTML is a structural violation and must be reverted before work may continue.
- يُعد تنفيذ منطق الثيم داخل HTML الخاص بالصفحة مخالفة بنيوية ويجب التراجع عنه قبل السماح باستمرار العمل.
- Every visual batch must follow this verification order: apply the change, verify dark mode visually, verify light mode visually, then compare both against approved references before continuing.
- يجب أن يتبع كل batch بصري ترتيب التحقق التالي: تطبيق التغيير، ثم التحقق بصريًا من الوضع الداكن، ثم التحقق بصريًا من الوضع الفاتح، ثم مقارنة الاثنين بالمراجع المعتمدة قبل المتابعة.
- Dark mode is the primary reference system. If a change breaks dark mode, it must be reverted or corrected immediately before any light-mode refinement proceeds.
- الوضع الداكن هو النظام المرجعي الأساسي. وإذا أدى أي تغيير إلى كسر الوضع الداكن، فيجب التراجع عنه أو تصحيحه فورًا قبل متابعة أي تحسين في الوضع الفاتح.
- No cross-mode side effects are allowed: a light-mode change must not drift dark mode, and a dark-mode change must not drift light mode.
- لا يُسمح بأي آثار جانبية بين الوضعين: لا يجوز لتغيير في الوضع الفاتح أن يسبب انحرافًا في الوضع الداكن، ولا العكس.
- `src/` is authored frontend source, `public/` is boot/static runtime support, and `dist/` is generated output only.
- `src/` هو المصدر المعتمد للواجهة، و`public/` مخصص لملفات الإقلاع والثوابت وقت التشغيل، و`dist/` ناتج مولد فقط.
- Do not treat this document as optional process documentation. It is part of the deliverable.
- لا تتعامل مع هذا الملف على أنه توثيق اختياري؛ بل هو جزء من التسليم نفسه.
- The `Complete UI System (Master v1)` recorded in this file is the governing implementation standard for every page, audit, cleanup pass, and approval review.
- يُعد `Complete UI System (Master v1)` المسجل في هذا الملف هو المعيار التنفيذي الحاكم لكل صفحة ولكل تدقيق وتمريرات التنظيف ومراجعات الاعتماد.
- If any older note, pilot rule, or supporting document conflicts with the locked UI system recorded here, this file wins.
- إذا تعارضت أي ملاحظة أقدم أو قاعدة تجريبية أو مستند داعم مع نظام الواجهة المقفل المسجل هنا، فالأولوية لهذا الملف.

---

## 4. Current Frontend Baseline
## ٤. خط الأساس الحالي للواجهة

### Confirmed Repo Facts
### حقائق مؤكدة من المستودع

- App type: Vite multi-page app with page-specific HTML entrypoints, not a component SPA.
- نوع التطبيق: تطبيق Vite متعدد الصفحات مع ملفات HTML مستقلة لكل صفحة، وليس SPA مبنيًا على مكونات.
- Shared shell duplication exists across dashboard, projects, customer, technician, and admin-style pages.
- يوجد تكرار واضح في الـ shell المشترك بين صفحات dashboard وprojects وcustomer وtechnician وصفحات الإدارة.
- Styling is mixed across Tailwind v4/daisyUI, large authored CSS, and Bootstrap CDN usage.
- طبقة التنسيق مختلطة بين Tailwind v4 وdaisyUI وCSS مخصص كبير الحجم واستخدام Bootstrap عبر CDN.
- Theme boot/runtime is split between `public/js/page-boot.js` and `src/scripts/theme.js`.
- تهيئة الثيم وقت الإقلاع ووقت التشغيل موزعة بين `public/js/page-boot.js` و`src/scripts/theme.js`.
- Existing design debt includes heavy DOM string rendering and direct inline style mutation inside scripts.
- الدين التقني الحالي يشمل اعتمادًا كبيرًا على إنشاء DOM عبر النصوص وكتابة أنماط مباشرة داخل السكربتات.

### CSS Hotspots
### نقاط ثقل CSS

- `src/styles/app.css`: large shared shell/style layer
- `src/styles/app.css`: طبقة كبيرة مشتركة للـ shell وأنماط الصفحات
- `src/styles/core.css`: large legacy/shared token layer
- `src/styles/core.css`: طبقة كبيرة مشتركة وقديمة للـ tokens والأساسيات
- `src/styles/reservations.css`: large feature-specific layer
- `src/styles/reservations.css`: طبقة ضخمة خاصة بميزة الحجوزات

### Token Ownership Snapshot
### لقطة ملكية الـ Tokens الحالية

- Semantic theme tokens are still owned only by `src/styles/tailwind-theme.css`, but the current source exposes `17` unique `--color-*` names rather than the older `32`-definition snapshot. The same file also now owns the spacing, radius, shadow, transition, focus, and typography token categories added during the Phase 4 foundation pass.
- ما زالت الـ semantic theme tokens مملوكة حصريًا لملف `src/styles/tailwind-theme.css`، لكن المصدر الحالي يعرّف `17` اسمًا فريدًا من نوع `--color-*` بدل لقطة `32` تعريفًا الأقدم. كما يملك الملف نفسه الآن فئات tokens الخاصة بالمسافات والـ radius والظلال والحركة وحلقة التركيز والطباعة التي أضيفت خلال تمريرة تأسيس المرحلة الرابعة.
- Global bridge and compatibility tokens are still defined in `src/styles/core.css`, but the current source exposes `98` unique `--bo-*` names and `6` unique `--clr-*` names rather than the older counts recorded here.
- ما زالت طبقة الـ bridge والـ compatibility العامة معرفة داخل `src/styles/core.css`، لكن المصدر الحالي يعرّف `98` اسمًا فريدًا من نوع `--bo-*` و`6` أسماء فريدة من نوع `--clr-*` بدل الأعداد الأقدم المسجلة هنا.
- Feature CSS files currently consume shared tokens but should not define new global theme namespaces outside those two owners.
- ملفات CSS الخاصة بالميزات تستهلك هذه الـ tokens المشتركة حاليًا، ويجب ألا تضيف مساحات أسماء عامة جديدة خارج هذين الملفين.
- Source audit confirms the current feature CSS set does not define new global `--color-*`, `--bo-*`, or `--clr-*` namespaces outside `tailwind-theme.css` and `core.css`.
- يؤكد تدقيق المصدر أن ملفات CSS الخاصة بالميزات لا تعرّف حاليًا أي مساحات أسماء عامة جديدة من نوع `--color-*` أو `--bo-*` أو `--clr-*` خارج `tailwind-theme.css` و`core.css`.

### Dark Selector Debt Snapshot
### لقطة ديون الـ Dark Selector الحالية

- The canonical dark selector and dark surface contracts are now closed for the redesign track.
- تم إغلاق عقد الـ dark selector وعقود أسطح الوضع الداكن ضمن مسار إعادة التصميم.
- Current audit evidence as of 2026-05-13: `npx vitest run tests/theme` passed `44 / 44` files and `156 / 156` tests, including `tests/theme/darkSelectorContract.test.js`, `tests/theme/styleAudit.test.js`, `tests/theme/tabsFamilyDarkModeAudit.test.js`, `tests/theme/darkSurfaceRefinementAudit.test.js`, `tests/theme/dashboardDarkValidationAudit.test.js`, and `tests/theme/usersDarkModeAudit.test.js`.
- دليل التدقيق الحالي بتاريخ 2026-05-13: نجح الأمر `npx vitest run tests/theme` في `44 / 44` ملفًا و`156 / 156` اختبارًا، بما في ذلك اختبارات الـ dark selector والأسطح الداكنة ولوحات dashboard وtabs وusers.

### Shared Shell Inventory Snapshot
### لقطة جرد الـ Shared Shell الحالية

- `dashboard.html`, `projects.html`, `customer.html`, `technician.html`, `users.html`, `home.html`, `site-analytics.html`, `contact-inquiries.html`, and `feedback-submissions.html` currently share the same shell anchors: `#sidebar-backdrop`, `#dashboard-sidebar`, `.sidebar-shell.sidebar-drawer`, `.dashboard-header`, `.dashboard-header-nav`, `#sidebar-open`, `#sidebar-close`, `.dashboard-hero-brand`, `data-dashboard-greeting`, `data-greeting-toggle`, `data-greeting-panel`, `#language-toggle`, `data-theme-toggle`, and `#logout-btn`.
- الصفحات `dashboard.html` و`projects.html` و`customer.html` و`technician.html` و`users.html` و`home.html` و`site-analytics.html` و`contact-inquiries.html` و`feedback-submissions.html` تشترك حاليًا في نفس anchors الخاصة بالـ shell: `#sidebar-backdrop` و`#dashboard-sidebar` و`.sidebar-shell.sidebar-drawer` و`.dashboard-header` و`.dashboard-header-nav` و`#sidebar-open` و`#sidebar-close` و`.dashboard-hero-brand` و`data-dashboard-greeting` و`data-greeting-toggle` و`data-greeting-panel` و`#language-toggle` و`data-theme-toggle` و`#logout-btn`.
- Current shell family A is `dashboard` and `projects`: both keep the full sidebar composition of stats panel, tabs panel, and quick links panel.
- عائلة الـ shell الحالية A هي `dashboard` و`projects`: حيث تحتفظان بالتركيب الكامل للشريط الجانبي من لوحة الإحصاءات ولوحة التبويبات ولوحة الروابط السريعة.
- Current shell family B is `home`, `customer`, and `technician`: these keep the shared stats panel and tabs panel but omit the quick links panel.
- عائلة الـ shell الحالية B هي `home` و`customer` و`technician`: وهي تحتفظ بلوحة الإحصاءات ولوحة التبويبات المشتركة لكنها لا تستخدم لوحة الروابط السريعة.
- Current shell family C is `users`, `site-analytics`, `contact-inquiries`, and `feedback-submissions`: these still use the same shell anchors and header utilities, but the sidebar collapses into one primary navigation panel without the dedicated tabs/quick-links split.
- عائلة الـ shell الحالية C هي `users` و`site-analytics` و`contact-inquiries` و`feedback-submissions`: وهي ما زالت تستخدم نفس anchors للـ shell ونفس أدوات الرأس، لكن الشريط الجانبي يندمج فيها في لوحة تنقل رئيسية واحدة بدون فصل واضح بين tabs وquick links.
- The compact shell family now renders through the shared build-time compact-shell partial for `site-analytics`, `contact-inquiries`, `feedback-submissions`, and `users`, with page-specific head assets, greeting slots, post-shell modal content, and page script slots preserved per entrypoint.
- تعمل عائلة الـ compact shell الآن عبر partial مشترك وقت البناء لصفحات `site-analytics` و`contact-inquiries` و`feedback-submissions` و`users`، مع الحفاظ على أصول الرأس الخاصة بكل صفحة وslots الخاصة بالـ greeting ومحتوى ما بعد الـ shell وslots السكربتات الخاصة بكل entrypoint.
- The extraction-ready boundary is now clear: `PageShell` should own the backdrop, drawer, brand block, mobile open/close controls, header bar, hero brand, greeting wrapper, theme/language/logout controls, and main content frame; page-level variation should be passed in as sidebar content slots and greeting content slots.
- أصبح حد الاستخراج جاهزًا الآن: يجب أن يملك `PageShell` كلًا من الـ backdrop والـ drawer وكتلة العلامة التجارية وأزرار الفتح والإغلاق على الجوال وشريط الرأس والـ hero brand وغلاف الـ greeting وأدوات الثيم واللغة والخروج وإطار المحتوى الرئيسي؛ بينما يجب تمرير اختلافات الصفحات عبر slots لمحتوى الشريط الجانبي ومحتوى الـ greeting.

### Extraction Readiness Snapshot
### لقطة جاهزية الاستخراج

- `vite.config.js` now includes a local `htmlCompositionPlugin()` that supports build-time HTML includes and slots for page-shell composition without changing the app architecture.
- يتضمن `vite.config.js` الآن مكوّنًا محليًا باسم `htmlCompositionPlugin()` يدعم includes وslots لملفات HTML وقت البناء من أجل تركيب الـ page-shell دون تغيير معمارية التطبيق.
- The shared compact-shell composition path currently lives in `src/pages/_partials/manager-page-head.html` and `src/pages/_partials/compact-manager-shell.html`.
- يعيش مسار التركيب المشترك الحالي للـ compact-shell داخل `src/pages/_partials/manager-page-head.html` و`src/pages/_partials/compact-manager-shell.html`.
- The compact shell family now uses this path end to end, which means Phase 2 has moved from pilot setup into validation and next-family planning.
- تستخدم عائلة الـ compact shell هذا المسار الآن من البداية إلى النهاية، وهذا يعني أن المرحلة الثانية انتقلت من إعداد الـ pilot إلى التحقق والتخطيط للعائلة التالية.
- The shared `tabs` shell composition path now lives in `src/pages/_partials/tabs-manager-shell.html`, and the full `tabs` family (`home.html`, `customer.html`, and `technician.html`) now renders through that shared path.
- يعيش مسار التركيب المشترك الحالي لعائلة `tabs` الآن داخل `src/pages/_partials/tabs-manager-shell.html`، وأصبحت عائلة `tabs` كاملة (`home.html` و`customer.html` و`technician.html`) تعمل الآن عبر هذا المسار المشترك.

### Tabs Family Prep Snapshot
### لقطة تجهيز عائلة الـ Tabs

- `home.html`, `customer.html`, and `technician.html` all share the `tabs` shell family shape: the same shell anchors, the same stats + tabs sidebar structure, the same header utility controls, and no `sidebar-panel--links` panel.
- الصفحات `home.html` و`customer.html` و`technician.html` تشترك جميعًا في شكل عائلة `tabs` للـ shell: نفس anchors الخاصة بالـ shell ونفس بنية الشريط الجانبي القائمة على stats + tabs ونفس أدوات الرأس وبدون لوحة `sidebar-panel--links`.
- `home.html` is the lightest `tabs`-family page and should be the first extraction target inside that family because it has no Bootstrap dependency, no Flatpickr dependency, no detail-page body class, and no post-shell modal surface.
- صفحة `home.html` هي أخف صفحة ضمن عائلة `tabs` ويجب أن تكون أول هدف للاستخراج داخل هذه العائلة لأنها لا تعتمد على Bootstrap ولا Flatpickr ولا تستخدم `details-page` في الـ body ولا تحتوي على modal بعد الـ shell.
- `customer.html` and `technician.html` form a paired detail-page subfamily: both use `details-page` body classes, Bootstrap RTL CSS, Bootstrap bundle JS, Flatpickr CSS/JS, `projectDetailsModal`, and rich greeting stat grids.
- تشكل الصفحتان `customer.html` و`technician.html` عائلة فرعية متقاربة من صفحات التفاصيل: فكلتاهما تستخدم `details-page` في الـ body وBootstrap RTL CSS وBootstrap bundle JS وFlatpickr CSS/JS و`projectDetailsModal` وشبكات إحصاءات غنية داخل greeting.
- The main `tabs`-family variation is therefore page-body complexity, not shell chrome: `home.html` adds the `home-main-tabbar` body surface, while `customer.html` and `technician.html` add detail-stat greeting content plus detail-specific translation/module ordering.
- وبالتالي فإن الاختلاف الأساسي داخل عائلة `tabs` هو تعقيد محتوى الصفحة لا الـ shell نفسه: إذ تضيف `home.html` سطح `home-main-tabbar` داخل الجسم، بينما تضيف `customer.html` و`technician.html` محتوى إحصائيًا داخل greeting مع ترتيب خاص لوحدات الترجمة والسكربتات.
- The recommended implementation order inside the `tabs` family is `home.html` first, then `customer.html` and `technician.html` as a paired detail-page extraction pass.
- ترتيب التنفيذ الموصى به داخل عائلة `tabs` هو `home.html` أولًا، ثم `customer.html` و`technician.html` معًا كتمرير استخراج موحد لصفحات التفاصيل.
- That first step is now complete: `home.html` renders through the shared `tabs` shell path with slot-based sidebar tabs, greeting content, main content, and the shared `auth-pending` reveal contract.
- اكتملت هذه الخطوة الأولى الآن: تعمل `home.html` عبر مسار `tabs` المشترك باستخدام slots خاصة بـ sidebar tabs ومحتوى greeting ومحتوى الصفحة وعقد الإظهار المشترك `auth-pending`.
- The paired detail-page extraction pass is now complete: `customer.html` and `technician.html` also render through the shared `tabs` shell path, using optional `afterShell` and `pageScripts` slots to preserve Bootstrap, Flatpickr, modal content, and page-specific translation ordering.
- اكتمل الآن أيضًا تمرير استخراج صفحتي التفاصيل معًا: إذ تعمل `customer.html` و`technician.html` عبر مسار `tabs` المشترك باستخدام slots اختيارية مثل `afterShell` و`pageScripts` للحفاظ على Bootstrap وFlatpickr ومحتوى الـ modals وترتيب وحدات الترجمة الخاصة بكل صفحة.

### Verified Baseline Checks
### التحقق المؤكد من خط الأساس

- Existing automated baseline is strong enough to support phased refactor.
- خط الأساس الآلي الحالي كافٍ لدعم إعادة تنظيم تدريجية.
- Verified command: `npm run test:reservations`
- الأمر الذي تم التحقق منه: `npm run test:reservations`
- Current observed result: `93` test files passed, `1` integration suite skipped because local env setup was missing, with `991` passing tests total on the current Phase 3 baseline.
- النتيجة الحالية المرصودة: نجاح `93` ملف اختبارات وتخطي مجموعة تكامل واحدة بسبب غياب إعدادات البيئة المحلية، مع `991` اختبارًا ناجحًا ضمن خط الأساس الحالي للمرحلة الثالثة.
- Verified command: `npm run build`
- الأمر الذي تم التحقق منه: `npm run build`
- Current observed result: Vite asset build and localized public build completed successfully after the compact-shell composition path was introduced.
- النتيجة الحالية المرصودة: اكتمل بناء أصول Vite وبناء الصفحات العامة المترجمة بنجاح بعد إدخال مسار تركيب الـ compact-shell.

### Current Reality Summary
### ملخص الحالة الحالية

- The app is redesignable without a feature rewrite.
- يمكن إعادة تصميم التطبيق دون إعادة كتابة الميزات.
- The safest path is a structured refresh: stabilize foundations first, then migrate shared shell, then primitives, then pages.
- المسار الأكثر أمانًا هو تحديث منظم: تثبيت الأساسات أولًا ثم توحيد الـ shell ثم الـ primitives ثم الصفحات.

---

## 5. Architecture Decisions
## ٥. القرارات المعمارية المعتمدة

- Source of truth for authored frontend code: `src/`
- المصدر المعتمد لكود الواجهة الذي يكتبه الفريق: `src/`
- `public/` is only for boot/static/runtime assets.
- `public/` مخصص فقط لملفات الإقلاع والثوابت والأصول وقت التشغيل.
- `dist/` is generated output only and must not be used as an authored source.
- `dist/` ناتج مولد فقط ولا يجوز استخدامه كمصدر تطوير.
- New redesign work must standardize on one semantic token model.
- أي عمل جديد في إعادة التصميم يجب أن يعتمد نموذجًا واحدًا للـ semantic tokens.
- `src/styles/tailwind-theme.css` is the canonical owner of semantic theme tokens in the `--color-*` namespace.
- `src/styles/tailwind-theme.css` هو المالك المعتمد للـ semantic theme tokens ضمن مساحة الأسماء `--color-*`.
- `src/styles/core.css` is the bridge owner of global compatibility tokens in the `--bo-*` and `--clr-*` namespaces until migration is complete.
- `src/styles/core.css` هو مالك طبقة الـ bridge للـ tokens العامة المؤقتة ضمن مساحتي `--bo-*` و`--clr-*` إلى أن يكتمل الترحيل.
- Feature CSS may consume shared tokens and define feature-local namespaces only; it must not author new global `--color-*`, `--bo-*`, or `--clr-*` definitions.
- يجوز لملفات CSS الخاصة بالميزات استهلاك الـ tokens المشتركة وتعريف مساحات أسماء محلية للميزة فقط؛ ولا يجوز لها إنشاء تعريفات عامة جديدة ضمن `--color-*` أو `--bo-*` أو `--clr-*`.
- Shared shell extraction comes before deep page redesign.
- استخراج الـ shell المشترك يسبق إعادة تصميم الصفحات بعمق.
- Reusable UI primitives come before high-risk page migrations.
- بناء الـ UI primitives القابلة لإعادة الاستخدام يسبق ترحيل الصفحات عالية الخطورة.
- Shared shell extraction must target one `PageShell` contract with explicit slots for `SidebarSummary`, `SidebarNav`, `SidebarLinks`, `GreetingContent`, and page body content.
- يجب أن تستهدف عملية استخراج الـ shared shell عقدًا واحدًا باسم `PageShell` مع slots واضحة لكل من `SidebarSummary` و`SidebarNav` و`SidebarLinks` و`GreetingContent` ومحتوى الصفحة نفسه.
- The `PageShell` contract must preserve the existing shell anchors during extraction: `#sidebar-backdrop`, `#dashboard-sidebar`, `.dashboard-header`, `.dashboard-header-nav`, `#sidebar-open`, `#sidebar-close`, `.dashboard-hero-brand`, `data-dashboard-greeting`, `data-greeting-toggle`, `data-greeting-panel`, `#language-toggle`, `data-theme-toggle`, and `#logout-btn`.
- يجب أن يحافظ عقد `PageShell` على anchors الحالية للـ shell أثناء الاستخراج: `#sidebar-backdrop` و`#dashboard-sidebar` و`.dashboard-header` و`.dashboard-header-nav` و`#sidebar-open` و`#sidebar-close` و`.dashboard-hero-brand` و`data-dashboard-greeting` و`data-greeting-toggle` و`data-greeting-panel` و`#language-toggle` و`data-theme-toggle` و`#logout-btn`.
- The first `PageShell` implementation must support three current variants: `full` for dashboard/projects, `tabs` for home/customer/technician, and `compact` for users/site-analytics/contact-inquiries/feedback-submissions.
- يجب أن يدعم أول تنفيذ لـ `PageShell` ثلاث variants حالية: `full` لصفحات dashboard/projects و`tabs` لصفحات home/customer/technician و`compact` لصفحات users/site-analytics/contact-inquiries/feedback-submissions.
- The sanctioned shell-composition path for this track is the local Vite `htmlCompositionPlugin()` plus partials in `src/pages/_partials/`; no external templating dependency should be added unless this file records a later decision.
- مسار تركيب الـ shell المعتمد لهذا المسار هو مكوّن Vite المحلي `htmlCompositionPlugin()` مع partials داخل `src/pages/_partials/`؛ ولا يجوز إضافة تبعية templating خارجية ما لم يُسجل قرار لاحق في هذا الملف.
- Bootstrap reduction will be gradual, not a one-shot removal.
- تقليل الاعتماد على Bootstrap سيكون تدريجيًا وليس إزالة دفعة واحدة.
- Reports, reservations, templates, export, and PDF-heavy surfaces are last-phase redesign targets.
- التقارير والحجوزات والقوالب والأسطح المعتمدة على التصدير وPDF تأتي في المراحل الأخيرة من إعادة التصميم.
- No framework rewrite is planned in this track; this remains a Vite multi-page architecture unless this file records a later decision.
- لا توجد خطة لإعادة كتابة الإطار في هذا المسار؛ سيبقى المشروع متعدد الصفحات باستخدام Vite ما لم يُسجل قرار لاحق هنا.

---

## 6. Design System Rules
## ٦. قواعد نظام التصميم

### Target Core Primitives
### الـ Primitives الأساسية المستهدفة

- `Button`
- `Input`
- `Select`
- `Textarea`
- `Card`
- `Table`
- `Modal`
- `Badge`
- `Tabs`
- `EmptyState`
- `StatCard`
- `PageShell`

### Standardization Rules
### قواعد التوحيد

- Buttons must use a single variant model: `primary`, `secondary`, `outline`, `ghost`, `danger`.
- يجب أن تستخدم الأزرار نموذج variants واحدًا: `primary` و`secondary` و`outline` و`ghost` و`danger`.
- Inputs, selects, and textareas must share the same radius, height, focus ring, spacing, and disabled states.
- يجب أن تتشارك الحقول والقوائم المنسدلة ومربعات النص في نفس الـ radius والارتفاع والـ focus ring والمسافات وحالات التعطيل.
- Page shell pieces must be reusable: sidebar, header, top controls, greeting panel, stat strip.
- يجب أن تكون أجزاء الـ page shell قابلة لإعادة الاستخدام: الشريط الجانبي والرأس والتحكمات العلوية ولوحة الترحيب وشريط الإحصائيات.
- `PageShell` fixed frame responsibilities are: backdrop, drawer container, sidebar brand, mobile drawer toggles, header frame, hero brand, header utilities, greeting wrapper, and the main content wrapper.
- المسؤوليات الثابتة لـ `PageShell` هي: الـ backdrop وحاوية الـ drawer وعلامة الشريط الجانبي وأزرار الـ drawer على الجوال وإطار الرأس والـ hero brand وأدوات الرأس وغلاف الـ greeting وحاوية المحتوى الرئيسية.
- `SidebarSummary`, `SidebarNav`, `SidebarLinks`, and `GreetingContent` are slot surfaces and may vary by page family without changing the shell anchors.
- الأسطح `SidebarSummary` و`SidebarNav` و`SidebarLinks` و`GreetingContent` هي أسطح من نوع slots ويمكن أن تختلف حسب عائلة الصفحة بدون تغيير anchors الخاصة بالـ shell.
- `SidebarLinks` is optional and should only render for pages that currently use the full shell family.
- `SidebarLinks` اختيارية ويجب أن تظهر فقط في الصفحات التي تستخدم حاليًا عائلة الـ full shell.
- Dark mode must use one selector policy everywhere.
- يجب أن يعتمد الوضع الداكن على سياسة selectors واحدة في كل الملفات.
- The canonical dark selector is `:where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])` and no new legacy selector variants may be introduced.
- الـ dark selector المعتمد هو `:where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])` ولا يجوز إضافة صيغ قديمة جديدة بعد الآن.
- All new colors must come from semantic tokens, not direct hex values in markup or JS.
- يجب أن تأتي كل الألوان الجديدة من semantic tokens وليس من قيم hex مباشرة في HTML أو JS.
- New shared theme tokens belong in `src/styles/tailwind-theme.css`; compatibility aliases belong in `src/styles/core.css`; feature CSS may only add feature-local namespaces such as `--reports-*`.
- أي tokens مشتركة جديدة تخص الثيم يجب أن توضع في `src/styles/tailwind-theme.css`، أما الـ compatibility aliases فمكانها `src/styles/core.css`، وملفات الميزات يمكنها فقط إضافة مساحات أسماء محلية مثل `--reports-*`.
- New UI work should prefer CSS classes and tokens over `element.style` writes.
- يجب أن يفضل العمل الجديد في الواجهة استخدام CSS classes وtokens بدل الكتابة المباشرة إلى `element.style`.
- New rendering should prefer stable DOM structures over large `innerHTML` blobs where practical.
- يجب أن يفضل البناء الجديد هياكل DOM مستقرة بدل الاعتماد على كتل `innerHTML` كبيرة متى كان ذلك عمليًا.
- Preserve RTL/LTR behavior and translation hooks as first-class requirements.
- الحفاظ على سلوك RTL وLTR وخطافات الترجمة مطلب أساسي وليس ثانويًا.
- Feature parity is mandatory during visual redesign.
- التكافؤ الوظيفي إلزامي أثناء إعادة التصميم البصري.

### Primitive Contract Snapshot
### لقطة عقد الـ Primitives الحالية

- `Button` contract: the only allowed semantic variants for new work are `primary`, `secondary`, `outline`, `ghost`, and `danger`, with shared sizes `sm`, `md`, and `lg`.
- عقد `Button`: الـ variants الدلالية الوحيدة المسموح بها للأعمال الجديدة هي `primary` و`secondary` و`outline` و`ghost` و`danger` مع أحجام مشتركة `sm` و`md` و`lg`.
- `Button` base behavior must remain `inline-flex`, center content, support icon + label layouts, expose hover/focus/active/disabled states, and use token-backed background, border, foreground, shadow, and focus-ring values.
- يجب أن يحافظ سلوك `Button` الأساسي على `inline-flex` مع توسيط المحتوى ودعم تخطيط icon + label وتوفير حالات hover وfocus وactive وdisabled واستخدام قيم مبنية على tokens للخلفية والحدود والنص والظل وحلقة التركيز.
- Legacy bridge mapping for existing markup is: `.btn-primary` => `primary`, `.btn-secondary` => `secondary`, `.btn-outline`, `.btn-outline-primary`, and `.btn-outline-secondary` => `outline`, `.btn-danger` and `.btn-outline-danger` => `danger`; any `.btn-soft*` usage is temporary and must not expand as the redesign progresses.
- خريطة الربط المؤقتة للـ markup الحالي هي: `.btn-primary` إلى `primary` و`.btn-secondary` إلى `secondary` و`.btn-outline` و`.btn-outline-primary` و`.btn-outline-secondary` إلى `outline` و`.btn-danger` و`.btn-outline-danger` إلى `danger`؛ وأي استخدام لعائلة `.btn-soft*` مؤقت ولا يجوز توسيعه مع تقدم إعادة التصميم.
- `Input` and `Textarea` contract: shared radius, control background, border, text color, placeholder color, focus ring, and disabled surface must come from the `--bo-color-control-*` token family until the bridge layer is retired.
- عقد `Input` و`Textarea`: يجب أن تأتي الـ radius وخلفية الحقل والحدود ولون النص ولون الـ placeholder وحلقة التركيز وحالة التعطيل من عائلة tokens `--bo-color-control-*` إلى أن يتم إيقاف طبقة الـ bridge.
- `Input` and `Textarea` must preserve label alignment, max-width safety, autofill handling, dark-mode parity, and RTL/LTR layout behavior.
- يجب أن يحافظ `Input` و`Textarea` على اتساق تموضع العناوين وحدود العرض ومعالجة autofill والتكافؤ في الوضع الداكن وسلوك RTL/LTR.
- `Select` contract: native `.form-select` and custom `.enhanced-select` must present the same control height, radius, padding rhythm, chevron placement, focus ring, disabled state, and dark-mode behavior.
- عقد `Select`: يجب أن يقدم كل من `.form-select` الأصلي و`.enhanced-select` المخصص نفس ارتفاع الحقل ونفس الـ radius وإيقاع الـ padding ومكان الـ chevron وحلقة التركيز وحالة التعطيل وسلوك الوضع الداكن.
- `Select` must preserve RTL chevron flipping and continue to use the canonical dark selector plus the shared control tokens instead of page-specific colors.
- يجب أن يحافظ `Select` على عكس موضع الـ chevron في RTL وأن يستمر في استخدام الـ dark selector القياسي مع tokens الحقول المشتركة بدل ألوان خاصة بكل صفحة.
- `Card` contract: shared cards must use content/panel tokens for background, border, shadow, and highlighted accents, with reusable variants for standard content cards, stat cards, and selectable cards.
- عقد `Card`: يجب أن تستخدم البطاقات المشتركة tokens المحتوى واللوحات للخلفية والحدود والظل واللمسات المميزة، مع variants قابلة لإعادة الاستخدام لبطاقات المحتوى القياسية وبطاقات الإحصاءات والبطاقات القابلة للاختيار.
- `Card` variants must keep hover/focus states token-driven and preserve dark-mode parity without introducing direct per-page hex values for shared surfaces.
- يجب أن تبقي variants الخاصة بـ `Card` حالات hover وfocus مبنية على tokens وتحافظ على التكافؤ في الوضع الداكن بدون إدخال قيم hex مباشرة للأسطح المشتركة على مستوى الصفحات.
- `Table` contract: the shared table primitive starts with `ui-table-shell` and `ui-table`, using table-shell, head, row, and hover tokens while keeping Bootstrap `.table` as the first compatibility alias; dense page-specific tables may stay specialized until they are explicitly adopted.
- عقد `Table`: يبدأ الـ primitive المشترك للجداول عبر `ui-table-shell` و`ui-table` مستخدمًا tokens خاصة بحاوية الجدول ورؤوسه وصفوفه وحالات المرور مع إبقاء Bootstrap `.table` كأول alias توافقـي؛ ويمكن للجداول الكثيفة الخاصة بالصفحات أن تبقى متخصصة إلى أن يتم اعتمادها صراحة.
- `Modal` contract: shared modal chrome must be available through `ui-modal__content`, `ui-modal__header`, `ui-modal__body`, and `ui-modal__footer`, while preserving existing Bootstrap modal structure, close buttons, footer actions, and dark-theme parity.
- عقد `Modal`: يجب أن تتاح هيئة الـ modal المشتركة عبر `ui-modal__content` و`ui-modal__header` و`ui-modal__body` و`ui-modal__footer` مع الحفاظ على بنية Bootstrap الحالية للـ modal وأزرار الإغلاق وإجراءات التذييل والتكافؤ في الوضع الداكن.
- `Tabs` contract: the shared tabs primitive must expose a reusable shell through `ui-tabs` and `ui-tab`, preserve active/hover/focus states, and continue to work with existing tab-button contracts and RTL/LTR layout rules.
- عقد `Tabs`: يجب أن يوفّر primitive التبويبات المشتركة غلافًا قابلاً لإعادة الاستخدام عبر `ui-tabs` و`ui-tab` مع الحفاظ على حالات active وhover وfocus والاستمرار في العمل مع عقود أزرار التبويب الحالية وقواعد RTL/LTR.
- `Badge` contract: the shared badge primitive must expose a neutral base plus `outline` and `soft` variants through token-backed colors and borders, while preserving existing `.badge`, `.badge-outline`, and `.badge-soft` classes as compatibility aliases.
- عقد `Badge`: يجب أن يوفّر primitive الشارات قاعدة محايدة مع variants من نوع `outline` و`soft` عبر ألوان وحدود مبنية على tokens، مع الحفاظ على الكلاسات الحالية `.badge` و`.badge-outline` و`.badge-soft` كـ aliases توافقية.
- `StatCard` contract: shared KPI/stat surfaces must now be available through `ui-stat-card`, using the shared card-border token, compact spacing tokens, dark-safe elevation, and reusable `label`, `value`, and optional `icon` sub-elements while preserving existing `.summary-card` and compact KPI markup as compatibility aliases during migration.
- عقد `StatCard`: يجب أن تتاح الآن أسطح الإحصاءات/KPI المشتركة عبر `ui-stat-card` باستخدام token حدود البطاقة المشتركة وtokens التباعد المدمج ودرجة الرفع الآمنة في الوضع الداكن مع عناصر فرعية قابلة لإعادة الاستخدام من نوع `label` و`value` و`icon` اختياري، مع الحفاظ على `.summary-card` وmarkup الخاص ببطاقات الـ KPI المدمجة كـ aliases توافقية أثناء الترحيل.
- `EmptyState` contract: shared empty/loading placeholders must now be available through `ui-empty-state`, center content predictably, use muted readable text in dark mode, support optional `icon`, `title`, `body`, and `actions` slots, and preserve existing `.surface-empty-state` markup as the first compatibility alias.
- عقد `EmptyState`: يجب أن تتاح الآن حالات الفراغ/التحميل المشتركة عبر `ui-empty-state` مع توسيط متوقع للمحتوى واستخدام نص muted مقروء في الوضع الداكن ودعم slots اختيارية من نوع `icon` و`title` و`body` و`actions`، مع الحفاظ على markup الحالي `.surface-empty-state` كأول alias توافقـي.
- The first bridge implementation now exists in the shared style layer through `.ui-button`, `.ui-button--primary|secondary|outline|ghost|danger`, `.ui-input`, `.ui-textarea`, `.ui-select`, `.ui-select-trigger`, `.ui-card`, `.ui-card--content`, and `.ui-card--interactive`, while preserving the legacy `.btn*`, `.form-control`, `.form-select`, `.enhanced-select__trigger`, and `.card` classes as compatibility aliases.
- أصبح أول تنفيذ لطبقة الربط موجودًا الآن داخل طبقة الأنماط المشتركة عبر `.ui-button` و`.ui-button--primary|secondary|outline|ghost|danger` و`.ui-input` و`.ui-textarea` و`.ui-select` و`.ui-select-trigger` و`.ui-card` و`.ui-card--content` و`.ui-card--interactive`، مع الحفاظ على الكلاسات القديمة `.btn*` و`.form-control` و`.form-select` و`.enhanced-select__trigger` و`.card` كـ aliases توافقية.
- The second bridge implementation now exists in the shared style layer through `.ui-table-shell`, `.ui-table`, `.ui-modal__content|header|body|footer`, `.ui-tabs`, `.ui-tab`, `.ui-badge`, `.ui-badge--outline`, and `.ui-badge--soft`, while preserving `.table-responsive`, `.table`, `.modal-*`, `.tab-button`, `.badge`, `.badge-outline`, and `.badge-soft` as compatibility aliases.
- أصبح تنفيذ طبقة الربط الثانية موجودًا الآن داخل طبقة الأنماط المشتركة عبر `.ui-table-shell` و`.ui-table` و`.ui-modal__content|header|body|footer` و`.ui-tabs` و`.ui-tab` و`.ui-badge` و`.ui-badge--outline` و`.ui-badge--soft`، مع الحفاظ على `.table-responsive` و`.table` و`.modal-*` و`.tab-button` و`.badge` و`.badge-outline` و`.badge-soft` كـ aliases توافقية.
- The Phase 4 audit-correction foundation is now implemented in the shared theme/style layers: semantic primary is corrected to `#567E56`, semantic secondary to `#8BA3B0`, `--color-card-border` is now part of the semantic token contract, the missing spacing/radius/shadow/motion/focus/typography token categories now exist in `src/styles/tailwind-theme.css`, and `ui-stat-card` plus `ui-empty-state` are now shared bridge primitives.
- أصبحت قاعدة تصحيحات التدقيق الخاصة بالمرحلة الرابعة مطبقة الآن في طبقات الثيم/الأنماط المشتركة: حيث تم تصحيح اللون الدلالي الأساسي إلى `#567E56` والثانوي إلى `#8BA3B0` وأصبح `--color-card-border` جزءًا من عقد الـ tokens الدلالية، كما أصبحت فئات الـ tokens الناقصة الخاصة بالمسافات والزوايا والظلال والحركة وحلقة التركيز والطباعة موجودة الآن داخل `src/styles/tailwind-theme.css`، وأصبح كل من `ui-stat-card` و`ui-empty-state` primitives مشتركة ضمن طبقة الـ bridge.
- The first low-risk adoption target is now `login.html`, which uses the new primitive aliases in-place for the language button, auth card, username/password fields, and submit button while preserving the legacy bridge classes in the same markup.
- أصبح أول هدف منخفض الخطورة لتبني الـ primitives هو `login.html`، حيث يستخدم الآن aliases الجديدة داخل نفس الـ markup لزر اللغة وبطاقة المصادقة وحقلي اسم المستخدم وكلمة المرور وزر الإرسال، مع الحفاظ على كلاسات الـ bridge القديمة في نفس العناصر.
- The second adoption reference is now `site-analytics.html`, which proves the same in-place alias strategy on an extracted compact manager shell for shared cards, selects, and action buttons without changing shell behavior.
- أصبح المرجع الثاني لتبني الـ primitives هو `site-analytics.html`، وهو يثبت نفس استراتيجية الـ aliases داخل نفس العناصر على صفحة من صفحات الـ compact manager shell المستخرجة لعناصر البطاقات والحقول المنسدلة وأزرار الإجراءات بدون تغيير سلوك الـ shell.
- The compact manager family now shares one primitive-adoption baseline across `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `users.html`, which means Phase 3 now has a stable extracted-shell reference set for shared cards, buttons, selects, search inputs, and a Bootstrap-backed modal action.
- أصبحت عائلة الـ compact manager الآن تشترك في خط أساس واحد لتبني الـ primitives عبر `site-analytics.html` و`contact-inquiries.html` و`feedback-submissions.html` و`users.html`، ما يعني أن المرحلة الثالثة أصبحت تملك مجموعة مراجع مستقرة على صفحات مستخرجة لعناصر البطاقات والأزرار والحقول المنسدلة وحقول البحث إضافة إلى إجراء داخل modal يعتمد على Bootstrap.
- `home.html` is now the first primitive-adoption reference on the extracted `tabs` family, which proves the same in-place alias strategy on shared greeting actions, card surfaces, tab-bar cards, and summary refresh controls without changing shell behavior.
- أصبحت `home.html` الآن أول مرجع لتبني الـ primitives على عائلة `tabs` المستخرجة، وهو يثبت نفس استراتيجية الـ aliases داخل نفس العناصر على إجراءات greeting وأسـطح البطاقات وبطاقات شريط التبويب وزر تحديث الملخص بدون تغيير سلوك الـ shell.
- `customer.html` and `technician.html` now form the second primitive-adoption baseline inside the extracted `tabs` family, extending the same in-place alias pattern to detail-page action rows, filter bars, edit forms, payout controls, and Bootstrap/Flatpickr-backed surfaces without changing runtime contracts.
- أصبحت `customer.html` و`technician.html` الآن تشكلان خط الأساس الثاني لتبني الـ primitives داخل عائلة `tabs` المستخرجة، حيث تمددان نفس نمط الـ aliases داخل نفس العناصر إلى صفوف الإجراءات وأشرطة التصفية ونماذج التعديل وعناصر دفعات الفني والأسطح المعتمدة على Bootstrap وFlatpickr بدون تغيير عقود التشغيل.
- `projects.html` is now the first primitive-adoption reference inside the extracted `full` family, extending the same in-place alias strategy to top-level content tab wrappers, project creation fields, project list/report filters, templates controls, embedded customer/technician forms, and the close-project form without changing shell, subtab, or modal contracts.
- أصبحت `projects.html` الآن أول مرجع لتبني الـ primitives داخل عائلة `full` المستخرجة، حيث تمدد نفس استراتيجية الـ aliases داخل نفس العناصر إلى أغلفة تبويبات المحتوى العليا وحقول إنشاء المشروع ومرشحات قائمة المشاريع والتقارير وعناصر تحكم القوالب ونماذج العملاء/الفنيين المضمنة ونموذج إغلاق المشروع بدون تغيير عقود الـ shell أو التبويبات الفرعية أو الـ modals.
- `dashboard.html` now forms the second primitive-adoption baseline inside the extracted `full` family, extending the same in-place alias strategy to the shared dashboard tabbars, embedded customer/technician forms, equipment and maintenance controls, reservation create/list/report controls, and close-action modal forms while preserving `data-tab` behavior, fixture-backed validation paths, and modal-close contracts.
- أصبحت `dashboard.html` الآن تشكل خط الأساس الثاني لتبني الـ primitives داخل عائلة `full` المستخرجة، حيث تمدد نفس استراتيجية الـ aliases داخل نفس العناصر إلى أشرطة تبويب dashboard المشتركة ونماذج العملاء/الفنيين المضمنة وعناصر تحكم المعدات والصيانة وعناصر إنشاء/عرض/تقارير الحجوزات ونماذج الإغلاق داخل الـ modals مع الحفاظ على سلوك `data-tab` ومسارات التحقق المعتمدة على الـ fixture وعقود أزرار إغلاق الـ modals.
- Before any page migration starts, every new primitive implementation must be backed by a shared audit and documented here with the legacy class bridge it replaces.
- قبل بدء أي ترحيل للصفحات يجب أن يكون كل تنفيذ جديد لأي primitive مدعومًا بتدقيق مشترك وموثقًا هنا مع طبقة الربط التي يستبدلها من الكلاسات القديمة.

### Dark Theme Release Gate
### بوابة اعتماد الوضع الداكن

- Dark theme is the primary QA path for this application and is a blocking visual gate for every UI migration.
- الوضع الداكن هو مسار التحقق الأساسي لهذا التطبيق، وهو بوابة بصرية إلزامية لكل ترحيل في الواجهة.
- No page family may move forward until its affected surfaces pass manual dark-theme checks for readability, contrast, focus states, hover states, borders, overlays, tables, forms, cards, and modal surfaces.
- لا يجوز لأي عائلة صفحات الانتقال إلى الخطوة التالية حتى تجتاز الأسطح المتأثرة فحوصات يدوية في الوضع الداكن تشمل القراءة والتباين وحالات التركيز والمرور والحدود والطبقات والجداول والحقول والبطاقات والـ modals.
- Required dark-theme checks must cover both boot and runtime states: first paint, post-auth reveal, shell/header/sidebar surfaces, greeting panels, page cards, interactive controls, and empty/loading/error states.
- يجب أن تغطي فحوصات الوضع الداكن المطلوبة حالتي الإقلاع والتشغيل: أول رسم، وما بعد إظهار الصفحة بعد المصادقة، وأسـطح الـ shell/header/sidebar، ولوحات greeting، وبطاقات الصفحة، وعناصر التحكم التفاعلية، وحالات الفراغ والتحميل والخطأ.
- Any dark-theme issue blocks handoff until it is fixed or explicitly logged in `Open Risks And Blockers` with owner and next action.
- أي مشكلة في الوضع الداكن تمنع التسليم حتى يتم إصلاحها أو توثيقها صراحة في `Open Risks And Blockers` مع تحديد المالك والخطوة التالية.

### Phase 4 Visual Direction
### الاتجاه البصري المعتمد للمرحلة الرابعة

- This section is now frozen as future reference only. It must not drive active implementation while the system is in stabilization mode.
- هذا القسم أصبح الآن مجمدًا كمرجع مستقبلي فقط، ولا يجوز أن يقود التنفيذ الفعلي بينما النظام في وضع التثبيت والاستقرار.
- No final visual direction is approved yet for broad rollout. Any later choice must happen only after the stabilization success criteria in Phase 3A are closed.
- لا يوجد حتى الآن اتجاه بصري نهائي معتمد للترحيل الواسع، وأي اختيار لاحق يجب أن يحدث فقط بعد إغلاق معايير نجاح التثبيت في المرحلة 3A.

- Phase 4 uses the external dashboard UI kit at `/Users/ammaralkhatib/Downloads/dark-ui-dashboard-builder-2023-11-27-05-33-06-utc.zip` as a **shape reference only**, not as a direct implementation template.
- تستخدم المرحلة الرابعة حزمة الـ dashboard الخارجية الموجودة في `/Users/ammaralkhatib/Downloads/dark-ui-dashboard-builder-2023-11-27-05-33-06-utc.zip` كمرجع **للشكل فقط** وليس كقالب تنفيذ مباشر.
- Phase 4 uses the Art Ratio brand palette from `/Users/ammaralkhatib/Documents/Art Rato Company /New Branding/Art Ratio Color Palette .png` as the color authority for the redesign direction.
- تستخدم المرحلة الرابعة لوحة ألوان Art Ratio الموجودة في `/Users/ammaralkhatib/Documents/Art Rato Company /New Branding/Art Ratio Color Palette .png` كمرجع اللون الأساسي والمعتمد لاتجاه إعادة التصميم.

### Reference Usage Rules
### قواعد استخدام المرجع

- Take from the external kit: shape language, border weight, radius rhythm, card framing, action density, table containment, modal chrome, and spacing hierarchy.
- يؤخذ من المرجع الخارجي: لغة الشكل، وسماكة الحدود، وإيقاع الزوايا، وتأطير البطاقات، وكثافة الإجراءات، واحتواء الجداول، وهيئة الـ modals، وهرمية التباعد.
- Do **not** take from the external kit: its original purple/blue palette, marketing/demo decoration, or any layout pattern that reduces readability for dense operational pages.
- لا يؤخذ من المرجع الخارجي: لوحة ألوانه الأصلية البنفسجية/الزرقاء، أو الزخارف التسويقية/الاستعراضية، أو أي layout يقلل وضوح الصفحات التشغيلية الكثيفة.
- The external kit must be adapted to the current app architecture, existing shell families, Bootstrap compatibility, and real operational density.
- يجب تكييف المرجع الخارجي مع معمارية التطبيق الحالية وعائلات الـ shell الموجودة وتوافق Bootstrap وكثافة التشغيل الفعلية.

### Brand Color Direction
### اتجاه ألوان العلامة

- Primary dark foundation: `#091008` and `#1F2F22` for shell backgrounds, deep panels, and high-contrast dark surfaces.
- الأساس الداكن الرئيسي: `#091008` و`#1F2F22` لخلفيات الـ shell واللوحات العميقة والأسطح الداكنة عالية التباين.
- Operational primary: `#3E563E` for primary actions, active states, and controlled emphasis.
- اللون التشغيلي الرئيسي: `#3E563E` للإجراءات الأساسية والحالات النشطة والتأكيد البصري المنضبط.
- Soft support surface: `#93A889` for muted highlights, selected rows/chips, and gentle contrast surfaces.
- السطح الداعم الناعم: `#93A889` للإضاءات الهادئة والعناصر المختارة مثل الصفوف/الشرائح والأسطح ذات التباين اللطيف.
- Secondary accent: `#7993A0` for information accents, secondary emphasis, charts, and filter support states.
- اللكنة الثانوية: `#7993A0` للإبرازات المعلوماتية والتأكيد الثانوي والرسوم البيانية وحالات دعم الفلاتر.
- No new shared visual work may introduce off-brand accent colors without being recorded in this file first.
- لا يجوز لأي عمل بصري مشترك جديد أن يضيف ألوان accent خارج الهوية قبل توثيق ذلك في هذا الملف أولًا.

### Shape Rules
### قواعد الشكل

- Buttons: medium radius, solid silhouette, low-noise shadows, clear fill hierarchy, and one obvious primary action per section.
- الأزرار: زوايا متوسطة، وهيئة صلبة، وظلال هادئة، وهرمية تعبئة واضحة، وإجراء أساسي واحد واضح في كل section.
- Cards: strong container boundaries, elevated but restrained shadows, layered surfaces, and consistent inner padding.
- البطاقات: حدود حاوية واضحة، وظلال مرفوعة لكن منضبطة، وأسـطح بطبقات متدرجة، وحشو داخلي ثابت.
- The current split `login.html` experiment is exploratory only and is not an approved Phase 4 rollout reference; it must not be generalized as-is to the rest of the application.
- تجربة `login.html` الحالية ذات التخطيط المنقسم هي تجربة استكشافية فقط وليست مرجعًا معتمدًا للترحيل في المرحلة الرابعة؛ ولا يجوز تعميمها كما هي على بقية التطبيق.
- Tables: table content must live inside a card-like shell with a clear toolbar/header rhythm; rows stay readable before decorative styling.
- الجداول: يجب أن تعيش داخل حاوية شبيهة بالبطاقات مع إيقاع واضح للرأس/شريط الأدوات؛ وتبقى الصفوف مقروءة قبل أي زخرفة إضافية.
- Modals: modal headers, bodies, and footers must feel like one system, with obvious action hierarchy and strong dark-mode contrast.
- الـ modals: يجب أن تبدو الرؤوس والمحتوى والتذييل كنظام واحد، مع هرمية واضحة للإجراءات وتباين قوي في الوضع الداكن.
- Filters and toolbars: compact, horizontally aligned where possible, with spacing that favors scanning over decoration.
- الفلاتر وأشرطة الأدوات: مدمجة ومصطفة أفقيًا متى أمكن، مع تباعد يخدم المسح البصري أكثر من الزخرفة.
- Tabs: quiet inactive state, clear active state, and no excessive glow or decorative underline noise.
- التبويبات: حالة خاملة هادئة، وحالة نشطة واضحة، وبدون توهج مبالغ أو خطوط زخرفية مزعجة.

### Practical Adoption Order
### ترتيب التطبيق العملي

- First proof point: `login.html` establishes the initial visual direction for spacing, hierarchy, and auth surface polish.
- نقطة الإثبات الأولى: `login.html` تثبت الاتجاه البصري الأولي للتباعد والهرمية وصقل سطح تسجيل الدخول.
- Next proof family: `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `users.html` carry the same shape rules into compact management pages.
- عائلة الإثبات التالية: `site-analytics.html` و`contact-inquiries.html` و`feedback-submissions.html` و`users.html` تنقل نفس قواعد الشكل إلى صفحات الإدارة المدمجة.
- Only after the compact family looks coherent should the same direction expand into later phases.
- لا يتم توسيع هذا الاتجاه إلى المراحل اللاحقة إلا بعد أن تظهر عائلة الـ compact متماسكة بصريًا.

---

## 7. Phased Rollout Plan
## ٧. خطة التنفيذ المرحلية

### Allowed Statuses
### الحالات المسموح بها

- `Planned`
- `Ready`
- `In Progress`
- `Blocked`
- `Done`
- `Deferred`

### Mandatory 3-Level Cleanup And Extraction Workflow
### سير العمل الإلزامي للتنظيف والاستخراج عبر ثلاثة مستويات

- **Purpose:** keep the rollout clean while it is happening; do not allow permanent page-by-page override debt to accumulate.
- **الهدف:** إبقاء مسار الترحيل نظيفًا أثناء التنفيذ نفسه؛ ومنع تراكم ديون دائمة ناتجة عن overrides تُضاف صفحة بعد صفحة.
- This workflow is a standing rollout rule for every approved page going forward.
- هذا السير هو قاعدة تشغيل دائمة لكل صفحة تُعتمد بصريًا من الآن فصاعدًا.

### Level 1 — Page Cleanup
### المستوى ١ — تنظيف الصفحة

- **Trigger:** immediately after a page is approved visually.
- **متى يبدأ:** مباشرة بعد اعتماد الصفحة بصريًا.
- **Goal:** clean the page-specific implementation without changing the approved rendered result.
- **الهدف:** تنظيف تنفيذ الصفحة الخاص بها بدون تغيير الناتج البصري المعتمد.
- **Rules:**
- **القواعد:**
- remove dead or superseded page-only selectors and rules
- إزالة الـ selectors والقواعد المحلية الميتة أو التي تم استبدالها
- collapse duplicate page-local overrides
- دمج الـ overrides المحلية المكررة على مستوى الصفحة
- simplify selector layering where possible
- تبسيط طبقات الـ selectors متى أمكن
- reduce unnecessary specificity if the rendered result can be preserved
- تقليل الـ specificity غير الضروري إذا أمكن الحفاظ على نفس النتيجة المرئية
- identify which remaining rules are truly page-specific
- تحديد القواعد المتبقية التي هي فعلًا خاصة بالصفحة
- do not redesign the page
- عدم إعادة تصميم الصفحة
- do not widen scope to other pages
- عدم توسيع النطاق إلى صفحات أخرى
- do not change the approved rendered output
- عدم تغيير الناتج البصري المعتمد
- **Required Outputs:**
- **المخرجات المطلوبة:**
- exact files changed
- الملفات التي تغيرت بدقة
- dead rules removed
- القواعد الميتة التي أزيلت
- duplicate or overlapping rules simplified
- القواعد المكررة أو المتداخلة التي بُسّطت
- rules that remain truly page-specific
- القواعد التي بقيت خاصة بالصفحة فعلًا
- confirmation that the rendered output was preserved
- تأكيد أن الناتج المرئي قد تم الحفاظ عليه

### Level 2 — Shared Extraction Cleanup
### المستوى ٢ — تنظيف الاستخراج المشترك

- **Trigger:** after 2 or 3 approved pages in the same family or system prove a repeated pattern.
- **متى يبدأ:** بعد أن تثبت صفحتان أو ثلاث صفحات معتمدة ضمن العائلة أو النظام نفسه وجود نمط متكرر.
- **Goal:** promote stable repeated patterns into shared primitives or owners and reduce duplicated page-level implementations.
- **الهدف:** ترقية الأنماط المستقرة المتكررة إلى primitives أو owners مشتركة وتقليل التنفيذات المكررة على مستوى الصفحات.
- **When To Trigger:**
- **متى يُفعل:**
- after 2 or more approved pages clearly share the same validated pattern
- بعد أن تتشارك صفحتان معتمدتان أو أكثر نمطًا واحدًا موثقًا بوضوح
- after enough evidence exists that a pattern is not page-specific
- بعد توافر أدلة كافية على أن النمط ليس خاصًا بصفحة واحدة
- not before that
- وليس قبل ذلك
- **Rules:**
- **القواعد:**
- compare approved pages in the same family or system
- مقارنة الصفحات المعتمدة داخل العائلة أو النظام نفسه
- identify repeated visual patterns that should become shared
- تحديد الأنماط البصرية المتكررة التي يجب أن تصبح مشتركة
- promote only proven patterns into shared primitives or owners
- ترقية الأنماط المثبتة فقط إلى primitives أو owners مشتركة
- keep truly page-specific behavior local
- إبقاء السلوك الخاص بالصفحة فعلًا محليًا
- remove duplicated per-page versions only after shared extraction is safe
- إزالة النسخ المكررة لكل صفحة فقط بعد أن يصبح الاستخراج المشترك آمنًا
- do not prematurely redesign untouched pages
- عدم إعادة تصميم الصفحات غير الملموسة بشكل مبكر
- do not force shared extraction from one page only unless the pattern is already clearly a shared owner
- عدم فرض استخراج مشترك انطلاقًا من صفحة واحدة فقط إلا إذا كان النمط واضحًا سلفًا على أنه owner مشترك
- **Examples Of Extraction Candidates:**
- **أمثلة على المرشحات المناسبة للاستخراج:**
- section shell treatment
- معالجة section shell
- inner card treatment
- معالجة البطاقات الداخلية
- flatter tab or navigation treatment
- معالجة أكثر تسطيحًا للتبويبات أو التنقل
- support text hierarchy
- هرمية نصوص الدعم
- summary card treatment
- معالجة بطاقات الملخص
- repeated button, input, or group behavior
- سلوك الأزرار أو الحقول أو المجموعات المتكرر
- approved spacing rhythm across similar page families
- إيقاع التباعد المعتمد عبر عائلات صفحات متشابهة
- **Required Outputs:**
- **المخرجات المطلوبة:**
- pages compared
- الصفحات التي تمت مقارنتها
- repeated patterns identified
- الأنماط المتكررة التي تم تحديدها
- rules or components selected for shared extraction
- القواعد أو المكونات المختارة للاستخراج المشترك
- rules or components kept page-specific
- القواعد أو المكونات التي بقيت محلية للصفحة
- exact shared files changed
- الملفات المشتركة التي تغيرت بدقة
- per-page rules removed or reduced after extraction
- القواعد الخاصة بالصفحات التي أزيلت أو تقلصت بعد الاستخراج
- regression risk notes
- ملاحظات مخاطر الانحدار

### Level 3 — Global Final Cleanup
### المستوى ٣ — التنظيف العالمي النهائي

- **Trigger:** later milestone only, after a significant portion of the rollout is complete.
- **متى يبدأ:** في معلم لاحق فقط، بعد اكتمال جزء كبير من الترحيل.
- **Goal:** remove deprecated legacy styling and tighten the final architecture of the application.
- **الهدف:** إزالة الأنماط القديمة المتقادمة وتشديد البنية النهائية للتطبيق.
- **When To Trigger:**
- **متى يُفعل:**
- after major rollout milestones are complete
- بعد اكتمال معالم رئيسية من الترحيل
- after multiple page families have already been approved
- بعد اعتماد عدة عائلات صفحات
- after shared extraction has stabilized
- بعد أن يستقر الاستخراج المشترك
- not during early pilot rollout
- وليس خلال الترحيل التجريبي المبكر
- **Rules:**
- **القواعد:**
- remove old legacy rules no longer used anywhere
- إزالة القواعد القديمة التي لم تعد مستخدمة في أي مكان
- remove deprecated shared styles replaced by the new system
- إزالة الأنماط المشتركة المتقادمة التي استبدلها النظام الجديد
- delete obsolete component variants that no longer have live usage
- حذف variants المكونات التي أصبحت متقادمة ولم يعد لها استخدام حي
- tighten the global architecture
- تشديد البنية العامة
- reduce accumulated transitional compatibility layers
- تقليل طبقات التوافق الانتقالية المتراكمة
- verify before deleting any cross-page or shared owner
- التحقق قبل حذف أي owner مشترك أو عابر للصفحات
- prioritize safety and proof over aggressive deletion
- تقديم السلامة والإثبات على الحذف العدواني
- **Required Outputs:**
- **المخرجات المطلوبة:**
- legacy rules or components selected for deletion
- القواعد أو المكونات القديمة المختارة للحذف
- exact proof they are unused or replaced
- الدليل الدقيق على أنها غير مستخدمة أو تم استبدالها
- exact shared or global files changed
- الملفات المشتركة أو العامة التي تغيرت بدقة
- compatibility risks
- مخاطر التوافق
- final architecture notes
- ملاحظات البنية النهائية

### Cleanup Governance Rules
### قواعد الحوكمة الخاصة بالتنظيف

- Every approved page must trigger Level 1 cleanup before moving on.
- يجب أن تفعّل كل صفحة معتمدة تنظيف المستوى الأول قبل الانتقال إلى ما بعدها.
- Level 2 shared extraction happens only after enough approved pages prove the pattern.
- يحدث الاستخراج المشترك في المستوى الثاني فقط بعد أن تثبت صفحات معتمدة كافية النمط.
- Level 3 global cleanup happens later, not after every page.
- يحدث التنظيف العالمي في المستوى الثالث لاحقًا، وليس بعد كل صفحة.
- Permanent buildup of page-by-page override debt is not allowed.
- لا يُسمح بتراكم دائم لديون الـ overrides صفحة بعد صفحة.
- Unproven page-local solutions must not be prematurely globalized.
- لا يجوز تعميم الحلول المحلية غير المثبتة بشكل مبكر.
- Cleanup passes must not change approved rendered output unless explicitly requested and recorded.
- يجب ألا تغير تمريرات التنظيف الناتج البصري المعتمد إلا إذا طُلِب ذلك صراحةً وتم تسجيله.

### Theme Integrity Rule — Light/Dark Mode Separation
### قاعدة سلامة الثيم — فصل الوضع الفاتح عن الداكن

- **Core Principle:** light mode and dark mode are two explicitly controlled visual systems, not side effects of each other.
- **المبدأ الأساسي:** الوضع الفاتح والوضع الداكن هما نظامان بصريان مضبوطان بشكل صريح، وليس كل منهما نتيجة جانبية للآخر.
- **What Is Not Allowed:**
- **ما هو غير مسموح:**
- do not implement light mode by modifying page HTML such as `home.html` or `login.html`
- لا يجوز تنفيذ الوضع الفاتح عبر تعديل HTML الصفحة مثل `home.html` أو `login.html`
- do not inject theme behavior inside page markup except for structural hooks
- لا يجوز حقن سلوك الثيم داخل markup الصفحة إلا في حدود الخطافات البنيوية
- do not apply light-mode styles without explicitly verifying dark mode
- لا يجوز تطبيق أنماط الوضع الفاتح بدون التحقق الصريح من الوضع الداكن
- do not allow light-mode values to override or leak into dark mode
- لا يجوز السماح لقيم الوضع الفاتح بأن تطغى على الوضع الداكن أو تتسرب إليه
- do not rely on shared selectors without mode scoping
- لا يجوز الاعتماد على selectors مشتركة بدون فصل واضح بين الوضعين
- do not patch one mode blindly after changing the other
- لا يجوز ترقيع أحد الوضعين بشكل أعمى بعد تعديل الآخر
- Any of the above is a critical implementation failure.
- أي بند مما سبق يُعد فشلًا تنفيذيًا حرجًا.
- **Required Implementation Pattern:**
- **نمط التنفيذ المطلوب:**
- theme styling must live in the CSS owner only: `app.css` or the proper stylesheet owner
- يجب أن يعيش تنسيق الثيم في مالك CSS فقط: `app.css` أو المالك الصحيح للأنماط
- HTML is only for structure, semantic hooks, and class targeting
- HTML مخصص فقط للبنية وخطافات الدلالة والاستهداف عبر الأصناف
- every visual change must exist intentionally in both modes with explicit scoping
- يجب أن يوجد كل تغيير بصري بشكل مقصود في كلا الوضعين مع فصل واضح وصريح
- no shared ambiguous styling is allowed between modes
- لا يُسمح بأنماط مشتركة ملتبسة بين الوضعين
- **Batch-By-Batch Verification:**
- **التحقق دفعة بدفعة:**
- 1. apply change
- ١. تطبيق التغيير
- 2. verify dark mode visually
- ٢. التحقق بصريًا من الوضع الداكن
- 3. verify light mode visually
- ٣. التحقق بصريًا من الوضع الفاتح
- 4. compare both against approved references
- ٤. مقارنة الوضعين بالمراجع المعتمدة
- if either mode drifts, stop and fix before continuing
- إذا حدث انحراف في أي من الوضعين، فيجب التوقف والإصلاح قبل الاستمرار
- **Dark Mode Protection Rule:**
- **قاعدة حماية الوضع الداكن:**
- dark mode is the primary reference system
- الوضع الداكن هو النظام المرجعي الأساسي
- if any change breaks dark mode, revert or fix it immediately
- إذا تسبب أي تغيير في كسر الوضع الداكن، فيجب التراجع عنه أو إصلاحه فورًا
- light mode must adapt to dark mode, not the opposite
- يجب أن يتكيف الوضع الفاتح مع الوضع الداكن، وليس العكس
- never sacrifice dark-mode integrity for light-mode improvements
- لا يجوز التضحية بسلامة الوضع الداكن لصالح تحسينات الوضع الفاتح
- **Required Workflow Per Page:**
- **سير العمل المطلوب لكل صفحة:**
- dark-mode refinement baseline
- تأسيس خط الأساس لتحسينات الوضع الداكن
- lock dark mode visually
- قفل الوضع الداكن بصريًا
- implement light mode in parallel structure
- تنفيذ الوضع الفاتح ضمن بنية موازية
- validate both modes together
- التحقق من الوضعين معًا
- approve the page only when both are stable
- لا تعتمد الصفحة إلا بعد استقرار الوضعين معًا
- **Success Criteria:**
- **معايير النجاح:**
- dark mode matches the approved reference exactly
- يطابق الوضع الداكن المرجع المعتمد بدقة
- light mode is visually aligned and softened correctly
- يكون الوضع الفاتح متوافقًا بصريًا ومخففًا بالشكل الصحيح
- no cross-mode contamination exists
- لا يوجد أي تلوث بصري بين الوضعين
- all styling is cleanly scoped in CSS, not HTML
- جميع الأنماط مفصولة بوضوح داخل CSS وليس داخل HTML
- no visual drift occurs during interaction states such as hover, scroll, and focus
- لا يحدث أي انحراف بصري أثناء حالات التفاعل مثل hover وscroll وfocus

### Complete UI System (Master v1)
### نظام الواجهة الكامل (الإصدار الرئيسي 1)

This section is the single source of truth for UI design, implementation rules, cleanup workflow, auditing standards, and component behavior. It must be followed by Codex, Claude, developers, and any review or audit workflow touching the product UI.
هذا القسم هو المصدر الوحيد المعتمد لتصميم الواجهة وقواعد التنفيذ وسير عمل التنظيف ومعايير التدقيق وسلوك المكونات. ويجب أن يلتزم به Codex وClaude والمطورون وأي مسار مراجعة أو تدقيق يمس واجهة المنتج.

#### 1. Core Philosophy
#### ١. الفلسفة الأساسية

- Visual direction must stay clean, cinematic, structured, and calm.
- يجب أن يبقى الاتجاه البصري نظيفًا وسينمائيًا ومنظمًا وهادئًا.
- UI must not become glossy, decorative, heavy, or effect-driven.
- لا يجوز أن تتحول الواجهة إلى شكل لامع أو زخرفي أو ثقيل أو قائم على المؤثرات.
- No visual noise is allowed unless explicitly approved: glow, heavy shadows, gradient stacking, glassmorphism, and layered backgrounds are forbidden by default.
- لا يُسمح بأي ضوضاء بصرية إلا عند الاعتماد الصريح: ويُمنع افتراضيًا الـ glow والظلال الثقيلة وتكديس التدرجات والـ glassmorphism والخلفيات الطبقية.
- Single surface ownership is mandatory: canvas owns the background, sections own structure, and cards own the visible surface.
- ملكية السطح الواحدة إلزامية: تمتلك الـ canvas الخلفية وتمتلك الأقسام البنية وتمتلك البطاقات السطح المرئي.
- Never allow both parent and child to paint competing surfaces.
- لا يجوز أبدًا السماح للأب والابن معًا برسم أسطح متنافسة.
- Separation must come from borders, spacing, and contrast rather than shadows, blur, or glow.
- يجب أن يأتي الفصل من الحدود والمسافات والتباين بدلًا من الظلال أو الـ blur أو الـ glow.

#### 2. Color System
#### ٢. نظام الألوان

- The global canvas is defined only in `core.css` through the shared canvas token system.
- يتم تعريف الـ canvas العام فقط داخل `core.css` عبر نظام token مشترك للـ canvas.
- Locked canvas references: dark `#070d08`, light `#e7ece3`.
- مراجع الـ canvas المقفلة هي: الداكن `#070d08` والفاتح `#e7ece3`.
- No page may override the base canvas.
- لا يجوز لأي صفحة أن تعيد تعريف خلفية الـ canvas الأساسية.
- Surface levels are fixed as: Surface 0 = canvas, Surface 1 = section, Surface 2 = card/input, Surface 3 = active.
- مستويات الأسطح ثابتة: Surface 0 = canvas وSurface 1 = section وSurface 2 = card/input وSurface 3 = active.
- Semantic colors are restricted to meaning: green = confirmed, yellow = pending, red = cancelled.
- الألوان الدلالية محصورة في المعنى: الأخضر = مؤكد، الأصفر = قيد الانتظار، الأحمر = ملغي.
- Semantic colors may be used on text, numbers, and icons only, not on full cards or large background surfaces.
- يجوز استخدام الألوان الدلالية على النصوص والأرقام والأيقونات فقط، وليس على البطاقات الكاملة أو الخلفيات الكبيرة.

#### 3. Spacing System
#### ٣. نظام المسافات

- The locked spacing scale is: `8px` micro, `12px` tight, `16px` base, `24px` section, `32px` major.
- مقياس المسافات المقفل هو: `8px` صغير جدًا و`12px` ضيق و`16px` أساسي و`24px` للأقسام و`32px` رئيسي.
- Random spacing is not allowed.
- لا يُسمح بمسافات عشوائية.

#### 4. Interaction Rules
#### ٤. قواعد التفاعل

- Hover states are required, but they must stay subtle.
- حالات الـ hover مطلوبة، لكن يجب أن تبقى خفيفة.
- Focus states must be clean and visibly accessible.
- يجب أن تكون حالات الـ focus نظيفة وواضحة بصريًا.
- Active states must stay minimal and controlled.
- يجب أن تبقى حالات الـ active بسيطة ومضبوطة.

#### 5. Image System
#### ٥. نظام الصور

- Images use fixed controlled sizes, typically `32px` to `40px`.
- تستخدم الصور أحجامًا ثابتة ومضبوطة، عادة بين `32px` و`40px`.
- Distortion is not allowed.
- لا يُسمح بالتشويه.
- Fallbacks are mandatory.
- الحالات البديلة إلزامية.
- Image surfaces must not use shadows.
- لا يجوز لأسطح الصور استخدام الظلال.

#### 6. Dark / Light Mode
#### ٦. الوضع الداكن والفاتح

- Every visual change must support both dark and light mode intentionally.
- يجب أن يدعم كل تغيير بصري الوضع الداكن والفاتح بشكل مقصود.
- The required workflow is: implement, mirror, verify.
- سير العمل المطلوب هو: تنفيذ، ثم موازاة، ثم تحقق.
- Never fix one mode in isolation.
- لا يجوز إصلاح أحد الوضعين بمعزل عن الآخر.

#### 7. Shadow And Depth Rule
#### ٧. قاعدة الظلال والعمق

- Depth must come from contrast, borders, and spacing.
- يجب أن يأتي العمق من التباين والحدود والمسافات.
- Shadow stacks, glow, and gradient depth systems are forbidden.
- أنظمة العمق المعتمدة على تكديس الظلال أو الـ glow أو التدرجات ممنوعة.
- The allowed depth model is fixed at three levels only: canvas, structural shell, inner surface.
- نموذج العمق المسموح ثابت عند ثلاثة مستويات فقط: canvas ثم shell بنيوي ثم سطح داخلي.

#### 8. Pagination And List Management
#### ٨. إدارة الترقيم والقوائم

- Pagination is mandatory for tables, project lists, reservations, and logs.
- الترقيم إلزامي للجداول وقوائم المشاريع والحجوزات والسجلات.
- Endless long scrolling is not allowed for these surfaces.
- لا يُسمح بالتمرير الطويل غير المنتهي لهذه الأسطح.
- Use pagination or load-more patterns with consistent placement and style.
- استخدم الترقيم أو نمط التحميل الإضافي مع توحيد المكان والأسلوب.
- Typical page sizes: `10–25` rows for tables and controlled-sized card blocks for card lists.
- الأحجام المعتادة للصفحات: `10–25` صفًا للجداول وكتل بطاقات مضبوطة الحجم لقوائم البطاقات.

#### 9. Form System v1
#### ٩. نظام النماذج v1

- Form structure is fixed as label, input, helper.
- بنية النموذج ثابتة: عنوان ثم حقل ثم نص مساعد.
- Spacing must follow: label to input `6–8px`, field to field `16–20px`.
- يجب أن تتبع المسافات: من العنوان إلى الحقل `6–8px`، ومن حقل إلى آخر `16–20px`.
- Inputs use borders only, no shadows, with consistent height around `40–44px`.
- تستخدم الحقول حدودًا فقط دون ظلال، مع ارتفاع متسق يقارب `40–44px`.
- Focus uses border emphasis, errors use red border plus text, and disabled states use reduced opacity.
- يستخدم الـ focus إبرازًا للحدود، وتستخدم الأخطاء حدودًا حمراء مع نص، وتستخدم الحالات المعطلة شفافية مخفضة.
- Buttons must not become full width unless truly needed, and must stay consistent in size and free of glossy effects.
- لا يجوز أن تصبح الأزرار بعرض كامل إلا عند الحاجة الفعلية، ويجب أن تبقى متسقة في الحجم وخالية من التأثيرات اللامعة.

#### 10. Table System v1
#### ١٠. نظام الجداول v1

- Tables must keep clean rows, aligned content, and readable density.
- يجب أن تحافظ الجداول على صفوف نظيفة ومحتوى مصطف ومحاذاة وكثافة قابلة للقراءة.
- Image cells use the same `32–40px` system with required fallbacks and alignment with text.
- تستخدم خلايا الصور نفس نظام `32–40px` مع حالات بديلة إلزامية ومحاذاة مع النص.
- Status treatment uses color on text and icons only, never on the full row.
- تستخدم الحالات اللون على النصوص والأيقونات فقط، وليس على الصف الكامل.
- Density must stay readable and must not become compressed.
- يجب أن تبقى الكثافة مقروءة ولا يجوز أن تتحول إلى شكل مضغوط.

#### 11. Pagination Component v1
#### ١١. مكون الترقيم v1

- The canonical structure is: previous, page numbers, next.
- البنية القياسية هي: السابق، أرقام الصفحات، التالي.
- Styling must stay within the same surface system without glow or shadow.
- يجب أن يبقى التنسيق داخل نفس نظام الأسطح بدون glow أو shadow.
- Placement is consistently at the bottom.
- يكون الموضع ثابتًا في الأسفل.

#### 12. Cleanup System
#### ١٢. نظام التنظيف

- **Level 0 — Approval Lock:** once approved, the UI is frozen visually.
- **المستوى 0 — قفل الاعتماد:** بعد الاعتماد يتم تجميد الواجهة بصريًا.
- **Level 1 — Page Cleanup:** only dead CSS removal and code simplification are allowed; visual changes are forbidden.
- **المستوى 1 — تنظيف الصفحة:** يُسمح فقط بإزالة CSS الميت وتبسيط الكود؛ أما التغييرات البصرية فممنوعة.
- **Level 2 — Shared Extraction:** reusable components may be extracted only without changing the approved visual result.
- **المستوى 2 — الاستخراج المشترك:** يجوز استخراج المكونات القابلة لإعادة الاستخدام فقط بدون تغيير النتيجة البصرية المعتمدة.
- **Level 3 — Global Cleanup:** remove legacy layers, unify the system, and run regression verification.
- **المستوى 3 — التنظيف العالمي:** إزالة الطبقات القديمة وتوحيد النظام مع تشغيل تحقق من الانحدارات.

#### 13. Regression Protection
#### ١٣. الحماية من الانحدارات

- Before cleanup: capture the UI, apply changes, compare.
- قبل التنظيف: التقط الواجهة ثم طبق التغييرات ثم قارن.
- If the result changes, revert and fix.
- إذا تغيرت النتيجة، فتراجع وأصلح.

#### 14. Approval Rule
#### ١٤. قاعدة الاعتماد

- Once a page is approved, it is locked.
- بمجرد اعتماد الصفحة، تصبح مقفلة.
- Only cleanup and optimization work may proceed, and they must preserve the approved appearance.
- لا يجوز بعد ذلك إلا أعمال التنظيف والتحسين، ويجب أن تحافظ على المظهر المعتمد.

#### 15. Development Flow
#### ١٥. تدفق التطوير

- The required flow is: Audit → Fix → Polish → Approve → Cleanup → Lock.
- التدفق المطلوب هو: تدقيق → إصلاح → صقل → اعتماد → تنظيف → قفل.

#### 16. Audit Mode
#### ١٦. وضع التدقيق

- Every UI review must inspect: surface ownership, spacing, hierarchy, shadows, consistency, dark/light parity, and pagination.
- يجب أن يفحص كل تدقيق للواجهة: ملكية الأسطح والمسافات والهرمية والظلال والاتساق والتكافؤ بين الداكن والفاتح والترقيم.

#### 17. Master Control Rule
#### ١٧. قاعدة التحكم الرئيسية

- AI systems and developers must follow this system, must not invent new styles, and must match approved pages.
- يجب على أنظمة الذكاء الاصطناعي والمطورين اتباع هذا النظام وعدم اختراع أنماط جديدة ومواءمة الصفحات المعتمدة.
- If uncertain, follow the locked `login` and `home` references.
- عند الشك، اتبع المراجع المقفلة لصفحتي `login` و`home`.

**Final Principle:** this is not a flexible design system. It is a controlled system.
**المبدأ النهائي:** هذا ليس نظام تصميم مرنًا، بل نظام مضبوط ومحكوم.

### Per-Page Tracking Requirements
### متطلبات التتبع لكل صفحة

- For each approved page, this master plan must record:
- لكل صفحة معتمدة، يجب أن يسجل هذا الملف:
- visual approval status
- حالة الاعتماد البصري
- Level 1 cleanup status
- حالة تنظيف المستوى الأول
- Level 2 extraction candidacy
- قابلية الاستخراج في المستوى الثاني
- whether any patterns from that page are now approved shared candidates
- ما إذا كانت أي أنماط من تلك الصفحة أصبحت مرشحات مشتركة معتمدة
- This record may live in the active phase notes, the relevant phase subsection, or the progress log entry for that page, but it must exist in this file before handoff.
- يمكن أن يعيش هذا السجل في ملاحظات المرحلة النشطة أو في القسم الخاص بالمرحلة أو في سجل التقدم الخاص بالصفحة، لكن يجب أن يكون موجودًا في هذا الملف قبل التسليم.

### New Page Rollout Classification Rule
### قاعدة تصنيف أي ترحيل جديد لصفحة

- Every new page rollout must state clearly:
- يجب أن يوضح كل ترحيل جديد لصفحة بوضوح:
- which parts are temporary page-local pilot rules
- ما هي الأجزاء التي تمثل قواعد محلية مؤقتة خاصة بالتجربة
- which parts are candidates for shared extraction later
- ما هي الأجزاء المرشحة لاستخراج مشترك لاحقًا
- which parts are truly page-specific
- ما هي الأجزاء الخاصة بالصفحة فعلًا

### Reusable Checklists
### قوائم التحقق القابلة لإعادة الاستخدام

#### Per-Page Approval And Cleanup Checklist
#### قائمة تحقق اعتماد الصفحة وتنظيفها

- visual implementation complete
- visual review complete
- page approved
- Level 1 cleanup complete
- page-specific rules documented
- shared extraction candidates documented
- ready to move to next page

#### Shared Extraction Checklist
#### قائمة تحقق الاستخراج المشترك

- approved pages compared
- repeated patterns verified
- extraction candidates confirmed
- shared owner or primitive updated
- duplicated page-level rules reduced
- regression check complete

#### Global Cleanup Checklist
#### قائمة تحقق التنظيف العالمي

- legacy usage audit complete
- deprecated shared styles identified
- safe deletion candidates verified
- compatibility or regression review complete
- global cleanup executed
- architecture tightened

### Phase 1. Foundation Stabilization
### المرحلة ١. تثبيت الأساسيات

- **Status:** `Done`
- **Objective:** Unify theme policy, dark selectors, token direction, and source-of-truth rules.
- **In Scope:** theme boot/runtime contract, selector normalization policy, token ownership rules, doc-driven team process.
- **Out of Scope:** page-level redesign of high-risk product surfaces.
- **Dependencies:** none
- **Done Criteria:** one agreed theme contract, one selector policy, one master plan file in active use, source-of-truth rules recorded.
- **Required Automated Checks:** `npm run test:reservations`
- **Required Manual Smoke Checks:** theme boot sanity on login, dashboard, projects, customer, technician
- **Rollback Concern Summary:** accidental behavior drift from changing theme or boot expectations

### Phase 2. Shared Shell Extraction
### المرحلة ٢. استخراج الـ Shell المشترك

- **Status:** `Done`
- **Objective:** De-duplicate sidebar, header, top controls, greeting structures, and shell composition patterns.
- **In Scope:** shared shell structure, repeated page chrome, reusable shell contract.
- **Out of Scope:** reservations workflows, reports export, PDF/template surfaces.
- **Dependencies:** Phase 1 done
- **Done Criteria:** shared shell patterns are extracted and reused across duplicated pages, the chosen pilot family is migrated first, and shell anchors remain stable.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** navigation, sidebar behavior, header controls, greeting toggle, logout, language, theme
- **Rollback Concern Summary:** navigation or shell regressions across multiple pages at once

### Phase 2 Pilot Decision
### قرار الـ Pilot للمرحلة الثانية

- The first extraction pilot family is the compact manager shell: `site-analytics.html`, `contact-inquiries.html`, and `feedback-submissions.html`.
- أول عائلة pilot للاستخراج هي compact manager shell: الصفحات `site-analytics.html` و`contact-inquiries.html` و`feedback-submissions.html`.
- These three pages were chosen because they share the compact shell anchors, avoid the deepest operational tab complexity, and have lower feature risk than dashboard, projects, customer, and technician.
- تم اختيار هذه الصفحات الثلاث لأنها تشترك في compact shell anchors نفسها، وتتجنب تعقيد التبويبات التشغيلية الأعمق، وتحمل خطرًا وظيفيًا أقل من صفحات dashboard وprojects وcustomer وtechnician.
- `users.html` followed after the compact manager trio and now uses the same composition path while preserving its Bootstrap modal dependency and users-specific translation module order.
- جاءت صفحة `users.html` بعد ثلاثي الـ compact manager وأصبحت الآن تستخدم نفس مسار التركيب مع الحفاظ على اعتماد Bootstrap modal وترتيب تحميل وحدة ترجمة المستخدمين الخاصة بها.
- Dashboard, projects, customer, and technician remain out of the pilot and must not be the first extraction target.
- تبقى صفحات dashboard وprojects وcustomer وtechnician خارج الـ pilot ولا يجوز أن تكون هدف الاستخراج الأول.

### Phase 2 Next Family Order
### ترتيب عائلة الـ Shell التالية في المرحلة الثانية

- The next shell-family migration order after compact validation is `tabs` first, then `full`.
- ترتيب ترحيل عائلة الـ shell التالية بعد التحقق من compact هو `tabs` أولًا ثم `full`.
- The `tabs` family is the next recommended extraction target because it keeps the shared stats + tabs shell shape without the extra quick-links panel and without the dense in-page operational tab engines that currently make the `full` family riskier.
- عائلة `tabs` هي هدف الاستخراج التالي الموصى به لأنها تحتفظ بشكل الـ shell المشترك القائم على stats + tabs بدون لوحة quick-links الإضافية وبدون محركات التبويب التشغيلية الكثيفة داخل الصفحة التي تجعل عائلة `full` أكثر خطورة حاليًا.
- Evidence snapshot: `home.html` is `326` lines, `customer.html` is `530`, and `technician.html` is `555`, while `projects.html` is `1000` lines and `dashboard.html` is `2318`, with `dashboard.html` still carrying FullCalendar, XLSX, and repeated `data-tab` control surfaces.
- لقطة الأدلة: يبلغ `home.html` عدد `326` سطرًا و`customer.html` عدد `530` و`technician.html` عدد `555`، بينما يبلغ `projects.html` عدد `1000` سطرًا و`dashboard.html` عدد `2318`، كما تحمل صفحة `dashboard.html` مكتبات FullCalendar وXLSX وأسـطح تحكم متكررة من نوع `data-tab`.
- The `full` family should stay deferred until the `tabs` family proves the extracted shell contract against richer greeting panels, Bootstrap/Flatpickr dependencies, and detail-page surface variations.
- يجب أن تبقى عائلة `full` مؤجلة حتى تثبت عائلة `tabs` عقد الـ shell المستخرج في مواجهة لوحات greeting أغنى واعتمادات Bootstrap وFlatpickr وتنوع أسطح صفحات التفاصيل.

### Phase 2 Full Family Prep Snapshot
### لقطة التحضير لعائلة Full في المرحلة الثانية

- `dashboard.html` and `projects.html` are the current `full` shell family because both preserve the full sidebar composition of stats panel, tabs panel, and quick-links panel, while keeping the same header utilities and greeting wrapper used by the extracted families.
- تشكل الصفحتان `dashboard.html` و`projects.html` عائلة الـ shell الحالية `full` لأن كلتيهما تحافظان على التركيب الكامل للشريط الجانبي من لوحة الإحصاءات ولوحة التبويبات ولوحة الروابط السريعة، مع الاحتفاظ بأدوات الهيدر نفسها وغلاف الـ greeting المستخدم في العائلات المستخرجة.
- `projects.html` is the first recommended extraction target inside the `full` family because it is smaller (`1110` lines vs `2437`), already boots from its page-owned module `/src/scripts/projects.js`, and carries fewer global operational contracts than `dashboard.html`.
- تعتبر صفحة `projects.html` هدف الاستخراج الأول الموصى به داخل عائلة `full` لأنها أصغر (`1110` سطرًا مقابل `2437`)، وتبدأ بالفعل من وحدة خاصة بها `/src/scripts/projects.js`، وتحمل عقودًا تشغيلية عامة أقل من صفحة `dashboard.html`.
- `dashboard.html` must stay second because it still boots through `/src/main.js` and combines reservations, equipment, maintenance, reports, calendar, Excel export, and many modal contracts in one shell surface.
- يجب أن تبقى صفحة `dashboard.html` في المرتبة الثانية لأنها ما زالت تبدأ من `/src/main.js` وتجمع الحجوزات والمعدات والصيانة والتقارير والتقويم وتصدير Excel والعديد من عقود الـ modals داخل سطح shell واحد.
- `projects.html` is now the validated full-shell baseline, and the first `dashboard.html` extraction pass onto `src/pages/_partials/full-manager-shell.html` is now implemented while keeping `dashboard.html` as the heavier second full-family surface.
- أصبحت `projects.html` الآن خط الأساس المُتحقَّق منه لعائلة الـ full shell، كما تم تنفيذ أول تمريرة لاستخراج `dashboard.html` إلى `src/pages/_partials/full-manager-shell.html` مع بقاء `dashboard.html` السطح الثاني الأثقل ضمن عائلة full.
- The first `dashboard.html` extraction pass onto `src/pages/_partials/full-manager-shell.html` is now implemented.
- تم الآن تنفيذ أول تمريرة لاستخراج `dashboard.html` إلى `src/pages/_partials/full-manager-shell.html`.
- Shared `full`-family shell anchors confirmed in both pages: `#sidebar-backdrop`, `#dashboard-sidebar`, `.sidebar-panel--stats`, `.sidebar-panel--tabs`, `.sidebar-panel--links`, `.dashboard-header`, `.dashboard-header-nav`, `#sidebar-open`, `#sidebar-close`, `data-dashboard-greeting`, `data-greeting-toggle`, `data-greeting-panel`, `#language-toggle`, `data-theme-toggle`, and `#logout-btn`.
- تم تأكيد anchors المشتركة لعائلة `full` في الصفحتين: `#sidebar-backdrop` و`#dashboard-sidebar` و`.sidebar-panel--stats` و`.sidebar-panel--tabs` و`.sidebar-panel--links` و`.dashboard-header` و`.dashboard-header-nav` و`#sidebar-open` و`#sidebar-close` و`data-dashboard-greeting` و`data-greeting-toggle` و`data-greeting-panel` و`#language-toggle` و`data-theme-toggle` و`#logout-btn`.
- Shared dependency floor for both pages: `/js/page-boot.js`, `/src/styles/app.css`, `/css/sidebar.css`, Flatpickr CSS/JS, `/src/scripts/language.js`, `/src/scripts/translations/common.js`, and `/src/scripts/translations/dashboard.js`.
- الحد الأدنى المشترك للاعتمادات في الصفحتين هو: `/js/page-boot.js` و`/src/styles/app.css` و`/css/sidebar.css` وFlatpickr CSS/JS و`/src/scripts/language.js` و`/src/scripts/translations/common.js` و`/src/scripts/translations/dashboard.js`.
- `projects.html` prep risks to keep explicit before extraction: Bootstrap RTL CSS coupling, top-level content tabs via `data-tab-target`, nested project subtabs via `data-project-subtab-target`, reports/templates surfaces, and the modal trio `#projectDetailsModal`, `#reservationDetailsModal`, and `#closeProjectModal`.
- مخاطر التحضير الخاصة بصفحة `projects.html` التي يجب إبقاؤها واضحة قبل الاستخراج هي: الارتباط بـ Bootstrap RTL CSS، وتبويبات المحتوى العليا عبر `data-tab-target`، والتبويبات الفرعية للمشاريع عبر `data-project-subtab-target`، وأسـطح التقارير والقوالب، وثلاثية الـ modals التالية `#projectDetailsModal` و`#reservationDetailsModal` و`#closeProjectModal`.
- `dashboard.html` prep risks to keep explicit before extraction: sidebar tab triggers via `data-tab`, FullCalendar runtime, XLSX export loading, maintenance report/close modals, reservation/calendar modals, and the dense reports + calendar surfaces that are dark-theme sensitive.
- مخاطر التحضير الخاصة بصفحة `dashboard.html` التي يجب إبقاؤها واضحة قبل الاستخراج هي: مشغلات التبويب الجانبية عبر `data-tab`، وتشغيل FullCalendar، وتحميل XLSX للتصدير، وmodals تقارير/إغلاق الصيانة، وmodals الحجوزات/التقويم، والأسطح الكثيفة للتقارير والتقويم الحساسة للوضع الداكن.
- The shared `full`-family shell scaffold now exists at `src/pages/_partials/full-manager-shell.html`, and it owns the repeated full-shell chrome only: backdrop, drawer brand block, stats panel wrapper, tabs panel wrapper, quick-links wrapper, header chrome, greeting wrapper, page frame, and footer script slots.
- أصبح scaffold المشترك لعائلة `full` موجودًا الآن داخل `src/pages/_partials/full-manager-shell.html`، وهو يملك فقط عناصر الـ full-shell المكررة: الخلفية، وكتلة العلامة داخل الـ drawer، وغلاف لوحة الإحصاءات، وغلاف لوحة التبويبات، وغلاف الروابط السريعة، وعناصر الهيدر، وغلاف الـ greeting، وإطار الصفحة، وفتحات السكربتات الختامية.
- The slot contract for the `full` family is now fixed as `sidebarStats`, `sidebarTabs`, `sidebarLinks`, `greetingPanel`, `mainContent`, `afterShell`, and `pageScripts`; page-level business content must stay outside the shell scaffold.
- تم تثبيت عقد الـ slots لعائلة `full` الآن كالتالي: `sidebarStats` و`sidebarTabs` و`sidebarLinks` و`greetingPanel` و`mainContent` و`afterShell` و`pageScripts`، بينما يجب أن يبقى محتوى الأعمال الخاص بكل صفحة خارج scaffold الخاص بالـ shell.
- The dedicated dark-validation plan for the `full` family must be recorded before any shared partial replaces either page, with `projects.html` validated first and `dashboard.html` validated only after the smaller path is stable.
- يجب توثيق خطة تحقق مستقلة للوضع الداكن لعائلة `full` قبل أن يستبدل أي partial مشترك أيًا من الصفحتين، على أن يتم التحقق من `projects.html` أولًا ثم `dashboard.html` فقط بعد استقرار المسار الأصغر.

### Projects Full-Family Dark Validation Checklist
### قائمة تحقق الوضع الداكن لصفحة Projects ضمن عائلة Full

- Validate first paint and post-auth reveal on `projects.html` with the sidebar closed and with the sidebar opened on mobile.
- تحقّق من أول رسم للصفحة ومن حالة ما بعد إظهار الصفحة بعد المصادقة في `projects.html` مع الشريط الجانبي مغلقًا، ثم مع فتحه على الجوال.
- Validate the full sidebar in dark mode: stats rows, tabs panel, quick-links panel, active tab button, hover states, and border separation.
- تحقّق من الشريط الجانبي الكامل في الوضع الداكن: صفوف الإحصاءات، ولوحة التبويبات، ولوحة الروابط السريعة، والزر النشط، وحالات المرور، وفواصل الحدود.
- Validate the greeting shell opened and closed, including summary cards, text contrast, toggle icon state, and panel borders.
- تحقّق من غلاف الـ greeting في الحالتين المفتوحة والمغلقة، بما في ذلك بطاقات الملخص، وتباين النص، وحالة أيقونة الفتح، وحدود اللوحة.
- Validate the top-level content tabs driven by `data-tab-target` and the nested project subtabs driven by `data-project-subtab-target`.
- تحقّق من تبويبات المحتوى العلوية المبنية على `data-tab-target` ومن التبويبات الفرعية للمشاريع المبنية على `data-project-subtab-target`.
- Validate Flatpickr-backed fields, filter controls, and both empty and populated list/table surfaces in dark mode.
- تحقّق من الحقول المدعومة بـ Flatpickr وعناصر التحكم الخاصة بالفلاتر وحالات القوائم أو الجداول الفارغة والمعبأة في الوضع الداكن.
- Validate all three modal surfaces in dark mode: `#projectDetailsModal`, `#reservationDetailsModal`, and `#closeProjectModal`, including close buttons, headers, body text, footer buttons, and overlays.
- تحقّق من أسطح الـ modals الثلاثة في الوضع الداكن: `#projectDetailsModal` و`#reservationDetailsModal` و`#closeProjectModal` بما يشمل أزرار الإغلاق والرؤوس ونصوص المحتوى وأزرار التذييل والطبقات الخلفية.
- Validate reports and templates sections separately because they are visually dense and likely to surface dark-theme contrast drift before the shell itself does.
- تحقّق من أقسام التقارير والقوالب بشكل منفصل لأنها كثيفة بصريًا ومن المرجح أن تكشف انجرافات التباين في الوضع الداكن قبل أن تظهر على الـ shell نفسه.
- Run this checklist in Arabic and English, and on desktop plus narrow mobile width, before `projects.html` is migrated onto the shared `full` shell.
- نفّذ هذه القائمة باللغة العربية والإنجليزية، وعلى سطح المكتب وعلى عرض جوال ضيق، قبل ترحيل `projects.html` إلى الـ full shell المشترك.

### Dashboard Full-Family Dark Validation Checklist
### قائمة تحقق الوضع الداكن لصفحة Dashboard ضمن عائلة Full

- Validate first paint and post-auth reveal on `dashboard.html` with the shared shell closed and with the greeting panel expanded.
- تحقّق من أول رسم للصفحة ومن حالة ما بعد إظهار الصفحة بعد المصادقة في `dashboard.html` مع الـ shell في الحالة المغلقة ثم مع فتح لوحة الـ greeting.
- Validate the raw full sidebar in dark mode before extraction: stats rows, tab groups, quick links, active states, hover states, and border separation.
- تحقّق من الشريط الجانبي الكامل الخام في الوضع الداكن قبل الاستخراج: صفوف الإحصاءات، ومجموعات التبويب، والروابط السريعة، والحالات النشطة، وحالات المرور، وفواصل الحدود.
- Validate the maintenance surface in dark mode: the create-ticket form, filters, table shell, and both `#closeMaintenanceModal` and `#maintenanceReportModal`.
- تحقّق من سطح الصيانة في الوضع الداكن: نموذج إنشاء التذكرة، والفلاتر، وهيكل الجدول، وكلًا من `#closeMaintenanceModal` و`#maintenanceReportModal`.
- Validate the reservations reports surface separately because it is the densest dashboard area: filters, KPI grid, chart cards, maintenance-costs table, forecast table, top-outstanding table, and the main `#reports-reservations-table`.
- تحقّق من سطح تقارير الحجوزات بشكل منفصل لأنه أكثر أسطح dashboard كثافة: الفلاتر، وشبكة الـ KPI، وبطاقات الرسوم، وجدول تكاليف الصيانة، وجدول التوقعات، وجدول أعلى المستحقات، والجدول الرئيسي `#reports-reservations-table`.
- Validate the reservations calendar surface in dark mode, including `#calendar-panel`, legend/status treatment, and the open `#calendarReservationModal`.
- تحقّق من سطح تقويم الحجوزات في الوضع الداكن بما يشمل `#calendar-panel` وطريقة عرض الـ legend/status وفتح `#calendarReservationModal`.
- Validate reservation-management modals in dark mode: `#reservationDetailsModal` and `#closeReservationModal`, including headers, body text, textarea/input chrome, footer buttons, and overlays.
- تحقّق من modals إدارة الحجوزات في الوضع الداكن: `#reservationDetailsModal` و`#closeReservationModal` بما يشمل الرؤوس ونصوص المحتوى وهيئة textarea/input وأزرار التذييل والطبقات الخلفية.
- Validate the mobile drawer-open state on narrow width with the dashboard raw shell still in place before any extraction begins.
- تحقّق من حالة فتح الـ drawer على الجوال بعرض ضيق مع بقاء الـ shell الخام الخاص بصفحة dashboard قبل بدء أي استخراج.
- Run this checklist in Arabic and English, and on desktop plus narrow mobile width, before the migrated `dashboard.html` shell is handed off as stable.
- نفّذ هذه القائمة باللغة العربية والإنجليزية، وعلى سطح المكتب وعلى عرض جوال ضيق، قبل تسليم shell صفحة `dashboard.html` المُرحّلة على أنها مستقرة.

### Phase 3. Core UI Primitives
### المرحلة ٣. بناء الـ UI Primitives الأساسية

- **Status:** `Done`
- **Objective:** Standardize buttons, form controls, cards, tables, modals, badges, tabs, empty states, and stat cards.
- **In Scope:** shared styling contract and reusable primitive patterns.
- **Out of Scope:** deep redesign of business workflows.
- **Dependencies:** Phase 2 done
- **Done Criteria:** primitive contract is stable and used by low-risk surfaces first.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** buttons, forms, modals, tabs, dark mode, RTL/LTR, Arabic/English
- **Rollback Concern Summary:** broad visual changes with subtle interaction regressions

### Phase 3A. System Stabilization Before Visual Direction
### المرحلة ٣A. تثبيت النظام قبل اختيار الاتجاه البصري

- **Status:** `Done`
- **Objective:** Clean and stabilize the shared UI system before any final visual direction or further page rollout is allowed.
- **In Scope:** dark-selector re-closure, shared control contract cleanup, owner-based legacy literal purge, elevation simplification, surface-ownership cleanup, token rationalization, and verified deletion-ledger preparation
- **Out of Scope:** decorative redesign, cinematic/glossy/glowy styling, broad recolor passes for taste, and new page beautification
- **Dependencies:** Phase 3 done
- **Done Criteria:** the dark-selector contract is closed, shared controls are consistent, obvious blue/navy leakage is removed from shared chrome, duplicated depth systems are reduced, token ownership is clearer, and the system is stable enough to support a later explicit visual-direction decision.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** login auth shell, dashboard fixture route, one compact page, one details page, shared modal/control states, desktop/mobile dark mode
- **Rollback Concern Summary:** changing shared ownership layers too quickly can destabilize large untouched surfaces if selector and wrapper contracts are not re-closed in the right order

### Phase 3A Goals
### أهداف المرحلة ٣A

- Establish the real canonical dark-mode contract and remove contradictory selector families.
- ثبّت عقد الوضع الداكن القياسي الحقيقي وأزل العائلات المتناقضة من الـ selectors.
- Reduce noise and instability without choosing the final style language yet.
- قلّل الضوضاء وعدم الاستقرار دون اختيار اللغة البصرية النهائية بعد.
- Make shared controls deterministic so page modules stop fighting the shared chrome.
- اجعل عناصر التحكم المشتركة حتمية وواضحة حتى تتوقف الوحدات الخاصة بالصفحات عن مجادلة الطبقة المشتركة.
- Enforce one visual owner per surface wherever wrapper/card stacking is currently creating fractures and dirty halos.
- افرض مالكًا بصريًا واحدًا لكل سطح في الأماكن التي ما زال فيها تكدس wrapper/card يسبب التشققات والهالات القذرة.

### Phase 3A Constraints And Freeze Rules
### القيود وقواعد التجميد للمرحلة ٣A

- **Blocked:** further page rollout on `feedback-submissions.html`, `users.html`, and any later page family until the shared baseline is re-closed.
- **Blocked:** broad visual restyling, page beautification, and final visual-direction decisions.
- **Frozen:** new gradients or shadows added for polish rather than cleanup.
- **Frozen:** global recolor passes that are not tied to owner-based leakage cleanup.
- **Frozen:** style experimentation, decorative glass/glow work, and one-off visual tuning without a contract owner.
- **Allowed:** selector cleanup, ownership cleanup, token rationalization, legacy literal purge, elevation simplification, wrapper/surface cleanup, shared control cleanup, dead-CSS identification, and targeted regression-safe structural cleanup.

### Phase 3A Deferred / Not Yet
### المؤجل / ليس الآن في المرحلة ٣A

- Final visual direction selection.
- اختيار الاتجاه البصري النهائي.
- Cinematic, glossy, or glowy redesign passes.
- تمريرات إعادة التصميم السينمائية أو اللامعة أو المليئة بالتوهج.
- Broad page beautification of compact/detail/full families.
- تحسين بصري واسع لعائلات الصفحات compact/detail/full.
- Semantic badge redesign and taste-level color exploration beyond true leakage cleanup.
- إعادة تصميم الشارات الدلالية واستكشاف الألوان على مستوى الذوق خارج نطاق تنظيف التسرب الفعلي.

### Phase 3A Risk Map
### خريطة المخاطر في المرحلة ٣A

- **High Risk:** `src/styles/core.css` because it still owns the global dark token bridge, control chrome, and a large part of the elevation model.
- **High Risk:** `src/styles/app.css` because it still mixes shared shell ownership, direct dark selectors, and page-family bridge layers.
- **High Risk:** `src/styles/reservations.css` because it still carries the heaviest mixed ownership between wrappers, cards, tables, and controls.
- **Medium Risk:** `src/styles/reports.css`, `src/styles/forms.css`, `src/styles/calendar.css`, `src/styles/index.css`, and `src/styles/maintenance.css` because they still contain owner-level legacy literals and local chrome drift.
- **Structural Risk:** script-driven `innerHTML` and inline style mutation can bypass CSS cleanup after shared fixes land.

### Phase 3A Stabilization Roadmap
### خارطة طريق التثبيت في المرحلة ٣A

1. Re-close the dark-selector contract.
1. أعد إغلاق عقد الوضع الداكن.
2. Re-close the shared control contract for input/select/textarea chrome and focus behavior.
2. أعد إغلاق عقد عناصر التحكم المشتركة لواجهة input/select/textarea وسلوك التركيز.
3. Purge legacy blue/navy literals by owner, distinguishing semantic color from accidental chrome leakage.
3. أزل القيم الزرقاء/الكحلية القديمة حسب المالك مع التمييز بين اللون الدلالي والتسرب العرضي في الـ chrome.
4. Simplify the elevation model by reducing duplicated gradients, direct shadows, and layered depth tricks.
4. بسّط نموذج الارتفاع عبر تقليل الـ gradients المكررة والظلال المباشرة وحيل العمق المتراكبة.
5. Clean surface ownership so wrappers stop competing with inner cards/tables/modals.
5. نظّف ملكية الأسطح حتى تتوقف الأغلفة عن منافسة البطاقات والجداول والـ modals الداخلية.
6. Rationalize token layers into clearer keep/merge/redefine/deprecate buckets.
6. نظّم طبقات الـ tokens إلى مجموعات أوضح: احتفاظ / دمج / إعادة تعريف / إهمال.
7. Build a verified deletion ledger before removing legacy visual rules.
7. ابنِ سجل حذف متحققًا منه قبل إزالة القواعد البصرية القديمة.

### Phase 3A File-By-File Cleanup Order
### ترتيب التنظيف ملفًا بملف في المرحلة ٣A

1. `src/styles/core.css`
2. `src/styles/app.css`
3. `src/styles/reservations.css`
4. `src/styles/reports.css`
5. `src/styles/forms.css`
6. `src/styles/calendar.css`
7. `src/styles/index.css`
8. `src/styles/maintenance.css`
9. shared audit files in `tests/theme/*.test.js`
10. only after the shared baseline is green again: page-family rollout files

### Phase 3A Batch 6 Token Bridge Ledger
### سجل الدفعة السادسة لترشيد طبقة الـ Token Bridge في المرحلة ٣A

- **Keep:** `--clr-bg`, `--clr-text`, `--clr-muted`, `--bo-brand-primary`, `--bo-brand-secondary`, `--bo-brand-border`, `--bo-color-action`, `--bo-color-action-soft`, `--bo-color-surface`, `--bo-color-surface-muted`, `--bo-color-text-primary`, `--bo-color-text-muted`, and the `--bo-primitive-card-*` family because they are still live bridge tokens or explicitly pinned by the documented primitive contract.
- **Merge / Collapse:** `--bo-primitive-card-radius` now points directly to `--radius-lg`, and the only live `--bo-radius-control` usage was collapsed back to `--radius-md` in shared pagination chrome. This removes one alias-of-alias hop without changing visuals.
- **Redefine Later:** the remaining `--bo-color-*` surface/elevation family should eventually shrink further, but not in this batch because those tokens are still the active shared contract for shell/content/control/table chrome.
- **Deleted In Batch 6 (verified unused):** `--clr-success`, `--clr-danger`, `--clr-warning`, `--bo-brand-primary-strong`, `--bo-brand-accent`, `--bo-brand-info`, `--bo-radius-surface`, `--bo-radius-control`, `--bo-shadow-surface`, `--bo-shadow-elevated`.
- **Deferred Deletion Candidates (verified but not removed yet):** compatibility aliases such as `.btn`, `.form-control`, `.form-select`, `.table-responsive`, `.card`, `.badge`, and `.modal-*` remain intentionally live because current pages still depend on them next to the `ui-*` bridge classes. They should only be removed after a later owner-by-owner adoption audit proves the legacy alias is no longer required.

### Phase 3A Batch 7 Compatibility Alias Ledger
### سجل الدفعة السابعة لمراجعة الـ Compatibility Aliases في المرحلة ٣A

- **Deleted In Batch 7 (verified zero-reference aliases):** `.mt-5`, `.my-3`, `.my-4`, `.py-4`, `.px-4` from the legacy utility-alias block in `src/styles/app.css`, plus the dead `.input-group-text` dark override in `src/styles/app.css`. These selectors had zero current page, script, or owner-level references and were removed without widening the visual contract.
- **Deferred Live Compatibility Aliases (must stay for now):** `.btn`, `.btn-outline-secondary`, `.form-control`, `.form-select`, `.table-responsive`, `.card`, `.badge`, `.d-flex`, `.flex-column`, `.flex-row`, `.flex-wrap`, `.flex-lg-row`, `.align-items-*`, `.justify-content-*`, `.mb-*`, `.mt-*`, `.p-*`, and `.ms-auto` remain live because current page markup or script-rendered markup still depends on them.
- **Batch 7 Rule:** do not delete a compatibility alias unless the source scan proves zero current page/script usage and the owning style file does not need the alias for an active module-specific bridge.

### Phase 3A Batch 8 Secondary Owner Alias Ledger
### سجل الدفعة الثامنة لمراجعة الـ Aliases في المالكين الثانويين في المرحلة ٣A

- **Deleted In Batch 8 (verified zero-reference aliases):** `.users-page .input-group-text` from `src/styles/index.css`. The users page no longer renders any `input-group-text` markup, so both the light and dark branches were dead secondary-owner compatibility rules.
- **Deferred Live Secondary-Owner Contracts:** `src/styles/reports.css` still owns live `.reports-actions .btn`, `.reports-filters .form-control`, and `.reports-filters .form-select` contracts used by current reports markup. `src/styles/forms.css` still owns live `.management-form-actions .btn-primary`, `.management-search-bar .form-control`, `.customer-upload-inline .btn`, and related module contracts used by dashboard/projects/customer flows. `src/styles/maintenance.css` still owns live `.maintenance-status-filter .form-select` and `.maintenance-status-filter .form-control` contracts tied to the maintenance filters on the dashboard. `src/styles/calendar.css` had no compatibility-alias cleanup target in this batch.
- **Batch 8 Rule:** when a secondary-owner selector is part of an active module contract, keep it in place and defer deletion until the owning markup migrates. Only remove secondary-owner aliases when the usage scan proves the selector is dead in both page markup and script-rendered markup.

### Phase 3A Batch 9 Live Bridge Consolidation Ledger
### سجل الدفعة التاسعة لترشيد الجسور الحية في المرحلة ٣A

- **Consolidated In Batch 9:** `src/styles/reports.css` no longer lets `.reports-filters .form-control` and `.reports-filters .form-select` own report-filter chrome. Those bridge selectors now keep only the shared layout/scaffolding responsibility (`min-width` and stacking context), while the existing module class `.reports-filter-control` owns the padding, min-height, border, and background contract. `src/styles/forms.css` no longer restates a separate dark `.management-form-actions .btn-primary` contract; the shared `.btn-primary` layer now owns dark button chrome there as well, while the form module keeps only layout and sizing.
- **Still Deferred After Batch 9:** direct module contracts that do not yet have a dedicated module class or migration path, such as `.management-search-bar .form-control` in `src/styles/forms.css`, `.maintenance-status-filter .form-select` / `.form-control` in `src/styles/maintenance.css`, and reservation- or dashboard-local bridge selectors that still double as the only owner for their active module.
- **Batch 9 Rule:** where a module already has its own dedicated class, that class should own visual chrome and the compatibility bridge selector should fall back to layout/scaffolding only. Do not force this on selectors that still lack a dedicated module class.

### Phase 3A Batch 10 Live Bridge Consolidation Ledger
### سجل الدفعة العاشرة لترشيد الجسور الحية في المرحلة ٣A

- **Consolidated In Batch 10:** `src/styles/forms.css` no longer lets the generic `.management-search-bar .form-control` selector own customer-search chrome. That bridge selector now keeps only width and flex layout responsibilities, while the existing dedicated owner `#customers-tab #search-customer-input.form-control` owns the customer-search surface contract, sizing details, and focus/dark behavior used by the live dashboard/projects customer-search flows.
- **Still Deferred After Batch 10:** `src/styles/maintenance.css` still owns live `.maintenance-status-filter .form-select` / `.form-control` contracts because the current maintenance filter markup has no dedicated module control class yet. `src/styles/reservations.css` still contains live reservation-local control bridges, but the currently active billing/payment controls already rely on dedicated reservation classes and do not have another safe consolidation candidate without a markup refactor.
- **Batch 10 Rule:** only reduce a live bridge selector when the current markup already ships with a dedicated module owner for the same control. If the module still relies on wrapper-plus-bridge selectors, keep it deferred instead of inventing new ownership during stabilization.

### Phase 3A Batch 11 Deferred Bridge Inventory Ledger
### سجل الدفعة الحادية عشرة لجرد الجسور المؤجلة في المرحلة ٣A

- **Classified In Batch 11:** `src/styles/maintenance.css` keeps `.maintenance-status-filter .form-select` / `.form-control` as a live owner because the current dashboard markup only exposes raw shared controls (`#maintenance-status-filter` and `#maintenance-priority-filter` with `class="ui-select form-select"`). There is no dedicated maintenance control class yet, so further consolidation would require a markup-level owner to be introduced first. In `src/styles/reservations.css`, the create-reservation billing controls are already on dedicated owners (`.reservation-billing-input`, `.reservation-billing-select`, `.payment-status-select`) and should stay as-is, while the generic `#create-tab .reservation-field > .form-control` / `.form-select` rules are layout-only and not a consolidation target.
- **Requires Markup-Level Owners Before Any More Consolidation:** the edit-reservation payment progress controls (`#edit-res-payment-progress-type` and `#edit-res-payment-progress-value`) still render only as `form-select reservation-payment-progress__select` and `form-control reservation-payment-progress__input`. Those selectors currently mix module behavior with shared bridge classes, so they need a dedicated module owner added in the markup before any chrome can move off the bridge safely. The same applies to maintenance filters if we want to stop relying on `.maintenance-status-filter .form-select` / `.form-control`.
- **Explicitly Deferred After Batch 11:** `.filters-bar .form-control` / `.form-select` / `.btn` in `src/styles/reservations.css` remain layout/scaffolding only and are not cleanup targets. Reservation payment/history actions such as `.reservation-payment-progress__actions .btn` and edit-modal confirmation controls like `.btn-confirm-toggle` remain module-local contracts for now because they do not yet have a narrower dedicated owner path that would reduce bridge usage.
- **Batch 11 Rule:** if a selector still depends on raw shared bridge classes in live markup, do not consolidate it further during stabilization. First add a dedicated module owner in markup, then move chrome to that owner in a later batch.

### Phase 3A Batch 12 Markup Owner Preparation Ledger
### سجل الدفعة الثانية عشرة لتهيئة مُلّاك الـ Markup في المرحلة ٣A

- **Prepared In Batch 12:** added dedicated maintenance filter hooks in live dashboard markup via `maintenance-filter-control`, `maintenance-filter-control--status`, and `maintenance-filter-control--priority` on `#maintenance-status-filter` and `#maintenance-priority-filter`. Added dedicated edit-reservation payment-progress hooks in both live dashboard markup and script-rendered modal markup via `reservation-payment-progress__control`, `reservation-payment-progress__control--type`, and `reservation-payment-progress__control--value` on `#edit-res-payment-progress-type` and `#edit-res-payment-progress-value`.
- **Intentionally Not Changed In Batch 12:** no CSS owner was moved yet. `src/styles/maintenance.css` still keeps `.maintenance-status-filter .form-select` / `.form-control`, and `src/styles/reservations.css` still keeps the existing `.reservation-payment-progress__select` / `.reservation-payment-progress__input` behavior. This batch only prepared future owner hooks without changing visual output.
- **Batch 12 Rule:** add the future module owner to live markup first, verify the app still behaves the same, and only then allow a later batch to move chrome off the bridge selectors.

### Phase 3A Batch 13 Owner Move Ledger
### سجل الدفعة الثالثة عشرة لنقل الملكية في المرحلة ٣A

- **Moved In Batch 13:** `src/styles/maintenance.css` now places maintenance filter chrome on `.maintenance-filter-control` while leaving `.maintenance-status-filter .form-select` / `.form-control` with layout-only responsibilities (`width` and `flex`). `src/styles/reservations.css` now places edit payment-progress chrome on `.reservation-payment-progress__control` while leaving `.reservation-payment-progress__select` / `.reservation-payment-progress__input` as the size/layout owner (`height` and `font-size`).
- **Intentionally Not Changed In Batch 13:** no new visual direction, no control recolor, no maintenance/reservation layout changes, and no consolidation of `.filters-bar .form-control` / `.form-select` / `.btn` or other still-deferred bridge selectors. The goal was only to move chrome to the prepared module hooks while preserving the existing look.
- **Batch 13 Rule:** once a dedicated module-owner hook exists, move chrome first and leave any remaining size/layout bridge behavior in place until a later batch proves it can be reduced safely.

### Phase 3A Batch 14 Deferred Bridge Freeze Ledger
### سجل الدفعة الرابعة عشرة لتجميد الجسور المؤجلة في المرحلة ٣A

- **Freeze As Legitimate Module Contracts:** `src/styles/reservations.css` keeps `.reservation-billing-input`, `.reservation-billing-select`, and `.payment-status-select` as valid reservation-local module owners. These selectors already map to dedicated reservation markup and are not bridge debt anymore. `src/styles/reservations.css` also keeps `.reservation-payment-progress__actions .btn-outline-primary` and edit-modal `.btn-confirm-toggle` related button contracts as legitimate module-local actions, not stabilization bridge targets. In `src/styles/maintenance.css`, `.maintenance-status-filter .form-select` / `.form-control` should now be treated as layout-only companions to `.maintenance-filter-control`, not as unresolved bridge debt.
- **Still Worth Reconsidering Later:** generic scaffolding selectors like `.filters-bar .form-control` / `.form-select` / `.btn`, `.reservation-field > .form-control` / `.form-select`, and `#create-tab` alignment selectors remain active, but they are currently layout/scaffolding rules rather than chrome owners. They do not justify more stabilization churn unless a future owner cleanup proves they are blocking simplification.
- **Batch 14 Conclusion:** the remaining deferred selectors are no longer an active instability source. They should be frozen unless a later, evidence-based owner reduction is needed. Stabilization should now shift from repeated bridge hunting toward closeout, deletion-ledger review, and readiness assessment for the post-stabilization decision point.

### Phase 3A Batch 15 Stabilization Closeout Ledger
### سجل الدفعة الخامسة عشرة لإغلاق التثبيت في المرحلة ٣A

- **Closeout Decision:** the stabilization baseline is now green and the system is ready to exit stabilization. The shared dark-selector contract is closed, shared controls are normalized, the primary blue/navy leakage pass is complete in the tracked owners, wrapper/card ownership conflicts were reduced, live bridge consolidation was carried through the safe owner paths, and the remaining deferred selectors are now explicitly frozen as module contracts or scaffolding instead of unresolved debt.
- **Verified At Closeout:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, and `npm run test:reservations` all pass at closeout time. Current baseline: `102 passed | 1 skipped` test files and `1028 passed | 6 skipped` tests.
- **Deletion Ledger Status:** safe deletions already executed in Batches 6-8 remain valid; the remaining compatibility aliases and deferred module selectors are intentionally frozen, not forgotten debt. Further removal should happen only when a later post-stabilization owner audit proves a concrete simplification benefit.
- **Ready For Decision Point:** the next step is no longer more stabilization. The project is now ready for an explicit visual-direction choice:
  - **Path A:** architectural / cinematic
  - **Path B:** glossy / glowy
  Do not start either path until explicitly instructed.

### Phase 3A First Cleanup Batch
### الدفعة الأولى من التنظيف في المرحلة ٣A

- **Batch Name:** Dark Selector Contract Re-Closure
- **Primary Goal:** normalize one canonical dark selector contract across shared owners and stop the audit suite from asserting against a different architecture than the source actually implements.
- **Primary Files:** `src/styles/core.css`, `src/styles/app.css`, `src/styles/reservations.css`, `tests/theme/darkSelectorContract.test.js`, `tests/theme/styleAudit.test.js`, `tests/theme/tabsFamilyDarkModeAudit.test.js`
- **Contract To Clarify:** one canonical selector policy using `:where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])` without parallel direct-root families or shortened variants.
- **Intentionally Not Touched In Batch 1:** gradient redesign, broad recolor cleanup, elevation tuning, page-level beautification, badge semantics, reports/templates visual changes.
- **Regression Risk:** medium-high because selector normalization can affect many shared surfaces at once; all work must stay owner-based and backed by the failing audit files plus runtime smoke checks.
- **Exit Signal For Batch 1:** the dark-selector test family is green again or intentionally redefined to match the verified architecture, with no contradictory selector family left in the shared owners.

### Phase 4. Low-Risk Pages
### المرحلة ٤. الصفحات منخفضة الخطورة

- **Status:** `Done`
- **Objective:** Migrate lower-risk pages onto the new shell and primitive system.
- **In Scope:** login, home, users, notifications, contact inquiries, feedback submissions, site analytics
- **Out of Scope:** dashboard operations, reservations, projects workflows, reports/templates
- **Dependencies:** Phase 3A done
- **Done Criteria:** low-risk pages are visually unified and behaviorally stable.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** login, nav, filters, list/detail UI, language/theme/mobile
- **Rollback Concern Summary:** visual drift between new low-risk surfaces and untouched operational pages
- **Current Reconciled Note:** the old `Blocked` status is retired. The current handoff sections treat `home.html`, `users.html`, `notifications.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `site-analytics.html` as approved and locked. `login.html` remains the auth/primitive reference surface. `equipment-requests.html` is also approved and locked, with Level 1 cleanup still deferred because it was added outside the original Phase 4 scope.

### Phase 5. Detail Pages
### المرحلة ٥. صفحات التفاصيل

- **Status:** `Done`
- **Objective:** Migrate `customer` and `technician` detail pages using the new shell and primitives.
- **In Scope:** customer detail, technician detail, shared stat/detail patterns
- **Out of Scope:** dashboard tab engine, reservations core flows, reports/templates
- **Dependencies:** Phase 4 done
- **Done Criteria:** detail pages share unified detail-page patterns without feature regressions.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** detail cards, tabs, stats, edit flows, modal flows, language/theme/mobile
- **Rollback Concern Summary:** breaking links between detail pages and operational workflows
- **Current Reconciled Note:** `customer.html` and `technician.html` are approved detail pages and should stay locked unless a concrete regression explicitly reopens one of them.

### Phase 6. Operational Surfaces
### المرحلة ٦. الأسطح التشغيلية

- **Status:** `Done`
- **Objective:** Migrate the highest-traffic operational UI onto the stabilized system.
- **In Scope:** dashboard, projects, reservations, maintenance
- **Out of Scope:** reports export engine, templates/PDF surfaces
- **Dependencies:** Phase 5 done
- **Done Criteria:** high-value operational UI is unified without changing business logic behavior.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** auth, navigation, filters, forms, modals, create/update/delete, tab transitions, mobile and desktop
- **Rollback Concern Summary:** high business-impact regressions if shell and primitive contracts are not stable enough
- **Current Reconciled Note:** page-level redesign for `dashboard.html` and `projects.html` is closed. Dashboard reservations, calendar, reports, equipment, maintenance, customers, technicians, and positions are approved and Level 1 cleanup complete. `projects.html` is page-level approved with Level 1 cleanup complete across create, list, templates, reports, embedded customers, and embedded technicians. Future work here should be regression repair or deliberate Level 2 shared extraction, not page-local redesign churn.

### Phase 7. Reports And Templates
### المرحلة ٧. التقارير والقوالب

- **Status:** `Done`
- **Objective:** Migrate reporting and template surfaces after operational UI is stable.
- **In Scope:** reports UI, templates UI, export/presentation-related redesign targets
- **Out of Scope:** underlying reporting business math unless explicitly required
- **Dependencies:** Phase 6 done
- **Done Criteria:** reports/templates are visually unified with stable export and preview behavior.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** report filters, previews, export actions, PDF/template views, dark mode and print-sensitive surfaces
- **Rollback Concern Summary:** export/preview regressions are harder to detect visually without explicit checks
- **Current Reconciled Note:** the active report/template page surfaces are locked for current redesign purposes. The remaining work is not another report/template page redesign pass; it is shared extraction, owner cleanup, and any later output-fidelity audit for A4/PDF internals if explicitly requested.

### Phase 8. Performance And Debt Cleanup
### المرحلة ٨. تحسين الأداء وتنظيف الدين التقني

- **Status:** `Done`
- **Objective:** Reduce CSS weight, remove duplication, improve lazy loading, and cut legacy/fallback UI debt.
- **In Scope:** CSS reduction, dependency cleanup, dead-style cleanup, load-path improvement
- **Out of Scope:** new product behavior
- **Dependencies:** Phase 7 done
- **Done Criteria:** measurable reduction in CSS/UI debt and simplified frontend ownership boundaries.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** page load sanity, theme boot, first-interaction latency on affected surfaces
- **Rollback Concern Summary:** removing old layers too early can break untouched fallback cases
- **Current Reconciled Note:** the Level 3 owner-drift cleanup after Level 2 closeout is complete for safe deletion-ledger work. Page visuals stayed locked while reports, forms, maintenance, calendar, and app-level owner drift were audited in narrow batches. Remaining broad compatibility helpers are intentionally frozen unless a future regression proves they are blocking simplification. No further Phase 8 deletion-ledger work is active.

### Phase 9. Final Polish And Exit
### المرحلة ٩. اللمسات النهائية والخروج

- **Status:** `Done`
- **Objective:** Close residual drift, complete QA sweep, and mark the redesign program ready to exit.
- **In Scope:** final consistency fixes, residual regression cleanup, documentation closeout
- **Out of Scope:** new redesign goals
- **Dependencies:** Phase 8 done
- **Done Criteria:** all phases documented, no active blockers, final QA and handoff complete.
- **Required Automated Checks:** `npm run test:reservations`, `npm run build`
- **Required Manual Smoke Checks:** final cross-surface sanity in Arabic/English, light/dark, mobile/desktop
- **Rollback Concern Summary:** late cosmetic edits accidentally changing stabilized behavior

---

## 8. Current Active Phase
## ٨. المرحلة النشطة الحالية

| Field | Value |
| --- | --- |
| Current Phase | `Redesign master plan closed - maintenance mode` |
| Current Owner | Codex |
| Started On | 2026-05-10 |
| Last Updated | 2026-05-13 |
| Current Goal | Preserve the approved redesign contract. The tracked Phase 1-9 redesign work is complete. |
| Exact Task In Progress | none - final stale theme-audit reconciliation is complete and the full `tests/theme` suite is green. |
| Files/Areas Expected To Change | none for the redesign master plan. Future edits should be regression-driven maintenance only. Broad generic compatibility helpers such as `.invalid-feedback`, `.align-items-lg-center`, and `.col-md-12` are frozen rather than deletion targets. |
| Blocked By | none |
| Exit Criteria | met on 2026-05-13: customer/technician parity re-closed, stale theme audits reconciled, full `tests/theme` suite passed, and `npm run build:assets` passed. |

---

## 9. Progress Log
## ٩. سجل التقدم

> Append new entries to the top. Do not delete prior handoff records except to correct a factual error.
> أضف السجلات الجديدة في الأعلى، ولا تحذف السجلات السابقة إلا لتصحيح معلومة خاطئة.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Phase 9 stale theme-audit reconciliation and redesign exit`
- **What Changed:** Reconciled the stale broad `tests/theme` audit suite to the current approved redesign contract instead of restoring old classes, deleted files, or retired source-shape strings. Updated old token/value locks, deleted `src/styles/index.css` assumptions, exact primitive-adoption markup locks, `htmlCompositionPlugin()` references, site analytics/home/projects/customer/technician audit strings, and module-owner green/dark chrome expectations. Made one small product-side token cleanup in `src/styles/app.css`: `.list-pagination` now uses semantic `--radius-md` instead of the old `--bo-radius-control` bridge alias.
- **What Was Verified:** `npx vitest run tests/theme` passed with `44 / 44` test files and `156 / 156` tests green. `npm run build:assets` passed.
- **What Is Still Risky:** no tracked redesign blocker remains. Build still reports pre-existing bundle-size/dynamic-import warnings and stale Browserslist/baseline-browser-mapping data; those are maintenance items, not redesign blockers.
- **What Is Blocked:** none.
- **Next Exact Task:** no next redesign job remains in the Master Plan. Future work should start only from a new concrete bug/regression report or a new scoped product request.
- **Do Not Start Yet:** do not reopen Level 3 deletion, do not restore `src/styles/index.css`, and do not reintroduce legacy selectors/classes just because old screenshots or old audit strings mention them.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Phase 9 linked project reservation tag parity repair`
- **What Changed:** Audited the reservation tags rendered inside project details under the linked reservations section. Fixed both project-detail render paths so reservation lifecycle tags have priority over project confirmation: cancelled/`ملغي` now wins before completed, confirmed, or pending. Added the same `reservation-chip status-*` classes used by `My Reservations` onto linked reservation badges (`status-cancelled`, `status-completed`, `status-confirmed`, `status-pending`, `status-paid`, `status-partial`, `status-unpaid`) while preserving the local `project-reservation-card__badge--*` hooks. Stripped card-tag decorators for cancelled/closed labels so linked reservation lifecycle tag text matches the approved reservation-card tag text.
- **What Was Verified:** CDP computed/visual fixture confirmed a linked cancelled reservation renders `project-reservation-card__badge reservation-chip status-cancelled project-reservation-card__badge--cancelled`, text `ملغي`, background `rgba(140, 64, 64, 0.12)`, color `rgb(140, 64, 64)`, and border `rgba(140, 64, 64, 0.28)`, matching the standalone `reservation-chip status-cancelled` reference. Saved screenshot: `test-results/linked-reservation-cancelled-tags-parity-final.png`. `npx vitest run tests/theme/customerPageAudit.test.js tests/theme/detailsFixtureAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js` passed. `npm run build:assets` passed.
- **What Is Still Risky:** no known linked-reservation tag color drift remains for cancelled tags. Live-data spot check is still useful if a specific project has unusual reservation status values outside `cancelled`, `canceled`, `ملغي`, or `ملغى`.
- **What Is Blocked:** none for this visual regression.
- **Next Exact Task:** superseded by the later Phase 9 final closeout on 2026-05-13. Current Master Plan status is **100% complete / 0% remaining**.
- **Do Not Start Yet:** do not create a separate linked-reservation color system. Linked reservation tags must continue to inherit the approved `reservation-chip status-*` contract.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Phase 9 project tag and card-body 100% parity repair`
- **What Changed:** Performed a computed-style parity audit across the approved `My Projects` card and the customer/technician detail project cards in the same dark theme. Removed the detail-page project-card dark override in `src/styles/app.css` that forced a different flat body color, section-box color, border, and shadow. Updated the shared detail project-card renderer so the payment chip no longer adds the detail-only `project-payment-chip--alert` class; customer and technician now keep the same payment-tag class contract as `My Projects`.
- **What Was Verified:** CDP computed audit confirmed customer and technician now match the `My Projects` benchmark for card body background `linear-gradient(rgba(28, 34, 31, 0.96), rgba(24, 30, 27, 0.96))`, border `rgba(113, 125, 116, 0.3)`, `box-shadow: none`, section-box background `rgba(22, 28, 25, 0.94)`, section border `rgba(113, 125, 116, 0.18)`, and top tag classes/colors. Saved final screenshots: `test-results/projects-project-tags-body-parity-final.png`, `test-results/customer-project-tags-body-parity-final.png`, and `test-results/technician-project-tags-body-parity-final.png`. `npx vitest run tests/theme/customerPageAudit.test.js tests/theme/detailsFixtureAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js` passed. `npm run build:assets` passed.
- **What Is Still Risky:** no known project-card tag/body-color drift remains in the deterministic fixture and benchmark comparison. A live-data spot check is still reasonable if the user names a specific customer or technician record that visually differs.
- **What Is Blocked:** none for this visual regression.
- **Next Exact Task:** superseded by the later Phase 9 final closeout on 2026-05-13. Current Master Plan status is **100% complete / 0% remaining**.
- **Do Not Start Yet:** do not add more detail-page overrides for project cards. Future card parity fixes should prefer the shared `My Projects` owner contract unless a specific benchmark difference is proven.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Phase 9 customer/technician exact project-card parity follow-up`
- **What Changed:** Reopened the customer and technician detail project tabs after the second parity report. Replaced the flat project list on both pages with the approved `My Projects` focus-group contract (`project-focus-groups`, live/archive sections, section counts, and focus-section pagination). Updated the shared `buildProjectFocusCard` renderer used by the detail pages so its project lifecycle classes, top tags, project rows, action area, and card wrapper match the benchmark `My Projects` card structure instead of the older detail-page variant. Removed the detail-only mobile project-card shrink overrides that made the customer/technician cards visually diverge from the approved project cards.
- **What Was Verified:** CDP runtime/visual checks on `customer.html?id=1&bypassAuth=1&fixture=details` and `technician.html?id=1&bypassAuth=1&fixture=details` confirmed the visible project tabs now render the live/archive focus groups, `project-focus-card project-focus-card--completed`, the same project code/status/payment chip contract, no extra project-code row inside the summary, and the same `project-card-grid__item` wrapper. Reservation card/details/edit modal checks confirmed matte dark surfaces with `background-image: none`, approved shell classes, status chips, `reservation-status-card--edit`, and `reservation-modal-table` edit-table markup. Saved final screenshots: `test-results/customer-project-groups-parity-final.png`, `test-results/technician-project-groups-parity-final.png`, `test-results/customer-visible-parity-reservation-modal.png`, `test-results/customer-visible-parity-reservation-edit-modal.png`, `test-results/technician-visible-parity-reservation-modal.png`, and `test-results/technician-visible-parity-reservation-edit-modal.png`. `npx vitest run tests/theme/customerPageAudit.test.js tests/theme/detailsFixtureAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js` passed. `npm run build:assets` passed.
- **What Is Still Risky:** live backend records with a different mix of active/upcoming projects should still be visually spot-checked if the user sees a specific record drift, but the deterministic customer/technician fixture now matches the approved project-card and reservation-modal contracts structurally.
- **What Is Blocked:** none for this reopened visual regression.
- **Next Exact Task:** superseded by the later Phase 9 final closeout on 2026-05-13. Current Master Plan status is **100% complete / 0% remaining**.
- **Do Not Start Yet:** do not redesign unrelated customer/technician page headers, stat cards, financial modal, or table surfaces. The reopened scope is closed around project-card parity, reservation-card parity, and reservation/project modal parity.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Phase 9 customer/technician detail card and modal regression repair`
- **What Changed:** Reopened only `customer.html` and `technician.html` detail-page reservation/project surfaces after visual regression feedback. Promoted the approved `My Reservations` reservation-card contract onto the detail-page reservation containers, promoted the approved project focus-card base contract onto detail-page project cards, and converted the customer/technician project-details modal markup and JS fallback to the approved `customer-edit-modal project-shell-modal` shell. Added detail-page dark overrides for the reservation/project modal shells and project cards so dark mode no longer leaks the light Bootstrap surface or light project-card gradient.
- **What Was Verified:** CDP visual/runtime audit on `customer.html?id=1&bypassAuth=1&fixture=details` and `technician.html?id=1&bypassAuth=1&fixture=details` in dark mode. Saved final screenshots: `test-results/customer-detail-reservation-cards-dark-final.png`, `test-results/customer-detail-reservation-modal-dark-final.png`, `test-results/customer-detail-project-cards-dark-final.png`, `test-results/customer-detail-project-modal-dark-final.png`, `test-results/technician-detail-reservation-cards-dark-final.png`, `test-results/technician-detail-reservation-modal-dark-final.png`, `test-results/technician-detail-project-cards-dark-final.png`, and `test-results/technician-detail-project-modal-dark-final.png`. Runtime computed styles confirmed `background-image: none` for the reopened cards/modals and matte dark surfaces for both pages. `npx vitest run tests/theme/customerPageAudit.test.js tests/theme/detailsFixtureAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js` passed. `npm run build:assets` passed.
- **What Is Still Risky:** the repair was verified with deterministic fixture pages, not the user's live backend dataset. If a specific live customer or technician has unusual project/reservation data, run one follow-up visual check with that record id.
- **What Is Blocked:** none for this regression.
- **Next Exact Task:** superseded by the later Phase 9 final closeout on 2026-05-13. Current Master Plan status is **100% complete / 0% remaining**.
- **Do Not Start Yet:** do not reopen unrelated customer/technician stat cards, financial modal, edit modal, or page-level layout. This batch only reopened reservation cards, project cards, reservation details modal, and project details modal.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Phase 9 final QA and stale-audit reconciliation batch`
- **What Changed:** Normalized theme-audit master-plan references to the live `docs/UI_REDESIGN_MASTER_PLAN.md` path, fixed the real page-boot theme default regression in `public/js/page-boot.js` so no stored theme now resolves explicitly to `data-theme="light"`, and kept the Level 3 cleanup closed instead of reopening CSS deletion work. The full theme audit was rerun after the boot fix to classify the remaining failures.
- **What Was Verified:** `npx vitest run tests/theme/pageBoot.test.js` passed. `npm run build:assets` passed. `npx vitest run tests/theme` now reports `24 passed / 44 test files` and `122 passed / 156 tests`; the remaining `34` failures are stale audit expectations around old token values, old exact markup/class strings, deleted `src/styles/index.css`, old `htmlCompositionPlugin()` source-shape text, and previously removed reports/reservation CSS hooks.
- **What Is Still Risky:** superseded by the later Phase 9 final closeout on 2026-05-13. The broad theme audit suite is now reconciled and green.
- **What Is Blocked:** none; superseded by the later Phase 9 final closeout on 2026-05-13.
- **Next Exact Task:** superseded by the later Phase 9 final closeout on 2026-05-13. Current Master Plan status is **100% complete / 0% remaining**.
- **Do Not Start Yet:** do not reopen Phase 8 CSS deletion, do not restore `src/styles/index.css` only for stale tests, and do not reintroduce old classes/selectors that were intentionally removed during Level 2 or Level 3.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Level 3 app.css zero-reference inventory closeout batch`
- **What Changed:** Removed another app-specific zero-reference selector set from `src/styles/app.css`: `.dashboard-hero-callout`, `.summary-card--compact`, `.sidebar-link-active`, `.stats-cards`, `.card-surface`, `.ui-empty-state__actions`, `.templates-toolbar-field--actions`, `.templates-preview-shell__utilities-shell`, `.maintenance-records-card__pagination`, `.equipment-card__status-text`, `.equipment-card__label--status`, `.equipment-card__action-btn--edit`, `.equipment-empty-state--error`, and `.equipment-card__subtitle`. Kept generic compatibility helpers `.invalid-feedback`, `.align-items-lg-center`, and `.col-md-12` frozen instead of deleting them because they are broad Bootstrap-style helpers rather than page-specific owner drift. Updated `tests/theme/fullShellContractAudit.test.js` to lock the removed selector set.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js tests/theme/customerPageAudit.test.js` passed. `npm run build:assets` passed. A generated app-level zero-reference inventory now reports only `.invalid-feedback`, `.align-items-lg-center`, and `.col-md-12`, which are intentionally frozen compatibility helpers.
- **What Is Still Risky:** no safe page-specific Level 3 deletion target remains in `app.css` from this inventory. Further cleanup should wait for Phase 9 QA findings or a deliberate compatibility-helper removal decision.
- **What Is Blocked:** nothing for Level 3 cleanup.
- **Next Exact Task:** Move out of Level 3 cleanup and into Phase 9 final polish/exit QA. Do not continue deleting CSS just to reduce counts.
- **Do Not Start Yet:** Do not delete frozen generic helpers or live shared contracts without a new targeted runtime proof.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Level 3 app.css zero-reference class cleanup batch`
- **What Changed:** Removed zero-reference `src/styles/app.css` branches for `.calendar-card`, `.equipment-status-field`, and `.equipment-status-select`. Source audit showed these classes existed only in `app.css`; the current calendar surface uses `.calendar-surface` / `.calendar-shell`, and the current equipment toolbar uses `.equipment-records-search` plus direct `#equipment-tab` control hooks. Updated `tests/theme/fullShellContractAudit.test.js` to reject those removed classes.
- **What Was Verified:** `rg -n "calendar-card|equipment-status-field|equipment-status-select|equipment-filters|equipment-search-row|equipment-filter-controls" src/styles/app.css src/pages src/scripts tests/theme/fullShellContractAudit.test.js` returned only the intentional negative assertions. `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js` passed. `npm run build:assets` passed.
- **What Is Still Risky:** This was a source-proven dead-class cleanup with no live DOM target to visually compare. Runtime-sensitive app-level selectors should still get a browser check before deletion.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue the one-run Level 3 closeout by generating a remaining app-level zero-reference selector inventory, then remove only one more safe dead family if the scan proves no live page/script dependency.
- **Do Not Start Yet:** Do not remove live shared aliases such as `.btn`, `.btn-outline-secondary`, `.form-control`, `.form-select`, `.list-pagination`, `.customer-edit-form`, or `.technician-edit-form`; they remain active contracts.

### 2026-05-13 | Codex
### 2026-05-13 | كودكس

- **Phase:** `Level 3 app.css dead equipment-filters cleanup batch`
- **What Changed:** Removed the remaining old `.equipment-filters` / `.equipment-search-row` selector family from `src/styles/app.css`, including desktop filter/select sizing, dark search-row chrome, mobile stack overrides, and old enhanced-select chevron positioning. The live equipment toolbar continues to use `#equipment-tab .equipment-records-search`, `#search-equipment`, and `#equipment-tab .equipment-records-search .enhanced-select` rules. Updated `tests/theme/fullShellContractAudit.test.js` to reject `equipment-filters` and `equipment-search-row` in the app owner.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js` passed. `npm run build:assets` passed. Chrome/CDP runtime check with screenshot `test-results/level3-app-equipment-filters-cleanup.png` confirmed `equipment-tab` is active, `.equipment-records-search` is visible, `.equipment-filters` and `.equipment-search-row` are absent, the search input and reset button remain visible, and all three enhanced-select triggers render normally.
- **What Is Still Risky:** `app.css` remains large and still owns valid shared/page-family contracts. Further cleanup should continue only through source/runtime-proven dead selectors or duplicate owner branches.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue the one-run Level 3 closeout by auditing the next app-level compatibility candidates for zero source/runtime usage, then either remove one safe dead selector family or document that no safe deletion remains.
- **Do Not Start Yet:** Do not remove live equipment toolbar selectors under `#equipment-tab .equipment-records-search`; those are the active owner path.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 app.css dead equipment-filter-controls cleanup batch`
- **What Changed:** Removed the dead `.equipment-filter-controls` selector family from `src/styles/app.css`, including desktop nowrap/flex-basis handling and mobile column/stretch overrides. The current dashboard equipment toolbar already uses `.management-search-bar.equipment-records-search`, and the previous `forms.css` cleanup proved the old `.equipment-filter-controls` markup is no longer rendered. Updated `tests/theme/fullShellContractAudit.test.js` so the app owner now rejects `equipment-filter-controls` as well as the page/forms owner paths.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js` passed. `npm run build:assets` passed. Chrome/CDP runtime check with screenshot `test-results/level3-app-equipment-filter-controls-cleanup.png` confirmed `equipment-tab` is active, `.equipment-records-search` is visible, `.equipment-filter-controls` is absent, the search input and reset button remain visible, and all three enhanced-select triggers render normally.
- **What Is Still Risky:** `app.css` still has older `.equipment-filters` / `.equipment-search-row` rules that appear source-dead but were not removed in this batch because this pass only targeted the already-proven `.equipment-filter-controls` alias family. Removing the broader old equipment filter shell should be a separate audit.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue `app.css` owner-drift cleanup by auditing whether the older `.equipment-filters` and `.equipment-search-row` selector family is fully dead across pages/scripts/runtime. If confirmed, remove it in a separate small batch; if not, move to the next app-level duplicate owner.
- **Do Not Start Yet:** Do not remove live `#equipment-tab .equipment-records-search`, `#search-equipment`, or enhanced-select sizing rules; those are the active toolbar owner path.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 calendar.css owner audit batch`
- **What Changed:** Audited `src/styles/calendar.css` against the live dashboard calendar runtime and deliberately made no CSS deletion in this batch. The current fixture-backed dashboard mounts FullCalendar directly on `#calendar`, so `#calendar.fc` selector branches are live. The paired `#calendar .fc` branches and TUI selector family were kept because `src/scripts/calendar.js` still supports a TUI fallback path via `getToastUICalendarGlobal()` and `new TuiCalendar('#calendar', ...)`; removing those selectors would be a calendar-engine simplification, not a safe owner-drift cleanup.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/dashboardFixtureAudit.test.js tests/theme/compactShellSequencingAudit.test.js` partially passed with `fullShellContractAudit` and `dashboardFixtureAudit` green; `compactShellSequencingAudit` still has an existing stale root-plan lookup for `UI_REDESIGN_MASTER_PLAN.md`. `npx vitest run tests/calendar/calendar.test.js tests/theme/dashboardDarkValidationAudit.test.js tests/theme/fullShellContractAudit.test.js` was attempted; `fullShellContractAudit` passed, while `calendar.test.js` has an existing stale storage mock missing `migrateOldData` and `dashboardDarkValidationAudit` has the same stale root-plan lookup. `npm run build:assets` passed. Chrome/CDP runtime check with screenshot `test-results/level3-calendar-owner-audit.png` confirmed `reservations-tab` / `calendar-tab` active, `#calendar` visible at 1162px by 589px, `#calendar` classes include `fc fc-media-screen fc-direction-ltr fc-theme-standard`, no nested `.fc` element is present, no TUI DOM is present, the FullCalendar toolbar is visible, and `window.FullCalendar.Calendar` is loaded.
- **What Is Still Risky:** `calendar.css` still carries compatibility for more than one calendar runtime shape. That is intentional while `calendar.js` still has both FullCalendar and TUI execution paths. A future simplification should first decide whether to remove the TUI fallback from code, then delete the fallback CSS with a targeted runtime test.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Move the Level 3 owner-drift cleanup to `src/styles/app.css`, starting with a source/runtime audit for dead page-family compatibility selectors or app-level overrides that now duplicate dedicated module owners.
- **Do Not Start Yet:** Do not delete `#calendar .fc` or TUI calendar selectors until the calendar runtime fallback policy is explicitly simplified.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 maintenance.css filter-control owner cleanup batch`
- **What Changed:** Split the maintenance toolbar layout rule in `src/styles/maintenance.css`. The search input still uses `.maintenance-status-filter .form-control`, while the status/priority select branch now uses `.maintenance-status-filter .maintenance-filter-control` instead of the broad `.maintenance-status-filter .form-select` bridge. Updated the relevant `tests/theme/tokenBridgeRationalizationAudit.test.js` maintenance expectations to reflect the new owner split.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js` passed. `tests/theme/tokenBridgeRationalizationAudit.test.js` and `tests/theme/sharedGreenChromeAudit.test.js` were attempted and remain stale broader audits with unrelated existing failures in core/app/index/reservation expectations. `npm run build:assets` passed. Chrome/CDP runtime check with screenshot `test-results/level3-maintenance-filter-owner-split.png` confirmed the maintenance toolbar is visible, the search input remains visible with `flex: 1 1 288px`, the native status/priority selects retain the split `flex: 1 1 224px` rule while enhanced-select hides them, and the visible enhanced-select triggers render normally at 142px/154px width and 50px height.
- **What Is Still Risky:** `maintenance.css` still has live chrome ownership on `.maintenance-filter-control`; `app.css` also has maintenance toolbar overrides for enhanced-select runtime sizing. Do not collapse those without a separate runtime comparison.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue Level 3 owner-drift cleanup by auditing the next owner file, `calendar.css`, for dead compatibility selectors or broad selectors that already have dedicated runtime hooks. If no safe target exists, document it and move to `app.css`.
- **Do Not Start Yet:** Do not remove `.maintenance-status-filter .form-control`; it is still the live search input layout branch.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 forms.css dead equipment-filter selector cleanup batch`
- **What Changed:** Audited the next recorded `forms.css` target. `.equipment-form-actions .btn` remains live because the equipment submit button has no safer dedicated button hook. Removed the dead `.equipment-filter-controls.management-search-bar .form-select` / `select.form-select` branch from `src/styles/forms.css` instead; current dashboard markup uses `.management-search-bar.equipment-records-search` and no longer renders `.equipment-filter-controls`. Updated `tests/theme/fullShellContractAudit.test.js` to lock the live toolbar class and reject the old `equipment-filter-controls` path.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js`; `npm run build:assets`; Chrome/CDP runtime check with screenshot `test-results/level3-forms-equipment-filter-toolbar.png`, confirming `.equipment-records-search` is visible and `.equipment-filter-controls` is absent.
- **What Is Still Risky:** `.equipment-form-actions .btn`, `.management-form-actions .btn-primary`, `.management-search-bar .form-control`, customer form field `.form-control/.form-select`, and maintenance/form filter bridges are still live. Do not delete them without dedicated owner hooks or proof of dead markup.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue the Level 3 owner-drift cleanup by moving to the next owner file, `maintenance.css`, and audit `.maintenance-status-filter .form-select` / `.form-control` against the current maintenance toolbar markup before changing anything.
- **Do Not Start Yet:** Do not add new equipment button classes solely to remove `.equipment-form-actions .btn`; that selector remains a live container-scoped contract.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 forms.css customer-upload button owner cleanup batch`
- **What Changed:** Started the `forms.css` owner-drift pass with a narrow compatibility cleanup. Removed the redundant `.customer-upload-inline .btn` and mobile `.customer-form-box .customer-upload-inline .btn` selector branches from `src/styles/forms.css`; the upload sizing now belongs to the dedicated `.customer-upload-trigger` owner. Markup still keeps Bootstrap/shared button classes for the shared button primitive, but the upload-specific layout no longer depends on the generic `.btn` bridge. Updated `tests/theme/fullShellContractAudit.test.js` to lock the dedicated upload-trigger owner and reject the removed upload `.btn` branch.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/customerPageAudit.test.js` passed. `tests/theme/tokenBridgeRationalizationAudit.test.js` was also attempted but remains a known stale broader audit and failed on pre-existing outdated expectations unrelated to this upload selector cleanup. `npm run build:assets` passed. Chrome/CDP runtime checks with screenshots `test-results/level3-forms-upload-dashboard.png`, `test-results/level3-forms-upload-projects.png`, and `test-results/level3-forms-upload-customer-mobile.png` confirmed the upload trigger remains visible and computes the expected `minWidth: 140px`, `minHeight: 41.6px`, `borderRadius: 16px`, and visible dimensions on dashboard, projects, and the customer modal.
- **What Is Still Risky:** `forms.css` still has live broad compatibility selectors for `.management-form-actions .btn-primary`, `.management-search-bar .form-control`, customer form field `.form-control/.form-select`, `.equipment-form-actions .btn`, and equipment/status filter controls. These are still tied to live dashboard/projects/customer markup and should not be deleted without separate proof.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue the `forms.css` owner-drift audit by checking whether `.equipment-form-actions .btn` can move to a dedicated equipment action hook, or whether it must remain because the markup has no safer owner yet. If no safe equipment hook exists, move to the next owner file instead of inventing markup churn.
- **Do Not Start Yet:** Do not remove `.management-form-actions .btn-primary` or `.management-search-bar .form-control`; they are still documented live module contracts.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 reports.css print result-table wrapper owner cleanup batch`
- **What Changed:** Split the `@media print` report table wrapper rule in `src/styles/reports.css` so non-result report cards use `.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper`, while result cards use `.reports-table-card--results .reports-results-table-wrapper` for the print `max-height: none; overflow: visible;` contract. Updated `tests/theme/fullShellContractAudit.test.js` to lock the print result-wrapper branch.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/financials.test.js`; `npm run build:assets`; Chrome/CDP print-media runtime checks with screenshots `test-results/level3-reports-results-print-project.png` and `test-results/level3-reports-results-print-dashboard.png`. Runtime confirmed both project and dashboard report result wrappers are visible under print media and compute `maxHeight: none`; dashboard computes `overflowX/Y: visible`, while project reports keeps its existing stronger `overflow-x-auto` utility behavior (`overflowX/Y: auto`) rather than introducing a new print override.
- **What Is Still Risky:** The base structural wrapper rule near the top of `reports.css` and the reservations-specific wrapper override still use `.reports-table-wrapper` because non-result report cards depend on them. Removing `reports-table-wrapper` from markup is still not safe.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Treat the known `reports.css` result-table wrapper owner cleanup as closed for now, then continue Level 3 owner-drift cleanup with the next safe owner target in `forms.css`. Start with an audit of live `.management-form-actions`, `.management-search-bar`, and upload/button compatibility selectors before deleting or splitting anything.
- **Do Not Start Yet:** Do not remove `reports-table-wrapper` from markup and do not force project print overflow behavior unless a dedicated print/export UX task is opened.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 reports.css desktop result-table max-height owner cleanup batch`
- **What Changed:** Split the desktop `@media (min-width: 1024px)` max-height rule in `src/styles/reports.css` so non-result report cards continue to use `.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper`, while result cards now use `.reports-table-card--results .reports-results-table-wrapper` for `max-height: 60vh`. Updated `tests/theme/fullShellContractAudit.test.js` to lock this desktop result-wrapper branch.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/financials.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-reports-results-maxheight-project.png` and `test-results/level3-reports-results-maxheight-dashboard.png`. Runtime confirmed both project and dashboard report result wrappers are visible on desktop and compute `maxHeight: 780px` at the 1440x1300 viewport, with `overflowX: auto` and `overflowY: auto` intact.
- **What Is Still Risky:** The print max-height/overflow rule still uses `.reports-table-card .reports-table-wrapper`; the base structural wrapper rule near the top of `reports.css` still uses the broad selector because non-result report cards depend on it. Removing `reports-table-wrapper` from markup is still not safe.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue `reports.css` cleanup by auditing the print max-height/overflow rule and split it only if project/dashboard print-export behavior can be verified without visual drift. If the print rule is not safe to split, move to the next owner-drift target in `forms.css`.
- **Do Not Start Yet:** Do not remove `reports-table-wrapper` from markup and do not change unrelated report table structural rules in the same batch.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 reports.css responsive result-table wrapper owner cleanup batch`
- **What Changed:** Split the responsive/base result-table overflow rule in `src/styles/reports.css` so non-result report cards keep `.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper`, while result cards now use `.reports-table-card--results .reports-results-table-wrapper` for `overflow: auto`, responsive inline margin/padding, radius, and mobile scrolling. Updated `tests/theme/fullShellContractAudit.test.js` to lock the shared result-wrapper owner for this responsive rule.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/financials.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-reports-results-overflow-project.png` and `test-results/level3-reports-results-overflow-dashboard.png`. Runtime confirmed project reports result wrapper is visible with `overflowX: auto`, `marginInlineStart: -12px`, `paddingInlineStart: 12px`, and 10 rendered rows; dashboard reservations result wrapper is visible with `overflowX: auto`, its reservation-specific zero inline margin/padding override intact, and the approved 16px wrapper radius.
- **What Is Still Risky:** The desktop `@media (min-width: 1024px)` max-height rule and print max-height/overflow rule still use `.reports-table-card .reports-table-wrapper`; the base structural wrapper rule near the top of `reports.css` also still uses the broad selector because non-result cards still depend on it. Removing `reports-table-wrapper` from markup is still not safe.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue `reports.css` cleanup by auditing the desktop max-height rule inside `@media (min-width: 1024px)` and move only the result-table branch to `.reports-results-table-wrapper` if runtime proof confirms project/dashboard reports remain stable.
- **Do Not Start Yet:** Do not change the print rule or remove `reports-table-wrapper` from markup until the desktop max-height slice is verified separately.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 reports.css dark result-table wrapper owner cleanup batch`
- **What Changed:** Split the dark-mode report table wrapper chrome in `src/styles/reports.css` so non-result report cards continue to use `.reports-table-card:not(.reports-table-card--results) .reports-table-wrapper`, while result cards now use `.reports-table-card--results .reports-results-table-wrapper` and its `::before` hook. Updated `tests/theme/fullShellContractAudit.test.js` to lock the dark-mode owner split.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/financials.test.js`; `npm run build:assets`; dark-mode Chrome/CDP runtime checks with screenshots `test-results/level3-reports-results-dark-project.png` and `test-results/level3-reports-results-dark-dashboard.png`. Runtime confirmed project reports stay transparent/borderless in dark mode (`backgroundColor: rgba(0, 0, 0, 0)`, `borderTopWidth: 0px`, `boxShadow: none`) while dashboard reservation report results keep the approved dark bordered wrapper (`backgroundColor: rgba(21, 31, 25, 0.94)`, `borderTopWidth: 1px`, dark shadow).
- **What Is Still Risky:** Base, responsive, print, and reservation-wrapper rules still target `.reports-table-wrapper` because they cover summary, operations, forecast, and other non-result report tables. Removing the markup class is still not safe.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue `reports.css` cleanup by auditing the responsive/desktop overflow rule `.reports-table-card .reports-table-wrapper` and decide whether result-table max-height/overflow can move to `.reports-results-table-wrapper`; if that selector is still too broad, move to `forms.css`.
- **Do Not Start Yet:** Do not remove `reports-table-wrapper` from markup and do not change print rules in the same batch.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 reports.css result-table background owner cleanup batch`
- **What Changed:** Split the summary/result table background rule in `src/styles/reports.css` so summary cards still use `.reports-table-card--summary .reports-table-wrapper`, while result cards now use `.reports-table-card--results .reports-results-table-wrapper`. Updated `tests/theme/fullShellContractAudit.test.js` to lock the result-table background owner and reject `.reports-table-card--results .reports-table-wrapper`.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/financials.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-reports-results-bg-project.png` and `test-results/level3-reports-results-bg-dashboard.png`. Runtime confirmed project reports remain transparent/borderless (`backgroundColor: rgba(0, 0, 0, 0)`, `borderTopWidth: 0px`, `boxShadow: none`) while dashboard reservation report results keep the approved content background and bordered wrapper (`backgroundColor: rgb(241, 244, 238)`, `borderTopWidth: 1px`, `borderRadius: 16px`).
- **What Is Still Risky:** `reports-table-wrapper` remains active for base table chrome, summary/operations/forecast report tables, print behavior, and responsive overflow. It must stay in markup until those owners are audited independently.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue `reports.css` owner-drift cleanup by auditing whether the dark-mode result wrapper styling can be split from the broad `.reports-table-card .reports-table-wrapper` dark rule, or skip to `forms.css` if the broad dark table wrapper still covers too many non-result report tables.
- **Do Not Start Yet:** Do not remove `reports-table-wrapper` from markup or change summary/operations report table wrappers in the same batch.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 reports.css result-table wrapper owner cleanup batch`
- **What Changed:** Moved the project reports result-table wrapper override in `src/styles/reports.css` from `.reports-wrapper--projects .projects-reports-table-card .reports-table-wrapper` to `.reports-wrapper--projects .projects-reports-table-card .reports-results-table-wrapper`. This keeps the legacy `reports-table-wrapper` class in markup because non-result report tables still depend on it, but shifts the project result-table override onto the Level 2 shared result wrapper hook. Updated `tests/theme/fullShellContractAudit.test.js` to lock the new owner and reject the old project-specific selector.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/financials.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-reports-results-wrapper-project.png` and `test-results/level3-reports-results-wrapper-dashboard.png`. Runtime confirmed project reports keep transparent/borderless result-wrapper chrome (`borderTopWidth: 0px`, `borderRadius: 0px`, `boxShadow: none`) while dashboard reservation report results keep their bordered card wrapper (`borderTopWidth: 1px`, `borderRadius: 16px`).
- **What Is Still Risky:** `reports-table-wrapper` is still an active legacy owner for non-result report tables and must not be removed from markup yet. Some broader historical audit files are stale against the current repo state (`tests/theme/fullSecondaryPrimitiveAdoptionAudit.test.js`, `tests/theme/tokenBridgeRationalizationAudit.test.js`) and should be reconciled separately before being used as gate checks.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Continue `reports.css` owner-drift cleanup by auditing the remaining result-table selectors that still target `.reports-table-wrapper`; only move selectors to `.reports-results-table-wrapper` when the selector is truly result-table-specific and dashboard/project runtime proof is ready.
- **Do Not Start Yet:** Do not remove `reports-table-wrapper` from markup or shared CSS until summary, operations, forecast, and other non-result report tables have their own audited replacement owners.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 crew-assignment compatibility markup removal batch`
- **What Changed:** Removed the redundant `crew-assignment-table-wrapper` and `crew-picker-table-wrapper` aliases from the static dashboard technician picker modal and the runtime reservation modal template. The picker now keeps the shared `crew-assignment-table-shell` / `crew-assignment-table` contract plus existing broad table classes. Updated `tests/theme/modalFormsAudit.test.js` to reject the removed aliases, and updated `tests/reservations/technicians.test.js` so its fixture and assertions match the current shared-shell/select renderer.
- **What Was Verified:** Source audit found no remaining active CSS/JS/page usage of `crew-assignment-table-wrapper` or `crew-picker-table-wrapper` outside negative contract assertions. `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/technicians.test.js tests/reservations/editForm.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-crew-compat-create-picker.png` and `test-results/level3-crew-compat-edit-picker.png`. Runtime confirmed the shared shell/table remain visible in create and edit picker flows, the removed aliases are absent, and the shared shell scroll reset still returns to `scrollTop: 0`.
- **What Is Still Risky:** Crew-assignment compatibility cleanup is closed for the known wrapper aliases. Remaining Level 3 risk is broader stylesheet owner drift outside this picker owner.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Start the next stylesheet owner-drift audit with `src/styles/reports.css`, identify one safe redundant selector/bridge at a time, and keep dashboard/project report result/filter visuals locked with focused tests and runtime proof.
- **Do Not Start Yet:** Do not touch `forms.css`, `calendar.css`, `maintenance.css`, or `app.css` until the next `reports.css` owner-drift slice is either completed or deliberately skipped.

### 2026-05-12 | Codex
### 2026-05-12 | كودكس

- **Phase:** `Level 3 payment-history readonly modifier removal batch`
- **What Changed:** Removed the unused `reservation-payment-history__table--readonly` modifier from the read-only project payment-history table markup in `src/scripts/projects/projectDetails/payment.js`. Extended `tests/theme/modalFormsAudit.test.js` so payment-history renderers reject the removed readonly modifier along with the older wrapper/table compatibility aliases.
- **What Was Verified:** Source audit found no remaining active renderer/style/page usage of `reservation-payment-history__table--readonly`, `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, or the base `reservation-payment-history__table` token outside negative contract assertions. `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-payment-history-readonly-project-details.png` and `test-results/level3-payment-history-readonly-project-edit.png`. Runtime confirmed project details/edit payment-history tables remain visible, render one row, keep `margin-bottom: 0px`, and no longer carry the readonly modifier.
- **What Is Still Risky:** Payment-history compatibility cleanup is now closed for the known wrapper/table/readonly aliases. Remaining Level 3 risk is outside this owner, mostly crew-assignment compatibility markup and broader stylesheet owner drift.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Audit the remaining crew-assignment compatibility markup classes (`crew-assignment-table-wrapper` / `crew-picker-table-wrapper`) across dashboard markup, runtime modal templates, and tests; remove only aliases with no active CSS/JS/runtime dependency.
- **Do Not Start Yet:** Do not touch `reports.css`, `forms.css`, `calendar.css`, `maintenance.css`, or `app.css` until the crew-assignment markup audit is closed or deliberately skipped.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 payment-history compatibility markup removal batch`
- **What Changed:** Removed the now-redundant payment-history compatibility aliases from active reservation/project renderers: `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, and the base `reservation-payment-history__table` table class. Reservation edit and project create now render only `reservation-payment-history-table-shell` / `reservation-payment-history-table`; project details/edit payment-history wrappers keep their broader approved project modal table classes while using the shared payment-history shell/table hooks. Updated `tests/theme/modalFormsAudit.test.js` to lock the absence of the removed aliases in the active renderers.
- **What Was Verified:** Source audit found no remaining active renderer/style/page usage of `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, or the base `reservation-payment-history__table` token outside the new negative contract assertions. `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-payment-history-compat-reservation-edit.png`, `test-results/level3-payment-history-compat-create-project.png`, `test-results/level3-payment-history-compat-project-details.png`, and `test-results/level3-payment-history-compat-project-edit.png`. Runtime confirmed visible shared shell/table nodes, one populated row in each checked path, `margin-bottom: 0px`, and no legacy wrapper/table aliases in the inspected DOM.
- **What Is Still Risky:** The project details read-only table still carries the unused `reservation-payment-history__table--readonly` modifier. It was intentionally left untouched because this batch targeted only the three compatibility aliases already proven redundant.
- **What Is Blocked:** nothing for this slice.
- **Next Exact Task:** Run a dedicated audit for the remaining `reservation-payment-history__table--readonly` modifier in `src/scripts/projects/projectDetails/payment.js`; if it has no active CSS/JS/test dependency, remove it in a tiny batch and re-run the project details/edit payment-history checks.
- **Do Not Start Yet:** Do not remove unrelated project modal wrappers such as `project-modal-table-wrapper`, `users-table-wrapper`, or `surface-table` while auditing the readonly modifier.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 project create payment-history scaffold completion batch`
- **What Changed:** The compatibility-removal audit found that `src/scripts/projects/form.js` still rendered create-project payment-history tables with only legacy `reservation-payment-history__table-wrapper` / `reservation-payment-history__table` classes. Added the shared `reservation-payment-history-table-shell` and `reservation-payment-history-table` hooks there and extended `tests/theme/modalFormsAudit.test.js` so create-project, reservation edit, project details, and project edit all stay on the shared payment-history contract before any compatibility markup removal is considered.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP create-project payment-history runtime check with screenshot `test-results/level3-project-create-payment-history-scaffold.png`. Runtime confirmed the populated create-project payment-history shell/table are visible, carry both legacy and shared classes, render one payment row, and keep `margin-bottom: 0px`.
- **What Is Still Risky:** This batch is additive scaffold completion only. It does not remove legacy classes from create/reservation/project payment-history markup.
- **What Is Blocked:** no blocker remains for the audit; actual compatibility class removal still needs a dedicated narrow batch.
- **Next Exact Task:** Resume the compatibility-removal audit now that create-project also has shared hooks, then decide whether `reservation-payment-history__table`, `reservation-payment-history__table-wrapper`, and `reservation-payment-history-table-wrapper` can be removed from markup/tests without changing reservation edit, project details, project edit, or create-project payment-history visuals.
- **Do Not Start Yet:** Do not remove payment-history compatibility classes without first proving there are no active CSS/JS/runtime dependencies left on the legacy aliases.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 core.css project payment-history owner cleanup batch 1`
- **What Changed:** Moved project-modal payment-history selector ownership in `src/styles/core.css` from compatibility selectors to the shared payment-history hooks. Project shell wrapper cleanup now targets `.reservation-payment-history-table-shell` instead of `.reservation-payment-history-table-wrapper`, and project shell table/shadow cleanup now targets `.reservation-payment-history-table` instead of `.reservation-payment-history__table`. Existing project renderer markup still keeps the compatibility wrapper/table classes.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP dark-mode runtime checks for project details and project edit payment-history tables with screenshot `test-results/level3-core-payment-history-project-batch1.png`. Runtime confirmed shared shell/table nodes remain visible with `margin-bottom: 0px`, `box-shadow: none`, and transparent shell background.
- **What Is Still Risky:** This changes only project modal CSS selector ownership. The compatibility wrapper/table classes remain in project markup and tests and must not be removed until a separate markup-removal audit.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Run a payment-history compatibility markup-removal audit across reservation edit form, project payment renderers, `modalFormsAudit`, and runtime screenshots before deciding whether `reservation-payment-history__table`, `reservation-payment-history__table-wrapper`, or `reservation-payment-history-table-wrapper` can be removed from markup.
- **Do Not Start Yet:** Do not remove `reservation-payment-history-table-wrapper`, `reservation-payment-history__table`, `project-modal-table-wrapper`, or read-only modifiers from project renderers.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reservations.css payment-history cell/header owner cleanup batch 3`
- **What Changed:** Moved the remaining payment-history table cell/header/dark-mode CSS ownership in `src/styles/reservations.css` from the legacy `.reservation-payment-history__table` selector to the shared `.reservation-payment-history-table` selector. This covers base cell rhythm, dark table foreground/background, dark cell borders, dark header styling, and dark odd/even row transparency. Reservation and project renderers still keep the legacy table class in markup for compatibility.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP dark-mode runtime checks for dashboard edit-reservation, project details, and project edit payment-history tables with screenshots `test-results/level3-payment-history-reservation-edit-batch3.png` and `test-results/level3-payment-history-project-edit-batch3.png`. Runtime confirmed visible tables, shared-table dark text/background behavior, transparent rows, and preserved cell font sizing.
- **What Is Still Risky:** This changes CSS selector ownership only. The legacy `.reservation-payment-history__table` class remains in reservation/project markup and project-specific CSS still references it, so it must not be removed yet.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Audit the remaining project-specific payment-history selectors in `src/styles/core.css` to decide whether they can move from `.reservation-payment-history__table` / `.reservation-payment-history-table-wrapper` to the shared `.reservation-payment-history-table` / `.reservation-payment-history-table-shell` path without changing project modal visuals.
- **Do Not Start Yet:** Do not remove `reservation-payment-history__table`, `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, or project modal wrapper classes from markup.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 crew-assignment JS lookup owner cleanup batch 3`
- **What Changed:** Moved the crew picker modal `shown.bs.modal` scroll reset lookup in `src/scripts/reservationsTechnicians.js` from the compatibility `.crew-assignment-table-wrapper` class to the shared `.crew-assignment-table-shell` class. The compatibility wrapper remains in dashboard/static markup and runtime modal markup for now, but no source CSS or runtime JS behavior depends on it after this batch.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js`; `npm run build:assets`; Chrome/CDP runtime checks for create-reservation and edit-reservation crew picker assignment tables with screenshots `test-results/level3-crew-assignment-create-batch3.png` and `test-results/level3-crew-assignment-edit-batch3.png`. Runtime confirmed the shared shell/table remain visible and the shell scroll reset returns to `scrollTop: 0` after reopening the picker.
- **What Is Still Risky:** This changes only the lookup selector for scroll reset. Markup still carries `crew-assignment-table-wrapper` and `crew-picker-table-wrapper`, and those classes should stay until a separate markup-removal audit checks static/runtime templates and tests together.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Return to payment-history cell/header/dark-mode ownership cleanup, or run a dedicated markup-removal audit for `crew-assignment-table-wrapper` / `crew-picker-table-wrapper` across static dashboard markup, runtime modal templates, and tests before removing either compatibility class.
- **Do Not Start Yet:** Do not remove `crew-assignment-table-wrapper` or `crew-picker-table-wrapper` from markup in this batch.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 tabs.css crew-assignment owner cleanup batch 2`
- **What Changed:** Moved crew picker assignment table row/cell/header/column detail ownership from `.crew-assignment-table-wrapper` to the shared `.crew-assignment-table-shell .crew-assignment-table` path. This includes transparent row/cell reset, hover/focus row states, first/last cell radius, header cell rhythm, colgroup widths, table head/body overflow, dark row reset, dark focus shadow, and the small responsive margin owner. Markup and JS lookup classes remain unchanged.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js`; `npm run build:assets`; Chrome/CDP runtime checks for create-reservation and edit-reservation crew picker assignment tables with screenshots `test-results/level3-crew-assignment-create-batch2.png` and `test-results/level3-crew-assignment-edit-batch2.png`. Runtime confirmed visible shared shell/table/row nodes, `margin-bottom: 0px`, visible row overflow, centered header cells, and preserved colgroup width.
- **What Is Still Risky:** This batch changes interaction-state selector ownership but not behavior. The old `.crew-assignment-table-wrapper` class remains required for runtime lookup and should not be removed.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Continue Level 3 cleanup by returning to payment-history cell/header/dark-mode ownership, or audit the remaining crew-picker compatibility class usage in JS before deciding whether any non-CSS references can be moved to the shared shell.
- **Do Not Start Yet:** Do not remove `crew-assignment-table-wrapper`, `crew-picker-table-wrapper`, assignment row classes, column classes, or JS lookup selectors from markup/scripts.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 tabs.css crew-assignment owner cleanup batch 1`
- **What Changed:** Moved the base technician-picker assignment table shell ownership in `src/styles/tabs.css` from the compatibility `.crew-assignment-table-wrapper` selector to the shared `.crew-assignment-table-shell` hook. This covers the assignment-panel flex/scroll sizing, base shell chrome, base table sizing, mobile min-width override, and dark shell chrome. The compatibility wrapper remains in markup and still owns row states, column sizing, hover/focus behavior, and the existing JS scroll lookup.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js`; `npm run build:assets`; Chrome/CDP runtime checks for the crew picker assignment table from create-reservation and edit-reservation contexts with screenshots `test-results/level3-crew-assignment-create-batch1.png` and `test-results/level3-crew-assignment-edit-batch1.png`. Runtime confirmed visible shared shell/table nodes, `margin-bottom: 0px`, and the expected scroll/min-width behavior.
- **What Is Still Risky:** This batch only changes base shell/table ownership. The old `.crew-assignment-table-wrapper` class remains active for interaction-state styling and runtime lookup, so it must not be removed from markup.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Continue Level 3 cleanup with a separate audit of whether crew assignment row/table detail selectors can move from `.crew-assignment-table-wrapper` to `.crew-assignment-table-shell` / `.crew-assignment-table`, or switch back to payment-history cell/header selectors if crew row styling looks too interaction-sensitive.
- **Do Not Start Yet:** Do not collapse crew assignment row, column, hover/focus, empty-state, drag, or JS lookup selectors in this batch.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reservations.css payment-history owner cleanup batch 2`
- **What Changed:** Moved the base payment-history table width/margin rule off the legacy `.reservation-payment-history__table` selector and onto the shared `.reservation-payment-history-table` owner. The deeper cell, header, row, dark-mode, action, readonly, and project modal selectors remain untouched, and all compatibility table classes remain in markup.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP runtime checks for dashboard edit-reservation, project details, and project edit payment-history tables with screenshots `test-results/level3-payment-history-reservation-edit-batch2.png` and `test-results/level3-payment-history-project-edit-batch2.png`. Runtime confirmed visible tables with computed `margin-bottom: 0px` in all checked paths.
- **What Is Still Risky:** This only changes base table sizing ownership. The old `.reservation-payment-history__table` class still owns table cell rhythm and dark-mode table styling, so it must not be removed from markup.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Continue Level 3 cleanup with a separate audit of whether payment-history cell/header/dark-mode selectors can move to `.reservation-payment-history-table` without changing reservation/project table visuals, or switch to the next lower-risk owner such as crew-assignment table wrapper ownership if the cell styling has too much blast radius.
- **Do Not Start Yet:** Do not collapse `.reservation-payment-history__table th/td`, dark-mode row/cell selectors, action styling, project modal wrapper styling, or any payment-history markup classes in this batch.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reservations.css payment-history owner cleanup batch 1`
- **What Changed:** Moved the base payment-history wrapper width rule off the legacy reservation-only `.reservation-payment-history__table-wrapper` selector and onto the shared `.reservation-payment-history-table-shell` owner. Markup still keeps both the reservation and project compatibility wrapper classes, including `reservation-payment-history__table-wrapper` and `reservation-payment-history-table-wrapper`, because this batch only changes CSS ownership for the already-approved shared shell.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js tests/projects/viewFinancials.test.js tests/projects/viewSummary.test.js`; `npm run build:assets`; Chrome/CDP runtime checks for dashboard edit-reservation, project details, and project edit payment-history shells with screenshots `test-results/level3-payment-history-reservation-edit-batch1.png` and `test-results/level3-payment-history-project-edit-batch1.png`.
- **What Is Still Risky:** This only changes wrapper width ownership. Table sizing, dark-mode rows/cells, action styling, project modal wrapper styling, and all compatibility markup remain intentionally untouched.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Continue with the next narrow `reservations.css` payment-history batch: audit whether the base table width/margin rule can move from the legacy `.reservation-payment-history__table` alias to the shared `.reservation-payment-history-table` owner while leaving dark-mode cell/row styling and markup untouched.
- **Do Not Start Yet:** Do not remove `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, `reservation-payment-history__table`, or project modal wrapper classes from markup.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reservations.css modal table owner cleanup batch 1`
- **What Changed:** Started the reservations owner-drift ledger by removing the redundant descendant selector `.reservation-modal-items-wrapper .table-responsive` from the reservation modal item table overflow rules and moving the edit-reservation modal overflow selector from `#editReservationModal .table-responsive` to `#editReservationModal .reservation-modal-table-shell`. This keeps the same runtime wrappers covered because the read-only reservation details wrapper carries `reservation-modal-items-wrapper` directly and the edit-reservation item wrapper carries `reservation-modal-table-shell`.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js tests/theme/fullShellContractAudit.test.js tests/reservations/editForm.test.js`; `npm run build:assets`; Chrome/CDP runtime checks with screenshots `test-results/level3-reservations-modal-table-edit-batch1-final.png` and `test-results/level3-reservations-modal-table-details-batch1-final.png`.
- **What Is Still Risky:** This only changes overflow ownership. It does not remove `.table-responsive` from markup, reservation-specific item wrappers, payment-history wrappers, mobile card table rules, or modal cell styling.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Run modal/theme audits plus a runtime check of edit reservation and reservation details table wrappers.
- **Do Not Start Yet:** Do not remove `.table-responsive`, `reservation-modal-items-wrapper`, `reservation-edit-items-wrapper`, `reservation-payment-history__table-wrapper`, or `reservation-payment-history-table-wrapper` from markup.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reports.css owner-drift cleanup batch 3`
- **What Changed:** Replaced the dashboard reservations reports mobile bridge selectors `.reports-wrapper--reservations .reports-filters .form-control`, `.reports-wrapper--reservations .reports-filters .form-select`, and `.reports-wrapper--reservations .reports-filters-grid .reports-filter-control` with the single semantic owner `.reports-wrapper--reservations .reports-filters .reports-filter-control`. This preserves the mobile `min-width: 0; width: 100%` behavior for the same report controls while removing Bootstrap-form ownership from this responsive rule.
- **What Was Verified:** `npx vitest run tests/reports/surfaceAudit.test.js tests/projects/projectsReports/controls.test.js tests/projects/projectsReports/filters.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`; Chrome/CDP mobile-width dashboard reservations reports filter check with screenshot `test-results/level3-reports-css-dashboard-filters-mobile-batch3.png`.
- **What Is Still Risky:** Native selects are hidden by the enhanced-select runtime, so visible select trigger sizing must continue to be checked through `.enhanced-select__trigger` in runtime validation rather than native `<select>` geometry.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Verify dashboard reservations reports filters at mobile width and rerun focused reports tests/build.
- **Do Not Start Yet:** Do not remove enhanced-select runtime selectors, report table wrappers, print/export selectors, or dashboard report summary/operations classes.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reports.css owner-drift cleanup batch 2`
- **What Changed:** Continued the narrow reports owner cleanup by moving the custom date-range width rule from `.reports-custom-range .form-control` to `.reports-custom-range .reports-filter-control`. This keeps the same rendered target because dashboard and project report date inputs already carry `reports-filter-control`, while reducing another Bootstrap-form bridge inside `src/styles/reports.css`.
- **What Was Verified:** `npx vitest run tests/reports/surfaceAudit.test.js tests/projects/projectsReports/controls.test.js tests/projects/projectsReports/filters.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`; Chrome/CDP project reports filter check with screenshot `test-results/level3-reports-css-project-filters-batch2-final.png`.
- **What Is Still Risky:** The dashboard reservations responsive filter bridge was removed in batch 3 after mobile-width proof. Remaining reports.css cleanup should avoid report tables, print/export selectors, and enhanced-select runtime selectors unless a separate ledger proves them redundant.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Verify reports tests/build and runtime date-range/filter control rendering after batches 1-2.
- **Do Not Start Yet:** Do not remove dashboard reservation reports responsive bridges, report table wrappers, print rules, or enhanced-select runtime selectors.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 3 reports.css owner-drift cleanup batch 1`
- **What Changed:** Started the Level 3 deletion ledger with a narrow `src/styles/reports.css` cleanup. Removed the redundant project-reports filter bridge selectors `.reports-wrapper--projects .project-reports-filters .form-control` and `.reports-wrapper--projects .project-reports-filters .form-select` from the shared sizing rule because every live project report filter input/select already carries the semantic `reports-filter-control` hook. Kept the broader Bootstrap compatibility classes in markup and kept the dashboard reservations reports `.reports-filters .form-control` / `.form-select` bridge untouched for this batch.
- **What Was Verified:** `npx vitest run tests/reports/surfaceAudit.test.js tests/projects/projectsReports/controls.test.js tests/projects/projectsReports/filters.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`; Chrome/CDP project reports filter checks with screenshots `test-results/level3-reports-css-project-filters-batch1-final.png` and `test-results/level3-reports-css-project-filters-batch2-final.png`.
- **What Is Still Risky:** Dashboard reservations report filter compatibility bridges are still live and intentionally not removed in this batch. Enhanced select wrappers remain in the project reports selector because they are runtime-generated and not equivalent to native inputs/selects.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Run focused reports/project-reports tests and a project reports filter visual check. If clean, consider a second reports.css batch for `reports-custom-range` or dashboard reports mobile filter bridge only after proving all affected controls carry `reports-filter-control`.
- **Do Not Start Yet:** Do not remove `.reports-filters .form-control`, `.reports-filters .form-select`, `.reports-table-wrapper`, dashboard report summary/operations classes, or print/export selectors.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 shared extraction final visual sweep + closeout`
- **What Changed:** Completed the recommended Level 2 closeout sweep without adding new extraction hooks. Confirmed the approved repeated hooks render at runtime across dashboard management tables, dashboard equipment/package/maintenance tables, dashboard reservation report results, edit-reservation item tables, reservation-details item table shell, technician picker crew assignment table, project create services table, project report results, project details services/payment tables, and project edit services/payment tables. Updated the active phase so future work starts from Level 3 owner-drift cleanup instead of continuing additive Level 2 extraction.
- **What Was Verified:** Chrome/CDP final visual sweep on `dashboard.html?bypassAuth=1&fixture=dashboard&lang=en` and `projects.html?bypassAuth=1&fixture=dashboard&lang=en`; screenshots `test-results/level2-final-dashboard-sweep.png` and `test-results/level2-final-projects-sweep.png`; selector report had `missing: []` and `hiddenRequired: []`.
- **What Is Still Risky:** Level 2 hooks are visually confirmed, but old compatibility classes and page-specific selectors are intentionally still present. Removing them is Level 3 work and needs a deletion ledger plus targeted visual proof.
- **What Is Blocked:** none for Level 2.
- **Next Exact Task:** Start Level 3 with an audit-only owner-drift ledger. Do not remove CSS or legacy wrapper classes until the ledger identifies a safe target and a focused runtime check is ready.
- **Do Not Start Yet:** Do not remove `users-table-wrapper`, `reports-table-wrapper`, `project-modal-table-wrapper`, `reservation-payment-history-table-wrapper`, `crew-assignment-table-wrapper`, `reservation-modal-items-wrapper`, dashboard report summary/operations classes, or print/export selectors during closeout.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 reports result table scaffold extraction + report test expectation cleanup`
- **What Changed:** Added additive shared `reports-results-table-card`, `reports-results-table-wrapper`, and `reports-results-table` hooks to the approved dashboard reservations report result table and the projects report result table while preserving the existing reports owners: `reports-table-card`, `reports-table-wrapper`, `reports-table`, `reports-table-card--results`, and `projects-reports-table-card`. Added neutral width ownership in `src/styles/reports.css` and locked the shared report-result table path in the full-shell audit. Updated the stale project reports table unit expectation to match the current `reservation-chip status-chip status-paid` class contract.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js`; `npx vitest run tests/reports/surfaceAudit.test.js tests/projects/projectsReports/table.test.js tests/projects/projectsReports/filters.test.js tests/projects/projectsReports/controls.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`; Chrome/CDP visual pass on dashboard reservations reports and projects reports with screenshots `test-results/level2-reports-results-dashboard-final.png` and `test-results/level2-reports-results-projects-final.png`.
- **What Is Still Risky:** This batch only adds shared report-result hooks. It does not collapse existing dashboard summary/operations report tables, project report chart cards, report filters, pagination, print styles, or export behavior.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Continue with the next remaining Level 2 candidate only if it is another repeated locked primitive; otherwise switch to Level 2 visual regression sweeps and mark Level 2 complete once all additive hooks are visually confirmed.
- **Do Not Start Yet:** Do not remove existing `reports-table-*`, `projects-reports-table-card`, dashboard summary/operations report table classes, or report print selectors.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 project services table scaffold extraction + project owner-drift cleanup`
- **What Changed:** Added the shared `project-services-table-wrapper` hook to the create-project expense table renderer and the project details/edit expense table renderers while preserving the existing `users-table-wrapper`, `project-modal-table-wrapper`, `project-services-table-shell`, and `project-services-table` contracts. Added the base wrapper ownership in `src/styles/core.css`, wrapped view-mode project expense tables in `project-services-table-shell`, and locked the shared project services table path in the full-shell audit.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js`; `npx vitest run tests/projects/viewSummary.test.js tests/projects/viewFinancials.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`; Chrome/CDP visual pass on `http://127.0.0.1:5173/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en` with screenshots `test-results/level2-project-services-create-final.png`, `test-results/level2-project-services-details-final.png`, and `test-results/level2-project-services-edit-final.png`.
- **What Is Still Risky:** This batch only adds the shared table wrapper hook. It does not collapse project-modal table styling, project edit column sizing, expense row action styling, empty states, or create-project form layout.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Continue with the next small repeated Level 2 primitive: audit and, if safe, extract the remaining reports table/card hooks shared between dashboard reservation reports and project reports.
- **Do Not Start Yet:** Do not remove `project-modal-table-wrapper`, `project-services-table-shell`, or `project-services-table`; the Level 2 pass is still additive only.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 crew-assignment table scaffold extraction + modal owner-drift cleanup`
- **What Changed:** Added shared `crew-assignment-table-shell` and `crew-assignment-table` hooks to the technician-picker assignment table in both the static dashboard modal markup and the runtime reservation modal template. Existing picker-specific classes were preserved, including `crew-assignment-table-wrapper`, `crew-picker-table-wrapper`, `users-table-wrapper`, `ui-table`, `users-table`, and `surface-table`. Updated `src/styles/tabs.css` so the new shared hooks inherit the same base shell/table and dark-mode ownership as the existing crew assignment wrapper.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js`.
- **What Is Still Risky:** This batch only adds shared shell/table hooks. It does not collapse technician-picker column sizing, row states, mobile behavior, drag/assignment behavior, or picker-specific table styling.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Run the broader focused audit set and asset build. If clean, continue Level 2/3 with another small repeated locked pattern or pause for a visual runtime spot-check of modal/table populated states.
- **Do Not Start Yet:** Do not remove `crew-assignment-table-wrapper`, `crew-picker-table-wrapper`, or technician picker column classes until a populated modal visual/runtime pass proves they are redundant.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 payment-history table scaffold extraction + owner-drift cleanup`
- **What Changed:** Added shared `reservation-payment-history-table-shell` and `reservation-payment-history-table` hooks to the editable reservation payment-history renderer and the project details/edit payment-history renderers. Existing wrapper/table classes were preserved, including `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, `project-modal-table-wrapper`, `reservation-payment-history__table`, and read-only/edit modifiers. Added the shared hooks to the reservation CSS owner so base width/margin ownership can move through a single semantic table path without changing the approved visual result.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js`.
- **What Is Still Risky:** This batch only adds shared scaffold hooks and base ownership. It does not collapse payment-history row styling, action styling, project modal table styling, empty states, or dark-mode table cell rules.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Run the targeted reservation edit-form test and asset build. If clean, continue Level 2/3 with another small repeated locked pattern, likely remaining management table primitives or a runtime visual spot-check against Docker-backed fixture data.
- **Do Not Start Yet:** Do not remove `reservation-payment-history__table-wrapper`, `reservation-payment-history-table-wrapper`, `reservation-payment-history__table`, or project modal wrapper classes until a separate populated-state visual/runtime pass proves they are redundant.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 equipment/maintenance table scaffold extraction + stale audit cleanup`
- **What Changed:** Cleaned the stale `dashboardGreenChromeAudit` expectations so it now checks semantic shared hooks and token ownership instead of old literal CSS fragments. Then continued the shared embedded-management table extraction by adding `embedded-management-table-shell` and `embedded-management-table` to the locked dashboard equipment package item table, equipment packages table, and maintenance table. Existing page-specific wrapper/table classes were preserved so local CSS, JS selectors, IDs, and populated-state behavior remain intact.
- **What Was Verified:** `npx vitest run tests/theme/dashboardGreenChromeAudit.test.js`.
- **What Is Still Risky:** This batch only adds shared scaffold hooks and updates audits. It does not collapse the remaining equipment/maintenance table-specific sizing, column, or responsive rules, and it does not visually rework the equipment grid/list cards.
- **What Is Blocked:** none for this batch.
- **Next Exact Task:** Run the focused full-shell/secondary audit set and build after this scaffold change. If clean, continue Level 2/3 with another narrow repeated locked pattern such as payment-history table wrappers or remaining management table primitives.
- **Do Not Start Yet:** Do not remove `equipment-package-items-table-wrapper`, `equipment-packages-table-wrapper`, `maintenance-table-wrapper`, or the table-specific classes until a separate visual/runtime pass proves those selectors are no longer needed.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 reservation modal table-shell extraction + owner-drift cleanup`
- **What Changed:** Added a shared `reservation-modal-table-shell` wrapper hook and `reservation-modal-table` table hook to the read-only reservation details item table and the edit-reservation item table. Applied the same hooks in both the static dashboard modal markup and the runtime reservation modal template so future modal rendering follows the same table-shell contract. Reduced local CSS owner drift in `src/styles/reservations.css` by moving the common transparent wrapper reset and base min-width ownership from separate `reservation-modal-items-wrapper` / `#editReservationModal .table-responsive` selectors onto the new shared hooks.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js`; `npm run build:assets`. Also attempted `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js`; `modalFormsAudit` passed, while `dashboardGreenChromeAudit` still fails on older literal CSS expectations outside this narrow modal-table contract.
- **What Is Still Risky:** The modal item tables still have many intentional reservation-specific column, mobile, dark-mode, and page-scoped rules. This batch only creates a shared shell hook and removes duplicated wrapper ownership; it does not redesign or simplify table cell styling.
- **What Is Blocked:** none for this batch. Broader green-chrome audit drift remains a separate test-maintenance issue and should be handled in its own focused pass.
- **Next Exact Task:** Continue Level 2/3 with another single repeated locked pattern. Best candidates are equipment/maintenance table scaffolds or a dedicated audit-cleanup pass for stale CSS literal tests before more extraction.
- **Do Not Start Yet:** Do not collapse reservation item cell/column rules or payment-history table rules into the shared hook until a separate visual/runtime pass proves it is safe.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 embedded-management table scaffold extraction + owner-drift cleanup`
- **What Changed:** Added the shared `embedded-management-table-shell` wrapper hook and `embedded-management-table` table hook to the locked customer/technician records tables in both `projects.html` and `dashboard.html`. Collapsed the duplicated customer/technician wrapper chrome in `src/styles/app.css` onto `.embedded-management-table-shell` while preserving the existing `users-table-wrapper`, `ui-table`, `users-table`, and `surface-table` primitive classes for compatibility. Updated the full-shell contract audit so the shared embedded-management table path is now explicit and protected.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js`; `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only extracts the common table shell hook for customer/technician records. Equipment, maintenance, reports tables, reservation edit tables, and modal-internal tables still have their own module-specific wrappers and should be handled only in later narrow batches if a repeated locked pattern is proven.
- **What Is Blocked:** none
- **Next Exact Task:** Continue Level 2/3 with another single repeated locked pattern. Best candidates are reservation modal internals/table wrappers or equipment/maintenance records table scaffolds, but only after checking the existing page-specific owners and test expectations.
- **Do Not Start Yet:** Do not delete `users-table-wrapper`, `surface-table`, or Bootstrap table compatibility classes; they are still live bridge contracts across multiple pages.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 reservation modal-shell extraction + markup owner-drift cleanup`
- **What Changed:** Continued the active Level 2/3 program with the next narrow repeated locked pattern after reports filters. Aligned the static reservation details modal shell in `projects.html`, `customer.html`, and `technician.html` with the already-approved dashboard/runtime `reservation-shell-modal` contract. The modal IDs, `#reservation-details-body` target, close button behavior, translation hooks, and Bootstrap modal behavior were preserved; only the shell/chrome class ownership moved onto the shared reservation modal contract. Added an audit assertion so dashboard, projects, customer, technician, and `src/scripts/reservations/modals.js` all keep the same reservation details modal shell classes.
- **What Was Verified:** `npx vitest run tests/theme/modalFormsAudit.test.js`; `npm run build:assets`. Also attempted `npx vitest run tests/theme/modalFormsAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/fullShellContractAudit.test.js`; `modalFormsAudit` and `fullShellContractAudit` passed, but `detailsPageAudit` still fails on stale CSS string expectations in `app.css` / `core.css` that are not caused by this modal-shell alignment.
- **What Is Still Risky:** This batch intentionally does not extract a physical HTML partial for reservation modals because these pages still have different page composition paths. The risk is low because the runtime contract is unchanged, but a later cleanup could still promote the repeated reservation details modal snippet into a shared partial/helper if the build-time composition path supports it cleanly.
- **What Is Blocked:** none for this batch. Broader details-page audit cleanup remains a separate verification-debt item because the failing expectations reference old CSS literals.
- **Next Exact Task:** Continue Level 2/3 with another single repeated locked pattern. Best next candidates are embedded management table scaffolds or reservation modal internals/table wrappers, with focused tests updated before touching CSS.
- **Do Not Start Yet:** Do not use this modal-shell pass to redesign modal contents, reservation cards, project modal content, or detail-page layouts.

### 2026-05-10 | Codex
### 2026-05-10 | كودكس

- **Phase:** `Level 2 shared reports-filter extraction + Level 3 reports owner-drift cleanup batch 1`
- **What Changed:** Closed the lingering question around `dashboard` reservations `calendar-tab` by accepting the live dark-mode check as approved and locked, then moved the active redesign program out of page-local work and into the first real shared-extraction/cleanup slice. Added a new shared runtime helper, `src/scripts/reports/filterToggle.js`, and used it in both `src/scripts/reports.js` and `src/scripts/projectsReports.js` so the collapsible reports-filter card no longer has duplicated expand/collapse wiring in two separate approved report surfaces. Standardized the markup owners in `src/pages/dashboard.html` and `src/pages/projects.html` by giving both reports filter bodies the shared `reports-filters-body` contract and by promoting the projects reports card onto the same `reports-filters-card--collapsible` / `reports-filters-card__header` structure already proven in reservations reports. In `src/styles/reports.css`, extracted the shared filter-header/toggle/collapsible-body contract out of reservations/projects-specific scopes and removed the duplicated projects-only collapse/toggle block. Also took the matching first Level 3 cleanup slice by reducing legacy local control drift in `reports.css`: the generic reports filter sizing/focus rules now target the shared `.reports-filter-control` owner instead of `.form-control` / `.form-select` selectors tied to local Bootstrap shape, and the projects reports width rules likewise stop depending on those local selectors. This keeps both approved report pages visually stable while moving them onto one shared collapsible-filter contract and one cleaner filter-control owner path.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** Level 2 and Level 3 remain open programs. This batch only closes the first repeated reports-filter shell path; later extraction still needs to address other locked repeated patterns such as reservation modal shells, embedded management table scaffolds, and remaining report/control owner drift in `forms.css`, `maintenance.css`, `calendar.css`, and `app.css`.
- **What Is Blocked:** none
- **Next Exact Task:** Continue Level 2/3 with the next locked repeated pattern, preferring either reservation modal-shell extraction or embedded management table/form scaffolds, and keep all page-local dashboard/projects surfaces locked unless a concrete regression appears.
- **Do Not Start Yet:** Do not reopen `calendar-tab`, reports charts, report tables, or any other approved dashboard/project surface for fresh redesign ideas while the active work is now shared extraction and owner cleanup only.

### 2026-05-09 | Codex
### 2026-05-09 | كودكس

- **Phase:** `dashboard.html` equipment approval lock, cleanup closeout, and final dashboard status sync
- **What Changed:** Audited the last unresolved dashboard surface, `equipment-tab`, against the live localhost UI and the current code owners instead of leaving it implied unfinished. Ran visual passes on the equipment surface in light mode, dark mode, and narrow/mobile viewport using authenticated/bypass local screenshots of the live app. The equipment management tab already sat on the same approved card/table/filter family as the locked dashboard surfaces: a primary equipment form, a package-management form, a packages list table, and the equipment records surface with shared search/filter/reset controls. Closed its first no-drift Level 1 cleanup slices by extracting `buildRenderableEquipmentEntries()`, `readEquipmentFilterState()`, and `getFilteredEquipmentEntries()` in `src/scripts/equipment/render.js`, and by extracting `renderPackagesEmptyState()` plus `buildPackageTableRow()` in `src/scripts/equipmentPackagesManager.js`. These changes did not reopen the UI; they only gave the approved surface clearer page-owned render helpers. With that closeout, `equipment-tab` now joins the other dashboard tabs as visually approved with Level 1 cleanup complete. Updated this file to remove the stale “equipment is still unfinished” language and to state the true remaining work honestly: the dashboard program is locked; Level 2 shared extraction is still partial; Level 3 repo-wide cleanup is still open.
- **What Was Verified:** live localhost screenshots of `dashboard.html?bypassAuth=1` on `equipment-tab` in light mode, dark mode, and mobile-width layouts; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** No dashboard tab remains visually open, but Level 2 and Level 3 are still real remaining programs. `equipment-tab` itself should now stay locked unless a concrete regression appears, especially around future API-backed populated states that were not re-redesigned here.
- **What Is Blocked:** none
- **Next Exact Task:** Shift the active redesign program out of page-level dashboard work and into a deliberate Level 2 shared extraction audit, starting only from patterns that are now locked across dashboard/projects/reservations rather than reopening any dashboard tab.
- **Do Not Start Yet:** Do not reopen `equipment-tab` for new visual ideas now that the final dashboard surface is locked; any further work there should be regression-only or part of a later shared extraction pass.

- **Phase:** `dashboard.html` closeout audit, live verification, and status-sync pass
- **What Changed:** Ran a full closeout audit against the actual code and the live localhost dashboard instead of trusting the stale status lines in this file. Verified the reservations calendar live in an authenticated browser session on `http://localhost:5174/src/pages/dashboard.html`, including direct runtime inspection of dark-mode calendar layers via Chrome DevTools Protocol, then kept cleaning only with no-drift Level 1 slices where the code still justified a “started only” status. In `src/scripts/reservations/createForm.js`, extracted `bootCreateReservationSurface()` and `ensureCreateReservationUnloadPersistence()` so the approved create flow no longer repeats bootstrap/refresh ownership inline. In `src/scripts/customers.js`, extracted `getCustomersRenderPaginationData()` so the approved customers surface keeps one local owner for pagination-state math instead of repeating it in multiple render branches. In `src/scripts/maintenance/render.js`, extracted `renderMaintenancePrimaryState()` so the approved maintenance table uses one owner for loading/error primary-state rendering. In `src/scripts/technicians.js`, extracted `getFilteredTechnicians()` and `getFilteredPositions()` to close a second no-drift cleanup slice across the already-approved crew/positions surface. In `src/scripts/calendar.js`, extracted `resolveCalendarReservationContext()`, `collectCalendarReservationIdentifiers()`, and `findStoredCalendarReservationIndex()` so the now-approved calendar details flow keeps one page-owned owner for reservation matching instead of repeating identifier resolution inline. After that audit, updated this master plan to reflect the real state: `dashboard` reservations `create-tab`, `my-reservations-tab`, `reports-tab`, and `calendar-tab` are now all visually approved; `customers`, `maintenance`, `technicians management`, and `positions` all have enough page-owned cleanup slices to count as Level 1 cleanup complete; `reservation reports` cleanup completion remains locked; and the remaining unfinished dashboard surface outside the reservations family is still `equipment-tab`, which has redesign work but no formal approval-lock/cleanup-complete record yet. Also recorded the true program-level status for later phases: Level 2 shared extraction has partial completed work in earlier shared-shell and token batches, but it is not globally complete; Level 3 global cleanup is still an open later milestone, not finished work.
- **What Was Verified:** authenticated localhost live review on `http://localhost:5174/src/pages/dashboard.html`; direct CDP/runtime inspection of calendar dark-mode surfaces; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** `dashboard.html` equipment remains the only clearly unfinished dashboard tab in this file and still lacks a formal approval lock plus Level 1 cleanup closeout. At the program level, Level 2 shared extraction is only partially complete and Level 3 global cleanup has not been executed as a finished repo-wide pass.
- **What Is Blocked:** none
- **Next Exact Task:** If dashboard closeout continues, move the active work to `dashboard.html` `equipment-tab` and either approve it formally or record the specific blocker that prevents approval; only after every dashboard tab is truly locked should new Level 2 extraction work become the active track.
- **Do Not Start Yet:** Do not reopen the now-locked reservations surfaces, customers, maintenance, or technicians/positions for new visual ideas; keep further work there limited to concrete regressions or later shared extraction.

### 2026-05-07 | Codex
### 2026-05-07 | كودكس

- **Phase:** `dashboard.html` reservations calendar event-density and modal alignment batch 2
- **What Changed:** Followed the first calendar shell batch with a second pass on the actual operator experience: event readability, toolbar rhythm, and the calendar-details modal relationship to the surface. In `src/scripts/calendar.js`, extracted one shared `buildCalendarEventMarkup()` path so both FullCalendar and the TUI fallback now render the same event-card contract instead of leaving TUI on a raw utility-built card. This closes a real divergence where some environments could still show older card chrome inside the same tab. In `src/styles/calendar.css`, reordered the toolbar chunks so the period title sits more intentionally above the control groups, and on narrow screens the toolbar now wraps into stacked centered rows instead of behaving like a cramped horizontal strip. The same pass also tightened event-card depth and added calendar-owned tuning for the reservation details modal: overview cards, section cards, payment-history block, and technician grid now sit on calmer content surfaces when the reservation details are opened from the calendar context. In `src/pages/dashboard.html` and `src/scripts/translations/dashboard.js`, removed the remaining emoji-heavy title from the calendar details modal so its wording now matches the approved modal family more cleanly.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The calendar now has a calmer shell and a unified event-card path, but the tab still needs one final live approval-oriented read on real reservation density and mobile scrolling before it can be treated as approved. The remaining question is not structural drift anymore; it is final visual acceptance.
- **What Is Blocked:** the old screenshot helper is not present in this branch, so this pass still relies on source-level visual auditing plus the existing fixture-backed runtime contract instead of fresh automated captures.
- **Next Exact Task:** Review the reservations calendar tab on live or fixture-backed data for final approval, focusing only on real event density, mobile scroll behavior, and the calendar reservation-details modal in-context.
- **Do Not Start Yet:** Do not reopen reservation reports, create-tab, or my-reservations while the calendar tab is now the last active approval surface.

- **Phase:** `dashboard.html` reservations calendar shell and visual hierarchy batch 1
- **What Changed:** Opened the last remaining reservations surface in `dashboard.html` by starting the first bounded parity batch on the `calendar-tab`. Kept FullCalendar/TUI runtime behavior and reservation-modal wiring intact, but rebuilt the shell around it so the calendar now reads like an approved dashboard module instead of a leftover feature block. In `src/pages/dashboard.html`, promoted the calendar surface onto the shared content-card family, removed the emoji-heavy fallback copy, added a live count badge to the header, and wrapped the legend in its own calmer shell. In `src/scripts/calendar.js`, introduced `updateCalendarSummary()` so the header badge reflects the currently rendered event count, and removed the status-card utility-class injection so the loading/error/empty overlay is now owned by `src/styles/calendar.css` instead of leaking mixed Bootstrap/Tailwind utility chrome at runtime. In `src/styles/calendar.css`, flattened the old gradient shell onto shared content tokens, quieted the outer and inner surfaces, added a standardized legend shell and status-card contract, and tightened the event-card depth and hover treatment so the tab is visually closer to the approved reports and modal surfaces while preserving the color-coded reservation states. Also updated the Arabic/English calendar title/helper copy in `src/scripts/translations/dashboard.js` so the tab speaks in the same calmer tone as the rest of the redesigned dashboard.
- **What Was Verified:** source-level visual audit of the calendar shell/legend/status contract plus fixture-backed dark review via the existing dashboard validation path after the batch; final automated verification recorded after the code pass below.
- **What Is Still Risky:** This is the first calendar batch only. The runtime is stable, but the next pass still needs to judge event density, toolbar rhythm, and the details modal against the approved dashboard benchmark before the tab can be called approved.
- **What Is Blocked:** none
- **Next Exact Task:** Run the verification suite, then continue with a second calendar pass on event density, toolbar/mobile rhythm, and the reservation-details modal relationship to the calendar surface.
- **Do Not Start Yet:** Do not reopen reservation reports or reservation-create while the calendar tab is now the active final surface.

- **Phase:** `dashboard.html` reservations reports Level 1 cleanup completion
- **What Changed:** Closed the approved `reservations reports` surface at Level 1 cleanup by taking one more no-drift runtime slice in `src/scripts/reports.js`. After the earlier snapshot extraction, this pass extracted `bindReportsRenderCallbacks()` so the render lifecycle and drilldown callback wiring now live behind one page-owned helper instead of repeating the same render-and-resync closures inline during `initReports()`. This finishes the required page-owned cleanup without changing filters, KPI bands, charts, table behavior, export flow, or the newly approved reservation-reports UX.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** Level 1 cleanup is complete, but no Level 2 shared extraction has started. Any future changes should treat reservation reports as visually locked unless a concrete regression is found.
- **What Is Blocked:** none
- **Next Exact Task:** Move the active dashboard reservations track to the final `calendar-tab` and use the cleaned reports/contracts as the benchmark for surface quality and modal/legend calmness.
- **Do Not Start Yet:** Do not reopen reservation reports for fresh design ideas, and do not broaden this cleanup into cross-page shared extraction yet.

- **Phase:** `dashboard.html` reservations reports approval lock + Level 1 cleanup start
- **What Changed:** Accepted `dashboard` reservations `reports-tab` as approved after the final passes on filters, quick-access chips, KPI cards, Apex charts, lower tables, pagination, and the export-preview/export-output workflow. Standardized the export preview modal onto the approved modal family (`customer-edit-modal` + `reservation-shell-modal`), wired the `quote-preview-modal-open` backdrop lifecycle correctly to remove the legacy blue backdrop leak, and upgraded report exports so PDF stays on the unified A4 path while Excel now exports a multi-sheet workbook (`Summary`, `Reservations`, `Crew`, `Equipment`, `Forecast`, `Outstanding`, `Maintenance`) and CSV exports cleanly as a direct filtered file instead of the older ZIP-based metadata dump. Started the first Level 1 cleanup slice in `src/scripts/reports.js` by extracting the page-owned report snapshot assembly and snapshot storage helpers out of `renderReports()`, keeping the approved UX and data semantics untouched while clarifying the renderer ownership boundary.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This is only the first cleanup slice for the approved reports surface. Any later cleanup must stay no-drift unless a concrete regression appears in the approved rental analytics contract.
- **What Is Blocked:** none
- **Next Exact Task:** Keep the approved reservation reports surface locked and continue only with further Level 1 cleanup slices or future cross-surface extraction candidates, not new visual redesign work inside this tab.
- **Do Not Start Yet:** Do not reopen reservation reports filters, KPI hierarchy, chart semantics, table layout, or export UX for fresh ideas while the tab has just entered cleanup.

- **Phase:** `dashboard.html` reservations reports detail tables and results hierarchy batch 3
- **What Changed:** Rebuilt the lower half of reservations reports so it reads in two distinct layers instead of one flat block of equal-weight tables. In `src/pages/dashboard.html`, introduced clear section intros for the commercial layer (`top customers`, `top equipment`, `top outstanding`, `payment forecast`) and the operational layer (`crew`, `equipment costs`, `maintenance`), added explicit `colgroup` sizing to every lower report table, promoted the strongest cards with featured/primary spans, and added a compact results-toolbar above the main reservations results table. In `src/styles/reports.css`, converted the lower grids to 12-column weighted layouts on desktop, added the new section-intro, featured-card, summary-chip, and results-toolbar contracts, tightened the table wrappers and row typography, and made the lower cards collapse cleanly back to one column on mobile. In `src/scripts/reports.js`, added a small page-owned results meta renderer so the main results table now communicates how many confirmed reservations are being shown. In `src/scripts/reports/presenters/table.js`, improved the results rows so customer cells now show company/phone subtext and the date column reads as a compact date-plus-days stack instead of one raw timestamp string. Added the matching new Arabic/English copy in `src/scripts/translations/dashboard.js`.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The hierarchy is now much closer to a professional rental dashboard, but the final mobile density and live visual balance across filters, KPI bands, charts, and the heavier results/maintenance tables still need one explicit approval pass. Without that last pass, small spacing or overflow issues can still survive on narrow viewports.
- **What Is Blocked:** none
- **Next Exact Task:** Phase 4 for reservations reports: run the mobile/responsive polish and final visual approval pass across the whole reports surface, especially the lower report tables and results card, before calling the tab approved.
- **Do Not Start Yet:** Do not reopen the shell/filter or KPI hierarchy work unless a concrete regression is found during the Phase 4 approval pass.

- **Phase:** `dashboard.html` reservations reports KPI and chart hierarchy batch 2
- **What Changed:** Rebuilt the reservation reports hierarchy so the page now reads more like a rental operations dashboard instead of one flat analytics wall. In `src/pages/dashboard.html`, converted the KPI strip into two bands: a primary band for the three decision-driving metrics (`total reservations`, `total revenue`, `outstanding`) and a secondary band for supporting operating metrics (`crew cost`, `equipment cost`, `margin`, `net profit`). Also split the chart area into two analytics grids: a primary analytics row for the monthly bookings chart plus status distribution, and a secondary analytics row for monthly confirmed-vs-cancelled and payment status. In `src/styles/reports.css`, added reservations-specific KPI stack, featured-card, and dual analytics-grid contracts so the new hierarchy has clearer emphasis on desktop while staying horizontally scrollable on mobile. The revenue breakdown card was kept separate as a compact supporting block rather than another equal-weight chart.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The shell and analytics hierarchy are now clearer, but the lower detail/report tables still carry mixed widths and equal-weight presentation. If Phase 3 is skipped, the bottom half of the page will still feel heavier than the redesigned top half.
- **What Is Blocked:** none
- **Next Exact Task:** Phase 3 for reservations reports: redesign the detail/report tables and section ordering for top customers, crew work, equipment costs, maintenance, forecast, outstanding, and the reservation results table using the shared table contract and clearer reservation-specific reading order.
- **Do Not Start Yet:** Do not reopen the KPI hierarchy or collapse the reservations analytics back into one uniform grid while the lower report tables still need their own pass.

- **Phase:** `dashboard.html` reservations reports shell and filters parity batch 1
- **What Changed:** Opened the reservations `reports-tab` as the next active redesign surface and completed the first parity batch against the approved `project reports` benchmark. In `src/pages/dashboard.html`, split the old heavy reports shell into a lighter header card plus a separate compact filter card, then rebuilt the filter anatomy into clear rows: search + quick-access chips, four core filters, custom date range + PDF action, active filters, and presets. In `src/styles/reports.css`, added the reservations-specific compact filter contract so the new rows, preset controls, quick chips, and mobile stacking now follow the same rhythm as project reports instead of the previous monolithic filter block. In `src/scripts/reports.js`, added a clean reset action that restores all report filters to their defaults and triggers a refreshed render, and in `src/scripts/translations/dashboard.js` added the new reservations reports filter title/subtitle/quick-access labels in Arabic and English.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The current reservations reports surface now has a cleaner shell, but KPI ordering, chart weight, and detailed report tables are still using the older hierarchy. The next pass should stay focused on KPI/chart structure before reworking the lower report tables, otherwise the page can regress back into a flat dashboard with too many equal-weight sections.
- **What Is Blocked:** none
- **Next Exact Task:** Phase 2 for reservations reports: reorder KPI emphasis and chart hierarchy around reservation-specific rental analytics (bookings, revenue, outstanding, crew, equipment, maintenance) while preserving the working data pipeline and current filter ids.
- **Do Not Start Yet:** Do not reopen `my-reservations-tab`, and do not broad-brush merge reservation reports into the project reports codepath. Keep the benchmark influence at the UX/layout level only until the reservation-specific analytics hierarchy is stabilized.

- **Phase:** `dashboard.html` reservations my-reservations Level 1 cleanup complete
- **What Changed:** Closed Level 1 cleanup for `my-reservations-tab` after a second no-drift cleanup slice in `src/scripts/reservations/list/tiles.js`. Kept the approved active/archive reservation cards visually locked and extracted two local card helpers out of the render body: one for crew-summary derivation and one for card UI-state derivation (confirmation/payment badges, state tone class, and action CTA). Together with the earlier `src/scripts/reservations/renderers.js` slice that isolated pagination-host cleanup and grouped-section page-state calculation, the reservations list surface now has cleaner page-owned runtime boundaries without any selector, markup, or UX reopening.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** `my-reservations-tab` should now be treated as visually locked and cleanup-complete. Any further work there should be driven only by concrete regressions or future cross-surface Level 2 extraction, not more opportunistic local cleanup.
- **What Is Blocked:** none
- **Next Exact Task:** Move the active dashboard redesign track to the next unopened reservations/reporting surface instead of reopening the now-approved, cleanup-complete `my-reservations-tab`.
- **Do Not Start Yet:** Do not reopen the approved reservations `create-tab` or `my-reservations-tab` for fresh visual ideas while the next dashboard surface is still unopened.

- **Phase:** `dashboard.html` reservations my-reservations approval lock + Level 1 cleanup start
- **What Changed:** Accepted `dashboard` reservations `my-reservations-tab` as approved after the last reservation-card, modal, notes, equipment-table, and edit/details passes settled. Started the first Level 1 cleanup slice without reopening the approved UX. Kept the active/archive layout, reservation cards, details modal, quote preview modal, and action rhythm visually locked, and cleaned only the page-owned list renderer in `src/scripts/reservations/renderers.js`: extracted a dedicated pagination-host cleanup helper and a dedicated grouped-section pagination/render-state helper so empty/no-results/list rendering no longer repeats local pagination-host clearing and page-slice normalization logic inline. This keeps the cleanup local to `my-reservations-tab` renderer ownership and does not change selectors, card markup, modal behavior, or reservation business logic.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This is only the first cleanup slice for `my-reservations-tab`. The surface should now be treated as visually locked, and any later cleanup must stay no-drift unless a concrete regression appears.
- **What Is Blocked:** none
- **Next Exact Task:** Keep both approved reservations surfaces locked and move the active dashboard redesign track to the next unopened reservations/reporting surface instead of reopening `my-reservations-tab`.
- **Do Not Start Yet:** Do not reopen the approved reservations `create-tab` or `my-reservations-tab` for new visual ideas while Level 1 cleanup has only just begun.

### 2026-05-06 | Codex
### 2026-05-06 | كودكس

- **Phase:** `dashboard.html` reservations my-reservations tab quotation/details modal parity batch 6
- **What Changed:** Continued only inside `my-reservations-tab`, but moved from the already-fixed reservation shell infrastructure to the last two modal surfaces that still felt visually out-of-family: the quotation preview modal and the equipment/crew sections inside reservation details. The quote preview flow was still being created dynamically on a raw Bootstrap modal path, with its own local backdrop behavior and header/body/footer chrome that did not match the approved modal benchmark. Rebuilt `src/scripts/reservations/pdf/modal.js` so the dynamically mounted `reservationQuoteModal` now uses the same `customer-edit-modal` + `reservation-shell-modal` shell, centered/scrollable dialog sizing, translated close button semantics, and explicit body lifecycle hooks for `quote-preview-modal-open`. Added the matching blurred dark backdrop owner in `src/styles/app.css` so the preview modal no longer depends on the generic backdrop tint or the old blue-looking focus state. Then moved into `src/scripts/reservations/list/details.js` and `src/styles/reservations.css`, lifting the reservation details `crew` and `equipment` areas onto clear section-card surfaces: both sections now share calm content-muted cards, clearer section-title/count treatment, cleaner equipment wrapper/table framing, and crew cards/list shells that match the approved modal family instead of the older local reservation blocks.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The infrastructure and visual family are now aligned in code, but `my-reservations-tab` still needs one live visual pass over the reservation cards plus the quote/details modals together before approval. The remaining risk is limited to final visual polish, not shell drift or modal lifecycle gaps.
- **What Is Blocked:** none
- **Next Exact Task:** Run a live visual pass on `dashboard.html` reservations `my-reservations-tab`, focusing on reservation card density plus the now-updated quotation/details modals before deciding whether the tab is approval-ready.
- **Do Not Start Yet:** Do not reopen the approved reservations create-tab, and do not widen this into reservation reports or unrelated dashboard tabs while `my-reservations-tab` remains the active surface.

- **Phase:** `dashboard.html` reservations my-reservations tab reservation-modal shell parity batch 5
- **What Changed:** Stayed inside the active `my-reservations-tab`, but shifted from card readability to the next user-reported blocker: the reservation modals themselves were still on mixed raw Bootstrap shells, did not consistently center or scroll, and were missing the dark reservation-specific backdrop hook, which is why the user kept seeing blue focus leakage and modal chrome that did not match the approved `equipment`, `maintenance`, and crew picker families. Reworked the static reservation modals in `src/pages/dashboard.html` and the fallback templates in `src/scripts/reservations/modals.js` so `editReservationModal`, `reservationDetailsModal`, `closeReservationModal`, and `calendarReservationModal` now all use the shared `customer-edit-modal` / `ui-modal__content` shell with centered, scrollable dialogs. Added reservation-specific dialog sizing in `src/styles/app.css`, introduced `body.reservation-modal-open .modal-backdrop.show` with the same dark blurred treatment used by the approved modal surfaces, and wired backdrop lifecycle cleanly through `mountReservationModalsIfNeeded()` plus the reservation open flows in `src/scripts/reservations/renderers.js`, `src/scripts/reservations/controller.js`, `src/scripts/reservations/controller/actions.js`, and `src/scripts/reservationsEdit.js` so the class is present before show and cleaned on hide. This keeps the change cleanly in modal shell/lifecycle code instead of introducing new local backdrop overrides.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The shell-level backdrop and scroll fixes are now in place, but `my-reservations-tab` still needs one live visual pass over the reservation modals and card density together before approval. The remaining risk is now limited to fine visual polish, not modal infrastructure drift.
- **What Is Blocked:** none
- **Next Exact Task:** Run a live visual pass on `dashboard.html` reservations `my-reservations-tab`, focusing on reservation card density and the now-unified details/edit/close modals before deciding whether the tab is approval-ready.
- **Do Not Start Yet:** Do not reopen the approved reservations create-tab, and do not widen this into reservations reports or unrelated dashboard tabs while `my-reservations-tab` remains the active surface.

- **Phase:** `dashboard.html` reservations my-reservations tab reservation-card readability batch 4
- **What Changed:** Continued only inside `my-reservations-tab` and focused on the part the user still called out as unreadable: the reservation card itself. The earlier benchmark work correctly introduced active/archive grouping, but the cards were still borrowing too much `project` language, including project-style structural classes, emoji-heavy labels, boxed rows that read like input fields, and too much green emphasis on active reservations. Reworked `src/scripts/reservations/list/tiles.js` so each reservation card now uses a reservation-native layout: two badges only (confirmation + payment), a clearer title/range heading, a quieter summary grid for project/equipment/crew/total, optional notes only when they exist, and restored confirm/close actions on active reservations without extra tag clutter. Added decorator stripping so the card does not inherit emoji noise from older translation strings, and tightened `src/styles/reservations.css` to match the new anatomy with fixed non-stretching width, calmer dark-mode surfaces, smaller summary panels, and mobile behavior that stacks the summary cleanly instead of reading like oversized field rows.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The card readability is materially improved in code, but the active/archive surface still needs one live visual confirmation pass with real reservation data to judge whether the card density and CTA weight are now settled enough for approval. The remaining risk is no longer structural drift; it is fine-grain polish only.
- **What Is Blocked:** none
- **Next Exact Task:** Run a final live visual pass on `dashboard.html` reservations `my-reservations-tab`, focusing only on card density, badge clarity, and action rhythm before deciding whether the tab is approval-ready.
- **Do Not Start Yet:** Do not reopen the approved reservations create-tab, and do not widen this into reservation reports or unrelated dashboard tabs while `my-reservations-tab` remains the active surface.

- **Phase:** `dashboard.html` reservations my-reservations tab active/archive benchmark parity batch 3
- **What Changed:** Continued the `my-reservations-tab` redesign from the benchmark complaint the user raised: the earlier shell/card pass improved the list, but it still behaved like a single flat reservations grid instead of the approved `my projects` focus surface. Reworked `src/scripts/reservations/renderers.js` so filtered reservations are now split into explicit `live` and `archive` groups, each with its own benchmark-style section header, hint, count badge, empty state, and pagination flow instead of one shared pager under the whole list. Rebuilt reservation card markup in `src/scripts/reservations/list/tiles.js` off the shared `project-focus-card` structure rather than the lighter reservation tile family, and made the card states communicate the three user-critical lifecycles clearly: active, closed, and cancelled. Added reservation-specific section/lifecycle copy in `src/scripts/translations/dashboard.js`, exported the new lifecycle-group helper through `src/scripts/reservations/list/index.js`, and added only the small reservation-specific bridge styles needed in `src/styles/reservations.css` so `my-reservations-tab` reads like the same family as `my projects` rather than a separate local list implementation.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The cards and grouping are now structurally much closer to `my projects`, but they still need a live visual read on real reservation data to judge whether the new card density and lifecycle labeling are fully settled before approval.
- **What Is Blocked:** none
- **Next Exact Task:** Run the automated checks, then do a final visual pass on the active/archive groups, card density, and reservation details modal before deciding whether `my-reservations-tab` is approval-ready.
- **Do Not Start Yet:** Do not reopen the approved reservations create-tab, and do not widen this into reservations reports while `my-reservations-tab` is still the active redesign surface.

- **Phase:** `dashboard.html` reservations my-reservations tab cards + shared pagination parity batch 2
- **What Changed:** Continued the active `my-reservations-tab` redesign using `my projects` as the benchmark instead of leaving the list on its older reservation-only tile family. The first shell pass was correct but still left the actual reservation grid on local `reservation-tile` cards with custom pagination chrome and louder confirmation CTA styling, which made the surface feel disconnected from the approved project-linked reservation cards elsewhere in the product. Reworked the active list markup in `src/scripts/reservations/list/tiles.js` so each reservation now renders on the shared `project-reservation-card` family with shared badge treatment, a clearer range line, vertical metadata, and a calmer action row. Added a dedicated pagination host in `src/pages/dashboard.html`, moved `src/scripts/reservations/renderers.js` off the local reservation-pagination markup onto the shared `list-pagination` contract, and tightened `src/styles/reservations.css` so the active reservations grid, empty state, CTA row, and mobile behavior all read like the approved benchmark surfaces rather than a separate local implementation.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The active reservations section is now structurally much closer to the benchmark, but the final approval judgment still depends on a live visual pass over the card density, detail modal, and any remaining tile-specific copy rhythm with real data.
- **What Is Blocked:** none
- **Next Exact Task:** Continue inside `dashboard.html` reservations `my-reservations-tab` with a focused live visual pass on the reservation cards and details modal, then either approve the tab or do one very small final polish batch.
- **Do Not Start Yet:** Do not reopen the now-approved reservations create-tab while `my-reservations-tab` is the active redesign surface, and do not widen this into reservations reports in the same pass.

- **Phase:** `dashboard.html` reservations my-reservations tab shell parity batch 1
- **What Changed:** Opened `dashboard` reservations `my-reservations-tab` as the next active surface after locking reservation creation. The first audit showed that the list still lived on an older loose strip layout: search and filters were floating without a records-card frame, there was no visible live count or explicit reset action, and the surrounding shell still used legacy reservation-specific gradient/control rhythms instead of the cleaner dashboard management surfaces already approved elsewhere. Rebuilt only the outer shell without touching reservation list business logic: wrapped the surface in a shared content card, added a header with support copy and a live count badge, introduced an explicit reset button in the filter toolbar, routed the results through a dedicated shell, added list count/filter count translations, and updated `src/scripts/reservations/renderers.js` so the count badge reflects total vs filtered reservations as the user searches or filters.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only cleans the surrounding shell and filter rhythm. The reservation tiles, pagination presentation, and detail/action density still need a live visual pass and likely one more bounded polish batch before any approval decision.
- **What Is Blocked:** none
- **Next Exact Task:** Continue inside `dashboard.html` reservations `my-reservations-tab` with a focused visual audit on the reservation tile grid, pagination chrome, and tile-action rhythm.
- **Do Not Start Yet:** Do not reopen the now-approved reservations create-tab while `my-reservations-tab` is the active redesign surface, and do not widen this into reports/list modals in the same pass.

- **Phase:** `dashboard.html` reservations create-tab approval lock + Level 1 cleanup start
- **What Changed:** Accepted `dashboard` reservations `create-tab` as visually approved and started the mandatory Level 1 cleanup path without reopening the surface. Kept the approved create UI untouched and cleaned only the owner bootstrap/refresh layer in `src/scripts/reservations/createForm.js`: extracted repeated create-form initialization and refresh behavior into page-owned helpers for reference-data hydration, selector setup, equipment/package setup, interaction wiring, surface rendering, and language refresh. This removes repeated bootstrap steps and clarifies ownership for the reservation-create surface while preserving all reservation IDs, draft restore behavior, equipment/package flows, summary rendering, and submit hooks.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This is only the first cleanup slice. The create surface is visually locked, but no Level 1 completion claim should be made yet; any later cleanup must stay no-drift and page-owned unless a future shared extraction is explicitly justified.
- **What Is Blocked:** none
- **Next Exact Task:** Keep `reservations create-tab` visually locked and move the active dashboard redesign track to the next reservations surface instead of reopening create unless a concrete regression appears.
- **Do Not Start Yet:** Do not widen this cleanup into reservation list/reports/modals in the same pass, and do not reopen the approved create-tab UI for new visual ideas while Level 1 cleanup is only beginning.

- **Phase:** `dashboard.html` reservations create-tab UX parity batch 4
- **What Changed:** Continued only inside the reservation create surface and focused on the two areas still reading as random in live use: the equipment table and the desktop side rail. The create-tab equipment table already had a `colgroup`, but its CSS was still fighting that contract through old `nth-child` width guesses; this caused the item column to keep stealing width from quantity/days and made the row feel unstable. Replaced that conflict with explicit create-tab column ownership, increased the table minimum width, widened the equipment column cleanly, gave quantity/days/price columns fixed readable widths, and made the quantity/days controls center and size predictably instead of spilling into neighboring columns. At the same time, tuned the reservation item cell itself so the title/details block aligns from the top and reads as one bounded content column instead of colliding visually with the control cells. On the broader UX side, calmed the desktop side rail by narrowing it into a true support column, making it sticky, softening the side-card chrome, and giving notes/terms taller, more deliberate editors so the reservation create surface now reads more like a guided workflow and less like unrelated pieces stacked beside the main form.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The create surface is now significantly cleaner, but it still needs a final live visual/operator read to confirm that the new table widths and the side rail feel correct with real reservation data and mixed Arabic/English content. The next step should be a narrow approval-oriented review, not another broad layout rewrite.
- **What Is Blocked:** none
- **Next Exact Task:** Do a final visual approval pass on `dashboard.html` reservations `create-tab`, focusing on live data density in the equipment table, side-rail clarity, and end-to-end operator flow.
- **Do Not Start Yet:** Do not widen this into reservation list/reports/modals, and do not reopen approved dashboard tabs while the reservations create surface is in its final approval window.

- **Phase:** `dashboard.html` reservations create-tab UX parity batch 3
- **What Changed:** Continued the reservation-create redesign by fixing the two heaviest UX regressions left after the previous parity pass: the billing/payment panel and the reservation equipment table. Replaced the old `row/col-auto` billing layout with a clearer two-panel grid so discount/tax and payment-status/payment-progress stay inside their cards instead of drifting out of the container. Moved the reservation actions into a dedicated final action row so the create flow now reads more like a finish step instead of a crowded bootstrap row. On the equipment side, flattened the reservation items table onto a lighter shared-table rhythm: removed the doubled table chrome, shifted the first column to start-aligned content, constrained the actions column, and made the wrapper carry the surface instead of the table itself. The overall create flow is now less crowded and smoother without touching reservation IDs, equipment hooks, or submit/runtime logic.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The reservations create surface is now materially clearer, but it still needs a final live visual acceptance read to confirm that section density and action placement feel fully settled in real use. The next likely work should be either an approval decision or one very small polish pass, not another broad restructure.
- **What Is Blocked:** none
- **Next Exact Task:** Run the final visual/UX approval pass on `dashboard.html` reservations `create-tab`, focusing only on live operator flow and any tiny density tweaks that remain.
- **Do Not Start Yet:** Do not widen this into reservation list/reports/modals until the create tab is explicitly approved or a single last create-tab polish pass is completed.

- **Phase:** `dashboard.html` reservations create-tab UX parity batch 2
- **What Changed:** Continued only inside `dashboard` reservations `create-tab`, using `projects.html` create-project as the benchmark. Reworked the reservation create surface from “clean shell” to clearer step-by-step UX: replaced the duplicated in-card “create reservation” heading with a true schedule/link section header, added matching section headers and helper copy for crew, equipment, billing/payment, notes, and terms, and removed the leftover legacy centering rules that were still forcing the create tab onto an older centered CRUD layout. Tightened widths for the schedule rows, crew stack, equipment inputs/table, billing row, and preview surfaces so the form now reads like a guided workflow instead of one large mixed form. Kept all reservation IDs, inputs, equipment hooks, and submit behavior unchanged while moving the create surface closer to the approved `projects` create rhythm.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The create surface is now structurally and semantically clearer, but it still needs a final visual acceptance read on live reservation data and real operator usage before it can be called approved. The next risk is no longer shell drift; it is whether section density and action placement feel fully settled in actual use.
- **What Is Blocked:** none
- **Next Exact Task:** Run a final visual/UX pass on `dashboard.html` reservations `create-tab` with live data and decide whether it is ready for approval or needs one very small last polish pass.
- **Do Not Start Yet:** Do not widen this into reservation list/reports/modals until the create tab is explicitly approved or a single final create-tab polish pass is completed.

- **Phase:** `dashboard.html` positions approval lock + Level 1 cleanup start, then reservations create-tab benchmark audit batch 1
- **What Changed:** Closed the dashboard `positions` subtab as approved after the earlier UX/polish passes and started its first no-drift Level 1 cleanup slice inside `src/scripts/technicians.js`. Extracted `renderPositionsEmptyState()` and `getPositionsPaginationState()` so the positions subtab now uses one local owner for empty-state rendering and one local owner for pagination-state normalization instead of repeating the same table-state logic inline. Immediately after that, switched the active dashboard redesign track to `reservations` and landed the first bounded shell batch on `create-tab`: rebuilt the old single `box` create surface into a clearer `reservation-create-surface` with a header, split `main + side` layout, dedicated cards for scheduling/client-project identity, crew selection, equipment selection, billing/payment, notes, and quote terms, and upgraded the reservation items table wrapper onto the shared `users-table-wrapper` + `users-table surface-table` path without changing any reservation form IDs or runtime hooks.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** `positions` cleanup has only started, not finished. The reservations create surface is structurally cleaner now, but it still needs a visual pass on live data and a likely follow-up batch focused on section density, action hierarchy, and mobile behavior before it can be considered approved.
- **What Is Blocked:** none
- **Next Exact Task:** Continue only inside `dashboard.html` `reservations` `create-tab` with the next visual/UX batch, keeping all reservation create IDs and submit/runtime contracts stable.
- **Do Not Start Yet:** Do not widen this pass into reservation list/reports/modals yet, and do not reopen the now-approved dashboard crew/positions surface except for similarly small cleanup slices.

### 2026-05-05 | Codex
### 2026-05-05 | كودكس

- **Phase:** `dashboard.html` technicians-positions UX audit batch 1
- **What Changed:** Followed the crew-management approval lock by opening the `positions` subtab as a true UX surface instead of leaving it as a simple CRUD block. Rebuilt the positions form into two clearer groups: identity on the main side and pricing on a dedicated side section, with helper copy and a pricing note that explains how the default cost/client price are used downstream. Upgraded the records header so it now includes support text instead of a bare title plus numeral, and changed the count badge semantics from a raw number to a localized label via `renderPositionsCount()`. Also added responsive grid behavior so the positions form collapses cleanly on smaller screens instead of reading like a flat desktop-only data form.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This batch improved form clarity and records rhythm, but the positions subtab still needs a final approval-oriented visual judgment on live content density and action-column calmness before it can be called approved as the second half of the dashboard crew surface.
- **What Is Blocked:** none
- **Next Exact Task:** Run one final visual pass on the positions subtab and decide whether it is ready for approval or needs one very small last polish pass.
- **Do Not Start Yet:** Do not widen this into reservations or page-wide technicians cleanup completion until the positions subtab is explicitly closed.

- **Phase:** `dashboard.html` technicians-management approval lock and Level 1 cleanup
- **What Changed:** Formally treated the dashboard crew-management surface inside `#technicians-tab` as approved based on the completed parity and polish passes, then started Level 1 cleanup with a no-drift runtime slice inside `src/scripts/technicians.js`. Extracted the technician status resolution into `getTechnicianStatusInfo()` and centralized management-row action button rendering into `buildTechnicianActionButtons()`, removing repeated inline status/action assembly from `renderTechniciansTable()` without changing the approved DOM contract, table rhythm, pagination behavior, or permissions flow. At the planning level, split the remaining dashboard crew work more cleanly: `crew management` is now the approved benchmark half of the tab, while the `positions` subtab becomes the next active audit surface instead of leaving both concerns bundled together.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This starts cleanup for the approved crew-management surface only. The `positions` subtab still needs its own deeper visual approval read before the whole dashboard technicians tab can be called fully approved and moved into a broader cleanup-closeout.
- **What Is Blocked:** none
- **Next Exact Task:** Audit the `positions` subtab on live data and decide whether it needs one more bounded polish pass or is ready for approval as the second half of the dashboard technicians surface.
- **Do Not Start Yet:** Do not widen this into reservations, and do not begin page-wide technicians cleanup completion until the `positions` subtab is either approved or explicitly marked for one last tiny polish pass.

- **Phase:** `dashboard.html` technicians-tab polish pass
- **What Changed:** Followed the first dashboard crew parity batch with one bounded polish pass instead of reopening the tab structurally. Softened the positions subtab so it now reads like the same embedded-management family as the main crew list: converted the positions count to the same soft badge contract, upgraded the empty state to the shared `projects-table-empty-row` treatment, flattened the inner positions table wrapper, tightened the positions action column, and balanced the positions table widths so Arabic/English labels, cost/client price, and actions read more calmly. Also added mobile horizontal-scroll sizing for the positions table so it behaves like the other approved dashboard tables instead of collapsing unpredictably on narrow screens.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The crew tab is now structurally aligned and visually calmer, but it still needs a live visual acceptance read before approval. The next step should be an approval decision or one final micro-polish on live data density only, not another structural rewrite.
- **What Is Blocked:** none
- **Next Exact Task:** Review the upgraded dashboard crew / technicians tab visually with live data and decide whether it is ready for approval or needs one very small final polish pass.
- **Do Not Start Yet:** Do not start Level 1 cleanup on dashboard crew yet, and do not widen this into reservations while the crew tab still needs its approval read.

- **Phase:** `dashboard.html` technicians-tab benchmark audit and first parity batch
- **What Changed:** Opened the dashboard crew / technicians tab as the next active redesign surface and landed the first bounded parity batch against the approved `projects` technicians surface and the approved dashboard customer/maintenance embedded-management shells. Rebuilt the management subtab form into the same `technician-embedded-form-card` family with a split `main + side` layout, preserving the dashboard-specific email field and role-cost summary while moving notes and the summary block into a quieter side card. Reframed the management records area into a proper records card with heading stack, support text, live count badge, one compact search/role/reset toolbar, shared `users-table-wrapper` ownership, and scoped pagination. Removed the old `customer-table-wrapper technician-table-wrapper` path from the dashboard technicians markup, upgraded the technicians table onto the global `users-table` contract, and exposed the existing runtime hooks for the live count and reset button that were already supported in `src/scripts/technicians.js` but previously unused by the dashboard DOM. Also lifted the positions subtab off its older `box/ui-table-shell` chrome onto the shared glass-card and `users-table` shell family so the crew tab no longer reads as half-modern and half-legacy in the same surface. Finally, extended the existing technicians CSS family from `#technicians-section` only to `:is(#technicians-section, #technicians-tab)` so the approved projects benchmark styles now own both surfaces cleanly, and added the missing crew-record translation keys to the dashboard translation owner instead of creating one-off strings in HTML.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This is a structural parity batch, not an approval lock. The crew tab still needs a live visual read on real dashboard data before calling it approved, and the next step should now be a focused approval review or one small polish pass, not another structural rewrite.
- **What Is Blocked:** no automated screenshot runner is bundled in this branch, so the visual call still depends on live review or user-provided screenshots rather than fresh captured artifacts.
- **Next Exact Task:** Review the upgraded dashboard crew / technicians tab visually in dark mode with live or fixture-backed data, then decide whether it can be approved directly or needs one smaller polish pass on positions/list density only.
- **Do Not Start Yet:** Do not start Level 1 cleanup on dashboard technicians yet, do not widen this into reservations, and do not reopen the already-approved dashboard customers or maintenance tabs without a concrete regression.

- **Phase:** `dashboard.html` maintenance-tab approval lock and Level 1 cleanup
- **What Changed:** Formally treated the embedded `#maintenance-tab` inside `dashboard.html` as approved based on the completed shell, modal, badge, table, and mobile refinement passes, then started the required Level 1 cleanup with a no-drift runtime slice inside the maintenance owner. Extracted the maintenance empty-state rendering into `renderMaintenanceEmptyState()`, centralized the active filter snapshot in `getMaintenanceFilterState()`, and moved reset-filter field clearing into one local `resetMaintenanceFilters()` helper. This keeps the approved maintenance surface visually locked while removing duplicated runtime branches and keeping future table/filter changes page-owned instead of ad hoc.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only starts Level 1 cleanup for the dashboard maintenance tab. It does not begin Level 2 extraction between dashboard surfaces, and it does not reopen the approved maintenance UI unless a concrete regression appears later.
- **What Is Blocked:** none
- **Next Exact Task:** Move the active dashboard redesign track to `#technicians-tab` / crew management, using the approved dashboard customers and maintenance tabs as the benchmark for shell, table, and form rhythm.
- **Do Not Start Yet:** Do not reopen the approved maintenance tab for extra polish without a concrete regression, and do not widen this cleanup into reservations or cross-page shared extraction yet.

- **Phase:** `dashboard.html` mobile optimization pass for customers, equipment, and maintenance
- **What Changed:** Ran a dedicated mobile-UX pass across the three dashboard tabs that now carry the redesigned embedded-management shells: customers, equipment, and maintenance. Tightened the mobile layout so the heading stacks, count badges, and records toolbars collapse vertically instead of fighting for one row; forced the customer, equipment, and maintenance search/filter/reset controls to expand to full width on phones; and aligned the equipment tab's top toolbar with the same full-width stacked rhythm so action buttons do not read as cramped pills on small screens. Also improved the mobile presentation of the customer and maintenance tables by reducing cell padding, keeping horizontal overflow touch-friendly, and making action columns more predictable on narrow viewports instead of letting buttons crowd the row. On the maintenance side specifically, the selected-equipment side card, section cards, and summary strip now collapse more cleanly on phones. This pass is mobile-only layout work and does not reopen any business logic.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This branch still does not include a dedicated automated screenshot runner with Playwright, so the mobile review was done through source-level responsive contract auditing plus verification, not fresh screenshot artifacts. A final human mobile glance is still useful before closing the whole dashboard redesign track.
- **What Is Blocked:** none
- **Next Exact Task:** Continue the live visual approval review on the active dashboard surfaces, with special attention to maintenance approval and any remaining reservation-family work, now that the most obvious customers/equipment/maintenance mobile friction has been reduced.
- **Do Not Start Yet:** Do not widen this into a global all-pages mobile rewrite; keep follow-up work tied to concrete regressions or the next active dashboard surfaces only.

- **Phase:** `dashboard.html` maintenance-tab modal/badge/table polish pass
- **What Changed:** Followed the first maintenance shell parity batch with a second bounded pass focused on the remaining presentation debt instead of reopening business logic. Flattened the maintenance status and priority badges onto the same muted shared-token family used elsewhere in the dashboard, removed the legacy duplicated status-tag glow block from the bottom of `src/styles/maintenance.css` so it can no longer override the newer badge contract, and tightened the maintenance table presentation onto the shared `users-table` family without customer-wrapper drift. Also brought both maintenance modals (`#closeMaintenanceModal` and `#maintenanceReportModal`) much closer to the approved modal family by switching them onto centered scrollable dialogs, shared content background/border tokens, quieter card/item surfaces, calmer action footers, and shared dismiss-button behavior. This pass keeps maintenance unapproved, but it closes the largest remaining structural and token-level inconsistencies after the first shell rewrite.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The tab now has much less structural and token drift, but it still needs one final live visual acceptance read on real or fixture-backed ticket data before calling it approved. The remaining decision should now be a true approval call or one very small visual polish pass, not another rewrite.
- **What Is Blocked:** no automated screenshot helper was used in this pass, so the visual call still depends on the live surface review rather than fresh captured artifacts.
- **Next Exact Task:** Review the upgraded maintenance list and both maintenance modals visually with dark-mode ticket data, then decide whether to approve the tab directly or run one final micro-polish pass on badge density / modal spacing only.
- **Do Not Start Yet:** Do not mark `#maintenance-tab` approved yet, do not start cleanup on it, and do not widen this into reservations while the maintenance surface still needs its final approval read.

- **Phase:** `dashboard.html` maintenance-tab benchmark audit and first parity batch
- **What Changed:** Opened the maintenance tab as the next official dashboard redesign surface and applied the first benchmark-alignment batch without changing maintenance ticket behavior. Rebuilt the create-ticket surface into the same card family used by the approved embedded management tabs: the form now uses a split `main + side` layout, the ticket-setup and issue fields are grouped into dedicated section cards, and the selected-equipment state moved into a quieter side card instead of floating as a detached centered strip. Reframed the maintenance list into a records-card surface with a proper heading stack, support text, live count badge, maintenance summary block, and one compact toolbar for search, status, priority, and reset. Removed the old `customer-table-wrapper` dependency from the maintenance table markup, moved it onto the shared `users-table-wrapper` / `ui-table` family, added a local count updater plus a reset-filters action in the runtime owner, and replaced the duplicated loading/error row injection with the same global empty-row contract used elsewhere in the dashboard tables. This is still a first redesign batch, not an approval lock.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This batch intentionally stops at shell and UX structure. The two maintenance modals and any deeper status-badge refinement still need a dedicated visual approval read before the tab can be called approved, and no Level 1 cleanup should start yet.
- **What Is Blocked:** no browser-screenshot helper is bundled in this branch, so the visual read is currently source-level plus contract verification rather than a fresh captured screenshot.
- **Next Exact Task:** Review the upgraded maintenance tab visually in dark mode with real or fixture-backed ticket data, then decide whether one focused polish pass is still needed on the table/modal presentation before approval.
- **Do Not Start Yet:** Do not mark `#maintenance-tab` approved yet, do not start cleanup on it, and do not widen this into reservations while the maintenance surface still needs its first visual acceptance read.

- **Phase:** `dashboard.html` customers-tab approval lock and Level 1 cleanup
- **What Changed:** Formally treated the embedded `#customers-tab` inside `dashboard.html` as approved based on the completed benchmark-alignment pass and the latest sign-off, then started the required Level 1 cleanup with a no-drift runtime slice in `src/scripts/customers.js`. Extracted the repeated customer-table `loading / error / empty` rendering path into one local helper `renderCustomersTableState()` so the dashboard/projects shared customers module now uses one owner for its table-state row injection instead of duplicating three near-identical `innerHTML` branches. This is cleanup only: no selector changes, no pagination contract changes, no data-flow changes, and no visual reopening of the approved embedded customer UX.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only starts Level 1 cleanup for the dashboard customers tab. It does not begin Level 2 extraction between `projects` and `dashboard`, and it does not reopen the aligned customer UI unless a concrete regression appears later.
- **What Is Blocked:** none
- **Next Exact Task:** Return to the remaining `dashboard.html` tabs with the customers surface now locked, using it as the approved embedded-management benchmark while continuing equipment approval and then the other dashboard slices before reservations.
- **Do Not Start Yet:** Do not reopen `dashboard.html` customers for extra polish without a concrete regression, and do not widen this cleanup into cross-page shared extraction yet.

- **Phase:** `dashboard.html` equipment-tab form UX refinement
- **What Changed:** Followed the first equipment shell parity batch with a focused UX pass on the add-equipment form itself after visual review showed the fields still felt random, over-separated, and too stretched across the container. Reorganized the form into three clearer step-like groups: equipment identity, pricing, and catalog/source details. The main form now uses two internal section cards instead of one loose top row, the description and barcode controls were promoted into a full-width identity flow, pricing was isolated into a dedicated compact section, and the side panel now explicitly reads as the catalog/details group instead of a leftover stack. Also constrained the internal form width so the surface no longer feels like one very wide empty canvas, and aligned the action row to that same narrower content width. Added the supporting dashboard translations for the new section titles and hints.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This improves the manual add-equipment flow, but it does not yet settle whether the equipment cards themselves need a second visual pass for full benchmark parity. The shell and form UX are materially better; the remaining question is the card family, not the data-entry surface.
- **What Is Blocked:** none
- **Next Exact Task:** Review the live dashboard equipment tab as a whole and decide whether to approve it with the upgraded form/shell, or run one bounded card-only pass before approval.
- **Do Not Start Yet:** Do not reopen reservations through the equipment tab, and do not start Level 1 cleanup on dashboard equipment until the tab is either approved or explicitly scoped for one last card-only pass.

- **Phase:** `dashboard.html` equipment-tab benchmark audit and first parity batch
- **What Changed:** Started the next `dashboard.html` redesign slice on the equipment tab, treating the approved embedded management surfaces in `projects.html` as the benchmark for shell ownership and UX rhythm while intentionally leaving the equipment card internals for a later pass. Rebuilt the equipment add form into the same benchmark-grade card family with a split `main + side` layout, keeping the core commercial fields together and moving supporting fields into a quieter side panel. Reframed package management into the same glass-card management shell, flattened the package item editor chrome onto shared content tokens, and promoted both the packages list and the main equipment catalog into records-card surfaces with heading/support copy, soft count badges, and scoped pagination placement. Replaced the old loose search/filter strip with one records toolbar using the shared `management-search-bar` rhythm, added an explicit reset action, and updated the equipment pagination rendering to the same modern `ui-button` language used by other approved embedded management surfaces. Also cleaned legacy equipment-only visual overrides by removing the old package button gradient and wrapper chrome from the source owner rules instead of stacking new overrides on top.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This is a shell-and-controls batch, not a full equipment card redesign. The main equipment cards still retain their older custom visual language, so a second batch may still be needed if a live visual review shows that the cards themselves now feel out of family against the upgraded shell.
- **What Is Blocked:** none
- **Next Exact Task:** Perform a live visual approval-oriented review on the upgraded dashboard equipment tab, then decide whether the remaining gap is small enough to approve the shell as-is or whether the card family needs one bounded second pass.
- **Do Not Start Yet:** Do not collapse the equipment cards into a table, do not reopen reservations through the back door while equipment remains the active slice, and do not start Level 2 shared extraction from the dashboard equipment shell until the final visual direction is confirmed.

- **Phase:** `dashboard.html` customers-tab benchmark audit and first parity batch
- **What Changed:** Started the dashboard-side redesign track with the embedded customers surface because it is the clearest repeated management module and the closest benchmark match to the now-approved `projects.html` customers tab. Rebuilt the `dashboard.html` customers tab shell to mirror the approved projects benchmark: the customer form now uses the same `customer-embedded-form-layout` with `main + side panel`, document upload and notes moved into the side card, the records area now uses the same records-card structure with heading, support text, live count badge, compact search/reset toolbar, shared `users-table-wrapper`, and scoped pagination block. In `src/styles/app.css`, widened the approved customer benchmark contract from `#customers-section` only to `:is(#customers-section, #customers-tab)` so both embedded customer surfaces now share the same form shell, records shell, dark-mode wrapper flattening, count badge, search control sizing, and table-shell cleanup instead of leaving dashboard on legacy `customer-table-wrapper` chrome. Added the missing dashboard translations for the records-card heading/count/support copy so `customers.js` can render the same runtime labels on both surfaces.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This pass modernizes the dashboard customers surface, but it does not yet run a full live screenshot capture on this branch because the old `manual-dark-smoke.mjs` helper is not present here. The visual contract is aligned by shared markup and shared owner CSS, but a later live browser pass on the dashboard customers tab is still useful before calling the whole dashboard surface approved.
- **What Is Blocked:** none
- **Next Exact Task:** Perform the next dashboard audit slice on the heavier reservations-oriented surfaces, using the now-aligned dashboard customers tab and locked `projects.html` as the benchmark for shell ownership, table parity, and embedded-management rhythm.
- **Do Not Start Yet:** Do not reopen `projects.html` customer styles for more polish, and do not start duplicate-surface consolidation between `projects` and `dashboard` until the dashboard reservations audit exposes which repeated patterns are truly stable enough for Level 2 extraction.

- **Phase:** `projects.html` page-level Level 1 cleanup completion and dashboard handoff
- **What Changed:** Closed `projects.html` Level 1 cleanup at the page level after one final no-drift slice in `src/scripts/projects/app.js`. Reduced the remaining page-owned repetition by extracting `renderProjectsPageContent()` for the common `renderSelections` + `renderProjects` + `updateSummary` + `renderFocusCards` cycle, `renderProjectsAndFocusCards()` for the auth-refresh path, and `activateDefaultProjectsListTabIfNeeded()` for the default-subtab fallback. Combined with the earlier local cleanup slices already recorded for the page-level shell, templates, customers, technicians, and reports surfaces, `projects.html` is now treated as approved with Level 1 cleanup complete. No selectors changed, no visual output changed, and no approved embedded surface was reopened.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This closes Level 1 only. It does not begin Level 2 shared extraction, cross-page deduplication with `dashboard.html`, or any business-logic rewiring across full-family pages.
- **What Is Blocked:** none
- **Next Exact Task:** Move the active redesign track to `dashboard.html` / reservations, using the now-locked `projects.html` page and its embedded approved surfaces as the benchmark for the next full-family audit.
- **Do Not Start Yet:** Do not reopen `projects.html` under the banner of cleanup unless a concrete regression appears, and do not start shared extraction of `projects`/`dashboard` contracts before the dashboard audit defines the repeated patterns explicitly.

- **Phase:** `projects.html` page-level approval lock and Level 1 cleanup
- **What Changed:** Formally carried `projects.html` forward as an approved page at the page level, not only as a collection of approved embedded tabs, and started the next no-drift Level 1 cleanup slice in `src/scripts/projects/app.js`. Extracted the repeated page-refresh sequence (`loadAllData`, `populateSelects`, `restoreProjectFormDraft`, `renderSelections`, `renderProjects`, `updateSummary`, `renderFocusCards`) into one local helper `refreshProjectsPageSurface()` and reused it in both the local-bypass initialization path and the authenticated initialization finalization path. This is pure page-owner cleanup: no selector changes, no data-contract changes, no tab behavior changes, and no visual reopening.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only advances page-level Level 1 cleanup. It does not attempt full-family extraction with `dashboard.html`, shared data bootstrapping consolidation, or any redesign changes inside already approved `projects` subtabs.
- **What Is Blocked:** none
- **Next Exact Task:** Keep `projects.html` locked as approved overall and continue only similarly small page-owned cleanup slices when requested, or move the active redesign track to `dashboard.html` / reservations.
- **Do Not Start Yet:** Do not reopen approved `projects` subtabs under the banner of cleanup, and do not begin duplicate-surface consolidation across `projects` and `dashboard` until the next phase is explicitly switched.

- **Phase:** `projects.html` final shell approval lock and page-level Level 1 cleanup
- **What Changed:** Closed the last obvious visual blocker on `projects.html` itself by refining the shared full-shell top bar in `src/styles/app.css` instead of patching `projects` locally. Reduced the dominance of the center greeting/toggle stack by shrinking the greeting width, calming the toggle width/height/label scale, tightening the dropdown panel width and padding, and reducing the metrics-card density inside the greeting panel. The goal of this pass was to make the shell read like a controlled application header instead of a heavy hero selector floating above the page. This is a shared-shell refinement, but it is also the final page-level visual lock needed to treat `projects.html` as approved as a whole because all major embedded surfaces inside the page were already individually approved.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This does not yet redesign `dashboard.html` even though the top-bar shell is shared. The pass was tuned against the `projects.html` screenshot evidence, so `dashboard.html` should be reviewed next as its own surface before calling the broader full-family shell permanently settled.
- **What Is Blocked:** none
- **Next Exact Task:** Treat `projects.html` as approved overall, keep all approved embedded surfaces locked, and when requested continue only with page-level Level 1 cleanup slices or move the active redesign track to `dashboard.html` / reservations.
- **Do Not Start Yet:** Do not reopen approved `projects` subtabs under the banner of shell polish, and do not widen this shared-shell pass into a general dashboard redesign until the next active phase is explicitly switched.

### 2026-05-02 | Codex
### 2026-05-02 | كودكس

- **Phase:** `projects.html` technicians approval lock and Level 1 cleanup
- **What Changed:** Treated the embedded `#technicians-section` inside `projects.html` as approved based on the completed redesign passes and the latest sign-off, then started Level 1 cleanup with a no-drift runtime slice in `src/scripts/technicians.js`. Extracted the repeated loading/error/empty table-state path into `renderTechniciansTableState()` so the technician records surface now uses one local owner for shared empty-row rendering plus count/pagination reset behavior, instead of duplicating the same table-body injection three times. This is cleanup only: no selector changes, no pagination contract changes, no data-flow changes, and no visual redesign reopening.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only begins Level 1 cleanup. It does not attempt larger technician-module extraction, business-logic refactoring, or cross-surface deduplication with the standalone technician pages or reservations flows. Any future cleanup should stay deletion-led and avoid reopening the approved embedded technicians UX unless a concrete regression appears.
- **What Is Blocked:** none
- **Next Exact Task:** Keep `#technicians-section` locked as approved and continue only with similarly small Level 1 cleanup slices when requested, or move the active redesign track to the next remaining non-approved surface.
- **Do Not Start Yet:** Do not reopen the embedded technicians UX under the banner of cleanup, do not force pagination changes for a single-page dataset, and do not deduplicate technician management across `projects`, `dashboard`, and standalone pages until there is a separate consolidation phase.

### 2026-05-02 | Codex
### 2026-05-02 | كودكس

- **Phase:** `projects.html` technicians section enrollment and redesign audit
- **What Changed:** Performed a live-data follow-up audit on the embedded technicians surface using the authenticated local API. Confirmed that the missing technicians pagination was not a bug: the current environment only returns 8 technicians while the embedded technicians page size is 10, so the pager is intentionally hidden by contract (`totalPages <= 1`). Landed one more bounded visual parity pass on `#technicians-section` without changing that contract: reduced the embedded technician status-badge weight, tightened its padding/letter spacing, and narrowed the embedded status column so the real-data rows read calmer and closer to the customer benchmark when only a single technicians page is present.
- **What Was Verified:** authenticated local API check against `/api/technicians/` with the current admin account; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** Pagination is currently correct for the live dataset, but the embedded technicians surface still needs a final browser acceptance pass once the row-density tweaks are reviewed visually on the real page. Approval should depend on that final visual read, not on pagination presence.
- **What Is Blocked:** none
- **Next Exact Task:** Run the final approval-oriented visual pass on the embedded technicians tab with real technician rows, focusing on status-badge calmness, row density, and whether the single-page state now feels benchmark-grade even without visible pagination.
- **Do Not Start Yet:** Do not force pagination to remain visible for a single-page dataset, and do not widen this pass into backend pagination or technician module architecture changes while the embedded shell review is still in progress.

- **Phase:** `projects.html` technicians section enrollment and redesign audit
- **What Changed:** Landed the second bounded redesign slice on the embedded technicians surface inside `projects.html`, keeping the standalone technician surfaces untouched. Reduced the remaining table-local drift by tightening the embedded `#technicians-section` table toward the embedded customer benchmark: switched technician row actions and position-row actions onto compact labels (`editCompact` / `deleteCompact`), added embedded-only technician action-button sizing so the action column stops reading heavier than customers, softened the embedded technician edit button to the same calmer visual family used on embedded customer rows, tightened the embedded technician action column width and action-button gap, and aligned the embedded technician name-link treatment to the embedded customer link rhythm. All of this was done through `#technicians-section`-scoped rules in `src/styles/app.css` plus compact runtime labels in `src/scripts/technicians.js`, so the approved standalone technician page is not reopened by this pass.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The embedded technicians surface is now closer to the customer benchmark, but it is still not formally approved. The remaining likely blocker is a final visual/browser acceptance pass on real technician data, especially around row density and whether the status column still pulls too much attention compared with the embedded customer records benchmark.
- **What Is Blocked:** none
- **Next Exact Task:** Continue the deep audit on `#technicians-section` with a final approval-oriented visual pass focused on row density, status badge weight, and whether any remaining embedded-only table chrome should be reduced further.
- **Do Not Start Yet:** Do not widen this pass into technician business-logic refactors, do not deduplicate technician management across `projects` and `dashboard` yet, and do not reopen the approved standalone `technician.html` surface while the embedded technicians shell is still being converged.

### 2026-05-02 | Codex
### 2026-05-02 | كودكس

- **Phase:** `projects.html` technicians section enrollment and redesign audit
- **What Changed:** Started the first bounded redesign batch on the embedded technicians/crew surface inside `projects.html`, using the approved embedded customer tab as the direct benchmark owner. Rebuilt the technician management form from a loose single-grid block into a structured embedded form surface with `technician-embedded-form-layout`, a dedicated main grid for core fields, and a side panel for notes so the surface now follows the same host-workspace rhythm as customers instead of reading like a transplanted older dashboard form. Rebuilt the technician records area into a dedicated `technician-records-card` with heading, support copy, live count badge, compact search/filter/reset toolbar, shared `users-table-wrapper`, and scoped pagination anchor. Updated `src/scripts/technicians.js` so the embedded technician experience now exposes the same UX contracts as the customer benchmark: live count text, reset-button enable/disable state, shared empty/loading/error table rows, and the current `ui-button` pagination language instead of the older bootstrap-only pager output. Added matching `projects.technicians.records.*` copy in `src/scripts/translations/projects.js` and locked the new technician-section shell contract in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This first batch fixes hierarchy and shared surface ownership, but it does not yet complete the technician tab approval. The embedded technician table still carries more technician-local density and action styling than the embedded customer benchmark, and the next pass should review row action weight, count/filter balance, and any remaining wrapper ownership drift against the approved standalone `technician.html`.
- **What Is Blocked:** none
- **Next Exact Task:** Continue the deep audit on `#technicians-section` with focus on table shell parity, action density, and whether the technician table can reduce more local chrome while keeping role/status-specific columns readable.
- **Do Not Start Yet:** Do not reopen `#customers-section`, do not deduplicate customer/technician management surfaces yet, and do not widen this batch into technician business-logic refactors while the current audit is still converging on the shell and records UX.

- **Phase:** `projects-reports-tab` approval lock and Level 1 cleanup
- **What Changed:** Rechecked the documented status of `projects-reports-tab` before opening the embedded technicians audit. Confirmed that project reports already had a historical implemented-and-verified redesign pass in this file, then formally accepted the tab as approved based on the completed reports UX alignment work plus the latest user sign-off. Started the mandatory Level 1 cleanup with a strictly no-drift slice in `src/scripts/projectsReports.js`: extracted the repeated report-filter DOM recache path into `cacheReportFilterDomRefs()` and extracted the repeated wrapper direction-sync logic into `syncProjectsReportsWrapperDirection()`. This removes duplicate local contract code without changing report filters, rendering, pagination, charts, print/export behavior, or the approved surface structure. Kept the active redesign track on the embedded technicians tab inside `projects.html`.
- **What Was Verified:** source audit of `docs/UI_REDESIGN_MASTER_PLAN.md`; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This starts Level 1 cleanup for project reports but does not attempt broader extraction from `src/styles/reports.css` or deeper report-module deduplication. Any further cleanup should stay deletion-led and must not reopen the approved reports UX unless a concrete regression appears.
- **What Is Blocked:** none
- **Next Exact Task:** Keep `projects-reports-tab` locked as approved and continue with the deep audit on `#technicians-section` in `projects.html`, using the approved standalone `technician.html` and the embedded management surfaces as the benchmark owners.
- **Do Not Start Yet:** Do not reopen project reports for new UX changes under the banner of cleanup, and do not widen this pass into reports architecture extraction unless a new explicit request targets reports specifically.

- **Phase:** `projects.html` customer approval lock, Level 1 cleanup start, and technicians handoff
- **What Changed:** Audited the current documentation state before changing the active track. Confirmed that `projects-reports-tab` does have a historical implementation and verification entry (`2026-04-21`), but the master plan does **not** currently record it as formally approved or Level 1 cleanup complete; the later summary guidance still treats reporting as deferred for the current `projects.html` pass. Based on the latest user approval, treated the embedded `#customers-section` inside `projects.html` as approved and moved it into Level 1 cleanup. Started that cleanup with a strictly no-drift slice in `src/styles/app.css`: removed dead and duplicated `#customers-section .customer-table-wrapper*` selector branches that no longer match the live `projects.html` customer markup after the final table-shell alignment, while preserving the approved rendered output through the still-live `#customers-section .users-table-wrapper` owner. Switched the active redesign phase from embedded customers to embedded technicians.
- **What Was Verified:** source audit of `docs/UI_REDESIGN_MASTER_PLAN.md`; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** `projects-reports-tab` may be visually accepted in practice by another contributor, but the master plan is not yet updated to reflect formal approval or Level 1 cleanup, so the official documented status remains “implemented historically, deferred in the current sequence, not locked.” The embedded technicians surface inside `projects.html` is still open and needs its own redesign audit before any deduplication decision is made.
- **What Is Blocked:** none
- **Next Exact Task:** Start the deep audit on `#technicians-section` in `projects.html`, compare it against the approved standalone `technician.html` plus the embedded-management benchmark surfaces, and decide the first bounded redesign batch for the crew tab.
- **Do Not Start Yet:** Do not deduplicate or remove repeated customer/technician management tabs yet, do not reopen `#customers-section` for visual redesign beyond Level 1 cleanup, and do not treat `projects-reports-tab` as formally locked until its approval/cleanup state is explicitly recorded in this file.

### 2026-04-30 | Codex
### 2026-04-30 | كودكس

- **Phase:** `projects.html` customers section enrollment and redesign audit
- **What Changed:** Landed the second bounded redesign slice on the embedded customer surface inside `projects.html`. Tightened the records interaction layer so the search area now behaves like a managed workspace instead of a passive filter: added a dedicated reset action to the customer records toolbar, made the live count badge reflect filtered state (`{count} من {total}` / `{count} of {total}`), and aligned the loading, empty, and error table rows with the shared `projects-table-empty-row` contract instead of raw unstyled cells. This keeps the shared `src/scripts/customers.js` runtime intact while making the embedded customer tab read more like an approved management surface.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The embedded customer surface is cleaner now, but final approval still depends on visual acceptance of the action density and responsive behavior in a real browser. Structurally the tab is in much better shape; the remaining question is polish, not ownership or shell integrity.
- **What Is Blocked:** none
- **Next Exact Task:** Perform the approval-readiness review for the embedded customer tab itself and decide whether it is ready to lock or still needs one final visual polish batch before sign-off.
- **Do Not Start Yet:** Do not broaden this into technician redesign or shared customer business-logic refactors until the embedded customer tab gets its own approval decision.

### 2026-04-30 | Codex
### 2026-04-30 | كودكس

- **Phase:** `projects.html` customers section enrollment and redesign audit
- **What Changed:** Landed the first bounded redesign slice for the embedded customer surface inside `projects.html`. Rebuilt the loose records area into a dedicated `customer-records-card` with a titled header, live count badge, centered search toolbar, shared table shell primitives, and scoped pagination surface. Then tightened the embedded customer form ownership with a page-local `customer-embedded-form-card` override so the form no longer inherits the standalone customer page’s narrow centering contract: the grid now stretches to the host card, the notes area aligns to the same workspace rhythm, the upload row sits inline with the rest of the form, and the action buttons align to the embedded management flow instead of floating in a generic centered module. Also corrected stale source audits that were still asserting older Templates preview markers after the approved Templates redesign.
- **What Was Verified:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The embedded customer runtime still comes from the shared `src/scripts/customers.js` module, so future redesign passes must keep IDs and render hooks stable. Visual approval is also not complete yet: the current slice corrects shell structure and embedded-form alignment, but the surface still needs a final approval-readiness audit for action density, responsive form rhythm, and whether the customer/technician tabs should share any additional embedded-management primitives.
- **What Is Blocked:** none
- **Next Exact Task:** Run the next approval-oriented audit on the embedded customer surface, focusing on form/action rhythm and records-table interaction density, then decide whether the customer tab is ready for final polish or needs one more bounded redesign batch before sign-off.
- **Do Not Start Yet:** Do not refactor shared customer business logic, do not duplicate standalone `customer.html` structures into `projects.html`, and do not widen the scope to technicians until the embedded customer tab has its own approval-readiness decision.

### 2026-04-30 | Codex
### 2026-04-30 | كودكس

- **Phase:** `projects.html` customers section enrollment and redesign audit
- **What Changed:** Switched the active redesign pipeline away from Templates after locking that surface as approved and starting its Level 1 cleanup. Enrolled the embedded customer management section inside `projects.html` as the next active redesign target. Audited the current surface and confirmed that `#customers-section` is a full embedded management area rather than a lightweight subpanel: it contains its own management header, customer form shell, search control, responsive customer table, pagination anchor, and file-preview path. The runtime bridge currently enters through `src/scripts/projects.js`, where the customer tab lazy-loads the shared customer module via `ensureCustomersTabModule()` and then runs the embedded customer experience from `src/scripts/customers.js`. That means the redesign must treat this as an embedded host surface with shared customer business logic, not as an isolated page-local clone.
- **What Was Verified:** static audit of `src/pages/projects.html`, `src/scripts/projects.js`, and the customer-related create-flow helpers in `src/scripts/projects/{data.js,form.js,view.js}`; active-phase update in this master plan.
- **What Is Still Risky:** The embedded customer section shares behavior with the standalone customer module, so redesign work must avoid breaking the lazy-load bridge or assuming that the approved standalone `customer.html` layout can simply be copied into `projects.html` without checking ownership and spacing differences first.
- **What Is Blocked:** none
- **Next Exact Task:** Run a deep visual and ownership audit on `#customers-section` in `projects.html`, compare it against the approved standalone customer page plus the approved embedded table/form benchmark surfaces, then define the first bounded redesign batch for the embedded customer header, form rhythm, and table/search block.
- **Do Not Start Yet:** Do not reopen Templates beyond its bounded cleanup path, do not mutate shared customer business logic yet, and do not assume the standalone `customer.html` approval means the embedded `projects.html` customer surface is already approved.

### 2026-04-30 | Codex
### 2026-04-30 | كودكس

- **Phase:** `projects.html` templates tab Level 1 contract cleanup
- **What Changed:** Continued the Templates Level 1 pass with a type-only cleanup inside `src/scripts/projects/templatesTab/preview.ts`. The file repeated the same inline option-shape contracts for `applyTemplateAutofill` and `ensureCellToolbar` in more than one interface block. Replaced those repeated inline shapes with local aliases, `TemplateAutofillApplyOptions` and `EnsureCellToolbarOptions`, so the preview contract is easier to maintain without changing any runtime sequence, DOM output, or behavior. This is strictly a code-clarity cleanup slice, not a render-path change.
- **What Was Verified:** `npx vitest run tests/projects/templatesTab/zoom.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/pdf-runtime.test.js`.
- **What Is Still Risky:** none added by this slice. It is type-only and local to the Templates preview contract.
- **What Is Blocked:** none
- **Next Exact Task:** Stop unless another equally bounded no-drift cleanup target is found; do not widen the pass beyond duplicate/dead/local contract cleanup.
- **Do Not Start Yet:** Do not refactor the wider templates workspace/types graph under the banner of cleanup, and do not reopen UX or print behavior from this pass.

### 2026-04-30 | Codex
### 2026-04-30 | كودكس

- **Phase:** `projects.html` templates tab Level 1 cleanup follow-up
- **What Changed:** Continued the Templates Level 1 cleanup with another no-drift reduction inside `src/scripts/projects/templatesTab/preview.ts`. The render path had the same inline “remove non-meaningful A4 pages” loop twice during preview generation. Replaced those duplicated loops with a single local helper, `pruneMeaninglessA4Pages()`, and kept the two call sites intact so the runtime sequence and rendered result remain unchanged. This is still cleanup only: no selector, shell, pagination, zoom, PDF, or autofill contract changed.
- **What Was Verified:** `npx vitest run tests/projects/templatesTab/zoom.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/pdf-runtime.test.js`.
- **What Is Still Risky:** This keeps the cleanup bounded to local duplicate-removal inside the preview pipeline. Broader deduplication around call-sheet sizing or crew-table normalization would need a separate audit because those repeated calls may still be order-sensitive.
- **What Is Blocked:** none
- **Next Exact Task:** Stop unless another clearly provable no-drift duplicate or dead contract is found inside `projects-templates-tab`; otherwise treat Templates as approved and closed for now.
- **Do Not Start Yet:** Do not reopen template UX, do not flatten order-sensitive call-sheet render steps under the banner of cleanup, and do not broaden this into another templates architecture refactor.

### 2026-04-30 | Codex
### 2026-04-30 | كودكس

- **Phase:** `projects.html` templates tab approval lock and Level 1 cleanup
- **What Changed:** Treated `projects-templates-tab` as approved at the current rendered state after the recent runtime, autofill, preview, palette, PDF-parity, and call-sheet passes. Started the mandatory Level 1 cleanup with the smallest safe slice instead of reopening UX work: removed a duplicated `ensureEditableWrappers(pageRoot)` call from `src/scripts/projects/templatesTab/preview.ts`. The preview pipeline was normalizing expense editable wrappers twice in a row with the same inputs, so the second call was redundant work rather than a real contract. No selectors, DOM IDs, translation hooks, preview shell behavior, zoom behavior, print sizing, or autofill logic were changed by this cleanup slice.
- **What Was Verified:** `npx vitest run tests/projects/templatesTab/zoom.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/pdf-runtime.test.js`; `npm run build:assets`.
- **What Is Still Risky:** This only starts Level 1 cleanup; it does not attempt broad extraction or shared refactors. The templates surface should now be treated as approved and stable, but any further cleanup must stay deletion-led and avoid reopening the approved UX unless a concrete regression appears.
- **What Is Blocked:** none
- **Next Exact Task:** Continue Level 1 cleanup on `projects-templates-tab` only through low-risk dead/duplicate contract removal if another provable no-drift candidate is found; otherwise stop and move to the next requested surface.
- **Do Not Start Yet:** Do not reopen template UX redesign, do not restart structural `templatesTab` refactors, and do not broaden this cleanup into global extraction or new print/layout changes without a separate request.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

### 2026-04-29 | Codex
### 2026-04-29 | كودكس

- **Phase:** Project templates deterministic autofill and guarded manual-edit rollout
- **What Changed:** Started the new template-data phase by implementing a deterministic autofill layer for `expenses` and `callsheet` previews. Added stable field hooks to the builders in `src/scripts/templates/build/expenses.js` and `src/scripts/templates/build/callsheet.js`, then wired the runtime to use `src/scripts/projects/templatesTab/autofill.ts` as the single mapping/apply layer between the selected project plus linked reservation and the rendered template DOM. The preview pipeline now injects autofill immediately after the builder shell is created, so the generated template is seeded from structured data rather than manual scatter or AI inference. In the same pass, extended the host interaction layer to support guarded first edits on autofilled fields: `src/scripts/projects/templatesTab/controller.ts` and `src/scripts/projects/templatesTab/init.ts` now expose focus/input callbacks, and `src/scripts/projects/templatesTab.js` routes them through `src/scripts/projects/templatesTab/edit-guard.ts` so the first manual override on auto-filled cells requires explicit confirmation before the field becomes user-edited. Runtime-owned state now tracks `manualEditConfirmed` and `hasManualEdits` in `src/scripts/projects/templatesTab/state.ts`.
- **What Was Verified:** `npx vitest run tests/projects/templatesTab/autofill.test.js tests/projects/templatesTab/edit-guard.test.js tests/projects/templatesTab/state.test.js`; `npx vitest run tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/pdf-runtime.test.js tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/saved-templates.test.js`; `npm run build:assets`.
- **What Is Still Risky:** The deterministic autofill/runtime contract is now in place and passing focused coverage, but the live authenticated acceptance check against the real Arabic Adidas project (`PRJ-0074`) and reservation `218` still needs an end-to-end browser review to confirm that the hydrated project/reservation state exposed by the app matches the rich data shape already validated in DB/source audits.
- **What Is Blocked:** none
- **Next Exact Task:** Run an authenticated live pass on `projects.html` using the real Adidas project and reservation `218`, confirm the preview fills the expected expense rows and callsheet crew/header fields, then decide whether the next slice should be refresh-from-source controls or selective overwrite rules for already-manually-edited fields.
- **Do Not Start Yet:** Do not reintroduce AI into this structured autofill path, do not broaden the phase into shot-list generation, and do not move print-fidelity redesign into this rollout unless a deterministic autofill bug forces it.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates fixture-backed saved-flow acceptance
- **What Changed:** Closed the main acceptance blocker for the template-tab UX pass by introducing a fixture-local `project-templates` API layer for `fixture=dashboard`. Added `src/scripts/projects/templatesTab/fixture-api.ts`, which stores template snapshots in local storage and emulates the `GET / POST / PATCH / DELETE` behavior needed by the template toolbar without touching the real backend. Wired `src/scripts/projects/templatesTab.js` to use this local API wrapper only for the templates surface, so the fixture route can now create real saved versions, rename them, delete them, reload them, and participate in `load last draft` flows. Added direct coverage in `tests/projects/templatesTab/fixture-api.test.js`. After that, ran live runtime acceptance probes against `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard` and exercised the main user journey with real saved-state data. The resulting toolbar state was coherent: after `save -> save copy -> rename -> delete`, the remaining primary snapshot stayed selected correctly, and after `save -> new blank -> load last draft`, the previously saved snapshot was reselected with the saved-list helper in `selected` mode.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/fixture-api.test.js tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; two direct runtime CDP acceptance probes on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, covering `save -> save copy -> rename -> delete` and `save -> new blank -> load last draft`.
- **What Is Still Risky:** The core UX contract now holds under real saved-state fixture data. The only remaining uncertainty is purely visual: whether the saved-version trigger needs one final cosmetic lightening in live design review once compared side by side with approved benchmark surfaces.
- **What Is Blocked:** none
- **Next Exact Task:** Treat `projects-templates-tab` as functionally complete for this UX phase unless a final visual review explicitly requests one last cosmetic polish on the saved-version trigger. If no such request appears, move the redesign track forward instead of reopening this surface.
- **Do Not Start Yet:** Do not reopen reports, do not restart `templatesTab` extraction, and do not broaden the fixture API pattern beyond this surface unless another page requires the same kind of local saved-state acceptance workflow.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates dynamic saved-list guidance
- **What Changed:** Continued the same UX clarification pass and applied it to the saved-version field so that both sides of the snapshot flow now explain themselves consistently. Added a `#templates-saved-meta` hook in `src/pages/projects.html`, then updated `src/scripts/projects/templatesTab.js` so the helper text under the saved-version control is no longer static. The field now derives a live state from the current saved-template surface: no project selected, list loading, no saved versions yet, saved versions ready, or a concrete saved version selected. That presentation logic now lives in `src/scripts/projects/templatesTab/ui-state.ts`, and `src/styles/app.css` colors the helper row by state through `data-templates-saved-mode` on the field wrapper. Added the matching translation keys in `src/scripts/translations/projects.js` and direct state coverage in `tests/projects/templatesTab/ui-state.test.js`. This keeps the snapshot-name field and the saved-version field on the same UX language instead of one being dynamic and the other remaining generic.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; two direct runtime smoke probes on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming the saved-version helper now explains the `empty` state clearly in dark mobile both before and after selecting a fixture project that still has no saved versions.
- **What Is Still Risky:** The helper messaging is now coherent on both fields, so the remaining uncertainty is mostly a real-data acceptance question: whether the saved-version trigger itself still feels too visually heavy once there are actual saved options in the list, rather than only the empty-state branch exercised by the fixture route.
- **What Is Blocked:** none
- **Next Exact Task:** Run the longer real-flow UX audit on `save / save copy / load / rename / import / load last draft` inside `projects-templates-tab` against a state that actually contains saved versions, then decide whether any remaining work is purely cosmetic around the saved-version trigger.
- **Do Not Start Yet:** Do not reopen reports, do not restart `templatesTab` structural extraction, and do not globalize these field-helper patterns unless another approved page demonstrates the same need.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates dynamic snapshot-name guidance
- **What Changed:** Continued the template-tab UX pass with a small but high-signal clarification to the snapshot-name field itself. Added a dedicated `#templates-save-title-meta` hook in `src/pages/projects.html`, then updated `src/scripts/projects/templatesTab.js` so the helper text below the field is no longer static. The field now derives a live mode from the current context: no project yet, automatic context-based name, selected saved version, or custom manual name. Based on that mode, the toolbar writes a different helper message and marks the field wrapper with `data-templates-save-mode`, which lets `src/styles/app.css` color the helper text differently without introducing a new global primitive. The pure presentation logic now lives in `src/scripts/projects/templatesTab/ui-state.ts`, with direct coverage in `tests/projects/templatesTab/ui-state.test.js`, so this UX hint can evolve without burying more conditionals inside the large template entrypoint.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; direct runtime smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming that after selecting a fixture project the snapshot-name helper now reads the automatic-name guidance state in dark mobile.
- **What Is Still Risky:** The snapshot-name field now explains itself more clearly, so the remaining acceptance question is mostly about the saved-version control and overall polish rather than the naming field. A real data pass is still needed to judge whether the helper and saved-selector together are now sufficient without one more visual tweak.
- **What Is Blocked:** none
- **Next Exact Task:** Run the longer real-flow UX audit on `save / save copy / load / rename / import / load last draft` inside `projects-templates-tab`, then decide whether the remaining work is purely cosmetic around the saved-version control or whether one final small polish pass is justified.
- **Do Not Start Yet:** Do not reopen reports, do not restart `templatesTab` structural extraction, and do not turn this into a shared global field-helper system unless another approved page shows the same need.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates draft/import selection alignment
- **What Changed:** Continued the active template UX pass by closing two remaining snapshot-flow inconsistencies instead of broadening the redesign. Updated `src/scripts/projects/templatesTab.js` so `تحميل آخر مسودة` now remembers the loaded snapshot id and re-selects the matching saved-version option when it exists, which keeps the visible saved-template selector aligned with the loaded preview and the snapshot-name field. The same pass also updated the import path so `src/scripts/projects/templatesTab/saved-templates.ts` now returns the resolved imported title instead of a bare boolean, letting the template tab re-select the imported snapshot after the list refreshes and immediately sync the name field around that new selection. This keeps `save`, `save copy`, `draft load`, and `import` on the same UX contract instead of each path leaving the toolbar in a slightly different state.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; direct runtime smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming that the template surface still renders cleanly in dark mobile after the draft/import synchronization updates.
- **What Is Still Risky:** The snapshot flows are now more internally consistent, but the remaining question is acceptance-level rather than structural: whether the saved-version chrome itself still needs lighter visual emphasis or helper treatment during a full real-data `save -> save copy -> load -> rename` pass.
- **What Is Blocked:** none
- **Next Exact Task:** Run the longer real-flow UX audit on `save / save copy / load / rename / import / load last draft` inside `projects-templates-tab`, then decide whether the remaining work is only cosmetic around the saved-version control or whether one final interaction polish pass is justified.
- **Do Not Start Yet:** Do not reopen reports, do not restart `templatesTab` structural extraction, and do not expand this into a global saved-select redesign without a repeated cross-page need.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates save-title synchronization and saved-selection flow
- **What Changed:** Continued the template-tab UX pass by tightening the save/load naming flow instead of reopening structure. Updated `src/scripts/projects/templatesTab.js` so the snapshot-name input now tracks an internal auto-value separately from real user input: when the field is still untouched it follows the active project/type/reservation context or the selected saved version, but once the user types a custom name it stops being overwritten by later repaints. The same pass also added a small saved-option helper so that after a successful save or save-copy the refreshed saved-templates list can reselect the matching title and keep the snapshot-name field visually aligned with the currently active saved version. To support that flow cleanly, `src/scripts/projects/templatesTab/lifecycle.ts` now lets the primary save actions hand the resolved saved title into a post-save hook after the saved list refreshes, without reopening the larger template runtime architecture.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; direct runtime smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming the template surface still renders in dark mobile and that the saved-template trigger remains in the expected empty-state contract after the save-title synchronization change.
- **What Is Still Risky:** The naming flow is now more coherent, but a full runtime acceptance pass is still needed on the longer `save -> save copy -> load -> rename` journey, especially to judge whether auto-selecting the refreshed saved title is sufficient or whether the selected-snapshot chrome still needs lighter inline emphasis on dark mobile.
- **What Is Blocked:** none
- **Next Exact Task:** Run a longer fixture-backed and live-data UX pass on `save / save copy / load / rename` inside `projects-templates-tab`, then decide whether the remaining work is only cosmetic around the saved-version control or whether one more small interaction polish pass is still justified.
- **Do Not Start Yet:** Do not reopen reports, do not restart structural `templatesTab` extraction, and do not broaden this into a shared enhanced-select refactor without a cross-page requirement.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates saved-control clarity and naming flow
- **What Changed:** Continued the active template UX pass with a narrow focus on the two remaining friction points: the saved-version field and the save/save-copy naming flow. Added inline helper copy under the snapshot-name and saved-versions fields in `src/pages/projects.html`, then tuned `src/styles/app.css` so the saved-version control reads differently when it is in `choose-project`, `loading`, or `empty` state instead of looking like a normal active select. Extended `src/scripts/projects/templatesTab/ui-state.ts` so the hidden native select now also marks the enhanced-select wrapper with a `data-templates-saved-state` contract, which lets the visible trigger reflect empty/loading states without changing the shared enhanced-select primitive globally. Also updated `src/scripts/projects/templatesTab/workspace.ts` and `src/scripts/projects/templatesTab.js` so save-copy no longer falls back to the same ambiguous default title as plain save when the user leaves the name field empty. The template surface now generates a clearer context-based default name using project title, template type, reservation id when available, and a translated copy suffix. Added the supporting translation keys for helper copy and short naming labels in `src/scripts/translations/projects.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; direct runtime smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming the saved-version trigger now presents the empty state text through the enhanced-select layer and the new helper copy is visible below both fields.
- **What Is Still Risky:** The saved-version field is clearer now, but the real acceptance question is still whether the enhanced-select chrome is visually quiet enough when disabled on dark mobile. This is no longer a behavior gap; it is a final readability judgment.
- **What Is Blocked:** none
- **Next Exact Task:** Continue the live template UX review with a visual decision on whether the saved-version field needs one more density/readability pass in dark mobile, or whether the current helper-copy plus state styling is sufficient and the next effort should shift to the save/save-copy naming and restore flow in longer-form usage.
- **Do Not Start Yet:** Do not reopen reports, do not re-enter runtime architecture cleanup, and do not broaden this into a global enhanced-select redesign without a cross-page need.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates runtime feedback and saved-state UX
- **What Changed:** Continued the active `projects-templates-tab` UX pass below the shell level and focused on user feedback during real workflow steps. Added a dedicated live status rail in `src/pages/projects.html` and styled it in `src/styles/app.css` so the template surface now communicates loading/saving/import/delete/export state instead of leaving the user with silent control changes. Introduced a small runtime UI-state helper in `src/scripts/projects/templatesTab/ui-state.ts` to keep status text, busy buttons, and saved-template control disabling consistent. Updated `src/scripts/projects/templatesTab/workspace.ts` so saved-template population now explicitly handles the “choose project”, “loading saved versions”, and “no saved versions yet” states, and so snapshot loading/saving now updates the live status rail. Upgraded `src/scripts/projects/templatesTab/preview.ts` so the preview falls back to the same structured empty-state contract used by the approved benchmark pages instead of reverting to a flat text node. Also updated `src/scripts/projects/templatesTab/saved-templates.ts` so rename/delete/export/import return a concrete success result, which keeps runtime status messages honest when an action is cancelled or fails. Finally, wired the template-tab entrypoint in `src/scripts/projects/templatesTab.js` to keep the saved-template controls, action states, and status rail synchronized after save/load/import/delete flows.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/projects/templatesTab/ui-state.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/saved-templates.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js`; direct runtime probe and screenshot smoke against `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming the live status rail text updates for the “no saved versions” state and the structured preview empty state appears when the project selection is cleared.
- **What Is Still Risky:** The runtime UX now explains more of its state, but the saved-template select is still visually wrapped by the enhanced-select layer, so additional visual tuning of how empty/disabled select states read inside that control may still be useful. The inner A4 preview content and PDF-fidelity internals remain intentionally outside this pass.
- **What Is Blocked:** none
- **Next Exact Task:** Continue the live UX review inside `projects-templates-tab` with emphasis on the enhanced-select presentation for saved versions, the save/save-copy naming flow, and whether the new status rail should be complemented by lighter inline helper copy around the saved-template field itself.
- **Do Not Start Yet:** Do not reopen reports, do not restart structural `templatesTab` refactors, and do not move into A4 print-fidelity cleanup while the current pass is still validating runtime feedback and control clarity.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates mobile visibility correction
- **What Changed:** Continued the live `projects-templates-tab` visual review on the local Vite dev route and found a real mobile UX issue: horizontal tab rails on the `projects` surface could leave the active tab visually off-center, which made the page read as clipped or partially hidden even when the correct tab was active. Fixed this in `src/scripts/projects/tabs.js` by adding the same `scrollIntoView({ inline: 'center' })` active-tab behavior already used elsewhere in the app, and by dispatching `tabScroll:update` after the scroll so the surrounding tab-scroller chrome stays in sync. This now applies both to the main `projects` content tabs and the nested project subtabs, including `projects-templates-tab`.
- **What Was Verified:** `npm run build:assets`; direct runtime visual review and selector inspection against `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard` in desktop dark, desktop light, and mobile dark states. The mobile follow-up capture confirmed that the active `القوالب` subtab now centers into view instead of staying pushed to the edge of the horizontal track.
- **What Is Still Risky:** The templates shell now reads more clearly on mobile, but the upper `projects`-family tab rails still depend on horizontal scrolling and dense labels. They are no longer misleading about the active tab, but they are still dense by nature on very narrow widths.
- **What Is Blocked:** none
- **Next Exact Task:** Keep the current templates pass at the UI acceptance level only: review whether the remaining mobile tab density needs content-level shortening or whether the centered active-tab behavior is sufficient for signoff.
- **Do Not Start Yet:** Do not reopen structural templates modules, and do not broaden this into a full redesign of the shared mobile tab system without a separate cross-page request.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates runtime UX polish
- **What Changed:** Continued the `projects-templates-tab` pass with runtime inspection on the local Vite dev route instead of relying only on static source audits. The runtime probe confirmed the main preview tools do mount from the shared utility rail, but the rail still read as a raw cluster of symbols with no visible framing or explanation. Updated `src/pages/projects.html` to wrap the dynamic preview utilities in a dedicated `templates-preview-utilities-shell` with a small title and helper copy, kept that shell hidden by default, and updated `src/styles/app.css` so the shell owns the visual surface while the inner `#templates-toolbar-utilities` remains the injection target. Added the small reveal hook in `src/scripts/projects/templatesTab/zoom.ts` and `src/scripts/projects/templatesTab/pdf.ts` so the utilities shell becomes visible only when real controls are mounted. Added the supporting translation keys in `src/scripts/translations/projects.js` and extended the source audits in `tests/theme/fullShellContractAudit.test.js` and `tests/theme/modalFormsAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/projects/templatesTab/zoom.test.js tests/projects/templatesTab/pdf.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/pdf-runtime.test.js`; direct runtime probe via Chrome CDP against `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard`, confirming the visible quick-action row plus the revealed utility shell text `أدوات المعاينة` and mounted zoom controls inside `#templates-toolbar-utilities`.
- **What Is Still Risky:** This confirms shell-level runtime behavior, but it is still not a final visual approval. Headless screenshot artifacts remain unreliable in this environment, so the next acceptance step should use a cleaner manual/browser-backed dark/light review of the actual rendered page. The A4 print internals also remain intentionally outside this pass.
- **What Is Blocked:** none
- **Next Exact Task:** Continue the runtime visual review on the live `projects-templates-tab` in dark and light mode, focusing on control density, button wrapping, overflow-menu readability, and the interaction between the preview utility shell and the first live document render.
- **Do Not Start Yet:** Do not reopen reports, do not re-enter a structural templates refactor, and do not broaden this pass into A4 export/palette cleanup before the page-shell UX is visually accepted.

### 2026-04-28 | Codex
### 2026-04-28 | كودكس

- **Phase:** Project templates UX hierarchy and token alignment
- **What Changed:** Ran a deep source-level design audit for `projects-templates-tab` against the approved `home.html`, `dashboard.html`, and locked `projects-list-tab` surface rhythm. The audit showed that the template shell still hid the main workflow actions inside the overflow menu, kept preview tools visually detached from the preview surface, and started the live-preview state with a flat empty placeholder that did not match the approved shared empty-state contract. Updated `src/pages/projects.html` so the primary workflow actions are now visible in the main toolbar, moved the preview utilities mount (`#templates-toolbar-utilities`) into the preview header, upgraded the initial empty state to the full shared icon/title/body pattern, and kept the existing IDs/selectors stable for the runtime modules. Updated `src/styles/app.css` with a tighter local token namespace for the template shell (`--templates-inline-*`), a shared-looking primary action rail, and preview-side utility framing based on the existing back-office semantic tokens instead of ad hoc local chrome. Added the small supporting copy keys in `src/scripts/translations/projects.js` and extended the source audits in `tests/theme/fullShellContractAudit.test.js` and `tests/theme/modalFormsAudit.test.js` so the new hierarchy remains locked.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/modalFormsAudit.test.js tests/projects/templatesTab/init.test.js tests/projects/templatesTab/lifecycle.test.js tests/projects/templatesTab/workspace.test.js tests/projects/templatesTab/preview.test.js tests/projects/templatesTab/pdf-runtime.test.js`; attempted fixture-backed `scripts/manual-dark-smoke.mjs` capture in dark/light mode on `projects.html?bypassAuth=1&fixture=dashboard` and confirmed the target selectors/hierarchy rendered in the hydrated DOM, but the headless screenshot artifact itself remained blank and should not be treated as a final visual approval image.
- **What Is Still Risky:** This pass deliberately stayed at the page-shell and UX hierarchy layer. The preview document internals in `src/styles/templatesA4.css` still contain print-driven hardcoded colors and dense table logic, and the live runtime still depends on injected zoom/PDF tooling that deserves a cleaner fixture-backed visual pass in both dark and light modes.
- **What Is Blocked:** none
- **Next Exact Task:** Run the next fixture-backed visual/runtime review of `projects-templates-tab` in dark and light mode, specifically checking the visible primary-action row, overflow action menu, preview utility rail, zoom controls, PDF tuner, and the first-render empty state against approved pages.
- **Do Not Start Yet:** Do not reopen reports, do not widen this into another structural refactor of `templatesTab.js`, and do not push the A4 print palette into shared global tokens before a dedicated PDF fidelity validation pass.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list table rhythm refinement
- **What Changed:** completed a table-rhythm pass on `projects-list-tab` without changing the shared table contract itself. In `src/styles/core.css`, tightened the projects table header rhythm, increased vertical row padding, strengthened the project title line, added a little more separation inside the project cell, and normalized the actions spacing with a minimum button width so the actions column reads more intentionally instead of looking cramped.
- **What Was Verified:** `npm run build:assets`; visual/runtime check via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/projects-list-table-rhythm-refined.png --eval 'window.scrollTo({ top: document.querySelector(\".projects-table\")?.getBoundingClientRect().top + window.scrollY - 120, behavior: \"instant\" }); true' --inspect-selector '.projects-table' --inspect-selector '.projects-table .users-table'`
- **What Is Still Risky:** this improves readability and pacing, but `projects-list-tab` still needs final approval-level review across the whole populated state.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `projects-list-tab` with the next approval-level visual note, or lock the subtab if the remaining surface is accepted.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` remains the active review surface.

- **Phase:** `projects.html` projects-list even filter widths
- **What Changed:** completed the final pass on the `projects-list-tab` filter-width issue after auditing the rendered controls directly. The root cause was that each enhanced-select wrapper had an even width, but the inner trigger button was still shrinking to its text content. In `src/styles/core.css`, forced the trigger inside the projects filters surface to fill the full wrapper width, keeping the current spacing and the three-row layout unchanged.
- **What Was Verified:** `npm run build:assets`; live CDP inspection confirmed each projects-list dropdown now resolves to `wrapperWidth: 216` and `triggerWidth: 216` for all five filters. Visual audit: `test-results/projects-list-filters-even-width-final.png`.
- **What Is Still Risky:** this closes the filter-width inconsistency itself. Any further review note on `projects-list-tab` should now be treated as a separate visual issue, not a continuation of the same filter-width bug.
- **What Is Blocked:** none
- **Next Exact Task:** move on to the next concrete `projects-list-tab` visual note, likely table rhythm or approval review.
- **Do Not Start Yet:** do not reopen the same filter-width thread unless a new concrete mismatch is found.

- **Phase:** `projects.html` projects-list filter text-fit refinement
- **What Changed:** fixed the text clipping inside the `projects-list-tab` dropdown filters without reopening the spacing problem. In `src/styles/core.css`, widened the desktop filter tracks slightly and slightly reduced the trigger font size only inside the projects filters surface so labels like project status, payment status, confirmation, and date range fit more cleanly while preserving the three-row layout and the existing spacing rhythm.
- **What Was Verified:** `npm run build:assets`; live CDP inspection confirmed the desktop filter tracks now resolve to `216px` columns and the trigger text size resolves to `15.2px`. Visual audit: `test-results/projects-list-filters-text-fit-fixed.png`.
- **What Is Still Risky:** this is a text-fit refinement only. `projects-list-tab` still needs full approval-level review across the whole populated state.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `projects-list-tab` with the next concrete visual note on table rhythm, density, or parity before approval.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` remains the active review surface.

- **Phase:** `projects.html` projects-list three-row filters layout
- **What Changed:** restructured the `projects-list-tab` quick-search surface into a clearer three-row desktop layout: search alone on the first row, all dropdown filters on one second row, and the date inputs on a dedicated third row. Implemented this in `src/styles/core.css` by moving the filters grid to five narrower desktop columns, keeping the search on a full-width row with a capped width, and moving the date-range block to its own full row. This removed the previous mixed-row layout that was leaving the filters feeling uneven and hard to scan.
- **What Was Verified:** `npm run build:assets`; live CDP inspection confirmed the desktop rows now render as intended with search width `544px`, five dropdown filters on one row at `195px` each, and the date range on its own third row at `348px`. Visual audit: `test-results/projects-list-filters-three-row-layout-final.png`.
- **What Is Still Risky:** this fixes the desktop filter-row hierarchy, but the full `projects-list-tab` surface still needs final approval-level review.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `projects-list-tab` with the next concrete visual note on table rhythm, density, or parity before approval.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` remains the active review surface.

- **Phase:** `projects.html` projects-list filters deep width audit
- **What Changed:** completed a deeper width audit on the `projects-list-tab` filter bar and corrected the actual source of the unused horizontal space. The issue was not the date inputs themselves; it was that the enhanced dropdown wrappers were stretching to broad equal-width grid tracks. In `src/styles/core.css`, changed the filters grid to fixed narrower desktop tracks, kept the controls packed from the start edge, and narrowed the date-range group separately. Also tagged the range filter in `src/pages/projects.html` so the range select and the date inputs now occupy a cleaner explicit layout instead of leaving a wide dead slot.
- **What Was Verified:** `npm run build:assets`; live CDP inspection on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard` confirmed the desktop dropdown widths now resolve to `212px` each, the search width resolves to `496px`, and the date-range block resolves to `348px`. Visual audit: `test-results/projects-list-filters-deep-audit-tightened.png`.
- **What Is Still Risky:** this fixes the structural width distribution of the filters surface, but `projects-list-tab` still needs full approval-level review across the whole populated state.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `projects-list-tab` with the next concrete visual note on table rhythm, density, or parity before approval.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` remains the active review surface.

- **Phase:** `projects.html` projects-list width balance refinement
- **What Changed:** completed a second quick-search UX refinement pass on `projects-list-tab` focused on width balance rather than spacing alone. In `src/styles/core.css`, reduced the desktop search width cap again and narrowed the custom date-range footprint with a max-width and start alignment so the filters surface no longer feels overextended horizontally. The mobile fallback remains unchanged, so the date range still stretches naturally on narrow screens.
- **What Was Verified:** `npm run build:assets`; live visual/runtime check via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/projects-list-filters-width-balanced.png --inspect-selector '.project-filters-compact' --inspect-selector '.project-filters-grid__search' --inspect-selector '.project-filters-date-range'`
- **What Is Still Risky:** this improves horizontal balance inside the filters surface, but `projects-list-tab` still needs final approval-level visual review across the whole populated state.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `projects-list-tab` with the next concrete visual note on density, table rhythm, or parity before approval.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` remains the active review surface.

- **Phase:** `projects.html` projects-list filters spacing refinement
- **What Changed:** tightened the quick-search/filter surface in `projects-list-tab` without changing workflow or adding any local one-off override. Reduced the filter header gap and bottom spacing, reduced the shared grid gap between filter controls, shortened the desktop search width cap, and tightened the custom date-range pair spacing in `src/styles/core.css`. This keeps the same shared `project-filters-compact` / `project-filters-grid` contract but makes the filter surface denser and easier to scan.
- **What Was Verified:** `npm run build:assets`; live visual/runtime check via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/projects-list-filters-spacing-tightened.png --inspect-selector '.project-filters-compact' --inspect-selector '.project-filters-grid'`
- **What Is Still Risky:** this is a spacing refinement only. `projects-list-tab` still needs final visual approval across the rest of the populated-state surface.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `projects-list-tab` with the next concrete visual note on spacing, table rhythm, or list parity before approval.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` is still the active review surface.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list pagination simplification
- **What Changed:** simplified the `projects-list-tab` pagination behavior to a lightweight sliding window instead of the earlier overcomplicated branching. Added `buildProjectsPageWindow()` in `src/scripts/projects/helpers.js` and moved `src/scripts/projects/view.js` to a simple `current + next + last` window when more than three pages exist. Increased the focus-card page size from `6` to `8` in `src/scripts/projects/constants.js` and `src/scripts/projects/state.js`, and expanded the local dashboard fixture in `src/scripts/devFixtures.js` so `projects.html?bypassAuth=1&fixture=dashboard` now contains enough fixture projects to review multi-page behavior for real. The timeline continues to render the same current-page slice as the focus cards instead of drifting to a different dataset.
- **What Was Verified:** `npx vitest run tests/projects/paginationWindow.test.js tests/theme/fullShellContractAudit.test.js`; `npm run build:assets`; live CDP inspection on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard` confirmed page 1 renders `1, 2, 5`, page 2 renders `2, 3, 5`, each page shows `8` focus cards, and the timeline renders `8` items from the same current-page slice. Visual captures: `test-results/projects-pagination-simple-page1.png`, `test-results/projects-pagination-simple-page2.png`.
- **What Is Still Risky:** the simplified pagination behavior is now correct in the local review route, but `projects-list-tab` still needs final visual review for spacing and parity beyond pagination before approval.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next concrete populated-state visual note after this pagination simplification, or lock the subtab if the remaining rhythm/spacing is accepted.
- **Do Not Start Yet:** do not widen this into `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` is still the active review surface.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab pagination unified to notifications benchmark
- **What Changed:** replaced the older `projects` pagination renderer with the same `list-pagination` markup contract already used in `notifications`. Updated `src/pages/projects.html` so the focus and table paginations are back on `.list-pagination`, restored the richer summary/controls renderer in `src/scripts/projects/view.js`, re-added the matching page/range/navigation translation keys in `src/scripts/translations/projects.js`, and refreshed the source audit in `tests/theme/fullShellContractAudit.test.js`. No `projects`-specific shape override was added; the pagination now inherits the same shared owner from `src/styles/app.css` that `notifications` already uses.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; live benchmark compare via `test-results/notifications-pagination-identical-benchmark.png` and `test-results/projects-pagination-identical-to-notifications.png`
- **What Is Still Risky:** this proves parity on the shared pagination contract, but not on every custom pagination system elsewhere in the app. Only the `list-pagination` path shared by `notifications` and `projects` was validated here.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next visual note unrelated to pagination, or lock the subtab if the current surface is accepted.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab pagination rollback by request
- **What Changed:** reverted the recent pagination-specific tuning for `projects-list-tab`. Restored the older `projects` pagination renderer in `src/scripts/projects/view.js`, removed the extra page-range/navigation translation keys from `src/scripts/translations/projects.js`, restored the simpler pagination container markup in `src/pages/projects.html`, and returned the shared `list-pagination` visual contract in `src/styles/app.css` to its earlier rounded-button behavior. Refreshed the source audit in `tests/theme/fullShellContractAudit.test.js` and cleared the active-phase wording in this plan so it no longer claims the reverted pagination parity work is still live.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** this rollback was intentionally narrow to pagination only. It does not change the rest of the `projects-list-tab` cleanup or card/table/filter work.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next non-pagination visual review note, or take a fresh pagination direction later from a clean benchmark if requested.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab pagination benchmark parity correction
- **What Changed:** corrected the previous pagination fix after a deeper benchmark audit. Compared the shared `list-pagination` path against the approved reservation pagination pattern and found that the real drift was not the page-number order, but the visual placement of the controls block versus the summary block. Updated the shared `list-pagination` contract in `src/styles/app.css` so `list-pagination__controls` now stays visually on the left while `list-pagination__summary` stays on the right, and kept the controls themselves isolated in LTR order so the page-number sequence remains stable in both Arabic and English. Refreshed the source audit in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; benchmark comparison via `test-results/reservations-pagination-benchmark-en.png` and `test-results/reservations-pagination-benchmark-ar.png`; visual parity check via `test-results/projects-pagination-position-en-fixed.png` and `test-results/projects-pagination-position-ar-fixed.png`
- **What Is Still Risky:** this corrects the shared `list-pagination` visual placement, but it does not claim every other custom pagination component in the app is unified with it yet. Only the shared contract and the `projects-list-tab` surfaces using it were validated here.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next concrete visual review note, or lock the subtab if the remaining card/table rhythm is accepted.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab pagination direction parity fix
- **What Changed:** fixed the visual pagination-direction bug that appeared only under Arabic/RTL. The root cause was inherited RTL direction inside the shared `list-pagination` controls, which reversed the page-number sequence and shifted the arrow placement. Locked the global pagination controls in `src/styles/app.css` to `direction: ltr` with `unicode-bidi: isolate`, kept the surrounding pagination shell language-aware, and refreshed the source audit in `tests/theme/fullShellContractAudit.test.js`. This fix applies to the shared `list-pagination` contract rather than only to `projects-list-tab`, so pages using that same pagination path now keep a stable visual order across English and Arabic.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; direct visual parity check via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en' --out test-results/projects-pagination-direction-en-fixed.png ...`; plus Arabic parity check via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=ar' --out test-results/projects-pagination-direction-ar-fixed.png ...`
- **What Is Still Risky:** the ordering bug is fixed at the shared control level, but if another pagination surface uses a different markup contract outside `list-pagination`, it would need its own review. This pass does not claim every pagination in the app is identical, only that the shared `list-pagination` path now behaves correctly in RTL.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next concrete visual review note, or lock the subtab if the remaining rhythm and parity are accepted.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab filter, pagination, and table-parity pass
- **What Changed:** completed the next UI-only pass on `projects-list-tab` focused on filter clarity and parity with approved global patterns. Updated `src/pages/projects.html` so the list filters now use clearer category-first default copy for project status, payment status, project type, confirmation state, and date range. Shortened the search surface in `src/styles/core.css` by capping the search field width and slightly increasing filter spacing, while keeping the existing shared grid contract. Rebuilt the list-tab pagination in `src/scripts/projects/view.js` so both the focus-card and table paginations now use the shared `list-pagination` structure with summary text, correct page labels, and auto-hide behavior when only one page exists. Also removed the remaining `projects-table`-specific visual table overrides from `src/styles/core.css` so the list table now leans on the shared `users-table` visual contract, keeping only layout-level adjustments for amount/schedule/action columns. Added the corresponding translation keys in `src/scripts/translations/projects.js` and locked the contract in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; live populated-state review via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en' --out test-results/projects-list-tab-filters-pagination-final.png --delay 2500 --post-click-delay 1200 --click '.sub-tab-button[data-project-subtab-target="projects-list-tab"]' --inspect-selector '.project-filters-compact' --inspect-selector '#project-focus-pagination' --inspect-selector '#project-table-pagination' --inspect-selector '.projects-table'`; plus lower table review via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en' --out test-results/projects-list-tab-table-final-2.png --delay 2500 --post-click-delay 1200 --click '.sub-tab-button[data-project-subtab-target="projects-list-tab"]' --eval 'window.scrollTo({ top: document.querySelector(".projects-table")?.getBoundingClientRect().top + window.scrollY - 120, behavior: "instant" }); true' --inspect-selector '.projects-table' --inspect-selector '.projects-table .users-table-wrapper'`
- **What Is Still Risky:** the list tab is now much closer to the approved patterns, but the remaining review judgment is still visual: whether card density, table density, and true mobile parity are fully acceptable. The current populated fixture only spans a single page, so the new global pagination contract is source-verified and structure-verified, but not yet visually exercised in a multi-page projects dataset.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next concrete visual review note, or lock the subtab if the current filter/table/card rhythm is accepted.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab populated readability pass
- **What Changed:** completed a focused readability and density pass on `projects-list-tab` after the first populated-state cleanup. Rebalanced the list surface in `src/styles/core.css` by giving the filters/cards/table sections a shared section-header rhythm, increasing focus-card breathing room, softening the card content density, and moving the project-card section titles off the harsh uppercase tracking path. Also tightened the populated table rendering in `src/scripts/projects/view.js` plus `src/pages/projects.html`: added a real table header/count structure, explicit project/schedule/amount/action wrappers, fixed-width shared table behavior with internal scroll instead of column squeeze, clearer stacked date/time lines, and a cleaner wrapped action group. Locked the pass in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; live populated-state review via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en' --out test-results/projects-list-tab-populated-desktop-5.png --delay 2500 --post-click-delay 1200 --click '.sub-tab-button[data-project-subtab-target="projects-list-tab"]' --inspect-selector '.project-filters-compact' --inspect-selector '.project-focus-wrapper' --inspect-selector '.projects-table'`; plus lower-section review via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en' --out test-results/projects-list-tab-populated-table-2.png --delay 2500 --post-click-delay 1200 --click '.sub-tab-button[data-project-subtab-target="projects-list-tab"]' --eval 'window.scrollTo({ top: document.querySelector(".projects-table")?.getBoundingClientRect().top + window.scrollY - 120, behavior: "instant" }); true' --inspect-selector '.projects-table'`
- **What Is Still Risky:** the remaining judgment on `projects-list-tab` is now mostly approval-level visual judgment rather than broken ownership. Mobile parity should still be checked carefully in a true narrow viewport if a new complaint appears, because the current screenshot route behaves closer to a compact desktop surface than a phone-sized layout.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next concrete visual note from live review, or lock the subtab if the current populated-state rhythm is accepted.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab populated-state review pass
- **What Changed:** completed the first populated-state review pass on `projects-list-tab`. Fixed the local review route in `src/scripts/projects.js` by applying `applyLocalDashboardFixture()` so `projects.html?bypassAuth=1&fixture=dashboard` actually hydrates list cards and table rows with fixture data instead of staying empty. Then cleaned the populated list-tab parity issues: widened the shared filters grid in `src/styles/core.css` so confirmation/type filters no longer clip, added missing project type support for `event` and `conference` in `src/scripts/projects/view.js` plus `src/scripts/translations/projects.js`, exposed those types in the list filter options in `src/pages/projects.html`, and moved the populated focus-card section boxes and completed-card dark overrides onto the same quieter dark surface path instead of the older cold/blue-tinted fallback.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; live populated-state review via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard&lang=en' --out test-results/projects-list-tab-populated-desktop-4.png --delay 3200 --post-click-delay 1500 --click '.sub-tab-button[data-project-subtab-target="projects-list-tab"]' --inspect-selector '.project-filters-compact'`; plus populated desktop screenshots in `test-results/projects-list-tab-populated-desktop-2.png`, `test-results/projects-list-tab-populated-desktop-3.png`, and `test-results/projects-list-tab-populated-desktop-4.png`
- **What Is Still Risky:** the list tab is now materially cleaner and the populated-state route works, but the remaining review judgment is visual: whether the populated cards/table density and mobile rhythm are fully acceptable, not whether a structural owner is still broken.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` with the next concrete visual note from populated review, especially mobile density/wrapping or row/card spacing if it still feels crowded.
- **Do Not Start Yet:** do not move to `projects-reports-tab` or `projects-templates-tab` until `projects-list-tab` is either approved or explicitly deferred.

### 2026-04-12 | Codex

- **Phase:** `projects.html` projects-list tab deep audit and shared-contract cleanup
- **What Changed:** started active work on `projects-list-tab` and completed the first review-driven cleanup pass. Moved the list filters in `src/pages/projects.html` off the old inline wrap bar and onto a page-owned shared grid contract with a real heading/support-text block, a reset button on `data-i18n`, and a grouped custom date-range row. Fixed the list-tab translation leaks by adding the missing `projects.search.*` and `projects.table.*` keys in `src/scripts/translations/projects.js`, including reset text, type/confirmation filter defaults, table actions, and table loading copy. Moved the projects list table from the older generic `ui-table-shell` path onto the same `users-table-wrapper` + `ui-table users-table surface-table` contract used by the approved pages. Also cleaned the list-tab visuals in `src/styles/core.css` by removing the old muddy gradient/shadow treatment from the filters shell, focus wrapper, timeline shell, projects table shell, and focus cards, and replaced the focus-card empty state in `src/scripts/projects/view.js` with the shared `linked-records-empty-copy` path instead of the old `alert-info` fallback.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; live runtime dark review via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&lang=en' --out test-results/projects-list-tab-pass1-desktop-2.png --delay 2500 --post-click-delay 1200 --click '.sub-tab-button[data-project-subtab-target="projects-list-tab"]' --inspect-selector '.project-filters-compact' --inspect-selector '.project-focus-wrapper' --inspect-selector '.projects-table'`
- **What Is Still Risky:** the list tab now has cleaner shared ownership, but the current fixture route still shows empty focus cards and an empty table, so populated-state parity for cards, rows, pagination, and dense mobile content still needs live review.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `projects-list-tab` and review the populated state for project cards, timeline items, table rows, pagination, and mobile wrapping before touching reports or templates.
- **Do Not Start Yet:** do not reopen `create-project-tab`, and do not widen the active work to `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` while `projects-list-tab` is still under review.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab approval lock
- **What Changed:** recorded that `projects.html` `create-project-tab` is approved after the completed UI-only cleanup, deep visual review, shared dark-control cleanup, combobox restoration, billing/history cleanup, and final usability spacing pass. The tab is now treated as visually locked and no longer the active review surface. Updated the active phase so work inside `projects.html` now moves to the next subtab in sequence, `projects-list-tab`, instead of continuing to iterate on create.
- **What Was Verified:** approval is based on the already logged create-tab verification record, including `npm run build:assets`, `npx vitest run tests/theme/fullShellContractAudit.test.js`, and the final live review captures for the create flow under `test-results/projects-create-*`.
- **What Is Still Risky:** only `create-project-tab` is approved and locked. `projects.html` as a whole is still active and unapproved, and the remaining subtabs may still carry old surface/filter/table drift that needs separate review.
- **What Is Blocked:** none
- **Next Exact Task:** start the next `projects.html` subtab, `projects-list-tab`, with a deep UI-only audit and visual review before touching reports or templates.
- **Do Not Start Yet:** do not reopen `create-project-tab` without a new explicit regression, and do not jump ahead to `projects-reports-tab`, `projects-templates-tab`, or `dashboard.html` before the list tab is assessed.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab footer and payment-history cleanup
- **What Changed:** completed the next UI-only cleanup pass at the bottom of `create-project-tab`. Kept the payment-history renderer unchanged logically, but moved the visible block onto a clearer full-width ending treatment by adding the `project-payment-history-block` owner in `src/pages/projects.html` and `src/styles/forms.css`, giving the empty history state a stable minimum height and centered empty-copy instead of collapsing into a tiny box. Also cleaned the final submit area by turning `project-form-footer` into a real closing footer with top spacing and divider rhythm so the create button no longer floats visually after the billing block. No workflow logic was changed.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; visual smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1` with capture in `test-results/projects-create-footer-cleaned-desktop.png`
- **What Is Still Risky:** `create-project-tab` is materially cleaner, but it is still not approved. The remaining work is mostly fine visual tuning and whole-tab rhythm review rather than structural cleanup.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `create-project-tab` with the next concrete visual review comment, focusing on any remaining density or mobile rhythm issues before deciding approval.
- **Do Not Start Yet:** do not reopen functional workflow changes, and do not widen this into `projects-list-tab`, reports, templates, or `dashboard.html`.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab layout cleanup
- **What Changed:** completed the next UI-only layout cleanup inside `create-project-tab`. Removed the extra subtab-hint card above the create form so the page no longer stacks redundant guidance ahead of the active workflow. Combined the start/end date and time fields into a single `project-schedule-grid` block to make the schedule read as one visual group instead of two disconnected rows. Refined `#project-linked-reservation` so its content and action align cleanly on desktop while still stacking correctly on narrow layouts. Most importantly, removed the old `selected-list` ownership from the services ledger in `src/pages/projects.html` and `src/scripts/projects/form.js`, and moved it onto the shared `users-table-wrapper` + `ui-table users-table surface-table` path so the create-tab service list now follows the same approved table language instead of the older muted/glowing container path.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; visual smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1` with captures in `test-results/projects-create-ui-cleaned-desktop.png` and `test-results/projects-create-ui-cleaned-mobile.png`
- **What Is Still Risky:** `create-project-tab` is cleaner, but it is still not approved. The main remaining work is visual density and spacing refinement inside the financial block and any remaining mobile-specific layout tightening.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `create-project-tab` with the next visual review finding, focusing on the billing block and lower-form rhythm before touching any other `projects.html` subtabs.
- **Do Not Start Yet:** do not reintroduce legacy `selected-list` ownership into the create-tab ledger, and do not reopen any functional work around crew, equipment, or reservation-owned behavior.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab client combobox restoration
- **What Changed:** restored the client field in `create-project-tab` as a lightweight combobox instead of depending on the full customers management module. Rebuilt `src/scripts/projects/data.js` around a single-owner autocomplete path: it now loads customer records from in-memory store first, falls back to a focused `/customers/` API fetch only when needed, renders a local suggestion list under `#project-client`, supports `ArrowUp`, `ArrowDown`, `Enter`, and `Escape`, and fills `#project-client-company` only from the selected customer record. Kept the work inside the existing `project-client` + `project-customer-suggestions` structure in `src/pages/projects.html` and added the active-option visual state in `src/styles/forms.css`. Locked the contract in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; visual smoke on `http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1` with seeded local customer records via `scripts/manual-dark-smoke.mjs`, including captures in `test-results/projects-client-combobox-fixture-open.png` and `test-results/projects-client-combobox-fixture-selected.png`
- **What Is Still Risky:** the local `bypassAuth=1` route does not always carry real customer records by default, so the combobox visual smoke uses seeded local records during review. The real authenticated path should still be checked when the page is reviewed end-to-end for approval.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `create-project-tab` with the next visual refinement around field hierarchy, linked reservation, or mobile layout, while keeping the restored client combobox path intact.
- **Do Not Start Yet:** do not reintroduce the full customers page bootstrap into `projects.html`, and do not replace the combobox with a heavier customer-management dependency.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab UI-only visual cleanup
- **What Changed:** completed the next UI-only cleanup pass for `create-project-tab` after the rollback. Removed the redundant create-tab intro card from `src/pages/projects.html` so the tab no longer stacks multiple near-duplicate headings and descriptions before the form. Kept the create form on the shared `ui-card ui-card--content glass-card` contract, preserved the shared section headers and shared financial-control primitives already accepted, and retained the earlier lazy loading of `customers.js` and `technicians.js` from `src/scripts/projects.js` so unrelated modules do not boot eagerly while the create tab is being reviewed. Also cleaned the local bypass review route by adding a narrow localhost-only unauthorized-toast suppression guard in `src/scripts/utils.js`, plus bypass-aware short-circuit reads in `src/scripts/projects/app.js` and `src/scripts/projectsReports.js`, so visual review of `projects.html?bypassAuth=1` is not polluted by stale 401 toasts.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-tab-approved-pass-desktop.png --delay 2200 --post-click-delay 1000 --inspect-selector '#toast-container' --inspect-selector '.project-form-card' --inspect-selector '.project-form-header'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-tab-approved-pass-mobile.png --delay 2200 --post-click-delay 1000 --viewport 430,1400 --inspect-selector '#toast-container' --inspect-selector '.project-form-card' --inspect-selector '.project-form-header'`
- **What Is Still Risky:** `create-project-tab` is cleaner and quieter visually, but it is still not approved. The remaining work should stay UI-only and focus on the visible layout, spacing, and shared control behavior of the existing client/date/company flow and linked-reservation section.
- **What Is Blocked:** none
- **Next Exact Task:** continue inside `create-project-tab` with the next concrete visual review finding, starting from the visible form hierarchy and linked-reservation section before touching `projects-list-tab`, reports, templates, or `dashboard.html`.
- **Do Not Start Yet:** do not add any new create-tab workflow for crew, equipment, or reservation-owned payment behavior, and do not reopen approved pages while `projects.html` remains the active `full`-family review surface.

### 2026-04-09 | Codex | Customer Shared Control Dark Leak Fix
### ٢٠٢٦-٠٤-٠٩ | كودكس | إصلاح تسرب الوضع الفاتح في عناصر التحكم المشتركة لصفحة customer

- **Phase:** Customer Detail-Page Blueprint Pass
- **Summary of Completed Work:** Ran a deeper shared-base audit after the user reported white or light-mode leakage in dark mode plus refresh-time flashes on `customer.html`. Traced the steady-state leak to the shared control owner: the control token family was still using gradient values while the primitive also zeroed out `background-image`, which allowed Bootstrap’s white `form-control` background to win on plain text fields. Fixed this in the shared base by converting the live control background tokens to solid values, hardening the shared dark control selector so text inputs/selects/textareas explicitly win dark background and text color, and keeping the detail-page owner aligned with the same dark control surface. Also added a `theme-loading` hide guard in the shared manager head partial so shell content stays hidden during early theme bootstrap, reducing refresh-time light flashes. Finally aligned the customer action-row buttons so both top quick-action buttons use the same approved secondary tone requested by the user.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `src/pages/_partials/manager-page-head.html`, `tests/theme/primitiveContractAudit.test.js`, `tests/theme/pageShellPilotAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`, `npx vitest run tests/theme/customerPageAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/detailsFixtureAudit.test.js tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/pageShellPilotAudit.test.js`
- **Manual Checks Run:** runtime dark smoke on `http://127.0.0.1:4174/src/pages/customer.html?id=1&bypassAuth=1&fixture=details` inspecting the top quick-action buttons, search fields, date filters, and edit form inputs after the shared-base patch
- **Verification Snapshot:** the live customer audit now reports dark control backgrounds for the search inputs and edit inputs (`rgba(20, 30, 24, 0.96)`), dark text colors, and matching secondary-tone backgrounds on both top quick-action buttons; the customer page still loads with `authPending: false` and the populated fixture path remains stable
- **Regressions Or Risks Introduced:** low. The control fix is shared-base ownership by design, so it can affect other pages that rely on the same primitive family, but that is the intended cleanup direction and it removes a real dark-mode regression instead of adding new page-local exceptions
- **Next Recommended Task:** visually review `customer.html` after the shared control cleanup and, if it is now correct, lock customer and move to `technician.html`
- **Do Not Start Yet:** do not reintroduce gradient-only control background tokens into the shared primitive without a valid matching `background-color`, do not solve future dark control leaks with page-by-page field overrides, and do not start `technician.html` until customer is explicitly signed off

### 2026-04-09 | Codex | Customer Blueprint Pass Structural Cleanup
### ٢٠٢٦-٠٤-٠٩ | كودكس | تنظيف هيكلي لتمرير مخطط customer

- **Phase:** Customer Detail-Page Blueprint Pass
- **Summary of Completed Work:** Completed the first focused `customer.html` pass under the existing detail-page blueprint. Added neutral `detail-*` hooks to the live customer stats grid, payment breakdown, record grid, and detail tabbar so the page can be styled through shared structure instead of brittle page IDs or customer-only selector chains. Updated the runtime-rendered customer payment rows and detail cards to emit the same semantic hooks as the static markup, removed the dead `customer-primary-nav` fallback styling path, and promoted the remaining customer tabbar ownership from `.customer-page .customer-tabbar` onto the shared `details-page .detail-tabbar` contract. This keeps the customer pass aligned with the user requirement to work cleanly, one page at a time, and without stacking new override debt.
- **Key Files Or Surfaces Touched:** `src/pages/customer.html`, `src/scripts/customerPage.js`, `src/styles/app.css`, `src/scripts/ui/injectSidebarStyles.js`, `tests/theme/customerPageAudit.test.js`, `tests/theme/tabsFamilyDarkModeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`, `npx vitest run tests/theme/customerPageAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/detailsFixtureAudit.test.js tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js`
- **Manual Checks Run:** runtime dark smoke on `http://127.0.0.1:4174/src/pages/customer.html?id=1&bypassAuth=1&fixture=details` with the greeting panel opened in desktop and mobile widths using `scripts/manual-dark-smoke.mjs`; inspected `.dashboard-greeting-panel`, `.detail-tabbar`, `.detail-payment-line`, `.detail-record-card`, `#customer-stat-payment`, and `#customer-details`
- **Verification Snapshot:** source audits pass, the customer fixture loads in dark mode with `auth-pending` cleared, the shared detail tabbar reports a dark shell surface, payment rows render dark card treatment through `detail-payment-line`, and detail records render through `detail-record-card` with the expected dark content surface on both desktop and mobile
- **Regressions Or Risks Introduced:** low. The main remaining risk is visual preference, not structural drift: `customer.html` is now cleaner structurally, but any further refinement should stay inside the shared detail-page hooks already introduced instead of reviving customer-only selectors
- **Next Recommended Task:** review `customer.html` visually against the blueprint and either lock it as approved or request only customer-scoped follow-up refinements that preserve the new shared `detail-*` ownership
- **Do Not Start Yet:** do not start `technician.html`, `dashboard.html`, or any approved page while customer remains the active track, and do not reintroduce `.customer-page .customer-tabbar`, dead `customer-primary-nav` paths, or new ID-driven customer dark selectors

### 2026-04-09 | Codex | Customer Enrolled As Sole Next Active Page
### ٢٠٢٦-٠٤-٠٩ | كودكس | تسجيل customer كصفحة العمل النشطة التالية بشكل منفرد

- **Phase:** Next Page Enrollment
- **Summary of Completed Work:** Narrowed the previously paired detail-page enrollment to match the current execution rule: `customer.html` goes first and `technician.html` waits. This keeps the sequence explicit and makes the next pass easier to control structurally. `customer.html` remains the correct starting point because it already sits on the extracted `tabs` shell, uses the `details-page` family contract, and has the localhost `?fixture=details` path available for populated-state validation. This entry changes only the active-page sequencing; no customer UI has been edited yet.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; plan update only
- **Manual Checks Run:** reviewed the current active phase, the detail-page family notes, and the fixture guidance to align the rollout order with the user instruction to work one page at a time
- **Verification Snapshot:** the rollout order is explicit again: approved pages remain locked, `customer.html` is the only active page, `technician.html` is deferred behind it, and dashboard remains deferred
- **Regressions Or Risks Introduced:** none at runtime. The main risk avoided here is letting the detail-page pair drift back into parallel work when the current requirement is one page at a time
- **Next Recommended Task:** complete the customer-page audit and first focused pass before reopening `technician.html`
- **Do Not Start Yet:** do not reopen `technician.html`, `dashboard.html`, or any approved page while the customer pass is active unless a new request explicitly changes the sequence

### 2026-04-09 | Codex | Customer And Technician Enrolled As Next Active Pair
### ٢٠٢٦-٠٤-٠٩ | كودكس | تسجيل customer وtechnician كثنائي الصفحات النشط التالي

- **Phase:** Next Page Enrollment
- **Summary of Completed Work:** Replaced the brief dashboard enrollment with the user-requested paired detail-page enrollment. The next active track is now explicitly `customer.html` plus `technician.html`, not `dashboard.html`. This keeps the sequence coherent with the extracted `tabs` family: `home.html` is already the lighter approved reference, while `customer.html` and `technician.html` are the denser shared detail-page pair that should move together because they share the same shell family, `details-page` structure, Bootstrap/Flatpickr dependencies, greeting-stat complexity, `projectDetailsModal`, and localhost `?fixture=details` runtime path. This entry is a planning-state transition only; no customer or technician UI was changed yet.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; plan update only
- **Manual Checks Run:** reviewed the current active phase, the tabs-family prep snapshot, the paired detail-page notes, and the localhost `fixture=details` guidance to make the next-page choice consistent with the recorded architecture and verification path
- **Verification Snapshot:** the rollout order is explicit again: approved pages remain locked, the shared approved top bar stays closed, dashboard is deferred, and `customer.html` plus `technician.html` are now the next active paired surfaces
- **Regressions Or Risks Introduced:** none at runtime. The main risk avoided here is splitting the detail-page pair or jumping into dashboard before the user-intended tabs-family follow-up
- **Next Recommended Task:** begin a focused paired pass on `customer.html` and `technician.html`, using `?fixture=details` as the default runtime validation route for populated detail states, modals, tabs, and Flatpickr-backed controls
- **Do Not Start Yet:** do not reopen `home.html`, `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, or `users.html`; do not treat `dashboard.html` as the next active redesign page unless the detail-page pair is explicitly deferred

### 2026-04-09 | Codex | Dashboard Enrolled As Next Active Page
### ٢٠٢٦-٠٤-٠٩ | كودكس | تسجيل dashboard كأول صفحة نشطة تالية

- **Phase:** Next Page Enrollment
- **Summary of Completed Work:** Closed the approved top-bar maintenance track enough to move the plan forward and enrolled `dashboard.html` as the next active page surface. The sequence is no longer ambiguous: the approved compact/tabs pages stay visually locked, `projects.html` remains the smaller stable `full`-family reference, and `dashboard.html` is now the next active heavy page because it already has shared-shell extraction coverage, a dedicated dark-validation checklist, and a stable fixture-backed runtime path through `?fixture=dashboard`. This entry is a planning-state transition only; no dashboard UI was changed yet.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; plan update only
- **Manual Checks Run:** reviewed the current active phase, the approved-page lock set, the current next-task section, and the earlier `full`-family notes that mark `projects.html` as stable enough to stop blocking the next dashboard-specific prep step
- **Verification Snapshot:** the rollout order is now explicit again: approved pages remain locked, the shared approved top bar is treated as closed, and `dashboard.html` is the next page to work on rather than another compact/tabs surface
- **Regressions Or Risks Introduced:** none at runtime. The main risk avoided here is drifting into an unrecorded page choice and reopening approved pages accidentally
- **Next Recommended Task:** begin a focused `dashboard.html` stabilization/redesign pass using `?fixture=dashboard` as the primary runtime verification route
- **Do Not Start Yet:** do not reopen `home.html`, `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, or `users.html`; do not treat `projects.html` as the next active redesign page unless `dashboard.html` is explicitly deferred

### 2026-04-09 | Codex | Approved Top-Bar Strict Parity Cleanup
### ٢٠٢٦-٠٤-٠٩ | كودكس | تنظيف التطابق الكامل للشريط العلوي المعتمد

- **Phase:** Approved Top-Bar Lock Maintenance
- **Summary of Completed Work:** Removed the last page-level ownership overlap affecting the shared approved top bar. `src/styles/notifications.css` and `src/styles/users.css` were still styling every `.glass-card`, which meant the shared greeting panel could still inherit page-local surface treatment even after the dark leak fix. Narrowed those selectors so page styling only targets page content cards and explicitly excludes `.dashboard-greeting-panel`. Also excluded the users pseudo-surface reset from the shared greeting panel. This keeps page-level visual refinement for page content while making the approved top bar structurally owned only by the shared `approved-topbar-page` rules in `src/styles/app.css`.
- **Key Files Or Surfaces Touched:** `src/styles/notifications.css`, `src/styles/users.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`
- **Manual Checks Run:** runtime dark smoke on `http://127.0.0.1:4174/src/pages/notifications.html?bypassAuth=1` and `http://127.0.0.1:4174/src/pages/users.html?bypassAuth=1` with the greeting panel opened and computed styles inspected for `.dashboard-header-nav`, `.dashboard-greeting-toggle`, and `.dashboard-greeting-panel`
- **Verification Snapshot:** `notifications.html` and `users.html` now report the same shared approved greeting-panel dark surface as the benchmark, `rgba(22, 29, 23, 0.98)`, which confirms the page-level CSS no longer owns the top bar
- **Regressions Or Risks Introduced:** very low. The cleanup only narrowed page selectors and preserved the page-local card styling for content areas outside the top bar
- **Next Recommended Task:** keep the approved top bar locked and treat the shared `approved-topbar-page` owner as the only valid place for future top-bar styling changes
- **Do Not Start Yet:** do not add broad `.glass-card` styling back into approved page stylesheets without excluding `.dashboard-greeting-panel`, and do not reintroduce page-local top-bar ownership through convenience selectors

### 2026-04-09 | Codex | Approved Top-Bar Dark Audit And Leak Fix
### ٢٠٢٦-٠٤-٠٩ | كودكس | تدقيق الوضع الداكن للشريط العلوي المعتمد وإصلاح تسرب السطح الفاتح

- **Phase:** Approved Top-Bar Lock Maintenance
- **Summary of Completed Work:** Performed a deeper runtime audit after a user-reported dark-mode regression showed a bright greeting panel leaking back into some approved pages. Traced the issue to the shared owner itself: the later light `approved-topbar-page` panel rule in `src/styles/app.css` was still forcing the benchmark light panel surface, so in dark mode it could override the generic shell styling and reintroduce the white panel seen in the screenshot. Fixed the shared owner by explicitly applying the dark approved top-bar shell, toggle, and panel surfaces inside the dark `approved-topbar-page` scope instead of relying only on dark variables. Also expanded `scripts/manual-dark-smoke.mjs` so the audit now records computed background, border, and text colors for inspected selectors, making future top-bar regression checks repeatable and less subjective.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `scripts/manual-dark-smoke.mjs`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`
- **Manual Checks Run:** runtime dark smoke audit on `http://127.0.0.1:4174/src/pages/home.html?bypassAuth=1`, `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, and `users.html` with the greeting panel opened and the computed styles inspected for `.dashboard-header-nav`, `.dashboard-greeting-toggle`, and `.dashboard-greeting-panel`
- **Verification Snapshot:** all approved pages in scope now report dark header-shell backgrounds and dark greeting-panel backgrounds at runtime; `home.html` reports `rgba(22, 29, 23, 0.98)` for the opened panel, and the compact approved pages report matching dark surfaces with no bright panel fallback left in the shared owner
- **Regressions Or Risks Introduced:** low. `notifications.html` and `users.html` still retain their page-level dark surface refinements, but the shared approved top-bar ownership is intact and no page-specific bright top-bar leak remains in scope
- **Next Recommended Task:** keep the approved top bar locked, and if another top-bar regression appears, run the same shared dark smoke audit first before changing any page stylesheet
- **Do Not Start Yet:** do not reintroduce light hard-coded panel backgrounds under `approved-topbar-page`, do not solve future top-bar regressions with page-specific overrides, and do not widen the audit into unapproved page families unless requested

### 2026-04-09 | Codex | Approved Top-Bar Unification Rollout
### ٢٠٢٦-٠٤-٠٩ | كودكس | تنفيذ توحيد الشريط العلوي للصفحات المعتمدة

- **Phase:** Approved Shared Shell Rollout
- **Summary of Completed Work:** Implemented the approved-page top-bar unification through shared ownership instead of per-page overrides. Added a shared `approved-topbar-page` variant in `src/styles/app.css` that now owns the approved header frame, greeting toggle, greeting panel, and greeting action button treatment. Fixed the benchmark defect by removing the dark transparent state from the `home.html` greeting panel and giving the shared approved top bar an explicit dark panel surface. Then opted the approved pages into the shared variant by body class: `home.html`, `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, and `users.html`. Also added the shared `dashboard-greeting-actions` hook in the compact shell path and aligned the home/notifications greeting action wrappers with that hook so the panel action styling is owned structurally rather than via page-only selectors. No unapproved detail/full pages were restyled in this pass.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `src/pages/_partials/compact-manager-shell.html`, `src/pages/home.html`, `src/pages/equipment-requests.html`, `src/pages/site-analytics.html`, `src/pages/contact-inquiries.html`, `src/pages/feedback-submissions.html`, `src/pages/notifications.html`, `src/pages/users.html`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`
- **Manual Checks Run:** runtime dark smoke captures on `http://127.0.0.1:4174/src/pages/home.html?bypassAuth=1` and `http://127.0.0.1:4174/src/pages/site-analytics.html?bypassAuth=1` using `scripts/manual-dark-smoke.mjs` with the greeting panel opened, plus built-output checks confirming `approved-topbar-page` and `dashboard-greeting-actions` are emitted in the approved-page HTML output
- **Verification Snapshot:** the benchmark `home.html` greeting panel is now readable in dark mode, the shared approved-top-bar variant is emitted on all approved pages in scope, and the compact approved family picks up the same top-bar treatment through shared ownership instead of page-local header CSS
- **Regressions Or Risks Introduced:** low. The rollout stayed inside approved pages plus the shared shell/style owner, but only `home.html` and `site-analytics.html` received runtime smoke captures in this entry; if stricter visual proof is required later, the same capture pass should be repeated for the remaining approved pages in scope
- **Next Recommended Task:** keep the approved top bar locked and reject any return to page-local top-bar overrides; if another refinement is requested later, start from the shared `approved-topbar-page` owner only
- **Do Not Start Yet:** do not reintroduce `.home-page`-only top-bar ownership, do not fork separate top-bar CSS into individual approved page stylesheets, and do not widen this treatment into unapproved detail/full pages without a new request

### 2026-04-09 | Codex | Approved Top-Bar Unification Plan
### ٢٠٢٦-٠٤-٠٩ | كودكس | خطة توحيد الشريط العلوي للصفحات المعتمدة

- **Phase:** Approved Shared Shell Planning
- **Summary of Completed Work:** Audited the current top-bar implementation across the shared shell partials and the approved pages to define the correct unification path before code changes begin. Confirmed that the header markup is already largely shared through `src/pages/_partials/compact-manager-shell.html` and `src/pages/_partials/tabs-manager-shell.html`, while the current divergence is mostly style ownership: `home.html` carries page-scoped top-bar styling in `src/styles/app.css`, and the approved compact pages still rely on the generic shell chrome. Also confirmed the current benchmark defect: in dark mode, `home.html` makes `.dashboard-greeting-panel` transparent, which means the benchmark itself must be corrected before it can be promoted. Locked the plan as follows: 1) fix the home benchmark first by restoring a readable non-transparent dark greeting panel while preserving the approved home header/nav/toggle color direction; 2) extract that approved top-bar treatment into shared shell ownership in `app.css` plus shared shell partial hooks, not page-local copies; 3) apply the shared approved-top-bar variant across the approved pages `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, and `users.html`; 4) remove any temporary page-local top-bar overrides left behind after the shared variant is in place; 5) verify first paint, post-auth reveal, greeting closed/open states, desktop/mobile, and dark/light for every approved page in scope.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; planning and source audit only
- **Manual Checks Run:** reviewed `src/pages/_partials/compact-manager-shell.html`, `src/pages/_partials/tabs-manager-shell.html`, `src/pages/home.html`, and the shared/home-specific top-bar CSS blocks in `src/styles/app.css`
- **Verification Snapshot:** the structural boundary is now clear: top-bar markup already belongs to shared shell partials, the current defect is the dark transparent `home.html` greeting panel, and the right fix path is a shared approved-top-bar variant rather than page-by-page CSS overrides
- **Regressions Or Risks Introduced:** none at runtime; the main implementation risk to avoid is leaking the home-only top-bar styling into unapproved pages or reintroducing page-local override debt while trying to unify approved pages
- **Next Recommended Task:** implement the benchmark correction first by making the dark `home.html` greeting panel readable, then promote the approved top-bar chrome into a shared shell variant and migrate the approved compact pages onto it in the same controlled pass
- **Do Not Start Yet:** do not copy `.home-page` top-bar selectors into each approved page stylesheet, do not restyle unapproved detail/full pages as part of this pass, and do not widen the change beyond header frame, greeting toggle/panel, hero-brand chrome, and header-end controls

### 2026-04-09 | Codex | Users Approval Lock And Level 1 Cleanup
### ٢٠٢٦-٠٤-٠٩ | كودكس | قفل اعتماد صفحة users وإنهاء تنظيف المستوى الأول

- **Phase:** Approved Page Cleanup
- **Summary of Completed Work:** Completed a narrow Level 1 cleanup pass on `users.html` and `users.css` without reopening the approved visual direction. Removed the redundant nested `surface-heading-stack` wrapper inside the users table section heading so that the section uses the shared heading structure directly, and collapsed the duplicated control-selector ownership for `#user-username`, `#user-password`, `#user-role`, and `#users-search` into a single CSS block. No IDs, JS hooks, pagination anchors, modal targets, or behavior contracts were changed. Recorded the page state as: visual approval status = approved and locked; Level 1 cleanup status = complete with no intended appearance change; Level 2 extraction candidacy = not opened by this pass; approved shared candidates from this page = none promoted yet.
- **Key Files Or Surfaces Touched:** `src/pages/users.html`, `src/styles/users.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`
- **Manual Checks Run:** static review of `users.html` and `users.css` before/after cleanup, plus built-output review of `dist/src/pages/users.html` to confirm the users table section, search control, and existing shell/runtime anchors still compile as expected after the cleanup
- **Verification Snapshot:** the users page keeps the same approved structure and behavior contracts, while one redundant heading wrapper and one duplicated page-local control selector block were removed
- **Regressions Or Risks Introduced:** low. This pass stayed page-local and non-behavioral, but no screenshot-diff run was performed in this cleanup entry; if stricter visual proof is required later, capture-based verification should be added before any further users cleanup
- **Next Recommended Task:** keep `users.html` visually locked with Level 1 cleanup now marked complete, and move the redesign track only through an explicit next page or shared task decision
- **Do Not Start Yet:** do not reopen `users.html` for visual redesign or widen this cleanup into shared extraction, shared control refactors, or broader form normalization without a new request

### 2026-04-09 | Codex | Approved Page Lock Set Alignment And Users Cleanup Queue
### ٢٠٢٦-٠٤-٠٩ | كودكس | مواءمة مجموعة الصفحات المعتمدة المقفلة وإدراج تنظيف users في قائمة التنفيذ

- **Phase:** Approved Page Governance
- **Summary of Completed Work:** Updated the master plan so the approved and locked page set is no longer limited to `home.html` and `equipment-requests.html`. The approved set now explicitly includes `home.html`, `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, and `users.html`. Also recorded that Level 1 cleanup has already been run on the approved low-risk set except `users.html`, which is now the active pending cleanup target. Kept `equipment-requests.html` explicitly approved and locked while preserving the earlier regression note that its previous cleanup path was rolled back and remains deferred until a stricter zero-drift method exists.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; master-plan state alignment only
- **Manual Checks Run:** reviewed the current active phase, the approved-page governance rules, the recent `home.html` and `equipment-requests.html` lock entries, and the latest `users.html` approval-alignment note to make the recorded next task consistent with the actual approved page set
- **Verification Snapshot:** the master plan now records the broader approved-page lock set, keeps previously approved pages frozen, and identifies `users.html` as the only remaining approved-page Level 1 cleanup task
- **Regressions Or Risks Introduced:** none at runtime; the only remaining process risk is accidental visual drift if `users.html` cleanup is attempted without strict before/after proof
- **Next Recommended Task:** perform Level 1 cleanup on `users.html` only, then log it as cleanup-complete while preserving the approved render and keeping the page locked
- **Do Not Start Yet:** do not reopen visual work on `home.html`, `equipment-requests.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, or `notifications.html`; do not retry `equipment-requests.html` cleanup until a stricter diff-safe method is ready

### 2026-04-08 | Codex | Equipment Requests Cleanup Regression Audit And Rollback
### ٢٠٢٦-٠٤-٠٨ | كودكس | تدقيق انحدار تنظيف صفحة Equipment Requests والتراجع عنه

- **Phase:** Approved Page Protection
- **Summary of Completed Work:** Performed a regression audit after the user reported visual drift on `equipment-requests.html` immediately after Level 1 cleanup. The audit traced the only direct cleanup edits to the stat-card DOM/CSS simplification path. Under the locked-page rule, treated the cleanup as the regression source, reverted the exact cleanup changes in `equipment-requests.html` and `equipment-requests.css`, rebuilt the page, and visually rechecked the approved dark render. The page remains approved and locked, but Level 1 cleanup for this page should now be treated as deferred rather than complete until a safer zero-drift cleanup path is proven.
- **Key Files Or Surfaces Touched:** `src/pages/equipment-requests.html`, `src/styles/equipment-requests.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`
- **Manual Checks Run:** reviewed the pre-cleanup capture, post-cleanup capture, and post-rollback capture for the Equipment Requests page in dark mode; treated the user-reported drift as authoritative even though the static captures looked nearly identical at a glance
- **Verification Snapshot:** the cleanup edits have been rolled back and the page is back on its approved baseline path; no new override or visual patch was introduced
- **Regressions Or Risks Introduced:** none from the rollback itself; the remaining risk is that Equipment Requests Level 1 cleanup needs a more conservative verification method before being attempted again
- **Next Recommended Task:** leave `equipment-requests.html` visually locked and move to the next page; only reopen cleanup here when a stricter diff-safe method is ready
- **Do Not Start Yet:** do not run another cleanup simplification pass on Equipment Requests markup or stat-card structure without explicit before/after proof that the render is unchanged

### 2026-04-08 | Codex | Equipment Requests Approval Lock And Level 1 Cleanup
### ٢٠٢٦-٠٤-٠٨ | كودكس | قفل اعتماد صفحة Equipment Requests وإنهاء تنظيف المستوى الأول

- **Phase:** Approved Page Cleanup
- **Summary of Completed Work:** Treated `equipment-requests.html` as visually approved and locked, then completed a non-visual Level 1 cleanup pass on the page owner only. Simplified the stat-card markup by removing the wrapper that existed only to support `display: contents`, and collapsed the duplicate stat-icon CSS ownership into a single selector block. No runtime behavior, layout structure, or rendered visual treatment was intentionally changed. Recorded the page state as: visual approval status = approved and locked; Level 1 cleanup status = complete; Level 2 extraction candidacy = deferred until another approved page proves the same patterns; approved shared candidates from this page = none promoted yet.
- **Key Files Or Surfaces Touched:** `src/pages/equipment-requests.html`, `src/styles/equipment-requests.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run build:assets`
- **Manual Checks Run:** captured before/after dark screenshots for `equipment-requests.html`, reviewed the approved render manually after cleanup, and verified the page still presents the same locked dark-mode appearance after the DOM/CSS simplification
- **Verification Snapshot:** the approved Equipment Requests page remains visually unchanged after Level 1 cleanup; the remaining change was structural simplification only
- **Regressions Or Risks Introduced:** none observed in the approved render; screenshot file hashes differed slightly, but manual visual review of the before/after captures showed no meaningful UI drift, indicating raster/runtime capture variance rather than a page appearance change
- **Next Recommended Task:** leave `equipment-requests.html` locked and choose the next page for implementation and approval; do not start shared extraction for this page until a second approved peer validates the same stable pattern
- **Do Not Start Yet:** do not widen Equipment Requests cleanup into shared extraction, token work, or visual polish unless the page is explicitly reopened

### 2026-04-08 | Codex | Master Plan Governance Update - Complete UI System (Master v1)
### ٢٠٢٦-٠٤-٠٨ | كودكس | تحديث حوكمة الخطة الرئيسية - نظام الواجهة الكامل (الإصدار الرئيسي 1)

- **Phase:** Master Plan Governance
- **Summary of Completed Work:** Added the full `Complete UI System (Master v1)` to this master plan as a governing standard for every page. The plan now explicitly codifies the locked philosophy for surface ownership, no-noise rules, canvas ownership, semantic color usage, spacing scale, interaction constraints, image/fallback behavior, dark-light parity, depth rules, pagination requirements, form and table rules, cleanup levels, regression protection, approval locking, development flow, audit criteria, and the master-control rule that AI and developers must match approved pages instead of inventing new styles. Also linked this system into the non-negotiable rules so it overrides older notes and becomes the required guide for all future page work.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; governance and standards update only
- **Manual Checks Run:** reviewed the non-negotiable rules and governance sections to ensure the new UI system is recorded as a standing source of truth rather than a one-off note
- **Verification Snapshot:** the master plan now contains a dedicated locked UI-system section that governs all future design, implementation, cleanup, and audit work page by page
- **Regressions Or Risks Introduced:** none at runtime; the only effect is stricter system control and clearer enforcement against style drift
- **Next Recommended Task:** enforce this UI system as the first reference during every future page audit and implementation pass, and reject any new work that conflicts with the locked login/home direction unless explicitly approved
- **Do Not Start Yet:** do not create parallel style guides or page-specific alternative systems that conflict with this master section

### 2026-04-08 | Codex | Home Approval Lock And Level 2 Gate Review
### ٢٠٢٦-٠٤-٠٨ | كودكس | قفل اعتماد صفحة home ومراجعة بوابة المستوى الثاني

- **Phase:** Level 2 Shared Extraction Governance
- **Summary of Completed Work:** Reviewed whether `home.html` can legitimately enter Level 2 shared extraction under the locked-governance rules. Confirmed that dark-mode `home.html` is now the approved and locked visual reference, and confirmed that its Level 1 cleanup was completed as a non-visual pass with byte-identical screenshot verification against the approved dark reference. Also confirmed that Level 2 shared extraction must remain blocked for now because there is not yet a second explicitly approved page in the same validated visual family to compare against `home.html`. Recorded the per-page tracking state for `home.html`: visual approval status = approved and locked in dark mode; Level 1 cleanup status = complete with no appearance change; Level 2 extraction candidacy = ready for comparison but blocked until a second approved peer exists; approved shared candidates from this page = none promoted yet because the patterns are not yet proven across another approved page.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; governance and rollout-state update only
- **Manual Checks Run:** reviewed the Level 2 governance rules, the current active phase block, the existing progress-log state, and the approved-page lock rule to confirm that forcing shared extraction from `home.html` alone would violate the standing workflow
- **Verification Snapshot:** `home.html` remains the locked dark-mode visual reference, Level 1 cleanup is complete, and Level 2 is correctly treated as blocked pending a second approved page in the same family or system
- **Regressions Or Risks Introduced:** none at runtime; the main risk avoided here is premature globalization of home-only visual decisions before another approved page proves the same pattern safely
- **Next Recommended Task:** choose and approve the next page in the same family or system, then compare it directly with the locked `home.html` reference to decide which repeated patterns are safe to promote into shared owners
- **Do Not Start Yet:** do not extract home section-shell, summary-card, tab-surface, or gateway-card behavior into shared CSS until a second approved peer explicitly validates the same pattern

### 2026-04-07 | Codex | Master Plan Governance Update - Theme Integrity Rule
### ٢٠٢٦-٠٤-٠٧ | كودكس | تحديث حوكمة الخطة الرئيسية - قاعدة سلامة الثيم

- **Phase:** Master Plan Governance
- **Summary of Completed Work:** Added a standing theme-integrity governance rule that makes light/dark separation mandatory on every page. The plan now explicitly forbids implementing theme behavior in page HTML, requires CSS-owner-only theme work, enforces dark-first verification per visual batch, blocks cross-mode leakage, and defines the required per-page workflow of dark baseline → dark lock → light implementation in parallel structure → dual-mode validation → approval.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; documentation/governance update only
- **Manual Checks Run:** reviewed the updated non-negotiable rules and governance workflow sections to confirm the rule is recorded as a standing rollout requirement
- **Verification Snapshot:** theme separation is now explicitly codified as a mandatory rollout rule. Future page work must keep theme behavior in CSS owners only, verify dark mode before light mode on every visual batch, and reject any cross-mode contamination before approval.
- **Regressions Or Risks Introduced:** none at runtime; the effect is stricter theme implementation discipline and clearer failure criteria
- **Next Recommended Task:** enforce this rule immediately on every ongoing and future page refinement, starting with the current home-page correction path

### 2026-04-07 | Codex | Master Plan Governance Update - Mandatory 3-Level Cleanup Workflow
### ٢٠٢٦-٠٤-٠٧ | كودكس | تحديث حوكمة الخطة الرئيسية - سير العمل الإلزامي للتنظيف عبر 3 مستويات

- **Phase:** Master Plan Governance
- **Summary of Completed Work:** Updated the rebranding master plan to make a mandatory 3-level cleanup and extraction workflow a standing rollout rule for every approved page. Added formal governance rules requiring Level 1 cleanup immediately after page approval, constrained Level 2 shared extraction to repeated validated patterns across approved pages, deferred Level 3 global cleanup to later milestone work, added per-page tracking requirements, added the rule that each new page rollout must classify temporary page-local pilot rules versus shared extraction candidates versus truly page-specific rules, and added reusable checklist templates for per-page cleanup, shared extraction, and global cleanup.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; documentation/governance update only
- **Manual Checks Run:** reviewed the updated non-negotiable rules, phased rollout section, governance rules, tracking requirements, and checklist templates to confirm the workflow is now recorded as a standing rule rather than a one-off note
- **Verification Snapshot:** the master plan now explicitly requires future approved pages to pass through Level 1 cleanup, records how Level 2 extraction may be triggered safely, and reserves Level 3 for later milestone cleanup. The reusable checklist templates are now part of the operating plan.
- **Regressions Or Risks Introduced:** none at runtime; the only effect is stricter rollout governance and cleanup discipline.
- **Next Recommended Task:** apply this governance model to the next approved page by recording its visual approval status, running Level 1 cleanup before moving on, and marking any validated shared extraction candidates without globalizing unproven page-local rules.

### 2026-04-07 | Codex | Home Visual Direction Pilot - Batch 1
### ٢٠٢٦-٠٤-٠٧ | كودكس | تجربة الاتجاه البصري لصفحة Home - الدفعة الأولى

- **Phase:** Visual Direction Pilot - Home Reference Only
- **Summary of Completed Work:** Implemented the first controlled `home.html` pilot pass using the approved login cinematic language as a reference without widening the entire `tabs` family. Added a `home-page` route hook, introduced explicit home pilot classes for the greeting content, workspace section, summary section, and workspace cards, replaced the home summary icon accent mapping with dedicated non-blue pilot classes, and applied a home-scoped surface treatment that flattens the greeting panel, welcome card, section shells, tabbar shell, workspace cards, summary cards, and refresh/button actions into a more contrast-led, restrained cinematic layer. The implementation was intentionally divided into pilot-local rules that can later be promoted into shared primitives instead of left as permanent page hacks.
- **Key Files Or Surfaces Touched:** `src/pages/home.html`, `src/styles/app.css`, `src/scripts/home.js`, `tests/theme/homeVisualPilotAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/homeVisualPilotAudit.test.js tests/theme/homeSecondaryPrimitiveAdoptionAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static audit of `home.html`, `app.css`, and `home.js` confirmed that the pilot is scoped behind `body.home-page`, that the page now exposes explicit pilot classes instead of implicit styling drift, and that the JS-rendered summary cards no longer use the old blue `bg-info/10 text-info` accent path.
- **Verification Snapshot:** the home pilot is now implemented as a controlled route-scoped layer rather than a tabs-family redesign. Targeted tests pass, the production build passes, and the full reservations baseline remains green.
- **Regressions Or Risks Introduced:** low-to-medium. The visual changes are scoped to `home-page`, but several of the resulting patterns are intentionally temporary until they are either promoted into shared owners or rejected after review.
- **Next Recommended Task:** review and approve `home.html` as the first post-login app reference page. If approved, extract the validated section shell, summary card accent treatment, and restrained tabbar shell into shared primitives before touching `customer.html` or `technician.html`.

### 2026-04-07 | Codex | Login Reference Light/Width/Bounce Refinement
### ٢٠٢٦-٠٤-٠٧ | كودكس | تنقيح الضوء/العرض/الارتداد لمرجع تسجيل الدخول

- **Phase:** Visual Direction Pilot - Login Reference Only
- **Summary of Completed Work:** Applied a narrow login-only refinement pass without changing structure or direction. Light mode was substantially softened away from a bright clinical white treatment, the form column and its controls were tightened to read more tailored and elegant, and the auth route’s underlying `html/body` canvas was explicitly aligned to the auth-page base so dark-mode overscroll no longer reveals a lighter page background underneath.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** confirmed live login rendering on `http://127.0.0.1:4177/src/pages/login.html` and captured a fresh dark screenshot at `/tmp/art-ratio-post-stabilization-audit/login-contrast-refined.png`
- **Verification Snapshot:** targeted auth/theme audits pass, the production build passes, and the full reservations baseline remains green at `102 passed | 1 skipped` test files and `1028 passed | 6 skipped` tests. The live login screenshot confirms tighter control width, softer light treatment, and a stable dark overscroll canvas.
- **Regressions Or Risks Introduced:** low. This pass is auth-scoped and limited to login-page surface tuning plus auth-route root canvas ownership.
- **Next Recommended Task:** review this refined login reference visually before any further login-only micro-tuning or any rollout decision.

### 2026-04-07 | Codex | Login Reference Contrast Tuning
### ٢٠٢٦-٠٤-٠٧ | كودكس | ضبط التباين لمرجع تسجيل الدخول

- **Phase:** Visual Direction Pilot - Login Reference Only
- **Summary of Completed Work:** Applied a narrow contrast-only tuning pass to the approved login reference without changing structure or reopening redesign. The auth page base was darkened slightly, panel surfaces were lifted a step for clearer separation, input fields were pushed darker than the panel, the primary login action was strengthened for clearer presence, border opacity was raised slightly for cleaner edge definition, supporting text hierarchy was tightened, and a very subtle inset highlight was added to the main auth panels to improve edge readability without introducing glow or gradients.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/darkSurfaceRefinementAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** visual review was limited to the login reference contract and its dark-mode surface hierarchy after the contrast-only adjustment.
- **Verification Snapshot:** the login page remains cinematic and restrained, but now reads with better separation between page, panel, field, and action layers. Targeted audits pass, the production build passes, and the full reservations baseline stays green.
- **Regressions Or Risks Introduced:** low. This pass is auth-scoped and limited to contrast tuning; no structural or cross-page visual shift was introduced.
- **Next Recommended Task:** review the tuned login reference visually. If approved, keep this as the exact baseline before any broader rollout from the login page.

### 2026-04-07 | Codex | Visual Direction Pilot - Login Cinematic Reference
### ٢٠٢٦-٠٤-٠٧ | كودكس | تجربة الاتجاه البصري - المرجع السينمائي لصفحة تسجيل الدخول

- **Phase:** Visual Direction Pilot - Login Reference Only
- **Summary of Completed Work:** Implemented the approved cinematic core with restrained glow on `login.html` only, using the approved palette and keeping the rest of the application frozen. The auth page background was flattened to the near-solid `#091008` base, the top auth chrome was rebuilt as a restrained architectural bar instead of a glass/glow treatment, the hero and form panels were simplified into clearer flat surfaces, the nested inner form shell was removed, inputs were darkened and cleaned to use border clarity over soft bloom, and the primary button was tightened into a solid accent action with only a controlled focus/hover ring. Decorative auth chrome like the palette strip was explicitly suppressed. No other page was redesigned.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/darkSurfaceRefinementAudit.test.js`, `tests/theme/secondaryPrimitiveContractAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** reviewed a fresh live dark-mode login screenshot captured from `http://127.0.0.1:4177/src/pages/login.html` at `/tmp/art-ratio-post-stabilization-audit/login-cinematic-reference.png`
- **Verification Snapshot:** The login page now reads as restrained cinematic rather than glossy: the muddy global auth wash is gone, the header is flatter and more architectural, panel surfaces are cleaner, fields no longer carry cloud-like inner glow, the primary button is solid and controlled, and no visible blue accent was introduced on this screen. The targeted auth/theme audits pass, the production build passes, and the full reservations baseline remains green after updating one stale table-shell audit to match the stabilized ownership rule.
- **Regressions Or Risks Introduced:** low. The visual implementation is auth-scoped inside `src/styles/app.css`; the only shared-owner impact is that one stale audit was updated to match the current stabilized table-shell selector contract. No broad app styling or business logic changed.
- **Next Recommended Task:** review and approve `login.html` as the reference screen. Do not spread this direction to other pages until that approval is explicit.

### 2026-04-07 | Codex | Post-Stabilization Visual Verification Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة التحقق البصري بعد الاستقرار

- **Phase:** Stabilization Complete - Awaiting Visual Direction Decision
- **Summary of Completed Work:** Ran a final live visual stabilization pass against the rendered dashboard and shared shell surfaces instead of relying on source cleanup alone. The pass removed the remaining runtime-injected blue/navy sidebar and dashboard fallback gradients from `src/scripts/ui/injectSidebarStyles.js`, deleted an older conflicting dark `::before` glow rule for customer/technician table wrappers in `src/styles/app.css`, and resolved the last live double-owned table shell by excluding generic `ui-table-shell` chrome from `customer-table-wrapper` and `technician-table-wrapper` nodes that already own their own surface contract. The stale dark-surface audit was also updated to match the verified current shared token values.
- **Key Files Or Surfaces Touched:** `src/scripts/ui/injectSidebarStyles.js`, `src/styles/app.css`, `tests/theme/darkSurfaceRefinementAudit.test.js`, `tests/theme/dashboardGreenChromeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js tests/theme/sharedGreenChromeAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/tokenBridgeRationalizationAudit.test.js`, `npx vitest run tests/theme/dashboardGreenChromeAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** captured fresh live dark dashboard screenshots with `scripts/manual-dark-smoke.mjs` before and after the pass and verified that the last visible blue glow band under the customer-table shell was removed in the final rendered result
- **Verification Snapshot:** Post-stabilization visual verification is green. The targeted audits pass, the production build passes, and `npm run test:reservations` passes fully at `102 passed | 1 skipped` test files and `1028 passed | 6 skipped` tests. The final live dashboard verification no longer shows the previous blue/navy fallback band under the reservation/customer table area.
- **Regressions Or Risks Introduced:** none. This pass tightened runtime fallback ownership and removed one conflicting table-shell path, but it did not change business logic or begin any visual-direction work.
- **Next Recommended Task:** do not reopen stabilization by default. Move to the explicit visual-direction decision point only when ready:
  - Path A: architectural / cinematic
  - Path B: glossy / glowy

### 2026-04-07 | Codex | Stabilization Batch 15 - Closeout
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الخامسة عشرة من التثبيت - الإغلاق

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 15 as the stabilization closeout pass. Reviewed the deletion ledger, confirmed the intentionally frozen module contracts and scaffolding selectors, re-ran the shared stabilization subset, re-ran the production build, and re-ran the full reservations baseline. The result is that stabilization is now closed and the project is ready for the post-stabilization visual-direction decision point.
- **Key Files Or Surfaces Reviewed:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, the existing deletion/freeze ledgers, and the shared stabilization audit suite.
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Closeout is green. Shared stabilization audits pass, the production build passes, and the full reservations baseline passes at `102 passed | 1 skipped` test files and `1028 passed | 6 skipped` tests.
- **Regressions Or Risks Introduced:** none. This was a closeout/governance pass only.
- **Next Recommended Task:** stop stabilization work and choose the post-stabilization visual direction explicitly:
  - Path A: architectural / cinematic
  - Path B: glossy / glowy
  Do not start either path until instructed.

### 2026-04-07 | Codex | Stabilization Batch 14 - Deferred Bridge Freeze
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الرابعة عشرة من التثبيت - تجميد الجسور المؤجلة

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 14 of the stabilization roadmap by re-auditing the remaining deferred bridge selectors and explicitly classifying them. The key result is that most of the remaining selectors in `src/styles/maintenance.css` and `src/styles/reservations.css` are now legitimate module contracts or layout-only scaffolding, not unresolved bridge instability. No runtime CSS or markup changed in this batch.
- **Key Files Or Surfaces Reviewed:** `src/styles/maintenance.css`, `src/styles/reservations.css`, `src/pages/dashboard.html`, `src/scripts/reservations/modals.js`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js`
- **Verification Snapshot:** Batch 14 is closed. The freeze classification is recorded in the master plan and enforced by the stabilization audit. No new visual or behavioral regression risk was introduced because this was a classification pass only.
- **Manual Checks Run:** source review of remaining maintenance and reservation bridge-adjacent selectors, including `.maintenance-status-filter`, `.maintenance-filter-control`, `.reservation-billing-input`, `.reservation-billing-select`, `.payment-status-select`, `.reservation-payment-progress__actions .btn-outline-primary`, `.btn-confirm-toggle`, `.filters-bar`, and `#create-tab` control-alignment rules.
- **Regressions Or Risks Introduced:** none at runtime. The main constraint introduced is governance: the frozen selectors should not be reopened as “bridge debt” unless a later audit shows they are blocking a verified simplification.
- **Next Recommended Task:** start Batch 15 only after acceptance: perform stabilization closeout by reviewing the deletion ledger, confirming what remains intentionally frozen, and deciding whether the system is ready to exit stabilization and move to the visual-direction decision point.

### 2026-04-07 | Codex | Stabilization Batch 13 - Owner Move
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الثالثة عشرة من التثبيت - نقل الملكية

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 13 of the stabilization roadmap by moving deferred control chrome onto the dedicated module-owner hooks prepared in Batch 12. In `src/styles/maintenance.css`, maintenance filter chrome now belongs to `.maintenance-filter-control` while the wrapper bridge selectors keep only layout behavior. In `src/styles/reservations.css`, edit payment-progress chrome now belongs to `.reservation-payment-progress__control` while the existing `__select` and `__input` selectors keep only size/layout behavior. No visual-direction change was introduced.
- **Key Files Or Surfaces Touched:** `src/styles/maintenance.css`, `src/styles/reservations.css`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 13 is closed. The owner move is enforced by the stabilization audit, the production build passes, and the full reservations baseline remains green after the narrow CSS ownership move.
- **Manual Checks Run:** source verification that `.maintenance-status-filter .form-select` / `.form-control` now keep only layout behavior while `.maintenance-filter-control` owns chrome, and that `.reservation-payment-progress__select` / `.reservation-payment-progress__input` now keep only size/layout while `.reservation-payment-progress__control` owns chrome.
- **Regressions Or Risks Introduced:** low-to-medium. The new hooks now matter for runtime styling, so future maintenance or reservation control variants should reuse them rather than re-expanding shared bridge selectors. The remaining risk is limited to still-deferred bridge selectors that have not yet gone through the same owner-preparation pattern.
- **Next Recommended Task:** start Batch 14 only after acceptance: re-audit the remaining deferred bridge selectors in `src/styles/maintenance.css` and `src/styles/reservations.css`, then either explicitly freeze the ones that are legitimate module contracts or prepare the next narrow owner path where a real reduction is still possible.

### 2026-04-07 | Codex | Stabilization Batch 12 - Markup Owner Preparation
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الثانية عشرة من التثبيت - تهيئة مُلّاك الـ Markup

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 12 of the stabilization roadmap by adding dedicated future owner hooks to live markup only, without changing visual behavior. The maintenance filters on the dashboard now expose `maintenance-filter-control` hooks, and the edit-reservation payment-progress controls now expose `reservation-payment-progress__control` hooks in both the live dashboard modal markup and the script-rendered modal template. This prepares the next consolidation batch to move CSS ownership safely without guessing from raw shared bridge classes.
- **Key Files Or Surfaces Touched:** `src/pages/dashboard.html`, `src/scripts/reservations/modals.js`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js`
- **Verification Snapshot:** Batch 12 is closed. The markup-owner preparation hooks are recorded and enforced by the stabilization audit. No CSS owner or visual contract changed in this batch.
- **Manual Checks Run:** source verification of the live maintenance filter markup, create-reservation controls, and edit-reservation modal markup in both `dashboard.html` and `src/scripts/reservations/modals.js` to ensure the new hooks were added only where the deferred bridge inventory required them.
- **Regressions Or Risks Introduced:** low. The new classes are no-op hooks until a later CSS batch uses them. The only constraint introduced is that later consolidation should target these hooks first instead of extending the old bridge selectors again.
- **Next Recommended Task:** start Batch 13 only after acceptance: move maintenance filter chrome and edit-reservation payment-progress chrome onto the new markup-owner hooks in `src/styles/maintenance.css` and `src/styles/reservations.css`, while preserving the current visual contract.

### 2026-04-07 | Codex | Stabilization Batch 11 - Deferred Bridge Inventory
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الحادية عشرة من التثبيت - جرد الجسور المؤجلة

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 11 of the stabilization roadmap as an inventory/classification pass only. Verified that the remaining deferred bridge selectors in `src/styles/maintenance.css` and `src/styles/reservations.css` are not safe deletion or consolidation targets yet because the live markup still relies on raw shared bridge classes in those areas. The key finding is architectural: maintenance filters and edit-reservation payment progress controls need dedicated module-owner hooks in markup before further bridge consolidation can happen safely.
- **Key Files Or Surfaces Reviewed:** `src/styles/maintenance.css`, `src/styles/reservations.css`, `src/pages/dashboard.html`, `src/scripts/reservations/modals.js`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js`
- **Verification Snapshot:** Batch 11 is closed. The inventory is now recorded in the master plan and enforced by the stabilization audit. No runtime CSS or markup behavior changed in this batch.
- **Manual Checks Run:** source audit of `.maintenance-status-filter .form-select` / `.form-control`, `.reservation-billing-input`, `.reservation-billing-select`, `.payment-status-select`, `.reservation-payment-progress__select`, `.reservation-payment-progress__input`, and `#create-tab .reservation-field > .form-control` / `.form-select` against current dashboard markup and script-rendered edit-reservation modal markup.
- **Regressions Or Risks Introduced:** none at runtime. The only new constraint is explicit: future consolidation in these areas must start by introducing markup-level owners, not by further shrinking CSS bridges blindly.
- **Next Recommended Task:** start Batch 12 only after acceptance: add dedicated module-owner hooks for the still-deferred maintenance filter controls and edit-reservation payment-progress controls in the live markup/scripts, without changing their visual contract yet.

### 2026-04-07 | Codex | Stabilization Batch 10 - Customer Search Bridge Consolidation
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة العاشرة من التثبيت - ترشيد جسر بحث العملاء

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 10 of the stabilization roadmap by narrowing one more live compatibility bridge where the module already had a dedicated owner. In `src/styles/forms.css`, the generic `.management-search-bar .form-control` selector no longer owns customer-search chrome. It now keeps only width and flex layout behavior, while the existing dedicated owner `#customers-tab #search-customer-input.form-control` carries the customer-search surface, sizing, and focus/dark contract used by the live dashboard and projects customer-search flows. No maintenance or reservation bridge refactor was forced because those remaining cases still lack a safe dedicated-owner migration path.
- **Key Files Or Surfaces Touched:** `src/styles/forms.css`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/sharedGreenChromeAudit.test.js tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 10 is closed. The targeted audits pass, the production build passes, and `npm run test:reservations` remains green after the narrow customer-search consolidation.
- **Manual Checks Run:** source audit of live `.management-search-bar`, `#search-customer-input`, `.maintenance-status-filter`, `.reservation-billing-input`, and `.reservation-payment-progress__*` ownership across current dashboard/projects markup and reservation modal markup to confirm where a dedicated module owner already existed and where the remaining bridge selectors still need to stay deferred.
- **Regressions Or Risks Introduced:** low. The customer-search flows on dashboard and projects now depend more explicitly on `#search-customer-input.form-control` as the dedicated module owner, so future search variants should either reuse that owner or introduce a new dedicated module class instead of re-expanding the generic bridge.
- **Next Recommended Task:** start Batch 11 only after acceptance: inventory the still-deferred live bridge selectors in `src/styles/maintenance.css` and `src/styles/reservations.css`, classify which require markup-level dedicated owners before any further consolidation, and keep rollout and redesign frozen.

### 2026-04-07 | Codex | Stabilization Batch 9 - Live Bridge Consolidation
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة التاسعة من التثبيت - ترشيد الجسور الحية

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 9 of the stabilization roadmap by consolidating live compatibility bridges where a dedicated module class already existed. In `src/styles/reports.css`, the report-filter chrome now belongs to `.reports-filter-control`; the bridge selectors `.reports-filters .form-control` and `.reports-filters .form-select` now keep only the layout/scaffolding role they still need for shared filter-row behavior. In `src/styles/forms.css`, the dark `.management-form-actions .btn-primary` duplicate contract was removed so the shared `.btn-primary` layer owns dark button chrome while the form module keeps only sizing and layout. No broad deletion or redesign work was done.
- **Key Files Or Surfaces Touched:** `src/styles/reports.css`, `src/styles/forms.css`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/sharedGreenChromeAudit.test.js tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 9 is closed. The targeted audits pass, the production build passes, and `npm run test:reservations` remains green after the narrow bridge consolidation.
- **Manual Checks Run:** source audit of `.btn`, `.form-control`, and `.form-select` ownership across `src/styles/core.css`, `src/styles/app.css`, `src/styles/reports.css`, `src/styles/forms.css`, and `src/styles/maintenance.css` to isolate where a dedicated module class already existed and could take over chrome ownership without changing active markup.
- **Regressions Or Risks Introduced:** low-to-medium. The report filters still changed owner, so future work must keep `.reports-filter-control` as the authoritative module owner. The remaining risk is still architectural: many bridge selectors are live because no dedicated module class exists yet.
- **Next Recommended Task:** start Batch 10 only after acceptance: continue owner-by-owner live-bridge consolidation where a dedicated module class already exists, starting with remaining form/control cases in `src/styles/forms.css`, `src/styles/maintenance.css`, and `src/styles/reservations.css`, while keeping rollout and redesign frozen.

### 2026-04-07 | Codex | Stabilization Batch 8 - Secondary Owner Compatibility Alias Review
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الثامنة من التثبيت - مراجعة الـ Compatibility Aliases في المالكين الثانويين

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 8 of the stabilization roadmap by reviewing the secondary style owners and deleting only the one compatibility alias branch that was provably dead. `src/styles/index.css` no longer contains the `.users-page .input-group-text` light/dark overrides because the current users page and its script-rendered markup no longer render any `input-group-text` element. The rest of the secondary-owner compatibility selectors in `src/styles/reports.css`, `src/styles/forms.css`, and `src/styles/maintenance.css` were explicitly kept because they are still live module contracts used by current reports, dashboard, projects, customer, and maintenance markup. `src/styles/calendar.css` had no compatibility-alias cleanup target in this batch.
- **Key Files Or Surfaces Touched:** `src/styles/index.css`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 8 is closed. The token-bridge audit now records the secondary-owner alias review, the production build passes, and `npm run test:reservations` remains green after the narrow `index.css` cleanup.
- **Manual Checks Run:** source scan across `src/pages`, `src/scripts`, and the secondary-owner styles to distinguish dead compatibility aliases from still-live module contracts. Confirmed that the users-page `input-group-text` branch had zero live references, while reports, forms, and maintenance compatibility selectors remain active in current page markup and scripts.
- **Regressions Or Risks Introduced:** low. The removed selector had zero current usage. Remaining risk is architectural: most compatibility aliases are still live bridges, so further deletion work must continue owner by owner instead of assuming the secondary layer is broadly removable.
- **Next Recommended Task:** start Batch 9 only after acceptance: review the remaining live compatibility bridges for consolidation candidates, starting with shared `.btn` / `.form-control` / `.form-select` usage patterns and any zero-reference rules that emerge from the next owner-by-owner scan, while keeping rollout and redesign frozen.

### 2026-04-07 | Codex | Stabilization Batch 7 - Primary Compatibility Alias Review
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة السابعة من التثبيت - مراجعة الـ Compatibility Aliases في المالكين الأساسيين

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 7 of the stabilization roadmap by reviewing compatibility aliases in the primary owners and deleting only the provably dead ones. `src/styles/app.css` had five zero-reference spacing utility aliases removed from the legacy Bootstrap helper block (`.mt-5`, `.my-3`, `.my-4`, `.py-4`, `.px-4`) plus the dead `.input-group-text` dark override that no current page, script-rendered markup, or active primary-owner bridge was using. The live compatibility alias families such as `.btn`, `.form-control`, `.form-select`, `.table-responsive`, `.card`, `.badge`, and the still-used flex/justify/margin helpers remain intentionally deferred and were recorded in the Batch 7 ledger instead of being removed blindly.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 7 is closed. The token-bridge audit now asserts the dead primary-owner compatibility aliases are gone while the live bridge aliases remain documented and present. The production build passes, and `npm run test:reservations` stays green after the narrow alias cleanup.
- **Manual Checks Run:** source scan across `src/pages`, `src/scripts`, and the primary-owner styles to distinguish zero-reference aliases from still-live compatibility bridges before deletion. Confirmed that the removed spacing helpers and `.input-group-text` dark override had no live references, while `.d-flex`, `.justify-content-*`, `.ms-auto`, `.btn-outline-secondary`, `.form-control`, `.form-select`, `.table-responsive`, `.card`, and `.badge` remain in active use.
- **Regressions Or Risks Introduced:** low. The removals were limited to selectors with zero current source references. The remaining risk is not from the deleted aliases, but from the still-live compatibility layer in the secondary owners and the broader owner-by-owner deletion review.
- **Next Recommended Task:** start Batch 8 only after acceptance: review compatibility aliases in the secondary owners (`src/styles/reports.css`, `src/styles/forms.css`, `src/styles/calendar.css`, `src/styles/index.css`, and `src/styles/maintenance.css`) so the deletion ledger can continue shrinking without touching active primary-owner bridges or page rollout.

### 2026-04-07 | Codex | Stabilization Batch 6 - Token Bridge Rationalization And First Deletion Ledger
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة السادسة من التثبيت - ترشيد طبقة الـ Token Bridge وبناء أول سجل حذف

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 6 of the stabilization roadmap by shrinking the shared bridge layer without touching visual direction. `src/styles/core.css` had the truly dead bridge tokens removed after verification that they had zero live runtime references in the active authored frontend: `--clr-success`, `--clr-danger`, `--clr-warning`, `--bo-brand-primary-strong`, `--bo-brand-accent`, `--bo-brand-info`, `--bo-radius-surface`, `--bo-radius-control`, `--bo-shadow-surface`, and `--bo-shadow-elevated`. The remaining primitive-card bridge stayed intact, but its radius token was rationalized so `--bo-primitive-card-radius` now points directly to `--radius-lg` instead of an extra alias hop. The only live consumer of `--bo-radius-control` in `src/styles/app.css` was also collapsed back to `--radius-md`. The plan now includes the first verified deletion ledger that separates deleted bridge tokens from deferred live compatibility aliases such as `.btn`, `.form-control`, `.table-responsive`, `.card`, and `.badge`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `tests/theme/tokenBridgeRationalizationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tokenBridgeRationalizationAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 6 is closed. The new token-bridge rationalization audit is green together with the existing migration/foundation/primitive audits, the production build passes, and `npm run test:reservations` remains fully green (`101 passed | 1 skipped` test files; `1021 passed | 6 skipped` tests). The shared stabilization baseline remains closed after the bridge-layer reduction.
- **Manual Checks Run:** source-level audit of `core.css` token definitions and cross-file references in the primary owners to distinguish truly dead bridge tokens from still-live compatibility aliases before deletion. Also verified that the remaining pinned bridge tokens (`--bo-brand-secondary`, `--bo-brand-border`, `--bo-primitive-card-*`) are still required by the documented primitive contract and current audits.
- **Regressions Or Risks Introduced:** no runtime or audit regressions were introduced. Remaining stabilization risk has shifted from dead bridge-token sprawl to live compatibility aliases that are still intentionally needed by current page markup.
- **Next Recommended Task:** start Batch 7 only after acceptance: review compatibility aliases in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css` owner by owner, classify which aliases must stay versus which can move into the deletion ledger next, and keep rollout, redesign, semantic/status badge work, and compact reservation-detail palette work frozen.

### 2026-04-07 | Codex | Stabilization Batch 5 - Shared Surface Ownership Cleanup
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الخامسة من التثبيت - تنظيف ملكية الأسطح المشتركة

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 5 of the stabilization roadmap by cleaning real surface-ownership conflicts instead of continuing any visual-direction work. `src/styles/app.css` now treats the generic `.table-wrapper` as structural only rather than another shell owner, so inner table shells remain the single visual owner. `src/styles/reservations.css` now treats `.reservation-details .reservation-info-card` as layout-only inside the already-owned reservation detail section, removing the duplicate background, border, radius, and shadow that previously created nested card anatomy. The ownership audits were expanded to assert both contracts directly.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `src/styles/reservations.css`, `tests/theme/sharedShellSurfaceOwnershipAudit.test.js`, `tests/theme/dashboardGreenChromeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 5 is closed. The shared ownership audit, dashboard reservation audit, details audit, and global shadow audit are green together; the production build passes; and `npm run test:reservations` remains fully green (`101 passed | 1 skipped` test files; `1020 passed | 6 skipped` tests). The shared stabilization baseline remains closed after the ownership cleanup.
- **Manual Checks Run:** source-level audit of `app.css` shared shell owners, shared table wrapper contracts, reservation detail wrapper/card anatomy, reservation table wrappers, and quote-preview ownership before narrowing the changes to the actual duplicated surface owners.
- **Regressions Or Risks Introduced:** no new runtime or audit regressions were introduced. Remaining stabilization risk has shifted from wrapper/card surface competition to token overlap and legacy compatibility aliases that still make the bridge layer larger than necessary.
- **Next Recommended Task:** start Batch 6 only after acceptance: rationalize the shared token bridge and build the first verified deletion ledger in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css`, while keeping rollout, redesign, semantic/status badge work, and compact reservation-detail palette work frozen.

### 2026-04-07 | Codex | Stabilization Batch 4 - Elevation Model Simplification
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الرابعة من التثبيت - تبسيط نموذج الارتفاع

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 4 of the stabilization roadmap by simplifying the shared dark elevation model instead of continuing visual-direction work. `src/styles/core.css` now carries a lighter dark depth contract: the shared shell/content/tab/action/control shadow tokens were reduced, the dark content gradient and active-tab gradient were reconciled to the intended tonal-depth values, and the primitive button shadows were narrowed so fewer layers compete by default. `src/styles/reservations.css` was then aligned to that model by moving the dark reservation tiles, create-tab meta cards, reservation preview blocks, and edit summary block back onto the shared content tokens instead of their own heavier local dark shadows. The stale source audit that still pinned the old dark shadow contract was updated to the new verified stabilization baseline.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/reservations.css`, `tests/theme/globalSurfaceShadowAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/sharedGreenChromeAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/detailsPageAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 4 is closed. The dark-surface refinement audit and the global surface shadow audit are green together, the production build passes, and `npm run test:reservations` now passes fully (`101 passed | 1 skipped` test files; `1019 passed | 6 skipped` tests). The shared stabilization baseline is no longer blocked by failing audits.
- **Manual Checks Run:** source-level audit of the dark depth tokens in `core.css` and the main dark reservation surfaces that still bypassed them, plus a pass over the remaining direct-shadow owners to confirm the next cleanup should move to ownership rather than more token tuning.
- **Regressions Or Risks Introduced:** no new runtime or audit regressions remain after the stale shadow-audit expectations were updated to the verified reduced-depth contract. Remaining risk is structural: multiple wrappers and inner cards still create surface identity in the same areas even though the baseline tokens are now calmer.
- **Next Recommended Task:** start Batch 5 only after acceptance: clean shared surface ownership in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css` so wrappers stop competing with inner cards/panels, while keeping semantic/status palettes and compact reservation-detail palette work frozen.

### 2026-04-07 | Codex | Stabilization Batch 3 - Primary Owner Literal Purge
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الثالثة من التثبيت - إزالة التسربات اللونية من المالكين الأساسيين

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 3 of the stabilization roadmap by purging accidental blue/navy chrome from the primary shared owners instead of continuing broad recolor passes. `src/styles/core.css` was cleaned where shared project reservation chrome, project code accents, shared soft-secondary button ink, and the datepicker “today” state were still leaking the old blue contract outside semantic chip/status families. `src/styles/app.css` was cleaned where management-form and notes textareas still carried the old blue dark block instead of the shared control token family. `src/styles/reservations.css` was cleaned where reservation tiles, reservation meta cards, summary-list cards, technician chips, reservation item cards, edit-linked pills, and the non-semantic reservation info-row highlight still depended on old blue/navy literals. The compact reservation-detail card palette and status/badge families were intentionally not recolored in this batch and remain explicitly frozen.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `src/styles/reservations.css`, `tests/theme/dashboardGreenChromeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/sharedGreenChromeAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/detailsPageAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 3 is closed. The targeted shared/dashboard/primitive/details audits are green after the owner-based literal purge, the production build passes, and the broad baseline is back to the single remaining stabilization failure in `tests/theme/darkSurfaceRefinementAudit.test.js`. No additional broad-suite regressions were introduced by this batch.
- **Manual Checks Run:** source-level literal scan across `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css` to separate accidental chrome leakage from intentionally frozen status/badge families and compact reservation-detail palette blocks before replacement.
- **Regressions Or Risks Introduced:** one source audit (`dashboardGreenChromeAudit.test.js`) initially pinned a stale compact-detail blue gradient and had to be updated to reflect the real stabilization rule: preserve structural ownership without forcing one exact compact-detail palette literal. Remaining risk is that the shared elevation model is still overloaded and the frozen semantic/compact-detail pockets can still visually feel older until the later decision point.
- **Next Recommended Task:** start Batch 4 only after acceptance: simplify the shared elevation model in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css`, reconcile the remaining `tests/theme/darkSurfaceRefinementAudit.test.js` expectation against the intended tonal-depth contract, and keep semantic/status palettes plus compact reservation-detail palette work frozen until after stabilization.

### 2026-04-07 | Codex | Stabilization Batch 2 - Shared Control Contract Cleanup
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الثانية من التثبيت - تنظيف عقد عناصر التحكم المشتركة

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 2 of the stabilization roadmap by re-closing shared control ownership around `input`, `select`, and `textarea` chrome instead of letting `core.css`, `app.css`, and reservation-specific textarea families keep competing contracts. `src/styles/core.css` no longer hardcodes old blue dark textarea and `.form-control`/`.form-select` states; its generic controls now defer to the shared control token family for border, background, focus, placeholder, and shadow behavior. `src/styles/app.css` now explicitly owns the shared primitive focus contract for `.ui-input`, `.ui-textarea`, `.form-control`, `.form-textarea`, and the shared select family in both base and dark states, so the primitives no longer depend on the older generic `core.css` focus behavior to look correct. `src/styles/reservations.css` no longer keeps separate blue textarea chrome for quote terms, reservation notes, and reservation terms; those local textareas now retain only their geometry/content rules while consuming the same shared control token family as the rest of the app.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `src/styles/reservations.css`, `tests/theme/primitiveContractAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/primitiveContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/detailsPageAudit.test.js`, `npx vitest run tests/theme/primitiveContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/phase4FoundationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 2 is closed. The targeted primitive/auth/details audits now pass with the tighter control ownership assertions, and the production build passes. The broad baseline is still not fully green, but it did not pick up any new control regressions from this batch; the remaining failures are still the known stabilization baselines in `tests/theme/darkSurfaceRefinementAudit.test.js` and `tests/theme/phase4FoundationAudit.test.js`.
- **Manual Checks Run:** source-level audit of the current control owners in `core.css`, `app.css`, and `reservations.css`, including generic input/select/textarea rules, primitive focus ownership, shared autofill coverage, reservation textarea families, and dark placeholder/focus behavior before replacement.
- **Regressions Or Risks Introduced:** no runtime behavior regression detected in the targeted primitive audits, build, or broad baseline beyond the pre-existing stabilization failures. Remaining risk is that owner-based blue/navy literals and the overloaded elevation model still sit above the cleaner control contract, so rollout must stay frozen.
- **Next Recommended Task:** start Batch 3 only after acceptance: purge owner-based blue/navy literal leakage in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css`, then widen to the secondary owners once the primary shared files are clean.

### 2026-04-07 | Codex | Stabilization Batch 1 - Dark Selector Re-Closure
### ٢٠٢٦-٠٤-٠٧ | كودكس | الدفعة الأولى من التثبيت - إعادة إغلاق عقد الـ Dark Selector

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Completed Batch 1 of the stabilization roadmap by re-closing the shared dark-selector contract in the real owner files instead of pushing more page cleanup. `src/styles/core.css` now uses the canonical `:where(...)` contract for the root dark token block, shared heading ink, and dark page/body ownership. `src/styles/app.css` no longer keeps direct root dark selectors for the shared page surface or the equipment-details cluster, and the remaining owner-level dark blocks touched in this batch were normalized from `:is(...)` to the canonical `:where(...)` contract. `src/styles/reservations.css` no longer mixes the shortened dark selector variant that omitted `.dark-mode` in the tracked shared reservation blocks. The selector-sensitive regression audit for shared shell surface ownership was also updated to assert the canonical contract instead of the old direct-root strings.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `src/styles/reservations.css`, `tests/theme/sharedShellSurfaceOwnershipAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** Batch 1 is closed. The targeted selector audits now pass, the production build passes, and the broad baseline no longer fails `tests/theme/darkSelectorContract.test.js`, `tests/theme/styleAudit.test.js`, or `tests/theme/tabsFamilyDarkModeAudit.test.js`. The full suite is still not fully green; remaining failures after this batch are `tests/theme/darkSurfaceRefinementAudit.test.js` and `tests/theme/phase4FoundationAudit.test.js`, which are separate stabilization concerns rather than unresolved selector-contract drift.
- **Manual Checks Run:** source-level audit of `core.css`, `app.css`, and `reservations.css` for direct root dark selectors, shortened `:where(...)` variants, and `:is(...)` dark-owner drift before replacement.
- **Regressions Or Risks Introduced:** no runtime behavior regression detected in the targeted selector audits or build. Remaining risk is that the shared visual system still carries non-selector stabilization debt, so rollout must stay frozen even though Batch 1 itself is complete.
- **Next Recommended Task:** start Batch 2 only after acceptance: shared control contract cleanup across `input`, `select`, and `textarea` dark/focus states in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css`.

### 2026-04-07 | Codex | Stabilization Phase Kickoff
### ٢٠٢٦-٠٤-٠٧ | كودكس | إطلاق مرحلة تثبيت النظام قبل الاتجاه البصري

- **Phase:** System Stabilization Before Visual Direction
- **Summary of Completed Work:** Converted the redesign program from an implicit “continue low-risk rollout while cleaning shared drift” posture into an explicit stabilization-first phase. Added a new top-level phase for system stabilization before visual direction, froze further page rollout and decorative redesign work, documented allowed versus blocked work, recorded the risk map and file-by-file owner order, and locked the first cleanup batch to dark-selector contract re-closure only.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; documentation and execution-order update only
- **Verification Snapshot:** the plan now explicitly reflects the current truth baseline from the forensic audit: the system is mixed, the page rollout is frozen, and the next implementation work must start from shared selector/control/ownership cleanup rather than more page styling.
- **Manual Checks Run:** static comparison of the current active phase, visual-direction notes, open blockers, and next-task guidance against the latest forensic audit findings and failing baseline tests.
- **Regressions Or Risks Introduced:** no runtime code changed. The only immediate delivery impact is stricter freeze discipline: page beautification and new visual-direction work are now intentionally blocked until stabilization succeeds.
- **Next Recommended Task:** execute Batch 1 only: re-close the dark-selector contract in `src/styles/core.css`, `src/styles/app.css`, and `src/styles/reservations.css`, then reconcile the linked failing dark audit files against the verified contract.

### 2026-04-07 | Codex | Forensic UI System Audit Refresh
### ٢٠٢٦-٠٤-٠٧ | كودكس | تحديث جنائي لحالة نظام الواجهة والخطة الرئيسية

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Refreshed the master plan against the actual repository state instead of relying on stale log assumptions. Verified that shell extraction is genuinely present across the compact, tabs, and full families via the shared partials, and confirmed that the `ui-*` primitive bridge is real but unevenly adopted across pages and scripts. The token ownership model is still centralized in `src/styles/tailwind-theme.css` plus `src/styles/core.css`, but the older counts recorded in this plan are no longer accurate (`17` unique `--color-*`, `98` unique `--bo-*`, `6` unique `--clr-*` in the current source). The larger finding is that the shared visual system remains mixed: direct `html.dark …` selectors still exist in `src/styles/app.css`, the global dark token block in `src/styles/core.css` no longer matches the canonical selector contract expected by the audit suite, and live blue/navy literals still exist in shared and feature owners such as `core.css`, `reservations.css`, `reports.css`, `calendar.css`, `forms.css`, `index.css`, and `maintenance.css`.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/sharedGreenChromeAudit.test.js tests/theme/dashboardGreenChromeAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** historical snapshot from 2026-04-07, superseded by the 2026-05-13 closeout/audit. Current evidence is `npx vitest run tests/theme` passing `44 / 44` files and `156 / 156` tests, including the dark selector and dark surface contracts, plus `npm run build:assets` passing.
- **Manual Checks Run:** source-level audit of token owners, shell partials, theme boot/runtime ownership, shared primitive ownership, blue/navy literal leakage, gradient density, box-shadow density, inline-style mutation hotspots, and `innerHTML` rendering hotspots across the current `src/styles/` and `src/scripts/` layers.
- **Regressions Or Risks Introduced:** no code behavior changed in this audit refresh, but it confirms the redesign track is in a mixed transitional state rather than a cleanly closed Phase 4 baseline. The immediate risk is continuing page rollout on top of assumptions that are no longer true.
- **Next Recommended Task:** freeze additional page-level redesign, classify the shared system blockers by owner, and fix the baseline in this order: shared dark-selector contract, shared dark token/surface contract, shared blue/navy literal leakage, then duplicated surface ownership in reservation/report/dashboard modules.

### 2026-04-07 | Codex | Dashboard Reservation Module Green Contract Closure
### ٢٠٢٦-٠٤-٠٧ | كودكس | إغلاق عقد الوحدة الخاصة بالحجوزات في لوحة التحكم على نظام الأخضر

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Completed the owner-level cleanup of the remaining dashboard dark blue/navy debt inside `src/styles/reservations.css` instead of stacking more dashboard overrides. Across successive reservation slices, the search/filter bars, pagination, reservation item tables, edit-reservation tables, technician selection modal, quote preview/editor, payment history surfaces, meta/summary/preview cards, compact reservation details surfaces, calendar-event chrome, technician lists/cards, notes and terms editors, billing inputs, selected-technician shells, and the late customer/technician reservation-modal aliases were all remapped from the legacy blue contract onto the shared green content/action/control system already used by the rest of the cleaned dashboard. A final source scan now shows the tracked blue/navy owner literals are cleared from `src/styles/reservations.css`, so the dashboard green cleanup is no longer split across `app.css` versus a still-legacy reservation owner file.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/dashboardGreenChromeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/dashboardGreenChromeAudit.test.js tests/theme/sharedGreenChromeAudit.test.js tests/theme/sharedControlDepthAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/pageBoot.test.js`, `npm run build`
- **Verification Snapshot:** the expanded dashboard green-chrome audit passed with the added reservation-module assertions, all existing shared shell/chrome/shadow/auth audits stayed green, the production build passed, and a final `rg` audit over `src/styles/reservations.css` no longer finds the tracked legacy blue/navy dark-contract literals. The dashboard dark surface system now reads as one green-toned contract across shared shell, dashboard-local `app.css`, and reservation-module ownership.
- **Manual Checks Run:** source-level audit of `src/styles/reservations.css` in slices, covering reservation search/filter/pagination, item tables, modal aliases, quote preview/editor, compact reservation details, payment/summary surfaces, technician cards/lists, and the page-scoped customer/technician reservation-modal aliases before each replacement block was applied.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is standard runtime taste validation on the live dashboard surface, not unresolved owner-level navy debt in the tracked dashboard/reservation chrome layer.
- **Next Recommended Task:** hard-refresh and visually validate `dashboard.html?bypassAuth=1&fixture=dashboard`, then return to the audit-first page rollout with `feedback-submissions.html` as the next low-risk page.

### 2026-04-07 | Codex | Dashboard Equipment Chrome Green Alignment Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة توحيد كروم المعدات في لوحة التحكم على الخط الأخضر

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Followed the first dashboard dark-chrome cleanup with a second targeted audit after runtime review indicated that the equipment-selection slice inside the dashboard was still on an older navy contract. The remaining offenders were the dark `equipment-card` family, equipment media surface, category and alias pills, select action button, quantity selector, generic equipment tag, default status badge, equipment empty state, and the light/dark reservation equipment input shell. This pass remaps that whole equipment-selection system to the shared green content/action/control contracts so the dashboard no longer mixes a cleaned green reservation/tables layer with an older navy equipment-card layer.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/dashboardGreenChromeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/dashboardGreenChromeAudit.test.js tests/theme/sharedGreenChromeAudit.test.js tests/theme/sharedControlDepthAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/pageBoot.test.js`, `npm run build`
- **Verification Snapshot:** the expanded dashboard green-chrome audit passed with the new equipment-card assertions, all existing shared shell/chrome/shadow/auth audits stayed green, and the production build passed. The dashboard equipment-selection surfaces now consume the same green token family already used by the rest of the cleaned dark system.
- **Manual Checks Run:** source-level audit of the remaining dashboard dark blue literals in `src/styles/app.css`, focused on the equipment-card and reservation-equipment control families before replacement.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is limited to intentional semantic/status colors and any other non-dashboard page-specific blue contracts that have not yet been audited.
- **Next Recommended Task:** hard-refresh and visually validate the dashboard equipment/reservation sections, then resume the page-by-page rollout with `feedback-submissions.html` unless another specific dashboard pocket is still visible.

### 2026-04-07 | Codex | Dashboard Dark Chrome De-Navy Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة إزالة الطابع الكحلي من كروم لوحة التحكم في الوضع الداكن

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Audited the reported dashboard dark-mode regression against the runtime screenshot and confirmed the remaining issue was not in the shared shell tokens anymore, but in dashboard-specific component contracts that still bypassed the green system with hardcoded navy and indigo values. The main offenders were the dark `customer-table-wrapper` / `technician-table-wrapper` overrides, reservation payment cards, reservation option cards, confirm toggles, reservation equipment mode toggles, reservation equipment input shells, and reservation select-equipment buttons. This pass removes those remaining dashboard-local navy surfaces and replaces them with the same green-toned shared surface, action, and control contracts already used elsewhere, while also removing the duplicate table-wrapper overlay layer and neutralizing the last blue-tinted maintenance stat emphasis.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/dashboardGreenChromeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/dashboardGreenChromeAudit.test.js tests/theme/sharedGreenChromeAudit.test.js tests/theme/sharedControlDepthAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/pageBoot.test.js`, `npm run build`
- **Verification Snapshot:** the new dashboard-specific green-chrome audit passed, all existing shared shell/chrome/shadow/auth audits stayed green, and the production build passed. The dashboard no longer keeps its own separate navy table, reservation-card, or selection-control contract on top of the global green dark system.
- **Manual Checks Run:** source-level audit of dashboard screenshot-driven offenders in `src/styles/app.css`, including the table wrapper dark override block and the reservation payment / equipment control family before replacement.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is limited to other clearly semantic blue states elsewhere in the product that were not part of this dashboard chrome pass and should be treated separately if redesign is desired.
- **Next Recommended Task:** hard-refresh and visually validate `dashboard.html?bypassAuth=1&fixture=dashboard`, then continue the audit-first page rollout with `feedback-submissions.html` on top of the cleaned global and dashboard dark chrome baseline.

### 2026-04-07 | Codex | Global Green Chrome And Shadow Alignment Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة توحيد الكروم العام والظلال على درجات الأخضر

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Ran a deep follow-up audit after runtime review showed the remaining visual issue was no longer raw shadow intensity alone, but a mixed chrome contract: several shared global controls and overlays were still using older blue/navy-tinted shadows, borders, and glow states while the rest of the dark system had already moved toward the green Art Ratio palette. This pass restores the shared glass dashboard bar, moves the remaining shared dark control and shell depth onto green-toned shadow values, and rethemes the shared flatpickr/calendar, shared badges, secondary-outline buttons, generic dark glass/modal/table wrappers, and modal close controls so the global chrome reads as one green system instead of a green shell with blue legacy pockets.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `tests/theme/sharedGreenChromeAudit.test.js`, `tests/theme/sharedControlDepthAudit.test.js`, `tests/theme/sharedShellSurfaceOwnershipAudit.test.js`, `tests/theme/globalSurfaceShadowAudit.test.js`, `tests/theme/darkSurfaceRefinementAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/sharedGreenChromeAudit.test.js tests/theme/sharedControlDepthAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/authPageAudit.test.js tests/theme/pageBoot.test.js`, `npm run build`
- **Verification Snapshot:** the new shared green-chrome audit passed, the existing shell/control/dark-surface audits stayed green, and the production build passed. The remaining shared dark chrome now uses green-toned shadows and glow values instead of the older navy contract across the shared header/button/calendar/modal/badge layer.
- **Manual Checks Run:** source-level audit of `src/styles/core.css` and `src/styles/app.css` for remaining blue/navy shadow and glow values in shared global chrome before applying replacements.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is intentional semantic/page-specific blue usage that was left untouched in this pass because it belongs to component semantics rather than the shared global chrome contract.
- **Next Recommended Task:** resume the audit-first page rollout with `feedback-submissions.html`, while continuing to normalize any page-specific legacy blue dark chrome only when it is proven to be non-semantic shared UI rather than intentional state color.

### 2026-04-07 | Codex | Global Dark Surface Tonal Refinement Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة تحسين النغمات العامة لأسطح الوضع الداكن

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Followed the global dark shadow reduction with a broader refinement after runtime review showed the remaining issue was no longer just halo depth, but sharp tonal separation between page, shell, cards, and controls. This pass refines the centralized dark contract in `src/styles/core.css` by softening border contrast, slightly lightening shared shell/content/control fills, widening shadows while lowering their opacity, and shifting depth toward tonal layering instead of hard-edged box separation. It also softens the auth-only dark chrome in `src/styles/app.css` so the approved login reference no longer sits apart from the shared dark surface system.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `tests/theme/globalSurfaceShadowAudit.test.js`, `tests/theme/darkSurfaceRefinementAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/darkSurfaceRefinementAudit.test.js tests/theme/globalSurfaceShadowAudit.test.js tests/theme/authPageAudit.test.js tests/theme/contactInquiriesPrimitiveAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js tests/theme/primitiveContractAudit.test.js tests/theme/phase4FoundationAudit.test.js`, `npm run build`
- **Verification Snapshot:** the new dark-surface refinement audit passed, the global shadow audit was updated to the refined token contract, all existing shared auth/shell/primitive audits stayed green, and the production build passed. Runtime review on the dark login and compact pages showed calmer, less harsh separation with softer borders and more tonal depth.
- **Manual Checks Run:** source-level audit of the dark token block in `src/styles/core.css` and the auth-only dark overrides in `src/styles/app.css`; runtime dark screenshot review on `http://127.0.0.1:4177/src/pages/login.html` and `http://127.0.0.1:4177/src/pages/contact-inquiries.html?bypassAuth=1` using `/tmp/art-ratio-dark-smoke-shots/login-dark-shadow-pass.png` and `/tmp/art-ratio-dark-smoke-shots/contact-inquiries-dark-shadow-pass.png`.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is visual preference only if the team wants to push dark mode even flatter or introduce a more pronounced hero-only depth treatment later.
- **Next Recommended Task:** continue with the audit-first cleanup of `feedback-submissions.html`, then `users.html`, using the refined global light-and-dark surface contract as the shared baseline instead of reintroducing local card/control treatments.

### 2026-04-07 | Codex | Global Dark Surface Shadow Reduction Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة تقليل ظلال الأسطح العامة في الوضع الداكن

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Followed up on the global light-shadow cleanup after runtime review showed the dark contract was still carrying heavier black halo depth across login and compact pages. The source was again centralized in the dark theme token block inside `src/styles/core.css`, where shell, content, tab, action, and control shadow values were materially stronger than the reduced light baseline. This pass reduces only the dark shadow token depths centrally, preserving dark-mode layering and separation while removing the oversized glow/halo feel around shared components.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/globalSurfaceShadowAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/globalSurfaceShadowAudit.test.js tests/theme/authPageAudit.test.js tests/theme/contactInquiriesPrimitiveAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js tests/theme/primitiveContractAudit.test.js tests/theme/phase4FoundationAudit.test.js`, `npm run build`
- **Verification Snapshot:** the expanded global shadow audit passed for both light and dark token sets, the shared auth/shell/primitive audits stayed green, and the production build passed. Fresh runtime dark screenshots on `login.html` and `contact-inquiries.html` confirmed calmer component depth without flattening the interface completely.
- **Manual Checks Run:** source-level token audit of the dark block in `src/styles/core.css`; runtime dark screenshot capture on `http://127.0.0.1:4177/src/pages/login.html` and `http://127.0.0.1:4177/src/pages/contact-inquiries.html?bypassAuth=1` saved to `/tmp/art-ratio-dark-smoke-shots/login-dark-shadow-pass.png` and `/tmp/art-ratio-dark-smoke-shots/contact-inquiries-dark-shadow-pass.png`.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is visual preference only if the team wants dark mode to become even flatter or, conversely, wants a stronger hero-only depth treatment instead of the current global reduction.
- **Next Recommended Task:** continue with the audit-first cleanup of `feedback-submissions.html`, then `users.html`, using the calmer global light-and-dark shadow contract as the shared baseline.

### 2026-04-07 | Codex | Global Light Surface Shadow Reduction Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة تقليل ظلال الأسطح العامة في الوضع الفاتح

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Audited the reported “outer glow behind every component” issue and confirmed it was global, not page-specific. The source was the shared light-theme shadow contract in `src/styles/core.css`, where shell, content, tab, action, control, and primitive button tokens were all using relatively wide soft shadows against pale surfaces. This pass reduces those light-mode shadow depths centrally instead of adding page overrides, so cards, inputs, selects, tabs, and buttons now inherit calmer depth across the whole application while preserving the existing dark-mode contract.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/globalSurfaceShadowAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/globalSurfaceShadowAudit.test.js tests/theme/authPageAudit.test.js tests/theme/contactInquiriesPrimitiveAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js tests/theme/primitiveContractAudit.test.js tests/theme/phase4FoundationAudit.test.js`, `npm run build`
- **Verification Snapshot:** the new global shadow audit passed, the existing shared shell/auth/primitive audits stayed green, and the production build passed. Static review confirmed the glow source was centralized shadow-token layering rather than page-specific CSS drift, and runtime light screenshots on `home.html` and `contact-inquiries.html` showed a calmer surface stack after the token reduction.
- **Manual Checks Run:** source-level token audit of `src/styles/core.css`; runtime light screenshot capture on `http://127.0.0.1:4177/src/pages/home.html?bypassAuth=1` and `http://127.0.0.1:4177/src/pages/contact-inquiries.html?bypassAuth=1` saved to `/tmp/art-ratio-light-smoke-shots/home-light-shadow-pass.png` and `/tmp/art-ratio-light-smoke-shots/contact-inquiries-light-shadow-pass.png`.
- **Regressions Or Risks Introduced:** no build or audit regression detected. Remaining risk is visual preference only if the team wants the light mode to become even flatter than the current reduced-depth pass.
- **Next Recommended Task:** continue with the audit-first cleanup of `feedback-submissions.html`, then `users.html`, using the calmer global light shadow contract as the new shared baseline rather than reintroducing local depth effects.

### 2026-04-07 | Codex | Contact Inquiries Shared Primitive Cleanup
### ٢٠٢٦-٠٤-٠٧ | كودكس | تنظيف صفحة رسائل التواصل على أساس الـ primitives المشتركة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Completed the first safe post-login compact-page pass on `contact-inquiries.html` without changing shell anchors, auth flow, table wiring, or API behavior. This pass moves the static KPI strip onto the shared `ui-stat-card compact-kpi-card` contract, upgrades the page and runtime-rendered empty states to `ui-empty-state surface-empty-state`, and rewrites the detail/workflow/action surfaces produced by `contactInquiries.js` so they consistently use the shared `ui-card`, `ui-button`, `ui-select`, `ui-input`, and `ui-textarea` primitives instead of older ad hoc button/control classes.
- **Key Files Or Surfaces Touched:** `src/pages/contact-inquiries.html`, `src/scripts/contactInquiries.js`, `tests/theme/contactInquiriesPrimitiveAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/contactInquiriesPrimitiveAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/compactShellSequencingAudit.test.js`, `npm run build`
- **Verification Snapshot:** the new focused runtime-primitive audit passed, the existing compact adoption and shell sequencing audits stayed green, and the production build passed after the page/script cleanup. The compact page keeps its existing shell contract and behavior while its static and script-rendered UI now point at one shared primitive layer.
- **Manual Checks Run:** source-level diff review of `contact-inquiries.html` and `contactInquiries.js`; live dark-mode screenshot validation on `http://127.0.0.1:4177/src/pages/contact-inquiries.html?bypassAuth=1` captured at `/tmp/art-ratio-dark-smoke-shots/contact-inquiries-compact-2026-04-07.png`.
- **Regressions Or Risks Introduced:** no source-level, shell-contract, or build regression detected in the `contact-inquiries` slice. Remaining risk is limited to runtime data realism under localhost bypass, where the table still shows the expected unauthorized placeholder state instead of populated business data.
- **Next Recommended Task:** apply the same audit-first shared-primitive cleanup to `feedback-submissions.html`, then move to `users.html`, while preserving the same compact-shell contract and dark-mode verification discipline.

### 2026-04-07 | Codex | Login Final Cleanup And Shared Autofill Pass
### ٢٠٢٦-٠٤-٠٧ | كودكس | تمريرة التنظيف النهائي لتسجيل الدخول وتوحيد تعبئة المتصفح التلقائية

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Finalized the login-page implementation and cleaned the auth-specific code path after the iterative redesign passes. This pass keeps the approved auth-header structure, shared language/theme control contract, and auth-page separation from dashboard/sidebar fallback, then removes redundant auth-only hover/autofill leftovers that were introduced during iteration. It also replaces the older loose autofill workaround with a shared input-primitive autofill contract for `.ui-input`, `.form-control`, `.ui-textarea`, and select controls, plus auth-form-panel-specific overrides so login inputs preserve their intended light/dark surfaces instead of inheriting Chrome’s blue autofill paint.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `src/styles/core.css`, `public/js/page-boot.js`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit passed, the production build passed, the login page remains on the auth-specific header/shell contract, shared header controls are visually aligned, and conflicting older auth hover/autofill rules were removed so one clear owner now exists for header-button behavior and shared input autofill behavior.
- **Manual Checks Run:** source-level cleanup audit of the login/auth-related CSS and boot path after the autofill and header cleanup pass.
- **Regressions Or Risks Introduced:** no source-level or build regression detected in the login/auth slice. Remaining risk is browser-runtime only: real saved-credential autofill in Chrome should still be manually checked once more on `login.html` and one shared form page because autofill painting is browser-controlled and cannot be fully proven by static tests alone.
- **Next Recommended Task:** manually validate saved-credential autofill once on `login.html` and one shared form page; if approved, treat the current login page and shared header/input controls as the cleaned reference and resume the low-risk rollout from this state.

### 2026-04-06 | Codex | Verified Auth Header Glass Transparency Micro-Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة دقيقة متحقق منها لشفافية وزجاجية رأس المصادقة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Tightened only the login-page header after direct feedback that the glass surface still felt too solid and the brand text still sat too far from the logo. This verified micro-pass increases translucency and blur on the auth header itself, softens the login-page language/theme controls so they read as part of the same glass surface, and reduces the logo-to-brand gap on both desktop and mobile without changing the shared control contract or auth-shell structure.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit passed, the production build passed, and the refreshed local dark runtime screenshot confirmed a lighter header surface with tighter brand spacing on the live `login.html` route.
- **Manual Checks Run:** local runtime dark screenshot review on the Vite-served `login.html` page after the transparency/brand-spacing pass.
- **Regressions Or Risks Introduced:** no behavioral or build regression detected. Remaining risk is purely visual preference if the user wants an even more extreme glass treatment than the current tuned pass.
- **Next Recommended Task:** review the live login page and, if approved, lock this header state as the auth reference before resuming the low-risk page rollout.

### 2026-04-06 | Codex | Verified Auth Header Alignment Tightening Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة شد المحاذاة المتحقق منها لرأس المصادقة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Tightened the verified login-header pass after follow-up feedback on frame width, glass visibility, and mobile control sizing. This pass pulls the floating header slightly back inside the page border, strengthens the glass treatment through more aggressive blur/translucency tuning, restores the mobile theme toggle to the original shared size, and keeps the login-only non-clickable brand plus shared language/theme button contracts intact.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit passed, the production build passed, and refreshed local runtime screenshots confirmed the header now sits more cleanly within the page border while preserving the corrected shared control sizing on mobile and the stronger floating-glass treatment.
- **Manual Checks Run:** refreshed desktop and mobile runtime screenshot review on the Vite-served `login.html` route after the alignment/glass/mobile-size adjustments.
- **Regressions Or Risks Introduced:** no behavioral or build regression detected. Remaining risk is purely approval risk if the user wants the glass treatment to become even stronger or subtler than the current tuned state.
- **Next Recommended Task:** review the current live login header and, if approved, continue the low-risk page rollout from this verified auth-header reference.

### 2026-04-06 | Codex | Verified Auth Header Glass And Width Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة الزجاجية والعرض المتحقق منها لرأس المصادقة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Finalized the login-page top bar into a cleaner glass treatment after direct feedback on width and mobile behavior. This verified pass increases translucency and blur on the floating auth header, expands the frame to cover the page width more convincingly, keeps the brand non-clickable on the login page, preserves the shared language/theme button contracts, and tightens the mobile spacing rules so the brand block and control cluster remain stable on smaller screens.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit passed, the production build passed, and the refreshed local login-page screenshots confirmed the header now renders as a fuller-width floating glass surface while preserving the cleaned auth-only brand behavior and shared control styling.
- **Manual Checks Run:** local runtime screenshot review on the Vite-served `login.html` route after the glass/width/mobile pass, including direct review of the updated auth header surface and control spacing.
- **Regressions Or Risks Introduced:** no behavioral or build regression detected. Remaining risk is visual preference only if the user wants an even stronger glass effect or a different mobile density target.
- **Next Recommended Task:** review the current live login header and, if approved, resume the low-risk page rollout using this verified auth-header state as the login reference.

### 2026-04-06 | Codex | Verified Auth Header Finalization Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة الإنهاء المتحقق منها لرأس المصادقة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Finalized the login-page top bar after live review against the dashboard header. This verified pass removes the temporary center pill and passive burger-like utility square, restores the language toggle to the real shared `language-toggle-btn` contract, widens the header frame so it matches the app-shell rhythm more closely, and makes the auth header float as a sticky surface instead of feeling attached to the page frame. The auth page remains isolated from sidebar injection and dashboard-shell behavior.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit passed, the production build passed, and the live dark login-page review confirmed the latest top bar now uses the corrected shared language button outline, no fake burger, no center pill, a wider floating frame, and the cleaned auth-specific header contract.
- **Manual Checks Run:** runtime screenshot review on the Vite-served dark `login.html` page plus direct comparison against the local `home.html?bypassAuth=1` dashboard header reference.
- **Regressions Or Risks Introduced:** no behavioral or build regression detected. Remaining risk is minor visual preference only if the user wants an even closer one-to-one dashboard proportion match on the auth top bar.
- **Next Recommended Task:** review the current live login page and, if approved, resume the low-risk rollout using this verified auth header as the login reference while keeping auth-shell and dashboard-shell responsibilities separate.

### 2026-04-06 | Codex | Auth Header Floating Geometry Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة هندسة رأس المصادقة العائمة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Tightened the login top bar to mirror the dashboard header more literally in placement and silhouette. This pass narrows the auth header into a clearer floating frame, keeps the centered header pill, aligns the control cluster against the opposite edge like the dashboard shell, and adds a passive right-edge utility square so the login header now carries the same three-zone visual rhythm as the real app header without reintroducing sidebar behavior.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`
- **Verification Snapshot:** the auth audit stayed green and the runtime dark screenshot of `login.html` confirmed the updated floating header width and closer dashboard-style placement of the center pill, controls, and right-edge utility square.
- **Manual Checks Run:** direct comparison between the live `home.html?bypassAuth=1` dashboard header and the live `login.html` auth header using local runtime screenshots.
- **Regressions Or Risks Introduced:** no behavioral regression detected. Remaining risk is visual preference only: if the user wants an almost one-to-one dashboard match, one final pass could further tune the relative widths of the center pill and outer utility zones.
- **Next Recommended Task:** review the current live login top bar and either lock it as the auth-header reference or do one last micro-alignment pass before continuing page rollout.

### 2026-04-06 | Codex | Auth Header Visual Alignment Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة مواءمة رأس المصادقة بصريًا

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Refined the new auth-specific login header so it now reads much closer to the global app-header language without reintroducing dashboard-shell coupling. This pass keeps the dedicated `auth-header` contract, but upgrades it with the same framed glass surface, spacing rhythm, control grouping, and premium chrome language used by the main app header while preserving non-sticky auth behavior and the clean separation from sidebar/burger fallback logic.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** pending
- **Verification Snapshot:** source-level review confirms the login page still uses an auth-specific header contract while the visual surface is now aligned more closely with the centralized global header style.
- **Manual Checks Run:** source-level review of the dashboard-header spacing/chrome against the auth-header styles before and after the pass.
- **Regressions Or Risks Introduced:** no known behavioral regression introduced at source level. Remaining risk is purely visual approval: the auth header may still need one more balance pass depending on whether the user prefers stronger or quieter chrome relative to the main app shell.
- **Next Recommended Task:** validate the updated login top bar live in desktop and mobile dark mode, then either lock it as the auth-header reference or do one final visual tightening pass before continuing the compact-family rollout.

### 2026-04-06 | Codex | Auth Header And Sidebar Fallback Separation Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة فصل رأس المصادقة عن fallback الشريط الجانبي

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Cleaned up the login page architecture so it no longer impersonates the dashboard shell. This pass replaces the login page's use of `dashboard-header` with an explicit auth-header contract, removes the direct sidebar stylesheet include from `login.html`, and updates the global `page-boot.js` fallback so auth pages are excluded from sidebar structure creation, burger-button injection, and sidebar-counter hydration. The result is that dashboard pages keep the centralized shell behavior while the auth page keeps only shared theme/token primitives.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `public/js/page-boot.js`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit passed, the production build passed, and the runtime dark screenshot of `login.html` showed the auth header without the previously injected floating burger. This confirms the auth page is no longer being pulled into the shared sidebar fallback path.
- **Manual Checks Run:** source-level review of the dashboard-shell partial versus `login.html`, runtime screenshot review on the Vite-served dark login page, and verification that the global boot fallback now exits early on `.auth-page`.
- **Regressions Or Risks Introduced:** no auth-flow or build regression detected. Remaining risk is limited to future regressions if additional auth surfaces are added without the same `.auth-page` contract or if legacy pages depend on the fallback more than expected.
- **Next Recommended Task:** review the login page live once more in desktop and mobile, then continue the low-risk compact rollout with the auth/dashboard shell boundary now clarified and enforced in code.

### 2026-04-06 | Codex | Global Dark Background Specificity Fix Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة إصلاح أولوية الخلفية الداكنة العامة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Corrected the centralized dark background system at the CSS-contract level instead of continuing route-specific overrides. This pass removes the zero-specificity `:where(...)` dark-theme selectors from the shared token/background contract, rewires the shared `body` / `.page-shell` background ownership to the centralized Art Ratio page tokens, and stops the auth route from clearing the global background back to transparent. The result is that dark mode now has a real app-wide background owner instead of competing with `bg-base-200` and transparent route exceptions.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit stayed green, the production build passed, and the runtime dark screenshot of `login.html` on the Vite server rendered with the shared green dark surface and no white outer canvas. Source-level verification also confirmed the old path could lose to `:root`, `body`, and `.page-shell` because `:where(...)` carries zero specificity.
- **Manual Checks Run:** source-level review of the shared dark token contract, auth-route body override, app-shell background selectors, and a live dark-mode runtime screenshot pass against the running Vite login page.
- **Regressions Or Risks Introduced:** no known behavioral regression introduced at source level. Remaining risk is visual breadth only: representative dark-mode pages should be spot-checked after refresh to confirm no page was relying on the older beige/base-200 shell surface as a visual crutch.
- **Next Recommended Task:** hard-refresh the running app, validate `login.html`, `dashboard.html`, and one compact manager page in dark mode, then continue the low-risk rollout only after the centralized dark surface is visually confirmed.

### 2026-04-06 | Codex | Global Dark Page Background Unification Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة توحيد خلفية الصفحات العامة في الوضع الداكن

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Replaced the older blue-toned dark page background contract with the same dark green brand family used by the refined auth direction. This pass updates the centralized dark page-background tokens and the shared app-level dark root/page-grid surfaces so the whole application stops mixing a blue global dark canvas behind greener page-level surfaces.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit stayed green and the production build completed after the global dark-page unification pass, which confirms the centralized background change did not break the login contract or the build pipeline.
- **Manual Checks Run:** source-level review of the global dark page tokens plus live login-page review against the running Vite server to confirm the older blue dark root background was removed from the centralized contract.
- **Regressions Or Risks Introduced:** no functional regression detected. Remaining risk is visual review breadth: because this is a centralized dark background change, additional app pages should be spot-checked in dark mode before calling the wider visual baseline fully settled.
- **Next Recommended Task:** review the login page and one or two representative dashboard/manager pages in dark mode to confirm the new centralized page background is consistent enough to keep as the app-wide dark baseline.

### 2026-04-06 | Codex | Login Single Background Ownership Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة توحيد ملكية خلفية صفحة تسجيل الدخول

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Cleaned up the login route so it no longer visibly stacks the global `html/body`, `page-shell`, and auth-shell backgrounds on top of one another. This pass removed the auth-route body padding and neutralized the inherited login-route `body` / `.page-shell` background painting so the auth shell becomes the single visible background owner for the page.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`
- **Verification Snapshot:** the focused auth audit remained green after the background ownership cleanup, and the live dark-mode review on the running Vite login page confirmed the previous outer gutter/background stack is no longer the dominant visual behavior.
- **Manual Checks Run:** live login-page refresh plus runtime screenshot review on the Vite-served `login.html` route after the route-level background override was applied.
- **Regressions Or Risks Introduced:** no auth-flow or markup regression introduced. Remaining risk is aesthetic only: the auth-shell background itself may still be simplified further if the approved direction should be flatter and quieter than the current premium gradient.
- **Next Recommended Task:** review the login page in-browser and decide whether the remaining auth-shell gradient should be reduced to a simpler single-surface treatment before using it as the reference for the next low-risk pages.

### 2026-04-06 | Codex | Login Background Pattern Reference Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة مرجع نقش الخلفية لصفحة تسجيل الدخول

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Replaced the temporary generated login background grid with an asset-driven background pattern derived from the user-provided brand reference image. The login page now uses a served auth-specific pattern asset with controlled repeat, scale, fade, and dark-mode opacity while preserving the premium auth composition and the isolated login header behavior.
- **Key Files Or Surfaces Touched:** `public/assets/auth-pattern-bg.jpeg`, `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`
- **Verification Snapshot:** the focused auth audit remained green after the asset-backed background swap, confirming the login reference still preserves its markup contract while moving from a synthetic pattern to a real brand-derived texture.
- **Manual Checks Run:** runtime dark-mode screenshot review on the Vite-served `login.html` route after the new pattern asset was applied.
- **Regressions Or Risks Introduced:** no auth or layout regression was introduced. Remaining risk is visual tuning only: the pattern may still need one more opacity/scale adjustment depending on final approval once reviewed directly in-browser.
- **Next Recommended Task:** visually approve the login page with the real pattern asset, then carry the approved auth background, density, and contrast rules into the next low-risk compact pages.

### 2026-04-06 | Codex | Login Header Isolation Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة عزل رأس صفحة تسجيل الدخول

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Isolated the login-page header from the generic sticky dashboard header behavior so the auth screen no longer inherits the same scroll/stacking treatment as the operational shell. The login header now behaves as a stable auth top bar with lighter chrome while the broader premium auth frame remains intact.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** live Vite review on the running login page
- **Verification Snapshot:** the login page now uses an auth-specific header treatment without changing markup or auth behavior, which clears the immediate scroll stacking issue before the next background-pattern pass.
- **Manual Checks Run:** source-level review and live login-page refresh against the running dev server.
- **Regressions Or Risks Introduced:** no behavioral regression introduced. Background pattern replacement is still pending the user-provided image reference.
- **Next Recommended Task:** replace the current auth-page background pattern with the user-approved image-derived pattern once the reference asset is provided, then continue compact-family rollout only after the login page is visually approved.

### 2026-04-06 | Codex | Login Form Density And Contrast Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة كثافة النموذج وتباين حقول تسجيل الدخول

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Tightened the login form proportions after live review feedback on the premium pass. The auth form body is now intentionally narrower than the outer card to avoid over-wide fields, and the dark-mode auth labels, typed text, and placeholders were overridden more aggressively so the username/password area no longer inherits the softer blue-tinted label treatment from the broader dark theme.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`
- **Verification Snapshot:** the focused auth audit stayed green after the density/contrast pass, which confirms the login contract and markup assumptions remain intact while the form spacing and field readability were corrected in CSS.
- **Manual Checks Run:** live dark-mode review against the running Vite login page to confirm reduced field width, narrower form rhythm, and stronger auth label/placeholder contrast.
- **Regressions Or Risks Introduced:** no behavioral regression was introduced. Remaining risk is visual preference only, centered on whether the premium shell should become even tighter or stay at the current density before rolling the direction into the compact manager family.
- **Next Recommended Task:** validate the updated login page visually, then continue the compact manager family pass on `contact-inquiries.html`, `feedback-submissions.html`, and `users.html` using the approved login density and contrast rules as part of the low-risk reference set.

### 2026-04-06 | Codex | Login Premium Dashboard Direction Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة اتجاه لوحة تحكم فاخر لصفحة تسجيل الدخول

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Pushed the login reference from the earlier refined state into a bolder premium-dashboard direction without changing auth behavior or runtime contracts. This pass strengthened the page frame, added a more assertive dark dashboard atmosphere, increased card chrome and section containment, upgraded the primary action treatment, and explicitly fixed dark-mode readability for the username/password labels and input text so the auth form remains high-contrast in the primary theme.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused auth audit stayed green (`1` file, `3` tests) and the build passed after the premium dashboard styling pass, which confirms the stronger visual treatment still preserves the explicit auth shell contract and production asset generation.
- **Manual Checks Run:** runtime dark-mode screenshot review on desktop and mobile for `login.html`, with direct inspection of `.auth-card`, `.auth-hero-panel`, and `#login-form` to confirm the stronger premium framing and the corrected dark-field contrast for username/password.
- **Regressions Or Risks Introduced:** no auth-flow or build regression was detected. Remaining risk is visual approval only: if the rest of the compact family adopts this direction, it should reuse the same stronger frame, field contrast, and action hierarchy instead of a softer reference.
- **Next Recommended Task:** continue the compact manager family pass on `contact-inquiries.html`, then `feedback-submissions.html`, then `users.html`, using the bold premium `login.html` auth direction plus the corrected `site-analytics.html` token base as the low-risk reference set.

### 2026-04-06 | Codex | Login Reference Refinement Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة صقل مرجع تسجيل الدخول

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Refined `login.html` into a stronger Phase 4 auth reference after direct visual feedback on the recent update. The new pass keeps the approved single-column structure and all runtime/auth contracts, but improves the page through a more deliberate brand-palette strip, cleaner heading hierarchy, calmer card framing, stronger auth microcopy, and color-coded feature bullets derived from the Art Ratio palette instead of generic decorative markers.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `src/scripts/translations/common.js`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js`
- **Verification Snapshot:** the focused auth audit passed (`1` file, `3` tests), confirming the refined login page still preserves the explicit auth shell contract, primitive aliases, shared-CSS ownership, and translation-backed copy hooks after the visual pass.
- **Manual Checks Run:** source-level review of the refined login hierarchy against the Art Ratio palette reference image and the existing Phase 4 shape rules, including dark-mode selectors, auth form contract, theme/language controls, and the new palette-driven bullet treatment.
- **Regressions Or Risks Introduced:** no auth-flow regression was introduced in code review or the focused audit. Remaining risk is purely approval risk: the compact-family rollout should reuse this refined login hierarchy only after the updated auth reference is visually accepted.
- **Next Recommended Task:** continue the compact manager family pass on `contact-inquiries.html`, then `feedback-submissions.html`, then `users.html`, using the refined `login.html` auth hierarchy plus the corrected `site-analytics.html` token base as the low-risk reference set.

### 2026-04-06 | Codex | Phase 4 Simple Login Reference Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة مرجع تسجيل الدخول المبسط في المرحلة الرابعة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Replaced the earlier split-login experiment with a simpler single-column login reference. The new pass keeps the corrected Phase 4 palette and primitive foundation, but moves the page away from the heavy two-column hero pattern into a compact intro panel plus centered auth form card.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `tests/theme/authPageAudit.test.js`, `tests/theme/phase4FoundationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the focused login/foundation audits passed (`4` files, `12` tests), `npm run build` passed, and `npm run test:reservations` passed with `94` passed files, `1` skipped integration file, and `994` passed tests. The login page is now a behavior-safe low-risk reference without the earlier split-layout dependency.
- **Manual Checks Run:** source-level review of the simplified login layout and shared auth styles to confirm the page no longer depends on a side-by-side hero composition and still preserves the existing auth form, translation keys, theme toggle, and runtime contracts.
- **Regressions Or Risks Introduced:** no behavioral regression was detected. The remaining risk is visual consistency across the compact family if those pages drift away from the new simpler hierarchy and card rhythm.
- **Next Recommended Task:** continue the compact manager family pass on `contact-inquiries.html`, then `feedback-submissions.html`, then `users.html`, using the corrected `site-analytics.html` token base and the simplified `login.html` hierarchy as the approved low-risk reference set.

### 2026-04-06 | Codex | Phase 4 Foundation Verification And Direction Reset
### ٢٠٢٦-٠٤-٠٦ | كودكس | التحقق من أساس المرحلة الرابعة وإعادة ضبط الاتجاه

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Verified the adapted Phase 4 audit-correction foundation against the real repository state, confirmed the corrected semantic palette/token layer and the new `StatCard`/`EmptyState` bridge are stable, and reset the active rollout direction so the current split `login.html` experiment is not treated as the visual reference for the rest of Phase 4.
- **Key Files Or Surfaces Touched:** `src/styles/tailwind-theme.css`, `src/styles/core.css`, `src/styles/app.css`, `src/pages/site-analytics.html`, `src/scripts/siteAnalytics.js`, `tests/theme/phase4FoundationAudit.test.js`, `tests/theme/primitiveContractAudit.test.js`, `tests/theme/siteAnalyticsAuthAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/phase4FoundationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/authPageAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the focused foundation/theme audits passed (`6` files, `19` tests), the production build passed, and `npm run test:reservations` passed with `94` passed files, `1` skipped integration file, and `994` passed tests. This clears the foundation blocker with current evidence instead of assumption.
- **Manual Checks Run:** source-level review of the semantic palette correction, token-category additions, `ui-stat-card` / `ui-empty-state` bridge, and plan alignment with the user's feedback that the current split login direction is not approved.
- **Regressions Or Risks Introduced:** no behavioral regression was detected in this verification pass. The current risk is not foundation instability; it is design drift if Phase 4 continues from the rejected split-login direction instead of first locking an approved low-risk visual reference.
- **Next Recommended Task:** create and approve a simpler low-risk reference pass, then continue the compact manager family on `contact-inquiries.html`, `feedback-submissions.html`, and `users.html` using the corrected token/primitive base rather than the rejected split-login composition.

### 2026-04-06 | Codex | Phase 4 Audit-Correction Foundation Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة تصحيح الأساس البصري للمرحلة الرابعة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Implemented the blocking Phase 4 foundation corrections before continuing more compact-family page polish. This pass corrected the semantic action/secondary palette away from the old indigo system, added the missing shared spacing/radius/shadow/motion/focus/typography token categories, introduced `ui-stat-card` and `ui-empty-state` as shared bridge primitives, and re-touched the current Phase 4 reference pages so they now sit on the corrected token base instead of the older visual foundation.
- **Key Files Or Surfaces Touched:** `src/styles/tailwind-theme.css`, `src/styles/core.css`, `src/styles/app.css`, `src/pages/site-analytics.html`, `src/scripts/siteAnalytics.js`, `tests/theme/primitiveContractAudit.test.js`, `tests/theme/secondaryPrimitiveContractAudit.test.js`, `tests/theme/siteAnalyticsAuthAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/authPageAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/site-analytics.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/site-analytics-phase4-pass.png --delay 2200 --inspect-selector '#site-analytics-stats' --inspect-selector '#site-analytics-top-pages' --inspect-selector '#site-analytics-daily-card'`
- **Verification Snapshot:** the focused theme/site-analytics audits stayed green, `npm run build` passed, and `npm run test:reservations` remained green with `93` passed files and `1` skipped integration file. The accepted localhost dark screenshot path remained usable after the foundation correction pass, which confirms the new palette and shared empty/stat primitives render on the current compact reference.
- **Manual Checks Run:** source-level review of the new semantic palette/token layer, shared bridge variables, shared `ui-stat-card` and `ui-empty-state` styles, and the dark runtime screenshot for `site-analytics.html`.
- **Regressions Or Risks Introduced:** no focused behavioral regression was detected in this pass. The remaining risk is design consistency: the rest of the compact family must now adopt the corrected palette and the new `StatCard`/`EmptyState` bridge instead of extending older page-specific visual patterns.
- **Next Recommended Task:** continue Phase 4 on `contact-inquiries.html`, then `feedback-submissions.html`, then `users.html`, using the corrected `site-analytics.html` token/primitive base as the compact-family reference.

### 2026-04-06 | Codex | Phase 4 Compact Family Site Analytics Visual Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة التوحيد البصري لصفحة Site Analytics ضمن عائلة Compact في المرحلة الرابعة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Applied the first bounded compact-family visual unification pass to `site-analytics.html` using the approved Phase 4 direction. This pass introduced the new compact hero/filter layout, branded KPI cards, stronger table shell framing, and cleaner list/daily-stat surfaces while preserving the compact shared shell, IDs, filter wiring, auth flow, translation hooks, and analytics loading behavior.
- **Key Files Or Surfaces Touched:** `src/pages/site-analytics.html`, `src/styles/app.css`, `src/scripts/siteAnalytics.js`, `tests/theme/siteAnalyticsAuthAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/authPageAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/site-analytics.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/site-analytics-phase4-pass.png --delay 2200 --inspect-selector '#site-analytics-stats' --inspect-selector '#site-analytics-top-pages' --inspect-selector '#site-analytics-daily-card'`
- **Verification Snapshot:** the focused site-analytics/theme audits passed, the production build stayed green, and `npm run test:reservations` remained green with `93` passed files and `1` skipped integration file. The runtime dark-mode capture confirmed the new compact KPI grid, top-pages panel, and daily card all render through the updated visual system on the accepted localhost bypass route.
- **Manual Checks Run:** reviewed the site-analytics runtime screenshot at `/tmp/art-ratio-dark-smoke-shots/site-analytics-phase4-pass.png` and confirmed the compact hero, KPI cards, and panel shells stay readable in dark mode.
- **Regressions Or Risks Introduced:** no focused runtime regression was detected in this pass. The next risk is implementation drift if the remaining compact-family pages do not reuse the same spacing, card framing, and toolbar rhythm.
- **Next Recommended Task:** carry the same compact-family visual system into `contact-inquiries.html`, then `feedback-submissions.html`, and finally `users.html`.

### 2026-04-06 | Codex | Phase 4 Login Brand Alignment Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة مواءمة البراند لصفحة تسجيل الدخول في المرحلة الرابعة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Refined the earlier `login.html` visual unification pass so it now aligns with the Art Ratio palette direction instead of the older indigo-heavy accents. This pass kept the split auth layout but re-tuned the auth shell, intro surfaces, chips, orbit card, support items, and language toggle to the approved Art Ratio green/sage/blue-gray direction while preserving login behavior.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/usersDarkModeAudit.test.js`, `npm run build`
- **Verification Snapshot:** the auth-page audit, primitive/migration coverage, users dark-mode audit, and production build all passed after the brand-alignment pass. `login.html` is now aligned with both the Phase 4 shape direction and the approved Art Ratio palette direction.
- **Manual Checks Run:** source-level review of the auth shell, hero panel, logo badge, orbit, support items, and dark-mode auth surfaces to confirm the login proof point now reflects the documented Phase 4 direction.
- **Regressions Or Risks Introduced:** no focused runtime regression was detected in this pass. The next risk moved to whether compact-family pages would follow the same direction consistently rather than drifting toward older page-specific visual language.
- **Next Recommended Task:** start the compact manager family pass on `site-analytics.html` and use it as the first extracted-shell reference for the Phase 4 direction.

### 2026-04-06 | Codex | Phase 4 Visual Direction Baseline
### ٢٠٢٦-٠٤-٠٦ | كودكس | خط الأساس للاتجاه البصري في المرحلة الرابعة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Recorded the approved Phase 4 visual direction inside the master plan using the external dark dashboard kit as a shape-only reference and the Art Ratio palette as the color authority. Locked what may be borrowed from the kit, what must not be copied, how the brand palette maps to shell/actions/support accents, and the shape rules for buttons, cards, tables, modals, filters, and tabs.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** none; documentation-only alignment pass
- **Verification Snapshot:** the redesign direction is now documented in the same source-of-truth file used for implementation handoff, so the next compact-family work can reference one explicit visual baseline instead of implicit preference.
- **Manual Checks Run:** static review of the external kit package structure, extracted preview assets, and the supplied Art Ratio palette image to confirm the chosen direction is shape-led and brand-color-driven.
- **Regressions Or Risks Introduced:** no runtime change was introduced in this pass. The remaining risk is implementation drift if compact-family pages deviate from the documented shape rules during Phase 4 execution.
- **Next Recommended Task:** apply this visual direction to the compact manager family while preserving shell anchors, data behavior, and dark-theme quality.

### 2026-04-06 | Codex | Phase 4 Low-Risk Pages Login Visual Unification Pass
### ٢٠٢٦-٠٤-٠٦ | كودكس | تمريرة التوحيد البصري لصفحة تسجيل الدخول ضمن المرحلة الرابعة

- **Phase:** Low-Risk Pages
- **Summary of Completed Work:** Started Phase 4 by visually unifying `login.html` on top of the stabilized shell and primitive layer. This pass introduced a split auth layout with a branded intro panel, tightened form hierarchy, and kept the existing login form, IDs, translation flow, theme toggle, and auth behavior intact.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `src/styles/app.css`, `src/scripts/translations/common.js`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/usersDarkModeAudit.test.js`, `npm run build`
- **Verification Snapshot:** the updated auth-page audit, primitive/migration coverage, users dark-mode audit, and production build all passed after the login visual unification pass. `login.html` is now the first real Phase 4 reference for low-risk page polish on top of the Phase 3 primitive layer.
- **Manual Checks Run:** source-level review of the new auth split layout, shared auth styles, and new login translation keys to confirm the page remains bilingual, dark-mode aware, and behavior-preserving.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The next risk is maintaining the same visual direction consistently across the compact manager family without introducing shell drift.
- **Next Recommended Task:** carry the same visual system decisions into `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `users.html` as the next bounded Phase 4 pass.

### 2026-04-06 | Codex | Phase 3 Closeout Check
### ٢٠٢٦-٠٤-٠٦ | كودكس | فحص إغلاق المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Ran the first Phase 3 closeout check after finishing the tracked selector-debt cleanup. The primitive bridge, secondary primitive bridge, full-family parity audit, users dark-mode audit, tabs-family dark-mode audit, modal-form audit, and migration audit all stayed clean, and the production build remained stable.
- **Debt Snapshot Update:** tracked legacy dark-selector debt in authored styles is now `0` remaining files. `app.css`, `core.css`, `reports.css`, `reservations.css`, and `templatesA4.css` all now follow the canonical dark-selector contract.
- **Key Files Or Surfaces Touched:** `src/styles/templatesA4.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js tests/theme/fullFamilyPrimitiveParityAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the closeout check stayed clean, so `Core UI Primitives` is now ready to move from active implementation to `Done`, and the active track can shift to `Low-Risk Pages`.
- **Manual Checks Run:** source-level review of the final `templatesA4.css` cleanup and the closeout audit set to confirm the phase transition is driven by stable primitive/runtime coverage rather than by selector cleanup alone.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The next risks are page-level visual unification drift and dark-theme consistency while Phase 4 begins.
- **Next Recommended Task:** start Phase 4 on `login.html`, then carry the same visual unification decisions into the compact manager family.

### 2026-04-06 | Codex | Phase 3 Templates Selector Debt Cleanup Slice 1
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الأولى لتنظيف ديون الـ Selectors في ملف Templates ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the final tracked dark-selector debt owner in `src/styles/templatesA4.css` by converting the template table light-print override, preview zoom controls, and floating cell-toolbar dark treatment to the canonical unified dark selector.
- **Debt Snapshot Update:** `src/styles/templatesA4.css` legacy dark-selector debt has now dropped from `9` legacy `:is` plus `0` legacy `:where` matches to `0` legacy `:is` and `0` legacy `:where`. All actively tracked Phase 3 debt-owner CSS files now follow the canonical dark-selector contract.
- **Key Files Or Surfaces Touched:** `src/styles/templatesA4.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, related users/tabs/modal dark coverage, and production build all passed after the final `templatesA4.css` cleanup pass. The tracked authored CSS debt list is now empty.
- **Manual Checks Run:** source-level review of the template print-table override, preview zoom controls, and cell-toolbar dark surfaces to confirm the canonical selector now covers the last template-specific residual block without changing template/export structure.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The remaining Phase 3 risk is now closeout quality, not unresolved selector debt.
- **Next Recommended Task:** run the Phase 3 selector-cleanup closeout check, then decide whether Core UI Primitives is ready to close or whether one final hardening pass is needed on adoption/runtime parity.

### 2026-04-06 | Codex | Phase 3 App Selector Debt Cleanup Slice 2
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الثانية لتنظيف ديون الـ Selectors في ملف App ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the remaining dark-selector debt in `src/styles/app.css` by converting the shared Bootstrap modal dark block and the equipment-package selector tail to the canonical unified dark selector.
- **Debt Snapshot Update:** `src/styles/app.css` legacy dark-selector debt has now dropped from `13` legacy `:is` plus `0` legacy `:where` matches to `0` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, users dark-mode audit, related tabs/modal dark coverage, and production build all passed after the final `app.css` cleanup pass. `src/styles/app.css` now fully follows the canonical dark-selector contract and no longer appears in the tracked debt-owner list.
- **Manual Checks Run:** source-level review of the shared modal dark block and the equipment-package selector tail to confirm the canonical selector now covers the last app-level residual surfaces without changing modal behavior or equipment package contracts.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The selector-cleanup portion of Phase 3 is now down to one last small debt owner in `src/styles/templatesA4.css`.
- **Next Recommended Task:** close the final bounded selector-debt cleanup track in `src/styles/templatesA4.css`, then run the Phase 3 selector-cleanup closeout check.

### 2026-04-06 | Codex | Phase 3 App Selector Debt Cleanup Slice 1
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الأولى لتنظيف ديون الـ Selectors في ملف App ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Started the final large dark-selector debt-owner cleanup in `src/styles/app.css` by converting the users/admin-filter slice to the canonical unified dark selector. This pass covered the technician search input, technician-role filter, maintenance-status filter, and the full dark users-table body/head/hover cluster.
- **Debt Snapshot Update:** `src/styles/app.css` legacy dark-selector debt has now dropped from `16` legacy `:is` plus `11` legacy `:where` matches to `13` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `tests/theme/themeMigrationAudit.test.js`, `tests/theme/usersDarkModeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, users dark-mode audit, related tabs/modal dark coverage, and production build all passed after the first `app.css` cleanup slice. The users table and admin filter surfaces now follow the canonical dark-selector contract.
- **Manual Checks Run:** source-level review of the users-table dark body/head/hover styles and the admin filter controls to confirm the canonical selector now covers those surfaces without changing users-page behavior or management filter contracts.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The remaining `app.css` debt is now concentrated in the shared Bootstrap modal dark block and the small equipment-package selector tail.
- **Next Recommended Task:** take the next bounded `src/styles/app.css` cleanup slice on the shared modal dark block and the equipment-package selector tail, then close `src/styles/templatesA4.css` as the final small debt owner for Phase 3 selector cleanup.

### 2026-04-06 | Codex | Phase 3 Reports Selector Debt Cleanup Slice 1
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الأولى لتنظيف ديون الـ Selectors في ملف Reports ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the remaining dark-selector debt in `src/styles/reports.css` by normalizing the report shell, KPI cards, charts, tables, templates actions menu, debug rows, KPI details, and the file-level dark custom-properties block to the canonical unified dark selector.
- **Debt Snapshot Update:** `src/styles/reports.css` legacy dark-selector debt has now dropped from `30` legacy `:is` plus `10` legacy `:where` matches to `0` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reports.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, related tabs/modal/projects dark coverage, and production build all passed after the `reports.css` cleanup pass. `src/styles/reports.css` now fully follows the canonical dark-selector contract and no longer appears in the tracked debt-owner list.
- **Manual Checks Run:** source-level review of the remaining report cards, KPI detail rows, templates actions menu, and report-debug dark surfaces to confirm the canonical selector now covers the final report-specific cluster without changing report UI contracts.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The remaining selector debt after reports cleanup shifted to `app.css` and `templatesA4.css`.
- **Next Recommended Task:** start the next bounded cleanup track in `src/styles/app.css`, because it is now the largest remaining dark-selector debt owner.

### 2026-04-06 | Codex | Phase 3 Core Selector Debt Cleanup Slice 6
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة السادسة لتنظيف ديون الـ Selectors في ملف Core ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the remaining shared dark-selector tail in `src/styles/core.css` by converting the last legacy project reservation cluster, equipment-tab floating action buttons, and project-services table dark blocks to the canonical unified dark selector.
- **Debt Snapshot Update:** `src/styles/core.css` legacy dark-selector debt has now dropped from `7` legacy `:is` plus `6` legacy `:where` matches to `0` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark-theme coverage, related modal/projects audits, and build all passed after the final core cleanup pass. `src/styles/core.css` now fully follows the canonical dark-selector contract and no longer appears in the tracked debt-owner list.
- **Manual Checks Run:** source-level review of the final `core.css` project reservation, equipment-tab action, and project-services table dark surfaces to confirm the canonical selector now covers the last shared residual block without changing runtime hooks or shell contracts.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The shared/core debt owner is now cleared, and the next unresolved debt concentration moves to `reports.css`, then `app.css`, with `templatesA4.css` as the smallest remaining owner.
- **Next Recommended Task:** start the next bounded selector-debt cleanup track in `src/styles/reports.css`, then reassess whether `src/styles/app.css` or `src/styles/templatesA4.css` should follow before closing the selector-cleanup portion of Phase 3.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 7
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة السابعة لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the remaining staged dark-selector cleanup in `src/styles/reservations.css` by converting the reservation-create, technician-card, autocomplete, notes and terms, summary, calendar-event, quote-preview footer button, and final small tail overrides to the canonical unified dark selector.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `63` legacy `:is` plus `0` legacy `:where` matches to `0` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark-theme coverage, related modal and projects audits, and build all passed after the final reservations cleanup pass. `src/styles/reservations.css` now fully follows the canonical dark-selector contract and no longer appears in the tracked debt-owner list.
- **Manual Checks Run:** source-level review of the remaining reservation-create, technician-card, autocomplete, notes and terms, summary, calendar-event, and quote-preview footer dark surfaces to confirm the final tail moved to the canonical selector without changing reservation hooks or UI contracts.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The active debt focus now shifts away from reservations and toward the remaining shared/core and report/template/app selector tails.
- **Next Recommended Task:** close the small residual shared dark-selector tail in `src/styles/core.css`, then reassess whether `src/styles/reports.css` or `src/styles/app.css` should be the next dominant debt owner for Phase 3 cleanup.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 6
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة السادسة لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged dark-selector cleanup in `src/styles/reservations.css` by converting the reservation items-table, edit-reservation table variants, reservation modal-items table, and select-technicians table cluster to the canonical unified dark selector. This sixth pass also covered the remaining dark override on the reservation modal info value, linked-pill styling, row handles, barcode/meta text, quantity controls, item thumb styling, and the responsive mobile card treatment for reservation modal items.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `123` legacy `:is` plus `0` legacy `:where` matches to `63` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark-theme coverage, related modal and projects audits, and build all passed after the sixth reservations cleanup slice. The reservation item-management table surfaces now follow the canonical dark-selector contract.
- **Manual Checks Run:** source-level review of the reservation items tables, edit-reservation table variants, reservation modal items table, and select-technicians table surfaces to confirm the canonical selector now covers both desktop and responsive/mobile dark table states without changing runtime hooks or modal wiring.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The remaining reservations debt is now concentrated in the reservation-create, technician-card, autocomplete, notes and terms, summary, calendar-event, and quote-preview footer surfaces rather than the earlier table-heavy clusters.
- **Next Recommended Task:** take the next bounded `reservations.css` cleanup slice on the reservation-create, technician-card, autocomplete, notes and terms, summary, and related form-shell surfaces before closing the smaller calendar and quote-footer tail.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 5
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الخامسة لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged dark-selector cleanup in `src/styles/reservations.css` by converting the reservation meta cards, share and tax switches, payment action buttons, modal actions, and preview-summary cluster to the canonical unified dark selector. This fifth pass covered the share switch, reservation meta card, tax switch, technician chips, payment action button states, modal action button states, reservation preview shells, dark alert styling, and reservation summary-list blocks.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `165` legacy `:is` plus `0` legacy `:where` matches to `123` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark-theme coverage, related modal and projects audits, and build all passed after the fifth reservations cleanup slice. The meta cards, switch controls, payment action buttons, modal actions, and preview-summary surfaces now follow the canonical dark-selector contract.
- **Manual Checks Run:** source-level review of the cleaned reservation meta, switch, modal-action, and preview-summary surfaces to confirm the canonical selector now covers the action states, preview alerts, and summary cards without changing reservation behavior.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The remaining debt in `reservations.css` is now more concentrated in table-heavy item-management surfaces plus later reservation-create blocks.
- **Next Recommended Task:** take the next bounded `reservations.css` cleanup slice on the reservation items tables, edit-reservation table variants, and select-technicians table surfaces.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 4
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الرابعة لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged dark-selector cleanup in `src/styles/reservations.css` by converting the billing and payment-history cluster to the canonical unified dark selector. This fourth pass covered billing inputs and selects, payment-status variants, readonly and focus states, payment progress hint, payment-history block, table, title, empty and remove states, payment-history notes, and the payment-history modal empty state.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `185` legacy `:is` plus `2` legacy `:where` matches to `165` legacy `:is` and `0` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark-theme coverage, related modal and projects audits, and build all passed after the fourth reservations cleanup slice. The billing and payment-history cluster now follows the canonical dark-selector contract, and `reservations.css` no longer carries any legacy `:where` dark selectors.
- **Manual Checks Run:** source-level review of the billing and payment-history cluster to confirm the canonical selector now covers billing fields, payment-status variants, progress hint, history table, and history empty/remove states without changing reservation behavior.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. `reservations.css` still owns the largest remaining selector debt via legacy `:is`, but the billing and payment-history cluster is now stabilized and the remaining work is concentrated in later reservation create, modal action, preview-summary, and items-table surfaces.
- **Next Recommended Task:** take the next bounded `reservations.css` cleanup slice on the reservation meta cards, share and tax switches, payment action buttons, modal actions, preview-summary, and related compact control surfaces.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 3
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الثالثة لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged dark-selector cleanup in `src/styles/reservations.css` by converting the quote-preview and quote-controls cluster to the canonical unified dark selector. This third pass covered the quote preview sidebar, terms editor, reset action, toggle groups and fields, meta cards, preview panel and status, preview status action and spinner, dropdown controls, zoom controls and buttons, align select, and zoom value surfaces.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `217` legacy `:is` plus `2` legacy `:where` matches to `185` legacy `:is` and `2` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark-theme coverage, related projects and modal audits, and build all passed after the third reservations cleanup slice. The quote-preview and quote-controls cluster now follows the canonical dark-selector contract without changing preview behavior or modal markup.
- **Manual Checks Run:** source-level review of the quote-preview and quote-controls cluster to confirm the canonical selector now covers the preview sidebar, status chip, zoom controls, dropdown menu, and terms editor without changing runtime hooks or localization behavior.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. `reservations.css` still owns most of the remaining selector debt, but the quote-preview surface is now stabilized and the next cleanup can move into billing and payment-history blocks.
- **Next Recommended Task:** take the next bounded `reservations.css` cleanup slice on the billing and payment-history cluster.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 2
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الثانية لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged dark-selector cleanup in `src/styles/reservations.css` by converting the reservation-details and modal-info cluster to the canonical unified dark selector. This second pass covered the reservation details info card, highlighted first row, reservation modal shell, modal ID block, disabled edit fields, summary cards, equipment heading, remove button, summary detail rows, and modal info-card text blocks.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `240` legacy `:is` plus `2` legacy `:where` matches to `217` legacy `:is` and `2` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/detailsPageAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, dark-theme tabs-family coverage, related projects, modal, and detail audits, and build all passed after the second reservations cleanup slice. The reservation details and modal-info cluster now follows the canonical dark-selector contract without changing markup or runtime hooks.
- **Manual Checks Run:** source-level review of the reservation details and modal-info cluster to confirm the canonical selector now covers info cards, summary rows, modal ID chrome, disabled edit fields, and remove-action surfaces without changing reservation behavior.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. `reservations.css` still owns most remaining selector debt, but the details and modal-info slice is now stabilized and the next cleanup can move deeper into quote-preview and quote-controls surfaces.
- **Next Recommended Task:** take the next bounded `reservations.css` cleanup slice on the quote-preview and quote-controls cluster before touching the deeper billing and payment-history blocks.

### 2026-04-06 | Codex | Phase 3 Reservations Selector Debt Cleanup Slice 1
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الأولى لتنظيف ديون الـ Selectors في ملف الحجوزات ضمن المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Started staged dark-selector cleanup in `src/styles/reservations.css` by converting the first bounded reservations slice to the canonical unified dark selector. This first pass covered the reservations pagination controls plus the reservation-tile cluster, including tile state cards, tile labels and values, tile footer and notes, the completed ribbon, and the tile action and confirm surfaces.
- **Debt Snapshot Update:** `src/styles/reservations.css` legacy dark-selector debt has now dropped from `265` legacy `:is` plus `2` legacy `:where` matches to `240` legacy `:is` and `2` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/reservations.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, dark-theme tabs-family coverage, related projects and modal audits, and build all passed after the first reservations cleanup slice. The reservations debt owner is still large, but the top-of-file pagination and tile cluster now follows the canonical dark-selector contract.
- **Manual Checks Run:** source-level review of the reservations pagination and reservation-tile cluster to confirm the canonical selector now covers the tile state cards, inner tile typography, footer and action surfaces, and dark hover and active states without changing reservation markup or behavior.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. `reservations.css` remains the dominant debt owner, but the first bounded slice proved the staged cleanup path is safe enough to continue on the next reservations-specific cluster.
- **Next Recommended Task:** take the next bounded `reservations.css` cleanup slice on the reservation-details and modal-info cluster before touching the deeper quote, billing, and payment-history blocks.

### 2026-04-06 | Codex | Phase 3 Core Selector Debt Cleanup Slice 5
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الخامسة لتنظيف ديون الـ Selectors في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Completed the specialized Flatpickr/date-time cleanup pass in `src/styles/core.css` by converting the remaining Flatpickr-heavy dark selectors to the canonical unified dark selector. This covered dark styling for Flatpickr inputs, alt inputs, placeholder/focus states, calendar chrome, days/range states, time controls, arrow buttons, time separator, and the later override block used to harden dark calendar styling.
- **Debt Snapshot Update:** `src/styles/core.css` legacy dark-selector debt has now dropped from `58` legacy `:is` plus `31` legacy `:where` matches to a small residual tail of `7` legacy `:is` and `6` legacy `:where`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/themeMigrationAudit.test.js`, `tests/theme/tabsFamilyDarkModeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit, tabs-family dark audit, and related projects/modal audits passed, and `npm run build` passed after the Flatpickr cleanup pass. Shared `core.css` dark-selector debt is now residual rather than systemic.
- **Manual Checks Run:** source-level review of the Flatpickr/date-time cluster to confirm the canonical dark selector now covers inputs, popover chrome, range states, and time controls without changing runtime hooks or page markup.
- **Regressions Or Risks Introduced:** no focused regression was detected in this pass. The remaining `core.css` debt is now small and localized, while the dominant unresolved selector debt has shifted clearly to `src/styles/reservations.css`.
- **Next Recommended Task:** start the first bounded selector-debt cleanup slice in `src/styles/reservations.css`, and treat the tiny `core.css` residue as follow-up rather than the main active debt track.

### 2026-04-06 | Codex | Phase 3 Core Selector Debt Cleanup Slice 4
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الرابعة لتنظيف ديون الـ Selectors في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Completed the remaining bounded non-Flatpickr cleanup in `src/styles/core.css` by converting the `payment-add-btn` dark-mode block to the canonical unified dark selector. This covers the shared payment-add button plus the higher-specificity `#project-payment-add.payment-add-btn` hover/focus-visible override used on the projects surface.
- **Debt Snapshot Update:** `src/styles/core.css` legacy `:is` dark-selector matches are now reduced from `63` to `58`, while the tracked legacy `:where` count remains `31`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`
- **Verification Snapshot:** the focused migration audit and related projects/modal surface audits passed, and `npm run build` passed after the payment-add cleanup slice. This leaves the remaining `core.css` debt concentrated in the Flatpickr-heavy dark cluster rather than the shared project surface primitives.
- **Manual Checks Run:** source-level review of the payment-add button dark block and the `projects.html` payment-add markup contract to confirm the same control surface now binds to the canonical selector without changing class names or IDs.
- **Regressions Or Risks Introduced:** no focused regression was detected in this slice. The remaining `core.css` debt is now much more specialized and mostly tied to Flatpickr/date-time behavior, which is a higher-risk cleanup surface than the generic and project-shell clusters already completed.
- **Next Recommended Task:** decide whether to keep the Flatpickr-heavy `core.css` cluster in the active Phase 3 cleanup track or to defer that specialized block and shift attention to another debt owner such as `reservations.css`.

### 2026-04-06 | Codex | Phase 3 Core Selector Debt Cleanup Slice 3
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الثالثة لتنظيف ديون الـ Selectors في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged selector-debt cleanup in `src/styles/core.css` by converting the shared project-details and modal-action dark-mode cluster from legacy `:is(html.dark-mode, body.dark-mode)` selectors to the canonical unified dark selector. This third slice covers project detail outlines, subtitles, detail summary/info/section shells, notes, muted list text, dark code badges, and the warning/ghost modal action variants without changing markup or runtime contracts.
- **Debt Snapshot Update:** `src/styles/core.css` legacy `:is` dark-selector matches are now reduced from `88` to `63`, while the tracked legacy `:where` count remains `31`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/detailsPageAudit.test.js`, `npm run build`, `npx vitest run tests/reservations/list/index.test.js tests/reservations/reservationPdf.test.js`, `npm run test:reservations`
- **Verification Snapshot:** the focused migration/detail audits passed, `npm run build` passed, and the isolated rerun of the previously timed-out reservation list/PDF tests passed. A subsequent full `npm run test:reservations` rerun still hit unrelated timeouts in existing reservation tests, so this slice should be treated as code-verified on focused coverage plus build rather than a fresh clean full-suite baseline.
- **Manual Checks Run:** source-level review of the converted project-details and modal-action dark blocks to confirm the same detail-page/modal contracts now bind to the canonical dark selector.
- **Regressions Or Risks Introduced:** no deterministic regression was found in focused coverage, but the broad reservations suite remains flaky under timeout pressure in unrelated tests. The remaining `core.css` legacy debt is now concentrated in the `payment-add-btn` block and the Flatpickr-heavy dark cluster, which should remain separate bounded cleanup targets.
- **Next Recommended Task:** take the next bounded `core.css` cleanup slice on the remaining `payment-add-btn` block and then decide whether the Flatpickr-heavy cluster should stay in `core.css` for Phase 3 cleanup or whether `reservations.css` should become the next deferred debt owner.

### 2026-04-06 | Codex | Phase 3 Core Selector Debt Cleanup Slice 2
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الثانية لتنظيف ديون الـ Selectors في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Continued staged selector-debt cleanup in `src/styles/core.css` by converting the shared project card, project timeline, and project table dark-mode cluster from legacy `:is(html.dark-mode, body.dark-mode)` selectors to the canonical unified dark selector. This second slice covers project focus cards, paid/unpaid/completed card states, project payment neutral chips, timeline track/item conflict styling, project table dark rows/hover/text, empty-row state, and the project row highlight state without changing page markup or runtime contracts.
- **Debt Snapshot Update:** `src/styles/core.css` legacy `:is` dark-selector matches are now reduced from `123` to `88`, while the tracked legacy `:where` count remains `31`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the focused migration and primitive/page audits passed, `npm run build` passed, and `npm run test:reservations` remained green with `93` passed test files, `1` skipped integration file, and `991` passing tests after the second cleanup slice.
- **Manual Checks Run:** source-level review of the converted project card, timeline, and projects-table blocks to confirm the shared dark styles still anchor to the same component contracts while using the canonical selector.
- **Regressions Or Risks Introduced:** no regression was observed in automated checks. The remaining `core.css` legacy debt is now concentrated more heavily in project-details, modal action, payment button, and Flatpickr-heavy dark blocks, so the next cleanup slice should stay bounded and avoid mixing Flatpickr with unrelated surface work.
- **Next Recommended Task:** take the next bounded `core.css` cleanup slice on the project-details and modal-action cluster before deciding whether the remaining Flatpickr-heavy block or `reservations.css` should be tackled next.

### 2026-04-06 | Codex | Phase 3 Core Selector Debt Cleanup Slice 1
### ٢٠٢٦-٠٤-٠٦ | كودكس | الشريحة الأولى لتنظيف ديون الـ Selectors في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Started staged selector-debt cleanup in `src/styles/core.css` by converting the first safe generic dark-mode block from legacy `:is(html.dark-mode, body.dark-mode)` selectors to the canonical unified dark selector. This first slice covers shared form controls, shared placeholder/focus/autofill states, soft button variants, checkbox/radio bridge styling, generic table dark styling, the theme toggle, and the `project-focus-card--confirmed` accent state without changing runtime classes or the primitive bridge contract.
- **Debt Snapshot Update:** `src/styles/core.css` legacy `:is` dark-selector matches are now reduced from `164` to `123`, while the tracked legacy `:where` count remains `31`.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the focused migration and primitive audits passed, `npm run build` passed, and `npm run test:reservations` remained green with `93` passed test files, `1` skipped integration file, and `991` passing tests after the cleanup slice.
- **Manual Checks Run:** source-level review of the cleaned `core.css` blocks to confirm the shared primitive bridge and Bootstrap-compatible class aliases were preserved while the canonical dark selector replaced the legacy form/table/toggle variants.
- **Regressions Or Risks Introduced:** no runtime regression was observed in automated checks, but `core.css` still carries meaningful legacy dark-selector debt in denser project, table-variant, and Flatpickr-heavy sections. Cleanup should continue in bounded slices only.
- **Next Recommended Task:** continue `core.css` cleanup on the next bounded legacy blocks, preferably the remaining generic utility/table-adjacent rules before touching the heavier Flatpickr cluster or deferring to `reservations.css`.

### 2026-04-06 | Codex | Phase 3 Dashboard Secondary Runtime Closeout
### ٢٠٢٦-٠٤-٠٦ | كودكس | إغلاق التحقق التشغيلي الثانوي على Dashboard في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the full-family secondary parity checkpoint with one focused fixture-backed runtime validation pass on the newly adopted dashboard secondary surfaces. Captured and reviewed the positions subtab, the equipment details modal, and the crew-picker modal under `dashboard.html?bypassAuth=1&fixture=dashboard`, confirming the shared second-bridge aliases for `Tabs`, `Badge`, `Table`, and `Modal` render as expected on the heavier extracted `full` surface.
- **Closeout Note:** The extracted `full` family now has both markup-level and focused runtime evidence for the shared second primitive bridge, so Phase 3 can move from page-level primitive adoption into staged selector-debt cleanup.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/dashboard-secondary-positions-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-secondary-equipment-modal-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-secondary-crew-modal-ar.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-secondary-positions-ar.png --click '[data-tab="technicians-tab"]' --click '#tech-subtab-trigger-positions' --delay 2200 --post-click-delay 1600 --inspect-selector '#technicians-positions-panel' --inspect-selector '#positions-count' --inspect-selector '#positions-table'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-secondary-equipment-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('equipment-lessor-badge').hidden = false; document.getElementById('equipment-lessor-badge').textContent = '🏢 مورد خارجي'; document.getElementById('equipment-variants-count').textContent = '2'; document.getElementById('equipment-variants-section').hidden = false; document.getElementById('equipment-variants-table-body').innerHTML = '<tr><td>EQ-101</td><td><span class=\\"ui-badge badge\\">متاح</span></td><td>1</td><td><button class=\\"btn btn-sm btn-outline-primary\\">إجراء</button></td></tr><tr><td>EQ-102</td><td><span class=\\"ui-badge badge\\">مؤجر</span></td><td>1</td><td><button class=\\"btn btn-sm btn-outline-primary\\">إجراء</button></td></tr>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('editEquipmentModal')).show();" --inspect-selector '#editEquipmentModal' --inspect-selector '#editEquipmentModal .modal-content' --inspect-selector '#equipment-lessor-badge' --inspect-selector '#equipment-variants-table-body'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-secondary-crew-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.querySelector('#crew-assignment-table tbody').innerHTML = '<tr><td>1</td><td>مصور</td><td>1200</td><td><span class=\\"ui-badge badge\\">أحمد</span></td><td><button class=\\"btn btn-sm btn-outline-danger\\">حذف</button></td></tr><tr><td>2</td><td>مهندس صوت</td><td>900</td><td><span class=\\"ui-badge badge\\">خالد</span></td><td><button class=\\"btn btn-sm btn-outline-danger\\">حذف</button></td></tr>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('selectTechniciansModal')).show();" --inspect-selector '#selectTechniciansModal' --inspect-selector '#selectTechniciansModal .modal-content' --inspect-selector '#crew-assignment-table' --inspect-selector '#technician-picker-selection-info'`
- **Verification Snapshot:** the focused runtime capture confirmed `#positions-count` renders as `ui-badge badge`, `#editEquipmentModal .modal-content` renders as `ui-modal__content modal-content`, `#equipment-lessor-badge` renders as `ui-badge ui-badge--soft badge-soft`, and `#crew-assignment-table` renders as `ui-table table table-hover align-middle` under the accepted dashboard fixture route. The shared second-bridge baseline is now evidenced on both extracted `full` pages.
- **Manual Checks Run:** reviewed the three captured screenshots and inspected selector metadata for the positions subtab, equipment modal, and crew-picker modal in dark mode.
- **Regressions Or Risks Introduced:** no new runtime issue appeared on the focused dashboard secondary surfaces. The remaining Phase 3 risk now shifts away from page-level primitive adoption and toward how aggressively selector-debt cleanup is staged in `core.css` and `reservations.css`.
- **Next Recommended Task:** begin staged selector-debt cleanup in `core.css`, then decide whether `reservations.css` should follow in the same phase or remain deferred until the first cleanup slice proves stable.

### 2026-04-06 | Codex | Phase 3 Dashboard Secondary Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives الثانوية على Dashboard في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the second primitive adoption into `dashboard.html` by layering the shared `ui-badge`, `ui-tabs`, `ui-tab`, `ui-table-shell`, `ui-table`, and `ui-modal__*` aliases onto the heavier extracted `full` surface without removing the old compatibility classes. The dashboard now uses the shared badge bridge on sidebar and equipment badges, the shared tabs bridge on the sidebar, top-level dashboard tabbars, technician subtabs, and reservations subtabs, the shared table bridge on customer, positions, equipment-package, maintenance, reservation, variants, and crew-picker tables, and the shared modal bridge on maintenance, equipment, technician-picker, reservation-details, calendar-details, and close-reservation modal shells.
- **Secondary Baseline Note:** `dashboard.html` now extends the shared `Table`, `Modal`, `Tabs`, and `Badge` bridge across the full extracted `full` family.
- **Key Files Or Surfaces Touched:** `src/pages/dashboard.html`, `tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js`, `tests/theme/fullFamilyPrimitiveParityAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/dashboardSecondaryPrimitiveAdoptionAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/fullFamilyPrimitiveParityAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the heavier extracted `dashboard.html` surface now carries live second-bridge markup for badges, tabs, table shells/tables, and modal chrome alongside the earlier first-bridge aliases. The focused secondary audits pass, the build succeeds, and `npm run test:reservations` remains green with `93` passed test files, `1` skipped integration file, and `991` passing tests after the dashboard secondary adoption step.
- **Manual Checks Run:** source-level review of the updated dashboard sidebar stats, dashboard tabbars, technician and reservations subtabs, positions and maintenance tables, equipment-package and reservation tables, equipment variants table, crew-picker modal, and the shared reservation/calendar/maintenance modal shells to confirm the new aliases were added in place without disturbing `data-tab`, fixture-backed validation routes, modal IDs, or close-action contracts.
- **Regressions Or Risks Introduced:** the extracted `full` family is now broadly aligned on the second primitive bridge, but the remaining risk is parity and runtime depth rather than missing markup coverage. The next step should keep the accepted dashboard fixture route explicit and close the parity loop before widening Phase 3 further.
- **Next Recommended Task:** capture one focused fixture-backed runtime validation pass on the newly adopted dashboard secondary surfaces, then decide whether Phase 3 should move from primitive adoption to staged selector-debt cleanup.

### 2026-04-06 | Codex | Phase 3 Full Family Secondary Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives الثانوية لعائلة Full في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Started the second primitive adoption on the extracted `full` family by layering the shared `ui-badge`, `ui-tabs`, `ui-tab`, `ui-table-shell`, `ui-table`, and `ui-modal__*` aliases into `projects.html` without removing the old compatibility classes. The page now uses the shared badge bridge on sidebar stats and timeline status chips, the shared tabs bridge on sidebar navigation plus top-level and sub-tab controls, the shared table bridge on project, reports, customer, and technician tables, and the shared modal bridge on project/reservation/close-project modal chrome.
- **Secondary Baseline Note:** `projects.html` is now the first extracted `full`-family reference for the shared `Table`, `Modal`, `Tabs`, and `Badge` bridge.
- **Key Files Or Surfaces Touched:** `src/pages/projects.html`, `tests/theme/fullSecondaryPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/fullSecondaryPrimitiveAdoptionAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** `projects.html` now proves the second primitive bridge on a live extracted `full`-family page across badges, tabs, table shells/tables, and modal chrome. The focused audits pass, the build succeeds, and `npm run test:reservations` remains green with `92` passed test files, `1` skipped integration file, and `989` passing tests after this adoption step.
- **Manual Checks Run:** source-level review of `projects.html` confirmed the new aliases were added in place on the sidebar stats, navigation tabs, horizontal/subtab controls, timeline badges, list/report/customer/technician tables, and modal shells without changing report/template tab wiring, modal IDs, or close-action forms.
- **Regressions Or Risks Introduced:** `projects.html` is the smaller `full`-family surface, so it proves the secondary bridge honestly but not exhaustively. The remaining Phase 3 risk is the heavier `dashboard.html` surface where `data-tab` routing, fixture-backed validation, and modal-heavy operational flows are denser.
- **Next Recommended Task:** extend the same secondary primitive adoption pattern to `dashboard.html`; the `dashboard.html` secondary primitive pass should then refresh the full-family parity checks so both extracted `full` surfaces share the same bridge baseline.

### 2026-04-06 | Codex | Phase 3 Detail Tabs Secondary Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني تبويبات الـ Primitives الثانوية على صفحات التفاصيل في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the live `ui-tabs` and `ui-tab` adoption across the remaining extracted `tabs` family by layering the new aliases into `customer.html` and `technician.html` in place. The detail pages now use `ui-tab` on their extracted sidebar navigation links and their live reservations/projects tab triggers, plus `ui-tabs` on the main horizontal tablists, while preserving all existing `tab-button` classes, active-state wiring, hidden panel contracts, Bootstrap-backed markup, and detail-page modal/runtime behavior.
- **Detail Baseline Note:** `customer.html` and `technician.html` now extend the live `ui-tabs` and `ui-tab` adoption across the full extracted `tabs` family.
- **Key Files Or Surfaces Touched:** `src/pages/customer.html`, `src/pages/technician.html`, `tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js tests/theme/homeSecondaryPrimitiveAdoptionAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js tests/theme/tabsShellPrepAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the full extracted `tabs` family now carries live `ui-tabs` and `ui-tab` markup across `home.html`, `customer.html`, and `technician.html`. The focused detail/tabs primitive audits pass, the build succeeds, and `npm run test:reservations` remains green with `91` passed test files, `1` skipped integration file, and `987` passing tests after the detail-page tabs adoption step.
- **Manual Checks Run:** source-level review of `customer.html` and `technician.html` confirmed the new `ui-tabs` and `ui-tab` aliases were added in place on the sidebar tab links and the reservations/projects tablists without changing `data-customer-tab`, `data-technician-tab`, hidden detail panels, edit flows, or modal IDs.
- **Regressions Or Risks Introduced:** the extracted `tabs` family is now aligned on the second primitive bridge for live tab markup, so the next risk shifts to the denser `full` family where reports/templates subtabs, heavier modal flows, and close-action forms all coexist on the same surfaces.
- **Next Recommended Task:** start the same secondary primitive adoption pattern on `projects.html` as the first extracted `full`-family target, then use that result to prepare the heavier `dashboard.html` surface.

### 2026-04-06 | Codex | Phase 3 Home Secondary Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives الثانوية على Home في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Adopted the new shared `ui-tabs` and `ui-tab` aliases on `home.html`, making it the first live extracted surface that proves the tabs portion of the second primitive bridge in real markup. The page now uses `ui-tab` on its sidebar navigation links and both desktop/mobile `home-main-tabbar` link sets, while preserving the existing `tab-button` contract, shell wiring, and hidden manager/admin card behavior.
- **Key Files Or Surfaces Touched:** `src/pages/home.html`, `tests/theme/homeSecondaryPrimitiveAdoptionAudit.test.js`, `tests/theme/tabsPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/homeSecondaryPrimitiveAdoptionAudit.test.js tests/theme/tabsPrimitiveAdoptionAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js tests/theme/tabsShellPrepAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** `home.html` now proves the new shared `ui-tabs` and `ui-tab` aliases on a live extracted tab surface. The focused tabs/primitive audits pass, the build succeeds, and the reservations suite remains green with `91` passed test files, `1` skipped integration file, and `987` passing tests after the live tabs adoption step.
- **Manual Checks Run:** source-level review of `home.html` confirmed the new `ui-tabs` and `ui-tab` aliases were added in place on the sidebar tab links and both `home-main-tabbar` tablists without changing link targets, shell slots, or the existing `tab-button` hooks.
- **Regressions Or Risks Introduced:** `home.html` is the lightest tabs-family surface, so it proves the bridge honestly but not exhaustively. The next risk is extending the same `ui-tabs` adoption into `customer.html` and `technician.html`, where detail-page tabs and richer state handling are denser.
- **Next Recommended Task:** extend the same in-place `ui-tabs` and `ui-tab` adoption pattern to `customer.html` and `technician.html`, then expand the secondary primitive adoption audits to cover the full extracted `tabs` family.

### 2026-04-06 | Codex | Phase 3 Users Secondary Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives الثانوية على Users في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Adopted the new shared `Table`, `Modal`, and `Badge` bridge aliases on `users.html` while preserving the existing Bootstrap-compatible classes, modal IDs, shell structure, and users-specific script behavior. `users.html` now proves the new shared `Table`, `Modal`, and `Badge` bridge aliases on a live extracted surface. `ui-tabs` adoption still needs a real tabbed extracted page instead of being forced onto markup that does not actually render tabs.
- **Key Files Or Surfaces Touched:** `src/pages/users.html`, `tests/theme/usersSecondaryPrimitiveAdoptionAudit.test.js`, `tests/theme/usersDarkModeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/usersSecondaryPrimitiveAdoptionAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** the users page now carries live `ui-badge`, `ui-table-shell`, `ui-table`, and `ui-modal__*` markup while keeping its old compatibility classes. The focused users/theme audits pass, the build succeeds, and the full reservations suite remains green with `90` passed test files, `1` skipped integration file, and `985` passing tests.
- **Manual Checks Run:** source-level review of `users.html` confirmed the new aliases were added in place on the admin badge, the main users table, the logs modal chrome, and both logs tables without changing the modal close button contract, IDs, or shell slot usage.
- **Regressions Or Risks Introduced:** `users.html` does not render a real tab surface, so this pass cannot prove `ui-tabs` adoption honestly. The next risk is selecting the first extracted page where `ui-tabs` can be layered into live tab markup without disturbing tab state behavior.
- **Next Recommended Task:** adopt `ui-tabs` and `ui-tab` on the first extracted page that already renders real tabs, preferably `home.html`, then extend the second primitive adoption audit beyond `users.html`.

### 2026-04-06 | Codex | Phase 3 Shared Table Modal Tabs Badge Bridge
### ٢٠٢٦-٠٤-٠٦ | كودكس | جسر Table وModal وTabs وBadge المشترك في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Implemented the second shared primitive bridge in the central style layers for `Table`, `Modal`, `Tabs`, and `Badge`. The repo now exposes `ui-table-shell`, `ui-table`, `ui-modal__content|header|body|footer`, `ui-tabs`, `ui-tab`, `ui-badge`, `ui-badge--outline`, and `ui-badge--soft` while preserving the existing `.table-responsive`, `.table`, `.modal-*`, `.tab-button`, `.badge`, `.badge-outline`, and `.badge-soft` classes as compatibility aliases.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `tests/theme/secondaryPrimitiveContractAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/primitiveContractAudit.test.js tests/theme/secondaryPrimitiveContractAudit.test.js tests/theme/fullFamilyPrimitiveParityAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** `5` focused theme files passed, `89` test files passed overall, `1` integration file remained skipped, and the reservations suite finished with `983` passing tests after the second shared bridge layer was introduced.
- **Manual Checks Run:** source-level review of the shared table, modal, tab, and badge selectors to confirm the new `ui-*` aliases preserve the old compatibility classes instead of replacing them, and that the canonical dark selector still governs shared dark-mode behavior.
- **Regressions Or Risks Introduced:** no page markup was changed in this pass, so the risk remains low. The next risk moves to first adoption, where one extracted low-risk surface must prove the new aliases in real markup without upsetting Bootstrap-backed modals, table behavior, or tab-state wiring.
- **Next Recommended Task:** adopt the new `Table`, `Modal`, `Tabs`, and `Badge` bridge aliases on one low-risk extracted surface, preferably `users.html`, before applying them to denser operational pages.

### 2026-04-06 | Codex | Phase 3 Dashboard Primitive Validation
### ٢٠٢٦-٠٤-٠٦ | كودكس | التحقق من Primitives على Dashboard في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Closed the full-family parity checkpoint by adding a dedicated parity audit across `projects.html` and `dashboard.html`, then running fixture-backed dashboard validation on the newly adopted controls for equipment, maintenance, reservations create/list/report, and `#closeReservationModal`. The extracted `full` family now has both markup-level adoption parity and a recorded runtime validation path on `dashboard.html?bypassAuth=1&fixture=dashboard`.
- **Key Files Or Surfaces Touched:** `tests/theme/fullFamilyPrimitiveParityAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/dashboard-primitive-equipment-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-primitive-maintenance-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-primitive-res-create-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-primitive-res-list-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-primitive-reports-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-primitive-close-res-modal-ar.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-primitive-equipment-ar.png --click '[data-tab="equipment-tab"]' --delay 2200 --post-click-delay 1800 --inspect-selector '#equipment-tab' --inspect-selector '#new-equipment-desc' --inspect-selector '#equipment-package-open-selector' --inspect-selector '#search-equipment'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-primitive-maintenance-ar.png --click '[data-tab="maintenance-tab"]' --delay 2200 --post-click-delay 1800 --inspect-selector '#maintenance-tab' --inspect-selector '#maintenance-equipment-barcode' --inspect-selector '#maintenance-priority' --inspect-selector '#maintenance-search'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-primitive-res-create-ar.png --click '[data-tab="reservations-tab"]' --delay 2200 --post-click-delay 1800 --inspect-selector '#reservations-tab' --inspect-selector '#res-start' --inspect-selector '#res-customer-input' --inspect-selector '#create-reservation-btn'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-primitive-res-list-ar.png --click '[data-tab="reservations-tab"]' --click '#sub-tab-trigger-my-reservations-tab' --delay 2200 --post-click-delay 1800 --inspect-selector '#my-reservations-tab' --inspect-selector '#search-reservation' --inspect-selector '#reservation-status-filter' --inspect-selector '#reservations-list'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-primitive-reports-ar.png --click '[data-tab="reservations-tab"]' --click '#sub-tab-trigger-reports-tab' --delay 2200 --post-click-delay 1800 --inspect-selector '#reports-tab' --inspect-selector '#reports-range' --inspect-selector '#reports-search' --inspect-selector '#reports-preview-pdf'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-primitive-close-res-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('close-reservation-notes').value = 'تمت معاينة الحجز واكتمال الإغلاق في اختبار الوضع الداكن.'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('closeReservationModal')).show();" --inspect-selector '#closeReservationModal' --inspect-selector '#closeReservationModal .modal-content' --inspect-selector '#close-reservation-notes' --inspect-selector '#close-reservation-submit'`, `npx vitest run tests/theme/fullFamilyPrimitiveParityAudit.test.js tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/primitiveContractAudit.test.js`
- **Verification Snapshot:** fixture-backed dark-mode captures completed successfully across equipment, maintenance, reservation create/list/report, and the close-reservation modal; all inspected adopted controls were present under the accepted dashboard fixture route. The focused audit run passed after the parity guard was added.
- **Manual Checks Run:** runtime screenshot capture plus selector inspection on `dashboard.html?bypassAuth=1&fixture=dashboard` for the adopted equipment, maintenance, reservations create/list/report, and close-action modal states. The visible `enhanced-select__native` elements remained hidden at the DOM layer by design while their custom select presentation stayed active on the rendered page.
- **Regressions Or Risks Introduced:** no new blocker was found on the fixture-backed dashboard path. The next risk shifts away from dashboard-only parity and toward broadening the shared primitive layer itself so tables, modals, tabs, and badges do not drift while page adoption continues.
- **Next Recommended Task:** implement the next shared primitive bridge for `Table`, `Modal`, `Tabs`, and `Badge`, then back it with audits before introducing more page-level markup changes.

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place `ui-*` adoption pattern to `dashboard.html`, making it the second primitive-adoption baseline inside the extracted `full` family. The dashboard now uses shared primitive aliases on the shared dashboard tabbars, embedded customer/technician forms, equipment and maintenance controls, reservation create/list/report controls, and the close-reservation plus maintenance-close forms while preserving `data-tab` behavior, extracted-shell structure, fixture-backed validation routes, and the modal-close button contract.
- **Key Files Or Surfaces Touched:** `src/pages/dashboard.html`, `tests/theme/dashboardPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/dashboardPrimitiveAdoptionAudit.test.js tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** `7` focused theme files passed, `87` test files passed overall, and `1` integration file remained skipped in `npm run test:reservations`.
- **Manual Checks Run:** static review of the adopted dashboard tabbars, forms, filters, reports controls, and close-action modals to confirm the new `ui-*` aliases preserve legacy bridge classes, extracted-shell markup, `data-tab` wiring, and the accepted fixture-backed validation route `dashboard.html?bypassAuth=1&fixture=dashboard`.
- **Regressions Or Risks Introduced:** the extracted `full` family is now aligned on the primitive-adoption baseline, but the next risk is parity depth rather than missing adoption coverage. The heavier dashboard still needs fixture-backed runtime spot checks on the newly adopted controls so Phase 3 does not confuse markup parity with fully validated behavior.
- **Next Recommended Task:** extend the primitive audit further across both `full`-family surfaces and run fixture-backed dashboard validation on the adopted equipment, maintenance, reservations, and reports controls before widening Phase 3 beyond the extracted families.

### 2026-04-06 | Codex | Phase 3 Full Family Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives لعائلة Full في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place `ui-*` adoption pattern to `projects.html`, making it the first primitive-adoption reference inside the extracted `full` family. The page now uses shared primitive aliases for top-level content tab wrappers, project creation fields, project list/report filters, templates controls, embedded customer/technician forms, and the close-project form while preserving all legacy bridge classes, report/template tab wiring, subtab contracts, extracted-shell structure, and modal IDs.
- **Key Files Or Surfaces Touched:** `src/pages/projects.html`, `tests/theme/fullPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/fullPrimitiveAdoptionAudit.test.js tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Verification Snapshot:** `6` focused theme files passed, `86` test files passed overall, and `1` integration file remained skipped in `npm run test:reservations`.
- **Manual Checks Run:** static review of the adopted `projects.html` surfaces to confirm the new `ui-*` aliases preserve legacy bridge classes, extracted full-shell markup, reports/templates tab behavior, project subtabs, and modal-close button contracts.
- **Regressions Or Risks Introduced:** `projects.html` now proves the primitive-adoption pattern on the extracted `full` family, but the next risk is the heavier `dashboard.html` surface where `data-tab` behavior, fixture-backed runtime validation, reports/calendar/maintenance states, and modal-heavy flows all coexist.
- **Next Recommended Task:** extend the same in-place `ui-*` adoption pattern to `dashboard.html`, keeping the fixture-backed validation route and heavy operational contracts explicit while the second `full`-family surface is adopted.

### 2026-04-06 | Codex | Phase 3 Detail Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives على صفحات التفاصيل في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place `ui-*` adoption pattern to `customer.html` and `technician.html`, turning the extracted detail-page pair into the second primitive-adoption baseline inside the `tabs` family. Both pages now use shared primitive aliases for primary action rows, main detail cards, tab-bar cards, filter inputs/selects, edit forms, and technician payout controls while preserving all existing bridge classes, Bootstrap surfaces, Flatpickr-linked inputs, and modal/runtime contracts.
- **Key Files Or Surfaces Touched:** `src/pages/customer.html`, `src/pages/technician.html`, `tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js tests/theme/tabsPrimitiveAdoptionAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/customerPageAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of both detail pages to confirm the adopted action rows, card surfaces, filter controls, edit forms, and technician payout controls all preserve their legacy bridge classes, hidden-attribute behavior, Bootstrap modal structure, and extracted-shell markup alongside the new `ui-*` aliases.
- **Regressions Or Risks Introduced:** the extracted `tabs` family is now aligned on a primitive baseline, but the next risk moves to the denser `full` family where `projects.html` combines heavier tab surfaces, reports/templates controls, and multiple modal contracts. Primitive adoption there must stay narrow and avoid changing report/template behavior.
- **Next Recommended Task:** extend the same in-place `ui-*` adoption pattern to `projects.html` so Phase 3 establishes the first primitive-adoption reference inside the extracted `full` family before touching `dashboard.html`.

### 2026-04-06 | Codex | Phase 3 Home Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives على صفحة Home في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place `ui-*` adoption pattern to `home.html`, making it the first primitive-adoption reference on the extracted `tabs` family. The home page now uses shared primitive aliases for greeting actions, major card surfaces, tab-bar cards, and the summary refresh action while preserving all legacy bridge classes and extracted-shell behavior.
- **Key Files Or Surfaces Touched:** `src/pages/home.html`, `tests/theme/tabsPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tabsPrimitiveAdoptionAudit.test.js tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/authPageAudit.test.js tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the home page markup to confirm the adopted greeting actions, card surfaces, tab-bar wrappers, and refresh action all preserve their legacy bridge classes and extracted-shell structure alongside the new `ui-*` aliases.
- **Regressions Or Risks Introduced:** `home.html` proves the primitive adoption pattern on the extracted `tabs` family, but it is still the lightest page in that family. The next risk is keeping the same in-place alias pattern behavior-safe on `customer.html` and `technician.html`, where Bootstrap, Flatpickr, tabs, detail stats, and modal surfaces all coexist.
- **Next Recommended Task:** extend the same in-place `ui-*` adoption pattern to `customer.html` and `technician.html` so the extracted `tabs` family gains a second primitive baseline beyond the lighter `home.html` surface.

### 2026-04-06 | Codex | Phase 3 Users Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives على صفحة Users في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place `ui-*` adoption pattern to `users.html`, which closes the compact manager family baseline. The users page now uses shared primitive aliases for greeting actions, content cards, form controls, select input, refresh/cancel/save buttons, search shell, and the Bootstrap modal footer action while preserving all legacy bridge classes.
- **Key Files Or Surfaces Touched:** `src/pages/users.html`, `tests/theme/compactPrimitiveAdoptionAudit.test.js`, `tests/theme/usersDarkModeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the users page markup to confirm the adopted cards, controls, and modal footer action all preserve their legacy bridge classes and Bootstrap wiring alongside the new `ui-*` aliases.
- **Regressions Or Risks Introduced:** the compact family is now aligned, so the next risk shifts to the next low-risk shell family rather than compact-shell inconsistency. The next adoption target should prove the same pattern on `home.html` or another extracted low-risk page before Phase 3 widens further.
- **Next Recommended Task:** extend the same in-place `ui-*` adoption pattern to `home.html` so Phase 3 starts building a primitive baseline on the extracted `tabs` family after the compact family closeout.

### 2026-04-06 | Codex | Phase 3 Compact Family Primitive Baseline
### ٢٠٢٦-٠٤-٠٦ | كودكس | خط أساس الـ Primitives لعائلة Compact في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place primitive adoption pattern from `site-analytics.html` to `contact-inquiries.html` and `feedback-submissions.html`, so the compact manager family now shares one adoption baseline for shared cards, action buttons, selects, and search inputs. Added a dedicated compact-family audit to keep that baseline enforced as one contract instead of three page-specific expectations.
- **Key Files Or Surfaces Touched:** `src/pages/contact-inquiries.html`, `src/pages/feedback-submissions.html`, `tests/theme/compactPrimitiveAdoptionAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/compactPrimitiveAdoptionAudit.test.js tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the compact-family markup to confirm the adopted buttons, cards, selects, and inputs all keep their original bridge classes alongside the new `ui-*` aliases.
- **Regressions Or Risks Introduced:** the compact family is now aligned, but the next low-risk surface should prove the same adoption approach on a page with denser controls and at least one Bootstrap-dependent surface. The main remaining risk is inconsistency between compact-shell pages and `users.html` if adoption stops here.
- **Next Recommended Task:** extend the same in-place `ui-*` adoption pattern to `users.html` so the full compact manager family shares one primitive baseline before moving to broader page-level visual cleanup.

### 2026-04-06 | Codex | Phase 3 Compact Shell Primitive Adoption
### ٢٠٢٦-٠٤-٠٦ | كودكس | تبني الـ Primitives على صفحة Compact Shell في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Extended the in-place primitive adoption pattern from `login.html` to `site-analytics.html`, which is an extracted compact manager-shell page. The analytics page now uses the shared `ui-*` aliases for action buttons, content cards, and filter selects while preserving all legacy bridge classes and compact-shell behavior.
- **Key Files Or Surfaces Touched:** `src/pages/site-analytics.html`, `tests/theme/siteAnalyticsAuthAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the compact analytics markup to confirm the adopted buttons, selects, and cards all keep the old bridge classes alongside the new `ui-*` aliases and therefore do not alter shell/runtime contracts.
- **Regressions Or Risks Introduced:** Phase 3 now has an extracted-shell adoption reference, but it is still limited to one compact manager page. The next risk is drift if the remaining compact manager pages continue styling the same shared surfaces without the new aliases.
- **Next Recommended Task:** extend the same in-place `ui-*` adoption pattern to `contact-inquiries.html` and `feedback-submissions.html` so the compact manager family shares one primitive-adoption baseline before moving to heavier low-risk pages.

### 2026-04-06 | Codex | Phase 3 First Primitive Adoption Target
### ٢٠٢٦-٠٤-٠٦ | كودكس | أول هدف لتبني الـ Primitives في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Chose `login.html` as the first low-risk primitive adoption target and layered the new shared primitive aliases into the existing auth markup without removing the legacy bridge classes. The auth page now uses `ui-*` aliases for its language button, auth card, username/password controls, and primary submit action, which establishes the first real page-level adoption reference for Phase 3.
- **Key Files Or Surfaces Touched:** `src/pages/login.html`, `tests/theme/authPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/authPageAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the login adoption markup to confirm that every adopted element still keeps its legacy bridge class next to the new `ui-*` alias and therefore should not change runtime behavior.
- **Regressions Or Risks Introduced:** the first adoption reference is intentionally narrow and low-risk, but the auth page alone is not enough to prove adoption behavior across manager-shell pages. The next risk is ensuring the same in-place alias pattern works on a shell-based page that mixes more shared cards and buttons.
- **Next Recommended Task:** adopt the same in-place `ui-*` pattern on one compact manager page, preferably `site-analytics.html`, so Phase 3 has a second reference surface that lives on an extracted shell.

### 2026-04-06 | Codex | Phase 3 Primitive Bridge Implementation
### ٢٠٢٦-٠٤-٠٦ | كودكس | تنفيذ طبقة الربط للـ Primitives في المرحلة الثالثة

- **Phase:** Core UI Primitives
- **Summary of Completed Work:** Implemented the first shared primitive bridge in the central CSS layers for `Button`, `Input`, `Textarea`, `Select`, enhanced select trigger, and `Card`. The new `ui-*` aliases now sit on top of the existing bridge classes instead of replacing them, so current markup can keep using `.btn*`, `.form-control`, `.form-select`, `.enhanced-select__trigger`, and `.card` while Phase 3 starts building a stable primitive contract for future page-level adoption.
- **Key Files Or Surfaces Touched:** `src/styles/core.css`, `src/styles/app.css`, `src/styles/enhanced-select.css`, `tests/theme/primitiveContractAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/primitiveContractAudit.test.js tests/theme/fullShellContractAudit.test.js tests/theme/compactShellSequencingAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the new `ui-*` aliases against the documented primitive contract and the existing legacy class bridge in the shared style layers.
- **Regressions Or Risks Introduced:** the primitive bridge is now real, but it has not yet been adopted on a low-risk page. The remaining risk is accidental drift between `ui-*` aliases and legacy bridge classes if later styling changes touch only one side of the compatibility layer.
- **Next Recommended Task:** choose the first low-risk primitive adoption surface, then apply the new shared `Button`/`Input`/`Select`/`Card` aliases there without changing behavior or dark-theme parity.

### 2026-04-06 | Codex | Phase 2 Shared Shell Extraction Closeout
### ٢٠٢٦-٠٤-٠٦ | كودكس | إغلاق المرحلة الثانية لاستخراج الـ Shared Shell

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Ran the broader migrated-dashboard fixture-backed smoke across reservations reports, reservations calendar, maintenance, and a modal-heavy reservation details state on the extracted full shell. All checked surfaces rendered in dark mode on the migrated dashboard path without `auth-pending` drift or route instability. Based on that result, the shared shell program is now treated as effectively complete across the compact, tabs, and full families, and the active track can move to Phase 3 Core UI Primitives.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/dashboard-migrated-reports-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-migrated-calendar-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-migrated-maintenance-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-migrated-reservation-modal-ar.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-migrated-reports-ar.png --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-reports-tab' --delay 2200 --post-click-delay 1800 --inspect-selector '#reports-tab' --inspect-selector '#reports-reservations-table' --inspect-selector '#reports-empty-state'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-migrated-calendar-ar.png --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-calendar-tab' --delay 2200 --post-click-delay 1800 --inspect-selector '#calendar-tab' --inspect-selector '#calendar-panel' --inspect-selector '#calendar'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-migrated-maintenance-ar.png --click '[data-tab=\"maintenance-tab\"]' --delay 2200 --post-click-delay 1800 --inspect-selector '#maintenance-tab' --inspect-selector '#maintenance-table-body' --inspect-selector '#closeMaintenanceModal'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-migrated-reservation-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('reservation-details-body').innerHTML = '<div class=\"space-y-3\"><p>تفاصيل حجز تجريبية للوضع الداكن</p><p>العميل: شركة النخبة</p><button class=\"btn btn-primary\">إجراء</button></div>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('reservationDetailsModal')).show();" --inspect-selector '#reservationDetailsModal' --inspect-selector '#reservationDetailsModal .modal-content'`
- **Manual Checks Run:** reviewed the four migrated dashboard captures and confirmed readable dark surfaces for reports, calendar, maintenance, and modal chrome on the shared full shell. The extracted dashboard continues to render the expected fixture-backed heavy states without selector or shell drift.
- **Regressions Or Risks Introduced:** Shared Shell Extraction no longer has an extraction blocker. The remaining risk shifts to Phase 3: introducing actual reusable primitives without breaking the current bridge classes or dark-mode behavior on already-extracted shells.
- **Next Recommended Task:** implement the first shared primitive bridge for `Button`, `Input`, `Select`, and `Card`, then add or extend the primitive audit so the repo can start low-risk visual unification safely.

### 2026-04-06 | Codex | Phase 2 Dashboard Full Shell Extraction Verification
### ٢٠٢٦-٠٤-٠٦ | كودكس | التحقق من استخراج Full Shell لصفحة Dashboard في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Completed the first `dashboard.html` extraction pass onto `src/pages/_partials/full-manager-shell.html`, aligned the extraction-focused shell audits with the migrated source, preserved the shared `auth-pending` reveal contract through `src/main.js`, and closed the verification loop with focused shell-contract tests, a production build, a fixture-backed migrated dashboard dark smoke capture, and the full `npm run test:reservations` safety net. Also refreshed stale detail-page fixture/shell audits that still pointed at pre-extraction template anatomy.
- **Key Files Or Surfaces Touched:** `src/pages/dashboard.html`, `src/main.js`, `tests/theme/fullShellContractAudit.test.js`, `tests/theme/fullShellPrepAudit.test.js`, `tests/theme/sharedShellContractAudit.test.js`, `tests/theme/dashboardDarkValidationAudit.test.js`, `tests/theme/compactShellSequencingAudit.test.js`, `tests/theme/detailsPageAudit.test.js`, `tests/theme/detailsFixtureAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/dashboard-migrated-overview-ar.png`
- **Tests Run:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/dashboardDarkValidationAudit.test.js tests/theme/compactShellSequencingAudit.test.js`, `npm run build`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-migrated-overview-ar.png --click '[data-greeting-toggle]' --delay 2200 --post-click-delay 1200 --inspect-selector '#dashboard-greeting-panel' --inspect-selector '#dashboard-sidebar'`, `npm run test:reservations`
- **Manual Checks Run:** reviewed the migrated dashboard fixture-backed dark screenshot and confirmed visible greeting-panel content, dark-theme state, and no `auth-pending` lock on the extracted shell. Static review also confirmed that dashboard tabs, quick links, heavy-surface markers, and modal IDs remain in the migrated source.
- **Regressions Or Risks Introduced:** no extraction regression was confirmed by the focused audits, build, or broad test suite. The remaining risk is normal post-migration drift on the densest dashboard flows if future work changes report/calendar/maintenance or modal wiring without reusing the fixture-backed validation path.
- **Next Recommended Task:** run one broader migrated-dashboard fixture smoke across reports, calendar, and maintenance surfaces, then decide whether Shared Shell Extraction can be marked effectively complete and Phase 3 primitive implementation can become the main active track.

### 2026-04-05 | Codex | Phase 2 Dashboard Modal Dark Release Gate
### ٢٠٢٦-٠٤-٠٥ | كودكس | بوابة الإطلاق الداكنة لواجهات Dashboard ذات الـ Modals في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Completed the remaining dashboard modal dark-validation checklist on the fixture-backed path. Confirmed readable dark-mode rendering for `#reservationDetailsModal`, `#closeReservationModal`, `#calendarReservationModal`, `#closeMaintenanceModal`, and `#maintenanceReportModal` with seeded content and live Bootstrap modal chrome. With this pass complete, the dashboard fixture-backed validation gate is now closed and the next step becomes the first `dashboard.html` migration pass onto the shared `full` shell.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-reservation-details-modal-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-close-reservation-modal-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-calendar-reservation-modal-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-close-maintenance-modal-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-maintenance-report-modal-ar.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-reservation-details-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('reservation-details-body').innerHTML = '<div class=\"space-y-3\"><p>تفاصيل حجز تجريبية للوضع الداكن</p><p>العميل: شركة النخبة</p><button class=\"btn btn-primary\">إجراء</button></div>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('reservationDetailsModal')).show();" --inspect-selector '#reservationDetailsModal' --inspect-selector '#reservationDetailsModal .modal-content'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-close-reservation-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('close-reservation-notes').value = 'تمت معاينة الحجز واكتمال الإغلاق في اختبار الوضع الداكن.'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('closeReservationModal')).show();" --inspect-selector '#closeReservationModal' --inspect-selector '#closeReservationModal .modal-content' --inspect-selector '#close-reservation-notes'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-calendar-reservation-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('calendar-reservation-details').innerHTML = '<div class=\"space-y-3\"><p>موعد الحجز: 07:00 PM</p><p>الموقع: مركز التأجير</p><span class=\"badge bg-primary\">مؤكد</span></div>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('calendarReservationModal')).show();" --inspect-selector '#calendarReservationModal' --inspect-selector '#calendarReservationModal .modal-content'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-close-maintenance-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('maintenance-close-modal-details').innerHTML = '<div class=\"maintenance-close-modal__ticket-card\"><div class=\"maintenance-close-modal__ticket-title\">Lighting Console</div><div class=\"maintenance-close-modal__ticket-meta\"><span>LGT-200</span><span>High</span></div></div>'; document.getElementById('maintenance-close-report').value = 'تمت المعايرة واستبدال المنفذ التالف.'; document.getElementById('maintenance-close-cost').value = '450'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('closeMaintenanceModal')).show();" --inspect-selector '#closeMaintenanceModal' --inspect-selector '#closeMaintenanceModal .modal-content' --inspect-selector '#maintenance-close-report'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-maintenance-report-modal-ar.png --delay 2200 --post-click-delay 1200 --eval "document.getElementById('maintenance-report-modal-content').innerHTML = '<div class=\"maintenance-report-modal__item\"><div class=\"maintenance-report-modal__label\">المعدة</div><div class=\"maintenance-report-modal__value\">Lighting Console</div></div><div class=\"maintenance-report-modal__item\"><div class=\"maintenance-report-modal__label\">التقرير</div><div class=\"maintenance-report-modal__value\">تمت المعايرة واختبار الوحدة بنجاح.</div></div>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('maintenanceReportModal')).show();" --inspect-selector '#maintenanceReportModal' --inspect-selector '#maintenanceReportModal .modal-content' --inspect-selector '#maintenance-report-modal-content'`
- **Manual Checks Run:** reviewed the five fixture-backed dashboard modal captures in dark mode and did not find a blocking contrast, border, overlay, close-button, or layout issue on the validated modal surfaces.
- **Regressions Or Risks Introduced:** the dashboard dark-validation gate is now materially complete, but the migration itself is still high-risk because `dashboard.html` carries the densest `data-tab` surface plus shared reservations/report/calendar/maintenance wiring.
- **Next Recommended Task:** begin the first `dashboard.html` migration pass onto `src/pages/_partials/full-manager-shell.html` and add extraction-focused regression checks before touching the next high-risk operational surface.

### 2026-04-05 | Codex | Phase 2 Dashboard Fixture-Backed Dark Validation
### ٢٠٢٦-٠٤-٠٥ | كودكس | تحقق الوضع الداكن لصفحة Dashboard عبر Fixture محلي في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added a controlled localhost dashboard fixture behind `?fixture=dashboard`, routed the heavy dashboard loaders onto local fixture data, preserved non-dashboard query params in the reports URL sync path, and fixed a real theme regression where unrelated preference writes like `dashboardTab` or `dashboardSubTab` could replay a stale light theme after tab changes. With that path in place, reran the heavy dashboard dark checks and confirmed stable dark-mode runtime rendering for the overview shell, reservations reports, reservations calendar, maintenance surface, and the mobile drawer-open state without redirecting to `login.html`.
- **Key Files Or Surfaces Touched:** `src/scripts/fixtureRuntime.js`, `src/scripts/devFixtures.js`, `src/main.js`, `src/scripts/auth.js`, `src/scripts/theme.js`, `src/scripts/reports.js`, `src/scripts/reports/dataService.js`, `src/scripts/reservations/service/api.js`, `src/scripts/maintenanceService.js`, `src/scripts/projectsService.js`, `src/scripts/techniciansService.js`, `src/scripts/equipment/api.js`, `tests/theme/dashboardFixtureAudit.test.js`, `tests/theme/theme.test.js`, `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-overview-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-reports-ar-final.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-calendar-ar-final.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-maintenance-ar-final.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-fixture-mobile-sidebar-ar-final.png`
- **Tests Run:** `npx vitest run tests/theme/dashboardFixtureAudit.test.js tests/theme/dashboardDarkValidationAudit.test.js tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/compactShellSequencingAudit.test.js`, `npx vitest run tests/theme/theme.test.js tests/theme/dashboardFixtureAudit.test.js tests/theme/dashboardDarkValidationAudit.test.js`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-overview-ar.png --click '[data-greeting-toggle]' --delay 2200 --post-click-delay 1200 --inspect-selector '#dashboard-greeting-panel'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-reports-ar-final.png --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-reports-tab' --delay 2200 --post-click-delay 1800 --inspect-selector '#reports-tab' --inspect-selector '#reports-reservations-table' --inspect-selector '#reports-empty-state'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-calendar-ar-final.png --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-calendar-tab' --delay 2200 --post-click-delay 1800 --inspect-selector '#calendar-tab' --inspect-selector '#calendar-panel' --inspect-selector '#calendar'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-maintenance-ar-final.png --click '[data-tab=\"maintenance-tab\"]' --delay 2200 --post-click-delay 1800 --inspect-selector '#maintenance-tab' --inspect-selector '#maintenance-table-body'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1&fixture=dashboard' --out /tmp/art-ratio-dark-smoke-shots/dashboard-fixture-mobile-sidebar-ar-final.png --width 390 --height 844 --mobile --click '#sidebar-open' --delay 2200 --post-click-delay 1200 --inspect-selector '#dashboard-sidebar' --inspect-selector '#sidebar-backdrop'`
- **Manual Checks Run:** reviewed the fixture-backed dashboard captures in dark mode and confirmed that the heavy runtime surfaces stay on-page and retain dark-theme state across tab changes. No blocking contrast or layout failure was observed on the overview shell, reports, calendar, maintenance table shell, or mobile drawer capture.
- **Regressions Or Risks Introduced:** the route-level blocker is resolved, but the dashboard modal-heavy dark checklist is still incomplete. Extraction should still wait until `#reservationDetailsModal`, `#closeReservationModal`, `#calendarReservationModal`, `#closeMaintenanceModal`, and `#maintenanceReportModal` are validated on the same fixture path.
- **Next Recommended Task:** finish the remaining dashboard modal dark-validation checklist on the fixture-backed path, then start the first `dashboard.html` migration pass onto `full-manager-shell.html` while preserving `data-tab` contracts, modal IDs, and script order.

### 2026-04-05 | Codex | Phase 2 Dashboard Dark Validation Prep
### ٢٠٢٦-٠٤-٠٥ | كودكس | تحضير تحقق الوضع الداكن لصفحة Dashboard في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added the dedicated `dashboard.html` dark-validation checklist and a matching source-level audit before any dashboard shell extraction begins. Also ran the first runtime dark pass against the raw dashboard shell. That pass confirmed stable dark-mode rendering for the header/greeting shell and the mobile drawer-open state, but exposed a dashboard-specific localhost-bypass blocker: attempts to validate the heavier maintenance, reservations reports, calendar, and reservation modal paths under `?bypassAuth=1` were redirected to `login.html` before those surfaces could be captured reliably.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/dashboardDarkValidationAudit.test.js`, `/tmp/art-ratio-dark-smoke-shots/dashboard-overview-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-overview-dark-en.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-mobile-sidebar-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-maintenance-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-reports-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-reports-dark-en.png`, `/tmp/art-ratio-dark-smoke-shots/dashboard-calendar-dark-ar.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-overview-dark-ar.png --click '[data-greeting-toggle]' --delay 2200 --post-click-delay 1200 --inspect-selector '#dashboard-greeting-panel' --inspect-selector '#dashboard-sidebar' --inspect-selector '.sidebar-panel--links'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-overview-dark-en.png --click '#language-toggle' --click '[data-greeting-toggle]' --delay 2200 --post-click-delay 1200 --eval "sessionStorage.setItem('art-ratio:session-theme','dark'); document.documentElement.classList.add('dark','dark-mode'); document.body.classList.add('dark','dark-mode'); document.documentElement.setAttribute('data-theme','dark'); document.body.setAttribute('data-theme','dark');" --inspect-selector '#dashboard-greeting-panel'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-mobile-sidebar-dark-ar.png --width 390 --height 844 --mobile --click '#sidebar-open' --delay 2200 --post-click-delay 1200 --inspect-selector '#dashboard-sidebar' --inspect-selector '.sidebar-panel--links' --inspect-selector '#sidebar-backdrop'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-maintenance-dark-ar.png --click '[data-tab=\"maintenance-tab\"]' --delay 2200 --post-click-delay 1200 --inspect-selector '#maintenance-tab' --inspect-selector '#maintenance-table-body' --inspect-selector '#closeMaintenanceModal'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-reports-dark-ar.png --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-reports-tab' --delay 2200 --post-click-delay 1400 --inspect-selector '#reports-tab' --inspect-selector '#reports-reservations-table' --inspect-selector '#reports-empty-state'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-reports-dark-en.png --click '#language-toggle' --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-reports-tab' --delay 2200 --post-click-delay 1400 --eval "sessionStorage.setItem('art-ratio:session-theme','dark'); document.documentElement.classList.add('dark','dark-mode'); document.body.classList.add('dark','dark-mode'); document.documentElement.setAttribute('data-theme','dark'); document.body.setAttribute('data-theme','dark');" --inspect-selector '#reports-tab' --inspect-selector '#reports-empty-state'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/dashboard.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/dashboard-calendar-dark-ar.png --click '[data-tab=\"reservations-tab\"]' --click '#sub-tab-trigger-calendar-tab' --delay 2200 --post-click-delay 1400 --eval "sessionStorage.setItem('art-ratio:session-theme','dark'); document.documentElement.classList.add('dark','dark-mode'); document.body.classList.add('dark','dark-mode'); document.documentElement.setAttribute('data-theme','dark'); document.body.setAttribute('data-theme','dark');" --inspect-selector '#calendar-tab' --inspect-selector '#calendar-panel' --inspect-selector '#calendar'`, `npx vitest run tests/theme/dashboardDarkValidationAudit.test.js tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/compactShellSequencingAudit.test.js`
- **Manual Checks Run:** visual review of the overview Arabic/English shell captures and the mobile drawer capture confirmed readable dark header, greeting panel, and drawer chrome. The remaining heavy dashboard captures did not complete as valid UI screenshots because the page redirected to `login.html`, which is now recorded as the current blocker rather than being misclassified as a visual regression.
- **Regressions Or Risks Introduced:** the main risk is not extracted shell styling; it is dashboard runtime instability under localhost bypass for maintenance/reports/calendar states, which means extraction should not begin until a stable validation path exists
- **Next Recommended Task:** resolve or route around the dashboard localhost-bypass redirect for reservations reports, calendar, maintenance, and reservation modals, most likely through a controlled dashboard fixture or a dashboard-specific bypass-safe validation mode, then rerun the dashboard dark checklist before any shell migration starts

### 2026-04-05 | Codex | Phase 2 Projects Full Shell Dark Release Gate
### ٢٠٢٦-٠٤-٠٥ | كودكس | بوابة الإطلاق الداكنة لصفحة Projects ضمن Full Shell في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Finished the remaining screenshot-backed dark-validation checklist for the migrated `projects.html` page. Confirmed readable dark-mode rendering for the reports surface in Arabic and English, the templates surface in Arabic and English, the `#reservationDetailsModal` and `#closeProjectModal` modal chrome with seeded content, and the mobile drawer-open state on the shared `full` shell. Also extended `scripts/manual-dark-smoke.mjs` with reusable `--eval` support so modal and future dashboard states can be validated without page-specific helper forks.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `scripts/manual-dark-smoke.mjs`, `/tmp/art-ratio-dark-smoke-shots/projects-reports-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/projects-reports-dark-en.png`, `/tmp/art-ratio-dark-smoke-shots/projects-templates-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/projects-templates-dark-en.png`, `/tmp/art-ratio-dark-smoke-shots/projects-reservation-modal-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/projects-close-modal-dark-ar.png`, `/tmp/art-ratio-dark-smoke-shots/projects-mobile-sidebar-open-dark-ar.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-reports-dark-ar.png --click '[data-project-subtab-target=\"projects-reports-tab\"]' --delay 1800 --post-click-delay 1200 --inspect-selector '#projects-reports-tab' --inspect-selector '#reports-table' --inspect-selector '#reports-empty'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-reports-dark-en.png --click '#language-toggle' --click '[data-project-subtab-target=\"projects-reports-tab\"]' --delay 1800 --post-click-delay 1200 --inspect-selector '#projects-reports-tab' --inspect-selector '#reports-empty'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-templates-dark-ar.png --click '[data-project-subtab-target=\"projects-templates-tab\"]' --delay 1800 --post-click-delay 1200 --inspect-selector '#projects-templates-tab' --inspect-selector '#templates-preview-host'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-templates-dark-en.png --click '#language-toggle' --click '[data-project-subtab-target=\"projects-templates-tab\"]' --delay 1800 --post-click-delay 1200 --eval "sessionStorage.setItem('art-ratio:session-theme','dark'); document.documentElement.classList.add('dark','dark-mode'); document.body.classList.add('dark','dark-mode'); document.documentElement.setAttribute('data-theme','dark'); document.body.setAttribute('data-theme','dark');" --inspect-selector '#projects-templates-tab' --inspect-selector '#templates-preview-host'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-reservation-modal-dark-ar.png --delay 1800 --post-click-delay 1200 --eval "document.getElementById('reservation-details-body').innerHTML = '<div class=\"space-y-3\"><p>حجز مرتبط بالمشروع</p><p>تفاصيل اختبار للوضع الداكن</p><button class=\"btn btn-primary\">إجراء</button></div>'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('reservationDetailsModal')).show();" --inspect-selector '#reservationDetailsModal' --inspect-selector '#reservationDetailsModal .modal-content'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-close-modal-dark-ar.png --delay 1800 --post-click-delay 1200 --eval "document.getElementById('close-project-notes').value = 'ملاحظات اختبار للوضع الداكن'; window.bootstrap?.Modal.getOrCreateInstance(document.getElementById('closeProjectModal')).show();" --inspect-selector '#closeProjectModal' --inspect-selector '#closeProjectModal .modal-content'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-mobile-sidebar-open-dark-ar.png --width 390 --height 844 --mobile --click '#sidebar-open' --delay 1800 --post-click-delay 1200 --inspect-selector '#dashboard-sidebar' --inspect-selector '.sidebar-panel--links' --inspect-selector '#sidebar-backdrop'`
- **Manual Checks Run:** visual review of the captured screenshots confirmed readable dark-mode contrast and no blocking shell/layout regression on the dense reports surface, the templates surface, the reservation and close-project modal chrome, and the mobile drawer-open state. One mobile inspection still showed `.sidebar-panel--links` absent because the current narrow drawer snapshot only exposed the upper quick-links region within the captured viewport, but the drawer itself and backdrop rendered correctly and no unreadable dark-theme failure was observed.
- **Regressions Or Risks Introduced:** the remaining risk is no longer `projects.html` dark stability; it is the missing dashboard-specific dark-validation pass for calendar, reports, maintenance, and modal-heavy flows before `dashboard.html` extraction starts
- **Next Recommended Task:** record `projects.html` as dark-validation complete for the shared `full` shell, then define and run the dedicated `dashboard.html` dark-validation checklist before attempting dashboard extraction

### 2026-04-05 | Codex | Phase 2 Projects Full Shell Migration
### ٢٠٢٦-٠٤-٠٥ | كودكس | ترحيل صفحة Projects إلى Full Shell في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Migrated `projects.html` onto the shared `src/pages/_partials/full-manager-shell.html` path using explicit slots for `sidebarStats`, `sidebarTabs`, `sidebarLinks`, `greetingPanel`, `mainContent`, `afterShell`, and `pageScripts`. Preserved the existing project tabs, nested subtabs, quick links, Bootstrap/Flatpickr dependencies, modal IDs, and page-owned script order. Also aligned `src/scripts/projects.js` with the shared `auth-pending` reveal contract so the extracted page no longer stays hidden after load.
- **Key Files Or Surfaces Touched:** `src/pages/projects.html`, `src/pages/_partials/full-manager-shell.html`, `src/scripts/projects.js`, `tests/theme/fullShellContractAudit.test.js`, `tests/theme/fullShellPrepAudit.test.js`, `tests/theme/sharedShellContractAudit.test.js`, `tests/theme/compactShellSequencingAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/projects-migrated-overview.png`
- **Tests Run:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/modalFormsAudit.test.js`, `npm run build`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/projects.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/projects-migrated-overview.png --click '[data-greeting-toggle]' --delay 1800 --inspect-selector '#dashboard-greeting-panel' --inspect-selector '[data-project-subtab-target=\"projects-reports-tab\"]' --inspect-selector '#projectDetailsModal'`
- **Manual Checks Run:** focused dark-mode runtime capture confirmed `projects.html` now loads through the shared shell with `authPending: false`, the greeting panel becomes visible in dark mode, the reports subtab trigger remains visible, and the project details modal anchor remains present after migration
- **Regressions Or Risks Introduced:** the shell migration itself is stable at the verified surface level, but the full `projects.html` dark checklist is not complete yet, especially the remaining modal flows, templates/reports dense surfaces, and mobile sidebar-open path
- **Next Recommended Task:** finish the remaining `projects.html` dark-validation checklist, then decide whether `dashboard.html` can begin full-family extraction or whether more `projects.html` stabilization is still needed

### 2026-04-05 | Codex | Phase 2 Full Shell Boundary And Projects Dark Checklist
### ٢٠٢٦-٠٤-٠٥ | كودكس | حدود Full Shell وقائمة تحقق الوضع الداكن لصفحة Projects في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added the first reusable `full`-family shell scaffold at `src/pages/_partials/full-manager-shell.html`, locking the shared boundary for the repeated full sidebar, header chrome, greeting wrapper, page frame, and footer script slots used by `projects.html` and `dashboard.html`. Also recorded the dedicated `projects.html` dark-validation checklist so the first `full`-family extraction pass has an explicit release gate before any page migration begins.
- **Key Files Or Surfaces Touched:** `src/pages/_partials/full-manager-shell.html`, `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/fullShellContractAudit.test.js`, `tests/theme/fullShellPrepAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/fullShellContractAudit.test.js tests/theme/fullShellPrepAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/tabsShellPrepAudit.test.js`
- **Manual Checks Run:** static verification of the shared slot boundary against the duplicated `dashboard.html` and `projects.html` shell anatomy; no runtime browser pass was run in this scaffold step
- **Regressions Or Risks Introduced:** no runtime page code changed yet; the next risk is the first real migration of `projects.html`, which still needs the recorded dark-validation checklist executed before merge
- **Next Recommended Task:** run the `projects.html` dark-validation checklist, then migrate `projects.html` onto `full-manager-shell.html` while keeping modal IDs, tab contracts, and script ordering intact

### 2026-04-05 | Codex | Phase 2 Fixture-Backed Populated Dark Validation
### ٢٠٢٦-٠٤-٠٥ | كودكس | تحقق الوضع الداكن للحالات المعبأة عبر Fixture محلي في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Ran the first full populated dark-validation pass against the extracted detail pages using the localhost-only `fixture=details` workflow. Confirmed readable dark-theme rendering for `customer.html` overview stats, reservations list, projects tab, `projectDetailsModal`, and Flatpickr/date input surfaces, then confirmed the same for `technician.html` overview stats, reservations tab, projects tab, financial summary cards, technician financial modal, payout list, and Flatpickr/date input surfaces.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `/tmp/art-ratio-dark-smoke-shots/customer-fixture-overview.png`, `/tmp/art-ratio-dark-smoke-shots/customer-fixture-project-modal.png`, `/tmp/art-ratio-dark-smoke-shots/customer-fixture-flatpickr.png`, `/tmp/art-ratio-dark-smoke-shots/technician-fixture-overview.png`, `/tmp/art-ratio-dark-smoke-shots/technician-fixture-projects.png`, `/tmp/art-ratio-dark-smoke-shots/technician-fixture-financial-modal.png`, `/tmp/art-ratio-dark-smoke-shots/technician-fixture-flatpickr.png`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/customer.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/customer-fixture-overview.png --click '[data-greeting-toggle]' --delay 1800 --inspect-selector '#customer-stat-projects' --inspect-selector '#customer-stat-payment' --inspect-selector '#customer-stat-upcoming' --inspect-selector '#customer-reservations'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/customer.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/customer-fixture-project-modal.png --click '[data-greeting-toggle]' --click '[data-customer-tab="projects"]' --click '#customer-projects .project-focus-card' --delay 1800 --post-click-delay 1200 --inspect-selector '#projectDetailsModal' --inspect-selector '#customer-projects'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/customer.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/customer-fixture-flatpickr.png --click '[data-greeting-toggle]' --click '#customer-filter-start-date' --delay 1800 --post-click-delay 1200 --inspect-selector '#customer-filter-start-date' --inspect-selector '.flatpickr-calendar'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/technician.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/technician-fixture-overview.png --click '[data-greeting-toggle]' --delay 1800 --inspect-selector '#technician-financial-total' --inspect-selector '#technician-reservations' --inspect-selector '[data-technician-tab-panel="reservations"]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/technician.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/technician-fixture-projects.png --click '[data-greeting-toggle]' --click '[data-technician-tab="projects"]' --delay 1800 --post-click-delay 1200 --inspect-selector '[data-technician-tab-panel="projects"]' --inspect-selector '#technician-projects'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/technician.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/technician-fixture-financial-modal.png --click '[data-greeting-toggle]' --click '#technician-financial-open' --delay 1800 --post-click-delay 1200 --inspect-selector '#technician-financial-modal' --inspect-selector '#technician-financial-modal-rows' --inspect-selector '#technician-payouts-list'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/technician.html?id=1&bypassAuth=1&fixture=details' --out /tmp/art-ratio-dark-smoke-shots/technician-fixture-flatpickr.png --click '[data-greeting-toggle]' --click '#technician-filter-start-date' --delay 1800 --post-click-delay 1200 --inspect-selector '#technician-filter-start-date' --inspect-selector '.flatpickr-calendar'`
- **Manual Checks Run:** visual review of all seven fixture-backed screenshots confirmed readable dark shells, greeting stats, populated cards, lists, modal surfaces, and open Flatpickr calendars on both detail pages; no blocking contrast or layout regression was observed in the reviewed states
- **Regressions Or Risks Introduced:** no blocking runtime issue was observed in the fixture-backed pass; remaining risk is mostly program-level, meaning whether the team wants one more broad runtime pass before starting `full`-family prep
- **Next Recommended Task:** record the compact-family `Unauthorized` rows/toasts as localhost-bypass noise, then decide whether Phase 2 can exit and `dashboard.html` plus `projects.html` can move into `full`-family prep

### 2026-04-05 | Codex | Phase 2 Full Family Prep Snapshot
### ٢٠٢٦-٠٤-٠٥ | كودكس | لقطة تحضير عائلة Full في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Locked the next extraction target inside the `full` family by documenting `projects.html` as the first migration candidate and `dashboard.html` as the heavier follow-up. Recorded the shared `full`-family shell anchors, dependency floor, quick-links presence, and the highest-risk operational surfaces that must stay explicit before any shared partial replaces either page.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/fullShellPrepAudit.test.js`, `src/pages/projects.html`, `src/pages/dashboard.html`
- **Tests Run:** `npx vitest run tests/theme/fullShellPrepAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/tabsShellPrepAudit.test.js`
- **Manual Checks Run:** static review of `dashboard.html` and `projects.html` shell anatomy, page bootstrap ownership, quick-links/sidebar composition, modal surfaces, and dependency differences; no runtime browser pass was run in this prep-only step
- **Regressions Or Risks Introduced:** no runtime code changed in this step; the remaining risk is that the `full` family still has no dedicated dark-validation execution plan, especially for the heavier calendar, reports, maintenance, and nested-tab surfaces
- **Next Recommended Task:** define the shared `full`-family partial boundary and dark-validation checklist for `projects.html` first, while keeping `dashboard.html` deferred until the smaller path is stable

### 2026-04-05 | Codex | Phase 2 Controlled Detail Fixture Path
### ٢٠٢٦-٠٤-٠٥ | كودكس | مسار Fixture محلي مضبوط لصفحات التفاصيل في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added a localhost-only `fixture=details` path that seeds controlled populated records into the same in-memory stores used by the extracted detail pages, then wired `customer.html` and `technician.html` to use that fixture instead of unstable remote calls when explicitly requested. The fixture also supports local technician payout create/delete flows so the financial modal can be validated with real populated UI states instead of `Unauthorized` placeholders.
- **Key Files Or Surfaces Touched:** `src/scripts/devFixtures.js`, `src/scripts/customerPage.js`, `src/scripts/technicianPage.js`, `src/scripts/technicianDetails.js`, `tests/theme/detailsFixtureAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/detailsFixtureAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/customerPageAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/compactShellSequencingAudit.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the explicit localhost guard, fixture query gate, seeded reservation/project/technician relationships, and the detail-page bypass points that now skip remote hydration only when `fixture=details` is present
- **Regressions Or Risks Introduced:** the fixture path is intentionally localhost-only and opt-in, but it still needs one recorded runtime pass to prove the populated dark-state path is visually stable across `customer.html` and `technician.html`
- **Next Recommended Task:** capture and review the first screenshot-based populated dark validation pass using `customer.html?id=1&bypassAuth=1&fixture=details` and `technician.html?id=1&bypassAuth=1&fixture=details`, then decide whether Phase 2 can exit cleanly before any `full`-family prep

### 2026-04-05 | Codex | Phase 2 Technician Visibility Contract Fix
### ٢٠٢٦-٠٤-٠٥ | كودكس | إصلاح عقد الإظهار والإخفاء لصفحة الفني في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Fixed the extracted `technician` detail page so its status badges, projects tab panel, and financial empty states now use native `hidden` attributes instead of relying on stale `hidden` classes. This aligns the technician page with the already-stabilized customer-page visibility contract and prevents the projects view from carrying inconsistent hidden state after tab switches.
- **Key Files Or Surfaces Touched:** `src/pages/technician.html`, `src/scripts/technicianPage.js`, `tests/theme/detailsPageAudit.test.js`, `scripts/manual-dark-smoke.mjs`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4176/src/pages/technician.html?id=1&bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/technician-projects-inspect-fixed.png --port 9225 --width 1440 --height 2400 --click '[data-greeting-toggle]' --click '[data-technician-tab="projects"]' --inspect-selector '[data-technician-tab="reservations"]' --inspect-selector '[data-technician-tab="projects"]' --inspect-selector '[data-technician-tab-panel="reservations"]' --inspect-selector '[data-technician-tab-panel="projects"]' --inspect-selector '#technician-projects'`
- **Manual Checks Run:** runtime DOM-state inspection confirmed that after switching to the `projects` tab, the reservations panel is now truly hidden (`hidden: true`, `display: none`) and the projects panel remains visible with its empty-state content rendered
- **Regressions Or Risks Introduced:** this fixes the page-level visibility contract, but populated technician data states still need the broader runtime validation already tracked in this file
- **Next Recommended Task:** continue the Phase 2 populated-state dark validation path for `customer.html` and `technician.html` with real records or a controlled fixture

### 2026-04-05 | Codex | Phase 2 Compact Rerun And Mobile Detail Dark Validation
### ٢٠٢٦-٠٤-٠٥ | كودكس | إعادة التحقق لعائلة Compact وفحص الوضع الداكن لصفحات التفاصيل على الجوال في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Extended `scripts/manual-dark-smoke.mjs` with `--port` and `--mobile` support, re-ran the compact-family screenshot pass on `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `users.html`, and captured mobile-width dark screenshots for `customer.html?id=1` and `technician.html?id=1`. Reviewed the resulting captures to separate shell/theme behavior from localhost-bypass data noise.
- **Key Files Or Surfaces Touched:** `scripts/manual-dark-smoke.mjs`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/site-analytics.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/site-analytics-compact-pass.png --port 9223 --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/contact-inquiries.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/contact-inquiries-compact-pass.png --port 9223 --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/feedback-submissions.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/feedback-submissions-compact-pass.png --port 9223 --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/users.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/users-compact-pass.png --port 9223 --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/customer.html?id=1&bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/customer-mobile-pass.png --port 9223 --width 390 --height 844 --mobile --click '[data-greeting-toggle]' --delay 1500`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/technician.html?id=1&bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/technician-mobile-pass.png --port 9223 --width 390 --height 844 --mobile --click '[data-greeting-toggle]' --click '#technician-financial-open' --delay 1500`
- **Manual Checks Run:** visual review of the refreshed compact-family desktop screenshots confirmed readable dark shell chrome, cards, filters, and form surfaces on `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `users.html`; `site-analytics.html` stays on-route after the earlier bypass fix; mobile-width dark review confirmed `technician.html` keeps the financial modal readable while `customer.html` remains visually stable but still lacks populated detail content under localhost bypass
- **Regressions Or Risks Introduced:** the compact-family rerun suggests the remaining `Unauthorized` rows/toasts are local-bypass data noise rather than shell regressions, but populated-state validation is still incomplete for detail pages, especially `customer.html` and any Flatpickr or modal state that depends on real records
- **Next Recommended Task:** finish one populated dark-state validation path for `customer.html` and `technician.html` using real data or a controlled local fixture, then decide whether the `full` family is unblocked for prep work

### 2026-04-05 | Codex | Phase 2 Site Analytics Bypass Fix And Dark Recheck
### ٢٠٢٦-٠٤-٠٥ | كودكس | إصلاح Bypass لصفحة Site Analytics وإعادة تحقق الوضع الداكن في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Aligned `siteAnalytics.js` with the compact-family auth bootstrap contract by switching it to `checkAuth({ redirect: false })` plus explicit refresh fallback, removed the analytics data-load route bounce on `401/403` so the page stays visible with an inline error state, added `tests/theme/siteAnalyticsAuthAudit.test.js`, and re-ran the local dark screenshot pass to confirm `site-analytics.html?bypassAuth=1` now stays on-page in dark mode.
- **Key Files Or Surfaces Touched:** `src/scripts/siteAnalytics.js`, `tests/theme/siteAnalyticsAuthAudit.test.js`, `tests/theme/compactShellSequencingAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/siteAnalyticsAuthAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/site-analytics.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/site-analytics-fixed.png --click '[data-greeting-toggle]'`
- **Manual Checks Run:** visual review of the refreshed `site-analytics` desktop dark screenshot confirmed the page now stays on its own route with readable shell, filters, stats cards, and table/list surfaces under the localhost bypass flow
- **Regressions Or Risks Introduced:** the route-level compact blocker is cleared, but the localhost bypass flow still produces `Unauthorized` data-state placeholders/toasts on some admin surfaces, so populated-state dark validation is still incomplete
- **Next Recommended Task:** continue the compact and extracted-`tabs` dark pass with data-backed states and mobile-width detail pages, then record whether the remaining `Unauthorized` outputs are acceptable local-bypass noise or require separate handling

### 2026-04-05 | Codex | Phase 2 Local Dark Theme Screenshot Validation
### ٢٠٢٦-٠٤-٠٥ | كودكس | تحقق لقطات الشاشة المحلي للوضع الداكن في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added a local runtime helper to force dark mode through headless Chrome and captured screenshot-based dark-theme validation for the compact family and extracted `tabs` family under localhost auth bypass. Reviewed desktop dark captures for `contact-inquiries.html`, `feedback-submissions.html`, `users.html`, `home.html`, `customer.html?id=1`, and `technician.html?id=1`, plus mobile-width dark captures for `home.html` and `users.html`.
- **Summary of Completed Work:** Added a local runtime helper to force dark mode through headless Chrome and captured screenshot-based dark-theme validation for the compact family and extracted `tabs` family under localhost auth bypass. Reviewed desktop dark captures for `contact-inquiries.html`, `feedback-submissions.html`, `users.html`, `home.html`, `customer.html?id=1`, and `technician.html?id=1`, plus mobile-width dark captures for `home.html` and `users.html`. The first pass exposed a route-level blocker on `site-analytics.html`, which was handled in the follow-up entry above.
- **Key Files Or Surfaces Touched:** `scripts/manual-dark-smoke.mjs`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/site-analytics.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/site-analytics.png --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/contact-inquiries.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/contact-inquiries.png --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/feedback-submissions.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/feedback-submissions.png --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/users.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/users.png --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/home.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/home.png --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/customer.html?id=1&bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/customer.png --click '[data-greeting-toggle]'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/technician.html?id=1&bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/technician.png --click '[data-greeting-toggle]' --click '#technician-financial-open'`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/home.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/home-mobile.png --width 390 --height 844 --click '[data-greeting-toggle]' --delay 1500`, `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5174/src/pages/users.html?bypassAuth=1' --out /tmp/art-ratio-dark-smoke-shots/users-mobile.png --width 390 --height 844 --click '[data-greeting-toggle]' --delay 1500`
- **Manual Checks Run:** visual review of the captured dark-mode screenshots confirmed readable shell chrome, cards, forms, filters, tables, greeting panels, and the technician financial modal in the inspected states; mobile-width `home` and `users` also remained readable in the inspected viewport
- **Regressions Or Risks Introduced:** the first pass exposed a `site-analytics.html` localhost bypass redirect issue and several `Unauthorized` placeholders/toasts under localhost bypass; the route issue has since been cleared, but the data-state noise still limits data-rich validation for lists and detail content
- **Next Recommended Task:** continue with data-backed dark validation for the compact family and extracted `tabs` family, especially Flatpickr surfaces and mobile-width detail pages

### 2026-04-05 | Codex | Phase 2 Tabs Family Dark Theme Audit
### ٢٠٢٦-٠٤-٠٥ | كودكس | تدقيق الوضع الداكن لعائلة Tabs في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added targeted source-level dark-theme validation for the extracted `tabs` family across `home.html`, `customer.html`, and `technician.html`, locking the shared shell dark path, post-auth reveal contract, key shared dark surfaces in `app.css`, and shared theme-toggle/modal/Flatpickr dark foundations in `core.css`.
- **Key Files Or Surfaces Touched:** `tests/theme/tabsFamilyDarkModeAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tabsFamilyDarkModeAudit.test.js tests/theme/tabsShellPrepAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static dark-theme audit of the extracted `tabs` family markup, shell partial, shared CSS selectors, detail-page surfaces, modal surfaces, and post-auth reveal behavior; manual browser dark-theme smoke validation is still pending
- **Regressions Or Risks Introduced:** no runtime markup, CSS, or JS changed in this pass; the main remaining risk is that compact-family and `tabs`-family manual browser dark-theme smoke validation is still not recorded even though the source-level dark contract is now locked
- **Next Recommended Task:** manually smoke the compact shell family in dark mode first, then manually smoke `home.html`, `customer.html`, and `technician.html` in dark mode and record those findings before starting any `full`-family extraction work

### 2026-04-05 | Codex | Phase 2 Detail Pages Tabs Shell Migration
### ٢٠٢٦-٠٤-٠٥ | كودكس | ترحيل صفحات التفاصيل إلى Tabs Shell في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Migrated `customer.html` and `technician.html` onto the shared `tabs` shell composition path, preserved Bootstrap/Flatpickr head assets, preserved detail-page modal surfaces through `afterShell`, preserved page-specific translation ordering through `pageScripts`, and aligned both page scripts with the shared `auth-pending` reveal contract.
- **Key Files Or Surfaces Touched:** `src/pages/customer.html`, `src/pages/technician.html`, `src/scripts/customerPage.js`, `src/scripts/technicianPage.js`, `tests/theme/tabsShellPrepAudit.test.js`, `tests/theme/sharedShellContractAudit.test.js`, `tests/theme/compactShellSequencingAudit.test.js`, `tests/theme/detailsPageAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tabsShellPrepAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/customerPageAudit.test.js tests/theme/modalFormsAudit.test.js`, `npx vitest run tests/theme/tabsShellPrepAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/detailsPageAudit.test.js tests/theme/customerPageAudit.test.js tests/theme/modalFormsAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the extracted `customer.html` and `technician.html` slot usage, page-specific asset ordering, modal placement, and the new auth reveal flow in both detail-page scripts
- **Regressions Or Risks Introduced:** the `tabs` shell contract now covers the full family, but dark-theme validation is still outstanding for the compact family and now also needed across the extracted `tabs` family before the `full` family should move
- **Next Recommended Task:** run targeted dark-theme validation on `home.html`, `customer.html`, and `technician.html`, then keep the `full` family deferred until compact-shell dark validation is also recorded

### 2026-04-05 | Codex | Phase 2 Home Tabs Shell Migration
### ٢٠٢٦-٠٤-٠٥ | كودكس | ترحيل Home إلى Tabs Shell في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Defined the shared `tabs` shell composition contract in code, extracted the shared `tabs` shell partial, migrated `home.html` onto that path, and aligned `home.js` with the shared `auth-pending` reveal behavior used by the other extracted shell families.
- **Key Files Or Surfaces Touched:** `src/pages/_partials/tabs-manager-shell.html`, `src/pages/home.html`, `src/scripts/home.js`, `tests/theme/tabsShellPrepAudit.test.js`, `tests/theme/sharedShellContractAudit.test.js`, `tests/theme/compactShellSequencingAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/tabsShellPrepAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the new `tabs` shell partial, `home.html` slot usage, the `home.js` reveal path, and built `dist/src/pages/home.html` output to confirm shell anchors and slot content are emitted correctly
- **Regressions Or Risks Introduced:** the `tabs` shell contract now exists in code, but only `home.html` is migrated so far; the next risk surface is preserving Bootstrap, Flatpickr, and `projectDetailsModal` dependencies when the same contract is extended to `customer.html` and `technician.html`
- **Next Recommended Task:** extend the shared `tabs` shell contract to `customer.html` and `technician.html` together, using optional slots for detail-page assets, greeting stat grids, post-shell modal content, and page-specific translation/module ordering

### 2026-04-05 | Codex | Phase 2 Tabs Family Prep Snapshot
### ٢٠٢٦-٠٤-٠٥ | كودكس | لقطة تجهيز عائلة Tabs للمرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Mapped the shared shell contract and the controlled differences across `home.html`, `customer.html`, and `technician.html`, added a dedicated prep audit for the `tabs` family, and locked `home.html` as the first extraction target inside that family while keeping the actual migration blocked behind compact-family dark-theme validation.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/tabsShellPrepAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/tabsShellPrepAudit.test.js tests/theme/usersDarkModeAudit.test.js tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static comparison of `home.html`, `customer.html`, and `technician.html`, including shared shell anchors, sidebar panel shape, greeting content differences, external asset requirements, translation/module order, modal dependencies, and detail-page surface differences
- **Regressions Or Risks Introduced:** no runtime page behavior changed in this pass; the next implementation move is still blocked on manual browser dark-theme validation for the compact family
- **Next Recommended Task:** define the shared `tabs` shell composition contract next, starting with `home.html` as the first migration target and reserving `customer.html` plus `technician.html` for a paired detail-page follow-up

### 2026-04-05 | Codex | Phase 2 Dark Theme First Gate
### ٢٠٢٦-٠٤-٠٥ | كودكس | بوابة الوضع الداكن أولًا للمرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Elevated dark theme to the blocking validation gate for the redesign track, added an explicit dark-theme release gate to the master plan, and tied the current compact-family validation to dark-mode readiness before the next shell-family extraction starts.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/compactShellSequencingAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`
- **Manual Checks Run:** static review of the handoff rules and validation gates against the current compact-shell phase state; no browser dark-theme smoke run was completed in this pass
- **Regressions Or Risks Introduced:** no runtime behavior changed; the next extraction step remains blocked on manual dark-theme validation of the compact family
- **Next Recommended Task:** run manual dark-theme checks first on `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, and `users.html`, then proceed with `tabs`-family extraction prep only after those checks are recorded

### 2026-04-05 | Codex | Phase 2 Compact Slot Coverage And Sequencing Decision
### ٢٠٢٦-٠٤-٠٥ | كودكس | تغطية Slots الخاصة بالـ Compact وقرار ترتيب الترحيل للمرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Added a dedicated audit for compact-shell slot usage and `auth-pending` reveal behavior, then compared the remaining shell families and locked `tabs` before `full` as the next extraction order in the master plan.
- **Key Files Or Surfaces Touched:** `tests/theme/compactShellSequencingAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/compactShellSequencingAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static comparison of `home.html`, `customer.html`, `technician.html`, `dashboard.html`, and `projects.html`, including shell panel shape, external page dependencies, tab-control density, and line-count snapshots to support the migration order decision
- **Regressions Or Risks Introduced:** no runtime page behavior changed in this pass; the main remaining risk is that compact-shell validation is still pending manual browser smoke checks before the `tabs` family extraction starts
- **Next Recommended Task:** manually smoke the compact-shell family, then start the first `tabs`-family extraction prep by mapping the reusable head assets and greeting/side-panel slots across `home.html`, `customer.html`, and `technician.html`

### 2026-04-05 | Codex | Phase 2 Users Compact Shell Migration
### ٢٠٢٦-٠٤-٠٥ | كودكس | ترحيل Users إلى الـ Compact Shell في المرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Migrated `users.html` onto the shared compact-shell composition path, extended the shared partial to support page-specific script slots and post-shell content, preserved the Bootstrap modal dependency and users translation module ordering, and updated the users page bootstrap flow to reveal the page correctly under the shared `auth-pending` shell contract.
- **Key Files Or Surfaces Touched:** `src/pages/_partials/compact-manager-shell.html`, `src/pages/users.html`, `src/scripts/users.js`, `tests/theme/pageShellPilotAudit.test.js`, `tests/theme/sharedShellContractAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run build`, `npm run test:reservations`
- **Manual Checks Run:** static review of the shared compact-shell partial, `users.html` slot usage, the users bootstrap flow, and built `dist/src/pages/users.html` output to confirm shell anchors and page-specific assets/scripts are emitted correctly
- **Regressions Or Risks Introduced:** the compact shell path now supports page-specific script slots and post-shell content, which broadens the contract surface and should stay tightly audited before reuse beyond the compact family
- **Next Recommended Task:** manually smoke all compact-shell pages in Arabic/English, light/dark, and mobile/desktop, then choose the next shell-family target by comparing the `tabs` family (`home`, `customer`, `technician`) against the `full` family (`dashboard`, `projects`) for extraction risk

### 2026-04-05 | Codex | Phase 2 Compact Shell Composition Path
### ٢٠٢٦-٠٤-٠٥ | كودكس | مسار تركيب الـ Compact Shell للمرحلة الثانية

- **Phase:** Shared Shell Extraction
- **Summary of Completed Work:** Introduced a local Vite HTML include/slot composition path, extracted a shared compact manager shell into partials, and migrated `site-analytics.html`, `contact-inquiries.html`, and `feedback-submissions.html` onto that shared shell without changing their runtime anchors or page-specific content.
- **Key Files Or Surfaces Touched:** `vite.config.js`, `src/pages/_partials/manager-page-head.html`, `src/pages/_partials/compact-manager-shell.html`, `src/pages/site-analytics.html`, `src/pages/contact-inquiries.html`, `src/pages/feedback-submissions.html`, `tests/theme/pageShellPilotAudit.test.js`, `tests/theme/sharedShellContractAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run build`
- **Manual Checks Run:** static review of the extracted partials, source pilot pages, and built pilot pages in `dist/src/pages/` to confirm shell anchors are emitted and include directives are not leaked into build output
- **Regressions Or Risks Introduced:** the new composition path is build-time only and localized to the compact manager pilot, but it is still new infrastructure and should be expanded carefully before wider shell-family adoption
- **Next Recommended Task:** manually smoke the compact pilot pages in Arabic/English, light/dark, and mobile/desktop, then migrate `users.html` onto the same compact-shell composition path if the pilot remains stable

### 2026-04-05 | Codex | Phase 1 Primitive Contract Definition
### ٢٠٢٦-٠٤-٠٥ | كودكس | تعريف عقد الـ Primitives للمرحلة الأولى

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Locked the first shared primitive contract for `Button`, `Input`, `Select`, and `Card` in the master plan, including variant rules, token ownership expectations, legacy class bridge mapping, state requirements, and RTL/dark-mode requirements. Added a dedicated audit so the contract is backed by real selectors in the shared style layers.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/primitiveContractAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/primitiveContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static review of shared `.btn`, `.card`, `.form-control`, `.form-select`, and `.enhanced-select` foundations in `core.css`, `app.css`, `forms.css`, and `enhanced-select.css`
- **Regressions Or Risks Introduced:** no runtime markup or JS changed in this pass; the primitive contract is now explicit, but it is still backed by legacy class bridges rather than a fully extracted shared component layer
- **Next Recommended Task:** prepare the shared composition mechanism for the compact `PageShell` pilot and add extraction-oriented regression checks before Phase 2 starts

### 2026-04-05 | Codex | Phase 1 Low-Risk Selector Normalization
### ٢٠٢٦-٠٤-٠٥ | كودكس | توحيد الـ Selectors منخفضة الخطورة للمرحلة الأولى

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Normalized the remaining low-risk feature CSS files onto the canonical dark-selector contract and tightened the migration audit so those files now fail if legacy selector patterns return.
- **Key Files Or Surfaces Touched:** `src/styles/forms.css`, `src/styles/tabs.css`, `src/styles/index.css`, `src/styles/maintenance.css`, `tests/theme/themeMigrationAudit.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static verification of the canonical dark-selector contract in `forms.css`, `tabs.css`, `index.css`, and `maintenance.css`, plus refresh of the remaining selector-debt snapshot in the master plan
- **Regressions Or Risks Introduced:** no runtime JS or markup changed in this pass; remaining selector debt is now more concentrated in `core.css`, `reservations.css`, `reports.css`, `app.css`, and `templatesA4.css`
- **Next Recommended Task:** define the first reusable primitive contract for `Button`, `Input`, `Select`, and `Card`, then prepare the shared composition mechanism for the compact `PageShell` pilot

### 2026-04-05 | Codex | Phase 1 PageShell Contract And Pilot Decision
### ٢٠٢٦-٠٤-٠٥ | كودكس | عقد PageShell وقرار الـ Pilot للمرحلة الأولى

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Confirmed there is no existing HTML partial layer in the current Vite build, defined the extraction-ready `PageShell` slot contract, and locked the first pilot migration family to the compact manager pages.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/pageShellPilotAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/pageShellPilotAudit.test.js tests/theme/sharedShellContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static audit of `vite.config.js`, `package.json`, and the compact-shell page family in `site-analytics.html`, `contact-inquiries.html`, and `feedback-submissions.html`
- **Regressions Or Risks Introduced:** no runtime code changed in this pass; Phase 2 still requires introducing a shared composition mechanism before extraction can start safely
- **Next Recommended Task:** normalize low-risk selector debt in `forms.css`, `tabs.css`, `index.css`, and `maintenance.css` while the shell extraction boundary is now fixed

### 2026-04-05 | Codex | Phase 1 Shared Shell Inventory Audit
### ٢٠٢٦-٠٤-٠٥ | كودكس | تدقيق جرد الـ Shared Shell للمرحلة الأولى

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Documented the duplicated shell anchors and current page families across the main HTML entrypoints, identified the extraction-ready `PageShell` boundary, and added an audit test to keep those shell anchors aligned until extraction begins.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/sharedShellContractAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/sharedShellContractAudit.test.js tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static audit of `dashboard.html`, `projects.html`, `customer.html`, `technician.html`, `users.html`, `home.html`, `site-analytics.html`, `contact-inquiries.html`, and `feedback-submissions.html`
- **Regressions Or Risks Introduced:** no runtime markup changed in this pass; shell duplication remains high until an actual shared partial/template layer is introduced
- **Next Recommended Task:** define the slot contract for `PageShell`, `SidebarSummary`, `SidebarNav`, `SidebarLinks`, and `GreetingContent`, then apply it first to the lowest-risk pages

### 2026-04-05 | Codex | Phase 1 Token Ownership And Selector Debt Audit
### ٢٠٢٦-٠٤-٠٥ | كودكس | تدقيق ملكية الـ Tokens وديون الـ Selector للمرحلة الأولى

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Locked the theme token ownership model in the master plan, recorded the current legacy dark-selector debt by file, and added a migration audit test that protects the current ownership boundaries and debt baseline.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`, `tests/theme/themeMigrationAudit.test.js`
- **Tests Run:** `npx vitest run tests/theme/themeMigrationAudit.test.js tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static audit of `src/styles/tailwind-theme.css`, `src/styles/core.css`, and remaining feature CSS selector debt in `app.css`, `forms.css`, `index.css`, `maintenance.css`, `reports.css`, `reservations.css`, `tabs.css`, and `templatesA4.css`
- **Regressions Or Risks Introduced:** no runtime code changed in this pass; migration debt remains high in `reservations.css`, `core.css`, and `maintenance.css`
- **Next Recommended Task:** inventory duplicated shared shell structures across dashboard, projects, customer, technician, users, and related low-risk pages before extraction work begins

### 2026-04-05 | Codex | Phase 1 Selector Contract Pass
### ٢٠٢٦-٠٤-٠٥ | كودكس | تمريرة عقد الـ Selector للمرحلة الأولى

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Normalized the dark-theme selector contract for the shared app shell foundation, the global core theme foundation, and the enhanced select component. Added a dedicated theme audit to prevent selector drift from reappearing.
- **Key Files Or Surfaces Touched:** `src/styles/app.css`, `src/styles/core.css`, `src/styles/enhanced-select.css`, `tests/theme/darkSelectorContract.test.js`, `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npx vitest run tests/theme/darkSelectorContract.test.js tests/theme/styleAudit.test.js tests/theme/coreStyleAudit.test.js tests/theme/pageBoot.test.js tests/theme/theme.test.js`, `npm run test:reservations`
- **Manual Checks Run:** static review of the global dark-theme contract, core theme foundation rules, and enhanced select dark-mode coverage
- **Regressions Or Risks Introduced:** no test regressions observed; deeper feature-specific CSS still contains legacy selector variants outside this first normalization pass
- **Next Recommended Task:** define the canonical semantic token ownership layer and inventory the remaining legacy dark selectors in feature CSS before shell extraction begins

### 2026-04-05 | System / Initial Setup
### ٢٠٢٦-٠٤-٠٥ | النظام / التهيئة الأولية

- **Phase:** Foundation Stabilization
- **Summary of Completed Work:** Created the master UI redesign file, locked the team rules, documented the current audited frontend baseline, and defined the phased rollout model and handoff process.
- **Key Files Or Surfaces Touched:** `UI_REDESIGN_MASTER_PLAN.md`
- **Tests Run:** `npm run test:reservations`
- **Manual Checks Run:** static audit of page structure, shell duplication, styling layers, theme boot/runtime split, and current test baseline
- **Regressions Or Risks Introduced:** none from this doc-only change; active product risk remains in the current frontend debt
- **Next Recommended Task:** start Foundation Stabilization implementation by defining one theme contract, one selector policy, and one token ownership model

---

## 10. Open Risks And Blockers
## ١٠. المخاطر والعوائق المفتوحة

- The redesign baseline is green again. `npm run build` passes, the shared stabilization audits are green, and `npm run test:reservations` now passes fully. The remaining risk is no longer failing baseline tests; it is the still-live compatibility alias layer and the broader deletion review that must happen before the bridge can shrink further.
- أصبح خط الأساس الحالي لإعادة التصميم أخضر مرة أخرى. ينجح `npm run build`، وأصبحت تدقيقات التثبيت المشتركة خضراء، كما أصبح `npm run test:reservations` ينجح بالكامل. ولم تعد المخاطرة المتبقية هي فشل اختبارات خط الأساس، بل طبقة aliases التوافقية التي ما زالت حية ومراجعة الحذف الأوسع التي يجب أن تتم قبل أن تنكمش طبقة الـ bridge أكثر.
- The active program is now stabilization-first. Further page rollout, decorative polish, and final visual-direction work are intentionally frozen until the shared baseline is re-closed.
- أصبح البرنامج النشط الآن قائمًا على التثبيت أولًا. وتم تجميد أي ترحيل إضافي للصفحات أو صقل زخرفي أو عمل متعلق بالاتجاه البصري النهائي عمدًا إلى أن يُعاد إغلاق خط الأساس المشترك.
- The shared dark-selector contract in the primary owners (`core.css`, `app.css`, and the tracked reservation selectors) is now re-closed on the canonical `:where(...)` policy. Remaining stabilization debt is no longer the root selector family itself, but the bridge-token overlap, compatibility-layer sprawl, and the smaller set of remaining ownership edges outside the cleaned primary hotspots.
- تم الآن إعادة إغلاق عقد الـ dark-selector المشترك في المالكين الأساسيين (`core.css` و`app.css` والـ selectors المتعقبة في الحجوزات) على سياسة `:where(...)` القياسية. ولم تعد ديون التثبيت المتبقية هي عائلة selectors الجذرية نفسها، بل تداخل طبقة الـ bridge tokens واتساع طبقة التوافق ومجموعة أصغر من حواف الملكية المتبقية خارج البؤر الأساسية التي تم تنظيفها.
- The shared control contract is now re-closed across the primary owners for generic inputs, primitive fields, and the tracked reservation textarea families. The remaining shared-system debt is no longer unresolved control chrome drift itself, but token overlap, legacy compatibility aliases, and the deletion-candidate review needed before the bridge layer can shrink safely.
- تم الآن إعادة إغلاق عقد عناصر التحكم المشتركة عبر المالكين الأساسيين لحقول الإدخال العامة والـ primitives وعائلات textareas المتعقبة في الحجوزات. ولم يعد الدين المشترك المتبقي هو انجراف كروم عناصر التحكم نفسه، بل تداخل الـ tokens وطبقات التوافق القديمة ومراجعة مرشحات الحذف المطلوبة قبل أن تنكمش طبقة الـ bridge بأمان.
- The primary shared owners (`core.css`, `app.css`, `reservations.css`) no longer carry the same level of accidental blue/navy chrome leakage after Batch 3, but intentionally frozen status/badge families and compact reservation-detail palette blocks still preserve older blue-literal pockets until a later non-stabilization decision.
- لم تعد طبقات المالكين الأساسيين (`core.css` و`app.css` و`reservations.css`) تحمل نفس مستوى تسرب الكروم الأزرق/الكحلي العرضي بعد الدفعة الثالثة، لكن عائلات الحالات/الشارات المجمدة عمدًا وكتل لوحة تفاصيل الحجوزات المدمجة ما زالت تحتفظ ببعض الجيوب الزرقاء القديمة إلى حين قرار لاحق خارج مرحلة التثبيت.
- The shared dark elevation tokens are now reduced and the baseline is calmer, and the primary tracked wrapper/card ownership conflicts have also been narrowed (`.table-wrapper` is structural-only, reservation table wrappers remain structural-only, and the nested reservation detail info-card no longer paints a second card inside its parent section). The next instability is therefore token-layer overlap and compatibility sprawl, not repeated surface ownership in these primary tracked areas.
- أصبحت tokens العمق الداكنة المشتركة الآن أخف وأهدأ، كما تم أيضًا تضييق تعارضات ملكية الأغلفة/البطاقات الأساسية المتعقبة (`.table-wrapper` أصبحت هيكلية فقط، وما زالت أغلفة جداول الحجوزات هيكلية فقط، ولم تعد بطاقة معلومات تفاصيل الحجز الداخلية ترسم بطاقة ثانية داخل القسم الأب). لذا فإن مصدر عدم الاستقرار التالي هو تداخل طبقات الـ tokens واتساع طبقة التوافق لا تكرار ملكية السطح في هذه المناطق الأساسية المتعقبة.
- The first dead-bridge purge is now complete: a verified set of zero-reference compatibility tokens has been removed from `core.css`, and the first deletion ledger is documented. What remains is the harder part: live compatibility aliases that still back real page markup and therefore cannot be deleted blindly.
- اكتملت الآن أول عملية إزالة لطبقة الـ bridge الميتة: فقد أزيلت مجموعة موثقة من tokens التوافقية ذات المرجع الصفري من `core.css`، وتم توثيق أول سجل حذف. وما تبقى الآن هو الجزء الأصعب: aliases التوافقية الحية التي ما زالت تدعم markup حقيقيًا في الصفحات، ولذلك لا يمكن حذفها بشكل أعمى.
- The app still depends heavily on script-driven `innerHTML` rendering and inline style mutation on operational surfaces. That makes visual cleanup fragile because page/module code can bypass the shared primitive contract after CSS-level cleanup.
- ما زال التطبيق يعتمد بكثافة على بناء الواجهة عبر `innerHTML` والكتابة المباشرة على الأنماط داخل السكربتات في الأسطح التشغيلية. وهذا يجعل التنظيف البصري هشًا لأن كود الصفحات أو الوحدات يمكنه تجاوز عقد الـ primitives المشتركة بعد أي تنظيف على مستوى CSS.
- Further page-by-page redesign should stay frozen until the shared baseline is re-closed or the failing audit expectations are intentionally redefined.
- يجب إبقاء أي إعادة تصميم إضافية على مستوى الصفحات مجمدة إلى أن يُعاد إغلاق خط الأساس المشترك أو تُعاد صياغة توقعات اختبارات التدقيق الفاشلة بشكل مقصود.

- Shared shell duplication increases the cost and regression risk of page-by-page redesign.
- تكرار الـ shell المشترك يرفع تكلفة إعادة التصميم على مستوى الصفحات ويزيد خطر الانحدارات.
- The shell is duplicated across at least three current page families, which means extraction must preserve shared anchors while allowing sidebar and greeting content slots to vary by page type.
- الـ shell مكرر حاليًا عبر ثلاث عائلات صفحات على الأقل، وهذا يعني أن عملية الاستخراج يجب أن تحافظ على anchors المشتركة مع السماح بتغيير محتوى الشريط الجانبي ومحتوى الـ greeting حسب نوع الصفحة.
- A local HTML composition layer now exists in `vite.config.js`, but it is still new infrastructure and currently covers the compact shell family plus the extracted `tabs` family.
- توجد الآن طبقة محلية لتركيب HTML داخل `vite.config.js`، لكنها ما زالت بنية جديدة وتغطي حاليًا عائلة الـ compact shell بالإضافة إلى عائلة `tabs` المستخرجة.
- The compact shell family is extracted, the `tabs` family is extracted across `home.html`, `customer.html`, and `technician.html`, and the `full` family is now also extracted across `projects.html` and `dashboard.html`; the remaining Phase 2 risk is stabilization, not missing extraction coverage.
- أصبحت عائلة الـ compact shell مستخرجة، كما أصبحت عائلة `tabs` مستخرجة عبر `home.html` و`customer.html` و`technician.html`، وأصبحت عائلة `full` أيضًا مستخرجة عبر `projects.html` و`dashboard.html`؛ أما المخاطرة المتبقية في المرحلة الثانية فهي التثبيت والاستقرار لا نقص التغطية في الاستخراج.
- The next migration order is now fixed to `tabs` before `full`; the compact family now has screenshot-based dark validation notes, but populated detail states still need one stronger runtime pass before `full`-family prep should begin.
- أصبح ترتيب الترحيل التالي مثبتًا الآن إلى `tabs` قبل `full`؛ وتمتلك عائلة الـ compact الآن ملاحظات تحقق للوضع الداكن مبنية على لقطات الشاشة، لكن حالات التفاصيل المعبأة ما زالت تحتاج إلى تمريرة تشغيلية أقوى قبل بدء التحضير لعائلة `full`.
- The `tabs` family is now extracted, but it still has one meaningful validation split to preserve: `home.html` is a lighter no-Bootstrap page, while `customer.html` and `technician.html` are paired detail pages with Bootstrap, Flatpickr, greeting stat grids, and `projectDetailsModal`.
- أصبحت عائلة `tabs` مستخرجة الآن، لكنها ما زالت تحتاج إلى الحفاظ على انقسام تحقق مهم: فصفحة `home.html` أخف ولا تعتمد على Bootstrap، بينما تشكل `customer.html` و`technician.html` صفحتي تفاصيل مترابطتين مع Bootstrap وFlatpickr وشبكات الإحصاءات داخل greeting و`projectDetailsModal`.
- Targeted source-level dark-theme validation is now recorded for the extracted `tabs` family through `tests/theme/tabsFamilyDarkModeAudit.test.js` and the dedicated checkpoint `tabsFamilyDarkModeAudit.test.js`; the compact family also has screenshot-based desktop validation notes, but populated-state dark validation is still incomplete for the extracted detail pages.
- تم الآن توثيق تحقق موجّه على مستوى المصدر للوضع الداكن لعائلة `tabs` المستخرجة عبر `tests/theme/tabsFamilyDarkModeAudit.test.js`، كما أصبحت لدى عائلة الـ compact ملاحظات تحقق سطح مكتب مبنية على لقطات الشاشة، لكن تحقق الوضع الداكن للحالات المعبأة ما زال غير مكتمل لصفحات التفاصيل المستخرجة.
- A screenshot-based local dark smoke pass now exists through `scripts/manual-dark-smoke.mjs`, including reusable `--port` and `--mobile` options, and the `site-analytics.html?bypassAuth=1` route blocker has been cleared, but populated-state validation is still limited by `Unauthorized` responses in the localhost bypass flow.
- توجد الآن تمريرة محلية للوضع الداكن مبنية على لقطات الشاشة عبر `scripts/manual-dark-smoke.mjs` مع خيارات قابلة لإعادة الاستخدام مثل `--port` و`--mobile`، وقد تم إغلاق عائق المسار الخاص بـ `site-analytics.html?bypassAuth=1`، لكن التحقق من الحالات المعبأة ما زال محدودًا بسبب استجابات `Unauthorized` ضمن مسار bypass المحلي.
- Dark theme is the primary usage mode, so any unresolved dark-surface issue in the compact family now blocks the next migration step even if light-theme checks appear acceptable.
- الوضع الداكن هو وضع الاستخدام الأساسي، لذلك فإن أي مشكلة غير محلولة في أسطح الوضع الداكن داخل عائلة الـ compact تمنع خطوة الترحيل التالية حتى لو بدت فحوصات الوضع الفاتح مقبولة.
- The localhost bypass smoke pass still leaves `Unauthorized` placeholders/toasts on several pages because route access and data access are not the same contract; this limits visual validation of populated states even when shell surfaces render correctly.
- تمريرة bypass المحلية ما زالت تترك عناصر `Unauthorized` وtoasts في عدة صفحات لأن صلاحية الوصول إلى الصفحة ليست نفسها صلاحية الوصول إلى البيانات؛ وهذا يقيّد التحقق البصري للحالات المعبأة حتى عندما تظهر أسطح الـ shell بشكل صحيح.
- Compact-family `Unauthorized` rows/toasts should now be treated as localhost-bypass data noise unless a page-specific visual or behavioral regression is proven, because the fixture-backed detail-page pass completed without the same runtime blockers.
- يجب الآن التعامل مع صفوف ورسائل `Unauthorized` داخل عائلة الـ compact على أنها ضوضاء ناتجة عن localhost-bypass ما لم يثبت وجود انحدار بصري أو سلوكي خاص بصفحة بعينها، لأن تمريرة صفحات التفاصيل عبر الـ fixture اكتملت بدون نفس العوائق التشغيلية.
- A controlled localhost detail fixture now exists behind `fixture=details` for `customer.html` and `technician.html`, so populated dark-state validation no longer depends entirely on unstable backend responses during localhost bypass.
- يوجد الآن fixture محلي مضبوط لصفحات التفاصيل خلف `fixture=details` داخل `customer.html` و`technician.html`، لذلك لم يعد تحقق الوضع الداكن للحالات المعبأة يعتمد بالكامل على استجابات الخادم غير المستقرة أثناء localhost bypass.
- The shell-extraction program is effectively complete across the compact, tabs, and full families, but `dashboard.html` remains the heaviest extracted surface and should keep using the fixture-backed validation route whenever reports, calendar, maintenance, or modal-heavy flows are touched.
- أصبح برنامج استخراج الـ shell مكتملًا عمليًا عبر عائلات compact وtabs وfull، لكن `dashboard.html` تظل أثقل سطح مستخرج ويجب أن تستمر باستخدام مسار التحقق المدعوم بالـ fixture كلما تم تعديل التقارير أو التقويم أو الصيانة أو التدفقات الكثيفة للـ modals.
- The `full`-family scaffold now exists and `projects.html` already uses it; the smaller path is now stable enough in dark mode to stop blocking the next dashboard-specific prep step.
- أصبح scaffold الخاص بعائلة `full` موجودًا الآن وتستخدمه `projects.html` بالفعل؛ كما أصبح المسار الأصغر مستقرًا بما يكفي في الوضع الداكن ليتوقف عن تعطيل خطوة التحضير التالية الخاصة بصفحة `dashboard.html`.
- `projects.html` now has screenshot-backed dark-validation coverage across reports, templates, modal chrome, and the mobile drawer-open state, so its remaining risk is low compared with the unmigrated `dashboard.html` surface.
- تمتلك `projects.html` الآن تغطية تحقق مدعومة بلقطات شاشة في الوضع الداكن عبر التقارير والقوالب وواجهة الـ modals وحالة فتح الـ drawer على الجوال، لذلك أصبحت مخاطرها المتبقية منخفضة مقارنة بسطح `dashboard.html` غير المُرحّل.
- `dashboard.html` now has a stable fixture-backed runtime validation path through `?fixture=dashboard`, and the overview, reports, calendar, maintenance, and mobile drawer surfaces have all been revalidated in dark mode without redirect drift.
- تمتلك `dashboard.html` الآن مسار تحقق تشغيليًا مستقرًا عبر fixture محلي باستخدام `?fixture=dashboard`، وقد أُعيد التحقق من أسطح النظرة العامة والتقارير والتقويم والصيانة وفتح الـ drawer على الجوال في الوضع الداكن بدون انجرافات إعادة التوجيه.
- The fixture-backed dashboard dark-validation gate is now effectively closed across the heavy shell, reports, calendar, maintenance, mobile drawer, and modal surfaces; the next risk is migration complexity rather than missing dark-theme evidence.
- أصبحت بوابة التحقق الداكنة الخاصة بصفحة dashboard مغلقة فعليًا الآن عبر أسطح الـ shell الثقيلة والتقارير والتقويم والصيانة وفتح الـ drawer على الجوال والـ modals؛ وأصبحت المخاطرة التالية هي تعقيد الترحيل لا نقص الأدلة الخاصة بالوضع الداكن.
- `dashboard.html` now has a dedicated dark-validation checklist and source-level audit.
- تمتلك `dashboard.html` الآن قائمة تحقق مخصصة للوضع الداكن مع تدقيق على مستوى المصدر.
- Theme ownership is split between boot/runtime layers and mixed selector styles.
- ملكية الثيم موزعة بين طبقة الإقلاع وطبقة التشغيل مع خلط في selectors.
- Token ownership was previously implicit and is still in bridge mode: `tailwind-theme.css` owns semantic `--color-*`, while `core.css` still carries the broad `--bo-*` and `--clr-*` compatibility layer.
- كانت ملكية الـ tokens ضمنية سابقًا وما زالت في وضع bridge: حيث يملك `tailwind-theme.css` طبقة `--color-*` الدلالية، بينما يحمل `core.css` طبقة التوافق الواسعة `--bo-*` و`--clr-*`.
- Styling is spread across Tailwind/daisyUI, custom CSS, and Bootstrap usage.
- طبقة التنسيق موزعة بين Tailwind وdaisyUI وCSS مخصص واستخدام Bootstrap.
- Legacy dark-selector debt in the tracked authored CSS set is now closed, which means the next Phase 3 risk has shifted from cleanup work to closeout quality and runtime parity.
- تم الآن إغلاق دين الـ dark-selector القديم ضمن مجموعة ملفات CSS المؤلفة المتعقبة، وهذا يعني أن المخاطرة التالية في المرحلة الثالثة انتقلت من أعمال التنظيف إلى جودة الإغلاق وتكافؤ السلوك التشغيلي.
- The primitive contract is now both documented and implemented as a shared `ui-*` bridge layer, but it still relies on legacy Bootstrap-flavored classes as compatibility aliases until low-risk adoption proves the new primitives under real page usage.
- أصبح عقد الـ primitives الآن موثقًا ومطبقًا أيضًا كطبقة bridge مشتركة من نوع `ui-*`، لكنه ما زال يعتمد على كلاسات قديمة بطابع Bootstrap كـ aliases توافقية إلى أن يثبت تبني الـ primitives الجديدة على صفحات منخفضة الخطورة في الاستخدام الفعلي.
- The Phase 4 audit-foundation blocker is cleared. Semantic primary/secondary contrast has been corrected, card-border tokens now exist, and the missing shared token categories plus `StatCard`/`EmptyState` primitives are now implemented. The remaining risk is inconsistent adoption, not missing foundation.
- تم الآن إغلاق عائق الأساس الخاص بتدقيق المرحلة الرابعة: فقد تم تصحيح تباين اللونين الدلاليين الأساسي والثانوي، وأصبحت tokens حدود البطاقات موجودة، كما تم تنفيذ فئات الـ tokens المشتركة الناقصة إضافة إلى primitives من نوع `StatCard` و`EmptyState`. وأصبحت المخاطرة المتبقية الآن هي عدم الاتساق في التبني لا نقص الأساس نفسه.
- High-risk surfaces still depend on legacy DOM contracts and dense script-driven rendering.
- الأسطح عالية الخطورة ما زالت تعتمد على عقود DOM قديمة وبناء واجهة كثيف من خلال السكربتات.
- Existing inline style writes and large `innerHTML` rendering patterns will slow primitive adoption if left untouched.
- الاعتماد الحالي على `innerHTML` الكبير والأنماط المباشرة سيبطئ تبني الـ primitives إذا تُرك كما هو.
- `npm run build` is now part of the shell-extraction safety net; current build passes, but existing Rollup dynamic-import warnings remain and should not be confused with shell-pilot regressions.
- أصبح `npm run build` جزءًا من شبكة الأمان الخاصة باستخراج الـ shell؛ والبناء الحالي ينجح، لكن تحذيرات Rollup الحالية الخاصة بـ dynamic-import ما زالت موجودة ولا يجب خلطها مع انحدارات الـ shell pilot.
- `dist/` noise in the repo can confuse source-of-truth decisions if not explicitly ignored during redesign work.
- ضوضاء `dist/` داخل المستودع قد تربك قرارات المصدر المعتمد إذا لم يتم ضبطها بوضوح أثناء العمل.

### 2026-04-09 | Codex
### 2026-04-09 | Codex

- **Phase:** `users.html` targeted audit correction
- **What Changed:** audited the `users.html` compact-shell header and table shell after the user reported mismatch against approved pages. Removed the lingering generic `table-light` header class from the users table and tightened the users-page owner in `src/styles/users.css` so the compact header nav, greeting toggle, and greeting panel follow the flatter approved dark contract. Also hardened the users table wrapper/head/body against inherited background-image and box-shadow leakage so the old table glow no longer shows behind the users table.
- **What Was Verified:** `npm run build:assets`; dark visual capture via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/users.html' --out 'test-results/users-topbar-table-dark-final.png' --port 9222 --delay 1200 --post-click-delay 1000 --inspect-selector '.dashboard-header-nav' --inspect-selector '.dashboard-greeting-toggle' --inspect-selector '.users-table-wrapper'`; light sanity capture via a temporary light-mode variant of the same smoke script, output `test-results/users-topbar-table-light-final.png`
- **What Is Still Risky:** the users add/edit form controls remain on the older `input input-bordered` and `select select-bordered` markup path because the broader users-form audit was explicitly reverted earlier; deeper control normalization should wait for a fresh explicit request
- **What Is Blocked:** none
- **Next Exact Task:** continue the users page review only if the user wants to reopen the form/search/control layer; otherwise wait for explicit approval/lock
- **Do Not Start Yet:** do not re-open the reverted broader `users.html` redesign audit or widen this fix into shared control refactors without a new request

### 2026-04-10 | Codex
### 2026-04-10 | Codex

- **Phase:** `customer.html` empty-state parity audit
- **What Changed:** deep-audited the customer detail reservations/projects tabs and found that `customer-projects` was still using a custom empty-state rendering path while reservations used a simpler paragraph path. Split customer projects into true empty vs filtered no-results states, moved both customer-project empty branches onto the same `linked-records-empty-copy` contract used by reservations, removed the custom flex-based project empty-copy styling, and added the missing `customerProjects.noResults` translation key.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/customerPageAudit.test.js tests/reservations/renderers.test.js`; dark-mode live captures via `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/customer.html?id=1&bypassAuth=1&fixture=details&lang=en' --out test-results/customer-audit/customer-reservations-empty-en-after.png --eval "<forced reservations empty search>" --inspect-selector '#customer-reservations > .linked-records-empty-copy'` and `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/customer.html?id=1&bypassAuth=1&fixture=details&lang=en' --out test-results/customer-audit/customer-projects-empty-en-after.png --click '[data-customer-tab=\"projects\"]' --eval "<forced project empty search>" --inspect-selector '#customer-projects > .linked-records-empty-copy'`; focused section screenshots reviewed in `test-results/customer-audit/customer-reservations-empty-focused.png` and `test-results/customer-audit/customer-projects-empty-focused.png`
- **What Is Still Risky:** this parity pass aligns the empty-state contract and dark rendering path, but broader customer-page visual approval is still pending and other customer-page comments may still surface outside the empty-state scope
- **What Is Blocked:** none
- **Next Exact Task:** continue customer-page visual review and address the next scoped comment without widening into `technician.html` yet
- **Do Not Start Yet:** do not start `technician.html` or reopen approved-page cleanup while `customer.html` is still under active visual review

### 2026-04-11 | Codex
### 2026-04-11 | Codex

- **Phase:** `customer.html` Level 1 cleanup
- **What Changed:** treated `customer.html` as approved and completed a Level 1 cleanup pass limited to dead contract removal. Removed the stale `customer-hero-summary` DOM hook and the nonexistent `customer-edit-btn` lookup from `src/scripts/customerPage.js`, keeping the approved page wired only to live markup contracts already present in `src/pages/customer.html`. Also locked that cleanup in `tests/theme/customerPageAudit.test.js` so stale DOM lookups do not creep back in during later detail-page work.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/customerPageAudit.test.js tests/reservations/renderers.test.js`
- **What Is Still Risky:** this was a non-visual cleanup pass only. Customer remains approved, but broader cross-detail cleanup should still avoid widening into shared refactors unless a new issue demands it.
- **What Is Blocked:** none
- **Next Exact Task:** keep `customer.html` locked and move the next page work to `technician.html` when explicitly requested.
- **Do Not Start Yet:** do not reopen `customer.html` for structural or visual changes unless a new regression is reported.

### 2026-04-11 | Codex
### 2026-04-11 | Codex

- **Phase:** `technician.html` Level 1 cleanup
- **What Changed:** started the technician pass with the same low-risk cleanup rule used on customer. Replaced the wrong borrowed `customerDetails.primaryNav.*` ownership in `src/pages/technician.html` with technician-owned primary-nav keys, switched the technician tab rail onto the shared `detail-tabbar` owner while keeping `technician-tabbar`, and removed the dead `[data-technician-tab-trigger]` listener path from `src/scripts/technicianPage.js` because that contract no longer exists in the page markup. Locked the cleanup in `tests/theme/detailsPageAudit.test.js` and `tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js`
- **What Is Still Risky:** this is only the first technician cleanup slice. The page is structurally cleaner, but full technician approval still depends on visual review and any runtime comments that may surface around the financial modal, reservations, projects, or filters.
- **What Is Blocked:** none
- **Next Exact Task:** continue the technician review from the approved-clean structure and take the next narrow technician-only pass if a visual or runtime issue is found.
- **Do Not Start Yet:** do not reopen `customer.html`, approved pages, or `dashboard.html` while technician is the active page unless a new regression explicitly requires it.

### 2026-04-11 | Codex

- **Phase:** `technician.html` Level 1 runtime cleanup
- **What Changed:** removed a cross-page boot leak that was polluting `technician.html` with dashboard technicians-module side effects. Added `hasTechniciansModuleDom()` in `src/scripts/technicians.js` and gated `bootTechniciansModule()` behind real technicians-dashboard DOM anchors so importing shared helpers into `src/scripts/technicianPage.js` no longer boots the management module on the technician detail page. Locked that guard in `tests/theme/detailsPageAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js`; runtime smoke on `http://127.0.0.1:4174/src/pages/technician.html?id=1&bypassAuth=1&fixture=details` with direct inspection of `#toast-container .toast-message`
- **What Is Still Risky:** the technician detail page is now free of the observed unauthorized toast leak, but final approval still depends on broader technician-only visual review and any remaining behavioral comments around projects, reservations, or payout flows.
- **What Is Blocked:** none
- **Next Exact Task:** continue technician-only review from the cleaned runtime baseline and take the next narrow pass only if a real technician issue is found.
- **Do Not Start Yet:** do not widen this into dashboard technicians-module refactors beyond the current DOM boot guard unless a new shared regression appears.

### 2026-04-11 | Codex

- **Phase:** `technician.html` deep visual audit and modal cleanup
- **What Changed:** ran a full live audit across the technician detail route, projects tab, mobile shell, edit modal, and financial modal. Fixed the shared mobile top-bar containment on narrow screens by tightening the mobile `dashboard-header-nav` geometry in `src/styles/app.css` so the utility cluster no longer pushes the shell off-canvas. Also moved `#editTechnicianModal` onto a structured dark detail-modal contract in `src/pages/technician.html` and `src/styles/app.css`, adding explicit `detail-edit-modal__*` and `technician-edit-form` owners so the technician edit modal now matches the dark detail-page modal system instead of relying on the generic Bootstrap shell. Locked the new structure in `tests/theme/detailsPageAudit.test.js` and the shared mobile-header geometry in `tests/theme/sharedShellSurfaceOwnershipAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/sharedShellSurfaceOwnershipAudit.test.js tests/theme/tabsDetailPrimitiveAdoptionAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js`; runtime smoke on `technician.html?id=1&bypassAuth=1&fixture=details` for overview, projects, mobile, edit modal, and financial modal
- **What Is Still Risky:** the technician page is now on a cleaner visual/runtime baseline, but approval still depends on any remaining user-led comments about exact copy, spacing, or content density inside the technician financial flow.
- **What Is Blocked:** none
- **Next Exact Task:** continue technician-only review from the audited baseline and address only new concrete technician comments if they appear.
- **Do Not Start Yet:** do not reopen customer or approved pages, and do not widen the modal work into unrelated global modal redesign unless a shared regression is reported.

### 2026-04-11 | Codex

- **Phase:** `technician.html` edit-modal parity pass
- **What Changed:** ran a direct benchmark audit between `#editCustomerModal` and `#editTechnicianModal` and removed the remaining geometry drift. The technician edit modal now uses the same scrollable modal-dialog behavior and the same width envelope as the customer modal in `src/pages/technician.html` and `src/styles/app.css`, so the edit shell, spacing, and dark surface contract align with the approved customer modal rather than a narrower centered variant. The technician financial modal was also rechecked and left unchanged because it was already on the correct dark contract for its own purpose.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js`; runtime smoke on `technician.html?id=1&bypassAuth=1&fixture=details` for both `#editTechnicianModal` and `#technician-financial-modal`
- **What Is Still Risky:** visual parity is now at the modal-shell level, but any remaining differences would be content-driven because the technician form fields are not the same set as the customer form.
- **What Is Blocked:** none
- **Next Exact Task:** keep technician modal styling locked unless a new concrete mismatch is reported from live review.
- **Do Not Start Yet:** do not fork a second technician-only modal style branch; keep customer as the benchmark owner and technician as the shared-contract adopter.

### 2026-04-11 | Codex

- **Phase:** `technician.html` modal ownership and prefill regression fix
- **What Changed:** traced the missing technician edit data to a detail-page regression introduced by the technicians-module boot guard. `technician.html` was still dispatching `technician:prefill` and relying on `src/scripts/technicians.js` to attach both the prefill listener and the save-button listener, but that module no longer boots on the detail page. Moved edit-modal population and save ownership into `src/scripts/technicianPage.js`, using the shared technicians service directly so the detail page fills and saves its own modal without importing dashboard-module UI behavior. Also switched `#editTechnicianModal` onto the same customer modal class owner in `src/pages/technician.html` and broadened the customer modal selectors in `src/styles/app.css` so the technician edit modal now inherits the exact customer modal shell, spacing, and placeholder treatment from the benchmark owner instead of a parallel detail-edit branch.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/customerPageAudit.test.js tests/theme/tabsFamilyDarkModeAudit.test.js`; live smoke on `technician.html?id=1&bypassAuth=1&fixture=details` confirming populated technician edit fields and matched customer modal shell styling
- **What Is Still Risky:** the technician financial modal is intentionally a different modal type because it serves a different workflow; only the technician edit modal is benchmarked to customer.
- **What Is Blocked:** none
- **Next Exact Task:** keep the technician edit modal locked to the customer modal owner and only reopen it if a new concrete mismatch appears in live review.
- **Do Not Start Yet:** do not reintroduce `technician:prefill` or dashboard-module modal listeners on the detail page, and do not recreate a separate technician-only edit-modal style branch.

### 2026-04-11 | Codex

- **Phase:** `technician.html` mobile reservations/projects card audit
- **What Changed:** audited the technician and customer detail tabs at live mobile width and fixed the actual shared owners instead of adding page-local overrides. Replaced the technician projects tab's remaining Bootstrap `alert-info` empty state in `src/scripts/technicianDetails.js` with the shared `linked-records-empty-copy` primitive already used by customer. Updated `src/styles/reservations.css` so reservation cards on `customer.html` and `technician.html` stop using the horizontal fixed-width mobile scroller and instead render as a one-column mobile grid with stacked row content, wrapped badges, full-width action buttons, and readable notes. Updated `src/styles/core.css` so project cards on the detail pages also collapse to one column with cleaner padding and action sizing on mobile.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js tests/theme/customerPageAudit.test.js tests/reservations/list/index.test.js tests/reservations/renderers.test.js`; live mobile smoke via `scripts/manual-dark-smoke.mjs` on `technician.html?id=1&bypassAuth=1&fixture=details&tab=reservations&lang=en`, `technician.html?id=1&bypassAuth=1&fixture=details&tab=projects&lang=en`, `customer.html?id=1&bypassAuth=1&fixture=details&tab=reservations&lang=en`, and `customer.html?id=1&bypassAuth=1&fixture=details&tab=projects&lang=en`, with inspected selectors confirming reservation grids render as `display: grid` and both project grids/cards stay visible at mobile width.
- **What Is Still Risky:** the reservation and project cards are now readable on mobile, but true content stress still depends on real backend records beyond the local detail fixture. If very long live customer or crew names appear, those should be rechecked from production-like data.
- **What Is Blocked:** none
- **Next Exact Task:** keep `technician.html` active and continue only with new concrete technician-page review comments or a final approval/lock decision.
- **Do Not Start Yet:** do not reopen approved pages or widen this mobile-card cleanup into unrelated reservation-dashboard redesign work.

### 2026-04-11 | Codex

- **Phase:** `technician.html` financial-modal shell alignment
- **What Changed:** audited the technician financial summary modal against the technician edit modal and found it was still on a raw generic modal branch. Moved `#technician-financial-modal` in `src/pages/technician.html` onto the shared detail-modal shell by adopting `customer-edit-modal__dialog`, `customer-edit-modal__content`, `customer-edit-modal__header`, `customer-edit-modal__body`, and `customer-edit-modal__footer`, then added technician-financial-specific section owners in `src/styles/app.css` for the summary cards, table shell, payouts form, empty states, and footer actions so the internal layout now follows the same dark surface, spacing, and control geometry as the cleaned technician/customer modals instead of mixed Bootstrap defaults.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js`; live dark capture via `scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/technician.html?id=1&bypassAuth=1&fixture=details&lang=ar' --click '#technician-financial-open' --out test-results/technician-audit/technician-financial-modal-aligned.png`
- **What Is Still Risky:** the financial modal now matches the shell/style system, but the data density inside the financial table should still be rechecked if real production rows become much longer than the fixture row.
- **What Is Blocked:** none
- **Next Exact Task:** keep the financial modal on the shared detail-modal shell and only take another pass if a live visual mismatch remains after review.
- **Do Not Start Yet:** do not split the financial modal back into a generic modal style path and do not widen this change into global table redesign work without a new cross-page regression.

### 2026-04-11 | Codex

- **Phase:** `technician.html` financial-modal localization cleanup
- **What Changed:** audited the technician financial modal in both English and Arabic routes and fixed the inverse language leaks at the source. Added the missing English key for `technicianFinancial.payouts.form.notePlaceholder`, introduced localized technician-financial work-status labels in `src/scripts/translations/technician.js`, switched `src/scripts/technicianPage.js` to use those local work-status labels instead of raw reservation status fallback text, and localized fixture payout notes by adding `note_key` support in `src/scripts/devFixtures.js` plus note-key rendering in `src/scripts/technicianPage.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js`; live modal checks via `scripts/manual-dark-smoke.mjs` on `technician.html?id=1&bypassAuth=1&fixture=details&lang=en` and `technician.html?id=1&bypassAuth=1&fixture=details&lang=ar` with captures in `test-results/technician-audit/technician-financial-modal-en-fixed.png` and `test-results/technician-audit/technician-financial-modal-ar-fixed.png`
- **What Is Still Risky:** fixture-only note localization is now correct, but any backend-provided freeform notes will still display exactly as saved, which is expected rather than translated behavior.
- **What Is Blocked:** none
- **Next Exact Task:** keep technician financial modal copy locked unless a new untranslated runtime string appears in live review.
- **Do Not Start Yet:** do not add page-local string patches; keep technician financial copy owned by `src/scripts/translations/technician.js` and the financial modal renderer.

### 2026-04-11 | Codex

- **Phase:** `technician.html` top-bar parity pass
- **What Changed:** aligned the technician detail top bar to the approved customer benchmark. Removed the extra technician-only greeting badge rail from `src/pages/technician.html` and `src/scripts/technicianPage.js`, collapsed greeting metadata into the same single muted detail line pattern used by `customer.html`, and normalized the technician detail sidebar tab family so it follows the same customer-style set/order without the technician-only home shortcut. Locked the greeting/sidebar ownership in `tests/theme/detailsPageAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/detailsPageAudit.test.js`; live runtime compare via `scripts/manual-dark-smoke.mjs` on `customer.html?id=1&bypassAuth=1&fixture=details&lang=en` and `technician.html?id=1&bypassAuth=1&fixture=details&lang=en` with captures in `test-results/topbar-customer-benchmark.png` and `test-results/topbar-technician-benchmark-check.png`, plus inspected parity for `#dashboard-greeting-panel` and `.detail-tabbar .tab-buttons`
- **What Is Still Risky:** the technician page is now aligned at the shared shell level, but any future technician-only hero badges or shortcut links would immediately reintroduce parity drift if they are added outside the customer-owned contract.
- **What Is Blocked:** none
- **Next Exact Task:** keep `technician.html` active and continue only with new concrete technician review comments or a final approval/lock decision.
- **Do Not Start Yet:** do not fork a technician-only top-bar variant and do not reintroduce technician-only greeting badges or shortcut tabs while customer remains the benchmark owner.

### 2026-04-11 | Codex

- **Phase:** `technician.html` approval lock
- **What Changed:** marked `technician.html` approved after the completed technician detail review passes, including modal alignment, reservation/project mobile cleanup, financial summary cleanup, and top-bar parity cleanup. The page is now treated as visually locked at the current approved state alongside the other approved detail pages.
- **What Was Verified:** approval was based on the completed technician review record already logged above, including `npm run build:assets`, `npx vitest run tests/theme/detailsPageAudit.test.js`, and repeated live technician checks through `scripts/manual-dark-smoke.mjs` on `technician.html?id=1&bypassAuth=1&fixture=details`
- **What Is Still Risky:** none beyond normal future regression risk; any new change to `technician.html` should now be treated as reopening an approved page rather than continuing active redesign work.
- **What Is Blocked:** none
- **Next Exact Task:** keep `technician.html` locked unless a new regression explicitly reopens it, and choose the next page intentionally before starting new redesign work.
- **Do Not Start Yet:** do not keep iterating on `technician.html` as an active page without a new explicit regression or reopen decision.

### 2026-04-11 | Codex

- **Phase:** `projects.html` Level 1 cleanup
- **What Changed:** started the next intentional Level 1 pass on `projects.html`, the smaller stable `full`-family reference page. Removed the stale legacy technician/equipment selector contract from `src/scripts/projects/app.js`, `src/scripts/projects/dom.js`, `src/scripts/projects/data.js`, and `src/scripts/projects/form.js`. The current `projects.html` markup no longer renders `project-technician-select`, `add-technician-btn`, `project-technician-list`, `project-equipment-select`, `project-equipment-qty`, `add-equipment-btn`, or `project-equipment-list`, so the page-level cleanup stripped the dead DOM cache, dead selection listeners, and dead option-population path without changing the visible UI. Locked that cleanup in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** this was a low-risk dead-contract cleanup only. `projects.html` is not yet approved in this pass and still needs real review if it is going to become the next locked `full`-family page.
- **What Is Blocked:** none
- **Next Exact Task:** keep `projects.html` as the active page and continue only with new concrete review comments or the next narrow cleanup slice.
- **Do Not Start Yet:** do not jump to `dashboard.html` while `projects.html` is the current `full`-family cleanup reference unless a new shared regression forces that escalation.

### 2026-04-11 | Codex

- **Phase:** `projects.html` Level 2 cleanup
- **What Changed:** completed a bounded structural Level 2 pass on `projects.html` by collapsing the duplicated top-level main-tab markup into one shared `dashboard-tabbar` path. The page previously rendered one desktop-only tab rail and one separate mobile-only tab rail with the same `data-tab-target` controls. Replaced that with a single shared scroll-capable tab container in `src/pages/projects.html`, keeping the same visible tab set while removing the parallel desktop/mobile markup split. Locked that single-owner tab contract in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** this was still structural-only. `projects.html` is cleaner now, but it remains an active review page rather than an approved/locked page, and mixed old/new surface ownership still exists in other project sections.
- **What Is Blocked:** none
- **Next Exact Task:** continue `projects.html` only if a new concrete issue is found or if another narrow structural cleanup slice is explicitly requested.
- **Do Not Start Yet:** do not widen this into `dashboard.html` work, and do not start visual redesign changes on `projects.html` without first deciding whether the next pass is structural cleanup or review-driven UI correction.

### 2026-04-11 | Codex

- **Phase:** `projects.html` Level 3 cleanup
- **What Changed:** completed a bounded structural Level 3 pass on `projects.html` by removing the remaining legacy `box` shell ownership from the active create/manage flows and the runtime-rendered project cards. Moved the create-project form shell, linked-reservation shell, embedded customer management form, embedded technician management form, and the shared project-card renderer onto the shared `ui-card ui-card--content glass-card` surface contract. Locked that single-owner surface path in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** this is still structural cleanup only. `projects.html` now has cleaner surface ownership, but it remains an active review page rather than an approved/locked page and still needs real visual/runtime review before any approval decision.
- **What Is Blocked:** none
- **Next Exact Task:** keep `projects.html` active and continue only with concrete review findings or another tightly bounded structural cleanup slice if a real duplicate owner is found.
- **Do Not Start Yet:** do not widen this into `dashboard.html` work, and do not reopen approved pages while `projects.html` is the active `full`-family cleanup reference.

### 2026-04-11 | Codex

- **Phase:** `projects.html` create-project tab enrollment
- **What Changed:** narrowed the active work on `projects.html` to the `create-project-tab` first. Completed the first create-tab structural cleanup by removing the remaining legacy Bootstrap financial-control patterns from the create-project form. Replaced the old `alert` sale-price total indicator with a page-owned shared surface, removed the `input-group` wrappers from the discount and received-payment controls, and dropped the custom glowing `payment-add-btn` branch in favor of the shared primary-button path with a minimal layout class. Locked that create-tab contract in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** `create-project-tab` is cleaner structurally, but it is not approved yet. The tab still needs review-driven runtime and visual passes before it can be treated as locked.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `create-project-tab`, starting with concrete visual/runtime review of the form flow, linked-reservation summary, expense list, and billing block before touching the other project subtabs.
- **Do Not Start Yet:** do not jump back to `projects-list-tab`, reports, templates, or `dashboard.html` until the create-project tab is intentionally reviewed and stabilized first.

### 2026-04-11 | Codex

- **Phase:** `projects.html` create-project tab deep audit
- **What Changed:** completed the first review-driven deep audit for `create-project-tab`. Fixed the create-form payment-history data mismatch so percent entries render correctly, removed the duplicate reports auto-boot path, moved the expense ledger and payment history into full-width shells inside the create form, and hardened the create-tab language sync so enhanced select triggers update visually after language changes instead of keeping stale Arabic labels in English mode. Kept the hidden payment-status field opted out of enhancement and refreshed the create-tab contract in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-tab-enhanced-select-check.png --delay 1800 --post-click-delay 1800 --click '#language-toggle' --inspect-selector '.project-type-field .enhanced-select__trigger' --inspect-selector '.project-payment-progress-group .enhanced-select__trigger' --inspect-selector '[data-i18n-key="projects.form.title"]' --inspect-selector '[data-i18n-key="projects.form.buttons.save"]'`
- **What Is Still Risky:** `create-project-tab` is now materially cleaner and visually reviewed, but it is still not approved. The next pass should stay inside the create flow and focus on real workflow behavior such as linked reservations, save validation, and customer/crew/equipment assignment interactions.
- **What Is Blocked:** none
- **Next Exact Task:** continue only inside `create-project-tab` with the next real workflow issue or review finding before touching `projects-list-tab`, reports, templates, or `dashboard.html`.

### 2026-04-11 | Codex

- **Phase:** `projects.html` create-project tab workflow pass
- **What Changed:** completed the next create-tab workflow pass by restoring the missing create-form crew and equipment assignment surface with a new page-owned contract instead of reviving the deleted legacy selector path. Added create-tab technician and equipment controls in `src/pages/projects.html`, wired them through `src/scripts/projects/dom.js`, `src/scripts/projects/data.js`, and `src/scripts/projects/form.js`, and kept the selected crew/equipment state flowing into draft restore, equipment estimate calculation, and the final project payload. Also fixed the linked-reservation draft handoff so create-form payment history is preserved in the saved draft instead of being silently lost when the user leaves the page to create a linked reservation. Finally, hardened the `projects.html` bootstrap in `src/scripts/projects/app.js` so the page explicitly loads customers, technicians, and equipment records needed by the create flow rather than relying only on stale local storage side effects.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-tab-workflow-audit-2.png --delay 2600 --post-click-delay 1600 --click '#language-toggle' --eval "...create-tab workflow checks..." --inspect-selector '#project-create-technician-select' --inspect-selector '#project-create-equipment-select' --inspect-selector '#project-create-technician-list' --inspect-selector '#project-create-equipment-list' --inspect-selector '#project-payment-history' --inspect-selector '.project-type-field .enhanced-select__trigger'`
- **What Is Still Risky:** the direct `bypassAuth=1` audit route now proves the create-tab structure, payment history rendering, and language-sync path, but it still does not prove real technician/equipment population because that route is not exposing usable source records in the current browser state. The authenticated workflow should be checked next in a real session before approval.
- **What Is Blocked:** authenticated data-backed verification of the create-tab assignment controls
- **Next Exact Task:** review `create-project-tab` in a real authenticated session and confirm customer lookup, crew assignment, equipment assignment, linked reservation handoff, and final save behavior before moving to the next `projects.html` subtab.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab rollback to UI-only scope
- **What Changed:** reverted the last create-tab functional experiment that added direct crew and equipment assignment into the project form. Removed the temporary create-tab technician/equipment controls from `src/pages/projects.html`, stripped the related DOM/data/form bootstrap from `src/scripts/projects/dom.js`, `src/scripts/projects/data.js`, `src/scripts/projects/form.js`, and `src/scripts/projects/app.js`, and removed the related styling and translation keys from `src/styles/forms.css` and `src/scripts/translations/projects.js`. Kept the earlier accepted UI-only cleanup in place, including the shared financial-control styling cleanup, the full-width expense and payment-history shells, and the enhanced-select language-sync fix. The create-project tab is now back on the intended architecture where linked reservations own crew, equipment, and their payment-specific behavior.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** `create-project-tab` remains an active review surface and is not approved yet. It still needs UI-only visual and runtime review, but no new functional architecture changes should be introduced there.
- **What Is Blocked:** none
- **Next Exact Task:** continue only with interface and visual refinement inside `create-project-tab`, starting from the existing client/date/company flow and the linked-reservation section without reintroducing direct crew/equipment assignment.
- **Do Not Start Yet:** do not add new create-tab functionality for crew, equipment, or payment ownership; that stays under the linked reservation flow.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab dark-surface and control-contract audit
- **What Changed:** completed a deep visual/runtime audit for the whole `create-project-tab` and cleaned the remaining dark-mode drift without changing functionality. Fixed the shared dark control contract in `src/styles/app.css` so dark inputs, textareas, selects, flatpickr fields, and Bootstrap-backed controls now explicitly keep the shared dark border color and control radius instead of leaking the light Bootstrap border/radius. Hardened `src/styles/enhanced-select.css` so visible combobox triggers keep the shared control geometry and stop falling back to a broken square trigger shape. Then flattened the remaining muddy create-tab surfaces in `src/styles/forms.css` by moving `project-form-card`, `project-linked-reservation`, `project-billing-panel`, `project-switch-row`, `project-payment-history-block`, the expense table wrapper, the sale-price indicator, and linked-reservation summary items onto one quieter project-owned dark surface path with no extra gradient image and no extra shadow. Locked those contracts in `tests/theme/fullShellContractAudit.test.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-full-audit-postfix-desktop.png --delay 2400 --post-click-delay 1000 --inspect-selector '#project-title' --inspect-selector '#project-client' --inspect-selector '#project-client-company' --inspect-selector '#project-description' --inspect-selector '#project-expense-label' --inspect-selector '#project-discount' --inspect-selector '#project-payment-progress-value' --inspect-selector '.project-form-card' --inspect-selector '.project-linked-reservation' --inspect-selector '.project-billing-panel' --inspect-selector '.project-payment-history-block'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-enhanced-select-audit-postfix.png --delay 2400 --post-click-delay 1000 --inspect-selector '.project-type-field .enhanced-select__trigger' --inspect-selector '.project-discount-group .enhanced-select__trigger' --inspect-selector '.project-payment-progress-group .enhanced-select__trigger' --inspect-selector '#project-title' --inspect-selector '.project-form-card'`
- **What Is Still Risky:** `create-project-tab` is now cleaner and visually closer to the approved pages, but the whole tab is still an active review surface and not approved yet. The remaining work should stay review-driven and focus on any last layout/content-density issues rather than new architecture or workflow changes.
- **What Is Blocked:** none
- **Next Exact Task:** keep working only inside `create-project-tab` and take the next concrete visual parity issue if one is found in the live review.
- **Do Not Start Yet:** do not reopen crew/equipment ownership in the create form, and do not widen this pass into other project subtabs until the create tab itself is signed off.

### 2026-04-12 | Codex

- **Phase:** `projects.html` create-project tab final usability spacing pass
- **What Changed:** completed a final UX-driven layout pass on `create-project-tab` after the whole-tab visual review. Tightened the create form into a more intentional form workflow in `src/styles/forms.css` by turning `#project-form` into an explicit vertical stack, increasing section spacing, narrowing the desktop content widths for the basics rows, linked-reservation block, expense row, billing row, and footer, and reducing the oversized title/client/company field feel on large screens. Also increased the linked-reservation block padding and moved it onto the quieter project-muted surface so it now reads as a distinct step between the basics and the later service/billing work instead of blending into the same parent shell.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-final-review-desktop-2.png --delay 2400 --post-click-delay 1000 --inspect-selector '.project-linked-reservation' --inspect-selector '.project-row--type-title' --inspect-selector '.project-row--client' --inspect-selector '.project-expense-row' --inspect-selector '.project-billing-row'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1' --out test-results/projects-create-final-review-mobile-2.png --viewport 430x1600 --delay 2400 --post-click-delay 1000 --inspect-selector '.project-linked-reservation' --inspect-selector '.project-row--type-title' --inspect-selector '.project-row--client' --inspect-selector '.project-expense-row' --inspect-selector '.project-billing-row'`
- **What Is Still Risky:** this pass improves pacing and readability, but `create-project-tab` is still not approved yet because the remaining judgment is now purely visual: whether the current density and section balance are fully signed off by review, not whether a structural or dark-mode defect remains.
- **What Is Blocked:** none
- **Next Exact Task:** take the next specific visual note from live review on `create-project-tab`, or lock the tab if the current hierarchy and spacing are accepted.
- **Do Not Start Yet:** do not widen this into projects list/reports/templates cleanup while `create-project-tab` remains the active review surface.

### 2026-04-12 | Codex

- **Phase:** `projects.html` project modal contract cleanup
- **What Changed:** completed a deep visual/runtime audit for the important project modal surfaces inside `projects.html`, focusing on the project details modal, its edit state, and the close-project modal. Moved both project modals in `src/pages/projects.html` onto the shared approved modal shell by reusing the `customer-edit-modal` dialog/content/header/body/footer contract instead of the older generic `ui-modal__content` path. Then cleaned the runtime-rendered project modal content in `src/scripts/projects/projectDetails/view.js` and `src/scripts/projects/projectDetails/edit.js` by removing the old `modal-action-btn` branch in favor of shared `ui-button` contracts for the details footer, edit add-actions, and edit footer actions. Finally, flattened the old muddy/glow-heavy internal project modal surfaces in `src/styles/core.css` and widened the shared modal shell scope in `src/styles/app.css` so project detail sections, summary blocks, code badge, notes surface, edit action bar, and close-project form now sit on the same dark modal family as the approved customer and technician modals instead of the older grey/gradient fallback.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-details-post-audit.png --delay 2000 --post-click-delay 1200 --eval "document.querySelector('[data-project-subtab-target=\"projects-list-tab\"]')?.click()" --click "#project-focus-cards .project-focus-card" --inspect-selector "#projectDetailsModal .modal-content" --inspect-selector "#project-details-body .project-details-footer" --inspect-selector "#project-details-body .project-details-section"`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-post-audit.png --delay 2000 --post-click-delay 1200 --eval "document.querySelector('[data-project-subtab-target=\"projects-list-tab\"]')?.click()" --click "#project-focus-cards .project-focus-card" --click "#project-details-body [data-action='edit-project']" --inspect-selector "#projectDetailsModal .modal-content" --inspect-selector "#project-details-body #project-details-edit-form" --inspect-selector "#project-details-body .project-edit-actions"`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-close-modal-post-audit.png --delay 2000 --post-click-delay 1200 --eval "document.querySelector('[data-project-subtab-target=\"projects-list-tab\"]')?.click()" --click "#project-focus-cards [data-action='close-project']" --inspect-selector "#closeProjectModal .modal-content" --inspect-selector "#closeProjectModal .modal-footer" --inspect-selector "#close-project-submit"`
- **What Is Still Risky:** the project modals are now on the approved shell and shared button path, but the reservations-linked content inside the details modal still carries its own reservation-specific renderer and can only be finally judged with richer real data than the current fixture. The shell drift and old modal-action glow path are resolved.
- **What Is Blocked:** none
- **Next Exact Task:** continue on `projects-list-tab` and the remaining `projects.html` review surfaces, and only reopen the project modals if a new visual regression appears with real populated reservation data.
- **Do Not Start Yet:** do not create a new project-specific modal styling branch, and do not reintroduce the old `modal-action-btn` path into project details or edit state.

### 2026-04-12 | Codex

- **Phase:** `projects.html` project modal browsing and table-surface refinement
- **What Changed:** completed the next UX-focused modal pass on the project details flow. Moved the expenses table in `src/scripts/projects/projectDetails/display.js` from the generic `table-responsive` path onto the same shared `users-table-wrapper` + `ui-table users-table surface-table` contract used by approved pages, which removed the leftover table glow inside the modal. Tightened the modal browsing rhythm in `src/styles/core.css` by refining the project modal section padding, heading sizes, title scale, summary grid cards, description readability, and linked-reservations spacing so the details modal is easier to scan. Also flattened reservation card shadows in the linked-reservations block and replaced the old `alert-info` linked-reservations empty state in `src/scripts/projects/view.js` with the shared empty-copy path.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-details-ux-post.png --delay 2000 --post-click-delay 1200 --eval "document.querySelector('[data-project-subtab-target=\"projects-list-tab\"]')?.click()" --click "#project-focus-cards .project-focus-card" --inspect-selector "#projectDetailsModal .modal-content" --inspect-selector "#project-details-body .project-reservations-section" --inspect-selector "#project-details-body .project-details-grid-item"`
- **What Is Still Risky:** the fixture route used for review still did not expose a populated linked-reservations section for every sampled project, so the refined linked-reservations card browsing is improved structurally but still benefits from one final check against richer real data.
- **What Is Blocked:** none
- **Next Exact Task:** continue the `projects.html` review surface and only reopen the project details modal if a specific populated linked-reservations regression appears in real data.
- **Do Not Start Yet:** do not reintroduce modal-local table wrappers or modal-specific glow/shadow styling for project tables.

### 2026-04-12 | Codex

- **Phase:** `projects.html` project edit modal UX and payment-history table pass
- **What Changed:** completed a deeper UX pass on the project edit modal. Fixed the `Project Type` control in `src/scripts/projects/projectDetails/display.js` and `src/scripts/projects/projectDetails/edit.js` by restoring the full project-type option contract (`commercial`, `coverage`, `photography`, `social`, `event`, `conference`) and explicitly initializing enhanced selects after the modal edit form is rendered, so the type dropdown now changes correctly inside the modal. Rebuilt the edit modal billing area in `src/scripts/projects/projectDetails/edit.js` onto the same bordered `project-billing-panel`, `project-discount-group`, `project-payment-progress-group`, and `project-switch-row` contracts used in `create-project-tab`, which improves layout clarity and keeps discount and received-payment controls easier to edit. Finally, moved project payment history in `src/scripts/projects/projectDetails/payment.js` and `src/scripts/projects/projectDetails/view.js` onto the shared `users-table-wrapper` + `ui-table users-table surface-table` table contract for both details and edit modes, while cleaning the remaining table glow path in `src/styles/core.css`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-ux-final.png --click '#projects-list-tab-btn' --click '.project-focus-card' --click '[data-action="edit-project"]' --delay 2000 --post-click-delay 1200 --inspect-selector '#project-details-edit-form [name="project-type"]' --inspect-selector '.project-edit-type-field .enhanced-select__trigger' --inspect-selector '#project-edit-payment-history .users-table-wrapper' --inspect-selector '#project-edit-payment-history .reservation-payment-history__table' --inspect-selector '.project-edit-billing-panel .project-discount-group'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-type-change-audit.png --click '#projects-list-tab-btn' --click '.project-focus-card' --click '[data-action="edit-project"]' --delay 2000 --post-click-delay 1000 --eval '(() => { const trigger = document.querySelector(".project-edit-type-field .enhanced-select__trigger"); if (!trigger) return {step:"missing-trigger"}; trigger.click(); const wrapper = document.querySelector(".project-edit-type-field .enhanced-select[data-open=\"true\"]"); if (!wrapper) return {step:"wrapper-not-open"}; const option = wrapper.ownerDocument.body.querySelector(".enhanced-select__menu.is-open .enhanced-select__option[data-value=\"conference\"]"); if (!option) return {step:"option-not-found"}; option.click(); const select = document.querySelector("#project-details-edit-form [name=\"project-type\"]"); const triggerAfter = document.querySelector(".project-edit-type-field .enhanced-select__trigger"); return {step:"done", value: select?.value || null, text: triggerAfter?.textContent || null}; })()' --inspect-selector '#project-details-edit-form [name="project-type"]' --inspect-selector '.project-edit-type-field .enhanced-select__trigger'`
- **What Is Still Risky:** the modal contract is now cleaner and the type dropdown works, but the project edit workflow still benefits from live review against richer real project histories than the local fixture because the fixture shows only a minimal payment-history set.
- **What Is Blocked:** none
- **Next Exact Task:** continue the active `projects-list-tab` and project-modal review surface with the next concrete visual note, or lock the project modal editing surface if the current details/edit UX is accepted.
- **Do Not Start Yet:** do not reintroduce Bootstrap `input-group` styling into project modal billing controls, and do not split project payment history back into a modal-local list renderer.

### 2026-04-12 | Codex

- **Phase:** `projects.html` project edit modal final visual review
- **What Changed:** completed the final live review pass on the project edit modal after the UX fixes. Kept the working enhanced-select contract for `Project Type`, and adjusted the billing strip in `src/scripts/projects/projectDetails/edit.js` so the three key edit sections (`discount`, `company share & VAT`, and `received payment`) now sit on a single row earlier on desktop by using `col-lg-4` instead of waiting for the extra-wide `xl` breakpoint. No local override branch was added; the modal stayed on the same shared billing and select contracts introduced in the previous pass.
- **What Was Verified:** `npm run build:assets`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-dropdown-open.png --click '#projects-list-tab-btn' --click '.project-focus-card' --click '[data-action="edit-project"]' --click '.project-edit-type-field .enhanced-select__trigger' --delay 2000 --post-click-delay 1200 --inspect-selector '.project-edit-type-field .enhanced-select[data-open="true"]' --inspect-selector '.enhanced-select__menu.is-open' --inspect-selector '.enhanced-select__menu.is-open .enhanced-select__option[data-value="conference"]' --inspect-selector '.project-edit-billing-row'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-final-visual-review.png --click '#projects-list-tab-btn' --click '.project-focus-card' --click '[data-action="edit-project"]' --click '.project-edit-type-field .enhanced-select__trigger' --delay 2000 --post-click-delay 1200 --inspect-selector '.enhanced-select__menu.is-open' --inspect-selector '.project-edit-billing-row > .col-lg-4' --inspect-selector '.project-edit-billing-panel'`
- **What Is Still Risky:** none from the modal shell itself; any remaining issue at this point would be a new specific UX note, not a broken contract.
- **What Is Blocked:** none
- **Next Exact Task:** take the next concrete project-modal or `projects-list-tab` note from live review, or lock the project edit modal surface if it is now accepted.
- **Do Not Start Yet:** do not fork a separate project-modal select system or a separate billing layout path outside the shared create/edit project billing contracts.

### 2026-04-13 | Codex

- **Phase:** `projects.html` project edit modal border, row-fit, and dropdown-layer audit
- **What Changed:** completed a deeper live audit on the project edit modal after the previous UX pass. Raised the global enhanced-select menu layer in `src/styles/enhanced-select.css` so select menus now sit above modal surfaces instead of opening under them. Then aligned the edit-modal billing panels in `src/styles/core.css` to the same section surface used elsewhere in the project modal family by restoring the correct dark background and border color, removing the odd lighter outer border feel, and tightening the billing row gutters plus the payment-control internals. Finally, widened the project modal envelope slightly in `src/styles/app.css` so the three edit billing sections fit more reliably on one row without creating a project-specific branch.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-audit-fixed.png --click '#projects-list-tab-btn' --click '.project-focus-card' --click '[data-action="edit-project"]' --click '.project-edit-type-field .enhanced-select__trigger' --delay 2000 --post-click-delay 1200 --inspect-selector '.enhanced-select__menu.is-open' --inspect-selector '.project-edit-billing-panel' --inspect-selector '.project-edit-billing-row > .col-lg-4:nth-child(3)' --inspect-selector '.project-edit-billing-panel .project-payment-progress-group'`
- **What Is Still Risky:** if a user reports another dropdown problem after this pass, it is likely to be a separate interaction bug rather than a layering/style problem, because the menu now opens above the modal and the trigger/option path is visible in live inspection.
- **What Is Blocked:** none
- **Next Exact Task:** continue with the next project modal or `projects-list-tab` review note from live usage, or lock the project edit modal if the current editing surface is accepted.
- **Do Not Start Yet:** do not reintroduce a modal-local dropdown z-index override or a second billing-panel visual branch outside the shared modal/edit contracts.

### 2026-04-13 | Codex

- **Phase:** `projects.html` project edit modal billing-row and toggle cleanup
- **What Changed:** rebuilt the edit-modal billing strip in `src/scripts/projects/projectDetails/edit.js` from a Bootstrap row into a dedicated three-column billing grid so the `discount`, `company share & VAT`, and `received payment` panels follow one clean contract inside the modal. Converted the share/VAT controls onto actual switch styling by reusing the shared reservation switch classes, moved the payment action button below the amount controls to free horizontal space, widened the payment value field, and centered the stacked fallback state for narrower widths in `src/styles/core.css`. Also removed modal clipping by setting the project modal shell to `overflow: visible` and pinned a dark fallback `background-color` on the modal content in `src/styles/app.css` so the old white base cannot leak under the gradients.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-billing-row-audit.png --height 1600 --click '[data-project-subtab-target="projects-list-tab"]' --click '[data-action="view-details"]' --click '[data-action="edit-project"]' --eval 'document.querySelector(".project-edit-billing-row")?.scrollIntoView({block:"center"}); true' --inspect-selector '.project-edit-billing-row' --inspect-selector '.project-edit-billing-col:nth-child(1)' --inspect-selector '.project-edit-billing-col:nth-child(2)' --inspect-selector '.project-edit-billing-col:nth-child(3)'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-dropdown-open-audit.png --height 1400 --click '[data-project-subtab-target="projects-list-tab"]' --click '[data-action="view-details"]' --click '[data-action="edit-project"]' --click '.project-edit-type-field .enhanced-select__trigger' --inspect-selector '.enhanced-select__menu.is-open' --inspect-selector '.project-shell-modal .customer-edit-modal__content'`
- **What Is Still Risky:** none from the current billing/modal shell contract; any remaining note should now be a new micro-UX refinement rather than a broken row, clipping, or toggle path.
- **What Is Blocked:** none
- **Next Exact Task:** continue with the next live review note on project modals or `projects-list-tab`, or lock the current project edit modal if the interaction now reads correctly.
- **Do Not Start Yet:** do not reintroduce the inline three-control payment row or a separate checkbox branch for the share/VAT controls.

### 2026-04-13 | Codex

- **Phase:** `projects.html` project edit modal expenses-table and payment-history ordering pass
- **What Changed:** converted the existing expenses list in `src/scripts/projects/projectDetails/display.js` from inline editable text boxes into a normal shared table with plain cell values plus the remove action only, so the edit modal now uses the same table reading pattern as the approved global tables. Removed the dead inline-expense input listener path from `src/scripts/projects/projectDetails/edit.js`, and reordered the payment-history section so its heading now leads the block, followed by the summary cards and then the history table. Updated the spacing owner in `src/styles/core.css` so the moved `Payment history` header keeps the correct rhythm above the summary grid and table.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-expenses-table-final.png --height 1700 --click '[data-project-subtab-target="projects-list-tab"]' --click '[data-action="view-details"]' --click '[data-action="edit-project"]' --eval 'document.querySelector("#project-edit-expense-list")?.scrollIntoView({block:"center"}); true' --inspect-selector '#project-edit-expense-list .project-services-table' --inspect-selector '#project-edit-expense-list input'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:4174/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/project-edit-modal-payment-history-order-final.png --height 1800 --click '[data-project-subtab-target="projects-list-tab"]' --click '[data-action="view-details"]' --click '[data-action="edit-project"]' --eval 'document.querySelector(".project-edit-payment-history")?.scrollIntoView({block:"center"}); true' --inspect-selector '.project-edit-payment-history > .reservation-payment-history__header' --inspect-selector '#project-edit-payment-summary' --inspect-selector '#project-edit-payment-history'`
- **What Is Still Risky:** none from the current table/layout contract; any remaining note here would be a new UX preference rather than legacy modal markup leaking through.
- **What Is Blocked:** none
- **Next Exact Task:** continue with the next project-modal review note or return to `projects-list-tab` once the current modal surfaces are accepted.
- **Do Not Start Yet:** do not restore inline text-field editing inside the expenses table or move the payment history heading back into the table shell.

### 2026-04-19 | Codex

- **Phase:** `projects.html` project details payment-history parity and edit confirmation visibility pass
- **What Changed:** updated `src/scripts/projects/projectDetails/view.js` so the project details modal now renders the `Payment history` table before the summary cards, matching the newer edit-modal reading order. In `src/scripts/projects/projectDetails/edit.js`, wrapped the confirmation and cancellation controls into a dedicated status surface, then added the matching visual contract in `src/styles/core.css` so the whole confirmation area has clearer containment, spacing, and a stronger visual boundary while keeping the same existing ids and behavior.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** live Chrome-CDP screenshot verification was not available in this pass because the local DevTools endpoint on `127.0.0.1:9222` was not accepting connections, so final visual confirmation for these two surfaces is code-level plus build/test verified rather than screenshot-verified.
- **What Is Blocked:** local Chrome DevTools session unavailable for screenshot capture at the time of this pass
- **Next Exact Task:** run one live visual spot-check on the project details modal payment-history order and the edit-modal confirmation panel once the local Chrome DevTools session is available again, then continue with the next modal review note.
- **Do Not Start Yet:** do not revert the confirmation section back to loose inline controls or move the details-modal payment summary back above the history table.

### 2026-04-20 | Codex

- **Phase:** `projects.html` project edit modal unified status control pass
- **What Changed:** replaced the fragmented edit-modal status controls in `src/scripts/projects/projectDetails/edit.js` with one unified `Project status` surface that shows the current status badge, one shared dropdown for `pending / confirmed / closed / cancelled`, a contextual hint, and a single `Apply status` action. Removed the separate footer close/reopen buttons and the old confirm/cancel checkbox path, then wired both the inline status action and the main form submit to the same status-patch logic so the linked reservation sync now flows from one source of truth. Added the supporting layout rules in `src/styles/core.css` and the new status labels/hints in `src/scripts/translations/projects.js`.
- **What Was Verified:** `npm run build:assets`; `npx vitest run tests/theme/fullShellContractAudit.test.js`
- **What Is Still Risky:** live visual verification for the unified status section still depends on a browser spot-check, because this pass was verified by code/build/tests only and not by a fresh screenshot capture.
- **What Is Blocked:** local screenshot verification was not run in this pass
- **Next Exact Task:** run one live visual review on the project edit modal status section, then continue with the next `projects-list-tab` UX refinement or lock the modal if the unified status control is accepted.
- **Do Not Start Yet:** do not reintroduce separate confirm / cancel / close / reopen controls outside the new shared status surface.

### 2026-04-21 | Codex

- **Phase:** shared dark-surface glow regression audit and handover pass
- **What Changed:** completed a repo-wide back-office audit for the returned glossy gradient/glow on approved pages, project reports, and shared header chrome. In `src/styles/core.css`, replaced the dark shared shell/content/tab/table tokens that had drifted back to gradient-heavy surfaces with matte solid/semi-opaque dark surfaces and neutral shadows so shared primitives stop leaking glow into approved pages. In `src/styles/tabs.css`, removed glossy shared tab defaults by routing shared tab buttons and subtab shells back through the global token contract, stripping blur from shared tab containers, and removing default shadow from inactive tab pills. In `src/styles/reports.css`, normalized the reports surface contract so report cards no longer reintroduce a local green halo via a stronger reports-only shadow/blur layer, and forced `background-image: none` on shared reports cards. In `src/styles/app.css`, removed the remaining top-bar/header chrome glow from the shared dashboard and auth headers by flattening the shared header shell, logo badge, mobile sidebar toggle, language/theme buttons, greeting toggle, and auth-header shell back to matte token-based surfaces with no glow shadow.
- **What Was Verified:** `npm run build:assets`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5173/src/pages/dashboard.html?bypassAuth=1' --out test-results/audit-dashboard-surfaces-after-reports-fix.png --delay 2200 --post-click-delay 800 --eval 'document.body.classList.remove("auth-pending","theme-loading"); document.documentElement.classList.remove("theme-loading"); true' --inspect-selector '.dashboard-tabbar' --inspect-selector '.reservations-subtabs-container .tabs' --inspect-selector '#reservations-report-table-card'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5173/src/pages/projects.html?bypassAuth=1&fixture=dashboard' --out test-results/audit-project-reports-tab-after-fix.png --delay 2600 --post-click-delay 1200 --eval 'document.body.classList.remove("auth-pending","theme-loading"); document.documentElement.classList.remove("theme-loading"); document.querySelector("[data-project-subtab-target=\"projects-reports-tab\"]")?.click(); true' --inspect-selector '#projects-reports-tab' --inspect-selector '#projects-reports-tab .reports-surface-card' --inspect-selector '#projects-reports-tab .reports-table-card'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5173/src/pages/dashboard.html?bypassAuth=1' --out test-results/audit-topbar-dashboard-no-glow-final.png --delay 2200 --post-click-delay 800 --eval 'document.body.classList.remove("auth-pending","theme-loading"); document.documentElement.classList.remove("theme-loading"); true' --inspect-selector '.dashboard-header-nav' --inspect-selector '.dashboard-hero-logo' --inspect-selector '.language-toggle-btn' --inspect-selector '.theme-toggle-btn'`; `node scripts/manual-dark-smoke.mjs --url 'http://127.0.0.1:5173/src/pages/login.html' --out test-results/audit-auth-header-no-glow-final.png --delay 2200 --post-click-delay 800 --eval 'document.body.classList.remove("auth-pending","theme-loading"); document.documentElement.classList.remove("theme-loading"); document.documentElement.classList.add("dark"); document.body.classList.add("dark"); true' --inspect-selector '.auth-header' --inspect-selector '.auth-header .dashboard-hero-logo' --inspect-selector '.auth-header .language-toggle-btn' --inspect-selector '.auth-header .theme-toggle-btn'`
- **What Is Still Risky:** shared chrome and report/container owners are now flat, but there are still localized gradients/shadows that are intentional and should not be mistaken for regressions without a new product request. Current examples include timeline/status bars, skeleton loaders, some auth hero decorative surfaces, and localized action chips/buttons that are not part of the shared header/container contract.
- **What Is Blocked:** none
- **Next Exact Task:** keep approved pages and the newly-cleaned shared header/report surfaces locked. If another glow report appears, inspect whether it comes from a localized page-owned surface first before reopening `core.css`, `tabs.css`, `reports.css`, or the shared header block in `app.css`.
- **Do Not Start Yet:** do not flatten localized status/timeline/skeleton visuals under the banner of shared glow cleanup, and do not reintroduce page-local gradients or blur onto shared back-office containers, report cards, or top-bar controls.

---

## 11. Next Recommended Tasks
## ١١. المهام التالية الموصى بها

1. Treat Phases 1 through 9 as closed for the current redesign program. Master Plan completion is now `100%` with `0%` tracked redesign work remaining.
1. تعامل مع المراحل 1 إلى 9 على أنها مغلقة ضمن برنامج إعادة التصميم الحالي. اكتملت الخطة الرئيسية الآن بنسبة `100%` ولا يوجد عمل إعادة تصميم متتبع متبقٍ (`0%`).
2. Keep all visually approved pages locked: `home.html`, `dashboard.html`, `projects.html`, `customer.html`, `technician.html`, `site-analytics.html`, `contact-inquiries.html`, `feedback-submissions.html`, `notifications.html`, `users.html`, and `equipment-requests.html`.
2. أبقِ كل الصفحات المعتمدة بصريًا مقفلة: `home.html` و`dashboard.html` و`projects.html` و`customer.html` و`technician.html` و`site-analytics.html` و`contact-inquiries.html` و`feedback-submissions.html` و`notifications.html` و`users.html` و`equipment-requests.html`.
3. Preserve the corrected full theme-audit baseline: `npx vitest run tests/theme` is green at `44 / 44` test files and `156 / 156` tests. Future changes that touch redesign contracts should keep this suite green.
3. حافظ على خط أساس تدقيق الثيم المصحح: أمر `npx vitest run tests/theme` ناجح بعدد `44 / 44` ملف اختبار و`156 / 156` اختبار. أي تغيير مستقبلي يمس عقود إعادة التصميم يجب أن يحافظ على نجاح هذه المجموعة.
4. Use regression-driven maintenance only. Do not reopen page-level redesign, Level 3 CSS deletion, stale-audit cleanup, or broad compatibility-helper removal unless a concrete broken surface is identified.
4. اعمل بنمط صيانة مبني على الانحدارات فقط. لا تُعد فتح إعادة تصميم الصفحات أو حذف CSS في المستوى الثالث أو تنظيف الاختبارات القديمة أو إزالة مساعدات التوافق العامة إلا إذا تم تحديد سطح مكسور بوضوح.
5. Do not restore removed legacy classes, old selectors, deleted source files, or old source-shape text such as `src/styles/index.css` or `htmlCompositionPlugin()` just to satisfy historical references.
5. لا تُعِد الأصناف القديمة أو الـ selectors المحذوفة أو الملفات المحذوفة أو نصوص البنية القديمة مثل `src/styles/index.css` أو `htmlCompositionPlugin()` لمجرد إرضاء مراجع تاريخية.
6. Before any future release after redesign-contract changes, rerun `npx vitest run tests/theme` and `npm run build:assets`; add a focused visual smoke only when the source change affects runtime UI.
6. قبل أي إصدار مستقبلي بعد تغييرات تمس عقد إعادة التصميم، أعد تشغيل `npx vitest run tests/theme` و`npm run build:assets`؛ وأضف فحصًا بصريًا مركزًا فقط إذا كان التغيير يؤثر على واجهة التشغيل.

---

## 12. Reference Documents
## ١٢. المستندات المرجعية

These files remain historical or supporting references. They do not replace this master file.
هذه الملفات تبقى مراجع تاريخية أو داعمة، لكنها لا تستبدل هذا الملف الرئيسي.

- `PROJECT_ROADMAP_STATUS.md` — project-wide roadmap status index for non-design work; UI/design status still comes from this master plan.
- `UI_UX_STABILIZATION_PLAN_2026_04.md`
- `FULL_AUDIT_2026_04.md`
- `CSS_OWNERSHIP_AUDIT.md`
- `UI_COLOR_TOKEN_AUDIT.md`
- `DARK_UI_DESIGN_CONSISTENCY_AUDIT.md`
- `ENHANCED_SELECT_EXTRACTION_MANIFEST.md`
- `TAILWIND_V4_PLAN.md`
- `HANDOVER_2026_04.md`

If a referenced document conflicts with this file, this file wins.
إذا تعارض أي مستند مرجعي مع هذا الملف، فالأولوية لهذا الملف.

---

## 13. Handoff Template
## ١٣. قالب التسليم

Copy this block, fill it in, and append it to `Progress Log` when handing work to the next contributor.
انسخ هذا القالب واملأه وأضفه إلى `Progress Log` عند تسليم العمل للمساهم التالي.

```md
### YYYY-MM-DD | Owner Name
### YYYY-MM-DD | اسم المالك

- **Phase:** <phase name>
- **What Changed:** <exact completed work>
- **What Was Verified:** <tests run + manual checks>
- **What Is Still Risky:** <remaining regression risk>
- **What Is Blocked:** <blocker or "none">
- **Next Exact Task:** <the next implementable task>
- **Do Not Start Yet:** <surfaces or work that must wait>
```

### 2026-04-21 | Codex
### 2026-04-21 | كودكس

- **Phase:** Project Reports UX alignment
- **What Changed:** Rebuilt the project reports filter/search surface to follow the compact `My Projects` contract, separated the reports title card from the filter card, added filter reset wiring, localized the new filter title/subtitle, and isolated the reports tab filter classes so legacy reservations/reports filter styles no longer leak into project reports.
- **Files Updated:** `src/pages/projects.html`, `src/styles/reports.css`, `src/scripts/projectsReports.js`, `src/scripts/translations/projects.js`
- **Important Implementation Note:** The live browser cascade continued to apply legacy `.reports-filters` layout rules inside `projects.html` even after scoped shared-CSS updates. To close the issue deterministically, the final project-reports filter contract is also declared in a page-scoped `<style>` block in `src/pages/projects.html`. Do not remove that block unless you first prove the compiled cascade no longer reintroduces the old reports layout.
- **What Was Verified:** `npm run build:assets`; direct CDP dark-mode verification of the reports filter shell; visual artifact `test-results/audit-project-reports-filters-cdp-dark-v5.png`; benchmark comparison artifact `test-results/audit-my-projects-filters-after-compare.png`
- **What Is Still Risky:** Any future attempt to merge project reports back into the shared reservations reports filter contract can reintroduce the stretched chip row, old flex wrapper, and mismatched spacing.
- **What Is Blocked:** none
- **Next Exact Task:** If more polish is requested, keep the project reports filter contract local and only extract it back into shared CSS after a full cascade audit across both reservations reports and project reports.
- **Do Not Start Yet:** Reworking reservations reports filters, removing the page-scoped project reports filter styles, or broadening this pass into other approved tabs.

### 2026-04-27 | Codex
### 2026-04-27 | كودكس

- **Phase:** Project templates tab activation and benchmark handoff
- **What Changed:** Accepted the explicit priority change for `projects.html`: reports are deferred and `projects-templates-tab` is now the active redesign surface. Audited the supporting documents needed for this pass: `UI_UX_STABILIZATION_PLAN_2026_04.md`, `FULL_AUDIT_2026_04.md`, `TEMPLATES_TAB_SPLIT_PLAN.md`, `BRAND_APPLICATION_TOKEN_MAP.md`, and `UI_COLOR_TOKEN_AUDIT.md`. The source audit confirmed that the template tab had been borrowing `reports.css` layout ownership for non-report behavior, which made the shell harder to maintain and kept the tab off the approved shared-card benchmark path. Rebuilt the template tab shell in `src/pages/projects.html` so it now uses shared `glass-card`, `compact-hero-card`, `compact-surface-panel`, `surface-heading-stack`, and `ui-empty-state` primitives instead of the reports wrapper. Moved the template toolbar/dropdown/preview-shell styling into `src/styles/app.css`, removed the template-only layout rules from `src/styles/reports.css`, and aligned the dynamic actions-menu buttons in `src/scripts/projects/templatesTab.js` with the shared button contract.
- **What Was Verified:** Source-level audit updated in `tests/theme/fullShellContractAudit.test.js` and `tests/theme/modalFormsAudit.test.js` to lock the new template-tab contract. Functional template logic was intentionally left on the existing IDs/selectors so the UI shell pass stays narrow.
- **What Is Still Risky:** This pass does not yet redesign the A4 document internals inside `src/styles/templatesA4.css`; print/export color rules and layout hacks still carry hardcoded values because they are tied to output fidelity. `src/scripts/projects/templatesTab.js` also remains partially monolithic even after the extraction work already present in `src/scripts/projects/templatesTab/`.
- **What Is Blocked:** none
- **Next Exact Task:** Continue inside `projects-templates-tab` with a deeper UI/runtime audit of the preview toolbar, saved-template flow, and dark-mode preview shell, then decide which remaining template-specific layout pieces can be promoted into shared primitives without touching PDF fidelity.
- **Do Not Start Yet:** Do not reopen `projects-reports-tab` during this pass, and do not merge template preview/export rules into shared tokens until the A4 output contract is validated separately from the page shell.
