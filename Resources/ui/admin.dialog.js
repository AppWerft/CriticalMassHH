exports.create = function(_callback) {
	if (Ti.App.Properties.hasProperty('ADMIN')) {
		_callback(true);
		return;
	}
	var player = Ti.Media.createSound({
		url : "/assets/knack.caf"
	});
	var unlocked = false;
	var androidview = Ti.UI.createView({
		layout : 'horizontal',
		width : '33.3%',
		horizontalWrap : false
	});
	var Gears = [], gearviews = [];
	function getGearView(i) {
		Gears[i] = new (require('ui/compass.widget'))(function() {
			// callback during rotation
			var sum = '';

			for (var j = 0; j < 3; j++) {
				sum += ('.' + Gears[j].getValue());
			}
			if (sum == '.12.20.49') {
				player.release();
				player.url = '/assets/unlock.mp3';
				player.play();
				unlocked = true;
				for (var j = 0; j < 3; j++) {
					Gears[j].stop();
				}
			}
		});
		gearviews[i] = Gears[i].getView();
		gearviews[i].addEventListener('click', function() {
			for (var j = 0; j < 3; j++) {
				Gears[j].stop();
			}
			Gears[i].toggle();
		});
		return gearviews[i];
	}

	for (var i = 0; i < 3; i++) {
		androidview.add(getGearView(i));
	}
	setTimeout(function() {
		Gears[0].toggle();
	}, 10);
	var self = Ti.UI.createAlertDialog({
		androidView : androidview,
		buttonNames : ['Treffpunkt senden'],
		message : "Stell' die drei Zahnräder auf die vereinbarte Kennziffer ein!",
		title : 'Anmeldung als Bestimmer'
	});
	self.addEventListener('click', function() {
		var res = 0;
		for (var i = 0; i < 3; i++) {
			res += parseInt(Gears[i].getValue());
		}
		if (unlocked == true) {
			Ti.App.Properties.setString('ADMIN', new Date());
			_callback(true);
		}

	});
	self.show();
};
