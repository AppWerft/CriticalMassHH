var SocketIO = function() {
	this.socket = require('vendor/socket.io').connect(Ti.App.Properties.getString('chaturi'));
	return this;
};
SocketIO.prototype = {
	join : function(_payload) {
		this.socket.emit('join', payload);
	},
	speak : function(_payload) {
	}
};

module.exports = SocketIO; 