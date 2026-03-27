import { PUBLIC_SITE_ORIGIN } from './public-page-locales.mjs';

export const PUBLIC_SITE_ROOT_URL = new URL('/', PUBLIC_SITE_ORIGIN).toString();
export const ORGANIZATION_ID = `${PUBLIC_SITE_ROOT_URL}#organization`;
export const WEBSITE_ID = `${PUBLIC_SITE_ROOT_URL}#website`;
export const PROFESSIONAL_SERVICE_ID = `${PUBLIC_SITE_ROOT_URL}#professional-service`;

export const HOME_BREADCRUMB_LABELS = Object.freeze({
  en: 'Home',
  ar: 'الرئيسية',
});

export const PAGE_SPECIFIC_SCHEMA_TYPES = Object.freeze({
  about: 'AboutPage',
  blog: 'Blog',
  contact: 'ContactPage',
  'photo-gallery': 'CollectionPage',
  portfolio: 'CollectionPage',
  service: 'CollectionPage',
  team: 'AboutPage',
});

export const GLOBAL_SCHEMA_FOUNDATION = Object.freeze({
  organization: {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Art Ratio',
    legalName: 'Food Art Advertising Company',
    url: PUBLIC_SITE_ROOT_URL,
    logo: `${PUBLIC_SITE_ROOT_URL}assets/img/logo.svg`,
    email: 'info@art-ratio.com',
    telephone: '+966567680152',
    sameAs: Object.freeze([
      'https://www.instagram.com/art_ratio',
      'https://www.linkedin.com/company/art-ratio/',
      'https://www.tiktok.com/@art_ratio',
      'https://www.youtube.com/@ArtRatio',
    ]),
    contactPoint: Object.freeze([
      {
        '@type': 'ContactPoint',
        telephone: '+966567680152',
        email: 'info@art-ratio.com',
        contactType: 'customer service',
        availableLanguage: ['en', 'ar'],
        areaServed: 'SA',
      },
    ]),
  },
  website: {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: PUBLIC_SITE_ROOT_URL,
    name: 'Art Ratio',
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: ['en', 'ar'],
  },
  professionalService: {
    '@type': 'ProfessionalService',
    '@id': PROFESSIONAL_SERVICE_ID,
    name: 'Art Ratio',
    url: PUBLIC_SITE_ROOT_URL,
    image: `${PUBLIC_SITE_ROOT_URL}assets/img/logo.svg`,
    telephone: '+966567680152',
    email: 'info@art-ratio.com',
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    availableLanguage: ['en', 'ar'],
    parentOrganization: { '@id': ORGANIZATION_ID },
  },
});
