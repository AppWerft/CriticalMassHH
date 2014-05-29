exports.create = function() {
	var self = require('vendor/window').create({
		title : 'CriticalMass ' + Ti.App.Properties.getString('CITY'),
		subtitle : 'Bestimmerbereich'
	});
	Ti.Map = require('ti.map');
	function getAddress(_latitude, _longitude) {
		require('vendor/geo.reverseresolve').get(_latitude + ',' + _longitude, function(_res) {
			self.location.text = _res;
			message.address = _res;
			message.latlng = _latitude + ',' + _longitude;
		});
	}

	var message = {
		latlng : '',
		address : '',
		text : ''
	};
	self.container = Ti.UI.createView({
		backgroundColor : 'black',
		layout : 'vertical',
		bottom : 20
	});
	self.add(self.container);
	self.location = Ti.UI.createLabel({
		height : 20,
		bottom : 0,
		textAlign : 'left',
		left : 10,
		font : {
			fontSize : 12
		},
		width : Ti.UI.FILL,
		color : 'orange',
		text : 'Standort der Abfahrt'
	});
	self.add(self.location);
	self.container.add(Ti.UI.createLabel({
		top : 0,
		color : 'white',
		left : 10,
		top : 10,
		textAlign : 'left',
		right : 10,
		height : Ti.UI.SIZE,
		bottom : 10,
		text : 'Hier können die Bestimmer den Startpunkt der Fahrt festlegen. Ziehe einfach den Pin zum Treffpunkt oder sag mir die Adresse.\nZum eigentlichen Versenden brauchst Du ein Passwort.'
	}));
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.NORMAL_TYPE,
		top : 0,
		bottom : 20,
		enableZoomControls : false,
		region : {
			latitude : 53.553270540,
			longitude : 10.00963632,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		animate : false,
		traffic : true,
		regionFit : true,
		userLocation : false
	});
	self.input = Ti.UI.createTextField({
		color : '#eee',
		left : 0,
		width : Ti.UI.FILL,
		height : 45,
		returnKeyType : Ti.UI.RETURNKEY_GO,
		hintText : 'Textnachricht an Teilnehmer …',
		top : 0,
		font : {
			fontSize : 20,
			fontFamily : 'LW'
		},
		backgroundColor : 'black',
		enableReturnKey : true
	});
	self.container.add(self.input);

	self.container.add(self.mapview);

	self.input.addEventListener('return', function() {
		message.text = self.input.getValue();
		self.input.blur();
	});
	self.addEventListener('open', function() {
		var activity = self.getActivity();
		if (activity && activity.actionBar) {
			activity.onCreateOptionsMenu = function(e) {
				if (Ti.Android && Ti.Platform.Android.API_LEVEL > 12 && Ti.Network.online == true) {

					e.menu.add({
						icon : Ti.App.Android.R.drawable.ic_action_mic,
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						itemId : 1
					}).addEventListener("click", function() {
						require('controls/speechrecognizer').create(null, function(_res) {
							require('vendor/geo.resolve').get({
								city : _res
							}, function(_geo) {
								console.log(_geo);
								if (!_geo.res.lat)
									return;
								getAddress(_geo.res.lat,_geo.res.lng);
								var region = self.mapview.getRegion();
								region.latitude = _geo.res.lat;
								region.longitude = _geo.res.lng;
								region.animated = true;
								self.mapview.setLocation(region);
								console.log('region OK');
								if (self.pin && self.mapview) {
									self.pin.setLatitude(_geo.res.lat);
									self.pin.setLongitude(_geo.res.lng);
								}
							});
						});
					});
					e.menu.add({
						icon : Ti.App.Android.R.drawable.ic_action_megafon,
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						itemId : 1
					}).addEventListener("click", function() {
						require('ui/admin.dialog').create(function(_res) {
							if (_res == true) {
								Ti.App.CloudPush.push2channel('alert', {
									alert : message.address,
									latlng : message.latlng,
									message : message.text,
									title : 'Neuer Treffpunkt',
									badget : '+1',
									sound : 'klingel',
									icon : 'ic_pn_newuser',
									vibrate : true
								}, function(_e) {
									if (_e.success) {
										self.close();
									}
								});
							}
						});
					});
				}
			};
		}
	});
	Ti.Geolocation.getCurrentPosition(function(_e) {
		if (_e.success) {
			console.log(_e.coords);
			getAddress(_e.coords.latitude, _e.coords.longitude);
			self.mapview.setRegion({
				latitude : _e.coords.latitude,
				longitude : _e.coords.longitude,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			});

			self.pin = Ti.Map.createAnnotation({
				latitude : _e.coords.latitude,
				longitude : _e.coords.longitude,
				draggable : true
			});
		}
		self.mapview.addEventListener('pinchangedragstate', function(_e) {
			getAddress(_e.annotation.latitude, _e.annotation.longitude);
		});
		self.mapview.addAnnotation(self.pin);
	});
	return self;
};
