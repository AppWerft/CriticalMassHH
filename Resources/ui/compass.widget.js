var Compass = function(_callback) {
	this.view = Ti.UI.createView({
		width : 100,
		height : 120
	});
	this.active = false;
	this.view.compass = Ti.UI.createImageView({
		image : '/assets/rad.png',
		width : 90,
		opacity : 0.1,
		height : 90,
		top : 0
	});
	this.oldvalue = 0;
	this.view.label = Ti.UI.createLabel({
		color : '#00FF12',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		text : '–',
		font : {
			fontSize : 20,
			fontFamily : 'LW'
		},
		bottom : 0
	});
	this.view.add(this.view.label);
	this.view.add(this.view.compass);
	this.view.rose = Ti.UI.createLabel({
		top : 10,
		color : 'white',
		font : {
			fontSize : 56,
			fontFamily : 'Copse'
		}
	});
	//this.view.add(this.view.rose);

	var that = this;
	this.t = Ti.UI.create2DMatrix();
	this.onrotate = function(e) {
		if (!e.error && e.heading) {
			var accuracy = e.heading.accuracy;
			var heading = e.heading.trueHeading ? e.heading.trueHeading : e.heading.magneticHeading;
			var value = Math.round(heading / 10);
			that.view.label.setText(value);
			if (heading != that.oldvalue) {
				that.oldvalue = value;
				//Ti.Media.vibrate([0,50]);
				//that.t = that.t.rotate(360 - heading);
				//that.view.compass.transform = that.t;
				_callback && _callback();

			}
		} else
			alert('Der Kompass liefert kein Signal. \n\n' + e.error);
	};
	Ti.Geolocation.purpose = 'Hole die Kompassinfo.';
	Ti.Geolocation.showCalibration = false;

	Ti.Geolocation.headingFilter = 100;
	if (!Ti.Geolocation.hasCompass)
		alert('Dieses ' + Ti.Platform.model + ' hat keinen Kompass.');
	return this;
};

Compass.prototype = {
	getView : function() {
		return this.view;
	},
	toggle : function() {
		var that = this;
		Ti.Media.vibrate();
		if (that.active == true) {
			that.active = false;
			that.view.compass.opacity = 0.1;
			Ti.Geolocation.removeEventListener('heading', that.onrotate);
			return false;
		} else {
			that.active = true;
			that.view.compass.opacity = 1;
			setTimeout(function() {
				Ti.Geolocation.addEventListener('heading', that.onrotate);
			}, 100);
			return true;
		}
	},
	stop : function() {
		var that = this;
		Ti.Geolocation.removeEventListener('heading', that.onrotate);
		if (that.active == true) {
			that.active = false;
			that.view.compass.opacity = 0.1;
			return false;
		}
	},
	getValue : function() {
		return this.view.label.getText();
	}
};

module.exports = Compass;

