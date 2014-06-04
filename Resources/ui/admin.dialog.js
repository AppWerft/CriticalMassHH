exports.create = function(_callback) {
	var hascompass = Ti.Geolocation.hasCompass;
	if (Ti.App.Properties.hasProperty('ADMIN')) {
		console.log('Info: user is admin');
		var self = Ti.UI.createAlertDialog({
			buttonNames : ['Treffpunkt senden'],
			message : "Diese neue Position wirklich an alle senden?",
			title : 'Nachfrage an den Bestimmer'
		});
		self.addEventListener('click', function(_e) {
			if (_e.index >= 0)
				_callback(true);
			return;

		});
		self.show();
	} else {
		var player = Ti.Media.createSound({
			url : "/assets/knack.caf"
		});
		var unlocked = false;
		if (hascompass) {
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
					if (sum == '.12.20.7') {
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
		} else {
			var androidview = Ti.UI.createView();
			var input = Ti.UI.createTextField({
				color : '#00FF12',
				left : 0,
				width : Ti.UI.FILL,
				keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
				height : 50,
				returnKeyType : Ti.UI.RETURNKEY_GO,
				hintText : 'Deine Texteingabe …',
				font : {
					fontSize : 20,
				},
				backgroundColor : 'black',
				enableReturnKey : true
			});
			androidview.add(input);
			input.addEventListener('change', function(_e) {
				if (_e.value == '12.20.7') {
					input.blur();
					player.url = '/assets/unlock.mp3';
					player.play();
					unlocked = true;
				}
			});
		}
		var self = Ti.UI.createAlertDialog({
			androidView : androidview,
			buttonNames : ['Treffpunkt senden'],
			message : hascompass ? "Stell' die drei Zahnräder auf die vereinbarte Kennziffer ein!" : "Gib' das Passwort ein!",
			title : 'Anmeldung als Bestimmer'
		});
		self.addEventListener('click', function() {
			if (hascompass) {
				var res = 0;
				for (var i = 0; i < 3; i++) {
					res += parseInt(Gears[i].getValue());
				}
			}
			if (unlocked == true) {
				Ti.App.Properties.setString('ADMIN', new Date());
				_callback(true);
			}

		});
		self.show();
	}
};
