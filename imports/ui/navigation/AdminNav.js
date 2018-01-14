import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminNav extends Component {

	componentDidMount() {

		// Close menu when clicked
		$(document).on('click','.navbar-collapse.in',function(e) {
		    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
		        $(this).collapse('hide');
		    }
		});
	}

	render () {

		const pathName = this.props.pathName;

		const usersActiveClass = (pathName == '/admin/users') ? 'active' : '';
		const pagesActiveClass = (pathName == '/admin/pages') ? 'active' : '';
		const eventsActiveClass = (pathName == '/admin/events') ? 'active' : '';
		const artistsActiveClass = (pathName == '/admin/artists') ? 'active' : '';
		// const cardsActiveClass = (pathName == '/admin/cards') ? 'active' : '';

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/admin">{Meteor.settings.public.siteTitle} ADMIN</Link>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li className={usersActiveClass}><Link to="/admin/users">Brukere</Link></li>
							<li className={pagesActiveClass}><Link to="/admin/pages">Sider</Link></li>
							<li className={eventsActiveClass}><Link to="/admin/events">Eventer</Link></li>
							<li className={artistsActiveClass}><Link to="/admin/artists">Kunstnere</Link></li>
						</ul>

						<ul className="nav navbar-nav navbar-right">
							<li onClick={() => Meteor.logout()}><a className="hover">Logg ut</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default AdminNav;