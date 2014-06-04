var chatter = [];

var server = require('http').createServer();

server.on('request', function(req, res) {
	res.writeHead(200, {
		'Content-type' : 'text/plain'
	});
	res.send('Server rennt …');
});
server.listen(1333, function() {
	console.log('Listening at localhost.1333');
});

var socketio = require('socket.io');
socketio.listen(server).on('connection', function(socket) {
	socket.on('join', function(newchatter) {
		console.log(newchatter);
	});
});

