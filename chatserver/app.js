var http = require('http'),
	fs = require('fs'),
	socketio = require('socket.io');
 
var server = http.createServer();

server.on('request', function(req, res) {
	res.writeHead(200, { 'Content-type': 'text/html'});
	res.end(fs.readFileSync(__dirname + '/index.html'));
});

server.listen(1333, function() {
	console.log('Listening at: http://localhost:1333');
});


Array.prototype.contains = function(k, callback) {
	var self = this;
    return (function check(i) {
        if (i >= self.length) {
            return callback(false);
        }
        if (self[i].id === k.id) {
            return callback(true);
        }
        return process.nextTick(check.bind(null, i+1));
    }(0));
};

var chatters = [];
socketio.listen(server).on('connection', function (socket) {
	socket.on('join', function (newChatter) {
		chatters.contains(newChatter, function(found) {
		    if (!found) {
		        chatters.push(newChatter);
				socket.broadcast.emit('chatter_joined',newChatter);
		    }
		    socket.broadcast.emit('chatter_already_joined', chatters);
			socket.emit('chatter_already_joined', chatters);
		});
		
	});

	socket.on('quit', function (chatter) {
		for (p in chatters) {
			if (chatters[p].id === chatter.id) {
				console.log('Chatter ', chatter.id, ' has quit');
				chatters.splice(p);
				socket.broadcast.emit('chatter_quit', chatter);
			}
		}
		socket.broadcast.emit('chatter_already_joined', chatters);
		socket.emit('chatter_already_joined', chatters);
	});

	socket.on('speak', function (chatter) {
		socket.broadcast.emit('chatter_said', chatter);
	});
});
