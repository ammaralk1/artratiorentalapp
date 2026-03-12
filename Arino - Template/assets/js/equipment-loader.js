(function () {
  const page = document.body && document.body.getAttribute('data-page');
  if (page !== 'shop') return;

  const excelUrl = 'assets/data/equipment.xlsx';
  const grid = document.getElementById('equipment-grid');
  const countEl = document.getElementById('equipment-count');
  const categoryList = document.getElementById('equipment-category-list');
  const subcategoryList = document.getElementById('equipment-subcategory-list');
  const searchInput = document.querySelector('.cs-shop_search_input');
  const paginationEl = document.getElementById('equipment-pagination');
  if (!grid || !countEl) return;

  const CART_KEY = 'equipmentCart';
  const pageSize = 15;
  let items = [];
  let cart = loadCart();
  const state = {
    category: 'all',
    subcategory: [],
    query: '',
    page: 1,
  };
  const isArabic = () =>
    (document.documentElement.lang || '').toLowerCase().startsWith('ar') ||
    (document.body && document.body.dir === 'rtl');

  const keyGroups = {
    image: ['Image', 'Image Link', 'الصورة', 'لينك الصورة', 'رابط الصورة'],
    name: ['Product Name', 'Name', 'اسم المنتج'],
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
    const rawImage = pick(row, keyGroups.image);
    const imageCandidates = buildImageCandidates(rawImage);
    return {
      name: pick(row, keyGroups.name),
      image: imageCandidates[0] || rawImage,
      imageCandidates: imageCandidates.slice(1),
      imageOriginal: rawImage,
      category: pick(row, keyGroups.category),
      subcategory: pick(row, keyGroups.subcategory),
    };
  }

  function buildImageCandidates(input) {
    const raw = String(input || '').trim();
    if (!raw) return [];

    // Keep already-migrated Cloudflare PNG URLs untouched.
    if (/^https?:\/\/assets\.art-ratio\.com\/.*\.png(?:\?.*)?$/i.test(raw)) return [raw];

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
      col.innerHTML = `
        <div class="cs-product_card cs_style_1">
          <div class="cs-product_thumb">
            <img src="${item.image}" alt="${item.name}" data-fallback-src='${JSON.stringify(item.imageCandidates || [])}'>
          </div>
          <div class="cs-product_info">
            <h2 class="cs-product_title"><span>${item.name}</span></h2>
            <div class="cs-product_meta d-flex align-items-center justify-content-between gap-2 mb-2">
              <p class="cs-product_category m-0">${item.category || ''}${item.subcategory ? ' • ' + item.subcategory : ''}</p>
              <div class="d-flex align-items-center gap-2">
                <label class="m-0 cs-qty-label">${isArabic() ? 'الكمية' : 'Qty'}</label>
                <input type="number" class="cs-qty-input form-control" value="${getCartQty(item)}" min="1">
              </div>
            </div>
            <button class="cs-btn cs-style1 cs-add-to-list cs-add-compact" type="button" aria-label="Add ${item.name} to request list">
              ${inCart ? (isArabic() ? 'تمت الإضافة' : 'Added') : isArabic() ? 'أضف إلى قائمة الطلب' : 'Add to request list'}
            </button>
          </div>
        </div>
        <div class="cs-height_55 cs-height_lg_25"></div>
      `;
      const btn = col.querySelector('.cs-add-to-list');
      const qtyInput = col.querySelector('.cs-qty-input');
      const img = col.querySelector('img[data-fallback-src]');
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
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
        qtyInput.value = qty;
        if (addToCart(item, qty)) {
          btn.textContent = 'Added';
        }
      });
      grid.appendChild(col);
    });
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const badge = document.querySelector('.cs-header_cart_label');
    if (badge) {
      const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
      if (badge.textContent !== String(total)) {
        badge.textContent = total;
      }
    }
  }

  function getCartQty(item) {
    const found = cart.find((c) => c.name === item.name && c.image === item.image);
    return found ? found.qty || 1 : 1;
  }

  function addToCart(item, qty) {
    const found = cart.find((c) => c.name === item.name && c.image === item.image);
    if (found) {
      found.qty = qty;
      saveCart();
      return false;
    }
    cart.push({ ...item, qty });
    saveCart();
    return true;
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
    for (let i = 1; i <= totalPages; i++) {
      paginationEl.appendChild(makeBtn(String(i), i, false, i === state.page));
    }
    paginationEl.appendChild(
      makeBtn(isArabic() ? 'التالي' : 'Next', Math.min(totalPages, state.page + 1), state.page === totalPages)
    );
  }

  function scrollToGridTop() {
    const target = grid || countEl;
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function applyFilters() {
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
  }

  async function loadExcel() {
    try {
      const res = await fetch(excelUrl);
      if (!res.ok) {
        throw new Error(`Equipment file request failed (${res.status}) for ${excelUrl}`);
      }
      const buf = await res.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      items = rows.map(normalizeRow).filter((i) => i.name && i.image);
      renderFilters();
      setActiveFilter('category', state.category);
      setActiveFilter('subcategory', state.subcategory);
      applyFilters();
      updateCartCount();
    } catch (err) {
      console.error('Equipment load failed', err);
      countEl.textContent = isArabic() ? 'فشل تحميل ملف المعدات.' : 'Failed to load equipment file.';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value.trim().toLowerCase();
      state.page = 1;
      applyFilters();
    });
  }

  // Re-render texts when language attribute changes (toggle Arabic/English)
  const langObserver = new MutationObserver(() => applyFilters());
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

  loadExcel();
})();
