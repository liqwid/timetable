import React from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';

const AddButton = React.createClass({
    propTypes: {
        dataType: React.PropTypes.string.isRequired
    },

    render() {
        const label = this.props.dataType;
        return (
            <Link to = {label + 'Form'} params = {{id: 'new'}}>
                <RaisedButton
                    label = {'Add ' + label}
                    secondary = {true}
                    className = 'add-button'
                />
            </Link>
        );
    }
});

export {AddButton as default};
