import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

const COMPACT_ADOPTION_PAGES = [
  {
    path: 'src/pages/site-analytics.html',
    buttonSnippets: [
      'class="ui-button ui-button--primary btn btn-primary btn-sm"',
      'class="ui-button ui-button--outline btn btn-outline btn-sm"',
    ],
    selectSnippets: [
      'class="ui-select select select-bordered select-sm min-w-[150px]"',
      'class="ui-select select select-bordered select-sm min-w-[170px]"',
    ],
  },
  {
    path: 'src/pages/contact-inquiries.html',
    buttonSnippets: [
      'class="ui-button ui-button--primary btn btn-primary btn-sm"',
      'class="ui-button ui-button--outline btn btn-outline btn-sm"',
    ],
    selectSnippets: ['class="ui-select select select-bordered w-full"'],
    inputSnippets: ['class="ui-input input input-bordered w-full"'],
  },
  {
    path: 'src/pages/feedback-submissions.html',
    buttonSnippets: [
      'class="ui-button ui-button--primary btn btn-primary btn-sm"',
      'class="ui-button ui-button--outline btn btn-outline btn-sm"',
    ],
    selectSnippets: ['class="ui-select select select-bordered w-full"'],
    inputSnippets: ['class="ui-input input input-bordered w-full"'],
  },
  {
    path: 'src/pages/users.html',
    buttonSnippets: [
      'class="btn btn-primary btn-sm"',
      'class="btn btn-outline btn-sm"',
    ],
    selectSnippets: ['class="ui-select select select-bordered w-full"'],
    inputSnippets: [
      'class="ui-input input input-bordered w-full" id="user-username"',
      'class="ui-input input input-bordered w-full" id="user-password"',
    ],
  },
];

describe('compact primitive adoption audit', () => {
  it('keeps the extracted compact manager family on the in-place primitive adoption pattern', () => {
    COMPACT_ADOPTION_PAGES.forEach(({ path, buttonSnippets = [], selectSnippets = [], inputSnippets = [] }) => {
      const source = readSource(path);

      expect(source).toContain('class="ui-card ui-card--content glass-card');

      buttonSnippets.forEach((snippet) => {
        expect(source).toContain(snippet);
      });

      selectSnippets.forEach((snippet) => {
        expect(source).toContain(snippet);
      });

      inputSnippets.forEach((snippet) => {
        expect(source).toContain(snippet);
      });
    });
  });

  it('records the compact-family primitive adoption baseline in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('compact manager family shares one primitive-adoption baseline');
    expect(masterPlan).toContain('`site-analytics.html`');
    expect(masterPlan).toContain('`contact-inquiries.html`');
    expect(masterPlan).toContain('`feedback-submissions.html`');
    expect(masterPlan).toContain('`users.html`');
  });
});
