import React from 'react';
import _ from 'lodash';
import {IconButton, RaisedButton, DropDownMenu} from 'material-ui';
import Select from 'components/form/select';

const MultiSelect = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		options: React.PropTypes.array.isRequired,
		selectedIndexes: React.PropTypes.array.isRequired
	},

	getInitialState() {
		return {
			selectedIndexes: this.props.selectedIndexes
		};
	},

	getValue() {
		const selectedIds = _.map(_.uniq(this.state.selectedIndexes), index => {
			return this.props.options[index].id;
		});
		return selectedIds;
	},

	handleAdd(e) {
		e.preventDefault();
		this.setState((state, props) => {
			state.selectedIndexes.push(0);
			return {
				selectedIndexes: state.selectedIndexes
			};
		});
	},

	handleRemove(e) {
		e.preventDefault();
		this.setState((state, props) => {
			state.selectedIndexes.pop();
			return {
				selectedIndexes: state.selectedIndexes
			};
		});
	},

	handleChange(key, e, selectedIndex, menuItem) {
		this.setState((state, props) => {
			state.selectedIndexes[key] = selectedIndex;
			return {
				selectedIndexes: state.selectedIndexes
			};
		});
	},

	render() {
		let selects;
		let removeButton;
		let addButton;
		if (this.props.options.length === 0) {
			selects = <h5>Oops, nothing to choose from!</h5>;
			removeButton = <span/>;
			addButton = <span/>;
		} else {
			const menuItems = _.map(this.props.options, option => {
				return {'payload': option.id, 'text': option.value};
			});

			selects = this.state.selectedIndexes.map((index, key) => {
				const select = <DropDownMenu
					menuItems = {menuItems}
					selectedIndex = {index}
					onChange = {this.handleChange.bind(this, key)}
					ref = {key}
					key = {key}
				/>;

				return <div>
					{select}
				</div>;
			});

			const removeButtonDisabled =
				(this.state.selectedIndexes.length < 2) ? true : false;

			removeButton = <RaisedButton
				className = 'remove-button-margin'
				label = {'Remove'}
				primary = {true}
				disabled = {removeButtonDisabled}
				onClick = {this.handleRemove}
			/>;

			const addButtonDisabled =
				(this.state.selectedIndexes.length > 3) ? true : false;

			addButton = <RaisedButton
				label = {'Add'}
				secondary = {true}
				disabled = {addButtonDisabled}
				onClick = {this.handleAdd}
			/>;
		}

		return (
			<span>
				<p className = 'form-label'>{this.props.title}</p>
				{selects}
				{removeButton}
				{addButton}
			</span>
		);
	}
});

export {MultiSelect as default};
