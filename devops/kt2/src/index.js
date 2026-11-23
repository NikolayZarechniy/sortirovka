const http = require('http');

const port = Number(process.env.PORT || 3000);
const appName = process.env.APP_NAME || 'demo';
const version = 'Version 1'; 

const server = http.createServer((req, res) => {
  console.log(req.method + ' ' + req.url);
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end(version + ' | ' + appName + '\n');
});

server.listen(port, '0.0.0.0', () => {
  console.log(version + ': listening on ' + port);
});
