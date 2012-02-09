var app = require('express').createServer(),
    io = require('socket.io').listen(app);

app.listen(480);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (nick) {
    socket.set('nickname', nick, function () {
      console.log('new user with nickname ', nick);
      socket.emit('ready');
    });
  });

  socket.on('bdc_msg', function (msg) {
    socket.get('nickname', function (err, nick) {
      console.log('broadcasted chat message by ', nick);
      io.sockets.emit('pbl_msg', nick, msg);
    });
  });
  
  socket.on('self_msg', function(msg) {
    socket.get('nickname', function (err, nick) {
      console.log('self chat message by ', nick);
      socket.emit('pvt_msg', nick, msg);
    });
  });
});
