import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../src/styles/quotePdfV2.css?raw', () => ({ default: '/* v2 css */' }));
vi.mock('../../../src/scripts/reservations/pdf/constants.js', () => ({
  PDF_FONT_FACE: '@font-face{}',
  QUOTE_COMPANY_INFO: {
    logoUrl: 'logo.png',
    companyName: 'Art Ratio Company',
    commercialRegistry: '4030485240',
    beneficiaryName: 'Art Ratio Company',
    bankName: 'Al Rajhi Bank',
    accountNumber: '123',
    iban: 'SA123',
  },
}));
vi.mock('../../../src/scripts/reservations/pdf/financial.js', () => ({
  formatCurrencyValue: vi.fn((value, currency = 'SR') => `${Number(value || 0).toLocaleString('en-US')} ${currency}`),
}));
vi.mock('../../../src/scripts/reservationsShared.js', () => ({
  buildReservationDisplayGroups: vi.fn(() => ({
    groups: [
      {
        barcode: 'CAM-1',
        description: 'Camera kit',
        count: 2,
        unitPrice: 500,
        totalPrice: 1000,
      },
    ],
  })),
  sanitizePriceValue: vi.fn((value) => Number(value) || 0),
}));
vi.mock('../../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((value) => String(value ?? '')),
}));

describe('Quote PDF V2', () => {
  it('renders an Arabic reservation quote with the new V2 root and financial values', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'ar',
      context: 'reservation',
      quoteNumber: '73',
      quoteDateLabel: '27/05/2026',
      currencyLabel: 'SR',
      reservation: { id: 73, start: '2026-05-01', end: '2026-05-02' },
      customer: { name: 'سعيد سالم', company: 'Milk Network', phone: '+966500000000' },
      rentalDays: 1,
      crewAssignments: [],
      totals: { taxableAmount: 1000, taxAmount: 150, finalTotal: 1150 },
      totalsDisplay: { taxableAmount: '1,000', taxAmount: '150', finalTotal: '1,150' },
      sections: new Set(['customerInfo', 'reservationInfo', 'items', 'financialSummary', 'payment']),
    });

    expect(html).toContain('id="quote-pdf-v2-root"');
    expect(html).toContain('dir="rtl"');
    expect(html).toContain('عرض سعر');
    expect(html).toContain('Camera kit');
    expect(html).toContain('الإجمالي الكلي');
    expect(html).toContain('1,150 SR');
  });

  it('renders an English project quote without changing the app language', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'en',
      context: 'project',
      quoteNumber: '10',
      quoteDateLabel: '27/05/2026',
      currencyLabel: 'SR',
      clientInfo: { name: 'Milk Network', company: 'Milk', phone: '+966500000000', email: 'client@example.com' },
      projectInfo: {
        title: 'Launch Film',
        code: 'PRJ-10',
        typeLabel: 'Commercial',
        startDisplay: '01/05/2026',
        endDisplay: '02/05/2026',
        durationLabel: '2 days',
        statusLabel: 'Upcoming',
      },
      projectExpenses: [{ label: 'Production planning', salePrice: 2000, days: 3, note: 'Pre-production' }],
      equipmentItems: [{ barcode: 'PKG-1', desc: 'Lighting package', qty: 1, unitPriceValue: 1000, totalPrice: 1000 }],
      crewAssignments: [{ positionLabel: 'Videographer', positionClientPrice: 900 }],
      rentalDays: 1,
      totals: { subtotal: 3900, taxAmount: 585, totalWithTax: 4485 },
      totalsDisplay: { projectSubtotal: '3,900', taxAmount: '585', overallTotal: '4,485' },
      sections: new Set(['customerInfo', 'projectInfo', 'projectExpenses', 'projectEquipment', 'projectCrew', 'financialSummary']),
    });

    expect(html).toContain('dir="ltr"');
    expect(html).toContain('Quotation');
    expect(html).toContain('Client Information');
    expect(html).toContain('Production Services');
    expect(html).toContain('Days');
    expect(html).toContain('6,000 SR');
    expect(html).toContain('Production Services Total');
    expect(html).toContain('Equipment Total');
    expect(html).toContain('Crew Total');
    expect(html).toContain('1,000 SR');
    expect(html).toContain('900 SR');
    expect(html).toContain('Lighting package');
    expect(html).toContain('General Terms');
  });

  it('lets quote checklist fields hide category totals independently', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'en',
      context: 'project',
      quoteNumber: '11',
      quoteDateLabel: '27/05/2026',
      currencyLabel: 'SR',
      projectExpenses: [{ label: 'Production planning', salePrice: 2000, days: 3 }],
      equipmentItems: [{ desc: 'Lighting package', qty: 1, unitPriceValue: 1000, totalPrice: 1000 }],
      crewAssignments: [{ positionLabel: 'Videographer', positionClientPrice: 900 }],
      rentalDays: 1,
      sections: new Set(['projectExpenses', 'projectEquipment', 'projectCrew']),
      fields: {
        projectExpenses: new Set(['rowNumber', 'label', 'days', 'amount', 'total']),
        projectEquipment: new Set(['rowNumber', 'description', 'quantity', 'days', 'unitPrice', 'price', 'equipmentSubtotal']),
        projectCrew: new Set(['rowNumber', 'position', 'quantity', 'days', 'unitPrice', 'price', 'crewSubtotal']),
      },
    });

    expect(html).not.toContain('Production Services Total');
    expect(html).toContain('Equipment Total');
    expect(html).toContain('Crew Total');
  });

  it('uses the overhead-inclusive pre-VAT project total instead of the internal subtotal after discount', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'en',
      context: 'project',
      quoteNumber: '77',
      quoteDateLabel: '27/05/2026',
      currencyLabel: 'SR',
      clientInfo: { name: 'Client' },
      projectInfo: { title: 'Project 77' },
      rentalDays: 1,
      totals: {
        baseSubtotal: 13100,
        discountAmount: 720.5,
        subtotalAfterDiscount: 12445,
        companyShareAmount: 1244.5,
        subtotal: 13689.5,
        taxAmount: 2053.42,
        totalWithTax: 15742.92,
      },
      totalsDisplay: {
        discountAmount: '720.5',
        subtotalAfterDiscount: '12,445',
        taxAmount: '2,053.42',
        overallTotal: '15,742.92',
      },
      sections: new Set(['customerInfo', 'projectInfo', 'financialSummary']),
    });

    expect(html).toContain('13689.5 SR');
    expect(html).not.toContain('12,445 SR');
  });

  it('prints project overhead inside line prices without exposing overhead as a summary card', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'en',
      context: 'project',
      quoteNumber: '78',
      quoteDateLabel: '27/05/2026',
      currencyLabel: 'SR',
      equipmentItems: [{ barcode: 'EQ1', desc: 'Camera', qty: 1, unitPriceValue: 1000, totalPrice: 1000 }],
      crewAssignments: [{ positionLabel: 'Videographer', positionClientPrice: 10000 }],
      projectExpenses: [{ label: 'Production service', salePrice: 1000, days: 1 }],
      rentalDays: 1,
      totals: {
        companySharePercent: 10,
        companyShareAmount: 1200,
        applyTax: true,
        subtotal: 13200,
        taxAmount: 1980,
        totalWithTax: 15180,
      },
      sections: new Set(['projectExpenses', 'projectEquipment', 'projectCrew', 'financialSummary']),
    });

    expect(html).toContain('1,100 SR');
    expect(html).toContain('11,000 SR');
    expect(html).not.toContain('Company overhead');
  });

  it('renders reservation checklists through V2 without quotation-only sections', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'en',
      context: 'reservationChecklist',
      checklistType: 'both',
      quoteNumber: '44',
      quoteDateLabel: '28/05/2026',
      currencyLabel: 'SR',
      reservation: { id: 44, start: '2026-06-01', end: '2026-06-01' },
      customer: { name: 'Checklist Client', phone: '+966500000000' },
      crewAssignments: [{ positionLabel: 'Assistant', assignedTechnicianNames: ['Ali'] }],
      rentalDays: 1,
      checklistNotes: 'Bring batteries',
      checklistNotesTitle: 'Checklist Notes',
      sections: new Set(['customerInfo', 'reservationInfo', 'items', 'crew', 'notes']),
    });

    expect(html).toContain('Equipment &amp; Crew List');
    expect(html).toContain('Checklist Notes');
    expect(html).toContain('Bring batteries');
    expect(html).toContain('Camera kit');
    expect(html).toContain('Assistant');
    expect(html).not.toContain('Quotation');
    expect(html).not.toContain('General Terms');
    expect(html).not.toContain('Approval of this quotation');
  });

  it('paginates long project quotes into continued V2 pages without legacy layout controls', async () => {
    const { buildQuoteV2Html } = await import('../../../src/scripts/reservations/pdf/v2/template.js');

    const projectExpenses = Array.from({ length: 18 }, (_value, index) => ({
      label: `Production service ${index + 1}`,
      salePrice: 100 + index,
      days: 2,
      note: `Service note ${index + 1}`,
    }));
    const equipmentItems = Array.from({ length: 18 }, (_value, index) => ({
      barcode: `EQ-${index + 1}`,
      desc: `Equipment item ${index + 1}`,
      qty: 1,
      unitPriceValue: 200 + index,
      totalPrice: 200 + index,
    }));
    const crewAssignments = Array.from({ length: 18 }, (_value, index) => ({
      positionLabel: `Crew role ${index + 1}`,
      positionClientPrice: 300 + index,
    }));
    const terms = Array.from({ length: 17 }, (_value, index) => `Custom term ${index + 1}`);

    const html = buildQuoteV2Html({
      quoteVersion: 'v2',
      quoteLanguage: 'en',
      context: 'project',
      quoteNumber: '99',
      quoteDateLabel: '28/05/2026',
      currencyLabel: 'SR',
      clientInfo: { name: 'Long Client' },
      projectInfo: { title: 'Long Project', startDisplay: '01/06/2026', endDisplay: '03/06/2026' },
      projectExpenses,
      equipmentItems,
      crewAssignments,
      projectNotes: 'Long note paragraph one. '.repeat(80),
      terms,
      termsEdited: true,
      rentalDays: 1,
      totals: { subtotal: 12000, taxAmount: 1800, totalWithTax: 13800 },
      sections: new Set(['customerInfo', 'projectInfo', 'projectExpenses', 'projectEquipment', 'projectCrew', 'financialSummary', 'projectNotes']),
    });

    const pageCount = (html.match(/class="quote-page/g) || []).length;
    expect(pageCount).toBeGreaterThan(3);
    expect(html).toContain('Production Services (continued)');
    expect(html).toContain('Equipment (continued)');
    expect(html).toContain('Crew (continued)');
    expect(html).toContain('Project Notes (continued)');
    expect(html).toContain('General Terms (continued)');
    expect(html).not.toContain('data-drag-key');
    expect(html).not.toContain('quoteBlockOffsets');
  });
});
