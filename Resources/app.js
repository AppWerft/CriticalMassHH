! function() {
	require('controls/websocketchat.adapter').start();
	//return;
	Ti.App.Sternfahrt = new (require('controls/cmhh'))();
	
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
	var tabgroup = require('ui/tabgroup').create();
	tabgroup.open();
	require('controls/georecord.dialog').create();
	/* starting of backgroudn geo recording : */
	var alarmModule = require('bencoding.alarmmanager');
	var alarmManager = alarmModule.createAlarmManager();
	alarmManager.addAlarmService({
		service : 'de.appwerft.cm.Geo_serviceService',
		minute : 1,
		requestCode : 41,
		second : 0,
		forceRestart : true,
		interval : 60000
	});
	require('vendor/versionsreminder').start();
	require('vendor/playservice').start();
}();
