(function () {
  var form = document.querySelector('[data-portal-login-form]');
  if (!form) return;

  var usernameInput = form.querySelector('input[name="username"]');
  var passwordInput = form.querySelector('input[name="password"]');
  var statusEl = form.querySelector('[data-login-status]');
  var submitButton = form.querySelector('button[type="submit"]');

  function setStatus(message, state) {
    if (!statusEl) return;
    statusEl.textContent = message || '';
    statusEl.classList.remove('is-error', 'is-success');
    if (state === 'error') statusEl.classList.add('is-error');
    if (state === 'success') statusEl.classList.add('is-success');
  }

  function setBusy(isBusy) {
    if (!submitButton) return;
    submitButton.disabled = isBusy;
    submitButton.setAttribute('aria-busy', isBusy ? 'true' : 'false');
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var username = usernameInput ? usernameInput.value.trim() : '';
    var password = passwordInput ? passwordInput.value : '';

    if (!username || !password) {
      setStatus('Please enter username and password.', 'error');
      return;
    }

    setBusy(true);
    setStatus('Signing in...', '');

    try {
      var response = await fetch('/backend/api/auth/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });

      var payload = null;
      try {
        payload = await response.json();
      } catch (_) {
        payload = null;
      }

      if (!response.ok) {
        var errorMessage = (payload && payload.error) || 'Login failed. Check your credentials.';
        setStatus(errorMessage, 'error');
        return;
      }

      setStatus('Login successful. Redirecting...', 'success');
      window.location.href = '/dist/src/pages/home.html';
    } catch (_error) {
      setStatus('Network error. Please try again.', 'error');
    } finally {
      setBusy(false);
    }
  });
})();
