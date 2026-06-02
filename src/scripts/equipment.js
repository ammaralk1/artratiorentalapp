/**
 * equipment.js — Entry point (thin re-export layer)
 *
 * Implementation lives in ./equipment/*.js
 * All imports must precede module body per ES module spec.
 * events.js side-effect import registers all DOM event listeners.
 */

import { state } from './equipment/state.js';
import { mapLegacyEquipment } from './equipment/normalize.js';
import './equipment/events.js';

// Map legacy localStorage data to internal format (synchronous, once at module load,
// before DOMContentLoaded fires so renderEquipment sees normalized data)
if (state.equipmentList.length) {
  state.equipmentList = state.equipmentList.map(mapLegacyEquipment);
}

export { refreshEquipmentFromApi, syncEquipmentStatuses, clearEquipment } from './equipment/api.js';
export { renderEquipment } from './equipment/render.js';
export { initEquipmentModule } from './equipment/events.js';
export { uploadEquipmentFromExcel, downloadEquipmentToExcel } from './equipment/excel.js';
