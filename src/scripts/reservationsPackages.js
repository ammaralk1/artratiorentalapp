import { loadData } from './storage.js';
import { normalizeNumbers } from './utils.js';

function normalizeBarcodeValueLocal(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

// Normalize per-package item quantity. Some data sources may mistakenly
// carry stock quantities (very large numbers) into package item qty.
// Clamp to a reasonable per-package range and default to 1 when invalid.
function normalizePerPackageQty(raw) {
  const parsed = Number.parseFloat(normalizeNumbers(String(raw ?? '1')));
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  // Treat abnormally large values as data noise (e.g. inventory stock)
  // Typical per-package counts are small; cap at 50 and default to 1 when exceeded.
  if (parsed > 50) return 1;
  // Round to nearest integer since per-package qty should be whole units
  return Math.max(1, Math.round(parsed));
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
    packages.find((entry) => {
      const idMatch = normalizePackageId(entry?.id ?? entry?.packageId ?? entry?.package_id) === normalizedId;
      const codeMatch = normalizePackageId(entry?.package_code ?? entry?.code) === normalizedId;
      return idMatch || codeMatch;
    })
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
        cost: 0,
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
    const costCandidate = [
      item.unit_cost,
      item.unitCost,
      item.cost,
      item.rental_cost,
      item.rentalCost,
      item.purchase_price,
      item.purchasePrice,
    ].find((value) => Number.isFinite(Number(value)));

    const quantityCandidate = [
      item.quantity,
      item.qty,
      item.count,
    ].find((value) => value != null && String(value).trim() !== '');

    collected.push({
      equipmentId: equipmentIdCandidate != null ? String(equipmentIdCandidate) : null,
      barcode: item.barcode ?? item.equipmentBarcode ?? item.code ?? item.serial ?? item.serialNumber ?? '',
      normalizedBarcode,
      qty: normalizePerPackageQty(quantityCandidate),
      price: priceCandidate != null ? Number(priceCandidate) : 0,
      cost: costCandidate != null ? Number(costCandidate) : 0,
      desc: item.description ?? item.desc ?? item.name ?? '',
      image: item.image ?? item.imageUrl ?? item.img ?? null,
    });
  });

  const seen = new Map();
  const { equipment = [] } = loadData() || {};
  const equipmentIndexById = new Map();
  const equipmentIndexByBarcode = new Map();

  (Array.isArray(equipment) ? equipment : []).forEach((record) => {
    if (!record || typeof record !== 'object') return;
    const idCandidates = [
      record.id,
      record.equipment_id,
      record.equipmentId,
      record.item_id,
      record.itemId,
    ];
    idCandidates
      .map((value) => (value != null ? String(value) : ''))
      .filter(Boolean)
      .forEach((key) => {
        if (!equipmentIndexById.has(key)) {
          equipmentIndexById.set(key, record);
        }
      });

    const barcode = normalizeBarcodeValueLocal(record.barcode);
    if (barcode && !equipmentIndexByBarcode.has(barcode)) {
      equipmentIndexByBarcode.set(barcode, record);
    }
  });

  collected.forEach((entry) => {
    if (entry.equipmentId && equipmentIndexById.has(entry.equipmentId)) {
      const record = equipmentIndexById.get(entry.equipmentId);
      if (record) {
        if (!entry.desc) {
          entry.desc = record.desc || record.description || record.name || '';
        }
        if (!entry.barcode) {
          entry.barcode = record.barcode || '';
        }
        if (entry.price == null || entry.price === 0) {
          const priceValue = record.price ?? record.unit_price;
          const parsedPrice = Number(priceValue);
          if (Number.isFinite(parsedPrice) && parsedPrice >= 0 && parsedPrice < 1_000_000) {
            entry.price = parsedPrice;
          }
        }
        if (entry.cost == null || entry.cost === 0) {
          const costValue = record.cost ?? record.unit_cost ?? record.unitCost ?? record.rental_cost ?? record.purchase_price;
          const parsedCost = Number(costValue);
          if (Number.isFinite(parsedCost) && parsedCost >= 0 && parsedCost < 1_000_000) {
            entry.cost = parsedCost;
          }
        }
        if (!entry.image) {
          entry.image = record.image || record.imageUrl || record.img || null;
        }
      }
    } else if (entry.normalizedBarcode && equipmentIndexByBarcode.has(entry.normalizedBarcode)) {
      const record = equipmentIndexByBarcode.get(entry.normalizedBarcode);
      if (record) {
        if (!entry.desc) {
          entry.desc = record.desc || record.description || record.name || '';
        }
        if (!entry.barcode) {
          entry.barcode = record.barcode || '';
        }
        if (entry.price == null || entry.price === 0) {
          const priceValue = record.price ?? record.unit_price;
          const parsedPrice = Number(priceValue);
          if (Number.isFinite(parsedPrice) && parsedPrice >= 0 && parsedPrice < 1_000_000) {
            entry.price = parsedPrice;
          }
        }
        if (entry.cost == null || entry.cost === 0) {
          const costValue = record.cost ?? record.unit_cost ?? record.unitCost ?? record.rental_cost ?? record.purchase_price;
          const parsedCost = Number(costValue);
          if (Number.isFinite(parsedCost) && parsedCost >= 0 && parsedCost < 1_000_000) {
            entry.cost = parsedCost;
          }
        }
        if (!entry.image) {
          entry.image = record.image || record.imageUrl || record.img || null;
        }
      }
    }
  });

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
    if (!existing.cost && entry.cost) {
      existing.cost = entry.cost;
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
  const candidates = [
    packageEntry.displayName,
    packageEntry.display_name,
    packageEntry.name,
    packageEntry.title,
    packageEntry.label,
    packageEntry.package_name,
    packageEntry.packageName,
    packageEntry.package_name_ar,
    packageEntry.packageNameAr,
    packageEntry.package_name_en,
    packageEntry.packageNameEn,
    packageEntry.name_ar,
    packageEntry.nameAr,
    packageEntry.name_en,
    packageEntry.nameEn,
    packageEntry.label_ar,
    packageEntry.labelAr,
    packageEntry.label_en,
    packageEntry.labelEn,
  ];

  const resolved = candidates.find((value) => value != null && String(value).trim() !== '');
  return resolved ? String(resolved) : '';
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
      code: entry?.package_code ?? entry?.code ?? id,
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
    cost: item.cost ?? 0,
    desc: item.desc,
    image: item.image ?? null,
  }));
}
