import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

import {
  PHASE_1_OUTPUT_ROOT,
  PHASE_1_PILOT_FILES,
  PHASE_1_PILOT_LOCALES,
} from './public-page-scope.mjs';
import {
  assertLocalizedTarget,
  getLocalizedOutputRoot,
} from './public-localized-paths.mjs';
import {
  PUBLIC_PAGE_LOCALES,
  PUBLIC_SITE_ORIGIN,
} from './public-page-locales.mjs';
import {
  GLOBAL_SCHEMA_FOUNDATION,
  HOME_BREADCRUMB_LABELS,
  ORGANIZATION_ID,
  PAGE_SPECIFIC_SCHEMA_TYPES,
  PROFESSIONAL_SERVICE_ID,
  WEBSITE_ID,
} from './public-page-schema.mjs';
import {
  PILOT_KEYED_TRANSLATIONS,
  PILOT_SELECTOR_TRANSLATIONS,
} from './public-page-pilot-build-content.mjs';
import { SERVICE_KEYED_TRANSLATIONS } from './public-service-page-build-content.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const templateRoot = path.join(repoRoot, 'Arino - Template');
const ALL_KEYED_TRANSLATIONS = {
  ...PILOT_KEYED_TRANSLATIONS,
  ...SERVICE_KEYED_TRANSLATIONS,
};

const getBuildTarget = () => {
  const targetArg = process.argv.find((arg) => arg.startsWith('--target='));
  const target = targetArg ? targetArg.split('=')[1] : 'pilot';
  return assertLocalizedTarget(target);
};

const toAbsoluteUrl = (pathname) => new URL(pathname, PUBLIC_SITE_ORIGIN).toString();
const toSchemaScriptContent = (graph) => JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });

const getWebPageSchemaType = (pageId) => {
  const pageSpecificType = PAGE_SPECIFIC_SCHEMA_TYPES[pageId];
  return pageSpecificType ? ['WebPage', pageSpecificType] : 'WebPage';
};

const ensureSingleNode = (document, selector) => {
  const nodes = [...document.querySelectorAll(selector)];
  const [first, ...rest] = nodes;
  rest.forEach((node) => node.remove());
  return first || null;
};

const getIndexedNode = (document, selector, index = null) => {
  const nodes = [...document.querySelectorAll(selector)];
  if (nodes.length === 0) {
    throw new Error(`Selector not found: ${selector}`);
  }
  if (index === null || index === undefined) {
    if (nodes.length > 1) {
      throw new Error(`Selector matched multiple nodes and no index was provided: ${selector}`);
    }
    return nodes[0];
  }
  if (!nodes[index]) {
    throw new Error(`Selector index out of range: ${selector} [${index}]`);
  }
  return nodes[index];
};

const getMatchedNodes = (document, selector, index = null, all = false) => {
  const nodes = [...document.querySelectorAll(selector)];
  if (nodes.length === 0) {
    return [];
  }
  if (all || index === null || index === undefined) {
    return nodes;
  }
  return [getIndexedNode(document, selector, index)];
};

const setDocumentLanguage = (document, localeConfig, locale) => {
  document.documentElement.setAttribute('lang', localeConfig.document[locale].lang);
  document.documentElement.setAttribute('dir', localeConfig.document[locale].dir);

  if (document.body) {
    document.body.dataset.initialLang = locale;
    document.body.dataset.htmlSeoOwned = 'true';
    document.body.classList.toggle('rtl', locale === 'ar');
  }
};

const upsertMeta = (document, selector, attributes, content) => {
  let node = ensureSingleNode(document, selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
};

const upsertLink = (document, selector, attributes, href) => {
  let node = ensureSingleNode(document, selector);
  if (!node) {
    node = document.createElement('link');
    Object.entries(attributes).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
};

const setSeoHead = (document, localeConfig, locale) => {
  const currentRoute = localeConfig.routes[locale];
  const currentUrl = toAbsoluteUrl(currentRoute);
  const enUrl = toAbsoluteUrl(localeConfig.routes.en);
  const arUrl = toAbsoluteUrl(localeConfig.routes.ar);
  const seo = localeConfig.seo[locale];

  document.title = seo.title;

  upsertMeta(document, 'meta[name="description"]', { name: 'description' }, seo.description);
  upsertMeta(document, 'meta[property="og:title"]', { property: 'og:title' }, seo.title);
  upsertMeta(
    document,
    'meta[property="og:description"]',
    { property: 'og:description' },
    seo.description,
  );
  upsertMeta(document, 'meta[property="og:url"]', { property: 'og:url' }, currentUrl);
  upsertMeta(document, 'meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title);
  upsertMeta(
    document,
    'meta[name="twitter:description"]',
    { name: 'twitter:description' },
    seo.description,
  );

  upsertLink(document, 'link[rel="canonical"]', { rel: 'canonical' }, currentUrl);
  upsertLink(
    document,
    'link[rel="alternate"][hreflang="en"]',
    { rel: 'alternate', hreflang: 'en' },
    enUrl,
  );
  upsertLink(
    document,
    'link[rel="alternate"][hreflang="ar"]',
    { rel: 'alternate', hreflang: 'ar' },
    arUrl,
  );
  upsertLink(
    document,
    'link[rel="alternate"][hreflang="x-default"]',
    { rel: 'alternate', hreflang: 'x-default' },
    enUrl,
  );
};

const getSchemaPageName = (document, localeConfig, locale) => {
  const activeBreadcrumb = document.querySelector('.breadcrumb-item.active');
  if (activeBreadcrumb?.textContent?.trim()) {
    return activeBreadcrumb.textContent.replace(/\s+/g, ' ').trim();
  }

  const heading = document.querySelector('h1');
  if (heading?.textContent?.trim()) {
    return heading.textContent.replace(/\s+/g, ' ').trim();
  }

  return localeConfig.seo[locale].title.split('|')[0].trim();
};

const buildBreadcrumbList = (document, localeConfig, locale) => {
  if (localeConfig.pageId === 'home') {
    return null;
  }

  const currentUrl = toAbsoluteUrl(localeConfig.routes[locale]);
  const homeRoute = PUBLIC_PAGE_LOCALES['index.html']?.routes?.[locale];
  if (!homeRoute) {
    throw new Error(`Missing localized home route for breadcrumb generation (${locale})`);
  }

  const breadcrumbId = `${currentUrl}#breadcrumb`;
  const pageName = getSchemaPageName(document, localeConfig, locale);

  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: HOME_BREADCRUMB_LABELS[locale],
        item: toAbsoluteUrl(homeRoute),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: currentUrl,
      },
    ],
  };
};

const setStructuredData = (document, localeConfig, locale) => {
  const currentUrl = toAbsoluteUrl(localeConfig.routes[locale]);
  const webpageId = `${currentUrl}#webpage`;
  const breadcrumb = buildBreadcrumbList(document, localeConfig, locale);

  const graph = [
    GLOBAL_SCHEMA_FOUNDATION.organization,
    GLOBAL_SCHEMA_FOUNDATION.website,
    GLOBAL_SCHEMA_FOUNDATION.professionalService,
    {
      '@type': getWebPageSchemaType(localeConfig.pageId),
      '@id': webpageId,
      url: currentUrl,
      name: localeConfig.seo[locale].title,
      description: localeConfig.seo[locale].description,
      inLanguage: localeConfig.document[locale].lang,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PROFESSIONAL_SERVICE_ID },
      publisher: { '@id': ORGANIZATION_ID },
      ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    },
  ];

  if (breadcrumb) {
    graph.push(breadcrumb);
  }

  document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove());

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = toSchemaScriptContent(graph);

  const baseTag = document.querySelector('base');
  if (baseTag?.parentNode) {
    baseTag.insertAdjacentElement('afterend', script);
    return;
  }

  document.head.appendChild(script);
};

const applyValueToNode = (node, entry, value, key) => {
  const type = entry?.type || 'text';

  if (type === 'html') {
    node.innerHTML = value;
    return;
  }

  if (type === 'attr') {
    const attrName = entry?.attr || node.getAttribute('data-i18n-attr');
    if (!attrName) {
      throw new Error(`Missing attr name for ${key}`);
    }
    node.setAttribute(attrName, value);
    return;
  }

  if (type === 'text') {
    node.textContent = value;
    return;
  }

  throw new Error(`Unsupported entry type "${type}" for ${key}`);
};

const applyKeyedEntries = (document, keyedTranslations, locale) => {
  const nodes = [...document.querySelectorAll('[data-i18n-key]')];

  for (const node of nodes) {
    const key = node.getAttribute('data-i18n-key');
    const entry = keyedTranslations[key];
    if (!entry || !entry[locale]) {
      continue;
    }

    applyValueToNode(node, entry, entry[locale], key);
  }
};

const applySelectorEntries = (document, entries, locale) => {
  for (const entry of entries) {
    const nodes = getMatchedNodes(document, entry.selector, entry.index, entry.all);
    if (nodes.length === 0) {
      continue;
    }

    const value =
      entry.values?.[locale] ??
      entry[locale];

    if (value === undefined) {
      continue;
    }

    nodes.forEach((node) => {
      applyValueToNode(node, entry, value, entry.key || entry.selector);
    });
  }
};

const applyBodyEntries = (document, localeConfig, locale, keyedTranslations, selectorTranslations) => {
  applyKeyedEntries(document, keyedTranslations, locale);

  const selectorEntries = [
    ...(selectorTranslations.global || []),
    ...((selectorTranslations.pages && selectorTranslations.pages[localeConfig.pageId]) || []),
    ...(localeConfig.body || []),
  ];

  applySelectorEntries(document, selectorEntries, locale);
};

const assertVisibleBodyCoverage = (document, locale, file) => {
  if (locale !== 'ar') {
    return;
  }

  const body = document.body;
  if (!body) {
    throw new Error(`Missing body for ${file}`);
  }

  const clonedBody = body.cloneNode(true);
  clonedBody.querySelectorAll('script, style, noscript, template').forEach((node) => node.remove());

  const text = clonedBody.textContent || '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  const remainingEnglishSignals = [
    'Home',
    'About',
    'Services',
    'Portfolio',
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
  ];

  const hits = remainingEnglishSignals.filter((signal) => normalized.includes(signal));
  if (hits.length > 0) {
    throw new Error(`Arabic body still contains English UI strings in ${file}: ${hits.join(', ')}`);
  }
};

const generatePage = async (file, outputRoot) => {
  const localeConfig = PUBLIC_PAGE_LOCALES[file];
  if (!localeConfig) {
    throw new Error(`Missing locale config for ${file}`);
  }

  const sourcePath = path.join(templateRoot, file);
  const html = await fs.readFile(sourcePath, 'utf8');

  for (const locale of PHASE_1_PILOT_LOCALES) {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    setDocumentLanguage(document, localeConfig, locale);
    setSeoHead(document, localeConfig, locale);
    const localeDir = path.join(outputRoot, locale);
    await fs.mkdir(localeDir, { recursive: true });
    applyBodyEntries(document, localeConfig, locale, ALL_KEYED_TRANSLATIONS, PILOT_SELECTOR_TRANSLATIONS);
    setStructuredData(document, localeConfig, locale);
    const outputPath = path.join(localeDir, file);
    await fs.writeFile(outputPath, dom.serialize(), 'utf8');
    assertVisibleBodyCoverage(document, locale, file);
  }
};

const main = async () => {
  const buildTarget = getBuildTarget();
  const outputRoot =
    buildTarget === 'pilot'
      ? path.join(repoRoot, PHASE_1_OUTPUT_ROOT)
      : getLocalizedOutputRoot({ repoRoot, target: buildTarget });

  await fs.rm(outputRoot, { recursive: true, force: true });
  await fs.mkdir(outputRoot, { recursive: true });

  for (const file of PHASE_1_PILOT_FILES) {
    await generatePage(file, outputRoot);
  }
};

main().catch((error) => {
  console.error('[build-public-localized-pages] Failed:', error.message);
  process.exitCode = 1;
});
