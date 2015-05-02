import React from 'react';
import {DatePicker} from 'material-ui';

const FormDatePicker = React.createClass({
	propTypes: {
		defaultDate: React.PropTypes.object
	},

	getValue() {
		return this.refs.datePicker.getDate();
	},

	render() {
		return (
			<DatePicker
				defaultDate = {this.props.defaultDate}
				floatingLabelText = 'Date'
				ref = 'datePicker'
			/>
		);
	}
});

export {FormDatePicker as default};
