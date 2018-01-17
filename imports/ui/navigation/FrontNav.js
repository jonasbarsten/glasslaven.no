import React, { Component } from 'react';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

class FrontNav extends Component {

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

		if (!this.props.ready) {
			return <h4>Loading ...</h4>
		}

		const pages = this.props.pages;

		function pageExists(pageName) {
			return pages.some(function(el) {
				return el.urlFriendlyName === pageName;
		  }); 
		}

		const visit = pageExists('visit') ? <li><Link to="/pages/visit">BESØK</Link></li> : null;
		const studio = pageExists('studio') ? <li><Link to="/pages/studio">VERKSTED / STUDIO</Link></li> : null;
		const productionroom = pageExists('productionroom') ? <li><Link to="/pages/productionroom">PRODUKSJONSROM</Link></li> : null;
		const residency = pageExists('residency') ? <li><Link to="/pages/residency">RESIDENS / ANNEN UTLEIE</Link></li> : null;
		const ecohouse = pageExists('ecohouse') ? <li><Link to="/pages/ecohouse">ØKOHUSET</Link></li> : null;
		const thearea = pageExists('thearea') ? <li><Link to="/pages/thearea">OMRÅDET</Link></li> : null;
		const friends = pageExists('friends') ? <li><Link to="/pages/friends">VENNEFORENING</Link></li> : null;
		const contact = pageExists('contact') ? <li><Link to="/pages/contact">KONTAKT</Link></li> : null;

		const dropdownRental = (studio || productionroom || residency) ? 
			<li className="dropdown">
				<Link className="dropdown-toggle" data-toggle="dropdown" to="#">LEIE OG RESIDENS
					<span className="caret"></span>
				</Link>
				<ul className="dropdown-menu">
					{studio}
					{productionroom}
					{residency}
				</ul>
			</li> : null;

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
							{visit}

							{dropdownRental}

							<li className="dropdown">
								<Link className="dropdown-toggle" data-toggle="dropdown" to="#">OM OSS
									<span className="caret"></span>
								</Link>
								<ul className="dropdown-menu">
									<li><Link to="/artists">VÅRE KUNSTNERE</Link></li>
									{ecohouse}
									{thearea}
									{friends}
								</ul>
							</li>

							<li><Link to="/calendar">KALENDER</Link></li>
							<li><Link to="/news">NYHETER</Link></li>
							{contact}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default withTracker(() => {
	const handle = Meteor.subscribe('pages');

	return {
		ready: handle.ready(),
		pages: Pages.find({online: true}).fetch()
	}

})(FrontNav);



