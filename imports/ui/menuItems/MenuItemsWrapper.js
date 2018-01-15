import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import Reorder from 'react-reorder';
import _ from 'lodash';

import MenuItem from './MenuItem';

class MenuItemsWrapper extends Component {

	constructor () {
		super ();
		this.state = {
			selected: null
		}
	}

	addMenuItem () {
		swal({
			title: 'Navn på menypunkt',
			type: 'question',
			input: 'text',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Lag!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('menuItem.add', result.value, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Menypunkt lagt til', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});
	}

	reorder (event, itemThatHasBeenMoved, itemsPreviousIndex, itemsNewIndex, reorderedArray) {
		reorderedArray.map((item, i) => {
			Meteor.call('menuItem.reorder', item._id, i);
		});
	}

	deleteItem (event, item) {
		swal({
			title: "Vil du slette menypunktet?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Ja, slett!"	
		}).then((result) => {
			if (result.value) {
				Meteor.call('menuItem.delete', item._id, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						Bert.alert('Menypunkt slettet', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});
	}

	render () {

		const menuItems = this.props.menuItems;

		let items = null;

		if (menuItems.length > 0) {
			let sortedItems = _.sortBy(menuItems, 'sortIndex');
			items = <Reorder
						// The key of each object in your list to use as the element key
						itemKey="_id"
						// Lock horizontal to have a vertical list
						lock='horizontal'
						// The milliseconds to hold an item for before dragging begins
						holdTime='200'
						// The list to display
						list={sortedItems}
						// A template to display for each list item
						template={MenuItem}
						// Function that is called once a reorder has been performed
						callback={this.reorder.bind(this)}
						// Class to be applied to the outer list element
						listClass='row text-center'
						// Class to be applied to each list item's wrapper element
						itemClass='col-xs-12'
						// A function to be called if a list item is clicked (before hold time is up)
						itemClicked={this.deleteItem.bind(this)}
						// The item to be selected (adds 'selected' class)
						selected={this.state.selected}
						// The key to compare from the selected item object with each item object
						// selectedKey='uuid'
						// Allows reordering to be disabled
						disableReorder={false}
					/>
		}

		

		return (
			<div className="container">
				<div className="row">
					<button onClick={this.addMenuItem.bind(this)} className="btn btn-success col-xs-12">Legg til menypunkt</button>
				</div>
				<div className="row">
					{items}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('menuItems');

	return {
		menuItems: MenuItems.find().fetch()
	}

})(MenuItemsWrapper);