const ALERT = 'alert';
const CHAT = 'chat';

var Cloud = require('ti.cloud');

exports.init = function() {
	if (!Ti.Android || Ti.Platform.Android.API_LEVEL < 13 || Ti.Network.online == false) {
		Ti.UI.createNotification({
			message : 'Dieses Gerät kann zur Zeit keine Kurzbenachrichtigungen empfangen'
		}).show();
		return;
	}

	Cloud.debug = false;
	var CloudPush = require('ti.cloudpush');
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;
	CloudPush.showTrayNotification = true;
	CloudPush.retrieveDeviceToken({
		success : function(e) {
			Ti.App.Properties.setString('deviceToken', e.deviceToken);
			deviceToken = e.deviceToken;
			Cloud.Users.login({
				login : 'dummy',
				password : 'dummy'
			}, function(e) {
				if (e.success) {
					Cloud.PushNotifications.subscribe({
						channel : ALERT,
						device_token : deviceToken,
						type : 'android'
					}, function(e) {
						if (e.success) {
							Ti.UI.createNotification({
								message : 'Benachichtigungsdienst ist aktiviert.\nDu bekommst jetzt immer rechtzeitig den Treffpunkt zum CriticalMass mitgeteilt.'
							}).show();
							Cloud.PushNotifications.notify({
								channel : ALERT,
								friends : true,
								"to_ids" : "everyone",
								payload : {
									alert : 'Ein Radler mit einem ' + Ti.Platform.getModel() + ' hat sich zu cmHH angemeldet',
									title : 'cmHH hat einen neuen Mitmacher.',
									badget : '+1',
									sound : 'klingel',
									icon : 'ic_pn_newuser',
									vibrate : true
								}
							}, function(e) {
								if (e.success) {
									console.log('Info: push notification succed.');
									Ti.UI.createNotification({
										message : 'Andere Radler sind informiert.'
									}).show();
								} else {
									console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
								}
							});

						} else {
							console.log('Error: subscribing of channel failed');
						}
					});

				}
			});

		},
		error : function(e) {
			Ti.UI.createNotification({
				message : 'Problem bei der Anmeldung zum Benachichtigungsdienst'
			}).show();
		}
	});

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
};

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

