var sendPosition = function(_e) {
	//Ti.Geolocation.removeEventListener('location', sendPosition);
	console.log('Info: alarmprocess has new geo position retrieved');
	var record = Ti.App.Properties.hasProperty('RECORD');
	if (_e.coords)
		Ti.App.Apiomat.setPosition({
			latitude : _e.coords.latitude,
			longitude : _e.coords.longitude,
			enabled : (record) ? 2 : 0
		});
	else {
		try {
			var coords = JSON.parse(_e.lastGeolocation);
			Ti.App.Apiomat.setPosition({
				latitude : _e.coords.latitude,
				longitude : _e.coords.longitude,
				enabled : (record) ? 1 : 0
			});
		} catch(E) {
		}
	}
};

Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
	ononline : function() {
		console.log('Info: alarmprocess is online');
		Ti.App.Apiomat.loginUser(null, {
			onOk : function() {
				console.log('Info: alarmprocess is logged in');
				if (Ti.Geolocation.locationServicesEnabled && Ti.App.Properties.hasProperty('RECORD')) {
					console.log('Info: alarmprocess is allowed to send tracling data');
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
					Ti.Geolocation.purpose = 'Track your performance in this bike race';
					Ti.Geolocation.distanceFilter = 500;
					Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
					Ti.Geolocation.getCurrentPosition(sendPosition);
				}
				var now = (parseInt(require('vendor/moment')().unix()) - 160) * 1000;
				var query = "createdAt > date(" + now + ") order by createdAt";
				require('vendor/apiomat').Position.getPositions(query, {
					onOk : function(_positions) {
						var radlerlist = {};
						console.log('Positions fresh from cloud: ' + _positions.length);
						for (var i = 0; i < _positions.length; i++) {
							try {
								var user = _positions[i].getUserid() || _positions[i].data.id;
								console.log(user);
								radlerlist[user] = {
									latitude : _positions[i].getPositionLatitude(),
									longitude : _positions[i].getPositionLongitude(),
									device : _positions[i].getDevice(),
								};
							} catch(E) {
								console.log(E);
							}
						}
						Ti.App.Properties.setObject('RADLERLIST', radlerlist);
					}
				});
			},
			onError : function(E) {
				console.log('Error: from APIOMAT ' + E);
			}
		});
	},
	onoffline : function() {
		console.log('Warning: device offline cannot send position');
	}
});
