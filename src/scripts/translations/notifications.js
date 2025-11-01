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
    logs: {
      title: '📜 سجل التنبيهات',
      subtitle: 'تابع آخر عمليات الإرسال وحالة كل رسالة.',
      refresh: '🔄 تحديث',
      filters: {
        allEntities: 'كل الأنواع',
        allChannels: 'كل القنوات',
        allStatuses: 'كل الحالات',
        sent: 'مرسلة',
        failed: 'فاشلة',
        'q.placeholder': 'بحث بالبريد/الرقم',
      },
      headers: {
        time: 'الوقت',
        event: 'الحدث',
        entity: 'النوع/المعرف',
        recipient: 'المستلم',
        channel: 'القناة',
        status: 'الحالة',
        error: 'الخطأ',
      },
      empty: 'لا توجد سجلات حالياً.',
      loading: '⏳ جارٍ التحميل…',
    },
  },
  },
});
