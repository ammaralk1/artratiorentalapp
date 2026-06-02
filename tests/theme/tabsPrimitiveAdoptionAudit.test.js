import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const HOME_PAGE = resolve(process.cwd(), 'src/pages/home.html');
const MASTER_PLAN_PATH = resolve(process.cwd(), 'docs/UI_REDESIGN_MASTER_PLAN.md');

const readSource = (path) => readFileSync(path, 'utf8');

describe('tabs primitive adoption audit', () => {
  it('keeps home on the in-place primitive adoption pattern for the extracted tabs family', () => {
    const pageSource = readSource(HOME_PAGE);

    expect(pageSource).toContain('class="ui-button ui-button--primary btn btn-primary"');
    expect(pageSource).toContain('class="ui-button ui-button--outline btn btn-outline"');
    expect(pageSource).toContain('id="home-refresh-summary"');
    expect(pageSource).toContain('class="home-welcome-card"');
    expect(pageSource).toContain('home-section-card home-workspace-section');
    expect(pageSource).toContain('home-section-card home-summary-section');
    expect(pageSource).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
    expect(pageSource).toContain('data-slot="sidebarTabs"');
    expect(pageSource).toContain('data-slot="greetingPanel"');
    expect(pageSource).toContain('class="ui-tab tab-button" href="clients.html"');
    expect(pageSource).toContain('class="ui-tab tab-button" href="crew.html"');
    expect(pageSource).toContain('class="ui-tab tab-button" href="operations.html#reservations-tab"');
  });

  it('records home as the first tabs-family primitive adoption reference in the master plan', () => {
    const masterPlan = readSource(MASTER_PLAN_PATH);

    expect(masterPlan).toContain('`home.html` is now the first primitive-adoption reference on the extracted `tabs` family');
    expect(masterPlan).toContain('Phase 3 Home Primitive Adoption');
    expect(masterPlan).toContain('`home.html`');
  });
});
