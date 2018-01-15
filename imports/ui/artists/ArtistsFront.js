import React, { Component } from 'react';

import ArtistList from './ArtistList';

class ArtistsFront extends Component {
	render () {
		return (
			<div className="col-sm-8 col-sm-offset-2" style={{marginTop: '50px'}}>
				<ArtistList onClick="view" />
			</div>
		);
	}
}

export default ArtistsFront;