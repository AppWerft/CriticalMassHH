var getPosition = function(e) {
	Ti.Geolocation.removeEventListener('location', getPosition);
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

// start of background service :

if (Ti.App.Properties.hasProperty('RECORD') && Ti.Geolocation.locationServicesEnabled) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 100;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.addEventListener('location', getPosition);
}
