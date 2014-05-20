var CMHH = function() {
	this.init();
	return this;
};
const COLORS = {
	"dgreen" : "#438A5A",
	"blue" : "#1E1E65","orange":"#DE6421",
	"magenta" : "#D53B81",
	"lgreen" : "#73B532"
};

CMHH.prototype = {
	init : function() {
		var jsonfile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/models/routes.json');
		var routes = JSON.parse(jsonfile.read());
		this.routes = [];
		for (var i = 0; i < routes.length; i++) {
			var listoflocations = routes[i].route;
			var len = listoflocations.length;
			this.routes[i] = {
				point : [],
				width : (routes[i].width) ? 12 * Ti.Platform.displayCaps.logicalDensityFactor : 4 * Ti.Platform.displayCaps.logicalDensityFactor,
				color : routes[i].color
			};
			for (var p = 0; p < len; p++) {
				if (p == 0)
					this.routes[i].points = [];
				this.routes[i].points.push({
					latitude : listoflocations[p][0],
					longitude : listoflocations[p][1]
				});   
			}
		};
		return this;
	},
	getAllRoutes : function() {
		return this.routes;
	},
	
};
module.exports = CMHH;
