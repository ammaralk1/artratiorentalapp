import { normalizeNumbers } from './utils.js';
import { resolvePackageItems, normalizePackageId } from './reservationsPackages.js';

export function sanitizePriceValue(value) {
  let result = Number(value);
  if (!Number.isFinite(result)) {
    return 0;
  }

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
  const number = Number(value);
  if (!Number.isFinite(number)) return '0.00';
  return number.toFixed(GROUP_PRICE_PRECISION);
}

function getItemQuantity(entry = {}) {
  const parsed = Number(entry?.qty);
  if (Number.isFinite(parsed) && parsed > 0) {
    return sanitizePriceValue(parsed);
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
    const totalPrice = group.items.reduce((sum, entry) => {
      const price = toPriceNumber(entry);
      const itemQty = getItemQuantity(entry);
      return sum + (price * itemQty);
    }, 0);
    const unitPrice = quantity > 0 ? totalPrice / quantity : group.unitPrice;

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
    qty: Number.isFinite(Number(item?.qty)) ? Number(item.qty) : 1,
    price: Number.isFinite(Number(item?.price)) ? Number(item.price) : 0,
  }));
}

function resolvePackageQuantity(packageEntry = {}) {
  const raw = packageEntry.quantity
    ?? packageEntry.qty
    ?? packageEntry.count
    ?? packageEntry.package_quantity
    ?? packageEntry.packageQty
    ?? 1;
  const parsed = Number(raw);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return 1;
}

function resolvePackageUnitPrice(packageEntry = {}, packageItems = [], quantityOverride = null) {
  const candidate = packageEntry.unit_price
    ?? packageEntry.unitPrice
    ?? packageEntry.price;
  const parsed = Number(candidate);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  const totalCandidate = packageEntry.total_price
    ?? packageEntry.totalPrice
    ?? packageEntry.total;
  const totalParsed = Number(totalCandidate);
  const quantity = Number.isFinite(Number(quantityOverride)) && Number(quantityOverride) > 0
    ? Number(quantityOverride)
    : resolvePackageQuantity(packageEntry);
  if (Number.isFinite(totalParsed) && totalParsed > 0 && quantity > 0) {
    return sanitizePriceValue(Number((totalParsed / quantity).toFixed(2)));
  }

  if (Array.isArray(packageItems) && packageItems.length) {
    const itemsTotal = packageItems.reduce((sum, item) => {
      const price = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;
      const qty = Number.isFinite(Number(item.qty)) ? Number(item.qty) : 1;
      return sum + (price * qty);
    }, 0);
    if (itemsTotal > 0 && quantity > 0) {
      return sanitizePriceValue(Number((itemsTotal / quantity).toFixed(2)));
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
      const parsed = Number(candidate);
      if (Number.isFinite(parsed) && parsed > 0) {
        unitPrice = parsed;
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
      const parsed = Number(candidate);
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
  const value = entry?.price ?? entry?.unit_price ?? entry?.unitPrice ?? 0;
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
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
