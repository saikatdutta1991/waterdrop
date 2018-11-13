var socketio = require('socket.io');
var io = socketio();
var socketApi = { io: io };

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.emit('connected', { message: 'You are connected' })
});


module.exports = socketApi;