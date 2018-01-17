import SimpleSchema from 'simpl-schema';

News = new Mongo.Collection( 'news' );

News.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

News.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const NewsSchema = new SimpleSchema({
	"name": {
		type: String,
		optional: true
	},
	"online": {
		type: Boolean
	},
	"urlFriendlyName": {
		type: String,
		optional: true
	},
	"image": {
		type: String,
		optional: true
	},
	"lastChanged": {
		type: Date                                  
	},
	"lastChangedBy": {
		type: String
	},
	"isInFooter": {
		type: Boolean,
		optional: true
	},
	"views": {
		type: Number,
		optional: true
	},
	"created": {
		type: Date,
		optional: true
	},
	"createdBy": {
		type: String,
		optional: true
	},
	"content": {
		type: Object,
		optional: true,
		blackbox: true
	}
});

News.attachSchema( NewsSchema );