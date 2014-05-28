Ti.App.Speechrecognizer = require('jp.isisredirect.speechrecognizer');

exports.create = function(_needle, _callbacks) {
	var speechrecognizer = Ti.App.Speechrecognizer.createSpeechRecognizer();
	speechrecognizer.setLangtag('de-DE');
	speechrecognizer.setAction(1);
	speechrecognizer.start();
	speechrecognizer.addEventListener(Ti.App.Speechrecognizer.RESULTS, function(e) {
		speechrecognizer.stop();
		if (e.results && e.results.split(',')[0]) {
			var answer = e.results.split(',')[0];
			if (answer.toLowerCase() == _needle)
				_callbacks.onOk();
			else
				_callbacks.onError();
		}
	});
};
