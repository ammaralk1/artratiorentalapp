import { t } from '../language.js';
import { ensureXlsx } from '../reports/external.js';
import { ensureXlsxStyled } from '../templates/excelExport.js';
import { getReservationsForProject, resolveProjectPaymentState, type ReservationLike } from './financials';
import { computeProjectCommercialTotals, resolveProjectPaidAmount } from './breakdown';
import { formatProjectPeriod } from './formatting';

interface ProjectExportLike {
  id?: unknown;
  projectCode?: unknown;
  title?: unknown;
  clientName?: unknown;
  clientCompany?: unknown;
  status?: unknown;
  start?: Date | string | null;
  end?: Date | string | null;
  overallTotal?: unknown;
  equipmentEstimate?: unknown;
  paidAmount?: unknown;
  paidPercent?: unknown;
  companySharePercent?: unknown;
  raw?: Record<string, unknown> | null;
  [key: string]: unknown;
}

const PROJECTS_EXPORT_HEADERS: string[] = [
  'كود المشروع',
  'المشروع',
  'العميل',
  'الحالة',
  'الفترة',
  'القيمة (مع الضريبة)',
  'تقدير المعدات',
  'إيرادات الخدمات',
  'تكلفة الخدمات',
  'صافي الحجوزات (بدون ضريبة)',
  'صافي الربح',
  'هامش الربح %',
  'حالة الدفع',
  'المبالغ المدفوعة',
  'نسبة الدفع %',
  'عدد الدفعات',
] as const;

export function buildProjectsExportRows(
  projects: ProjectExportLike[],
  reservations: ReservationLike[] | null | undefined,
  taxRate: number,
) {
  return projects.map((project) => {
    const linkedReservations = getReservationsForProject(reservations, project.id);
    const commercial = computeProjectCommercialTotals(project, linkedReservations, taxRate);
    const revenueExTax = commercial.baseAfterDiscount;
    const resNetWithoutTax = Math.max(0, (commercial.agg.equipment + commercial.agg.crew) - commercial.discountAmount);
    const perProjectNet = Number((
      commercial.baseAfterDiscount
      - commercial.projectExpenses
      - (commercial.agg.crewCost || 0)
    ).toFixed(2));
    const marginPercent = revenueExTax > 0 ? (perProjectNet / revenueExTax) * 100 : 0;
    const finalTotal = Number(project.overallTotal || commercial.finalTotal || 0);
    const paidAmount = resolveProjectPaidAmount(project, finalTotal);
    const paidPercent = finalTotal > 0 ? (paidAmount / finalTotal) * 100 : 0;
    const history = Array.isArray(project.raw?.paymentHistory)
      ? project.raw.paymentHistory
      : (Array.isArray(project.raw?.payments) ? project.raw.payments : []);
    const periodLabel = formatProjectPeriod(project.start, project.end);
    const statusLabel = t(`projects.status.${project.status}`, String(project.status || ''));
    const paymentState = resolveProjectPaymentState(project);
    const paymentLabel = t(`projects.paymentStatus.${paymentState}`, paymentState);
    const customerLabel = project.clientCompany
      ? `${String(project.clientName || '')} (${String(project.clientCompany)})`
      : String(project.clientName || '');

    return [
      String(project.projectCode || project.id || ''),
      String(project.title || project.projectCode || ''),
      customerLabel,
      statusLabel,
      periodLabel,
      Math.round(finalTotal),
      Math.round(Number(project?.raw?.equipmentEstimate ?? project?.equipmentEstimate ?? 0) || 0),
      Math.round(commercial.servicesRevenue || 0),
      Math.round(commercial.projectExpenses || 0),
      Math.round(resNetWithoutTax || 0),
      Math.round(perProjectNet || 0),
      Number(marginPercent.toFixed(1)),
      paymentLabel,
      Math.round(paidAmount || 0),
      Number(paidPercent.toFixed(1)),
      history.length,
    ];
  });
}

export function buildProjectsBreakdownSheet(
  XLSX: any,
  projects: ProjectExportLike[],
  reservations: ReservationLike[] | null | undefined,
  taxRate: number,
) {
  const blueHead = { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { patternType: 'solid', fgColor: { rgb: '1F2937' } }, alignment: { horizontal: 'center', vertical: 'center' } };
  const sectionHead = { font: { bold: true, sz: 13 }, alignment: { horizontal: 'left', vertical: 'center' } };
  const num0 = { z: '#,##0', alignment: { horizontal: 'right' } };
  const num1 = { z: '#,##0.0', alignment: { horizontal: 'right' } };

  const ws: Record<string, unknown> = {};
  let rowIndex = 0;
  const write = (columnIndex: number, value: string | number, style?: Record<string, unknown>) => {
    const address = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
    ws[address] = { v: value, t: typeof value === 'number' ? 'n' : 's', s: style || {} };
    updateRefRange();
  };
  const updateRefRange = () => {
    const ref = ws['!ref'];
    const end = XLSX.utils.encode_cell({ r: rowIndex, c: 5 });
    ws['!ref'] = typeof ref === 'string' ? ref.replace(/:[A-Z]+\d+$/, `:${end}`) : `A1:${end}`;
  };
  const nextRow = (count = 1) => { rowIndex += count; };
  ws['!cols'] = [22, 36, 16, 16, 16, 16].map((wch) => ({ wch }));

  projects.forEach((project) => {
    write(0, `${String(project.title || project.projectCode || '')} — #${String(project.projectCode || project.id || '')}`, sectionHead);
    nextRow();
    ['البند', 'القيمة', 'البند', 'القيمة', 'البند', 'القيمة'].forEach((header, index) => write(index, header, blueHead));
    nextRow();

    const linkedReservations = getReservationsForProject(reservations, project.id);
    const commercial = computeProjectCommercialTotals(project, linkedReservations, taxRate);
    const perProjectNet = Number((
      commercial.baseAfterDiscount
      - commercial.projectExpenses
      - (commercial.agg.crewCost || 0)
    ).toFixed(2));
    const marginPercent = commercial.baseAfterDiscount > 0 ? (perProjectNet / commercial.baseAfterDiscount) * 100 : 0;

    const pairs = [
      ['إيراد المعدات (حجوزات)', commercial.agg.equipment, 'إيراد الطاقم (حجوزات)', commercial.agg.crew, 'إيرادات الخدمات', commercial.servicesRevenue],
      ['الخصم', commercial.discountAmount, 'بعد الخصم', commercial.baseAfterDiscount, 'تكلفة الطاقم', commercial.agg.crewCost],
      ['تكلفة الخدمات الإنتاجية', commercial.projectExpenses, 'صافي الربح', perProjectNet, 'هامش الربح %', Number(marginPercent.toFixed(1))],
    ];
    pairs.forEach((pair) => {
      pair.forEach((value, index) => {
        const isNumeric = index % 2 === 1;
        write(index, value as string | number, isNumeric ? (index === 5 ? num1 : num0) : {});
      });
      nextRow();
    });
    nextRow();
  });

  return ws;
}

export async function exportProjectsToExcel(
  projects: ProjectExportLike[],
  reservations: ReservationLike[] | null | undefined,
  taxRate: number,
) {
  if (!Array.isArray(projects) || projects.length === 0) {
    try { alert('لا توجد بيانات لتصديرها.'); } catch {}
    return;
  }

  let XLSX = null;
  try { XLSX = await ensureXlsxStyled(); } catch { XLSX = null; }
  if (!XLSX) XLSX = await ensureXlsx();
  if (!XLSX) {
    try { alert('مكتبة Excel غير متوفرة.'); } catch {}
    return;
  }

  const head = { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { patternType: 'solid', fgColor: { rgb: '2563EB' } }, alignment: { horizontal: 'center', vertical: 'center' } };
  const num0 = { z: '#,##0', alignment: { horizontal: 'right' } };
  const num1 = { z: '#,##0.0', alignment: { horizontal: 'right' } };
  const rows = buildProjectsExportRows(projects, reservations, taxRate);
  const styledAoa: Array<Array<Record<string, unknown>>> = [
    PROJECTS_EXPORT_HEADERS.map((header) => ({ v: header, t: 's', s: head })),
  ];

  rows.forEach((row) => {
    styledAoa.push([
      { v: row[0] },
      { v: row[1] },
      { v: row[2] },
      { v: row[3] },
      { v: row[4] },
      { v: row[5], t: 'n', s: num0 },
      { v: row[6], t: 'n', s: num0 },
      { v: row[7], t: 'n', s: num0 },
      { v: row[8], t: 'n', s: num0 },
      { v: row[9], t: 'n', s: num0 },
      { v: row[10], t: 'n', s: num0 },
      { v: row[11], t: 'n', s: num1 },
      { v: row[12] },
      { v: row[13], t: 'n', s: num0 },
      { v: row[14], t: 'n', s: num1 },
      { v: row[15], t: 'n', s: num0 },
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(styledAoa);
  worksheet['!cols'] = [8, 24, 18, 12, 16, 16, 14, 14, 14, 18, 14, 12, 12, 14, 12, 10].map((wch: number) => ({ wch }));
  const lastCol = String.fromCharCode('A'.charCodeAt(0) + PROJECTS_EXPORT_HEADERS.length - 1);
  worksheet['!autofilter'] = { ref: `A1:${lastCol}${styledAoa.length}` };

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');
  XLSX.utils.book_append_sheet(
    workbook,
    buildProjectsBreakdownSheet(XLSX, projects, reservations, taxRate),
    'Breakdown',
  );

  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  XLSX.writeFile(workbook, `projects-report-${timestamp}.xlsx`);
}
