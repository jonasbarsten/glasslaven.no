import React, { Component } from 'react';

import EventsList from './EventsList';

class Calendar extends Component {

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	render () {
		return (
			<div id="calendar-wrapper" className="row">
				<section className="page-title page-title-4">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<h3 className="uppercase mb0">Kalender</h3>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-secondary">
					<div className="container">
						<div className="row mb40">
							<EventsList onClick='view' monthSeparator />
						</div>
					</div>
				</section>
				
			</div>
		);
	}
}

export default Calendar;