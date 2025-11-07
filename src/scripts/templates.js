import { ensureXlsx } from './reports/external.js';
import { t } from './language.js';
import { normalizeNumbers } from './utils.js';

function formatDateISO(d) {
  try {
    if (!d) return '';
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return '';
    return dt.toISOString().slice(0, 10);
  } catch (_) { return ''; }
}

function getProjectMeta(project = {}, reservations = []) {
  const title = (project?.title || '').trim();
  const client = (project?.clientCompany || project?.clientName || '').trim();
  const start = formatDateISO(project?.start);
  const end = formatDateISO(project?.end);
  const locations = Array.from(new Set((reservations || [])
    .map((r) => (r?.location || '').trim())
    .filter(Boolean))).join(', ');
  const code = project?.projectCode || normalizeNumbers(String(project?.id || ''));
  return { title, client, start, end, locations, code };
}

function aoaToSheet(XLSX, aoa) {
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  return ws;
}

export async function exportProjectExpensesXlsx({ project, reservations = [] } = {}) {
  const XLSX = await ensureXlsx();
  const { title, client, start, end, locations, code } = getProjectMeta(project, reservations);

  const header = [
    'Code / الكود',
    'Section / القسم',
    'Item / البند',
    'Qty / الكمية',
    'Unit / الوحدة',
    'Rate / السعر',
    'Currency / العملة',
    'Tax % / الضريبة%',
    'Discount / الخصم',
    'Line Total / إجمالي البند',
    'Vendor / المورد',
    'Booking Ref / مرجع الحجز',
    'PO # / أمر الشراء',
    'Status / الحالة',
    'Paid / المدفوع',
    'Balance / المتبقي',
    'Due Date / تاريخ الاستحقاق',
    'Payment Method / طريقة الدفع',
    'Notes / ملاحظات',
  ];

  const aoa = [];
  aoa.push(['Expenses Sheet / جدول المصاريف']);
  aoa.push([]);
  aoa.push(['Production Co.', 'Project Title', 'Client', 'Budget Date', 'Prepared by', 'Locations']);
  aoa.push(['', title, client, formatDateISO(new Date()), '', locations]);
  aoa.push([]);
  aoa.push(header);

  const expenses = Array.isArray(project?.expenses) ? project.expenses : [];
  const rows = expenses.length ? expenses : [];
  const startRow = aoa.length + 1;
  rows.forEach((exp, idx) => {
    const qty = 1;
    const rate = Number(exp?.amount) || 0;
    const line = rate * qty;
    aoa.push([
      '',
      'Production Expenses',
      exp?.label || '',
      qty,
      '',
      rate,
      'SAR',
      0,
      '',
      line,
      '',
      code || '',
      '',
      'Planned',
      0,
      line, // Balance = total - paid (initially same)
      '',
      '',
      exp?.note || '',
    ]);
  });

  const ws = aoaToSheet(XLSX, aoa);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

  // Summary sheet with simple formulas over a generous range
  const sumAoa = [
    ['Budget Summary / ملخص الميزانية'],
    [],
    ['Section / القسم', 'Planned Total', 'Paid', 'Balance'],
    ['All', { f: 'SUM(Expenses!J7:J1000)' }, { f: 'SUM(Expenses!O7:O1000)' }, { f: 'SUM(Expenses!P7:P1000)' }],
  ];
  const sumWs = aoaToSheet(XLSX, sumAoa);
  XLSX.utils.book_append_sheet(wb, sumWs, 'Summary');

  const fname = `${(title || 'project').replace(/\s+/g, '-')}-expenses.xlsx`;
  XLSX.writeFile(wb, fname);
}

export async function exportProjectShotListXlsx({ project, reservations = [] } = {}) {
  const XLSX = await ensureXlsx();
  const { title, client, start, locations, code } = getProjectMeta(project, reservations);
  const header = [
    '#',
    'Scene / المشهد',
    'Description / الوصف',
    'Lens / عدسة',
    'Camera Move / حركة كاميرا',
    'Rig / المثبت',
    'FPS',
    'Res / الدقة',
    'INT/EXT',
    'Day/Night',
    'Location / الموقع',
    'Audio / الصوت',
    'Talent / الممثلين',
    'Props / معدات',
    'Wardrobe / الملابس',
    'VFX Notes / ملاحظات VFX',
    'Safety / السلامة',
    'Est. Time / المدة التقديرية',
    'Priority / الأولوية',
    'Status / الحالة',
    'Notes / ملاحظات',
    'Ref Link / رابط مرجع',
  ];

  const aoa = [];
  aoa.push(['Shot List / قائمة اللقطات']);
  aoa.push([]);
  aoa.push(['Project', 'Client', 'Date', 'Locations', 'Project Code']);
  aoa.push([title, client, start, locations, code]);
  aoa.push([]);
  aoa.push(header);

  const shots = [];
  // Seed one shot per reservation as a starting point
  reservations.forEach((res, i) => {
    const scene = (res?.title || res?.reservationCode || `Reservation ${i + 1}`);
    const loc = (res?.location || '').trim();
    const when = formatDateISO(res?.start);
    shots.push([
      i + 1,
      scene,
      res?.description || '',
      '', '', '', '', '', '', '',
      loc,
      '',
      '', '', '', '', '', '', 'Planned',
      '',
      '',
    ]);
  });

  // If no reservations, provide 50 blank rows
  if (!shots.length) {
    for (let i = 1; i <= 50; i += 1) {
      shots.push([i, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Planned', '', '']);
    }
  }
  shots.forEach((row) => aoa.push(row));

  const ws = aoaToSheet(XLSX, aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Shot List');
  const fname = `${(title || 'project').replace(/\s+/g, '-')}-shot-list.xlsx`;
  XLSX.writeFile(wb, fname);
}

export async function exportProjectCallSheetXlsx({ project, reservations = [] } = {}) {
  const XLSX = await ensureXlsx();
  const { title, client, start, end, locations } = getProjectMeta(project, reservations);
  const aoa = [];
  aoa.push(['CALL SHEET / نموذج الكول شيت']);
  aoa.push([]);
  aoa.push(['Production', 'Project Title', 'Client', 'Date', 'Shoot Days', 'Location City']);
  const shootDays = (start && end) ? `${start} → ${end}` : (start || '');
  aoa.push(['', title, client, start || '', shootDays, locations]);
  aoa.push([]);
  aoa.push(['Call Time', 'Ready to Shoot', 'Lunch', 'Est. Wrap', 'Sunrise', 'Sunset']);
  aoa.push([start || '', '', '', end || '', '', '']);
  aoa.push([]);
  aoa.push(['Important Notes / ملاحظات مهمة']);
  aoa.push(['', '', '', '', '', '']);
  aoa.push([]);
  aoa.push(['Cast Calls / جدول مواعيد الممثلين']);
  aoa.push(['Name', 'Role', 'Call', 'Makeup', 'Wardrobe', 'On Set', 'Notes']);
  for (let i = 0; i < 14; i += 1) {
    aoa.push(['', '', '', '', '', '', '']);
  }
  aoa.push([]);
  aoa.push(['Schedule / جدول اليوم']);
  aoa.push(['Shot #', 'Time (Duration)', 'Description', 'Movement', 'Rig', 'Lens', 'Location', 'I/E', 'D/N', 'Sound', 'Cast', 'Notes / Props']);
  const schedRows = reservations.map((res) => [
    res?.reservationCode || '',
    '',
    res?.title || '',
    '', '', '',
    (res?.location || ''),
    '', '', '', '', ''
  ]);
  (schedRows.length ? schedRows : Array.from({ length: 20 }, () => ['', '', '', '', '', '', '', '', '', '', '', '']))
    .forEach((r) => aoa.push(r));
  aoa.push(['WRAP / نهاية اليوم']);

  const ws = aoaToSheet(XLSX, aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Call Sheet');
  const fname = `${(title || 'project').replace(/\s+/g, '-')}-call-sheet.xlsx`;
  XLSX.writeFile(wb, fname);
}

export default {
  exportProjectExpensesXlsx,
  exportProjectShotListXlsx,
  exportProjectCallSheetXlsx,
};
