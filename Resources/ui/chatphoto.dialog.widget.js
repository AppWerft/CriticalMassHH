module.exports = function(_args, _onOK) {
	var newphoto = false;
	var androidview = Ti.UI.createView({
		layout : 'vertical'
	});
	var image = Ti.App.Apiomat.getChatImage();
	console.log('image=' + image);
	var preview = Ti.UI.createImageView({
		image : (image) ? image : '/assets/avatar.png',
		width : '50%'
	});
	if (image)
		require('vendor/imagecache')(image, preview);
	androidview.add(preview);
	preview.addEventListener('click', function() {
		Ti.Media.showCamera({
			success : function(event) {
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					preview.setImage(event.media);
					newphoto = true;
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
		width : Ti.UI.FILL,
		bottom : 5
	});
	androidview.usernameinputfield.setValue(_args.username);
	androidview.add(androidview.usernameinputfield);
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		androidView : androidview,
		buttonNames : ['OK', 'Abbruch'],
		title : 'CriticalMassChat',
		message : 'Hier kannst Du Dir ein Kürzel geben und auch eine Minibild machen.'
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else {
			Ti.App.Apiomat.saveChatPhoto({
				image : preview.image,
				ratio : preview.rect.width / preview.rect.height
			});
			Ti.App.Properties.setString('CHATUSER', androidview.usernameinputfield.getValue());
		}
	});
	androidview.usernameinputfield.setValue(_args.username);
	dialog.show();
};
