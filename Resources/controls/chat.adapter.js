const CHAT = "chat";
var Chat = function() {
	return this;
};
Chat.prototype = {
	register : function(_callbacks) {
		var that = this;
		this.cloud = require('ti.cloud');
		this.cloud.Users.login({
			login : 'dummy',
			password : 'dummy'
		}, function(e) {
			if (e.success) {
				that.cloud.PushNotifications.subscribe({
					"channel" : CHAT,
					"device_token" : Ti.App.Properties.getString('deviceToken'),
					"type" : "android"
				}, function(e) {
					if (e.success) {
						Ti.UI.createNotification({
							message : 'Chatanmeldung erfolgreich'
						}).show();
						_callbacks.registered();
					} else {
						console.log('Error: subsribing of channel failed');
					}
				});
			}
		});
		var CloudPush = require('ti.cloudpush');
		//CloudPush.enabled = true;
		CloudPush.showTrayNotificationsWhenFocused = false;
		CloudPush.focusAppOnPush = false;
		CloudPush.addEventListener('callback', function(evt) {
			console.log('Info: callback in chat ===============================');
			var chattext = JSON.parse(evt.payload);
			if (chattext)
				_callbacks.received(chattext);
		});
	},
	unregister : function() {
	},
	write : function(text) {
		this.cloud.PushNotifications.notify({
			channel : CHAT,
			friends : true,
			payload : {
				chattext : text,
				sound : 'default',
				title : text,
				icon : 'ic_pn_newuser',
				android : {
					vibrate : true
				},
				device : Ti.Platform.model.replace(' ','')
			}
		}, function(e) {
			if (e.success) {
				console.log('Info: chat write succed.');

			} else {
				console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
};

module.exports = Chat;

var example = {
	"type" : "callback",
	"source" : {
		"pushType" : "gcm",
		"invocationAPIs" : [],
		"bubbleParent" : true,
		"showTrayNotification" : true,
		"enabled" : false,
		"__propertiesDefined__" : true,
		"singleCallback" : false,
		"_events" : {
			"callback" : [{}, {}, {}],
			"trayClickLaunchedApp" : {},
			"trayClickFocusedApp" : {}
		},
		"focusAppOnPush" : false,
		"showAppOnTrayClick" : true,
		"showTrayNotificationsWhenFocused" : false,
		"apiName" : "Ti.Module"
	},
	"payload" : "{\"android\":{\"alert\":\"aaaaaaaaa\"}}",
	"bubbles" : false,
	"cancelBubble" : false
};
