import React, {Component} from 'react';

import AddPage from './AddPage.js';
import ListPages from './ListPages.js';

class PagesWrapper extends Component {
	render() {
		return(
			<div className="container">
				<h4>Legg til underside</h4>
				<AddPage />
				<hr />
				<ListPages />
				<hr />
			</div>
		);
	}
}

export default PagesWrapper;