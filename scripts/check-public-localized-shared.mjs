import fs from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

import {
  PHASE_1_PILOT_FILES,
  PHASE_1_PILOT_LOCALES,
} from './public-page-scope.mjs';
import {
  PUBLIC_PAGE_LOCALES,
  PUBLIC_SITE_ORIGIN,
} from './public-page-locales.mjs';
import {
  HOME_BREADCRUMB_LABELS,
  ORGANIZATION_ID,
  PAGE_SPECIFIC_SCHEMA_TYPES,
  PROFESSIONAL_SERVICE_ID,
  PUBLIC_SITE_ROOT_URL,
  WEBSITE_ID,
} from './public-page-schema.mjs';
import { getLocalizedOutputRoot } from './public-localized-paths.mjs';

export const ARABIC_VISIBLE_ENGLISH_SIGNALS = [
  'Home',
  'About',
  'Services',
  'Portfolio',
  'Photo Gallery',
  'Equipment List',
  'Team',
  'Feedback',
  'Portal Access',
  'Login to Dashboard',
  'Latest Projects',
  'Our fun fact',
  'See Details',
  'Follow Us',
  'Instagram',
  'TikTok',
  'Our Team',
  'Explore Recent Publications',
  'View More Blog',
  'Terms of Use',
  'Privacy Policy',
  'Contact Us',
  'TV & Commercial Ads',
  'Events & Coverage',
  'Social Media Visuals',
  'Commercial Photography',
  'Equipment Rental',
  'Production Consultancy',
  'Why Choose Us',
];

const toAbsoluteUrl = (pathname) => new URL(pathname, PUBLIC_SITE_ORIGIN).toString();

const getMetaContent = (document, selector) =>
  document.querySelector(selector)?.getAttribute('content') || null;

const getLinkHref = (document, selector) =>
  document.querySelector(selector)?.getAttribute('href') || null;

const assertEqual = (actual, expected, label) => {
  if (actual !== expected) {
    throw new Error(`${label} mismatch. Expected "${expected}", received "${actual}"`);
  }
};

const getVisibleText = (document) => {
  const body = document.body;
  if (!body) {
    return '';
  }

  const clone = body.cloneNode(true);
  clone.querySelectorAll('script, style, noscript, template').forEach((node) => node.remove());
  return (clone.textContent || '').replace(/\s+/g, ' ').trim();
};

const getStructuredDataGraph = (document, file, locale) => {
  const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];

  for (const script of scripts) {
    const content = script.textContent?.trim();
    if (!content) {
      continue;
    }

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed['@graph'])) {
        return parsed['@graph'];
      }
    } catch (error) {
      throw new Error(`${file} ${locale} JSON-LD parse failed: ${error.message}`);
    }
  }

  throw new Error(`${file} ${locale} is missing JSON-LD schema`);
};

const findSchemaNode = (graph, predicate, label, file, locale) => {
  const node = graph.find(predicate);
  if (!node) {
    throw new Error(`${file} ${locale} is missing schema node: ${label}`);
  }
  return node;
};

const nodeHasType = (node, type) => {
  const value = node?.['@type'];
  if (Array.isArray(value)) {
    return value.includes(type);
  }
  return value === type;
};

const validateHeadAndDocument = (document, localeConfig, locale, file) => {
  const expectedTitle = localeConfig.seo[locale].title;
  const expectedDescription = localeConfig.seo[locale].description;
  const expectedCanonical = toAbsoluteUrl(localeConfig.routes[locale]);
  const expectedEn = toAbsoluteUrl(localeConfig.routes.en);
  const expectedAr = toAbsoluteUrl(localeConfig.routes.ar);
  const expectedLang = localeConfig.document[locale].lang;
  const expectedDir = localeConfig.document[locale].dir;

  assertEqual(document.title, expectedTitle, `${file} ${locale} <title>`);
  assertEqual(
    getMetaContent(document, 'meta[name="description"]'),
    expectedDescription,
    `${file} ${locale} meta description`,
  );
  assertEqual(
    getLinkHref(document, 'link[rel="canonical"]'),
    expectedCanonical,
    `${file} ${locale} canonical`,
  );
  assertEqual(
    getLinkHref(document, 'link[rel="alternate"][hreflang="en"]'),
    expectedEn,
    `${file} ${locale} hreflang en`,
  );
  assertEqual(
    getLinkHref(document, 'link[rel="alternate"][hreflang="ar"]'),
    expectedAr,
    `${file} ${locale} hreflang ar`,
  );
  assertEqual(
    getLinkHref(document, 'link[rel="alternate"][hreflang="x-default"]'),
    expectedEn,
    `${file} ${locale} hreflang x-default`,
  );
  assertEqual(
    document.documentElement.getAttribute('lang'),
    expectedLang,
    `${file} ${locale} html[lang]`,
  );
  assertEqual(
    document.documentElement.getAttribute('dir'),
    expectedDir,
    `${file} ${locale} html[dir]`,
  );
};

const validateArabicVisibleBody = (document, file) => {
  const visibleText = getVisibleText(document);
  const hits = ARABIC_VISIBLE_ENGLISH_SIGNALS.filter((signal) => visibleText.includes(signal));

  if (hits.length > 0) {
    throw new Error(`${file} ar visible body still contains English UI strings: ${hits.join(', ')}`);
  }

  if (!/[\u0600-\u06FF]/.test(visibleText)) {
    throw new Error(`${file} ar visible body does not contain Arabic text`);
  }
};

const validateStructuredData = (document, localeConfig, locale, file) => {
  const currentUrl = toAbsoluteUrl(localeConfig.routes[locale]);
  const graph = getStructuredDataGraph(document, file, locale);

  const organization = findSchemaNode(
    graph,
    (node) => node['@type'] === 'Organization' && node['@id'] === ORGANIZATION_ID,
    'Organization',
    file,
    locale,
  );
  assertEqual(organization.url, PUBLIC_SITE_ROOT_URL, `${file} ${locale} organization url`);

  const website = findSchemaNode(
    graph,
    (node) => node['@type'] === 'WebSite' && node['@id'] === WEBSITE_ID,
    'WebSite',
    file,
    locale,
  );
  assertEqual(website.url, PUBLIC_SITE_ROOT_URL, `${file} ${locale} website url`);

  const professionalService = findSchemaNode(
    graph,
    (node) => node['@type'] === 'ProfessionalService' && node['@id'] === PROFESSIONAL_SERVICE_ID,
    'ProfessionalService',
    file,
    locale,
  );
  assertEqual(professionalService.url, PUBLIC_SITE_ROOT_URL, `${file} ${locale} professional service url`);

  const webpage = findSchemaNode(
    graph,
    (node) => nodeHasType(node, 'WebPage') && node.url === currentUrl,
    'WebPage',
    file,
    locale,
  );
  assertEqual(webpage.name, localeConfig.seo[locale].title, `${file} ${locale} WebPage name`);
  assertEqual(
    webpage.description,
    localeConfig.seo[locale].description,
    `${file} ${locale} WebPage description`,
  );
  assertEqual(
    webpage.inLanguage,
    localeConfig.document[locale].lang,
    `${file} ${locale} WebPage inLanguage`,
  );

  const expectedPageSpecificType = PAGE_SPECIFIC_SCHEMA_TYPES[localeConfig.pageId];
  if (expectedPageSpecificType && !nodeHasType(webpage, expectedPageSpecificType)) {
    throw new Error(`${file} ${locale} WebPage is missing schema subtype ${expectedPageSpecificType}`);
  }

  if (localeConfig.pageId === 'home') {
    if (webpage.breadcrumb) {
      throw new Error(`${file} ${locale} home page should not emit BreadcrumbList`);
    }
    return;
  }

  const breadcrumb = findSchemaNode(
    graph,
    (node) => node['@type'] === 'BreadcrumbList' && node['@id'] === `${currentUrl}#breadcrumb`,
    'BreadcrumbList',
    file,
    locale,
  );

  const items = breadcrumb.itemListElement || [];
  if (items.length !== 2) {
    throw new Error(`${file} ${locale} breadcrumb should contain exactly 2 items`);
  }

  assertEqual(items[0]?.position, 1, `${file} ${locale} breadcrumb item 1 position`);
  assertEqual(items[0]?.name, HOME_BREADCRUMB_LABELS[locale], `${file} ${locale} breadcrumb item 1 name`);
  assertEqual(items[1]?.position, 2, `${file} ${locale} breadcrumb item 2 position`);
  assertEqual(items[1]?.item, currentUrl, `${file} ${locale} breadcrumb item 2 url`);
};

const readOutputDom = async (outputRoot, locale, file) => {
  const filePath = path.join(outputRoot, locale, file);
  const html = await fs.readFile(filePath, 'utf8');
  return {
    filePath,
    document: new JSDOM(html).window.document,
  };
};

export const runLocalizedChecks = async ({ repoRoot, target, label }) => {
  const outputRoot = getLocalizedOutputRoot({ repoRoot, target });

  for (const file of PHASE_1_PILOT_FILES) {
    const localeConfig = PUBLIC_PAGE_LOCALES[file];
    if (!localeConfig) {
      throw new Error(`Missing locale config for ${file}`);
    }

    for (const locale of PHASE_1_PILOT_LOCALES) {
      const { document } = await readOutputDom(outputRoot, locale, file);
      validateHeadAndDocument(document, localeConfig, locale, file);
      validateStructuredData(document, localeConfig, locale, file);

      if (locale === 'ar') {
        validateArabicVisibleBody(document, file);
      }
    }
  }

  console.log(`[${label}] PASS`);
};
