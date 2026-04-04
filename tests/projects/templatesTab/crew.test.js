import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ensureCrewOnSecondPage,
  ensureCrewTableExists,
  ensureSingleCrewTableStrict,
  purgeCrewCallTables,
  unifyCrewCallTables,
} from '../../../src/scripts/projects/templatesTab/crew.ts';

function buildCrewTable(content = '') {
  return `
    <table class="tpl-table cs-crew" data-editable-table="crew">
      <thead>
        <tr><th colspan="4" class="cs-crew-title">Crew Call</th></tr>
      </thead>
      <tbody>
        <tr><td>${content}</td><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td><td></td></tr>
      </tbody>
    </table>
  `;
}

describe('templatesTab/crew', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('creates a default crew table on the second page when missing', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <div data-a4-pages>
          <section class="a4-page"><div class="a4-inner"><div class="callsheet-v1"></div></div></section>
        </div>
      </div>
    `;

    const onAfterCreate = vi.fn();
    ensureCrewTableExists({ onAfterCreate });

    const pages = document.querySelectorAll('[data-a4-pages] > .a4-page');
    const crewTable = document.querySelector('table.cs-crew');
    expect(pages).toHaveLength(2);
    expect(crewTable).not.toBeNull();
    expect(crewTable?.querySelectorAll('tbody tr')).toHaveLength(18);
    expect(onAfterCreate).toHaveBeenCalledTimes(1);
  });

  it('purges duplicate crew tables and merges standard rows into one table', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <div data-a4-pages>
          <section class="a4-page"><div class="a4-inner"><div class="callsheet-v1">${buildCrewTable('Alice')}${buildCrewTable('Bob')}</div></div></section>
        </div>
      </div>
    `;

    unifyCrewCallTables();

    const tables = document.querySelectorAll('table.cs-crew');
    expect(tables).toHaveLength(1);
    expect(document.querySelector('table.cs-crew')?.textContent).toContain('Alice');
    expect(document.querySelector('table.cs-crew')?.textContent).toContain('Bob');

    document.querySelector('.callsheet-v1')?.insertAdjacentHTML('beforeend', '<table><thead><tr><th>Crew Call Legacy</th></tr></thead></table>');
    purgeCrewCallTables();
    expect(document.querySelectorAll('.callsheet-v1 table')).toHaveLength(1);
  });

  it('keeps the crew table on page two and moves schedule off that page', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <div data-a4-pages>
          <section class="a4-page" id="page-a"><div class="a4-inner"><div class="callsheet-v1">${buildCrewTable('Lead')}<table class="cs-schedule"></table></div></div></section>
          <section class="a4-page" id="page-b"><div class="a4-inner"><div class="callsheet-v1"></div></div></section>
        </div>
      </div>
    `;

    ensureCrewOnSecondPage();

    const pages = Array.from(document.querySelectorAll('[data-a4-pages] > .a4-page'));
    expect(pages[1]?.querySelector('table.cs-crew')).not.toBeNull();
    expect(pages[1]?.querySelector('table.cs-schedule')).toBeNull();
    expect(pages[2]?.querySelector('table.cs-schedule')).not.toBeNull();
  });

  it('enforces a single crew table strictly and prefers the second-page standard table', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <div data-a4-pages>
          <section class="a4-page"><div class="a4-inner"><div class="callsheet-v1"><table><thead><tr><th>طاقم العمل</th></tr></thead><tbody><tr><td>Legacy</td></tr></tbody></table></div></div></section>
          <section class="a4-page"><div class="a4-inner"><div class="callsheet-v1">${buildCrewTable('Primary')}</div></div></section>
          <section class="a4-page"><div class="a4-inner"><div class="callsheet-v1">${buildCrewTable('Merged')}</div></div></section>
        </div>
      </div>
    `;

    ensureSingleCrewTableStrict();

    const pages = Array.from(document.querySelectorAll('[data-a4-pages] > .a4-page'));
    expect(document.querySelectorAll('table')).toHaveLength(1);
    expect(pages[1]?.querySelector('table.cs-crew')).not.toBeNull();
    expect(document.querySelector('table.cs-crew')?.textContent).toContain('Primary');
    expect(document.querySelector('table.cs-crew')?.textContent).toContain('Merged');
  });
});
