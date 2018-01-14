import React, { Component } from 'react';

import ArtistList from '../artists/ArtistList';

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

		const cover = (this.state.coverUrl) ?
				<section id="banner-custom">
					<div>
						<img alt="image of glasslaven" src={this.state.coverUrl} />
					</div>
				</section> :
				null;

		return (
			<div>	
				{cover}

				<section id="welcomeTextSection">
					<div className="container">
						<div className="row mb80 mb-xs-0">
							<div className="col-md-8 col-md-offset-2 text-center">
								<h1>
									PRODUKSJONS- OG VISNINGSSTED FOR PROFESJONELL KUNST
								</h1>
								<p>
									Glasslåven kunstsenter ligger på Granavollen på Hadeland og åpnet våren 2016. Den monumentale låven fra 1880-tallet er de siste årene restaurert og ombygd etter økologiske prinsipper. Den har blitt et pilotbygg der områdets bærekraft gjennom generasjoner har inspirert til framtidsrettede, miljøvennlige byggemetoder. Stall, høyloft og potetkjeller er erstattet med galleri, produksjons- og visningsrom, glasshytte og verksteder for fast og prosjektbasert leie. Kunstsenteret skal være et drivhus for høy kvalitet og profesjonalitet. Blant kunstnerne finner vi to markante nestorer i norsk kunsthåndverk; glasskunstner Ulla-Mari Brantenberg og smykkekunstner Toril Bjorg. Flere billedkunstnere, forfattere, en komponist og en musikalartist er også blant de som har sitt daglige arbeidsted på Glasslåven.
								</p>
								<h3>ÅPNINGSTIDER</h3>
								<span>Lørdag og søndag 11 - 16</span>
								<br />
								<span>Sommeråpent tirsdag - søndag 11 - 16</span>
								<br />
								<br />
								<span>Omvisninger kan avtales på forhånd.</span>
								<br />
								<br />
								<span>Ta kontakt for leie av lokaler</span>
								<br />
								<a href="mailto:post@glasslaven.no">post@glasslaven.no</a>
							</div>
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
			</div>
		);
	}
}

export default Home;