import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import ArtistList from '../artists/ArtistList';
import Preloader from '../utilities/Preloader';
import BarstenViewer from '../utilities/BarstenViewer';
import NewsListFront from '../news/NewsListFront';

class Home extends Component {

	constructor () {
		super ();
		this.state = {
			coverUrl: ''
		}
	}

	componentDidMount() {
		Meteor.call('home.getFacebookBanner', (err, res) => {
			if (err) {
				console.log(err);
			} else {
				const cover = res.cover.source;

				this.setState({
					coverUrl: cover
				});
			}
		})
	}

	render () {

		const features = [
			{
				heading: '14 VERKSTEDER',
				text: 'For kunstnere som ønsker sitt faste arbeidssted hos oss har vi rom i størrelsen 10-100 m2. Interesserte kan ta kontakt på mail post@glasslaven.no eller telefon (+47) 91346633'
			},
			{
				heading: 'STORE SAL',
				text: 'Et stort produksjons-/visningsrom fullt utstyrt for dans og scenekunst med dansegulv, ballett-barre, scenemoduler, liten PA, prosjektor, stoler og matter. Lav leiepris for faste leietakere.'
			},
			{
				heading: 'FELLES VERKSTED',
				text: 'Felles verksted med standardutstyr som håndholdte elektriske verktøy, manuelle verktøy og verneutstyr.'
			},
			{
				heading: 'GALLERI',
				text: 'Galleri/besøkssenter med utsalg. Mulig for leietagere å selge sin produksjon.'
			},
			{
				heading: 'RESIDENSORDNING',
				text: 'Internasjonal residensordning: kunstnere kan søke opphold på Glasslåven mellom 2 uker - 2 måneder, og ett verksted er satt av til residens og prosjektrom.'
			},
			{
				heading: 'LOKAL TILKNYTNING',
				text: 'Tre hoteller i umiddelbare nærhet. I sommerhalvåret er det nærmere 10 000 besøkende til Sommerkirken. Nyoppussede Granavolden Gjæstgiveri er vår nære samarbeidspartner med kafé, restaurant og overnattingsmulighet. Se www.granavolden.no'
			}
		];




		// const cover = (this.state.coverUrl) ?
		// 		<section id="banner-custom">
		// 			<div>
		// 				<img alt="image of glasslaven" src={this.state.coverUrl} />
		// 			</div>
		// 		</section> :
		// 		null;

		const config = this.props.config;

		if (!this.props.ready) {
			return <Preloader />
		}

		const imageUrl = (config.homePageBackgroundImage && config.homePageBackgroundImage.content) ? `/images/${config.homePageBackgroundImage.content}?size=1200x800` : null;
		const homePageText = (config.homePageText && config.homePageText.editorContent) ? config.homePageText.editorContent : null;

		const bannerStyle = {
			backgroundImage: `url(${imageUrl})`,
			backgroundSize: 'cover'
		};

		const containerStyle = {
			backgroundColor: 'rgba(255,255,255,0.9)',
			paddingTop: '30px',
			paddingBottom: '30px',
		}

		return (
			<div>	

				<section id="welcomeTextSection" style={bannerStyle}>
					<div className="container" style={containerStyle}>
						<div className="row mb80 mb-xs-0">
							<div className="col-md-8 col-md-offset-2 text-center">
								<BarstenViewer content={homePageText} placeholder='No content yet ...' />
							</div>
						</div>
					</div>
				</section>

				<section id="newsSection" className="bg-primary">
					<div className="container">
						<div className="row mb64 mb-xs-24">
							<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
								<h3>Nyheter</h3>
							</div>
						</div>
						<div className="row">
							<NewsListFront onClick="view" limit={6}/>
						</div>
					</div>
				</section>

				<section id="artistsSection">
					<div className="container">
						<div className="row mb64 mb-xs-24">
							<div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
								<h3>Våre Kunstnere</h3>
							</div>
						</div>
						<div className="row">
							<ArtistList onClick="view" />
						</div>
					</div>
				</section>

				<section id="aboutSection" className="pb64 pb-xs-40 bg-primary">
					<div className="container">
						
						<div className="row">
							{features.map((feature, i) => {
								return (
									<div key={i} className="col-sm-4">
										<div className="feature feature-2 filled text-center">
											<div className="text-center">
												<i className="ti-layers icon-sm"></i>
												<h5 className="uppercase">{feature.heading}</h5>
											</div>
											<p>{feature.text}</p>
										</div>
									</div>
								);
							})}

							
						</div>
					</div>
					
				</section>



				<section>
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center overflow-hidden">
								<h5 className="uppercase text-center fade-half mb64 mb-xs-32">
									Takk til
								</h5>
								<div className="col-sm-6">
									<ul>
										<li>
											<h6 className="uppercase mb8">Gran Kommune</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Sparebankstiftelsen Gran</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Norsk Kulturminnefond</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Riksantikvarens verdiskapningsprogram</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Oppland Fylkeskommune</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Norsk Kulturråd</h6>
										</li>
										
									</ul>
								</div>
								<div className="col-sm-6">
									<ul>
										<li>
											<h6 className="uppercase mb8">Innovasjon Norge</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Sparebank1 Ringerike</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Hadeland næringsfond</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">UNI-stiftelsen</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Eckbos legater</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">Bergesen-stifelsen</h6>
										</li>
										<li>
											<h6 className="uppercase mb8">ENOVA</h6>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default withTracker(() => {
	const handle = Meteor.subscribe('config');

	const config = {
		homePageBackgroundImage: Config.findOne({name: 'homePageBackgroundImage'}),
		homePageText: Config.findOne({name: 'homePageText'})
	}

	return {
		config,
		ready: handle.ready()
	}

})(Home);





