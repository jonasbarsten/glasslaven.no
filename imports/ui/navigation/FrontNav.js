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

		// const pathName = this.props.pathName;

		// const visitActiveClass = (pathName == '/pages/visit') ? 'active' : '';
		// const contactActiveClass = (pathName == '/pages/contact') ? 'active' : '';
		// const menyActiveClass = (pathName == '/menu') ? 'active' : '';
		// const reservasjonActiveClass = (pathName == '/pages/reservation') ? 'active' : '';
		// const brygglabActiveClass = (pathName == '/pages/brygglab') ? 'active' : '';
		// const kalenderActiveClass = (pathName == '/pages/brygglab') ? 'active' : '';

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
							<li><Link to="/pages/visit">BESØK</Link></li>

							<li className="dropdown">
								<Link className="dropdown-toggle" data-toggle="dropdown" to="#">LEIE OG RESIDENS
									<span className="caret"></span>
								</Link>
								<ul className="dropdown-menu">
									<li><Link to="/pages/studio">VERKSTED / STUDIO</Link></li>
									<li><Link to="/pages/productionroom">PRODUKSJONSROM</Link></li>
									<li><Link to="/pages/residency">RESIDENS / ANNEN UTLEIE</Link></li>
								</ul>
							</li>

							<li className="dropdown">
								<Link className="dropdown-toggle" data-toggle="dropdown" to="#">OM OSS
									<span className="caret"></span>
								</Link>
								<ul className="dropdown-menu">
									<li><Link to="/artists">VÅRE KUNSTNERE</Link></li>
									<li><Link to="/pages/ecohouse">ØKOHUSET</Link></li>
									<li><Link to="/pages/thearea">OMRÅDET</Link></li>
									<li><Link to="/pages/friends">VENNEFORENING</Link></li>
								</ul>
							</li>

							<li><Link to="/calendar">KALENDER</Link></li>
							<li><Link to="/pages/contact">KONTAKT</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default AdminNav;