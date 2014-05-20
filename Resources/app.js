! function() {
	Ti.App.Sternfahrt = new (require('controls/cmhh'))();
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
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
	var alarmModule = require('bencoding.alarmmanager');
	var alarmManager = alarmModule.createAlarmManager();
	alarmManager.addAlarmService({
		service : 'de.appwerft.cm.Geo_serviceService',
		minute : 1,
		interval : 100000
	});
	require('vendor/versionsreminder').start();
}();
