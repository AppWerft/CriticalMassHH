Ti.Map = require('ti.map');

exports.create = function() {
	var options = arguments[0] || {};
	var ready = false;
	var annotations = [];
	var self = require('vendor/window').create({
	});
	var radlertext = Ti.UI.createLabel({
		color : 'white',
		height : 20,
		textAlign : 'left',
		left : 10,
		bottom : 0,
		text : ''
	});
	self.backgroundColor = 'black';
	self.add(radlertext);
	var updateAnnotations = function(_positionslist) {
		var positions = _positionslist;
		if (!positions) return;
		if (annotations.length)
			self.mapview.removeAllAnnotations();
		annotations = [];
		radlertext.setText(positions.length + ' Radler');
		for (var i = 0; i < positions.length; i++) {
			annotations.push(Ti.Map.createAnnotation({
				latitude : positions[i].latitude,
				longitude : positions[i].longitude,
				image : '/assets/' + Ti.Platform.displayCaps.density + '.png',
			}));
		}
		self.mapview.addAnnotations(annotations);
	};
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		bottom : 20,
		enableZoomControls : false,
		region : {
			latitude : 53.553270540,
			longitude : 10.00963632,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		animate : true,
		regionFit : true,
		userLocation : true
	});

	self.addEventListener('focus', function() {
		if (!ready) {
			self.add(self.mapview);
			ready = true;
		}
	});

	var micro = Ti.UI.createImageView({
		width : Ti.UI.FILL,
		height : 'auto',
		image : '/assets/micro.png',
		bottom : -1000,
		touchEnabled : false,
		zIndex : 9999,
	});
	self.add(micro);
	self.setRoute = function() {
		var routes = Ti.App.Sternfahrt.getAllRoutes();
		for (var i = 0; i < routes.length; i++) {
			self.mapview.addRoute(Ti.Map.createRoute(routes[i]));
		};
		self.remove(micro);
	};
	
	Ti.App.Apiomat.startCron(updateAnnotations);
	
	self.showMicro = function() {
		micro.animate({
			bottom : 0,
			duration : 700
		});
	};
	self.hideMicro = function() {
		micro.animate({
			bottom : -1000,
			duration : 700
		});
	};
	return self;
};
