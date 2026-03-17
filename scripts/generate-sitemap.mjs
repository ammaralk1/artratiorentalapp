import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LANG_TOGGLE_PATH = path.join(ROOT, "Arino - Template", "assets", "js", "lang-toggle.js");
const SITEMAP_PATH = path.join(ROOT, "sitemap.xml");
const BASE_URL = "https://art-ratio.com";
const LASTMOD = new Date().toISOString().slice(0, 10);

const source = fs.readFileSync(LANG_TOGGLE_PATH, "utf8");

function extractObjectLiteral(anchor) {
  const anchorIndex = source.indexOf(anchor);
  if (anchorIndex < 0) {
    throw new Error(`Anchor not found: ${anchor}`);
  }

  const openIndex = source.indexOf("{", anchorIndex);
  if (openIndex < 0) {
    throw new Error(`Object literal start not found for: ${anchor}`);
  }

  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const ch = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (!inDouble && !inTemplate && ch === "'" && !inSingle) {
      inSingle = true;
      continue;
    } else if (inSingle && ch === "'") {
      inSingle = false;
      continue;
    }

    if (!inSingle && !inTemplate && ch === '"' && !inDouble) {
      inDouble = true;
      continue;
    } else if (inDouble && ch === '"') {
      inDouble = false;
      continue;
    }

    if (!inSingle && !inDouble && ch === "`" && !inTemplate) {
      inTemplate = true;
      continue;
    } else if (inTemplate && ch === "`") {
      inTemplate = false;
      continue;
    }

    if (inSingle || inDouble || inTemplate) continue;

    if (ch === "{") depth += 1;
    if (ch === "}") depth -= 1;

    if (depth === 0) {
      return source.slice(openIndex, i + 1);
    }
  }

  throw new Error(`Object literal end not found for: ${anchor}`);
}

function evaluateObjectLiteral(literal) {
  return Function(`"use strict"; return (${literal});`)();
}

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

function toDirectArabicPath(rawPath) {
  const p = withTrailingSlash(rawPath);
  if (p === "/ar/") return "/";
  if (p.startsWith("/ar/")) return `/${p.slice("/ar/".length)}`;
  return p;
}

function absoluteUrl(sitePath) {
  if (sitePath === "/") return `${BASE_URL}/`;
  return `${BASE_URL}${sitePath}`;
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

const localizedRouteMap = evaluateObjectLiteral(
  extractObjectLiteral("const localizedRouteMap = {")
);
const blogCategorySlugMap = evaluateObjectLiteral(
  extractObjectLiteral("const blogCategorySlugMap = Object.freeze({")
);
const blogTagSlugMap = evaluateObjectLiteral(
  extractObjectLiteral("const blogTagSlugMap = Object.freeze({")
);
const blogPostSlugMap = evaluateObjectLiteral(
  extractObjectLiteral("const blogPostSlugMap = Object.freeze({")
);

const pairEntries = [];
const pairSeen = new Set();

function addPair(enPath, arPath, priority = "0.7") {
  const en = withTrailingSlash(enPath);
  const ar = withTrailingSlash(arPath);
  const key = `${en}|${ar}`;
  if (pairSeen.has(key)) return;
  pairSeen.add(key);
  pairEntries.push(...makePairEntries(en, ar, priority));
}

for (const paths of Object.values(localizedRouteMap)) {
  const enPath = withTrailingSlash(paths.en);
  const arPath = withTrailingSlash(toDirectArabicPath(paths.ar));
  const priority = enPath === "/en/" ? "1.0" : "0.7";
  addPair(enPath, arPath, priority);
}

for (const [enPost, arPost] of Object.entries(blogPostSlugMap)) {
  const postFile = path.join(ROOT, "Arino - Template", "blog", enPost, "index.html");
  if (fs.existsSync(postFile)) {
    addPair(`/en/blog/${enPost}/`, `/كشكولنا/${arPost}/`, "0.7");
  }
}

for (const [enCategory, arCategory] of Object.entries(blogCategorySlugMap)) {
  const categoryFile = path.join(
    ROOT,
    "Arino - Template",
    "blog",
    "category",
    enCategory,
    "index.html"
  );
  if (fs.existsSync(categoryFile)) {
    addPair(`/en/blog/category/${enCategory}/`, `/كشكولنا/التصنيف/${arCategory}/`, "0.6");
  }
}

for (const [enTag, arTag] of Object.entries(blogTagSlugMap)) {
  const tagFile = path.join(ROOT, "Arino - Template", "blog", "tag", enTag, "index.html");
  if (fs.existsSync(tagFile)) {
    addPair(`/en/blog/tag/${enTag}/`, `/كشكولنا/وسم/${arTag}/`, "0.5");
  }
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...pairEntries.map(renderUrlNode),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(SITEMAP_PATH, xml, "utf8");
console.log(`Generated sitemap with ${pairEntries.length} URLs at ${path.relative(ROOT, SITEMAP_PATH)}`);
