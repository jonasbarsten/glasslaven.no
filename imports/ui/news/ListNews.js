import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class ListNews extends Component {

	render() {
		return (
			<div>
		
				<div className="row">
					
					<div className="col-xs-2">
						<h4>VIEWS</h4>
					</div>
					
					<div className="col-xs-5">
						<h4>EDIT</h4>
					</div>
					<div className="col-xs-5">
						<h4>PUBLIC URL</h4>
					</div>
					
				</div>



				{ this.props.news.map((news) => {

					const editUrl = '/admin/news/edit/' + news.urlFriendlyName;
					const visitUrl = Meteor.settings.public.url + '/news/' + news.urlFriendlyName;

					return (

						<div key={news._id} className="row">
							
							<div className="col-xs-2">
								<span className="label label-primary">{news.views} views</span>
							</div>
							
							<div className="col-xs-5">
								<Link to={editUrl}>
									{news.name}
								</Link>
							</div>
							<div className="col-xs-5">
								<Link to={visitUrl}>{visitUrl}</Link>
							</div>
							
						</div>

					);
				})}
	
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('news');

	return {
		news: News.find().fetch()
	};
})(ListNews);