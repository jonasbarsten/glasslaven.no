Meteor.publish('allUsers', function () {

	const isAdmin = Roles.userIsInRole(this.userId, ['admin', 'super-admin'], 'CMS');

	if (isAdmin) {
		return Meteor.users.find({}, {fields: {"profile": 1, "emails": 1, "createdAt": 1, "roles": 1, "status": 1}});
	} else {
		return null;
	} 
});

Meteor.publish('pages', function () {
	return Pages.find();
});

Meteor.publish('news', function () {
	return News.find();
});

Meteor.publish('images', function () {
	return Images.find();
});

Meteor.publish('artists', function () {
	return Artists.find();
});

Meteor.publish('menuItems', function () {
	return MenuItems.find();
});

Meteor.publish('config', function () {
	return Config.find();
});