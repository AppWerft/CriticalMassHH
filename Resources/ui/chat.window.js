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
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#00FF12',
		left : 0,
		width : Ti.UI.FILL,
		height : 50,
		clearOnEdit : true,
		returnKeyType : Ti.UI.RETURNKEY_GO,
		color : '#eee',
		hintText : 'Deine Texteingabe …',
		bottom : 0,
		font : {
			fontSize : 20,
			fontFamily : 'monospace'
		},
		backgroundColor : 'black',
		enableReturnKey : true
	});

	input.blur();
	input.addEventListener('return', function(_e) {
		input.blur();
		Chat.write(_e.value);
	});
	Chat.register({
		registered : function() {
			self.add(input);
		},
		received : function(_package) {
			console.log('Info: adding row 2 chat');
			var row = Ti.UI.createTableViewRow();
			row.add(Ti.UI.createLabel({
				text : _package.device + '$ ' + _package.chattext,
				left : 10,
				top : 5,
				bottom : 5,
				textAlign : 'left',
				width : Ti.UI.FILL,
				right : 5,
				color : '#00FF12',
				font : {
					fontSize : 16,
					fontFamily : 'monospace'
				}
			}));
			console.log(row);
			self.container.appendRow(row);
		}
	});
	return self;
};
