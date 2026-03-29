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
  SOCIAL_SHARE_IMAGE_URL,
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

  const titleNode = ensureSingleNode(document, 'title');
  if (!titleNode) {
    const createdTitle = document.createElement('title');
    document.head.appendChild(createdTitle);
  }
  document.title = seo.title;

  upsertMeta(document, 'meta[name="description"]', { name: 'description' }, seo.description);
  upsertMeta(document, 'meta[property="og:type"]', { property: 'og:type' }, 'website');
  upsertMeta(document, 'meta[property="og:site_name"]', { property: 'og:site_name' }, 'Art Ratio');
  upsertMeta(document, 'meta[property="og:title"]', { property: 'og:title' }, seo.title);
  upsertMeta(
    document,
    'meta[property="og:description"]',
    { property: 'og:description' },
    seo.description,
  );
  upsertMeta(document, 'meta[property="og:url"]', { property: 'og:url' }, currentUrl);
  upsertMeta(document, 'meta[property="og:image"]', { property: 'og:image' }, SOCIAL_SHARE_IMAGE_URL);
  upsertMeta(document, 'meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  upsertMeta(document, 'meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title);
  upsertMeta(
    document,
    'meta[name="twitter:description"]',
    { name: 'twitter:description' },
    seo.description,
  );
  upsertMeta(document, 'meta[name="twitter:image"]', { name: 'twitter:image' }, SOCIAL_SHARE_IMAGE_URL);

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

const normalizePath = (rawPath) => {
  let value = rawPath || '/';
  if (!value.startsWith('/')) {
    value = `/${value}`;
  }
  value = value.replace(/\/{2,}/g, '/');
  if (value !== '/' && value.endsWith('/')) {
    value = value.slice(0, -1);
  }
  return value || '/';
};

const normalizeComparablePath = (rawPath) => {
  const normalized = normalizePath(rawPath);
  if (normalized === '/en') return '/en/';
  if (normalized === '/ar') return '/ar/';
  if (normalized === '/') return '/';
  return `${normalized}/`;
};

const toDirectArabicPath = (rawPath) => {
  let value = rawPath || '/';
  if (!value.startsWith('/')) {
    value = `/${value}`;
  }
  value = value.replace(/\/{2,}/g, '/');
  if (value === '/ar' || value === '/ar/') return '/';
  if (value.startsWith('/ar/')) {
    const direct = value.slice(3);
    return direct || '/';
  }
  return value || '/';
};

const APPROVED_PERFORMANCE_ASSET_REWRITES = Object.freeze([
  ['assets/img/hero_bg.jpeg', 'assets/img/hero_bg.webp'],
  ['assets/img/service_hero_bg.jpeg', 'assets/img/service_hero_bg.webp'],
  ['assets/img/contact_hero_bg.jpeg', 'assets/img/contact_hero_bg.webp'],
  ['assets/img/portfolio_hero_bg.jpeg', 'assets/img/portfolio_hero_bg.webp'],
  ['assets/img/blog_hero_bg.jpeg', 'assets/img/blog_hero_bg.webp'],
  ['assets/img/team_hero_bg.jpeg', 'assets/img/team_hero_bg.webp'],
  ['assets/img/about_hero_bg.jpeg', 'assets/img/about_hero_bg.webp'],
  ['assets/img/shop_hero_bg.jpeg', 'assets/img/shop_hero_bg.webp'],
  ['assets/img/cta_bg_2.jpeg', 'assets/img/cta_bg_2.webp'],
  ['assets/img/Mob%20Hero%20BG/hero_bg.jpg', 'assets/img/Mob%20Hero%20BG/hero_bg.webp'],
  ['assets/img/Mob Hero BG/hero_bg.jpg', 'assets/img/Mob Hero BG/hero_bg.webp'],
]);

const APPROVED_PERFORMANCE_CUSTOM_OVERRIDES_VERSION = '20260329-approved-performance2';

const applyApprovedPerformanceAssetRewrites = (html) => {
  let nextHtml = html;

  for (const [source, target] of APPROVED_PERFORMANCE_ASSET_REWRITES) {
    nextHtml = nextHtml.replaceAll(source, target);
  }

  nextHtml = nextHtml.replace(
    /assets\/css\/custom-overrides\.css\?v=[^"']+/g,
    `assets/css/custom-overrides.css?v=${APPROVED_PERFORMANCE_CUSTOM_OVERRIDES_VERSION}`,
  );

  return nextHtml;
};

const pathForFileLocale = (file, locale) => {
  const config = PUBLIC_PAGE_LOCALES[file];
  if (!config) return '';
  if (locale === 'en') return config.routes.en;
  return toDirectArabicPath(config.routes.ar);
};

const APPROVED_BLOG_ARTICLE_PATHS = Object.freeze({
  'blog/event-coverage/professional-event-coverage-guide/': {
    en: '/en/blog/event-coverage/professional-event-coverage-guide/',
    ar: '/كشكولنا/تغطية-الفعاليات/دليل-تغطية-الفعاليات-الاحترافية/',
  },
  'blog/filmmaking-techniques/cinematic-lighting-basics/': {
    en: '/en/blog/filmmaking-techniques/cinematic-lighting-basics/',
    ar: '/كشكولنا/تقنيات-صناعة-الافلام/اساسيات-الاضاءة-السينمائية/',
  },
  'blog/product-photography/professional-product-photography-ecommerce/': {
    en: '/en/blog/product-photography/professional-product-photography-ecommerce/',
    ar: '/كشكولنا/تصوير-المنتجات/دليل-تصوير-المنتجات-الاحترافي-للمتاجر-الالكترونية/',
  },
  'blog/video-production/how-to-choose-professional-video-production-company/': {
    en: '/en/blog/video-production/how-to-choose-professional-video-production-company/',
    ar: '/كشكولنا/انتاج-الفيديو/كيف-تختار-شركة-انتاج-فيديو-احترافية/',
  },
});

const pathForApprovedBlogArticleLocale = (pathname, locale) => {
  const normalized = normalizePath(pathname);
  const clean = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  const key = clean.endsWith('/') ? clean : `${clean}/`;
  const config = APPROVED_BLOG_ARTICLE_PATHS[key];
  if (!config) return '';
  return locale === 'en' ? config.en : config.ar;
};

const pathForApprovedBlogFacetLocale = (pathname, locale) => {
  const normalized = normalizePath(pathname);
  const categoryMatch = normalized.match(/^\/blog\/category\/([A-Za-z0-9-]+)$/i);
  if (categoryMatch) {
    const base = locale === 'en' ? '/en/blog/' : '/كشكولنا/';
    return `${base}?category=${categoryMatch[1]}`;
  }

  const tagMatch = normalized.match(/^\/blog\/tag\/([A-Za-z0-9-]+)$/i);
  if (tagMatch) {
    const base = locale === 'en' ? '/en/blog/' : '/كشكولنا/';
    return `${base}?tag=${tagMatch[1]}`;
  }

  return '';
};

const localizeInternalLinks = (document, locale) => {
  const currentFile = document.body?.dataset?.pageFile || '';
  const currentPath = currentFile ? pathForFileLocale(currentFile, locale) : '';

  document.querySelectorAll('a[href]').forEach((anchor) => {
    const rawHref = anchor.getAttribute('href');
    if (!rawHref) return;
    if (/^(#|mailto:|tel:|javascript:)/i.test(rawHref)) return;

    let parsed;
    try {
      parsed = new URL(rawHref, 'https://art-ratio.com');
    } catch {
      return;
    }

    if (parsed.origin !== 'https://art-ratio.com') return;

    const pathname = parsed.pathname || '';
    const localizedFacetPath = pathForApprovedBlogFacetLocale(pathname, locale);
    if (localizedFacetPath) {
      anchor.setAttribute('href', localizedFacetPath + (parsed.hash || ''));
      return;
    }

    const fileMatch = pathname.match(/\/([^/]+\.html)$/i);
    if (!fileMatch) {
      const localizedArticlePath = pathForApprovedBlogArticleLocale(pathname, locale);
      if (!localizedArticlePath) return;
      anchor.setAttribute('href', localizedArticlePath + (parsed.search || '') + (parsed.hash || ''));
      return;
    }

    const targetFile = fileMatch[1];
    const localizedPath = pathForFileLocale(targetFile, locale);
    if (!localizedPath) return;

    const canonicalTarget = localizedPath;
    const nextHref =
      canonicalTarget +
      (parsed.search || '') +
      (parsed.hash || '');

    // Preserve same-page anchors as relative-only links when possible.
    if (currentPath && normalizeComparablePath(currentPath) === normalizeComparablePath(canonicalTarget) && !parsed.search) {
      anchor.setAttribute('href', parsed.hash || canonicalTarget);
      return;
    }

    anchor.setAttribute('href', nextHref);
  });
};

const applyLegacyClusterLinkContainment = (document) => {
  document.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';
    if (
      !/team-details-[a-z-]+\.html(?:[?#].*)?$/i.test(href)
      && !/portfolio-details-[A-Za-z0-9-]+\.html(?:[?#].*)?$/i.test(href)
      && !/^(?:\/?blog\/(?:event-coverage\/professional-event-coverage-guide|filmmaking-techniques\/cinematic-lighting-basics|product-photography\/professional-product-photography-ecommerce|video-production\/how-to-choose-professional-video-production-company)|\/en\/blog\/(?:event-coverage\/professional-event-coverage-guide|filmmaking-techniques\/cinematic-lighting-basics|product-photography\/professional-product-photography-ecommerce|video-production\/how-to-choose-professional-video-production-company)|\/كشكولنا\/(?:تغطية-الفعاليات\/دليل-تغطية-الفعاليات-الاحترافية|تقنيات-صناعة-الافلام\/اساسيات-الاضاءة-السينمائية|تصوير-المنتجات\/دليل-تصوير-المنتجات-الاحترافي-للمتاجر-الالكترونية|انتاج-الفيديو\/كيف-تختار-شركة-انتاج-فيديو-احترافية))\/?(?:[?#].*)?$/i.test(href)
    ) {
      return;
    }

    const currentRel = (anchor.getAttribute('rel') || '')
      .split(/\s+/)
      .filter(Boolean);
    if (!currentRel.includes('nofollow')) {
      currentRel.push('nofollow');
      anchor.setAttribute('rel', currentRel.join(' '));
    }
  });
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
    if (document.body) {
      document.body.dataset.pageFile = file;
    }
    setSeoHead(document, localeConfig, locale);
    const localeDir = path.join(outputRoot, locale);
    await fs.mkdir(localeDir, { recursive: true });
    applyBodyEntries(document, localeConfig, locale, ALL_KEYED_TRANSLATIONS, PILOT_SELECTOR_TRANSLATIONS);
    localizeInternalLinks(document, locale);
    applyLegacyClusterLinkContainment(document);
    setStructuredData(document, localeConfig, locale);
    const outputPath = path.join(localeDir, file);
    const optimizedHtml = applyApprovedPerformanceAssetRewrites(dom.serialize());
    await fs.writeFile(outputPath, optimizedHtml, 'utf8');
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
