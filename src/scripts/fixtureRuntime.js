function getRuntimeHost() {
  try {
    return window?.location?.hostname || '';
  } catch {
    return '';
  }
}

export function isLocalhostRuntime() {
  const host = getRuntimeHost();
  return host === 'localhost' || host === '127.0.0.1' || host === '' || host === '::1';
}

export function getLocalFixtureValue() {
  try {
    if (!isLocalhostRuntime()) return '';
    const url = new URL(window.location.href);
    return (url.searchParams.get('fixture') || '').toLowerCase();
  } catch {
    return '';
  }
}

export function isLocalDetailsFixtureEnabled() {
  return getLocalFixtureValue() === 'details';
}

export function isLocalDashboardFixtureEnabled() {
  return getLocalFixtureValue() === 'dashboard';
}

export function isLocalBypassAuthEnabled() {
  try {
    if (!isLocalhostRuntime()) return false;
    const url = new URL(window.location.href);
    const qp = (url.searchParams.get('bypassAuth') || url.searchParams.get('dev') || url.searchParams.get('debug') || '').toLowerCase();
    return window.__BYPASS_AUTH__ === true || qp === '1' || qp === 'true';
  } catch {
    return false;
  }
}
