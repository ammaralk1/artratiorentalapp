import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

describe('reports surface audit', () => {
  it('keeps the reports dashboard host free of theme-hostile inline styles', () => {
    const dashboard = read('src/pages/dashboard.html');

    expect(dashboard).not.toContain('id="reports-quick-chips" class="reports-quick-chips" style=');
    expect(dashboard).not.toContain('id="reports-kpi-skeleton" aria-hidden="true" style=');
    expect(dashboard).not.toContain('id="reservations-revenue-skeleton" class="reports-breakdown-list" aria-hidden="true" style=');
    expect(dashboard).toContain('id="reports-kpi-skeleton" aria-hidden="true" hidden');
    expect(dashboard).toContain('id="reservations-revenue-skeleton" class="reports-breakdown-list" aria-hidden="true" hidden');
  });

  it('keeps reports renderers free of inline presentation styles', () => {
    const projectsReports = read('src/scripts/projectsReports.js');
    const quickChips = read('src/scripts/reports/presenters/ui.js');

    expect(projectsReports).not.toContain('style="color:');
    expect(projectsReports).not.toContain('style="margin-top: 12px;');
    expect(quickChips).not.toContain('style="padding:0 6px;opacity:.6;"');
    expect(quickChips).toContain('reports-quick-chips-separator');
  });
});
