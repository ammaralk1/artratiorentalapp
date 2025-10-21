import { loadData } from './storage.js';
import { normalizeNumbers } from './utils.js';

function normalizeBarcodeValueLocal(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function normalizePackageId(value) {
  const raw = String(value ?? '').trim().toLowerCase();
  return raw ? raw : '';
}

export function getPackagesSnapshot() {
  const { packages = [] } = loadData();
  if (!Array.isArray(packages)) return [];
  return packages.filter((entry) => entry && typeof entry === 'object');
}

export function findPackageById(packageId) {
  const normalizedId = normalizePackageId(packageId);
  if (!normalizedId) return null;
  const packages = getPackagesSnapshot();
  return (
    packages.find((entry) => normalizePackageId(entry?.id ?? entry?.packageId ?? entry?.package_id) === normalizedId)
    || null
  );
}

export function resolvePackageItems(packageEntry) {
  if (!packageEntry || typeof packageEntry !== 'object') return [];

  const collected = [];
  const candidates = [];

  if (Array.isArray(packageEntry.items)) {
    candidates.push(...packageEntry.items);
  }
  if (Array.isArray(packageEntry.equipment)) {
    candidates.push(...packageEntry.equipment);
  }
  if (Array.isArray(packageEntry.packageItems)) {
    candidates.push(...packageEntry.packageItems);
  }
  if (Array.isArray(packageEntry.bundleItems)) {
    candidates.push(...packageEntry.bundleItems);
  }
  if (Array.isArray(packageEntry.barcodes)) {
    candidates.push(...packageEntry.barcodes.map((barcode) => ({ barcode })));
  }

  candidates.forEach((item) => {
    if (!item) return;

    if (typeof item === 'string' || typeof item === 'number') {
      const normalizedBarcode = normalizeBarcodeValueLocal(item);
      if (!normalizedBarcode) return;
      collected.push({
        equipmentId: null,
        barcode: normalizedBarcode,
        normalizedBarcode,
        qty: 1,
        price: 0,
        desc: '',
      });
      return;
    }

    if (typeof item !== 'object') {
      return;
    }

    const normalizedBarcode = normalizeBarcodeValueLocal(
      item.barcode
        ?? item.equipmentBarcode
        ?? item.code
        ?? item.serial
        ?? item.serialNumber
        ?? item.serial_number
    );

    const equipmentIdCandidate = [
      item.equipmentId,
      item.equipment_id,
      item.itemId,
      item.item_id,
      item.id,
    ].find((value) => value !== null && value !== undefined && value !== '');

    const priceCandidate = [
      item.unit_price,
      item.unitPrice,
      item.price,
      item.daily_rate,
    ].find((value) => Number.isFinite(Number(value)));

    const quantityCandidate = [
      item.quantity,
      item.qty,
      item.count,
    ].find((value) => Number.isFinite(Number(value)) && Number(value) > 0);

    collected.push({
      equipmentId: equipmentIdCandidate != null ? String(equipmentIdCandidate) : null,
      barcode: item.barcode ?? item.equipmentBarcode ?? item.code ?? item.serial ?? item.serialNumber ?? '',
      normalizedBarcode,
      qty: quantityCandidate != null ? Number(quantityCandidate) : 1,
      price: priceCandidate != null ? Number(priceCandidate) : 0,
      desc: item.description ?? item.desc ?? item.name ?? '',
      image: item.image ?? item.imageUrl ?? item.img ?? null,
    });
  });

  const seen = new Map();
  collected.forEach((entry) => {
    const normalized = entry.normalizedBarcode || (entry.barcode ? normalizeBarcodeValueLocal(entry.barcode) : '');
    const key = normalized || (entry.equipmentId ? `id:${entry.equipmentId}` : null);
    if (!key) return;
    if (!seen.has(key)) {
      seen.set(key, { ...entry, normalizedBarcode: normalized });
      return;
    }
    const existing = seen.get(key);
    existing.qty += entry.qty;
    if (!existing.price && entry.price) {
      existing.price = entry.price;
    }
    if (!existing.desc && entry.desc) {
      existing.desc = entry.desc;
    }
    if (!existing.image && entry.image) {
      existing.image = entry.image;
    }
  });

  return Array.from(seen.values());
}

export function resolvePackagePrice(packageEntry) {
  if (!packageEntry || typeof packageEntry !== 'object') return 0;
  const priceCandidates = [
    packageEntry.price,
    packageEntry.totalPrice,
    packageEntry.total_price,
    packageEntry.packagePrice,
    packageEntry.package_price,
  ];

  for (const candidate of priceCandidates) {
    const number = Number(candidate);
    if (Number.isFinite(number)) {
      return number;
    }
  }

  const items = resolvePackageItems(packageEntry);
  return items.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
}

export function getPackageDisplayName(packageEntry) {
  if (!packageEntry || typeof packageEntry !== 'object') return '';
  return (
    packageEntry.name
    ?? packageEntry.title
    ?? packageEntry.label
    ?? packageEntry.package_name
    ?? packageEntry.packageName
    ?? ''
  );
}

export function buildPackageOptionsSnapshot() {
  const packages = getPackagesSnapshot();
  return packages.map((entry) => {
    const id = normalizePackageId(entry?.id ?? entry?.packageId ?? entry?.package_id ?? entry?.code);
    const name = getPackageDisplayName(entry) || id || 'package';
    const price = resolvePackagePrice(entry);
    return {
      id,
      name,
      price,
      items: resolvePackageItems(entry),
      raw: entry,
    };
  }).filter((entry) => entry.id);
}

export function findPackagesContainingBarcode(barcode) {
  const normalizedCode = normalizeBarcodeValueLocal(barcode);
  if (!normalizedCode) return [];

  return buildPackageOptionsSnapshot().filter((pkg) =>
    pkg.items.some((item) => item.normalizedBarcode === normalizedCode)
  );
}

export function summarizePackageItems(packageEntry) {
  const items = resolvePackageItems(packageEntry);
  return items.map((item) => ({
    equipmentId: item.equipmentId,
    barcode: item.barcode,
    normalizedBarcode: item.normalizedBarcode,
    qty: item.qty,
    price: item.price,
    desc: item.desc,
    image: item.image ?? null,
  }));
}
