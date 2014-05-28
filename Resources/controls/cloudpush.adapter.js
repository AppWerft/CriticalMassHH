var Cloud = require('ti.cloud');
var CloudPush = require('ti.cloudpush');

var CP = function(_callback) {
	var that = this;
	if (Ti.Android && Ti.Platform.Android.API_LEVEL > 12 && Ti.Network.online == true) {
		CloudPush.showTrayNotificationsWhenFocused = true;
		CloudPush.focusAppOnPush = false;
		CloudPush.showTrayNotification = true;
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
			channel : _channel,
			device_token : that.deviceToken,
			type : 'android'
		}, _callback);
	},
	unsubscribeChannel : function(_channel, _callback) {
		var that = this;
		Cloud.PushNotifications.unsubscribe({
			channel : _channel,
			device_token : that.deviceToken,
			type : 'android'
		}, _callback);
	},
	push2channel : function(_channel, _payload, _callback) {
		Cloud.PushNotifications.notify({
			channel : _channel,
			friends : true,
			"to_ids" : "everyone",
			payload : _payload
		}, _callback);
	}
};

CloudPush.addEventListener('callback', function(_payload) {
	console.log(_payload);
	var payload = JSON.parse(_payload.payload);
	if (payload.latlng) {
		console.log(JSON.stringify(payload));
		Ti.App.Properties.setObject('POSITION', payload);
		Ti.App.fireEvent('newposition', payload);
	}
});
CloudPush.addEventListener('trayClickLaunchedApp', function(_payload) {
	Ti.API.info('Tray Click Launched App (app was not running)');
});
CloudPush.addEventListener('trayClickFocusedApp', function(_payload) {
	console.log(_payload.payload);
	var payload = JSON.parse(_payload.payload);
	if (JSON.parse(payload).latlng) {
		var dialog = Ti.UI.createAlertDialog({
			message : "Neuer Treffpunkt: " + payload.address + '\n' + payload.text,
			title : 'Neue Position'
		}).show();
	}
	Ti.API.info('Tray Click Focused App (app was already running)');
});

exports.sendPosition = function(_message, callback) {
	var CloudPush = require('ti.cloudpush');
	//CloudPush.showTrayNotificationsWhenFocused = true;
	//CloudPush.focusAppOnPush = false;
	//CloudPush.showTrayNotification = true;
	Cloud.Users.login({
		login : 'dummy',
		password : 'dummy'
	}, function(_e) {
		if (_e.success) {
			console.log('Info: sendPosition successful login int ACS');
			var payload = {
				alert : (_message.text) || null,
				title : _message.address,
				latlng : _message.latlng,
				android : {
					vibrate : true
				},
				timestamp : new Date(),
				icon : 'ic_pn_newuser'
			};
			Cloud.PushNotifications.notify({
				channel : ALERT,
				friends : true,
				"to_ids" : "everyone",
				payload : payload
			}, function(e) {
				if (e.success) {
					console.log('Info: push notification succed.');
					Ti.UI.createNotification({
						message : 'Alle  Radler sind informiert.'
					}).show();
				}
				callback(e);
			});
		} else
			console.log('Error: login into ACS as dummy');
	});
};

module.exports = CP;
