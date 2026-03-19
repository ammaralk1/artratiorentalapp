(function () {
  const page = document.body && document.body.getAttribute('data-page');
  if (page !== 'shop') return;

  const excelUrls = [
    '/assets/data/equipment-all-20251130-1640.xlsx',
    '/assets/data/equipment.xlsx',
  ];
  const grid = document.getElementById('equipment-grid');
  const countEl = document.getElementById('equipment-count');
  const categoryList = document.getElementById('equipment-category-list');
  const subcategoryList = document.getElementById('equipment-subcategory-list');
  const searchInput = document.querySelector('.cs-shop_search_input');
  const paginationEl = document.getElementById('equipment-pagination');
  if (!grid || !countEl) return;

  const CART_API_URL = '/backend/api/equipment-cart/index.php';
  const SHOP_LAST_PAGE_KEY = 'shopLastPage';
  const pageSize = 15;
  let items = [];
  let itemsLoaded = false;
  let cart = [];
  let activeToastHideTimer = null;
  const isReloadNavigation = () => {
    try {
      const navEntries = performance.getEntriesByType
        ? performance.getEntriesByType('navigation')
        : [];
      if (navEntries && navEntries[0] && navEntries[0].type) {
        return navEntries[0].type === 'reload';
      }
    } catch (e) {}
    try {
      return performance.navigation && performance.navigation.type === 1;
    } catch (e) {}
    return false;
  };

  const loadLastPage = () => {
    if (!isReloadNavigation()) {
      try {
        sessionStorage.removeItem(SHOP_LAST_PAGE_KEY);
      } catch (e) {}
      return 1;
    }
    try {
      const raw = sessionStorage.getItem(SHOP_LAST_PAGE_KEY);
      if (!raw) return 1;
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed < 1) return 1;
      return Math.floor(parsed);
    } catch (e) {
      return 1;
    }
  };
  const initialPage = loadLastPage();
  const state = {
    category: 'all',
    subcategory: [],
    query: '',
    page: initialPage,
  };
  const isArabic = () =>
    (document.documentElement.lang || '').toLowerCase().startsWith('ar') ||
    (document.body && document.body.dir === 'rtl');

  const t = (key, arFallback, enFallback) => {
    const fallback = isArabic() ? arFallback : enFallback;
    if (typeof window.getArinoTranslation === 'function') {
      return window.getArinoTranslation(key, fallback);
    }
    return fallback;
  };

  function getToastHost() {
    let host = document.getElementById('cs-shop-toast-host');
    if (host) return host;
    host = document.createElement('div');
    host.id = 'cs-shop-toast-host';
    host.className = 'cs-shop-toast-host';
    document.body.appendChild(host);
    return host;
  }

  function showToast(message, type = 'success') {
    const host = getToastHost();
    if (activeToastHideTimer) {
      clearTimeout(activeToastHideTimer);
      activeToastHideTimer = null;
    }
    host.innerHTML = '';
    const toast = document.createElement('div');
    toast.className = `cs-shop-toast cs-shop-toast--${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    host.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });
    activeToastHideTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 180);
      activeToastHideTimer = null;
    }, 2200);
  }

  const keyGroups = {
    image: ['Image', 'Image Link', 'الصورة', 'لينك الصورة', 'رابط الصورة'],
    name: ['Product Name', 'Name', 'اسم المنتج', 'Description', 'الوصف'],
    category: ['Category', 'القسم', 'Main Category', 'القسم الرئيسي'],
    subcategory: ['Subcategory', 'Sub Category', 'القسم الثانوي'],
  };
  const cloudflareBase = 'https://assets.art-ratio.com/';
  const cloudflarePngFolderPrimary = 'png2';
  const cloudflarePngFolderSecondary = 'png';
  const cloudflareOutsourceFolder = 'outsource';

  function pick(row, keys) {
    for (const key of keys) {
      if (row[key] && String(row[key]).trim()) return String(row[key]).trim();
    }
    return '';
  }

  function normalizeRow(row) {
    const values = Object.values(row || {});
    const fallbackCategory = String(values[0] || '').trim();
    const fallbackSubcategory = String(values[1] || '').trim();
    const fallbackName = String(values[2] || '').trim();
    const fallbackImage = String(values[7] || '').trim();

    const rawImage = pick(row, keyGroups.image) || fallbackImage;
    const imageCandidates = buildImageCandidates(rawImage);
    const rawName = pick(row, keyGroups.name) || fallbackName;
    const normalizedName = normalizeEquipmentName(rawName);
    const renamedName =
      renamedEquipmentNames.get(normalizedName) || rawName;

    return {
      name: renamedName,
      image: imageCandidates[0] || '',
      imageCandidates: imageCandidates.slice(1),
      imageOriginal: rawImage,
      category: pick(row, keyGroups.category) || fallbackCategory,
      subcategory: pick(row, keyGroups.subcategory) || fallbackSubcategory,
    };
  }

  function buildImageCandidates(input) {
    const raw = String(input || '').trim();
    if (!raw) return [];

    // Keep already-migrated Cloudflare URLs only when they are PNG in allowed folders.
    if (
      /^https?:\/\/assets\.art-ratio\.com\/(?:png2|png|outsource)\/[^?#]+\.png(?:\?.*)?$/i.test(
        raw
      )
    ) {
      return [raw];
    }

    let fileName = raw;
    try {
      const parsed = new URL(raw, window.location.origin);
      const parts = (parsed.pathname || '').split('/').filter(Boolean);
      fileName = parts[parts.length - 1] || raw;
    } catch (e) {}

    try {
      fileName = decodeURIComponent(fileName);
    } catch (e) {}

    const stem = fileName.replace(/\.[^.]+$/, '').trim();
    const candidates = [];
    const pushCandidate = (url) => {
      if (!url) return;
      if (!candidates.includes(url)) candidates.push(url);
    };

    if (stem) {
      // Allowed sources: png2, png, then outsource (PNG only).
      pushCandidate(
        cloudflareBase + cloudflarePngFolderPrimary + '/' + encodeURIComponent(stem) + '.png'
      );
      pushCandidate(
        cloudflareBase + cloudflarePngFolderSecondary + '/' + encodeURIComponent(stem) + '.png'
      );
      pushCandidate(
        cloudflareBase + cloudflareOutsourceFolder + '/' + encodeURIComponent(stem) + '.png'
      );
    }

    // Also allow existing .png names under png2/png/outsource.
    if (/\.png$/i.test(fileName)) {
      pushCandidate(
        cloudflareBase + cloudflarePngFolderPrimary + '/' + encodeURIComponent(fileName)
      );
      pushCandidate(
        cloudflareBase + cloudflarePngFolderSecondary + '/' + encodeURIComponent(fileName)
      );
      pushCandidate(
        cloudflareBase + cloudflareOutsourceFolder + '/' + encodeURIComponent(fileName)
      );
    }
    return candidates;
  }

  function uniqueList(arr) {
    return [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function normalizeEquipmentName(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  const excludedEquipmentNames = new Set(
    [
      'V-Mount PK',
      'Sony a7Siii Charger',
      'Canon Battary Charger',
      'Sony FX6 Charger',
      '3PCS RavPower Battary Charger',
      'V-Mount Charger',
      'Sound PK',
      'Reven Eye',
      'Manfrotto Fast legs',
      'Tilta Nucleus-N',
      'Manfrotto Legs 190',
      'Manfrotto Legs 055',
      'Strip Box 02 35X150',
      'Sony FX6 Charger 3PCS',
      'RavPower Battary Charger',
      'Domy Battary for Cine 7',
      'Benro Legs A673',
    ].map(normalizeEquipmentName),
  );

  const renamedEquipmentNames = new Map([
    [
      normalizeEquipmentName('Domy Battary for Ninja V+'),
      'Dummy Battery for Ninja / SmallHD',
    ],
  ]);

  function dedupeItemsByName(list) {
    const byName = new Map();
    list.forEach((item) => {
      const key = normalizeEquipmentName(item && item.name);
      if (!key) return;
      if (excludedEquipmentNames.has(key)) return;
      const existing = byName.get(key);
      if (!existing) {
        byName.set(key, item);
        return;
      }
      // Keep first by default; replace only if existing has no usable image.
      if (!existing.image && item.image) {
        byName.set(key, item);
      }
    });
    return Array.from(byName.values());
  }

  function renderFilters() {
    const categories = uniqueList(items.map((i) => i.category));
    const subs = uniqueList(items.map((i) => i.subcategory));

    if (categoryList) {
      categoryList.innerHTML = '';
      categoryList.appendChild(makeFilterItem('All Categories', 'all', 'category'));
      categories.forEach((cat) => {
        categoryList.appendChild(makeFilterItem(cat, cat, 'category'));
      });
    }

    if (subcategoryList) {
      subcategoryList.innerHTML = '';
      subcategoryList.appendChild(makeFilterItem('All', 'all', 'subcategory'));
      subs.forEach((sub) => {
        subcategoryList.appendChild(makeFilterItem(sub, sub, 'subcategory'));
      });
    }
  }

  function makeFilterItem(label, value, type) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = label;
    a.dataset.filterValue = value;
    a.dataset.filterType = type;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      if (type === 'subcategory') {
        toggleSubcategory(value);
      } else {
        state[type] = value;
        state.page = 1;
        setActiveFilter(type, value);
      }
      applyFilters();
    });
    li.appendChild(a);
    return li;
  }

  function setActiveFilter(type, value) {
    const list = type === 'category' ? categoryList : subcategoryList;
    if (!list) return;
    list.querySelectorAll('a').forEach((a) => {
      if (type === 'subcategory') {
        const val = a.dataset.filterValue;
        const isAll = val === 'all';
        const active =
          (isAll && state.subcategory.length === 0) ||
          (!isAll && state.subcategory.includes(val));
        a.classList.toggle('active', active);
      } else {
        a.classList.toggle('active', a.dataset.filterValue === value);
      }
    });
  }

  function toggleSubcategory(value) {
    if (value === 'all') {
      state.subcategory = [];
      setActiveFilter('subcategory', 'all');
      state.page = 1;
      return;
    }
    const exists = state.subcategory.includes(value);
    state.subcategory = exists
      ? state.subcategory.filter((v) => v !== value)
      : [...state.subcategory, value];
    setActiveFilter('subcategory', value);
    state.page = 1;
  }

  function renderGrid(list) {
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = `<div class="col-12"><p>${isArabic() ? 'لا توجد معدات مطابقة.' : 'No equipment found.'}</p></div>`;
      return;
    }
    list.forEach((item) => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-sm-6';
      const inCart = cart.some((c) => c.name === item.name && c.image === item.image);
      const qtyLabel = t('shop_qty_label', 'الكمية', 'Qty');
      const qtyControlsAria = t('shop_qty_controls_aria', 'التحكم في الكمية', 'Quantity controls');
      const qtyDecreaseAria = t('shop_qty_decrease_aria', 'تقليل الكمية', 'Decrease quantity');
      const qtyIncreaseAria = t('shop_qty_increase_aria', 'زيادة الكمية', 'Increase quantity');
      const addToRequestText = t('shop_add_to_request', 'أضف إلى قائمة الطلب', 'Add to request list');
      const addedText = t('shop_added', 'تمت الإضافة', 'Added');
      col.innerHTML = `
        <div class="cs-product_card cs_style_1">
          <div class="cs-product_thumb">
            <img src="${item.image}" alt="${item.name}" data-fallback-src='${JSON.stringify(item.imageCandidates || [])}'>
          </div>
          <div class="cs-product_info">
            <h2 class="cs-product_title"><span>${item.name}</span></h2>
            <div class="cs-product_meta d-flex align-items-center justify-content-between gap-2 mb-2">
              <p class="cs-product_category m-0">${item.category || ''}${item.subcategory ? ' • ' + item.subcategory : ''}</p>
              <div class="d-flex align-items-center gap-2 cs-qty-wrap">
                <label class="m-0 cs-qty-label">${qtyLabel}</label>
                <div class="cs-qty-stepper" role="group" aria-label="${qtyControlsAria}">
                  <button type="button" class="cs-qty-step cs-qty-step--minus" aria-label="${qtyDecreaseAria}">-</button>
                  <input type="number" class="cs-qty-input form-control" value="${getCartQty(item)}" min="1" step="1" inputmode="numeric" pattern="[0-9]*">
                  <button type="button" class="cs-qty-step cs-qty-step--plus" aria-label="${qtyIncreaseAria}">+</button>
                </div>
              </div>
            </div>
            <button class="cs-btn cs-style1 cs-add-to-list cs-add-compact" type="button" aria-label="${addToRequestText}: ${item.name}">
              ${inCart ? addedText : addToRequestText}
            </button>
          </div>
        </div>
        <div class="cs-height_55 cs-height_lg_25"></div>
      `;
      const btn = col.querySelector('.cs-add-to-list');
      const qtyInput = col.querySelector('.cs-qty-input');
      const qtyMinusBtn = col.querySelector('.cs-qty-step--minus');
      const qtyPlusBtn = col.querySelector('.cs-qty-step--plus');
      const img = col.querySelector('img[data-fallback-src]');
      const normalizeQty = () => {
        const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
        qtyInput.value = qty;
        return qty;
      };
      if (qtyMinusBtn) {
        qtyMinusBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const current = normalizeQty();
          qtyInput.value = Math.max(1, current - 1);
        });
      }
      if (qtyPlusBtn) {
        qtyPlusBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const current = normalizeQty();
          qtyInput.value = current + 1;
        });
      }
      qtyInput.addEventListener('change', normalizeQty);
      qtyInput.addEventListener('blur', normalizeQty);
      // Keep quantity behavior consistent across desktop/mobile:
      // stepper buttons only, without manual typing.
      qtyInput.readOnly = true;
      qtyInput.setAttribute('readonly', 'readonly');
      qtyInput.addEventListener('keydown', (e) => e.preventDefault());
      qtyInput.addEventListener('input', () => {
        normalizeQty();
      });
      qtyInput.addEventListener('wheel', (e) => {
        e.preventDefault();
      }, { passive: false });
      if (img) {
        img.addEventListener('error', () => {
          let remaining = [];
          try {
            remaining = JSON.parse(img.getAttribute('data-fallback-src') || '[]');
          } catch (e) {}
          if (!Array.isArray(remaining) || !remaining.length) return;
          const nextSrc = remaining.shift();
          img.setAttribute('data-fallback-src', JSON.stringify(remaining));
          if (nextSrc && img.getAttribute('src') !== nextSrc) {
            img.setAttribute('src', nextSrc);
          }
        });
      }
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const qty = normalizeQty();
        btn.disabled = true;
        try {
          const isNewItem = await addToCart(item, qty);
          if (isNewItem) {
            btn.textContent = t('shop_added', 'تمت الإضافة', 'Added');
            showToast(
              t('shop_toast_added', 'تمت إضافة المعدة إلى السلة', 'Equipment added to cart'),
              'success',
            );
          } else {
            btn.textContent = t('shop_updated', 'تم التحديث', 'Updated');
            showToast(
              t('shop_toast_updated', 'تم تحديث الكمية في السلة', 'Cart quantity updated'),
              'info',
            );
          }
        } catch (error) {
          console.error('Cart update failed', error);
          showToast(
            t(
              'shop_toast_error',
              'تعذر تحديث السلة. حاول مرة أخرى.',
              'Unable to update cart. Please try again.',
            ),
            'error',
          );
        } finally {
          btn.disabled = false;
        }
      });
      grid.appendChild(col);
    });
  }

  async function requestCart(method, body) {
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

    const response = await fetch(CART_API_URL, options);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload || payload.ok !== true) {
      throw new Error((payload && payload.error) || 'Cart request failed');
    }
    return payload;
  }

  function normalizeCartItem(item) {
    if (!item || typeof item !== 'object') return null;
    const name = String(item.name || '').trim();
    if (!name) return null;
    return {
      item_key: String(item.item_key || '').trim(),
      name,
      image: String(item.image || '').trim(),
      category: String(item.category || '').trim(),
      subcategory: String(item.subcategory || '').trim(),
      qty: Math.max(1, parseInt(item.qty, 10) || 1),
    };
  }

  async function loadCartFromApi() {
    const payload = await requestCart('GET');
    const list = Array.isArray(payload.data) ? payload.data : [];
    cart = list.map(normalizeCartItem).filter(Boolean);
    updateCartCount();
  }

  function updateCartCount() {
    const badge = document.querySelector('.cs-header_cart_label');
    const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    if (badge) {
      if (badge.textContent !== String(total)) {
        badge.textContent = total;
      }
    }
    try {
      window.dispatchEvent(
        new CustomEvent('arino:cart-updated', {
          detail: { total },
        }),
      );
    } catch (e) {}
  }

  function getCartQty(item) {
    const found = cart.find((c) => c.name === item.name && c.image === item.image);
    return found ? found.qty || 1 : 1;
  }

  async function addToCart(item, qty) {
    const found = cart.find((c) => c.name === item.name && c.image === item.image);
    const payload = {
      item_key: '',
      name: item.name,
      image: item.image,
      category: item.category,
      subcategory: item.subcategory,
      qty: Math.max(1, parseInt(qty, 10) || 1),
    };
    await requestCart('POST', payload);
    await loadCartFromApi();
    return !found;
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    if (totalPages <= 1) {
      paginationEl.style.display = 'none';
      return;
    }
    paginationEl.style.display = '';

    const makeBtn = (label, page, disabled = false, active = false) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = label;
      a.className = 'cs-pagination_item cs-center';
      if (disabled) a.classList.add('disabled');
      if (active) a.classList.add('active');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        if (disabled) return;
        state.page = page;
        applyFilters();
        scrollToGridTop();
      });
      li.appendChild(a);
      return li;
    };

    paginationEl.appendChild(
      makeBtn(isArabic() ? 'السابق' : 'Prev', Math.max(1, state.page - 1), state.page === 1)
    );
    const windowSize = 3;
    let startPage = Math.max(1, state.page);
    let endPage = Math.min(totalPages, startPage + windowSize - 1);
    // Keep 3 visible pages whenever possible near the tail.
    if (endPage - startPage + 1 < windowSize) {
      startPage = Math.max(1, endPage - windowSize + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      paginationEl.appendChild(makeBtn(String(i), i, false, i === state.page));
    }
    paginationEl.appendChild(
      makeBtn(isArabic() ? 'التالي' : 'Next', Math.min(totalPages, state.page + 1), state.page === totalPages)
    );
  }

  function persistLastPage() {
    try {
      sessionStorage.setItem(SHOP_LAST_PAGE_KEY, String(state.page));
    } catch (e) {}
  }

  function scrollToGridTop() {
    const target = grid || countEl;
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function applyFilters() {
    if (!itemsLoaded) return;
    const q = state.query.toLowerCase();
    const filtered = items.filter((item) => {
      if (state.category !== 'all' && item.category !== state.category) return false;
      if (state.subcategory.length && !state.subcategory.includes(item.subcategory)) return false;
      if (q) {
        const hay = `${item.name} ${item.category} ${item.subcategory}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);
    renderGrid(pageItems);
    if (total === 0) {
      countEl.textContent = isArabic() ? 'لا توجد عناصر' : 'No items found';
    } else {
      countEl.textContent = isArabic()
        ? `عرض ${start + 1}-${Math.min(total, start + pageSize)} من ${total} عنصر`
        : `Showing ${start + 1}-${Math.min(total, start + pageSize)} of ${total} items`;
    }
    renderPagination(totalPages);
    persistLastPage();
  }

  async function loadExcel() {
    try {
      let buf = null;
      let loadedFrom = '';
      for (const url of excelUrls) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) continue;
          buf = await res.arrayBuffer();
          loadedFrom = url;
          break;
        } catch (e) {}
      }

      if (!buf) {
        throw new Error(`Equipment file request failed for all sources: ${excelUrls.join(', ')}`);
      }

      const wb = XLSX.read(buf, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      items = dedupeItemsByName(rows.map(normalizeRow).filter((i) => i.name));
      itemsLoaded = true;
      if (loadedFrom) {
        console.info('Equipment loaded from', loadedFrom, 'items:', items.length);
      }
      renderFilters();
      setActiveFilter('category', state.category);
      setActiveFilter('subcategory', state.subcategory);
      applyFilters();
    } catch (err) {
      console.error('Equipment load failed', err);
      countEl.textContent = isArabic() ? 'فشل تحميل ملف المعدات.' : 'Failed to load equipment file.';
    }
  }

  if (searchInput) {
    searchInput.value = state.query;
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value.trim().toLowerCase();
      state.page = 1;
      applyFilters();
    });
  }

  // Re-render texts when language attribute changes (toggle Arabic/English)
  const langObserver = new MutationObserver(() => {
    if (!itemsLoaded) return;
    applyFilters();
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

  (async () => {
    try {
      await loadCartFromApi();
    } catch (error) {
      console.error('Cart preload failed', error);
      cart = [];
      updateCartCount();
    }
    loadExcel();
  })();
})();
