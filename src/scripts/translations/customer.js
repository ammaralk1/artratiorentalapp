import { registerTranslations } from '../language.js';

registerTranslations({
  ar: {
    'customerDetails.pageTitle': 'معلومات العميل',
    'customerDetails.title': '👤 بيانات العميل',
    'customerDetails.actions.back': '⬅️ العودة',
    'customerDetails.actions.edit': '✏️ تعديل العميل',
    'customerDetails.filters.search': '🔍 ابحث باسم العميل أو رقم الحجز...',
    'customerDetails.fields.name': '👤 الاسم:',
    'customerDetails.fields.phone': '📞 الجوال:',
    'customerDetails.fields.company': '🏢 الشركة:',
    'customerDetails.fields.email': '📧 البريد:',
    'customerDetails.fields.address': '📍 العنوان:',
    'customerDetails.fields.notes': '📝 الملاحظات:',
    'customerDetails.toast.missingRequired': '⚠️ الاسم ورقم الهاتف إلزاميان',
    'customerDetails.toast.notFound': '⚠️ العميل غير موجود',
    'customerDetails.toast.updateSuccess': '✅ تم تحديث بيانات العميل',
    'customerDetails.errors.notFound': '⚠️ لم يتم العثور على هذا العميل.',
    'customerDetails.errors.missingId': '⚠️ لا يوجد معرف عميل في الرابط.',
    'customerDetails.edit.modalTitle': '✏️ تعديل العميل'
  },
  en: {
    'customerDetails.pageTitle': 'Customer Details',
    'customerDetails.title': '👤 Client Profile',
    'customerDetails.actions.back': '⬅️ Back',
    'customerDetails.actions.edit': '✏️ Edit Client',
    'customerDetails.filters.search': '🔍 Search by client or reservation ID...',
    'customerDetails.fields.name': '👤 Name:',
    'customerDetails.fields.phone': '📞 Phone:',
    'customerDetails.fields.company': '🏢 Company:',
    'customerDetails.fields.email': '📧 Email:',
    'customerDetails.fields.address': '📍 Address:',
    'customerDetails.fields.notes': '📝 Notes:',
    'customerDetails.toast.missingRequired': '⚠️ Name and phone are required',
    'customerDetails.toast.notFound': '⚠️ Client not found',
    'customerDetails.toast.updateSuccess': '✅ Client information updated',
    'customerDetails.errors.notFound': '⚠️ This client could not be found.',
    'customerDetails.errors.missingId': '⚠️ Missing client identifier in the URL.',
    'customerDetails.edit.modalTitle': '✏️ Edit Client'
  }
});
