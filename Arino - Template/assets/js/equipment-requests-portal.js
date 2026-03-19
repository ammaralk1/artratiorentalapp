(function () {
  const AUTH_API = '/backend/api/auth/';
  const REQUESTS_API = '/backend/api/equipment-requests/admin.php';
  const LOGIN_PAGE_URL = '/login.html';
  const HOME_PAGE_URL = '/home.html';

  const state = {
    user: null,
    requests: [],
    selectedId: null,
    selectedDetails: null,
  };

  const els = {
    app: document.getElementById('erp-app'),
    refreshBtn: document.getElementById('erp-refresh-btn'),
    logoutBtn: document.getElementById('erp-logout-btn'),
    searchInput: document.getElementById('erp-search-input'),
    statusFilter: document.getElementById('erp-status-filter'),
    applyFilterBtn: document.getElementById('erp-apply-filter-btn'),
    requestsBody: document.getElementById('erp-requests-body'),
    emptyState: document.getElementById('erp-empty-state'),
    detailsContent: document.getElementById('erp-details-content'),
    requestCode: document.getElementById('erp-request-code'),
    requestName: document.getElementById('erp-request-name'),
    requestPhone: document.getElementById('erp-request-phone'),
    requestEmail: document.getElementById('erp-request-email'),
    requestStatus: document.getElementById('erp-request-status'),
    requestDate: document.getElementById('erp-request-date'),
    requestNotes: document.getElementById('erp-request-notes'),
    statusButtons: Array.from(document.querySelectorAll('[data-set-status]')),
    itemsBody: document.getElementById('erp-items-body'),
    messageForm: document.getElementById('erp-message-form'),
    messageSubject: document.getElementById('erp-message-subject'),
    messageBody: document.getElementById('erp-message-body'),
    messageLog: document.getElementById('erp-message-log'),
    toast: document.getElementById('erp-toast'),
  };

  function showToast(message, type) {
    if (!els.toast) return;
    els.toast.hidden = false;
    els.toast.textContent = message;
    els.toast.style.background =
      type === 'error' ? '#5a1c1c' : type === 'success' ? '#1a3f2c' : '#1f2f48';
    if (showToast._timer) {
      clearTimeout(showToast._timer);
    }
    showToast._timer = setTimeout(() => {
      els.toast.hidden = true;
    }, 2600);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatStatus(status) {
    const normalized = String(status || '').toLowerCase();
    if (normalized === 'confirmed') return 'مؤكد';
    if (normalized === 'cancelled') return 'ملغي';
    return 'بانتظار التأكيد';
  }

  function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('ar-SA');
  }

  async function apiRequest(url, options) {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options && options.headers ? options.headers : {}),
      },
      ...options,
    });

    const payload = await response.json().catch(() => ({}));
    if (response.status === 401) {
      redirectToLogin();
      const unauthorizedError = new Error('Unauthorized');
      unauthorizedError.code = 401;
      throw unauthorizedError;
    }

    if (!response.ok || !payload || payload.ok === false) {
      const message = (payload && payload.error) || 'Request failed';
      throw new Error(message);
    }
    return payload;
  }

  function redirectToLogin() {
    window.location.href = LOGIN_PAGE_URL;
  }

  function showApp() {
    if (els.app) els.app.hidden = false;
  }

  async function ensureAuthenticatedSession() {
    try {
      const response = await apiRequest(AUTH_API, { method: 'GET' });
      state.user = response && response.data ? response.data : null;
      const role = String((state.user && state.user.role) || '').toLowerCase();
      if (role !== 'admin' && role !== 'manager') {
        showToast('هذه الصفحة متاحة للإدارة فقط', 'error');
        window.location.href = HOME_PAGE_URL;
        return;
      }
      showApp();
      await loadRequests();
    } catch (error) {
      redirectToLogin();
    }
  }

  async function logout() {
    try {
      await apiRequest(AUTH_API, { method: 'DELETE' });
    } catch (error) {}
    redirectToLogin();
  }

  async function loadRequests() {
    const search = String((els.searchInput && els.searchInput.value) || '').trim();
    const status = String((els.statusFilter && els.statusFilter.value) || '').trim();
    const params = new URLSearchParams();
    params.set('limit', '100');
    if (search) params.set('search', search);
    if (status) params.set('status', status);

    const response = await apiRequest(`${REQUESTS_API}?${params.toString()}`, { method: 'GET' });
    state.requests = Array.isArray(response.data) ? response.data : [];
    renderRequests();

    const selectedStillExists = state.requests.some((row) => Number(row.id) === Number(state.selectedId));
    if (selectedStillExists && state.selectedId) {
      await loadRequestDetails(state.selectedId);
    } else {
      state.selectedId = null;
      renderDetails(null);
    }
  }

  function renderRequests() {
    if (!els.requestsBody) return;
    const rows = state.requests || [];
    if (!rows.length) {
      els.requestsBody.innerHTML = '<tr><td colspan="4" class="erp-muted">لا توجد طلبات مطابقة.</td></tr>';
      return;
    }

    els.requestsBody.innerHTML = rows
      .map((row) => {
        const id = Number(row.id || 0);
        const isActive = id === Number(state.selectedId);
        const status = String(row.status || 'pending').toLowerCase();
        return `
          <tr data-request-id="${id}" class="${isActive ? 'is-active' : ''}">
            <td>${escapeHtml(row.request_code || '-')}</td>
            <td>${escapeHtml(row.customer_name || '-')}</td>
            <td><span class="erp-status erp-status--${escapeHtml(status)}">${escapeHtml(formatStatus(status))}</span></td>
            <td>${escapeHtml(formatDate(row.created_at))}</td>
          </tr>
        `;
      })
      .join('');
  }

  async function loadRequestDetails(requestId) {
    const id = Number(requestId || 0);
    if (!id) return;
    const response = await apiRequest(`${REQUESTS_API}?id=${encodeURIComponent(String(id))}`, {
      method: 'GET',
    });
    state.selectedId = id;
    state.selectedDetails = response.data || null;
    renderRequests();
    renderDetails(state.selectedDetails);
  }

  function renderDetails(details) {
    if (!els.emptyState || !els.detailsContent) return;
    if (!details || !details.request) {
      els.emptyState.hidden = false;
      els.detailsContent.hidden = true;
      return;
    }

    const request = details.request;
    els.emptyState.hidden = true;
    els.detailsContent.hidden = false;

    if (els.requestCode) els.requestCode.textContent = request.request_code || '-';
    if (els.requestName) els.requestName.textContent = request.customer_name || '-';
    if (els.requestPhone) els.requestPhone.textContent = request.customer_phone || '-';
    if (els.requestEmail) els.requestEmail.textContent = request.customer_email || '-';
    if (els.requestStatus) {
      els.requestStatus.textContent = formatStatus(request.status);
    }
    if (els.requestDate) els.requestDate.textContent = formatDate(request.created_at);
    if (els.requestNotes) els.requestNotes.textContent = request.notes || '-';

    renderItems(details.items || []);
    renderMessages(details.messages || []);

    const defaultSubject = `تحديث بخصوص طلبك ${request.request_code || ''}`.trim();
    if (els.messageSubject && !els.messageSubject.value) {
      els.messageSubject.value = defaultSubject;
    }
  }

  function renderItems(items) {
    if (!els.itemsBody) return;
    if (!Array.isArray(items) || !items.length) {
      els.itemsBody.innerHTML = '<tr><td colspan="3" class="erp-muted">لا توجد عناصر.</td></tr>';
      return;
    }

    els.itemsBody.innerHTML = items
      .map((item) => {
        const category = [item.category, item.subcategory].filter(Boolean).join(' • ') || '-';
        return `
          <tr>
            <td>${escapeHtml(item.name || '-')}</td>
            <td>${escapeHtml(category)}</td>
            <td>${escapeHtml(String(item.qty || 1))}</td>
          </tr>
        `;
      })
      .join('');
  }

  function renderMessages(messages) {
    if (!els.messageLog) return;
    if (!Array.isArray(messages) || !messages.length) {
      els.messageLog.innerHTML = '<li class="erp-muted">لا توجد رسائل بعد.</li>';
      return;
    }

    els.messageLog.innerHTML = messages
      .map((msg) => {
        const statusText = msg.delivery_status === 'sent' ? 'تم الإرسال' : msg.delivery_status === 'failed' ? 'فشل الإرسال' : 'بانتظار';
        return `
          <li>
            <div><strong>${escapeHtml(msg.subject || 'بدون عنوان')}</strong></div>
            <div>${escapeHtml(msg.message || '')}</div>
            <small>
              ${escapeHtml(formatDate(msg.created_at))} |
              ${escapeHtml(msg.channel || '-')} |
              ${escapeHtml(statusText)}
              ${msg.recipient ? ` | ${escapeHtml(msg.recipient)}` : ''}
            </small>
          </li>
        `;
      })
      .join('');
  }

  async function updateStatus(status) {
    if (!state.selectedId) {
      showToast('اختر طلب أولاً', 'error');
      return;
    }
    await apiRequest(REQUESTS_API, {
      method: 'PATCH',
      body: JSON.stringify({
        id: state.selectedId,
        status,
      }),
    });
    showToast('تم تحديث الحالة', 'success');
    await loadRequests();
  }

  async function sendMessage() {
    if (!state.selectedId) {
      showToast('اختر طلب أولاً', 'error');
      return;
    }
    const subject = String((els.messageSubject && els.messageSubject.value) || '').trim();
    const message = String((els.messageBody && els.messageBody.value) || '').trim();
    if (!message) {
      showToast('اكتب الرسالة أولاً', 'error');
      return;
    }

    const response = await apiRequest(REQUESTS_API, {
      method: 'POST',
      body: JSON.stringify({
        action: 'send_message',
        id: state.selectedId,
        subject,
        message,
      }),
    });

    const data = response.data || {};
    if (data.sent) {
      showToast('تم إرسال الرسالة للعميل', 'success');
      if (els.messageBody) els.messageBody.value = '';
    } else {
      showToast('تم حفظ الرسالة لكن فشل الإرسال', 'error');
    }

    if (data.details) {
      state.selectedDetails = data.details;
      renderDetails(state.selectedDetails);
    } else {
      await loadRequestDetails(state.selectedId);
    }
  }

  function bindEvents() {
    if (els.logoutBtn) {
      els.logoutBtn.addEventListener('click', async function () {
        await logout();
      });
    }

    if (els.refreshBtn) {
      els.refreshBtn.addEventListener('click', async function () {
        try {
          await loadRequests();
          showToast('تم التحديث', 'success');
        } catch (error) {
          if (error && error.code === 401) {
            redirectToLogin();
            return;
          }
          showToast(error.message || 'فشل التحديث', 'error');
        }
      });
    }

    if (els.applyFilterBtn) {
      els.applyFilterBtn.addEventListener('click', async function () {
        try {
          await loadRequests();
        } catch (error) {
          showToast(error.message || 'فشل تحميل الطلبات', 'error');
        }
      });
    }

    if (els.searchInput) {
      els.searchInput.addEventListener('keydown', async function (event) {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        try {
          await loadRequests();
        } catch (error) {
          showToast(error.message || 'فشل تحميل الطلبات', 'error');
        }
      });
    }

    if (els.requestsBody) {
      els.requestsBody.addEventListener('click', async function (event) {
        const row = event.target.closest('tr[data-request-id]');
        if (!row) return;
        const id = Number(row.getAttribute('data-request-id') || 0);
        if (!id) return;
        try {
          await loadRequestDetails(id);
        } catch (error) {
          showToast(error.message || 'فشل تحميل تفاصيل الطلب', 'error');
        }
      });
    }

    els.statusButtons.forEach((button) => {
      button.addEventListener('click', async function () {
        const status = button.getAttribute('data-set-status');
        if (!status) return;
        try {
          await updateStatus(status);
        } catch (error) {
          showToast(error.message || 'فشل تحديث الحالة', 'error');
        }
      });
    });

    if (els.messageForm) {
      els.messageForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        try {
          await sendMessage();
        } catch (error) {
          showToast(error.message || 'فشل إرسال الرسالة', 'error');
        }
      });
    }
  }

  bindEvents();
  ensureAuthenticatedSession();
})();
