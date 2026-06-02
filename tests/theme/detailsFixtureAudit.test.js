import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function read(relativePath) {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('details fixture audit', () => {
  it('keeps the populated detail-state fixture localhost-only and explicitly gated by fixture=details', () => {
    const fixtureSource = read('src/scripts/devFixtures.js');
    const runtimeSource = read('src/scripts/fixtureRuntime.js');

    expect(runtimeSource).toContain("url.searchParams.get('fixture')");
    expect(runtimeSource).toContain("return getLocalFixtureValue() === 'details';");
    expect(runtimeSource).toContain("host === 'localhost'");
    expect(runtimeSource).toContain("host === '127.0.0.1'");
    expect(fixtureSource).toContain('setTechniciansState(fixture.technicians);');
    expect(fixtureSource).toContain('setProjectsState(fixture.projects);');
    expect(fixtureSource).toContain('setReservationsState(fixture.reservations);');
    expect(fixtureSource).toContain('createLocalFixturePayout');
    expect(fixtureSource).toContain('deleteLocalFixturePayout');
  });

  it('keeps customer detail boot aligned with the controlled local fixture path', () => {
    const customerPage = read('src/scripts/customerPage.js');

    expect(customerPage).toContain("import { applyLocalDetailsFixture, isLocalDetailsFixtureEnabled } from './devFixtures.js';");
    expect(customerPage).toContain('const detailsFixtureActive = applyLocalDetailsFixture();');
    expect(customerPage).toContain('if (detailsFixtureActive) {');
    expect(customerPage).toContain('updateSidebarStats();');
    expect(customerPage).toContain(`if (detailsFixtureActive && isLocalDetailsFixtureEnabled()) {
    if (!currentCustomer) {
      renderDetails();
    }
    return;
  }

  await loadCustomerFromApi(customerId, { showSpinner: !currentCustomer });`);
  });

  it('keeps technician detail boot and financial modal aligned with the controlled local fixture path', () => {
    const technicianPage = read('src/scripts/technicianPage.js');
    const technicianDetails = read('src/scripts/technicianDetails.js');

    expect(technicianPage).toContain("import {\n  applyLocalDetailsFixture,");
    expect(technicianPage).toContain('const detailsFixtureActive = applyLocalDetailsFixture();');
    expect(technicianPage).toContain('const createPayout = detailsFixtureActive ? createLocalFixturePayout : createTechnicianPayout;');
    expect(technicianPage).toContain('const removePayout = detailsFixtureActive ? deleteLocalFixturePayout : deleteTechnicianPayout;');
    expect(technicianPage).toContain('? getLocalFixturePayouts(normalizedId)');
    expect(technicianPage).toContain('if (!detailsFixtureActive) {');
    expect(technicianPage).toContain('await refreshTechniciansFromApi();');
    expect(technicianDetails).toContain('!technicianReservationsHydrated && !isLocalDetailsFixtureEnabled()');
  });

  it('records the controlled fixture workflow in the master plan', () => {
    const masterPlan = read('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('fixture=details');
    expect(masterPlan).toContain('controlled local fixture');
    expect(masterPlan).toContain('populated dark-state validation');
  });
});
