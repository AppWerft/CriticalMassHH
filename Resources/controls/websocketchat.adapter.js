exports.start = function() {
	var socket = require('vendor/socket.io').connect(Ti.App.Properties.getString('chaturi'));
	socket.emit('join', {
		id : Ti.Platform.id,
		message : 'Test'
	});
};
