import { describe, it, expect, beforeEach, vi } from 'vitest';

const loadDataMock = vi.fn();
const normalizeBarcodeValueMock = vi.fn();

vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/reservations/state.js', () => ({
  normalizeBarcodeValue: normalizeBarcodeValueMock
}));

beforeEach(() => {
  vi.resetModules();
  loadDataMock.mockReset();
  normalizeBarcodeValueMock.mockReset().mockImplementation((value) => String(value || '').trim().toUpperCase());
});

describe('reservationsEquipment', () => {
  it('resolveItemImage prefers known fields', async () => {
    const { resolveItemImage } = await import('../../src/scripts/reservationsEquipment.js');
    expect(resolveItemImage({ image: 'primary.png' })).toBe('primary.png');
    expect(resolveItemImage({ imageUrl: 'url.png' })).toBe('url.png');
    expect(resolveItemImage({ img: 'legacy.png' })).toBe('legacy.png');
    expect(resolveItemImage({})).toBe('');
  });

  it('resolveEquipmentPrice finds first numeric candidate', async () => {
    const { resolveEquipmentPrice } = await import('../../src/scripts/reservationsEquipment.js');
    expect(resolveEquipmentPrice({ price: '50' })).toBe(50);
    expect(resolveEquipmentPrice({ daily_rate: '75' })).toBe(75);
    expect(resolveEquipmentPrice({ dailyRate: '100' })).toBe(100);
    expect(resolveEquipmentPrice({ rate: '200' })).toBe(200);
    expect(resolveEquipmentPrice({})).toBe(0);
  });

  it('getEquipmentRecordByBarcode returns matching item', async () => {
    const { getEquipmentRecordByBarcode } = await import('../../src/scripts/reservationsEquipment.js');
    loadDataMock.mockReturnValue({ equipment: [{ barcode: 'EQ1', status: 'جاهز' }, { barcode: 'EQ2', status: 'صيانة' }] });

    const result = getEquipmentRecordByBarcode(' eq1 ');
    expect(normalizeBarcodeValueMock).toHaveBeenCalled();
    expect(result).toEqual({ barcode: 'EQ1', status: 'جاهز' });
    expect(getEquipmentRecordByBarcode('missing')).toBeNull();
  });

  it('findEquipmentByBarcode normalizes value and searches data', async () => {
    const { findEquipmentByBarcode } = await import('../../src/scripts/reservationsEquipment.js');
    loadDataMock.mockReturnValue({ equipment: [{ barcode: 'ABCD' }, { barcode: 'XYZ' }] });

    expect(findEquipmentByBarcode(' abcd ')).toEqual({ barcode: 'ABCD' });
    expect(findEquipmentByBarcode(null)).toBeNull();
  });

  it('isEquipmentInMaintenance checks status via findEquipmentByBarcode', async () => {
    const module = await import('../../src/scripts/reservationsEquipment.js');
    loadDataMock.mockReturnValue({ equipment: [{ barcode: 'EQ1', status: 'جاهز' }, { barcode: 'EQ2', status: 'صيانة' }] });

    expect(module.isEquipmentInMaintenance('EQ2')).toBe(true);
    expect(module.isEquipmentInMaintenance('EQ1')).toBe(false);
  });

  it('getEquipmentAvailabilityStatus normalizes various labels', async () => {
    const module = await import('../../src/scripts/reservationsEquipment.js');
    loadDataMock.mockReturnValue({ equipment: [
      { barcode: 'EQ1', status: 'محجوز' },
      { barcode: 'EQ2', status: 'متاح' },
      { barcode: 'EQ3', status: 'maintenance' }
    ] });

    expect(module.getEquipmentAvailabilityStatus('EQ1')).toBe('reserved');
    expect(module.isEquipmentUnavailable('EQ1')).toBe(true);
    expect(module.isEquipmentAvailable('EQ1')).toBe(false);
    expect(module.getEquipmentAvailabilityStatus('EQ2')).toBe('available');
    expect(module.isEquipmentAvailable('EQ2')).toBe(true);
    expect(module.getEquipmentAvailabilityStatus('EQ3')).toBe('maintenance');
  });
});
