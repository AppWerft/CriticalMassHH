! function() {
	Ti.App.Apiomat = new (require('controls/apiomat.adapter'))({
		ononline : function() {
			require('app.online')();
		},
		onoffline : function() {
			alert('Diese App braucht das Neuland …');
			if (tabgroup)
				tabgroup.close();
		}
	});
}();
