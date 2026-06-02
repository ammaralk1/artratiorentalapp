import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('operations route audit', () => {
  it('keeps operations.html as the canonical reservation operations surface', () => {
    const operationsPage = readSource('src/pages/operations.html');
    const viteConfig = readSource('vite.config.js');

    expect(operationsPage).toContain('pageScript":"/src/main.js"');
    expect(operationsPage).toContain('id="reservationDetailsModal"');
    expect(operationsPage).toContain('id="closeReservationModal"');
    expect(operationsPage).toContain('id="calendarReservationModal"');
    expect(operationsPage).toContain('href="clients.html"');
    expect(operationsPage).toContain('href="crew.html"');
    expect(operationsPage).toContain('href="equipment.html"');
    expect(operationsPage).toContain('href="maintenance.html"');
    expect(viteConfig).toContain("operations: resolve(__dirname, 'src/pages/operations.html')");
    expect(viteConfig).toContain("dashboard: resolve(__dirname, 'src/pages/dashboard.html')");
  });

  it('keeps dashboard.html as the temporary compatibility alias', () => {
    const mainSource = readSource('src/main.js');
    const homePage = readSource('src/pages/home.html');
    const projectsPage = readSource('src/pages/projects.html');
    const controllerSource = readSource('src/scripts/reservations/controller.js');

    expect(mainSource).toContain("function redirectLegacyOperationsRoute()");
    expect(mainSource).toContain("hash === '#equipment-tab'");
    expect(mainSource).toContain("? 'equipment.html'");
    expect(mainSource).toContain("hash === '#maintenance-tab'");
    expect(mainSource).toContain("? 'maintenance.html'");
    expect(mainSource).toContain("pageName === 'dashboard.html'");
    expect(mainSource).toContain("hash === '#reservations' || hash === '#reservations-tab' ? '' : hash");
    expect(mainSource).toContain('window.location.replace(`operations.html');
    expect(homePage).toContain('href="operations.html#reservations-tab"');
    expect(projectsPage).toContain('href="operations.html#reservations-tab"');
    expect(controllerSource).toContain('operations.html?${search}#reservations');
  });
});
