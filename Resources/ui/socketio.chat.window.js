var uid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 3);
var username = Ti.App.Properties.getString('CHATUSER', '@'+Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 3));

exports.create = function() {
	var Chat = new (require('controls/socketio.chat.adapter'))();
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
		right : 50,
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
	var tools = Ti.UI.createImageView({
		image : '/assets/tools.png',
		width : 40,
		height : 50,
		right : 5,
		bottom : 5
	});
	self.add(tools);
	input.addEventListener('return', function(_e) {
		if (Ti.App.Properties.hasProperty('USER')) {
			Chat.speak({
				id : uid,
				message : _e.value
			});
		} else
			Ti.UI.createNotification({
				message : 'Du musst die Parole kennen und einsprechen, um hier chatten zu können.'
			}).show();
		;
		input.setValue('');
		input.blur();

	});
	self.add(input);
	self.addEventListener('close', function() {
		Chat.quit({
			"id" : uid,
			"username" : username
		});
	});

	self.addEventListener('focus', function() {
		if (self.done == true)
			return;
		require('ui/chatphoto.dialog.widget')({
			uid : uid,
			username : username
		});
		self.done = true;
	});
	self.addEventListener('open', function() {
		Chat.join({
			id : uid,
			username : username,
			caption : {}
		}, function(_payload) {// this is callback from adapter
			var row = Ti.UI.createTableViewRow();
			row.add(Ti.UI.createLabel({
				text : _payload.chattext,
				left : 10,
				top : 5,
				bottom : 5,
				opacity : (_payload.self) ? 0.5 : 1,
				textAlign : 'left',
				width : Ti.UI.FILL,
				right : 5,
				color : '#00FF12',
				font : {
					fontSize : (_payload.type == 'join') ? 12 : 20,
					fontFamily : 'LW'
				}
			}));
			self.container.appendRow(row);
			self.container.scrollToIndex(self.container.getData().length);
		});
	});
	return self;
};
