import React from 'react';
import {DropDownMenu} from 'material-ui';

const Select = React.createClass({
	propTypes: {
		options: React.PropTypes.array.isRequired,
		title: React.PropTypes.string.isRequired,
		selectedId: React.PropTypes.number
	},

	getInitialState() {
		return {
			selectedId: this.props.selectedId
		};
	},

	handleChange(e, selectedId) {
		this.setState({
			selectedId: selectedId
		});
	},

	getValue() {
		console.log(this.state.selectedId);
		return this.state.selectedId;
	},

	render() {
		const menuItems = this.props.options.map((option, index) => {
			return {'payload': index, 'text': option};
		});
		return (
			<span>
				<p className = 'form-label'>{this.props.title}</p>
				<DropDownMenu
					menuItems = {menuItems}
					selectedIndex = {this.state.selectedId}
					onChange = {this.handleChange}
				/>
			</span>
		);
	}

});

export {Select as default};
