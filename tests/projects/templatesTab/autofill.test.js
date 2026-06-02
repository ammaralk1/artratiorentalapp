import { beforeEach, describe, expect, it } from 'vitest';

import { buildCallSheetPage } from '../../../src/scripts/templates/build/callsheet.js';
import { buildExpensesPage } from '../../../src/scripts/templates/build/expenses.js';
import {
  applyCallsheetAutofill,
  applyExpensesAutofill,
  buildCallsheetAutofillData,
  buildExpensesAutofillData,
  buildTemplateSourceBundle,
} from '../../../src/scripts/projects/templatesTab/autofill.ts';

function createProject() {
  return {
    id: 74,
    title: 'تصوير اعلان اديداس',
    clientCompany: 'شركة طرق الاطعمة التجارية',
    clientName: 'Mr.Nawaf',
    description: 'تصوير إعلان لـ "adidas". مدة الإعلان دقيقة ونصف في خمس مواقع مختلفة.',
    start: '2026-04-30T09:00:00',
    end: '2026-04-30T21:00:00',
    applyTax: true,
    expenses: [
      { id: 1, label: 'تأجير استديو', amount: 1500, salePrice: 2000, note: '' },
      { id: 2, label: 'مشتريات برودكشن', amount: 2000, salePrice: 2500, note: '' },
    ],
  };
}

function createReservation() {
  return {
    id: 218,
    reservationId: 218,
    title: 'إعلان أديداس',
    start: '2026-04-30 09:00:00',
    end: '2026-04-30 21:00:00',
    notes: 'تصوير إعلان لـ "adidas".',
    location: 'استوديو جدة',
    crewAssignments: [
      {
        technicianId: 8,
        technicianName: 'منتج العمل',
        technicianPhone: '0500000001',
        positionName: 'منتج',
        positionCost: 2000,
        positionClientPrice: 3000,
      },
      {
        technicianId: 1,
        technicianName: 'أحمد مدير تصوير',
        technicianPhone: '0500000002',
        positionName: 'مدير تصوير',
        positionCost: 3000,
        positionClientPrice: 5000,
      },
      {
        technicianId: 2,
        technicianName: 'سعيد مدير إنتاج',
        technicianPhone: '0500000003',
        positionName: 'مدير انتاج',
        positionCost: 2000,
        positionClientPrice: 3000,
      },
    ],
  };
}

describe('templatesTab/autofill', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    localStorage.setItem('templates.lang', 'ar');
  });

  it('builds a normalized source bundle and deterministic expenses/callsheet autofill data', () => {
    const bundle = buildTemplateSourceBundle({
      project: createProject(),
      reservations: [createReservation()],
    });

    expect(bundle.primaryReservation?.id).toBe(218);
    expect(bundle.clientDisplayName).toBe('شركة طرق الاطعمة التجارية');
    expect(bundle.locations).toEqual(['استوديو جدة']);
    expect(bundle.shootDays).toBe(1);

    const expensesData = buildExpensesAutofillData(bundle);
    expect(expensesData.meta.client).toBe('شركة طرق الاطعمة التجارية');
    expect(expensesData.meta.projectTitle).toBe('تصوير اعلان اديداس');
    expect(expensesData.rows.some((row) => row.subgroupCode === '01-00' && row.description === 'منتج')).toBe(true);
    expect(expensesData.rows.some((row) => row.subgroupCode === '03-00' && row.description === 'مدير تصوير')).toBe(true);
    expect(expensesData.rows.some((row) => row.subgroupCode === '02-00' && row.description === 'مدير انتاج')).toBe(true);
    expect(expensesData.rows.some((row) => row.subgroupCode === '10-00' && row.description.includes('تأجير استديو'))).toBe(true);
    expect(expensesData.rows.some((row) => row.subgroupCode === '11-00' && row.description.includes('مشتريات برودكشن'))).toBe(true);

    const callsheetData = buildCallsheetAutofillData(bundle);
    expect(callsheetData.projectTitle).toBe('تصوير اعلان اديداس');
    expect(callsheetData.client).toBe('شركة طرق الاطعمة التجارية');
    expect(callsheetData.callTime).toBe('09:00');
    expect(callsheetData.estWrap).toBe('21:00');
    expect(callsheetData.locations).toBe('استوديو جدة');
    expect(callsheetData.notes).toBe('');
    expect(callsheetData.headerRoles.producer).toBe('منتج العمل');
    expect(callsheetData.headerRoles.dop).toBe('أحمد مدير تصوير');
    expect(callsheetData.headerRoles.productionManager).toBe('سعيد مدير إنتاج');
    expect(callsheetData.crewRows[0]?.phone).toBe('0500000001');
  });

  it('applies deterministic expenses autofill into the generated expenses template shell', () => {
    const bundle = buildTemplateSourceBundle({
      project: createProject(),
      reservations: [createReservation()],
    });
    const data = buildExpensesAutofillData(bundle);
    const root = buildExpensesPage(createProject(), [createReservation()], {
      headerFooter: false,
      logoUrl: '/brand/logo.png',
      companyName: 'Art Ratio',
      companyCR: '4030485240',
      companyLicense: '159460',
    });

    applyExpensesAutofill(root, data);

    const clientCell = root.querySelector('[data-expense-meta="client"]');
    const projectCell = root.querySelector('[data-expense-meta="projectTitle"]');
    expect(clientCell?.textContent).toContain('شركة طرق الاطعمة التجارية');
    expect(projectCell?.textContent).toContain('تصوير اعلان اديداس');
    expect(root.textContent).toContain('منتج');
    expect(root.textContent).toContain('مدير تصوير');
    expect(root.textContent).toContain('تأجير استديو');
    expect(root.textContent).toContain('قسم الكاميرا');
    expect(root.textContent).toContain('تأجير المعدات');
    expect(root.textContent).toContain('المواقع');
    expect(root.querySelectorAll('[data-template-autofilled="1"]').length).toBeGreaterThan(0);
  });

  it('applies deterministic callsheet autofill into the generated callsheet shell', () => {
    const bundle = buildTemplateSourceBundle({
      project: createProject(),
      reservations: [createReservation()],
    });
    const data = buildCallsheetAutofillData(bundle);
    const root = buildCallSheetPage(createProject(), [createReservation()], {
      headerFooter: false,
      logoUrl: '/brand/logo.png',
    });

    applyCallsheetAutofill(root, data);

    expect(root.querySelector('[data-callsheet-meta="projectTitle"]')?.textContent).toContain('تصوير اعلان اديداس');
    expect(root.querySelector('[data-callsheet-field="client"]')?.textContent).toContain('شركة طرق الاطعمة التجارية');
    expect(root.querySelector('[data-callsheet-field="callTime"]')?.textContent).toContain('09:00');
    expect(root.querySelector('[data-callsheet-field="estWrap"]')?.textContent).toContain('21:00');
    expect(root.querySelector('.cs-notes')?.textContent).not.toContain('adidas');
    expect(root.querySelector('.cs-locations')?.textContent).toContain('استوديو جدة');
    expect(root.textContent).toContain('منتج العمل');
    expect(root.textContent).toContain('0500000001');
    expect(root.querySelectorAll('[data-template-autofilled="1"]').length).toBeGreaterThan(0);
  });
});
