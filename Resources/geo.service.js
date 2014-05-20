if (Ti.App.Properties.hasProperty('RECORD')) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 50;
	if (Ti.Geolocation.locationServicesEnabled) {
		console.log('Info: gps enabled');
		Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		
		
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.error) {
				console.log('Info: no error');
				Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
					ononline : function() {
						console.log('Info: online');
						Ti.App.Apiomat.loginUser(null, {
							onOk : function() {
								console.log('Info: login success');
								Ti.App.Apiomat.setPosition({
									latitude : e.coords.latitude,
									longitude : e.coords.longitude
								});
							}
						});
					},
					onoffline : function() {
					}
				});
			}

		});
	}
}
