var speechrecognizerModule = require('jp.isisredirect.speechrecognizer');

exports.create = function() {
	var self = Ti.UI.createTabGroup({
		fullscreen : true,
		exitOnClose : true,
	});
	var menu = null;
	var tabs = [Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : 'Karte',
		window : require('ui/map.window').create()
	}), Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : 'FAQ',
		window : require('ui/faq.window').create()
	})];
	for (var i = 0; i < tabs.length; i++) {
		self.addTab(tabs[i]);
	}
	if (Ti.Android) {
		var speechrecognizer = speechrecognizerModule.createSpeechRecognizer();
		speechrecognizer.setLangtag('de-DE');
		speechrecognizer.addEventListener(speechrecognizerModule.RESULTS, function(e) {
			self.tabs[0].getWindow().hideMicro();
			if (e.results && e.results.split(',')[0]) {
				var answer = e.results.split(',')[0];
				if (answer.toLowerCase() == "klosterstern") {
					menu.getItem(0).visible = false;
					Ti.UI.createNotification({
						message : 'Jetzt bist Du angemeldet.'
					}).show();
					self.tabs[0].getWindow().setRoute();
				} else
					Ti.UI.createNotification({
						message : answer
					}).show();
			}
			speechrecognizer.stop();
		});
		self.addEventListener("open", function() {
			Ti.UI.createNotification({
				message : 'Jetzt die vereinbarte Parole einsprechen.'
			}).show();
			self.tabs[0].getWindow().showMicro();
			setTimeout(function() {
				self.tabs[0].getWindow().hideMicro();
			}, 10000);
			speechrecognizer.setAction(1);
			speechrecognizer.start();
			var activity = self.getActivity();
			if (activity && activity.actionBar) {
				activity.actionBar.setTitle('CriticalMass');
				activity.actionBar.setSubtitle('Hamburg');
				activity.onCreateOptionsMenu = function(e) {
					menu = e.menu;
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
					});
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
				};
			}
		});
	}

	return self;
};

