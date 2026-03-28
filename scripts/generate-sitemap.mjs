import fs from "node:fs";
import path from "node:path";

import { PUBLIC_PAGE_LOCALES, PUBLIC_SITE_ORIGIN } from "./public-page-locales.mjs";
import { APPROVED_PUBLIC_SEO_FILES } from "./public-page-scope.mjs";

const ROOT = process.cwd();
const SITEMAP_PATH = path.join(ROOT, "sitemap.xml");
const LASTMOD = new Date().toISOString().slice(0, 10);

function normalizePath(rawPath) {
  let p = String(rawPath || "/");
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/{2,}/g, "/");
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function withTrailingSlash(rawPath) {
  const p = normalizePath(rawPath);
  return p === "/" ? "/" : `${p}/`;
}

function absoluteUrl(sitePath) {
  if (sitePath === "/") return `${PUBLIC_SITE_ORIGIN}/`;
  return `${PUBLIC_SITE_ORIGIN}${sitePath}`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function makePairEntries(enPath, arPath, priority = "0.7") {
  const en = withTrailingSlash(enPath);
  const ar = withTrailingSlash(arPath);
  const enHref = absoluteUrl(en);
  const arHref = absoluteUrl(ar);
  return [
    {
      loc: enHref,
      en: enHref,
      ar: arHref,
      xDefault: enHref,
      priority,
    },
    {
      loc: arHref,
      en: enHref,
      ar: arHref,
      xDefault: enHref,
      priority,
    },
  ];
}

function renderUrlNode(entry) {
  return [
    "  <url>",
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(entry.en)}" />`,
    `    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(entry.ar)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(entry.xDefault)}" />`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    `    <priority>${entry.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

const pairEntries = [];

for (const file of APPROVED_PUBLIC_SEO_FILES) {
  const localeConfig = PUBLIC_PAGE_LOCALES[file];
  if (!localeConfig?.routes?.en || !localeConfig?.routes?.ar) {
    throw new Error(`Missing approved localized routes for sitemap file: ${file}`);
  }

  const enPath = withTrailingSlash(localeConfig.routes.en);
  const arPath = withTrailingSlash(localeConfig.routes.ar);
  const priority = enPath === "/en/" ? "1.0" : "0.7";
  pairEntries.push(...makePairEntries(enPath, arPath, priority));
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...pairEntries.map(renderUrlNode),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
console.log(
  `Generated sitemap with ${pairEntries.length} URLs from ${APPROVED_PUBLIC_SEO_FILES.length} approved files at ${path.relative(ROOT, SITEMAP_PATH)}`,
);
