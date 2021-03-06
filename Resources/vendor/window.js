exports.create = function() {
	var options = arguments[0] || {};
	var self = Ti.UI.createWindow({
		fullscreen : true,
	});
	if (Ti.Android) {
		self.addEventListener("open", function() {
			var activity = self.getActivity();
			if (activity && activity.actionBar) {
				if (options.navBarHidden == true) {
					activity.actionBar.hide();
				}
				activity.actionBar.setDisplayHomeAsUp(true);
				options.title && activity.actionBar.setTitle(options.title);
				options.subtitle && activity.actionBar.setSubtitle(options.subtitle);
				activity.actionBar.onHomeIconItemSelected = function() {
					self.close();
					console.log('Info: window closed (after click)');
				};
			}
		});
	};
	self.addEventListener("focus", function(e) {
		//self.getActivity().invalidateOptionsMenu();
	});
	return self;
};
