import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import ArtistItem from './ArtistItem';
import Preloader from '../utilities/Preloader';

class ArtistList extends Component {

	click (artistId) {

		if (this.props.onClick == "edit") {

			browserHistory.push(`/admin/artists/${artistId}`);
		}

		if (this.props.onClick == "view") {
			browserHistory.push(`/artists/${artistId}`);
		}

	}

	render () {

		const artists = this.props.artists;

		if (artists.length == 0) {
			return <div><h4>Ingen kunstnere</h4></div>
		}

		return (
			<div className="row">
				{artists.map((artist) => {
					return (
						<div key={artist._id} onClick={this.click.bind(this, artist._id)} className="hover">
							<ArtistItem artist={artist} />
						</div>
					);
					
				})}
			</div>
		);
	}
}

export default withTracker (() => {
	Meteor.subscribe('artists');

	return {
		artists: Artists.find().fetch()
	}

})(ArtistList);