import React, { Component } from 'react';
import moment from 'moment';
import { browserHistory, Link } from 'react-router';
import 'moment/locale/nb.js';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../utilities/Preloader';

moment.locale('nb');

class NewsListFront extends Component {

	render () {

		if (!this.props.ready) {
			return <Preloader />
		}

		let news = this.props.news;

		if (news.length < 1) {
			return <div className="text-center"><h4>Ingen nyheter ...</h4></div>
		}

		function compare(a,b) {
		  if (a.created < b.created)
		    return -1;
		  if (a.created > b.created)
		    return 1;
		  return 0;
		}

		news.sort(compare);

		news.reverse();

		news.map((n) => {
			n.date = n.created;
		});

		if (this.props.limit) {
			events = events.slice(0, this.props.limit);
		}

		return (
			<div id="news-wrapper">
				<div className="row">
					{news.map((n, i) => {

						// event.date = event.start_time;

						const currentEventYear = moment(n.date).format('YYYY');
						const currentEventMonth = moment(n.date).format('MM');
						const previousEventMonth = (i > 0) ? moment(news[i - 1].date).format('MM') : 0;
						const previousEventYear = (i > 0) ? moment(news[i - 1].date).format('YYYY') : 0;

						const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
						const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

						const monthSeperatorWritten = moment(n.date).format('MMMM YYYY');

						const monthHeader = ((i == 0 || currentEventMonthSinceJesus < pastEventMonthSinceJesus) && this.props.monthSeparator) ? 
							<div><div className="col-xs-12 text-center calendar-month-seperator"><h4>{monthSeperatorWritten}</h4></div><hr /></div> 
							: null;

						const odd = i % 2;
						const colorClass = odd ? 'event-color-b' : 'event-color-a';

						const date = moment(n.date).format('DD.MM');

						const url = `/news/${n.urlFriendlyName}`;
						const imageUrl = `/images/${n.image}?size=200x200`;
						const imageStyle = {
							width: '100%',
							height: '200px',
							backgroundImage: `url(${imageUrl})`,
							backgroundSize: 'cover'
						};

						let name = n.name;
						// if (name.length > 25) name = name.substring(0,25) + ' ...';

						// let description = event.description;
						// if (description.length > 100) description = description.substring(0,100) + ' ...';

						return (
							<div key={n._id}>
								{monthHeader}
								<div className="col-sm-4 post-snippet masonry-item">
									<Link to={url}>
										<div style={imageStyle}></div>
									</Link>
									<div className="inner">
										<Link to={url}>
											<h5 className="mb0">
												{name}
											</h5>
											<span className="inline-block mb16">{date}</span>
										</Link>
										<hr />
										
										<Link className="btn btn-sm" to={url}>Les mer</Link>
									</div>
								</div>
							</div>
						);

					})}
				</div>
			</div>
		);
	}
}


export default withTracker(() => {
	const handle = Meteor.subscribe('news');

	return {
		ready: handle.ready(),
		news: News.find().fetch()
	}

})(NewsListFront);


