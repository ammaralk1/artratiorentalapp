(function () {
  const CART_KEY = 'equipmentCart';
  const tableWrap = document.getElementById('cart-table-wrap');
  const tableBody = document.getElementById('cart-table-body');
  const emptyEl = document.getElementById('cart-empty');
  const emptyDefault = emptyEl ? emptyEl.innerHTML : '';
  const totalEl = document.getElementById('cart-total-count');
  const sendBtn = document.getElementById('cart-send-btn');
  const nameInput = document.getElementById('cart-name');
  const emailInput = document.getElementById('cart-email');
  const phoneInput = document.getElementById('cart-phone');
  const notesInput = document.getElementById('cart-notes');

  if (!tableBody || !sendBtn) return;

  let cart = loadCart();

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
    updateHeaderCount();
  }

  function updateHeaderCount() {
    const badge = document.querySelector('.cs-header_cart_label');
    if (badge) {
      const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
      if (badge.textContent !== String(total)) {
        badge.textContent = total;
      }
    }
  }

  function render() {
    if (!cart.length) {
      if (emptyEl) {
        emptyEl.innerHTML = emptyDefault;
        emptyEl.style.display = 'block';
      }
      tableWrap.style.display = 'none';
      totalEl.textContent = '0';
      return;
    }
    emptyEl.style.display = 'none';
    tableWrap.style.display = 'block';
    totalEl.textContent = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    tableBody.innerHTML = '';
    cart.forEach((item, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="cs-cart_table_media">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
          </div>
        </td>
        <td>${item.category || ''}${item.subcategory ? ' • ' + item.subcategory : ''}</td>
        <td style="max-width:110px;">
          <input type="number" class="form-control cs-cart-qty" value="${item.qty || 1}" min="1" data-idx="${idx}">
        </td>
        <td class="text-center">
          <button class="cs-cart-table-close" data-idx="${idx}" aria-label="Remove ${item.name}"><i class="fa-solid fa-xmark"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll('.cs-cart-qty').forEach((input) => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const val = Math.max(1, parseInt(e.target.value, 10) || 1);
        cart[idx].qty = val;
        saveCart();
        render();
      });
    });

    tableBody.querySelectorAll('.cs-cart-table-close').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        cart.splice(idx, 1);
        saveCart();
        render();
      });
    });
  }

  async function submitRequest() {
    if (!cart.length) {
      alert('Your request list is empty.');
      return;
    }
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const notes = notesInput.value.trim();

    if (!name || !email || !phone) {
      alert('Please enter your name, email, and phone number.');
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    try {
      const payload = {
        name,
        email,
        phone,
        notes,
        items: cart.map((item) => ({
          name: item.name,
          qty: item.qty || 1,
          category: item.category || '',
          subcategory: item.subcategory || '',
          image: item.image || ''
        }))
      };

      const res = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to send request. Please try again.');
      }

      // Clear cart and show success confirmation
      cart = [];
      saveCart();
      render();
      if (emptyEl) {
        emptyEl.innerHTML = 'تم استلام طلبك بنجاح سيتم ارسال عرض السعر قريبا<br>شكرا لك<br>فريق Art Ratio';
        emptyEl.style.display = 'block';
      }
    } catch (err) {
      console.error(err);
      alert('Could not send request. Please try again in a moment.');
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Request';
    }
  }

  sendBtn.addEventListener('click', submitRequest);
  render();
  updateHeaderCount();
})();
