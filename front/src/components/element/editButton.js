import React from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';

const EditButton = React.createClass({
	propTypes: {
		dataType: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired
	},

    render() {
    	var url = this.props.dataType + 'Form';
        return (
        	<Link to = {url} params = {{id: this.props.id}}>
            	<RaisedButton
					label = 'Edit Entry'
					secondary = {true}
					className = 'edit-button'
            	/>
            </Link>
        );
    }
});

export {EditButton as default};
