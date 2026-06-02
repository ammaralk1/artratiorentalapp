import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('full primitive adoption audit', () => {
  it('keeps projects on the in-place primitive adoption pattern for the extracted full family', () => {
    const projectsPage = readSource('src/pages/projects.html');

    expect(projectsPage).toContain('class="ui-tabs ui-tabs--vertical tab-buttons tab-buttons-vertical"');
    expect(projectsPage).toContain('class="ui-card ui-card--content glass-card subtab-scroll-card dashboard-subtabbar"');
    expect(projectsPage).toContain('class="ui-select form-select select select-bordered w-full"');
    expect(projectsPage).toContain('class="ui-input form-control input input-bordered w-full"');
    expect(projectsPage).toContain('class="project-create-section project-operational-booking"');
    expect(projectsPage).toContain('id="templates-refresh"');
    expect(projectsPage).toContain('class="ui-button ui-button--danger btn btn-outline btn-danger" id="templates-delete"');
    expect(projectsPage).toContain('class="ui-button ui-button--primary btn btn-primary" id="templates-print"');
    expect(projectsPage).toContain('textarea id="close-project-notes" class="ui-textarea form-control" rows="4"');
    expect(projectsPage).toContain('class="ui-button ui-button--primary btn btn-primary customer-edit-modal__save-btn" id="close-project-submit"');
  });

  it('records projects as the first full-family primitive adoption reference in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('`projects.html` is now the first primitive-adoption reference inside the extracted `full` family');
    expect(masterPlan).toContain('Phase 3 Full Family Primitive Adoption');
    expect(masterPlan).toContain('`dashboard.html`');
  });
});
