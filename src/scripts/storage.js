// ===== إدارة البيانات =====
export function loadData() {
  const customers = JSON.parse(localStorage.getItem("customersList") || "[]");
  const reservations = JSON.parse(localStorage.getItem("reservationsList") || "[]");
  const equipment = JSON.parse(localStorage.getItem("equipmentList") || "[]");
  const technicians = JSON.parse(localStorage.getItem("techniciansList") || "[]");
  const maintenance = JSON.parse(localStorage.getItem("maintenanceList") || "[]");

  return { customers, reservations, equipment, technicians, maintenance };
}

export function saveData({ customers, reservations, equipment, technicians, maintenance }) {
  if (customers) localStorage.setItem("customersList", JSON.stringify(customers));
  if (reservations) localStorage.setItem("reservationsList", JSON.stringify(reservations));
  if (equipment) localStorage.setItem("equipmentList", JSON.stringify(equipment));
  if (technicians) localStorage.setItem("techniciansList", JSON.stringify(technicians));
  if (maintenance) localStorage.setItem("maintenanceList", JSON.stringify(maintenance));
}

// ✅ نقل البيانات من النظام القديم إلى الجديد (مرة واحدة)
export function migrateOldData() {
  if (localStorage.getItem("customers") && !localStorage.getItem("customersList")) {
    localStorage.setItem("customersList", localStorage.getItem("customers"));
  }
  if (localStorage.getItem("reservations") && !localStorage.getItem("reservationsList")) {
    localStorage.setItem("reservationsList", localStorage.getItem("reservations"));
  }
  if (localStorage.getItem("equipment") && !localStorage.getItem("equipmentList")) {
    localStorage.setItem("equipmentList", localStorage.getItem("equipment"));
  }
  if (localStorage.getItem("technicians") && !localStorage.getItem("techniciansList")) {
    localStorage.setItem("techniciansList", localStorage.getItem("technicians"));
  }
}
