import { ensurePackagesCached } from '../packagesCache.js';

const MODAL_SNIPPETS = {
  reservationDetailsModal: `
  <div class="modal fade customer-edit-modal reservation-shell-modal" id="reservationDetailsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable customer-edit-modal__dialog reservation-shell-modal__dialog">
      <div class="ui-modal__content modal-content customer-edit-modal__content reservation-shell-modal__content">
        <div class="ui-modal__header modal-header customer-edit-modal__header reservation-shell-modal__header">
          <h5 class="modal-title" data-i18n data-i18n-key="reservations.details.modalTitle">📋 تفاصيل الحجز</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق" data-i18n data-i18n-aria-label-key="actions.close"></button>
        </div>
        <div class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body" id="reservation-details-body"></div>
        <div class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer">
          <button type="button" class="btn modal-close-btn" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.close">إغلاق</button>
        </div>
      </div>
    </div>
  </div>
  `,
  editReservationModal: `
  <div class="modal fade customer-edit-modal reservation-shell-modal" id="editReservationModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable customer-edit-modal__dialog reservation-shell-modal__dialog reservation-shell-modal__dialog--wide">
      <div class="ui-modal__content modal-content customer-edit-modal__content reservation-shell-modal__content">
        <div class="ui-modal__header modal-header customer-edit-modal__header reservation-shell-modal__header">
          <h5 class="modal-title" data-i18n data-i18n-key="reservations.edit.modalTitle">✏️ تعديل الحجز</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق" data-i18n data-i18n-aria-label-key="actions.close"></button>
        </div>
        <div class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body">
          <form id="edit-reservation-form" class="row g-3 customer-edit-form reservation-shell-form">
            <input type="hidden" id="edit-res-index">
            <input type="hidden" id="edit-res-confirmed" value="false">

            <div class="col-12">
              <div class="edit-reservation-field-row">
                <div class="edit-reservation-field">
                  <label class="form-label" for="edit-res-id" data-i18n data-i18n-key="reservations.edit.labels.id">🆔 رقم الحجز</label>
                  <input type="text" class="form-control" id="edit-res-id" disabled>
                </div>
                <div class="edit-reservation-field">
                  <label class="form-label" for="edit-res-customer" data-i18n data-i18n-key="reservations.edit.labels.customer">👤 العميل</label>
                  <input type="text" class="form-control" id="edit-res-customer" disabled>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="edit-reservation-field-row">
                <div class="edit-reservation-field">
                  <label class="form-label" for="edit-res-start" data-i18n data-i18n-key="reservations.edit.labels.startDate">📅 تاريخ البداية</label>
                  <input type="text" class="form-control" id="edit-res-start">
                </div>
                <div class="edit-reservation-field">
                  <label class="form-label" for="edit-res-end" data-i18n data-i18n-key="reservations.edit.labels.endDate">📅 تاريخ النهاية</label>
                  <input type="text" class="form-control" id="edit-res-end">
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="edit-reservation-field-row">
                <div class="edit-reservation-field">
                  <label class="form-label" for="edit-res-start-time" data-i18n data-i18n-key="reservations.edit.labels.startTime">⏰ وقت البداية</label>
                  <input type="text" class="form-control" id="edit-res-start-time">
                </div>
                <div class="edit-reservation-field">
                  <label class="form-label" for="edit-res-end-time" data-i18n data-i18n-key="reservations.edit.labels.endTime">⏰ وقت النهاية</label>
                  <input type="text" class="form-control" id="edit-res-end-time">
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="edit-reservation-field-row edit-reservation-field-row--single">
                <div class="edit-reservation-field edit-reservation-field--wide">
                  <label class="form-label edit-reservation-notes-label" for="edit-res-notes" data-i18n data-i18n-key="reservations.edit.labels.notes">📝 الملاحظات</label>
                  <textarea class="form-control reservation-notes reservation-notes--compact reservation-notes--short" id="edit-res-notes" rows="2" placeholder="اكتب أي ملاحظات..." data-i18n data-i18n-placeholder-key="reservations.edit.placeholders.notes"></textarea>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="edit-reservation-field-row edit-reservation-field-row--single">
                <div class="edit-reservation-field edit-reservation-field--wide reservation-terms-wrapper">
                  <h5 class="reservation-terms__title" data-i18n data-i18n-key="reservations.edit.terms.title">📄 الشروط العامة لعرض السعر</h5>
                  <p class="reservation-terms__hint" data-i18n data-i18n-key="reservations.edit.terms.hint">يمكنك تعديل البنود قبل إرسال عرض السعر. اكتب كل شرط في سطر مستقل.</p>
                  <textarea class="reservation-terms__textarea" id="edit-res-terms" rows="3" placeholder="اكتب الشروط هنا..." data-i18n data-i18n-placeholder-key="reservations.edit.terms.placeholder"></textarea>
                </div>
              </div>
            </div>

            <div class="col-12">
              <label class="form-label" for="edit-res-project" data-i18n data-i18n-key="reservations.edit.labels.project">📁 المشروع المرتبط</label>
              <select id="edit-res-project" class="form-select">
                <option value="" data-i18n data-i18n-key="reservations.create.placeholders.project">اختر مشروعاً (اختياري)</option>
              </select>
            </div>

            <div class="col-12 col-xl-8">
              <div class="reservation-payment-card">
                <div class="reservation-payment-card__header">
                  <span class="reservation-payment-card__title" data-i18n data-i18n-key="reservations.edit.paymentCard.title">💰 تفاصيل الدفع</span>
                </div>
                <p class="reservation-payment-card__meta" data-i18n data-i18n-key="reservations.edit.paymentCard.meta">تتحدث حالة الدفع تلقائياً من الدفعات المسجلة داخل الحجز.</p>
                <div class="reservation-payment-card__body">
                  <div class="reservation-payment-card__toggles">
                    <div class="reservation-option-card">
                      <input type="checkbox" class="reservation-option-card__input" id="edit-res-company-share" data-company-share="10">
                      <label class="reservation-option-card__label" for="edit-res-company-share">
                        <span class="reservation-option-card__check" aria-hidden="true"></span>
                        <span class="reservation-option-card__text" data-i18n data-i18n-key="reservations.create.billing.companyShareToggle">إضافة مصاريف تشغيلية (10٪)</span>
                      </label>
                    </div>
                    <div class="reservation-option-card">
                      <input type="checkbox" class="reservation-option-card__input" id="edit-res-tax">
                      <label class="reservation-option-card__label" for="edit-res-tax">
                        <span class="reservation-option-card__check" aria-hidden="true"></span>
                        <span class="reservation-option-card__text" data-i18n data-i18n-key="reservations.edit.labels.tax">شامل الضريبة (15%)</span>
                      </label>
                    </div>
                  </div>
                  <div class="reservation-payment-card__field">
                    <label class="form-label" for="edit-res-discount" data-i18n data-i18n-key="reservations.edit.labels.discount">💵 الخصم</label>
                    <div class="input-group reservation-payment-inline-group">
                      <select id="edit-res-discount-type" class="form-select reservation-payment-inline-group__control reservation-payment-inline-group__control--type">
                        <option value="percent" data-i18n data-i18n-key="reservations.edit.discount.percent">٪ نسبة</option>
                        <option value="amount" data-i18n data-i18n-key="reservations.edit.discount.amount">💵 مبلغ</option>
                      </select>
                      <input type="text" class="form-control reservation-payment-inline-group__control reservation-payment-inline-group__control--value" id="edit-res-discount" placeholder="ادخل قيمة الخصم" data-i18n data-i18n-placeholder-key="reservations.edit.placeholders.discount">
                    </div>
                  </div>
                  <div class="reservation-payment-card__field">
                    <label class="form-label" for="edit-res-payment-progress-value" data-i18n data-i18n-key="reservations.edit.paymentProgress.label">💰 الدفعات المستلمة</label>
                    <div class="reservation-payment-progress reservation-payment-progress--flush">
                      <div class="input-group reservation-payment-inline-group reservation-payment-progress__group">
                        <select id="edit-res-payment-progress-type" class="form-select reservation-payment-inline-group__control reservation-payment-inline-group__control--type reservation-payment-progress__select reservation-payment-progress__control reservation-payment-progress__control--type">
                          <option value="amount" data-i18n data-i18n-key="reservations.edit.paymentProgress.amount">💵 مبلغ</option>
                          <option value="percent" selected data-i18n data-i18n-key="reservations.edit.paymentProgress.percent">٪ نسبة</option>
                        </select>
                        <input type="text" class="form-control reservation-payment-inline-group__control reservation-payment-inline-group__control--value reservation-payment-progress__input reservation-payment-progress__control reservation-payment-progress__control--value" id="edit-res-payment-progress-value" placeholder="50" data-i18n data-i18n-placeholder-key="reservations.edit.paymentProgress.placeholder">
                      </div>
                      <div class="reservation-payment-progress__actions">
                        <button type="button" class="btn btn-outline-primary btn-sm" id="edit-res-payment-add" data-i18n data-i18n-key="reservations.paymentHistory.actions.add">➕ إضافة دفعة</button>
                        <small class="form-text reservation-payment-progress__hint" data-i18n data-i18n-key="reservations.edit.paymentProgress.hint">حدّد مقدار الدفعة التي استلمتها من الحجز</small>
                      </div>
                    </div>
                    <div class="reservation-payment-history-block">
                      <div class="reservation-payment-history__header">
                        <h6 class="reservation-payment-history__title" data-i18n data-i18n-key="reservations.paymentHistory.title">سجل الدفعات</h6>
                      </div>
                      <div id="edit-res-payment-history" class="reservation-payment-history"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-xl-4">
              <div class="reservation-status-card reservation-status-card--edit" id="edit-res-status-card">
                <div class="reservation-status-card__header reservation-status-card__header--stacked">
                  <span class="reservation-status-card__title" data-i18n data-i18n-key="reservations.edit.statusCard.title">🔄 حالة الحجز</span>
                  <span class="reservation-edit-status-badge" id="edit-res-status-badge" data-i18n data-i18n-key="reservations.edit.confirmation.pendingLabel">⏳ بانتظار التأكيد</span>
                </div>
                <p class="reservation-status-card__hint" data-i18n data-i18n-key="reservations.edit.statusCard.hint">اختر إجراءً واحداً لإدارة حالة الحجز بدل الأزرار المتفرقة.</p>
                <div class="reservation-status-card__field">
                  <label class="form-label" for="edit-res-status-action" data-i18n data-i18n-key="reservations.edit.statusCard.actionLabel">الإجراء</label>
                  <select id="edit-res-status-action" class="ui-select form-select">
                    <option value="" selected data-i18n data-i18n-key="reservations.edit.statusCard.actionPlaceholder">اختر الإجراء</option>
                  </select>
                </div>
                <button type="button" class="btn btn-outline-secondary w-100" id="edit-res-status-apply" data-i18n data-i18n-key="reservations.edit.statusCard.apply">تطبيق الحالة</button>
              </div>
              <input type="checkbox" class="visually-hidden" id="edit-res-cancelled" hidden>
            </div>

            <div class="col-12">
              <label class="form-label" data-i18n data-i18n-key="technicians.picker.selectedLabel">😎 طاقم العمل المشارك</label>
              <div id="edit-selected-technicians-list" class="selected-technicians-list"></div>
              <button type="button" class="btn btn-outline btn-primary mt-2" id="open-edit-technician-picker" data-i18n data-i18n-key="technicians.picker.editButton">🔁 تعديل الطاقم</button>
            </div>

            <div class="col-12">
              <div id="edit-res-summary" class="alert alert-info"></div>
            </div>

            <div class="col-12">
              <label class="form-label" data-i18n data-i18n-key="reservations.edit.labels.addEquipment">🎥 إضافة معدة</label>
              <div class="reservation-equipment-inputs reservation-equipment-inputs--single mb-2" data-equipment-section="single">
                <div class="reservation-equipment-field">
                  <input type="text" class="form-control" id="edit-res-equipment-barcode" placeholder="🔍 امسح أو أدخل الباركود ثم اضغط Enter" data-i18n data-i18n-placeholder-key="reservations.edit.placeholders.barcode">
                </div>
                <div class="reservation-equipment-field">
                  <input type="text" class="form-control" id="edit-res-equipment-description" list="edit-res-equipment-description-options" placeholder="🎥 اكتب اسم المعدة ثم اضغط Enter" data-i18n data-i18n-placeholder-key="reservations.edit.placeholders.description">
                  <datalist id="edit-res-equipment-description-options"></datalist>
                </div>
              </div>
              <div class="reservation-equipment-inputs reservation-equipment-inputs--package mb-2" data-equipment-section="package">
                <h6 class="reservation-equipment-subtitle" data-i18n data-i18n-key="reservations.create.equipment.subtitle.package">📦 إضافة حزمة معدات</h6>
                <div class="reservation-equipment-field reservation-equipment-field--package-select">
                  <select class="form-select" id="edit-res-package-select" data-i18n data-i18n-placeholder-key="reservations.edit.packages.placeholder">
                    <option value="" selected disabled data-i18n data-i18n-key="reservations.packages.selectOption">📦 اختر الحزمة</option>
                  </select>
                </div>
                <div class="reservation-equipment-field reservation-equipment-field--package-action">
                  <button type="button" class="btn btn-primary" id="edit-add-reservation-package" data-i18n data-i18n-key="reservations.create.packages.addButton">➕ إضافة الحزمة</button>
                </div>
                <div class="reservation-equipment-hint" id="edit-res-package-hint" data-i18n data-i18n-key="reservations.edit.packages.hint">حدد الحزمة ثم اضغط على الزر لإضافتها للحجز.</div>
              </div>
              <div class="table-responsive reservation-modal-table-shell reservation-edit-items-wrapper users-table-wrapper overflow-x-auto">
                <table class="table table-sm table-hover align-middle reservation-modal-table reservation-items-table">
                  <colgroup>
                    <col class="reservation-items-table__col reservation-items-table__col--item">
                    <col class="reservation-items-table__col reservation-items-table__col--quantity">
                    <col class="reservation-items-table__col reservation-items-table__col--days">
                    <col class="reservation-items-table__col reservation-items-table__col--unit-price">
                    <col class="reservation-items-table__col reservation-items-table__col--unit-cost">
                    <col class="reservation-items-table__col reservation-items-table__col--total">
                    <col class="reservation-items-table__col reservation-items-table__col--actions">
                  </colgroup>
                  <thead class="table-light">
                    <tr>
                      <th data-i18n data-i18n-key="reservations.equipment.table.item">المعدة</th>
                      <th data-i18n data-i18n-key="reservations.equipment.table.quantity">الكمية</th>
                      <th data-i18n data-i18n-key="reservations.equipment.table.days">الأيام</th>
                      <th data-i18n data-i18n-key="reservations.equipment.table.unitPrice">سعر الوحدة</th>
                      <th data-i18n data-i18n-key="reservations.equipment.table.unitCost">تكلفة الوحدة</th>
                      <th data-i18n data-i18n-key="reservations.equipment.table.total">الإجمالي</th>
                      <th data-i18n data-i18n-key="reservations.equipment.table.actions">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody id="edit-res-items">
                    <tr><td colspan="7" class="text-center" data-i18n data-i18n-key="reservations.edit.table.empty">لا توجد معدات</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
        <div class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer">
          <button type="button" class="btn modal-close-btn" data-bs-dismiss="modal" data-i18n data-i18n-key="actions.cancel">إلغاء</button>
          <button type="button" class="btn btn-primary" id="save-reservation-changes" data-i18n data-i18n-key="reservations.edit.actions.save">💾 حفظ التعديلات</button>
        </div>
      </div>
    </div>
  </div>
  `,
  selectTechniciansModal: `
  <div class="modal fade" id="selectTechniciansModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable crew-picker-modal__dialog">
      <div class="ui-modal__content modal-content crew-picker-modal">
        <div class="ui-modal__header modal-header crew-picker-modal__header">
          <h5 class="modal-title crew-picker-modal__title" data-i18n data-i18n-key="technicians.picker.modalTitle">😎 اختيار طاقم العمل</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق" data-i18n data-i18n-aria-label-key="actions.close"></button>
        </div>
        <div class="ui-modal__body modal-body crew-picker-modal__body">
          <div class="row g-3 crew-picker-layout">
            <div class="col-md-4 crew-picker-panel crew-picker-panel--positions">
              <label for="crew-position-search" class="form-label crew-picker-label" data-i18n data-i18n-key="technicians.picker.positions.label">🏷️ اختر المناصب</label>
              <p class="crew-picker-panel__hint" data-i18n data-i18n-key="technicians.picker.positions.hint">اختر المنصب أولًا ليظهر مباشرة في لوحة التعيين على اليمين.</p>
              <input type="text" class="ui-input form-control crew-picker-search" id="crew-position-search" placeholder="🔍 ابحث باسم المنصب..." data-i18n data-i18n-placeholder-key="technicians.picker.positions.search">
              <div id="crew-position-list" class="crew-picker-list" role="list"></div>
            </div>
            <div class="col-md-8 crew-assignment-column crew-picker-panel crew-picker-panel--assignments">
              <label class="form-label crew-picker-label" data-i18n data-i18n-key="technicians.picker.assignments.label">📋 المناصب المختارة</label>
              <p class="crew-picker-panel__hint crew-picker-panel__hint--assignments" data-i18n data-i18n-key="technicians.picker.assignments.hintVisible">بعد إضافة أي منصب من اليسار سيظهر هنا لتعيين عضو الطاقم وسعر العميل قبل المتابعة.</p>
              <div class="users-table-wrapper overflow-x-auto crew-assignment-table-shell">
                <table class="ui-table table table-hover users-table surface-table crew-assignment-table align-middle" id="crew-assignment-table">
                  <colgroup>
                    <col class="technician-picker-col-index">
                    <col class="technician-picker-col-position">
                    <col class="technician-picker-col-price">
                    <col class="technician-picker-col-member">
                    <col class="technician-picker-col-actions">
                  </colgroup>
                  <thead class="table-light">
                    <tr>
                      <th class="technician-picker-col-index">#</th>
                      <th class="technician-picker-col-position" data-i18n data-i18n-key="technicians.picker.assignments.position">👔 المنصب</th>
                      <th class="technician-picker-col-price" data-i18n data-i18n-key="technicians.picker.assignments.price">💼 سعر العميل</th>
                      <th class="technician-picker-col-member" data-i18n data-i18n-key="technicians.picker.assignments.member">😎 العضو المعين</th>
                      <th class="technician-picker-col-actions" data-i18n data-i18n-key="technicians.picker.assignments.actions">⚙️</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td colspan="5" class="text-center text-muted" data-i18n data-i18n-key="technicians.picker.noAssignments">لم يتم إضافة أي مناصب بعد</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="ui-modal__footer modal-footer crew-picker-modal__footer">
          <span class="text-muted me-auto crew-picker-selection-info" id="technician-picker-selection-info" data-i18n data-i18n-key="technicians.picker.selectionInfo">لم يتم اختيار أي عضو بعد</span>
          <button type="button" class="btn modal-close-btn crew-picker-cancel-btn" data-bs-dismiss="modal" data-i18n data-i18n-key="technicians.picker.actions.cancel">إلغاء</button>
          <button type="button" class="btn btn-primary reservation-primary-btn crew-picker-apply-btn" id="apply-technician-selection" data-i18n data-i18n-key="technicians.picker.actions.apply">تم</button>
        </div>
      </div>
    </div>
  </div>
  `,
  closeReservationModal: `
  <div class="modal fade customer-edit-modal reservation-shell-modal" id="closeReservationModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable customer-edit-modal__dialog reservation-shell-modal__dialog reservation-shell-modal__dialog--compact">
      <div class="ui-modal__content modal-content customer-edit-modal__content reservation-shell-modal__content">
        <div class="ui-modal__header modal-header customer-edit-modal__header reservation-shell-modal__header">
          <h5 class="modal-title" data-i18n data-i18n-key="reservations.closeModal.title">🔒 إغلاق الحجز</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق" data-i18n data-i18n-aria-label-key="actions.close"></button>
        </div>
        <div class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body">
          <p class="text-muted" data-i18n data-i18n-key="reservations.closeModal.subtitle">يرجى كتابة ملاحظة الإغلاق (اختياري).</p>
          <label class="form-label" for="close-reservation-notes" data-i18n data-i18n-key="reservations.closeModal.noteLabel">📝 ملاحظات الإغلاق</label>
          <textarea id="close-reservation-notes" class="ui-textarea form-control" rows="3" data-i18n data-i18n-placeholder-key="reservations.closeModal.notePlaceholder" placeholder="مثال: تم إعادة المعدات مبكراً..."></textarea>
        </div>
        <div class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer">
          <button type="button" class="btn btn-outline" id="close-reservation-cancel" data-bs-dismiss="modal" data-i18n data-i18n-key="reservations.closeModal.cancel">إلغاء</button>
          <button type="button" class="btn btn-primary" id="close-reservation-submit" data-i18n data-i18n-key="reservations.closeModal.confirm">🔒 إغلاق الحجز</button>
        </div>
      </div>
    </div>
  </div>
  `
};

const RESERVATION_MODAL_IDS = [
  'reservationDetailsModal',
  'editReservationModal',
  'closeReservationModal',
  'calendarReservationModal',
];

function syncReservationModalBackdropState() {
  if (typeof document === 'undefined') return;
  const isAnyReservationModalOpen = RESERVATION_MODAL_IDS.some((id) => {
    const modal = document.getElementById(id);
    return modal?.classList.contains('show');
  });
  document.body.classList.toggle('reservation-modal-open', isAnyReservationModalOpen);
}

function attachReservationModalBackdropLifecycle() {
  if (typeof document === 'undefined') return;
  RESERVATION_MODAL_IDS.forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal || modal.dataset.reservationBackdropLifecycleAttached === 'true') return;
    modal.addEventListener('show.bs.modal', () => {
      document.body.classList.add('reservation-modal-open');
    });
    modal.addEventListener('hidden.bs.modal', () => {
      syncReservationModalBackdropState();
    });
    modal.dataset.reservationBackdropLifecycleAttached = 'true';
  });
}

export function mountReservationModalsIfNeeded() {
  if (typeof document === 'undefined') return;
  Object.entries(MODAL_SNIPPETS).forEach(([id, markup]) => {
    if (document.getElementById(id)) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = markup;
    document.body.appendChild(wrapper);
  });
  attachReservationModalBackdropLifecycle();
  try {
    ensurePackagesCached();
  } catch (error) {
    console.warn('[reservations/modals] Failed to ensure packages cache', error);
  }
}

export default mountReservationModalsIfNeeded;
