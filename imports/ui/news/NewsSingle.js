import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../utilities/Preloader.js';
import BarstenViewer from '../utilities/BarstenViewer.js';

class NewsSingle extends Component {

	componentDidMount() {
			
		window.scrollTo(0, 0)

		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            window.scrollTo(0,0);
        } else {
        	$(window).scrollTop();
        }

		Meteor.call('news.view', this.props.params.urlFriendlyName);
	}

	render() {

		const news = this.props.news;

		if (!news || !this.props.ready) {
			return <Preloader />
		}

		const imageUrl = (news && news.image) ? `/images/${news.image}?size=800x800` : null;

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<img src={imageUrl} style={{width: '100%'}}/>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<BarstenViewer content={news.content} placeholder='No content yet ...' className="page-single-content col-xs-12" />
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker((params) => {
	const handle = Meteor.subscribe('news');

	return {
		ready: handle.ready(),
		news: News.find({urlFriendlyName: params.routeParams.urlFriendlyName}).fetch()[0],
	};
})(NewsSingle);