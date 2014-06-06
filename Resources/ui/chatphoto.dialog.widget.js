var uid = Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 3);
var username = Ti.App.Properties.getString('CHATUSER', '@' + Ti.Utils.md5HexDigest(Ti.Platform.getMacaddress()).substring(0, 3));

module.exports = function(_args, _onOK) {
	var data_changed = false;
	var androidview = Ti.UI.createView({
		layout : 'vertical'
	});
	var image = Ti.App.Apiomat.getChatImage();
	var preview;
	if (image) {
		preview = Ti.UI.createImageView({
			image : image,
			width : 150,
			left : 0,

			height : 'auto'
		});
		require('vendor/imagecache')(image, preview);
	} else
		preview = Ti.UI.createImageView({
			image : '/assets/camera.png',
			width : 200,
			height : 'auto'
		});
	var volumeslider = Ti.UI.createSlider({
		min : 0,
		max : 2,
		height : Ti.UI.SIZE,
		top : -3,
		bottom : 5,
		left : 5,
		right : 10,
		value : (Ti.App.Properties.hasProperty('VOLUME')) ? parseFloat(Ti.App.Properties.getString('VOLUME')) : 1,
	});
	volumeslider.show();
	androidview.add(Ti.UI.createLabel({
		text : 'Klingellautheit',
		font : {
			fontSize : 11
		},
		height : Ti.UI.SIZE,
		textAlign : 'left',
		left : 30,
		width : Ti.UI.FILL,
	}));
	androidview.add(volumeslider);
	androidview.add(preview);
	preview.addEventListener('click', function() {
		Ti.Media.showCamera({
			success : function(event) {
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					preview.setImage(event.media);
					data_changed = true;
				}
			},
			cancel : function() {
			},
			error : function(error) {
			},
			saveToPhotoGallery : false,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	});
	androidview.usernameinputfield = Ti.UI.createTextField({
		top : 0,
		left : 10,
		rights : 10,
		width : Ti.UI.FILL,
		bottom : 5
	});
	androidview.usernameinputfield.setValue(username);
	androidview.usernameinputfield.addEventListener('return', function() {
		data_changed = true;
	});
	androidview.add(androidview.usernameinputfield);
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		androidView : androidview,
		buttonNames : ['OK', 'Abbruch'],
		title : 'CriticalMassChat',
		message : 'Hier kannst Du Dir ein Kürzel geben und auch eine Minibild einstellen.'
	});
	dialog.addEventListener('click', function(e) {
		var volume = volumeslider.getValue();
		Ti.App.Properties.setString('VOLUME', volume);
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else if (true == data_changed) {
			Ti.App.Apiomat.saveChatPhoto({
				image : Ti.App.ImageFactory.imageAsThumbnail(preview.toBlob(), {
					size : 200
				}),
				firstname : androidview.usernameinputfield.getValue(),
				ratio : 1
			});
			Ti.App.Properties.setString('CHATUSER', androidview.usernameinputfield.getValue());
		}
	});
	androidview.usernameinputfield.setValue(username);
	dialog.show();
};

