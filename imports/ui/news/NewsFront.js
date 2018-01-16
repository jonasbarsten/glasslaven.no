import React, { Component } from 'react';

import NewsListFront from './NewsListFront';

class NewsFront extends Component {

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
								<h3 className="uppercase mb0">Nyheter</h3>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-secondary">
					<div className="container">
						<div className="row mb40">
							<NewsListFront onClick='view' monthSeparator />
						</div>
					</div>
				</section>
				
			</div>
		);
	}
}

export default NewsFront;