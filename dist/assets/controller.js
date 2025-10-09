import{w as ba,e as Q,t as r,n as b,j as x,y as ha,f as he,k as jt,o as ga,u as ya}from"./auth.js";import{G as V,H as lt,z as G,I as qa,J as Le,K as xt,L as Nt,M as wa,N as Sa,O as Be,P as qe,Q as Rt,R as Ea,S as Pt,t as Mt,T as Ft,U as xa,V as Ca,s as Oe,i as _t,W as Ht,X as Ia,Y as ka,Z as Ta,d as Ae,r as ue,c as zt,g as Ot,_ as Aa,$ as $a,v as La,D as Da,a0 as Ba,a1 as ja,a2 as Na,a3 as Ra,w as Pa,y as Ma}from"./projectsService.js";ba({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.create.equipment.table.code":"الكود","reservations.create.equipment.table.description":"الوصف","reservations.create.equipment.table.price":"السعر","reservations.create.equipment.table.image":"الصورة","reservations.create.equipment.table.delete":"حذف","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.headers.code":"الكود","reservations.edit.table.headers.description":"الوصف","reservations.edit.table.headers.price":"السعر","reservations.edit.table.headers.quantity":"الكمية","reservations.edit.table.headers.image":"الصورة","reservations.edit.table.headers.delete":"حذف","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"📊 تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"🔄 تحديث","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"متوسط الحجز —","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"📈 تطور الحجوزات","reservations.reports.chart.volume.hint":"آخر 6 أشهر","reservations.reports.chart.status.title":"📊 توزيع الحالات والدفع","reservations.reports.chart.status.hint":"نسب مئوية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.topCustomers.title":"👥 أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"📄 تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.topEquipment.title":"🎥 المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.create.equipment.table.code":"Code","reservations.create.equipment.table.description":"Description","reservations.create.equipment.table.price":"Price","reservations.create.equipment.table.image":"Image","reservations.create.equipment.table.delete":"Delete","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.headers.code":"Code","reservations.edit.table.headers.description":"Description","reservations.edit.table.headers.price":"Price","reservations.edit.table.headers.quantity":"Qty","reservations.edit.table.headers.image":"Image","reservations.edit.table.headers.delete":"Delete","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"📊 Performance Reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"🔄 Refresh","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Average reservation —","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"📈 Reservation trend","reservations.reports.chart.volume.hint":"Last 6 months","reservations.reports.chart.status.title":"📊 Status & payment breakdown","reservations.reports.chart.status.hint":"Percentages","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.topCustomers.title":"👥 Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"📄 Reservation Details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.topEquipment.title":"🎥 Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});function je(e={}){return e.image||e.imageUrl||e.img||""}function Fa(e){if(!e)return null;const t=V(e),{equipment:n=[]}=Q();return(n||[]).find(a=>V(a?.barcode)===t)||null}function ct(e){const t=V(e);if(!t)return null;const{equipment:n=[]}=Q();return(n||[]).find(a=>V(a?.barcode)===t)||null}function we(e){return ct(e)?.status==="صيانة"}let Ze=null,Ut=[],Je=new Map,et=new Map;function Vt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function dt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function ut(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Qt(e,t,{allowPartial:n=!1}={}){const a=G(t);if(!a)return null;const o=e.get(a);if(o)return o;if(!n)return null;const s=[];return e.forEach((i,l)=>{l.includes(a)&&s.push(i)}),s.length===1?s[0]:null}function tt(e,t={}){return Qt(Je,e,t)}function nt(e,t={}){return Qt(et,e,t)}function ge(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function Wt(e){Ut=Array.isArray(e)?[...e]:[]}function mt(){return Ut}function pt(e){return e&&mt().find(t=>String(t.id)===String(e))||null}function Ct(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||r("projects.fallback.untitled","مشروع بدون اسم")}function _a(){const e=document.getElementById("res-company-share");if(!e||!e.checked)return null;const t=e.dataset.companyShare??e.value??xt,n=b(String(t).replace("%","").trim()),a=parseFloat(n);return Number.isFinite(a)?a:xt}function Ha(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function It(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const o=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${o}`}return""}function kt(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function se({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:o}=dt();if(!n||!a||!o)return;const s=lt()||[],i=r("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),l=r("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const c=new Set;Je=new Map;const p=s.filter(u=>u&&u.id!=null).map(u=>({id:String(u.id),label:kt(u)||l})).filter(u=>{if(!u.label)return!1;const S=G(u.label);return!S||c.has(S)?!1:(c.add(S),Je.set(S,u),!0)}).sort((u,S)=>u.label.localeCompare(S.label,void 0,{sensitivity:"base"}));o.innerHTML=p.map(u=>`<option value="${Vt(u.label)}"></option>`).join("");const d=t?"":n.value,v=e?String(e):a.value?String(a.value):"",g=v?s.find(u=>String(u.id)===v):null;if(g){const u=kt(g)||l;a.value=String(g.id),n.value=u,n.dataset.selectedId=String(g.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":d}function Ne({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:o,list:s}=ut();if(!a||!o||!s)return;const i=Array.isArray(t)?t:mt()||[],l=r("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",l);const c=[...i].filter(h=>h&&h.id!=null).sort((h,w)=>String(w.createdAt||w.start||"").localeCompare(String(h.createdAt||h.start||""))),p=n?"":a.value,d=r("projects.fallback.untitled","مشروع بدون اسم"),v=new Set;et=new Map;const g=c.map(h=>{const w=Ct(h)||d;return{id:String(h.id),label:w}}).filter(h=>{if(!h.label)return!1;const w=G(h.label);return!w||v.has(w)?!1:(v.add(w),et.set(w,h),!0)});s.innerHTML=g.map(h=>`<option value="${Vt(h.label)}"></option>`).join("");const u=e?String(e):o.value?String(o.value):"",S=u?c.find(h=>String(h.id)===u):null;if(S){const h=Ct(S)||d;o.value=String(S.id),a.value=h,a.dataset.selectedId=String(S.id)}else o.value="",a.dataset.selectedId="",a.value=n?"":p}function Me(e,t,n){const{date:a,time:o}=Nt(n),s=document.getElementById(e),i=document.getElementById(t);if(s){if(a)if(s._flatpickr){const l=s._flatpickr.config?.dateFormat||"Y-m-d";s._flatpickr.setDate(a,!1,l)}else s.value=a;else s._flatpickr?s._flatpickr.clear():s.value="";s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(o)if(i._flatpickr){const l=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(o,!1,l)}else i.value=o;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Yt(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Ne({selectedValue:a});const s=(lt()||[]).find(d=>String(d.id)===String(e.clientId)),i=s?.id!=null?String(s.id):"";se(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const l=It(e,"start"),c=It(e,"end");l&&Me("res-start","res-start-time",l),c&&Me("res-end","res-end-time",c);const p=document.getElementById("res-notes");p&&e.description&&(t||!p.value)&&(p.value=e.description),ye(),F()}function Gt({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Q(),o=Array.isArray(a)?a:[];Wt(o);const s=t!=null?String(t):n.value?String(n.value):"";Ne({selectedValue:s,projectsList:o}),ye(),F()}function ye(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function ft(){const{input:e,hidden:t}=ut();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const o=e.value.trim(),s=o?nt(o,{allowPartial:a}):null;if(s){t.value=String(s.id),e.value=s.label,e.dataset.selectedId=String(s.id);const i=pt(s.id);i?Yt(i,{skipProjectSelectUpdate:!0}):(ye(),F())}else t.value="",e.dataset.selectedId="",ye(),F()};e.addEventListener("input",()=>{const a=e.value.trim(),o=a?nt(a):null;o?(t.value=String(o.id),e.dataset.selectedId=String(o.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function vt(){const{input:e,hidden:t}=dt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const o=e.value.trim(),s=o?tt(o,{allowPartial:a}):null;s?(t.value=String(s.id),e.value=s.label,e.dataset.selectedId=String(s.id)):(t.value="",e.dataset.selectedId=""),F()};e.addEventListener("input",()=>{const a=e.value.trim(),o=a?tt(a):null;o?(t.value=String(o.id),e.dataset.selectedId=String(o.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function za(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),o=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,o),!n||!n.projectId)return;document.getElementById("res-project")&&(Ne({selectedValue:String(n.projectId)}),ye());const i=pt(n.projectId);if(i?Yt(i,{forceNotes:!!n.forceNotes}):F(),n.start&&Me("res-start","res-start-time",n.start),n.end&&Me("res-end","res-end-time",n.end),n.customerId){const c=(lt()||[]).find(p=>String(p.id)===String(n.customerId));c?.id!=null&&se({selectedValue:String(c.id)})}else se({selectedValue:""})}function Ue(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Le(e,n),end:Le(t,a)}}function Xt(e){const t=G(e);if(!t)return null;const n=Ht()||[],a=n.find(o=>G(o?.desc||o?.description||"")===t);return a||n.find(o=>G(o?.desc||o?.description||"").includes(t))||null}function Kt(e,t="equipment-description-options"){const n=G(e);if(!n)return!1;const a=document.getElementById(t);return a&&a.options&&Array.from(a.options).some(i=>G(i.value)===n)?!0:(Ht()||[]).some(s=>G(s?.desc||s?.description||"")===n)}function Se(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),{equipment:n=[]}=Q(),a=Array.isArray(n)?n:[];Ta(a);const s=Array.from(new Set(a.map(i=>i?.desc||i?.description||"").filter(Boolean))).sort((i,l)=>i.localeCompare(l,"ar",{sensitivity:"base"})).map(i=>`<option value="${i}"></option>`).join("");e&&(e.innerHTML=s),t&&(t.innerHTML=s)}function Xe(e,t){const n=V(e);if(!n)return!1;const{start:a,end:o}=Ue();if(!a||!o)return x(r("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Be().some(l=>V(l.barcode)===n))return x(r("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(qe(n,a,o))return x(r("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=ct(n);return i?we(i.barcode)?(x(r("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")),!1):(Rt({id:i.id,equipmentId:i.id,barcode:n,desc:i.desc,qty:1,price:i.price,image:je(i)}),t&&(t.value=""),Ee(),F(),x(r("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(x(r("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1)}function at(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xt(t);if(!n){x(r("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(Fa(n.barcode)?.status==="صيانة"){x(r("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const o=V(n.barcode);if(!o){x(r("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const s={id:n.id,equipmentId:n.id,barcode:o,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:je(n)},{start:i,end:l}=Ue();if(!i||!l){x(r("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Be().some(d=>V(d.barcode)===o)){x(r("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(qe(o,i,l)){x(r("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}if(we(o)){x(r("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}Rt(s),Ee(),F(),e.value=""}function Oa(){Se();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),at(e))});const t=()=>{Kt(e.value,"equipment-description-options")&&at(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ee(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Be(),a=r("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),o=r("reservations.create.summary.currency","ريال"),s=r("reservations.create.equipment.imageAlt","صورة");if(n.length===0){t.innerHTML=`<tr><td colspan="5">${a}</td></tr>`;return}t.innerHTML=n.map((i,l)=>{const c=je(i),p=`${b(String(i.price??0))} ${o}`,d=c?`<img src="${c}" alt="${s}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${i.barcode||"-"}</td>
          <td>${i.desc}</td>
          <td>${p}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${l}">🗑️</button></td>
        </tr>
      `}).join("")}function F(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(b(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,o=document.getElementById("res-tax"),s=a?!1:o?.checked||!1,i=document.getElementById("res-payment-status")?.value||"unpaid",{start:l,end:c}=Ue(),p=_a(),d=document.getElementById("res-payment-status");ge(d,i),qa({selectedItems:Be(),discount:t,discountType:n,applyTax:s,paidStatus:i,start:l,end:c,companySharePercent:p})}function Ua(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",s=>{s.target.value=b(s.target.value),F()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",F),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",F),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",F),a.dataset.listenerAttached="true");const o=document.getElementById("res-payment-status");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{ge(o),F()}),o.dataset.listenerAttached="true"),ge(o)}function Va(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const o=e.value?.trim();if(!o){F();return}const s=t.dataset.syncedWithStart;(!t.value?.trim()||s!=="false")&&(n=!0,t.value=o,t.dataset.syncedWithStart="true",t.dataset.syncedValue=o,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),F()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Tt(){const{input:e,hidden:t}=dt(),{input:n,hidden:a}=ut(),{customers:o}=Q();let s=t?.value?String(t.value):"";if(!s&&e?.value){const I=tt(e.value,{allowPartial:!0});I&&(s=String(I.id),t&&(t.value=s),e.value=I.label,e.dataset.selectedId=s)}const i=o.find(I=>String(I.id)===s);if(!i){x(r("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const l=i.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const I=nt(n.value,{allowPartial:!0});I&&(c=String(I.id),a&&(a.value=c),n.value=I.label,n.dataset.selectedId=c)}const p=document.getElementById("res-start").value,d=document.getElementById("res-end").value,v=document.getElementById("res-start-time")?.value||"00:00",g=document.getElementById("res-end-time")?.value||"00:00";if(!p||!d){x(r("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const u=`${p}T${v}`,S=`${d}T${g}`,h=new Date(u),w=new Date(S);if(Number.isNaN(h.getTime())||Number.isNaN(w.getTime())||h>=w){x(r("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const f=Ea(),m=Be();if(m.length===0&&f.length===0){x(r("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const E=document.getElementById("res-notes")?.value||"",C=parseFloat(b(document.getElementById("res-discount")?.value))||0,$=document.getElementById("res-discount-type")?.value||"percent",N=document.getElementById("res-payment-status")?.value||"unpaid",y=c?pt(c):null,D=Ha(y);if(c&&!y){x(r("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const I of m)if(we(I.barcode)){x(r("reservations.toast.cannotCreateEquipmentMaintenance","⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة"));return}for(const I of m){const z=V(I.barcode);if(qe(z,u,S)){x(r("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const I of f)if(Pt(I,u,S)){x(r("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const L=document.getElementById("res-tax"),R=!!c?!1:L?.checked||!1,T=Mt(m,C,$,R,f,{start:u,end:S}),W=ha(),H=Ft({reservationCode:W,customerId:l,start:u,end:S,status:D?"confirmed":"pending",title:null,location:null,notes:E,projectId:c||null,totalAmount:T,discount:C,discountType:$,applyTax:R,paidStatus:N,confirmed:D,items:m.map(I=>({...I,equipmentId:I.equipmentId??I.id})),technicians:f});try{const I=await xa(H);Ca(),Se(),Oe(),Qa(),x(r("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ze=="function"&&Ze({type:"created",reservation:I})}catch(I){console.error("❌ [reservations/createForm] Failed to create reservation",I);const z=_t(I)?I.message:r("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");x(z,"error")}}function Qa(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),se({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const o=document.getElementById("res-project"),s=document.getElementById("res-project-input");o&&(o.value=""),s&&(s.value="",s.dataset.selectedId=""),Ne({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const l=document.getElementById("res-payment-status");l&&(l.value="unpaid",ge(l,"unpaid")),Ia(),ka([]),Ee(),ye(),F()}function Wa(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('button[data-action="remove-item"]');if(!n)return;const a=Number(n.dataset.index);Sa(a),Ee(),F()}),e.dataset.listenerAttached="true")}function Ya(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),Xe(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const a=e.value;if(!a?.trim())return;const{start:o,end:s}=Ue();!o||!s||(t=setTimeout(()=>{Xe(a,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>Xe(e.value,e)),e.dataset.listenerAttached="true"}function Ga(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Tt()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Tt()}),t.dataset.listenerAttached="true")}function Ws({onAfterSubmit:e}={}){Ze=typeof e=="function"?e:null;const{customers:t,projects:n}=Q();wa(t||[]),se(),vt(),Wt(n||[]),Gt({projectsList:n}),ft(),Se(),Oa(),Va(),Ua(),Wa(),Ya(),Ga(),za(),F(),Ee()}function Zt(){Se(),Gt(),se(),vt(),ft(),Ee(),F()}if(typeof document<"u"){const e=()=>{se(),Ne({projectsList:mt()}),vt(),ft(),F()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function Jt(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:de(t),endDate:de(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),o=a===0?6:a-1;n.setDate(n.getDate()-o);const s=new Date(n);return s.setDate(n.getDate()+6),{startDate:de(n),endDate:de(s)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:de(n),endDate:de(a)}}return e==="upcoming"?{startDate:de(t),endDate:""}:{startDate:"",endDate:""}}function Xa(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),o=document.getElementById("reservation-status-filter");let s=b(t?.value||"").trim(),i=b(n?.value||"").trim(),l=a?.value||"";if(new Set(["","today","week","month"]).has(l)||(l="",a&&(a.value=""),Fe(t),Fe(n),s="",i=""),!s&&!i&&l){const p=Jt(l);s=p.startDate,i=p.endDate}return{searchTerm:G(e?.value||""),startDate:s,endDate:i,status:o?.value||"",quickRange:l}}function Ys(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=b(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const o=document.getElementById("filter-end-date");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),o.dataset.listenerAttached="true");const s=document.getElementById("reservation-date-range");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Ka(s.value),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const l=document.getElementById("clear-filters");l&&!l.dataset.listenerAttached&&(l.addEventListener("click",()=>{n&&(n.value=""),Fe(a),Fe(o),s&&(s.value=""),i&&(i.value=""),t()}),l.dataset.listenerAttached="true")}function Ka(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:o}=Jt(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?o?n._flatpickr.setDate(o,!1,"Y-m-d"):n._flatpickr.clear():n.value=o}function de(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Fe(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Za({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:o}){const s=e.map((f,m)=>({reservation:f,index:m})),i=t.searchTerm||"",l=t.searchReservationId||"",c=t.searchCustomerName||"",p=t.startDate||"",d=t.endDate||"",v=t.status||"",g=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,u=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,S=p?new Date(`${p}T00:00:00`):null,h=d?new Date(`${d}T23:59:59`):null,w=s.filter(({reservation:f})=>{const m=n.get(String(f.customerId)),E=o?.get?.(String(f.projectId)),C=f.start?new Date(f.start):null,$=Ae(f),{effectiveConfirmed:N}=ue(f,E);if(g!=null&&String(f.customerId)!==String(g)||u!=null&&!(Array.isArray(f.technicians)?f.technicians.map(R=>String(R)):[]).includes(String(u))||v==="confirmed"&&!N||v==="pending"&&N||v==="completed"&&!$||S&&C&&C<S||h&&C&&C>h||l&&!G([f.reservationId,f.id].filter(Boolean).map(String).join(" ")).includes(l)||c&&!G(m?.customerName||"").includes(c))return!1;if(!i)return!0;const y=f.items?.map?.(B=>`${B.barcode} ${B.desc}`).join(" ")||"",D=(f.technicians||[]).map(B=>a.get(String(B))?.name).filter(Boolean).join(" ");return G([f.reservationId,m?.customerName,f.notes,y,D,E?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((f,m)=>{const E=Ae(f.reservation),C=Ae(m.reservation);if(E!==C)return E?1:-1;const $=f.reservation.start?new Date(f.reservation.start).getTime():0;return(m.reservation.start?new Date(m.reservation.start).getTime():0)-$}),w}function Ja({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const o=r("reservations.create.summary.currency","ريال"),s=r("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=r("reservations.list.unknownCustomer","غير معروف"),l=r("reservations.list.noNotes","لا توجد ملاحظات"),c=r("reservations.list.itemsCountShort","{count} عنصر"),p=r("reservations.list.crew.separator","، "),d=r("reservations.list.status.confirmed","✅ مؤكد"),v=r("reservations.list.status.pending","⏳ غير مؤكد"),g=r("reservations.list.payment.paid","💳 مدفوع"),u=r("reservations.list.payment.unpaid","💳 غير مدفوع"),S=r("reservations.list.actions.confirm","✔️ تأكيد"),h=r("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=r("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),f={client:r("reservations.list.labels.client","👤 العميل"),project:r("reservations.list.labels.project","📁 المشروع"),start:r("reservations.list.labels.start","🗓️ بداية الحجز"),end:r("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:r("reservations.list.labels.cost","💵 التكلفة"),equipment:r("reservations.list.labels.equipment","📦 المعدات"),crew:r("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:m,index:E})=>{const C=t.get(String(m.customerId)),$=m.projectId?a?.get?.(String(m.projectId)):null,N=Ae(m),y=m.paid===!0||m.paid==="paid",{effectiveConfirmed:D,projectLinked:L}=ue(m,$),B=D?"status-confirmed":"status-pending",R=y?"status-paid":"status-unpaid";let T=`<span class="reservation-chip status-chip ${B}">${D?d:v}</span>`,W=`<span class="reservation-chip status-chip ${R}">${y?g:u}</span>`,H=y?" tile-paid":" tile-unpaid";N&&(H+=" tile-completed");let I="";N&&(T=`<span class="reservation-chip status-chip status-completed">${d}</span>`,W=`<span class="reservation-chip status-chip status-completed">${y?g:u}</span>`,I=` data-completed-label="${r("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const z=!L&&!D?`<button class="tile-confirm" data-reservation-index="${E}" data-action="confirm">${S}</button>`:"",re=z?`<div class="tile-actions">${z}</div>`:"",me=m.items?.length||0,_=(m.technicians||[]).map(O=>n.get(String(O))).filter(Boolean),J=_.map(O=>O.name).join(p)||"—",j=b(String(m.reservationId??"")),K=m.start?b(he(m.start)):"-",Ce=m.end?b(he(m.end)):"-",Ie=b(String(m.cost??0)),M=b(String(me)),ee=m.notes?b(m.notes):l,oe=c.replace("{count}",M),ie=m.applyTax?`<small>${s}</small>`:"";let ae=h;return m.projectId&&(ae=$?.title?b($.title):w),`
      <div class="${z?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${H}"${I} data-reservation-index="${E}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${j}</div>
          <div class="tile-badges">
            ${T}
            ${W}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${f.client}</span>
            <span class="tile-value">${C?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.project}</span>
            <span class="tile-value">${ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.start}</span>
            <span class="tile-value tile-inline">${K}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.end}</span>
            <span class="tile-value tile-inline">${Ce}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.cost}</span>
            <span class="tile-value">${Ie} ${o} ${ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.equipment}</span>
            <span class="tile-value">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.crew}</span>
            <span class="tile-value">${_.length?J:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ee}</span>
          </div>
        </div>
        ${re}
      </div>
    `}).join("")}function Ke(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function es(e,t,n=[],a,o=null){const{projectLinked:s,effectiveConfirmed:i}=ue(e,o),l=e.paid===!0||e.paid==="paid",c=Ae(e),p=e.items||[],{technicians:d=[]}=Q(),v=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(d)?d:[]),g=new Map;v.forEach(k=>{if(!k||k.id==null)return;const P=String(k.id),Y=g.get(P)||{};g.set(P,{...Y,...k})});const u=(e.technicians||[]).map(k=>g.get(String(k))).filter(Boolean),S=jt(),h=zt(e.start,e.end),w=(k={})=>{const P=[k.dailyWage,k.daily_rate,k.dailyRate,k.wage,k.rate];for(const Y of P){if(Y==null)continue;const ve=parseFloat(b(String(Y)));if(Number.isFinite(ve))return ve}return 0},m=p.reduce((k,P)=>k+(P.qty||1)*(P.price||0),0)*h,C=u.reduce((k,P)=>k+w(P),0)*h,$=m+C,N=parseFloat(e.discount)||0,y=e.discountType==="amount"?N:$*(N/100),D=Math.max(0,$-y),L=s?!1:e.applyTax,B=L?D*.15:0,R=Number(e.cost),T=Number.isFinite(R),W=D+B,H=s?Math.round(W):T?R:Math.round(W),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,z=I!=null?parseFloat(b(String(I))):NaN,_=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(z)&&z>0)&&Number.isFinite(z)?z:0,J=_>0?Math.max(0,(Number.isFinite(H)?H:0)*(_/100)):0,j=b(String(e.reservationId??e.id??"")),K=e.start?b(he(e.start)):"-",Ce=e.end?b(he(e.end)):"-",Ie=b(String(u.length)),M=b(m.toFixed(2)),ee=b(y.toFixed(2)),oe=b(D.toFixed(2)),ie=b(B.toFixed(2)),ae=b((H??0).toFixed(2)),pe=b(String(h)),O=r("reservations.create.summary.currency","ريال"),yt=r("reservations.details.labels.discount","الخصم"),bn=r("reservations.details.labels.tax","الضريبة (15%)"),hn=r("reservations.details.labels.crewTotal","إجمالي الفريق"),gn=r("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),yn=r("reservations.details.labels.duration","عدد الأيام"),qn=r("reservations.details.labels.companyShare","🏦 نسبة الشركة"),fe={index:"#",code:r("reservations.details.table.headers.code","الكود"),description:r("reservations.details.table.headers.description","الوصف"),quantity:r("reservations.details.table.headers.quantity","الكمية"),price:r("reservations.details.table.headers.price","السعر"),image:r("reservations.details.table.headers.image","الصورة")},wn=r("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Sn=r("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),En=r("reservations.details.technicians.roleUnknown","غير محدد"),xn=r("reservations.details.technicians.phoneUnknown","غير متوفر"),Cn=r("reservations.details.technicians.wage","{amount} {currency} / اليوم"),In=r("reservations.list.status.confirmed","✅ مؤكد"),kn=r("reservations.list.status.pending","⏳ غير مؤكد"),Tn=r("reservations.list.payment.paid","💳 مدفوع"),An=r("reservations.list.payment.unpaid","💳 غير مدفوع"),$n=r("reservations.list.status.completed","📁 منتهي"),Ln=r("reservations.details.labels.id","🆔 رقم الحجز"),Dn=r("reservations.details.section.bookingInfo","بيانات الحجز"),Bn=r("reservations.details.section.paymentSummary","ملخص الدفع"),jn=r("reservations.details.labels.finalTotal","المجموع النهائي"),Nn=r("reservations.details.section.crew","😎 الفريق الفني"),Rn=r("reservations.details.crew.count","{count} عضو"),Pn=r("reservations.details.section.items","📦 المعدات المرتبطة"),Mn=r("reservations.details.items.count","{count} عنصر"),Fn=r("reservations.details.actions.edit","✏️ تعديل"),_n=r("reservations.details.actions.delete","🗑️ حذف"),Hn=r("reservations.details.labels.customer","العميل"),zn=r("reservations.details.labels.contact","رقم التواصل"),On=r("reservations.details.labels.project","📁 المشروع المرتبط");r("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Un=r("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Vn=r("reservations.details.actions.openProject","📁 فتح المشروع"),Qn=r("reservations.details.labels.start","بداية الحجز"),Wn=r("reservations.details.labels.end","نهاية الحجز"),Yn=r("reservations.details.labels.notes","ملاحظات"),Gn=r("reservations.list.noNotes","لا توجد ملاحظات"),Xn=r("reservations.details.labels.itemsCount","عدد المعدات"),Kn=r("reservations.details.labels.itemsTotal","إجمالي المعدات"),Zn=r("reservations.details.labels.paymentStatus","حالة الدفع"),Jn=r("reservations.list.unknownCustomer","غير معروف"),qt=l?Tn:An,wt=p.length,ea=b(String(wt)),St=Mn.replace("{count}",ea),ta=Rn.replace("{count}",Ie),na=e.notes?b(e.notes):Gn,aa=b(C.toFixed(2)),sa=b(String(_)),ra=b(J.toFixed(2)),oa=`${sa}% (${ra} ${O})`,le=[{icon:"💳",label:Zn,value:qt},{icon:"📦",label:Xn,value:St},{icon:"⏱️",label:yn,value:pe},{icon:"💼",label:Kn,value:`${M} ${O}`}];le.push({icon:"😎",label:hn,value:`${aa} ${O}`}),y>0&&le.push({icon:"💸",label:yt,value:`${ee} ${O}`}),le.push({icon:"📊",label:gn,value:`${oe} ${O}`}),L&&B>0&&le.push({icon:"🧾",label:bn,value:`${ie} ${O}`}),_>0&&le.push({icon:"🏦",label:qn,value:oa}),le.push({icon:"💰",label:jn,value:`${ae} ${O}`});const ia=le.map(({icon:k,label:P,value:Y})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${k} ${P}</span>
      <span class="summary-details-value">${Y}</span>
    </div>
  `).join(""),Et=[{text:i?In:kn,className:i?"status-confirmed":"status-pending"},{text:qt,className:l?"status-paid":"status-unpaid"}];c&&Et.push({text:$n,className:"status-completed"});const la=Et.map(({text:k,className:P})=>`<span class="status-chip ${P}">${k}</span>`).join(""),ke=(k,P,Y)=>`
    <div class="res-info-row">
      <span class="label">${k} ${P}</span>
      <span class="value">${Y}</span>
    </div>
  `;let Ye="";if(e.projectId){let k=Ke(Un);if(o){const P=o.title||r("projects.fallback.untitled","مشروع بدون اسم");k=`${Ke(P)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${o.id}">${Ke(Vn)}</button>`}Ye=`
      <div class="res-info-row">
        <span class="label">📁 ${On}</span>
        <span class="value">${k}</span>
      </div>
    `}const ce=[];ce.push(ke("👤",Hn,t?.customerName||Jn)),ce.push(ke("📞",zn,t?.phone||"—")),ce.push(ke("🗓️",Qn,K)),ce.push(ke("🗓️",Wn,Ce)),ce.push(ke("📝",Yn,na)),Ye&&ce.push(Ye);const ca=ce.join(""),da=wt?p.map((k,P)=>{const Y=je(k),ve=b(String(k.barcode||"-")),Ge=b(String(k.qty||1)),Re=b(String(k.price||0)),fa=b(String(P+1)),va=Y?`<img src="${Y}" alt="${k.desc||""}" class="reservation-modal-item-thumb">`:"-";return`
          <tr>
            <td>${fa}</td>
            <td>${ve}</td>
            <td>${k.desc||"-"}</td>
            <td>${Ge}</td>
            <td>${Re} ${O}</td>
            <td>${va}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${wn}</td></tr>`,ua=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${fe.index}</th>
            <th>${fe.code}</th>
            <th>${fe.description}</th>
            <th>${fe.quantity}</th>
            <th>${fe.price}</th>
            <th>${fe.image}</th>
          </tr>
        </thead>
        <tbody>${da}</tbody>
      </table>
    </div>
  `,ma=u.map((k,P)=>{const Y=b(String(P+1)),ve=k.role||En,Ge=k.phone||xn,Re=k.wage?Cn.replace("{amount}",b(String(k.wage))).replace("{currency}",O):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${Y}</span>
          <span class="technician-name">${k.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${ve}</div>
          <div>📞 ${Ge}</div>
          ${Re?`<div>💰 ${Re}</div>`:""}
        </div>
      </div>
    `}).join(""),pa=u.length?`<div class="reservation-technicians-grid">${ma}</div>`:`<ul class="reservation-modal-technicians"><li>${Sn}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Ln}</span>
          <strong>${j}</strong>
        </div>
        <div class="status-chips">
          ${la}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Dn}</h6>
          ${ca}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Bn}</h6>
            <div class="summary-details">
              ${ia}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Nn}</span>
          <span class="count">${ta}</span>
        </div>
        ${pa}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Pn}</span>
          <span class="count">${St}</span>
        </div>
        ${ua}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${r("reservations.details.actions.exportPdf","📄 تصدير PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Fn}</button>
        ${S?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${_n}</button>`:""}
      </div>
    </div>
  `}const ts=`@page {
  margin: 0;
  size: A4;
}

html,
body,
.page,
.quote-wrapper {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap');

#quotation-pdf-root {
  width: 210mm;
  min-width: 210mm;
  max-width: 210mm;
  min-height: 100%;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
  color: #000000 !important;
  /* background: #ffffff !important; */
  direction: rtl;
  text-align: right;
  margin: 0 auto;
  padding: 0;
}

#quotation-pdf-root * {
  box-sizing: border-box;
  color: #000000 !important;
}

.quote-preview-pages {
  width: 210mm;
  max-width: 210mm;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}

[data-quote-source] {
  display: none;
}

.quote-page {
  position: relative;
  width: 210mm;
  max-width: 210mm;
  min-width: 210mm;
  height: 297mm;
  min-height: 297mm;
  max-height: 297mm;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 4mm 14mm 12mm;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  page-break-after: always;
  break-after: page;
  page-break-inside: avoid;
  break-inside: avoid;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
}

.quote-page:last-of-type {
  page-break-after: auto;
  break-after: auto;
}

.quote-page--primary {
  padding-top: 6mm;
}

.quote-page--continuation {
  padding-top: 12mm;
}

.quote-page + .quote-page::before {
  content: '';
  position: absolute;
  top: -18px;
  right: 16px;
  width: calc(100% - 32px);
  height: 1px;
  background: rgba(148, 163, 184, 0.5);
}

.quote-body {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
}

.quote-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  margin: 0 auto 12px;
  padding: 0;
}

.quote-header__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  text-align: left;
  font-size: 0.72rem;
  color: #475569;
  justify-self: start;
}

.quote-header__meta-item {
  display: flex;
  gap: 4px;
  align-items: baseline;
}

.quote-header__meta-item span {
  font-weight: 600;
  color: #475569;
}

.quote-header__meta-item strong {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
}

.quote-header__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  align-items: center;
  justify-self: center;
}

.quote-header__title h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.quote-company-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.quote-company-cr {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}

.quote-header__logo {
  justify-self: end;
  align-self: flex-start;
}

.quote-header__logo .quote-logo {
  width: 90px;
  height: 90px;
}

.quote-logo {
  display: block;
  object-fit: contain;
}

.quote-section h3 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
}

.quote-section__title {
  margin: 0 0 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: right;
  color: #0f172a;
}

.quote-section--plain {
  padding-bottom: 4px;
  text-align: right;
}

.quote-section-row {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: stretch;
}

.quote-section-row .quote-section {
  flex: 1 1 0;
  min-width: 0;
}

.quote-section--financial {
  max-width: 60%;
  margin: 0 auto;
}

.quote-section--customer {
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  max-width: fit-content;
}

.quote-section--customer .info-plain,
.quote-section--customer .info-plain__item {
  align-items: flex-start;
  text-align: left;
  justify-content: flex-start;
}

.quote-section--reservation {
  text-align: left;
  margin-right: auto;
  max-width: 46%;
}


.quote-section,
.info-block,
.payment-block,
.totals-block,
.quote-notes,
.quote-approval-note,
.quote-footer,
.quote-placeholder {
  width: 100%;
  margin: 0;
  padding-top: 0;
  page-break-inside: avoid;
  break-inside: avoid;
}

.quote-section {
  margin-bottom: 12px;
}

.totals-block h3,
.payment-block h3 {
  margin: 0;
  text-align: center;
}

.quote-placeholder {
  padding: 18px 16px;
  border: 1px dashed rgba(148, 163, 184, 0.4);
  border-radius: 14px;
  font-size: 0.9rem;
  background: #ffffff;
  text-align: right;
}

.info-block,
.payment-block,
.totals-block {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  direction: ltr;
}

.payment-block {
  align-items: flex-end;
  text-align: right;
}

.totals-block {
  font-size: 0.6rem;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

.totals-block h3 {
  font-size: 0.68rem;
  letter-spacing: 0.01em;
}

.info-plain {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  text-align: left;
  font-size: 0.68rem;
  color: #0f172a;
}

.info-plain__item {
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  align-items: baseline;
}

.info-plain--right {
  align-items: flex-end;
  text-align: right;
}

.info-plain--right .info-plain__item {
  justify-content: flex-end;
}

.info-plain__label {
  font-weight: 600;
  color: #475569;
}

.info-plain__value {
  font-weight: 600;
  font-size: 0.8rem;
  color: #0f172a;
}

.info-plain--dense {
  gap: 4px;
  font-size: 0.7rem;
}

.info-plain--dense .info-plain__value {
  font-size: 0.76rem;
}

.info-plain__slash {
  color: #94a3b8;
  font-weight: 400;
}

.info-block h4,
.payment-block h4,
.totals-block h4 {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}

.info-block__rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  text-align: left;
}

.info-row span {
  font-weight: 600;
  font-size: 13px;
}

.info-row strong {
  font-weight: 700;
  font-size: 13.5px;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  text-align: left;
  width: 100%;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
}

.info-item span {
  font-weight: 600;
  font-size: 13px;
}

.info-item strong {
  font-weight: 700;
  font-size: 13.5px;
}

.totals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 6px;
  width: 100%;
  justify-items: center;
}

.totals-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  text-align: center;
  width: 100%;
  max-width: 220px;
}

.totals-item span {
  font-weight: 600;
  display: inline-block;
}

.totals-item span:last-child {
  font-weight: 700;
}

.totals-item.is-final {
  background: rgba(59, 91, 220, 0.12);
  border-color: rgba(59, 91, 220, 0.35);
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background-color: #ffffff !important;
  direction: ltr;
  text-align: center;
  page-break-inside: auto;
}

.quote-table thead,
.quote-table tbody,
.quote-table tr,
.quote-table th,
.quote-table td {
  background-color: #ffffff !important;
  color: #000000 !important;
  direction: ltr;
  text-align: center;
}

.quote-table th {
  padding: 9px 8px;
  font-weight: 700;
}

.quote-table th,
.quote-table td {
  border: 1px solid rgba(148, 163, 184, 0.5);
  text-align: center;
}

.quote-section--table {
  display: block;
  clear: both;
  overflow: visible;
  break-inside: auto;
  page-break-inside: auto;
  page-break-after: auto;
  padding-top: 4mm;
}

.quote-section--table-fragment {
  padding-top: 4mm;
}

.quote-section--table-fragment--continued {
  padding-top: 2mm;
  margin-top: 6px;
}

.quote-section--table-fragment--continued h3 {
  margin-top: 0;
}

.quote-section--table-fragment--overflow {
  overflow: visible;
}

.quote-page .quote-section--table:first-of-type {
  padding-top: 0;
}
.quote-page .quote-section--table.quote-section--table-fragment--continued:first-of-type {
  padding-top: 2mm;
}

.quote-table {
  page-break-inside: auto;
  break-inside: auto;
  overflow: visible;
  margin-top: 2mm;
}

.quote-table thead {
  display: table-header-group;
}

.quote-table tbody {
  display: table-row-group;
}

.quote-table tr {
  page-break-inside: avoid;
  page-break-after: auto;
}

.quote-table td {
  padding: 9px 8px;
}

.quote-table .empty {
  padding: 14px;
  font-weight: 500;
  color: #000000 !important;
}

.quote-notes {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.38);
  border-radius: 12px;
  padding: 10px 12px;
  min-height: 0;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-wrap;
  text-align: right;
}

.quote-approval-note {
  margin-top: 12px;
  font-size: 12px;
  background: rgba(234, 179, 8, 0.15);
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(234, 179, 8, 0.3);
  text-align: right;
}

.quote-footer {
  margin-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
  padding-top: 10px;
  text-align: right;
}

.quote-footer h4 {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
}

.quote-footer ul {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  direction: rtl;
  text-align: right;
  padding-inline-start: 0;
  padding-inline-end: 18px;
}

@media print {
  #quotation-pdf-root {
    width: 210mm;
    min-width: 210mm;
    max-width: 210mm;
    min-height: auto;
    padding: 0;
    margin: 0 auto;
  }
}
`,en="reservations.quote.sequence",te={logoUrl:"https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},ns=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],tn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],as="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ss=ts.trim(),rs=/color\([^)]*\)/gi,_e=/(color\(|color-mix\()/i,os=document.createElement("canvas"),Pe=os.getContext("2d"),nn=96,an=25.4,is=210,ls=297,cs=Math.round(is/an*nn),ds=Math.round(ls/an*nn),us=2;let U=null,A=null,be=1;function Z(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function ms(e,t="لا توجد بيانات للعرض."){const n=q(r(e,t));return Z(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function At(e,t){return Array.isArray(e)&&e.length?e:[ms(t)]}function st(e,t="#000"){if(!Pe||!e)return t;try{return Pe.fillStyle="#000",Pe.fillStyle=e,Pe.fillStyle||t}catch{return t}}function ps(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const o=st(n)||"#000";try{return t(o)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function $e(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(rs,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}function fs(e){if(!e)return;$e(e),$e(e?.documentElement),$e(e?.body);const t=e?.defaultView||window;bt(e?.documentElement||e,t)}const vs=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function bt(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const o=t.getComputedStyle(a);if(!o)return;vs.forEach(i=>{const l=o[i];if(l&&_e.test(l)){const c=i.replace(/[A-Z]/g,v=>`-${v.toLowerCase()}`),p=i==="backgroundColor"?"#ffffff":o.color||"#000000",d=st(l,p);a.style.setProperty(c,d,"important")}});const s=o.backgroundImage;if(s&&_e.test(s)){const i=st(o.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function rt(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(s=>{const i=a[s];if(i&&_e.test(i)){const l=s.replace(/[A-Z]/g,p=>`-${p.toLowerCase()}`),c=s==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(l,c,"important")}});const o=a.backgroundImage;o&&_e.test(o)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function bs(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",s=>n(s)),a.readyState==="complete"&&t();return}const o=document.createElement("script");o.src=e,o.async=!0,o.onload=()=>t(),o.onerror=s=>n(s),document.head.appendChild(o)})}async function hs(){window.html2pdf||await bs(as),ps()}function q(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gs(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ys(){const e=window.localStorage?.getItem?.(en),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function qs(){const t=ys()+1;return{sequence:t,quoteNumber:gs(t)}}function ws(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(en,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Ss(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Es(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(b(String(n)));if(Number.isFinite(a))return a}return 0}function xs(e){const t=Oe()||[],{technicians:n=[]}=Q(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),o=new Map;return a.forEach(s=>{if(!s||s.id==null)return;const i=String(s.id),l=o.get(i)||{};o.set(i,{...l,...s})}),(e.technicians||[]).map(s=>o.get(String(s))).filter(Boolean)}function Cs(e,t,n){const{projectLinked:a}=ue(e,n),o=zt(e.start,e.end),l=(Array.isArray(e.items)?e.items:[]).reduce((N,y)=>N+(Number(y?.qty)||1)*(Number(y?.price)||0),0)*o,p=t.reduce((N,y)=>N+Es(y),0)*o,d=l+p,v=parseFloat(e.discount)||0,g=e.discountType==="amount"?v:d*(v/100),u=Math.max(0,d-g),h=(a?!1:e.applyTax)?u*.15:0,w=Number(e.cost),f=Number.isFinite(w),m=u+h,E=a?Math.round(m):f?w:Math.round(m),C={equipmentTotal:l,crewTotal:p,discountAmount:g,taxAmount:h,finalTotal:E??0},$={equipmentTotal:b(l.toFixed(2)),crewTotal:b(p.toFixed(2)),discountAmount:b(g.toFixed(2)),taxAmount:b(h.toFixed(2)),finalTotal:b((E??0).toFixed(2))};return{totals:C,totalsDisplay:$,rentalDays:o}}function sn({reservation:e,customer:t,project:n,technicians:a,totalsDisplay:o,rentalDays:s,currencyLabel:i,sections:l,quoteNumber:c,quoteDate:p}){const d=b(String(e?.reservationId??e?.id??"")),v=e.start?b(he(e.start)):"-",g=e.end?b(he(e.end)):"-",u=t?.customerName||t?.full_name||t?.name||"-",S=t?.phone||"-",h=t?.email||"-",w=t?.company||t?.company_name||"-",f=b(S),m=n?.title||n?.name||r("reservations.details.project.none","غير مرتبط بمشروع"),E=n?.code||n?.projectCode||"",C=b(String(s)),$=e?.notes||"",N=a.length?a.map((M,ee)=>{const oe=b(String(ee+1)),ie=q(M?.name||M?.full_name||"-"),ae=q(M?.role||r("reservations.details.technicians.roleUnknown","غير محدد")),pe=q(M?.phone||r("reservations.details.technicians.phoneUnknown","غير متوفر"));return`<tr>
          <td>${oe}</td>
          <td>${ie}</td>
          <td>${ae}</td>
          <td>${pe}</td>
        </tr>`}).join(""):`<tr><td colspan="4" class="empty">${q(r("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,y=Array.isArray(e.items)&&e.items.length?e.items.map((M,ee)=>{const oe=b(String(ee+1)),ie=q(M?.barcode||"-"),ae=q(M?.desc||M?.description||"-"),pe=b(String(M?.qty||1)),O=b(Number(M?.price||0).toFixed(2));return`<tr>
          <td>${oe}</td>
          <td>${ie}</td>
          <td>${ae}</td>
          <td>${pe}</td>
          <td>${O}</td>
        </tr>`}).join(""):`<tr>
        <td colspan="5" class="empty">${q(r("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td>
      </tr>`,D=M=>l?.has?.(M),L=(M,ee)=>`<div class="info-plain__item">${q(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${q(ee)}</strong></div>`,B=D("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${q(r("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        <div class="info-plain">
          ${L(r("reservations.details.labels.customer","العميل"),u)}
          ${L(r("reservations.details.labels.company","الشركة"),w)}
          ${L(r("reservations.details.labels.phone","الهاتف"),f)}
          ${L(r("reservations.details.labels.email","البريد"),h)}
        </div>
      </section>`:"",R=D("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${q(r("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        <div class="info-plain">
          ${L(r("reservations.details.labels.reservationId","رقم الحجز"),d||"-")}
          ${L(r("reservations.details.labels.start","بداية الحجز"),v)}
          ${L(r("reservations.details.labels.end","نهاية الحجز"),g)}
          ${L(r("reservations.details.labels.duration","عدد الأيام"),C)}
        </div>
      </section>`:"",T=D("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${q(r("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        <div class="info-plain">
          ${L(r("reservations.details.labels.project","المشروع"),m)}
          ${E?L(r("reservations.details.labels.code","الرمز"),E):""}
        </div>
      </section>`:"",W=D("financialSummary")?`<section class="quote-section quote-section--financial">
        <div class="totals-block">
          <h3>${q(r("reservations.details.labels.summary","الملخص المالي"))}</h3>
          <div class="totals-list">
            <div class="totals-item"><span>${q(r("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span><span>${o.equipmentTotal} ${i}</span></div>
            <div class="totals-item"><span>${q(r("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span><span>${o.crewTotal} ${i}</span></div>
            <div class="totals-item"><span>${q(r("reservations.details.labels.discount","الخصم"))}</span><span>${o.discountAmount} ${i}</span></div>
            <div class="totals-item"><span>${q(r("reservations.details.labels.tax","الضريبة"))}</span><span>${o.taxAmount} ${i}</span></div>
            <div class="totals-item is-final"><span>${q(r("reservations.details.labels.total","الإجمالي النهائي"))}</span><span>${o.finalTotal} ${i}</span></div>
          </div>
        </div>
      </section>`:"",H=D("items")?`<section class="quote-section quote-section--table">
        <h3>${q(r("reservations.details.items.title","المعدات"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${q(r("reservations.details.table.headers.code","الكود"))}</th>
              <th>${q(r("reservations.details.table.headers.description","الوصف"))}</th>
              <th>${q(r("reservations.details.table.headers.quantity","الكمية"))}</th>
              <th>${q(r("reservations.details.table.headers.price","السعر"))}</th>
            </tr>
          </thead>
          <tbody>${y}</tbody>
        </table>
      </section>`:"",I=D("crew")?`<section class="quote-section quote-section--table">
        <h3>${q(r("reservations.details.technicians.title","طاقم العمل"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${q(r("reservations.details.technicians.name","الاسم"))}</th>
              <th>${q(r("reservations.details.technicians.role","الدور"))}</th>
              <th>${q(r("reservations.details.technicians.phone","الهاتف"))}</th>
            </tr>
          </thead>
          <tbody>${N}</tbody>
        </table>
      </section>`:"",z=D("notes")?`<section class="quote-section">
        <h3>${q(r("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${q($||r("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",re=`<section class="quote-section">
      <div class="payment-block">
        <h3>${q(r("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="info-plain info-plain--dense info-plain--right">
          ${L(r("reservations.quote.labels.beneficiary","اسم المستفيد"),te.beneficiaryName)}
          ${L(r("reservations.quote.labels.bank","اسم البنك"),te.bankName)}
          ${L(r("reservations.quote.labels.account","رقم الحساب"),b(te.accountNumber))}
          ${L(r("reservations.quote.labels.iban","رقم الآيبان"),b(te.iban))}
        </div>
      </div>
      <p class="quote-approval-note">${q(te.approvalNote)}</p>
    </section>`,me=`<footer class="quote-footer">
        <h4>${q(r("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${ns.map(M=>`<li>${q(M)}</li>`).join("")}</ul>
      </footer>`,_=[];B&&R?_.push(Z(`<div class="quote-section-row">${R}${B}</div>`,{blockType:"group"})):(R&&_.push(Z(R)),B&&_.push(Z(B))),T&&_.push(Z(T));const J=[];H&&J.push(Z(H,{blockType:"table",extraAttributes:'data-table-id="items"'})),I&&J.push(Z(I,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const j=[];z&&j.push(Z(z)),W&&j.push(Z(W,{blockType:"summary"}));const K=[Z(re,{blockType:"payment"}),Z(me,{blockType:"footer"})],Ce=[...At(_,"reservations.quote.placeholder.page1"),...J,...At(j,"reservations.quote.placeholder.page2"),...K],Ie=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${q(te.logoUrl)}" alt="${q(te.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${q(r("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${q(te.companyName)}</p>
        <p class="quote-company-cr">${q(r("reservations.quote.labels.cr","السجل التجاري"))}: ${q(te.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${q(c)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${q(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ss}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ie}
          ${Ce.join("")}
        </div>
      </div>
    </div>
  `}function Is(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function $t(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),o=t.fonts?.ready?t.fonts.ready.catch(()=>{}):Promise.resolve();await Promise.allSettled([o,...a.map(s=>Is(s))]),await new Promise(s=>n.requestAnimationFrame(()=>s()))}async function rn(e){if(!e)return;const t=e.ownerDocument||document,n=e.querySelector("[data-quote-pages]"),a=e.querySelector("[data-quote-source]"),o=a?.querySelector("[data-quote-header-template]");if(!n||!a||!o)return;await $t(a),n.innerHTML="";const s=Array.from(a.querySelectorAll(":scope > [data-quote-block]"));let i=null,l=null;const c=()=>{const m=t.createElement("div"),E=n.childElementCount===0;if(m.className="quote-page",m.dataset.pageIndex=String(n.childElementCount),E){m.classList.add("quote-page--primary");const $=o.cloneNode(!0);$.removeAttribute("data-quote-header-template"),m.appendChild($)}else m.classList.add("quote-page--continuation");const C=t.createElement("main");C.className="quote-body",m.appendChild(C),n.appendChild(m),i=m,l=C},p=()=>{(!i||!l||!l.isConnected)&&c()},d=()=>{if(!i||!l||l.childElementCount>0)return;const m=i;i=null,l=null,m.parentNode&&m.parentNode.removeChild(m)},v=()=>{i=null,l=null},g=()=>i?i.scrollHeight-i.clientHeight>us:!1,u=(m,{allowOverflow:E=!1}={})=>(p(),l.appendChild(m),g()&&!E?(l.removeChild(m),d(),!1):!0),S=m=>{const E=m.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!u(E)&&(v(),!u(E)&&u(E,{allowOverflow:!0}))},h=m=>{const E=m.querySelector("table");if(!E){S(m);return}const C=m.querySelector("h3"),$=E.querySelector("thead"),N=Array.from(E.querySelectorAll("tbody tr"));if(!N.length){S(m);return}let y=null,D=0;const L=(R=!1)=>{const T=m.cloneNode(!1);T.removeAttribute("data-quote-block"),T.removeAttribute("data-block-type"),T.removeAttribute("data-table-id"),T.classList.add("quote-section--table-fragment"),R&&T.classList.add("quote-section--table-fragment--continued");const W=C?C.cloneNode(!0):null;W&&T.appendChild(W);const H=E.cloneNode(!1);H.classList.add("quote-table--fragment"),$&&H.appendChild($.cloneNode(!0));const I=t.createElement("tbody");return H.appendChild(I),T.appendChild(H),{section:T,body:I}},B=(R=!1)=>y||(y=L(R),u(y.section)||(v(),u(y.section)||u(y.section,{allowOverflow:!0})),y);N.forEach(R=>{B(D>0);const T=R.cloneNode(!0);if(y.body.appendChild(T),g()&&(y.body.removeChild(T),y.body.childElementCount||(l.removeChild(y.section),y=null,d()),v(),y=null,B(D>0),y.body.appendChild(T),g())){y.section.classList.add("quote-section--table-fragment--overflow"),D+=1;return}D+=1}),y=null};if(!s.length)return;s.forEach(m=>{m.getAttribute("data-block-type")==="table"?h(m):S(m)}),Array.from(n.children).forEach((m,E)=>{if(E===0)return;const C=m.querySelector(".quote-body");C&&(C.childElementCount>0||m.remove())});const f=n.lastElementChild;i=f||null,l=f?.querySelector(".quote-body")||null,await $t(n)}function on(){if(!A||!U)return;const{previewFrame:e}=U;if(!e)return;const t=sn({reservation:A.reservation,customer:A.customer,project:A.project,technicians:A.technicians,totalsDisplay:A.totalsDisplay,rentalDays:A.rentalDays,currencyLabel:A.currencyLabel,sections:A.sections,quoteNumber:A.quoteNumber,quoteDate:A.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,o=n?.documentElement||n;o&&($e(o),bt(o,a),rt(o,a));const s=n?.getElementById("quotation-pdf-root");try{s&&await rn(s)}catch(g){console.error("[reservations/pdf] failed to layout preview document",g)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),l=n?.querySelector(".quote-preview-pages"),c=cs;let p=18;if(l&&n?.defaultView){const g=n.defaultView.getComputedStyle(l),u=parseFloat(g.rowGap||g.gap||`${p}`);Number.isFinite(u)&&u>=0&&(p=u)}const d=ds,v=i.length?i.length*d+Math.max(0,(i.length-1)*p):d;e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(v),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${v}px`,e.style.minHeight=`${v}px`,ln(be)},{once:!0})}function ks(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?A.sections.add(n):A.sections.delete(n),on())}function Ts(){if(!U?.toggles||!A)return;const{toggles:e}=U,t=tn.map(({id:n,labelKey:a,fallback:o})=>{const s=r(a,o),i=A.sections.has(n)?"checked":"";return`
      <label class="quote-toggle">
        <input type="checkbox" class="form-check-input" data-section-id="${n}" ${i}>
        <span>${q(s)}</span>
      </label>
    `}).join("");e.innerHTML=t,e.querySelectorAll('input[type="checkbox"]').forEach(n=>{n.addEventListener("change",ks)})}function As(){if(U?.modal)return U;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${q(r("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${q(r("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${q(r("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${q(r("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),o=e.querySelector("[data-quote-download]"),s=document.createElement("iframe");s.className="quote-preview-frame",s.setAttribute("title",r("reservations.quote.previewTitle","معاينة عرض السعر")),s.setAttribute("loading","lazy"),s.setAttribute("frameborder","0");const i=document.createElement("div");i.className="quote-preview-zoom-controls",i.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${q(r("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${q(r("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${q(r("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const l=document.createElement("div");l.className="quote-preview-frame-wrapper",l.appendChild(s),n.innerHTML="",n.appendChild(i),n.appendChild(l),o?.addEventListener("click",async()=>{if(A){o.disabled=!0;try{await Ls()}finally{o.disabled=!1}}}),U={modal:e,toggles:t,preview:n,previewFrameWrapper:l,zoomControls:i,zoomValue:i.querySelector("[data-zoom-value]"),previewFrame:s,meta:a,downloadBtn:o};const c=i.querySelector("[data-zoom-out]"),p=i.querySelector("[data-zoom-in]"),d=i.querySelector("[data-zoom-reset]");return c?.addEventListener("click",()=>Lt(-.1)),p?.addEventListener("click",()=>Lt(.1)),d?.addEventListener("click",()=>He(1)),He(be),U}function He(e){be=Math.min(Math.max(e,.2),2),ln(be),U?.zoomValue&&(U.zoomValue.textContent=`${Math.round(be*100)}%`)}function Lt(e){He(be+e)}function ln(e){if(!U?.previewFrame||!U.previewFrameWrapper)return;const t=U.previewFrame,n=U.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,o=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`,n.style.minHeight=`${o}px`,n.style.height=`${o}px`}function $s(){if(!U?.meta||!A)return;const{meta:e}=U;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${q(r("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${q(A.quoteNumber)}</strong></div>
      <div><span>${q(r("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${q(A.quoteDateLabel)}</strong></div>
    </div>
  `}async function Ls(){if(!A)return;await hs();const e=sn({reservation:A.reservation,customer:A.customer,project:A.project,technicians:A.technicians,totalsDisplay:A.totalsDisplay,rentalDays:A.rentalDays,currencyLabel:A.currencyLabel,sections:A.sections,quoteNumber:A.quoteNumber,quoteDate:A.quoteDateLabel}),t=document.createElement("div");t.innerHTML=e,t.style.position="fixed",t.style.top="-10000px",t.style.left="0",t.style.zIndex="-1",document.body.appendChild(t),$e(t),bt(t),rt(t);const n=t.firstElementChild;if(n){n.setAttribute("dir","rtl"),n.style.direction="rtl",n.style.textAlign="right",n.setAttribute("data-theme","light"),n.classList.remove("dark","dark-mode"),n.style.margin="0",n.style.padding="0",n.style.width="210mm",n.style.maxWidth="210mm",n.style.marginLeft="auto",n.style.marginRight="auto",n.scrollTop=0,n.scrollLeft=0;try{await rn(n)}catch(a){console.error("[reservations/pdf] failed to layout export document",a)}}try{const a=`quotation-${A.quoteNumber}.pdf`;await window.html2pdf().set({margin:0,pagebreak:{mode:["css","legacy"],avoid:["tr"]},filename:a,html2canvas:{scale:2,useCORS:!0,scrollX:0,scrollY:0,onclone:o=>{const s=o?.defaultView||window;fs(o),rt(o?.documentElement||o,s)}},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}}).from(t.firstElementChild).save(),A.sequenceCommitted||(ws(A.quoteSequence),A.sequenceCommitted=!0)}finally{document.body.removeChild(t)}}function Ds(){const e=As();e?.modal&&(He(1),Ts(),$s(),on(),window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(e.modal).show())}async function Bs({reservation:e,customer:t,project:n}){if(!e){x(r("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=xs(e),{totalsDisplay:o,totals:s,rentalDays:i}=Cs(e,a,n),l=r("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:p}=qs(),d=new Date;A={reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:o,rentalDays:i,currencyLabel:l,sections:new Set(tn.filter(v=>v.defaultSelected).map(v=>v.id)),quoteSequence:c,quoteNumber:p,quoteDate:d,quoteDateLabel:Ss(d),sequenceCommitted:!1},Ds()}function js({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const o=Oe(),{reservations:s=[],customers:i=[],technicians:l=[],projects:c=[]}=Q(),p=Array.isArray(o)?o:l||[],d=new Map((c||[]).map(w=>[String(w.id),w])),v=document.getElementById(e);if(!v){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!s||s.length===0){v.innerHTML=`<p>${r("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const g=t||Xa(),u=new Map(i.map(w=>[String(w.id),w])),S=new Map(p.map(w=>[String(w.id),w])),h=Za({reservations:s,filters:g,customersMap:u,techniciansMap:S,projectsMap:d});if(h.length===0){v.innerHTML=`<p>${r("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}v.innerHTML=`<div class="reservations-grid">${Ja({entries:h,customersMap:u,techniciansMap:S,projectsMap:d})}</div>`,v.querySelectorAll('[data-action="details"]').forEach(w=>{const f=Number(w.dataset.reservationIndex);Number.isNaN(f)||w.addEventListener("click",()=>{typeof n=="function"&&n(f)})}),v.querySelectorAll('button[data-action="confirm"]').forEach(w=>{const f=Number(w.dataset.reservationIndex);Number.isNaN(f)||w.addEventListener("click",m=>{m.stopPropagation(),typeof a=="function"&&a(f,m)})})}function Ns(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:o=[],customers:s=[],projects:i=[]}=Q(),l=o[e];if(!l)return x(r("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=s.find(f=>String(f.id)===String(l.customerId)),p=l.projectId?i.find(f=>String(f.id)===String(l.projectId)):null,d=document.getElementById("reservation-details-body");if(d){const f=Oe()||[];d.innerHTML=es(l,c,f,e,p)}const v=document.getElementById("reservationDetailsModal"),g=()=>{v&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(v)?.hide()},u=document.getElementById("reservation-details-edit-btn");u&&(u.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:c,getEditContext:a})});const S=document.getElementById("reservation-details-delete-btn");S&&(S.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:c})});const h=d?.querySelector('[data-action="open-project"]');h&&p&&h.addEventListener("click",()=>{g();const f=p?.id!=null?String(p.id):"",m=f?`projects.html?project=${encodeURIComponent(f)}`:"projects.html";window.location.href=m});const w=document.getElementById("reservation-details-export-btn");return w&&(w.onclick=async()=>{try{await Bs({reservation:l,customer:c,project:p})}catch(f){console.error("❌ [reservations] export to PDF failed",f),x(r("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),v&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(v).show(),!0}let De=null,ne=[],ot=null,X={};function Ve(){return{index:De,items:ne}}function Qe(e,t){De=typeof e=="number"?e:null,ne=Array.isArray(t)?[...t]:[]}function cn(){De=null,ne=[],Ba()}function Rs(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Te(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ps(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=r("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),o=r("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),s=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((c,p)=>String(p.createdAt||p.start||"").localeCompare(String(c.createdAt||c.start||""))):[],l=[`<option value="">${Te(a)}</option>`];i.forEach(c=>{l.push(`<option value="${Te(c.id)}">${Te(c.title||a)}</option>`)}),s&&!i.some(c=>String(c.id)===s)&&l.push(`<option value="${Te(s)}">${Te(o)}</option>`),n.innerHTML=l.join(""),s?n.value=s:n.value=""}function dn(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Dt(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:o,updateEditReservationSummary:s,ensureModal:i}={}){const{customers:l,projects:c}=Q(),d=Ot()?.[e];if(!d){x(r("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}X={...X,reservation:d,projects:c||[]},t?.(),Ps(c||[],d);const v=d.projectId&&c?.find?.(T=>String(T.id)===String(d.projectId))||null,{effectiveConfirmed:g,projectLinked:u}=ue(d,v),S=d.items?d.items.map(T=>({...T,equipmentId:T.equipmentId??T.equipment_id??T.id,barcode:V(T?.barcode)})):[];Qe(e,S);const h=r("reservations.list.unknownCustomer","غير معروف"),w=l?.find?.(T=>String(T.id)===String(d.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const f=document.getElementById("edit-res-id");f&&(f.value=d.reservationId||d.id);const m=document.getElementById("edit-res-customer");m&&(m.value=w?.customerName||h);const E=typeof a=="function"?a(d.start):{date:"",time:""},C=typeof a=="function"?a(d.end):{date:"",time:""};n?.("edit-res-start",E.date),n?.("edit-res-start-time",E.time),n?.("edit-res-end",C.date),n?.("edit-res-end-time",C.time);const $=document.getElementById("edit-res-notes");$&&($.value=d.notes||"");const N=document.getElementById("edit-res-discount");N&&(N.value=b(d.discount??0));const y=document.getElementById("edit-res-discount-type");y&&(y.value=d.discountType||"percent");const D=document.getElementById("edit-res-tax");D&&(D.checked=d.projectId?!1:!!d.applyTax);const L=document.getElementById("edit-res-confirmed");L&&(L.checked=g,L.disabled=u,L.classList.toggle("disabled",u),L.closest(".form-check")?.classList.toggle("disabled",u));const B=document.getElementById("edit-res-paid");B&&(B.value=d.paid===!0||d.paid==="paid"?"paid":"unpaid"),Aa((d.technicians||[]).map(T=>String(T))),o?.(S),dn(),s?.();const R=document.getElementById("editReservationModal");ot=Rs(R,i),ot?.show?.()}async function Ms({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:o,populateEquipmentDescriptionLists:s,handleReservationsMutation:i}={}){if(De===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",p=document.getElementById("edit-res-end")?.value?.trim(),d=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",v=document.getElementById("edit-res-notes")?.value||"",g=b(document.getElementById("edit-res-discount")?.value||"0"),u=parseFloat(g)||0,S=document.getElementById("edit-res-discount-type")?.value||"percent",h=document.getElementById("edit-res-confirmed")?.checked||!1,w=document.getElementById("edit-res-paid")?.value||"unpaid",f=document.getElementById("edit-res-project")?.value||"",m=$a();if(!l||!p){x(r("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const E=typeof e=="function"?e:(j,K)=>`${j}T${K||"00:00"}`,C=E(l,c),$=E(p,d);if(C&&$&&new Date(C)>new Date($)){x(r("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const y=Ot()?.[De];if(!y){x(r("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ne)||ne.length===0&&m.length===0){x(r("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const j of ne)if(we(j.barcode)){x(r("reservations.toast.updateEquipmentMaintenance","⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة"));return}const D=typeof t=="function"?t:()=>!1;for(const j of ne){const K=V(j.barcode);if(D(K,C,$,y.id??y.reservationId)){x(r("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const L=typeof n=="function"?n:()=>!1;for(const j of m)if(L(j,C,$,y.id??y.reservationId)){x(r("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const B=document.getElementById("edit-res-tax"),R=Array.isArray(X.projects)&&X.projects.length?X.projects:Q().projects||[],T=f&&R.find(j=>String(j.id)===String(f))||null,W={...y,projectId:f?String(f):null,confirmed:h},{effectiveConfirmed:H,projectLinked:I,projectStatus:z}=ue(W,T),re=I?!1:B?.checked||!1,me=Mt(ne,u,S,re,m,{start:C,end:$});let _=y.status??"pending";I?_=T?.status??z??_:["completed","cancelled"].includes(String(_).toLowerCase())||(_=h?"confirmed":"pending");const J=Ft({reservationCode:y.reservationCode??y.reservationId??null,customerId:y.customerId,start:C,end:$,status:_,title:y.title??null,location:y.location??null,notes:v,projectId:f?String(f):null,totalAmount:me,discount:u,discountType:S,applyTax:re,paidStatus:w,confirmed:H,items:ne.map(j=>({...j,equipmentId:j.equipmentId??j.id})),technicians:m});try{const j=await La(y.id||y.reservationId,J);await Da(),x(r("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),cn(),i?.({type:"updated",reservation:j}),o?.(),s?.(),ot?.hide?.()}catch(j){console.error("❌ [reservationsEdit] Failed to update reservation",j);const K=_t(j)?j.message:r("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");x(K,"error")}}function Gs(e={}){X={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:o}=X,s=document.getElementById("edit-res-discount");s&&!s.dataset.listenerAttached&&(s.addEventListener("input",()=>{s.value=b(s.value),t?.()}),s.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const l=document.getElementById("edit-res-tax");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>t?.()),l.dataset.listenerAttached="true");const c=document.getElementById("edit-res-project");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{dn();const u=document.getElementById("edit-res-confirmed");if(u){const S=Array.isArray(X.projects)&&X.projects.length?X.projects:Q().projects||[],h=c.value&&S.find(C=>String(C.id)===String(c.value))||null,f={...X?.reservation??{},projectId:c.value||null,confirmed:u.checked},{effectiveConfirmed:m,projectLinked:E}=ue(f,h);u.checked=m,u.disabled=E,u.classList.toggle("disabled",E),u.closest(".form-check")?.classList.toggle("disabled",E)}t?.()}),c.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{Ms(X).catch(u=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",u)})}),p.dataset.listenerAttached="true");const d=document.getElementById("edit-res-equipment-barcode");if(d&&!d.dataset.listenerAttached){d.addEventListener("keydown",h=>{h.key==="Enter"&&(h.preventDefault(),n?.(d))});let u=null;const S=()=>{if(clearTimeout(u),!d.value?.trim())return;const{start:h,end:w}=getEditReservationDateRange();!h||!w||(u=setTimeout(()=>{n?.(d)},150))};d.addEventListener("input",S),d.addEventListener("change",()=>n?.(d)),d.dataset.listenerAttached="true"}const v=document.getElementById("edit-res-equipment-description");v&&!v.dataset.listenerAttached&&(v.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),a?.(v,"edit"))}),v.dataset.listenerAttached="true");const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{cn(),t?.(),o?.([])}),g.dataset.cleanupAttached="true")}function ht(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Le(e,n),end:Le(t,a)}}function We(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=r("reservations.create.equipment.none","لا توجد معدات"),a=r("reservations.create.summary.currency","ريال"),o=r("reservations.create.equipment.imageAlt","صورة");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="6" class="text-center">${n}</td></tr>`,Bt(t);return}t.innerHTML=e.map((s,i)=>{const l=je(s),c=`${b(String(s.price??0))} ${a}`,p=b(String(s.qty||1)),d=l?`<img src="${l}" alt="${o}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${s.barcode||"-"}</td>
          <td>${s.desc||"-"}</td>
          <td>${c}</td>
          <td>${p}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${i}">🗑️</button></td>
        </tr>
      `}).join(""),Bt(t)}function Bt(e){!e||e.dataset.removeListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('[data-action="remove-edit-item"]');if(!n)return;t.preventDefault();const a=Number(n.dataset.itemIndex);Number.isNaN(a)||Fs(a)}),e.dataset.removeListenerAttached="true")}function xe(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",xe),a.dataset.listenerAttached="true"),ge(a);const o=b(t?.value||"0");t&&(t.value=o);const s=parseFloat(o)||0,i=n?.value||"percent",l=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),p=l?!1:c?.checked||!1,d=a?.value||"unpaid";ge(a,d);const{items:v=[]}=Ve(),{start:g,end:u}=ht();e.innerHTML=ja({items:v,discount:s,discountType:i,applyTax:p,paidStatus:d,start:g,end:u})}function Fs(e){if(e==null)return;const{index:t,items:n}=Ve();if(!Array.isArray(n))return;const a=n.filter((o,s)=>s!==e);Qe(t,a),We(a),xe()}function _s(e){const t=e?.value??"",n=V(t);if(!n)return;const a=ct(n);if(!a){x(r("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}if(we(n)){x(r("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const o=V(n),{index:s,items:i=[]}=Ve();if(i.findIndex(S=>V(S.barcode)===o)>-1){x(r("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:c,end:p}=ht();if(!c||!p){x(r("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:d=[]}=Q(),v=s!=null&&d[s]||null,g=v?.id??v?.reservationId??null;if(qe(o,c,p,g)){x(r("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const u=[...i,{id:a.id,equipmentId:a.id,barcode:o,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Qe(s,u),e&&(e.value=""),We(u),xe()}function ze(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xt(t),a=V(n?.barcode||t);if(!n||!a){x(r("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(we(a)){x(r("reservations.toast.equipmentMaintenanceStrict","⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز"));return}const{start:o,end:s}=ht();if(!o||!s){x(r("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:i,items:l=[]}=Ve();if(l.some(u=>V(u.barcode)===a)){x(r("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:p=[]}=Q(),d=i!=null&&p[i]||null,v=d?.id??d?.reservationId??null;if(qe(a,o,s,v)){x(r("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=[...l,{id:n.id,equipmentId:n.id,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Qe(i,g),We(g),xe(),e.value=""}function Hs(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ze(e))});const t=()=>{Kt(e.value,"edit-res-equipment-description-options")&&ze(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{xe()});function zs(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){at(e);return}ze(e)}}function Xs(){Se(),Hs()}function Os(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}function Ks(){return Pa().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Q()||{};Ma(e||[]),Zt()})}function gt(e=null){Zt(),un(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Us(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function it(){return{populateEquipmentDescriptionLists:Se,setFlatpickrValue:Os,splitDateTime:Nt,renderEditItems:We,updateEditReservationSummary:xe,addEquipmentByDescription:zs,addEquipmentToEditingReservation:_s,addEquipmentToEditingByDescription:ze,combineDateTime:Le,hasEquipmentConflict:qe,hasTechnicianConflict:Pt,renderReservations:un,handleReservationsMutation:gt,ensureModal:Us}}function un(e="reservations-list",t=null){js({containerId:e,filters:t,onShowDetails:mn,onConfirmReservation:fn})}function mn(e){return Ns(e,{getEditContext:it,onEdit:(t,{reservation:n})=>{vn(t,n)},onDelete:pn})}function pn(e){return jt()?window.confirm(r("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Na(e,{onAfterChange:gt}):!1:(ga(),!1)}function fn(e){return Ra(e,{onAfterChange:gt})}function vn(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(s){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",s)}Dt(e,it());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(s){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",s)}Dt(e,it());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const s=t.id??t.reservationId;n.set("reservationEditId",String(s));try{localStorage.setItem("pendingReservationEditId",String(s)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(s){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",s)}}ya({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(s=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",s)});const a=n.toString(),o=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=o}function Zs(){typeof window>"u"||(window.showReservationDetails=mn,window.deleteReservation=pn,window.confirmReservation=fn,window.editReservation=vn)}export{Jt as a,Zs as b,Ys as c,Gs as d,Xs as e,Zt as f,it as g,F as h,Ws as i,gt as j,Ks as l,un as r,mn as s,xe as u};
