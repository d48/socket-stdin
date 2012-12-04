// Generated by CoffeeScript 1.3.3
(function() {
  var api, fs, http, index, io, log, path, push, server, socketio, sockets;

  require('coffee-script');

  fs = require('fs');

  path = require('path');

  http = require('http');

  socketio = require('socket.io');

  sockets = [];

  log = console.log;

  index = fs.readFileSync(path.join(__dirname, 'index.html'));

  api = fs.readFileSync(path.join(__dirname, 'grooveshark-api.js'));

  server = http.createServer(function(req, resp) {
    log('Got a request', req);
    if (req.url === '/') {
      resp.statusCode = 200;
      resp.setHeader('content-type', 'text/html');
      return resp.end(index);
    } else if (req.url === '/grooveshark-api.js') {
      resp.statusCode = 200;
      resp.setHeader('content-type', 'text/javascript');
      return resp.end(api);
    } else if (req.url === '/push') {
      push('Got a request on ' + req.url);
      resp.statusCode = 200;
      return resp.end();
    } else {
      resp.statusCode = 404;
      return resp.end();
    }
  });

  io = socketio.listen(server);

  server.listen(1978);

  io.sockets.on('connection', function(socket) {
    log('Got a new connection', socket);
    return sockets.push(socket);
  });

  process.stdin.resume();

  process.stdin.on('data', function(chunk) {
    return push(chunk.toString());
  });

  push = function(data) {
    return sockets.forEach(function(socket) {
      switch (data) {
        case "woot":
          return socket.emit('woot', data);
        default:
          return socket.emit('data', data);
      }
    });
  };

}).call(this);
