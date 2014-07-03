module.exports = function(_callback) {
	var self = require('vendor/window').create({
		navBarHidden : true
	});
	self.backgroundImage = '/assets/default.png';
	self.open();
	_callback();
	return self;
};
