import React, { Component } from 'react';

class ArtistItem extends Component {
	render () {

		const artist = this.props.artist;

		return (
			<div className="col-sm-4 text-center">
				<div className="feature boxed">
					<img alt="Pic" className="inline-block mb24" src={`/images/${artist.image}?size=100x100`} />
					<h4>{artist.name}</h4>
					<span>{artist.occupation}</span>
				</div>
			</div>
		);
	}
}

export default ArtistItem;