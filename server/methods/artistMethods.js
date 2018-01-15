Meteor.methods({
	'artist.add': function (artist) {

		check(artist, Object);

		const isAdmin = Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS');

		if (isAdmin) {
			artist.createdBy = Meteor.userId();
			artist.createdDate = new Date();

			Artists.insert(artist);
		}
	},
	'artist.delete': function (artistId) {
		check(artistId, String);

		const isAdmin = Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS');

		if (isAdmin) {

			const artist = Artists.findOne({_id: artistId}, {fields: {images: 1, image: 1}});

			// Trash profile picture
			Meteor.call('file.toTrash', artist.image, 'image');

			if (artist.images) {
				artist.images.map((image) => {
					// Trash all artist images
					Meteor.call('file.toTrash', image, 'image');
				});
			};

			Artists.remove({_id: artistId});
		}

	},
	'artist.changeName': function (artistId, name) {
		check(artistId, String);
		check(name, String);

		const isAdmin = Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS');

		if (isAdmin) {
			Artists.update({_id: artistId}, {$set: {name: name}});
		}
	},
	'artist.changeOccupation': function (artistId, occupation) {
		check(artistId, String);
		check(occupation, String);

		const isAdmin = Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS');

		if (isAdmin) {
			Artists.update({_id: artistId}, {$set: {occupation: occupation}});
		}
	},
	'artist.changeBio': function (artistId, bio) {
		check(artistId, String);
		check(bio, String);

		const isAdmin = Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS');

		if (isAdmin) {
			Artists.update({_id: artistId}, {$set: {bio: bio}});
		}
	},
	'artist.changeImage': function (artistId, imageId) {
		check(artistId, String);
		check(imageId, String);

		const oldImage = Artists.findOne({_id: artistId}, {fields: {image: 1, _id: 0}});

		Meteor.call('file.toTrash', oldImage.image, 'image', (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Artists.update({_id: artistId}, {$set: {image: imageId}});
			}
		});
	},
	'artist.addWork': function (artistId, imageId) {
		check(artistId, String);
		check(imageId, String);

		Artists.update({_id: artistId}, {$push: {images: imageId}});
	},
	'artist.deleteWork': function (artistId, imageId) {
		check(artistId, String);
		check(imageId, String);

		Meteor.call('file.toTrash', imageId, 'image', (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Artists.update({_id: artistId}, {$pull: {images: imageId}});
			}
		})
	}
});