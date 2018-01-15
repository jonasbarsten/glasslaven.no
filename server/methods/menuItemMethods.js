Meteor.methods({
	'menuItem.add': function (name) {
		check(name, String);

		const item = {
			name: name,
			createdDate: new Date(),
			createdBy: Meteor.userId()
		}

		MenuItems.insert(item);
	},
	'menuItem.delete': function (menuItemId) {
		check(menuItemId, String);

		MenuItems.remove({_id: menuItemId});
	},
	'menuItem.reorder': function (menuItemId, index) {

		check(menuItemId, String);
		check(index, Number);

		MenuItems.update({_id: menuItemId}, {$set: {sortIndex: index}});
	}
});