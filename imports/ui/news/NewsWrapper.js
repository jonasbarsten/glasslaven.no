import React, {Component} from 'react';

import AddNews from './AddNews.js';
import ListNews from './ListNews.js';

class NewsWrapper extends Component {
	render() {
		return(
			<div className="container">
				<h4>Legg til nyhet</h4>
				<AddNews />
				<hr />
				<ListNews />
				<hr />
			</div>
		);
	}
}

export default NewsWrapper;