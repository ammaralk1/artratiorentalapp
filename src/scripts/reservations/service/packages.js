import { normalizeNumbers } from '../../utils.js';
import { DEFAULT_COMPANY_SHARE_PERCENT, calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from '../../reservationsSummary.js';
import { findPackageById, normalizePackageId, resolvePackageItems, getPackagesSnapshot, getPackageDisplayName, resolvePackagePrice } from '../../reservationsPackages.js';
import { parsePriceValue } from '../../reservationsShared.js';
import { sanitizePriceValue, toNumber, toPositiveInt, normalizePackageIdentifier, normalizeBarcodeValueLoose, normalizeReservationItemType, debugLogPackages } from './utils.js';
import { getCachedReservationPackages } from './cache.js';

export function resolvePackageMergeKey(entry, codeToIdMap = null) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const codeCandidates = [
    entry.package_code,
    entry.packageCode,
    entry.code,
    entry.barcode,
  ];
  for (const candidate of codeCandidates) {
    const normalized = normalizePackageIdentifier(candidate ?? '');
    if (normalized) {
      if (codeToIdMap && codeToIdMap.has(normalized)) {
        return codeToIdMap.get(normalized) || normalized;
      }
      return normalized;
    }
  }
  const idCandidates = [
    entry.packageId,
    entry.package_id,
    entry.id,
  ];
  for (const candidate of idCandidates) {
    const normalized = normalizePackageIdentifier(candidate ?? '');
    if (normalized) {
      return normalized;
    }
  }
  return null;
}

export function normalizePackageItemRecord(item = {}, packageQuantity = 1) {
  if (!item || typeof item !== 'object') {
    const barcode = normalizeNumbers(String(item ?? ''));
    return {
      equipmentId: null,
      equipment_id: null,
      qty: 1,
      quantity: 1,
      qtyPerPackage: 1,
      price: 0,
      unit_price: 0,
      cost: 0,
      unit_cost: 0,
      rental_cost: 0,
      purchase_price: 0,
      internal_cost: 0,
      equipment_cost: 0,
      item_cost: 0,
      barcode,
      normalizedBarcode: normalizeBarcodeValueLoose(barcode),
      desc: '',
      image: null,
    };
  }

  const equipmentId = item.equipmentId ?? item.equipment_id ?? item.id ?? item.item_id ?? item.itemId ?? null;
  const quantity = toPositiveInt(
    item.quantity
      ?? item.qty
      ?? item.count
      ?? item.units
      ?? item.unit_qty
      ?? item.unitQty
      ?? item.unit_count
      ?? item.unitCount
      ?? item.package_quantity
      ?? item.packageQty
      ?? 1
  );
  const unitPrice = toNumber(item.unit_price ?? item.unitPrice ?? item.price ?? 0);
  const unitCost = toNumber(
    item.cost
      ?? item.unit_cost
      ?? item.unitCost
      ?? item.rental_cost
      ?? item.internal_cost
      ?? item.purchase_price
      ?? item.equipment_cost
      ?? item.item_cost
      ?? 0
  );
  const barcode = normalizeNumbers(String(item.barcode ?? item.normalizedBarcode ?? item.code ?? item.serial ?? ''));
  const perPackageCandidate = item.qtyPerPackage
    ?? item.qty_per_package
    ?? item.perPackageQty
    ?? item.per_package_qty
    ?? null;
  let qtyPerPackage;
  if (perPackageCandidate != null) {
    qtyPerPackage = toPositiveInt(perPackageCandidate, { fallback: 1, max: 99 });
  } else if (packageQuantity > 0) {
    const divided = quantity / packageQuantity;
    if (Number.isFinite(divided) && divided > 0 && Number.isInteger(divided)) {
      qtyPerPackage = toPositiveInt(divided, { fallback: 1, max: 99 });
    } else {
      qtyPerPackage = Math.min(quantity, 99);
    }
  } else {
    qtyPerPackage = Math.min(quantity, 99);
  }

  return {
    equipmentId: equipmentId != null ? String(equipmentId) : null,
    equipment_id: equipmentId,
    qty: qtyPerPackage,
    quantity: qtyPerPackage,
    qtyPerPackage,
    totalQuantity: quantity,
    price: unitPrice,
    unit_price: unitPrice,
    cost: unitCost,
    unit_cost: unitCost,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
    barcode,
    normalizedBarcode: normalizeBarcodeValueLoose(item.normalizedBarcode ?? barcode),
    desc: item.desc ?? item.description ?? item.name ?? '',
    image: item.image ?? item.image_url ?? item.imageUrl ?? null,
  };
}

export function buildReservationPackageItem(pkg = {}, fallback = {}) {
  const normalizedId = normalizePackageIdentifier(
    pkg.packageId
      ?? pkg.package_id
      ?? pkg.id
      ?? fallback.packageId
      ?? fallback.package_id
      ?? fallback.id
      ?? ''
  );
  // كمية الحزمة يجب أن تعتمد على القيم الخاصة بالحزمة فقط
  const quantity = toPositiveInt(
    pkg.quantity
      ?? pkg.qty
      ?? pkg.package_quantity
      ?? pkg.packageQty
      ?? 1,
    { fallback: 1, max: 9_999 }
  );
  const unitPrice = toNumber(
    pkg.unit_price
      ?? pkg.unitPrice
      ?? pkg.price
      ?? fallback.price
      ?? fallback.unit_price
      ?? fallback.unitPrice
      ?? 0
  );
  const costCandidates = [
    pkg.package_cost,
    pkg.packageCost,
    pkg.unit_cost,
    pkg.unitCost,
    pkg.cost,
    pkg.rental_cost,
    pkg.internal_cost,
    pkg.purchase_price,
    pkg.equipment_cost,
    pkg.item_cost,
    fallback.package_cost,
    fallback.packageCost,
    fallback.unit_cost,
    fallback.unitCost,
    fallback.cost,
    fallback.rental_cost,
    fallback.internal_cost,
    fallback.purchase_price,
    fallback.equipment_cost,
    fallback.item_cost,
  ];
  let unitCost = 0;
  for (const candidate of costCandidates) {
    const numeric = toNumber(candidate);
    if (Number.isFinite(numeric) && numeric >= 0) {
      unitCost = numeric;
      break;
    }
  }
  const barcode = normalizeNumbers(String(
    pkg.package_code
      ?? pkg.packageCode
      ?? pkg.barcode
      ?? fallback.package_code
      ?? fallback.packageCode
      ?? fallback.barcode
      ?? ''
  ));

  return {
    id: fallback.id ?? (pkg.id != null ? String(pkg.id) : normalizedId ? `package::${normalizedId}` : ''),
    equipmentId: null,
    barcode,
    desc: fallback.desc ?? fallback.description ?? pkg.name ?? pkg.desc ?? pkg.title ?? barcode,
    qty: quantity,
    quantity,
    price: unitPrice,
    cost: unitCost,
    unit_cost: unitCost,
    package_cost: unitCost,
    packageCost: unitCost,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
    notes: fallback.notes ?? null,
    image: pkg.image ?? fallback.image ?? null,
    type: 'package',
    packageId: normalizedId,
    package_id: normalizedId,
    package_code: barcode,
    packageItems: Array.isArray(pkg.packageItems) ? pkg.packageItems : (Array.isArray(fallback.packageItems) ? fallback.packageItems : []),
  };
}

export function normalizeItemsWithPackages(items = [], packages = []) {
  const derived = derivePackagesFromItemsList(items);

  const workingPackages = Array.isArray(packages)
    ? mergePackageCollections(packages, derived.packages)
    : derived.packages;

  const packagesById = new Map();
  workingPackages.forEach((pkg) => {
    const key = resolvePackageMergeKey(pkg);
    if (!key) return;
    packagesById.set(key, pkg);
  });

  // Ensure each package has its packageItems populated from derived data when missing
  derived.packages.forEach((derivedPkg) => {
    const normalizedId = resolvePackageMergeKey(derivedPkg);
    if (!normalizedId) return;
    const target = packagesById.get(normalizedId);
    if (!target) return;
    if (!Array.isArray(target.packageItems) || target.packageItems.length === 0) {
      target.packageItems = derivedPkg.packageItems;
    }
    if (!target.name && derivedPkg.name) {
      target.name = derivedPkg.name;
    }
    if (!target.image && derivedPkg.image) {
      target.image = derivedPkg.image;
    }
  });

  return {
    items: derived.items,
    packages: Array.from(packagesById.values()),
  };
}

export function derivePackagesFromItemsList(items = []) {
  const groups = new Map();

  items.forEach((item) => {
    const normalizedId = normalizePackageIdentifier(
      item.packageId
        ?? item.package_id
        ?? item.packageCode
        ?? item.package_code
        ?? item.bundleId
        ?? item.bundle_id
        ?? null
    );
    if (!normalizedId) return;
    const key = normalizedId;
    if (!groups.has(key)) {
      groups.set(key, {
        base: item,
        items: [],
      });
    }
    const group = groups.get(key);
    // Prefer the package entry itself as the base; children stay in items list
    if (item.type === 'package') {
      group.base = item;
      return;
    }
    if (!group.base) {
      group.base = item;
    }
    group.items.push(item);
  });

  if (!groups.size) {
    return { items, packages: [] };
  }

  const filteredItems = [];
  const derivedPackages = [];
  const consumedPackageIds = new Set();

  items.forEach((item) => {
    const normalizedId = normalizePackageIdentifier(
      item.packageId
        ?? item.package_id
        ?? item.packageCode
        ?? item.package_code
        ?? item.bundleId
        ?? item.bundle_id
        ?? null
    );

    if (normalizedId && groups.has(normalizedId)) {
      if (consumedPackageIds.has(normalizedId)) {
        return;
      }
      const group = groups.get(normalizedId);
      const base = group.base || item;
      const packageItems = group.items.map((child) => normalizePackageItemRecord(child, 1));
      const costCandidates = [
        base.package_cost,
        base.packageCost,
        base.unit_cost,
        base.unitCost,
        base.cost,
        base.rental_cost,
        base.internal_cost,
        base.purchase_price,
        base.equipment_cost,
        base.item_cost,
      ];
      let unitCost = 0;
      for (const candidate of costCandidates) {
        const numeric = toNumber(candidate);
        if (Number.isFinite(numeric) && numeric >= 0) {
          unitCost = numeric;
          break;
        }
      }
      const derivedPackage = {
        packageId: normalizedId,
        package_id: normalizedId,
        package_code: base.package_code
          ?? base.packageCode
          ?? base.barcode
          ?? normalizeNumbers(String(normalizedId)),
        name: base.package_name ?? base.packageName ?? base.desc ?? base.name ?? `Package ${normalizedId}`,
        quantity: toPositiveInt(base.package_quantity ?? base.packageQty ?? 1, { fallback: 1, max: 9_999 }),
        unit_price: toNumber(base.package_price ?? base.packagePrice ?? base.unit_price ?? base.unitPrice ?? base.price ?? 0),
        unit_cost: unitCost,
        unitCost,
        cost: unitCost,
        rental_cost: unitCost,
        purchase_price: unitCost,
        internal_cost: unitCost,
        equipment_cost: unitCost,
        item_cost: unitCost,
        packageItems,
        image: base.image ?? null,
      };
      derivedPackages.push(derivedPackage);
      filteredItems.push(buildReservationPackageItem(derivedPackage, base));
      consumedPackageIds.add(normalizedId);
      return;
    }

    filteredItems.push(item);
  });

  return {
    items: filteredItems,
    packages: derivedPackages,
  };
}

export function normalizeReservationPackageItemsFromEntry(entry = {}, fallbackPackageId = '') {
  if (!entry || typeof entry !== 'object') {
    return [];
  }

  const packageId = normalizePackageIdentifier(fallbackPackageId
    || entry.packageId
    || entry.package_id
    || entry.package_code
    || entry.packageCode
    || entry.bundleId
    || entry.bundle_id
    || entry.id);

  const candidates = [];
  if (Array.isArray(entry.packageItems)) candidates.push(...entry.packageItems);
  if (Array.isArray(entry.package_items)) candidates.push(...entry.package_items);
  if (Array.isArray(entry.items)) candidates.push(...entry.items);
  if (Array.isArray(entry.equipment)) candidates.push(...entry.equipment);
  if (Array.isArray(entry.contents)) candidates.push(...entry.contents);

  let resolved = resolvePackageItems({
    ...entry,
    id: entry.id ?? packageId ?? entry.package_code ?? entry.packageCode ?? entry.code ?? null,
    packageId: packageId,
    package_id: packageId,
    package_code: entry.package_code ?? entry.packageCode ?? entry.code ?? entry.id ?? packageId,
    items: candidates,
    packageItems: candidates,
  });

  let definitionItems = [];
  if ((!Array.isArray(resolved) || resolved.length === 0) && packageId) {
    const definition = findPackageById(packageId);
    if (definition) {
      resolved = resolvePackageItems(definition);
      definitionItems = Array.isArray(resolved) ? resolved : [];
    }
  } else if (packageId) {
    const definition = findPackageById(packageId);
    if (definition) {
      definitionItems = resolvePackageItems(definition) || [];
    }
  }

  if (!Array.isArray(resolved) || resolved.length === 0) {
    return [];
  }

  const packageQuantity = toPositiveInt(
    entry.quantity
      ?? entry.qty
      ?? entry.count
      ?? entry.units
      ?? entry.unit_qty
      ?? entry.unitQty
      ?? entry.unit_count
      ?? entry.unitCount
      ?? entry.package_quantity
      ?? entry.packageQty
      ?? 1,
    { fallback: 1, max: 9_999 }
  );

  const normalized = resolved.map((item) => normalizePackageItemRecord(item, packageQuantity));

  if (definitionItems.length) {
    const definitionIndex = new Map();
    definitionItems.forEach((defItem) => {
      if (!defItem) return;
      const key = normalizeBarcodeValueLoose(defItem.barcode)
        || (defItem.equipmentId != null ? `id:${defItem.equipmentId}` : null)
        || (defItem.equipment_id != null ? `id:${defItem.equipment_id}` : null);
      if (!key) return;
      definitionIndex.set(key, defItem);
    });

    normalized.forEach((pkgItem) => {
      const key = pkgItem.normalizedBarcode || (pkgItem.equipmentId ? `id:${pkgItem.equipmentId}` : null);
      if (!key || !definitionIndex.has(key)) return;
      const defItem = definitionIndex.get(key);
      const defQty = toPositiveInt(defItem.quantity ?? defItem.qty ?? 1, { fallback: pkgItem.qtyPerPackage ?? 1, max: 99 });
      pkgItem.qtyPerPackage = defQty;
      pkgItem.qty = defQty;
      pkgItem.quantity = defQty;
      const defPrice = toNumber(defItem.unit_price ?? defItem.unitPrice ?? defItem.price ?? pkgItem.price);
      pkgItem.price = defPrice;
      pkgItem.unit_price = defPrice;
      if (!pkgItem.desc && defItem.desc) {
        pkgItem.desc = defItem.desc;
      }
      if (!pkgItem.image && defItem.image) {
        pkgItem.image = defItem.image;
      }
    });
  }

  const merged = new Map();
  normalized.forEach((pkgItem) => {
    const key = pkgItem.normalizedBarcode || (pkgItem.equipmentId ? `id:${pkgItem.equipmentId}` : null);
    if (!key) {
      return;
    }
    if (merged.has(key)) {
      const existing = merged.get(key);
      existing.qty += pkgItem.qty;
      existing.quantity += pkgItem.quantity;
      if (!Number.isFinite(existing.qtyPerPackage) || existing.qtyPerPackage <= 0) {
        existing.qtyPerPackage = pkgItem.qtyPerPackage;
      }
      if ((!existing.price || existing.price === 0) && pkgItem.price) {
        existing.price = pkgItem.price;
        existing.unit_price = pkgItem.unit_price;
      }
      if (!existing.desc && pkgItem.desc) {
        existing.desc = pkgItem.desc;
      }
      if (!existing.image && pkgItem.image) {
        existing.image = pkgItem.image;
      }
      return;
    }
    merged.set(key, { ...pkgItem });
  });

  return Array.from(merged.values());
}

export function derivePackageUnitPrice(entry = {}, packageItems = [], quantity = 1) {
  // Stored reservation/project package prices are user-editable and must win over catalog defaults.
  const explicitUnit = entry.package_price ?? entry.packagePrice ?? entry.unit_price ?? entry.unitPrice ?? entry.price;
  if (Number.isFinite(Number(explicitUnit)) && Number(explicitUnit) > 0) {
    return toNumber(explicitUnit);
  }

  // 2) Fall back to the canonical package price from Equipment > Packages
  try {
    const candidateId = normalizePackageIdentifier(
      entry.packageId ?? entry.package_id ?? entry.id ?? entry.package_code ?? entry.packageCode
    );
    if (candidateId) {
      const def = findPackageById(candidateId);
      if (def) {
        const realPrice = resolvePackagePrice(def);
        if (Number.isFinite(Number(realPrice)) && Number(realPrice) > 0) {
          return Number(realPrice);
        }
      }
    }
  } catch (_) { /* ignore lookup errors */ }

  // 3) Fallback to known total fields (convert to unit by quantity if sensible)
  const totalCandidate = entry.total_price ?? entry.totalPrice ?? entry.total ?? entry.amount ?? null;
  if (Number.isFinite(Number(totalCandidate))) {
    const numericTotal = toNumber(totalCandidate);
    return quantity > 0 ? Number((numericTotal / quantity).toFixed(2)) : numericTotal;
  }

  // Do NOT derive from child items sum — use only real stored package price
  return 0;
}

export function mergePackageRecords(base, incoming) {
  if (!base) return incoming;
  if (!incoming) return base;

  const merged = { ...base };

  const assignIfMissing = (key) => {
    if (merged[key] === undefined || merged[key] === null || merged[key] === '') {
      merged[key] = incoming[key];
    }
  };

  ['name', 'desc', 'barcode', 'image'].forEach(assignIfMissing);

  const incomingPrice = toNumber(incoming.unit_price ?? incoming.unitPrice ?? incoming.price);
  if (Number.isFinite(incomingPrice) && incomingPrice > 0) {
    merged.unit_price = incomingPrice;
    merged.unitPrice = incomingPrice;
    merged.price = incomingPrice;
  }

  const mergedCostCandidate = toNumber(
    merged.unit_cost
      ?? merged.unitCost
      ?? merged.cost
      ?? merged.package_cost
      ?? merged.rental_cost
      ?? merged.purchase_price
      ?? merged.internal_cost
      ?? merged.equipment_cost
      ?? merged.item_cost
  );
  const incomingCostCandidate = toNumber(
    incoming.unit_cost
      ?? incoming.unitCost
      ?? incoming.cost
      ?? incoming.package_cost
      ?? incoming.rental_cost
      ?? incoming.purchase_price
      ?? incoming.internal_cost
      ?? incoming.equipment_cost
      ?? incoming.item_cost
  );
  if ((!Number.isFinite(mergedCostCandidate) || mergedCostCandidate === 0) && Number.isFinite(incomingCostCandidate)) {
    const safeCost = incomingCostCandidate;
    merged.unit_cost = safeCost;
    merged.unitCost = safeCost;
    merged.cost = safeCost;
    merged.total_cost = Number.isFinite(incoming.total_cost) ? incoming.total_cost : merged.total_cost;
    if (!Number.isFinite(merged.rental_cost)) merged.rental_cost = safeCost;
    if (!Number.isFinite(merged.purchase_price)) merged.purchase_price = safeCost;
    if (!Number.isFinite(merged.internal_cost)) merged.internal_cost = safeCost;
    if (!Number.isFinite(merged.equipment_cost)) merged.equipment_cost = safeCost;
    if (!Number.isFinite(merged.item_cost)) merged.item_cost = safeCost;
  }

  if ((!Number.isFinite(Number(merged.total_price)) || merged.total_price === 0) && Number.isFinite(Number(incoming.total_price))) {
    merged.total_price = incoming.total_price;
    merged.total = incoming.total;
  }

  if (!Array.isArray(merged.packageItems) || merged.packageItems.length === 0) {
    merged.packageItems = Array.isArray(incoming.packageItems) ? incoming.packageItems : [];
    merged.items = merged.packageItems;
  } else if (Array.isArray(incoming.packageItems) && incoming.packageItems.length) {
    merged.packageItems = mergePackageItemCollections(merged.packageItems, incoming.packageItems);
    merged.items = merged.packageItems;
  }

  return merged;
}

export function mergePackageItemCollections(primary = [], secondary = []) {
  const merged = new Map();

  const append = (source) => {
    source.forEach((item) => {
      if (!item) return;
      const key = item.normalizedBarcode || (item.equipmentId ? `id:${item.equipmentId}` : null);
      if (!key) return;
      if (merged.has(key)) {
        const existing = merged.get(key);
        existing.qty += item.qty ?? 0;
        existing.quantity += item.quantity ?? 0;
        if ((!Number.isFinite(existing.qtyPerPackage) || existing.qtyPerPackage <= 0) && Number.isFinite(item.qtyPerPackage)) {
          existing.qtyPerPackage = item.qtyPerPackage;
        }
        if ((!existing.price || existing.price === 0) && item.price) {
          existing.price = item.price;
          existing.unit_price = item.unit_price;
        }
        const currentCost = toNumber(
          existing.cost
            ?? existing.unit_cost
            ?? existing.unitCost
            ?? existing.rental_cost
            ?? existing.purchase_price
            ?? existing.internal_cost
            ?? existing.equipment_cost
            ?? existing.item_cost
        );
        const incomingCost = toNumber(
          item.cost
            ?? item.unit_cost
            ?? item.unitCost
            ?? item.rental_cost
            ?? item.purchase_price
            ?? item.internal_cost
            ?? item.equipment_cost
            ?? item.item_cost
        );
        if ((!Number.isFinite(currentCost) || currentCost === 0) && Number.isFinite(incomingCost)) {
          const safeCost = incomingCost;
          existing.cost = safeCost;
          existing.unit_cost = safeCost;
          existing.unitCost = safeCost;
          if (!Number.isFinite(existing.rental_cost)) existing.rental_cost = safeCost;
          if (!Number.isFinite(existing.purchase_price)) existing.purchase_price = safeCost;
          if (!Number.isFinite(existing.internal_cost)) existing.internal_cost = safeCost;
          if (!Number.isFinite(existing.equipment_cost)) existing.equipment_cost = safeCost;
          if (!Number.isFinite(existing.item_cost)) existing.item_cost = safeCost;
        }
        if (!existing.desc && item.desc) {
          existing.desc = item.desc;
        }
        if (!existing.image && item.image) {
          existing.image = item.image;
        }
        return;
      }
      merged.set(key, { ...item });
    });
  };

  append(primary);
  append(secondary);

  return Array.from(merged.values());
}

export function mergePackageCollections(primary = [], secondary = []) {
  const result = [];
  const indexByKey = new Map();

  // Build a lookup from code -> normalized id using snapshot, to unify keys
  const snapshot = getPackagesSnapshot();
  const codeToId = new Map();
  snapshot.forEach((def) => {
    const idNorm = normalizePackageIdentifier(def?.id ?? def?.packageId ?? def?.package_id ?? def?.code ?? '');
    const code = String(def?.package_code ?? def?.code ?? '').trim().toLowerCase();
    if (code) codeToId.set(code, idNorm || code);
  });

  const deriveKey = (entry) => resolvePackageMergeKey(entry, codeToId);

  const append = (collection) => {
    if (!Array.isArray(collection)) return;
    collection.forEach((entry) => {
      if (!entry || typeof entry !== 'object') return;
      const key = deriveKey(entry);
      if (!key) return;
      if (indexByKey.has(key)) {
        const existingIndex = indexByKey.get(key);
        result[existingIndex] = mergePackageRecords(result[existingIndex], entry);
      } else {
        indexByKey.set(key, result.length);
        result.push({ ...entry });
      }
    });
  };

  append(primary);
  append(secondary);

  return result;
}

export function convertReservationPackageEntry(entry, index = 0) {
  if (!entry && entry !== 0) {
    return null;
  }

  if (typeof entry === 'string' || typeof entry === 'number') {
    const normalizedId = normalizePackageIdentifier(entry);
    const definition = normalizedId ? findPackageById(normalizedId) : null;
    const packageItems = definition ? normalizeReservationPackageItemsFromEntry(definition, normalizedId) : [];
    const unitPrice = definition
      ? toNumber(definition.price ?? definition.unit_price ?? definition.unitPrice ?? 0)
      : 0;
    const resolveDefinitionCost = () => {
      const candidates = [
        definition?.package_cost,
        definition?.packageCost,
        definition?.unit_cost,
        definition?.unitCost,
        definition?.cost,
        definition?.rental_cost,
        definition?.internal_cost,
        definition?.purchase_price,
        definition?.equipment_cost,
        definition?.item_cost,
      ];
      for (const candidate of candidates) {
        const numeric = toNumber(candidate);
        if (Number.isFinite(numeric) && numeric >= 0) {
          return numeric;
        }
      }
      return 0;
    };
    const unitCost = resolveDefinitionCost();

    const quantity = 1;
    const total = Number((unitPrice * quantity).toFixed(2));
    const totalCost = Number((unitCost * quantity).toFixed(2));

    return {
      id: `package::${normalizedId || index}`,
      packageId: normalizedId || `pkg-${index}`,
      package_id: normalizedId || `pkg-${index}`,
      package_code: normalizeNumbers(String(entry)) || (normalizedId || `pkg-${index}`),
      name: definition?.name ?? definition?.package_name ?? definition?.packageName ?? normalizeNumbers(String(entry)) ?? '',
      desc: definition?.name ?? normalizeNumbers(String(entry)) ?? '',
      quantity,
      qty: quantity,
      unit_price: unitPrice,
      unitPrice: unitPrice,
      price: unitPrice,
      unit_cost: unitCost,
      unitCost,
      cost: unitCost,
      total_cost: totalCost,
      rental_cost: unitCost,
      purchase_price: unitCost,
      internal_cost: unitCost,
      equipment_cost: unitCost,
      item_cost: unitCost,
      total,
      total_price: total,
      barcode: normalizeNumbers(String(entry)),
      packageItems,
      items: packageItems,
      type: 'package',
      image: definition?.image ?? null,
    };
  }

  if (typeof entry !== 'object') {
    return null;
  }

  const normalizedId = normalizePackageIdentifier(
    entry.packageId
      ?? entry.package_id
      ?? entry.package_code
      ?? entry.packageCode
      ?? entry.code
      ?? entry.slug
      ?? entry.id
  ) || `pkg-${index}`;

  const quantity = toPositiveInt(
    entry.quantity
      ?? entry.qty
      ?? entry.count
      ?? entry.units
      ?? entry.unit_qty
      ?? entry.unitQty
      ?? entry.unit_count
      ?? entry.unitCount
      ?? entry.package_quantity
      ?? entry.packageQty
      ?? 1
  );
  const packageItems = normalizeReservationPackageItemsFromEntry(entry, normalizedId);
  const unitPrice = derivePackageUnitPrice(entry, packageItems, quantity);
  const resolveUnitCost = () => {
    const candidates = [
      entry.package_cost,
      entry.packageCost,
      entry.unit_cost,
      entry.unitCost,
      entry.cost,
      entry.rental_cost,
      entry.internal_cost,
      entry.purchase_price,
      entry.equipment_cost,
      entry.item_cost,
    ];
    for (const candidate of candidates) {
      const numeric = toNumber(candidate);
      if (Number.isFinite(numeric) && numeric >= 0) {
        return numeric;
      }
    }
    return 0;
  };
  const unitCost = resolveUnitCost();
  const totalRaw = entry.total_price ?? entry.totalPrice ?? entry.total ?? (unitPrice * quantity);
  const total = Number.isFinite(Number(totalRaw)) ? toNumber(totalRaw) : Number((unitPrice * quantity).toFixed(2));
  const totalCost = Number.isFinite(unitCost) ? Number((unitCost * quantity).toFixed(2)) : 0;
  const packageCode = entry.package_code ?? entry.packageCode ?? entry.code ?? normalizedId;
  const barcode = normalizeNumbers(String(entry.barcode ?? packageCode ?? ''));

  const image = entry.image
    ?? entry.cover
    ?? entry.thumbnail
    ?? (packageItems.find((item) => item.image)?.image ?? null);

  return {
    id: entry.id != null ? String(entry.id) : `package::${normalizedId}`,
    packageId: normalizedId,
    package_id: normalizedId,
    package_code: packageCode,
    name: entry.name ?? entry.package_name ?? entry.packageName ?? entry.title ?? entry.description ?? packageCode ?? normalizedId,
    desc: entry.name ?? entry.package_name ?? entry.packageName ?? entry.title ?? entry.description ?? packageCode ?? normalizedId,
    quantity,
    qty: quantity,
    unit_price: unitPrice,
    unitPrice,
    price: unitPrice,
    unit_cost: unitCost,
    unitCost,
    package_cost: unitCost,
    packageCost: unitCost,
    cost: unitCost,
    total_cost: totalCost,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
    total,
    total_price: total,
    barcode,
    packageItems,
    items: packageItems,
    type: 'package',
    image,
  };
}

export function mapReservationPackagesFromSource(raw = {}) {
  const collections = [];

  if (Array.isArray(raw.packages)) collections.push(raw.packages);
  if (Array.isArray(raw.reservation_packages)) collections.push(raw.reservation_packages);
  if (Array.isArray(raw.reservationPackages)) collections.push(raw.reservationPackages);
  if (Array.isArray(raw.package_details)) collections.push(raw.package_details);
  if (Array.isArray(raw.packageDetails)) collections.push(raw.packageDetails);
  if (Array.isArray(raw.package_list)) collections.push(raw.package_list);
  if (Array.isArray(raw.packageList)) collections.push(raw.packageList);

  const aggregated = [];
  const seen = new Map();

  const addPackageEntry = (entry, indexHint = aggregated.length) => {
    const mapped = convertReservationPackageEntry(entry, indexHint);
    if (!mapped) return;
    const key = mapped.packageId || mapped.package_code || mapped.id || `pkg-${indexHint}`;
    if (seen.has(key)) {
      const existingIndex = seen.get(key);
      aggregated[existingIndex] = mergePackageRecords(aggregated[existingIndex], mapped);
    } else {
      seen.set(key, aggregated.length);
      aggregated.push(mapped);
    }
  };

  collections.forEach((collection) => {
    collection.forEach((entry, index) => {
      addPackageEntry(entry, index + aggregated.length);
    });
  });

  if (aggregated.length === 0 && raw.package) {
    addPackageEntry(raw.package, 0);
  }

  const itemsCollection = Array.isArray(raw.items) ? raw.items : [];
  const looksLikePackage = (item = {}) => {
    if (!item || typeof item !== 'object') {
      return false;
    }
    const normalizedType = normalizeReservationItemType(item.type ?? item.item_type ?? item.kind ?? null);
    if (normalizedType === 'package') {
      return true;
    }
    if (item.packageItems && Array.isArray(item.packageItems) && item.packageItems.length) {
      return true;
    }
    if (item.items && Array.isArray(item.items) && item.items.length && item.items.every((child) => typeof child === 'object')) {
      return true;
    }
    if (item.packageId || item.package_id || item.package_code || item.packageCode || item.bundleId || item.bundle_id) {
      return true;
    }
    return false;
  };

  itemsCollection.forEach((item, index) => {
    if (!looksLikePackage(item)) {
      return;
    }
    addPackageEntry(item, aggregated.length + index);
  });

  return aggregated;
}

export function derivePackageMergeKey(entry = {}) {
  const normalizedId = normalizePackageIdentifier(
    entry?.packageId
      ?? entry?.package_id
      ?? entry?.id
      ?? entry?.code
      ?? null
  );
  if (normalizedId) return normalizedId;
  const code = normalizeNumbers(String(entry?.package_code ?? entry?.code ?? entry?.barcode ?? '')).trim().toLowerCase();
  if (code) return code;
  return null;
}

export function dedupePackages(packages = []) {
  if (!Array.isArray(packages) || packages.length === 0) return [];
  const map = new Map();
  packages.forEach((pkg, index) => {
    if (!pkg || typeof pkg !== 'object') return;
    const key = derivePackageMergeKey(pkg) ?? `pkg-${index}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, pkg);
      return;
    }
    const existingCost = parsePriceValue(
      existing.unit_cost
        ?? existing.unitCost
        ?? existing.cost
        ?? existing.package_cost
        ?? existing.rental_cost
        ?? existing.purchase_price
        ?? existing.internal_cost
        ?? existing.equipment_cost
        ?? existing.item_cost
    );
    const incomingCost = parsePriceValue(
      pkg.unit_cost
        ?? pkg.unitCost
        ?? pkg.cost
        ?? pkg.package_cost
        ?? pkg.rental_cost
        ?? pkg.purchase_price
        ?? pkg.internal_cost
        ?? pkg.equipment_cost
        ?? pkg.item_cost
    );
    if (Number.isFinite(incomingCost) && (!Number.isFinite(existingCost) || incomingCost >= existingCost)) {
      map.set(key, { ...existing, ...pkg, unit_cost: incomingCost });
    } else {
      map.set(key, { ...pkg, ...existing });
    }
  });
  return Array.from(map.values());
}
