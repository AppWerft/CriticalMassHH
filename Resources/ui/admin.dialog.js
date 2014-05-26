exports.create = function(_callback) {
	if (Ti.App.Properties.hasProperty('ADMIN')) {
		_callback(true);
		return;
	}	
	var androidview = Ti.UI.createView({
		layout : 'horizontal',
		width : '33.3%',
		horizontalWrap : false
	});
	var Gears = [], gearviews = [];
	function getGearView(i) {
		Gears[i] = new (require('ui/compass.widget'))();
		gearviews[i] = Gears[i].getView();
		gearviews[i].addEventListener('click', function() {
			for (var j = 0; j < 3; j++)
				Gears[j].stop();
			Gears[i].toggle();
		});
		return gearviews[i];
	}

	for (var i = 0; i < 3; i++) {
		androidview.add(getGearView(i));
	}
	Gears[0].toggle();
	var finger = Ti.UI.createImageView({
		height : 90,
		width : 60,
		left : 0,
		image : '/assets/finger.png'
	});
	finger.addEventListener('longpress', function() {
		Ti.Media.vibrate();
	});
	//androidview.add(finger);

	var self = Ti.UI.createAlertDialog({
		androidView : androidview,
		buttonNames : ['Kennwort testen und weiter zur Verwaltung'],
		message : "Stell' die drei Zahräder auf die vereinbarte Kennziffer ein!",
		title : 'Anmeldung als Bestimmer'
	});
	self.addEventListener('click', function() {
		var res = 0;
		for (var i = 0; i < 3; i++) {
			res += parseInt(Gears[i].getValue());
		}
		if (res > 99 && 	res < 1000) {
			Ti.App.Properties.setString('ADMIN',new Date());
			_callback(true);
		}

	});
	self.show();
};
