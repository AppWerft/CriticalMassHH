exports.create = function(_args) {
	var streamurl = _args.streamurl;
	var meta = streamurl;
	if (Ti.Network.online == false) {
		return null;
	}
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : meta.title,
		backgroundColor : '#fff',
		orientationModes : [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT]
	});
	console.log(streamurl);
	self.videoplayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		url : streamurl,
		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Titanium.Media.VIDEO_SCALING_MODE_FILL,
		fullscreen : (Ti.Android) ? false : true,
		backgroundColor : '#fff',
		backgroundImage : meta['thumbnail_for_watch']
	});
	self.add(self.videoplayer);
	self.videoplayer.play();
	return self;
	self.videoplayer.addEventListener('complete', function() {
		self.videoplayer.release();
		self.close();
	});

	self.addEventListener('close', function() {
		self.videoplayer.release();
	});
	self.videoplayer.addEventListener('playbackstate', function(_e) {
		console.log(_e.playbackState);
	});
	self.addEventListener("open", function() {
		if (Ti.Android) {
			var activity = self.getActivity();
			if (activity.actionBar) {
				activity.actionBar.setDisplayHomeAsUp(true);
				activity.actionBar.onHomeIconItemSelected = function() {
					self.close();
				};
			}
		}
	});
	self.add(Ti.UI.createImageView({
		image : '/assets/yt.png',
		bottom : 0,
		right : 0,
		width : 60,
		height : 30
	}));
	self.videoplayer.addEventListener('fullscreen', function(_e) {
		if (_e.entering == false)
			self.close();
	});
	return self;
};
