module.exports = function(_address, _callback) {
	var client = Ti.Network.createHTTPClient({
		onload : function() {
			try {
				var json = JSON.parse(this.responseText);
				if (json.status == 'OK') {
					var result =  json.results[0].geometry;
					var region = {
						latitude : result.location.lat,
						longitude : result.location.lng,
						latitudeDelta : 1.2*(Math.abs(result.viewport.northeast.lat - result.viewport.southwest.lat)),
						longitudeDelta : 1.2*(Math.abs(result.viewport.northeast.lng - result.viewport.southwest.lng))
					};
					_callback(region);
				}
			} catch (E) {
				console.log('Error: ' + E);
			}
		}
	});
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + _address + '&sensor=false';
	client.open('GET', url);
	client.send();
};