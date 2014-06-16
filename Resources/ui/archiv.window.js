Ti.App.Moment = require('vendor/moment');
exports.create = function() {
	var self = require('vendor/window').create();
	self.backgroundColor = 'black';
	if (!Ti.Network.online)
		return self;
	var leafletmap = Ti.UI.createWebView({
		url : 'http://tools.webmasterei.com/cm/?23',
		enableZoomControls : false,
		disableBounce : true,
		borderWidth : 1,
		borderRadius : 2,
		bottom : 50,
	});
	self.add(leafletmap);
	var timestamp = Ti.UI.createLabel({
		bottom : 0,
		color : '#ddd',
		width : Ti.UI.FILL,
		right : 5,
		textAlign : 'right',
		font : {
			fontFamily : 'Quartz-Regular',
			fontSize : 45
		}
	});

	var restart = Ti.UI.createImageView({
		bottom : 0,
		width : 50,
		height : 50,
		left : 5,
		image : '/assets/restart.png'
	});

	var style;
	if (Ti.Platform.name === 'iPhone OS') {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	} else {
		style = Ti.UI.ActivityIndicatorStyle.BIG;
	}
	var activityIndicator = Ti.UI.createActivityIndicator({
		style : style,
	});
	self.add(activityIndicator);
	activityIndicator.show();
	setTimeout(function() {
		activityIndicator.hide();
	}, 1300);
	leafletmap.addEventListener('load', function() {

		if (self.cron)
			clearInterval(self.cron);
		self.cron = setInterval(function() {
			var time = leafletmap.evalJS('api.time') || '';
			timestamp.setText(Ti.App.Moment.unix(time).format('HH:mm'));
		}, 100);

		self.add(timestamp);
		self.add(restart);
		restart.addEventListener('click', function() {
			Ti.Media.vibrate();
			activityIndicator.show();
			leafletmap.reload();
		});

	});

	return self;
};
