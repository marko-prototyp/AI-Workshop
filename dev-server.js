import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST        = path.join(__dirname, 'dist');
const DASHBOARD   = path.join(__dirname, 'dashboard');
const WEEK_IMAGES = path.join(__dirname, 'Journal', 'week-images');
const PORT        = parseInt(process.env.PORT || '3000', 10);

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
};

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonRes(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', ...CORS });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
  });
}

function sha256(content) {
  return 'sha256-' + crypto.createHash('sha256').update(content).digest('hex');
}

function resolveRepoPath(requestedPath) {
  if (!requestedPath || typeof requestedPath !== 'string') throw new Error('Missing path');
  if (requestedPath.includes('\0')) throw new Error('Invalid path');
  if (path.isAbsolute(requestedPath)) throw new Error('Absolute paths not allowed');
  const target = path.resolve(__dirname, requestedPath);
  const inside = target === __dirname || target.startsWith(__dirname + path.sep);
  if (!inside) throw new Error('Path escapes repo root');
  return target;
}

async function handleApi(req, res) {
  const url   = req.url.split('?')[0];
  const query = new URL(req.url, 'http://localhost').searchParams;

  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); res.end(); return; }

  // GET /api/status
  if (url === '/api/status' && req.method === 'GET') {
    return jsonRes(res, { ok: true, root: __dirname, port: PORT });
  }

  // GET /api/read-file?path=...
  if (url === '/api/read-file' && req.method === 'GET') {
    try {
      const relPath = query.get('path');
      const full    = resolveRepoPath(relPath);
      if (!fs.existsSync(full) || !fs.statSync(full).isFile()) {
        return jsonRes(res, { ok: true, path: relPath, exists: false, content: '', hash: '', mtime: null, size: 0 });
      }
      const content = fs.readFileSync(full, 'utf8');
      const stat    = fs.statSync(full);
      return jsonRes(res, { ok: true, path: relPath, exists: true, content, hash: sha256(content), mtime: stat.mtime.toISOString(), size: stat.size });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message }, 400);
    }
  }

  // GET /api/list-dir?path=...
  if (url === '/api/list-dir' && req.method === 'GET') {
    try {
      const relPath = query.get('path');
      const full    = resolveRepoPath(relPath);
      if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) {
        return jsonRes(res, { ok: true, path: relPath, exists: false, entries: [] });
      }
      const entries = fs.readdirSync(full).map(name => {
        const entryFull = path.join(full, name);
        const stat      = fs.statSync(entryFull);
        return { name, path: path.join(relPath, name), type: stat.isDirectory() ? 'directory' : 'file', mtime: stat.mtime.toISOString(), size: stat.size };
      });
      return jsonRes(res, { ok: true, path: relPath, exists: true, entries });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message }, 400);
    }
  }

  // GET /api/probe?path=...
  if (url === '/api/probe' && req.method === 'GET') {
    try {
      const relPath = query.get('path');
      const full    = resolveRepoPath(relPath);
      if (!fs.existsSync(full)) {
        return jsonRes(res, { ok: true, path: relPath, exists: false, type: null, mtime: null, size: 0 });
      }
      const stat = fs.statSync(full);
      return jsonRes(res, { ok: true, path: relPath, exists: true, type: stat.isDirectory() ? 'directory' : 'file', mtime: stat.mtime.toISOString(), size: stat.size });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message }, 400);
    }
  }

  // POST /api/write-file
  if (url === '/api/write-file' && req.method === 'POST') {
    try {
      const { filePath, content } = JSON.parse(await readBody(req));
      const full = resolveRepoPath(filePath);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, content, 'utf8');
      const stat = fs.statSync(full);
      return jsonRes(res, { ok: true, path: filePath, hash: sha256(content), mtime: stat.mtime.toISOString(), size: stat.size });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message }, e.message.includes('Path') || e.message.includes('path') ? 400 : 500);
    }
  }

  // POST /api/write-image
  if (url === '/api/write-image' && req.method === 'POST') {
    try {
      const { filePath, dataUrl } = JSON.parse(await readBody(req));
      const full   = resolveRepoPath(filePath);
      const base64 = dataUrl.split(',')[1];
      if (!base64) return jsonRes(res, { ok: false, error: 'Invalid dataUrl' }, 400);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, Buffer.from(base64, 'base64'));
      return jsonRes(res, { ok: true, wrote: filePath });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message }, e.message.includes('Path') || e.message.includes('path') ? 400 : 500);
    }
  }

  // POST /api/backup-file
  if (url === '/api/backup-file' && req.method === 'POST') {
    try {
      const { filePath } = JSON.parse(await readBody(req));
      const absPath      = resolveRepoPath(filePath);
      if (!fs.existsSync(absPath)) return jsonRes(res, { ok: false, error: 'File not found' });

      const ts          = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
      const backupRoot  = path.join(__dirname, '.dashboard-backup');
      const backupDir   = path.join(backupRoot, path.dirname(filePath));
      fs.mkdirSync(backupDir, { recursive: true });
      const backupDest  = path.join(backupDir, path.basename(filePath) + '.' + ts);
      fs.copyFileSync(absPath, backupDest);

      return jsonRes(res, { ok: true, backupPath: path.relative(__dirname, backupDest) });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message });
    }
  }

  // POST /api/render-markdown
  if (url === '/api/render-markdown' && req.method === 'POST') {
    try {
      const { markdown } = JSON.parse(await readBody(req));
      const html         = marked.parse(String(markdown || ''));
      return jsonRes(res, { ok: true, html });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message });
    }
  }

  // POST /api/git-commit
  if (url === '/api/git-commit' && req.method === 'POST') {
    try {
      const { message, files } = JSON.parse(await readBody(req));
      const addTargets = (files || ['Journal/', 'content/journal/']).join(' ');
      const safeMsg    = (message || 'Journal update').replace(/"/g, "'");
      const cmd        = `cd "${__dirname}" && git add ${addTargets} 2>/dev/null; git diff --cached --quiet && echo "nothing-to-commit" || git commit -m "${safeMsg}"`;
      const output     = execSync(cmd, { encoding: 'utf8', timeout: 15000 });
      return jsonRes(res, { ok: true, output });
    } catch (e) {
      return jsonRes(res, { ok: false, error: e.message, output: (e.stdout || '') + (e.stderr || '') });
    }
  }

  jsonRes(res, { ok: false, error: 'Not found' }, 404);
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) return handleApi(req, res);

  let urlPath = req.url.split('?')[0];

  // Dashboard
  if (urlPath === '/dashboard' || urlPath === '/dashboard/') {
    const filePath = path.join(DASHBOARD, 'index.html');
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'text/html', ...CORS });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, CORS); res.end('Dashboard not built yet');
    }
    return;
  }

  // Week images: serve Journal/week-images/ for dashboard thumbnail previews
  if (urlPath.startsWith('/week-images/')) {
    const relPath  = decodeURIComponent(urlPath.slice('/week-images/'.length));
    const filePath = path.join(WEEK_IMAGES, relPath);
    if (!path.resolve(filePath).startsWith(WEEK_IMAGES + path.sep) &&
        path.resolve(filePath) !== WEEK_IMAGES) {
      res.writeHead(403, CORS); res.end('Forbidden'); return;
    }
    const ext = path.extname(filePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', ...CORS });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, CORS); res.end('Not found');
    }
    return;
  }

  if (urlPath.startsWith('/dashboard/')) {
    const relPath  = urlPath.slice('/dashboard/'.length);
    const filePath = path.join(DASHBOARD, relPath);
    if (!path.resolve(filePath).startsWith(DASHBOARD)) { res.writeHead(403, CORS); res.end('Forbidden'); return; }
    const ext = path.extname(filePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain', ...CORS });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, CORS); res.end('Not found');
    }
    return;
  }

  // Public site
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
  let filePath = path.join(DIST, urlPath);
  if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain', ...CORS });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, CORS); res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});

let debounce;
function watch(dir) {
  if (!fs.existsSync(dir)) return;
  fs.watch(dir, { recursive: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      try { execSync('node build.js', { stdio: 'inherit' }); }
      catch { console.error('Build failed'); }
    }, 120);
  });
}

watch(path.join(__dirname, 'src'));
watch(path.join(__dirname, 'content'));
