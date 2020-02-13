const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('create', function() {
        let roomId = Math.floor((Math.random() * 10000) + 1);
        socket.join(roomId);
        io.sockets.in(roomId).emit('message', roomId);
        console.log(roomId,io.sockets.adapter.rooms[roomId].sockets)
        console.log("rooms",io.sockets.adapter.rooms)

    });

    socket.on('join', function(room) {
        socket.join(room);
        io.sockets.in(room).emit('message', 'c bonn '+room);
        console.log(room,io.sockets.adapter.rooms[room].sockets)
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
