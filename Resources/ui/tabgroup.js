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
	}),Ti.UI.createTab({
	 icon : Ti.Android ? null : '/assets/map.png',
	 title : 'Chat',
	 window : require('ui/chat.window').create()
	 }),
	Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : 'Videos',
		window : require('ui/videos.window').create()
	}), Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : 'RadlerPhotos',
		window : require('ui/photolist.window').create()
	}), Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : '#cm_hh',
		window : require('ui/twitter/window').create()
	}), Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : 'F.A.Q.',
		window : require('ui/faq.window').create()
	}), Ti.UI.createTab({
		icon : Ti.Android ? null : '/assets/map.png',
		title : 'LoveStory',
		window : require('ui/lovestory.window').create()
	})];
	for (var i = 0; i < tabs.length; i++) {
		self.addTab(tabs[i]);
	}
	self.addEventListener("open", function() {
		require('ui/tabgroup.menue').get(self);
	});
	self.addEventListener("androidback", function() {
		setTimeout(function() {
			self.close();
		}, 1000);
		return false;
	});
	return self;
};
