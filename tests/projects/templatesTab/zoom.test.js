import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  clampTemplatesZoom,
  computeTemplatesFitZoom,
  normalizeTemplatesZoomMode,
  readTplZoomModePref,
  readTplZoomPref,
  resolveTemplatesPreviewRenderZoom,
  writeTplZoomModePref,
  writeTplZoomPref,
} from '../../../src/scripts/projects/templatesTab/zoom.ts';

describe('templatesTab/zoom', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('clamps zoom values to supported bounds', () => {
    expect(clampTemplatesZoom(0.1)).toBe(0.25);
    expect(clampTemplatesZoom(1.2)).toBe(1.2);
    expect(clampTemplatesZoom(9)).toBe(2.5);
  });

  it('reads and writes zoom preferences', () => {
    expect(readTplZoomPref()).toBe(1);

    writeTplZoomPref(1.75);
    expect(readTplZoomPref()).toBe(1.75);
  });

  it('normalizes zoom mode and persists it', () => {
    expect(normalizeTemplatesZoomMode('fit')).toBe('fit');
    expect(normalizeTemplatesZoomMode('anything-else')).toBe('manual');

    writeTplZoomModePref('fit');
    expect(readTplZoomModePref()).toBe('fit');
  });

  it('computes fit zoom using clamped bounds', () => {
    expect(computeTemplatesFitZoom(0, 500)).toBe(1);
    expect(computeTemplatesFitZoom(800, 400)).toBe(0.5);
    expect(computeTemplatesFitZoom(200, 1000)).toBe(2.5);
  });

  it('calibrates desktop callsheet preview rendering so logical 100% renders at 90%', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1440, configurable: true });

    expect(resolveTemplatesPreviewRenderZoom(1, 'callsheet')).toBe(0.9);
    expect(resolveTemplatesPreviewRenderZoom(1, 'expenses')).toBe(1);
    expect(resolveTemplatesPreviewRenderZoom(1, 'callsheet')).not.toBe(1);
  });
});
