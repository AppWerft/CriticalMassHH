exports.create = function() {
	var self = require('vendor/window').create();
	self.addEventListener('focus', function() {
		if (self.ready)
			return;
		self.ready = true;
		var views = [];
		for (var i = 1; i < 8; i++) {
			views[i] = Ti.UI.createView({
				backgroundImage : '/assets/ls' + i + '.png'
			});
		}
		var container = Ti.UI.createScrollableView({
			showPagingControl : true,
			
			views : views
		});
		self.add(container);
		container.currentPage = 7;
		setTimeout(function() {
			container.scrollToView(0);
		}, 700);
	});
	return self;
};

