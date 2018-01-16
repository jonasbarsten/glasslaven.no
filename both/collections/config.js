import SimpleSchema from 'simpl-schema';

Config = new Mongo.Collection( 'config' );

Config.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Config.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ConfigSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"content": {
		type: String
	},
	"createdDate": {
		type: Date
	},
	"createdBy": {
		type: String
	}
});

Config.attachSchema( ConfigSchema );