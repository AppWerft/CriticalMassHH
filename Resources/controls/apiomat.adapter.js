var Apiomat = require('vendor/apiomat');
var moment = require('vendor/moment');
moment.lang('de');

var saveCB = {
	onOk : function() {
	},
	onError : function(error) {
	}
};

///////////////////////////////////////
// Constructor: ///////////////////////
///////////////////////////////////////
var ApiomatAdapter = function() {
	this.eventname = 'bikerchanged';
	var callbacks = arguments[0] || {};
	// test if online:
	var xhr = Ti.Network.createHTTPClient({
		onload : callbacks.ononline,
		onerror : callbacks.onoffline
	});
	xhr.open('HEAD', 'https://apiomat.org/yambas/rest');
	xhr.send();
};

ApiomatAdapter.prototype.startCron = function(_eventname) {
	var that = this;
	this.eventname = _eventname;
	//this.getAllPositions();
	this.cron = setInterval(that.getAllPositions, 60000);
};

ApiomatAdapter.prototype.stopCron = function() {
	if (this.cron)
		clearInterval(this.cron);
};

ApiomatAdapter.prototype.loginUser = function() {
	var args = arguments[0] || {}, callbacks = arguments[1] || {}, that = this;
	var uid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress());
	var that = this;
	console.log('Info: UID=' + uid);
	Apiomat.Datastore.setOfflineStrategy(Apiomat.AOMOfflineStrategy.USE_OFFLINE_CACHE, {
		onOk : function() {
			console.log('Offline cache gestartet');
		},
		onError : function(err) {
			//Error occurred
		}
	});
	this.user = new Apiomat.Nutzer();
	this.user.setUserName(uid);
	this.user.setPassword('mylittlesecret');
	var loaded = false;
	this.user.loadMe({
		onOk : function() {
			console.log('Info: login into apiomat OK');
			callbacks.onOk && callbacks.onOk();
			that.getAllPositions();
		},
		onError : function(error) {
			console.log('Warning: ' + error);
			if (error.statusCode === Apiomat.Status.UNAUTHORIZED) {
				that.user.save(saveCB);
			} else
				callbacks.onoffline();
		}
	});
	return this;
};

ApiomatAdapter.prototype.setPosition = function(args) {
	var that = this;
	var myNewPosition = new Apiomat.Position();
	myNewPosition.setPositionLatitude(args.latitude);
	myNewPosition.setPositionLongitude(args.longitude);
	myNewPosition.setDevice(Ti.Platform.model);
	myNewPosition.save({
		onOK : function() {
			console.log('Info: position successful saved ' + myNewPosition);
		},
		onError : function() {
		}
	});

};

ApiomatAdapter.prototype.getAllPositions = function() {
	var that = this;
	var now = (parseInt(moment().unix()) - 60) * 1000;
	// letzte 110sec in ms.
	var query = "createdAt > date(" + now + ") order by createdAt DESC";
	console.log('Info: query=' + query);
	Apiomat.Position.getPositions(query, {
		onOk : function(_res) {
			that.positions = _res;
			var  radlerlist = {};
			for (var i = 0; i < that.positions.length; i++) {
				var user =  that.positions[i].data.ownerUserName;
				radlerlist[user] = {
					latitude : that.positions[i].getPositionLatitude(),
					longitude : that.positions[i].getPositionLongitude(),
					device : that.positions[i].getDevice(),
				};
			}
			Ti.App.fireEvent(that.eventname, {
				radler : radlerlist
			});

		},
		onError : function(error) {
			console.log('Error: ' + error);

		}
	});

};

/// SETTER:

module.exports = ApiomatAdapter;
