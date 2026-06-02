import { t } from '../language.js';
import { normalizeStatusValue } from './normalize.js';
import {
  isEquipmentSelectionActive,
  getActiveEquipmentSelection,
  clearEquipmentSelection,
  EQUIPMENT_SELECTION_EVENTS,
} from '../reservations/equipmentSelection.js';
import { hasEquipmentConflict, normalizeBarcodeValue } from '../reservations/state.js';

export function getActiveSelectionContext() {
  if (!isEquipmentSelectionActive()) return null;
  const selection = getActiveEquipmentSelection();
  if (!selection) return null;
  return { ...selection };
}

export function evaluateSelectionStateForItem(item) {
  const selection = getActiveSelectionContext();
  if (!selection) return { active: false };

  const variants = Array.isArray(item?.variants) && item.variants.length ? item.variants : [item];
  const { start, end, ignoreReservationId = null } = selection;
  const selectionMode = selection?.mode || selection?.source || '';

  const uniqueVariants = [];
  const seen = new Set();

  variants.forEach((variant) => {
    const normalizedBarcode = normalizeBarcodeValue(variant?.barcode);
    if (!normalizedBarcode || seen.has(normalizedBarcode)) return;
    seen.add(normalizedBarcode);
    uniqueVariants.push({ variant, barcode: normalizedBarcode });
  });

  if (!uniqueVariants.length) {
    return {
      active: true,
      canSelect: false,
      reason: t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'),
    };
  }

  if (selectionMode === 'package-manager' || selectionMode === 'equipment-packages') {
    const maxQuantity = Math.max(1, uniqueVariants.length || 1);
    return {
      active: true,
      canSelect: true,
      barcode: uniqueVariants[0].barcode,
      availableBarcodes: uniqueVariants.map(({ barcode }) => barcode),
      maxQuantity,
      reason: '',
    };
  }

  const availableVariants = uniqueVariants.filter(({ variant }) => {
    const status = normalizeStatusValue(variant?.status);
    return status !== 'maintenance' && status !== 'retired';
  });

  if (!start || !end) {
    return {
      active: true,
      canSelect: false,
      barcode: availableVariants[0]?.barcode || uniqueVariants[0].barcode,
      reason: t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'),
      availableBarcodes: [],
      maxQuantity: 0,
    };
  }

  const conflictFreeVariants = availableVariants.filter(
    ({ barcode }) => !hasEquipmentConflict(barcode, start, end, ignoreReservationId)
  );

  if (conflictFreeVariants.length) {
    return {
      active: true,
      canSelect: true,
      barcode: conflictFreeVariants[0].barcode,
      availableBarcodes: conflictFreeVariants.map(({ barcode }) => barcode),
      maxQuantity: conflictFreeVariants.length,
    };
  }

  let reason = t('reservations.toast.equipmentUnavailable', '⚠️ هذه المعدة غير متاحة حالياً');

  if (availableVariants.length > 0) {
    reason = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
  } else {
    const statusSet = new Set(uniqueVariants.map(({ variant }) => normalizeStatusValue(variant?.status)));
    if (statusSet.has('maintenance')) {
      reason = t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً');
    } else if (statusSet.has('reserved')) {
      reason = t('reservations.toast.equipmentReserved', '⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها');
    } else if (statusSet.has('retired')) {
      reason = t('reservations.toast.equipmentRetired', '⚠️ هذه المعدة خارج الخدمة حالياً');
    }
  }

  return {
    active: true,
    canSelect: false,
    barcode: availableVariants[0]?.barcode || uniqueVariants[0].barcode,
    reason,
    availableBarcodes: [],
    maxQuantity: 0,
  };
}

function scrollToReservationEquipmentSection() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const createTab = document.getElementById('create-tab');
  if (!createTab) return;
  const equipmentSection = createTab.querySelector('.reservation-equipment-table')
    || createTab.querySelector('.reservation-equipment-heading');
  if (!equipmentSection) return;

  const headerOffset = 110;
  const bounding = equipmentSection.getBoundingClientRect();
  const targetPosition = Math.max((window.scrollY || window.pageYOffset || 0) + bounding.top - headerOffset, 0);
  try {
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  } catch (_) {
    window.scrollTo(0, targetPosition);
  }
}

export function navigateBackToReservationForm() {
  const reservationsTabButton = document.querySelector('[data-tab="reservations-tab"]');
  if (reservationsTabButton) {
    reservationsTabButton.click();
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelector('[data-sub-tab="my-reservations-tab"]')?.click();
        const barcodeInput = document.getElementById('equipment-barcode');
        if (barcodeInput) {
          try {
            barcodeInput.focus({ preventScroll: true });
          } catch (_) {
            barcodeInput.focus();
          }
        }
        scrollToReservationEquipmentSection();
        setTimeout(scrollToReservationEquipmentSection, 150);
      }, 200);
    });
  }
}

export function updateEquipmentSelectionBanner() {
  if (typeof document === 'undefined') return;
  const banner = document.getElementById('equipment-selection-banner');
  const returnButton = document.getElementById('equipment-selection-return');
  const floatingReturnButton = document.getElementById('equipment-floating-return');
  const titleEl = document.getElementById('equipment-selection-banner-title');
  const hintEl = document.getElementById('equipment-selection-banner-hint');
  if (!banner) return;

  const selection = getActiveSelectionContext();
  banner.hidden = !selection;

  const mode = selection?.mode || selection?.source || '';
  const isPackageMode = mode === 'package-manager' || mode === 'equipment-packages';
  const returnButtons = [returnButton, floatingReturnButton].filter(Boolean);

  const updateReturnButtonsLabel = (label) => {
    returnButtons.forEach((button) => { button.textContent = label; });
  };

  if (selection) {
    if (isPackageMode) {
      if (titleEl) titleEl.textContent = t('equipment.packages.selection.bannerTitle', '📦 اختيار معدات للحزمة');
      if (hintEl) hintEl.textContent = t('equipment.packages.selection.bannerHint', 'اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.');
      updateReturnButtonsLabel(t('equipment.packages.selection.doneButton', '✅ إنهاء اختيار الحزمة'));
    } else {
      if (titleEl) titleEl.textContent = t('reservations.create.equipment.selector.bannerTitle', '🔗 اختيار معدات لحجز جديد');
      if (hintEl) hintEl.textContent = t('reservations.create.equipment.selector.bannerHint', 'ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.');
      updateReturnButtonsLabel(t('reservations.create.equipment.selector.returnButton', '⬅️ العودة إلى الحجز'));
    }
  } else {
    if (titleEl) titleEl.textContent = t('reservations.create.equipment.selector.bannerTitle', '🔗 اختيار معدات لحجز جديد');
    if (hintEl) hintEl.textContent = t('reservations.create.equipment.selector.bannerHint', 'ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.');
    updateReturnButtonsLabel(t('reservations.create.equipment.selector.returnButton', '⬅️ العودة إلى الحجز'));
  }

  if (floatingReturnButton) {
    floatingReturnButton.hidden = !selection;
    if (selection) {
      floatingReturnButton.setAttribute('aria-label', floatingReturnButton.textContent.trim());
    } else {
      floatingReturnButton.removeAttribute('aria-label');
    }
  }

  if (selection) {
    const handleReturnClick = () => {
      const activeSelection = getActiveSelectionContext();
      const activeMode = activeSelection?.mode || activeSelection?.source || '';
      if (activeMode === 'package-manager' || activeMode === 'equipment-packages') {
        clearEquipmentSelection('package-finish-button');
      } else {
        clearEquipmentSelection('return-button');
        navigateBackToReservationForm();
      }
    };

    returnButtons.forEach((button) => {
      if (button.dataset.listenerAttached) return;
      button.addEventListener('click', handleReturnClick);
      button.dataset.listenerAttached = 'true';
    });
  }
}

export { EQUIPMENT_SELECTION_EVENTS };
