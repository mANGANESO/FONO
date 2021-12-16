var express = require('express');
var app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server);

app.use("/",express.static('public'));

server.listen(5001,() => {
	console.log("Servidor corriendo en http://localhost:5001");

});

 io.on('connection', (socket) => {

	socket.on('voice', (blob) => {

		socket.broadcast.emit('voice', blob);
	})

})

module.exports = server;