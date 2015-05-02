import React from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';

const CancelButton = React.createClass({
    propTypes: {
        dataType: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    },

    render() {
        let url;
        let params;
        if (this.props.id === 'new') {
            url = this.props.dataType + 's';
            params = {};
        } else {
            url = this.props.dataType;
            params = {id: this.props.id};
        }
        return (
            <Link to = {url} params = {params}>
                <RaisedButton
                    label = 'Cancel'
                    primary = {true}
                    className = 'cancel-button'
                />
            </Link>
        );
    }
});

export {CancelButton as default};
