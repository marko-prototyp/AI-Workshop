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

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  // Resolve directory requests to their index.html
  let filePath = path.join(DIST, urlPath);
  if (!path.extname(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }
  const ext = path.extname(filePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
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
