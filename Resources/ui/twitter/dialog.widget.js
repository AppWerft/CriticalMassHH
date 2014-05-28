exports.create = function(_parent, _e) {
	function getContenttype(_url, _callback) {
		var xhr = Ti.Network.createHTTPClient({
			autoRedirect : true,
			onerror : function() {
				console.log('Error');
			},
			onload : function() {
				var type = this.getResponseHeader('Content-Type');
				if (type)
					_callback(type.split('/')[0]);
			}
		});
		xhr.open('HEAD', _url);
		xhr.send();
	}

	var dialog = null;
	var tweetdata = _e.rowData;
	
	var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
	var uri = tweetdata.tweet.match(uri_pattern);
	var options = ['Twitter-Profil'];
	if (uri != null && uri[0].length > 8) {
		options.push('external web link');
	}
	if (!Ti.Android)
		options.push('Cancel');
	dialog = Ti.UI.createOptionDialog({
		options : options,
		title : tweetdata.user.name
	});
	dialog.show();
	dialog.addEventListener('click', function(_d) {
		switch(_d.index) {
			case 0:
				var win = require('ui/twitter/profil.window').create(tweetdata.user);
				(Ti.Android) ? win.open() : _parent.tab.open(win);
				break;
			case 1:
				var win = require('vendor/window').create({
					title : tweetdata.user.name,
					subtitle : uri[0]
				});
				win.add(Ti.UI.createWebView({
					url : uri[0]
				}));
				Ti.Android && Ti.UI.createNotification({
					message : uri[0]
				}).show();
				(Ti.Android) ? win.open() : _parent.tab.open(win);
				break;
		}

	});
};
var exampleforrowdatauser = {
	"location" : "Hamburg",
	"default_profile" : false,
	"profile_background_tile" : true,
	"statuses_count" : 3899,
	"lang" : "de",
	"profile_link_color" : "038543",
	"profile_banner_url" : "https://pbs.twimg.com/profile_banners/284980568/1373534867",
	"id" : 284980568,
	"following" : null,
	"favourites_count" : 1067,
	"protected" : false,
	"profile_text_color" : "333333",
	"contributors_enabled" : false,
	"verified" : false,
	"description" : "Communications specialist / sports and arts enthusiast / crossfit rookie / traveljunkie http://t.co/4BcPHG10VB",
	"profile_sidebar_border_color" : "EEEEEE",
	"name" : "Catie Hoffmann",
	"profile_background_color" : "ACDED6",
	"created_at" : "Wed Apr 20 09:41:12 +0000 2011",
	"is_translation_enabled" : false,
	"default_profile_image" : false,
	"followers_count" : 344,
	"profile_image_url_https" : "https://pbs.twimg.com/profile_images/444835831917051904/8bDNR4tg_normal.jpeg",
	"geo_enabled" : false,
	"profile_background_image_url" : "http://pbs.twimg.com/profile_background_images/444038843/IMG_8660.JPG",
	"profile_background_image_url_https" : "https://pbs.twimg.com/profile_background_images/444038843/IMG_8660.JPG",
	"follow_request_sent" : null,
	"entities" : {
		"description" : {
			"urls" : [{
				"display_url" : "about.me/catiehoffmann",
				"expanded_url" : "http://about.me/catiehoffmann",
				"indices" : [88, 110],
				"url" : "http://t.co/4BcPHG10VB"
			}]
		},
		"url" : {
			"urls" : [{
				"display_url" : "thefeldstudien.wordpress.com",
				"expanded_url" : "http://thefeldstudien.wordpress.com/",
				"indices" : [0, 22],
				"url" : "http://t.co/JRTN0cgQdq"
			}]
		}
	},
	"url" : "http://t.co/JRTN0cgQdq",
	"utc_offset" : 7200,
	"time_zone" : "Berlin",
	"notifications" : null,
	"profile_use_background_image" : true,
	"friends_count" : 520,
	"profile_sidebar_fill_color" : "F6F6F6",
	"screen_name" : "DrSmirk",
	"id_str" : "284980568",
	"profile_image_url" : "http://pbs.twimg.com/profile_images/444835831917051904/8bDNR4tg_normal.jpeg",
	"is_translator" : false,
	"listed_count" : 13
}; 