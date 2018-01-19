import 'react-dates/initialize';

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';
import moment from 'moment';

// Remember to initialize on top!! See line 1
// Remember to load css as well
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import BarstenEditor from '../utilities/BarstenEditorTwo';
import Preloader from '../utilities/Preloader';
import AwsUpload from '../utilities/AwsUpload';

class EditNews extends Component {

	constructor () {
		super ();
		this.state = {
			loading: false,
			date: moment(),
			displayDatePicker: false
		}
	}

	saveContent(editorState) {
		Meteor.call('news.update', this.props.params.urlFriendlyName, editorState, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Lagret', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deleteNews () {

		swal({
			title: 'Slette nyhet',
			text: "Du kan ikke angre på dette.",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ja, slett!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('news.delete', this.props.params.urlFriendlyName, (err, res) => {
					if (err) {
						console.log(err);
						swal("Failed", "The news could not be deleted.", "warning");
					} else {
						browserHistory.goBack();
						Bert.alert('Nyhet slettet', 'success', 'growl-bottom-right', 'fa-smile-o');
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

	changeDate (date) {
		Meteor.call('news.changeDate', this.props.news._id, date.toDate(), (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Dato endret', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		})
	}

	render() {

		const news = this.props.news;
		const name = (news && news.name);
		const content = (news && news.content);
		// const isInFooter = (page && page.isInFooter);

		if (!this.props.ready || this.state.loading || !news) {
			return <Preloader />;
		}
		const imageUrl = (news && news.image) ? `/images/${news.image}?size=300x300` : null;
		const buttonText = imageUrl ? 'Bytt bilde' : 'Last opp bilde';
		// const date = moment(news.created).format('DD/MM - YYYY');

		// const datePicker = this.state.displayDatePicker ? 
		// 	<SingleDatePicker
		// 		date={moment(news.created)} // momentPropTypes.momentObj or null
		// 		onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
		// 		focused={this.state.focused} // PropTypes.bool
		// 		onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
		// 		style={{textAlign: 'center'}}
		// 	/> : null;

		return(
			<div className="container">
				<div className="row">
					<div className="col-xs-8">
						<h4 style={{marginBottom: 0, marginTop: '11px'}}>{name}</h4>
					</div>
					<div className="col-xs-4">
						<SingleDatePicker
							date={moment(news.created)} // momentPropTypes.momentObj or null
							onDateChange={date => this.changeDate(date)} // PropTypes.func.isRequired
							focused={this.state.focused} // PropTypes.bool
							onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
							numberOfMonths={1}
							hideKeyboardShortcutsPanel={true}
							isOutsideRange={() => {return false}}
						/>
					</div>
				</div>			
				<hr />
				<div className="row text-center">
					<img className="col-xs-4 col-xs-offset-4" src={imageUrl} style={{marginBottom: '24px'}}/>
					<button className="btn btn-success col-xs-12" onClick={() => {this.setState({loading: true}); $("#upload-image").click()}}>{buttonText}</button>
				</div>

				<BarstenEditor 
					onChange={(editorState) => {this.saveContent(editorState)}} 
					content={content}
					maxImageSize={'800x400'}
				/>
				<hr />
				<div className="row">
					<button className="btn btn-danger col-xs-12" onClick={this.deleteNews.bind(this)}>Slett nyhet</button>
				</div>
				
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