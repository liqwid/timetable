import React from 'react';
import dataActions from 'actions/dataActions';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';

const DeleteButton = React.createClass({
	propTypes: {
		dataType: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired
	},
	
	handleClick() {
		dataActions.remove(this.props.id);
	},

    render() {
    	const url = this.props.dataType + 's';
        return (
        	<Link to = {url} onClick = {this.handleClick}>
	            <RaisedButton
		            label = 'Delete Entry'
		            primary = {true}
		            className = 'delete-button'
	            />
            </Link>
        );
    }
});

export {DeleteButton as default};
