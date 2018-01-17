Meteor.methods({
	'page.add': function (pageName, urlFriendlyName) {

		let exists = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (exists) {
			return 'exists';
		}

		var page = {
			name: pageName,
			urlFriendlyName: urlFriendlyName,
			online: false,
			lastChanged: new Date,
			lastChangedBy: Meteor.userId(),
			views: 0,
			created: new Date,
			createdBy: Meteor.userId()
		}

		Pages.insert(page);
	},
	'page.delete': function (urlFriendlyName) {

		// Trash used images
		const page = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (page.content && page.content.editorState && page.content.editorState.entityMap) {
			const entityMap = page.content.editorState.entityMap;

			Object.keys(entityMap).map(function(key, index) {
				let entity = entityMap[key];

				if (entity.type == "IMAGE") {

					let imageId = entity.data.src.split('?');
					imageId = imageId[0];
					imageId = imageId.split('/');
					imageId = imageId[2];

					Meteor.call('file.toTrash', imageId, 'image');
				}
			});
		}

		Pages.remove({urlFriendlyName: urlFriendlyName});
	},
	'page.update': function (urlFriendlyName, content) {
		// Unused images are trashed from the editor
		Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {content: content}});
	},
	'page.toggleOnline': function (page) {
		Pages.update({_id: page._id}, {$set: {online: !page.online}});
	},
	'page.toggleInFooter': function (urlFriendlyName) {
		const page = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (page.isInFooter) {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {isInFooter: false}});
			return 'removed';
		} else {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {isInFooter: true}});
			return 'added';
		}
	},
	'page.view': function (urlFriendlyName) {
		if (!Meteor.userId()) {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$inc: {views: 1}});
		}
	}
});