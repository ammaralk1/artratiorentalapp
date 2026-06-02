import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('full-family primitive parity audit', () => {
  it('keeps both extracted full-family pages on the shared primitive adoption baseline', () => {
    const projectsPage = readSource('src/pages/projects.html');
    const dashboardPage = readSource('src/pages/dashboard.html');

    expect(projectsPage).toContain('ui-card ui-card--content');
    expect(projectsPage).toContain('ui-input form-control');
    expect(projectsPage).toContain('ui-select form-select');
    expect(projectsPage).toContain('ui-button ui-button--primary btn btn-primary');
    expect(projectsPage).toContain('ui-textarea form-control');
    expect(projectsPage).toContain('ui-tabs');
    expect(projectsPage).toContain('ui-table');
    expect(projectsPage).toContain('ui-modal__content');
    expect(projectsPage).toContain('ui-badge');

    expect(dashboardPage).toContain('ui-card ui-card--content');
    expect(dashboardPage).toContain('ui-input form-control');
    expect(dashboardPage).toContain('ui-select form-select');
    expect(dashboardPage).toContain('ui-button ui-button--primary btn btn-primary');
    expect(dashboardPage).toContain('ui-textarea form-control');
    expect(dashboardPage).toContain('ui-tabs');
    expect(dashboardPage).toContain('ui-table');
    expect(dashboardPage).toContain('ui-modal__content');
    expect(dashboardPage).toContain('ui-badge');
  });

  it('records fixture-backed dashboard validation as the current full-family parity checkpoint', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 3 Dashboard Primitive Validation');
    expect(masterPlan).toContain('dashboard-primitive-equipment-ar.png');
    expect(masterPlan).toContain('dashboard.html?bypassAuth=1&fixture=dashboard');
    expect(masterPlan).toContain('Table`, `Modal`, `Tabs`, and `Badge`');
  });
});
