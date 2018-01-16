Meteor.methods({
	'config.setHomePageBackgroundImage': function (localImageId) {

		const oldImage = Config.findOne({name: 'homePageBackgroundImage'});

		if (oldImage) {
			Meteor.call('file.toTrash', oldImage.content, 'image');
			Config.update(
				{
					name: 'homePageBackgroundImage'
				}, {
					$set: {
						content: localImageId,
						lastChanged: new Date(),
						lastChangedBy: Meteor.userId()
					}
				});
		} else {
			Config.insert(
				{
					name: 'homePageBackgroundImage', 
					content: localImageId, 
					createdDate: new Date(), 
					createdBy: Meteor.userId(), 
					lastChanged: new Date(),
					lastChangedBy: Meteor.userId()
				});
		}
	},
	'config.setHomePageText': function (content) {
		const oldText = Config.findOne({name: 'homePageText'});

		if (oldText) {

			Config.update(
				{
					name: 'homePageText'
				}, {
					$set: {
						editorContent: content,
						lastChanged: new Date(),
						lastChangedBy: Meteor.userId()
					}
				});
		} else {
			Config.insert(
				{
					name: 'homePageText', 
					editorContent: content, 
					createdDate: new Date(), 
					createdBy: Meteor.userId(), 
					lastChanged: new Date(),
					lastChangedBy: Meteor.userId()
				});
		}
	}
});