Meteor.methods({
	'news.add': function (newsName, urlFriendlyName) {

		let exists = News.findOne({urlFriendlyName: urlFriendlyName});

		if (exists) {
			return 'exists';
		}

		var news = {
			name: newsName,
			urlFriendlyName: urlFriendlyName,
			lastChanged: new Date,
			lastChangedBy: Meteor.userId(),
			views: 0,
			created: new Date,
			createdBy: Meteor.userId()
		}

		News.insert(news);
	},
	'news.delete': function (urlFriendlyName) {

		const oldNews = News.findOne({urlFriendlyName: urlFriendlyName});

		if (oldNews.image) {
			Meteor.call('file.toTrash', oldNews.image, 'image');
		}

		News.remove({urlFriendlyName: urlFriendlyName});
	},
	'news.update': function (urlFriendlyName, content) {
		News.update({urlFriendlyName: urlFriendlyName}, {$set: {content: content}});
	},
	'news.toggleInFooter': function (urlFriendlyName) {
		const news = News.findOne({urlFriendlyName: urlFriendlyName});

		if (news.isInFooter) {
			News.update({urlFriendlyName: urlFriendlyName}, {$set: {isInFooter: false}});
			return 'removed';
		} else {
			News.update({urlFriendlyName: urlFriendlyName}, {$set: {isInFooter: true}});
			return 'added';
		}

	},
	'news.view': function (urlFriendlyName) {

		// If non-logged-in-user views page, log view
		if (!Meteor.userId()) {
			News.update({urlFriendlyName: urlFriendlyName}, {$inc: {views: 1}});
		}
	},	
	'news.setImage': function (urlFriendlyName, localImageId) {

		const oldNews = News.findOne({urlFriendlyName: urlFriendlyName});

		if (oldNews.image) {
			Meteor.call('file.toTrash', oldNews.image, 'image');
		}
		
		News.update({urlFriendlyName: urlFriendlyName}, {$set: {image: localImageId}});
	},
});