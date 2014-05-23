exports.create = function(_callback) {
	
	var cities = ['Augsburg', 'Berlin', 'Böblingen', 'Bonn', 'Braunschweig', 'Bremen', 'Darmstadt', 'Dortmund', 'Dresden', 'Düsseldorf', 'Frankfurt am Main', 'Freiburg', 'Gütersloh', 'Hamburg', 'Hannover', 'Heilbronn', 'Kassel', 'Kempten', 'Kiel', 'Koblenz', 'Köln', 'Leipzig', 'Mannheim', 'Müllheim', 'Münster', 'Nürnberg', 'Regensburg', 'Rosenheim', 'Rostock', 'Ruhrgebiet', 'Stuttgart', 'Trier', 'Worms', 'Wuppertal'];
	var self = Ti.UI.createOptionDialog({
		options : cities,
		title : 'Wähle Deine Stadt!'
	});
	self.show();
	self.addEventListener('click', function(_e) {
		if (_e.index >= 0) {
			Ti.App.Properties.setString('CITY', cities[_e.index]);
			_callback && _callback(cities[_e.index]);
		}
	});
};
