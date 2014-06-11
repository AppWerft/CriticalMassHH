! function() {
	var tabgroup = null;
	Ti.App.Sternfahrt = new (require('controls/cmhh'))();
	Ti.App.ImageFactory = require('ti.imagefactory');
	Ti.App.Speechrecognizer = require('jp.isisredirect.speechrecognizer');
	Ti.App.CloudPush = new (require('controls/cloudpush.adapter'))(function(_e) {
		if (_e.success) {

		}
	});
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	Ti.App.SmartMap = new (require('ui/smartmap.widget'))();
	Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
		ononline : function() {

			Ti.App.Apiomat.loginUser(null, {
			});
		},
		onoffline : function() {
			alert('Diese App braucht das Neuland …');
			if (tabgroup)
				tabgroup.close();
		}
	});
	var splash = require('ui/splash.window')(function() {
		tabgroup = require('ui/tabgroup').create();
		tabgroup.open();
	});
	require('controls/alarm.manager')();
	Ti.Android && require('vendor/versionsreminder')();
}();
