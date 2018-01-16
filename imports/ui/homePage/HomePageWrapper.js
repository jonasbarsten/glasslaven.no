import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../utilities/Preloader';
import AwsUpload from '../utilities/AwsUpload';
import BarstenEditor from '../utilities/BarstenEditorTwo';

class HomePageWrapper extends Component {

	constructor () {
		super ();
		this.state = {
			loading: false
		}
	}

	saveBackgroundImage (localImageId) {
		Meteor.call('config.setHomePageBackgroundImage', localImageId, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Lastet opp', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	saveContent(editorState) {
		Meteor.call('config.setHomePageText', editorState, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Lagret', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {

		const config = this.props.config;

		if (!config || this.state.loading || !this.props.ready) {
			return <Preloader />
		}

		const imageUrl = (config.homePageBackgroundImage && config.homePageBackgroundImage.content) ? `/images/${config.homePageBackgroundImage.content}?size=300x300` : null;
		const homePageText = (config.homePageText && config.homePageText.editorContent) ? config.homePageText.editorContent : null;

		const buttonText = imageUrl ? 'Bytt bakgrunnsbilde' : 'Last opp bakgrunnsbilde';

		return (
			<div className="container">
				<div className="row text-center">
					<img className="col-xs-4 col-xs-offset-4" src={imageUrl} style={{marginBottom: '10px'}}/>
					<button className="btn btn-success col-xs-12" onClick={() => {this.setState({loading: true}); $("#upload-background-image").click()}}>{buttonText}</button>
					
				</div>
				<hr />
				<div className="row">
					<h4>Velkomsttekst:</h4>
				</div>
				<div className="row">
					<BarstenEditor 
						onChange={(editorState) => {this.saveContent(editorState)}} 
						content={homePageText}
						maxImageSize={'800x400'}
					/>
				</div>
				<hr />
				<AwsUpload
					elementId="upload-background-image"
					postUploadFunction={(e) => {this.saveBackgroundImage(e.localId); this.setState({loading: false});}}
					image
				/>
			</div>
		);
	}
}

export default withTracker(() => {
	const handle = Meteor.subscribe('config');

	const config = {
		homePageBackgroundImage: Config.findOne({name: 'homePageBackgroundImage'}),
		homePageText: Config.findOne({name: 'homePageText'})
	}

	return {
		config,
		ready: handle.ready()
	}

})(HomePageWrapper);