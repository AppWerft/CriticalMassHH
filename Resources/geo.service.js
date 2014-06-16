var sendPosition = function(e) {
	Ti.Geolocation.removeEventListener('location', sendPosition);
	console.log('Info: new position found => trying to send');
	Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
		ononline : function() {
			Ti.App.Apiomat.loginUser(null, {
				onOk : function() {
					Ti.App.Apiomat.setPosition({
						latitude : e.coords.latitude,
				   		longitude : e.coords.longitude
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
};

// sending:
if (Ti.App.Properties.hasProperty('RECORD') && Ti.Geolocation.locationServicesEnabled) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 500;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.addEventListener('location', sendPosition);
}
// receiving

/*
Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
	ononline : function() {
		Ti.App.Apiomat.loginUser(null, {
			onOk : function() {
				var now = (parseInt(require('vendor/moment')().unix()) - 120) * 1000;
				var query = "createdAt > date(" + now + ") order by createdAt";
				Apiomat.Position.getPositions(query, {
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
						Ti.App.Properties.setList('RADLERLIST',radlerlist);
					},
					onError : function(error) {
						console.log('Error: ' + error);
						
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

*/