/**
 * projectDetails.js — Entry point (thin re-export layer)
 *
 * Implementation lives in ./projectDetails/*.js
 * Circular dep between view.js (openProjectDetails) and edit.js (startProjectEdit)
 * is resolved here via setter injection after both modules load.
 */

import {
  openProjectDetails,
  bindFocusCards,
  focusProjectRow,
  bindProjectDetailsEvents,
  setStartProjectEdit,
} from './projectDetails/view.js';
import { startProjectEdit, setOpenProjectDetails } from './projectDetails/edit.js';

// Wire up cross-module circular deps
setStartProjectEdit(startProjectEdit);
setOpenProjectDetails(openProjectDetails);

export { openProjectDetails, bindFocusCards, focusProjectRow, bindProjectDetailsEvents, startProjectEdit };
