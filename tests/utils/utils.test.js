import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('../../src/scripts/storage.js', () => ({
  loadData: vi.fn(() => ({ reservations: [], projects: [] })),
  saveData: vi.fn(),
}));

vi.mock('../../src/scripts/language.js', () => ({
  getCurrentLanguage: vi.fn(() => 'ar'),
}));

import {
  showToast,
  generateReservationId,
  generateProjectCode,
  formatDateTime,
  normalizeNumbers
} from '../../src/scripts/utils.js';
import { loadData } from '../../src/scripts/storage.js';
import { getCurrentLanguage } from '../../src/scripts/language.js';

const storageMock = vi.mocked(loadData);
const languageMock = vi.mocked(getCurrentLanguage);

describe('utils module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('lang');
    if (globalThis.__APP_SEQUENCE_STATE__) {
      globalThis.__APP_SEQUENCE_STATE__.reservation = 0;
      globalThis.__APP_SEQUENCE_STATE__.project = 0;
    } else {
      globalThis.__APP_SEQUENCE_STATE__ = { reservation: 0, project: 0 };
    }
    storageMock.mockReturnValue({ reservations: [], projects: [] });
    languageMock.mockReturnValue('ar');
  });

  afterEach(() => {
    vi.clearAllMocks();
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

      vi.advanceTimersByTime(350);
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
    it('derives the next sequence from stored reservations', () => {
      storageMock.mockReturnValue({
        reservations: [
          { reservationCode: 'RSV-0004' },
          { reservation_code: 'RSV-0009' },
          { reservationId: 'RSV-0007' }
        ],
        projects: [],
      });

      const id = generateReservationId();
      expect(id).toBe('RSV-0010');

      storageMock.mockReturnValue({
        reservations: [{ reservationCode: 'RSV-0010' }],
        projects: [],
      });

      const nextId = generateReservationId();
      expect(nextId).toBe('RSV-0011');
    });

    it('starts from 1 when no counter is stored', () => {
      const id = generateReservationId();
      expect(id).toBe('RSV-0001');
    });
  });

  describe('generateProjectCode', () => {
    it('derives the next project code from existing projects and cached state', () => {
      storageMock.mockReturnValue({
        reservations: [],
        projects: [
          { projectCode: 'PRJ-0002' },
          { code: 'PRJ-0005' },
          { id: 12 }
        ],
      });

      const code = generateProjectCode();
      expect(code).toBe('PRJ-0013');

      storageMock.mockReturnValue({ reservations: [], projects: [] });
      const nextCode = generateProjectCode();
      expect(nextCode).toBe('PRJ-0014');
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

      expect(formatSpy).toHaveBeenCalledWith(expect.stringContaining('ar-SA-u-ca-gregory'), expect.objectContaining({ calendar: 'gregory' }));
      expect(result).toContain('AM');
      expect(result).toContain('01/02/2024');
      expect(result).not.toMatch(/[٠-٩]/);
    });

    it('falls back to cached language and allows overrides', () => {
      languageMock.mockReturnValue('en');
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
