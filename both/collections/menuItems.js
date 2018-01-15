import SimpleSchema from 'simpl-schema';

MenuItems = new Mongo.Collection( 'menuItems' );

MenuItems.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

MenuItems.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const MenuItemsSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"pages": {
		type: Array,
		optional: true
	},
	"pages.$": {
		type: String,
		optional: true
	},
	"sortIndex": {
		type: Number,
		optional: true
	},
	"createdDate": {
		type: Date
	},
	"createdBy": {
		type: String
	}
});

MenuItems.attachSchema( MenuItemsSchema );