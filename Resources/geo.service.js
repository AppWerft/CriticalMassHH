var sendPosition = function(_e) {
	Ti.Geolocation.removeEventListener('location', sendPosition);
	console.log(_e.lastGeolocation);
	var record = Ti.App.Properties.hasProperty('RECORD');
	if (_e.coords)
		Ti.App.Apiomat.setPosition({
			latitude : _e.coords.latitude,
			longitude : _e.coords.longitude,
			enabled : (record)? 2 :0
		});
	else {
		try {
			var coords = JSON.parse(_e.lastGeolocation);
			Ti.App.Apiomat.setPosition({
				latitude : _e.coords.latitude,
				longitude : _e.coords.longitude,
				enabled : (record)? 1 :0
			});
		} catch(E) {
		}
	}

};

Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
	ononline : function() {
		Ti.App.Apiomat.loginUser(null, {
			onOk : function() {
				if (Ti.Geolocation.locationServicesEnabled) {
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
					Ti.Geolocation.distanceFilter = 500;
					Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
					Ti.Geolocation.addEventListener('location', sendPosition);
				}

				var now = (parseInt(require('vendor/moment')().unix()) - 120) * 1000;
				var query = "createdAt > date(" + now + ") order by createdAt";
				require('vendor/apiomat').Position.getPositions(query, {
					onOk : function(_positions) {
						var radlerlist = {};
						for (var i = 0; i < _positions.length; i++) {
							var user = _positions[i].data.ownerUserName;
							radlerlist[user] = {
								latitude : _positions[i].getPositionLatitude(),
								longitude : _positions[i].getPositionLongitude(),
								device : _positions[i].getDevice(),
							};
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
