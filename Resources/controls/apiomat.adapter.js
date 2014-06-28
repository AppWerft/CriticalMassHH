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
	var callbacks = arguments[0] || {};
	this.userid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 7);
	this.user = {};
	// test if online:
	var xhr = Ti.Network.createHTTPClient({
		onload : callbacks.ononline,
		onerror : callbacks.onoffline
	});
	xhr.open('HEAD', 'https://apiomat.org/yambas/rest');
	xhr.send();
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
	this.user.setRegistrationId(Ti.App.Properties.getString('deviceToken'));
	var loaded = false;
	this.user.loadMe({
		onOk : function() {
			console.log('Info: login into apiomat OK');
			var ratio = that.user.getRatio();
			that.user.image = (ratio) ? that.user.getPhotoURL(200, null, null, null, 'png') + '&mtime=' + that.user.data.lastModifiedAt + '.png' : null;
			that.user.bigimage = (ratio) ? that.user.getPhotoURL(900, null, null, null, 'png') + '&mtime=' + that.user.data.lastModifiedAt + '.png' : null;
			console.log(that.user.image);
			callbacks.onOk && callbacks.onOk();
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
	myNewPosition.setUserid(that.userid);
	myNewPosition.setApi(Ti.Platform.Android.API_LEVEL);
	myNewPosition.setVersion(Ti.App.version);
	myNewPosition.setEnabled(args.enabled);
	myNewPosition.save({
		onOk : function() {
			console.log('Info: new position (from alarm process) successful saved ' + myNewPosition);
		},
		onError : function() {
			console.log('Error: cannot save new position (from alarm process) ' + E);
	
		}
	});

};
ApiomatAdapter.prototype.getAllRadler = function(_options, _callbacks) {
	var radler = Ti.App.Properties.getObject('RADLERLIST');
	var devices = [];
	for (var i in radler){
		devices.push(radler[i].device);
	}
	console.log(devices.join(' | '));
	_callbacks.onOk(radler);
};

ApiomatAdapter.prototype.saveChatPhoto = function(_options) {
	var that = this;
	if (!that.user) return;
	Ti.App.Properties.setString('CHATUSER', _options.firstname);
	that.user.setRatio(_options.ratio);
	that.user.setFirstName(_options.firstname);
	that.user.postPhoto(_options.image, {
		onOk : function() {
			that.user.save({
				onOk : function() {
					Ti.UI.createNotification({
						message : 'Pseudonym gespeichert.'
					}).show();
					console.log('Info: metadates of chatter succeddful saved in cloud');
				},
				onError : function() {
				}
			});
			var mtime = that.user.data.lastModifiedAt;
			that.user.image = that.user.getPhotoURL(200, null, null, null, 'png') + '&mtime=' + mtime;
			Ti.App.Properties.setString('CHATPHOTO', that.user.image);
			that.user.bigimage = that.user.getPhotoURL(900, null, null, null, 'png') + '&mtime=' + mtime;

			Ti.UI.createNotification({
				message : 'Dein Photo ist erfolgreich verteilt.'
			}).show();
		}
	});

};

ApiomatAdapter.prototype.postPhoto = function(_args, _callbacks) {
	var args = arguments[0] || {}, callbacks = arguments[1] || {}, that = this;
	var myNewPhoto = new Apiomat.Photo();
	myNewPhoto.setLocationLatitude(args.latitude);
	// from getPosition
	myNewPhoto.setLocationLongitude(args.longitude);
	myNewPhoto.setTitle(args.title);
	// ti.blob from camera
	myNewPhoto.postPhoto(args.photo, function(e) {
		console.log('Error: ' + e);
	});
	myNewPhoto.save({
		onOK : function() {
			console.log('Info: newPhoto.save successful');

			Ti.Android && Ti.UI.createNotification({
				message : 'Photo erhalten.'
			}).show();
			that.user.postmyPhotos(myNewPhoto, {
				onOk : function() {
					Ti.Android && Ti.UI.createNotification({
						message : 'Photo erfolgreich gespeichert.'
					}).show();
					Ti.Media.vibrate();
					console.log('Info: photo uploaded');
				},
				onError : function() {
				}
			});
		},
		onError : function() {
		}
	});

};
ApiomatAdapter.prototype.deletePhoto = function(_id, _callbacks) {
	for (var i = 0; i < this.photos.length; i++) {
		// only own phots has an id:
		if (this.photos[i].data.id && this.photos[i].data.id == _id) {
			this.photos[i].deleteModel({
				onOk : function() {
					Ti.Android && Ti.UI.createNotification({
						message : 'Photo in Liste gelöscht'
					}).show();
					Ti.Media.vibrate();
					_callbacks.ondeleted();
					console.log('SUCCESSFUl deleted');
				},
				onError : function(error) {
					console.log(error);
				}
			});
			break;
		}
	}
};

ApiomatAdapter.prototype.getChatImage = function() {
	return Ti.App.Properties.hasProperty('CHATPHOTO') ? Ti.App.Properties.getString('CHATPHOTO') : null;
};

ApiomatAdapter.prototype.getAllPhotos = function(_args, _callbacks) {
	var that = this;
	Apiomat.Photo.getPhotos("order by createdAt limit 500", {
		onOk : function(_res) {
			that.photos = _res;
			var photolist = [];
			for (var i = 0; i < that.photos.length; i++) {
				var photo = that.photos[i];
				var ratio = photo.getRatio() || 1.3;
				photolist.push({
					id : (photo.data.ownerUserName == that.user.getUserName())//
					? photo.data.id : undefined,
					latitude : photo.getLocationLatitude(),
					longitude : photo.getLocationLongitude(),
					title : photo.getTitle(),
					ratio : ratio,
					bigimage : photo.getPhotoURL(600, null, null, null, 'png') ,
				});
			}
			_callbacks.onload(photolist);
		},
		onError : function(error) {
			//handle error
		}
	});

};
module.exports = ApiomatAdapter;
