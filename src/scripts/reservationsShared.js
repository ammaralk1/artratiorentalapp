import { normalizeNumbers } from './utils.js';
import { resolvePackageItems, normalizePackageId, getPackagesSnapshot, findPackageById } from './reservationsPackages.js';

function stripExtraDots(candidate) {
  const parts = candidate.split('.');
  if (parts.length <= 2) {
    return candidate;
  }

  const decimalPart = parts.pop();
  const integerPart = parts.join('');
  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

function parsePriceValueInternal(value) {
  if (value == null || value === '') return Number.NaN;

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : Number.NaN;
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }

  let normalized = normalizeNumbers(String(value)).trim();
  if (!normalized) return Number.NaN;

  const firstDigitIndex = normalized.search(/[0-9]/);
  const firstMinusIndex = normalized.indexOf('-');
  const negative = firstMinusIndex !== -1 && (firstDigitIndex === -1 || firstMinusIndex < firstDigitIndex);

  normalized = normalized.replace(/[-+]/g, '');

  normalized = normalized
    .replace(/\s+/g, '')
    .replace(/\u066B/g, '.') // Arabic decimal separator
    .replace(/[\u066C\u060C\u061B]/g, ','); // Arabic thousands/comma/semicolon

  // Remove any currency/unit labels while keeping digits and separators.
  normalized = normalized.replace(/[^0-9.,]/g, '');
  if (!normalized) return Number.NaN;

  const hasComma = normalized.includes(',');
  const hasDot = normalized.includes('.');
  if (hasComma && hasDot) {
    const lastComma = normalized.lastIndexOf(',');
    const lastDot = normalized.lastIndexOf('.');
    if (lastComma > lastDot) {
      normalized = normalized.replace(/\./g, '');
      normalized = normalized.replace(/,/g, '.');
    } else {
      normalized = normalized.replace(/,/g, '');
    }
  } else if (hasComma) {
    const commaParts = normalized.split(',');
    if (commaParts.length === 2 && commaParts[1].length === 3) {
      normalized = commaParts.join('');
    } else {
      normalized = normalized.replace(/,/g, '.');
    }
  } else if (hasDot) {
    const dotParts = normalized.split('.');
    if (dotParts.length === 2) {
      const [, fraction] = dotParts;
      if (fraction.length === 3) {
        const allDigits = dotParts.join('');
        if (/^[0-9]+$/.test(allDigits)) {
          normalized = allDigits;
        }
      }
    } else if (dotParts.length > 2) {
      normalized = stripExtraDots(normalized);
    }
  }

  // Any remaining commas should be removed as thousand separators.
  normalized = normalized.replace(/,/g, '');
  normalized = stripExtraDots(normalized);

  if (!/^[0-9]*\.?[0-9]*$/.test(normalized)) {
    return Number.NaN;
  }

  if (!normalized || normalized === '.') {
    return Number.NaN;
  }

  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed)) {
    return Number.NaN;
  }

  return negative ? -parsed : parsed;
}

export function parsePriceValue(value) {
  return parsePriceValueInternal(value);
}

export function sanitizePriceValue(value) {
  const parsed = parsePriceValueInternal(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }
  return Number(parsed.toFixed(2));
}

function normalizeBarcodeValueLocal(value) {
  return normalizeNumbers(String(value ?? '')).trim().toLowerCase();
}

export function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

const GROUP_PRICE_PRECISION = 2;

function normalizePrice(value) {
  const number = parsePriceValue(value);
  if (!Number.isFinite(number)) return '0.00';
  return number.toFixed(GROUP_PRICE_PRECISION);
}

function getItemQuantity(entry = {}) {
  const candidates = [
    entry?.qty,
    entry?.quantity,
    entry?.count,
    entry?.units,
  ];

  for (const candidate of candidates) {
    const parsed = Number.parseFloat(normalizeNumbers(String(candidate ?? '')).replace(/[^0-9.]/g, ''));
    if (Number.isFinite(parsed) && parsed > 0) {
      return sanitizePriceValue(parsed);
    }
  }

  return 1;
}

export function resolveReservationItemGroupKey(item = {}) {
  const description = item?.desc || item?.description || item?.name || '';
  const normalizedDescription = normalizeText(description);
  const priceKey = normalizePrice(item?.price ?? item?.unitPrice ?? item?.unit_price ?? 0);
  return `${normalizedDescription}::${priceKey}`;
}

export function groupReservationItems(items = []) {
  const map = new Map();

  items.forEach((item, index) => {
    const key = resolveReservationItemGroupKey(item);
    if (!key) return;
    if (!map.has(key)) {
      const description = item?.desc || item?.description || item?.name || '';
      const normalizedDescription = normalizeText(description);
      const unitPrice = toPriceNumber(item);
      const unitCost = toCostNumber(item);
      const image = item?.image || item?.imageUrl || item?.img || '';

      map.set(key, {
        key,
        description,
        normalizedDescription,
        unitPrice,
        unitCost,
        image,
        items: [],
        itemIndices: [],
        barcodes: [],
      });
    }

    const group = map.get(key);
    group.items.push(item);
    group.itemIndices.push(index);
    if (item?.barcode) {
      group.barcodes.push(String(item.barcode));
    }
  });

  return Array.from(map.values()).map((group) => ({
    ...group,
    quantity: group.items.reduce((sum, entry) => sum + getItemQuantity(entry), 0),
  })).map((group) => {
    const quantity = group.quantity || 0;
    const totalPriceRaw = group.items.reduce((sum, entry) => {
      const price = toPriceNumber(entry);
      const itemQty = getItemQuantity(entry);
      return sum + (price * itemQty);
    }, 0);
    const totalPrice = sanitizePriceValue(totalPriceRaw);
    const existingUnitPrice = parsePriceValue(group.unitPrice);
    const unitPriceBase = Number.isFinite(existingUnitPrice) ? existingUnitPrice : 0;
    const totalCostRaw = group.items.reduce((sum, entry) => {
      const cost = toCostNumber(entry);
      const itemQty = getItemQuantity(entry);
      return sum + (cost * itemQty);
    }, 0);
    const totalCost = sanitizePriceValue(totalCostRaw);
    const existingUnitCost = parsePriceValue(group.unitCost);
    const unitCostBase = Number.isFinite(existingUnitCost) ? existingUnitCost : 0;
    const unitPrice = quantity > 0
      ? sanitizePriceValue(totalPrice / quantity)
      : sanitizePriceValue(unitPriceBase);
    const unitCost = quantity > 0
      ? sanitizePriceValue(totalCost / quantity)
      : sanitizePriceValue(unitCostBase);

    return {
      ...group,
      quantity,
      count: quantity, // backward compatible alias
      totalPrice,
      unitPrice,
      totalCost,
      unitCost,
    };
  });
}

function normalizePackageItemsForGroup(packageEntry = {}) {
  const resolvedItems = resolvePackageItems(packageEntry) || [];

  return resolvedItems.map((item) => ({
    ...item,
    normalizedBarcode: item?.normalizedBarcode ?? normalizeBarcodeValueLocal(item?.barcode),
    // Keep "qty" as-is for backward compatibility (not used in pricing/display)
    qty: (() => {
      const qtyCandidate = Number.parseFloat(normalizeNumbers(String(item?.qty ?? item?.quantity ?? 1)));
      return Number.isFinite(qtyCandidate) && qtyCandidate > 0 ? qtyCandidate : 1;
    })(),
    // Preserve explicit per-package quantity for consumers (UI/debug)
    // Business rule: each item in a package is a unique barcode (count = 1)
    qtyPerPackage: 1,
    price: (() => {
      const parsed = parsePriceValue(item?.price ?? item?.unit_price ?? item?.unitPrice);
      return Number.isFinite(parsed) ? parsed : 0;
    })(),
    cost: (() => {
      const parsed = parsePriceValue(
        item?.cost
          ?? item?.unit_cost
          ?? item?.unitCost
          ?? item?.rental_cost
          ?? item?.purchase_price
      );
      return Number.isFinite(parsed) ? parsed : 0;
    })(),
  }));
}

// --------------------
// Package Pricing Utils
// --------------------

function normalizePerPackageQtyLocal(raw) {
  const parsed = Number.parseFloat(normalizeNumbers(String(raw ?? '1')));
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  if (parsed > 50) return 1;
  return Math.max(1, Math.round(parsed));
}

// بناء أسطر تسعير لكل معدة داخل الحزمة بشكل مستقل
export function buildPackageEquipmentLines(packageRef = {}, { packageQuantity = 1 } = {}) {
  const pkgId = normalizePackageId(
    packageRef?.package_code
    ?? packageRef?.packageCode
    ?? packageRef?.code
    ?? packageRef?.id
    ?? packageRef?.packageId
    ?? packageRef?.package_id
  );
  const source = pkgId ? (findPackageById(pkgId) || packageRef) : packageRef;
  const items = resolvePackageItems(source) || [];
  const q = Number.isFinite(Number(packageQuantity)) && Number(packageQuantity) > 0
    ? Number(packageQuantity)
    : 1;

  return items.map((item) => {
    // Enforce 1 per unique barcode inside packages
    const qtyPerPackage = 1;
    const unitPriceCandidate = parsePriceValue(item?.price ?? item?.unit_price ?? item?.unitPrice);
    const unitPrice = Number.isFinite(unitPriceCandidate) ? sanitizePriceValue(unitPriceCandidate) : 0;
    const unitCostCandidate = parsePriceValue(
      item?.cost
        ?? item?.unit_cost
        ?? item?.unitCost
        ?? item?.rental_cost
        ?? item?.purchase_price
    );
    const unitCost = Number.isFinite(unitCostCandidate) ? sanitizePriceValue(unitCostCandidate) : 0;
    const totalUnitsPerDay = qtyPerPackage * q;
    const linePerDayTotal = sanitizePriceValue(unitPrice * totalUnitsPerDay);
    const linePerDayCost = sanitizePriceValue(unitCost * totalUnitsPerDay);
    return {
      equipmentId: item?.equipmentId ?? item?.equipment_id ?? null,
      barcode: item?.barcode ?? item?.normalizedBarcode ?? '',
      desc: item?.desc ?? item?.description ?? '',
      qtyPerPackage,
      packageQuantity: q,
      totalUnits: totalUnitsPerDay,
      unitPrice,
      perDayTotal: linePerDayTotal,
      unitCost,
      perDayCost: linePerDayCost,
    };
  });
}

// يحسب إجمالي الحزمة انطلاقًا من أسطر التسعير الفردية
export function computePackageTotalFromLines(lines = [], { days = 1 } = {}) {
  const d = Number.isFinite(Number(days)) && Number(days) > 0 ? Number(days) : 1;
  const perDay = (Array.isArray(lines) ? lines : []).reduce((sum, line) => sum + (Number(line?.perDayTotal) || 0), 0);
  return sanitizePriceValue(perDay * d);
}

// مساعد شامل: يبني الأسطر ثم يعيد الإجمالي اليومي وإجمالي الأيام
export function computePackagePricing(packageRef = {}, { packageQuantity = 1, days = 1 } = {}) {
  const lines = buildPackageEquipmentLines(packageRef, { packageQuantity });
  const perDayTotal = sanitizePriceValue(lines.reduce((sum, l) => sum + (Number(l.perDayTotal) || 0), 0));
  const perDayCostTotal = sanitizePriceValue(lines.reduce((sum, l) => sum + (Number(l.perDayCost) || 0), 0));
  const total = sanitizePriceValue(perDayTotal * (Number.isFinite(Number(days)) && Number(days) > 0 ? Number(days) : 1));
  const costTotal = sanitizePriceValue(perDayCostTotal * (Number.isFinite(Number(days)) && Number(days) > 0 ? Number(days) : 1));
  return { lines, perDayTotal, total, perDayCostTotal, costTotal };
}

function resolvePackageQuantity(packageEntry = {}) {
  const raw = packageEntry.quantity
    ?? packageEntry.qty
    ?? packageEntry.count
    ?? packageEntry.package_quantity
    ?? packageEntry.packageQty
    ?? 1;
  const parsed = Number.parseFloat(normalizeNumbers(String(raw)).replace(/[^0-9.]/g, ''));
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return 1;
}

function resolvePackageUnitPrice(packageEntry = {}, packageItems = [], quantityOverride = null) {
  // Always prefer the stored package price from Equipment > Packages
  try {
    const defId = normalizePackageId(
      packageEntry?.id ?? packageEntry?.packageId ?? packageEntry?.package_id ?? packageEntry?.package_code ?? packageEntry?.code
    );
    if (defId) {
      const def = findPackageById(defId);
      if (def) {
        const price = def.price ?? def.total_price ?? def.package_price;
        const parsed = parsePriceValue(price);
        if (Number.isFinite(parsed) && parsed > 0) {
          return sanitizePriceValue(parsed);
        }
      }
    }
  } catch (_) { /* ignore */ }

  // Fallback: any explicit price on the entry itself
  const candidate = packageEntry.unit_price ?? packageEntry.unitPrice ?? packageEntry.price;
  const parsed = parsePriceValue(candidate);
  if (Number.isFinite(parsed) && parsed > 0) {
    return sanitizePriceValue(parsed);
  }

  const totalCandidate = packageEntry.total_price ?? packageEntry.totalPrice ?? packageEntry.total;
  const totalParsed = parsePriceValue(totalCandidate);
  const quantityOverrideParsed = Number.parseFloat(normalizeNumbers(String(quantityOverride)).replace(/[^0-9.]/g, ''));
  const quantity = Number.isFinite(quantityOverrideParsed) && quantityOverrideParsed > 0
    ? quantityOverrideParsed
    : resolvePackageQuantity(packageEntry);
  if (Number.isFinite(totalParsed) && totalParsed > 0 && quantity > 0) {
    return sanitizePriceValue(totalParsed / quantity);
  }

  // Do NOT derive from child items sum; keep only authoritative package price
  return 0;
}

export function buildReservationDisplayGroups(reservation = {}) {
  const items = Array.isArray(reservation?.items) ? reservation.items : [];
  const groupedItems = groupReservationItems(items);

  // Build snapshot maps to unify package keys (id/code)
  const pkgDefs = getPackagesSnapshot();
  const pkgIdSet = new Set();
  const codeToId = new Map();
  pkgDefs.forEach((def) => {
    const normId = normalizePackageId(def?.id ?? def?.packageId ?? def?.package_id ?? def?.code);
    if (normId) pkgIdSet.add(normId);
    const normCode = normalizeNumbers(String(def?.package_code ?? def?.code ?? '')).trim().toLowerCase();
    if (normCode) codeToId.set(normCode, normId || normCode);
  });

  const derivePackageKey = (entry, indexHint = 0) => {
    const idNorm = normalizePackageId(
      entry?.package_code
      ?? entry?.packageId
      ?? entry?.package_id
      ?? entry?.code
      ?? entry?.id
      ?? null
    );
    const codeNorm = normalizeNumbers(String(
      entry?.package_code
      ?? entry?.code
      ?? entry?.barcode
      ?? ''
    )).trim().toLowerCase();

    if (idNorm) return idNorm;
    if (codeNorm && codeToId.has(codeNorm)) return codeToId.get(codeNorm);
    return codeNorm || `pkg-${indexHint}`;
  };

  const packagesMap = new Map();

  const registerPackageSource = (pkg, indexHint = 0, origin = 'packages') => {
    if (!pkg || typeof pkg !== 'object') return;

    const normalizedId = derivePackageKey(pkg, indexHint);

    const key = normalizedId || `pkg-${indexHint}`;
    if (!packagesMap.has(key)) {
      packagesMap.set(key, {
        source: pkg,
        normalizedId: key,
        index: indexHint,
        itemSource: origin === 'items' ? pkg : null,
      });
      return;
    }

    const existing = packagesMap.get(key);
    if (!existing.source) {
      existing.source = pkg;
    }

    if (origin === 'items') {
      existing.itemSource = pkg;

      if (existing.source && typeof existing.source === 'object') {
        const sourceHasItems = Array.isArray(existing.source.packageItems) && existing.source.packageItems.length > 0;
        const pkgHasItems = Array.isArray(pkg.packageItems) && pkg.packageItems.length > 0;
        if (!sourceHasItems && pkgHasItems) {
          existing.source = { ...existing.source, packageItems: pkg.packageItems };
        }
        if (!existing.source.image && pkg.image) {
          existing.source = { ...existing.source, image: pkg.image };
        }
      }
    }
  };

  if (Array.isArray(reservation?.packages)) {
    reservation.packages.forEach((pkg, idx) => registerPackageSource(pkg, idx, 'packages'));
  }

  items.forEach((item, idx) => {
    if (item && typeof item === 'object' && (item.type === 'package' || Array.isArray(item?.packageItems))) {
      const key = derivePackageKey(item, idx + packagesMap.size);
      // Avoid adding a second source with a different ad-hoc key for the same package
      registerPackageSource({ ...item, package_id: key, packageId: key, package_code: item.package_code ?? item.code }, idx + packagesMap.size, 'items');
    }
  });

  const packageGroups = [];
  const packageBarcodes = new Set();
  const packageEquipmentIds = new Set();

  packagesMap.forEach(({ source: pkg, itemSource = null, normalizedId }, mapKey) => {
    // Prefer reservation-specific data over canonical definitions to keep user overrides (cost, price, etc.)
    const canonicalDef = normalizedId ? findPackageById(normalizedId) : null;
    const pkgSource = pkg && typeof pkg === 'object' ? pkg : {};
    const primarySource = canonicalDef ? { ...canonicalDef, ...pkgSource } : pkgSource;
    const secondarySource = itemSource && typeof itemSource === 'object' ? itemSource : null;

    let resolvedItems = normalizePackageItemsForGroup(primarySource);
    if ((!Array.isArray(resolvedItems) || resolvedItems.length === 0) && secondarySource) {
      resolvedItems = normalizePackageItemsForGroup(secondarySource);
    }

    resolvedItems.forEach((item) => {
      const normalizedBarcode = item?.normalizedBarcode ?? normalizeBarcodeValueLocal(item?.barcode);
      if (normalizedBarcode) {
        packageBarcodes.add(normalizedBarcode);
      }
      const equipmentId = item?.equipmentId ?? item?.equipment_id ?? null;
      if (equipmentId != null) {
        packageEquipmentIds.add(String(equipmentId));
      }
    });

    // Always treat a package as a unique kit: 1 unit per booking.
    // Even if the source carries a quantity, we clamp it to 1 to avoid
    // leaking stock counts or accidental multipliers into pricing.
    let packageQty = 1;

    let unitPrice = resolvePackageUnitPrice(primarySource, resolvedItems, packageQty);
    const itemPriceCandidates = [
      secondarySource?.price,
      secondarySource?.unit_price,
      secondarySource?.unitPrice,
    ];
    for (const candidate of itemPriceCandidates) {
      const parsed = parsePriceValue(candidate);
      if (Number.isFinite(parsed) && parsed > 0) {
        unitPrice = sanitizePriceValue(parsed);
        break;
      }
    }
    unitPrice = sanitizePriceValue(unitPrice);

    const unitCostCandidates = [
      primarySource?.unit_cost,
      primarySource?.unitCost,
      primarySource?.cost,
      secondarySource?.unit_cost,
      secondarySource?.unitCost,
      secondarySource?.cost,
    ];
    let unitCost = 0;
    for (const candidate of unitCostCandidates) {
      const parsed = parsePriceValue(candidate);
      if (Number.isFinite(parsed) && parsed >= 0) {
        unitCost = sanitizePriceValue(parsed);
        break;
      }
    }
    // Resolve pricing mode: daily or fixed (default to daily unless explicitly fixed)
    const resolvePricingMode = () => {
      const candidates = [
        primarySource?.pricing_mode,
        primarySource?.pricingMode,
        primarySource?.pricing,
        secondarySource?.pricing_mode,
        secondarySource?.pricingMode,
        secondarySource?.pricing,
      ];
      for (const c of candidates) {
        if (c == null) continue;
        const v = String(c).trim().toLowerCase();
        if (v === 'daily' || v === 'per_day' || v === 'day') return 'daily';
        if (v === 'fixed' || v === 'per_booking' || v === 'booking') return 'fixed';
      }
      return 'daily';
    };
    const pricingMode = resolvePricingMode();

    const totalPriceCandidates = [
      secondarySource?.total,
      secondarySource?.total_price,
      secondarySource?.totalPrice,
      primarySource?.total,
      primarySource?.total_price,
      primarySource?.totalPrice,
    ];
    let totalPrice = NaN;
    for (const candidate of totalPriceCandidates) {
      const parsed = parsePriceValue(candidate);
      if (Number.isFinite(parsed) && parsed >= 0) {
        totalPrice = parsed;
        break;
      }
    }
    if (!Number.isFinite(totalPrice)) {
      // إجمالي الحزمة الافتراضي = سعر الوحدة × كمية الحزمة (بدون ضرب بالأيام هنا)
      totalPrice = unitPrice * packageQty;
    }
    totalPrice = sanitizePriceValue(totalPrice);

    // Prefer the actual package_code (as shown in Equipment > Packages) over ids or barcodes
    const packageDisplayCodeCandidates = [
      primarySource?.package_code,
      primarySource?.code,
      primarySource?.packageCode,
      primarySource?.displayCode,
      primarySource?.display_code,
      primarySource?.barcode,
      secondarySource?.package_code,
      secondarySource?.code,
      secondarySource?.packageCode,
      secondarySource?.displayCode,
      secondarySource?.display_code,
      secondarySource?.barcode,
      normalizedId,
      mapKey,
    ];
    const packageDisplayCodeRaw = packageDisplayCodeCandidates.find((candidate) => {
      if (candidate == null) return false;
      const trimmed = String(candidate).trim();
      return trimmed.length > 0;
    });
    const packageDisplayCode = packageDisplayCodeRaw != null
      ? normalizeNumbers(String(packageDisplayCodeRaw)).trim()
      : '';

    if (packageDisplayCode) {
      const normalizedPkgBarcode = normalizeBarcodeValueLocal(packageDisplayCode);
      if (normalizedPkgBarcode) {
        packageBarcodes.add(normalizedPkgBarcode);
      }
    }

    const barcodesList = resolvedItems
      .map((item) => normalizeNumbers(String(item?.barcode ?? item?.normalizedBarcode ?? '')))
      .filter(Boolean);

    const descriptionCandidates = [
      primarySource?.name,
      primarySource?.package_name,
      primarySource?.title,
      secondarySource?.name,
      secondarySource?.desc,
      secondarySource?.package_name,
      packageDisplayCode,
      normalizeNumbers(String(mapKey)),
    ];
    const description = descriptionCandidates.find((value) => value != null && String(value).trim() !== '')
      || normalizeNumbers(String(packageDisplayCode || mapKey));

    const imageSource = (resolvedItems.find((item) => item?.image)?.image)
      ?? primarySource?.image
      ?? secondarySource?.image
      ?? null;

    // كمية العرض للحزم يجب أن تكون دائمًا 1 (بدون عدّ مضاعف)
    const displayQty = 1;

    packageGroups.push({
      key: `package::${mapKey}`,
      description,
      normalizedDescription: normalizeNumbers(String(description)),
      unitPrice,
      unitCost,
      totalPrice,
      pricingMode,
      quantity: packageQty,
      count: displayQty,
      image: imageSource,
      barcodes: barcodesList,
      barcode: packageDisplayCode,
      package_code: packageDisplayCode,
      packageDisplayCode,
      items: [{
        type: 'package',
        packageItems: resolvedItems,
        packageId: normalizedId,
        desc: description,
        price: unitPrice,
        cost: unitCost,
        qty: displayQty,
        barcode: packageDisplayCode,
      }],
      type: 'package',
      packageItems: resolvedItems,
      packageId: normalizedId,
    });
  });

  const normalizedPackageBarcodes = new Set(
    Array.from(packageBarcodes)
      .map((code) => normalizeBarcodeValueLocal(code))
      .filter(Boolean)
  );

  const filteredGroupedItems = groupedItems.filter((group) => {
    const representsPackage = group.items.some((item) => item?.type === 'package');
    if (representsPackage && packageGroups.length > 0) {
      return false;
    }

    const hasPackageRef = (entry = {}) => [
      entry.packageId,
      entry.package_id,
      entry.package_code,
      entry.packageCode,
      entry.bundleId,
      entry.bundle_id,
    ].some((v) => v != null && v !== '');

    const everyItemFromPackage = group.items.every((item) => {
      const eqId = resolveEquipmentIdentifier(item);
      const normalizedEqId = eqId != null ? String(eqId) : null;
      if (normalizedEqId && packageEquipmentIds.has(normalizedEqId)) {
        return true;
      }
      const normalizedBarcode = item?.barcode ? normalizeBarcodeValueLocal(item.barcode) : null;
      if (normalizedBarcode && normalizedPackageBarcodes.has(normalizedBarcode)) {
        return true;
      }
      // Legacy data: children carry package reference but lack barcode/equipment id
      if (hasPackageRef(item)) {
        return true;
      }
      return false;
    });

    if (everyItemFromPackage) {
      return false;
    }

    return true;
  });

  // Deduplicate packageGroups by their canonical key to avoid doubles
  const seenPackages = new Set();
  const uniquePackageGroups = [];
  packageGroups.forEach((group) => {
    const key = derivePackageKey({
      package_code: group?.package_code,
      packageId: group?.packageId,
      package_id: group?.packageId,
      code: group?.barcode,
      id: group?.packageId,
    });
    if (!key || seenPackages.has(key)) return;
    seenPackages.add(key);
    uniquePackageGroups.push(group);
  });

  const displayGroups = uniquePackageGroups.length
    ? [...uniquePackageGroups, ...filteredGroupedItems]
    : groupedItems;

  return {
    groups: displayGroups,
    packageGroups,
    groupedItems,
    filteredGroupedItems,
    packagesMap,
  };
}

export function resolveEquipmentIdentifier(record = {}) {
  const candidates = [
    record?.id,
    record?.equipment_id,
    record?.equipmentId,
    record?.item_id,
    record?.itemId,
  ];

  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined || candidate === '') continue;
    return String(candidate);
  }

  return null;
}

function toPriceNumber(entry = {}) {
  const candidates = [
    entry?.price,
    entry?.unit_price,
    entry?.unitPrice,
    entry?.unit_rate,
    entry?.unitRate,
  ];

  for (const candidate of candidates) {
    const parsed = parsePriceValue(candidate);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function toCostNumber(entry = {}) {
  const candidates = [
    entry?.cost,
    entry?.unit_cost,
    entry?.unitCost,
    entry?.rental_cost,
    entry?.rentalCost,
    entry?.purchase_price,
    entry?.purchasePrice,
  ];

  for (const candidate of candidates) {
    const parsed = parsePriceValue(candidate);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

export function isReservationCompleted(reservation) {
  // Treat explicit completed/closed status as completed regardless of time
  const rawStatus = reservation?.status ?? reservation?.reservationStatus ?? null;
  if (rawStatus) {
    const s = String(rawStatus).trim().toLowerCase();
    if (s === 'completed' || s === 'closed' || s === 'مغلق' || s === 'مكتمل' || s === 'منتهي' || s === 'منتهية') {
      return true;
    }
  }
  if (!reservation?.end) return false;
  const end = new Date(reservation.end);
  if (Number.isNaN(end.getTime())) return false;
  const now = new Date();
  return end < now;
}

export function normalizeProjectStatus(value = '') {
  const normalized = String(value ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'confirmed':
    case 'مؤكد':
      return 'confirmed';
    case 'in_progress':
    case 'in-progress':
    case 'قيد التنفيذ':
    case 'جاري':
      return 'in_progress';
    case 'completed':
    case 'مكتمل':
      return 'completed';
    case 'cancelled':
    case 'ملغي':
    case 'ملغية':
    case 'ملغى':
    case 'canceled':
      return 'cancelled';
    case 'pending':
    case 'draft':
    case 'قيد الانتظار':
    case 'بانتظار التأكيد':
    case 'معلق':
    default:
      return 'pending';
  }
}

export function resolveReservationProjectState(reservation = {}, project = null) {
  const reservationConfirmed = reservation?.confirmed === true || reservation?.confirmed === 'true';
  const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
  const projectLinked = projectId != null && projectId !== '' && projectId !== 'null';
  const projectStatus = projectLinked ? normalizeProjectStatus(project?.status ?? project?.status_label ?? project?.statusLabel ?? '') : null;
  const projectConfirmed = projectLinked
    && (project?.confirmed === true || ['confirmed', 'in_progress', 'completed'].includes(projectStatus));
  const effectiveConfirmed = projectLinked ? projectConfirmed : reservationConfirmed;

  return {
    reservationConfirmed,
    projectLinked,
    projectStatus,
    projectConfirmed,
    effectiveConfirmed,
  };
}
