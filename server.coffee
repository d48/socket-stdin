require('coffee-script')
fs       = require('fs')
path     = require('path')
http     = require('http')
socketio = require('socket.io')
sockets  = []
log      = console.log 

index = fs.readFileSync(path.join(__dirname, 'index.html'))

server = http.createServer (req, resp) ->
  log 'Got a request', req

  if req.url is '/'
    resp.statusCode = 200
    resp.setHeader 'content-type', 'text/html'
    resp.end index
  else if req.url is '/push'
    push 'Got a request on ' + req.url
    resp.statusCode = 200
    resp.end()
  else
    resp.statusCode = 404
    resp.end()

io = socketio.listen server
server.listen 1978

io.sockets.on 'connection', (socket) ->
  log 'Got a new connection', socket 
  sockets.push socket 

process.stdin.resume()
process.stdin.on 'data', (chunk) ->
  push chunk.toString()

push = (data) ->
  sockets.forEach (socket) ->
    socket.emit 'data', data





    
