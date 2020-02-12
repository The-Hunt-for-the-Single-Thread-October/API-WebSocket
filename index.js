var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    socket.on('test', () => {
        console.log("ok")
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});