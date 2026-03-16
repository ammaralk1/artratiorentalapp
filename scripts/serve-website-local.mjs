import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const siteRoot = path.resolve(repoRoot, 'Arino - Template');
const jsAliasRoot = path.resolve(siteRoot, 'assets/js');

const port = Number.parseInt(process.env.PORT || '5500', 10);
const host = process.env.HOST || '127.0.0.1';

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.gif', 'image/gif'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.eot', 'application/vnd.ms-fontobject'],
  ['.ico', 'image/x-icon'],
  ['.mp4', 'video/mp4'],
  ['.webm', 'video/webm'],
  ['.mov', 'video/quicktime'],
  ['.map', 'application/json; charset=utf-8'],
]);

function safeResolve(baseDir, requestPath) {
  const normalized = path.normalize(requestPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const resolved = path.resolve(baseDir, normalized);
  if (!resolved.startsWith(baseDir)) return null;
  return resolved;
}

function firstExistingFile(candidates) {
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const stat = fs.statSync(candidate);
      if (stat.isFile()) return candidate;
    } catch {
      // Continue trying candidates.
    }
  }
  return null;
}

function parseRangeHeader(rangeHeader, fileSize) {
  if (!rangeHeader || !rangeHeader.startsWith('bytes=')) return null;
  const [startRaw, endRaw] = rangeHeader.replace('bytes=', '').split('-', 2);
  const start = startRaw === '' ? Number.NaN : Number.parseInt(startRaw, 10);
  const end = endRaw === '' ? Number.NaN : Number.parseInt(endRaw, 10);

  if (Number.isNaN(start) && Number.isNaN(end)) return null;

  let chunkStart = start;
  let chunkEnd = end;
  if (Number.isNaN(chunkStart)) {
    const suffixLength = Math.max(0, end);
    if (suffixLength <= 0) return null;
    chunkStart = Math.max(0, fileSize - suffixLength);
    chunkEnd = fileSize - 1;
  } else if (Number.isNaN(chunkEnd)) {
    chunkEnd = fileSize - 1;
  }

  if (chunkStart < 0 || chunkEnd < chunkStart || chunkStart >= fileSize) return null;
  chunkEnd = Math.min(chunkEnd, fileSize - 1);
  return { start: chunkStart, end: chunkEnd };
}

function sendFile(filePath, req, res) {
  fs.stat(filePath, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypes.get(ext) || 'application/octet-stream';
    const fileSize = stat.size;
    const range = parseRangeHeader(req.headers.range, fileSize);

    if (range) {
      const chunkSize = range.end - range.start + 1;
      res.writeHead(206, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${range.start}-${range.end}/${fileSize}`,
        'Content-Length': chunkSize,
      });
      fs.createReadStream(filePath, { start: range.start, end: range.end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
      'Accept-Ranges': 'bytes',
      'Content-Length': fileSize,
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(url.pathname);

  // Common local entry routes should load the home page.
  if (pathname === '/' || pathname === '/index' || pathname === '/en' || pathname === '/en/' || pathname === '/ar' || pathname === '/ar/') {
    pathname = '/index.html';
  }

  let filePath = null;
  if (pathname.startsWith('/js/')) {
    filePath = safeResolve(jsAliasRoot, pathname.slice('/js/'.length));
  } else {
    const relativePath = pathname.replace(/^\/+/, '');
    const hasExtension = path.extname(relativePath) !== '';
    const routeCandidates = [];

    routeCandidates.push(safeResolve(siteRoot, relativePath));

    if (pathname.endsWith('/')) {
      routeCandidates.push(safeResolve(siteRoot, path.join(relativePath, 'index.html')));
    }

    if (!hasExtension && relativePath) {
      routeCandidates.push(safeResolve(siteRoot, `${relativePath}.html`));
    }

    // Allow locale-prefixed routes locally, e.g. /en/about -> /about.html
    const localeMatch = relativePath.match(/^(en|ar)\/(.+)$/);
    if (localeMatch) {
      const stripped = localeMatch[2];
      routeCandidates.push(safeResolve(siteRoot, stripped));
      if (!path.extname(stripped)) {
        routeCandidates.push(safeResolve(siteRoot, `${stripped}.html`));
      }
    }

    const requestExt = path.extname(relativePath).toLowerCase();
    const isAssetLikeRequest =
      relativePath.startsWith('assets/') ||
      (requestExt && requestExt !== '.html');

    // Fallback only for page-like routes, never for assets.
    if (!isAssetLikeRequest) {
      routeCandidates.push(safeResolve(siteRoot, 'index.html'));
    }

    filePath = firstExistingFile(routeCandidates);
  }

  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }

  sendFile(filePath, req, res);
});

server.listen(port, host, () => {
  console.log(`Local site server running at http://${host}:${port}`);
  console.log(`Serving / from: ${siteRoot}`);
  console.log(`Serving /js from: ${jsAliasRoot}`);
});
