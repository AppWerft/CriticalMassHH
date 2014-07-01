! function() {
	var tabgroup = null;
	Ti.App.Sternfahrt = new (require('controls/cmhh'))();
	Ti.App.ImageFactory = require('ti.imagefactory');
	Ti.App.Speechrecognizer = require('jp.isisredirect.speechrecognizer');
	Ti.App.CloudPush = new (require('controls/cloudpush.adapter'))(function(_e) {
	});
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
		ononline : function() {
			var splash = require('ui/splash.window')(function() {
				splash.close();
				tabgroup = require('ui/tabgroup').create();
				tabgroup.open();
			});
			Ti.App.Apiomat.loginUser(null, {
			});
		},
		onoffline : function() {
			alert('Diese App braucht das Neuland …');
			if (tabgroup)
				tabgroup.close();
		}
	});

	require('controls/alarm.manager')();
	Ti.Android && require('vendor/versionsreminder')();
	Ti.API.info("AppVersionCode = " + Ti.Media.Android.appVersionCode + " AppVersionName = " + Ti.Media.Android.appVersionName);
}();
