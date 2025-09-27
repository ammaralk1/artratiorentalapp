const DEFAULT_STORE = {
  customers: [],
  reservations: [],
  equipment: [],
  technicians: [],
  maintenance: [],
  projects: [],
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
    };
  }
  return root.__APP_DATA_STORE__;
}

function assignIfProvided(target, key, value) {
  if (value === undefined) return;
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
  };
}

export function saveData({ customers, reservations, equipment, technicians, maintenance, projects }) {
  const store = getMemoryStore();
  assignIfProvided(store, 'customers', customers);
  assignIfProvided(store, 'reservations', reservations);
  assignIfProvided(store, 'equipment', equipment);
  assignIfProvided(store, 'technicians', technicians);
  assignIfProvided(store, 'maintenance', maintenance);
  assignIfProvided(store, 'projects', projects);
}

// ✅ نقل البيانات من النظام القديم (localStorage) مرة واحدة ثم تنظيفها
export function migrateOldData() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  const store = getMemoryStore();
  const legacyKeys = [
    { old: 'customersList', fallback: 'customers', field: 'customers' },
    { old: 'reservationsList', fallback: 'reservations', field: 'reservations' },
    { old: 'equipmentList', fallback: 'equipment', field: 'equipment' },
    { old: 'techniciansList', fallback: 'technicians', field: 'technicians' },
    { old: 'maintenanceList', fallback: 'maintenance', field: 'maintenance' },
    { old: 'projectsList', fallback: 'projects', field: 'projects' },
  ];

  legacyKeys.forEach(({ old, fallback, field }) => {
    try {
      const raw = window.localStorage.getItem(old) ?? window.localStorage.getItem(fallback);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        store[field] = [...parsed];
      }
      window.localStorage.removeItem(old);
      if (fallback && fallback !== old) {
        window.localStorage.removeItem(fallback);
      }
    } catch (error) {
      console.warn('⚠️ Failed to migrate legacy data key', old, error);
    }
  });
}
