var uid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 3);
var username = Ti.App.Properties.getString('CHATUSER', '@' + Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 3));
var volume = (Ti.App.Properties.hasProperty('VOLUME')) ? Ti.App.Properties.getString('VOLUME') : 1;

var SocketIO = function() {
	this.socket = require('vendor/socket.io').connect(Ti.App.Properties.getString('chaturi'));
	this.sound = Ti.Media.createAudioPlayer({
		url : '/assets/click.mp3',
		allowBackground : true,
		volume : volume
	});
	var that = this;
	this.socket.on('chatter_joined', function(_payload) {
		that.sound.release();
		that.sound.volume = (Ti.App.Properties.hasProperty('VOLUME')) ? Ti.App.Properties.getString('VOLUME') : 1;
		that.sound.play();
		if (that._handlers)
			for (var item in that._handlers) {
				var message = (_payload.id == uid) ? 'Du hast den Chat betreten.' : ((_payload.username) ? _payload.username : _payload.id) + ' hat den Chat betreten.';
				var photo = (_payload.id == uid) ? Ti.App.Apiomat.getChatImage() : _payload.photo;
				that._handlers[item].call(that, {
					chattext : message,
					photo : photo,
					type : 'join'
				});
			}
		;
		//console.log(_payload);
	});
	this.socket.on('chatter_already_joined', function(_payload) {
		if (that._handlers) {
			for (var item in that._handlers) {
				that._handlers[item].call(that, {
					chatters : _payload,
					type : 'chatters'
				});
			}
		}
		console.log(_payload);
	});
	this.socket.on('chatter_quit', function(_payload) {
		if (that._handlers)
			for (var item in that._handlers) {
				that._handlers[item].call(that, {
					chattext : ((_payload.username) ? _payload.username : _payload.id) + ' hat den Chat verlassen.',
					photo : _payload.photo,
					type : 'join'
				});
			}
		;
	});
	this.socket.on('chatter_said', function(_payload) {
		that.sound.release();
		that.sound.volume = (Ti.App.Properties.hasProperty('VOLUME')) ? Ti.App.Properties.getString('VOLUME') : 1;
		that.sound.play();
		if (that._handlers)
			for (var item in that._handlers) {
				that._handlers[item].call(that, {
					chattext : _payload.username + ': ' + _payload.message,
					photo : _payload.photo
				});
			}
		;
	});
	this._handlers = {};
	return this;
};

SocketIO.prototype = {
	join : function(_callback) {
		var payload = {
			"id" : uid,
			"username" : username,
			"photo" : Ti.App.Apiomat.getChatImage()
		};
		this._handlers[payload.id] = _callback;
		this.socket.emit('join', payload);
	},
	quit : function() {
		var payload = {
			"id" : uid,
			"username" : username,
			"photo" : Ti.App.Apiomat.getChatImage()
		};
		this.socket.emit('quit', payload);
	},
	speak : function(_payload) {
		var that = this;
		_payload.username = username;
		_payload.photo = Ti.App.Apiomat.getChatImage();

		this.socket.emit('speak', _payload);
		for (var item in that._handlers) {
			that._handlers[item].call(that, {
				self : true,
				chattext : 'Ich: ' + _payload.message,
				photo : Ti.App.Apiomat.getChatImage()
			});
		}
	}
};

module.exports = SocketIO;
