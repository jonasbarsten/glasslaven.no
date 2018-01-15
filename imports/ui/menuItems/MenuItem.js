import React, { Component } from 'react';

class MenuItem extends Component {
	render () {
		return (
			<div>
				{this.props.item.name}
			</div>
		);
	}

}

export default MenuItem;