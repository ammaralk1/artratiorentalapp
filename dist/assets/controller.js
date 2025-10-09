import{w as Sa,e as G,t as o,n as h,j as E,y as Ea,f as be,k as Rt,o as Ca,u as Ia}from"./auth.js";import{G as W,H as ut,z as K,I as ka,J as je,K as It,L as Mt,M as Ta,N as Aa,O as Ne,P as qe,Q as _t,R as $a,S as Ft,t as Ht,T as zt,U as La,V as Da,s as Ve,i as Ot,W as Ut,X as ja,Y as Ba,Z as Na,d as De,r as ue,c as Vt,g as Qt,_ as Pa,$ as Ra,v as Ma,D as _a,a0 as Fa,a1 as Ha,a2 as za,a3 as Oa,w as Ua,y as Va}from"./projectsService.js";Sa({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.create.equipment.table.code":"الكود","reservations.create.equipment.table.description":"الوصف","reservations.create.equipment.table.price":"السعر","reservations.create.equipment.table.image":"الصورة","reservations.create.equipment.table.delete":"حذف","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.headers.code":"الكود","reservations.edit.table.headers.description":"الوصف","reservations.edit.table.headers.price":"السعر","reservations.edit.table.headers.quantity":"الكمية","reservations.edit.table.headers.image":"الصورة","reservations.edit.table.headers.delete":"حذف","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"📊 تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"🔄 تحديث","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"متوسط الحجز —","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"📈 تطور الحجوزات","reservations.reports.chart.volume.hint":"آخر 6 أشهر","reservations.reports.chart.status.title":"📊 توزيع الحالات والدفع","reservations.reports.chart.status.hint":"نسب مئوية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.topCustomers.title":"👥 أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"📄 تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.topEquipment.title":"🎥 المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.create.equipment.table.code":"Code","reservations.create.equipment.table.description":"Description","reservations.create.equipment.table.price":"Price","reservations.create.equipment.table.image":"Image","reservations.create.equipment.table.delete":"Delete","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.headers.code":"Code","reservations.edit.table.headers.description":"Description","reservations.edit.table.headers.price":"Price","reservations.edit.table.headers.quantity":"Qty","reservations.edit.table.headers.image":"Image","reservations.edit.table.headers.delete":"Delete","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"📊 Performance Reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"🔄 Refresh","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Average reservation —","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"📈 Reservation trend","reservations.reports.chart.volume.hint":"Last 6 months","reservations.reports.chart.status.title":"📊 Status & payment breakdown","reservations.reports.chart.status.hint":"Percentages","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.topCustomers.title":"👥 Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"📄 Reservation Details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.topEquipment.title":"🎥 Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});function Pe(e={}){return e.image||e.imageUrl||e.img||""}function Qa(e){if(!e)return null;const t=W(e),{equipment:n=[]}=G();return(n||[]).find(a=>W(a?.barcode)===t)||null}function mt(e){const t=W(e);if(!t)return null;const{equipment:n=[]}=G();return(n||[]).find(a=>W(a?.barcode)===t)||null}function we(e){return mt(e)?.status==="صيانة"}let tt=null,Wt=[],nt=new Map,at=new Map;function Gt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function ft(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Yt(e,t,{allowPartial:n=!1}={}){const a=K(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,l)=>{l.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function st(e,t={}){return Yt(nt,e,t)}function rt(e,t={}){return Yt(at,e,t)}function ge(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function Xt(e){Wt=Array.isArray(e)?[...e]:[]}function vt(){return Wt}function ht(e){return e&&vt().find(t=>String(t.id)===String(e))||null}function kt(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Wa(){const e=document.getElementById("res-company-share");if(!e||!e.checked)return null;const t=e.dataset.companyShare??e.value??It,n=h(String(t).replace("%","").trim()),a=parseFloat(n);return Number.isFinite(a)?a:It}function Ga(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Tt(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function At(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function re({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=pt();if(!n||!a||!s)return;const r=ut()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),l=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const c=new Set;nt=new Map;const u=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:At(m)||l})).filter(m=>{if(!m.label)return!1;const S=K(m.label);return!S||c.has(S)?!1:(c.add(S),nt.set(S,m),!0)}).sort((m,S)=>m.label.localeCompare(S.label,void 0,{sensitivity:"base"}));s.innerHTML=u.map(m=>`<option value="${Gt(m.label)}"></option>`).join("");const d=t?"":n.value,v=e?String(e):a.value?String(a.value):"",x=v?r.find(m=>String(m.id)===v):null;if(x){const m=At(x)||l;a.value=String(x.id),n.value=m,n.dataset.selectedId=String(x.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":d}function Re({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=ft();if(!a||!s||!r)return;const i=Array.isArray(t)?t:vt()||[],l=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",l);const c=[...i].filter(y=>y&&y.id!=null).sort((y,q)=>String(q.createdAt||q.start||"").localeCompare(String(y.createdAt||y.start||""))),u=n?"":a.value,d=o("projects.fallback.untitled","مشروع بدون اسم"),v=new Set;at=new Map;const x=c.map(y=>{const q=kt(y)||d;return{id:String(y.id),label:q}}).filter(y=>{if(!y.label)return!1;const q=K(y.label);return!q||v.has(q)?!1:(v.add(q),at.set(q,y),!0)});r.innerHTML=x.map(y=>`<option value="${Gt(y.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",S=m?c.find(y=>String(y.id)===m):null;if(S){const y=kt(S)||d;s.value=String(S.id),a.value=y,a.dataset.selectedId=String(S.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":u}function Fe(e,t,n){const{date:a,time:s}=Mt(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const l=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,l)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const l=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,l)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Kt(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Re({selectedValue:a});const r=(ut()||[]).find(d=>String(d.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";re(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const l=Tt(e,"start"),c=Tt(e,"end");l&&Fe("res-start","res-start-time",l),c&&Fe("res-end","res-end-time",c);const u=document.getElementById("res-notes");u&&e.description&&(t||!u.value)&&(u.value=e.description),ye(),F()}function Jt({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:G(),s=Array.isArray(a)?a:[];Xt(s);const r=t!=null?String(t):n.value?String(n.value):"";Re({selectedValue:r,projectsList:s}),ye(),F()}function ye(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function bt(){const{input:e,hidden:t}=ft();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?rt(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=ht(r.id);i?Kt(i,{skipProjectSelectUpdate:!0}):(ye(),F())}else t.value="",e.dataset.selectedId="",ye(),F()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?rt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function gt(){const{input:e,hidden:t}=pt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?st(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),F()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?st(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ya(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(Re({selectedValue:String(n.projectId)}),ye());const i=ht(n.projectId);if(i?Kt(i,{forceNotes:!!n.forceNotes}):F(),n.start&&Fe("res-start","res-start-time",n.start),n.end&&Fe("res-end","res-end-time",n.end),n.customerId){const c=(ut()||[]).find(u=>String(u.id)===String(n.customerId));c?.id!=null&&re({selectedValue:String(c.id)})}else re({selectedValue:""})}function Qe(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:je(e,n),end:je(t,a)}}function Zt(e){const t=K(e);if(!t)return null;const n=Ut()||[],a=n.find(s=>K(s?.desc||s?.description||"")===t);return a||n.find(s=>K(s?.desc||s?.description||"").includes(t))||null}function en(e,t="equipment-description-options"){const n=K(e);if(!n)return!1;const a=document.getElementById(t);return a&&a.options&&Array.from(a.options).some(i=>K(i.value)===n)?!0:(Ut()||[]).some(r=>K(r?.desc||r?.description||"")===n)}function xe(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),{equipment:n=[]}=G(),a=Array.isArray(n)?n:[];Na(a);const r=Array.from(new Set(a.map(i=>i?.desc||i?.description||"").filter(Boolean))).sort((i,l)=>i.localeCompare(l,"ar",{sensitivity:"base"})).map(i=>`<option value="${i}"></option>`).join("");e&&(e.innerHTML=r),t&&(t.innerHTML=r)}function Ze(e,t){const n=W(e);if(!n)return!1;const{start:a,end:s}=Qe();if(!a||!s)return E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Ne().some(l=>W(l.barcode)===n))return E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(qe(n,a,s))return E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=mt(n);return i?we(i.barcode)?(E(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")),!1):(_t({id:i.id,equipmentId:i.id,barcode:n,desc:i.desc,qty:1,price:i.price,image:Pe(i)}),t&&(t.value=""),Se(),F(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(E(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1)}function ot(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Zt(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(Qa(n.barcode)?.status==="صيانة"){E(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const s=W(n.barcode);if(!s){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:n.id,equipmentId:n.id,barcode:s,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Pe(n)},{start:i,end:l}=Qe();if(!i||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Ne().some(d=>W(d.barcode)===s)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(qe(s,i,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}if(we(s)){E(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}_t(r),Se(),F(),e.value=""}function Xa(){xe();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ot(e))});const t=()=>{en(e.value,"equipment-description-options")&&ot(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Se(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ne(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","ريال"),r=o("reservations.create.equipment.imageAlt","صورة");if(n.length===0){t.innerHTML=`<tr><td colspan="5">${a}</td></tr>`;return}t.innerHTML=n.map((i,l)=>{const c=Pe(i),u=`${h(String(i.price??0))} ${s}`,d=c?`<img src="${c}" alt="${r}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${i.barcode||"-"}</td>
          <td>${i.desc}</td>
          <td>${u}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${l}">🗑️</button></td>
        </tr>
      `}).join("")}function F(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(h(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,i=document.getElementById("res-payment-status")?.value||"unpaid",{start:l,end:c}=Qe(),u=Wa(),d=document.getElementById("res-payment-status");ge(d,i),ka({selectedItems:Ne(),discount:t,discountType:n,applyTax:r,paidStatus:i,start:l,end:c,companySharePercent:u})}function Ka(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=h(r.target.value),F()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",F),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",F),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",F),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{ge(s),F()}),s.dataset.listenerAttached="true"),ge(s)}function Ja(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){F();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),F()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function $t(){const{input:e,hidden:t}=pt(),{input:n,hidden:a}=ft(),{customers:s}=G();let r=t?.value?String(t.value):"";if(!r&&e?.value){const C=st(e.value,{allowPartial:!0});C&&(r=String(C.id),t&&(t.value=r),e.value=C.label,e.dataset.selectedId=r)}const i=s.find(C=>String(C.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const l=i.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const C=rt(n.value,{allowPartial:!0});C&&(c=String(C.id),a&&(a.value=c),n.value=C.label,n.dataset.selectedId=c)}const u=document.getElementById("res-start").value,d=document.getElementById("res-end").value,v=document.getElementById("res-start-time")?.value||"00:00",x=document.getElementById("res-end-time")?.value||"00:00";if(!u||!d){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${u}T${v}`,S=`${d}T${x}`,y=new Date(m),q=new Date(S);if(Number.isNaN(y.getTime())||Number.isNaN(q.getTime())||y>=q){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const p=$a(),b=Ne();if(b.length===0&&p.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const N=document.getElementById("res-notes")?.value||"",A=parseFloat(h(document.getElementById("res-discount")?.value))||0,D=document.getElementById("res-discount-type")?.value||"percent",f=document.getElementById("res-payment-status")?.value||"unpaid",g=c?ht(c):null,I=Ga(g);if(c&&!g){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const C of b)if(we(C.barcode)){E(o("reservations.toast.cannotCreateEquipmentMaintenance","⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة"));return}for(const C of b){const B=W(C.barcode);if(qe(B,m,S)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const C of p)if(Ft(C,m,S)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const L=document.getElementById("res-tax"),$=!!c?!1:L?.checked||!1,j=Ht(b,A,D,$,p,{start:m,end:S}),O=Ea(),U=zt({reservationCode:O,customerId:l,start:m,end:S,status:I?"confirmed":"pending",title:null,location:null,notes:N,projectId:c||null,totalAmount:j,discount:A,discountType:D,applyTax:$,paidStatus:f,confirmed:I,items:b.map(C=>({...C,equipmentId:C.equipmentId??C.id})),technicians:p});try{const C=await La(U);Da(),xe(),Ve(),Za(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof tt=="function"&&tt({type:"created",reservation:C})}catch(C){console.error("❌ [reservations/createForm] Failed to create reservation",C);const B=Ot(C)?C.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(B,"error")}}function Za(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),re({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),Re({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const l=document.getElementById("res-payment-status");l&&(l.value="unpaid",ge(l,"unpaid")),ja(),Ba([]),Se(),ye(),F()}function es(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('button[data-action="remove-item"]');if(!n)return;const a=Number(n.dataset.index);Aa(a),Se(),F()}),e.dataset.listenerAttached="true")}function ts(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),Ze(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const a=e.value;if(!a?.trim())return;const{start:s,end:r}=Qe();!s||!r||(t=setTimeout(()=>{Ze(a,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>Ze(e.value,e)),e.dataset.listenerAttached="true"}function ns(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await $t()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await $t()}),t.dataset.listenerAttached="true")}function tr({onAfterSubmit:e}={}){tt=typeof e=="function"?e:null;const{customers:t,projects:n}=G();Ta(t||[]),re(),gt(),Xt(n||[]),Jt({projectsList:n}),bt(),xe(),Xa(),Ja(),Ka(),es(),ts(),ns(),Ya(),F(),Se()}function tn(){xe(),Jt(),re(),gt(),bt(),Se(),F()}if(typeof document<"u"){const e=()=>{re(),Re({projectsList:vt()}),gt(),bt(),F()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function nn(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:de(t),endDate:de(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:de(n),endDate:de(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:de(n),endDate:de(a)}}return e==="upcoming"?{startDate:de(t),endDate:""}:{startDate:"",endDate:""}}function as(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),l=a?.value||"";if(new Set(["","today","week","month"]).has(l)||(l="",a&&(a.value=""),He(t),He(n),r="",i=""),!r&&!i&&l){const u=nn(l);r=u.startDate,i=u.endDate}return{searchTerm:K(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:l}}function nr(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{ss(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const l=document.getElementById("clear-filters");l&&!l.dataset.listenerAttached&&(l.addEventListener("click",()=>{n&&(n.value=""),He(a),He(s),r&&(r.value=""),i&&(i.value=""),t()}),l.dataset.listenerAttached="true")}function ss(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=nn(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function de(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function He(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function rs({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((p,b)=>({reservation:p,index:b})),i=t.searchTerm||"",l=t.searchReservationId||"",c=t.searchCustomerName||"",u=t.startDate||"",d=t.endDate||"",v=t.status||"",x=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,S=u?new Date(`${u}T00:00:00`):null,y=d?new Date(`${d}T23:59:59`):null,q=r.filter(({reservation:p})=>{const b=n.get(String(p.customerId)),N=s?.get?.(String(p.projectId)),A=p.start?new Date(p.start):null,D=De(p),{effectiveConfirmed:f}=ue(p,N);if(x!=null&&String(p.customerId)!==String(x)||m!=null&&!(Array.isArray(p.technicians)?p.technicians.map($=>String($)):[]).includes(String(m))||v==="confirmed"&&!f||v==="pending"&&f||v==="completed"&&!D||S&&A&&A<S||y&&A&&A>y||l&&!K([p.reservationId,p.id].filter(Boolean).map(String).join(" ")).includes(l)||c&&!K(b?.customerName||"").includes(c))return!1;if(!i)return!0;const g=p.items?.map?.(M=>`${M.barcode} ${M.desc}`).join(" ")||"",I=(p.technicians||[]).map(M=>a.get(String(M))?.name).filter(Boolean).join(" ");return K([p.reservationId,b?.customerName,p.notes,g,I,N?.title].filter(Boolean).join(" ")).includes(i)});return q.sort((p,b)=>{const N=De(p.reservation),A=De(b.reservation);if(N!==A)return N?1:-1;const D=p.reservation.start?new Date(p.reservation.start).getTime():0;return(b.reservation.start?new Date(b.reservation.start).getTime():0)-D}),q}function os({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","ريال"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),l=o("reservations.list.noNotes","لا توجد ملاحظات"),c=o("reservations.list.itemsCountShort","{count} عنصر"),u=o("reservations.list.crew.separator","، "),d=o("reservations.list.status.confirmed","✅ مؤكد"),v=o("reservations.list.status.pending","⏳ غير مؤكد"),x=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),S=o("reservations.list.actions.confirm","✔️ تأكيد"),y=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),p={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:b,index:N})=>{const A=t.get(String(b.customerId)),D=b.projectId?a?.get?.(String(b.projectId)):null,f=De(b),g=b.paid===!0||b.paid==="paid",{effectiveConfirmed:I,projectLinked:L}=ue(b,D),M=I?"status-confirmed":"status-pending",$=g?"status-paid":"status-unpaid";let j=`<span class="reservation-chip status-chip ${M}">${I?d:v}</span>`,O=`<span class="reservation-chip status-chip ${$}">${g?x:m}</span>`,U=g?" tile-paid":" tile-unpaid";f&&(U+=" tile-completed");let C="";f&&(j=`<span class="reservation-chip status-chip status-completed">${d}</span>`,O=`<span class="reservation-chip status-chip status-completed">${g?x:m}</span>`,C=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const B=!L&&!I?`<button class="tile-confirm" data-reservation-index="${N}" data-action="confirm">${S}</button>`:"",ee=B?`<div class="tile-actions">${B}</div>`:"",J=b.items?.length||0,H=(b.technicians||[]).map(z=>n.get(String(z))).filter(Boolean),oe=H.map(z=>z.name).join(u)||"—",P=h(String(b.reservationId??"")),Y=b.start?h(be(b.start)):"-",ie=b.end?h(be(b.end)):"-",Ce=h(String(b.cost??0)),Ie=h(String(J)),ke=b.notes?h(b.notes):l,R=c.replace("{count}",Ie),V=b.applyTax?`<small>${r}</small>`:"";let ne=y;return b.projectId&&(ne=D?.title?h(D.title):q),`
      <div class="${B?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${U}"${C} data-reservation-index="${N}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${P}</div>
          <div class="tile-badges">
            ${j}
            ${O}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${p.client}</span>
            <span class="tile-value">${A?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.project}</span>
            <span class="tile-value">${ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.start}</span>
            <span class="tile-value tile-inline">${Y}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.end}</span>
            <span class="tile-value tile-inline">${ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.cost}</span>
            <span class="tile-value">${Ce} ${s} ${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.equipment}</span>
            <span class="tile-value">${R}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.crew}</span>
            <span class="tile-value">${H.length?oe:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${ke}</span>
          </div>
        </div>
        ${ee}
      </div>
    `}).join("")}function et(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function is(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=ue(e,s),l=e.paid===!0||e.paid==="paid",c=De(e),u=e.items||[],{technicians:d=[]}=G(),v=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(d)?d:[]),x=new Map;v.forEach(k=>{if(!k||k.id==null)return;const _=String(k.id),X=x.get(_)||{};x.set(_,{...X,...k})});const m=(e.technicians||[]).map(k=>x.get(String(k))).filter(Boolean),S=Rt(),y=Vt(e.start,e.end),q=(k={})=>{const _=[k.dailyWage,k.daily_rate,k.dailyRate,k.wage,k.rate];for(const X of _){if(X==null)continue;const ve=parseFloat(h(String(X)));if(Number.isFinite(ve))return ve}return 0},b=u.reduce((k,_)=>k+(_.qty||1)*(_.price||0),0)*y,A=m.reduce((k,_)=>k+q(_),0)*y,D=b+A,f=parseFloat(e.discount)||0,g=e.discountType==="amount"?f:D*(f/100),I=Math.max(0,D-g),L=r?!1:e.applyTax,M=L?I*.15:0,$=Number(e.cost),j=Number.isFinite($),O=I+M,U=r?Math.round(O):j?$:Math.round(O),C=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,B=C!=null?parseFloat(h(String(C))):NaN,H=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(B)&&B>0)&&Number.isFinite(B)?B:0,oe=H>0?Math.max(0,(Number.isFinite(U)?U:0)*(H/100)):0,P=h(String(e.reservationId??e.id??"")),Y=e.start?h(be(e.start)):"-",ie=e.end?h(be(e.end)):"-",Ce=h(String(m.length)),Ie=h(b.toFixed(2)),ke=h(g.toFixed(2)),R=h(I.toFixed(2)),V=h(M.toFixed(2)),ne=h((U??0).toFixed(2)),me=h(String(y)),z=o("reservations.create.summary.currency","ريال"),pe=o("reservations.details.labels.discount","الخصم"),Xe=o("reservations.details.labels.tax","الضريبة (15%)"),En=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Cn=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),In=o("reservations.details.labels.duration","عدد الأيام"),kn=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),fe={index:"#",code:o("reservations.details.table.headers.code","الكود"),description:o("reservations.details.table.headers.description","الوصف"),quantity:o("reservations.details.table.headers.quantity","الكمية"),price:o("reservations.details.table.headers.price","السعر"),image:o("reservations.details.table.headers.image","الصورة")},Tn=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),An=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),$n=o("reservations.details.technicians.roleUnknown","غير محدد"),Ln=o("reservations.details.technicians.phoneUnknown","غير متوفر"),Dn=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),jn=o("reservations.list.status.confirmed","✅ مؤكد"),Bn=o("reservations.list.status.pending","⏳ غير مؤكد"),Nn=o("reservations.list.payment.paid","💳 مدفوع"),Pn=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Rn=o("reservations.list.status.completed","📁 منتهي"),Mn=o("reservations.details.labels.id","🆔 رقم الحجز"),_n=o("reservations.details.section.bookingInfo","بيانات الحجز"),Fn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Hn=o("reservations.details.labels.finalTotal","المجموع النهائي"),zn=o("reservations.details.section.crew","😎 الفريق الفني"),On=o("reservations.details.crew.count","{count} عضو"),Un=o("reservations.details.section.items","📦 المعدات المرتبطة"),Vn=o("reservations.details.items.count","{count} عنصر"),Qn=o("reservations.details.actions.edit","✏️ تعديل"),Wn=o("reservations.details.actions.delete","🗑️ حذف"),Gn=o("reservations.details.labels.customer","العميل"),Yn=o("reservations.details.labels.contact","رقم التواصل"),Xn=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Kn=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Jn=o("reservations.details.actions.openProject","📁 فتح المشروع"),Zn=o("reservations.details.labels.start","بداية الحجز"),ea=o("reservations.details.labels.end","نهاية الحجز"),ta=o("reservations.details.labels.notes","ملاحظات"),na=o("reservations.list.noNotes","لا توجد ملاحظات"),aa=o("reservations.details.labels.itemsCount","عدد المعدات"),sa=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),ra=o("reservations.details.labels.paymentStatus","حالة الدفع"),oa=o("reservations.list.unknownCustomer","غير معروف"),xt=l?Nn:Pn,St=u.length,ia=h(String(St)),Et=Vn.replace("{count}",ia),la=On.replace("{count}",Ce),ca=e.notes?h(e.notes):na,da=h(A.toFixed(2)),ua=h(String(H)),ma=h(oe.toFixed(2)),pa=`${ua}% (${ma} ${z})`,le=[{icon:"💳",label:ra,value:xt},{icon:"📦",label:aa,value:Et},{icon:"⏱️",label:In,value:me},{icon:"💼",label:sa,value:`${Ie} ${z}`}];le.push({icon:"😎",label:En,value:`${da} ${z}`}),g>0&&le.push({icon:"💸",label:pe,value:`${ke} ${z}`}),le.push({icon:"📊",label:Cn,value:`${R} ${z}`}),L&&M>0&&le.push({icon:"🧾",label:Xe,value:`${V} ${z}`}),H>0&&le.push({icon:"🏦",label:kn,value:pa}),le.push({icon:"💰",label:Hn,value:`${ne} ${z}`});const fa=le.map(({icon:k,label:_,value:X})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${k} ${_}</span>
      <span class="summary-details-value">${X}</span>
    </div>
  `).join(""),Ct=[{text:i?jn:Bn,className:i?"status-confirmed":"status-pending"},{text:xt,className:l?"status-paid":"status-unpaid"}];c&&Ct.push({text:Rn,className:"status-completed"});const va=Ct.map(({text:k,className:_})=>`<span class="status-chip ${_}">${k}</span>`).join(""),Te=(k,_,X)=>`
    <div class="res-info-row">
      <span class="label">${k} ${_}</span>
      <span class="value">${X}</span>
    </div>
  `;let Ke="";if(e.projectId){let k=et(Kn);if(s){const _=s.title||o("projects.fallback.untitled","مشروع بدون اسم");k=`${et(_)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${et(Jn)}</button>`}Ke=`
      <div class="res-info-row">
        <span class="label">📁 ${Xn}</span>
        <span class="value">${k}</span>
      </div>
    `}const ce=[];ce.push(Te("👤",Gn,t?.customerName||oa)),ce.push(Te("📞",Yn,t?.phone||"—")),ce.push(Te("🗓️",Zn,Y)),ce.push(Te("🗓️",ea,ie)),ce.push(Te("📝",ta,ca)),Ke&&ce.push(Ke);const ha=ce.join(""),ba=St?u.map((k,_)=>{const X=Pe(k),ve=h(String(k.barcode||"-")),Je=h(String(k.qty||1)),Me=h(String(k.price||0)),wa=h(String(_+1)),xa=X?`<img src="${X}" alt="${k.desc||""}" class="reservation-modal-item-thumb">`:"-";return`
          <tr>
            <td>${wa}</td>
            <td>${ve}</td>
            <td>${k.desc||"-"}</td>
            <td>${Je}</td>
            <td>${Me} ${z}</td>
            <td>${xa}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${Tn}</td></tr>`,ga=`
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
        <tbody>${ba}</tbody>
      </table>
    </div>
  `,ya=m.map((k,_)=>{const X=h(String(_+1)),ve=k.role||$n,Je=k.phone||Ln,Me=k.wage?Dn.replace("{amount}",h(String(k.wage))).replace("{currency}",z):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${X}</span>
          <span class="technician-name">${k.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${ve}</div>
          <div>📞 ${Je}</div>
          ${Me?`<div>💰 ${Me}</div>`:""}
        </div>
      </div>
    `}).join(""),qa=m.length?`<div class="reservation-technicians-grid">${ya}</div>`:`<ul class="reservation-modal-technicians"><li>${An}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Mn}</span>
          <strong>${P}</strong>
        </div>
        <div class="status-chips">
          ${va}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${_n}</h6>
          ${ha}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Fn}</h6>
            <div class="summary-details">
              ${fa}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${zn}</span>
          <span class="count">${la}</span>
        </div>
        ${qa}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Un}</span>
          <span class="count">${Et}</span>
        </div>
        ${ga}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","📄 تصدير PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Qn}</button>
        ${S?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Wn}</button>`:""}
      </div>
    </div>
  `}const ls=`@page {
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

#quotation-pdf-root[data-quote-render-context="export"] .quote-preview-pages {
  gap: 0 !important;
  row-gap: 0 !important;
  column-gap: 0 !important;
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
  page-break-after: auto;
  break-after: auto;
  page-break-before: auto;
  break-before: auto;
  page-break-inside: avoid;
  break-inside: avoid;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-page {
  box-shadow: none !important;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-page + .quote-page::before {
  display: none !important;
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
  align-items: stretch;
  text-align: right;
  direction: rtl;
  font-family: 'Tajawal', sans-serif;
  padding: 10px 12px;
  gap: 10px;
}

.payment-rows {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
}

.payment-row {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  direction: rtl;
  font-size: 0.7rem;
}

.payment-row__label {
  font-weight: 600;
  color: #475569;
  text-align: right;
}

.payment-row__slash {
  font-weight: 600;
  color: #94a3b8;
}

.payment-row__value {
  font-weight: 700;
  color: #0f172a;
  text-align: left;
  direction: ltr;
  white-space: nowrap;
}

.totals-block {
  font-size: 0.62rem;
  align-items: stretch;
  text-align: center;
  margin: 0 auto;
  direction: rtl;
  gap: 10px;
  font-family: 'Tajawal', sans-serif;
  padding: 10px 12px;
}

.totals-block h3 {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  color: #0f172a;
  margin-bottom: 4px;
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

.totals-inline {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.totals-inline__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  white-space: nowrap;
  font-size: 0.7rem;
  font-family: 'Tajawal', sans-serif;
  flex: 1 1 0;
}

.totals-inline__label {
  font-weight: 600;
  color: #475569;
}

.totals-inline__slash {
  font-weight: 600;
  color: #94a3b8;
}

.totals-inline__value {
  font-weight: 700;
  color: #0f172a;
}

.totals-final {
  display: flex;
  justify-content: center;
  width: 100%;
}

.totals-item--final {
  background: rgba(59, 91, 220, 0.12);
  border-color: rgba(59, 91, 220, 0.35);
  padding: 10px 16px;
  min-width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 12px;
}

.totals-item__label {
  font-weight: 600;
  color: #0f172a;
}

.totals-item__slash {
  font-weight: 600;
  color: #1d4ed8;
}

.totals-item__value {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.82rem;
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background-color: #ffffff !important;
  direction: rtl;
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
  direction: rtl;
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

  .quote-preview-pages {
    gap: 0;
  }

  .quote-page {
    box-shadow: none;
  }
}
`,an="reservations.quote.sequence",ae={logoUrl:"https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},cs=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],sn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ds="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",us="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",ms="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",ps=ls.trim(),fs=/color\([^)]*\)/gi,ze=/(color\(|color-mix\()/i,vs=document.createElement("canvas"),_e=vs.getContext("2d"),rn=96,on=25.4,ln=210,cn=297,hs=Math.round(ln/on*rn),bs=Math.round(cn/on*rn),gs=2;let Q=null,T=null,he=1,Ae=null,$e=null;function te(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function ys(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return te(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Lt(e,t){return Array.isArray(e)&&e.length?e:[ys(t)]}function it(e,t="#000"){if(!_e||!e)return t;try{return _e.fillStyle="#000",_e.fillStyle=e,_e.fillStyle||t}catch{return t}}function qs(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=it(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function dn(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(fs,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const ws=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function un(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;ws.forEach(i=>{const l=s[i];if(l&&ze.test(l)){const c=i.replace(/[A-Z]/g,v=>`-${v.toLowerCase()}`),u=i==="backgroundColor"?"#ffffff":s.color||"#000000",d=it(l,u);a.style.setProperty(c,d,"important")}});const r=s.backgroundImage;if(r&&ze.test(r)){const i=it(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function mn(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&ze.test(i)){const l=r.replace(/[A-Z]/g,u=>`-${u.toLowerCase()}`),c=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(l,c,"important")}});const s=a.backgroundImage;s&&ze.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function yt(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Dt(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function jt(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function xs(){const e=jt();return e||($e||($e=yt(us).catch(t=>{throw $e=null,t}).then(()=>{const t=jt();if(!t)throw $e=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),$e)}async function Ss(){const e=Dt();return e||(Ae||(Ae=yt(ms).catch(t=>{throw Ae=null,t}).then(()=>{const t=Dt();if(!t)throw Ae=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Ae)}async function Es(){window.html2pdf||await yt(ds),qs()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Cs(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function Is(){const e=window.localStorage?.getItem?.(an),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ks(){const t=Is()+1;return{sequence:t,quoteNumber:Cs(t)}}function Ts(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(an,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function As(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function $s(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Ls(e){const t=Ve()||[],{technicians:n=[]}=G(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),l=s.get(i)||{};s.set(i,{...l,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Ds(e,t,n){const{projectLinked:a}=ue(e,n),s=Vt(e.start,e.end),l=(Array.isArray(e.items)?e.items:[]).reduce((f,g)=>f+(Number(g?.qty)||1)*(Number(g?.price)||0),0)*s,u=t.reduce((f,g)=>f+$s(g),0)*s,d=l+u,v=parseFloat(e.discount)||0,x=e.discountType==="amount"?v:d*(v/100),m=Math.max(0,d-x),y=(a?!1:e.applyTax)?m*.15:0,q=Number(e.cost),p=Number.isFinite(q),b=m+y,N=a?Math.round(b):p?q:Math.round(b),A={equipmentTotal:l,crewTotal:u,discountAmount:x,taxAmount:y,finalTotal:N??0},D={equipmentTotal:h(l.toFixed(2)),crewTotal:h(u.toFixed(2)),discountAmount:h(x.toFixed(2)),taxAmount:h(y.toFixed(2)),finalTotal:h((N??0).toFixed(2))};return{totals:A,totalsDisplay:D,rentalDays:s}}function pn({reservation:e,customer:t,project:n,technicians:a,totalsDisplay:s,rentalDays:r,currencyLabel:i,sections:l,quoteNumber:c,quoteDate:u}){const d=h(String(e?.reservationId??e?.id??"")),v=e.start?h(be(e.start)):"-",x=e.end?h(be(e.end)):"-",m=t?.customerName||t?.full_name||t?.name||"-",S=t?.phone||"-",y=t?.email||"-",q=t?.company||t?.company_name||"-",p=h(S),b=n?.title||n?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),N=n?.code||n?.projectCode||"",A=h(String(r)),D=e?.notes||"",f=a.length?a.map((R,V)=>{const ne=h(String(V+1)),me=w(R?.name||R?.full_name||"-"),z=w(R?.role||o("reservations.details.technicians.roleUnknown","غير محدد")),pe=w(R?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"));return`<tr>
          <td>${ne}</td>
          <td>${me}</td>
          <td>${z}</td>
          <td>${pe}</td>
        </tr>`}).join(""):`<tr><td colspan="4" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,g=Array.isArray(e.items)&&e.items.length?e.items.map((R,V)=>{const ne=h(String(V+1)),me=w(R?.barcode||"-"),z=w(R?.desc||R?.description||"-"),pe=h(String(R?.qty||1)),Xe=h(Number(R?.price||0).toFixed(2));return`<tr>
          <td>${ne}</td>
          <td>${me}</td>
          <td>${z}</td>
          <td>${pe}</td>
          <td>${Xe}</td>
        </tr>`}).join(""):`<tr>
        <td colspan="5" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td>
      </tr>`,I=R=>l?.has?.(R),L=(R,V)=>`<div class="info-plain__item">${w(R)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(V)}</strong></div>`,M=(R,V,{variant:ne="inline"}={})=>ne==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(R)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(V)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(R)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(V)}</span>
    </span>`,$=(R,V)=>`<div class="payment-row">
      <span class="payment-row__label">${w(R)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(V)}</span>
    </div>`,j=I("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        <div class="info-plain">
          ${L(o("reservations.details.labels.customer","العميل"),m)}
          ${L(o("reservations.details.labels.company","الشركة"),q)}
          ${L(o("reservations.details.labels.phone","الهاتف"),p)}
          ${L(o("reservations.details.labels.email","البريد"),y)}
        </div>
      </section>`:"",O=I("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        <div class="info-plain">
          ${L(o("reservations.details.labels.reservationId","رقم الحجز"),d||"-")}
          ${L(o("reservations.details.labels.start","بداية الحجز"),v)}
          ${L(o("reservations.details.labels.end","نهاية الحجز"),x)}
          ${L(o("reservations.details.labels.duration","عدد الأيام"),A)}
        </div>
      </section>`:"",U=I("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        <div class="info-plain">
          ${L(o("reservations.details.labels.project","المشروع"),b)}
          ${N?L(o("reservations.details.labels.code","الرمز"),N):""}
        </div>
      </section>`:"",C=I("financialSummary")?(()=>{const R=[M(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${s.equipmentTotal} ${i}`),M(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${s.crewTotal} ${i}`),M(o("reservations.details.labels.discount","الخصم"),`${s.discountAmount} ${i}`),M(o("reservations.details.labels.tax","الضريبة"),`${s.taxAmount} ${i}`)].join(""),V=M(o("reservations.details.labels.total","الإجمالي النهائي"),`${s.finalTotal} ${i}`,{variant:"final"});return`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            <div class="totals-inline">${R}</div>
            <div class="totals-final">${V}</div>
          </div>
        </section>`})():"",B=I("items")?`<section class="quote-section quote-section--table">
        <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${w(o("reservations.details.table.headers.code","الكود"))}</th>
              <th>${w(o("reservations.details.table.headers.description","الوصف"))}</th>
              <th>${w(o("reservations.details.table.headers.quantity","الكمية"))}</th>
              <th>${w(o("reservations.details.table.headers.price","السعر"))}</th>
            </tr>
          </thead>
          <tbody>${g}</tbody>
        </table>
      </section>`:"",ee=I("crew")?`<section class="quote-section quote-section--table">
        <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${w(o("reservations.details.technicians.name","الاسم"))}</th>
              <th>${w(o("reservations.details.technicians.role","الدور"))}</th>
              <th>${w(o("reservations.details.technicians.phone","الهاتف"))}</th>
            </tr>
          </thead>
          <tbody>${f}</tbody>
        </table>
      </section>`:"",J=I("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(D||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",H=(()=>{const R=[$(o("reservations.quote.labels.beneficiary","اسم المستفيد"),ae.beneficiaryName),$(o("reservations.quote.labels.bank","اسم البنك"),ae.bankName),$(o("reservations.quote.labels.account","رقم الحساب"),h(ae.accountNumber)),$(o("reservations.quote.labels.iban","رقم الآيبان"),h(ae.iban))].join("");return`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R}</div>
      </div>
      <p class="quote-approval-note">${w(ae.approvalNote)}</p>
    </section>`})(),oe=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${cs.map(R=>`<li>${w(R)}</li>`).join("")}</ul>
      </footer>`,P=[];j&&O?P.push(te(`<div class="quote-section-row">${O}${j}</div>`,{blockType:"group"})):(O&&P.push(te(O)),j&&P.push(te(j))),U&&P.push(te(U));const Y=[];B&&Y.push(te(B,{blockType:"table",extraAttributes:'data-table-id="items"'})),ee&&Y.push(te(ee,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ie=[];C&&ie.push(te(C,{blockType:"summary"})),J&&ie.push(te(J));const Ce=[te(H,{blockType:"payment"}),te(oe,{blockType:"footer"})],Ie=[...Lt(P,"reservations.quote.placeholder.page1"),...Y,...Lt(ie,"reservations.quote.placeholder.page2"),...Ce],ke=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(ae.logoUrl)}" alt="${w(ae.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(ae.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(ae.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${w(c)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${w(u)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ps}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${ke}
          ${Ie.join("")}
        </div>
      </div>
    </div>
  `}function js(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function lt(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready.catch(()=>{}):Promise.resolve();await Promise.allSettled([s,...a.map(r=>js(r))]),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function fn(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await lt(r),s.innerHTML="";const l=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let c=null,u=null;const d=f=>{f.style.margin="0 auto",f.style.breakInside="avoid",f.style.pageBreakInside="avoid",f.style.pageBreakAfter="auto",f.style.breakAfter="auto"},v=()=>{const f=a.createElement("div"),g=s.childElementCount===0;if(f.className="quote-page",f.dataset.pageIndex=String(s.childElementCount),g){f.classList.add("quote-page--primary");const L=i.cloneNode(!0);L.removeAttribute("data-quote-header-template"),f.appendChild(L)}else f.classList.add("quote-page--continuation");const I=a.createElement("main");I.className="quote-body",f.appendChild(I),s.appendChild(f),d(f),c=f,u=I},x=()=>{(!c||!u||!u.isConnected)&&v()},m=()=>{if(!c||!u||u.childElementCount>0)return;const f=c;c=null,u=null,f.parentNode&&f.parentNode.removeChild(f)},S=()=>{c=null,u=null},y=()=>c?c.scrollHeight-c.clientHeight>gs:!1,q=(f,{allowOverflow:g=!1}={})=>(x(),u.appendChild(f),y()&&!g?(u.removeChild(f),m(),!1):!0),p=f=>{const g=f.cloneNode(!0);g.removeAttribute?.("data-quote-block"),g.removeAttribute?.("data-block-type"),g.removeAttribute?.("data-table-id"),!q(g)&&(S(),!q(g)&&q(g,{allowOverflow:!0}))},b=f=>{const g=f.querySelector("table");if(!g){p(f);return}const I=f.querySelector("h3"),L=g.querySelector("thead"),M=Array.from(g.querySelectorAll("tbody tr"));if(!M.length){p(f);return}let $=null,j=0;const O=(C=!1)=>{const B=f.cloneNode(!1);B.removeAttribute("data-quote-block"),B.removeAttribute("data-block-type"),B.removeAttribute("data-table-id"),B.classList.add("quote-section--table-fragment"),C&&B.classList.add("quote-section--table-fragment--continued");const ee=I?I.cloneNode(!0):null;ee&&B.appendChild(ee);const J=g.cloneNode(!1);J.classList.add("quote-table--fragment"),L&&J.appendChild(L.cloneNode(!0));const H=a.createElement("tbody");return J.appendChild(H),B.appendChild(J),{section:B,body:H}},U=(C=!1)=>$||($=O(C),q($.section)||(S(),q($.section)||q($.section,{allowOverflow:!0})),$);M.forEach(C=>{U(j>0);const B=C.cloneNode(!0);if($.body.appendChild(B),y()&&($.body.removeChild(B),$.body.childElementCount||(u.removeChild($.section),$=null,m()),S(),$=null,U(j>0),$.body.appendChild(B),y())){$.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),$=null};if(!l.length)return;l.forEach(f=>{f.getAttribute("data-block-type")==="table"?b(f):p(f)});const N=Array.from(s.children),A=[];N.forEach((f,g)=>{const I=f.querySelector(".quote-body");if(g!==0&&(!I||I.childElementCount===0)){f.remove();return}A.push(f)}),A.forEach((f,g)=>{const I=g===0;f.style.pageBreakAfter="auto",f.style.breakAfter="auto",f.style.pageBreakBefore=I?"auto":"always",f.style.breakBefore=I?"auto":"page",n?f.style.boxShadow="":f.style.boxShadow="none"});const D=A[A.length-1]||null;c=D,u=D?.querySelector(".quote-body")||null,await lt(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}async function Bs(e,{filename:t}){if(!e)return;const n=Array.from(e.querySelectorAll(".quote-page"));if(!n.length)throw new Error("لا توجد صفحات لتصديرها.");const[a,s]=await Promise.all([Ss(),xs()]),r=new a({unit:"mm",format:"a4",orientation:"portrait"});for(let i=0;i<n.length;i+=1){const l=n[i];await lt(l);const u=(await s(l,{scale:2,useCORS:!0,scrollX:0,scrollY:0,backgroundColor:"#ffffff"})).toDataURL("image/jpeg",.95);i>0&&r.addPage(),r.addImage(u,"JPEG",0,0,ln,cn,`page-${i+1}`,"FAST")}r.save(t)}function vn(){if(!T||!Q)return;const{previewFrame:e}=Q;if(!e)return;const t=pn({reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(dn(s),un(s,a),mn(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&await fn(r,{context:"preview"})}catch(x){console.error("[reservations/pdf] failed to layout preview document",x)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),l=n?.querySelector(".quote-preview-pages"),c=hs;let u=18;if(l&&n?.defaultView){const x=n.defaultView.getComputedStyle(l),m=parseFloat(x.rowGap||x.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const d=bs,v=i.length?i.length*d+Math.max(0,(i.length-1)*u):d;e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(v),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${v}px`,e.style.minHeight=`${v}px`,hn(he)},{once:!0})}function Ns(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),vn())}function Ps(){if(!Q?.toggles||!T)return;const{toggles:e}=Q,t=sn.map(({id:n,labelKey:a,fallback:s})=>{const r=o(a,s),i=T.sections.has(n)?"checked":"";return`
      <label class="quote-toggle">
        <input type="checkbox" class="form-check-input" data-section-id="${n}" ${i}>
        <span>${w(r)}</span>
      </label>
    `}).join("");e.innerHTML=t,e.querySelectorAll('input[type="checkbox"]').forEach(n=>{n.addEventListener("change",Ns)})}function Rs(){if(Q?.modal)return Q;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${w(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${w(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${w(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${w(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),r=document.createElement("iframe");r.className="quote-preview-frame",r.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),r.setAttribute("loading","lazy"),r.setAttribute("frameborder","0");const i=document.createElement("div");i.className="quote-preview-zoom-controls",i.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${w(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${w(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${w(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const l=document.createElement("div");l.className="quote-preview-frame-wrapper",l.appendChild(r),n.innerHTML="",n.appendChild(i),n.appendChild(l),s?.addEventListener("click",async()=>{if(T){s.disabled=!0;try{await _s()}finally{s.disabled=!1}}}),Q={modal:e,toggles:t,preview:n,previewFrameWrapper:l,zoomControls:i,zoomValue:i.querySelector("[data-zoom-value]"),previewFrame:r,meta:a,downloadBtn:s};const c=i.querySelector("[data-zoom-out]"),u=i.querySelector("[data-zoom-in]"),d=i.querySelector("[data-zoom-reset]");return c?.addEventListener("click",()=>Bt(-.1)),u?.addEventListener("click",()=>Bt(.1)),d?.addEventListener("click",()=>Oe(1)),Oe(he),Q}function Oe(e){he=Math.min(Math.max(e,.2),2),hn(he),Q?.zoomValue&&(Q.zoomValue.textContent=`${Math.round(he*100)}%`)}function Bt(e){Oe(he+e)}function hn(e){if(!Q?.previewFrame||!Q.previewFrameWrapper)return;const t=Q.previewFrame,n=Q.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`,n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Ms(){if(!Q?.meta||!T)return;const{meta:e}=Q;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(T.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(T.quoteDateLabel)}</strong></div>
    </div>
  `}async function _s(){if(!T)return;await Es();const e=pn({reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel}),t=document.createElement("div");t.innerHTML=e,t.style.position="fixed",t.style.top="-10000px",t.style.left="0",t.style.zIndex="-1",document.body.appendChild(t),dn(t),un(t),mn(t);const n=t.firstElementChild;if(n){n.setAttribute("dir","rtl"),n.style.direction="rtl",n.style.textAlign="right",n.setAttribute("data-theme","light"),n.classList.remove("dark","dark-mode"),n.style.margin="0",n.style.padding="0",n.style.width="210mm",n.style.maxWidth="210mm",n.style.marginLeft="auto",n.style.marginRight="auto",n.scrollTop=0,n.scrollLeft=0;try{await fn(n,{context:"export"})}catch(a){console.error("[reservations/pdf] failed to layout export document",a)}}try{const a=`quotation-${T.quoteNumber}.pdf`;await Bs(n,{filename:a}),T.sequenceCommitted||(Ts(T.quoteSequence),T.sequenceCommitted=!0)}finally{document.body.removeChild(t)}}function Fs(){const e=Rs();e?.modal&&(Oe(1),Ps(),Ms(),vn(),window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(e.modal).show())}async function Hs({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Ls(e),{totalsDisplay:s,totals:r,rentalDays:i}=Ds(e,a,n),l=o("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:u}=ks(),d=new Date;T={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:l,sections:new Set(sn.filter(v=>v.defaultSelected).map(v=>v.id)),quoteSequence:c,quoteNumber:u,quoteDate:d,quoteDateLabel:As(d),sequenceCommitted:!1},Fs()}function zs({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Ve(),{reservations:r=[],customers:i=[],technicians:l=[],projects:c=[]}=G(),u=Array.isArray(s)?s:l||[],d=new Map((c||[]).map(q=>[String(q.id),q])),v=document.getElementById(e);if(!v){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){v.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const x=t||as(),m=new Map(i.map(q=>[String(q.id),q])),S=new Map(u.map(q=>[String(q.id),q])),y=rs({reservations:r,filters:x,customersMap:m,techniciansMap:S,projectsMap:d});if(y.length===0){v.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}v.innerHTML=`<div class="reservations-grid">${os({entries:y,customersMap:m,techniciansMap:S,projectsMap:d})}</div>`,v.querySelectorAll('[data-action="details"]').forEach(q=>{const p=Number(q.dataset.reservationIndex);Number.isNaN(p)||q.addEventListener("click",()=>{typeof n=="function"&&n(p)})}),v.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const p=Number(q.dataset.reservationIndex);Number.isNaN(p)||q.addEventListener("click",b=>{b.stopPropagation(),typeof a=="function"&&a(p,b)})})}function Os(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=G(),l=s[e];if(!l)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=r.find(p=>String(p.id)===String(l.customerId)),u=l.projectId?i.find(p=>String(p.id)===String(l.projectId)):null,d=document.getElementById("reservation-details-body");if(d){const p=Ve()||[];d.innerHTML=is(l,c,p,e,u)}const v=document.getElementById("reservationDetailsModal"),x=()=>{v&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(v)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{x(),typeof t=="function"&&t(e,{reservation:l,customer:c,getEditContext:a})});const S=document.getElementById("reservation-details-delete-btn");S&&(S.onclick=()=>{x(),typeof n=="function"&&n(e,{reservation:l,customer:c})});const y=d?.querySelector('[data-action="open-project"]');y&&u&&y.addEventListener("click",()=>{x();const p=u?.id!=null?String(u.id):"",b=p?`projects.html?project=${encodeURIComponent(p)}`:"projects.html";window.location.href=b});const q=document.getElementById("reservation-details-export-btn");return q&&(q.onclick=async()=>{try{await Hs({reservation:l,customer:c,project:u})}catch(p){console.error("❌ [reservations] export to PDF failed",p),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),v&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(v).show(),!0}let Be=null,se=[],ct=null,Z={};function We(){return{index:Be,items:se}}function Ge(e,t){Be=typeof e=="number"?e:null,se=Array.isArray(t)?[...t]:[]}function bn(){Be=null,se=[],Fa()}function Us(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Le(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Vs(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((c,u)=>String(u.createdAt||u.start||"").localeCompare(String(c.createdAt||c.start||""))):[],l=[`<option value="">${Le(a)}</option>`];i.forEach(c=>{l.push(`<option value="${Le(c.id)}">${Le(c.title||a)}</option>`)}),r&&!i.some(c=>String(c.id)===r)&&l.push(`<option value="${Le(r)}">${Le(s)}</option>`),n.innerHTML=l.join(""),r?n.value=r:n.value=""}function gn(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Nt(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:l,projects:c}=G(),d=Qt()?.[e];if(!d){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Z={...Z,reservation:d,projects:c||[]},t?.(),Vs(c||[],d);const v=d.projectId&&c?.find?.(j=>String(j.id)===String(d.projectId))||null,{effectiveConfirmed:x,projectLinked:m}=ue(d,v),S=d.items?d.items.map(j=>({...j,equipmentId:j.equipmentId??j.equipment_id??j.id,barcode:W(j?.barcode)})):[];Ge(e,S);const y=o("reservations.list.unknownCustomer","غير معروف"),q=l?.find?.(j=>String(j.id)===String(d.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const p=document.getElementById("edit-res-id");p&&(p.value=d.reservationId||d.id);const b=document.getElementById("edit-res-customer");b&&(b.value=q?.customerName||y);const N=typeof a=="function"?a(d.start):{date:"",time:""},A=typeof a=="function"?a(d.end):{date:"",time:""};n?.("edit-res-start",N.date),n?.("edit-res-start-time",N.time),n?.("edit-res-end",A.date),n?.("edit-res-end-time",A.time);const D=document.getElementById("edit-res-notes");D&&(D.value=d.notes||"");const f=document.getElementById("edit-res-discount");f&&(f.value=h(d.discount??0));const g=document.getElementById("edit-res-discount-type");g&&(g.value=d.discountType||"percent");const I=document.getElementById("edit-res-tax");I&&(I.checked=d.projectId?!1:!!d.applyTax);const L=document.getElementById("edit-res-confirmed");L&&(L.checked=x,L.disabled=m,L.classList.toggle("disabled",m),L.closest(".form-check")?.classList.toggle("disabled",m));const M=document.getElementById("edit-res-paid");M&&(M.value=d.paid===!0||d.paid==="paid"?"paid":"unpaid"),Pa((d.technicians||[]).map(j=>String(j))),s?.(S),gn(),r?.();const $=document.getElementById("editReservationModal");ct=Us($,i),ct?.show?.()}async function Qs({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(Be===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),d=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",v=document.getElementById("edit-res-notes")?.value||"",x=h(document.getElementById("edit-res-discount")?.value||"0"),m=parseFloat(x)||0,S=document.getElementById("edit-res-discount-type")?.value||"percent",y=document.getElementById("edit-res-confirmed")?.checked||!1,q=document.getElementById("edit-res-paid")?.value||"unpaid",p=document.getElementById("edit-res-project")?.value||"",b=Ra();if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(P,Y)=>`${P}T${Y||"00:00"}`,A=N(l,c),D=N(u,d);if(A&&D&&new Date(A)>new Date(D)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const g=Qt()?.[Be];if(!g){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(se)||se.length===0&&b.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const P of se)if(we(P.barcode)){E(o("reservations.toast.updateEquipmentMaintenance","⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة"));return}const I=typeof t=="function"?t:()=>!1;for(const P of se){const Y=W(P.barcode);if(I(Y,A,D,g.id??g.reservationId)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const L=typeof n=="function"?n:()=>!1;for(const P of b)if(L(P,A,D,g.id??g.reservationId)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const M=document.getElementById("edit-res-tax"),$=Array.isArray(Z.projects)&&Z.projects.length?Z.projects:G().projects||[],j=p&&$.find(P=>String(P.id)===String(p))||null,O={...g,projectId:p?String(p):null,confirmed:y},{effectiveConfirmed:U,projectLinked:C,projectStatus:B}=ue(O,j),ee=C?!1:M?.checked||!1,J=Ht(se,m,S,ee,b,{start:A,end:D});let H=g.status??"pending";C?H=j?.status??B??H:["completed","cancelled"].includes(String(H).toLowerCase())||(H=y?"confirmed":"pending");const oe=zt({reservationCode:g.reservationCode??g.reservationId??null,customerId:g.customerId,start:A,end:D,status:H,title:g.title??null,location:g.location??null,notes:v,projectId:p?String(p):null,totalAmount:J,discount:m,discountType:S,applyTax:ee,paidStatus:q,confirmed:U,items:se.map(P=>({...P,equipmentId:P.equipmentId??P.id})),technicians:b});try{const P=await Ma(g.id||g.reservationId,oe);await _a(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),bn(),i?.({type:"updated",reservation:P}),s?.(),r?.(),ct?.hide?.()}catch(P){console.error("❌ [reservationsEdit] Failed to update reservation",P);const Y=Ot(P)?P.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(Y,"error")}}function ar(e={}){Z={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Z,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const l=document.getElementById("edit-res-tax");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>t?.()),l.dataset.listenerAttached="true");const c=document.getElementById("edit-res-project");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{gn();const m=document.getElementById("edit-res-confirmed");if(m){const S=Array.isArray(Z.projects)&&Z.projects.length?Z.projects:G().projects||[],y=c.value&&S.find(A=>String(A.id)===String(c.value))||null,p={...Z?.reservation??{},projectId:c.value||null,confirmed:m.checked},{effectiveConfirmed:b,projectLinked:N}=ue(p,y);m.checked=b,m.disabled=N,m.classList.toggle("disabled",N),m.closest(".form-check")?.classList.toggle("disabled",N)}t?.()}),c.dataset.listenerAttached="true");const u=document.getElementById("save-reservation-changes");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{Qs(Z).catch(m=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",m)})}),u.dataset.listenerAttached="true");const d=document.getElementById("edit-res-equipment-barcode");if(d&&!d.dataset.listenerAttached){d.addEventListener("keydown",y=>{y.key==="Enter"&&(y.preventDefault(),n?.(d))});let m=null;const S=()=>{if(clearTimeout(m),!d.value?.trim())return;const{start:y,end:q}=getEditReservationDateRange();!y||!q||(m=setTimeout(()=>{n?.(d)},150))};d.addEventListener("input",S),d.addEventListener("change",()=>n?.(d)),d.dataset.listenerAttached="true"}const v=document.getElementById("edit-res-equipment-description");v&&!v.dataset.listenerAttached&&(v.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),a?.(v,"edit"))}),v.dataset.listenerAttached="true");const x=document.getElementById("editReservationModal");x&&!x.dataset.cleanupAttached&&(x.addEventListener("hidden.bs.modal",()=>{bn(),t?.(),s?.([])}),x.dataset.cleanupAttached="true")}function qt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:je(e,n),end:je(t,a)}}function Ye(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","ريال"),s=o("reservations.create.equipment.imageAlt","صورة");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="6" class="text-center">${n}</td></tr>`,Pt(t);return}t.innerHTML=e.map((r,i)=>{const l=Pe(r),c=`${h(String(r.price??0))} ${a}`,u=h(String(r.qty||1)),d=l?`<img src="${l}" alt="${s}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${r.barcode||"-"}</td>
          <td>${r.desc||"-"}</td>
          <td>${c}</td>
          <td>${u}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${i}">🗑️</button></td>
        </tr>
      `}).join(""),Pt(t)}function Pt(e){!e||e.dataset.removeListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('[data-action="remove-edit-item"]');if(!n)return;t.preventDefault();const a=Number(n.dataset.itemIndex);Number.isNaN(a)||Ws(a)}),e.dataset.removeListenerAttached="true")}function Ee(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",Ee),a.dataset.listenerAttached="true"),ge(a);const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",l=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),u=l?!1:c?.checked||!1,d=a?.value||"unpaid";ge(a,d);const{items:v=[]}=We(),{start:x,end:m}=qt();e.innerHTML=Ha({items:v,discount:r,discountType:i,applyTax:u,paidStatus:d,start:x,end:m})}function Ws(e){if(e==null)return;const{index:t,items:n}=We();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Ge(t,a),Ye(a),Ee()}function Gs(e){const t=e?.value??"",n=W(t);if(!n)return;const a=mt(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}if(we(n)){E(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const s=W(n),{index:r,items:i=[]}=We();if(i.findIndex(S=>W(S.barcode)===s)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:c,end:u}=qt();if(!c||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:d=[]}=G(),v=r!=null&&d[r]||null,x=v?.id??v?.reservationId??null;if(qe(s,c,u,x)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=[...i,{id:a.id,equipmentId:a.id,barcode:s,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Ge(r,m),e&&(e.value=""),Ye(m),Ee()}function Ue(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Zt(t),a=W(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(we(a)){E(o("reservations.toast.equipmentMaintenanceStrict","⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز"));return}const{start:s,end:r}=qt();if(!s||!r){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:i,items:l=[]}=We();if(l.some(m=>W(m.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=G(),d=i!=null&&u[i]||null,v=d?.id??d?.reservationId??null;if(qe(a,s,r,v)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const x=[...l,{id:n.id,equipmentId:n.id,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ge(i,x),Ye(x),Ee(),e.value=""}function Ys(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ue(e))});const t=()=>{en(e.value,"edit-res-equipment-description-options")&&Ue(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Ee()});function Xs(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ot(e);return}Ue(e)}}function sr(){xe(),Ys()}function Ks(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}function rr(){return Ua().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=G()||{};Va(e||[]),tn()})}function wt(e=null){tn(),yn(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Js(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function dt(){return{populateEquipmentDescriptionLists:xe,setFlatpickrValue:Ks,splitDateTime:Mt,renderEditItems:Ye,updateEditReservationSummary:Ee,addEquipmentByDescription:Xs,addEquipmentToEditingReservation:Gs,addEquipmentToEditingByDescription:Ue,combineDateTime:je,hasEquipmentConflict:qe,hasTechnicianConflict:Ft,renderReservations:yn,handleReservationsMutation:wt,ensureModal:Js}}function yn(e="reservations-list",t=null){zs({containerId:e,filters:t,onShowDetails:qn,onConfirmReservation:xn})}function qn(e){return Os(e,{getEditContext:dt,onEdit:(t,{reservation:n})=>{Sn(t,n)},onDelete:wn})}function wn(e){return Rt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?za(e,{onAfterChange:wt}):!1:(Ca(),!1)}function xn(e){return Oa(e,{onAfterChange:wt})}function Sn(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Nt(e,dt());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Nt(e,dt());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Ia({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function or(){typeof window>"u"||(window.showReservationDetails=qn,window.deleteReservation=wn,window.confirmReservation=xn,window.editReservation=Sn)}export{nn as a,or as b,nr as c,ar as d,sr as e,tn as f,dt as g,F as h,tr as i,wt as j,rr as l,yn as r,qn as s,Ee as u};
