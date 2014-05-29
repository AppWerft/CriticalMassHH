var Cloud = require('ti.cloud');
var CloudPush = require('ti.cloudpush');

var CP = function(_callback) {
	this.userid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 7);
	var that = this;
	if (Ti.Android && Ti.Platform.Android.API_LEVEL > 12 && Ti.Network.online == true) {
		CloudPush.showTrayNotificationsWhenFocused = true;
		CloudPush.focusAppOnPush = false;
		CloudPush.showTrayNotification = true;
		CloudPush.singleCallback = false;
		CloudPush.retrieveDeviceToken({
			success : function(e) {
				console.log('Info: deviceToken saved');
				Ti.App.Properties.setString('deviceToken', e.deviceToken);
				that.deviceToken = e.deviceToken;
				Cloud.Users.login({
					login : 'dummy',
					password : 'dummy'
				}, function(e) {
					that.login = true;
					console.log('Info: login into ACS ' + e.success);
					_callback && _callback(e);
				});
			}
		});
	}
	return this;
};

CP.prototype = {
	subscribeChannel : function(_channel, _callback) {
		var that = this;
		Cloud.PushNotifications.subscribe({
			channel : Ti.App.Properties.getString('CITY', '') + _channel,
			device_token : that.deviceToken,
			type : 'android'
		}, _callback);
	},
	unsubscribeChannel : function(_channel, _callback) {
		var that = this;
		Cloud.PushNotifications.unsubscribe({
			channel : Ti.App.Properties.getString('CITY', '') + _channel,
			device_token : that.deviceToken,
			type : 'android'
		}, _callback);
	},
	push2channel : function(_channel, _payload, _callback) {
		_payload.uid = this.userid;
		Cloud.PushNotifications.notify({
			channel : Ti.App.Properties.getString('CITY', '') + _channel,
			friends : true,
			"to_ids" : "everyone",
			payload : _payload
		}, _callback);
	},
	addEventListener : function(_key, _callback) {
		this.callbacks[_key] = _callback;

	}
};

CloudPush.addEventListener('callback', function(_payload) {
	var payload = JSON.parse(_payload.payload);
	if (payload.latlng) {
		console.log(JSON.stringify(payload));
		Ti.App.Properties.setObject('POSITION', payload);
		Ti.App.fireEvent('newposition', payload);
	}
	if (payload.chattext) {
		if (that.userid == payload.userid) {
			payload.device = 'ICH';
			ich = true;
		}

	}
});

CloudPush.addEventListener('trayClickLaunchedApp', function(_payload) {
	Ti.API.info('Tray Click Launched App (app was not running)');
});
CloudPush.addEventListener('trayClickFocusedApp', function(_payload) {

	Ti.API.info('Tray Click Focused App (app was already running)');
});

module.exports = CP;
