import { getProjectsState } from '../../projectsService.js';
import { getReservationsState } from '../../reservationsService.js';
import { templatesTabState, type TemplatesLang } from './state';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

interface ProjectLike {
  id: unknown;
}

interface ReservationLike {
  id?: unknown;
  reservationId?: unknown;
  projectId?: unknown;
  project_id?: unknown;
}

export interface TemplatesCompanyInfo {
  logoUrl: string;
  companyName: string;
  companyCR: string;
  companyLicense: string;
}

const TPL_TYPE_PREF_KEY = 'projects.templates.type';
const LEGACY_SIRV_BASE = 'https://art-ratio.sirv.com';
const CLOUDFLARE_ASSETS_BASE = 'https://assets.art-ratio.com';

function getBrowserStorage(): StorageLike | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

function getProjectSelect(): HTMLSelectElement | null {
  const select = document.getElementById('templates-project');
  return select instanceof HTMLSelectElement ? select : null;
}

function getReservationSelect(): HTMLSelectElement | null {
  const select = document.getElementById('templates-reservation');
  return select instanceof HTMLSelectElement ? select : null;
}

function getReservationIdentifier(reservation: ReservationLike | null | undefined): string {
  const value = reservation?.id ?? reservation?.reservationId ?? '';
  return String(value || '').trim();
}

function applyHydratedReservationOverrides<T extends ReservationLike>(reservations: T[]): T[] {
  if (!Array.isArray(reservations) || !reservations.length) return [];

  return reservations.map((reservation) => {
    const identifier = getReservationIdentifier(reservation);
    const override = identifier ? templatesTabState.hydratedReservations[identifier] : null;
    return override && typeof override === 'object' ? (override as T) : reservation;
  });
}

function normalizeTemplateType(value: string): '' | 'expenses' | 'callsheet' {
  if (value === 'expenses' || value === 'callsheet') {
    return value;
  }
  return '';
}

export function readTplPreferredType(storage: StorageLike | null = getBrowserStorage()): '' | 'expenses' | 'callsheet' {
  try {
    const value = String(storage?.getItem(TPL_TYPE_PREF_KEY) || '').trim();
    return normalizeTemplateType(value);
  } catch {
    return '';
  }
}

export function writeTplPreferredType(type: string, storage: StorageLike | null = getBrowserStorage()): void {
  try {
    const normalized = normalizeTemplateType(String(type || '').trim());
    if (normalized) {
      storage?.setItem(TPL_TYPE_PREF_KEY, normalized);
    }
  } catch {
    // ignore storage failures
  }
}

export function restoreTplPreferredTypeIfAny(
  selectEl: HTMLSelectElement | null,
  search: string = window.location.search || '',
  storage: StorageLike | null = getBrowserStorage(),
): void {
  if (!selectEl) return;

  let requested = '';
  try {
    const params = new URLSearchParams(search);
    requested = params.get('tplType') || params.get('templatesType') || '';
  } catch {
    requested = '';
  }

  const preferred = normalizeTemplateType(requested) || readTplPreferredType(storage);
  if (!preferred) return;

  const hasOption = Array.from(selectEl.options).some((option) => option.value === preferred);
  if (hasOption) {
    selectEl.value = preferred;
  }
}

export function getReservationsForProject(projectId: unknown): ReservationLike[] {
  if (!projectId) return [];

  const reservations = getReservationsState() as ReservationLike[];
  return Array.isArray(reservations)
    ? applyHydratedReservationOverrides(
        reservations.filter((reservation) => String(reservation?.projectId ?? reservation?.project_id ?? '') === String(projectId)),
      )
    : [];
}

export function getSelectedProject<T extends ProjectLike = ProjectLike>(): T | null {
  const selectedId = getProjectSelect()?.value || '';
  const projects = getProjectsState() as unknown as T[];

  if (!Array.isArray(projects)) return null;
  return projects.find((project) => String(project.id) === String(selectedId)) || null;
}

export function getSelectedReservations<T extends ReservationLike = ReservationLike>(projectId: unknown): T[] {
  const selectedId = getReservationSelect()?.value || '';
  const reservations = getReservationsForProject(projectId) as unknown as T[];

  if (!selectedId) return reservations;

  const match = reservations.find((reservation) => getReservationIdentifier(reservation) === String(selectedId));
  return match ? [match] : [];
}

export function getTemplatesContextKey(): string {
  try {
    const project = getSelectedProject();
    const typeSelect = document.getElementById('templates-type');
    const type = typeSelect instanceof HTMLSelectElement ? (typeSelect.value || 'expenses') : 'expenses';
    const reservationSelect = getReservationSelect();
    const reservationId = reservationSelect?.value ? String(reservationSelect.value) : 'all';
    const projectId = project?.id != null ? String(project.id) : 'no-project';
    return `templates.callsheet.autosave.${projectId}.${type}.${reservationId}`;
  } catch {
    return 'templates.callsheet.autosave';
  }
}

export function normalizeLegacyAssetUrl(value: string = ''): string {
  const url = String(value || '').trim();
  if (!url) return '';

  if (url.startsWith(LEGACY_SIRV_BASE)) {
    return `${CLOUDFLARE_ASSETS_BASE}${url.slice(LEGACY_SIRV_BASE.length)}`;
  }

  return url;
}

export function normalizeTemplateHtmlLegacyUrls(html: string = '', companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>): string {
  let output = String(html || '');
  output = output.split('https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png').join(companyInfo.logoUrl);
  output = output.split('https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved%20WH.png').join(companyInfo.logoUrl);
  output = output.split('https://assets.art-ratio.com/AR-Logo-v3.5-curved.png').join(companyInfo.logoUrl);
  output = output.split('https://assets.art-ratio.com/AR%20Logo%20v3.5%20curved%20WH.png').join(companyInfo.logoUrl);
  output = output.split('/AR-Logo-v3.5-curved-WH.png').join(companyInfo.logoUrl);
  return output;
}

export function getTemplateLang(): TemplatesLang {
  return templatesTabState.templateLang;
}

export function setTemplateLang(lang: string, storage: StorageLike | null = getBrowserStorage()): TemplatesLang {
  templatesTabState.templateLang = lang === 'ar' ? 'ar' : 'en';

  try {
    storage?.setItem('templates.lang', templatesTabState.templateLang);
  } catch {
    // ignore storage failures
  }

  return templatesTabState.templateLang;
}

export function formatIntNoDecimals(value: unknown): string {
  try {
    const rounded = Math.round(Number(value) || 0);
    const locale = templatesTabState.templateLang === 'ar' ? 'ar-SA' : 'en-US';
    return rounded.toLocaleString(locale, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      useGrouping: true,
    });
  } catch {
    return String(Math.round(Number(value) || 0));
  }
}

export function readHeaderFooterOptions(companyInfo: TemplatesCompanyInfo): TemplatesCompanyInfo & { headerFooter: false } {
  return {
    headerFooter: false,
    logoUrl: companyInfo.logoUrl,
    companyName: companyInfo.companyName,
    companyCR: companyInfo.companyCR,
    companyLicense: companyInfo.companyLicense,
  };
}
