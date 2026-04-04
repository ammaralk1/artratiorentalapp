interface EnsureCrewTableExistsOptions {
  root?: ParentNode | null;
  onAfterCreate?: () => void;
}

function getTemplatesRoot(root?: ParentNode | null): Element | null {
  const resolved = root ?? document.getElementById('templates-a4-root');
  return resolved instanceof Element ? resolved : null;
}

function createEditableCrewRow(): HTMLTableRowElement {
  const row = document.createElement('tr');
  for (let index = 0; index < 4; index += 1) {
    const cell = document.createElement('td');
    cell.setAttribute('data-editable', 'true');
    cell.setAttribute('contenteditable', 'true');
    if (index === 2) {
      cell.setAttribute('dir', 'ltr');
      cell.style.direction = 'ltr';
    }
    row.appendChild(cell);
  }
  return row;
}

function isStandardCrewTable(table: Element): boolean {
  try {
    return Boolean(table.classList.contains('cs-crew') || table.querySelector('thead .cs-crew-title'));
  } catch {
    return false;
  }
}

function isCrewishTable(table: Element): boolean {
  try {
    if (table.classList.contains('cs-crew')) return true;
    const text = `${table.querySelector('thead')?.textContent || ''} ${table.textContent || ''}`.toLowerCase();
    return ['crew call', 'crewcall', 'crew', 'طاقم', 'طاقم العمل', 'كرو', 'كرو كول'].some((marker) => text.includes(marker));
  } catch {
    return false;
  }
}

function rowHasAnyContent(row: Element): boolean {
  return Array.from(row.children).some((cell) => String(cell.textContent || '').trim().length > 0);
}

function ensureEmptyRows(tbody: HTMLTableSectionElement, required: number): void {
  for (let index = 0; index < required; index += 1) {
    tbody.appendChild(createEditableCrewRow());
  }
}

export function ensureCrewTableExists(options: EnsureCrewTableExistsOptions = {}): void {
  const root = getTemplatesRoot(options.root);
  if (!root) return;

  const pagesWrap = root.querySelector('[data-a4-pages]');
  if (!(pagesWrap instanceof Element)) return;
  if (root.querySelector('table.cs-crew')) return;

  const page = document.createElement('section');
  page.className = 'a4-page a4-page--landscape';
  const inner = document.createElement('div');
  inner.className = 'a4-inner';
  const wrap = document.createElement('div');
  wrap.className = 'callsheet-v1';
  page.appendChild(inner);
  inner.appendChild(wrap);

  const crew = document.createElement('table');
  crew.className = 'tpl-table cs-crew';
  crew.setAttribute('data-editable-table', 'crew');

  const colgroup = document.createElement('colgroup');
  [30, 34, 20, 16].forEach((width) => {
    const col = document.createElement('col');
    col.setAttribute('style', `width:${width}%`);
    colgroup.appendChild(col);
  });
  crew.appendChild(colgroup);

  const thead = document.createElement('thead');
  const titleRow = document.createElement('tr');
  const titleCell = document.createElement('th');
  titleCell.setAttribute('colspan', '4');
  titleCell.className = 'cs-crew-title';
  titleCell.textContent = 'Crew Call';
  titleRow.appendChild(titleCell);
  thead.appendChild(titleRow);

  const headerRow = document.createElement('tr');
  ['Position', 'Name', 'Phone', 'Time'].forEach((label, idx) => {
    const th = document.createElement('th');
    th.textContent = label;
    th.setAttribute('style', `width:${[30, 34, 20, 16][idx]}%`);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  crew.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let index = 0; index < 18; index += 1) {
    tbody.appendChild(createEditableCrewRow());
  }
  crew.appendChild(tbody);
  wrap.appendChild(crew);
  pagesWrap.insertBefore(page, pagesWrap.children[1] || null);

  try {
    options.onAfterCreate?.();
  } catch {
    // ignore post-create failures
  }
}

export function purgeCrewCallTables(root?: ParentNode | null): void {
  const base = getTemplatesRoot(root);
  if (!base) return;

  const wrappers = Array.from(base.querySelectorAll('.callsheet-v1'));
  if (!wrappers.length) return;

  try {
    const allTables = wrappers.flatMap((wrapper) => Array.from(wrapper.getElementsByTagName('table')));
    const candidates = allTables.filter(isCrewishTable);
    if (!candidates.length) return;

    const standards = candidates.filter((table) => table.classList.contains('cs-crew'));
    const keep = standards.length ? standards[standards.length - 1] : candidates[0];
    candidates.forEach((table) => {
      if (table !== keep) {
        try {
          table.parentElement?.removeChild(table);
        } catch {
          // ignore DOM removal failures
        }
      }
    });
  } catch {
    // ignore purge failures
  }
}

export function ensureCrewOnSecondPage(root?: ParentNode | null): void {
  const base = getTemplatesRoot(root);
  if (!base) return;

  try {
    const pagesWrap = base.querySelector('[data-a4-pages]');
    if (!(pagesWrap instanceof Element)) return;
    const crew = base.querySelector('table.cs-crew');
    if (!(crew instanceof Element)) return;

    const crewPage = crew.closest('.a4-page');
    const pages = Array.from(pagesWrap.querySelectorAll('.a4-page'));
    if (crewPage && pages.indexOf(crewPage) !== 1) {
      const reference = pagesWrap.children[1]?.nextSibling || null;
      pagesWrap.insertBefore(crewPage, reference);
    }

    const schedule = crewPage?.querySelector('table.cs-schedule');
    if (!schedule) return;

    const newPage = document.createElement('section');
    newPage.className = 'a4-page a4-page--landscape';
    const inner = document.createElement('div');
    inner.className = 'a4-inner';
    const wrap = document.createElement('div');
    wrap.className = 'callsheet-v1';
    newPage.appendChild(inner);
    inner.appendChild(wrap);
    wrap.appendChild(schedule);
    pagesWrap.insertBefore(newPage, pagesWrap.children[2] || null);
  } catch {
    // ignore layout failures
  }
}

export function unifyCrewCallTables(root?: ParentNode | null): void {
  const base = getTemplatesRoot(root);
  if (!base) return;

  const tables = Array.from(base.querySelectorAll<HTMLTableElement>('.callsheet-v1 table.cs-crew'));
  if (tables.length <= 1) return;

  const score = (table: HTMLTableElement): number =>
    Array.from(table.querySelectorAll('tbody td')).reduce(
      (count, cell) => count + (String(cell.textContent || '').trim().length > 0 ? 1 : 0),
      0,
    );

  let primary: HTMLTableElement = tables[0]!;
  const standards = tables.filter((table) => isStandardCrewTable(table));
  if (standards.length) {
    primary = standards[standards.length - 1]!;
  } else {
    let best = score(primary);
    tables.slice(1).forEach((table) => {
      const current = score(table);
      if (current > best) {
        primary = table;
        best = current;
      }
    });
  }

  const primaryBody = primary.tBodies?.[0];
  if (!primaryBody) return;

  const rowsToMerge: string[][] = [];
  tables.forEach((table) => {
    if (table === primary) return;
    if (!isStandardCrewTable(table)) return;
    const body = table.tBodies?.[0];
    if (!body) return;
    Array.from(body.children).forEach((row) => {
      if (rowHasAnyContent(row)) {
        rowsToMerge.push(Array.from(row.children).map((cell) => cell.textContent || ''));
      }
    });
  });

  if (rowsToMerge.length) {
    ensureEmptyRows(primaryBody, Math.max(0, rowsToMerge.length - primaryBody.children.length));
  }

  let idx = 0;
  Array.from(primaryBody.children).forEach((row) => {
    if (idx >= rowsToMerge.length) return;
    if (rowHasAnyContent(row)) return;
    const values = rowsToMerge[idx++]!;
    Array.from(row.children).forEach((cell, cellIndex) => {
      cell.textContent = values[cellIndex] || '';
    });
  });

  tables.forEach((table) => {
    if (table !== primary) {
      try {
        table.parentElement?.removeChild(table);
      } catch {
        // ignore DOM removal failures
      }
    }
  });
}

export function ensureSingleCrewTableStrict(root?: ParentNode | null): void {
  const base = getTemplatesRoot(root);
  if (!base) return;

  try {
    const pagesWrap = base.querySelector('[data-a4-pages]');
    const pages = pagesWrap ? Array.from(pagesWrap.querySelectorAll('.a4-page')) : [];
    const pageIndex = (element: Element | null): number => {
      const page = element?.closest('.a4-page');
      return page ? pages.indexOf(page) : -1;
    };

    const crewish = Array.from(base.getElementsByTagName('table')).filter(isCrewishTable);
    if (crewish.length <= 1) return;

    const standards = crewish.filter((table) => table.classList.contains('cs-crew'));
    const primary =
      standards.find((table) => pageIndex(table) === 1) ||
      standards[standards.length - 1] ||
      crewish[0];
    if (!(primary instanceof HTMLTableElement)) return;

    const primaryBody = primary.tBodies?.[0];
    if (!primaryBody) return;

    crewish.forEach((table) => {
      if (table === primary) return;
      if (table instanceof HTMLTableElement && table.classList.contains('cs-crew')) {
        const body = table.tBodies?.[0];
        if (body) {
          const payload = Array.from(body.children)
            .map((row) => Array.from(row.children).map((cell) => cell.textContent || ''))
            .filter((values) => values.some((value) => String(value || '').trim().length > 0));
          if (payload.length) {
            ensureEmptyRows(primaryBody, Math.max(0, payload.length - primaryBody.children.length));
          }
          let idx = 0;
          Array.from(primaryBody.children).forEach((row) => {
            if (idx >= payload.length) return;
            if (rowHasAnyContent(row)) return;
            const values = payload[idx++]!;
            Array.from(row.children).forEach((cell, cellIndex) => {
              cell.textContent = values[cellIndex] || '';
            });
          });
        }
      }

      try {
        table.parentElement?.removeChild(table);
      } catch {
        // ignore DOM removal failures
      }
    });

    try {
      const page = primary.closest('.a4-page');
      if (page && pagesWrap) {
        const current = Array.from(pagesWrap.children).indexOf(page);
        if (current !== 1) pagesWrap.insertBefore(page, pagesWrap.children[1] || null);
      }
    } catch {
      // ignore placement failures
    }
  } catch {
    // ignore strict cleanup failures
  }
}
