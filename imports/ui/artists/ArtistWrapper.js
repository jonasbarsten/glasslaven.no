import React, { Component } from 'react';

import AddArtist from './AddArtist';
import ArtistList from './ArtistList';

class ArtistWrapper extends Component {
	render () {
		return (
			<div className="container">				
				<AddArtist />
				<hr />
				<ArtistList onClick="edit" />
			</div>
		);
	}
}

export default ArtistWrapper;