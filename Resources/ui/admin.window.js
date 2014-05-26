exports.create = function() {
	var self = require('vendor/window').create({
		title : 'CriticalMass ' + Ti.App.Properties.getString('CITY'),
		subtitle : 'Bestimmerbereich'
	});
	self.layout = 'vertical', Ti.Map = require('ti.map');
	self.add(Ti.UI.createLabel({
		top : 0,
		color : 'white',
		left : 10,
		top : 10,
		textAlign : 'left',
		right : 10,
		height : Ti.UI.SIZE,
		bottom : 10,
		text : 'Hier kannst Du den Startpunkt der Fahrt festlegen. Ziehe einfach den Pin zum Treffpunkt'
	}));
	self.mapview = Ti.Map.createView({
		mapType : Ti.Map.TERRAIN_TYPE,
		top : 0,
		bottom : 70,
		enableZoomControls : false,
		region : {
			latitude : 53.553270540,
			longitude : 10.00963632,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		animate : false,
		regionFit : true,
		userLocation : false
	});
	self.input = Ti.UI.createTextField({
		color : '#eee',
		left : 0,
		width : Ti.UI.FILL,
		height : 50,
		returnKeyType : Ti.UI.RETURNKEY_GO,
		hintText : 'Textnachricht an Teilnehmer …',
		bottom : 0,
		font : {
			fontSize : 20,
			fontFamily : 'LW'
		},
		backgroundColor : 'black',
		enableReturnKey : true
	});
	self.add(self.input);
	self.location = Ti.UI.createLabel({
		height : 20,
		top : 0,textAlign:'left',left:10,
		color : 'white',
		text : 'Standort'
	});
	
	Ti.Geolocation.getCurrentPosition(function(_e) {
		if (_e.success) {
			require('vendor/geo.reverseresolve').get(_e.coords.latitude + ',' + _e.coords.longitude, function(_res) {
				self.location.setText(_res);
			});
			self.mapview.setRegion({
				latitude : _e.coords.latitude,
				longitude : _e.coords.longitude,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			});
		}
		self.pin = Ti.Map.createAnnotation({
			latitude : _e.coords.latitude,
			longitude : _e.coords.longitude,
			draggable : true
		});
		self.mapview.addEventListener('pinchangedragstate', function(_e) {
			require('vendor/geo.reverseresolve').get(_e.annotation.latitude + ',' + _e.annotation.longitude, function(_res) {
				self.location.setText(_res);
			});

		});
		self.mapview.addAnnotation(self.pin);
	});
	self.add(self.mapview);
	self.add(self.location);
	self.addEventListener('open', function() {
		var activity = self.getActivity();
		if (activity && activity.actionBar) {
			activity.onCreateOptionsMenu = function(e) {
				if (Ti.Android && Ti.Platform.Android.API_LEVEL > 12 && Ti.Network.online == true) {
					e.menu.add({
						icon : Ti.App.Android.R.drawable.ic_action_megafon,
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						itemId : 1
					}).addEventListener("click", function() {
						require('ui/admin.dialog').create(function(_res) {
							if (_res == true) {

							}
						});
					});
				}
			};
		}
	});
	return self;
};
