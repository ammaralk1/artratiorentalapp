import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

const FULL_FAMILY = {
  'src/pages/projects.html': {
    minLineCount: 900,
    pageScript: '/src/scripts/projects.js',
    requiresBootstrapCss: true,
    usesSharedShell: true,
    markers: [
      '<!-- @include "./_partials/full-manager-shell.html"',
      'data-slot="sidebarStats"',
      'data-slot="sidebarTabs"',
      'data-slot="sidebarLinks"',
      'data-slot="greetingPanel"',
      'data-slot="mainContent"',
      'data-slot="afterShell"',
      'data-slot="pageScripts"',
      'data-project-subtab-target="projects-list-tab"',
      'data-project-subtab-target="projects-templates-tab"',
      'id="projectDetailsModal"',
      'id="reservationDetailsModal"',
      'id="closeProjectModal"',
    ],
  },
  'src/pages/dashboard.html': {
    minLineCount: 1700,
    pageScript: '/src/main.js',
    requiresBootstrapCss: false,
    usesSharedShell: true,
    markers: [
      '<!-- @include "./_partials/full-manager-shell.html"',
      'data-slot="sidebarStats"',
      'data-slot="sidebarTabs"',
      'data-slot="sidebarLinks"',
      'data-slot="greetingPanel"',
      'data-slot="mainContent"',
      'data-slot="afterShell"',
      'href="clients.html"',
      'href="crew.html"',
      'href="equipment.html"',
      'href="maintenance.html"',
      'fullcalendar@6.1.8/index.global.min.js',
      'xlsx@0.18.5/dist/xlsx.full.min.js',
      'id="calendarReservationModal"',
      'id="reservationDetailsModal"',
      'id="closeReservationModal"',
    ],
  },
};

describe('full shell prep audit', () => {
  it('captures the locked projects-first order and the heavier dashboard follow-up in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 2 Full Family Prep Snapshot');
    expect(masterPlan).toContain('`dashboard.html` and `projects.html` are the current `full` shell family');
    expect(masterPlan).toContain('`projects.html` is the first recommended extraction target inside the `full` family');
    expect(masterPlan).toContain('`dashboard.html` must stay second because it still boots through `/src/main.js`');
    expect(masterPlan).toContain('The dedicated dark-validation plan for the `full` family must be recorded before any shared partial replaces either page');
    expect(masterPlan).toContain('The shared `full`-family shell scaffold now exists at `src/pages/_partials/full-manager-shell.html`');
    expect(masterPlan).toContain('The first `dashboard.html` extraction pass onto `src/pages/_partials/full-manager-shell.html` is now implemented');
  });

  it('keeps the full-family snapshot aligned with the current page anatomy and dependency split', () => {
    Object.entries(FULL_FAMILY).forEach(([path, config]) => {
      const source = readSource(path);

      expect(source.trimEnd().split('\n').length).toBeGreaterThanOrEqual(config.minLineCount);
      expect(source).toContain(config.pageScript);
      expect(source).toContain('flatpickr.min.css');
      if (config.usesSharedShell) {
        expect(source).not.toContain('id="sidebar-backdrop"');
        expect(source).not.toContain('id="dashboard-sidebar"');
        expect(source).not.toContain('class="dashboard-header"');
      }

      config.markers.forEach((marker) => {
        expect(source).toContain(marker);
      });

      if (config.requiresBootstrapCss) {
        expect(source).toContain('bootstrap.rtl.min.css');
      } else {
        expect(source).not.toContain('bootstrap.rtl.min.css');
      }
    });
  });
});
