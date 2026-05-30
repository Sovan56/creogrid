import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  // Remove query parameters or hash from URL
  const cleanUrl = req.url.split('?')[0].split('#')[0];
  
  // Normalize URL path and map root to index.html
  let filePath = path.join(DIST_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);
  
  // Get file extension
  const ext = path.extname(filePath);
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Check if requested file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // For Single-Page Application (SPA) - Fallback to index.html if file doesn't exist
      filePath = path.join(DIST_DIR, 'index.html');
      contentType = 'text/html';
    }
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': contentType === 'text/html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });
    
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
