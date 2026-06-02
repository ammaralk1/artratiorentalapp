import { loadData, saveData } from './storage.js';
import { setTechniciansState } from './techniciansService.js';
import { setProjectsState } from './projectsService.js';
import { setReservationsState } from './reservationsService.js';
import { setMaintenanceState } from './maintenanceService.js';
import { setEquipment } from './equipment/state.js';
import {
  isLocalhostRuntime,
  isLocalDetailsFixtureEnabled,
  isLocalDashboardFixtureEnabled,
} from './fixtureRuntime.js';

export { isLocalDetailsFixtureEnabled, isLocalDashboardFixtureEnabled } from './fixtureRuntime.js';

const LOCAL_DETAILS_FIXTURE_FLAG = '__ART_RATIO_DETAILS_FIXTURE__';
const LOCAL_DASHBOARD_FIXTURE_FLAG = '__ART_RATIO_DASHBOARD_FIXTURE__';

function buildDetailsFixtureData() {
  const customerId = '1';
  const technicianId = '1';
  const secondaryTechnicianId = '2';
  const projectId = '101';
  const reservationId = '5001';

  return {
    customers: [
      {
        id: customerId,
        customerName: 'شركة النخبة للإنتاج',
        full_name: 'شركة النخبة للإنتاج',
        phone: '0501234567',
        companyName: 'Elite Production Co.',
        company: 'Elite Production Co.',
        email: 'ops@elite-production.test',
        address: 'Riyadh Front, Riyadh',
        notes: 'Fixture customer for dark-mode and populated detail-state validation.',
        tax_id: '310123456700003',
        taxId: '310123456700003',
        document: {
          url: 'https://example.com/customer-brief.pdf',
          fileName: 'customer-brief.pdf',
          mimeType: 'application/pdf',
          size: 1024,
        },
      },
    ],
    technicians: [
      {
        id: technicianId,
        name: 'أحمد السالم',
        full_name: 'أحمد السالم',
        phone: '0555550101',
        email: 'ahmad.fixture@test',
        role: 'فني صوت',
        specialization: 'فني صوت',
        department: 'الصوت',
        daily_wage: 850,
        daily_total: 1250,
        status: 'busy',
        notes: 'Fixture technician assigned to a completed reservation and an ongoing project.',
        active: true,
      },
      {
        id: secondaryTechnicianId,
        name: 'سارة العمري',
        full_name: 'سارة العمري',
        phone: '0555550202',
        email: 'sara.fixture@test',
        role: 'فنية إضاءة',
        specialization: 'فنية إضاءة',
        department: 'الإضاءة',
        daily_wage: 780,
        daily_total: 1150,
        status: 'available',
        notes: 'Fixture collaborator for project and reservation counts.',
        active: true,
      },
    ],
    equipment: [
      { id: 'eq-1', name: 'Speaker Array', barcode: 'SPK-100', quantity: 8 },
      { id: 'eq-2', name: 'Lighting Console', barcode: 'LGT-200', quantity: 2 },
      { id: 'eq-3', name: 'Wireless Mic Kit', barcode: 'MIC-300', quantity: 6 },
    ],
    projects: [
      {
        id: projectId,
        project_code: 'PRJ-101',
        title: 'ملتقى الإبداع 2026',
        type: 'event',
        client_id: customerId,
        client_company: 'Elite Production Co.',
        description: 'Controlled fixture project for detail-page shell, dark-mode, and modal validation.',
        start_datetime: '2026-04-08T16:00:00Z',
        end_datetime: '2026-04-10T23:00:00Z',
        status: 'ongoing',
        apply_tax: true,
        payment_status: 'partial',
        equipment_estimate: 4200,
        expenses_total: 900,
        services_client_price: 14000,
        tax_amount: 1575,
        total_with_tax: 17325,
        discount: 5,
        discount_type: 'percent',
        company_share_enabled: true,
        company_share_percent: 10,
        company_share_amount: 1575,
        paid_amount: 9000,
        paid_percentage: 52,
        confirmed: true,
        technicians: [
          { id: technicianId, name: 'أحمد السالم', role: 'فني صوت' },
          { id: secondaryTechnicianId, name: 'سارة العمري', role: 'فنية إضاءة' },
        ],
        equipment: [
          { equipment_id: 'eq-1', quantity: 4, barcode: 'SPK-100', description: 'Speaker Array' },
          { equipment_id: 'eq-2', quantity: 1, barcode: 'LGT-200', description: 'Lighting Console' },
        ],
        expenses: [
          { id: 'expense-1', label: 'Transport', amount: 500, sale_price: 0, note: 'Fixture logistics' },
          { id: 'expense-2', label: 'Cables', amount: 400, sale_price: 0, note: 'Fixture accessories' },
        ],
        payment_history: [
          { type: 'amount', amount: 9000, value: 9000, note: 'Advance payment', recorded_at: '2026-04-07T09:00:00Z' },
        ],
      },
    ],
    reservations: [
      {
        id: reservationId,
        reservation_id: reservationId,
        reservation_code: 'RSV-5001',
        title: 'حفل إطلاق داخلي',
        customer_id: customerId,
        customer_name: 'شركة النخبة للإنتاج',
        project_id: projectId,
        project_title: 'ملتقى الإبداع 2026',
        start: '2026-04-08T16:00:00Z',
        end: '2026-04-09T01:00:00Z',
        status: 'completed',
        confirmed: true,
        paid_status: 'partial',
        apply_tax: true,
        company_share_percent: 10,
        total_amount: 6200,
        discount: 0,
        discount_type: 'percent',
        items: [
          { id: 'item-1', equipment_id: 'eq-1', quantity: 2, price: 900, cost: 450, description: 'Speaker Array' },
          { id: 'item-2', equipment_id: 'eq-3', quantity: 4, price: 180, cost: 90, description: 'Wireless Mic Kit' },
        ],
        technicians: [technicianId, secondaryTechnicianId],
        crewAssignments: [
          {
            assignmentId: 'crew-1',
            technicianId,
            technicianName: 'أحمد السالم',
            technicianRole: 'فني صوت',
            positionId: 'pos-audio',
            positionKey: 'audio-tech',
            positionLabel: 'فني صوت',
            positionCost: 850,
            positionClientPrice: 1250,
          },
          {
            assignmentId: 'crew-2',
            technicianId: secondaryTechnicianId,
            technicianName: 'سارة العمري',
            technicianRole: 'فنية إضاءة',
            positionId: 'pos-lighting',
            positionKey: 'lighting-tech',
            positionLabel: 'فنية إضاءة',
            positionCost: 780,
            positionClientPrice: 1150,
          },
        ],
        techniciansDetails: [
          {
            id: technicianId,
            technician_id: technicianId,
            technician_name: 'أحمد السالم',
            role: 'فني صوت',
            position_name: 'فني صوت',
            position_cost: 850,
            position_client_price: 1250,
          },
          {
            id: secondaryTechnicianId,
            technician_id: secondaryTechnicianId,
            technician_name: 'سارة العمري',
            role: 'فنية إضاءة',
            position_name: 'فنية إضاءة',
            position_cost: 780,
            position_client_price: 1150,
          },
        ],
        payment_history: [
          { type: 'amount', amount: 3000, value: 3000, note: 'Deposit', recorded_at: '2026-04-07T08:00:00Z' },
        ],
      },
    ],
    technicianPayouts: [
      {
        id: 'payout-1',
        technician_id: technicianId,
        amount: 850,
        note_key: 'technicianFinancial.fixturePayout.day1',
        note: 'Day 1 payout',
        paid_at: '2026-04-10T09:00:00Z',
        created_at: '2026-04-10T09:00:00Z',
      },
    ],
  };
}

function buildDashboardFixtureData() {
  const base = buildDetailsFixtureData();

  const secondCustomerId = '2';
  const secondProjectId = '102';
  const thirdProjectId = '103';
  const secondReservationId = '5002';
  const thirdReservationId = '5003';
  const extraProjects = Array.from({ length: 30 }, (_, index) => {
    const id = String(200 + index + 1);
    const codeNumber = 104 + index;
    const day = String(((index + 4) % 28) + 1).padStart(2, '0');
    const typeCycle = ['event', 'conference', 'photography', 'commercial'];
    const statusCycle = ['planned', 'ongoing', 'completed', 'planned'];
    const type = typeCycle[index % typeCycle.length];
    const status = statusCycle[index % statusCycle.length];
    const confirmed = status !== 'planned';
    const paidAmount = confirmed ? 3200 + (index * 120) : 0;
    const totalWithTax = 6400 + (index * 210);

    return {
      id,
      project_code: `PRJ-${codeNumber}`,
      title: `مشروع تجريبي ${codeNumber}`,
      type,
      client_id: index % 2 === 0 ? secondCustomerId : base.customers[0].id,
      client_company: index % 2 === 0 ? 'Wahj Events' : 'Elite Production Co.',
      description: 'Extended dashboard fixture project for pagination and timeline review.',
      start_datetime: `2026-04-${day}T09:00:00Z`,
      end_datetime: `2026-04-${day}T18:00:00Z`,
      status,
      apply_tax: true,
      payment_status: confirmed ? (index % 3 === 0 ? 'paid' : 'partial') : 'unpaid',
      equipment_estimate: 1800 + (index * 80),
      expenses_total: 320 + (index * 25),
      services_client_price: 5200 + (index * 180),
      tax_amount: Number((totalWithTax * 0.15).toFixed(2)),
      total_with_tax: totalWithTax,
      discount: index % 4 === 0 ? 5 : 0,
      discount_type: 'percent',
      company_share_enabled: true,
      company_share_percent: 10,
      company_share_amount: Number((totalWithTax * 0.1).toFixed(2)),
      paid_amount: paidAmount,
      paid_percentage: confirmed ? Math.min(100, Math.round((paidAmount / totalWithTax) * 100)) : 0,
      confirmed,
      technicians: base.projects[0]?.technicians || [],
      equipment: [
        { equipment_id: 'eq-1', quantity: 1 + (index % 3), barcode: 'SPK-100', description: 'Speaker Array' },
      ],
      expenses: [
        { id: `expense-extra-${id}`, label: 'Fixture Ops', amount: 320 + (index * 25), sale_price: 0, note: 'Extended fixture expense' },
      ],
      payment_history: confirmed
        ? [
            {
              type: 'amount',
              amount: paidAmount,
              value: paidAmount,
              note: 'Fixture payment',
              recorded_at: `2026-04-${day}T20:00:00Z`,
            },
          ]
        : [],
    };
  });

  return {
    customers: [
      ...base.customers,
      {
        id: secondCustomerId,
        customerName: 'مؤسسة وهج الفعاليات',
        full_name: 'مؤسسة وهج الفعاليات',
        phone: '0509876543',
        companyName: 'Wahj Events',
        company: 'Wahj Events',
        email: 'events@wahj.test',
        address: 'Olaya, Riyadh',
        notes: 'Dashboard fixture customer for reports and calendar distribution.',
        tax_id: '310987654300003',
        taxId: '310987654300003',
      },
    ],
    technicians: base.technicians,
    equipment: [
      {
        id: 'eq-1',
        desc: 'Speaker Array',
        description: 'Speaker Array',
        name: 'Speaker Array',
        barcode: 'SPK-100',
        qty: 8,
        quantity: 8,
        price: 900,
        cost: 450,
        status: 'available',
        category: 'audio',
      },
      {
        id: 'eq-2',
        desc: 'Lighting Console',
        description: 'Lighting Console',
        name: 'Lighting Console',
        barcode: 'LGT-200',
        qty: 2,
        quantity: 2,
        price: 1400,
        cost: 750,
        status: 'maintenance',
        category: 'lighting',
      },
      {
        id: 'eq-3',
        desc: 'Wireless Mic Kit',
        description: 'Wireless Mic Kit',
        name: 'Wireless Mic Kit',
        barcode: 'MIC-300',
        qty: 6,
        quantity: 6,
        price: 320,
        cost: 120,
        status: 'reserved',
        category: 'audio',
      },
    ],
    projects: [
      ...base.projects,
      {
        id: secondProjectId,
        project_code: 'PRJ-102',
        title: 'ملتقى القيادات',
        type: 'conference',
        client_id: secondCustomerId,
        client_company: 'Wahj Events',
        description: 'Dashboard fixture project used for completed-report states.',
        start_datetime: '2026-04-14T09:00:00Z',
        end_datetime: '2026-04-14T19:00:00Z',
        status: 'completed',
        apply_tax: true,
        payment_status: 'paid',
        equipment_estimate: 2800,
        expenses_total: 640,
        services_client_price: 9800,
        tax_amount: 1470,
        total_with_tax: 11270,
        discount: 0,
        discount_type: 'percent',
        company_share_enabled: true,
        company_share_percent: 10,
        company_share_amount: 980,
        paid_amount: 11270,
        paid_percentage: 100,
        confirmed: true,
        technicians: base.projects[0]?.technicians || [],
        equipment: [
          { equipment_id: 'eq-1', quantity: 2, barcode: 'SPK-100', description: 'Speaker Array' },
          { equipment_id: 'eq-3', quantity: 2, barcode: 'MIC-300', description: 'Wireless Mic Kit' },
        ],
        expenses: [
          { id: 'expense-3', label: 'Transport', amount: 300, sale_price: 0, note: 'Dashboard fixture transport' },
          { id: 'expense-4', label: 'Power', amount: 340, sale_price: 0, note: 'Dashboard fixture power' },
        ],
        payment_history: [
          { type: 'amount', amount: 11270, value: 11270, note: 'Final payment', recorded_at: '2026-04-15T12:00:00Z' },
        ],
      },
      {
        id: thirdProjectId,
        project_code: 'PRJ-103',
        title: 'تصوير محتوى داخلي',
        type: 'photography',
        client_id: secondCustomerId,
        client_company: 'Wahj Events',
        description: 'Dashboard fixture project used for pending calendar states.',
        start_datetime: '2026-04-21T12:00:00Z',
        end_datetime: '2026-04-21T18:00:00Z',
        status: 'planned',
        apply_tax: false,
        payment_status: 'unpaid',
        equipment_estimate: 1600,
        expenses_total: 250,
        services_client_price: 5400,
        tax_amount: 0,
        total_with_tax: 5400,
        discount: 0,
        discount_type: 'percent',
        company_share_enabled: false,
        company_share_percent: 0,
        company_share_amount: 0,
        paid_amount: 0,
        paid_percentage: 0,
        confirmed: false,
        technicians: base.projects[0]?.technicians || [],
        equipment: [
          { equipment_id: 'eq-3', quantity: 2, barcode: 'MIC-300', description: 'Wireless Mic Kit' },
        ],
        expenses: [
          { id: 'expense-5', label: 'Snacks', amount: 250, sale_price: 0, note: 'Dashboard fixture snacks' },
        ],
        payment_history: [],
      },
      ...extraProjects,
    ],
    reservations: [
      {
        ...base.reservations[0],
        start: '2026-04-08T16:00:00Z',
        end: '2026-04-09T01:00:00Z',
      },
      {
        id: secondReservationId,
        reservation_id: secondReservationId,
        reservation_code: 'RSV-5002',
        title: 'جلسة تصوير للقيادات',
        customer_id: secondCustomerId,
        customer_name: 'مؤسسة وهج الفعاليات',
        project_id: secondProjectId,
        project_title: 'ملتقى القيادات',
        start: '2026-04-14T09:00:00Z',
        end: '2026-04-14T19:00:00Z',
        status: 'completed',
        confirmed: true,
        paid_status: 'paid',
        apply_tax: true,
        company_share_percent: 10,
        total_amount: 7800,
        discount: 0,
        discount_type: 'percent',
        items: [
          { id: 'item-3', equipment_id: 'eq-1', quantity: 2, price: 900, cost: 450, description: 'Speaker Array' },
          { id: 'item-4', equipment_id: 'eq-3', quantity: 2, price: 320, cost: 120, description: 'Wireless Mic Kit' },
        ],
        technicians: ['1', '2'],
        crewAssignments: base.reservations[0]?.crewAssignments || [],
        techniciansDetails: base.reservations[0]?.techniciansDetails || [],
        payment_history: [
          { type: 'amount', amount: 7800, value: 7800, note: 'Full settlement', recorded_at: '2026-04-14T20:00:00Z' },
        ],
      },
      {
        id: thirdReservationId,
        reservation_id: thirdReservationId,
        reservation_code: 'RSV-5003',
        title: 'جلسة تصوير محتوى',
        customer_id: secondCustomerId,
        customer_name: 'مؤسسة وهج الفعاليات',
        project_id: thirdProjectId,
        project_title: 'تصوير محتوى داخلي',
        start: '2026-04-21T12:00:00Z',
        end: '2026-04-21T18:00:00Z',
        status: 'pending',
        confirmed: false,
        paid_status: 'unpaid',
        apply_tax: false,
        company_share_percent: 0,
        total_amount: 2400,
        discount: 0,
        discount_type: 'percent',
        items: [
          { id: 'item-5', equipment_id: 'eq-3', quantity: 2, price: 320, cost: 120, description: 'Wireless Mic Kit' },
        ],
        technicians: ['2'],
        crewAssignments: [
          {
            assignmentId: 'crew-3',
            technicianId: '2',
            technicianName: 'سارة العمري',
            technicianRole: 'فنية إضاءة',
            positionId: 'pos-lighting',
            positionKey: 'lighting-tech',
            positionLabel: 'فنية إضاءة',
            positionCost: 780,
            positionClientPrice: 1150,
          },
        ],
        techniciansDetails: [
          {
            id: '2',
            technician_id: '2',
            technician_name: 'سارة العمري',
            role: 'فنية إضاءة',
            position_name: 'فنية إضاءة',
            position_cost: 780,
            position_client_price: 1150,
          },
        ],
        payment_history: [],
      },
    ],
    maintenance: [
      {
        id: 9001,
        equipmentId: 'eq-2',
        equipmentBarcode: 'LGT-200',
        equipmentDesc: 'Lighting Console',
        issue: 'وحدة الإضاءة تحتاج إلى معايرة واستبدال منفذ تالف.',
        priority: 'high',
        status: 'open',
        createdAt: '2026-04-05T08:00:00Z',
        resolutionReport: '',
        repairCost: null,
      },
      {
        id: 9002,
        equipmentId: 'eq-1',
        equipmentBarcode: 'SPK-100',
        equipmentDesc: 'Speaker Array',
        issue: 'فحص اهتزازات غير طبيعية في الهيكل.',
        priority: 'medium',
        status: 'completed',
        createdAt: '2026-04-02T10:00:00Z',
        resolvedAt: '2026-04-03T15:00:00Z',
        resolutionReport: 'تم تبديل القطعة التالفة وتنظيف الهيكل بالكامل.',
        repairCost: 450,
      },
    ],
    technicianPayouts: base.technicianPayouts,
    packages: [],
  };
}

function markFixtureApplied() {
  try {
    window[LOCAL_DETAILS_FIXTURE_FLAG] = true;
  } catch {
    // ignore runtime assignment failures
  }
}

function markDashboardFixtureApplied() {
  try {
    window[LOCAL_DASHBOARD_FIXTURE_FLAG] = true;
  } catch {
    // ignore runtime assignment failures
  }
}

export function applyLocalDetailsFixture() {
  if (!isLocalDetailsFixtureEnabled()) {
    return false;
  }

  const fixture = buildDetailsFixtureData();

  saveData({
    customers: fixture.customers,
    equipment: fixture.equipment,
    technicianPayouts: fixture.technicianPayouts,
    maintenance: [],
    packages: [],
  });
  setTechniciansState(fixture.technicians);
  setProjectsState(fixture.projects);
  setReservationsState(fixture.reservations);
  markFixtureApplied();
  return true;
}

export function applyLocalDashboardFixture() {
  if (!isLocalDashboardFixtureEnabled()) {
    return false;
  }

  const fixture = buildDashboardFixtureData();

  saveData({
    customers: fixture.customers,
    equipment: fixture.equipment,
    maintenance: fixture.maintenance,
    technicianPayouts: fixture.technicianPayouts,
    packages: fixture.packages,
  });
  setEquipment(fixture.equipment);
  setTechniciansState(fixture.technicians);
  setProjectsState(fixture.projects);
  setReservationsState(fixture.reservations);
  setMaintenanceState(fixture.maintenance);
  markDashboardFixtureApplied();
  return true;
}

export function getLocalFixturePayouts(technicianId) {
  const normalizedId = technicianId == null ? '' : String(technicianId);
  const snapshot = loadData();
  const payouts = Array.isArray(snapshot.technicianPayouts) ? snapshot.technicianPayouts : [];
  return payouts
    .filter((entry) => String(entry?.technician_id ?? entry?.technicianId ?? '') === normalizedId)
    .map((entry) => ({
      ...entry,
      technicianId: entry?.technicianId ?? entry?.technician_id ?? normalizedId,
      paidAt: entry?.paidAt ?? entry?.paid_at ?? entry?.createdAt ?? entry?.created_at ?? null,
      createdAt: entry?.createdAt ?? entry?.created_at ?? entry?.paidAt ?? entry?.paid_at ?? null,
      amount: Number(entry?.amount) || 0,
    }));
}

function nextLocalPayoutId() {
  const payouts = loadData().technicianPayouts || [];
  return `fixture-payout-${payouts.length + 1}`;
}

export async function createLocalFixturePayout({ technicianId, amount, note, paidAt }) {
  const snapshot = loadData();
  const payouts = Array.isArray(snapshot.technicianPayouts) ? [...snapshot.technicianPayouts] : [];
  const entry = {
    id: nextLocalPayoutId(),
    technician_id: String(technicianId),
    amount: Number(amount) || 0,
    note: note || '',
    paid_at: paidAt || new Date().toISOString(),
    created_at: new Date().toISOString(),
  };
  payouts.push(entry);
  saveData({ technicianPayouts: payouts });
  return {
    ...entry,
    technicianId: entry.technician_id,
    paidAt: entry.paid_at,
    createdAt: entry.created_at,
  };
}

export async function deleteLocalFixturePayout(payoutId) {
  const snapshot = loadData();
  const payouts = Array.isArray(snapshot.technicianPayouts) ? snapshot.technicianPayouts : [];
  const next = payouts.filter((entry) => String(entry?.id) !== String(payoutId));
  saveData({ technicianPayouts: next });
  return { id: payoutId };
}
