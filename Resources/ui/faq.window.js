exports.create = function() {
	var self = require('vendor/window').create();
	self.container = Ti.UI.createTableView({});
	self.add(self.container);
	var faq = require('models/faq');
	var data = [], i = 0;

	for (var q in faq) {
		data[i] = Ti.UI.createTableViewRow({
			itemA : faq[q],
			itemQ : q,
			hasDetail : true
		});
		data[i].add(Ti.UI.createLabel({
			text : q,
			textAlign : 'left',
			top : 5,
			bottom : 5,
			left : 10,
			right : 15,
			width : Ti.UI.FILL,
			color : '#333',
			font : {
				fontSize : 20,
				fontFamily : 'Designosaur'
			}
		}));
		i++;
	}
	self.container.setData(data);
	self.container.addEventListener('click', function(_e) {
		var win = require('vendor/window').create({
			title : 'CriticalMass-FAQ',
			subtitle : _e.row.itemQ
		});
		var container = Ti.UI.createScrollView({
			layout : 'vertical',
			scrollType : 'vertical'
		});
		container.add(Ti.UI.createLabel({
			text : _e.row.itemA,
			textAlign : 'left',
			top : 15,
			bottom : 15,
			left : 20,
			right : 15,
			width : Ti.UI.FILL,
			color : '#333',
			font : {  
				fontSize : 20,
				fontFamily : 'Designosaur'
			}
		}));
		win.add(container);
		win.open();
	});
	return self;
};
