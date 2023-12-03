const http = require('http');
const { handleRequest } = require('./routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`Product server listening on ${PORT}`);
});
