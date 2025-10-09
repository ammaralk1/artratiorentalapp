import{w as La,e as Q,t as o,n as g,j as I,y as Da,f as we,k as Jt,o as ja,u as Ba}from"./auth.js";import{G as K,H as Ct,z as J,I as Na,J as Me,K as zt,L as en,M as Pa,N as Ra,O as Fe,P as Ee,Q as tn,R as Ma,S as nn,t as an,T as sn,U as _a,V as Fa,s as tt,i as rn,W as on,X as Ha,Y as za,Z as Oa,d as Re,r as he,c as ln,g as cn,_ as Ua,$ as Va,v as Ka,D as Qa,a0 as Wa,a1 as Ga,a2 as Ya,a3 as Xa,w as Za,y as Ja}from"./projectsService.js";La({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.create.equipment.table.code":"الكود","reservations.create.equipment.table.description":"الوصف","reservations.create.equipment.table.price":"السعر","reservations.create.equipment.table.image":"الصورة","reservations.create.equipment.table.delete":"حذف","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.headers.code":"الكود","reservations.edit.table.headers.description":"الوصف","reservations.edit.table.headers.price":"السعر","reservations.edit.table.headers.quantity":"الكمية","reservations.edit.table.headers.image":"الصورة","reservations.edit.table.headers.delete":"حذف","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"📊 تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"🔄 تحديث","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"متوسط الحجز —","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"📈 تطور الحجوزات","reservations.reports.chart.volume.hint":"آخر 6 أشهر","reservations.reports.chart.status.title":"📊 توزيع الحالات والدفع","reservations.reports.chart.status.hint":"نسب مئوية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.topCustomers.title":"👥 أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"📄 تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.topEquipment.title":"🎥 المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.create.equipment.table.code":"Code","reservations.create.equipment.table.description":"Description","reservations.create.equipment.table.price":"Price","reservations.create.equipment.table.image":"Image","reservations.create.equipment.table.delete":"Delete","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.headers.code":"Code","reservations.edit.table.headers.description":"Description","reservations.edit.table.headers.price":"Price","reservations.edit.table.headers.quantity":"Qty","reservations.edit.table.headers.image":"Image","reservations.edit.table.headers.delete":"Delete","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"📊 Performance Reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"🔄 Refresh","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Average reservation —","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"📈 Reservation trend","reservations.reports.chart.volume.hint":"Last 6 months","reservations.reports.chart.status.title":"📊 Status & payment breakdown","reservations.reports.chart.status.hint":"Percentages","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.topCustomers.title":"👥 Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"📄 Reservation Details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.topEquipment.title":"🎥 Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});function He(e={}){return e.image||e.imageUrl||e.img||""}function es(e){if(!e)return null;const t=K(e),{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}function It(e){const t=K(e);if(!t)return null;const{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}function Ce(e){return It(e)?.status==="صيانة"}let vt=null,dn=[],bt=new Map,ht=new Map;function un(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function kt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Tt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function mn(e,t,{allowPartial:n=!1}={}){const a=J(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,l)=>{l.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function gt(e,t={}){return mn(bt,e,t)}function yt(e,t={}){return mn(ht,e,t)}function xe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function pn(e){dn=Array.isArray(e)?[...e]:[]}function At(){return dn}function $t(e){return e&&At().find(t=>String(t.id)===String(e))||null}function Ot(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function ts(){const e=document.getElementById("res-company-share");if(!e||!e.checked)return null;const t=e.dataset.companyShare??e.value??zt,n=g(String(t).replace("%","").trim()),a=parseFloat(n);return Number.isFinite(a)?a:zt}function ns(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ut(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function Vt(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ce({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=kt();if(!n||!a||!s)return;const r=Ct()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),l=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const c=new Set;bt=new Map;const u=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:Vt(p)||l})).filter(p=>{if(!p.label)return!1;const S=J(p.label);return!S||c.has(S)?!1:(c.add(S),bt.set(S,p),!0)}).sort((p,S)=>p.label.localeCompare(S.label,void 0,{sensitivity:"base"}));s.innerHTML=u.map(p=>`<option value="${un(p.label)}"></option>`).join("");const d=t?"":n.value,m=e?String(e):a.value?String(a.value):"",b=m?r.find(p=>String(p.id)===m):null;if(b){const p=Vt(b)||l;a.value=String(b.id),n.value=p,n.dataset.selectedId=String(b.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":d}function ze({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Tt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:At()||[],l=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",l);const c=[...i].filter(w=>w&&w.id!=null).sort((w,x)=>String(x.createdAt||x.start||"").localeCompare(String(w.createdAt||w.start||""))),u=n?"":a.value,d=o("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;ht=new Map;const b=c.map(w=>{const x=Ot(w)||d;return{id:String(w.id),label:x}}).filter(w=>{if(!w.label)return!1;const x=J(w.label);return!x||m.has(x)?!1:(m.add(x),ht.set(x,w),!0)});r.innerHTML=b.map(w=>`<option value="${un(w.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",S=p?c.find(w=>String(w.id)===p):null;if(S){const w=Ot(S)||d;s.value=String(S.id),a.value=w,a.dataset.selectedId=String(S.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":u}function Ge(e,t,n){const{date:a,time:s}=en(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const l=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,l)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const l=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,l)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function fn(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||ze({selectedValue:a});const r=(Ct()||[]).find(d=>String(d.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";ce(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const l=Ut(e,"start"),c=Ut(e,"end");l&&Ge("res-start","res-start-time",l),c&&Ge("res-end","res-end-time",c);const u=document.getElementById("res-notes");u&&e.description&&(t||!u.value)&&(u.value=e.description),Se(),z()}function vn({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Q(),s=Array.isArray(a)?a:[];pn(s);const r=t!=null?String(t):n.value?String(n.value):"";ze({selectedValue:r,projectsList:s}),Se(),z()}function Se(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Lt(){const{input:e,hidden:t}=Tt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?yt(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=$t(r.id);i?fn(i,{skipProjectSelectUpdate:!0}):(Se(),z())}else t.value="",e.dataset.selectedId="",Se(),z()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?yt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Dt(){const{input:e,hidden:t}=kt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?gt(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),z()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?gt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function as(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(ze({selectedValue:String(n.projectId)}),Se());const i=$t(n.projectId);if(i?fn(i,{forceNotes:!!n.forceNotes}):z(),n.start&&Ge("res-start","res-start-time",n.start),n.end&&Ge("res-end","res-end-time",n.end),n.customerId){const c=(Ct()||[]).find(u=>String(u.id)===String(n.customerId));c?.id!=null&&ce({selectedValue:String(c.id)})}else ce({selectedValue:""})}function nt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Me(e,n),end:Me(t,a)}}function bn(e){const t=J(e);if(!t)return null;const n=on()||[],a=n.find(s=>J(s?.desc||s?.description||"")===t);return a||n.find(s=>J(s?.desc||s?.description||"").includes(t))||null}function hn(e,t="equipment-description-options"){const n=J(e);if(!n)return!1;const a=document.getElementById(t);return a&&a.options&&Array.from(a.options).some(i=>J(i.value)===n)?!0:(on()||[]).some(r=>J(r?.desc||r?.description||"")===n)}function Ie(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),{equipment:n=[]}=Q(),a=Array.isArray(n)?n:[];Oa(a);const r=Array.from(new Set(a.map(i=>i?.desc||i?.description||"").filter(Boolean))).sort((i,l)=>i.localeCompare(l,"ar",{sensitivity:"base"})).map(i=>`<option value="${i}"></option>`).join("");e&&(e.innerHTML=r),t&&(t.innerHTML=r)}function pt(e,t){const n=K(e);if(!n)return!1;const{start:a,end:s}=nt();if(!a||!s)return I(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Fe().some(l=>K(l.barcode)===n))return I(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Ee(n,a,s))return I(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=It(n);return i?Ce(i.barcode)?(I(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")),!1):(tn({id:i.id,equipmentId:i.id,barcode:n,desc:i.desc,qty:1,price:i.price,image:He(i)}),t&&(t.value=""),ke(),z(),I(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(I(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1)}function qt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=bn(t);if(!n){I(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(es(n.barcode)?.status==="صيانة"){I(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const s=K(n.barcode);if(!s){I(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:n.id,equipmentId:n.id,barcode:s,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:He(n)},{start:i,end:l}=nt();if(!i||!l){I(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Fe().some(d=>K(d.barcode)===s)){I(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Ee(s,i,l)){I(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}if(Ce(s)){I(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}tn(r),ke(),z(),e.value=""}function ss(){Ie();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),qt(e))});const t=()=>{hn(e.value,"equipment-description-options")&&qt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function ke(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Fe(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","ريال"),r=o("reservations.create.equipment.imageAlt","صورة");if(n.length===0){t.innerHTML=`<tr><td colspan="5">${a}</td></tr>`;return}t.innerHTML=n.map((i,l)=>{const c=He(i),u=`${g(String(i.price??0))} ${s}`,d=c?`<img src="${c}" alt="${r}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${i.barcode||"-"}</td>
          <td>${i.desc}</td>
          <td>${u}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${l}">🗑️</button></td>
        </tr>
      `}).join("")}function z(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(g(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,i=document.getElementById("res-payment-status")?.value||"unpaid",{start:l,end:c}=nt(),u=ts(),d=document.getElementById("res-payment-status");xe(d,i),Na({selectedItems:Fe(),discount:t,discountType:n,applyTax:r,paidStatus:i,start:l,end:c,companySharePercent:u})}function rs(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=g(r.target.value),z()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",z),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",z),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",z),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{xe(s),z()}),s.dataset.listenerAttached="true"),xe(s)}function os(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){z();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),z()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function Kt(){const{input:e,hidden:t}=kt(),{input:n,hidden:a}=Tt(),{customers:s}=Q();let r=t?.value?String(t.value):"";if(!r&&e?.value){const k=gt(e.value,{allowPartial:!0});k&&(r=String(k.id),t&&(t.value=r),e.value=k.label,e.dataset.selectedId=r)}const i=s.find(k=>String(k.id)===r);if(!i){I(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const l=i.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const k=yt(n.value,{allowPartial:!0});k&&(c=String(k.id),a&&(a.value=c),n.value=k.label,n.dataset.selectedId=c)}const u=document.getElementById("res-start").value,d=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",b=document.getElementById("res-end-time")?.value||"00:00";if(!u||!d){I(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${u}T${m}`,S=`${d}T${b}`,w=new Date(p),x=new Date(S);if(Number.isNaN(w.getTime())||Number.isNaN(x.getTime())||w>=x){I(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const f=Ma(),h=Fe();if(h.length===0&&f.length===0){I(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const D=document.getElementById("res-notes")?.value||"",$=parseFloat(g(document.getElementById("res-discount")?.value))||0,N=document.getElementById("res-discount-type")?.value||"percent",v=document.getElementById("res-payment-status")?.value||"unpaid",y=c?$t(c):null,E=ns(y);if(c&&!y){I(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const k of h)if(Ce(k.barcode)){I(o("reservations.toast.cannotCreateEquipmentMaintenance","⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة"));return}for(const k of h){const L=K(k.barcode);if(Ee(L,p,S)){I(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const k of f)if(nn(k,p,S)){I(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const R=document.getElementById("res-tax"),T=!!c?!1:R?.checked||!1,j=an(h,$,N,T,f,{start:p,end:S}),V=Da(),H=sn({reservationCode:V,customerId:l,start:p,end:S,status:E?"confirmed":"pending",title:null,location:null,notes:D,projectId:c||null,totalAmount:j,discount:$,discountType:N,applyTax:T,paidStatus:v,confirmed:E,items:h.map(k=>({...k,equipmentId:k.equipmentId??k.id})),technicians:f});try{const k=await _a(H);Fa(),Ie(),tt(),is(),I(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof vt=="function"&&vt({type:"created",reservation:k})}catch(k){console.error("❌ [reservations/createForm] Failed to create reservation",k);const L=rn(k)?k.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");I(L,"error")}}function is(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ce({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),ze({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const l=document.getElementById("res-payment-status");l&&(l.value="unpaid",xe(l,"unpaid")),Ha(),za([]),ke(),Se(),z()}function ls(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('button[data-action="remove-item"]');if(!n)return;const a=Number(n.dataset.index);Ra(a),ke(),z()}),e.dataset.listenerAttached="true")}function cs(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),pt(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const a=e.value;if(!a?.trim())return;const{start:s,end:r}=nt();!s||!r||(t=setTimeout(()=>{pt(a,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>pt(e.value,e)),e.dataset.listenerAttached="true"}function ds(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await Kt()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await Kt()}),t.dataset.listenerAttached="true")}function gr({onAfterSubmit:e}={}){vt=typeof e=="function"?e:null;const{customers:t,projects:n}=Q();Pa(t||[]),ce(),Dt(),pn(n||[]),vn({projectsList:n}),Lt(),Ie(),ss(),os(),rs(),ls(),cs(),ds(),as(),z(),ke()}function gn(){Ie(),vn(),ce(),Dt(),Lt(),ke(),z()}if(typeof document<"u"){const e=()=>{ce(),ze({projectsList:At()}),Dt(),Lt(),z()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function yn(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:be(t),endDate:be(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:be(n),endDate:be(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:be(n),endDate:be(a)}}return e==="upcoming"?{startDate:be(t),endDate:""}:{startDate:"",endDate:""}}function us(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=g(t?.value||"").trim(),i=g(n?.value||"").trim(),l=a?.value||"";if(new Set(["","today","week","month"]).has(l)||(l="",a&&(a.value=""),Ye(t),Ye(n),r="",i=""),!r&&!i&&l){const u=yn(l);r=u.startDate,i=u.endDate}return{searchTerm:J(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:l}}function yr(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=g(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{ms(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const l=document.getElementById("clear-filters");l&&!l.dataset.listenerAttached&&(l.addEventListener("click",()=>{n&&(n.value=""),Ye(a),Ye(s),r&&(r.value=""),i&&(i.value=""),t()}),l.dataset.listenerAttached="true")}function ms(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=yn(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function be(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Ye(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function ps({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((f,h)=>({reservation:f,index:h})),i=t.searchTerm||"",l=t.searchReservationId||"",c=t.searchCustomerName||"",u=t.startDate||"",d=t.endDate||"",m=t.status||"",b=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,S=u?new Date(`${u}T00:00:00`):null,w=d?new Date(`${d}T23:59:59`):null,x=r.filter(({reservation:f})=>{const h=n.get(String(f.customerId)),D=s?.get?.(String(f.projectId)),$=f.start?new Date(f.start):null,N=Re(f),{effectiveConfirmed:v}=he(f,D);if(b!=null&&String(f.customerId)!==String(b)||p!=null&&!(Array.isArray(f.technicians)?f.technicians.map(T=>String(T)):[]).includes(String(p))||m==="confirmed"&&!v||m==="pending"&&v||m==="completed"&&!N||S&&$&&$<S||w&&$&&$>w||l&&!J([f.reservationId,f.id].filter(Boolean).map(String).join(" ")).includes(l)||c&&!J(h?.customerName||"").includes(c))return!1;if(!i)return!0;const y=f.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",E=(f.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return J([f.reservationId,h?.customerName,f.notes,y,E,D?.title].filter(Boolean).join(" ")).includes(i)});return x.sort((f,h)=>{const D=Re(f.reservation),$=Re(h.reservation);if(D!==$)return D?1:-1;const N=f.reservation.start?new Date(f.reservation.start).getTime():0;return(h.reservation.start?new Date(h.reservation.start).getTime():0)-N}),x}function fs({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","ريال"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),l=o("reservations.list.noNotes","لا توجد ملاحظات"),c=o("reservations.list.itemsCountShort","{count} عنصر"),u=o("reservations.list.crew.separator","، "),d=o("reservations.list.status.confirmed","✅ مؤكد"),m=o("reservations.list.status.pending","⏳ غير مؤكد"),b=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),S=o("reservations.list.actions.confirm","✔️ تأكيد"),w=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),x=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),f={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:h,index:D})=>{const $=t.get(String(h.customerId)),N=h.projectId?a?.get?.(String(h.projectId)):null,v=Re(h),y=h.paid===!0||h.paid==="paid",{effectiveConfirmed:E,projectLinked:R}=he(h,N),P=E?"status-confirmed":"status-pending",T=y?"status-paid":"status-unpaid";let j=`<span class="reservation-chip status-chip ${P}">${E?d:m}</span>`,V=`<span class="reservation-chip status-chip ${T}">${y?b:p}</span>`,H=y?" tile-paid":" tile-unpaid";v&&(H+=" tile-completed");let k="";v&&(j=`<span class="reservation-chip status-chip status-completed">${d}</span>`,V=`<span class="reservation-chip status-chip status-completed">${y?b:p}</span>`,k=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const L=!R&&!E?`<button class="tile-confirm" data-reservation-index="${D}" data-action="confirm">${S}</button>`:"",Y=L?`<div class="tile-actions">${L}</div>`:"",W=h.items?.length||0,O=(h.technicians||[]).map(U=>n.get(String(U))).filter(Boolean),X=O.map(U=>U.name).join(u)||"—",M=g(String(h.reservationId??"")),te=h.start?g(we(h.start)):"-",ge=h.end?g(we(h.end)):"-",oe=g(String(h.cost??0)),ye=g(String(W)),Ae=h.notes?g(h.notes):l,Oe=c.replace("{count}",ye),$e=h.applyTax?`<small>${r}</small>`:"";let de=w;return h.projectId&&(de=N?.title?g(N.title):x),`
      <div class="${L?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${H}"${k} data-reservation-index="${D}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${M}</div>
          <div class="tile-badges">
            ${j}
            ${V}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${f.client}</span>
            <span class="tile-value">${$?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.project}</span>
            <span class="tile-value">${de}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.start}</span>
            <span class="tile-value tile-inline">${te}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.end}</span>
            <span class="tile-value tile-inline">${ge}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.cost}</span>
            <span class="tile-value">${oe} ${s} ${$e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.equipment}</span>
            <span class="tile-value">${Oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${f.crew}</span>
            <span class="tile-value">${O.length?X:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ae}</span>
          </div>
        </div>
        ${Y}
      </div>
    `}).join("")}function ft(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vs(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=he(e,s),l=e.paid===!0||e.paid==="paid",c=Re(e),u=e.items||[],{technicians:d=[]}=Q(),m=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(d)?d:[]),b=new Map;m.forEach(A=>{if(!A||A.id==null)return;const F=String(A.id),Z=b.get(F)||{};b.set(F,{...Z,...A})});const p=(e.technicians||[]).map(A=>b.get(String(A))).filter(Boolean),S=Jt(),w=ln(e.start,e.end),x=(A={})=>{const F=[A.dailyWage,A.daily_rate,A.dailyRate,A.wage,A.rate];for(const Z of F){if(Z==null)continue;const qe=parseFloat(g(String(Z)));if(Number.isFinite(qe))return qe}return 0},h=u.reduce((A,F)=>A+(F.qty||1)*(F.price||0),0)*w,$=p.reduce((A,F)=>A+x(F),0)*w,N=h+$,v=parseFloat(e.discount)||0,y=e.discountType==="amount"?v:N*(v/100),E=Math.max(0,N-y),R=r?!1:e.applyTax,P=R?E*.15:0,T=Number(e.cost),j=Number.isFinite(T),V=E+P,H=r?Math.round(V):j?T:Math.round(V),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,L=k!=null?parseFloat(g(String(k))):NaN,O=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(L)&&L>0)&&Number.isFinite(L)?L:0,X=O>0?Math.max(0,(Number.isFinite(H)?H:0)*(O/100)):0,M=g(String(e.reservationId??e.id??"")),te=e.start?g(we(e.start)):"-",ge=e.end?g(we(e.end)):"-",oe=g(String(p.length)),ye=g(h.toFixed(2)),Ae=g(y.toFixed(2)),Oe=g(E.toFixed(2)),$e=g(P.toFixed(2)),de=g((H??0).toFixed(2)),ue=g(String(w)),U=o("reservations.create.summary.currency","ريال"),Ue=o("reservations.details.labels.discount","الخصم"),ot=o("reservations.details.labels.tax","الضريبة (15%)"),Ve=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Ke=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ie=o("reservations.details.labels.duration","عدد الأيام"),it=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le={index:"#",code:o("reservations.details.table.headers.code","الكود"),description:o("reservations.details.table.headers.description","الوصف"),quantity:o("reservations.details.table.headers.quantity","الكمية"),price:o("reservations.details.table.headers.price","السعر"),image:o("reservations.details.table.headers.image","الصورة")},me=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Le=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),De=o("reservations.details.technicians.roleUnknown","غير محدد"),lt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),ct=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),dt=o("reservations.list.status.confirmed","✅ مؤكد"),B=o("reservations.list.status.pending","⏳ غير مؤكد"),G=o("reservations.list.payment.paid","💳 مدفوع"),pe=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Vn=o("reservations.list.status.completed","📁 منتهي"),Kn=o("reservations.details.labels.id","🆔 رقم الحجز"),Qn=o("reservations.details.section.bookingInfo","بيانات الحجز"),Wn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Gn=o("reservations.details.labels.finalTotal","المجموع النهائي"),Yn=o("reservations.details.section.crew","😎 الفريق الفني"),Xn=o("reservations.details.crew.count","{count} عضو"),Zn=o("reservations.details.section.items","📦 المعدات المرتبطة"),Jn=o("reservations.details.items.count","{count} عنصر"),ea=o("reservations.details.actions.edit","✏️ تعديل"),ta=o("reservations.details.actions.delete","🗑️ حذف"),na=o("reservations.details.labels.customer","العميل"),aa=o("reservations.details.labels.contact","رقم التواصل"),sa=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ra=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),oa=o("reservations.details.actions.openProject","📁 فتح المشروع"),ia=o("reservations.details.labels.start","بداية الحجز"),la=o("reservations.details.labels.end","نهاية الحجز"),ca=o("reservations.details.labels.notes","ملاحظات"),da=o("reservations.list.noNotes","لا توجد ملاحظات"),ua=o("reservations.details.labels.itemsCount","عدد المعدات"),ma=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),pa=o("reservations.details.labels.paymentStatus","حالة الدفع"),fa=o("reservations.list.unknownCustomer","غير معروف"),Mt=l?G:pe,_t=u.length,va=g(String(_t)),Ft=Jn.replace("{count}",va),ba=Xn.replace("{count}",oe),ha=e.notes?g(e.notes):da,ga=g($.toFixed(2)),ya=g(String(O)),qa=g(X.toFixed(2)),wa=`${ya}% (${qa} ${U})`,fe=[{icon:"💳",label:pa,value:Mt},{icon:"📦",label:ua,value:Ft},{icon:"⏱️",label:ie,value:ue},{icon:"💼",label:ma,value:`${ye} ${U}`}];fe.push({icon:"😎",label:Ve,value:`${ga} ${U}`}),y>0&&fe.push({icon:"💸",label:Ue,value:`${Ae} ${U}`}),fe.push({icon:"📊",label:Ke,value:`${Oe} ${U}`}),R&&P>0&&fe.push({icon:"🧾",label:ot,value:`${$e} ${U}`}),O>0&&fe.push({icon:"🏦",label:it,value:wa}),fe.push({icon:"💰",label:Gn,value:`${de} ${U}`});const xa=fe.map(({icon:A,label:F,value:Z})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${A} ${F}</span>
      <span class="summary-details-value">${Z}</span>
    </div>
  `).join(""),Ht=[{text:i?dt:B,className:i?"status-confirmed":"status-pending"},{text:Mt,className:l?"status-paid":"status-unpaid"}];c&&Ht.push({text:Vn,className:"status-completed"});const Sa=Ht.map(({text:A,className:F})=>`<span class="status-chip ${F}">${A}</span>`).join(""),je=(A,F,Z)=>`
    <div class="res-info-row">
      <span class="label">${A} ${F}</span>
      <span class="value">${Z}</span>
    </div>
  `;let ut="";if(e.projectId){let A=ft(ra);if(s){const F=s.title||o("projects.fallback.untitled","مشروع بدون اسم");A=`${ft(F)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ft(oa)}</button>`}ut=`
      <div class="res-info-row">
        <span class="label">📁 ${sa}</span>
        <span class="value">${A}</span>
      </div>
    `}const ve=[];ve.push(je("👤",na,t?.customerName||fa)),ve.push(je("📞",aa,t?.phone||"—")),ve.push(je("🗓️",ia,te)),ve.push(je("🗓️",la,ge)),ve.push(je("📝",ca,ha)),ut&&ve.push(ut);const Ea=ve.join(""),Ca=_t?u.map((A,F)=>{const Z=He(A),qe=g(String(A.barcode||"-")),mt=g(String(A.qty||1)),Qe=g(String(A.price||0)),Aa=g(String(F+1)),$a=Z?`<img src="${Z}" alt="${A.desc||""}" class="reservation-modal-item-thumb">`:"-";return`
          <tr>
            <td>${Aa}</td>
            <td>${qe}</td>
            <td>${A.desc||"-"}</td>
            <td>${mt}</td>
            <td>${Qe} ${U}</td>
            <td>${$a}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${me}</td></tr>`,Ia=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${le.index}</th>
            <th>${le.code}</th>
            <th>${le.description}</th>
            <th>${le.quantity}</th>
            <th>${le.price}</th>
            <th>${le.image}</th>
          </tr>
        </thead>
        <tbody>${Ca}</tbody>
      </table>
    </div>
  `,ka=p.map((A,F)=>{const Z=g(String(F+1)),qe=A.role||De,mt=A.phone||lt,Qe=A.wage?ct.replace("{amount}",g(String(A.wage))).replace("{currency}",U):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${Z}</span>
          <span class="technician-name">${A.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${qe}</div>
          <div>📞 ${mt}</div>
          ${Qe?`<div>💰 ${Qe}</div>`:""}
        </div>
      </div>
    `}).join(""),Ta=p.length?`<div class="reservation-technicians-grid">${ka}</div>`:`<ul class="reservation-modal-technicians"><li>${Le}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Kn}</span>
          <strong>${M}</strong>
        </div>
        <div class="status-chips">
          ${Sa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Qn}</h6>
          ${Ea}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Wn}</h6>
            <div class="summary-details">
              ${xa}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Yn}</span>
          <span class="count">${ba}</span>
        </div>
        ${Ta}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Zn}</span>
          <span class="count">${Ft}</span>
        </div>
        ${Ia}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${ea}</button>
        ${S?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${ta}</button>`:""}
      </div>
    </div>
  `}const bs=`@page {
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
  width: 100%;
  margin: 0;
}

.quote-section--customer {
  text-align: left;
  margin-left: auto;
  margin-right: 0;
  max-width: 46%;
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
  margin-left: 0;
  max-width: fit-content;
}

@media (min-width: 1200px) {
  .quote-section--financial {
    max-width: 60%;
    margin: 0 auto;
  }
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
  width: 100%;
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
  font-size: 0.68rem;
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

.payment-block h3 {
  text-align: right;
  margin: 0;
}

.totals-block {
  font-size: 0.62rem;
  align-items: stretch;
  text-align: center;
  margin: 0 auto;
  direction: rtl;
  gap: 10px;
  font-family: 'Tajawal', sans-serif;
  padding: 12px 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.totals-block h3 {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  color: #0f172a;
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
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
  justify-content: center;
  align-items: stretch;
  gap: 8px;
  overflow: hidden;
}

.totals-inline__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 9px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  white-space: nowrap;
  font-size: 0.64rem;
  font-family: 'Tajawal', sans-serif;
  flex: 0 0 auto;
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
  margin-top: 6px;
}

.totals-item--final {
  background: rgba(59, 91, 220, 0.12);
  border-color: rgba(59, 91, 220, 0.35);
  padding: 8px 16px;
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
  font-size: 0.7rem;
}

.totals-item__slash {
  font-weight: 600;
  color: #1d4ed8;
  font-size: 0.7rem;
}

.totals-item__value {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.78rem;
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
`,qn="reservations.quote.sequence",se={logoUrl:"https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},hs=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Xe=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],wn=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(g(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>q(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>q(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>q(g(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>q(g(Number(e?.price||0).toFixed(2)))}],xn=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>q(g(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>q(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>q(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>q(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Sn={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:wn.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:xn.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},gs="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",ys="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",qs="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",ws=bs.trim(),xs=/color\([^)]*\)/gi,Ze=/(color\(|color-mix\()/i,Ss=document.createElement("canvas"),We=Ss.getContext("2d"),En=96,Cn=25.4,In=210,kn=297,Es=Math.round(In/Cn*En),Cs=Math.round(kn/Cn*En),Is=2,ks=/safari/i,Ts=/(iphone|ipad|ipod)/i;let _=null,C=null,ae=1,Be=null,Ne=null;function Tn(){const e={};return Object.entries(Sn).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function As(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function $s(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function An(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function jt(e,t){return e.sectionExpansions||(e.sectionExpansions=Object.fromEntries(Xe.map(({id:n})=>[n,!0]))),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!0),e.sectionExpansions}function Ls(e,t){return jt(e,t)?.[t]!==!1}function Ds(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function js(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ts.test(e)}function Bs(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=ks.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function $n(){return js()&&Bs()}function ne(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Ns(e,t="لا توجد بيانات للعرض."){const n=q(o(e,t));return ne(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Qt(e,t){return Array.isArray(e)&&e.length?e:[Ns(t)]}function wt(e,t="#000"){if(!We||!e)return t;try{return We.fillStyle="#000",We.fillStyle=e,We.fillStyle||t}catch{return t}}function Ps(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=wt(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Ln(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(xs,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Rs=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function Dn(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Rs.forEach(i=>{const l=s[i];if(l&&Ze.test(l)){const c=i.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),u=i==="backgroundColor"?"#ffffff":s.color||"#000000",d=wt(l,u);a.style.setProperty(c,d,"important")}});const r=s.backgroundImage;if(r&&Ze.test(r)){const i=wt(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function jn(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&Ze.test(i)){const l=r.replace(/[A-Z]/g,u=>`-${u.toLowerCase()}`),c=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(l,c,"important")}});const s=a.backgroundImage;s&&Ze.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Bt(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Wt(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Gt(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Ms(){const e=Gt();return e||(Ne||(Ne=Bt(ys).catch(t=>{throw Ne=null,t}).then(()=>{const t=Gt();if(!t)throw Ne=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Ne)}async function _s(){const e=Wt();return e||(Be||(Be=Bt(qs).catch(t=>{throw Be=null,t}).then(()=>{const t=Wt();if(!t)throw Be=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Be)}async function Fs(){window.html2pdf||await Bt(gs),Ps()}function q(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Hs(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function zs(){const e=window.localStorage?.getItem?.(qn),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Os(){const t=zs()+1;return{sequence:t,quoteNumber:Hs(t)}}function Us(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(qn,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Vs(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ks(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(g(String(n)));if(Number.isFinite(a))return a}return 0}function Qs(e){const t=tt()||[],{technicians:n=[]}=Q(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),l=s.get(i)||{};s.set(i,{...l,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Ws(e,t,n){const{projectLinked:a}=he(e,n),s=ln(e.start,e.end),l=(Array.isArray(e.items)?e.items:[]).reduce((v,y)=>v+(Number(y?.qty)||1)*(Number(y?.price)||0),0)*s,u=t.reduce((v,y)=>v+Ks(y),0)*s,d=l+u,m=parseFloat(e.discount)||0,b=e.discountType==="amount"?m:d*(m/100),p=Math.max(0,d-b),w=(a?!1:e.applyTax)?p*.15:0,x=Number(e.cost),f=Number.isFinite(x),h=p+w,D=a?Math.round(h):f?x:Math.round(h),$={equipmentTotal:l,crewTotal:u,discountAmount:b,taxAmount:w,finalTotal:D??0},N={equipmentTotal:g(l.toFixed(2)),crewTotal:g(u.toFixed(2)),discountAmount:g(b.toFixed(2)),taxAmount:g(w.toFixed(2)),finalTotal:g((D??0).toFixed(2))};return{totals:$,totalsDisplay:N,rentalDays:s}}function Bn({reservation:e,customer:t,project:n,technicians:a,totalsDisplay:s,rentalDays:r,currencyLabel:i,sections:l,fieldSelections:c={},quoteNumber:u,quoteDate:d}){const m=g(String(e?.reservationId??e?.id??"")),b=e.start?g(we(e.start)):"-",p=e.end?g(we(e.end)):"-",S=t?.customerName||t?.full_name||t?.name||"-",w=t?.phone||"-",x=t?.email||"-",f=t?.company||t?.company_name||"-",h=g(w),D=n?.title||n?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),$=n?.code||n?.projectCode||"",N=g(String(r)),v=e?.notes||"",y=As(c),E=(B,G)=>An(y,B,G),R=B=>l?.has?.(B),P=`<div class="quote-placeholder">${q(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,T=(B,G)=>`<div class="info-plain__item">${q(B)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${q(G)}</strong></div>`,j=(B,G,{variant:pe="inline"}={})=>pe==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${q(B)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${q(G)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${q(B)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${q(G)}</span>
    </span>`,V=(B,G)=>`<div class="payment-row">
      <span class="payment-row__label">${q(B)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${q(G)}</span>
    </div>`,H=[];E("customerInfo","customerName")&&H.push(T(o("reservations.details.labels.customer","العميل"),S)),E("customerInfo","customerCompany")&&H.push(T(o("reservations.details.labels.company","الشركة"),f)),E("customerInfo","customerPhone")&&H.push(T(o("reservations.details.labels.phone","الهاتف"),h)),E("customerInfo","customerEmail")&&H.push(T(o("reservations.details.labels.email","البريد"),x));const k=R("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${q(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${H.length?`<div class="info-plain">${H.join("")}</div>`:P}
      </section>`:"",L=[];E("reservationInfo","reservationId")&&L.push(T(o("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),E("reservationInfo","reservationStart")&&L.push(T(o("reservations.details.labels.start","بداية الحجز"),b)),E("reservationInfo","reservationEnd")&&L.push(T(o("reservations.details.labels.end","نهاية الحجز"),p)),E("reservationInfo","reservationDuration")&&L.push(T(o("reservations.details.labels.duration","عدد الأيام"),N));const Y=R("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${q(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${L.length?`<div class="info-plain">${L.join("")}</div>`:P}
      </section>`:"",W=[];E("projectInfo","projectTitle")&&W.push(T(o("reservations.details.labels.project","المشروع"),D)),E("projectInfo","projectCode")&&W.push(T(o("reservations.details.labels.code","الرمز"),$||"-"));const O=R("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${q(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${W.length?`<div class="info-plain">${W.join("")}</div>`:P}
      </section>`:"",X=[];E("financialSummary","equipmentTotal")&&X.push(j(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${s.equipmentTotal} ${i}`)),E("financialSummary","crewTotal")&&X.push(j(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${s.crewTotal} ${i}`)),E("financialSummary","discountAmount")&&X.push(j(o("reservations.details.labels.discount","الخصم"),`${s.discountAmount} ${i}`)),E("financialSummary","taxAmount")&&X.push(j(o("reservations.details.labels.tax","الضريبة"),`${s.taxAmount} ${i}`));const M=E("financialSummary","finalTotal"),te=M?`<div class="totals-final">${j(o("reservations.details.labels.total","الإجمالي النهائي"),`${s.finalTotal} ${i}`,{variant:"final"})}</div>`:"",ge=R("financialSummary")?!X.length&&!M?`<section class="quote-section quote-section--financial">${P}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${q(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${X.length?`<div class="totals-inline">${X.join("")}</div>`:""}
            ${te}
          </div>
        </section>`:"",oe=wn.filter(B=>E("items",B.id)),ye=oe.length>0,Ae=ye?oe.map(B=>`<th>${q(B.labelKey?o(B.labelKey,B.fallback):B.fallback)}</th>`).join(""):"",$e=Array.isArray(e.items)&&e.items.length>0?e.items.map((B,G)=>`<tr>${oe.map(pe=>`<td>${pe.render(B,G)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(oe.length,1)}" class="empty">${q(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,de=R("items")?ye?`<section class="quote-section quote-section--table">
            <h3>${q(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ae}</tr>
              </thead>
              <tbody>${$e}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(o("reservations.details.items.title","المعدات"))}</h3>
            ${P}
          </section>`:"",ue=xn.filter(B=>E("crew",B.id)),U=ue.length>0,Ue=U?ue.map(B=>`<th>${q(B.labelKey?o(B.labelKey,B.fallback):B.fallback)}</th>`).join(""):"",ot=a.length?a.map((B,G)=>`<tr>${ue.map(pe=>`<td>${pe.render(B,G)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ue.length,1)}" class="empty">${q(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,Ve=R("crew")?U?`<section class="quote-section quote-section--table">
            <h3>${q(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ue}</tr>
              </thead>
              <tbody>${ot}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${q(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${P}
          </section>`:"",Ke=R("notes")?`<section class="quote-section">
        <h3>${q(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${q(v||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ie=[];E("payment","beneficiary")&&ie.push(V(o("reservations.quote.labels.beneficiary","اسم المستفيد"),se.beneficiaryName)),E("payment","bank")&&ie.push(V(o("reservations.quote.labels.bank","اسم البنك"),se.bankName)),E("payment","account")&&ie.push(V(o("reservations.quote.labels.account","رقم الحساب"),g(se.accountNumber))),E("payment","iban")&&ie.push(V(o("reservations.quote.labels.iban","رقم الآيبان"),g(se.iban)));const it=`<section class="quote-section">
      <div class="payment-block">
        <h3>${q(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ie.length?ie.join(""):P}</div>
      </div>
      <p class="quote-approval-note">${q(se.approvalNote)}</p>
    </section>`,le=`<footer class="quote-footer">
        <h4>${q(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${hs.map(B=>`<li>${q(B)}</li>`).join("")}</ul>
      </footer>`,me=[];k&&Y?me.push(ne(`<div class="quote-section-row">${k}${Y}</div>`,{blockType:"group"})):(Y&&me.push(ne(Y)),k&&me.push(ne(k))),O&&me.push(ne(O));const Le=[];de&&Le.push(ne(de,{blockType:"table",extraAttributes:'data-table-id="items"'})),Ve&&Le.push(ne(Ve,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const De=[];ge&&De.push(ne(ge,{blockType:"summary"})),Ke&&De.push(ne(Ke));const lt=[ne(it,{blockType:"payment"}),ne(le,{blockType:"footer"})],ct=[...Qt(me,"reservations.quote.placeholder.page1"),...Le,...Qt(De,"reservations.quote.placeholder.page2"),...lt],dt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${q(se.logoUrl)}" alt="${q(se.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${q(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${q(se.companyName)}</p>
        <p class="quote-company-cr">${q(o("reservations.quote.labels.cr","السجل التجاري"))}: ${q(se.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${q(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${q(d)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${ws}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${dt}
          ${ct.join("")}
        </div>
      </div>
    </div>
  `}function Gs(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function xt(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready.catch(()=>{}):Promise.resolve();await Promise.allSettled([s,...a.map(r=>Gs(r))]),await new Promise(r=>n.requestAnimationFrame(()=>r()))}async function Nn(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await xt(r),s.innerHTML="";const l=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let c=null,u=null;const d=v=>{v.style.margin="0 auto",v.style.breakInside="avoid",v.style.pageBreakInside="avoid",v.style.pageBreakAfter="auto",v.style.breakAfter="auto"},m=()=>{const v=a.createElement("div"),y=s.childElementCount===0;if(v.className="quote-page",v.dataset.pageIndex=String(s.childElementCount),y){v.classList.add("quote-page--primary");const R=i.cloneNode(!0);R.removeAttribute("data-quote-header-template"),v.appendChild(R)}else v.classList.add("quote-page--continuation");const E=a.createElement("main");E.className="quote-body",v.appendChild(E),s.appendChild(v),d(v),c=v,u=E},b=()=>{(!c||!u||!u.isConnected)&&m()},p=()=>{if(!c||!u||u.childElementCount>0)return;const v=c;c=null,u=null,v.parentNode&&v.parentNode.removeChild(v)},S=()=>{c=null,u=null},w=()=>c?c.scrollHeight-c.clientHeight>Is:!1,x=(v,{allowOverflow:y=!1}={})=>(b(),u.appendChild(v),w()&&!y?(u.removeChild(v),p(),!1):!0),f=v=>{const y=v.cloneNode(!0);y.removeAttribute?.("data-quote-block"),y.removeAttribute?.("data-block-type"),y.removeAttribute?.("data-table-id"),!x(y)&&(S(),!x(y)&&x(y,{allowOverflow:!0}))},h=v=>{const y=v.querySelector("table");if(!y){f(v);return}const E=v.querySelector("h3"),R=y.querySelector("thead"),P=Array.from(y.querySelectorAll("tbody tr"));if(!P.length){f(v);return}let T=null,j=0;const V=(k=!1)=>{const L=v.cloneNode(!1);L.removeAttribute("data-quote-block"),L.removeAttribute("data-block-type"),L.removeAttribute("data-table-id"),L.classList.add("quote-section--table-fragment"),k&&L.classList.add("quote-section--table-fragment--continued");const Y=E?E.cloneNode(!0):null;Y&&L.appendChild(Y);const W=y.cloneNode(!1);W.classList.add("quote-table--fragment"),R&&W.appendChild(R.cloneNode(!0));const O=a.createElement("tbody");return W.appendChild(O),L.appendChild(W),{section:L,body:O}},H=(k=!1)=>T||(T=V(k),x(T.section)||(S(),x(T.section)||x(T.section,{allowOverflow:!0})),T);P.forEach(k=>{H(j>0);const L=k.cloneNode(!0);if(T.body.appendChild(L),w()&&(T.body.removeChild(L),T.body.childElementCount||(u.removeChild(T.section),T=null,p()),S(),T=null,H(j>0),T.body.appendChild(L),w())){T.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),T=null};if(!l.length)return;l.forEach(v=>{v.getAttribute("data-block-type")==="table"?h(v):f(v)});const D=Array.from(s.children),$=[];D.forEach((v,y)=>{const E=v.querySelector(".quote-body");if(y!==0&&(!E||E.childElementCount===0)){v.remove();return}$.push(v)}),$.forEach((v,y)=>{const E=y===0;v.style.pageBreakAfter="auto",v.style.breakAfter="auto",v.style.pageBreakBefore=E?"auto":"always",v.style.breakBefore=E?"auto":"page",n?v.style.boxShadow="":v.style.boxShadow="none"});const N=$[$.length-1]||null;c=N,u=N?.querySelector(".quote-body")||null,await xt(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}async function Ys(e,{filename:t,safariWindowRef:n=null}){if(!e)return;const a=Array.from(e.querySelectorAll(".quote-page"));if(!a.length)throw new Error("لا توجد صفحات لتصديرها.");const[s,r]=await Promise.all([_s(),Ms()]),i=$n(),l=typeof window<"u"&&window.devicePixelRatio||1,c=i?Math.min(1.8,Math.max(1.4,l*1.25)):Math.min(2.2,Math.max(1.8,l*1.5)),u=new s({unit:"mm",format:"a4",orientation:"portrait",compress:!0});for(let d=0;d<a.length;d+=1){const m=a[d];await xt(m);const p=(await r(m,{scale:c,useCORS:!0,scrollX:0,scrollY:0,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:i})).toDataURL("image/jpeg",i?.9:.95);d>0&&u.addPage(),u.addImage(p,"JPEG",0,0,In,kn,`page-${d+1}`,"FAST"),await new Promise(S=>window.requestAnimationFrame(S))}if(i){const d=u.output("bloburl");if(n&&!n.closed)n.location.href=d;else{const m=document.createElement("a");m.href=d,m.download=t,m.rel="noopener",m.target="_blank",document.body.appendChild(m),m.click(),document.body.removeChild(m)}setTimeout(()=>URL.revokeObjectURL(d),3e4)}else u.save(t)}function Nt(){if(!C||!_)return;const{previewFrame:e}=_;if(!e)return;const t=Bn({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(Ln(s),Dn(s,a),jn(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&await Nn(r,{context:"preview"})}catch(b){console.error("[reservations/pdf] failed to layout preview document",b)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),l=n?.querySelector(".quote-preview-pages"),c=Es;let u=18;if(l&&n?.defaultView){const b=n.defaultView.getComputedStyle(l),p=parseFloat(b.rowGap||b.gap||`${u}`);Number.isFinite(p)&&p>=0&&(u=p)}const d=Cs,m=i.length?i.length*d+Math.max(0,(i.length-1)*u):d;if(e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(m),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,_?.previewFrameWrapper&&!_?.userAdjustedZoom){const b=_.previewFrameWrapper.clientWidth-24;b>0&&b<c?ae=Math.max(b/c,.3):ae=1}Rn(ae)},{once:!0})}function Xs(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?C.sections.add(n):C.sections.delete(n),Pn(),Nt())}function Zs(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=C.fields||(C.fields=Tn()),r=$s(s,n);t.checked?r.add(a):r.delete(a),Nt()}function Js(e){if(!C)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(jt(C,n),C.sectionExpansions[n]=t.open)}function Pn(){if(!_?.toggles||!C)return;const{toggles:e}=_,t=C.fields||{};jt(C);const n=Xe.map(({id:a,labelKey:s,fallback:r})=>{const i=o(s,r),l=C.sections.has(a),c=Sn[a]||[],u=Ls(C,a),d=c.length?`<div class="quote-toggle-sublist">
          ${c.map(m=>{const b=An(t,a,m.id),p=l?"":"disabled",S=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${b?"checked":""} ${p}>
                <span>${q(S)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${u?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${l?"checked":""}>
            <span>${q(i)}</span>
          </label>
          ${c.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${d}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",Xs)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",Zs)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",Js)})}function er(){if(_?.modal)return _;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${q(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${q(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${q(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${q(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),r=e.querySelector(".modal-header"),i=r?.querySelector(".btn-close"),l=document.createElement("div");l.className="quote-preview-header-actions",r&&r.insertBefore(l,i||null);const c=document.createElement("iframe");c.className="quote-preview-frame",c.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),c.setAttribute("loading","lazy"),c.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${q(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${q(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${q(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const d=document.createElement("div");d.className="quote-preview-frame-wrapper",d.appendChild(c),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(d),n.appendChild(m),l.appendChild(u),s?.addEventListener("click",async()=>{if(C){s.disabled=!0;try{await nr()}finally{s.disabled=!1}}}),_={modal:e,toggles:t,preview:n,previewFrameWrapper:d,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:c,meta:a,downloadBtn:s,userAdjustedZoom:!1};const b=u.querySelector("[data-zoom-out]"),p=u.querySelector("[data-zoom-in]"),S=u.querySelector("[data-zoom-reset]");return b?.addEventListener("click",()=>Yt(-.1)),p?.addEventListener("click",()=>Yt(.1)),S?.addEventListener("click",()=>Je(1,{markManual:!0})),Je(ae),_}function Je(e,{silent:t=!1,markManual:n=!1}={}){ae=Math.min(Math.max(e,.25),2.2),n&&_&&(_.userAdjustedZoom=!0),Rn(ae),!t&&_?.zoomValue&&(_.zoomValue.textContent=`${Math.round(ae*100)}%`)}function Yt(e){Je(ae+e,{markManual:!0})}function Rn(e){if(!_?.previewFrame||!_.previewFrameWrapper)return;const t=_.previewFrame,n=_.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ds()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function tr(){if(!_?.meta||!C)return;const{meta:e}=_;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${q(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${q(C.quoteNumber)}</strong></div>
      <div><span>${q(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${q(C.quoteDateLabel)}</strong></div>
    </div>
  `}async function nr(){if(!C)return;await Fs();const e=Bn({reservation:C.reservation,customer:C.customer,project:C.project,technicians:C.technicians,totalsDisplay:C.totalsDisplay,rentalDays:C.rentalDays,currencyLabel:C.currencyLabel,sections:C.sections,fieldSelections:C.fields,quoteNumber:C.quoteNumber,quoteDate:C.quoteDateLabel}),t=document.createElement("div");t.innerHTML=e,t.style.position="fixed",t.style.top="-10000px",t.style.left="0",t.style.zIndex="-1",document.body.appendChild(t),Ln(t),Dn(t),jn(t);const n=t.firstElementChild,a=$n()?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;if(n){n.setAttribute("dir","rtl"),n.style.direction="rtl",n.style.textAlign="right",n.setAttribute("data-theme","light"),n.classList.remove("dark","dark-mode"),n.style.margin="0",n.style.padding="0",n.style.width="210mm",n.style.maxWidth="210mm",n.style.marginLeft="auto",n.style.marginRight="auto",n.scrollTop=0,n.scrollLeft=0;try{await Nn(n,{context:"export"})}catch(s){console.error("[reservations/pdf] failed to layout export document",s)}}try{const s=`quotation-${C.quoteNumber}.pdf`;await Ys(n,{filename:s,safariWindowRef:a}),C.sequenceCommitted||(Us(C.quoteSequence),C.sequenceCommitted=!0)}finally{document.body.removeChild(t)}}function ar(){const e=er();e?.modal&&(ae=1,_&&(_.userAdjustedZoom=!1),Je(ae,{silent:!0}),Pn(),tr(),Nt(),window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(e.modal).show())}async function sr({reservation:e,customer:t,project:n}){if(!e){I(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Qs(e),{totalsDisplay:s,totals:r,rentalDays:i}=Ws(e,a,n),l=o("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:u}=Os(),d=new Date;C={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:l,sections:new Set(Xe.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:Object.fromEntries(Xe.map(({id:m})=>[m,!0])),fields:Tn(),quoteSequence:c,quoteNumber:u,quoteDate:d,quoteDateLabel:Vs(d),sequenceCommitted:!1},ar()}function rr({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=tt(),{reservations:r=[],customers:i=[],technicians:l=[],projects:c=[]}=Q(),u=Array.isArray(s)?s:l||[],d=new Map((c||[]).map(x=>[String(x.id),x])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const b=t||us(),p=new Map(i.map(x=>[String(x.id),x])),S=new Map(u.map(x=>[String(x.id),x])),w=ps({reservations:r,filters:b,customersMap:p,techniciansMap:S,projectsMap:d});if(w.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${fs({entries:w,customersMap:p,techniciansMap:S,projectsMap:d})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(x=>{const f=Number(x.dataset.reservationIndex);Number.isNaN(f)||x.addEventListener("click",()=>{typeof n=="function"&&n(f)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(x=>{const f=Number(x.dataset.reservationIndex);Number.isNaN(f)||x.addEventListener("click",h=>{h.stopPropagation(),typeof a=="function"&&a(f,h)})})}function or(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=Q(),l=s[e];if(!l)return I(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=r.find(f=>String(f.id)===String(l.customerId)),u=l.projectId?i.find(f=>String(f.id)===String(l.projectId)):null,d=document.getElementById("reservation-details-body");if(d){const f=tt()||[];d.innerHTML=vs(l,c,f,e,u)}const m=document.getElementById("reservationDetailsModal"),b=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},p=document.getElementById("reservation-details-edit-btn");p&&(p.onclick=()=>{b(),typeof t=="function"&&t(e,{reservation:l,customer:c,getEditContext:a})});const S=document.getElementById("reservation-details-delete-btn");S&&(S.onclick=()=>{b(),typeof n=="function"&&n(e,{reservation:l,customer:c})});const w=d?.querySelector('[data-action="open-project"]');w&&u&&w.addEventListener("click",()=>{b();const f=u?.id!=null?String(u.id):"",h=f?`projects.html?project=${encodeURIComponent(f)}`:"projects.html";window.location.href=h});const x=document.getElementById("reservation-details-export-btn");return x&&(x.onclick=()=>{const f=m&&window.bootstrap?.Modal?window.bootstrap.Modal.getInstance(m)||window.bootstrap.Modal.getOrCreateInstance(m):null,h=async()=>{try{await sr({reservation:l,customer:c,project:u})}catch(D){console.error("❌ [reservations] export to PDF failed",D),I(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}};if(m&&f){const D=()=>{m.removeEventListener("hidden.bs.modal",D),h()};x.blur(),m.addEventListener("hidden.bs.modal",D,{once:!0}),f.hide()}else h()}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}let _e=null,re=[],St=null,ee={};function at(){return{index:_e,items:re}}function st(e,t){_e=typeof e=="number"?e:null,re=Array.isArray(t)?[...t]:[]}function Mn(){_e=null,re=[],Wa()}function ir(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Pe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function lr(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((c,u)=>String(u.createdAt||u.start||"").localeCompare(String(c.createdAt||c.start||""))):[],l=[`<option value="">${Pe(a)}</option>`];i.forEach(c=>{l.push(`<option value="${Pe(c.id)}">${Pe(c.title||a)}</option>`)}),r&&!i.some(c=>String(c.id)===r)&&l.push(`<option value="${Pe(r)}">${Pe(s)}</option>`),n.innerHTML=l.join(""),r?n.value=r:n.value=""}function _n(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Xt(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:l,projects:c}=Q(),d=cn()?.[e];if(!d){I(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ee={...ee,reservation:d,projects:c||[]},t?.(),lr(c||[],d);const m=d.projectId&&c?.find?.(j=>String(j.id)===String(d.projectId))||null,{effectiveConfirmed:b,projectLinked:p}=he(d,m),S=d.items?d.items.map(j=>({...j,equipmentId:j.equipmentId??j.equipment_id??j.id,barcode:K(j?.barcode)})):[];st(e,S);const w=o("reservations.list.unknownCustomer","غير معروف"),x=l?.find?.(j=>String(j.id)===String(d.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const f=document.getElementById("edit-res-id");f&&(f.value=d.reservationId||d.id);const h=document.getElementById("edit-res-customer");h&&(h.value=x?.customerName||w);const D=typeof a=="function"?a(d.start):{date:"",time:""},$=typeof a=="function"?a(d.end):{date:"",time:""};n?.("edit-res-start",D.date),n?.("edit-res-start-time",D.time),n?.("edit-res-end",$.date),n?.("edit-res-end-time",$.time);const N=document.getElementById("edit-res-notes");N&&(N.value=d.notes||"");const v=document.getElementById("edit-res-discount");v&&(v.value=g(d.discount??0));const y=document.getElementById("edit-res-discount-type");y&&(y.value=d.discountType||"percent");const E=document.getElementById("edit-res-tax");E&&(E.checked=d.projectId?!1:!!d.applyTax);const R=document.getElementById("edit-res-confirmed");R&&(R.checked=b,R.disabled=p,R.classList.toggle("disabled",p),R.closest(".form-check")?.classList.toggle("disabled",p));const P=document.getElementById("edit-res-paid");P&&(P.value=d.paid===!0||d.paid==="paid"?"paid":"unpaid"),Ua((d.technicians||[]).map(j=>String(j))),s?.(S),_n(),r?.();const T=document.getElementById("editReservationModal");St=ir(T,i),St?.show?.()}async function cr({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(_e===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),d=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",b=g(document.getElementById("edit-res-discount")?.value||"0"),p=parseFloat(b)||0,S=document.getElementById("edit-res-discount-type")?.value||"percent",w=document.getElementById("edit-res-confirmed")?.checked||!1,x=document.getElementById("edit-res-paid")?.value||"unpaid",f=document.getElementById("edit-res-project")?.value||"",h=Va();if(!l||!u){I(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const D=typeof e=="function"?e:(M,te)=>`${M}T${te||"00:00"}`,$=D(l,c),N=D(u,d);if($&&N&&new Date($)>new Date(N)){I(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const y=cn()?.[_e];if(!y){I(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(re)||re.length===0&&h.length===0){I(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const M of re)if(Ce(M.barcode)){I(o("reservations.toast.updateEquipmentMaintenance","⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة"));return}const E=typeof t=="function"?t:()=>!1;for(const M of re){const te=K(M.barcode);if(E(te,$,N,y.id??y.reservationId)){I(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const R=typeof n=="function"?n:()=>!1;for(const M of h)if(R(M,$,N,y.id??y.reservationId)){I(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const P=document.getElementById("edit-res-tax"),T=Array.isArray(ee.projects)&&ee.projects.length?ee.projects:Q().projects||[],j=f&&T.find(M=>String(M.id)===String(f))||null,V={...y,projectId:f?String(f):null,confirmed:w},{effectiveConfirmed:H,projectLinked:k,projectStatus:L}=he(V,j),Y=k?!1:P?.checked||!1,W=an(re,p,S,Y,h,{start:$,end:N});let O=y.status??"pending";k?O=j?.status??L??O:["completed","cancelled"].includes(String(O).toLowerCase())||(O=w?"confirmed":"pending");const X=sn({reservationCode:y.reservationCode??y.reservationId??null,customerId:y.customerId,start:$,end:N,status:O,title:y.title??null,location:y.location??null,notes:m,projectId:f?String(f):null,totalAmount:W,discount:p,discountType:S,applyTax:Y,paidStatus:x,confirmed:H,items:re.map(M=>({...M,equipmentId:M.equipmentId??M.id})),technicians:h});try{const M=await Ka(y.id||y.reservationId,X);await Qa(),I(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Mn(),i?.({type:"updated",reservation:M}),s?.(),r?.(),St?.hide?.()}catch(M){console.error("❌ [reservationsEdit] Failed to update reservation",M);const te=rn(M)?M.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");I(te,"error")}}function qr(e={}){ee={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ee,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=g(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const l=document.getElementById("edit-res-tax");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>t?.()),l.dataset.listenerAttached="true");const c=document.getElementById("edit-res-project");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{_n();const p=document.getElementById("edit-res-confirmed");if(p){const S=Array.isArray(ee.projects)&&ee.projects.length?ee.projects:Q().projects||[],w=c.value&&S.find($=>String($.id)===String(c.value))||null,f={...ee?.reservation??{},projectId:c.value||null,confirmed:p.checked},{effectiveConfirmed:h,projectLinked:D}=he(f,w);p.checked=h,p.disabled=D,p.classList.toggle("disabled",D),p.closest(".form-check")?.classList.toggle("disabled",D)}t?.()}),c.dataset.listenerAttached="true");const u=document.getElementById("save-reservation-changes");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{cr(ee).catch(p=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",p)})}),u.dataset.listenerAttached="true");const d=document.getElementById("edit-res-equipment-barcode");if(d&&!d.dataset.listenerAttached){d.addEventListener("keydown",w=>{w.key==="Enter"&&(w.preventDefault(),n?.(d))});let p=null;const S=()=>{if(clearTimeout(p),!d.value?.trim())return;const{start:w,end:x}=getEditReservationDateRange();!w||!x||(p=setTimeout(()=>{n?.(d)},150))};d.addEventListener("input",S),d.addEventListener("change",()=>n?.(d)),d.dataset.listenerAttached="true"}const m=document.getElementById("edit-res-equipment-description");m&&!m.dataset.listenerAttached&&(m.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),a?.(m,"edit"))}),m.dataset.listenerAttached="true");const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{Mn(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}function Pt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Me(e,n),end:Me(t,a)}}function rt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","ريال"),s=o("reservations.create.equipment.imageAlt","صورة");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="6" class="text-center">${n}</td></tr>`,Zt(t);return}t.innerHTML=e.map((r,i)=>{const l=He(r),c=`${g(String(r.price??0))} ${a}`,u=g(String(r.qty||1)),d=l?`<img src="${l}" alt="${s}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${r.barcode||"-"}</td>
          <td>${r.desc||"-"}</td>
          <td>${c}</td>
          <td>${u}</td>
          <td>${d}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${i}">🗑️</button></td>
        </tr>
      `}).join(""),Zt(t)}function Zt(e){!e||e.dataset.removeListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('[data-action="remove-edit-item"]');if(!n)return;t.preventDefault();const a=Number(n.dataset.itemIndex);Number.isNaN(a)||dr(a)}),e.dataset.removeListenerAttached="true")}function Te(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",Te),a.dataset.listenerAttached="true"),xe(a);const s=g(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",l=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),u=l?!1:c?.checked||!1,d=a?.value||"unpaid";xe(a,d);const{items:m=[]}=at(),{start:b,end:p}=Pt();e.innerHTML=Ga({items:m,discount:r,discountType:i,applyTax:u,paidStatus:d,start:b,end:p})}function dr(e){if(e==null)return;const{index:t,items:n}=at();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);st(t,a),rt(a),Te()}function ur(e){const t=e?.value??"",n=K(t);if(!n)return;const a=It(n);if(!a){I(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}if(Ce(n)){I(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const s=K(n),{index:r,items:i=[]}=at();if(i.findIndex(S=>K(S.barcode)===s)>-1){I(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:c,end:u}=Pt();if(!c||!u){I(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:d=[]}=Q(),m=r!=null&&d[r]||null,b=m?.id??m?.reservationId??null;if(Ee(s,c,u,b)){I(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=[...i,{id:a.id,equipmentId:a.id,barcode:s,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];st(r,p),e&&(e.value=""),rt(p),Te()}function et(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=bn(t),a=K(n?.barcode||t);if(!n||!a){I(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(Ce(a)){I(o("reservations.toast.equipmentMaintenanceStrict","⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز"));return}const{start:s,end:r}=Pt();if(!s||!r){I(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:i,items:l=[]}=at();if(l.some(p=>K(p.barcode)===a)){I(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Q(),d=i!=null&&u[i]||null,m=d?.id??d?.reservationId??null;if(Ee(a,s,r,m)){I(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const b=[...l,{id:n.id,equipmentId:n.id,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];st(i,b),rt(b),Te(),e.value=""}function mr(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),et(e))});const t=()=>{hn(e.value,"edit-res-equipment-description-options")&&et(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Te()});function pr(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){qt(e);return}et(e)}}function wr(){Ie(),mr()}function fr(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}function xr(){return Za().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Q()||{};Ja(e||[]),gn()})}function Rt(e=null){gn(),Fn(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function vr(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Et(){return{populateEquipmentDescriptionLists:Ie,setFlatpickrValue:fr,splitDateTime:en,renderEditItems:rt,updateEditReservationSummary:Te,addEquipmentByDescription:pr,addEquipmentToEditingReservation:ur,addEquipmentToEditingByDescription:et,combineDateTime:Me,hasEquipmentConflict:Ee,hasTechnicianConflict:nn,renderReservations:Fn,handleReservationsMutation:Rt,ensureModal:vr}}function Fn(e="reservations-list",t=null){rr({containerId:e,filters:t,onShowDetails:Hn,onConfirmReservation:On})}function Hn(e){return or(e,{getEditContext:Et,onEdit:(t,{reservation:n})=>{Un(t,n)},onDelete:zn})}function zn(e){return Jt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?Ya(e,{onAfterChange:Rt}):!1:(ja(),!1)}function On(e){return Xa(e,{onAfterChange:Rt})}function Un(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Xt(e,Et());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Xt(e,Et());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Ba({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Sr(){typeof window>"u"||(window.showReservationDetails=Hn,window.deleteReservation=zn,window.confirmReservation=On,window.editReservation=Un)}export{yn as a,Sr as b,yr as c,qr as d,wr as e,gn as f,Et as g,z as h,gr as i,Rt as j,xr as l,Fn as r,Hn as s,Te as u};
