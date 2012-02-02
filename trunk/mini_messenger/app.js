var io = require('socket.io'),
    express = require('express'),
    app = express.createServer();

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.get('/', function(req, res, next){
  res.sendfile(__dirname + '/index.html');
});

app.listen(480);
var sio = io.listen(app);

socketIDs = new Array();

sio.sockets.on('connection', function (socket) {
    
    socketIDs.push(socket.id);
    var lg = socketIDs.length,
        user_id = lg - 1;
    console.log('welcome user n°' + user_id + ' with socketID ' + socket.id);
    socket.emit('user_id', user_id);
    sio.sockets.emit('user_ids', lg);
    
    socket.on('msg', function(from, msg, rcv_id){
      sio.sockets.socket(socketIDs[rcv_id]).emit('incoming msg', msg, user_id, from);
    });
    
    socket.on('disconnect',function(){      
      socketIDs.splice(user_id,1);
      var lg = socketIDs.length,
          i = user_id;
      if(i < lg){
        for(i = user_id ; i <= lg-1 ; i++){
          sio.sockets.socket(socketIDs[i]).emit('user_id', i);
        }
      }
      sio.sockets.emit('user_ids', lg);
    });
});
