import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  recomputeExpensesSubtotals,
  renumberExpenseCodes,
} from '../../../src/scripts/projects/templatesTab/expenses.ts';

describe('templatesTab/expenses', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('recomputes exp-table subgroup, group, top-sheet, and summary totals', () => {
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="expenses-top-sheet">
          <span data-top-count="01-00"></span>
          <span data-top-total="01-00"></span>
          <span data-top-total-group="atl"></span>
          <span data-top-grand></span>
        </div>
        <div id="expenses-summary">
          <span data-summary-subtotal></span>
          <span data-summary-tax></span>
          <span data-summary-total></span>
        </div>
        <table class="exp-details exp-table">
          <tbody>
            <tr data-subgroup-header data-subgroup="01-00"><td>Header</td></tr>
            <tr data-row="item">
              <td contenteditable="true">01-01</td>
              <td contenteditable="true">Camera</td>
              <td contenteditable="true">100</td>
              <td contenteditable="true">2</td>
              <td contenteditable="true">3</td>
              <td></td>
              <td></td>
            </tr>
            <tr data-subgroup-subtotal><td data-subtotal="01-00"></td></tr>
            <tr data-subgroup-marker="01-00" data-parent-group="atl"></tr>
          </tbody>
        </table>
        <span data-total-group="atl"></span>
        <span data-grand-total></span>
      </div>
    `;

    const autoPaginateTemplates = vi.fn();
    const paginateExpDetailsTables = vi.fn();

    recomputeExpensesSubtotals({
      formatIntNoDecimals: (value) => String(Math.round(Number(value) || 0)),
      getSelectedProject: () => ({ applyTax: true }),
      projectTaxRate: 0.15,
      translate: (_key, fallback) => fallback,
      autoPaginateTemplates,
      paginateExpDetailsTables,
    });

    expect(document.querySelector('[data-subtotal="01-00"]')?.textContent).toBe('600');
    expect(document.querySelector('[data-total-group="atl"]')?.textContent).toBe('600');
    expect(document.querySelector('[data-grand-total]')?.textContent).toBe('600');
    expect(document.querySelector('[data-top-count="01-00"]')?.textContent).toBe('1');
    expect(document.querySelector('[data-top-total="01-00"]')?.textContent).toBe('600');
    expect(document.querySelector('[data-top-total-group="atl"]')?.textContent).toBe('600');
    expect(document.querySelector('[data-top-grand]')?.textContent).toBe('600');
    expect(document.querySelector('[data-summary-subtotal]')?.textContent).toBe('600 SR');
    expect(document.querySelector('[data-summary-tax]')?.textContent).toBe('90 SR');
    expect(document.querySelector('[data-summary-total]')?.textContent).toBe('690 SR');
    expect(autoPaginateTemplates).toHaveBeenCalledTimes(1);
    expect(paginateExpDetailsTables).not.toHaveBeenCalled();

    raf.mockRestore();
  });

  it('recomputes the legacy expenses table and paginates both table flows', () => {
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="expenses-summary">
          <span data-summary-subtotal></span>
          <span data-summary-tax></span>
          <span data-summary-total></span>
        </div>
        <table id="expenses-table">
          <tbody>
            <tr>
              <td></td><td></td><td></td><td>2</td><td>50</td><td></td>
            </tr>
            <tr class="tpl-subtotal-row"><td data-subtotal></td></tr>
          </tbody>
        </table>
      </div>
    `;

    const autoPaginateTemplates = vi.fn();
    const paginateExpDetailsTables = vi.fn();

    recomputeExpensesSubtotals({
      formatIntNoDecimals: (value) => String(Math.round(Number(value) || 0)),
      getSelectedProject: () => ({ applyTax: false }),
      projectTaxRate: 0.15,
      translate: (_key, fallback) => fallback,
      autoPaginateTemplates,
      paginateExpDetailsTables,
    });

    expect(document.querySelector('#expenses-table tbody tr:first-child td:nth-child(6)')?.textContent).toBe('100');
    expect(document.querySelector('#expenses-table [data-subtotal]')?.textContent).toBe('100');
    expect(document.querySelector('[data-summary-total]')?.textContent).toBe('100 SR');
    expect(autoPaginateTemplates).toHaveBeenCalledTimes(1);
    expect(paginateExpDetailsTables).toHaveBeenCalledTimes(1);

    raf.mockRestore();
  });

  it('renumbers expense item codes within each subgroup', () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root">
          <table class="exp-details">
            <tbody>
              <tr data-subgroup-header data-subgroup="01-00"></tr>
              <tr data-row="item"><td contenteditable="true">x</td><td></td></tr>
              <tr data-row="item"><td contenteditable="true">y</td><td></td></tr>
              <tr data-subgroup-subtotal></tr>
              <tr data-subgroup-header data-subgroup="02-00"></tr>
              <tr data-row="item"><td contenteditable="true">z</td><td></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    renumberExpenseCodes();

    const codes = Array.from(document.querySelectorAll('tr[data-row="item"] td:first-child')).map((cell) => cell.textContent);
    expect(codes).toEqual(['01-01', '01-02', '02-01']);
  });
});
