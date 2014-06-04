var getPosition =function(e) {
	Ti.Geolocation.removeEventListener('location', getPosition);
	Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
		ononline : function() {
			Ti.App.Apiomat.loginUser(null, {
				onOk : function() {
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
};

// start of background service :
if (Ti.App.Properties.hasProperty('RECORD') && Ti.Geolocation.locationServicesEnabled) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 10;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.addEventListener('location', getPosition);
}
