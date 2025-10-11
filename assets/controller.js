import{x as Is,e as Q,t as i,n as y,j as x,z as ks,f as Fe,k as _n,o as Cs,u as As}from"./auth.js";import{I as K,J as nn,n as ae,K as Ts,L as tt,D as re,M as Mn,N as $s,O as zn,P as qe,a as Te,Q as ze,R as we,S as an,T as Ls,U as It,V as Ds,W as On,w as Hn,X as Un,Y as Ps,s as kt,i as Vn,Z as Kn,_ as Ns,$ as Qn,a0 as Gn,f as sn,r as $e,c as Wn,a1 as Bs,g as Xn,a2 as js,a3 as Rs,x as Fs,F as _s,a4 as Ms,a5 as zs,a6 as Os,y as Hs,A as Us}from"./projectsService.js";Is({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.taxId":"🧾 الرقم الضريبي","customers.form.labels.document":"📎 مستند العميل","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.taxId":"1234567890","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.form.actions.previewDocument":"عرض الملف","customers.form.document.empty":"لم يتم اختيار ملف بعد","customers.form.document.uploading":"📤 جارٍ رفع الملف...","customers.form.document.uploadFailed":"⚠️ فشل رفع الملف","customers.form.document.selected":"تم إرفاق ملف.","customers.form.document.uploadingWait":"⏳ يرجى الانتظار حتى يكتمل رفع الملف","customers.form.document.uploadSuccess":"✅ تم رفع الملف بنجاح","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.actions.viewDocument":"📎 عرض الملف","customers.documents.missing":"لا يوجد ملف لعرضه","customers.documents.unsupportedPreview":"لا يمكن معاينة هذا النوع من الملفات، يمكنك تحميله بالأسفل.","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","customers.toast.fetchFailed":"تعذر تحميل قائمة العملاء","customers.toast.submitFailed":"حدث خطأ أثناء حفظ بيانات العميل","customers.toast.deleteFailed":"تعذر حذف العميل، يرجى المحاولة مجدداً","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.card.labels.available":"المتاح","equipment.card.labels.availableOfTotal":"من أصل","equipment.card.availability.reservedSingle":"مؤجرة","equipment.card.availability.reserved":"مؤجرة بالكامل","equipment.card.availability.maintenance":"تحت الصيانة","equipment.card.availability.retired":"غير متاحة","equipment.card.availability.unavailable":"غير متاحة حالياً","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.title.details":"📇 تفاصيل بطاقة المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.close":"❌ إغلاق","equipment.modal.actions.edit":"✏️ تعديل","equipment.modal.actions.cancelEdit":"↩️ إلغاء التعديل","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.equipment.table.item":"المعدة","reservations.equipment.table.quantity":"الكمية","reservations.equipment.table.unitPrice":"سعر الوحدة","reservations.equipment.table.total":"الإجمالي","reservations.equipment.table.actions":"الإجراءات","reservations.equipment.actions.increase":"زيادة الكمية","reservations.equipment.actions.decrease":"تقليل الكمية","reservations.equipment.actions.remove":"إزالة البند","reservations.equipment.barcodes.summary":"عرض الباركودات","equipment.modal.variants.title":"📦 القطع المرتبطة","equipment.modal.variants.barcode":"الباركود","equipment.modal.variants.status":"الحالة","equipment.modal.variants.quantity":"الكمية","equipment.modal.variants.actions":"الإجراءات","equipment.modal.variants.empty":"لا توجد قطع مرتبطة أخرى.","equipment.modal.variants.current":"الحالي","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.netProfit":"💵 صافي الربح","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.shareLabel":"نسبة الشركة","reservations.reports.filters.share.all":"الكل","reservations.reports.filters.share.with":"مع نسبة الشركة","reservations.reports.filters.share.without":"بدون نسبة الشركة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"تحديث","reservations.reports.actions.customizeColumns":"تخصيص الأعمدة","reservations.reports.actions.exportPdf":"تصدير PDF","reservations.reports.actions.exportExcel":"تصدير Excel","reservations.reports.actions.exportCsv":"تصدير CSV","reservations.reports.export.filePrefix":"تقرير-الحجوزات","reservations.reports.export.sheetName":"الحجوزات","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"صافي الربح {net} • نسبة الشركة {share} • متوسط الحجز {average}","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.loading":"جارٍ تحميل التقارير...","reservations.reports.status.loadingHint":"قد يستغرق هذا بضع ثوانٍ.","reservations.reports.status.retry":"جرّب إعادة المحاولة أو تحديث الصفحة.","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"حجم الحجوزات الشهري","reservations.reports.chart.volume.hint":"الحجوزات والإيرادات خلال الأشهر الماضية","reservations.reports.chart.volume.series.reservations":"عدد الحجوزات","reservations.reports.chart.volume.series.revenue":"الإيرادات (ر.س)","reservations.reports.chart.volume.series.net":"صافي الربح (ر.س)","reservations.reports.chart.status.title":"توزيع الحالات","reservations.reports.chart.status.hint":"نسبة الحجوزات المؤكدة، قيد التأكيد، والمنتهية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.chart.payment.title":"حالة الدفع","reservations.reports.chart.payment.hint":"مقارنة الحجوزات المدفوعة وغير المدفوعة","reservations.reports.topCustomers.title":"أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.results.headers.share":"نسبة الشركة","reservations.reports.results.headers.net":"صافي الربح","reservations.reports.results.share.none":"بدون نسبة الشركة","reservations.reports.topEquipment.title":"المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.noAdditionalUnits":"⚠️ لا توجد وحدات إضافية متاحة حالياً","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.picker.actions.cancel":"إلغاء","technicians.picker.selectionInfo":"لم يتم اختيار أي عضو بعد","technicians.picker.selectedCount":"تم اختيار {count} عضو","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.taxId":"🧾 Tax Number","customers.form.labels.document":"📎 Client Document","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.taxId":"1234567890","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.form.actions.previewDocument":"Preview document","customers.form.document.empty":"No file chosen yet","customers.form.document.uploading":"📤 Uploading file...","customers.form.document.uploadFailed":"⚠️ File upload failed","customers.form.document.selected":"A document is attached.","customers.form.document.uploadingWait":"⏳ Please wait for the upload to finish","customers.form.document.uploadSuccess":"✅ File uploaded successfully","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.actions.viewDocument":"📎 View Document","customers.documents.missing":"No document available","customers.documents.unsupportedPreview":"Preview not available for this file type. You can download it below.","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","customers.toast.fetchFailed":"Could not load clients list","customers.toast.submitFailed":"An error occurred while saving the client","customers.toast.deleteFailed":"Could not delete the client. Please try again","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.card.labels.available":"Available","equipment.card.labels.availableOfTotal":"of","equipment.card.availability.reservedSingle":"Rented","equipment.card.availability.reserved":"Fully Rented","equipment.card.availability.maintenance":"Under Maintenance","equipment.card.availability.retired":"Unavailable","equipment.card.availability.unavailable":"Currently Unavailable","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.title.details":"📇 Equipment Card Details","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.close":"❌ Close","equipment.modal.actions.edit":"✏️ Edit","equipment.modal.actions.cancelEdit":"↩️ Cancel Edit","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.equipment.table.item":"Equipment","reservations.equipment.table.quantity":"Quantity","reservations.equipment.table.unitPrice":"Unit Price","reservations.equipment.table.total":"Total","reservations.equipment.table.actions":"Actions","reservations.equipment.actions.increase":"Increase quantity","reservations.equipment.actions.decrease":"Decrease quantity","reservations.equipment.actions.remove":"Remove item","reservations.equipment.barcodes.summary":"Show barcodes","equipment.modal.variants.title":"📦 Related Units","equipment.modal.variants.barcode":"Barcode","equipment.modal.variants.status":"Status","equipment.modal.variants.quantity":"Quantity","equipment.modal.variants.actions":"Actions","equipment.modal.variants.empty":"No related units found.","equipment.modal.variants.current":"Current","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.netProfit":"💵 Net profit","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"Performance reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.shareLabel":"Company share","reservations.reports.filters.share.all":"All","reservations.reports.filters.share.with":"With company share","reservations.reports.filters.share.without":"Without company share","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"Refresh","reservations.reports.actions.customizeColumns":"Customize columns","reservations.reports.actions.exportPdf":"Export PDF","reservations.reports.actions.exportExcel":"Export Excel","reservations.reports.actions.exportCsv":"Export CSV","reservations.reports.export.filePrefix":"reservations-report","reservations.reports.export.sheetName":"Reservations","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Net profit {net} • Company share {share} • Average reservation {average}","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.loading":"Loading reports...","reservations.reports.status.loadingHint":"This may take a few seconds.","reservations.reports.status.retry":"Try refreshing or reloading the page.","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"Monthly booking performance","reservations.reports.chart.volume.hint":"Bookings and revenue over the past months.","reservations.reports.chart.volume.series.reservations":"Reservations","reservations.reports.chart.volume.series.revenue":"Revenue (SAR)","reservations.reports.chart.volume.series.net":"Net profit (SAR)","reservations.reports.chart.status.title":"Status distribution","reservations.reports.chart.status.hint":"Share of confirmed, pending, and completed reservations.","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.chart.payment.title":"Payment status","reservations.reports.chart.payment.hint":"Paid vs unpaid reservations at a glance.","reservations.reports.topCustomers.title":"Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"Reservation details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.results.headers.share":"Company share","reservations.reports.results.headers.net":"Net profit","reservations.reports.results.share.none":"No company share","reservations.reports.topEquipment.title":"Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.noAdditionalUnits":"⚠️ No additional units available right now","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.picker.actions.cancel":"Cancel","technicians.picker.selectionInfo":"No crew selected yet","technicians.picker.selectedCount":"Selected {count} member(s)","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});const Vs=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Ks=new Set(["maintenance","reserved","retired"]);function Qs(e){const t=String(e??"").trim().toLowerCase();return t&&Vs.get(t)||"available"}function Gs(e){return e?typeof e=="object"?e:Ct(e):null}function Se(e){const t=Gs(e);return t?Qs(t.status||t.state||t.statusLabel||t.status_label):"available"}function Yn(e){return!Ks.has(Se(e))}function Le(e={}){return e.image||e.imageUrl||e.img||""}function Ws(e){if(!e)return null;const t=K(e),{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}function Ct(e){const t=K(e);if(!t)return null;const{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}let Mt=null,Zn=[],zt=new Map,Ot=new Map,bt=new Map;function ht(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gt(e){return y(String(e||"")).trim().toLowerCase()}function Xs(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=y(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Jn(e){const t=y(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Oe(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function rn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function on(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ea(e,t,{allowPartial:n=!1}={}){const a=ae(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((l,o)=>{o.includes(a)&&r.push(l)}),r.length===1?r[0]:null}function Ht(e,t={}){return ea(zt,e,t)}function Ut(e,t={}){return ea(Ot,e,t)}function _e(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function ta(e){Zn=Array.isArray(e)?[...e]:[]}function ln(){return Zn}function cn(e){return e&&ln().find(t=>String(t.id)===String(e))||null}function kn(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function nt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??re,a=y(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:re}function ue(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??re,a=y(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=re),t.dataset.companyShare=String(s),t.checked=!0}function Ys(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Cn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function An(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function ye({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=rn();if(!n||!a||!s)return;const r=nn()||[],l=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),o=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",l);const c=new Set;zt=new Map;const d=r.filter(f=>f&&f.id!=null).map(f=>({id:String(f.id),label:An(f)||o})).filter(f=>{if(!f.label)return!1;const p=ae(f.label);return!p||c.has(p)?!1:(c.add(p),zt.set(p,f),!0)}).sort((f,p)=>f.label.localeCompare(p.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(f=>`<option value="${ht(f.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",v=m?r.find(f=>String(f.id)===m):null;if(v){const f=An(v)||o;a.value=String(v.id),n.value=f,n.dataset.selectedId=String(v.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function rt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=on();if(!a||!s||!r)return;const l=Array.isArray(t)?t:ln()||[],o=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",o);const c=[...l].filter(q=>q&&q.id!=null).sort((q,g)=>String(g.createdAt||g.start||"").localeCompare(String(q.createdAt||q.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Ot=new Map;const v=c.map(q=>{const g=kn(q)||u;return{id:String(q.id),label:g}}).filter(q=>{if(!q.label)return!1;const g=ae(q.label);return!g||m.has(g)?!1:(m.add(g),Ot.set(g,q),!0)});r.innerHTML=v.map(q=>`<option value="${ht(q.label)}"></option>`).join("");const f=e?String(e):s.value?String(s.value):"",p=f?c.find(q=>String(q.id)===f):null;if(p){const q=kn(p)||u;s.value=String(p.id),a.value=q,a.dataset.selectedId=String(p.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function yt(e,t,n){const{date:a,time:s}=Mn(n),r=document.getElementById(e),l=document.getElementById(t);if(r){if(a)if(r._flatpickr){const o=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,o)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(l){if(s)if(l._flatpickr){const o=l._flatpickr.config?.dateFormat||"H:i";l._flatpickr.setDate(s,!1,o)}else l.value=s;else l._flatpickr?l._flatpickr.clear():l.value="";l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))}}function na(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||rt({selectedValue:a});const r=(nn()||[]).find(u=>String(u.id)===String(e.clientId)),l=r?.id!=null?String(r.id):"";ye(l?{selectedValue:l}:{selectedValue:"",resetInput:!0});const o=Cn(e,"start"),c=Cn(e,"end");o&&yt("res-start","res-start-time",o),c&&yt("res-end","res-end-time",c);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Me(),V()}function aa({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Q(),s=Array.isArray(a)?a:[];ta(s);const r=t!=null?String(t):n.value?String(n.value):"";rt({selectedValue:r,projectsList:s}),Me(),V()}function Me(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function dn(){const{input:e,hidden:t}=on();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ut(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const l=cn(r.id);l?na(l,{skipProjectSelectUpdate:!0}):(Me(),V())}else t.value="",e.dataset.selectedId="",Me(),V()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ut(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function un(){const{input:e,hidden:t}=rn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ht(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),V()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ht(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Zs(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const o=decodeURIComponent(t);n=JSON.parse(o)}catch(o){console.warn("⚠️ [reservations/createForm] Failed to decode project context",o)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(rt({selectedValue:String(n.projectId)}),Me());const l=cn(n.projectId);if(l?na(l,{forceNotes:!!n.forceNotes}):V(),n.start&&yt("res-start","res-start-time",n.start),n.end&&yt("res-end","res-end-time",n.end),n.customerId){const c=(nn()||[]).find(d=>String(d.id)===String(n.customerId));c?.id!=null&&ye({selectedValue:String(c.id)})}else ye({selectedValue:""})}function it(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function sa(e){const t=gt(e);if(t){const o=bt.get(t);if(o)return o}const{description:n,barcode:a}=Jn(e);if(a){const o=Ct(a);if(o)return o}const s=ae(n||e);if(!s)return null;let r=Kn();if(!r?.length){const o=Q();r=Array.isArray(o?.equipment)?o.equipment:[],r.length&&Gn(r)}const l=r.find(o=>ae(o?.desc||o?.description||"")===s);return l||r.find(o=>ae(o?.desc||o?.description||"").includes(s))||null}function ra(e,t="equipment-description-options"){const n=gt(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(c=>gt(c.value)===n)||bt.has(n))return!0;const{description:s}=Jn(e);if(!s)return!1;const r=ae(s);return r?(Kn()||[]).some(o=>ae(o?.desc||o?.description||"")===r):!1}const Js={available:0,reserved:1,maintenance:2,retired:3};function er(e){return Js[e]??5}function Tn(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function tr(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Tn(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Tn(n)})`}function He(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=zn(),a=Q(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Gn(r);const l=new Map;r.forEach(d=>{const u=Xs(d),m=gt(u);if(!m||!u)return;const v=Se(d),f=er(v),p=l.get(m);if(!p){l.set(m,{normalized:m,value:u,bestItem:d,bestStatus:v,bestPriority:f,statuses:new Set([v])});return}p.statuses.add(v),f<p.bestPriority&&(p.bestItem=d,p.bestStatus=v,p.bestPriority=f,p.value=u)}),bt=new Map;const c=Array.from(l.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{bt.set(d.normalized,d.bestItem);const u=tr(d),m=ht(d.value);if(u===d.value)return`<option value="${m}"></option>`;const v=ht(u);return`<option value="${m}" label="${v}"></option>`}).join("");e&&(e.innerHTML=c),t&&(t.innerHTML=c)}function nr(e,t){const n=K(e);if(!n)return!1;const{start:a,end:s}=it();if(!a||!s)return x(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(qe().some(d=>K(d.barcode)===n))return x(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(we(n,a,s))return x(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const l=Ct(n);if(!l)return x(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const o=Se(l);if(o!=="available")return x(Oe(o)),!1;const c=ze(l);return c?(an({id:c,equipmentId:c,barcode:n,desc:l.desc,qty:1,price:l.price,image:Le(l)}),t&&(t.value=""),xe(),V(),x(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function Vt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=sa(t);if(!n){x(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Ws(n.barcode),s=Se(a||n);if(s!=="available"){x(Oe(s));return}const r=K(n.barcode);if(!r){x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const l=ze(n);if(!l){x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const o={id:l,equipmentId:l,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Le(n)},{start:c,end:d}=it();if(!c||!d){x(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(qe().some(v=>K(v.barcode)===r)){x(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(we(r,c,d)){x(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}an(o),xe(),V(),e.value=""}function ar(){He();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Vt(e))});const t=()=>{ra(e.value,"equipment-description-options")&&Vt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function xe(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=qe(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","ريال"),r=i("reservations.create.equipment.imageAlt","صورة"),l=i("reservations.equipment.actions.increase","زيادة الكمية"),o=i("reservations.equipment.actions.decrease","تقليل الكمية"),c=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=Te(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},v=Le(m)||u.image,f=v?`<img src="${v}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=y(String(u.count)),q=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,g=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):q*u.count,b=`${y(q.toFixed(2))} ${s}`,w=`${y(g.toFixed(2))} ${s}`,A=u.barcodes.map(j=>y(String(j||""))).filter(Boolean),D=A.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(j=>`<li>${j}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${D}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${o}">−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${l}">+</button>
            </div>
          </td>
          <td>${b}</td>
          <td>${w}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function sr(e){const t=qe(),a=Te(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ls(s),xe(),V())}function rr(e){const t=qe(),n=t.filter(a=>It(a)!==e);n.length!==t.length&&(Qn(n),xe(),V())}function ir(e){const t=qe(),a=Te(t).find(m=>m.key===e);if(!a)return;const{start:s,end:r}=it();if(!s||!r){x(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const l=new Set(t.map(m=>K(m.barcode))),{equipment:o=[]}=Q(),c=(o||[]).find(m=>{const v=K(m?.barcode);return!v||l.has(v)||It({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!Yn(m)?!1:!we(v,s,r)});if(!c){x(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=K(c.barcode),u=ze(c);if(!u){x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}an({id:u,equipmentId:u,barcode:d,desc:c.desc||c.description||c.name||a.description||"",qty:1,price:Number.isFinite(Number(c.price))?Number(c.price):a.unitPrice,image:Le(c)}),xe(),V()}function V(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(y(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,l=document.getElementById("res-payment-status")?.value||"unpaid",{start:o,end:c}=it();r&&ue();const d=nt(),u=document.getElementById("res-payment-status");_e(u,l),Ts({selectedItems:qe(),discount:t,discountType:n,applyTax:r,paidStatus:l,start:o,end:c,companySharePercent:d})}function or(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=y(r.target.value),V()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",V),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{n.checked&&ue(),V()}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.checked?a.dataset.companyShare||(a.dataset.companyShare=String(re)):n?.checked&&ue(),V()}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{_e(s),V()}),s.dataset.listenerAttached="true"),_e(s)}function lr(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){V();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),V()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function $n(){const{input:e,hidden:t}=rn(),{input:n,hidden:a}=on(),{customers:s}=Q();let r=t?.value?String(t.value):"";if(!r&&e?.value){const L=Ht(e.value,{allowPartial:!0});L&&(r=String(L.id),t&&(t.value=r),e.value=L.label,e.dataset.selectedId=r)}const l=s.find(L=>String(L.id)===r);if(!l){x(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const o=l.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const L=Ut(n.value,{allowPartial:!0});L&&(c=String(L.id),a&&(a.value=c),n.value=L.label,n.dataset.selectedId=c)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",v=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){x(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=`${d}T${m}`,p=`${u}T${v}`,q=new Date(f),g=new Date(p);if(Number.isNaN(q.getTime())||Number.isNaN(g.getTime())||q>=g){x(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const b=Ds(),w=qe();if(w.length===0&&b.length===0){x(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",D=parseFloat(y(document.getElementById("res-discount")?.value))||0,j=document.getElementById("res-discount-type")?.value||"percent",h=document.getElementById("res-payment-status")?.value||"unpaid",E=c?cn(c):null,T=Ys(E);if(c&&!E){x(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const L of w){const z=Se(L.barcode);if(z!=="available"){x(Oe(z));return}}for(const L of w){const z=K(L.barcode);if(we(z,f,p)){x(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const L of b)if(On(L,f,p)){x(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const H=document.getElementById("res-tax"),I=!!c?!1:H?.checked||!1,C=Hn(w,D,j,I,b,{start:f,end:p});I&&ue();let M=nt();I&&(!Number.isFinite(M)||M<=0)&&(ue(),M=nt());const B=I||Number.isFinite(M)&&M>0,$=ks(),R=Un({reservationCode:$,customerId:o,start:f,end:p,status:T?"confirmed":"pending",title:null,location:null,notes:A,projectId:c||null,totalAmount:C,discount:D,discountType:j,applyTax:I,paidStatus:h,confirmed:T,items:w.map(L=>({...L,equipmentId:L.equipmentId??L.id})),technicians:b,companySharePercent:B?M:null,companyShareEnabled:B});try{const L=await Ps(R);zn(),He(),kt(),cr(),x(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Mt=="function"&&Mt({type:"created",reservation:L})}catch(L){console.error("❌ [reservations/createForm] Failed to create reservation",L);const z=Vn(L)?L.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");x(z,"error")}}function cr(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),ye({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),rt({selectedValue:"",resetInput:!0});const l=document.getElementById("equipment-description");l&&(l.value="");const o=document.getElementById("res-payment-status");o&&(o.value="unpaid",_e(o,"unpaid")),Ns(),Qn([]),xe(),Me(),V()}function dr(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){sr(s);return}if(a==="increase-group"&&s){ir(s);return}if(a==="remove-group"&&s){rr(s);return}}),e.dataset.listenerAttached="true")}function ur(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,nr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:r,end:l}=it();!r||!l||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function mr(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await $n()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await $n()}),t.dataset.listenerAttached="true")}function Pi({onAfterSubmit:e}={}){Mt=typeof e=="function"?e:null;const{customers:t,projects:n}=Q();$s(t||[]),ye(),un(),ta(n||[]),aa({projectsList:n}),dn(),He(),ar(),lr(),or(),dr(),ur(),mr(),Zs(),V(),xe()}function ia(){He(),aa(),ye(),un(),dn(),xe(),V()}if(typeof document<"u"){const e=()=>{ye(),rt({projectsList:ln()}),un(),dn(),V()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function oa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ae(t),endDate:Ae(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ae(n),endDate:Ae(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ae(n),endDate:Ae(a)}}return e==="upcoming"?{startDate:Ae(t),endDate:""}:{startDate:"",endDate:""}}function pr(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=y(t?.value||"").trim(),l=y(n?.value||"").trim(),o=a?.value||"";if(new Set(["","today","week","month"]).has(o)||(o="",a&&(a.value=""),qt(t),qt(n),r="",l=""),!r&&!l&&o){const d=oa(o);r=d.startDate,l=d.endDate}return{searchTerm:ae(e?.value||""),startDate:r,endDate:l,status:s?.value||"",quickRange:o}}function Ni(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=y(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{fr(r.value),t()}),r.dataset.listenerAttached="true");const l=document.getElementById("reservation-status-filter");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",t),l.dataset.listenerAttached="true");const o=document.getElementById("clear-filters");o&&!o.dataset.listenerAttached&&(o.addEventListener("click",()=>{n&&(n.value=""),qt(a),qt(s),r&&(r.value=""),l&&(l.value=""),t()}),o.dataset.listenerAttached="true")}function fr(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=oa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ae(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function qt(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function mt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function vr(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function br(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=vr(n);if(a!==null)return a}return null}function Ln(e,t=0){const n=br(e);if(n!=null)return n;const a=mt(e.createdAt??e.created_at);if(a!=null)return a;const s=mt(e.updatedAt??e.updated_at);if(s!=null)return s;const r=mt(e.start);if(r!=null)return r;const l=mt(e.end);if(l!=null)return l;const o=Number(e.id??e.reservationId);return Number.isFinite(o)?o:Number.isFinite(t)?t:0}function hr({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((b,w)=>({reservation:b,index:w})),l=t.searchTerm||"",o=t.searchReservationId||"",c=t.searchCustomerName||"",d=t.startDate||"",u=t.endDate||"",m=t.status||"",v=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,f=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,p=d?new Date(`${d}T00:00:00`):null,q=u?new Date(`${u}T23:59:59`):null,g=r.filter(({reservation:b})=>{const w=n.get(String(b.customerId)),A=s?.get?.(String(b.projectId)),D=b.start?new Date(b.start):null,j=sn(b),{effectiveConfirmed:h}=$e(b,A);if(v!=null&&String(b.customerId)!==String(v)||f!=null&&!(Array.isArray(b.technicians)?b.technicians.map(I=>String(I)):[]).includes(String(f))||m==="confirmed"&&!h||m==="pending"&&h||m==="completed"&&!j||p&&D&&D<p||q&&D&&D>q||o&&!ae([b.reservationId,b.id].filter(Boolean).map(String).join(" ")).includes(o)||c&&!ae(w?.customerName||"").includes(c))return!1;if(!l)return!0;const E=b.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",T=(b.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return ae([b.reservationId,w?.customerName,b.notes,E,T,A?.title].filter(Boolean).join(" ")).includes(l)});return g.sort((b,w)=>{const A=Ln(b.reservation,b.index),D=Ln(w.reservation,w.index);return A!==D?D-A:w.index-b.index}),g}function gr({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","ريال"),r=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),l=i("reservations.list.unknownCustomer","غير معروف"),o=i("reservations.list.noNotes","لا توجد ملاحظات"),c=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),m=i("reservations.list.status.pending","⏳ غير مؤكد"),v=i("reservations.list.payment.paid","💳 مدفوع"),f=i("reservations.list.payment.unpaid","💳 غير مدفوع"),p=i("reservations.list.actions.confirm","✔️ تأكيد"),q=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),g=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),b={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:w,index:A})=>{const D=t.get(String(w.customerId)),j=w.projectId?a?.get?.(String(w.projectId)):null,h=sn(w),E=w.paid===!0||w.paid==="paid",{effectiveConfirmed:T,projectLinked:H}=$e(w,j),P=T?"status-confirmed":"status-pending",I=E?"status-paid":"status-unpaid";let C=`<span class="reservation-chip status-chip ${P}">${T?u:m}</span>`,M=`<span class="reservation-chip status-chip ${I}">${E?v:f}</span>`,B=E?" tile-paid":" tile-unpaid";h&&(B+=" tile-completed");let $="";h&&(C=`<span class="reservation-chip status-chip status-completed">${u}</span>`,M=`<span class="reservation-chip status-chip status-completed">${E?v:f}</span>`,$=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const R=!H&&!T?`<button class="tile-confirm" data-reservation-index="${A}" data-action="confirm">${p}</button>`:"",L=R?`<div class="tile-actions">${R}</div>`:"",z=w.items?.length||0,Y=(w.technicians||[]).map(oe=>n.get(String(oe))).filter(Boolean),G=Y.map(oe=>oe.name).join(d)||"—",te=y(String(w.reservationId??"")),Z=w.start?y(Fe(w.start)):"-",pe=w.end?y(Fe(w.end)):"-",F=y(String(w.cost??0)),W=y(String(z)),Ue=w.notes?y(w.notes):o,fe=c.replace("{count}",W),Ve=w.applyTax?`<small>${r}</small>`:"";let Ee=q;return w.projectId&&(Ee=j?.title?y(j.title):g),`
      <div class="${R?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${B}"${$} data-reservation-index="${A}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${te}</div>
          <div class="tile-badges">
            ${C}
            ${M}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${b.client}</span>
            <span class="tile-value">${D?.customerName||l}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.project}</span>
            <span class="tile-value">${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.start}</span>
            <span class="tile-value tile-inline">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.end}</span>
            <span class="tile-value tile-inline">${pe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.cost}</span>
            <span class="tile-value">${F} ${s} ${Ve}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.equipment}</span>
            <span class="tile-value">${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.crew}</span>
            <span class="tile-value">${Y.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ue}</span>
          </div>
        </div>
        ${L}
      </div>
    `}).join("")}function pt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function yr(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:l}=$e(e,s),o=e.paid===!0||e.paid==="paid",c=sn(e),d=e.items||[],u=Te(d),{technicians:m=[]}=Q(),v=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),f=new Map;v.forEach(N=>{if(!N||N.id==null)return;const O=String(N.id),ee=f.get(O)||{};f.set(O,{...ee,...N})});const p=(e.technicians||[]).map(N=>f.get(String(N))).filter(Boolean),q=_n(),g=Wn(e.start,e.end),b=(N={})=>{const O=[N.dailyWage,N.daily_rate,N.dailyRate,N.wage,N.rate];for(const ee of O){if(ee==null)continue;const je=parseFloat(y(String(ee)));if(Number.isFinite(je))return je}return 0},A=d.reduce((N,O)=>N+(O.qty||1)*(O.price||0),0)*g,j=p.reduce((N,O)=>N+b(O),0)*g,h=A+j,E=parseFloat(e.discount)||0,T=e.discountType==="amount"?E:h*(E/100),H=Math.max(0,h-T),P=r?!1:e.applyTax,I=P?H*.15:0,C=Number(e.cost),M=Number.isFinite(C),B=H+I,$=r?Math.round(B):M?C:Math.round(B),R=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,L=R!=null?parseFloat(y(String(R))):NaN;let G=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(L)&&L>0)&&Number.isFinite(L)?L:0,te=G>0?Math.max(0,(Number.isFinite($)?$:0)*(G/100)):0;P&&G<=0&&(G=re,te=Math.max(0,(Number.isFinite($)?$:0)*(G/100)));const Z=y(String(e.reservationId??e.id??"")),pe=e.start?y(Fe(e.start)):"-",F=e.end?y(Fe(e.end)):"-",W=y(String(p.length)),Ue=y(A.toFixed(2)),fe=y(T.toFixed(2)),Ve=y(H.toFixed(2)),Ee=y(I.toFixed(2)),Ie=y(($??0).toFixed(2)),oe=y(String(g)),J=i("reservations.create.summary.currency","ريال"),yn=i("reservations.details.labels.discount","الخصم"),Tt=i("reservations.details.labels.tax","الضريبة (15%)"),ot=i("reservations.details.labels.crewTotal","إجمالي الفريق"),Be=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),lt=i("reservations.details.labels.duration","عدد الأيام"),$t=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Lt=i("reservations.details.labels.netProfit","💵 صافي الربح"),ct=i("reservations.create.equipment.imageAlt","صورة"),ve={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},be=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Dt=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Pt=i("reservations.details.technicians.roleUnknown","غير محدد"),ke=i("reservations.details.technicians.phoneUnknown","غير متوفر"),Ke=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Qe=i("reservations.list.status.confirmed","✅ مؤكد"),Nt=i("reservations.list.status.pending","⏳ غير مؤكد"),Bt=i("reservations.list.payment.paid","💳 مدفوع"),jt=i("reservations.list.payment.unpaid","💳 غير مدفوع"),_=i("reservations.list.status.completed","📁 منتهي"),X=i("reservations.details.labels.id","🆔 رقم الحجز"),le=i("reservations.details.section.bookingInfo","بيانات الحجز"),Fa=i("reservations.details.section.paymentSummary","ملخص الدفع"),_a=i("reservations.details.labels.finalTotal","المجموع النهائي"),Ma=i("reservations.details.section.crew","😎 الفريق الفني"),za=i("reservations.details.crew.count","{count} عضو"),Oa=i("reservations.details.section.items","📦 المعدات المرتبطة"),Ha=i("reservations.details.items.count","{count} عنصر"),Ua=i("reservations.details.actions.edit","✏️ تعديل"),Va=i("reservations.details.actions.delete","🗑️ حذف"),Ka=i("reservations.details.labels.customer","العميل"),Qa=i("reservations.details.labels.contact","رقم التواصل"),Ga=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Wa=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Xa=i("reservations.details.actions.openProject","📁 فتح المشروع"),Ya=i("reservations.details.labels.start","بداية الحجز"),Za=i("reservations.details.labels.end","نهاية الحجز"),Ja=i("reservations.details.labels.notes","ملاحظات"),es=i("reservations.list.noNotes","لا توجد ملاحظات"),ts=i("reservations.details.labels.itemsCount","عدد المعدات"),ns=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),as=i("reservations.details.labels.paymentStatus","حالة الدفع"),ss=i("reservations.list.unknownCustomer","غير معروف"),qn=o?Bt:jt,rs=u.reduce((N,O)=>N+(Number(O.quantity)||0),0),is=y(String(rs)),wn=Ha.replace("{count}",is),os=za.replace("{count}",W),ls=e.notes?y(e.notes):es,cs=y(j.toFixed(2)),ds=y(String(G)),us=y(te.toFixed(2)),ms=`${ds}% (${us} ${J})`,Sn=Math.max(0,($??0)-I-te),ps=y(Sn.toFixed(2)),he=[{icon:"💳",label:as,value:qn},{icon:"📦",label:ts,value:wn},{icon:"⏱️",label:lt,value:oe},{icon:"💼",label:ns,value:`${Ue} ${J}`}];he.push({icon:"😎",label:ot,value:`${cs} ${J}`}),T>0&&he.push({icon:"💸",label:yn,value:`${fe} ${J}`}),he.push({icon:"📊",label:Be,value:`${Ve} ${J}`}),P&&I>0&&he.push({icon:"🧾",label:Tt,value:`${Ee} ${J}`}),G>0&&he.push({icon:"🏦",label:$t,value:ms}),Math.abs(Sn-($??0))>.009&&he.push({icon:"💵",label:Lt,value:`${ps} ${J}`}),he.push({icon:"💰",label:_a,value:`${Ie} ${J}`});const fs=he.map(({icon:N,label:O,value:ee})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${N} ${O}</span>
      <span class="summary-details-value">${ee}</span>
    </div>
  `).join(""),xn=[{text:l?Qe:Nt,className:l?"status-confirmed":"status-pending"},{text:qn,className:o?"status-paid":"status-unpaid"}];c&&xn.push({text:_,className:"status-completed"});const vs=xn.map(({text:N,className:O})=>`<span class="status-chip ${O}">${N}</span>`).join(""),Ge=(N,O,ee)=>`
    <div class="res-info-row">
      <span class="label">${N} ${O}</span>
      <span class="value">${ee}</span>
    </div>
  `;let Rt="";if(e.projectId){let N=pt(Wa);if(s){const O=s.title||i("projects.fallback.untitled","مشروع بدون اسم");N=`${pt(O)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${pt(Xa)}</button>`}Rt=`
      <div class="res-info-row">
        <span class="label">📁 ${Ga}</span>
        <span class="value">${N}</span>
      </div>
    `}const Ce=[];Ce.push(Ge("👤",Ka,t?.customerName||ss)),Ce.push(Ge("📞",Qa,t?.phone||"—")),Ce.push(Ge("🗓️",Ya,pe)),Ce.push(Ge("🗓️",Za,F)),Ce.push(Ge("📝",Ja,ls)),Rt&&Ce.push(Rt);const bs=Ce.join(""),hs=u.length?u.map(N=>{const O=N.items[0]||{},ee=Le(O)||N.image,je=ee?`<img src="${ee}" alt="${ct}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',dt=Number(N.quantity)||Number(N.count)||0,ut=y(String(dt)),En=Number.isFinite(Number(N.unitPrice))?Number(N.unitPrice):0,ws=Number.isFinite(Number(N.totalPrice))?Number(N.totalPrice):En*dt,Ss=`${y(En.toFixed(2))} ${J}`,xs=`${y(ws.toFixed(2))} ${J}`,In=N.barcodes.map(Ft=>y(String(Ft||""))).filter(Boolean),Es=In.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${In.map(Ft=>`<li>${Ft}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${je}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${pt(O.desc||O.description||O.name||N.description||"-")}</div>
                  ${Es}
                </div>
              </div>
            </td>
            <td>
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${ut}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td>${Ss}</td>
            <td>${xs}</td>
            <td>
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${be}</td></tr>`,gs=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${ve.item}</th>
            <th>${ve.quantity}</th>
            <th>${ve.unitPrice}</th>
            <th>${ve.total}</th>
            <th>${ve.actions}</th>
          </tr>
        </thead>
        <tbody>${hs}</tbody>
      </table>
    </div>
  `,ys=p.map((N,O)=>{const ee=y(String(O+1)),je=N.role||Pt,dt=N.phone||ke,ut=N.wage?Ke.replace("{amount}",y(String(N.wage))).replace("{currency}",J):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ee}</span>
          <span class="technician-name">${N.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${je}</div>
          <div>📞 ${dt}</div>
          ${ut?`<div>💰 ${ut}</div>`:""}
        </div>
      </div>
    `}).join(""),qs=p.length?`<div class="reservation-technicians-grid">${ys}</div>`:`<ul class="reservation-modal-technicians"><li>${Dt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${X}</span>
          <strong>${Z}</strong>
        </div>
        <div class="status-chips">
          ${vs}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${le}</h6>
          ${bs}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Fa}</h6>
            <div class="summary-details">
              ${fs}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Ma}</span>
          <span class="count">${os}</span>
        </div>
        ${qs}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Oa}</span>
          <span class="count">${wn}</span>
        </div>
        ${gs}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Ua}</button>
        ${q?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Va}</button>`:""}
      </div>
    </div>
  `}const qr=`@page {
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

#quotation-pdf-root [style*="color"],
#quotation-pdf-root [class*="text"],
#quotation-pdf-root [class*="-text"],
#quotation-pdf-root [class*="text-"] {
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
  color: #000000 !important;
  justify-self: start;
}

.quote-header__meta-item {
  display: flex;
  gap: 4px;
  align-items: baseline;
}

.quote-header__meta-item span {
  font-weight: 600;
  color: #000000 !important;
}

.quote-header__meta-item strong {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000 !important;
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
  color: #000000 !important;
}

.quote-company-cr {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #000000 !important;
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
  color: #000000 !important;
}

.quote-section__title {
  margin: 0 0 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: right;
  color: #000000 !important;
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


.quote-section--financial {
  width: 100%;
  margin: 0;
}

#quotation-pdf-root[data-quote-render-context] .quote-section--financial {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 900px) {
  #quotation-pdf-root[data-quote-render-context] .quote-section--financial {
    max-width: 100%;
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
  color: #000000 !important;
  text-align: right;
}

.payment-row__slash {
  font-weight: 600;
  color: #000000 !important;
}

.payment-row__value {
  font-weight: 700;
  color: #000000 !important;
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
  color: #000000 !important;
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
  color: #000000 !important;
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
  color: #000000 !important;
}

.info-plain__value {
  font-weight: 600;
  font-size: 0.8rem;
  color: #000000 !important;
}

.info-plain--dense {
  gap: 4px;
  font-size: 0.7rem;
}

.info-plain--dense .info-plain__value {
  font-size: 0.76rem;
}

.info-plain__slash {
  color: #000000 !important;
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
  color: #000000 !important;
}

.info-row strong {
  font-weight: 700;
  font-size: 13.5px;
  color: #000000 !important;
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
  color: #000000 !important;
}

.info-item strong {
  font-weight: 700;
  font-size: 13.5px;
  color: #000000 !important;
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
  color: #000000 !important;
}

.totals-inline__slash {
  font-weight: 600;
  color: #000000 !important;
}

.totals-inline__value {
  font-weight: 700;
  color: #000000 !important;
}

.totals-final {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
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
  color: #000000 !important;
  font-size: 0.7rem;
}

.totals-item__slash {
  font-weight: 600;
  color: #000000 !important;
  font-size: 0.7rem;
}

.totals-item__value {
  font-weight: 700;
  color: #000000 !important;
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
`,la="reservations.quote.sequence",ce={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},wr=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],mn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ca=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(y(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(y(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(y(Number(e?.price||0).toFixed(2)))}],da=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(y(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ua={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ca.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:da.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Sr="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",xr="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Er="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Ir=qr.trim(),kr=/color\([^)]*\)/gi,wt=/(color\(|color-mix\()/i,Cr=document.createElement("canvas"),ft=Cr.getContext("2d"),ma=/^data:image\/svg\+xml/i,Ar=/\.svg($|[?#])/i,Ze=512,Kt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",pa=96,fa=25.4,Qt=210,vt=297,Je=Math.round(Qt/fa*pa),et=Math.round(vt/fa*pa),Tr=2,va=/safari/i,$r=/(iphone|ipad|ipod)/i,Lr=/(iphone|ipad|ipod)/i,Dr=/(crios|fxios|edgios|opios)/i,St="[reservations/pdf]";let U=null,k=null,ie=1,We=null,Xe=null,ge=null,Re=null;function Gt(){return!!window?.bootstrap?.Modal}function Pr(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ge||(ge=document.createElement("div"),ge.className="modal-backdrop fade show",ge.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ge)),Re||(Re=t=>{t.key==="Escape"&&Wt(e)},document.addEventListener("keydown",Re));try{e.focus({preventScroll:!0})}catch{}}}function Wt(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ge&&(ge.remove(),ge=null),Re&&(document.removeEventListener("keydown",Re),Re=null))}function Nr(e){if(e){if(Gt()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Pr(e)}}function ba(){const e={};return Object.entries(ua).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function Br(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function jr(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ha(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ga(){return Object.fromEntries(mn.map(({id:e})=>[e,!1]))}function pn(e,t){return e.sectionExpansions||(e.sectionExpansions=ga()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Rr(e,t){return pn(e,t)?.[t]!==!1}function fn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Fr(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return $r.test(e)}function _r(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=va.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function ya(){return Fr()&&_r()}function Mr(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return Lr.test(e)&&va.test(e)&&!Dr.test(e)}function _t(e,...t){try{console.log(`${St} ${e}`,...t)}catch{}}function Xt(e,...t){try{console.warn(`${St} ${e}`,...t)}catch{}}function zr(e,t,...n){try{t?console.error(`${St} ${e}`,t,...n):console.error(`${St} ${e}`,...n)}catch{}}function se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Or(e,t="لا توجد بيانات للعرض."){const n=S(i(e,t));return se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Dn(e,t){return Array.isArray(e)&&e.length?e:[Or(t)]}function Yt(e,t="#000"){if(!ft||!e)return t;try{return ft.fillStyle="#000",ft.fillStyle=e,ft.fillStyle||t}catch{return t}}function Hr(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=Yt(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function qa(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(kr,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Ur=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function wa(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Ur.forEach(l=>{const o=s[l];if(o&&wt.test(o)){const c=l.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=l==="backgroundColor"?"#ffffff":s.color||"#000000",u=Yt(o,d);a.style.setProperty(c,u,"important")}});const r=s.backgroundImage;if(r&&wt.test(r)){const l=Yt(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",l,"important")}})}function Sa(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const l=a[r];if(l&&wt.test(l)){const o=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),c=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(o,c,"important")}});const s=a.backgroundImage;s&&wt.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Pn(e,t=Ze){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Vr(e){if(!e)return{width:Ze,height:Ze};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Pn(t,0):0,s=n?Pn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const l=r.trim().split(/[\s,]+/).map(o=>parseFloat(o||"0"));if(l.length>=4){const[,,o,c]=l;a=a||(Number.isFinite(o)&&o>0?o:0),s=s||(Number.isFinite(c)&&c>0?c:0)}}return{width:a||Ze,height:s||Ze}}function xa(e=""){return typeof e!="string"?!1:ma.test(e)||Ar.test(e)}function Kr(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Qr(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const l=r?.message||`Unable to load image from ${e}`;a(new Error(l))},s.src=e})}async function Ea(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Qr(s),l=n.createElement("canvas"),o=Math.max(t.width||r.naturalWidth||r.width||0,1),c=Math.max(t.height||r.naturalHeight||r.height||o,1);l.width=o,l.height=c;const d=l.getContext("2d");return d.clearRect(0,0,o,c),d.drawImage(r,0,0,o,c),l.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Gr(e){if(!e)return null;if(ma.test(e))return Kr(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Wr(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!xa(t))return!1;const n=await Gr(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Kt),!1;const a=await Ea(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Kt),!1)}async function Xr(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Vr(e),s=await Ea(n,a),l=(e.ownerDocument||document).createElement("img");l.setAttribute("src",s||Kt),l.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),l.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&l.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&l.setAttribute("style",e.getAttribute("style"));const o=e.getAttribute("width"),c=e.getAttribute("height");return o&&l.setAttribute("width",o),c&&l.setAttribute("height",c),e.parentNode?.replaceChild(l,e),!!s}async function Ia(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{xa(s.getAttribute?.("src"))&&a.push(Wr(s))}),n.forEach(s=>{a.push(Xr(s))}),a.length&&await Promise.allSettled(a)}function Zt(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){zr(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=n||i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(x(r),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Jt({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Xt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Xt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function vn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Nn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Bn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Yr(){const e=Bn();return e||(Xe||(Xe=vn(xr).catch(t=>{throw Xe=null,t}).then(()=>{const t=Bn();if(!t)throw Xe=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Xe)}async function Zr(){const e=Nn();return e||(We||(We=vn(Er).catch(t=>{throw We=null,t}).then(()=>{const t=Nn();if(!t)throw We=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),We)}async function Jr(){if(window.html2pdf||await vn(Sr),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Hr()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ei(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function ti(){const e=window.localStorage?.getItem?.(la),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function ni(){const t=ti()+1;return{sequence:t,quoteNumber:ei(t)}}function ai(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(la,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function si(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function ri(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(y(String(n)));if(Number.isFinite(a))return a}return 0}function ii(e){const t=kt()||[],{technicians:n=[]}=Q(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const l=String(r.id),o=s.get(l)||{};s.set(l,{...o,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function oi(e,t,n){const{projectLinked:a}=$e(e,n),s=Wn(e.start,e.end),o=(Array.isArray(e.items)?e.items:[]).reduce((M,B)=>M+(Number(B?.qty)||1)*(Number(B?.price)||0),0)*s,d=t.reduce((M,B)=>M+ri(B),0)*s,u=o+d,m=parseFloat(e.discount)||0,v=e.discountType==="amount"?m:u*(m/100),f=Math.max(0,u-v),p=a?!1:e.applyTax,q=p?f*.15:0,g=Number(e.cost),b=Number.isFinite(g),w=f+q,A=a?Math.round(w):b?g:Math.round(w),D=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,j=D!=null?parseFloat(y(String(D).replace("%","").trim())):NaN,h=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let T=(h!=null?h===!0||h===1||h==="1"||String(h).toLowerCase()==="true":Number.isFinite(j)&&j>0)&&Number.isFinite(j)?Number(j):0;p&&T<=0&&(T=re);const H=T>0?Math.max(0,(A??0)*(T/100)):0,P=Math.max(0,(A??0)-q-H),I={equipmentTotal:o,crewTotal:d,discountAmount:v,taxAmount:q,finalTotal:A??0,companySharePercent:T,companyShareAmount:H,netProfit:P},C={equipmentTotal:y(o.toFixed(2)),crewTotal:y(d.toFixed(2)),discountAmount:y(v.toFixed(2)),taxAmount:y(q.toFixed(2)),finalTotal:y((A??0).toFixed(2)),companySharePercent:y(T.toFixed(2)),companyShareAmount:y(H.toFixed(2)),netProfit:y(P.toFixed(2))};return{totals:I,totalsDisplay:C,rentalDays:s}}function ka({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:r,rentalDays:l,currencyLabel:o,sections:c,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:v=0,companyShareAmount:f=0,netProfit:p=0}=s||{},q=y(String(e?.reservationId??e?.id??"")),g=e.start?y(Fe(e.start)):"-",b=e.end?y(Fe(e.end)):"-",w=t?.customerName||t?.full_name||t?.name||"-",A=t?.phone||"-",D=t?.email||"-",j=t?.company||t?.company_name||"-",h=y(A),E=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),T=n?.code||n?.projectCode||"",H=y(String(l)),P=e?.notes||"",I=Br(d),C=(_,X)=>ha(I,_,X),M=_=>c?.has?.(_),B=`<div class="quote-placeholder">${S(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,$=(_,X)=>`<div class="info-plain__item">${S(_)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(X)}</strong></div>`,R=(_,X,{variant:le="inline"}={})=>le==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(_)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(_)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(X)}</span>
    </span>`,L=(_,X)=>`<div class="payment-row">
      <span class="payment-row__label">${S(_)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(X)}</span>
    </div>`,z=[];C("customerInfo","customerName")&&z.push($(i("reservations.details.labels.customer","العميل"),w)),C("customerInfo","customerCompany")&&z.push($(i("reservations.details.labels.company","الشركة"),j)),C("customerInfo","customerPhone")&&z.push($(i("reservations.details.labels.phone","الهاتف"),h)),C("customerInfo","customerEmail")&&z.push($(i("reservations.details.labels.email","البريد"),D));const Y=M("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:B}
      </section>`:"",G=[];C("reservationInfo","reservationId")&&G.push($(i("reservations.details.labels.reservationId","رقم الحجز"),q||"-")),C("reservationInfo","reservationStart")&&G.push($(i("reservations.details.labels.start","بداية الحجز"),g)),C("reservationInfo","reservationEnd")&&G.push($(i("reservations.details.labels.end","نهاية الحجز"),b)),C("reservationInfo","reservationDuration")&&G.push($(i("reservations.details.labels.duration","عدد الأيام"),H));const te=M("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:B}
      </section>`:"",Z=[];C("projectInfo","projectTitle")&&Z.push($(i("reservations.details.labels.project","المشروع"),E)),C("projectInfo","projectCode")&&Z.push($(i("reservations.details.labels.code","الرمز"),T||"-"));const pe=M("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Z.length?`<div class="info-plain">${Z.join("")}</div>`:B}
      </section>`:"",F=[];if(C("financialSummary","equipmentTotal")&&F.push(R(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${o}`)),C("financialSummary","crewTotal")&&F.push(R(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${o}`)),C("financialSummary","discountAmount")&&F.push(R(i("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${o}`)),C("financialSummary","taxAmount")&&F.push(R(i("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${o}`)),v>0&&C("financialSummary","companyShare")){const _=r.companySharePercent??y(v.toFixed(2)),X=r.companyShareAmount??y(f.toFixed(2)),le=`${_}% (${X} ${o})`;F.push(R(i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),le))}const W=C("financialSummary","finalTotal"),Ue=C("financialSummary","netProfit")&&Number.isFinite(p)&&Math.abs((p??0)-(s?.finalTotal??0))>.009,fe=[];W&&fe.push(R(i("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${o}`,{variant:"final"})),Ue&&fe.push(R(i("reservations.details.labels.netProfit","💵 صافي الربح"),`${r.netProfit} ${o}`,{variant:"final"}));const Ve=fe.length?`<div class="totals-final">${fe.join("")}</div>`:"",Ee=M("financialSummary")?!F.length&&!W?`<section class="quote-section quote-section--financial">${B}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${F.length?`<div class="totals-inline">${F.join("")}</div>`:""}
            ${Ve}
          </div>
        </section>`:"",Ie=ca.filter(_=>C("items",_.id)),oe=Ie.length>0,J=oe?Ie.map(_=>`<th>${S(_.labelKey?i(_.labelKey,_.fallback):_.fallback)}</th>`).join(""):"",Tt=Array.isArray(e.items)&&e.items.length>0?e.items.map((_,X)=>`<tr>${Ie.map(le=>`<td>${le.render(_,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ie.length,1)}" class="empty">${S(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ot=M("items")?oe?`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${J}</tr>
              </thead>
              <tbody>${Tt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.items.title","المعدات"))}</h3>
            ${B}
          </section>`:"",Be=da.filter(_=>C("crew",_.id)),lt=Be.length>0,$t=lt?Be.map(_=>`<th>${S(_.labelKey?i(_.labelKey,_.fallback):_.fallback)}</th>`).join(""):"",Lt=a.length?a.map((_,X)=>`<tr>${Be.map(le=>`<td>${le.render(_,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Be.length,1)}" class="empty">${S(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ct=M("crew")?lt?`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${$t}</tr>
              </thead>
              <tbody>${Lt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${B}
          </section>`:"",ve=M("notes")?`<section class="quote-section">
        <h3>${S(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(P||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",be=[];C("payment","beneficiary")&&be.push(L(i("reservations.quote.labels.beneficiary","اسم المستفيد"),ce.beneficiaryName)),C("payment","bank")&&be.push(L(i("reservations.quote.labels.bank","اسم البنك"),ce.bankName)),C("payment","account")&&be.push(L(i("reservations.quote.labels.account","رقم الحساب"),y(ce.accountNumber))),C("payment","iban")&&be.push(L(i("reservations.quote.labels.iban","رقم الآيبان"),y(ce.iban)));const Dt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${be.length?be.join(""):B}</div>
      </div>
      <p class="quote-approval-note">${S(ce.approvalNote)}</p>
    </section>`,Pt=`<footer class="quote-footer">
        <h4>${S(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${wr.map(_=>`<li>${S(_)}</li>`).join("")}</ul>
      </footer>`,ke=[];Y&&te?ke.push(se(`<div class="quote-section-row">${Y}${te}</div>`,{blockType:"group"})):(te&&ke.push(se(te)),Y&&ke.push(se(Y))),pe&&ke.push(se(pe));const Ke=[];ot&&Ke.push(se(ot,{blockType:"table",extraAttributes:'data-table-id="items"'})),ct&&Ke.push(se(ct,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Qe=[];Ee&&Qe.push(se(Ee,{blockType:"summary"})),ve&&Qe.push(se(ve));const Nt=[se(Dt,{blockType:"payment"}),se(Pt,{blockType:"footer"})],Bt=[...Dn(ke,"reservations.quote.placeholder.page1"),...Ke,...Dn(Qe,"reservations.quote.placeholder.page2"),...Nt],jt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(ce.logoUrl)}" alt="${S(ce.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(ce.companyName)}</p>
        <p class="quote-company-cr">${S(i("reservations.quote.labels.cr","السجل التجاري"))}: ${S(ce.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${S(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Ir}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${jt}
          ${Bt.join("")}
        </div>
      </div>
    </div>
  `}function li(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function at(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(o=>li(o)),l=[s,...r].map(o=>o.catch(c=>(Xt("asset load failed",c),null)));await Promise.all(l),await new Promise(o=>n.requestAnimationFrame(()=>o()))}async function Ca(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),l=r?.querySelector("[data-quote-header-template]");if(!s||!r||!l)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ia(r),await at(r),s.innerHTML="";const o=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let c=null,d=null;const u=h=>{h.style.margin="0 auto",h.style.breakInside="avoid",h.style.pageBreakInside="avoid",h.style.pageBreakAfter="auto",h.style.breakAfter="auto"},m=()=>{const h=a.createElement("div"),E=s.childElementCount===0;if(h.className="quote-page",h.dataset.pageIndex=String(s.childElementCount),E){h.classList.add("quote-page--primary");const H=l.cloneNode(!0);H.removeAttribute("data-quote-header-template"),h.appendChild(H)}else h.classList.add("quote-page--continuation");const T=a.createElement("main");T.className="quote-body",h.appendChild(T),s.appendChild(h),u(h),c=h,d=T},v=()=>{(!c||!d||!d.isConnected)&&m()},f=()=>{if(!c||!d||d.childElementCount>0)return;const h=c;c=null,d=null,h.parentNode&&h.parentNode.removeChild(h)},p=()=>{c=null,d=null},q=()=>c?c.scrollHeight-c.clientHeight>Tr:!1,g=(h,{allowOverflow:E=!1}={})=>(v(),d.appendChild(h),q()&&!E?(d.removeChild(h),f(),!1):!0),b=h=>{const E=h.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!g(E)&&(p(),!g(E)&&g(E,{allowOverflow:!0}))},w=h=>{const E=h.querySelector("table");if(!E){b(h);return}const T=h.querySelector("h3"),H=E.querySelector("thead"),P=Array.from(E.querySelectorAll("tbody tr"));if(!P.length){b(h);return}let I=null,C=0;const M=($=!1)=>{const R=h.cloneNode(!1);R.removeAttribute("data-quote-block"),R.removeAttribute("data-block-type"),R.removeAttribute("data-table-id"),R.classList.add("quote-section--table-fragment"),$&&R.classList.add("quote-section--table-fragment--continued");const L=T?T.cloneNode(!0):null;L&&R.appendChild(L);const z=E.cloneNode(!1);z.classList.add("quote-table--fragment"),H&&z.appendChild(H.cloneNode(!0));const Y=a.createElement("tbody");return z.appendChild(Y),R.appendChild(z),{section:R,body:Y}},B=($=!1)=>I||(I=M($),g(I.section)||(p(),g(I.section)||g(I.section,{allowOverflow:!0})),I);P.forEach($=>{B(C>0);const R=$.cloneNode(!0);if(I.body.appendChild(R),q()&&(I.body.removeChild(R),I.body.childElementCount||(d.removeChild(I.section),I=null,f()),p(),I=null,B(C>0),I.body.appendChild(R),q())){I.section.classList.add("quote-section--table-fragment--overflow"),C+=1;return}C+=1}),I=null};if(!o.length)return;o.forEach(h=>{h.getAttribute("data-block-type")==="table"?w(h):b(h)});const A=Array.from(s.children),D=[];A.forEach((h,E)=>{const T=h.querySelector(".quote-body");if(E!==0&&(!T||T.childElementCount===0)){h.remove();return}D.push(h)}),D.forEach((h,E)=>{const T=E===0;h.style.pageBreakAfter="auto",h.style.breakAfter="auto",h.style.pageBreakBefore=T?"auto":"always",h.style.breakBefore=T?"auto":"page",n?h.style.boxShadow="":h.style.boxShadow="none"});const j=D[D.length-1]||null;c=j,d=j?.querySelector(".quote-body")||null,await at(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function bn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ci(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,l]=await Promise.all([Zr(),Yr()]),o=typeof window<"u"&&window.devicePixelRatio||1,c=fn(),d=ya(),u=Mr();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,o*1.1)):c?m=Math.min(1.8,Math.max(1.25,o*1.2)):m=Math.min(2,Math.max(1.6,o*1.4));const v=u||d?.9:c?.92:.95,f=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),p={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let q=0;const g=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let w=0;w<s.length;w+=1){const A=s[w];await Ia(A),await at(A);const D=A.ownerDocument||document,j=D.createElement("div");Object.assign(j.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const h=A.cloneNode(!0);h.style.width=`${Je}px`,h.style.maxWidth=`${Je}px`,h.style.minWidth=`${Je}px`,h.style.height=`${et}px`,h.style.maxHeight=`${et}px`,h.style.minHeight=`${et}px`,h.style.position="relative",h.style.background="#ffffff",bn(h),j.appendChild(h),D.body.appendChild(j);let E;try{await at(h),E=await l(h,{...p,scale:m,width:Je,height:et,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch($){throw Zt($,"pageCapture",{toastMessage:g}),$}finally{j.parentNode?.removeChild(j)}if(!E)continue;const T=E.width||1,P=(E.height||1)/T;let I=Qt,C=I*P,M=0;if(C>vt){const $=vt/C;C=vt,I=I*$,M=Math.max(0,(Qt-I)/2)}const B=E.toDataURL("image/jpeg",v);q>0&&f.addPage(),f.addImage(B,"JPEG",M,0,I,C,`page-${q+1}`,"FAST"),q+=1,await new Promise($=>window.requestAnimationFrame($))}}catch(w){throw Jt({safariWindowRef:n,mobileWindowRef:a}),w}if(q===0)throw Jt({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const w=f.output("blob"),A=URL.createObjectURL(w);d?n&&!n.closed?(n.location.href=A,n.focus?.()):window.open(A,"_blank"):a&&!a.closed&&(a.location.href=A,a.focus?.()),setTimeout(()=>URL.revokeObjectURL(A),6e4)}else f.save(t)}function hn(){if(!k||!U)return;const{previewFrame:e}=U;if(!e)return;const t=ka({reservation:k.reservation,customer:k.customer,project:k.project,technicians:k.technicians,totals:k.totals,totalsDisplay:k.totalsDisplay,rentalDays:k.rentalDays,currencyLabel:k.currencyLabel,sections:k.sections,fieldSelections:k.fields,quoteNumber:k.quoteNumber,quoteDate:k.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(qa(s),wa(s,a),Sa(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&(await Ca(r,{context:"preview"}),bn(r))}catch(v){console.error("[reservations/pdf] failed to layout preview document",v)}const l=Array.from(n?.querySelectorAll?.(".quote-page")||[]),o=n?.querySelector(".quote-preview-pages"),c=Je;let d=18;if(o&&n?.defaultView){const v=n.defaultView.getComputedStyle(o),f=parseFloat(v.rowGap||v.gap||`${d}`);Number.isFinite(f)&&f>=0&&(d=f)}const u=et,m=l.length?l.length*u+Math.max(0,(l.length-1)*d):u;if(e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(m),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,U?.previewFrameWrapper&&!U?.userAdjustedZoom){const v=U.previewFrameWrapper.clientWidth-24;v>0&&v<c?ie=Math.max(v/c,.3):ie=1}Ta(ie)},{once:!0})}function di(e){if(!k)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?k.sections.add(n):k.sections.delete(n),Aa(),hn())}function ui(e){if(!k)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=k.fields||(k.fields=ba()),r=jr(s,n);t.checked?r.add(a):r.delete(a),hn()}function mi(e){if(!k)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(pn(k,n),k.sectionExpansions[n]=t.open)}function Aa(){if(!U?.toggles||!k)return;const{toggles:e}=U,t=k.fields||{};pn(k);const n=mn.map(({id:a,labelKey:s,fallback:r})=>{const l=i(s,r),o=k.sections.has(a),c=ua[a]||[],d=Rr(k,a),u=c.length?`<div class="quote-toggle-sublist">
          ${c.map(m=>{const v=ha(t,a,m.id),f=o?"":"disabled",p=m.labelKey?i(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${v?"checked":""} ${f}>
                <span>${S(p)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${o?"checked":""}>
            <span>${S(l)}</span>
          </label>
          ${c.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",di)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",ui)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",mi)})}function pi(){if(U?.modal)return U;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${S(i("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${S(i("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${S(i("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${S(i("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),r=e.querySelector(".modal-header"),l=r?.querySelector(".btn-close"),o=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),c=document.createElement("div");c.className="quote-preview-header-actions",r&&r.insertBefore(c,l||null);const d=document.createElement("iframe");d.className="quote-preview-frame",d.setAttribute("title",i("reservations.quote.previewTitle","معاينة عرض السعر")),d.setAttribute("loading","lazy"),d.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(i("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(i("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(i("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const v=document.createElement("div");v.className="quote-preview-scroll",v.appendChild(m),n.appendChild(v),c.appendChild(u),s?.addEventListener("click",async()=>{if(k){s.disabled=!0;try{await vi()}finally{s.disabled=!1}}});const f=()=>{Gt()||Wt(e)};o.forEach(b=>{b?.addEventListener("click",f)}),l&&!o.includes(l)&&l.addEventListener("click",f),e.addEventListener("click",b=>{Gt()||b.target===e&&Wt(e)}),U={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const p=u.querySelector("[data-zoom-out]"),q=u.querySelector("[data-zoom-in]"),g=u.querySelector("[data-zoom-reset]");return p?.addEventListener("click",()=>jn(-.1)),q?.addEventListener("click",()=>jn(.1)),g?.addEventListener("click",()=>xt(1,{markManual:!0})),xt(ie),U}function xt(e,{silent:t=!1,markManual:n=!1}={}){ie=Math.min(Math.max(e,.25),2.2),n&&U&&(U.userAdjustedZoom=!0),Ta(ie),!t&&U?.zoomValue&&(U.zoomValue.textContent=`${Math.round(ie*100)}%`)}function jn(e){xt(ie+e,{markManual:!0})}function Ta(e){if(!U?.previewFrame||!U.previewFrameWrapper)return;const t=U.previewFrame,n=U.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",fn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function fi(){if(!U?.meta||!k)return;const{meta:e}=U;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(k.quoteNumber)}</strong></div>
      <div><span>${S(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(k.quoteDateLabel)}</strong></div>
    </div>
  `}async function vi(){if(!k)return;const e=fn(),t=!e&&ya(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const r=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Jr(),_t("html2pdf ensured");const l=ka({reservation:k.reservation,customer:k.customer,project:k.project,technicians:k.technicians,totals:k.totals,totalsDisplay:k.totalsDisplay,rentalDays:k.rentalDays,currencyLabel:k.currencyLabel,sections:k.sections,fieldSelections:k.fields,quoteNumber:k.quoteNumber,quoteDate:k.quoteDateLabel});s=document.createElement("div"),s.innerHTML=l,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),qa(s),wa(s),Sa(s),_t("export container prepared");const o=s.firstElementChild;if(o){o.setAttribute("dir","rtl"),o.style.direction="rtl",o.style.textAlign="right",o.setAttribute("data-theme","light"),o.classList.remove("dark","dark-mode"),o.style.margin="0",o.style.padding="0",o.style.width="210mm",o.style.maxWidth="210mm",o.style.marginLeft="auto",o.style.marginRight="auto",o.scrollTop=0,o.scrollLeft=0;try{await Ca(o,{context:"export"}),await at(o),bn(o),_t("layout complete for export document")}catch(d){Zt(d,"layoutQuoteDocument",{suppressToast:!0})}}const c=`quotation-${k.quoteNumber}.pdf`;await ci(o,{filename:c,safariWindowRef:a,mobileWindowRef:n}),k.sequenceCommitted||(ai(k.quoteSequence),k.sequenceCommitted=!0)}catch(l){Jt({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,Zt(l,"exportQuoteAsPdf",{toastMessage:r})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function bi(){const e=pi();e?.modal&&(ie=1,U&&(U.userAdjustedZoom=!1),xt(ie,{silent:!0}),Aa(),fi(),hn(),Nr(e.modal))}async function hi({reservation:e,customer:t,project:n}){if(!e){x(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=ii(e),{totalsDisplay:s,totals:r,rentalDays:l}=oi(e,a,n),o=i("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:d}=ni(),u=new Date;k={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:l,currencyLabel:o,sections:new Set(mn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:ga(),fields:ba(),quoteSequence:c,quoteNumber:d,quoteDate:u,quoteDateLabel:si(u),sequenceCommitted:!1},bi()}function gi({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=kt(),{reservations:r=[],customers:l=[],technicians:o=[],projects:c=[]}=Q(),d=Array.isArray(s)?s:o||[],u=new Map((c||[]).map(g=>[String(g.id),g])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const v=t||pr(),f=new Map(l.map(g=>[String(g.id),g])),p=new Map(d.map(g=>[String(g.id),g])),q=hr({reservations:r,filters:v,customersMap:f,techniciansMap:p,projectsMap:u});if(q.length===0){m.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${gr({entries:q,customersMap:f,techniciansMap:p,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(g=>{const b=Number(g.dataset.reservationIndex);Number.isNaN(b)||g.addEventListener("click",()=>{typeof n=="function"&&n(b)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(g=>{const b=Number(g.dataset.reservationIndex);Number.isNaN(b)||g.addEventListener("click",w=>{w.stopPropagation(),typeof a=="function"&&a(b,w)})})}function yi(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:l=[]}=Q(),o=s[e];if(!o)return x(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=r.find(b=>String(b.id)===String(o.customerId)),d=o.projectId?l.find(b=>String(b.id)===String(o.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const b=kt()||[];u.innerHTML=yr(o,c,b,e,d)}const m=document.getElementById("reservationDetailsModal"),v=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},f=document.getElementById("reservation-details-edit-btn");f&&(f.onclick=()=>{v(),typeof t=="function"&&t(e,{reservation:o,customer:c,getEditContext:a})});const p=document.getElementById("reservation-details-delete-btn");p&&(p.onclick=()=>{v(),typeof n=="function"&&n(e,{reservation:o,customer:c})});const q=u?.querySelector('[data-action="open-project"]');q&&d&&q.addEventListener("click",()=>{v();const b=d?.id!=null?String(d.id):"",w=b?`projects.html?project=${encodeURIComponent(b)}`:"projects.html";window.location.href=w});const g=document.getElementById("reservation-details-export-btn");return g&&(g.onclick=async b=>{b?.preventDefault?.(),b?.stopPropagation?.(),g.blur();try{await hi({reservation:o,customer:c,project:d})}catch(w){console.error("❌ [reservations] export to PDF failed",w),x(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function At(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:tt(e,n),end:tt(t,a)}}function De(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","ريال"),s=i("reservations.create.equipment.imageAlt","صورة"),r=i("reservations.equipment.actions.increase","زيادة الكمية"),l=i("reservations.equipment.actions.decrease","تقليل الكمية"),o=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Rn(t);return}const c=Te(e);t.innerHTML=c.map(d=>{const u=d.items[0]||{},m=Le(u)||d.image,v=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=y(String(d.count)),p=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,q=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):p*d.count,g=`${y(p.toFixed(2))} ${a}`,b=`${y(q.toFixed(2))} ${a}`,w=d.barcodes.map(D=>y(String(D||""))).filter(Boolean),A=w.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${w.map(D=>`<li>${D}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${v}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${A}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${l}">−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${g}</td>
          <td>${b}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${o}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Rn(t)}function qi(e){const{index:t,items:n}=Pe(),s=Te(n).find(o=>o.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const l=n.filter((o,c)=>c!==r);Ne(t,l),De(l),me()}function wi(e){const{index:t,items:n}=Pe(),a=n.filter(s=>It(s)!==e);a.length!==n.length&&(Ne(t,a),De(a),me())}function Si(e){const{index:t,items:n}=Pe(),s=Te(n).find(g=>g.key===e);if(!s)return;const{start:r,end:l}=At();if(!r||!l){x(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:o=[]}=Q(),c=t!=null&&o[t]||null,d=c?.id??c?.reservationId??null,u=new Set(n.map(g=>K(g.barcode))),{equipment:m=[]}=Q(),v=(m||[]).find(g=>{const b=K(g?.barcode);return!b||u.has(b)||It({desc:g?.desc||g?.description||g?.name||"",price:Number(g?.price)||0})!==e||!Yn(g)?!1:!we(b,r,l,d)});if(!v){x(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const f=K(v.barcode),p=ze(v);if(!p){x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const q=[...n,{id:p,equipmentId:p,barcode:f,desc:v.desc||v.description||v.name||s.description||"",qty:1,price:Number.isFinite(Number(v.price))?Number(v.price):s.unitPrice,image:Le(v)}];Ne(t,q),De(q),me()}function Rn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){qi(s);return}if(a==="increase-edit-group"&&s){Si(s);return}if(a==="remove-edit-group"&&s){wi(s);return}if(a==="remove-edit-item"){const l=Number(r);Number.isNaN(l)||xi(l)}}),e.dataset.groupListenerAttached="true")}function me(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",me),a.dataset.listenerAttached="true"),_e(a);const s=y(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,l=n?.value||"percent",o=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),d=o?!1:c?.checked||!1,u=a?.value||"unpaid";_e(a,u),d&&ue("edit-res-company-share");let m=nt("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(ue("edit-res-company-share"),m=nt("edit-res-company-share"));const{items:v=[]}=Pe(),{start:f,end:p}=At();e.innerHTML=Bs({items:v,discount:r,discountType:l,applyTax:d,paidStatus:u,start:f,end:p,companySharePercent:m})}function xi(e){if(e==null)return;const{index:t,items:n}=Pe();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Ne(t,a),De(a),me()}function Ei(e){const t=e?.value??"",n=K(t);if(!n)return;const a=Ct(n);if(!a){x(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Se(a);if(s!=="available"){x(Oe(s));return}const r=K(n),{index:l,items:o=[]}=Pe();if(o.findIndex(g=>K(g.barcode)===r)>-1){x(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=At();if(!d||!u){x(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Q(),v=l!=null&&m[l]||null,f=v?.id??v?.reservationId??null;if(we(r,d,u,f)){x(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=ze(a);if(!p){x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const q=[...o,{id:p,equipmentId:p,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Ne(l,q),e&&(e.value=""),De(q),me()}function Et(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=sa(t),a=K(n?.barcode||t);if(!n||!a){x(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Se(n);if(s!=="available"){x(Oe(s));return}const{start:r,end:l}=At();if(!r||!l){x(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:o,items:c=[]}=Pe();if(c.some(q=>K(q.barcode)===a)){x(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Q(),m=o!=null&&u[o]||null,v=m?.id??m?.reservationId??null;if(we(a,r,l,v)){x(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=ze(n);if(!f){x(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const p=[...c,{id:f,equipmentId:f,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ne(o,p),De(p),me(),e.value=""}function $a(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Et(e))});const t=()=>{ra(e.value,"edit-res-equipment-description-options")&&Et(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{me()});function Ii(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Vt(e);return}Et(e)}}function Bi(){He(),$a()}function ki(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let st=null,de=[],en=null,ne={};function Pe(){return{index:st,items:de}}function Ne(e,t){st=typeof e=="number"?e:null,de=Array.isArray(t)?[...t]:[]}function La(){st=null,de=[],Ms()}function Ci(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ye(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ai(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",l=Array.isArray(e)?[...e].sort((c,d)=>String(d.createdAt||d.start||"").localeCompare(String(c.createdAt||c.start||""))):[],o=[`<option value="">${Ye(a)}</option>`];l.forEach(c=>{o.push(`<option value="${Ye(c.id)}">${Ye(c.title||a)}</option>`)}),r&&!l.some(c=>String(c.id)===r)&&o.push(`<option value="${Ye(r)}">${Ye(s)}</option>`),n.innerHTML=o.join(""),r?n.value=r:n.value=""}function Da(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Fn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:l}={}){const{customers:o,projects:c}=Q(),u=Xn()?.[e];if(!u){x(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ne={...ne,reservation:u,projects:c||[]},t?.(),Ai(c||[],u);const m=u.projectId&&c?.find?.(B=>String(B.id)===String(u.projectId))||null,{effectiveConfirmed:v,projectLinked:f}=$e(u,m),p=u.items?u.items.map(B=>({...B,equipmentId:B.equipmentId??B.equipment_id??B.id,barcode:K(B?.barcode)})):[];Ne(e,p);const q=i("reservations.list.unknownCustomer","غير معروف"),g=o?.find?.(B=>String(B.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const b=document.getElementById("edit-res-id");b&&(b.value=u.reservationId||u.id);const w=document.getElementById("edit-res-customer");w&&(w.value=g?.customerName||q);const A=typeof a=="function"?a(u.start):{date:"",time:""},D=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",A.date),n?.("edit-res-start-time",A.time),n?.("edit-res-end",D.date),n?.("edit-res-end-time",D.time);const j=document.getElementById("edit-res-notes");j&&(j.value=u.notes||"");const h=document.getElementById("edit-res-discount");h&&(h.value=y(u.discount??0));const E=document.getElementById("edit-res-discount-type");E&&(E.value=u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,H=document.getElementById("edit-res-tax");H&&(H.checked=T);const P=document.getElementById("edit-res-company-share");if(P){const B=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,$=B!=null?Number.parseFloat(y(String(B).replace("%","").trim())):NaN,R=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,L=R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite($)&&$>0,z=L&&Number.isFinite($)&&$>0?$:re,Y=T||L;P.checked=Y,P.dataset.companyShare=String(z)}const I=document.getElementById("edit-res-confirmed");I&&(I.checked=v,I.disabled=f,I.classList.toggle("disabled",f),I.closest(".form-check")?.classList.toggle("disabled",f));const C=document.getElementById("edit-res-paid");C&&(C.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),js((u.technicians||[]).map(B=>String(B))),s?.(p),Da(),r?.();const M=document.getElementById("editReservationModal");en=Ci(M,l),en?.show?.()}async function Ti({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:l}={}){if(st===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const o=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",v=y(document.getElementById("edit-res-discount")?.value||"0"),f=parseFloat(v)||0,p=document.getElementById("edit-res-discount-type")?.value||"percent",q=document.getElementById("edit-res-confirmed")?.checked||!1,g=document.getElementById("edit-res-paid")?.value||"unpaid",b=document.getElementById("edit-res-project")?.value||"",w=Rs(),A=document.getElementById("edit-res-company-share");let D=null;if(A&&A.checked){const F=A.dataset.companyShare??A.value??re,W=Number.parseFloat(y(String(F).replace("%","").trim()));D=Number.isFinite(W)&&W>0?W:re}const j=Number.isFinite(D)&&D>0;if(!o||!d){x(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const h=typeof e=="function"?e:(F,W)=>`${F}T${W||"00:00"}`,E=h(o,c),T=h(d,u);if(E&&T&&new Date(E)>new Date(T)){x(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const P=Xn()?.[st];if(!P){x(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(de)||de.length===0&&w.length===0){x(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const F of de){const W=Se(F.barcode);if(W!=="available"){x(Oe(W));return}}const I=typeof t=="function"?t:()=>!1;for(const F of de){const W=K(F.barcode);if(I(W,E,T,P.id??P.reservationId)){x(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const C=typeof n=="function"?n:()=>!1;for(const F of w)if(C(F,E,T,P.id??P.reservationId)){x(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const M=document.getElementById("edit-res-tax"),B=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Q().projects||[],$=b&&B.find(F=>String(F.id)===String(b))||null,R={...P,projectId:b?String(b):null,confirmed:q},{effectiveConfirmed:L,projectLinked:z,projectStatus:Y}=$e(R,$),G=z?!1:M?.checked||!1,te=Hn(de,f,p,G,w,{start:E,end:T});let Z=P.status??"pending";z?Z=$?.status??Y??Z:["completed","cancelled"].includes(String(Z).toLowerCase())||(Z=q?"confirmed":"pending");const pe=Un({reservationCode:P.reservationCode??P.reservationId??null,customerId:P.customerId,start:E,end:T,status:Z,title:P.title??null,location:P.location??null,notes:m,projectId:b?String(b):null,totalAmount:te,discount:f,discountType:p,applyTax:G,paidStatus:g,confirmed:L,items:de.map(F=>({...F,equipmentId:F.equipmentId??F.id})),technicians:w,companySharePercent:j?D:null,companyShareEnabled:j});try{const F=await Fs(P.id||P.reservationId,pe);await _s(),x(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),La(),l?.({type:"updated",reservation:F}),s?.(),r?.(),en?.hide?.()}catch(F){console.error("❌ [reservationsEdit] Failed to update reservation",F);const W=Vn(F)?F.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");x(W,"error")}}function ji(e={}){ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ne,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=y(r.value),t?.()}),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-discount-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>t?.()),l.dataset.listenerAttached="true");const o=document.getElementById("edit-res-tax");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{o.checked&&ue("edit-res-company-share"),t?.()}),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-company-share");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{c.checked?c.dataset.companyShare||(c.dataset.companyShare=String(re)):o?.checked&&ue("edit-res-company-share"),t?.()}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Da();const p=document.getElementById("edit-res-confirmed");if(p){const q=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Q().projects||[],g=d.value&&q.find(j=>String(j.id)===String(d.value))||null,w={...ne?.reservation??{},projectId:d.value||null,confirmed:p.checked},{effectiveConfirmed:A,projectLinked:D}=$e(w,g);p.checked=A,p.disabled=D,p.classList.toggle("disabled",D),p.closest(".form-check")?.classList.toggle("disabled",D)}t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("save-reservation-changes");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{Ti(ne).catch(p=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",p)})}),u.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){let p=null;const q=()=>{m.value?.trim()&&(clearTimeout(p),p=null,n?.(m))};m.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),q())});const g=()=>{if(clearTimeout(p),!m.value?.trim())return;const{start:b,end:w}=getEditReservationDateRange();!b||!w||(p=setTimeout(()=>{q()},150))};m.addEventListener("input",g),m.addEventListener("change",q),m.dataset.listenerAttached="true"}const v=document.getElementById("edit-res-equipment-description");v&&!v.dataset.listenerAttached&&(v.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),a?.(v,"edit"))}),v.dataset.listenerAttached="true"),$a?.();const f=document.getElementById("editReservationModal");f&&!f.dataset.cleanupAttached&&(f.addEventListener("hidden.bs.modal",()=>{La(),t?.(),s?.([])}),f.dataset.cleanupAttached="true")}function Ri(){return Hs().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Q()||{};Us(e||[]),ia()})}function gn(e=null){ia(),Pa(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function $i(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function tn(){return{populateEquipmentDescriptionLists:He,setFlatpickrValue:ki,splitDateTime:Mn,renderEditItems:De,updateEditReservationSummary:me,addEquipmentByDescription:Ii,addEquipmentToEditingReservation:Ei,addEquipmentToEditingByDescription:Et,combineDateTime:tt,hasEquipmentConflict:we,hasTechnicianConflict:On,renderReservations:Pa,handleReservationsMutation:gn,ensureModal:$i}}function Pa(e="reservations-list",t=null){gi({containerId:e,filters:t,onShowDetails:Na,onConfirmReservation:ja})}function Na(e){return yi(e,{getEditContext:tn,onEdit:(t,{reservation:n})=>{Ra(t,n)},onDelete:Ba})}function Ba(e){return _n()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?zs(e,{onAfterChange:gn}):!1:(Cs(),!1)}function ja(e){return Os(e,{onAfterChange:gn})}function Ra(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Fn(e,tn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Fn(e,tn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(l){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",l)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}As({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Fi(){typeof window>"u"||(window.showReservationDetails=Na,window.deleteReservation=Ba,window.confirmReservation=ja,window.editReservation=Ra)}export{Pa as a,oa as b,Fi as c,Ni as d,ji as e,Bi as f,ia as g,tn as h,Pi as i,V as j,gn as k,Ri as l,Le as r,Na as s,me as u};
