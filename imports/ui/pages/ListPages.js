import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Switch from 'rc-switch';

import 'rc-switch/assets/index.css';

class ListPages extends Component {

	toggleOnline (page) {
		Meteor.call('page.toggleOnline', page);
	}

	render() {
		return (
			<div>
		
				<div className="row">
					
					<div className="col-xs-2">
						<h4>VIEWS</h4>
					</div>
					
					<div className="col-xs-3">
						<h4>EDIT</h4>
					</div>
					<div className="col-xs-5">
						<h4>PUBLIC URL</h4>
					</div>
					<div className="col-xs-2 text-right">
						<h4>ONLINE</h4>
					</div>
					
				</div>



				{ this.props.pages.map((page) => {

					const editUrl = '/admin/pages/edit/' + page.urlFriendlyName;
					const visitUrl = Meteor.settings.public.url + '/pages/' + page.urlFriendlyName;
					const online = page.online ? true : false;

					return (

						<div key={page._id} className="row">
							
							<div className="col-xs-2">
								<span className="label label-primary">{page.views} views</span>
							</div>
							
							<div className="col-xs-3">
								<Link to={editUrl}>
									{page.name}
								</Link>
							</div>
							<div className="col-xs-5">
								<Link to={visitUrl}>{visitUrl}</Link>
							</div>
							<div className="col-xs-2">
								<Switch
									onChange={this.toggleOnline.bind(this, page)}
									disabled={false}
									checkedChildren={''}
									unCheckedChildren={''}
									checked={online}
									style={{float: 'right'}}
								/>
							</div>
						</div>

					);
				})}
	
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('pages');

	return {
		pages: Pages.find().fetch()
	};
})(ListPages);