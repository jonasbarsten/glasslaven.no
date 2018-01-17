import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class FrontFooter extends Component {
	render () {

		// const pagesInFooter = (this.props.pagesInFooter) ? this.props.pagesInFooter : [];

		return (
				<footer className="footer-2 bg-dark text-center-xs">
					<div className="container">
						<div className="row">
							<div className="col-sm-4">
								<img className="image-small" alt="Glasslåven" src="/images/regular-negative-norwegian.png" />
							</div>
							<div className="col-sm-4 text-center">
								<span className="fade-half">
									© Copyright 2016 Glasslåven - All Rights Reserved
								</span>
							</div>

							<div className="col-sm-4 text-center">
								<div className="row">
									<span className="fade-half">
										+47 91 34 66 33
									</span>
								</div>
								<div className="row">
									<span className="fade-half">
										<a href="mailto:post@glasslaven.no">post@glasslaven.no</a>
									</span>
								</div>
								<div className="row">
									<span className="fade-half">
										Granavollen 26 B, 2750 Gran
									</span>
								</div>
								<hr />
								<div className="row">
										<div className="col-xs-6">
											<a href="https://facebook.com/glasslaven" target="self">
												<FontAwesome 
													name="facebook" 
													size="2x"
													style={{float: 'right'}} 
												/>
											</a>
										</div>
										<div className="col-xs-6">
											<a href="https://www.instagram.com/glasslaven" target="self">
												<FontAwesome 
													name="instagram" 
													size="2x" 
													style={{float: 'left'}} 
												/>
											</a>
										</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
		);
	}
}

export default FrontFooter;

