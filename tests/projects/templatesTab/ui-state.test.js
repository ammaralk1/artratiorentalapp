import { beforeEach, describe, expect, it } from 'vitest';

import {
  resolveTemplatesSavedPresentation,
  resolveTemplatesSaveTitlePresentation,
  setTemplatesButtonBusy,
  setTemplatesWorkspaceStatus,
  syncTemplatesSavedControlsState,
} from '../../../src/scripts/projects/templatesTab/ui-state.ts';

describe('templatesTab/ui-state', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('writes the live workspace status tone and message', () => {
    document.body.innerHTML = '<p id="status"></p>';
    const status = document.getElementById('status');

    setTemplatesWorkspaceStatus(status, 'Saved successfully', 'success');

    expect(status?.textContent).toBe('Saved successfully');
    expect(status?.dataset.statusTone).toBe('success');
    expect(status?.hidden).toBe(false);
  });

  it('toggles busy button labels while restoring the previous disabled state', () => {
    document.body.innerHTML = '<button id="save" type="button">Save</button>';
    const button = document.getElementById('save');

    setTemplatesButtonBusy(button, true, 'Saving…');
    expect(button?.textContent).toBe('Saving…');
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(button).toHaveProperty('disabled', true);

    setTemplatesButtonBusy(button, false);
    expect(button?.textContent).toBe('Save');
    expect(button?.hasAttribute('aria-busy')).toBe(false);
    expect(button).toHaveProperty('disabled', false);
  });

  it('keeps saved-template controls aligned with project, loading, and selection state', () => {
    document.body.innerHTML = `
      <div class="enhanced-select"><select id="saved"><option value="">— Saved versions —</option></select></div>
      <button id="rename" type="button"></button>
      <button id="delete" type="button"></button>
      <button id="import" type="button"></button>
    `;

    const select = document.getElementById('saved');
    const rename = document.getElementById('rename');
    const deleteButton = document.getElementById('delete');
    const importButton = document.getElementById('import');

    syncTemplatesSavedControlsState({
      selectEl: select,
      hasProject: false,
      hasItems: false,
      chooseProjectLabel: 'Choose project first',
      selectionButtons: [rename, deleteButton],
      projectButtons: [importButton],
    });

    expect(select?.textContent).toContain('Choose project first');
    expect(select).toHaveProperty('disabled', true);
    expect(rename).toHaveProperty('disabled', true);
    expect(deleteButton).toHaveProperty('disabled', true);
    expect(importButton).toHaveProperty('disabled', true);
    expect(select.closest('.enhanced-select')?.getAttribute('data-templates-saved-state')).toBe('choose-project');

    if (!(select instanceof HTMLSelectElement)) throw new Error('missing select');
    select.innerHTML = `
      <option value="">— Saved versions —</option>
      <option value="4" selected>Template Four</option>
    `;
    select.value = '4';

    syncTemplatesSavedControlsState({
      selectEl: select,
      hasProject: true,
      hasItems: true,
      selectionButtons: [rename, deleteButton],
      projectButtons: [importButton],
    });

    expect(select.disabled).toBe(false);
    expect(rename).toHaveProperty('disabled', false);
    expect(deleteButton).toHaveProperty('disabled', false);
    expect(importButton).toHaveProperty('disabled', false);
    expect(select.closest('.enhanced-select')?.getAttribute('data-templates-saved-state')).toBe('ready');
  });

  it('resolves save-title presentation mode across automatic, selected, and custom states', () => {
    expect(resolveTemplatesSaveTitlePresentation({
      hasProject: false,
      selectedLabel: '',
      currentValue: '',
      previousAutoValue: '',
      defaultTitle: '',
    })).toMatchObject({
      mode: 'choose-project',
      suggestedTitle: '',
      userHasCustomValue: false,
    });

    expect(resolveTemplatesSaveTitlePresentation({
      hasProject: true,
      selectedLabel: '',
      currentValue: '',
      previousAutoValue: '',
      defaultTitle: 'Project A - Call Sheet',
    })).toMatchObject({
      mode: 'auto',
      suggestedTitle: 'Project A - Call Sheet',
      userHasCustomValue: false,
    });

    expect(resolveTemplatesSaveTitlePresentation({
      hasProject: true,
      selectedLabel: 'Saved Snapshot',
      currentValue: 'Saved Snapshot',
      previousAutoValue: 'Saved Snapshot',
      defaultTitle: 'Project A - Call Sheet',
    })).toMatchObject({
      mode: 'selected',
      suggestedTitle: 'Saved Snapshot',
      userHasCustomValue: false,
    });

    expect(resolveTemplatesSaveTitlePresentation({
      hasProject: true,
      selectedLabel: 'Saved Snapshot',
      currentValue: 'My Custom Name',
      previousAutoValue: 'Saved Snapshot',
      defaultTitle: 'Project A - Call Sheet',
    })).toMatchObject({
      mode: 'custom',
      suggestedTitle: 'Saved Snapshot',
      userHasCustomValue: true,
    });
  });

  it('resolves saved-list presentation mode across choose-project, loading, empty, ready, and selected states', () => {
    expect(resolveTemplatesSavedPresentation({
      hasProject: false,
      hasItems: false,
      isLoading: false,
      selectedLabel: '',
    }).mode).toBe('choose-project');

    expect(resolveTemplatesSavedPresentation({
      hasProject: true,
      hasItems: false,
      isLoading: true,
      selectedLabel: '',
    }).mode).toBe('loading');

    expect(resolveTemplatesSavedPresentation({
      hasProject: true,
      hasItems: false,
      isLoading: false,
      selectedLabel: '',
    }).mode).toBe('empty');

    expect(resolveTemplatesSavedPresentation({
      hasProject: true,
      hasItems: true,
      isLoading: false,
      selectedLabel: '',
    }).mode).toBe('ready');

    expect(resolveTemplatesSavedPresentation({
      hasProject: true,
      hasItems: true,
      isLoading: false,
      selectedLabel: 'Saved Snapshot',
    }).mode).toBe('selected');
  });
});
