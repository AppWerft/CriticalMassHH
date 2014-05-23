exports.init = function() {
	if (!Ti.Android || Ti.Platform.Android.API_LEVEL < 13 || Ti.Network.online == false) {
		Ti.UI.createNotification({
			message : 'Dieses Gerät kann zur Zeit keine Kurzbenachrichtigungen empfangen'
		}).show();
		return;
	}
	var CloudPush = require('ti.cloudpush');
	var deviceToken = null;
	var options = {
		showTrayNotificationsWhenFocused : true,
		showTrayNotification : true,
		focusAppOnPush : false,
		enabled : true
	};
	for (var key in options) {
		CloudPush[key] = options[key];
	}
	CloudPush.clearStatus();
	CloudPush.enabled = true;
	CloudPush.retrieveDeviceToken({
		success : deviceTokenSuccess,
		error : deviceTokenError
	});
	var Cloud = require('ti.cloud');
	Cloud.debug = false;
	var deviceToken = null;

	function deviceTokenError(e) {
		Ti.UI.createNotification({
			message : 'Problem bei der Anmeldung zum Benachichtigungsdienst'
		}).show();
	}

	function deviceTokenSuccess(e) {
		Ti.App.Properties.setString('deviceToken', e.deviceToken);
		deviceToken = e.deviceToken;
		Cloud.Users.login({
			login : 'dummy',
			password : 'dummy'        
		}, function(e) {
			if (e.success) {
				Cloud.PushNotifications.subscribe({
					channel : 'criticalmass',
					device_token : deviceToken,
					type : 'gcm'
				}, function(e) {
					if (e.success) {
						Ti.UI.createNotification({
							message : 'Benachichtigungsdienst ist aktiviert.\nDu bekommst jetzt immer rechtzeitig den Treffpunkt zum CriticalMass mitgeteilt.'
						}).show();
					} else {
					}
				});

			} else {
			}
		});

	}


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

