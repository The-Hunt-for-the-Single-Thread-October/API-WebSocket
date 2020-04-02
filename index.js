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
        console.log(`${socket.id} a créé la room ${room.id}`);
    });

    socket.on('join', roomStr => {
        let room = JSON.parse(roomStr);
        if (room.clients < maxClients) {
            let updatedRoom = {
                id: room.id,
                maxClients: room.maxClients,
                clients: parseInt(room.clients) + 1
            };

            socket.join(updatedRoom);
            io.sockets.in(updatedRoom.id).emit('roomJoined', updatedRoom);
            console.log(`${socket.id} a rejoint la room ${room.id}, il y a ${updatedRoom.clients} clients.`);
        } else {
            console.log("room full");
        }
    });

    socket.on('shipsPlaced', (roomId,shipsArray) => {
        socket.to(roomId).emit(shipsArray);
        console.log(`${socket.id} a envoyé le placement de ses bateaux`);
    });
});

server.listen(4002, () => {
    console.log('listening on *:4002');
});
