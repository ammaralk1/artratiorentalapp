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

function resolvePackageUnitPrice(packageEntry = {}, packageItems = []) {
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
  const quantity = resolvePackageQuantity(packageEntry);
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

  const registerPackageSource = (pkg, indexHint = 0) => {
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
      packagesMap.set(key, { source: pkg, normalizedId: key, index: indexHint });
    }
  };

  if (Array.isArray(reservation?.packages)) {
    reservation.packages.forEach((pkg, idx) => registerPackageSource(pkg, idx));
  }

  items.forEach((item, idx) => {
    if (item && typeof item === 'object' && (item.type === 'package' || Array.isArray(item?.packageItems))) {
      registerPackageSource(item, idx + packagesMap.size);
    }
  });

  const packageGroups = [];
  const packageBarcodes = new Set();
  const packageEquipmentIds = new Set();

  packagesMap.forEach(({ source: pkg, normalizedId }, mapKey) => {
    const resolvedItems = normalizePackageItemsForGroup(pkg);

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

    const packageQty = resolvePackageQuantity(pkg);
    const unitPrice = resolvePackageUnitPrice(pkg, resolvedItems);
    const totalPriceCandidate = pkg?.total
      ?? pkg?.total_price
      ?? pkg?.totalPrice
      ?? (unitPrice * packageQty);
    const totalPrice = sanitizePriceValue(
      Number.isFinite(Number(totalPriceCandidate))
        ? Number(Number(totalPriceCandidate).toFixed(2))
        : Number((unitPrice * packageQty).toFixed(2))
    );

    const packageBarcode = pkg?.package_code ?? pkg?.packageId ?? pkg?.package_id ?? pkg?.barcode ?? null;
    if (packageBarcode) {
      const normalizedPkgBarcode = normalizeBarcodeValueLocal(packageBarcode);
      if (normalizedPkgBarcode) {
        packageBarcodes.add(normalizedPkgBarcode);
      }
    }

    const barcodesList = resolvedItems
      .map((item) => normalizeNumbers(String(item?.barcode ?? item?.normalizedBarcode ?? '')))
      .filter(Boolean);

    packageGroups.push({
      key: `package::${mapKey}`,
      description: pkg?.name || pkg?.package_name || pkg?.title || normalizeNumbers(String(packageBarcode ?? mapKey)),
      normalizedDescription: normalizeNumbers(String(pkg?.name || pkg?.package_name || '')),
      unitPrice,
      totalPrice,
      quantity: packageQty,
      count: packageQty,
      image: resolvedItems.find((item) => item?.image)?.image ?? null,
      barcodes: barcodesList,
      barcode: packageBarcode,
      items: [{
        type: 'package',
        packageItems: resolvedItems,
        packageId: normalizedId,
        desc: pkg?.name || pkg?.package_name || '',
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
