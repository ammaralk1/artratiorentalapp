import{x as Ms,e as Q,t as i,n as y,j as E,z as zs,f as He,k as ea,o as Hs,u as Os}from"./auth.js";import{I as K,J as fn,n as se,K as Us,L as ot,D as ie,M as ta,N as Vs,O as na,P as xe,a as De,Q as Ve,R as Ee,S as vn,T as Ks,U as Pt,V as Qs,W as aa,w as sa,X as ra,Y as Gs,s as Bt,i as ia,Z as oa,_ as Ws,$ as la,a0 as ca,f as bn,r as Pe,c as da,g as ua,a1 as Xs,a2 as Ys,x as Zs,F as Js,a3 as er,a4 as tr,a5 as nr,a6 as ar,y as sr,A as rr}from"./projectsService.js";Ms({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.taxId":"🧾 الرقم الضريبي","customers.form.labels.document":"📎 مستند العميل","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.taxId":"1234567890","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.form.actions.previewDocument":"عرض الملف","customers.form.document.empty":"لم يتم اختيار ملف بعد","customers.form.document.uploading":"📤 جارٍ رفع الملف...","customers.form.document.uploadFailed":"⚠️ فشل رفع الملف","customers.form.document.selected":"تم إرفاق ملف.","customers.form.document.uploadingWait":"⏳ يرجى الانتظار حتى يكتمل رفع الملف","customers.form.document.uploadSuccess":"✅ تم رفع الملف بنجاح","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.actions.viewDocument":"📎 عرض الملف","customers.documents.missing":"لا يوجد ملف لعرضه","customers.documents.unsupportedPreview":"لا يمكن معاينة هذا النوع من الملفات، يمكنك تحميله بالأسفل.","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","customers.toast.fetchFailed":"تعذر تحميل قائمة العملاء","customers.toast.submitFailed":"حدث خطأ أثناء حفظ بيانات العميل","customers.toast.deleteFailed":"تعذر حذف العميل، يرجى المحاولة مجدداً","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.card.labels.available":"المتاح","equipment.card.labels.availableOfTotal":"من أصل","equipment.card.availability.reservedSingle":"مؤجرة","equipment.card.availability.reserved":"مؤجرة بالكامل","equipment.card.availability.maintenance":"تحت الصيانة","equipment.card.availability.retired":"غير متاحة","equipment.card.availability.unavailable":"غير متاحة حالياً","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.title.details":"📇 تفاصيل بطاقة المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.close":"❌ إغلاق","equipment.modal.actions.edit":"✏️ تعديل","equipment.modal.actions.cancelEdit":"↩️ إلغاء التعديل","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.equipment.table.item":"المعدة","reservations.equipment.table.quantity":"الكمية","reservations.equipment.table.unitPrice":"سعر الوحدة","reservations.equipment.table.total":"الإجمالي","reservations.equipment.table.actions":"الإجراءات","reservations.equipment.actions.increase":"زيادة الكمية","reservations.equipment.actions.decrease":"تقليل الكمية","reservations.equipment.actions.remove":"إزالة البند","reservations.equipment.barcodes.summary":"عرض الباركودات","equipment.modal.variants.title":"📦 القطع المرتبطة","equipment.modal.variants.barcode":"الباركود","equipment.modal.variants.status":"الحالة","equipment.modal.variants.quantity":"الكمية","equipment.modal.variants.actions":"الإجراءات","equipment.modal.variants.empty":"لا توجد قطع مرتبطة أخرى.","equipment.modal.variants.current":"الحالي","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.netProfit":"💵 صافي الربح","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.shareLabel":"نسبة الشركة","reservations.reports.filters.share.all":"الكل","reservations.reports.filters.share.with":"مع نسبة الشركة","reservations.reports.filters.share.without":"بدون نسبة الشركة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"تحديث","reservations.reports.actions.customizeColumns":"تخصيص الأعمدة","reservations.reports.actions.exportPdf":"تصدير PDF","reservations.reports.actions.exportExcel":"تصدير Excel","reservations.reports.actions.exportCsv":"تصدير CSV","reservations.reports.export.filePrefix":"تقرير-الحجوزات","reservations.reports.export.sheetName":"الحجوزات","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"صافي الربح {net} • نسبة الشركة {share} • متوسط الحجز {average}","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.loading":"جارٍ تحميل التقارير...","reservations.reports.status.loadingHint":"قد يستغرق هذا بضع ثوانٍ.","reservations.reports.status.retry":"جرّب إعادة المحاولة أو تحديث الصفحة.","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"حجم الحجوزات الشهري","reservations.reports.chart.volume.hint":"الحجوزات والإيرادات خلال الأشهر الماضية","reservations.reports.chart.volume.series.reservations":"عدد الحجوزات","reservations.reports.chart.volume.series.revenue":"الإيرادات (ر.س)","reservations.reports.chart.volume.series.net":"صافي الربح (ر.س)","reservations.reports.chart.status.title":"توزيع الحالات","reservations.reports.chart.status.hint":"نسبة الحجوزات المؤكدة، قيد التأكيد، والمنتهية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.chart.payment.title":"حالة الدفع","reservations.reports.chart.payment.hint":"مقارنة الحجوزات المدفوعة وغير المدفوعة","reservations.reports.topCustomers.title":"أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.results.headers.share":"نسبة الشركة","reservations.reports.results.headers.net":"صافي الربح","reservations.reports.results.share.none":"بدون نسبة الشركة","reservations.reports.topEquipment.title":"المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.noAdditionalUnits":"⚠️ لا توجد وحدات إضافية متاحة حالياً","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.picker.actions.cancel":"إلغاء","technicians.picker.selectionInfo":"لم يتم اختيار أي عضو بعد","technicians.picker.selectedCount":"تم اختيار {count} عضو","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.taxId":"🧾 Tax Number","customers.form.labels.document":"📎 Client Document","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.taxId":"1234567890","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.form.actions.previewDocument":"Preview document","customers.form.document.empty":"No file chosen yet","customers.form.document.uploading":"📤 Uploading file...","customers.form.document.uploadFailed":"⚠️ File upload failed","customers.form.document.selected":"A document is attached.","customers.form.document.uploadingWait":"⏳ Please wait for the upload to finish","customers.form.document.uploadSuccess":"✅ File uploaded successfully","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.actions.viewDocument":"📎 View Document","customers.documents.missing":"No document available","customers.documents.unsupportedPreview":"Preview not available for this file type. You can download it below.","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","customers.toast.fetchFailed":"Could not load clients list","customers.toast.submitFailed":"An error occurred while saving the client","customers.toast.deleteFailed":"Could not delete the client. Please try again","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.card.labels.available":"Available","equipment.card.labels.availableOfTotal":"of","equipment.card.availability.reservedSingle":"Rented","equipment.card.availability.reserved":"Fully Rented","equipment.card.availability.maintenance":"Under Maintenance","equipment.card.availability.retired":"Unavailable","equipment.card.availability.unavailable":"Currently Unavailable","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.title.details":"📇 Equipment Card Details","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.close":"❌ Close","equipment.modal.actions.edit":"✏️ Edit","equipment.modal.actions.cancelEdit":"↩️ Cancel Edit","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.equipment.table.item":"Equipment","reservations.equipment.table.quantity":"Quantity","reservations.equipment.table.unitPrice":"Unit Price","reservations.equipment.table.total":"Total","reservations.equipment.table.actions":"Actions","reservations.equipment.actions.increase":"Increase quantity","reservations.equipment.actions.decrease":"Decrease quantity","reservations.equipment.actions.remove":"Remove item","reservations.equipment.barcodes.summary":"Show barcodes","equipment.modal.variants.title":"📦 Related Units","equipment.modal.variants.barcode":"Barcode","equipment.modal.variants.status":"Status","equipment.modal.variants.quantity":"Quantity","equipment.modal.variants.actions":"Actions","equipment.modal.variants.empty":"No related units found.","equipment.modal.variants.current":"Current","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.netProfit":"💵 Net profit","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"Performance reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.shareLabel":"Company share","reservations.reports.filters.share.all":"All","reservations.reports.filters.share.with":"With company share","reservations.reports.filters.share.without":"Without company share","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"Refresh","reservations.reports.actions.customizeColumns":"Customize columns","reservations.reports.actions.exportPdf":"Export PDF","reservations.reports.actions.exportExcel":"Export Excel","reservations.reports.actions.exportCsv":"Export CSV","reservations.reports.export.filePrefix":"reservations-report","reservations.reports.export.sheetName":"Reservations","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Net profit {net} • Company share {share} • Average reservation {average}","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.loading":"Loading reports...","reservations.reports.status.loadingHint":"This may take a few seconds.","reservations.reports.status.retry":"Try refreshing or reloading the page.","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"Monthly booking performance","reservations.reports.chart.volume.hint":"Bookings and revenue over the past months.","reservations.reports.chart.volume.series.reservations":"Reservations","reservations.reports.chart.volume.series.revenue":"Revenue (SAR)","reservations.reports.chart.volume.series.net":"Net profit (SAR)","reservations.reports.chart.status.title":"Status distribution","reservations.reports.chart.status.hint":"Share of confirmed, pending, and completed reservations.","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.chart.payment.title":"Payment status","reservations.reports.chart.payment.hint":"Paid vs unpaid reservations at a glance.","reservations.reports.topCustomers.title":"Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"Reservation details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.results.headers.share":"Company share","reservations.reports.results.headers.net":"Net profit","reservations.reports.results.share.none":"No company share","reservations.reports.topEquipment.title":"Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.noAdditionalUnits":"⚠️ No additional units available right now","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.picker.actions.cancel":"Cancel","technicians.picker.selectionInfo":"No crew selected yet","technicians.picker.selectedCount":"Selected {count} member(s)","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});const ir=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),or=new Set(["maintenance","reserved","retired"]);function lr(e){const t=String(e??"").trim().toLowerCase();return t&&ir.get(t)||"available"}function cr(e){return e?typeof e=="object"?e:jt(e):null}function ke(e){const t=cr(e);return t?lr(t.status||t.state||t.statusLabel||t.status_label):"available"}function ma(e){return!or.has(ke(e))}function Be(e={}){return e.image||e.imageUrl||e.img||""}function dr(e){if(!e)return null;const t=K(e),{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}function jt(e){const t=K(e);if(!t)return null;const{equipment:n=[]}=Q();return(n||[]).find(a=>K(a?.barcode)===t)||null}let Yt=null,pa=[],Zt=new Map,Jt=new Map,kt=new Map;function Ct(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function It(e){return y(String(e||"")).trim().toLowerCase()}function ur(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=y(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function fa(e){const t=y(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Ke(e){switch(e){case"maintenance":return i("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return i("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return i("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return i("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function hn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function gn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function va(e,t,{allowPartial:n=!1}={}){const a=se(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((l,o)=>{o.includes(a)&&r.push(l)}),r.length===1?r[0]:null}function en(e,t={}){return va(Zt,e,t)}function tn(e,t={}){return va(Jt,e,t)}function Oe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function ba(e){pa=Array.isArray(e)?[...e]:[]}function yn(){return pa}function qn(e){return e&&yn().find(t=>String(t.id)===String(e))||null}function Rn(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||i("projects.fallback.untitled","مشروع بدون اسم")}function lt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??ie,a=y(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:ie}function me(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??ie,a=y(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=ie),t.dataset.companyShare=String(s),t.checked=!0}function mr(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Mn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function zn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Se({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=hn();if(!n||!a||!s)return;const r=fn()||[],l=i("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),o=i("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",l);const c=new Set;Zt=new Map;const d=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:zn(p)||o})).filter(p=>{if(!p.label)return!1;const f=se(p.label);return!f||c.has(f)?!1:(c.add(f),Zt.set(f,p),!0)}).sort((p,f)=>p.label.localeCompare(f.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(p=>`<option value="${Ct(p.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",v=m?r.find(p=>String(p.id)===m):null;if(v){const p=zn(v)||o;a.value=String(v.id),n.value=p,n.dataset.selectedId=String(v.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function mt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=gn();if(!a||!s||!r)return;const l=Array.isArray(t)?t:yn()||[],o=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",o);const c=[...l].filter(q=>q&&q.id!=null).sort((q,h)=>String(h.createdAt||h.start||"").localeCompare(String(q.createdAt||q.start||""))),d=n?"":a.value,u=i("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Jt=new Map;const v=c.map(q=>{const h=Rn(q)||u;return{id:String(q.id),label:h}}).filter(q=>{if(!q.label)return!1;const h=se(q.label);return!h||m.has(h)?!1:(m.add(h),Jt.set(h,q),!0)});r.innerHTML=v.map(q=>`<option value="${Ct(q.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",f=p?c.find(q=>String(q.id)===p):null;if(f){const q=Rn(f)||u;s.value=String(f.id),a.value=q,a.dataset.selectedId=String(f.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function At(e,t,n){const{date:a,time:s}=ta(n),r=document.getElementById(e),l=document.getElementById(t);if(r){if(a)if(r._flatpickr){const o=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,o)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(l){if(s)if(l._flatpickr){const o=l._flatpickr.config?.dateFormat||"H:i";l._flatpickr.setDate(s,!1,o)}else l.value=s;else l._flatpickr?l._flatpickr.clear():l.value="";l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))}}function ha(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||mt({selectedValue:a});const r=(fn()||[]).find(u=>String(u.id)===String(e.clientId)),l=r?.id!=null?String(r.id):"";Se(l?{selectedValue:l}:{selectedValue:"",resetInput:!0});const o=Mn(e,"start"),c=Mn(e,"end");o&&At("res-start","res-start-time",o),c&&At("res-end","res-end-time",c);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Ue(),V()}function ga({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Q(),s=Array.isArray(a)?a:[];ba(s);const r=t!=null?String(t):n.value?String(n.value):"";mt({selectedValue:r,projectsList:s}),Ue(),V()}function Ue(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function wn(){const{input:e,hidden:t}=gn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?tn(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const l=qn(r.id);l?ha(l,{skipProjectSelectUpdate:!0}):(Ue(),V())}else t.value="",e.dataset.selectedId="",Ue(),V()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?tn(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Sn(){const{input:e,hidden:t}=hn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?en(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),V()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?en(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function pr(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const o=decodeURIComponent(t);n=JSON.parse(o)}catch(o){console.warn("⚠️ [reservations/createForm] Failed to decode project context",o)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(mt({selectedValue:String(n.projectId)}),Ue());const l=qn(n.projectId);if(l?ha(l,{forceNotes:!!n.forceNotes}):V(),n.start&&At("res-start","res-start-time",n.start),n.end&&At("res-end","res-end-time",n.end),n.customerId){const c=(fn()||[]).find(d=>String(d.id)===String(n.customerId));c?.id!=null&&Se({selectedValue:String(c.id)})}else Se({selectedValue:""})}function pt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ot(e,n),end:ot(t,a)}}function ya(e){const t=It(e);if(t){const o=kt.get(t);if(o)return o}const{description:n,barcode:a}=fa(e);if(a){const o=jt(a);if(o)return o}const s=se(n||e);if(!s)return null;let r=oa();if(!r?.length){const o=Q();r=Array.isArray(o?.equipment)?o.equipment:[],r.length&&ca(r)}const l=r.find(o=>se(o?.desc||o?.description||"")===s);return l||r.find(o=>se(o?.desc||o?.description||"").includes(s))||null}function qa(e,t="equipment-description-options"){const n=It(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(c=>It(c.value)===n)||kt.has(n))return!0;const{description:s}=fa(e);if(!s)return!1;const r=se(s);return r?(oa()||[]).some(o=>se(o?.desc||o?.description||"")===r):!1}const fr={available:0,reserved:1,maintenance:2,retired:3};function vr(e){return fr[e]??5}function Hn(e){switch(e){case"available":return i("reservations.equipment.status.available","متاح");case"reserved":return i("reservations.equipment.status.reserved","محجوز");case"maintenance":return i("reservations.equipment.status.maintenance","صيانة");case"retired":return i("reservations.equipment.status.retired","خارج الخدمة");default:return i("reservations.equipment.status.unknown","الحالة غير معروفة")}}function br(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Hn(n)}`;const a=i("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Hn(n)})`}function Qe(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=na(),a=Q(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];ca(r);const l=new Map;r.forEach(d=>{const u=ur(d),m=It(u);if(!m||!u)return;const v=ke(d),p=vr(v),f=l.get(m);if(!f){l.set(m,{normalized:m,value:u,bestItem:d,bestStatus:v,bestPriority:p,statuses:new Set([v])});return}f.statuses.add(v),p<f.bestPriority&&(f.bestItem=d,f.bestStatus=v,f.bestPriority=p,f.value=u)}),kt=new Map;const c=Array.from(l.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{kt.set(d.normalized,d.bestItem);const u=br(d),m=Ct(d.value);if(u===d.value)return`<option value="${m}"></option>`;const v=Ct(u);return`<option value="${m}" label="${v}"></option>`}).join("");e&&(e.innerHTML=c),t&&(t.innerHTML=c)}function Gt(e,t){const n=K(e);if(!n)return!1;const{start:a,end:s}=pt();if(!a||!s)return E(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(xe().some(d=>K(d.barcode)===n))return E(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Ee(n,a,s))return E(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const l=jt(n);if(!l)return E(i("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const o=ke(l);if(o!=="available")return E(Ke(o)),!1;const c=Ve(l);return c?(vn({id:c,equipmentId:c,barcode:n,desc:l.desc,qty:1,price:l.price,image:Be(l)}),t&&(t.value=""),Ce(),V(),E(i("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function nn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ya(t);if(!n){E(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=dr(n.barcode),s=ke(a||n);if(s!=="available"){E(Ke(s));return}const r=K(n.barcode);if(!r){E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const l=Ve(n);if(!l){E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const o={id:l,equipmentId:l,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Be(n)},{start:c,end:d}=pt();if(!c||!d){E(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(xe().some(v=>K(v.barcode)===r)){E(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Ee(r,c,d)){E(i("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}vn(o),Ce(),V(),e.value=""}function hr(){Qe();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),nn(e))});const t=()=>{qa(e.value,"equipment-description-options")&&nn(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ce(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=xe(),a=i("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=i("reservations.create.summary.currency","ريال"),r=i("reservations.create.equipment.imageAlt","صورة"),l=i("reservations.equipment.actions.increase","زيادة الكمية"),o=i("reservations.equipment.actions.decrease","تقليل الكمية"),c=i("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=De(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},v=Be(m)||u.image,p=v?`<img src="${v}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=y(String(u.count)),q=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):q*u.count,b=`${y(q.toFixed(2))} ${s}`,w=`${y(h.toFixed(2))} ${s}`,S=u.barcodes.map(T=>y(String(T||""))).filter(Boolean),C=S.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map(T=>`<li>${T}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${C}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${o}">−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${l}">+</button>
            </div>
          </td>
          <td>${b}</td>
          <td>${w}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function gr(e){const t=xe(),a=De(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ks(s),Ce(),V())}function yr(e){const t=xe(),n=t.filter(a=>Pt(a)!==e);n.length!==t.length&&(la(n),Ce(),V())}function qr(e){const t=xe(),a=De(t).find(m=>m.key===e);if(!a)return;const{start:s,end:r}=pt();if(!s||!r){E(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const l=new Set(t.map(m=>K(m.barcode))),{equipment:o=[]}=Q(),c=(o||[]).find(m=>{const v=K(m?.barcode);return!v||l.has(v)||Pt({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!ma(m)?!1:!Ee(v,s,r)});if(!c){E(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=K(c.barcode),u=Ve(c);if(!u){E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}vn({id:u,equipmentId:u,barcode:d,desc:c.desc||c.description||c.name||a.description||"",qty:1,price:Number.isFinite(Number(c.price))?Number(c.price):a.unitPrice,image:Be(c)}),Ce(),V()}function V(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(y(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,l=document.getElementById("res-payment-status")?.value||"unpaid",{start:o,end:c}=pt();r&&me();const d=lt(),u=document.getElementById("res-payment-status");Oe(u,l),Us({selectedItems:xe(),discount:t,discountType:n,applyTax:r,paidStatus:l,start:o,end:c,companySharePercent:d})}function wr(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=y(r.target.value),V()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",V),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{n.checked&&me(),V()}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.checked?a.dataset.companyShare||(a.dataset.companyShare=String(ie)):n?.checked&&me(),V()}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Oe(s),V()}),s.dataset.listenerAttached="true"),Oe(s)}function Sr(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){V();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),V()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function On(){const{input:e,hidden:t}=hn(),{input:n,hidden:a}=gn(),{customers:s}=Q();let r=t?.value?String(t.value):"";if(!r&&e?.value){const D=en(e.value,{allowPartial:!0});D&&(r=String(D.id),t&&(t.value=r),e.value=D.label,e.dataset.selectedId=r)}const l=s.find(D=>String(D.id)===r);if(!l){E(i("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const o=l.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const D=tn(n.value,{allowPartial:!0});D&&(c=String(D.id),a&&(a.value=c),n.value=D.label,n.dataset.selectedId=c)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",v=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${d}T${m}`,f=`${u}T${v}`,q=new Date(p),h=new Date(f);if(Number.isNaN(q.getTime())||Number.isNaN(h.getTime())||q>=h){E(i("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const b=Qs(),w=xe();if(w.length===0&&b.length===0){E(i("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const S=document.getElementById("res-notes")?.value||"",C=parseFloat(y(document.getElementById("res-discount")?.value))||0,T=document.getElementById("res-discount-type")?.value||"percent",g=document.getElementById("res-payment-status")?.value||"unpaid",k=c?qn(c):null,N=mr(k);if(c&&!k){E(i("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const D of w){const z=ke(D.barcode);if(z!=="available"){E(Ke(z));return}}for(const D of w){const z=K(D.barcode);if(Ee(z,p,f)){E(i("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const D of b)if(aa(D,p,f)){E(i("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const O=document.getElementById("res-tax"),I=!!c?!1:O?.checked||!1,$=sa(w,C,T,I,b,{start:p,end:f});I&&me();let M=lt();I&&(!Number.isFinite(M)||M<=0)&&(me(),M=lt());const j=I||Number.isFinite(M)&&M>0,L=zs(),_=ra({reservationCode:L,customerId:o,start:p,end:f,status:N?"confirmed":"pending",title:null,location:null,notes:S,projectId:c||null,totalAmount:$,discount:C,discountType:T,applyTax:I,paidStatus:g,confirmed:N,items:w.map(D=>({...D,equipmentId:D.equipmentId??D.id})),technicians:b,companySharePercent:j?M:null,companyShareEnabled:j});try{const D=await Gs(_);na(),Qe(),Bt(),xr(),E(i("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Yt=="function"&&Yt({type:"created",reservation:D})}catch(D){console.error("❌ [reservations/createForm] Failed to create reservation",D);const z=ia(D)?D.message:i("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(z,"error")}}function xr(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Se({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),mt({selectedValue:"",resetInput:!0});const l=document.getElementById("equipment-description");l&&(l.value="");const o=document.getElementById("res-payment-status");o&&(o.value="unpaid",Oe(o,"unpaid")),Ws(),la([]),Ce(),Ue(),V()}function Er(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){gr(s);return}if(a==="increase-group"&&s){qr(s);return}if(a==="remove-group"&&s){yr(s);return}}),e.dataset.listenerAttached="true")}function kr(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),Gt(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const a=e.value;if(!a?.trim())return;const{start:s,end:r}=pt();!s||!r||(t=setTimeout(()=>{Gt(a,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>Gt(e.value,e)),e.dataset.listenerAttached="true"}function Cr(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await On()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await On()}),t.dataset.listenerAttached="true")}function eo({onAfterSubmit:e}={}){Yt=typeof e=="function"?e:null;const{customers:t,projects:n}=Q();Vs(t||[]),Se(),Sn(),ba(n||[]),ga({projectsList:n}),wn(),Qe(),hr(),Sr(),wr(),Er(),kr(),Cr(),pr(),V(),Ce()}function wa(){Qe(),ga(),Se(),Sn(),wn(),Ce(),V()}if(typeof document<"u"){const e=()=>{Se(),mt({projectsList:yn()}),Sn(),wn(),V()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function Sa(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ne(t),endDate:Ne(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ne(n),endDate:Ne(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ne(n),endDate:Ne(a)}}return e==="upcoming"?{startDate:Ne(t),endDate:""}:{startDate:"",endDate:""}}function Ir(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=y(t?.value||"").trim(),l=y(n?.value||"").trim(),o=a?.value||"";if(new Set(["","today","week","month"]).has(o)||(o="",a&&(a.value=""),Tt(t),Tt(n),r="",l=""),!r&&!l&&o){const d=Sa(o);r=d.startDate,l=d.endDate}return{searchTerm:se(e?.value||""),startDate:r,endDate:l,status:s?.value||"",quickRange:o}}function to(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=y(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Ar(r.value),t()}),r.dataset.listenerAttached="true");const l=document.getElementById("reservation-status-filter");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",t),l.dataset.listenerAttached="true");const o=document.getElementById("clear-filters");o&&!o.dataset.listenerAttached&&(o.addEventListener("click",()=>{n&&(n.value=""),Tt(a),Tt(s),r&&(r.value=""),l&&(l.value=""),t()}),o.dataset.listenerAttached="true")}function Ar(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Sa(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ne(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Tt(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function yt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Tr(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function $r(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Tr(n);if(a!==null)return a}return null}function Un(e,t=0){const n=$r(e);if(n!=null)return n;const a=yt(e.createdAt??e.created_at);if(a!=null)return a;const s=yt(e.updatedAt??e.updated_at);if(s!=null)return s;const r=yt(e.start);if(r!=null)return r;const l=yt(e.end);if(l!=null)return l;const o=Number(e.id??e.reservationId);return Number.isFinite(o)?o:Number.isFinite(t)?t:0}function Nr({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((b,w)=>({reservation:b,index:w})),l=t.searchTerm||"",o=t.searchReservationId||"",c=t.searchCustomerName||"",d=t.startDate||"",u=t.endDate||"",m=t.status||"",v=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,f=d?new Date(`${d}T00:00:00`):null,q=u?new Date(`${u}T23:59:59`):null,h=r.filter(({reservation:b})=>{const w=n.get(String(b.customerId)),S=s?.get?.(String(b.projectId)),C=b.start?new Date(b.start):null,T=bn(b),{effectiveConfirmed:g}=Pe(b,S);if(v!=null&&String(b.customerId)!==String(v)||p!=null&&!(Array.isArray(b.technicians)?b.technicians.map(I=>String(I)):[]).includes(String(p))||m==="confirmed"&&!g||m==="pending"&&g||m==="completed"&&!T||f&&C&&C<f||q&&C&&C>q||o&&!se([b.reservationId,b.id].filter(Boolean).map(String).join(" ")).includes(o)||c&&!se(w?.customerName||"").includes(c))return!1;if(!l)return!0;const k=b.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",N=(b.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return se([b.reservationId,w?.customerName,b.notes,k,N,S?.title].filter(Boolean).join(" ")).includes(l)});return h.sort((b,w)=>{const S=Un(b.reservation,b.index),C=Un(w.reservation,w.index);return S!==C?C-S:w.index-b.index}),h}function Lr({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=i("reservations.create.summary.currency","ريال"),r=i("reservations.list.taxIncludedShort","(شامل الضريبة)"),l=i("reservations.list.unknownCustomer","غير معروف"),o=i("reservations.list.noNotes","لا توجد ملاحظات"),c=i("reservations.list.itemsCountShort","{count} عنصر"),d=i("reservations.list.crew.separator","، "),u=i("reservations.list.status.confirmed","✅ مؤكد"),m=i("reservations.list.status.pending","⏳ غير مؤكد"),v=i("reservations.list.payment.paid","💳 مدفوع"),p=i("reservations.list.payment.unpaid","💳 غير مدفوع"),f=i("reservations.list.actions.confirm","✔️ تأكيد"),q=i("reservations.list.project.unlinked","غير مرتبط بمشروع"),h=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),b={client:i("reservations.list.labels.client","👤 العميل"),project:i("reservations.list.labels.project","📁 المشروع"),start:i("reservations.list.labels.start","🗓️ بداية الحجز"),end:i("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:i("reservations.list.labels.cost","💵 التكلفة"),equipment:i("reservations.list.labels.equipment","📦 المعدات"),crew:i("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:w,index:S})=>{const C=t.get(String(w.customerId)),T=w.projectId?a?.get?.(String(w.projectId)):null,g=bn(w),k=w.paid===!0||w.paid==="paid",{effectiveConfirmed:N,projectLinked:O}=Pe(w,T),P=N?"status-confirmed":"status-pending",I=k?"status-paid":"status-unpaid";let $=`<span class="reservation-chip status-chip ${P}">${N?u:m}</span>`,M=`<span class="reservation-chip status-chip ${I}">${k?v:p}</span>`,j=k?" tile-paid":" tile-unpaid";g&&(j+=" tile-completed");let L="";g&&($=`<span class="reservation-chip status-chip status-completed">${u}</span>`,M=`<span class="reservation-chip status-chip status-completed">${k?v:p}</span>`,L=` data-completed-label="${i("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const _=!O&&!N?`<button class="tile-confirm" data-reservation-index="${S}" data-action="confirm">${f}</button>`:"",D=_?`<div class="tile-actions">${_}</div>`:"",z=w.items?.length||0,Y=(w.technicians||[]).map(le=>n.get(String(le))).filter(Boolean),G=Y.map(le=>le.name).join(d)||"—",te=y(String(w.reservationId??"")),Z=w.start?y(He(w.start)):"-",fe=w.end?y(He(w.end)):"-",F=y(String(w.cost??0)),W=y(String(z)),Ge=w.notes?y(w.notes):o,ve=c.replace("{count}",W),We=w.applyTax?`<small>${r}</small>`:"";let Ie=q;return w.projectId&&(Ie=T?.title?y(T.title):h),`
      <div class="${_?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${j}"${L} data-reservation-index="${S}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${te}</div>
          <div class="tile-badges">
            ${$}
            ${M}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${b.client}</span>
            <span class="tile-value">${C?.customerName||l}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.project}</span>
            <span class="tile-value">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.start}</span>
            <span class="tile-value tile-inline">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.end}</span>
            <span class="tile-value tile-inline">${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.cost}</span>
            <span class="tile-value">${F} ${s} ${We}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.equipment}</span>
            <span class="tile-value">${ve}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${b.crew}</span>
            <span class="tile-value">${Y.length?G:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ge}</span>
          </div>
        </div>
        ${D}
      </div>
    `}).join("")}function qt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Dr(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:l}=Pe(e,s),o=e.paid===!0||e.paid==="paid",c=bn(e),d=e.items||[],u=De(d),{technicians:m=[]}=Q(),v=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),p=new Map;v.forEach(B=>{if(!B||B.id==null)return;const H=String(B.id),ee=p.get(H)||{};p.set(H,{...ee,...B})});const f=(e.technicians||[]).map(B=>p.get(String(B))).filter(Boolean),q=ea(),h=da(e.start,e.end),b=(B={})=>{const H=[B.dailyWage,B.daily_rate,B.dailyRate,B.wage,B.rate];for(const ee of H){if(ee==null)continue;const Me=parseFloat(y(String(ee)));if(Number.isFinite(Me))return Me}return 0},S=d.reduce((B,H)=>B+(H.qty||1)*(H.price||0),0)*h,T=f.reduce((B,H)=>B+b(H),0)*h,g=S+T,k=parseFloat(e.discount)||0,N=e.discountType==="amount"?k:g*(k/100),O=Math.max(0,g-N),P=r?!1:e.applyTax,I=P?O*.15:0,$=Number(e.cost),M=Number.isFinite($),j=O+I,L=r?Math.round(j):M?$:Math.round(j),_=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,D=_!=null?parseFloat(y(String(_))):NaN;let G=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(D)&&D>0)&&Number.isFinite(D)?D:0,te=G>0?Math.max(0,(Number.isFinite(L)?L:0)*(G/100)):0;P&&G<=0&&(G=ie,te=Math.max(0,(Number.isFinite(L)?L:0)*(G/100)));const Z=y(String(e.reservationId??e.id??"")),fe=e.start?y(He(e.start)):"-",F=e.end?y(He(e.end)):"-",W=y(String(f.length)),Ge=y(S.toFixed(2)),ve=y(N.toFixed(2)),We=y(O.toFixed(2)),Ie=y(I.toFixed(2)),Ae=y((L??0).toFixed(2)),le=y(String(h)),J=i("reservations.create.summary.currency","ريال"),Ln=i("reservations.details.labels.discount","الخصم"),Ft=i("reservations.details.labels.tax","الضريبة (15%)"),ft=i("reservations.details.labels.crewTotal","إجمالي الفريق"),Re=i("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),vt=i("reservations.details.labels.duration","عدد الأيام"),Rt=i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Mt=i("reservations.details.labels.netProfit","💵 صافي الربح"),bt=i("reservations.create.equipment.imageAlt","صورة"),be={item:i("reservations.equipment.table.item","المعدة"),quantity:i("reservations.equipment.table.quantity","الكمية"),unitPrice:i("reservations.equipment.table.unitPrice","سعر الوحدة"),total:i("reservations.equipment.table.total","الإجمالي"),actions:i("reservations.equipment.table.actions","الإجراءات")},he=i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),zt=i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Ht=i("reservations.details.technicians.roleUnknown","غير محدد"),Te=i("reservations.details.technicians.phoneUnknown","غير متوفر"),Xe=i("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Ye=i("reservations.list.status.confirmed","✅ مؤكد"),Ot=i("reservations.list.status.pending","⏳ غير مؤكد"),Ut=i("reservations.list.payment.paid","💳 مدفوع"),Vt=i("reservations.list.payment.unpaid","💳 غير مدفوع"),R=i("reservations.list.status.completed","📁 منتهي"),X=i("reservations.details.labels.id","🆔 رقم الحجز"),ce=i("reservations.details.section.bookingInfo","بيانات الحجز"),Ja=i("reservations.details.section.paymentSummary","ملخص الدفع"),es=i("reservations.details.labels.finalTotal","المجموع النهائي"),ts=i("reservations.details.section.crew","😎 الفريق الفني"),ns=i("reservations.details.crew.count","{count} عضو"),as=i("reservations.details.section.items","📦 المعدات المرتبطة"),ss=i("reservations.details.items.count","{count} عنصر"),rs=i("reservations.details.actions.edit","✏️ تعديل"),is=i("reservations.details.actions.delete","🗑️ حذف"),os=i("reservations.details.labels.customer","العميل"),ls=i("reservations.details.labels.contact","رقم التواصل"),cs=i("reservations.details.labels.project","📁 المشروع المرتبط");i("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ds=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),us=i("reservations.details.actions.openProject","📁 فتح المشروع"),ms=i("reservations.details.labels.start","بداية الحجز"),ps=i("reservations.details.labels.end","نهاية الحجز"),fs=i("reservations.details.labels.notes","ملاحظات"),vs=i("reservations.list.noNotes","لا توجد ملاحظات"),bs=i("reservations.details.labels.itemsCount","عدد المعدات"),hs=i("reservations.details.labels.itemsTotal","إجمالي المعدات"),gs=i("reservations.details.labels.paymentStatus","حالة الدفع"),ys=i("reservations.list.unknownCustomer","غير معروف"),Dn=o?Ut:Vt,qs=u.reduce((B,H)=>B+(Number(H.quantity)||0),0),ws=y(String(qs)),Pn=ss.replace("{count}",ws),Ss=ns.replace("{count}",W),xs=e.notes?y(e.notes):vs,Es=y(T.toFixed(2)),ks=y(String(G)),Cs=y(te.toFixed(2)),Is=`${ks}% (${Cs} ${J})`,Bn=Math.max(0,(L??0)-I-te),As=y(Bn.toFixed(2)),ge=[{icon:"💳",label:gs,value:Dn},{icon:"📦",label:bs,value:Pn},{icon:"⏱️",label:vt,value:le},{icon:"💼",label:hs,value:`${Ge} ${J}`}];ge.push({icon:"😎",label:ft,value:`${Es} ${J}`}),N>0&&ge.push({icon:"💸",label:Ln,value:`${ve} ${J}`}),ge.push({icon:"📊",label:Re,value:`${We} ${J}`}),P&&I>0&&ge.push({icon:"🧾",label:Ft,value:`${Ie} ${J}`}),G>0&&ge.push({icon:"🏦",label:Rt,value:Is}),Math.abs(Bn-(L??0))>.009&&ge.push({icon:"💵",label:Mt,value:`${As} ${J}`}),ge.push({icon:"💰",label:es,value:`${Ae} ${J}`});const Ts=ge.map(({icon:B,label:H,value:ee})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${B} ${H}</span>
      <span class="summary-details-value">${ee}</span>
    </div>
  `).join(""),jn=[{text:l?Ye:Ot,className:l?"status-confirmed":"status-pending"},{text:Dn,className:o?"status-paid":"status-unpaid"}];c&&jn.push({text:R,className:"status-completed"});const $s=jn.map(({text:B,className:H})=>`<span class="status-chip ${H}">${B}</span>`).join(""),Ze=(B,H,ee)=>`
    <div class="res-info-row">
      <span class="label">${B} ${H}</span>
      <span class="value">${ee}</span>
    </div>
  `;let Kt="";if(e.projectId){let B=qt(ds);if(s){const H=s.title||i("projects.fallback.untitled","مشروع بدون اسم");B=`${qt(H)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${qt(us)}</button>`}Kt=`
      <div class="res-info-row">
        <span class="label">📁 ${cs}</span>
        <span class="value">${B}</span>
      </div>
    `}const $e=[];$e.push(Ze("👤",os,t?.customerName||ys)),$e.push(Ze("📞",ls,t?.phone||"—")),$e.push(Ze("🗓️",ms,fe)),$e.push(Ze("🗓️",ps,F)),$e.push(Ze("📝",fs,xs)),Kt&&$e.push(Kt);const Ns=$e.join(""),Ls=u.length?u.map(B=>{const H=B.items[0]||{},ee=Be(H)||B.image,Me=ee?`<img src="${ee}" alt="${bt}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',ht=Number(B.quantity)||Number(B.count)||0,gt=y(String(ht)),_n=Number.isFinite(Number(B.unitPrice))?Number(B.unitPrice):0,js=Number.isFinite(Number(B.totalPrice))?Number(B.totalPrice):_n*ht,_s=`${y(_n.toFixed(2))} ${J}`,Fs=`${y(js.toFixed(2))} ${J}`,Fn=B.barcodes.map(Qt=>y(String(Qt||""))).filter(Boolean),Rs=Fn.length?`<details class="reservation-item-barcodes">
              <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Fn.map(Qt=>`<li>${Qt}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${Me}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${qt(H.desc||H.description||H.name||B.description||"-")}</div>
                  ${Rs}
                </div>
              </div>
            </td>
            <td>
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${gt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td>${_s}</td>
            <td>${Fs}</td>
            <td>
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${he}</td></tr>`,Ds=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${be.item}</th>
            <th>${be.quantity}</th>
            <th>${be.unitPrice}</th>
            <th>${be.total}</th>
            <th>${be.actions}</th>
          </tr>
        </thead>
        <tbody>${Ls}</tbody>
      </table>
    </div>
  `,Ps=f.map((B,H)=>{const ee=y(String(H+1)),Me=B.role||Ht,ht=B.phone||Te,gt=B.wage?Xe.replace("{amount}",y(String(B.wage))).replace("{currency}",J):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ee}</span>
          <span class="technician-name">${B.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Me}</div>
          <div>📞 ${ht}</div>
          ${gt?`<div>💰 ${gt}</div>`:""}
        </div>
      </div>
    `}).join(""),Bs=f.length?`<div class="reservation-technicians-grid">${Ps}</div>`:`<ul class="reservation-modal-technicians"><li>${zt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${X}</span>
          <strong>${Z}</strong>
        </div>
        <div class="status-chips">
          ${$s}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${ce}</h6>
          ${Ns}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${Ja}</h6>
            <div class="summary-details">
              ${Ts}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${ts}</span>
          <span class="count">${Ss}</span>
        </div>
        ${Bs}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${as}</span>
          <span class="count">${Pn}</span>
        </div>
        ${Ds}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${i("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${rs}</button>
        ${q?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${is}</button>`:""}
      </div>
    </div>
  `}const Pr=`@page {
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
`,xa="reservations.quote.sequence",de={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Br=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],xn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ea=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(y(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>x(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>x(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>x(y(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>x(y(Number(e?.price||0).toFixed(2)))}],ka=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(y(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>x(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>x(e?.role||i("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>x(e?.phone||i("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ca={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Ea.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ka.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},jr="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",_r="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Fr="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Rr=Pr.trim(),Mr=/color\([^)]*\)/gi,$t=/(color\(|color-mix\()/i,zr=document.createElement("canvas"),wt=zr.getContext("2d"),Ia=/^data:image\/svg\+xml/i,Hr=/\.svg($|[?#])/i,nt=512,an="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Aa=96,Ta=25.4,sn=210,xt=297,at=Math.round(sn/Ta*Aa),st=Math.round(xt/Ta*Aa),Or=2,$a=/safari/i,Ur=/(iphone|ipad|ipod)/i,Vr=/(iphone|ipad|ipod)/i,Kr=/(crios|fxios|edgios|opios)/i,Nt="[reservations/pdf]";let U=null,A=null,oe=1,Je=null,et=null,ye=null,ze=null;function rn(){return!!window?.bootstrap?.Modal}function Qr(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ye||(ye=document.createElement("div"),ye.className="modal-backdrop fade show",ye.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ye)),ze||(ze=t=>{t.key==="Escape"&&on(e)},document.addEventListener("keydown",ze));try{e.focus({preventScroll:!0})}catch{}}}function on(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ye&&(ye.remove(),ye=null),ze&&(document.removeEventListener("keydown",ze),ze=null))}function Gr(e){if(e){if(rn()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Qr(e)}}function Na(){const e={};return Object.entries(Ca).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function Wr(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Xr(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function La(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Da(){return Object.fromEntries(xn.map(({id:e})=>[e,!1]))}function En(e,t){return e.sectionExpansions||(e.sectionExpansions=Da()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Yr(e,t){return En(e,t)?.[t]!==!1}function kn(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Zr(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ur.test(e)}function Jr(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=$a.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Pa(){return Zr()&&Jr()}function ei(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return Vr.test(e)&&$a.test(e)&&!Kr.test(e)}function Wt(e,...t){try{console.log(`${Nt} ${e}`,...t)}catch{}}function ln(e,...t){try{console.warn(`${Nt} ${e}`,...t)}catch{}}function ti(e,t,...n){try{t?console.error(`${Nt} ${e}`,t,...n):console.error(`${Nt} ${e}`,...n)}catch{}}function re(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function ni(e,t="لا توجد بيانات للعرض."){const n=x(i(e,t));return re(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Vn(e,t){return Array.isArray(e)&&e.length?e:[ni(t)]}function cn(e,t="#000"){if(!wt||!e)return t;try{return wt.fillStyle="#000",wt.fillStyle=e,wt.fillStyle||t}catch{return t}}function ai(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=cn(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Ba(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Mr,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const si=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function ja(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;si.forEach(l=>{const o=s[l];if(o&&$t.test(o)){const c=l.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=l==="backgroundColor"?"#ffffff":s.color||"#000000",u=cn(o,d);a.style.setProperty(c,u,"important")}});const r=s.backgroundImage;if(r&&$t.test(r)){const l=cn(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",l,"important")}})}function _a(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const l=a[r];if(l&&$t.test(l)){const o=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),c=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(o,c,"important")}});const s=a.backgroundImage;s&&$t.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function Kn(e,t=nt){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function ri(e){if(!e)return{width:nt,height:nt};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Kn(t,0):0,s=n?Kn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const l=r.trim().split(/[\s,]+/).map(o=>parseFloat(o||"0"));if(l.length>=4){const[,,o,c]=l;a=a||(Number.isFinite(o)&&o>0?o:0),s=s||(Number.isFinite(c)&&c>0?c:0)}}return{width:a||nt,height:s||nt}}function Fa(e=""){return typeof e!="string"?!1:Ia.test(e)||Hr.test(e)}function ii(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function oi(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const l=r?.message||`Unable to load image from ${e}`;a(new Error(l))},s.src=e})}async function Ra(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await oi(s),l=n.createElement("canvas"),o=Math.max(t.width||r.naturalWidth||r.width||0,1),c=Math.max(t.height||r.naturalHeight||r.height||o,1);l.width=o,l.height=c;const d=l.getContext("2d");return d.clearRect(0,0,o,c),d.drawImage(r,0,0,o,c),l.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function li(e){if(!e)return null;if(Ia.test(e))return ii(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function ci(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Fa(t))return!1;const n=await li(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",an),!1;const a=await Ra(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",an),!1)}async function di(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=ri(e),s=await Ra(n,a),l=(e.ownerDocument||document).createElement("img");l.setAttribute("src",s||an),l.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),l.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&l.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&l.setAttribute("style",e.getAttribute("style"));const o=e.getAttribute("width"),c=e.getAttribute("height");return o&&l.setAttribute("width",o),c&&l.setAttribute("height",c),e.parentNode?.replaceChild(l,e),!!s}async function Ma(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Fa(s.getAttribute?.("src"))&&a.push(ci(s))}),n.forEach(s=>{a.push(di(s))}),a.length&&await Promise.allSettled(a)}function dn(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){ti(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=n||i("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(E(r),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function un({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){ln("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){ln("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Cn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Qn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Gn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function ui(){const e=Gn();return e||(et||(et=Cn(_r).catch(t=>{throw et=null,t}).then(()=>{const t=Gn();if(!t)throw et=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),et)}async function mi(){const e=Qn();return e||(Je||(Je=Cn(Fr).catch(t=>{throw Je=null,t}).then(()=>{const t=Qn();if(!t)throw Je=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Je)}async function pi(){if(window.html2pdf||await Cn(jr),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}ai()}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function fi(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function vi(){const e=window.localStorage?.getItem?.(xa),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function bi(){const t=vi()+1;return{sequence:t,quoteNumber:fi(t)}}function hi(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(xa,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function gi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function yi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(y(String(n)));if(Number.isFinite(a))return a}return 0}function qi(e){const t=Bt()||[],{technicians:n=[]}=Q(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const l=String(r.id),o=s.get(l)||{};s.set(l,{...o,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function wi(e,t,n){const{projectLinked:a}=Pe(e,n),s=da(e.start,e.end),o=(Array.isArray(e.items)?e.items:[]).reduce((M,j)=>M+(Number(j?.qty)||1)*(Number(j?.price)||0),0)*s,d=t.reduce((M,j)=>M+yi(j),0)*s,u=o+d,m=parseFloat(e.discount)||0,v=e.discountType==="amount"?m:u*(m/100),p=Math.max(0,u-v),f=a?!1:e.applyTax,q=f?p*.15:0,h=Number(e.cost),b=Number.isFinite(h),w=p+q,S=a?Math.round(w):b?h:Math.round(w),C=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,T=C!=null?parseFloat(y(String(C).replace("%","").trim())):NaN,g=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let N=(g!=null?g===!0||g===1||g==="1"||String(g).toLowerCase()==="true":Number.isFinite(T)&&T>0)&&Number.isFinite(T)?Number(T):0;f&&N<=0&&(N=ie);const O=N>0?Math.max(0,(S??0)*(N/100)):0,P=Math.max(0,(S??0)-q-O),I={equipmentTotal:o,crewTotal:d,discountAmount:v,taxAmount:q,finalTotal:S??0,companySharePercent:N,companyShareAmount:O,netProfit:P},$={equipmentTotal:y(o.toFixed(2)),crewTotal:y(d.toFixed(2)),discountAmount:y(v.toFixed(2)),taxAmount:y(q.toFixed(2)),finalTotal:y((S??0).toFixed(2)),companySharePercent:y(N.toFixed(2)),companyShareAmount:y(O.toFixed(2)),netProfit:y(P.toFixed(2))};return{totals:I,totalsDisplay:$,rentalDays:s}}function za({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:r,rentalDays:l,currencyLabel:o,sections:c,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:v=0,companyShareAmount:p=0,netProfit:f=0}=s||{},q=y(String(e?.reservationId??e?.id??"")),h=e.start?y(He(e.start)):"-",b=e.end?y(He(e.end)):"-",w=t?.customerName||t?.full_name||t?.name||"-",S=t?.phone||"-",C=t?.email||"-",T=t?.company||t?.company_name||"-",g=y(S),k=n?.title||n?.name||i("reservations.details.project.none","غير مرتبط بمشروع"),N=n?.code||n?.projectCode||"",O=y(String(l)),P=e?.notes||"",I=Wr(d),$=(R,X)=>La(I,R,X),M=R=>c?.has?.(R),j=`<div class="quote-placeholder">${x(i("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,L=(R,X)=>`<div class="info-plain__item">${x(R)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${x(X)}</strong></div>`,_=(R,X,{variant:ce="inline"}={})=>ce==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(R)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(X)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(R)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(X)}</span>
    </span>`,D=(R,X)=>`<div class="payment-row">
      <span class="payment-row__label">${x(R)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(X)}</span>
    </div>`,z=[];$("customerInfo","customerName")&&z.push(L(i("reservations.details.labels.customer","العميل"),w)),$("customerInfo","customerCompany")&&z.push(L(i("reservations.details.labels.company","الشركة"),T)),$("customerInfo","customerPhone")&&z.push(L(i("reservations.details.labels.phone","الهاتف"),g)),$("customerInfo","customerEmail")&&z.push(L(i("reservations.details.labels.email","البريد"),C));const Y=M("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(i("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:j}
      </section>`:"",G=[];$("reservationInfo","reservationId")&&G.push(L(i("reservations.details.labels.reservationId","رقم الحجز"),q||"-")),$("reservationInfo","reservationStart")&&G.push(L(i("reservations.details.labels.start","بداية الحجز"),h)),$("reservationInfo","reservationEnd")&&G.push(L(i("reservations.details.labels.end","نهاية الحجز"),b)),$("reservationInfo","reservationDuration")&&G.push(L(i("reservations.details.labels.duration","عدد الأيام"),O));const te=M("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${x(i("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${G.length?`<div class="info-plain">${G.join("")}</div>`:j}
      </section>`:"",Z=[];$("projectInfo","projectTitle")&&Z.push(L(i("reservations.details.labels.project","المشروع"),k)),$("projectInfo","projectCode")&&Z.push(L(i("reservations.details.labels.code","الرمز"),N||"-"));const fe=M("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${x(i("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Z.length?`<div class="info-plain">${Z.join("")}</div>`:j}
      </section>`:"",F=[];if($("financialSummary","equipmentTotal")&&F.push(_(i("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${o}`)),$("financialSummary","crewTotal")&&F.push(_(i("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${o}`)),$("financialSummary","discountAmount")&&F.push(_(i("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${o}`)),$("financialSummary","taxAmount")&&F.push(_(i("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${o}`)),v>0&&$("financialSummary","companyShare")){const R=r.companySharePercent??y(v.toFixed(2)),X=r.companyShareAmount??y(p.toFixed(2)),ce=`${R}% (${X} ${o})`;F.push(_(i("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ce))}const W=$("financialSummary","finalTotal"),Ge=$("financialSummary","netProfit")&&Number.isFinite(f)&&Math.abs((f??0)-(s?.finalTotal??0))>.009,ve=[];W&&ve.push(_(i("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${o}`,{variant:"final"})),Ge&&ve.push(_(i("reservations.details.labels.netProfit","💵 صافي الربح"),`${r.netProfit} ${o}`,{variant:"final"}));const We=ve.length?`<div class="totals-final">${ve.join("")}</div>`:"",Ie=M("financialSummary")?!F.length&&!W?`<section class="quote-section quote-section--financial">${j}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(i("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${F.length?`<div class="totals-inline">${F.join("")}</div>`:""}
            ${We}
          </div>
        </section>`:"",Ae=Ea.filter(R=>$("items",R.id)),le=Ae.length>0,J=le?Ae.map(R=>`<th>${x(R.labelKey?i(R.labelKey,R.fallback):R.fallback)}</th>`).join(""):"",Ft=Array.isArray(e.items)&&e.items.length>0?e.items.map((R,X)=>`<tr>${Ae.map(ce=>`<td>${ce.render(R,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ae.length,1)}" class="empty">${x(i("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ft=M("items")?le?`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${J}</tr>
              </thead>
              <tbody>${Ft}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.items.title","المعدات"))}</h3>
            ${j}
          </section>`:"",Re=ka.filter(R=>$("crew",R.id)),vt=Re.length>0,Rt=vt?Re.map(R=>`<th>${x(R.labelKey?i(R.labelKey,R.fallback):R.fallback)}</th>`).join(""):"",Mt=a.length?a.map((R,X)=>`<tr>${Re.map(ce=>`<td>${ce.render(R,X)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Re.length,1)}" class="empty">${x(i("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,bt=M("crew")?vt?`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Rt}</tr>
              </thead>
              <tbody>${Mt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(i("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${j}
          </section>`:"",be=M("notes")?`<section class="quote-section">
        <h3>${x(i("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${x(P||i("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",he=[];$("payment","beneficiary")&&he.push(D(i("reservations.quote.labels.beneficiary","اسم المستفيد"),de.beneficiaryName)),$("payment","bank")&&he.push(D(i("reservations.quote.labels.bank","اسم البنك"),de.bankName)),$("payment","account")&&he.push(D(i("reservations.quote.labels.account","رقم الحساب"),y(de.accountNumber))),$("payment","iban")&&he.push(D(i("reservations.quote.labels.iban","رقم الآيبان"),y(de.iban)));const zt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(i("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${he.length?he.join(""):j}</div>
      </div>
      <p class="quote-approval-note">${x(de.approvalNote)}</p>
    </section>`,Ht=`<footer class="quote-footer">
        <h4>${x(i("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Br.map(R=>`<li>${x(R)}</li>`).join("")}</ul>
      </footer>`,Te=[];Y&&te?Te.push(re(`<div class="quote-section-row">${Y}${te}</div>`,{blockType:"group"})):(te&&Te.push(re(te)),Y&&Te.push(re(Y))),fe&&Te.push(re(fe));const Xe=[];ft&&Xe.push(re(ft,{blockType:"table",extraAttributes:'data-table-id="items"'})),bt&&Xe.push(re(bt,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ye=[];Ie&&Ye.push(re(Ie,{blockType:"summary"})),be&&Ye.push(re(be));const Ot=[re(zt,{blockType:"payment"}),re(Ht,{blockType:"footer"})],Ut=[...Vn(Te,"reservations.quote.placeholder.page1"),...Xe,...Vn(Ye,"reservations.quote.placeholder.page2"),...Ot],Vt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(de.logoUrl)}" alt="${x(de.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(i("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${x(de.companyName)}</p>
        <p class="quote-company-cr">${x(i("reservations.quote.labels.cr","السجل التجاري"))}: ${x(de.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${x(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${x(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Rr}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Vt}
          ${Ut.join("")}
        </div>
      </div>
    </div>
  `}function Si(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function ct(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(o=>Si(o)),l=[s,...r].map(o=>o.catch(c=>(ln("asset load failed",c),null)));await Promise.all(l),await new Promise(o=>n.requestAnimationFrame(()=>o()))}async function Ha(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),l=r?.querySelector("[data-quote-header-template]");if(!s||!r||!l)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ma(r),await ct(r),s.innerHTML="";const o=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let c=null,d=null;const u=g=>{g.style.margin="0 auto",g.style.breakInside="avoid",g.style.pageBreakInside="avoid",g.style.pageBreakAfter="auto",g.style.breakAfter="auto"},m=()=>{const g=a.createElement("div"),k=s.childElementCount===0;if(g.className="quote-page",g.dataset.pageIndex=String(s.childElementCount),k){g.classList.add("quote-page--primary");const O=l.cloneNode(!0);O.removeAttribute("data-quote-header-template"),g.appendChild(O)}else g.classList.add("quote-page--continuation");const N=a.createElement("main");N.className="quote-body",g.appendChild(N),s.appendChild(g),u(g),c=g,d=N},v=()=>{(!c||!d||!d.isConnected)&&m()},p=()=>{if(!c||!d||d.childElementCount>0)return;const g=c;c=null,d=null,g.parentNode&&g.parentNode.removeChild(g)},f=()=>{c=null,d=null},q=()=>c?c.scrollHeight-c.clientHeight>Or:!1,h=(g,{allowOverflow:k=!1}={})=>(v(),d.appendChild(g),q()&&!k?(d.removeChild(g),p(),!1):!0),b=g=>{const k=g.cloneNode(!0);k.removeAttribute?.("data-quote-block"),k.removeAttribute?.("data-block-type"),k.removeAttribute?.("data-table-id"),!h(k)&&(f(),!h(k)&&h(k,{allowOverflow:!0}))},w=g=>{const k=g.querySelector("table");if(!k){b(g);return}const N=g.querySelector("h3"),O=k.querySelector("thead"),P=Array.from(k.querySelectorAll("tbody tr"));if(!P.length){b(g);return}let I=null,$=0;const M=(L=!1)=>{const _=g.cloneNode(!1);_.removeAttribute("data-quote-block"),_.removeAttribute("data-block-type"),_.removeAttribute("data-table-id"),_.classList.add("quote-section--table-fragment"),L&&_.classList.add("quote-section--table-fragment--continued");const D=N?N.cloneNode(!0):null;D&&_.appendChild(D);const z=k.cloneNode(!1);z.classList.add("quote-table--fragment"),O&&z.appendChild(O.cloneNode(!0));const Y=a.createElement("tbody");return z.appendChild(Y),_.appendChild(z),{section:_,body:Y}},j=(L=!1)=>I||(I=M(L),h(I.section)||(f(),h(I.section)||h(I.section,{allowOverflow:!0})),I);P.forEach(L=>{j($>0);const _=L.cloneNode(!0);if(I.body.appendChild(_),q()&&(I.body.removeChild(_),I.body.childElementCount||(d.removeChild(I.section),I=null,p()),f(),I=null,j($>0),I.body.appendChild(_),q())){I.section.classList.add("quote-section--table-fragment--overflow"),$+=1;return}$+=1}),I=null};if(!o.length)return;o.forEach(g=>{g.getAttribute("data-block-type")==="table"?w(g):b(g)});const S=Array.from(s.children),C=[];S.forEach((g,k)=>{const N=g.querySelector(".quote-body");if(k!==0&&(!N||N.childElementCount===0)){g.remove();return}C.push(g)}),C.forEach((g,k)=>{const N=k===0;g.style.pageBreakAfter="auto",g.style.breakAfter="auto",g.style.pageBreakBefore=N?"auto":"always",g.style.breakBefore=N?"auto":"page",n?g.style.boxShadow="":g.style.boxShadow="none"});const T=C[C.length-1]||null;c=T,d=T?.querySelector(".quote-body")||null,await ct(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function In(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function xi(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,l]=await Promise.all([mi(),ui()]),o=typeof window<"u"&&window.devicePixelRatio||1,c=kn(),d=Pa(),u=ei();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,o*1.1)):c?m=Math.min(1.8,Math.max(1.25,o*1.2)):m=Math.min(2,Math.max(1.6,o*1.4));const v=u||d?.9:c?.92:.95,p=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),f={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let q=0;const h=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let w=0;w<s.length;w+=1){const S=s[w];await Ma(S),await ct(S);const C=S.ownerDocument||document,T=C.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const g=S.cloneNode(!0);g.style.width=`${at}px`,g.style.maxWidth=`${at}px`,g.style.minWidth=`${at}px`,g.style.height=`${st}px`,g.style.maxHeight=`${st}px`,g.style.minHeight=`${st}px`,g.style.position="relative",g.style.background="#ffffff",In(g),T.appendChild(g),C.body.appendChild(T);let k;try{await ct(g),k=await l(g,{...f,scale:m,width:at,height:st,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(L){throw dn(L,"pageCapture",{toastMessage:h}),L}finally{T.parentNode?.removeChild(T)}if(!k)continue;const N=k.width||1,P=(k.height||1)/N;let I=sn,$=I*P,M=0;if($>xt){const L=xt/$;$=xt,I=I*L,M=Math.max(0,(sn-I)/2)}const j=k.toDataURL("image/jpeg",v);q>0&&p.addPage(),p.addImage(j,"JPEG",M,0,I,$,`page-${q+1}`,"FAST"),q+=1,await new Promise(L=>window.requestAnimationFrame(L))}}catch(w){throw un({safariWindowRef:n,mobileWindowRef:a}),w}if(q===0)throw un({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const w=p.output("blob"),S=URL.createObjectURL(w);d?n&&!n.closed?(n.location.href=S,n.focus?.()):window.open(S,"_blank"):a&&!a.closed&&(a.location.href=S,a.focus?.()),setTimeout(()=>URL.revokeObjectURL(S),6e4)}else p.save(t)}function An(){if(!A||!U)return;const{previewFrame:e}=U;if(!e)return;const t=za({reservation:A.reservation,customer:A.customer,project:A.project,technicians:A.technicians,totals:A.totals,totalsDisplay:A.totalsDisplay,rentalDays:A.rentalDays,currencyLabel:A.currencyLabel,sections:A.sections,fieldSelections:A.fields,quoteNumber:A.quoteNumber,quoteDate:A.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(Ba(s),ja(s,a),_a(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&(await Ha(r,{context:"preview"}),In(r))}catch(v){console.error("[reservations/pdf] failed to layout preview document",v)}const l=Array.from(n?.querySelectorAll?.(".quote-page")||[]),o=n?.querySelector(".quote-preview-pages"),c=at;let d=18;if(o&&n?.defaultView){const v=n.defaultView.getComputedStyle(o),p=parseFloat(v.rowGap||v.gap||`${d}`);Number.isFinite(p)&&p>=0&&(d=p)}const u=st,m=l.length?l.length*u+Math.max(0,(l.length-1)*d):u;if(e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(m),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,U?.previewFrameWrapper&&!U?.userAdjustedZoom){const v=U.previewFrameWrapper.clientWidth-24;v>0&&v<c?oe=Math.max(v/c,.3):oe=1}Ua(oe)},{once:!0})}function Ei(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?A.sections.add(n):A.sections.delete(n),Oa(),An())}function ki(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=A.fields||(A.fields=Na()),r=Xr(s,n);t.checked?r.add(a):r.delete(a),An()}function Ci(e){if(!A)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(En(A,n),A.sectionExpansions[n]=t.open)}function Oa(){if(!U?.toggles||!A)return;const{toggles:e}=U,t=A.fields||{};En(A);const n=xn.map(({id:a,labelKey:s,fallback:r})=>{const l=i(s,r),o=A.sections.has(a),c=Ca[a]||[],d=Yr(A,a),u=c.length?`<div class="quote-toggle-sublist">
          ${c.map(m=>{const v=La(t,a,m.id),p=o?"":"disabled",f=m.labelKey?i(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${v?"checked":""} ${p}>
                <span>${x(f)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${o?"checked":""}>
            <span>${x(l)}</span>
          </label>
          ${c.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",Ei)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",ki)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",Ci)})}function Ii(){if(U?.modal)return U;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${x(i("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${x(i("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${x(i("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${x(i("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),r=e.querySelector(".modal-header"),l=r?.querySelector(".btn-close"),o=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),c=document.createElement("div");c.className="quote-preview-header-actions",r&&r.insertBefore(c,l||null);const d=document.createElement("iframe");d.className="quote-preview-frame",d.setAttribute("title",i("reservations.quote.previewTitle","معاينة عرض السعر")),d.setAttribute("loading","lazy"),d.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${x(i("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${x(i("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${x(i("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const v=document.createElement("div");v.className="quote-preview-scroll",v.appendChild(m),n.appendChild(v),c.appendChild(u),s?.addEventListener("click",async()=>{if(A){s.disabled=!0;try{await Ti()}finally{s.disabled=!1}}});const p=()=>{rn()||on(e)};o.forEach(b=>{b?.addEventListener("click",p)}),l&&!o.includes(l)&&l.addEventListener("click",p),e.addEventListener("click",b=>{rn()||b.target===e&&on(e)}),U={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const f=u.querySelector("[data-zoom-out]"),q=u.querySelector("[data-zoom-in]"),h=u.querySelector("[data-zoom-reset]");return f?.addEventListener("click",()=>Wn(-.1)),q?.addEventListener("click",()=>Wn(.1)),h?.addEventListener("click",()=>Lt(1,{markManual:!0})),Lt(oe),U}function Lt(e,{silent:t=!1,markManual:n=!1}={}){oe=Math.min(Math.max(e,.25),2.2),n&&U&&(U.userAdjustedZoom=!0),Ua(oe),!t&&U?.zoomValue&&(U.zoomValue.textContent=`${Math.round(oe*100)}%`)}function Wn(e){Lt(oe+e,{markManual:!0})}function Ua(e){if(!U?.previewFrame||!U.previewFrameWrapper)return;const t=U.previewFrame,n=U.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",kn()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Ai(){if(!U?.meta||!A)return;const{meta:e}=U;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${x(i("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${x(A.quoteNumber)}</strong></div>
      <div><span>${x(i("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${x(A.quoteDateLabel)}</strong></div>
    </div>
  `}async function Ti(){if(!A)return;const e=kn(),t=!e&&Pa(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const r=i("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await pi(),Wt("html2pdf ensured");const l=za({reservation:A.reservation,customer:A.customer,project:A.project,technicians:A.technicians,totals:A.totals,totalsDisplay:A.totalsDisplay,rentalDays:A.rentalDays,currencyLabel:A.currencyLabel,sections:A.sections,fieldSelections:A.fields,quoteNumber:A.quoteNumber,quoteDate:A.quoteDateLabel});s=document.createElement("div"),s.innerHTML=l,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),Ba(s),ja(s),_a(s),Wt("export container prepared");const o=s.firstElementChild;if(o){o.setAttribute("dir","rtl"),o.style.direction="rtl",o.style.textAlign="right",o.setAttribute("data-theme","light"),o.classList.remove("dark","dark-mode"),o.style.margin="0",o.style.padding="0",o.style.width="210mm",o.style.maxWidth="210mm",o.style.marginLeft="auto",o.style.marginRight="auto",o.scrollTop=0,o.scrollLeft=0;try{await Ha(o,{context:"export"}),await ct(o),In(o),Wt("layout complete for export document")}catch(d){dn(d,"layoutQuoteDocument",{suppressToast:!0})}}const c=`quotation-${A.quoteNumber}.pdf`;await xi(o,{filename:c,safariWindowRef:a,mobileWindowRef:n}),A.sequenceCommitted||(hi(A.quoteSequence),A.sequenceCommitted=!0)}catch(l){un({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,dn(l,"exportQuoteAsPdf",{toastMessage:r})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function $i(){const e=Ii();e?.modal&&(oe=1,U&&(U.userAdjustedZoom=!1),Lt(oe,{silent:!0}),Oa(),Ai(),An(),Gr(e.modal))}async function Ni({reservation:e,customer:t,project:n}){if(!e){E(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=qi(e),{totalsDisplay:s,totals:r,rentalDays:l}=wi(e,a,n),o=i("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:d}=bi(),u=new Date;A={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:l,currencyLabel:o,sections:new Set(xn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:Da(),fields:Na(),quoteSequence:c,quoteNumber:d,quoteDate:u,quoteDateLabel:gi(u),sequenceCommitted:!1},$i()}function Li({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Bt(),{reservations:r=[],customers:l=[],technicians:o=[],projects:c=[]}=Q(),d=Array.isArray(s)?s:o||[],u=new Map((c||[]).map(h=>[String(h.id),h])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${i("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const v=t||Ir(),p=new Map(l.map(h=>[String(h.id),h])),f=new Map(d.map(h=>[String(h.id),h])),q=Nr({reservations:r,filters:v,customersMap:p,techniciansMap:f,projectsMap:u});if(q.length===0){m.innerHTML=`<p>${i("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Lr({entries:q,customersMap:p,techniciansMap:f,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(h=>{const b=Number(h.dataset.reservationIndex);Number.isNaN(b)||h.addEventListener("click",()=>{typeof n=="function"&&n(b)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(h=>{const b=Number(h.dataset.reservationIndex);Number.isNaN(b)||h.addEventListener("click",w=>{w.stopPropagation(),typeof a=="function"&&a(b,w)})})}function Di(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:l=[]}=Q(),o=s[e];if(!o)return E(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=r.find(b=>String(b.id)===String(o.customerId)),d=o.projectId?l.find(b=>String(b.id)===String(o.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const b=Bt()||[];u.innerHTML=Dr(o,c,b,e,d)}const m=document.getElementById("reservationDetailsModal"),v=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},p=document.getElementById("reservation-details-edit-btn");p&&(p.onclick=()=>{v(),typeof t=="function"&&t(e,{reservation:o,customer:c,getEditContext:a})});const f=document.getElementById("reservation-details-delete-btn");f&&(f.onclick=()=>{v(),typeof n=="function"&&n(e,{reservation:o,customer:c})});const q=u?.querySelector('[data-action="open-project"]');q&&d&&q.addEventListener("click",()=>{v();const b=d?.id!=null?String(d.id):"",w=b?`projects.html?project=${encodeURIComponent(b)}`:"projects.html";window.location.href=w});const h=document.getElementById("reservation-details-export-btn");return h&&(h.onclick=async b=>{b?.preventDefault?.(),b?.stopPropagation?.(),h.blur();try{await Ni({reservation:o,customer:c,project:d})}catch(w){console.error("❌ [reservations] export to PDF failed",w),E(i("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}let dt=null,ue=[],mn=null,ne={};function je(){return{index:dt,items:ue}}function _e(e,t){dt=typeof e=="number"?e:null,ue=Array.isArray(t)?[...t]:[]}function Va(){dt=null,ue=[],er()}function Pi(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function tt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Bi(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=i("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=i("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",l=Array.isArray(e)?[...e].sort((c,d)=>String(d.createdAt||d.start||"").localeCompare(String(c.createdAt||c.start||""))):[],o=[`<option value="">${tt(a)}</option>`];l.forEach(c=>{o.push(`<option value="${tt(c.id)}">${tt(c.title||a)}</option>`)}),r&&!l.some(c=>String(c.id)===r)&&o.push(`<option value="${tt(r)}">${tt(s)}</option>`),n.innerHTML=o.join(""),r?n.value=r:n.value=""}function Ka(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Xn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:l}={}){const{customers:o,projects:c}=Q(),u=ua()?.[e];if(!u){E(i("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ne={...ne,reservation:u,projects:c||[]},t?.(),Bi(c||[],u);const m=u.projectId&&c?.find?.(j=>String(j.id)===String(u.projectId))||null,{effectiveConfirmed:v,projectLinked:p}=Pe(u,m),f=u.items?u.items.map(j=>({...j,equipmentId:j.equipmentId??j.equipment_id??j.id,barcode:K(j?.barcode)})):[];_e(e,f);const q=i("reservations.list.unknownCustomer","غير معروف"),h=o?.find?.(j=>String(j.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const b=document.getElementById("edit-res-id");b&&(b.value=u.reservationId||u.id);const w=document.getElementById("edit-res-customer");w&&(w.value=h?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},C=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",C.date),n?.("edit-res-end-time",C.time);const T=document.getElementById("edit-res-notes");T&&(T.value=u.notes||"");const g=document.getElementById("edit-res-discount");g&&(g.value=y(u.discount??0));const k=document.getElementById("edit-res-discount-type");k&&(k.value=u.discountType||"percent");const N=u.projectId?!1:!!u.applyTax,O=document.getElementById("edit-res-tax");O&&(O.checked=N);const P=document.getElementById("edit-res-company-share");if(P){const j=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,L=j!=null?Number.parseFloat(y(String(j).replace("%","").trim())):NaN,_=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,D=_!=null?_===!0||_===1||_==="1"||String(_).toLowerCase()==="true":Number.isFinite(L)&&L>0,z=D&&Number.isFinite(L)&&L>0?L:ie,Y=N||D;P.checked=Y,P.dataset.companyShare=String(z)}const I=document.getElementById("edit-res-confirmed");I&&(I.checked=v,I.disabled=p,I.classList.toggle("disabled",p),I.closest(".form-check")?.classList.toggle("disabled",p));const $=document.getElementById("edit-res-paid");$&&($.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),Xs((u.technicians||[]).map(j=>String(j))),s?.(f),Ka(),r?.();const M=document.getElementById("editReservationModal");mn=Pi(M,l),mn?.show?.()}async function ji({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:l}={}){if(dt===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const o=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",v=y(document.getElementById("edit-res-discount")?.value||"0"),p=parseFloat(v)||0,f=document.getElementById("edit-res-discount-type")?.value||"percent",q=document.getElementById("edit-res-confirmed")?.checked||!1,h=document.getElementById("edit-res-paid")?.value||"unpaid",b=document.getElementById("edit-res-project")?.value||"",w=Ys(),S=document.getElementById("edit-res-company-share");let C=null;if(S&&S.checked){const F=S.dataset.companyShare??S.value??ie,W=Number.parseFloat(y(String(F).replace("%","").trim()));C=Number.isFinite(W)&&W>0?W:ie}const T=Number.isFinite(C)&&C>0;if(!o||!d){E(i("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const g=typeof e=="function"?e:(F,W)=>`${F}T${W||"00:00"}`,k=g(o,c),N=g(d,u);if(k&&N&&new Date(k)>new Date(N)){E(i("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const P=ua()?.[dt];if(!P){E(i("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ue)||ue.length===0&&w.length===0){E(i("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const F of ue){const W=ke(F.barcode);if(W!=="available"){E(Ke(W));return}}const I=typeof t=="function"?t:()=>!1;for(const F of ue){const W=K(F.barcode);if(I(W,k,N,P.id??P.reservationId)){E(i("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const $=typeof n=="function"?n:()=>!1;for(const F of w)if($(F,k,N,P.id??P.reservationId)){E(i("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const M=document.getElementById("edit-res-tax"),j=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Q().projects||[],L=b&&j.find(F=>String(F.id)===String(b))||null,_={...P,projectId:b?String(b):null,confirmed:q},{effectiveConfirmed:D,projectLinked:z,projectStatus:Y}=Pe(_,L),G=z?!1:M?.checked||!1,te=sa(ue,p,f,G,w,{start:k,end:N});let Z=P.status??"pending";z?Z=L?.status??Y??Z:["completed","cancelled"].includes(String(Z).toLowerCase())||(Z=q?"confirmed":"pending");const fe=ra({reservationCode:P.reservationCode??P.reservationId??null,customerId:P.customerId,start:k,end:N,status:Z,title:P.title??null,location:P.location??null,notes:m,projectId:b?String(b):null,totalAmount:te,discount:p,discountType:f,applyTax:G,paidStatus:h,confirmed:D,items:ue.map(F=>({...F,equipmentId:F.equipmentId??F.id})),technicians:w,companySharePercent:T?C:null,companyShareEnabled:T});try{const F=await Zs(P.id||P.reservationId,fe);await Js(),E(i("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Va(),l?.({type:"updated",reservation:F}),s?.(),r?.(),mn?.hide?.()}catch(F){console.error("❌ [reservationsEdit] Failed to update reservation",F);const W=ia(F)?F.message:i("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(W,"error")}}function no(e={}){ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ne,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=y(r.value),t?.()}),r.dataset.listenerAttached="true");const l=document.getElementById("edit-res-discount-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>t?.()),l.dataset.listenerAttached="true");const o=document.getElementById("edit-res-tax");o&&!o.dataset.listenerAttached&&(o.addEventListener("change",()=>{o.checked&&me("edit-res-company-share"),t?.()}),o.dataset.listenerAttached="true");const c=document.getElementById("edit-res-company-share");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{c.checked?c.dataset.companyShare||(c.dataset.companyShare=String(ie)):o?.checked&&me("edit-res-company-share"),t?.()}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{Ka();const f=document.getElementById("edit-res-confirmed");if(f){const q=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Q().projects||[],h=d.value&&q.find(T=>String(T.id)===String(d.value))||null,w={...ne?.reservation??{},projectId:d.value||null,confirmed:f.checked},{effectiveConfirmed:S,projectLinked:C}=Pe(w,h);f.checked=S,f.disabled=C,f.classList.toggle("disabled",C),f.closest(".form-check")?.classList.toggle("disabled",C)}t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("save-reservation-changes");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{ji(ne).catch(f=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",f)})}),u.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){m.addEventListener("keydown",h=>{h.key==="Enter"&&(h.preventDefault(),n?.(m))});let f=null;const q=()=>{if(clearTimeout(f),!m.value?.trim())return;const{start:h,end:b}=getEditReservationDateRange();!h||!b||(f=setTimeout(()=>{n?.(m)},150))};m.addEventListener("input",q),m.addEventListener("change",()=>n?.(m)),m.dataset.listenerAttached="true"}const v=document.getElementById("edit-res-equipment-description");v&&!v.dataset.listenerAttached&&(v.addEventListener("keydown",f=>{f.key==="Enter"&&(f.preventDefault(),a?.(v,"edit"))}),v.dataset.listenerAttached="true");const p=document.getElementById("editReservationModal");p&&!p.dataset.cleanupAttached&&(p.addEventListener("hidden.bs.modal",()=>{Va(),t?.(),s?.([])}),p.dataset.cleanupAttached="true")}function _t(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:ot(e,n),end:ot(t,a)}}function Fe(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=i("reservations.create.equipment.none","لا توجد معدات"),a=i("reservations.create.summary.currency","ريال"),s=i("reservations.create.equipment.imageAlt","صورة"),r=i("reservations.equipment.actions.increase","زيادة الكمية"),l=i("reservations.equipment.actions.decrease","تقليل الكمية"),o=i("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Yn(t);return}const c=De(e);t.innerHTML=c.map(d=>{const u=d.items[0]||{},m=Be(u)||d.image,v=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=y(String(d.count)),f=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,q=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):f*d.count,h=`${y(f.toFixed(2))} ${a}`,b=`${y(q.toFixed(2))} ${a}`,w=d.barcodes.map(C=>y(String(C||""))).filter(Boolean),S=w.length?`<details class="reservation-item-barcodes">
            <summary>${i("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${w.map(C=>`<li>${C}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${v}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${S}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${l}">−</button>
              <span class="reservation-qty-value">${p}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${h}</td>
          <td>${b}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${o}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Yn(t)}function _i(e){const{index:t,items:n}=je(),s=De(n).find(o=>o.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const l=n.filter((o,c)=>c!==r);_e(t,l),Fe(l),pe()}function Fi(e){const{index:t,items:n}=je(),a=n.filter(s=>Pt(s)!==e);a.length!==n.length&&(_e(t,a),Fe(a),pe())}function Ri(e){const{index:t,items:n}=je(),s=De(n).find(h=>h.key===e);if(!s)return;const{start:r,end:l}=_t();if(!r||!l){E(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:o=[]}=Q(),c=t!=null&&o[t]||null,d=c?.id??c?.reservationId??null,u=new Set(n.map(h=>K(h.barcode))),{equipment:m=[]}=Q(),v=(m||[]).find(h=>{const b=K(h?.barcode);return!b||u.has(b)||Pt({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!ma(h)?!1:!Ee(b,r,l,d)});if(!v){E(i("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=K(v.barcode),f=Ve(v);if(!f){E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const q=[...n,{id:f,equipmentId:f,barcode:p,desc:v.desc||v.description||v.name||s.description||"",qty:1,price:Number.isFinite(Number(v.price))?Number(v.price):s.unitPrice,image:Be(v)}];_e(t,q),Fe(q),pe()}function Yn(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){_i(s);return}if(a==="increase-edit-group"&&s){Ri(s);return}if(a==="remove-edit-group"&&s){Fi(s);return}if(a==="remove-edit-item"){const l=Number(r);Number.isNaN(l)||Mi(l)}}),e.dataset.groupListenerAttached="true")}function pe(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",pe),a.dataset.listenerAttached="true"),Oe(a);const s=y(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,l=n?.value||"percent",o=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),d=o?!1:c?.checked||!1,u=a?.value||"unpaid";Oe(a,u),d&&me("edit-res-company-share");let m=lt("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(me("edit-res-company-share"),m=lt("edit-res-company-share"));const{items:v=[]}=je(),{start:p,end:f}=_t();e.innerHTML=tr({items:v,discount:r,discountType:l,applyTax:d,paidStatus:u,start:p,end:f,companySharePercent:m})}function Mi(e){if(e==null)return;const{index:t,items:n}=je();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);_e(t,a),Fe(a),pe()}function zi(e){const t=e?.value??"",n=K(t);if(!n)return;const a=jt(n);if(!a){E(i("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ke(a);if(s!=="available"){E(Ke(s));return}const r=K(n),{index:l,items:o=[]}=je();if(o.findIndex(h=>K(h.barcode)===r)>-1){E(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=_t();if(!d||!u){E(i("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Q(),v=l!=null&&m[l]||null,p=v?.id??v?.reservationId??null;if(Ee(r,d,u,p)){E(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=Ve(a);if(!f){E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const q=[...o,{id:f,equipmentId:f,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];_e(l,q),e&&(e.value=""),Fe(q),pe()}function Dt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ya(t),a=K(n?.barcode||t);if(!n||!a){E(i("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ke(n);if(s!=="available"){E(Ke(s));return}const{start:r,end:l}=_t();if(!r||!l){E(i("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:o,items:c=[]}=je();if(c.some(q=>K(q.barcode)===a)){E(i("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Q(),m=o!=null&&u[o]||null,v=m?.id??m?.reservationId??null;if(Ee(a,r,l,v)){E(i("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=Ve(n);if(!p){E(i("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const f=[...c,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];_e(o,f),Fe(f),pe(),e.value=""}function Hi(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Dt(e))});const t=()=>{qa(e.value,"edit-res-equipment-description-options")&&Dt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{pe()});function Oi(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){nn(e);return}Dt(e)}}function ao(){Qe(),Hi()}function Ui(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}function so(){return sr().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Q()||{};rr(e||[]),wa()})}function Tn(e=null){wa(),Qa(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Vi(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function pn(){return{populateEquipmentDescriptionLists:Qe,setFlatpickrValue:Ui,splitDateTime:ta,renderEditItems:Fe,updateEditReservationSummary:pe,addEquipmentByDescription:Oi,addEquipmentToEditingReservation:zi,addEquipmentToEditingByDescription:Dt,combineDateTime:ot,hasEquipmentConflict:Ee,hasTechnicianConflict:aa,renderReservations:Qa,handleReservationsMutation:Tn,ensureModal:Vi}}function Qa(e="reservations-list",t=null){Li({containerId:e,filters:t,onShowDetails:Ga,onConfirmReservation:Xa})}function Ga(e){return Di(e,{getEditContext:pn,onEdit:(t,{reservation:n})=>{Ya(t,n)},onDelete:Wa})}function Wa(e){return ea()?window.confirm(i("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?nr(e,{onAfterChange:Tn}):!1:(Hs(),!1)}function Xa(e){return ar(e,{onAfterChange:Tn})}function Ya(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Xn(e,pn());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Xn(e,pn());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(l){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",l)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Os({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function ro(){typeof window>"u"||(window.showReservationDetails=Ga,window.deleteReservation=Wa,window.confirmReservation=Xa,window.editReservation=Ya)}const Ki={minuteStep:5,defaultHour:9,defaultMinute:0,closeOnSelect:!0},St=new WeakMap;let ae=null;function $n(e,t,n){return Math.min(Math.max(e,t),n)}function ut(e,t){const n=t&&Number.isFinite(t)?$n(Math.abs(t),1,30):5,s=Math.round(e/n)*n;return s>=60?Math.max(60-n,0):s}function rt(e){if(!e)return null;const t=String(e).trim().match(/^(\d{1,2}):(\d{2})$/);if(!t)return null;let n=Number.parseInt(t[1],10),a=Number.parseInt(t[2],10);return!Number.isFinite(n)||!Number.isFinite(a)||n<0||n>23?null:(a=$n(a,0,59),{hour:n,minute:a})}function Nn(e,t){return!Number.isFinite(e)||!Number.isFinite(t)?"":`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}function it(e){if(!e.previewEl)return;const{hour:t,minute:n}=e.state;Number.isFinite(t)&&Number.isFinite(n)?e.previewEl.textContent=Nn(t,n):e.previewEl.textContent="--:--"}function Le(e=[],t){e.forEach(n=>{if(!n)return;const a=Number.parseInt(n.dataset.value??"",10),s=Number.isFinite(a)&&a===t;n.classList.toggle("is-active",s)})}function Za(e){const t=new Event("input",{bubbles:!0});e.dispatchEvent(t);const n=new Event("change",{bubbles:!0});e.dispatchEvent(n)}function qe(e,t,n,{emitEvents:a=!0}={}){const s=$n(t??e.state.hour??e.options.defaultHour,0,23),r=ut(n??e.state.minute??e.options.defaultMinute,e.options.minuteStep),l=Nn(s,r),o=e.input.value;e.state.hour=s,e.state.minute=r,e.input.value=l,it(e),Le(e.hourButtons,s),Le(e.minuteButtons,r),a&&l!==o&&Za(e.input)}function Et(e,{emitEvents:t=!0}={}){const n=!!e.input.value;e.state.hour=null,e.state.minute=null,e.input.value="",it(e),Le(e.hourButtons,NaN),Le(e.minuteButtons,NaN),t&&n&&Za(e.input)}function we(e){e&&(e.panel.classList.remove("is-open"),e.wrapper.classList.remove("is-open"),e.input.setAttribute("aria-expanded","false"),ae===e&&(ae=null))}function Qi(e){e&&document.activeElement!==e.input&&e.input.focus({preventScroll:!0})}function Zn(e){if(!e)return;ae&&ae!==e&&we(ae);const{input:t,panel:n,wrapper:a}=e;a.classList.add("is-open"),n.classList.add("is-open"),t.setAttribute("aria-expanded","true"),ae=e;const s=rt(t.value);s?(e.state.hour=s.hour,e.state.minute=ut(s.minute,e.options.minuteStep)):(e.state.hour=e.options.defaultHour,e.state.minute=ut(e.options.defaultMinute,e.options.minuteStep)),qe(e,e.state.hour,e.state.minute,{emitEvents:!1});const r=t.getBoundingClientRect(),l=Math.max(Math.round(r.width)+32,260);n.style.minWidth=`${l}px`}function Gi(e){if(!ae)return;const{wrapper:t}=ae;t.contains(e.target)||we(ae)}typeof document<"u"&&(document.addEventListener("pointerdown",Gi,{capture:!0}),document.addEventListener("keydown",e=>{e.key==="Escape"&&ae&&(we(ae),Qi(ae))}));function Jn({label:e,value:t,type:n,onClick:a}){const s=document.createElement("button");return s.type="button",s.className=`time-picker__option time-picker__option--${n}`,s.dataset.value=String(t),s.textContent=e,s.addEventListener("click",()=>a(t)),s}function Xt({label:e,action:t,variant:n="ghost"}){const a=document.createElement("button");return a.type="button",a.className=`time-picker__action time-picker__action--${n}`,a.textContent=e,a.addEventListener("click",t),a}function Wi(e){const{options:t}=e,n=document.createElement("div");n.className="time-picker__panel",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","false"),n.setAttribute("aria-label","اختيار الوقت");const a=document.createElement("div");a.className="time-picker__header";const s=document.createElement("p");s.className="time-picker__label",s.textContent="الوقت المختار";const r=document.createElement("div");r.className="time-picker__preview",r.textContent="--:--",a.append(s,r);const l=document.createElement("div");l.className="time-picker__body";const o=document.createElement("section");o.className="time-picker__section";const c=document.createElement("p");c.className="time-picker__section-label",c.textContent="الساعات";const d=document.createElement("div");d.className="time-picker__grid time-picker__grid--hours";const u=[];for(let S=0;S<24;S+=1){const C=Nn(S,0).slice(0,2),T=Jn({label:C,value:S,type:"hour",onClick:g=>{e.state.hour=g,Le(e.hourButtons,g),it(e)}});u.push(T),d.appendChild(T)}o.append(c,d);const m=document.createElement("section");m.className="time-picker__section";const v=document.createElement("p");v.className="time-picker__section-label",v.textContent="الدقائق";const p=document.createElement("div");p.className="time-picker__grid time-picker__grid--minutes";const f=[];for(let S=0;S<60;S+=t.minuteStep){const C=Jn({label:String(S).padStart(2,"0"),value:S,type:"minute",onClick:T=>{e.state.minute=T,Le(e.minuteButtons,T),it(e),e.state.hour==null&&(e.state.hour=t.defaultHour,Le(e.hourButtons,e.state.hour)),qe(e,e.state.hour,T),t.closeOnSelect&&we(e)}});f.push(C),p.appendChild(C)}m.append(v,p),l.append(o,m);const q=document.createElement("div");q.className="time-picker__actions";const h=Xt({label:"الآن",variant:"primary",action:()=>{const S=new Date,C=S.getHours(),T=ut(S.getMinutes(),t.minuteStep);qe(e,C,T),we(e)}}),b=Xt({label:"مسح",variant:"ghost",action:()=>{Et(e),we(e)}}),w=Xt({label:"تم",variant:"secondary",action:()=>{e.state.hour==null&&(e.state.hour=t.defaultHour),e.state.minute==null&&(e.state.minute=ut(t.defaultMinute,t.minuteStep)),qe(e,e.state.hour,e.state.minute),we(e)}});q.append(h,w,b),n.append(a,l,q),e.wrapper.appendChild(n),e.previewEl=r,e.panel=n,e.hourButtons=u,e.minuteButtons=f,it(e)}function Xi(e,t={}){if(!e)return null;if(St.has(e))return St.get(e);const n={...Ki,...t},a=document.createElement("div");a.className="time-picker",e.classList.add("time-picker__field"),e.setAttribute("autocomplete","off"),e.setAttribute("readonly","true"),e.setAttribute("role","combobox"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","false");const s=e.parentElement;s&&s.insertBefore(a,e),a.appendChild(e);const r={input:e,wrapper:a,panel:null,previewEl:null,hourButtons:[],minuteButtons:[],options:n,state:{hour:null,minute:null},api:null};Wi(r),e.addEventListener("focus",()=>Zn(r)),e.addEventListener("click",()=>Zn(r)),e.addEventListener("keydown",c=>{if(c.key==="ArrowUp"){c.preventDefault();const d=rt(e.value)??{hour:n.defaultHour,minute:n.defaultMinute},u=(d.hour+1)%24;qe(r,u,d.minute)}else if(c.key==="ArrowDown"){c.preventDefault();const d=rt(e.value)??{hour:n.defaultHour,minute:n.defaultMinute},u=(d.hour-1+24)%24;qe(r,u,d.minute)}});const l={setDate:c=>{if(!c){Et(r,{emitEvents:!1});return}const d=rt(c);d&&qe(r,d.hour,d.minute,{emitEvents:!1})},clear:()=>{Et(r,{emitEvents:!1})},destroy:()=>{Et(r,{emitEvents:!1}),we(r),e.classList.remove("time-picker__field"),e.removeAttribute("readonly"),e.removeAttribute("role"),e.removeAttribute("aria-haspopup"),e.removeAttribute("aria-expanded"),a.replaceWith(e),St.delete(e),r.panel?.parentElement&&r.panel.parentElement.removeChild(r.panel)},config:{dateFormat:"H:i"}};r.api=l,e._flatpickr=l,St.set(e,r);const o=rt(e.value);return o&&qe(r,o.hour,o.minute,{emitEvents:!1}),r}function Yi(e,t={}){const n=Xi(e,t);return n?n.api:null}function io(e=[],t={}){return Array.isArray(e)?e.map(n=>{const a=typeof n=="string"?document.querySelector(n):n;return a?Yi(a,t):null}):[]}export{Qa as a,Sa as b,ro as c,to as d,no as e,ao as f,io as g,wa as h,eo as i,pn as j,V as k,so as l,Tn as m,Be as r,Ga as s,pe as u};
