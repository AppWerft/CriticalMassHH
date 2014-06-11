exports.create = function(_chatter) {
	var self = Ti.UI.createView({
		left : 0,
		width : 60,
		height : 80
	});
	var thumb = Ti.UI.createImageView({
		image : (_chatter.photo) ? _chatter.photo : '/assets/schurke.png',
		width : 60,
		height : 60,
		top : 0
	});
	self.add(thumb);
	require('vendor/imagecache')(_chatter.photo, thumb);
	self.add(Ti.UI.createLabel({
		text : _chatter.username,
		bottom : 0
	}));
	return self;
};
