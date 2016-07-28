var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/battlesaurs");
var Message = mongoose.model("Message", new mongoose.Schema({
  text: String
}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('send:chatmessage', function(msg){
    io.emit('posting:chatmessage', msg);
  });
});


http.listen(3300, function () {
  console.log("This shit is live on 3000 yo.");
})
