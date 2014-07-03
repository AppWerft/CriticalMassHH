module.exports = function() {
	Ti.App.Apiomat.loginUser(null, {
	});
	Ti.App.ImageFactory = require('ti.imagefactory');
	Ti.App.Speechrecognizer = require('jp.isisredirect.speechrecognizer');
	Ti.App.CloudPush = new (require('controls/cloudpush.adapter'))(function(_e) {
	});
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	var tabgroup = require('ui/tabgroup').create();
	
	require('controls/alarm.manager')();
	Ti.Android && require('vendor/versionsreminder')();
	Ti.API.info("AppVersionCode = " + Ti.Media.Android.appVersionCode + " AppVersionName = " + Ti.Media.Android.appVersionName);
	tabgroup.open();
	tabgroup.addEventListener('androidback',require('vendor/appexit'));
};
