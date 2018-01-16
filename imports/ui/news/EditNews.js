import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import BarstenEditor from '../utilities/BarstenEditorTwo';
import Preloader from '../utilities/Preloader';
import AwsUpload from '../utilities/AwsUpload';

class EditNews extends Component {

	constructor () {
		super ();
		this.state = {
			loading: false
		}
	}

	saveContent(editorState) {
		Meteor.call('news.update', this.props.params.urlFriendlyName, editorState, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Content saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deleteNews () {

		swal({
			title: 'Are you sure?',
			text: "You will not be able to recover this news!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('news.delete', this.props.params.urlFriendlyName, (err, res) => {
					if (err) {
						console.log(err);
						swal("Failed", "The news could not be deleted.", "warning");
					} else {
						browserHistory.goBack();
						Bert.alert('news deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});
	}

	// toggleInFooter(urlFriendlyName) {

	// 	Meteor.call('page.toggleInFooter', urlFriendlyName, (err, res) => {
	// 		if (err) {
	// 		} else {
	// 			if (res == 'added') {
	// 				Bert.alert('Added to menu', 'success', 'growl-bottom-right', 'fa-smile-o');
	// 			}

	// 			if (res == 'removed') {
	// 				Bert.alert('Removed from menu', 'success', 'growl-bottom-right', 'fa-smile-o');
	// 			}
	// 		}
	// 	});
	// }

	setImage (urlFriendlyName, localImageId) {

		Meteor.call('news.setImage', urlFriendlyName, localImageId, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Lastet opp', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render() {

		const news = this.props.news;
		const name = (news && news.name);
		const content = (news && news.content);
		// const isInFooter = (page && page.isInFooter);

		if (!this.props.ready || this.state.loading) {
			return <Preloader />;
		}
		const imageUrl = (news && news.image) ? `/images/${news.image}?size=300x300` : null;
		const buttonText = imageUrl ? 'Bytt bilde' : 'Last opp bilde';

		return(
			<div className="container">
				<h4>{name}</h4>
				<hr />
				<div className="row text-center">
					<img className="col-xs-4 col-xs-offset-4" src={imageUrl} style={{marginBottom: '10px'}}/>
					<button className="btn btn-success col-xs-12" onClick={() => {this.setState({loading: true}); $("#upload-image").click()}}>{buttonText}</button>
				</div>
				<hr />
				<BarstenEditor 
					onChange={(editorState) => {this.saveContent(editorState)}} 
					content={content}
					maxImageSize={'800x400'}
				/>
				<hr />
				<button className="btn btn-danger col-xs-12" onClick={this.deleteNews.bind(this)}>Delete news</button>
				<AwsUpload
					elementId="upload-image"
					postUploadFunction={(e) => {this.setImage(news.urlFriendlyName, e.localId); this.setState({loading: false});}}
					image
				/>
			</div>
		);
	}
}

export default withTracker((params) => {
	const handle = Meteor.subscribe('news');

	return {
		ready: handle.ready(),
		news: News.find({urlFriendlyName: params.routeParams.urlFriendlyName}).fetch()[0]
	};
})(EditNews);