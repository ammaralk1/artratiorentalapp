import { normalizeNumbers } from './utils.js';
import { resolvePackageItems, normalizePackageId } from './reservationsPackages.js';

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

  let result = parsed;
  let iterations = 0;
  while (Math.abs(result) > 100_000 && iterations < 8) {
    result /= 10;
    iterations += 1;
  }

  return Number(result.toFixed(2));
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
      const image = item?.image || item?.imageUrl || item?.img || '';

      map.set(key, {
        key,
        description,
        normalizedDescription,
        unitPrice,
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
    const unitPrice = quantity > 0
      ? sanitizePriceValue(totalPrice / quantity)
      : sanitizePriceValue(unitPriceBase);

    return {
      ...group,
      quantity,
      count: quantity, // backward compatible alias
      totalPrice,
      unitPrice,
    };
  });
}

function normalizePackageItemsForGroup(packageEntry = {}) {
  const resolvedItems = resolvePackageItems(packageEntry) || [];

  return resolvedItems.map((item) => ({
    ...item,
    normalizedBarcode: item?.normalizedBarcode ?? normalizeBarcodeValueLocal(item?.barcode),
    qty: (() => {
      const qtyCandidate = Number.parseFloat(normalizeNumbers(String(item?.qty ?? item?.quantity ?? 1)));
      return Number.isFinite(qtyCandidate) && qtyCandidate > 0 ? qtyCandidate : 1;
    })(),
    price: (() => {
      const parsed = parsePriceValue(item?.price ?? item?.unit_price ?? item?.unitPrice);
      return Number.isFinite(parsed) ? parsed : 0;
    })(),
  }));
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
  const candidate = packageEntry.unit_price
    ?? packageEntry.unitPrice
    ?? packageEntry.price;
  const parsed = parsePriceValue(candidate);
  if (Number.isFinite(parsed) && parsed > 0) {
    return sanitizePriceValue(parsed);
  }

  const totalCandidate = packageEntry.total_price
    ?? packageEntry.totalPrice
    ?? packageEntry.total;
  const totalParsed = parsePriceValue(totalCandidate);
  const quantityOverrideParsed = Number.parseFloat(normalizeNumbers(String(quantityOverride)).replace(/[^0-9.]/g, ''));
  const quantity = Number.isFinite(quantityOverrideParsed) && quantityOverrideParsed > 0
    ? quantityOverrideParsed
    : resolvePackageQuantity(packageEntry);
  if (Number.isFinite(totalParsed) && totalParsed > 0 && quantity > 0) {
    return sanitizePriceValue(totalParsed / quantity);
  }

  if (Array.isArray(packageItems) && packageItems.length) {
    const itemsTotal = packageItems.reduce((sum, item) => {
      const price = parsePriceValue(item.price ?? item.unit_price ?? item.unitPrice);
      const qtyCandidate = Number.parseFloat(normalizeNumbers(String(item.qty ?? item.quantity ?? 1)).replace(/[^0-9.]/g, ''));
      const qty = Number.isFinite(qtyCandidate) && qtyCandidate > 0 ? qtyCandidate : 1;
      return sum + (price * qty);
    }, 0);
    if (itemsTotal > 0 && quantity > 0) {
      return sanitizePriceValue(itemsTotal / quantity);
    }
  }

  return 0;
}

export function buildReservationDisplayGroups(reservation = {}) {
  const items = Array.isArray(reservation?.items) ? reservation.items : [];
  const groupedItems = groupReservationItems(items);

  const packagesMap = new Map();

  const registerPackageSource = (pkg, indexHint = 0, origin = 'packages') => {
    if (!pkg || typeof pkg !== 'object') return;

    const normalizedId = normalizePackageId(
      pkg?.package_code
      ?? pkg?.packageId
      ?? pkg?.package_id
      ?? pkg?.code
      ?? pkg?.id
      ?? pkg?.barcode
      ?? `pkg-${indexHint}`
    );

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
      registerPackageSource(item, idx + packagesMap.size, 'items');
    }
  });

  const packageGroups = [];
  const packageBarcodes = new Set();
  const packageEquipmentIds = new Set();

  packagesMap.forEach(({ source: pkg, itemSource = null, normalizedId }, mapKey) => {
    const primarySource = pkg || {};
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

    let packageQty = resolvePackageQuantity(primarySource);
    if (secondarySource) {
      const overrideQty = resolvePackageQuantity(secondarySource);
      if (Number.isFinite(overrideQty) && overrideQty > 0) {
        packageQty = overrideQty;
      }
    }
    if (!Number.isFinite(packageQty) || packageQty <= 0) {
      packageQty = 1;
    }

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
      totalPrice = unitPrice * packageQty;
    }
    totalPrice = sanitizePriceValue(totalPrice);

    const packageBarcode = primarySource?.package_code
      ?? primarySource?.packageId
      ?? primarySource?.package_id
      ?? primarySource?.barcode
      ?? secondarySource?.package_code
      ?? secondarySource?.packageId
      ?? secondarySource?.package_id
      ?? secondarySource?.barcode
      ?? null;
    if (packageBarcode) {
      const normalizedPkgBarcode = normalizeBarcodeValueLocal(packageBarcode);
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
      normalizeNumbers(String(packageBarcode ?? mapKey)),
    ];
    const description = descriptionCandidates.find((value) => value != null && String(value).trim() !== '')
      || normalizeNumbers(String(packageBarcode ?? mapKey));

    const imageSource = (resolvedItems.find((item) => item?.image)?.image)
      ?? primarySource?.image
      ?? secondarySource?.image
      ?? null;

    packageGroups.push({
      key: `package::${mapKey}`,
      description,
      normalizedDescription: normalizeNumbers(String(description)),
      unitPrice,
      totalPrice,
      quantity: packageQty,
      count: packageQty,
      image: imageSource,
      barcodes: barcodesList,
      barcode: packageBarcode,
      package_code: packageBarcode,
      items: [{
        type: 'package',
        packageItems: resolvedItems,
        packageId: normalizedId,
        desc: description,
        price: unitPrice,
        qty: packageQty,
        barcode: packageBarcode,
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
      return false;
    });

    if (everyItemFromPackage) {
      return false;
    }

    return true;
  });

  const displayGroups = packageGroups.length
    ? [...packageGroups, ...filteredGroupedItems]
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

export function isReservationCompleted(reservation) {
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
