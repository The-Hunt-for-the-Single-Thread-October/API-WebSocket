const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', (socket) => {
    socket.on('gameCreated', data => {
        console.log(data);
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});