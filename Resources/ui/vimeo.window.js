exports.create = function() {
	var self = require('vendor/window').create();
	var web = Ti.UI.createWebView({
		url : 'http://player.vimeo.com/video/93126686'
	});
	self.add(web);
	return self;
};
