var Compass = function(_active) {
	this.view = Ti.UI.createView({
		width : 100,
		opacity : (_active) ? 1 : 0.8,
		height : 120
	});
	this.active = _active;
	this.view.compass = Ti.UI.createImageView({
		image : '/assets/rad.png',
		width : '90%',
		height : 'auto',
		top : 0
	});
	this.oldheading = 0;
	this.view.label = Ti.UI.createLabel({
		color : '#00FF12',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		text : '',
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
	this.onrotate = function(e) {
		if (!e.error && e.heading) {
			var accuracy = e.heading.accuracy;
			var heading = e.heading.trueHeading ? e.heading.trueHeading : e.heading.magneticHeading;
			that.view.label.setText(Math.round(heading / 3.6));
			//that.view.accuracy.setText(accuracy);
			/*
			 if (heading != that.oldheading) {
			 var t = Ti.UI.create2DMatrix();
			 t = t.rotate(360 - heading);
			 that.view.compass.transform = t;
			 that.oldheading = heading;
			 }*/
		}
	};
	Ti.Geolocation.purpose = 'Get Current Heading';
	Ti.Geolocation.showCalibration = false;
	Ti.Geolocation.headingFilter = 1;
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
			that.view.opacity = 0.2;
			Ti.Geolocation.removeEventListener('heading', that.onrotate);
			return false;
		} else {
			that.active = true;
			that.view.opacity = 1;
			Ti.Geolocation.addEventListener('heading', that.onrotate);
			return true;
		}
	},
	stop : function() {
		var that = this;
		if (that.active == true) {
			that.active = false;
			that.view.opacity = 0.2;
			Ti.Geolocation.removeEventListener('heading', that.onrotate);
			return false;
		}
	},
	getValue : function() {
		return this.view.label.getText();
	}
};

module.exports = Compass;

