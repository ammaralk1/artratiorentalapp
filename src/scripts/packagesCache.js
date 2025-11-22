import { loadData, saveData } from './storage.js';
import { apiRequest } from './apiClient.js';

let pendingPackagesRequest = null;

export async function ensurePackagesCached(force = false) {
  const snapshot = loadData() || {};
  const existing = Array.isArray(snapshot.packages) ? snapshot.packages : [];
  if (!force && existing.length > 0) {
    return existing;
  }

  if (!pendingPackagesRequest) {
    pendingPackagesRequest = apiRequest('/packages/?all=1')
      .then((response) => {
        const payload = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];
        if (payload.length) {
          saveData({ packages: payload });
          document.dispatchEvent(new CustomEvent('packages:changed', { detail: { packages: payload } }));
        }
        return payload.length ? payload : existing;
      })
      .catch((error) => {
        console.warn('[packagesCache] Failed to refresh packages from API', error);
        return existing;
      })
      .finally(() => {
        pendingPackagesRequest = null;
      });
  }

  return pendingPackagesRequest;
}

export default ensurePackagesCached;
