import { state } from './state.js';
import { showToast } from '../utils.js';
import { t } from '../language.js';
import {
  PENDING_PROJECT_EDIT_PARAM,
  PENDING_PROJECT_QUERY_PARAM
} from './constants.js';
import { openProjectDetails, startProjectEdit } from './projectDetails.js';

function readPendingProjectParam(paramName) {
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search || '');
    const searchValue = params.get(paramName);
    if (searchValue) {
      return searchValue;
    }
  } catch (error) {
    /* ignore malformed search params */
  }

  const rawHash = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
  if (rawHash && rawHash.includes(`${paramName}=`)) {
    try {
      const hashParams = new URLSearchParams(rawHash);
      const hashValue = hashParams.get(paramName);
      if (hashValue) {
        return hashValue;
      }
    } catch (error) {
      /* ignore malformed hash params */
    }
  }

  return null;
}

function readPendingProjectIdFromUrl() {
  return readPendingProjectParam(PENDING_PROJECT_QUERY_PARAM);
}

function readPendingProjectEditIdFromUrl() {
  return readPendingProjectParam(PENDING_PROJECT_EDIT_PARAM);
}

function clearPendingProjectParamsFromUrl() {
  if (typeof window === 'undefined' || typeof window.history?.replaceState !== 'function') {
    return;
  }

  try {
    const searchParams = new URLSearchParams(window.location.search || '');
    const rawHash = window.location.hash ? window.location.hash.replace(/^#/, '') : '';

    let searchModified = false;
    [PENDING_PROJECT_QUERY_PARAM, PENDING_PROJECT_EDIT_PARAM, 'linked'].forEach((paramName) => {
      if (searchParams.has(paramName)) {
        searchParams.delete(paramName);
        searchModified = true;
      }
    });

    let nextHash = rawHash;
    let hashModified = false;
    if (rawHash) {
      try {
        const hashParams = new URLSearchParams(rawHash);
        let hashChanged = false;
        [PENDING_PROJECT_QUERY_PARAM, PENDING_PROJECT_EDIT_PARAM, 'linked'].forEach((paramName) => {
          if (hashParams.has(paramName)) {
            hashParams.delete(paramName);
            hashChanged = true;
          }
        });
        if (hashChanged) {
          nextHash = hashParams.toString();
          hashModified = true;
        }
      } catch (error) {
        /* ignore malformed hash params */
      }
    }

    if (!searchModified && !hashModified) {
      return;
    }

    const basePath = window.location.pathname;
    const nextSearch = searchParams.toString();
    const updatedUrl = `${basePath}${nextSearch ? `?${nextSearch}` : ''}${nextHash ? `#${nextHash}` : ''}`;
    window.history.replaceState({}, '', updatedUrl);
  } catch (error) {
    /* ignore failures */
  }
}

export function capturePendingProjectRequest() {
  const pendingId = readPendingProjectIdFromUrl();
  const pendingEditId = readPendingProjectEditIdFromUrl();
  const linkedFlag = readPendingProjectParam('linked');

  if (pendingId) {
    state.pendingProjectDetailId = pendingId;
  }

  if (pendingEditId) {
    state.pendingProjectEditId = pendingEditId;
    if (!state.pendingProjectDetailId) {
      state.pendingProjectDetailId = pendingEditId;
    }
  }

  if (linkedFlag != null && String(linkedFlag) !== '' && String(linkedFlag) !== '0' && String(linkedFlag).toLowerCase() !== 'false') {
    state.pendingLinkedToast = true;
  }

  if (pendingId || pendingEditId) {
    clearPendingProjectParamsFromUrl();
  }
}

export function openPendingProjectDetailIfReady() {
  if (!state.pendingProjectDetailId) return;
  const pendingId = state.pendingProjectDetailId;
  const normalizedPendingId = String(pendingId);
  const targetProject = state.projects.find((project) => {
    const candidates = [project?.id, project?.projectId, project?.project_id];
    return candidates.some((value) => value != null && String(value) === normalizedPendingId);
  });
  if (!targetProject) return;

  state.pendingProjectDetailId = null;
  const projectIdentifier = targetProject?.id ?? targetProject?.projectId ?? targetProject?.project_id ?? normalizedPendingId;
  openProjectDetails(projectIdentifier);

  if (state.pendingLinkedToast) {
    state.pendingLinkedToast = false;
    try {
      showToast(t('projects.toast.linkedReservationCreated', '✅ تم ربط الحجز بالمشروع'));
    } catch (_) {
      // ignore toast issues
    }
  }

  if (state.pendingProjectEditId != null) {
    const normalizedEditId = String(state.pendingProjectEditId);
    const matchesEdit = [targetProject.id, targetProject.projectId, targetProject.project_id]
      .some((value) => value != null && String(value) === normalizedEditId);
    if (matchesEdit) {
      state.pendingProjectEditId = null;
      setTimeout(() => startProjectEdit(targetProject), 0);
    }
  }
}
