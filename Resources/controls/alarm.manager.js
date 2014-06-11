module.exports = function() {
	if (Ti.Android) {//get service running bool status
		require('controls/georecord.dialog').create();
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
		Ti.App.Properties.setBool("service_running", true);
	}
};
