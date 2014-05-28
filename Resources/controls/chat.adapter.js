const CHAT = "chat";
var Chat = function() {
	return this;
};
Chat.prototype = {
	register : function(_callbacks) {
		var that = this;
		this.userid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 7);
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
						alert('Error: subsribing of channel failed');
					}
				});
			}
		});
		var CloudPush = require('ti.cloudpush');
		CloudPush.addEventListener('callback', function(_push) {
			console.log(_push);
			var payload = JSON.parse(_push.payload);
			var ich = false;
			if (payload && payload.chattext) {
				if (that.userid == payload.userid) {
					payload.device = 'ICH';
					ich = true;
				}
				if (payload.chattext)
					_callbacks.received(payload);
			}

		});
	},
	unregister : function() {
	},
	write : function(text) {
		var that = this;
		this.cloud.PushNotifications.notify({
			channel : CHAT,
			friends : "true",
			"to_ids" : "everyone",
			payload : {
				chattext : text,
				sound : 'default',
				title : text,
				userid : that.userid,
				icon : 'ic_pn_newuser',
				android : {
					vibrate : true
				},
				device : Ti.Platform.model.replace(' ', '')
			}
		}, function(e) {
			if (e.success) {
				console.log('Info: chat write succed.');
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
};
module.exports = Chat;

