// REMEMBER: <meta charset="utf-8" /> to head in main html

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';

export default class BarstenViewer extends Component {	

	render() {

		const placeholder = this.props.placeholder ? this.props.placeholder : '';

		if (!this.props.content) {
			return <p>{placeholder}</p>;
		}

		const content = draftToHtml(this.props.content.editorState);

		console.log(content);

		return (
			<div className="barsten-viewer">
				<div className={this.props.className} dangerouslySetInnerHTML={{ __html: content }}></div>
				<div className="clearfix"></div>
			</div>
		);
	}
}