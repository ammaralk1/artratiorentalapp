(function () {
  const page = document.body && document.body.getAttribute('data-page');
  if (page !== 'shop-cart') return;

  const CART_API_URL = '/backend/api/equipment-cart/index.php';
  const REQUEST_API_URL = '/backend/api/equipment-requests/index.php';

  const emptyEl = document.getElementById('cart-empty');
  const tableWrapEl = document.getElementById('cart-table-wrap');
  const tableBodyEl = document.getElementById('cart-table-body');
  const totalCountEl = document.getElementById('cart-total-count');
  const formEl = document.getElementById('cart-request-form');
  const sendBtn = document.getElementById('cart-send-btn');
  const nameInput = document.getElementById('cart-name');
  const emailInput = document.getElementById('cart-email');
  const phoneInput = document.getElementById('cart-phone');
  const notesInput = document.getElementById('cart-notes');
  if (!emptyEl || !tableWrapEl || !tableBodyEl || !totalCountEl || !formEl || !sendBtn) return;

  let cart = [];
  let isSending = false;

  function isArabic() {
    const lang = (document.documentElement.lang || '').toLowerCase();
    return lang.startsWith('ar') || document.body.dir === 'rtl';
  }

  function t(key, arFallback, enFallback) {
    const fallback = isArabic() ? arFallback : enFallback;
    if (typeof window.getArinoTranslation === 'function') {
      return window.getArinoTranslation(key, fallback);
    }
    return fallback;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeQty(value) {
    const qty = Number.parseInt(String(value || '').trim(), 10);
    if (!Number.isFinite(qty) || qty < 1) return 1;
    return qty;
  }

  function sanitizeItem(item) {
    if (!item || typeof item !== 'object') return null;
    const name = String(item.name || '').trim();
    if (!name) return null;
    return {
      item_key: String(item.item_key || '').trim(),
      name,
      image: String(item.image || '').trim(),
      category: String(item.category || '').trim(),
      subcategory: String(item.subcategory || '').trim(),
      qty: normalizeQty(item.qty),
    };
  }

  async function requestJson(url, method, body) {
    const options = {
      method,
      headers: {
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    };

    if (body !== undefined) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload || payload.ok !== true) {
      throw new Error((payload && payload.error) || 'Request failed');
    }
    return payload;
  }

  async function loadCartFromApi() {
    const payload = await requestJson(CART_API_URL, 'GET');
    const list = Array.isArray(payload.data) ? payload.data : [];
    cart = list.map(sanitizeItem).filter(Boolean);
    updateHeaderBadge();
  }

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + normalizeQty(item.qty), 0);
  }

  function updateHeaderBadge() {
    const total = getTotalItems();
    const badge = document.querySelector('.cs-header_cart_label');
    if (badge) {
      badge.textContent = String(total);
    }
    try {
      window.dispatchEvent(
        new CustomEvent('arino:cart-updated', {
          detail: { total },
        }),
      );
    } catch (e) {}
  }

  function getCategoryText(item) {
    const parts = [item.category, item.subcategory].filter(Boolean);
    return parts.length ? parts.join(' • ') : '-';
  }

  function getResultEl() {
    let resultEl = document.getElementById('cart-request-result');
    if (resultEl) return resultEl;
    resultEl = document.createElement('div');
    resultEl.id = 'cart-request-result';
    resultEl.className = 'cs-cart-request-result';
    resultEl.setAttribute('role', 'status');
    resultEl.setAttribute('aria-live', 'polite');
    formEl.appendChild(resultEl);
    return resultEl;
  }

  function showResult(message, type) {
    const resultEl = getResultEl();
    resultEl.className = `cs-cart-request-result is-${type || 'info'}`;
    resultEl.textContent = message;
  }

  function clearResult() {
    const resultEl = document.getElementById('cart-request-result');
    if (!resultEl) return;
    resultEl.textContent = '';
    resultEl.className = 'cs-cart-request-result';
  }

  function setSendButtonState() {
    sendBtn.disabled = isSending || cart.length === 0;
    sendBtn.textContent = isSending
      ? t('cart_send_wait', 'جاري الإرسال...', 'Sending...')
      : t('cart_send_button', 'إرسال الطلب', 'Send Request');
  }

  function renderCart() {
    tableBodyEl.innerHTML = '';

    const hasItems = cart.length > 0;
    emptyEl.style.display = hasItems ? 'none' : 'block';
    tableWrapEl.style.display = hasItems ? '' : 'none';
    totalCountEl.textContent = String(getTotalItems());

    if (hasItems) {
      const qtyIncreaseAria = t('cart_qty_increase_aria', 'زيادة الكمية', 'Increase quantity');
      const qtyDecreaseAria = t('cart_qty_decrease_aria', 'تقليل الكمية', 'Decrease quantity');
      const removeAria = t('cart_remove_aria', 'حذف العنصر', 'Remove item');

      cart.forEach((item, index) => {
        const tr = document.createElement('tr');
        const safeName = escapeHtml(item.name);
        const safeCategory = escapeHtml(getCategoryText(item));
        const safeImage = escapeHtml(item.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACw=');
        const safeQty = normalizeQty(item.qty);

        tr.dataset.cartIndex = String(index);
        tr.dataset.itemKey = item.item_key || '';
        tr.innerHTML = `
          <td>
            <div class="cs-cart_table_media">
              <img src="${safeImage}" alt="${safeName}">
              <h3>${safeName}</h3>
            </div>
          </td>
          <td>${safeCategory}</td>
          <td>
            <div class="cs-quantity">
              <input type="number" class="cs-quantity_input js-cart-qty" min="1" step="1" value="${safeQty}" inputmode="numeric" pattern="[0-9]*">
              <button type="button" class="cs-quantity_button cs-cart-inc js-cart-inc" aria-label="${escapeHtml(qtyIncreaseAria)}">
                <i class="fa-solid fa-angle-up"></i>
              </button>
              <button type="button" class="cs-quantity_button cs-cart-dec js-cart-dec" aria-label="${escapeHtml(qtyDecreaseAria)}">
                <i class="fa-solid fa-angle-down"></i>
              </button>
            </div>
          </td>
          <td class="text-center">
            <button type="button" class="cs-cart-table-close js-cart-remove" aria-label="${escapeHtml(removeAria)}: ${safeName}">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </td>
        `;
        tableBodyEl.appendChild(tr);
      });
    }

    updateHeaderBadge();
    setSendButtonState();
  }

  async function updateQtyByIndex(index, qty) {
    if (!Number.isInteger(index) || index < 0 || index >= cart.length) return;
    const itemKey = String(cart[index].item_key || '');
    if (!itemKey) return;

    await requestJson(CART_API_URL, 'PATCH', {
      item_key: itemKey,
      qty: normalizeQty(qty),
    });
    await loadCartFromApi();
    renderCart();
  }

  async function removeByIndex(index) {
    if (!Number.isInteger(index) || index < 0 || index >= cart.length) return;
    const itemKey = String(cart[index].item_key || '');
    if (!itemKey) return;

    await requestJson(CART_API_URL, 'DELETE', {
      item_key: itemKey,
    });
    await loadCartFromApi();
    renderCart();
  }

  function extractRowIndex(target) {
    const row = target.closest('tr[data-cart-index]');
    if (!row) return -1;
    const index = Number.parseInt(row.dataset.cartIndex || '', 10);
    return Number.isInteger(index) ? index : -1;
  }

  function handleCartUpdateError(error) {
    console.error('Cart update failed', error);
    showResult(
      t('cart_update_error', 'تعذر تحديث السلة. حاول مرة أخرى.', 'Unable to update cart. Please try again.'),
      'error',
    );
  }

  function bindTableEvents() {
    tableBodyEl.addEventListener('click', async function (event) {
      const index = extractRowIndex(event.target);
      if (index < 0) return;

      if (event.target.closest('.js-cart-remove')) {
        event.preventDefault();
        try {
          await removeByIndex(index);
        } catch (error) {
          handleCartUpdateError(error);
        }
        return;
      }

      if (event.target.closest('.js-cart-inc')) {
        event.preventDefault();
        try {
          await updateQtyByIndex(index, normalizeQty(cart[index].qty) + 1);
        } catch (error) {
          handleCartUpdateError(error);
        }
        return;
      }

      if (event.target.closest('.js-cart-dec')) {
        event.preventDefault();
        try {
          await updateQtyByIndex(index, Math.max(1, normalizeQty(cart[index].qty) - 1));
        } catch (error) {
          handleCartUpdateError(error);
        }
      }
    });

    const syncInput = async (target) => {
      const input = target.closest('.js-cart-qty');
      if (!input) return;
      const index = extractRowIndex(input);
      if (index < 0) return;
      try {
        await updateQtyByIndex(index, input.value);
      } catch (error) {
        handleCartUpdateError(error);
      }
    };

    tableBodyEl.addEventListener('change', async function (event) {
      await syncInput(event.target);
    });
    tableBodyEl.addEventListener(
      'blur',
      async function (event) {
        await syncInput(event.target);
      },
      true,
    );
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  }

  function collectFormData() {
    const data = {
      name: String((nameInput && nameInput.value) || '').trim(),
      email: String((emailInput && emailInput.value) || '').trim(),
      phone: String((phoneInput && phoneInput.value) || '').trim(),
      notes: String((notesInput && notesInput.value) || '').trim(),
    };

    if (!data.name || !data.email || !data.phone) {
      showResult(
        t(
          'cart_validation_required',
          'يرجى تعبئة الاسم والبريد الإلكتروني ورقم الجوال.',
          'Please fill name, email, and phone.',
        ),
        'error',
      );
      return null;
    }

    if (!isValidEmail(data.email)) {
      showResult(
        t('cart_validation_email', 'يرجى إدخال بريد إلكتروني صحيح.', 'Please enter a valid email.'),
        'error',
      );
      return null;
    }

    return data;
  }

  async function sendRequest() {
    if (isSending) return;
    if (!cart.length) {
      showResult(
        t('cart_send_empty', 'السلة فارغة، أضف معدات أولاً.', 'Your list is empty, add equipment first.'),
        'error',
      );
      return;
    }

    const formData = collectFormData();
    if (!formData) return;

    isSending = true;
    setSendButtonState();
    clearResult();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes || '',
      language: isArabic() ? 'ar' : 'en',
    };

    try {
      const response = await requestJson(REQUEST_API_URL, 'POST', payload);
      const data = response.data || {};
      const requestCode = String(data.request_code || '').trim();

      const baseSuccess = t(
        'cart_send_success',
        'تم إرسال طلبك بنجاح. سنتواصل معك لتأكيد الحجز أو الاعتذار عن عدم التوفر.',
        'Your request was sent successfully. We will contact you to confirm or decline availability.',
      );
      const fallbackEmailNote = t(
        'cart_send_success_no_email',
        'تم حفظ الطلب لكن فشل إشعار البريد تلقائيًا، سنراجعه يدويًا.',
        'Request saved, but email notification failed and will be reviewed manually.',
      );
      const codePrefix = t('cart_request_code_prefix', 'رقم الطلب', 'Request code');
      const emailWarning = data.email_sent === false ? ` ${fallbackEmailNote}` : '';
      showResult(
        requestCode
          ? `${baseSuccess}${emailWarning} (${codePrefix}: ${requestCode})`
          : `${baseSuccess}${emailWarning}`,
        'success',
      );
      formEl.reset();
      await loadCartFromApi();
      renderCart();
    } catch (error) {
      showResult(
        error && error.message
          ? error.message
          : t(
              'cart_send_error',
              'فشل إرسال الطلب. حاول مرة أخرى أو تواصل معنا مباشرة.',
              'Failed to send request. Please try again or contact us directly.',
            ),
        'error',
      );
    } finally {
      isSending = false;
      setSendButtonState();
    }
  }

  bindTableEvents();
  sendBtn.addEventListener('click', function (event) {
    event.preventDefault();
    sendRequest();
  });

  formEl.addEventListener('input', function () {
    clearResult();
  });

  const langObserver = new MutationObserver(() => {
    renderCart();
  });
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir'],
  });

  loadCartFromApi()
    .then(() => renderCart())
    .catch((error) => {
      console.error('Cart preload failed', error);
      showResult(
        t(
          'cart_load_error',
          'تعذر تحميل السلة الآن. حاول تحديث الصفحة.',
          'Unable to load cart right now. Please refresh the page.',
        ),
        'error',
      );
      cart = [];
      renderCart();
    });
})();
