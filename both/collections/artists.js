import SimpleSchema from 'simpl-schema';

Artists = new Mongo.Collection( 'artists' );

Artists.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Artists.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ArtistsSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"image": {
		type: String
	},
	"images": {
		type: Array,
		optional: true
	},
	"images.$": {
		type: String,
		optional: true
	},
	"occupation": {
		type: String
	},
	"bio" : {
		type: String
	},
	"createdDate": {
		type: Date
	},
	"createdBy": {
		type: String
	}
});

Artists.attachSchema( ArtistsSchema );