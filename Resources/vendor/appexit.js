module.exports = function(_ui, _options) {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Ende', 'Abbruch'],
		message : 'Wirklich diese App beenden?',
		title : 'Mögliches Ende.'
	});
	dialog.show();
	dialog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			return false;
		} else {
			Ti.Android && Ti.UI.createNotification({
				message : 'CM finished'
			}).show();
			_ui.close();
			setTimeout(function() {
				Ti.Android.currentActivity.finish();
				require('bencoding.android.tools').createPlatform().exitApp();
			}, 1000);
			return true;
		}
	});
	return false;
};
