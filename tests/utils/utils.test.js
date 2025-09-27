import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import {
  showToast,
  generateReservationId,
  generateProjectCode,
  formatDateTime,
  normalizeNumbers
} from '../../src/scripts/utils.js';

describe('utils module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('lang');
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('lang');
  });

  describe('showToast', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it('creates a toast container when missing and removes toast after duration', () => {
      showToast('Hello', 500);

      const container = document.getElementById('toast-container');
      expect(container).toBeTruthy();
      expect(container?.children.length).toBe(1);

      vi.advanceTimersByTime(500);
      expect(container?.children.length).toBe(1);

      vi.advanceTimersByTime(300);
      expect(container?.children.length).toBe(0);
    });

    it('reuses the existing toast container for multiple calls', () => {
      showToast('First', 1000);
      const container = document.getElementById('toast-container');

      showToast('Second', 1000);
      const containerAfterSecondCall = document.getElementById('toast-container');

      expect(containerAfterSecondCall).toBe(container);
      expect(containerAfterSecondCall?.children.length).toBe(2);
    });
  });

  describe('generateReservationId', () => {
    it('increments the stored counter and pads the number', () => {
      localStorage.setItem('reservationCounter', '9');

      const id = generateReservationId();
      expect(id).toBe('RSV-0010');
      expect(localStorage.getItem('reservationCounter')).toBe('10');
    });

    it('starts from 1 when no counter is stored', () => {
      const id = generateReservationId();
      expect(id).toBe('RSV-0001');
    });
  });

  describe('generateProjectCode', () => {
    it('increments the stored project counter', () => {
      localStorage.setItem('projectCounter', '2');

      const code = generateProjectCode();
      expect(code).toBe('PRJ-0003');
      expect(localStorage.getItem('projectCounter')).toBe('3');
    });

    it('starts from 1 when counter is missing', () => {
      const code = generateProjectCode();
      expect(code).toBe('PRJ-0001');
    });
  });

  describe('formatDateTime', () => {
    it('returns dash for falsy or invalid input', () => {
      expect(formatDateTime('')).toBe('-');
      expect(formatDateTime(undefined)).toBe('-');
      expect(formatDateTime('not-a-date')).toBe('-');
    });

    it('honors document language when building locale and normalizes digits', () => {
      document.documentElement.setAttribute('lang', 'ar');
      const mockFormatter = {
        formatToParts: vi.fn(() => ([
          { type: 'day', value: '٠١' },
          { type: 'literal', value: '/' },
          { type: 'month', value: '٠٢' },
          { type: 'literal', value: '/' },
          { type: 'year', value: '٢٠٢٤' },
          { type: 'literal', value: ' ' },
          { type: 'hour', value: '٠١' },
          { type: 'literal', value: ':' },
          { type: 'minute', value: '٣٠' },
          { type: 'dayPeriod', value: 'ص' }
        ]))
      };
      const formatSpy = vi.spyOn(Intl, 'DateTimeFormat').mockReturnValue(mockFormatter);

      const result = formatDateTime('2024-02-01T01:30:00Z');

      expect(formatSpy).toHaveBeenCalledWith('ar-SA-u-ca-gregory', expect.objectContaining({ calendar: 'gregory' }));
      expect(result).toContain('AM');
      expect(result).toContain('01/02/2024');
      expect(result).not.toMatch(/[٠-٩]/);
    });

    it('falls back to storage language and allows overrides', () => {
      localStorage.setItem('app-language', 'en');
      const mockFormatter = {
        formatToParts: vi.fn(() => ([
          { type: 'year', value: '2024' },
          { type: 'literal', value: '-' },
          { type: 'month', value: '03' },
          { type: 'literal', value: '-' },
          { type: 'day', value: '05' },
          { type: 'literal', value: ' ' },
          { type: 'hour', value: '23' },
          { type: 'literal', value: ':' },
          { type: 'minute', value: '45' },
          { type: 'dayPeriod', value: '' }
        ]))
      };
      const formatSpy = vi.spyOn(Intl, 'DateTimeFormat').mockReturnValue(mockFormatter);

      const result = formatDateTime('2024-03-05T23:45:00Z', { hour12: false });

      expect(formatSpy).toHaveBeenCalledWith('en-US', expect.objectContaining({ hour12: false }));
      expect(result).toContain('2024-03-05');
      expect(result).toContain('23:45');
    });
  });

  describe('normalizeNumbers', () => {
    it('converts Arabic-Indic digits to ASCII digits', () => {
      expect(normalizeNumbers('١٢٣٤٥٦٧٨٩٠')).toBe('1234567890');
    });

    it('returns empty string for nullish values', () => {
      expect(normalizeNumbers(null)).toBe('');
      expect(normalizeNumbers(undefined)).toBe('');
    });

    it('leaves non-digit characters untouched', () => {
      expect(normalizeNumbers('رقم ١٢٣')).toBe('رقم 123');
    });
  });
});
