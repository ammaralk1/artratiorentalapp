const DEFAULT_STORE = {
  customers: [],
  reservations: [],
  equipment: [],
  technicians: [],
  maintenance: [],
  projects: [],
  technicianPayouts: [],
  packages: [],
};

function getMemoryStore() {
  const root = typeof window !== 'undefined' ? window : globalThis;
  if (!root.__APP_DATA_STORE__) {
    root.__APP_DATA_STORE__ = {
      customers: [],
      reservations: [],
      equipment: [],
      technicians: [],
      maintenance: [],
      projects: [],
      technicianPayouts: [],
      packages: [],
    };
  }
  return root.__APP_DATA_STORE__;
}

function assignIfProvided(target, key, value) {
  if (value === undefined || value === null) return;
  target[key] = Array.isArray(value) ? [...value] : value;
}

// ===== إدارة البيانات في الذاكرة =====
export function loadData() {
  const store = getMemoryStore();
  return {
    customers: [...store.customers],
    reservations: [...store.reservations],
    equipment: [...store.equipment],
    technicians: [...store.technicians],
    maintenance: [...store.maintenance],
    projects: [...store.projects],
    technicianPayouts: [...store.technicianPayouts],
    packages: [...store.packages],
  };
}

export function saveData({ customers, reservations, equipment, technicians, maintenance, projects, technicianPayouts, packages }) {
  const store = getMemoryStore();
  assignIfProvided(store, 'customers', customers);
  assignIfProvided(store, 'reservations', reservations);
  assignIfProvided(store, 'equipment', equipment);
  assignIfProvided(store, 'technicians', technicians);
  assignIfProvided(store, 'maintenance', maintenance);
  assignIfProvided(store, 'projects', projects);
  assignIfProvided(store, 'technicianPayouts', technicianPayouts);
  assignIfProvided(store, 'packages', packages);
}

// ✅ نقل البيانات من النظام القديم الذي يتم حقنه من الخادم مرة واحدة
let migrationApplied = false;

export function migrateOldData(legacyPayload = null) {
  if (migrationApplied) return;

  const legacySource = legacyPayload
    || (typeof window !== 'undefined' ? window.__LEGACY_DATA__ : null);

  if (!legacySource || typeof legacySource !== 'object') {
    migrationApplied = true;
    return;
  }

  const store = getMemoryStore();
  const fields = ['customers', 'reservations', 'equipment', 'technicians', 'maintenance', 'projects', 'technicianPayouts', 'packages'];

  fields.forEach((field) => {
    const value = legacySource[field];
    if (Array.isArray(value) && value.length > 0) {
      store[field] = [...value];
    }
  });

  migrationApplied = true;

  if (!legacyPayload && typeof window !== 'undefined') {
    try {
      delete window.__LEGACY_DATA__;
    } catch (error) {
      /* ignore cleanup errors */
    }
  }
}

export function __resetLegacyMigrationForTests() {
  migrationApplied = false;
}
