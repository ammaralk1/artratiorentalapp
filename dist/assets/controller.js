import{w as ms,e as V,t as a,n as v,j as w,y as ps,f as fe,k as Dt,o as vs,u as fs}from"./auth.js";import{G as U,H as ot,z as W,I as hs,J as Ae,K as wt,L as Lt,M as bs,N as gs,O as Le,P as ge,Q as Bt,R as ys,S as jt,t as Nt,T as Rt,U as qs,V as ws,s as ze,i as Mt,W as Pt,X as Ss,Y as xs,Z as Es,d as $e,r as ce,c as Ft,g as _t,_ as Is,$ as Cs,v as ks,D as Ts,a0 as $s,a1 as As,a2 as Ds,a3 as Ls,w as Bs,y as js}from"./projectsService.js";ms({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.create.equipment.table.code":"الكود","reservations.create.equipment.table.description":"الوصف","reservations.create.equipment.table.price":"السعر","reservations.create.equipment.table.image":"الصورة","reservations.create.equipment.table.delete":"حذف","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.headers.code":"الكود","reservations.edit.table.headers.description":"الوصف","reservations.edit.table.headers.price":"السعر","reservations.edit.table.headers.quantity":"الكمية","reservations.edit.table.headers.image":"الصورة","reservations.edit.table.headers.delete":"حذف","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"📊 تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"🔄 تحديث","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"متوسط الحجز —","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"📈 تطور الحجوزات","reservations.reports.chart.volume.hint":"آخر 6 أشهر","reservations.reports.chart.status.title":"📊 توزيع الحالات والدفع","reservations.reports.chart.status.hint":"نسب مئوية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.topCustomers.title":"👥 أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"📄 تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.topEquipment.title":"🎥 المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.create.equipment.table.code":"Code","reservations.create.equipment.table.description":"Description","reservations.create.equipment.table.price":"Price","reservations.create.equipment.table.image":"Image","reservations.create.equipment.table.delete":"Delete","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.headers.code":"Code","reservations.edit.table.headers.description":"Description","reservations.edit.table.headers.price":"Price","reservations.edit.table.headers.quantity":"Qty","reservations.edit.table.headers.image":"Image","reservations.edit.table.headers.delete":"Delete","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"📊 Performance Reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"🔄 Refresh","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Average reservation —","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"📈 Reservation trend","reservations.reports.chart.volume.hint":"Last 6 months","reservations.reports.chart.status.title":"📊 Status & payment breakdown","reservations.reports.chart.status.hint":"Percentages","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.topCustomers.title":"👥 Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"📄 Reservation Details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.topEquipment.title":"🎥 Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});function Be(e={}){return e.image||e.imageUrl||e.img||""}function Ns(e){if(!e)return null;const t=U(e),{equipment:n=[]}=V();return(n||[]).find(s=>U(s?.barcode)===t)||null}function ct(e){const t=U(e);if(!t)return null;const{equipment:n=[]}=V();return(n||[]).find(s=>U(s?.barcode)===t)||null}function ye(e){return ct(e)?.status==="صيانة"}let Ze=null,Ht=[],Je=new Map,et=new Map;function zt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function lt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function dt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Ot(e,t,{allowPartial:n=!1}={}){const s=W(t);if(!s)return null;const i=e.get(s);if(i)return i;if(!n)return null;const r=[];return e.forEach((o,c)=>{c.includes(s)&&r.push(o)}),r.length===1?r[0]:null}function tt(e,t={}){return Ot(Je,e,t)}function nt(e,t={}){return Ot(et,e,t)}function he(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function Ut(e){Ht=Array.isArray(e)?[...e]:[]}function ut(){return Ht}function mt(e){return e&&ut().find(t=>String(t.id)===String(e))||null}function St(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||a("projects.fallback.untitled","مشروع بدون اسم")}function Rs(){const e=document.getElementById("res-company-share");if(!e||!e.checked)return null;const t=e.dataset.companyShare??e.value??wt,n=v(String(t).replace("%","").trim()),s=parseFloat(n);return Number.isFinite(s)?s:wt}function Ms(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function xt(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],s=e[`${t}Time`]??e[`${t}_time`];if(n){const i=typeof s=="string"&&s.trim()?s.trim():"00:00";return`${n}T${i}`}return""}function Et(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function se({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:s,list:i}=lt();if(!n||!s||!i)return;const r=ot()||[],o=a("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=a("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",o);const l=new Set;Je=new Map;const m=r.filter(u=>u&&u.id!=null).map(u=>({id:String(u.id),label:Et(u)||c})).filter(u=>{if(!u.label)return!1;const S=W(u.label);return!S||l.has(S)?!1:(l.add(S),Je.set(S,u),!0)}).sort((u,S)=>u.label.localeCompare(S.label,void 0,{sensitivity:"base"}));i.innerHTML=m.map(u=>`<option value="${zt(u.label)}"></option>`).join("");const d=t?"":n.value,h=e?String(e):s.value?String(s.value):"",q=h?r.find(u=>String(u.id)===h):null;if(q){const u=Et(q)||c;s.value=String(q.id),n.value=u,n.dataset.selectedId=String(q.id)}else s.value="",n.dataset.selectedId="",n.value=t?"":d}function je({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:s,hidden:i,list:r}=dt();if(!s||!i||!r)return;const o=Array.isArray(t)?t:ut()||[],c=a("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");s.setAttribute("placeholder",c);const l=[...o].filter(g=>g&&g.id!=null).sort((g,y)=>String(y.createdAt||y.start||"").localeCompare(String(g.createdAt||g.start||""))),m=n?"":s.value,d=a("projects.fallback.untitled","مشروع بدون اسم"),h=new Set;et=new Map;const q=l.map(g=>{const y=St(g)||d;return{id:String(g.id),label:y}}).filter(g=>{if(!g.label)return!1;const y=W(g.label);return!y||h.has(y)?!1:(h.add(y),et.set(y,g),!0)});r.innerHTML=q.map(g=>`<option value="${zt(g.label)}"></option>`).join("");const u=e?String(e):i.value?String(i.value):"",S=u?l.find(g=>String(g.id)===u):null;if(S){const g=St(S)||d;i.value=String(S.id),s.value=g,s.dataset.selectedId=String(S.id)}else i.value="",s.dataset.selectedId="",s.value=n?"":m}function Pe(e,t,n){const{date:s,time:i}=Lt(n),r=document.getElementById(e),o=document.getElementById(t);if(r){if(s)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(s,!1,c)}else r.value=s;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(o){if(i)if(o._flatpickr){const c=o._flatpickr.config?.dateFormat||"H:i";o._flatpickr.setDate(i,!1,c)}else o.value=i;else o._flatpickr?o._flatpickr.clear():o.value="";o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0}))}}function Vt(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const s=e?.id!=null?String(e.id):"";n||je({selectedValue:s});const r=(ot()||[]).find(d=>String(d.id)===String(e.clientId)),o=r?.id!=null?String(r.id):"";se(o?{selectedValue:o}:{selectedValue:"",resetInput:!0});const c=xt(e,"start"),l=xt(e,"end");c&&Pe("res-start","res-start-time",c),l&&Pe("res-end","res-end-time",l);const m=document.getElementById("res-notes");m&&e.description&&(t||!m.value)&&(m.value=e.description),be(),P()}function Qt({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:s}=e?{projects:e}:V(),i=Array.isArray(s)?s:[];Ut(i);const r=t!=null?String(t):n.value?String(n.value):"";je({selectedValue:r,projectsList:i}),be(),P()}function be(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1)}}function pt(){const{input:e,hidden:t}=dt();if(!e||!t||e.dataset.listenerAttached)return;const n=(s=!1)=>{const i=e.value.trim(),r=i?nt(i,{allowPartial:s}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const o=mt(r.id);o?Vt(o,{skipProjectSelectUpdate:!0}):(be(),P())}else t.value="",e.dataset.selectedId="",be(),P()};e.addEventListener("input",()=>{const s=e.value.trim(),i=s?nt(s):null;i?(t.value=String(i.id),e.dataset.selectedId=String(i.id)):s||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function vt(){const{input:e,hidden:t}=lt();if(!e||!t||e.dataset.listenerAttached)return;const n=(s=!1)=>{const i=e.value.trim(),r=i?tt(i,{allowPartial:s}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),P()};e.addEventListener("input",()=>{const s=e.value.trim(),i=s?tt(s):null;i?(t.value=String(i.id),e.dataset.selectedId=String(i.id)):s||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ps(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const c=decodeURIComponent(t);n=JSON.parse(c)}catch(c){console.warn("⚠️ [reservations/createForm] Failed to decode project context",c)}e.delete("reservationProjectContext");const s=e.toString(),i=`${window.location.pathname}${s?`?${s}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,i),!n||!n.projectId)return;document.getElementById("res-project")&&(je({selectedValue:String(n.projectId)}),be());const o=mt(n.projectId);if(o?Vt(o,{forceNotes:!!n.forceNotes}):P(),n.start&&Pe("res-start","res-start-time",n.start),n.end&&Pe("res-end","res-end-time",n.end),n.customerId){const l=(ot()||[]).find(m=>String(m.id)===String(n.customerId));l?.id!=null&&se({selectedValue:String(l.id)})}else se({selectedValue:""})}function Oe(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",s=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Ae(e,n),end:Ae(t,s)}}function Wt(e){const t=W(e);if(!t)return null;const n=Pt()||[],s=n.find(i=>W(i?.desc||i?.description||"")===t);return s||n.find(i=>W(i?.desc||i?.description||"").includes(t))||null}function Yt(e,t="equipment-description-options"){const n=W(e);if(!n)return!1;const s=document.getElementById(t);return s&&s.options&&Array.from(s.options).some(o=>W(o.value)===n)?!0:(Pt()||[]).some(r=>W(r?.desc||r?.description||"")===n)}function qe(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),{equipment:n=[]}=V(),s=Array.isArray(n)?n:[];Es(s);const r=Array.from(new Set(s.map(o=>o?.desc||o?.description||"").filter(Boolean))).sort((o,c)=>o.localeCompare(c,"ar",{sensitivity:"base"})).map(o=>`<option value="${o}"></option>`).join("");e&&(e.innerHTML=r),t&&(t.innerHTML=r)}function Ke(e,t){const n=U(e);if(!n)return!1;const{start:s,end:i}=Oe();if(!s||!i)return w(a("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Le().some(c=>U(c.barcode)===n))return w(a("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(ge(n,s,i))return w(a("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const o=ct(n);return o?ye(o.barcode)?(w(a("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")),!1):(Bt({id:o.id,equipmentId:o.id,barcode:n,desc:o.desc,qty:1,price:o.price,image:Be(o)}),t&&(t.value=""),we(),P(),w(a("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(w(a("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1)}function st(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Wt(t);if(!n){w(a("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(Ns(n.barcode)?.status==="صيانة"){w(a("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const i=U(n.barcode);if(!i){w(a("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:n.id,equipmentId:n.id,barcode:i,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Be(n)},{start:o,end:c}=Oe();if(!o||!c){w(a("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Le().some(d=>U(d.barcode)===i)){w(a("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(ge(i,o,c)){w(a("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}if(ye(i)){w(a("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}Bt(r),we(),P(),e.value=""}function Fs(){qe();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),st(e))});const t=()=>{Yt(e.value,"equipment-description-options")&&st(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function we(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Le(),s=a("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),i=a("reservations.create.summary.currency","ريال"),r=a("reservations.create.equipment.imageAlt","صورة");if(n.length===0){t.innerHTML=`<tr><td colspan="5">${s}</td></tr>`;return}t.innerHTML=n.map((o,c)=>{const l=Be(o),m=`${v(String(o.price??0))} ${i}`,d=l?`<img src="${l}" alt="${r}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${o.barcode||"-"}</td>
          <td>${o.desc}</td>
          <td>${m}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${c}">🗑️</button></td>
        </tr>
      `}).join("")}function P(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(v(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",s=!!document.getElementById("res-project")?.value,i=document.getElementById("res-tax"),r=s?!1:i?.checked||!1,o=document.getElementById("res-payment-status")?.value||"unpaid",{start:c,end:l}=Oe(),m=Rs(),d=document.getElementById("res-payment-status");he(d,o),hs({selectedItems:Le(),discount:t,discountType:n,applyTax:r,paidStatus:o,start:c,end:l,companySharePercent:m})}function _s(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=v(r.target.value),P()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",P),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",P),n.dataset.listenerAttached="true");const s=document.getElementById("res-company-share");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",P),s.dataset.listenerAttached="true");const i=document.getElementById("res-payment-status");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{he(i),P()}),i.dataset.listenerAttached="true"),he(i)}function Hs(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const s=()=>{const i=e.value?.trim();if(!i){P();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=i,t.dataset.syncedWithStart="true",t.dataset.syncedValue=i,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),P()};e.addEventListener("change",s),e.addEventListener("input",s),e.addEventListener("blur",s),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||s(),e.dataset.timeSyncAttached="true"}async function It(){const{input:e,hidden:t}=lt(),{input:n,hidden:s}=dt(),{customers:i}=V();let r=t?.value?String(t.value):"";if(!r&&e?.value){const I=tt(e.value,{allowPartial:!0});I&&(r=String(I.id),t&&(t.value=r),e.value=I.label,e.dataset.selectedId=r)}const o=i.find(I=>String(I.id)===r);if(!o){w(a("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=o.id;let l=s?.value?String(s.value):"";if(!l&&n?.value){const I=nt(n.value,{allowPartial:!0});I&&(l=String(I.id),s&&(s.value=l),n.value=I.label,n.dataset.selectedId=l)}const m=document.getElementById("res-start").value,d=document.getElementById("res-end").value,h=document.getElementById("res-start-time")?.value||"00:00",q=document.getElementById("res-end-time")?.value||"00:00";if(!m||!d){w(a("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const u=`${m}T${h}`,S=`${d}T${q}`,g=new Date(u),y=new Date(S);if(Number.isNaN(g.getTime())||Number.isNaN(y.getTime())||g>=y){w(a("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const p=ys(),f=Le();if(f.length===0&&p.length===0){w(a("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",k=parseFloat(v(document.getElementById("res-discount")?.value))||0,$=document.getElementById("res-discount-type")?.value||"percent",R=document.getElementById("res-payment-status")?.value||"unpaid",x=l?mt(l):null,L=Ms(x);if(l&&!x){w(a("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const I of f)if(ye(I.barcode)){w(a("reservations.toast.cannotCreateEquipmentMaintenance","⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة"));return}for(const I of f){const H=U(I.barcode);if(ge(H,u,S)){w(a("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const I of p)if(jt(I,u,S)){w(a("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const T=document.getElementById("res-tax"),_=!!l?!1:T?.checked||!1,N=Nt(f,k,$,_,p,{start:u,end:S}),X=ps(),Y=Rt({reservationCode:X,customerId:c,start:u,end:S,status:L?"confirmed":"pending",title:null,location:null,notes:A,projectId:l||null,totalAmount:N,discount:k,discountType:$,applyTax:_,paidStatus:R,confirmed:L,items:f.map(I=>({...I,equipmentId:I.equipmentId??I.id})),technicians:p});try{const I=await qs(Y);ws(),qe(),ze(),zs(),w(a("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ze=="function"&&Ze({type:"created",reservation:I})}catch(I){console.error("❌ [reservations/createForm] Failed to create reservation",I);const H=Mt(I)?I.message:a("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");w(H,"error")}}function zs(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),se({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const s=document.getElementById("res-company-share");s&&(s.checked=!1);const i=document.getElementById("res-project"),r=document.getElementById("res-project-input");i&&(i.value=""),r&&(r.value="",r.dataset.selectedId=""),je({selectedValue:"",resetInput:!0});const o=document.getElementById("equipment-description");o&&(o.value="");const c=document.getElementById("res-payment-status");c&&(c.value="unpaid",he(c,"unpaid")),Ss(),xs([]),we(),be(),P()}function Os(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('button[data-action="remove-item"]');if(!n)return;const s=Number(n.dataset.index);gs(s),we(),P()}),e.dataset.listenerAttached="true")}function Us(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),Ke(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const s=e.value;if(!s?.trim())return;const{start:i,end:r}=Oe();!i||!r||(t=setTimeout(()=>{Ke(s,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>Ke(e.value,e)),e.dataset.listenerAttached="true"}function Vs(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await It()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await It()}),t.dataset.listenerAttached="true")}function Pa({onAfterSubmit:e}={}){Ze=typeof e=="function"?e:null;const{customers:t,projects:n}=V();bs(t||[]),se(),vt(),Ut(n||[]),Qt({projectsList:n}),pt(),qe(),Fs(),Hs(),_s(),Os(),Us(),Vs(),Ps(),P(),we()}function Gt(){qe(),Qt(),se(),vt(),pt(),we(),P()}if(typeof document<"u"){const e=()=>{se(),je({projectsList:ut()}),vt(),pt(),P()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function Kt(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:oe(t),endDate:oe(t)};if(e==="week"){const n=new Date(t),s=n.getDay(),i=s===0?6:s-1;n.setDate(n.getDate()-i);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:oe(n),endDate:oe(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),s=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:oe(n),endDate:oe(s)}}return e==="upcoming"?{startDate:oe(t),endDate:""}:{startDate:"",endDate:""}}function Qs(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),s=document.getElementById("reservation-date-range"),i=document.getElementById("reservation-status-filter");let r=v(t?.value||"").trim(),o=v(n?.value||"").trim(),c=s?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",s&&(s.value=""),Fe(t),Fe(n),r="",o=""),!r&&!o&&c){const m=Kt(c);r=m.startDate,o=m.endDate}return{searchTerm:W(e?.value||""),startDate:r,endDate:o,status:i?.value||"",quickRange:c}}function Fa(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const s=document.getElementById("filter-start-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const i=document.getElementById("filter-end-date");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),i.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Ws(r.value),t()}),r.dataset.listenerAttached="true");const o=document.getElementById("reservation-status-filter");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",t),o.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Fe(s),Fe(i),r&&(r.value=""),o&&(o.value=""),t()}),c.dataset.listenerAttached="true")}function Ws(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:s,endDate:i}=Kt(e);t._flatpickr?s?t._flatpickr.setDate(s,!1,"Y-m-d"):t._flatpickr.clear():t.value=s,n._flatpickr?i?n._flatpickr.setDate(i,!1,"Y-m-d"):n._flatpickr.clear():n.value=i}function oe(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Fe(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Ys({reservations:e=[],filters:t={},customersMap:n,techniciansMap:s,projectsMap:i}){const r=e.map((p,f)=>({reservation:p,index:f})),o=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",m=t.startDate||"",d=t.endDate||"",h=t.status||"",q=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,u=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,S=m?new Date(`${m}T00:00:00`):null,g=d?new Date(`${d}T23:59:59`):null,y=r.filter(({reservation:p})=>{const f=n.get(String(p.customerId)),A=i?.get?.(String(p.projectId)),k=p.start?new Date(p.start):null,$=$e(p),{effectiveConfirmed:R}=ce(p,A);if(q!=null&&String(p.customerId)!==String(q)||u!=null&&!(Array.isArray(p.technicians)?p.technicians.map(_=>String(_)):[]).includes(String(u))||h==="confirmed"&&!R||h==="pending"&&R||h==="completed"&&!$||S&&k&&k<S||g&&k&&k>g||c&&!W([p.reservationId,p.id].filter(Boolean).map(String).join(" ")).includes(c)||l&&!W(f?.customerName||"").includes(l))return!1;if(!o)return!0;const x=p.items?.map?.(j=>`${j.barcode} ${j.desc}`).join(" ")||"",L=(p.technicians||[]).map(j=>s.get(String(j))?.name).filter(Boolean).join(" ");return W([p.reservationId,f?.customerName,p.notes,x,L,A?.title].filter(Boolean).join(" ")).includes(o)});return y.sort((p,f)=>{const A=$e(p.reservation),k=$e(f.reservation);if(A!==k)return A?1:-1;const $=p.reservation.start?new Date(p.reservation.start).getTime():0;return(f.reservation.start?new Date(f.reservation.start).getTime():0)-$}),y}function Gs({entries:e,customersMap:t,techniciansMap:n,projectsMap:s}){const i=a("reservations.create.summary.currency","ريال"),r=a("reservations.list.taxIncludedShort","(شامل الضريبة)"),o=a("reservations.list.unknownCustomer","غير معروف"),c=a("reservations.list.noNotes","لا توجد ملاحظات"),l=a("reservations.list.itemsCountShort","{count} عنصر"),m=a("reservations.list.crew.separator","، "),d=a("reservations.list.status.confirmed","✅ مؤكد"),h=a("reservations.list.status.pending","⏳ غير مؤكد"),q=a("reservations.list.payment.paid","💳 مدفوع"),u=a("reservations.list.payment.unpaid","💳 غير مدفوع"),S=a("reservations.list.actions.confirm","✔️ تأكيد"),g=a("reservations.list.project.unlinked","غير مرتبط بمشروع"),y=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),p={client:a("reservations.list.labels.client","👤 العميل"),project:a("reservations.list.labels.project","📁 المشروع"),start:a("reservations.list.labels.start","🗓️ بداية الحجز"),end:a("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:a("reservations.list.labels.cost","💵 التكلفة"),equipment:a("reservations.list.labels.equipment","📦 المعدات"),crew:a("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:f,index:A})=>{const k=t.get(String(f.customerId)),$=f.projectId?s?.get?.(String(f.projectId)):null,R=$e(f),x=f.paid===!0||f.paid==="paid",{effectiveConfirmed:L,projectLinked:T}=ce(f,$),j=L?"status-confirmed":"status-pending",_=x?"status-paid":"status-unpaid";let N=`<span class="reservation-chip status-chip ${j}">${L?d:h}</span>`,X=`<span class="reservation-chip status-chip ${_}">${x?q:u}</span>`,Y=x?" tile-paid":" tile-unpaid";R&&(Y+=" tile-completed");let I="";R&&(N=`<span class="reservation-chip status-chip status-completed">${d}</span>`,X=`<span class="reservation-chip status-chip status-completed">${x?q:u}</span>`,I=` data-completed-label="${a("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const H=!T&&!L?`<button class="tile-confirm" data-reservation-index="${A}" data-action="confirm">${S}</button>`:"",ae=H?`<div class="tile-actions">${H}</div>`:"",le=f.items?.length||0,z=(f.technicians||[]).map(F=>n.get(String(F))).filter(Boolean),te=z.map(F=>F.name).join(m)||"—",D=v(String(f.reservationId??"")),G=f.start?v(fe(f.start)):"-",xe=f.end?v(fe(f.end)):"-",Ee=v(String(f.cost??0)),Ie=v(String(le)),Ce=f.notes?v(f.notes):c,B=l.replace("{count}",Ie),Z=f.applyTax?`<small>${r}</small>`:"";let ne=g;return f.projectId&&(ne=$?.title?v($.title):y),`
      <div class="${H?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${Y}"${I} data-reservation-index="${A}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${D}</div>
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
        ${ae}
      </div>
    `}).join("")}function Xe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ks(e,t,n=[],s,i=null){const{projectLinked:r,effectiveConfirmed:o}=ce(e,i),c=e.paid===!0||e.paid==="paid",l=$e(e),m=e.items||[],{technicians:d=[]}=V(),h=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(d)?d:[]),q=new Map;h.forEach(E=>{if(!E||E.id==null)return;const M=String(E.id),Q=q.get(M)||{};q.set(M,{...Q,...E})});const u=(e.technicians||[]).map(E=>q.get(String(E))).filter(Boolean),S=Dt(),g=Ft(e.start,e.end),y=(E={})=>{const M=[E.dailyWage,E.daily_rate,E.dailyRate,E.wage,E.rate];for(const Q of M){if(Q==null)continue;const pe=parseFloat(v(String(Q)));if(Number.isFinite(pe))return pe}return 0},f=m.reduce((E,M)=>E+(M.qty||1)*(M.price||0),0)*g,k=u.reduce((E,M)=>E+y(M),0)*g,$=f+k,R=parseFloat(e.discount)||0,x=e.discountType==="amount"?R:$*(R/100),L=Math.max(0,$-x),T=r?!1:e.applyTax,j=T?L*.15:0,_=Number(e.cost),N=Number.isFinite(_),X=L+j,Y=r?Math.round(X):N?_:Math.round(X),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,H=I!=null?parseFloat(v(String(I))):NaN,z=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(H)&&H>0)&&Number.isFinite(H)?H:0,te=z>0?Math.max(0,(Number.isFinite(Y)?Y:0)*(z/100)):0,D=v(String(e.reservationId??e.id??"")),G=e.start?v(fe(e.start)):"-",xe=e.end?v(fe(e.end)):"-",Ee=v(String(u.length)),Ie=v(f.toFixed(2)),Ce=v(x.toFixed(2)),B=v(L.toFixed(2)),Z=v(j.toFixed(2)),ne=v((Y??0).toFixed(2)),de=v(String(g)),F=a("reservations.create.summary.currency","ريال"),ue=a("reservations.details.labels.discount","الخصم"),We=a("reservations.details.labels.tax","الضريبة (15%)"),pn=a("reservations.details.labels.crewTotal","إجمالي الفريق"),vn=a("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),fn=a("reservations.details.labels.duration","عدد الأيام"),hn=a("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me={index:"#",code:a("reservations.details.table.headers.code","الكود"),description:a("reservations.details.table.headers.description","الوصف"),quantity:a("reservations.details.table.headers.quantity","الكمية"),price:a("reservations.details.table.headers.price","السعر"),image:a("reservations.details.table.headers.image","الصورة")},bn=a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),gn=a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),yn=a("reservations.details.technicians.roleUnknown","غير محدد"),qn=a("reservations.details.technicians.phoneUnknown","غير متوفر"),wn=a("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Sn=a("reservations.list.status.confirmed","✅ مؤكد"),xn=a("reservations.list.status.pending","⏳ غير مؤكد"),En=a("reservations.list.payment.paid","💳 مدفوع"),In=a("reservations.list.payment.unpaid","💳 غير مدفوع"),Cn=a("reservations.list.status.completed","📁 منتهي"),kn=a("reservations.details.labels.id","🆔 رقم الحجز"),Tn=a("reservations.details.section.bookingInfo","بيانات الحجز"),$n=a("reservations.details.section.paymentSummary","ملخص الدفع"),An=a("reservations.details.labels.finalTotal","المجموع النهائي"),Dn=a("reservations.details.section.crew","😎 الفريق الفني"),Ln=a("reservations.details.crew.count","{count} عضو"),Bn=a("reservations.details.section.items","📦 المعدات المرتبطة"),jn=a("reservations.details.items.count","{count} عنصر"),Nn=a("reservations.details.actions.edit","✏️ تعديل"),Rn=a("reservations.details.actions.delete","🗑️ حذف"),Mn=a("reservations.details.labels.customer","العميل"),Pn=a("reservations.details.labels.contact","رقم التواصل"),Fn=a("reservations.details.labels.project","📁 المشروع المرتبط");a("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const _n=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Hn=a("reservations.details.actions.openProject","📁 فتح المشروع"),zn=a("reservations.details.labels.start","بداية الحجز"),On=a("reservations.details.labels.end","نهاية الحجز"),Un=a("reservations.details.labels.notes","ملاحظات"),Vn=a("reservations.list.noNotes","لا توجد ملاحظات"),Qn=a("reservations.details.labels.itemsCount","عدد المعدات"),Wn=a("reservations.details.labels.itemsTotal","إجمالي المعدات"),Yn=a("reservations.details.labels.paymentStatus","حالة الدفع"),Gn=a("reservations.list.unknownCustomer","غير معروف"),bt=c?En:In,gt=m.length,Kn=v(String(gt)),yt=jn.replace("{count}",Kn),Xn=Ln.replace("{count}",Ee),Zn=e.notes?v(e.notes):Vn,Jn=v(k.toFixed(2)),es=v(String(z)),ts=v(te.toFixed(2)),ns=`${es}% (${ts} ${F})`,re=[{icon:"💳",label:Yn,value:bt},{icon:"📦",label:Qn,value:yt},{icon:"⏱️",label:fn,value:de},{icon:"💼",label:Wn,value:`${Ie} ${F}`}];re.push({icon:"😎",label:pn,value:`${Jn} ${F}`}),x>0&&re.push({icon:"💸",label:ue,value:`${Ce} ${F}`}),re.push({icon:"📊",label:vn,value:`${B} ${F}`}),T&&j>0&&re.push({icon:"🧾",label:We,value:`${Z} ${F}`}),z>0&&re.push({icon:"🏦",label:hn,value:ns}),re.push({icon:"💰",label:An,value:`${ne} ${F}`});const ss=re.map(({icon:E,label:M,value:Q})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${E} ${M}</span>
      <span class="summary-details-value">${Q}</span>
    </div>
  `).join(""),qt=[{text:o?Sn:xn,className:o?"status-confirmed":"status-pending"},{text:bt,className:c?"status-paid":"status-unpaid"}];l&&qt.push({text:Cn,className:"status-completed"});const as=qt.map(({text:E,className:M})=>`<span class="status-chip ${M}">${E}</span>`).join(""),ke=(E,M,Q)=>`
    <div class="res-info-row">
      <span class="label">${E} ${M}</span>
      <span class="value">${Q}</span>
    </div>
  `;let Ye="";if(e.projectId){let E=Xe(_n);if(i){const M=i.title||a("projects.fallback.untitled","مشروع بدون اسم");E=`${Xe(M)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${i.id}">${Xe(Hn)}</button>`}Ye=`
      <div class="res-info-row">
        <span class="label">📁 ${Fn}</span>
        <span class="value">${E}</span>
      </div>
    `}const ie=[];ie.push(ke("👤",Mn,t?.customerName||Gn)),ie.push(ke("📞",Pn,t?.phone||"—")),ie.push(ke("🗓️",zn,G)),ie.push(ke("🗓️",On,xe)),ie.push(ke("📝",Un,Zn)),Ye&&ie.push(Ye);const rs=ie.join(""),is=gt?m.map((E,M)=>{const Q=Be(E),pe=v(String(E.barcode||"-")),Ge=v(String(E.qty||1)),Ne=v(String(E.price||0)),ds=v(String(M+1)),us=Q?`<img src="${Q}" alt="${E.desc||""}" class="reservation-modal-item-thumb">`:"-";return`
          <tr>
            <td>${ds}</td>
            <td>${pe}</td>
            <td>${E.desc||"-"}</td>
            <td>${Ge}</td>
            <td>${Ne} ${F}</td>
            <td>${us}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${bn}</td></tr>`,os=`
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
        <tbody>${is}</tbody>
      </table>
    </div>
  `,cs=u.map((E,M)=>{const Q=v(String(M+1)),pe=E.role||yn,Ge=E.phone||qn,Ne=E.wage?wn.replace("{amount}",v(String(E.wage))).replace("{currency}",F):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${Q}</span>
          <span class="technician-name">${E.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${pe}</div>
          <div>📞 ${Ge}</div>
          ${Ne?`<div>💰 ${Ne}</div>`:""}
        </div>
      </div>
    `}).join(""),ls=u.length?`<div class="reservation-technicians-grid">${cs}</div>`:`<ul class="reservation-modal-technicians"><li>${gn}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${kn}</span>
          <strong>${D}</strong>
        </div>
        <div class="status-chips">
          ${as}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Tn}</h6>
          ${rs}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${$n}</h6>
            <div class="summary-details">
              ${ss}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Dn}</span>
          <span class="count">${Xn}</span>
        </div>
        ${ls}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Bn}</span>
          <span class="count">${yt}</span>
        </div>
        ${os}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${s}">
          ${a("reservations.details.actions.exportPdf","📄 تصدير PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${s}">${Nn}</button>
        ${S?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${s}">${Rn}</button>`:""}
      </div>
    </div>
  `}const Xs=`@page {
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
  width: 100%;
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
  width: 100%;
  max-width: 210mm;
  min-height: 297mm;
  height: auto;
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
`,Xt="reservations.quote.sequence",J={logoUrl:"https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Zs=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Zt=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Js="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ea=Xs.trim(),ta=/color\([^)]*\)/gi,na=document.createElement("canvas"),Re=na.getContext("2d"),Jt=96,en=25.4,sa=210,aa=297,Ct=Math.round(sa/en*Jt),kt=Math.round(aa/en*Jt);let O=null,C=null,ve=1;function at(e,t="#000"){if(!Re||!e)return t;try{return Re.fillStyle="#000",Re.fillStyle=e,Re.fillStyle||t}catch{return t}}function ra(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(s){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const i=at(n)||"#000";try{return t(i)}catch{return t("#000")}}throw s}},e.Color.__artRatioPatched=!0}function Me(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(ta,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const s=n.textContent;typeof s=="string"&&s.includes("color(")&&(n.textContent=t(s))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const s=n.getAttribute("style");typeof s=="string"&&s.includes("color(")&&n.setAttribute("style",t(s))})}function ia(e){e&&(Me(e),Me(e?.documentElement),Me(e?.body),tn(e?.documentElement||e))}const oa=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function tn(e){if(!e||typeof window.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(n=>{const s=window.getComputedStyle(n);if(!s)return;oa.forEach(r=>{const o=s[r];if(o&&o.includes("color(")){const c=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=r==="backgroundColor"?"#ffffff":s.color||"#000000",m=at(o,l);n.style.setProperty(c,m,"important")}});const i=s.backgroundImage;if(i&&i.includes("color(")){const r=at(s.backgroundColor||"#ffffff","#ffffff");n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color",r,"important")}})}function ca(e){return new Promise((t,n)=>{const s=document.querySelector(`script[src="${e}"]`);if(s){s.addEventListener("load",()=>t()),s.addEventListener("error",r=>n(r)),s.readyState==="complete"&&t();return}const i=document.createElement("script");i.src=e,i.async=!0,i.onload=()=>t(),i.onerror=r=>n(r),document.head.appendChild(i)})}async function la(){window.html2pdf||await ca(Js),ra()}function b(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function da(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ua(){const e=window.localStorage?.getItem?.(Xt),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ma(){const t=ua()+1;return{sequence:t,quoteNumber:da(t)}}function pa(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Xt,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function va(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function fa(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const s=parseFloat(v(String(n)));if(Number.isFinite(s))return s}return 0}function ha(e){const t=ze()||[],{technicians:n=[]}=V(),s=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),i=new Map;return s.forEach(r=>{if(!r||r.id==null)return;const o=String(r.id),c=i.get(o)||{};i.set(o,{...c,...r})}),(e.technicians||[]).map(r=>i.get(String(r))).filter(Boolean)}function ba(e,t,n){const{projectLinked:s}=ce(e,n),i=Ft(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((R,x)=>R+(Number(x?.qty)||1)*(Number(x?.price)||0),0)*i,m=t.reduce((R,x)=>R+fa(x),0)*i,d=c+m,h=parseFloat(e.discount)||0,q=e.discountType==="amount"?h:d*(h/100),u=Math.max(0,d-q),g=(s?!1:e.applyTax)?u*.15:0,y=Number(e.cost),p=Number.isFinite(y),f=u+g,A=s?Math.round(f):p?y:Math.round(f),k={equipmentTotal:c,crewTotal:m,discountAmount:q,taxAmount:g,finalTotal:A??0},$={equipmentTotal:v(c.toFixed(2)),crewTotal:v(m.toFixed(2)),discountAmount:v(q.toFixed(2)),taxAmount:v(g.toFixed(2)),finalTotal:v((A??0).toFixed(2))};return{totals:k,totalsDisplay:$,rentalDays:i}}function nn({reservation:e,customer:t,project:n,technicians:s,totalsDisplay:i,rentalDays:r,currencyLabel:o,sections:c,quoteNumber:l,quoteDate:m}){const d=v(String(e?.reservationId??e?.id??"")),h=e.start?v(fe(e.start)):"-",q=e.end?v(fe(e.end)):"-",u=t?.customerName||t?.full_name||t?.name||"-",S=t?.phone||"-",g=t?.email||"-",y=t?.company||t?.company_name||"-",p=v(S),f=n?.title||n?.name||a("reservations.details.project.none","غير مرتبط بمشروع"),A=n?.code||n?.projectCode||"",k=v(String(r)),$=e?.notes||"",R=s.length?s.map((B,Z)=>{const ne=v(String(Z+1)),de=b(B?.name||B?.full_name||"-"),F=b(B?.role||a("reservations.details.technicians.roleUnknown","غير محدد")),ue=b(B?.phone||a("reservations.details.technicians.phoneUnknown","غير متوفر"));return`<tr>
          <td>${ne}</td>
          <td>${de}</td>
          <td>${F}</td>
          <td>${ue}</td>
        </tr>`}).join(""):`<tr><td colspan="4" class="empty">${b(a("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,x=Array.isArray(e.items)&&e.items.length?e.items.map((B,Z)=>{const ne=v(String(Z+1)),de=b(B?.barcode||"-"),F=b(B?.desc||B?.description||"-"),ue=v(String(B?.qty||1)),We=v(Number(B?.price||0).toFixed(2));return`<tr>
          <td>${ne}</td>
          <td>${de}</td>
          <td>${F}</td>
          <td>${ue}</td>
          <td>${We}</td>
        </tr>`}).join(""):`<tr>
        <td colspan="5" class="empty">${b(a("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td>
      </tr>`,L=B=>c?.has?.(B),T=(B,Z)=>`<div class="info-plain__item">${b(B)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${b(Z)}</strong></div>`,j=L("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${b(a("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        <div class="info-plain">
          ${T(a("reservations.details.labels.customer","العميل"),u)}
          ${T(a("reservations.details.labels.company","الشركة"),y)}
          ${T(a("reservations.details.labels.phone","الهاتف"),p)}
          ${T(a("reservations.details.labels.email","البريد"),g)}
        </div>
      </section>`:"",_=L("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${b(a("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        <div class="info-plain">
          ${T(a("reservations.details.labels.reservationId","رقم الحجز"),d||"-")}
          ${T(a("reservations.details.labels.start","بداية الحجز"),h)}
          ${T(a("reservations.details.labels.end","نهاية الحجز"),q)}
          ${T(a("reservations.details.labels.duration","عدد الأيام"),k)}
        </div>
      </section>`:"",N=L("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${b(a("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        <div class="info-plain">
          ${T(a("reservations.details.labels.project","المشروع"),f)}
          ${A?T(a("reservations.details.labels.code","الرمز"),A):""}
        </div>
      </section>`:"",X=L("financialSummary")?`<section class="quote-section quote-section--financial">
        <div class="totals-block">
          <h3>${b(a("reservations.details.labels.summary","الملخص المالي"))}</h3>
          <div class="totals-list">
            <div class="totals-item"><span>${b(a("reservations.details.labels.equipmentTotal","إجمالي المعدات"))}</span><span>${i.equipmentTotal} ${o}</span></div>
            <div class="totals-item"><span>${b(a("reservations.details.labels.crewTotal","إجمالي الفريق"))}</span><span>${i.crewTotal} ${o}</span></div>
            <div class="totals-item"><span>${b(a("reservations.details.labels.discount","الخصم"))}</span><span>${i.discountAmount} ${o}</span></div>
            <div class="totals-item"><span>${b(a("reservations.details.labels.tax","الضريبة"))}</span><span>${i.taxAmount} ${o}</span></div>
            <div class="totals-item is-final"><span>${b(a("reservations.details.labels.total","الإجمالي النهائي"))}</span><span>${i.finalTotal} ${o}</span></div>
          </div>
        </div>
      </section>`:"",Y=L("items")?`<section class="quote-section quote-section--table">
        <h3>${b(a("reservations.details.items.title","المعدات"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${b(a("reservations.details.table.headers.code","الكود"))}</th>
              <th>${b(a("reservations.details.table.headers.description","الوصف"))}</th>
              <th>${b(a("reservations.details.table.headers.quantity","الكمية"))}</th>
              <th>${b(a("reservations.details.table.headers.price","السعر"))}</th>
            </tr>
          </thead>
          <tbody>${x}</tbody>
        </table>
      </section>`:"",I=L("crew")?`<section class="quote-section quote-section--table">
        <h3>${b(a("reservations.details.technicians.title","طاقم العمل"))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${b(a("reservations.details.technicians.name","الاسم"))}</th>
              <th>${b(a("reservations.details.technicians.role","الدور"))}</th>
              <th>${b(a("reservations.details.technicians.phone","الهاتف"))}</th>
            </tr>
          </thead>
          <tbody>${R}</tbody>
        </table>
      </section>`:"",H=L("notes")?`<section class="quote-section">
        <h3>${b(a("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${b($||a("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ae=`<section class="quote-section">
      <div class="payment-block">
        <h3>${b(a("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="info-plain info-plain--dense info-plain--right">
          ${T(a("reservations.quote.labels.beneficiary","اسم المستفيد"),J.beneficiaryName)}
          ${T(a("reservations.quote.labels.bank","اسم البنك"),J.bankName)}
          ${T(a("reservations.quote.labels.account","رقم الحساب"),v(J.accountNumber))}
          ${T(a("reservations.quote.labels.iban","رقم الآيبان"),v(J.iban))}
        </div>
      </div>
      <p class="quote-approval-note">${b(J.approvalNote)}</p>
    </section>`,le=`<footer class="quote-footer">
        <h4>${b(a("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Zs.map(B=>`<li>${b(B)}</li>`).join("")}</ul>
      </footer>`,z=(B,Z)=>B&&B.trim().length?B:`<section class="quote-section quote-placeholder">${b(a(Z,"لا توجد بيانات للعرض."))}</section>`;let te="",D=j,G=_;j&&_&&(te=`<div class="quote-section-row">${_}${j}</div>`,D="",G="");const xe=z([te||D,G,N,Y,I].filter(Boolean).join(""),"reservations.quote.placeholder.page1"),Ee=z([H,X].filter(Boolean).join(""),"reservations.quote.placeholder.page2"),Ie=[ae,le].join(""),Ce=`
    <header class="quote-header">
      <div class="quote-header__logo">
        <img class="quote-logo" src="${b(J.logoUrl)}" alt="${b(J.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${b(a("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${b(J.companyName)}</p>
        <p class="quote-company-cr">${b(a("reservations.quote.labels.cr","السجل التجاري"))}: ${b(J.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${b(l)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${b(m)}</strong>
        </div>
      </div>
    </header>`;return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ea}</style>

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
  `}function sn(){if(!C||!O)return;const{previewFrame:e}=O;if(!e)return;const t=nn({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",()=>{const n=e.contentDocument,s=Array.from(n?.querySelectorAll?.(".quote-page")||[]),i=n?.querySelector(".quote-preview-pages"),r=s.length?s.reduce((l,m)=>Math.max(l,Math.round(m.getBoundingClientRect().width||0)),Ct):Ct;let o=18;if(i&&n?.defaultView){const l=n.defaultView.getComputedStyle(i),m=parseFloat(l.rowGap||l.gap||`${o}`);Number.isFinite(m)&&m>=0&&(o=m)}const c=s.reduce((l,m,d)=>{const h=m.getBoundingClientRect(),q=Math.max(Math.round(h.height||0),kt),u=d===0?0:o;return l+q+u},0)||kt;e.dataset.baseWidth=String(r),e.dataset.baseHeight=String(c),e.style.width=`${r}px`,e.style.minWidth=`${r}px`,e.style.height=`${c}px`,e.style.minHeight=`${c}px`,an(ve)},{once:!0})}function ga(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),sn())}function ya(){if(!O?.toggles||!C)return;const{toggles:e}=O,t=Zt.map(({id:n,labelKey:s,fallback:i})=>{const r=a(s,i),o=C.sections.has(n)?"checked":"";return`
      <label class="quote-toggle">
        <input type="checkbox" class="form-check-input" data-section-id="${n}" ${o}>
        <span>${b(r)}</span>
      </label>
    `}).join("");e.innerHTML=t,e.querySelectorAll('input[type="checkbox"]').forEach(n=>{n.addEventListener("change",ga)})}function qa(){if(O?.modal)return O;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${b(a("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${b(a("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${b(a("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${b(a("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),s=e.querySelector("[data-quote-meta]"),i=e.querySelector("[data-quote-download]"),r=document.createElement("iframe");r.className="quote-preview-frame",r.setAttribute("title",a("reservations.quote.previewTitle","معاينة عرض السعر")),r.setAttribute("loading","lazy"),r.setAttribute("frameborder","0");const o=document.createElement("div");o.className="quote-preview-zoom-controls",o.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${b(a("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${b(a("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${b(a("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const c=document.createElement("div");c.className="quote-preview-frame-wrapper",c.appendChild(r),n.innerHTML="",n.appendChild(o),n.appendChild(c),i?.addEventListener("click",async()=>{if(C){i.disabled=!0;try{await Sa()}finally{i.disabled=!1}}}),O={modal:e,toggles:t,preview:n,previewFrameWrapper:c,zoomControls:o,zoomValue:o.querySelector("[data-zoom-value]"),previewFrame:r,meta:s,downloadBtn:i};const l=o.querySelector("[data-zoom-out]"),m=o.querySelector("[data-zoom-in]"),d=o.querySelector("[data-zoom-reset]");return l?.addEventListener("click",()=>Tt(-.1)),m?.addEventListener("click",()=>Tt(.1)),d?.addEventListener("click",()=>_e(1)),_e(ve),O}function _e(e){ve=Math.min(Math.max(e,.2),2),an(ve),O?.zoomValue&&(O.zoomValue.textContent=`${Math.round(ve*100)}%`)}function Tt(e){_e(ve+e)}function an(e){if(!O?.previewFrame||!O.previewFrameWrapper)return;const t=O.previewFrame,n=O.previewFrameWrapper,s=Number(t.dataset.baseWidth)||794,i=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",n.style.width=`${s}px`,n.style.maxWidth=`${s}px`,n.style.minWidth=`${s}px`,n.style.minHeight=`${i}px`,n.style.height=`${i}px`}function wa(){if(!O?.meta||!C)return;const{meta:e}=O;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${b(a("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${b(C.quoteNumber)}</strong></div>
      <div><span>${b(a("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${b(C.quoteDateLabel)}</strong></div>
    </div>
  `}async function Sa(){if(!C)return;await la();const e=nn({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel}),t=document.createElement("div");t.innerHTML=e,t.style.position="fixed",t.style.top="-10000px",t.style.left="0",t.style.zIndex="-1",document.body.appendChild(t),Me(t),tn(t);const n=t.firstElementChild;n&&(n.setAttribute("dir","rtl"),n.style.direction="rtl",n.style.textAlign="right",n.setAttribute("data-theme","light"),n.classList.remove("dark","dark-mode"),n.style.margin="0",n.style.padding="0",n.style.width="210mm",n.style.maxWidth="210mm",n.style.marginLeft="auto",n.style.marginRight="auto",n.scrollTop=0,n.scrollLeft=0);try{const s=`quotation-${C.quoteNumber}.pdf`;await window.html2pdf().set({margin:0,pagebreak:{mode:["css","legacy"],avoid:["tr"]},filename:s,html2canvas:{scale:2,useCORS:!0,scrollX:0,scrollY:0,onclone:i=>ia(i)},jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}}).from(t.firstElementChild).save(),C.sequenceCommitted||(pa(C.quoteSequence),C.sequenceCommitted=!0)}finally{document.body.removeChild(t)}}function xa(){const e=qa();e?.modal&&(_e(1),ya(),wa(),sn(),window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(e.modal).show())}async function Ea({reservation:e,customer:t,project:n}){if(!e){w(a("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const s=ha(e),{totalsDisplay:i,totals:r,rentalDays:o}=ba(e,s,n),c=a("reservations.create.summary.currency","ريال"),{sequence:l,quoteNumber:m}=ma(),d=new Date;C={reservation:e,customer:t,project:n,technicians:s,totals:r,totalsDisplay:i,rentalDays:o,currencyLabel:c,sections:new Set(Zt.filter(h=>h.defaultSelected).map(h=>h.id)),quoteSequence:l,quoteNumber:m,quoteDate:d,quoteDateLabel:va(d),sequenceCommitted:!1},xa()}function Ia({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:s}={}){const i=ze(),{reservations:r=[],customers:o=[],technicians:c=[],projects:l=[]}=V(),m=Array.isArray(i)?i:c||[],d=new Map((l||[]).map(y=>[String(y.id),y])),h=document.getElementById(e);if(!h){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){h.innerHTML=`<p>${a("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const q=t||Qs(),u=new Map(o.map(y=>[String(y.id),y])),S=new Map(m.map(y=>[String(y.id),y])),g=Ys({reservations:r,filters:q,customersMap:u,techniciansMap:S,projectsMap:d});if(g.length===0){h.innerHTML=`<p>${a("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}h.innerHTML=`<div class="reservations-grid">${Gs({entries:g,customersMap:u,techniciansMap:S,projectsMap:d})}</div>`,h.querySelectorAll('[data-action="details"]').forEach(y=>{const p=Number(y.dataset.reservationIndex);Number.isNaN(p)||y.addEventListener("click",()=>{typeof n=="function"&&n(p)})}),h.querySelectorAll('button[data-action="confirm"]').forEach(y=>{const p=Number(y.dataset.reservationIndex);Number.isNaN(p)||y.addEventListener("click",f=>{f.stopPropagation(),typeof s=="function"&&s(p,f)})})}function Ca(e,{onEdit:t,onDelete:n,getEditContext:s}={}){const{reservations:i=[],customers:r=[],projects:o=[]}=V(),c=i[e];if(!c)return w(a("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=r.find(p=>String(p.id)===String(c.customerId)),m=c.projectId?o.find(p=>String(p.id)===String(c.projectId)):null,d=document.getElementById("reservation-details-body");if(d){const p=ze()||[];d.innerHTML=Ks(c,l,p,e,m)}const h=document.getElementById("reservationDetailsModal"),q=()=>{h&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(h)?.hide()},u=document.getElementById("reservation-details-edit-btn");u&&(u.onclick=()=>{q(),typeof t=="function"&&t(e,{reservation:c,customer:l,getEditContext:s})});const S=document.getElementById("reservation-details-delete-btn");S&&(S.onclick=()=>{q(),typeof n=="function"&&n(e,{reservation:c,customer:l})});const g=d?.querySelector('[data-action="open-project"]');g&&m&&g.addEventListener("click",()=>{q();const p=m?.id!=null?String(m.id):"",f=p?`projects.html?project=${encodeURIComponent(p)}`:"projects.html";window.location.href=f});const y=document.getElementById("reservation-details-export-btn");return y&&(y.onclick=async()=>{try{await Ea({reservation:c,customer:l,project:m})}catch(p){console.error("❌ [reservations] export to PDF failed",p),w(a("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),h&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(h).show(),!0}let De=null,ee=[],rt=null,K={};function Ue(){return{index:De,items:ee}}function Ve(e,t){De=typeof e=="number"?e:null,ee=Array.isArray(t)?[...t]:[]}function rn(){De=null,ee=[],$s()}function ka(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Te(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ta(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const s=a("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),i=a("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",o=Array.isArray(e)?[...e].sort((l,m)=>String(m.createdAt||m.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Te(s)}</option>`];o.forEach(l=>{c.push(`<option value="${Te(l.id)}">${Te(l.title||s)}</option>`)}),r&&!o.some(l=>String(l.id)===r)&&c.push(`<option value="${Te(r)}">${Te(i)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function on(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1)}}function $t(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:s,renderEditItems:i,updateEditReservationSummary:r,ensureModal:o}={}){const{customers:c,projects:l}=V(),d=_t()?.[e];if(!d){w(a("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}K={...K,reservation:d,projects:l||[]},t?.(),Ta(l||[],d);const h=d.projectId&&l?.find?.(N=>String(N.id)===String(d.projectId))||null,{effectiveConfirmed:q,projectLinked:u}=ce(d,h),S=d.items?d.items.map(N=>({...N,equipmentId:N.equipmentId??N.equipment_id??N.id,barcode:U(N?.barcode)})):[];Ve(e,S);const g=a("reservations.list.unknownCustomer","غير معروف"),y=c?.find?.(N=>String(N.id)===String(d.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const p=document.getElementById("edit-res-id");p&&(p.value=d.reservationId||d.id);const f=document.getElementById("edit-res-customer");f&&(f.value=y?.customerName||g);const A=typeof s=="function"?s(d.start):{date:"",time:""},k=typeof s=="function"?s(d.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",k.date),n?.("edit-res-end-time",k.time);const $=document.getElementById("edit-res-notes");$&&($.value=d.notes||"");const R=document.getElementById("edit-res-discount");R&&(R.value=v(d.discount??0));const x=document.getElementById("edit-res-discount-type");x&&(x.value=d.discountType||"percent");const L=document.getElementById("edit-res-tax");L&&(L.checked=d.projectId?!1:!!d.applyTax);const T=document.getElementById("edit-res-confirmed");T&&(T.checked=q,T.disabled=u,T.classList.toggle("disabled",u),T.closest(".form-check")?.classList.toggle("disabled",u));const j=document.getElementById("edit-res-paid");j&&(j.value=d.paid===!0||d.paid==="paid"?"paid":"unpaid"),Is((d.technicians||[]).map(N=>String(N))),i?.(S),on(),r?.();const _=document.getElementById("editReservationModal");rt=ka(_,o),rt?.show?.()}async function $a({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:s,renderReservations:i,populateEquipmentDescriptionLists:r,handleReservationsMutation:o}={}){if(De===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-end")?.value?.trim(),d=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",h=document.getElementById("edit-res-notes")?.value||"",q=v(document.getElementById("edit-res-discount")?.value||"0"),u=parseFloat(q)||0,S=document.getElementById("edit-res-discount-type")?.value||"percent",g=document.getElementById("edit-res-confirmed")?.checked||!1,y=document.getElementById("edit-res-paid")?.value||"unpaid",p=document.getElementById("edit-res-project")?.value||"",f=Cs();if(!c||!m){w(a("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const A=typeof e=="function"?e:(D,G)=>`${D}T${G||"00:00"}`,k=A(c,l),$=A(m,d);if(k&&$&&new Date(k)>new Date($)){w(a("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=_t()?.[De];if(!x){w(a("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ee)||ee.length===0&&f.length===0){w(a("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const D of ee)if(ye(D.barcode)){w(a("reservations.toast.updateEquipmentMaintenance","⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة"));return}const L=typeof t=="function"?t:()=>!1;for(const D of ee){const G=U(D.barcode);if(L(G,k,$,x.id??x.reservationId)){w(a("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const T=typeof n=="function"?n:()=>!1;for(const D of f)if(T(D,k,$,x.id??x.reservationId)){w(a("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const j=document.getElementById("edit-res-tax"),_=Array.isArray(K.projects)&&K.projects.length?K.projects:V().projects||[],N=p&&_.find(D=>String(D.id)===String(p))||null,X={...x,projectId:p?String(p):null,confirmed:g},{effectiveConfirmed:Y,projectLinked:I,projectStatus:H}=ce(X,N),ae=I?!1:j?.checked||!1,le=Nt(ee,u,S,ae,f,{start:k,end:$});let z=x.status??"pending";I?z=N?.status??H??z:["completed","cancelled"].includes(String(z).toLowerCase())||(z=g?"confirmed":"pending");const te=Rt({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:k,end:$,status:z,title:x.title??null,location:x.location??null,notes:h,projectId:p?String(p):null,totalAmount:le,discount:u,discountType:S,applyTax:ae,paidStatus:y,confirmed:Y,items:ee.map(D=>({...D,equipmentId:D.equipmentId??D.id})),technicians:f});try{const D=await ks(x.id||x.reservationId,te);await Ts(),w(a("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),rn(),o?.({type:"updated",reservation:D}),i?.(),r?.(),rt?.hide?.()}catch(D){console.error("❌ [reservationsEdit] Failed to update reservation",D);const G=Mt(D)?D.message:a("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");w(G,"error")}}function _a(e={}){K={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:s,renderEditItems:i}=K,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=v(r.value),t?.()}),r.dataset.listenerAttached="true");const o=document.getElementById("edit-res-discount-type");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>t?.()),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>t?.()),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-project");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{on();const u=document.getElementById("edit-res-confirmed");if(u){const S=Array.isArray(K.projects)&&K.projects.length?K.projects:V().projects||[],g=l.value&&S.find(k=>String(k.id)===String(l.value))||null,p={...K?.reservation??{},projectId:l.value||null,confirmed:u.checked},{effectiveConfirmed:f,projectLinked:A}=ce(p,g);u.checked=f,u.disabled=A,u.classList.toggle("disabled",A),u.closest(".form-check")?.classList.toggle("disabled",A)}t?.()}),l.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{$a(K).catch(u=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",u)})}),m.dataset.listenerAttached="true");const d=document.getElementById("edit-res-equipment-barcode");if(d&&!d.dataset.listenerAttached){d.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),n?.(d))});let u=null;const S=()=>{if(clearTimeout(u),!d.value?.trim())return;const{start:g,end:y}=getEditReservationDateRange();!g||!y||(u=setTimeout(()=>{n?.(d)},150))};d.addEventListener("input",S),d.addEventListener("change",()=>n?.(d)),d.dataset.listenerAttached="true"}const h=document.getElementById("edit-res-equipment-description");h&&!h.dataset.listenerAttached&&(h.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),s?.(h,"edit"))}),h.dataset.listenerAttached="true");const q=document.getElementById("editReservationModal");q&&!q.dataset.cleanupAttached&&(q.addEventListener("hidden.bs.modal",()=>{rn(),t?.(),i?.([])}),q.dataset.cleanupAttached="true")}function ft(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",s=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Ae(e,n),end:Ae(t,s)}}function Qe(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=a("reservations.create.equipment.none","لا توجد معدات"),s=a("reservations.create.summary.currency","ريال"),i=a("reservations.create.equipment.imageAlt","صورة");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="6" class="text-center">${n}</td></tr>`,At(t);return}t.innerHTML=e.map((r,o)=>{const c=Be(r),l=`${v(String(r.price??0))} ${s}`,m=v(String(r.qty||1)),d=c?`<img src="${c}" alt="${i}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${r.barcode||"-"}</td>
          <td>${r.desc||"-"}</td>
          <td>${l}</td>
          <td>${m}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${o}">🗑️</button></td>
        </tr>
      `}).join(""),At(t)}function At(e){!e||e.dataset.removeListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('[data-action="remove-edit-item"]');if(!n)return;t.preventDefault();const s=Number(n.dataset.itemIndex);Number.isNaN(s)||Aa(s)}),e.dataset.removeListenerAttached="true")}function Se(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),s=document.getElementById("edit-res-paid");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",Se),s.dataset.listenerAttached="true"),he(s);const i=v(t?.value||"0");t&&(t.value=i);const r=parseFloat(i)||0,o=n?.value||"percent",c=!!document.getElementById("edit-res-project")?.value,l=document.getElementById("edit-res-tax"),m=c?!1:l?.checked||!1,d=s?.value||"unpaid";he(s,d);const{items:h=[]}=Ue(),{start:q,end:u}=ft();e.innerHTML=As({items:h,discount:r,discountType:o,applyTax:m,paidStatus:d,start:q,end:u})}function Aa(e){if(e==null)return;const{index:t,items:n}=Ue();if(!Array.isArray(n))return;const s=n.filter((i,r)=>r!==e);Ve(t,s),Qe(s),Se()}function Da(e){const t=e?.value??"",n=U(t);if(!n)return;const s=ct(n);if(!s){w(a("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}if(ye(n)){w(a("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const i=U(n),{index:r,items:o=[]}=Ue();if(o.findIndex(S=>U(S.barcode)===i)>-1){w(a("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:m}=ft();if(!l||!m){w(a("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:d=[]}=V(),h=r!=null&&d[r]||null,q=h?.id??h?.reservationId??null;if(ge(i,l,m,q)){w(a("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const u=[...o,{id:s.id,equipmentId:s.id,barcode:i,desc:s.desc,qty:1,price:s.price,image:s.image||s.imageUrl||s.img||null}];Ve(r,u),e&&(e.value=""),Qe(u),Se()}function He(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Wt(t),s=U(n?.barcode||t);if(!n||!s){w(a("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(ye(s)){w(a("reservations.toast.equipmentMaintenanceStrict","⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز"));return}const{start:i,end:r}=ft();if(!i||!r){w(a("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:o,items:c=[]}=Ue();if(c.some(u=>U(u.barcode)===s)){w(a("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:m=[]}=V(),d=o!=null&&m[o]||null,h=d?.id??d?.reservationId??null;if(ge(s,i,r,h)){w(a("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const q=[...c,{id:n.id,equipmentId:n.id,barcode:s,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ve(o,q),Qe(q),Se(),e.value=""}function La(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),He(e))});const t=()=>{Yt(e.value,"edit-res-equipment-description-options")&&He(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Se()});function Ba(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){st(e);return}He(e)}}function Ha(){qe(),La()}function ja(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const s=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,s)}else n._flatpickr.clear();return}n.value=t||""}}function za(){return Bs().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=V()||{};js(e||[]),Gt()})}function ht(e=null){Gt(),cn(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Na(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function it(){return{populateEquipmentDescriptionLists:qe,setFlatpickrValue:ja,splitDateTime:Lt,renderEditItems:Qe,updateEditReservationSummary:Se,addEquipmentByDescription:Ba,addEquipmentToEditingReservation:Da,addEquipmentToEditingByDescription:He,combineDateTime:Ae,hasEquipmentConflict:ge,hasTechnicianConflict:jt,renderReservations:cn,handleReservationsMutation:ht,ensureModal:Na}}function cn(e="reservations-list",t=null){Ia({containerId:e,filters:t,onShowDetails:ln,onConfirmReservation:un})}function ln(e){return Ca(e,{getEditContext:it,onEdit:(t,{reservation:n})=>{mn(t,n)},onDelete:dn})}function dn(e){return Dt()?window.confirm(a("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Ds(e,{onAfterChange:ht}):!1:(vs(),!1)}function un(e){return Ls(e,{onAfterChange:ht})}function mn(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}$t(e,it());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}$t(e,it());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(o){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",o)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}fs({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const s=n.toString(),i=s?`dashboard.html?${s}#reservations`:"dashboard.html#reservations";window.location.href=i}function Oa(){typeof window>"u"||(window.showReservationDetails=ln,window.deleteReservation=dn,window.confirmReservation=un,window.editReservation=mn)}export{Kt as a,Oa as b,Fa as c,_a as d,Ha as e,Gt as f,it as g,P as h,Pa as i,ht as j,za as l,cn as r,ln as s,Se as u};
