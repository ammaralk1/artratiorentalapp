import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dashboard fixture audit', () => {
  it('keeps the dashboard fixture localhost-only and explicitly gated by fixture=dashboard', () => {
    const fixtureRuntime = readSource('src/scripts/fixtureRuntime.js');
    const fixtureSource = readSource('src/scripts/devFixtures.js');

    expect(fixtureRuntime).toContain("url.searchParams.get('fixture')");
    expect(fixtureRuntime).toContain("return getLocalFixtureValue() === 'dashboard';");
    expect(fixtureRuntime).toContain("host === 'localhost'");
    expect(fixtureRuntime).toContain("host === '127.0.0.1'");
    expect(fixtureSource).toContain('export function applyLocalDashboardFixture()');
    expect(fixtureSource).toContain('const fixture = buildDashboardFixtureData();');
    expect(fixtureSource).toContain('setEquipment(fixture.equipment);');
    expect(fixtureSource).toContain('setTechniciansState(fixture.technicians);');
    expect(fixtureSource).toContain('setProjectsState(fixture.projects);');
    expect(fixtureSource).toContain('setReservationsState(fixture.reservations);');
    expect(fixtureSource).toContain('setMaintenanceState(fixture.maintenance);');
  });

  it('keeps dashboard boot and heavy data loaders aligned with the fixture path', () => {
    const mainSource = readSource('src/main.js');
    const authSource = readSource('src/scripts/auth.js');
    const projectsApp = readSource('src/scripts/projects/app.js');
    const reservationsService = readSource('src/scripts/reservations/service/api.js');
    const maintenanceService = readSource('src/scripts/maintenanceService.js');
    const reportsDataService = readSource('src/scripts/reports/dataService.js');
    const reportsSource = readSource('src/scripts/reports.js');

    expect(mainSource).toContain("import { applyLocalDashboardFixture, isLocalDashboardFixtureEnabled } from './scripts/devFixtures.js';");
    expect(mainSource).toContain('const dashboardFixtureActive = applyLocalDashboardFixture();');
    expect(mainSource).toContain('if (dashboardFixtureActive || isLocalDashboardFixtureEnabled()) {');
    expect(authSource).toContain("const SKIP_PREF_KEY = '__ART_RATIO_SKIP_PREF_FETCH__';");
    expect(authSource).toContain('function syncBypassPreferenceFlag() {');
    expect(authSource).toContain('if (shouldBypassAuth()) {');
    expect(authSource).toContain('window[SKIP_PREF_KEY] = true;');
    expect(authSource).toContain('syncBypassPreferenceFlag();');
    expect(projectsApp).toContain("import { initTemplatesTab } from './templatesTab.js';");
    expect(projectsApp).toContain('initTemplatesTab();');
    expect(projectsApp).not.toContain('if (!(isLocalBypassAuthEnabled() && isLocalDashboardFixtureEnabled()))');
    expect(reservationsService).toContain('if (isLocalDashboardFixtureEnabled()) {');
    expect(maintenanceService).toContain('if (isLocalDashboardFixtureEnabled()) {');
    expect(reportsDataService).toContain('if (isLocalDashboardFixtureEnabled()) {');
    expect(reportsDataService).toContain('hydrateReportsFromCache();');
    expect(reportsSource).toContain('const params = new URLSearchParams(window.location.search);');
    expect(reportsSource).toContain("].forEach((key) => params.delete(key));");
  });
});
