3const http = require('http');
const os = require('os');

let entries = [];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/entries') {
    res.writeHead(200);
    res.end(JSON.stringify({ count: entries.length, entries }));
    return;
  }

  if (req.method === 'POST' && req.url === '/entries') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const entry = {
        id: entries.length + 1,
        text: body || 'empty',
        timestamp: new Date().toISOString(),
        container: os.hostname()
      };
      entries.push(entry);
      res.writeHead(201);
      res.end(JSON.stringify(entry));
    });
    return;
  }

  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'healthy' }));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    message: 'DevOps Bootcamp API V3',
    endpoints: ['GET /entries', 'POST /entries', 'GET /health'],
    container: os.hostname()
  }));
});

server.listen(3000, () => {
  console.log('API v2 running on port 3000');
});
