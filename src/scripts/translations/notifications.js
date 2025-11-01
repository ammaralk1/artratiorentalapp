import { registerTranslations } from '../language.js';

registerTranslations({
  ar: {
    notifications: {
    title: 'إدارة التنبيهات',
    header: '🔔 إدارة التنبيهات',
    subtitle: 'أرسل تنبيهات للفريق بخصوص الحجوزات/المشاريع، وحدد القنوات والمستلمين.',
    form: {
      entityType: 'النوع',
      entity: { reservation: 'حجز', project: 'مشروع' },
      search: 'بحث',
      'search.placeholder': 'ابحث بالكود أو العنوان',
    },
    table: {
      headers: {
        code: 'الكود',
        title: 'العنوان',
        when: 'الوقت',
        customer: 'العميل',
        actions: 'الإجراءات',
      },
      loading: '⏳ اكتب للبحث…',
      select: 'اختيار',
    },
    channels: { email: 'إيميل', whatsapp: 'واتساب' },
    compose: {
      title: '✉️ إنشاء رسالة',
      recipients: 'المستلمون',
      toTechnicians: 'الفنيون المعيّنون',
      toAdmins: 'الإدمن',
      subject: 'الموضوع',
      body: 'نص الرسالة',
      templates: { reminder: '📌 تذكير', note: '📝 ملاحظة إدارية' },
      send: '🚀 إرسال',
      sentOk: 'تم إرسال الرسالة بنجاح',
    },
    },
  },
});
