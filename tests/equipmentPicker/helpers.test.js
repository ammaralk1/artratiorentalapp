import { describe, expect, it } from 'vitest';

import {
  buildPickerEquipmentEntries,
  buildPickerPackagePayload,
  collectPickerBarcodes,
  filterPickerEquipmentEntries,
  normalizePickerQuantity,
} from '../../src/scripts/equipmentPicker/helpers.js';

describe('equipment picker helpers', () => {
  it('builds grouped picker entries from repeated equipment records', () => {
    const entries = buildPickerEquipmentEntries([
      { id: 1, barcode: ' EQ-1 ', desc: 'Camera', status: 'available', price: 100 },
      { id: 2, barcode: 'EQ-2', desc: 'Camera', status: 'available', price: 100 },
      { id: 3, barcode: 'LN-1', desc: 'Lens', status: 'maintenance', price: 50 },
    ]);

    expect(entries).toHaveLength(2);
    expect(entries[0]).toMatchObject({
      label: 'Camera',
      availableCount: 2,
      totalCount: 2,
    });
    expect(entries[0].barcodes).toEqual(['EQ-1', 'EQ-2']);
    expect(entries[1]).toMatchObject({
      label: 'Lens',
      availableCount: 0,
      totalCount: 1,
    });
  });

  it('filters picker entries by name, barcode, category, and status', () => {
    const entries = buildPickerEquipmentEntries([
      { id: 1, barcode: 'CAM-1', desc: 'Cinema Camera', category: 'Camera', status: 'available' },
      { id: 2, barcode: 'MIC-1', desc: 'Wireless Mic', category: 'Audio', status: 'reserved' },
    ]);

    expect(filterPickerEquipmentEntries(entries, { query: 'cinema' }).map((entry) => entry.label)).toEqual(['Cinema Camera']);
    expect(filterPickerEquipmentEntries(entries, { query: 'MIC-1' }).map((entry) => entry.label)).toEqual(['Wireless Mic']);
    expect(filterPickerEquipmentEntries(entries, { category: 'audio' }).map((entry) => entry.label)).toEqual(['Wireless Mic']);
    expect(filterPickerEquipmentEntries(entries, { status: 'available' }).map((entry) => entry.label)).toEqual(['Cinema Camera']);
  });

  it('normalizes requested quantity against the available count', () => {
    expect(normalizePickerQuantity('3', 5)).toBe(3);
    expect(normalizePickerQuantity('7', 5)).toBe(5);
    expect(normalizePickerQuantity('0', 5)).toBe(1);
    expect(normalizePickerQuantity('bad', 5)).toBe(1);
    expect(normalizePickerQuantity('2', 0)).toBe(0);
  });

  it('collects only requested barcodes from the entry', () => {
    expect(collectPickerBarcodes({ barcodes: ['A', 'B', 'C'] }, 2)).toEqual(['A', 'B']);
    expect(collectPickerBarcodes({ barcodes: ['A'] }, 4)).toEqual(['A']);
    expect(collectPickerBarcodes({ barcodes: [] }, 1)).toEqual([]);
  });

  it('builds valid package payloads for create and edit', () => {
    const payload = buildPickerPackagePayload({
      name: 'Camera Kit',
      code: 'KIT-CAM',
      description: 'Core camera package',
      price: '1200.50',
      cost: '800.25',
      items: [
        { equipment_id: '1', quantity: '2', unit_price: '100', unit_cost: '65.5' },
        { equipment_id: '2', quantity: 'bad', unit_price: '' },
      ],
    });

    expect(payload.ok).toBe(true);
    expect(payload.value).toEqual({
      package_code: 'KIT-CAM',
      name: 'Camera Kit',
      description: 'Core camera package',
      price: 1200.5,
      cost: 800.25,
      package_qty: 1,
      is_active: true,
      items: [
        { equipment_id: '1', quantity: 2, unit_price: 100, unit_cost: 65.5 },
        { equipment_id: '2', quantity: 1, unit_price: null, unit_cost: null },
      ],
    });
  });

  it('rejects package payloads without name, code, or items', () => {
    expect(buildPickerPackagePayload({ code: 'A', items: [{ equipment_id: 1 }] })).toMatchObject({ ok: false, reason: 'name' });
    expect(buildPickerPackagePayload({ name: 'A', items: [{ equipment_id: 1 }] })).toMatchObject({ ok: false, reason: 'code' });
    expect(buildPickerPackagePayload({ name: 'A', code: 'A', items: [] })).toMatchObject({ ok: false, reason: 'items' });
  });
});
