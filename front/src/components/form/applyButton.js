import React from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';

const ApplyButton = React.createClass({
    render() {
        return (
            <RaisedButton
                label = 'Apply'
                secondary = {true}
                className = 'apply-button'
            />
        );
    }
});

export {ApplyButton as default};
