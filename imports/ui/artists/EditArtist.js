import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import swal from 'sweetalert2';

import AwsUpload from '../utilities/AwsUpload';

class EditArtist extends Component {

	changeName () {

		swal({
			title: 'Endre navn?',
			type: 'info',
			input: 'text',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Bytt!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('artist.changeName', this.props.artist._id, result.value, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Navn endret', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});

	}

	changeOccupation () {
		swal({
			title: 'Endre yrke?',
			type: 'info',
			input: 'text',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Bytt!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('artist.changeOccupation', this.props.artist._id, result.value, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Yrke endret', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});
	}

	changeBio () {
		swal({
			title: 'Endre biografi?',
			type: 'info',
			input: 'textarea',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Bytt!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('artist.changeBio', this.props.artist._id, result.value, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Biografi endret', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});
	}

	uploadImage () {
		$("#upload-artist-image").click();
	}

	changeImage (artistId, newImage) {

		Meteor.call('artist.changeImage', artistId, newImage.localId, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Profilbilde endret', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deleteArtist () {
		swal({
			title: 'Slette kunstner?',
			text: "Du kan alltids legge den inn på nytt",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ja, slett!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('artist.delete', this.props.artist._id, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Kunstner slettet!', 'success', 'growl-bottom-right', 'fa-smile-o');
						browserHistory.goBack();
					}
				})
			}
		});
	}

	uploadWork () {
		$("#upload-artist-work").click();
	}

	addWork (artistId, newImage) {
		Meteor.call('artist.addWork', artistId, newImage.localId, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Bilde lagt til', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	deleteWork (imageId) {
		swal({
			title: 'Slette bildet?',
			text: "Du kan alltids legge det inn på nytt",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ja, slett!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('artist.deleteWork', this.props.artist._id, imageId, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Bilde slettet!', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				})
			}
		});
	}

	render () {

		const artist = this.props.artist;

		if (!artist) {
			return <h4>Loading</h4>
		}

		return (
			<div className="container">
				<div className="row mb64">
					<div className="col-sm-10 col-sm-offset-1">
						<h1 onClick={this.changeName.bind(this)} className="uppercase large mb32 hover">
							{artist.name}
						 </h1>
						<hr className="mb32" />
						<ul className="mb48 hover" onClick={this.changeOccupation.bind(this)}>
							{artist.occupation}
						</ul>
						<div onClick={this.changeBio.bind(this)} className="hover">
							{artist.bio}
						</div>
					</div>
				</div>
				<hr />

				<div className="row">
					<div className="col-xs-12 text-center">
						<img className="hover" src={`/images/${artist.image}?size=100x100`} onClick={this.uploadImage.bind(this)} />
					</div>
				</div>

				<hr />

				<div className="row">
					<button onClick={this.uploadWork}className="btn btn-success col-xs-12">Legg til bilde!</button>
				</div>

				<div className="row">
					{artist.images.map((image) => {
						return (
							<div key={image} className="col-sm-4" onClick={this.deleteWork.bind(this, image)}>
								<img className="img-responsive" src={`/images/${image}?size=300x300`} />
							</div>
						);
					})}
				</div>
				<hr />
				<div className="row">
					<button onClick={this.deleteArtist.bind(this)}className="btn btn-danger col-xs-12">Slett kunstner</button>
				</div>
				
				<AwsUpload
					elementId="upload-artist-image"
					postUploadFunction={(e) => {this.changeImage(artist._id, e)}}
					image
				/>
				<AwsUpload
					elementId="upload-artist-work"
					postUploadFunction={(e) => {this.addWork(artist._id, e)}}
					image
				/>
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

})(EditArtist);

