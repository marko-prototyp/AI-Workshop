import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PORT = 3000;

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
  'Access-Control-Allow-Origin': '*',
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

async function handleApi(req, res) {
  const url = req.url.split('?')[0];

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS); res.end(); return;
  }

  // Health check
  if (url === '/api/status' && req.method === 'GET') {
    return jsonRes(res, { ok: true, root: __dirname });
  }

  // Write a file (path relative to project root, must stay inside it)
  if (url === '/api/write-file' && req.method === 'POST') {
    try {
      const { filePath, content } = JSON.parse(await readBody(req));
      const full = path.resolve(__dirname, filePath);
      if (!full.startsWith(__dirname)) return jsonRes(res, { ok: false, error: 'Path outside project' }, 400);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, content, 'utf8');
      jsonRes(res, { ok: true, wrote: filePath });
    } catch (e) {
      jsonRes(res, { ok: false, error: e.message }, 500);
    }
    return;
  }

  // Write a binary image file from a data URL
  if (url === '/api/write-image' && req.method === 'POST') {
    try {
      const { filePath, dataUrl } = JSON.parse(await readBody(req));
      const full = path.resolve(__dirname, filePath);
      if (!full.startsWith(__dirname)) return jsonRes(res, { ok: false, error: 'Path outside project' }, 400);
      const base64 = dataUrl.split(',')[1];
      if (!base64) return jsonRes(res, { ok: false, error: 'Invalid dataUrl' }, 400);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, Buffer.from(base64, 'base64'));
      jsonRes(res, { ok: true, wrote: filePath });
    } catch (e) {
      jsonRes(res, { ok: false, error: e.message }, 500);
    }
    return;
  }

  // Git add + commit (no push — push requires user's credentials in Terminal)
  if (url === '/api/git-commit' && req.method === 'POST') {
    try {
      const { message, files } = JSON.parse(await readBody(req));
      const addTargets = (files || ['Journal/', 'content/journal/']).join(' ');
      const safeMsg = (message || 'Journal update').replace(/"/g, "'");
      const cmd = `cd "${__dirname}" && git add ${addTargets} 2>/dev/null; git diff --cached --quiet && echo "nothing-to-commit" || git commit -m "${safeMsg}"`;
      const output = execSync(cmd, { encoding: 'utf8', timeout: 15000 });
      jsonRes(res, { ok: true, output });
    } catch (e) {
      jsonRes(res, { ok: false, error: e.message, output: (e.stdout || '') + (e.stderr || '') });
    }
    return;
  }

  // Keep old /api/git-push for backward compat
  if (url === '/api/git-push' && req.method === 'POST') {
    try {
      const { message, files } = JSON.parse(await readBody(req));
      const addTargets = (files || ['Journal/', 'content/journal/']).join(' ');
      const safeMsg = (message || 'Journal update').replace(/"/g, "'");
      const cmd = `cd "${__dirname}" && git add ${addTargets} 2>/dev/null; git diff --cached --quiet || git commit -m "${safeMsg}"`;
      const output = execSync(cmd, { encoding: 'utf8', timeout: 15000 });
      jsonRes(res, { ok: true, output });
    } catch (e) {
      jsonRes(res, { ok: false, error: e.message, output: (e.stdout || '') + (e.stderr || '') });
    }
    return;
  }

  res.writeHead(404, CORS); res.end('Not found');
}

const server = http.createServer(async (req, res) => {
  // API routes
  if (req.url.startsWith('/api/')) {
    return handleApi(req, res);
  }

  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  // Resolve directory requests to their index.html
  let filePath = path.join(DIST, urlPath);
  if (!path.extname(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain', ...CORS });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, CORS);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});

// Re-build on changes to src/ or content/
let debounce;
function watch(dir) {
  if (!fs.existsSync(dir)) return;
  fs.watch(dir, { recursive: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      try {
        execSync('node build.js', { stdio: 'inherit' });
      } catch {
        console.error('Build failed');
      }
    }, 120);
  });
}

watch(path.join(__dirname, 'src'));
watch(path.join(__dirname, 'content'));
