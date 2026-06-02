import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('contact inquiries primitive audit', () => {
  it('keeps the page markup on the shared stat and empty-state primitives', () => {
    const pageSource = readSource('src/pages/contact-inquiries.html');

    expect(pageSource).toMatch(/class="[^"]*\bui-stat-card\b[^"]*\bcompact-kpi-card\b[^"]*"/);
    expect(pageSource).toContain('class="ui-empty-state surface-empty-state p-6"');
    expect(pageSource).toContain('class="ui-empty-state surface-empty-state p-5"');
  });

  it('keeps runtime-rendered controls and detail surfaces on the shared primitive contract', () => {
    const scriptSource = readSource('src/scripts/contactInquiries.js');

    expect(scriptSource).toContain("const DETAIL_CARD_CLASS = 'contact-inquiries-detail-card ui-card ui-card--content p-4';");
    expect(scriptSource).toContain("const EMPTY_STATE_CLASS = 'contact-inquiries-empty-state ui-empty-state surface-empty-state';");
    expect(scriptSource).toContain("const PRIMARY_BUTTON_SM_CLASS = 'ui-button ui-button--primary btn btn-primary btn-sm';");
    expect(scriptSource).toContain("const OUTLINE_BUTTON_SM_CLASS = 'ui-button ui-button--outline btn btn-outline btn-sm';");
    expect(scriptSource).toContain("const SELECT_CLASS = 'ui-select select select-bordered w-full';");
    expect(scriptSource).toContain("const INPUT_CLASS = 'ui-input input input-bordered w-full';");
    expect(scriptSource).toContain("const TEXTAREA_CLASS = 'ui-textarea textarea textarea-bordered min-h-36 w-full';");
    expect(scriptSource).toContain('function emptyStateMarkup(message, paddingClass = \'p-6\')');
  });
});
