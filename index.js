const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const uuid = require('uuid/v4');
const maxClients = 3;

io.sockets.on('connection', socket => {
    socket.on('create', () => {
        let room = {
            id: uuid(),
            maxClients: maxClients,
            clients: 1
        };
        socket.join(room.id);
        io.sockets.in(room.id).emit('roomJoined', room);
        console.log("rooms",io.sockets.adapter.rooms)
    });

    socket.on('join', room => {
        if (room.clients < maxClients) {
            let updatedRoom = {
                id: room.id,
                maxClients: room.maxClients,
                clients: room.clients + 1
            };

            socket.join(updatedRoom);
            io.sockets.in(updatedRoom.id).emit('roomJoined', updatedRoom);
            console.log(room,io.sockets.adapter.rooms[updatedRoom.id].sockets);
        } else {
            console.log("room full");
        }
    });
});

server.listen(4001, () => {
    console.log('listening on *:4001');
});
