import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../utilities/Preloader.js';
import BarstenViewer from '../utilities/BarstenViewer.js';

class PageSingle extends Component {

	componentDidMount() {
			
		window.scrollTo(0, 0)

		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            window.scrollTo(0,0);
        } else {
        	$(window).scrollTop();
        }

		Meteor.call('page.view', this.props.params.urlFriendlyName);
	}

	render() {

		const page = this.props.page;

		if (!page) {
			return <Preloader />
		}

		if (!page.online) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-sm-8 col-sm-offset-2 text-center">
							<h4>Denne undersiden er tatt ned for øyeblikket.</h4>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<BarstenViewer key={page._id} content={page.content} placeholder='No content yet ...' className="page-single-content col-xs-12" />
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker((params) => {
	Meteor.subscribe('pages');

	return {
		page: Pages.find({urlFriendlyName: params.routeParams.urlFriendlyName}).fetch()[0],
	};
})(PageSingle);