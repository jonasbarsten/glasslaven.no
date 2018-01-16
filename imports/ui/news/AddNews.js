import React, { Component } from 'react';

class AddNews extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit() {

		if (this.refs.name.value == '') {
			Bert.alert('Du må gi nyheten et navn', 'success', 'growl-bottom-right', 'fa-smile-o');
		} else {
			Meteor.call('news.add', this.refs.name.value, this.refs.urlFriendlyName.innerHTML, (err, res) => {
				if (err) {
					console.log(err);
				} else if (res == 'exists') {
					Bert.alert('Nyhetsadressen eksisterer', 'warning', 'growl-bottom-right', 'fa-smile-o');
				} else {
					this.refs.name.value = '';
					this.refs.urlFriendlyName.innerHTML = '';
					Bert.alert('Nyhet lagt til', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		}
	}

	urlFriendly() {

		var url = this.refs.name.value.replace(/[^\w\s]/gi, '');
		url = url.replace(/\s+/g, '-').toLowerCase();

		this.refs.urlFriendlyName.innerHTML = url;
	}

	render() {

		return (
			<div onKeyPress={this.handleKeyPress.bind(this)}>
				<div className="row">

					<div className="col-xs-8">
						<input 
							placeholder="Beatles kommer til glasslåven!"
							type="text"
							ref="name"
							className="form-control"
							onChange={this.urlFriendly.bind(this)}
						/>
					</div>

					<div className="col-xs-4 text-right">
						<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Legg til</button>
					</div>

				</div>

				<br />

				<div className="row">
					<div className="col-xs-12">
						<p>
							{Meteor.settings.public.url}/news/
							<span ref="urlFriendlyName"></span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default AddNews;