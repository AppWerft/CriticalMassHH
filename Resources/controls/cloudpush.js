exports.init = function() {
	if (!Ti.Android || Ti.Platform.Android.API_LEVEL < 13 || Ti.Network.online == false) {
		Ti.UI.createNotification({
			message : 'Dieses Gerät kann zur Zeit keine Kurzbenachrichtigungen empfangen'
		}).show();
		return;
	}
	var Cloud = require('ti.cloud');
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;
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
						channel : 'alert',
						device_token : deviceToken,
						type : 'android'
					}, function(e) {
						if (e.success) {
							Ti.UI.createNotification({
								message : 'Benachichtigungsdienst ist aktiviert.\nDu bekommst jetzt immer rechtzeitig den Treffpunkt zum CriticalMass mitgeteilt.'
							}).show();
							Cloud.PushNotifications.notify({
								channel : 'alert',
								friends : true,
								payload : {
									alert : 'Ein neuer Radler mit einem ' + Ti.Platform.getModel() + ' hat sich zu CM  angemeldet',
									title : 'A new cycler has subscribed.',
									badget : 1,
									vibrate : true
								}
							}, function(e) {
								if (e.success) {
									console.log('Info: push notification succed.');
									Ti.UI.createNotification({
										message : 'Andere Radler sind informiert'
									}).show();
								} else {
									console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
								}
							});

						} else {
							console.log('Error: subsribing of channel failed');
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

	CloudPush.addEventListener('callback', function(evt) {
		alert(evt.payload);
	});
	CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
		Ti.API.info('Tray Click Launched App (app was not running)');
	});
	CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
		Ti.API.info('Tray Click Focused App (app was already running)');
	});
};

