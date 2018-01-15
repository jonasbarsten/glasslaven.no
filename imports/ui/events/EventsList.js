import React, { Component } from 'react';
import moment from 'moment';
import { browserHistory, Link } from 'react-router';
import 'moment/locale/nb.js';

import Preloader from '../utilities/Preloader';

moment.locale('nb');
// import swal from 'sweetalert2';

// PROPS:
// onClick = 'view' || 'edit'
// range = 'upcoming' || 'past' || 'all'
// monthSeperator = true || false
// limit = number

class EventsList extends Component {

	constructor () {
		super ();
		this.state = {
			events: []
		}
	}

	componentDidMount () {

		Meteor.call('event.getFacebookEvents', (err, res) => {
			if (err) {
				console.log(err);
			} else {

				let events = res.data;
				let newEventsArray = []

				const addImage = (event) => {

					Meteor.call('event.getEventPhoto', event.id, (err, res) => {
						if (err) {
							console.log(err);
						} else {
							event.image = res;
							newEventsArray.push(event);
							events.shift();

							if (events.length == 0) {
								this.setState({
									events: newEventsArray
								});
							} else {
								addImage(events[0]);
							}
						}
					});
				}


				addImage(events[0]);


				

				// events.map((event) => {
				// 	Meteor.call('event.getEventPhoto', event.id, (err, res) => {
				// 		if (err) {
				// 			console.log(err);
				// 		} else {
				// 			event.image = res;
				// 		}
				// 	});
				// });

				
			}
		});
	}

	handleClick (event) {
		const url = `https://facebook.com/events/${event.id}/`;

		window.location = url;
	}

	// deleteEvent (id) {
	// 	swal({
	// 		title: 'Delete?',
	// 		text: "You will not be able to recover this event!",
	// 		type: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#3085d6',
	// 		cancelButtonColor: '#d33',
	// 		confirmButtonText: 'Yes, delete it!'
	// 	}).then(() => {
	// 		Meteor.call('event.delete', id, (err, res) => {
	// 			if (err) {
	// 				console.log(err);
	// 				swal("Failed", "The event could not be deleted.", "warning");
	// 			} else {
	// 				Bert.alert('Event deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
	// 			}
	// 		});
	// 	}).catch(swal.noop);
	// }

	render () {

		let events = this.state.events;

		if (events.length == 0) {
			return <Preloader />
		}

		function compare(a,b) {
		  if (a.start_time < b.start_time)
		    return -1;
		  if (a.start_time > b.start_time)
		    return 1;
		  return 0;
		}

		events.sort(compare);

		events.reverse();

		events.map((event) => {
			event.date = event.start_time;
		});

		if (this.props.limit) {
			events = events.slice(0, this.props.limit);
		}

		return (
			<div id="news-wrapper">
				<div className="row">
					{events.map((event, i) => {

						// event.date = event.start_time;

						const currentEventYear = moment(event.date).format('YYYY');
						const currentEventMonth = moment(event.date).format('MM');
						const previousEventMonth = (i > 0) ? moment(events[i - 1].date).format('MM') : 0;
						const previousEventYear = (i > 0) ? moment(events[i - 1].date).format('YYYY') : 0;

						const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
						const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

						const monthSeperatorWritten = moment(event.date).format('MMMM YYYY');

						const monthHeader = ((i == 0 || currentEventMonthSinceJesus < pastEventMonthSinceJesus) && this.props.monthSeparator) ? 
							<div><div className="col-xs-12 text-center calendar-month-seperator"><h4>{monthSeperatorWritten}</h4></div><hr /></div> 
							: null;

						const odd = i % 2;
						const colorClass = odd ? 'event-color-b' : 'event-color-a';

						const date = moment(event.date).format('DD.MM');

						const url = `https://facebook.com/events/${event.id}/`;
						const imageUrl = event.image.cover.source;
						const imageStyle = {
							width: '100%',
							height: '160px',
							background: `url(${imageUrl})`,
							backgroundSize: 'cover'
						};

						let name = event.name;
						// if (name.length > 25) name = name.substring(0,25) + ' ...';

						let description = event.description;
						if (description.length > 100) description = description.substring(0,100) + ' ...';

						return (
							<div key={event.id}>
								{monthHeader}
								<div className="col-sm-4 post-snippet masonry-item">
									<a href={url} target="self">
										<div style={imageStyle}></div>
									</a>
									<div className="inner">
										<a href={url} target="self">
											<h5 className="mb0">
												{name}
											</h5>
											<span className="inline-block mb16">{date}</span>
										</a>
										<hr />
										<p>{description}</p>
										<a className="btn btn-sm" href={url} target="self">Les mer</a>
									</div>
								</div>
							</div>
						);


						return (
							<div key={event.id}>
								{monthHeader}
								<div className={`${colorClass} col-sm-4 event-item hover`} onClick={this.handleClick.bind(this, event)}>
									<div className="event-item-content">

										<div className="row">
											<div style={{height: '50px', fontFamily: 'Plaak6Ney-26-Light'}} className="col-xs-6 col-sm-12 center-align-container">
												<span style={{fontSize: '40px'}}>{date}</span>
											</div>
											<div style={{height: '50px', fontFamily: 'Plaak4Terme-24-Light'}} className="col-xs-6 col-sm-12 center-align-container">
												<span style={{fontSize: '20px'}} className="text-center underline">{name}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						);

					})}
				</div>
			</div>
		);

		// return (
		// 	<div>
		// 		{this.props.events.map((event, i) => {

		// 			const currentEventYear = moment(event.date).format('YYYY');
		// 			const currentEventMonth = moment(event.date).format('MM');
		// 			const previousEventMonth = (i > 0) ? moment(this.props.events[i - 1].date).format('MM') : 0;
		// 			const previousEventYear = (i > 0) ? moment(this.props.events[i - 1].date).format('YYYY') : 0;

		// 			const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
		// 			const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

		// 			const monthSeperatorWritten = moment(event.date).format('MMMM YYYY');
					
		// 			const monthHeader = (currentEventMonthSinceJesus > pastEventMonthSinceJesus && this.props.monthSeparator) ? 
		// 				<div className="col-xs-12 text-center calendar-month-seperator">{monthSeperatorWritten}</div> 
		// 				: null;

		// 			const odd = i % 2;
		// 			const colorClass = odd ? 'event-color-b' : 'event-color-a';

		// 			const date = moment(event.date).format('DD.MM');

		// 			return (
		// 				<div key={event._id}>
		// 					{monthHeader}
		// 					<div className={`${colorClass} col-sm-4 event-item hover`} onClick={this.handleClick.bind(this, event)}>
		// 						<div className="event-item-content">

		// 							<div className="row">
		// 								<div style={{height: '50px', fontFamily: 'Plaak6Ney-26-Light'}} className="col-xs-6 col-sm-12 center-align-container">
		// 									<span style={{fontSize: '40px'}}>{date}</span>
		// 								</div>
		// 								<div style={{height: '50px', fontFamily: 'Plaak4Terme-24-Light'}} className="col-xs-6 col-sm-12 center-align-container">
		// 									<span style={{fontSize: '20px'}} className="text-center underline">{event.name}</span>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			);
		// 		})}
		// 	</div>
		// );
	}
}


export default EventsList;