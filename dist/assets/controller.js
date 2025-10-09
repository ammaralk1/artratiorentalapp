import{w as ma,e as V,t as s,n as f,j as w,y as pa,f as ve,k as Dt,o as fa,u as va}from"./auth.js";import{G as U,H as lt,z as W,I as ba,J as Le,K as Et,L as Bt,M as ha,N as ga,O as Be,P as ge,Q as jt,R as ya,S as Nt,t as Rt,T as Pt,U as qa,V as wa,s as Oe,i as Mt,W as Ft,X as Sa,Y as xa,Z as Ea,d as $e,r as ce,c as _t,g as Ht,_ as Ia,$ as Ca,v as ka,D as Ta,a0 as $a,a1 as Aa,a2 as La,a3 as Da,w as Ba,y as ja}from"./projectsService.js";ma({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.create.equipment.table.code":"الكود","reservations.create.equipment.table.description":"الوصف","reservations.create.equipment.table.price":"السعر","reservations.create.equipment.table.image":"الصورة","reservations.create.equipment.table.delete":"حذف","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.headers.code":"الكود","reservations.edit.table.headers.description":"الوصف","reservations.edit.table.headers.price":"السعر","reservations.edit.table.headers.quantity":"الكمية","reservations.edit.table.headers.image":"الصورة","reservations.edit.table.headers.delete":"حذف","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"📊 تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"🔄 تحديث","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"متوسط الحجز —","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"📈 تطور الحجوزات","reservations.reports.chart.volume.hint":"آخر 6 أشهر","reservations.reports.chart.status.title":"📊 توزيع الحالات والدفع","reservations.reports.chart.status.hint":"نسب مئوية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.topCustomers.title":"👥 أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"📄 تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.topEquipment.title":"🎥 المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.create.equipment.table.code":"Code","reservations.create.equipment.table.description":"Description","reservations.create.equipment.table.price":"Price","reservations.create.equipment.table.image":"Image","reservations.create.equipment.table.delete":"Delete","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.headers.code":"Code","reservations.edit.table.headers.description":"Description","reservations.edit.table.headers.price":"Price","reservations.edit.table.headers.quantity":"Qty","reservations.edit.table.headers.image":"Image","reservations.edit.table.headers.delete":"Delete","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"📊 Performance Reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"🔄 Refresh","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Average reservation —","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"📈 Reservation trend","reservations.reports.chart.volume.hint":"Last 6 months","reservations.reports.chart.status.title":"📊 Status & payment breakdown","reservations.reports.chart.status.hint":"Percentages","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.topCustomers.title":"👥 Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"📄 Reservation Details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.topEquipment.title":"🎥 Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});function je(e={}){return e.image||e.imageUrl||e.img||""}function Na(e){if(!e)return null;const t=U(e),{equipment:n=[]}=V();return(n||[]).find(a=>U(a?.barcode)===t)||null}function dt(e){const t=U(e);if(!t)return null;const{equipment:n=[]}=V();return(n||[]).find(a=>U(a?.barcode)===t)||null}function ye(e){return dt(e)?.status==="صيانة"}let Je=null,zt=[],et=new Map,tt=new Map;function Ot(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ut(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function mt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ut(e,t,{allowPartial:n=!1}={}){const a=W(t);if(!a)return null;const i=e.get(a);if(i)return i;if(!n)return null;const r=[];return e.forEach((o,c)=>{c.includes(a)&&r.push(o)}),r.length===1?r[0]:null}function nt(e,t={}){return Ut(et,e,t)}function at(e,t={}){return Ut(tt,e,t)}function be(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function Vt(e){zt=Array.isArray(e)?[...e]:[]}function pt(){return zt}function ft(e){return e&&pt().find(t=>String(t.id)===String(e))||null}function It(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||s("projects.fallback.untitled","مشروع بدون اسم")}function Ra(){const e=document.getElementById("res-company-share");if(!e||!e.checked)return null;const t=e.dataset.companyShare??e.value??Et,n=f(String(t).replace("%","").trim()),a=parseFloat(n);return Number.isFinite(a)?a:Et}function Pa(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ct(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const i=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${i}`}return""}function kt(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ae({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:i}=ut();if(!n||!a||!i)return;const r=lt()||[],o=s("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=s("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",o);const l=new Set;et=new Map;const m=r.filter(u=>u&&u.id!=null).map(u=>({id:String(u.id),label:kt(u)||c})).filter(u=>{if(!u.label)return!1;const S=W(u.label);return!S||l.has(S)?!1:(l.add(S),et.set(S,u),!0)}).sort((u,S)=>u.label.localeCompare(S.label,void 0,{sensitivity:"base"}));i.innerHTML=m.map(u=>`<option value="${Ot(u.label)}"></option>`).join("");const d=t?"":n.value,v=e?String(e):a.value?String(a.value):"",y=v?r.find(u=>String(u.id)===v):null;if(y){const u=kt(y)||c;a.value=String(y.id),n.value=u,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":d}function Ne({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:i,list:r}=mt();if(!a||!i||!r)return;const o=Array.isArray(t)?t:pt()||[],c=s("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...o].filter(g=>g&&g.id!=null).sort((g,q)=>String(q.createdAt||q.start||"").localeCompare(String(g.createdAt||g.start||""))),m=n?"":a.value,d=s("projects.fallback.untitled","مشروع بدون اسم"),v=new Set;tt=new Map;const y=l.map(g=>{const q=It(g)||d;return{id:String(g.id),label:q}}).filter(g=>{if(!g.label)return!1;const q=W(g.label);return!q||v.has(q)?!1:(v.add(q),tt.set(q,g),!0)});r.innerHTML=y.map(g=>`<option value="${Ot(g.label)}"></option>`).join("");const u=e?String(e):i.value?String(i.value):"",S=u?l.find(g=>String(g.id)===u):null;if(S){const g=It(S)||d;i.value=String(S.id),a.value=g,a.dataset.selectedId=String(S.id)}else i.value="",a.dataset.selectedId="",a.value=n?"":m}function Me(e,t,n){const{date:a,time:i}=Bt(n),r=document.getElementById(e),o=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(o){if(i)if(o._flatpickr){const c=o._flatpickr.config?.dateFormat||"H:i";o._flatpickr.setDate(i,!1,c)}else o.value=i;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}}function Qt(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Ne({selectedValue:a});const r=(lt()||[]).find(d=>String(d.id)===String(e.clientId)),o=r?.id!=null?String(r.id):"";ae(o?{selectedValue:o}:{selectedValue:"",resetInput:!0});const c=Ct(e,"start"),l=Ct(e,"end");c&&Me("res-start","res-start-time",c),l&&Me("res-end","res-end-time",l);const m=document.getElementById("res-notes");m&&e.description&&(t||!m.value)&&(m.value=e.description),he(),M()}function Wt({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:V(),i=Array.isArray(a)?a:[];Vt(i);const r=t!=null?String(t):n.value?String(n.value):"";Ne({selectedValue:r,projectsList:i}),he(),M()}function he(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function vt(){const{input:e,hidden:t}=mt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const i=e.value.trim(),r=i?at(i,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const o=ft(r.id);o?Qt(o,{skipProjectSelectUpdate:!0}):(he(),M())}else t.value="",e.dataset.selectedId="",he(),M()};e.addEventListener("input",()=>{const a=e.value.trim(),i=a?at(a):null;i?(t.value=String(i.id),e.dataset.selectedId=String(i.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function bt(){const{input:e,hidden:t}=ut();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const i=e.value.trim(),r=i?nt(i,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),M()};e.addEventListener("input",()=>{const a=e.value.trim(),i=a?nt(a):null;i?(t.value=String(i.id),e.dataset.selectedId=String(i.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ma(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const c=decodeURIComponent(t);n=JSON.parse(c)}catch(c){console.warn("⚠️ [reservations/createForm] Failed to decode project context",c)}e.delete("reservationProjectContext");const a=e.toString(),i=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,i),!n||!n.projectId)return;document.getElementById("res-project")&&(Ne({selectedValue:String(n.projectId)}),he());const o=ft(n.projectId);if(o?Qt(o,{forceNotes:!!n.forceNotes}):M(),n.start&&Me("res-start","res-start-time",n.start),n.end&&Me("res-end","res-end-time",n.end),n.customerId){const l=(lt()||[]).find(m=>String(m.id)===String(n.customerId));l?.id!=null&&ae({selectedValue:String(l.id)})}else ae({selectedValue:""})}function Ue(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Le(e,n),end:Le(t,a)}}function Yt(e){const t=W(e);if(!t)return null;const n=Ft()||[],a=n.find(i=>W(i?.desc||i?.description||"")===t);return a||n.find(i=>W(i?.desc||i?.description||"").includes(t))||null}function Gt(e,t="equipment-description-options"){const n=W(e);if(!n)return!1;const a=document.getElementById(t);return a&&a.options&&Array.from(a.options).some(o=>W(o.value)===n)?!0:(Ft()||[]).some(r=>W(r?.desc||r?.description||"")===n)}function qe(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),{equipment:n=[]}=V(),a=Array.isArray(n)?n:[];Ea(a);const r=Array.from(new Set(a.map(o=>o?.desc||o?.description||"").filter(Boolean))).sort((o,c)=>o.localeCompare(c,"ar",{sensitivity:"base"})).map(o=>`<option value="${o}"></option>`).join("");e&&(e.innerHTML=r),t&&(t.innerHTML=r)}function Xe(e,t){const n=U(e);if(!n)return!1;const{start:a,end:i}=Ue();if(!a||!i)return w(s("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Be().some(c=>U(c.barcode)===n))return w(s("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(ge(n,a,i))return w(s("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const o=dt(n);return o?ye(o.barcode)?(w(s("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")),!1):(jt({id:o.id,equipmentId:o.id,barcode:n,desc:o.desc,qty:1,price:o.price,image:je(o)}),t&&(t.value=""),we(),M(),w(s("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(w(s("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1)}function st(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Yt(t);if(!n){w(s("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(Na(n.barcode)?.status==="صيانة"){w(s("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const i=U(n.barcode);if(!i){w(s("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:n.id,equipmentId:n.id,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:je(n)},{start:o,end:c}=Ue();if(!o||!c){w(s("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Be().some(d=>U(d.barcode)===i)){w(s("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(ge(i,o,c)){w(s("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}if(ye(i)){w(s("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}jt(r),we(),M(),e.value=""}function Fa(){qe();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),st(e))});const t=()=>{Gt(e.value,"equipment-description-options")&&st(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function we(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Be(),a=s("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),i=s("reservations.create.summary.currency","ريال"),r=s("reservations.create.equipment.imageAlt","صورة");if(n.length===0){t.innerHTML=`<tr><td colspan="5">${a}</td></tr>`;return}t.innerHTML=n.map((o,c)=>{const l=je(o),m=`${f(String(o.price??0))} ${i}`,d=l?`<img src="${l}" alt="${r}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${o.barcode||"-"}</td>
          <td>${o.desc}</td>
          <td>${m}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${c}">🗑️</button></td>
        </tr>
      `}).join("")}function M(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(f(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,i=document.getElementById("res-tax"),r=a?!1:i?.checked||!1,o=document.getElementById("res-payment-status")?.value||"unpaid",{start:c,end:l}=Ue(),m=Ra(),d=document.getElementById("res-payment-status");be(d,o),ba({selectedItems:Be(),discount:t,discountType:n,applyTax:r,paidStatus:o,start:c,end:l,companySharePercent:m})}function _a(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=f(r.target.value),M()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",M),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",M),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",M),a.dataset.listenerAttached="true");const i=document.getElementById("res-payment-status");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{be(i),M()}),i.dataset.listenerAttached="true"),be(i)}function Ha(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const i=e.value?.trim();if(!i){M();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=i,t.dataset.syncedWithStart="true",t.dataset.syncedValue=i,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),M()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Tt(){const{input:e,hidden:t}=ut(),{input:n,hidden:a}=mt(),{customers:i}=V();let r=t?.value?String(t.value):"";if(!r&&e?.value){const I=nt(e.value,{allowPartial:!0});I&&(r=String(I.id),t&&(t.value=r),e.value=I.label,e.dataset.selectedId=r)}const o=i.find(I=>String(I.id)===r);if(!o){w(s("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=o.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const I=at(n.value,{allowPartial:!0});I&&(l=String(I.id),a&&(a.value=l),n.value=I.label,n.dataset.selectedId=l)}const m=document.getElementById("res-start").value,d=document.getElementById("res-end").value,v=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!m||!d){w(s("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const u=`${m}T${v}`,S=`${d}T${y}`,g=new Date(u),q=new Date(S);if(Number.isNaN(g.getTime())||Number.isNaN(q.getTime())||g>=q){w(s("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const p=ya(),b=Be();if(b.length===0&&p.length===0){w(s("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",k=parseFloat(f(document.getElementById("res-discount")?.value))||0,$=document.getElementById("res-discount-type")?.value||"percent",R=document.getElementById("res-payment-status")?.value||"unpaid",x=l?ft(l):null,D=Pa(x);if(l&&!x){w(s("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const I of b)if(ye(I.barcode)){w(s("reservations.toast.cannotCreateEquipmentMaintenance","⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة"));return}for(const I of b){const H=U(I.barcode);if(ge(H,u,S)){w(s("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const I of p)if(Nt(I,u,S)){w(s("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const T=document.getElementById("res-tax"),_=!!l?!1:T?.checked||!1,N=Rt(b,k,$,_,p,{start:u,end:S}),X=pa(),Y=Pt({reservationCode:X,customerId:c,start:u,end:S,status:D?"confirmed":"pending",title:null,location:null,notes:A,projectId:l||null,totalAmount:N,discount:k,discountType:$,applyTax:_,paidStatus:R,confirmed:D,items:b.map(I=>({...I,equipmentId:I.equipmentId??I.id})),technicians:p});try{const I=await qa(Y);wa(),qe(),Oe(),za(),w(s("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Je=="function"&&Je({type:"created",reservation:I})}catch(I){console.error("❌ [reservations/createForm] Failed to create reservation",I);const H=Mt(I)?I.message:s("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");w(H,"error")}}function za(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ae({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const i=document.getElementById("res-project"),r=document.getElementById("res-project-input");i&&(i.value=""),r&&(r.value="",r.dataset.selectedId=""),Ne({selectedValue:"",resetInput:!0});const o=document.getElementById("equipment-description");o&&(o.value="");const c=document.getElementById("res-payment-status");c&&(c.value="unpaid",be(c,"unpaid")),Sa(),xa([]),we(),he(),M()}function Oa(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('button[data-action="remove-item"]');if(!n)return;const a=Number(n.dataset.index);ga(a),we(),M()}),e.dataset.listenerAttached="true")}function Ua(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),Xe(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const a=e.value;if(!a?.trim())return;const{start:i,end:r}=Ue();!i||!r||(t=setTimeout(()=>{Xe(a,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>Xe(e.value,e)),e.dataset.listenerAttached="true"}function Va(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Tt()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Tt()}),t.dataset.listenerAttached="true")}function _s({onAfterSubmit:e}={}){Je=typeof e=="function"?e:null;const{customers:t,projects:n}=V();ha(t||[]),ae(),bt(),Vt(n||[]),Wt({projectsList:n}),vt(),qe(),Fa(),Ha(),_a(),Oa(),Ua(),Va(),Ma(),M(),we()}function Kt(){qe(),Wt(),ae(),bt(),vt(),we(),M()}if(typeof document<"u"){const e=()=>{ae(),Ne({projectsList:pt()}),bt(),vt(),M()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function Xt(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:oe(t),endDate:oe(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),i=a===0?6:a-1;n.setDate(n.getDate()-i);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:oe(n),endDate:oe(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:oe(n),endDate:oe(a)}}return e==="upcoming"?{startDate:oe(t),endDate:""}:{startDate:"",endDate:""}}function Qa(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),i=document.getElementById("reservation-status-filter");let r=f(t?.value||"").trim(),o=f(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Fe(t),Fe(n),r="",o=""),!r&&!o&&c){const m=Xt(c);r=m.startDate,o=m.endDate}return{searchTerm:W(e?.value||""),startDate:r,endDate:o,status:i?.value||"",quickRange:c}}function Hs(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=f(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const i=document.getElementById("filter-end-date");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Wa(r.value),t()}),r.dataset.listenerAttached="true");const o=document.getElementById("reservation-status-filter");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",t),o.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Fe(a),Fe(i),r&&(r.value=""),o&&(o.value=""),t()}),c.dataset.listenerAttached="true")}function Wa(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:i}=Xt(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?i?n._flatpickr.setDate(i,!1,"Y-m-d"):n._flatpickr.clear():n.value=i}function oe(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Fe(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Ya({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:i}){const r=e.map((p,b)=>({reservation:p,index:b})),o=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",m=t.startDate||"",d=t.endDate||"",v=t.status||"",y=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,u=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,S=m?new Date(`${m}T00:00:00`):null,g=d?new Date(`${d}T23:59:59`):null,q=r.filter(({reservation:p})=>{const b=n.get(String(p.customerId)),A=i?.get?.(String(p.projectId)),k=p.start?new Date(p.start):null,$=$e(p),{effectiveConfirmed:R}=ce(p,A);if(y!=null&&String(p.customerId)!==String(y)||u!=null&&!(Array.isArray(p.technicians)?p.technicians.map(_=>String(_)):[]).includes(String(u))||v==="confirmed"&&!R||v==="pending"&&R||v==="completed"&&!$||S&&k&&k<S||g&&k&&k>g||c&&!W([p.reservationId,p.id].filter(Boolean).map(String).join(" ")).includes(c)||l&&!W(b?.customerName||"").includes(l))return!1;if(!o)return!0;const x=p.items?.map?.(j=>`${j.barcode} ${j.desc}`).join(" ")||"",D=(p.technicians||[]).map(j=>a.get(String(j))?.name).filter(Boolean).join(" ");return W([p.reservationId,b?.customerName,p.notes,x,D,A?.title].filter(Boolean).join(" ")).includes(o)});return q.sort((p,b)=>{const A=$e(p.reservation),k=$e(b.reservation);if(A!==k)return A?1:-1;const $=p.reservation.start?new Date(p.reservation.start).getTime():0;return(b.reservation.start?new Date(b.reservation.start).getTime():0)-$}),q}function Ga({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const i=s("reservations.create.summary.currency","ريال"),r=s("reservations.list.taxIncludedShort","(شامل الضريبة)"),o=s("reservations.list.unknownCustomer","غير معروف"),c=s("reservations.list.noNotes","لا توجد ملاحظات"),l=s("reservations.list.itemsCountShort","{count} عنصر"),m=s("reservations.list.crew.separator","، "),d=s("reservations.list.status.confirmed","✅ مؤكد"),v=s("reservations.list.status.pending","⏳ غير مؤكد"),y=s("reservations.list.payment.paid","💳 مدفوع"),u=s("reservations.list.payment.unpaid","💳 غير مدفوع"),S=s("reservations.list.actions.confirm","✔️ تأكيد"),g=s("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=s("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),p={client:s("reservations.list.labels.client","👤 العميل"),project:s("reservations.list.labels.project","📁 المشروع"),start:s("reservations.list.labels.start","🗓️ بداية الحجز"),end:s("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:s("reservations.list.labels.cost","💵 التكلفة"),equipment:s("reservations.list.labels.equipment","📦 المعدات"),crew:s("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:b,index:A})=>{const k=t.get(String(b.customerId)),$=b.projectId?a?.get?.(String(b.projectId)):null,R=$e(b),x=b.paid===!0||b.paid==="paid",{effectiveConfirmed:D,projectLinked:T}=ce(b,$),j=D?"status-confirmed":"status-pending",_=x?"status-paid":"status-unpaid";let N=`<span class="reservation-chip status-chip ${j}">${D?d:v}</span>`,X=`<span class="reservation-chip status-chip ${_}">${x?y:u}</span>`,Y=x?" tile-paid":" tile-unpaid";R&&(Y+=" tile-completed");let I="";R&&(N=`<span class="reservation-chip status-chip status-completed">${d}</span>`,X=`<span class="reservation-chip status-chip status-completed">${x?y:u}</span>`,I=` data-completed-label="${s("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const H=!T&&!D?`<button class="tile-confirm" data-reservation-index="${A}" data-action="confirm">${S}</button>`:"",se=H?`<div class="tile-actions">${H}</div>`:"",le=b.items?.length||0,z=(b.technicians||[]).map(F=>n.get(String(F))).filter(Boolean),te=z.map(F=>F.name).join(m)||"—",L=f(String(b.reservationId??"")),G=b.start?f(ve(b.start)):"-",xe=b.end?f(ve(b.end)):"-",Ee=f(String(b.cost??0)),Ie=f(String(le)),Ce=b.notes?f(b.notes):c,B=l.replace("{count}",Ie),Z=b.applyTax?`<small>${r}</small>`:"";let ne=g;return b.projectId&&(ne=$?.title?f($.title):q),`
      <div class="${H?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${Y}"${I} data-reservation-index="${A}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${L}</div>
          <div class="tile-badges">
            ${N}
            ${X}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${p.client}</span>
            <span class="tile-value">${k?.customerName||o}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.project}</span>
            <span class="tile-value">${ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.start}</span>
            <span class="tile-value tile-inline">${G}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.end}</span>
            <span class="tile-value tile-inline">${xe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.cost}</span>
            <span class="tile-value">${Ee} ${i} ${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.equipment}</span>
            <span class="tile-value">${B}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${p.crew}</span>
            <span class="tile-value">${z.length?te:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ce}</span>
          </div>
        </div>
        ${se}
      </div>
    `}).join("")}function Ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ka(e,t,n=[],a,i=null){const{projectLinked:r,effectiveConfirmed:o}=ce(e,i),c=e.paid===!0||e.paid==="paid",l=$e(e),m=e.items||[],{technicians:d=[]}=V(),v=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(d)?d:[]),y=new Map;v.forEach(E=>{if(!E||E.id==null)return;const P=String(E.id),Q=y.get(P)||{};y.set(P,{...Q,...E})});const u=(e.technicians||[]).map(E=>y.get(String(E))).filter(Boolean),S=Dt(),g=_t(e.start,e.end),q=(E={})=>{const P=[E.dailyWage,E.daily_rate,E.dailyRate,E.wage,E.rate];for(const Q of P){if(Q==null)continue;const pe=parseFloat(f(String(Q)));if(Number.isFinite(pe))return pe}return 0},b=m.reduce((E,P)=>E+(P.qty||1)*(P.price||0),0)*g,k=u.reduce((E,P)=>E+q(P),0)*g,$=b+k,R=parseFloat(e.discount)||0,x=e.discountType==="amount"?R:$*(R/100),D=Math.max(0,$-x),T=r?!1:e.applyTax,j=T?D*.15:0,_=Number(e.cost),N=Number.isFinite(_),X=D+j,Y=r?Math.round(X):N?_:Math.round(X),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,H=I!=null?parseFloat(f(String(I))):NaN,z=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(H)&&H>0)&&Number.isFinite(H)?H:0,te=z>0?Math.max(0,(Number.isFinite(Y)?Y:0)*(z/100)):0,L=f(String(e.reservationId??e.id??"")),G=e.start?f(ve(e.start)):"-",xe=e.end?f(ve(e.end)):"-",Ee=f(String(u.length)),Ie=f(b.toFixed(2)),Ce=f(x.toFixed(2)),B=f(D.toFixed(2)),Z=f(j.toFixed(2)),ne=f((Y??0).toFixed(2)),de=f(String(g)),F=s("reservations.create.summary.currency","ريال"),ue=s("reservations.details.labels.discount","الخصم"),Ye=s("reservations.details.labels.tax","الضريبة (15%)"),pn=s("reservations.details.labels.crewTotal","إجمالي الفريق"),fn=s("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),vn=s("reservations.details.labels.duration","عدد الأيام"),bn=s("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me={index:"#",code:s("reservations.details.table.headers.code","الكود"),description:s("reservations.details.table.headers.description","الوصف"),quantity:s("reservations.details.table.headers.quantity","الكمية"),price:s("reservations.details.table.headers.price","السعر"),image:s("reservations.details.table.headers.image","الصورة")},hn=s("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),gn=s("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),yn=s("reservations.details.technicians.roleUnknown","غير محدد"),qn=s("reservations.details.technicians.phoneUnknown","غير متوفر"),wn=s("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Sn=s("reservations.list.status.confirmed","✅ مؤكد"),xn=s("reservations.list.status.pending","⏳ غير مؤكد"),En=s("reservations.list.payment.paid","💳 مدفوع"),In=s("reservations.list.payment.unpaid","💳 غير مدفوع"),Cn=s("reservations.list.status.completed","📁 منتهي"),kn=s("reservations.details.labels.id","🆔 رقم الحجز"),Tn=s("reservations.details.section.bookingInfo","بيانات الحجز"),$n=s("reservations.details.section.paymentSummary","ملخص الدفع"),An=s("reservations.details.labels.finalTotal","المجموع النهائي"),Ln=s("reservations.details.section.crew","😎 الفريق الفني"),Dn=s("reservations.details.crew.count","{count} عضو"),Bn=s("reservations.details.section.items","📦 المعدات المرتبطة"),jn=s("reservations.details.items.count","{count} عنصر"),Nn=s("reservations.details.actions.edit","✏️ تعديل"),Rn=s("reservations.details.actions.delete","🗑️ حذف"),Pn=s("reservations.details.labels.customer","العميل"),Mn=s("reservations.details.labels.contact","رقم التواصل"),Fn=s("reservations.details.labels.project","📁 المشروع المرتبط");s("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const _n=s("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Hn=s("reservations.details.actions.openProject","📁 فتح المشروع"),zn=s("reservations.details.labels.start","بداية الحجز"),On=s("reservations.details.labels.end","نهاية الحجز"),Un=s("reservations.details.labels.notes","ملاحظات"),Vn=s("reservations.list.noNotes","لا توجد ملاحظات"),Qn=s("reservations.details.labels.itemsCount","عدد المعدات"),Wn=s("reservations.details.labels.itemsTotal","إجمالي المعدات"),Yn=s("reservations.details.labels.paymentStatus","حالة الدفع"),Gn=s("reservations.list.unknownCustomer","غير معروف"),qt=c?En:In,wt=m.length,Kn=f(String(wt)),St=jn.replace("{count}",Kn),Xn=Dn.replace("{count}",Ee),Zn=e.notes?f(e.notes):Vn,Jn=f(k.toFixed(2)),ea=f(String(z)),ta=f(te.toFixed(2)),na=`${ea}% (${ta} ${F})`,re=[{icon:"💳",label:Yn,value:qt},{icon:"📦",label:Qn,value:St},{icon:"⏱️",label:vn,value:de},{icon:"💼",label:Wn,value:`${Ie} ${F}`}];re.push({icon:"😎",label:pn,value:`${Jn} ${F}`}),x>0&&re.push({icon:"💸",label:ue,value:`${Ce} ${F}`}),re.push({icon:"📊",label:fn,value:`${B} ${F}`}),T&&j>0&&re.push({icon:"🧾",label:Ye,value:`${Z} ${F}`}),z>0&&re.push({icon:"🏦",label:bn,value:na}),re.push({icon:"💰",label:An,value:`${ne} ${F}`});const aa=re.map(({icon:E,label:P,value:Q})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${E} ${P}</span>
      <span class="summary-details-value">${Q}</span>
    </div>
  `).join(""),xt=[{text:o?Sn:xn,className:o?"status-confirmed":"status-pending"},{text:qt,className:c?"status-paid":"status-unpaid"}];l&&xt.push({text:Cn,className:"status-completed"});const sa=xt.map(({text:E,className:P})=>`<span class="status-chip ${P}">${E}</span>`).join(""),ke=(E,P,Q)=>`
    <div class="res-info-row">
      <span class="label">${E} ${P}</span>
      <span class="value">${Q}</span>
    </div>
  `;let Ge="";if(e.projectId){let E=Ze(_n);if(i){const P=i.title||s("projects.fallback.untitled","مشروع بدون اسم");E=`${Ze(P)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${i.id}">${Ze(Hn)}</button>`}Ge=`
      <div class="res-info-row">
        <span class="label">📁 ${Fn}</span>
        <span class="value">${E}</span>
      </div>
    `}const ie=[];ie.push(ke("👤",Pn,t?.customerName||Gn)),ie.push(ke("📞",Mn,t?.phone||"—")),ie.push(ke("🗓️",zn,G)),ie.push(ke("🗓️",On,xe)),ie.push(ke("📝",Un,Zn)),Ge&&ie.push(Ge);const ra=ie.join(""),ia=wt?m.map((E,P)=>{const Q=je(E),pe=f(String(E.barcode||"-")),Ke=f(String(E.qty||1)),Re=f(String(E.price||0)),da=f(String(P+1)),ua=Q?`<img src="${Q}" alt="${E.desc||""}" class="reservation-modal-item-thumb">`:"-";return`
          <tr>
            <td>${da}</td>
            <td>${pe}</td>
            <td>${E.desc||"-"}</td>
            <td>${Ke}</td>
            <td>${Re} ${F}</td>
            <td>${ua}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${hn}</td></tr>`,oa=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${me.index}</th>
            <th>${me.code}</th>
            <th>${me.description}</th>
            <th>${me.quantity}</th>
            <th>${me.price}</th>
            <th>${me.image}</th>
          </tr>
        </thead>
        <tbody>${ia}</tbody>
      </table>
    </div>
  `,ca=u.map((E,P)=>{const Q=f(String(P+1)),pe=E.role||yn,Ke=E.phone||qn,Re=E.wage?wn.replace("{amount}",f(String(E.wage))).replace("{currency}",F):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${Q}</span>
          <span class="technician-name">${E.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${pe}</div>
          <div>📞 ${Ke}</div>
          ${Re?`<div>💰 ${Re}</div>`:""}
        </div>
      </div>
    `}).join(""),la=u.length?`<div class="reservation-technicians-grid">${ca}</div>`:`<ul class="reservation-modal-technicians"><li>${gn}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${kn}</span>
          <strong>${L}</strong>
        </div>
        <div class="status-chips">
          ${sa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Tn}</h6>
          ${ra}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${$n}</h6>
            <div class="summary-details">
              ${aa}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ln}</span>
          <span class="count">${Xn}</span>
        </div>
        ${la}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Bn}</span>
          <span class="count">${St}</span>
        </div>
        ${oa}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${s("reservations.details.actions.exportPdf","📄 تصدير PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Nn}</button>
        ${S?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Rn}</button>`:""}
      </div>
    </div>
  `}const Xa=`@page {
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
  flex: 1;
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

.quote-page .quote-section--table:first-of-type {
  padding-top: 0;
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
    width: auto;
    min-height: auto;
    padding: 0;
  }
}
`,Zt="reservations.quote.sequence",J={logoUrl:"https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Za=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Jt=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ja="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",es=Xa.trim(),ts=/color\([^)]*\)/gi,_e=/(color\(|color-mix\()/i,ns=document.createElement("canvas"),Pe=ns.getContext("2d"),en=96,tn=25.4,as=210,ss=297,rs=Math.round(as/tn*en),is=Math.round(ss/tn*en);let O=null,C=null,fe=1;function rt(e,t="#000"){if(!Pe||!e)return t;try{return Pe.fillStyle="#000",Pe.fillStyle=e,Pe.fillStyle||t}catch{return t}}function os(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const i=rt(n)||"#000";try{return t(i)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Ae(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(ts,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}function cs(e){if(!e)return;Ae(e),Ae(e?.documentElement),Ae(e?.body);const t=e?.defaultView||window;ht(e?.documentElement||e,t)}const ls=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function ht(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const i=t.getComputedStyle(a);if(!i)return;ls.forEach(o=>{const c=i[o];if(c&&_e.test(c)){const l=o.replace(/[A-Z]/g,v=>`-${v.toLowerCase()}`),m=o==="backgroundColor"?"#ffffff":i.color||"#000000",d=rt(c,m);a.style.setProperty(l,d,"important")}});const r=i.backgroundImage;if(r&&_e.test(r)){const o=rt(i.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",o,"important")}})}function it(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const o=a[r];if(o&&_e.test(o)){const c=r.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),l=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(c,l,"important")}});const i=a.backgroundImage;i&&_e.test(i)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function ds(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const i=document.createElement("script");i.src=e,i.async=!0,i.onload=()=>t(),i.onerror=r=>n(r),document.head.appendChild(i)})}async function us(){window.html2pdf||await ds(Ja),os()}function h(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ms(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ps(){const e=window.localStorage?.getItem?.(Zt),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function fs(){const t=ps()+1;return{sequence:t,quoteNumber:ms(t)}}function vs(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Zt,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function bs(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function hs(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(f(String(n)));if(Number.isFinite(a))return a}return 0}function gs(e){const t=Oe()||[],{technicians:n=[]}=V(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),i=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const o=String(r.id),c=i.get(o)||{};i.set(o,{...c,...r})}),(e.technicians||[]).map(r=>i.get(String(r))).filter(Boolean)}function ys(e,t,n){const{projectLinked:a}=ce(e,n),i=_t(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((R,x)=>R+(Number(x?.qty)||1)*(Number(x?.price)||0),0)*i,m=t.reduce((R,x)=>R+hs(x),0)*i,d=c+m,v=parseFloat(e.discount)||0,y=e.discountType==="amount"?v:d*(v/100),u=Math.max(0,d-y),g=(a?!1:e.applyTax)?u*.15:0,q=Number(e.cost),p=Number.isFinite(q),b=u+g,A=a?Math.round(b):p?q:Math.round(b),k={equipmentTotal:c,crewTotal:m,discountAmount:y,taxAmount:g,finalTotal:A??0},$={equipmentTotal:f(c.toFixed(2)),crewTotal:f(m.toFixed(2)),discountAmount:f(y.toFixed(2)),taxAmount:f(g.toFixed(2)),finalTotal:f((A??0).toFixed(2))};return{totals:k,totalsDisplay:$,rentalDays:i}}function nn({reservation:e,customer:t,project:n,technicians:a,totalsDisplay:i,rentalDays:r,currencyLabel:o,sections:c,quoteNumber:l,quoteDate:m}){const d=f(String(e?.reservationId??e?.id??"")),v=e.start?f(ve(e.start)):"-",y=e.end?f(ve(e.end)):"-",u=t?.customerName||t?.full_name||t?.name||"-",S=t?.phone||"-",g=t?.email||"-",q=t?.company||t?.company_name||"-",p=f(S),b=n?.title||n?.name||s("reservations.details.project.none","غير مرتبط بمشروع"),A=n?.code||n?.projectCode||"",k=f(String(r)),$=e?.notes||"",R=a.length?a.map((B,Z)=>{const ne=f(String(Z+1)),de=h(B?.name||B?.full_name||"-"),F=h(B?.role||s("reservations.details.technicians.roleUnknown","غير محدد")),ue=h(B?.phone||s("reservations.details.technicians.phoneUnknown","غير متوفر"));return`<tr>
          <td>${ne}</td>
          <td>${de}</td>
          <td>${F}</td>
          <td>${ue}</td>
        </tr>`}).join(""):`<tr><td colspan="4" class="empty">${h(s("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,x=Array.isArray(e.items)&&e.items.length?e.items.map((B,Z)=>{const ne=f(String(Z+1)),de=h(B?.barcode||"-"),F=h(B?.desc||B?.description||"-"),ue=f(String(B?.qty||1)),Ye=f(Number(B?.price||0).toFixed(2));return`<tr>
          <td>${ne}</td>
          <td>${de}</td>
          <td>${F}</td>
          <td>${ue}</td>
          <td>${Ye}</td>
        </tr>`}).join(""):`<tr>
        <td colspan="5" class="empty">${h(s("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td>
      </tr>`,D=B=>c?.has?.(B),T=(B,Z)=>`<div class="info-plain__item">${h(B)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${h(Z)}</strong></div>`,j=D("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${h(s("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        <div class="info-plain">
          ${T(s("reservations.details.labels.customer","العميل"),u)}
          ${T(s("reservations.details.labels.company","الشركة"),q)}
          ${T(s("reservations.details.labels.phone","الهاتف"),p)}
          ${T(s("reservations.details.labels.email","البريد"),g)}
        </div>
      </section>`:"",_=D("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${h(s("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        <div class="info-plain">
          ${T(s("reservations.details.labels.reservationId","رقم الحجز"),d||"-")}
          ${T(s("reservations.details.labels.start","بداية الحجز"),v)}
          ${T(s("reservations.details.labels.end","نهاية الحجز"),y)}
          ${T(s("reservations.details.labels.duration","عدد الأيام"),k)}
        </div>
      </section>`:"",N=D("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${h(s("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        <div class="info-plain">
          ${T(s("reservations.details.labels.project","المشروع"),b)}
          ${A?T(s("reservations.details.labels.code","الرمز"),A):""}
        </div>
      </section>`:"",X=D("financialSummary")?`<section class="quote-section quote-section--financial">
        <div class="totals-block">
          <h3>${h(s("reservations.details.labels.summary","الملخص المالي"))}</h3>
          <div class="totals-list">
            <div class="totals-item"><span>${h(s("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span><span>${i.equipmentTotal} ${o}</span></div>
            <div class="totals-item"><span>${h(s("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span><span>${i.crewTotal} ${o}</span></div>
            <div class="totals-item"><span>${h(s("reservations.details.labels.discount","الخصم"))}</span><span>${i.discountAmount} ${o}</span></div>
            <div class="totals-item"><span>${h(s("reservations.details.labels.tax","الضريبة"))}</span><span>${i.taxAmount} ${o}</span></div>
            <div class="totals-item is-final"><span>${h(s("reservations.details.labels.total","الإجمالي النهائي"))}</span><span>${i.finalTotal} ${o}</span></div>
          </div>
        </div>
      </section>`:"",Y=D("items")?`<section class="quote-section quote-section--table">
        <h3>${h(s("reservations.details.items.title","المعدات"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${h(s("reservations.details.table.headers.code","الكود"))}</th>
              <th>${h(s("reservations.details.table.headers.description","الوصف"))}</th>
              <th>${h(s("reservations.details.table.headers.quantity","الكمية"))}</th>
              <th>${h(s("reservations.details.table.headers.price","السعر"))}</th>
            </tr>
          </thead>
          <tbody>${x}</tbody>
        </table>
      </section>`:"",I=D("crew")?`<section class="quote-section quote-section--table">
        <h3>${h(s("reservations.details.technicians.title","طاقم العمل"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${h(s("reservations.details.technicians.name","الاسم"))}</th>
              <th>${h(s("reservations.details.technicians.role","الدور"))}</th>
              <th>${h(s("reservations.details.technicians.phone","الهاتف"))}</th>
            </tr>
          </thead>
          <tbody>${R}</tbody>
        </table>
      </section>`:"",H=D("notes")?`<section class="quote-section">
        <h3>${h(s("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${h($||s("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",se=`<section class="quote-section">
      <div class="payment-block">
        <h3>${h(s("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="info-plain info-plain--dense info-plain--right">
          ${T(s("reservations.quote.labels.beneficiary","اسم المستفيد"),J.beneficiaryName)}
          ${T(s("reservations.quote.labels.bank","اسم البنك"),J.bankName)}
          ${T(s("reservations.quote.labels.account","رقم الحساب"),f(J.accountNumber))}
          ${T(s("reservations.quote.labels.iban","رقم الآيبان"),f(J.iban))}
        </div>
      </div>
      <p class="quote-approval-note">${h(J.approvalNote)}</p>
    </section>`,le=`<footer class="quote-footer">
        <h4>${h(s("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Za.map(B=>`<li>${h(B)}</li>`).join("")}</ul>
      </footer>`,z=(B,Z)=>B&&B.trim().length?B:`<section class="quote-section quote-placeholder">${h(s(Z,"لا توجد بيانات للعرض."))}</section>`;let te="",L=j,G=_;j&&_&&(te=`<div class="quote-section-row">${_}${j}</div>`,L="",G="");const xe=z([te||L,G,N,Y,I].filter(Boolean).join(""),"reservations.quote.placeholder.page1"),Ee=z([H,X].filter(Boolean).join(""),"reservations.quote.placeholder.page2"),Ie=[se,le].join(""),Ce=`
    <header class="quote-header">
      <div class="quote-header__logo">
        <img class="quote-logo" src="${h(J.logoUrl)}" alt="${h(J.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${h(s("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${h(J.companyName)}</p>
        <p class="quote-company-cr">${h(s("reservations.quote.labels.cr","السجل التجاري"))}: ${h(J.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${h(l)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${h(m)}</strong>
        </div>
      </div>
    </header>`;return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${es}</style>

      <div class="quote-preview-pages">
        <div class="quote-page quote-page--primary">
          ${Ce}
          <main class="quote-body">
            ${xe}
          </main>
        </div>

        <div class="quote-page">
          <main class="quote-body">
            ${Ee}
          </main>
        </div>

        <div class="quote-page">
          <main class="quote-body">
            ${Ie}
          </main>
        </div>
      </div>
    </div>
  `}function an(){if(!C||!O)return;const{previewFrame:e}=O;if(!e)return;const t=nn({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",()=>{const n=e.contentDocument,a=n?.defaultView||window,i=n?.documentElement||n;i&&(Ae(i),ht(i,a),it(i,a));const r=Array.from(n?.querySelectorAll?.(".quote-page")||[]),o=n?.querySelector(".quote-preview-pages"),c=rs;let l=18;if(o&&n?.defaultView){const v=n.defaultView.getComputedStyle(o),y=parseFloat(v.rowGap||v.gap||`${l}`);Number.isFinite(y)&&y>=0&&(l=y)}const m=is,d=r.length?r.length*m+Math.max(0,(r.length-1)*l):m;e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(d),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${d}px`,e.style.minHeight=`${d}px`,sn(fe)},{once:!0})}function qs(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),an())}function ws(){if(!O?.toggles||!C)return;const{toggles:e}=O,t=Jt.map(({id:n,labelKey:a,fallback:i})=>{const r=s(a,i),o=C.sections.has(n)?"checked":"";return`
      <label class="quote-toggle">
        <input type="checkbox" class="form-check-input" data-section-id="${n}" ${o}>
        <span>${h(r)}</span>
      </label>
    `}).join("");e.innerHTML=t,e.querySelectorAll('input[type="checkbox"]').forEach(n=>{n.addEventListener("change",qs)})}function Ss(){if(O?.modal)return O;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${h(s("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${h(s("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${h(s("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${h(s("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),i=e.querySelector("[data-quote-download]"),r=document.createElement("iframe");r.className="quote-preview-frame",r.setAttribute("title",s("reservations.quote.previewTitle","معاينة عرض السعر")),r.setAttribute("loading","lazy"),r.setAttribute("frameborder","0");const o=document.createElement("div");o.className="quote-preview-zoom-controls",o.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${h(s("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${h(s("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${h(s("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const c=document.createElement("div");c.className="quote-preview-frame-wrapper",c.appendChild(r),n.innerHTML="",n.appendChild(o),n.appendChild(c),i?.addEventListener("click",async()=>{if(C){i.disabled=!0;try{await Es()}finally{i.disabled=!1}}}),O={modal:e,toggles:t,preview:n,previewFrameWrapper:c,zoomControls:o,zoomValue:o.querySelector("[data-zoom-value]"),previewFrame:r,meta:a,downloadBtn:i};const l=o.querySelector("[data-zoom-out]"),m=o.querySelector("[data-zoom-in]"),d=o.querySelector("[data-zoom-reset]");return l?.addEventListener("click",()=>$t(-.1)),m?.addEventListener("click",()=>$t(.1)),d?.addEventListener("click",()=>He(1)),He(fe),O}function He(e){fe=Math.min(Math.max(e,.2),2),sn(fe),O?.zoomValue&&(O.zoomValue.textContent=`${Math.round(fe*100)}%`)}function $t(e){He(fe+e)}function sn(e){if(!O?.previewFrame||!O.previewFrameWrapper)return;const t=O.previewFrame,n=O.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,i=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`,n.style.minHeight=`${i}px`,n.style.height=`${i}px`}function xs(){if(!O?.meta||!C)return;const{meta:e}=O;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${h(s("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${h(C.quoteNumber)}</strong></div>
      <div><span>${h(s("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${h(C.quoteDateLabel)}</strong></div>
    </div>
  `}async function Es(){if(!C)return;await us();const e=nn({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel}),t=document.createElement("div");t.innerHTML=e,t.style.position="fixed",t.style.top="-10000px",t.style.left="0",t.style.zIndex="-1",document.body.appendChild(t),Ae(t),ht(t),it(t);const n=t.firstElementChild;n&&(n.setAttribute("dir","rtl"),n.style.direction="rtl",n.style.textAlign="right",n.setAttribute("data-theme","light"),n.classList.remove("dark","dark-mode"),n.style.margin="0",n.style.padding="0",n.style.width="210mm",n.style.maxWidth="210mm",n.style.marginLeft="auto",n.style.marginRight="auto",n.scrollTop=0,n.scrollLeft=0);try{const a=`quotation-${C.quoteNumber}.pdf`;await window.html2pdf().set({margin:0,pagebreak:{mode:["css","legacy"],avoid:["tr"]},filename:a,html2canvas:{scale:2,useCORS:!0,scrollX:0,scrollY:0,onclone:i=>{const r=i?.defaultView||window;cs(i),it(i?.documentElement||i,r)}},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}}).from(t.firstElementChild).save(),C.sequenceCommitted||(vs(C.quoteSequence),C.sequenceCommitted=!0)}finally{document.body.removeChild(t)}}function Is(){const e=Ss();e?.modal&&(He(1),ws(),xs(),an(),window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(e.modal).show())}async function Cs({reservation:e,customer:t,project:n}){if(!e){w(s("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=gs(e),{totalsDisplay:i,totals:r,rentalDays:o}=ys(e,a,n),c=s("reservations.create.summary.currency","ريال"),{sequence:l,quoteNumber:m}=fs(),d=new Date;C={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:i,rentalDays:o,currencyLabel:c,sections:new Set(Jt.filter(v=>v.defaultSelected).map(v=>v.id)),quoteSequence:l,quoteNumber:m,quoteDate:d,quoteDateLabel:bs(d),sequenceCommitted:!1},Is()}function ks({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const i=Oe(),{reservations:r=[],customers:o=[],technicians:c=[],projects:l=[]}=V(),m=Array.isArray(i)?i:c||[],d=new Map((l||[]).map(q=>[String(q.id),q])),v=document.getElementById(e);if(!v){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){v.innerHTML=`<p>${s("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const y=t||Qa(),u=new Map(o.map(q=>[String(q.id),q])),S=new Map(m.map(q=>[String(q.id),q])),g=Ya({reservations:r,filters:y,customersMap:u,techniciansMap:S,projectsMap:d});if(g.length===0){v.innerHTML=`<p>${s("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}v.innerHTML=`<div class="reservations-grid">${Ga({entries:g,customersMap:u,techniciansMap:S,projectsMap:d})}</div>`,v.querySelectorAll('[data-action="details"]').forEach(q=>{const p=Number(q.dataset.reservationIndex);Number.isNaN(p)||q.addEventListener("click",()=>{typeof n=="function"&&n(p)})}),v.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const p=Number(q.dataset.reservationIndex);Number.isNaN(p)||q.addEventListener("click",b=>{b.stopPropagation(),typeof a=="function"&&a(p,b)})})}function Ts(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:i=[],customers:r=[],projects:o=[]}=V(),c=i[e];if(!c)return w(s("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=r.find(p=>String(p.id)===String(c.customerId)),m=c.projectId?o.find(p=>String(p.id)===String(c.projectId)):null,d=document.getElementById("reservation-details-body");if(d){const p=Oe()||[];d.innerHTML=Ka(c,l,p,e,m)}const v=document.getElementById("reservationDetailsModal"),y=()=>{v&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(v)?.hide()},u=document.getElementById("reservation-details-edit-btn");u&&(u.onclick=()=>{y(),typeof t=="function"&&t(e,{reservation:c,customer:l,getEditContext:a})});const S=document.getElementById("reservation-details-delete-btn");S&&(S.onclick=()=>{y(),typeof n=="function"&&n(e,{reservation:c,customer:l})});const g=d?.querySelector('[data-action="open-project"]');g&&m&&g.addEventListener("click",()=>{y();const p=m?.id!=null?String(m.id):"",b=p?`projects.html?project=${encodeURIComponent(p)}`:"projects.html";window.location.href=b});const q=document.getElementById("reservation-details-export-btn");return q&&(q.onclick=async()=>{try{await Cs({reservation:c,customer:l,project:m})}catch(p){console.error("❌ [reservations] export to PDF failed",p),w(s("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),v&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(v).show(),!0}let De=null,ee=[],ot=null,K={};function Ve(){return{index:De,items:ee}}function Qe(e,t){De=typeof e=="number"?e:null,ee=Array.isArray(t)?[...t]:[]}function rn(){De=null,ee=[],$a()}function $s(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Te(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function As(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=s("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),i=s("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",o=Array.isArray(e)?[...e].sort((l,m)=>String(m.createdAt||m.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Te(a)}</option>`];o.forEach(l=>{c.push(`<option value="${Te(l.id)}">${Te(l.title||a)}</option>`)}),r&&!o.some(l=>String(l.id)===r)&&c.push(`<option value="${Te(r)}">${Te(i)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function on(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function At(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:i,updateEditReservationSummary:r,ensureModal:o}={}){const{customers:c,projects:l}=V(),d=Ht()?.[e];if(!d){w(s("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}K={...K,reservation:d,projects:l||[]},t?.(),As(l||[],d);const v=d.projectId&&l?.find?.(N=>String(N.id)===String(d.projectId))||null,{effectiveConfirmed:y,projectLinked:u}=ce(d,v),S=d.items?d.items.map(N=>({...N,equipmentId:N.equipmentId??N.equipment_id??N.id,barcode:U(N?.barcode)})):[];Qe(e,S);const g=s("reservations.list.unknownCustomer","غير معروف"),q=c?.find?.(N=>String(N.id)===String(d.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const p=document.getElementById("edit-res-id");p&&(p.value=d.reservationId||d.id);const b=document.getElementById("edit-res-customer");b&&(b.value=q?.customerName||g);const A=typeof a=="function"?a(d.start):{date:"",time:""},k=typeof a=="function"?a(d.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",k.date),n?.("edit-res-end-time",k.time);const $=document.getElementById("edit-res-notes");$&&($.value=d.notes||"");const R=document.getElementById("edit-res-discount");R&&(R.value=f(d.discount??0));const x=document.getElementById("edit-res-discount-type");x&&(x.value=d.discountType||"percent");const D=document.getElementById("edit-res-tax");D&&(D.checked=d.projectId?!1:!!d.applyTax);const T=document.getElementById("edit-res-confirmed");T&&(T.checked=y,T.disabled=u,T.classList.toggle("disabled",u),T.closest(".form-check")?.classList.toggle("disabled",u));const j=document.getElementById("edit-res-paid");j&&(j.value=d.paid===!0||d.paid==="paid"?"paid":"unpaid"),Ia((d.technicians||[]).map(N=>String(N))),i?.(S),on(),r?.();const _=document.getElementById("editReservationModal");ot=$s(_,o),ot?.show?.()}async function Ls({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:o}={}){if(De===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-end")?.value?.trim(),d=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",v=document.getElementById("edit-res-notes")?.value||"",y=f(document.getElementById("edit-res-discount")?.value||"0"),u=parseFloat(y)||0,S=document.getElementById("edit-res-discount-type")?.value||"percent",g=document.getElementById("edit-res-confirmed")?.checked||!1,q=document.getElementById("edit-res-paid")?.value||"unpaid",p=document.getElementById("edit-res-project")?.value||"",b=Ca();if(!c||!m){w(s("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const A=typeof e=="function"?e:(L,G)=>`${L}T${G||"00:00"}`,k=A(c,l),$=A(m,d);if(k&&$&&new Date(k)>new Date($)){w(s("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=Ht()?.[De];if(!x){w(s("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ee)||ee.length===0&&b.length===0){w(s("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const L of ee)if(ye(L.barcode)){w(s("reservations.toast.updateEquipmentMaintenance","⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة"));return}const D=typeof t=="function"?t:()=>!1;for(const L of ee){const G=U(L.barcode);if(D(G,k,$,x.id??x.reservationId)){w(s("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const T=typeof n=="function"?n:()=>!1;for(const L of b)if(T(L,k,$,x.id??x.reservationId)){w(s("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const j=document.getElementById("edit-res-tax"),_=Array.isArray(K.projects)&&K.projects.length?K.projects:V().projects||[],N=p&&_.find(L=>String(L.id)===String(p))||null,X={...x,projectId:p?String(p):null,confirmed:g},{effectiveConfirmed:Y,projectLinked:I,projectStatus:H}=ce(X,N),se=I?!1:j?.checked||!1,le=Rt(ee,u,S,se,b,{start:k,end:$});let z=x.status??"pending";I?z=N?.status??H??z:["completed","cancelled"].includes(String(z).toLowerCase())||(z=g?"confirmed":"pending");const te=Pt({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:k,end:$,status:z,title:x.title??null,location:x.location??null,notes:v,projectId:p?String(p):null,totalAmount:le,discount:u,discountType:S,applyTax:se,paidStatus:q,confirmed:Y,items:ee.map(L=>({...L,equipmentId:L.equipmentId??L.id})),technicians:b});try{const L=await ka(x.id||x.reservationId,te);await Ta(),w(s("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),rn(),o?.({type:"updated",reservation:L}),i?.(),r?.(),ot?.hide?.()}catch(L){console.error("❌ [reservationsEdit] Failed to update reservation",L);const G=Mt(L)?L.message:s("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");w(G,"error")}}function zs(e={}){K={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:i}=K,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=f(r.value),t?.()}),r.dataset.listenerAttached="true");const o=document.getElementById("edit-res-discount-type");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>t?.()),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>t?.()),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-project");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{on();const u=document.getElementById("edit-res-confirmed");if(u){const S=Array.isArray(K.projects)&&K.projects.length?K.projects:V().projects||[],g=l.value&&S.find(k=>String(k.id)===String(l.value))||null,p={...K?.reservation??{},projectId:l.value||null,confirmed:u.checked},{effectiveConfirmed:b,projectLinked:A}=ce(p,g);u.checked=b,u.disabled=A,u.classList.toggle("disabled",A),u.closest(".form-check")?.classList.toggle("disabled",A)}t?.()}),l.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Ls(K).catch(u=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",u)})}),m.dataset.listenerAttached="true");const d=document.getElementById("edit-res-equipment-barcode");if(d&&!d.dataset.listenerAttached){d.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),n?.(d))});let u=null;const S=()=>{if(clearTimeout(u),!d.value?.trim())return;const{start:g,end:q}=getEditReservationDateRange();!g||!q||(u=setTimeout(()=>{n?.(d)},150))};d.addEventListener("input",S),d.addEventListener("change",()=>n?.(d)),d.dataset.listenerAttached="true"}const v=document.getElementById("edit-res-equipment-description");v&&!v.dataset.listenerAttached&&(v.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),a?.(v,"edit"))}),v.dataset.listenerAttached="true");const y=document.getElementById("editReservationModal");y&&!y.dataset.cleanupAttached&&(y.addEventListener("hidden.bs.modal",()=>{rn(),t?.(),i?.([])}),y.dataset.cleanupAttached="true")}function gt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Le(e,n),end:Le(t,a)}}function We(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=s("reservations.create.equipment.none","لا توجد معدات"),a=s("reservations.create.summary.currency","ريال"),i=s("reservations.create.equipment.imageAlt","صورة");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="6" class="text-center">${n}</td></tr>`,Lt(t);return}t.innerHTML=e.map((r,o)=>{const c=je(r),l=`${f(String(r.price??0))} ${a}`,m=f(String(r.qty||1)),d=c?`<img src="${c}" alt="${i}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${r.barcode||"-"}</td>
          <td>${r.desc||"-"}</td>
          <td>${l}</td>
          <td>${m}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${o}">🗑️</button></td>
        </tr>
      `}).join(""),Lt(t)}function Lt(e){!e||e.dataset.removeListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('[data-action="remove-edit-item"]');if(!n)return;t.preventDefault();const a=Number(n.dataset.itemIndex);Number.isNaN(a)||Ds(a)}),e.dataset.removeListenerAttached="true")}function Se(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",Se),a.dataset.listenerAttached="true"),be(a);const i=f(t?.value||"0");t&&(t.value=i);const r=parseFloat(i)||0,o=n?.value||"percent",c=!!document.getElementById("edit-res-project")?.value,l=document.getElementById("edit-res-tax"),m=c?!1:l?.checked||!1,d=a?.value||"unpaid";be(a,d);const{items:v=[]}=Ve(),{start:y,end:u}=gt();e.innerHTML=Aa({items:v,discount:r,discountType:o,applyTax:m,paidStatus:d,start:y,end:u})}function Ds(e){if(e==null)return;const{index:t,items:n}=Ve();if(!Array.isArray(n))return;const a=n.filter((i,r)=>r!==e);Qe(t,a),We(a),Se()}function Bs(e){const t=e?.value??"",n=U(t);if(!n)return;const a=dt(n);if(!a){w(s("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}if(ye(n)){w(s("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const i=U(n),{index:r,items:o=[]}=Ve();if(o.findIndex(S=>U(S.barcode)===i)>-1){w(s("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:m}=gt();if(!l||!m){w(s("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:d=[]}=V(),v=r!=null&&d[r]||null,y=v?.id??v?.reservationId??null;if(ge(i,l,m,y)){w(s("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const u=[...o,{id:a.id,equipmentId:a.id,barcode:i,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Qe(r,u),e&&(e.value=""),We(u),Se()}function ze(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Yt(t),a=U(n?.barcode||t);if(!n||!a){w(s("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(ye(a)){w(s("reservations.toast.equipmentMaintenanceStrict","⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز"));return}const{start:i,end:r}=gt();if(!i||!r){w(s("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:o,items:c=[]}=Ve();if(c.some(u=>U(u.barcode)===a)){w(s("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:m=[]}=V(),d=o!=null&&m[o]||null,v=d?.id??d?.reservationId??null;if(ge(a,i,r,v)){w(s("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=[...c,{id:n.id,equipmentId:n.id,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Qe(o,y),We(y),Se(),e.value=""}function js(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ze(e))});const t=()=>{Gt(e.value,"edit-res-equipment-description-options")&&ze(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Se()});function Ns(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){st(e);return}ze(e)}}function Os(){qe(),js()}function Rs(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}function Us(){return Ba().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=V()||{};ja(e||[]),Kt()})}function yt(e=null){Kt(),cn(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Ps(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ct(){return{populateEquipmentDescriptionLists:qe,setFlatpickrValue:Rs,splitDateTime:Bt,renderEditItems:We,updateEditReservationSummary:Se,addEquipmentByDescription:Ns,addEquipmentToEditingReservation:Bs,addEquipmentToEditingByDescription:ze,combineDateTime:Le,hasEquipmentConflict:ge,hasTechnicianConflict:Nt,renderReservations:cn,handleReservationsMutation:yt,ensureModal:Ps}}function cn(e="reservations-list",t=null){ks({containerId:e,filters:t,onShowDetails:ln,onConfirmReservation:un})}function ln(e){return Ts(e,{getEditContext:ct,onEdit:(t,{reservation:n})=>{mn(t,n)},onDelete:dn})}function dn(e){return Dt()?window.confirm(s("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?La(e,{onAfterChange:yt}):!1:(fa(),!1)}function un(e){return Da(e,{onAfterChange:yt})}function mn(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}At(e,ct());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}At(e,ct());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",o)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}va({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),i=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=i}function Vs(){typeof window>"u"||(window.showReservationDetails=ln,window.deleteReservation=dn,window.confirmReservation=un,window.editReservation=mn)}export{Xt as a,Vs as b,Hs as c,zs as d,Os as e,Kt as f,ct as g,M as h,_s as i,yt as j,Us as l,cn as r,ln as s,Se as u};
