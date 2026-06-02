import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renumberExpenseCodes } from '../../../src/scripts/projects/templatesTab/expenses.ts';
import { ensureCellToolbar } from '../../../src/scripts/templates/toolbar.js';

function mountExpensesTable() {
  document.body.innerHTML = `
    <select id="templates-type">
      <option value="expenses" selected>Expenses</option>
    </select>
    <div id="templates-preview-host">
      <div id="templates-a4-root">
        <table class="exp-details exp-table">
          <tbody>
            <tr data-subgroup-header="1" data-subgroup="03-00">
              <td contenteditable="true">03-00</td>
              <td contenteditable="true">قسم الكاميرا</td>
              <td contenteditable="true"></td>
              <td contenteditable="true"></td>
              <td contenteditable="true"></td>
              <td contenteditable="true"></td>
              <td>0</td>
            </tr>
            <tr data-row="item">
              <td contenteditable="true">03-01</td>
              <td contenteditable="true">مدير تصوير</td>
              <td contenteditable="true">1000</td>
              <td contenteditable="true">1</td>
              <td contenteditable="true">1</td>
              <td contenteditable="true"></td>
              <td>1000</td>
            </tr>
            <tr data-subgroup-subtotal="1">
              <td colspan="6">Subtotal</td>
              <td data-subtotal="03-00">1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function getToolbar() {
  return document.getElementById('tpl-cell-toolbar');
}

function bindToolbar(overrides = {}) {
  const defaults = {
    onAfterChange: vi.fn(),
    onRenumber: vi.fn(() => renumberExpenseCodes(document.getElementById('templates-a4-root'))),
    onTotalsChange: vi.fn(),
  };
  const callbacks = { ...defaults, ...overrides };
  ensureCellToolbar(callbacks);
  return callbacks;
}

function targetFirstItemCell() {
  const cell = document.querySelector('table.exp-details tr[data-row="item"] td:nth-child(2)');
  const toolbar = getToolbar();
  toolbar.__targetCell = cell;
  return { cell, toolbar };
}

describe('templates toolbar expense row controls', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.useFakeTimers();
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    vi.useRealTimers();
  });

  it('renumbers expense item codes after adding and deleting a row', async () => {
    mountExpensesTable();
    const callbacks = bindToolbar();
    const { toolbar } = targetFirstItemCell();

    toolbar.querySelector('[data-act="row-add"]').click();
    await vi.runOnlyPendingTimersAsync();

    let itemRows = Array.from(document.querySelectorAll('table.exp-details tr[data-row="item"]'));
    expect(itemRows).toHaveLength(2);
    expect(itemRows.map((row) => row.children[0]?.textContent)).toEqual(['03-01', '03-02']);
    expect(callbacks.onRenumber).toHaveBeenCalledTimes(1);
    expect(callbacks.onTotalsChange).toHaveBeenCalledTimes(1);
    expect(callbacks.onAfterChange).toHaveBeenCalledTimes(1);

    toolbar.__targetCell = itemRows[1].children[1];
    toolbar.querySelector('[data-act="row-del"]').click();
    await vi.runOnlyPendingTimersAsync();

    itemRows = Array.from(document.querySelectorAll('table.exp-details tr[data-row="item"]'));
    expect(itemRows).toHaveLength(1);
    expect(itemRows.map((row) => row.children[0]?.textContent)).toEqual(['03-01']);
    expect(callbacks.onRenumber).toHaveBeenCalledTimes(2);
    expect(callbacks.onTotalsChange).toHaveBeenCalledTimes(2);
    expect(callbacks.onAfterChange).toHaveBeenCalledTimes(2);
  });

  it('uses the latest toolbar callbacks after the preview rebinds', async () => {
    mountExpensesTable();
    const firstCallbacks = bindToolbar();
    const secondCallbacks = {
      onAfterChange: vi.fn(),
      onRenumber: vi.fn(() => renumberExpenseCodes(document.getElementById('templates-a4-root'))),
      onTotalsChange: vi.fn(),
    };

    ensureCellToolbar(secondCallbacks);

    const { toolbar } = targetFirstItemCell();
    toolbar.querySelector('[data-act="row-add"]').click();
    await vi.runOnlyPendingTimersAsync();

    expect(firstCallbacks.onAfterChange).not.toHaveBeenCalled();
    expect(firstCallbacks.onRenumber).not.toHaveBeenCalled();
    expect(firstCallbacks.onTotalsChange).not.toHaveBeenCalled();

    expect(secondCallbacks.onAfterChange).toHaveBeenCalledTimes(1);
    expect(secondCallbacks.onRenumber).toHaveBeenCalledTimes(1);
    expect(secondCallbacks.onTotalsChange).toHaveBeenCalledTimes(1);
  });
});
