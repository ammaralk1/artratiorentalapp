import { setCurrentUserForPreview } from './scripts/auth.js';
import { seedPreviewData, getPreviewUser, isPreviewMode, enablePreviewMode } from './scripts/preview.js';

let previewBootstrapped = false;

function isoWithOffset(baseDate, { days = 0, hours = 0 } = {}) {
  const date = new Date(baseDate.getTime());
  if (days) {
    date.setDate(date.getDate() + days);
  }
  if (hours) {
    date.setHours(date.getHours() + hours);
  }
  return date.toISOString();
}

export function ensurePinegrowPreviewSetup() {
  if (previewBootstrapped) {
    return;
  }

  if (!isPreviewMode()) {
    enablePreviewMode();
  }

  try {
    if (typeof window !== 'undefined') {
      window.__PINEGROW_PREVIEW__ = true;
    }
  } catch (error) {
    // ignore assignment issues in non-browser contexts
  }

  const base = new Date();
  const loginAt = base.toISOString();
  const reservationStart = isoWithOffset(base, { hours: 2 });
  const reservationEnd = isoWithOffset(base, { hours: 6 });
  const nextWeek = isoWithOffset(base, { days: 7 });
  const maintenanceScheduled = isoWithOffset(base, { days: 2 });

  const previewUser = {
    id: 9001,
    username: 'preview-admin',
    role: 'admin',
    loginAt,
  };

  const customers = [
    {
      id: 101,
      full_name: 'استوديو فنون الرياض',
      customer_name: 'استوديو فنون الرياض',
      customerName: 'استوديو فنون الرياض',
      name: 'استوديو فنون الرياض',
      phone: '0551234567',
      email: 'studio@arts.sa',
      address: 'الرياض - حي الملقا',
      company: 'استوديو فنون',
      notes: 'عميل رئيسي لمشاريع الإعلانات التلفزيونية.',
      created_at: isoWithOffset(base, { days: -12 }),
      updated_at: isoWithOffset(base, { days: -3 }),
    },
    {
      id: 102,
      full_name: 'شركة ضوء للإنتاج',
      customer_name: 'شركة ضوء للإنتاج',
      customerName: 'شركة ضوء للإنتاج',
      name: 'شركة ضوء للإنتاج',
      phone: '0557654321',
      email: 'hello@lightproduction.sa',
      address: 'جدة - حي الشاطئ',
      company: 'Light Production',
      notes: 'يحتاج دعم تجهيزات تصوير خارجية.',
      created_at: isoWithOffset(base, { days: -30 }),
      updated_at: isoWithOffset(base, { days: -7 }),
    },
  ];

  const equipment = [
    {
      id: 201,
      description: 'كاميرا Sony FX6 CineAlta',
      desc: 'كاميرا Sony FX6 CineAlta',
      name: 'Sony FX6 CineAlta',
      category: 'تصوير',
      subcategory: 'كاميرات',
      sub: 'كاميرات',
      quantity: 4,
      qty: 4,
      unit_price: 320,
      price: 320,
      barcode: 'CAM-001',
      status: 'available',
      image_url: '',
      image: '',
      created_at: isoWithOffset(base, { days: -45 }),
      updated_at: isoWithOffset(base, { days: -4 }),
    },
    {
      id: 202,
      description: 'لوحة إضاءة Aputure 600d Pro',
      desc: 'لوحة إضاءة Aputure 600d Pro',
      name: 'Aputure 600d Pro',
      category: 'إضاءة',
      subcategory: 'LED',
      sub: 'LED',
      quantity: 3,
      qty: 3,
      unit_price: 180,
      price: 180,
      barcode: 'LGT-104',
      status: 'maintenance',
      image_url: '',
      image: '',
      created_at: isoWithOffset(base, { days: -25 }),
      updated_at: isoWithOffset(base, { days: -1 }),
    },
    {
      id: 203,
      description: 'حامل كاميرا Manfrotto Nitrotech',
      desc: 'حامل كاميرا Manfrotto Nitrotech',
      name: 'Manfrotto Nitrotech',
      category: 'اكسسوارات',
      subcategory: 'حاملات',
      sub: 'حاملات',
      quantity: 6,
      qty: 6,
      unit_price: 95,
      price: 95,
      barcode: 'SUP-209',
      status: 'reserved',
      image_url: '',
      image: '',
      created_at: isoWithOffset(base, { days: -18 }),
      updated_at: isoWithOffset(base, { days: -2 }),
    },
  ];

  const technicians = [
    {
      id: 301,
      full_name: 'أحمد العمري',
      name: 'أحمد العمري',
      phone: '0559988776',
      email: 'ahmad@arts.sa',
      specialization: 'مدير تصوير',
      department: 'الفريق الإبداعي',
      daily_wage: 650,
      status: 'busy',
      notes: 'متواجد في موقع تصوير حاليًا.',
      active: true,
      created_at: isoWithOffset(base, { days: -90 }),
      updated_at: isoWithOffset(base, { days: -1 }),
    },
    {
      id: 302,
      full_name: 'سارة المانع',
      name: 'سارة المانع',
      phone: '0553344556',
      email: 'sara@arts.sa',
      specialization: 'فني إضاءة',
      department: 'الدعم الفني',
      daily_wage: 420,
      status: 'available',
      notes: '',
      active: true,
      created_at: isoWithOffset(base, { days: -60 }),
      updated_at: isoWithOffset(base, { days: -5 }),
    },
  ];

  const reservations = [
    {
      id: 401,
      reservation_code: 'RSV-0401',
      reservationId: 'RSV-0401',
      customer_id: 101,
      customerId: 101,
      customer_name: 'استوديو فنون الرياض',
      customerName: 'استوديو فنون الرياض',
      customerPhone: '0551234567',
      title: 'جلسة تصوير تجارية',
      start_datetime: reservationStart,
      end_datetime: reservationEnd,
      start: reservationStart,
      end: reservationEnd,
      status: 'confirmed',
      confirmed: true,
      location: 'استوديو A - المقر الرئيسي',
      notes: 'يتطلب وجود إضاءة إضافية وخلفية خضراء.',
      discount: 10,
      discount_type: 'percent',
      apply_tax: true,
      paid_status: 'partial',
      total_amount: 4800,
      cost: 4800,
      project_id: 601,
      technicians: [301],
      techniciansDetails: [{ id: 301, name: 'أحمد العمري' }],
      items: [
        {
          equipment_id: 201,
          equipmentId: 201,
          quantity: 2,
          qty: 2,
          unit_price: 320,
          price: 320,
          description: 'كاميرا Sony FX6',
          desc: 'كاميرا Sony FX6',
          barcode: 'CAM-001',
        },
        {
          equipment_id: 203,
          equipmentId: 203,
          quantity: 3,
          qty: 3,
          unit_price: 95,
          price: 95,
          description: 'حامل Manfrotto',
          desc: 'حامل Manfrotto',
          barcode: 'SUP-209',
        },
      ],
    },
    {
      id: 402,
      reservation_code: 'RSV-0402',
      reservationId: 'RSV-0402',
      customer_id: 102,
      customerId: 102,
      customer_name: 'شركة ضوء للإنتاج',
      customerName: 'شركة ضوء للإنتاج',
      customerPhone: '0557654321',
      title: 'بث حي - فعالية الرياض',
      start_datetime: nextWeek,
      end_datetime: isoWithOffset(base, { days: 7, hours: 5 }),
      start: nextWeek,
      end: isoWithOffset(base, { days: 7, hours: 5 }),
      status: 'pending',
      confirmed: false,
      location: 'مركز المؤتمرات - الرياض',
      notes: 'تجهيز معدات بث حي بدقة 4K.',
      discount: 0,
      discount_type: 'percent',
      apply_tax: true,
      paid_status: 'unpaid',
      total_amount: 7200,
      cost: 7200,
      project_id: 601,
      technicians: [302],
      techniciansDetails: [{ id: 302, name: 'سارة المانع' }],
      items: [
        {
          equipment_id: 202,
          equipmentId: 202,
          quantity: 2,
          qty: 2,
          unit_price: 180,
          price: 180,
          description: 'لوحة إضاءة Aputure 600d Pro',
          desc: 'لوحة إضاءة Aputure 600d Pro',
          barcode: 'LGT-104',
        },
      ],
    },
  ];

  const maintenance = [
    {
      id: 501,
      equipment_id: 202,
      equipmentId: 202,
      equipment_desc: 'لوحة إضاءة Aputure 600d Pro',
      equipmentDesc: 'لوحة إضاءة Aputure 600d Pro',
      equipmentBarcode: 'LGT-104',
      issue: 'تلف في وحدة الطاقة الخارجية، يلزم استبدال القطعة.',
      priority: 'high',
      status: 'open',
      status_raw: 'open',
      statusLabel: 'قيد الصيانة',
      createdAt: isoWithOffset(base, { days: -2 }),
      reportedAt: isoWithOffset(base, { days: -2 }),
      scheduledAt: maintenanceScheduled,
      resolvedAt: null,
      resolutionReport: '',
      technicianId: 302,
    },
  ];

  const projects = [
    {
      id: 601,
      project_code: 'PRJ-2024-01',
      title: 'إعلان موسم رمضان',
      type: 'commercial',
      client_id: 101,
      client_company: 'استوديو فنون',
      description: 'إنتاج إعلان تلفزيوني لمنتج غذائي خلال موسم رمضان.',
      start_datetime: isoWithOffset(base, { days: -5 }),
      end_datetime: isoWithOffset(base, { days: 10 }),
      apply_tax: true,
      payment_status: 'partial',
      equipment_estimate: 4200,
      expenses_total: 950,
      tax_amount: 630,
      total_with_tax: 5780,
      confirmed: true,
      technicians: [301, 302],
      equipment: [
        { equipment_id: 201, quantity: 2 },
        { equipment_id: 203, quantity: 3 },
      ],
      created_at: isoWithOffset(base, { days: -14 }),
      updated_at: isoWithOffset(base, { days: -1 }),
      status: 'active',
    },
  ];

  const users = [
    {
      id: 9001,
      username: 'preview-admin',
      role: 'admin',
      is_current_user: true,
      created_at: isoWithOffset(base, { days: -120 }),
    },
    {
      id: 9002,
      username: 'project-coordinator',
      role: 'editor',
      is_current_user: false,
      created_at: isoWithOffset(base, { days: -60 }),
    },
  ];

  const userLogs = {
    9001: {
      sessions: [
        {
          login_time: isoWithOffset(base, { days: -1, hours: -2 }),
          logout_time: isoWithOffset(base, { days: -1 }),
          ip_address: '127.0.0.1',
        },
      ],
      activity: [
        {
          timestamp: isoWithOffset(base, { days: -1, hours: -2 }),
          action: 'login',
          details: { ip: '127.0.0.1' },
        },
        {
          timestamp: isoWithOffset(base, { hours: -3 }),
          action: 'update_reservation',
          details: { reservation_code: 'RSV-0401', customer: 'استوديو فنون الرياض' },
        },
      ],
    },
    9002: {
      sessions: [],
      activity: [],
    },
  };

  seedPreviewData({
    currentUser: previewUser,
    preferences: {
      language: 'ar',
      theme: 'light',
      dashboardTab: 'reservations-tab',
      projectsTab: 'projects-section',
    },
    customers,
    equipment,
    technicians,
    reservations,
    maintenance,
    projects,
    users,
    userLogs,
    counters: {
      customers: 200,
      equipment: 400,
      technicians: 500,
      reservations: 600,
      maintenance: 800,
      projects: 900,
      users: 9500,
    },
  });

  if (!getPreviewUser()) {
    setCurrentUserForPreview(previewUser);
  } else {
    setCurrentUserForPreview(getPreviewUser());
  }

  previewBootstrapped = true;
}
