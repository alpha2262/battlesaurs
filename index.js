var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get("/", function (req, res) {
  console.log("connected to index.html")
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("a user has connected")
  socket.on('send:chatmessage', function(msg){
    io.emit('posting:chatmessage', msg);
  });

  socket.on('send:litebrite', function(data){
    io.emit('post:litebrite', data);
  });
});


http.listen(3300, function () {
  console.log("This shit is live on 3000 yo.");
})
