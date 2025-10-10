import{x as ss,e as Y,t as o,n as b,j as A,z as rs,f as Ie,k as In,o as os,u as is}from"./auth.js";import{H as X,I as Kt,z as te,J as ls,K as Ke,D as se,L as An,M as cs,N as ds,O as Ye,P as Le,Q as Tn,R as us,S as Ln,t as $n,T as Dn,U as ms,V as ps,s as ft,i as Pn,W as jn,X as fs,Y as hs,Z as vs,d as Qe,r as xe,c as Bn,g as Nn,_ as bs,$ as gs,v as ys,E as qs,a0 as ws,a1 as Ss,a2 as xs,a3 as Es,w as Cs,y as ks}from"./projectsService.js";ss({ar:{"dashboard.header.greeting":"👋 أهلاً بك في لوحة التحكم","dashboard.header.toggleLabel":"لوحة التحكم","dashboard.sidebar.title":"مركز التحكم","dashboard.sidebar.statsHeading":"ملخص اليوم","dashboard.sidebar.tabsHeading":"التبويبات","dashboard.sidebar.quickLinksHeading":"روابط سريعة","dashboard.hero.title":"مركز إدارة التأجير","dashboard.actions.addProject":"➕ إضافة مشروع","dashboard.metrics.projects.label":"المشاريع","dashboard.metrics.projects.caption":"مشاريع نشطة هذا الشهر","dashboard.metrics.reservations.label":"الحجوزات","dashboard.metrics.reservations.caption":"متابعة جدول الفعاليات","dashboard.metrics.equipment.label":"المعدات","dashboard.metrics.equipment.caption":"الأصول المتاحة حالياً","dashboard.metrics.technicians.label":"طاقم العمل","dashboard.metrics.technicians.caption":"أعضاء جاهزون للتكليف","dashboard.quickLinks.home":"الصفحة الرئيسية","dashboard.quickLinks.projects":"إدارة المشاريع","dashboard.quickLinks.reports":"تقارير المشاريع","dashboard.quickLinks.users":"إدارة المستخدمين","tabs.customers":"👤 العملاء","tabs.equipment":"🎥 المعدات","tabs.maintenance":"🛠️ الصيانة","tabs.technicians":"😎 طاقم العمل","tabs.reservations":"📅 الحجوزات","actions.close":"إغلاق","actions.cancel":"إلغاء","actions.goHome":"🏠 الرئيسية","customers.section.title":"📋 إدارة العملاء","customers.form.title":"إضافة / تعديل عميل","customers.form.hint":"حدّث بيانات العميل وسيتم مزامنتها مع الحجوزات والفواتير.","customers.form.labels.name":"👤 الاسم","customers.form.labels.phone":"📞 الجوال","customers.form.labels.email":"📧 البريد","customers.form.labels.address":"📍 العنوان","customers.form.labels.company":"🏢 الشركة","customers.form.labels.notes":"📝 الملاحظات","customers.form.placeholders.name":"اسم العميل","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"example@email.com","customers.form.placeholders.address":"عنوان العميل","customers.form.placeholders.company":"اسم الشركة","customers.form.placeholders.notes":"معلومات إضافية أو تذكيرات","customers.form.actions.cancel":"إلغاء التعديل","customers.form.actions.submit":"➕ إضافة عميل","customers.form.actions.update":"💾 حفظ التعديل","customers.search.placeholder":"🔍 ابحث عن عميل بالاسم أو الجوال أو الشركة...","customers.table.headers.name":"👤 الاسم","customers.table.headers.phone":"📞 الجوال","customers.table.headers.company":"🏢 الشركة","customers.table.headers.notes":"📝 ملاحظات","customers.table.headers.actions":"⚙️ الإجراءات","customers.table.loading":"جاري التحميل...","customers.table.empty":"لا يوجد عملاء","customers.table.noResults":"لا توجد نتائج مطابقة","customers.actions.edit":"✏️ تعديل","customers.actions.delete":"🗑️ حذف","customers.toast.updateSuccess":"تم تحديث بيانات العميل بنجاح","customers.toast.createSuccess":"تمت إضافة العميل بنجاح","customers.toast.missingFields":"يرجى تعبئة الاسم ورقم الهاتف","customers.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العميل؟","customers.toast.deleteSuccess":"تم حذف العميل","equipment.section.title":"🎥 إدارة المعدات","equipment.actions.clearAll":"🗑️ مسح الكل","equipment.actions.uploadExcel":"📤 رفع من Excel","equipment.form.title":"إضافة معدة","equipment.form.hint":"أدخل بيانات المعدة ليتم حفظها ضمن قائمة المعدات.","equipment.form.labels.description":"📝 الوصف","equipment.form.placeholders.description":"وصف المعدة","equipment.form.labels.barcode":"🏷️ الباركود","equipment.form.placeholders.barcode":"الباركود","equipment.form.labels.price":"💵 السعر","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 الكمية","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ رابط الصورة","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 القسم","equipment.form.placeholders.category":"القسم","equipment.form.labels.subcategory":"📑 القسم الثانوي","equipment.form.placeholders.subcategory":"القسم الثانوي","equipment.form.labels.status":"⚙️ الحالة","equipment.form.options.available":"✅ متاح","equipment.form.options.booked":"📌 محجوز","equipment.form.options.maintenance":"🛠️ صيانة","equipment.form.options.retired":"📦 خارج الخدمة","equipment.form.actions.submit":"➕ إضافة معدة","equipment.filters.search":"🔍 ابحث عن معدة...","equipment.filters.status.all":"⚙️ الحالات","equipment.filters.category.all":"📂 الأقسام","equipment.filters.subcategory.all":"📑 الأقسام الثانوية","equipment.list.title":"📋 كل المعدات","equipment.list.loading":"⏳ جاري تحميل المعدات...","equipment.list.empty":"لا توجد معدات مسجلة بعد.","equipment.card.labels.description":"الوصف","equipment.card.labels.status":"الحالة","equipment.card.labels.alias":"الاسم","equipment.card.labels.quantity":"الكمية","equipment.card.labels.price":"السعر","equipment.card.labels.category":"القسم","equipment.card.labels.subcategory":"القسم الثانوي","equipment.card.labels.barcode":"الباركود","equipment.modal.title":"✏️ تعديل بيانات المعدة","equipment.modal.placeholders.image":"ضع رابط مباشر للصورة","equipment.modal.actions.cancel":"❌ إلغاء","equipment.modal.actions.save":"💾 حفظ التعديلات","equipment.toast.xlsxMissing":"⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من الروابط في dashboard.html","equipment.toast.uploadSuccess":"✅ تم رفع المعدات بنجاح","equipment.toast.uploadEmpty":"⚠️ الملف لا يحتوي على بيانات يمكن استيرادها","equipment.toast.uploadFailed":"❌ حدث خطأ أثناء قراءة ملف الإكسل","equipment.toast.clearConfirm":"⚠️ هل أنت متأكد من حذف كل المعدات؟","equipment.toast.clearSuccess":"🗑️ تم مسح جميع المعدات","equipment.toast.deleteConfirm":"❌ هل أنت متأكد من حذف هذه المعدة؟","equipment.toast.deleteSuccess":"🗑️ تم حذف المعدة","equipment.toast.editSuccess":"✏️ تم تعديل بيانات المعدة","equipment.toast.addSuccess":"✅ تم إضافة المعدة","equipment.toast.updateSuccess":"✅ تم تحديث بيانات المعدة بنجاح","equipment.toast.missingFields":"⚠️ يرجى إدخال الوصف والباركود","equipment.toast.duplicateBarcode":"⚠️ هذا الباركود مستخدم مسبقًا","equipment.list.emptyFiltered":"⚠️ لا توجد معدات مطابقة.","equipment.list.countSuffix":"عنصر","equipment.item.imageAlt":"صورة","equipment.item.currency":"ريال","equipment.item.actions.edit":"✏️ تعديل","equipment.item.actions.delete":"🗑️ حذف","reservations.tabs.create":"➕ إنشاء حجز","reservations.tabs.mine":"📋 حجوزاتي","reservations.tabs.reports":"📊 تقارير","reservations.tabs.calendar":"📅 التقويم","reservations.create.title":"➕ إنشاء حجز جديد","reservations.create.labels.startDate":"📅 تاريخ البداية","reservations.create.labels.startTime":"⏰ وقت البداية","reservations.create.labels.endDate":"📅 تاريخ النهاية","reservations.create.labels.endTime":"⏰ وقت النهاية","reservations.create.labels.client":"👤 العميل","reservations.create.placeholders.client":"اكتب اسم العميل...","reservations.create.labels.project":"📁 المشروع المرتبط","reservations.create.placeholders.project":"اختر مشروعاً (اختياري)","reservations.create.labels.notes":"📝 ملاحظات","reservations.create.placeholders.notes":"اكتب أي ملاحظات إضافية...","reservations.create.equipment.title":"🎥 أضف المعدات","reservations.create.equipment.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.create.equipment.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.create.equipment.table.code":"الكود","reservations.create.equipment.table.description":"الوصف","reservations.create.equipment.table.price":"السعر","reservations.create.equipment.table.image":"الصورة","reservations.create.equipment.table.delete":"حذف","reservations.create.billing.title":"💵 الخصم والضريبة","reservations.create.billing.discount":"ادخل قيمة الخصم","reservations.create.billing.discountPercent":"٪ نسبة","reservations.create.billing.discountAmount":"💵 مبلغ","reservations.create.billing.companyShare":"🏦 نسبة الشركة","reservations.create.billing.companyShareToggle":"إضافة نسبة الشركة (10٪)","reservations.create.billing.taxLabel":"شامل الضريبة (15٪)","reservations.create.labels.paymentStatus":"💳 حالة الدفع","reservations.create.paymentStatus.paid":"مدفوع","reservations.create.paymentStatus.unpaid":"لم يتم الدفع","reservations.create.actions.submit":"💾 إنشاء الحجز","reservations.section.title":"📅 إدارة الحجوزات","reservations.crew.none":"لم يتم اختيار أي عضو من الطاقم.","reservations.crew.noneShort":"لم يتم اختيار أي عضو بعد","reservations.crew.selectedCount":"تم اختيار {count} عضو","reservations.crew.fallbackName":"عضو الطاقم {id}","reservations.crew.removeAria":"إزالة","reservations.crew.searchEmpty":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noResults":"لا يوجد نتائج مطابقة.","reservations.create.equipment.noneAdded":"لا توجد معدات مضافة","reservations.create.equipment.none":"لا توجد معدات","reservations.create.summary.currency":"ريال","reservations.create.equipment.imageAlt":"صورة","reservations.summary.total":"💰 التكلفة الإجمالية: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 التكلفة بعد التعديل: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 عدد المعدات: {count}","reservations.summary.crewCount":"😎 عدد الفريق: {count}","reservations.summary.companyShareLabel":"🏦 نسبة الشركة","reservations.summary.taxIncluded":"شامل الضريبة 15%","reservations.summary.taxExcluded":"غير شامل الضريبة","reservations.summary.paymentLabel":"💳 حالة الدفع: {status}","reservations.summary.itemsLabel":"📦 عدد المعدات","reservations.summary.durationLabel":"⏱️ عدد الأيام","reservations.summary.crewLabel":"😎 عدد الفريق","reservations.summary.taxLabelShort":"🧾 الضريبة","reservations.summary.paymentLabelShort":"💳 حالة الدفع","reservations.summary.taxIncludedValue":"شامل 15%","reservations.summary.taxExcludedValue":"غير شامل","reservations.summary.totalLabel":"💰 التكلفة الإجمالية","reservations.toast.customerNotFound":"⚠️ لم يتم العثور على العميل بالاسم المدخل","reservations.toast.invalidDateOrder":"⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية","reservations.toast.reservationMissing":"⚠️ تعذر العثور على الحجز المطلوب","reservations.list.title":"📋 حجوزاتي","reservations.list.search.placeholder":"🔍 ابحث باسم العميل أو الكود...","reservations.list.filters.start":"📅 من تاريخ","reservations.list.filters.end":"📅 إلى تاريخ","reservations.list.filters.range.all":"⏱️ كل التواريخ","reservations.list.filters.range.today":"📅 اليوم","reservations.list.filters.range.week":"📆 هذا الأسبوع","reservations.list.filters.range.month":"🗓️ هذا الشهر","reservations.list.filters.status.all":"⚙️ كل الحالات","reservations.list.filters.status.confirmed":"✅ مؤكدة","reservations.list.filters.status.pending":"⏳ غير مؤكدة","reservations.list.filters.status.completed":"📁 منتهية","reservations.list.empty":"⚠️ لا توجد حجوزات بعد.","reservations.list.noResults":"🔍 لا توجد حجوزات مطابقة للبحث.","reservations.list.taxIncludedShort":"(شامل الضريبة)","reservations.list.unknownCustomer":"غير معروف","reservations.list.noNotes":"لا توجد ملاحظات","reservations.list.project.unlinked":"غير مرتبط بمشروع","reservations.list.itemsCountShort":"{count} عنصر","reservations.list.crew.separator":"، ","reservations.list.status.confirmed":"✅ مؤكد","reservations.list.status.pending":"⏳ غير مؤكد","reservations.list.payment.paid":"💳 مدفوع","reservations.list.payment.unpaid":"💳 غير مدفوع","reservations.list.status.completed":"📁 منتهي","reservations.list.ribbon.completed":"منتهي","reservations.list.actions.confirm":"✔️ تأكيد","reservations.list.labels.client":"👤 العميل","reservations.list.labels.project":"📁 المشروع","reservations.edit.modalTitle":"✏️ تعديل الحجز","reservations.edit.labels.id":"🆔 رقم الحجز","reservations.edit.labels.customer":"👤 العميل","reservations.edit.labels.project":"📁 المشروع المرتبط","reservations.edit.labels.startDate":"📅 تاريخ البداية","reservations.edit.labels.startTime":"⏰ وقت البداية","reservations.edit.labels.endDate":"📅 تاريخ النهاية","reservations.edit.labels.endTime":"⏰ وقت النهاية","reservations.edit.labels.discount":"💵 الخصم","reservations.edit.placeholders.discount":"ادخل قيمة الخصم","reservations.edit.discount.percent":"٪ نسبة","reservations.edit.discount.amount":"💵 مبلغ","reservations.edit.labels.tax":"شامل الضريبة (15%)","reservations.edit.labels.confirmed":"✅ تم التأكيد","reservations.edit.labels.paymentStatus":"💳 حالة الدفع","reservations.edit.payment.paid":"مدفوع","reservations.edit.payment.unpaid":"لم يتم الدفع","reservations.edit.labels.notes":"📝 الملاحظات","reservations.edit.placeholders.notes":"اكتب أي ملاحظات...","reservations.edit.labels.addEquipment":"🎥 إضافة معدة","reservations.edit.project.missing":"⚠️ المشروع غير متوفر (تم حذفه)","reservations.edit.placeholders.barcode":"🔍 امسح أو أدخل الباركود ثم اضغط Enter","reservations.edit.placeholders.description":"🎥 اكتب اسم المعدة ثم اضغط Enter","reservations.edit.table.headers.code":"الكود","reservations.edit.table.headers.description":"الوصف","reservations.edit.table.headers.price":"السعر","reservations.edit.table.headers.quantity":"الكمية","reservations.edit.table.headers.image":"الصورة","reservations.edit.table.headers.delete":"حذف","reservations.edit.table.empty":"لا توجد معدات","reservations.edit.actions.save":"💾 حفظ التعديلات","reservations.list.labels.start":"🗓️ بداية الحجز","reservations.list.labels.end":"🗓️ نهاية الحجز","reservations.list.labels.cost":"💵 التكلفة","reservations.list.labels.equipment":"📦 المعدات","reservations.list.labels.crew":"😎 الفريق","reservations.details.labels.discount":"الخصم","reservations.details.labels.companyShare":"🏦 نسبة الشركة","reservations.details.labels.netProfit":"💵 صافي الربح","reservations.details.labels.subtotalAfterDiscount":"الإجمالي","reservations.details.labels.tax":"الضريبة (15%)","reservations.details.labels.crewTotal":"إجمالي الفريق","reservations.details.table.headers.code":"الكود","reservations.details.table.headers.description":"الوصف","reservations.details.table.headers.quantity":"الكمية","reservations.details.table.headers.price":"السعر","reservations.details.table.headers.image":"الصورة","reservations.details.noItems":"📦 لا توجد معدات ضمن هذا الحجز حالياً.","reservations.details.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","reservations.details.project.unlinked":"غير مرتبط بأي مشروع.","reservations.details.technicians.roleUnknown":"غير محدد","reservations.details.technicians.phoneUnknown":"غير متوفر","reservations.details.technicians.wage":"{amount} {currency} / اليوم","reservations.details.labels.id":"🆔 رقم الحجز","reservations.details.section.bookingInfo":"بيانات الحجز","reservations.details.section.statusSummary":"ملخص الحالة","reservations.details.section.paymentSummary":"💳 ملخص الدفع","reservations.details.labels.finalTotal":"المجموع النهائي","reservations.details.section.crew":"😎 الفريق الفني","reservations.details.crew.count":"{count} عضو","reservations.details.section.items":"📦 المعدات المرتبطة","reservations.details.items.count":"{count} عنصر","reservations.details.actions.edit":"✏️ تعديل","reservations.details.actions.delete":"🗑️ حذف","reservations.details.actions.openProject":"📁 فتح المشروع","reservations.details.labels.customer":"العميل","reservations.details.labels.contact":"رقم التواصل","reservations.details.labels.project":"📁 المشروع المرتبط","reservations.details.labels.start":"بداية الحجز","reservations.details.labels.end":"نهاية الحجز","reservations.details.labels.notes":"ملاحظات","reservations.details.labels.itemsCount":"عدد المعدات","reservations.details.labels.itemsTotal":"إجمالي المعدات","reservations.details.labels.paymentStatus":"حالة الدفع","reservations.details.modalTitle":"📋 تفاصيل الحجز","reservations.calendar.title":"📅 التقويم","reservations.reports.title":"تقارير الأداء","reservations.reports.subtitle":"نظرة شاملة على الحجوزات والإيرادات ونسب الإشغال خلال الفترة المحددة.","reservations.reports.filters.rangeLabel":"الفترة","reservations.reports.filters.range.last30":"آخر 30 يوم","reservations.reports.filters.range.thisWeek":"هذا الأسبوع","reservations.reports.filters.range.thisMonth":"هذا الشهر","reservations.reports.filters.range.thisQuarter":"هذا الربع","reservations.reports.filters.range.thisYear":"هذا العام","reservations.reports.filters.range.all":"كل الوقت","reservations.reports.filters.range.custom":"مخصص","reservations.reports.filters.startLabel":"من","reservations.reports.filters.endLabel":"إلى","reservations.reports.filters.statusLabel":"الحالة","reservations.reports.filters.status.all":"كل الحالات","reservations.reports.filters.status.confirmed":"مؤكدة","reservations.reports.filters.status.pending":"قيد التأكيد","reservations.reports.filters.status.completed":"منتهية","reservations.reports.filters.paymentLabel":"الدفع","reservations.reports.filters.payment.all":"الكل","reservations.reports.filters.payment.paid":"مدفوعة","reservations.reports.filters.payment.unpaid":"غير مدفوعة","reservations.reports.filters.shareLabel":"نسبة الشركة","reservations.reports.filters.share.all":"الكل","reservations.reports.filters.share.with":"مع نسبة الشركة","reservations.reports.filters.share.without":"بدون نسبة الشركة","reservations.reports.filters.searchLabel":"البحث","reservations.reports.filters.searchPlaceholder":"ابحث باسم العميل، رقم الحجز، أو المعدة...","reservations.reports.actions.refresh":"تحديث","reservations.reports.actions.customizeColumns":"تخصيص الأعمدة","reservations.reports.actions.exportPdf":"تصدير PDF","reservations.reports.actions.exportExcel":"تصدير Excel","reservations.reports.actions.exportCsv":"تصدير CSV","reservations.reports.kpi.total.label":"إجمالي الحجوزات","reservations.reports.kpi.total.meta":"لم يتم تسجيل بيانات بعد","reservations.reports.kpi.revenue.label":"إجمالي الإيرادات","reservations.reports.kpi.revenue.meta":"صافي الربح {net} • نسبة الشركة {share} • متوسط الحجز {average}","reservations.reports.kpi.confirmation.label":"معدل التأكيد","reservations.reports.kpi.confirmation.meta":"الحجوزات المؤكدة —","reservations.reports.kpi.paid.label":"نسبة المدفوع","reservations.reports.kpi.paid.meta":"الحجوزات المدفوعة —","reservations.reports.kpi.total.dynamicMeta":"منها {count} منتهية","reservations.reports.kpi.revenue.average":"متوسط قيمة الحجز {value}","reservations.reports.kpi.confirmed.detail":"{count} حجوزات مؤكدة","reservations.reports.kpi.paid.detail":"{count} حجوزات مدفوعة","reservations.reports.status.loading":"جارٍ تحميل التقارير...","reservations.reports.status.loadingHint":"قد يستغرق هذا بضع ثوانٍ.","reservations.reports.status.retry":"جرّب إعادة المحاولة أو تحديث الصفحة.","reservations.reports.status.confirmedLabel":"مؤكدة","reservations.reports.status.pendingLabel":"قيد التأكيد","reservations.reports.status.completedLabel":"منتهية","reservations.reports.payment.paidLabel":"مدفوعة","reservations.reports.payment.unpaidLabel":"غير مدفوعة","reservations.reports.progress.empty":"لا توجد بيانات لعرضها.","reservations.reports.progress.meta":"{count} حجز","reservations.reports.chart.volume.title":"حجم الحجوزات الشهري","reservations.reports.chart.volume.hint":"الحجوزات والإيرادات خلال الأشهر الماضية","reservations.reports.chart.volume.series.reservations":"عدد الحجوزات","reservations.reports.chart.volume.series.revenue":"الإيرادات (ر.س)","reservations.reports.chart.volume.series.net":"صافي الربح (ر.س)","reservations.reports.chart.status.title":"توزيع الحالات","reservations.reports.chart.status.hint":"نسبة الحجوزات المؤكدة، قيد التأكيد، والمنتهية","reservations.reports.chart.status.statusLabel":"الحالات","reservations.reports.chart.status.paymentLabel":"الدفع","reservations.reports.chart.payment.title":"حالة الدفع","reservations.reports.chart.payment.hint":"مقارنة الحجوزات المدفوعة وغير المدفوعة","reservations.reports.topCustomers.title":"أفضل العملاء","reservations.reports.topCustomers.hint":"حسب إجمالي الإيراد","reservations.reports.topCustomers.headers.customer":"العميل","reservations.reports.topCustomers.headers.count":"عدد الحجوزات","reservations.reports.topCustomers.headers.revenue":"الإيراد الكلي","reservations.reports.topCustomers.unknown":"عميل غير معروف","reservations.reports.table.empty":"لا توجد بيانات","reservations.reports.table.emptyPeriod":"لا توجد بيانات في هذه الفترة.","reservations.reports.results.title":"تفاصيل الحجوزات","reservations.reports.results.hint":"أحدث الحجوزات المطابقة لعوامل التصفية","reservations.reports.results.headers.id":"الحجز","reservations.reports.results.headers.customer":"العميل","reservations.reports.results.headers.date":"التاريخ","reservations.reports.results.headers.status":"الحالة","reservations.reports.results.headers.payment":"الدفع","reservations.reports.results.headers.total":"الإجمالي","reservations.reports.results.headers.share":"نسبة الشركة","reservations.reports.results.headers.net":"صافي الربح","reservations.reports.results.share.none":"بدون نسبة الشركة","reservations.reports.topEquipment.title":"المعدات الأكثر استخدامًا","reservations.reports.topEquipment.hint":"عدد مرات الحجز","reservations.reports.topEquipment.headers.item":"المعدة","reservations.reports.topEquipment.headers.usage":"عدد مرات الاستخدام","reservations.reports.topEquipment.headers.revenue":"الإيراد المرتبط","reservations.reports.topEquipment.unknown":"معدة بدون اسم","reservations.reports.empty.title":"لا توجد بيانات ضمن المعايير الحالية","reservations.reports.empty.subtitle":"جرّب تغيير الفترة الزمنية أو إزالة عوامل التصفية لعرض نتائج أخرى.","calendar.buttons.today":"اليوم","calendar.buttons.month":"شهر","calendar.buttons.week":"أسبوع","calendar.buttons.day":"يوم","calendar.badges.confirmed":"مؤكد","calendar.badges.pending":"غير مؤكد","calendar.badges.paid":"مدفوع","calendar.badges.unpaid":"غير مدفوع","calendar.badges.completed":"منتهي","calendar.labels.unknownCustomer":"غير معروف","calendar.labels.unknownEquipment":"معدة بدون اسم","calendar.labels.currencySuffix":"ريال","calendar.labels.noEquipment":"لا توجد معدات","calendar.labels.noNotes":"لا توجد ملاحظات","calendar.labels.reservationId":"رقم الحجز","calendar.labels.customer":"العميل","calendar.labels.start":"بداية الحجز","calendar.labels.end":"نهاية الحجز","calendar.labels.notes":"الملاحظات","calendar.sections.crew":"😎 الفريق الفني","calendar.sections.equipment":"📦 المعدات","calendar.emptyStates.noCrew":"😎 لا يوجد فريق مرتبط بهذا الحجز.","calendar.table.headers.barcode":"الباركود","calendar.table.headers.description":"الوصف","calendar.table.headers.quantity":"الكمية","calendar.table.headers.price":"السعر","calendar.table.headers.image":"الصورة","calendar.summary.baseCost":"💵 إجمالي المعدات: <strong>{value} ريال</strong>","calendar.summary.discount":"💸 الخصم: <strong>{value}</strong>","calendar.summary.tax":"🧾 الضريبة (15%): <strong>{value} ريال</strong>","calendar.summary.total":"💰 المجموع النهائي: <strong>{value} ريال</strong>","calendar.alerts.cannotShowDetails":"لا يمكن عرض تفاصيل الحجز","calendar.alerts.cannotOpenModal":"لا يمكن فتح نافذة التفاصيل","calendar.modal.title":"📅 تفاصيل الحجز","reservations.toast.equipmentNameNotFound":"❌ لم يتم العثور على معدة بالاسم المدخل","reservations.toast.equipmentMaintenance":"⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً","reservations.toast.equipmentMissingBarcode":"⚠️ هذه المعدة لا تحتوي على باركود معرف","reservations.toast.requireDatesBeforeAdd":"⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات","reservations.toast.equipmentDuplicate":"⚠️ هذه المعدة موجودة بالفعل في الحجز","reservations.toast.equipmentTimeConflict":"⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية","reservations.toast.equipmentMaintenanceStrict":"⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز","reservations.toast.requireOverallDates":"⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات","reservations.toast.equipmentTimeConflictSimple":"⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية","reservations.toast.barcodeNotFound":"❌ الباركود غير موجود","reservations.toast.equipmentAdded":"✅ تم إضافة المعدة بنجاح","reservations.toast.barcodeNotInCatalog":"❌ الباركود غير موجود ضمن المعدات","reservations.toast.requireDates":"⚠️ يرجى تحديد تاريخ البداية والنهاية","reservations.toast.invalidDateRange":"⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية","reservations.toast.missingFields":"⚠️ تأكد من تعبئة جميع الحقول","reservations.toast.noItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة","reservations.toast.cannotCreateEquipmentConflict":"⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية","reservations.toast.cannotCreateCrewConflict":"⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة","reservations.toast.projectNotFound":"⚠️ لم يتم العثور على المشروع المحدد. يرجى تحديث الصفحة أو اختيار مشروع آخر.","reservations.toast.technicianSelectionConflict":"⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية","reservations.toast.created":"✅ تم إنشاء الحجز","reservations.toast.notFound":"⚠️ تعذر العثور على بيانات الحجز","reservations.toast.updateNoItems":"⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز","reservations.toast.updateEquipmentMaintenance":"⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة","reservations.toast.updateEquipmentConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات","reservations.toast.updateCrewConflict":"⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم","reservations.toast.updated":"✅ تم حفظ التعديلات على الحجز","reservations.toast.confirmed":"✅ تم تأكيد الحجز","reservations.toast.confirmBlockedByProject":"⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا","reservations.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا الحجز؟","maintenance.section.title":"🛠️ إدارة الصيانة","maintenance.form.title":"➕ إنشاء تذكرة صيانة","maintenance.form.hint":"حدد المعدة المتضررة وسجّل المشكلة لإيقافها عن الاستخدام لحين الإصلاح.","maintenance.form.labels.barcode":"🏷️ الباركود","maintenance.form.placeholders.barcode":"🖨️ امسح أو أدخل الباركود ثم اضغط Enter","maintenance.form.labels.search":"🎥 البحث باسم المعدة","maintenance.form.placeholders.search":"اكتب اسم المعدة...","maintenance.form.labels.priority":"⚠️ الأولوية","maintenance.form.options.priority.high":"مرتفعة","maintenance.form.options.priority.medium":"متوسطة","maintenance.form.options.priority.low":"منخفضة","maintenance.form.selectedInfo":"لم يتم اختيار معدة بعد.","maintenance.form.labels.issue":"📝 وصف المشكلة","maintenance.form.placeholders.issue":"اشرح المشكلة أو الأعراض الظاهرة للمعدة","maintenance.form.actions.submit":"🛠️ إنشاء التذكرة","maintenance.form.blockedSuffix":"(صيانة)","maintenance.list.title":"📋 تذاكر الصيانة","maintenance.list.hint":"تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.","maintenance.filters.status.label":"الحالة","maintenance.filters.status.all":"كل الحالات","maintenance.filters.status.open":"قيد الصيانة","maintenance.filters.status.closed":"مغلقة","maintenance.table.headers.equipment":"المعدة","maintenance.table.headers.issue":"وصف المشكلة","maintenance.table.headers.priority":"الأولوية","maintenance.table.headers.created":"تاريخ الإنشاء","maintenance.table.headers.status":"الحالة","maintenance.table.headers.actions":"الإجراءات","maintenance.table.empty":"لا توجد تذاكر بعد.","maintenance.table.emptyFiltered":"لا توجد تذاكر ضمن هذا الفلتر.","maintenance.table.noName":"بدون اسم","maintenance.empty.title":"لا توجد تذاكر صيانة","maintenance.empty.subtitle":"عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.","maintenance.table.noBarcode":"بدون باركود","maintenance.stats.open":"{count} قيد الصيانة","maintenance.stats.closed":"{count} مغلقة","maintenance.stats.total":"{count} إجمالي التذاكر","maintenance.stats.summaryTitle":"ملخص الصيانة","maintenance.stats.totalLabel":"إجمالي التذاكر","maintenance.status.open":"قيد الصيانة","maintenance.status.closed":"مغلقة","maintenance.status.inProgress":"قيد التنفيذ","maintenance.status.completed":"مكتملة","maintenance.status.cancelled":"ملغاة","maintenance.priority.high":"مرتفعة","maintenance.priority.medium":"متوسطة","maintenance.priority.low":"منخفضة","maintenance.actions.close":"🔧 إغلاق بعد الإصلاح","maintenance.actions.view":"👁️ عرض التقرير","maintenance.actions.delete":"🗑️ حذف التذكرة","maintenance.closeModal.title":"🔧 إغلاق تذكرة الصيانة","maintenance.closeModal.subtitle":"يرجى كتابة تقرير الإصلاح قبل إغلاق هذه التذكرة.","maintenance.closeModal.reportLabel":"📝 تقرير الإصلاح","maintenance.closeModal.reportPlaceholder":"اكتب تفاصيل الإصلاح والإجراءات المتخذة...","maintenance.closeModal.confirm":"إغلاق التذكرة","maintenance.closeModal.cancel":"إلغاء","maintenance.closeModal.saving":"⏳ جاري الإغلاق...","maintenance.toast.equipmentBlocked":"⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً","maintenance.toast.equipmentNotFoundBarcode":"❌ لم يتم العثور على معدة بهذا الباركود","maintenance.toast.equipmentNotFoundName":"❌ لم يتم العثور على معدة بالاسم المدخل","maintenance.toast.equipmentBecameBlocked":"⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها","maintenance.toast.selectEquipment":"⚠️ يرجى اختيار المعدة","maintenance.toast.selectedNotFound":"❌ لم يتم العثور على المعدة المختارة","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ هذه المعدة بالفعل في حالة صيانة","maintenance.toast.ticketExists":"⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة","maintenance.toast.ticketCreated":"🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة","maintenance.toast.storageError":"⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.submitError":"⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.","maintenance.toast.loading":"⏳ يتم تحديث بيانات الصيانة، يرجى الانتظار لحظة...","maintenance.toast.ticketAlreadyClosed":"✅ تم تحديث التذاكر، ويبدو أن هذه التذكرة مغلقة مسبقاً","maintenance.toast.ticketClosed":"✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة","maintenance.toast.ticketDeleted":"🗑️ تم حذف تذكرة الصيانة","maintenance.toast.ticketDeleteConfirm":"⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟","maintenance.toast.reportRequired":"⚠️ يرجى كتابة تقرير الإصلاح قبل الإغلاق","maintenance.prompt.closeReport":"أدخل تقرير الإصلاح / الإجراءات المتخذة:","maintenance.report.equipment":"المعدة","maintenance.report.barcode":"الباركود","maintenance.report.issue":"الوصف","maintenance.report.createdAt":"تاريخ الإنشاء","maintenance.report.closedAt":"تاريخ الإغلاق","maintenance.report.summary":"التقرير","maintenance.report.notAvailable":"غير متوفر","maintenance.report.modalTitle":"📝 تقرير الصيانة","maintenance.report.modalSubtitle":"تفاصيل التذكرة وتقرير الإصلاح.","maintenance.report.modalClose":"تم","maintenance.report.none":"—","maintenance.info.barcodeLabel":"باركود","technicians.section.title":"😎 إدارة طاقم العمل","technicians.form.title":"إضافة / تعديل عضو طاقم","technicians.form.hint":"أدخل بيانات عضو الطاقم ليتم حفظها وتحديثها في سجلات الحجز.","technicians.form.labels.name":"😎 اسم العضو","technicians.form.labels.phone":"📞 الجوال","technicians.form.labels.role":"👔 الوظيفة","technicians.form.labels.department":"🧩 القسم","technicians.form.labels.wage":"💰 الأجر اليومي","technicians.form.labels.status":"⚙️ الحالة الأساسية","technicians.form.labels.notes":"📝 ملاحظات","technicians.form.placeholders.name":"اسم عضو الطاقم","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"مثال: مصور","technicians.form.placeholders.department":"مثال: قسم الصوت","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"معلومات إضافية","technicians.form.actions.cancel":"إلغاء التعديل","technicians.form.actions.submit":"➕ إضافة عضو طاقم","technicians.form.actions.update":"💾 حفظ التعديل","technicians.picker.selectedLabel":"😎 طاقم العمل المشارك","technicians.picker.openButton":"➕ اختيار الطاقم","technicians.picker.editButton":"🔁 تعديل الطاقم","technicians.picker.modalTitle":"😎 اختيار طاقم العمل","technicians.picker.actions.apply":"تم","technicians.form.options.available":"✅ متاح","technicians.form.options.busy":"⛔ مشغول","technicians.search.placeholder":"🔍 ابحث عن عضو الطاقم بالاسم أو الجوال أو الوظيفة...","technicians.search.filters.allRoles":"👔 كل الوظائف","technicians.table.empty":"لا يوجد أعضاء في الطاقم بعد.","technicians.table.loading":"جاري التحميل...","technicians.table.headers.name":"😎 اسم العضو","technicians.table.headers.phone":"📞 الجوال","technicians.table.headers.role":"👔 الوظيفة","technicians.table.headers.department":"🧩 القسم","technicians.table.headers.wage":"💰 الأجر اليومي","technicians.table.headers.status":"⚙️ الحالة","technicians.table.headers.notes":"📝 ملاحظات","technicians.table.headers.actions":"⚙️ الإجراءات","technicians.status.available":"✅ متاح","technicians.status.busy":"⛔ مشغول","technicians.table.wageSuffix":"ريال","technicians.actions.edit":"✏️ تعديل","technicians.actions.delete":"🗑️ حذف","technicians.toast.missingName":"⚠️ يرجى إدخال اسم عضو الطاقم","technicians.toast.missingPhone":"⚠️ يرجى إدخال رقم التواصل","technicians.toast.missingRole":"⚠️ يرجى إدخال الوظيفة","technicians.toast.invalidWage":"⚠️ أدخل قيمة صحيحة للأجر اليومي","technicians.toast.addSuccess":"✅ تم إضافة عضو الطاقم","technicians.toast.updateSuccess":"💾 تم حفظ بيانات عضو الطاقم","technicians.toast.notFound":"⚠️ تعذر العثور على عضو الطاقم المطلوب","technicians.toast.unidentified":"⚠️ تعذر تحديد عضو الطاقم المطلوب","technicians.toast.dataNotFound":"⚠️ تعذر العثور على بيانات عضو الطاقم","technicians.toast.editReady":"✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل","technicians.toast.deleteConfirm":"⚠️ هل أنت متأكد من حذف هذا العضو؟","technicians.toast.deleteSuccess":"🗑️ تم حذف عضو الطاقم"},en:{"dashboard.header.greeting":"👋 Welcome to the Dashboard","dashboard.header.toggleLabel":"Dashboard","dashboard.sidebar.title":"Control Center","dashboard.sidebar.statsHeading":"Today at a Glance","dashboard.sidebar.tabsHeading":"Dashboard Tabs","dashboard.sidebar.quickLinksHeading":"Quick Links","dashboard.hero.title":"Art Ratio","dashboard.actions.addProject":"➕ Add Project","dashboard.metrics.projects.label":"Projects","dashboard.metrics.projects.caption":"Active projects this month","dashboard.metrics.reservations.label":"Reservations","dashboard.metrics.reservations.caption":"Keep track of upcoming events","dashboard.metrics.equipment.label":"Equipment","dashboard.metrics.equipment.caption":"Assets available right now","dashboard.metrics.technicians.label":"Crew Members","dashboard.metrics.technicians.caption":"Team ready for assignments","dashboard.quickLinks.home":"Home","dashboard.quickLinks.projects":"Projects workspace","dashboard.quickLinks.reports":"Project reports","dashboard.quickLinks.users":"User management","tabs.customers":"👤 Clients","tabs.equipment":"🎥 Equipment","tabs.maintenance":"🛠️ Maintenance","tabs.technicians":"😎 Crew","tabs.reservations":"📅 Reservations","actions.close":"Close","actions.cancel":"Cancel","actions.goHome":"🏠 Home","customers.section.title":"📋 Client Management","customers.form.title":"Add / Edit Client","customers.form.hint":"Update client details and they will sync with bookings and invoices.","customers.form.labels.name":"👤 Client","customers.form.labels.phone":"📞 Phone","customers.form.labels.email":"📧 Email","customers.form.labels.address":"📍 Address","customers.form.labels.company":"🏢 Company","customers.form.labels.notes":"📝 Notes","customers.form.placeholders.name":"Client name","customers.form.placeholders.phone":"05xxxxxxxx","customers.form.placeholders.email":"name@email.com","customers.form.placeholders.address":"Client address","customers.form.placeholders.company":"Company name","customers.form.placeholders.notes":"Additional info or reminders","customers.form.actions.cancel":"Cancel edit","customers.form.actions.submit":"➕ Add Client","customers.form.actions.update":"💾 Update Client","customers.search.placeholder":"🔍 Search by name, phone, or company...","customers.table.headers.name":"👤 Client","customers.table.headers.phone":"📞 Phone","customers.table.headers.company":"🏢 Company","customers.table.headers.notes":"📝 Notes","customers.table.headers.actions":"⚙️ Actions","customers.table.loading":"Loading...","customers.table.empty":"No clients found","customers.table.noResults":"No matching results","customers.actions.edit":"✏️ Edit","customers.actions.delete":"🗑️ Delete","customers.toast.updateSuccess":"Client updated successfully","customers.toast.createSuccess":"Client added successfully","customers.toast.missingFields":"Please fill in the name and phone number","customers.toast.deleteConfirm":"⚠️ Are you sure you want to delete this client?","customers.toast.deleteSuccess":"Client removed","equipment.section.title":"🎥 Equipment Management","equipment.actions.clearAll":"🗑️ Clear All","equipment.actions.uploadExcel":"📤 Import from Excel","equipment.form.title":"Add Equipment","equipment.form.hint":"Enter equipment details to store them in the catalog.","equipment.form.labels.description":"📝 Description","equipment.form.placeholders.description":"Equipment description","equipment.form.labels.barcode":"🏷️ Barcode","equipment.form.placeholders.barcode":"Barcode","equipment.form.labels.price":"💵 Price","equipment.form.placeholders.price":"0","equipment.form.labels.quantity":"🔢 Quantity","equipment.form.placeholders.quantity":"1","equipment.form.labels.image":"🖼️ Image URL","equipment.form.placeholders.image":"https://...","equipment.form.labels.category":"📂 Category","equipment.form.placeholders.category":"Category","equipment.form.labels.subcategory":"📑 Subcategory","equipment.form.placeholders.subcategory":"Subcategory","equipment.form.labels.status":"⚙️ Status","equipment.form.options.available":"✅ Available","equipment.form.options.booked":"📌 Booked","equipment.form.options.maintenance":"🛠️ Maintenance","equipment.form.options.retired":"📦 Retired","equipment.form.actions.submit":"➕ Add Equipment","equipment.filters.search":"🔍 Search equipment...","equipment.filters.status.all":"⚙️ Statuses","equipment.filters.category.all":"📂 Categories","equipment.filters.subcategory.all":"📑 Subcategories","equipment.list.title":"📋 All Equipment","equipment.list.loading":"⏳ Loading equipment...","equipment.list.empty":"No equipment has been added yet.","equipment.card.labels.description":"Description","equipment.card.labels.status":"Status","equipment.card.labels.alias":"Name","equipment.card.labels.quantity":"Quantity","equipment.card.labels.price":"Price","equipment.card.labels.category":"Category","equipment.card.labels.subcategory":"Subcategory","equipment.card.labels.barcode":"Barcode","equipment.modal.title":"✏️ Edit Equipment","equipment.modal.placeholders.image":"Paste a direct image link","equipment.modal.actions.cancel":"❌ Cancel","equipment.modal.actions.save":"💾 Save Changes","equipment.toast.xlsxMissing":"⚠️ Excel library (XLSX) is not loaded. Check dashboard.html links","equipment.toast.uploadSuccess":"✅ Equipment imported successfully","equipment.toast.uploadEmpty":"⚠️ The file did not contain any rows to import","equipment.toast.uploadFailed":"❌ Something went wrong while reading the Excel file","equipment.toast.clearConfirm":"⚠️ Are you sure you want to delete all equipment?","equipment.toast.clearSuccess":"🗑️ All equipment cleared","equipment.toast.deleteConfirm":"❌ Are you sure you want to delete this equipment item?","equipment.toast.deleteSuccess":"🗑️ Equipment item deleted","equipment.toast.editSuccess":"✏️ Equipment updated","equipment.toast.addSuccess":"✅ Equipment added","equipment.toast.updateSuccess":"✅ Equipment updated successfully","equipment.toast.missingFields":"⚠️ Please enter the description and barcode","equipment.toast.duplicateBarcode":"⚠️ This barcode is already in use","equipment.list.emptyFiltered":"⚠️ No matching equipment.","equipment.list.countSuffix":"item(s)","equipment.item.imageAlt":"Image","equipment.item.currency":"SAR","equipment.item.actions.edit":"✏️ Edit","equipment.item.actions.delete":"🗑️ Delete","reservations.tabs.create":"➕ Create Reservation","reservations.tabs.mine":"📋 My Reservations","reservations.tabs.reports":"📊 Reports","reservations.tabs.calendar":"📅 Calendar","reservations.create.title":"➕ Create New Reservation","reservations.create.labels.startDate":"📅 Start date","reservations.create.labels.startTime":"⏰ Start time","reservations.create.labels.endDate":"📅 End date","reservations.create.labels.endTime":"⏰ End time","reservations.create.labels.client":"👤 Client","reservations.create.placeholders.client":"Type client name...","reservations.create.labels.project":"📁 Linked project","reservations.create.placeholders.project":"Select a project (optional)","reservations.create.labels.notes":"📝 Notes","reservations.create.placeholders.notes":"Add any additional notes...","reservations.create.equipment.title":"🎥 Add Equipment","reservations.create.equipment.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.create.equipment.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.create.equipment.table.code":"Code","reservations.create.equipment.table.description":"Description","reservations.create.equipment.table.price":"Price","reservations.create.equipment.table.image":"Image","reservations.create.equipment.table.delete":"Delete","reservations.create.billing.title":"💵 Discount & Tax","reservations.create.billing.discount":"Enter discount value","reservations.create.billing.discountPercent":"% Percent","reservations.create.billing.discountAmount":"💵 Amount","reservations.create.billing.companyShare":"🏦 Company share","reservations.create.billing.companyShareToggle":"Include company share (10%)","reservations.create.billing.taxLabel":"Include VAT (15%)","reservations.create.labels.paymentStatus":"💳 Payment status","reservations.create.paymentStatus.paid":"Paid","reservations.create.paymentStatus.unpaid":"Unpaid","reservations.create.actions.submit":"💾 Create reservation","reservations.section.title":"📅 Reservation Management","reservations.crew.none":"No crew members selected yet.","reservations.crew.noneShort":"No crew members selected","reservations.crew.selectedCount":"{count} crew member(s) selected","reservations.crew.fallbackName":"Crew member {id}","reservations.crew.removeAria":"Remove","reservations.crew.searchEmpty":"No matching results.","reservations.create.equipment.noResults":"No matching equipment.","reservations.create.equipment.noneAdded":"No equipment added","reservations.create.equipment.none":"No equipment","reservations.create.summary.currency":"SAR","reservations.create.equipment.imageAlt":"Image","reservations.summary.total":"💰 Total cost: <strong>{total} {currency}</strong>","reservations.summary.totalAfterEdit":"💰 Updated total: <strong>{total} {currency}</strong>","reservations.summary.itemsCount":"📦 Items: {count}","reservations.summary.crewCount":"😎 Crew members: {count}","reservations.summary.companyShareLabel":"🏦 Company share","reservations.summary.taxIncluded":"Includes 15% VAT","reservations.summary.taxExcluded":"VAT not included","reservations.summary.paymentLabel":"💳 Payment status: {status}","reservations.summary.itemsLabel":"📦 Items","reservations.summary.durationLabel":"⏱️ Days","reservations.summary.crewLabel":"😎 Crew","reservations.summary.taxLabelShort":"🧾 VAT","reservations.summary.paymentLabelShort":"💳 Payment status","reservations.summary.taxIncludedValue":"Includes 15%","reservations.summary.taxExcludedValue":"Not included","reservations.summary.totalLabel":"💰 Total cost","reservations.toast.customerNotFound":"⚠️ Customer not found for the entered name","reservations.toast.invalidDateOrder":"⚠️ Start date cannot be after the end date","reservations.toast.reservationMissing":"⚠️ Unable to locate the selected reservation","reservations.list.title":"📋 My Reservations","reservations.list.search.placeholder":"🔍 Search by client name or code...","reservations.list.filters.start":"📅 From date","reservations.list.filters.end":"📅 To date","reservations.list.filters.range.all":"⏱️ All dates","reservations.list.filters.range.today":"📅 Today","reservations.list.filters.range.week":"📆 This week","reservations.list.filters.range.month":"🗓️ This month","reservations.list.filters.status.all":"⚙️ All statuses","reservations.list.filters.status.confirmed":"✅ Confirmed","reservations.list.filters.status.pending":"⏳ Pending","reservations.list.filters.status.completed":"📁 Completed","reservations.list.empty":"⚠️ No reservations yet.","reservations.list.noResults":"🔍 No reservations match the search.","reservations.list.taxIncludedShort":"(Tax included)","reservations.list.unknownCustomer":"Unknown","reservations.list.noNotes":"No notes","reservations.list.project.unlinked":"Not linked to a project","reservations.list.itemsCountShort":"{count} item(s)","reservations.list.crew.separator":", ","reservations.list.status.confirmed":"✅ Confirmed","reservations.list.status.pending":"⏳ Pending","reservations.list.payment.paid":"💳 Paid","reservations.list.payment.unpaid":"💳 Unpaid","reservations.list.status.completed":"📁 Completed","reservations.list.ribbon.completed":"Completed","reservations.list.actions.confirm":"✔️ Confirm","reservations.list.labels.client":"👤 Client","reservations.list.labels.project":"📁 Project","reservations.edit.modalTitle":"✏️ Edit Reservation","reservations.edit.labels.id":"🆔 Reservation ID","reservations.edit.labels.customer":"👤 Customer","reservations.edit.labels.project":"📁 Linked project","reservations.edit.labels.startDate":"📅 Start date","reservations.edit.labels.startTime":"⏰ Start time","reservations.edit.labels.endDate":"📅 End date","reservations.edit.labels.endTime":"⏰ End time","reservations.edit.labels.discount":"💵 Discount","reservations.edit.placeholders.discount":"Enter discount value","reservations.edit.discount.percent":"% Percent","reservations.edit.discount.amount":"💵 Amount","reservations.edit.labels.tax":"Include VAT (15%)","reservations.edit.labels.confirmed":"✅ Confirmed","reservations.edit.labels.paymentStatus":"💳 Payment status","reservations.edit.payment.paid":"Paid","reservations.edit.payment.unpaid":"Unpaid","reservations.edit.labels.notes":"📝 Notes","reservations.edit.placeholders.notes":"Add any notes...","reservations.edit.labels.addEquipment":"🎥 Add equipment","reservations.edit.project.missing":"⚠️ Project unavailable (deleted)","reservations.edit.placeholders.barcode":"🔍 Scan or enter a barcode then press Enter","reservations.edit.placeholders.description":"🎥 Type the equipment name then press Enter","reservations.edit.table.headers.code":"Code","reservations.edit.table.headers.description":"Description","reservations.edit.table.headers.price":"Price","reservations.edit.table.headers.quantity":"Qty","reservations.edit.table.headers.image":"Image","reservations.edit.table.headers.delete":"Delete","reservations.edit.table.empty":"No equipment","reservations.edit.actions.save":"💾 Save changes","reservations.list.labels.start":"🗓️ Start","reservations.list.labels.end":"🗓️ End","reservations.list.labels.cost":"💵 Cost","reservations.list.labels.equipment":"📦 Equipment","reservations.list.labels.crew":"😎 Crew","reservations.details.labels.discount":"Discount","reservations.details.labels.companyShare":"🏦 Company share","reservations.details.labels.netProfit":"💵 Net profit","reservations.details.labels.subtotalAfterDiscount":"Subtotal","reservations.details.labels.tax":"Tax (15%)","reservations.details.labels.crewTotal":"Crew total","reservations.details.table.headers.code":"Code","reservations.details.table.headers.description":"Description","reservations.details.table.headers.quantity":"Qty","reservations.details.table.headers.price":"Price","reservations.details.table.headers.image":"Image","reservations.details.noItems":"📦 No equipment is linked to this reservation yet.","reservations.details.noCrew":"😎 No crew assigned to this reservation.","reservations.details.project.unlinked":"Not linked to any project.","reservations.details.technicians.roleUnknown":"Not specified","reservations.details.technicians.phoneUnknown":"Not available","reservations.details.technicians.wage":"{amount} {currency} / day","reservations.details.labels.id":"🆔 Reservation ID","reservations.details.section.bookingInfo":"Booking details","reservations.details.section.statusSummary":"Status summary","reservations.details.section.paymentSummary":"💳 Payment summary","reservations.details.labels.finalTotal":"Final total","reservations.details.section.crew":"😎 Crew members","reservations.details.crew.count":"{count} member(s)","reservations.details.section.items":"📦 Linked equipment","reservations.details.items.count":"{count} item(s)","reservations.details.actions.edit":"✏️ Edit","reservations.details.actions.delete":"🗑️ Delete","reservations.details.actions.openProject":"📁 Open project","reservations.details.labels.customer":"Customer","reservations.details.labels.contact":"Contact","reservations.details.labels.start":"Start","reservations.details.labels.end":"End","reservations.details.labels.notes":"Notes","reservations.details.labels.itemsCount":"Equipment count","reservations.details.labels.itemsTotal":"Equipment total","reservations.details.labels.paymentStatus":"Payment status","reservations.details.modalTitle":"📋 Reservation Details","reservations.calendar.title":"📅 Calendar","reservations.reports.title":"Performance reports","reservations.reports.subtitle":"A holistic view of reservations, revenue, and utilization for the selected period.","reservations.reports.filters.rangeLabel":"Period","reservations.reports.filters.range.last30":"Last 30 days","reservations.reports.filters.range.thisWeek":"This week","reservations.reports.filters.range.thisMonth":"This month","reservations.reports.filters.range.thisQuarter":"This quarter","reservations.reports.filters.range.thisYear":"This year","reservations.reports.filters.range.all":"All time","reservations.reports.filters.range.custom":"Custom","reservations.reports.filters.startLabel":"From","reservations.reports.filters.endLabel":"To","reservations.reports.filters.statusLabel":"Status","reservations.reports.filters.status.all":"All statuses","reservations.reports.filters.status.confirmed":"Confirmed","reservations.reports.filters.status.pending":"Pending confirmation","reservations.reports.filters.status.completed":"Completed","reservations.reports.filters.paymentLabel":"Payment","reservations.reports.filters.payment.all":"All","reservations.reports.filters.payment.paid":"Paid","reservations.reports.filters.payment.unpaid":"Unpaid","reservations.reports.filters.shareLabel":"Company share","reservations.reports.filters.share.all":"All","reservations.reports.filters.share.with":"With company share","reservations.reports.filters.share.without":"Without company share","reservations.reports.filters.searchLabel":"Search","reservations.reports.filters.searchPlaceholder":"Search by customer, reservation number, or equipment...","reservations.reports.actions.refresh":"Refresh","reservations.reports.actions.customizeColumns":"Customize columns","reservations.reports.actions.exportPdf":"Export PDF","reservations.reports.actions.exportExcel":"Export Excel","reservations.reports.actions.exportCsv":"Export CSV","reservations.reports.kpi.total.label":"Total reservations","reservations.reports.kpi.total.meta":"No data recorded yet","reservations.reports.kpi.revenue.label":"Total revenue","reservations.reports.kpi.revenue.meta":"Net profit {net} • Company share {share} • Average reservation {average}","reservations.reports.kpi.confirmation.label":"Confirmation rate","reservations.reports.kpi.confirmation.meta":"Confirmed reservations —","reservations.reports.kpi.paid.label":"Paid ratio","reservations.reports.kpi.paid.meta":"Paid reservations —","reservations.reports.kpi.total.dynamicMeta":"Includes {count} completed","reservations.reports.kpi.revenue.average":"Average reservation value {value}","reservations.reports.kpi.confirmed.detail":"{count} confirmed reservations","reservations.reports.kpi.paid.detail":"{count} paid reservations","reservations.reports.status.loading":"Loading reports...","reservations.reports.status.loadingHint":"This may take a few seconds.","reservations.reports.status.retry":"Try refreshing or reloading the page.","reservations.reports.status.confirmedLabel":"Confirmed","reservations.reports.status.pendingLabel":"Pending confirmation","reservations.reports.status.completedLabel":"Completed","reservations.reports.payment.paidLabel":"Paid","reservations.reports.payment.unpaidLabel":"Unpaid","reservations.reports.progress.empty":"No data to display.","reservations.reports.progress.meta":"{count} reservations","reservations.reports.chart.volume.title":"Monthly booking performance","reservations.reports.chart.volume.hint":"Bookings and revenue over the past months.","reservations.reports.chart.volume.series.reservations":"Reservations","reservations.reports.chart.volume.series.revenue":"Revenue (SAR)","reservations.reports.chart.volume.series.net":"Net profit (SAR)","reservations.reports.chart.status.title":"Status distribution","reservations.reports.chart.status.hint":"Share of confirmed, pending, and completed reservations.","reservations.reports.chart.status.statusLabel":"Status","reservations.reports.chart.status.paymentLabel":"Payment","reservations.reports.chart.payment.title":"Payment status","reservations.reports.chart.payment.hint":"Paid vs unpaid reservations at a glance.","reservations.reports.topCustomers.title":"Top customers","reservations.reports.topCustomers.hint":"By total revenue","reservations.reports.topCustomers.headers.customer":"Customer","reservations.reports.topCustomers.headers.count":"Reservations","reservations.reports.topCustomers.headers.revenue":"Total revenue","reservations.reports.topCustomers.unknown":"Unknown customer","reservations.reports.table.empty":"No data available","reservations.reports.table.emptyPeriod":"No data for this period.","reservations.reports.results.title":"Reservation details","reservations.reports.results.hint":"Latest reservations matching the current filters","reservations.reports.results.headers.id":"Reservation","reservations.reports.results.headers.customer":"Customer","reservations.reports.results.headers.date":"Date","reservations.reports.results.headers.status":"Status","reservations.reports.results.headers.payment":"Payment","reservations.reports.results.headers.total":"Total","reservations.reports.results.headers.share":"Company share","reservations.reports.results.headers.net":"Net profit","reservations.reports.results.share.none":"No company share","reservations.reports.topEquipment.title":"Most used equipment","reservations.reports.topEquipment.hint":"Total bookings","reservations.reports.topEquipment.headers.item":"Equipment","reservations.reports.topEquipment.headers.usage":"Usage count","reservations.reports.topEquipment.headers.revenue":"Linked revenue","reservations.reports.topEquipment.unknown":"Unnamed equipment","reservations.reports.empty.title":"No data matches the current filters","reservations.reports.empty.subtitle":"Try adjusting the date range or removing filters to see more results.","calendar.buttons.today":"Today","calendar.buttons.month":"Month","calendar.buttons.week":"Week","calendar.buttons.day":"Day","calendar.badges.confirmed":"Confirmed","calendar.badges.pending":"Pending","calendar.badges.paid":"Paid","calendar.badges.unpaid":"Unpaid","calendar.badges.completed":"Completed","calendar.labels.unknownCustomer":"Unknown","calendar.labels.unknownEquipment":"Unnamed equipment","calendar.labels.currencySuffix":"SAR","calendar.labels.noEquipment":"No equipment","calendar.labels.noNotes":"No notes","calendar.labels.reservationId":"Reservation ID","calendar.labels.customer":"Customer","calendar.labels.start":"Start","calendar.labels.end":"End","calendar.labels.notes":"Notes","calendar.sections.crew":"😎 Crew members","calendar.sections.equipment":"📦 Equipment","calendar.emptyStates.noCrew":"😎 No crew assigned to this reservation.","calendar.table.headers.barcode":"Barcode","calendar.table.headers.description":"Description","calendar.table.headers.quantity":"Qty","calendar.table.headers.price":"Price","calendar.table.headers.image":"Image","calendar.summary.baseCost":"💵 Equipment subtotal: <strong>{value} SAR</strong>","calendar.summary.discount":"💸 Discount: <strong>{value}</strong>","calendar.summary.tax":"🧾 Tax (15%): <strong>{value} SAR</strong>","calendar.summary.total":"💰 Grand total: <strong>{value} SAR</strong>","calendar.alerts.cannotShowDetails":"Unable to show reservation details","calendar.alerts.cannotOpenModal":"Unable to open details modal","calendar.modal.title":"📅 Reservation Details","reservations.toast.equipmentNameNotFound":"❌ No equipment found with that name","reservations.toast.equipmentMaintenance":"⚠️ This equipment is under maintenance and cannot be added","reservations.toast.equipmentMissingBarcode":"⚠️ This equipment has no barcode assigned","reservations.toast.requireDatesBeforeAdd":"⚠️ Set start and end date/time before adding equipment","reservations.toast.equipmentDuplicate":"⚠️ This equipment is already in the reservation","reservations.toast.equipmentTimeConflict":"⚠️ Cannot add equipment because it is booked in the same period","reservations.toast.equipmentMaintenanceStrict":"⚠️ Cannot add equipment while it is marked for maintenance","reservations.toast.requireOverallDates":"⚠️ Set the reservation dates before adding equipment","reservations.toast.equipmentTimeConflictSimple":"⚠️ This equipment is booked in the same period","reservations.toast.barcodeNotFound":"❌ Barcode not found","reservations.toast.equipmentAdded":"✅ Equipment added successfully","reservations.toast.barcodeNotInCatalog":"❌ Barcode not found in catalog","reservations.toast.requireDates":"⚠️ Please set start and end date","reservations.toast.invalidDateRange":"⚠️ Make sure start time is before end time","reservations.toast.missingFields":"⚠️ Please fill in all required fields","reservations.toast.noItems":"⚠️ Add at least one equipment item or crew member to the reservation","reservations.toast.cannotCreateEquipmentMaintenance":"⚠️ Cannot create reservation because an item is under maintenance","reservations.toast.cannotCreateEquipmentConflict":"⚠️ Cannot create reservation because an item is already booked","reservations.toast.cannotCreateCrewConflict":"⚠️ Cannot create reservation because a crew member has another booking in that period","reservations.toast.projectNotFound":"⚠️ Selected project was not found. Please refresh the page or choose another project.","reservations.toast.technicianSelectionConflict":"⚠️ Cannot select {names}; they are already booked for the selected time range","reservations.toast.created":"✅ Reservation created","reservations.toast.notFound":"⚠️ Unable to locate reservation data","reservations.toast.updateNoItems":"⚠️ Add at least one equipment item or crew member before saving","reservations.toast.updateEquipmentMaintenance":"⚠️ Cannot save changes because an item is under maintenance","reservations.toast.updateEquipmentConflict":"⚠️ Cannot save changes because an item conflicts with another booking","reservations.toast.updateCrewConflict":"⚠️ Cannot save changes because a crew member conflicts with another booking","reservations.toast.updated":"✅ Reservation updated","reservations.toast.confirmed":"✅ Reservation confirmed","reservations.toast.confirmBlockedByProject":"⚠️ This reservation is controlled by its linked project and cannot be confirmed here","reservations.toast.deleteConfirm":"⚠️ Are you sure you want to delete this reservation?","maintenance.section.title":"🛠️ Maintenance Management","maintenance.form.title":"➕ Create Maintenance Ticket","maintenance.form.hint":"Select the affected equipment and describe the issue to take it out of service.","maintenance.form.labels.barcode":"🏷️ Barcode","maintenance.form.placeholders.barcode":"🖨️ Scan or enter the barcode, then press Enter","maintenance.form.labels.search":"🎥 Search by equipment name","maintenance.form.placeholders.search":"Type the equipment name...","maintenance.form.labels.priority":"⚠️ Priority","maintenance.form.options.priority.high":"High","maintenance.form.options.priority.medium":"Medium","maintenance.form.options.priority.low":"Low","maintenance.form.selectedInfo":"No equipment selected yet.","maintenance.form.labels.issue":"📝 Issue description","maintenance.form.placeholders.issue":"Describe the issue or symptoms for the equipment","maintenance.form.actions.submit":"🛠️ Create Ticket","maintenance.form.blockedSuffix":"(In maintenance)","maintenance.list.title":"📋 Maintenance Tickets","maintenance.list.hint":"Track issues and close tickets once repairs are completed.","maintenance.filters.status.label":"Status","maintenance.filters.status.all":"All statuses","maintenance.filters.status.open":"In maintenance","maintenance.filters.status.closed":"Closed","maintenance.table.headers.equipment":"Equipment","maintenance.table.headers.issue":"Issue","maintenance.table.headers.priority":"Priority","maintenance.table.headers.created":"Created At","maintenance.table.headers.status":"Status","maintenance.table.headers.actions":"Actions","maintenance.table.empty":"No tickets yet.","maintenance.table.emptyFiltered":"No tickets match this filter.","maintenance.table.noName":"No name","maintenance.empty.title":"No maintenance tickets","maintenance.empty.subtitle":"Once you create a new ticket it will appear here.","maintenance.table.noBarcode":"No barcode","maintenance.stats.open":"{count} in maintenance","maintenance.stats.closed":"{count} closed","maintenance.stats.total":"{count} total tickets","maintenance.stats.summaryTitle":"Maintenance Summary","maintenance.stats.totalLabel":"Total Tickets","maintenance.status.open":"In maintenance","maintenance.status.closed":"Closed","maintenance.status.inProgress":"In progress","maintenance.status.completed":"Completed","maintenance.status.cancelled":"Cancelled","maintenance.priority.high":"High","maintenance.priority.medium":"Medium","maintenance.priority.low":"Low","maintenance.actions.close":"🔧 Close after repair","maintenance.actions.view":"👁️ View report","maintenance.actions.delete":"🗑️ Delete ticket","maintenance.closeModal.title":"🔧 Close maintenance ticket","maintenance.closeModal.subtitle":"Please add a repair report before closing this ticket.","maintenance.closeModal.reportLabel":"📝 Repair report","maintenance.closeModal.reportPlaceholder":"Describe the repair work and actions taken...","maintenance.closeModal.confirm":"Close ticket","maintenance.closeModal.cancel":"Cancel","maintenance.closeModal.saving":"⏳ Closing...","maintenance.toast.equipmentBlocked":"⚠️ This equipment is already under maintenance and can’t be selected","maintenance.toast.equipmentNotFoundBarcode":"❌ No equipment found with this barcode","maintenance.toast.equipmentNotFoundName":"❌ No equipment found with that name","maintenance.toast.equipmentBecameBlocked":"⚠️ This equipment is now under maintenance and can’t be selected","maintenance.toast.selectEquipment":"⚠️ Please select equipment","maintenance.toast.selectedNotFound":"❌ Selected equipment was not found","maintenance.toast.equipmentAlreadyMaintenance":"⚠️ This equipment is already marked as in maintenance","maintenance.toast.ticketExists":"⚠️ There is already an open maintenance ticket for this equipment","maintenance.toast.ticketCreated":"🛠️ Maintenance ticket created and equipment removed from service","maintenance.toast.storageError":"⚠️ Could not save maintenance data. Please try again.","maintenance.toast.submitError":"⚠️ Could not create the maintenance ticket. Please try again.","maintenance.toast.loading":"⏳ Maintenance data is refreshing, please wait a moment...","maintenance.toast.ticketAlreadyClosed":"✅ Tickets refreshed; this maintenance item appears to be already closed.","maintenance.toast.reportRequired":"⚠️ Please write the repair report before closing the ticket","maintenance.toast.ticketClosed":"✅ Maintenance ticket closed and equipment set to available","maintenance.toast.ticketDeleted":"🗑️ Maintenance ticket deleted","maintenance.toast.ticketDeleteConfirm":"⚠️ Are you sure you want to delete this maintenance ticket?","maintenance.prompt.closeReport":"Enter repair report / actions taken:","maintenance.report.equipment":"Equipment","maintenance.report.barcode":"Barcode","maintenance.report.issue":"Issue","maintenance.report.createdAt":"Created at","maintenance.report.closedAt":"Closed at","maintenance.report.summary":"Report","maintenance.report.notAvailable":"Not available","maintenance.report.modalTitle":"📝 Maintenance Report","maintenance.report.modalSubtitle":"Ticket details and repair report.","maintenance.report.modalClose":"Done","maintenance.report.none":"—","maintenance.info.barcodeLabel":"Barcode","technicians.section.title":"😎 Crew Management","technicians.form.title":"Add / Edit Crew Member","technicians.form.hint":"Enter crew member details to save and keep bookings updated.","technicians.form.labels.name":"😎 Crew Member","technicians.form.labels.phone":"📞 Phone","technicians.form.labels.role":"👔 Role","technicians.form.labels.department":"🧩 Department","technicians.form.labels.wage":"💰 Daily Rate","technicians.form.labels.status":"⚙️ Base Status","technicians.form.labels.notes":"📝 Notes","technicians.form.placeholders.name":"Crew member name","technicians.form.placeholders.phone":"05xxxxxxxx","technicians.form.placeholders.role":"e.g. Camera operator","technicians.form.placeholders.department":"e.g. Audio team","technicians.form.placeholders.wage":"0","technicians.form.placeholders.notes":"Additional information","technicians.form.actions.cancel":"Cancel edit","technicians.form.actions.submit":"➕ Add Crew Member","technicians.form.actions.update":"💾 Update Crew Member","technicians.picker.selectedLabel":"😎 Assigned crew","technicians.picker.openButton":"➕ Choose crew","technicians.picker.editButton":"🔁 Edit crew","technicians.picker.modalTitle":"😎 Select crew","technicians.picker.actions.apply":"Done","technicians.form.options.available":"✅ Available","technicians.form.options.busy":"⛔ Busy","technicians.search.placeholder":"🔍 Search crew member by name, phone, or role...","technicians.search.filters.allRoles":"👔 All roles","technicians.table.empty":"No crew members yet.","technicians.table.loading":"Loading...","technicians.table.headers.name":"😎 Crew Member","technicians.table.headers.phone":"📞 Phone","technicians.table.headers.role":"👔 Role","technicians.table.headers.department":"🧩 Department","technicians.table.headers.wage":"💰 Daily Rate","technicians.table.headers.status":"⚙️ Status","technicians.table.headers.notes":"📝 Notes","technicians.table.headers.actions":"⚙️ Actions","technicians.status.available":"✅ Available","technicians.status.busy":"⛔ Busy","technicians.table.wageSuffix":"SAR","technicians.actions.edit":"✏️ Edit","technicians.actions.delete":"🗑️ Delete","technicians.toast.missingName":"⚠️ Please enter the crew member name","technicians.toast.missingPhone":"⚠️ Please enter a contact number","technicians.toast.missingRole":"⚠️ Please enter the role","technicians.toast.invalidWage":"⚠️ Enter a valid daily wage","technicians.toast.addSuccess":"✅ Crew member added","technicians.toast.updateSuccess":"💾 Crew member updated","technicians.toast.notFound":"⚠️ Crew member not found","technicians.toast.unidentified":"⚠️ Unable to identify crew member","technicians.toast.dataNotFound":"⚠️ Crew member details not found","technicians.toast.editReady":"✏️ You can edit the crew member details now then press Save","technicians.toast.deleteConfirm":"⚠️ Are you sure you want to remove this crew member?","technicians.toast.deleteSuccess":"🗑️ Crew member removed"}});function Ze(e={}){return e.image||e.imageUrl||e.img||""}function Is(e){if(!e)return null;const t=X(e),{equipment:n=[]}=Y();return(n||[]).find(a=>X(a?.barcode)===t)||null}function Wt(e){const t=X(e);if(!t)return null;const{equipment:n=[]}=Y();return(n||[]).find(a=>X(a?.barcode)===t)||null}function $e(e){return Wt(e)?.status==="صيانة"}let $t=null,Rn=[],Dt=new Map,Pt=new Map;function _n(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Xt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Mn(e,t,{allowPartial:n=!1}={}){const a=te(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,l)=>{l.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function jt(e,t={}){return Mn(Dt,e,t)}function Bt(e,t={}){return Mn(Pt,e,t)}function Ae(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid"),n==="paid"?e.classList.add("payment-status-select--paid"):e.classList.add("payment-status-select--unpaid")}function Fn(e){Rn=Array.isArray(e)?[...e]:[]}function Yt(){return Rn}function Zt(e){return e&&Yt().find(t=>String(t.id)===String(e))||null}function vn(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function We(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??se,a=b(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:se}function de(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??se,a=b(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=se),t.dataset.companyShare=String(s),t.checked=!0}function As(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function bn(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function gn(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function be({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Gt();if(!n||!a||!s)return;const r=Kt()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),l=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const c=new Set;Dt=new Map;const d=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:gn(p)||l})).filter(p=>{if(!p.label)return!1;const v=te(p.label);return!v||c.has(v)?!1:(c.add(v),Dt.set(v,p),!0)}).sort((p,v)=>p.label.localeCompare(v.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(p=>`<option value="${_n(p.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",y=m?r.find(p=>String(p.id)===m):null;if(y){const p=gn(y)||l;a.value=String(y.id),n.value=p,n.dataset.selectedId=String(y.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Je({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Xt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Yt()||[],l=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",l);const c=[...i].filter(w=>w&&w.id!=null).sort((w,q)=>String(q.createdAt||q.start||"").localeCompare(String(w.createdAt||w.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Pt=new Map;const y=c.map(w=>{const q=vn(w)||u;return{id:String(w.id),label:q}}).filter(w=>{if(!w.label)return!1;const q=te(w.label);return!q||m.has(q)?!1:(m.add(q),Pt.set(q,w),!0)});r.innerHTML=y.map(w=>`<option value="${_n(w.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",v=p?c.find(w=>String(w.id)===p):null;if(v){const w=vn(v)||u;s.value=String(v.id),a.value=w,a.dataset.selectedId=String(v.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function lt(e,t,n){const{date:a,time:s}=An(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const l=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,l)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const l=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,l)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Hn(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Je({selectedValue:a});const r=(Kt()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";be(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const l=bn(e,"start"),c=bn(e,"end");l&&lt("res-start","res-start-time",l),c&&lt("res-end","res-end-time",c);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),Te(),Q()}function zn({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Y(),s=Array.isArray(a)?a:[];Fn(s);const r=t!=null?String(t):n.value?String(n.value):"";Je({selectedValue:r,projectsList:s}),Te(),Q()}function Te(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Jt(){const{input:e,hidden:t}=Xt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Bt(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Zt(r.id);i?Hn(i,{skipProjectSelectUpdate:!0}):(Te(),Q())}else t.value="",e.dataset.selectedId="",Te(),Q()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Bt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function en(){const{input:e,hidden:t}=Gt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?jt(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),Q()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?jt(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ts(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t)return;let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),!n||!n.projectId)return;document.getElementById("res-project")&&(Je({selectedValue:String(n.projectId)}),Te());const i=Zt(n.projectId);if(i?Hn(i,{forceNotes:!!n.forceNotes}):Q(),n.start&&lt("res-start","res-start-time",n.start),n.end&&lt("res-end","res-end-time",n.end),n.customerId){const c=(Kt()||[]).find(d=>String(d.id)===String(n.customerId));c?.id!=null&&be({selectedValue:String(c.id)})}else be({selectedValue:""})}function ht(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Ke(e,n),end:Ke(t,a)}}function On(e){const t=te(e);if(!t)return null;const n=jn()||[],a=n.find(s=>te(s?.desc||s?.description||"")===t);return a||n.find(s=>te(s?.desc||s?.description||"").includes(t))||null}function Un(e,t="equipment-description-options"){const n=te(e);if(!n)return!1;const a=document.getElementById(t);return a&&a.options&&Array.from(a.options).some(i=>te(i.value)===n)?!0:(jn()||[]).some(r=>te(r?.desc||r?.description||"")===n)}function De(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),{equipment:n=[]}=Y(),a=Array.isArray(n)?n:[];vs(a);const r=Array.from(new Set(a.map(i=>i?.desc||i?.description||"").filter(Boolean))).sort((i,l)=>i.localeCompare(l,"ar",{sensitivity:"base"})).map(i=>`<option value="${i}"></option>`).join("");e&&(e.innerHTML=r),t&&(t.innerHTML=r)}function At(e,t){const n=X(e);if(!n)return!1;const{start:a,end:s}=ht();if(!a||!s)return A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Ye().some(l=>X(l.barcode)===n))return A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Le(n,a,s))return A(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=Wt(n);return i?$e(i.barcode)?(A(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً")),!1):(Tn({id:i.id,equipmentId:i.id,barcode:n,desc:i.desc,qty:1,price:i.price,image:Ze(i)}),t&&(t.value=""),Pe(),Q(),A(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(A(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1)}function Nt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=On(t);if(!n){A(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if(Is(n.barcode)?.status==="صيانة"){A(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const s=X(n.barcode);if(!s){A(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const r={id:n.id,equipmentId:n.id,barcode:s,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Ze(n)},{start:i,end:l}=ht();if(!i||!l){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Ye().some(u=>X(u.barcode)===s)){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Le(s,i,l)){A(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}if($e(s)){A(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}Tn(r),Pe(),Q(),e.value=""}function Ls(){De();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Nt(e))});const t=()=>{Un(e.value,"equipment-description-options")&&Nt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Pe(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ye(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","ريال"),r=o("reservations.create.equipment.imageAlt","صورة");if(n.length===0){t.innerHTML=`<tr><td colspan="5">${a}</td></tr>`;return}t.innerHTML=n.map((i,l)=>{const c=Ze(i),d=`${b(String(i.price??0))} ${s}`,u=c?`<img src="${c}" alt="${r}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${i.barcode||"-"}</td>
          <td>${i.desc}</td>
          <td>${d}</td>
          <td>${u}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-item" data-index="${l}">🗑️</button></td>
        </tr>
      `}).join("")}function Q(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(b(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,i=document.getElementById("res-payment-status")?.value||"unpaid",{start:l,end:c}=ht();r&&de();const d=We(),u=document.getElementById("res-payment-status");Ae(u,i),ls({selectedItems:Ye(),discount:t,discountType:n,applyTax:r,paidStatus:i,start:l,end:c,companySharePercent:d})}function $s(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",r=>{r.target.value=b(r.target.value),Q()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",Q),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{n.checked&&de(),Q()}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.checked?a.dataset.companyShare||(a.dataset.companyShare=String(se)):n?.checked&&de(),Q()}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{Ae(s),Q()}),s.dataset.listenerAttached="true"),Ae(s)}function Ds(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){Q();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),Q()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function yn(){const{input:e,hidden:t}=Gt(),{input:n,hidden:a}=Xt(),{customers:s}=Y();let r=t?.value?String(t.value):"";if(!r&&e?.value){const $=jt(e.value,{allowPartial:!0});$&&(r=String($.id),t&&(t.value=r),e.value=$.label,e.dataset.selectedId=r)}const i=s.find($=>String($.id)===r);if(!i){A(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const l=i.id;let c=a?.value?String(a.value):"";if(!c&&n?.value){const $=Bt(n.value,{allowPartial:!0});$&&(c=String($.id),a&&(a.value=c),n.value=$.label,n.dataset.selectedId=c)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",y=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){A(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${d}T${m}`,v=`${u}T${y}`,w=new Date(p),q=new Date(v);if(Number.isNaN(w.getTime())||Number.isNaN(q.getTime())||w>=q){A(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const h=us(),g=Ye();if(g.length===0&&h.length===0){A(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const D=document.getElementById("res-notes")?.value||"",j=parseFloat(b(document.getElementById("res-discount")?.value))||0,R=document.getElementById("res-discount-type")?.value||"percent",f=document.getElementById("res-payment-status")?.value||"unpaid",x=c?Zt(c):null,T=As(x);if(c&&!x){A(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const $ of g)if($e($.barcode)){A(o("reservations.toast.cannotCreateEquipmentMaintenance","⚠️ لا يمكن إتمام الحجز لأن إحدى المعدات قيد الصيانة"));return}for(const $ of g){const z=X($.barcode);if(Le(z,p,v)){A(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const $ of h)if(Ln($,p,v)){A(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const H=document.getElementById("res-tax"),k=!!c?!1:H?.checked||!1,I=$n(g,j,R,k,h,{start:p,end:v});k&&de();let F=We();k&&(!Number.isFinite(F)||F<=0)&&(de(),F=We());const C=k||Number.isFinite(F)&&F>0,P=rs(),B=Dn({reservationCode:P,customerId:l,start:p,end:v,status:T?"confirmed":"pending",title:null,location:null,notes:D,projectId:c||null,totalAmount:I,discount:j,discountType:R,applyTax:k,paidStatus:f,confirmed:T,items:g.map($=>({...$,equipmentId:$.equipmentId??$.id})),technicians:h,companySharePercent:C?F:null,companyShareEnabled:C});try{const $=await ms(B);ps(),De(),ft(),Ps(),A(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof $t=="function"&&$t({type:"created",reservation:$})}catch($){console.error("❌ [reservations/createForm] Failed to create reservation",$);const z=Pn($)?$.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");A(z,"error")}}function Ps(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),be({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),Je({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const l=document.getElementById("res-payment-status");l&&(l.value="unpaid",Ae(l,"unpaid")),fs(),hs([]),Pe(),Te(),Q()}function js(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('button[data-action="remove-item"]');if(!n)return;const a=Number(n.dataset.index);ds(a),Pe(),Q()}),e.dataset.listenerAttached="true")}function Bs(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),At(e.value,e))});let t=null;const n=()=>{clearTimeout(t);const a=e.value;if(!a?.trim())return;const{start:s,end:r}=ht();!s||!r||(t=setTimeout(()=>{At(a,e)},150))};e.addEventListener("input",n),e.addEventListener("change",()=>At(e.value,e)),e.dataset.listenerAttached="true"}function Ns(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await yn()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await yn()}),t.dataset.listenerAttached="true")}function Jr({onAfterSubmit:e}={}){$t=typeof e=="function"?e:null;const{customers:t,projects:n}=Y();cs(t||[]),be(),en(),Fn(n||[]),zn({projectsList:n}),Jt(),De(),Ls(),Ds(),$s(),js(),Bs(),Ns(),Ts(),Q(),Pe()}function Vn(){De(),zn(),be(),en(),Jt(),Pe(),Q()}if(typeof document<"u"){const e=()=>{be(),Je({projectsList:Yt()}),en(),Jt(),Q()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}function Qn(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Se(t),endDate:Se(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Se(n),endDate:Se(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Se(n),endDate:Se(a)}}return e==="upcoming"?{startDate:Se(t),endDate:""}:{startDate:"",endDate:""}}function Rs(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=b(t?.value||"").trim(),i=b(n?.value||"").trim(),l=a?.value||"";if(new Set(["","today","week","month"]).has(l)||(l="",a&&(a.value=""),ct(t),ct(n),r="",i=""),!r&&!i&&l){const d=Qn(l);r=d.startDate,i=d.endDate}return{searchTerm:te(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:l}}function eo(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=b(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const c=document.getElementById("reservation-date-range");c&&(c.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{_s(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const l=document.getElementById("clear-filters");l&&!l.dataset.listenerAttached&&(l.addEventListener("click",()=>{n&&(n.value=""),ct(a),ct(s),r&&(r.value=""),i&&(i.value=""),t()}),l.dataset.listenerAttached="true")}function _s(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Qn(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Se(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ct(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Ms({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((h,g)=>({reservation:h,index:g})),i=t.searchTerm||"",l=t.searchReservationId||"",c=t.searchCustomerName||"",d=t.startDate||"",u=t.endDate||"",m=t.status||"",y=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,p=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,v=d?new Date(`${d}T00:00:00`):null,w=u?new Date(`${u}T23:59:59`):null,q=r.filter(({reservation:h})=>{const g=n.get(String(h.customerId)),D=s?.get?.(String(h.projectId)),j=h.start?new Date(h.start):null,R=Qe(h),{effectiveConfirmed:f}=xe(h,D);if(y!=null&&String(h.customerId)!==String(y)||p!=null&&!(Array.isArray(h.technicians)?h.technicians.map(k=>String(k)):[]).includes(String(p))||m==="confirmed"&&!f||m==="pending"&&f||m==="completed"&&!R||v&&j&&j<v||w&&j&&j>w||l&&!te([h.reservationId,h.id].filter(Boolean).map(String).join(" ")).includes(l)||c&&!te(g?.customerName||"").includes(c))return!1;if(!i)return!0;const x=h.items?.map?.(L=>`${L.barcode} ${L.desc}`).join(" ")||"",T=(h.technicians||[]).map(L=>a.get(String(L))?.name).filter(Boolean).join(" ");return te([h.reservationId,g?.customerName,h.notes,x,T,D?.title].filter(Boolean).join(" ")).includes(i)});return q.sort((h,g)=>{const D=Qe(h.reservation),j=Qe(g.reservation);if(D!==j)return D?1:-1;const R=h.reservation.start?new Date(h.reservation.start).getTime():0;return(g.reservation.start?new Date(g.reservation.start).getTime():0)-R}),q}function Fs({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","ريال"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),l=o("reservations.list.noNotes","لا توجد ملاحظات"),c=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),m=o("reservations.list.status.pending","⏳ غير مؤكد"),y=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),v=o("reservations.list.actions.confirm","✔️ تأكيد"),w=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),q=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),h={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:g,index:D})=>{const j=t.get(String(g.customerId)),R=g.projectId?a?.get?.(String(g.projectId)):null,f=Qe(g),x=g.paid===!0||g.paid==="paid",{effectiveConfirmed:T,projectLinked:H}=xe(g,R),L=T?"status-confirmed":"status-pending",k=x?"status-paid":"status-unpaid";let I=`<span class="reservation-chip status-chip ${L}">${T?u:m}</span>`,F=`<span class="reservation-chip status-chip ${k}">${x?y:p}</span>`,C=x?" tile-paid":" tile-unpaid";f&&(C+=" tile-completed");let P="";f&&(I=`<span class="reservation-chip status-chip status-completed">${u}</span>`,F=`<span class="reservation-chip status-chip status-completed">${x?y:p}</span>`,P=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const B=!H&&!T?`<button class="tile-confirm" data-reservation-index="${D}" data-action="confirm">${v}</button>`:"",$=B?`<div class="tile-actions">${B}</div>`:"",z=g.items?.length||0,U=(g.technicians||[]).map(K=>n.get(String(K))).filter(Boolean),Z=U.map(K=>K.name).join(d)||"—",re=b(String(g.reservationId??"")),J=g.start?b(Ie(g.start)):"-",ue=g.end?b(Ie(g.end)):"-",_=b(String(g.cost??0)),W=b(String(z)),Be=g.notes?b(g.notes):l,me=c.replace("{count}",W),Ne=g.applyTax?`<small>${r}</small>`:"";let ge=w;return g.projectId&&(ge=R?.title?b(R.title):q),`
      <div class="${B?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${C}"${P} data-reservation-index="${D}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${re}</div>
          <div class="tile-badges">
            ${I}
            ${F}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${h.client}</span>
            <span class="tile-value">${j?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.project}</span>
            <span class="tile-value">${ge}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.start}</span>
            <span class="tile-value tile-inline">${J}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.end}</span>
            <span class="tile-value tile-inline">${ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.cost}</span>
            <span class="tile-value">${_} ${s} ${Ne}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.equipment}</span>
            <span class="tile-value">${me}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.crew}</span>
            <span class="tile-value">${U.length?Z:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Be}</span>
          </div>
        </div>
        ${$}
      </div>
    `}).join("")}function Tt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Hs(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=xe(e,s),l=e.paid===!0||e.paid==="paid",c=Qe(e),d=e.items||[],{technicians:u=[]}=Y(),m=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(u)?u:[]),y=new Map;m.forEach(N=>{if(!N||N.id==null)return;const V=String(N.id),ee=y.get(V)||{};y.set(V,{...ee,...N})});const p=(e.technicians||[]).map(N=>y.get(String(N))).filter(Boolean),v=In(),w=Bn(e.start,e.end),q=(N={})=>{const V=[N.dailyWage,N.daily_rate,N.dailyRate,N.wage,N.rate];for(const ee of V){if(ee==null)continue;const Ce=parseFloat(b(String(ee)));if(Number.isFinite(Ce))return Ce}return 0},g=d.reduce((N,V)=>N+(V.qty||1)*(V.price||0),0)*w,j=p.reduce((N,V)=>N+q(V),0)*w,R=g+j,f=parseFloat(e.discount)||0,x=e.discountType==="amount"?f:R*(f/100),T=Math.max(0,R-x),H=r?!1:e.applyTax,L=H?T*.15:0,k=Number(e.cost),I=Number.isFinite(k),F=T+L,C=r?Math.round(F):I?k:Math.round(F),P=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,B=P!=null?parseFloat(b(String(P))):NaN;let U=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(B)&&B>0)&&Number.isFinite(B)?B:0,Z=U>0?Math.max(0,(Number.isFinite(C)?C:0)*(U/100)):0;H&&U<=0&&(U=se,Z=Math.max(0,(Number.isFinite(C)?C:0)*(U/100)));const re=b(String(e.reservationId??e.id??"")),J=e.start?b(Ie(e.start)):"-",ue=e.end?b(Ie(e.end)):"-",_=b(String(p.length)),W=b(g.toFixed(2)),Be=b(x.toFixed(2)),me=b(T.toFixed(2)),Ne=b(L.toFixed(2)),ge=b((C??0).toFixed(2)),ye=b(String(w)),K=o("reservations.create.summary.currency","ريال"),et=o("reservations.details.labels.discount","الخصم"),dn=o("reservations.details.labels.tax","الضريبة (15%)"),yt=o("reservations.details.labels.crewTotal","إجمالي الفريق"),tt=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Ee=o("reservations.details.labels.duration","عدد الأيام"),nt=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),qt=o("reservations.details.labels.netProfit","💵 صافي الربح"),pe={index:"#",code:o("reservations.details.table.headers.code","الكود"),description:o("reservations.details.table.headers.description","الوصف"),quantity:o("reservations.details.table.headers.quantity","الكمية"),price:o("reservations.details.table.headers.price","السعر"),image:o("reservations.details.table.headers.image","الصورة")},at=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),st=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),fe=o("reservations.details.technicians.roleUnknown","غير محدد"),wt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),St=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),qe=o("reservations.list.status.confirmed","✅ مؤكد"),Re=o("reservations.list.status.pending","⏳ غير مؤكد"),_e=o("reservations.list.payment.paid","💳 مدفوع"),xt=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Et=o("reservations.list.status.completed","📁 منتهي"),Ct=o("reservations.details.labels.id","🆔 رقم الحجز"),M=o("reservations.details.section.bookingInfo","بيانات الحجز"),G=o("reservations.details.section.paymentSummary","ملخص الدفع"),ie=o("reservations.details.labels.finalTotal","المجموع النهائي"),Sa=o("reservations.details.section.crew","😎 الفريق الفني"),xa=o("reservations.details.crew.count","{count} عضو"),Ea=o("reservations.details.section.items","📦 المعدات المرتبطة"),Ca=o("reservations.details.items.count","{count} عنصر"),ka=o("reservations.details.actions.edit","✏️ تعديل"),Ia=o("reservations.details.actions.delete","🗑️ حذف"),Aa=o("reservations.details.labels.customer","العميل"),Ta=o("reservations.details.labels.contact","رقم التواصل"),La=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const $a=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Da=o("reservations.details.actions.openProject","📁 فتح المشروع"),Pa=o("reservations.details.labels.start","بداية الحجز"),ja=o("reservations.details.labels.end","نهاية الحجز"),Ba=o("reservations.details.labels.notes","ملاحظات"),Na=o("reservations.list.noNotes","لا توجد ملاحظات"),Ra=o("reservations.details.labels.itemsCount","عدد المعدات"),_a=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ma=o("reservations.details.labels.paymentStatus","حالة الدفع"),Fa=o("reservations.list.unknownCustomer","غير معروف"),un=l?_e:xt,mn=d.length,Ha=b(String(mn)),pn=Ca.replace("{count}",Ha),za=xa.replace("{count}",_),Oa=e.notes?b(e.notes):Na,Ua=b(j.toFixed(2)),Va=b(String(U)),Qa=b(Z.toFixed(2)),Ka=`${Va}% (${Qa} ${K})`,fn=Math.max(0,(C??0)-L-Z),Wa=b(fn.toFixed(2)),he=[{icon:"💳",label:Ma,value:un},{icon:"📦",label:Ra,value:pn},{icon:"⏱️",label:Ee,value:ye},{icon:"💼",label:_a,value:`${W} ${K}`}];he.push({icon:"😎",label:yt,value:`${Ua} ${K}`}),x>0&&he.push({icon:"💸",label:et,value:`${Be} ${K}`}),he.push({icon:"📊",label:tt,value:`${me} ${K}`}),H&&L>0&&he.push({icon:"🧾",label:dn,value:`${Ne} ${K}`}),U>0&&he.push({icon:"🏦",label:nt,value:Ka}),Math.abs(fn-(C??0))>.009&&he.push({icon:"💵",label:qt,value:`${Wa} ${K}`}),he.push({icon:"💰",label:ie,value:`${ge} ${K}`});const Ga=he.map(({icon:N,label:V,value:ee})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${N} ${V}</span>
      <span class="summary-details-value">${ee}</span>
    </div>
  `).join(""),hn=[{text:i?qe:Re,className:i?"status-confirmed":"status-pending"},{text:un,className:l?"status-paid":"status-unpaid"}];c&&hn.push({text:Et,className:"status-completed"});const Xa=hn.map(({text:N,className:V})=>`<span class="status-chip ${V}">${N}</span>`).join(""),Me=(N,V,ee)=>`
    <div class="res-info-row">
      <span class="label">${N} ${V}</span>
      <span class="value">${ee}</span>
    </div>
  `;let kt="";if(e.projectId){let N=Tt($a);if(s){const V=s.title||o("projects.fallback.untitled","مشروع بدون اسم");N=`${Tt(V)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Tt(Da)}</button>`}kt=`
      <div class="res-info-row">
        <span class="label">📁 ${La}</span>
        <span class="value">${N}</span>
      </div>
    `}const we=[];we.push(Me("👤",Aa,t?.customerName||Fa)),we.push(Me("📞",Ta,t?.phone||"—")),we.push(Me("🗓️",Pa,J)),we.push(Me("🗓️",ja,ue)),we.push(Me("📝",Ba,Oa)),kt&&we.push(kt);const Ya=we.join(""),Za=mn?d.map((N,V)=>{const ee=Ze(N),Ce=b(String(N.barcode||"-")),It=b(String(N.qty||1)),rt=b(String(N.price||0)),ns=b(String(V+1)),as=ee?`<img src="${ee}" alt="${N.desc||""}" class="reservation-modal-item-thumb">`:"-";return`
          <tr>
            <td>${ns}</td>
            <td>${Ce}</td>
            <td>${N.desc||"-"}</td>
            <td>${It}</td>
            <td>${rt} ${K}</td>
            <td>${as}</td>
          </tr>
        `}).join(""):`<tr><td colspan="6" class="text-center">${at}</td></tr>`,Ja=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${pe.index}</th>
            <th>${pe.code}</th>
            <th>${pe.description}</th>
            <th>${pe.quantity}</th>
            <th>${pe.price}</th>
            <th>${pe.image}</th>
          </tr>
        </thead>
        <tbody>${Za}</tbody>
      </table>
    </div>
  `,es=p.map((N,V)=>{const ee=b(String(V+1)),Ce=N.role||fe,It=N.phone||wt,rt=N.wage?St.replace("{amount}",b(String(N.wage))).replace("{currency}",K):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ee}</span>
          <span class="technician-name">${N.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${Ce}</div>
          <div>📞 ${It}</div>
          ${rt?`<div>💰 ${rt}</div>`:""}
        </div>
      </div>
    `}).join(""),ts=p.length?`<div class="reservation-technicians-grid">${es}</div>`:`<ul class="reservation-modal-technicians"><li>${st}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Ct}</span>
          <strong>${re}</strong>
        </div>
        <div class="status-chips">
          ${Xa}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${M}</h6>
          ${Ya}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${G}</h6>
            <div class="summary-details">
              ${Ga}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Sa}</span>
          <span class="count">${za}</span>
        </div>
        ${ts}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Ea}</span>
          <span class="count">${pn}</span>
        </div>
        ${Ja}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${ka}</button>
        ${v?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Ia}</button>`:""}
      </div>
    </div>
  `}const zs=`@page {
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
`,Kn="reservations.quote.sequence",le={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Os=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],tn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Wn=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(b(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>S(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>S(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(b(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(b(Number(e?.price||0).toFixed(2)))}],Gn=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(b(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Xn={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"companyShare",labelKey:"reservations.details.labels.companyShare",fallback:"🏦 نسبة الشركة"},{id:"netProfit",labelKey:"reservations.details.labels.netProfit",fallback:"صافي الربح"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Wn.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Gn.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Us="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",Vs="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",Qs="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Ks=zs.trim(),Ws=/color\([^)]*\)/gi,dt=/(color\(|color-mix\()/i,Gs=document.createElement("canvas"),ot=Gs.getContext("2d"),Yn=/^data:image\/svg\+xml/i,Xs=/\.svg($|[?#])/i,Oe=512,Rt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Zn=96,Jn=25.4,_t=210,it=297,Ue=Math.round(_t/Jn*Zn),Ve=Math.round(it/Jn*Zn),Ys=2,ea=/safari/i,Zs=/(iphone|ipad|ipod)/i,Js=/(iphone|ipad|ipod)/i,er=/(crios|fxios|edgios|opios)/i,ut="[reservations/pdf]";let O=null,E=null,oe=1,Fe=null,He=null,ve=null,ke=null;function Mt(){return!!window?.bootstrap?.Modal}function tr(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),ve||(ve=document.createElement("div"),ve.className="modal-backdrop fade show",ve.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(ve)),ke||(ke=t=>{t.key==="Escape"&&Ft(e)},document.addEventListener("keydown",ke));try{e.focus({preventScroll:!0})}catch{}}}function Ft(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),ve&&(ve.remove(),ve=null),ke&&(document.removeEventListener("keydown",ke),ke=null))}function nr(e){if(e){if(Mt()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}tr(e)}}function ta(){const e={};return Object.entries(Xn).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function ar(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function sr(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function na(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function aa(){return Object.fromEntries(tn.map(({id:e})=>[e,!1]))}function nn(e,t){return e.sectionExpansions||(e.sectionExpansions=aa()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function rr(e,t){return nn(e,t)?.[t]!==!1}function an(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function or(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Zs.test(e)}function ir(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=ea.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function sa(){return or()&&ir()}function lr(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return Js.test(e)&&ea.test(e)&&!er.test(e)}function Lt(e,...t){try{console.log(`${ut} ${e}`,...t)}catch{}}function Ht(e,...t){try{console.warn(`${ut} ${e}`,...t)}catch{}}function cr(e,t,...n){try{t?console.error(`${ut} ${e}`,t,...n):console.error(`${ut} ${e}`,...n)}catch{}}function ae(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function dr(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return ae(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function qn(e,t){return Array.isArray(e)&&e.length?e:[dr(t)]}function zt(e,t="#000"){if(!ot||!e)return t;try{return ot.fillStyle="#000",ot.fillStyle=e,ot.fillStyle||t}catch{return t}}function ur(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=zt(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function ra(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Ws,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const mr=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function oa(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;mr.forEach(i=>{const l=s[i];if(l&&dt.test(l)){const c=i.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=i==="backgroundColor"?"#ffffff":s.color||"#000000",u=zt(l,d);a.style.setProperty(c,u,"important")}});const r=s.backgroundImage;if(r&&dt.test(r)){const i=zt(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function ia(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&dt.test(i)){const l=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),c=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(l,c,"important")}});const s=a.backgroundImage;s&&dt.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function wn(e,t=Oe){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function pr(e){if(!e)return{width:Oe,height:Oe};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?wn(t,0):0,s=n?wn(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(l=>parseFloat(l||"0"));if(i.length>=4){const[,,l,c]=i;a=a||(Number.isFinite(l)&&l>0?l:0),s=s||(Number.isFinite(c)&&c>0?c:0)}}return{width:a||Oe,height:s||Oe}}function la(e=""){return typeof e!="string"?!1:Yn.test(e)||Xs.test(e)}function fr(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function hr(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function ca(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await hr(s),i=n.createElement("canvas"),l=Math.max(t.width||r.naturalWidth||r.width||0,1),c=Math.max(t.height||r.naturalHeight||r.height||l,1);i.width=l,i.height=c;const d=i.getContext("2d");return d.clearRect(0,0,l,c),d.drawImage(r,0,0,l,c),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function vr(e){if(!e)return null;if(Yn.test(e))return fr(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function br(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!la(t))return!1;const n=await vr(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Rt),!1;const a=await ca(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Rt),!1)}async function gr(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=pr(e),s=await ca(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Rt),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const l=e.getAttribute("width"),c=e.getAttribute("height");return l&&i.setAttribute("width",l),c&&i.setAttribute("height",c),e.parentNode?.replaceChild(i,e),!!s}async function da(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{la(s.getAttribute?.("src"))&&a.push(br(s))}),n.forEach(s=>{a.push(gr(s))}),a.length&&await Promise.allSettled(a)}function Ot(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){cr(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=n||o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.");if(A(r),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function Ut({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Ht("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Ht("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function sn(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function Sn(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function xn(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function yr(){const e=xn();return e||(He||(He=sn(Vs).catch(t=>{throw He=null,t}).then(()=>{const t=xn();if(!t)throw He=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),He)}async function qr(){const e=Sn();return e||(Fe||(Fe=sn(Qs).catch(t=>{throw Fe=null,t}).then(()=>{const t=Sn();if(!t)throw Fe=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Fe)}async function wr(){if(window.html2pdf||await sn(Us),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}ur()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Sr(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function xr(){const e=window.localStorage?.getItem?.(Kn),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Er(){const t=xr()+1;return{sequence:t,quoteNumber:Sr(t)}}function Cr(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Kn,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function kr(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ir(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(b(String(n)));if(Number.isFinite(a))return a}return 0}function Ar(e){const t=ft()||[],{technicians:n=[]}=Y(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),l=s.get(i)||{};s.set(i,{...l,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Tr(e,t,n){const{projectLinked:a}=xe(e,n),s=Bn(e.start,e.end),l=(Array.isArray(e.items)?e.items:[]).reduce((F,C)=>F+(Number(C?.qty)||1)*(Number(C?.price)||0),0)*s,d=t.reduce((F,C)=>F+Ir(C),0)*s,u=l+d,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:u*(m/100),p=Math.max(0,u-y),v=a?!1:e.applyTax,w=v?p*.15:0,q=Number(e.cost),h=Number.isFinite(q),g=p+w,D=a?Math.round(g):h?q:Math.round(g),j=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,R=j!=null?parseFloat(b(String(j).replace("%","").trim())):NaN,f=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let T=(f!=null?f===!0||f===1||f==="1"||String(f).toLowerCase()==="true":Number.isFinite(R)&&R>0)&&Number.isFinite(R)?Number(R):0;v&&T<=0&&(T=se);const H=T>0?Math.max(0,(D??0)*(T/100)):0,L=Math.max(0,(D??0)-w-H),k={equipmentTotal:l,crewTotal:d,discountAmount:y,taxAmount:w,finalTotal:D??0,companySharePercent:T,companyShareAmount:H,netProfit:L},I={equipmentTotal:b(l.toFixed(2)),crewTotal:b(d.toFixed(2)),discountAmount:b(y.toFixed(2)),taxAmount:b(w.toFixed(2)),finalTotal:b((D??0).toFixed(2)),companySharePercent:b(T.toFixed(2)),companyShareAmount:b(H.toFixed(2)),netProfit:b(L.toFixed(2))};return{totals:k,totalsDisplay:I,rentalDays:s}}function ua({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:r,rentalDays:i,currencyLabel:l,sections:c,fieldSelections:d={},quoteNumber:u,quoteDate:m}){const{companySharePercent:y=0,companyShareAmount:p=0,netProfit:v=0}=s||{},w=b(String(e?.reservationId??e?.id??"")),q=e.start?b(Ie(e.start)):"-",h=e.end?b(Ie(e.end)):"-",g=t?.customerName||t?.full_name||t?.name||"-",D=t?.phone||"-",j=t?.email||"-",R=t?.company||t?.company_name||"-",f=b(D),x=n?.title||n?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),T=n?.code||n?.projectCode||"",H=b(String(i)),L=e?.notes||"",k=ar(d),I=(M,G)=>na(k,M,G),F=M=>c?.has?.(M),C=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,P=(M,G)=>`<div class="info-plain__item">${S(M)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(G)}</strong></div>`,B=(M,G,{variant:ie="inline"}={})=>ie==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(M)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(G)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(M)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(G)}</span>
    </span>`,$=(M,G)=>`<div class="payment-row">
      <span class="payment-row__label">${S(M)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(G)}</span>
    </div>`,z=[];I("customerInfo","customerName")&&z.push(P(o("reservations.details.labels.customer","العميل"),g)),I("customerInfo","customerCompany")&&z.push(P(o("reservations.details.labels.company","الشركة"),R)),I("customerInfo","customerPhone")&&z.push(P(o("reservations.details.labels.phone","الهاتف"),f)),I("customerInfo","customerEmail")&&z.push(P(o("reservations.details.labels.email","البريد"),j));const U=F("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:C}
      </section>`:"",Z=[];I("reservationInfo","reservationId")&&Z.push(P(o("reservations.details.labels.reservationId","رقم الحجز"),w||"-")),I("reservationInfo","reservationStart")&&Z.push(P(o("reservations.details.labels.start","بداية الحجز"),q)),I("reservationInfo","reservationEnd")&&Z.push(P(o("reservations.details.labels.end","نهاية الحجز"),h)),I("reservationInfo","reservationDuration")&&Z.push(P(o("reservations.details.labels.duration","عدد الأيام"),H));const re=F("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${Z.length?`<div class="info-plain">${Z.join("")}</div>`:C}
      </section>`:"",J=[];I("projectInfo","projectTitle")&&J.push(P(o("reservations.details.labels.project","المشروع"),x)),I("projectInfo","projectCode")&&J.push(P(o("reservations.details.labels.code","الرمز"),T||"-"));const ue=F("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${J.length?`<div class="info-plain">${J.join("")}</div>`:C}
      </section>`:"",_=[];if(I("financialSummary","equipmentTotal")&&_.push(B(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${l}`)),I("financialSummary","crewTotal")&&_.push(B(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${l}`)),I("financialSummary","discountAmount")&&_.push(B(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${l}`)),I("financialSummary","taxAmount")&&_.push(B(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${l}`)),y>0&&I("financialSummary","companyShare")){const M=r.companySharePercent??b(y.toFixed(2)),G=r.companyShareAmount??b(p.toFixed(2)),ie=`${M}% (${G} ${l})`;_.push(B(o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),ie))}const W=I("financialSummary","finalTotal"),Be=I("financialSummary","netProfit")&&Number.isFinite(v)&&Math.abs((v??0)-(s?.finalTotal??0))>.009,me=[];W&&me.push(B(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${l}`,{variant:"final"})),Be&&me.push(B(o("reservations.details.labels.netProfit","💵 صافي الربح"),`${r.netProfit} ${l}`,{variant:"final"}));const Ne=me.length?`<div class="totals-final">${me.join("")}</div>`:"",ge=F("financialSummary")?!_.length&&!W?`<section class="quote-section quote-section--financial">${C}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${_.length?`<div class="totals-inline">${_.join("")}</div>`:""}
            ${Ne}
          </div>
        </section>`:"",ye=Wn.filter(M=>I("items",M.id)),K=ye.length>0,et=K?ye.map(M=>`<th>${S(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",yt=Array.isArray(e.items)&&e.items.length>0?e.items.map((M,G)=>`<tr>${ye.map(ie=>`<td>${ie.render(M,G)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ye.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,tt=F("items")?K?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${et}</tr>
              </thead>
              <tbody>${yt}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${C}
          </section>`:"",Ee=Gn.filter(M=>I("crew",M.id)),nt=Ee.length>0,qt=nt?Ee.map(M=>`<th>${S(M.labelKey?o(M.labelKey,M.fallback):M.fallback)}</th>`).join(""):"",pe=a.length?a.map((M,G)=>`<tr>${Ee.map(ie=>`<td>${ie.render(M,G)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ee.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,at=F("crew")?nt?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${qt}</tr>
              </thead>
              <tbody>${pe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${C}
          </section>`:"",st=F("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S(L||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",fe=[];I("payment","beneficiary")&&fe.push($(o("reservations.quote.labels.beneficiary","اسم المستفيد"),le.beneficiaryName)),I("payment","bank")&&fe.push($(o("reservations.quote.labels.bank","اسم البنك"),le.bankName)),I("payment","account")&&fe.push($(o("reservations.quote.labels.account","رقم الحساب"),b(le.accountNumber))),I("payment","iban")&&fe.push($(o("reservations.quote.labels.iban","رقم الآيبان"),b(le.iban)));const wt=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${fe.length?fe.join(""):C}</div>
      </div>
      <p class="quote-approval-note">${S(le.approvalNote)}</p>
    </section>`,St=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Os.map(M=>`<li>${S(M)}</li>`).join("")}</ul>
      </footer>`,qe=[];U&&re?qe.push(ae(`<div class="quote-section-row">${U}${re}</div>`,{blockType:"group"})):(re&&qe.push(ae(re)),U&&qe.push(ae(U))),ue&&qe.push(ae(ue));const Re=[];tt&&Re.push(ae(tt,{blockType:"table",extraAttributes:'data-table-id="items"'})),at&&Re.push(ae(at,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const _e=[];ge&&_e.push(ae(ge,{blockType:"summary"})),st&&_e.push(ae(st));const xt=[ae(wt,{blockType:"payment"}),ae(St,{blockType:"footer"})],Et=[...qn(qe,"reservations.quote.placeholder.page1"),...Re,...qn(_e,"reservations.quote.placeholder.page2"),...xt],Ct=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(le.logoUrl)}" alt="${S(le.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(le.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(le.commercialRegistry)}</p>
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
      <style>${Ks}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ct}
          ${Et.join("")}
        </div>
      </div>
    </div>
  `}function Lr(e){return!e||e.complete&&e.naturalHeight!==0?Promise.resolve():new Promise(t=>{const n=()=>t();e.addEventListener("load",n,{once:!0}),e.addEventListener("error",n,{once:!0})})}async function Ge(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(l=>Lr(l)),i=[s,...r].map(l=>l.catch(c=>(Ht("asset load failed",c),null)));await Promise.all(i),await new Promise(l=>n.requestAnimationFrame(()=>l()))}async function ma(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await da(r),await Ge(r),s.innerHTML="";const l=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let c=null,d=null;const u=f=>{f.style.margin="0 auto",f.style.breakInside="avoid",f.style.pageBreakInside="avoid",f.style.pageBreakAfter="auto",f.style.breakAfter="auto"},m=()=>{const f=a.createElement("div"),x=s.childElementCount===0;if(f.className="quote-page",f.dataset.pageIndex=String(s.childElementCount),x){f.classList.add("quote-page--primary");const H=i.cloneNode(!0);H.removeAttribute("data-quote-header-template"),f.appendChild(H)}else f.classList.add("quote-page--continuation");const T=a.createElement("main");T.className="quote-body",f.appendChild(T),s.appendChild(f),u(f),c=f,d=T},y=()=>{(!c||!d||!d.isConnected)&&m()},p=()=>{if(!c||!d||d.childElementCount>0)return;const f=c;c=null,d=null,f.parentNode&&f.parentNode.removeChild(f)},v=()=>{c=null,d=null},w=()=>c?c.scrollHeight-c.clientHeight>Ys:!1,q=(f,{allowOverflow:x=!1}={})=>(y(),d.appendChild(f),w()&&!x?(d.removeChild(f),p(),!1):!0),h=f=>{const x=f.cloneNode(!0);x.removeAttribute?.("data-quote-block"),x.removeAttribute?.("data-block-type"),x.removeAttribute?.("data-table-id"),!q(x)&&(v(),!q(x)&&q(x,{allowOverflow:!0}))},g=f=>{const x=f.querySelector("table");if(!x){h(f);return}const T=f.querySelector("h3"),H=x.querySelector("thead"),L=Array.from(x.querySelectorAll("tbody tr"));if(!L.length){h(f);return}let k=null,I=0;const F=(P=!1)=>{const B=f.cloneNode(!1);B.removeAttribute("data-quote-block"),B.removeAttribute("data-block-type"),B.removeAttribute("data-table-id"),B.classList.add("quote-section--table-fragment"),P&&B.classList.add("quote-section--table-fragment--continued");const $=T?T.cloneNode(!0):null;$&&B.appendChild($);const z=x.cloneNode(!1);z.classList.add("quote-table--fragment"),H&&z.appendChild(H.cloneNode(!0));const U=a.createElement("tbody");return z.appendChild(U),B.appendChild(z),{section:B,body:U}},C=(P=!1)=>k||(k=F(P),q(k.section)||(v(),q(k.section)||q(k.section,{allowOverflow:!0})),k);L.forEach(P=>{C(I>0);const B=P.cloneNode(!0);if(k.body.appendChild(B),w()&&(k.body.removeChild(B),k.body.childElementCount||(d.removeChild(k.section),k=null,p()),v(),k=null,C(I>0),k.body.appendChild(B),w())){k.section.classList.add("quote-section--table-fragment--overflow"),I+=1;return}I+=1}),k=null};if(!l.length)return;l.forEach(f=>{f.getAttribute("data-block-type")==="table"?g(f):h(f)});const D=Array.from(s.children),j=[];D.forEach((f,x)=>{const T=f.querySelector(".quote-body");if(x!==0&&(!T||T.childElementCount===0)){f.remove();return}j.push(f)}),j.forEach((f,x)=>{const T=x===0;f.style.pageBreakAfter="auto",f.style.breakAfter="auto",f.style.pageBreakBefore=T?"auto":"always",f.style.breakBefore=T?"auto":"page",n?f.style.boxShadow="":f.style.boxShadow="none"});const R=j[j.length-1]||null;c=R,d=R?.querySelector(".quote-body")||null,await Ge(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function rn(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function $r(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([qr(),yr()]),l=typeof window<"u"&&window.devicePixelRatio||1,c=an(),d=sa(),u=lr();let m;u?m=1.5:d?m=Math.min(1.7,Math.max(1.2,l*1.1)):c?m=Math.min(1.8,Math.max(1.25,l*1.2)):m=Math.min(2,Math.max(1.6,l*1.4));const y=u||d?.9:c?.92:.95,p=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:m,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!0,removeContainer:!1,logging:!0};let w=0;const q=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let g=0;g<s.length;g+=1){const D=s[g];await da(D),await Ge(D);const j=D.ownerDocument||document,R=j.createElement("div");Object.assign(R.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const f=D.cloneNode(!0);f.style.width=`${Ue}px`,f.style.maxWidth=`${Ue}px`,f.style.minWidth=`${Ue}px`,f.style.height=`${Ve}px`,f.style.maxHeight=`${Ve}px`,f.style.minHeight=`${Ve}px`,f.style.position="relative",f.style.background="#ffffff",rn(f),R.appendChild(f),j.body.appendChild(R);let x;try{await Ge(f),x=await i(f,{...v,scale:m,width:Ue,height:Ve,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(P){throw Ot(P,"pageCapture",{toastMessage:q}),P}finally{R.parentNode?.removeChild(R)}if(!x)continue;const T=x.width||1,L=(x.height||1)/T;let k=_t,I=k*L,F=0;if(I>it){const P=it/I;I=it,k=k*P,F=Math.max(0,(_t-k)/2)}const C=x.toDataURL("image/jpeg",y);w>0&&p.addPage(),p.addImage(C,"JPEG",F,0,k,I,`page-${w+1}`,"FAST"),w+=1,await new Promise(P=>window.requestAnimationFrame(P))}}catch(g){throw Ut({safariWindowRef:n,mobileWindowRef:a}),g}if(w===0)throw Ut({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(d||a&&!a.closed){const g=p.output("blob"),D=URL.createObjectURL(g);d?n&&!n.closed?(n.location.href=D,n.focus?.()):window.open(D,"_blank"):a&&!a.closed&&(a.location.href=D,a.focus?.()),setTimeout(()=>URL.revokeObjectURL(D),6e4)}else p.save(t)}function on(){if(!E||!O)return;const{previewFrame:e}=O;if(!e)return;const t=ua({reservation:E.reservation,customer:E.customer,project:E.project,technicians:E.technicians,totals:E.totals,totalsDisplay:E.totalsDisplay,rentalDays:E.rentalDays,currencyLabel:E.currencyLabel,sections:E.sections,fieldSelections:E.fields,quoteNumber:E.quoteNumber,quoteDate:E.quoteDateLabel});e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(ra(s),oa(s,a),ia(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&(await ma(r,{context:"preview"}),rn(r))}catch(y){console.error("[reservations/pdf] failed to layout preview document",y)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),l=n?.querySelector(".quote-preview-pages"),c=Ue;let d=18;if(l&&n?.defaultView){const y=n.defaultView.getComputedStyle(l),p=parseFloat(y.rowGap||y.gap||`${d}`);Number.isFinite(p)&&p>=0&&(d=p)}const u=Ve,m=i.length?i.length*u+Math.max(0,(i.length-1)*d):u;if(e.dataset.baseWidth=String(c),e.dataset.baseHeight=String(m),e.style.width=`${c}px`,e.style.minWidth=`${c}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,O?.previewFrameWrapper&&!O?.userAdjustedZoom){const y=O.previewFrameWrapper.clientWidth-24;y>0&&y<c?oe=Math.max(y/c,.3):oe=1}fa(oe)},{once:!0})}function Dr(e){if(!E)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?E.sections.add(n):E.sections.delete(n),pa(),on())}function Pr(e){if(!E)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=E.fields||(E.fields=ta()),r=sr(s,n);t.checked?r.add(a):r.delete(a),on()}function jr(e){if(!E)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(nn(E,n),E.sectionExpansions[n]=t.open)}function pa(){if(!O?.toggles||!E)return;const{toggles:e}=O,t=E.fields||{};nn(E);const n=tn.map(({id:a,labelKey:s,fallback:r})=>{const i=o(s,r),l=E.sections.has(a),c=Xn[a]||[],d=rr(E,a),u=c.length?`<div class="quote-toggle-sublist">
          ${c.map(m=>{const y=na(t,a,m.id),p=l?"":"disabled",v=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${y?"checked":""} ${p}>
                <span>${S(v)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${l?"checked":""}>
            <span>${S(i)}</span>
          </label>
          ${c.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",Dr)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",Pr)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",jr)})}function Br(){if(O?.modal)return O;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${S(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${S(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${S(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${S(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-download]"),r=e.querySelector(".modal-header"),i=r?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),c=document.createElement("div");c.className="quote-preview-header-actions",r&&r.insertBefore(c,i||null);const d=document.createElement("iframe");d.className="quote-preview-frame",d.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),d.setAttribute("loading","lazy"),d.setAttribute("frameborder","0");const u=document.createElement("div");u.className="quote-preview-zoom-controls",u.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(d),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y),c.appendChild(u),s?.addEventListener("click",async()=>{if(E){s.disabled=!0;try{await Rr()}finally{s.disabled=!1}}});const p=()=>{Mt()||Ft(e)};l.forEach(h=>{h?.addEventListener("click",p)}),i&&!l.includes(i)&&i.addEventListener("click",p),e.addEventListener("click",h=>{Mt()||h.target===e&&Ft(e)}),O={modal:e,toggles:t,preview:n,previewFrameWrapper:m,zoomControls:u,zoomValue:u.querySelector("[data-zoom-value]"),previewFrame:d,meta:a,downloadBtn:s,userAdjustedZoom:!1};const v=u.querySelector("[data-zoom-out]"),w=u.querySelector("[data-zoom-in]"),q=u.querySelector("[data-zoom-reset]");return v?.addEventListener("click",()=>En(-.1)),w?.addEventListener("click",()=>En(.1)),q?.addEventListener("click",()=>mt(1,{markManual:!0})),mt(oe),O}function mt(e,{silent:t=!1,markManual:n=!1}={}){oe=Math.min(Math.max(e,.25),2.2),n&&O&&(O.userAdjustedZoom=!0),fa(oe),!t&&O?.zoomValue&&(O.zoomValue.textContent=`${Math.round(oe*100)}%`)}function En(e){mt(oe+e,{markManual:!0})}function fa(e){if(!O?.previewFrame||!O.previewFrameWrapper)return;const t=O.previewFrame,n=O.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",an()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function Nr(){if(!O?.meta||!E)return;const{meta:e}=O;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(E.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(E.quoteDateLabel)}</strong></div>
    </div>
  `}async function Rr(){if(!E)return;const e=an(),t=!e&&sa(),n=e?window.open("","_blank"):null,a=t?window.open("data:text/html;charset=utf-8,"+encodeURIComponent(""),"_blank"):null;let s=null;const r=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await wr(),Lt("html2pdf ensured");const i=ua({reservation:E.reservation,customer:E.customer,project:E.project,technicians:E.technicians,totals:E.totals,totalsDisplay:E.totalsDisplay,rentalDays:E.rentalDays,currencyLabel:E.currencyLabel,sections:E.sections,fieldSelections:E.fields,quoteNumber:E.quoteNumber,quoteDate:E.quoteDateLabel});s=document.createElement("div"),s.innerHTML=i,Object.assign(s.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(s),ra(s),oa(s),ia(s),Lt("export container prepared");const l=s.firstElementChild;if(l){l.setAttribute("dir","rtl"),l.style.direction="rtl",l.style.textAlign="right",l.setAttribute("data-theme","light"),l.classList.remove("dark","dark-mode"),l.style.margin="0",l.style.padding="0",l.style.width="210mm",l.style.maxWidth="210mm",l.style.marginLeft="auto",l.style.marginRight="auto",l.scrollTop=0,l.scrollLeft=0;try{await ma(l,{context:"export"}),await Ge(l),rn(l),Lt("layout complete for export document")}catch(d){Ot(d,"layoutQuoteDocument",{suppressToast:!0})}}const c=`quotation-${E.quoteNumber}.pdf`;await $r(l,{filename:c,safariWindowRef:a,mobileWindowRef:n}),E.sequenceCommitted||(Cr(E.quoteSequence),E.sequenceCommitted=!0)}catch(i){Ut({container:s,safariWindowRef:a,mobileWindowRef:n}),s=null,Ot(i,"exportQuoteAsPdf",{toastMessage:r})}finally{s&&s.parentNode&&s.parentNode.removeChild(s)}}function _r(){const e=Br();e?.modal&&(oe=1,O&&(O.userAdjustedZoom=!1),mt(oe,{silent:!0}),pa(),Nr(),on(),nr(e.modal))}async function Mr({reservation:e,customer:t,project:n}){if(!e){A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Ar(e),{totalsDisplay:s,totals:r,rentalDays:i}=Tr(e,a,n),l=o("reservations.create.summary.currency","ريال"),{sequence:c,quoteNumber:d}=Er(),u=new Date;E={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:l,sections:new Set(tn.filter(m=>m.defaultSelected).map(m=>m.id)),sectionExpansions:aa(),fields:ta(),quoteSequence:c,quoteNumber:d,quoteDate:u,quoteDateLabel:kr(u),sequenceCommitted:!1},_r()}function Fr({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=ft(),{reservations:r=[],customers:i=[],technicians:l=[],projects:c=[]}=Y(),d=Array.isArray(s)?s:l||[],u=new Map((c||[]).map(q=>[String(q.id),q])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const y=t||Rs(),p=new Map(i.map(q=>[String(q.id),q])),v=new Map(d.map(q=>[String(q.id),q])),w=Ms({reservations:r,filters:y,customersMap:p,techniciansMap:v,projectsMap:u});if(w.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${Fs({entries:w,customersMap:p,techniciansMap:v,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(q=>{const h=Number(q.dataset.reservationIndex);Number.isNaN(h)||q.addEventListener("click",()=>{typeof n=="function"&&n(h)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const h=Number(q.dataset.reservationIndex);Number.isNaN(h)||q.addEventListener("click",g=>{g.stopPropagation(),typeof a=="function"&&a(h,g)})})}function Hr(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=Y(),l=s[e];if(!l)return A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const c=r.find(h=>String(h.id)===String(l.customerId)),d=l.projectId?i.find(h=>String(h.id)===String(l.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const h=ft()||[];u.innerHTML=Hs(l,c,h,e,d)}const m=document.getElementById("reservationDetailsModal"),y=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},p=document.getElementById("reservation-details-edit-btn");p&&(p.onclick=()=>{y(),typeof t=="function"&&t(e,{reservation:l,customer:c,getEditContext:a})});const v=document.getElementById("reservation-details-delete-btn");v&&(v.onclick=()=>{y(),typeof n=="function"&&n(e,{reservation:l,customer:c})});const w=u?.querySelector('[data-action="open-project"]');w&&d&&w.addEventListener("click",()=>{y();const h=d?.id!=null?String(d.id):"",g=h?`projects.html?project=${encodeURIComponent(h)}`:"projects.html";window.location.href=g});const q=document.getElementById("reservation-details-export-btn");return q&&(q.onclick=async h=>{h?.preventDefault?.(),h?.stopPropagation?.(),q.blur();try{await Mr({reservation:l,customer:c,project:d})}catch(g){console.error("❌ [reservations] export to PDF failed",g),A(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}let Xe=null,ce=[],Vt=null,ne={};function vt(){return{index:Xe,items:ce}}function bt(e,t){Xe=typeof e=="number"?e:null,ce=Array.isArray(t)?[...t]:[]}function ha(){Xe=null,ce=[],ws()}function zr(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ze(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Or(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((c,d)=>String(d.createdAt||d.start||"").localeCompare(String(c.createdAt||c.start||""))):[],l=[`<option value="">${ze(a)}</option>`];i.forEach(c=>{l.push(`<option value="${ze(c.id)}">${ze(c.title||a)}</option>`)}),r&&!i.some(c=>String(c.id)===r)&&l.push(`<option value="${ze(r)}">${ze(s)}</option>`),n.innerHTML=l.join(""),r?n.value=r:n.value=""}function va(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled");else{const a=t.disabled;t.disabled=!1,t.classList.remove("disabled"),a&&(t.checked=!1)}}function Cn(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:l,projects:c}=Y(),u=Nn()?.[e];if(!u){A(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}ne={...ne,reservation:u,projects:c||[]},t?.(),Or(c||[],u);const m=u.projectId&&c?.find?.(C=>String(C.id)===String(u.projectId))||null,{effectiveConfirmed:y,projectLinked:p}=xe(u,m),v=u.items?u.items.map(C=>({...C,equipmentId:C.equipmentId??C.equipment_id??C.id,barcode:X(C?.barcode)})):[];bt(e,v);const w=o("reservations.list.unknownCustomer","غير معروف"),q=l?.find?.(C=>String(C.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const h=document.getElementById("edit-res-id");h&&(h.value=u.reservationId||u.id);const g=document.getElementById("edit-res-customer");g&&(g.value=q?.customerName||w);const D=typeof a=="function"?a(u.start):{date:"",time:""},j=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",D.date),n?.("edit-res-start-time",D.time),n?.("edit-res-end",j.date),n?.("edit-res-end-time",j.time);const R=document.getElementById("edit-res-notes");R&&(R.value=u.notes||"");const f=document.getElementById("edit-res-discount");f&&(f.value=b(u.discount??0));const x=document.getElementById("edit-res-discount-type");x&&(x.value=u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,H=document.getElementById("edit-res-tax");H&&(H.checked=T);const L=document.getElementById("edit-res-company-share");if(L){const C=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,P=C!=null?Number.parseFloat(b(String(C).replace("%","").trim())):NaN,B=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,$=B!=null?B===!0||B===1||B==="1"||String(B).toLowerCase()==="true":Number.isFinite(P)&&P>0,z=$&&Number.isFinite(P)&&P>0?P:se,U=T||$;L.checked=U,L.dataset.companyShare=String(z)}const k=document.getElementById("edit-res-confirmed");k&&(k.checked=y,k.disabled=p,k.classList.toggle("disabled",p),k.closest(".form-check")?.classList.toggle("disabled",p));const I=document.getElementById("edit-res-paid");I&&(I.value=u.paid===!0||u.paid==="paid"?"paid":"unpaid"),bs((u.technicians||[]).map(C=>String(C))),s?.(v),va(),r?.();const F=document.getElementById("editReservationModal");Vt=zr(F,i),Vt?.show?.()}async function Ur({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(Xe===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),c=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",y=b(document.getElementById("edit-res-discount")?.value||"0"),p=parseFloat(y)||0,v=document.getElementById("edit-res-discount-type")?.value||"percent",w=document.getElementById("edit-res-confirmed")?.checked||!1,q=document.getElementById("edit-res-paid")?.value||"unpaid",h=document.getElementById("edit-res-project")?.value||"",g=gs(),D=document.getElementById("edit-res-company-share");let j=null;if(D&&D.checked){const _=D.dataset.companyShare??D.value??se,W=Number.parseFloat(b(String(_).replace("%","").trim()));j=Number.isFinite(W)&&W>0?W:se}const R=Number.isFinite(j)&&j>0;if(!l||!d){A(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=typeof e=="function"?e:(_,W)=>`${_}T${W||"00:00"}`,x=f(l,c),T=f(d,u);if(x&&T&&new Date(x)>new Date(T)){A(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const L=Nn()?.[Xe];if(!L){A(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ce)||ce.length===0&&g.length===0){A(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}for(const _ of ce)if($e(_.barcode)){A(o("reservations.toast.updateEquipmentMaintenance","⚠️ لا يمكن حفظ التعديلات لأن إحدى المعدات قيد الصيانة"));return}const k=typeof t=="function"?t:()=>!1;for(const _ of ce){const W=X(_.barcode);if(k(W,x,T,L.id??L.reservationId)){A(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const I=typeof n=="function"?n:()=>!1;for(const _ of g)if(I(_,x,T,L.id??L.reservationId)){A(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const F=document.getElementById("edit-res-tax"),C=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Y().projects||[],P=h&&C.find(_=>String(_.id)===String(h))||null,B={...L,projectId:h?String(h):null,confirmed:w},{effectiveConfirmed:$,projectLinked:z,projectStatus:U}=xe(B,P),Z=z?!1:F?.checked||!1,re=$n(ce,p,v,Z,g,{start:x,end:T});let J=L.status??"pending";z?J=P?.status??U??J:["completed","cancelled"].includes(String(J).toLowerCase())||(J=w?"confirmed":"pending");const ue=Dn({reservationCode:L.reservationCode??L.reservationId??null,customerId:L.customerId,start:x,end:T,status:J,title:L.title??null,location:L.location??null,notes:m,projectId:h?String(h):null,totalAmount:re,discount:p,discountType:v,applyTax:Z,paidStatus:q,confirmed:$,items:ce.map(_=>({..._,equipmentId:_.equipmentId??_.id})),technicians:g,companySharePercent:R?j:null,companyShareEnabled:R});try{const _=await ys(L.id||L.reservationId,ue);await qs(),A(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),ha(),i?.({type:"updated",reservation:_}),s?.(),r?.(),Vt?.hide?.()}catch(_){console.error("❌ [reservationsEdit] Failed to update reservation",_);const W=Pn(_)?_.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");A(W,"error")}}function to(e={}){ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=ne,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=b(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const l=document.getElementById("edit-res-tax");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.checked&&de("edit-res-company-share"),t?.()}),l.dataset.listenerAttached="true");const c=document.getElementById("edit-res-company-share");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{c.checked?c.dataset.companyShare||(c.dataset.companyShare=String(se)):l?.checked&&de("edit-res-company-share"),t?.()}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-project");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{va();const v=document.getElementById("edit-res-confirmed");if(v){const w=Array.isArray(ne.projects)&&ne.projects.length?ne.projects:Y().projects||[],q=d.value&&w.find(R=>String(R.id)===String(d.value))||null,g={...ne?.reservation??{},projectId:d.value||null,confirmed:v.checked},{effectiveConfirmed:D,projectLinked:j}=xe(g,q);v.checked=D,v.disabled=j,v.classList.toggle("disabled",j),v.closest(".form-check")?.classList.toggle("disabled",j)}t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("save-reservation-changes");u&&!u.dataset.listenerAttached&&(u.addEventListener("click",()=>{Ur(ne).catch(v=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",v)})}),u.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){m.addEventListener("keydown",q=>{q.key==="Enter"&&(q.preventDefault(),n?.(m))});let v=null;const w=()=>{if(clearTimeout(v),!m.value?.trim())return;const{start:q,end:h}=getEditReservationDateRange();!q||!h||(v=setTimeout(()=>{n?.(m)},150))};m.addEventListener("input",w),m.addEventListener("change",()=>n?.(m)),m.dataset.listenerAttached="true"}const y=document.getElementById("edit-res-equipment-description");y&&!y.dataset.listenerAttached&&(y.addEventListener("keydown",v=>{v.key==="Enter"&&(v.preventDefault(),a?.(y,"edit"))}),y.dataset.listenerAttached="true");const p=document.getElementById("editReservationModal");p&&!p.dataset.cleanupAttached&&(p.addEventListener("hidden.bs.modal",()=>{ha(),t?.(),s?.([])}),p.dataset.cleanupAttached="true")}function ln(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Ke(e,n),end:Ke(t,a)}}function gt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","ريال"),s=o("reservations.create.equipment.imageAlt","صورة");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="6" class="text-center">${n}</td></tr>`,kn(t);return}t.innerHTML=e.map((r,i)=>{const l=Ze(r),c=`${b(String(r.price??0))} ${a}`,d=b(String(r.qty||1)),u=l?`<img src="${l}" alt="${s}" class="reservation-item-thumb">`:"-";return`
        <tr>
          <td>${r.barcode||"-"}</td>
          <td>${r.desc||"-"}</td>
          <td>${c}</td>
          <td>${d}</td>
          <td>${u}</td>
          <td><button type="button" class="reservation-remove-button" data-action="remove-edit-item" data-item-index="${i}">🗑️</button></td>
        </tr>
      `}).join(""),kn(t)}function kn(e){!e||e.dataset.removeListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest('[data-action="remove-edit-item"]');if(!n)return;t.preventDefault();const a=Number(n.dataset.itemIndex);Number.isNaN(a)||Vr(a)}),e.dataset.removeListenerAttached="true")}function je(){const e=document.getElementById("edit-res-summary");if(!e)return;const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",je),a.dataset.listenerAttached="true"),Ae(a);const s=b(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",l=!!document.getElementById("edit-res-project")?.value,c=document.getElementById("edit-res-tax"),d=l?!1:c?.checked||!1,u=a?.value||"unpaid";Ae(a,u),d&&de("edit-res-company-share");let m=We("edit-res-company-share");d&&(!Number.isFinite(m)||m<=0)&&(de("edit-res-company-share"),m=We("edit-res-company-share"));const{items:y=[]}=vt(),{start:p,end:v}=ln();e.innerHTML=Ss({items:y,discount:r,discountType:i,applyTax:d,paidStatus:u,start:p,end:v,companySharePercent:m})}function Vr(e){if(e==null)return;const{index:t,items:n}=vt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);bt(t,a),gt(a),je()}function Qr(e){const t=e?.value??"",n=X(t);if(!n)return;const a=Wt(n);if(!a){A(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}if($e(n)){A(o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"));return}const s=X(n),{index:r,items:i=[]}=vt();if(i.findIndex(v=>X(v.barcode)===s)>-1){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:c,end:d}=ln();if(!c||!d){A(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:u=[]}=Y(),m=r!=null&&u[r]||null,y=m?.id??m?.reservationId??null;if(Le(s,c,d,y)){A(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=[...i,{id:a.id,equipmentId:a.id,barcode:s,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];bt(r,p),e&&(e.value=""),gt(p),je()}function pt(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=On(t),a=X(n?.barcode||t);if(!n||!a){A(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}if($e(a)){A(o("reservations.toast.equipmentMaintenanceStrict","⚠️ لا يمكن إضافة معدة قيد الصيانة إلى الحجز"));return}const{start:s,end:r}=ln();if(!s||!r){A(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:i,items:l=[]}=vt();if(l.some(p=>X(p.barcode)===a)){A(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:d=[]}=Y(),u=i!=null&&d[i]||null,m=u?.id??u?.reservationId??null;if(Le(a,s,r,m)){A(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=[...l,{id:n.id,equipmentId:n.id,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];bt(i,y),gt(y),je(),e.value=""}function Kr(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),pt(e))});const t=()=>{Un(e.value,"edit-res-equipment-description-options")&&pt(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{je()});function Wr(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Nt(e);return}pt(e)}}function no(){De(),Kr()}function Gr(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}function ao(){return Cs().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Y()||{};ks(e||[]),Vn()})}function cn(e=null){Vn(),ba(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Xr(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Qt(){return{populateEquipmentDescriptionLists:De,setFlatpickrValue:Gr,splitDateTime:An,renderEditItems:gt,updateEditReservationSummary:je,addEquipmentByDescription:Wr,addEquipmentToEditingReservation:Qr,addEquipmentToEditingByDescription:pt,combineDateTime:Ke,hasEquipmentConflict:Le,hasTechnicianConflict:Ln,renderReservations:ba,handleReservationsMutation:cn,ensureModal:Xr}}function ba(e="reservations-list",t=null){Fr({containerId:e,filters:t,onShowDetails:ga,onConfirmReservation:qa})}function ga(e){return Hr(e,{getEditContext:Qt,onEdit:(t,{reservation:n})=>{wa(t,n)},onDelete:ya})}function ya(e){return In()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?xs(e,{onAfterChange:cn}):!1:(os(),!1)}function qa(e){return Es(e,{onAfterChange:cn})}function wa(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Cn(e,Qt());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Cn(e,Qt());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}is({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function so(){typeof window>"u"||(window.showReservationDetails=ga,window.deleteReservation=ya,window.confirmReservation=qa,window.editReservation=wa)}export{Qn as a,so as b,eo as c,to as d,no as e,Vn as f,Qt as g,Q as h,Jr as i,cn as j,ao as l,ba as r,ga as s,je as u};
