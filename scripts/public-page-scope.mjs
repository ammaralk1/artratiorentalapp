import { LOCALIZED_PILOT_OUTPUT_ROOT } from './public-localized-paths.mjs';

export const PHASE_1_PILOT_FILES = Object.freeze([
  'index.html',
  'about.html',
  'contact.html',
  'service.html',
  'portfolio.html',
  'blog.html',
  'photography-agency.html',
  'team.html',
  'service-details-tv-commercial-ads.html',
  'service-details-events-coverage.html',
  'service-details-social-media-content.html',
  'service-details-photography.html',
  'service-details-equipment-rental.html',
  'service-details-consultancy.html',
]);

export const PHASE_1_PILOT_LOCALES = Object.freeze(['en', 'ar']);

export const PHASE_1_OUTPUT_ROOT = LOCALIZED_PILOT_OUTPUT_ROOT;

export const PHASE_1_PAGE_SCOPE = Object.freeze({
  'index.html': {
    pageId: 'home',
    include: true,
    rollout: '3a-pilot',
  },
  'about.html': {
    pageId: 'about',
    include: true,
    rollout: '3a-pilot',
  },
  'contact.html': {
    pageId: 'contact',
    include: true,
    rollout: '3a-pilot',
  },
  'service.html': {
    pageId: 'service',
    include: true,
    rollout: '3a-pilot',
  },
  'portfolio.html': {
    pageId: 'portfolio',
    include: true,
    rollout: '3a-pilot',
  },
  'blog.html': {
    pageId: 'blog',
    include: true,
    rollout: '3a-pilot',
  },
  'photography-agency.html': {
    pageId: 'photo-gallery',
    include: true,
    rollout: '3a-pilot',
  },
  'team.html': {
    pageId: 'team',
    include: true,
    rollout: '3a-pilot',
  },
  'service-details-tv-commercial-ads.html': {
    pageId: 'service-tv-details',
    include: true,
    rollout: '3a-pilot',
  },
  'service-details-events-coverage.html': {
    pageId: 'service-events-details',
    include: true,
    rollout: '3a-pilot',
  },
  'service-details-social-media-content.html': {
    pageId: 'service-social-details',
    include: true,
    rollout: '3a-pilot',
  },
  'service-details-photography.html': {
    pageId: 'service-photography-details',
    include: true,
    rollout: '3a-pilot',
  },
  'service-details-equipment-rental.html': {
    pageId: 'service-rental-details',
    include: true,
    rollout: '3a-pilot',
  },
  'service-details-consultancy.html': {
    pageId: 'service-consultancy-details',
    include: true,
    rollout: '3a-pilot',
  },
});

export const isPhase1PilotFile = (file) =>
  Object.prototype.hasOwnProperty.call(PHASE_1_PAGE_SCOPE, file);

export const getPhase1PageConfig = (file) => PHASE_1_PAGE_SCOPE[file] || null;
