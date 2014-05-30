exports.create = function() {
	var self = require('vendor/window').create();
	var fb = Ti.UI.createWebView({url:'https://www.facebook.com/groups/CMHH.Diskussion/'});
	self.add(fb);
	return self;
};

