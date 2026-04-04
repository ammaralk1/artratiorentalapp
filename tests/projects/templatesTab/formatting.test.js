import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  adjustSelectionFont,
  applyShadeFromControls,
  clearShadeFromControls,
  ensureLogoControls,
  readPrimaryLogoState,
  readSecondaryLogoState,
  toggleSelectionBold,
  writePrimaryLogoState,
  writeSecondaryLogoState,
} from '../../../src/scripts/projects/templatesTab/formatting.ts';

function createOptions(overrides = {}) {
  return {
    getContextKey: () => 'templates.callsheet.autosave.7.callsheet.all',
    companyInfo: { logoUrl: '/brand/logo.png' },
    renderPreview: vi.fn(),
    undoChange: vi.fn(),
    redoChange: vi.fn(),
    pushHistoryDebounced: vi.fn(),
    saveAutosaveDebounced: vi.fn(),
    markEditing: vi.fn(),
    notifyApiError: vi.fn(),
    ...overrides,
  };
}

function selectNodeText(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(true);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

describe('templatesTab/formatting', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('reads and writes callsheet logo state through storage', () => {
    writeSecondaryLogoState({ url: 'https://art-ratio.sirv.com/client.png', s: 1.5, x: 12, y: -8 });
    writePrimaryLogoState({ s: 0.9, x: 4, y: 6, h: true });

    expect(readSecondaryLogoState()).toEqual({
      url: 'https://assets.art-ratio.com/client.png',
      s: 1.5,
      x: 12,
      y: -8,
    });
    expect(readPrimaryLogoState()).toEqual({
      s: 0.9,
      x: 4,
      y: 6,
      h: true,
    });
  });

  it('renders callsheet logo controls and wires history and preview actions', () => {
    document.body.innerHTML = '<div id="templates-controls"></div>';
    writeSecondaryLogoState({ url: '/client/logo.png', s: 1.2 });
    writePrimaryLogoState({ s: 0.8, h: true });
    const options = createOptions();

    ensureLogoControls('callsheet', options);

    expect(document.getElementById('tpl-logo-controls')).not.toBeNull();
    expect(document.getElementById('tpl-logo2-url')?.value).toBe('/client/logo.png');
    expect(document.getElementById('tpl-logo2-size')?.value).toBe('1.2');
    expect(document.getElementById('tpl-logo1-size')?.value).toBe('0.8');
    expect(document.getElementById('tpl-logo1-hide')?.checked).toBe(true);

    document.getElementById('tpl-undo')?.click();
    document.getElementById('tpl-redo')?.click();
    expect(options.undoChange).toHaveBeenCalledTimes(1);
    expect(options.redoChange).toHaveBeenCalledTimes(1);

    document.getElementById('tpl-logo2-url').value = '/updated/logo.png';
    document.getElementById('tpl-logo2-apply')?.click();
    expect(readSecondaryLogoState().url).toBe('/updated/logo.png');
    expect(options.renderPreview).toHaveBeenCalledTimes(1);
  });

  it('applies font, bold, and shading changes to the selected callsheet cell', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <table>
          <tbody>
            <tr>
              <td data-editable="true" contenteditable="true">Alpha</td>
              <td data-editable="true" contenteditable="true">Beta</td>
            </tr>
          </tbody>
        </table>
      </div>
      <input id="tpl-shade-color" value="#ff0000">
      <input id="tpl-shade-opacity" value="50">
      <select id="tpl-shade-target">
        <option value="cell" selected>Cell</option>
        <option value="row">Row</option>
      </select>
    `;
    const target = document.querySelector('td');
    const options = createOptions();

    target.focus();
    selectNodeText(target.firstChild);

    adjustSelectionFont(1, options);
    expect(target.style.fontSize).toBe('22px');

    toggleSelectionBold(options);
    expect(target.style.fontWeight).toBe('700');

    applyShadeFromControls(options);
    expect(target.getAttribute('data-shaded')).toBe('1');
    expect(target.style.getPropertyValue('--shade')).toContain('rgba(255, 0, 0, 0.5)');

    clearShadeFromControls(options);
    expect(target.hasAttribute('data-shaded')).toBe(false);
    expect(options.pushHistoryDebounced).toHaveBeenCalled();
    expect(options.saveAutosaveDebounced).toHaveBeenCalled();
    expect(options.markEditing).toHaveBeenCalled();
  });
});
