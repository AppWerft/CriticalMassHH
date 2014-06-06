exports.create = function() {
	var Chat = new (require('controls/chat.adapter'))();
	var self = require('vendor/window').create({
		title : 'CriticalMass',
		subtitle : 'Chat'
	});
	self.container = Ti.UI.createTableView({
		backgroundColor : 'black',
		bottom : 50
	});
	self.add(self.container);
	var input = Ti.UI.createTextField({
		color : '#00FF12',
		left : 0,
		width : Ti.UI.FILL,
		height : 50,
		returnKeyType : Ti.UI.RETURNKEY_GO,
		hintText : 'Deine Texteingabe …',
		bottom : 0,
		font : {
			fontSize : 20,
			fontFamily : 'LW'
		},
		backgroundColor : 'black',
		enableReturnKey : true
	});
	input.addEventListener('return', function(_e) {
		if (Ti.App.Properties.hasProperty('USER')) {
			Chat.write(_e.value);
		} else
			Ti.UI.createNotification({
				message : 'Du musst die Parole kennen und einsprechen, um hier chatten zu können.'
			}).show();
		;
		input.setValue('');
		input.blur();

	});
	self.add(input);
	Chat.register({
		registered : function() {
		},
		received : function(_payload) {
			var row = Ti.UI.createTableViewRow();
			row.add(Ti.UI.createLabel({
				text : _payload.device + '$ ' + _payload.chattext,
				left : 10,
				top : 5,
				bottom : 5,
				opacity : (_payload.ich) ? 0.6 : 1,
				textAlign : 'left',
				width : Ti.UI.FILL,
				right : 5,
				color : '#00FF12',
				font : {
					fontSize : 18,
					fontFamily : 'LW'
				}
			}));
			self.container.appendRow(row);
			self.container.scrollToIndex(self.container.getData().length);
		}
	});
	var style;
	
	return self;
};
