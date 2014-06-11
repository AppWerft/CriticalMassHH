exports.create = function() {
	var counter = 0;
	var Chat = new (require('controls/chat.adapter'))();
	var self = require('vendor/window').create({
		title : 'CriticalMass',
		subtitle : 'Chat',
		backgroundColor : 'black'
	});
	self.container = Ti.UI.createTableView({
		backgroundColor : 'black',
		bottom : 50,
		top : 80,
	});
	self.chatter = Ti.UI.createScrollView({
		backgroundColor : '#222',
		top : 0,
		height : 80,
		scrollType : 'horizontal',
		layout : 'horizontal',
		horizontalWrap : false
	});
	self.add(self.chatter);
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
		backgroundColor : '#333',
		enableReturnKey : true
	});
	var configurationbutton = Ti.UI.createImageView({
		image : '/assets/schurke.png',
		width : 50,
		height : 50,
		right : 5,
		backgroundColor : '#333',
		bottom : 0
	});
	self.add(configurationbutton);
	input.addEventListener('return', function(_e) {
		if (Ti.App.Properties.hasProperty('USER')) {
			Chat.speak({
				"message" : _e.value,
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
		Chat.quit();
	});
	var startDialog = function() {
		require('ui/chatphoto.dialog.widget')();
	};

	//self.addEventListener('focus', startDialog);
	configurationbutton.addEventListener('click', startDialog);

	self.addEventListener('open', function() {
		Chat.join(function(_payload) {// this is callback from adapter
			if (_payload.type == 'chatters') {
				self.chatter.removeAllChildren();
				var chatters = _payload.chatters;
				for (var i = 0; i < chatters.length; i++) {
					self.chatter.add(require('ui/chatter.widget').create(chatters[i]));
				}
			} else {
				var row = Ti.UI.createTableViewRow();
				counter++;
				var thumb = Ti.UI.createImageView({
					left : (_payload.type == 'join') ? 43 : 5,
					bottom : 5,
					top : 0,
					width : (_payload.type == 'join') ? 32 : 80,
					height : (_payload.type == 'join') ? 32 : 80,
					image : (_payload.photo) ? _payload.photo : '/assets/schurke.png'
				});
				require('vendor/imagecache')(_payload.photo, thumb);
				row.add(thumb);
				row.add(Ti.UI.createLabel({
					text : _payload.chattext,
					left : 100,
					top : 5,
					bottom : 5,
					height : Ti.UI.SIZE,
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
				self.container.scrollToIndex(counter);
			}
		});
	});
	return self;
};
