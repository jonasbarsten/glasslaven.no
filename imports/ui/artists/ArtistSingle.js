import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ImageGallery from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

class ArtistSingle extends Component {
	render () {

		const artist = this.props.artist;

		if (!artist) {
			return <h4>Loading</h4>
		}

		let images = [];

		if (artist.images && artist.images.length != 0) {

			artist.images.map((image) => {
				const imageDocument = {
					original: `/images/${image}?size=1000x600`,
					thumbnail: `/images/${image}?size=250x150` 
				}

				images.push(imageDocument);
			});
		}

		const gallery = (artist.images && artist.images.length != 0) ? <ImageGallery items={images} /> : null;

		return (
			<div className="container">
				<div className="row mb64">
					<div className="col-sm-10 col-sm-offset-1">
						<h1 className="uppercase large mb32">
							{artist.name}
						 </h1>
						<hr className="mb32" />
						<ul className="mb48">
							{artist.occupation}
						</ul>
						{artist.bio}
					</div>
				</div>
				{gallery}
			</div>
		);
	}
}

export default withTracker ((props) => {
	Meteor.subscribe('artists');

	const artist = Artists.findOne({_id: props.params.artistId});

	return {
		artist: artist
	}

})(ArtistSingle);

