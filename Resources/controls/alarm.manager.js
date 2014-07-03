module.exports = function() {
	if (Ti.Android) {//get service running bool status
		require('controls/georecord.dialog').create();
		var alarmModule = require('bencoding.alarmmanager');
		var alarmManager = alarmModule.createAlarmManager();
		alarmManager.cancelAlarmService();
		alarmManager.addAlarmService({
			service : 'de.appwerft.criticalmass.Geo_serviceService',
			minute : 1, // until 1 minute it starts
			requestCode : 41,
			forceRestart : false,
			interval : 50000
		});
		Ti.App.Properties.setBool("SERVICERUNNING", true);
	}
};
