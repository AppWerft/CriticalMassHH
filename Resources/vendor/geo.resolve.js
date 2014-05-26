exports.get = function(options, _callback) {
	if (!options.country)
		options.country = '';
	if (!options.city)
		options.city = '';
	if (!options.street)
		options.street = '';
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?language=de&region=de&sensor=true&address=' + encodeURI(options.country + ' ' + options.city+ ' ' + options.street);
	Ti.API.log(url);
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url);
	xhr.onload = function() {
		var res = JSON.parse(this.responseText);
		_callback({
			res : res.results[0].geometry.location,
			success : res.success
		});
	};
	xhr.onerror = function() {
		_callback({
			success : false
		});
	};
	xhr.send();
};
