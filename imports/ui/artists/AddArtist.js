import React, { Component } from 'react';
import swal from 'sweetalert2';

import AwsUpload from '../utilities/AwsUpload';

class AddArtist extends Component {

	constructor () {
		super();
		this.state = {
			localImageId: ''
		}
	}

	componentDidMount () {
		// Cannot be inside this.addArtist because then an additonal listner will be added each time the add-artist-button is pressed
		$(document).on('click', '#upload-image', this.uploadImage.bind(this));
	}

	uploadImage () {
		swal.showLoading();
		$("#upload-artist-image").click();
	}

	addArtist () {

		swal({
		  title: 'Legg til kunstner',
		  html: 
		  	'<input id="add-artist-name" class="swal2-input" placeholder="Kari Knutsen">' +
		  	'<input id="add-artist-occupation" class="swal2-input" placeholder="Billedkunstner">' +
		  	'<textarea id="add-artist-bio" class="swal2-input" placeholder="Kunstner BIO ..."></textarea>' +
		  	'<button id="upload-image" class="btn btn-success swal2-input">Last opp bilde</button>',
		  focusConfirm: false,
		  showCancelButton: true
		}).then((result) => {

			if (result.value) {
				const artist = {
					image: this.state.localImageId,
					name: $("#add-artist-name").val(),
					occupation: $("#add-artist-occupation").val(),
					bio: $("#add-artist-bio").val(),
				}

				if (artist.image == 0 || artist.name == 0 || artist.occupation == 0 || artist.bio == 0) {
					Bert.alert('Alle felt er påkrevd', 'warning', 'growl-bottom-right', 'fa-frown-o');
				} else {
					Meteor.call('artist.add', artist, (err, res) => {
						if (err) {
							console.log(err);
						} else {
							Bert.alert('Kunstner lagt til', 'success', 'growl-bottom-right', 'fa-smile-o');
						}
					})
				}
				

			}

		});
	}

	render () {

		return (
			<div className="row">
				<button onClick={this.addArtist.bind(this)} className="btn btn-success col-xs-12">Legg til kunstner</button>
				<AwsUpload
					elementId="upload-artist-image"
					postUploadFunction={(e) => {this.setState({localImageId: e.localId}); swal.hideLoading();}}
					image
				/>
			</div>
		);
	}
}

export default AddArtist;