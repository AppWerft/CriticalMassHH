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
					menu.findItem("7").setVisible(true);
					Ti.Media.createSound({
						url : '/assets/unlock.mp3'
					}).play();
					Ti.UI.createNotification({
						message : 'OK, habe ich verstanden – nun versuche ich Dich beim Nachrichtendienst anzumelden.'
					}).show();
					Ti.App.Properties.setString('USER', new Date());
					Ti.App.CloudPush.push2channel('alert', {
						alert : 'Ein Radler mit einem ' + Ti.Platform.getModel() + ' hat sich zur CM angemeldet',
						title : 'CM hat einen neuen Mitmacher.',
						badget : '+1',
						icon : 'ic_pn_newuser'
					}, function(_e) {
					});
					Ti.App.CloudPush.subscribeChannel('alert', function(_e) {
					});

					//self.tabs[0].getWindow().setRoute();
				} else
					Ti.UI.createNotification({
						message : answer
					}).show();
			}
			speechrecognizer.stop();
		});
		Ti.App.addEventListener('startrecording', function() {
			menu.findItem("1").setChecked(true);
		});
		if (!Ti.App.Properties.hasProperty('CITY')) {
			require('ui/city.dialog').create(/*callback */
			function(_city) {
				if (_city && activity.actionBar) {
					activity.actionBar.setSubtitle(Ti.App.Properties.getString('CHATUSER')+'@'+_city);
				}
			});
		}
		var activity = self.getActivity();
		if (activity && activity.actionBar) {
			activity.actionBar.setTitle('CriticalMass');
			activity.actionBar.setSubtitle(Ti.App.Properties.hasProperty('CITY')//
			? Ti.App.Properties.getString('CITY')//
			: '');
			activity.onCreateOptionsMenu = function(e) {
				menu = e.menu;
				e.menu.add({
					title : "Photo",
					itemId : "9",
					icon : Ti.App.Android.R.drawable.ic_action_camera,
					showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				}).addEventListener("click", function() {
					require('ui/camera.widget').create();
				});
				e.menu.add({
					title : "Twitter",
					itemId : "8",
					icon : Ti.App.Android.R.drawable.ic_action_twitter,
					showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				}).addEventListener("click", function() {
					self.activeTab = 3;
					self.tabs[3].getWindow().fireEvent('write!');
				});
				e.menu.add({
					title : "Parole aufsprechen",
					itemId : 0,
					icon : Ti.App.Android.R.drawable.ic_action_mic,
					showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
					visible : Ti.App.Properties.hasProperty('USER') ? false : true
				}).addEventListener("click", function() {
					Ti.UI.createNotification({
						message : 'Jetzt die vereinbarte Parole einsprechen.'
					}).show();
					self.tabs[0].getWindow().showMicro();
					speechrecognizer.setAction(1);
					speechrecognizer.start();
					setTimeout(self.tabs[0].getWindow().hideMicro, 100000);
				});

				e.menu.add({
					title : "Standort senden",
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : 1,
					checked : (Ti.App.Properties.hasProperty('RECORD')) ? true : false,
					checkable : true,
					visible : true
				}).addEventListener("click", function(_e) {
					var item = _e.source;
					if (item.checked == true) {
						item.setChecked(false);
						Ti.App.fireEvent('stoprecording');
						Ti.App.Properties.removeProperty('RECORD');
						
					} else {
						item.setChecked(true);
						Ti.App.fireEvent('startrecording');
						Ti.App.Properties.setString('RECORD', 'active');
					}
					console.log('RECORD=' + Ti.App.Properties.hasProperty('RECORD'));
				});
				e.menu.add({
					title : "Stadt wechseln",
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : 3,
					visible : true
				}).addEventListener("click", function() {
					require('ui/city.dialog').create(function(_city) {
						activity.actionBar.setSubtitle(_city);
						require('vendor/address2region')(_city,function(_region){
							self.tabs[0].getWindow().mapview.setRegion(_region);
						});
					});
				});
				e.menu.add({
					title : "Treffpunkt bekanntgeben",
					visible : false,
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER,
					itemId : "7",
					visible : Ti.App.Properties.hasProperty('USER') ? true : false
				}).addEventListener("click", function() {
					require('ui/admin.window').create().open();

				});
			};
		}

	}
};
