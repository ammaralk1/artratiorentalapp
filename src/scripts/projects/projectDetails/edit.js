import { t } from '../../language.js';
import { normalizeNumbers, showToast } from '../../utils.js';
import { state, dom } from '../state.js';
import { escapeHtml, formatCurrency } from '../formatting.js';
import { combineProjectDateTime, splitDateTimeParts } from '../helpers.js';
import {
  buildPackageOptionsSnapshot,
  findPackageById,
  getPackageDisplayName,
  normalizePackageId,
  resolvePackageItems,
  resolvePackagePrice,
} from '../../reservationsPackages.js';
import {
  hasPackageConflict,
  hasTechnicianConflict,
  normalizeBarcodeValue,
} from '../../reservations/state.js';
import { buildReservationDisplayGroups } from '../../reservationsShared.js';
import { resolveItemImage } from '../../reservationsEquipment.js';
import {
  ensureTechnicianPositionsLoaded,
  getTechnicianPositionsCache,
} from '../../technicianPositions.js';
import {
  createProjectQuickPosition,
  createProjectQuickTechnician,
} from '../quickCrew.js';
import {
  mapProjectEquipmentToApi,
  calculateProjectFinancials,
  calculateProjectCrewEstimate,
  calculateProjectCrewCost,
  calculateSelectedEquipmentCost,
  calculateProjectServiceCost,
  calculateProjectServiceSale,
  ensureProjectCompanyShareEnabled,
  getProjectCompanySharePercent,
  resolveProjectServiceDays,
} from '../form.js';
import {
  buildProjectPayload,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi,
} from '../../projectsService.js';
import { getReservationsState, refreshReservationsFromApi } from '../../reservationsService.js';
import {
  getReservationsForProject,
  renderFocusCards,
  renderProjects,
  updateSummary,
  determineProjectStatus,
} from '../view.js';
import {
  handleProjectReservationSync,
  syncLinkedReservationsWithProject,
  updateLinkedReservationsCancelled,
  updateLinkedReservationsReopenFromCancelled,
  updateLinkedReservationsSchedule,
} from '../actions.js';
import {
  calculatePaymentProgress,
  determinePaymentStatus,
  DEFAULT_COMPANY_SHARE_PERCENT,
} from '../../reservationsSummary.js';
import { initEnhancedSelects } from '../../ui/enhancedSelect.js';
import { openEquipmentPicker } from '../../equipmentPicker/modal.js';
import { buildProjectEditPaymentHistoryMarkup } from './payment.js';
import { buildProjectTypeOptionsMarkup, buildProjectEditExpensesMarkup } from './display.js';

// ── Circular dep injection ────────────────────────────────────────────────────
// openProjectDetails lives in view.js; edit.js needs it after save/cancel.
// The entry point injects it after both modules are loaded.

let _openProjectDetails = null;

export function setOpenProjectDetails(fn) {
  _openProjectDetails = fn;
}

function isProjectCancelled(project) {
  return (project?.cancelled === true || project?.cancelled === 'true')
    || String(project?.status || '').toLowerCase() === 'cancelled'
    || String(project?.status || '').toLowerCase() === 'canceled';
}

function isProjectConfirmed(project) {
  return project?.confirmed === true || project?.confirmed === 'true';
}

function getProjectStatusSelectionValue(project) {
  if (isProjectCancelled(project)) return 'cancelled';
  const derivedStatus = determineProjectStatus(project);
  if (derivedStatus === 'completed') return 'completed';
  return isProjectConfirmed(project) ? 'confirmed' : 'pending';
}

function resolveProjectEditableOpenStatus(project, startIso, endIso) {
  const derivedStatus = determineProjectStatus({
    ...project,
    status: '',
    cancelled: false,
    start: startIso || project?.start || '',
    end: endIso || project?.end || '',
  });

  if (derivedStatus === 'completed' || derivedStatus === 'cancelled') {
    return 'ongoing';
  }

  return derivedStatus || 'ongoing';
}

function buildProjectStatusPatch(project, nextStatusValue, startIso, endIso) {
  if (nextStatusValue === 'cancelled') {
    return {
      status: 'cancelled',
      cancelled: true,
      confirmed: false,
    };
  }

  if (nextStatusValue === 'completed') {
    return {
      status: 'completed',
      cancelled: false,
      confirmed: true,
    };
  }

  const openStatus = resolveProjectEditableOpenStatus(project, startIso, endIso);
  return {
    status: openStatus,
    cancelled: false,
    confirmed: nextStatusValue === 'confirmed',
  };
}

function getProjectStatusMeta(value) {
  switch (value) {
    case 'confirmed':
      return {
        chipClass: 'status-confirmed',
        label: t('projects.form.status.confirmed', 'مؤكد'),
        hint: t('projects.form.hints.statusConfirmed', 'يؤكد المشروع والحجوزات المرتبطة ليظهر كعمل نشط وجاهز للتنفيذ.'),
      };
    case 'completed':
      return {
        chipClass: 'status-completed',
        label: t('projects.form.status.completed', 'مغلق'),
        hint: t('projects.form.hints.statusCompleted', 'يغلق المشروع بعد الانتهاء ويحوّل الحجوزات المرتبطة إلى حالة مغلقة.'),
      };
    case 'cancelled':
      return {
        chipClass: 'status-cancelled',
        label: t('projects.form.status.cancelled', 'ملغي'),
        hint: t('projects.form.hints.statusCancelled', 'يلغي المشروع ويحدّث جميع الحجوزات المرتبطة إلى حالة ملغية.'),
      };
    case 'pending':
    default:
      return {
        chipClass: 'status-pending',
        label: t('projects.form.status.pending', 'غير مؤكد'),
        hint: t('projects.form.hints.statusPending', 'يبقي المشروع مفتوحًا بدون تأكيد ويعيد الحجوزات المرتبطة إلى حالة غير مؤكدة.'),
      };
  }
}

function getPrimaryProjectReservation(projectId) {
  const linkedReservations = getReservationsForProject(projectId) || [];
  if (!linkedReservations.length) return null;
  return linkedReservations.find((reservation) => (
    reservation?.managedByProject === true
    || reservation?.managed_by_project === true
    || reservation?.source === 'project'
    || reservation?.sourceType === 'project'
    || reservation?.source_type === 'project'
  )) || linkedReservations[0];
}

function getProjectEditPackageItemKey(item = {}) {
  const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? item?.itemId ?? item?.item_id ?? null;
  if (equipmentId != null && equipmentId !== '') return `id:${equipmentId}`;
  const barcode = normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode ?? '');
  return barcode ? `barcode:${barcode}` : '';
}

function normalizeProjectEditPackageItems(items = []) {
  const seen = new Map();
  (Array.isArray(items) ? items : []).forEach((item) => {
    if (!item || typeof item !== 'object') return;
    const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? item?.itemId ?? item?.item_id ?? null;
    const barcode = item?.barcode ?? item?.normalizedBarcode ?? '';
    const key = getProjectEditPackageItemKey({ ...item, equipmentId, barcode });
    if (!key || seen.has(key)) return;
    seen.set(key, {
      equipmentId,
      equipment_id: equipmentId,
      barcode,
      normalizedBarcode: normalizeBarcodeValue(barcode),
      desc: item?.desc || item?.description || item?.name || '',
      qty: 1,
      quantity: 1,
      qtyPerPackage: 1,
      image: resolveItemImage(item) || null,
      price: Number.isFinite(Number(item?.price ?? item?.unit_price ?? item?.unitPrice)) ? Number(item?.price ?? item?.unit_price ?? item?.unitPrice) : 0,
      cost: Number.isFinite(Number(item?.cost ?? item?.unit_cost ?? item?.unitCost)) ? Number(item?.cost ?? item?.unit_cost ?? item?.unitCost) : 0,
    });
  });
  return Array.from(seen.values());
}

function mapReservationPackagesToProjectApi(packagesRaw = []) {
  const packageMap = new Map();
  (Array.isArray(packagesRaw) ? packagesRaw : []).forEach((pkg, index) => {
    if (!pkg || typeof pkg !== 'object') return;
    const packageId = pkg.packageId ?? pkg.package_id ?? pkg.id ?? pkg.package_code ?? pkg.code ?? `package-${index}`;
    const packageCode = pkg.package_code ?? pkg.packageCode ?? pkg.code ?? pkg.barcode ?? packageId;
    const key = normalizePackageId(packageId) || normalizePackageId(packageCode) || `package-${index}`;
    const existing = packageMap.get(key);
    if (!existing) {
      packageMap.set(key, { ...pkg, __index: index });
      return;
    }

    const existingItems = resolvePackageItems(existing);
    const incomingItems = resolvePackageItems(pkg);
    packageMap.set(key, {
      ...existing,
      ...pkg,
      __index: existing.__index ?? index,
      packageItems: normalizeProjectEditPackageItems([...existingItems, ...incomingItems]),
      items: normalizeProjectEditPackageItems([...existingItems, ...incomingItems]),
      unit_price: Number.isFinite(Number(pkg.unit_price ?? pkg.unitPrice ?? pkg.price ?? pkg.total_price ?? pkg.totalPrice))
        ? Number(pkg.unit_price ?? pkg.unitPrice ?? pkg.price ?? pkg.total_price ?? pkg.totalPrice)
        : (existing.unit_price ?? existing.unitPrice ?? existing.price ?? existing.total_price ?? existing.totalPrice ?? 0),
      unit_cost: Number.isFinite(Number(pkg.unit_cost ?? pkg.unitCost ?? pkg.cost ?? pkg.total_cost ?? pkg.totalCost))
        ? Number(pkg.unit_cost ?? pkg.unitCost ?? pkg.cost ?? pkg.total_cost ?? pkg.totalCost)
        : (existing.unit_cost ?? existing.unitCost ?? existing.cost ?? existing.total_cost ?? existing.totalCost ?? 0),
    });
  });

  return Array.from(packageMap.values())
    .map((pkg, fallbackIndex) => {
      if (!pkg || typeof pkg !== 'object') return null;
      const index = pkg.__index ?? fallbackIndex;
      const packageId = pkg.packageId ?? pkg.package_id ?? pkg.id ?? pkg.package_code ?? pkg.code ?? `package-${index}`;
      const packageCode = pkg.package_code ?? pkg.packageCode ?? pkg.code ?? pkg.barcode ?? packageId;
      const packageName = pkg.package_name ?? pkg.packageName ?? pkg.name ?? pkg.desc ?? packageCode;
      const packageItems = normalizeProjectEditPackageItems(resolvePackageItems(pkg));
      const unitPrice = Number.isFinite(Number(pkg.unit_price ?? pkg.unitPrice ?? pkg.price ?? pkg.total_price ?? pkg.totalPrice))
        ? Number(pkg.unit_price ?? pkg.unitPrice ?? pkg.price ?? pkg.total_price ?? pkg.totalPrice)
        : 0;
      const unitCost = Number.isFinite(Number(pkg.unit_cost ?? pkg.unitCost ?? pkg.cost ?? pkg.total_cost ?? pkg.totalCost))
        ? Number(pkg.unit_cost ?? pkg.unitCost ?? pkg.cost ?? pkg.total_cost ?? pkg.totalCost)
        : 0;
      return {
        id: `package::${normalizePackageId(packageId) || index}`,
        type: 'package',
        packageId,
        package_id: packageId,
        package_code: packageCode,
        barcode: packageCode,
        desc: packageName,
        qty: 1,
        quantity: 1,
        unit_price: unitPrice,
        unit_cost: unitCost,
        price: unitPrice,
        cost: unitCost,
        image: resolveItemImage(pkg) || packageItems.find((item) => item.image)?.image || null,
        packageItems,
      };
    })
    .filter(Boolean);
}

function mapProjectEditEquipmentRows(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const equipmentId = Number.parseInt(String(
        item?.equipmentId
        ?? item?.equipment_id
        ?? item?.id
        ?? item?.itemId
        ?? item?.item_id
        ?? 0
      ), 10);
      const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10);
      if (!Number.isInteger(equipmentId) || equipmentId <= 0) return null;
      const price = Number.isFinite(Number(item?.unit_price ?? item?.unitPrice ?? item?.price))
        ? Number(item?.unit_price ?? item?.unitPrice ?? item?.price)
        : 0;
      const cost = Number.isFinite(Number(item?.unit_cost ?? item?.unitCost ?? item?.cost))
        ? Number(item?.unit_cost ?? item?.unitCost ?? item?.cost)
        : 0;
      return {
        equipmentId,
        qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
        unit_price: price,
        unit_cost: cost,
        price,
        cost,
        notes: item?.notes ?? item?.note ?? null,
        desc: item?.desc || item?.description || item?.name || '',
        barcode: item?.barcode || '',
        image: resolveItemImage(item) || null,
      };
    })
    .filter(Boolean);
}

function mapReservationEquipmentToProjectApi(reservation) {
  let sourceItems = Array.isArray(reservation?.items)
    ? reservation.items
    : (Array.isArray(reservation?.equipment) ? reservation.equipment : []);
  const packageNotePattern = /^\s*Package:\s*(.+?)\s*$/i;
  const hasAuthoritativePackages = Array.isArray(reservation?.packagesRaw) && reservation.packagesRaw.length > 0;
  if (hasAuthoritativePackages) {
    const packageRows = mapReservationPackagesToProjectApi(reservation.packagesRaw);
    const packageItemKeys = new Set();
    packageRows.forEach((pkg) => {
      (pkg.packageItems || []).forEach((item) => {
        const key = getProjectEditPackageItemKey(item);
        if (key) packageItemKeys.add(key);
      });
    });
    const standaloneRows = sourceItems.filter((item) => {
      const note = String(item?.notes ?? item?.note ?? '').trim();
      if (packageNotePattern.test(note)) return false;
      const key = getProjectEditPackageItemKey(item);
      return !key || !packageItemKeys.has(key);
    });
    return [...packageRows, ...mapProjectEditEquipmentRows(standaloneRows)];
  }

  const legacyPackageGroups = new Map();
  if (!hasAuthoritativePackages) {
    sourceItems.forEach((item) => {
      const note = String(item?.notes ?? item?.note ?? '').trim();
      const match = note.match(packageNotePattern);
      if (!match) return;
      const label = match[1]?.trim();
      if (!label) return;
      const key = normalizePackageId(label) || normalizeNumbers(label).trim().toLowerCase();
      if (!legacyPackageGroups.has(key)) {
        legacyPackageGroups.set(key, {
          id: `package::legacy::${key}`,
          type: 'package',
          packageId: key,
          package_id: key,
          package_code: label,
          barcode: label,
          desc: label,
          qty: 1,
          unit_price: 0,
          unit_cost: 0,
          price: 0,
          cost: 0,
          packageItems: [],
        });
      }
      const target = legacyPackageGroups.get(key);
      if (Number.isFinite(Number(item?.unit_price ?? item?.unitPrice ?? item?.price))) {
        target.unit_price += Number(item?.unit_price ?? item?.unitPrice ?? item?.price);
        target.price = target.unit_price;
      }
      if (Number.isFinite(Number(item?.unit_cost ?? item?.unitCost ?? item?.cost))) {
        target.unit_cost += Number(item?.unit_cost ?? item?.unitCost ?? item?.cost);
        target.cost = target.unit_cost;
      }
      target.packageItems.push({
        equipmentId: item?.equipmentId ?? item?.equipment_id ?? item?.id ?? item?.itemId ?? item?.item_id ?? null,
        barcode: item?.barcode ?? '',
        normalizedBarcode: normalizeBarcodeValue(item?.barcode ?? ''),
        desc: item?.desc || item?.description || item?.name || '',
        qty: 1,
        quantity: 1,
        qtyPerPackage: 1,
        image: resolveItemImage(item) || null,
      });
    });
  }

  if (legacyPackageGroups.size) {
    const packageItemsSet = new Set();
    legacyPackageGroups.forEach((group) => {
      group.packageItems.forEach((item) => {
        if (item.equipmentId != null) packageItemsSet.add(`id:${item.equipmentId}`);
        if (item.normalizedBarcode) packageItemsSet.add(`barcode:${item.normalizedBarcode}`);
      });
    });
    const nonPackageItems = sourceItems.filter((item) => {
      const note = String(item?.notes ?? item?.note ?? '').trim();
      if (packageNotePattern.test(note)) return false;
      const itemId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? item?.itemId ?? item?.item_id ?? null;
      const itemBarcode = normalizeBarcodeValue(item?.barcode ?? '');
      return !(itemId != null && packageItemsSet.has(`id:${itemId}`))
        && !(itemBarcode && packageItemsSet.has(`barcode:${itemBarcode}`));
    });
    return [
      ...Array.from(legacyPackageGroups.values()),
      ...nonPackageItems
        .map((item) => {
          const equipmentId = Number.parseInt(String(
            item?.equipmentId
            ?? item?.equipment_id
            ?? item?.id
            ?? item?.itemId
            ?? item?.item_id
            ?? 0
          ), 10);
          const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10);
          if (!Number.isInteger(equipmentId) || equipmentId <= 0) return null;
          const price = Number.isFinite(Number(item?.unit_price ?? item?.unitPrice ?? item?.price))
            ? Number(item?.unit_price ?? item?.unitPrice ?? item?.price)
            : 0;
          const cost = Number.isFinite(Number(item?.unit_cost ?? item?.unitCost ?? item?.cost))
            ? Number(item?.unit_cost ?? item?.unitCost ?? item?.cost)
            : 0;
          return {
            equipmentId,
            qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
            unit_price: price,
            unit_cost: cost,
            price,
            cost,
            notes: item?.notes ?? item?.note ?? null,
            desc: item?.desc || item?.description || item?.name || '',
            barcode: item?.barcode || '',
            image: resolveItemImage(item) || null,
          };
        })
        .filter(Boolean),
    ];
  }

  try {
    const { groups = [] } = buildReservationDisplayGroups(
      { ...reservation, items: sourceItems },
      { preserveOriginalOrder: true }
    );
    const grouped = groups.map((group) => {
      const isPackageGroup = String(group?.type || '').toLowerCase() === 'package';
      if (isPackageGroup) {
        const unitPrice = Number.isFinite(Number(group.totalPrice))
          ? Number(group.totalPrice)
          : (Number.isFinite(Number(group.unitPrice)) ? Number(group.unitPrice) : 0);
        const unitCost = Number.isFinite(Number(group.totalCost))
          ? Number(group.totalCost)
          : (Number.isFinite(Number(group.unitCost)) ? Number(group.unitCost) : 0);
        return {
          id: group.key,
          type: 'package',
          packageId: group.packageId,
          package_id: group.packageId,
          package_code: group.package_code ?? group.packageDisplayCode ?? group.barcode ?? '',
          barcode: group.barcode ?? group.package_code ?? group.packageDisplayCode ?? '',
          desc: group.description || group.packageDisplayCode || t('reservations.create.packages.genericName', 'الحزمة'),
          qty: 1,
          unit_price: unitPrice,
          unit_cost: unitCost,
          price: unitPrice,
          cost: unitCost,
          image: group.image ?? null,
          packageItems: Array.isArray(group.packageItems) ? group.packageItems : [],
        };
      }

      const representative = Array.isArray(group.items) ? group.items[0] : null;
      const equipmentId = Number.parseInt(String(
        representative?.equipmentId
        ?? representative?.equipment_id
        ?? representative?.id
        ?? representative?.itemId
        ?? representative?.item_id
        ?? 0
      ), 10);
      if (!Number.isInteger(equipmentId) || equipmentId <= 0) return null;
      const qty = Number.parseInt(String(group.count ?? group.quantity ?? representative?.qty ?? representative?.quantity ?? 1), 10);
      const unitPrice = Number.isFinite(Number(group.unitPrice)) ? Number(group.unitPrice) : 0;
      const unitCost = Number.isFinite(Number(group.unitCost)) ? Number(group.unitCost) : 0;
      return {
        equipmentId,
        qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
        unit_price: unitPrice,
        unit_cost: unitCost,
        price: unitPrice,
        cost: unitCost,
        notes: representative?.notes ?? representative?.note ?? null,
        desc: group.description || representative?.desc || representative?.description || representative?.name || '',
        barcode: representative?.barcode ?? group.barcodes?.[0] ?? '',
        image: resolveItemImage(group) || resolveItemImage(representative) || null,
      };
    }).filter(Boolean);
    if (grouped.length) return grouped;
  } catch (_) {
    // Fallback to raw rows below when display grouping is unavailable.
  }

  return sourceItems
    .map((item) => {
      const equipmentId = Number.parseInt(String(
        item?.equipmentId
        ?? item?.equipment_id
        ?? item?.id
        ?? item?.itemId
        ?? item?.item_id
        ?? 0
      ), 10);
      const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10);
      if (!Number.isInteger(equipmentId) || equipmentId <= 0) return null;
      return {
        equipmentId,
        qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
        unit_price: Number.isFinite(Number(item?.unit_price ?? item?.unitPrice ?? item?.price)) ? Number(item?.unit_price ?? item?.unitPrice ?? item?.price) : 0,
        unit_cost: Number.isFinite(Number(item?.unit_cost ?? item?.unitCost ?? item?.cost)) ? Number(item?.unit_cost ?? item?.unitCost ?? item?.cost) : 0,
        price: Number.isFinite(Number(item?.unit_price ?? item?.unitPrice ?? item?.price)) ? Number(item?.unit_price ?? item?.unitPrice ?? item?.price) : 0,
        cost: Number.isFinite(Number(item?.unit_cost ?? item?.unitCost ?? item?.cost)) ? Number(item?.unit_cost ?? item?.unitCost ?? item?.cost) : 0,
        notes: item?.notes ?? item?.note ?? null,
        desc: item?.desc || item?.description || item?.name || '',
        barcode: item?.barcode || '',
        image: resolveItemImage(item) || null,
      };
    })
    .filter(Boolean);
}

function getEquipmentCatalogItemById(equipmentId) {
  return (state.equipment || []).find((item) => String(item?.id) === String(equipmentId)) || null;
}

function normalizeProjectEditSearchValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function normalizeProjectEditGroupText(value) {
  return normalizeNumbers(String(value ?? '')).trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeProjectEditGroupMoney(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')).replace(/,/g, '').trim());
  return Number.isFinite(parsed) && parsed >= 0 ? parsed.toFixed(2) : '0.00';
}

function resolveProjectEditEquipmentGroupKey(item = {}) {
  const catalogItem = getEquipmentCatalogItemById(item.equipmentId ?? item.equipment_id ?? item.id) || item;
  const description = normalizeProjectEditGroupText(catalogItem?.desc || catalogItem?.description || catalogItem?.name || item?.desc || item?.description || item?.name || '');
  if (!description) return '';
  const lessor = normalizeProjectEditGroupText(catalogItem?.lessor ?? catalogItem?.owner ?? item?.lessor ?? item?.owner ?? '');
  const unitPrice = normalizeProjectEditGroupMoney(catalogItem?.price ?? catalogItem?.unit_price ?? catalogItem?.unitPrice ?? item?.price ?? item?.unit_price ?? 0);
  const unitCost = normalizeProjectEditGroupMoney(
    catalogItem?.cost
      ?? catalogItem?.unit_cost
      ?? catalogItem?.unitCost
      ?? catalogItem?.rental_cost
      ?? catalogItem?.purchase_price
      ?? item?.cost
      ?? item?.unit_cost
      ?? 0
  );
  return `${description}::${lessor}::${unitPrice}::${unitCost}`;
}

function buildProjectEditEquipmentSearchValue(item = {}) {
  const label = item?.desc || item?.description || item?.name || '';
  const barcode = normalizeNumbers(String(item?.barcode || '')).trim();
  return barcode ? `${label} | ${barcode}` : label;
}

function findProjectEditEquipmentByBarcode(rawCode) {
  const normalizedCode = normalizeBarcodeValue(rawCode);
  if (!normalizedCode) return null;
  return (state.equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === normalizedCode) || null;
}

function findProjectEditEquipmentByDescription(rawValue) {
  const normalizedValue = normalizeProjectEditSearchValue(rawValue);
  if (!normalizedValue) return null;
  const [descriptionPart, barcodePart = ''] = normalizeNumbers(String(rawValue || '')).split('|').map((part) => part.trim());
  if (barcodePart) {
    const byBarcode = findProjectEditEquipmentByBarcode(barcodePart);
    if (byBarcode) return byBarcode;
  }
  return (state.equipment || []).find((item) => normalizeProjectEditSearchValue(buildProjectEditEquipmentSearchValue(item)) === normalizedValue)
    || (state.equipment || []).find((item) => normalizeProjectEditSearchValue(item?.desc || item?.description || item?.name || '').includes(normalizeProjectEditSearchValue(descriptionPart || rawValue)))
    || null;
}

function getProjectEditSelectedBarcodeSet(items = []) {
  const selected = new Set();
  (Array.isArray(items) ? items : []).forEach((item) => {
    const barcode = normalizeBarcodeValue(item?.barcode || getEditEquipmentBarcode(item));
    if (barcode && item?.type !== 'package') selected.add(barcode);
    if (Array.isArray(item?.packageItems)) {
      item.packageItems.forEach((pkgItem) => {
        const childBarcode = normalizeBarcodeValue(pkgItem?.normalizedBarcode ?? pkgItem?.barcode);
        if (childBarcode) selected.add(childBarcode);
      });
    }
  });
  return selected;
}

function buildProjectEditEquipmentEntry(item = {}) {
  const equipmentId = item?.id ?? item?.equipmentId ?? item?.equipment_id ?? null;
  const barcode = normalizeBarcodeValue(item?.barcode);
  if (!equipmentId || !barcode) return null;
  return {
    equipmentId,
    qty: 1,
    quantity: 1,
    unit_price: Number.isFinite(Number(item?.price ?? item?.unit_price ?? item?.unitPrice)) ? Number(item?.price ?? item?.unit_price ?? item?.unitPrice) : 0,
    unit_cost: Number.isFinite(Number(item?.cost ?? item?.unit_cost ?? item?.unitCost)) ? Number(item?.cost ?? item?.unit_cost ?? item?.unitCost) : 0,
    price: Number.isFinite(Number(item?.price ?? item?.unit_price ?? item?.unitPrice)) ? Number(item?.price ?? item?.unit_price ?? item?.unitPrice) : 0,
    cost: Number.isFinite(Number(item?.cost ?? item?.unit_cost ?? item?.unitCost)) ? Number(item?.cost ?? item?.unit_cost ?? item?.unitCost) : 0,
    desc: item?.desc || item?.description || item?.name || '',
    barcode,
    image: resolveItemImage(item) || null,
  };
}

function parsePositiveProjectEditInteger(value, fallback = 1) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseProjectEditDateFlexible(value) {
  if (!value && value !== 0) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const normalized = raw.includes(' ') && !raw.includes('T') ? raw.replace(' ', 'T') : raw;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getProjectEditReservationCollections(reservation = {}) {
  return ['items', 'equipment', 'packages', 'packageItems', 'package_items', 'reservedItems', 'reserved_items']
    .flatMap((key) => (Array.isArray(reservation?.[key]) ? reservation[key] : []));
}

function getProjectEditReservationQuantityForBarcode(reservation = {}, normalizedBarcode = '') {
  if (!normalizedBarcode) return 0;
  let total = 0;
  const visit = (entry) => {
    if (!entry || typeof entry !== 'object') return;
    const barcode = normalizeBarcodeValue(entry?.barcode ?? entry?.equipmentBarcode ?? entry?.code);
    if (barcode && barcode === normalizedBarcode) {
      total += parsePositiveProjectEditInteger(entry?.qty ?? entry?.quantity ?? entry?.count, 1);
    }
    ['packageItems', 'package_items', 'items', 'equipment', 'bundleItems', 'bundle_items'].forEach((key) => {
      if (Array.isArray(entry?.[key])) entry[key].forEach(visit);
    });
  };

  getProjectEditReservationCollections(reservation).forEach(visit);
  return total;
}

function getProjectEditReservationQuantityForGroup(reservation = {}, groupKey = '') {
  if (!groupKey) return 0;
  let total = 0;
  const visit = (entry) => {
    if (!entry || typeof entry !== 'object') return;
    const catalogItem = getEquipmentCatalogItemById(entry?.equipmentId ?? entry?.equipment_id ?? entry?.id)
      || findProjectEditEquipmentByBarcode(entry?.barcode ?? entry?.equipmentBarcode ?? entry?.code)
      || entry;
    if (resolveProjectEditEquipmentGroupKey(catalogItem) === groupKey) {
      total += parsePositiveProjectEditInteger(entry?.qty ?? entry?.quantity ?? entry?.count, 1);
    }
    ['packageItems', 'package_items', 'items', 'equipment', 'bundleItems', 'bundle_items'].forEach((key) => {
      if (Array.isArray(entry?.[key])) entry[key].forEach(visit);
    });
  };

  getProjectEditReservationCollections(reservation).forEach(visit);
  return total;
}

function getProjectEditReservedEquipmentQuantity(barcode, startIso, endIso, ignoreReservationId = null) {
  const normalizedBarcode = normalizeBarcodeValue(barcode);
  if (!normalizedBarcode || !startIso || !endIso) return 0;
  const start = parseProjectEditDateFlexible(startIso);
  const end = parseProjectEditDateFlexible(endIso);
  if (!start || !end || start >= end) return 0;
  const ignoreId = ignoreReservationId == null ? '' : String(ignoreReservationId);
  return (state.reservations || []).reduce((sum, reservation) => {
    const reservationId = String(reservation?.id ?? reservation?.reservationId ?? reservation?.reservation_id ?? '');
    if (ignoreId && reservationId === ignoreId) return sum;
    const status = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (status === 'cancelled' || status === 'canceled') return sum;
    const reservationStart = parseProjectEditDateFlexible(reservation?.start ?? reservation?.start_datetime);
    const reservationEnd = parseProjectEditDateFlexible(reservation?.end ?? reservation?.end_datetime ?? reservation?.start ?? reservation?.start_datetime);
    if (!reservationStart || !reservationEnd || !(reservationStart < end && reservationEnd > start)) return sum;
    return sum + getProjectEditReservationQuantityForBarcode(reservation, normalizedBarcode);
  }, 0);
}

function getProjectEditReservedEquipmentGroupQuantity(groupKey, startIso, endIso, ignoreReservationId = null) {
  if (!groupKey || !startIso || !endIso) return 0;
  const start = parseProjectEditDateFlexible(startIso);
  const end = parseProjectEditDateFlexible(endIso);
  if (!start || !end || start >= end) return 0;
  const ignoreId = ignoreReservationId == null ? '' : String(ignoreReservationId);
  return (state.reservations || []).reduce((sum, reservation) => {
    const reservationId = String(reservation?.id ?? reservation?.reservationId ?? reservation?.reservation_id ?? '');
    if (ignoreId && reservationId === ignoreId) return sum;
    const status = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    if (status === 'cancelled' || status === 'canceled') return sum;
    const reservationStart = parseProjectEditDateFlexible(reservation?.start ?? reservation?.start_datetime);
    const reservationEnd = parseProjectEditDateFlexible(reservation?.end ?? reservation?.end_datetime ?? reservation?.start ?? reservation?.start_datetime);
    if (!reservationStart || !reservationEnd || !(reservationStart < end && reservationEnd > start)) return sum;
    return sum + getProjectEditReservationQuantityForGroup(reservation, groupKey);
  }, 0);
}

function getProjectEditEquipmentAvailableQuantity(item = {}, form = null, fallbackProject = {}, ignoreReservationId = null) {
  const catalogItem = getEquipmentCatalogItemById(item.equipmentId ?? item.equipment_id) || item;
  const groupKey = resolveProjectEditEquipmentGroupKey(catalogItem);
  const groupItems = groupKey
    ? (state.equipment || []).filter((entry) => resolveProjectEditEquipmentGroupKey(entry) === groupKey)
    : [catalogItem];
  const stockQuantity = groupItems.reduce((sum, entry) => sum + parsePositiveProjectEditInteger(
    entry?.quantity
      ?? entry?.qty
      ?? entry?.stockQuantity
      ?? entry?.stock_quantity
      ?? entry?.availableQuantity
      ?? entry?.available_quantity,
    1
  ), 0);
  const { start, end } = getProjectEditDateRangeFromForm(form, fallbackProject);
  const barcode = item?.barcode || catalogItem?.barcode || '';
  const reservedQuantity = groupKey
    ? getProjectEditReservedEquipmentGroupQuantity(groupKey, start, end, ignoreReservationId)
    : getProjectEditReservedEquipmentQuantity(barcode, start, end, ignoreReservationId);
  return Math.max(0, stockQuantity - reservedQuantity);
}

function parseEditMoneyValue(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')).replace(/,/g, '').trim());
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function getEditEquipmentLabel(item = {}) {
  const catalogItem = getEquipmentCatalogItemById(item.equipmentId ?? item.equipment_id);
  return item.desc
    || item.description
    || item.name
    || catalogItem?.desc
    || catalogItem?.description
    || catalogItem?.name
    || item.barcode
    || catalogItem?.barcode
    || t('equipment.table.unknown', 'معدة بدون اسم');
}

function getEditEquipmentBarcode(item = {}) {
  const catalogItem = getEquipmentCatalogItemById(item.equipmentId ?? item.equipment_id);
  return item.barcode || catalogItem?.barcode || '';
}

function getEditEquipmentImage(item = {}) {
  const catalogItem = getEquipmentCatalogItemById(item.equipmentId ?? item.equipment_id);
  return resolveItemImage(item) || resolveItemImage(catalogItem || {}) || null;
}

function getProjectEditTechnicianLabel(technician = {}) {
  return technician?.name
    || technician?.fullName
    || technician?.full_name
    || technician?.technicianName
    || t('technicians.table.unknown', 'عضو فريق');
}

function getProjectEditTechnicianById(technicianId) {
  if (!technicianId) return null;
  return (state.technicians || []).find((technician) => String(technician?.id ?? technician?.technicianId ?? technician?.technician_id ?? '') === String(technicianId)) || null;
}

function getProjectEditPositionLabel(position = {}) {
  return position?.labelAr
    || position?.label_ar
    || position?.labelEn
    || position?.label_en
    || position?.name
    || t('reservations.crew.positionFallback', 'منصب بدون اسم');
}

function isProjectEditTechnicianAssigned(assignments = [], technicianId = '', currentIndex = -1) {
  const normalizedId = String(technicianId || '');
  if (!normalizedId) return false;
  return (Array.isArray(assignments) ? assignments : []).some((assignment, index) => (
    index !== currentIndex
      && String(assignment?.technicianId ?? assignment?.technician_id ?? '') === normalizedId
  ));
}

function normalizeProjectEditCrewAssignment(assignment = {}) {
  const technicianId = assignment?.technicianId ?? assignment?.technician_id ?? assignment?.id ?? null;
  const technician = getProjectEditTechnicianById(technicianId);
  return {
    assignmentId: assignment?.assignmentId ?? assignment?.assignment_id ?? `project-edit-crew-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    technicianId: technicianId ? String(technicianId) : '',
    technicianName: assignment?.technicianName
      ?? assignment?.technician_name
      ?? assignment?.name
      ?? assignment?.fullName
      ?? assignment?.full_name
      ?? getProjectEditTechnicianLabel(technician || {})
      ?? null,
    technicianRole: assignment?.technicianRole ?? assignment?.technician_role ?? technician?.role ?? null,
    positionId: assignment?.positionId ?? assignment?.position_id ?? '',
    positionKey: assignment?.positionKey ?? assignment?.position_key ?? assignment?.positionName ?? assignment?.position_name ?? '',
    positionName: assignment?.positionName ?? assignment?.position_name ?? assignment?.positionLabel ?? assignment?.position_label ?? assignment?.role ?? '',
    positionLabel: assignment?.positionLabel ?? assignment?.position_label ?? assignment?.positionName ?? assignment?.position_name ?? assignment?.role ?? '',
    positionLabelAr: assignment?.positionLabelAr ?? assignment?.position_label_ar ?? assignment?.positionLabel ?? assignment?.position_label ?? '',
    positionLabelEn: assignment?.positionLabelEn ?? assignment?.position_label_en ?? '',
    positionCost: parseEditMoneyValue(assignment?.positionCost ?? assignment?.position_cost ?? assignment?.cost ?? 0),
    positionClientPrice: parseEditMoneyValue(assignment?.positionClientPrice ?? assignment?.position_client_price ?? assignment?.clientPrice ?? assignment?.client_price ?? 0),
  };
}

function calculateOperationalEquipmentEstimate(items = []) {
  return (Array.isArray(items) ? items : []).reduce((sum, item) => {
    const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10);
    const price = parseEditMoneyValue(item?.unit_price ?? item?.unitPrice ?? item?.price);
    return sum + (Number.isInteger(qty) && qty > 0 ? qty : 1) * price;
  }, 0);
}

function getProjectEditDateRangeFromForm(form, fallbackProject = {}) {
  const startDate = form?.querySelector('[name="project-start-date"]')?.value || '';
  const startTime = form?.querySelector('[name="project-start-time"]')?.value || '';
  const endDate = form?.querySelector('[name="project-end-date"]')?.value || '';
  const endTime = form?.querySelector('[name="project-end-time"]')?.value || '';
  const start = combineProjectDateTime(startDate, startTime) || fallbackProject.start || null;
  const end = combineProjectDateTime(endDate, endTime) || fallbackProject.end || null;
  return { start, end };
}

function getManagedReservationIdForProject(projectId) {
  return getPrimaryProjectReservation(projectId)?.id ?? null;
}

function buildProjectEditPackageEntry(packageId) {
  const normalizedId = normalizePackageId(packageId);
  if (!normalizedId) return null;
  const raw = findPackageById(normalizedId);
  if (!raw) return null;
  const packageItems = normalizeProjectEditPackageItems(resolvePackageItems(raw));
  return {
    id: `package::${normalizedId}`,
    type: 'package',
    packageId: normalizedId,
    package_id: normalizedId,
    package_code: raw?.package_code ?? raw?.code ?? normalizedId,
    barcode: raw?.package_code ?? raw?.code ?? normalizedId,
    desc: getPackageDisplayName(raw) || normalizedId,
    image: resolveItemImage(raw) || packageItems.find((item) => item.image)?.image || null,
    qty: 1,
    unit_price: resolvePackagePrice(raw),
    unit_cost: Number.isFinite(Number(raw?.cost ?? raw?.unit_cost)) ? Number(raw?.cost ?? raw?.unit_cost) : 0,
    packageItems: packageItems.map((item) => ({
      equipmentId: item?.equipmentId ?? item?.equipment_id ?? null,
      barcode: item?.barcode ?? item?.normalizedBarcode ?? '',
      normalizedBarcode: normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode),
      desc: item?.desc ?? item?.description ?? item?.name ?? '',
      qty: 1,
      quantity: 1,
      qtyPerPackage: 1,
      image: item?.image ?? null,
    })),
  };
}

function mapReservationCrewAssignmentsToProjectApi(reservation) {
  const assignments = Array.isArray(reservation?.crewAssignments)
    ? reservation.crewAssignments
    : (Array.isArray(reservation?.techniciansDetails) ? reservation.techniciansDetails : []);

  if (assignments.length) {
    return assignments
      .map((assignment) => {
        if (!assignment || typeof assignment !== 'object') return null;
        const technicianId = assignment.technicianId ?? assignment.technician_id ?? assignment.id ?? null;
        if (!technicianId) return null;
        return normalizeProjectEditCrewAssignment({
          ...assignment,
          technicianId,
          positionName: assignment.positionName
            ?? assignment.position_name
            ?? assignment.positionLabel
            ?? assignment.position_label
            ?? assignment.role
            ?? null,
        });
      })
      .filter(Boolean);
  }

  return Array.isArray(reservation?.technicians)
    ? reservation.technicians
        .map((technician) => {
          const technicianId = technician?.technicianId ?? technician?.technician_id ?? technician?.id ?? technician;
          return technicianId ? normalizeProjectEditCrewAssignment({ technicianId }) : null;
        })
        .filter(Boolean)
    : [];
}

// ── startProjectEdit ──────────────────────────────────────────────────────────

export function startProjectEdit(project) {
  if (!project || !dom.detailsBody) return;

  const resolved = state.projects.find((entry) => String(entry.id) === String(project.id));
  if (!resolved) return;

  const customer = state.customers.find((entry) => String(entry.id) === String(resolved.clientId));
  const clientName = customer?.customerName
    || customer?.fullName
    || customer?.full_name
    || customer?.customer_name
    || customer?.name
    || resolved.clientName
    || resolved.client_name
    || resolved.customerName
    || resolved.customer_name
    || '';
  const clientCompany = resolved.clientCompany || customer?.companyName || customer?.company || '';

  const normalizedExpenses = Array.isArray(resolved.expenses)
    ? resolved.expenses.map((expense, index) => ({
        id: expense?.id || `expense-${resolved.id}-${index}-${Date.now()}`,
        label: expense?.label || '',
        amount: Number(expense?.amount) || 0,
        salePrice: Number.isFinite(Number(expense?.sale_price ?? expense?.salePrice))
          ? Number(expense?.sale_price ?? expense?.salePrice)
          : 0,
        days: resolveProjectServiceDays(expense?.service_days ?? expense?.days),
        note: expense?.note != null
          ? String(expense.note)
          : (expense?.notes != null ? String(expense.notes) : '')
      }))
    : [];

  let normalizedPayments = Array.isArray(resolved.paymentHistory)
    ? resolved.paymentHistory.map((entry, index) => ({
        type: entry?.type === 'percent' ? 'percent' : 'amount',
        amount: Number.isFinite(Number(entry?.amount)) ? Number(entry.amount) : null,
        percentage: Number.isFinite(Number(entry?.percentage)) ? Number(entry.percentage) : null,
        value: Number.isFinite(Number(entry?.value)) ? Number(entry.value) : null,
        note: entry?.note ?? null,
        recordedAt: entry?.recordedAt ?? entry?.recorded_at ?? new Date().toISOString(),
        key: `payment-${resolved.id}-${index}`,
      }))
    : [];

  let historyPaidAmount = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0);
  let historyPaidPercent = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.percentage) || 0), 0);

  let basePaidAmount = Number.isFinite(Number(resolved.paidAmount)) ? Number(resolved.paidAmount) : 0;
  let basePaidPercent = Number.isFinite(Number(resolved.paidPercent)) ? Number(resolved.paidPercent) : 0;

  if (!normalizedPayments.length && (basePaidAmount > 0 || basePaidPercent > 0)) {
    const fallbackRecordedAt = resolved.updatedAt
      ?? resolved.createdAt
      ?? new Date().toISOString();

    if (basePaidPercent > 0) {
      normalizedPayments = [
        {
          type: 'percent',
          amount: Number.isFinite(basePaidAmount) && basePaidAmount > 0 ? basePaidAmount : null,
          percentage: basePaidPercent,
          value: basePaidPercent,
          note: null,
          recordedAt: fallbackRecordedAt,
          key: `legacy-payment-${resolved.id}-percent`
        }
      ];
    } else if (basePaidAmount > 0) {
      normalizedPayments = [
        {
          type: 'amount',
          amount: basePaidAmount,
          percentage: null,
          value: basePaidAmount,
          note: null,
          recordedAt: fallbackRecordedAt,
          key: `legacy-payment-${resolved.id}-amount`
        }
      ];
    }

    historyPaidAmount = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0);
    historyPaidPercent = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.percentage) || 0), 0);
    basePaidAmount = 0;
    basePaidPercent = 0;
  }

  if (historyPaidAmount > 0 && Math.abs(basePaidAmount - historyPaidAmount) < 0.01) {
    basePaidAmount = 0;
  }
  if (historyPaidPercent > 0 && Math.abs(basePaidPercent - historyPaidPercent) < 0.01) {
    basePaidPercent = 0;
  }

  const managedReservation = getPrimaryProjectReservation(resolved.id);
  const editState = {
    clientName,
    clientCompany,
    expenses: normalizedExpenses,
    payments: normalizedPayments,
    basePaidAmount,
    basePaidPercent,
    operationalEquipment: mapReservationEquipmentToProjectApi(managedReservation),
    operationalCrewAssignments: mapReservationCrewAssignmentsToProjectApi(managedReservation)
  };

  dom.detailsBody.dataset.mode = 'edit';
  dom.detailsBody.innerHTML = buildProjectEditForm(resolved, editState);
  initEnhancedSelects(dom.detailsBody);
  bindProjectEditForm(resolved, editState);
}

// ── bindProjectEditForm ───────────────────────────────────────────────────────

function bindProjectEditForm(project, editState = { expenses: [] }) {
  const form = dom.detailsBody?.querySelector('#project-details-edit-form');
  if (!form) return;

  const cancelBtn = form.querySelector('[data-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      _openProjectDetails?.(project.id);
    });
  }

  const expenseLabelInput = form.querySelector('#project-edit-expense-label');
  const expenseAmountInput = form.querySelector('#project-edit-expense-amount');
  const expenseSaleInput = form.querySelector('#project-edit-expense-sale');
  const expenseDaysInput = form.querySelector('#project-edit-expense-days');
  const expenseNoteInput = form.querySelector('#project-edit-expense-note');
  const addExpenseBtn = form.querySelector('[data-action="add-expense"]');
  const expensesContainer = form.querySelector('#project-edit-expense-list');
  const startDateInput = form.querySelector('[name="project-start-date"]');
  const startTimeInput = form.querySelector('[name="project-start-time"]');
  const endDateInput = form.querySelector('[name="project-end-date"]');
  const endTimeInput = form.querySelector('[name="project-end-time"]');
  const paymentStatusSelect = form.querySelector('[name="project-payment-status"]');
  const taxCheckbox = form.querySelector('#project-edit-tax');
  const shareCheckbox = form.querySelector('#project-edit-company-share');
  const discountInput = form.querySelector('#project-edit-discount');
  const discountTypeSelect = form.querySelector('#project-edit-discount-type');
  const paymentProgressTypeSelect = form.querySelector('#project-edit-payment-progress-type');
  const paymentProgressValueInput = form.querySelector('#project-edit-payment-progress-value');
  const paymentAddButton = form.querySelector('#project-edit-payment-add');
  const paymentHistoryContainer = form.querySelector('#project-edit-payment-history');
  const paymentSummaryContainer = form.querySelector('#project-edit-payment-summary');
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const equipmentContainer = form.querySelector('#project-edit-operational-equipment-body');
  const equipmentPackageSelect = form.querySelector('#project-edit-equipment-package-select');
  const equipmentMethodSelect = form.querySelector('#project-edit-equipment-method-select');
  const equipmentMethodPanels = Array.from(form.querySelectorAll('[data-project-edit-equipment-method]'));
  const equipmentBarcodeInput = form.querySelector('#project-edit-equipment-barcode');
  const equipmentDescriptionInput = form.querySelector('#project-edit-equipment-description');
  const equipmentListSelect = form.querySelector('#project-edit-equipment-list-select');
  const equipmentSuggestions = form.querySelector('#project-edit-equipment-suggestions');
  const crewContainer = form.querySelector('#project-edit-crew-body');
  const addCrewButton = form.querySelector('#project-edit-add-crew');
  const quickPositionButton = form.querySelector('#project-edit-quick-position');
  const quickTechnicianButton = form.querySelector('#project-edit-quick-technician');
  const projectStatusSelect = form.querySelector('#project-edit-status-select');
  const projectStatusCurrent = form.querySelector('#project-edit-status-current');
  const projectStatusHint = form.querySelector('#project-edit-status-hint');
  const projectStatusApplyBtn = form.querySelector('#project-edit-status-apply');
  let currentStatusSelection = getProjectStatusSelectionValue(project);

  let isSyncingShareTax = false;

  const initEditDateTimePickers = () => {
    const fp = (typeof window !== 'undefined' ? window.flatpickr : null)
      || (typeof globalThis !== 'undefined' ? globalThis.flatpickr : null);
    if (!fp) return;

    if (startDateInput) fp(startDateInput, { dateFormat: 'Y-m-d', allowInput: true });
    if (endDateInput) fp(endDateInput, { dateFormat: 'Y-m-d', allowInput: true });

    const timeOpts = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0,
      minuteIncrement: 5,
      disableMobile: true,
      allowInput: true,
      altInputClass: 'flatpickr-alt-input form-control'
    };
    if (startTimeInput) fp(startTimeInput, timeOpts);
    if (endTimeInput) fp(endTimeInput, timeOpts);
  };

  initEditDateTimePickers();

  const attachNumericNormalization = (inputEl) => {
    if (!inputEl || inputEl.dataset.normalizedDigits === 'true') return;
    const handler = () => {
      const prev = inputEl.value || '';
      const normalized = normalizeNumbers(prev);
      if (normalized !== prev) {
        const start = inputEl.selectionStart;
        const end = inputEl.selectionEnd;
        inputEl.value = normalized;
        try {
          if (typeof start === 'number' && typeof end === 'number') {
            const delta = normalized.length - prev.length;
            inputEl.setSelectionRange(Math.max(0, start + delta), Math.max(0, end + delta));
          }
        } catch (_) {}
      }
    };
    inputEl.addEventListener('input', handler);
    inputEl.addEventListener('blur', handler);
    try { inputEl.setAttribute('inputmode', 'numeric'); } catch (_) {}
    inputEl.dataset.normalizedDigits = 'true';
  };

  attachNumericNormalization(startDateInput);
  attachNumericNormalization(startTimeInput);
  attachNumericNormalization(endDateInput);
  attachNumericNormalization(endTimeInput);
  if (startTimeInput && startTimeInput._flatpickr?.altInput) {
    attachNumericNormalization(startTimeInput._flatpickr.altInput);
  }
  if (endTimeInput && endTimeInput._flatpickr?.altInput) {
    attachNumericNormalization(endTimeInput._flatpickr.altInput);
  }

  const ensurePayments = () => {
    if (!Array.isArray(editState.payments)) {
      editState.payments = [];
    }
    return editState.payments;
  };

  const syncOperationalEquipmentMoneyFromInputs = () => {
    if (!equipmentContainer) return false;
    let changed = false;
    equipmentContainer.querySelectorAll('.project-edit-equipment-money[data-project-edit-equipment-index]').forEach((input) => {
      if (!(input instanceof HTMLInputElement)) return;
      const index = Number.parseInt(input.dataset.projectEditEquipmentIndex || '-1', 10);
      const item = editState.operationalEquipment?.[index];
      if (!item) return;
      const field = input.dataset.field === 'unit_cost' ? 'unit_cost' : 'unit_price';
      const value = parseEditMoneyValue(input.value);
      if (item[field] !== value) {
        item[field] = value;
        changed = true;
      }
      if (field === 'unit_price' && item.price !== value) {
        item.price = value;
        changed = true;
      }
      if (field === 'unit_cost' && item.cost !== value) {
        item.cost = value;
        changed = true;
      }
    });
    return changed;
  };

  const computeFinanceContext = () => {
    syncOperationalEquipmentMoneyFromInputs();
    const equipmentEstimate = calculateOperationalEquipmentEstimate(editState.operationalEquipment);
    const { start, end } = getProjectEditDateRangeFromForm(form, project);
    const durationStart = start ? new Date(start) : null;
    const durationEnd = end ? new Date(end) : durationStart;
    const durationDays = durationStart && durationEnd && !Number.isNaN(durationStart.getTime()) && !Number.isNaN(durationEnd.getTime()) && durationEnd >= durationStart
      ? Math.max(1, Math.ceil((durationEnd.getTime() - durationStart.getTime()) / 86400000))
      : 1;
    const crewEstimate = calculateProjectCrewEstimate(editState.operationalCrewAssignments, durationDays);
    const crewCost = calculateProjectCrewCost(editState.operationalCrewAssignments, durationDays);
    const equipmentCost = calculateSelectedEquipmentCost(editState.operationalEquipment, state.equipment || []);
    const expensesTotal = Array.isArray(editState.expenses)
      ? editState.expenses.reduce((sum, expense) => sum + calculateProjectServiceCost(expense), 0)
      : 0;
    const servicesClientPrice = Array.isArray(editState.expenses)
      ? Math.max(0, Math.round(editState.expenses.reduce((s, e) => s + calculateProjectServiceSale(e), 0) * 100) / 100)
      : Math.max(0, Number(project?.servicesClientPrice ?? 0));
    const discountTypeValue = discountTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const discountRaw = normalizeNumbers(discountInput?.value || '0');
    let discountValue = Number.parseFloat(discountRaw);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      discountValue = 0;
    }

    const applyTax = taxCheckbox?.checked === true;
    const companyShareEnabled = shareCheckbox?.checked === true;
    let companySharePercent = companyShareEnabled ? getProjectCompanySharePercent(shareCheckbox) : null;
    if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
      companySharePercent = companyShareEnabled ? DEFAULT_COMPANY_SHARE_PERCENT : null;
    }

    const finance = calculateProjectFinancials({
      equipmentEstimate,
      crewEstimate,
      expensesTotal,
      servicesClientPrice,
      equipmentCost,
      crewCost,
      servicesCost: expensesTotal,
      discountValue,
      discountType: discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
    });

    return {
      equipmentEstimate,
      crewEstimate,
      expensesTotal,
      discountValue,
      discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
      servicesClientPrice,
      finance,
    };
  };

  const computePaymentSnapshot = () => {
    const context = computeFinanceContext();
    const payments = ensurePayments();
    const projectTaxableBase = Number(context.finance?.taxableAmount || 0);
    const combinedTax = Number(context.finance?.taxAmount || 0);
    const combinedTotalWithTax = Number(context.finance?.totalWithTax || 0);

    const progress = calculatePaymentProgress({
      totalAmount: combinedTotalWithTax,
      paidAmount: editState.basePaidAmount || 0,
      paidPercent: editState.basePaidPercent || 0,
      history: payments,
    });

    try {
      const url = new URL(window.location.href);
      const v = (url.searchParams.get('paymentDebug') || '').toLowerCase();
      if (v === '1' || v === 'true' || v === 'yes') {
        // eslint-disable-next-line no-console
          console.debug('[PaymentDebug][modal]', {
            projectId: project?.id,
            projectTaxableBase,
            linkedReservations: getReservationsForProject(project.id)?.length || 0,
            combinedTax,
            combinedTotalWithTax,
            paidAmount: progress.paidAmount,
          paidPercent: progress.paidPercent,
        });
      }
    } catch (_) {}

    return {
      ...context,
      combinedTotalWithTax,
      payments,
      progress,
    };
  };

  const renderPaymentHistory = () => {
    if (!paymentHistoryContainer) return;
    const { combinedTotalWithTax } = computePaymentSnapshot();
    paymentHistoryContainer.innerHTML = buildProjectEditPaymentHistoryMarkup(ensurePayments(), { total: combinedTotalWithTax });
  };

  const renderPaymentSummary = () => {
    if (!paymentSummaryContainer) return;
    const { combinedTotalWithTax, progress } = computePaymentSnapshot();
    const total = Number.isFinite(Number(combinedTotalWithTax)) ? Number(combinedTotalWithTax) : 0;
    const paidAmount = Number.isFinite(Number(progress.paidAmount)) ? Number(progress.paidAmount) : 0;
    const paidPercent = Number.isFinite(Number(progress.paidPercent)) ? Number(progress.paidPercent) : 0;
    const remainingAmount = Math.max(0, Math.round((total - paidAmount) * 100) / 100);

    const summaryRows = [
      { tone: 'total', label: t('projects.form.paymentSummary.total', 'الإجمالي الكلي'), value: formatCurrency(total) },
      { tone: 'paid', label: t('projects.form.paymentSummary.paidAmount', 'إجمالي المدفوع'), value: formatCurrency(paidAmount) },
      { tone: 'percent', label: t('projects.form.paymentSummary.paidPercent', 'نسبة الدفعات'), value: `${normalizeNumbers(paidPercent.toFixed(2))}%` },
      { tone: 'remaining', label: t('projects.form.paymentSummary.remaining', 'المتبقي'), value: formatCurrency(remainingAmount) },
    ];

    paymentSummaryContainer.innerHTML = summaryRows
      .map(({ tone, label, value }) => `
        <div class="project-details-grid-item project-details-grid-item--${escapeHtml(tone)}">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `)
      .join('');
  };

  const syncPaymentStatusValue = (trigger = 'auto') => {
    if (!paymentStatusSelect) return;
    const manualSelected = paymentStatusSelect.dataset?.userSelected === 'true';
    if (trigger === 'auto' && manualSelected) {
      return;
    }

    const { finance, progress } = computePaymentSnapshot();
    const resolvedStatus = determinePaymentStatus({
      manualStatus: manualSelected ? paymentStatusSelect.value : project.paymentStatus || 'unpaid',
      paidAmount: progress.paidAmount,
      paidPercent: progress.paidPercent,
      totalAmount: finance.totalWithTax,
    });

    if (!manualSelected) {
      paymentStatusSelect.value = resolvedStatus;
    }
  };

  const refreshPaymentUi = () => {
    renderPaymentHistory();
    renderPaymentSummary();
    syncPaymentStatusValue('auto');
  };

  const PAYMENT_TOLERANCE = 0.0001;

  const addPaymentEntry = () => {
    const type = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const rawValue = normalizeNumbers(paymentProgressValueInput?.value || '').replace('%', '').trim();
    let value = Number.parseFloat(rawValue);

    if (!Number.isFinite(value) || value <= 0) {
      showToast(t('projects.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
      paymentProgressValueInput?.focus();
      return;
    }

    const snapshot = computePaymentSnapshot();
    const totalAmount = Number.isFinite(Number(snapshot.finance.totalWithTax)) ? Number(snapshot.finance.totalWithTax) : 0;

    if (totalAmount <= 0) {
      showToast(t('projects.toast.paymentTotalMissing', '⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة'));
      return;
    }

    const alreadyPaidAmount = Number(snapshot.progress.paidAmount) || 0;
    const alreadyPaidPercent = Number(snapshot.progress.paidPercent) || 0;

    let amount = null;
    let percentage = null;

    if (type === 'percent') {
      const remainingPercent = Math.max(0, 100 - alreadyPaidPercent);
      if (remainingPercent <= PAYMENT_TOLERANCE) {
        showToast(t('projects.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة'));
        return;
      }
      if (value > remainingPercent) {
        value = remainingPercent;
        const adjustedPercent = normalizeNumbers(value.toFixed(2));
        showToast(t('projects.toast.paymentCappedPercent', 'ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%').replace('{value}', adjustedPercent));
      }
      percentage = Math.round(value * 100) / 100;
      if (totalAmount > 0) {
        amount = Math.round(((percentage / 100) * totalAmount) * 100) / 100;
      }
    } else {
      const remainingAmount = Math.max(0, totalAmount - alreadyPaidAmount);
      if (remainingAmount <= PAYMENT_TOLERANCE) {
        showToast(t('projects.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة'));
        return;
      }
      if (value > remainingAmount) {
        value = remainingAmount;
        const adjustedAmount = `${normalizeNumbers(value.toFixed(2))} ${currencyLabel}`;
        showToast(t('projects.toast.paymentCappedAmount', 'ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي').replace('{amount}', adjustedAmount));
      }
      amount = Math.round(value * 100) / 100;
      if (totalAmount > 0) {
        percentage = Math.round(((amount / totalAmount) * 100) * 100) / 100;
      }
    }

    editState.payments = [...ensurePayments(), {
      type,
      amount: amount != null ? amount : null,
      percentage: percentage != null ? percentage : null,
      value: type === 'amount' ? amount : percentage,
      note: null,
      recordedAt: new Date().toISOString(),
    }];

    if (paymentProgressValueInput) paymentProgressValueInput.value = '';
    if (paymentProgressTypeSelect) paymentProgressTypeSelect.value = 'percent';

    refreshPaymentUi();
    showToast(t('projects.toast.paymentAdded', '✅ تم تسجيل الدفعة'));
  };

  const syncShareAndTax = (source) => {
    if (!taxCheckbox || !shareCheckbox) return;
    if (isSyncingShareTax) return;
    isSyncingShareTax = true;

    if (source === 'share') {
      if (shareCheckbox.checked) {
        if (!taxCheckbox.checked) taxCheckbox.checked = true;
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else {
        if (taxCheckbox.checked) taxCheckbox.checked = false;
      }
    } else if (source === 'tax') {
      if (taxCheckbox.checked) {
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
    }

    isSyncingShareTax = false;
  };

  function renderExpenses() {
    if (!expensesContainer) return;
    expensesContainer.innerHTML = buildProjectEditExpensesMarkup(editState.expenses);
  }

  function populateEquipmentPackageSelect() {
    if (!equipmentPackageSelect) return;
    const snapshot = buildPackageOptionsSnapshot();
    const options = snapshot.map((entry) => {
      const price = Number.isFinite(Number(entry.price)) ? Number(entry.price) : 0;
      const label = `${entry.name} — ${normalizeNumbers(price.toFixed(2))} ${currencyLabel}`;
      return `<option value="${escapeHtml(entry.id)}">${escapeHtml(label)}</option>`;
    }).join('');
    equipmentPackageSelect.innerHTML = `<option value="">${escapeHtml(t('reservations.create.packages.placeholder', 'اختر الحزمة'))}</option>${options}`;
    equipmentPackageSelect.disabled = snapshot.length === 0;
  }

  function populateEquipmentListSelect() {
    if (!equipmentListSelect) return;
    const selected = getProjectEditSelectedBarcodeSet(editState.operationalEquipment);
    const options = (state.equipment || [])
      .filter((item) => normalizeBarcodeValue(item?.barcode))
      .filter((item) => !selected.has(normalizeBarcodeValue(item?.barcode)))
      .sort((a, b) => getEditEquipmentLabel(a).localeCompare(getEditEquipmentLabel(b), 'ar', { sensitivity: 'base' }))
      .map((item) => {
        const barcode = normalizeBarcodeValue(item?.barcode);
        const label = buildProjectEditEquipmentSearchValue(item);
        return `<option value="${escapeHtml(barcode)}">${escapeHtml(label)}</option>`;
      })
      .join('');
    equipmentListSelect.innerHTML = `<option value="">${escapeHtml(t('projects.form.operationalBooking.equipmentListPlaceholder', 'اختر من قائمة المعدات'))}</option>${options}`;
  }

  function applyProjectEditEquipmentMethod(method = 'barcode') {
    const normalized = ['barcode', 'autocomplete', 'list'].includes(method) ? method : 'barcode';
    if (equipmentMethodSelect && equipmentMethodSelect.value !== normalized) {
      equipmentMethodSelect.value = normalized;
    }
    equipmentMethodPanels.forEach((panel) => {
      const active = panel.dataset.projectEditEquipmentMethod === normalized;
      panel.hidden = !active;
      panel.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    if (normalized !== 'autocomplete') closeEditEquipmentSuggestions();
  }

  function getEditEquipmentSuggestions(query) {
    const normalizedQuery = normalizeProjectEditSearchValue(query);
    if (!normalizedQuery) return [];
    const selected = getProjectEditSelectedBarcodeSet(editState.operationalEquipment);
    return (state.equipment || [])
      .map((item) => ({
        item,
        value: buildProjectEditEquipmentSearchValue(item),
        barcode: normalizeBarcodeValue(item?.barcode),
      }))
      .filter((entry) => entry.value && !selected.has(entry.barcode))
      .filter((entry) => normalizeProjectEditSearchValue(entry.value).includes(normalizedQuery))
      .slice(0, 12);
  }

  function closeEditEquipmentSuggestions() {
    if (!equipmentSuggestions) return;
    equipmentSuggestions.hidden = true;
    equipmentSuggestions.innerHTML = '';
  }

  function renderEditEquipmentSuggestions(query) {
    if (!equipmentSuggestions) return;
    const suggestions = getEditEquipmentSuggestions(query);
    if (!suggestions.length) {
      closeEditEquipmentSuggestions();
      return;
    }
    equipmentSuggestions.innerHTML = suggestions.map((entry, index) => `
      <button type="button" class="reservation-equipment-suggestion" data-index="${index}" role="option">
        ${escapeHtml(entry.value)}
      </button>
    `).join('');
    equipmentSuggestions.hidden = false;
  }

  function addProjectEditEquipmentRecord(item) {
    const payload = buildProjectEditEquipmentEntry(item);
    if (!payload) {
      showToast(t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'));
      return false;
    }
    const { start, end } = getProjectEditDateRangeFromForm(form, project);
    if (!start || !end) {
      showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
      return false;
    }
    if (getProjectEditSelectedBarcodeSet(editState.operationalEquipment).has(payload.barcode)) {
      showToast(t('reservations.toast.equipmentDuplicate', '⚠️ هذه المعدة موجودة بالفعل في الحجز'));
      return false;
    }
    const ignoreReservationId = getManagedReservationIdForProject(project.id);
    if (getProjectEditEquipmentAvailableQuantity(payload, form, project, ignoreReservationId) < 1) {
      showToast(t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية'), 'warning', 6000);
      return false;
    }
    editState.operationalEquipment = [...(editState.operationalEquipment || []), payload];
    refreshOperationalEquipmentUi();
    showToast(t('reservations.toast.equipmentAdded', '✅ تم إضافة المعدة بنجاح'));
    return true;
  }

  function addProjectEditEquipmentByBarcode(rawCode) {
    const item = findProjectEditEquipmentByBarcode(rawCode);
    if (!item) {
      showToast(t('reservations.toast.barcodeNotFound', '❌ الباركود غير موجود'));
      return false;
    }
    return addProjectEditEquipmentRecord(item);
  }

  function addProjectEditEquipmentByDescription() {
    const item = findProjectEditEquipmentByDescription(equipmentDescriptionInput?.value || '');
    if (!item) {
      showToast(t('reservations.toast.equipmentNameNotFound', '❌ لم يتم العثور على معدة بالاسم المدخل'));
      return false;
    }
    return addProjectEditEquipmentRecord(item);
  }

  function addProjectEditPackageRecord(packageId) {
    const nextPackage = buildProjectEditPackageEntry(packageId);
    if (!nextPackage) {
      showToast(t('reservations.toast.packageNotFound', '⚠️ تعذر العثور على بيانات الحزمة المحددة'));
      return false;
    }
    const normalizedId = normalizePackageId(nextPackage.packageId);
    if ((editState.operationalEquipment || []).some((item) => item?.type === 'package' && normalizePackageId(item.packageId) === normalizedId)) {
      showToast(t('reservations.toast.packageDuplicate', '⚠️ هذه الحزمة مضافة بالفعل إلى الحجز'));
      return false;
    }
    const { start, end } = getProjectEditDateRangeFromForm(form, project);
    const ignoreReservationId = getManagedReservationIdForProject(project.id);
    if (!start || !end) {
      showToast(t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'));
      return false;
    }
    if (hasPackageConflict(normalizedId, start, end, ignoreReservationId)) {
      showToast(
        t('reservations.toast.packageTimeConflict', '⚠️ الحزمة {name} محجوزة بالفعل في الفترة المختارة')
          .replace('{name}', nextPackage.desc || t('reservations.create.packages.genericName', 'الحزمة')),
        'warning',
        6000
      );
      return false;
    }
    const conflicted = (nextPackage.packageItems || []).find((item) => {
      const barcode = normalizeBarcodeValue(item?.normalizedBarcode ?? item?.barcode);
      return barcode && getProjectEditEquipmentAvailableQuantity({ ...item, barcode }, form, project, ignoreReservationId) < 1;
    });
    if (conflicted) {
      showToast(t('reservations.toast.packageItemsConflict', '⚠️ لا يمكن إضافة {name} لأن بعض عناصرها غير متاحة:')
        .replace('{name}', nextPackage.desc || t('reservations.create.packages.genericName', 'الحزمة'))
        + `\n• ${conflicted.desc || conflicted.barcode || ''}`, 'warning', 6000);
      return false;
    }
    editState.operationalEquipment = [...(editState.operationalEquipment || []), nextPackage];
    refreshOperationalEquipmentUi();
    return true;
  }

  function renderOperationalEquipment() {
    if (!equipmentContainer) return;
    const items = Array.isArray(editState.operationalEquipment) ? editState.operationalEquipment : [];
    if (!items.length) {
      equipmentContainer.innerHTML = `<tr><td colspan="7" class="text-center">${escapeHtml(t('projects.form.operationalBooking.equipmentEmpty', 'لم تتم إضافة معدات بعد.'))}</td></tr>`;
      return;
    }

    equipmentContainer.innerHTML = items.map((item, index) => {
      const isPackage = item?.type === 'package';
      const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10);
      const safeQty = Number.isInteger(qty) && qty > 0 ? qty : 1;
      const price = parseEditMoneyValue(item?.unit_price ?? item?.unitPrice ?? item?.price);
      const cost = parseEditMoneyValue(item?.unit_cost ?? item?.unitCost ?? item?.cost);
      const total = safeQty * price;
      const packageMeta = isPackage && Array.isArray(item.packageItems)
        ? `<details class="reservation-package-items project-package-items">
            <summary>${escapeHtml(t('reservations.create.packages.itemsSummary', 'عرض محتويات الحزمة'))}</summary>
            <ul class="reservation-package-items__list">
              ${item.packageItems.map((pkgItem) => `<li>${escapeHtml(pkgItem?.desc || pkgItem?.barcode || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم'))} × ${escapeHtml(normalizeNumbers(String(pkgItem?.qtyPerPackage ?? pkgItem?.qty ?? 1)))}</li>`).join('')}
            </ul>
          </details>`
        : '';

      return `
        <tr data-project-edit-equipment-index="${index}">
          <td>
            <div class="project-equipment-selected-photo">
              ${getEditEquipmentImage(item)
                ? `<img src="${escapeHtml(getEditEquipmentImage(item))}" alt="${escapeHtml(getEditEquipmentLabel(item))}" loading="lazy">`
                : `<span aria-hidden="true">${isPackage ? '📦' : '▣'}</span>`}
            </div>
          </td>
          <td>
            <div class="project-equipment-selected-item">
              <strong>${escapeHtml(item.desc || getEditEquipmentLabel(item))}</strong>
              <span>${escapeHtml(normalizeNumbers(String(item.barcode || item.package_code || getEditEquipmentBarcode(item))))}</span>
              ${packageMeta}
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control project-equipment-quantity-control">
              <button type="button" class="reservation-qty-btn project-edit-equipment-qty" data-action="decrease" data-project-edit-equipment-index="${index}" ${isPackage ? 'disabled' : ''}>−</button>
              <span class="reservation-qty-value">${escapeHtml(normalizeNumbers(String(safeQty)))}</span>
              <button type="button" class="reservation-qty-btn project-edit-equipment-qty" data-action="increase" data-project-edit-equipment-index="${index}" ${isPackage ? 'disabled' : ''}>+</button>
            </div>
          </td>
          <td><input type="number" class="form-control form-control-sm project-edit-equipment-money" data-field="unit_price" data-project-edit-equipment-index="${index}" min="0" step="0.01" value="${escapeHtml(normalizeNumbers(String(price)))}"></td>
          <td><input type="number" class="form-control form-control-sm project-edit-equipment-money" data-field="unit_cost" data-project-edit-equipment-index="${index}" min="0" step="0.01" value="${escapeHtml(normalizeNumbers(String(cost)))}"></td>
          <td>${escapeHtml(formatCurrency(total))}</td>
          <td><button type="button" class="reservation-remove-button project-edit-equipment-remove" data-project-edit-equipment-index="${index}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">🗑️</button></td>
        </tr>
      `;
    }).join('');
  }

  function refreshOperationalEquipmentUi() {
    renderOperationalEquipment();
    populateEquipmentListSelect();
    renderPaymentSummary();
    syncPaymentStatusValue('auto');
  }

  function populateProjectEditPositionOptions(selectedValue = '') {
    const positions = getTechnicianPositionsCache();
    const options = positions.map((position) => {
      const value = position.id ? `id:${position.id}` : `name:${position.name}`;
      const selected = String(selectedValue || '') === String(value) || String(selectedValue || '') === String(position.id) ? 'selected' : '';
      return `<option value="${escapeHtml(value)}" ${selected}>${escapeHtml(getProjectEditPositionLabel(position))}</option>`;
    }).join('');
    return `<option value="">${escapeHtml(t('technicians.picker.noAssignments', 'اختر المنصب'))}</option>${options}`;
  }

  function populateProjectEditTechnicianOptions(selectedValue = '', currentIndex = -1) {
    const { start, end } = getProjectEditDateRangeFromForm(form, project);
    const ignoreReservationId = getManagedReservationIdForProject(project.id);
    const hasInterval = Boolean(start && end);
    const takenNote = t('technicians.picker.optionAssigned', '(مستخدم)');
    const conflictNote = t('technicians.picker.optionConflicting', '(متعارض)');
    const options = (state.technicians || []).map((technician) => {
      const id = technician?.id ?? technician?.technicianId ?? technician?.technician_id ?? '';
      if (!id) return '';
      const selected = String(selectedValue || '') === String(id) ? 'selected' : '';
      const taken = isProjectEditTechnicianAssigned(editState.operationalCrewAssignments, id, currentIndex);
      const conflict = hasInterval ? hasTechnicianConflict(id, start, end, ignoreReservationId) : false;
      const disabled = (taken || conflict) && !selected ? 'disabled' : '';
      const note = conflict ? conflictNote : (taken ? takenNote : '');
      const label = note
        ? `${getProjectEditTechnicianLabel(technician)} ${note}`
        : getProjectEditTechnicianLabel(technician);
      return `
        <option
          value="${escapeHtml(String(id))}"
          ${selected}
          ${disabled}
          data-conflict="${conflict ? 'true' : 'false'}"
          data-taken="${taken ? 'true' : 'false'}"
        >${escapeHtml(normalizeNumbers(label))}</option>
      `;
    }).join('');
    return `<option value="">${escapeHtml(t('technicians.picker.noTechnicianOption', '— بدون تعيين —'))}</option>${options}`;
  }

  function renderProjectEditCrew() {
    if (!crewContainer) return;
    const assignments = Array.isArray(editState.operationalCrewAssignments) ? editState.operationalCrewAssignments : [];
    if (!assignments.length) {
      crewContainer.innerHTML = `<tr><td colspan="5" class="text-center">${escapeHtml(t('technicians.picker.noAssignments', 'لم يتم إضافة أي مناصب بعد'))}</td></tr>`;
      return;
    }
    crewContainer.innerHTML = assignments.map((assignment, index) => {
      const positionSelected = assignment.positionId
        ? `id:${assignment.positionId}`
        : (assignment.positionKey ? `name:${assignment.positionKey}` : '');
      return `
        <tr data-project-edit-crew-index="${index}">
          <td>
            <select class="ui-select form-select project-edit-crew-position" data-project-edit-crew-index="${index}">
              ${populateProjectEditPositionOptions(positionSelected)}
            </select>
          </td>
          <td>
            <select class="ui-select form-select project-edit-crew-technician" data-project-edit-crew-index="${index}">
              ${populateProjectEditTechnicianOptions(assignment.technicianId, index)}
            </select>
          </td>
          <td><input type="number" class="form-control form-control-sm project-edit-crew-money" data-field="positionClientPrice" data-project-edit-crew-index="${index}" min="0" step="0.01" value="${escapeHtml(normalizeNumbers(String(assignment.positionClientPrice || 0)))}"></td>
          <td><input type="number" class="form-control form-control-sm project-edit-crew-money" data-field="positionCost" data-project-edit-crew-index="${index}" min="0" step="0.01" value="${escapeHtml(normalizeNumbers(String(assignment.positionCost || 0)))}"></td>
          <td><button type="button" class="reservation-remove-button project-edit-crew-remove" data-project-edit-crew-index="${index}" aria-label="${escapeHtml(t('actions.remove', 'إزالة'))}">🗑️</button></td>
        </tr>
      `;
    }).join('');
  }

  function refreshProjectEditCrewUi() {
    renderProjectEditCrew();
    renderPaymentSummary();
    syncPaymentStatusValue('auto');
  }

  renderExpenses();
  populateEquipmentPackageSelect();
  populateEquipmentListSelect();
  applyProjectEditEquipmentMethod(equipmentMethodSelect?.value || 'barcode');
  renderOperationalEquipment();
  ensureTechnicianPositionsLoaded()
    .then(() => refreshProjectEditCrewUi())
    .catch(() => refreshProjectEditCrewUi());
  renderProjectEditCrew();
  refreshPaymentUi();

  const refreshSharedViews = () => {
    state.projects = getProjectsState();
    state.reservations = getReservationsState();
    renderProjects();
    renderFocusCards();
    updateSummary();
  };

  const syncStatusSectionUi = () => {
    if (!projectStatusSelect) return;
    const selectedStatusValue = projectStatusSelect.value || currentStatusSelection;
    const currentMeta = getProjectStatusMeta(currentStatusSelection);
    const selectedMeta = getProjectStatusMeta(selectedStatusValue);

    if (projectStatusCurrent) {
      projectStatusCurrent.className = `reservation-chip status-chip ${currentMeta.chipClass}`;
      projectStatusCurrent.textContent = currentMeta.label;
    }

    if (projectStatusHint) {
      projectStatusHint.textContent = selectedMeta.hint;
    }

    if (projectStatusApplyBtn) {
      projectStatusApplyBtn.disabled = selectedStatusValue === currentStatusSelection
        || form.dataset.applyingStatus === 'true'
        || form.dataset.submitting === 'true';
    }
  };

  const applyStatusSideEffects = async (identifier, nextStatusValue, statusPatch, paymentStatusValue) => {
    if (nextStatusValue === 'cancelled') {
      await updateLinkedReservationsCancelled(identifier);
      return;
    }

    if (currentStatusSelection === 'cancelled' && nextStatusValue !== 'cancelled') {
      await updateLinkedReservationsReopenFromCancelled(identifier, {
        status: statusPatch.status,
        confirmed: statusPatch.confirmed,
      });
    }

    await handleProjectReservationSync(identifier, paymentStatusValue);
  };

  const applyProjectStatusSelection = async () => {
    if (!projectStatusSelect) return;

    const nextStatusValue = projectStatusSelect.value || currentStatusSelection;
    if (nextStatusValue === currentStatusSelection || form.dataset.applyingStatus === 'true') {
      syncStatusSectionUi();
      return;
    }

    form.dataset.applyingStatus = 'true';
    syncStatusSectionUi();

    try {
      const statusPatch = buildProjectStatusPatch(project, nextStatusValue, project.start, project.end);
      const updated = await updateProjectApi(project.projectId ?? project.id, statusPatch);
      const identifier = updated?.projectId ?? updated?.id ?? project.id;

      await applyStatusSideEffects(
        identifier,
        nextStatusValue,
        statusPatch,
        String(project.paymentStatus || 'unpaid').toLowerCase()
      );
      await syncLinkedReservationsWithProject(updated);

      const freshProject = getProjectsState().find((entry) => String(entry.id) === String(identifier)) || updated;
      Object.assign(project, freshProject);
      currentStatusSelection = getProjectStatusSelectionValue(freshProject);
      projectStatusSelect.value = currentStatusSelection;

      refreshSharedViews();
      syncStatusSectionUi();
      showToast(t('projects.toast.statusUpdated', '✅ تم تحديث حالة المشروع'));
    } catch (statusError) {
      console.error('❌ [projects/projectDetails/edit.js] Failed to update project status', statusError);
      const message = isProjectApiError(statusError)
        ? statusError.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
      projectStatusSelect.value = currentStatusSelection;
      syncStatusSectionUi();
    } finally {
      delete form.dataset.applyingStatus;
      syncStatusSectionUi();
    }
  };

  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  if (expenseSaleInput && !expenseSaleInput.dataset.listenerAttached) {
    expenseSaleInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    expenseSaleInput.dataset.listenerAttached = 'true';
  }

  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', () => {
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  if (paymentStatusSelect && !paymentStatusSelect.dataset.listenerAttached) {
    paymentStatusSelect.addEventListener('change', () => {
      paymentStatusSelect.dataset.userSelected = 'true';
    });
    paymentStatusSelect.dataset.listenerAttached = 'true';
  }

  if (equipmentPackageSelect && !equipmentPackageSelect.dataset.listenerAttached) {
    equipmentPackageSelect.addEventListener('change', () => {
      const selectedValue = equipmentPackageSelect.value || '';
      if (!selectedValue) return;
      addProjectEditPackageRecord(selectedValue);
      equipmentPackageSelect.value = '';
    });
    equipmentPackageSelect.dataset.listenerAttached = 'true';
  }

  const equipmentPickerButton = form.querySelector('#open-project-edit-equipment-picker');
  if (equipmentPickerButton && !equipmentPickerButton.dataset.listenerAttached) {
    equipmentPickerButton.addEventListener('click', (event) => {
      event.preventDefault();
      openEquipmentPicker({
        source: 'project-edit',
        label: t('equipmentPicker.context.projectEdit', 'اختيار معدات وحزم لتعديل المشروع'),
        onAddEquipment: ({ barcodes = [], quantity = 1 } = {}) => {
          const limit = Math.min(Number.isInteger(quantity) && quantity > 0 ? quantity : 1, barcodes.length);
          for (let index = 0; index < limit; index += 1) {
            addProjectEditEquipmentByBarcode(barcodes[index]);
          }
        },
        onAddPackage: (packageId) => addProjectEditPackageRecord(packageId),
      });
    });
    equipmentPickerButton.dataset.listenerAttached = 'true';
  }

  if (equipmentMethodSelect && !equipmentMethodSelect.dataset.listenerAttached) {
    equipmentMethodSelect.addEventListener('change', (event) => {
      applyProjectEditEquipmentMethod(event.target.value);
    });
    equipmentMethodSelect.dataset.listenerAttached = 'true';
  }

  if (equipmentBarcodeInput && !equipmentBarcodeInput.dataset.listenerAttached) {
    let autoAddTimer = null;
    const triggerBarcodeAdd = () => {
      const raw = equipmentBarcodeInput.value || '';
      if (!raw.trim()) return;
      window.clearTimeout(autoAddTimer);
      autoAddTimer = null;
      if (addProjectEditEquipmentByBarcode(raw)) {
        equipmentBarcodeInput.value = '';
      }
    };
    equipmentBarcodeInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      triggerBarcodeAdd();
    });
    equipmentBarcodeInput.addEventListener('input', () => {
      window.clearTimeout(autoAddTimer);
      if (!equipmentBarcodeInput.value.trim()) return;
      autoAddTimer = window.setTimeout(triggerBarcodeAdd, 180);
    });
    equipmentBarcodeInput.addEventListener('change', triggerBarcodeAdd);
    equipmentBarcodeInput.dataset.listenerAttached = 'true';
  }

  if (equipmentDescriptionInput && !equipmentDescriptionInput.dataset.listenerAttached) {
    equipmentDescriptionInput.addEventListener('input', () => renderEditEquipmentSuggestions(equipmentDescriptionInput.value));
    equipmentDescriptionInput.addEventListener('focus', () => renderEditEquipmentSuggestions(equipmentDescriptionInput.value));
    equipmentDescriptionInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      if (addProjectEditEquipmentByDescription()) {
        equipmentDescriptionInput.value = '';
      }
      closeEditEquipmentSuggestions();
    });
    equipmentDescriptionInput.addEventListener('blur', () => {
      window.setTimeout(closeEditEquipmentSuggestions, 120);
    });
    equipmentDescriptionInput.dataset.listenerAttached = 'true';
  }

  if (equipmentSuggestions && !equipmentSuggestions.dataset.listenerAttached) {
    equipmentSuggestions.addEventListener('pointerdown', (event) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest('.reservation-equipment-suggestion');
      if (!button) return;
      event.preventDefault();
      const suggestions = getEditEquipmentSuggestions(equipmentDescriptionInput?.value || '');
      const entry = suggestions[Number.parseInt(button.dataset.index || '-1', 10)];
      if (!entry) return;
      if (addProjectEditEquipmentRecord(entry.item) && equipmentDescriptionInput) {
        equipmentDescriptionInput.value = '';
      }
      closeEditEquipmentSuggestions();
    });
    equipmentSuggestions.dataset.listenerAttached = 'true';
  }

  if (equipmentListSelect && !equipmentListSelect.dataset.listenerAttached) {
    equipmentListSelect.addEventListener('change', () => {
      if (!equipmentListSelect.value) return;
      const item = findProjectEditEquipmentByBarcode(equipmentListSelect.value);
      if (item) addProjectEditEquipmentRecord(item);
      equipmentListSelect.value = '';
    });
    equipmentListSelect.dataset.listenerAttached = 'true';
  }

  if (equipmentContainer && !equipmentContainer.dataset.listenerAttached) {
    equipmentContainer.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      const qtyButton = event.target.closest('.project-edit-equipment-qty[data-project-edit-equipment-index]');
      if (qtyButton) {
        const index = Number.parseInt(qtyButton.dataset.projectEditEquipmentIndex || '-1', 10);
        const item = editState.operationalEquipment?.[index];
        if (!item || item.type === 'package') return;
        const current = Number.parseInt(String(item.qty ?? item.quantity ?? 1), 10);
        const delta = qtyButton.dataset.action === 'increase' ? 1 : -1;
        const nextQuantity = Math.max(1, (Number.isInteger(current) && current > 0 ? current : 1) + delta);
        if (delta > 0) {
          const ignoreReservationId = getManagedReservationIdForProject(project.id);
          const availableQuantity = getProjectEditEquipmentAvailableQuantity(item, form, project, ignoreReservationId);
          if (nextQuantity > availableQuantity) {
            showToast(t('reservations.toast.noAdditionalUnits', '⚠️ لا توجد وحدات إضافية متاحة حالياً'));
            return;
          }
        }
        item.qty = nextQuantity;
        item.quantity = item.qty;
        refreshOperationalEquipmentUi();
        return;
      }

      const removeButton = event.target.closest('.project-edit-equipment-remove[data-project-edit-equipment-index]');
      if (!removeButton) return;
      const index = Number.parseInt(removeButton.dataset.projectEditEquipmentIndex || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      editState.operationalEquipment.splice(index, 1);
      refreshOperationalEquipmentUi();
    });
    const handleEquipmentMoneyEdit = (event, shouldRefreshRow = false) => {
      if (!(event.target instanceof HTMLInputElement)) return;
      const input = event.target.closest('.project-edit-equipment-money[data-project-edit-equipment-index]');
      if (!input) return;
      const index = Number.parseInt(input.dataset.projectEditEquipmentIndex || '-1', 10);
      const item = editState.operationalEquipment?.[index];
      if (!item) return;
      const field = input.dataset.field === 'unit_cost' ? 'unit_cost' : 'unit_price';
      const value = parseEditMoneyValue(input.value);
      item[field] = value;
      if (field === 'unit_price') item.price = value;
      if (field === 'unit_cost') item.cost = value;
      if (shouldRefreshRow) {
        refreshOperationalEquipmentUi();
        return;
      }
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    };
    equipmentContainer.addEventListener('input', (event) => handleEquipmentMoneyEdit(event, false));
    equipmentContainer.addEventListener('change', (event) => handleEquipmentMoneyEdit(event, true));
    equipmentContainer.dataset.listenerAttached = 'true';
  }

  if (addCrewButton && !addCrewButton.dataset.listenerAttached) {
    addCrewButton.addEventListener('click', async () => {
      try {
        await ensureTechnicianPositionsLoaded();
      } catch (_) {
        // Still allow a blank row when the positions API is temporarily unavailable.
      }
      editState.operationalCrewAssignments = [
        ...(editState.operationalCrewAssignments || []),
        normalizeProjectEditCrewAssignment({}),
      ];
      refreshProjectEditCrewUi();
    });
    addCrewButton.dataset.listenerAttached = 'true';
  }

  if (quickPositionButton && !quickPositionButton.dataset.listenerAttached) {
    quickPositionButton.addEventListener('click', async () => {
      const name = window.prompt(t('projects.quickCrew.position.fields.nameAr', 'اسم المنصب'));
      if (!name || !name.trim()) return;
      const costRaw = window.prompt(t('projects.quickCrew.position.fields.cost', 'تكلفة المنصب'), '0') || '0';
      const priceRaw = window.prompt(t('projects.quickCrew.position.fields.clientPrice', 'سعر البيع'), '0') || '0';
      try {
        const created = await createProjectQuickPosition({
          labelAr: name.trim(),
          labelEn: name.trim(),
          cost: costRaw,
          clientPrice: priceRaw,
        });
        editState.operationalCrewAssignments = [
          ...(editState.operationalCrewAssignments || []),
          normalizeProjectEditCrewAssignment({
            positionId: created.id,
            positionKey: created.name,
            positionName: getProjectEditPositionLabel(created),
            positionLabel: getProjectEditPositionLabel(created),
            positionCost: created.cost,
            positionClientPrice: created.clientPrice,
          }),
        ];
        refreshProjectEditCrewUi();
        showToast(t('projects.quickCrew.position.toast.created', 'تمت إضافة المنصب إلى المشروع الحالي'), 'success');
      } catch (error) {
        showToast(error?.message || t('projects.quickCrew.position.toast.failed', 'تعذر إضافة المنصب'), 'error');
      }
    });
    quickPositionButton.dataset.listenerAttached = 'true';
  }

  if (quickTechnicianButton && !quickTechnicianButton.dataset.listenerAttached) {
    quickTechnicianButton.addEventListener('click', async () => {
      const name = window.prompt(t('projects.quickCrew.technician.fields.name', 'اسم عضو الفريق'));
      if (!name || !name.trim()) return;
      const phone = window.prompt(t('projects.quickCrew.technician.fields.phone', 'رقم الجوال'), '') || '';
      const email = window.prompt(t('projects.quickCrew.technician.fields.email', 'البريد الإلكتروني'), '') || '';
      const role = window.prompt(t('projects.quickCrew.technician.fields.role', 'التخصص'), '') || '';
      const department = window.prompt(t('projects.quickCrew.technician.fields.department', 'القسم'), '') || '';
      try {
        const { created, technicians } = await createProjectQuickTechnician({
          name: name.trim(),
          phone,
          email,
          role: role.trim(),
          department,
        });
        if (Array.isArray(technicians) && technicians.length) {
          state.technicians = technicians;
        }
        const createdId = created?.id ?? created?.technician_id ?? created?.technicianId
          ?? (state.technicians || []).find((entry) => getProjectEditTechnicianLabel(entry) === name.trim())?.id;
        if (createdId) {
          editState.operationalCrewAssignments = [
            ...(editState.operationalCrewAssignments || []),
            normalizeProjectEditCrewAssignment({ technicianId: createdId }),
          ];
        }
        refreshProjectEditCrewUi();
        showToast(t('projects.quickCrew.technician.toast.created', 'تمت إضافة عضو الفريق وأصبح متاحًا للاختيار'), 'success');
      } catch (error) {
        showToast(error?.message || t('projects.quickCrew.technician.toast.failed', 'تعذر إضافة عضو الفريق'), 'error');
      }
    });
    quickTechnicianButton.dataset.listenerAttached = 'true';
  }

  if (crewContainer && !crewContainer.dataset.listenerAttached) {
    crewContainer.addEventListener('change', (event) => {
      if (!(event.target instanceof Element)) return;
      const index = Number.parseInt(event.target.dataset.projectEditCrewIndex || '-1', 10);
      const assignment = editState.operationalCrewAssignments?.[index];
      if (!assignment) return;
      if (event.target.matches('.project-edit-crew-position')) {
        const rawValue = event.target.value || '';
        const positions = getTechnicianPositionsCache();
        const position = rawValue.startsWith('id:')
          ? positions.find((entry) => String(entry.id) === rawValue.slice(3))
          : positions.find((entry) => String(entry.name) === rawValue.replace(/^name:/, ''));
        if (position) {
          assignment.positionId = position.id || '';
          assignment.positionKey = position.name || '';
          assignment.positionName = getProjectEditPositionLabel(position);
          assignment.positionLabel = getProjectEditPositionLabel(position);
          assignment.positionLabelAr = position.labelAr || position.label_ar || assignment.positionLabel;
          assignment.positionLabelEn = position.labelEn || position.label_en || '';
          assignment.positionCost = Number.isFinite(Number(position.cost)) ? Number(position.cost) : 0;
          assignment.positionClientPrice = Number.isFinite(Number(position.clientPrice)) ? Number(position.clientPrice) : 0;
        }
        refreshProjectEditCrewUi();
        return;
      }
      if (event.target.matches('.project-edit-crew-technician')) {
        const technicianId = event.target.value || '';
        if (isProjectEditTechnicianAssigned(editState.operationalCrewAssignments, technicianId, index)) {
          showToast(t('technicians.picker.duplicateTechnician', '⚠️ لا يمكن تعيين نفس الشخص لأكثر من منصب في نفس الحجز'), 'warning', 5000);
          event.target.value = assignment.technicianId || '';
          return;
        }
        const { start, end } = getProjectEditDateRangeFromForm(form, project);
        const ignoreReservationId = getManagedReservationIdForProject(project.id);
        if (technicianId && start && end && hasTechnicianConflict(technicianId, start, end, ignoreReservationId)) {
          showToast(t('technicians.picker.optionConflict', '⚠️ هذا العضو لديه تعارض في التاريخ/الوقت المحدد'), 'warning', 5000);
          event.target.value = assignment.technicianId || '';
          return;
        }
        const technician = getProjectEditTechnicianById(technicianId);
        assignment.technicianId = technicianId;
        assignment.technicianName = technician ? getProjectEditTechnicianLabel(technician) : null;
        assignment.technicianRole = technician?.role ?? null;
        refreshProjectEditCrewUi();
        return;
      }
      if (event.target.matches('.project-edit-crew-money')) {
        const field = event.target.dataset.field === 'positionCost' ? 'positionCost' : 'positionClientPrice';
        assignment[field] = parseEditMoneyValue(event.target.value);
        refreshProjectEditCrewUi();
      }
    });
    crewContainer.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      const removeButton = event.target.closest('.project-edit-crew-remove[data-project-edit-crew-index]');
      if (!removeButton) return;
      const index = Number.parseInt(removeButton.dataset.projectEditCrewIndex || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      editState.operationalCrewAssignments.splice(index, 1);
      refreshProjectEditCrewUi();
    });
    crewContainer.dataset.listenerAttached = 'true';
  }

  if (projectStatusSelect && !projectStatusSelect.dataset.listenerAttached) {
    projectStatusSelect.addEventListener('change', () => {
      syncStatusSectionUi();
    });
    projectStatusSelect.dataset.listenerAttached = 'true';
  }

  if (projectStatusApplyBtn && !projectStatusApplyBtn.dataset.listenerAttached) {
    projectStatusApplyBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      await applyProjectStatusSelection();
    });
    projectStatusApplyBtn.dataset.listenerAttached = 'true';
  }

  if (expenseAmountInput && !expenseAmountInput.dataset.listenerAttached) {
    expenseAmountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    expenseAmountInput.dataset.listenerAttached = 'true';
  }

  if (expenseDaysInput && !expenseDaysInput.dataset.listenerAttached) {
    expenseDaysInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '').replace(/[^\d]/g, '');
    });
    expenseDaysInput.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => {
      syncShareAndTax('share');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => {
      syncShareAndTax('tax');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox?.checked) {
    ensureProjectCompanyShareEnabled(shareCheckbox);
  }

  syncShareAndTax(shareCheckbox?.checked ? 'share' : 'tax');
  renderPaymentSummary();
  syncPaymentStatusValue('auto');
  syncStatusSectionUi();

  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const label = expenseLabelInput?.value.trim() || '';
      const normalizedAmount = normalizeNumbers(expenseAmountInput?.value || '0');
      const amount = Number(normalizedAmount);
      const normalizedSale = normalizeNumbers(expenseSaleInput?.value || '0');
      const salePrice = Number(normalizedSale);
      const daysRaw = normalizeNumbers(expenseDaysInput?.value || '');
      const days = daysRaw.trim() === '' ? 1 : Number.parseInt(daysRaw, 10);
      const note = (expenseNoteInput?.value || '').trim();

      if (!label) {
        showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
        expenseLabelInput?.focus();
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
        expenseAmountInput?.focus();
        return;
      }

      if (!Number.isInteger(days) || days <= 0) {
        showToast(t('projects.toast.invalidExpenseDays', '⚠️ يرجى إدخال عدد أيام صحيح أو تركه فارغاً'));
        expenseDaysInput?.focus();
        return;
      }

      editState.expenses.push({
        id: `expense-${project.id}-${Date.now()}`,
        label,
        amount,
        salePrice: Number.isFinite(salePrice) && salePrice > 0 ? salePrice : 0,
        days,
        note: note || ''
      });

      if (expenseLabelInput) expenseLabelInput.value = '';
      if (expenseAmountInput) expenseAmountInput.value = '';
      if (expenseSaleInput) expenseSaleInput.value = '';
      if (expenseDaysInput) expenseDaysInput.value = '';
      if (expenseNoteInput) expenseNoteInput.value = '';
      renderExpenses();
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
  }

  if (expensesContainer) {
    expensesContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove-expense"]');
      if (!removeBtn) return;
      const { id } = removeBtn.dataset;
      editState.expenses = editState.expenses.filter((expense) => String(expense.id) !== String(id));
      renderExpenses();
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
  }

  if (paymentAddButton && !paymentAddButton.dataset.listenerAttached) {
    paymentAddButton.addEventListener('click', (event) => {
      event.preventDefault();
      addPaymentEntry();
    });
    paymentAddButton.dataset.listenerAttached = 'true';
  }

  if (paymentHistoryContainer && !paymentHistoryContainer.dataset.listenerAttached) {
    paymentHistoryContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove-payment"]');
      if (!button) return;
      const index = Number.parseInt(button.dataset.index || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      const payments = ensurePayments();
      if (index >= payments.length) return;
      editState.payments = payments.filter((_, i) => i !== index);
      refreshPaymentUi();
      showToast(t('projects.toast.paymentRemoved', '🗑️ تم حذف الدفعة'));
    });
    paymentHistoryContainer.dataset.listenerAttached = 'true';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const titleInput = form.querySelector('[name="project-title"]');
    const typeSelect = form.querySelector('[name="project-type"]');
    const descriptionInput = form.querySelector('[name="project-description"]');

    const title = titleInput?.value.trim() || '';
    const projectType = typeSelect?.value || '';
    const startDateValue = normalizeNumbers(startDateInput?.value.trim() || '');
    const startTimeValue = normalizeNumbers(startTimeInput?.value.trim() || '');
    const descriptionValue = descriptionInput?.value.trim() || '';
    const selectedPaymentStatus = (paymentStatusSelect?.value || 'unpaid').toLowerCase();
    const normalizedPaymentStatus = ['paid', 'partial'].includes(selectedPaymentStatus)
      ? selectedPaymentStatus
      : 'unpaid';

    if (!title || !projectType || !startDateValue) {
      showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
      titleInput?.focus();
      return;
    }

    const endDateValue = normalizeNumbers(endDateInput?.value.trim() || '');
    const endTimeValue = normalizeNumbers(endTimeInput?.value.trim() || '');

    const startIso = combineProjectDateTime(startDateValue, startTimeValue);
    const endIso = endDateValue ? combineProjectDateTime(endDateValue, endTimeValue) : '';

    const startDate = new Date(startIso);
    const endDate = endIso ? new Date(endIso) : null;
    if (endDate && startDate > endDate) {
      showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
      endDateInput?.focus();
      return;
    }

    const index = state.projects.findIndex((entry) => String(entry.id) === String(project.id));
    if (index === -1) {
      showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
      return;
    }

    const financeContext = computeFinanceContext();
    const {
      equipmentEstimate,
      crewEstimate,
      expensesTotal,
      servicesClientPrice,
      discountValue,
      discountTypeValue,
      applyTax: computedApplyTax,
      companyShareEnabled: contextShareEnabled,
      companySharePercent,
      finance,
    } = financeContext;
    if (servicesClientPrice > 0 && (!Array.isArray(editState.expenses) || editState.expenses.length === 0)) {
      showToast(t('projects.toast.productionServicesRequireRows', '⚠️ أضف الخدمات الإنتاجية كصفوف مع التكلفة وسعر البيع وعدد الأيام قبل حفظ المشروع'));
      return;
    }

    const progressType = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const progressRaw = normalizeNumbers(paymentProgressValueInput?.value || '');
    let progressValue = progressRaw ? Number.parseFloat(progressRaw) : null;

    let paymentHistory = [...ensurePayments()];

    if (Number.isFinite(progressValue) && progressValue > 0 && Number.isFinite(Number(finance.totalWithTax))) {
      const baseSnapshot = calculatePaymentProgress({
        totalAmount: finance.totalWithTax,
        paidAmount: editState.basePaidAmount || 0,
        paidPercent: editState.basePaidPercent || 0,
        history: paymentHistory,
      });

      const recordedAt = new Date().toISOString();

      if (progressType === 'percent') {
        const remainingPercent = Math.max(0, 100 - (baseSnapshot.paidPercent || 0));
        if (remainingPercent > PAYMENT_TOLERANCE) {
          const adjustedPercent = Math.min(progressValue, remainingPercent);
          const percentValue = Math.round(adjustedPercent * 100) / 100;
          const amountValue = finance.totalWithTax > 0
            ? Math.round(((percentValue / 100) * finance.totalWithTax) * 100) / 100
            : null;
          paymentHistory = [...paymentHistory, {
            type: 'percent',
            amount: amountValue,
            percentage: percentValue,
            value: percentValue,
            note: null,
            recordedAt,
          }];
        }
      } else {
        const remainingAmount = Math.max(0, finance.totalWithTax - (baseSnapshot.paidAmount || 0));
        if (remainingAmount > PAYMENT_TOLERANCE) {
          const adjustedAmount = Math.min(progressValue, remainingAmount);
          const amountValue = Math.round(adjustedAmount * 100) / 100;
          const percentValue = finance.totalWithTax > 0
            ? Math.round(((amountValue / finance.totalWithTax) * 100) * 100) / 100
            : null;
          paymentHistory = [...paymentHistory, {
            type: 'amount',
            amount: amountValue,
            percentage: percentValue,
            value: amountValue,
            note: null,
            recordedAt,
          }];
        }
      }

      if (paymentHistory !== editState.payments) {
        editState.payments = paymentHistory;
        refreshPaymentUi();
      }

      if (paymentProgressValueInput) paymentProgressValueInput.value = '';
      if (paymentProgressTypeSelect) paymentProgressTypeSelect.value = 'percent';

      progressValue = null;
    }

    const paymentProgressCalc = calculatePaymentProgress({
      totalAmount: finance.totalWithTax,
      paidAmount: editState.basePaidAmount || 0,
      paidPercent: editState.basePaidPercent || 0,
      history: paymentHistory,
    });

    const manualStatusSelected = paymentStatusSelect?.dataset?.userSelected === 'true';
    const effectivePaymentStatus = determinePaymentStatus({
      manualStatus: manualStatusSelected ? normalizedPaymentStatus : project.paymentStatus || normalizedPaymentStatus,
      paidAmount: paymentProgressCalc.paidAmount,
      paidPercent: paymentProgressCalc.paidPercent,
      totalAmount: finance.totalWithTax,
    });
    const paymentStatusValue = manualStatusSelected ? normalizedPaymentStatus : effectivePaymentStatus;

    if (!manualStatusSelected && paymentStatusSelect) {
      paymentStatusSelect.value = paymentStatusValue;
    }
    if (paymentStatusSelect?.dataset) {
      delete paymentStatusSelect.dataset.userSelected;
    }

    editState.payments = paymentHistory;
    const selectedProjectStatus = projectStatusSelect?.value || currentStatusSelection;
    const statusPatch = buildProjectStatusPatch(project, selectedProjectStatus, startIso, endIso);
    const confirmedNext = statusPatch.confirmed === true;

    const payload = buildProjectPayload({
      projectCode: project.projectCode,
      title,
      type: projectType,
      clientId: project.clientId,
      clientCompany: project.clientCompany,
      description: descriptionValue,
      start: startIso,
      end: endIso || null,
      applyTax: computedApplyTax,
      paymentStatus: paymentStatusValue,
      equipmentEstimate,
      crewEstimate,
      expenses: editState.expenses,
      servicesClientPrice,
      discount: discountValue,
      discountType: discountTypeValue,
      companyShareEnabled: contextShareEnabled && computedApplyTax,
      companySharePercent: contextShareEnabled && computedApplyTax ? companySharePercent : null,
      companyShareAmount: finance.companyShareAmount,
      taxAmount: finance.taxAmount,
      totalWithTax: finance.totalWithTax,
      confirmed: confirmedNext,
      technicians: Array.isArray(editState.operationalCrewAssignments) ? editState.operationalCrewAssignments : [],
      crewAssignments: Array.isArray(editState.operationalCrewAssignments) ? editState.operationalCrewAssignments : [],
      equipment: Array.isArray(editState.operationalEquipment) ? editState.operationalEquipment : mapProjectEquipmentToApi(project),
      syncManagedReservation: true,
      paidAmount: paymentProgressCalc.paidAmount,
      paidPercentage: paymentProgressCalc.paidPercent,
      paymentProgressType: paymentProgressCalc.paymentProgressType,
      paymentProgressValue: paymentProgressCalc.paymentProgressValue,
      payments: paymentHistory,
    });
    payload.status = statusPatch.status;
    payload.cancelled = statusPatch.cancelled;
    payload.confirmed = statusPatch.confirmed;

    form.dataset.submitting = 'true';
    syncStatusSectionUi();

    try {
      const updated = await updateProjectApi(project.projectId ?? project.id, payload);
      const identifier = updated?.projectId ?? updated?.id ?? project.id;

      await applyStatusSideEffects(identifier, selectedProjectStatus, statusPatch, paymentStatusValue);

      if (selectedProjectStatus !== 'cancelled') {
        try {
          const schedule = { start: startIso };
          if (endIso) schedule.end = endIso;
          await updateLinkedReservationsSchedule(identifier, schedule);
        } catch (e) {
          console.warn('⚠️ failed to sync linked reservations schedule', e);
        }
      }

      try {
        await syncLinkedReservationsWithProject(updated);
      } catch (e) {
        console.warn('⚠️ failed to sync linked reservations with project state', e);
      }
      try {
        await refreshReservationsFromApi();
      } catch (e) {
        console.warn('⚠️ failed to refresh linked reservations after project update', e);
      }

      currentStatusSelection = getProjectStatusSelectionValue(updated);
      refreshSharedViews();
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
      _openProjectDetails?.(project.id);
    } catch (error) {
      console.error('❌ [projects/projectDetails/edit.js] Failed to update project', error);
      const message = isProjectApiError(error)
        ? error.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
    } finally {
      delete form.dataset.submitting;
      syncStatusSectionUi();
    }
  });
}

// ── buildProjectEditForm ──────────────────────────────────────────────────────

function buildProjectEditForm(project, editState = { clientName: '', clientCompany: '', expenses: [] }) {
  const { date: startDate, time: startTime } = splitDateTimeParts(project.start || '');
  const { date: endDate, time: endTime } = splitDateTimeParts(project.end || '');
  const applyTax = project.applyTax === true || project.applyTax === 'true';
  const paymentStatusRaw = typeof project.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentStatusValue = ['paid', 'partial'].includes(paymentStatusRaw) ? paymentStatusRaw : 'unpaid';
  const discountType = project.discountType === 'amount' ? 'amount' : 'percent';
  const discountValue = normalizeNumbers(String(project.discount ?? project.discountValue ?? 0));
  const sharePercentRaw = project.companySharePercent
    ?? project.company_share_percent
    ?? project.companyShare
    ?? project.company_share
    ?? project.companyShareAmountPercent
    ?? DEFAULT_COMPANY_SHARE_PERCENT;
  const parsedSharePercent = Number.parseFloat(normalizeNumbers(String(sharePercentRaw)));
  const companySharePercent = Number.isFinite(parsedSharePercent) && parsedSharePercent > 0
    ? parsedSharePercent
    : DEFAULT_COMPANY_SHARE_PERCENT;
  const companyShareEnabled = project.companyShareEnabled === true
    || project.companyShareEnabled === 'true'
    || (project.company_share_enabled === true)
    || (project.company_share_enabled === 'true')
    || (applyTax && Number.isFinite(parsedSharePercent) && parsedSharePercent > 0);
  const paymentProgressType = 'percent';
  const paymentProgressValue = '';
  const isCancelled = (project?.cancelled === true || project?.cancelled === 'true')
    || String(project?.status || '').toLowerCase() === 'cancelled'
    || String(project?.status || '').toLowerCase() === 'canceled';
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';

  return `
    <form id="project-details-edit-form" class="project-edit-form customer-edit-form">
      <div class="row g-3">
        <div class="col-12 col-lg-8">
          <label class="form-label">${escapeHtml(t('projects.form.labels.title', 'عنوان المشروع'))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${escapeHtml(project.title || '')}" required>
        </div>
        <div class="col-12 col-lg-4 d-flex flex-column project-edit-type-field">
          <label class="form-label">${escapeHtml(t('projects.form.labels.type', 'نوع المشروع'))}</label>
          <select class="ui-select form-select w-full project-edit-select-lg" name="project-type" required>
            ${buildProjectTypeOptionsMarkup(project.type)}
          </select>
        </div>
        <div class="col-12">
          <div class="project-edit-inline-group project-edit-inline-group--dates">
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.startDate', 'تاريخ البدء'))}</label>
              <input type="date" class="form-control" name="project-start-date" value="${escapeHtml(startDate)}" required>
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.endDate', 'تاريخ الانتهاء'))}</label>
              <input type="date" class="form-control" name="project-end-date" value="${escapeHtml(endDate)}">
            </div>
          </div>
          <div class="project-edit-inline-group project-edit-inline-group--times mt-2">
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.startTime', 'وقت البدء'))}</label>
              <input type="time" class="form-control" name="project-start-time" value="${escapeHtml(startTime)}">
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.endTime', 'وقت الانتهاء'))}</label>
              <input type="time" class="form-control" name="project-end-time" value="${escapeHtml(endTime)}">
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">${escapeHtml(t('projects.form.labels.description', 'الوصف'))}</label>
          <textarea class="form-control project-edit-textarea" name="project-description" rows="5">${escapeHtml(project.description || '')}</textarea>
        </div>
      </div>

      <section class="project-edit-expenses mt-4">
        <h6 class="mb-2">${escapeHtml(t('projects.form.labels.expenseLabel', 'خدمات إنتاجية'))}</h6>
        <div class="project-edit-expense-form">
          <div class="project-edit-expense-label-col">
            <label class="form-label" for="project-edit-expense-label">${escapeHtml(t('projects.form.labels.expenseLabel', 'خدمات إنتاجية'))}</label>
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-label" placeholder="${escapeHtml(t('projects.form.placeholders.expenseLabel', 'وصف المتطلب'))}">
          </div>
          <div class="project-edit-expense-amount-col">
            <label class="form-label" for="project-edit-expense-amount">${escapeHtml(t('projects.form.labels.expenseAmount', 'التكلفة'))}</label>
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-amount" placeholder="${escapeHtml(t('projects.form.placeholders.expenseAmount', 'المبلغ'))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-amount-col">
            <label class="form-label" for="project-edit-expense-sale">${escapeHtml(t('projects.form.labels.salePrice', 'سعر البيع'))}</label>
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-sale" placeholder="${escapeHtml(t('projects.form.placeholders.salePrice', 'سعر البيع'))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-amount-col">
            <label class="form-label" for="project-edit-expense-days">${escapeHtml(t('projects.form.labels.expenseDays', 'الأيام'))}</label>
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-days" placeholder="${escapeHtml(t('projects.form.placeholders.expenseDays', 'الأيام'))}" inputmode="numeric">
          </div>
          <div class="project-edit-expense-label-col">
            <label class="form-label" for="project-edit-expense-note">${escapeHtml(t('projects.form.labels.expenseNote', 'ملاحظات'))}</label>
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-note" placeholder="${escapeHtml(t('projects.form.placeholders.expenseNote', 'تفاصيل إضافية'))}">
          </div>
          <div class="project-edit-expense-action-col">
            <button type="button" class="ui-button ui-button--primary ui-button--sm btn btn-primary project-edit-add-btn" data-action="add-expense">${escapeHtml(t('projects.form.buttons.addExpense', '➕ إضافة خدمة'))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${buildProjectEditExpensesMarkup(editState.expenses)}
        </div>
      </section>

      <section class="project-edit-operational-equipment mt-4">
        <header class="surface-heading-stack project-edit-operational-equipment__header">
          <h6>${escapeHtml(t('projects.form.operationalBooking.equipmentTitle', 'المعدات'))}</h6>
          <p>${escapeHtml(t('projects.form.operationalBooking.equipmentHint', 'سيتم اختيار المعدات هنا بنفس قواعد التوفر والتعارضات المعتمدة في الحجوزات.'))}</p>
        </header>
        <div class="project-equipment-entry project-edit-equipment-method-block">
          <button type="button" class="ui-button ui-button--primary btn btn-primary" id="open-project-edit-equipment-picker">${escapeHtml(t('equipmentPicker.actions.open', 'اختيار المعدات والحزم'))}</button>
          <p class="project-equipment-entry__hint">${escapeHtml(t('equipmentPicker.hints.projectEdit', 'اختر المعدات أو الحزم وأدر الحزم من نافذة واحدة.'))}</p>
        </div>
        <div class="users-table-wrapper overflow-x-auto project-modal-table-wrapper project-edit-equipment-table-wrapper">
          <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table project-edit-equipment-table">
            <thead class="table-light">
              <tr>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.photo', 'الصورة'))}</th>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.item', 'المعدة'))}</th>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.qty', 'الكمية'))}</th>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.price', 'سعر الوحدة'))}</th>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.cost', 'تكلفة الوحدة'))}</th>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.total', 'الإجمالي'))}</th>
                <th>${escapeHtml(t('projects.form.operationalBooking.equipmentTable.actions', 'الإجراءات'))}</th>
              </tr>
            </thead>
            <tbody id="project-edit-operational-equipment-body"></tbody>
          </table>
        </div>
      </section>

      <section class="project-edit-operational-crew mt-4">
        <header class="surface-heading-stack project-edit-operational-equipment__header">
          <h6>${escapeHtml(t('projects.form.operationalBooking.crewTitle', 'الفريق والمناصب'))}</h6>
          <p>${escapeHtml(t('projects.form.operationalBooking.crewHint', 'سيتم تحديد المناصب أولًا ثم تعيين أعضاء الفريق عليها داخل المشروع مباشرة.'))}</p>
        </header>
        <div class="project-edit-crew-actions">
          <button type="button" class="ui-button ui-button--primary btn btn-primary" id="project-edit-add-crew">${escapeHtml(t('technicians.picker.actions.addPosition', 'إضافة منصب'))}</button>
          <button type="button" class="reservation-quick-create-btn project-crew-quick-btn" id="project-edit-quick-position">+ ${escapeHtml(t('projects.quickCrew.position.shortLabel', 'منصب'))}</button>
          <button type="button" class="reservation-quick-create-btn project-crew-quick-btn" id="project-edit-quick-technician">+ ${escapeHtml(t('projects.quickCrew.technician.shortLabel', 'عضو فريق'))}</button>
        </div>
        <div class="users-table-wrapper overflow-x-auto project-modal-table-wrapper project-edit-crew-table-wrapper">
          <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table project-edit-crew-table">
            <thead class="table-light">
              <tr>
                <th>${escapeHtml(t('technicians.picker.assignments.position', '👔 المنصب'))}</th>
                <th>${escapeHtml(t('technicians.picker.assignments.member', '😎 العضو المعين'))}</th>
                <th>${escapeHtml(t('technicians.picker.assignments.price', '💼 سعر العميل'))}</th>
                <th>${escapeHtml(t('technicians.picker.positionCostLabel', 'التكلفة'))}</th>
                <th>${escapeHtml(t('technicians.picker.assignments.actions', '⚙️ الإجراءات'))}</th>
              </tr>
            </thead>
            <tbody id="project-edit-crew-body"></tbody>
          </table>
        </div>
      </section>

      <div class="project-billing-row project-edit-billing-row">
        <div class="project-edit-billing-col">
          <section class="project-billing-panel project-billing-panel--discount project-edit-billing-panel">
            <header class="surface-heading-stack project-billing-panel__header">
              <h6>${escapeHtml(t('projects.form.labels.discount', 'الخصم'))}</h6>
              <p>${escapeHtml(t('projects.form.billing.discountHint', 'حدّد نوع الخصم والقيمة المطلوب تطبيقها على المشروع.'))}</p>
            </header>
            <div class="project-discount-group">
              <select id="project-edit-discount-type" name="project-discount-type" class="ui-select form-select project-edit-select-xs">
                <option value="percent" ${discountType === 'percent' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.percent', '٪ نسبة'))}</option>
                <option value="amount" ${discountType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.amount', '💵 مبلغ'))}</option>
              </select>
              <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${escapeHtml(discountValue)}" placeholder="0" inputmode="decimal">
            </div>
          </section>
        </div>
        <div class="project-edit-billing-col">
          <section class="project-billing-panel project-billing-panel--share project-edit-billing-panel">
            <header class="surface-heading-stack project-billing-panel__header">
              <h6>${escapeHtml(t('projects.form.labels.companyShare', 'المصاريف التشغيلية والضريبة'))}</h6>
              <p>${escapeHtml(t('projects.form.billing.shareHint', 'فعّل المصاريف التشغيلية والضريبة من نفس البلوك لتبقى التسعيرة النهائية واضحة.'))}</p>
            </header>
            <div class="d-flex flex-column gap-2">
              <div class="project-switch-row form-check form-switch reservation-share-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${escapeHtml(String(companySharePercent))}" ${companyShareEnabled ? 'checked' : ''}>
                <label class="form-check-label" for="project-edit-company-share">${escapeHtml(t('projects.form.companyShareToggle', 'إضافة مصاريف تشغيلية (10٪)'))}</label>
              </div>
              <div class="project-switch-row form-check form-switch reservation-tax-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${applyTax ? 'checked' : ''}>
                <label class="form-check-label" for="project-edit-tax">${escapeHtml(t('projects.form.taxLabel', 'شامل الضريبة (15٪)'))}</label>
              </div>
            </div>
          </section>
        </div>
        <div class="project-edit-billing-col">
          <section class="project-billing-panel project-billing-panel--payment project-edit-billing-panel">
            <header class="surface-heading-stack project-billing-panel__header">
              <h6>${escapeHtml(t('projects.form.paymentProgress.label', '💰 الدفعة المستلمة'))}</h6>
              <p>${escapeHtml(t('projects.form.paymentProgress.hint', 'أدخل المبلغ أو النسبة التي تم استلامها من قيمة المشروع'))}</p>
            </header>
            <div class="project-payment-progress">
              <div class="project-payment-progress-group">
                <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="ui-select form-select project-edit-select-xs">
                  <option value="amount" ${paymentProgressType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.amount', '💵 مبلغ'))}</option>
                  <option value="percent" ${paymentProgressType !== 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.percent', '٪ نسبة'))}</option>
                </select>
                <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${escapeHtml(paymentProgressValue)}" placeholder="0" inputmode="decimal">
              </div>
              <button type="button" class="ui-button ui-button--primary ui-button--sm btn btn-primary project-payment-progress-action" id="project-edit-payment-add">${escapeHtml(t('reservations.paymentHistory.actions.add', '➕ إضافة دفعة'))}</button>
            </div>
          </section>
        </div>
      </div>

      <section class="project-edit-payment-history mt-4">
        <div class="reservation-payment-history__header">
          <h6 class="reservation-payment-history__title">${escapeHtml(t('reservations.paymentHistory.title', 'سجل الدفعات'))}</h6>
        </div>
        <div class="project-payment-history-block project-modal-payment-history-shell">
          <div id="project-edit-payment-history" class="reservation-payment-history reservation-payment-history--table"></div>
        </div>
        <div id="project-edit-payment-summary" class="project-details-grid mt-3"></div>
      </section>

      <section class="project-edit-status-panel mt-4">
        <header class="surface-heading-stack project-edit-status-panel__header">
          <h6>${escapeHtml(t('projects.form.labels.projectStatus', 'حالة المشروع'))}</h6>
          <p>${escapeHtml(t('projects.form.hints.projectStatus', 'اجمع التأكيد والإغلاق والإلغاء في نقطة واحدة واضحة لتغيير حالة المشروع بدون تشتيت.'))}</p>
        </header>
        <div class="project-edit-status-panel__body">
          <div class="project-edit-status-grid">
            <div class="project-edit-status-current">
              <span class="project-edit-status-eyebrow">${escapeHtml(t('projects.form.labels.currentStatus', 'الحالة الحالية'))}</span>
              <span id="project-edit-status-current" class="reservation-chip status-chip ${isCancelled ? 'status-cancelled' : (String(project?.status || '').toLowerCase() === 'completed' ? 'status-completed' : (isConfirmed ? 'status-confirmed' : 'status-pending'))}">
                ${escapeHtml(
                  isCancelled
                    ? t('projects.form.status.cancelled', 'ملغي')
                    : (String(project?.status || '').toLowerCase() === 'completed'
                      ? t('projects.form.status.completed', 'مغلق')
                      : (isConfirmed
                        ? t('projects.form.status.confirmed', 'مؤكد')
                        : t('projects.form.status.pending', 'غير مؤكد')))
                )}
              </span>
            </div>
            <div class="project-edit-status-selector">
              <label class="form-label" for="project-edit-status-select">${escapeHtml(t('projects.form.labels.changeStatus', 'تغيير الحالة'))}</label>
              <select class="ui-select form-select w-full" id="project-edit-status-select" name="project-status">
                <option value="pending" ${!isCancelled && !isConfirmed && String(project?.status || '').toLowerCase() !== 'completed' ? 'selected' : ''}>${escapeHtml(t('projects.form.status.pending', 'غير مؤكد'))}</option>
                <option value="confirmed" ${!isCancelled && isConfirmed && String(project?.status || '').toLowerCase() !== 'completed' ? 'selected' : ''}>${escapeHtml(t('projects.form.status.confirmed', 'مؤكد'))}</option>
                <option value="completed" ${!isCancelled && String(project?.status || '').toLowerCase() === 'completed' ? 'selected' : ''}>${escapeHtml(t('projects.form.status.completed', 'مغلق'))}</option>
                <option value="cancelled" ${isCancelled ? 'selected' : ''}>${escapeHtml(t('projects.form.status.cancelled', 'ملغي'))}</option>
              </select>
            </div>
            <div class="project-edit-status-action">
              <button type="button" class="ui-button ui-button--secondary btn btn-secondary" id="project-edit-status-apply">
                ${escapeHtml(t('projects.form.actions.applyStatus', 'تطبيق الحالة'))}
              </button>
            </div>
          </div>
          <small id="project-edit-status-hint" class="text-muted project-edit-status-hint">
            ${escapeHtml(
              isCancelled
                ? t('projects.form.hints.statusCancelled', 'يلغي المشروع ويحدّث جميع الحجوزات المرتبطة إلى حالة ملغية.')
                : (String(project?.status || '').toLowerCase() === 'completed'
                  ? t('projects.form.hints.statusCompleted', 'يغلق المشروع بعد الانتهاء ويحوّل الحجوزات المرتبطة إلى حالة مغلقة.')
                  : (isConfirmed
                    ? t('projects.form.hints.statusConfirmed', 'يؤكد المشروع والحجوزات المرتبطة ليظهر كعمل نشط وجاهز للتنفيذ.')
                    : t('projects.form.hints.statusPending', 'يبقي المشروع مفتوحًا بدون تأكيد ويعيد الحجوزات المرتبطة إلى حالة غير مؤكدة.')))
            )}
          </small>
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-end">
        <div class="d-flex gap-2">
          <button type="submit" class="ui-button ui-button--primary btn btn-primary">${escapeHtml(t('projects.form.buttons.update', 'تحديث المشروع'))}</button>
          <button type="button" class="ui-button ui-button--outline btn btn-outline" data-action="cancel-edit">${escapeHtml(t('actions.cancel', 'إلغاء'))}</button>
        </div>
      </div>
    </form>
  `;
}
