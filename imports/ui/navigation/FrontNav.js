import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminNav extends Component {

	componentDidMount() {

		// Close menu when clicking links
		$(document).on('click','.navbar-collapse.in',function(e) {
		    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
		        $(this).collapse('hide');
		    }
		});
	}

	render () {

		const pathName = this.props.pathName;

		const omActiveClass = (pathName == '/pages/about') ? 'active' : '';
		const kalenderActiveClass = (pathName == '/calendar') ? 'active' : '';
		const menyActiveClass = (pathName == '/menu') ? 'active' : '';
		const reservasjonActiveClass = (pathName == '/pages/reservation') ? 'active' : '';
		const brygglabActiveClass = (pathName == '/pages/brygglab') ? 'active' : '';

		return (
			<nav id="front-navbar" className="navbar">
				<div className="container-fluid">
					<div className="navbar-header">
						<button id="front-navbar-toggle" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/"><img src="/images/logo-horizontal.png" style={{maxWidth: '150px'}} /></Link>
					</div>

					<div className="collapse navbar-collapse no-transition" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<li className={omActiveClass}><Link to="/pages/om-brygg">BESØK</Link></li>
							<li className={kalenderActiveClass}><Link to="/calendar">LEIE OG RESIDENS</Link></li>
							<li className={menyActiveClass}><Link to="/menu">OM OSS</Link></li>
							<li className={reservasjonActiveClass}><Link to="/reservations">NYHETER</Link></li>
							<li className={reservasjonActiveClass}><Link to="/reservations">KONTAKT</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default AdminNav;