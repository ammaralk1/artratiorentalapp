import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('full secondary primitive adoption audit', () => {
  it('keeps projects on the in-place secondary primitive adoption pattern for the extracted full family', () => {
    const projectsPage = readSource('src/pages/projects.html');

    expect(projectsPage).toContain('class="ui-badge ui-badge--soft badge-soft"');
    expect(projectsPage).toContain('class="ui-tabs ui-tabs--vertical tab-buttons tab-buttons-vertical" role="tablist"');
    expect(projectsPage).toContain('class="ui-tab tab-button active" href="projects.html"');
    expect(projectsPage).toContain('class="ui-tabs tab-buttons tab-buttons-horizontal" role="tablist"');
    expect(projectsPage).toContain('class="ui-tab tab-button tab-active active" data-tab-target="projects-section"');
    expect(projectsPage).toContain('class="ui-tabs sub-tab-buttons tabs tabs-boxed" role="tablist"');
    expect(projectsPage).toContain('class="ui-tab sub-tab-button tab tab-active active"');
    expect(projectsPage).toContain('class="ui-badge badge timeline-status-badge timeline-status-badge--upcoming"');
    expect(projectsPage).toContain('class="users-table-wrapper overflow-x-auto"');
    expect(projectsPage).toContain('class="ui-table users-table surface-table table table-hover align-middle"');
    expect(projectsPage).toMatch(/class="[^"]*\breports-table-card\b[^"]*\bprojects-table\b[^"]*\bglass-card\b[^"]*\bui-card\b[^"]*\bui-card--content\b[^"]*"/);
    expect(projectsPage).toContain('class="users-table-wrapper overflow-x-auto reports-table-wrapper reports-results-table-wrapper"');
    expect(projectsPage).toMatch(/class="[^"]*\bui-table\b[^"]*\busers-table\b[^"]*\bsurface-table\b[^"]*\breports-table\b[^"]*" id="reports-table"/);
    expect(projectsPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell"');
    expect(projectsPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table customer-table align-middle"');
    expect(projectsPage).toContain('class="ui-modal__content modal-content customer-edit-modal__content reservation-shell-modal__content"');
    expect(projectsPage).toContain('class="ui-modal__header modal-header customer-edit-modal__header reservation-shell-modal__header"');
    expect(projectsPage).toContain('class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body" id="reservation-details-body"');
    expect(projectsPage).toContain('class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer"');
  });

  it('records projects as the first full-family secondary primitive reference in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 3 Full Family Secondary Primitive Adoption');
    expect(masterPlan).toContain('`projects.html` is now the first extracted `full`-family reference for the shared `Table`, `Modal`, `Tabs`, and `Badge` bridge');
    expect(masterPlan).toContain('`dashboard.html` secondary primitive pass');
  });
});
