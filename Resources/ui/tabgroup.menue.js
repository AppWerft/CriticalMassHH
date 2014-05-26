exports.get = function(self) {
	if (Ti.Android) {
		var speechrecognizer = Ti.App.Speechrecognizer.createSpeechRecognizer();
		speechrecognizer.setLangtag('de-DE');
		speechrecognizer.addEventListener(Ti.App.Speechrecognizer.RESULTS, function(e) {
			console.log('Info: speechrecognizer received something ' + e);
			self.tabs[0].getWindow().hideMicro();
			if (e.results && e.results.split(',')[0]) {
				var answer = e.results.split(',')[0];
				if (answer.toLowerCase() == Ti.App.Properties.getString('parole')) {
					menu.findItem("0").setVisible(false);
					menu.findItem("5").setVisible(true);
					menu.findItem("7").setVisible(true);

					Ti.UI.createNotification({
						message : 'OK, habe ich verstanden – nun versuche ich Dich beim Nachrichtendienst anzumelden.'
					}).show();
					Ti.App.Properties.setString('USER', new Date());
					require('controls/cloudpush').init();
					self.tabs[0].getWindow().setRoute();
				} else
					Ti.UI.createNotification({
						message : answer
					}).show();
			}
			speechrecognizer.stop();
		});
		if (Ti.App.Properties.hasProperty('CITY')) {
			Ti.Android && Ti.UI.createNotification({
				message : Ti.App.Properties.getString('CITY')
			}).show();
		} else
			require('ui/city.dialog').create(function(_city) {
				activity.actionBar.setSubtitle(_city);
			});
		var activity = self.getActivity();
		if (activity && activity.actionBar) {
			activity.actionBar.setTitle('CriticalMass');
			activity.actionBar.setSubtitle(Ti.App.Properties.hasProperty('CITY')//
			? Ti.App.Properties.getString('CITY')//
			: '');
			activity.onCreateOptionsMenu = function(e) {
				menu = e.menu;
				if (Ti.Android && Ti.Platform.Android.API_LEVEL > 12 && Ti.Network.online == true) {
					e.menu.add({
						title : "Chat starten",
						icon : Ti.App.Android.R.drawable.ic_action_group,
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						itemId : 5,
						visible : (Ti.App.Properties.hasProperty('USER')) ? true : false
					}).addEventListener("click", function() {
						require('ui/chat.window').create().open();
					});
				}
				if (!Ti.App.Properties.hasProperty('USER')) {
					e.menu.add({
						title : "Parole aufsprechen",
						showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
						itemId : 0,
						visible : true
					}).addEventListener("click", function() {
						Ti.UI.createNotification({
							message : 'Jetzt die vereinbarte Parole einsprechen.'
						}).show();
						self.tabs[0].getWindow().showMicro();
						speechrecognizer.setAction(1);
						speechrecognizer.start();
						setTimeout(self.tabs[0].getWindow().hideMicro,100000);
					});
				}
				e.menu.add({
					title : "Standort senden",
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : 1,
					checked : (Ti.App.Properties.hasProperty('RECORD')) ? true : false,
					checkable : true,
					visible : true
				}).addEventListener("click", function() {
					if ((Ti.App.Properties.hasProperty('RECORD'))) {
						e.menu.getItem(1).checked = false;
						Ti.App.Properties.removeProperty('RECORD');
					} else {
						Ti.App.Properties.setString('RECORD', 'active');
						e.menu.getItem(1).checked = true;
					}
				});
				e.menu.add({
					title : "Stadt wechseln",
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : 3,
					visible : true
				}).addEventListener("click", function() {
					require('ui/city.dialog').create(function(_city) {
						activity.actionBar.setSubtitle(_city);
					});
				});
				e.menu.add({
					title : "Treffpunkt bekanntgeben",
					visible : false,
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : "7",
					visible : true
				}).addEventListener("click", function() {
					require('ui/admin.window').create().open();
					
				});

			};
		}
	}
};
