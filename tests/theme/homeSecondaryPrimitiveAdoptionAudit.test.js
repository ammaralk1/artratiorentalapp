import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('home secondary primitive adoption audit', () => {
  it('adopts the shared tabs aliases on the extracted home surface without dropping legacy tab contracts', () => {
    const homePage = readSource('src/pages/home.html');

    expect(homePage).toContain('class="ui-tab tab-button" href="clients.html"');
    expect(homePage).toContain('class="ui-tab tab-button" href="crew.html"');
    expect(homePage).toContain('class="ui-tab tab-button" href="operations.html#reservations-tab"');
    expect(homePage).toContain('href="users.html" class="home-topbar-menu__item hidden" data-admin-card');
  });

  it('records home as the first live ui-tabs adoption target in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 3 Home Secondary Primitive Adoption');
    expect(masterPlan).toContain('`home.html` now proves the new shared `ui-tabs` and `ui-tab` aliases on a live extracted tab surface');
    expect(masterPlan).toContain('`customer.html` and `technician.html`');
  });
});
